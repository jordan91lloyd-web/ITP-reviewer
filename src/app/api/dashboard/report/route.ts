// ─── GET /api/dashboard/report?company_id=X ───────────────────────────────────
// Assembles cross-project ITP status report data.
// Returns per-project: open/closed counts (live Procore), created/closed-in-window
// counts (live Procore, Sydney timezone), avg score + band distribution (Supabase),
// AI Insights snapshot (stage, missing ITPs, coming up, completion %, itp_gaps).
//
// Insights refresh-if-stale: if a project's snapshot was generated before the
// current Sydney week (Monday 00:00), the route regenerates it by calling the
// existing financial-summary and site-summary routes. Regeneration runs
// sequentially with a 1.5 s pause between projects to respect rate limits.
//
// Rate-limit handling:
//   • Inspection fetches: batches of 2, 600 ms between batches, 429 backoff/retry.
//   • Insight regeneration: sequential, 1.5 s between projects, failures non-fatal.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getProcoreProjects, getInspections, type ProcoreInspection } from "@/lib/procore";
import { createClient } from "@supabase/supabase-js";
import { getScoreBand } from "@/lib/scoreBand";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// ── Sydney timezone helpers ───────────────────────────────────────────────────

function toSydneyDate(isoStr: string | null | undefined): string | null {
  if (!isoStr) return null;
  try {
    return new Date(isoStr).toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" });
  } catch {
    return null;
  }
}

function sydneyWindowStart(daysBack: number): string {
  const todaySydney = new Date().toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" });
  const d = new Date(todaySydney + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - (daysBack - 1));
  return d.toISOString().slice(0, 10);
}

/**
 * Returns the Monday of the current Sydney week as YYYY-MM-DD.
 * Uses the same UTC-parse pattern as Site Compliance to avoid drift.
 */
function sydneyCurrentWeekMonday(): string {
  const todaySydney = new Date().toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" });
  const d = new Date(todaySydney + "T00:00:00Z");
  const dow = d.getUTCDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const diffToMon = dow === 0 ? 6 : dow - 1;
  d.setUTCDate(d.getUTCDate() - diffToMon);
  return d.toISOString().slice(0, 10);
}

// ── Rate-limit helpers ──────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runInBatches<T>(
  tasks: (() => Promise<T>)[],
  batchSize: number,
  delayMs: number,
): Promise<T[]> {
  const results: T[] = [];
  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(t => t()));
    results.push(...batchResults);
    if (i + batchSize < tasks.length) await sleep(delayMs);
  }
  return results;
}

async function getInspectionsWithRetry(
  accessToken: string,
  projectId:  number,
  companyId:  number,
): Promise<ProcoreInspection[]> {
  const backoffs = [1000, 2000, 4000];
  let lastErr: unknown;
  for (let attempt = 0; attempt <= backoffs.length; attempt++) {
    try {
      return await getInspections(accessToken, projectId, companyId);
    } catch (err) {
      lastErr = err;
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("429") && attempt < backoffs.length) {
        console.warn(`[report] 429 on project ${projectId}, retry ${attempt + 1}/${backoffs.length} after ${backoffs[attempt]}ms`);
        await sleep(backoffs[attempt]);
        continue;
      }
      break;
    }
  }
  throw lastErr;
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
  // Live Procore counts
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
  // AI Insights snapshot
  ai_stage:              string | null;
  ai_missing_itps:       MissingItpItem[];
  ai_coming_up:          MissingItpItem[];
  itp_gaps:              string[];
  completion_pct:        number | null;
  snapshot_generated_at: string | null;
  snapshot_refreshed:    boolean;          // true if regenerated this request
  // Error
  procore_error:  string | null;
  insights_error: string | null;
}

// ── Snapshot parsing helper ─────────────────────────────────────────────────

interface ParsedSnapshot {
  stage:        string | null;
  missing_itps: MissingItpItem[];
  coming_up:    MissingItpItem[];
  contract_sum: number | null;
}

interface SnapshotRecord {
  summary:        string | null;
  generated_at:   string;
  itp_gaps:       string[] | null;
  completion_pct: number | null;
}

