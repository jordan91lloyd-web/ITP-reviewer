"use client";

// ─── ResourcingTab ────────────────────────────────────────────────────────────
// Loads subcontractor commitments across all projects, classifies them by
// construction programme stage, and renders a project × stage matrix with:
//   - Programme position indicator (current stage per row)
//   - Past / present / future cell shading
//   - Conflict colouring (same vendor across multiple projects)
//   - Manage Projects hide/show panel
//
// ROWS    = projects (alphabetical)
// COLUMNS = construction programme stages (fixed order)

import { useState, useEffect } from "react";
import { RefreshCw, AlertTriangle, Settings } from "lucide-react";

// ── Constants ─────────────────────────────────────────────────────────────────

const STAGES = [
  "Demolition",
  "Excavation",
  "Piling & Retention",
  "In-Ground Services",
  "Basement Construction",
  "Structure",
  "Facade & Windows",
  "Roofing",
  "Services Rough-In",
  "Partitions & Framing",
  "Sheeting",
  "Waterproofing",
  "Tiling",
  "Joinery",
  "Ceilings",
  "Painting",
  "Flooring",
  "Services Fit-Off",
  "Fixtures & Appliances",
  "External Works",
  "Testing & Commissioning",
  "Defects & Handover",
] as const;

type Stage = typeof STAGES[number];

// ── Types ─────────────────────────────────────────────────────────────────────

interface Commitment {
  id:          string;
  title:       string;
  vendor_name: string;
  status:      string;
  value:       number;
}

interface Props {
  company_id: string | number | null;
  projects:   Array<{ id: number; name: string; display_name?: string; is_hidden?: boolean }>;
}

// stageMap[stage][project_id] = [vendor names]
type StageMap = Record<string, Record<string, string[]>>;

// ── Helpers ───────────────────────────────────────────────────────────────────

function shortName(name: string): string {
  return name
    .replace(/\s*[-–]\s*(stage|lot|package)\s*\d+.*$/i, "")
    .replace(/\bpty\.?\s*ltd\.?\b/gi, "")
    .replace(/\bno\.\s*\d+\b/gi, "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 24);
}

function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n) + "…" : s;
}

async function classifyStages(
  items: Array<{ id: string; title: string }>,
): Promise<Record<string, string>> {
  if (items.length === 0) return {};
  const res = await fetch("/api/resourcing/classify", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ items }),
  });
  const data = await res.json() as { classifications?: Record<string, string> };
  return data.classifications ?? {};
}

