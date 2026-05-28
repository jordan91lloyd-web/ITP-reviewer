"use client";

// ─── ResourcingTab ────────────────────────────────────────────────────────────
// Loads subcontractor commitments across all projects, classifies them by trade,
// and renders a project × trade conflict matrix.
//
// ROWS    = projects (alphabetical by short name)
// COLUMNS = trade categories (fixed order)

import { useState } from "react";
import { RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";

// ── Constants ─────────────────────────────────────────────────────────────────

const TRADES = [
  "Demolition", "Piling", "Concrete", "Waterproofing",
  "Structural Steel", "Facade", "Carpentry", "Tiling", "Painting",
  "Electrical", "Mechanical", "Plumbing", "Fire Services", "Lift",
  "Scaffolding", "Metal & Balustrades", "Consulting", "Cleaning", "Other",
] as const;

// Short column header labels matching TRADES order
const TRADE_LABELS: Record<string, string> = {
  "Demolition":        "Demo",
  "Piling":            "Piling",
  "Concrete":          "Concrete",
  "Waterproofing":     "Waterproof",
  "Structural Steel":  "Steel",
  "Facade":            "Facade",
  "Carpentry":         "Carpentry",
  "Tiling":            "Tiling",
  "Painting":          "Painting",
  "Electrical":        "Electrical",
  "Mechanical":        "Mechanical",
  "Plumbing":          "Plumbing",
  "Fire Services":     "Fire",
  "Lift":              "Lift",
  "Scaffolding":       "Scaffold",
  "Metal & Balustrades": "Metal",
  "Consulting":        "Consulting",
  "Cleaning":          "Cleaning",
  "Other":             "Other",
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

// For a given trade column, build a map of vendor → number of projects it appears in
function vendorProjectCounts(trade: string, tradeMap: TradeMap): Map<string, number> {
  const counts = new Map<string, number>();
  const byProject = tradeMap[trade] ?? {};
  for (const vendors of Object.values(byProject)) {
    for (const v of vendors) {
      counts.set(v, (counts.get(v) ?? 0) + 1);
    }
  }
  return counts;
}

function cellBg(vendors: string[], vpCounts: Map<string, number>): string {
  if (vendors.length === 0) return "transparent";
  let max = 1;
  for (const v of vendors) {
    const c = vpCounts.get(v) ?? 1;
    if (c > max) max = c;
  }
  if (max >= 3) return "#FEE2E2";
  if (max >= 2) return "#FEF3C7";
  return "#ffffff";
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

  const visibleProjects = projects
    .filter(p => !p.is_hidden)
    .slice()
    .sort((a, b) =>
      shortName(a.display_name ?? a.name)
        .localeCompare(shortName(b.display_name ?? b.name)),
    );

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

      // Deduplicate items by id before classifying
      const allItems = Object.values(result)
        .flat()
        .filter((c, idx, arr) => arr.findIndex(x => x.id === c.id) === idx)
        .map(c => ({ id: c.id, title: c.title }));

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

  // ── Conflict detection (vendor in 3+ projects in same trade) ───────────────
  function getConflicts(): number {
    let count = 0;
    for (const trade of TRADES) {
      const vpCounts = vendorProjectCounts(trade, tradeMap);
      for (const c of vpCounts.values()) {
        if (c >= 3) count++;
      }
    }
    return count;
  }

  // Trades that have at least one vendor across any project
  const activeTrades = TRADES.filter(trade => {
    const byProject = tradeMap[trade];
    if (!byProject) return false;
    return Object.values(byProject).some(v => v.length > 0);
  });

  const conflictCount = loaded ? getConflicts() : 0;

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

  // ── Loaded ─────────────────────────────────────────────────────────────────

  // Pre-compute vendor-project counts per active trade (for cell colouring)
  const vpCountsByTrade = new Map<string, Map<string, number>>();
  for (const trade of activeTrades) {
    vpCountsByTrade.set(trade, vendorProjectCounts(trade, tradeMap));
  }

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
        {conflictCount > 0 ? (
          <div
            className="mb-4 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm"
            style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#7f1d1d" }}
          >
            <AlertTriangle className="h-4 w-4 shrink-0" style={{ color: "#dc2626" }} />
            <span>
              <strong>{conflictCount} conflict{conflictCount > 1 ? "s" : ""}</strong>
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

        {/* Matrix: ROWS = projects, COLUMNS = trades */}
        {activeTrades.length === 0 ? (
          <p className="text-sm italic" style={{ color: "var(--hp-text-secondary)" }}>
            No commitments found across projects.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg" style={{ border: "1px solid var(--hp-border)" }}>
            <table
              className="border-collapse"
              style={{ minWidth: activeTrades.length * 110 + 180, fontSize: 11 }}
            >
              <thead>
                <tr style={{ backgroundColor: "var(--hp-surface)" }}>
                  {/* Project column header (sticky) */}
                  <th
                    className="text-left px-3 py-2 font-semibold sticky left-0 z-10"
                    style={{
                      backgroundColor: "var(--hp-surface)",
                      borderBottom: "1px solid var(--hp-border)",
                      borderRight:  "1px solid var(--hp-border)",
                      width: 180,
                      minWidth: 180,
                      color: "var(--hp-text)",
                    }}
                  >
                    Project
                  </th>
                  {/* One column per active trade */}
                  {activeTrades.map(trade => (
                    <th
                      key={trade}
                      className="px-2 py-2 font-medium text-center"
                      style={{
                        borderBottom: "1px solid var(--hp-border)",
                        borderLeft:   "1px solid var(--hp-border)",
                        color: "var(--hp-text-secondary)",
                        minWidth: 110,
                        whiteSpace: "nowrap",
                      }}
                      title={trade}
                    >
                      {TRADE_LABELS[trade] ?? trade}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleProjects.map((proj, i) => {
                  const pid = String(proj.id);
                  const rowBg = i % 2 === 0 ? "var(--hp-surface)" : "var(--hp-bg)";
                  return (
                    <tr key={proj.id}>
                      {/* Project name (sticky) */}
                      <td
                        className="px-3 py-1.5 font-medium sticky left-0 z-10"
                        style={{
                          backgroundColor: rowBg,
                          borderRight: "1px solid var(--hp-border)",
                          color: "var(--hp-text)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: 180,
                        }}
                        title={proj.display_name ?? proj.name}
                      >
                        {shortName(proj.display_name ?? proj.name)}
                      </td>
                      {/* One cell per active trade */}
                      {activeTrades.map(trade => {
                        const vendors = tradeMap[trade]?.[pid] ?? [];
                        const vpCounts = vpCountsByTrade.get(trade)!;
                        const bg = cellBg(vendors, vpCounts);

                        // "Other" column: sort alpha, cap at 3 + "+N more"
                        const displayVendors = trade === "Other"
                          ? [...vendors].sort((a, b) => a.localeCompare(b))
                          : vendors;
                        const capped   = displayVendors.slice(0, 3);
                        const overflow = displayVendors.length - 3;

                        return (
                          <td
                            key={trade}
                            className="px-2 py-1.5"
                            style={{
                              borderLeft: "1px solid var(--hp-border)",
                              backgroundColor: vendors.length > 0 ? bg : rowBg,
                              verticalAlign: "top",
                            }}
                          >
                            {vendors.length > 0 && (
                              <div className="flex flex-col gap-px">
                                {capped.map(v => (
                                  <span
                                    key={v}
                                    className="block leading-tight"
                                    style={{
                                      color: "var(--hp-text)",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                      maxWidth: 104,
                                    }}
                                    title={v}
                                  >
                                    {v}
                                  </span>
                                ))}
                                {overflow > 0 && (
                                  <span style={{ color: "var(--hp-text-secondary)", fontStyle: "italic" }}>
                                    +{overflow} more
                                  </span>
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
