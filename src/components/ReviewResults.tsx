"use client";

// ─── ReviewResults ────────────────────────────────────────────────────────
// Displays the structured review returned by Claude.
//
// The Inspection Header section (top of page) shows the package identity
// fields that Claude extracted automatically from the uploaded documents.
// Everything below that is the review itself.

import type { ReviewResult } from "@/lib/types";

interface Props {
  result: ReviewResult;
  onReset: () => void;
}

const UNIDENTIFIED = "Not confidently identified";

export default function ReviewResults({ result, onReset }: Props) {
  const h = result.inspection_header;

  // ── Colour helpers ───────────────────────────────────────────────────────

  const scoreColour =
    result.score >= 80 ? "text-green-600" :
    result.score >= 50 ? "text-yellow-500" :
                         "text-red-500";

  const scoreBgColour =
    result.score >= 80 ? "bg-green-50 border-green-200" :
    result.score >= 50 ? "bg-yellow-50 border-yellow-200" :
                         "bg-red-50 border-red-200";

  const assessmentStyle: Record<string, string> = {
    "complete":        "bg-green-100 text-green-800",
    "mostly complete": "bg-yellow-100 text-yellow-800",
    "incomplete":      "bg-red-100 text-red-800",
  };

  const confidenceColour =
    result.confidence === "high"   ? "text-green-600" :
    result.confidence === "medium" ? "text-yellow-600" :
                                     "text-red-500";

  const scoreLabel =
    result.score >= 90 ? "Complete and well-evidenced" :
    result.score >= 70 ? "Mostly complete — minor gaps" :
    result.score >= 50 ? "Significant gaps present" :
    result.score >= 30 ? "Major deficiencies found" :
                         "Critically incomplete";

  const statusBadge = (status: string) => {
    if (status === "Missing")
      return "bg-red-100 text-red-700 border border-red-200";
    if (status === "Possibly covered elsewhere")
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

  // Helper: render a header field value or a "not identified" placeholder
  const field = (value: string | null) =>
    value
      ? <span className="font-medium text-gray-900">{value}</span>
      : <span className="text-gray-400 italic">{UNIDENTIFIED}</span>;

  return (
    <>
      {/* ── Print-only header ── */}
      <div className="hidden print:block mb-6 border-b border-gray-300 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">ITP Package Review</p>
        <h1 className="text-xl font-bold text-gray-900">
          {h.project_name ?? "Project not identified"}
        </h1>
        <p className="text-sm text-gray-600">
          {[h.itp_number, h.itp_name].filter(Boolean).join(" — ") || "ITP details not identified"}
        </p>
        <p className="text-xs text-gray-400 mt-1">Generated {today}</p>
      </div>

      <div className="space-y-5">

        {/* ── Header bar ── */}
        <div className="flex items-start justify-between gap-4 print:hidden">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Review complete</h2>
            <p className="mt-0.5 text-sm text-gray-500">ITP Package Review</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => window.print()}
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

        {/* ── Inspection Header ── */}
        <div className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm border-l-4 border-l-blue-400">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Inspection Header</h3>
              <p className="mt-0.5 text-xs text-gray-400">
                Extracted automatically from the uploaded documents
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Extraction confidence</p>
              <p className={`text-sm font-semibold capitalize ${extractionConfidenceColour}`}>
                {h.extraction_confidence}
              </p>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            <HeaderField label="Project" value={field(h.project_name)} />
            <HeaderField label="Project No." value={field(h.project_number)} />
            <HeaderField label="ITP No." value={field(h.itp_number)} />
            <HeaderField label="ITP Name" value={field(h.itp_name)} />
            <HeaderField label="Inspection Reference" value={field(h.inspection_reference)} />
          </dl>
        </div>

        {/* ── Summary row: Score · Assessment · Confidence ── */}
        <div className="grid grid-cols-3 gap-3">

          <div className={`rounded-xl border p-5 text-center ${scoreBgColour}`}>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">Score</p>
            <p className={`text-5xl font-bold leading-none ${scoreColour}`}>{result.score}</p>
            <p className="mt-1 text-xs text-gray-400">out of 100</p>
            <p className={`mt-2 text-xs font-medium ${scoreColour}`}>{scoreLabel}</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Package</p>
            <span
              className={`inline-block rounded-full px-3 py-1.5 text-xs font-bold capitalize leading-none ${
                assessmentStyle[result.package_assessment] ?? "bg-gray-100 text-gray-700"
              }`}
            >
              {result.package_assessment}
            </span>
            <p className="mt-3 text-xs text-gray-400 leading-snug">Overall package completeness</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Confidence</p>
            <p className={`text-2xl font-bold capitalize ${confidenceColour}`}>{result.confidence}</p>
            <p className="mt-2 text-xs text-gray-400 leading-snug">
              How certain Claude is about this assessment
            </p>
          </div>

        </div>

        {/* ── Executive summary ── */}
        <ResultCard title="Summary">
          <p className="text-sm text-gray-700 leading-relaxed">{result.executive_summary}</p>
        </ResultCard>

        {/* ── Missing evidence ── */}
        {result.missing_evidence.length > 0 ? (
          <ResultCard
            title="Missing evidence"
            subtitle="Items that appear to be absent — review status before acting"
            accent="red"
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
          <ResultCard title="Missing evidence" accent="green">
            <p className="text-sm text-green-700">No significant missing evidence identified.</p>
          </ResultCard>
        )}

        {/* ── Key issues ── */}
        {result.key_issues.length > 0 && (
          <ResultCard
            title="Key issues"
            subtitle="Problems, inconsistencies, or concerns found in the bundle"
            accent="yellow"
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
            title="Recommended next actions"
            subtitle="Steps a quality manager can act on straight away"
            accent="blue"
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
            title="Document observations"
            subtitle="Claude's notes on each file in the bundle"
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

function ResultCard({
  title,
  subtitle,
  accent,
  children,
}: {
  title: string;
  subtitle?: string;
  accent?: "red" | "yellow" | "blue" | "green";
  children: React.ReactNode;
}) {
  const border =
    accent === "red"    ? "border-l-red-400" :
    accent === "yellow" ? "border-l-amber-400" :
    accent === "blue"   ? "border-l-blue-400" :
    accent === "green"  ? "border-l-green-400" :
                          "border-l-gray-200";

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
