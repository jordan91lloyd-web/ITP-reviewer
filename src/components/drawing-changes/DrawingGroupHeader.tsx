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
  onRaiseChangeEvent: (ids: string[], discipline: string, title: string) => void;
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
  onRaiseChangeEvent,
  onDeepScan,
}: DrawingGroupHeaderProps) {
  const allChangeIds = dg.revisions.flatMap((r) => r.changes.map((c) => c.id));
  const hasEvent = dg.revisions.some((r) => r.changes.some((c) => c.change_event_id));
  const unreviewedCount = dg.revisions
    .flatMap((r) => r.changes)
    .filter((c) => !c.review_status || c.review_status === "needs_review").length;

  const pair = drawingPair;
  const latestRev = dg.revisions[dg.revisions.length - 1];
  const deepKey = `${dg.number}|${latestRev?.revKey}`;
  const isDS = deepScanning.has(deepKey);

  return (
    <div
      onClick={onToggle}
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
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {selectMode && (() => {
          const allSelected = allChangeIds.length > 0 && allChangeIds.every((id) => selectedChangeIds.has(id));
          return (
            <input
              type="checkbox"
              checked={allSelected}
              onClick={(e) => e.stopPropagation()}
              onChange={() => onSelectDrawingChanges(allChangeIds, !allSelected)}
              style={{ accentColor: "var(--hp-warm-800)", cursor: "pointer" }}
            />
          );
        })()}
        {isExpanded ? (
          <ChevronDown size={14} style={{ color: "var(--hp-text-muted)" }} />
        ) : (
          <ChevronRight size={14} style={{ color: "var(--hp-text-muted)" }} />
        )}
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--hp-warm-800)" }}>{dg.number}</span>
        <span style={{ fontSize: 12, color: "var(--hp-text-secondary)" }}>{dg.title}</span>
        {!hasMultipleRevs && (
          <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>Rev {dg.revisions[0]?.rev}</span>
        )}
        {hasMultipleRevs && (
          <span style={{ fontSize: 11, color: "var(--hp-warm-800)", fontWeight: 500 }}>
            {dg.revisions.length} revisions
          </span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>{dg.totalChanges}</span>
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
        {!hasEvent && unreviewedCount < dg.totalChanges && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRaiseChangeEvent(allChangeIds, discipline, `${dg.number} ${dg.title} — Drawing revision changes`);
            }}
            title="Create a draft Change Event for all changes on this drawing"
            style={{
              fontSize: 10,
              fontWeight: 500,
              color: "var(--hp-critical)",
              background: "none",
              border: "1px solid var(--hp-critical-bg)",
              borderRadius: 6,
              padding: "2px 8px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Raise Event
          </button>
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
              title="Re-scan with Opus (slower, more thorough, higher cost)"
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
