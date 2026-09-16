"use client";

import React, { useRef, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  FileUp,
  Search,
  RefreshCw,
  X,
  FolderOpen,
} from "lucide-react";
import BaselineFolderBrowser from "../BaselineFolderBrowser";
import type { BaselineDoc } from "./types";
import { CATEGORY_LABELS, fmtDate } from "./constants";

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
  const [manageDocsOpen, setManageDocsOpen] = useState(false);

  const processed = baselineDocs.filter((d) => d.status === "processed");
  const totalItems = processed.reduce((sum, d) => sum + d.item_count, 0);
  const failedDocs = baselineDocs.filter((d) => d.status === "failed");
  const skippedDocs = baselineDocs.filter((d) => d.status === "skipped");
  const lastDate = baselineDocs.reduce((latest, d) => {
    if (!d.created_at) return latest;
    return d.created_at > latest ? d.created_at : latest;
  }, "");

  return (
    <div>
      {/* Summary card */}
      <div
        style={{
          borderRadius: 8,
          border: "1px solid var(--hp-border)",
          padding: "16px 20px",
          backgroundColor: "var(--hp-warm-100)",
          marginBottom: 16,
        }}
      >
        {baselineDocs.length > 0 ? (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--hp-text-primary)" }}>
                  Baseline Scope
                </div>
                <div style={{ fontSize: 12, color: "var(--hp-text-secondary)", marginTop: 2 }}>
                  {baselineDocs.length} document{baselineDocs.length !== 1 ? "s" : ""} · {totalItems} scope items
                  {lastDate ? ` · Last processed ${fmtDate(lastDate)}` : ""}
                </div>
              </div>
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

            {/* Category breakdown chips */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
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
                      fontSize: 11,
                      fontWeight: 500,
                      borderRadius: 999,
                      padding: "2px 10px",
                      backgroundColor: bg,
                      color,
                    }}
                  >
                    {count} {label}{count !== 1 ? "s" : ""}
                  </span>
                );
              })}
              {failedDocs.length > 0 && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    borderRadius: 999,
                    padding: "2px 10px",
                    backgroundColor: "var(--hp-critical-bg)",
                    color: "var(--hp-critical)",
                  }}
                >
                  {failedDocs.length} failed
                </span>
              )}
              {skippedDocs.length > 0 && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    borderRadius: 999,
                    padding: "2px 10px",
                    backgroundColor: "var(--hp-warm-100)",
                    color: "var(--hp-text-muted)",
                    border: "1px solid var(--hp-border)",
                  }}
                >
                  {skippedDocs.length} skipped
                </span>
              )}
            </div>
          </>
        ) : (
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--hp-text-primary)", marginBottom: 4 }}>
              Baseline Scope
            </div>
            <div style={{ fontSize: 13, color: "var(--hp-text-secondary)" }}>
              Optional — add tender or contract documents to compare changes against original scope.
              Claude extracts scope items from each document and flags potential variations in scan results.
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
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
            padding: "8px 16px",
            fontSize: 12,
            fontWeight: 600,
            color: "#fff",
            cursor: "pointer",
          }}
        >
          <FileUp size={14} /> {baselineUploading ? "Processing..." : "Upload File"}
        </button>
        <button
          onClick={onToggleProcoreBrowser}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            borderRadius: 8,
            border: "1px solid var(--hp-border)",
            padding: "8px 16px",
            fontSize: 12,
            fontWeight: 500,
            color: "var(--hp-text-secondary)",
            background: "var(--hp-surface)",
            cursor: "pointer",
          }}
        >
          <Search size={14} /> Browse Procore
        </button>
        {baselineDocs.length > 0 && (
          <button
            onClick={() => setManageDocsOpen((v) => !v)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              borderRadius: 8,
              border: "1px solid var(--hp-border)",
              padding: "8px 16px",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--hp-text-secondary)",
              background: "var(--hp-surface)",
              cursor: "pointer",
            }}
          >
            <FolderOpen size={14} /> Manage Documents
          </button>
        )}
        {baselineUploading && (
          <span style={{ fontSize: 11, color: "var(--hp-significant)" }}>Processing document...</span>
        )}
      </div>

      {/* Procore Documents browser */}
      {showProcoreBrowser && projectId && (
        <div style={{ marginBottom: 16 }}>
          <BaselineFolderBrowser
            company_id={companyId}
            project_id={projectId}
            processing={baselineUploading}
            progressText={baselineProgressText}
            onProcessFolder={onProcessFolder}
          />
        </div>
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

      {/* Manage Documents overlay */}
      {manageDocsOpen && baselineDocs.length > 0 && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setManageDocsOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          />
          {/* Panel */}
          <div
            style={{
              position: "relative",
              backgroundColor: "var(--hp-bg)",
              borderRadius: 12,
              border: "1px solid var(--hp-border)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              width: "90%",
              maxWidth: 700,
              maxHeight: "80vh",
              overflow: "auto",
              padding: 20,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "var(--hp-text-primary)" }}>
                Manage Baseline Documents
              </span>
              <button
                onClick={() => setManageDocsOpen(false)}
                aria-label="Close manage documents"
                style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
              >
                <X size={18} style={{ color: "var(--hp-text-muted)" }} aria-hidden="true" />
              </button>
            </div>

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
                          aria-label={`Remove ${doc.document_name} from baseline`}
                          style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}
                        >
                          <X size={14} style={{ color: "var(--hp-text-muted)" }} aria-hidden="true" />
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
          </div>
        </div>
      )}
    </div>
  );
});
