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
  // Step 0: Project selection + drawing discovery
  // Step 1: Scanning
  // Step 2: Results
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");

  // Drawing discovery
  const [drawingPairs, setDrawingPairs] = useState<DrawingPair[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalDrawings, setTotalDrawings] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [filterText, setFilterText] = useState("");

  // Scanning
  const [scanProgress, setScanProgress] = useState({ current: 0, total: 0 });

  // Results
  const [scan, setScan] = useState<ScanRecord | null>(null);
  const [changes, setChanges] = useState<ChangeRow[]>([]);
  const [byDiscipline, setByDiscipline] = useState<Record<string, ChangeRow[]>>(
    {}
  );
  const [expandedDisciplines, setExpandedDisciplines] = useState<Set<string>>(
    new Set()
  );
  const [error, setError] = useState<string | null>(null);

  // ── Fetch drawings with revisions ────────────────────────────────────────

  const fetchDrawings = useCallback(
    async (pid: string) => {
      setLoading(true);
      setError(null);
      setDrawingPairs([]);
      setSelectedIds(new Set());
      try {
        const res = await fetch(
          `/api/drawing-changes/drawings?company_id=${company_id}&project_id=${pid}`
        );
        if (!res.ok) throw new Error("Failed to fetch drawings");
        const data = await res.json();
        setDrawingPairs(data.drawings_with_revisions ?? []);
        setTotalDrawings(data.total_drawings ?? 0);
        // Select all by default
        const ids = new Set<number>(
          (data.drawings_with_revisions ?? []).map(
            (d: DrawingPair) => d.drawing_id
          )
        );
        setSelectedIds(ids);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch drawings"
        );
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
          setExpandedDisciplines(
            new Set(Object.keys(data.by_discipline ?? {}))
          );
        }
      } catch {
        // Ignore — no previous results
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

  // ── Toggle drawing selection ─────────────────────────────────────────────

  const toggleDrawing = useCallback((drawingId: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(drawingId)) next.delete(drawingId);
      else next.add(drawingId);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(drawingPairs.map((d) => d.drawing_id)));
  }, [drawingPairs]);

  const selectNone = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  // ── Run scan ─────────────────────────────────────────────────────────────

  const runScan = useCallback(async () => {
    const selected = drawingPairs.filter((d) => selectedIds.has(d.drawing_id));
    if (selected.length === 0) return;

    setStep(1);
    setError(null);
    setScanProgress({ current: 0, total: selected.length });

    try {
      const res = await fetch("/api/drawing-changes/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_id,
          project_id: projectId,
          project_name: projectName,
          drawing_pairs: selected,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Scan failed");
      }

      const data = await res.json();
      setScanProgress({
        current: data.completed_drawings,
        total: data.total_drawings,
      });

      // Load full results
      const resultsRes = await fetch(
        `/api/drawing-changes/results?scan_id=${data.scan_id}`
      );
      if (resultsRes.ok) {
        const resultsData = await resultsRes.json();
        setScan(resultsData.scan);
        setChanges(resultsData.changes ?? []);
        setByDiscipline(resultsData.by_discipline ?? {});
        setExpandedDisciplines(
          new Set(Object.keys(resultsData.by_discipline ?? {}))
        );
      }

      setStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scan failed");
      setStep(0);
    }
  }, [drawingPairs, selectedIds, company_id, projectId, projectName]);

  // ── Toggle discipline accordion ──────────────────────────────────────────

  const toggleDiscipline = useCallback((discipline: string) => {
    setExpandedDisciplines((prev) => {
      const next = new Set(prev);
      if (next.has(discipline)) next.delete(discipline);
      else next.add(discipline);
      return next;
    });
  }, []);

  // ── Filter drawings ──────────────────────────────────────────────────────

  const filteredPairs = drawingPairs.filter((d) => {
    if (!filterText) return true;
    const lower = filterText.toLowerCase();
    return (
      d.drawing_number.toLowerCase().includes(lower) ||
      d.drawing_title.toLowerCase().includes(lower) ||
      d.discipline.toLowerCase().includes(lower)
    );
  });

  // Group filtered pairs by discipline for display
  const pairsByDiscipline: Record<string, DrawingPair[]> = {};
  for (const pair of filteredPairs) {
    if (!pairsByDiscipline[pair.discipline])
      pairsByDiscipline[pair.discipline] = [];
    pairsByDiscipline[pair.discipline].push(pair);
  }

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2
          className="text-xl font-bold"
          style={{ color: "var(--hp-warm-900)" }}
        >
          Drawing Revision Changes
        </h2>
        <p className="text-sm mt-1" style={{ color: "var(--hp-text-secondary)" }}>
          Compare drawing revisions to detect scope and specification changes
          that may require variation pricing.
        </p>
      </div>

      {/* Project selector */}
      <div className="flex items-center gap-4">
        <select
          value={projectId}
          onChange={(e) => handleProjectChange(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
          style={{
            borderColor: "var(--hp-border)",
            backgroundColor: "var(--hp-surface)",
            color: "var(--hp-warm-900)",
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
            onClick={() => {
              setStep(0);
              fetchDrawings(projectId);
            }}
            className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium"
            style={{
              borderColor: "var(--hp-border)",
              color: "var(--hp-warm-700)",
            }}
          >
            <RefreshCw size={14} /> New Scan
          </button>
        )}
      </div>

      {error && (
        <div
          className="rounded-lg border p-3 text-sm"
          style={{
            borderColor: "#FCA5A5",
            backgroundColor: "#FEF2F2",
            color: "#991B1B",
          }}
        >
          {error}
        </div>
      )}

      {/* Step 0: Drawing selection */}
      {step === 0 && projectId && (
        <>
          {loading ? (
            <div
              className="flex items-center gap-2 text-sm"
              style={{ color: "var(--hp-text-secondary)" }}
            >
              <RefreshCw size={14} className="animate-spin" /> Loading drawings
              register...
            </div>
          ) : drawingPairs.length === 0 ? (
            <div
              className="rounded-lg border p-6 text-center text-sm"
              style={{
                borderColor: "var(--hp-border)",
                color: "var(--hp-text-secondary)",
              }}
            >
              No drawings with multiple revisions found.
              {totalDrawings > 0 && (
                <span>
                  {" "}
                  ({totalDrawings} drawing{totalDrawings !== 1 ? "s" : ""} total,
                  all on their first revision)
                </span>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Summary + filter */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div
                  className="text-sm"
                  style={{ color: "var(--hp-text-secondary)" }}
                >
                  {drawingPairs.length} drawing
                  {drawingPairs.length !== 1 ? "s" : ""} with revisions (
                  {totalDrawings} total) &middot; {selectedIds.size} selected
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search
                      size={14}
                      className="absolute left-2.5 top-2.5"
                      style={{ color: "var(--hp-text-muted)" }}
                    />
                    <input
                      type="text"
                      placeholder="Filter drawings..."
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                      className="rounded-lg border py-2 pl-8 pr-3 text-sm"
                      style={{
                        borderColor: "var(--hp-border)",
                        backgroundColor: "var(--hp-surface)",
                        color: "var(--hp-warm-900)",
                      }}
                    />
                  </div>
                  <button
                    onClick={selectAll}
                    className="text-xs font-medium underline"
                    style={{ color: "var(--hp-accent)" }}
                  >
                    Select all
                  </button>
                  <button
                    onClick={selectNone}
                    className="text-xs font-medium underline"
                    style={{ color: "var(--hp-text-muted)" }}
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Drawings grouped by discipline */}
              <div
                className="rounded-lg border"
                style={{ borderColor: "var(--hp-border)" }}
              >
                {Object.entries(pairsByDiscipline)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([discipline, pairs]) => (
                    <div key={discipline}>
                      <div
                        className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold border-b"
                        style={{
                          backgroundColor: "var(--hp-surface-raised)",
                          borderColor: "var(--hp-border)",
                          color: "var(--hp-warm-800)",
                        }}
                      >
                        <span>
                          {discipline} ({pairs.length})
                        </span>
                        <span
                          className="text-xs font-normal"
                          style={{ color: "var(--hp-text-muted)" }}
                        >
                          {pairs.filter((p) => selectedIds.has(p.drawing_id))
                            .length}{" "}
                          selected
                        </span>
                      </div>
                      {pairs.map((pair) => (
                        <label
                          key={pair.drawing_id}
                          className="flex items-center gap-3 px-4 py-2 border-b cursor-pointer hover:bg-gray-50"
                          style={{ borderColor: "var(--hp-border)" }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedIds.has(pair.drawing_id)}
                            onChange={() => toggleDrawing(pair.drawing_id)}
                            className="rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <div
                              className="text-sm font-medium truncate"
                              style={{ color: "var(--hp-warm-900)" }}
                            >
                              {pair.drawing_number} — {pair.drawing_title}
                            </div>
                            <div
                              className="text-xs"
                              style={{ color: "var(--hp-text-muted)" }}
                            >
                              Rev {pair.old_revision.revision_number} &rarr; Rev{" "}
                              {pair.new_revision.revision_number} &middot;{" "}
                              {pair.revision_count} revision
                              {pair.revision_count !== 1 ? "s" : ""}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  ))}
              </div>

              {/* Scan button */}
              <button
                onClick={runScan}
                disabled={selectedIds.size === 0}
                className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
                style={{ backgroundColor: "var(--hp-accent)" }}
              >
                Scan {selectedIds.size} Drawing
                {selectedIds.size !== 1 ? "s" : ""} for Changes
              </button>

              {/* Previous results hint */}
              {scan && (
                <button
                  onClick={() => setStep(2)}
                  className="text-sm underline"
                  style={{ color: "var(--hp-accent)" }}
                >
                  View previous scan from {fmtDate(scan.created_at)} (
                  {changes.length} change{changes.length !== 1 ? "s" : ""})
                </button>
              )}
            </div>
          )}
        </>
      )}

      {/* Step 1: Scanning progress */}
      {step === 1 && (
        <div
          className="rounded-lg border p-8 text-center"
          style={{ borderColor: "var(--hp-border)" }}
        >
          <RefreshCw
            size={24}
            className="animate-spin mx-auto mb-3"
            style={{ color: "var(--hp-accent)" }}
          />
          <div
            className="text-sm font-medium"
            style={{ color: "var(--hp-warm-900)" }}
          >
            Scanning drawings for changes...
          </div>
          <div
            className="text-xs mt-1"
            style={{ color: "var(--hp-text-secondary)" }}
          >
            Comparing {scanProgress.total} drawing
            {scanProgress.total !== 1 ? "s" : ""} — this may take a few minutes
          </div>
          <div
            className="w-48 h-1.5 rounded-full mx-auto mt-4"
            style={{ backgroundColor: "var(--hp-border)" }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{
                backgroundColor: "var(--hp-accent)",
                width:
                  scanProgress.total > 0
                    ? `${(scanProgress.current / scanProgress.total) * 100}%`
                    : "0%",
              }}
            />
          </div>
        </div>
      )}

      {/* Step 2: Results */}
      {step === 2 && scan && (
        <div className="space-y-4">
          {/* Scan summary */}
          <div
            className="rounded-lg border p-4"
            style={{
              borderColor: "var(--hp-border)",
              backgroundColor: "var(--hp-surface-raised)",
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: "var(--hp-warm-900)" }}
                >
                  {projectName} — Scan {fmtDate(scan.created_at)}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: "var(--hp-text-secondary)" }}
                >
                  {scan.completed_drawings} drawing
                  {scan.completed_drawings !== 1 ? "s" : ""} compared &middot;{" "}
                  {changes.length} change{changes.length !== 1 ? "s" : ""}{" "}
                  detected
                  {scan.failed_drawings > 0 && (
                    <span style={{ color: "#DC2626" }}>
                      {" "}
                      &middot; {scan.failed_drawings} failed
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`/api/drawing-changes/export?scan_id=${scan.id}&format=csv`}
                  download
                  className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium"
                  style={{
                    borderColor: "var(--hp-border)",
                    color: "var(--hp-warm-700)",
                  }}
                >
                  <Download size={12} /> Export CSV
                </a>
                <button
                  onClick={() => setStep(0)}
                  className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium"
                  style={{
                    borderColor: "var(--hp-border)",
                    color: "var(--hp-warm-700)",
                  }}
                >
                  <RefreshCw size={12} /> New Scan
                </button>
              </div>
            </div>
          </div>

          {/* Change summary pills */}
          {changes.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {(
                ["addition", "deletion", "spec_change", "relocation"] as const
              ).map((type) => {
                const count = changes.filter(
                  (c) => c.change_type === type
                ).length;
                if (count === 0) return null;
                const colors = CHANGE_TYPE_COLORS[type];
                return (
                  <span
                    key={type}
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{ backgroundColor: colors.bg, color: colors.text }}
                  >
                    {count} {CHANGE_TYPE_LABELS[type]}
                    {count !== 1 ? "s" : ""}
                  </span>
                );
              })}
              {(() => {
                const highCount = changes.filter(
                  (c) => c.severity === "high"
                ).length;
                if (highCount === 0) return null;
                return (
                  <span
                    className="rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1"
                    style={{
                      backgroundColor: SEVERITY_COLORS.high.bg,
                      color: SEVERITY_COLORS.high.text,
                    }}
                  >
                    <AlertTriangle size={11} /> {highCount} High Severity
                  </span>
                );
              })()}
            </div>
          )}

          {changes.length === 0 ? (
            <div
              className="rounded-lg border p-6 text-center text-sm"
              style={{
                borderColor: "var(--hp-border)",
                color: "var(--hp-text-secondary)",
              }}
            >
              No scope or specification changes detected in the scanned
              drawings.
            </div>
          ) : (
            /* Changes grouped by discipline */
            <div className="space-y-2">
              {Object.entries(byDiscipline)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([discipline, disciplineChanges]) => {
                  const isExpanded = expandedDisciplines.has(discipline);
                  const highCount = disciplineChanges.filter(
                    (c) => c.severity === "high"
                  ).length;

                  return (
                    <div
                      key={discipline}
                      className="rounded-lg border"
                      style={{ borderColor: "var(--hp-border)" }}
                    >
                      {/* Discipline header */}
                      <button
                        onClick={() => toggleDiscipline(discipline)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left"
                        style={{ backgroundColor: "var(--hp-surface-raised)" }}
                      >
                        <div className="flex items-center gap-2">
                          {isExpanded ? (
                            <ChevronDown
                              size={16}
                              style={{ color: "var(--hp-warm-600)" }}
                            />
                          ) : (
                            <ChevronRight
                              size={16}
                              style={{ color: "var(--hp-warm-600)" }}
                            />
                          )}
                          <span
                            className="text-sm font-semibold"
                            style={{ color: "var(--hp-warm-900)" }}
                          >
                            {discipline}
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: "var(--hp-text-muted)" }}
                          >
                            ({disciplineChanges.length} change
                            {disciplineChanges.length !== 1 ? "s" : ""})
                          </span>
                        </div>
                        {highCount > 0 && (
                          <span
                            className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                            style={{
                              backgroundColor: SEVERITY_COLORS.high.bg,
                              color: SEVERITY_COLORS.high.text,
                            }}
                          >
                            <AlertTriangle size={10} /> {highCount}
                          </span>
                        )}
                      </button>

                      {/* Changes table */}
                      {isExpanded && (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr
                                className="border-t"
                                style={{
                                  borderColor: "var(--hp-border)",
                                  backgroundColor: "var(--hp-surface)",
                                }}
                              >
                                <th
                                  className="px-4 py-2 text-left font-medium"
                                  style={{ color: "var(--hp-text-secondary)" }}
                                >
                                  Drawing
                                </th>
                                <th
                                  className="px-4 py-2 text-left font-medium"
                                  style={{ color: "var(--hp-text-secondary)" }}
                                >
                                  Rev
                                </th>
                                <th
                                  className="px-4 py-2 text-left font-medium"
                                  style={{ color: "var(--hp-text-secondary)" }}
                                >
                                  Type
                                </th>
                                <th
                                  className="px-4 py-2 text-left font-medium"
                                  style={{ color: "var(--hp-text-secondary)" }}
                                >
                                  Description
                                </th>
                                <th
                                  className="px-4 py-2 text-left font-medium"
                                  style={{ color: "var(--hp-text-secondary)" }}
                                >
                                  Location
                                </th>
                                <th
                                  className="px-4 py-2 text-left font-medium"
                                  style={{ color: "var(--hp-text-secondary)" }}
                                >
                                  Severity
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {disciplineChanges.map((change) => {
                                const typeColors =
                                  CHANGE_TYPE_COLORS[change.change_type] ??
                                  CHANGE_TYPE_COLORS.spec_change;
                                const sevColors =
                                  SEVERITY_COLORS[change.severity] ??
                                  SEVERITY_COLORS.medium;
                                const Icon =
                                  CHANGE_TYPE_ICONS[change.change_type] ?? ArrowRightLeft;

                                return (
                                  <tr
                                    key={change.id}
                                    className="border-t"
                                    style={{ borderColor: "var(--hp-border)" }}
                                  >
                                    <td className="px-4 py-2.5">
                                      <div
                                        className="font-medium"
                                        style={{
                                          color: "var(--hp-warm-900)",
                                        }}
                                      >
                                        {change.drawing_number}
                                      </div>
                                      <div
                                        className="text-xs truncate max-w-[200px]"
                                        style={{
                                          color: "var(--hp-text-muted)",
                                        }}
                                      >
                                        {change.drawing_title}
                                      </div>
                                    </td>
                                    <td
                                      className="px-4 py-2.5 text-xs whitespace-nowrap"
                                      style={{
                                        color: "var(--hp-text-secondary)",
                                      }}
                                    >
                                      {change.old_revision} &rarr;{" "}
                                      {change.new_revision}
                                    </td>
                                    <td className="px-4 py-2.5">
                                      <span
                                        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                                        style={{
                                          backgroundColor: typeColors.bg,
                                          color: typeColors.text,
                                        }}
                                      >
                                        <Icon size={10} />
                                        {CHANGE_TYPE_LABELS[
                                          change.change_type
                                        ] ?? change.change_type}
                                      </span>
                                    </td>
                                    <td
                                      className="px-4 py-2.5 max-w-[350px]"
                                      style={{
                                        color: "var(--hp-warm-800)",
                                      }}
                                    >
                                      {change.description}
                                    </td>
                                    <td
                                      className="px-4 py-2.5 text-xs"
                                      style={{
                                        color: "var(--hp-text-muted)",
                                      }}
                                    >
                                      {change.location_on_drawing ?? "—"}
                                    </td>
                                    <td className="px-4 py-2.5">
                                      <span
                                        className="rounded-full px-2 py-0.5 text-xs font-medium capitalize"
                                        style={{
                                          backgroundColor: sevColors.bg,
                                          color: sevColors.text,
                                        }}
                                      >
                                        {change.severity}
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
