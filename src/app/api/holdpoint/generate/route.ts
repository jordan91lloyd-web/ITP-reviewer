// POST /api/holdpoint/generate
// Downloads selected Procore documents, extracts hold points via Claude,
// deduplicates, sorts, numbers, saves to Supabase, and returns the register.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";

export const maxDuration = 300;

const PROCORE_BASE = process.env.PROCORE_ENV === "production"
  ? "https://api.procore.com"
  : "https://sandbox.procore.com";

const STAGE_ORDER = [
  "Demolition",
  "Structure",
  "Facade",
  "Services Rough-In",
  "Fitout",
  "External Works",
  "Defects & Handover",
];

interface SelectedItem {
  id:           string;
  title:        string;
  pdf_url?:     string;   // drawing
  download_url?: string;  // document
  source:       "drawing" | "document" | "upload";
  data?:        string;   // base64 for uploaded files
}

interface RawHoldPoint {
  description:        string;
  trade:              string;
  stage:              string;
  responsible_party:  string;
  source_reference:   string;
}

interface HoldPoint extends RawHoldPoint {
  id:        string;
  completed: boolean;
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

async function requireAuth(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("procore_access_token")?.value ?? null;
}

async function downloadPdf(url: string, token: string): Promise<Buffer | null> {
  if (!url) return null;
  try {
    const isS3 = !url.includes("procore.com") || url.includes("s3.");
    const headers: Record<string, string> = {};
    if (!isS3) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(url, { headers });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    return Buffer.from(buf);
  } catch {
    return null;
  }
}

const SYSTEM_PROMPT = `You are a construction quality assurance specialist. Extract all hold points from this construction document.

A hold point is any inspection, test, sign-off, approval, or verification that MUST occur before work can proceed. Examples: engineer sign-off before concrete pour, flood test before tiling, PCA inspection before covering works, fire engineer sign-off on fire rated assemblies, facade consultant sign-off on cladding installation.

For each hold point found, return:
- description: what the hold point is
- trade: the construction trade (Concrete, Waterproofing, Structural Steel, Facade, Fire Services, Electrical, Mechanical, Plumbing, Carpentry, Tiling, Painting, General)
- stage: construction stage (Demolition, Structure, Facade, Services Rough-In, Fitout, External Works, Defects & Handover)
- responsible_party: who must sign off (extract from document, e.g. 'Structural Engineer', 'PCA', 'Fleek QA', 'Fire Engineer')
- source_reference: the document name and any relevant page/section/drawing number reference

Return ONLY valid JSON array. No markdown. No explanation.
Format: [{"description":"...","trade":"...","stage":"...","responsible_party":"...","source_reference":"..."}]
If no hold points found, return []`;

async function extractHoldPoints(
  client: Anthropic,
  title: string,
  pdfBase64: string,
): Promise<RawHoldPoint[]> {
  try {
    const response = await client.messages.create({
      model:      "claude-sonnet-4-6",
      max_tokens: 4000,
      system:     SYSTEM_PROMPT,
      messages: [{
        role: "user",
        content: [
          {
            type: "document",
            source: {
              type:       "base64",
              media_type: "application/pdf",
              data:       pdfBase64,
            },
          } as Anthropic.DocumentBlockParam,
          {
            type: "text",
            text: `Document: ${title}\nExtract all hold points from this document.`,
          },
        ],
      }],
    });

    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map(b => b.text)
      .join("");

    // Extract JSON array
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) return [];
    return JSON.parse(match[0]) as RawHoldPoint[];
  } catch {
    return [];
  }
}

function deduplicateHoldPoints(items: RawHoldPoint[]): RawHoldPoint[] {
  const seen = new Set<string>();
  return items.filter(item => {
    const key = `${item.description.trim().toLowerCase()}|${item.trade.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function sortAndNumber(items: RawHoldPoint[]): HoldPoint[] {
  const sorted = [...items].sort((a, b) => {
    const si = STAGE_ORDER.indexOf(a.stage);
    const sj = STAGE_ORDER.indexOf(b.stage);
    if (si !== sj) return (si === -1 ? 999 : si) - (sj === -1 ? 999 : sj);
    return a.trade.localeCompare(b.trade);
  });

  return sorted.map((item, i) => ({
    ...item,
    id:        `HP-${String(i + 1).padStart(3, "0")}`,
    completed: false,
  }));
}

export async function POST(request: NextRequest) {
  const token = await requireAuth();
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  let body: {
    company_id?:     string;
    project_id?:     string;
    project_name?:   string;
    selected_items?: SelectedItem[];
  };
  try {
    body = await request.json() as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { company_id, project_id, project_name, selected_items } = body;
  if (!company_id || !project_id || !project_name || !selected_items?.length) {
    return NextResponse.json({ error: "company_id, project_id, project_name, and selected_items required" }, { status: 400 });
  }

  const client    = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const allRaw: RawHoldPoint[] = [];

  for (const item of selected_items) {
    let pdfBase64: string | null = null;

    if (item.source === "upload" && item.data) {
      // Already base64
      pdfBase64 = item.data;
    } else {
      const url = item.pdf_url || item.download_url || "";
      const buf = await downloadPdf(url, token);
      if (buf) pdfBase64 = buf.toString("base64");
    }

    if (!pdfBase64) continue;

    const points = await extractHoldPoints(client, item.title, pdfBase64);
    allRaw.push(...points);
  }

  const deduped    = deduplicateHoldPoints(allRaw);
  const holdPoints = sortAndNumber(deduped);

  // Save to Supabase
  const supabase = getSupabase();
  await supabase
    .from("holdpoint_registers")
    .upsert(
      {
        company_id,
        project_id,
        project_name,
        generated_at: new Date().toISOString(),
        hold_points:  holdPoints,
      },
      { onConflict: "company_id,project_id" },
    );

  // Build summary stats
  const by_stage: Record<string, number> = {};
  const by_trade: Record<string, number> = {};
  for (const hp of holdPoints) {
    by_stage[hp.stage] = (by_stage[hp.stage] ?? 0) + 1;
    by_trade[hp.trade] = (by_trade[hp.trade] ?? 0) + 1;
  }

  return NextResponse.json({ hold_points: holdPoints, total: holdPoints.length, by_stage, by_trade });
}
