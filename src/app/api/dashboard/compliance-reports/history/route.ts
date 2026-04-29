// ─── GET /api/dashboard/compliance-reports/history ────────────────────────────
// Returns the last 8 saved compliance reports for a company, ordered newest
// first. Only metadata is returned (no site_data or raw CSV text) — the UI
// uses this to populate the "Report history" dropdown.
//
// Query params:
//   company_id  (required)
//   limit       (optional, default 8)

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  const companyId = request.nextUrl.searchParams.get("company_id");
  const limitParam = request.nextUrl.searchParams.get("limit");
  const limit = Math.min(parseInt(limitParam ?? "8", 10) || 8, 20);

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("compliance_reports")
    .select(`
      id,
      company_id,
      report_week_start,
      report_week_end,
      uploaded_at,
      uploaded_by,
      site_briefings_filename,
      approvals_filename,
      site_data
    `)
    .eq("company_id", companyId)
    .order("report_week_start", { ascending: false })
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Return metadata + site_count (derived from site_data array length).
  // Do NOT return raw CSV text — keep the response small.
  const history = (data ?? []).map(row => ({
    id:                      row.id,
    company_id:              row.company_id,
    report_week_start:       row.report_week_start,
    report_week_end:         row.report_week_end,
    uploaded_at:             row.uploaded_at,
    uploaded_by:             row.uploaded_by,
    site_briefings_filename: row.site_briefings_filename,
    approvals_filename:      row.approvals_filename,
    site_count:              Array.isArray(row.site_data) ? row.site_data.length : 0,
  }));

  return NextResponse.json({ history });
}
