"use client";

import React, { useRef } from "react";
import {
  ChevronDown,
  ChevronRight,
  FileUp,
  Search,
  RefreshCw,
  X,
} from "lucide-react";
import BaselineFolderBrowser from "../BaselineFolderBrowser";
import type { BaselineDoc } from "./types";
import { CATEGORY_LABELS } from "./constants";

interface BaselinePanelProps {
  companyId: string;
  projectId: string;
  baselineDocs: BaselineDoc[];
  baselineExpanded: boolean;
  baselineUploading: boolean;
  baselineProgressText: string;
  expandedBaselineDoc: string | null;
  showProcoreBrowser: boolean;
  onToggleExpanded: () => void;
  onUploadFile: (file: File) => void;
  onAddProcoreDoc: (file: { id: number; name: string; url: string }) => void;
  onDeleteDoc: (docId: string) => void;
  onClearFailed: () => void;
  onToggleProcoreBrowser: () => void;
  onSetExpandedBaselineDoc: (id: string | null) => void;
  onProcessFolder: (files: Array<{ id: number; name: string; url: string }>, label: string) => Promise<void>;
  fetchBaseline: (pid: string) => void;
}

export const BaselinePanel = React.memo(function BaselinePanel({
  companyId,
  projectId,
  baselineDocs,
  baselineExpanded,
  baselineUploading,
  baselineProgressText,
  expandedBaselineDoc,
  showProcoreBrowser,
  onToggleExpanded,
  onUploadFile,
  onDeleteDoc,
  onClearFailed,
  onToggleProcoreBrowser,
  onSetExpandedBaselineDoc,
  onProcessFolder,
}: BaselinePanelProps) {
  const baselineFileRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ borderRadius: 8, border: "1px solid var(--hp-border)", marginBottom: 16, overflow: "hidden" }}>
      {/* Header */}
      <div
        onClick={onToggleExpanded}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          backgroundColor: "var(--hp-warm-100)",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {baselineExpanded ? (
            <ChevronDown size={16} style={{ color: "var(--hp-text-muted)" }} />
          ) : (
            <ChevronRight size={16} style={{ color: "var(--hp-text-muted)" }} />
          )}
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--hp-text-primary)" }}>Baseline Scope</span>
          {baselineDocs.length > 0 ? (
            <span style={{ fontSize: 12, color: "var(--hp-text-muted)" }}>
              {baselineDocs.length} document{baselineDocs.length !== 1 ? "s" : ""} ·{" "}
              {baselineDocs.reduce((sum, d) => sum + d.item_count, 0)} scope items
            </span>
          ) : (
            <span style={{ fontSize: 12, color: "var(--hp-text-muted)" }}>
              Optional — add tender or contract documents to compare changes against original scope
            </span>
          )}
        </div>
        {baselineDocs.length > 0 && (
          <div style={{ display: "flex", gap: 6 }}>
            {Object.entries(CATEGORY_LABELS).map(([cat, { label, bg, color }]) => {
              const count = baselineDocs.reduce(
                (sum, d) => sum + (d.scope_items?.filter((i) => i.category === cat).length ?? 0),
                0
              );
              if (count === 0) return null;
              return (
                <span
                  key={cat}
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    borderRadius: 999,
                    padding: "1px 8px",
                    backgroundColor: bg,
                    color,
                  }}
                >
                  {count} {label}s
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Expanded content */}
      {baselineExpanded && (
        <div style={{ padding: "12px 16px", borderTop: "1px solid var(--hp-border)" }}>
          {/* Upload button */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <input
              ref={baselineFileRef}
              type="file"
              accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png"
              style={{ display: "none" }}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onUploadFile(f);
                e.target.value = "";
              }}
            />
            <button
              onClick={() => baselineFileRef.current?.click()}
              disabled={baselineUploading}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                borderRadius: 8,
                border: "1px solid var(--hp-warm-800)",
                backgroundColor: "var(--hp-warm-800)",
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 600,
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <FileUp size={12} /> {baselineUploading ? "Processing..." : "Upload File"}
            </button>
            <button
              onClick={onToggleProcoreBrowser}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                borderRadius: 8,
                border: "1px solid var(--hp-border)",
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 500,
                color: "var(--hp-text-secondary)",
                background: "none",
                cursor: "pointer",
              }}
            >
              <Search size={12} /> {showProcoreBrowser ? "Hide" : "Browse Procore Documents"}
            </button>
            {baselineUploading && (
              <span style={{ fontSize: 11, color: "var(--hp-significant)" }}>Processing document...</span>
            )}
          </div>

          {/* Procore Documents browser */}
          {showProcoreBrowser && projectId && (
            <BaselineFolderBrowser
              company_id={companyId}
              project_id={projectId}
              processing={baselineUploading}
              progressText={baselineProgressText}
              onProcessFolder={onProcessFolder}
            />
          )}

          {/* Processing status banner */}
          {baselineProgressText && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 14px",
                marginBottom: 12,
                borderRadius: 8,
                border: `1px solid ${
                  baselineProgressText.includes("failed")
                    ? "var(--hp-critical-bg)"
                    : baselineProgressText.includes("successfully")
                      ? "var(--hp-compliant-bg)"
                      : "var(--hp-significant-bg)"
                }`,
                backgroundColor: baselineProgressText.includes("failed")
                  ? "var(--hp-critical-bg)"
                  : baselineProgressText.includes("successfully")
                    ? "var(--hp-compliant-bg)"
                    : "var(--hp-significant-bg)",
                fontSize: 13,
                fontWeight: 500,
                color: baselineProgressText.includes("failed")
                  ? "var(--hp-critical)"
                  : baselineProgressText.includes("successfully")
                    ? "var(--hp-compliant)"
                    : "var(--hp-significant)",
              }}
            >
              {baselineUploading && <RefreshCw size={14} className="animate-spin" />}
              {baselineProgressText}
            </div>
          )}

          {/* Document register */}
          {baselineDocs.length === 0 && !baselineProgressText ? (
            <div style={{ fontSize: 13, color: "var(--hp-text-secondary)", padding: "12px 0" }}>
              Upload tender specifications, PBR, scope of works, allowances schedules, or contract documents. Claude
              extracts scope items from each document — when baseline documents are present, drawing revision changes
              can be compared against the original scope to flag potential variations.
            </div>
          ) : (
            <>
              {/* Summary stats */}
              {(() => {
                const processed = baselineDocs.filter((d) => d.status === "processed");
                const failedDocs = baselineDocs.filter((d) => d.status === "failed");
                const skippedDocs = baselineDocs.filter((d) => d.status === "skipped");
                const processingDocs = baselineDocs.filter((d) => d.status === "processing");
                const totalItems = processed.reduce((sum, d) => sum + (d.item_count ?? 0), 0);
                const totalSize = baselineDocs.reduce((sum, d) => sum + (d.file_size ?? 0), 0);
                return (
                  <div
                    style={{
                      marginBottom: 12,
                      borderRadius: 8,
                      padding: "10px 14px",
                      backgroundColor: "var(--hp-warm-100)",
                      border: "1px solid var(--hp-border)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--hp-warm-800)" }}>
                        {baselineDocs.length} document{baselineDocs.length !== 1 ? "s" : ""} &middot; {totalItems} scope
                        items
                      </span>
                      {(failedDocs.length > 0 || skippedDocs.length > 0) && !baselineUploading && (
                        <button
                          onClick={onClearFailed}
                          style={{
                            fontSize: 11,
                            fontWeight: 500,
                            color: "var(--hp-accent)",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          Clear failed & re-scan
                        </button>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: 16, fontSize: 11, color: "var(--hp-text-muted)" }}>
                      <span style={{ color: "var(--hp-compliant)" }}>{processed.length} processed</span>
                      {failedDocs.length > 0 && (
                        <span style={{ color: "var(--hp-critical)" }}>{failedDocs.length} failed</span>
                      )}
                      {skippedDocs.length > 0 && <span>{skippedDocs.length} skipped</span>}
                      {processingDocs.length > 0 && (
                        <span style={{ color: "var(--hp-significant)" }}>{processingDocs.length} processing</span>
                      )}
                      {totalSize > 0 && <span>{(totalSize / 1024 / 1024).toFixed(1)} MB total</span>}
                    </div>

                    {/* Processing timeline */}
                    {(() => {
                      const byDate = new Map<
                        string,
                        { processed: number; failed: number; skipped: number; items: number }
                      >();
                      for (const d of baselineDocs) {
                        const day = d.created_at ? d.created_at.slice(0, 10) : "unknown";
                        const entry = byDate.get(day) ?? { processed: 0, failed: 0, skipped: 0, items: 0 };
                        if (d.status === "processed") {
                          entry.processed++;
                          entry.items += d.item_count ?? 0;
                        } else if (d.status === "failed") entry.failed++;
                        else if (d.status === "skipped") entry.skipped++;
                        byDate.set(day, entry);
                      }
                      if (byDate.size === 0) return null;
                      const sortedDates = [...byDate.entries()].sort((a, b) => b[0].localeCompare(a[0]));
                      return (
                        <div style={{ marginTop: 8, borderTop: "1px solid var(--hp-border)", paddingTop: 8 }}>
                          <div
                            style={{
                              fontSize: 10,
                              fontWeight: 600,
                              color: "var(--hp-text-muted)",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              marginBottom: 4,
                            }}
                          >
                            Processing history
                          </div>
                          {sortedDates.map(([date, stats]) => (
                            <div
                              key={date}
                              style={{
                                fontSize: 11,
                                color: "var(--hp-text-secondary)",
                                marginBottom: 2,
                                display: "flex",
                                gap: 8,
                              }}
                            >
                              <span style={{ color: "var(--hp-text-muted)", flexShrink: 0, width: 72 }}>{date}</span>
                              <span>
                                {stats.processed + stats.failed + stats.skipped} file
                                {stats.processed + stats.failed + stats.skipped !== 1 ? "s" : ""}
                              </span>
                              {stats.processed > 0 && (
                                <span style={{ color: "var(--hp-compliant)" }}>
                                  {stats.processed} processed ({stats.items} items)
                                </span>
                              )}
                              {stats.failed > 0 && (
                                <span style={{ color: "var(--hp-critical)" }}>{stats.failed} failed</span>
                              )}
                              {stats.skipped > 0 && <span>{stats.skipped} skipped</span>}
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                );
              })()}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {baselineDocs.map((doc) => {
                  const statusColor =
                    doc.status === "processed"
                      ? "var(--hp-compliant)"
                      : doc.status === "failed"
                        ? "var(--hp-critical)"
                        : doc.status === "skipped"
                          ? "var(--hp-text-muted)"
                          : "var(--hp-significant)";
                  const statusBg =
                    doc.status === "processed"
                      ? "var(--hp-compliant-bg)"
                      : doc.status === "failed"
                        ? "var(--hp-critical-bg)"
                        : doc.status === "skipped"
                          ? "var(--hp-warm-100)"
                          : "var(--hp-significant-bg)";
                  const statusLabel =
                    doc.status === "processed"
                      ? `${doc.item_count} items extracted`
                      : doc.status === "failed"
                        ? "Failed"
                        : doc.status === "skipped"
                          ? "Skipped"
                          : doc.status === "processing"
                            ? "Processing..."
                            : "Pending";

                  return (
                    <div
                      key={doc.id}
                      style={{ borderRadius: 6, border: "1px solid var(--hp-border)", overflow: "hidden" }}
                    >
                      {/* Doc header */}
                      <div
                        onClick={() =>
                          doc.status === "processed"
                            ? onSetExpandedBaselineDoc(expandedBaselineDoc === doc.id ? null : doc.id)
                            : undefined
                        }
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "8px 12px",
                          backgroundColor: "var(--hp-bg)",
                          cursor: doc.status === "processed" ? "pointer" : "default",
                          userSelect: "none",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
                          {doc.status === "processed" &&
                            (expandedBaselineDoc === doc.id ? (
                              <ChevronDown size={14} style={{ color: "var(--hp-text-muted)" }} />
                            ) : (
                              <ChevronRight size={14} style={{ color: "var(--hp-text-muted)" }} />
                            ))}
                          {doc.status !== "processed" && <span style={{ width: 14 }} />}
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 500,
                              color: doc.status === "skipped" ? "var(--hp-text-muted)" : "var(--hp-warm-800)",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {doc.document_name}
                          </span>
                          {doc.file_size ? (
                            <span style={{ fontSize: 10, color: "var(--hp-text-muted)", flexShrink: 0 }}>
                              {(doc.file_size / 1024 / 1024).toFixed(1)} MB
                            </span>
                          ) : null}
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 500,
                              borderRadius: 999,
                              padding: "1px 8px",
                              backgroundColor: statusBg,
                              color: statusColor,
                              flexShrink: 0,
                            }}
                          >
                            {statusLabel}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                          {doc.error_message && (
                            <span
                              style={{
                                fontSize: 10,
                                color: "var(--hp-critical)",
                                maxWidth: 200,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                              title={doc.error_message}
                            >
                              {doc.error_message}
                            </span>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteDoc(doc.id);
                            }}
                            title="Remove from baseline"
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}
                          >
                            <X size={14} style={{ color: "var(--hp-text-muted)" }} />
                          </button>
                        </div>
                      </div>

                      {/* Doc items */}
                      {expandedBaselineDoc === doc.id && doc.scope_items && doc.scope_items.length > 0 && (
                        <div
                          style={{
                            borderTop: "1px solid var(--hp-border)",
                            maxHeight: 300,
                            overflowY: "auto",
                          }}
                        >
                          {doc.scope_items.map((item, i) => {
                            const catStyle = CATEGORY_LABELS[item.category] ?? CATEGORY_LABELS.condition;
                            return (
                              <div
                                key={i}
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: 10,
                                  padding: "6px 12px 6px 40px",
                                  borderTop: i > 0 ? "1px solid var(--hp-border)" : "none",
                                  fontSize: 12,
                                }}
                              >
                                <span
                                  style={{
                                    borderRadius: 999,
                                    padding: "1px 8px",
                                    fontSize: 10,
                                    fontWeight: 500,
                                    backgroundColor: catStyle.bg,
                                    color: catStyle.color,
                                    whiteSpace: "nowrap",
                                    flexShrink: 0,
                                  }}
                                >
                                  {catStyle.label}
                                </span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ fontWeight: 500, color: "var(--hp-warm-800)" }}>{item.item}</div>
                                  {item.detail && (
                                    <div style={{ color: "var(--hp-text-secondary)", marginTop: 2 }}>{item.detail}</div>
                                  )}
                                  {item.source_reference && (
                                    <div style={{ color: "var(--hp-text-muted)", fontSize: 10, marginTop: 2 }}>
                                      {item.source_reference}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {expandedBaselineDoc === doc.id && doc.error_message && (
                        <div
                          style={{
                            padding: "8px 12px",
                            borderTop: "1px solid var(--hp-border)",
                            fontSize: 12,
                            color: "var(--hp-critical)",
                          }}
                        >
                          Error: {doc.error_message}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
});
