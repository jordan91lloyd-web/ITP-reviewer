"use client";

import React from "react";
import type { DrawingPair, RevisionInfo } from "./types";

interface AvailableRevisionsProps {
  drawingNumber: string;
  drawingPair: DrawingPair | undefined;
  scannedRevKeys: Set<string>;
  discipline: string;
  inlineScanning: string | null;
  onInlineScan: (pair: DrawingPair, from: RevisionInfo, to: RevisionInfo, discipline: string) => void;
}

export const AvailableRevisions = React.memo(function AvailableRevisions({
  drawingNumber,
  drawingPair: pair,
  scannedRevKeys,
  discipline,
  inlineScanning,
  onInlineScan,
}: AvailableRevisionsProps) {
  if (!pair || !pair.revisions || pair.revisions.length < 2) return null;

  const revs = pair.revisions;
  const firstRev = revs[0];
  const currentRev = revs[revs.length - 1];

  // Consecutive pairs
  const consecutivePairs: { from: RevisionInfo; to: RevisionInfo; key: string; scanned: boolean; label: string }[] = [];
  for (let i = 0; i < revs.length - 1; i++) {
    const from = revs[i];
    const to = revs[i + 1];
    const key = `${from.revision_number}|${to.revision_number}`;
    consecutivePairs.push({
      from,
      to,
      key,
      scanned: scannedRevKeys.has(key),
      label: `${from.revision_number} → ${to.revision_number}`,
    });
  }

  // Full range: first → current (only if more than 2 revisions)
  const fullRangeKey = `${firstRev.revision_number}|${currentRev.revision_number}`;
  const hasFullRange = revs.length > 2 && !consecutivePairs.some((p) => p.key === fullRangeKey);
  const fullRangeScanned = scannedRevKeys.has(fullRangeKey);

  const allButtons = [...consecutivePairs];
  if (hasFullRange) {
    allButtons.push({
      from: firstRev,
      to: currentRev,
      key: fullRangeKey,
      scanned: fullRangeScanned,
      label: `${firstRev.revision_number} → ${currentRev.revision_number} (full)`,
    });
  }

  const unscannedCount = allButtons.filter((p) => !p.scanned).length;

  return (
    <div
      style={{
        padding: "8px 16px 8px 64px",
        borderTop: "1px solid var(--hp-border)",
        backgroundColor: "var(--hp-significant-bg)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "var(--hp-significant)" }}>
          Revisions: {revs.map((r) => r.revision_number).join(", ")}
          {unscannedCount > 0 && ` · ${unscannedCount} unscanned`}
        </span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {allButtons.map((ap) => {
          const scanKey = `${drawingNumber}|${ap.key}`;
          const isScanning = inlineScanning === scanKey;
          return (
            <button
              key={ap.key}
              onClick={() => {
                if (!ap.scanned && !isScanning) {
                  onInlineScan(pair, ap.from, ap.to, discipline);
                }
              }}
              disabled={ap.scanned || isScanning}
              style={{
                fontSize: 11,
                fontWeight: ap.label.includes("full") ? 600 : 500,
                borderRadius: 6,
                padding: "3px 10px",
                cursor: ap.scanned || isScanning ? "default" : "pointer",
                border:
                  "1px solid " +
                  (ap.scanned
                    ? "var(--hp-compliant-bg)"
                    : isScanning
                      ? "var(--hp-significant-bg)"
                      : ap.label.includes("full")
                        ? "var(--hp-minor)"
                        : "var(--hp-critical-bg)"),
                backgroundColor: ap.scanned
                  ? "var(--hp-compliant-bg)"
                  : isScanning
                    ? "var(--hp-significant-bg)"
                    : ap.label.includes("full")
                      ? "var(--hp-minor-bg)"
                      : "#fff",
                color: ap.scanned
                  ? "var(--hp-compliant)"
                  : isScanning
                    ? "var(--hp-significant)"
                    : ap.label.includes("full")
                      ? "var(--hp-minor)"
                      : "var(--hp-critical)",
              }}
            >
              {ap.label}
              {ap.scanned && " \u2713"}
              {isScanning && " ..."}
            </button>
          );
        })}
      </div>
    </div>
  );
});
