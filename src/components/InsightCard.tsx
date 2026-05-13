"use client";

export interface MissingItp {
  itp:    string;
  name:   string;
  reason: string;
}

export interface ProjectSnapshot {
  procore_project_id: string;
  project_name:       string;
  project_number:     string | null;
  completion_pct:     number | null;
  contract_sum:       number | null;
  active_trades:      { name: string; last_activity: string; percentage_paid: number; contract_value: number }[];
  stage:              string | null;
  missing_itps:       MissingItp[];
  coming_up:          MissingItp[];
  itp_gaps:           string[];
  generated_at:       string | null;
}

export interface OpenItpSummary {
  name:      string;
  status:    string;
  score:     number | null;
  days_open: number | null;
}

export type CardState = "idle" | "fetching_financial" | "fetching_summary" | "done" | "error";

interface Props {
  snapshot:   ProjectSnapshot | null;
  openItps:   OpenItpSummary[];
  cardState:  CardState;
  errorMsg:   string | null;
  onGenerate: () => void;
  onViewItps: () => void;
}

function fmtValue(n: number): string {
  return n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : `$${Math.round(n / 1_000)}k`;
}

function fmtDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-AU", { day: "2-digit", month: "short" });
}

function borderColor(snap: ProjectSnapshot | null): string {
  if (!snap) return "border-l-gray-300";
  if (snap.itp_gaps.length > 0) return "border-l-red-500";
  if ((snap.completion_pct ?? 0) > 60 && snap.active_trades.length === 0) return "border-l-amber-400";
  return "border-l-green-500";
}

function statusDot(snap: ProjectSnapshot | null): string {
  if (!snap) return "bg-gray-300";
  if (snap.itp_gaps.length > 0) return "bg-red-500";
  if ((snap.completion_pct ?? 0) > 60 && snap.active_trades.length === 0) return "bg-amber-400";
  return "bg-green-500";
}

