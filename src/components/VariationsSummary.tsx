"use client";

import { useState } from "react";
import { Download, ChevronDown, ChevronRight, AlertTriangle } from "lucide-react";

interface ChangeItem {
  id: string;
  discipline: string;
  drawing_number: string;
  drawing_title: string;
  old_revision: string;
  new_revision: string;
  change_type: string;
  description: string;
  location_on_drawing: string | null;
  severity: string;
  variation_risk: string | null;
  variation_note: string | null;
  review_status: string | null;
}

interface Props {
  changes: ChangeItem[];
  projectName: string;
}

export default function VariationsSummary({ changes, projectName }: Props) {
  const [expanded, setExpanded] = useState(true);
  const [filter, setFilter] = useState<"all" | "likely_variation" | "unclear">("all");

  // Filter to variation-relevant changes
  const variations = changes.filter((c) => c.variation_risk === "likely_variation");
  const unclear = changes.filter((c) => c.variation_risk === "unclear");
  const withinScope = changes.filter((c) => c.variation_risk === "within_scope");

  const displayed = filter === "likely_variation" ? variations
    : filter === "unclear" ? unclear
    : [...variations, ...unclear];

  const highCount = displayed.filter((c) => c.severity === "high").length;

  if (variations.length === 0 && unclear.length === 0) return null;

  const exportCSV = () => {
    const headers = ["Source", "Type", "Description", "Location", "Severity", "Variation Risk", "Baseline Note", "Review Status"];
    const rows = displayed.map((c) => [
      `${c.drawing_number} — ${c.drawing_title}`,
      c.change_type,
      c.description,
      c.location_on_drawing ?? "",
      c.severity,
      c.variation_risk === "likely_variation" ? "Likely Variation" : c.variation_risk === "unclear" ? "Unclear" : "Within Scope",
      c.variation_note ?? "",
      c.review_status === "variation_raised" ? "Variation Raised" : c.review_status === "not_a_variation" ? "Not a Variation" : "Needs Review",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectName.replace(/[^a-zA-Z0-9]/g, "_")}_Variations_Summary_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const riskColor = (risk: string | null) => risk === "likely_variation" ? "var(--hp-critical)" : "var(--hp-significant)";
  const riskBg = (risk: string | null) => risk === "likely_variation" ? "var(--hp-critical-bg)" : "var(--hp-significant-bg)";
  const riskLabel = (risk: string | null) => risk === "likely_variation" ? "Likely Variation" : "Unclear";
  const sevColor = (s: string) => s === "high" ? "var(--hp-critical)" : s === "medium" ? "var(--hp-significant)" : "var(--hp-text-muted)";

  return (
    <div style={{ marginBottom: 16, borderRadius: 8, border: "1px solid var(--hp-border)", overflow: "hidden" }}>
      {/* Header */}
      <div
        onClick={() => setExpanded((v) => !v)}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", backgroundColor: "var(--hp-critical-bg)", cursor: "pointer", userSelect: "none" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {expanded ? <ChevronDown size={16} style={{ color: "var(--hp-critical)" }} /> : <ChevronRight size={16} style={{ color: "var(--hp-critical)" }} />}
          <AlertTriangle size={16} style={{ color: "var(--hp-critical)" }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--hp-critical)" }}>Variations Summary</span>
          <span style={{ fontSize: 12, color: "var(--hp-critical)" }}>
            {variations.length} likely variation{variations.length !== 1 ? "s" : ""}
            {unclear.length > 0 && ` · ${unclear.length} unclear`}
            {withinScope.length > 0 && ` · ${withinScope.length} within scope`}
          </span>
        </div>
        {expanded && (
          <button
            onClick={(e) => { e.stopPropagation(); exportCSV(); }}
            style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: "var(--hp-warm-800)", backgroundColor: "#fff", border: "1px solid var(--hp-border)", borderRadius: 6, padding: "4px 12px", cursor: "pointer" }}
          >
            <Download size={12} /> Export CSV
          </button>
        )}
      </div>

      {expanded && (
        <div style={{ padding: 16 }}>
          {/* Filter tabs */}
          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
            {[
              { key: "all" as const, label: `All (${variations.length + unclear.length})` },
              { key: "likely_variation" as const, label: `Likely Variations (${variations.length})` },
              { key: "unclear" as const, label: `Unclear (${unclear.length})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                style={{
                  fontSize: 11, fontWeight: filter === tab.key ? 600 : 400, borderRadius: 6, padding: "5px 12px", cursor: "pointer", border: "none",
                  backgroundColor: filter === tab.key ? "var(--hp-warm-800)" : "var(--hp-surface)",
                  color: filter === tab.key ? "#fff" : "var(--hp-text-secondary)",
                }}
              >
                {tab.label}
              </button>
            ))}
            {highCount > 0 && (
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 500, color: "var(--hp-critical)", marginLeft: 8 }}>
                <AlertTriangle size={10} /> {highCount} high severity
              </span>
            )}
          </div>

          {/* Flat change list — simple table-like rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Header row */}
            <div style={{ display: "grid", gridTemplateColumns: "minmax(120px, 200px) 90px 1fr 80px 100px", gap: 8, padding: "6px 12px", fontSize: 10, fontWeight: 600, color: "var(--hp-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid var(--hp-border)" }}>
              <span>Source</span>
              <span>Type</span>
              <span>Change</span>
              <span>Severity</span>
              <span>Risk</span>
            </div>

            {displayed.map((c) => (
              <div
                key={c.id}
                style={{
                  display: "grid", gridTemplateColumns: "minmax(120px, 200px) 90px 1fr 80px 100px", gap: 8,
                  padding: "8px 12px", fontSize: 12, borderBottom: "1px solid var(--hp-border)",
                  backgroundColor: c.severity === "high" ? "var(--hp-critical-bg)" : "var(--hp-surface)",
                }}
              >
                {/* Source */}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: "var(--hp-warm-800)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.drawing_number}</div>
                  <div style={{ fontSize: 10, color: "var(--hp-text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.old_revision} → {c.new_revision}</div>
                </div>

                {/* Change type */}
                <span style={{ fontSize: 10, fontWeight: 500, color: "var(--hp-text-secondary)", textTransform: "capitalize", paddingTop: 2 }}>
                  {c.change_type.replace("_", " ")}
                </span>

                {/* Description + note */}
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: "var(--hp-warm-800)" }}>{c.description}</div>
                  {c.variation_note && <div style={{ fontSize: 11, color: "var(--hp-text-secondary)", marginTop: 2, fontStyle: "italic" }}>{c.variation_note}</div>}
                  {c.location_on_drawing && <div style={{ fontSize: 10, color: "var(--hp-text-muted)", marginTop: 2 }}>{c.location_on_drawing}</div>}
                </div>

                {/* Severity */}
                <span style={{ fontSize: 11, fontWeight: 600, color: sevColor(c.severity), textTransform: "uppercase", paddingTop: 2 }}>
                  {c.severity}
                </span>

                {/* Variation risk */}
                <span style={{ borderRadius: 999, padding: "2px 8px", fontSize: 10, fontWeight: 600, backgroundColor: riskBg(c.variation_risk), color: riskColor(c.variation_risk), whiteSpace: "nowrap", alignSelf: "start" }}>
                  {riskLabel(c.variation_risk)}
                </span>
              </div>
            ))}
          </div>

          {displayed.length === 0 && (
            <div style={{ textAlign: "center", padding: 24, fontSize: 13, color: "var(--hp-text-muted)" }}>
              No items match this filter.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
