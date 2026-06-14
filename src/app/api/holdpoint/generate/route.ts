// POST /api/holdpoint/generate
// Body: { company_id, project_id, project_name, drawings: [...], uploads: [...] }
// Downloads drawing PDFs from Procore, processes all documents via Claude,
// deduplicates, sorts, numbers, saves to Supabase, returns the register.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";
import { SYSTEM_PROMPT, STAGE_ORDER } from "@/lib/holdpoint-prompt";

export const maxDuration = 300;

const PROCORE_BASE = process.env.PROCORE_ENV === "production"
  ? "https://api.procore.com"
  : "https://sandbox.procore.com";

interface DrawingInput {
  id:      number;
  number:  string;
  title:   string;
  pdf_url: string;
}

interface UploadInput {
  title:        string;
  storage_path: string;
}

interface RawHoldPoint {
  description:       string;
  stage:             string;
  responsible_party: string;
  source:            string;
  confidence:        "explicit" | "assumed";
}

interface HoldPoint extends RawHoldPoint {
  id: string;
}

interface ProcoreDocInput {
  id:            number;
  name:          string;
  url:           string;
  content_type?: string;
  size?:         number | null;
}

interface SkippedDoc {
  name:   string;
  reason: string;
}

const PROCORE_DOC_LIMIT = 15;           // max Procore Documents processed per run
const PDF_SIZE_LIMIT    = 15 * 1024 * 1024; // 15 MB per file

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
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

async function extractHoldPoints(
  client:    Anthropic,
  title:     string,
  number:    string,
  pdfBase64: string,
): Promise<RawHoldPoint[]> {
  try {
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
              data:       pdfBase64,
            },
          } as Anthropic.DocumentBlockParam,
          {
            type: "text",
            text: `Document: ${number ? `${number} — ` : ""}${title}\nPlease extract all hold points.`,
          },
        ],
      }],
    });

    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map(b => b.text)
      .join("");

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
    const key = `${item.description.trim().toLowerCase()}|${item.stage.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function sortAndNumber(items: RawHoldPoint[]): HoldPoint[] {
  const sorted = [...items].sort((a, b) => {
    const si = STAGE_ORDER.indexOf(a.stage);
    const sj = STAGE_ORDER.indexOf(b.stage);
    return (si === -1 ? 999 : si) - (sj === -1 ? 999 : sj);
  });
  return sorted.map((item, i) => ({
    ...item,
    id: `HP-${String(i + 1).padStart(3, "0")}`,
  }));
}

export async function POST(request: NextRequest) {
  const token = await requireAuth();
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  let body: {
    company_id?:        string;
    project_id?:        string;
    project_name?:      string;
    drawings?:          DrawingInput[];
    uploads?:           UploadInput[];
    procore_documents?: ProcoreDocInput[];
  };
  try {
    body = await request.json() as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { company_id, project_id, project_name, drawings = [], uploads = [], procore_documents = [] } = body;
  if (!company_id || !project_id || !project_name) {
    return NextResponse.json({ error: "company_id, project_id, project_name required" }, { status: 400 });
  }
  if (drawings.length === 0 && uploads.length === 0 && procore_documents.length === 0) {
    return NextResponse.json({ error: "At least one drawing, upload, or Procore document required" }, { status: 400 });
  }

  const client   = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const supabase = getSupabase();
  const allRaw: RawHoldPoint[] = [];
  const sourcesUsed: string[] = [];

  for (const drawing of drawings) {
    const buf = await downloadPdf(drawing.pdf_url, token);
    if (!buf) continue;
    const points = await extractHoldPoints(client, drawing.title, drawing.number, buf.toString("base64"));
    sourcesUsed.push(`${drawing.number} — ${drawing.title}`);
    allRaw.push(...points);
  }

  for (const upload of uploads) {
    if (!upload.storage_path) continue;
    try {
      const { data: blob, error } = await supabase.storage
        .from("holdpoint-uploads")
        .download(upload.storage_path);
      if (error || !blob) {
        console.warn(`[generate] Failed to download upload "${upload.title}":`, error);
        continue;
      }
      const buf    = await blob.arrayBuffer();
      const base64 = Buffer.from(buf).toString("base64");
      const points = await extractHoldPoints(client, upload.title, "", base64);
      sourcesUsed.push(upload.title);
      allRaw.push(...points);
      // Delete from storage after successful extraction
      await supabase.storage.from("holdpoint-uploads").remove([upload.storage_path]);
    } catch (err) {
      console.error(`[generate] Error processing upload "${upload.title}":`, err);
    }
  }

  // ── Procore Documents branch ─────────────────────────────────────────────
  const skippedDocuments: SkippedDoc[] = [];

  // Report anything beyond the per-run cap as skipped before processing
  for (const doc of procore_documents.slice(PROCORE_DOC_LIMIT)) {
    skippedDocuments.push({ name: doc.name, reason: "run limit reached — process fewer documents at once" });
  }

  for (const doc of procore_documents.slice(0, PROCORE_DOC_LIMIT)) {
    // Only PDFs go to the Claude document extraction path
    const ext   = doc.name.match(/\.[^.]+$/)?.[0]?.toLowerCase() ?? "";
    const isPdf = doc.content_type === "application/pdf" || ext === ".pdf";

    if (!isPdf) {
      skippedDocuments.push({ name: doc.name, reason: "unsupported file type (PDF files only)" });
      continue;
    }

    // Pre-check size if the API told us upfront (avoids a wasteful download)
    if (doc.size !== null && doc.size !== undefined && doc.size > PDF_SIZE_LIMIT) {
      skippedDocuments.push({
        name:   doc.name,
        reason: `file too large (${(doc.size / 1024 / 1024).toFixed(1)} MB — limit is 15 MB)`,
      });
      continue;
    }

    const buf = await downloadPdf(doc.url, token);
    if (!buf) {
      skippedDocuments.push({ name: doc.name, reason: "download failed" });
      continue;
    }

    // Post-check size (catches cases where size was unknown before download)
    if (buf.length > PDF_SIZE_LIMIT) {
      skippedDocuments.push({
        name:   doc.name,
        reason: `file too large (${(buf.length / 1024 / 1024).toFixed(1)} MB — limit is 15 MB)`,
      });
      continue;
    }

    const points = await extractHoldPoints(client, doc.name, "", buf.toString("base64"));
    sourcesUsed.push(doc.name);
    allRaw.push(...points);
  }
  // ── End Procore Documents ─────────────────────────────────────────────────

  const holdPoints = sortAndNumber(deduplicateHoldPoints(allRaw));

  await supabase
    .from("holdpoint_registers")
    .upsert(
      { company_id, project_id, project_name, generated_at: new Date().toISOString(), hold_points: holdPoints },
      { onConflict: "company_id,project_id" },
    );

  return NextResponse.json({
    hold_points:        holdPoints,
    total:              holdPoints.length,
    sources_used:       sourcesUsed,
    skipped_documents:  skippedDocuments,
  });
}
