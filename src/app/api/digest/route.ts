// CREATE TABLE project_digests (
//   id              bigint generated always as identity primary key,
//   company_id      text not null,
//   procore_project_id text not null,
//   digest_date     date not null,
//   digest          jsonb,
//   generated_at    timestamptz,
//   procore_errors  text[],
//   created_at      timestamptz default now(),
//   unique (company_id, procore_project_id, digest_date)
// );
// ALTER TABLE project_digests ENABLE ROW LEVEL SECURITY;
//
// ─── GET /api/digest?project_id=X&company_id=Y ──────────────────────────────
// Generates a rich project digest by pulling multiple Procore data sources
// and sending them to Claude for analysis.
//
// Returns a structured digest with: executive summary, activity this period,
// risks & gaps, contract intelligence, and recommended next moves.
//
// Caches results in Supabase (project_digests table) keyed by
// (company_id, project_id, digest_date).

import { NextRequest, NextResponse } from "next/server";
import { resolveAccessToken } from "@/lib/resolve-token";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";

export const maxDuration = 120;

const client = new Anthropic();
const MODEL  = "claude-sonnet-4-6";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const PROCORE_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

// ── Procore fetch helper ──────────────────────────────────────────────────────

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function procoreGet(path: string, token: string, companyId: string): Promise<any> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(`${PROCORE_BASE}${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Procore-Company-Id": companyId,
      },
      signal: AbortSignal.timeout(20_000),
    });

    if (res.status === 429) {
      const wait = Math.pow(2, attempt + 1) * 1000; // 2s, 4s, 8s
      console.log(`[digest] 429 on ${path.split("?")[0]}, retrying in ${wait}ms...`);
      await sleep(wait);
      continue;
    }

    const text = await res.text();
    if (!res.ok) {
      throw new Error(`Procore ${res.status}: ${text.slice(0, 200)}`);
    }
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(`Procore returned non-JSON: ${text.slice(0, 200)}`);
    }
  }
  throw new Error("Procore 429: rate limit exceeded after 3 retries");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function procoreGetSafe(path: string, token: string, companyId: string): Promise<{ data: any; error: string | null }> {
  try {
    const data = await procoreGet(path, token, companyId);
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : String(err) };
  }
}

// ── ITP schedule for gap analysis ─────────────────────────────────────────────

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
Lifts: ITP-050 Lift
Fitout: ITP-013 Rendering, ITP-015 Facade Cladding, ITP-016 Timber Flooring, ITP-017 Joinery, ITP-018 Tiling, ITP-019 Pedestal Floor Covering, ITP-020 Painting, ITP-022 Pre Sheet Inspection, ITP-023 Rough In Electrical, ITP-024 Rough In Hydraulic`;

// ── Procore data fetching ─────────────────────────────────────────────────────

interface DigestData {
  project: { id: string; name: string };
  primeContracts: unknown[];
  subcontracts: unknown[];
  inspections: unknown[];
  actionPlans: unknown[];
  recentDailyLogs: unknown[];
  errors: string[];
}

async function fetchDigestData(
  projectId: string,
  companyId: string,
  token: string,
): Promise<DigestData> {
  const errors: string[] = [];

  // Fetch data sources in serial batches of 2 with 600ms pause to avoid 429s
  const [projectRes, primeRes] = await Promise.all([
    procoreGetSafe(`/rest/v1.0/projects/${projectId}?company_id=${companyId}`, token, companyId),
    procoreGetSafe(`/rest/v1.0/prime_contracts?project_id=${projectId}&company_id=${companyId}`, token, companyId),
  ]);
  await sleep(600);

  const [subRes, inspRes] = await Promise.all([
    procoreGetSafe(`/rest/v1.0/work_order_contracts?project_id=${projectId}&company_id=${companyId}&view=default`, token, companyId),
    procoreGetSafe(`/rest/v1.0/projects/${projectId}/checklist/lists?company_id=${companyId}&per_page=250`, token, companyId),
  ]);
  await sleep(600);

  const [apRes, logsRes] = await Promise.all([
    procoreGetSafe(`/rest/v1.0/projects/${projectId}/action_plans/plans?company_id=${companyId}`, token, companyId),
    procoreGetSafe(`/rest/v1.0/projects/${projectId}/daily_construction_report_logs?company_id=${companyId}&per_page=10&filters[log_date]=${formatDate(7)}...${formatDate(0)}`, token, companyId),
  ]);

  if (projectRes.error) errors.push(`Project: ${projectRes.error}`);
  if (primeRes.error) errors.push(`Prime contracts: ${primeRes.error}`);
  if (subRes.error) errors.push(`Subcontracts: ${subRes.error}`);
  if (inspRes.error) errors.push(`Inspections: ${inspRes.error}`);
  if (apRes.error) errors.push(`Action plans: ${apRes.error}`);
  if (logsRes.error) errors.push(`Daily logs: ${logsRes.error}`);

  const projectName = projectRes.data?.name ?? projectRes.data?.display_name ?? `Project ${projectId}`;

  return {
    project: { id: projectId, name: projectName },
    primeContracts: Array.isArray(primeRes.data) ? primeRes.data : [],
    subcontracts: Array.isArray(subRes.data) ? subRes.data : [],
    inspections: Array.isArray(inspRes.data) ? inspRes.data : [],
    actionPlans: Array.isArray(apRes.data) ? apRes.data : [],
    recentDailyLogs: Array.isArray(logsRes.data) ? logsRes.data : [],
    errors,
  };
}

function formatDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

// ── Build the Claude prompt ───────────────────────────────────────────────────

function buildDigestPrompt(data: DigestData): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subs = (data.subcontracts as any[]);
  const totalSubValue = subs.reduce((s, c) => s + (parseFloat(c.revised_contract ?? "0") || 0), 0);
  const totalPaid = subs.reduce((s, c) => s + (parseFloat(c.total_payments ?? "0") || 0), 0);
  const completionPct = totalSubValue > 0 ? Math.round((totalPaid / totalSubValue) * 1000) / 10 : 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const primeValue = (data.primeContracts as any[]).reduce((s, pc) => s + (parseFloat(pc.revised_contract_amount ?? "0") || 0), 0);

  const fmtVal = (n: number) => n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n / 1_000)}k`;

  // Active trades (updated in last 90 days, >5% paid)
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeTrades = subs.filter((c: any) => {
    const pct = parseFloat(c.percentage_paid ?? "0") || 0;
    if (pct <= 5) return false;
    if (!c.updated_at) return false;
    return new Date(c.updated_at) >= ninetyDaysAgo;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }).map((c: any) => {
    const vendor = c.vendor?.company ?? c.title ?? "Unknown";
    return `  - ${vendor}: ${Math.round(parseFloat(c.percentage_paid ?? "0"))}% paid, contract ${fmtVal(parseFloat(c.revised_contract ?? "0") || 0)}, last activity ${c.updated_at?.slice(0, 10) ?? "unknown"}`;
  });

  // Commitments not yet started (0% paid or <5% and no recent activity)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const notStarted = subs.filter((c: any) => {
    const pct = parseFloat(c.percentage_paid ?? "0") || 0;
    const val = parseFloat(c.revised_contract ?? "0") || 0;
    return pct <= 5 && val > 10_000; // Only meaningful contracts
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }).map((c: any) => {
    const vendor = c.vendor?.company ?? c.title ?? "Unknown";
    return `  - ${vendor}: ${fmtVal(parseFloat(c.revised_contract ?? "0") || 0)} (not started)`;
  });

  // Inspections summary
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inspections = data.inspections as any[];
  const openItps = inspections.filter(i => i.status !== "closed");
  const closedItps = inspections.filter(i => i.status === "closed");
  const recentClosed = closedItps.filter(i => {
    if (!i.updated_at) return false;
    const daysAgo = (Date.now() - new Date(i.updated_at).getTime()) / 86400_000;
    return daysAgo <= 14;
  });

  const itpLines = [
    `Total inspections: ${inspections.length} (${openItps.length} open, ${closedItps.length} closed)`,
    recentClosed.length > 0
      ? `Recently closed (14d): ${recentClosed.map(i => i.name).join(", ")}`
      : "No inspections closed in the last 14 days",
    openItps.length > 0
      ? `Currently open: ${openItps.map(i => `${i.name} [${i.status}]`).join(", ")}`
      : "No open inspections",
  ];

  // Action plans summary
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const plans = data.actionPlans as any[];
  const planLines = plans.length > 0
    ? plans.map(p => `  - ${p.title ?? p.name ?? "Untitled"} [${p.status ?? "unknown"}]`).join("\n")
    : "  None";

  // Daily logs summary
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const logs = data.recentDailyLogs as any[];
  const logLines = logs.length > 0
    ? logs.slice(0, 7).map(l => `  - ${l.log_date ?? "?"}: ${l.notes ?? l.conditions ?? "No notes"}`).join("\n")
    : "  No daily logs in the last 7 days";

  return `You are a senior construction QA manager reviewing a project for a weekly digest. You work for Fleek Constructions in Sydney, Australia.

