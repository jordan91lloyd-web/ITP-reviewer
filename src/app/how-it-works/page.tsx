"use client";

// ─── How it Works ─────────────────────────────────────────────────────────────
// Two-column layout: sticky sidebar TOC + main content sections.

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  BookOpen, Zap, BarChart2, Layers, ClipboardList, CheckSquare,
  Download, FileText, AlertTriangle, ChevronDown, ChevronRight,
  Users, Shield, HardHat, TrendingUp, Eye, Package,
} from "lucide-react";

// ── Section config ─────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: "what-is-it",      label: "What is the ITP QA Reviewer?" },
  { id: "getting-started", label: "Getting Started" },
  { id: "scoring-system",  label: "The Scoring System" },
  { id: "using-dashboard", label: "Using the Dashboard" },
  { id: "understanding-report", label: "Understanding the Report" },
  { id: "tips",            label: "Tips for Site Managers" },
  { id: "reference-doc",  label: "Scoring Reference Document" },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold text-[#1F3864] mb-4 pb-2 border-b border-gray-100">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold text-gray-800 mb-3 mt-5">{children}</h3>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
}

function RatingBadge({ band, score, label, description }: {
  band: "compliant" | "minor_gaps" | "significant_gaps" | "critical_risk";
  score: string;
  label: string;
  description: string;
}) {
  const styles = {
    compliant:        { pill: "bg-green-50 text-green-700 border border-green-200",  dot: "bg-green-500" },
    minor_gaps:       { pill: "bg-amber-50 text-amber-700 border border-amber-200",  dot: "bg-amber-500" },
    significant_gaps: { pill: "bg-orange-50 text-orange-700 border border-orange-200", dot: "bg-orange-500" },
    critical_risk:    { pill: "bg-red-50 text-red-700 border border-red-200",         dot: "bg-red-500" },
  };
  const s = styles[band];
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold shrink-0 mt-0.5 ${s.pill}`}>
        {score}
      </span>
      <div>
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ── Scoring document download button ──────────────────────────────────────────

function ScoringDocDownload() {
  const [storageUrl, setStorageUrl] = useState<string | null>(null);
  const [loading, setLoading]       = useState(true);
  const [isAdmin, setIsAdmin]       = useState(false);

  useEffect(() => {
    // Fetch document URL and admin status in parallel
    Promise.all([
      fetch("/api/documents").then(r => r.ok ? r.json() : null),
      fetch("/api/admin/check").then(r => r.ok ? r.json() : null),
    ]).then(([docData, adminData]) => {
      const doc = (docData?.documents ?? []).find((d: { url: string }) => d.url);
      if (doc) setStorageUrl(doc.url);
      setIsAdmin(!!adminData?.isAdmin);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const downloadUrl = storageUrl ?? "/documents/ITP-QA-Scoring-Guidelines-v1.0.docx";

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 leading-relaxed">
        The full scoring methodology used by this tool is documented in the Fleek Constructions
        ITP QA Scoring Guidelines. This document defines all dimension weights, scoring states,
        tier classifications, and calibration decisions.
      </p>
      <a
        href={loading ? "#" : downloadUrl}
        download
        className={`inline-flex items-center gap-2 rounded-lg bg-[#1F3864] px-5 py-3 text-sm font-semibold text-white hover:bg-[#253f77] transition-colors shadow-sm ${loading ? "opacity-50 pointer-events-none" : ""}`}
      >
        <Download className="h-4 w-4" />
        Download ITP QA Scoring Guidelines
      </a>
      <div className="text-xs text-gray-400 space-y-1">
        <p>Version 1.0 — April 2026</p>
        <p>
          This document is updated periodically. The version above reflects the current
          scoring methodology used by the tool.
        </p>
        {isAdmin && (
          <p className="mt-2">
            <Link href="/admin/documents" className="text-[#1F3864] hover:underline font-medium">
              Update scoring document →
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  const [activeSection, setActiveSection] = useState("what-is-it");
  const [tocOpen, setTocOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection observer for active section tracking
  useEffect(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observerRef.current!.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setTocOpen(false);
  }

  // ── TOC sidebar ────────────────────────────────────────────────────────────

  const TocLinks = () => (
    <nav className="space-y-0.5">
      {SECTIONS.map(s => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
            activeSection === s.id
              ? "bg-amber-50 text-[#1F3864] font-semibold"
              : "text-gray-500 hover:text-[#1F3864] hover:bg-gray-50"
          }`}
        >
          {s.label}
        </button>
      ))}
    </nav>
  );

  return (
    <div className="min-h-full bg-[#F9FAFB]">

      {/* Page hero */}
      <div className="bg-[#1F3864] text-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors mb-5"
          >
            ← Back to Dashboard
          </Link>
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-white/10 p-3 shrink-0">
              <BookOpen className="h-6 w-6 text-[#D97706]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-1">How It Works</h1>
              <p className="text-white/70 text-sm max-w-xl">
                Everything you need to know to use the ITP QA Reviewer — scoring methodology,
                dashboard features, report interpretation, and tips for better QA records.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">

        {/* Mobile: TOC dropdown */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="w-full flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-[#1F3864] shadow-sm"
          >
            <span>Table of Contents</span>
            {tocOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
          {tocOpen && (
            <div className="mt-1 rounded-xl border border-gray-200 bg-white p-3 shadow-md">
              <TocLinks />
            </div>
          )}
        </div>

        <div className="flex gap-8">

          {/* Desktop: sticky sidebar */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-6 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-3 pb-2">
                Contents
              </p>
              <TocLinks />
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 space-y-10">

            {/* ── 1. What is it ── */}
            <section id="what-is-it" className="scroll-mt-6">
              <Card>
                <SectionHeading>What is the ITP QA Reviewer?</SectionHeading>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  The ITP QA Reviewer is an internal quality assurance tool for Fleek Constructions.
                  It uses Claude AI to read the documents attached to a Procore ITP inspection and
                  produce a structured quality assessment — a numeric score, a risk rating, identified
                  evidence gaps, and concrete next actions. It replaces manual QA checking and gives
                  every inspection a consistent, evidence-based rating.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: <BarChart2 className="h-5 w-5 text-[#D97706]" />, stat: "5", label: "Scoring Dimensions" },
                    { icon: <Layers className="h-5 w-5 text-[#D97706]" />,    stat: "3", label: "Risk Tiers" },
                    { icon: <Shield className="h-5 w-5 text-[#D97706]" />,    stat: "4", label: "Rating Bands" },
                  ].map(({ icon, stat, label }) => (
                    <div key={label} className="text-center rounded-xl bg-[#F9FAFB] border border-gray-100 py-5 px-3">
                      <div className="flex justify-center mb-2">{icon}</div>
                      <p className="text-2xl font-bold text-[#1F3864]">{stat}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* ── 2. Getting Started ── */}
            <section id="getting-started" className="scroll-mt-6">
              <Card>
                <SectionHeading>Getting Started</SectionHeading>
                <div className="space-y-4">
                  {[
                    {
                      icon: <Zap className="h-4 w-4 text-white" />,
                      title: "Connect Procore",
                      desc: "Click Connect to Procore on the home page and log in with your Procore credentials. Only Fleek Constructions team members can access the tool.",
                    },
                    {
                      icon: <BarChart2 className="h-4 w-4 text-white" />,
                      title: "Open the Dashboard",
                      desc: "Go to Dashboard from the top navigation. The dashboard shows all your projects and the review status of each ITP.",
                    },
                    {
                      icon: <ClipboardList className="h-4 w-4 text-white" />,
                      title: "Select a Project",
                      desc: "Click a project in the left sidebar to load its ITP list. ITPs are grouped by name and filtered by status tab: Closed, In Review, or Open.",
                    },
                    {
                      icon: <Eye className="h-4 w-4 text-white" />,
                      title: "Find an ITP",
                      desc: "Click any ITP row to open the detail panel. You can see its current score (if reviewed), the D1–D5 breakdown, and any missing evidence.",
                    },
                    {
                      icon: <TrendingUp className="h-4 w-4 text-white" />,
                      title: "Run Review",
                      desc: "Click Run Review in the panel. The tool fetches the ITP form and all attached PDFs from Procore, sends them to Claude, and returns a full QA assessment. This takes 30–90 seconds.",
                    },
                    {
                      icon: <FileText className="h-4 w-4 text-white" />,
                      title: "Read the Report",
                      desc: "Click View Full Report to see the complete report: score, rating band, commercial confidence, D1–D5 breakdown, missing evidence, key issues, and next actions.",
                    },
                    {
                      icon: <Download className="h-4 w-4 text-white" />,
                      title: "Export PDF",
                      desc: "Use the Export PDF button on the report to save a print-ready version. For bulk exports, select multiple ITPs in the dashboard and use Export PDFs.",
                    },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D97706] text-xs font-bold text-white shrink-0">
                          {i + 1}
                        </div>
                        {i < 6 && <div className="w-px flex-1 bg-gray-100 mt-2" />}
                      </div>
                      <div className="pb-4">
                        <p className="text-sm font-semibold text-gray-800 mb-1">{step.title}</p>
                        <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* ── 3. Scoring System ── */}
            <section id="scoring-system" className="scroll-mt-6">
              <Card>
                <SectionHeading>The Scoring System</SectionHeading>

                {/* 3a: Tier Classification */}
                <SubHeading>3a — Tier Classification</SubHeading>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Claude classifies each ITP into one of three tiers based on the nature of the work —
                  not the ITP number. Tier determines how dimension weights are distributed.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                  {[
                    {
                      tier: "Tier 1",
                      label: "Structural",
                      risk: "Highest risk",
                      color: "border-red-200 bg-red-50",
                      badge: "bg-red-100 text-red-700",
                      examples: "Concrete pours, piling, formwork, reinforcement",
                    },
                    {
                      tier: "Tier 2",
                      label: "Waterproofing",
                      risk: "High risk",
                      color: "border-amber-200 bg-amber-50",
                      badge: "bg-amber-100 text-amber-700",
                      examples: "Basement waterproofing, wet areas, planter boxes",
                    },
                    {
                      tier: "Tier 3",
                      label: "Standard",
                      risk: "Variable risk",
                      color: "border-blue-200 bg-blue-50",
                      badge: "bg-blue-100 text-blue-700",
                      examples: "Licensed services, envelope, mechanical, finishes",
                    },
                  ].map(t => (
                    <div key={t.tier} className={`rounded-xl border p-4 ${t.color}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${t.badge}`}>{t.tier}</span>
                        <span className="text-xs text-gray-500">{t.risk}</span>
                      </div>
                      <p className="text-sm font-bold text-gray-800 mb-1">{t.label}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{t.examples}</p>
                    </div>
                  ))}
                </div>

                {/* 3b: Five dimensions */}
                <SubHeading>3b — Five Scoring Dimensions</SubHeading>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Each ITP is scored across five evidence dimensions. The available points per dimension
                  depend on the tier. Points are added up and divided by the total applicable points
                  to give a score out of 100.
                </p>
                <div className="overflow-x-auto rounded-xl border border-gray-100 mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wide w-10">Dim</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wide">What it covers</th>
                        <th className="text-center px-3 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wide w-16">T1</th>
                        <th className="text-center px-3 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wide w-16">T2</th>
                        <th className="text-center px-3 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wide w-16">T3</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        {
                          code: "D1",
                          label: "Engineer & Inspector Verification",
                          desc: "Engineer certificates, inspection sign-offs, hold point releases. Any format counts — signed PDF, email, photo of document.",
                          t1: 35, t2: 30, t3: 20,
                        },
                        {
                          code: "D2",
                          label: "Technical Testing Evidence",
                          desc: "Concrete batch dockets, cylinder break results, flood test certificates, compaction reports.",
                          t1: 25, t2: 30, t3: 10,
                        },
                        {
                          code: "D3",
                          label: "ITP Form & Subcontractor Completeness",
                          desc: "Main ITP form responded to with hold points closed. Subcontractor ITP also closed where applicable.",
                          t1: 25, t2: 25, t3: 45,
                        },
                        {
                          code: "D4",
                          label: "Material Traceability",
                          desc: "Delivery dockets, reinforcement schedules, material certificates linking specific materials to the scope.",
                          t1: 10, t2: 5, t3: 15,
                        },
                        {
                          code: "D5",
                          label: "Physical Evidence Record",
                          desc: "Pre-concealment photos, as-built surveys, inspection photos taken before the work is covered.",
                          t1: 5, t2: 10, t3: 10,
                        },
                      ].map(d => (
                        <tr key={d.code} className="hover:bg-gray-50/50">
                          <td className="px-4 py-3 font-bold text-[#1F3864] text-sm align-top">{d.code}</td>
                          <td className="px-4 py-3 align-top">
                            <p className="font-semibold text-gray-800 text-xs mb-0.5">{d.label}</p>
                            <p className="text-xs text-gray-500 leading-relaxed">{d.desc}</p>
                          </td>
                          <td className="px-3 py-3 text-center text-sm font-semibold text-gray-700 align-top">{d.t1}</td>
                          <td className="px-3 py-3 text-center text-sm font-semibold text-gray-700 align-top">{d.t2}</td>
                          <td className="px-3 py-3 text-center text-sm font-semibold text-gray-700 align-top">{d.t3}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 3c: Scoring States */}
                <SubHeading>3c — Scoring States</SubHeading>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  Within each dimension, Claude assigns one of five scoring states based on what evidence
                  is present in the document bundle.
                </p>
                <div className="rounded-xl border border-gray-100 overflow-hidden mb-6">
                  {[
                    { state: "Full",                pct: "100%", color: "bg-green-100 text-green-800",  desc: "Complete, clear evidence — nothing missing." },
                    { state: "Declared No Evidence", pct: "70%",  color: "bg-amber-100 text-amber-800",  desc: "ITP item marked Yes/Pass but no supporting document attached." },
                    { state: "Partial",             pct: "40–75%",color: "bg-orange-100 text-orange-800",desc: "Some evidence exists but gaps remain. Lean generous when intent is clear." },
                    { state: "Missing",             pct: "0%",   color: "bg-red-100 text-red-800",      desc: "No evidence of any kind in the bundle. Only used when truly nothing is present." },
                    { state: "N/A",                 pct: "—",    color: "bg-gray-100 text-gray-600",    desc: "Not applicable to this inspection. Excluded from the denominator entirely." },
                  ].map(s => (
                    <div key={s.state} className="flex items-center gap-4 px-4 py-3 border-b border-gray-50 last:border-0">
                      <span className={`text-xs font-bold rounded-full px-2.5 py-0.5 shrink-0 w-16 text-center ${s.color}`}>
                        {s.pct}
                      </span>
                      <div>
                        <span className="text-xs font-semibold text-gray-800">{s.state}</span>
                        <span className="text-xs text-gray-500 ml-2">{s.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 3d: Rating Bands */}
                <SubHeading>3d — Rating Bands</SubHeading>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  Once scored, the result falls into one of four rating bands. These determine the overall
                  QA status shown in the dashboard and report.
                </p>
                <div className="rounded-xl border border-gray-100 p-4">
                  <RatingBadge
                    band="compliant"
                    score="85–100"
                    label="Compliant"
                    description="Strong evidence package. Low audit risk. Suitable for handover or regulatory sign-off."
                  />
                  <RatingBadge
                    band="minor_gaps"
                    score="70–84"
                    label="Minor Gaps"
                    description="Good evidence but some gaps remain. Acceptable in most cases with minor follow-up actions."
                  />
                  <RatingBadge
                    band="significant_gaps"
                    score="50–69"
                    label="Significant Gaps"
                    description="Notable evidence missing. Requires remediation before the package can be considered complete."
                  />
                  <RatingBadge
                    band="critical_risk"
                    score="0–49"
                    label="Critical Risk"
                    description="Major evidence absent. High audit risk. Do not close the ITP without addressing the gaps identified."
                  />
                </div>
              </Card>
            </section>

            {/* ── 4. Using the Dashboard ── */}
            <section id="using-dashboard" className="scroll-mt-6">
              <Card>
                <SectionHeading>Using the Dashboard</SectionHeading>

                <div className="space-y-5">
                  <div>
                    <SubHeading>Status Tabs — Closed / In Review / Open</SubHeading>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      The three tabs filter which inspections are shown. <strong>Closed</strong> ITPs are
                      the primary target for review — these are complete inspections with all hold points
                      released. <strong>In Review</strong> shows inspections currently being processed.
                      <strong> Open</strong> shows active inspections that are not yet closed.
                    </p>
                  </div>

                  <div>
                    <SubHeading>Collapsible ITP Groups</SubHeading>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      ITPs with the same name are grouped together (e.g. all instances of &ldquo;ITP 014 Slab on Ground&rdquo;
                      across different pours). Click the group header to collapse or expand it. The coloured
                      dot next to the group name shows the <em>worst</em> rating among reviewed ITPs in that
                      group — so a red dot means at least one ITP in the group has Critical Risk.
                    </p>
                  </div>

                  <div>
                    <SubHeading>Bulk Select & Bulk Review</SubHeading>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Use the checkboxes to select multiple ITPs, then use the bulk action bar at the
                      bottom to run reviews on all selected unreviewed ITPs in sequence. This is the most
                      efficient way to review a full project. The tool processes one ITP at a time and
                      shows progress.
                    </p>
                  </div>

                  <div>
                    <SubHeading>Bulk PDF Export</SubHeading>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Select reviewed ITPs and use Export PDFs to download reports. Choose
                      <strong> Separate files</strong> to open each report in a new browser tab with a
                      print dialog, or <strong>Download as ZIP</strong> to get all reports as HTML files
                      in a single ZIP archive that can be opened in any browser and printed.
                    </p>
                  </div>

                  <div>
                    <SubHeading>Human Score Override</SubHeading>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Open an ITP detail panel and scroll to Human Override. You can enter an adjusted
                      score (0–100) and a reason. Use this when you have context the AI couldn&apos;t see —
                      for example, verbal confirmation from an engineer, or documents attached after the
                      ITP was closed. The original AI score is always retained for reference.
                    </p>
                  </div>

                  <div>
                    <SubHeading>Audit Log</SubHeading>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Every review run, score override, PDF export, and login is recorded in the audit log.
                      Access it from the Audit Log link in the project sidebar, or from the top nav.
                      You can filter by action type, user, date range, or project, and export the full log
                      as a CSV.
                    </p>
                  </div>
                </div>
              </Card>
            </section>

            {/* ── 5. Understanding the Report ── */}
            <section id="understanding-report" className="scroll-mt-6">
              <Card>
                <SectionHeading>Understanding the Report</SectionHeading>
                <div className="space-y-5">
                  {[
                    {
                      icon: <ClipboardList className="h-4 w-4 text-[#D97706]" />,
                      title: "Inspection Header",
                      desc: "Project name, ITP number, tier classification, who closed it, and the inspection reference. Extracted automatically from your documents — Claude reads the forms and certificates to identify these.",
                    },
                    {
                      icon: <BarChart2 className="h-4 w-4 text-[#D97706]" />,
                      title: "Score and Rating Band",
                      desc: "The numeric score (0–100) reflects the weighted average across all applicable dimensions. The rating band (Compliant → Critical Risk) is what matters most for day-to-day QA decisions.",
                    },
                    {
                      icon: <Layers className="h-4 w-4 text-[#D97706]" />,
                      title: "D1–D5 Breakdown",
                      desc: "Each dimension shows the scoring state, how many points were achieved out of how many were applicable, and the percentage. N/A dimensions are excluded from the total.",
                    },
                    {
                      icon: <AlertTriangle className="h-4 w-4 text-[#D97706]" />,
                      title: "Missing Evidence",
                      desc: "Specific evidence types that are absent from the bundle — not vague complaints. Each gap identifies what is missing and why it matters. Up to 6 items are listed in priority order.",
                    },
                    {
                      icon: <Eye className="h-4 w-4 text-[#D97706]" />,
                      title: "Key Issues",
                      desc: "The most significant problems found, each with a title and explanation. These are the issues most likely to cause problems in an audit or defect liability dispute.",
                    },
                    {
                      icon: <CheckSquare className="h-4 w-4 text-[#D97706]" />,
                      title: "Next Actions",
                      desc: "Concrete steps to improve the score — not generic advice. Each action is specific to what was found in this inspection package.",
                    },
                    {
                      icon: <Shield className="h-4 w-4 text-[#D97706]" />,
                      title: "Commercial Confidence",
                      desc: "An independent audit readiness rating (High / Medium / Low) that is separate from the numeric score. High means low audit risk; Low means engineer evidence is missing or major gaps exist. A package can score 85+ but still have Low commercial confidence if engineer sign-off is absent.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F9FAFB] border border-gray-100 shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 mb-1">{item.title}</p>
                        <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* ── 6. Tips for Site Managers ── */}
            <section id="tips" className="scroll-mt-6">
              <Card>
                <SectionHeading>Tips for Site Managers</SectionHeading>
                <div className="space-y-3">
                  {[
                    {
                      icon: <Package className="h-4 w-4 text-[#1F3864]" />,
                      tip: "Attach engineer certificates directly to the hold point item they relate to — not just to the ITP at the top level. Claude can find them either way, but direct attachment is clearest.",
                    },
                    {
                      icon: <HardHat className="h-4 w-4 text-[#1F3864]" />,
                      tip: "Always attach concrete dockets and cylinder break results for structural pours. These are the single biggest factor in D2 scoring for Tier 1 ITPs.",
                    },
                    {
                      icon: <Eye className="h-4 w-4 text-[#1F3864]" />,
                      tip: "Photos should be taken before concealment — not after. A photo of finished concrete tells Claude less than a photo of the steel before the pour. Pre-pour and pre-concealment photos are what count for D5.",
                    },
                    {
                      icon: <Users className="h-4 w-4 text-[#1F3864]" />,
                      tip: "Close subcontractor ITPs before closing the main ITP. D3 scoring checks whether the subcontractor ITP is also responded to and closed — an open sub ITP will reduce your D3 score.",
                    },
                    {
                      icon: <FileText className="h-4 w-4 text-[#1F3864]" />,
                      tip: "If something was done verbally and paperwork is coming, add a note in the ITP inspection item. Claude reads notes and understands context — a note explaining a verbal sign-off is better than silence.",
                    },
                    {
                      icon: <TrendingUp className="h-4 w-4 text-[#1F3864]" />,
                      tip: "A partially completed ITP with strong evidence scores better than a fully ticked ITP with nothing attached. Evidence quality matters more than checkbox completion.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 rounded-xl border border-gray-100 bg-[#F9FAFB] p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-gray-200 shrink-0">
                        {item.icon}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.tip}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* ── 7. Scoring Reference Document ── */}
            <section id="reference-doc" className="scroll-mt-6">
              <Card>
                <SectionHeading>Scoring Reference Document</SectionHeading>
                <ScoringDocDownload />
              </Card>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
