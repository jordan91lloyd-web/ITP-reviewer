// POST /api/holdpoint/generate
// Body: { company_id, project_id, project_name, drawings: [...], uploads: [...] }
// Downloads drawing PDFs from Procore, processes all documents via Claude,
// deduplicates, sorts, numbers, saves to Supabase, returns the register.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";

export const maxDuration = 300;

const PROCORE_BASE = process.env.PROCORE_ENV === "production"
  ? "https://api.procore.com"
  : "https://sandbox.procore.com";

const STAGE_ORDER = [
  "Demolition & Excavation",
  "Piling & Retention",
  "Concrete & Structure",
  "Steel & Framing",
  "Facade & Roofing",
  "Waterproofing",
  "Services Rough-In",
  "Fitout & Finishes",
  "External Works",
  "Testing & Commissioning",
];

interface DrawingInput {
  id:      number;
  number:  string;
  title:   string;
  pdf_url: string;
}

interface UploadInput {
  title:  string;
  base64: string;
}

interface RawHoldPoint {
  description:       string;
  stage:             string;
  responsible_party: string;
  source:            string;
}

interface HoldPoint extends RawHoldPoint {
  id: string;
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
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

const SYSTEM_PROMPT = `You are a construction quality assurance specialist reviewing Australian construction documents for a builder.

Extract ONLY genuine hold points from this document. A hold point is a mandatory inspection, test, sign-off or approval that MUST occur before work can proceed.

Examples of hold points:
- Engineer sign-off before concrete pour
- Flood test before tiling
- PCA inspection before covering works
- Fire engineer approval of fire-rated assemblies
- Geotechnical engineer inspection of excavation
- Structural engineer sign-off on steel connections
- Council/certifier inspection before pouring footings

Do NOT include:
- General construction notes
- Material specifications
- Administrative requirements
- Design notes
- Things that are recommendations rather than mandatory gates

For each hold point classify into ONE of these construction stages:
Demolition & Excavation | Piling & Retention | Concrete & Structure | Steel & Framing | Facade & Roofing | Waterproofing | Services Rough-In | Fitout & Finishes | External Works | Testing & Commissioning

Return ONLY a JSON array. No markdown.
[{"description":"brief clear description of what must happen before work proceeds","stage":"one of the stages above","responsible_party":"who must sign off (extract from document)","source":"drawing number and title or document name"}]
Return [] if no genuine hold points found.`;

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
    company_id?:   string;
    project_id?:   string;
    project_name?: string;
    drawings?:     DrawingInput[];
    uploads?:      UploadInput[];
  };
  try {
    body = await request.json() as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { company_id, project_id, project_name, drawings = [], uploads = [] } = body;
  if (!company_id || !project_id || !project_name) {
    return NextResponse.json({ error: "company_id, project_id, project_name required" }, { status: 400 });
  }
  if (drawings.length === 0 && uploads.length === 0) {
    return NextResponse.json({ error: "At least one drawing or upload required" }, { status: 400 });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
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
    if (!upload.base64) continue;
    const points = await extractHoldPoints(client, upload.title, "", upload.base64);
    sourcesUsed.push(upload.title);
    allRaw.push(...points);
  }

  const holdPoints = sortAndNumber(deduplicateHoldPoints(allRaw));

  const supabase = getSupabase();
  await supabase
    .from("holdpoint_registers")
    .upsert(
      { company_id, project_id, project_name, generated_at: new Date().toISOString(), hold_points: holdPoints },
      { onConflict: "company_id,project_id" },
    );

  return NextResponse.json({ hold_points: holdPoints, total: holdPoints.length, sources_used: sourcesUsed });
}