function vendorProjectCounts(stage: string, stageMap: StageMap): Map<string, number> {
  const counts = new Map<string, number>();
  for (const vendors of Object.values(stageMap[stage] ?? {})) {
    for (const v of vendors) counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  return counts;
}

function maxVendorCount(vendors: string[], counts: Map<string, number>): number {
  let max = 1;
  for (const v of vendors) {
    const c = counts.get(v) ?? 1;
    if (c > max) max = c;
  }
  return max;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ResourcingTab({ company_id, projects }: Props) {
  const [loading, setLoading]               = useState(false);
  const [loadingProject, setLoadingProject] = useState("");
  const [loadingIdx, setLoadingIdx]         = useState(0);
  const [loaded, setLoaded]                 = useState(false);
  const [error, setError]                   = useState<string | null>(null);
  const [stageMap, setStageMap]             = useState<StageMap>({});
  const [hiddenIds, setHiddenIds]           = useState<Set<string>>(new Set());
  const [manageOpen, setManageOpen]         = useState(false);
  const [expandedCells, setExpandedCells]   = useState<Set<string>>(new Set());
  // offsets[project_id] = current stage name
  const [offsets, setOffsets]               = useState<Record<string, string>>({});
  const [savingOffset, setSavingOffset]     = useState<string | null>(null);

  // ── Load saved offsets on mount ────────────────────────────────────────────
  useEffect(() => {
    if (!company_id) return;
    fetch(`/api/resourcing/project-offsets?company_id=${company_id}`)
      .then(r => r.ok ? r.json() : {})
      .then((data: Record<string, string>) => setOffsets(data))
      .catch(() => {});
  }, [company_id]);

  if (!company_id) {
    return (
      <div className="flex-1 flex items-center justify-center" style={{ color: "var(--hp-text-secondary)" }}>
        <p className="text-sm italic">Select a company to view resourcing.</p>
      </div>
    );
  }

  const allProjects = projects
    .slice()
    .sort((a, b) =>
      shortName(a.display_name ?? a.name).localeCompare(shortName(b.display_name ?? b.name)),
    );

  const visibleProjects = allProjects.filter(p => !hiddenIds.has(String(p.id)));

  function toggleHide(id: string) {
    setHiddenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleExpand(pid: string, stage: string) {
    const key = `${pid}:${stage}`;
    setExpandedCells(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }

  async function saveOffset(projectId: string, stage: string) {
    setSavingOffset(projectId);
    setOffsets(prev => ({ ...prev, [projectId]: stage }));
    try {
      await fetch("/api/resourcing/project-offset", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          company_id:    String(company_id),
          project_id:    projectId,
          current_stage: stage,
        }),
      });
    } catch { /* silent — local state already updated */ }
    finally { setSavingOffset(null); }
  }

  async function loadAll() {
    setLoading(true);
    setLoaded(false);
    setError(null);
    setStageMap({});
    setExpandedCells(new Set());

    const result: Record<string, Commitment[]> = {};

    try {
      for (let i = 0; i < visibleProjects.length; i++) {
        const project = visibleProjects[i];
        setLoadingProject(project.display_name ?? project.name);
        setLoadingIdx(i + 1);

        try {
          const res = await fetch(
            `/api/resourcing/commitments?company_id=${company_id}&project_id=${project.id}`,
          );
          if (res.ok) {
            const data = await res.json() as { commitments?: Commitment[] };
            result[String(project.id)] = data.commitments ?? [];
          } else {
            result[String(project.id)] = [];
          }
        } catch {
          result[String(project.id)] = [];
        }

        if (i < visibleProjects.length - 1) {
          await new Promise(r => setTimeout(r, 500));
        }
      }

      const allItems = Object.values(result)
        .flat()
        .filter((c, idx, arr) => arr.findIndex(x => x.id === c.id) === idx)
        .map(c => ({ id: c.id, title: c.title }));

      const classifications = await classifyStages(allItems);

      const map: StageMap = {};
      for (const [projectId, commitments] of Object.entries(result)) {
        for (const c of commitments) {
          const stage = classifications[c.id] ?? "Other";
          if (!map[stage]) map[stage] = {};
          if (!map[stage][projectId]) map[stage][projectId] = [];
          const vendors = map[stage][projectId];
          if (c.vendor_name && !vendors.includes(c.vendor_name)) {
            vendors.push(c.vendor_name);
          }
        }
      }

      setStageMap(map);
      setLoaded(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  // ── Conflict counts ────────────────────────────────────────────────────────
  function getConflictCounts(): { redCount: number; amberCount: number } {
    let redCount = 0; let amberCount = 0;
    for (const stage of STAGES) {
      for (const c of vendorProjectCounts(stage, stageMap).values()) {
        if      (c >= 4) redCount++;
        else if (c === 3) amberCount++;
      }
    }
    return { redCount, amberCount };
  }

  const { redCount, amberCount } = loaded ? getConflictCounts() : { redCount: 0, amberCount: 0 };

  // ── Before load ────────────────────────────────────────────────────────────
  if (!loading && !loaded) {
    const estSecs = Math.ceil(visibleProjects.length * 0.5);
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <button
          onClick={() => void loadAll()}
          className="px-6 py-3 rounded-lg text-sm font-semibold"
          style={{ backgroundColor: "var(--hp-warm-800)", color: "#fff" }}
        >
          Load Resourcing Data
        </button>
        <p className="text-xs" style={{ color: "var(--hp-text-secondary)" }}>
          Fetches commitments across all {visibleProjects.length} projects. Takes ~{estSecs}s.
        </p>
      </div>
    );
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <RefreshCw className="h-5 w-5 animate-spin" style={{ color: "var(--hp-warm-800)" }} />
        <p className="text-sm font-medium" style={{ color: "var(--hp-text)" }}>
          Loading {loadingProject}…
        </p>
        <p className="text-xs" style={{ color: "var(--hp-text-secondary)" }}>
          {loadingIdx} of {visibleProjects.length}
        </p>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <p className="text-sm" style={{ color: "#dc2626" }}>{error}</p>
        <button
          onClick={() => void loadAll()}
          className="text-xs px-3 py-1.5 rounded"
          style={{ backgroundColor: "var(--hp-warm-100)", color: "var(--hp-warm-800)" }}
        >
          Retry
        </button>
      </div>
    );
  }

  // ── Loaded — pre-compute per-stage counts ──────────────────────────────────
  const vpCountsByStage: Record<string, Map<string, number>> = {};
  for (const stage of STAGES) {
    vpCountsByStage[stage] = vendorProjectCounts(stage, stageMap);
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      className="flex-1 flex flex-col overflow-hidden"
      style={{ backgroundColor: "var(--hp-bg)" }}
      onClick={e => {
        if (!(e.target as HTMLElement).closest("[data-manage-panel]")) {
          setManageOpen(false);
        }
      }}
    >

      {/* ── Top bar ── */}
      <div
        className="shrink-0 flex items-center justify-between px-5 py-3"
        style={{ backgroundColor: "var(--hp-surface)", borderBottom: "1px solid var(--hp-border)" }}
      >
        <h2 className="text-sm font-semibold" style={{ color: "var(--hp-text)" }}>
          Subcontractor Matrix
        </h2>
        <div className="flex items-center gap-2">
          {/* Manage Projects */}
          <div className="relative" data-manage-panel>
            <button
              onClick={e => { e.stopPropagation(); setManageOpen(o => !o); }}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded"
              style={{
                backgroundColor: manageOpen ? "var(--hp-warm-100)" : "transparent",
                border: "1px solid var(--hp-border)",
                color: "var(--hp-text-secondary)",
              }}
            >
              <Settings className="h-3 w-3" />
              Manage Projects
            </button>
            {manageOpen && (
              <div
                className="absolute right-0 top-full mt-1 z-50 rounded-lg shadow-lg overflow-y-auto"
                style={{
                  backgroundColor: "var(--hp-surface)",
                  border: "1px solid var(--hp-border)",
                  minWidth: 220,
                  maxHeight: 320,
                }}
              >
                <div className="px-3 py-2" style={{ borderBottom: "1px solid var(--hp-border)" }}>
                  <p className="text-xs font-semibold" style={{ color: "var(--hp-text)" }}>Show / hide projects</p>
                </div>
                {allProjects.map(proj => {
                  const pid    = String(proj.id);
                  const hidden = hiddenIds.has(pid);
                  return (
                    <label
                      key={pid}
                      className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-black/5"
                      style={{ fontSize: 12 }}
                    >
                      <input
                        type="checkbox"
                        checked={!hidden}
                        onChange={() => toggleHide(pid)}
                        className="rounded"
                      />
                      <span style={{ color: hidden ? "var(--hp-text-secondary)" : "var(--hp-text)" }}>
                        {shortName(proj.display_name ?? proj.name)}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          <button
            onClick={() => void loadAll()}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded"
            style={{ backgroundColor: "var(--hp-warm-100)", color: "var(--hp-warm-800)" }}
          >
            <RefreshCw className="h-3 w-3" />
            Refresh
          </button>
        </div>
      </div>

      {/* ── Conflict banner ── */}
      {(redCount > 0 || amberCount > 0) && (
        <div
          className="shrink-0 flex items-center gap-3 px-5 py-2"
          style={{ backgroundColor: "#fffbeb", borderBottom: "1px solid #fde68a" }}
        >
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" style={{ color: "#d97706" }} />
          <div className="flex items-center gap-3 text-xs">
            {redCount > 0 && (
              <span style={{ color: "#991b1b", fontWeight: 600 }}>
                {redCount} conflict{redCount > 1 ? "s" : ""} — same contractor across 4+ projects
              </span>
            )}
            {redCount > 0 && amberCount > 0 && (
              <span style={{ color: "#6b7280" }}>·</span>
            )}
            {amberCount > 0 && (
              <span style={{ color: "#92400e" }}>
                {amberCount} watch — same contractor across 3 projects
              </span>
            )}
          </div>
        </div>
      )}

      {/* ── Table ── */}
      <div className="flex-1 overflow-auto">
        {visibleProjects.length === 0 ? (
          <p className="text-sm italic px-5 py-4" style={{ color: "var(--hp-text-secondary)" }}>
            No projects visible. Use Manage Projects to show projects.
          </p>
        ) : (
          <table className="border-collapse" style={{ fontSize: 11, width: "max-content", minWidth: "100%" }}>

            {/* ── THEAD: stage column headers (rotated) ── */}
            <thead>
              <tr>
                {/* Sticky project + stage-selector column */}
                <th
                  className="sticky left-0 z-20 text-left"
                  style={{
                    backgroundColor: "var(--hp-surface)",
                    borderBottom: "2px solid #E5E7EB",
                    borderRight:  "1px solid #E5E7EB",
                    width: 200,
                    minWidth: 200,
                    padding: "8px 10px",
                    verticalAlign: "bottom",
                    color: "#6B7280",
                    fontSize: 10,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Project
                </th>
                {STAGES.map(stage => (
                  <th
                    key={stage}
                    style={{
                      borderBottom: "2px solid #E5E7EB",
                      borderLeft:   "1px solid #E5E7EB",
                      minWidth: 90,
                      maxWidth: 130,
                      padding: "8px 4px",
                      verticalAlign: "bottom",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: 130,
                      color: "#6B7280",
                      fontSize: 10,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      whiteSpace: "nowrap",
                    }}
                    title={stage}
                  >
                    {stage}
                  </th>
                ))}
              </tr>
            </thead>

            {/* ── TBODY: one row per project ── */}
            <tbody>
              {visibleProjects.map((proj, rowIdx) => {
                const pid          = String(proj.id);
                const rowBg        = rowIdx % 2 === 0 ? "#ffffff" : "#F9FAFB";
                const currentStage = offsets[pid] ?? "";
                const currentIdx   = currentStage ? STAGES.indexOf(currentStage as Stage) : -1;

                return (
                  <tr key={proj.id}>
                    {/* ── Project name + stage selector (sticky left) ── */}
                    <td
                      className="sticky left-0 z-10"
                      style={{
                        backgroundColor: rowBg,
                        borderBottom: "1px solid #E5E7EB",
                        borderRight:  "1px solid #E5E7EB",
                        padding: "6px 8px",
                        width: 200,
                        minWidth: 200,
                        maxWidth: 200,
                        verticalAlign: "top",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 600,
                          color: "var(--hp-text)",
                          lineHeight: 1.3,
                          marginBottom: 4,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        title={proj.display_name ?? proj.name}
                      >
                        {shortName(proj.display_name ?? proj.name)}
                      </div>
                      {/* Stage selector */}
                      <select
                        value={currentStage}
                        onChange={e => void saveOffset(pid, e.target.value)}
                        disabled={savingOffset === pid}
                        style={{
                          fontSize: 10,
                          padding: "2px 4px",
                          borderRadius: 4,
                          border: "1px solid #D1D5DB",
                          backgroundColor: "#fff",
                          color: currentStage ? "#374151" : "#9CA3AF",
                          width: "100%",
                          cursor: "pointer",
                          opacity: savingOffset === pid ? 0.5 : 1,
                        }}
                      >
                        <option value="">Set current stage…</option>
                        {STAGES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>

                    {/* ── One cell per stage ── */}
                    {STAGES.map((stage, stageIdx) => {
                      const vendors   = stageMap[stage]?.[pid] ?? [];
                      const counts    = vpCountsByStage[stage];
                      const maxCount  = vendors.length > 0 ? maxVendorCount(vendors, counts) : 1;
                      const cellKey   = `${pid}:${stage}`;
                      const expanded  = expandedCells.has(cellKey);

                      // Programme position relative to current stage
                      const isCurrent = currentIdx >= 0 && stageIdx === currentIdx;
                      const isPast    = currentIdx >= 0 && stageIdx < currentIdx;
                      // (isFuture = currentIdx >= 0 && stageIdx > currentIdx, or no stage set)

                      // Conflict colour takes priority over past/future shading
                      let bgColor   = isPast ? "#F3F4F6" : "#ffffff";
                      let textColor = isPast ? "#9CA3AF" : "var(--hp-text)";
                      let fontWeight: number | string = isPast ? 400 : 400;

                      if (vendors.length > 0) {
                        if      (maxCount >= 4) { bgColor = "#FEE2E2"; textColor = "#991B1B"; fontWeight = 600; }
                        else if (maxCount === 3) { bgColor = "#FEF3C7"; textColor = "#92400E"; }
                        else if (maxCount === 1 && isPast) { bgColor = "#F3F4F6"; textColor = "#9CA3AF"; }
                        else    { bgColor = "#ffffff"; }
                      }

                      const display  = [...vendors].sort((a, b) => a.localeCompare(b));
                      const shown    = expanded ? display : display.slice(0, 2);
                      const overflow = display.length - 2;

                      return (
                        <td
                          key={stage}
                          style={{
                            borderBottom: "1px solid #E5E7EB",
                            borderLeft:   isCurrent
                              ? "3px solid #EF4444"
                              : "1px solid #E5E7EB",
                            backgroundColor: bgColor,
                            padding:         "6px 8px",
                            verticalAlign:   "top",
                            minWidth: 90,
                            maxWidth: 130,
                            position: "relative",
                          }}
                        >
                          {/* Red today indicator */}
                          {isCurrent && (
                            <div
                              style={{
                                position:   "absolute",
                                top:        0,
                                left:       "50%",
                                transform:  "translateX(-50%)",
                                color:      "#EF4444",
                                fontSize:   8,
                                lineHeight: 1,
                                userSelect: "none",
                              }}
                            >
                              ▼
                            </div>
                          )}

                          {vendors.length > 0 && (
                            <div style={{ display: "flex", flexDirection: "column", gap: 1, marginTop: isCurrent ? 8 : 0 }}>
                              {shown.map(v => {
                                const vCount  = counts.get(v) ?? 1;
                                const showDot = vCount === 2;
                                return (
                                  <span
                                    key={v}
                                    style={{
                                      display:      "block",
                                      lineHeight:   1.35,
                                      color:        textColor,
                                      fontWeight,
                                      overflow:     "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace:   "nowrap",
                                      maxWidth:     118,
                                    }}
                                    title={v}
                                  >
                                    {showDot && (
                                      <span style={{ color: "#d97706", marginRight: 2 }}>•</span>
                                    )}
                                    {truncate(v, 20)}
                                  </span>
                                );
                              })}
                              {!expanded && overflow > 0 && (
                                <button
                                  onClick={() => toggleExpand(pid, stage)}
                                  style={{
                                    background: "none", border: "none", padding: 0,
                                    cursor: "pointer", color: "#6B7280",
                                    fontStyle: "italic", fontSize: 10, textAlign: "left",
                                  }}
                                >
                                  +{overflow} more
                                </button>
                              )}
                              {expanded && display.length > 2 && (
                                <button
                                  onClick={() => toggleExpand(pid, stage)}
                                  style={{
                                    background: "none", border: "none", padding: 0,
                                    cursor: "pointer", color: "#6B7280",
                                    fontStyle: "italic", fontSize: 10, textAlign: "left",
                                  }}
                                >
                                  show less
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
