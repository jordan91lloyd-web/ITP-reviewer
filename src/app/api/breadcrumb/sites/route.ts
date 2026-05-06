// ─── GET /api/breadcrumb/sites ────────────────────────────────────────────────
// Returns all Breadcrumb sites for the company, including procoreProjectId
// when available (set on the Breadcrumb side via their Procore integration).
//
// If BREADCRUMB_API_KEY is not set, returns { fallback: true, sites: [] } so
// the UI can degrade gracefully to CSV upload mode.
//
// Query params:
//   company_id  (required)

import { NextRequest, NextResponse } from "next/server";

const API_KEY  = process.env.BREADCRUMB_API_KEY;
const BASE_URL = (process.env.BREADCRUMB_API_BASE_URL ?? "https://ext-au.1bc.app").replace(/\/$/, "");

export async function GET(request: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ fallback: true, sites: [] });
  }

  const companyId = request.nextUrl.searchParams.get("company_id");
  if (!companyId) {
    return NextResponse.json({ error: "company_id is required" }, { status: 400 });
  }

  try {
    const res = await fetch(`${BASE_URL}/integration/site/list`, {
      method: "POST",
      headers: {
        "X-Api-Key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ IncludeProcoreEntities: true }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Breadcrumb API returned ${res.status}`, sites: [] },
        { status: 502 }
      );
    }

    const data = await res.json();
    const raw: Array<Record<string, unknown>> = Array.isArray(data?.result)
      ? data.result
      : Array.isArray(data)
        ? data
        : [];

    const sites = raw.map(s => ({
      siteReference:    String(s.siteReference ?? s.SiteReference ?? s.site_reference ?? ""),
      siteName:         String(s.siteName ?? s.SiteName ?? s.site_name ?? ""),
      procoreProjectId: s.procoreProjectId
        ? String(s.procoreProjectId)
        : s.ProcoreProjectId
          ? String(s.ProcoreProjectId)
          : null,
    })).filter(s => s.siteReference && s.siteName);

    return NextResponse.json({ sites });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error", sites: [] },
      { status: 502 }
    );
  }
}
