"use client";

import React, { useMemo, useState } from "react";
import { ArrowLeft, Download, FileText } from "lucide-react";
import type { ChangeRow, BaselineDoc } from "./types";
import { buildDrawingSummaries, type DrawingSummary } from "./DrawingSummaryCard";
import {
  CHANGE_TYPE_LABELS,
  VARIATION_RISK_STYLES,
  SEVERITY_COLORS,
} from "./constants";

type RiskFilter = "all" | "likely_variation" | "unclear" | "within_scope" | "high_severity";

interface BaselineReportViewProps {
  changes: ChangeRow[];
  baselineDocs: BaselineDoc[];
  scanSummary: string | null;
  companyId: string;
  projectId: string;
  projectName: string;
  onBack: () => void;
}

const VERDICT_BADGE: Record<string, { label: string; bg: string; color: string }> = {
  likely_variation: { label: "Likely Variation", bg: "#991B1B", color: "#fff" },
  unclear: { label: "Unclear", bg: "#92400E", color: "#fff" },
  within_scope: { label: "Within Scope", bg: "#166534", color: "#fff" },
  no_baseline: { label: "No Baseline", bg: "var(--hp-warm-200)", color: "var(--hp-text-muted)" },
};

export const BaselineReportView = React.memo(function BaselineReportView({
  changes,
  baselineDocs,
  scanSummary,
  companyId,
  projectId,
  projectName,
  onBack,
}: BaselineReportViewProps) {
  const [filter, setFilter] = useState<RiskFilter>("all");

  const summaries = useMemo(() => buildDrawingSummaries(changes), [changes]);

  // Counts for filter buttons
  const counts = useMemo(() => {
    let likely = 0, unclear = 0, withinScope = 0, highSev = 0;
    for (const s of summaries) {
      if (s.netVerdict === "likely_variation") likely++;
      if (s.netVerdict === "unclear") unclear++;
      if (s.netVerdict === "within_scope") withinScope++;
      if (s.changes.some((c) => c.severity === "high")) highSev++;
    }
    return { likely, unclear, withinScope, highSev };
  }, [summaries]);

  // Filtered summaries
  const filtered = useMemo(() => {
    if (filter === "all") return summaries;
    if (filter === "likely_variation") return summaries.filter((s) => s.netVerdict === "likely_variation");
    if (filter === "unclear") return summaries.filter((s) => s.netVerdict === "unclear");
    if (filter === "within_scope") return summaries.filter((s) => s.netVerdict === "within_scope");
    if (filter === "high_severity") return summaries.filter((s) => s.changes.some((c) => c.severity === "high"));
    return summaries;
  }, [summaries, filter]);

  // Aggregate stats
  const totalChanges = changes.length;
  const totalVariations = changes.filter((c) => c.variation_risk === "likely_variation").length;
  const totalUnclear = changes.filter((c) => c.variation_risk === "unclear").length;
  const processedDocs = baselineDocs.filter((d) => d.status === "processed");

  // Export URL builder
  const buildExportUrl = (format: "csv" | "pdf") => {
    const params = new URLSearchParams({
      company_id: companyId,
      project_id: projectId,
      all: "true",
      format,
      view: "by_drawing",
    });
    if (filter === "likely_variation" || filter === "unclear" || filter === "within_scope") {
      params.set("variation_risk", filter);
    }
    if (filter === "high_severity") {
      params.set("severity", "high");
    }
    return `/api/drawing-changes/export?${params.toString()}`;
  };

  const today = new Date().toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const FILTER_BTNS: { key: RiskFilter; label: string; count: number }[] = [
    { key: "all", label: "All", count: summaries.length },
    { key: "likely_variation", label: "Likely Variations", count: counts.likely },
    { key: "unclear", label: "Unclear", count: counts.unclear },
    { key: "within_scope", label: "Within Scope", count: counts.withinScope },
    { key: "high_severity", label: "High Risk", count: counts.highSev },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          borderRadius: 6,
          border: "1px solid var(--hp-border)",
          padding: "6px 14px",
          fontSize: 12,
          fontWeight: 500,
          color: "var(--hp-text-secondary)",
          backgroundColor: "var(--hp-surface)",
          cursor: "pointer",
          alignSelf: "flex-start",
        }}
      >
        <ArrowLeft size={13} />
        Back to Compare
      </button>

      {/* Report header */}
      <div
        style={{
          borderRadius: 10,
          border: "1px solid var(--hp-border)",
          backgroundColor: "var(--hp-surface)",
          padding: "20px 24px",
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 700, color: "var(--hp-text-primary)", marginBottom: 4 }}>
          Baseline vs Current Report
        </div>
        <div style={{ fontSize: 12, color: "var(--hp-text-muted)", marginBottom: 16 }}>
          {projectName} &middot; {today} &middot; {processedDocs.length} baseline doc{processedDocs.length !== 1 ? "s" : ""} &middot; {summaries.length} drawing{summaries.length !== 1 ? "s" : ""} &middot; {totalChanges} change{totalChanges !== 1 ? "s" : ""}
        </div>

        {/* Summary stats */}
        <div
          style={{
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            padding: "12px 16px",
            borderRadius: 8,
            backgroundColor: "var(--hp-bg)",
            border: "1px solid var(--hp-border)",
            marginBottom: scanSummary ? 16 : 0,
          }}
        >
          <div>
            <div style={{ fontSize: 10, color: "var(--hp-text-muted)", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em" }}>Drawings</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--hp-text-primary)" }}>{summaries.length}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: "var(--hp-text-muted)", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em" }}>Changes</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--hp-text-primary)" }}>{totalChanges}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: "var(--hp-text-muted)", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em" }}>Likely Variations</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: totalVariations > 0 ? "var(--hp-critical)" : "var(--hp-compliant)" }}>{totalVariations}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: "var(--hp-text-muted)", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em" }}>Unclear</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: totalUnclear > 0 ? "var(--hp-significant)" : "var(--hp-compliant)" }}>{totalUnclear}</div>
          </div>
        </div>

        {/* AI summary */}
        {scanSummary && (
          <div
            style={{
              fontSize: 12,
              color: "var(--hp-text-secondary)",
              lineHeight: 1.6,
              padding: "12px 16px",
              borderRadius: 8,
              backgroundColor: "var(--hp-warm-100)",
              border: "1px solid var(--hp-border)",
              whiteSpace: "pre-wrap",
            }}
          >
            {scanSummary}
          </div>
        )}
      </div>

      {/* Filter bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          flexWrap: "wrap",
        }}
      >
        {FILTER_BTNS.map((btn) => {
          const isActive = filter === btn.key;
          return (
            <button
              key={btn.key}
              onClick={() => setFilter(btn.key)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                borderRadius: 999,
                border: isActive ? "1px solid var(--hp-warm-800)" : "1px solid var(--hp-border)",
                padding: "5px 14px",
                fontSize: 12,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#fff" : "var(--hp-text-secondary)",
                backgroundColor: isActive ? "var(--hp-warm-800)" : "var(--hp-surface)",
                cursor: "pointer",
              }}
            >
              {btn.label}
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  borderRadius: 999,
                  padding: "1px 6px",
                  backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "var(--hp-warm-100)",
                  color: isActive ? "#fff" : "var(--hp-text-muted)",
                }}
              >
                {btn.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Export bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <a
          href={buildExportUrl("pdf")}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            borderRadius: 8,
            border: "1px solid var(--hp-warm-800)",
            padding: "7px 16px",
            fontSize: 12,
            fontWeight: 600,
            color: "#fff",
            backgroundColor: "var(--hp-warm-800)",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <Download size={13} />
          Export PDF
        </a>
        <a
          href={buildExportUrl("csv")}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            borderRadius: 8,
            border: "1px solid var(--hp-border)",
            padding: "7px 16px",
            fontSize: 12,
            fontWeight: 500,
            color: "var(--hp-text-secondary)",
            backgroundColor: "var(--hp-surface)",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <FileText size={13} />
          Export CSV
        </a>
        {filter !== "all" && (
          <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>
            Showing {filtered.length} of {summaries.length} drawings
          </span>
        )}
      </div>

      {/* Report body */}
      {filtered.length === 0 ? (
        <div
          style={{
            borderRadius: 10,
            border: "1px solid var(--hp-border)",
            backgroundColor: "var(--hp-surface)",
            padding: "48px 32px",
            textAlign: "center",
            fontSize: 13,
            color: "var(--hp-text-muted)",
          }}
        >
          No drawings match the selected filter
        </div>
      ) : (
        filtered.map((summary) => (
          <ReportDrawingRow key={summary.drawingNumber} summary={summary} />
        ))
      )}
    </div>
  );
});

