"use client";

import React, { useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  ChevronDown,
  ChevronRight,
  Search,
} from "lucide-react";
import type { DrawingPair, RevisionInfo, ScanRecord, ChangeRow, PickerFlatRow } from "./types";
import { fmtDate } from "./constants";
import { friendlyDiscipline } from "./disciplineNames";
import { DrawingListSkeleton } from "./Skeletons";

interface ScanPanelProps {
  drawingPairs: DrawingPair[];
  selectedIds: Set<number>;
  filterText: string;
  collapsedDiscovery: Set<string>;
  revisionOverrides: Map<number, { old: RevisionInfo; new: RevisionInfo }>;
  disciplinePageSize: Map<string, number>;
  showScanConfirm: boolean;
  loading: boolean;
  totalDrawings: number;
  scan: ScanRecord | null;
  changes: ChangeRow[];
  onToggleDrawing: (id: number) => void;
  onToggleDisciplineSelection: (discipline: string, pairs: DrawingPair[]) => void;
  onSelectAll: () => void;
  onSelectUnscanned: () => void;
  onSelectNone: () => void;
  onToggleDiscoverySection: (discipline: string) => void;
  onExpandAllDiscovery: () => void;
  onCollapseAllDiscovery: () => void;
  onSetFilterText: (text: string) => void;
  onSetRevisionOverrides: React.Dispatch<React.SetStateAction<Map<number, { old: RevisionInfo; new: RevisionInfo }>>>;
  onSetDisciplinePageSize: React.Dispatch<React.SetStateAction<Map<string, number>>>;
  onSetShowScanConfirm: (v: boolean) => void;
  onRunScan: () => void;
  onGoToRegister: () => void;
}

const DisciplineHeader = React.memo(function DisciplineHeader({
  discipline,
  count,
  selectedCount,
  allSelected,
  isCollapsed,
  isFirst,
  onToggle,
  onToggleSelection,
}: {
  discipline: string;
  count: number;
  selectedCount: number;
  allSelected: boolean;
  isCollapsed: boolean;
  isFirst: boolean;
  onToggle: () => void;
  onToggleSelection: () => void;
}) {
  const friendly = friendlyDiscipline(discipline);
  const checkboxId = `disc-chk-${discipline}`;
  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={!isCollapsed}
      aria-label={`${friendly} - ${count} drawing${count !== 1 ? "s" : ""}`}
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
        padding: "10px 16px",
        backgroundColor: "var(--hp-warm-100)",
        borderTop: !isFirst ? "1px solid var(--hp-border)" : "none",
        cursor: "pointer",
        userSelect: "none",
      }}
      onClick={onToggle}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {isCollapsed ? (
          <ChevronRight size={16} style={{ color: "var(--hp-text-muted)" }} aria-hidden="true" />
        ) : (
          <ChevronDown size={16} style={{ color: "var(--hp-text-muted)" }} aria-hidden="true" />
        )}
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--hp-warm-800)" }}>{friendly}</span>
        <span style={{ fontSize: 12, color: "var(--hp-text-muted)", fontWeight: 400 }}>
          ({count} drawing{count !== 1 ? "s" : ""})
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <label htmlFor={checkboxId} style={{ fontSize: 11, color: "var(--hp-text-muted)", cursor: "pointer" }}>
          {selectedCount}/{count} selected
        </label>
        <input
          id={checkboxId}
          type="checkbox"
          checked={allSelected}
          onChange={(e) => {
            e.stopPropagation();
            onToggleSelection();
          }}
          onClick={(e) => e.stopPropagation()}
          style={{ accentColor: "var(--hp-warm-800)" }}
        />
      </div>
    </div>
  );
});

