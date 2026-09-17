"use client";

import React, { useState } from "react";
import {
  Download,
  RefreshCw,
  Trash2,
  AlertTriangle,
  MoreHorizontal,
} from "lucide-react";
import type { ChangeRow, ScanInfo, SortOption } from "./types";
import {
  CHANGE_TYPE_LABELS,
  CHANGE_TYPE_COLORS,
  BTN_STYLE,
  fmtDate,
} from "./constants";

export type ViewMode = "changes" | "by_drawing";

interface RegisterToolbarProps {
  companyId: string;
  projectId: string;
  changes: ChangeRow[];
  filteredChangesCount: number;
  scan: ScanInfo | null;
  allScans: ScanInfo[];
  highSeverityOnly: boolean;
  variationsOnly: boolean;
  needsReviewOnly: boolean;
  sortBy: SortOption;
  selectMode: boolean;
  selectedChangeIds: Set<string>;
  deleting: boolean;
  drawingPairsUnscannedCount: number;
  hasBaseline: boolean;
  viewMode: ViewMode;
  onSetViewMode: (v: ViewMode) => void;
  onSetHighSeverityOnly: (v: boolean) => void;
  onSetVariationsOnly: (v: boolean) => void;
  onSetNeedsReviewOnly: (v: boolean) => void;
  onSetSortBy: (v: SortOption) => void;
  onGoToScan: () => void;
  onLoadScan: (scanId: string) => void;
  onLoadAllResults: () => void;
  onRemoveDuplicates: () => void;
  onClearResults: () => void;
  onDeleteSelected: () => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  onSetSelectMode: (v: boolean) => void;
  onClearSelection: () => void;
  onBatchAcceptWithinScope?: () => Promise<void>;
  onBatchRaiseVariations?: () => Promise<void>;
}

