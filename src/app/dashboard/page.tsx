"use client";

// ─── Dashboard ────────────────────────────────────────────────────────────────
// Project → ITP overview with review history, score overrides, and side panel.

import { useState, useEffect, useCallback, useRef } from "react";
import { Download, ArrowUpDown, ArrowDown, ArrowUp, Sparkles, ExternalLink, Paperclip, PenLine, CheckCircle, AlertTriangle, ChevronDown, FileText, Server, RefreshCw, RotateCcw } from "lucide-react";
import type { ActionItem } from "@/lib/types";
import Link from "next/link";
import ReviewResults from "@/components/ReviewResults";
import SiteComplianceTab from "@/components/SiteComplianceTab";
import InsightsTab from "@/components/InsightsTab";
import QueuePanel from "@/components/QueuePanel";
import type { QueueJob } from "@/components/QueuePanel";
import HoldpointLogo from "@/components/HoldpointLogo";
import type { ReviewResult, CategoryScore } from "@/lib/types";
import type { DashboardInspection } from "@/app/api/dashboard/inspections/route";

// ── Types ──────────────────────────────────────────────────────────────────────

type BulkItemStatus = "queued" | "processing" | "rate_limited" | "done" | "failed";

interface BgJobStatus {
  job_id:    string;
  status:    "running" | "completed" | "failed";
  total:     number;
  completed: number;
  failed:    number;
  items:     Array<{ inspection_id: number; project_id: string; status: string; error?: string }>;
}

interface Company { id: number; name: string; is_active: boolean }

interface DashboardProject {
  id: number;
  name: string;
  display_name: string;
  project_number: string | null;
  reviewed_count?: number;
  avg_score?: number | null;
  last_reviewed_at?: string | null;
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

type DateRange = "all" | "30d" | "90d" | "ytd";

interface CompanyProjectStat {
  procore_project_id: number;
  review_count: number;
  avg_score: number | null;
  last_reviewed_at: string | null;
  last_closed_by: string | null;
}

// ── Score helpers ──────────────────────────────────────────────────────────────

function scoreBand(score: number | null): string {
  if (score === null) return "not_reviewed";
  if (score >= 85) return "compliant";
  if (score >= 70) return "minor_gaps";
  if (score >= 50) return "significant_gaps";
  return "critical_risk";
}

function scoreBandLabel(band: string): string {
  if (band === "reset") return "Not reviewed";
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

// ── CSV export helpers ─────────────────────────────────────────────────────────

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/\n+/g, " ")
    .trim();
}

function buildIssuesSummary(insp: DashboardInspection): string {
  if (insp.review_status === "not_reviewed" || !insp.review_data) return "Not yet reviewed";
  const rd = insp.review_data;
  if (rd.executive_summary) {
    const clean = stripMarkdown(rd.executive_summary);
    return clean.length > 200 ? clean.slice(0, 197) + "…" : clean;
  }
  if (rd.key_issues?.length) {
    return rd.key_issues.map(i => stripMarkdown(i.title)).join("; ");
  }
  if (rd.missing_evidence?.length) {
    return `${rd.missing_evidence.length} missing evidence item${rd.missing_evidence.length === 1 ? "" : "s"}`;
  }
  return "Reviewed — no issues noted";
}

// Holdpoint brand: all D1-D5 bars use amber (#D97706 = amber-600)
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

