"use client";

// ─── ResourcingTab ────────────────────────────────────────────────────────────
// Loads subcontractor commitments across all projects, classifies them by trade,
// and renders a project × trade conflict matrix.
//
// ROWS    = projects (alphabetical by short name)
// COLUMNS = trade categories (fixed order)

import { useState } from "react";
import { RefreshCw, AlertTriangle, Settings } from "lucide-react";

// ── Constants ─────────────────────────────────────────────────────────────────

const TRADES = [
  "Demolition", "Piling", "Concrete", "Waterproofing",
  "Structural Steel", "Facade", "Carpentry", "Tiling", "Painting",
  "Electrical", "Mechanical", "Plumbing", "Fire Services", "Lift",
  "Scaffolding", "Metal & Balustrades", "Consulting", "Cleaning", "Other",
] as const;

const TRADE_LABELS: Record<string, string> = {
  "Demolition":          "Demolition",
  "Piling":              "Piling",
  "Concrete":            "Concrete",
  "Waterproofing":       "Waterproofing",
  "Structural Steel":    "Structural Steel",
  "Facade":              "Facade",
  "Carpentry":           "Carpentry",
  "Tiling":              "Tiling",
  "Painting":            "Painting",
  "Electrical":          "Electrical",
  "Mechanical":          "Mechanical",
  "Plumbing":            "Plumbing",
  "Fire Services":       "Fire Services",
  "Lift":                "Lift",
  "Scaffolding":         "Scaffolding",
  "Metal & Balustrades": "Metal & Balustrades",
  "Consulting":          "Consulting",
  "Cleaning":            "Cleaning",
  "Other":               "Other",
};

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

// tradeMap[trade][project_id] = [vendor names]
type TradeMap = Record<string, Record<string, string[]>>;

// ── Helpers ───────────────────────────────────────────────────────────────────

function shortName(name: string): string {
  return name
    .replace(/\s*[-–]\s*(stage|lot|package)\s*\d+.*$/i, "")
    .replace(/\bpty\.?\s*ltd\.?\b/gi, "")
    .replace(/\bno\.\s*\d+\b/gi, "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 26);
}

function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n) + "…" : s;
}

