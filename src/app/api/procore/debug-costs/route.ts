// ─── GET /api/procore/debug-costs?project_id=X&company_id=Y ──────────────────
// Debug endpoint — explores what cost/financial data is available in Procore
// for a given project. Makes 4 calls and returns raw shape + status.
// Remove once financial data availability is confirmed.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PROCORE_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

async function probEndpoint(
  url: string,
  accessToken: string,
  companyId: string,
): Promise<{
  status: number;
  total: number | null;
  first_record: unknown;
  error: string | null;
}> {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization:        `Bearer ${accessToken}`,
        "Procore-Company-Id": companyId,
      },
      signal: AbortSignal.timeout(15_000),
    });

    const totalHeader =
      res.headers.get("X-Total") ??
      res.headers.get("total") ??
      null;
    const total = totalHeader !== null ? parseInt(totalHeader, 10) : null;

    let body: unknown;
    try { body = await res.json(); } catch { body = null; }

    if (!res.ok) {
      return {
        status:       res.status,
        total:        null,
        first_record: null,
        error:        typeof body === "object" && body !== null && "message" in body
          ? String((body as Record<string, unknown>).message)
          : `HTTP ${res.status}`,
      };
    }

    const arr   = Array.isArray(body) ? body : null;
    const first = arr ? (arr[0] ?? null) : body;

    return {
      status:       res.status,
      total:        total ?? (arr ? arr.length : null),
      first_record: first,
      error:        null,
    };
  } catch (err) {
    return {
      status:       0,
      total:        null,
      first_record: null,
      error:        err instanceof Error ? err.message : String(err),
    };
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("procore_access_token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Not authenticated with Procore." }, { status: 401 });
    }

    const sp        = request.nextUrl.searchParams;
    const projectId = sp.get("project_id");
    const companyId = sp.get("company_id");

    if (!projectId || !companyId) {
      return NextResponse.json(
        { error: "project_id and company_id are required." },
        { status: 400 },
      );
    }

    const base   = `${PROCORE_BASE}/rest/v1.0`;
    const common = `project_id=${projectId}&company_id=${companyId}`;

    const urls = {
      prime_contracts:                    `${base}/prime_contracts?${common}`,
      work_order_contracts:               `${base}/work_order_contracts?${common}&view=default`,
      budget_line_items:                  `${base}/budget_line_items?${common}`,
      payment_applications_owner_invoices: `${base}/payment_applications_owner_invoices?${common}`,
    };

    const [primeContracts, workOrderContracts, budgetLineItems, ownerInvoices] =
      await Promise.all([
        probEndpoint(urls.prime_contracts,                     accessToken, companyId),
        probEndpoint(urls.work_order_contracts,                accessToken, companyId),
        probEndpoint(urls.budget_line_items,                   accessToken, companyId),
        probEndpoint(urls.payment_applications_owner_invoices, accessToken, companyId),
      ]);

    return NextResponse.json({
      project_id: projectId,
      company_id: companyId,
      procore_env: process.env.PROCORE_ENV ?? "sandbox",
      endpoints: {
        prime_contracts:                    { url: urls.prime_contracts,                     ...primeContracts },
        work_order_contracts:               { url: urls.work_order_contracts,                ...workOrderContracts },
        budget_line_items:                  { url: urls.budget_line_items,                   ...budgetLineItems },
        payment_applications_owner_invoices: { url: urls.payment_applications_owner_invoices, ...ownerInvoices },
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
