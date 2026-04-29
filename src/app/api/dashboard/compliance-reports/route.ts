// ─── /api/dashboard/compliance-reports ────────────────────────────────────────
// GET  ?company_id=X[&week_start=YYYY-MM-DD]
//        Returns the most recent saved compliance report (or a specific week).
// POST  { company_id, report_week_start, report_week_end, site_briefings_filename,
//         approvals_filename, site_data, raw_briefings_csv, raw_approvals_csv }
//        Upserts a report snapshot. Overwrites if the same week already exists.
//
// Supabase table (run once):
// ──────────────────────────────────────────────────────────────────────────────
// CREATE TABLE compliance_reports (
//   id                       uuid primary key default gen_random_uuid(),
//   company_id               text not null,
//   report_week_start        date not null,
//   report_week_end          date not null,
//   uploaded_at              timestamptz default now(),
//   uploaded_by              text,
//   site_briefings_filename  text,
//   approvals_filename       text,
//   site_data                jsonb not null,
//   raw_briefings_csv        text,
//   raw_approvals_csv        text,
//   unique(company_id, report_week_start)
// );
// ──────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { resolveAuditUser, logAuditEvent, AUDIT_ACTIONS } from "@/lib/audit";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── GET ────────────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const companyId  = request.nextUrl.searchParams.get("company_id");
  const weekStart  = request.nextUrl.searchParams.get("week_start");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required" }, { status: 400 });
  }

  let query = supabase
    .from("compliance_reports")
    .select("id, company_id, report_week_start, report_week_end, uploaded_at, uploaded_by, site_briefings_filename, approvals_filename, site_data")
    .eq("company_id", companyId);

  if (weekStart) {
    query = query.eq("report_week_start", weekStart);
  } else {
    query = query.order("report_week_start", { ascending: false }).limit(1);
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ report: data ?? null });
}

// ── POST ───────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;

  let body: {
    company_id?: string;
    report_week_start?: string;
    report_week_end?: string;
    site_briefings_filename?: string | null;
    approvals_filename?: string | null;
    site_data?: unknown[];
    raw_briefings_csv?: string | null;
    raw_approvals_csv?: string | null;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const {
    company_id, report_week_start, report_week_end, site_data,
    site_briefings_filename, approvals_filename, raw_briefings_csv, raw_approvals_csv,
  } = body;

  if (!company_id || !report_week_start || !report_week_end || !site_data) {
    return NextResponse.json(
      { error: "company_id, report_week_start, report_week_end, site_data are required" },
      { status: 400 }
    );
  }

  // Resolve uploading user (best-effort — does not block the save).
  const auditUser = await resolveAuditUser(accessToken);
  const uploaded_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("compliance_reports")
    .upsert(
      {
        company_id,
        report_week_start,
        report_week_end,
        uploaded_at,
        uploaded_by:             auditUser.user_email || auditUser.user_name,
        site_briefings_filename: site_briefings_filename ?? null,
        approvals_filename:      approvals_filename ?? null,
        site_data,
        raw_briefings_csv:       raw_briefings_csv ?? null,
        raw_approvals_csv:       raw_approvals_csv ?? null,
      },
      { onConflict: "company_id,report_week_start" }
    )
    .select("id")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  void logAuditEvent({
    company_id,
    user_id:   auditUser.user_id,
    user_name: auditUser.user_name,
    user_email: auditUser.user_email,
    action:    AUDIT_ACTIONS.COMPLIANCE_REPORT_UPLOADED,
    details:   {
      report_week_start,
      report_week_end,
      site_count: (site_data as unknown[]).length,
      site_briefings_filename,
      approvals_filename,
    },
  });

  return NextResponse.json({ success: true, id: data?.id ?? null });
}
