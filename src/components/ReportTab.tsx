"use client";

// ─── ReportTab ─────────────────────────────────────────────────────────────────
// Cross-project ITP Status Report. Fetches live Procore inspection data per
// project plus Supabase score/snapshot data, then renders:
//   • A summary table (all projects, one row each)
//   • Per-project detail blocks (bands, AI stage, missing ITPs)
// Window toggle (7d / 30d) recomputes created/closed-in-window figures.

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import type { ProjectReportRow, BandCounts, MissingItpItem } from "@/app/api/dashboard/report/route";
import { getBandPillClasses, getBandLabel } from "@/lib/scoreBand";

// ── Types ──────────────────────────────────────────────────────────────────────

type Window = 7 | 30;

interface ReportResponse {
  projects:        ProjectReportRow[];
  window_7_start:  string;
  window_30_start: string;
  error?:          string;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function fmtAge(iso: string | null | undefined): string {
  if (!iso) return "no snapshot";
  const diffMs   = Date.now() - new Date(iso).getTime();
  const diffHrs  = diffMs / 3_600_000;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffHrs < 1)    return "< 1 hour ago";
  if (diffDays === 0) return `${Math.floor(diffHrs)}h ago`;
  if (diffDays === 1) return "yesterday";
  return `${diffDays} days ago`;
}

function fmtDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" });
}

function scoreColor(score: number | null): string {
  if (score === null) return "var(--hp-text-muted)";
  if (score >= 85) return "var(--hp-compliant)";
  if (score >= 70) return "var(--hp-minor)";
  if (score >= 50) return "var(--hp-significant)";
  return "var(--hp-critical)";
}

