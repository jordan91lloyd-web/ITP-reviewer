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
// Generates a rich project digest by pulling 12+ Procore data sources
// and sending them to Claude for analysis.
//
// Data sources: project, prime contracts, subcontracts, purchase orders,
// inspections, action plans, daily logs, direct costs (30d), RFIs,
// submittals, budget line items, PCOs, payment applications, incidents.

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
      const wait = Math.pow(2, attempt + 1) * 1000;
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
async function safe(path: string, token: string, companyId: string): Promise<{ data: any; error: string | null }> {
  try {
    const data = await procoreGet(path, token, companyId);
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : String(err) };
  }
}

// ── ITP schedule ──────────────────────────────────────────────────────────────

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

// ── Data fetching ─────────────────────────────────────────────────────────────

interface DigestData {
  project: { id: string; name: string };
  primeContracts: unknown[];
  subcontracts: unknown[];
  purchaseOrders: unknown[];
  inspections: unknown[];
  actionPlans: unknown[];
  dailyLogs: unknown[];
  directCosts: unknown[];
  rfis: unknown[];
  submittals: unknown[];
  budgetLines: unknown[];
  pcos: unknown[];
  paymentApps: unknown[];
  incidents: unknown[];
  photoActivity: { album: string; total: number; recent7d: number }[];
  errors: string[];
}

function fmtDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

