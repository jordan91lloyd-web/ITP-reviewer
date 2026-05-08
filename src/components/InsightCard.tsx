"use client";

import { useState } from "react";

export interface ProjectSnapshot {
  procore_project_id: string;
  project_name:       string;
  project_number:     string | null;
  completion_pct:     number | null;
  active_trades:      { name: string; vendor_name?: string; last_claim_date: string; amount_this_period?: number }[];
  summary:            string | null;
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
  snapshot:     ProjectSnapshot | null;          // null = no snapshot yet today
  openItps:     OpenItpSummary[];                // from inspections state (may be empty)
  cardState:    CardState;
  errorMsg:     string | null;
  onGenerate:   () => void;                      // tap to generate / re-generate
  onViewItps:   () => void;                      // navigate to Open tab
}

function fmt(n: number): string {
  return n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
    ? `$${(n / 1_000).toFixed(0)}k`
    : `$${n.toFixed(0)}`;
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
  const [summaryExpanded, setSummaryExpanded] = useState(false);

  const loading = cardState === "fetching_financial" || cardState === "fetching_summary";
  const hasSnap = snapshot !== null && snapshot.summary !== null;

  const unreviewedCount = openItps.filter(i => i.score === null).length;
  const readyToClose    = openItps.filter(i => (i.score ?? 0) >= 75).length;

  // Last reviewed = most recent non-null last_reviewed_at across open ITPs
  // We don't have last_reviewed_at here — use generated_at as proxy
  const lastUpdated = snapshot?.generated_at
    ? `Updated ${fmtDate(snapshot.generated_at)}`
    : null;

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

        {/* Completion % */}
        {snapshot?.completion_pct != null && (
          <div className="shrink-0 text-right">
            <p className="text-xs font-bold text-gray-700">{snapshot.completion_pct}%</p>
            <p className="text-[10px] text-gray-400">claimed</p>
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

      {/* Active trades */}
      {snapshot && snapshot.active_trades.length > 0 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
          {snapshot.active_trades.slice(0, 8).map((t, i) => (
            <span key={i} className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
              {t.name.replace(/^ITP-\d+\s*/i, "").trim() || t.vendor_name || t.name}
              {t.amount_this_period ? ` · ${fmt(t.amount_this_period)}` : ""}
            </span>
          ))}
          {snapshot.active_trades.length > 8 && (
            <span className="text-[10px] text-gray-400">+{snapshot.active_trades.length - 8} more</span>
          )}
        </div>
      )}

      {/* ITP gap warnings */}
      {snapshot && snapshot.itp_gaps.length > 0 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-amber-700 font-medium">
            ⚠ Missing ITPs: {snapshot.itp_gaps.join(", ")}
          </p>
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

      {/* No snapshot yet — tap to generate */}
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

      {/* AI Summary (collapsible) */}
      {hasSnap && snapshot.summary && (
        <div className="px-4 pb-3">
          <button
            type="button"
            onClick={() => setSummaryExpanded(v => !v)}
            className="text-[10px] font-medium text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
          >
            <span className={`inline-block transition-transform duration-150 ${summaryExpanded ? "rotate-180" : ""}`}>▾</span>
            {summaryExpanded ? "Hide summary" : "Show summary"}
          </button>
          {summaryExpanded && (
            <div className="mt-2 rounded-lg bg-gray-50 border border-gray-100 px-3 py-2.5">
              <p className="text-[11px] text-gray-600 leading-relaxed italic">{snapshot.summary}</p>
            </div>
          )}
        </div>
      )}

      {/* Footer actions */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-100 bg-gray-50">
        <button
          type="button"
          onClick={onGenerate}
          disabled={loading}
          className="text-[10px] text-gray-400 hover:text-gray-600 disabled:opacity-40 transition-colors"
        >
          {hasSnap ? "Re-generate" : "Generate"}
        </button>
        <button
          type="button"
          onClick={onViewItps}
          className="rounded-lg bg-[#1F3864] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#253f77] transition-colors"
        >
          View ITPs →
        </button>
      </div>
    </div>
  );
}
