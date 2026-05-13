"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import InsightCard, { type ProjectSnapshot, type MissingItp, type OpenItpSummary, type CardState } from "./InsightCard";
import type { DashboardInspection } from "@/app/api/dashboard/inspections/route";

interface DashboardProject {
  id: number;
  name: string;
  display_name: string;
  project_number: string | null;
  reviewed_count?: number;
  avg_score?: number | null;
  last_reviewed_at?: string | null;
  is_hidden?: boolean;
}

interface Props {
  companyId:       number | null;
  projects:        DashboardProject[];
  projectsLoading: boolean;
  inspections:     DashboardInspection[];     // currently loaded project's inspections
  selectedProject: DashboardProject | null;
  onViewProject:   (p: DashboardProject) => void;
}

function fmtTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" });
}

function fmtAge(iso: string | null | undefined): string {
  if (!iso) return "unknown";
  const diffMs   = Date.now() - new Date(iso).getTime();
  const diffHrs  = diffMs / 3_600_000;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffHrs < 1)   return `today at ${fmtTime(iso)}`;
  if (diffDays === 0) return `today at ${fmtTime(iso)}`;
  if (diffDays === 1) return `yesterday at ${fmtTime(iso)}`;
  return `${diffDays} days ago`;
}

// Build open ITP summaries from loaded inspections
function toOpenItpSummaries(inspections: DashboardInspection[]): OpenItpSummary[] {
  return inspections
    .filter(i => { const s = i.status?.toLowerCase(); return s !== "closed" && s !== "in_review"; })
    .map(i => ({
      name:      i.name,
      status:    i.status ?? "",
      score:     i.override_score ?? i.last_score,
      days_open: i.created_at
        ? Math.floor((Date.now() - new Date(i.created_at).getTime()) / 86400_000)
        : null,
    }));
}

