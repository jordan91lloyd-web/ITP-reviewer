// ─── GET /api/dashboard/site-diaries ──────────────────────────────────────────
// Returns open site diary count for a Procore project over a date range.
//
// Primary source:  GET /rest/v1.0/daily_construction_report_logs
// Fallback source: GET /rest/v1.0/notes_logs  (if primary returns 404 or empty)
//   A day with ≥1 notes_log entry is considered "active" (not open/forgotten).
//   The response includes { source: "daily_logs" | "notes_logs" } so the UI
//   can display a tooltip explaining the data provenance.
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

function nullState(totalDays: number) {
  return NextResponse.json({ open_count: null, total_days: totalDays, entries: [], source: null });
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("procore_access_token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const sp        = request.nextUrl.searchParams;
    const projectId = sp.get("project_id");
    const companyId = sp.get("company_id");
    const startDate = sp.get("start_date");
    const endDate   = sp.get("end_date");

    if (!projectId || !companyId || !startDate || !endDate) {
      return NextResponse.json(
        { error: "project_id, company_id, start_date, end_date are required" },
        { status: 400 }
      );
    }

    const workingDays = getWorkingDays(new Date(startDate), new Date(endDate));
    const authHeaders = {
      Authorization: `Bearer ${accessToken}`,
      "Procore-Company-Id": companyId,
    };

    // ── Primary: daily_construction_report_logs ───────────────────────────────

    const primaryUrl = new URL(`${PROCORE_API_BASE}/rest/v1.0/daily_construction_report_logs`);
    primaryUrl.searchParams.set("project_id", projectId);
    primaryUrl.searchParams.set("company_id", companyId);
    primaryUrl.searchParams.set("filters[start_date]", startDate);
    primaryUrl.searchParams.set("filters[end_date]", endDate);

    const primaryRes = await fetch(primaryUrl.toString(), { headers: authHeaders });

    const usePrimary = primaryRes.ok && primaryRes.status !== 404;
    let primaryLogs: Record<string, unknown>[] = [];

    if (usePrimary) {
      const data = await primaryRes.json();
      primaryLogs = Array.isArray(data)
        ? data
        : Array.isArray(data?.daily_construction_report_logs)
          ? (data.daily_construction_report_logs as Record<string, unknown>[])
          : [];
    }

    // Use primary if it returned any logs.
    if (usePrimary && primaryLogs.length > 0) {
      return buildDailyLogResponse(workingDays, primaryLogs, "daily_logs");
    }

    // ── Fallback: notes_logs ─────────────────────────────────────────────────

    const notesUrl = new URL(`${PROCORE_API_BASE}/rest/v1.0/notes_logs`);
    notesUrl.searchParams.set("project_id", projectId);
    notesUrl.searchParams.set("company_id", companyId);
    notesUrl.searchParams.set("filters[start_date]", startDate);
    notesUrl.searchParams.set("filters[end_date]", endDate);

    const notesRes = await fetch(notesUrl.toString(), { headers: authHeaders });

    if (!notesRes.ok) {
      // Neither endpoint worked — return the null state.
      return nullState(workingDays.length);
    }

    const notesData = await notesRes.json();
    const notesLogs: Record<string, unknown>[] = Array.isArray(notesData)
      ? notesData
      : Array.isArray(notesData?.notes_logs)
        ? (notesData.notes_logs as Record<string, unknown>[])
        : [];

    return buildNotesLogResponse(workingDays, notesLogs);

  } catch {
    return NextResponse.json({ open_count: null, total_days: 5, entries: [], source: null });
  }
}

// ── Response builders ─────────────────────────────────────────────────────────

function buildDailyLogResponse(
  workingDays: Date[],
  logs: Record<string, unknown>[],
  source: "daily_logs"
) {
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

  // Open = no log, or log not approved/submitted.
  const openCount = entries.filter(
    e => e.status === null || (e.status !== "approved" && e.status !== "submitted")
  ).length;

  return NextResponse.json({ open_count: openCount, total_days: workingDays.length, entries, source });
}

function buildNotesLogResponse(
  workingDays: Date[],
  logs: Record<string, unknown>[]
) {
  // Build a set of dates that have at least one notes_log entry.
  const activeDates = new Set<string>();
  for (const log of logs) {
    const dateKey =
      (log.date as string | undefined) ??
      (log.log_date as string | undefined) ??
      (typeof log.created_at === "string" ? log.created_at.slice(0, 10) : undefined) ??
      null;
    if (dateKey) activeDates.add(dateKey.slice(0, 10));
  }

  // For notes_logs: a day with an entry is "active" (we treat it as "submitted").
  // A day with no entry is open.
  const entries = workingDays.map(d => {
    const dateStr = d.toISOString().slice(0, 10);
    const status  = activeDates.has(dateStr) ? "submitted" : null;
    return { date: dateStr, status };
  });

  const openCount = entries.filter(e => e.status === null).length;

  return NextResponse.json({
    open_count:  openCount,
    total_days:  workingDays.length,
    entries,
    source:      "notes_logs" as const,
  });
}