PROJECT: ${data.project.name}
Head contract value: ${primeValue > 0 ? fmtVal(primeValue) : "Not recorded"}
Subcontract completion: ${completionPct}% of ${fmtVal(totalSubValue)} total subcontract value
Total ${subs.length} subcontracts, ${activeTrades.length} active in last 90 days

ACTIVE TRADES (recently active subcontracts):
${activeTrades.length > 0 ? activeTrades.join("\n") : "  None"}

CONTRACTS NOT YET STARTED:
${notStarted.length > 0 ? notStarted.join("\n") : "  None"}

INSPECTIONS (ITPs):
${itpLines.join("\n")}

ACTION PLANS / TRACKERS:
${planLines}

DAILY CONSTRUCTION LOGS (last 7 days):
${logLines}

${ITP_SCHEDULE}

Based on ALL the above data, generate a weekly project digest. Consider:
- What stage the project is at based on active trades and completed ITPs
- Whether the right ITPs exist for the active trades
- Which contracts are let but haven't started (upcoming work)
- What should be the focus for the coming week
- Any risks: missing ITPs, trades working without inspection coverage, gaps between contract scope and ITP coverage
- Contract intelligence: what's been let, what might be missing for the project type and stage

Respond with ONLY a valid JSON object in this exact format:
{
  "executive_summary": "2-3 sentence overview of where this project stands right now",
  "project_stage": "One line describing the current construction stage",
  "completion_pct": ${completionPct},
  "contract_value": ${primeValue > 0 ? primeValue : "null"},
  "activity_this_week": [
    { "item": "Short description of what happened", "category": "itps|contracts|site|compliance" }
  ],
  "risks": [
    { "title": "Short risk title", "detail": "Why this matters and what to do", "severity": "high|medium|low" }
  ],
  "contract_intelligence": {
    "total_subcontracts": ${subs.length},
    "active_trades": ${activeTrades.length},
    "not_started": ${notStarted.length},
    "observations": ["Key observation about contract status"]
  },
  "missing_itps": [
    { "itp": "ITP-034", "name": "Gas", "reason": "MRW Plumbing is active but no gas ITP exists" }
  ],
  "recommended_actions": [
    { "action": "What to do", "priority": "high|medium|low", "category": "itps|contracts|compliance|planning" }
  ],
  "coming_up": [
    { "item": "What's expected next based on construction sequence", "timeframe": "This week|Next 2 weeks|Next month" }
  ]
}

