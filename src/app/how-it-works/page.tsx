// ─── How It Works ─────────────────────────────────────────────────────────────
// Static reference guide for the ITP QA Reviewer tool.

import Link from "next/link";
import {
  ArrowLeft,
  Zap,
  Building2,
  Layers,
  Wrench,
  UserCheck,
  BarChart2,
  ClipboardList,
  Package,
  Camera,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  XCircle,
  LayoutDashboard,
  FileText,
  Lightbulb,
  Shield,
  Star,
  Download,
  Users,
} from "lucide-react";

// ── Shared sub-components ──────────────────────────────────────────────────────

function SectionHeading({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-1">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">
          {number}
        </span>
        <div className="flex-1 h-px bg-amber-200" />
      </div>
      <h2 className="text-2xl font-bold text-[#1F3864]">{title}</h2>
      {subtitle && (
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      )}
    </div>
  );
}

function Step({
  n,
  title,
  description,
}: {
  n: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#1F3864] text-white text-sm font-bold">
        {n}
      </div>
      <div className="pt-0.5">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  return (
    <div className="min-h-full bg-[#F9FAFB]">
      {/* ── Page header ── */}
      <div className="bg-[#1F3864] text-white">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-2">How It Works</h1>
          <p className="text-white/70 text-base">
            Everything you need to know to use the ITP QA Reviewer.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-4xl px-6 py-12 space-y-16">

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* SECTION 1 — What is this tool? */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <section>
          <SectionHeading number="01" title="What is this tool?" />

          <p className="text-sm text-gray-600 leading-relaxed mb-8 max-w-2xl">
            The ITP QA Reviewer automatically scores Inspection and Test Plan packages
            from Procore using Claude AI. It reads every attached document — engineer
            certificates, test reports, signed ITPs, photos — and assesses the package
            across five evidence dimensions to produce a numeric score (0–100), a rating
            band, and a list of specific gaps. The goal is to identify audit risk before
            it becomes a problem.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1F3864]/10">
                <BarChart2 className="h-5 w-5 text-[#1F3864]" />
              </div>
              <div className="text-2xl font-bold text-[#1F3864] mb-1">5</div>
              <div className="text-xs font-semibold text-gray-700 mb-1">Scoring Dimensions</div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Engineer verification, testing, ITP form, materials, physical evidence
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1F3864]/10">
                <Layers className="h-5 w-5 text-[#1F3864]" />
              </div>
              <div className="text-2xl font-bold text-[#1F3864] mb-1">3</div>
              <div className="text-xs font-semibold text-gray-700 mb-1">Risk Tiers</div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Structural, Waterproofing, and Standard — each with different scoring weights
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1F3864]/10">
                <Star className="h-5 w-5 text-[#1F3864]" />
              </div>
              <div className="text-2xl font-bold text-[#1F3864] mb-1">4</div>
              <div className="text-xs font-semibold text-gray-700 mb-1">Rating Bands</div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Compliant, Minor Gaps, Significant Gaps, and Critical Risk
              </p>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* SECTION 2 — The Scoring System */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <section>
          <SectionHeading
            number="02"
            title="The Scoring System"
            subtitle="Scores are calculated differently depending on the type of work being inspected."
          />

          {/* Tiers */}
          <h3 className="text-sm font-bold text-[#1F3864] uppercase tracking-wider mb-4">
            Work Tiers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100">
                  <Building2 className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-red-600 uppercase tracking-wide">Tier 1</div>
                  <div className="text-sm font-bold text-gray-900">Structural</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Highest risk work. Concrete pours, reinforcement, formwork, piling.
                Engineer verification carries the most weight (35 pts).
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
                  <Layers className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wide">Tier 2</div>
                  <div className="text-sm font-bold text-gray-900">Waterproofing</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                High risk due to concealed defects. Basement, wet area, planter box
                waterproofing. Testing evidence carries equal weight to engineer verification.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                  <Wrench className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">Tier 3</div>
                  <div className="text-sm font-bold text-gray-900">Standard</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Variable risk. Licensed services, envelope, mechanical, finishes.
                ITP form completeness is the dominant dimension (45 pts).
              </p>
            </div>
          </div>

          {/* Dimensions */}
          <h3 className="text-sm font-bold text-[#1F3864] uppercase tracking-wider mb-4">
            Scoring Dimensions
          </h3>
          <div className="rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden mb-10">
            {[
              {
                icon: <UserCheck className="h-4 w-4" />,
                code: "D1",
                name: "Engineer & Inspector Verification",
                desc: "Signed certifications, inspection sign-offs, and qualified oversight evidence.",
              },
              {
                icon: <BarChart2 className="h-4 w-4" />,
                code: "D2",
                name: "Technical Testing Evidence",
                desc: "Concrete cylinder breaks, slump tests, NDT results, and lab reports.",
              },
              {
                icon: <ClipboardList className="h-4 w-4" />,
                code: "D3",
                name: "ITP Form & Subcontractor Completeness",
                desc: "Hold points signed off, witness points confirmed, subcontractor ITP attached.",
              },
              {
                icon: <Package className="h-4 w-4" />,
                code: "D4",
                name: "Material Traceability",
                desc: "Delivery dockets, conformance certificates, and product data sheets.",
              },
              {
                icon: <Camera className="h-4 w-4" />,
                code: "D5",
                name: "Physical Evidence Record",
                desc: "Pre-concealment photos, site inspection records, and observable compliance evidence.",
              },
            ].map((d, i) => (
              <div
                key={d.code}
                className={`flex items-start gap-4 px-5 py-4 ${i < 4 ? "border-b border-gray-50" : ""}`}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1F3864]/10 text-[#1F3864]">
                  {d.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-bold text-[#D97706]">{d.code}</span>
                    <span className="text-sm font-semibold text-gray-900">{d.name}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Rating bands */}
          <h3 className="text-sm font-bold text-[#1F3864] uppercase tracking-wider mb-4">
            Rating Bands
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                icon: <CheckCircle2 className="h-5 w-5" />,
                label: "Compliant",
                range: "85–100",
                desc: "Strong evidence across all dimensions. Audit-ready.",
                bg: "bg-green-50",
                border: "border-green-200",
                text: "text-green-700",
                badge: "bg-green-600 text-white",
              },
              {
                icon: <AlertCircle className="h-5 w-5" />,
                label: "Minor Gaps",
                range: "70–84",
                desc: "Mostly complete. Small evidence gaps that should be addressed.",
                bg: "bg-amber-50",
                border: "border-amber-200",
                text: "text-amber-700",
                badge: "bg-amber-500 text-white",
              },
              {
                icon: <AlertTriangle className="h-5 w-5" />,
                label: "Significant Gaps",
                range: "50–69",
                desc: "Notable missing evidence. Action required before audit.",
                bg: "bg-orange-50",
                border: "border-orange-200",
                text: "text-orange-700",
                badge: "bg-orange-500 text-white",
              },
              {
                icon: <XCircle className="h-5 w-5" />,
                label: "Critical Risk",
                range: "0–49",
                desc: "Serious evidence gaps. Significant audit exposure.",
                bg: "bg-red-50",
                border: "border-red-200",
                text: "text-red-700",
                badge: "bg-red-600 text-white",
              },
            ].map(b => (
              <div
                key={b.label}
                className={`rounded-xl border p-4 ${b.bg} ${b.border}`}
              >
                <div className={`mb-2 ${b.text}`}>{b.icon}</div>
                <div className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold mb-2 ${b.badge}`}>
                  {b.label}
                </div>
                <div className={`text-xs font-bold mb-1 ${b.text}`}>{b.range}</div>
                <p className="text-[11px] text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* SECTION 3 — How to Review an ITP */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <section>
          <SectionHeading
            number="03"
            title="How to Review an ITP"
            subtitle="Follow these steps to run a review from the dashboard."
          />

          <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-6 space-y-6">
            <Step
              n={1}
              title="Open the Dashboard and select a project"
              description="Navigate to /dashboard and click a project in the left sidebar. The ITP list will load automatically."
            />
            <Step
              n={2}
              title="Find the ITP you want to review"
              description="Use the Closed / In Review / Open tabs to filter. ITPs are grouped by name. Use Collapse All / Expand All to navigate large lists."
            />
            <Step
              n={3}
              title="Click the ITP to open the side panel"
              description="Clicking any row opens a detail panel on the right with the current score, D1–D5 breakdown, and missing evidence."
            />
            <Step
              n={4}
              title="Click Run Review — Claude reads all attached documents"
              description="The tool fetches the inspection data and all PDF attachments from Procore, then sends them to Claude for analysis. This takes 30–90 seconds depending on attachment size."
            />
            <Step
              n={5}
              title="Review the score, rating band, and missing evidence"
              description="The panel shows the numeric score, band (Compliant / Minor Gaps / etc.), and the top three evidence gaps. Click View Full Report for the complete assessment."
            />
            <Step
              n={6}
              title="Override the score if needed with a note explaining why"
              description="If you disagree with the AI score — for example, you have verbal confirmation from an engineer not yet in Procore — enter a corrected score and a reason in the Human Override section."
            />
            <Step
              n={7}
              title="Export the report as PDF"
              description="Use the Export PDFs option in the bulk action bar, or select individual ITPs and export as separate files or a ZIP bundle."
            />
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* SECTION 4 — Using the Dashboard */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <section>
          <SectionHeading
            number="04"
            title="Using the Dashboard"
            subtitle="Key features of the ITP list view."
          />

          <div className="space-y-4">
            <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-5">
              <div className="flex items-start gap-3">
                <LayoutDashboard className="h-5 w-5 text-[#1F3864] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Status tabs: Closed, In Review, Open</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Switch between tabs to see ITPs by their Procore status. Only closed ITPs can be
                    reviewed — open and in-review inspections are shown for visibility but have incomplete
                    evidence by definition.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-5">
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 shrink-0 mt-0.5 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Colour dot on group headers</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Each group header shows a coloured dot representing the worst rating band of any
                    reviewed inspection in that group. Green = all compliant. Red = at least one critical
                    risk. Grey = not yet reviewed. This lets you scan risk at a glance.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-5">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-[#1F3864] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Bulk select and bulk review</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Use the Select All checkbox or individual checkboxes to select multiple ITPs. The
                    sticky action bar at the bottom shows how many are selected and lets you run reviews
                    on all unreviewed items sequentially. Reviews run one at a time to avoid rate limits.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-5">
              <div className="flex items-start gap-3">
                <Download className="h-5 w-5 text-[#1F3864] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Bulk PDF export</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Select reviewed ITPs and click Export PDFs. Choose{" "}
                    <strong>Separate files</strong> to open each report in a new browser tab with a
                    print dialog, or <strong>Download as ZIP</strong> to get a ZIP of HTML report files
                    you can open and print individually.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-5">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-[#1F3864] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Audit Log</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Every review run, score override, login, and PDF export is recorded in the Audit Log.
                    Access it via the Audit Log link in the header. Filter by project, user, action type,
                    and date range. Export to CSV for reporting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* SECTION 5 — Understanding the Report */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <section>
          <SectionHeading
            number="05"
            title="Understanding the Report"
            subtitle="What each section of the QA report means."
          />

          <div className="space-y-3">
            {[
              {
                title: "Inspection Header",
                desc: "Project name, ITP number, tier classification, closed-by person, and inspection reference — all extracted automatically from the documents. If any field is wrong, it means the document didn't contain that information clearly.",
              },
              {
                title: "Score and Rating Band",
                desc: "The numeric score (0–100) is calculated from the five dimensions weighted for the ITP tier. The rating band (Compliant / Minor Gaps / Significant Gaps / Critical Risk) tells you the overall audit readiness at a glance.",
              },
              {
                title: "D1–D5 Breakdown",
                desc: "Each dimension shows a percentage bar and points achieved vs. applicable points. Dimensions where the ITP item is not applicable (N/A) are excluded from the denominator — a high N/A count is normal for small-scope ITPs.",
              },
              {
                title: "Missing Evidence",
                desc: "Specific evidence items that are absent from the package. Listed in priority order. These are the items most likely to cause audit issues — address these first.",
              },
              {
                title: "Key Issues",
                desc: "The most important quality concerns identified. These may include technical problems, process gaps, or compliance risks beyond missing documents.",
              },
              {
                title: "Next Actions",
                desc: "Concrete recommended steps to improve the package. Actions are specific and actionable — e.g. \"Obtain signed engineer certificate for hold point HP-3 and attach to Procore.\"",
              },
              {
                title: "Commercial Confidence",
                desc: "An independent audit-readiness rating (High / Medium / Low) that is separate from the numeric score. A package can score 80 but have Low commercial confidence if engineer sign-off is missing entirely. This rating indicates how defensible the package is in an external audit.",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-xl bg-white border border-gray-100 shadow-sm px-5 py-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 mt-0.5 items-center justify-center rounded-full bg-[#D97706] text-white text-[10px] font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-0.5">{item.title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-xl bg-[#1F3864]/5 border border-[#1F3864]/10 px-5 py-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-[#1F3864] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#1F3864] mb-0.5">Human Override</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    If you have information the AI couldn&apos;t see — a verbal confirmation, a document
                    submitted outside Procore, or contextual knowledge — use the Human Override to set
                    a corrected score and leave a note explaining why. All overrides are recorded in
                    the Audit Log.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* SECTION 6 — Tips for Site Managers */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <section>
          <SectionHeading
            number="06"
            title="Tips for Site Managers"
            subtitle="Practical steps to ensure your ITP packages score well."
          />

          <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-6 space-y-5">
            {[
              {
                tip: "Attach engineer certificates to the correct hold point items",
                detail:
                  "The AI looks for engineer sign-off evidence linked to specific hold points. A certificate attached to the wrong item or buried in an unrelated upload may not be detected.",
              },
              {
                tip: "Always attach concrete dockets and cylinder break results",
                detail:
                  "For structural ITPs, delivery dockets and cylinder break results are required for the D2 (Technical Testing) and D4 (Material Traceability) dimensions. Missing these is one of the most common causes of low scores.",
              },
              {
                tip: "Photos should be pre-concealment, not post",
                detail:
                  "Photographs taken after concrete is poured or waterproofing is covered provide no evidence of what was inspected. Pre-concealment photos showing the actual condition of the work are what the scoring system looks for.",
              },
              {
                tip: "Close subcontractor ITPs before closing the main ITP",
                detail:
                  "For the D3 (ITP Form Completeness) dimension, the scoring system checks whether the subcontractor's own ITP has been completed. An open or unsigned sub-ITP will reduce the score.",
              },
              {
                tip: "Add a note if something was done verbally and paper is coming later",
                detail:
                  "If an engineer attended but hasn't signed yet, use the Human Override with a note. This preserves the audit trail and prevents the package being flagged as non-compliant incorrectly.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100">
                  <Lightbulb className="h-4 w-4 text-[#D97706]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-0.5">{item.tip}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Bottom nav ── */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1F3864] hover:text-[#253f77] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="text-xs text-gray-400">
            <span className="text-[#D97706] font-semibold">Fleek</span> Constructions — Internal QA Tool
          </div>
        </div>

      </div>
    </div>
  );
}
