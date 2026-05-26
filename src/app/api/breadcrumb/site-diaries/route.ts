// ─── GET /api/breadcrumb/site-diaries ────────────────────────────────────────
// Self-contained: loads all site mappings from Supabase, fetches Procore
// daily logs for each mapped project in parallel, returns per-site diary
// completion for the current partial week (Mon–yesterday, Sydney time).
//
// Query params:
//   company_id  (required)
//
// Returns:
//   { results: SiteDiaryResult[], todayIsMonday: boolean }
//
// A diary day is "complete" if notes_logs has ≥1 entry with status "approved".
// Today is always excluded. If today is Monday returns todayIsMonday: true.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const PROCORE_API_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SiteDiaryResult {
  breadcrumb_site_name: string;
  completedDays: number;
  totalDays: number;
  display: string;   // "X/Y" or "—"
  missedDates: string[];
}

// ── Date helpers (Sydney timezone) ───────────────────────────────────────────

function getCheckRange(): { startDate: string; endDate: string; workingDays: string[] } | null {
  const todaySydney = new Date().toLocaleDateString("en-CA", {
    timeZone: "Australia/Sydney",
  });
  const [ty, tm, td] = todaySydney.split("-").map(Number);
  const todayUTC = new Date(Date.UTC(ty, tm - 1, td));
  const dow = todayUTC.getUTCDay(); // 0=Sun, 1=Mon…6=Sat

  // Nothing to check on Monday or Sunday — week just started / not started
  if (dow === 0 || dow === 1) return null;

  // Monday of this week
  const mondayUTC = new Date(todayUTC);
  mondayUTC.setUTCDate(todayUTC.getUTCDate() - (dow - 1));

  // Yesterday
  const yesterdayUTC = new Date(todayUTC);
  yesterdayUTC.setUTCDate(todayUTC.getUTCDate() - 1);

  // Mon–Fri from Monday up to and including yesterday
  const workingDays: string[] = [];
  const cur = new Date(mondayUTC);
  while (cur <= yesterdayUTC) {
    const d = cur.getUTCDay();
    if (d >= 1 && d <= 5) workingDays.push(cur.toISOString().slice(0, 10));
    cur.setUTCDate(cur.getUTCDate() + 1);
  }

  if (workingDays.length === 0) return null;
  return { startDate: workingDays[0], endDate: workingDays[workingDays.length - 1], workingDays };
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("procore_access_token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const companyId = request.nextUrl.searchParams.get("company_id");
    if (!companyId) {
      return NextResponse.json({ error: "company_id is required" }, { status: 400 });
    }

    // Check date range first — fast exit on Monday/Sunday
    const range = getCheckRange();
    if (!range) {
      return NextResponse.json({ results: [], todayIsMonday: true });
    }

    // Load all site mappings for this company from Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data: mappings, error: dbError } = await supabase
      .from("breadcrumb_site_mappings")
      .select("breadcrumb_site_name, procore_project_id")
      .eq("company_id", companyId);

    if (dbError || !mappings || mappings.length === 0) {
      return NextResponse.json({ results: [], todayIsMonday: false });
    }

    const authHeaders: Record<string, string> = {
      Authorization:        `Bearer ${accessToken}`,
      "Procore-Company-Id": companyId,
    };

    // Fetch daily_logs for every mapped project in parallel
    const results = await Promise.all(
      mappings.map(async (mapping): Promise<SiteDiaryResult> => {
        const { breadcrumb_site_name, procore_project_id: projectId } = mapping;
        const noData: SiteDiaryResult = {
          breadcrumb_site_name,
          completedDays: 0,
          totalDays:     range.workingDays.length,
          display:       `0/${range.workingDays.length}`,
          missedDates:   [...range.workingDays],
        };

        try {
          const url = new URL(`${PROCORE_API_BASE}/rest/v1.0/projects/${projectId}/daily_logs`);
          url.searchParams.set("filters[start_date]", range.startDate);
          url.searchParams.set("filters[end_date]",   range.endDate);

          const res = await fetch(url.toString(), {
            headers: authHeaders,
            signal:  AbortSignal.timeout(15_000),
          });

          if (!res.ok) return noData;

          const data = await res.json();
          const notesLogs: Array<{ date?: string; status?: string }> =
            Array.isArray(data?.notes_logs) ? data.notes_logs : [];

          // A day is "complete" if ≥1 notes_log entry has status === "approved"
          const completedSet = new Set(
            notesLogs
              .filter(log => log.status === "approved" && log.date)
              .map(log => log.date!)
          );

          const missedDates   = range.workingDays.filter(d => !completedSet.has(d));
          const completedDays = range.workingDays.length - missedDates.length;

          return {
            breadcrumb_site_name,
            completedDays,
            totalDays: range.workingDays.length,
            display:   `${completedDays}/${range.workingDays.length}`,
            missedDates,
          };
        } catch {
          return noData;
        }
      })
    );

    return NextResponse.json({ results, todayIsMonday: false });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error", results: [], todayIsMonday: false },
      { status: 502 }
    );
  }
}