function BandPip({ band, count }: { band: string; count: number }) {
  if (count === 0) return null;
  const cls = getBandPillClasses(band);
  const label = getBandLabel(band);
  return (
    <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold ${cls}`}>
      {count} {label}
    </span>
  );
}

function BandBar({ bands }: { bands: BandCounts }) {
  const total = bands.compliant + bands.minor_gaps + bands.significant_gaps + bands.critical_risk + bands.not_reviewed;
  if (total === 0) return <span style={{ color: "var(--hp-text-muted)", fontSize: 11 }}>No reviews</span>;
  return (
    <div className="flex flex-wrap gap-1">
      <BandPip band="compliant"        count={bands.compliant} />
      <BandPip band="minor_gaps"       count={bands.minor_gaps} />
      <BandPip band="significant_gaps" count={bands.significant_gaps} />
      <BandPip band="critical_risk"    count={bands.critical_risk} />
      {bands.not_reviewed > 0 && (
        <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold bg-gray-50 text-gray-500 border border-gray-200">
          {bands.not_reviewed} Not reviewed
        </span>
      )}
    </div>
  );
}

function CountCell({ value, error }: { value: number | null; error: string | null }) {
  if (error) return <span style={{ color: "var(--hp-text-muted)", fontSize: 12 }}>—</span>;
  return <span style={{ fontWeight: 600 }}>{value ?? 0}</span>;
}

// ── Detail block ───────────────────────────────────────────────────────────────

function ProjectDetail({
  row,
  window,
}: {
  row:    ProjectReportRow;
  window: Window;
}) {
  const [open, setOpen] = useState(false);

  const createdInWindow = window === 7 ? row.created_7d : row.created_30d;
  const closedInWindow  = window === 7 ? row.closed_7d  : row.closed_30d;

  return (
    <div
      style={{
        border: "1px solid var(--hp-border)",
        borderRadius: 10,
        backgroundColor: "var(--hp-surface)",
        overflow: "hidden",
      }}
    >
      {/* Header — always visible */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full text-left"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <span style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
          {row.project_number && (
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--hp-text-muted)", minWidth: 36 }}>
              #{row.project_number}
            </span>
          )}
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--hp-text-primary)" }}>
            {row.display_name || row.name}
          </span>
          {row.procore_error && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-600">
              <AlertTriangle className="h-3 w-3" /> Data unavailable
            </span>
          )}
        </span>

        {/* Mini stats always visible */}
        <span style={{ display: "flex", alignItems: "center", gap: 12, marginRight: 8 }}>
          <span style={{ fontSize: 12, color: "var(--hp-text-secondary)" }}>
            <span style={{ fontWeight: 600, color: "var(--hp-text-primary)" }}>{row.closed_count ?? "—"}</span> closed
            {" / "}
            <span style={{ fontWeight: 600, color: "var(--hp-text-primary)" }}>{row.open_count ?? "—"}</span> open
          </span>
          {row.avg_score !== null && (
            <span style={{ fontSize: 13, fontWeight: 700, color: scoreColor(row.avg_score) }}>
              {row.avg_score}
            </span>
          )}
        </span>

        {open ? <ChevronUp className="h-4 w-4 shrink-0 text-gray-400" /> : <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />}
      </button>

      {/* Expanded detail */}
      {open && (
        <div style={{ borderTop: "1px solid var(--hp-border)", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 14 }}>

          {row.procore_error && (
            <div style={{ padding: "8px 12px", borderRadius: 6, backgroundColor: "#fef2f2", border: "1px solid #fecaca" }}>
              <span style={{ fontSize: 12, color: "#dc2626" }}>
                <strong>Procore data unavailable:</strong> {row.procore_error}
              </span>
            </div>
          )}

          {/* Counts grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {[
              { label: "Closed",         value: row.closed_count },
              { label: "Open / In Progress", value: row.open_count },
              { label: `Created (${window}d)`, value: createdInWindow },
              { label: `Closed (${window}d)†`, value: closedInWindow },
            ].map(({ label, value }) => (
              <div key={label} style={{ padding: "10px 12px", borderRadius: 8, backgroundColor: "var(--hp-bg)", border: "1px solid var(--hp-border)", textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--hp-text-muted)", marginBottom: 4 }}>
                  {label}
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "var(--hp-text-primary)" }}>
                  {row.procore_error ? "—" : (value ?? 0)}
                </div>
              </div>
            ))}
          </div>

          {/* Score / bands */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--hp-text-muted)", marginBottom: 6 }}>
              Score distribution ({row.reviewed_count} reviewed)
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {row.avg_score !== null && (
                <span style={{ fontSize: 20, fontWeight: 700, color: scoreColor(row.avg_score), minWidth: 36 }}>
                  {row.avg_score}
                </span>
              )}
              <BandBar bands={row.band_counts} />
            </div>
          </div>

          {/* AI stage */}
          {row.ai_stage && (
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--hp-text-muted)", marginBottom: 4 }}>
                Stage{" "}
                <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
                  (snapshot {fmtAge(row.snapshot_generated_at)})
                </span>
              </div>
              <p style={{ fontSize: 13, color: "var(--hp-text-primary)", margin: 0, lineHeight: 1.5 }}>
                {row.ai_stage}
              </p>
            </div>
          )}

          {/* Missing ITPs */}
          {row.ai_missing_itps.length > 0 && (
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "#b45309", marginBottom: 6 }}>
                Missing ITPs ({row.ai_missing_itps.length})
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {row.ai_missing_itps.map((item: MissingItpItem) => (
                  <div key={item.itp} style={{ display: "flex", gap: 8, fontSize: 12, color: "var(--hp-text-secondary)" }}>
                    <span style={{ fontWeight: 600, color: "#b45309", minWidth: 56 }}>{item.itp}</span>
                    <span style={{ fontWeight: 500, color: "var(--hp-text-primary)" }}>{item.name}</span>
                    <span>— {item.reason}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coming up */}
          {row.ai_coming_up.length > 0 && (
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--hp-text-muted)", marginBottom: 6 }}>
                Coming up
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {row.ai_coming_up.map((item: MissingItpItem) => (
                  <div key={item.itp} style={{ display: "flex", gap: 8, fontSize: 12, color: "var(--hp-text-secondary)" }}>
                    <span style={{ fontWeight: 600, minWidth: 56 }}>{item.itp}</span>
                    <span style={{ fontWeight: 500, color: "var(--hp-text-primary)" }}>{item.name}</span>
                    <span>— {item.reason}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p style={{ fontSize: 10, color: "var(--hp-text-muted)", margin: 0 }}>
            † Closed-in-window counts only inspections where Procore recorded a close date. Items closed without a close date are not included.
          </p>
        </div>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function ReportTab({ companyId }: { companyId: number | null }) {
  const [window, setWindow]   = useState<Window>(30);
  const [loading, setLoading] = useState(false);
  const [data, setData]       = useState<ReportResponse | null>(null);
  const [error, setError]     = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<Date | null>(null);

  const load = useCallback(async () => {
    if (!companyId) return;
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch(`/api/dashboard/report?company_id=${companyId}`);
      const json = await res.json() as ReportResponse;
      if (!res.ok) { setError(json.error ?? "Failed to load report"); return; }
      setData(json);
      setFetchedAt(new Date());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load report");
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  // Load on mount / company change
  useEffect(() => { void load(); }, [load]);

  const rows    = data?.projects ?? [];
  const w       = window;

  // Summary totals
  const totals = rows.reduce(
    (acc, r) => ({
      open:       acc.open       + (r.open_count    ?? 0),
      closed:     acc.closed     + (r.closed_count  ?? 0),
      created_w:  acc.created_w  + ((w === 7 ? r.created_7d : r.created_30d) ?? 0),
      closed_w:   acc.closed_w   + ((w === 7 ? r.closed_7d  : r.closed_30d)  ?? 0),
      reviewed:   acc.reviewed   + r.reviewed_count,
    }),
    { open: 0, closed: 0, created_w: 0, closed_w: 0, reviewed: 0 },
  );

  // ── Empty / loading state ──────────────────────────────────────────────────
  if (!companyId) {
    return (
      <div style={{ padding: 32, color: "var(--hp-text-muted)", fontSize: 14 }}>
        Select a company to view the report.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto" style={{ backgroundColor: "var(--hp-bg)" }}>
    <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>

      {/* ── Header row ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--hp-text-primary)", margin: 0 }}>
            ITP Status Report
          </h2>
          {fetchedAt && !loading && (
            <p style={{ fontSize: 11, color: "var(--hp-text-muted)", margin: "2px 0 0" }}>
              Live data fetched {fetchedAt.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" })}
            </p>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Window toggle */}
          <div
            style={{
              display: "flex",
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid var(--hp-border)",
              backgroundColor: "var(--hp-bg)",
            }}
          >
            {([7, 30] as Window[]).map(d => (
              <button
                key={d}
                type="button"
                onClick={() => setWindow(d)}
                style={{
                  padding: "5px 14px",
                  fontSize: 12,
                  fontWeight: w === d ? 700 : 400,
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: w === d ? "var(--hp-warm-100)" : "transparent",
                  color: w === d ? "var(--hp-warm-800)" : "var(--hp-text-secondary)",
                  transition: "background 0.15s",
                }}
              >
                {d}d
              </button>
            ))}
          </div>

          {/* Refresh */}
          <button
            type="button"
            onClick={() => void load()}
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              borderRadius: 7,
              fontSize: 12,
              fontWeight: 500,
              border: "1px solid var(--hp-border)",
              backgroundColor: "var(--hp-surface)",
              color: "var(--hp-text-secondary)",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Loading…" : "Refresh"}
          </button>
        </div>
      </div>

      {/* ── Error banner ── */}
      {error && (
        <div style={{ padding: "10px 14px", borderRadius: 8, backgroundColor: "#fef2f2", border: "1px solid #fecaca", fontSize: 13, color: "#dc2626", display: "flex", alignItems: "center", gap: 8 }}>
          <AlertTriangle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* ── Loading skeleton ── */}
      {loading && !data && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ height: 48, borderRadius: 8, backgroundColor: "var(--hp-border)", opacity: 0.5, animation: "pulse 1.5s ease-in-out infinite" }} />
          ))}
          <p style={{ fontSize: 12, color: "var(--hp-text-muted)", textAlign: "center", marginTop: 8 }}>
            Fetching live Procore data for each project…
          </p>
        </div>
      )}

      {/* ── Summary table ── */}
      {!loading && rows.length > 0 && (
        <div style={{ backgroundColor: "var(--hp-surface)", borderRadius: 10, border: "1px solid var(--hp-border)", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ backgroundColor: "var(--hp-bg)" }}>
                  {[
                    ["Project",               "left",    "200px"],
                    ["Closed",                "center",  "70px"],
                    ["Open / In Progress",    "center",  "90px"],
                    [`Created (${w}d)`,       "center",  "90px"],
                    [`Closed (${w}d)†`,       "center",  "90px"],
                    ["Avg Score",             "center",  "80px"],
                    ["Bands",                 "left",    ""],
                  ].map(([label, align, w]) => (
                    <th
                      key={label as string}
                      style={{
                        padding: "9px 12px",
                        textAlign: align as "left" | "center",
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "var(--hp-text-muted)",
                        borderBottom: "1px solid var(--hp-border)",
                        whiteSpace: "nowrap",
                        minWidth: w as string || undefined,
                      }}
                    >
                      {label as string}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => {
                  const createdW = w === 7 ? row.created_7d : row.created_30d;
                  const closedW  = w === 7 ? row.closed_7d  : row.closed_30d;
                  return (
                    <tr
                      key={row.id}
                      style={{
                        backgroundColor: idx % 2 === 0 ? "var(--hp-surface)" : "var(--hp-bg)",
                        borderBottom: "1px solid var(--hp-border)",
                      }}
                    >
                      <td style={{ padding: "9px 12px" }}>
                        <div style={{ fontWeight: 600, color: "var(--hp-text-primary)", fontSize: 13 }}>
                          {row.display_name || row.name}
                        </div>
                        {row.project_number && (
                          <div style={{ fontSize: 10, color: "var(--hp-text-muted)", marginTop: 1 }}>
                            #{row.project_number}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: "9px 12px", textAlign: "center", color: "var(--hp-text-primary)" }}>
                        <CountCell value={row.closed_count} error={row.procore_error} />
                      </td>
                      <td style={{ padding: "9px 12px", textAlign: "center", color: "var(--hp-text-primary)" }}>
                        <CountCell value={row.open_count} error={row.procore_error} />
                      </td>
                      <td style={{ padding: "9px 12px", textAlign: "center", color: "var(--hp-text-primary)" }}>
                        <CountCell value={createdW} error={row.procore_error} />
                      </td>
                      <td style={{ padding: "9px 12px", textAlign: "center", color: "var(--hp-text-primary)" }}>
                        <CountCell value={closedW} error={row.procore_error} />
                      </td>
                      <td style={{ padding: "9px 12px", textAlign: "center" }}>
                        {row.avg_score !== null
                          ? <span style={{ fontWeight: 700, color: scoreColor(row.avg_score) }}>{row.avg_score}</span>
                          : <span style={{ color: "var(--hp-text-muted)" }}>—</span>}
                      </td>
                      <td style={{ padding: "9px 12px" }}>
                        {row.procore_error
                          ? <span className="inline-flex items-center gap-1 text-[10px] text-red-500"><AlertTriangle className="h-3 w-3" /> Unavailable</span>
                          : <BandBar bands={row.band_counts} />
                        }
                      </td>
                    </tr>
                  );
                })}

                {/* Totals row */}
                <tr style={{ backgroundColor: "var(--hp-warm-100)", borderTop: "2px solid var(--hp-border)" }}>
                  <td style={{ padding: "9px 12px", fontWeight: 700, fontSize: 12, color: "var(--hp-warm-800)" }}>
                    Totals — {rows.length} projects
                  </td>
                  <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "var(--hp-warm-800)" }}>{totals.closed}</td>
                  <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "var(--hp-warm-800)" }}>{totals.open}</td>
                  <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "var(--hp-warm-800)" }}>{totals.created_w}</td>
                  <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "var(--hp-warm-800)" }}>{totals.closed_w}</td>
                  <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "var(--hp-warm-800)" }}>—</td>
                  <td style={{ padding: "9px 12px", fontSize: 11, color: "var(--hp-text-muted)" }}>
                    {totals.reviewed} reviewed
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 10, color: "var(--hp-text-muted)", padding: "6px 12px", margin: 0, borderTop: "1px solid var(--hp-border)" }}>
            † Closed-in-window counts only inspections where Procore recorded a close date. Open/closed totals and avg score are not window-dependent. Window dates use Australia/Sydney timezone.
          </p>
        </div>
      )}

      {/* ── Per-project detail ── */}
      {!loading && rows.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--hp-text-muted)", margin: 0 }}>
            Project detail
          </h3>
          {rows.map(row => (
            <ProjectDetail key={row.id} row={row} window={w} />
          ))}
        </div>
      )}

      {/* ── Empty state ── */}
      {!loading && !error && rows.length === 0 && (
        <div style={{ textAlign: "center", padding: 48, color: "var(--hp-text-muted)", fontSize: 13 }}>
          No projects found for this company.
        </div>
      )}

      {/* ── Refreshing overlay ── */}
      {loading && data && (
        <div style={{ position: "sticky", bottom: 16, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 20, backgroundColor: "var(--hp-warm-800)", color: "#fff", fontSize: 12, fontWeight: 500 }}>
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            Refreshing live data…
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
