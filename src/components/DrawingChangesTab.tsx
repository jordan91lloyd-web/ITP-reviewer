"use client";

import { useState, useCallback, useRef } from "react";
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
  FileUp,
  FileCheck,
  X,
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
  old_pdf_storage_path: string | null;
  new_pdf_storage_path: string | null;
}

interface BaselineScopeItem {
  category: "inclusion" | "exclusion" | "allowance" | "specification" | "condition";
  item: string;
  detail: string | null;
  source_reference: string | null;
}

interface BaselineDoc {
  id: string;
  document_name: string;
  source: "upload" | "procore";
  status: "pending" | "processing" | "processed" | "failed" | "skipped";
  scope_items: BaselineScopeItem[];
  item_count: number;
  file_size: number | null;
  error_message: string | null;
  created_at: string;
}

const CATEGORY_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  inclusion: { label: "Inclusion", color: "#166534", bg: "#DCFCE7" },
  exclusion: { label: "Exclusion", color: "#991B1B", bg: "#FEE2E2" },
  allowance: { label: "Allowance", color: "#1E40AF", bg: "#DBEAFE" },
  specification: { label: "Specification", color: "#6B21A8", bg: "#F3E8FF" },
  condition: { label: "Condition", color: "#92400E", bg: "#FEF3C7" },
};

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

  // Baseline
  const [baselineDocs, setBaselineDocs] = useState<BaselineDoc[]>([]);
  const [baselineExpanded, setBaselineExpanded] = useState(false);
  const [baselineUploading, setBaselineUploading] = useState(false);
  const [expandedBaselineDoc, setExpandedBaselineDoc] = useState<string | null>(null);
  const baselineFileRef = useRef<HTMLInputElement>(null);
  const [showProcoreBrowser, setShowProcoreBrowser] = useState(false);
  const [procoreFolders, setProcoreFolders] = useState<{ id: number; name: string; parent_id: number | null; files: { id: number; name: string; url: string; content_type: string; size: number | null; is_supported: boolean }[] }[]>([]);
  const [procoreFoldersLoading, setProcoreFoldersLoading] = useState(false);
  const [collapsedProcoreFolders, setCollapsedProcoreFolders] = useState<Set<number>>(new Set());

  const [error, setError] = useState<string | null>(null);

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

  const fetchProcoreDocs = useCallback(async () => {
    if (!projectId) return;
    setProcoreFoldersLoading(true);
    try {
      const res = await fetch(`/api/drawing-changes/documents?company_id=${company_id}&project_id=${projectId}`);
      if (!res.ok) return;
      const data = await res.json();
      setProcoreFolders(data.folders ?? []);
      setCollapsedProcoreFolders(new Set((data.folders ?? []).map((f: { id: number }) => f.id)));
    } catch { /* ignore */ }
    finally { setProcoreFoldersLoading(false); }
  }, [projectId, company_id]);

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
        fetchBaseline(pid);
      }
    },
    [projects, fetchDrawings, loadPreviousResults, fetchBaseline]
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

  // ── Download evidence sheet for a drawing ─────────────────────────────────

  const [downloadingEvidence, setDownloadingEvidence] = useState<string | null>(null);

  const downloadEvidence = useCallback(async (
    drawingNumber: string,
    drawingTitle: string,
    oldRev: string,
    newRev: string,
    drawingChanges: ChangeRow[],
    oldPdfUrl?: string,
    newPdfUrl?: string,
  ) => {
    setDownloadingEvidence(drawingNumber);
    try {
      const res = await fetch("/api/drawing-changes/evidence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_name: projectName,
          drawing_number: drawingNumber,
          drawing_title: drawingTitle,
          old_revision: oldRev,
          new_revision: newRev,
          old_pdf_url: oldPdfUrl,
          new_pdf_url: newPdfUrl,
          old_pdf_storage_path: drawingChanges[0]?.old_pdf_storage_path,
          new_pdf_storage_path: drawingChanges[0]?.new_pdf_storage_path,
          changes: drawingChanges.map((c) => ({
            change_type: c.change_type,
            description: c.description,
            location_on_drawing: c.location_on_drawing,
            severity: c.severity,
          })),
        }),
      });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `evidence-${drawingNumber}-rev${oldRev}-to-${newRev}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Failed to generate evidence sheet");
    } finally {
      setDownloadingEvidence(null);
    }
  }, [projectName]);

  // ── Inline scan a specific revision pair from the register ───────────────

  const [inlineScanning, setInlineScanning] = useState<string | null>(null);

  const inlineScanPair = useCallback(async (
    pair: DrawingPair,
    fromRev: RevisionInfo,
    toRev: RevisionInfo,
    discipline: string,
  ) => {
    const key = `${pair.drawing_number}|${fromRev.revision_number}|${toRev.revision_number}`;
    setInlineScanning(key);
    try {
      // Find or create a scan record — use the latest scan or create new
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

      // Reload all results to pick up the new data
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

      {/* ═══ Baseline Scope ═══ */}
      {projectId && (
        <div style={{ borderRadius: 8, border: "1px solid var(--hp-border)", marginBottom: 16, overflow: "hidden" }}>
          {/* Header — always visible */}
          <div
            onClick={() => setBaselineExpanded((v) => !v)}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", backgroundColor: "var(--hp-surface-raised)", cursor: "pointer", userSelect: "none" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {baselineExpanded ? <ChevronDown size={16} style={{ color: "var(--hp-warm-600)" }} /> : <ChevronRight size={16} style={{ color: "var(--hp-warm-600)" }} />}
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--hp-warm-900)" }}>Baseline Scope</span>
              {baselineDocs.length > 0 ? (
                <span style={{ fontSize: 12, color: "var(--hp-text-muted)" }}>
                  {baselineDocs.length} document{baselineDocs.length !== 1 ? "s" : ""} · {baselineDocs.reduce((sum, d) => sum + d.item_count, 0)} scope items
                </span>
              ) : (
                <span style={{ fontSize: 12, color: "#B45309" }}>Not set — upload tender/contract documents</span>
              )}
            </div>
            {baselineDocs.length > 0 && (
              <div style={{ display: "flex", gap: 6 }}>
                {Object.entries(CATEGORY_LABELS).map(([cat, { label, bg, color }]) => {
                  const count = baselineDocs.reduce((sum, d) => sum + (d.scope_items?.filter((i) => i.category === cat).length ?? 0), 0);
                  if (count === 0) return null;
                  return <span key={cat} style={{ fontSize: 10, fontWeight: 500, borderRadius: 999, padding: "1px 8px", backgroundColor: bg, color }}>{count} {label}s</span>;
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
                    if (f) uploadBaselineFile(f);
                    e.target.value = "";
                  }}
                />
                <button
                  onClick={() => baselineFileRef.current?.click()}
                  disabled={baselineUploading}
                  style={{
                    display: "flex", alignItems: "center", gap: 6, borderRadius: 8,
                    border: "1px solid var(--hp-accent)", backgroundColor: "var(--hp-accent)",
                    padding: "6px 14px", fontSize: 12, fontWeight: 600, color: "#fff", cursor: "pointer",
                  }}
                >
                  <FileUp size={12} /> {baselineUploading ? "Processing..." : "Upload File"}
                </button>
                <button
                  onClick={() => { setShowProcoreBrowser((v) => !v); if (!showProcoreBrowser && procoreFolders.length === 0) fetchProcoreDocs(); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 6, borderRadius: 8,
                    border: "1px solid var(--hp-border)",
                    padding: "6px 14px", fontSize: 12, fontWeight: 500, color: "var(--hp-warm-700)",
                    background: "none", cursor: "pointer",
                  }}
                >
                  <Search size={12} /> {showProcoreBrowser ? "Hide" : "Browse Procore Documents"}
                </button>
                {baselineUploading && <span style={{ fontSize: 11, color: "#92400E" }}>Processing document...</span>}
              </div>

              {/* Procore Documents browser */}
              {showProcoreBrowser && (() => {
                // Build tree from flat folder list
                type FolderNode = typeof procoreFolders[0] & { children: FolderNode[] };
                const nodeMap = new Map<number, FolderNode>();
                for (const f of procoreFolders) nodeMap.set(f.id, { ...f, children: [] });
                const roots: FolderNode[] = [];
                for (const f of procoreFolders) {
                  const node = nodeMap.get(f.id)!;
                  if (f.parent_id !== null && nodeMap.has(f.parent_id)) {
                    nodeMap.get(f.parent_id)!.children.push(node);
                  } else {
                    roots.push(node);
                  }
                }

                // Count total supported files recursively
                function countFiles(node: FolderNode): number {
                  const own = node.files.filter((f) => f.is_supported).length;
                  return own + node.children.reduce((sum, c) => sum + countFiles(c), 0);
                }

                // Collect all supported files from a folder and its children
                function allSupportedFiles(node: FolderNode): typeof node.files {
                  const own = node.files.filter((f) => f.is_supported);
                  return [...own, ...node.children.flatMap((c) => allSupportedFiles(c))];
                }

                // Add all files from a folder
                async function addEntireFolder(node: FolderNode) {
                  const files = allSupportedFiles(node).filter(
                    (f) => !baselineDocs.some((d) => d.document_name === f.name)
                  );
                  if (files.length === 0) return;
                  for (const file of files) {
                    await addProcoreDoc(file);
                  }
                }

                // Render a folder node recursively
                function renderFolder(node: FolderNode, depth: number): React.ReactNode {
                  const isCollapsed = collapsedProcoreFolders.has(node.id);
                  const supportedFiles = node.files.filter((f) => f.is_supported);
                  const totalFiles = countFiles(node);
                  if (totalFiles === 0) return null;
                  const indent = 12 + depth * 20;
                  const unadded = allSupportedFiles(node).filter((f) => !baselineDocs.some((d) => d.document_name === f.name));

                  return (
                    <div key={node.id}>
                      <div
                        onClick={() => setCollapsedProcoreFolders((prev) => { const next = new Set(prev); if (next.has(node.id)) next.delete(node.id); else next.add(node.id); return next; })}
                        style={{ display: "flex", alignItems: "center", gap: 8, padding: `6px 12px 6px ${indent}px`, borderBottom: "1px solid var(--hp-border)", backgroundColor: "#FAFAF9", cursor: "pointer", userSelect: "none" }}
                      >
                        {isCollapsed ? <ChevronRight size={12} style={{ color: "var(--hp-warm-500)" }} /> : <ChevronDown size={12} style={{ color: "var(--hp-warm-500)" }} />}
                        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--hp-warm-800)" }}>{node.name}</span>
                        <span style={{ fontSize: 10, color: "var(--hp-text-muted)" }}>{totalFiles} file{totalFiles !== 1 ? "s" : ""}</span>
                        {unadded.length > 0 && (
                          <button
                            onClick={(e) => { e.stopPropagation(); addEntireFolder(node); }}
                            disabled={baselineUploading}
                            style={{ fontSize: 10, fontWeight: 500, color: "var(--hp-accent)", background: "none", border: "1px solid var(--hp-border)", borderRadius: 4, padding: "2px 8px", cursor: "pointer", marginLeft: "auto" }}
                          >
                            Add All ({unadded.length})
                          </button>
                        )}
                      </div>
                      {!isCollapsed && (
                        <>
                          {supportedFiles.map((file) => {
                            const alreadyAdded = baselineDocs.some((d) => d.document_name === file.name);
                            return (
                              <div key={file.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `4px 12px 4px ${indent + 24}px`, borderBottom: "1px solid var(--hp-border)", fontSize: 12 }}>
                                <span style={{ color: alreadyAdded ? "var(--hp-text-muted)" : "var(--hp-warm-800)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  {file.name}
                                  {file.size ? ` (${(file.size / 1024 / 1024).toFixed(1)} MB)` : ""}
                                </span>
                                {alreadyAdded ? (
                                  <span style={{ fontSize: 10, color: "#166534", flexShrink: 0, marginLeft: 8 }}>Added</span>
                                ) : (
                                  <button
                                    onClick={() => addProcoreDoc(file)}
                                    disabled={baselineUploading}
                                    style={{ fontSize: 10, fontWeight: 500, color: "var(--hp-accent)", background: "none", border: "1px solid var(--hp-border)", borderRadius: 4, padding: "2px 8px", cursor: "pointer", flexShrink: 0, marginLeft: 8 }}
                                  >
                                    Add
                                  </button>
                                )}
                              </div>
                            );
                          })}
                          {node.children.map((child) => renderFolder(child, depth + 1))}
                        </>
                      )}
                    </div>
                  );
                }

                return (
                  <div style={{ borderRadius: 8, border: "1px solid var(--hp-border)", marginBottom: 12, maxHeight: 400, overflowY: "auto" }}>
                    {procoreFoldersLoading ? (
                      <div style={{ padding: 16, fontSize: 12, color: "var(--hp-text-secondary)" }}>
                        <RefreshCw size={12} className="animate-spin" style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
                        Loading folders...
                      </div>
                    ) : roots.length === 0 ? (
                      <div style={{ padding: 16, fontSize: 12, color: "var(--hp-text-secondary)" }}>No documents found in this project.</div>
                    ) : (
                      roots.map((root) => renderFolder(root, 0))
                    )}
                  </div>
                );
              })()}

              {/* Document register */}
              {baselineDocs.length === 0 ? (
                <div style={{ fontSize: 13, color: "var(--hp-text-secondary)", padding: "12px 0" }}>
                  No baseline documents yet. Upload your tender specification, PBR, scope of works, allowances schedule, or any contract document that defines the original scope.
                </div>
              ) : (
                <>
                  {/* Summary */}
                  <div style={{ fontSize: 11, color: "var(--hp-text-muted)", marginBottom: 8 }}>
                    {baselineDocs.filter((d) => d.status === "processed").length} processed
                    {baselineDocs.some((d) => d.status === "failed") && ` · ${baselineDocs.filter((d) => d.status === "failed").length} failed`}
                    {baselineDocs.some((d) => d.status === "skipped") && ` · ${baselineDocs.filter((d) => d.status === "skipped").length} skipped`}
                    {baselineDocs.some((d) => d.status === "processing") && ` · ${baselineDocs.filter((d) => d.status === "processing").length} processing`}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {baselineDocs.map((doc) => {
                    const statusColor = doc.status === "processed" ? "#166534" : doc.status === "failed" ? "#991B1B" : doc.status === "skipped" ? "#78716C" : "#92400E";
                    const statusBg = doc.status === "processed" ? "#DCFCE7" : doc.status === "failed" ? "#FEE2E2" : doc.status === "skipped" ? "#F5F5F4" : "#FEF3C7";
                    const statusLabel = doc.status === "processed" ? `${doc.item_count} items extracted`
                      : doc.status === "failed" ? "Failed"
                      : doc.status === "skipped" ? "Skipped"
                      : doc.status === "processing" ? "Processing..."
                      : "Pending";

                    return (
                    <div key={doc.id} style={{ borderRadius: 6, border: "1px solid var(--hp-border)", overflow: "hidden" }}>
                      {/* Doc header */}
                      <div
                        onClick={() => doc.status === "processed" ? setExpandedBaselineDoc((prev) => prev === doc.id ? null : doc.id) : undefined}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", backgroundColor: "#FAFAF9", cursor: doc.status === "processed" ? "pointer" : "default", userSelect: "none" }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
                          {doc.status === "processed" && (expandedBaselineDoc === doc.id ? <ChevronDown size={14} style={{ color: "var(--hp-warm-500)" }} /> : <ChevronRight size={14} style={{ color: "var(--hp-warm-500)" }} />)}
                          {doc.status !== "processed" && <span style={{ width: 14 }} />}
                          <span style={{ fontSize: 13, fontWeight: 500, color: doc.status === "skipped" ? "var(--hp-text-muted)" : "var(--hp-warm-800)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.document_name}</span>
                          {doc.file_size ? <span style={{ fontSize: 10, color: "var(--hp-text-muted)", flexShrink: 0 }}>{(doc.file_size / 1024 / 1024).toFixed(1)} MB</span> : null}
                          <span style={{ fontSize: 10, fontWeight: 500, borderRadius: 999, padding: "1px 8px", backgroundColor: statusBg, color: statusColor, flexShrink: 0 }}>{statusLabel}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                          {doc.error_message && <span style={{ fontSize: 10, color: "#991B1B", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={doc.error_message}>{doc.error_message}</span>}
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteBaselineDoc(doc.id); }}
                            title="Remove from baseline"
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}
                          >
                            <X size={14} style={{ color: "var(--hp-text-muted)" }} />
                          </button>
                        </div>
                      </div>

                      {/* Doc items */}
                      {expandedBaselineDoc === doc.id && doc.scope_items && doc.scope_items.length > 0 && (
                        <div style={{ borderTop: "1px solid var(--hp-border)", maxHeight: 300, overflowY: "auto" }}>
                          {doc.scope_items.map((item, i) => {
                            const catStyle = CATEGORY_LABELS[item.category] ?? CATEGORY_LABELS.condition;
                            return (
                              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "6px 12px 6px 40px", borderTop: i > 0 ? "1px solid var(--hp-border)" : "none", fontSize: 12 }}>
                                <span style={{ borderRadius: 999, padding: "1px 8px", fontSize: 10, fontWeight: 500, backgroundColor: catStyle.bg, color: catStyle.color, whiteSpace: "nowrap", flexShrink: 0 }}>{catStyle.label}</span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ fontWeight: 500, color: "var(--hp-warm-800)" }}>{item.item}</div>
                                  {item.detail && <div style={{ color: "var(--hp-text-secondary)", marginTop: 2 }}>{item.detail}</div>}
                                  {item.source_reference && <div style={{ color: "var(--hp-text-muted)", fontSize: 10, marginTop: 2 }}>{item.source_reference}</div>}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {expandedBaselineDoc === doc.id && doc.error_message && (
                        <div style={{ padding: "8px 12px", borderTop: "1px solid var(--hp-border)", fontSize: 12, color: "#991B1B" }}>
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
      )}

      {/* ═══ Step 0: Drawing selection ═══ */}
      {step === 0 && projectId && (
        <>
          {/* Back to register link */}
          {changes.length > 0 && (
            <button
              onClick={() => setStep(2)}
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "var(--hp-accent)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                marginBottom: 12,
              }}
            >
              ← Back to Change Register
            </button>
          )}

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
                                {pair.revisions.length > 2 ? (
                                  <select
                                    value={activeNew.revision_number}
                                    onChange={(e) => {
                                      const rev = pair.revisions.find((r) => r.revision_number === e.target.value);
                                      if (!rev) return;
                                      setRevisionOverrides((prev) => {
                                        const next = new Map(prev);
                                        next.set(pair.drawing_id, { old: activeOld, new: rev });
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
                                    {pair.revisions.slice(1).map((r) => (
                                      <option key={r.revision_number} value={r.revision_number}>
                                        Rev {r.revision_number}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>
                                    Rev {activeNew.revision_number}
                                  </span>
                                )}
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
          <button
            onClick={() => setStep(changes.length > 0 ? 2 : 0)}
            style={{
              marginTop: 16,
              fontSize: 12,
              color: "var(--hp-text-muted)",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {changes.length > 0 ? "Back to Register (scan continues in background)" : "Cancel"}
          </button>
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

        // Count unscanned drawings
        const unscannedCount = drawingPairs.filter((d) => d.status !== "scanned").length;

        return (
        <>
          {/* ── Unscanned drawings banner ── */}
          {unscannedCount > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 8,
                border: "1px solid #FDE68A",
                backgroundColor: "#FFFBEB",
                padding: "10px 16px",
                marginBottom: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <AlertTriangle size={14} style={{ color: "#B45309" }} />
                <span style={{ fontSize: 13, color: "#92400E", fontWeight: 500 }}>
                  {unscannedCount} drawing{unscannedCount !== 1 ? "s have" : " has"} new revisions to scan
                </span>
              </div>
              <button
                onClick={() => { setStep(0); fetchDrawings(projectId); }}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#fff",
                  backgroundColor: "#B45309",
                  border: "none",
                  borderRadius: 6,
                  padding: "6px 14px",
                  cursor: "pointer",
                }}
              >
                Scan Now
              </button>
            </div>
          )}

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
            {allScans.length > 0 && (() => {
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
                                const procoreDrawingUrl = `https://us02.procore.com/webclients/host/companies/${company_id}/projects/${projectId}/tools/drawings?drawing_id=${pair.drawing_id}`;
                                return (
                                  <>
                                    <a
                                      href={procoreDrawingUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      title="Open this drawing in Procore to view and compare revisions"
                                      style={{ fontSize: 10, fontWeight: 500, color: "var(--hp-warm-700)", background: "none", border: "1px solid var(--hp-border)", borderRadius: 6, padding: "2px 8px", textDecoration: "none", whiteSpace: "nowrap" }}
                                    >
                                      View in Procore
                                    </a>
                                    <button onClick={(e) => { e.stopPropagation(); deepScanDrawing(pair.drawing_number, pair.drawing_title, pair.discipline, pair.old_revision, pair.new_revision); }} disabled={isDS} title="Re-scan with Opus (slower, more thorough, higher cost)" style={{ fontSize: 10, fontWeight: 500, color: isDS ? "var(--hp-text-muted)" : "var(--hp-accent)", background: "none", border: "1px solid var(--hp-border)", borderRadius: 6, padding: "2px 8px", cursor: isDS ? "default" : "pointer", whiteSpace: "nowrap" }}>{isDS ? "Scanning..." : "Deep Scan"}</button>
                                  </>
                                );
                              })()}
                            </div>
                          </div>

                          {/* Available revisions panel */}
                          {isDrawingExpanded && (() => {
                            const pair = drawingPairs.find((p) => p.drawing_number === dg.number);
                            if (!pair || !pair.revisions || pair.revisions.length < 2) return null;

                            const scannedKeys = new Set(dg.revisions.map((r) => r.revKey));
                            const revs = pair.revisions;
                            const firstRev = revs[0];
                            const currentRev = revs[revs.length - 1];

                            // Consecutive pairs
                            const consecutivePairs: { from: RevisionInfo; to: RevisionInfo; key: string; scanned: boolean; label: string }[] = [];
                            for (let i = 0; i < revs.length - 1; i++) {
                              const from = revs[i];
                              const to = revs[i + 1];
                              const key = `${from.revision_number}|${to.revision_number}`;
                              consecutivePairs.push({ from, to, key, scanned: scannedKeys.has(key), label: `${from.revision_number} → ${to.revision_number}` });
                            }

                            // Full range: first → current (only if more than 2 revisions)
                            const fullRangeKey = `${firstRev.revision_number}|${currentRev.revision_number}`;
                            const hasFullRange = revs.length > 2 && !consecutivePairs.some((p) => p.key === fullRangeKey);
                            const fullRangeScanned = scannedKeys.has(fullRangeKey);

                            const allButtons = [...consecutivePairs];
                            if (hasFullRange) {
                              allButtons.push({ from: firstRev, to: currentRev, key: fullRangeKey, scanned: fullRangeScanned, label: `${firstRev.revision_number} → ${currentRev.revision_number} (full)` });
                            }

                            const unscannedCount = allButtons.filter((p) => !p.scanned).length;

                            return (
                              <div style={{ padding: "8px 16px 8px 64px", borderTop: "1px solid var(--hp-border)", backgroundColor: "#FEFCE8" }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                                  <span style={{ fontSize: 11, fontWeight: 600, color: "#854D0E" }}>
                                    Revisions: {revs.map((r) => r.revision_number).join(", ")}
                                    {unscannedCount > 0 && ` · ${unscannedCount} unscanned`}
                                  </span>
                                </div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                  {allButtons.map((ap) => {
                                    const scanKey = `${dg.number}|${ap.key}`;
                                    const isScanning = inlineScanning === scanKey;
                                    return (
                                      <button
                                        key={ap.key}
                                        onClick={() => {
                                          if (!ap.scanned && !isScanning) {
                                            inlineScanPair(pair, ap.from, ap.to, discipline);
                                          }
                                        }}
                                        disabled={ap.scanned || isScanning}
                                        style={{
                                          fontSize: 11,
                                          fontWeight: ap.label.includes("full") ? 600 : 500,
                                          borderRadius: 6,
                                          padding: "3px 10px",
                                          cursor: ap.scanned || isScanning ? "default" : "pointer",
                                          border: "1px solid " + (ap.scanned ? "#BBF7D0" : isScanning ? "#FDE68A" : ap.label.includes("full") ? "#7C3AED" : "#FCA5A5"),
                                          backgroundColor: ap.scanned ? "#DCFCE7" : isScanning ? "#FEF3C7" : ap.label.includes("full") ? "#F5F3FF" : "#fff",
                                          color: ap.scanned ? "#166534" : isScanning ? "#92400E" : ap.label.includes("full") ? "#6D28D9" : "#991B1B",
                                        }}
                                      >
                                        {ap.label}
                                        {ap.scanned && " ✓"}
                                        {isScanning && " ..."}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })()}

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
