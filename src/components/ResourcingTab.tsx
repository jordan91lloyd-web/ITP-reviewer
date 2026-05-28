"use client";

// ─── ResourcingTab ────────────────────────────────────────────────────────────
// Loads subcontractor commitments across all projects, classifies them into
// trade categories via Claude, and renders a conflict matrix.

import { useState } from "react";
import { RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";

// ── Constants ─────────────────────────────────────────────────────────────────

const TRADES = [
  "Demolition", "Excavation", "Piling", "Concrete", "Waterproofing",
  "Structural Steel", "Facade", "Carpentry", "Tiling", "Painting",
  "Electrical", "Mechanical", "Plumbing", "Fire Services", "Lift",
  "Landscaping", "Consulting", "Other",
];

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
  projects:   Array<{ id: number; name: string; display_name?: string }>;
}

// tradeMap[trade][project_id] = [vendor names]
type TradeMap = Record<string, Record<string, string[]>>;

// ── Helpers ───────────────────────────────────────────────────────────────────

function shortName(name: string): string {
  // Keep first meaningful word(s) — strip common suffixes and legal entities
  return name
    .replace(/\s*[-–]\s*(stage|lot|package)\s*\d+.*$/i, "")
    .replace(/\bpty\.?\s*ltd\.?\b/gi, "")
    .replace(/\bno\.\s*\d+\b/gi, "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 28);
}

async function classifyTrades(
  items: Array<{ id: string; title: string; vendor: string }>,
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

// ── Component ─────────────────────────────────────────────────────────────────

export default function ResourcingTab({ company_id, projects }: Props) {
  const [loading, setLoading]               = useState(false);
  const [loadingProject, setLoadingProject] = useState("");
  const [loadingIdx, setLoadingIdx]         = useState(0);
  const [loaded, setLoaded]                 = useState(false);
  const [error, setError]                   = useState<string | null>(null);
  const [tradeMap, setTradeMap]             = useState<TradeMap>({});

  if (!company_id) {
    return (
      <div className="flex-1 flex items-center justify-center" style={{ color: "var(--hp-text-secondary)" }}>
        <p className="text-sm italic">Select a company to view resourcing.</p>
      </div>
    );
  }

  const visibleProjects = projects.filter(p => !("is_hidden" in p && (p as { is_hidden?: boolean }).is_hidden));

  async function loadAll() {
    setLoading(true);
    setLoaded(false);
    setError(null);
    setTradeMap({});

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

      // Batch classify all unique titles
      const allItems = Object.values(result)
        .flat()
        .filter((c, idx, arr) => arr.findIndex(x => x.id === c.id) === idx)
        .map(c => ({ id: c.id, title: c.title, vendor: c.vendor_name }));

      const classifications = await classifyTrades(allItems);

      // Build tradeMap[trade][project_id] = [vendor names]
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

  // ── Conflict detection ─────────────────────────────────────────────────────
  // For each trade, count how many projects each vendor appears in.
  // conflict: same vendor in 3+ projects within same trade.
  function getConflicts(): { trade: string; vendor: string; count: number }[] {
    const conflicts: { trade: string; vendor: string; count: number }[] = [];
    for (const [trade, byProject] of Object.entries(tradeMap)) {
      const vendorProjectCount = new Map<string, number>();
      for (const vendors of Object.values(byProject)) {
        for (const v of vendors) {
          vendorProjectCount.set(v, (vendorProjectCount.get(v) ?? 0) + 1);
        }
      }
      for (const [vendor, count] of vendorProjectCount.entries()) {
        if (count >= 3) conflicts.push({ trade, vendor, count });
      }
    }
    return conflicts;
  }

  // Cell background based on how many projects this vendor appears in across the trade
  function cellBg(trade: string, vendors: string[]): string {
    if (vendors.length === 0) return "transparent";
    const byProject = tradeMap[trade] ?? {};
    let maxCount = 1;
    for (const v of vendors) {
      let count = 0;
      for (const projectVendors of Object.values(byProject)) {
        if (projectVendors.includes(v)) count++;
      }
      if (count > maxCount) maxCount = count;
    }
    if (maxCount >= 3) return "#FEE2E2";
    if (maxCount >= 2) return "#FEF3C7";
    return "#ffffff";
  }

  // Trades that have at least one commitment
  const activeTrades = TRADES.filter(trade => {
    const byProject = tradeMap[trade];
    if (!byProject) return false;
    return Object.values(byProject).some(v => v.length > 0);
  });

  const conflicts = loaded ? getConflicts() : [];

  // ── Before load ────────────────────────────────────────────────────────────
  if (!loading && !loaded) {
    const estSecs = Math.ceil(visibleProjects.length * 0.5);
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <button
          onClick={() => void loadAll()}
          className="px-6 py-3 rounded-lg text-sm font-semibold transition-opacity"
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

  // ── Loaded ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: "var(--hp-bg)" }}>

      {/* Header */}
      <div
        className="shrink-0 flex items-center justify-between px-5 py-3"
        style={{ backgroundColor: "var(--hp-surface)", borderBottom: "1px solid var(--hp-border)" }}
      >
        <h2 className="text-sm font-semibold" style={{ color: "var(--hp-text)" }}>
          Subcontractor Matrix
        </h2>
        <button
          onClick={() => void loadAll()}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded"
          style={{ backgroundColor: "var(--hp-warm-100)", color: "var(--hp-warm-800)" }}
        >
          <RefreshCw className="h-3 w-3" />
          Refresh
        </button>
      </div>

      <div className="flex-1 overflow-auto px-5 py-4">

        {/* Conflict banner */}
        {conflicts.length > 0 ? (
          <div
            className="mb-4 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm"
            style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#7f1d1d" }}
          >
            <AlertTriangle className="h-4 w-4 shrink-0" style={{ color: "#dc2626" }} />
            <span>
              <strong>{conflicts.length} conflict{conflicts.length > 1 ? "s" : ""}</strong>
              {" — "}same contractor active across 3+ projects in the same trade
            </span>
          </div>
        ) : (
          <div
            className="mb-4 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm"
            style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#14532d" }}
          >
            <CheckCircle className="h-4 w-4 shrink-0" style={{ color: "#16a34a" }} />
            <span>No conflicts detected</span>
          </div>
        )}

        {/* Matrix */}
        {activeTrades.length === 0 ? (
          <p className="text-sm italic" style={{ color: "var(--hp-text-secondary)" }}>
            No commitments found across projects.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg" style={{ border: "1px solid var(--hp-border)" }}>
            <table className="text-xs border-collapse" style={{ minWidth: 400 }}>
              <thead>
                <tr style={{ backgroundColor: "var(--hp-surface)" }}>
                  {/* Trade column */}
                  <th
                    className="text-left px-3 py-2.5 font-semibold sticky left-0 z-10"
                    style={{
                      backgroundColor: "var(--hp-surface)",
                      borderBottom: "1px solid var(--hp-border)",
                      borderRight:  "1px solid var(--hp-border)",
                      minWidth: 130,
                      color: "var(--hp-text)",
                    }}
                  >
                    Trade
                  </th>
                  {/* One column per project */}
                  {visibleProjects.map(proj => (
                    <th
                      key={proj.id}
                      className="px-3 py-2.5 font-medium text-left"
                      style={{
                        borderBottom: "1px solid var(--hp-border)",
                        borderLeft:   "1px solid var(--hp-border)",
                        color: "var(--hp-text-secondary)",
                        minWidth: 140,
                        maxWidth: 180,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      title={proj.display_name ?? proj.name}
                    >
                      {shortName(proj.display_name ?? proj.name)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeTrades.map((trade, i) => (
                  <tr key={trade} style={{ backgroundColor: i % 2 === 0 ? "var(--hp-surface)" : "var(--hp-bg)" }}>
                    {/* Trade label */}
                    <td
                      className="px-3 py-2 font-medium sticky left-0 z-10"
                      style={{
                        backgroundColor: i % 2 === 0 ? "var(--hp-surface)" : "var(--hp-bg)",
                        borderRight: "1px solid var(--hp-border)",
                        color: "var(--hp-text)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {trade}
                    </td>
                    {/* Cells */}
                    {visibleProjects.map(proj => {
                      const pid = String(proj.id);
                      const vendors = tradeMap[trade]?.[pid] ?? [];
                      const bg = cellBg(trade, vendors);
                      return (
                        <td
                          key={proj.id}
                          className="px-3 py-2"
                          style={{
                            borderLeft: "1px solid var(--hp-border)",
                            backgroundColor: bg,
                            verticalAlign: "top",
                          }}
                        >
                          {vendors.length === 0 ? null : (
                            <div className="flex flex-col gap-0.5">
                              {vendors.map(v => (
                                <span
                                  key={v}
                                  className="block leading-tight"
                                  style={{
                                    color: "var(--hp-text)",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    maxWidth: 160,
                                  }}
                                  title={v}
                                >
                                  {v}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
