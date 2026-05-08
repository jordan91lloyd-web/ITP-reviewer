// ─── GET /api/procore/project-financial-summary?project_id=X&company_id=Y ────
// Fetches prime contract and work-order subcontracts for a project, then
// computes financial completion metrics.
//
// Returns:
//   {
//     project_id, contract_sum, total_claimed, completion_pct,
//     active_trades: [{ name, last_activity, percentage_paid, contract_value }],
//     fetched_at, errors
//   }
//
// Never throws. All per-call failures are collected in `errors[]`.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PROCORE_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function procoreGet(path: string, accessToken: string, companyId: string): Promise<{ ok: boolean; status: number; data: any; error: string | null }> {
  try {
    const res = await fetch(`${PROCORE_BASE}${path}`, {
      headers: {
        Authorization:        `Bearer ${accessToken}`,
        "Procore-Company-Id": companyId,
      },
      signal: AbortSignal.timeout(20_000),
    });
    let data: unknown = null;
    try { data = await res.json(); } catch { /* ignore */ }
    if (!res.ok) {
      const msg = (data as Record<string, unknown>)?.message ?? (data as Record<string, unknown>)?.error ?? `HTTP ${res.status}`;
      return { ok: false, status: res.status, data: null, error: String(msg) };
    }
    return { ok: true, status: res.status, data, error: null };
  } catch (err) {
    return { ok: false, status: 0, data: null, error: err instanceof Error ? err.message : String(err) };
  }
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated with Procore." }, { status: 401 });
  }

  const sp        = request.nextUrl.searchParams;
  const projectId = sp.get("project_id");
  const companyId = sp.get("company_id");

  if (!projectId || !companyId) {
    return NextResponse.json({ error: "project_id and company_id are required." }, { status: 400 });
  }

  const errors: string[] = [];

  // ── A. Prime contract + B. Work-order subcontracts (parallel) ────────────

  const [primeRes, woRes] = await Promise.all([
    procoreGet(
      `/rest/v1.0/prime_contracts?project_id=${projectId}&company_id=${companyId}`,
      accessToken, companyId,
    ),
    procoreGet(
      `/rest/v1.0/work_order_contracts?project_id=${projectId}&company_id=${companyId}&view=default`,
      accessToken, companyId,
    ),
  ]);

  // ── Extract prime contract fields ─────────────────────────────────────────

  let contractSum:   number | null = null;
  let totalClaimed:  number | null = null;
  let completionPct: number | null = null;

  if (primeRes.ok && Array.isArray(primeRes.data) && primeRes.data.length > 0) {
    const pc = primeRes.data[0] as Record<string, unknown>;
    contractSum  = typeof pc.revised_contract_amount === "number" ? pc.revised_contract_amount : null;
    totalClaimed = pc.total_payments != null ? parseFloat(String(pc.total_payments)) : null;
    completionPct = pc.percentage_paid != null ? parseFloat(String(pc.percentage_paid)) : null;
    if (isNaN(totalClaimed  ?? NaN)) totalClaimed  = null;
    if (isNaN(completionPct ?? NaN)) completionPct = null;
  } else if (!primeRes.ok) {
    errors.push(`Prime contract: ${primeRes.error}`);
  }

  // ── Extract work order contracts ──────────────────────────────────────────

  interface Subcontract {
    id:               number;
    title:            string;
    vendor_company:   string;
    percentage_paid:  number;
    contract_value:   number;
    updated_at:       string;
    has_requisitions: boolean;
  }

  let subcontracts: Subcontract[] = [];

  if (woRes.ok && Array.isArray(woRes.data)) {
    subcontracts = (woRes.data as Record<string, unknown>[]).map(c => {
      const vendor = c.vendor as Record<string, unknown> | null | undefined;
      const pctPaid = parseFloat(String(c.percentage_paid ?? "0"));
      const reqAmt  = parseFloat(String(c.total_requisitions_amount ?? "0"));
      return {
        id:               Number(c.id),
        title:            String(c.title ?? c.number ?? ""),
        vendor_company:   String(vendor?.company ?? c.title ?? ""),
        percentage_paid:  isNaN(pctPaid) ? 0 : pctPaid,
        contract_value:   typeof c.revised_contract === "number" ? c.revised_contract : 0,
        updated_at:       String(c.updated_at ?? ""),
        has_requisitions: !isNaN(reqAmt) && reqAmt > 0,
      };
    });
  } else if (!woRes.ok) {
    errors.push(`Work order contracts: ${woRes.error}`);
  }

  // ── Determine active trades (no extra API calls) ──────────────────────────
  // Active = updated within last 60 days AND percentage_paid > 5 AND < 99

  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

  const activeTrades = subcontracts
    .filter(sub => {
      if (sub.percentage_paid <= 5 || sub.percentage_paid >= 99) return false;
      if (!sub.updated_at) return sub.has_requisitions;
      return new Date(sub.updated_at) >= sixtyDaysAgo;
    })
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
    .map(sub => ({
      name:             sub.vendor_company || sub.title,
      last_activity:    sub.updated_at,
      percentage_paid:  sub.percentage_paid,
      contract_value:   sub.contract_value,
    }));

  return NextResponse.json({
    project_id:     projectId,
    contract_sum:   contractSum,
    total_claimed:  totalClaimed,
    completion_pct: completionPct,
    active_trades:  activeTrades,
    fetched_at:     new Date().toISOString(),
    errors,
  });
}
