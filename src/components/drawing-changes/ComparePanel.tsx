"use client";

import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronRight, Search, Database, FileText } from "lucide-react";
import type { BaselineDoc, BaselineScopeItem, ChangeRow } from "./types";
import { CATEGORY_LABELS } from "./constants";
import DocCompareSection from "./DocCompareSection";
import { BaselineReportView } from "./BaselineReportView";

interface ComparePanelProps {
  baselineDocs: BaselineDoc[];
  changes: ChangeRow[];
  scanSummary: string | null;
  onGoToBaseline: () => void;
  onGoToScan: () => void;
  company_id: string;
  project_id: string;
  project_name: string;
}

type CategoryKey = BaselineScopeItem["category"];

const CATEGORY_ORDER: CategoryKey[] = [
  "inclusion",
  "exclusion",
  "allowance",
  "specification",
  "condition",
];

interface ScopeItemWithSource extends BaselineScopeItem {
  documentName: string;
}

export const ComparePanel = React.memo(function ComparePanel({
  baselineDocs,
  changes,
  scanSummary,
  onGoToBaseline,
  onGoToScan,
  company_id,
  project_id,
  project_name,
}: ComparePanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const [showReport, setShowReport] = useState(false);

  const processedDocs = baselineDocs.filter((d) => d.status === "processed");
  const hasBaseline = processedDocs.length > 0;

  // Flatten all scope items with source document name
  const allItems: ScopeItemWithSource[] = useMemo(() => {
    const items: ScopeItemWithSource[] = [];
    for (const doc of processedDocs) {
      for (const item of doc.scope_items ?? []) {
        items.push({ ...item, documentName: doc.document_name });
      }
    }
    return items;
  }, [processedDocs]);

  // Filter items by search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return allItems;
    const lower = searchQuery.toLowerCase();
    return allItems.filter(
      (item) =>
        item.item.toLowerCase().includes(lower) ||
        (item.detail && item.detail.toLowerCase().includes(lower)) ||
        (item.source_reference && item.source_reference.toLowerCase().includes(lower)) ||
        item.documentName.toLowerCase().includes(lower)
    );
  }, [allItems, searchQuery]);

  // Group by category
  const byCategory = useMemo(() => {
    const grouped: Record<string, ScopeItemWithSource[]> = {};
    for (const item of filteredItems) {
      const cat = item.category || "condition";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    }
    return grouped;
  }, [filteredItems]);

  const toggleCategory = (cat: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const hasChanges = changes.length > 0;
  const reportReady = hasBaseline && hasChanges;

  // Report view replaces compare content
  if (showReport) {
    return (
      <BaselineReportView
        changes={changes}
        baselineDocs={baselineDocs}
        scanSummary={scanSummary}
        companyId={company_id}
        projectId={project_id}
        projectName={project_name}
        onBack={() => setShowReport(false)}
      />
    );
  }

  // Empty state when no baseline docs exist
  if (!hasBaseline) {
    return (
      <div
        style={{
          borderRadius: 12,
          border: "1px solid var(--hp-border)",
          padding: "64px 32px",
          textAlign: "center",
          backgroundColor: "var(--hp-surface)",
        }}
      >
        <Database
          size={32}
          style={{ color: "var(--hp-text-muted)", marginBottom: 12 }}
          aria-hidden="true"
        />
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "var(--hp-text-primary)",
            marginBottom: 6,
          }}
        >
          No baseline documents uploaded
        </div>
        <div
          style={{
            fontSize: 13,
            color: "var(--hp-text-secondary)",
            maxWidth: 400,
            margin: "0 auto 16px",
          }}
        >
          Set up your baseline to compare documents against original scope.
        </div>
        <button
          onClick={onGoToBaseline}
          style={{
            borderRadius: 8,
            padding: "8px 18px",
            fontSize: 13,
            fontWeight: 600,
            color: "#fff",
            backgroundColor: "var(--hp-warm-800)",
            border: "none",
            cursor: "pointer",
          }}
        >
          Go to Baseline
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Baseline vs Current Report card */}
      <div
        style={{
          borderRadius: 10,
          border: "1px solid var(--hp-border)",
          backgroundColor: "var(--hp-surface)",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <FileText size={16} style={{ color: "var(--hp-warm-800)" }} />
            <span style={{ fontSize: 15, fontWeight: 700, color: "var(--hp-text-primary)" }}>
              Baseline vs Current Report
            </span>
          </div>
          <div style={{ fontSize: 12, color: "var(--hp-text-secondary)" }}>
            See how current drawing revisions compare to your baseline scope
          </div>
        </div>
        <button
          onClick={() => setShowReport(true)}
          disabled={!reportReady}
          style={{
            borderRadius: 8,
            padding: "9px 20px",
            fontSize: 13,
            fontWeight: 600,
            color: reportReady ? "#fff" : "var(--hp-text-muted)",
            backgroundColor: reportReady ? "var(--hp-warm-800)" : "var(--hp-warm-100)",
            border: "none",
            cursor: reportReady ? "pointer" : "not-allowed",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {!hasBaseline ? "Set up baseline first" : !hasChanges ? "Scan drawings first" : "Generate Report"}
        </button>
      </div>

      {/* Section 1: Baseline Scope Reference */}
      <div
        style={{
          borderRadius: 8,
          border: "1px solid var(--hp-border)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "12px 16px",
            backgroundColor: "var(--hp-warm-100)",
            borderBottom: "1px solid var(--hp-border)",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "var(--hp-text-primary)",
              marginBottom: 8,
            }}
          >
            Baseline Scope Reference
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--hp-text-secondary)",
              marginBottom: 10,
            }}
          >
            {processedDocs.length} document{processedDocs.length !== 1 ? "s" : ""} ·{" "}
            {allItems.length} scope item{allItems.length !== 1 ? "s" : ""}
          </div>

          {/* Search input */}
          <div style={{ position: "relative" }}>
            <Search
              size={14}
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--hp-text-muted)",
                pointerEvents: "none",
              }}
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search scope items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                borderRadius: 6,
                border: "1px solid var(--hp-border)",
                padding: "7px 10px 7px 30px",
                fontSize: 12,
                backgroundColor: "var(--hp-surface)",
                color: "var(--hp-text-primary)",
              }}
            />
          </div>
        </div>

        {/* Category sections */}
        <div style={{ maxHeight: 500, overflowY: "auto" }}>
          {filteredItems.length === 0 ? (
            <div
              style={{
                padding: "24px 16px",
                textAlign: "center",
                fontSize: 13,
                color: "var(--hp-text-muted)",
              }}
            >
              {searchQuery ? "No items match your search" : "No scope items extracted"}
            </div>
          ) : (
            CATEGORY_ORDER.filter((cat) => byCategory[cat] && byCategory[cat].length > 0).map(
              (cat) => {
                const items = byCategory[cat];
                const catStyle = CATEGORY_LABELS[cat] ?? CATEGORY_LABELS.condition;
                const isCollapsed = collapsedCategories.has(cat);

                return (
                  <div key={cat}>
                    <div
                      onClick={() => toggleCategory(cat)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 16px",
                        cursor: "pointer",
                        userSelect: "none",
                        borderTop: "1px solid var(--hp-border)",
                        backgroundColor: "var(--hp-bg)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {isCollapsed ? (
                          <ChevronRight
                            size={14}
                            style={{ color: "var(--hp-text-muted)" }}
                          />
                        ) : (
                          <ChevronDown
                            size={14}
                            style={{ color: "var(--hp-text-muted)" }}
                          />
                        )}
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "var(--hp-text-primary)",
                          }}
                        >
                          {catStyle.label}s
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 500,
                          borderRadius: 999,
                          padding: "1px 8px",
                          backgroundColor: catStyle.bg,
                          color: catStyle.color,
                        }}
                      >
                        {items.length}
                      </span>
                    </div>

                    {!isCollapsed && (
                      <div>
                        {items.map((item, i) => (
                          <div
                            key={`${cat}-${i}`}
                            style={{
                              padding: "8px 16px 8px 40px",
                              borderTop: "1px solid var(--hp-border)",
                              fontSize: 12,
                            }}
                          >
                            <div
                              style={{
                                fontWeight: 500,
                                color: "var(--hp-text-primary)",
                              }}
                            >
                              {item.item}
                            </div>
                            {item.detail && (
                              <div
                                style={{
                                  color: "var(--hp-text-secondary)",
                                  marginTop: 2,
                                  fontSize: 11,
                                }}
                              >
                                {item.detail}
                              </div>
                            )}
                            {item.source_reference && (
                              <div
                                style={{
                                  color: "var(--hp-text-muted)",
                                  fontSize: 10,
                                  marginTop: 2,
                                }}
                              >
                                {item.source_reference}
                              </div>
                            )}
                            <div
                              style={{
                                color: "var(--hp-text-muted)",
                                fontSize: 10,
                                marginTop: 2,
                              }}
                            >
                              {item.documentName}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
            )
          )}
        </div>
      </div>

      {/* Section 2: Compare Document */}
      <DocCompareSection
        company_id={company_id}
        project_id={project_id}
        project_name={project_name}
      />
    </div>
  );
});
