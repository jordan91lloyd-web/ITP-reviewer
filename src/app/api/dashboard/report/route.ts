// ─── GET /api/dashboard/report?company_id=X ───────────────────────────────────
// Assembles cross-project ITP status report data.
// Returns per-project: open/closed counts (live Procore), created/closed-in-window
// counts (live Procore, Sydney timezone), avg score + band distribution (Supabase),
// and AI stage summary (project_financial_snapshots cache).
//
// Procore calls are parallelised with a concurrency cap of 5 to avoid rate limits.
// If a project's Procore fetch fails, that project is returned with procore_error set
// and counts nulled — it does NOT fail the whole report.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getProcoreProjects, getInspections } from "@/lib/procore";
import { createClient } from "@supabase/supabase-js";
import { getScoreBand } from "@/lib/scoreBand";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// ── Sydney timezone helpers ───────────────────────────────────────────────────

/** Returns the ISO date (YYYY-MM-DD) of a timestamp in Australia/Sydney time. */
function toSydneyDate(isoStr: string | null | undefined): string | null {
  if (!isoStr) return null;
  try {
    return new Date(isoStr).toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" });
  } catch {
    return null;
  }
}

/**
 * Returns the Sydney date (YYYY-MM-DD) that is `daysBack` days before today
 * (inclusive). E.g. daysBack=7 returns the date 6 days ago (so today + 6 prev
 * days = 7 calendar days inclusive).
 */
function sydneyWindowStart(daysBack: number): string {
  const todaySydney = new Date().toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" });
  // Parse as UTC midnight to do safe arithmetic
  const d = new Date(todaySydney + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - (daysBack - 1));
  return d.toISOString().slice(0, 10);
}

// ── Concurrency limiter ───────────────────────────────────────────────────────

async function runWithConcurrency<T>(
  tasks: (() => Promise<T>)[],
  limit: number,
): Promise<T[]> {
  const results: T[] = new Array(tasks.length);
  let idx = 0;

  async function worker() {
    while (idx < tasks.length) {
      const i = idx++;
      results[i] = await tasks[i]();
    }
  }

  const workers = Array.from({ length: Math.min(limit, tasks.length) }, worker);
  await Promise.all(workers);
  return results;
}

// ── Response types ────────────────────────────────────────────────────────────

export interface BandCounts {
  compliant:        number;
  minor_gaps:       number;
  significant_gaps: number;
  critical_risk:    number;
  not_reviewed:     number;
}

export interface MissingItpItem {
  itp:    string;
  name:   string;
  reason: string;
}

