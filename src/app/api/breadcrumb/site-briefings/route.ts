// ─── GET /api/breadcrumb/site-briefings ───────────────────────────────────────
// Fetches form-report data (Daily Prestarts + Toolbox Talks) from Breadcrumb.
//
// Returns { source: "breadcrumb_api", rows } on success.
// Returns { source: "env_missing", rows: [] } if BREADCRUMB_API_KEY is not set.
//
// Query params:
//   company_id  (required)
//   days        (optional — days to look back, default 7, max 31)

import { NextRequest, NextResponse } from "next/server";

const API_KEY  = process.env.BREADCRUMB_API_KEY;
const BASE_URL = (process.env.BREADCRUMB_API_BASE_URL ?? "https://ext-au.1bc.app").replace(/\/$/, "");
const PAGE_SIZE = 500;

async function fetchAllPages(body: Record<string, unknown>): Promise<{
  rows: Record<string, unknown>[];
  _debug_sample: Record<string, unknown>[];
}> {
  let pageNumber = 0;
  const all: Record<string, unknown>[] = [];
  let debugSample: Record<string, unknown>[] = [];

  while (true) {
    const res = await fetch(`${BASE_URL}/integration/v2/report/form-report`, {
      method: "POST",
      headers: { "X-Api-Key": API_KEY!, "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, pagingInfo: { pageSize: PAGE_SIZE, pageNumber, SortOrder: "DESC" } }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) throw new Error(`Breadcrumb form-report returned ${res.status}`);

    const data = await res.json();
    const results: Record<string, unknown>[] = Array.isArray(data?.result) ? data.result : [];

    // DEBUG — capture first 3 raw records from page 0 before any processing
    if (pageNumber === 0) {
      debugSample = results.slice(0, 3);
      console.log("[site-briefings DEBUG] Total records on page 0:", results.length);
      console.log("[site-briefings DEBUG] First 3 raw records:", JSON.stringify(debugSample, null, 2));
    }

    all.push(...results);

    if (results.length < PAGE_SIZE) break;
    pageNumber++;
  }

  return { rows: all, _debug_sample: debugSample };
}

export async function GET(request: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ source: "env_missing", rows: [] });
  }

  const sp        = request.nextUrl.searchParams;
  const companyId = sp.get("company_id");
  const days      = Math.min(parseInt(sp.get("days") ?? "7", 10) || 7, 31);

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required" }, { status: 400 });
  }

  try {
    const endDate   = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - (days - 1));

    const fromDt = `${startDate.toISOString().slice(0, 10)}T00:00:00`;
    const toDt   = `${endDate.toISOString().slice(0, 10)}T23:59:59`;

    const { rows, _debug_sample } = await fetchAllPages({
      sumbittedDateRange: { from: fromDt, to: toDt },
      convertDateTimeToLocalTimezone: true,
    });

    return NextResponse.json({ source: "breadcrumb_api", rows, _debug_sample });
  } catch (err) {
    return NextResponse.json(
      { source: "api_error", error: err instanceof Error ? err.message : "Unknown error", rows: [] },
      { status: 502 }
    );
  }
}
