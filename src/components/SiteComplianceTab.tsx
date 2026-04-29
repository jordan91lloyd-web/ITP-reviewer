"use client";

// ─── SiteComplianceTab ─────────────────────────────────────────────────────────
// Weekly traffic-light compliance view across all Fleek projects.
// Combines Breadcrumb CSV exports with live Procore site diary data.

import { useState, useEffect, useCallback } from "react";
import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import SiteComplianceCsvUpload from "./SiteComplianceCsvUpload";

// ── Types ──────────────────────────────────────────────────────────────────────

interface DashboardProject {
  id: number;
  name: string;
  display_name: string;
  project_number?: string | null;
}

interface SiteMapping {
  id: string;
  company_id: string;
  breadcrumb_site_name: string;
  procore_project_id: string;
}

interface DiaryResult {
  open_count: number | null;
  total_days: number;
  entries: { date: string; status: string | null }[];
}

type TrafficLight = "green" | "amber" | "red" | "gray";

interface SiteRow {
  site: string;
  mappedProjectId: string | null;
  // Briefings KPIs
  prestartCount: number;   // days this week with a prestart (of 5)
  toolboxDone: boolean;    // at least 1 toolbox in last 7 days
  // Approvals KPIs
  pendingInductions: number;
  pendingDocs: number;
  // Detail rows for expansion
  pendingInductionDetails: Array<{ title: string; supplier: string; dateSubmitted: string }>;
  pendingDocDetails: Array<{ title: string; supplier: string; dateSubmitted: string }>;
  oldestPendingDate: string | null;
  // Procore diary (filled in async)
  diary: DiaryResult | null;
  diaryLoading: boolean;
}

// ── Week helpers ───────────────────────────────────────────────────────────────

function getCurrentWeekBounds(): { monday: Date; friday: Date } {
  const today = new Date();
  const dow = today.getDay(); // 0=Sun … 6=Sat
  const daysToMonday = dow === 0 ? 6 : dow - 1;
  const monday = new Date(today);
  monday.setDate(today.getDate() - daysToMonday);
  monday.setHours(0, 0, 0, 0);
  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);
  friday.setHours(23, 59, 59, 999);
  return { monday, friday };
}

function fmtWeekLabel(): string {
  const { monday, friday } = getCurrentWeekBounds();
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
  const optsYear: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
  return `Week of ${monday.toLocaleDateString("en-AU", opts)} – ${friday.toLocaleDateString("en-AU", optsYear)}`;
}

