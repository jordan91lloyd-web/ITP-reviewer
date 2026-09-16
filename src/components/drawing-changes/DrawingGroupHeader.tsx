"use client";

import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { DrawingGroupData, DrawingPair, RevisionInfo } from "./types";

interface DrawingGroupHeaderProps {
  data: DrawingGroupData;
  discipline: string;
  isExpanded: boolean;
  hasMultipleRevs: boolean;
  companyId: string;
  projectId: string;
  selectMode: boolean;
  selectedChangeIds: Set<string>;
  deepScanning: Set<string>;
  drawingPair: DrawingPair | undefined;
  onToggle: () => void;
  onSelectDrawingChanges: (ids: string[], selected: boolean) => void;
  onDeepScan: (num: string, title: string, disc: string, oldRev: RevisionInfo, newRev: RevisionInfo) => void;
}

export const DrawingGroupHeader = React.memo(function DrawingGroupHeader({
  data: dg,
  discipline,
  isExpanded,
  hasMultipleRevs,
  companyId,
  projectId,
  selectMode,
  selectedChangeIds,
  deepScanning,
  drawingPair,
  onToggle,
  onSelectDrawingChanges,
  onDeepScan,
}: DrawingGroupHeaderProps) {
  const allChangeIds = dg.revisions.flatMap((r) => r.changes.map((c) => c.id));
  const hasEvent = dg.revisions.some((r) => r.changes.some((c) => c.change_event_id));

  const pair = drawingPair;
  const latestRev = dg.revisions[dg.revisions.length - 1];
  const deepKey = `${dg.number}|${latestRev?.revKey}`;
  const isDS = deepScanning.has(deepKey);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={`${dg.number} ${dg.title} - ${dg.totalChanges} change${dg.totalChanges !== 1 ? "s" : ""}`}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 16px 8px 40px",
        borderTop: "1px solid var(--hp-border)",
        backgroundColor: isExpanded ? "var(--hp-warm-100)" : "var(--hp-bg)",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
        {selectMode && (() => {
          const allSelected = allChangeIds.length > 0 && allChangeIds.every((id) => selectedChangeIds.has(id));
          return (
            <input
              type="checkbox"
              checked={allSelected}
              aria-label={`Select all changes for ${dg.number}`}
              onClick={(e) => e.stopPropagation()}
              onChange={() => onSelectDrawingChanges(allChangeIds, !allSelected)}
              style={{ accentColor: "var(--hp-warm-800)", cursor: "pointer" }}
            />
          );
        })()}
        {isExpanded ? (
          <ChevronDown size={14} style={{ color: "var(--hp-text-muted)", flexShrink: 0 }} aria-hidden="true" />
        ) : (
          <ChevronRight size={14} style={{ color: "var(--hp-text-muted)", flexShrink: 0 }} aria-hidden="true" />
        )}
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--hp-warm-800)", flexShrink: 0 }}>{dg.number}</span>
        <span style={{ fontSize: 12, color: "var(--hp-text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {dg.title}
        </span>
        {!hasMultipleRevs && (
          <span style={{ fontSize: 11, color: "var(--hp-text-muted)", flexShrink: 0 }}>Rev {dg.revisions[0]?.rev}</span>
        )}
        {hasMultipleRevs && (
          <span style={{ fontSize: 11, color: "var(--hp-warm-800)", fontWeight: 500, flexShrink: 0 }}>
            {dg.revisions.length} revisions
          </span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        {/* Count chips */}
        <span
          style={{
            borderRadius: 999,
            padding: "1px 8px",
            fontSize: 10,
            fontWeight: 500,
            backgroundColor: "var(--hp-warm-100)",
            color: "var(--hp-text-secondary)",
          }}
        >
          {dg.totalChanges} change{dg.totalChanges !== 1 ? "s" : ""}
        </span>
        {dg.totalHigh > 0 && (
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
            {dg.totalHigh} high
          </span>
        )}
        {dg.totalVariations > 0 && (
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
            {dg.totalVariations} variation{dg.totalVariations !== 1 ? "s" : ""}
          </span>
        )}
        {dg.totalNeedReview > 0 && (
          <span
            style={{
              borderRadius: 999,
              padding: "1px 6px",
              fontSize: 10,
              fontWeight: 500,
              backgroundColor: "var(--hp-significant-bg)",
              color: "var(--hp-significant)",
            }}
          >
            {dg.totalNeedReview} review
          </span>
        )}
        {hasEvent && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 500,
              color: "var(--hp-critical)",
              borderRadius: 999,
              padding: "1px 6px",
              backgroundColor: "var(--hp-critical-bg)",
            }}
          >
            Event Raised
          </span>
        )}
        {pair && (
          <>
            <a
              href={`https://us02.procore.com/webclients/host/companies/${companyId}/projects/${projectId}/tools/drawings?drawing_id=${pair.drawing_id}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="Open this drawing in Procore to view and compare revisions"
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: "var(--hp-text-secondary)",
                background: "none",
                border: "1px solid var(--hp-border)",
                borderRadius: 6,
                padding: "2px 8px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              View in Procore
            </a>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeepScan(pair.drawing_number, pair.drawing_title, pair.discipline, pair.old_revision, pair.new_revision);
              }}
              disabled={isDS}
              title="Re-scan with Opus for higher accuracy (slower, higher cost)"
              aria-label={`Deep scan ${dg.number}`}
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: isDS ? "var(--hp-text-muted)" : "var(--hp-warm-800)",
                background: "none",
                border: "1px solid var(--hp-border)",
                borderRadius: 6,
                padding: "2px 8px",
                cursor: isDS ? "default" : "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {isDS ? "Scanning..." : "Deep Scan"}
            </button>
          </>
        )}
      </div>
    </div>
  );
});
