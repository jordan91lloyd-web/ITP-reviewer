// POST /api/holdpoint/add-documents
// Body: { company_id, project_id, existing_hold_points, documents: [{title, base64}] }
// Extracts hold points from new documents only, deduplicates against existing,
// numbers continuing from last existing ID, merges, saves to Supabase, returns new points.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";

export const maxDuration = 300;

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

interface HoldPoint {
  id:                string;
  description:       string;
  stage:             string;
  responsible_party: string;
  source:            string;
}

interface RawHoldPoint {
  description:       string;
  stage:             string;
  responsible_party: string;
  source:            string;
}

interface DocumentInput {
  title:  string;
  base64: string;
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
            text: `Document: ${title}\nPlease extract all hold points.`,
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

export async function POST(request: NextRequest) {
  if (!await requireAuth()) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: {
    company_id?:            string;
    project_id?:            string;
    project_name?:          string;
    existing_hold_points?:  HoldPoint[];
    documents?:             DocumentInput[];
  };
  try {
    body = await request.json() as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { company_id, project_id, project_name, existing_hold_points = [], documents = [] } = body;
  if (!company_id || !project_id) {
    return NextResponse.json({ error: "company_id and project_id required" }, { status: 400 });
  }
  if (documents.length === 0) {
    return NextResponse.json({ error: "At least one document required" }, { status: 400 });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  // Build a set of existing descriptions for deduplication
  const existingKeys = new Set(
    existing_hold_points.map(hp =>
      `${hp.description.trim().toLowerCase()}|${hp.stage.toLowerCase()}`
    )
  );

  // Determine the next number to continue from
  const lastNum = existing_hold_points.reduce((max, hp) => {
    const n = parseInt(hp.id.replace("HP-", "")) || 0;
    return Math.max(max, n);
  }, 0);

  // Extract from each new document
  const allRaw: RawHoldPoint[] = [];
  for (const doc of documents) {
    if (!doc.base64) continue;
    const points = await extractHoldPoints(client, doc.title, doc.base64);
    allRaw.push(...points);
  }

  // Deduplicate against existing and within new batch
  const seenNew = new Set<string>();
  const newRaw = allRaw.filter(item => {
    const key = `${item.description.trim().toLowerCase()}|${item.stage.toLowerCase()}`;
    if (existingKeys.has(key) || seenNew.has(key)) return false;
    seenNew.add(key);
    return true;
  });

  // Sort new hold points by stage order
  const sortedNew = [...newRaw].sort((a, b) => {
    const si = STAGE_ORDER.indexOf(a.stage);
    const sj = STAGE_ORDER.indexOf(b.stage);
    return (si === -1 ? 999 : si) - (sj === -1 ? 999 : sj);
  });

  // Number starting after last existing
  const numberedNew: HoldPoint[] = sortedNew.map((item, i) => ({
    ...item,
    id: `HP-${String(lastNum + i + 1).padStart(3, "0")}`,
  }));

  // Merge: keep existing in order, append new ones
  const merged = [...existing_hold_points, ...numberedNew];

  // Save merged list to Supabase
  const supabase = getSupabase();
  await supabase
    .from("holdpoint_registers")
    .upsert(
      {
        company_id,
        project_id,
        project_name: project_name ?? "",
        hold_points:  merged,
        generated_at: new Date().toISOString(),
      },
      { onConflict: "company_id,project_id" },
    );

  return NextResponse.json({
    new_hold_points: numberedNew,
    new_count:       numberedNew.length,
    merged_total:    merged.length,
  });
}
