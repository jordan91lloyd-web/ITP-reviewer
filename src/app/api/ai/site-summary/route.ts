// ─── POST /api/ai/site-summary ────────────────────────────────────────────────
// Generates a structured AI morning briefing for a project.
// Saves snapshot to Supabase.
//
// Body: {
//   project_id, project_name, completion_pct, contract_sum,
//   active_trades, open_itps, company_id
// }
//
// Returns: { stage, missing_itps, coming_up, itp_gaps, generated_at }

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";

const client = new Anthropic();
const MODEL  = "claude-sonnet-4-6";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const SYSTEM_PROMPT =
  "You are a construction QA manager assistant for Fleek Constructions in Sydney, Australia. " +
  "You understand construction sequencing and ITP requirements. " +
  "Always respond with valid JSON only — no prose, no markdown.";

const ITP_SCHEDULE = `Fleek's mandatory ITP schedule by trade:
Earthworks: ITP-001 Bulk Excavation, ITP-003 Bored Piling, ITP-004 Inground Services, ITP-026 Deflection Monitoring, ITP-027 Anchoring, ITP-028 Breaking Ground, ITP-029 Underpinning
Structure: ITP-002 Pre-Pour, ITP-005 Shotcrete, ITP-006 Reinforcement, ITP-012 Precast, ITP-051 Backprop
Masonry: ITP-007 Brickwork, ITP-008 Blockwork, ITP-030 Hebel
Waterproofing: ITP-010 External, ITP-011 Internal, ITP-021 Waterstop, ITP-043 Basement Tank, ITP-044 Planterboxes
Roofing: ITP-031 Truss Roof, ITP-032 Metal Roofing, ITP-045 Tile Roofing
Enclosure: ITP-014 Glazing, ITP-033 Cladding
Hydraulic: ITP-034 Gas, ITP-035 Inground Hydraulic, ITP-036 Hydrant, ITP-037 Hydraulic Fitoff
Electrical: ITP-025 Presheet, ITP-038 Mains Cabling, ITP-039 Distribution Boards, ITP-040 Solar
Fire: ITP-041 Dry Fire, ITP-042 Sprinkler, ITP-046 Booster Pump
Mechanical: ITP-047 Duct Work, ITP-048 Plant, ITP-049 PAC Units
Lifts: ITP-050 Lift`;

interface ActiveTrade {
  name:            string;
  last_activity:   string;
  percentage_paid: number;
  contract_value:  number;
}

interface OpenItp {
  name:      string;
  status:    string;
  score:     number | null;
  days_open?: number | null;
}

interface ClosedItp {
  name:  string;
  score: number | null;
}

interface MissingItp {
  itp:    string;
  name:   string;
  reason: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      project_id:     string;
      project_name:   string;
      completion_pct: number | null;
      contract_sum:   number | null;
      active_trades:  ActiveTrade[];
      open_itps:      OpenItp[];
      closed_itps:    ClosedItp[];
      company_id:     string;
    };

    const { project_id, project_name, completion_pct, contract_sum, active_trades, open_itps, closed_itps, company_id } = body;

    if (!project_id || !project_name || !company_id) {
      return NextResponse.json({ error: "project_id, project_name, company_id are required." }, { status: 400 });
    }

    const fmtValue = (n: number) =>
      n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n / 1_000)}k`;

    const tradesText = active_trades.length > 0
      ? active_trades.map(t => `  - ${t.name} — ${Math.round(t.percentage_paid)}% paid${t.contract_value > 0 ? ` (contract ${fmtValue(t.contract_value)})` : ""}`).join("\n")
      : "  None recorded in last 90 days";

    const itpsText = open_itps.length > 0
      ? open_itps.map(i => `  - ${i.name} [${i.status}${i.score != null ? `, score ${i.score}` : ""}${i.days_open != null ? `, ${i.days_open}d open` : ""}]`).join("\n")
      : "  None";

    const closedText = closed_itps.length > 0
      ? closed_itps.map(i => `${i.name}${i.score != null ? ` (score: ${i.score})` : ""}`).join(", ")
      : "None loaded";

    const completionLine = completion_pct != null
      ? `Subcontract progress: ${completion_pct}% of total subcontract value certified and paid${contract_sum != null ? ` (head contract value: ${fmtValue(contract_sum)})` : ""}`
      : "Subcontract progress: Unknown";

    const userPrompt = `Project: ${project_name}
