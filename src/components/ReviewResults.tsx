"use client";

// ─── ReviewResults ────────────────────────────────────────────────────────
// Displays the structured QA review returned by Claude.
//
// All major sections are independently collapsible. Section open/closed
// state is held in a single `sections` object at the top level so that
// "Collapse All / Expand All" can work with one setState call, and so the
// print handler can save/restore the full state around window.print().
//
// PDF export: before calling window.print() we expand every section and set
// printMode=true (which renders static, non-togglable cards so the browser
// has a full flat DOM to paginate). After the print dialog closes we restore
// the previous collapse state.

import { useState, useEffect } from "react";
import type { ReviewResult, ScoreBreakdown, CategoryScore, CommercialConfidence, SkippedFile } from "@/lib/types";

// ── Section keys ─────────────────────────────────────────────────────────

type SectionKey =
  | "inspection_header"
  | "qa_status"
  | "scores"
  | "commercial_confidence"
  | "summary"
  | "score_breakdown"
  | "missing_evidence"
  | "key_issues"
  | "next_actions"
  | "document_observations"
  | "skipped_files";

const DEFAULT_SECTIONS: Record<SectionKey, boolean> = {
  inspection_header:     true,
  qa_status:             true,
  scores:                true,
  commercial_confidence: true,
  summary:               true,
  score_breakdown:       false,
  missing_evidence:      false,
  key_issues:            false,
  next_actions:          false,
  document_observations: false,
  skipped_files:         false,
};

const SECTION_KEYS = Object.keys(DEFAULT_SECTIONS) as SectionKey[];

const ALL_OPEN = Object.fromEntries(SECTION_KEYS.map(k => [k, true])) as Record<SectionKey, boolean>;
const ALL_CLOSED = Object.fromEntries(SECTION_KEYS.map(k => [k, false])) as Record<SectionKey, boolean>;

// ── Props & helpers ───────────────────────────────────────────────────────

interface Props {
  result: ReviewResult;
  onReset: () => void;
  skippedFiles?: SkippedFile[];
}

const UNIDENTIFIED = "Not confidently identified";

function getQAStatus(result: ReviewResult): "strong" | "acceptable" | "high-risk" {
  const cc = result.commercial_confidence?.rating ?? "medium";
  if (result.total_score >= 85 && cc === "high") return "strong";
  if (result.total_score < 50 || cc === "low") return "high-risk";
  return "acceptable";
}

// ── Main component ────────────────────────────────────────────────────────