// ── Individual drawing row for the report ──────────────────────────────────

const ReportDrawingRow = React.memo(function ReportDrawingRow({
  summary,
}: {
  summary: DrawingSummary;
}) {
  const badge = VERDICT_BADGE[summary.netVerdict] ?? VERDICT_BADGE.no_baseline;

  // Split changes into prominent (likely_variation + unclear) and within_scope
  const prominentChanges = summary.changes.filter(
    (c) => c.variation_risk === "likely_variation" || c.variation_risk === "unclear"
  );
  const withinScopeCount = summary.changes.filter(
    (c) => c.variation_risk === "within_scope"
  ).length;

  return (
    <div
      style={{
        borderRadius: 10,
        border: "1px solid var(--hp-border)",
        backgroundColor: "var(--hp-surface)",
        overflow: "hidden",
      }}
    >
      {/* Drawing header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          gap: 12,
          flexWrap: "wrap",
          borderBottom: prominentChanges.length > 0 || withinScopeCount > 0 ? "1px solid var(--hp-border)" : "none",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--hp-text-primary)" }}>
              {summary.drawingNumber}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 500,
                borderRadius: 999,
                padding: "1px 8px",
                backgroundColor: "var(--hp-warm-100)",
                color: "var(--hp-text-muted)",
              }}
            >
              {summary.discipline}
            </span>
            {summary.drawingTitle && (
              <span style={{ fontSize: 12, color: "var(--hp-text-secondary)" }}>
                {summary.drawingTitle}
              </span>
            )}
          </div>
          <div style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 2 }}>
            {summary.revisionRange} &middot; {summary.changes.length} change{summary.changes.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Verdict badge */}
        <span
          style={{
            borderRadius: 6,
            padding: "4px 12px",
            fontSize: 11,
            fontWeight: 700,
            backgroundColor: badge.bg,
            color: badge.color,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {badge.label}
        </span>
      </div>

      {/* Variation/unclear change items */}
      {prominentChanges.length > 0 && (
        <div style={{ padding: "0" }}>
          {prominentChanges.map((c, i) => {
            const riskStyle = c.variation_risk ? VARIATION_RISK_STYLES[c.variation_risk] : null;
            const sevColor = SEVERITY_COLORS[c.severity];
            return (
              <div
                key={c.id || i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  padding: "8px 16px",
                  borderTop: i > 0 ? "1px solid var(--hp-border)" : "none",
                  fontSize: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0, marginTop: 1 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      borderRadius: 999,
                      padding: "1px 7px",
                      backgroundColor: riskStyle?.bg ?? "var(--hp-warm-100)",
                      color: riskStyle?.text ?? "var(--hp-text-muted)",
                    }}
                  >
                    {riskStyle?.label ?? ""}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      borderRadius: 999,
                      padding: "1px 7px",
                      textTransform: "capitalize",
                      backgroundColor: sevColor?.bg ?? "var(--hp-warm-100)",
                      color: sevColor?.text ?? "var(--hp-text-muted)",
                    }}
                  >
                    {c.severity}
                  </span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: "var(--hp-text-primary)", lineHeight: 1.4 }}>
                    <span style={{ fontWeight: 500, fontSize: 11, color: "var(--hp-text-muted)", marginRight: 4 }}>
                      {CHANGE_TYPE_LABELS[c.change_type] ?? c.change_type}:
                    </span>
                    {c.description.length > 200 ? c.description.slice(0, 200) + "..." : c.description}
                  </div>
                  {c.variation_note && (
                    <div style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 2, fontStyle: "italic" }}>
                      {c.variation_note}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Within scope summary */}
      {withinScopeCount > 0 && (
        <div
          style={{
            padding: "6px 16px",
            fontSize: 11,
            color: "var(--hp-compliant)",
            borderTop: prominentChanges.length > 0 ? "1px solid var(--hp-border)" : "none",
            backgroundColor: "var(--hp-compliant-bg)",
          }}
        >
          {withinScopeCount} change{withinScopeCount !== 1 ? "s" : ""} within scope
        </div>
      )}
    </div>
  );
});
