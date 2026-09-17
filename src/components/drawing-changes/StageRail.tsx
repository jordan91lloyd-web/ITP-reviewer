"use client";

import React, { useState, useEffect } from "react";
import { Database, Search, ClipboardList, GitCompareArrows } from "lucide-react";

export type Stage = "baseline" | "scan" | "register" | "compare" | "scanning";

interface CompareStats {
  comparisonCount: number;
  variationCount: number;
}

interface StageRailProps {
  stage: Stage;
  collapsed: boolean;
  baselineStatus: string;
  scanStatus: string;
  registerStatus: string;
  compareStats?: CompareStats;
  onStageChange: (stage: Stage) => void;
}

const STAGES: { id: Stage; label: string; shortLabel: string; Icon: typeof Database }[] = [
  { id: "baseline", label: "Baseline", shortLabel: "B", Icon: Database },
  { id: "scan", label: "Scan", shortLabel: "S", Icon: Search },
  { id: "register", label: "Register", shortLabel: "R", Icon: ClipboardList },
  { id: "compare", label: "Compare", shortLabel: "C", Icon: GitCompareArrows },
];

export const StageRail = React.memo(function StageRail({
  stage,
  collapsed,
  baselineStatus,
  scanStatus,
  registerStatus,
  compareStats,
  onStageChange,
}: StageRailProps) {
  const activeStage = stage === "scanning" ? "scan" : stage;

  const compareStatus = compareStats
    ? compareStats.comparisonCount > 0
      ? `${compareStats.comparisonCount} comparison${compareStats.comparisonCount !== 1 ? "s" : ""} \u00b7 ${compareStats.variationCount} likely variation${compareStats.variationCount !== 1 ? "s" : ""}`
      : "No comparisons yet"
    : "No comparisons yet";

  const statusMap: Record<string, string> = {
    baseline: baselineStatus,
    scan: scanStatus,
    register: registerStatus,
    compare: compareStatus,
  };

  const [isHorizontal, setIsHorizontal] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 600px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsHorizontal(e.matches);
    handler(mql);
    mql.addEventListener("change", handler as (e: MediaQueryListEvent) => void);
    return () => mql.removeEventListener("change", handler as (e: MediaQueryListEvent) => void);
  }, []);

  // Horizontal segmented control for narrow viewports
  if (isHorizontal) {
    return (
      <div
        role="tablist"
        aria-label="Drawing changes stages"
        style={{
          display: "flex",
          gap: 0,
          borderBottom: "1px solid var(--hp-border)",
          backgroundColor: "var(--hp-surface)",
          padding: "4px 8px",
        }}
      >
        {STAGES.map(({ id, shortLabel, label }) => {
          const isActive = activeStage === id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={isActive}
              aria-label={`${label}: ${statusMap[id]}`}
              onClick={() => onStageChange(id)}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                padding: "8px 4px",
                fontSize: 13,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "#fff" : "var(--hp-text-secondary)",
                backgroundColor: isActive ? "var(--hp-warm-800)" : "transparent",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              {shortLabel}
            </button>
          );
        })}
      </div>
    );
  }

  // Vertical sidebar rail (default)
  return (
    <div
      role="tablist"
      aria-label="Drawing changes stages"
      aria-orientation="vertical"
      style={{
        width: collapsed ? 56 : 200,
        minWidth: collapsed ? 56 : 200,
        borderRight: "1px solid var(--hp-border)",
        backgroundColor: "var(--hp-surface)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "8px 0",
        transition: "width 0.15s ease, min-width 0.15s ease",
        flexShrink: 0,
      }}
    >
      {STAGES.map(({ id, label, Icon }) => {
        const isActive = activeStage === id;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={isActive}
            aria-label={collapsed ? `${label}: ${statusMap[id]}` : undefined}
            onClick={() => onStageChange(id)}
            title={collapsed ? `${label}\n${statusMap[id]}` : undefined}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: collapsed ? "12px 0" : "10px 16px",
              justifyContent: collapsed ? "center" : "flex-start",
              border: "none",
              borderLeft: `3px solid ${isActive ? "var(--hp-warm-800)" : "transparent"}`,
              backgroundColor: isActive ? "var(--hp-warm-100)" : "transparent",
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
            }}
          >
            <Icon
              size={18}
              aria-hidden="true"
              style={{
                color: isActive ? "var(--hp-warm-800)" : "var(--hp-text-muted)",
                flexShrink: 0,
              }}
            />
            {!collapsed && (
              <div style={{ minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "var(--hp-warm-800)" : "var(--hp-text-primary)",
                    lineHeight: 1.3,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--hp-text-muted)",
                    lineHeight: 1.3,
                    marginTop: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {statusMap[id]}
                </div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
});
