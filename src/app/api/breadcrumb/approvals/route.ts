// ─── GET /api/breadcrumb/approvals ────────────────────────────────────────────
// Fetches pending approvals (inductions + SWMS/supplier docs) from Breadcrumb.
//
// Returns { source: "breadcrumb_api", rows } on success.
// Returns { source: "env_missing", rows: [] } if BREADCRUMB_API_KEY is not set.
//
// Query params:
//   company_id  (required)

import { NextRequest, NextResponse } from "next/server";

const API_KEY  = process.env.BREADCRUMB_API_KEY;
const BASE_URL = (process.env.BREADCRUMB_API_BASE_URL ?? "https://ext-au.1bc.app").replace(/\/$/, "");
const PAGE_SIZE = 500;

async function fetchApprovalType(entityType: number): Promise<Record<string, unknown>[]> {
  let pageNumber = 0;
  const all: Record<string, unknown>[] = [];

  while (true) {
    const res = await fetch(`${BASE_URL}/integration/v2/report/approval-report`, {
      method: "POST",
      headers: { "X-Api-Key": API_KEY!, "Content-Type": "application/json" },
      body: JSON.stringify({
        approveStatusList:     [0],
        approveEntityTypeList: [entityType],
        convertDateTimeToLocalTimezone: true,
        pagingInfo: { pageSize: PAGE_SIZE, pageNumber, SortOrder: "DESC" },
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) throw new Error(`Breadcrumb approval-report (type ${entityType}) returned ${res.status}`);

    const data = await res.json();
    const results: Record<string, unknown>[] = Array.isArray(data?.result) ? data.result : [];
    all.push(...results);

    if (results.length < PAGE_SIZE) break;
    pageNumber++;
  }

  return all;
}

export async function GET(request: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ source: "env_missing", rows: [] });
  }

  const companyId = request.nextUrl.searchParams.get("company_id");
  if (!companyId) {
    return NextResponse.json({ error: "company_id is required" }, { status: 400 });
  }

  try {
    // Fetch inductions (type 1) and supplier docs (type 2) in parallel
    const [inductions, swmsDocs] = await Promise.all([
      fetchApprovalType(1),
      fetchApprovalType(2),
    ]);

    // Combine into a single rows array
    const rows = [
      ...inductions.map(r => ({ ...r, _type: "induction" })),
      ...swmsDocs.map(r =>   ({ ...r, _type: "sitesupplierdocument" })),
    ];

    return NextResponse.json({ source: "breadcrumb_api", rows });
  } catch (err) {
    return NextResponse.json(
      { source: "api_error", error: err instanceof Error ? err.message : "Unknown error", rows: [] },
      { status: 502 }
    );
  }
}
