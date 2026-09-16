"use client";

import React from "react";
import {
  Download,
  RefreshCw,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import type { ChangeRow, ScanInfo, SortOption } from "./types";
import {
  CHANGE_TYPE_LABELS,
  CHANGE_TYPE_COLORS,
  BTN_STYLE,
  fmtDate,
} from "./constants";

interface RegisterToolbarProps {
  companyId: string;
  projectId: string;
  changes: ChangeRow[];
  filteredChangesCount: number;
  scan: ScanInfo | null;
  allScans: ScanInfo[];
  highSeverityOnly: boolean;
  variationsOnly: boolean;
  sortBy: SortOption;
  selectMode: boolean;
  selectedChangeIds: Set<string>;
  deleting: boolean;
  drawingPairsUnscannedCount: number;
  hasBaseline: boolean;
  onSetHighSeverityOnly: (v: boolean) => void;
  onSetVariationsOnly: (v: boolean) => void;
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
  sortBy,
  selectMode,
  selectedChangeIds,
  deleting,
  hasBaseline,
  onSetHighSeverityOnly,
  onSetVariationsOnly,
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
}: RegisterToolbarProps) {
  const uniqueDrawings = new Set(changes.map((c) => c.drawing_number));
  const highTotal = changes.filter((c) => c.severity === "high").length;
  const variationTotal = changes.filter((c) => c.variation_risk === "likely_variation").length;
  const withinScopeTotal = changes.filter((c) => c.variation_risk === "within_scope").length;

  const exportParams = new URLSearchParams({
    company_id: companyId,
    project_id: projectId,
    all: "true",
    sort: sortBy,
  });
  if (highSeverityOnly) exportParams.set("severity", "high");
  if (variationsOnly) exportParams.set("variation_risk", "likely_variation");
  const qs = exportParams.toString();

  return (
    <>
      {/* Header bar */}
      <div
        style={{
          borderRadius: 8,
          border: "1px solid var(--hp-border)",
          backgroundColor: "var(--hp-warm-100)",
          padding: "16px 20px",
          marginBottom: 16,
        }}
      >
        {/* Row 1: Title + actions */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--hp-text-primary)" }}>Change Register</div>
            <div style={{ fontSize: 12, color: "var(--hp-text-secondary)", marginTop: 2 }}>
              {uniqueDrawings.size} drawings · {changes.length} changes · {highTotal} high severity
              {hasBaseline && ` · ${variationTotal} likely variation${variationTotal !== 1 ? "s" : ""}`}
              {(() => {
                const variationCount = changes.filter((c) => c.review_status === "variation_raised").length;
                const reviewedCount = changes.filter((c) => c.review_status && c.review_status !== "needs_review").length;
                if (reviewedCount === 0) return null;
                return ` · ${reviewedCount} reviewed` + (variationCount > 0 ? ` · ${variationCount} variations` : "");
              })()}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <a href={`/api/drawing-changes/export?${qs}&format=csv`} download style={BTN_STYLE}>
              <Download size={12} /> Export CSV
            </a>
            <a href={`/api/drawing-changes/export?${qs}&format=pdf`} download style={BTN_STYLE}>
              <Download size={12} /> Export PDF
            </a>
            <button
              onClick={onGoToScan}
              style={{
                ...BTN_STYLE,
                border: "1px solid var(--hp-warm-800)",
                backgroundColor: "var(--hp-warm-800)",
                color: "#fff",
                fontWeight: 600,
              }}
            >
              <RefreshCw size={12} /> Scan New Drawings
            </button>
            <button
              onClick={onRemoveDuplicates}
              title="Keep only the latest scan results for each drawing revision pair"
              style={BTN_STYLE}
            >
              Remove Duplicates
            </button>
            <button
              onClick={onClearResults}
              title="Delete all scan results for this project"
              style={{ ...BTN_STYLE, color: "var(--hp-critical)", borderColor: "var(--hp-critical-bg)" }}
            >
              <Trash2 size={12} /> Clear All
            </button>
          </div>
        </div>

        {/* Row 2: Scan history */}
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
                marginTop: 10,
                borderTop: "1px solid var(--hp-border)",
                paddingTop: 10,
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
      </div>

      {/* Filter bar */}
      {changes.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
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
            {(highSeverityOnly || variationsOnly) && (
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
              <option value="severity">Severity (High → Low)</option>
              <option value="variation_risk">Variation Risk (High → Low)</option>
              <option value="change_type">Change Type</option>
            </select>
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
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
});
