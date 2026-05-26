// ─── GET /api/breadcrumb/site-diaries ────────────────────────────────────────
// Self-contained: loads all site mappings from Supabase, fetches Procore
// daily logs for each mapped project in parallel, returns per-site diary
// completion for the requested week.
//
// Query params:
//   company_id   (required)
//   week_start   YYYY-MM-DD Monday of the selected week (optional).
//                Defaults to current week.
//
// Date range rules:
//   Past week    → Mon–Fri all 5 days
//   Current week → Mon up to (but not including) today. Returns
//                  todayIsMonday: true if today is Monday (nothing to check).
//   Future week  → empty results
//
// Returns:
//   { results: SiteDiaryResult[], todayIsMonday: boolean }
//
// A diary day is "complete" if notes_logs has ≥1 entry with status "approved".

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

type CheckRange = { startDate: string; endDate: string; workingDays: string[] };

// Returns the Mon–Fri working days to check for the given week.
// weekStartParam: YYYY-MM-DD Monday of the requested week (optional, defaults to current week).
// Returns null when today is Monday (current week) or when the week is in the future.
function getCheckRange(weekStartParam?: string | null): CheckRange | null {
  // Today in Sydney timezone
  const todaySydney = new Date().toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" });
  const [ty, tm, td] = todaySydney.split("-").map(Number);
  const todayUTC = new Date(Date.UTC(ty, tm - 1, td));
  const dow = todayUTC.getUTCDay(); // 0=Sun, 1=Mon…6=Sat

  // Current week's Monday (UTC midnight)
  const currentMondayUTC = new Date(todayUTC);
  currentMondayUTC.setUTCDate(todayUTC.getUTCDate() - (dow === 0 ? 6 : dow - 1));
  const currentMondayStr = currentMondayUTC.toISOString().slice(0, 10);

  // Resolve requested Monday
  let weekMonday: Date;
  if (weekStartParam && /^\d{4}-\d{2}-\d{2}$/.test(weekStartParam)) {
    const [wy, wm, wd] = weekStartParam.split("-").map(Number);
    weekMonday = new Date(Date.UTC(wy, wm - 1, wd));
  } else {
    weekMonday = currentMondayUTC;
  }
  const weekMondayStr = weekMonday.toISOString().slice(0, 10);

  if (weekMondayStr > currentMondayStr) {
    // Future week — nothing to show
    return null;
  }

  if (weekMondayStr < currentMondayStr) {
    // Past week — all 5 Mon–Fri days are checkable
    const workingDays: string[] = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date(weekMonday);
      d.setUTCDate(weekMonday.getUTCDate() + i);
      workingDays.push(d.toISOString().slice(0, 10));
    }
    return { startDate: workingDays[0], endDate: workingDays[4], workingDays };
  }

  // Current week — Mon up to (not including) today
  if (dow === 0 || dow === 1) return null; // Sunday or Monday — nothing checkable yet

  const yesterdayUTC = new Date(todayUTC);
  yesterdayUTC.setUTCDate(todayUTC.getUTCDate() - 1);

  const workingDays: string[] = [];
  const cur = new Date(weekMonday);
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

    const sp         = request.nextUrl.searchParams;
    const companyId  = sp.get("company_id");
    const weekStart  = sp.get("week_start"); // optional YYYY-MM-DD Monday

    if (!companyId) {
      return NextResponse.json({ error: "company_id is required" }, { status: 400 });
    }

    // Compute date range — null means today is Monday (current week) or future week
    const range = getCheckRange(weekStart);
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