const DrawingRow = React.memo(function DrawingRow({
  pair,
  isSelected,
  activeOld,
  activeNew,
  onToggle,
  onSetRevisionOverrides,
}: {
  pair: DrawingPair;
  isSelected: boolean;
  activeOld: RevisionInfo;
  activeNew: RevisionInfo;
  onToggle: () => void;
  onSetRevisionOverrides: ScanPanelProps["onSetRevisionOverrides"];
}) {
  const [showRevOverride, setShowRevOverride] = useState(false);

  const statusColor =
    pair.status === "scanned"
      ? "var(--hp-compliant)"
      : pair.status === "new_revision"
        ? "var(--hp-significant)"
        : "var(--hp-text-muted)";
  const statusBg =
    pair.status === "scanned"
      ? "var(--hp-compliant-bg)"
      : pair.status === "new_revision"
        ? "var(--hp-significant-bg)"
        : "var(--hp-warm-100)";
  const statusLabel =
    pair.status === "scanned" ? "Scanned" : pair.status === "new_revision" ? "New Rev" : "Not scanned";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "6px 16px 6px 44px",
        borderTop: "1px solid var(--hp-border)",
        fontSize: 13,
      }}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggle}
        aria-label={`Select ${pair.drawing_number}`}
        style={{ accentColor: "var(--hp-warm-800)", cursor: "pointer", flexShrink: 0 }}
      />
      <span style={{ fontWeight: 500, color: "var(--hp-text-primary)", whiteSpace: "nowrap" }}>
        {pair.drawing_number}
      </span>
      <span
        style={{
          color: "var(--hp-text-secondary)",
          flex: 1,
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {pair.drawing_title}
      </span>
      <span
        style={{
          fontSize: 10,
          fontWeight: 500,
          borderRadius: 999,
          padding: "1px 6px",
          backgroundColor: statusBg,
          color: statusColor,
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {statusLabel}
      </span>

      {/* Rev display: plain text by default, dropdowns if overriding */}
      {pair.revisions.length > 2 && showRevOverride ? (
        <>
          <select
            value={activeOld.revision_number}
            onChange={(e) => {
              const rev = pair.revisions.find((r) => r.revision_number === e.target.value);
              if (rev)
                onSetRevisionOverrides((prev) => {
                  const next = new Map(prev);
                  next.set(pair.drawing_id, { old: rev, new: activeNew });
                  return next;
                });
            }}
            style={{
              fontSize: 11,
              border: "1px solid var(--hp-border)",
              borderRadius: 4,
              padding: "1px 4px",
              color: "var(--hp-text-secondary)",
              backgroundColor: "var(--hp-surface)",
              flexShrink: 0,
            }}
          >
            {pair.revisions.slice(0, -1).map((r) => (
              <option key={r.revision_number} value={r.revision_number}>
                Rev {r.revision_number}
              </option>
            ))}
          </select>
          <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>{"\u2192"}</span>
          <select
            value={activeNew.revision_number}
            onChange={(e) => {
              const rev = pair.revisions.find((r) => r.revision_number === e.target.value);
              if (rev)
                onSetRevisionOverrides((prev) => {
                  const next = new Map(prev);
                  next.set(pair.drawing_id, { old: activeOld, new: rev });
                  return next;
                });
            }}
            style={{
              fontSize: 11,
              border: "1px solid var(--hp-border)",
              borderRadius: 4,
              padding: "1px 4px",
              color: "var(--hp-text-secondary)",
              backgroundColor: "var(--hp-surface)",
              flexShrink: 0,
            }}
          >
            {pair.revisions.slice(1).map((r) => (
              <option key={r.revision_number} value={r.revision_number}>
                Rev {r.revision_number}
              </option>
            ))}
          </select>
        </>
      ) : (
        <span style={{ fontSize: 11, color: "var(--hp-text-muted)", flexShrink: 0, display: "flex", alignItems: "center", gap: 4 }}>
          Rev {activeOld.revision_number} {"\u2192"} {activeNew.revision_number}
          {pair.revisions.length > 2 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowRevOverride(true);
              }}
              style={{
                fontSize: 10,
                color: "var(--hp-warm-800)",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                padding: 0,
                marginLeft: 2,
              }}
            >
              adjust revs
            </button>
          )}
        </span>
      )}
    </div>
  );
});

