"use client";

import React from "react";
import { Database, Search, ClipboardList } from "lucide-react";

export type Stage = "baseline" | "scan" | "register" | "scanning";

interface StageRailProps {
  stage: Stage;
  collapsed: boolean;
  baselineStatus: string;
  scanStatus: string;
  registerStatus: string;
  onStageChange: (stage: Stage) => void;
}

const STAGES: { id: Stage; label: string; Icon: typeof Database }[] = [
  { id: "baseline", label: "Baseline", Icon: Database },
  { id: "scan", label: "Scan", Icon: Search },
  { id: "register", label: "Register", Icon: ClipboardList },
];

export const StageRail = React.memo(function StageRail({
  stage,
  collapsed,
  baselineStatus,
  scanStatus,
  registerStatus,
  onStageChange,
}: StageRailProps) {
  const activeStage = stage === "scanning" ? "scan" : stage;

  const statusMap: Record<string, string> = {
    baseline: baselineStatus,
    scan: scanStatus,
    register: registerStatus,
  };

  return (
    <div
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
