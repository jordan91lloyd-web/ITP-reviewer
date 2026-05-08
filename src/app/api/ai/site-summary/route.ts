// ─── POST /api/ai/site-summary ────────────────────────────────────────────────
// Generates a 3-sentence AI morning briefing for a project, plus extracts
// structured ITP gap data. Saves snapshot to Supabase.
//
// Body: {
//   project_id, project_name, completion_pct, active_trades, open_itps, company_id
// }
//
// Returns: { summary, itp_gaps, generated_at }

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";

const client = new Anthropic();
const MODEL  = "claude-sonnet-4-20250514";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const SYSTEM_PROMPT =
  "You are a construction QA manager assistant for Fleek Constructions in Sydney, Australia. " +
  "You understand construction sequencing and ITP requirements.";

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
  name: string;
  status: string;
  score: number | null;
  days_open?: number | null;
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
      company_id:     string;
    };

    const { project_id, project_name, completion_pct, contract_sum: contractSum, active_trades, open_itps, company_id } = body;

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

    const completionLine = completion_pct != null
      ? `Subcontract progress: ${completion_pct}% of total subcontract value certified and paid${contractSum != null ? ` (head contract value: ${fmtValue(contractSum)})` : ""}`
      : "Subcontract progress: Unknown";

    const userPrompt = `Project: ${project_name}
${completionLine}
Active subcontracts (last 90 days):
${tradesText}
Open ITPs in Procore right now:
${itpsText}

${ITP_SCHEDULE}

Write exactly 3 sentences:
1. What stage the project is at based on active trades and completion percentage
2. Any ITPs that SHOULD be open based on active trades but are NOT in the open ITP list — be specific with ITP numbers
3. What ITPs will likely be needed in the coming 2-4 weeks based on construction sequencing

Be direct and specific. Use ITP numbers. No markdown, no bullet points, plain text only.`;

    // ── Call 1: 3-sentence summary ────────────────────────────────────────────

    const summaryMsg = await client.messages.create({
      model:      MODEL,
      max_tokens: 500,
      system:     SYSTEM_PROMPT,
      messages:   [{ role: "user", content: userPrompt }],
    });

    const summary = summaryMsg.content
      .filter(b => b.type === "text")
      .map(b => (b as { type: "text"; text: string }).text)
      .join("")
      .trim();

    // ── Call 2: structured ITP gap extraction ─────────────────────────────────

    let itpGaps: string[] = [];
    try {
      const gapMsg = await client.messages.create({
        model:      MODEL,
        max_tokens: 200,
        system:     SYSTEM_PROMPT,
        messages:   [
          { role: "user", content: userPrompt },
          { role: "assistant", content: summary },
          {
            role: "user",
            content:
              'Return ONLY a JSON array of ITP numbers that should be open based on active trades but are not currently open. ' +
              'Example: ["ITP-037", "ITP-041"]. Return empty array [] if no gaps. No other text.',
          },
        ],
      });

      const gapRaw = gapMsg.content
        .filter(b => b.type === "text")
        .map(b => (b as { type: "text"; text: string }).text)
        .join("")
        .trim();

      const match = gapRaw.match(/\[[\s\S]*\]/);
      if (match) itpGaps = JSON.parse(match[0]) as string[];
    } catch {
      // non-fatal — gaps default to empty
    }

    const generatedAt = new Date().toISOString();
    const snapshotDate = generatedAt.slice(0, 10); // YYYY-MM-DD

    // ── Save to Supabase ───────────────────────────────────────────────────────

    try {
      await supabase.from("project_financial_snapshots").upsert(
        {
          company_id,
          procore_project_id: project_id,
          snapshot_date:      snapshotDate,
          summary,
          itp_gaps:           itpGaps,
          active_trades:      active_trades,
          completion_pct,
          generated_at:       generatedAt,
        },
        { onConflict: "company_id,procore_project_id,snapshot_date" },
      );
    } catch {
      // non-fatal — still return the result even if save fails
    }

    return NextResponse.json({ summary, itp_gaps: itpGaps, generated_at: generatedAt });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
