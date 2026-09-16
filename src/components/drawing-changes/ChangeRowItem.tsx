"use client";

import React, { useState } from "react";
import { ArrowRightLeft, ChevronDown, ChevronRight, X, Check, FileText, AlertTriangle } from "lucide-react";
import type { ChangeRow, ReviewStatus } from "./types";
import {
  CHANGE_TYPE_COLORS,
  CHANGE_TYPE_LABELS,
  CHANGE_TYPE_ICONS,
  SEVERITY_COLORS,
  VARIATION_RISK_STYLES,
  STATUS_OPTIONS,
} from "./constants";

const RAIL_COLORS: Record<string, string> = {
  likely_variation: "var(--hp-critical)",
  unclear: "var(--hp-significant)",
  within_scope: "var(--hp-compliant)",
};

interface ChangeRowItemProps {
  change: ChangeRow;
  selectMode: boolean;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
  onUpdateStatus: (changeIds: string[], status: ReviewStatus) => void;
  onRaiseChangeEvent?: (changeIds: string[], discipline: string, title: string) => void;
  onDownloadEvidence?: (change: ChangeRow) => void;
}

export const ChangeRowItem = React.memo(function ChangeRowItem({
  change,
  selectMode,
  isSelected,
  onToggleSelection,
  onUpdateStatus,
  onRaiseChangeEvent,
  onDownloadEvidence,
}: ChangeRowItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const typeColors = CHANGE_TYPE_COLORS[change.change_type] ?? CHANGE_TYPE_COLORS.spec_change;
  const sevColors = SEVERITY_COLORS[change.severity] ?? SEVERITY_COLORS.medium;
  const Icon = CHANGE_TYPE_ICONS[change.change_type] ?? ArrowRightLeft;

  const railColor = change.variation_risk
    ? (RAIL_COLORS[change.variation_risk] ?? "var(--hp-border)")
    : "var(--hp-border)";

  const variationRiskStyle = change.variation_risk
    ? VARIATION_RISK_STYLES[change.variation_risk]
    : null;

  const reviewStatusOption = STATUS_OPTIONS.find(
    (s) => s.value === (change.review_status ?? "needs_review")
  );

  const isLikelyVariation = change.variation_risk === "likely_variation";

  // On touch devices, always show actions
  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;
  const showActions = !selectMode && (hovered || isTouchDevice);

  const hasExpandableContent = !!(
    (change.description && change.description.length > 120) ||
    change.variation_note ||
    change.location_on_drawing
  );

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "stretch",
        borderTop: "1px solid var(--hp-border)",
        fontSize: 13,
        backgroundColor: selectMode && isSelected
          ? "var(--hp-critical-bg)"
          : hovered
            ? "var(--hp-warm-100)"
            : undefined,
        borderLeft: `4px solid ${railColor}`,
        transition: "background-color 0.15s ease",
      }}
    >
      <div
        style={{
          flex: 1,
          minWidth: 0,
          padding: "10px 12px 10px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {/* Row header: checkbox, type chip, severity chip, variation chip, status chip */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {selectMode && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelection(change.id)}
              style={{ accentColor: "var(--hp-warm-800)", cursor: "pointer", flexShrink: 0 }}
            />
          )}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              borderRadius: 999,
              padding: "2px 10px",
              fontSize: 11,
              fontWeight: 500,
              backgroundColor: typeColors.bg,
              color: typeColors.text,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <Icon size={10} />
            {CHANGE_TYPE_LABELS[change.change_type] ?? change.change_type}
          </span>
          <span
            style={{
              borderRadius: 999,
              padding: "2px 10px",
              fontSize: 11,
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
          {variationRiskStyle && (
            <span
              style={{
                borderRadius: 999,
                padding: "2px 10px",
                fontSize: 10,
                fontWeight: 600,
                backgroundColor: variationRiskStyle.bg,
                color: variationRiskStyle.text,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {variationRiskStyle.label}
            </span>
          )}
          {reviewStatusOption && change.review_status && change.review_status !== "needs_review" && (
            <span
              style={{
                borderRadius: 999,
                padding: "2px 10px",
                fontSize: 10,
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
        </div>

        {/* Description: clamped or expanded */}
        <div
          style={{ display: "flex", alignItems: "flex-start", gap: 4, cursor: hasExpandableContent ? "pointer" : undefined }}
          onClick={hasExpandableContent ? () => setExpanded((v) => !v) : undefined}
        >
          {hasExpandableContent && (
            <span style={{ flexShrink: 0, color: "var(--hp-text-muted)", marginTop: 1 }}>
              {expanded
                ? <ChevronDown size={12} />
                : <ChevronRight size={12} />
              }
            </span>
          )}
          <div style={{ flex: 1, minWidth: 0, color: "var(--hp-warm-800)" }}>
            {expanded ? (
              <>
                <div style={{ lineHeight: 1.5 }}>{change.description}</div>
                {change.variation_note && (
                  <div style={{ fontSize: 11, color: "var(--hp-text-secondary)", marginTop: 4, fontStyle: "italic", lineHeight: 1.4 }}>
                    {change.variation_note}
                  </div>
                )}
                {change.location_on_drawing && (
                  <div style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 3 }}>
                    Location: {change.location_on_drawing}
                  </div>
                )}
              </>
            ) : (
              <div
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical" as const,
                  overflow: "hidden",
                  lineHeight: 1.5,
                }}
              >
                {change.description}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right side: hover actions */}
      {showActions && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "0 12px 0 0",
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => onUpdateStatus([change.id], "not_a_variation")}
            title="Not a variation"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              borderRadius: 6,
              border: "1px solid var(--hp-border)",
              padding: "4px 8px",
              fontSize: 10,
              fontWeight: 500,
              color: "var(--hp-compliant)",
              backgroundColor: "var(--hp-surface)",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            <X size={10} /> Not Variation
          </button>
          <button
            onClick={() => onUpdateStatus([change.id], "variation_raised")}
            title="Variation raised"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              borderRadius: 6,
              border: "1px solid var(--hp-border)",
              padding: "4px 8px",
              fontSize: 10,
              fontWeight: 500,
              color: "var(--hp-critical)",
              backgroundColor: "var(--hp-surface)",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            <AlertTriangle size={10} /> Variation
          </button>
          {onRaiseChangeEvent && (
            <button
              onClick={() =>
                onRaiseChangeEvent(
                  [change.id],
                  change.discipline,
                  `${change.drawing_number} — ${change.description.slice(0, 80)}`
                )
              }
              title="Raise Change Event in Procore"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                borderRadius: 6,
                border: isLikelyVariation
                  ? "1px solid var(--hp-critical)"
                  : "1px solid var(--hp-border)",
                padding: "4px 8px",
                fontSize: 10,
                fontWeight: 600,
                color: isLikelyVariation ? "#fff" : "var(--hp-warm-800)",
                backgroundColor: isLikelyVariation
                  ? "var(--hp-critical)"
                  : "var(--hp-surface)",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Raise Event
            </button>
          )}
          {onDownloadEvidence && (
            <button
              onClick={() => onDownloadEvidence(change)}
              title="Download evidence sheet PDF"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                borderRadius: 6,
                border: "1px solid var(--hp-border)",
                padding: "4px 8px",
                fontSize: 10,
                fontWeight: 500,
                color: "var(--hp-text-secondary)",
                backgroundColor: "var(--hp-surface)",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              <FileText size={10} /> Evidence
            </button>
          )}
        </div>
      )}
    </div>
  );
});
