"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import type { ChangeRow } from "./types";

type KpiFilter = "all" | "needs_review" | "likely_variation" | "unclear" | "high" ;

interface KpiStripProps {
  changes: ChangeRow[];
  activeFilter: KpiFilter;
  onFilterChange: (filter: KpiFilter) => void;
}

export const KpiStrip = React.memo(function KpiStrip({
  changes,
  activeFilter,
  onFilterChange,
}: KpiStripProps) {
  const needsReview = changes.filter(
    (c) => !c.review_status || c.review_status === "needs_review"
  ).length;
  const likelyVariations = changes.filter(
    (c) => c.variation_risk === "likely_variation"
  ).length;
  const unclear = changes.filter(
    (c) => c.variation_risk === "unclear"
  ).length;
  const highSeverity = changes.filter(
    (c) => c.severity === "high"
  ).length;
  const total = changes.length;

  const cards: { id: KpiFilter; label: string; count: number; color: string; bg: string }[] = [
    {
      id: "needs_review",
      label: "Needs Review",
      count: needsReview,
      color: "var(--hp-significant)",
      bg: "var(--hp-significant-bg)",
    },
    {
      id: "likely_variation",
      label: "Likely Variations",
      count: likelyVariations,
      color: "var(--hp-critical)",
      bg: "var(--hp-critical-bg)",
    },
    {
      id: "unclear",
      label: "Unclear",
      count: unclear,
      color: "var(--hp-significant)",
      bg: "var(--hp-significant-bg)",
    },
    {
      id: "high",
      label: "High Severity",
      count: highSeverity,
      color: "var(--hp-critical)",
      bg: "var(--hp-critical-bg)",
    },
    {
      id: "all",
      label: "Total",
      count: total,
      color: "var(--hp-text-primary)",
      bg: "var(--hp-warm-100)",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        marginBottom: 12,
        flexWrap: "wrap",
      }}
    >
      {cards.map((card) => {
        const isActive = activeFilter === card.id;
        return (
          <button
            key={card.id}
            onClick={() => onFilterChange(isActive ? "all" : card.id)}
            style={{
              flex: "1 1 0",
              minWidth: 100,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              padding: "10px 8px",
              borderRadius: 8,
              border: isActive
                ? `2px solid ${card.color}`
                : "1px solid var(--hp-border)",
              backgroundColor: isActive ? card.bg : "var(--hp-surface)",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: card.count > 0 ? card.color : "var(--hp-text-muted)",
                lineHeight: 1.1,
              }}
            >
              {card.count}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? card.color : "var(--hp-text-secondary)",
                whiteSpace: "nowrap",
              }}
            >
              {card.label}
            </span>
          </button>
        );
      })}
    </div>
  );
});

export type { KpiFilter };
