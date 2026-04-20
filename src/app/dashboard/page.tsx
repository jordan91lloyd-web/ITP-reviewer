"use client";

// ─── Dashboard ────────────────────────────────────────────────────────────────
// Project → ITP overview with review history, score overrides, and side panel.

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import ReviewResults from "@/components/ReviewResults";
import type { ReviewResult, CategoryScore } from "@/lib/types";
import type { DashboardInspection } from "@/app/api/dashboard/inspections/route";

// ── Types ──────────────────────────────────────────────────────────────────────

type BulkItemStatus = "queued" | "processing" | "done" | "failed";

interface Company { id: number; name: string; is_active: boolean }

interface DashboardProject {
  id: number;
  name: string;
  display_name: string;
  project_number: string | null;
  reviewed_count: number;
  avg_score: number | null;
  last_reviewed_at: string | null;
  is_hidden?: boolean;
}

interface InspectionStats {
  closedReviewed: number;
  closedTotal: number;
  openReviewed: number;
  openTotal: number;
  inReviewReviewed: number;
  inReviewTotal: number;
}

type StatusFilter = "closed" | "open" | "in_review";

// ── Score helpers ──────────────────────────────────────────────────────────────

function scoreBand(score: number | null): string {
  if (score === null) return "not_reviewed";
  if (score >= 85) return "compliant";
  if (score >= 70) return "minor_gaps";
  if (score >= 50) return "significant_gaps";
  return "critical_risk";
}

function scoreBandLabel(band: string): string {
  return ({
    compliant: "Compliant", minor_gaps: "Minor gaps",
    significant_gaps: "Significant gaps", critical_risk: "Critical risk",
  } as Record<string, string>)[band] ?? band;
}

function scorePillClasses(band: string): string {
  return ({
    compliant:         "bg-green-50 text-green-700 border border-green-200",
    minor_gaps:        "bg-amber-50 text-amber-700 border border-amber-200",
    significant_gaps:  "bg-orange-50 text-orange-700 border border-orange-200",
    critical_risk:     "bg-red-50 text-red-700 border border-red-200",
  } as Record<string, string>)[band] ?? "bg-gray-50 text-gray-500 border border-gray-200";
}

// Fleek brand: all D1-D5 bars use amber (#D97706 = amber-600)
function scoreBarColour(_pct: number): string {
  return "bg-amber-600";
}

function fmtDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

// Worst band among a group of inspections (for group colour indicator)
const BAND_PRIORITY: Record<string, number> = {
  critical_risk: 0, significant_gaps: 1, minor_gaps: 2, compliant: 3,
};

function worstBandInGroup(group: DashboardInspection[]): string | null {
  const reviewed = group.filter(i => i.review_status !== "not_reviewed");
  if (reviewed.length === 0) return null;
  const bands = reviewed.map(i => scoreBand(i.override_score ?? i.last_score));
  return bands.reduce((worst, b) =>
    (BAND_PRIORITY[b] ?? 99) < (BAND_PRIORITY[worst] ?? 99) ? b : worst
  );
}

function groupIndicatorClasses(band: string | null): string {
  if (!band) return "bg-gray-300";
  return ({
    compliant:         "bg-green-400",
    minor_gaps:        "bg-amber-400",
    significant_gaps:  "bg-orange-400",
    critical_risk:     "bg-red-500",
  } as Record<string, string>)[band] ?? "bg-gray-300";
}

// Compute per-project inspection stats once inspections are loaded
function computeInspectionStats(list: DashboardInspection[]): InspectionStats {
  const closed   = list.filter(i => i.status?.toLowerCase() === "closed");
  const inReview = list.filter(i => i.status?.toLowerCase() === "in_review");
  const open     = list.filter(i => {
    const s = i.status?.toLowerCase();
    return s !== "closed" && s !== "in_review";
  });
  return {
    closedReviewed:   closed.filter(i => i.review_status !== "not_reviewed").length,
    closedTotal:      closed.length,
    openReviewed:     open.filter(i => i.review_status !== "not_reviewed").length,
    openTotal:        open.length,
    inReviewReviewed: inReview.filter(i => i.review_status !== "not_reviewed").length,
    inReviewTotal:    inReview.length,
  };
}

// ── PDF export helpers ─────────────────────────────────────────────────────────

function buildFilename(insp: DashboardInspection): string {
  const itpMatch = insp.name.match(/^ITP[-\s]*0*(\d+)/i);
  const itpNum   = itpMatch ? String(parseInt(itpMatch[1])).padStart(3, "0") : "000";
  const descPart = insp.name.replace(/^ITP[-\s]*\d+[-\s]*/i, "").trim();
  const sanitized = descPart
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .substring(0, 50);
  const seq = insp.inspection_number_of_type != null ? `-${insp.inspection_number_of_type}` : "";
  return `ITP-${itpNum}-${sanitized}${seq}-QA-Report`;
}