export const RegisterToolbar = React.memo(function RegisterToolbar({
  companyId,
  projectId,
  changes,
  filteredChangesCount,
  scan,
  allScans,
  highSeverityOnly,
  variationsOnly,
  needsReviewOnly,
  sortBy,
  selectMode,
  selectedChangeIds,
  deleting,
  hasBaseline,
  viewMode,
  onSetViewMode,
  onSetHighSeverityOnly,
  onSetVariationsOnly,
  onSetNeedsReviewOnly,
  onSetSortBy,
  onGoToScan,
  onLoadScan,
  onLoadAllResults,
  onRemoveDuplicates,
  onClearResults,
  onDeleteSelected,
  onExpandAll,
  onCollapseAll,
  onSetSelectMode,
  onClearSelection,
  onBatchAcceptWithinScope,
  onBatchRaiseVariations,
}: RegisterToolbarProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [batchRunning, setBatchRunning] = useState<"accept" | "raise" | null>(null);
  const [showBatchConfirm, setShowBatchConfirm] = useState<"accept" | "raise" | null>(null);

  const highTotal = changes.filter((c) => c.severity === "high").length;
  const variationTotal = changes.filter((c) => c.variation_risk === "likely_variation").length;
  const withinScopeTotal = changes.filter((c) => c.variation_risk === "within_scope").length;
  const needsReviewTotal = changes.filter((c) => !c.review_status || c.review_status === "needs_review").length;

  // Batch action counts
  const unreviewedWithinScope = changes.filter(
    (c) => c.variation_risk === "within_scope" && (!c.review_status || c.review_status === "needs_review")
  ).length;
  const unreviewedVariations = changes.filter(
    (c) => c.variation_risk === "likely_variation" && (!c.review_status || c.review_status === "needs_review")
  ).length;
  const unreviewedVariationDisciplines = new Set(
    changes
      .filter((c) => c.variation_risk === "likely_variation" && (!c.review_status || c.review_status === "needs_review"))
      .map((c) => c.discipline)
  ).size;

  const exportParams = new URLSearchParams({
    company_id: companyId,
    project_id: projectId,
    all: "true",
    sort: sortBy,
  });
  if (highSeverityOnly) exportParams.set("severity", "high");
  if (variationsOnly) exportParams.set("variation_risk", "likely_variation");
  const qs = exportParams.toString();

  const handleBatchAccept = async () => {
    setShowBatchConfirm(null);
    setBatchRunning("accept");
    try {
      await onBatchAcceptWithinScope?.();
    } finally {
      setBatchRunning(null);
    }
  };

  const handleBatchRaise = async () => {
    setShowBatchConfirm(null);
    setBatchRunning("raise");
    try {
      await onBatchRaiseVariations?.();
    } finally {
      setBatchRunning(null);
    }
  };

  return (
    <>
      {/* View mode toggle */}
      {changes.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginBottom: 10,
            padding: 2,
            borderRadius: 8,
            backgroundColor: "var(--hp-warm-100)",
            width: "fit-content",
          }}
        >
          {(["changes", "by_drawing"] as const).map((mode) => {
            const isActive = viewMode === mode;
            const label = mode === "changes" ? "All Changes" : "By Drawing";
            return (
              <button
                key={mode}
                onClick={() => onSetViewMode(mode)}
                aria-pressed={isActive}
                style={{
                  borderRadius: 6,
                  padding: "5px 14px",
                  fontSize: 12,
                  fontWeight: isActive ? 600 : 400,
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: isActive ? "var(--hp-warm-800)" : "transparent",
                  color: isActive ? "#fff" : "var(--hp-text-secondary)",
                  transition: "all 0.15s ease",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      {/* Batch actions row */}
      {needsReviewTotal > 0 && (unreviewedWithinScope > 0 || unreviewedVariations > 0) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 8,
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid var(--hp-border)",
            backgroundColor: "var(--hp-warm-100)",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--hp-text-secondary)", marginRight: 4 }}>
            Batch:
          </span>
          {unreviewedWithinScope > 0 && onBatchAcceptWithinScope && (
            <button
              onClick={() => setShowBatchConfirm("accept")}
              disabled={batchRunning !== null}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                borderRadius: 8,
                border: "1px solid var(--hp-compliant)",
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 600,
                color: batchRunning === "accept" ? "#fff" : "var(--hp-compliant)",
                backgroundColor: batchRunning === "accept" ? "var(--hp-compliant)" : "var(--hp-surface)",
                cursor: batchRunning !== null ? "not-allowed" : "pointer",
                opacity: batchRunning !== null && batchRunning !== "accept" ? 0.5 : 1,
              }}
            >
              {batchRunning === "accept" ? "Accepting..." : `Accept ${unreviewedWithinScope} within scope`}
            </button>
          )}
          {unreviewedVariations > 0 && onBatchRaiseVariations && (
            <button
              onClick={() => setShowBatchConfirm("raise")}
              disabled={batchRunning !== null}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                borderRadius: 8,
                border: "1px solid var(--hp-critical)",
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 600,
                color: batchRunning === "raise" ? "#fff" : "var(--hp-critical)",
                backgroundColor: batchRunning === "raise" ? "var(--hp-critical)" : "var(--hp-surface)",
                cursor: batchRunning !== null ? "not-allowed" : "pointer",
                opacity: batchRunning !== null && batchRunning !== "raise" ? 0.5 : 1,
              }}
            >
              {batchRunning === "raise"
                ? "Raising events..."
                : `Raise ${unreviewedVariations} variation event${unreviewedVariations !== 1 ? "s" : ""} (${unreviewedVariationDisciplines} discipline${unreviewedVariationDisciplines !== 1 ? "s" : ""})`}
            </button>
          )}
        </div>
      )}

      {/* Batch confirmation dialog */}
      {showBatchConfirm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 50,
          }}
          onClick={() => setShowBatchConfirm(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "var(--hp-surface)",
              borderRadius: 12,
              padding: "24px 28px",
              maxWidth: 440,
              width: "90%",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--hp-text-primary)", marginBottom: 8 }}>
              {showBatchConfirm === "accept" ? "Accept within-scope changes?" : "Raise variation events?"}
            </div>
            <div style={{ fontSize: 13, color: "var(--hp-text-secondary)", marginBottom: 16, lineHeight: 1.5 }}>
              {showBatchConfirm === "accept"
                ? `This will mark ${unreviewedWithinScope} unreviewed change${unreviewedWithinScope !== 1 ? "s" : ""} classified as "within scope" as "Not a Variation". This cannot be undone in bulk.`
                : `This will create Change Events in Procore for ${unreviewedVariations} unreviewed likely-variation change${unreviewedVariations !== 1 ? "s" : ""} across ${unreviewedVariationDisciplines} discipline${unreviewedVariationDisciplines !== 1 ? "s" : ""}, grouped by discipline.`}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button
                onClick={() => setShowBatchConfirm(null)}
                style={{
                  borderRadius: 8,
                  padding: "8px 18px",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--hp-text-secondary)",
                  backgroundColor: "var(--hp-surface)",
                  border: "1px solid var(--hp-border)",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={showBatchConfirm === "accept" ? handleBatchAccept : handleBatchRaise}
                style={{
                  borderRadius: 8,
                  padding: "8px 18px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#fff",
                  backgroundColor: showBatchConfirm === "accept" ? "var(--hp-compliant)" : "var(--hp-critical)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {showBatchConfirm === "accept" ? "Accept All" : "Raise Events"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter pills and sort row */}
      {changes.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
            {(["addition", "deletion", "spec_change", "relocation"] as const).map((type) => {
              const count = changes.filter((c) => c.change_type === type).length;
              if (count === 0) return null;
              const colors = CHANGE_TYPE_COLORS[type];
              return (
                <span
                  key={type}
                  style={{
                    borderRadius: 999,
                    padding: "3px 10px",
                    fontSize: 11,
                    fontWeight: 500,
                    backgroundColor: colors.bg,
                    color: colors.text,
                  }}
                >
                  {count} {CHANGE_TYPE_LABELS[type]}{count !== 1 ? "s" : ""}
                </span>
              );
            })}
            {highTotal > 0 && (
              <button
                onClick={() => onSetHighSeverityOnly(!highSeverityOnly)}
                style={{
                  borderRadius: 999,
                  padding: "3px 10px",
                  fontSize: 11,
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  backgroundColor: highSeverityOnly ? "var(--hp-critical)" : "var(--hp-critical-bg)",
                  color: highSeverityOnly ? "#fff" : "var(--hp-critical)",
                }}
              >
                <AlertTriangle size={10} /> {highTotal} High {highSeverityOnly ? " \u2715" : ""}
              </button>
            )}
            {hasBaseline && variationTotal > 0 && (
              <button
                onClick={() => onSetVariationsOnly(!variationsOnly)}
                style={{
                  borderRadius: 999,
                  padding: "3px 10px",
                  fontSize: 11,
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  backgroundColor: variationsOnly ? "var(--hp-critical)" : "var(--hp-critical-bg)",
                  color: variationsOnly ? "#fff" : "var(--hp-critical)",
                }}
              >
                {variationTotal} Variation{variationTotal !== 1 ? "s" : ""} {variationsOnly ? " \u2715" : ""}
              </button>
            )}
            {hasBaseline && withinScopeTotal > 0 && (
              <span
                style={{
                  borderRadius: 999,
                  padding: "3px 10px",
                  fontSize: 11,
                  fontWeight: 500,
                  backgroundColor: "var(--hp-compliant-bg)",
                  color: "var(--hp-compliant)",
                }}
              >
                {withinScopeTotal} Within Scope
              </span>
            )}
            {needsReviewTotal > 0 && (
              <button
                onClick={() => onSetNeedsReviewOnly(!needsReviewOnly)}
                style={{
                  borderRadius: 999,
                  padding: "3px 10px",
                  fontSize: 11,
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  backgroundColor: needsReviewOnly ? "var(--hp-significant)" : "var(--hp-significant-bg)",
                  color: needsReviewOnly ? "#fff" : "var(--hp-significant)",
                }}
              >
                {needsReviewTotal} Needs Review {needsReviewOnly ? " \u2715" : ""}
              </button>
            )}
            {(highSeverityOnly || variationsOnly || needsReviewOnly) && (
              <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>
                Showing {filteredChangesCount} of {changes.length}
              </span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSetSortBy(e.target.value as SortOption)}
              style={{
                fontSize: 11,
                padding: "4px 8px",
                borderRadius: 6,
                border: "1px solid var(--hp-border)",
                backgroundColor: "var(--hp-surface)",
                color: "var(--hp-text-secondary)",
                cursor: "pointer",
              }}
            >
              <option value="discipline">Discipline</option>
              <option value="severity">Severity (High to Low)</option>
              <option value="variation_risk">Variation Risk (High to Low)</option>
              <option value="change_type">Change Type</option>
            </select>
          </div>
        </div>
      )}

      {/* Scan-date view toggles */}
      {allScans.length > 0 && (() => {
        const byDate = new Map<string, typeof allScans>();
        for (const s of allScans) {
          const date = fmtDate(s.created_at);
          if (!byDate.has(date)) byDate.set(date, []);
          byDate.get(date)!.push(s);
        }
        const dateEntries = [...byDate.entries()];

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 12, color: "var(--hp-text-muted)", marginRight: 4 }}>View:</span>
            <button
              onClick={onLoadAllResults}
              style={{
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 6,
                padding: "5px 12px",
                cursor: "pointer",
                border: "none",
                backgroundColor: !scan?.id || scan?.id === "all" ? "var(--hp-warm-800)" : "var(--hp-surface)",
                color: !scan?.id || scan?.id === "all" ? "#fff" : "var(--hp-text-secondary)",
              }}
            >
              All Changes
            </button>
            {dateEntries.map(([date, scans]) => {
              const isActive = scans.some((s) => s.id === scan?.id);
              const totalDrawings = scans.reduce((sum, s) => sum + s.completed_drawings, 0);
              return (
                <button
                  key={date}
                  onClick={() => onLoadScan(scans[0].id)}
                  style={{
                    fontSize: 12,
                    fontWeight: isActive ? 600 : 400,
                    borderRadius: 6,
                    padding: "5px 12px",
                    cursor: "pointer",
                    border: "none",
                    backgroundColor: isActive ? "var(--hp-warm-800)" : "var(--hp-surface)",
                    color: isActive ? "#fff" : "var(--hp-text-secondary)",
                  }}
                >
                  {date} ({totalDrawings})
                </button>
              );
            })}
          </div>
        );
      })()}

      {/* Action bar: export icons, expand/collapse, select, More menu */}
      {changes.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {/* Export CSV icon button */}
            <a
              href={`/api/drawing-changes/export?${qs}&format=csv`}
              download
              title="Export CSV"
              aria-label="Export change register as CSV"
              style={{ ...BTN_STYLE, padding: "5px 8px" }}
            >
              <Download size={14} aria-hidden="true" />
            </a>
            {/* Export PDF icon button */}
            <a
              href={`/api/drawing-changes/export?${qs}&format=pdf`}
              download
              title="Export PDF"
              aria-label="Export change register as PDF"
              style={{ ...BTN_STYLE, padding: "5px 8px" }}
            >
              <Download size={14} style={{ color: "var(--hp-critical)" }} aria-hidden="true" />
            </a>

            {/* More dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setMoreOpen((v) => !v)}
                style={{ ...BTN_STYLE, padding: "5px 8px" }}
                title="More actions"
                aria-label="More actions"
                aria-expanded={moreOpen}
                aria-haspopup="menu"
              >
                <MoreHorizontal size={14} aria-hidden="true" />
              </button>
              {moreOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    marginTop: 4,
                    backgroundColor: "var(--hp-surface)",
                    border: "1px solid var(--hp-border)",
                    borderRadius: 8,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    zIndex: 20,
                    minWidth: 180,
                    padding: "4px 0",
                  }}
                >
                  <a
                    href={`/api/drawing-changes/export?${qs}&format=csv`}
                    download
                    onClick={() => setMoreOpen(false)}
                    style={{
                      display: "block",
                      padding: "8px 14px",
                      fontSize: 12,
                      color: "var(--hp-text-primary)",
                      textDecoration: "none",
                    }}
                  >
                    Export CSV
                  </a>
                  <a
                    href={`/api/drawing-changes/export?${qs}&format=pdf`}
                    download
                    onClick={() => setMoreOpen(false)}
                    style={{
                      display: "block",
                      padding: "8px 14px",
                      fontSize: 12,
                      color: "var(--hp-text-primary)",
                      textDecoration: "none",
                    }}
                  >
                    Export PDF
                  </a>
                  <div style={{ borderTop: "1px solid var(--hp-border)", margin: "4px 0" }} />
                  <button
                    onClick={() => {
                      setMoreOpen(false);
                      onRemoveDuplicates();
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 14px",
                      fontSize: 12,
                      color: "var(--hp-text-primary)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Remove Duplicates
                  </button>
                  <button
                    onClick={() => {
                      setMoreOpen(false);
                      onClearResults();
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 14px",
                      fontSize: 12,
                      color: "var(--hp-critical)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Clear All Results
                  </button>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {selectMode ? (
              <>
                <button
                  onClick={onDeleteSelected}
                  disabled={selectedChangeIds.size === 0 || deleting}
                  style={{
                    ...BTN_STYLE,
                    padding: "4px 10px",
                    fontSize: 11,
                    color: selectedChangeIds.size > 0 ? "var(--hp-critical)" : "var(--hp-text-muted)",
                    borderColor: selectedChangeIds.size > 0 ? "var(--hp-critical-bg)" : "var(--hp-border)",
                  }}
                >
                  <Trash2 size={11} /> Delete {selectedChangeIds.size > 0 ? `(${selectedChangeIds.size})` : ""}
                </button>
                <button
                  onClick={() => {
                    onSetSelectMode(false);
                    onClearSelection();
                  }}
                  style={{ ...BTN_STYLE, padding: "4px 10px", fontSize: 11 }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button onClick={onExpandAll} style={{ ...BTN_STYLE, padding: "4px 10px", fontSize: 11 }}>
                  Expand All
                </button>
                <button onClick={onCollapseAll} style={{ ...BTN_STYLE, padding: "4px 10px", fontSize: 11 }}>
                  Collapse All
                </button>
                <button onClick={() => onSetSelectMode(true)} style={{ ...BTN_STYLE, padding: "4px 10px", fontSize: 11 }}>
                  Select
                </button>
                <button
                  onClick={onGoToScan}
                  style={{
                    ...BTN_STYLE,
                    padding: "4px 10px",
                    fontSize: 11,
                    border: "1px solid var(--hp-warm-800)",
                    backgroundColor: "var(--hp-warm-800)",
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  <RefreshCw size={11} /> Scan New
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
});