async function classifyTrades(
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

// vendor → number of projects it appears in for a given trade
function vendorProjectCounts(trade: string, tradeMap: TradeMap): Map<string, number> {
  const counts = new Map<string, number>();
  for (const vendors of Object.values(tradeMap[trade] ?? {})) {
    for (const v of vendors) counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  return counts;
}

// Returns the max project-count for any vendor in this cell
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
  const [tradeMap, setTradeMap]             = useState<TradeMap>({});
  const [hiddenIds, setHiddenIds]           = useState<Set<string>>(new Set());
  const [manageOpen, setManageOpen]         = useState(false);
  // expandedCells: "projectId:trade" → true
  const [expandedCells, setExpandedCells]   = useState<Set<string>>(new Set());

  if (!company_id) {
    return (
      <div className="flex-1 flex items-center justify-center" style={{ color: "var(--hp-text-secondary)" }}>
        <p className="text-sm italic">Select a company to view resourcing.</p>
      </div>
    );
  }

  // All projects (for the manage panel), sorted alpha
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

  function toggleExpand(pid: string, trade: string) {
    const key = `${pid}:${trade}`;
    setExpandedCells(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }

  async function loadAll() {
    setLoading(true);
    setLoaded(false);
    setError(null);
    setTradeMap({});
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

      const classifications = await classifyTrades(allItems);

      const map: TradeMap = {};
      for (const [projectId, commitments] of Object.entries(result)) {
        for (const c of commitments) {
          const trade = classifications[c.id] ?? "Other";
          if (!map[trade]) map[trade] = {};
          if (!map[trade][projectId]) map[trade][projectId] = [];
          const vendors = map[trade][projectId];
          if (c.vendor_name && !vendors.includes(c.vendor_name)) {
            vendors.push(c.vendor_name);
          }
        }
      }

      setTradeMap(map);
      setLoaded(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  // ── Conflict counts ────────────────────────────────────────────────────────
  // redCount: vendor in 4+ projects; amberCount: vendor in exactly 3 projects
  function getConflictCounts(): { redCount: number; amberCount: number } {
    let redCount = 0; let amberCount = 0;
    for (const trade of TRADES) {
      for (const c of vendorProjectCounts(trade, tradeMap).values()) {
        if (c >= 4) redCount++;
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

  // ── Loaded — pre-compute per-trade counts ──────────────────────────────────
  const vpCountsByTrade: Record<string, Map<string, number>> = {};
  for (const trade of TRADES) {
    vpCountsByTrade[trade] = vendorProjectCounts(trade, tradeMap);
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: "var(--hp-bg)" }}>

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
          <div className="relative">
            <button
              onClick={() => setManageOpen(o => !o)}
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
                  const pid = String(proj.id);
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

      {/* ── Conflict banner (only if conflicts exist) ── */}
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
          // Wrap in position:relative so the manage-projects dropdown closes on outside click
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            style={{ width: "100%" }}
            onClick={e => {
              // Close manage panel if clicking outside it
              const t = e.target as HTMLElement;
              if (!t.closest("[data-manage-panel]")) setManageOpen(false);
            }}
          >
            <table
              className="border-collapse w-full"
              style={{ fontSize: 11 }}
            >
              {/* ── COLUMNS = trades ── */}
              <thead>
                <tr>
                  {/* Sticky project column */}
                  <th
                    className="sticky left-0 z-20 text-left"
                    style={{
                      backgroundColor: "var(--hp-surface)",
                      borderBottom: "2px solid #E5E7EB",
                      borderRight:  "1px solid #E5E7EB",
                      width: 160,
                      minWidth: 160,
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
                  {TRADES.map(trade => (
                    <th
                      key={trade}
                      style={{
                        borderBottom: "2px solid #E5E7EB",
                        borderLeft:   "1px solid #E5E7EB",
                        minWidth: 100,
                        maxWidth: 160,
                        padding: "8px 4px",
                        verticalAlign: "bottom",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: 120,
                        color: "#6B7280",
                        fontSize: 10,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        whiteSpace: "nowrap",
                      }}
                      title={trade}
                    >
                      {TRADE_LABELS[trade] ?? trade}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* ── ROWS = projects ── */}
              <tbody>
                {visibleProjects.map((proj, i) => {
                  const pid    = String(proj.id);
                  const rowBg  = i % 2 === 0 ? "#ffffff" : "#F9FAFB";

                  return (
                    <tr key={proj.id}>
                      {/* Project name — sticky left */}
                      <td
                        className="sticky left-0 z-10"
                        style={{
                          backgroundColor: rowBg,
                          borderBottom: "1px solid #E5E7EB",
                          borderRight:  "1px solid #E5E7EB",
                          padding: "6px 10px",
                          width: 160,
                          minWidth: 160,
                          maxWidth: 160,
                          verticalAlign: "top",
                        }}
                        title={proj.display_name ?? proj.name}
                      >
                        <span
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            fontWeight: 600,
                            color: "var(--hp-text)",
                            lineHeight: 1.3,
                          }}
                        >
                          {shortName(proj.display_name ?? proj.name)}
                        </span>
                      </td>

                      {/* One cell per trade */}
                      {TRADES.map(trade => {
                        const vendors  = tradeMap[trade]?.[pid] ?? [];
                        const counts   = vpCountsByTrade[trade];
                        const maxCount = vendors.length > 0 ? maxVendorCount(vendors, counts) : 1;
                        const cellKey  = `${pid}:${trade}`;
                        const expanded = expandedCells.has(cellKey);

                        // Cell colours
                        let bgColor   = rowBg;
                        let textColor = "var(--hp-text)";
                        let fontWeight: number | string = 400;
                        if (vendors.length > 0) {
                          if      (maxCount >= 4) { bgColor = "#FEE2E2"; textColor = "#991B1B"; fontWeight = 600; }
                          else if (maxCount === 3) { bgColor = "#FEF3C7"; textColor = "#92400E"; }
                          else                     { bgColor = "#ffffff"; }
                        }

                        const display  = trade === "Other"
                          ? [...vendors].sort((a, b) => a.localeCompare(b))
                          : vendors;
                        const shown    = expanded ? display : display.slice(0, 2);
                        const overflow = display.length - 2;

                        return (
                          <td
                            key={trade}
                            style={{
                              borderBottom:    "1px solid #E5E7EB",
                              borderLeft:      "1px solid #E5E7EB",
                              backgroundColor: bgColor,
                              padding:         "6px 8px",
                              verticalAlign:   "top",
                              minWidth:        100,
                              maxWidth:        160,
                            }}
                          >
                            {vendors.length > 0 && (
                              <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                {shown.map(v => {
                                  // Show amber dot for 2-project vendors (no bg change at level 2)
                                  const vCount = counts.get(v) ?? 1;
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
                                        maxWidth:     144,
                                      }}
                                      title={v}
                                    >
                                      {showDot && (
                                        <span style={{ color: "#d97706", marginRight: 3 }}>•</span>
                                      )}
                                      {truncate(v, 20)}
                                    </span>
                                  );
                                })}
                                {!expanded && overflow > 0 && (
                                  <button
                                    onClick={() => toggleExpand(pid, trade)}
                                    style={{
                                      background:  "none",
                                      border:      "none",
                                      padding:     0,
                                      cursor:      "pointer",
                                      color:       "#6B7280",
                                      fontStyle:   "italic",
                                      fontSize:    10,
                                      textAlign:   "left",
                                    }}
                                  >
                                    +{overflow} more
                                  </button>
                                )}
                                {expanded && display.length > 2 && (
                                  <button
                                    onClick={() => toggleExpand(pid, trade)}
                                    style={{
                                      background:  "none",
                                      border:      "none",
                                      padding:     0,
                                      cursor:      "pointer",
                                      color:       "#6B7280",
                                      fontStyle:   "italic",
                                      fontSize:    10,
                                      textAlign:   "left",
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
          </div>
        )}
      </div>
    </div>
  );
}
