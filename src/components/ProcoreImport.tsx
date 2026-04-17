"use client";

// ─── ProcoreImport ─────────────────────────────────────────────────────────────
// Multi-step UI for importing a closed ITP inspection from Procore.
// Self-contained — checks auth on mount, renders nothing if not authenticated.
//
// Steps:
//   0. Company     — auto-discovered; auto-selected if only one, picker if many
//   1. Project     — load and pick a Procore project (scoped to selected company)
//   2. Inspections — closed ITP-* inspections with review history badges
//   3. Importing   — loading state while files are downloaded and reviewed
//   4. Result      — shows ReviewResults + import summary

import { useState, useEffect } from "react";
import ReviewResults from "./ReviewResults";
import type { ReviewResult } from "@/lib/types";

// ── Types ──────────────────────────────────────────────────────────────────────

interface ProcoreCompany {
  id: number;
  name: string;
  is_active: boolean;
}

interface ProcoreProject {
  id: number;
  name: string;
  display_name: string;
  project_number: string | null;
}

interface InspectionWithStatus {
  id: number;
  name: string;
  status: string;
  updated_at: string | null;
  closed_at:  string | null;
  review_status: "not_reviewed" | "reviewed" | "changed";
  last_reviewed_at: string | null;
  last_score: number | null;
  last_package_assessment: string | null;
}

interface ImportSummary {
  inspection_title: string;
  total_files: number;
  imported_files: string[];
  skipped_files: string[];
}

