// ─── GET /api/breadcrumb/approvals ────────────────────────────────────────────
// Fetches approvals (inductions + SWMS/docs) from the Breadcrumb API.
//
// This route requires the BREADCRUMB_API_KEY and BREADCRUMB_API_BASE_URL env
// vars to be set. If they are absent, it returns { source: "env_missing" }
// so the UI can fall back to the CSV upload flow without showing an error.
//
// Query params:
//   company_id  (required — used for audit purposes)
//   days        (optional — number of days to look back, default 7)

import { NextRequest, NextResponse } from "next/server";

const API_KEY  = process.env.BREADCRUMB_API_KEY;
const BASE_URL = process.env.BREADCRUMB_API_BASE_URL;

export async function GET(request: NextRequest) {
  // If the integration is not configured, signal graceful degradation.
  if (!API_KEY || !BASE_URL) {
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

    const url = new URL(`${BASE_URL}/approvals`);
    url.searchParams.set("start_date", startDate.toISOString().slice(0, 10));
    url.searchParams.set("end_date",   endDate.toISOString().slice(0, 10));
    // Include pending approvals regardless of age for the KPI count.
    url.searchParams.set("status", "pending");

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      return NextResponse.json(
        { source: "api_error", error: `Breadcrumb API returned ${res.status}`, rows: [] },
        { status: 502 }
      );
    }

    const data = await res.json();

    const rows: Record<string, string>[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.results)
        ? data.results
        : [];

    return NextResponse.json({ source: "breadcrumb_api", rows });
  } catch (err) {
    return NextResponse.json(
      { source: "api_error", error: err instanceof Error ? err.message : "Unknown error", rows: [] },
      { status: 502 }
    );
  }
}
