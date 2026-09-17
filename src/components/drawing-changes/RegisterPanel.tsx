"use client";

import React, { useMemo, useRef, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { KpiStrip, type KpiFilter } from "./KpiStrip";
import type {
  ChangeRow,
  DrawingPair,
  RevisionInfo,
  ScanInfo,
  SortOption,
  ReviewStatus,
  DrawingGroupData,
  RevisionGroupData,
  RegisterFlatRow,
} from "./types";
import { SEV_ORDER, RISK_ORDER } from "./constants";
import { RegisterToolbar } from "./RegisterToolbar";
import { DrawingGroupHeader } from "./DrawingGroupHeader";
import { AvailableRevisions } from "./AvailableRevisions";
import { ChangeRowItem } from "./ChangeRowItem";
import { RegisterSkeleton } from "./Skeletons";

interface RegisterPanelProps {
  companyId: string;
  projectId: string;
  projectName: string;
  projects: Array<{ id: number; name: string; display_name: string }>;
  changes: ChangeRow[];
  scan: ScanInfo;
  allScans: ScanInfo[];
  drawingPairs: DrawingPair[];
  expandedResults: Set<string>;
  expandedDrawings: Set<string>;
  highSeverityOnly: boolean;
  variationsOnly: boolean;
  needsReviewOnly: boolean;
  sortBy: SortOption;
  selectMode: boolean;
  selectedChangeIds: Set<string>;
  deleting: boolean;
  deepScanning: Set<string>;
  inlineScanning: string | null;
  loading: boolean;
  onToggleResultSection: (discipline: string) => void;
  onToggleDrawingExpanded: (key: string) => void;
  onExpandAllResults: () => void;
  onCollapseAllResults: () => void;
  onSetHighSeverityOnly: (v: boolean) => void;
  onSetVariationsOnly: (v: boolean) => void;
  onSetNeedsReviewOnly: (v: boolean) => void;
  onSetSortBy: (v: SortOption) => void;
  onSetSelectMode: (v: boolean) => void;
  onClearSelection: () => void;
  onToggleChangeSelection: (id: string) => void;
  onSelectDrawingChanges: (ids: string[], selected: boolean) => void;
  onUpdateStatus: (changeIds: string[], status: ReviewStatus) => void;
  onRaiseChangeEvent: (ids: string[], discipline: string, title: string) => void;
  onDownloadEvidence: (change: ChangeRow) => void;
  onDeepScan: (num: string, title: string, disc: string, oldRev: RevisionInfo, newRev: RevisionInfo) => void;
  onInlineScan: (pair: DrawingPair, from: RevisionInfo, to: RevisionInfo, discipline: string) => void;
  onGoToScan: () => void;
  onGoToScanWithUnscanned?: () => void;
  onLoadScan: (scanId: string) => void;
  onLoadAllResults: () => void;
  onRemoveDuplicates: () => void;
  onClearResults: () => void;
  onDeleteSelected: () => void;
  onSetExpandedDrawings: React.Dispatch<React.SetStateAction<Set<string>>>;
  onBatchAcceptWithinScope?: () => Promise<void>;
  onBatchRaiseVariations?: () => Promise<void>;
  scanSummary?: string | null;
  summaryLoading?: boolean;
  onRegenerateSummary?: () => void;
}

export const RegisterPanel = React.memo(function RegisterPanel({
  companyId,
  projectId,
  projectName,
  projects,
  changes,
  scan,
  allScans,
  drawingPairs,
  expandedResults,
  expandedDrawings,
  highSeverityOnly,
  variationsOnly,
  needsReviewOnly,
  sortBy,
  selectMode,
  selectedChangeIds,
  deleting,
  deepScanning,
  inlineScanning,
  loading,
  onToggleResultSection,
  onToggleDrawingExpanded,
  onExpandAllResults,
  onCollapseAllResults,
  onSetHighSeverityOnly,
  onSetVariationsOnly,
  onSetNeedsReviewOnly,
  onSetSortBy,
  onSetSelectMode,
  onClearSelection,
  onToggleChangeSelection,
  onSelectDrawingChanges,
  onUpdateStatus,
  onRaiseChangeEvent,
  onDownloadEvidence,
  onDeepScan,
  onInlineScan,
  onGoToScan,
  onGoToScanWithUnscanned,
  onLoadScan,
  onLoadAllResults,
  onRemoveDuplicates,
  onClearResults,
  onDeleteSelected,
  onSetExpandedDrawings,
  onBatchAcceptWithinScope,
  onBatchRaiseVariations,
  scanSummary,
  summaryLoading,
  onRegenerateSummary,
}: RegisterPanelProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  // KPI filter state — default to "needs_review" if there are unreviewed changes
  const [kpiFilter, setKpiFilter] = React.useState<KpiFilter>(() => {
    const hasUnreviewed = changes.some(
      (c) => !c.review_status || c.review_status === "needs_review"
    );
    return hasUnreviewed ? "needs_review" : "all";
  });

  // Filtered + sorted changes
  const filteredChanges = useMemo(() => {
    let filtered = changes;

    // Apply KPI filter
    if (kpiFilter === "needs_review") {
      filtered = filtered.filter((c) => !c.review_status || c.review_status === "needs_review");
    } else if (kpiFilter === "likely_variation") {
      filtered = filtered.filter((c) => c.variation_risk === "likely_variation");
    } else if (kpiFilter === "unclear") {
      filtered = filtered.filter((c) => c.variation_risk === "unclear");
    } else if (kpiFilter === "high") {
      filtered = filtered.filter((c) => c.severity === "high");
    }

    // Also apply legacy filters if set
    if (highSeverityOnly) filtered = filtered.filter((c) => c.severity === "high");
    if (variationsOnly) filtered = filtered.filter((c) => c.variation_risk === "likely_variation");
    if (needsReviewOnly) filtered = filtered.filter((c) => !c.review_status || c.review_status === "needs_review");

    if (sortBy === "severity") {
      filtered = [...filtered].sort((a, b) => (SEV_ORDER[a.severity] ?? 9) - (SEV_ORDER[b.severity] ?? 9));
    } else if (sortBy === "variation_risk") {
      filtered = [...filtered].sort(
        (a, b) => (RISK_ORDER[a.variation_risk ?? ""] ?? 9) - (RISK_ORDER[b.variation_risk ?? ""] ?? 9)
      );
    } else if (sortBy === "change_type") {
      filtered = [...filtered].sort((a, b) => a.change_type.localeCompare(b.change_type));
    }
    return filtered;
  }, [changes, highSeverityOnly, variationsOnly, needsReviewOnly, sortBy, kpiFilter]);

  // Group by discipline
  const filteredByDiscipline = useMemo(() => {
    const map: Record<string, ChangeRow[]> = {};
    for (const c of filteredChanges) {
      const disc = c.discipline || "Other";
      if (!map[disc]) map[disc] = [];
      map[disc].push(c);
    }
    return map;
  }, [filteredChanges]);

  // Build drawing groups per discipline
  const drawingGroupsByDiscipline = useMemo(() => {
    const result: Record<string, DrawingGroupData[]> = {};
    for (const [disc, disciplineChanges] of Object.entries(filteredByDiscipline)) {
      const drawingOrder: DrawingGroupData[] = [];
      const drawingLookup = new Map<string, DrawingGroupData>();

      for (const c of disciplineChanges) {
        let dg = drawingLookup.get(c.drawing_number);
        if (!dg) {
          dg = {
            number: c.drawing_number,
            title: c.drawing_title,
            totalChanges: 0,
            totalHigh: 0,
            totalVariations: 0,
            totalNeedReview: 0,
            hasEvent: false,
            revisions: [],
          };
          drawingLookup.set(c.drawing_number, dg);
          drawingOrder.push(dg);
        }
        dg.totalChanges++;
        if (c.severity === "high") dg.totalHigh++;
        if (c.variation_risk === "likely_variation") dg.totalVariations++;
        if (!c.review_status || c.review_status === "needs_review") dg.totalNeedReview++;
        if (c.change_event_id) dg.hasEvent = true;

        const revKey = `${c.old_revision}|${c.new_revision}`;
        let rg = dg.revisions.find((r) => r.revKey === revKey);
        if (!rg) {
          rg = { revKey, rev: `${c.old_revision} \u2192 ${c.new_revision}`, changes: [] };
          dg.revisions.push(rg);
        }
        rg.changes.push(c);
      }
      result[disc] = drawingOrder;
    }
    return result;
  }, [filteredByDiscipline]);

  // Build flat row array
  const flatRows = useMemo(() => {
    const rows: RegisterFlatRow[] = [];
    const disciplines = Object.keys(filteredByDiscipline).sort();

    for (const discipline of disciplines) {
      const disciplineChanges = filteredByDiscipline[discipline];
      const discHigh = disciplineChanges.filter((c) => c.severity === "high").length;
      const drawingGroups = drawingGroupsByDiscipline[discipline] ?? [];

      rows.push({
        type: "discipline",
        key: `disc-${discipline}`,
        discipline,
        changeCount: disciplineChanges.length,
        highCount: discHigh,
        drawingCount: drawingGroups.length,
      });

      if (!expandedResults.has(discipline)) continue;

      for (const dg of drawingGroups) {
        const hasMultipleRevs = dg.revisions.length > 1;
        rows.push({
          type: "drawing",
          key: `draw-${discipline}-${dg.number}`,
          data: dg,
          discipline,
          hasMultipleRevs,
        });

        if (!expandedDrawings.has(dg.number)) continue;

        // Revisions panel
        const pair = drawingPairs.find((p) => p.drawing_number === dg.number);
        if (pair && pair.revisions && pair.revisions.length >= 2) {
          rows.push({
            type: "revisions-panel",
            key: `revpanel-${dg.number}`,
            drawingNumber: dg.number,
            discipline,
          });
        }

        // Revision groups
        for (const rg of dg.revisions) {
          if (hasMultipleRevs) {
            const rgHigh = rg.changes.filter((c) => c.severity === "high").length;
            rows.push({
              type: "revision-header",
              key: `revhdr-${dg.number}-${rg.revKey}`,
              rev: rg.rev,
              changeCount: rg.changes.length,
              highCount: rgHigh,
            });
          }
          for (const change of rg.changes) {
            rows.push({
              type: "change",
              key: `change-${change.id}`,
              change,
            });
          }
        }
      }
    }
    return rows;
  }, [filteredByDiscipline, drawingGroupsByDiscipline, expandedResults, expandedDrawings, drawingPairs]);

  const virtualizer = useVirtualizer({
    count: flatRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => {
      switch (flatRows[index].type) {
        case "discipline":
          return 48;
        case "drawing":
          return 44;
        case "revisions-panel":
          return 80;
        case "revision-header":
          return 36;
        case "change":
          return 64;
        default:
          return 48;
      }
    },
    overscan: 10,
  });

  const unscannedCount = drawingPairs.filter((d) => d.status !== "scanned").length;

  const handleExpandAll = useCallback(() => {
    onExpandAllResults();
    onSetExpandedDrawings(new Set(filteredChanges.map((c) => c.drawing_number)));
  }, [onExpandAllResults, onSetExpandedDrawings, filteredChanges]);

  const handleCollapseAll = useCallback(() => {
    onCollapseAllResults();
    onSetExpandedDrawings(new Set());
  }, [onCollapseAllResults, onSetExpandedDrawings]);

  if (loading) {
    return <RegisterSkeleton />;
  }

  const renderRow = (row: RegisterFlatRow) => {
    switch (row.type) {
      case "discipline": {
        const isExpanded = expandedResults.has(row.discipline);
        return (
          <button
            onClick={() => onToggleResultSection(row.discipline)}
            aria-expanded={isExpanded}
            aria-label={`${row.discipline} - ${row.changeCount} changes, ${row.drawingCount} drawings`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              backgroundColor: "var(--hp-warm-100)",
              cursor: "pointer",
              userSelect: "none",
              borderBottom: "1px solid var(--hp-border)",
              border: "none",
              borderBlockEnd: "1px solid var(--hp-border)",
              width: "100%",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {isExpanded ? (
                <ChevronDown size={16} style={{ color: "var(--hp-text-muted)" }} aria-hidden="true" />
              ) : (
                <ChevronRight size={16} style={{ color: "var(--hp-text-muted)" }} aria-hidden="true" />
              )}
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--hp-text-primary)" }}>{row.discipline}</span>
              <span style={{ fontSize: 12, color: "var(--hp-text-muted)" }}>
                ({row.changeCount} changes · {row.drawingCount} drawings)
              </span>
            </div>
            {row.highCount > 0 && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  borderRadius: 999,
                  padding: "2px 8px",
                  fontSize: 11,
                  fontWeight: 500,
                  backgroundColor: "var(--hp-critical-bg)",
                  color: "var(--hp-critical)",
                }}
              >
                <AlertTriangle size={10} aria-hidden="true" /> {row.highCount}
              </span>
            )}
          </button>
        );
      }
      case "drawing": {
        const pair = drawingPairs.find((p) => p.drawing_number === row.data.number);
        return (
          <DrawingGroupHeader
            data={row.data}
            discipline={row.discipline}
            isExpanded={expandedDrawings.has(row.data.number)}
            hasMultipleRevs={row.hasMultipleRevs}
            companyId={companyId}
            projectId={projectId}
            selectMode={selectMode}
            selectedChangeIds={selectedChangeIds}
            deepScanning={deepScanning}
            drawingPair={pair}
            onToggle={() => onToggleDrawingExpanded(row.data.number)}
            onSelectDrawingChanges={onSelectDrawingChanges}
            onDeepScan={onDeepScan}
          />
        );
      }
      case "revisions-panel": {
        const pair = drawingPairs.find((p) => p.drawing_number === row.drawingNumber);
        const drawingGroup = drawingGroupsByDiscipline[row.discipline]?.find((dg) => dg.number === row.drawingNumber);
        const scannedRevKeys = new Set(drawingGroup?.revisions.map((r) => r.revKey) ?? []);
        return (
          <AvailableRevisions
            drawingNumber={row.drawingNumber}
            drawingPair={pair}
            scannedRevKeys={scannedRevKeys}
            discipline={row.discipline}
            inlineScanning={inlineScanning}
            onInlineScan={onInlineScan}
          />
        );
      }
      case "revision-header":
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "6px 16px 6px 64px",
              borderTop: "1px solid var(--hp-border)",
              backgroundColor: "var(--hp-warm-100)",
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--hp-text-secondary)" }}>Rev {row.rev}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>{row.changeCount} changes</span>
              {row.highCount > 0 && (
                <span
                  style={{
                    borderRadius: 999,
                    padding: "1px 6px",
                    fontSize: 10,
                    fontWeight: 500,
                    backgroundColor: "var(--hp-critical-bg)",
                    color: "var(--hp-critical)",
                  }}
                >
                  {row.highCount} high
                </span>
              )}
            </div>
          </div>
        );
      case "change":
        return (
          <ChangeRowItem
            change={row.change}
            selectMode={selectMode}
            isSelected={selectedChangeIds.has(row.change.id)}
            onToggleSelection={onToggleChangeSelection}
            onUpdateStatus={onUpdateStatus}
            onRaiseChangeEvent={onRaiseChangeEvent}
            onDownloadEvidence={onDownloadEvidence}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {summaryLoading && (
        <style>{`@keyframes hp-summary-pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }`}</style>
      )}

      {/* AI Summary */}
      {(scanSummary || summaryLoading) && (
        <div
          style={{
            borderRadius: 8,
            border: "1px solid var(--hp-border)",
            backgroundColor: "var(--hp-warm-100)",
            padding: "16px 20px",
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Sparkles size={16} style={{ color: "var(--hp-warm-800)" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--hp-warm-800)" }}>AI Summary</span>
            </div>
            {onRegenerateSummary && !summaryLoading && (
              <button
                onClick={onRegenerateSummary}
                title="Regenerate summary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 12,
                  color: "var(--hp-text-muted)",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px 6px",
                  borderRadius: 4,
                }}
              >
                <RefreshCw size={12} />
                <span>Regenerate</span>
              </button>
            )}
          </div>
          {summaryLoading ? (
            <p
              style={{
                fontSize: 13,
                color: "var(--hp-text-secondary)",
                lineHeight: 1.6,
                margin: 0,
                animation: "hp-summary-pulse 1.5s ease-in-out infinite",
              }}
            >
              Generating summary...
            </p>
          ) : (
            <p style={{ fontSize: 13, color: "var(--hp-text-primary)", lineHeight: 1.6, margin: 0 }}>
              {scanSummary}
            </p>
          )}
        </div>
      )}

      {/* Unscanned drawings banner */}
      {unscannedCount > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 8,
            border: "1px solid var(--hp-significant-bg)",
            backgroundColor: "var(--hp-significant-bg)",
            padding: "10px 16px",
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <AlertTriangle size={14} style={{ color: "var(--hp-significant)" }} aria-hidden="true" />
            <span style={{ fontSize: 13, color: "var(--hp-significant)", fontWeight: 500 }}>
              {unscannedCount} drawing{unscannedCount !== 1 ? "s have" : " has"} new revisions to scan
            </span>
          </div>
          <button
            onClick={onGoToScanWithUnscanned ?? onGoToScan}
            aria-label={`Scan ${unscannedCount} new drawing revision${unscannedCount !== 1 ? "s" : ""}`}
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#fff",
              backgroundColor: "var(--hp-significant)",
              border: "none",
              borderRadius: 6,
              padding: "6px 14px",
              cursor: "pointer",
            }}
          >
            Scan Now
          </button>
        </div>
      )}

      {/* KPI Strip */}
      <KpiStrip
        changes={changes}
        activeFilter={kpiFilter}
        onFilterChange={setKpiFilter}
      />

      {/* Toolbar */}
      <RegisterToolbar
        companyId={companyId}
        projectId={projectId}
        changes={changes}
        filteredChangesCount={filteredChanges.length}
        scan={scan}
        allScans={allScans}
        highSeverityOnly={highSeverityOnly}
        variationsOnly={variationsOnly}
        needsReviewOnly={needsReviewOnly}
        sortBy={sortBy}
        selectMode={selectMode}
        selectedChangeIds={selectedChangeIds}
        deleting={deleting}
        drawingPairsUnscannedCount={unscannedCount}
        hasBaseline={changes.some((c) => c.variation_risk !== null && c.variation_risk !== undefined)}
        onSetHighSeverityOnly={onSetHighSeverityOnly}
        onSetVariationsOnly={onSetVariationsOnly}
        onSetNeedsReviewOnly={onSetNeedsReviewOnly}
        onSetSortBy={onSetSortBy}
        onGoToScan={onGoToScan}
        onLoadScan={onLoadScan}
        onLoadAllResults={onLoadAllResults}
        onRemoveDuplicates={onRemoveDuplicates}
        onClearResults={onClearResults}
        onDeleteSelected={onDeleteSelected}
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
        onSetSelectMode={onSetSelectMode}
        onClearSelection={onClearSelection}
        onBatchAcceptWithinScope={onBatchAcceptWithinScope}
        onBatchRaiseVariations={onBatchRaiseVariations}
      />

      {/* Change list */}
      {filteredChanges.length === 0 ? (
        kpiFilter === "needs_review" && changes.length > 0 ? (
          <div
            style={{
              borderRadius: 12,
              border: "1px solid var(--hp-compliant)",
              backgroundColor: "var(--hp-compliant-bg)",
              padding: "40px 32px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>&#10003;</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--hp-compliant)", marginBottom: 6 }}>
              All changes reviewed
            </div>
            <div style={{ fontSize: 13, color: "var(--hp-text-secondary)", marginBottom: 16, maxWidth: 380, margin: "0 auto 16px" }}>
              Every change has been categorised. Switch to the All view to see the full register, or export the results.
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
              <button
                onClick={() => setKpiFilter("all")}
                style={{
                  borderRadius: 8,
                  padding: "8px 18px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--hp-warm-800)",
                  backgroundColor: "var(--hp-surface)",
                  border: "1px solid var(--hp-border)",
                  cursor: "pointer",
                }}
              >
                View All Changes
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              borderRadius: 8,
              border: "1px solid var(--hp-border)",
              padding: 32,
              textAlign: "center",
              fontSize: 13,
              color: "var(--hp-text-secondary)",
            }}
          >
            {kpiFilter !== "all"
              ? `No changes matching "${kpiFilter.replace(/_/g, " ")}" filter.`
              : needsReviewOnly
                ? "No changes needing review."
                : highSeverityOnly
                  ? "No high severity changes."
                  : "No changes detected."}
          </div>
        )
      ) : (
        <div
          ref={parentRef}
          style={{
            overflow: "auto",
            height: "calc(100vh - 380px)",
            borderRadius: 8,
            border: "1px solid var(--hp-border)",
          }}
        >
          <div style={{ height: virtualizer.getTotalSize(), width: "100%", position: "relative" }}>
            {virtualizer.getVirtualItems().map((vi) => (
              <div
                key={flatRows[vi.index].key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${vi.start}px)`,
                }}
                ref={virtualizer.measureElement}
                data-index={vi.index}
              >
                {renderRow(flatRows[vi.index])}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
});
