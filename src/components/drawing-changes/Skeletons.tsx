"use client";

import React from "react";

const pulseKeyframes = `
@keyframes hp-skeleton-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}
`;

function SkeletonBar({ width, height = 14 }: { width: string | number; height?: number }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 6,
        backgroundColor: "var(--hp-border)",
        animation: "hp-skeleton-pulse 1.5s ease-in-out infinite",
      }}
    />
  );
}

export const RegisterSkeleton = React.memo(function RegisterSkeleton() {
  return (
    <>
      <style>{pulseKeyframes}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[0, 1, 2, 3].map((di) => (
          <div
            key={di}
            style={{
              borderRadius: 8,
              border: "1px solid var(--hp-border)",
              overflow: "hidden",
            }}
          >
            {/* Discipline header skeleton */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                backgroundColor: "var(--hp-warm-100)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <SkeletonBar width={16} height={16} />
                <SkeletonBar width={120 + di * 20} />
                <SkeletonBar width={80} height={12} />
              </div>
              <SkeletonBar width={40} height={12} />
            </div>
            {/* Change row skeletons */}
            {[0, 1].map((ri) => (
              <div
                key={ri}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: "10px 16px 10px 72px",
                  borderTop: "1px solid var(--hp-border)",
                }}
              >
                <SkeletonBar width={70} height={20} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                  <SkeletonBar width="80%" />
                  <SkeletonBar width="40%" height={11} />
                </div>
                <SkeletonBar width={60} height={20} />
                <SkeletonBar width={50} height={20} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
});

export const DrawingListSkeleton = React.memo(function DrawingListSkeleton() {
  return (
    <>
      <style>{pulseKeyframes}</style>
      <div
        style={{
          borderRadius: 8,
          border: "1px solid var(--hp-border)",
          overflow: "hidden",
        }}
      >
        {[0, 1, 2].map((di) => (
          <div key={di}>
            {/* Discipline header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 16px",
                backgroundColor: "var(--hp-warm-100)",
                borderTop: di > 0 ? "1px solid var(--hp-border)" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <SkeletonBar width={16} height={16} />
                <SkeletonBar width={100 + di * 30} />
                <SkeletonBar width={60} height={12} />
              </div>
              <SkeletonBar width={80} height={12} />
            </div>
            {/* Drawing rows */}
            {[0, 1].map((ri) => (
              <div
                key={ri}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "6px 16px 6px 44px",
                  borderTop: "1px solid var(--hp-border)",
                }}
              >
                <SkeletonBar width={14} height={14} />
                <SkeletonBar width={80} />
                <div style={{ flex: 1 }}>
                  <SkeletonBar width="60%" />
                </div>
                <SkeletonBar width={60} height={16} />
                <SkeletonBar width={80} height={12} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
});
