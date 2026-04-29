// ─── GET /api/dashboard/site-diaries ──────────────────────────────────────────
// Returns open site diary count for a Procore project over a date range.
//
// Supabase table required (create once):
// ─────────────────────────────────────
// CREATE TABLE breadcrumb_site_mappings (
//   id uuid primary key default gen_random_uuid(),
//   company_id text not null,
//   breadcrumb_site_name text not null,
//   procore_project_id text not null,
//   created_at timestamptz default now(),
//   unique(company_id, breadcrumb_site_name)
// );
// ─────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PROCORE_API_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://app.procore.com"
    : "https://sandbox.procore.com";

/** Returns all Mon–Fri dates between start and end (inclusive). */
function getWorkingDays(start: Date, end: Date): Date[] {
  const days: Date[] = [];
  const cur = new Date(start);
  cur.setHours(0, 0, 0, 0);
  const endNorm = new Date(end);
  endNorm.setHours(23, 59, 59, 999);
  while (cur <= endNorm) {
    const dow = cur.getDay();
    if (dow >= 1 && dow <= 5) days.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return days;
}

const NULL_STATE = (totalDays: number) =>
  NextResponse.json({ open_count: null, total_days: totalDays, entries: [] });

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("procore_access_token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const sp         = request.nextUrl.searchParams;
    const projectId  = sp.get("project_id");
    const companyId  = sp.get("company_id");
    const startDate  = sp.get("start_date");
    const endDate    = sp.get("end_date");

    if (!projectId || !companyId || !startDate || !endDate) {
      return NextResponse.json({ error: "project_id, company_id, start_date, end_date are required" }, { status: 400 });
    }

    const workingDays = getWorkingDays(new Date(startDate), new Date(endDate));

    const url = new URL(`${PROCORE_API_BASE}/rest/v1.0/daily_construction_report_logs`);
    url.searchParams.set("project_id", projectId);
    url.searchParams.set("company_id", companyId);
    url.searchParams.set("filters[start_date]", startDate);
    url.searchParams.set("filters[end_date]", endDate);

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Procore-Company-Id": companyId,
      },
    });

    // 404 means the Daily Construction Reports tool isn't enabled for this project.
    if (res.status === 404) return NULL_STATE(workingDays.length);
    if (!res.ok)            return NULL_STATE(workingDays.length);

    const data = await res.json();
    // Procore returns either a top-level array or a wrapped object.
    const logs: Record<string, unknown>[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.daily_construction_report_logs)
        ? (data.daily_construction_report_logs as Record<string, unknown>[])
        : [];

    // Build a date → status map.
    const logByDate = new Map<string, string>();
    for (const log of logs) {
      const dateKey =
        (log.date as string | undefined) ??
        (log.log_date as string | undefined) ??
        (typeof log.created_at === "string" ? log.created_at.slice(0, 10) : undefined) ??
        null;
      if (dateKey) {
        logByDate.set(dateKey, (log.status as string | undefined) ?? "draft");
      }
    }

    const entries = workingDays.map(d => {
      const dateStr = d.toISOString().slice(0, 10);
      return { date: dateStr, status: logByDate.get(dateStr) ?? null };
    });

    // A day is "open" if no log exists OR the log is not approved/submitted.
    const openCount = entries.filter(
      e => e.status === null || (e.status !== "approved" && e.status !== "submitted")
    ).length;

    return NextResponse.json({
      open_count:  openCount,
      total_days:  workingDays.length,
      entries,
    });
  } catch {
    return NextResponse.json({ open_count: null, total_days: 5, entries: [] });
  }
}
