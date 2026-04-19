// ─── GET /api/audit/export ───────────────────────────────────────────────────
// Exports the current filtered view of the audit log as a CSV download.
// Accepts the same filters as GET /api/audit (except page/limit — returns all
// matching rows up to 10 000).
//
// Columns: Date, Time, User, Email, Action, Project, ITP / Entity, Details

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import type { AuditLogRow } from "@/lib/audit";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

const ACTION_LABEL: Record<string, string> = {
  review_run:            "Review Run",
  review_failed:         "Review Failed",
  score_override:        "Score Override",
  pdf_exported:          "PDF Exported",
  bulk_review_started:   "Bulk Review Started",
  bulk_review_completed: "Bulk Review Completed",
  login:                 "Login",
  logout:                "Logout",
};

function csvCell(value: unknown): string {
  const str = value == null ? "" : String(value);
  // Quote if contains comma, double-quote, or newline
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function detailsText(row: AuditLogRow): string {
  const d = row.details as Record<string, unknown> | null;
  if (!d) return "";
  if (row.action === "review_run") {
    const parts: string[] = [];
    if (d.score != null)      parts.push(`Score: ${d.score}`);
    if (d.score_band)         parts.push(String(d.score_band).replace(/_/g, " "));
    if (d.file_count != null) parts.push(`${d.file_count} files`);
    if (d.files_skipped != null && Number(d.files_skipped) > 0)
      parts.push(`${d.files_skipped} skipped`);
    return parts.join("; ");
  }
  if (row.action === "review_failed") {
    return d.error ? `Error: ${String(d.error)}` : "";
  }
  if (row.action === "score_override") {
    return `AI: ${d.old_score} → Override: ${d.new_score}${d.note ? `; Note: ${d.note}` : ""}`;
  }
  if (row.action === "pdf_exported") {
    return `${d.inspection_count} report${Number(d.inspection_count) !== 1 ? "s" : ""}, ${d.export_type}`;
  }
  return JSON.stringify(d);
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  if (!cookieStore.get("procore_access_token")?.value) {
    return new NextResponse("Not authenticated.", { status: 401 });
  }

  const sp         = request.nextUrl.searchParams;
  const company_id = sp.get("company_id");
  if (!company_id) {
    return new NextResponse("company_id is required.", { status: 400 });
  }

  const action     = sp.get("action")     ?? null;
  const project_id = sp.get("project_id") ?? null;
  const user_name  = sp.get("user_name")  ?? null;
  const from       = sp.get("from")       ?? null;
  const to         = sp.get("to")         ?? null;

  let query = supabase
    .from("audit_log")
    .select("*")
    .eq("company_id", company_id)
    .order("created_at", { ascending: false })
    .limit(10000);

  if (action)     query = query.eq("action",     action);
  if (project_id) query = query.eq("project_id", project_id);
  if (user_name)  query = query.eq("user_name",  user_name);
  if (from)       query = query.gte("created_at", from);
  if (to) {
    const toEnd = to.includes("T") ? to : `${to}T23:59:59Z`;
    query = query.lte("created_at", toEnd);
  }

  const { data, error } = await query;
  if (error) {
    return new NextResponse(`Supabase error: ${error.message}`, { status: 500 });
  }

  const rows = (data ?? []) as AuditLogRow[];

  // Build CSV
  const header = ["Date", "Time", "User", "Email", "Action", "Project", "ITP / Entity", "Details"];
  const lines  = [header.map(csvCell).join(",")];

  for (const row of rows) {
    const dt   = new Date(row.created_at);
    const date = dt.toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" });
    const time = dt.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" });
    lines.push([
      csvCell(date),
      csvCell(time),
      csvCell(row.user_name),
      csvCell(row.user_email ?? ""),
      csvCell(ACTION_LABEL[row.action] ?? row.action),
      csvCell(row.project_name ?? ""),
      csvCell(row.entity_name ?? ""),
      csvCell(detailsText(row)),
    ].join(","));
  }

  const csv      = lines.join("\r\n");
  const datePart = new Date().toISOString().slice(0, 10);
  const filename = project_id
    ? `audit-log-project-${project_id}-${datePart}.csv`
    : `audit-log-${datePart}.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type":        "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
