"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import type {
  DashboardProject,
  DrawingPair,
  RevisionInfo,
  ChangeRow,
  ReviewStatus,
  BaselineDoc,
  ScanRecord,
  SortOption,
} from "./drawing-changes/types";
import { fmtDate } from "./drawing-changes/constants";
import { BaselinePanel } from "./drawing-changes/BaselinePanel";
import DocCompareSection from "./drawing-changes/DocCompareSection";
import { ScanPanel } from "./drawing-changes/ScanPanel";
import { ScanProgress } from "./drawing-changes/ScanProgress";
import { RegisterPanel } from "./drawing-changes/RegisterPanel";
import { StageRail, type Stage } from "./drawing-changes/StageRail";

// ── Types ──────────────────────────────────────────────────────────────────────

interface Props {
  company_id: string;
  projects: DashboardProject[];
}

const STAGE_KEY_PREFIX = "hp-drawing-changes-stage-";

// ── Component ──────────────────────────────────────────────────────────────────

export default function DrawingChangesTab({ company_id, projects }: Props) {
  const [stage, setStage] = useState<Stage>("scan");
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [railCollapsed, setRailCollapsed] = useState(false);

  // Drawing discovery
  const [drawingPairs, setDrawingPairs] = useState<DrawingPair[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalDrawings, setTotalDrawings] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [filterText, setFilterText] = useState("");
  const [collapsedDiscovery, setCollapsedDiscovery] = useState<Set<string>>(new Set());
  const [revisionOverrides, setRevisionOverrides] = useState<Map<number, { old: RevisionInfo; new: RevisionInfo }>>(new Map());
  const [disciplinePageSize, setDisciplinePageSize] = useState<Map<string, number>>(new Map());
  const [showScanConfirm, setShowScanConfirm] = useState(false);

  // Scanning
  const [scanProgress, setScanProgress] = useState({ current: 0, total: 0, batchNum: 0, totalBatches: 0 });

  // Results
  const [scan, setScan] = useState<ScanRecord | null>(null);
  const [changes, setChanges] = useState<ChangeRow[]>([]);
  const [byDiscipline, setByDiscipline] = useState<Record<string, ChangeRow[]>>({});
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [highSeverityOnly, setHighSeverityOnly] = useState(false);
  const [variationsOnly, setVariationsOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("discipline");
  const [deepScanning, setDeepScanning] = useState<Set<string>>(new Set());
  const [expandedDrawings, setExpandedDrawings] = useState<Set<string>>(new Set());
  const [allScans, setAllScans] = useState<{ id: string; created_at: string; status: string; total_drawings: number; completed_drawings: number }[]>([]);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedChangeIds, setSelectedChangeIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  // Baseline
  const [baselineDocs, setBaselineDocs] = useState<BaselineDoc[]>([]);
  const [baselineExpanded, setBaselineExpanded] = useState(true);
  const [baselineUploading, setBaselineUploading] = useState(false);
  const [baselineProgressText, setBaselineProgressText] = useState("");
  const [expandedBaselineDoc, setExpandedBaselineDoc] = useState<string | null>(null);
  const [showProcoreBrowser, setShowProcoreBrowser] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // Inline scan + evidence
  const [inlineScanning, setInlineScanning] = useState<string | null>(null);

  // ── Responsive rail collapse ────────────────────────────────────────────
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 900px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setRailCollapsed(e.matches);
    handler(mql);
    mql.addEventListener("change", handler as (e: MediaQueryListEvent) => void);
    return () => mql.removeEventListener("change", handler as (e: MediaQueryListEvent) => void);
  }, []);

  // ── Stage persistence ───────────────────────────────────────────────────
  const setStageAndPersist = useCallback((s: Stage, pid?: string) => {
    setStage(s);
    const id = pid || projectId;
    if (id && s !== "scanning") {
      try { localStorage.setItem(`${STAGE_KEY_PREFIX}${id}`, s); } catch { /* ignore */ }
    }
  }, [projectId]);

  // ── Baseline functions ───────────────────────────────────────────────────

  const fetchBaseline = useCallback(async (pid: string) => {
    try {
      const res = await fetch(`/api/drawing-changes/baseline?company_id=${company_id}&project_id=${pid}`);
      if (!res.ok) return;
      const data = await res.json();
      setBaselineDocs(data.documents ?? []);
    } catch { /* ignore */ }
  }, [company_id]);

  const uploadBaselineFile = useCallback(async (file: File) => {
    if (!projectId) return;
    setBaselineUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("company_id", company_id);
      fd.append("project_id", projectId);
      const res = await fetch("/api/drawing-changes/baseline", { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Upload failed");
        return;
      }
      await fetchBaseline(projectId);
    } catch {
      setError("Upload failed");
    } finally {
      setBaselineUploading(false);
    }
  }, [projectId, company_id, fetchBaseline]);

  const addProcoreDoc = useCallback(async (file: { id: number; name: string; url: string }) => {
    if (!projectId) return;
    setBaselineUploading(true);
    try {
      const fd = new FormData();
      fd.append("company_id", company_id);
      fd.append("project_id", projectId);
      fd.append("procore_doc_url", file.url);
      fd.append("procore_doc_name", file.name);
      fd.append("procore_doc_id", String(file.id));
      const res = await fetch("/api/drawing-changes/baseline", { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Failed to add document");
        return;
      }
      await fetchBaseline(projectId);
    } catch {
      setError("Failed to add document");
    } finally {
      setBaselineUploading(false);
    }
  }, [projectId, company_id, fetchBaseline]);

  const deleteBaselineDoc = useCallback(async (docId: string) => {
    if (!window.confirm("Remove this document from the baseline?")) return;
    try {
      await fetch(`/api/drawing-changes/baseline?document_id=${docId}`, { method: "DELETE" });
      setBaselineDocs((prev) => prev.filter((d) => d.id !== docId));
    } catch { /* ignore */ }
  }, []);

  const clearFailedBaseline = useCallback(async () => {
    if (!projectId) return;
    const failedCount = baselineDocs.filter((d) => d.status === "failed" || d.status === "skipped").length;
    if (failedCount === 0) return;
    try {
      const res = await fetch("/api/drawing-changes/baseline", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company_id: company_id, project_id: projectId }),
      });
      const data = await res.json();
      if (data.cleared > 0) {
        setBaselineProgressText(`Cleared ${data.cleared} failed documents — re-process the folder to scan them`);
        setShowProcoreBrowser(true);
      } else {
        setBaselineProgressText("No failed documents to clear");
      }
      await fetchBaseline(projectId);
    } catch {
      setBaselineProgressText("Failed to clear documents");
    }
  }, [projectId, company_id, baselineDocs, fetchBaseline]);

  const handleProcessFolder = useCallback(async (files: Array<{ id: number; name: string; url: string }>, label: string) => {
    setBaselineUploading(true);
    let newlyProcessed = 0;
    let alreadyDone = 0;
    let skipped = 0;
    let failed = 0;
    const errors: string[] = [];
    setBaselineProgressText(`Processing 0/${files.length} files from ${label}...`);
    for (let i = 0; i < files.length; i++) {
      setBaselineProgressText(`Processing ${i + 1}/${files.length} — ${files[i].name}`);
      try {
        const fd = new FormData();
        fd.append("company_id", company_id);
        fd.append("project_id", projectId);
        fd.append("procore_doc_url", files[i].url);
        fd.append("procore_doc_name", files[i].name);
        fd.append("procore_doc_id", String(files[i].id));
        const res = await fetch("/api/drawing-changes/baseline", { method: "POST", body: fd });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.success) {
          if (data.skipped && data.reason === "Already processed") {
            alreadyDone++;
          } else if (data.skipped) {
            skipped++;
          } else {
            newlyProcessed++;
          }
        } else {
          failed++;
          const reason = data.error ?? data.reason ?? `HTTP ${res.status}`;
          errors.push(`${files[i].name}: ${reason}`);
        }
      } catch (err) {
        failed++;
        errors.push(`${files[i].name}: ${err instanceof Error ? err.message : "Network error"}`);
      }
    }
    setBaselineUploading(false);

    const parts: string[] = [];
    parts.push(`${label}: ${files.length} files`);
    if (newlyProcessed > 0) parts.push(`${newlyProcessed} processed`);
    if (alreadyDone > 0) parts.push(`${alreadyDone} already done`);
    if (skipped > 0) parts.push(`${skipped} skipped`);
    if (failed > 0) parts.push(`${failed} failed`);
    if (errors.length > 0) parts.push(errors.slice(0, 2).join(" | "));
    setBaselineProgressText(parts.join(" · "));

    setBaselineExpanded(true);
    fetchBaseline(projectId);
  }, [company_id, projectId, fetchBaseline]);

  // ── Fetch drawings with revisions ────────────────────────────────────────

  const fetchDrawings = useCallback(
    async (pid: string) => {
      setLoading(true);
      setError(null);
      setDrawingPairs([]);
      setSelectedIds(new Set());
      setRevisionOverrides(new Map());
      try {
        const res = await fetch(`/api/drawing-changes/drawings?company_id=${company_id}&project_id=${pid}`);
        if (!res.ok) throw new Error("Failed to fetch drawings");
        const data = await res.json();
        const pairs: DrawingPair[] = data.drawings_with_revisions ?? [];
        setDrawingPairs(pairs);
        setTotalDrawings(data.total_drawings ?? 0);
        setSelectedIds(new Set());
        const allDisc = new Set(pairs.map((d) => d.discipline));
        setCollapsedDiscovery(allDisc);
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
    async (pid: string): Promise<boolean> => {
      try {
        const res = await fetch(`/api/drawing-changes/results?company_id=${company_id}&project_id=${pid}&all=true`);
        if (!res.ok) return false;
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
          if (data.all_scans) setAllScans(data.all_scans);
          return true;
        }
        if (data.all_scans) setAllScans(data.all_scans);
        return false;
      } catch { return false; }
    },
    [company_id]
  );

  // ── Project selection ────────────────────────────────────────────────────

  const handleProjectChange = useCallback(
    async (pid: string) => {
      setProjectId(pid);
      const proj = projects.find((p) => String(p.id) === pid);
      setProjectName(proj?.display_name ?? proj?.name ?? "");
      setStage("scan");
      setScan(null);
      setChanges([]);
      setByDiscipline({});
      if (pid) {
        fetchDrawings(pid);
        fetchBaseline(pid);
        const hasResults = await loadPreviousResults(pid);

        // Determine default stage: localStorage > results-based default
        let defaultStage: Stage = hasResults ? "register" : "scan";
        try {
          const stored = localStorage.getItem(`${STAGE_KEY_PREFIX}${pid}`);
          if (stored === "baseline" || stored === "scan" || stored === "register") {
            defaultStage = stored;
          }
        } catch { /* ignore */ }
        setStageAndPersist(defaultStage, pid);
      }
    },
    [projects, fetchDrawings, loadPreviousResults, fetchBaseline, setStageAndPersist]
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

  const toggleDisciplineSelection = useCallback((discipline: string, pairs: DrawingPair[]) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const allSelected = pairs.every((p) => next.has(p.drawing_id));
      for (const p of pairs) {
        if (allSelected) next.delete(p.drawing_id);
        else next.add(p.drawing_id);
      }
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(drawingPairs.map((d) => d.drawing_id)));
  }, [drawingPairs]);

  const selectUnscanned = useCallback(() => {
    setSelectedIds(new Set(drawingPairs.filter((d) => d.status !== "scanned").map((d) => d.drawing_id)));
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
        if (override) return { ...d, old_revision: override.old, new_revision: override.new };
        return d;
      });
    if (selected.length === 0) return;

    setStageAndPersist("scanning");
    setError(null);
    const totalBatches = Math.ceil(selected.length / BATCH_SIZE);
    setScanProgress({ current: 0, total: selected.length, batchNum: 0, totalBatches });

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

      if (scanId) {
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
      // Auto-switch to register on scan complete
      setStageAndPersist("register");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scan failed");
      if (scanId) {
        const resultsRes = await fetch(`/api/drawing-changes/results?scan_id=${scanId}`).catch(() => null);
        if (resultsRes?.ok) {
          const resultsData = await resultsRes.json();
          setScan(resultsData.scan);
          setChanges(resultsData.changes ?? []);
          setByDiscipline(resultsData.by_discipline ?? {});
          setExpandedResults(new Set(Object.keys(resultsData.by_discipline ?? {})));
          if (resultsData.all_scans) setAllScans(resultsData.all_scans);
          setStageAndPersist("register");
          return;
        }
      }
      setStageAndPersist("scan");
    }
  }, [drawingPairs, selectedIds, company_id, projectId, projectName, revisionOverrides, setStageAndPersist]);

  // ── Deep scan a single drawing ───────────────────────────────────────────

  const deepScanDrawing = useCallback(async (
    drawingNumber: string,
    drawingTitle: string,
    discipline: string,
    oldRevision: RevisionInfo,
    newRevision: RevisionInfo,
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

  // ── Inline scan a specific revision pair ───────────────────────────────

  const inlineScanPair = useCallback(async (
    pair: DrawingPair,
    fromRev: RevisionInfo,
    toRev: RevisionInfo,
    discipline: string,
  ) => {
    const key = `${pair.drawing_number}|${fromRev.revision_number}|${toRev.revision_number}`;
    setInlineScanning(key);
    try {
      const latestScanId = allScans.length > 0 ? allScans[0].id : undefined;
      const res: Response = await fetch("/api/drawing-changes/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_id,
          project_id: projectId,
          project_name: projectName,
          drawing_pairs: [{
            drawing_id: pair.drawing_id,
            drawing_number: pair.drawing_number,
            drawing_title: pair.drawing_title,
            discipline,
            old_revision: fromRev,
            new_revision: toRev,
          }],
          scan_id: latestScanId,
          total_drawings: 1,
          is_last_batch: true,
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        setError(errData.error ?? "Scan failed");
        return;
      }
      await loadPreviousResults(projectId);
    } catch {
      setError("Inline scan failed");
    } finally {
      setInlineScanning(null);
    }
  }, [company_id, projectId, projectName, allScans, loadPreviousResults]);

  // ── Update review status ─────────────────────────────────────────────────

  const updateStatus = useCallback(async (changeIds: string[], status: ReviewStatus) => {
    try {
      const res = await fetch("/api/drawing-changes/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ change_ids: changeIds, status }),
      });
      if (!res.ok) return;
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
        .map((c) => `\u2022 [${c.drawing_number} Rev ${c.old_revision}\u2192${c.new_revision}] ${c.description}`)
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
      const res = await fetch(`/api/drawing-changes/dedup?company_id=${company_id}&project_id=${projectId}`, { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Dedup failed");
        return;
      }
      const data = await res.json();
      if (data.removed > 0) loadPreviousResults(projectId);
    } catch {
      setError("Dedup failed");
    }
  }, [projectId, company_id, loadPreviousResults]);

  // ── Clear all results ────────────────────────────────────────────────────

  const clearResults = useCallback(async () => {
    if (!projectId) return;
    if (!window.confirm("Delete all scan results for this project? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/drawing-changes/clear?company_id=${company_id}&project_id=${projectId}`, { method: "DELETE" });
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
      setStageAndPersist("scan");
      fetchDrawings(projectId);
    } catch {
      setError("Failed to clear results");
    }
  }, [projectId, company_id, fetchDrawings, setStageAndPersist]);

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

  // ── Load a specific scan ────────────────────────────────────────────────

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
        setStageAndPersist("register");
      }
    } catch { /* ignore */ }
  }, [setStageAndPersist]);

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

  const toggleDrawingExpanded = useCallback((key: string) => {
    setExpandedDrawings((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const handleGoToScan = useCallback(() => {
    setStageAndPersist("scan");
    fetchDrawings(projectId);
  }, [fetchDrawings, projectId, setStageAndPersist]);

  const handleGoToScanWithUnscanned = useCallback(() => {
    setStageAndPersist("scan");
    fetchDrawings(projectId).then(() => {
      // selectUnscanned will run after drawings load via the next effect
    });
    // Pre-select unscanned after drawings load
    setSelectedIds(new Set(drawingPairs.filter((d) => d.status !== "scanned").map((d) => d.drawing_id)));
  }, [fetchDrawings, projectId, setStageAndPersist, drawingPairs]);

  const handleLoadAllResults = useCallback(() => {
    loadPreviousResults(projectId);
  }, [loadPreviousResults, projectId]);

  // ── Stage status lines ──────────────────────────────────────────────────
  const baselineStatus = useMemo(() => {
    if (baselineDocs.length === 0) return "Not set up (optional)";
    const processed = baselineDocs.filter((d) => d.status === "processed");
    const totalItems = processed.reduce((sum, d) => sum + d.item_count, 0);
    const lastDate = baselineDocs.reduce((latest, d) => {
      if (!d.created_at) return latest;
      return d.created_at > latest ? d.created_at : latest;
    }, "");
    const datePart = lastDate ? ` · ${fmtDate(lastDate)}` : "";
    return `${baselineDocs.length} docs · ${totalItems} items${datePart}`;
  }, [baselineDocs]);

  const unscannedCount = useMemo(
    () => drawingPairs.filter((d) => d.status !== "scanned").length,
    [drawingPairs]
  );

  const scanStatus = useMemo(() => {
    if (stage === "scanning") return "Scanning in progress...";
    if (drawingPairs.length === 0) return "No drawings loaded";
    if (unscannedCount > 0) return `${unscannedCount} new revision${unscannedCount !== 1 ? "s" : ""} to scan`;
    return "All scanned";
  }, [drawingPairs, unscannedCount, stage]);

  const registerStatus = useMemo(() => {
    if (changes.length === 0) return "No scan results";
    const needsReview = changes.filter((c) => !c.review_status || c.review_status === "needs_review").length;
    const likelyVar = changes.filter((c) => c.variation_risk === "likely_variation").length;
    const parts = [`${changes.length} changes`];
    if (likelyVar > 0) parts.push(`${likelyVar} likely variation${likelyVar !== 1 ? "s" : ""}`);
    if (needsReview > 0) parts.push(`${needsReview} need review`);
    return parts.join(" · ");
  }, [changes]);

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="flex-1 overflow-y-auto" style={{ backgroundColor: "var(--hp-bg)" }}>
      {/* Header + project selector at the top */}
      <div style={{ padding: "16px 24px 0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--hp-text-primary)", margin: 0 }}>
                Drawing Revision Changes
              </h2>
              <p style={{ fontSize: 13, color: "var(--hp-text-secondary)", marginTop: 4, marginBottom: 0 }}>
                Compare drawing revisions to detect scope and specification changes that may require
                variation pricing.
              </p>
            </div>
          </div>

          {/* Project selector */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <select
              value={projectId}
              onChange={(e) => handleProjectChange(e.target.value)}
              style={{
                borderRadius: 8,
                border: "1px solid var(--hp-border)",
                padding: "8px 12px",
                fontSize: 13,
                backgroundColor: "var(--hp-surface)",
                color: "var(--hp-text-primary)",
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
                border: "1px solid var(--hp-critical-bg)",
                backgroundColor: "var(--hp-critical-bg)",
                color: "var(--hp-critical)",
                padding: 12,
                fontSize: 13,
                marginBottom: 12,
              }}
            >
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Stage layout: rail + content */}
      {projectId && (
        <div style={{ display: "flex", minHeight: "calc(100vh - 180px)" }}>
          <StageRail
            stage={stage}
            collapsed={railCollapsed}
            baselineStatus={baselineStatus}
            scanStatus={scanStatus}
            registerStatus={registerStatus}
            onStageChange={(s) => setStageAndPersist(s)}
          />

          {/* Content area */}
          <div style={{ flex: 1, minWidth: 0, overflow: "auto", padding: "16px 24px" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
              {/* Baseline stage */}
              {stage === "baseline" && (
                <>
                  <BaselinePanel
                    companyId={company_id}
                    projectId={projectId}
                    baselineDocs={baselineDocs}
                    baselineExpanded={baselineExpanded}
                    baselineUploading={baselineUploading}
                    baselineProgressText={baselineProgressText}
                    expandedBaselineDoc={expandedBaselineDoc}
                    showProcoreBrowser={showProcoreBrowser}
                    onToggleExpanded={() => setBaselineExpanded((v) => !v)}
                    onUploadFile={uploadBaselineFile}
                    onAddProcoreDoc={addProcoreDoc}
                    onDeleteDoc={deleteBaselineDoc}
                    onClearFailed={clearFailedBaseline}
                    onToggleProcoreBrowser={() => setShowProcoreBrowser((v) => !v)}
                    onSetExpandedBaselineDoc={setExpandedBaselineDoc}
                    onProcessFolder={handleProcessFolder}
                    fetchBaseline={fetchBaseline}
                  />

                  {/* Compare Document against Baseline */}
                  {baselineDocs.some((d) => d.status === "processed") && (
                    <div style={{ marginTop: 16 }}>
                      <DocCompareSection
                        company_id={company_id}
                        project_id={projectId}
                        project_name={projects.find((p) => String(p.id) === projectId)?.name ?? ""}
                      />
                    </div>
                  )}
                </>
              )}

              {/* Scan stage */}
              {stage === "scan" && (
                <ScanPanel
                  drawingPairs={drawingPairs}
                  selectedIds={selectedIds}
                  filterText={filterText}
                  collapsedDiscovery={collapsedDiscovery}
                  revisionOverrides={revisionOverrides}
                  disciplinePageSize={disciplinePageSize}
                  showScanConfirm={showScanConfirm}
                  loading={loading}
                  totalDrawings={totalDrawings}
                  scan={scan}
                  changes={changes}
                  onToggleDrawing={toggleDrawing}
                  onToggleDisciplineSelection={toggleDisciplineSelection}
                  onSelectAll={selectAll}
                  onSelectUnscanned={selectUnscanned}
                  onSelectNone={selectNone}
                  onToggleDiscoverySection={toggleDiscoverySection}
                  onExpandAllDiscovery={expandAllDiscovery}
                  onCollapseAllDiscovery={collapseAllDiscovery}
                  onSetFilterText={setFilterText}
                  onSetRevisionOverrides={setRevisionOverrides}
                  onSetDisciplinePageSize={setDisciplinePageSize}
                  onSetShowScanConfirm={setShowScanConfirm}
                  onRunScan={runScan}
                  onGoToRegister={() => setStageAndPersist("register")}
                />
              )}

              {/* Scanning progress */}
              {stage === "scanning" && (
                <ScanProgress
                  scanProgress={scanProgress}
                  changesLength={changes.length}
                  onBack={() => setStageAndPersist(changes.length > 0 ? "register" : "scan")}
                />
              )}

              {/* Register stage */}
              {stage === "register" && scan && (
                <RegisterPanel
                  companyId={company_id}
                  projectId={projectId}
                  projectName={projectName}
                  projects={projects}
                  changes={changes}
                  scan={scan}
                  allScans={allScans}
                  drawingPairs={drawingPairs}
                  expandedResults={expandedResults}
                  expandedDrawings={expandedDrawings}
                  highSeverityOnly={highSeverityOnly}
                  variationsOnly={variationsOnly}
                  sortBy={sortBy}
                  selectMode={selectMode}
                  selectedChangeIds={selectedChangeIds}
                  deleting={deleting}
                  deepScanning={deepScanning}
                  inlineScanning={inlineScanning}
                  loading={false}
                  onToggleResultSection={toggleResultSection}
                  onToggleDrawingExpanded={toggleDrawingExpanded}
                  onExpandAllResults={expandAllResults}
                  onCollapseAllResults={collapseAllResults}
                  onSetHighSeverityOnly={setHighSeverityOnly}
                  onSetVariationsOnly={setVariationsOnly}
                  onSetSortBy={setSortBy}
                  onSetSelectMode={setSelectMode}
                  onClearSelection={() => setSelectedChangeIds(new Set())}
                  onToggleChangeSelection={toggleChangeSelection}
                  onSelectDrawingChanges={selectDrawingChanges}
                  onUpdateStatus={updateStatus}
                  onRaiseChangeEvent={raiseChangeEvent}
                  onDeepScan={deepScanDrawing}
                  onInlineScan={inlineScanPair}
                  onGoToScan={handleGoToScan}
                  onGoToScanWithUnscanned={handleGoToScanWithUnscanned}
                  onLoadScan={loadScan}
                  onLoadAllResults={handleLoadAllResults}
                  onRemoveDuplicates={removeDuplicates}
                  onClearResults={clearResults}
                  onDeleteSelected={deleteSelected}
                  onSetExpandedDrawings={setExpandedDrawings}
                />
              )}

              {/* Register stage with no scan data yet */}
              {stage === "register" && !scan && (
                <div
                  style={{
                    borderRadius: 8,
                    border: "1px solid var(--hp-border)",
                    padding: 48,
                    textAlign: "center",
                    fontSize: 13,
                    color: "var(--hp-text-secondary)",
                  }}
                >
                  No scan results yet. Go to the Scan stage to scan drawings for changes.
                  <div style={{ marginTop: 12 }}>
                    <button
                      onClick={() => setStageAndPersist("scan")}
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
                      Go to Scan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