export default function ReviewResults({ result, onReset, skippedFiles }: Props) {
  const h = result.inspection_header;

  // ── View / collapse state ────────────────────────────────────────────────
  const [viewMode, setViewMode] = useState<"compact" | "full">("compact");
  const [sections, setSections] = useState<Record<SectionKey, boolean>>(DEFAULT_SECTIONS);
  const [printMode, setPrintMode] = useState(false);
  const [printPending, setPrintPending] = useState(false);

  // In full view or print mode every section is forced open regardless of sections state
  const forced = printMode || viewMode === "full";

  const toggle = (key: SectionKey) => {
    if (forced) return;
    setSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allExpanded = SECTION_KEYS.every(k => sections[k]);

  // ── Print ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!printPending) return;
    window.print();
    setPrintPending(false);
  }, [printPending]);

  const handlePrint = () => {
    const savedSections = { ...sections };
    // Expand all sections so the full DOM is rendered before window.print()
    setSections(ALL_OPEN);
    setPrintMode(true);
    setPrintPending(true);
    window.onafterprint = () => {
      setSections(savedSections);
      setPrintMode(false);
      window.onafterprint = null;
    };
  };

  // ── QA Status ────────────────────────────────────────────────────────────
  const qaStatus = getQAStatus(result);

  // ── Colour helpers ───────────────────────────────────────────────────────
  const scoreColour =
    result.total_score >= 80 ? "text-green-600" :
    result.total_score >= 55 ? "text-yellow-500" :
                               "text-red-500";

  const scoreBgColour =
    result.total_score >= 80 ? "bg-green-50 border-green-200" :
    result.total_score >= 55 ? "bg-yellow-50 border-yellow-200" :
                               "bg-red-50 border-red-200";

  const assessmentStyle: Record<string, string> = {
    "compliant":         "bg-green-100 text-green-800",
    "minor_gaps":        "bg-yellow-100 text-yellow-800",
    "significant_gaps":  "bg-orange-100 text-orange-800",
    "critical_risk":     "bg-red-100 text-red-800",
  };

  const assessmentLabel: Record<string, string> = {
    "compliant":         "Compliant",
    "minor_gaps":        "Minor gaps",
    "significant_gaps":  "Significant gaps",
    "critical_risk":     "Critical risk",
  };

  const confidenceColour =
    result.confidence === "high"   ? "text-green-600" :
    result.confidence === "medium" ? "text-yellow-600" :
                                     "text-red-500";

  const scoreLabel: Record<string, string> = {
    compliant:         "Compliant — strong evidence",
    minor_gaps:        "Minor gaps — mostly complete",
    significant_gaps:  "Significant gaps present",
    critical_risk:     "Critical risk — major gaps",
  };

  const statusBadge = (status: string) => {
    if (status === "Missing")
      return "bg-red-100 text-red-700 border border-red-200";
    if (status === "Substantially complete")
      return "bg-amber-100 text-amber-700 border border-amber-200";
    return "bg-gray-100 text-gray-600 border border-gray-200";
  };

  const extractionConfidenceColour =
    h.extraction_confidence === "high"   ? "text-green-600" :
    h.extraction_confidence === "medium" ? "text-yellow-500" :
                                           "text-gray-400";

  const today = new Date().toLocaleDateString("en-AU", {
    day: "2-digit", month: "long", year: "numeric",
  });

  const field = (value: string | null) =>
    value
      ? <span className="font-medium text-gray-900">{value}</span>
      : <span className="text-gray-400 italic">{UNIDENTIFIED}</span>;

  return (
    <>
      {/* ── Print-only header ── */}
      <div className="hidden print:block mb-6 border-b border-gray-300 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">QA Report — Fleek Constructions</p>
            <h1 className="text-xl font-bold text-gray-900">
              {h.project_name ?? "Project not identified"}
            </h1>
            <p className="text-sm text-gray-600">
              {[h.itp_number, h.itp_name].filter(Boolean).join(" — ") || "ITP details not identified"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Generated {today}</p>
            {h.closed_by && <p className="text-xs text-gray-400 mt-0.5">Closed by {h.closed_by}</p>}
          </div>
        </div>
      </div>

      <div className="space-y-4">

        {/* ── Top bar: title + action buttons ── */}
        <div className="flex items-start justify-between gap-4 print:hidden">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Review complete</h2>
            <p className="mt-0.5 text-sm text-gray-500">QA Report</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="rounded-lg border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 active:bg-blue-200 transition-colors"
            >
              Download Report PDF
            </button>
            <button
              onClick={onReset}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              ← New review
            </button>
          </div>
        </div>

        {/* ── View mode toggle + Collapse All / Expand All ── */}
        <div className="flex items-center gap-3 print:hidden">
          <span className="text-xs text-gray-400">View as:</span>
          <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5 gap-0.5">
            <button
              type="button"
              onClick={() => setViewMode("compact")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === "compact"
                  ? "bg-white text-gray-900 shadow-sm border border-gray-100"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Compact
            </button>
            <button
              type="button"
              onClick={() => setViewMode("full")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === "full"
                  ? "bg-white text-gray-900 shadow-sm border border-gray-100"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Full Report
            </button>
          </div>

          {/* Collapse / Expand All — only meaningful in compact mode */}
          {viewMode === "compact" && (
            <button
              type="button"
              onClick={allExpanded ? () => setSections(ALL_CLOSED) : () => setSections(ALL_OPEN)}
              className="ml-auto text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
            >
              {allExpanded ? "Collapse All" : "Expand All"}
            </button>
          )}
        </div>

        {/* ── Inspection Header ── */}
        <ResultCard
          title="Inspection Header"
          accent="blue"
          collapsible
          open={sections.inspection_header}
          onToggle={() => toggle("inspection_header")}
          forced={forced}
        >
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            <HeaderField label="Project No."           value={field(h.project_number)} />
            <HeaderField label="Project Name"          value={field(h.project_name)} />
            <HeaderField label="ITP Name"              value={field(h.itp_name)} />
            <HeaderField label="Closed By"             value={field(h.closed_by ?? null)} />
            <HeaderField
              label="Inspection No. of Type"
              value={field(h.inspection_number_of_type != null ? String(h.inspection_number_of_type) : null)}
            />
            <HeaderField
              label="Tier"
              value={field(h.tier ? (h.tier_subgroup ? `${h.tier} — ${h.tier_subgroup}` : h.tier) : null)}
            />
          </dl>
          <p className="mt-3 text-xs text-gray-400 print:hidden">
            Extraction confidence:{" "}
            <span className={`font-semibold capitalize ${extractionConfidenceColour}`}>
              {h.extraction_confidence}
            </span>
          </p>
        </ResultCard>

        {/* ── QA Status banner ── */}
        <SectionShell
          label="QA Status"
          open={sections.qa_status}
          onToggle={() => toggle("qa_status")}
          forced={forced}
        >
          <div className={`rounded-xl border px-5 py-4 flex items-center gap-3 ${
            qaStatus === "strong"     ? "bg-green-50 border-green-200" :
            qaStatus === "acceptable" ? "bg-amber-50 border-amber-200" :
                                        "bg-red-50 border-red-200"
          }`}>
            <span className={`flex h-3 w-3 rounded-full shrink-0 ${
              qaStatus === "strong"     ? "bg-green-500" :
              qaStatus === "acceptable" ? "bg-amber-400" :
                                          "bg-red-500"
            }`} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-0.5">QA Status</p>
              <p className={`text-lg font-bold ${
                qaStatus === "strong"     ? "text-green-700" :
                qaStatus === "acceptable" ? "text-amber-700" :
                                            "text-red-700"
              }`}>
                {qaStatus === "strong"     ? "Strong package" :
                 qaStatus === "acceptable" ? "Acceptable with gaps" :
                                             "High risk / incomplete"}
              </p>
            </div>
          </div>
        </SectionShell>

        {/* ── Score · Package · Confidence ── */}
        <SectionShell
          label="Scores"
          open={sections.scores}
          onToggle={() => toggle("scores")}
          forced={forced}
        >
          <div className="grid grid-cols-3 gap-3">
            <div className={`rounded-xl border p-5 text-center ${scoreBgColour}`}>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Score</p>
              <ScoreRing score={result.total_score} />
              <p className="mt-1 text-xs text-gray-400">{result.achieved_points}/{result.applicable_points} pts</p>
              <p className={`mt-2 text-xs font-medium ${scoreColour}`}>{scoreLabel[result.score_band] ?? result.score_band}</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Package</p>
              <span
                className={`inline-block rounded-full px-3 py-1.5 text-xs font-bold leading-none ${
                  assessmentStyle[result.package_assessment] ?? "bg-gray-100 text-gray-700"
                }`}
              >
                {assessmentLabel[result.package_assessment] ?? result.package_assessment}
              </span>
              <p className="mt-3 text-xs text-gray-400 leading-snug">Evidence quality rating</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Confidence</p>
              <p className={`text-2xl font-bold capitalize ${confidenceColour}`}>{result.confidence}</p>
              <p className="mt-2 text-xs text-gray-400 leading-snug">
                How certain Claude is about this assessment
              </p>
            </div>
          </div>
        </SectionShell>

        {/* ── Commercial Confidence ── */}
        <SectionShell
          label="Commercial Confidence"
          open={sections.commercial_confidence}
          onToggle={() => toggle("commercial_confidence")}
          forced={forced}
        >
          <CommercialConfidenceCard cc={result.commercial_confidence} />
        </SectionShell>

        {/* ── Summary ── */}
        <ResultCard
          title="Summary"
          collapsible
          open={sections.summary}
          onToggle={() => toggle("summary")}
          forced={forced}
        >
          <p className="text-sm text-gray-700 leading-relaxed">{result.executive_summary}</p>
        </ResultCard>

        {/* ── Score breakdown ── */}
        <ScoreBreakdownCard
          breakdown={result.score_breakdown}
          open={sections.score_breakdown}
          onToggle={() => toggle("score_breakdown")}
          forced={forced}
        />

        {/* ── Missing evidence ── */}
        {result.missing_evidence.length > 0 ? (
          <ResultCard
            title="Missing Evidence"
            subtitle="Items that appear to be absent — review status before acting"
            accent="red"
            collapsible
            open={sections.missing_evidence}
            onToggle={() => toggle("missing_evidence")}
            forced={forced}
          >
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-2 pr-4 w-8">#</th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-2 pr-4">Evidence type</th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-2 pr-4">Reason</th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {result.missing_evidence.map((item) => (
                    <tr key={item.item} className="align-top">
                      <td className="py-2.5 pr-4 text-gray-400 font-mono text-xs pt-3">{item.item}</td>
                      <td className="py-2.5 pr-4 font-medium text-gray-800">{item.evidence_type}</td>
                      <td className="py-2.5 pr-4 text-gray-600 leading-snug">{item.reason}</td>
                      <td className="py-2.5">
                        <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${statusBadge(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ResultCard>
        ) : (
          <ResultCard
            title="Missing Evidence"
            accent="green"
            collapsible
            open={sections.missing_evidence}
            onToggle={() => toggle("missing_evidence")}
            forced={forced}
          >
            <p className="text-sm text-green-700">No significant missing evidence identified.</p>
          </ResultCard>
        )}

        {/* ── Key issues ── */}
        {result.key_issues.length > 0 && (
          <ResultCard
            title="Key Issues"
            subtitle="Issues and inconsistencies found in the bundle"
            accent="yellow"
            collapsible
            open={sections.key_issues}
            onToggle={() => toggle("key_issues")}
            forced={forced}
          >
            <div className="space-y-3">
              {result.key_issues.map((issue) => (
                <div key={issue.item} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                    {issue.item}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 leading-snug">{issue.title}</p>
                    <p className="text-sm text-gray-600 leading-snug mt-0.5">{issue.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </ResultCard>
        )}

        {/* ── Recommended next actions ── */}
        {result.next_actions.length > 0 && (
          <ResultCard
            title="Next Actions"
            subtitle="Steps to close evidence gaps and improve audit readiness"
            accent="blue"
            collapsible
            open={sections.next_actions}
            onToggle={() => toggle("next_actions")}
            forced={forced}
          >
            <ol className="space-y-2">
              {result.next_actions.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                    {i + 1}
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ol>
          </ResultCard>
        )}

        {/* ── Document observations ── */}
        {result.document_observations.length > 0 && (
          <ResultCard
            title="Document Observations"
            subtitle="Claude's notes on each file in the bundle"
            collapsible
            open={sections.document_observations}
            onToggle={() => toggle("document_observations")}
            forced={forced}
          >
            <div className="space-y-3">
              {result.document_observations.map((obs, i) => (
                <div key={i} className="rounded-lg bg-gray-50 border border-gray-100 px-4 py-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    {obs.filename}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">{obs.observation}</p>
                </div>
              ))}
            </div>
          </ResultCard>
        )}

        {/* ── Skipped files ── */}
        {skippedFiles && skippedFiles.length > 0 && (
          <ResultCard
            title={`${skippedFiles.length} file${skippedFiles.length !== 1 ? "s" : ""} skipped`}
            subtitle="Files excluded from this review — not sent to Claude"
            accent="yellow"
            collapsible
            open={sections.skipped_files}
            onToggle={() => toggle("skipped_files")}
            forced={forced}
          >
            <div className="space-y-1.5">
              {skippedFiles.map((f, i) => (
                <div key={i} className="flex items-start justify-between gap-4 rounded-lg bg-gray-50 border border-gray-100 px-3 py-2.5">
                  <p className="text-xs font-medium text-gray-700 min-w-0 break-all">{f.filename}</p>
                  <p className="text-xs text-gray-500 whitespace-nowrap shrink-0">{f.reason}</p>
                </div>
              ))}
            </div>
          </ResultCard>
        )}

        {/* ── Footer ── */}
        <div className="pt-2 flex flex-col items-center gap-2 print:items-start">
          {result.scoring_version_label && (
            <p className="text-[11px] text-gray-400">
              Scored using: <span className="font-medium">{result.scoring_version_label}</span>
            </p>
          )}
          <button
            onClick={onReset}
            className="rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors print:hidden"
          >
            Review a different bundle
          </button>
        </div>

      </div>
    </>
  );
}

// ─── SectionShell ─────────────────────────────────────────────────────────
// Thin collapsible wrapper for non-card sections (QA Status banner, scores
// grid, CommercialConfidence). Shows a small labelled header row with a
// chevron; content appears below when open.

function SectionShell({
  label,
  open,
  onToggle,
  forced = false,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  forced?: boolean;
  children: React.ReactNode;
}) {
  const isOpen = forced || open;
  return (
    <div>
      <button
        type="button"
        onClick={forced ? undefined : onToggle}
        className="w-full flex items-center justify-between mb-1.5 px-0.5 py-0.5 print:hidden"
        aria-expanded={isOpen}
      >
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">{label}</span>
        <span className="text-gray-400 text-sm leading-none select-none">{isOpen ? "▾" : "▸"}</span>
      </button>
      <div data-section-content className={isOpen ? "" : "hidden"}>
        {children}
      </div>
    </div>
  );
}

// ─── CommercialConfidenceCard ─────────────────────────────────────────────

function CommercialConfidenceCard({ cc }: { cc: CommercialConfidence | undefined }) {
  const safe: CommercialConfidence = cc ?? { rating: "medium", reason: "Commercial confidence not returned." };
  const colour =
    safe.rating === "high"   ? "text-green-700" :
    safe.rating === "medium" ? "text-amber-600" :
                               "text-red-600";

  const bg =
    safe.rating === "high"   ? "bg-green-50 border-green-200" :
    safe.rating === "medium" ? "bg-amber-50 border-amber-200" :
                               "bg-red-50 border-red-200";

  const label =
    safe.rating === "high"   ? "Low audit risk" :
    safe.rating === "medium" ? "Moderate audit risk" :
                               "High audit risk";

  return (
    <div className={`rounded-xl border px-5 py-4 ${bg}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">
            Commercial Confidence
          </p>
          <p className={`text-lg font-bold ${colour}`}>{label}</p>
          <p className="text-xs text-gray-500 mt-0.5">Audit readiness based on available evidence</p>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed max-w-prose text-right">{safe.reason}</p>
      </div>
    </div>
  );
}

// ─── ScoreBreakdownCard ───────────────────────────────────────────────────

function CategoryBar({ label, cat, bordered }: { label: string; cat: CategoryScore; bordered?: boolean }) {
  const pct = cat.applicable_points > 0
    ? Math.round((cat.achieved_points / cat.applicable_points) * 100)
    : null;
  return (
    <div className={bordered ? "pb-4 border-b border-gray-100" : ""}>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-xs font-semibold text-gray-700">{label}</span>
        <span className="text-xs text-gray-400 tabular-nums">
          {cat.achieved_points}/{cat.applicable_points} pts
          {pct !== null ? ` · ${pct}%` : " · N/A"}
        </span>
      </div>
      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
        {pct !== null && (
          <div
            className={`h-full rounded-full transition-all ${pct >= 80 ? "bg-green-400" : pct >= 55 ? "bg-amber-400" : "bg-red-400"}`}
            style={{ width: `${pct}%` }}
          />
        )}
      </div>
    </div>
  );
}

function ScoreBreakdownCard({
  breakdown,
  open,
  onToggle,
  forced,
}: {
  breakdown: ScoreBreakdown;
  open: boolean;
  onToggle: () => void;
  forced?: boolean;
}) {
  return (
    <ResultCard
      title="Score Breakdown"
      subtitle="D1 Engineer verification · D2 Technical testing · D3 ITP completeness · D4 Material traceability · D5 Physical evidence"
      accent="blue"
      collapsible
      open={open}
      onToggle={onToggle}
      forced={forced}
    >
      {/* Point totals */}
      <div className="flex gap-4 mb-4">
        <div className="rounded-lg bg-gray-50 border border-gray-100 px-4 py-3 flex-1 text-center">
          <p className="text-xs text-gray-400 mb-0.5">Achieved</p>
          <p className="text-xl font-bold text-gray-800">{breakdown.category_scores.D1_engineer_verification.achieved_points + breakdown.category_scores.D2_technical_testing.achieved_points + breakdown.category_scores.D3_itp_form_completeness.achieved_points + breakdown.category_scores.D4_material_traceability.achieved_points + breakdown.category_scores.D5_physical_evidence.achieved_points}</p>
          <p className="text-xs text-gray-400">points</p>
        </div>
        <div className="rounded-lg bg-gray-50 border border-gray-100 px-4 py-3 flex-1 text-center">
          <p className="text-xs text-gray-400 mb-0.5">Applicable</p>
          <p className="text-xl font-bold text-gray-800">{breakdown.category_scores.D1_engineer_verification.applicable_points + breakdown.category_scores.D2_technical_testing.applicable_points + breakdown.category_scores.D3_itp_form_completeness.applicable_points + breakdown.category_scores.D4_material_traceability.applicable_points + breakdown.category_scores.D5_physical_evidence.applicable_points}</p>
          <p className="text-xs text-gray-400">points</p>
        </div>
      </div>

      {/* Category bars */}
      <div className="space-y-4 mb-5">
        <CategoryBar label="D1 — Engineer and inspector verification" cat={breakdown.category_scores.D1_engineer_verification} bordered />
        <CategoryBar label="D2 — Technical testing evidence" cat={breakdown.category_scores.D2_technical_testing} bordered />
        <CategoryBar label="D3 — ITP form and subcontractor ITP completeness" cat={breakdown.category_scores.D3_itp_form_completeness} bordered />
        <CategoryBar label="D4 — Material traceability" cat={breakdown.category_scores.D4_material_traceability} bordered />
        <CategoryBar label="D5 — Physical evidence record" cat={breakdown.category_scores.D5_physical_evidence} />
      </div>

      {/* Scoring explanation */}
      <p className="text-sm text-gray-700 leading-relaxed mb-4">{breakdown.scoring_explanation}</p>

      {/* Three columns: boosted / reduced / missing */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {breakdown.strong_contributors.length > 0 && (
          <div className="rounded-lg bg-green-50 border border-green-100 px-3 py-3">
            <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">Boosted the score</p>
            <ul className="space-y-1">
              {breakdown.strong_contributors.map((item, i) => (
                <li key={i} className="text-xs text-green-800 leading-snug flex gap-1.5">
                  <span className="mt-0.5 shrink-0 text-green-500">✓</span>{item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {breakdown.score_reductions.length > 0 && (
          <div className="rounded-lg bg-amber-50 border border-amber-100 px-3 py-3">
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">Reduced the score</p>
            <ul className="space-y-1">
              {breakdown.score_reductions.map((item, i) => (
                <li key={i} className="text-xs text-amber-800 leading-snug flex gap-1.5">
                  <span className="mt-0.5 shrink-0 text-amber-500">−</span>{item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {breakdown.genuinely_missing.length > 0 && (
          <div className="rounded-lg bg-red-50 border border-red-100 px-3 py-3">
            <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-2">Genuinely missing</p>
            <ul className="space-y-1">
              {breakdown.genuinely_missing.map((item, i) => (
                <li key={i} className="text-xs text-red-800 leading-snug flex gap-1.5">
                  <span className="mt-0.5 shrink-0 text-red-500">✗</span>{item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Excluded N/A items */}
      {breakdown.excluded_as_not_applicable.length > 0 && (
        <div className="mt-3 rounded-lg bg-gray-50 border border-gray-100 px-3 py-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Excluded as not applicable</p>
          <div className="flex flex-wrap gap-1.5">
            {breakdown.excluded_as_not_applicable.map((item, i) => (
              <span key={i} className="inline-block rounded-full bg-gray-200 text-gray-600 text-xs px-2.5 py-0.5">{item}</span>
            ))}
          </div>
        </div>
      )}
    </ResultCard>
  );
}

// ─── ScoreRing ────────────────────────────────────────────────────────────

function ScoreRing({ score }: { score: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const filled = Math.min(score / 100, 1) * circ;
  const strokeColour =
    score >= 80 ? "#16a34a" :
    score >= 55 ? "#d97706" :
                  "#dc2626";
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" className="mx-auto">
      <circle cx="48" cy="48" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
      <circle
        cx="48" cy="48" r={r} fill="none"
        stroke={strokeColour} strokeWidth="8"
        strokeDasharray={`${filled} ${circ - filled}`}
        strokeLinecap="round"
        transform="rotate(-90 48 48)"
      />
      <text
        x="48" y="54"
        textAnchor="middle"
        fontSize="24" fontWeight="bold"
        fill={strokeColour}
        fontFamily="inherit"
      >
        {score}
      </text>
    </svg>
  );
}

// ─── HeaderField ──────────────────────────────────────────────────────────

function HeaderField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs text-gray-400 mb-0.5">{label}</dt>
      <dd className="text-sm">{value}</dd>
    </div>
  );
}

// ─── ResultCard ───────────────────────────────────────────────────────────
// Fully controlled when `open` + `onToggle` are provided.
// Falls back to internal useState when neither is provided (legacy usage).
// `forced=true` renders as a static non-togglable card (print / full mode).

function ResultCard({
  title,
  subtitle,
  accent,
  collapsible = false,
  defaultOpen = true,
  open: controlledOpen,
  onToggle: controlledToggle,
  forced = false,
  children,
}: {
  title: string;
  subtitle?: string;
  accent?: "red" | "yellow" | "blue" | "green";
  collapsible?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onToggle?: () => void;
  forced?: boolean;
  children: React.ReactNode;
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = forced ? true : isControlled ? controlledOpen : internalOpen;
  const handleToggle = () => {
    if (forced) return;
    if (isControlled && controlledToggle) {
      controlledToggle();
    } else {
      setInternalOpen(o => !o);
    }
  };

  const border =
    accent === "red"    ? "border-l-red-400" :
    accent === "yellow" ? "border-l-amber-400" :
    accent === "blue"   ? "border-l-blue-400" :
    accent === "green"  ? "border-l-green-400" :
                          "border-l-gray-200";

  // Non-collapsible or forced-open → static card, no toggle chrome
  if (!collapsible || forced) {
    return (
      <div className={`rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm border-l-4 ${border}`}>
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>}
        </div>
        {children}
      </div>
    );
  }

  // Collapsible card
  return (
    <div className={`rounded-xl border border-gray-200 bg-white shadow-sm border-l-4 ${border}`}>
      <button
        type="button"
        onClick={handleToggle}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left gap-3"
        aria-expanded={isOpen}
      >
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>}
        </div>
        <span className="text-gray-400 text-sm shrink-0 select-none print:hidden">
          {isOpen ? "▾" : "▸"}
        </span>
      </button>
      <div
        data-section-content
        className={isOpen ? "px-5 pb-4 pt-3 border-t border-gray-100" : "hidden"}
      >
        {children}
      </div>
    </div>
  );
}