async function fetchDigestData(
  projectId: string,
  companyId: string,
  token: string,
): Promise<DigestData> {
  const errors: string[] = [];
  const p = projectId;
  const c = companyId;

  // Batch 1: project + prime contracts
  const [projectRes, primeRes] = await Promise.all([
    safe(`/rest/v1.0/projects/${p}?company_id=${c}`, token, c),
    safe(`/rest/v1.0/prime_contracts?project_id=${p}&company_id=${c}`, token, c),
  ]);
  await sleep(600);

  // Batch 2: subcontracts + purchase orders
  const [subRes, poRes] = await Promise.all([
    safe(`/rest/v1.0/work_order_contracts?project_id=${p}&company_id=${c}&view=default`, token, c),
    safe(`/rest/v1.0/purchase_order_contracts?project_id=${p}&company_id=${c}`, token, c),
  ]);
  await sleep(600);

  // Batch 3: inspections + action plans
  const [inspRes, apRes] = await Promise.all([
    safe(`/rest/v1.0/projects/${p}/checklist/lists?company_id=${c}&per_page=250`, token, c),
    safe(`/rest/v1.0/projects/${p}/action_plans/plans?company_id=${c}`, token, c),
  ]);
  await sleep(600);

  // Batch 4: direct costs (last 30 days, capped) + daily logs
  const [dcRes, logsRes] = await Promise.all([
    safe(`/rest/v1.0/projects/${p}/direct_costs?company_id=${c}&per_page=100&filters[updated_at]=${fmtDate(30)}...${fmtDate(0)}`, token, c),
    safe(`/rest/v1.0/projects/${p}/daily_construction_report_logs?company_id=${c}&per_page=10&filters[log_date]=${fmtDate(7)}...${fmtDate(0)}`, token, c),
  ]);
  await sleep(600);

  // Batch 5: RFIs (recent) + submittals
  const [rfiRes, submlRes] = await Promise.all([
    safe(`/rest/v1.0/projects/${p}/rfis?company_id=${c}&per_page=50&filters[updated_at]=${fmtDate(30)}...${fmtDate(0)}`, token, c),
    safe(`/rest/v1.0/projects/${p}/submittals?company_id=${c}&per_page=50&filters[updated_at]=${fmtDate(30)}...${fmtDate(0)}`, token, c),
  ]);
  await sleep(600);

  // Batch 6: budget + PCOs
  const [budgetRes, pcoRes] = await Promise.all([
    safe(`/rest/v1.0/budget_line_items?project_id=${p}&company_id=${c}&per_page=200`, token, c),
    safe(`/rest/v1.0/potential_change_orders?project_id=${p}&company_id=${c}&per_page=50&filters[updated_at]=${fmtDate(30)}...${fmtDate(0)}`, token, c),
  ]);
  await sleep(600);

  // Batch 7: payment applications + incidents
  const [payRes, incRes] = await Promise.all([
    safe(`/rest/v1.0/payment_applications?project_id=${p}&company_id=${c}&per_page=20`, token, c),
    safe(`/rest/v1.0/projects/${p}/incidents?company_id=${c}&per_page=20&filters[updated_at]=${fmtDate(30)}...${fmtDate(0)}`, token, c),
  ]);
  await sleep(600);

  // Batch 8: photo albums (lightweight — just album names and counts)
  const albumsRes = await safe(`/rest/v1.0/image_categories?project_id=${p}&per_page=200`, token, c);

  // For albums with photos, fetch recent images (last 7 days) to count activity
  // Only check top 20 albums by count to limit API calls
  const photoActivity: DigestData["photoActivity"] = [];
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400_000);

  if (albumsRes.data && Array.isArray(albumsRes.data)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nonEmpty = (albumsRes.data as any[])
      .filter(a => (a.count ?? 0) > 0)
      .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
      .slice(0, 20);

    // Fetch recent photos in batches of 2
    for (let i = 0; i < nonEmpty.length; i += 2) {
      const batch = nonEmpty.slice(i, i + 2);
      const results = await Promise.all(batch.map(album =>
        safe(`/rest/v1.0/images?project_id=${p}&image_category_id=${album.id}&per_page=100&filters[created_at]=${fmtDate(7)}...${fmtDate(0)}`, token, c)
      ));
      for (let j = 0; j < batch.length; j++) {
        const recentCount = Array.isArray(results[j].data) ? results[j].data.length : 0;
        photoActivity.push({
          album: batch[j].name ?? `Album ${batch[j].id}`,
          total: batch[j].count ?? 0,
          recent7d: recentCount,
        });
      }
      if (i + 2 < nonEmpty.length) await sleep(600);
    }
  }

  // Collect errors (non-fatal — we still generate with whatever data we have)
  const sources: [string, { error: string | null }][] = [
    ["Project", projectRes], ["Prime contracts", primeRes], ["Subcontracts", subRes],
    ["Purchase orders", poRes], ["Inspections", inspRes], ["Action plans", apRes],
    ["Direct costs", dcRes], ["Daily logs", logsRes], ["RFIs", rfiRes],
    ["Submittals", submlRes], ["Budget", budgetRes], ["PCOs", pcoRes],
    ["Payments", payRes], ["Incidents", incRes], ["Photos", albumsRes],
  ];
  for (const [name, res] of sources) {
    if (res.error) errors.push(`${name}: ${res.error}`);
  }

  const arr = (r: { data: unknown }) => Array.isArray(r.data) ? r.data : [];

  return {
    project: { id: p, name: projectRes.data?.name ?? projectRes.data?.display_name ?? `Project ${p}` },
    primeContracts: arr(primeRes),
    subcontracts: arr(subRes),
    purchaseOrders: arr(poRes),
    inspections: arr(inspRes),
    actionPlans: arr(apRes),
    dailyLogs: arr(logsRes),
    directCosts: arr(dcRes),
    rfis: arr(rfiRes),
    submittals: arr(submlRes),
    budgetLines: arr(budgetRes),
    pcos: arr(pcoRes),
    paymentApps: arr(payRes),
    incidents: arr(incRes),
    photoActivity,
    errors,
  };
}

// ── Build the Claude prompt ───────────────────────────────────────────────────

