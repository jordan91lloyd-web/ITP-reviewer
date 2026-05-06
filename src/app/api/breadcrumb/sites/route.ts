// ─── GET /api/breadcrumb/sites ────────────────────────────────────────────────
// Returns all active Breadcrumb sites for the company.
// Sandbox / overhead / completed-project sites are filtered out.
//
// If BREADCRUMB_API_KEY is not set, returns { fallback: true, sites: [] } so
// the UI can degrade gracefully to CSV upload mode.
//
// Query params:
//   company_id  (required)

import { NextRequest, NextResponse } from "next/server";

const API_KEY  = process.env.BREADCRUMB_API_KEY;
const BASE_URL = (process.env.BREADCRUMB_API_BASE_URL ?? "https://ext-au.1bc.app").replace(/\/$/, "");

// Keep in sync with compliance-data/route.ts
const EXCLUDED_SITE_REFERENCES = new Set([
  "BC3477059474",
  "xxxx",
  "XXX",
  "0000",
  "999",
  "001",
]);

const EXCLUDED_NAME_PREFIXES = [
  "do not use",
  "eoi",
  "company",
  "microniche",
];

function isExcluded(siteReference: string, siteName: string): boolean {
  if (EXCLUDED_SITE_REFERENCES.has(siteReference)) return true;
  const lower = siteName.toLowerCase();
  return EXCLUDED_NAME_PREFIXES.some(prefix => lower.startsWith(prefix));
}

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
      body: JSON.stringify({}),
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

    const sites = raw
      .map(s => ({
        siteReference: String(s.siteReference ?? ""),
        siteName:      String(s.name ?? ""),  // confirmed: "name" not "siteName"
      }))
      .filter(s => s.siteReference && s.siteName && !isExcluded(s.siteReference, s.siteName));

    return NextResponse.json({ sites });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error", sites: [] },
      { status: 502 }
    );
  }
}
