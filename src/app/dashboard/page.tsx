"use client";

// ─── Dashboard ────────────────────────────────────────────────────────────────
// Project → ITP overview with review history, score overrides, and side panel.

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import ReviewResults from "@/components/ReviewResults";
import type { ReviewResult, CategoryScore } from "@/lib/types";
import type { DashboardInspection } from "@/app/api/dashboard/inspections/route";

// ── Types ──────────────────────────────────────────────────────────────────────

interface Company { id: number; name: string; is_active: boolean }

interface DashboardProject {
  id: number;
  name: string;
  display_name: string;
  project_number: string | null;
  reviewed_count: number;
  avg_score: number | null;
  last_reviewed_at: string | null;
}

interface InspectionStats {
  closedReviewed: number;
  closedTotal: number;
  openReviewed: number;
  openTotal: number;
  inReviewReviewed: number;
  inReviewTotal: number;
}

type StatusFilter = "closed" | "open" | "in_review";

// ── Score helpers ──────────────────────────────────────────────────────────────

function scoreBand(score: number | null): string {
  if (score === null) return "not_reviewed";
  if (score >= 85) return "compliant";
  if (score >= 70) return "minor_gaps";
  if (score >= 50) return "significant_gaps";
  return "critical_risk";
}

function scoreBandLabel(band: string): string {
  return ({
    compliant: "Compliant", minor_gaps: "Minor gaps",
    significant_gaps: "Significant gaps", critical_risk: "Critical risk",
  } as Record<string, string>)[band] ?? band;
}

function scorePillClasses(band: string): string {
  return ({
    compliant:         "bg-green-100 text-green-800",
    minor_gaps:        "bg-yellow-100 text-yellow-800",
    significant_gaps:  "bg-orange-100 text-orange-800",
    critical_risk:     "bg-red-100 text-red-800",
  } as Record<string, string>)[band] ?? "bg-gray-100 text-gray-600";
}

function scoreBarColour(pct: number): string {
  if (pct >= 80) return "bg-green-400";
  if (pct >= 55) return "bg-amber-400";
  return "bg-red-400";
}

function fmtDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

// Worst band among a group of inspections (for group colour indicator)
const BAND_PRIORITY: Record<string, number> = {
  critical_risk: 0, significant_gaps: 1, minor_gaps: 2, compliant: 3,
};

function worstBandInGroup(group: DashboardInspection[]): string | null {
  const reviewed = group.filter(i => i.review_status !== "not_reviewed");
  if (reviewed.length === 0) return null;
  const bands = reviewed.map(i => scoreBand(i.override_score ?? i.last_score));
  return bands.reduce((worst, b) =>
    (BAND_PRIORITY[b] ?? 99) < (BAND_PRIORITY[worst] ?? 99) ? b : worst
  );
}

function groupIndicatorClasses(band: string | null): string {
  if (!band) return "bg-gray-300";
  return ({
    compliant:         "bg-green-400",
    minor_gaps:        "bg-amber-400",
    significant_gaps:  "bg-orange-400",
    critical_risk:     "bg-red-500",
  } as Record<string, string>)[band] ?? "bg-gray-300";
}