interface ImportDiagnostics {
  procore_top_level_keys: string[];
  counts: {
    items: number;
    sections: number;
    responses: number;
    topLevelAttachments: number;
    flattenedItems: number;
  };
  attachments_by_source: Record<string, number>;
  attachments_total: number;
  attachments_unique: number;
  attachments_seen_without_url?: number;
  attachments_dropped_for_size?: number;
  attachments_total_bytes?: number;
  first_raw_attachment?: unknown;
  project_loaded: boolean;
  project_load_error?: string | null;
  project_name: string | null;
  project_number: string | null;
  sample_items: Array<{
    id: number;
    position: number | null;
    description: string | null;
    has_response: boolean;
    has_list_item_responses: boolean;
    direct_attachment_count: number;
    direct_photo_count?: number;
    answer: string | null;
  }>;
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function ProcoreImport() {
  // Auth
  const [authenticated, setAuthenticated]       = useState<boolean | null>(null);
  // Companies
  const [companies, setCompanies]               = useState<ProcoreCompany[]>([]);
  const [selectedCompany, setSelectedCompany]   = useState<ProcoreCompany | null>(null);
  // Projects
  const [projects, setProjects]                 = useState<ProcoreProject[]>([]);
  const [selectedProject, setSelectedProject]   = useState<ProcoreProject | null>(null);
  const [projectsLoaded, setProjectsLoaded]     = useState(false);
  // Inspections
  const [inspections, setInspections]           = useState<InspectionWithStatus[]>([]);
  // Loading / error
  const [loading, setLoading] = useState<
    "auth" | "companies" | "projects" | "inspections" | "importing" | null
  >("auth");
  const [error, setError]                       = useState<string | null>(null);
  const [importingName, setImportingName]       = useState<string | null>(null);
  // Result
  const [result, setResult]                     = useState<ReviewResult | null>(null);
  const [importSummary, setImportSummary]       = useState<ImportSummary | null>(null);
  const [diagnostics, setDiagnostics]           = useState<ImportDiagnostics | null>(null);
  // UI
  const [expanded, setExpanded]                 = useState(true);

  // ── Auth check → auto-discover companies ────────────────────────────────────
  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.authenticated) {
          setAuthenticated(true);
          loadCompanies();
        } else {
          setAuthenticated(false);
          setLoading(null);
        }
      })
      .catch(() => {
        setAuthenticated(false);
        setLoading(null);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Actions ───────────────────────────────────────────────────────────────────

  async function loadCompanies() {
    setLoading("companies");
    setError(null);
    try {
      const res  = await fetch("/api/procore/companies");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load companies");
      const list: ProcoreCompany[] = data.companies ?? [];
      setCompanies(list);
      // Auto-select when only one company
      if (list.length === 1) {
        setSelectedCompany(list[0]);
      }
    } catch (err) {
      setError(
        `Could not discover your Procore company: ${err instanceof Error ? err.message : String(err)}`
      );
    } finally {
      setLoading(null);
    }
  }

  async function handleLoadProjects(company: ProcoreCompany) {
    setLoading("projects");
    setError(null);
    try {
      const res  = await fetch(`/api/procore/projects?company_id=${company.id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load projects");
      setProjects(data.projects ?? []);
      setProjectsLoaded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(null);
    }
  }

  async function handleSelectProject(project: ProcoreProject) {
    if (!selectedCompany) return;
    setSelectedProject(project);
    setInspections([]);
    setError(null);
    setLoading("inspections");
    try {
      const res  = await fetch(
        `/api/procore/inspections?project_id=${project.id}&company_id=${selectedCompany.id}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load inspections");
      setInspections(data.inspections ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(null);
    }
  }

  async function handleImport(inspection: InspectionWithStatus) {
    if (!selectedProject || !selectedCompany) return;
    setImportingName(inspection.name);
    setLoading("importing");
    setError(null);
    try {
      const res  = await fetch("/api/procore/import", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          project_id:    selectedProject.id,
          inspection_id: inspection.id,
          company_id:    selectedCompany.id,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.error ?? "Import failed");
      setResult(data.result);
      setImportSummary(data.import_summary);
      setDiagnostics(data.diagnostics ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(null);
      setImportingName(null);
    }
  }

  function handleReset() {
    setResult(null);
    setImportSummary(null);
    setDiagnostics(null);
    setError(null);
    setSelectedProject(null);
    setInspections([]);
    setProjectsLoaded(false);
    setProjects([]);
    // Keep company selected — no need to re-discover
  }

  // ── Not connected — render nothing ──────────────────────────────────────────
  if (authenticated === null || !authenticated) return null;

  // ── Result view ───────────────────────────────────────────────────────────────
  if (result && importSummary) {
    return (
      <div className="space-y-3">

        {/* ── Evidence pill summary — always visible at the top ── */}
        <EvidenceSummaryBar summary={importSummary} />

        {/* ── The actual QA report ── */}
        <ReviewResults result={result} onReset={handleReset} />

        {/* ── Appendix divider ── */}
        <div className="flex items-center gap-3 pt-2">
          <div className="flex-1 border-t border-gray-200" />
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 select-none">
            Appendix
          </span>
          <div className="flex-1 border-t border-gray-200" />
        </div>

        {/* ── Appendix A: Import summary ── */}
        <ImportSummaryPanel summary={importSummary} />

        {/* ── Appendix B: Procore diagnostics ── */}
        {diagnostics && (
          <DiagnosticsPanel diagnostics={diagnostics} />
        )}

      </div>
    );
  }

  // ── Importing / loading state ─────────────────────────────────────────────────
  if (loading === "importing") {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-5 py-10 shadow-sm text-center">
        <Spinner className="mx-auto h-6 w-6 text-blue-500" />
        <p className="mt-3 text-sm font-semibold text-gray-700">Importing from Procore…</p>
        {importingName && (
          <p className="mt-1 text-xs text-gray-500">{importingName}</p>
        )}
        <p className="mt-1 text-xs text-gray-400">
          Downloading files and running QA review — this takes 30–90 seconds
        </p>
      </div>
    );
  }

  // ── Main collapsible card ─────────────────────────────────────────────────────
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">

      {/* Card header / toggle */}
      <button
        type="button"
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left gap-3"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 rounded-full bg-green-500 shrink-0" />
          <h3 className="text-sm font-semibold text-gray-800">Import from Procore</h3>
          {selectedCompany && (
            <span className="text-xs text-gray-400 font-normal">— {selectedCompany.name}</span>
          )}
        </div>
        <span className="text-xs font-medium text-gray-400 shrink-0 select-none">
          {expanded ? "▾ Hide" : "▸ Show"}
        </span>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 px-5 pb-5 pt-4 space-y-4">

          {/* Error banner */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <span className="font-semibold">Error: </span>{error}
              {error.includes("company") && (
                <button
                  type="button"
                  onClick={loadCompanies}
                  className="ml-2 underline text-red-600 hover:text-red-800"
                >
                  Retry
                </button>
              )}
            </div>
          )}

          {/* Step 0 — Company discovery */}
          {loading === "companies" && (
            <div className="flex items-center gap-2 py-2 text-sm text-gray-400">
              <Spinner className="h-4 w-4 text-blue-400" />
              Discovering your Procore company…
            </div>
          )}

          {/* Step 0b — Company picker (only shown when multiple companies) */}
          {!loading && companies.length > 1 && !selectedCompany && (
            <CompanyPickerStep
              companies={companies}
              onSelect={setSelectedCompany}
            />
          )}

          {/* Step 1 — Project select (shown once company is known) */}
          {!loading && selectedCompany && !selectedProject && (
            <ProjectSelectStep
              company={selectedCompany}
              projects={projects}
              projectsLoaded={projectsLoaded}
              loading={loading === "projects"}
              onLoad={() => handleLoadProjects(selectedCompany)}
              onSelect={handleSelectProject}
              onChangeCompany={companies.length > 1 ? () => {
                setSelectedCompany(null);
                setProjects([]);
                setProjectsLoaded(false);
              } : undefined}
            />
          )}

          {/* Step 2 — Inspection list */}
          {selectedProject && (
            <InspectionListStep
              project={selectedProject}
              inspections={inspections}
              loading={loading === "inspections"}
              onBack={() => {
                setSelectedProject(null);
                setInspections([]);
                setError(null);
              }}
              onImport={handleImport}
            />
          )}

        </div>
      )}
    </div>
  );
}