function buildDigestPrompt(data: DigestData): string {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const fmtVal = (n: number) => n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `$${Math.round(n / 1_000)}k` : `$${n}`;

  // ── Financial summary ───────────────────────────────────────────────────
  const subs = data.subcontracts as any[];
  const totalSubValue = subs.reduce((s, c) => s + (parseFloat(c.revised_contract ?? "0") || 0), 0);
  const totalPaid = subs.reduce((s, c) => s + (parseFloat(c.total_payments ?? "0") || 0), 0);
  const completionPct = totalSubValue > 0 ? Math.round((totalPaid / totalSubValue) * 1000) / 10 : 0;
  const primeValue = (data.primeContracts as any[]).reduce((s, pc) => s + (parseFloat(pc.revised_contract_amount ?? "0") || 0), 0);

  // ── Active trades ───────────────────────────────────────────────────────
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  const activeTrades = subs.filter((c: any) => {
    const pct = parseFloat(c.percentage_paid ?? "0") || 0;
    return pct > 5 && c.updated_at && new Date(c.updated_at) >= ninetyDaysAgo;
  }).map((c: any) => {
    const vendor = c.vendor?.company ?? c.title ?? "Unknown";
    const pct = Math.round(parseFloat(c.percentage_paid ?? "0"));
    const val = parseFloat(c.revised_contract ?? "0") || 0;
    return `  - ${vendor}: ${pct}% paid, contract ${fmtVal(val)}, last activity ${c.updated_at?.slice(0, 10) ?? "?"}`;
  });

  // ── Contracts not started ───────────────────────────────────────────────
  const notStarted = subs.filter((c: any) => {
    const pct = parseFloat(c.percentage_paid ?? "0") || 0;
    const val = parseFloat(c.revised_contract ?? "0") || 0;
    return pct <= 5 && val > 10_000;
  }).map((c: any) => `  - ${c.vendor?.company ?? c.title ?? "Unknown"}: ${fmtVal(parseFloat(c.revised_contract ?? "0") || 0)}`);

  // ── Purchase orders ─────────────────────────────────────────────────────
  const pos = data.purchaseOrders as any[];
  const poLines = pos.length > 0
    ? pos.slice(0, 15).map((po: any) => `  - ${po.vendor?.company ?? po.title ?? "Unknown"}: ${fmtVal(parseFloat(po.grand_total ?? "0") || 0)} [${po.status ?? "?"}]`).join("\n")
    : "  None";

  // ── Inspections ─────────────────────────────────────────────────────────
  const inspections = data.inspections as any[];
  const openItps = inspections.filter(i => i.status !== "closed");
  const closedItps = inspections.filter(i => i.status === "closed");
  const recentClosed = closedItps.filter(i => {
    if (!i.updated_at) return false;
    return (Date.now() - new Date(i.updated_at).getTime()) / 86400_000 <= 14;
  });

  // ── Direct costs (last 30 days) ─────────────────────────────────────────
  const costs = data.directCosts as any[];
  // Group by vendor and sum
  const costByVendor = new Map<string, number>();
  for (const dc of costs) {
    const vendor = dc.vendor?.name ?? dc.vendor?.company ?? "Unassigned";
    const amt = parseFloat(dc.amount ?? dc.grand_total ?? "0") || 0;
    costByVendor.set(vendor, (costByVendor.get(vendor) ?? 0) + amt);
  }
  const topCosts = [...costByVendor.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
  const costLines = topCosts.length > 0
    ? topCosts.map(([v, a]) => `  - ${v}: ${fmtVal(a)}`).join("\n")
    : "  No direct costs recorded in last 30 days";

  // ── RFIs ────────────────────────────────────────────────────────────────
  const rfis = data.rfis as any[];
  const openRfis = rfis.filter(r => r.status?.toLowerCase() !== "closed");
  const overdueRfis = rfis.filter(r => {
    if (!r.due_date || r.status?.toLowerCase() === "closed") return false;
    return new Date(r.due_date) < new Date();
  });
  const rfiLines = [
    `${rfis.length} RFIs active in last 30 days (${openRfis.length} open, ${rfis.length - openRfis.length} closed)`,
    overdueRfis.length > 0 ? `${overdueRfis.length} OVERDUE: ${overdueRfis.slice(0, 5).map(r => `#${r.number} ${r.subject?.slice(0, 40)}`).join("; ")}` : "None overdue",
    openRfis.length > 0 ? `Recent open: ${openRfis.slice(0, 5).map(r => `#${r.number} ${r.subject?.slice(0, 40)} [${r.responsible_contractor?.name ?? "unassigned"}]`).join("; ")}` : "",
  ].filter(Boolean);

  // ── Submittals ──────────────────────────────────────────────────────────
  const submittals = data.submittals as any[];
  const pendingSubs = submittals.filter(s => {
    const st = typeof s.status === "object" ? s.status?.name : s.status;
    return st && !["closed", "approved"].includes(st.toLowerCase());
  });
  const submittalLines = [
    `${submittals.length} submittals active in last 30 days (${pendingSubs.length} pending)`,
    pendingSubs.length > 0 ? `Pending: ${pendingSubs.slice(0, 5).map(s => `#${s.number} ${s.title?.slice(0, 40)}`).join("; ")}` : "",
  ].filter(Boolean);

  // ── Budget snapshot ─────────────────────────────────────────────────────
  const budget = data.budgetLines as any[];
  const totalBudget = budget.reduce((s, b) => s + (parseFloat(b.original_budget_amount ?? "0") || 0), 0);
  const totalCommitted = budget.reduce((s, b) => s + (parseFloat(b.committed_costs ?? "0") || 0), 0);
  const totalDirectCost = budget.reduce((s, b) => s + (parseFloat(b.direct_costs ?? "0") || 0), 0);
  const projectedOverUnder = budget.reduce((s, b) => s + (parseFloat(b.projected_over_under ?? "0") || 0), 0);
  const overBudgetLines = budget.filter(b => (parseFloat(b.projected_over_under ?? "0") || 0) < -1000);

  // ── PCOs (potential change orders) ──────────────────────────────────────
  const pcos = data.pcos as any[];
  const openPcos = pcos.filter(p => p.status?.toLowerCase() !== "closed" && p.status?.toLowerCase() !== "void");
  const pcoTotal = openPcos.reduce((s, p) => s + (parseFloat(p.grand_total ?? "0") || 0), 0);

  // ── Payment applications ────────────────────────────────────────────────
  const payments = data.paymentApps as any[];
  const recentPayments = payments.slice(0, 5);

  // ── Incidents ───────────────────────────────────────────────────────────
  const incidents = data.incidents as any[];

  // ── Action plans ────────────────────────────────────────────────────────
  const plans = data.actionPlans as any[];

  // ── Daily logs ──────────────────────────────────────────────────────────
  const logs = data.dailyLogs as any[];

  return `You are a senior construction QA manager reviewing a project for a weekly intelligence digest. You work for Fleek Constructions in Sydney, Australia. Analyse ALL the data below to build the most accurate picture of what is happening on this site.

PROJECT: ${data.project.name}
Head contract value: ${primeValue > 0 ? fmtVal(primeValue) : "Not recorded"}
Subcontract completion: ${completionPct}% of ${fmtVal(totalSubValue)} total subcontract value
${subs.length} subcontracts, ${pos.length} purchase orders

═══ FINANCIAL SNAPSHOT ═══
Original budget: ${totalBudget > 0 ? fmtVal(totalBudget) : "Not set"}
Total committed: ${totalCommitted > 0 ? fmtVal(totalCommitted) : "None"}
Total direct costs: ${totalDirectCost > 0 ? fmtVal(totalDirectCost) : "None"}
Projected over/under: ${projectedOverUnder !== 0 ? (projectedOverUnder > 0 ? `+${fmtVal(projectedOverUnder)} UNDER budget` : `-${fmtVal(Math.abs(projectedOverUnder))} OVER budget`) : "On budget"}
${overBudgetLines.length > 0 ? `⚠ ${overBudgetLines.length} cost codes projected over budget` : "No cost codes over budget"}

═══ ACTIVE TRADES (subcontracts active in last 90 days) ═══
${activeTrades.length > 0 ? activeTrades.join("\n") : "  None"}

═══ CONTRACTS NOT YET STARTED ═══
${notStarted.length > 0 ? notStarted.join("\n") : "  None"}

═══ PURCHASE ORDERS ═══
${poLines}

═══ DIRECT COSTS (last 30 days — who is billing = who is working) ═══
${costs.length} cost entries in last 30 days, total ${fmtVal(costs.reduce((s, c) => s + (parseFloat(c.amount ?? c.grand_total ?? "0") || 0), 0))}
Top vendors by spend:
${costLines}

═══ INSPECTIONS (ITPs) ═══
Total: ${inspections.length} (${openItps.length} open, ${closedItps.length} closed)
${recentClosed.length > 0 ? `Recently closed (14d): ${recentClosed.map(i => i.name).join(", ")}` : "No inspections closed in the last 14 days"}
${openItps.length > 0 ? `Currently open: ${openItps.slice(0, 20).map(i => `${i.name} [${i.status}]`).join(", ")}` : "No open inspections"}

═══ RFIs ═══
${rfiLines.join("\n")}

═══ SUBMITTALS ═══
${submittalLines.join("\n")}

═══ POTENTIAL CHANGE ORDERS (PCOs) — last 30 days ═══
${pcos.length} PCOs, ${openPcos.length} open, total value of open PCOs: ${fmtVal(pcoTotal)}
${openPcos.length > 0 ? openPcos.slice(0, 5).map(p => `  - #${p.number} ${p.title?.slice(0, 50)} [${p.status}] ${fmtVal(parseFloat(p.grand_total ?? "0") || 0)}`).join("\n") : "  None"}

═══ PAYMENT APPLICATIONS (progress claims) ═══
${recentPayments.length > 0 ? recentPayments.map(pa => `  - #${pa.number} ${pa.billing_date?.slice(0, 10) ?? "?"}: ${fmtVal(parseFloat(pa.total_amount_paid ?? "0") || 0)} [${pa.status}]`).join("\n") : "  No payment applications"}

═══ INCIDENTS (last 30 days) ═══
${incidents.length > 0 ? incidents.slice(0, 5).map(inc => `  - ${inc.event_date?.slice(0, 10) ?? "?"}: ${inc.title ?? "Untitled"} [${inc.status}]`).join("\n") : "  No incidents recorded"}

═══ ACTION PLANS / TRACKERS ═══
${plans.length > 0 ? plans.map(p => `  - ${p.title ?? p.name ?? "Untitled"} [${p.status ?? "?"}]`).join("\n") : "  None"}

═══ PHOTO ACTIVITY (last 7 days — photos uploaded = work being documented) ═══
${(() => {
  const active = data.photoActivity.filter(a => a.recent7d > 0);
  const totalRecent = active.reduce((s, a) => s + a.recent7d, 0);
  const totalAll = data.photoActivity.reduce((s, a) => s + a.total, 0);
  if (active.length === 0) return `No photos uploaded in the last 7 days (${totalAll} total across ${data.photoActivity.length} albums)`;
  return `${totalRecent} photos uploaded across ${active.length} albums this week (${totalAll} total)\n` +
    active.sort((a, b) => b.recent7d - a.recent7d).slice(0, 15)
      .map(a => `  - ${a.album}: ${a.recent7d} new this week (${a.total} total)`)
      .join("\n");
})()}

═══ DAILY CONSTRUCTION LOGS (last 7 days) ═══
${logs.length > 0 ? logs.slice(0, 7).map(l => `  - ${l.log_date ?? "?"}: ${l.notes ?? l.conditions ?? "No notes"}`).join("\n") : "  No daily logs in the last 7 days"}

${ITP_SCHEDULE}

Based on ALL the above data, generate a comprehensive weekly project digest. The direct costs data is the strongest signal for what trades are actually working on site — vendors billing = vendors working. Photo uploads confirm work is being documented in specific locations. Cross-reference direct costs, photo activity, and subcontract status against ITP coverage.

Respond with ONLY a valid JSON object:
{
  "executive_summary": "3-4 sentences. Concrete status: financial position, active work, key risks. Reference specific numbers.",
  "project_stage": "One line describing current construction stage",
  "completion_pct": ${completionPct},
  "contract_value": ${primeValue > 0 ? primeValue : "null"},
  "site_activity": [
    { "item": "What is actually happening on site based on direct costs, daily logs, and trade activity", "source": "direct_costs|daily_logs|subcontracts|rfis|submittals" }
  ],
  "financial_health": {
    "budget_status": "On budget / Over budget by $X / Under budget by $X",
    "cashflow_observations": ["Key observation about payments, claims, or cost trends"],
    "cost_code_alerts": ["Any cost codes significantly over budget"]
  },
  "risks": [
    { "title": "Short risk title", "detail": "Why this matters and what to do", "severity": "high|medium|low" }
  ],
  "contract_intelligence": {
    "total_subcontracts": ${subs.length},
    "total_purchase_orders": ${pos.length},
    "active_trades": ${activeTrades.length},
    "not_started": ${notStarted.length},
    "observations": ["Key observation about contract status, gaps, or anomalies"]
  },
  "rfi_status": {
    "open": ${openRfis.length},
    "overdue": ${overdueRfis.length},
    "key_items": ["Most important open or overdue RFIs that could block work"]
  },
  "missing_itps": [
    { "itp": "ITP-034", "name": "Gas", "reason": "Vendor X is actively billing but no gas ITP exists" }
  ],
  "recommended_actions": [
    { "action": "What to do", "priority": "high|medium|low", "category": "itps|contracts|compliance|financial|planning" }
  ],
  "coming_up": [
    { "item": "What's expected next based on all signals", "timeframe": "This week|Next 2 weeks|Next month" }
  ]
}

Rules:
- site_activity: max 8 items. These describe what is ACTUALLY happening based on data evidence. source must be one of: direct_costs, daily_logs, subcontracts, rfis, submittals.
- financial_health: concrete numbers. budget_status must state the dollar amount. cashflow_observations max 3. cost_code_alerts max 3 (only if genuinely over budget).
- risks: max 5. high = requires immediate action. medium = needs attention this week. low = monitor.
- missing_itps: only ITPs that SHOULD exist now but don't. Cross-reference active trades AND direct cost vendors against the ITP schedule. A vendor billing without ITP coverage is a high-severity finding.
- recommended_actions: max 6, most important first. category must be one of: itps, contracts, compliance, financial, planning.
- coming_up: max 5 items.
- rfi_status.key_items: max 3, focus on overdue or blocking items.
- contract_intelligence.observations: max 4.
- Do NOT invent data. Only report what the data shows.`;
  /* eslint-enable @typescript-eslint/no-explicit-any */
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

  // ── Check cache ─────────────────────────────────────────────────────────
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
        return NextResponse.json({ ...parsed, generated_at: cached.generated_at, cached: true });
      }
    } catch {
      // No cache hit
    }
  }

  // ── Fetch Procore data ──────────────────────────────────────────────────
  const data = await fetchDigestData(projectId, companyId, accessToken);

  // ── Generate digest via Claude ──────────────────────────────────────────
  const prompt = buildDigestPrompt(data);

  try {
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 6000,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = msg.content
      .filter(b => b.type === "text")
      .map(b => (b as { type: "text"; text: string }).text)
      .join("")
      .trim();

    // Strip markdown code fences
    let cleaned = raw;
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "");
      cleaned = cleaned.replace(/\n?\s*```\s*$/, "");
    }

    // Extract outermost JSON object
    const startIdx = cleaned.indexOf("{");
    if (startIdx === -1) {
      return NextResponse.json({ error: "AI returned no JSON", raw: cleaned.slice(0, 500) }, { status: 500 });
    }
    let depth = 0;
    let jsonStr = "";
    for (let i = startIdx; i < cleaned.length; i++) {
      if (cleaned[i] === "{") depth++;
      else if (cleaned[i] === "}") depth--;
      if (depth === 0) { jsonStr = cleaned.slice(startIdx, i + 1); break; }
    }
    if (!jsonStr) {
      return NextResponse.json({ error: "AI returned unbalanced JSON", raw: cleaned.slice(0, 500) }, { status: 500 });
    }

    let digest;
    try {
      digest = JSON.parse(jsonStr);
    } catch (e) {
      return NextResponse.json({ error: "AI returned malformed JSON", parse_error: (e as Error).message, raw: jsonStr.slice(0, 1000) }, { status: 500 });
    }

    const generatedAt = new Date().toISOString();

    // ── Cache ─────────────────────────────────────────────────────────────
    try {
      await supabase.from("project_digests").upsert(
        {
          company_id: companyId, procore_project_id: projectId,
          digest_date: today, digest: JSON.stringify(digest),
          generated_at: generatedAt, procore_errors: data.errors,
        },
        { onConflict: "company_id,procore_project_id,digest_date" },
      );
    } catch { /* non-fatal */ }

    return NextResponse.json({
      ...digest, generated_at: generatedAt, cached: false,
      procore_errors: data.errors.length > 0 ? data.errors : undefined,
    });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
