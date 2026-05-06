// ─── GET /api/breadcrumb/debug ────────────────────────────────────────────────
// Temporary debug endpoint — returns raw Breadcrumb API responses so we can
// inspect the actual response shape before finalising the integration.
// Remove this route once the integration is confirmed working.

import { NextResponse } from "next/server";

const API_KEY  = process.env.BREADCRUMB_API_KEY;
const BASE_URL = (process.env.BREADCRUMB_API_BASE_URL ?? "https://ext-au.1bc.app").replace(/\/$/, "");

async function callBreakcrumb(
  path: string,
  body: Record<string, unknown>,
): Promise<{ status: number; ok: boolean; body: unknown; error?: string }> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "X-Api-Key": API_KEY ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15_000),
    });

    let responseBody: unknown;
    try {
      responseBody = await res.json();
    } catch {
      responseBody = await res.text().catch(() => "(could not read body)");
    }

    return { status: res.status, ok: res.ok, body: responseBody };
  } catch (err) {
    return {
      status: 0,
      ok: false,
      body: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function GET() {
  const [siteList, formReport, approvalReport] = await Promise.all([
    callBreakcrumb("/integration/site/list", {
      includeProcoreEntities: true,
    }),
    callBreakcrumb("/integration/v2/report/form-report", {
      sumbittedDateRange: {
        from: "2026-04-21T00:00:00",
        to:   "2026-04-29T23:59:59",
      },
      pagingInfo: { pageSize: 10, pageNumber: 1 },
      convertDateTimeToLocalTimezone: true,
    }),
    callBreakcrumb("/integration/v2/report/approval-report", {
      approveStatusList:     [0],
      approveEntityTypeList: [1],
      pagingInfo: { pageSize: 10, pageNumber: 1 },
    }),
  ]);

  return NextResponse.json({
    apiKeyConfigured: !!API_KEY,
    baseUrl: BASE_URL,
    siteList,
    formReport,
    approvalReport,
  });
}
