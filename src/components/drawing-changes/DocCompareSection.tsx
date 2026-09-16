"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { DocCompareResult } from "./types";

interface DocCompareSectionProps {
  company_id: string;
  project_id: string;
  project_name: string;
}

export default function DocCompareSection({ company_id, project_id, project_name }: DocCompareSectionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{
    document_name: string;
    changes: DocCompareResult[];
    by_risk: Record<string, number>;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const [pastComparisons, setPastComparisons] = useState<
    Array<{ scan_id: string; document_name: string; changes: DocCompareResult[]; created_at: string }>
  >([]);
  const [expandedPast, setExpandedPast] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/drawing-changes/results?company_id=${company_id}&project_id=${project_id}&all=true`)
      .then((r) => r.json())
      .then((data) => {
        if (data.changes) {
          const docChanges = (
            data.changes as Array<
              DocCompareResult & { discipline: string; scan_id: string; drawing_number: string; created_at: string }
            >
          ).filter((c) => c.discipline === "Document");
          const byScan = new Map<
            string,
            { document_name: string; changes: DocCompareResult[]; created_at: string }
          >();
          for (const c of docChanges) {
            if (!byScan.has(c.scan_id))
              byScan.set(c.scan_id, { document_name: c.drawing_number, changes: [], created_at: c.created_at });
            byScan.get(c.scan_id)!.changes.push(c);
          }
          setPastComparisons(
            [...byScan.entries()]
              .map(([scan_id, v]) => ({ scan_id, ...v }))
              .sort((a, b) => b.created_at.localeCompare(a.created_at))
          );
        }
      })
      .catch(() => {});
  }, [company_id, project_id, results]);

  const handleFile = useCallback((f: File) => {
    setError(null);
    setResults(null);
    setFile(f);
  }, []);

  const handleCompare = async () => {
    if (!file) return;
    setIsComparing(true);
    setError(null);
    setResults(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("company_id", company_id);
      fd.append("project_id", project_id);
      fd.append("project_name", project_name);
      fd.append("document_name", file.name);
      const res = await fetch("/api/drawing-changes/compare-doc", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        setResults({ document_name: data.document_name, changes: data.changes, by_risk: data.by_risk });
      } else {
        setError(data.error ?? "Comparison failed");
      }
    } catch {
      setError("Comparison timed out or failed.");
    } finally {
      setIsComparing(false);
    }
  };

  const riskColor = (risk: string | null) => {
    if (risk === "likely_variation") return "var(--hp-critical)";
    if (risk === "within_scope") return "var(--hp-compliant)";
    return "var(--hp-significant)";
  };
  const riskBg = (risk: string | null) => {
    if (risk === "likely_variation") return "var(--hp-critical-bg)";
    if (risk === "within_scope") return "var(--hp-compliant-bg)";
    return "var(--hp-significant-bg)";
  };
  const riskLabel = (risk: string | null) => {
    if (risk === "likely_variation") return "Likely Variation";
    if (risk === "within_scope") return "Within Scope";
    return "Unclear";
  };
  const sevColor = (sev: string) => {
    if (sev === "high") return "var(--hp-critical)";
    if (sev === "medium") return "var(--hp-significant)";
    return "var(--hp-text-muted)";
  };

  return (
    <div style={{ borderRadius: 8, border: "1px solid var(--hp-border)", overflow: "hidden" }}>
      <div
        onClick={() => setExpanded((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          backgroundColor: "var(--hp-bg)",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {expanded ? (
            <ChevronDown size={16} style={{ color: "var(--hp-text-muted)" }} />
          ) : (
            <ChevronRight size={16} style={{ color: "var(--hp-text-muted)" }} />
          )}
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--hp-text-primary)" }}>Compare Document</span>
        </div>
        <span style={{ fontSize: 12, color: "var(--hp-text-muted)" }}>
          Upload a new or revised document to compare against baseline scope
        </span>
      </div>

      {expanded && (
        <div style={{ padding: 16, borderTop: "1px solid var(--hp-border)" }}>
          {/* Upload zone */}
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const f = e.dataTransfer.files[0];
              if (f) handleFile(f);
            }}
            style={{
              cursor: "pointer",
              borderRadius: 8,
              border: "2px dashed",
              padding: 24,
              textAlign: "center",
              borderColor: isDragging ? "var(--hp-accent)" : "var(--hp-border)",
              backgroundColor: isDragging ? "var(--hp-warm-100)" : "var(--hp-surface)",
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.docx,.xlsx"
              style={{ display: "none" }}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
            {file ? (
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, color: "var(--hp-warm-800)" }}>{file.name}</p>
                <p style={{ fontSize: 11, marginTop: 4, color: "var(--hp-text-muted)" }}>
                  {(file.size / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
            ) : (
              <p style={{ fontSize: 13, color: "var(--hp-warm-700)" }}>Drop a document here, or click to select</p>
            )}
          </div>

          {error && (
            <div
              style={{
                marginTop: 12,
                borderRadius: 8,
                padding: "10px 14px",
                fontSize: 13,
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#991b1b",
              }}
            >
              {error}
            </div>
          )}

          <button
            onClick={handleCompare}
            disabled={!file || isComparing}
            style={{
              marginTop: 12,
              width: "100%",
              borderRadius: 8,
              backgroundColor: "var(--hp-warm-800)",
              padding: "10px 16px",
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              border: "none",
              cursor: file && !isComparing ? "pointer" : "not-allowed",
              opacity: !file || isComparing ? 0.4 : 1,
            }}
          >
            {isComparing ? "Comparing against baseline\u2026" : "Compare against Baseline"}
          </button>

          {/* Current results */}
          {results && (
            <div style={{ marginTop: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--hp-warm-800)" }}>
                  {results.document_name} — {results.changes.length} change{results.changes.length !== 1 ? "s" : ""}{" "}
                  found
                </span>
                <div style={{ display: "flex", gap: 8 }}>
                  {(results.by_risk.likely_variation ?? 0) > 0 && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 500,
                        borderRadius: 999,
                        padding: "1px 8px",
                        backgroundColor: "var(--hp-critical-bg)",
                        color: "var(--hp-critical)",
                      }}
                    >
                      {results.by_risk.likely_variation} variation
                      {results.by_risk.likely_variation !== 1 ? "s" : ""}
                    </span>
                  )}
                  {(results.by_risk.within_scope ?? 0) > 0 && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 500,
                        borderRadius: 999,
                        padding: "1px 8px",
                        backgroundColor: "var(--hp-compliant-bg)",
                        color: "var(--hp-compliant)",
                      }}
                    >
                      {results.by_risk.within_scope} in scope
                    </span>
                  )}
                  {(results.by_risk.unclear ?? 0) > 0 && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 500,
                        borderRadius: 999,
                        padding: "1px 8px",
                        backgroundColor: "var(--hp-significant-bg)",
                        color: "var(--hp-significant)",
                      }}
                    >
                      {results.by_risk.unclear} unclear
                    </span>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {results.changes.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: 6,
                      padding: "8px 12px",
                      backgroundColor: "var(--hp-surface)",
                      border: "1px solid var(--hp-border)",
                      fontSize: 12,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 500,
                          borderRadius: 999,
                          padding: "1px 8px",
                          backgroundColor: riskBg(c.variation_risk),
                          color: riskColor(c.variation_risk),
                        }}
                      >
                        {riskLabel(c.variation_risk)}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 500,
                          color: sevColor(c.severity),
                          textTransform: "uppercase",
                        }}
                      >
                        {c.severity}
                      </span>
                      <span style={{ fontSize: 10, color: "var(--hp-text-muted)" }}>{c.change_type}</span>
                      {c.location_on_drawing && (
                        <span style={{ fontSize: 10, color: "var(--hp-text-muted)" }}>{c.location_on_drawing}</span>
                      )}
                    </div>
                    <div style={{ color: "var(--hp-warm-800)", fontWeight: 500 }}>{c.description}</div>
                    {c.variation_note && (
                      <div style={{ marginTop: 4, color: "var(--hp-text-secondary)", fontSize: 11 }}>
                        {c.variation_note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Past comparisons */}
          {pastComparisons.length > 0 && (
            <div style={{ marginTop: 16, borderTop: "1px solid var(--hp-border)", paddingTop: 12 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "var(--hp-text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 8,
                }}
              >
                Previous comparisons
              </div>
              {pastComparisons.map((pc) => (
                <div key={pc.scan_id} style={{ marginBottom: 4 }}>
                  <div
                    onClick={() => setExpandedPast((prev) => (prev === pc.scan_id ? null : pc.scan_id))}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "6px 0",
                      cursor: "pointer",
                      fontSize: 12,
                    }}
                  >
                    {expandedPast === pc.scan_id ? (
                      <ChevronDown size={12} style={{ color: "var(--hp-text-muted)" }} />
                    ) : (
                      <ChevronRight size={12} style={{ color: "var(--hp-text-muted)" }} />
                    )}
                    <span style={{ fontWeight: 500, color: "var(--hp-warm-800)" }}>{pc.document_name}</span>
                    <span style={{ color: "var(--hp-text-muted)" }}>
                      {pc.changes.length} change{pc.changes.length !== 1 ? "s" : ""}
                    </span>
                    <span style={{ color: "var(--hp-text-muted)", fontSize: 10 }}>{pc.created_at.slice(0, 10)}</span>
                  </div>
                  {expandedPast === pc.scan_id && (
                    <div
                      style={{
                        paddingLeft: 20,
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        marginBottom: 8,
                      }}
                    >
                      {pc.changes.map((c, i) => (
                        <div
                          key={i}
                          style={{
                            borderRadius: 6,
                            padding: "6px 10px",
                            backgroundColor: "var(--hp-surface)",
                            border: "1px solid var(--hp-border)",
                            fontSize: 11,
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 500,
                                borderRadius: 999,
                                padding: "1px 6px",
                                backgroundColor: riskBg(c.variation_risk),
                                color: riskColor(c.variation_risk),
                              }}
                            >
                              {riskLabel(c.variation_risk)}
                            </span>
                            <span style={{ fontSize: 10, color: "var(--hp-text-muted)" }}>{c.change_type}</span>
                          </div>
                          <div style={{ color: "var(--hp-warm-800)" }}>{c.description}</div>
                          {c.variation_note && (
                            <div style={{ marginTop: 2, color: "var(--hp-text-secondary)", fontSize: 10 }}>
                              {c.variation_note}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
