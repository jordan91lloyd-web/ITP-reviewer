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
  Trash2,
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

interface RevisionInfo {
  revision_number: string;
  pdf_url: string;
}

interface DrawingPair {
  drawing_id: number;
  drawing_number: string;
  drawing_title: string;
  discipline: string;
  revision_count: number;
  revisions: RevisionInfo[];
  old_revision: RevisionInfo;
  new_revision: RevisionInfo;
  scanned_pairs: string[];
  status: "scanned" | "new_revision" | "not_scanned";
}

type ReviewStatus = "needs_review" | "not_a_variation" | "variation_raised";

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
  review_status: ReviewStatus | null;
  change_event_id: string | null;
}

const STATUS_OPTIONS: { value: ReviewStatus; label: string; color: string; bg: string }[] = [
  { value: "needs_review", label: "Needs Review", color: "#92400E", bg: "#FEF3C7" },
  { value: "not_a_variation", label: "Not a Variation", color: "#166534", bg: "#DCFCE7" },
  { value: "variation_raised", label: "Variation Raised", color: "#991B1B", bg: "#FEE2E2" },
];

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
  // Custom revision overrides: drawing_id → { from_rev, to_rev }
  const [revisionOverrides, setRevisionOverrides] = useState<Map<number, { old: RevisionInfo; new: RevisionInfo }>>(new Map());

  // Scanning
  const [scanProgress, setScanProgress] = useState({ current: 0, total: 0, batchNum: 0, totalBatches: 0 });

  // Results
  const [scan, setScan] = useState<ScanRecord | null>(null);
  const [changes, setChanges] = useState<ChangeRow[]>([]);
  const [byDiscipline, setByDiscipline] = useState<Record<string, ChangeRow[]>>({});
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [highSeverityOnly, setHighSeverityOnly] = useState(false);
  const [deepScanning, setDeepScanning] = useState<Set<string>>(new Set());
  const [expandedDrawings, setExpandedDrawings] = useState<Set<string>>(new Set());
  const [allScans, setAllScans] = useState<{ id: string; created_at: string; status: string; total_drawings: number; completed_drawings: number }[]>([]);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedChangeIds, setSelectedChangeIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Fetch drawings with revisions ────────────────────────────────────────

  const fetchDrawings = useCallback(
    async (pid: string) => {
      setLoading(true);
      setError(null);
      setDrawingPairs([]);
      setSelectedIds(new Set());
      setCollapsedDiscovery(new Set());
      setRevisionOverrides(new Map());
      try {
        const res = await fetch(
          `/api/drawing-changes/drawings?company_id=${company_id}&project_id=${pid}`
        );
        if (!res.ok) throw new Error("Failed to fetch drawings");
        const data = await res.json();
        const pairs: DrawingPair[] = data.drawings_with_revisions ?? [];
        setDrawingPairs(pairs);
        setTotalDrawings(data.total_drawings ?? 0);
        // Default: select only unscanned drawings (new_revision + not_scanned)
        const ids = new Set<number>(
          pairs
            .filter((d) => d.status !== "scanned")
            .map((d) => d.drawing_id)
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
        // Load ALL changes across all scans for this project
        const res = await fetch(
          `/api/drawing-changes/results?company_id=${company_id}&project_id=${pid}&all=true`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data.changes && data.changes.length > 0) {
          setScan(data.scan ?? {
            id: "all",
            project_name: "",
            status: "completed",
            total_drawings: data.summary?.total_drawings_scanned ?? 0,
            completed_drawings: data.summary?.total_drawings_scanned ?? 0,
            failed_drawings: 0,
            created_at: new Date().toISOString(),
            completed_at: null,
          });
          setChanges(data.changes);
          setByDiscipline(data.by_discipline ?? {});
          setExpandedResults(new Set(Object.keys(data.by_discipline ?? {})));
          setStep(2); // Go straight to Change Register
        }
        if (data.all_scans) setAllScans(data.all_scans);
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
    const selected = drawingPairs
      .filter((d) => selectedIds.has(d.drawing_id))
      .map((d) => {
        const override = revisionOverrides.get(d.drawing_id);
        if (override) {
          return { ...d, old_revision: override.old, new_revision: override.new };
        }
        return d;
      });
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
          if (resultsData.all_scans) setAllScans(resultsData.all_scans);
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
          if (resultsData.all_scans) setAllScans(resultsData.all_scans);
          setStep(2);
          return;
        }
      }
      setStep(0);
    }
  }, [drawingPairs, selectedIds, company_id, projectId, projectName]);

  // ── Deep scan a single drawing ───────────────────────────────────────────

  const deepScanDrawing = useCallback(async (
    drawingNumber: string,
    drawingTitle: string,
    discipline: string,
    oldRevision: { revision_number: string; pdf_url: string },
    newRevision: { revision_number: string; pdf_url: string },
  ) => {
    if (!scan) return;
    const key = `${drawingNumber}|${oldRevision.revision_number}|${newRevision.revision_number}`;
    setDeepScanning((prev) => new Set(prev).add(key));

    try {
      const res: Response = await fetch("/api/drawing-changes/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_id,
          project_id: projectId,
          project_name: projectName,
          drawing_pairs: [{
            drawing_id: 0,
            drawing_number: drawingNumber,
            drawing_title: drawingTitle,
            discipline,
            old_revision: oldRevision,
            new_revision: newRevision,
          }],
          scan_id: scan.id,
          total_drawings: scan.total_drawings,
          is_last_batch: false,
          deep: true,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error ?? "Deep scan failed");
      }

      // Reload results to pick up the new Opus-quality changes
      const resultsRes = await fetch(`/api/drawing-changes/results?scan_id=${scan.id}`);
      if (resultsRes.ok) {
        const resultsData = await resultsRes.json();
        setScan(resultsData.scan);
        setChanges(resultsData.changes ?? []);
        setByDiscipline(resultsData.by_discipline ?? {});
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Deep scan failed");
    } finally {
      setDeepScanning((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
  }, [scan, company_id, projectId, projectName]);

  // ── Update review status ─────────────────────────────────────────────────

  const updateStatus = useCallback(async (changeIds: string[], status: ReviewStatus) => {
    try {
      const res = await fetch("/api/drawing-changes/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ change_ids: changeIds, status }),
      });
      if (!res.ok) return;
      // Update local state
      setChanges((prev) => prev.map((c) =>
        changeIds.includes(c.id) ? { ...c, review_status: status } : c
      ));
    } catch { /* ignore */ }
  }, []);

  // ── Raise Change Event ──────────────────────────────────────────────────

  const raiseChangeEvent = useCallback(async (changeIds: string[], discipline: string, title: string) => {
    if (!projectId) return;
    try {
      const desc = changes
        .filter((c) => changeIds.includes(c.id))
        .map((c) => `• [${c.drawing_number} Rev ${c.old_revision}→${c.new_revision}] ${c.description}`)
        .join("\n");

      const res = await fetch("/api/drawing-changes/change-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_id,
          project_id: projectId,
          project_name: projectName,
          title,
          description: desc,
          discipline,
          change_ids: changeIds,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Failed to create change event");
        return;
      }
      const data = await res.json();
      // Update local state — mark changes as variation_raised with event ID
      setChanges((prev) => prev.map((c) =>
        changeIds.includes(c.id) ? { ...c, review_status: "variation_raised", change_event_id: data.event_id } : c
      ));
    } catch {
      setError("Failed to create change event");
    }
  }, [projectId, company_id, projectName, changes]);

  // ── Remove duplicates ────────────────────────────────────────────────────

  const removeDuplicates = useCallback(async () => {
    if (!projectId) return;
    try {
      const res = await fetch(
        `/api/drawing-changes/dedup?company_id=${company_id}&project_id=${projectId}`,
        { method: "POST" }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Dedup failed");
        return;
      }
      const data = await res.json();
      if (data.removed > 0) {
        // Reload results
        loadPreviousResults(projectId);
      }
    } catch {
      setError("Dedup failed");
    }
  }, [projectId, company_id, loadPreviousResults]);

  // ── Clear all results for this project ────────────────────────────────────

  const clearResults = useCallback(async () => {
    if (!projectId) return;
    if (!window.confirm("Delete all scan results for this project? This cannot be undone.")) return;
    try {
      const res = await fetch(
        `/api/drawing-changes/clear?company_id=${company_id}&project_id=${projectId}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Failed to clear results");
        return;
      }
      setScan(null);
      setChanges([]);
      setByDiscipline({});
      setAllScans([]);
      setExpandedResults(new Set());
      setExpandedDrawings(new Set());
      setStep(0);
      fetchDrawings(projectId);
    } catch {
      setError("Failed to clear results");
    }
  }, [projectId, company_id, fetchDrawings]);

  // ── Delete selected changes ──────────────────────────────────────────────

  const deleteSelected = useCallback(async () => {
    if (selectedChangeIds.size === 0) return;
    if (!window.confirm(`Delete ${selectedChangeIds.size} selected change${selectedChangeIds.size !== 1 ? "s" : ""}?`)) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/drawing-changes/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ change_ids: [...selectedChangeIds] }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Delete failed");
        return;
      }
      // Remove deleted changes from local state
      const deleted = new Set(selectedChangeIds);
      const remaining = changes.filter((c) => !deleted.has(c.id));
      setChanges(remaining);
      const newByDisc: Record<string, ChangeRow[]> = {};
      for (const c of remaining) {
        const disc = c.discipline || "Other";
        if (!newByDisc[disc]) newByDisc[disc] = [];
        newByDisc[disc].push(c);
      }
      setByDiscipline(newByDisc);
      setSelectedChangeIds(new Set());
      setSelectMode(false);
    } catch {
      setError("Delete failed");
    } finally {
      setDeleting(false);
    }
  }, [selectedChangeIds, changes]);

  const toggleChangeSelection = useCallback((id: string) => {
    setSelectedChangeIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectDrawingChanges = useCallback((changeIds: string[], selected: boolean) => {
    setSelectedChangeIds((prev) => {
      const next = new Set(prev);
      for (const id of changeIds) {
        if (selected) next.add(id);
        else next.delete(id);
      }
      return next;
    });
  }, []);

  // ── Load a specific scan by ID ───────────────────────────────────────────

  const loadScan = useCallback(async (scanId: string) => {
    try {
      const res = await fetch(`/api/drawing-changes/results?scan_id=${scanId}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data.scan) {
        setScan(data.scan);
        setChanges(data.changes ?? []);
        setByDiscipline(data.by_discipline ?? {});
        setExpandedResults(new Set(Object.keys(data.by_discipline ?? {})));
        if (data.all_scans) setAllScans(data.all_scans);
        setStep(2);
      }
    } catch {
      // ignore
    }
  }, []);

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
        minWidth: 800,
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

      {/* Project selector */}
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
                  {(() => {
                    const newCount = drawingPairs.filter((d) => d.status === "new_revision").length;
                    const scannedCount = drawingPairs.filter((d) => d.status === "scanned").length;
                    const parts: string[] = [];
                    if (scannedCount > 0) parts.push(`${scannedCount} scanned`);
                    if (newCount > 0) parts.push(`${newCount} new`);
                    return parts.length > 0 ? ` · ${parts.join(", ")}` : "";
                  })()}
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
                        pairs.map((pair) => {
                          const override = revisionOverrides.get(pair.drawing_id);
                          const activeOld = override?.old ?? pair.old_revision;
                          const activeNew = override?.new ?? pair.new_revision;
                          const statusColor =
                            pair.status === "scanned" ? "#166534" :
                            pair.status === "new_revision" ? "#B45309" : "#78716C";
                          const statusBg =
                            pair.status === "scanned" ? "#DCFCE7" :
                            pair.status === "new_revision" ? "#FEF3C7" : "#F5F5F4";
                          const statusLabel =
                            pair.status === "scanned" ? "Scanned" :
                            pair.status === "new_revision" ? "New Rev" : "Not scanned";

                          return (
                          <div
                            key={pair.drawing_id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                              padding: "8px 16px 8px 44px",
                              borderTop: "1px solid var(--hp-border)",
                              fontSize: 13,
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={selectedIds.has(pair.drawing_id)}
                              onChange={() => toggleDrawing(pair.drawing_id)}
                              style={{ accentColor: "var(--hp-accent)", cursor: "pointer" }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span
                                  style={{
                                    fontWeight: 500,
                                    color: "var(--hp-warm-900)",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {pair.drawing_number} — {pair.drawing_title}
                                </span>
                                <span
                                  style={{
                                    fontSize: 9,
                                    fontWeight: 500,
                                    borderRadius: 999,
                                    padding: "1px 6px",
                                    backgroundColor: statusBg,
                                    color: statusColor,
                                    whiteSpace: "nowrap",
                                    flexShrink: 0,
                                  }}
                                >
                                  {statusLabel}
                                </span>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                                {/* Revision picker — from */}
                                {pair.revisions.length > 2 ? (
                                  <select
                                    value={activeOld.revision_number}
                                    onChange={(e) => {
                                      const rev = pair.revisions.find((r) => r.revision_number === e.target.value);
                                      if (!rev) return;
                                      setRevisionOverrides((prev) => {
                                        const next = new Map(prev);
                                        next.set(pair.drawing_id, { old: rev, new: activeNew });
                                        return next;
                                      });
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                      fontSize: 11,
                                      border: "1px solid var(--hp-border)",
                                      borderRadius: 4,
                                      padding: "1px 4px",
                                      color: "var(--hp-warm-700)",
                                      backgroundColor: "var(--hp-surface)",
                                    }}
                                  >
                                    {pair.revisions.slice(0, -1).map((r) => (
                                      <option key={r.revision_number} value={r.revision_number}>
                                        Rev {r.revision_number}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>
                                    Rev {activeOld.revision_number}
                                  </span>
                                )}
                                <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>→</span>
                                <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>
                                  Rev {activeNew.revision_number}
                                </span>
                                {pair.scanned_pairs.length > 0 && (
                                  <span style={{ fontSize: 10, color: "var(--hp-text-muted)", marginLeft: 4 }}>
                                    (scanned: {pair.scanned_pairs.join(", ")})
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          );
                        })}
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

      {/* ═══ Step 2: Change Register ═══ */}
      {step === 2 && scan && (() => {
        const filteredChanges = highSeverityOnly ? changes.filter((c) => c.severity === "high") : changes;
        const filteredByDiscipline: Record<string, ChangeRow[]> = {};
        for (const c of filteredChanges) {
          const disc = c.discipline || "Other";
          if (!filteredByDiscipline[disc]) filteredByDiscipline[disc] = [];
          filteredByDiscipline[disc].push(c);
        }
        const uniqueDrawings = new Set(changes.map((c) => c.drawing_number));
        const highTotal = changes.filter((c) => c.severity === "high").length;

        const BTN = {
          display: "flex" as const, alignItems: "center" as const, gap: 6,
          borderRadius: 8, border: "1px solid var(--hp-border)", padding: "6px 12px",
          fontSize: 12, fontWeight: 500, color: "var(--hp-warm-700)",
          textDecoration: "none", background: "none", cursor: "pointer",
        };

        return (
        <>
          {/* ── Header bar ── */}
          <div style={{ borderRadius: 8, border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-surface-raised)", padding: "16px 20px", marginBottom: 16 }}>
            {/* Row 1: Title + actions */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--hp-warm-900)" }}>Change Register</div>
                <div style={{ fontSize: 12, color: "var(--hp-text-secondary)", marginTop: 2 }}>
                  {uniqueDrawings.size} drawings · {changes.length} changes · {highTotal} high severity
                  {(() => {
                    const variationCount = changes.filter((c) => c.review_status === "variation_raised").length;
                    const reviewedCount = changes.filter((c) => c.review_status && c.review_status !== "needs_review").length;
                    if (reviewedCount === 0) return null;
                    return ` · ${reviewedCount} reviewed` + (variationCount > 0 ? ` · ${variationCount} variations` : "");
                  })()}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <a href={`/api/drawing-changes/export?company_id=${company_id}&project_id=${projectId}&all=true&format=csv`} download style={BTN}>
                  <Download size={12} /> Export CSV
                </a>
                <a href={`/api/drawing-changes/export?company_id=${company_id}&project_id=${projectId}&all=true&format=pdf`} download style={BTN}>
                  <Download size={12} /> Export PDF
                </a>
                <button onClick={() => { setStep(0); fetchDrawings(projectId); }} style={{ ...BTN, border: "1px solid var(--hp-accent)", backgroundColor: "var(--hp-accent)", color: "#fff", fontWeight: 600 }}>
                  <RefreshCw size={12} /> Scan New Drawings
                </button>
                <button onClick={removeDuplicates} title="Keep only the latest scan results for each drawing revision pair" style={BTN}>
                  Remove Duplicates
                </button>
                <button onClick={clearResults} title="Delete all scan results for this project" style={{ ...BTN, color: "#991B1B", borderColor: "#FCA5A5" }}>
                  <Trash2 size={12} /> Clear All
                </button>
              </div>
            </div>

            {/* Row 2: Scan history — dedup by date */}
            {allScans.length > 1 && (() => {
              // Group scans by date to avoid showing "08 Sept" three times
              const byDate = new Map<string, typeof allScans>();
              for (const s of allScans) {
                const date = fmtDate(s.created_at);
                if (!byDate.has(date)) byDate.set(date, []);
                byDate.get(date)!.push(s);
              }
              const dateEntries = [...byDate.entries()];

              return (
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, borderTop: "1px solid var(--hp-border)", paddingTop: 10 }}>
                  <span style={{ fontSize: 12, color: "var(--hp-text-muted)", marginRight: 4 }}>View:</span>
                  <button onClick={() => loadPreviousResults(projectId)} style={{
                    fontSize: 12, fontWeight: 600, borderRadius: 6, padding: "5px 12px", cursor: "pointer", border: "none",
                    backgroundColor: !scan?.id || scan?.id === "all" ? "var(--hp-accent)" : "var(--hp-surface)",
                    color: !scan?.id || scan?.id === "all" ? "#fff" : "var(--hp-warm-700)",
                  }}>
                    All Changes
                  </button>
                  {dateEntries.map(([date, scans]) => {
                    const isActive = scans.some((s) => s.id === scan?.id);
                    const totalDrawings = scans.reduce((sum, s) => sum + s.completed_drawings, 0);
                    return (
                      <button key={date} onClick={() => loadScan(scans[0].id)} style={{
                        fontSize: 12, fontWeight: isActive ? 600 : 400, borderRadius: 6, padding: "5px 12px", cursor: "pointer", border: "none",
                        backgroundColor: isActive ? "var(--hp-accent)" : "var(--hp-surface)",
                        color: isActive ? "#fff" : "var(--hp-warm-700)",
                      }}>
                        {date} ({totalDrawings})
                      </button>
                    );
                  })}
                </div>
              );
            })()}
          </div>

          {/* ── Filter bar ── */}
          {changes.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {(["addition", "deletion", "spec_change", "relocation"] as const).map((type) => {
                  const count = changes.filter((c) => c.change_type === type).length;
                  if (count === 0) return null;
                  const colors = CHANGE_TYPE_COLORS[type];
                  return <span key={type} style={{ borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 500, backgroundColor: colors.bg, color: colors.text }}>{count} {CHANGE_TYPE_LABELS[type]}{count !== 1 ? "s" : ""}</span>;
                })}
                {highTotal > 0 && (
                  <button onClick={() => setHighSeverityOnly((v) => !v)} style={{
                    borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 500, border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 4,
                    backgroundColor: highSeverityOnly ? "#991B1B" : "#FEE2E2",
                    color: highSeverityOnly ? "#fff" : "#991B1B",
                  }}>
                    <AlertTriangle size={10} /> {highTotal} High {highSeverityOnly ? " ✕" : ""}
                  </button>
                )}
                {highSeverityOnly && <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>Showing {filteredChanges.length} of {changes.length}</span>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {selectMode ? (
                  <>
                    <button onClick={deleteSelected} disabled={selectedChangeIds.size === 0 || deleting} style={{ ...BTN, padding: "4px 10px", fontSize: 11, color: selectedChangeIds.size > 0 ? "#991B1B" : "var(--hp-text-muted)", borderColor: selectedChangeIds.size > 0 ? "#FCA5A5" : "var(--hp-border)" }}>
                      <Trash2 size={11} /> Delete {selectedChangeIds.size > 0 ? `(${selectedChangeIds.size})` : ""}
                    </button>
                    <button onClick={() => { setSelectMode(false); setSelectedChangeIds(new Set()); }} style={{ ...BTN, padding: "4px 10px", fontSize: 11 }}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { expandAllResults(); setExpandedDrawings(new Set(filteredChanges.map((c) => c.drawing_number))); }} style={{ ...BTN, padding: "4px 10px", fontSize: 11 }}>Expand All</button>
                    <button onClick={() => { collapseAllResults(); setExpandedDrawings(new Set()); }} style={{ ...BTN, padding: "4px 10px", fontSize: 11 }}>Collapse All</button>
                    <button onClick={() => setSelectMode(true)} style={{ ...BTN, padding: "4px 10px", fontSize: 11 }}>Select</button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ── Change list ── */}
          {filteredChanges.length === 0 ? (
            <div style={{ borderRadius: 8, border: "1px solid var(--hp-border)", padding: 32, textAlign: "center", fontSize: 13, color: "var(--hp-text-secondary)" }}>
              {highSeverityOnly ? "No high severity changes." : "No changes detected."}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {Object.entries(filteredByDiscipline).sort(([a], [b]) => a.localeCompare(b)).map(([discipline, disciplineChanges]) => {
                const isExpanded = expandedResults.has(discipline);
                const discHigh = disciplineChanges.filter((c) => c.severity === "high").length;

                // Group by drawing number, then by revision pair within each drawing
                type RevGroup = { revKey: string; rev: string; changes: ChangeRow[] };
                type DrawingGroup = { number: string; title: string; totalChanges: number; totalHigh: number; revisions: RevGroup[] };
                const drawingOrder: DrawingGroup[] = [];
                const drawingLookup = new Map<string, DrawingGroup>();

                for (const c of disciplineChanges) {
                  let dg = drawingLookup.get(c.drawing_number);
                  if (!dg) { dg = { number: c.drawing_number, title: c.drawing_title, totalChanges: 0, totalHigh: 0, revisions: [] }; drawingLookup.set(c.drawing_number, dg); drawingOrder.push(dg); }
                  dg.totalChanges++;
                  if (c.severity === "high") dg.totalHigh++;

                  const revKey = `${c.old_revision}|${c.new_revision}`;
                  let rg = dg.revisions.find((r) => r.revKey === revKey);
                  if (!rg) { rg = { revKey, rev: `${c.old_revision} → ${c.new_revision}`, changes: [] }; dg.revisions.push(rg); }
                  rg.changes.push(c);
                }
                const uniqueDrawingCount = drawingOrder.length;

                return (
                  <div key={discipline} style={{ borderRadius: 8, border: "1px solid var(--hp-border)", overflow: "hidden" }}>
                    {/* Discipline header */}
                    <div onClick={() => toggleResultSection(discipline)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", backgroundColor: "var(--hp-surface-raised)", cursor: "pointer", userSelect: "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {isExpanded ? <ChevronDown size={16} style={{ color: "var(--hp-warm-600)" }} /> : <ChevronRight size={16} style={{ color: "var(--hp-warm-600)" }} />}
                        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--hp-warm-900)" }}>{discipline}</span>
                        <span style={{ fontSize: 12, color: "var(--hp-text-muted)" }}>({disciplineChanges.length} changes · {uniqueDrawingCount} drawings)</span>
                      </div>
                      {discHigh > 0 && <span style={{ display: "flex", alignItems: "center", gap: 4, borderRadius: 999, padding: "2px 8px", fontSize: 11, fontWeight: 500, backgroundColor: "#FEE2E2", color: "#991B1B" }}><AlertTriangle size={10} /> {discHigh}</span>}
                    </div>

                    {/* Drawings (each collapsible) */}
                    {isExpanded && drawingOrder.map((dg) => {
                      const drawingKey = dg.number;
                      const isDrawingExpanded = expandedDrawings.has(drawingKey);
                      const hasMultipleRevs = dg.revisions.length > 1;

                      return (
                        <div key={drawingKey}>
                          {/* Drawing header — clickable */}
                          <div
                            onClick={() => setExpandedDrawings((prev) => { const next = new Set(prev); if (next.has(drawingKey)) next.delete(drawingKey); else next.add(drawingKey); return next; })}
                            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 8px 40px", borderTop: "1px solid var(--hp-border)", backgroundColor: isDrawingExpanded ? "#F5F5F4" : "#FAFAF9", cursor: "pointer", userSelect: "none" }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              {selectMode && (() => {
                                const allIds = dg.revisions.flatMap((r) => r.changes.map((c) => c.id));
                                const allSelected = allIds.length > 0 && allIds.every((id) => selectedChangeIds.has(id));
                                return <input type="checkbox" checked={allSelected} onClick={(e) => e.stopPropagation()} onChange={() => selectDrawingChanges(allIds, !allSelected)} style={{ accentColor: "#991B1B", cursor: "pointer" }} />;
                              })()}
                              {isDrawingExpanded ? <ChevronDown size={14} style={{ color: "var(--hp-warm-500)" }} /> : <ChevronRight size={14} style={{ color: "var(--hp-warm-500)" }} />}
                              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--hp-warm-800)" }}>{dg.number}</span>
                              <span style={{ fontSize: 12, color: "var(--hp-text-secondary)" }}>{dg.title}</span>
                              {!hasMultipleRevs && <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>Rev {dg.revisions[0]?.rev}</span>}
                              {hasMultipleRevs && <span style={{ fontSize: 11, color: "var(--hp-accent)", fontWeight: 500 }}>{dg.revisions.length} revisions</span>}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>{dg.totalChanges}</span>
                              {dg.totalHigh > 0 && <span style={{ borderRadius: 999, padding: "1px 6px", fontSize: 10, fontWeight: 500, backgroundColor: "#FEE2E2", color: "#991B1B" }}>{dg.totalHigh} high</span>}
                              {(() => {
                                const allChangeIds = dg.revisions.flatMap((r) => r.changes.map((c) => c.id));
                                const hasEvent = dg.revisions.some((r) => r.changes.some((c) => c.change_event_id));
                                const unreviewedCount = dg.revisions.flatMap((r) => r.changes).filter((c) => !c.review_status || c.review_status === "needs_review").length;
                                return (
                                  <>
                                    {!hasEvent && unreviewedCount < dg.totalChanges && (
                                      <button
                                        onClick={(e) => { e.stopPropagation(); raiseChangeEvent(allChangeIds, discipline, `${dg.number} ${dg.title} — Drawing revision changes`); }}
                                        title="Create a draft Change Event for all changes on this drawing"
                                        style={{ fontSize: 10, fontWeight: 500, color: "#991B1B", background: "none", border: "1px solid #FCA5A5", borderRadius: 6, padding: "2px 8px", cursor: "pointer", whiteSpace: "nowrap" }}
                                      >
                                        Raise Event
                                      </button>
                                    )}
                                    {hasEvent && <span style={{ fontSize: 10, fontWeight: 500, color: "#991B1B", borderRadius: 999, padding: "1px 6px", backgroundColor: "#FEE2E2" }}>Event Raised</span>}
                                  </>
                                );
                              })()}
                              {(() => {
                                const pair = drawingPairs.find((p) => p.drawing_number === dg.number);
                                if (!pair) return null;
                                const latestRev = dg.revisions[dg.revisions.length - 1];
                                const deepKey = `${dg.number}|${latestRev?.revKey}`;
                                const isDS = deepScanning.has(deepKey);
                                return <button onClick={(e) => { e.stopPropagation(); deepScanDrawing(pair.drawing_number, pair.drawing_title, pair.discipline, pair.old_revision, pair.new_revision); }} disabled={isDS} title="Re-scan with Opus (slower, more thorough, higher cost)" style={{ fontSize: 10, fontWeight: 500, color: isDS ? "var(--hp-text-muted)" : "var(--hp-accent)", background: "none", border: "1px solid var(--hp-border)", borderRadius: 6, padding: "2px 8px", cursor: isDS ? "default" : "pointer", whiteSpace: "nowrap" }}>{isDS ? "Scanning..." : "Deep Scan"}</button>;
                              })()}
                            </div>
                          </div>

                          {/* Revision groups within this drawing */}
                          {isDrawingExpanded && dg.revisions.map((rg) => {
                            const rgHigh = rg.changes.filter((c) => c.severity === "high").length;
                            return (
                              <div key={rg.revKey}>
                                {/* Revision sub-header (only shown if multiple revisions) */}
                                {hasMultipleRevs && (
                                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 16px 6px 64px", borderTop: "1px solid var(--hp-border)", backgroundColor: "#F5F5F4" }}>
                                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--hp-warm-700)" }}>Rev {rg.rev}</span>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                      <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>{rg.changes.length} changes</span>
                                      {rgHigh > 0 && <span style={{ borderRadius: 999, padding: "1px 6px", fontSize: 10, fontWeight: 500, backgroundColor: "#FEE2E2", color: "#991B1B" }}>{rgHigh} high</span>}
                                    </div>
                                  </div>
                                )}

                                {/* Change rows */}
                                {rg.changes.map((change) => {
                                  const typeColors = CHANGE_TYPE_COLORS[change.change_type] ?? CHANGE_TYPE_COLORS.spec_change;
                                  const sevColors = SEVERITY_COLORS[change.severity] ?? SEVERITY_COLORS.medium;
                                  const Icon = CHANGE_TYPE_ICONS[change.change_type] ?? ArrowRightLeft;
                                  return (
                                    <div key={change.id} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 16px 10px 72px", borderTop: "1px solid var(--hp-border)", fontSize: 13, backgroundColor: selectMode && selectedChangeIds.has(change.id) ? "#FEF2F2" : undefined }}>
                                      {selectMode && <input type="checkbox" checked={selectedChangeIds.has(change.id)} onChange={() => toggleChangeSelection(change.id)} style={{ accentColor: "#991B1B", cursor: "pointer", marginTop: 2, flexShrink: 0 }} />}
                                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, borderRadius: 999, padding: "2px 10px", fontSize: 11, fontWeight: 500, backgroundColor: typeColors.bg, color: typeColors.text, whiteSpace: "nowrap", flexShrink: 0 }}>
                                        <Icon size={10} />{CHANGE_TYPE_LABELS[change.change_type] ?? change.change_type}
                                      </span>
                                      <div style={{ flex: 1, minWidth: 0, color: "var(--hp-warm-800)" }}>
                                        {change.description}
                                        {change.location_on_drawing && <div style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 3 }}>Location: {change.location_on_drawing}</div>}
                                      </div>
                                      <span style={{ borderRadius: 999, padding: "2px 10px", fontSize: 11, fontWeight: 500, textTransform: "capitalize", backgroundColor: sevColors.bg, color: sevColors.text, whiteSpace: "nowrap", flexShrink: 0 }}>{change.severity}</span>
                                      {/* Status dropdown */}
                                      {!selectMode && (
                                        <select
                                          value={change.review_status ?? "needs_review"}
                                          onChange={(e) => updateStatus([change.id], e.target.value as ReviewStatus)}
                                          style={{
                                            fontSize: 10,
                                            border: "1px solid var(--hp-border)",
                                            borderRadius: 4,
                                            padding: "2px 4px",
                                            backgroundColor: STATUS_OPTIONS.find((s) => s.value === (change.review_status ?? "needs_review"))?.bg ?? "#FEF3C7",
                                            color: STATUS_OPTIONS.find((s) => s.value === (change.review_status ?? "needs_review"))?.color ?? "#92400E",
                                            cursor: "pointer",
                                            flexShrink: 0,
                                          }}
                                        >
                                          {STATUS_OPTIONS.map((s) => (
                                            <option key={s.value} value={s.value}>{s.label}</option>
                                          ))}
                                        </select>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
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