function toDateString(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// ── Traffic light helpers ──────────────────────────────────────────────────────

function lightClasses(light: TrafficLight): string {
  return {
    green: "bg-green-50 text-green-700 border border-green-200",
    amber: "bg-amber-50 text-amber-700 border border-amber-200",
    red:   "bg-red-50   text-red-700   border border-red-200",
    gray:  "bg-gray-50  text-gray-500  border border-gray-200",
  }[light];
}

function prestartLight(count: number): TrafficLight {
  if (count >= 5) return "green";
  if (count >= 3) return "amber";
  return "red";
}

function toolboxLight(done: boolean): TrafficLight {
  return done ? "green" : "red";
}

function countLight(count: number): TrafficLight {
  if (count === 0) return "green";
  if (count <= 3) return "amber";
  return "red";
}

function diaryLight(result: DiaryResult | null): TrafficLight {
  if (!result || result.open_count === null) return "gray";
  if (result.open_count === 0) return "green";
  if (result.open_count <= 2) return "amber";
  return "red";
}

function overallLight(lights: TrafficLight[]): TrafficLight {
  const active = lights.filter(l => l !== "gray");
  if (active.some(l => l === "red")) return "red";
  if (active.some(l => l === "amber")) return "amber";
  if (active.length > 0 && active.every(l => l === "green")) return "green";
  return "gray";
}

// ── KPI calculation ────────────────────────────────────────────────────────────

function calcPrestartCount(
  briefingRows: Record<string, string>[],
  site: string,
  monday: Date,
  friday: Date
): number {
  const daysWithPrestart = new Set<string>();
  for (const row of briefingRows) {
    if (row["Site"] !== site) continue;
    const type = (row["Site Briefing Type"] ?? "").toLowerCase();
    if (!type.includes("daily prestart")) continue;
    const d = new Date(row["Date Submitted"] ?? "");
    if (isNaN(d.getTime())) continue;
    if (d < monday || d > friday) continue;
    const dow = d.getDay();
    if (dow >= 1 && dow <= 5) daysWithPrestart.add(d.toDateString());
  }
  return daysWithPrestart.size;
}

function calcToolboxDone(briefingRows: Record<string, string>[], site: string): boolean {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  return briefingRows.some(row => {
    if (row["Site"] !== site) return false;
    const type = (row["Site Briefing Type"] ?? "").toLowerCase();
    if (!type.includes("toolbox")) return false;
    const d = new Date(row["Date Submitted"] ?? "");
    return !isNaN(d.getTime()) && d >= sevenDaysAgo;
  });
}

function calcApprovalKPIs(approvalRows: Record<string, string>[], site: string) {
  const pendingInductionDetails: SiteRow["pendingInductionDetails"] = [];
  const pendingDocDetails: SiteRow["pendingDocDetails"] = [];
  let oldestPendingDate: string | null = null;

  for (const row of approvalRows) {
    if (row["Site"] !== site) continue;
    const status = (row["Status"] ?? "").toLowerCase();
    if (status !== "pending") continue;

    const dateSubmitted = row["Date Submitted"] ?? "";
    if (dateSubmitted) {
      const d = new Date(dateSubmitted);
      if (!isNaN(d.getTime())) {
        if (!oldestPendingDate || d < new Date(oldestPendingDate)) {
          oldestPendingDate = dateSubmitted;
        }
      }
    }

    const type = (row["Type"] ?? "").toLowerCase();
    if (type === "induction") {
      pendingInductionDetails.push({
        title:         row["Title"] ?? row["Full Name"] ?? "—",
        supplier:      row["Supplier"] ?? "—",
        dateSubmitted,
      });
    } else if (type === "sitesupplierdocument") {
      pendingDocDetails.push({
        title:         row["Title"] ?? "—",
        supplier:      row["Supplier"] ?? "—",
        dateSubmitted,
      });
    }
  }

  return {
    pendingInductions: pendingInductionDetails.length,
    pendingDocs:       pendingDocDetails.length,
    pendingInductionDetails,
    pendingDocDetails,
    oldestPendingDate,
  };
}

// ── Stale data check ───────────────────────────────────────────────────────────

function isDataStale(rows: Record<string, string>[], dateCol: string): boolean {
  let latest: Date | null = null;
  for (const row of rows) {
    const d = new Date(row[dateCol] ?? "");
    if (!isNaN(d.getTime()) && (latest === null || d > latest)) latest = d;
  }
  if (!latest) return false;
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  return latest < sevenDaysAgo;
}

// ── Pill component ─────────────────────────────────────────────────────────────

function Pill({ light, children }: { light: TrafficLight; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${lightClasses(light)}`}>
      {children}
    </span>
  );
}

// ── Spinner ────────────────────────────────────────────────────────────────────

function Spinner({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className} text-gray-400`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

interface Props {
  companyId: number | null;
  projects: DashboardProject[];
  isAdmin: boolean;
}

export default function SiteComplianceTab({ companyId, projects, isAdmin }: Props) {
  const [csvBriefings, setCsvBriefings]         = useState<Record<string, string>[] | null>(null);
  const [csvApprovals, setCsvApprovals]         = useState<Record<string, string>[] | null>(null);
  const [lastUpdated, setLastUpdated]           = useState<Date | null>(null);

  const [mappings, setMappings]                 = useState<SiteMapping[]>([]);
  const [siteRows, setSiteRows]                 = useState<SiteRow[]>([]);
  const [expandedSite, setExpandedSite]         = useState<string | null>(null);

  // Pending mapping selections (unsaved per-site)
  const [pendingMaps, setPendingMaps]           = useState<Map<string, string>>(new Map());
  const [savingMap, setSavingMap]               = useState<string | null>(null);
  const [mapSaveError, setMapSaveError]         = useState<Map<string, string>>(new Map());

  const hasData = csvBriefings !== null || csvApprovals !== null;
  const hasBoth = csvBriefings !== null && csvApprovals !== null;

  // ── Load mappings on mount ───────────────────────────────────────────────────

  useEffect(() => {
    if (!companyId) return;
    fetch(`/api/dashboard/site-mappings?company_id=${companyId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => setMappings(data?.mappings ?? []))
      .catch(() => {});
  }, [companyId]);

  // ── Compute siteRows when CSVs or mappings change ────────────────────────────

  const buildSiteRows = useCallback(
    (briefings: Record<string, string>[] | null, approvals: Record<string, string>[] | null, currentMappings: SiteMapping[]) => {
      const { monday, friday } = getCurrentWeekBounds();

      // Union of unique sites from both CSVs
      const allSites = new Set<string>();
      for (const row of briefings ?? []) if (row["Site"]) allSites.add(row["Site"]);
      for (const row of approvals ?? []) if (row["Site"]) allSites.add(row["Site"]);

      const mapBySite = new Map<string, string>(
        currentMappings.map(m => [m.breadcrumb_site_name, m.procore_project_id])
      );

      const rows: SiteRow[] = Array.from(allSites).sort().map(site => {
        const mappedProjectId = mapBySite.get(site) ?? null;
        const approvalKPIs = calcApprovalKPIs(approvals ?? [], site);

        return {
          site,
          mappedProjectId,
          prestartCount: calcPrestartCount(briefings ?? [], site, monday, friday),
          toolboxDone:   calcToolboxDone(briefings ?? [], site),
          ...approvalKPIs,
          diary:        null,
          diaryLoading: !!mappedProjectId,
        };
      });

      setSiteRows(rows);
      return rows;
    },
    []
  );

  // ── Fetch diary data for all mapped projects ─────────────────────────────────

  const loadDiaries = useCallback(
    async (rows: SiteRow[]) => {
      if (!companyId) return;
      const { monday, friday } = getCurrentWeekBounds();
      const startDate = toDateString(monday);
      const endDate   = toDateString(friday);

      // De-duplicate project IDs (multiple sites can map to same project)
      const projectIds = Array.from(
        new Set(rows.filter(r => r.mappedProjectId).map(r => r.mappedProjectId!))
      );
      if (projectIds.length === 0) return;

      // Fetch all simultaneously
      const results = await Promise.all(
        projectIds.map(async pid => {
          try {
            const res = await fetch(
              `/api/dashboard/site-diaries?project_id=${pid}&company_id=${companyId}&start_date=${startDate}&end_date=${endDate}`
            );
            const data: DiaryResult = res.ok
              ? await res.json()
              : { open_count: null, total_days: 5, entries: [] };
            return { pid, data };
          } catch {
            return { pid, data: { open_count: null, total_days: 5, entries: [] } as DiaryResult };
          }
        })
      );

      const diaryMap = new Map(results.map(r => [r.pid, r.data]));

      setSiteRows(prev =>
        prev.map(row => ({
          ...row,
          diary:        row.mappedProjectId ? (diaryMap.get(row.mappedProjectId) ?? null) : null,
          diaryLoading: false,
        }))
      );
    },
    [companyId]
  );

  // When both CSVs loaded or mappings change, rebuild + fetch diaries
  useEffect(() => {
    const rows = buildSiteRows(csvBriefings, csvApprovals, mappings);
    if (hasData) void loadDiaries(rows);
  }, [csvBriefings, csvApprovals, mappings, buildSiteRows, loadDiaries, hasData]);

  // ── CSV handlers ─────────────────────────────────────────────────────────────

  function handleBriefingsParsed(rows: Record<string, string>[], _name: string, uploadTime: Date) {
    setCsvBriefings(rows);
    setLastUpdated(prev => (!prev || uploadTime > prev) ? uploadTime : prev);
  }

  function handleApprovalsParsed(rows: Record<string, string>[], _name: string, uploadTime: Date) {
    setCsvApprovals(rows);
    setLastUpdated(prev => (!prev || uploadTime > prev) ? uploadTime : prev);
  }

  // ── Mapping save ─────────────────────────────────────────────────────────────

  async function handleSaveMapping(site: string) {
    const projectId = pendingMaps.get(site);
    if (!projectId || !companyId) return;

    setSavingMap(site);
    setMapSaveError(prev => { const m = new Map(prev); m.delete(site); return m; });

    try {
      const res = await fetch("/api/dashboard/site-mappings", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          company_id:            String(companyId),
          breadcrumb_site_name:  site,
          procore_project_id:    projectId,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setMapSaveError(prev => new Map(prev).set(site, data.error ?? "Save failed"));
        return;
      }
      // Refresh mappings
      const updatedRes = await fetch(`/api/dashboard/site-mappings?company_id=${companyId}`);
      const data = await updatedRes.json();
      setMappings(data?.mappings ?? []);
    } catch {
      setMapSaveError(prev => new Map(prev).set(site, "Network error — please retry"));
    } finally {
      setSavingMap(null);
    }
  }

  // ── Summary stats ────────────────────────────────────────────────────────────

  const trackedSites = siteRows.length;

  const siteLights = siteRows.map(row => {
    const lights: TrafficLight[] = [
      prestartLight(row.prestartCount),
      toolboxLight(row.toolboxDone),
      countLight(row.pendingInductions),
      countLight(row.pendingDocs),
      diaryLight(row.diary),
    ];
    return overallLight(lights);
  });

  const actionRequired = siteLights.filter(l => l === "red").length;
  const onTrack        = siteLights.filter(l => l === "green" || l === "amber").length;
  const totalPending   = siteRows.reduce((s, r) => s + r.pendingInductions + r.pendingDocs, 0);

  const isStale =
    (csvBriefings && isDataStale(csvBriefings, "Date Submitted")) ||
    (csvApprovals && isDataStale(csvApprovals, "Date Submitted"));

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-7xl px-6 py-6 space-y-6">

        {/* ── Header ── */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Site Compliance</h1>
            <p className="text-sm text-gray-500 mt-0.5">{fmtWeekLabel()}</p>
            {lastUpdated && (
              <p className="text-xs text-gray-400 mt-0.5">
                Last updated {lastUpdated.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" })}
              </p>
            )}
          </div>
        </div>

        {/* ── Stale data warning ── */}
        {isStale && (
          <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
            <p className="text-sm text-amber-700">
              These reports may be from a previous week. Please upload fresh exports from Breadcrumb.
            </p>
          </div>
        )}

        {/* ── CSV upload zones ── */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Breadcrumb Exports
          </p>
          <SiteComplianceCsvUpload
            onBriefingsParsed={handleBriefingsParsed}
            onApprovalsParsed={handleApprovalsParsed}
          />
        </div>

        {/* ── Empty state ── */}
        {!hasData && (
          <div className="rounded-xl border border-gray-200 bg-white px-8 py-16 text-center">
            <p className="text-sm font-medium text-gray-700">
              Upload your weekly Breadcrumb exports to populate the compliance report.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Procore data loads automatically.
            </p>
          </div>
        )}

        {/* ── Summary stat cards ── */}
        {hasData && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Sites tracked",       value: trackedSites,  note: "from CSV" },
              { label: "Action required",     value: actionRequired, note: "1+ red KPI", highlight: actionRequired > 0 },
              { label: "Total pending approvals", value: totalPending, note: "inductions + docs" },
              { label: "On track",            value: onTrack,       note: "no red KPIs" },
            ].map(({ label, value, note, highlight }) => (
              <div key={label} className={`rounded-xl border bg-white px-5 py-4 ${highlight ? "border-red-200" : "border-gray-200"}`}>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</p>
                <p className={`mt-1 text-3xl font-bold ${highlight ? "text-red-600" : "text-gray-900"}`}>{value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{note}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Compliance table ── */}
        {hasData && siteRows.length > 0 && (
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-400 w-48">Site</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Daily Prestart</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Toolbox Talk</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Pending Inductions</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Pending SWMS/Docs</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Open Site Diaries</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Overall</th>
                  <th className="px-4 py-3 w-8" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {siteRows.map((row, idx) => {
                  const preLight    = prestartLight(row.prestartCount);
                  const tbLight     = toolboxLight(row.toolboxDone);
                  const indLight    = countLight(row.pendingInductions);
                  const docLight    = countLight(row.pendingDocs);
                  const dLight      = diaryLight(row.diary);
                  const overall     = overallLight([preLight, tbLight, indLight, docLight, dLight]);
                  const isExpanded  = expandedSite === row.site;

                  const project = row.mappedProjectId
                    ? projects.find(p => String(p.id) === row.mappedProjectId) ?? null
                    : null;

                  return (
                    <>
                      <tr
                        key={row.site}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => setExpandedSite(isExpanded ? null : row.site)}
                      >
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900 text-xs leading-tight">{row.site}</div>
                          {project && (
                            <div className="text-[10px] text-gray-400 mt-0.5 truncate">
                              {project.display_name || project.name}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <Pill light={preLight}>{row.prestartCount}/5</Pill>
                        </td>
                        <td className="px-4 py-3">
                          <Pill light={tbLight}>{row.toolboxDone ? "Done" : "Missing"}</Pill>
                        </td>
                        <td className="px-4 py-3">
                          <Pill light={indLight}>
                            {row.pendingInductions === 0 ? "Clear" : `${row.pendingInductions} pending`}
                          </Pill>
                        </td>
                        <td className="px-4 py-3">
                          <Pill light={docLight}>
                            {row.pendingDocs === 0 ? "Clear" : `${row.pendingDocs} pending`}
                          </Pill>
                        </td>
                        <td className="px-4 py-3">
                          {row.diaryLoading ? (
                            <Spinner />
                          ) : row.diary === null ? (
                            <Pill light="gray">—</Pill>
                          ) : (
                            <Pill light={dLight}>
                              {row.diary.open_count === null
                                ? "—"
                                : row.diary.open_count === 0
                                  ? "All closed"
                                  : `${row.diary.open_count} open`}
                            </Pill>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <Pill light={overall}>
                            {{ green: "On track", amber: "Attention", red: "Action needed", gray: "—" }[overall]}
                          </Pill>
                        </td>
                        <td className="px-4 py-3 text-gray-400">
                          {isExpanded
                            ? <ChevronUp className="h-4 w-4" />
                            : <ChevronDown className="h-4 w-4" />}
                        </td>
                      </tr>

                      {/* ── Expanded detail row ── */}
                      {isExpanded && (
                        <tr key={`${row.site}-detail`}>
                          <td colSpan={8} className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                              {/* Pending inductions */}
                              {row.pendingInductionDetails.length > 0 && (
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                                    Pending Inductions ({row.pendingInductionDetails.length})
                                  </p>
                                  <ul className="space-y-1.5">
                                    {row.pendingInductionDetails.map((d, i) => (
                                      <li key={i} className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs">
                                        <p className="font-semibold text-gray-800">{d.title}</p>
                                        <p className="text-gray-500">{d.supplier}</p>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Pending SWMS/Docs */}
                              {row.pendingDocDetails.length > 0 && (
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                                    Pending SWMS / Docs ({row.pendingDocDetails.length})
                                  </p>
                                  <ul className="space-y-1.5">
                                    {row.pendingDocDetails.map((d, i) => (
                                      <li key={i} className="rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-xs">
                                        <p className="font-semibold text-gray-800">{d.title}</p>
                                        <p className="text-gray-500">{d.supplier}</p>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Site diary entries */}
                              {row.diary && row.diary.entries.length > 0 && (
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                                    Site Diary — This Week
                                  </p>
                                  <ul className="space-y-1">
                                    {row.diary.entries.map(entry => {
                                      const isOpen = !entry.status ||
                                        (entry.status !== "approved" && entry.status !== "submitted");
                                      return (
                                        <li key={entry.date} className="flex items-center justify-between text-xs">
                                          <span className="text-gray-600">
                                            {new Date(entry.date + "T00:00:00").toLocaleDateString("en-AU", {
                                              weekday: "short", day: "numeric", month: "short",
                                            })}
                                          </span>
                                          <span className={`rounded-full px-2 py-0.5 font-medium ${
                                            isOpen
                                              ? "bg-red-100 text-red-700"
                                              : "bg-green-100 text-green-700"
                                          }`}>
                                            {entry.status ?? "Missing"}
                                          </span>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              )}

                              {/* Oldest pending */}
                              {row.oldestPendingDate && (
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                                    Oldest pending approval
                                  </p>
                                  <p className="text-xs text-gray-700">
                                    {new Date(row.oldestPendingDate).toLocaleDateString("en-AU", {
                                      day: "numeric", month: "short", year: "numeric",
                                    })}
                                  </p>
                                </div>
                              )}

                              {/* No detail content */}
                              {row.pendingInductionDetails.length === 0 &&
                               row.pendingDocDetails.length === 0 &&
                               (!row.diary || row.diary.entries.length === 0) && (
                                <p className="text-xs text-gray-400 col-span-full">No detail data available.</p>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Site mapping manager (admin only) ── */}
        {isAdmin && hasData && siteRows.length > 0 && (
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="border-b border-gray-200 px-5 py-3 bg-gray-50">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Site → Project Mapping
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Map each Breadcrumb site address to its Procore project to enable site diary tracking.
              </p>
            </div>
            <div className="divide-y divide-gray-100">
              {siteRows.map(row => {
                const currentMapping = mappings.find(m => m.breadcrumb_site_name === row.site);
                const pendingValue   = pendingMaps.get(row.site) ?? currentMapping?.procore_project_id ?? "";
                const hasChange      = pendingValue !== (currentMapping?.procore_project_id ?? "");
                const isSaving       = savingMap === row.site;
                const saveErr        = mapSaveError.get(row.site);

                return (
                  <div key={row.site} className="px-5 py-3 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">{row.site}</p>
                      {saveErr && <p className="text-xs text-red-500 mt-0.5">{saveErr}</p>}
                    </div>
                    <select
                      value={pendingValue}
                      onChange={e => setPendingMaps(prev => new Map(prev).set(row.site, e.target.value))}
                      disabled={isSaving}
                      className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 min-w-[220px]"
                    >
                      <option value="">— No mapping —</option>
                      {projects.map(p => (
                        <option key={p.id} value={String(p.id)}>
                          {p.display_name || p.name}
                          {p.project_number ? ` (#${p.project_number})` : ""}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      disabled={!hasChange || isSaving || !pendingValue}
                      onClick={() => handleSaveMapping(row.site)}
                      className="shrink-0 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isSaving ? "Saving…" : "Save"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
