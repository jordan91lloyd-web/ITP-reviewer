// ─── GET /api/procore/project-financial-summary?project_id=X&company_id=Y ────
// Fetches prime contract, work-order subcontracts, and recent payment
// applications for a project, then computes financial completion metrics.
//
// Returns:
//   {
//     project_id, contract_sum, total_claimed, completion_pct,
//     active_trades: [{ name, vendor_name, last_claim_date, amount_this_period }],
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

  // ── A. Prime contract ──────────────────────────────────────────────────────

  let contractSum: number | null = null;

  const primeRes = await procoreGet(
    `/rest/v1.0/prime_contracts?project_id=${projectId}&company_id=${companyId}`,
    accessToken, companyId,
  );

  if (primeRes.ok && Array.isArray(primeRes.data) && primeRes.data.length > 0) {
    const pc = primeRes.data[0] as Record<string, unknown>;
    contractSum =
      (typeof pc.contract_sum_including_changes === "number" ? pc.contract_sum_including_changes : null) ??
      (typeof pc.original_contract_sum           === "number" ? pc.original_contract_sum           : null) ??
      (typeof pc.grand_total                     === "number" ? pc.grand_total                     : null);
  } else if (!primeRes.ok) {
    // Fallback: singular endpoint
    const singRes = await procoreGet(
      `/rest/v1.0/projects/${projectId}/prime_contract?company_id=${companyId}`,
      accessToken, companyId,
    );
    if (singRes.ok && singRes.data) {
      const pc = singRes.data as Record<string, unknown>;
      contractSum =
        (typeof pc.contract_sum_including_changes === "number" ? pc.contract_sum_including_changes : null) ??
        (typeof pc.original_contract_sum           === "number" ? pc.original_contract_sum           : null) ??
        (typeof pc.grand_total                     === "number" ? pc.grand_total                     : null);
    } else {
      errors.push(`Prime contract: ${singRes.error ?? primeRes.error}`);
    }
  }

  // ── B. Work-order subcontracts ─────────────────────────────────────────────

  interface Subcontract {
    id: number;
    title: string;
    vendor_name: string;
    executed_contract_amount: number | null;
    status: string;
  }

  let subcontracts: Subcontract[] = [];

  const woRes = await procoreGet(
    `/rest/v1.0/work_order_contracts?project_id=${projectId}&company_id=${companyId}&view=default&per_page=15`,
    accessToken, companyId,
  );

  if (woRes.ok && Array.isArray(woRes.data)) {
    subcontracts = (woRes.data as Record<string, unknown>[]).slice(0, 15).map(c => ({
      id:                       Number(c.id),
      title:                    String(c.title ?? c.number ?? ""),
      vendor_name:              String((c.vendor as Record<string, unknown>)?.name ?? c.vendor_name ?? ""),
      executed_contract_amount: typeof c.executed_contract_amount === "number" ? c.executed_contract_amount : null,
      status:                   String(c.status ?? ""),
    }));
  } else if (!woRes.ok) {
    errors.push(`Work order contracts: ${woRes.error}`);
  }

  // ── C. Payment applications per subcontract (parallel) ────────────────────

  interface PayApp {
    subcontract_id: number;
    subcontract_title: string;
    vendor_name: string;
    billing_period_end_date: string | null;
    status: string;
    work_completed_this_period: number;
    work_completed_from_start: number;
    created_at: string | null;
  }

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const payAppResults = await Promise.all(
    subcontracts.map(async sub => {
      const paRes = await procoreGet(
        `/rest/v1.0/work_order_contracts/${sub.id}/payment_applications?company_id=${companyId}&per_page=10`,
        accessToken, companyId,
      );
      if (!paRes.ok || !Array.isArray(paRes.data)) return [];

      return (paRes.data as Record<string, unknown>[])
        .filter(pa => {
          if (!pa.created_at) return true; // include if no date
          return new Date(String(pa.created_at)) >= thirtyDaysAgo;
        })
        .map(pa => ({
          subcontract_id:            sub.id,
          subcontract_title:         sub.title,
          vendor_name:               sub.vendor_name,
          billing_period_end_date:   pa.billing_period_end_date ? String(pa.billing_period_end_date) : null,
          status:                    String(pa.status ?? ""),
          work_completed_this_period: typeof pa.work_completed_this_period === "number" ? pa.work_completed_this_period : 0,
          work_completed_from_start:  typeof pa.work_completed_from_start  === "number" ? pa.work_completed_from_start  : 0,
          created_at:                pa.created_at ? String(pa.created_at) : null,
        } satisfies PayApp));
    })
  );

  const allPayApps = payAppResults.flat();

  // Latest pay app per subcontract
  const latestBySubMap = new Map<number, PayApp>();
  for (const pa of allPayApps) {
    const existing = latestBySubMap.get(pa.subcontract_id);
    if (!existing || (pa.created_at ?? "") > (existing.created_at ?? "")) {
      latestBySubMap.set(pa.subcontract_id, pa);
    }
  }

  // ── Compute financial summary ───────────────────────────────────────────────

  const latestPayApps = Array.from(latestBySubMap.values());
  const totalClaimed  = latestPayApps.reduce((s, pa) => s + pa.work_completed_from_start, 0);
  const completionPct = contractSum && contractSum > 0
    ? Math.round((totalClaimed / contractSum) * 100 * 10) / 10
    : null;

  // Active trades = subs with a payment app in the last 30 days
  const activeTrades = latestPayApps
    .filter(pa => {
      if (!pa.created_at) return false;
      return new Date(pa.created_at) >= thirtyDaysAgo;
    })
    .sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? ""))
    .map(pa => ({
      name:               pa.subcontract_title,
      vendor_name:        pa.vendor_name,
      last_claim_date:    pa.billing_period_end_date ?? pa.created_at ?? "",
      amount_this_period: pa.work_completed_this_period,
    }));

  return NextResponse.json({
    project_id:     projectId,
    contract_sum:   contractSum,
    total_claimed:  totalClaimed > 0 ? totalClaimed : null,
    completion_pct: completionPct,
    active_trades:  activeTrades,
    fetched_at:     new Date().toISOString(),
    errors,
  });
}
