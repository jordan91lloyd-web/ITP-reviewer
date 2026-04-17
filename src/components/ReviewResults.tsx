"use client";

// ─── ReviewResults ────────────────────────────────────────────────────────
// Displays the structured QA review returned by Claude.
//
// Two on-screen view modes:
//   compact     — sections are collapsible (default)
//   full        — all sections expanded, good for detailed review / export
//
// PDF export always uses the full expanded layout regardless of current mode.
// After the print dialog closes the on-screen mode is restored automatically.

import { useState, useEffect } from "react";
import type { ReviewResult, ScoreBreakdown, CategoryScore, CommercialConfidence } from "@/lib/types";

type ViewMode = "compact" | "full";

interface Props {
  result: ReviewResult;
  onReset: () => void;
}

const UNIDENTIFIED = "Not confidently identified";

// ── QA Status — derived from score + commercial confidence ──
// Answers: "How does this package stand up as a completed QA record?"
// We use commercial_confidence as the primary driver because Claude already
// computed it as a holistic audit readiness judgement. Score is a secondary
// check — a low score always overrides a high confidence rating.
function getQAStatus(result: ReviewResult): "strong" | "acceptable" | "high-risk" {
  const cc = result.commercial_confidence?.rating ?? "medium";
  if (result.total_score >= 85 && cc === "high") return "strong";
  if (result.total_score < 50 || cc === "low") return "high-risk";
  return "acceptable";
}

export default function ReviewResults({ result, onReset }: Props) {
  const h = result.inspection_header;

  // ── View / print mode ────────────────────────────────────────────────────

  const [viewMode, setViewMode] = useState<ViewMode>("compact");
  // printMode forces all sections open for the PDF snapshot
  const [printMode, setPrintMode] = useState(false);
  // printPending triggers window.print() after React re-renders with printMode=true
  const [printPending, setPrintPending] = useState(false);

  const forceOpen = printMode || viewMode === "full";

  useEffect(() => {
    if (!printPending) return;
    window.print();
    setPrintPending(false);
  }, [printPending]);

  const handlePrint = () => {
    setPrintMode(true);
    setPrintPending(true);
    window.onafterprint = () => {
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

        {/* ── View mode toggle ── */}
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
          {viewMode === "full" && (
            <span className="text-xs text-gray-400 italic">All sections expanded</span>
          )}
          {viewMode === "compact" && (
            <span className="text-xs text-gray-400 italic">PDF export always includes full report</span>
          )}
        </div>

        {/* ── Inspection Header ── */}
        <ResultCard
          title="Inspection Header"
          accent="blue"
          collapsible
          defaultOpen
          forceOpen={forceOpen}
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

        {/* ── Score · Package · Confidence — always visible ── */}
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

        {/* ── Commercial Confidence ── */}
        <CommercialConfidenceCard cc={result.commercial_confidence} />

        {/* ── Summary ── */}
        <ResultCard title="Summary" collapsible defaultOpen forceOpen={forceOpen}>
          <p className="text-sm text-gray-700 leading-relaxed">{result.executive_summary}</p>
        </ResultCard>

        {/* ── Score breakdown ── */}
        <ScoreBreakdownCard breakdown={result.score_breakdown} forceOpen={forceOpen} />

        {/* ── Missing evidence ── */}
        {result.missing_evidence.length > 0 ? (
          <ResultCard
            title="Missing Evidence"
            subtitle="Items that appear to be absent — review status before acting"
            accent="red"
            collapsible
            defaultOpen={false}
            forceOpen={forceOpen}
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
            defaultOpen={false}
            forceOpen={forceOpen}
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
            defaultOpen={false}
            forceOpen={forceOpen}
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
            defaultOpen={false}
            forceOpen={forceOpen}
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
            defaultOpen={false}
            forceOpen={forceOpen}
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

        {/* ── Footer ── */}
        <div className="pt-2 text-center print:hidden">
          <button
            onClick={onReset}
            className="rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Review a different bundle
          </button>
        </div>

      </div>
    </>
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
  forceOpen,
}: {
  breakdown: ScoreBreakdown;
  forceOpen?: boolean;
}) {
  return (
    <ResultCard
      title="Score Breakdown"
      subtitle="D1 Engineer verification · D2 Technical testing · D3 ITP completeness · D4 Material traceability · D5 Physical evidence"
      accent="blue"
      collapsible
      defaultOpen={false}
      forceOpen={forceOpen}
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
// SVG circular gauge for the score card. Clean and professional.

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
      {/* Track */}
      <circle cx="48" cy="48" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
      {/* Progress arc */}
      <circle
        cx="48" cy="48" r={r} fill="none"
        stroke={strokeColour} strokeWidth="8"
        strokeDasharray={`${filled} ${circ - filled}`}
        strokeLinecap="round"
        transform="rotate(-90 48 48)"
      />
      {/* Score number */}
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
// collapsible=true  forceOpen=false → toggleable, state tracked internally
// collapsible=true  forceOpen=true  → static card (all content shown, no toggle)
// collapsible=false                 → static card (original behaviour)

function ResultCard({
  title,
  subtitle,
  accent,
  collapsible = false,
  defaultOpen = true,
  forceOpen = false,
  children,
}: {
  title: string;
  subtitle?: string;
  accent?: "red" | "yellow" | "blue" | "green";
  collapsible?: boolean;
  defaultOpen?: boolean;
  forceOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const border =
    accent === "red"    ? "border-l-red-400" :
    accent === "yellow" ? "border-l-amber-400" :
    accent === "blue"   ? "border-l-blue-400" :
    accent === "green"  ? "border-l-green-400" :
                          "border-l-gray-200";

  // Static card — used for non-collapsible sections and when forceOpen overrides
  if (!collapsible || forceOpen) {
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
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left gap-3"
      >
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>}
        </div>
        <span className="text-xs font-medium text-gray-400 shrink-0 select-none">
          {open ? "▾ Hide" : "▸ Show"}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4 pt-3 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
}
