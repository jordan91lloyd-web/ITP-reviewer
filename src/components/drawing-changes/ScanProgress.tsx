"use client";

import React from "react";
import { RefreshCw } from "lucide-react";

interface ScanProgressProps {
  scanProgress: { current: number; total: number; batchNum: number; totalBatches: number };
  changesLength: number;
  onBack: () => void;
}

export const ScanProgress = React.memo(function ScanProgress({
  scanProgress,
  changesLength,
  onBack,
}: ScanProgressProps) {
  return (
    <div
      style={{
        borderRadius: 8,
        border: "1px solid var(--hp-border)",
        padding: 48,
        textAlign: "center",
      }}
    >
      <RefreshCw
        size={24}
        className="animate-spin"
        style={{ color: "var(--hp-warm-800)", margin: "0 auto 12px" }}
      />
      <div style={{ fontSize: 14, fontWeight: 500, color: "var(--hp-text-primary)" }}>
        Scanning drawings for changes...
      </div>
      <div style={{ fontSize: 12, color: "var(--hp-text-secondary)", marginTop: 4 }}>
        Batch {scanProgress.batchNum}/{scanProgress.totalBatches} · {scanProgress.current}/
        {scanProgress.total} drawings processed
      </div>
      <div
        style={{
          width: 200,
          height: 6,
          borderRadius: 3,
          backgroundColor: "var(--hp-border)",
          margin: "16px auto 0",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 3,
            backgroundColor: "var(--hp-warm-800)",
            transition: "width 0.3s",
            width:
              scanProgress.total > 0
                ? `${(scanProgress.current / scanProgress.total) * 100}%`
                : "0%",
          }}
        />
      </div>
      <button
        onClick={onBack}
        style={{
          marginTop: 16,
          fontSize: 12,
          color: "var(--hp-text-muted)",
          background: "none",
          border: "none",
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        {changesLength > 0 ? "Back to Register (scan continues in background)" : "Cancel"}
      </button>
    </div>
  );
});
