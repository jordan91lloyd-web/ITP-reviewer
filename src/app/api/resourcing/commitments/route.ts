// ─── GET /api/resourcing/commitments ──────────────────────────────────────────
// Fetches all commitments for one project from Procore.
//
// Query params:
//   company_id  (required)
//   project_id  (required)

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PROCORE_BASE_URL =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

export interface Commitment {
  id:          string;
  title:       string;
  vendor_name: string;
  status:      string;
  value:       number;
}

export async function GET(request: NextRequest) {
  // ── Auth — exact pattern from dashboard/inspections/route.ts ──────────────
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated with Procore." }, { status: 401 });
  }

  const companyId = request.nextUrl.searchParams.get("company_id");
  const projectId = request.nextUrl.searchParams.get("project_id");

  if (!companyId || !projectId) {
    return NextResponse.json(
      { error: "company_id and project_id are required" },
      { status: 400 },
    );
  }

  // ── Paginated fetch ────────────────────────────────────────────────────────
  const commitments: Commitment[] = [];
  let page = 1;
  const perPage = 100;

  // Debug fields from page 1
  let page1Status = 0;
  let page1RawCount = 0;
  let page1FirstItem: Record<string, unknown> | null = null;

  while (true) {
    // company_id must appear as BOTH query param AND Procore-Company-Id header
    const url = new URL(`${PROCORE_BASE_URL}/rest/v1.0/commitments`);
    url.searchParams.set("project_id", projectId);
    url.searchParams.set("company_id", companyId);
    url.searchParams.set("per_page",   String(perPage));
    url.searchParams.set("page",       String(page));
    url.searchParams.set("view",       "extended");

    const res = await fetch(url.toString(), {
      headers: {
        Authorization:        `Bearer ${accessToken}`,
        "Procore-Company-Id": companyId,
      },
      signal: AbortSignal.timeout(20_000),
    });

    if (page === 1) {
      page1Status = res.status;
    }

    if (!res.ok) break;

    const data: unknown = await res.json();
    if (!Array.isArray(data)) break;

    const items = data as Record<string, unknown>[];

    if (page === 1) {
      page1RawCount  = items.length;
      page1FirstItem = items[0] ?? null;
    }

    for (const item of items) {
      const status = String(item.status ?? "").toLowerCase();
      if (status === "draft" || status === "void") continue;

      const vendor         = item.vendor          as Record<string, unknown> | null | undefined;
      const contractCo     = item.contract_company as Record<string, unknown> | null | undefined;
      const vendorName     = String(
        vendor?.name ?? vendor?.business_name ?? contractCo?.name ?? ""
      );
      const value       = Number(item.grand_total ?? item.revised_contract_amount ?? 0) || 0;

      commitments.push({
        id:          String(item.id ?? ""),
        title:       String(item.title ?? item.number ?? ""),
        vendor_name: vendorName,
        status,
        value,
      });
    }

    if (items.length < perPage) break;
    page++;
  }

  return NextResponse.json({
    commitments,
    _debug: {
      project_id:       projectId,
      company_id:       companyId,
      token_found:      true,
      page1_status:     page1Status,
      page1_raw_count:  page1RawCount,
      page1_first_item: page1FirstItem,
    },
  });
}