export default function InsightCard({ snapshot, openItps, cardState, errorMsg, onGenerate, onViewItps }: Props) {
  const loading = cardState === "fetching_financial" || cardState === "fetching_summary";
  const hasSnap = snapshot !== null && snapshot.stage !== null;

  const unreviewedCount = openItps.filter(i => i.score === null).length;
  const readyToClose    = openItps.filter(i => (i.score ?? 0) >= 75).length;

  const lastUpdated = snapshot?.generated_at ? `Updated ${fmtDate(snapshot.generated_at)}` : null;

  return (
    <div className={`relative bg-white rounded-xl border border-gray-200 border-l-4 shadow-sm overflow-hidden transition-all ${borderColor(snapshot)}`}>

      {/* Header */}
      <div className="flex items-start justify-between px-4 py-3 gap-3">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className={`shrink-0 h-2 w-2 rounded-full ${statusDot(snapshot)}`} />
          <div className="min-w-0">
            {snapshot?.project_number && (
              <p className="text-[10px] text-gray-400 leading-none mb-0.5">#{snapshot.project_number}</p>
            )}
            <p className="text-sm font-bold text-[#1F3864] leading-snug truncate">
              {snapshot?.project_name ?? "Loading…"}
            </p>
          </div>
        </div>

        {/* Completion + head contract value */}
        {(snapshot?.completion_pct != null || snapshot?.contract_sum != null) && (
          <div className="shrink-0 text-right">
            <p className="text-xs font-bold text-gray-700">
              {snapshot.completion_pct != null ? `${snapshot.completion_pct}%` : "—"}
              {snapshot.contract_sum != null && (
                <span className="font-normal text-gray-400 ml-1">· {fmtValue(snapshot.contract_sum)}</span>
              )}
            </p>
            <p className="text-[10px] text-gray-400">subcontract progress</p>
          </div>
        )}
      </div>

      {/* Progress bar */}
      {snapshot?.completion_pct != null && (
        <div className="px-4 pb-2">
          <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                snapshot.completion_pct >= 80 ? "bg-green-500" :
                snapshot.completion_pct >= 50 ? "bg-blue-500" :
                "bg-gray-400"
              }`}
              style={{ width: `${Math.min(snapshot.completion_pct, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Active trades chips */}
      {snapshot && snapshot.active_trades.length > 0 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
          {snapshot.active_trades.slice(0, 8).map((t, i) => (
            <span key={i} className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
              {t.name.replace(/^ITP-\d+\s*/i, "").trim() || t.name}
              {` (${Math.round(t.percentage_paid)}%)`}
            </span>
          ))}
          {snapshot.active_trades.length > 8 && (
            <span className="text-[10px] text-gray-400">+{snapshot.active_trades.length - 8} more</span>
          )}
        </div>
      )}

      {/* Open ITP stats */}
      {openItps.length > 0 && (
        <div className="px-4 pb-2 flex items-center gap-3 text-[10px] text-gray-400">
          <span>{openItps.length} open</span>
          {readyToClose > 0 && <span className="text-green-600 font-semibold">{readyToClose} ready to close</span>}
          {unreviewedCount > 0 && <span className="text-amber-600">{unreviewedCount} unreviewed</span>}
          {lastUpdated && <span className="ml-auto">{lastUpdated}</span>}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2">
            <svg className="h-3.5 w-3.5 animate-spin text-blue-400" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <span className="text-xs text-gray-400 italic">
              {cardState === "fetching_financial" ? "Fetching financial data…" : "Generating AI summary…"}
            </span>
          </div>
        </div>
      )}

      {/* Error state */}
      {cardState === "error" && errorMsg && (
        <div className="px-4 pb-3">
          <p className="text-xs text-red-500">⚠ {errorMsg}</p>
        </div>
      )}

      {/* No snapshot yet */}
      {!hasSnap && cardState === "idle" && (
        <div className="px-4 pb-3">
          <button
            type="button"
            onClick={onGenerate}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Tap to generate summary →
          </button>
        </div>
      )}

      {/* AI structured sections */}
      {hasSnap && (
        <div className="pb-1">

          {/* ⚠ Missing ITPs */}
          {snapshot.missing_itps.length > 0 && (
            <div className="mx-4 mb-2 rounded-lg bg-amber-50 border border-amber-200 border-l-[3px] border-l-red-500 overflow-hidden">
              <div className="px-3 py-1.5 border-b border-amber-100">
                <p className="text-[10px] font-bold text-amber-900 uppercase tracking-wide">⚠ Missing ITPs — should be open now</p>
              </div>
              <ul className="px-3 py-1.5 space-y-0.5">
                {snapshot.missing_itps.map((m, i) => (
                  <li key={i} className="text-[11px] text-amber-800 leading-snug">
                    <span className="font-semibold">{m.itp} {m.name}</span>
                    {m.reason && <span className="text-amber-600"> — {m.reason}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 📋 Coming up */}
          {snapshot.coming_up.length > 0 && (
            <div className="mx-4 mb-2 rounded-lg bg-blue-50 border border-blue-100 overflow-hidden">
              <div className="px-3 py-1.5 border-b border-blue-100">
                <p className="text-[10px] font-bold text-blue-800 uppercase tracking-wide">📋 Coming up — next 2–4 weeks</p>
              </div>
              <ul className="px-3 py-1.5 space-y-0.5">
                {snapshot.coming_up.map((m, i) => (
                  <li key={i} className="text-[11px] text-blue-800 leading-snug">
                    <span className="font-semibold">{m.itp} {m.name}</span>
                    {m.reason && <span className="text-blue-500"> — {m.reason}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 💬 Stage */}
          {snapshot.stage && (
            <p className="px-4 pb-2 text-[11px] text-gray-500 italic">{snapshot.stage}</p>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t" style={{ borderColor: "var(--hp-border-light)", backgroundColor: "var(--hp-warm-100)" }}>
        <button
          type="button"
          onClick={onGenerate}
          disabled={loading}
          className="rounded-md text-[10px] font-medium px-2 py-1 disabled:opacity-40 transition-colors"
          style={{ border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-surface)", color: "var(--hp-text-secondary)" }}
        >
          {hasSnap ? "Re-generate" : "Generate"}
        </button>
        <button
          type="button"
          onClick={onViewItps}
          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-colors"
          style={{ backgroundColor: "var(--hp-warm-800)" }}
        >
          View ITPs →
        </button>
      </div>
    </div>
  );
}
