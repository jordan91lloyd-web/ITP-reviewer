"use client";

import React from "react";
import { ArrowRightLeft } from "lucide-react";
import type { ChangeRow, ReviewStatus } from "./types";
import {
  CHANGE_TYPE_COLORS,
  CHANGE_TYPE_LABELS,
  CHANGE_TYPE_ICONS,
  SEVERITY_COLORS,
  VARIATION_RISK_STYLES,
  STATUS_OPTIONS,
} from "./constants";

interface ChangeRowItemProps {
  change: ChangeRow;
  selectMode: boolean;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
  onUpdateStatus: (changeIds: string[], status: ReviewStatus) => void;
}

export const ChangeRowItem = React.memo(function ChangeRowItem({
  change,
  selectMode,
  isSelected,
  onToggleSelection,
  onUpdateStatus,
}: ChangeRowItemProps) {
  const typeColors = CHANGE_TYPE_COLORS[change.change_type] ?? CHANGE_TYPE_COLORS.spec_change;
  const sevColors = SEVERITY_COLORS[change.severity] ?? SEVERITY_COLORS.medium;
  const Icon = CHANGE_TYPE_ICONS[change.change_type] ?? ArrowRightLeft;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "10px 16px 10px 72px",
        borderTop: "1px solid var(--hp-border)",
        fontSize: 13,
        backgroundColor: selectMode && isSelected ? "var(--hp-critical-bg)" : undefined,
      }}
    >
      {selectMode && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelection(change.id)}
          style={{ accentColor: "var(--hp-warm-800)", cursor: "pointer", marginTop: 2, flexShrink: 0 }}
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
      <div style={{ flex: 1, minWidth: 0, color: "var(--hp-warm-800)" }}>
        {change.description}
        {change.location_on_drawing && (
          <div style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 3 }}>
            Location: {change.location_on_drawing}
          </div>
        )}
        {change.variation_note && (
          <div style={{ fontSize: 11, color: "var(--hp-text-secondary)", marginTop: 3, fontStyle: "italic" }}>
            {change.variation_note}
          </div>
        )}
      </div>
      {change.variation_risk && (() => {
        const vs = VARIATION_RISK_STYLES[change.variation_risk];
        return vs ? (
          <span
            style={{
              borderRadius: 999,
              padding: "2px 10px",
              fontSize: 10,
              fontWeight: 600,
              backgroundColor: vs.bg,
              color: vs.text,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {vs.label}
          </span>
        ) : null;
      })()}
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
      {!selectMode && (
        <select
          value={change.review_status ?? "needs_review"}
          onChange={(e) => onUpdateStatus([change.id], e.target.value as ReviewStatus)}
          style={{
            fontSize: 10,
            border: "1px solid var(--hp-border)",
            borderRadius: 4,
            padding: "2px 4px",
            backgroundColor:
              STATUS_OPTIONS.find((s) => s.value === (change.review_status ?? "needs_review"))?.bg ??
              "var(--hp-significant-bg)",
            color:
              STATUS_OPTIONS.find((s) => s.value === (change.review_status ?? "needs_review"))?.color ??
              "var(--hp-significant)",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
});
