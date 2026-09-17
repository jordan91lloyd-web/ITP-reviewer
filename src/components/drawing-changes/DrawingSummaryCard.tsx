"use client";

import React, { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Check,
  X,
  FileText,
  ArrowRightLeft,
} from "lucide-react";
import type { ChangeRow, ReviewStatus } from "./types";
import {
  CHANGE_TYPE_COLORS,
  CHANGE_TYPE_LABELS,
  CHANGE_TYPE_ICONS,
  SEVERITY_COLORS,
  VARIATION_RISK_STYLES,
  STATUS_OPTIONS,
} from "./constants";

export interface DrawingSummary {
  drawingNumber: string;
  drawingTitle: string;
  discipline: string;
  changes: ChangeRow[];
  revisionRange: string;
  latestRevKey: string;
  netVerdict: "likely_variation" | "unclear" | "within_scope" | "no_baseline";
  likelyCount: number;
  unclearCount: number;
  withinScopeCount: number;
  unreviewedCount: number;
}

interface DrawingSummaryCardProps {
  summary: DrawingSummary;
  onUpdateStatus: (changeIds: string[], status: ReviewStatus) => void;
  onRaiseChangeEvent: (changeIds: string[], discipline: string, title: string) => void;
  onDownloadEvidence: (change: ChangeRow) => void;
}

const VERDICT_STYLES: Record<string, { label: string; bg: string; text: string; border: string }> = {
  likely_variation: {
    label: "Likely Variation",
    bg: "var(--hp-critical-bg)",
    text: "var(--hp-critical)",
    border: "var(--hp-critical)",
  },
  unclear: {
    label: "Unclear",
    bg: "var(--hp-significant-bg)",
    text: "var(--hp-significant)",
    border: "var(--hp-significant)",
  },
  within_scope: {
    label: "Within Scope",
    bg: "var(--hp-compliant-bg)",
    text: "var(--hp-compliant)",
    border: "var(--hp-compliant)",
  },
  no_baseline: {
    label: "No Baseline",
    bg: "var(--hp-warm-100)",
    text: "var(--hp-text-muted)",
    border: "var(--hp-border)",
  },
};

const RAIL_COLORS: Record<string, string> = {
  likely_variation: "var(--hp-critical)",
  unclear: "var(--hp-significant)",
  within_scope: "var(--hp-compliant)",
};