Rules:
- activity_this_week: max 6 items. Focus on what actually happened (closed ITPs, new contracts, site activity). category must be one of: itps, contracts, site, compliance.
- risks: max 5. Severity must be high/medium/low. high = active trade without ITP coverage. medium = upcoming gap. low = minor observation.
- missing_itps: only ITPs that SHOULD exist now but don't. Cross-reference active trades against the ITP schedule. Don't flag ITPs that are already open or closed.
- recommended_actions: max 5, most important first. priority must be high/medium/low. category must be one of: itps, contracts, compliance, planning.
- coming_up: max 4 items based on construction sequence and project stage.
- contract_intelligence.observations: max 3 short observations.
- executive_summary: max 3 sentences. Concrete, not generic.
- Do NOT invent data. If daily logs are empty, say site activity is unknown, don't make it up.`;
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const accessToken = await resolveAccessToken();
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated with Procore." }, { status: 401 });
  }

  const sp = request.nextUrl.searchParams;
  const projectId = sp.get("project_id");
  const companyId = sp.get("company_id");
  const forceRefresh = sp.get("force") === "true";

  if (!projectId || !companyId) {
    return NextResponse.json({ error: "project_id and company_id are required." }, { status: 400 });
  }

  // ── Check cache first ────────────────────────────────────────────────────
  const today = new Date().toISOString().slice(0, 10);

  if (!forceRefresh) {
    try {
      const { data: cached } = await supabase
        .from("project_digests")
        .select("digest, generated_at")
        .eq("company_id", companyId)
        .eq("procore_project_id", projectId)
        .eq("digest_date", today)
        .single();

      if (cached?.digest) {
        const parsed = typeof cached.digest === "string" ? JSON.parse(cached.digest) : cached.digest;
        return NextResponse.json({
          ...parsed,
          generated_at: cached.generated_at,
          cached: true,
        });
      }
    } catch {
      // No cache hit, generate fresh
    }
  }

  // ── Fetch all Procore data ───────────────────────────────────────────────
  const data = await fetchDigestData(projectId, companyId, accessToken);

  // ── Generate digest via Claude ───────────────────────────────────────────
  const prompt = buildDigestPrompt(data);

  try {
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = msg.content
      .filter(b => b.type === "text")
      .map(b => (b as { type: "text"; text: string }).text)
      .join("")
      .trim();

    // Strip markdown code fences if present
    let cleaned = raw;
    if (cleaned.startsWith("```")) {
      // Remove opening fence (```json or ```)
      cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "");
      // Remove closing fence if present
      cleaned = cleaned.replace(/\n?\s*```\s*$/, "");
    }

    // Extract JSON — find the outermost balanced braces
    let jsonStr = "";
    const startIdx = cleaned.indexOf("{");
    if (startIdx === -1) {
      return NextResponse.json({ error: "AI returned no JSON object", raw: cleaned.slice(0, 500) }, { status: 500 });
    }
    let depth = 0;
    for (let i = startIdx; i < cleaned.length; i++) {
      if (cleaned[i] === "{") depth++;
      else if (cleaned[i] === "}") depth--;
      if (depth === 0) {
        jsonStr = cleaned.slice(startIdx, i + 1);
        break;
      }
    }
    if (!jsonStr) {
      return NextResponse.json({ error: "AI returned unbalanced JSON", raw: cleaned.slice(0, 500) }, { status: 500 });
    }

    let digest;
    try {
      digest = JSON.parse(jsonStr);
    } catch (parseErr) {
      return NextResponse.json({
        error: "AI returned malformed JSON",
        parse_error: parseErr instanceof Error ? parseErr.message : String(parseErr),
        raw: jsonStr.slice(0, 1000),
      }, { status: 500 });
    }
    const generatedAt = new Date().toISOString();

    // ── Cache in Supabase ────────────────────────────────────────────────
    try {
      await supabase.from("project_digests").upsert(
        {
          company_id: companyId,
          procore_project_id: projectId,
          digest_date: today,
          digest: JSON.stringify(digest),
          generated_at: generatedAt,
          procore_errors: data.errors,
        },
        { onConflict: "company_id,procore_project_id,digest_date" },
      );
    } catch {
      // Non-fatal
    }

    return NextResponse.json({
      ...digest,
      generated_at: generatedAt,
      cached: false,
      procore_errors: data.errors.length > 0 ? data.errors : undefined,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
