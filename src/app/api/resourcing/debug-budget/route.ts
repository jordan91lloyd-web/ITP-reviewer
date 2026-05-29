// ─── GET /api/resourcing/debug-budget ─────────────────────────────────────────
// Debug route — fetches raw budget data for one project so we can inspect
// the data shape before building real resourcing value features.
//
// Query params:
//   project_id  (required) — defaults to 598134325830369 if omitted

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PROCORE_BASE_URL =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

const COMPANY_ID       = "598134325535477";
const TEST_COMMITMENT  = "598134325632497"; // Structural Steel — Fed Rd

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

  const result: Record<string, unknown> = { project_id: projectId };

  // ── 1. Budget views ──────────────────────────────────────────────────────────
  try {
    const url = `${PROCORE_BASE_URL}/rest/v1.0/budget_views?project_id=${projectId}&company_id=${COMPANY_ID}`;
    const res = await fetch(url, { headers, signal: AbortSignal.timeout(15_000) });
    const data: unknown = await res.json();
    result.budget_views_status = res.status;
    result.budget_views = data;

    // Pick first view id for the detail rows call
    if (Array.isArray(data) && data.length > 0) {
      const first = data[0] as { id?: unknown; name?: unknown };
      result.first_view_id   = first.id;
      result.first_view_name = first.name;

      // ── 2. Budget view detail rows ───────────────────────────────────────────
      try {
        const detailUrl = `${PROCORE_BASE_URL}/rest/v1.0/budget_views/${String(first.id)}/detail_rows?project_id=${projectId}&per_page=20`;
        const detailRes = await fetch(detailUrl, { headers, signal: AbortSignal.timeout(15_000) });
        const detailData: unknown = await detailRes.json();
        result.detail_rows_status = detailRes.status;
        result.detail_rows = detailData;
      } catch (e) {
        result.detail_rows_error = e instanceof Error ? e.message : String(e);
      }
    }
  } catch (e) {
    result.budget_views_error = e instanceof Error ? e.message : String(e);
  }

  // ── 3. Commitment line items ─────────────────────────────────────────────────
  try {
    const lineUrl = `${PROCORE_BASE_URL}/rest/v1.0/commitments/${TEST_COMMITMENT}/line_items?project_id=${projectId}&company_id=${COMPANY_ID}&per_page=20`;
    const lineRes = await fetch(lineUrl, { headers, signal: AbortSignal.timeout(15_000) });
    const lineData: unknown = await lineRes.json();
    result.commitment_line_items_status     = lineRes.status;
    result.commitment_line_items_commitment = TEST_COMMITMENT;
    result.commitment_line_items            = lineData;
  } catch (e) {
    result.commitment_line_items_error = e instanceof Error ? e.message : String(e);
  }

  return NextResponse.json(result, { status: 200 });
}