// Compute per-project inspection stats once inspections are loaded
function computeInspectionStats(list: DashboardInspection[]): InspectionStats {
  const closed   = list.filter(i => i.status?.toLowerCase() === "closed");
  const inReview = list.filter(i => i.status?.toLowerCase() === "in_review");
  const open     = list.filter(i => {
    const s = i.status?.toLowerCase();
    return s !== "closed" && s !== "in_review";
  });
  return {
    closedReviewed:   closed.filter(i => i.review_status !== "not_reviewed").length,
    closedTotal:      closed.length,
    openReviewed:     open.filter(i => i.review_status !== "not_reviewed").length,
    openTotal:        open.length,
    inReviewReviewed: inReview.filter(i => i.review_status !== "not_reviewed").length,
    inReviewTotal:    inReview.length,
  };
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  // Auth + company
  const [authenticated, setAuthenticated]     = useState<boolean | null>(null);
  const [user, setUser]                        = useState<{ name: string } | null>(null);
  const [companies, setCompanies]              = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Projects
  const [projects, setProjects]               = useState<DashboardProject[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<DashboardProject | null>(null);

  // Per-project inspection stats (populated after loading inspections for each project)
  const [projectStats, setProjectStats] = useState<Map<number, InspectionStats>>(new Map());

  // Inspections
  const [inspections, setInspections]               = useState<DashboardInspection[]>([]);
  const [inspectionsLoading, setInspectionsLoading] = useState(false);
  const [statusFilter, setStatusFilter]             = useState<StatusFilter>("closed");

  // ITP group collapse state (tracks which groups are collapsed; all expanded by default)
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  // Side panel
  const [selectedInsp, setSelectedInsp] = useState<DashboardInspection | null>(null);
  const [panelOpen, setPanelOpen]       = useState(false);

  // Full report overlay
  const [fullReportInsp, setFullReportInsp] = useState<DashboardInspection | null>(null);

  // Override form
  const [overrideScore, setOverrideScore]   = useState("");
  const [overrideNote, setOverrideNote]     = useState("");
  const [overrideSaving, setOverrideSaving] = useState(false);
  const [overrideError, setOverrideError]   = useState<string | null>(null);

  // Run review
  const [reviewRunning, setReviewRunning] = useState(false);
  const [reviewError, setReviewError]     = useState<string | null>(null);

  // ── Auth + company discovery ────────────────────────────────────────────────

  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.authenticated) {
          setAuthenticated(true);
          setUser(data.user ?? null);
          loadCompanies();
        } else {
          setAuthenticated(false);
        }
      })
      .catch(() => setAuthenticated(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadCompanies() {
    const res  = await fetch("/api/procore/companies");
    const data = await res.json();
    const list: Company[] = data.companies ?? [];
    setCompanies(list);
    if (list.length === 1) setSelectedCompany(list[0]);
  }

  // ── Load projects when company selected ────────────────────────────────────

  useEffect(() => {
    if (!selectedCompany) return;
    setProjectsLoading(true);
    setSelectedProject(null);
    setInspections([]);
    setProjectStats(new Map());
    fetch(`/api/dashboard/projects?company_id=${selectedCompany.id}`)
      .then(r => r.json())
      .then(data => setProjects(data.projects ?? []))
      .catch(() => setProjects([]))
      .finally(() => setProjectsLoading(false));
  }, [selectedCompany]);

  // ── Load inspections when project selected ─────────────────────────────────

  const loadInspections = useCallback(async (project: DashboardProject, company: Company) => {
    setInspectionsLoading(true);
    setInspections([]);
    setCollapsedGroups(new Set());
    try {
      const res  = await fetch(`/api/dashboard/inspections?project_id=${project.id}&company_id=${company.id}`);
      const data = await res.json();
      const list: DashboardInspection[] = data.inspections ?? [];
      setInspections(list);
      // Compute and store split stats for the sidebar
      setProjectStats(prev => new Map(prev).set(project.id, computeInspectionStats(list)));
    } catch {
      setInspections([]);
    } finally {
      setInspectionsLoading(false);
    }
  }, []);

  function handleSelectProject(project: DashboardProject) {
    setSelectedProject(project);
    setPanelOpen(false);
    setSelectedInsp(null);
    if (selectedCompany) loadInspections(project, selectedCompany);
  }

  // ── Side panel ──────────────────────────────────────────────────────────────

  function openPanel(insp: DashboardInspection) {
    setSelectedInsp(insp);
    setPanelOpen(true);
    setOverrideScore(insp.override_score != null ? String(insp.override_score) : "");
    setOverrideNote(insp.override_note ?? "");
    setOverrideError(null);
    setReviewError(null);
  }

  function closePanel() {
    setPanelOpen(false);
    setTimeout(() => setSelectedInsp(null), 300);
  }

  // ── Run Review ──────────────────────────────────────────────────────────────

  async function handleRunReview() {
    if (!selectedInsp || !selectedProject || !selectedCompany) return;
    setReviewRunning(true);
    setReviewError(null);
    try {
      const res  = await fetch("/api/procore/import", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          project_id:    selectedProject.id,
          inspection_id: selectedInsp.id,
          company_id:    selectedCompany.id,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? "Review failed");

      await loadInspections(selectedProject, selectedCompany);

      setInspections(prev => {
        const updated = prev.find(i => i.id === selectedInsp.id);
        if (updated) {
          setSelectedInsp(updated);
          setOverrideScore(updated.override_score != null ? String(updated.override_score) : "");
          setOverrideNote(updated.override_note ?? "");
        }
        return prev;
      });
    } catch (err) {
      setReviewError(err instanceof Error ? err.message : "Review failed");
    } finally {
      setReviewRunning(false);
    }
  }

  // ── Save Override ───────────────────────────────────────────────────────────

  async function handleSaveOverride() {
    if (!selectedInsp?.review_record_id || !selectedCompany) return;
    const parsed = parseInt(overrideScore, 10);
    if (isNaN(parsed) || parsed < 0 || parsed > 100) {
      setOverrideError("Score must be a number between 0 and 100.");
      return;
    }
    setOverrideSaving(true);
    setOverrideError(null);
    try {
      const res  = await fetch("/api/dashboard/override", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          review_record_id: selectedInsp.review_record_id,
          company_id:       String(selectedCompany.id),
          original_score:   selectedInsp.last_score ?? 0,
          override_score:   parsed,
          note:             overrideNote.trim() || null,
          created_by:       user?.name ?? null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");

      const updater = (insp: DashboardInspection): DashboardInspection =>
        insp.id === selectedInsp.id
          ? { ...insp, override_score: parsed, override_note: overrideNote.trim() || null, override_created_by: user?.name ?? null }
          : insp;

      setInspections(prev => prev.map(updater));
      setSelectedInsp(prev => prev ? updater(prev) : prev);
    } catch (err) {
      setOverrideError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setOverrideSaving(false);
    }
  }

  // ── Filtered + grouped ITP list ─────────────────────────────────────────────

  const filteredInspections = inspections.filter(i => {
    const s = i.status?.toLowerCase();
    if (statusFilter === "closed")    return s === "closed";
    if (statusFilter === "in_review") return s === "in_review";
    return s !== "closed" && s !== "in_review";
  });

  const closedCount   = inspections.filter(i => i.status?.toLowerCase() === "closed").length;
  const inReviewCount = inspections.filter(i => i.status?.toLowerCase() === "in_review").length;
  const openCount     = inspections.filter(i => {
    const s = i.status?.toLowerCase();
    return s !== "closed" && s !== "in_review";
  }).length;

  // Group by ITP name (all instances of the same type share the same name)
  const groupOrder: string[] = [];
  const groupMap = new Map<string, DashboardInspection[]>();
  for (const insp of filteredInspections) {
    if (!groupMap.has(insp.name)) {
      groupOrder.push(insp.name);
      groupMap.set(insp.name, []);
    }
    groupMap.get(insp.name)!.push(insp);
  }

  function toggleGroup(name: string) {
    setCollapsedGroups(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  // ── Not authenticated ───────────────────────────────────────────────────────

  if (authenticated === false) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-gray-600">Connect to Procore to use the dashboard.</p>
        <a
          href="/api/auth/login"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Connect to Procore
        </a>
        <Link href="/" className="text-xs text-gray-400 hover:underline">← Back to reviews</Link>
      </div>
    );
  }

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner className="h-6 w-6 text-blue-400" />
      </div>
    );
  }

  // ── Full report overlay ─────────────────────────────────────────────────────

  if (fullReportInsp?.review_data) {
    return (
      <div className="min-h-screen bg-white overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Full Report — {fullReportInsp.name}
          </p>
          <button
            onClick={() => setFullReportInsp(null)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            ← Back to dashboard
          </button>
        </div>
        <div className="mx-auto max-w-2xl px-4 py-8">
          <ReviewResults result={fullReportInsp.review_data} onReset={() => setFullReportInsp(null)} />
        </div>
      </div>
    );
  }

  // ── Dashboard layout ────────────────────────────────────────────────────────

  return (
    <div className="flex h-screen flex-col bg-gray-50 overflow-hidden">

      {/* ── Header ── */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            ← Back to reviews
          </Link>
          <span className="text-gray-200">|</span>
          <h1 className="text-sm font-bold text-gray-900">
            <span className="text-yellow-400">Fleek Constructions</span>
            <span className="ml-2 font-normal text-gray-500">ITP Dashboard</span>
          </h1>
        </div>
        {companies.length > 1 && (
          <select
            value={selectedCompany?.id ?? ""}
            onChange={e => {
              const c = companies.find(x => x.id === Number(e.target.value));
              if (c) setSelectedCompany(c);
            }}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">— Select company —</option>
            {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        )}
        {companies.length === 1 && selectedCompany && (
          <span className="text-xs text-gray-500">{selectedCompany.name}</span>
        )}
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left: project list ── */}
        <aside className="w-64 shrink-0 border-r border-gray-200 bg-white overflow-y-auto">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Projects</p>
          </div>

          {!selectedCompany && (
            <p className="px-4 py-6 text-xs text-gray-400 italic">Select a company to load projects.</p>
          )}
          {selectedCompany && projectsLoading && (
            <div className="flex items-center gap-2 px-4 py-4 text-xs text-gray-400">
              <Spinner className="h-3 w-3 text-blue-400" /> Loading…
            </div>
          )}
          {selectedCompany && !projectsLoading && projects.length === 0 && (
            <p className="px-4 py-4 text-xs text-gray-400 italic">No projects found.</p>
          )}

          {projects.map(p => (
            <ProjectRow
              key={p.id}
              project={p}
              selected={selectedProject?.id === p.id}
              stats={projectStats.get(p.id) ?? null}
              onClick={() => handleSelectProject(p)}
            />
          ))}
        </aside>

        {/* ── Main: ITP list ── */}
        <main className="flex-1 overflow-y-auto">
          {!selectedProject && (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-gray-400">Select a project to view its ITPs.</p>
            </div>
          )}

          {selectedProject && (
            <div>
              {/* Project header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-gray-900">
                      {selectedProject.display_name || selectedProject.name}
                    </h2>
                    {selectedProject.project_number && (
                      <p className="text-xs text-gray-400 mt-0.5">#{selectedProject.project_number}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {selectedProject.reviewed_count > 0 && (
                      <>
                        <span>{selectedProject.reviewed_count} reviewed</span>
                        {selectedProject.avg_score !== null && (
                          <span className={`font-bold ${selectedProject.avg_score >= 85 ? "text-green-600" : selectedProject.avg_score >= 70 ? "text-amber-600" : selectedProject.avg_score >= 50 ? "text-orange-500" : "text-red-500"}`}>
                            Avg {selectedProject.avg_score}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Status tabs */}
                <div className="mt-3 flex items-center gap-1 w-fit">
                  <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5 gap-0.5">
                    {([
                      ["closed",    `Closed (${closedCount})`],
                      ["in_review", `In Review (${inReviewCount})`],
                      ["open",      `Open (${openCount})`],
                    ] as [StatusFilter, string][]).map(([s, label]) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setStatusFilter(s)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                          statusFilter === s
                            ? "bg-white text-gray-900 shadow-sm border border-gray-100"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ITP table */}
              {inspectionsLoading && (
                <div className="flex items-center gap-2 px-6 py-6 text-sm text-gray-400">
                  <Spinner className="h-4 w-4 text-blue-400" /> Loading inspections…
                </div>
              )}

              {!inspectionsLoading && filteredInspections.length === 0 && (
                <div className="px-6 py-10 text-center text-sm text-gray-400">
                  No {statusFilter === "in_review" ? "in-review" : statusFilter} ITP inspections found.
                </div>
              )}

              {!inspectionsLoading && filteredInspections.length > 0 && (
                <>
                  {/* Collapse / Expand All */}
                  <div className="flex justify-end px-4 py-2 border-b border-gray-100 bg-white">
                    <button
                      type="button"
                      onClick={() => {
                        const allCollapsed = groupOrder.length > 0 && collapsedGroups.size === groupOrder.length;
                        if (allCollapsed) {
                          setCollapsedGroups(new Set());
                        } else {
                          setCollapsedGroups(new Set(groupOrder));
                        }
                      }}
                      className="text-[11px] font-medium text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {groupOrder.length > 0 && collapsedGroups.size === groupOrder.length
                        ? "Expand All"
                        : "Collapse All"}
                    </button>
                  </div>

                  <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-2">ITP</th>
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 py-2 w-12">#</th>
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 py-2 w-32">Score</th>
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 py-2 w-36">Rating</th>
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 py-2 w-20">Status</th>
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 py-2 w-32">Reviewed</th>
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 py-2 w-36">Person</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {groupOrder.map(groupName => {
                      const group = groupMap.get(groupName)!;
                      const isCollapsed = collapsedGroups.has(groupName);
                      const worst = worstBandInGroup(group);
                      const reviewedInGroup = group.filter(i => i.review_status !== "not_reviewed").length;

                      return [
                        // Group header row
                        <tr
                          key={`group-${groupName}`}
                          onClick={() => toggleGroup(groupName)}
                          className="cursor-pointer bg-gray-50 hover:bg-gray-100 border-t border-gray-200 select-none"
                        >
                          <td colSpan={7} className="px-4 py-2">
                            <div className="flex items-center gap-2">
                              {/* Collapse arrow */}
                              <span className={`text-gray-400 text-xs transition-transform duration-150 ${isCollapsed ? "" : "rotate-90"}`}>
                                ▶
                              </span>
                              {/* Worst-band colour dot */}
                              <span className={`h-2 w-2 rounded-full shrink-0 ${groupIndicatorClasses(worst)}`} />
                              {/* Group name */}
                              <span className="text-xs font-semibold text-gray-700">{groupName}</span>
                              {/* Count badges */}
                              <span className="text-[10px] text-gray-400 ml-1">
                                {reviewedInGroup}/{group.length} reviewed
                              </span>
                            </div>
                          </td>
                        </tr>,
                        // Inspection rows (hidden when collapsed)
                        ...(!isCollapsed ? group.map(insp => (
                          <InspectionRow
                            key={insp.id}
                            insp={insp}
                            selected={selectedInsp?.id === insp.id && panelOpen}
                            onClick={() => openPanel(insp)}
                          />
                        )) : []),
                      ];
                    })}
                  </tbody>
                  </table>
                </>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ── Side panel backdrop ── */}
      {panelOpen && (
        <div className="fixed inset-0 z-30 bg-black/20" onClick={closePanel} />
      )}

      {/* ── Side panel ── */}
      <div
        className={`fixed right-0 top-0 h-full w-[480px] bg-white shadow-2xl z-40 transform transition-transform duration-300 overflow-y-auto ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedInsp && (
          <InspectionPanel
            insp={selectedInsp}
            companyId={selectedCompany ? String(selectedCompany.id) : ""}
            reviewRunning={reviewRunning}
            reviewError={reviewError}
            overrideScore={overrideScore}
            overrideNote={overrideNote}
            overrideSaving={overrideSaving}
            overrideError={overrideError}
            onClose={closePanel}
            onRunReview={handleRunReview}
            onViewFullReport={() => { setFullReportInsp(selectedInsp); setPanelOpen(false); }}
            onOverrideScoreChange={setOverrideScore}
            onOverrideNoteChange={setOverrideNote}
            onSaveOverride={handleSaveOverride}
          />
        )}
      </div>

    </div>
  );
}

// ── ProjectRow ─────────────────────────────────────────────────────────────────

function ProjectRow({
  project: p,
  selected,
  stats,
  onClick,
}: {
  project: DashboardProject;
  selected: boolean;
  stats: InspectionStats | null;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3 border-b border-gray-50 transition-colors ${
        selected ? "bg-blue-50 border-l-2 border-l-blue-500" : "hover:bg-gray-50 border-l-2 border-l-transparent"
      }`}
    >
      <p className="text-xs font-semibold text-gray-800 leading-snug truncate">
        {p.display_name || p.name}
      </p>
      {p.project_number && (
        <p className="text-[10px] text-gray-400 mt-0.5">#{p.project_number}</p>
      )}
      <div className="flex flex-col gap-0.5 mt-1.5">
        {stats ? (
          // Show split reviewed counts once inspections are loaded for this project
          <>
            {stats.closedTotal > 0 && (
              <span className="text-[10px] text-gray-400">
                Closed: {stats.closedReviewed} reviewed / {stats.closedTotal}
              </span>
            )}
            {stats.inReviewTotal > 0 && (
              <span className="text-[10px] text-blue-400">
                In Review: {stats.inReviewReviewed} reviewed / {stats.inReviewTotal}
              </span>
            )}
            {stats.openTotal > 0 && (
              <span className="text-[10px] text-gray-400">
                Open: {stats.openReviewed} reviewed / {stats.openTotal}
              </span>
            )}
          </>
        ) : p.reviewed_count > 0 ? (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400">{p.reviewed_count} reviewed</span>
            {p.avg_score !== null && (
              <span className={`text-[10px] font-semibold ${
                p.avg_score >= 85 ? "text-green-600" :
                p.avg_score >= 70 ? "text-amber-600" :
                p.avg_score >= 50 ? "text-orange-500" :
                                    "text-red-500"
              }`}>
                Avg {p.avg_score}
              </span>
            )}
          </div>
        ) : (
          <span className="text-[10px] text-gray-300 italic">Not reviewed</span>
        )}
      </div>
    </button>
  );
}

// ── InspectionRow ──────────────────────────────────────────────────────────────

function InspectionRow({
  insp,
  selected,
  onClick,
}: {
  insp: DashboardInspection;
  selected: boolean;
  onClick: () => void;
}) {
  const displayScore = insp.override_score ?? insp.last_score;
  const band = insp.last_score_band ?? (displayScore !== null ? scoreBand(displayScore) : null);
  const isClosed = insp.status?.toLowerCase() === "closed";

  return (
    <tr
      onClick={onClick}
      className={`cursor-pointer transition-colors ${
        selected ? "bg-blue-50" : "hover:bg-gray-50"
      }`}
    >
      {/* ITP name */}
      <td className="px-6 py-3 max-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{insp.name}</p>
      </td>

      {/* Inspection # of type */}
      <td className="px-3 py-3 text-xs text-gray-400 whitespace-nowrap">
        {insp.inspection_number_of_type != null ? `#${insp.inspection_number_of_type}` : ""}
      </td>

      {/* Score */}
      <td className="px-3 py-3 whitespace-nowrap">
        {insp.review_status === "not_reviewed" ? (
          <span className="text-xs text-gray-400 italic">—</span>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-bold ${
              (displayScore ?? 0) >= 85 ? "text-green-600" :
              (displayScore ?? 0) >= 70 ? "text-amber-600" :
              (displayScore ?? 0) >= 50 ? "text-orange-500" :
                                          "text-red-500"
            }`}>
              {displayScore ?? "—"}
            </span>
            {insp.override_score !== null && (
              <span className="text-[10px] text-gray-400 line-through">{insp.last_score}</span>
            )}
          </div>
        )}
      </td>

      {/* Band pill */}
      <td className="px-3 py-3 whitespace-nowrap">
        {band ? (
          <div className="flex items-center gap-1.5">
            <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${scorePillClasses(band)}`}>
              {scoreBandLabel(band)}
            </span>
            {insp.override_score !== null && (
              <span className="text-[10px] text-purple-600 font-semibold">Human</span>
            )}
          </div>
        ) : (
          <span className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold bg-gray-100 text-gray-400">
            Not reviewed
          </span>
        )}
      </td>

      {/* Status */}
      <td className="px-3 py-3 whitespace-nowrap">
        <span className={`text-[10px] font-semibold uppercase tracking-wide ${
          isClosed ? "text-gray-400" :
          insp.status?.toLowerCase() === "in_review" ? "text-blue-500" :
          "text-emerald-500"
        }`}>
          {insp.status ?? "—"}
        </span>
      </td>

      {/* Last reviewed */}
      <td className="px-3 py-3 text-xs text-gray-400 whitespace-nowrap">
        {insp.last_reviewed_at ? fmtDate(insp.last_reviewed_at) : "—"}
        {insp.review_status === "changed" && (
          <span className="ml-1 text-amber-500 text-[10px]">⚠</span>
        )}
      </td>

      {/* Person: closed_by for closed, assignee for open/in-review */}
      <td className="px-3 py-3 text-[10px] text-gray-400 whitespace-nowrap">
        {isClosed
          ? (insp.closed_by ? `Closed by ${insp.closed_by}` : "—")
          : (insp.assignee  ? `Assigned to ${insp.assignee}` : "—")}
      </td>
    </tr>
  );
}

// ── InspectionPanel ────────────────────────────────────────────────────────────

function InspectionPanel({
  insp,
  companyId,
  reviewRunning,
  reviewError,
  overrideScore,
  overrideNote,
  overrideSaving,
  overrideError,
  onClose,
  onRunReview,
  onViewFullReport,
  onOverrideScoreChange,
  onOverrideNoteChange,
  onSaveOverride,
}: {
  insp: DashboardInspection;
  companyId: string;
  reviewRunning: boolean;
  reviewError: string | null;
  overrideScore: string;
  overrideNote: string;
  overrideSaving: boolean;
  overrideError: string | null;
  onClose: () => void;
  onRunReview: () => void;
  onViewFullReport: () => void;
  onOverrideScoreChange: (v: string) => void;
  onOverrideNoteChange: (v: string) => void;
  onSaveOverride: () => void;
}) {
  const displayScore  = insp.override_score ?? insp.last_score;
  const band          = insp.last_score_band ?? (displayScore !== null ? scoreBand(displayScore) : null);
  const rd            = insp.review_data;
  const hasOverride   = insp.override_score !== null;

  return (
    <div className="flex flex-col h-full">

      {/* Panel header */}
      <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100 shrink-0">
        <div className="min-w-0 flex-1 pr-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-0.5">ITP Detail</p>
          <h3 className="text-sm font-bold text-gray-900 leading-snug">{insp.name}</h3>
          {insp.inspection_number_of_type != null && (
            <p className="text-xs text-gray-400 mt-0.5">Inspection #{insp.inspection_number_of_type}</p>
          )}
        </div>
        <button onClick={onClose} className="shrink-0 text-gray-400 hover:text-gray-600 p-1 rounded">
          ✕
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

        {/* Score + band */}
        {insp.review_status !== "not_reviewed" && (
          <div className={`rounded-xl border px-4 py-3 ${
            (displayScore ?? 0) >= 85 ? "bg-green-50 border-green-200" :
            (displayScore ?? 0) >= 70 ? "bg-yellow-50 border-yellow-200" :
            (displayScore ?? 0) >= 50 ? "bg-orange-50 border-orange-200" :
                                        "bg-red-50 border-red-200"
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Score</p>
                <div className="flex items-center gap-2">
                  <span className={`text-3xl font-bold ${
                    (displayScore ?? 0) >= 85 ? "text-green-600" :
                    (displayScore ?? 0) >= 70 ? "text-amber-600" :
                    (displayScore ?? 0) >= 50 ? "text-orange-500" :
                                                "text-red-500"
                  }`}>
                    {displayScore ?? "—"}
                  </span>
                  {hasOverride && (
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 line-through">AI: {insp.last_score}</span>
                      <span className="text-[10px] rounded-full bg-purple-100 text-purple-700 font-semibold px-2 py-0.5">
                        Human reviewed
                      </span>
                    </div>
                  )}
                </div>
                {band && (
                  <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${scorePillClasses(band)}`}>
                    {scoreBandLabel(band)}
                  </span>
                )}
              </div>
              <div className="text-right text-xs text-gray-400">
                <p>Reviewed {fmtDate(insp.last_reviewed_at)}</p>
                <p className={`mt-0.5 ${insp.status?.toLowerCase() === "closed" ? "text-gray-400" : "text-blue-500 font-medium"}`}>
                  {insp.status}
                </p>
              </div>
            </div>
          </div>
        )}

        {insp.review_status === "not_reviewed" && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-center">
            <p className="text-sm text-gray-500">This ITP has not been reviewed yet.</p>
          </div>
        )}

        {/* D1–D5 breakdown */}
        {rd?.score_breakdown?.category_scores && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Score breakdown</p>
            <div className="space-y-3">
              {([
                ["D1", "Engineer & inspector verification", rd.score_breakdown.category_scores.D1_engineer_verification],
                ["D2", "Technical testing evidence",        rd.score_breakdown.category_scores.D2_technical_testing],
                ["D3", "ITP form completeness",            rd.score_breakdown.category_scores.D3_itp_form_completeness],
                ["D4", "Material traceability",             rd.score_breakdown.category_scores.D4_material_traceability],
                ["D5", "Physical evidence",                 rd.score_breakdown.category_scores.D5_physical_evidence],
              ] as [string, string, CategoryScore][]).map(([code, label, cat]) => {
                const pct = cat.applicable_points > 0
                  ? Math.round((cat.achieved_points / cat.applicable_points) * 100)
                  : null;
                return (
                  <div key={code}>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs font-semibold text-gray-700">{code} — {label}</span>
                      <span className="text-xs text-gray-400 tabular-nums">
                        {pct !== null ? `${pct}%` : "N/A"}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      {pct !== null && (
                        <div
                          className={`h-full rounded-full ${scoreBarColour(pct)}`}
                          style={{ width: `${pct}%` }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Top 3 missing evidence */}
        {rd?.missing_evidence && rd.missing_evidence.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
              Missing evidence
            </p>
            <div className="space-y-2">
              {rd.missing_evidence.slice(0, 3).map((item, i) => (
                <div key={i} className="rounded-lg border border-red-100 bg-red-50 px-3 py-2">
                  <p className="text-xs font-semibold text-red-700">{item.evidence_type}</p>
                  <p className="text-xs text-red-600 mt-0.5 leading-snug">{item.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onRunReview}
            disabled={reviewRunning}
            className="flex-1 rounded-lg bg-blue-600 px-3 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {reviewRunning ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner className="h-3 w-3 text-white" /> Running…
              </span>
            ) : "Run Review"}
          </button>
          {rd && (
            <button
              type="button"
              onClick={onViewFullReport}
              className="flex-1 rounded-lg border border-blue-300 bg-blue-50 px-3 py-2.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
            >
              View Full Report
            </button>
          )}
        </div>

        {reviewError && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {reviewError}
          </p>
        )}

        {/* ── Human Override ── */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Human Override
          </p>

          {hasOverride && (
            <div className="mb-3 rounded-lg border border-purple-200 bg-purple-50 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] rounded-full bg-purple-100 text-purple-700 font-semibold px-2 py-0.5">
                  Human reviewed
                </span>
                <span className="text-xs text-purple-700 font-medium">
                  AI: {insp.last_score} → Override: {insp.override_score}
                </span>
              </div>
              {insp.override_note && (
                <p className="text-xs text-purple-600 mt-1 italic break-words whitespace-pre-wrap">
                  &ldquo;{insp.override_note}&rdquo;
                </p>
              )}
              {insp.override_created_by && (
                <p className="text-[10px] text-purple-400 mt-0.5">by {insp.override_created_by}</p>
              )}
            </div>
          )}

          {insp.review_record_id ? (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Override score (0–100)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={overrideScore}
                  onChange={e => onOverrideScoreChange(e.target.value)}
                  placeholder="e.g. 78"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Reason for override
                </label>
                <RichNoteEditor
                  value={overrideNote}
                  onChange={onOverrideNoteChange}
                  instanceKey={String(insp.id)}
                  placeholder="Explain why the score is being adjusted…&#10;• Use Enter for new lines&#10;• Start a line with - for bullet points"
                />
              </div>
              {overrideError && (
                <p className="text-xs text-red-600">{overrideError}</p>
              )}
              <button
                type="button"
                onClick={onSaveOverride}
                disabled={overrideSaving || !overrideScore}
                className="w-full rounded-lg bg-purple-600 px-3 py-2.5 text-xs font-semibold text-white hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {overrideSaving ? "Saving…" : "Save Override"}
              </button>
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">
              Run a review first to enable score overrides.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

// ── RichNoteEditor ─────────────────────────────────────────────────────────────
// Simple contentEditable editor that preserves newlines and lets the user
// type bullet-style lines. Saves as plain text with \n line breaks.

function RichNoteEditor({
  value,
  onChange,
  placeholder,
  instanceKey,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  instanceKey: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Reset content when a new panel is opened (instanceKey changes)
  useEffect(() => {
    if (!ref.current) return;
    if (value) {
      // Convert \n to <br> for display; escape HTML entities in text
      const escaped = value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      ref.current.innerHTML = escaped.replace(/\n/g, "<br>");
    } else {
      ref.current.innerHTML = "";
    }
  // Only trigger on instanceKey change, not every keystroke
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instanceKey]);

  function handleInput() {
    if (!ref.current) return;
    onChange(ref.current.innerText);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    // Prevent Shift+Enter from inserting a <div> in some browsers
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      document.execCommand("insertLineBreak");
      if (ref.current) onChange(ref.current.innerText);
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLDivElement>) {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
    if (ref.current) onChange(ref.current.innerText);
  }

  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      data-placeholder={placeholder}
      className={[
        "w-full min-h-[80px] rounded-lg border border-gray-200 bg-white px-3 py-2",
        "text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400",
        "whitespace-pre-wrap break-words overflow-y-auto",
        "empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:pointer-events-none",
      ].join(" ")}
    />
  );
}

// ── Spinner ────────────────────────────────────────────────────────────────────

function Spinner({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}