export default function InsightsTab({
  companyId,
  projects,
  projectsLoading,
  inspections,
  selectedProject,
  onViewProject,
}: Props) {
  const visibleProjects = projects.filter(p => !p.is_hidden);

  // Snapshots keyed by procore_project_id (string)
  const [snapshots, setSnapshots] = useState<Map<string, ProjectSnapshot>>(new Map());
  const [cardStates, setCardStates] = useState<Map<string, CardState>>(new Map());
  const [cardErrors, setCardErrors] = useState<Map<string, string>>(new Map());
  const [snapshotsLoading, setSnapshotsLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string | null>(null);

  // Bulk refresh state
  const [refreshing, setRefreshing] = useState(false);
  const [refreshProgress, setRefreshProgress] = useState<{ current: number; total: number } | null>(null);
  const refreshCancelRef = useRef(false);

  // ── Load today's snapshots from Supabase on first open ────────────────────

  const loadSnapshots = useCallback(async () => {
    if (!companyId) return;
    setSnapshotsLoading(true);
    try {
      const res  = await fetch(`/api/insights/snapshots?company_id=${companyId}`);
      const data = await res.json();
      const snaps: ProjectSnapshot[] = (data.snapshots ?? []).map((s: Record<string, unknown>) => {
        // summary stores JSON — parse to restore structured fields.
        // If parse fails (old text format), treat as no cache.
        let stage:        string | null  = null;
        let missingItps:  MissingItp[]   = [];
        let comingUp:     MissingItp[]   = [];
        let contractSum:  number | null  = null;
        if (s.summary) {
          try {
            const parsed = JSON.parse(String(s.summary)) as Record<string, unknown>;
            stage       = typeof parsed.stage === "string" ? parsed.stage : null;
            missingItps = Array.isArray(parsed.missing_itps) ? parsed.missing_itps as MissingItp[] : [];
            comingUp    = Array.isArray(parsed.coming_up)    ? parsed.coming_up    as MissingItp[] : [];
            contractSum = typeof parsed.contract_sum === "number" ? parsed.contract_sum : null;
          } catch {
            // old text format — leave all null/empty, card will show "Generate"
          }
        }
        return {
          procore_project_id: String(s.procore_project_id),
          project_name:       String(s.project_name ?? ""),
          project_number:     s.project_number ? String(s.project_number) : null,
          completion_pct:     typeof s.completion_pct === "number" ? s.completion_pct : null,
          contract_sum:       contractSum,
          active_trades:      Array.isArray(s.active_trades) ? s.active_trades : [],
          stage,
          missing_itps:       missingItps,
          coming_up:          comingUp,
          itp_gaps:           Array.isArray(s.itp_gaps) ? s.itp_gaps as string[] : [],
          generated_at:       s.generated_at ? String(s.generated_at) : null,
        };
      });
      setSnapshots(new Map(snaps.map(s => [s.procore_project_id, s])));
      if (snaps.length > 0) {
        const latest = snaps.reduce((a, b) =>
          (a.generated_at ?? "") > (b.generated_at ?? "") ? a : b
        );
        setLastRefreshed(latest.generated_at);
      }
    } catch {
      // non-fatal
    } finally {
      setSnapshotsLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    loadSnapshots();
  }, [loadSnapshots]);

  // ── Per-project generation ────────────────────────────────────────────────

  const generateForProject = useCallback(async (project: DashboardProject) => {
    if (!companyId) return;
    const pid = String(project.id);

    setCardStates(prev => new Map(prev).set(pid, "fetching_financial"));
    setCardErrors(prev => { const m = new Map(prev); m.delete(pid); return m; });

    try {
      // 1. Fetch financial summary
      const finRes  = await fetch(
        `/api/procore/project-financial-summary?project_id=${project.id}&company_id=${companyId}`
      );
      const finData = await finRes.json();

      if (!finRes.ok) throw new Error(finData.error ?? "Financial fetch failed");

      setCardStates(prev => new Map(prev).set(pid, "fetching_summary"));

      // 2. Get all ITPs for this project (all statuses)
      let allInspections: DashboardInspection[] = [];
      if (selectedProject?.id === project.id && inspections.length > 0) {
        allInspections = inspections;
      } else {
        try {
          const inspRes  = await fetch(
            `/api/dashboard/inspections?project_id=${project.id}&company_id=${companyId}`
          );
          const inspData = await inspRes.json();
          allInspections = inspData.inspections ?? [];
        } catch {
          // non-fatal — generate summary with empty ITP lists
        }
      }

      const openItps   = toOpenItpSummaries(allInspections);

      // 3. POST to AI site-summary
      const closedItps = allInspections
        .filter(i => i.status?.toLowerCase() === "closed" && i.name)
        .map(i => ({ name: i.name, score: i.override_score ?? i.last_score }));

      const sumRes = await fetch("/api/ai/site-summary", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          project_id:     String(project.id),
          project_name:   project.display_name || project.name,
          completion_pct: finData.completion_pct ?? null,
          contract_sum:   finData.contract_sum ?? null,
          active_trades:  finData.active_trades ?? [],
          open_itps:      openItps,
          closed_itps:    closedItps,
          company_id:     String(companyId),
        }),
      });
      const sumData = await sumRes.json();
      if (!sumRes.ok) throw new Error(sumData.error ?? "AI summary failed");

      // 4. Update local snapshot
      const newSnap: ProjectSnapshot = {
        procore_project_id: pid,
        project_name:       project.display_name || project.name,
        project_number:     project.project_number,
        completion_pct:     finData.completion_pct ?? null,
        contract_sum:       finData.contract_sum ?? null,
        active_trades:      finData.active_trades ?? [],
        stage:              sumData.stage ?? null,
        missing_itps:       sumData.missing_itps ?? [],
        coming_up:          sumData.coming_up ?? [],
        itp_gaps:           sumData.itp_gaps ?? [],
        generated_at:       sumData.generated_at ?? new Date().toISOString(),
      };

      setSnapshots(prev => new Map(prev).set(pid, newSnap));
      setLastRefreshed(newSnap.generated_at);
      setCardStates(prev => new Map(prev).set(pid, "done"));
    } catch (err) {
      setCardStates(prev => new Map(prev).set(pid, "error"));
      setCardErrors(prev => new Map(prev).set(pid, err instanceof Error ? err.message : String(err)));
    }
  }, [companyId, selectedProject, inspections]);

  // ── Refresh All ───────────────────────────────────────────────────────────

  const handleRefreshAll = useCallback(async () => {
    if (!companyId || refreshing) return;
    setRefreshing(true);
    refreshCancelRef.current = false;
    setRefreshProgress({ current: 0, total: visibleProjects.length });

    for (let i = 0; i < visibleProjects.length; i++) {
      if (refreshCancelRef.current) break;
      setRefreshProgress({ current: i + 1, total: visibleProjects.length });
      await generateForProject(visibleProjects[i]);
      if (i < visibleProjects.length - 1 && !refreshCancelRef.current) {
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    setRefreshing(false);
    setRefreshProgress(null);
  }, [companyId, refreshing, visibleProjects, generateForProject]);

  // ── Staleness ─────────────────────────────────────────────────────────────

  const oldestSnap = snapshots.size > 0
    ? Array.from(snapshots.values()).reduce((oldest, s) =>
        (s.generated_at ?? "") < (oldest.generated_at ?? "") ? s : oldest
      )
    : null;
  const newestSnap = snapshots.size > 0
    ? Array.from(snapshots.values()).reduce((newest, s) =>
        (s.generated_at ?? "") > (newest.generated_at ?? "") ? s : newest
      )
    : null;
  const isStale = oldestSnap?.generated_at
    ? Date.now() - new Date(oldestSnap.generated_at).getTime() > 24 * 3_600_000
    : false;
  const allToday = newestSnap?.generated_at
    ? new Date(newestSnap.generated_at).toDateString() === new Date().toDateString()
    : false;

  // ── Needs attention ───────────────────────────────────────────────────────

  const attentionProjects = visibleProjects.filter(p => {
    const snap = snapshots.get(String(p.id));
    if (!snap) return false;
    if (snap.itp_gaps.length > 0) return true;
    if ((snap.completion_pct ?? 0) > 60 && snap.active_trades.length === 0) return true;
    return false;
  });

  // ── Render ────────────────────────────────────────────────────────────────

  if (!companyId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#F9FAFB]">
        <p className="text-sm text-gray-400">Connect to Procore to view insights.</p>
      </div>
    );
  }

  const isLoading = snapshotsLoading || projectsLoading;

  return (
    <div className="flex-1 overflow-y-auto" style={{ backgroundColor: "var(--hp-bg)" }}>
      <div className="max-w-3xl mx-auto px-6 py-6 space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Site Insights</h2>
            <p className="text-xs text-gray-400 mt-0.5">AI-powered morning briefing — updated daily</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {refreshing && refreshProgress && (
              <p className="text-xs text-blue-600 font-medium">
                Generating {refreshProgress.current} of {refreshProgress.total}…
              </p>
            )}
            <button
              type="button"
              onClick={refreshing ? () => { refreshCancelRef.current = true; } : handleRefreshAll}
              disabled={isLoading}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                refreshing ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100" : "text-white disabled:opacity-40"
              }`}
              style={!refreshing ? { backgroundColor: "var(--hp-warm-800)" } : {}}
            >
              {isLoading && !refreshing && (
                <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              )}
              {refreshing ? "Cancel" : "Refresh All"}
            </button>
          </div>
        </div>

        {/* Loading skeleton */}
        {isLoading && snapshots.size === 0 && (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-28 rounded-xl bg-white border border-gray-200 border-l-4 border-l-gray-200 animate-pulse" />
            ))}
          </div>
        )}

        {/* Empty state — no projects */}
        {!isLoading && visibleProjects.length === 0 && (
          <div className="rounded-xl bg-white border border-gray-200 px-6 py-12 text-center">
            <p className="text-sm text-gray-400">No projects loaded. Select a company first.</p>
          </div>
        )}

        {/* Freshness banner */}
        {!isLoading && !refreshing && visibleProjects.length > 0 && (
          snapshots.size === 0 ? (
            <div className="rounded-xl bg-amber-50 border border-amber-200 px-6 py-4 text-center">
              <p className="text-sm font-medium text-amber-800">No data yet</p>
              <p className="text-xs text-amber-600 mt-0.5">Tap "Refresh All" to generate AI insights for all projects.</p>
            </div>
          ) : isStale ? (
            <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-2.5 flex items-center gap-2">
              <span className="text-amber-600 text-sm">⚠</span>
              <p className="text-xs text-amber-800">
                Showing data from <span className="font-semibold">{fmtAge(oldestSnap?.generated_at)}</span>
                {" "}— tap Refresh All to update.
              </p>
            </div>
          ) : allToday ? (
            <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-2.5 flex items-center gap-2">
              <span className="text-green-600 text-sm">✓</span>
              <p className="text-xs text-green-800">
                Up to date · Refreshed today at <span className="font-semibold">{fmtTime(newestSnap?.generated_at)}</span>
              </p>
            </div>
          ) : null
        )}

        {/* Needs attention */}
        {attentionProjects.length > 0 && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-amber-200">
              <span className="text-sm font-bold text-amber-900">⚠ Needs your attention</span>
              <span className="inline-block rounded-full bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5">
                {attentionProjects.length}
              </span>
            </div>
            <div className="px-4 py-3 space-y-1.5">
              {attentionProjects.map(p => {
                const snap = snapshots.get(String(p.id))!;
                return (
                  <div key={p.id} className="flex items-start gap-2">
                    <span className="text-amber-500 shrink-0">•</span>
                    <div>
                      <span className="text-xs font-semibold text-amber-900">
                        {p.display_name || p.name}
                      </span>
                      {snap.itp_gaps.length > 0 && (
                        <span className="ml-2 text-xs text-amber-700">
                          Missing: {snap.itp_gaps.join(", ")}
                        </span>
                      )}
                      {snap.itp_gaps.length === 0 && (snap.completion_pct ?? 0) > 60 && (
                        <span className="ml-2 text-xs text-amber-700">
                          {snap.completion_pct}% complete — no active subcontracts
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Project cards */}
        {visibleProjects.length > 0 && (
          <div className="space-y-3">
            {visibleProjects.map(project => {
              const pid  = String(project.id);
              const snap = snapshots.get(pid) ?? null;

              // Open ITPs: use loaded inspections for selected project, otherwise empty
              const openItps = selectedProject?.id === project.id
                ? toOpenItpSummaries(inspections)
                : [];

              // Merge project info into snapshot for display
              const displaySnap: ProjectSnapshot | null = snap
                ? {
                    ...snap,
                    project_name:   snap.project_name || project.display_name || project.name,
                    project_number: snap.project_number ?? project.project_number,
                  }
                : {
                    procore_project_id: pid,
                    project_name:       project.display_name || project.name,
                    project_number:     project.project_number,
                    completion_pct:     null,
                    contract_sum:       null,
                    active_trades:      [],
                    stage:              null,
                    missing_itps:       [],
                    coming_up:          [],
                    itp_gaps:           [],
                    generated_at:       null,
                  };

              return (
                <InsightCard
                  key={project.id}
                  snapshot={displaySnap}
                  openItps={openItps}
                  cardState={cardStates.get(pid) ?? "idle"}
                  errorMsg={cardErrors.get(pid) ?? null}
                  onGenerate={() => generateForProject(project)}
                  onViewItps={() => onViewProject(project)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