function esc(s: string | null | undefined): string {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildReportHtml(insp: DashboardInspection, autoPrint = false): string {
  const rd           = insp.review_data!;
  const displayScore = insp.override_score ?? insp.last_score;
  const band         = insp.last_score_band ?? (displayScore !== null ? scoreBand(displayScore) : null);
  const bandLabel    = band ? scoreBandLabel(band) : "Not reviewed";

  const bandColor = ({
    compliant:        "#16a34a",
    minor_gaps:       "#d97706",
    significant_gaps: "#ea580c",
    critical_risk:    "#dc2626",
  } as Record<string, string>)[band ?? ""] ?? "#6b7280";

  const bandBg = ({
    compliant:        "#f0fdf4",
    minor_gaps:       "#fffbeb",
    significant_gaps: "#fff7ed",
    critical_risk:    "#fef2f2",
  } as Record<string, string>)[band ?? ""] ?? "#f9fafb";

  const cc   = rd.commercial_confidence;
  const ccColor = cc?.rating === "high" ? "#16a34a" : cc?.rating === "medium" ? "#d97706" : "#dc2626";

  const dims: [string, string, CategoryScore | undefined][] = [
    ["D1", "Engineer & Inspector Verification", rd.score_breakdown?.category_scores?.D1_engineer_verification],
    ["D2", "Technical Testing Evidence",        rd.score_breakdown?.category_scores?.D2_technical_testing],
    ["D3", "ITP Form Completeness",             rd.score_breakdown?.category_scores?.D3_itp_form_completeness],
    ["D4", "Material Traceability",             rd.score_breakdown?.category_scores?.D4_material_traceability],
    ["D5", "Physical Evidence Record",          rd.score_breakdown?.category_scores?.D5_physical_evidence],
  ];

  const missingRows = (rd.missing_evidence ?? []).slice(0, 6).map(m =>
    `<tr><td style="padding:6px 8px;border-bottom:1px solid #fee2e2;color:#b91c1c;font-weight:600">${esc(m.evidence_type)}</td><td style="padding:6px 8px;border-bottom:1px solid #fee2e2;color:#dc2626">${esc(m.reason)}</td></tr>`
  ).join("");

  const issueRows = (rd.key_issues ?? []).slice(0, 5).map((issue, i) =>
    `<div style="margin-bottom:6px;padding:8px 10px;background:#fef2f2;border-left:3px solid #dc2626;border-radius:4px">
      <span style="font-size:11px;color:#6b7280;font-weight:600">${i + 1}. ${esc(issue.title)}</span>
      <p style="margin:4px 0 0 0;font-size:11px;color:#dc2626">${esc(issue.explanation)}</p>
    </div>`
  ).join("");

  const actionRows = (rd.next_actions ?? []).slice(0, 5).map((a, i) =>
    `<div style="margin-bottom:6px;padding:8px 10px;background:#eff6ff;border-left:3px solid #2563eb;border-radius:4px">
      <span style="font-size:11px;color:#6b7280;font-weight:600">${i + 1}.</span>
      <span style="font-size:12px;color:#1a1a1a;margin-left:6px">${esc(a)}</span>
    </div>`
  ).join("");

  const dimBars = dims.map(([code, label, cat]) => {
    if (!cat) return "";
    const pct = cat.applicable_points > 0
      ? Math.round((cat.achieved_points / cat.applicable_points) * 100)
      : null;
    const barColor = pct == null ? "#e5e7eb" : pct >= 80 ? "#4ade80" : pct >= 55 ? "#fbbf24" : "#f87171";
    return `
      <div style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px">
          <span style="font-size:11px;font-weight:600;color:#374151">${esc(code)} — ${esc(label)}</span>
          <span style="font-size:11px;color:#6b7280">${pct != null ? pct + "%" : "N/A"} (${cat.achieved_points}/${cat.applicable_points} pts)</span>
        </div>
        <div style="height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden">
          ${pct != null ? `<div style="height:100%;width:${pct}%;background:${barColor};border-radius:3px"></div>` : ""}
        </div>
      </div>`;
  }).join("");

  const docObs = (rd.document_observations ?? []).map(o =>
    `<tr>
      <td style="padding:6px 8px;border-bottom:1px solid #f3f4f6;font-size:11px;color:#374151;font-weight:600;vertical-align:top;max-width:180px;word-break:break-word">${esc(o.filename)}</td>
      <td style="padding:6px 8px;border-bottom:1px solid #f3f4f6;font-size:11px;color:#4b5563;vertical-align:top;white-space:pre-wrap">${esc(o.observation)}</td>
    </tr>`
  ).join("");

  const header = rd.inspection_header;
  const headerRows = header ? [
    ["Project",     header.project_name],
    ["ITP Number",  header.itp_number],
    ["Tier",        header.tier],
    ["Closed by",   header.closed_by],
    ["Reference",   header.inspection_reference],
  ].filter(([, v]) => v).map(([k, v]) =>
    `<tr><td style="padding:4px 8px;font-size:11px;color:#6b7280;font-weight:600;white-space:nowrap">${esc(k)}</td><td style="padding:4px 8px;font-size:11px;color:#1a1a1a">${esc(v)}</td></tr>`
  ).join("") : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(insp.name)} — QA Report</title>
<style>
  @page { margin: 18mm 20mm; }
  * { box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #1a1a1a; margin: 0; padding: 0; }
  h2 { font-size: 15px; font-weight: 700; margin: 0 0 4px 0; }
  h3 { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #6b7280; margin: 0 0 10px 0; }
  table { width: 100%; border-collapse: collapse; }
  @media print { .no-print { display: none; } }
</style>
</head>
<body>
<!-- Header -->
<div style="border-bottom:2px solid #1d4ed8;padding-bottom:12px;margin-bottom:16px">
  <div style="display:flex;justify-content:space-between;align-items:flex-start">
    <div>
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#1d4ed8;margin-bottom:4px">Fleek Constructions — ITP QA Report</div>
      <h2>${esc(insp.name)}${insp.inspection_number_of_type != null ? ` — Inspection #${insp.inspection_number_of_type}` : ""}</h2>
      <div style="font-size:10px;color:#6b7280;margin-top:2px">Generated ${new Date().toLocaleDateString("en-AU", { day: "2-digit", month: "long", year: "numeric" })}</div>
    </div>
    <div style="text-align:right">
      <div style="font-size:36px;font-weight:700;color:${bandColor};line-height:1">${displayScore ?? "—"}</div>
      <div style="font-size:10px;font-weight:600;color:${bandColor};background:${bandBg};border-radius:20px;padding:2px 8px;display:inline-block;margin-top:4px">${esc(bandLabel)}</div>
      ${insp.override_score != null ? `<div style="font-size:10px;color:#7c3aed;margin-top:2px">Human reviewed (AI: ${insp.last_score})</div>` : ""}
    </div>
  </div>
</div>

${headerRows ? `
<!-- Inspection metadata -->
<div style="margin-bottom:16px;padding:10px;background:#f9fafb;border-radius:6px;border:1px solid #e5e7eb">
  <table style="width:auto"><tbody>${headerRows}</tbody></table>
</div>` : ""}

<!-- Executive summary -->
${rd.executive_summary ? `
<div style="margin-bottom:16px;padding:10px 12px;background:#eff6ff;border-radius:6px;border-left:4px solid #2563eb">
  <h3>Executive Summary</h3>
  <p style="margin:0;font-size:12px;color:#1e40af;line-height:1.5">${esc(rd.executive_summary)}</p>
</div>` : ""}

<!-- Commercial confidence -->
${cc ? `
<div style="margin-bottom:16px;padding:10px 12px;border-radius:6px;border:1px solid #e5e7eb;background:#f9fafb">
  <div style="display:flex;justify-content:space-between;align-items:center">
    <div>
      <h3 style="margin-bottom:4px">Commercial Confidence</h3>
      <div style="font-size:16px;font-weight:700;color:${ccColor}">${esc(cc.rating)}</div>
    </div>
    <div style="max-width:340px;font-size:11px;color:#4b5563;line-height:1.4;text-align:right">${esc(cc.reason)}</div>
  </div>
</div>` : ""}

<!-- Score breakdown -->
${dimBars ? `
<div style="margin-bottom:16px">
  <h3>Score Breakdown</h3>
  ${dimBars}
</div>` : ""}

<!-- Missing evidence -->
${missingRows ? `
<div style="margin-bottom:16px">
  <h3>Missing Evidence</h3>
  <table style="font-size:12px">
    <thead>
      <tr style="background:#fef2f2">
        <th style="padding:6px 8px;text-align:left;font-size:10px;font-weight:700;color:#991b1b;text-transform:uppercase;letter-spacing:0.05em;width:35%">Evidence Type</th>
        <th style="padding:6px 8px;text-align:left;font-size:10px;font-weight:700;color:#991b1b;text-transform:uppercase;letter-spacing:0.05em">Reason</th>
      </tr>
    </thead>
    <tbody>${missingRows}</tbody>
  </table>
</div>` : ""}

<!-- Key issues -->
${issueRows ? `
<div style="margin-bottom:16px">
  <h3>Key Issues</h3>
  ${issueRows}
</div>` : ""}

<!-- Recommended actions -->
${actionRows ? `
<div style="margin-bottom:16px">
  <h3>Recommended Actions</h3>
  ${actionRows}
</div>` : ""}

<!-- Document observations -->
${docObs ? `
<div style="margin-bottom:16px;page-break-inside:avoid">
  <h3>Document Observations</h3>
  <table style="font-size:11px">
    <thead>
      <tr style="background:#f3f4f6">
        <th style="padding:6px 8px;text-align:left;font-weight:700;color:#374151;width:30%">File</th>
        <th style="padding:6px 8px;text-align:left;font-weight:700;color:#374151;width:70%">Observation</th>
      </tr>
    </thead>
    <tbody>${docObs}</tbody>
  </table>
</div>` : ""}

${autoPrint ? "<script>window.addEventListener('load',()=>{window.print();})</script>" : ""}
</body>
</html>`;
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  // Auth + company
  const [authenticated, setAuthenticated]     = useState<boolean | null>(null);
  const [user, setUser]                        = useState<{ name: string } | null>(null);
  const [companies, setCompanies]              = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Projects
  const [projects, setProjects]               = useState<DashboardProject[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<DashboardProject | null>(null);
  const [hiddenCount, setHiddenCount]         = useState(0);
  const [showHidden, setShowHidden]           = useState(false);
  const [hidingProject, setHidingProject]     = useState<number | null>(null);

  // Per-project inspection stats
  const [projectStats, setProjectStats] = useState<Map<number, InspectionStats>>(new Map());

  // Inspections
  const [inspections, setInspections]               = useState<DashboardInspection[]>([]);
  const [inspectionsLoading, setInspectionsLoading] = useState(false);
  const [statusFilter, setStatusFilter]             = useState<StatusFilter>("closed");

  // ITP group collapse state
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  // Bulk selection
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // Bulk review
  const [bulkRunning, setBulkRunning]   = useState(false);
  const [bulkStatus, setBulkStatus]     = useState<Map<number, BulkItemStatus>>(new Map());
  const [bulkSummary, setBulkSummary]   = useState<{ completed: number; failed: number } | null>(null);

  // Bulk export
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportRunning, setExportRunning]     = useState(false);

  // Side panel
  const [selectedInsp, setSelectedInsp] = useState<DashboardInspection | null>(null);
  const [panelOpen, setPanelOpen]       = useState(false);

  // Full report overlay
  const [fullReportInsp, setFullReportInsp] = useState<DashboardInspection | null>(null);

  // Override form
  const [overrideScore, setOverrideScore]   = useState("");
  const [overrideNote, setOverrideNote]     = useState("");
  const [overrideSaving, setOverrideSaving] = useState(false);
  const [overrideError, setOverrideError]   = useState<string | null>(null);

  // Run review (single)
  const [reviewRunning, setReviewRunning] = useState(false);
  const [reviewError, setReviewError]     = useState<string | null>(null);

  // ── Auth + company discovery ────────────────────────────────────────────────

  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.authenticated) {
          setAuthenticated(true);
          setUser(data.user ?? null);
          loadCompanies();
        } else {
          setAuthenticated(false);
        }
      })
      .catch(() => setAuthenticated(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadCompanies() {
    const res  = await fetch("/api/procore/companies");
    const data = await res.json();
    const list: Company[] = data.companies ?? [];
    setCompanies(list);
    if (list.length === 1) setSelectedCompany(list[0]);
  }

  // ── Load projects when company selected or show_hidden toggled ────────────

  useEffect(() => {
    if (!selectedCompany) return;
    setProjectsLoading(true);
    setSelectedProject(null);
    setInspections([]);
    setProjectStats(new Map());
    setSelectedIds(new Set());
    setBulkStatus(new Map());
    setBulkSummary(null);
    const url = `/api/dashboard/projects?company_id=${selectedCompany.id}${showHidden ? "&show_hidden=true" : ""}`;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        setProjects(data.projects ?? []);
        setHiddenCount(data.hidden_count ?? 0);
      })
      .catch(() => setProjects([]))
      .finally(() => setProjectsLoading(false));
  }, [selectedCompany, showHidden]);

  // ── Load inspections when project selected ─────────────────────────────────

  const loadInspections = useCallback(async (project: DashboardProject, company: Company) => {
    setInspectionsLoading(true);
    setInspections([]);
    setCollapsedGroups(new Set());
    try {
      const res  = await fetch(`/api/dashboard/inspections?project_id=${project.id}&company_id=${company.id}`);
      const data = await res.json();
      const list: DashboardInspection[] = data.inspections ?? [];
      setInspections(list);
      setProjectStats(prev => new Map(prev).set(project.id, computeInspectionStats(list)));
    } catch {
      setInspections([]);
    } finally {
      setInspectionsLoading(false);
    }
  }, []);

  function handleSelectProject(project: DashboardProject) {
    setSelectedProject(project);
    setPanelOpen(false);
    setSelectedInsp(null);
    setSelectedIds(new Set());
    setBulkStatus(new Map());
    setBulkSummary(null);
    if (selectedCompany) loadInspections(project, selectedCompany);
  }

  // ── Hide / unhide project ───────────────────────────────────────────────────

  async function handleHideProject(project: DashboardProject, e: React.MouseEvent) {
    e.stopPropagation();
    if (!selectedCompany) return;
    setHidingProject(project.id);
    // Optimistic: remove from list immediately
    setProjects(prev => prev.filter(p => p.id !== project.id));
    setHiddenCount(prev => prev + 1);
    if (selectedProject?.id === project.id) {
      setSelectedProject(null);
      setPanelOpen(false);
    }
    try {
      await fetch("/api/dashboard/projects/hide", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          company_id:   String(selectedCompany.id),
          project_id:   String(project.id),
          project_name: project.display_name || project.name,
        }),
      });
    } catch {
      // Silently ignore — optimistic update already applied
    } finally {
      setHidingProject(null);
    }
  }

  async function handleUnhideProject(project: DashboardProject, e: React.MouseEvent) {
    e.stopPropagation();
    if (!selectedCompany) return;
    setHidingProject(project.id);
    // Optimistic: mark as visible immediately
    setProjects(prev => prev.map(p => p.id === project.id ? { ...p, is_hidden: false } : p));
    setHiddenCount(prev => Math.max(0, prev - 1));
    try {
      await fetch("/api/dashboard/projects/hide", {
        method:  "DELETE",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          company_id:   String(selectedCompany.id),
          project_id:   String(project.id),
          project_name: project.display_name || project.name,
        }),
      });
    } catch {
      // Silently ignore
    } finally {
      setHidingProject(null);
    }
  }

  // ── Side panel ──────────────────────────────────────────────────────────────

  function openPanel(insp: DashboardInspection) {
    setSelectedInsp(insp);
    setPanelOpen(true);
    setOverrideScore(insp.override_score != null ? String(insp.override_score) : "");
    setOverrideNote(insp.override_note ?? "");
    setOverrideError(null);
    setReviewError(null);
  }

  function closePanel() {
    setPanelOpen(false);
    setTimeout(() => setSelectedInsp(null), 300);
  }

  // ── Single review ───────────────────────────────────────────────────────────

  async function handleRunReview() {
    if (!selectedInsp || !selectedProject || !selectedCompany) return;
    setReviewRunning(true);
    setReviewError(null);
    try {
      const res  = await fetch("/api/procore/import", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          project_id:    selectedProject.id,
          inspection_id: selectedInsp.id,
          company_id:    selectedCompany.id,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? "Review failed");
      await loadInspections(selectedProject, selectedCompany);
      setInspections(prev => {
        const updated = prev.find(i => i.id === selectedInsp.id);
        if (updated) {
          setSelectedInsp(updated);
          setOverrideScore(updated.override_score != null ? String(updated.override_score) : "");
          setOverrideNote(updated.override_note ?? "");
        }
        return prev;
      });
    } catch (err) {
      setReviewError(err instanceof Error ? err.message : "Review failed");
    } finally {
      setReviewRunning(false);
    }
  }

  // ── Save Override ───────────────────────────────────────────────────────────

  async function handleSaveOverride() {
    if (!selectedInsp?.review_record_id || !selectedCompany) return;
    const parsed = parseInt(overrideScore, 10);
    if (isNaN(parsed) || parsed < 0 || parsed > 100) {
      setOverrideError("Score must be a number between 0 and 100.");
      return;
    }
    setOverrideSaving(true);
    setOverrideError(null);
    try {
      const res  = await fetch("/api/dashboard/override", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          review_record_id: selectedInsp.review_record_id,
          company_id:       String(selectedCompany.id),
          original_score:   selectedInsp.last_score ?? 0,
          override_score:   parsed,
          note:             overrideNote.trim() || null,
          created_by:       user?.name ?? null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      const updater = (insp: DashboardInspection): DashboardInspection =>
        insp.id === selectedInsp.id
          ? { ...insp, override_score: parsed, override_note: overrideNote.trim() || null, override_created_by: user?.name ?? null }
          : insp;
      setInspections(prev => prev.map(updater));
      setSelectedInsp(prev => prev ? updater(prev) : prev);
    } catch (err) {
      setOverrideError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setOverrideSaving(false);
    }
  }

  // ── Filtered + grouped ITP list ─────────────────────────────────────────────

  const filteredInspections = inspections.filter(i => {
    const s = i.status?.toLowerCase();
    if (statusFilter === "closed")    return s === "closed";
    if (statusFilter === "in_review") return s === "in_review";
    return s !== "closed" && s !== "in_review";
  });

  const closedCount   = inspections.filter(i => i.status?.toLowerCase() === "closed").length;
  const inReviewCount = inspections.filter(i => i.status?.toLowerCase() === "in_review").length;
  const openCount     = inspections.filter(i => {
    const s = i.status?.toLowerCase();
    return s !== "closed" && s !== "in_review";
  }).length;

  const groupOrder: string[] = [];
  const groupMap = new Map<string, DashboardInspection[]>();
  for (const insp of filteredInspections) {
    if (!groupMap.has(insp.name)) {
      groupOrder.push(insp.name);
      groupMap.set(insp.name, []);
    }
    groupMap.get(insp.name)!.push(insp);
  }

  function toggleGroup(name: string) {
    setCollapsedGroups(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  // ── Bulk selection helpers ──────────────────────────────────────────────────

  const visibleIds = filteredInspections.map(i => i.id);
  const allVisible = visibleIds.length > 0 && visibleIds.every(id => selectedIds.has(id));
  const someVisible = !allVisible && visibleIds.some(id => selectedIds.has(id));

  function toggleSelectAll() {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (allVisible) {
        visibleIds.forEach(id => next.delete(id));
      } else {
        visibleIds.forEach(id => next.add(id));
      }
      return next;
    });
  }

  function toggleSelect(id: number) {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectGroup(group: DashboardInspection[]) {
    const ids = group.map(i => i.id);
    const allGroupSelected = ids.every(id => selectedIds.has(id));
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (allGroupSelected) {
        ids.forEach(id => next.delete(id));
      } else {
        ids.forEach(id => next.add(id));
      }
      return next;
    });
  }

  // ── Bulk review ─────────────────────────────────────────────────────────────

  const selectedUnreviewed = filteredInspections.filter(
    i => selectedIds.has(i.id) && i.review_status === "not_reviewed"
  );
  const selectedReviewed = filteredInspections.filter(
    i => selectedIds.has(i.id) && i.review_data != null
  );

  async function handleBulkReview() {
    if (!selectedProject || !selectedCompany || bulkRunning) return;
    if (selectedUnreviewed.length === 0) return;

    setBulkRunning(true);
    setBulkSummary(null);
    setBulkStatus(() => {
      const m = new Map<number, BulkItemStatus>();
      selectedUnreviewed.forEach(i => m.set(i.id, "queued"));
      return m;
    });

    let completed = 0, failed = 0;
    for (const insp of selectedUnreviewed) {
      setBulkStatus(prev => new Map(prev).set(insp.id, "processing"));
      try {
        const res = await fetch("/api/procore/import", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({
            project_id:    selectedProject.id,
            inspection_id: insp.id,
            company_id:    selectedCompany.id,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error ?? "Review failed");
        setBulkStatus(prev => new Map(prev).set(insp.id, "done"));
        completed++;
      } catch {
        setBulkStatus(prev => new Map(prev).set(insp.id, "failed"));
        failed++;
      }
    }

    await loadInspections(selectedProject, selectedCompany);
    setBulkSummary({ completed, failed });
    setBulkRunning(false);
    setSelectedIds(new Set());
  }

  // ── Bulk PDF export ─────────────────────────────────────────────────────────

  async function handleBulkExportSeparate() {
    setExportModalOpen(false);
    // Fire-and-forget audit log
    if (selectedCompany) {
      fetch("/api/dashboard/export-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_id:       String(selectedCompany.id),
          inspection_count: selectedReviewed.length,
          export_type:      "separate",
          inspection_names: selectedReviewed.map(i => i.name),
        }),
      }).catch(() => {});
    }
    for (const insp of selectedReviewed) {
      const html = buildReportHtml(insp, true);
      const win  = window.open("", "_blank");
      if (!win) {
        alert("Popup blocked. Please allow popups for this site and try again.");
        return;
      }
      win.document.write(html);
      win.document.close();
      // Small delay between windows so browsers don't batch-block them
      await new Promise(r => setTimeout(r, 400));
    }
    setSelectedIds(new Set());
  }

  async function handleBulkExportZip() {
    setExportRunning(true);
    // Fire-and-forget audit log
    if (selectedCompany) {
      fetch("/api/dashboard/export-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_id:       String(selectedCompany.id),
          inspection_count: selectedReviewed.length,
          export_type:      "zip",
          inspection_names: selectedReviewed.map(i => i.name),
        }),
      }).catch(() => {});
    }
    try {
      const { default: JSZip } = await import("jszip");
      const zip = new JSZip();
      for (const insp of selectedReviewed) {
        const html     = buildReportHtml(insp, false);
        const filename = buildFilename(insp) + ".html";
        zip.file(filename, html);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `ITP-QA-Reports-${new Date().toISOString().slice(0, 10)}.zip`;
      a.click();
      URL.revokeObjectURL(url);
      setExportModalOpen(false);
      setSelectedIds(new Set());
    } finally {
      setExportRunning(false);
    }
  }

  // ── Not authenticated ───────────────────────────────────────────────────────

  if (authenticated === false) {
    return (
      <div className="flex-1 bg-[#F9FAFB] flex flex-col items-center justify-center gap-4 py-24">
        <p className="text-sm text-gray-600">Connect to Procore to use the dashboard.</p>
        <a
          href="/api/auth/login"
          className="rounded-lg bg-[#1F3864] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#253f77] transition-colors"
        >
          Connect to Procore
        </a>
      </div>
    );
  }

  if (authenticated === null) {
    return (
      <div className="flex-1 bg-[#F9FAFB] flex items-center justify-center py-24">
        <Spinner className="h-6 w-6 text-gray-400" />
      </div>
    );
  }

  // ── Full report overlay ─────────────────────────────────────────────────────

  if (fullReportInsp?.review_data) {
    return (
      <div className="bg-white overflow-y-auto min-h-full">
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Full Report — {fullReportInsp.name}
          </p>
          <button
            onClick={() => setFullReportInsp(null)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            ← Back to dashboard
          </button>
        </div>
        <div className="mx-auto max-w-2xl px-4 py-8">
          <ReviewResults result={fullReportInsp.review_data} onReset={() => setFullReportInsp(null)} />
        </div>
      </div>
    );
  }

  // ── Dashboard layout ────────────────────────────────────────────────────────

  const selectedCount = selectedIds.size;

  return (
    <div className="flex h-full flex-col bg-[#F9FAFB] overflow-hidden">

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left: project list ── */}
        <aside className="w-64 shrink-0 border-r border-gray-200 bg-white overflow-y-auto flex flex-col">
          {/* Company selector */}
          <div className="px-4 py-3 border-b border-gray-100 shrink-0">
            {companies.length > 1 ? (
              <select
                value={selectedCompany?.id ?? ""}
                onChange={e => {
                  const c = companies.find(x => x.id === Number(e.target.value));
                  if (c) setSelectedCompany(c);
                }}
                className="w-full rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="">— Select company —</option>
                {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            ) : selectedCompany ? (
              <p className="text-xs font-semibold text-[#1F3864] truncate">{selectedCompany.name}</p>
            ) : (
              <p className="text-xs text-gray-400 italic">Loading…</p>
            )}
          </div>
          {/* Projects label + audit link */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 shrink-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Projects</p>
            <Link href="/audit" className="text-[10px] text-gray-400 hover:text-[#1F3864] transition-colors font-medium">
              Audit Log
            </Link>
          </div>
          {!selectedCompany && (
            <p className="px-4 py-6 text-xs text-gray-400 italic">Select a company to load projects.</p>
          )}
          {selectedCompany && projectsLoading && (
            <div className="flex items-center gap-2 px-4 py-4 text-xs text-gray-400">
              <Spinner className="h-3 w-3 text-blue-400" /> Loading…
            </div>
          )}
          {selectedCompany && !projectsLoading && projects.length === 0 && (
            <p className="px-4 py-4 text-xs text-gray-400 italic">No projects found.</p>
          )}
          {projects.map(p => (
            <ProjectRow
              key={p.id}
              project={p}
              selected={selectedProject?.id === p.id}
              stats={projectStats.get(p.id) ?? null}
              hiding={hidingProject === p.id}
              onClick={() => !p.is_hidden && handleSelectProject(p)}
              onHide={e => handleHideProject(p, e)}
              onUnhide={e => handleUnhideProject(p, e)}
            />
          ))}

          {/* Show hidden toggle */}
          {selectedCompany && !projectsLoading && hiddenCount > 0 && (
            <div className="border-t border-gray-100 px-3 py-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowHidden(v => !v)}
                className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showHidden ? "Hide hidden projects" : `${hiddenCount} hidden — show`}
              </button>
            </div>
          )}
        </aside>

        {/* ── Main: ITP list ── */}
        <main className="flex-1 overflow-y-auto relative">
          {!selectedProject && (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-gray-400">Select a project to view its ITPs.</p>
            </div>
          )}

          {selectedProject && (
            <div className="pb-24">
              {/* Project header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-gray-900">
                      {selectedProject.display_name || selectedProject.name}
                    </h2>
                    {selectedProject.project_number && (
                      <p className="text-xs text-gray-400 mt-0.5">#{selectedProject.project_number}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {selectedProject.reviewed_count > 0 && (
                      <>
                        <span>{selectedProject.reviewed_count} reviewed</span>
                        {selectedProject.avg_score !== null && (
                          <span className={`font-bold ${selectedProject.avg_score >= 85 ? "text-green-600" : selectedProject.avg_score >= 70 ? "text-amber-600" : selectedProject.avg_score >= 50 ? "text-orange-500" : "text-red-500"}`}>
                            Avg {selectedProject.avg_score}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Status tabs */}
                <div className="mt-3 flex items-center gap-1 w-fit">
                  <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5 gap-0.5">
                    {([
                      ["closed",    `Closed (${closedCount})`],
                      ["in_review", `In Review (${inReviewCount})`],
                      ["open",      `Open (${openCount})`],
                    ] as [StatusFilter, string][]).map(([s, label]) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => { setStatusFilter(s); setSelectedIds(new Set()); setBulkStatus(new Map()); setBulkSummary(null); }}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                          statusFilter === s
                            ? "bg-white text-gray-900 shadow-sm border border-gray-100"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bulk summary banner */}
              {bulkSummary && (
                <div className={`mx-4 mt-3 rounded-lg border px-4 py-2.5 flex items-center justify-between ${
                  bulkSummary.failed > 0 ? "bg-amber-50 border-amber-200" : "bg-green-50 border-green-200"
                }`}>
                  <span className={`text-xs font-semibold ${bulkSummary.failed > 0 ? "text-amber-700" : "text-green-700"}`}>
                    Bulk review complete — {bulkSummary.completed} succeeded{bulkSummary.failed > 0 ? `, ${bulkSummary.failed} failed` : ""}
                  </span>
                  <button onClick={() => setBulkSummary(null)} className="text-xs text-gray-400 hover:text-gray-600 ml-4">✕</button>
                </div>
              )}

              {/* ITP table */}
              {inspectionsLoading && (
                <div className="flex items-center gap-2 px-6 py-6 text-sm text-gray-400">
                  <Spinner className="h-4 w-4 text-blue-400" /> Loading inspections…
                </div>
              )}

              {!inspectionsLoading && filteredInspections.length === 0 && (
                <div className="px-6 py-10 text-center text-sm text-gray-400">
                  No {statusFilter === "in_review" ? "in-review" : statusFilter} ITP inspections found.
                </div>
              )}

              {!inspectionsLoading && filteredInspections.length > 0 && (
                <>
                  {/* Control bar: Select All (left) + Collapse All (right) */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-gray-100 border-b-2 border-amber-600">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={allVisible}
                        ref={el => { if (el) el.indeterminate = someVisible; }}
                        onChange={toggleSelectAll}
                        disabled={bulkRunning}
                        className="h-4 w-4 rounded border-gray-400 text-amber-600 focus:ring-amber-500 cursor-pointer disabled:cursor-not-allowed"
                      />
                      <span className="text-xs font-bold text-gray-700">Select All</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const allCollapsed = groupOrder.length > 0 && collapsedGroups.size === groupOrder.length;
                        setCollapsedGroups(allCollapsed ? new Set() : new Set(groupOrder));
                      }}
                      className="flex items-center gap-1.5 text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      <span className={`inline-block text-[9px] transition-transform duration-150 ${groupOrder.length > 0 && collapsedGroups.size === groupOrder.length ? "" : "rotate-90"}`}>▶</span>
                      {groupOrder.length > 0 && collapsedGroups.size === groupOrder.length ? "Expand All" : "Collapse All"}
                    </button>
                  </div>

                  <table className="w-full text-sm shadow-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        {/* Checkbox column — no label; Select All lives in control bar above */}
                        <th className="px-3 py-2.5 w-10" />
                        <th className="text-left text-[11px] font-semibold text-gray-700 uppercase tracking-wider px-3 py-2.5">ITP</th>
                        <th className="text-left text-[11px] font-semibold text-gray-700 uppercase tracking-wider px-3 py-2.5 w-12">#</th>
                        <th className="text-left text-[11px] font-semibold text-gray-700 uppercase tracking-wider px-3 py-2.5 w-36">Person</th>
                        <th className="text-left text-[11px] font-semibold text-gray-700 uppercase tracking-wider px-3 py-2.5 w-32">Score</th>
                        <th className="text-left text-[11px] font-semibold text-gray-700 uppercase tracking-wider px-3 py-2.5 w-36">Rating</th>
                        <th className="text-left text-[11px] font-semibold text-gray-700 uppercase tracking-wider px-3 py-2.5 w-24">Status</th>
                        <th className="text-left text-[11px] font-semibold text-gray-700 uppercase tracking-wider px-3 py-2.5 w-32">Reviewed</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {groupOrder.map(groupName => {
                        const group          = groupMap.get(groupName)!;
                        const isCollapsed    = collapsedGroups.has(groupName);
                        const worst          = worstBandInGroup(group);
                        const reviewedInGroup = group.filter(i => i.review_status !== "not_reviewed").length;
                        const groupIds       = group.map(i => i.id);
                        const allGroupSel    = groupIds.every(id => selectedIds.has(id));
                        const someGroupSel   = !allGroupSel && groupIds.some(id => selectedIds.has(id));

                        return [
                          // Group header row — light gray
                          <tr
                            key={`group-${groupName}`}
                            className="bg-[#F3F4F6] border-t border-gray-200 select-none"
                          >
                            {/* Collapse arrow + group checkbox */}
                            <td className="px-3 py-2.5" onClick={e => e.stopPropagation()}>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-gray-500 text-[10px] transition-transform duration-150 cursor-pointer shrink-0 ${isCollapsed ? "" : "rotate-90"}`}
                                  onClick={() => toggleGroup(groupName)}
                                >▶</span>
                                <input
                                  type="checkbox"
                                  checked={allGroupSel}
                                  ref={el => { if (el) el.indeterminate = someGroupSel; }}
                                  onChange={() => toggleSelectGroup(group)}
                                  disabled={bulkRunning}
                                  className="h-3.5 w-3.5 rounded border-gray-400 text-amber-600 focus:ring-amber-500 cursor-pointer disabled:cursor-not-allowed shrink-0 accent-amber-600"
                                />
                              </div>
                            </td>
                            <td
                              colSpan={7}
                              className="px-3 py-2.5 cursor-pointer hover:bg-gray-200 transition-colors"
                              onClick={() => toggleGroup(groupName)}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className={`h-3 w-3 rounded-full shrink-0 ring-1 ring-gray-300 ${groupIndicatorClasses(worst)}`} />
                                <span className="text-sm font-bold text-[#1F3864] leading-snug">{groupName}</span>
                                <span className="text-[10px] text-gray-500 font-normal ml-1">
                                  {reviewedInGroup}/{group.length} reviewed
                                </span>
                              </div>
                            </td>
                          </tr>,
                          // Inspection rows
                          ...(!isCollapsed ? group.map(insp => (
                            <InspectionRow
                              key={insp.id}
                              insp={insp}
                              selected={selectedInsp?.id === insp.id && panelOpen}
                              checked={selectedIds.has(insp.id)}
                              bulkItemStatus={bulkStatus.get(insp.id) ?? null}
                              bulkRunning={bulkRunning}
                              onCheck={e => { e.stopPropagation(); toggleSelect(insp.id); }}
                              onClick={() => openPanel(insp)}
                            />
                          )) : []),
                        ];
                      })}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          )}

          {/* ── Bulk action bar ── */}
          {selectedCount > 0 && (
            <BulkActionBar
              selectedCount={selectedCount}
              unreviewedCount={selectedUnreviewed.length}
              reviewedCount={selectedReviewed.length}
              bulkRunning={bulkRunning}
              onRunReviews={handleBulkReview}
              onExportPdfs={() => setExportModalOpen(true)}
              onClearSelection={() => { setSelectedIds(new Set()); setBulkStatus(new Map()); setBulkSummary(null); }}
            />
          )}
        </main>
      </div>

      {/* ── Side panel backdrop ── */}
      {panelOpen && (
        <div className="fixed inset-0 z-30 bg-black/20" onClick={closePanel} />
      )}

      {/* ── Side panel ── */}
      <div
        className={`fixed right-0 top-0 h-full w-[480px] bg-white shadow-2xl z-40 transform transition-transform duration-300 overflow-y-auto ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedInsp && (
          <InspectionPanel
            insp={selectedInsp}
            companyId={selectedCompany ? String(selectedCompany.id) : ""}
            reviewRunning={reviewRunning}
            reviewError={reviewError}
            overrideScore={overrideScore}
            overrideNote={overrideNote}
            overrideSaving={overrideSaving}
            overrideError={overrideError}
            onClose={closePanel}
            onRunReview={handleRunReview}
            onViewFullReport={() => { setFullReportInsp(selectedInsp); setPanelOpen(false); }}
            onOverrideScoreChange={setOverrideScore}
            onOverrideNoteChange={setOverrideNote}
            onSaveOverride={handleSaveOverride}
          />
        )}
      </div>

      {/* ── Export modal ── */}
      {exportModalOpen && (
        <ExportModal
          count={selectedReviewed.length}
          exportRunning={exportRunning}
          onSeparate={handleBulkExportSeparate}
          onZip={handleBulkExportZip}
          onClose={() => setExportModalOpen(false)}
        />
      )}
    </div>
  );
}

// ── BulkActionBar ──────────────────────────────────────────────────────────────

function BulkActionBar({
  selectedCount,
  unreviewedCount,
  reviewedCount,
  bulkRunning,
  onRunReviews,
  onExportPdfs,
  onClearSelection,
}: {
  selectedCount: number;
  unreviewedCount: number;
  reviewedCount: number;
  bulkRunning: boolean;
  onRunReviews: () => void;
  onExportPdfs: () => void;
  onClearSelection: () => void;
}) {
  return (
    <div className="sticky bottom-0 z-20 mx-4 mb-4 rounded-xl bg-[#1F3864] shadow-xl px-4 py-3 flex items-center gap-3">
      <span className="text-xs font-semibold text-white/80 shrink-0">
        {selectedCount} selected
      </span>
      <div className="flex items-center gap-2 flex-1">
        <button
          type="button"
          onClick={onRunReviews}
          disabled={bulkRunning || unreviewedCount === 0}
          className="rounded-lg bg-amber-600 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
        >
          {bulkRunning && <Spinner className="h-3 w-3 text-white" />}
          Run Reviews ({unreviewedCount})
        </button>
        <button
          type="button"
          onClick={onExportPdfs}
          disabled={bulkRunning || reviewedCount === 0}
          className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Export PDFs ({reviewedCount})
        </button>
      </div>
      <button
        type="button"
        onClick={onClearSelection}
        disabled={bulkRunning}
        className="text-xs text-white/50 hover:text-white/80 disabled:opacity-40 shrink-0 transition-colors"
      >
        Clear
      </button>
    </div>
  );
}

// ── ExportModal ────────────────────────────────────────────────────────────────

function ExportModal({
  count,
  exportRunning,
  onSeparate,
  onZip,
  onClose,
}: {
  count: number;
  exportRunning: boolean;
  onSeparate: () => void;
  onZip: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-[400px] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-900">Export {count} QA Report{count !== 1 ? "s" : ""}</h3>
          <button onClick={onClose} disabled={exportRunning} className="text-gray-400 hover:text-gray-600 disabled:opacity-40">✕</button>
        </div>
        <p className="text-xs text-gray-500 mb-5">
          Choose how to export the selected reviewed ITPs. Each report is formatted for printing.
        </p>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={onSeparate}
            disabled={exportRunning}
            className="flex items-start gap-3 rounded-xl border-2 border-blue-100 bg-blue-50 hover:border-blue-300 hover:bg-blue-100 px-4 py-3 transition-colors text-left disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="text-xl">🖨️</span>
            <div>
              <p className="text-xs font-bold text-blue-800">Separate files</p>
              <p className="text-[11px] text-blue-600 mt-0.5">
                Opens a print dialog for each report in a new window. Allow popups when prompted.
              </p>
            </div>
          </button>
          <button
            type="button"
            onClick={onZip}
            disabled={exportRunning}
            className="flex items-start gap-3 rounded-xl border-2 border-gray-100 bg-gray-50 hover:border-gray-300 hover:bg-gray-100 px-4 py-3 transition-colors text-left disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {exportRunning ? <Spinner className="h-5 w-5 mt-0.5 text-gray-500" /> : <span className="text-xl">📦</span>}
            <div>
              <p className="text-xs font-bold text-gray-800">Download as ZIP</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Downloads a ZIP file containing HTML report files. Open each in a browser to print.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ProjectRow ─────────────────────────────────────────────────────────────────

function ProjectRow({
  project: p,
  selected,
  stats,
  hiding,
  onClick,
  onHide,
  onUnhide,
}: {
  project: DashboardProject;
  selected: boolean;
  stats: InspectionStats | null;
  hiding: boolean;
  onClick: () => void;
  onHide: (e: React.MouseEvent) => void;
  onUnhide: (e: React.MouseEvent) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isHidden = p.is_hidden === true;

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  // Dot colour: derived from avg_score as a proxy for overall project health
  const worstBand = p.avg_score !== null ? scoreBand(p.avg_score) : null;

  const dotColor = ({
    compliant:        "bg-green-400",
    minor_gaps:       "bg-amber-400",
    significant_gaps: "bg-orange-400",
    critical_risk:    "bg-red-500",
  } as Record<string, string>)[worstBand ?? ""] ?? "bg-gray-200";

  const auditHref = `/audit?project_id=${p.id}&project_name=${encodeURIComponent(p.display_name || p.name)}`;

  return (
    <div className={`group relative border-b border-gray-100 transition-opacity duration-200 ${hiding ? "opacity-30 pointer-events-none" : ""}`}>
      <button
        type="button"
        onClick={onClick}
        disabled={isHidden}
        className={`w-full text-left px-3 py-2 pr-8 transition-colors ${
          isHidden
            ? "cursor-default"
            : selected
              ? "bg-amber-50 border-l-2 border-l-amber-500"
              : "hover:bg-gray-50 border-l-2 border-l-transparent"
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          {/* Rating dot */}
          <span className={`shrink-0 h-2 w-2 rounded-full ${isHidden ? "bg-gray-200" : dotColor}`} />

          <div className="min-w-0 flex-1">
            {p.project_number && (
              <p className="text-[10px] text-gray-400 leading-none mb-0.5">#{p.project_number}</p>
            )}
            <p className={`text-xs font-medium leading-snug truncate ${isHidden ? "text-gray-400" : "text-gray-800"}`}>
              {p.display_name || p.name}
            </p>
          </div>

          {/* Avg score or hidden label */}
          {isHidden ? (
            <span className="shrink-0 text-[10px] text-gray-400 italic">hidden</span>
          ) : p.avg_score !== null ? (
            <span className="shrink-0 text-[10px] font-semibold text-amber-600">
              Avg {p.avg_score}
            </span>
          ) : null}
        </div>
      </button>

      {/* ⋯ menu button — appears on row hover */}
      <div ref={menuRef} className="absolute right-1.5 top-1/2 -translate-y-1/2">
        <button
          type="button"
          onClick={e => { e.stopPropagation(); setMenuOpen(v => !v); }}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 leading-none text-sm font-bold"
          title="More options"
        >
          ⋯
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full mt-1 z-50 w-44 rounded-lg border border-gray-200 bg-white shadow-lg py-1 text-xs">
            <Link
              href={auditHref}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-1.5 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="h-3 w-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Audit Log
            </Link>
            {isHidden ? (
              <button
                type="button"
                onClick={e => { setMenuOpen(false); onUnhide(e); }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-gray-700 hover:bg-gray-50 transition-colors text-left"
              >
                <svg className="h-3 w-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                </svg>
                Unhide Project
              </button>
            ) : (
              <button
                type="button"
                onClick={e => { setMenuOpen(false); onHide(e); }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-gray-700 hover:bg-gray-50 transition-colors text-left"
              >
                <svg className="h-3 w-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
                Hide Project
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── InspectionRow ──────────────────────────────────────────────────────────────

function InspectionRow({
  insp,
  selected,
  checked,
  bulkItemStatus,
  bulkRunning,
  onCheck,
  onClick,
}: {
  insp: DashboardInspection;
  selected: boolean;
  checked: boolean;
  bulkItemStatus: BulkItemStatus | null;
  bulkRunning: boolean;
  onCheck: (e: React.MouseEvent) => void;
  onClick: () => void;
}) {
  const displayScore = insp.override_score ?? insp.last_score;
  const band = insp.last_score_band ?? (displayScore !== null ? scoreBand(displayScore) : null);
  const isClosed = insp.status?.toLowerCase() === "closed";

  return (
    <tr
      onClick={onClick}
      className={`cursor-pointer transition-colors border-b border-gray-100 ${
        selected ? "bg-amber-50 border-l-[3px] border-l-amber-600" :
        checked  ? "bg-amber-50/60 border-l-[3px] border-l-amber-400" :
                   "bg-white hover:bg-amber-50 border-l-[3px] border-l-amber-600"
      }`}
    >
      {/* Checkbox — smallest, indented under group header */}
      <td className="pl-9 pr-3 py-2.5" onClick={onCheck}>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {/* handled by onCheck */}}
          disabled={bulkRunning}
          className="h-3 w-3 rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer disabled:cursor-not-allowed accent-amber-600"
        />
      </td>

      {/* ITP name + dash bullet + bulk status — indented under group header */}
      <td className="pl-10 pr-3 py-2.5 max-w-0">
        <div className="flex items-center gap-2">
          <span className="text-amber-300 shrink-0 font-semibold text-sm select-none">–</span>
          <p className="text-sm font-medium text-gray-800 truncate">{insp.name}</p>
          {bulkItemStatus && (
            <BulkStatusBadge status={bulkItemStatus} />
          )}
        </div>
      </td>

      {/* # — now before Person */}
      <td className="px-3 py-2.5 text-xs font-medium text-gray-500 whitespace-nowrap">
        {insp.inspection_number_of_type != null ? `#${insp.inspection_number_of_type}` : "—"}
      </td>

      {/* Person */}
      <td className="px-3 py-2.5 text-[10px] text-gray-400 whitespace-nowrap">
        {isClosed
          ? (insp.closed_by ? `Closed by ${insp.closed_by}` : "—")
          : (insp.assignee  ? `Assigned to ${insp.assignee}` : "—")}
      </td>

      {/* Score */}
      <td className="px-3 py-2.5 whitespace-nowrap">
        {insp.review_status === "not_reviewed" ? (
          <span className="text-xs text-gray-300 italic">—</span>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-bold ${
              (displayScore ?? 0) >= 85 ? "text-green-600" :
              (displayScore ?? 0) >= 70 ? "text-amber-600" :
              (displayScore ?? 0) >= 50 ? "text-orange-500" :
                                          "text-red-600"
            }`}>
              {displayScore ?? "—"}
            </span>
            {insp.override_score !== null && (
              <span className="text-[10px] text-gray-400 line-through">{insp.last_score}</span>
            )}
          </div>
        )}
      </td>

      {/* Band pill */}
      <td className="px-3 py-2.5 whitespace-nowrap">
        {band ? (
          <div className="flex items-center gap-1.5">
            <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${scorePillClasses(band)}`}>
              {scoreBandLabel(band)}
            </span>
            {insp.override_score !== null && (
              <span className="text-[10px] text-purple-600 font-semibold">Human</span>
            )}
          </div>
        ) : (
          <span className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold bg-gray-200 text-gray-500">
            Not reviewed
          </span>
        )}
      </td>

      {/* Status — pill badge */}
      <td className="px-3 py-2.5 whitespace-nowrap">
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
          isClosed                                   ? "bg-gray-100 text-gray-500" :
          insp.status?.toLowerCase() === "in_review" ? "bg-amber-100 text-amber-700" :
                                                       "bg-green-100 text-green-700"
        }`}>
          {insp.status ?? "—"}
        </span>
      </td>

      {/* Last reviewed */}
      <td className="px-3 py-2.5 text-xs text-gray-400 whitespace-nowrap">
        {insp.last_reviewed_at ? fmtDate(insp.last_reviewed_at) : "—"}
        {insp.review_status === "changed" && (
          <span className="ml-1 text-amber-500 text-[10px]">⚠</span>
        )}
      </td>
    </tr>
  );
}

// ── BulkStatusBadge ────────────────────────────────────────────────────────────

function BulkStatusBadge({ status }: { status: BulkItemStatus }) {
  if (status === "queued") {
    return (
      <span className="shrink-0 inline-flex items-center rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-500">
        Queued
      </span>
    );
  }
  if (status === "processing") {
    return (
      <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600">
        <Spinner className="h-2.5 w-2.5 text-blue-500" /> Processing
      </span>
    );
  }
  if (status === "done") {
    return (
      <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-semibold text-green-700">
        ✓ Done
      </span>
    );
  }
  return (
    <span className="shrink-0 inline-flex items-center rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] font-semibold text-red-600">
      ✕ Failed
    </span>
  );
}

// ── InspectionPanel ────────────────────────────────────────────────────────────

function InspectionPanel({
  insp,
  companyId,
  reviewRunning,
  reviewError,
  overrideScore,
  overrideNote,
  overrideSaving,
  overrideError,
  onClose,
  onRunReview,
  onViewFullReport,
  onOverrideScoreChange,
  onOverrideNoteChange,
  onSaveOverride,
}: {
  insp: DashboardInspection;
  companyId: string;
  reviewRunning: boolean;
  reviewError: string | null;
  overrideScore: string;
  overrideNote: string;
  overrideSaving: boolean;
  overrideError: string | null;
  onClose: () => void;
  onRunReview: () => void;
  onViewFullReport: () => void;
  onOverrideScoreChange: (v: string) => void;
  onOverrideNoteChange: (v: string) => void;
  onSaveOverride: () => void;
}) {
  const displayScore  = insp.override_score ?? insp.last_score;
  const band          = insp.last_score_band ?? (displayScore !== null ? scoreBand(displayScore) : null);
  const rd            = insp.review_data;
  const hasOverride   = insp.override_score !== null;

  // Unused but required to satisfy the prop type — keep to avoid TS error
  void companyId;

  return (
    <div className="flex flex-col h-full">

      {/* Panel header */}
      <div className="flex items-start justify-between px-5 py-4 border-b border-gray-200 shrink-0 bg-white">
        <div className="min-w-0 flex-1 pr-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">ITP Detail</p>
          <h3 className="text-sm font-bold text-[#1F3864] leading-snug">{insp.name}</h3>
          {insp.inspection_number_of_type != null && (
            <p className="text-xs text-gray-400 mt-0.5">Inspection #{insp.inspection_number_of_type}</p>
          )}
        </div>
        <button onClick={onClose} className="shrink-0 text-gray-400 hover:text-gray-600 p-1 rounded transition-colors">✕</button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

        {/* Score + band */}
        {insp.review_status !== "not_reviewed" && (
          <div className={`rounded-xl border px-4 py-3 ${
            (displayScore ?? 0) >= 85 ? "bg-green-50 border-green-200" :
            (displayScore ?? 0) >= 70 ? "bg-yellow-50 border-yellow-200" :
            (displayScore ?? 0) >= 50 ? "bg-orange-50 border-orange-200" :
                                        "bg-red-50 border-red-200"
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Score</p>
                <div className="flex items-center gap-2">
                  <span className={`text-3xl font-bold ${
                    (displayScore ?? 0) >= 85 ? "text-green-600" :
                    (displayScore ?? 0) >= 70 ? "text-amber-600" :
                    (displayScore ?? 0) >= 50 ? "text-orange-500" :
                                                "text-red-500"
                  }`}>
                    {displayScore ?? "—"}
                  </span>
                  {hasOverride && (
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 line-through">AI: {insp.last_score}</span>
                      <span className="text-[10px] rounded-full bg-purple-100 text-purple-700 font-semibold px-2 py-0.5">
                        Human reviewed
                      </span>
                    </div>
                  )}
                </div>
                {band && (
                  <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${scorePillClasses(band)}`}>
                    {scoreBandLabel(band)}
                  </span>
                )}
              </div>
              <div className="text-right text-xs text-gray-400">
                <p>Reviewed {fmtDate(insp.last_reviewed_at)}</p>
                <p className={`mt-0.5 ${insp.status?.toLowerCase() === "closed" ? "text-gray-400" : "text-blue-500 font-medium"}`}>
                  {insp.status}
                </p>
                {insp.review_data?.scoring_version_label && (
                  <p className="mt-1 text-[10px] text-gray-300">
                    Scoring: {insp.review_data.scoring_version_label}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {insp.review_status === "not_reviewed" && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-center">
            <p className="text-sm text-gray-500">This ITP has not been reviewed yet.</p>
          </div>
        )}

        {/* D1–D5 breakdown */}
        {rd?.score_breakdown?.category_scores && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#1F3864] mb-3">Score breakdown</p>
            <div className="space-y-3">
              {([
                ["D1", "Engineer & inspector verification", rd.score_breakdown.category_scores.D1_engineer_verification],
                ["D2", "Technical testing evidence",        rd.score_breakdown.category_scores.D2_technical_testing],
                ["D3", "ITP form completeness",            rd.score_breakdown.category_scores.D3_itp_form_completeness],
                ["D4", "Material traceability",             rd.score_breakdown.category_scores.D4_material_traceability],
                ["D5", "Physical evidence",                 rd.score_breakdown.category_scores.D5_physical_evidence],
              ] as [string, string, CategoryScore][]).map(([code, label, cat]) => {
                const pct = cat.applicable_points > 0
                  ? Math.round((cat.achieved_points / cat.applicable_points) * 100)
                  : null;
                return (
                  <div key={code}>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs font-semibold text-gray-700">{code} — {label}</span>
                      <span className="text-xs text-gray-400 tabular-nums">
                        {pct !== null ? `${pct}%` : "N/A"}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      {pct !== null && (
                        <div
                          className={`h-full rounded-full ${scoreBarColour(pct)}`}
                          style={{ width: `${pct}%` }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Top 3 missing evidence */}
        {rd?.missing_evidence && rd.missing_evidence.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#1F3864] mb-2">Missing evidence</p>
            <div className="space-y-2">
              {rd.missing_evidence.slice(0, 3).map((item, i) => (
                <div key={i} className="rounded-lg border border-red-100 bg-red-50 px-3 py-2">
                  <p className="text-xs font-semibold text-red-700">{item.evidence_type}</p>
                  <p className="text-xs text-red-600 mt-0.5 leading-snug">{item.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onRunReview}
            disabled={reviewRunning}
            className="flex-1 rounded-lg bg-[#1F3864] px-3 py-2.5 text-xs font-semibold text-white hover:bg-[#253f77] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {reviewRunning ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner className="h-3 w-3 text-white" /> Running…
              </span>
            ) : "Run Review"}
          </button>
          {rd && (
            <button
              type="button"
              onClick={onViewFullReport}
              className="flex-1 rounded-lg border border-[#1F3864]/30 bg-[#1F3864]/5 px-3 py-2.5 text-xs font-semibold text-[#1F3864] hover:bg-[#1F3864]/10 transition-colors"
            >
              View Full Report
            </button>
          )}
        </div>

        {reviewError && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {reviewError}
          </p>
        )}

        {/* ── Human Override ── */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#1F3864] mb-3">
            Human Override
          </p>

          {hasOverride && (
            <div className="mb-3 rounded-lg border border-purple-200 bg-purple-50 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] rounded-full bg-purple-100 text-purple-700 font-semibold px-2 py-0.5">
                  Human reviewed
                </span>
                <span className="text-xs text-purple-700 font-medium">
                  AI: {insp.last_score} → Override: {insp.override_score}
                </span>
              </div>
              {insp.override_note && (
                <p className="text-xs text-purple-600 mt-1 italic break-words whitespace-pre-wrap">
                  &ldquo;{insp.override_note}&rdquo;
                </p>
              )}
              {insp.override_created_by && (
                <p className="text-[10px] text-purple-400 mt-0.5">by {insp.override_created_by}</p>
              )}
            </div>
          )}

          {insp.review_record_id ? (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Override score (0–100)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={overrideScore}
                  onChange={e => onOverrideScoreChange(e.target.value)}
                  placeholder="e.g. 78"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Reason for override</label>
                <RichNoteEditor
                  value={overrideNote}
                  onChange={onOverrideNoteChange}
                  instanceKey={String(insp.id)}
                  placeholder="Explain why the score is being adjusted…&#10;• Use Enter for new lines&#10;• Start a line with - for bullet points"
                />
              </div>
              {overrideError && (
                <p className="text-xs text-red-600">{overrideError}</p>
              )}
              <button
                type="button"
                onClick={onSaveOverride}
                disabled={overrideSaving || !overrideScore}
                className="w-full rounded-lg bg-amber-600 px-3 py-2.5 text-xs font-semibold text-white hover:bg-amber-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {overrideSaving ? "Saving…" : "Save Override"}
              </button>
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">Run a review first to enable score overrides.</p>
          )}
        </div>

      </div>
    </div>
  );
}

// ── RichNoteEditor ─────────────────────────────────────────────────────────────

function RichNoteEditor({
  value,
  onChange,
  placeholder,
  instanceKey,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  instanceKey: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (value) {
      const escaped = value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      ref.current.innerHTML = escaped.replace(/\n/g, "<br>");
    } else {
      ref.current.innerHTML = "";
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instanceKey]);

  function handleInput() {
    if (!ref.current) return;
    onChange(ref.current.innerText);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      document.execCommand("insertLineBreak");
      if (ref.current) onChange(ref.current.innerText);
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLDivElement>) {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
    if (ref.current) onChange(ref.current.innerText);
  }

  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      data-placeholder={placeholder}
      className={[
        "w-full min-h-[80px] rounded-lg border border-gray-200 bg-white px-3 py-2",
        "text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400",
        "whitespace-pre-wrap break-words overflow-y-auto",
        "empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:pointer-events-none",
      ].join(" ")}
    />
  );
}

// ── Spinner ────────────────────────────────────────────────────────────────────

function Spinner({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}
