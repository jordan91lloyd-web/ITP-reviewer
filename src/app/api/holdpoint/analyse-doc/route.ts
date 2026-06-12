// POST /api/holdpoint/analyse-doc
// Body: { company_id, project_id, document: { title, storage_path } }
// Downloads one PDF from Supabase Storage, extracts hold points via Claude,
// deletes from storage, and returns raw hold points (unnumbered).
// Called once per document from the frontend; frontend merges results.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";
import { SYSTEM_PROMPT } from "@/lib/holdpoint-prompt";

export const maxDuration = 120;

interface RawHoldPoint {
  description:       string;
  stage:             string;
  responsible_party: string;
  source:            string;
  confidence:        "explicit" | "assumed";
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

async function requireAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return !!cookieStore.get("procore_access_token")?.value;
}

export async function POST(request: NextRequest) {
  if (!await requireAuth()) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: {
    company_id?:  string;
    project_id?:  string;
    document?:    { title: string; storage_path: string };
  };
  try {
    body = await request.json() as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { document } = body;
  if (!document?.storage_path || !document?.title) {
    return NextResponse.json({ error: "document.title and document.storage_path required" }, { status: 400 });
  }

  const supabase = getSupabase();

  // Download from Supabase Storage
  const { data: blob, error: downloadError } = await supabase.storage
    .from("holdpoint-uploads")
    .download(document.storage_path);

  if (downloadError || !blob) {
    console.error("Storage download error:", JSON.stringify(downloadError));
    return NextResponse.json(
      { error: downloadError?.message ?? "Failed to download document from storage", hold_points: [] },
      { status: 500 },
    );
  }

  const buffer = await blob.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");

  // Extract hold points via Claude
  let holdPoints: RawHoldPoint[] = [];
  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const response = await client.messages.create({
      model:      "claude-sonnet-4-6",
      max_tokens: 2000,
      system:     SYSTEM_PROMPT,
      messages: [{
        role: "user",
        content: [
          {
            type: "document",
            source: {
              type:       "base64",
              media_type: "application/pdf",
              data:       base64,
            },
          } as Anthropic.DocumentBlockParam,
          {
            type: "text",
            text: `Document: ${document.title}\nPlease extract all hold points.`,
          },
        ],
      }],
    });

    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map(b => b.text)
      .join("");

    const match = text.match(/\[[\s\S]*\]/);
    if (match) {
      holdPoints = JSON.parse(match[0]) as RawHoldPoint[];
    }
  } catch (err) {
    console.error("[analyse-doc] Claude extraction failed:", err);
    // Return empty rather than failing — caller can surface the partial result
  }

  // Delete from storage regardless of extraction outcome
  const { error: deleteError } = await supabase.storage
    .from("holdpoint-uploads")
    .remove([document.storage_path]);

  if (deleteError) {
    console.warn("[analyse-doc] Storage cleanup failed (non-fatal):", deleteError);
  }

  return NextResponse.json({ hold_points: holdPoints });
}