export const DrawingSummaryCard = React.memo(function DrawingSummaryCard({
  summary,
  onUpdateStatus,
  onRaiseChangeEvent,
  onDownloadEvidence,
}: DrawingSummaryCardProps) {
  const [showAllChanges, setShowAllChanges] = useState(false);

  const verdictStyle = VERDICT_STYLES[summary.netVerdict] ?? VERDICT_STYLES.no_baseline;

  // Split changes: show likely_variation and unclear by default, within_scope collapsed
  const { prominentChanges, withinScopeChanges } = useMemo(() => {
    const prominent: ChangeRow[] = [];
    const withinScope: ChangeRow[] = [];
    for (const c of summary.changes) {
      if (c.variation_risk === "within_scope") {
        withinScope.push(c);
      } else {
        prominent.push(c);
      }
    }
    return { prominentChanges: prominent, withinScopeChanges: withinScope };
  }, [summary.changes]);

  const displayChanges = showAllChanges
    ? summary.changes
    : prominentChanges;

  // Batch action helpers
  const withinScopeUnreviewed = summary.changes.filter(
    (c) => c.variation_risk === "within_scope" && (!c.review_status || c.review_status === "needs_review")
  );
  const likelyVariationUnreviewed = summary.changes.filter(
    (c) => c.variation_risk === "likely_variation" && (!c.review_status || c.review_status === "needs_review")
  );

  return (
    <div
      style={{
        borderRadius: 10,
        border: `1px solid ${verdictStyle.border}`,
        backgroundColor: "var(--hp-surface)",
        marginBottom: 10,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "14px 16px 10px 16px",
          backgroundColor: verdictStyle.bg,
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--hp-text-primary)" }}>
              {summary.drawingNumber}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                borderRadius: 999,
                padding: "2px 10px",
                backgroundColor: "var(--hp-warm-100)",
                color: "var(--hp-text-muted)",
              }}
            >
              {summary.discipline}
            </span>
          </div>
          {summary.drawingTitle && (
            <div style={{ fontSize: 12, color: "var(--hp-text-secondary)", marginTop: 3 }}>
              {summary.drawingTitle}
            </div>
          )}
          <div style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 3 }}>
            {summary.revisionRange}
          </div>
        </div>

        {/* Net verdict badge */}
        <span
          style={{
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 700,
            backgroundColor: verdictStyle.text,
            color: "#fff",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {verdictStyle.label}
        </span>
      </div>

      {/* Net assessment row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 16px",
          borderBottom: "1px solid var(--hp-border)",
          flexWrap: "wrap",
        }}
      >
        {summary.likelyCount > 0 && (
          <span
            style={{
              borderRadius: 999,
              padding: "2px 9px",
              fontSize: 11,
              fontWeight: 500,
              backgroundColor: "var(--hp-critical-bg)",
              color: "var(--hp-critical)",
            }}
          >
            {summary.likelyCount} Likely Variation{summary.likelyCount !== 1 ? "s" : ""}
          </span>
        )}
        {summary.unclearCount > 0 && (
          <span
            style={{
              borderRadius: 999,
              padding: "2px 9px",
              fontSize: 11,
              fontWeight: 500,
              backgroundColor: "var(--hp-significant-bg)",
              color: "var(--hp-significant)",
            }}
          >
            {summary.unclearCount} Unclear
          </span>
        )}
        {summary.withinScopeCount > 0 && (
          <span
            style={{
              borderRadius: 999,
              padding: "2px 9px",
              fontSize: 11,
              fontWeight: 500,
              backgroundColor: "var(--hp-compliant-bg)",
              color: "var(--hp-compliant)",
            }}
          >
            {summary.withinScopeCount} Within Scope
          </span>
        )}
        {summary.unreviewedCount > 0 && (
          <span
            style={{
              borderRadius: 999,
              padding: "2px 9px",
              fontSize: 11,
              fontWeight: 500,
              backgroundColor: "var(--hp-significant-bg)",
              color: "var(--hp-significant)",
            }}
          >
            {summary.unreviewedCount} Unreviewed
          </span>
        )}
        <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>
          {summary.changes.length} total change{summary.changes.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Changes list */}
      {displayChanges.length > 0 && (
        <div style={{ padding: "0" }}>
          {displayChanges.map((change) => {
            const revKey = `${change.old_revision}|${change.new_revision}`;
            const isLatest = revKey === summary.latestRevKey;
            const typeColors = CHANGE_TYPE_COLORS[change.change_type] ?? CHANGE_TYPE_COLORS.spec_change;
            const sevColors = SEVERITY_COLORS[change.severity] ?? SEVERITY_COLORS.medium;
            const Icon = CHANGE_TYPE_ICONS[change.change_type] ?? ArrowRightLeft;
            const railColor = change.variation_risk
              ? (RAIL_COLORS[change.variation_risk] ?? "var(--hp-border)")
              : "var(--hp-border)";

            const reviewStatusOption = STATUS_OPTIONS.find(
              (s) => s.value === (change.review_status ?? "needs_review")
            );

            return (
              <CompactChangeRow
                key={change.id}
                change={change}
                isLatest={isLatest}
                revKey={revKey}
                typeColors={typeColors}
                sevColors={sevColors}
                Icon={Icon}
                railColor={railColor}
                reviewStatusOption={reviewStatusOption}
                onUpdateStatus={onUpdateStatus}
                onRaiseChangeEvent={onRaiseChangeEvent}
                onDownloadEvidence={onDownloadEvidence}
              />
            );
          })}
        </div>
      )}

      {/* Show/hide within_scope toggle and batch actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          padding: "8px 16px",
          borderTop: displayChanges.length > 0 ? "1px solid var(--hp-border)" : "none",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {withinScopeChanges.length > 0 && (
            <button
              onClick={() => setShowAllChanges((v) => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                borderRadius: 6,
                border: "1px solid var(--hp-border)",
                padding: "4px 10px",
                fontSize: 11,
                fontWeight: 500,
                color: "var(--hp-text-secondary)",
                backgroundColor: "var(--hp-surface)",
                cursor: "pointer",
              }}
            >
              {showAllChanges ? (
                <>
                  <ChevronDown size={11} /> Hide {withinScopeChanges.length} within scope
                </>
              ) : (
                <>
                  <ChevronRight size={11} /> Show {withinScopeChanges.length} within scope
                </>
              )}
            </button>
          )}
          {prominentChanges.length === 0 && withinScopeChanges.length === 0 && (
            <span style={{ fontSize: 12, color: "var(--hp-text-muted)" }}>
              No changes to display
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {withinScopeUnreviewed.length > 0 && (
            <button
              onClick={() =>
                onUpdateStatus(
                  withinScopeUnreviewed.map((c) => c.id),
                  "not_a_variation"
                )
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                borderRadius: 6,
                border: "1px solid var(--hp-compliant)",
                padding: "4px 10px",
                fontSize: 11,
                fontWeight: 600,
                color: "var(--hp-compliant)",
                backgroundColor: "var(--hp-surface)",
                cursor: "pointer",
              }}
            >
              <Check size={11} /> Accept {withinScopeUnreviewed.length} within scope
            </button>
          )}
          {likelyVariationUnreviewed.length > 0 && (
            <button
              onClick={() =>
                onRaiseChangeEvent(
                  likelyVariationUnreviewed.map((c) => c.id),
                  summary.discipline,
                  `${summary.drawingNumber} — ${likelyVariationUnreviewed.length} variation${likelyVariationUnreviewed.length !== 1 ? "s" : ""} detected`
                )
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                borderRadius: 6,
                border: "1px solid var(--hp-critical)",
                padding: "4px 10px",
                fontSize: 11,
                fontWeight: 600,
                color: "#fff",
                backgroundColor: "var(--hp-critical)",
                cursor: "pointer",
              }}
            >
              <AlertTriangle size={11} /> Raise Change Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

// ── Compact change row within a DrawingSummaryCard ─────────────────────

interface CompactChangeRowProps {
  change: ChangeRow;
  isLatest: boolean;
  revKey: string;
  typeColors: { bg: string; text: string };
  sevColors: { bg: string; text: string };
  Icon: typeof ArrowRightLeft;
  railColor: string;
  reviewStatusOption: { value: string; label: string; color: string; bg: string } | undefined;
  onUpdateStatus: (changeIds: string[], status: ReviewStatus) => void;
  onRaiseChangeEvent: (changeIds: string[], discipline: string, title: string) => void;
  onDownloadEvidence: (change: ChangeRow) => void;
}

const CompactChangeRow = React.memo(function CompactChangeRow({
  change,
  isLatest,
  revKey,
  typeColors,
  sevColors,
  Icon,
  railColor,
  reviewStatusOption,
  onUpdateStatus,
  onRaiseChangeEvent,
  onDownloadEvidence,
}: CompactChangeRowProps) {
  const [hovered, setHovered] = useState(false);
  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;
  const showActions = hovered || isTouchDevice;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: isLatest ? "8px 12px 8px 0" : "6px 12px 6px 0",
        borderTop: "1px solid var(--hp-border)",
        borderLeft: `3px solid ${railColor}`,
        opacity: isLatest ? 1 : 0.7,
        backgroundColor: hovered ? "var(--hp-warm-100)" : undefined,
        transition: "background-color 0.15s ease",
      }}
    >
      <div style={{ flex: 1, minWidth: 0, paddingLeft: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 3,
              borderRadius: 999,
              padding: "1px 8px",
              fontSize: isLatest ? 11 : 10,
              fontWeight: 500,
              backgroundColor: typeColors.bg,
              color: typeColors.text,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <Icon size={isLatest ? 10 : 9} />
            {CHANGE_TYPE_LABELS[change.change_type] ?? change.change_type}
          </span>
          <span
            style={{
              borderRadius: 999,
              padding: "1px 8px",
              fontSize: isLatest ? 11 : 10,
              fontWeight: 500,
              textTransform: "capitalize",
              backgroundColor: sevColors.bg,
              color: sevColors.text,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {change.severity}
          </span>
          {change.variation_risk && VARIATION_RISK_STYLES[change.variation_risk] && (
            <span
              style={{
                borderRadius: 999,
                padding: "1px 8px",
                fontSize: isLatest ? 10 : 9,
                fontWeight: 600,
                backgroundColor: VARIATION_RISK_STYLES[change.variation_risk].bg,
                color: VARIATION_RISK_STYLES[change.variation_risk].text,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {VARIATION_RISK_STYLES[change.variation_risk].label}
            </span>
          )}
          {reviewStatusOption && change.review_status && change.review_status !== "needs_review" && (
            <span
              style={{
                borderRadius: 999,
                padding: "1px 8px",
                fontSize: isLatest ? 10 : 9,
                fontWeight: 500,
                backgroundColor: reviewStatusOption.bg,
                color: reviewStatusOption.color,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {reviewStatusOption.label}
            </span>
          )}
          {!isLatest && (
            <span
              style={{
                fontSize: 10,
                color: "var(--hp-text-muted)",
                fontStyle: "italic",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Rev {change.old_revision}{"\u2192"}{change.new_revision}
            </span>
          )}
        </div>
        <div
          style={{
            fontSize: isLatest ? 12 : 11,
            color: "var(--hp-warm-800)",
            marginTop: 3,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
            lineHeight: 1.4,
          }}
        >
          {change.description}
        </div>
      </div>

      {/* Hover actions */}
      {showActions && (
        <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
          <button
            onClick={() => onUpdateStatus([change.id], "not_a_variation")}
            title="Not a variation"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              borderRadius: 5,
              border: "1px solid var(--hp-border)",
              padding: "3px 6px",
              fontSize: 10,
              fontWeight: 500,
              color: "var(--hp-compliant)",
              backgroundColor: "var(--hp-surface)",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            <X size={9} /> Not Var
          </button>
          <button
            onClick={() => onUpdateStatus([change.id], "variation_raised")}
            title="Variation raised"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              borderRadius: 5,
              border: "1px solid var(--hp-border)",
              padding: "3px 6px",
              fontSize: 10,
              fontWeight: 500,
              color: "var(--hp-critical)",
              backgroundColor: "var(--hp-surface)",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            <AlertTriangle size={9} /> Var
          </button>
          <button
            onClick={() => onDownloadEvidence(change)}
            title="Download evidence"
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: 5,
              border: "1px solid var(--hp-border)",
              padding: "3px 6px",
              fontSize: 10,
              color: "var(--hp-text-secondary)",
              backgroundColor: "var(--hp-surface)",
              cursor: "pointer",
            }}
          >
            <FileText size={9} />
          </button>
        </div>
      )}
    </div>
  );
});