export const ScanPanel = React.memo(function ScanPanel({
  drawingPairs,
  selectedIds,
  filterText,
  collapsedDiscovery,
  revisionOverrides,
  disciplinePageSize,
  showScanConfirm,
  loading,
  totalDrawings,
  scan,
  changes,
  onToggleDrawing,
  onToggleDisciplineSelection,
  onSelectAll,
  onSelectUnscanned,
  onSelectNone,
  onToggleDiscoverySection,
  onExpandAllDiscovery,
  onCollapseAllDiscovery,
  onSetFilterText,
  onSetRevisionOverrides,
  onSetDisciplinePageSize,
  onSetShowScanConfirm,
  onRunScan,
  onGoToRegister,
}: ScanPanelProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const isSearching = filterText.length > 0;

  const unscannedCount = useMemo(
    () => drawingPairs.filter((d) => d.status !== "scanned").length,
    [drawingPairs]
  );

  const filteredPairs = useMemo(() => {
    if (!isSearching) return drawingPairs;
    const lower = filterText.toLowerCase();
    return drawingPairs.filter(
      (d) =>
        d.drawing_number.toLowerCase().includes(lower) ||
        d.drawing_title.toLowerCase().includes(lower) ||
        d.discipline.toLowerCase().includes(lower)
    );
  }, [drawingPairs, filterText, isSearching]);

  const pairsByDiscipline = useMemo(() => {
    const map: Record<string, DrawingPair[]> = {};
    for (const pair of filteredPairs) {
      if (!map[pair.discipline]) map[pair.discipline] = [];
      map[pair.discipline].push(pair);
    }
    return map;
  }, [filteredPairs]);

  const disciplineEntries = useMemo(
    () => Object.entries(pairsByDiscipline).sort(([a], [b]) => a.localeCompare(b)),
    [pairsByDiscipline]
  );

  // Build flat rows for virtualization
  const flatRows = useMemo(() => {
    const rows: PickerFlatRow[] = [];
    for (let di = 0; di < disciplineEntries.length; di++) {
      const [discipline, pairs] = disciplineEntries[di];
      const isCollapsed = isSearching ? false : collapsedDiscovery.has(discipline);
      const selCount = pairs.filter((p) => selectedIds.has(p.drawing_id)).length;
      const allSelected = selCount === pairs.length && pairs.length > 0;

      rows.push({
        type: "discipline-header",
        key: `disc-${discipline}`,
        discipline,
        count: pairs.length,
        selectedCount: selCount,
        allSelected,
      });

      if (!isCollapsed) {
        const pageSize = disciplinePageSize.get(discipline) ?? 50;
        const visiblePairs = pairs.slice(0, pageSize);
        for (const pair of visiblePairs) {
          rows.push({ type: "drawing-row", key: `draw-${pair.drawing_id}`, pair });
        }
      }
    }
    return rows;
  }, [disciplineEntries, isSearching, collapsedDiscovery, selectedIds, disciplinePageSize]);

  const virtualizer = useVirtualizer({
    count: flatRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => (flatRows[index].type === "discipline-header" ? 44 : 36),
    overscan: 15,
  });

  if (loading) {
    return <DrawingListSkeleton />;
  }

  if (drawingPairs.length === 0) {
    return (
      <div
        style={{
          borderRadius: 12,
          border: "1px solid var(--hp-border)",
          padding: "48px 32px",
          textAlign: "center",
          backgroundColor: "var(--hp-surface)",
        }}
      >
        <Search size={32} style={{ color: "var(--hp-text-muted)", marginBottom: 12 }} aria-hidden="true" />
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--hp-text-primary)", marginBottom: 6 }}>
          No drawings with multiple revisions found
        </div>
        <div style={{ fontSize: 13, color: "var(--hp-text-secondary)", maxWidth: 400, margin: "0 auto" }}>
          {totalDrawings > 0
            ? `${totalDrawings} drawing${totalDrawings !== 1 ? "s are" : " is"} all on ${totalDrawings !== 1 ? "their" : "its"} first revision. Changes will appear here when new revisions are issued.`
            : "No drawings found in this project. Upload drawings to Procore to get started."}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 240px)" }}>
      {/* Search box at top */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: 9, color: "var(--hp-text-muted)" }} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search drawings by number, title, or discipline..."
            value={filterText}
            onChange={(e) => onSetFilterText(e.target.value)}
            style={{
              borderRadius: 8,
              border: "1px solid var(--hp-border)",
              padding: "7px 12px 7px 30px",
              fontSize: 13,
              backgroundColor: "var(--hp-surface)",
              color: "var(--hp-text-primary)",
              width: "100%",
            }}
          />
        </div>
      </div>

      {/* Selection buttons */}
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
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {unscannedCount > 0 && (
            <button
              onClick={onSelectUnscanned}
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#fff",
                backgroundColor: "var(--hp-warm-800)",
                border: "none",
                borderRadius: 6,
                padding: "6px 14px",
                cursor: "pointer",
              }}
            >
              Select all unscanned ({unscannedCount})
            </button>
          )}
          <button
            onClick={onSelectAll}
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "var(--hp-text-secondary)",
              background: "none",
              border: "1px solid var(--hp-border)",
              borderRadius: 6,
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            Select all
          </button>
          <button
            onClick={onSelectNone}
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "var(--hp-text-muted)",
              background: "none",
              border: "1px solid var(--hp-border)",
              borderRadius: 6,
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "var(--hp-text-secondary)" }}>
            <strong style={{ color: "var(--hp-text-primary)" }}>{drawingPairs.length}</strong> drawings with revisions
            ({totalDrawings} total)
          </span>
          <button
            onClick={onExpandAllDiscovery}
            style={{
              fontSize: 11,
              background: "none",
              border: "1px solid var(--hp-border)",
              borderRadius: 6,
              padding: "4px 8px",
              cursor: "pointer",
              color: "var(--hp-text-secondary)",
            }}
          >
            Expand All
          </button>
          <button
            onClick={onCollapseAllDiscovery}
            style={{
              fontSize: 11,
              background: "none",
              border: "1px solid var(--hp-border)",
              borderRadius: 6,
              padding: "4px 8px",
              cursor: "pointer",
              color: "var(--hp-text-secondary)",
            }}
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Virtualized discipline accordion */}
      <div
        ref={parentRef}
        style={{
          borderRadius: 8,
          border: "1px solid var(--hp-border)",
          overflow: "auto",
          flex: 1,
          minHeight: 0,
        }}
      >
        <div style={{ height: virtualizer.getTotalSize(), width: "100%", position: "relative" }}>
          {virtualizer.getVirtualItems().map((vi) => {
            const row = flatRows[vi.index];
            return (
              <div
                key={row.key}
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
                {row.type === "discipline-header" ? (
                  <DisciplineHeader
                    discipline={row.discipline}
                    count={row.count}
                    selectedCount={row.selectedCount}
                    allSelected={row.allSelected}
                    isCollapsed={isSearching ? false : collapsedDiscovery.has(row.discipline)}
                    isFirst={vi.index === 0}
                    onToggle={() => onToggleDiscoverySection(row.discipline)}
                    onToggleSelection={() =>
                      onToggleDisciplineSelection(row.discipline, pairsByDiscipline[row.discipline])
                    }
                  />
                ) : (
                  (() => {
                    const pair = row.pair;
                    const override = revisionOverrides.get(pair.drawing_id);
                    const activeOld = override?.old ?? pair.old_revision;
                    const activeNew = override?.new ?? pair.new_revision;
                    return (
                      <DrawingRow
                        pair={pair}
                        isSelected={selectedIds.has(pair.drawing_id)}
                        activeOld={activeOld}
                        activeNew={activeNew}
                        onToggle={() => onToggleDrawing(pair.drawing_id)}
                        onSetRevisionOverrides={onSetRevisionOverrides}
                      />
                    );
                  })()
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* "Show more" buttons for truncated disciplines */}
      {disciplineEntries.map(([discipline, pairs]) => {
        const isCollapsed = isSearching ? false : collapsedDiscovery.has(discipline);
        if (isCollapsed) return null;
        const pageSize = disciplinePageSize.get(discipline) ?? 50;
        if (pairs.length <= pageSize) return null;
        return (
          <button
            key={`more-${discipline}`}
            onClick={() =>
              onSetDisciplinePageSize((prev) => {
                const next = new Map(prev);
                next.set(discipline, pageSize + 50);
                return next;
              })
            }
            style={{
              width: "100%",
              padding: "8px 16px",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--hp-warm-800)",
              background: "none",
              border: "1px solid var(--hp-border)",
              borderRadius: 6,
              cursor: "pointer",
              textAlign: "center",
              marginTop: 4,
            }}
          >
            {friendlyDiscipline(discipline)}: Show more ({pairs.length - pageSize} remaining)
          </button>
        );
      })}

      {/* Sticky bottom scan bar */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "var(--hp-surface)",
          borderTop: "1px solid var(--hp-border)",
          padding: "10px 16px",
          marginTop: 8,
          borderRadius: "0 0 8px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {!showScanConfirm ? (
            <button
              onClick={() => {
                if (selectedIds.size > 50) onSetShowScanConfirm(true);
                else onRunScan();
              }}
              disabled={selectedIds.size === 0}
              style={{
                borderRadius: 8,
                padding: "8px 18px",
                fontSize: 13,
                fontWeight: 600,
                color: "#fff",
                backgroundColor: "var(--hp-warm-800)",
                opacity: selectedIds.size === 0 ? 0.4 : 1,
                border: "none",
                cursor: selectedIds.size === 0 ? "default" : "pointer",
              }}
            >
              Scan {selectedIds.size} Drawing{selectedIds.size !== 1 ? "s" : ""}
            </button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, color: "var(--hp-significant)" }}>
                Scan {selectedIds.size} drawings? This will take several minutes.
              </span>
              <button
                onClick={() => {
                  onSetShowScanConfirm(false);
                  onRunScan();
                }}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#fff",
                  backgroundColor: "var(--hp-warm-800)",
                  border: "none",
                  borderRadius: 6,
                  padding: "4px 12px",
                  cursor: "pointer",
                }}
              >
                Confirm
              </button>
              <button
                onClick={() => onSetShowScanConfirm(false)}
                style={{
                  fontSize: 12,
                  color: "var(--hp-text-muted)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          )}
          <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>
            ~{selectedIds.size * 2} PDFs to download
          </span>
        </div>
        {scan && changes.length > 0 && (
          <button
            onClick={onGoToRegister}
            style={{
              fontSize: 12,
              color: "var(--hp-warm-800)",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            View Register ({changes.length} changes)
          </button>
        )}
      </div>
    </div>
  );
});