// ── CompanyPickerStep ──────────────────────────────────────────────────────────

function CompanyPickerStep({
  companies,
  onSelect,
}: {
  companies: ProcoreCompany[];
  onSelect: (c: ProcoreCompany) => void;
}) {
  const [selectedId, setSelectedId] = useState<number | "">("");

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Select company
      </label>
      <div className="flex gap-2">
        <select
          value={selectedId}
          onChange={e => setSelectedId(e.target.value === "" ? "" : Number(e.target.value))}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">— Choose a company —</option>
          {companies.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button
          type="button"
          disabled={selectedId === ""}
          onClick={() => {
            const company = companies.find(c => c.id === selectedId);
            if (company) onSelect(company);
          }}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Select
        </button>
      </div>
    </div>
  );
}

// ── ProjectSelectStep ──────────────────────────────────────────────────────────

function ProjectSelectStep({
  company,
  projects,
  projectsLoaded,
  loading,
  onLoad,
  onSelect,
  onChangeCompany,
}: {
  company: ProcoreCompany;
  projects: ProcoreProject[];
  projectsLoaded: boolean;
  loading: boolean;
  onLoad: () => void;
  onSelect: (p: ProcoreProject) => void;
  onChangeCompany?: () => void;
}) {
  const [selectedId, setSelectedId] = useState<number | "">("");

  if (!projectsLoaded && !loading) {
    return (
      <div className="text-center py-2">
        {onChangeCompany && (
          <p className="text-xs text-gray-400 mb-1">
            Company: <span className="font-medium text-gray-600">{company.name}</span>
            {" · "}
            <button
              type="button"
              onClick={onChangeCompany}
              className="underline text-blue-500 hover:text-blue-700"
            >
              Change
            </button>
          </p>
        )}
        {!onChangeCompany && (
          <p className="text-xs text-gray-400 mb-1">
            Company: <span className="font-medium text-gray-600">{company.name}</span>
          </p>
        )}
        <p className="text-xs text-gray-400 mb-3">Load your Procore projects to begin.</p>
        <button
          type="button"
          onClick={onLoad}
          className="rounded-lg border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
        >
          Load projects
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-2 text-sm text-gray-400">
        <Spinner className="h-4 w-4 text-blue-400" />
        Loading projects…
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <p className="text-sm text-gray-500 py-2">
        No projects found in <span className="font-medium">{company.name}</span>. Make sure your
        Procore account has project access.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Select project
      </label>
      <div className="flex gap-2">
        <select
          value={selectedId}
          onChange={e => setSelectedId(e.target.value === "" ? "" : Number(e.target.value))}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">— Choose a project —</option>
          {projects.map(p => (
            <option key={p.id} value={p.id}>
              {p.project_number ? `${p.project_number} — ` : ""}
              {p.display_name || p.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          disabled={selectedId === ""}
          onClick={() => {
            const proj = projects.find(p => p.id === selectedId);
            if (proj) onSelect(proj);
          }}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Load
        </button>
      </div>
    </div>
  );
}

// ── InspectionListStep ─────────────────────────────────────────────────────────

function InspectionListStep({
  project,
  inspections,
  loading,
  onBack,
  onImport,
}: {
  project: ProcoreProject;
  inspections: InspectionWithStatus[];
  loading: boolean;
  onBack: () => void;
  onImport: (i: InspectionWithStatus) => void;
}) {
  return (
    <div className="space-y-3">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-blue-500 hover:text-blue-700 transition-colors"
        >
          ← Projects
        </button>
        <span className="text-xs text-gray-300">/</span>
        <span className="text-xs font-semibold text-gray-700 truncate max-w-xs">
          {project.display_name || project.name}
        </span>
      </div>

      {loading && (
        <div className="flex items-center gap-2 py-2 text-sm text-gray-400">
          <Spinner className="h-4 w-4 text-blue-400" />
          Loading closed ITP inspections…
        </div>
      )}

      {!loading && inspections.length === 0 && (
        <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-5 text-center">
          <p className="text-sm font-medium text-gray-600">No closed ITP inspections found</p>
          <p className="mt-1 text-xs text-gray-400 leading-relaxed">
            Only inspections with status <strong>closed</strong> and names starting with{" "}
            <strong>ITP</strong> are shown here.
          </p>
        </div>
      )}

      {!loading && inspections.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
            Closed ITP inspections — {inspections.length} found
          </p>
          {inspections.map(insp => (
            <InspectionRow
              key={insp.id}
              inspection={insp}
              onImport={() => onImport(insp)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── InspectionRow ──────────────────────────────────────────────────────────────

function InspectionRow({
  inspection: insp,
  onImport,
}: {
  inspection: InspectionWithStatus;
  onImport: () => void;
}) {
  // Colour-code the row border based on the last score so you can see
  // which ITPs are strong, need attention, or haven't been reviewed yet.
  const score = insp.last_score;
  const rowAccent =
    insp.review_status === "not_reviewed"
      ? "border-l-gray-200 bg-gray-50 hover:bg-gray-100"
      : score !== null && score >= 75
      ? "border-l-green-400 bg-green-50 hover:bg-green-100"
      : score !== null && score >= 55
      ? "border-l-amber-400 bg-amber-50 hover:bg-amber-100"
      : "border-l-red-400 bg-red-50 hover:bg-red-100";

  const scorePill =
    score !== null && score >= 75
      ? "bg-green-100 text-green-700"
      : score !== null && score >= 55
      ? "bg-amber-100 text-amber-700"
      : score !== null
      ? "bg-red-100 text-red-700"
      : "";

  const statusBadge = () => {
    switch (insp.review_status) {
      case "reviewed":
        return (
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${scorePill}`}>
            ✓ {insp.last_score}
            {insp.last_package_assessment ? ` · ${insp.last_package_assessment}` : ""}
          </span>
        );
      case "changed":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 whitespace-nowrap">
            ⚠ Updated since review
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-400 whitespace-nowrap">
            Not reviewed
          </span>
        );
    }
  };

  const closedDate = insp.closed_at
    ? new Date(insp.closed_at).toLocaleDateString("en-AU", {
        day: "2-digit", month: "short", year: "numeric",
      })
    : null;

  const reviewedDate = insp.last_reviewed_at
    ? new Date(insp.last_reviewed_at).toLocaleDateString("en-AU", {
        day: "2-digit", month: "short", year: "numeric",
      })
    : null;

  return (
    <div className={`flex items-center justify-between gap-3 rounded-lg border border-l-4 px-4 py-3 transition-colors ${rowAccent}`}>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-800 truncate">{insp.name}</p>
        <div className="flex items-center gap-2 mt-0.5">
          {closedDate && (
            <p className="text-xs text-gray-400">Closed {closedDate}</p>
          )}
          {reviewedDate && (
            <>
              <span className="text-gray-300">·</span>
              <p className="text-xs text-gray-400">Reviewed {reviewedDate}</p>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {statusBadge()}
        <button
          type="button"
          onClick={onImport}
          className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 active:bg-blue-800 transition-colors whitespace-nowrap"
        >
          {insp.review_status === "not_reviewed" ? "Import & Review" : "Re-import"}
        </button>
      </div>
    </div>
  );
}

// ── EvidenceSummaryBar ─────────────────────────────────────────────────────
// A compact one-line bar showing exactly what evidence went into the review.
// Shown at the very top of the result page so you can see at a glance what
// Claude actually analysed before reading the score.

function EvidenceSummaryBar({ summary: s }: { summary: ImportSummary }) {
  // Count by type from the imported files list
  const pdfs   = s.imported_files.filter(f => f.toLowerCase().endsWith(".pdf")).length;
  const images = s.imported_files.filter(f =>
    /\.(jpg|jpeg|png|gif|webp|heic|heif|tiff?)/i.test(f)
  ).length;
  // Everything that isn't a PDF, image, or the .txt ITP form is "other"
  const itpForm = s.imported_files.filter(f => f.endsWith(".txt")).length;

  const pills: { label: string; colour: string }[] = [];
  if (itpForm > 0) pills.push({ label: `${itpForm} ITP form`, colour: "bg-blue-100 text-blue-700" });
  if (pdfs    > 0) pills.push({ label: `${pdfs} PDF${pdfs > 1 ? "s" : ""}`, colour: "bg-violet-100 text-violet-700" });
  if (images  > 0) pills.push({ label: `${images} photo${images > 1 ? "s" : ""}`, colour: "bg-emerald-100 text-emerald-700" });
  if (s.skipped_files.length > 0) pills.push({
    label: `${s.skipped_files.length} skipped`,
    colour: "bg-amber-100 text-amber-700",
  });

  const reviewedAt = new Date().toLocaleDateString("en-AU", {
    day: "2-digit", month: "short", year: "numeric",
  });

  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-400 mb-0.5">
          Imported from Procore · {reviewedAt}
        </p>
        <p className="text-sm font-semibold text-blue-900 truncate">{s.inspection_title}</p>
      </div>
      <div className="flex items-center gap-1.5 flex-wrap shrink-0">
        {pills.map((p, i) => (
          <span key={i} className={`rounded-full px-2.5 py-1 text-xs font-semibold ${p.colour}`}>
            {p.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── ImportSummaryPanel ─────────────────────────────────────────────────────
// Collapsible appendix panel showing all imported + skipped files. Lives at
// the bottom of the result page so it doesn't interrupt the report flow.

function groupSkippedByType(files: string[]): string {
  const counts: Record<string, number> = {};
  for (const f of files) {
    const ext = (f.split(".").pop() ?? "").toLowerCase();
    const type =
      /^(jpg|jpeg|png|gif|webp|heic|heif|tiff?)$/.test(ext) ? "images" :
      /^(mp4|mov|avi|mkv|wmv|m4v)$/.test(ext)               ? "videos" :
      ext === "pdf"                                           ? "PDFs"   :
      ext.length > 0                                         ? `${ext} files` :
                                                               "unknown type";
    counts[type] = (counts[type] ?? 0) + 1;
  }
  return Object.entries(counts)
    .map(([type, n]) => `${n} × ${type}`)
    .join(" · ");
}

function ImportSummaryPanel({ summary: s }: { summary: ImportSummary }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 overflow-hidden">
      {/* Header / toggle */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-3 text-left gap-3"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-500">
            Appendix A — Imported from Procore
          </p>
          <p className="text-xs text-blue-400 mt-0.5">
            {s.total_files} file{s.total_files !== 1 ? "s" : ""} sent to Claude
            {s.skipped_files.length > 0 && ` · ${s.skipped_files.length} skipped`}
          </p>
        </div>
        <span className="text-xs font-medium text-blue-400 shrink-0 select-none">
          {open ? "▾ Hide" : "▸ Show"}
        </span>
      </button>

      {open && (
        <div className="border-t border-blue-200 px-5 pb-4 pt-3 space-y-3">

          {/* Imported files list */}
          {s.imported_files.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-blue-600 mb-1.5">
                Files included in review ({s.imported_files.length})
              </p>
              <ul className="space-y-0.5">
                {s.imported_files.map((f, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-xs text-blue-800">
                    <span className="text-blue-400">•</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skipped files — grouped summary */}
          {s.skipped_files.length > 0 && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5">
              <p className="text-xs font-semibold text-amber-700 mb-0.5">
                ⚠ {s.skipped_files.length} file{s.skipped_files.length !== 1 ? "s" : ""} skipped — not sent to Claude
              </p>
              <p className="text-xs text-amber-700">
                {groupSkippedByType(s.skipped_files)}
              </p>
              <p className="mt-1.5 text-[10px] text-amber-500 italic leading-relaxed">
                Unsupported types (images, videos) and files over the size limit are excluded. PDFs are always prioritised.
              </p>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

// ── DiagnosticsPanel ────────────────────────────────────────────────────────
// Shows exactly what Procore returned for the inspection so we can tell why
// the automatic review might score lower than a manual upload. Nothing in
// here is actionable for end users — it's for debugging data completeness.

function DiagnosticsPanel({ diagnostics: d }: { diagnostics: ImportDiagnostics }) {
  return (
    <details className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3">
      <summary className="cursor-pointer select-none text-xs font-semibold uppercase tracking-widest text-slate-500">
        Appendix B — Procore data diagnostics
        <span className="ml-2 text-slate-400 font-normal">
          — {d.counts.flattenedItems} items · {d.attachments_unique} attachment(s)
        </span>
      </summary>

      <div className="mt-3 space-y-3 text-xs text-slate-700">
        {/* Project */}
        <div>
          <p className="font-semibold text-slate-500 uppercase tracking-wide mb-1">Project</p>
          <p>Loaded: <strong>{d.project_loaded ? "yes" : "no"}</strong></p>
          <p>Name: <strong>{d.project_name ?? "(none)"}</strong></p>
          <p>Number: <strong>{d.project_number ?? "(none)"}</strong></p>
          {d.project_load_error && (
            <p className="mt-1 rounded border border-red-200 bg-red-50 px-2 py-1 text-red-700">
              <span className="font-semibold">Load error:</span> {d.project_load_error}
            </p>
          )}
        </div>

        {/* Counts */}
        <div>
          <p className="font-semibold text-slate-500 uppercase tracking-wide mb-1">
            Procore response structure
          </p>
          <p>Top-level keys: <code className="text-slate-800">{d.procore_top_level_keys.join(", ")}</code></p>
          <p>items[]: <strong>{d.counts.items}</strong></p>
          <p>sections[]: <strong>{d.counts.sections}</strong></p>
          <p>responses[] (legacy): <strong>{d.counts.responses}</strong></p>
          <p>Top-level attachments: <strong>{d.counts.topLevelAttachments}</strong></p>
          <p>Flattened items used in review: <strong>{d.counts.flattenedItems}</strong></p>
        </div>

        {/* Attachments by source */}
        <div>
          <p className="font-semibold text-slate-500 uppercase tracking-wide mb-1">
            Attachments by location ({d.attachments_total} total · {d.attachments_unique} unique)
          </p>
          {Object.keys(d.attachments_by_source).length === 0 ? (
            <p className="italic text-amber-700">
              ⚠ Zero attachments found anywhere in the inspection response.
              If this ITP has photos / PDFs attached in Procore, they likely
              live on Observations or a related tool and aren&apos;t returned by
              the checklist/lists endpoint.
            </p>
          ) : (
            <ul className="space-y-0.5">
              {Object.entries(d.attachments_by_source).map(([source, count]) => (
                <li key={source}>
                  <code className="text-slate-800">{source}</code>: <strong>{count}</strong>
                </li>
              ))}
            </ul>
          )}

          {d.attachments_seen_without_url != null && d.attachments_seen_without_url > 0 && (
            <p className="mt-2 rounded border border-amber-200 bg-amber-50 px-2 py-1 text-amber-800">
              <span className="font-semibold">
                {d.attachments_seen_without_url} attachment object{d.attachments_seen_without_url > 1 ? "s were" : " was"} found
              </span>{" "}
              but no recognised URL field. The raw shape of the first such
              attachment is shown below — check for the property holding the
              download URL so we can add it to the resolver.
            </p>
          )}

          {(d.attachments_total_bytes != null || d.attachments_dropped_for_size != null) && (
            <p className="mt-2 text-slate-600">
              Included size:{" "}
              <strong>
                {d.attachments_total_bytes != null
                  ? `${(d.attachments_total_bytes / 1024 / 1024).toFixed(1)} MB`
                  : "—"}
              </strong>
              {d.attachments_dropped_for_size != null && d.attachments_dropped_for_size > 0 && (
                <>
                  {" · "}
                  <span className="text-amber-700">
                    <strong>{d.attachments_dropped_for_size}</strong> attachment
                    {d.attachments_dropped_for_size > 1 ? "s" : ""} skipped for
                    size (Claude API request limit; PDFs are prioritised, photos
                    dropped first)
                  </span>
                </>
              )}
            </p>
          )}

          {d.first_raw_attachment != null && (
            <details className="mt-2">
              <summary className="cursor-pointer select-none text-slate-600 font-semibold">
                Raw shape of first attachment (Procore JSON)
              </summary>
              <pre className="mt-1 max-h-64 overflow-auto rounded border border-slate-200 bg-white px-2 py-1.5 text-[10px] leading-snug text-slate-800">
                {JSON.stringify(d.first_raw_attachment, null, 2)}
              </pre>
            </details>
          )}
        </div>

        {/* Sample items — to show Claude actually got populated question data */}
        {d.sample_items.length > 0 && (
          <div>
            <p className="font-semibold text-slate-500 uppercase tracking-wide mb-1">
              First {d.sample_items.length} item(s) — shape check
            </p>
            <ul className="space-y-1">
              {d.sample_items.map((it, i) => (
                <li key={i} className="rounded border border-slate-200 bg-white px-2 py-1.5">
                  <p className="font-medium text-slate-800">
                    {it.position ?? "?"}. {it.description ?? "(no description)"}
                  </p>
                  <p className="text-slate-500">
                    response: <strong>{it.has_response ? "yes" : "no"}</strong> ·
                    list_item_responses: <strong>{it.has_list_item_responses ? "yes" : "no"}</strong> ·
                    answer: <strong>{it.answer ?? "(none)"}</strong> ·
                    attachments: <strong>{it.direct_attachment_count}</strong> ·
                    photos: <strong>{it.direct_photo_count ?? 0}</strong>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </details>
  );
}

// ── Shared helpers ─────────────────────────────────────────────────────────────

function Spinner({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}