// ── Helper: build DrawingSummary from grouped ChangeRows ──────────────

export function buildDrawingSummaries(changes: ChangeRow[]): DrawingSummary[] {
  const byDrawing = new Map<string, ChangeRow[]>();
  for (const c of changes) {
    const key = c.drawing_number;
    if (!byDrawing.has(key)) byDrawing.set(key, []);
    byDrawing.get(key)!.push(c);
  }

  const summaries: DrawingSummary[] = [];

  for (const [drawingNumber, drawingChanges] of byDrawing) {
    const first = drawingChanges[0];

    // Build revision range
    const revPairs = new Map<string, { old: string; new: string }>();
    for (const c of drawingChanges) {
      const key = `${c.old_revision}|${c.new_revision}`;
      if (!revPairs.has(key)) revPairs.set(key, { old: c.old_revision, new: c.new_revision });
    }
    const pairs = [...revPairs.values()];

    // Determine the latest revision pair (the one with the highest new_revision)
    const sortedPairs = [...pairs].sort((a, b) => a.new.localeCompare(b.new));
    const latest = sortedPairs[sortedPairs.length - 1];
    const latestRevKey = `${latest.old}|${latest.new}`;

    // Build revision range string
    let revisionRange: string;
    if (pairs.length === 1) {
      revisionRange = `Rev ${pairs[0].old} \u2192 Rev ${pairs[0].new}`;
    } else {
      // Collect all unique revisions in order
      const allRevs = new Set<string>();
      for (const p of sortedPairs) {
        allRevs.add(p.old);
        allRevs.add(p.new);
      }
      const revList = [...allRevs].sort();
      const first = revList[0];
      const last = revList[revList.length - 1];
      const mid = revList.slice(1, -1);
      revisionRange = `Rev ${first} \u2192 Rev ${last}${mid.length > 0 ? ` via ${mid.join(", ")}` : ""}`;
    }

    // Counts
    const likelyCount = drawingChanges.filter((c) => c.variation_risk === "likely_variation").length;
    const unclearCount = drawingChanges.filter((c) => c.variation_risk === "unclear").length;
    const withinScopeCount = drawingChanges.filter((c) => c.variation_risk === "within_scope").length;
    const unreviewedCount = drawingChanges.filter(
      (c) => !c.review_status || c.review_status === "needs_review"
    ).length;

    // Net verdict
    let netVerdict: DrawingSummary["netVerdict"];
    const hasBaseline = drawingChanges.some((c) => c.variation_risk !== null && c.variation_risk !== undefined);
    if (!hasBaseline) {
      netVerdict = "no_baseline";
    } else if (likelyCount > 0) {
      netVerdict = "likely_variation";
    } else if (unclearCount > 0) {
      netVerdict = "unclear";
    } else {
      netVerdict = "within_scope";
    }

    summaries.push({
      drawingNumber,
      drawingTitle: first.drawing_title,
      discipline: first.discipline,
      changes: drawingChanges,
      revisionRange,
      latestRevKey,
      netVerdict,
      likelyCount,
      unclearCount,
      withinScopeCount,
      unreviewedCount,
    });
  }

  // Sort: likely variations first, then unclear, then within_scope, then no_baseline
  // Within each group, sort by unreviewedCount descending
  const verdictOrder: Record<string, number> = {
    likely_variation: 0,
    unclear: 1,
    within_scope: 2,
    no_baseline: 3,
  };

  summaries.sort((a, b) => {
    const va = verdictOrder[a.netVerdict] ?? 9;
    const vb = verdictOrder[b.netVerdict] ?? 9;
    if (va !== vb) return va - vb;
    return b.unreviewedCount - a.unreviewedCount;
  });

  return summaries;
}
