// ─── GET /api/breadcrumb/site-diaries ────────────────────────────────────────
// Fetches site diary completion for the current partial week (Mon–yesterday,
// Sydney time) for a set of Procore-mapped projects.
//
// Query params:
//   company_id   (required)
//   project_ids  comma-separated Procore project IDs (required)
//
// Returns:
//   { results: SiteDiaryResult[], todayIsMonday: boolean }
//
// A diary day is "complete" if notes_logs has ≥1 entry with status "approved"
// for that date. Weather logs and other log types are ignored.
// Today is always excluded (diary in progress).
// Fetches all projects in parallel; per-project errors return null (filtered out).

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const PROCORE_API_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SiteDiaryResult {
  siteReference: string;
  projectId: string;
  completedDays: number;
  totalDays: number;
  display: string;   // "X/Y" or "—"
  missedDates: string[];
}

// ── Date helpers (Sydney timezone) ───────────────────────────────────────────

// Returns the Mon–(yesterday) working days for the current week in Sydney timezone.
// Returns null if today is Monday (no prior working days this week yet).
function getCheckRange(): { startDate: string; endDate: string; workingDays: string[] } | null {
  // Get today's calendar date in Sydney time
  const todaySydney = new Date().toLocaleDateString("en-CA", {
    timeZone: "Australia/Sydney",
  });
  const [ty, tm, td] = todaySydney.split("-").map(Number);
  const todayUTC = new Date(Date.UTC(ty, tm - 1, td));
  const dow = todayUTC.getUTCDay(); // 0=Sun, 1=Mon…6=Sat

  // Nothing to check on Monday (dow===1) — current week just started.
  // On Sunday (dow===0) the work week hasn't started yet.
  if (dow === 0 || dow === 1) return null;

  // Monday of this week
  const mondayUTC = new Date(todayUTC);
  mondayUTC.setUTCDate(todayUTC.getUTCDate() - (dow - 1));

  // Yesterday (last day we can check)
  const yesterdayUTC = new Date(todayUTC);
  yesterdayUTC.setUTCDate(todayUTC.getUTCDate() - 1);

  // Collect Mon–Fri working days from Monday up to (and including) yesterday
  const workingDays: string[] = [];
  const cur = new Date(mondayUTC);
  while (cur <= yesterdayUTC) {
    const d = cur.getUTCDay();
    if (d >= 1 && d <= 5) {
      workingDays.push(cur.toISOString().slice(0, 10));
    }
    cur.setUTCDate(cur.getUTCDate() + 1);
  }

  if (workingDays.length === 0) return null;

  return {
    startDate:   workingDays[0],
    endDate:     workingDays[workingDays.length - 1],
    workingDays,
  };
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("procore_access_token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const sp        = request.nextUrl.searchParams;
    const companyId = sp.get("company_id");
    const pidParam  = sp.get("project_ids");

    if (!companyId) {
      return NextResponse.json({ error: "company_id is required" }, { status: 400 });
    }
    if (!pidParam) {
      return NextResponse.json({ results: [], todayIsMonday: false });
    }

    const projectIds = pidParam.split(",").map(s => s.trim()).filter(Boolean);
    console.log("[site-diaries] received project_ids:", projectIds);
    if (projectIds.length === 0) {
      return NextResponse.json({ results: [], todayIsMonday: false });
    }

    // Check date range — null means today is Monday (nothing to check yet)
    const range = getCheckRange();
    console.log("[site-diaries] date range:", range ? `${range.startDate} → ${range.endDate} (${range.workingDays.length} days)` : "null — today is Monday");
    if (!range) {
      return NextResponse.json({ results: [], todayIsMonday: true });
    }

    // Load Supabase manual mappings to resolve siteReference labels per project
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data: mappings } = await supabase
      .from("breadcrumb_site_mappings")
      .select("breadcrumb_site_name, procore_project_id")
      .eq("company_id", companyId);

    const siteNameByProjectId = new Map<string, string>(
      (mappings ?? []).map(m => [String(m.procore_project_id), String(m.breadcrumb_site_name)])
    );

    const authHeaders: Record<string, string> = {
      Authorization:       `Bearer ${accessToken}`,
      "Procore-Company-Id": companyId,
    };

    // Fetch daily_logs for all projects in parallel
    const results = await Promise.all(
      projectIds.map(async (projectId): Promise<SiteDiaryResult | null> => {
        const siteReference = siteNameByProjectId.get(projectId) ?? projectId;
        try {
          const url = new URL(
            `${PROCORE_API_BASE}/rest/v1.0/projects/${projectId}/daily_logs`
          );
          url.searchParams.set("filters[start_date]", range.startDate);
          url.searchParams.set("filters[end_date]",   range.endDate);

          const res = await fetch(url.toString(), {
            headers: authHeaders,
            signal:  AbortSignal.timeout(15_000),
          });

          console.log(`[site-diaries] project ${projectId}: Procore status ${res.status}`);
          if (!res.ok) {
            // Procore returned an error — report all days as missed
            return {
              siteReference,
              projectId,
              completedDays: 0,
              totalDays:     range.workingDays.length,
              display:       `0/${range.workingDays.length}`,
              missedDates:   [...range.workingDays],
            };
          }

          const data = await res.json();
          const notesLogs: Array<{ date?: string; status?: string }> =
            Array.isArray(data?.notes_logs) ? data.notes_logs : [];
          console.log(`[site-diaries] project ${projectId}: notes_logs count=${notesLogs.length}, approved=${notesLogs.filter(l => l.status === "approved").length}`);

          // A day is "complete" if notes_logs has ≥1 entry with status === "approved"
          const completedSet = new Set(
            notesLogs
              .filter(log => log.status === "approved" && log.date)
              .map(log => log.date!)
          );

          const missedDates   = range.workingDays.filter(d => !completedSet.has(d));
          const completedDays = range.workingDays.length - missedDates.length;
          const totalDays     = range.workingDays.length;

          return {
            siteReference,
            projectId,
            completedDays,
            totalDays,
            display:     `${completedDays}/${totalDays}`,
            missedDates,
          };
        } catch {
          // Per-project failure — return null (filtered out of results)
          return null;
        }
      })
    );

    return NextResponse.json({
      results:      results.filter((r): r is SiteDiaryResult => r !== null),
      todayIsMonday: false,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error:        err instanceof Error ? err.message : "Unknown error",
        results:      [],
        todayIsMonday: false,
      },
      { status: 502 }
    );
  }
}
