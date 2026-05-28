"use client";

// ─── ResourcingTab ────────────────────────────────────────────────────────────
// Displays a subcontractor × project commitment matrix.
// Conflicts: same vendor active (non-completed) across ≥2 projects.
// Users can hide projects from the matrix and mark individual scopes complete.

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, EyeOff, Eye, CheckCircle, Circle, AlertTriangle } from "lucide-react";
import type { CommitmentsResponse, ProjectCommitments, ProcoreCommitment } from "@/app/api/resourcing/commitments/route";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Props {
  companyId: string | number | null;
}

interface VendorRow {
  vendorId:   number;
  vendorName: string;
  // map from project_id → commitment (or null if not active on that project)
  projects: Record<string, { commitment: ProcoreCommitment; is_completed: boolean } | null>;
  conflictCount: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function statusColour(status: string): string {
  const s = status.toLowerCase();
  if (s === "approved" || s === "complete") return "#16a34a";
  if (s === "void" || s === "terminated")   return "#9ca3af";
  if (s === "draft")                        return "#d97706";
  return "#2563eb";
}

function buildVendorMatrix(
  projects: ProjectCommitments[],
): VendorRow[] {
  const visibleProjects = projects.filter(p => !p.is_hidden);

  // vendor → project_id → {commitment, is_completed}
  const map = new Map<number, { name: string; projects: Record<string, { commitment: ProcoreCommitment; is_completed: boolean }> }>();

  for (const proj of visibleProjects) {
    for (const c of proj.commitments) {
      if (!c.vendor) continue;
      const vid = c.vendor.id;
      if (!map.has(vid)) {
        map.set(vid, { name: c.vendor.name, projects: {} });
      }
      const existing = map.get(vid)!.projects[proj.project_id];
      // Keep the most "active" commitment per vendor×project (prefer non-void/terminated)
      if (!existing || existing.commitment.status.toLowerCase() === "void") {
        map.get(vid)!.projects[proj.project_id] = {
          commitment:   c,
          is_completed: c.is_completed,
        };
      }
    }
  }

  const rows: VendorRow[] = [];
  const projectIds = visibleProjects.map(p => p.project_id);

  map.forEach((v, vid) => {
    const projectsForRow: Record<string, { commitment: ProcoreCommitment; is_completed: boolean } | null> = {};
    for (const pid of projectIds) {
      projectsForRow[pid] = v.projects[pid] ?? null;
    }

    // Conflict: active (non-completed, non-void/terminated) on ≥2 projects
    const activeCount = projectIds.filter(pid => {
      const entry = v.projects[pid];
      if (!entry) return false;
      if (entry.is_completed) return false;
      const s = entry.commitment.status.toLowerCase();
      if (s === "void" || s === "terminated") return false;
      return true;
    }).length;

    rows.push({
      vendorId:      vid,
      vendorName:    v.name,
      projects:      projectsForRow,
      conflictCount: activeCount >= 2 ? activeCount : 0,
    });
  });

  // Sort: conflicts first, then alpha
  rows.sort((a, b) => {
    if (b.conflictCount !== a.conflictCount) return b.conflictCount - a.conflictCount;
    return a.vendorName.localeCompare(b.vendorName);
  });

  return rows;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ResourcingTab({ companyId }: Props) {
  const [data, setData]       = useState<CommitmentsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  // Track in-flight mutations so UI can show optimistic feedback
  const [toggling, setToggling] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    if (!companyId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/resourcing/commitments?company_id=${companyId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: CommitmentsResponse = await res.json();
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => { void load(); }, [load]);

  // ── Hide / unhide project ──────────────────────────────────────────────────
  async function toggleHideProject(projectId: string, currentlyHidden: boolean) {
    if (!companyId) return;
    const key = `hide:${projectId}`;
    setToggling(prev => new Set(prev).add(key));

    const method = currentlyHidden ? "DELETE" : "POST";
    try {
      await fetch("/api/resourcing/hide-project", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company_id: String(companyId), project_id: projectId }),
      });

      // Optimistic update
      setData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          projects: prev.projects.map(p =>
            p.project_id === projectId ? { ...p, is_hidden: !currentlyHidden } : p,
          ),
          hidden_ids: currentlyHidden
            ? prev.hidden_ids.filter(id => id !== projectId)
            : [...prev.hidden_ids, projectId],
        };
      });
    } finally {
      setToggling(prev => { const s = new Set(prev); s.delete(key); return s; });
    }
  }

  // ── Mark / unmark scope complete ──────────────────────────────────────────
  async function toggleComplete(projectId: string, commitmentId: number, currentlyComplete: boolean) {
    if (!companyId) return;
    const key = `complete:${projectId}:${commitmentId}`;
    setToggling(prev => new Set(prev).add(key));

    const method = currentlyComplete ? "DELETE" : "POST";
    const ck = `${projectId}:${commitmentId}`;
    try {
      await fetch("/api/resourcing/complete-scope", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_id:    String(companyId),
          project_id:    projectId,
          commitment_id: String(commitmentId),
        }),
      });

      // Optimistic update
      setData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          projects: prev.projects.map(p => {
            if (p.project_id !== projectId) return p;
            return {
              ...p,
              commitments: p.commitments.map(c =>
                c.id === commitmentId ? { ...c, is_completed: !currentlyComplete } : c,
              ),
            };
          }),
          completed_ids: currentlyComplete
            ? prev.completed_ids.filter(id => id !== ck)
            : [...prev.completed_ids, ck],
        };
      });
    } finally {
      setToggling(prev => { const s = new Set(prev); s.delete(key); return s; });
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  if (!companyId) {
    return (
      <div className="flex-1 flex items-center justify-center" style={{ color: "var(--hp-text-secondary)" }}>
        <p className="text-sm italic">Select a company to view resourcing.</p>
      </div>
    );
  }

  if (loading && !data) {
    return (
      <div className="flex-1 flex items-center justify-center gap-2" style={{ color: "var(--hp-text-secondary)" }}>
        <RefreshCw className="h-4 w-4 animate-spin" />
        <span className="text-sm">Loading commitments…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <p className="text-sm" style={{ color: "#dc2626" }}>{error}</p>
        <button
          onClick={() => void load()}
          className="text-xs px-3 py-1.5 rounded"
          style={{ backgroundColor: "var(--hp-warm-100)", color: "var(--hp-warm-800)" }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  const visibleProjects = data.projects.filter(p => !p.is_hidden);
  const hiddenProjects  = data.projects.filter(p => p.is_hidden);
  const vendorRows      = buildVendorMatrix(data.projects);
  const conflictCount   = vendorRows.filter(r => r.conflictCount > 0).length;

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: "var(--hp-bg)" }}>

      {/* ── Header ── */}
      <div
        className="shrink-0 flex items-center justify-between px-5 py-3"
        style={{ backgroundColor: "var(--hp-surface)", borderBottom: "1px solid var(--hp-border)" }}
      >
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold" style={{ color: "var(--hp-text)" }}>
            Subcontractor Commitments
          </h2>
          {conflictCount > 0 && (
            <span
              className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "#fef2f2", color: "#dc2626" }}
            >
              <AlertTriangle className="h-3 w-3" />
              {conflictCount} conflict{conflictCount > 1 ? "s" : ""}
            </span>
          )}
        </div>
        <button
          onClick={() => void load()}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-opacity"
          style={{
            backgroundColor: "var(--hp-warm-100)",
            color: "var(--hp-warm-800)",
            opacity: loading ? 0.6 : 1,
          }}
        >
          <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 overflow-auto px-5 py-4">

        {visibleProjects.length === 0 && hiddenProjects.length === 0 && (
          <p className="text-sm italic" style={{ color: "var(--hp-text-secondary)" }}>
            No projects found.
          </p>
        )}

        {/* ── Conflict explanation ── */}
        {conflictCount > 0 && (
          <div
            className="mb-4 flex items-start gap-2 rounded-lg px-4 py-3 text-sm"
            style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#7f1d1d" }}
          >
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "#dc2626" }} />
            <span>
              <strong>{conflictCount} subcontractor{conflictCount > 1 ? "s are" : " is"} active across multiple projects.</strong>{" "}
              Review the highlighted rows below. Mark scopes as complete or coordinate scheduling to resolve conflicts.
            </span>
          </div>
        )}

        {/* ── Matrix table ── */}
        {vendorRows.length > 0 && (
          <div className="overflow-x-auto rounded-lg" style={{ border: "1px solid var(--hp-border)" }}>
            <table className="w-full text-xs border-collapse" style={{ minWidth: 600 }}>
              <thead>
                <tr style={{ backgroundColor: "var(--hp-surface)" }}>
                  <th
                    className="text-left px-3 py-2.5 font-semibold sticky left-0 z-10"
                    style={{
                      backgroundColor: "var(--hp-surface)",
                      borderBottom: "1px solid var(--hp-border)",
                      borderRight: "1px solid var(--hp-border)",
                      minWidth: 200,
                      color: "var(--hp-text)",
                    }}
                  >
                    Subcontractor
                  </th>
                  {visibleProjects.map(proj => (
                    <th
                      key={proj.project_id}
                      className="px-3 py-2.5 font-medium text-center"
                      style={{
                        borderBottom: "1px solid var(--hp-border)",
                        borderLeft: "1px solid var(--hp-border)",
                        color: "var(--hp-text-secondary)",
                        maxWidth: 160,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <div
                        className="flex items-center justify-between gap-1"
                        title={proj.project_name}
                      >
                        <span className="truncate">{proj.project_name}</span>
                        <button
                          title="Hide project from matrix"
                          onClick={() => void toggleHideProject(proj.project_id, false)}
                          disabled={toggling.has(`hide:${proj.project_id}`)}
                          className="shrink-0 opacity-40 hover:opacity-100 transition-opacity"
                          style={{ color: "var(--hp-text-secondary)" }}
                        >
                          <EyeOff className="h-3 w-3" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vendorRows.map((row, i) => {
                  const isConflict = row.conflictCount > 0;
                  const bg = isConflict
                    ? (i % 2 === 0 ? "#fff7f7" : "#fff0f0")
                    : (i % 2 === 0 ? "var(--hp-surface)" : "var(--hp-bg)");

                  return (
                    <tr key={row.vendorId} style={{ backgroundColor: bg }}>
                      {/* Vendor name */}
                      <td
                        className="px-3 py-2 font-medium sticky left-0 z-10"
                        style={{
                          backgroundColor: bg,
                          borderRight: "1px solid var(--hp-border)",
                          color: isConflict ? "#dc2626" : "var(--hp-text)",
                        }}
                      >
                        <div className="flex items-center gap-1.5">
                          {isConflict && <AlertTriangle className="h-3 w-3 shrink-0" style={{ color: "#dc2626" }} />}
                          {row.vendorName}
                        </div>
                      </td>

                      {/* One cell per project */}
                      {visibleProjects.map(proj => {
                        const entry = row.projects[proj.project_id];
                        const toggleKey = entry
                          ? `complete:${proj.project_id}:${entry.commitment.id}`
                          : "";

                        if (!entry) {
                          return (
                            <td
                              key={proj.project_id}
                              className="px-3 py-2 text-center"
                              style={{ borderLeft: "1px solid var(--hp-border)", color: "var(--hp-border)" }}
                            >
                              —
                            </td>
                          );
                        }

                        const { commitment: c, is_completed } = entry;
                        const isVoidTerminated = ["void", "terminated"].includes(c.status.toLowerCase());

                        return (
                          <td
                            key={proj.project_id}
                            className="px-3 py-2"
                            style={{ borderLeft: "1px solid var(--hp-border)" }}
                          >
                            <div className="flex flex-col gap-1">
                              {/* Title truncated */}
                              <span
                                className="font-medium leading-tight"
                                style={{
                                  color: isVoidTerminated || is_completed ? "#9ca3af" : "var(--hp-text)",
                                  textDecoration: isVoidTerminated || is_completed ? "line-through" : "none",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                                title={c.title}
                              >
                                {c.title}
                              </span>

                              {/* Status badge */}
                              <span
                                className="text-[10px] font-medium"
                                style={{ color: isVoidTerminated ? "#9ca3af" : statusColour(c.status) }}
                              >
                                {c.status}
                              </span>

                              {/* Dates */}
                              {(c.start_date || c.completion_date) && (
                                <span className="text-[10px]" style={{ color: "var(--hp-text-secondary)" }}>
                                  {c.start_date?.slice(0, 7) ?? "?"}
                                  {" → "}
                                  {c.completion_date?.slice(0, 7) ?? "ongoing"}
                                </span>
                              )}

                              {/* Mark complete toggle */}
                              {!isVoidTerminated && (
                                <button
                                  onClick={() => void toggleComplete(proj.project_id, c.id, is_completed)}
                                  disabled={toggling.has(toggleKey)}
                                  className="flex items-center gap-1 text-[10px] transition-opacity mt-0.5"
                                  style={{
                                    color: is_completed ? "#16a34a" : "var(--hp-text-secondary)",
                                    opacity: toggling.has(toggleKey) ? 0.5 : 1,
                                  }}
                                  title={is_completed ? "Unmark as complete" : "Mark as complete"}
                                >
                                  {is_completed
                                    ? <CheckCircle className="h-3 w-3" />
                                    : <Circle className="h-3 w-3" />
                                  }
                                  {is_completed ? "Done" : "Mark done"}
                                </button>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {vendorRows.length === 0 && visibleProjects.length > 0 && (
          <p className="text-sm italic mt-4" style={{ color: "var(--hp-text-secondary)" }}>
            No subcontract commitments found across visible projects.
          </p>
        )}

        {/* ── Hidden projects ── */}
        {hiddenProjects.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--hp-text-secondary)" }}>
              Hidden Projects
            </p>
            <div className="flex flex-wrap gap-2">
              {hiddenProjects.map(proj => (
                <button
                  key={proj.project_id}
                  onClick={() => void toggleHideProject(proj.project_id, true)}
                  disabled={toggling.has(`hide:${proj.project_id}`)}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-opacity"
                  style={{
                    backgroundColor: "var(--hp-surface)",
                    border: "1px solid var(--hp-border)",
                    color: "var(--hp-text-secondary)",
                    opacity: toggling.has(`hide:${proj.project_id}`) ? 0.5 : 1,
                  }}
                  title="Show project in matrix"
                >
                  <Eye className="h-3 w-3" />
                  {proj.project_name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