${completionLine}
Active subcontracts (last 90 days):
${tradesText}
Open ITPs in Procore right now:
${itpsText}
Closed ITPs (completed work stages):
${closedText}

Use closed ITPs to confirm which construction stages are definitively complete. A closed ITP means that work is done and signed off.

${ITP_SCHEDULE}

Respond with ONLY a valid JSON object in this exact format, no other text:
{
  "stage": "One sentence max 15 words describing current construction stage",
  "missing_itps": [
    { "itp": "ITP-034", "name": "Gas", "reason": "MRW Plumbing active" }
  ],
  "coming_up": [
    { "itp": "ITP-011", "name": "Internal Waterproofing", "reason": "External WP nearing completion" }
  ],
  "itp_gaps": ["ITP-034", "ITP-037"]
}

When identifying missing_itps, cross-reference:
1. Active subcontract trades (primary signal)
2. Closed ITPs — if a trade's ITP is already closed, do NOT flag it as missing even if the subcontractor is still active (they may be doing defects or variations)
3. Open ITPs already in Procore — do not flag these as missing
missing_itps: ITPs that SHOULD be open right now based on active trades but are NOT already open or closed. Max 6 items.
coming_up: ITPs likely needed in next 2-4 weeks based on construction sequence. Max 4 items.
stage: max 15 words.
itp_gaps: just the ITP numbers from missing_itps.`;

    // ── Single structured call ────────────────────────────────────────────────

    const msg = await client.messages.create({
      model:      MODEL,
      max_tokens: 800,
      system:     SYSTEM_PROMPT,
      messages:   [{ role: "user", content: userPrompt }],
    });

    const raw = msg.content
      .filter(b => b.type === "text")
      .map(b => (b as { type: "text"; text: string }).text)
      .join("")
      .trim();

    // Extract JSON object robustly
    let stage        = "";
    let missingItps: MissingItp[] = [];
    let comingUp:    MissingItp[] = [];
    let itpGaps:     string[]     = [];

    try {
      const match = raw.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("No JSON object found in response");
      const parsed = JSON.parse(match[0]) as Record<string, unknown>;
      stage       = typeof parsed.stage === "string" ? parsed.stage : "";
      missingItps = Array.isArray(parsed.missing_itps) ? parsed.missing_itps as MissingItp[] : [];
      comingUp    = Array.isArray(parsed.coming_up)    ? parsed.coming_up    as MissingItp[] : [];
      itpGaps     = Array.isArray(parsed.itp_gaps)     ? parsed.itp_gaps     as string[]     : [];
    } catch {
      return NextResponse.json({ error: "AI returned unparseable response. Try again." }, { status: 500 });
    }

    const generatedAt  = new Date().toISOString();
    const snapshotDate = generatedAt.slice(0, 10);

    // ── Save to Supabase ───────────────────────────────────────────────────────
    // summary column stores JSON so it can be fully restored from cache.

    try {
      await supabase.from("project_financial_snapshots").upsert(
        {
          company_id,
          procore_project_id: project_id,
          snapshot_date:      snapshotDate,
          summary:            JSON.stringify({ stage, missing_itps: missingItps, coming_up: comingUp, contract_sum }),
          itp_gaps:           itpGaps,
          completion_pct,
          generated_at:       generatedAt,
        },
        { onConflict: "company_id,procore_project_id,snapshot_date" },
      );
    } catch {
      // non-fatal — still return the result
    }

    return NextResponse.json({
      stage,
      missing_itps: missingItps,
      coming_up:    comingUp,
      itp_gaps:     itpGaps,
      generated_at: generatedAt,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
