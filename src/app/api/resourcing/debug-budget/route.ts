// ─── GET /api/resourcing/debug-budget ─────────────────────────────────────────
// Debug route — fetches raw data from the Reporting View to inspect whether
// vendor/subcontractor data is present in budget detail rows.
//
// Query params:
//   project_id  — defaults to 598134325830369 if omitted

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PROCORE_BASE_URL =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

const COMPANY_ID        = "598134325535477";
const REPORTING_VIEW_ID = "598134325655435"; // "Reporting View" — suspected to contain vendor data
const TEST_COMMITMENT   = "598134325632497"; // Structural Steel — Fed Rd

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const projectId = request.nextUrl.searchParams.get("project_id") ?? "598134325830369";

  const headers = {
    Authorization:        `Bearer ${accessToken}`,
    "Procore-Company-Id": COMPANY_ID,
  };

  const result: Record<string, unknown> = { project_id: projectId, view_id: REPORTING_VIEW_ID };

  // ── 1. Reporting View detail rows ────────────────────────────────────────────
  try {
    const url = new URL(`${PROCORE_BASE_URL}/rest/v1.0/budget_views/${REPORTING_VIEW_ID}/detail_rows`);
    url.searchParams.set("project_id", projectId);
    url.searchParams.set("company_id", COMPANY_ID);
    url.searchParams.set("per_page",   "20");

    const res  = await fetch(url.toString(), { headers, signal: AbortSignal.timeout(15_000) });
    const data: unknown = await res.json();

    result.detail_rows_status = res.status;

    if (Array.isArray(data)) {
      result.total_rows_returned = data.length;

      // Field names from first row — tells us what fields Procore returns
      if (data.length > 0) {
        result.field_names = Object.keys(data[0] as object);
      }

      // First 5 rows in full so we can see if vendor appears anywhere
      result.first_5_rows = data.slice(0, 5);
    } else {
      result.detail_rows_raw = data;
    }
  } catch (e) {
    result.detail_rows_error = e instanceof Error ? e.message : String(e);
  }

  // ── 2. Commitment line items (for comparison) ────────────────────────────────
  try {
    const url = new URL(`${PROCORE_BASE_URL}/rest/v1.0/commitments/${TEST_COMMITMENT}/line_items`);
    url.searchParams.set("project_id", projectId);
    url.searchParams.set("company_id", COMPANY_ID);
    url.searchParams.set("per_page",   "20");

    const res  = await fetch(url.toString(), { headers, signal: AbortSignal.timeout(15_000) });
    const data: unknown = await res.json();

    result.line_items_status     = res.status;
    result.line_items_commitment = TEST_COMMITMENT;

    if (Array.isArray(data)) {
      result.line_items_field_names = data.length > 0 ? Object.keys(data[0] as object) : [];
      result.line_items_first_5     = data.slice(0, 5);
    } else {
      result.line_items_raw = data;
    }
  } catch (e) {
    result.line_items_error = e instanceof Error ? e.message : String(e);
  }

  return NextResponse.json(result, { status: 200 });
}