export interface ProjectReportRow {
  id:             number;
  name:           string;
  display_name:   string;
  project_number: string | null;
  // Live Procore counts (null if fetch failed)
  open_count:     number | null;
  closed_count:   number | null;
  created_7d:     number | null;
  closed_7d:      number | null;
  created_30d:    number | null;
  closed_30d:     number | null;
  // Supabase-derived
  avg_score:      number | null;
  reviewed_count: number;
  band_counts:    BandCounts;
  // AI snapshot cache
  ai_stage:              string | null;
  ai_missing_itps:       MissingItpItem[];
  ai_coming_up:          MissingItpItem[];
  snapshot_generated_at: string | null;
  // Error
  procore_error: string | null;
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated with Procore." }, { status: 401 });
  }

  const companyIdParam = request.nextUrl.searchParams.get("company_id");
  if (!companyIdParam || isNaN(Number(companyIdParam))) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }
  const companyId = Number(companyIdParam);

  // ── 1. Fetch project list ─────────────────────────────────────────────────
  let projects: Awaited<ReturnType<typeof getProcoreProjects>>;
  try {
    projects = await getProcoreProjects(accessToken, companyId);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Failed to fetch projects: ${msg}` }, { status: 502 });
  }

  // Exclude hidden projects
  const { data: hiddenRows } = await supabase
    .from("hidden_projects")
    .select("project_id")
    .eq("company_id", String(companyId));
  const hiddenSet = new Set((hiddenRows ?? []).map(r => String(r.project_id)));
  const visibleProjects = projects.filter(p => !hiddenSet.has(String(p.id)));

  // ── 2. Fetch review_records + score_overrides from Supabase ──────────────
  const { data: records } = await supabase
    .from("review_records")
    .select("procore_project_id, procore_inspection_id, score, score_band, reviewed_at")
    .eq("company_id", String(companyId));

  // Group by project → per-inspection latest record
  type RecordRow = { procore_project_id: number; procore_inspection_id: number; score: number | null; score_band: string | null; reviewed_at: string };
  const latestRecordByInspection = new Map<string, RecordRow>(); // key = `${projectId}:${inspectionId}`
  for (const r of (records ?? []) as RecordRow[]) {
    const key = `${r.procore_project_id}:${r.procore_inspection_id}`;
    const existing = latestRecordByInspection.get(key);
    if (!existing || r.reviewed_at > existing.reviewed_at) {
      latestRecordByInspection.set(key, r);
    }
  }

  // Aggregate per project
  const statsMap = new Map<number, { scores: number[]; bands: BandCounts; count: number }>();
  for (const r of latestRecordByInspection.values()) {
    const pid = r.procore_project_id;
    if (!statsMap.has(pid)) {
      statsMap.set(pid, { scores: [], bands: { compliant: 0, minor_gaps: 0, significant_gaps: 0, critical_risk: 0, not_reviewed: 0 }, count: 0 });
    }
    const s = statsMap.get(pid)!;
    s.count++;
    if (r.score !== null) {
      s.scores.push(r.score);
      const band = r.score_band ?? getScoreBand(r.score) ?? "critical_risk";
      if (band in s.bands) s.bands[band as keyof BandCounts]++;
    } else {
      s.bands.not_reviewed++;
    }
  }

  // ── 3. Fetch AI snapshots from project_financial_snapshots ───────────────
  const { data: snapshots } = await supabase
    .from("project_financial_snapshots")
    .select("procore_project_id, summary, itp_gaps, generated_at")
    .eq("company_id", String(companyId))
    .order("generated_at", { ascending: false });

  // Latest snapshot per project
  const snapshotMap = new Map<number, { summary: string | null; generated_at: string }>();
  for (const snap of snapshots ?? []) {
    const pid = Number(snap.procore_project_id);
    if (!snapshotMap.has(pid)) {
      snapshotMap.set(pid, { summary: snap.summary as string | null, generated_at: snap.generated_at as string });
    }
  }

  // ── 4. Per-project window cutoffs ─────────────────────────────────────────
  const window7  = sydneyWindowStart(7);
  const window30 = sydneyWindowStart(30);

  // ── 5. Fetch inspections per project (parallelised, cap 5) ───────────────
  const tasks = visibleProjects.map(project => async (): Promise<ProjectReportRow> => {
    const supaStats = statsMap.get(project.id);
    const snapshot  = snapshotMap.get(project.id);

    let aiStage:        string | null = null;
    let aiMissingItps:  MissingItpItem[] = [];
    let aiComingUp:     MissingItpItem[] = [];
    if (snapshot?.summary) {
      try {
        const parsed = JSON.parse(snapshot.summary) as {
          stage?: string;
          missing_itps?: MissingItpItem[];
          coming_up?: MissingItpItem[];
        };
        aiStage       = parsed.stage       ?? null;
        aiMissingItps = parsed.missing_itps ?? [];
        aiComingUp    = parsed.coming_up    ?? [];
      } catch { /* ignore */ }
    }

    const baseRow = {
      id:             project.id,
      name:           project.name ?? "",
      display_name:   (project as unknown as { display_name?: string }).display_name ?? project.name ?? "",
      project_number: (project as unknown as { project_number?: string | null }).project_number ?? null,
      avg_score:      supaStats && supaStats.scores.length > 0
        ? Math.round(supaStats.scores.reduce((a, b) => a + b, 0) / supaStats.scores.length)
        : null,
      reviewed_count: supaStats?.count ?? 0,
      band_counts:    supaStats?.bands ?? { compliant: 0, minor_gaps: 0, significant_gaps: 0, critical_risk: 0, not_reviewed: 0 },
      ai_stage:              aiStage,
      ai_missing_itps:       aiMissingItps,
      ai_coming_up:          aiComingUp,
      snapshot_generated_at: snapshot?.generated_at ?? null,
    };

    // Live Procore fetch
    try {
      const inspections = await getInspections(accessToken, project.id, companyId);
      // Only ITP-named inspections (same filter as the dashboard)
      const itps = inspections.filter(i => i.name?.trim().toLowerCase().startsWith("itp"));

      let openCount    = 0;
      let closedCount  = 0;
      let created7d    = 0;
      let closed7d     = 0;
      let created30d   = 0;
      let closed30d    = 0;

      for (const itp of itps) {
        const isClosed = itp.status?.toLowerCase() === "closed";
        if (isClosed) closedCount++; else openCount++;

        // Created in window
        const createdDate = toSydneyDate(itp.created_at);
        if (createdDate) {
          if (createdDate >= window7)  created7d++;
          if (createdDate >= window30) created30d++;
        }

        // Closed in window — only if closed_at is non-null
        const closedDate = toSydneyDate(itp.closed_at);
        if (closedDate) {
          if (closedDate >= window7)  closed7d++;
          if (closedDate >= window30) closed30d++;
        }
      }

      return {
        ...baseRow,
        open_count:    openCount,
        closed_count:  closedCount,
        created_7d:    created7d,
        closed_7d:     closed7d,
        created_30d:   created30d,
        closed_30d:    closed30d,
        procore_error: null,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`[report] Procore fetch failed for project ${project.id}: ${msg}`);
      return {
        ...baseRow,
        open_count:    null,
        closed_count:  null,
        created_7d:    null,
        closed_7d:     null,
        created_30d:   null,
        closed_30d:    null,
        procore_error: msg.slice(0, 120),
      };
    }
  });

  const rows = await runWithConcurrency(tasks, 5);

  // Sort by project number ascending (matching the projects route sort)
  rows.sort((a, b) => {
    const numA = extractProjectNumber(a);
    const numB = extractProjectNumber(b);
    if (numA !== numB) return numA - numB;
    return a.name.localeCompare(b.name);
  });

  return NextResponse.json({ projects: rows, window_7_start: window7, window_30_start: window30 });
}

function extractProjectNumber(p: { project_number?: string | null; name?: string }): number {
  if (p.project_number?.trim()) {
    const n = parseInt(p.project_number.trim(), 10);
    if (!isNaN(n)) return n;
  }
  const match = (p.name ?? "").match(/^\s*(\d+)/);
  return match ? parseInt(match[1], 10) : 9999;
}