function buildReportHtml(insp: DashboardInspection, autoPrint = false, companyId = 0, projectId = 0): string {
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
<div style="border-bottom:2px solid #8C7258;padding-bottom:12px;margin-bottom:16px">
  <div style="display:flex;justify-content:space-between;align-items:flex-start">
    <div>
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#8C7258;margin-bottom:4px">Holdpoint — ITP QA Report</div>
      <h2>${esc(insp.name)}${insp.inspection_number_of_type != null ? ` — Inspection #${insp.inspection_number_of_type}` : ""}</h2>
      <div style="font-size:10px;color:#6b7280;margin-top:2px">Generated ${new Date().toLocaleDateString("en-AU", { day: "2-digit", month: "long", year: "numeric" })}</div>
      ${companyId > 0 && projectId > 0 ? `<div style="font-size:10px;color:#2563eb;margin-top:2px">View in Procore: https://us02.procore.com/webclients/host/companies/${companyId}/projects/${projectId}/tools/inspections/${insp.id}</div>` : ""}
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

<!-- Action items for site manager -->
${(rd.action_items ?? []).length > 0 ? (() => {
  const rows = (rd.action_items ?? []).map(item => {
    const pBg  = item.priority === "high" ? "#fee2e2" : item.priority === "medium" ? "#fef9c3" : "#f3f4f6";
    const pClr = item.priority === "high" ? "#b91c1c" : item.priority === "medium" ? "#92400e" : "#6b7280";
    const icon = item.category === "evidence" ? "📎" : item.category === "signoff" ? "✍" : item.category === "close" ? "✓" : "⚠";
    return `<tr>
      <td style="padding:6px 8px;border-bottom:1px solid #f3f4f6;white-space:nowrap;vertical-align:top">
        <span style="display:inline-block;padding:2px 7px;border-radius:20px;font-size:10px;font-weight:700;background:${pBg};color:${pClr}">${item.priority.toUpperCase()}</span>
      </td>
      <td style="padding:6px 8px;border-bottom:1px solid #f3f4f6;font-size:11px;color:#1a1a1a;vertical-align:top">${icon} ${esc(item.action)}</td>
      <td style="padding:6px 8px;border-bottom:1px solid #f3f4f6;font-size:11px;color:#6b7280;vertical-align:top;white-space:nowrap">${esc(item.category)}</td>
    </tr>`;
  }).join("");
  return `<div style="margin-bottom:16px">
  <h3>Action Items for Site Manager</h3>
  <table style="font-size:12px">
    <thead>
      <tr style="background:#f3f4f6">
        <th style="padding:6px 8px;text-align:left;font-size:10px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.05em;width:14%">Priority</th>
        <th style="padding:6px 8px;text-align:left;font-size:10px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.05em">Action</th>
        <th style="padding:6px 8px;text-align:left;font-size:10px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.05em;width:14%">Category</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
</div>`;
})() : ""}

${autoPrint ? "<script>window.addEventListener('load',()=>{window.print();})</script>" : ""}
</body>
</html>`;
}

// ── Action Report PDF builder ──────────────────────────────────────────────────

function buildActionReportHtml(
  inspections: DashboardInspection[],
  projectName: string,
  companyId: number,
  projectId: number,
  userName: string | null,
): string {
  const reviewed = inspections.filter(i => i.review_data != null && (i.override_score ?? i.last_score) !== null);

  // Summary strip counts
  const countBand = (b: string) => reviewed.filter(i => {
    const s = i.override_score ?? i.last_score;
    const band = i.last_score_band ?? (s !== null ? scoreBand(s) : null);
    return band === b;
  }).length;
  const avgScore = reviewed.length > 0
    ? Math.round(reviewed.reduce((sum, i) => sum + (i.override_score ?? i.last_score ?? 0), 0) / reviewed.length)
    : null;
  const cCompliant    = countBand("compliant");
  const cMinor        = countBand("minor_gaps");
  const cSignificant  = countBand("significant_gaps");
  const cCritical     = countBand("critical_risk");

  const pillBg = (band: string | null): string => ({
    compliant:        "#6B8F5E",
    minor_gaps:       "#4A90A4",
    significant_gaps: "#C4872A",
    critical_risk:    "#B85450",
  } as Record<string, string>)[band ?? ""] ?? "#888";

  const priorityColor = (p: string): string =>
    p === "high" ? "#B85450" : p === "medium" ? "#C4872A" : "#6B8F5E";
  const priorityTag = (p: string): string =>
    p === "high" ? "HIGH" : p === "medium" ? "MED" : "LOW";

  const cards = reviewed.map(insp => {
    const rd           = insp.review_data!;
    const displayScore = insp.override_score ?? insp.last_score;
    const band         = insp.last_score_band ?? (displayScore !== null ? scoreBand(displayScore) : null);
    const bandLabel    = band ? scoreBandLabel(band) : "—";
    const bg           = pillBg(band);

    const assessment = rd.package_assessment
      ? stripMarkdown(rd.package_assessment)
      : rd.executive_summary
        ? stripMarkdown(rd.executive_summary).slice(0, 180) + (rd.executive_summary.length > 180 ? "…" : "")
        : "";

    const actionItems = (rd.action_items ?? []).slice(0, 5);
    const bulletLines = actionItems.map(item =>
      `<div style="display:flex;align-items:baseline;gap:6px;margin:3px 0;font-size:11px;color:#333;line-height:1.4">
        <span style="flex-shrink:0;font-size:9px;font-weight:700;letter-spacing:0.04em;color:${priorityColor(item.priority)};min-width:28px">${esc(priorityTag(item.priority))}</span>
        <span>${esc(item.action)}</span>
      </div>`
    ).join("");

    const seqLabel = insp.inspection_number_of_type != null ? ` · #${insp.inspection_number_of_type}` : "";

    return `
<div class="card">
  <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:5px">
    <div style="font-size:13px;font-weight:600;color:#2C2C2C;flex:1;min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
      ${esc(insp.name)}${esc(seqLabel)}
    </div>
    <span style="flex-shrink:0;font-size:11px;font-weight:600;color:#fff;background:${bg};padding:2px 10px;border-radius:20px;white-space:nowrap">
      ${displayScore ?? "—"} · ${esc(bandLabel)}
    </span>
  </div>
  ${assessment ? `<div style="font-size:12px;color:#555;line-height:1.45;margin-bottom:6px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${esc(assessment)}</div>` : ""}
  ${bulletLines
    ? `<div style="margin-top:2px">${bulletLines}</div>`
    : `<div style="font-size:11px;color:#aaa;font-style:italic">No action items recorded.</div>`}
</div>`;
  }).join("");

  const dateStr = new Date().toLocaleDateString("en-AU", { day: "2-digit", month: "long", year: "numeric" });
  const projNum = (inspections[0] as DashboardInspection & { project_number?: string })?.project_number;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(projectName)} — QA Action Report</title>
<style>
  @page {
    margin: 15mm 18mm;
    size: A4;
    @bottom-center {
      content: "Holdpoint · Confidential · Page " counter(page) " of " counter(pages);
      font-size: 10px;
      color: #999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
  }
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 12px;
    color: #1a1a1a;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .card {
    break-inside: avoid;
    padding: 10px 0;
    border-bottom: 1px solid #EDE8DF;
    margin-bottom: 8px;
  }
  .card:last-child { border-bottom: none; }
</style>
</head>
<body>

<!-- Header — top of first page only -->
<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding-bottom:10px;border-bottom:1px solid #D4C9B8;margin-bottom:8px">
  <div style="font-size:22px;font-weight:700;color:#5C6B4F;letter-spacing:-0.3px;line-height:1">Holdpoint</div>
  <div style="text-align:right;line-height:1.5">
    <div style="font-size:14px;font-weight:700;color:#2C2C2C">${esc(projectName)}</div>
    ${projNum ? `<div style="font-size:12px;color:#888">#${esc(projNum)}</div>` : ""}
    <div style="font-size:12px;color:#888">${esc(dateStr)}</div>
    ${userName ? `<div style="font-size:12px;color:#888">${esc(userName)}</div>` : ""}
  </div>
</div>

<!-- Summary strip -->
<div style="font-size:11px;color:#888;margin-bottom:16px;line-height:1.5">
  ${reviewed.length} ITP${reviewed.length !== 1 ? "s" : ""} reviewed
  ${avgScore !== null ? ` · Average score: ${avgScore}` : ""}
  ${cCompliant    > 0 ? ` · ${cCompliant} Compliant`         : ""}
  ${cMinor        > 0 ? ` · ${cMinor} Minor gaps`            : ""}
  ${cSignificant  > 0 ? ` · ${cSignificant} Significant gaps` : ""}
  ${cCritical     > 0 ? ` · ${cCritical} Critical risk`       : ""}
</div>

${reviewed.length === 0
  ? '<p style="color:#aaa;font-style:italic">No reviewed ITPs in the current selection.</p>'
  : cards}

<script>window.addEventListener("load", () => { window.print(); })</script>
</body>
</html>`;
}

// ── Company tab helpers ────────────────────────────────────────────────────────

function getDateParams(range: DateRange): string {
  if (range === "all") return "";
  const now  = new Date();
  const from = new Date(now);
  if (range === "30d")  from.setDate(now.getDate() - 30);
  if (range === "90d")  from.setDate(now.getDate() - 90);
  if (range === "ytd")  from.setMonth(0, 1);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return `&date_from=${fmt(from)}&date_to=${fmt(now)}`;
}

function buildCompanyReportHtml(
  projects: DashboardProject[],
  stats: CompanyProjectStat[],
  companyName: string,
  dateRange: DateRange,
  autoPrint = false
): string {
  const statsMap = new Map(stats.map(s => [s.procore_project_id, s]));
  const visibleProjects = projects.filter(p => !p.is_hidden);

  const totalReviewed = stats.reduce((s, x) => s + x.review_count, 0);
  const reviewedWithScore = stats.filter(x => x.avg_score !== null);
  const overallAvg = reviewedWithScore.length > 0
    ? Math.round(reviewedWithScore.reduce((s, x) => s + (x.avg_score ?? 0), 0) / reviewedWithScore.length)
    : null;

  const dateRangeLabel = ({ all: "All time", "30d": "Last 30 days", "90d": "Last 90 days", ytd: "This year" } as Record<DateRange, string>)[dateRange];

  const rows = visibleProjects.map(p => {
    const s = statsMap.get(p.id);
    const score = s?.avg_score ?? null;
    const band = score !== null ? scoreBand(score) : null;
    const bandColor = ({ compliant: "#16a34a", minor_gaps: "#d97706", significant_gaps: "#ea580c", critical_risk: "#dc2626" } as Record<string, string>)[band ?? ""] ?? "#6b7280";
    return `<tr style="border-bottom:1px solid #f3f4f6">
      <td style="padding:8px 10px;font-size:12px;font-weight:600;color:#1f2937">${esc(p.display_name || p.name)}</td>
      <td style="padding:8px 10px;font-size:11px;color:#6b7280;white-space:nowrap">${p.project_number ? `#${p.project_number}` : "—"}</td>
      <td style="padding:8px 10px;font-size:12px;text-align:center">${s?.review_count ?? 0}</td>
      <td style="padding:8px 10px;font-size:13px;font-weight:700;color:${bandColor};text-align:center">${score ?? "—"}</td>
      <td style="padding:8px 10px;font-size:11px;color:#6b7280;white-space:nowrap">${s?.last_reviewed_at ? fmtDate(s.last_reviewed_at) : "—"}</td>
      <td style="padding:8px 10px;font-size:11px;text-align:center">
        ${band ? `<span style="display:inline-block;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;background:${({ compliant: "#f0fdf4", minor_gaps: "#fffbeb", significant_gaps: "#fff7ed", critical_risk: "#fef2f2" } as Record<string, string>)[band] ?? "#f9fafb"};color:${bandColor}">${scoreBandLabel(band)}</span>` : '<span style="color:#9ca3af">—</span>'}
      </td>
    </tr>`;
  }).join("");

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<title>${esc(companyName)} — Company Overview</title>
<style>
  @page { margin: 18mm 20mm; }
  * { box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #1a1a1a; margin: 0; padding: 0; }
  table { width: 100%; border-collapse: collapse; }
</style>
</head><body>
<div style="border-bottom:2px solid #8C7258;padding-bottom:12px;margin-bottom:20px">
  <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#8C7258;margin-bottom:4px">Holdpoint — Company Overview</div>
  <h2 style="margin:0 0 4px 0;font-size:16px;font-weight:700">${esc(companyName)}</h2>
  <div style="font-size:10px;color:#6b7280">Period: ${esc(dateRangeLabel)} · Generated ${new Date().toLocaleDateString("en-AU", { day: "2-digit", month: "long", year: "numeric" })}</div>
</div>

<div style="display:flex;gap:16px;margin-bottom:20px">
  <div style="flex:1;padding:12px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;text-align:center">
    <div style="font-size:10px;color:#6b7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">Total Projects</div>
    <div style="font-size:24px;font-weight:700;color:#1f2937">${visibleProjects.length}</div>
  </div>
  <div style="flex:1;padding:12px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;text-align:center">
    <div style="font-size:10px;color:#6b7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">ITPs Reviewed</div>
    <div style="font-size:24px;font-weight:700;color:#1f2937">${totalReviewed}</div>
  </div>
  <div style="flex:1;padding:12px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;text-align:center">
    <div style="font-size:10px;color:#6b7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">Average Score</div>
    <div style="font-size:24px;font-weight:700;color:${overallAvg !== null ? (overallAvg >= 85 ? "#16a34a" : overallAvg >= 70 ? "#d97706" : overallAvg >= 50 ? "#ea580c" : "#dc2626") : "#9ca3af"}">${overallAvg ?? "—"}</div>
  </div>
</div>

<h3 style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#6b7280;margin:0 0 10px 0">Project Breakdown</h3>
<table>
  <thead>
    <tr style="background:#f3f4f6">
      <th style="padding:8px 10px;text-align:left;font-size:10px;font-weight:700;color:#374151;text-transform:uppercase">Project</th>
      <th style="padding:8px 10px;text-align:left;font-size:10px;font-weight:700;color:#374151;text-transform:uppercase">Number</th>
      <th style="padding:8px 10px;text-align:center;font-size:10px;font-weight:700;color:#374151;text-transform:uppercase">Reviewed</th>
      <th style="padding:8px 10px;text-align:center;font-size:10px;font-weight:700;color:#374151;text-transform:uppercase">Avg Score</th>
      <th style="padding:8px 10px;text-align:left;font-size:10px;font-weight:700;color:#374151;text-transform:uppercase">Last Reviewed</th>
      <th style="padding:8px 10px;text-align:center;font-size:10px;font-weight:700;color:#374151;text-transform:uppercase">Status</th>
    </tr>
  </thead>
  <tbody>${rows}</tbody>
</table>
${autoPrint ? "<script>window.addEventListener('load',()=>{window.print();})</script>" : ""}
</body></html>`;
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
  const [openSortOrder, setOpenSortOrder]           = useState<"default" | "score_desc" | "score_asc">("default");
  const [closedSortOrder, setClosedSortOrder]       = useState<"default" | "score_desc" | "score_asc">("default");

  // ITP group collapse state
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  // Bulk selection
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // Bulk review
  const [bulkRunning, setBulkRunning]   = useState(false);
  const [bulkStatus, setBulkStatus]     = useState<Map<number, BulkItemStatus>>(new Map());
  const [bulkSummary, setBulkSummary]   = useState<{ completed: number; failed: number } | null>(null);

  // Background queue — multi-project, keyed by job_id
  const [queueJobs, setQueueJobs] = useState<QueueJob[]>([]);
  const bgPollRef                 = useRef<ReturnType<typeof setInterval> | null>(null);
  // Map of job_id → Set of inspection_ids already refreshed in the list
  const bgRefreshedIds            = useRef<Map<string, Set<number>>>(new Map());

  // Refs to avoid stale closures inside the polling interval
  const queueJobsRef      = useRef<QueueJob[]>([]);
  const selectedProjRef   = useRef<DashboardProject | null>(null);
  const selectedCoRef     = useRef<Company | null>(null);
  useEffect(() => { queueJobsRef.current = queueJobs; }, [queueJobs]);
  useEffect(() => { selectedProjRef.current = selectedProject; }, [selectedProject]);
  useEffect(() => { selectedCoRef.current = selectedCompany; }, [selectedCompany]);

  // Start / stop the single polling interval based on whether any job is running
  const hasRunningJobs = queueJobs.some(j => j.status === "running");
  useEffect(() => {
    if (!hasRunningJobs) {
      if (bgPollRef.current) { clearInterval(bgPollRef.current); bgPollRef.current = null; }
      return;
    }
    if (bgPollRef.current) return; // already polling

    const poll = async () => {
      const running = queueJobsRef.current.filter(j => j.status === "running");
      for (const job of running) {
        try {
          const res = await fetch(
            `/api/procore/bulk-queue/status?job_id=${job.job_id}&company_id=${job.company_id}`
          );
          if (!res.ok) continue;
          const data: BgJobStatus = await res.json();

          // Per-item refresh when viewing this project
          if (!bgRefreshedIds.current.has(job.job_id)) bgRefreshedIds.current.set(job.job_id, new Set());
          const refreshed  = bgRefreshedIds.current.get(job.job_id)!;
          const curProject = selectedProjRef.current;

          for (const item of data.items) {
            if (
              item.status === "done" &&
              !refreshed.has(item.inspection_id) &&
              curProject && String(curProject.id) === job.project_id
            ) {
              refreshed.add(item.inspection_id);
              fetch(
                `/api/dashboard/inspections?project_id=${job.project_id}&company_id=${job.company_id}&inspection_id=${item.inspection_id}`
              )
                .then(r => r.json())
                .then((d: { inspections?: DashboardInspection[] }) => {
                  if (d.inspections?.length) {
                    setInspections(prev =>
                      prev.map(i => i.id === item.inspection_id ? { ...i, ...d.inspections![0] } : i)
                    );
                  }
                })
                .catch(() => {});
            }
          }

          // Update job record in state
          setQueueJobs(prev => prev.map(j => {
            if (j.job_id !== job.job_id) return j;
            return {
              ...j,
              status:    data.status as QueueJob["status"],
              total:     data.total,
              completed: data.completed,
              failed:    data.failed,
              items: data.items.map(i => ({
                inspection_id: i.inspection_id,
                status:        i.status as "queued" | "processing" | "done" | "failed",
                error:         i.error,
              })),
            };
          }));

          // Reload inspection list when the current project's job finishes
          if (
            (data.status === "completed" || data.status === "failed") &&
            curProject && selectedCoRef.current &&
            String(curProject.id) === job.project_id
          ) {
            void loadInspections(curProject, selectedCoRef.current);
          }
        } catch {
          // non-fatal — retry next tick
        }
      }
    };

    void poll();
    bgPollRef.current = setInterval(poll, 5000);

    return () => {
      if (bgPollRef.current) { clearInterval(bgPollRef.current); bgPollRef.current = null; }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasRunningJobs]);

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

  // Top-level tab
  type DashboardView = "company" | "insights" | "itp_reviews" | "site_compliance" | "queue";
  const [dashboardView, setDashboardView] = useState<DashboardView>("itp_reviews");
  const [insightsFetched, setInsightsFetched] = useState(false);

  // Company tab
  const [companyStats, setCompanyStats]           = useState<CompanyProjectStat[]>([]);
  const [companyStatsLoading, setCompanyStatsLoading] = useState(false);
  const [companyDateRange, setCompanyDateRange]   = useState<DateRange>("all");
  const [companyStatsFetched, setCompanyStatsFetched] = useState(false);

  // Admin status (used by Site Compliance tab mapping manager)
  const [isAdmin, setIsAdmin] = useState(false);

  // ── Auth + company discovery ────────────────────────────────────────────────

  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.authenticated) {
          setAuthenticated(true);
          setUser(data.user ?? null);
          loadCompanies();
          fetch("/api/admin/check")
            .then(r => r.ok ? r.json() : null)
            .then(d => setIsAdmin(!!d?.isAdmin))
            .catch(() => {});
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

  const fetchCompanyStats = useCallback(async (company: Company, range: DateRange) => {
    setCompanyStatsLoading(true);
    try {
      const url = `/api/dashboard/company-stats?company_id=${company.id}${getDateParams(range)}`;
      const res  = await fetch(url);
      const data = await res.json();
      setCompanyStats(data.stats ?? []);
      setCompanyStatsFetched(true);
    } catch {
      setCompanyStats([]);
    } finally {
      setCompanyStatsLoading(false);
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

      // Awaited for debugging — convert back to fire-and-forget once working.
      const inspIdForActionItems = selectedInsp.id;
      console.log("[action-items] triggering with:", {
        name:           selectedInsp.name,
        score:          data.result?.total_score,
        summary_length: data.result?.executive_summary?.length,
        issues:         data.result?.key_issues?.length,
        missing:        data.result?.missing_evidence?.length,
      });
      try {
        const aiRes  = await fetch("/api/procore/generate-action-items", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({
            inspection_id:    String(selectedInsp.id),
            project_id:       String(selectedProject.id),
            company_id:       String(selectedCompany.id),
            review_summary:   data.result?.executive_summary ?? "",
            key_issues:       (data.result?.key_issues ?? []).map((i: { title: string }) => i.title),
            missing_evidence: (data.result?.missing_evidence ?? []).map((m: { evidence_type: string }) => m.evidence_type),
            score:            data.result?.total_score ?? 0,
            score_band:       data.result?.score_band ?? "",
            itp_name:         selectedInsp.name,
          }),
        });
        const aiData = await aiRes.json();
        console.log("[action-items] full response:", aiData);
        if (aiData.action_items?.length > 0) {
          setInspections(prev => prev.map(i => {
            if (i.id !== inspIdForActionItems) return i;
            return {
              ...i,
              review_data: i.review_data
                ? { ...i.review_data, action_items: aiData.action_items }
                : i.review_data,
            };
          }));
          setSelectedInsp(prev => prev && prev.id === inspIdForActionItems && prev.review_data
            ? { ...prev, review_data: { ...prev.review_data, action_items: aiData.action_items } }
            : prev
          );
        } else {
          console.log("[action-items] empty or failed:", aiData);
        }
      } catch (e) {
        console.log("[action-items] error:", e);
      }

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

  // ── Reset Score ─────────────────────────────────────────────────────────────

  async function handleResetScore() {
    if (!selectedInsp?.review_record_id || !selectedCompany) return;
    const confirmed = window.confirm(
      "Reset this ITP score? It will be marked as unreviewed and can be re-scored by the cron job or manually."
    );
    if (!confirmed) return;
    try {
      const res = await fetch("/api/dashboard/reset-review", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          review_record_id: selectedInsp.review_record_id,
          company_id:       String(selectedCompany.id),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Reset failed");
      const updater = (insp: DashboardInspection): DashboardInspection =>
        insp.id === selectedInsp.id
          ? {
              ...insp,
              last_score:           0,
              last_score_band:      "reset",
              last_reviewed_at:     new Date().toISOString(),
              review_data:          null,
              override_score:       null,
              override_note:        null,
              override_created_by:  null,
            }
          : insp;
      setInspections(prev => prev.map(updater));
      setSelectedInsp(prev => prev ? updater(prev) : prev);
      setOverrideScore("");
      setOverrideNote("");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Reset failed");
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

  // Apply score sort on Open or Closed tab
  const activeSortOrder = statusFilter === "open" ? openSortOrder : statusFilter === "closed" ? closedSortOrder : "default";
  if (activeSortOrder !== "default") {
    const scoreOf = (i: DashboardInspection) => i.override_score ?? i.last_score;
    const cmp = (a: DashboardInspection, b: DashboardInspection) => {
      const sa = scoreOf(a), sb = scoreOf(b);
      if (sa === null && sb === null) return 0;
      if (sa === null) return 1;   // unreviewed always at bottom
      if (sb === null) return -1;
      return activeSortOrder === "score_desc" ? sb - sa : sa - sb;
    };
    for (const group of groupMap.values()) group.sort(cmp);
    const bestScore = (name: string) =>
      groupMap.get(name)!.reduce<number | null>((max, i) => {
        const s = scoreOf(i);
        return s === null ? max : max === null ? s : Math.max(max, s);
      }, null);
    groupOrder.sort((a, b) => {
      const ba = bestScore(a), bb = bestScore(b);
      if (ba === null && bb === null) return 0;
      if (ba === null) return 1;
      if (bb === null) return -1;
      return activeSortOrder === "score_desc" ? bb - ba : ba - bb;
    });
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

  // ── Background queue helpers ────────────────────────────────────────────────

  /** Registers a new job in the queue state and switches to the Queue tab. */
  function addQueueJob(
    jobId:   string,
    project: DashboardProject,
    company: Company,
    total = 0,
  ) {
    const job: QueueJob = {
      job_id:       jobId,
      project_id:   String(project.id),
      project_name: project.display_name || project.name,
      company_id:   String(company.id),
      status:       "running",
      total,
      completed:    0,
      failed:       0,
      items:        [],
      started_at:   new Date().toISOString(),
    };
    // Replace any existing job for this project; keep all others
    setQueueJobs(prev => [...prev.filter(j => j.project_id !== String(project.id)), job]);
  }

  async function handleRunInBackground() {
    if (!selectedProject || !selectedCompany) return;
    const allSelected = [...selectedUnreviewed, ...selectedReviewed];
    if (allSelected.length === 0) return;
    try {
      const res = await fetch("/api/procore/bulk-queue/start", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          company_id:     String(selectedCompany.id),
          project_id:     String(selectedProject.id),
          inspection_ids: allSelected.map(i => i.id),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to start background job");
      addQueueJob(data.job_id, selectedProject, selectedCompany, allSelected.length);
      setDashboardView("queue");
      setSelectedIds(new Set());
    } catch (err) {
      console.error("[bg-queue] start failed:", err);
    }
  }

  async function handleAutoUpdate() {
    if (!selectedProject || !selectedCompany) return;
    try {
      const res = await fetch("/api/procore/bulk-queue/auto", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          company_id: String(selectedCompany.id),
          project_id: String(selectedProject.id),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      if (data.queued === 0) {
        // Nothing to queue — show an immediate "Done" card in Queue tab
        const upToDate: QueueJob = {
          job_id:       `auto-uptodate-${Date.now()}`,
          project_id:   String(selectedProject.id),
          project_name: selectedProject.display_name || selectedProject.name,
          company_id:   String(selectedCompany.id),
          status:       "completed",
          total: 0, completed: 0, failed: 0, items: [],
          started_at: new Date().toISOString(),
        };
        setQueueJobs(prev => [...prev.filter(j => j.project_id !== String(selectedProject.id)), upToDate]);
        setDashboardView("queue");
        return;
      }
      addQueueJob(data.job_id, selectedProject, selectedCompany, data.queued as number);
      setDashboardView("queue");
    } catch (err) {
      console.error("[bg-queue] auto failed:", err);
    }
  }

  async function handleBulkReview() {
    if (!selectedProject || !selectedCompany || bulkRunning) return;
    const allSelected = [...selectedUnreviewed, ...selectedReviewed];
    if (allSelected.length === 0) return;

    setBulkRunning(true);
    setBulkSummary(null);
    setBulkStatus(() => {
      const m = new Map<number, BulkItemStatus>();
      allSelected.forEach(i => m.set(i.id, "queued"));
      return m;
    });

    const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

    let completed = 0, failed = 0;
    for (const insp of allSelected) {
      const runImport = () => fetch("/api/procore/import", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          project_id:    selectedProject.id,
          inspection_id: insp.id,
          company_id:    selectedCompany.id,
        }),
      });

      setBulkStatus(prev => new Map(prev).set(insp.id, "processing"));
      try {
        let res = await runImport();

        // 429 rate limit — show rate_limited state, wait 15s, retry once
        if (res.status === 429) {
          setBulkStatus(prev => new Map(prev).set(insp.id, "rate_limited"));
          await delay(15000);
          res = await runImport();
          if (res.status === 429) {
            throw new Error("Rate limit — please retry this ITP manually");
          }
          setBulkStatus(prev => new Map(prev).set(insp.id, "processing"));
        }

        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error ?? "Review failed");
        setBulkStatus(prev => new Map(prev).set(insp.id, "done"));
        completed++;

        // Awaited for debugging — convert back to fire-and-forget once working.
        const bulkInspId = insp.id;
        console.log("[action-items] triggering with:", {
          name:           insp.name,
          score:          data.result?.total_score,
          summary_length: data.result?.executive_summary?.length,
          issues:         data.result?.key_issues?.length,
          missing:        data.result?.missing_evidence?.length,
        });
        try {
          const aiRes  = await fetch("/api/procore/generate-action-items", {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({
              inspection_id:    String(insp.id),
              project_id:       String(selectedProject.id),
              company_id:       String(selectedCompany.id),
              review_summary:   data.result?.executive_summary ?? "",
              key_issues:       (data.result?.key_issues ?? []).map((i: { title: string }) => i.title),
              missing_evidence: (data.result?.missing_evidence ?? []).map((m: { evidence_type: string }) => m.evidence_type),
              score:            data.result?.total_score ?? 0,
              score_band:       data.result?.score_band ?? "",
              itp_name:         insp.name,
            }),
          });
          const aiData = await aiRes.json();
          console.log("[action-items] full response:", aiData);
          if (aiData.action_items?.length > 0) {
            setInspections(prev => prev.map(i => {
              if (i.id !== bulkInspId) return i;
              return {
                ...i,
                review_data: i.review_data
                  ? { ...i.review_data, action_items: aiData.action_items }
                  : i.review_data,
              };
            }));
          } else {
            console.log("[action-items] empty or failed:", aiData);
          }
        } catch (e) {
          console.log("[action-items] error:", e);
        }

        // Immediately update this row's score without waiting for the full batch
        try {
          const updated = await fetch(
            `/api/dashboard/inspections?project_id=${selectedProject.id}&company_id=${selectedCompany.id}&inspection_id=${insp.id}`
          );
          if (updated.ok) {
            const updatedData = await updated.json();
            if (updatedData.inspections?.length > 0) {
              setInspections(prev => prev.map(i =>
                i.id === insp.id ? { ...i, ...updatedData.inspections[0] } : i
              ));
            }
          }
        } catch {
          // non-fatal — score will still show on final reload
        }
      } catch {
        setBulkStatus(prev => new Map(prev).set(insp.id, "failed"));
        failed++;
      }

      // 3s delay between reviews to avoid hitting the TPM rate limit.
      // Skip the delay after the last item.
      if (insp !== allSelected[allSelected.length - 1]) {
        await delay(3000);
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
      const html = buildReportHtml(insp, true, selectedCompany?.id ?? 0, selectedProject?.id ?? 0);
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
        const html     = buildReportHtml(insp, false, selectedCompany?.id ?? 0, selectedProject?.id ?? 0);
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

  // ── CSV export ──────────────────────────────────────────────────────────────

  function handleExportCsv() {
    if (!selectedProject || filteredInspections.length === 0) return;

    const isClosed   = statusFilter === "closed";
    const tabLabel   = statusFilter === "closed" ? "closed" : statusFilter === "open" ? "open" : "in-review";
    const safeName   = (selectedProject.display_name || selectedProject.name)
      .replace(/[^a-z0-9]/gi, "-")
      .replace(/-+/g, "-")
      .toLowerCase();
    const dateStr    = new Date().toISOString().slice(0, 10);
    const filename   = `${tabLabel}-itps-${safeName}-${dateStr}.csv`;

    function csvField(value: string | null | undefined): string {
      return `"${(value ?? "").replace(/"/g, '""')}"`;
    }

    const projectLabel = selectedProject.display_name || selectedProject.name;

    const headers = isClosed
      ? ["ITP Number", "ITP Name", "Project", "Status", "Score", "Band", "Closed By", "Issues / Missing"]
      : ["ITP Number", "ITP Name", "Project", "Status", "Score", "Band", "Issues / Missing"];

    const rows = filteredInspections.map(insp => {
      const displayScore = insp.override_score ?? insp.last_score;
      const band         = insp.last_score_band ?? (displayScore !== null ? scoreBand(displayScore) : null);
      const bandLabel    = band ? scoreBandLabel(band) : "Not reviewed";
      const scoreStr     = displayScore !== null ? String(displayScore) : "—";
      const issues       = buildIssuesSummary(insp);
      const itpNumber    = insp.inspection_number_of_type != null
        ? `#${insp.inspection_number_of_type}`
        : "—";

      const base = [
        csvField(itpNumber),
        csvField(insp.name),
        csvField(projectLabel),
        csvField(insp.status ?? ""),
        csvField(scoreStr),
        csvField(bandLabel),
      ];

      return isClosed
        ? [...base, csvField(insp.closed_by), csvField(issues)].join(",")
        : [...base, csvField(issues)].join(",");
    });

    const csv = [headers.map(h => csvField(h)).join(","), ...rows].join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Export Action Report ────────────────────────────────────────────────────

  function handleExportActionReport() {
    if (!selectedProject || !selectedCompany) return;

    // Use checkbox selection if anything is selected; otherwise all reviewed in current tab
    const reviewedSelected = filteredInspections.filter(
      i => selectedIds.has(i.id) && i.review_data != null && (i.override_score ?? i.last_score) !== null
    );
    const source = reviewedSelected.length > 0
      ? reviewedSelected
      : filteredInspections.filter(i => i.review_data != null && (i.override_score ?? i.last_score) !== null);

    if (source.length === 0) return;

    const html = buildActionReportHtml(
      source,
      selectedProject.display_name || selectedProject.name,
      selectedCompany.id,
      selectedProject.id,
      user?.name ?? null,
    );
    const win = window.open("", "_blank");
    if (!win) {
      alert("Popup blocked — please allow popups and try again.");
      return;
    }
    win.document.write(html);
    win.document.close();
  }

  // ── Not authenticated ───────────────────────────────────────────────────────

  if (authenticated === false) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 py-24" style={{ backgroundColor: "var(--hp-bg)" }}>
        <p className="text-sm text-gray-600">Connect to Procore to use the dashboard.</p>
        <a
          href="/api/auth/login"
          style={{ backgroundColor: "var(--hp-warm-800)" }}
          className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors"
        >
          Connect to Procore
        </a>
      </div>
    );
  }

  if (authenticated === null) {
    return (
      <div className="flex-1 flex items-center justify-center py-24" style={{ backgroundColor: "var(--hp-bg)" }}>
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
          <ReviewResults result={fullReportInsp.review_data} onReset={() => setFullReportInsp(null)} description={fullReportInsp.description} />
        </div>
      </div>
    );
  }

  // ── Dashboard layout ────────────────────────────────────────────────────────

  const selectedCount = selectedIds.size;
  const currentProjectQueueJob = selectedProject
    ? queueJobs.find(j => j.project_id === String(selectedProject.id))
    : undefined;

  return (
    <div className="flex h-full flex-col overflow-hidden" style={{ backgroundColor: "var(--hp-bg)" }}>

      {/* ── Top-level tab nav ── */}
      <div
        className="shrink-0 flex items-center gap-1 px-3"
        style={{ backgroundColor: "var(--hp-surface)", borderBottom: "1px solid var(--hp-border)", height: 44 }}
      >
        {([
          ["company",         "Company",         null],
          ["insights",        "Insights",        "sparkles"],
          ["itp_reviews",     "ITP Reviews",     null],
          ["site_compliance", "Site Compliance", null],
          ["queue",           "Queue",           null],
        ] as [DashboardView, string, string | null][]).map(([view, baseLabel, icon]) => {
          const runningCount = view === "queue"
            ? queueJobs.filter(j => j.status === "running").length
            : 0;
          const label = view === "queue" && runningCount > 0
            ? `Queue (${runningCount})`
            : baseLabel;
          return (
            <button
              key={view}
              type="button"
              onClick={() => {
                setDashboardView(view);
                if (view === "company" && !companyStatsFetched && selectedCompany) {
                  fetchCompanyStats(selectedCompany, companyDateRange);
                }
                if (view === "insights") setInsightsFetched(true);
              }}
              className="flex items-center gap-1.5 transition-all"
              style={{
                padding: "5px 12px",
                borderRadius: 6,
                fontSize: 13,
                cursor: "pointer",
                border: "none",
                fontWeight: dashboardView === view ? 500 : 400,
                backgroundColor: dashboardView === view ? "var(--hp-warm-100)" : "transparent",
                color: dashboardView === view ? "var(--hp-warm-800)" : "var(--hp-text-secondary)",
              }}
            >
              {icon === "sparkles" && <Sparkles className="h-3 w-3" />}
              {label}
            </button>
          );
        })}
      </div>

      {/* ── Company tab ── */}
      {dashboardView === "company" && (
        <CompanyTab
          companies={companies}
          selectedCompany={selectedCompany}
          onSelectCompany={setSelectedCompany}
          projects={projects}
          projectsLoading={projectsLoading}
          companyStats={companyStats}
          companyStatsLoading={companyStatsLoading}
          companyDateRange={companyDateRange}
          selectedProject={selectedProject}
          inspections={inspections}
          onDateRangeChange={(range) => {
            setCompanyDateRange(range);
            if (selectedCompany) fetchCompanyStats(selectedCompany, range);
          }}
          onRefresh={() => {
            if (selectedCompany) fetchCompanyStats(selectedCompany, companyDateRange);
          }}
          onViewProject={(project) => {
            setDashboardView("itp_reviews");
            handleSelectProject(project);
          }}
        />
      )}

      {/* ── Insights tab ── */}
      {dashboardView === "insights" && (
        <InsightsTab
          companyId={selectedCompany?.id ?? null}
          projects={projects}
          projectsLoading={projectsLoading}
          inspections={inspections}
          selectedProject={selectedProject}
          onViewProject={(project) => {
            setDashboardView("itp_reviews");
            setStatusFilter("open");
            handleSelectProject(project);
          }}
        />
      )}

      {/* ── Site Compliance tab ── */}
      {dashboardView === "site_compliance" && (
        <SiteComplianceTab
          companyId={selectedCompany?.id ?? null}
          projects={projects}
          isAdmin={isAdmin}
        />
      )}

      {/* ── Queue tab ── */}
      {dashboardView === "queue" && (
        <QueuePanel
          jobs={queueJobs}
          onDismiss={(job_id) => setQueueJobs(prev => prev.filter(j => j.job_id !== job_id))}
        />
      )}

      {/* ── ITP Reviews tab ── */}
      {dashboardView === "itp_reviews" && (<>
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left: project list ── */}
        <aside
          className="w-64 shrink-0 overflow-y-auto flex flex-col"
          style={{ backgroundColor: "var(--hp-sidebar)", borderRight: "1px solid rgba(0,0,0,0.12)" }}
        >
          {/* Holdpoint branding + company selector */}
          <div className="shrink-0" style={{ padding: "14px 12px 12px 12px", borderBottom: "1px solid rgba(255,255,255,0.10)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: companies.length > 1 ? 10 : 0 }}>
              <HoldpointLogo variant="dark" size={28} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.95)", lineHeight: 1.2 }}>Holdpoint</div>
              </div>
            </div>
            {companies.length > 1 && (
              <select
                value={selectedCompany?.id ?? ""}
                onChange={e => {
                  const c = companies.find(x => x.id === Number(e.target.value));
                  if (c) setSelectedCompany(c);
                }}
                className="w-full rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                style={{ backgroundColor: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)" }}
              >
                <option value="">— Select company —</option>
                {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            )}
          </div>
          {/* Projects label + audit link */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 shrink-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">Projects</p>
            <Link href="/audit" className="text-[10px] text-white/50 hover:text-white/80 transition-colors font-medium">
              Audit Log
            </Link>
          </div>
          {!selectedCompany && (
            <p className="px-4 py-6 text-xs text-white/40 italic">Select a company to load projects.</p>
          )}
          {selectedCompany && projectsLoading && (
            <div className="flex items-center gap-2 px-4 py-4 text-xs text-white/50">
              <Spinner className="h-3 w-3 text-white/40" /> Loading…
            </div>
          )}
          {selectedCompany && !projectsLoading && projects.length === 0 && (
            <p className="px-4 py-4 text-xs text-white/40 italic">No projects found.</p>
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
            <div className="border-t border-white/10 px-3 py-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowHidden(v => !v)}
                className="text-[10px] text-white/40 hover:text-white/60 transition-colors"
              >
                {showHidden ? "Hide hidden projects" : `${hiddenCount} hidden — show`}
              </button>
            </div>
          )}
        </aside>

        {/* ── Main: ITP list ── */}
        <main className="flex-1 overflow-y-auto relative" style={{ backgroundColor: "var(--hp-bg)" }}>
          {!selectedProject && (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-gray-400">Select a project to view its ITPs.</p>
            </div>
          )}

          {selectedProject && (
            <div className="pb-24">
              {/* Project header */}
              <div className="sticky top-0 z-10 px-6 py-4" style={{ backgroundColor: "var(--hp-surface)", borderBottom: "1px solid var(--hp-border)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-[var(--hp-text-primary)]">
                      {selectedProject.display_name || selectedProject.name}
                    </h2>
                    {selectedProject.project_number && (
                      <p className="text-[11px] text-gray-400 mt-0.5 font-medium">#{selectedProject.project_number}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {(selectedProject.reviewed_count ?? 0) > 0 && (
                      <>
                        <span className="text-xs text-gray-400">{selectedProject.reviewed_count} reviewed</span>
                        {(selectedProject.avg_score ?? null) !== null && (
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            (selectedProject.avg_score ?? 0) >= 85 ? "bg-green-50 text-green-700 border border-green-200" :
                            (selectedProject.avg_score ?? 0) >= 70 ? "bg-amber-50 text-amber-700 border border-amber-200" :
                            (selectedProject.avg_score ?? 0) >= 50 ? "bg-orange-50 text-orange-600 border border-orange-200" :
                                                                      "bg-red-50 text-red-600 border border-red-200"
                          }`}>
                            Avg {selectedProject.avg_score}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Status tabs */}
                <div className="mt-3 flex items-center gap-2">
                  {([
                    ["closed",    `Closed (${closedCount})`],
                    ["in_review", `In Review (${inReviewCount})`],
                    ["open",      `Open (${openCount})`],
                  ] as [StatusFilter, string][]).map(([s, label]) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => { setStatusFilter(s); setOpenSortOrder("default"); setClosedSortOrder("default"); setSelectedIds(new Set()); setBulkStatus(new Map()); setBulkSummary(null); }}
                      className="transition-all"
                      style={{
                        fontSize: 12, padding: "5px 12px", borderRadius: 20, cursor: "pointer",
                        border: statusFilter === s ? "1px solid var(--hp-warm-800)" : "1px solid var(--hp-border)",
                        backgroundColor: statusFilter === s ? "var(--hp-warm-800)" : "var(--hp-surface)",
                        color: statusFilter === s ? "white" : "var(--hp-text-secondary)",
                        fontWeight: statusFilter === s ? 500 : 400,
                      }}
                    >
                      {label}
                    </button>
                  ))}
                  <div className="flex-1" />
                  <button
                    type="button"
                    onClick={handleAutoUpdate}
                    className="flex items-center gap-1 transition-colors"
                    style={{ fontSize: 12, color: "var(--hp-text-secondary)", cursor: "pointer" }}
                  >
                    <RefreshCw size={13} />
                    Auto-update closed ITPs
                  </button>
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

              {/* Background job status banner — current project only */}
              {currentProjectQueueJob && (
                <div className="mx-4 mt-3 rounded-lg border px-4 py-2.5 flex items-center justify-between" style={{ backgroundColor: "var(--hp-warm-100)", borderColor: "var(--hp-warm-200)" }}>
                  <span className="text-xs font-semibold" style={{ color: "var(--hp-text-secondary)" }}>
                    {currentProjectQueueJob.status === "running"
                      ? `Background review running — ${currentProjectQueueJob.completed} of ${currentProjectQueueJob.total} complete`
                      : currentProjectQueueJob.failed > 0
                      ? `Background review complete — ${currentProjectQueueJob.completed} succeeded, ${currentProjectQueueJob.failed} failed`
                      : `Background review complete — ${currentProjectQueueJob.completed} reviewed`}
                  </span>
                  <div className="flex items-center gap-3 ml-4">
                    <button
                      onClick={() => setDashboardView("queue")}
                      className="text-xs font-medium hover:underline"
                      style={{ color: "var(--hp-warm-800)" }}
                    >
                      View Queue
                    </button>
                    {currentProjectQueueJob.status !== "running" && (
                      <button
                        onClick={() => setQueueJobs(prev => prev.filter(j => j.job_id !== currentProjectQueueJob.job_id))}
                        className="text-xs text-gray-400 hover:text-gray-600"
                      >✕</button>
                    )}
                  </div>
                </div>
              )}

              {/* ITP table */}
              {inspectionsLoading && (
                <div className="flex items-center gap-2 px-6 py-6 text-sm text-gray-400">
                  <Spinner className="h-4 w-4 text-[var(--hp-text-muted)]" /> Loading inspections…
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
                  <div
                    className="sticky top-0 z-10 flex items-center justify-between px-4"
                    style={{ backgroundColor: "var(--hp-bg)", paddingTop: 10, paddingBottom: 10, borderBottom: "1px solid var(--hp-border-light)", marginBottom: 14 }}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={allVisible}
                        ref={el => { if (el) el.indeterminate = someVisible; }}
                        onChange={toggleSelectAll}
                        disabled={bulkRunning}
                        className="h-4 w-4 rounded border-gray-400 text-amber-600 focus:ring-amber-500 cursor-pointer disabled:cursor-not-allowed"
                      />
                      <span style={{ fontSize: 12, fontWeight: 500, color: "var(--hp-text-secondary)" }}>Select All</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {(statusFilter === "open" || statusFilter === "closed") && (
                        <button
                          type="button"
                          onClick={() => {
                            if (statusFilter === "open") setOpenSortOrder(o => o === "default" ? "score_desc" : o === "score_desc" ? "score_asc" : "default");
                            else setClosedSortOrder(o => o === "default" ? "score_desc" : o === "score_desc" ? "score_asc" : "default");
                          }}
                          className="flex items-center gap-1.5"
                          style={{ fontSize: 12, padding: "5px 10px", borderRadius: 6, border: "1px solid var(--hp-border)", backgroundColor: activeSortOrder !== "default" ? "var(--hp-warm-100)" : "var(--hp-surface)", color: activeSortOrder !== "default" ? "var(--hp-warm-800)" : "var(--hp-text-secondary)", cursor: "pointer" }}
                          title="Sort by score"
                        >
                          {activeSortOrder === "score_desc" ? <ArrowDown className="h-3.5 w-3.5" /> : activeSortOrder === "score_asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowUpDown className="h-3.5 w-3.5" />}
                          {activeSortOrder === "score_desc" ? "Score ↓" : activeSortOrder === "score_asc" ? "Score ↑" : "Sort"}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handleExportCsv}
                        className="flex items-center gap-1.5"
                        style={{ fontSize: 12, padding: "5px 10px", borderRadius: 6, border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-surface)", color: "var(--hp-text-secondary)", cursor: "pointer" }}
                        title="Export visible ITPs to CSV"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Export CSV
                      </button>
                      <button
                        type="button"
                        onClick={handleExportActionReport}
                        disabled={filteredInspections.filter(i => i.review_data != null).length === 0}
                        className="flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ fontSize: 12, padding: "5px 10px", borderRadius: 6, border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-surface)", color: "var(--hp-text-secondary)", cursor: "pointer" }}
                        title={selectedIds.size > 0 ? "Export action report for selected ITPs" : "Export action report for all reviewed ITPs in this view"}
                      >
                        <FileText className="h-3.5 w-3.5" />
                        Action Report
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const allCollapsed = groupOrder.length > 0 && collapsedGroups.size === groupOrder.length;
                          setCollapsedGroups(allCollapsed ? new Set() : new Set(groupOrder));
                        }}
                        className="flex items-center gap-1.5"
                        style={{ fontSize: 12, padding: "5px 10px", borderRadius: 6, border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-surface)", color: "var(--hp-text-secondary)", cursor: "pointer" }}
                      >
                        <span className={`inline-block text-[9px] transition-transform duration-150 ${groupOrder.length > 0 && collapsedGroups.size === groupOrder.length ? "" : "rotate-90"}`}>▶</span>
                        {groupOrder.length > 0 && collapsedGroups.size === groupOrder.length ? "Expand All" : "Collapse All"}
                      </button>
                    </div>
                  </div>

                  {/* Score legend */}
                  <div style={{ display: "flex", gap: 16, padding: "9px 14px", backgroundColor: "var(--hp-surface)", border: "1px solid var(--hp-border-light)", borderRadius: 8, marginBottom: 12, fontSize: 11, color: "var(--hp-text-secondary)", alignItems: "center", flexWrap: "wrap" }}>
                    {([
                      ["var(--hp-compliant)",  "Compliant (75+)"],
                      ["var(--hp-minor)",       "Minor gaps (60–74)"],
                      ["var(--hp-significant)", "Significant gaps (40–59)"],
                      ["var(--hp-critical)",    "Critical risk (below 40)"],
                    ] as [string, string][]).map(([color, label]) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: color, flexShrink: 0 }} />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>

                  {/* ITP rows */}
                  <div>
                    {groupOrder.map(groupName => {
                      const group           = groupMap.get(groupName)!;
                      const isCollapsed     = collapsedGroups.has(groupName);
                      const reviewedInGroup = group.filter(i => i.review_status !== "not_reviewed").length;
                      const groupIds        = group.map(i => i.id);
                      const allGroupSel     = groupIds.every(id => selectedIds.has(id));
                      const someGroupSel    = !allGroupSel && groupIds.some(id => selectedIds.has(id));

                      return [
                        // Group header
                        <div
                          key={`group-${groupName}`}
                          className="select-none"
                          style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", marginBottom: 5, marginTop: 12 }}
                        >
                          <div onClick={e => e.stopPropagation()} style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                            <span
                              style={{ fontSize: 10, color: "var(--hp-text-muted)", cursor: "pointer", display: "inline-block", transform: isCollapsed ? "rotate(0deg)" : "rotate(90deg)", transition: "transform 150ms" }}
                              onClick={() => toggleGroup(groupName)}
                            >▶</span>
                            <input
                              type="checkbox"
                              checked={allGroupSel}
                              ref={el => { if (el) el.indeterminate = someGroupSel; }}
                              onChange={() => toggleSelectGroup(group)}
                              disabled={bulkRunning}
                              style={{ accentColor: "var(--hp-warm-800)", cursor: bulkRunning ? "not-allowed" : "pointer", width: 12, height: 12 }}
                            />
                          </div>
                          <span
                            className="uppercase"
                            style={{ fontSize: 12, fontWeight: 600, color: "var(--hp-text-secondary)", letterSpacing: "0.4px", cursor: "pointer", whiteSpace: "nowrap" }}
                            onClick={() => toggleGroup(groupName)}
                          >
                            {groupName}
                          </span>
                          <div style={{ flex: 1, height: 1, backgroundColor: "var(--hp-border-light)" }} />
                          <span style={{ fontSize: 11, color: "var(--hp-text-muted)", whiteSpace: "nowrap" }}>
                            {reviewedInGroup}/{group.length} reviewed
                          </span>
                        </div>,
                        // Inspection rows
                        ...(!isCollapsed ? group.map(insp => (
                          <InspectionRow
                            key={insp.id}
                            insp={insp}
                            selected={selectedInsp?.id === insp.id && panelOpen}
                            checked={selectedIds.has(insp.id)}
                            bulkItemStatus={bulkStatus.get(insp.id) ?? null}
                            bulkRunning={bulkRunning}
                            companyId={selectedCompany?.id ?? 0}
                            projectId={selectedProject?.id ?? 0}
                            onCheck={e => { e.stopPropagation(); toggleSelect(insp.id); }}
                            onClick={() => openPanel(insp)}
                          />
                        )) : []),
                      ];
                    })}
                  </div>
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
              bgJobRunningForProject={queueJobs.some(
                j => j.project_id === String(selectedProject?.id) && j.status === "running"
              )}
              onRunReviews={handleBulkReview}
              onRunInBackground={handleRunInBackground}
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
            companyId={selectedCompany?.id ?? 0}
            projectId={selectedProject?.id ?? 0}
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
            isAdmin={isAdmin}
            onResetScore={handleResetScore}
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
      </>)} {/* end itp_reviews tab */}

    </div>
  );
}

// ── BulkActionBar ──────────────────────────────────────────────────────────────

function BulkActionBar({
  selectedCount,
  unreviewedCount,
  reviewedCount,
  bulkRunning,
  bgJobRunningForProject,
  onRunReviews,
  onRunInBackground,
  onExportPdfs,
  onClearSelection,
}: {
  selectedCount: number;
  unreviewedCount: number;
  reviewedCount: number;
  bulkRunning: boolean;
  bgJobRunningForProject: boolean;  // true if this project already has a running bg job
  onRunReviews: () => void;
  onRunInBackground: () => void;
  onExportPdfs: () => void;
  onClearSelection: () => void;
}) {
  const total = unreviewedCount + reviewedCount;
  return (
    <div className="sticky bottom-0 z-20 mx-4 mb-4 rounded-xl shadow-xl px-4 py-3 flex items-center gap-3" style={{ backgroundColor: "var(--hp-warm-800)" }}>
      <span className="text-xs font-semibold text-white/80 shrink-0">
        {selectedCount} selected
      </span>
      <div className="flex items-center gap-2 flex-1">
        <button
          type="button"
          onClick={onRunReviews}
          disabled={bulkRunning}
          className="rounded-lg bg-amber-600 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
        >
          {bulkRunning && <Spinner className="h-3 w-3 text-white" />}
          {unreviewedCount > 0 && reviewedCount === 0
            ? `Run Reviews (${unreviewedCount})`
            : unreviewedCount === 0 && reviewedCount > 0
            ? `Re-run Reviews (${reviewedCount})`
            : `Run/Re-run Reviews (${total})`}
        </button>
        <button
          type="button"
          onClick={onRunInBackground}
          disabled={bulkRunning}
          className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
        >
          {bgJobRunningForProject ? <Spinner className="h-3 w-3 text-white" /> : <Server size={14} />}
          {bgJobRunningForProject ? `Update Queue (${total})` : `Run in Background (${total})`}
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
            className="flex items-start gap-3 rounded-xl border-2 border-[var(--hp-border)] bg-[var(--hp-warm-100)] hover:border-[var(--hp-border)] hover:bg-[var(--hp-warm-200)] px-4 py-3 transition-colors text-left disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="text-xl">🖨️</span>
            <div>
              <p className="text-xs font-bold text-[var(--hp-text-primary)]">Separate files</p>
              <p className="text-[11px] text-[var(--hp-text-secondary)] mt-0.5">
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
  const worstBand = (p.avg_score ?? null) !== null ? scoreBand(p.avg_score!) : null;

  const dotColor = ({
    compliant:        "bg-green-400",
    minor_gaps:       "bg-amber-400",
    significant_gaps: "bg-orange-400",
    critical_risk:    "bg-red-500",
  } as Record<string, string>)[worstBand ?? ""] ?? "bg-gray-200";

  const auditHref = `/audit?project_id=${p.id}&project_name=${encodeURIComponent(p.display_name || p.name)}`;

  return (
    <div className={`group relative border-b border-white/10 transition-opacity duration-200 ${hiding ? "opacity-30 pointer-events-none" : ""}`}>
      <button
        type="button"
        onClick={onClick}
        disabled={isHidden}
        className={`w-full text-left px-3 py-2 pr-8 transition-colors ${
          isHidden
            ? "cursor-default"
            : selected
              ? "bg-white/15 border-l-2 border-l-amber-400"
              : "hover:bg-white/10 border-l-2 border-l-transparent"
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          {/* Rating dot */}
          <span className={`shrink-0 h-2 w-2 rounded-full ${isHidden ? "bg-white/20" : dotColor}`} />

          <div className="min-w-0 flex-1">
            {p.project_number && (
              <p className="text-[10px] text-white/50 leading-none mb-0.5">#{p.project_number}</p>
            )}
            <p className={`text-xs font-medium leading-snug truncate ${isHidden ? "text-white/30" : "text-white/90"}`}>
              {p.display_name || p.name}
            </p>
          </div>

          {/* Avg score or hidden label */}
          {isHidden ? (
            <span className="shrink-0 text-[10px] text-white/30 italic">hidden</span>
          ) : p.avg_score !== null ? (
            <span className="shrink-0 text-[10px] font-semibold text-amber-300">
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
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded text-white/40 hover:text-white/80 hover:bg-white/10 leading-none text-sm font-bold"
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

// ── CompanyTab ─────────────────────────────────────────────────────────────────

type ProjectCountResult = { open: number; in_review: number; closed: number; total: number };
type ProjectCountState  = ProjectCountResult | "loading" | "error";

function CompanyTab({
  companies,
  selectedCompany,
  onSelectCompany,
  projects,
  projectsLoading,
  companyStats,
  companyStatsLoading,
  companyDateRange,
  selectedProject,
  inspections,
  onDateRangeChange,
  onRefresh,
  onViewProject,
}: {
  companies: Company[];
  selectedCompany: Company | null;
  onSelectCompany: (c: Company) => void;
  projects: DashboardProject[];
  projectsLoading: boolean;
  companyStats: CompanyProjectStat[];
  companyStatsLoading: boolean;
  companyDateRange: DateRange;
  selectedProject: DashboardProject | null;
  inspections: DashboardInspection[];
  onDateRangeChange: (r: DateRange) => void;
  onRefresh: () => void;
  onViewProject: (p: DashboardProject) => void;
}) {
  const statsMap = new Map(companyStats.map(s => [s.procore_project_id, s]));
  const visibleProjects = projects.filter(p => !p.is_hidden);

  // Accordion state — only one row expanded at a time
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Progressive Procore counts, keyed by project id
  const [projectCounts, setProjectCounts] = useState<Map<number, ProjectCountState>>(new Map());

  // Start background fetch loop whenever companyStats arrives or company changes
  useEffect(() => {
    if (!selectedCompany || companyStats.length === 0) return;
    const companyId = selectedCompany.id;
    let cancelled = false;
    setProjectCounts(new Map()); // reset on new data

    const prjs = projects.filter(p => !p.is_hidden);

    async function fetchAll() {
      for (let i = 0; i < prjs.length; i++) {
        if (cancelled) break;
        const p = prjs[i];
        setProjectCounts(prev => new Map(prev).set(p.id, "loading"));
        try {
          const res  = await fetch(
            `/api/dashboard/project-counts?project_id=${p.id}&company_id=${companyId}`
          );
          if (cancelled) break;
          if (!res.ok) throw new Error("Failed");
          const data: ProjectCountResult = await res.json();
          if (!cancelled) setProjectCounts(prev => new Map(prev).set(p.id, data));
        } catch {
          if (!cancelled) setProjectCounts(prev => new Map(prev).set(p.id, "error"));
        }
        if (i < prjs.length - 1 && !cancelled) {
          await new Promise(r => setTimeout(r, 200));
        }
      }
    }

    fetchAll();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyStats, selectedCompany]);

  // Collapse expanded row when company-stats refreshes
  useEffect(() => { setExpandedId(null); }, [companyStats]);

  const totalReviewed = companyStats.reduce((s, x) => s + x.review_count, 0);
  const reviewedWithScore = companyStats.filter(x => x.avg_score !== null);
  const overallAvg = reviewedWithScore.length > 0
    ? Math.round(reviewedWithScore.reduce((s, x) => s + (x.avg_score ?? 0), 0) / reviewedWithScore.length)
    : null;

  const worstProject = reviewedWithScore.length > 0
    ? reviewedWithScore.reduce((worst, x) =>
        (x.avg_score ?? 999) < (worst.avg_score ?? 999) ? x : worst
      )
    : null;
  const worstProjectName = worstProject
    ? (projects.find(p => p.id === worstProject.procore_project_id)?.display_name ?? "—")
    : "—";

  const DATE_RANGE_LABELS: Record<DateRange, string> = {
    all: "All time", "30d": "Last 30 days", "90d": "Last 90 days", ytd: "This year",
  };

  function companyStatusPill(score: number | null) {
    if (score === null) return <span className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: "var(--hp-warm-100)", color: "var(--hp-text-muted)" }}>No reviews</span>;
    if (score >= 75)    return <span className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: "var(--hp-compliant-bg)", color: "var(--hp-compliant)" }}>On track</span>;
    if (score >= 60)    return <span className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: "var(--hp-minor-bg)", color: "var(--hp-minor)" }}>Attention</span>;
    return              <span className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: "var(--hp-significant-bg)", color: "var(--hp-significant)" }}>Action needed</span>;
  }

  function scoreColor(score: number | null): string {
    if (score === null) return "var(--hp-text-muted)";
    if (score >= 75) return "var(--hp-compliant)";
    if (score >= 60) return "var(--hp-significant)";
    return "var(--hp-critical)";
  }

  // Tiny inline count cell — shows spinner / dash / number
  function CountCell({ state }: { state: ProjectCountState | undefined }) {
    if (!state)              return <span className="text-xs text-gray-300">—</span>;
    if (state === "error")   return <span className="text-xs text-gray-300">—</span>;
    if (state === "loading") return <Spinner className="h-3 w-3 text-gray-300 mx-auto" />;
    return null; // caller renders the value
  }

  function handleExportPdf() {
    if (!selectedCompany) return;
    const html = buildCompanyReportHtml(projects, companyStats, selectedCompany.name, companyDateRange, true);
    const win  = window.open("", "_blank");
    if (!win) { alert("Popup blocked — please allow popups and try again."); return; }
    win.document.write(html);
    win.document.close();
  }

  const loading = projectsLoading || companyStatsLoading;

  return (
    <div className="flex-1 overflow-y-auto" style={{ backgroundColor: "var(--hp-bg)" }}>
      <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Company Overview</h2>
            {selectedCompany && <p className="text-xs text-gray-400 mt-0.5">{selectedCompany.name}</p>}
          </div>
          <div className="flex items-center gap-2">
            {companies.length > 1 && (
              <select
                value={selectedCompany?.id ?? ""}
                onChange={e => {
                  const c = companies.find(x => x.id === Number(e.target.value));
                  if (c) onSelectCompany(c);
                }}
                className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="">— Select company —</option>
                {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            )}
            <button
              type="button"
              onClick={onRefresh}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              {loading
                ? <Spinner className="h-3 w-3 text-gray-400" />
                : <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a8 8 0 0114.93-2.69M20 15a8 8 0 01-14.93 2.69" /></svg>
              }
              Refresh
            </button>
            <button
              type="button"
              onClick={handleExportPdf}
              disabled={loading || visibleProjects.length === 0}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-40 transition-colors"
              style={{ backgroundColor: "var(--hp-warm-800)" }}
            >
              <Download className="h-3.5 w-3.5" />
              Export PDF
            </button>
          </div>
        </div>

        {/* Date range filter */}
        <div className="inline-flex rounded-lg p-0.5 gap-0.5 shadow-sm" style={{ border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-surface)" }}>
          {(["all", "30d", "90d", "ytd"] as DateRange[]).map(range => (
            <button
              key={range}
              type="button"
              onClick={() => onDateRangeChange(range)}
              className="px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
              style={companyDateRange === range
                ? { backgroundColor: "var(--hp-warm-800)", color: "#fff" }
                : { color: "var(--hp-text-muted)" }
              }
            >
              {DATE_RANGE_LABELS[range]}
            </button>
          ))}
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="rounded-xl shadow-sm px-5 py-4" style={{ backgroundColor: "var(--hp-surface)", border: "1px solid var(--hp-border-light)" }}>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--hp-text-muted)" }}>Total Projects</p>
            <p className="text-3xl font-bold" style={{ color: "var(--hp-text-primary)" }}>{visibleProjects.length}</p>
          </div>
          <div className="rounded-xl shadow-sm px-5 py-4" style={{ backgroundColor: "var(--hp-surface)", border: "1px solid var(--hp-border-light)" }}>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--hp-text-muted)" }}>ITPs Reviewed</p>
            <p className="text-3xl font-bold" style={{ color: "var(--hp-text-primary)" }}>{totalReviewed}</p>
          </div>
          <div className="rounded-xl shadow-sm px-5 py-4" style={{ backgroundColor: "var(--hp-surface)", border: "1px solid var(--hp-border-light)" }}>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--hp-text-muted)" }}>Average Score</p>
            <p className="text-3xl font-bold" style={{ color: scoreColor(overallAvg) }}>{overallAvg ?? "—"}</p>
          </div>
          <div className="rounded-xl shadow-sm px-5 py-4" style={{ backgroundColor: "var(--hp-surface)", border: "1px solid var(--hp-border-light)" }}>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--hp-text-muted)" }}>Worst Performing</p>
            <p className="text-3xl font-bold" style={{ color: scoreColor(worstProject?.avg_score ?? null) }}>
              {worstProject?.avg_score ?? "—"}
            </p>
            {worstProject && <p className="text-[10px] text-gray-400 mt-1 truncate">{worstProjectName}</p>}
          </div>
        </div>

        {/* Project breakdown table */}
        {!selectedCompany ? (
          <div className="rounded-xl bg-white border border-gray-200 px-6 py-10 text-center text-sm text-gray-400">
            Select a company to load project data.
          </div>
        ) : loading ? (
          <div className="flex items-center gap-2 px-4 py-8 text-sm text-gray-400">
            <Spinner className="h-4 w-4 text-[var(--hp-text-muted)]" /> Loading…
          </div>
        ) : visibleProjects.length === 0 ? (
          <div className="rounded-xl bg-white border border-gray-200 px-6 py-10 text-center text-sm text-gray-400">
            No projects found.
          </div>
        ) : (
          <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Project</th>
                  <th className="text-center text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-3 py-3 w-20">Open</th>
                  <th className="text-center text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-3 py-3 w-24">In Review</th>
                  <th className="text-center text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-3 py-3 w-20">Closed</th>
                  <th className="text-center text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-3 py-3 w-24">Reviewed</th>
                  <th className="text-center text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-3 py-3 w-28">Avg Score</th>
                  <th className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-3 py-3 w-28">Last Reviewed</th>
                  <th className="text-center text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-3 py-3 w-32">Status</th>
                  <th className="w-8" />
                </tr>
              </thead>
              <tbody>
                {visibleProjects.map(p => {
                  const s        = statsMap.get(p.id);
                  const score    = s?.avg_score ?? null;
                  const counts   = projectCounts.get(p.id);
                  const isExpanded = expandedId === p.id;

                  // Ready-to-close only available for the project whose inspections are loaded
                  const isLoadedProject = selectedProject?.id === p.id && inspections.length > 0;
                  const loadedOpen   = isLoadedProject ? inspections.filter(i => { const st = i.status?.toLowerCase(); return st !== "closed" && st !== "in_review"; }) : null;
                  const unreviewedOpen = loadedOpen?.filter(i => i.review_status === "not_reviewed") ?? null;
                  const readyToClose   = loadedOpen?.filter(i => i.review_status !== "not_reviewed" && (i.override_score ?? i.last_score ?? 0) >= 75) ?? null;

                  const countsReady = counts && counts !== "loading" && counts !== "error" ? counts : null;

                  return [
                    // ── Main row ──
                    <tr
                      key={`row-${p.id}`}
                      onClick={() => setExpandedId(prev => prev === p.id ? null : p.id)}
                      className={`cursor-pointer transition-colors border-b border-gray-100 ${
                        isExpanded ? "bg-amber-50 border-b-0" : "hover:bg-gray-50"
                      }`}
                    >
                      {/* Project name */}
                      <td className="px-4 py-3">
                        <p className="text-sm font-semibold text-[var(--hp-text-primary)]">{p.display_name || p.name}</p>
                        {p.project_number && <p className="text-[10px] text-gray-400">#{p.project_number}</p>}
                      </td>

                      {/* Open */}
                      <td className="px-3 py-3 text-center">
                        {countsReady
                          ? <span className="text-sm font-medium text-gray-700">{countsReady.open}</span>
                          : <CountCell state={counts} />
                        }
                      </td>

                      {/* In Review */}
                      <td className="px-3 py-3 text-center">
                        {countsReady
                          ? <span className="text-sm font-medium text-gray-700">{countsReady.in_review}</span>
                          : <CountCell state={counts} />
                        }
                      </td>

                      {/* Closed */}
                      <td className="px-3 py-3 text-center">
                        {countsReady
                          ? <span className="text-sm font-medium text-gray-700">{countsReady.closed}</span>
                          : <CountCell state={counts} />
                        }
                      </td>

                      {/* Reviewed (from Supabase) */}
                      <td className="px-3 py-3 text-center text-sm font-medium text-gray-700">
                        {s?.review_count ?? 0}
                      </td>

                      {/* Avg Score */}
                      <td className="px-3 py-3 text-center">
                        <span className="text-base font-bold" style={{ color: scoreColor(score) }}>{score ?? "—"}</span>
                      </td>

                      {/* Last Reviewed */}
                      <td className="px-3 py-3 text-xs text-gray-400 whitespace-nowrap">
                        {s?.last_reviewed_at ? fmtDate(s.last_reviewed_at) : "—"}
                      </td>

                      {/* Status pill */}
                      <td className="px-3 py-3 text-center">{companyStatusPill(score)}</td>

                      {/* Chevron */}
                      <td className="px-2 py-3 text-center text-gray-400">
                        <svg
                          className={`h-4 w-4 mx-auto transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </td>
                    </tr>,

                    // ── Expanded detail panel ──
                    ...(isExpanded ? [
                      <tr key={`expand-${p.id}`} className="border-b border-gray-200">
                        <td colSpan={9} className="px-4 pb-4 pt-0 bg-amber-50">
                          <div className="rounded-xl border border-amber-100 bg-white px-5 py-4 shadow-sm">
                            {/* Count grid */}
                            <div className="grid grid-cols-5 gap-4 mb-4">
                              {([
                                { label: "Open",      value: countsReady?.open      ?? null, loading: counts === "loading", color: "text-gray-800" },
                                { label: "In Review", value: countsReady?.in_review ?? null, loading: counts === "loading", color: "text-amber-700" },
                                { label: "Closed",    value: countsReady?.closed    ?? null, loading: counts === "loading", color: "text-gray-800" },
                                { label: "Reviewed",  value: s?.review_count ?? 0,           loading: false,               color: "text-gray-800" },
                                {
                                  label: "Unreviewed",
                                  value: unreviewedOpen !== null ? unreviewedOpen.length : null,
                                  loading: false,
                                  color: (unreviewedOpen?.length ?? 0) > 0 ? "text-amber-600" : "text-gray-400",
                                  sub: unreviewedOpen === null ? "select in ITP tab" : undefined,
                                },
                              ] as { label: string; value: number | null; loading: boolean; color: string; sub?: string }[]).map(card => (
                                <div key={card.label} className="text-center">
                                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">{card.label}</p>
                                  {card.loading
                                    ? <Spinner className="h-4 w-4 text-gray-300 mx-auto" />
                                    : <p className={`text-2xl font-bold ${card.color}`}>{card.value ?? "—"}</p>
                                  }
                                  {card.sub && <p className="text-[9px] text-gray-300 mt-0.5">{card.sub}</p>}
                                </div>
                              ))}
                            </div>

                            {/* Ready to close — only when ITP data loaded */}
                            {readyToClose !== null && readyToClose.length > 0 && (
                              <p className="text-xs text-green-600 font-semibold mb-3">
                                ✓ {readyToClose.length} open ITP{readyToClose.length !== 1 ? "s" : ""} ready to close (score ≥ 75)
                              </p>
                            )}

                            {/* View ITPs button */}
                            <button
                              type="button"
                              onClick={e => { e.stopPropagation(); onViewProject(p); }}
                              className="rounded-lg px-4 py-2 text-xs font-semibold text-white transition-colors"
                              style={{ backgroundColor: "var(--hp-warm-800)" }}
                            >
                              View ITPs →
                            </button>
                          </div>
                        </td>
                      </tr>,
                    ] : []),
                  ];
                })}
              </tbody>
            </table>
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
  companyId,
  projectId,
  onCheck,
  onClick,
}: {
  insp: DashboardInspection;
  selected: boolean;
  checked: boolean;
  bulkItemStatus: BulkItemStatus | null;
  bulkRunning: boolean;
  companyId: number;
  projectId: number;
  onCheck: (e: React.MouseEvent) => void;
  onClick: () => void;
}) {
  const isReset = insp.last_score_band === "reset";
  const displayScore = isReset ? null : (insp.override_score ?? insp.last_score);
  const band = isReset ? null : (insp.last_score_band ?? (displayScore !== null ? scoreBand(displayScore) : null));
  const isClosed = insp.status?.toLowerCase() === "closed";
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const daysOpen = !isClosed && insp.created_at
    ? Math.floor((Date.now() - new Date(insp.created_at).getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const readyToClose = !isClosed && !isReset && (displayScore ?? 0) >= 75;
  const hasInfo = !!(insp.description || insp.location || insp.created_by);

  const dotBg = displayScore === null || insp.review_status === "not_reviewed"
    ? "#D4C4AE"
    : displayScore >= 75 ? "var(--hp-compliant)"
    : displayScore >= 60 ? "var(--hp-minor)"
    : displayScore >= 40 ? "var(--hp-significant)"
    : "var(--hp-critical)";

  const scoreClr = displayScore === null
    ? "var(--hp-text-muted)"
    : displayScore >= 75 ? "var(--hp-compliant)"
    : displayScore >= 60 ? "var(--hp-minor)"
    : displayScore >= 40 ? "var(--hp-significant)"
    : "var(--hp-critical)";

  const pillStyle: React.CSSProperties = !band
    ? { backgroundColor: "#F0E8DE", color: "var(--hp-text-muted)" }
    : band === "compliant"        ? { backgroundColor: "var(--hp-compliant-bg)",    color: "var(--hp-sage-500)" }
    : band === "minor_gaps"       ? { backgroundColor: "var(--hp-minor-bg)",         color: "var(--hp-minor)" }
    : band === "significant_gaps" ? { backgroundColor: "var(--hp-significant-bg)",   color: "var(--hp-significant)" }
    :                               { backgroundColor: "var(--hp-critical-bg)",       color: "var(--hp-critical)" };

  const daysClr = daysOpen !== null && daysOpen > 30
    ? (band === "compliant" || band === "minor_gaps" ? "var(--hp-significant)" : "var(--hp-critical)")
    : "var(--hp-text-muted)";

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "20px 10px 1fr auto auto auto auto auto",
        gap: 10,
        alignItems: "center",
        backgroundColor: selected || checked ? "rgba(196,146,74,0.05)" : "var(--hp-surface)",
        border: `1px solid ${selected ? "var(--hp-warm-300)" : hovered ? "var(--hp-warm-200)" : "var(--hp-border-light)"}`,
        borderRadius: 8,
        padding: "11px 14px",
        marginBottom: 4,
        cursor: "pointer",
        transition: "border-color 150ms, background-color 150ms",
      }}
    >
      {/* Col 1: Checkbox */}
      <div onClick={onCheck} style={{ display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {}}
          disabled={bulkRunning}
          style={{ accentColor: "var(--hp-warm-800)", cursor: bulkRunning ? "not-allowed" : "pointer", width: 13, height: 13 }}
        />
      </div>

      {/* Col 2: Status dot */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: dotBg, flexShrink: 0 }} />
      </div>

      {/* Col 3: ITP name + subtitle */}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--hp-text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {insp.name}
          </span>
          {bulkItemStatus && <BulkStatusBadge status={bulkItemStatus} />}
          {hasInfo && (
            <div style={{ position: "relative", flexShrink: 0 }} onClick={e => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setPopoverOpen(o => !o)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", color: "var(--hp-text-muted)" }}
                aria-label="Show inspection details"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="8" strokeLinecap="round" strokeWidth={3} />
                  <line x1="12" y1="12" x2="12" y2="16" />
                </svg>
              </button>
              {popoverOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setPopoverOpen(false)} />
                  <div className="absolute left-0 top-full mt-1.5 z-50 w-72 rounded-xl border border-gray-200 bg-white shadow-xl p-3 space-y-1.5">
                    {insp.description && <p className="text-xs text-gray-700 leading-relaxed">{insp.description}</p>}
                    {(insp.location || insp.created_by) && (
                      <p className="text-[10px] text-gray-400 leading-relaxed">
                        {insp.location && <span>📍 {insp.location}</span>}
                        {insp.location && insp.created_by && <span className="mx-1">·</span>}
                        {insp.created_by && <span>Created by {insp.created_by}</span>}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 2, fontSize: 11, color: "var(--hp-text-muted)" }}>
          {isClosed
            ? (insp.closed_by ? <span key="cb">Closed by {insp.closed_by}</span> : null)
            : (insp.assignee  ? <span key="as">Assigned to {insp.assignee}</span> : null)}
          {daysOpen !== null && (
            <span style={{ color: daysClr }}>{daysOpen}d open</span>
          )}
        </div>
      </div>

      {/* Col 4: # */}
      <div style={{ fontSize: 12, fontWeight: 500, color: "var(--hp-text-muted)", whiteSpace: "nowrap" }}>
        {insp.inspection_number_of_type != null ? `#${insp.inspection_number_of_type}` : ""}
      </div>

      {/* Col 5: Score */}
      <div style={{ textAlign: "right", whiteSpace: "nowrap", minWidth: 34 }}>
        {insp.review_status === "not_reviewed" || isReset ? (
          <span style={{ fontSize: 13, color: "var(--hp-text-muted)" }}>—</span>
        ) : (
          <>
            <span style={{ fontSize: 18, fontWeight: 500, color: scoreClr }}>{displayScore ?? "—"}</span>
            {insp.override_score !== null && (
              <span style={{ fontSize: 11, color: "var(--hp-text-muted)", textDecoration: "line-through", marginLeft: 4 }}>
                {insp.last_score}
              </span>
            )}
          </>
        )}
      </div>

      {/* Col 6: Rating pill + badges */}
      <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-start" }}>
        <span style={{ ...pillStyle, fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 20, whiteSpace: "nowrap" }}>
          {band ? scoreBandLabel(band) : "Not reviewed"}
        </span>
        {insp.override_score !== null && (
          <span style={{ fontSize: 10, color: "var(--hp-text-muted)", fontWeight: 500 }}>Override</span>
        )}
        {readyToClose && (
          <span style={{ backgroundColor: "var(--hp-sage-100)", color: "var(--hp-sage-500)", fontSize: 10, padding: "2px 7px", borderRadius: 10, fontWeight: 500, whiteSpace: "nowrap" }}>
            Ready to close
          </span>
        )}
      </div>

      {/* Col 7: Status pill */}
      <div>
        <span style={{
          fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 20, whiteSpace: "nowrap",
          ...(isClosed
            ? { backgroundColor: "var(--hp-warm-100)", color: "var(--hp-text-secondary)" }
            : insp.status?.toLowerCase() === "in_review"
              ? { backgroundColor: "rgba(196,146,74,0.15)", color: "var(--hp-significant)" }
              : { backgroundColor: "rgba(106,140,94,0.15)", color: "var(--hp-compliant)" }
          )
        }}>
          {insp.status ?? "—"}
        </span>
      </div>

      {/* Col 8: Reviewed date + Procore link */}
      <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-end", whiteSpace: "nowrap" }}>
        <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>
          {insp.last_reviewed_at ? fmtDate(insp.last_reviewed_at) : "—"}
          {insp.review_status === "changed" && (
            <span style={{ marginLeft: 4, color: "var(--hp-significant)" }}>⚠</span>
          )}
        </span>
        {!bulkRunning && companyId > 0 && projectId > 0 && (
          <a
            href={`https://us02.procore.com/webclients/host/companies/${companyId}/projects/${projectId}/tools/inspections/${insp.id}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ fontSize: 10, color: "var(--hp-text-muted)", display: "flex", alignItems: "center", gap: 3 }}
          >
            <ExternalLink className="h-3 w-3" />
            Procore
          </a>
        )}
      </div>
    </div>
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
      <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-[var(--hp-minor-bg)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--hp-minor)]">
        <Spinner className="h-2.5 w-2.5 text-[var(--hp-minor)]" /> Processing
      </span>
    );
  }
  if (status === "rate_limited") {
    return (
      <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
        <Spinner className="h-2.5 w-2.5 text-amber-500" /> Rate limited — retrying in 15s
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

// ── ActionItemsSection ─────────────────────────────────────────────────────────

function ActionItemsSection({ items }: { items: ActionItem[] }) {
  const [expanded, setExpanded] = useState(false);
  const [checked,  setChecked]  = useState<Set<number>>(new Set());

  function toggle(i: number) {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  }

  const categoryIcon = (c: ActionItem["category"]) => {
    if (c === "evidence")   return <Paperclip    className="h-3 w-3 shrink-0 text-gray-400" />;
    if (c === "signoff")    return <PenLine       className="h-3 w-3 shrink-0 text-gray-400" />;
    if (c === "close")      return <CheckCircle   className="h-3 w-3 shrink-0 text-gray-400" />;
    return                         <AlertTriangle className="h-3 w-3 shrink-0 text-gray-400" />;
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded(v => !v)}
        className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-widest text-[var(--hp-text-primary)] mb-2"
      >
        Action Items
        <ChevronDown className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-150 ${expanded ? "rotate-180" : ""}`} />
      </button>
      {expanded && (
        <div className="space-y-2">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-2 cursor-pointer"
              onClick={() => toggle(i)}
            >
              <input
                type="checkbox"
                checked={checked.has(i)}
                onChange={() => toggle(i)}
                onClick={e => e.stopPropagation()}
                className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-gray-300 accent-amber-600 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    item.priority === "high"   ? "bg-red-100 text-red-600"   :
                    item.priority === "medium" ? "bg-amber-100 text-amber-600" :
                                                "bg-gray-100 text-gray-500"
                  }`}>
                    {item.priority.toUpperCase()}
                  </span>
                  {categoryIcon(item.category)}
                </div>
                <p className={`text-xs leading-snug ${
                  checked.has(i) ? "line-through text-gray-400" : "text-gray-700"
                }`}>
                  {item.action}
                </p>
              </div>
            </div>
          ))}
          <p className="mt-1 text-[10px] text-gray-300 italic">Scratch pad only — checkboxes reset on navigation.</p>
        </div>
      )}
    </div>
  );
}

// ── InspectionPanel ────────────────────────────────────────────────────────────

function InspectionPanel({
  insp,
  companyId,
  projectId,
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
  isAdmin,
  onResetScore,
}: {
  insp: DashboardInspection;
  companyId: number;
  projectId: number;
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
  isAdmin: boolean;
  onResetScore: () => void;
}) {
  const displayScore  = insp.override_score ?? insp.last_score;
  const band          = insp.last_score_band ?? (displayScore !== null ? scoreBand(displayScore) : null);
  const rd            = insp.review_data;
  const hasOverride   = insp.override_score !== null;
  const [descExpanded, setDescExpanded] = useState(false);

  const procoreUrl = companyId > 0 && projectId > 0
    ? `https://us02.procore.com/webclients/host/companies/${companyId}/projects/${projectId}/tools/inspections/${insp.id}`
    : null;

  const isLongDesc = (insp.description?.length ?? 0) > 100;

  return (
    <div className="flex flex-col h-full">

      {/* Panel header */}
      <div className="flex items-start justify-between px-5 py-4 border-b border-gray-200 shrink-0 bg-white">
        <div className="min-w-0 flex-1 pr-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">ITP Detail</p>
          <h3 className="text-sm font-bold text-[var(--hp-text-primary)] leading-snug">{insp.name}</h3>
          <div className="flex items-center gap-3 mt-0.5 flex-wrap">
            {insp.inspection_number_of_type != null && (
              <p className="text-xs text-gray-400">Inspection #{insp.inspection_number_of_type}</p>
            )}
            {procoreUrl && (
              <a
                href={procoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-[var(--hp-minor)] transition-colors"
                title="Open in Procore"
              >
                <ExternalLink className="h-3 w-3" />
                Open in Procore
              </a>
            )}
          </div>
        </div>
        <button onClick={onClose} className="shrink-0 text-gray-400 hover:text-gray-600 p-1 rounded transition-colors">✕</button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

        {/* Description info box */}
        {insp.description && (
          <div className="rounded-lg border border-gray-100 bg-gray-50 px-3.5 py-3">
            <p className={`text-xs text-gray-600 leading-relaxed ${!descExpanded && isLongDesc ? "line-clamp-2" : ""}`}>
              {insp.description}
            </p>
            {(insp.location || insp.created_by) && (
              <p className="mt-1.5 text-[10px] text-gray-400 leading-relaxed">
                {insp.location && <span>📍 {insp.location}</span>}
                {insp.location && insp.created_by && <span className="mx-1">·</span>}
                {insp.created_by && <span>Created by {insp.created_by}</span>}
              </p>
            )}
            {isLongDesc && (
              <button
                type="button"
                onClick={() => setDescExpanded(v => !v)}
                className="mt-1 flex items-center gap-1 text-[10px] font-medium text-gray-400 hover:text-gray-600 transition-colors"
              >
                {descExpanded ? (
                  <>
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                    Show less
                  </>
                ) : (
                  <>
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    Show more
                  </>
                )}
              </button>
            )}
          </div>
        )}

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
                      <span className="text-[10px] rounded-full bg-[rgba(74,111,165,0.15)] text-[var(--hp-minor)] font-semibold px-2 py-0.5">
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
                <p className={`mt-0.5 ${insp.status?.toLowerCase() === "closed" ? "text-gray-400" : "text-[var(--hp-minor)] font-medium"}`}>
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
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--hp-text-primary)] mb-3">Score breakdown</p>
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
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--hp-text-primary)] mb-2">Missing evidence</p>
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

        {/* Action items */}
        {(() => { console.log("[action-items] rd.action_items:", rd?.action_items); return null; })()}
        {rd?.action_items && rd.action_items.length > 0 && (
          <ActionItemsSection items={rd.action_items} />
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onRunReview}
            disabled={reviewRunning}
            className="flex-1 rounded-lg px-3 py-2.5 text-xs font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            style={{ backgroundColor: "var(--hp-warm-800)" }}
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
              className="flex-1 rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors"
              style={{ border: "1px solid var(--hp-warm-300)", backgroundColor: "var(--hp-warm-100)", color: "var(--hp-warm-800)" }}
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
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--hp-text-primary)] mb-3">
            Human Override
          </p>

          {hasOverride && (
            <div className="mb-3 rounded-lg border border-[var(--hp-border)] bg-[var(--hp-warm-100)] px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] rounded-full bg-[var(--hp-warm-200)] text-[var(--hp-text-primary)] font-semibold px-2 py-0.5">
                  Human reviewed
                </span>
                <span className="text-xs text-[var(--hp-text-primary)] font-medium">
                  AI: {insp.last_score} → Override: {insp.override_score}
                </span>
              </div>
              {insp.override_note && (
                <p className="text-xs text-[var(--hp-text-secondary)] mt-1 italic break-words whitespace-pre-wrap">
                  &ldquo;{insp.override_note}&rdquo;
                </p>
              )}
              {insp.override_created_by && (
                <p className="text-[10px] text-[var(--hp-text-muted)] mt-0.5">by {insp.override_created_by}</p>
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

        {/* Reset Score — admin only, only when reviewed */}
        {isAdmin && insp.review_record_id && insp.review_data && (
          <div style={{ padding: "16px 20px 20px", borderTop: "1px solid var(--hp-border)" }}>
            <button
              type="button"
              onClick={onResetScore}
              style={{
                display:        "flex",
                alignItems:     "center",
                gap:            5,
                fontSize:       12,
                color:          "var(--hp-text-muted)",
                background:     "none",
                border:         "none",
                cursor:         "pointer",
                padding:        0,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--hp-critical, #dc2626)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--hp-text-muted)")}
            >
              <RotateCcw size={13} />
              Reset score
            </button>
          </div>
        )}

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
