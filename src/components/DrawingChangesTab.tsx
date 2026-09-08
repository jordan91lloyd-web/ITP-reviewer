"use client";

import { useState, useCallback } from "react";
import {
  Download,
  RefreshCw,
  Search,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Plus,
  Minus,
  ArrowRightLeft,
  MoveRight,
  ChevronsDown,
  ChevronsUp,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

interface DashboardProject {
  id: number;
  name: string;
  display_name: string;
}

interface Props {
  company_id: string;
  projects: DashboardProject[];
}

interface DrawingPair {
  drawing_id: number;
  drawing_number: string;
  drawing_title: string;
  discipline: string;
  revision_count: number;
  old_revision: { revision_number: string; pdf_url: string };
  new_revision: { revision_number: string; pdf_url: string };
}

interface ChangeRow {
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
}

interface ScanRecord {
  id: string;
  project_name: string;
  status: string;
  total_drawings: number;
  completed_drawings: number;
  failed_drawings: number;
  created_at: string;
  completed_at: string | null;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const CHANGE_TYPE_LABELS: Record<string, string> = {
  addition: "Addition",
  deletion: "Deletion",
  spec_change: "Spec Change",
  relocation: "Relocation",
};

const CHANGE_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  addition: { bg: "#DCFCE7", text: "#166534" },
  deletion: { bg: "#FEE2E2", text: "#991B1B" },
  spec_change: { bg: "#FEF3C7", text: "#92400E" },
  relocation: { bg: "#DBEAFE", text: "#1E40AF" },
};

const SEVERITY_COLORS: Record<string, { bg: string; text: string }> = {
  high: { bg: "#FEE2E2", text: "#991B1B" },
  medium: { bg: "#FEF3C7", text: "#92400E" },
  low: { bg: "#F0FDF4", text: "#166534" },
};

const CHANGE_TYPE_ICONS: Record<string, typeof Plus> = {
  addition: Plus,
  deletion: Minus,
  spec_change: ArrowRightLeft,
  relocation: MoveRight,
};

// ── Helpers ────────────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function DrawingChangesTab({ company_id, projects }: Props) {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");

  // Drawing discovery
  const [drawingPairs, setDrawingPairs] = useState<DrawingPair[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalDrawings, setTotalDrawings] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [filterText, setFilterText] = useState("");
  const [collapsedDiscovery, setCollapsedDiscovery] = useState<Set<string>>(new Set());

  // Scanning
  const [scanProgress, setScanProgress] = useState({ current: 0, total: 0, batchNum: 0, totalBatches: 0 });

  // Results
  const [scan, setScan] = useState<ScanRecord | null>(null);
  const [changes, setChanges] = useState<ChangeRow[]>([]);
  const [byDiscipline, setByDiscipline] = useState<Record<string, ChangeRow[]>>({});
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [highSeverityOnly, setHighSeverityOnly] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Fetch drawings with revisions ────────────────────────────────────────

  const fetchDrawings = useCallback(
    async (pid: string) => {
      setLoading(true);
      setError(null);
      setDrawingPairs([]);
      setSelectedIds(new Set());
      setCollapsedDiscovery(new Set());
      try {
        const res = await fetch(
          `/api/drawing-changes/drawings?company_id=${company_id}&project_id=${pid}`
        );
        if (!res.ok) throw new Error("Failed to fetch drawings");
        const data = await res.json();
        setDrawingPairs(data.drawings_with_revisions ?? []);
        setTotalDrawings(data.total_drawings ?? 0);
        const ids = new Set<number>(
          (data.drawings_with_revisions ?? []).map((d: DrawingPair) => d.drawing_id)
        );
        setSelectedIds(ids);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch drawings");
      } finally {
        setLoading(false);
      }
    },
    [company_id]
  );

  // ── Load previous scan results ───────────────────────────────────────────

  const loadPreviousResults = useCallback(
    async (pid: string) => {
      try {
        const res = await fetch(
          `/api/drawing-changes/results?company_id=${company_id}&project_id=${pid}`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data.scan) {
          setScan(data.scan);
          setChanges(data.changes ?? []);
          setByDiscipline(data.by_discipline ?? {});
          setExpandedResults(new Set(Object.keys(data.by_discipline ?? {})));
        }
      } catch {
        // No previous results
      }
    },
    [company_id]
  );

  // ── Project selection ────────────────────────────────────────────────────

  const handleProjectChange = useCallback(
    (pid: string) => {
      setProjectId(pid);
      const proj = projects.find((p) => String(p.id) === pid);
      setProjectName(proj?.display_name ?? proj?.name ?? "");
      setStep(0);
      setScan(null);
      setChanges([]);
      setByDiscipline({});
      if (pid) {
        fetchDrawings(pid);
        loadPreviousResults(pid);
      }
    },
    [projects, fetchDrawings, loadPreviousResults]
  );

  // ── Drawing selection helpers ────────────────────────────────────────────

  const toggleDrawing = useCallback((drawingId: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(drawingId)) next.delete(drawingId);
      else next.add(drawingId);
      return next;
    });
  }, []);

  const toggleDisciplineSelection = useCallback(
    (discipline: string, pairs: DrawingPair[]) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        const allSelected = pairs.every((p) => next.has(p.drawing_id));
        for (const p of pairs) {
          if (allSelected) next.delete(p.drawing_id);
          else next.add(p.drawing_id);
        }
        return next;
      });
    },
    []
  );

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(drawingPairs.map((d) => d.drawing_id)));
  }, [drawingPairs]);

  const selectNone = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  // ── Discovery accordion ──────────────────────────────────────────────────

  const toggleDiscoverySection = useCallback((discipline: string) => {
    setCollapsedDiscovery((prev) => {
      const next = new Set(prev);
      if (next.has(discipline)) next.delete(discipline);
      else next.add(discipline);
      return next;
    });
  }, []);

  const expandAllDiscovery = useCallback(() => {
    setCollapsedDiscovery(new Set());
  }, []);

  const collapseAllDiscovery = useCallback(() => {
    const allDisc = new Set(drawingPairs.map((d) => d.discipline));
    setCollapsedDiscovery(allDisc);
  }, [drawingPairs]);

  // ── Run scan (batched) ────────────────────────────────────────────────────

  const BATCH_SIZE = 5;

  const runScan = useCallback(async () => {
    const selected = drawingPairs.filter((d) => selectedIds.has(d.drawing_id));
    if (selected.length === 0) return;

    setStep(1);
    setError(null);
    const totalBatches = Math.ceil(selected.length / BATCH_SIZE);
    setScanProgress({ current: 0, total: selected.length, batchNum: 0, totalBatches });

    // Split into batches
    const batches: DrawingPair[][] = [];
    for (let i = 0; i < selected.length; i += BATCH_SIZE) {
      batches.push(selected.slice(i, i + BATCH_SIZE));
    }

    let scanId: string | null = null;
    let totalCompleted = 0;
    let totalFailed = 0;

    try {
      for (let bi = 0; bi < batches.length; bi++) {
        const batch = batches[bi];

        const isLastBatch = bi === batches.length - 1;
        const res: Response = await fetch("/api/drawing-changes/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company_id,
            project_id: projectId,
            project_name: projectName,
            drawing_pairs: batch,
            scan_id: scanId,
            total_drawings: selected.length,
            is_last_batch: isLastBatch,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error ?? `Batch ${bi + 1} failed`);
        }

        const data: { scan_id: string; total_completed: number; total_failed: number } = await res.json();
        scanId = data.scan_id;
        totalCompleted = data.total_completed;
        totalFailed = data.total_failed;
        setScanProgress({ current: totalCompleted + totalFailed, total: selected.length, batchNum: bi + 1, totalBatches });
      }

      // Finalize scan status
      if (scanId) {
        // Load full results
        const resultsRes = await fetch(`/api/drawing-changes/results?scan_id=${scanId}`);
        if (resultsRes.ok) {
          const resultsData = await resultsRes.json();
          setScan(resultsData.scan);
          setChanges(resultsData.changes ?? []);
          setByDiscipline(resultsData.by_discipline ?? {});
          setExpandedResults(new Set(Object.keys(resultsData.by_discipline ?? {})));
        }
      }

      setStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scan failed");
      // If partial results exist, show them
      if (scanId) {
        const resultsRes = await fetch(`/api/drawing-changes/results?scan_id=${scanId}`).catch(() => null);
        if (resultsRes?.ok) {
          const resultsData = await resultsRes.json();
          setScan(resultsData.scan);
          setChanges(resultsData.changes ?? []);
          setByDiscipline(resultsData.by_discipline ?? {});
          setExpandedResults(new Set(Object.keys(resultsData.by_discipline ?? {})));
          setStep(2);
          return;
        }
      }
      setStep(0);
    }
  }, [drawingPairs, selectedIds, company_id, projectId, projectName]);

  // ── Results accordion ────────────────────────────────────────────────────

  const toggleResultSection = useCallback((discipline: string) => {
    setExpandedResults((prev) => {
      const next = new Set(prev);
      if (next.has(discipline)) next.delete(discipline);
      else next.add(discipline);
      return next;
    });
  }, []);

  const expandAllResults = useCallback(() => {
    setExpandedResults(new Set(Object.keys(byDiscipline)));
  }, [byDiscipline]);

  const collapseAllResults = useCallback(() => {
    setExpandedResults(new Set());
  }, []);

  // ── Derived data ─────────────────────────────────────────────────────────

  const filteredPairs = drawingPairs.filter((d) => {
    if (!filterText) return true;
    const lower = filterText.toLowerCase();
    return (
      d.drawing_number.toLowerCase().includes(lower) ||
      d.drawing_title.toLowerCase().includes(lower) ||
      d.discipline.toLowerCase().includes(lower)
    );
  });

  const pairsByDiscipline: Record<string, DrawingPair[]> = {};
  for (const pair of filteredPairs) {
    if (!pairsByDiscipline[pair.discipline]) pairsByDiscipline[pair.discipline] = [];
    pairsByDiscipline[pair.discipline].push(pair);
  }

  const disciplineEntries = Object.entries(pairsByDiscipline).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        padding: "24px 32px",
        maxWidth: 1200,
        margin: "0 auto",
        height: "calc(100vh - 100px)",
        overflowY: "auto",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--hp-warm-900)", margin: 0 }}>
          Drawing Revision Changes
        </h2>
        <p style={{ fontSize: 13, color: "var(--hp-text-secondary)", marginTop: 4 }}>
          Compare drawing revisions to detect scope and specification changes that may require
          variation pricing.
        </p>
      </div>

      {/* Project selector + actions row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <select
          value={projectId}
          onChange={(e) => handleProjectChange(e.target.value)}
          style={{
            borderRadius: 8,
            border: "1px solid var(--hp-border)",
            padding: "8px 12px",
            fontSize: 13,
            backgroundColor: "var(--hp-surface)",
            color: "var(--hp-warm-900)",
            minWidth: 280,
          }}
        >
          <option value="">Select a project</option>
          {projects.map((p) => (
            <option key={p.id} value={String(p.id)}>
              {p.display_name || p.name}
            </option>
          ))}
        </select>

        {projectId && scan && step !== 1 && (
          <button
            onClick={() => { setStep(0); fetchDrawings(projectId); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              borderRadius: 8,
              border: "1px solid var(--hp-border)",
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--hp-warm-700)",
              background: "none",
              cursor: "pointer",
            }}
          >
            <RefreshCw size={14} /> New Scan
          </button>
        )}
      </div>

      {error && (
        <div
          style={{
            borderRadius: 8,
            border: "1px solid #FCA5A5",
            backgroundColor: "#FEF2F2",
            color: "#991B1B",
            padding: 12,
            fontSize: 13,
            marginBottom: 16,
          }}
        >
          {error}
        </div>
      )}

      {/* ═══ Step 0: Drawing selection ═══ */}
      {step === 0 && projectId && (
        <>
          {loading ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--hp-text-secondary)" }}>
              <RefreshCw size={14} className="animate-spin" /> Loading drawings register...
            </div>
          ) : drawingPairs.length === 0 ? (
            <div
              style={{
                borderRadius: 8,
                border: "1px solid var(--hp-border)",
                padding: 32,
                textAlign: "center",
                fontSize: 13,
                color: "var(--hp-text-secondary)",
              }}
            >
              No drawings with multiple revisions found.
              {totalDrawings > 0 && ` (${totalDrawings} drawing${totalDrawings !== 1 ? "s" : ""} total, all on their first revision)`}
            </div>
          ) : (
            <>
              {/* Toolbar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <div style={{ fontSize: 13, color: "var(--hp-text-secondary)" }}>
                  <strong style={{ color: "var(--hp-warm-900)" }}>{drawingPairs.length}</strong> drawing
                  {drawingPairs.length !== 1 ? "s" : ""} with revisions ({totalDrawings} total)
                  {" · "}
                  <strong style={{ color: "var(--hp-warm-900)" }}>{selectedIds.size}</strong> selected
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ position: "relative" }}>
                    <Search
                      size={14}
                      style={{ position: "absolute", left: 10, top: 9, color: "var(--hp-text-muted)" }}
                    />
                    <input
                      type="text"
                      placeholder="Filter drawings..."
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                      style={{
                        borderRadius: 8,
                        border: "1px solid var(--hp-border)",
                        padding: "7px 12px 7px 30px",
                        fontSize: 13,
                        backgroundColor: "var(--hp-surface)",
                        color: "var(--hp-warm-900)",
                        width: 200,
                      }}
                    />
                  </div>
                  <button onClick={expandAllDiscovery} title="Expand all" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                    <ChevronsDown size={16} style={{ color: "var(--hp-text-muted)" }} />
                  </button>
                  <button onClick={collapseAllDiscovery} title="Collapse all" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                    <ChevronsUp size={16} style={{ color: "var(--hp-text-muted)" }} />
                  </button>
                  <span style={{ color: "var(--hp-border)", fontSize: 16 }}>|</span>
                  <button
                    onClick={selectAll}
                    style={{ fontSize: 12, fontWeight: 500, color: "var(--hp-accent)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                  >
                    Select all
                  </button>
                  <button
                    onClick={selectNone}
                    style={{ fontSize: 12, fontWeight: 500, color: "var(--hp-text-muted)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Discipline accordion */}
              <div style={{ borderRadius: 8, border: "1px solid var(--hp-border)", overflow: "hidden", marginBottom: 16 }}>
                {disciplineEntries.map(([discipline, pairs], di) => {
                  const isCollapsed = collapsedDiscovery.has(discipline);
                  const selCount = pairs.filter((p) => selectedIds.has(p.drawing_id)).length;
                  const allSelected = selCount === pairs.length;

                  return (
                    <div key={discipline}>
                      {/* Discipline header — clickable to expand/collapse */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "10px 16px",
                          backgroundColor: "var(--hp-surface-raised)",
                          borderTop: di > 0 ? "1px solid var(--hp-border)" : "none",
                          cursor: "pointer",
                          userSelect: "none",
                        }}
                        onClick={() => toggleDiscoverySection(discipline)}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {isCollapsed ? (
                            <ChevronRight size={16} style={{ color: "var(--hp-warm-600)" }} />
                          ) : (
                            <ChevronDown size={16} style={{ color: "var(--hp-warm-600)" }} />
                          )}
                          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--hp-warm-800)" }}>
                            {discipline}
                          </span>
                          <span style={{ fontSize: 12, color: "var(--hp-text-muted)", fontWeight: 400 }}>
                            ({pairs.length} drawing{pairs.length !== 1 ? "s" : ""})
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>
                            {selCount}/{pairs.length} selected
                          </span>
                          <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={(e) => {
                              e.stopPropagation();
                              toggleDisciplineSelection(discipline, pairs);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            style={{ accentColor: "var(--hp-accent)" }}
                          />
                        </div>
                      </div>

                      {/* Drawing rows */}
                      {!isCollapsed &&
                        pairs.map((pair) => (
                          <label
                            key={pair.drawing_id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                              padding: "8px 16px 8px 44px",
                              borderTop: "1px solid var(--hp-border)",
                              cursor: "pointer",
                              fontSize: 13,
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={selectedIds.has(pair.drawing_id)}
                              onChange={() => toggleDrawing(pair.drawing_id)}
                              style={{ accentColor: "var(--hp-accent)" }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div
                                style={{
                                  fontWeight: 500,
                                  color: "var(--hp-warm-900)",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {pair.drawing_number} — {pair.drawing_title}
                              </div>
                              <div style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 1 }}>
                                Rev {pair.old_revision.revision_number} → Rev {pair.new_revision.revision_number}
                                {" · "}
                                {pair.revision_count} revision{pair.revision_count !== 1 ? "s" : ""}
                              </div>
                            </div>
                          </label>
                        ))}
                    </div>
                  );
                })}
              </div>

              {/* Scan button + previous results */}
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <button
                  onClick={runScan}
                  disabled={selectedIds.size === 0}
                  style={{
                    borderRadius: 8,
                    padding: "10px 20px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#fff",
                    backgroundColor: selectedIds.size === 0 ? "#CBD5E1" : "var(--hp-accent)",
                    border: "none",
                    cursor: selectedIds.size === 0 ? "default" : "pointer",
                  }}
                >
                  Scan {selectedIds.size} Drawing{selectedIds.size !== 1 ? "s" : ""} for Changes
                </button>

                {scan && (
                  <button
                    onClick={() => setStep(2)}
                    style={{
                      fontSize: 13,
                      color: "var(--hp-accent)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    View previous scan from {fmtDate(scan.created_at)} ({changes.length} change
                    {changes.length !== 1 ? "s" : ""})
                  </button>
                )}
              </div>
            </>
          )}
        </>
      )}

      {/* ═══ Step 1: Scanning progress ═══ */}
      {step === 1 && (
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
            style={{ color: "var(--hp-accent)", margin: "0 auto 12px" }}
          />
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--hp-warm-900)" }}>
            Scanning drawings for changes...
          </div>
          <div style={{ fontSize: 12, color: "var(--hp-text-secondary)", marginTop: 4 }}>
            Batch {scanProgress.batchNum}/{scanProgress.totalBatches} · {scanProgress.current}/{scanProgress.total} drawings processed
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
                backgroundColor: "var(--hp-accent)",
                transition: "width 0.3s",
                width: scanProgress.total > 0 ? `${(scanProgress.current / scanProgress.total) * 100}%` : "0%",
              }}
            />
          </div>
        </div>
      )}

      {/* ═══ Step 2: Results ═══ */}
      {step === 2 && scan && (() => {
        // Apply severity filter
        const filteredChanges = highSeverityOnly
          ? changes.filter((c) => c.severity === "high")
          : changes;

        // Group by discipline → drawing
        const filteredByDiscipline: Record<string, ChangeRow[]> = {};
        for (const c of filteredChanges) {
          const disc = c.discipline || "Other";
          if (!filteredByDiscipline[disc]) filteredByDiscipline[disc] = [];
          filteredByDiscipline[disc].push(c);
        }

        // Top drawings by change count (unfiltered)
        const drawingCounts = new Map<string, number>();
        for (const c of changes) {
          const key = `${c.drawing_number}`;
          drawingCounts.set(key, (drawingCounts.get(key) ?? 0) + 1);
        }
        const topDrawings = [...drawingCounts.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);

        return (
        <>
          {/* Scan summary bar */}
          <div
            style={{
              borderRadius: 8,
              border: "1px solid var(--hp-border)",
              backgroundColor: "var(--hp-surface-raised)",
              padding: 16,
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--hp-warm-900)" }}>
                  {projectName} — Scan {fmtDate(scan.created_at)}
                </div>
                <div style={{ fontSize: 12, color: "var(--hp-text-secondary)", marginTop: 2 }}>
                  {scan.completed_drawings} drawing{scan.completed_drawings !== 1 ? "s" : ""} compared ·{" "}
                  {changes.length} change{changes.length !== 1 ? "s" : ""} detected
                  {scan.failed_drawings > 0 && (
                    <span style={{ color: "#DC2626" }}> · {scan.failed_drawings} failed</span>
                  )}
                </div>
                {/* Top drawings by change count */}
                {topDrawings.length > 0 && (
                  <div style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 4 }}>
                    Most changes: {topDrawings.map(([num, count]) => `${num} (${count})`).join(", ")}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <a
                  href={`/api/drawing-changes/export?scan_id=${scan.id}&format=csv`}
                  download
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    borderRadius: 8,
                    border: "1px solid var(--hp-border)",
                    padding: "6px 12px",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--hp-warm-700)",
                    textDecoration: "none",
                  }}
                >
                  <Download size={12} /> CSV
                </a>
                <a
                  href={`/api/drawing-changes/export?scan_id=${scan.id}&format=pdf`}
                  download
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    borderRadius: 8,
                    border: "1px solid var(--hp-border)",
                    padding: "6px 12px",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--hp-warm-700)",
                    textDecoration: "none",
                  }}
                >
                  <Download size={12} /> PDF
                </a>
                <button
                  onClick={() => setStep(0)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    borderRadius: 8,
                    border: "1px solid var(--hp-border)",
                    padding: "6px 12px",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--hp-warm-700)",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  <RefreshCw size={12} /> New Scan
                </button>
              </div>
            </div>
          </div>

          {/* Summary pills + severity filter */}
          {changes.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 12 }}>
              {(["addition", "deletion", "spec_change", "relocation"] as const).map((type) => {
                const count = changes.filter((c) => c.change_type === type).length;
                if (count === 0) return null;
                const colors = CHANGE_TYPE_COLORS[type];
                return (
                  <span
                    key={type}
                    style={{
                      borderRadius: 999,
                      padding: "4px 12px",
                      fontSize: 12,
                      fontWeight: 500,
                      backgroundColor: colors.bg,
                      color: colors.text,
                    }}
                  >
                    {count} {CHANGE_TYPE_LABELS[type]}{count !== 1 ? "s" : ""}
                  </span>
                );
              })}
              {(() => {
                const highCount = changes.filter((c) => c.severity === "high").length;
                if (highCount === 0) return null;
                return (
                  <button
                    onClick={() => setHighSeverityOnly((v) => !v)}
                    style={{
                      borderRadius: 999,
                      padding: "4px 12px",
                      fontSize: 12,
                      fontWeight: 500,
                      backgroundColor: highSeverityOnly ? SEVERITY_COLORS.high.text : SEVERITY_COLORS.high.bg,
                      color: highSeverityOnly ? "#fff" : SEVERITY_COLORS.high.text,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <AlertTriangle size={11} /> {highCount} High Severity {highSeverityOnly ? "✕" : ""}
                  </button>
                );
              })()}
              {highSeverityOnly && (
                <span style={{ fontSize: 12, color: "var(--hp-text-muted)" }}>
                  Showing {filteredChanges.length} of {changes.length} changes
                </span>
              )}
            </div>
          )}

          {/* Expand/Collapse controls */}
          {filteredChanges.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <button onClick={expandAllResults} title="Expand all" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                <ChevronsDown size={16} style={{ color: "var(--hp-text-muted)" }} />
              </button>
              <button onClick={collapseAllResults} title="Collapse all" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                <ChevronsUp size={16} style={{ color: "var(--hp-text-muted)" }} />
              </button>
              <span style={{ fontSize: 12, color: "var(--hp-text-muted)" }}>
                {expandedResults.size}/{Object.keys(filteredByDiscipline).length} disciplines expanded
              </span>
            </div>
          )}

          {filteredChanges.length === 0 ? (
            <div
              style={{
                borderRadius: 8,
                border: "1px solid var(--hp-border)",
                padding: 32,
                textAlign: "center",
                fontSize: 13,
                color: "var(--hp-text-secondary)",
              }}
            >
              {highSeverityOnly
                ? "No high severity changes detected."
                : "No scope or specification changes detected in the scanned drawings."}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {Object.entries(filteredByDiscipline)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([discipline, disciplineChanges]) => {
                  const isExpanded = expandedResults.has(discipline);
                  const highCount = disciplineChanges.filter((c) => c.severity === "high").length;

                  // Group by drawing within this discipline
                  const byDrawing: { key: string; number: string; title: string; rev: string; changes: ChangeRow[] }[] = [];
                  const drawingMap = new Map<string, typeof byDrawing[0]>();
                  for (const c of disciplineChanges) {
                    const key = `${c.drawing_number}|${c.old_revision}|${c.new_revision}`;
                    let group = drawingMap.get(key);
                    if (!group) {
                      group = {
                        key,
                        number: c.drawing_number,
                        title: c.drawing_title,
                        rev: `${c.old_revision} → ${c.new_revision}`,
                        changes: [],
                      };
                      drawingMap.set(key, group);
                      byDrawing.push(group);
                    }
                    group.changes.push(c);
                  }

                  return (
                    <div
                      key={discipline}
                      style={{ borderRadius: 8, border: "1px solid var(--hp-border)", overflow: "hidden" }}
                    >
                      {/* Discipline header */}
                      <div
                        onClick={() => toggleResultSection(discipline)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 16px",
                          backgroundColor: "var(--hp-surface-raised)",
                          cursor: "pointer",
                          userSelect: "none",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {isExpanded ? (
                            <ChevronDown size={16} style={{ color: "var(--hp-warm-600)" }} />
                          ) : (
                            <ChevronRight size={16} style={{ color: "var(--hp-warm-600)" }} />
                          )}
                          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--hp-warm-900)" }}>
                            {discipline}
                          </span>
                          <span style={{ fontSize: 12, color: "var(--hp-text-muted)" }}>
                            ({disciplineChanges.length} change{disciplineChanges.length !== 1 ? "s" : ""} across {byDrawing.length} drawing{byDrawing.length !== 1 ? "s" : ""})
                          </span>
                        </div>
                        {highCount > 0 && (
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              borderRadius: 999,
                              padding: "2px 8px",
                              fontSize: 11,
                              fontWeight: 500,
                              backgroundColor: SEVERITY_COLORS.high.bg,
                              color: SEVERITY_COLORS.high.text,
                            }}
                          >
                            <AlertTriangle size={10} /> {highCount}
                          </span>
                        )}
                      </div>

                      {/* Changes grouped by drawing */}
                      {isExpanded && (
                        <div>
                          {byDrawing.map((group) => {
                            const groupHigh = group.changes.filter((c) => c.severity === "high").length;
                            return (
                              <div key={group.key}>
                                {/* Drawing sub-header */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "8px 16px 8px 44px",
                                    borderTop: "1px solid var(--hp-border)",
                                    backgroundColor: "#FAFAF9",
                                  }}
                                >
                                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--hp-warm-800)" }}>
                                      {group.number}
                                    </span>
                                    <span style={{ fontSize: 12, color: "var(--hp-text-secondary)" }}>
                                      {group.title}
                                    </span>
                                    <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>
                                      Rev {group.rev}
                                    </span>
                                  </div>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>
                                      {group.changes.length} change{group.changes.length !== 1 ? "s" : ""}
                                    </span>
                                    {groupHigh > 0 && (
                                      <span
                                        style={{
                                          borderRadius: 999,
                                          padding: "1px 6px",
                                          fontSize: 10,
                                          fontWeight: 500,
                                          backgroundColor: SEVERITY_COLORS.high.bg,
                                          color: SEVERITY_COLORS.high.text,
                                        }}
                                      >
                                        {groupHigh} high
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Change rows */}
                                {group.changes.map((change) => {
                                  const typeColors = CHANGE_TYPE_COLORS[change.change_type] ?? CHANGE_TYPE_COLORS.spec_change;
                                  const sevColors = SEVERITY_COLORS[change.severity] ?? SEVERITY_COLORS.medium;
                                  const Icon = CHANGE_TYPE_ICONS[change.change_type] ?? ArrowRightLeft;

                                  return (
                                    <div
                                      key={change.id}
                                      style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 12,
                                        padding: "10px 16px 10px 44px",
                                        borderTop: "1px solid var(--hp-border)",
                                        fontSize: 13,
                                      }}
                                    >
                                      {/* Type pill */}
                                      <span
                                        style={{
                                          display: "inline-flex",
                                          alignItems: "center",
                                          gap: 4,
                                          borderRadius: 999,
                                          padding: "2px 10px",
                                          fontSize: 11,
                                          fontWeight: 500,
                                          backgroundColor: typeColors.bg,
                                          color: typeColors.text,
                                          whiteSpace: "nowrap",
                                          flexShrink: 0,
                                        }}
                                      >
                                        <Icon size={10} />
                                        {CHANGE_TYPE_LABELS[change.change_type] ?? change.change_type}
                                      </span>
                                      {/* Description */}
                                      <div style={{ flex: 1, minWidth: 0, color: "var(--hp-warm-800)" }}>
                                        {change.description}
                                        {change.location_on_drawing && (
                                          <div style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 3 }}>
                                            📍 {change.location_on_drawing}
                                          </div>
                                        )}
                                      </div>
                                      {/* Severity */}
                                      <span
                                        style={{
                                          borderRadius: 999,
                                          padding: "2px 10px",
                                          fontSize: 11,
                                          fontWeight: 500,
                                          textTransform: "capitalize",
                                          backgroundColor: sevColors.bg,
                                          color: sevColors.text,
                                          whiteSpace: "nowrap",
                                          flexShrink: 0,
                                        }}
                                      >
                                        {change.severity}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </>
        );
      })()}
    </div>
  );
}