function parseSnapshot(snap: SnapshotRecord | undefined): {
  aiStage: string | null;
  aiMissingItps: MissingItpItem[];
  aiComingUp: MissingItpItem[];
  itpGaps: string[];
  completionPct: number | null;
  generatedAt: string | null;
} {
  if (!snap) return { aiStage: null, aiMissingItps: [], aiComingUp: [], itpGaps: [], completionPct: null, generatedAt: null };
  let aiStage: string | null = null;
  let aiMissingItps: MissingItpItem[] = [];
  let aiComingUp: MissingItpItem[] = [];
  if (snap.summary) {
    try {
      const parsed = JSON.parse(snap.summary) as ParsedSnapshot;
      aiStage       = parsed.stage       ?? null;
      aiMissingItps = parsed.missing_itps ?? [];
      aiComingUp    = parsed.coming_up    ?? [];
    } catch { /* ignore */ }
  }
  return {
    aiStage,
    aiMissingItps,
    aiComingUp,
    itpGaps:       Array.isArray(snap.itp_gaps) ? snap.itp_gaps : [],
    completionPct: snap.completion_pct ?? null,
    generatedAt:   snap.generated_at ?? null,
  };
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

  // Origin for internal API calls (Insights regeneration)
  const origin = request.nextUrl.origin;
  // Forward auth cookies for internal calls
  const cookieHeader = request.headers.get("cookie") ?? "";

  // ── 1. Fetch project list ─────────────────────────────────────────────────
  let projects: Awaited<ReturnType<typeof getProcoreProjects>>;
  try {
    projects = await getProcoreProjects(accessToken, companyId);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Failed to fetch projects: ${msg}` }, { status: 502 });
  }

  const { data: hiddenRows } = await supabase
    .from("hidden_projects")
    .select("project_id")
    .eq("company_id", String(companyId));
  const hiddenSet = new Set((hiddenRows ?? []).map(r => String(r.project_id)));
  const visibleProjects = projects.filter(p => !hiddenSet.has(String(p.id)));

  // ── 2. Fetch review_records from Supabase ────────────────────────────────
  const { data: records } = await supabase
    .from("review_records")
    .select("procore_project_id, procore_inspection_id, score, score_band, reviewed_at")
    .eq("company_id", String(companyId));

  type RecordRow = { procore_project_id: number; procore_inspection_id: number; score: number | null; score_band: string | null; reviewed_at: string };
  const latestRecordByInspection = new Map<string, RecordRow>();
  for (const r of (records ?? []) as RecordRow[]) {
    const key = `${r.procore_project_id}:${r.procore_inspection_id}`;
    const existing = latestRecordByInspection.get(key);
    if (!existing || r.reviewed_at > existing.reviewed_at) {
      latestRecordByInspection.set(key, r);
    }
  }

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
  const { data: rawSnapshots } = await supabase
    .from("project_financial_snapshots")
    .select("procore_project_id, summary, itp_gaps, completion_pct, generated_at")
    .eq("company_id", String(companyId))
    .order("generated_at", { ascending: false });

  const snapshotMap = new Map<number, SnapshotRecord>();
  for (const snap of rawSnapshots ?? []) {
    const pid = Number(snap.procore_project_id);
    if (!snapshotMap.has(pid)) {
      snapshotMap.set(pid, {
        summary:        snap.summary as string | null,
        generated_at:   snap.generated_at as string,
        itp_gaps:       snap.itp_gaps as string[] | null,
        completion_pct: snap.completion_pct as number | null,
      });
    }
  }

  // ── 4. Window cutoffs ────────────────────────────────────────────────────
  const window7   = sydneyWindowStart(7);
  const window30  = sydneyWindowStart(30);
  const weekStart = sydneyCurrentWeekMonday(); // for Insights staleness

  // ── 5. Fetch inspections per project (batched) ──────────────────────────
  // Each task returns a partial row + the raw inspections (needed for Insights regen)
  interface PartialResult {
    row: ProjectReportRow;
    itps: ProcoreInspection[];
  }

  const tasks = visibleProjects.map(project => async (): Promise<PartialResult> => {
    const supaStats = statsMap.get(project.id);
    const snap = snapshotMap.get(project.id);
    const snapData = parseSnapshot(snap);

    const baseRow: ProjectReportRow = {
      id:             project.id,
      name:           project.name ?? "",
      display_name:   (project as unknown as { display_name?: string }).display_name ?? project.name ?? "",
      project_number: (project as unknown as { project_number?: string | null }).project_number ?? null,
      avg_score:      supaStats && supaStats.scores.length > 0
        ? Math.round(supaStats.scores.reduce((a, b) => a + b, 0) / supaStats.scores.length)
        : null,
      reviewed_count:        supaStats?.count ?? 0,
      band_counts:           supaStats?.bands ?? { compliant: 0, minor_gaps: 0, significant_gaps: 0, critical_risk: 0, not_reviewed: 0 },
      ai_stage:              snapData.aiStage,
      ai_missing_itps:       snapData.aiMissingItps,
      ai_coming_up:          snapData.aiComingUp,
      itp_gaps:              snapData.itpGaps,
      completion_pct:        snapData.completionPct,
      snapshot_generated_at: snapData.generatedAt,
      snapshot_refreshed:    false,
      open_count:            null,
      closed_count:          null,
      created_7d:            null,
      closed_7d:             null,
      created_30d:           null,
      closed_30d:            null,
      procore_error:         null,
      insights_error:        null,
    };

    try {
      const inspections = await getInspectionsWithRetry(accessToken, project.id, companyId);
      const itps = inspections.filter(i => i.name?.trim().toLowerCase().startsWith("itp"));

      let openCount = 0, closedCount = 0, created7d = 0, closed7d = 0, created30d = 0, closed30d = 0;
      for (const itp of itps) {
        const isClosed = itp.status?.toLowerCase() === "closed";
        if (isClosed) closedCount++; else openCount++;

        const createdDate = toSydneyDate(itp.created_at);
        if (createdDate) {
          if (createdDate >= window7)  created7d++;
          if (createdDate >= window30) created30d++;
        }
        const closedDate = toSydneyDate(itp.closed_at);
        if (closedDate) {
          if (closedDate >= window7)  closed7d++;
          if (closedDate >= window30) closed30d++;
        }
      }

      return {
        row: { ...baseRow, open_count: openCount, closed_count: closedCount, created_7d: created7d, closed_7d: closed7d, created_30d: created30d, closed_30d: closed30d },
        itps,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`[report] Procore fetch failed for project ${project.id}: ${msg}`);
      return { row: { ...baseRow, procore_error: msg.slice(0, 120) }, itps: [] };
    }
  });

  const partials = await runInBatches(tasks, 2, 600);

  // ── 6. Refresh stale Insights snapshots ─────────────────────────────────
  // Stale = generated_at is before this Sydney week's Monday, or missing.
  // Regenerate sequentially with 1.5 s between projects.
  for (let i = 0; i < partials.length; i++) {
    const p = partials[i];
    const snap = snapshotMap.get(p.row.id);
    const snapDate = toSydneyDate(snap?.generated_at);
    const isStale = !snapDate || snapDate < weekStart;

    if (!isStale) continue;

    // Need inspections for the ITP lists. If Procore fetch failed, skip regen.
    if (p.row.procore_error) {
      p.row.insights_error = "Skipped — Procore data unavailable";
      continue;
    }

    console.log(`[report] Refreshing Insights for project ${p.row.id} (${p.row.display_name || p.row.name}), snapshot ${snapDate ?? "missing"} < week start ${weekStart}`);

    try {
      // Step A: Fetch financial summary via internal route
      const finRes = await fetch(
        `${origin}/api/procore/project-financial-summary?project_id=${p.row.id}&company_id=${companyId}`,
        { headers: { cookie: cookieHeader } },
      );
      const finData = await finRes.json() as {
        completion_pct?: number | null;
        contract_sum?:   number | null;
        active_trades?:  { name: string; last_activity: string; percentage_paid: number; contract_value: number }[];
      };
      if (!finRes.ok) throw new Error(`Financial: ${(finData as { error?: string }).error ?? finRes.status}`);

      // Step B: Build open/closed ITP lists from already-fetched inspections
      const itps = p.itps.filter(i => i.name?.trim().toLowerCase().startsWith("itp"));
      const openItps = itps
        .filter(i => i.status?.toLowerCase() !== "closed")
        .map(i => ({
          name:      i.name,
          status:    i.status ?? "",
          score:     null as number | null, // we don't have scores from raw inspection
          days_open: i.created_at
            ? Math.floor((Date.now() - new Date(i.created_at).getTime()) / 86400_000)
            : null,
        }));

      // Enrich open ITPs with review scores from Supabase
      for (const oi of openItps) {
        const matchInsp = itps.find(i => i.name === oi.name);
        if (matchInsp) {
          const rec = latestRecordByInspection.get(`${p.row.id}:${matchInsp.id}`);
          if (rec?.score !== undefined) oi.score = rec.score;
        }
      }

      const closedItps = itps
        .filter(i => i.status?.toLowerCase() === "closed")
        .map(i => {
          const rec = latestRecordByInspection.get(`${p.row.id}:${i.id}`);
          return { name: i.name, score: rec?.score ?? null };
        });

      // Step C: Call site-summary AI route
      const sumRes = await fetch(`${origin}/api/ai/site-summary`, {
        method: "POST",
        headers: { "Content-Type": "application/json", cookie: cookieHeader },
        body: JSON.stringify({
          project_id:     String(p.row.id),
          project_name:   p.row.display_name || p.row.name,
          completion_pct: finData.completion_pct ?? null,
          contract_sum:   finData.contract_sum ?? null,
          active_trades:  finData.active_trades ?? [],
          open_itps:      openItps,
          closed_itps:    closedItps,
          company_id:     String(companyId),
        }),
      });
      const sumData = await sumRes.json() as {
        stage?:        string;
        missing_itps?: MissingItpItem[];
        coming_up?:    MissingItpItem[];
        itp_gaps?:     string[];
        generated_at?: string;
        error?:        string;
      };
      if (!sumRes.ok) throw new Error(`AI: ${sumData.error ?? sumRes.status}`);

      // Update the row with fresh data
      p.row.ai_stage              = sumData.stage         ?? null;
      p.row.ai_missing_itps       = sumData.missing_itps  ?? [];
      p.row.ai_coming_up          = sumData.coming_up     ?? [];
      p.row.itp_gaps              = sumData.itp_gaps      ?? [];
      p.row.completion_pct        = finData.completion_pct ?? null;
      p.row.snapshot_generated_at = sumData.generated_at   ?? new Date().toISOString();
      p.row.snapshot_refreshed    = true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`[report] Insights refresh failed for project ${p.row.id}: ${msg}`);
      p.row.insights_error = msg.slice(0, 120);
    }

    // Pace between regenerations
    if (i < partials.length - 1) await sleep(1500);
  }

  // ── 7. Build final response ─────────────────────────────────────────────
  const rows = partials.map(p => p.row);

  rows.sort((a, b) => {
    const numA = extractProjectNumber(a);
    const numB = extractProjectNumber(b);
    if (numA !== numB) return numA - numB;
    return a.name.localeCompare(b.name);
  });

  const staleCount    = partials.filter(p => { const d = toSydneyDate(snapshotMap.get(p.row.id)?.generated_at); return !d || d < weekStart; }).length;
  const refreshedCount = rows.filter(r => r.snapshot_refreshed).length;

  return NextResponse.json({
    projects:       rows,
    window_7_start: window7,
    window_30_start: window30,
    insights_week_start: weekStart,
    insights_refreshed:  refreshedCount,
    insights_stale:      staleCount,
  });
}

function extractProjectNumber(p: { project_number?: string | null; name?: string }): number {
  if (p.project_number?.trim()) {
    const n = parseInt(p.project_number.trim(), 10);
    if (!isNaN(n)) return n;
  }
  const match = (p.name ?? "").match(/^\s*(\d+)/);
  return match ? parseInt(match[1], 10) : 9999;
}
