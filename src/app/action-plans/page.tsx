"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { ConvertedActionPlan } from "@/lib/actionPlanTypes";

const ALLOWED_TYPES = new Set(["application/pdf", "image/jpeg", "image/png"]);
const MAX_SIZE = 20 * 1024 * 1024;

interface SimpleProject {
  id: number;
  name: string;
  display_name: string;
  project_number: string | null;
}

interface PlanType {
  id: number;
  name: string;
  active?: boolean;
}

interface UploadResult {
  success: boolean;
  plan_id?: number;
  plan_url?: string;
  sections_created?: number;
  items_created?: number;
  error?: string;
  created_plan_id?: number | null;
}

export default function ActionPlansPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<ConvertedActionPlan | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Procore selectors
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [projects, setProjects] = useState<SimpleProject[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [planTypes, setPlanTypes] = useState<PlanType[]>([]);
  const [selectedPlanTypeId, setSelectedPlanTypeId] = useState<number | null>(null);
  const [projectsLoading, setProjectsLoading] = useState(false);

  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Load companies on mount, auto-select first
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/procore/companies");
        const data = await res.json();
        if (!res.ok) return;
        const list = data.companies ?? [];
        if (list.length > 0) {
          setCompanyId(list[0].id);
        }
      } catch { /* ignore */ }
    })();
  }, []);

  // Load projects + plan types when company is known
  useEffect(() => {
    if (!companyId) return;
    setProjectsLoading(true);
    (async () => {
      try {
        const [projRes, typesRes] = await Promise.all([
          fetch(`/api/dashboard/projects?company_id=${companyId}`),
          fetch(`/api/action-plan/plan-types?company_id=${companyId}`),
        ]);
        const projData = await projRes.json();
        const typesData = await typesRes.json();

        const projList: SimpleProject[] = projData.projects ?? [];
        setProjects(projList);

        const typesList: PlanType[] = (typesData.plan_types ?? []).filter(
          (t: PlanType) => t.active !== false
        );
        setPlanTypes(typesList);
        // Default to "Quality" if present, otherwise first
        const quality = typesList.find(
          (t) => t.name.toLowerCase() === "quality"
        );
        setSelectedPlanTypeId(quality?.id ?? typesList[0]?.id ?? null);
      } catch { /* ignore */ } finally {
        setProjectsLoading(false);
      }
    })();
  }, [companyId]);

  const handleFile = useCallback((f: File) => {
    setError(null);
    setPlan(null);
    setUploadResult(null);
    setUploadError(null);
    if (!ALLOWED_TYPES.has(f.type)) {
      setError("Unsupported file type. Use PDF, JPG, or PNG.");
      return;
    }
    if (f.size > MAX_SIZE) {
      setError(`File is too large (${(f.size / 1024 / 1024).toFixed(1)} MB). Maximum is 20 MB.`);
      return;
    }
    setFile(f);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleConvert = async () => {
    if (!file) return;
    setIsLoading(true);
    setError(null);
    setPlan(null);
    setUploadResult(null);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/action-plan/convert", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error ?? "Conversion failed.");
      } else {
        setPlan(data.plan);
      }
    } catch {
      setError("Could not reach the conversion service. Check the dev server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!plan || !selectedProjectId || !selectedPlanTypeId || !companyId) return;
    setIsUploading(true);
    setUploadError(null);
    setUploadResult(null);

    try {
      const res = await fetch("/api/action-plan/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          project_id: selectedProjectId,
          company_id: companyId,
          plan_type_id: selectedPlanTypeId,
        }),
      });
      const data: UploadResult = await res.json();
      if (data.success) {
        setUploadResult(data);
      } else {
        setUploadError(data.error ?? "Upload failed.");
        if (data.created_plan_id) {
          setUploadResult(data);
        }
      }
    } catch {
      setUploadError("Could not reach the upload service. Check the dev server.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPlan(null);
    setError(null);
    setUploadResult(null);
    setUploadError(null);
  };

  // Group activities by section
  const sections: Record<string, ConvertedActionPlan["activities"]> = {};
  if (plan) {
    for (const a of plan.activities) {
      (sections[a.section] ??= []).push(a);
    }
  }

  const canUpload = !!selectedProjectId && !!selectedPlanTypeId;

  return (
    <main className="flex-1 overflow-y-auto mx-auto max-w-3xl px-4 py-10 w-full">
      <header className="mb-8 ap-no-print">
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--hp-warm-900)" }}
        >
          Report to Action Plan
        </h1>
        <p
          className="mt-1 text-sm"
          style={{ color: "var(--hp-text-secondary)" }}
        >
          Upload a construction report and convert it into a structured Procore
          Action Plan.
        </p>
      </header>

      {/* ── Procore selectors ────────────────────────────────────────────── */}
      {!plan && (
        <div className="mb-6 ap-no-print space-y-4">
          {/* Project */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Target project
            </label>
            <select
              value={selectedProjectId ?? ""}
              onChange={(e) =>
                setSelectedProjectId(e.target.value ? Number(e.target.value) : null)
              }
              disabled={projectsLoading || projects.length === 0}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            >
              <option value="">
                {projectsLoading
                  ? "Loading projects\u2026"
                  : projects.length === 0
                    ? "No projects available"
                    : "\u2014 Choose a project \u2014"}
              </option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.project_number ? `${p.project_number} \u2014 ` : ""}
                  {p.display_name || p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Plan type */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Plan type
            </label>
            <select
              value={selectedPlanTypeId ?? ""}
              onChange={(e) =>
                setSelectedPlanTypeId(e.target.value ? Number(e.target.value) : null)
              }
              disabled={planTypes.length === 0}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            >
              <option value="">
                {planTypes.length === 0
                  ? "No plan types available"
                  : "\u2014 Choose a plan type \u2014"}
              </option>
              {planTypes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* ── Upload zone ─────────────────────────────────────────────────── */}
      {!plan && (
        <div className="ap-no-print">
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className="cursor-pointer rounded-lg border-2 border-dashed p-10 text-center transition-colors"
            style={{
              borderColor: isDragging ? "var(--hp-accent)" : "var(--hp-border)",
              backgroundColor: isDragging ? "var(--hp-warm-100)" : "var(--hp-surface)",
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
            {file ? (
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--hp-warm-800)" }}>
                  {file.name}
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--hp-text-muted)" }}>
                  {(file.size / 1024 / 1024).toFixed(1)} MB &middot; Click or drag to replace
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--hp-warm-700)" }}>
                  Drop a report here, or click to select
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--hp-text-muted)" }}>
                  PDF, JPG, or PNG &middot; Max 20 MB
                </p>
              </div>
            )}
          </div>

          {error && (
            <div
              className="mt-4 rounded-lg px-4 py-3 text-sm font-medium"
              style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b" }}
            >
              {error}
            </div>
          )}

          <button
            onClick={handleConvert}
            disabled={!file || isLoading}
            className="mt-4 w-full rounded-lg bg-amber-600 px-4 py-3 text-sm font-semibold text-white hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading
              ? "Converting\u2026 this can take up to a minute"
              : "Convert to Action Plan"}
          </button>
        </div>
      )}

      {/* ── Preview ─────────────────────────────────────────────────────── */}
      {plan && (
        <div>
          {/* Notice banner + Export PDF */}
          <div
            className="mb-6 rounded-lg px-4 py-3 text-sm flex items-center justify-between ap-no-print"
            style={{
              backgroundColor: "var(--hp-warm-100)",
              border: "1px solid var(--hp-border)",
              color: "var(--hp-warm-800)",
            }}
          >
            <span>Preview only &mdash; nothing has been sent to Procore.</span>
            <button
              onClick={() => window.print()}
              className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-500 transition-colors shrink-0 ml-4"
            >
              Export PDF
            </button>
          </div>

          {/* Plan metadata */}
          <div
            className="rounded-lg p-5 mb-6"
            style={{
              backgroundColor: "var(--hp-surface)",
              border: "1px solid var(--hp-border)",
            }}
          >
            <h2
              className="text-lg font-bold mb-3"
              style={{ color: "var(--hp-warm-900)" }}
            >
              {plan.action_plan_name}
            </h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <MetaRow label="Source document" value={plan.source_document} />
              <MetaRow label="Report title" value={plan.report_title} />
              <MetaRow label="Report date" value={plan.report_date} />
              <MetaRow label="Author" value={plan.report_author} />
              <MetaRow label="Company" value={plan.report_company} />
            </div>
            <p
              className="mt-3 text-sm"
              style={{ color: "var(--hp-text-secondary)" }}
            >
              {plan.description}
            </p>
          </div>

          {/* Activities by section */}
          {Object.entries(sections).map(([sectionName, items], sectionIdx) => (
            <div key={sectionName} className="mb-6">
              <h3
                className="text-sm font-semibold uppercase tracking-wide mb-3"
                style={{ color: "var(--hp-warm-700)" }}
              >
                {sectionName}
              </h3>
              <div className="space-y-3">
                {items.map((a, itemIdx) => (
                  <div
                    key={a.sequence}
                    className="rounded-lg p-4"
                    style={{
                      backgroundColor: "var(--hp-surface)",
                      border: "1px solid var(--hp-border)",
                    }}
                  >
                    <div className="flex items-baseline gap-3 mb-1">
                      <span
                        className="text-xs font-mono font-semibold"
                        style={{ color: "var(--hp-text-muted)" }}
                      >
                        {sectionIdx + 1}.{itemIdx + 1}
                      </span>
                      {a.original_item_number && (
                        <span
                          className="text-xs"
                          style={{ color: "var(--hp-text-muted)" }}
                        >
                          ({a.original_item_number})
                        </span>
                      )}
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--hp-warm-900)" }}
                      >
                        {a.activity_title}
                      </span>
                    </div>
                    {a.acceptance_criteria && (
                      <p
                        className="text-sm mt-2"
                        style={{ color: "var(--hp-text-secondary)" }}
                      >
                        <span
                          className="font-medium"
                          style={{ color: "var(--hp-warm-700)" }}
                        >
                          Acceptance criteria:
                        </span>{" "}
                        {a.acceptance_criteria}
                      </p>
                    )}
                    {a.source_reference && (
                      <p
                        className="text-xs mt-1"
                        style={{ color: "var(--hp-text-muted)" }}
                      >
                        {a.source_reference}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* ── Upload to Procore ───────────────────────────────────────── */}
          <div className="mt-8 ap-no-print">
            {/* Upload error */}
            {uploadError && (
              <div
                className="mb-4 rounded-lg px-4 py-3 text-sm font-medium"
                style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b" }}
              >
                <p>{uploadError}</p>
                {uploadResult?.created_plan_id && (
                  <p className="mt-1 text-xs">
                    A partial plan was created in Procore &mdash; delete plan{" "}
                    <strong>{uploadResult.created_plan_id}</strong> before retrying.
                  </p>
                )}
              </div>
            )}

            {/* Success panel */}
            {uploadResult?.success && (
              <div
                className="mb-4 rounded-lg px-4 py-4 text-sm"
                style={{
                  backgroundColor: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  color: "#166534",
                }}
              >
                <p className="font-semibold mb-1">
                  Action Plan created in Procore
                </p>
                <p>
                  {uploadResult.sections_created} section{uploadResult.sections_created === 1 ? "" : "s"},{" "}
                  {uploadResult.items_created} item{uploadResult.items_created === 1 ? "" : "s"} created.
                </p>
                <p className="mt-1 text-xs" style={{ color: "#15803d" }}>
                  The plan is in <strong>Draft</strong> status. Open it in Procore to review and publish.
                </p>
                {uploadResult.plan_url && (
                  <a
                    href={uploadResult.plan_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium underline"
                    style={{ color: "#166534" }}
                  >
                    Open in Procore &rarr;
                  </a>
                )}
              </div>
            )}

            {/* Upload button (hidden after success) */}
            {!uploadResult?.success && (
              <>
                {!canUpload && (
                  <p
                    className="mb-2 text-xs"
                    style={{ color: "var(--hp-text-muted)" }}
                  >
                    {!selectedProjectId && !selectedPlanTypeId
                      ? "Select a project and plan type above before uploading."
                      : !selectedProjectId
                        ? "Select a project above before uploading."
                        : "Select a plan type above before uploading."}
                  </p>
                )}
                <button
                  onClick={handleUpload}
                  disabled={!canUpload || isUploading}
                  className="w-full rounded-lg bg-amber-600 px-4 py-3 text-sm font-semibold text-white hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {isUploading
                    ? "Uploading to Procore\u2026 this can take a minute on a long report"
                    : "Upload to Procore"}
                </button>
              </>
            )}
          </div>

          {/* Summary + reset */}
          <div className="flex items-center justify-between mt-6 ap-no-print">
            <p
              className="text-xs"
              style={{ color: "var(--hp-text-muted)" }}
            >
              {plan.activities.length} activit{plan.activities.length === 1 ? "y" : "ies"} across{" "}
              {Object.keys(sections).length} section{Object.keys(sections).length === 1 ? "" : "s"}
            </p>
            <button
              onClick={handleReset}
              className="text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: "var(--hp-accent)" }}
            >
              Convert another
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function MetaRow({ label, value }: { label: string; value: string | null }) {
  return (
    <>
      <span className="text-xs font-medium" style={{ color: "var(--hp-text-muted)" }}>
        {label}
      </span>
      <span className="text-sm" style={{ color: "var(--hp-warm-800)" }}>
        {value ?? "\u2014"}
      </span>
    </>
  );
}
