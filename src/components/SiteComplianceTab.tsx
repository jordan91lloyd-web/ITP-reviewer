"use client";

// ─── SiteComplianceTab ─────────────────────────────────────────────────────────
// Weekly traffic-light compliance view across all Fleek projects.
// Combines Breadcrumb CSV exports (or live Breadcrumb API) with live Procore
// site diary data. Saves and loads reports from Supabase.

import { useState, useEffect, useCallback, useRef } from "react";
import { AlertTriangle, ChevronDown, ChevronUp, CheckCircle, Clock } from "lucide-react";
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
  source: "daily_logs" | "notes_logs" | null;
}

type TrafficLight = "green" | "amber" | "red" | "gray";

interface SiteRow {
  site: string;
  mappedProjectId: string | null;
  prestartCount: number;
  toolboxDone: boolean;
  pendingInductions: number;
  pendingDocs: number;
  pendingInductionDetails: Array<{ title: string; supplier: string; dateSubmitted: string }>;
  pendingDocDetails: Array<{ title: string; supplier: string; dateSubmitted: string }>;
  oldestPendingDate: string | null;
  diary: DiaryResult | null;
  diaryLoading: boolean;
}

interface ReportHistoryItem {
  id: string;
  report_week_start: string;
  report_week_end: string;
  uploaded_at: string;
  uploaded_by: string;
  site_briefings_filename: string | null;
  approvals_filename: string | null;
  site_count: number;
}

interface SavedReportMeta {
  id: string;
  report_week_start: string;
  report_week_end: string;
  uploaded_at: string;
}

// ── Week helpers ───────────────────────────────────────────────────────────────

function getCurrentWeekBounds(): { monday: Date; friday: Date } {
  const today = new Date();
  const dow = today.getDay();
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

function fmtDateLabel(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
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
function toolboxLight(done: boolean): TrafficLight { return done ? "green" : "red"; }
function countLight(count: number): TrafficLight {
  if (count === 0) return "green";
  if (count <= 3)  return "amber";
  return "red";
}
function diaryLight(result: DiaryResult | null): TrafficLight {
  if (!result || result.open_count === null) return "gray";
  if (result.open_count === 0)  return "green";
  if (result.open_count <= 2)   return "amber";
  return "red";
}
function overallLight(lights: TrafficLight[]): TrafficLight {
  const active = lights.filter(l => l !== "gray");
  if (active.some(l => l === "red"))   return "red";
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
  const days = new Set<string>();
  for (const row of briefingRows) {
    if (row["Site"] !== site) continue;
    if (!(row["Site Briefing Type"] ?? "").toLowerCase().includes("daily prestart")) continue;
    const d = new Date(row["Date Submitted"] ?? "");
    if (isNaN(d.getTime())) continue;
    if (d < monday || d > friday) continue;
    const dow = d.getDay();
    if (dow >= 1 && dow <= 5) days.add(d.toDateString());
  }
  return days.size;
}

function calcToolboxDone(briefingRows: Record<string, string>[], site: string): boolean {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  return briefingRows.some(row => {
    if (row["Site"] !== site) return false;
    if (!(row["Site Briefing Type"] ?? "").toLowerCase().includes("toolbox")) return false;
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
    if ((row["Status"] ?? "").toLowerCase() !== "pending") continue;

    const dateSubmitted = row["Date Submitted"] ?? "";
    if (dateSubmitted) {
      const d = new Date(dateSubmitted);
      if (!isNaN(d.getTime()) && (!oldestPendingDate || d < new Date(oldestPendingDate))) {
        oldestPendingDate = dateSubmitted;
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
        title:    row["Title"] ?? "—",
        supplier: row["Supplier"] ?? "—",
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

// ── Small UI components ────────────────────────────────────────────────────────

function Pill({ light, children }: { light: TrafficLight; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${lightClasses(light)}`}>
      {children}
    </span>
  );
}

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

// Stable key for deduplicating auto-saves: "{briefingsFilename}|{approvalsFilename}"
function csvSaveKey(briefings: string | null, approvals: string | null): string {
  return `${briefings ?? ""}|${approvals ?? ""}`;
}

export default function SiteComplianceTab({ companyId, projects, isAdmin }: Props) {
  const [csvBriefings, setCsvBriefings] = useState<Record<string, string>[] | null>(null);
  const [csvApprovals, setCsvApprovals] = useState<Record<string, string>[] | null>(null);
  const [lastUpdated, setLastUpdated]   = useState<Date | null>(null);

  // Raw CSV text for Supabase persistence
  const [rawBriefingsCsv, setRawBriefingsCsv]       = useState<string | null>(null);
  const [rawApprovalsCsv, setRawApprovalsCsv]        = useState<string | null>(null);
  const [briefingsFilename, setBriefingsFilename]     = useState<string | null>(null);
  const [approvalsFilename, setApprovalsFilename]     = useState<string | null>(null);

  // Saved report state
  const [savedReportMeta, setSavedReportMeta]         = useState<SavedReportMeta | null>(null);
  const [reportHistory, setReportHistory]             = useState<ReportHistoryItem[]>([]);
  const [historyOpen, setHistoryOpen]                 = useState(false);
  const [isSavingReport, setIsSavingReport]           = useState(false);
  const [reportSaveError, setReportSaveError]         = useState<string | null>(null);
  const lastSavedCsvKey = useRef<string>("");

  // Breadcrumb API mode
  const [breadcrumbMode, setBreadcrumbMode]           = useState<"csv" | "api" | "checking">("checking");

  const [mappings, setMappings]         = useState<SiteMapping[]>([]);
  const [siteRows, setSiteRows]         = useState<SiteRow[]>([]);
  const [expandedSite, setExpandedSite] = useState<string | null>(null);

  // Pending mapping selections (local, unsaved)
  const [pendingMaps, setPendingMaps]   = useState<Map<string, string>>(new Map());
  const [savingMap, setSavingMap]       = useState<string | null>(null);
  const [mapSaveError, setMapSaveError] = useState<Map<string, string>>(new Map());

  // Ref for scrolling to the mapping section
  const mappingSectionRef = useRef<HTMLDivElement>(null);

  const hasData = csvBriefings !== null || csvApprovals !== null;

  // ── On-mount: check Breadcrumb API, load mappings, load saved report & history

  useEffect(() => {
    if (!companyId) return;

    // Check whether the Breadcrumb API is configured by calling one of the
    // scaffold routes. If it returns source=env_missing we stay in CSV mode.
    fetch(`/api/breadcrumb/site-briefings?company_id=${companyId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.source === "breadcrumb_api") {
          setBreadcrumbMode("api");
          // Populate CSVs from live API data so KPI logic re-uses the same
          // calculation functions without changes.
          if (Array.isArray(data.rows) && data.rows.length > 0) {
            setCsvBriefings(data.rows);
            setLastUpdated(new Date());
          }
        } else {
          setBreadcrumbMode("csv");
        }
      })
      .catch(() => setBreadcrumbMode("csv"));

    // Load site mappings
    fetch(`/api/dashboard/site-mappings?company_id=${companyId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => setMappings(data?.mappings ?? []))
      .catch(() => {});

    // Load most recent saved compliance report (metadata only for banner)
    fetch(`/api/dashboard/compliance-reports?company_id=${companyId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.report) {
          setSavedReportMeta({
            id:                data.report.id,
            report_week_start: data.report.report_week_start,
            report_week_end:   data.report.report_week_end,
            uploaded_at:       data.report.uploaded_at,
          });
        }
      })
      .catch(() => {});

    // Load report history for the dropdown
    fetch(`/api/dashboard/compliance-reports/history?company_id=${companyId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => setReportHistory(data?.history ?? []))
      .catch(() => {});
  }, [companyId]);

  // If in Breadcrumb API mode, also fetch approvals
  useEffect(() => {
    if (breadcrumbMode !== "api" || !companyId) return;
    fetch(`/api/breadcrumb/approvals?company_id=${companyId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (Array.isArray(data?.rows) && data.rows.length > 0) {
          setCsvApprovals(data.rows);
        }
      })
      .catch(() => {});
  }, [breadcrumbMode, companyId]);

  // ── Load a historical report by ID ──────────────────────────────────────────

  const loadFromSavedReport = useCallback(
    async (reportId: string) => {
      if (!companyId) return;
      try {
        const res = await fetch(
          `/api/dashboard/compliance-reports?company_id=${companyId}&report_id=${reportId}`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (!data.report) return;

        const report = data.report;

        // Restore site_data as siteRows (without live diary data — they'll refetch)
        if (Array.isArray(report.site_data)) {
          const restored: SiteRow[] = (report.site_data as SiteRow[]).map(r => ({
            ...r,
            diary:        null,
            diaryLoading: !!r.mappedProjectId,
          }));
          setSiteRows(restored);
          void loadDiariesForRows(restored);
        }

        setSavedReportMeta({
          id:                report.id,
          report_week_start: report.report_week_start,
          report_week_end:   report.report_week_end,
          uploaded_at:       report.uploaded_at,
        });
        setHistoryOpen(false);
      } catch {
        // ignore
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [companyId]
  );

  // ── Compute siteRows when CSVs or mappings change ────────────────────────────

  const buildSiteRows = useCallback(
    (
      briefings: Record<string, string>[] | null,
      approvals: Record<string, string>[] | null,
      currentMappings: SiteMapping[],
      currentProjects: DashboardProject[],
    ) => {
      const { monday, friday } = getCurrentWeekBounds();

      const allSites = new Set<string>();
      for (const row of briefings ?? []) if (row["Site"]) allSites.add(row["Site"]);
      for (const row of approvals ?? []) if (row["Site"]) allSites.add(row["Site"]);

      const mapBySite     = new Map(currentMappings.map(m => [m.breadcrumb_site_name, m.procore_project_id]));
      // projectOrder: Procore project id → position in the projects array
      const projectOrder  = new Map(currentProjects.map((p, i) => [String(p.id), i]));

      const sortedSites = Array.from(allSites).sort((a, b) => {
        const pidA    = mapBySite.get(a);
        const pidB    = mapBySite.get(b);
        const orderA  = pidA !== undefined ? (projectOrder.get(pidA) ?? Infinity) : Infinity;
        const orderB  = pidB !== undefined ? (projectOrder.get(pidB) ?? Infinity) : Infinity;
        if (orderA !== Infinity && orderB !== Infinity) return orderA - orderB;
        if (orderA !== Infinity) return -1;
        if (orderB !== Infinity) return 1;
        return a.localeCompare(b);
      });

      const rows: SiteRow[] = sortedSites.map(site => {
        const mappedProjectId = mapBySite.get(site) ?? null;
        return {
          site,
          mappedProjectId,
          prestartCount: calcPrestartCount(briefings ?? [], site, monday, friday),
          toolboxDone:   calcToolboxDone(briefings ?? [], site),
          ...calcApprovalKPIs(approvals ?? [], site),
          diary:        null,
          diaryLoading: !!mappedProjectId,
        };
      });

      setSiteRows(rows);
      return rows;
    },
    []
  );

  // ── Fetch diary data for a given set of rows ─────────────────────────────────

  const loadDiariesForRows = useCallback(
    async (rows: SiteRow[]) => {
      if (!companyId) return;
      const { monday, friday } = getCurrentWeekBounds();
      const startDate = toDateString(monday);
      const endDate   = toDateString(friday);

      const projectIds = Array.from(
        new Set(rows.filter(r => r.mappedProjectId).map(r => r.mappedProjectId!))
      );
      if (projectIds.length === 0) return;

      const results = await Promise.all(
        projectIds.map(async pid => {
          try {
            const res = await fetch(
              `/api/dashboard/site-diaries?project_id=${pid}&company_id=${companyId}&start_date=${startDate}&end_date=${endDate}`
            );
            const data: DiaryResult = res.ok
              ? await res.json()
              : { open_count: null, total_days: 5, entries: [], source: null };
            return { pid, data };
          } catch {
            return { pid, data: { open_count: null, total_days: 5, entries: [], source: null } as DiaryResult };
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

  // Rebuild + re-fetch whenever CSVs or mappings change.
  useEffect(() => {
    const rows = buildSiteRows(csvBriefings, csvApprovals, mappings, projects);
    if (hasData) void loadDiariesForRows(rows);
  }, [csvBriefings, csvApprovals, mappings, projects, buildSiteRows, loadDiariesForRows, hasData]);

  // ── Auto-save compliance report when both CSVs are loaded ───────────────────

  const saveComplianceReport = useCallback(
    async (rows: SiteRow[]) => {
      if (!companyId || rows.length === 0) return;
      setIsSavingReport(true);
      setReportSaveError(null);

      const { monday, friday } = getCurrentWeekBounds();

      // Serialise rows without diary (diary is live Procore data, not archival)
      const siteData = rows.map(r => ({
        site:              r.site,
        mappedProjectId:   r.mappedProjectId,
        prestartCount:     r.prestartCount,
        toolboxDone:       r.toolboxDone,
        pendingInductions: r.pendingInductions,
        pendingDocs:       r.pendingDocs,
        pendingInductionDetails: r.pendingInductionDetails,
        pendingDocDetails:       r.pendingDocDetails,
        oldestPendingDate:       r.oldestPendingDate,
      }));

      try {
        const res = await fetch("/api/dashboard/compliance-reports", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({
            company_id:              String(companyId),
            report_week_start:       toDateString(monday),
            report_week_end:         toDateString(friday),
            site_briefings_filename: briefingsFilename,
            approvals_filename:      approvalsFilename,
            site_data:               siteData,
            raw_briefings_csv:       rawBriefingsCsv,
            raw_approvals_csv:       rawApprovalsCsv,
          }),
        });

        if (!res.ok) {
          const body = await res.json();
          setReportSaveError(body.error ?? "Failed to save report");
          return;
        }

        const body = await res.json();

        setSavedReportMeta({
          id:                body.id ?? "",
          report_week_start: toDateString(monday),
          report_week_end:   toDateString(friday),
          uploaded_at:       new Date().toISOString(),
        });

        // Refresh history list
        fetch(`/api/dashboard/compliance-reports/history?company_id=${companyId}`)
          .then(r => r.ok ? r.json() : null)
          .then(data => setReportHistory(data?.history ?? []))
          .catch(() => {});
      } catch {
        setReportSaveError("Network error — report was not saved");
      } finally {
        setIsSavingReport(false);
      }
    },
    [companyId, briefingsFilename, approvalsFilename, rawBriefingsCsv, rawApprovalsCsv]
  );

  // Trigger auto-save when both CSVs are present and the combination is new.
  useEffect(() => {
    if (!csvBriefings || !csvApprovals || siteRows.length === 0) return;
    const key = csvSaveKey(briefingsFilename, approvalsFilename);
    if (key === lastSavedCsvKey.current || key === "|") return;
    lastSavedCsvKey.current = key;
    void saveComplianceReport(siteRows);
  }, [csvBriefings, csvApprovals, siteRows, briefingsFilename, approvalsFilename, saveComplianceReport]);

  // ── CSV handlers ─────────────────────────────────────────────────────────────

  function handleBriefingsParsed(rows: Record<string, string>[], name: string, uploadTime: Date, rawText: string) {
    setCsvBriefings(rows);
    setBriefingsFilename(name);
    setRawBriefingsCsv(rawText);
    setLastUpdated(prev => (!prev || uploadTime > prev) ? uploadTime : prev);
  }

  function handleApprovalsParsed(rows: Record<string, string>[], name: string, uploadTime: Date, rawText: string) {
    setCsvApprovals(rows);
    setApprovalsFilename(name);
    setRawApprovalsCsv(rawText);
    setLastUpdated(prev => (!prev || uploadTime > prev) ? uploadTime : prev);
  }

  // ── Mapping save (admin only) ────────────────────────────────────────────────

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
          company_id:           String(companyId),
          breadcrumb_site_name: site,
          procore_project_id:   projectId,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setMapSaveError(prev => new Map(prev).set(site, data.error ?? "Save failed"));
        return;
      }
      // Refresh mappings — this also triggers diary re-fetch via the useEffect above.
      const updatedRes = await fetch(`/api/dashboard/site-mappings?company_id=${companyId}`);
      const data = await updatedRes.json();
      setMappings(data?.mappings ?? []);
    } catch {
      setMapSaveError(prev => new Map(prev).set(site, "Network error — please retry"));
    } finally {
      setSavingMap(null);
    }
  }

  // ── Derived summary stats ────────────────────────────────────────────────────

  const siteLights = siteRows.map(row =>
    overallLight([
      prestartLight(row.prestartCount),
      toolboxLight(row.toolboxDone),
      countLight(row.pendingInductions),
      countLight(row.pendingDocs),
      diaryLight(row.diary),
    ])
  );

  const trackedSites    = siteRows.length;
  const actionRequired  = siteLights.filter(l => l === "red").length;
  const onTrack         = siteLights.filter(l => l === "green" || l === "amber").length;
  const totalPending    = siteRows.reduce((s, r) => s + r.pendingInductions + r.pendingDocs, 0);
  const unmappedCount   = siteRows.filter(r => !r.mappedProjectId).length;

  const isStale =
    (csvBriefings && isDataStale(csvBriefings, "Date Submitted")) ||
    (csvApprovals && isDataStale(csvApprovals, "Date Submitted"));

  // Sorted projects for the mapping dropdown
  const sortedProjects = [...projects].sort((a, b) =>
    (a.name || a.display_name).localeCompare(b.name || b.display_name)
  );

  function scrollToMapping(e: React.MouseEvent) {
    e.stopPropagation();
    mappingSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-7xl px-6 py-6 space-y-6">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Site Compliance</h1>
            <p className="text-sm text-gray-500 mt-0.5">{fmtWeekLabel()}</p>
            {lastUpdated && (
              <p className="text-xs text-gray-400 mt-0.5">
                Last updated {lastUpdated.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" })}
              </p>
            )}
          </div>

          {/* ── Report history dropdown ── */}
          {reportHistory.length > 0 && (
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setHistoryOpen(o => !o)}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Clock className="h-3.5 w-3.5 text-gray-400" />
                Report history
                {historyOpen ? <ChevronUp className="h-3.5 w-3.5 text-gray-400" /> : <ChevronDown className="h-3.5 w-3.5 text-gray-400" />}
              </button>

              {historyOpen && (
                <div className="absolute right-0 top-full mt-1 z-20 w-72 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
                  <p className="px-3 py-2 text-xs font-semibold uppercase tracking-widest text-gray-400 border-b border-gray-100">
                    Saved reports
                  </p>
                  <ul className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                    {reportHistory.map(item => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => loadFromSavedReport(item.id)}
                          className="w-full text-left px-3 py-2.5 hover:bg-gray-50 transition-colors"
                        >
                          <p className="text-xs font-semibold text-gray-800">
                            Week of {fmtDateLabel(item.report_week_start)}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            {item.site_count} sites · saved{" "}
                            {new Date(item.uploaded_at).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}
                            {item.uploaded_by ? ` by ${item.uploaded_by}` : ""}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Saved report banner ── */}
        {savedReportMeta && (
          <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
            <CheckCircle className="h-4 w-4 shrink-0 text-blue-500" />
            <p className="text-xs text-blue-700">
              Report saved for week of{" "}
              <span className="font-semibold">{fmtDateLabel(savedReportMeta.report_week_start)}</span>
              {" "}— {new Date(savedReportMeta.uploaded_at).toLocaleString("en-AU", {
                day: "numeric", month: "short",
                hour: "2-digit", minute: "2-digit",
              })}
            </p>
            {isSavingReport && (
              <Spinner className="h-3.5 w-3.5 ml-auto" />
            )}
          </div>
        )}
        {isSavingReport && !savedReportMeta && (
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
            <Spinner className="h-3.5 w-3.5" />
            <p className="text-xs text-gray-500">Saving report…</p>
          </div>
        )}
        {reportSaveError && (
          <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
            <p className="text-xs text-red-700">{reportSaveError}</p>
          </div>
        )}

        {/* ── Stale data warning ── */}
        {isStale && (
          <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
            <p className="text-sm text-amber-700">
              These reports may be from a previous week. Please upload fresh exports from Breadcrumb.
            </p>
          </div>
        )}

        {/* ── CSV upload zone (hidden in API mode) ── */}
        {breadcrumbMode === "api" ? (
          <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
            <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
            <p className="text-xs text-green-700 font-medium">
              Live data via Breadcrumb API — no CSV upload needed.
            </p>
          </div>
        ) : breadcrumbMode === "csv" ? (
          <SiteComplianceCsvUpload
            onBriefingsParsed={handleBriefingsParsed}
            onApprovalsParsed={handleApprovalsParsed}
          />
        ) : (
          /* checking — show nothing while we probe the API */
          null
        )}

        {/* ── Empty state ── */}
        {!hasData && breadcrumbMode !== "checking" && (
          <div className="rounded-xl border border-gray-200 bg-white px-8 py-16 text-center">
            <p className="text-sm font-medium text-gray-700">
              Upload your weekly Breadcrumb exports to populate the compliance report.
            </p>
            <p className="text-xs text-gray-400 mt-1">Procore data loads automatically.</p>
          </div>
        )}

        {hasData && siteRows.length > 0 && (<>

          {/* ── Summary stat cards ── */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Sites tracked",          value: trackedSites,   note: "from CSV" },
              { label: "Action required",        value: actionRequired, note: "1+ red KPI",        highlight: actionRequired > 0 },
              { label: "Total pending approvals", value: totalPending,   note: "inductions + docs" },
              { label: "On track",               value: onTrack,        note: "no red KPIs" },
            ].map(({ label, value, note, highlight }) => (
              <div key={label} className={`rounded-xl border bg-white px-5 py-4 ${highlight ? "border-red-200" : "border-gray-200"}`}>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</p>
                <p className={`mt-1 text-3xl font-bold ${highlight ? "text-red-600" : "text-gray-900"}`}>{value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{note}</p>
              </div>
            ))}
          </div>

          {/* ── Site → Project mapping (visible to all; editable by admins only) ── */}
          <div ref={mappingSectionRef} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="border-b border-gray-200 px-5 py-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Connect sites to Procore projects
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Linking each Breadcrumb site to its Procore project enables the Open Site Diaries column.
                    {!isAdmin && " Contact an admin to update mappings."}
                  </p>
                </div>
                {unmappedCount > 0 && (
                  <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                    {unmappedCount} unmapped
                  </span>
                )}
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {siteRows.map(row => {
                const currentMapping = mappings.find(m => m.breadcrumb_site_name === row.site);
                const isMapped       = !!currentMapping;
                const pendingValue   = pendingMaps.get(row.site) ?? currentMapping?.procore_project_id ?? "";
                const hasChange      = isAdmin && pendingValue !== (currentMapping?.procore_project_id ?? "");
                const isSaving       = savingMap === row.site;
                const saveErr        = mapSaveError.get(row.site);

                const mappedProject = isMapped
                  ? projects.find(p => String(p.id) === currentMapping.procore_project_id)
                  : null;

                return (
                  <div key={row.site} className="px-5 py-3 flex items-center gap-3">
                    {/* Mapped indicator */}
                    <div className="shrink-0">
                      {isMapped
                        ? <CheckCircle className="h-4 w-4 text-green-500" />
                        : <div className="h-4 w-4 rounded-full border-2 border-gray-300" />}
                    </div>

                    {/* Site name */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">{row.site}</p>
                      {saveErr && <p className="text-xs text-red-500 mt-0.5">{saveErr}</p>}
                    </div>

                    {/* Admin: dropdown + save button */}
                    {isAdmin ? (
                      <>
                        <select
                          value={pendingValue}
                          onChange={e => setPendingMaps(prev => new Map(prev).set(row.site, e.target.value))}
                          disabled={isSaving}
                          className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 min-w-[200px]"
                        >
                          <option value="">— No mapping —</option>
                          {sortedProjects.map(p => (
                            <option key={p.id} value={String(p.id)}>
                              {p.name}
                              {p.project_number ? ` (#${p.project_number})` : ""}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          disabled={!hasChange || isSaving || !pendingValue}
                          onClick={() => handleSaveMapping(row.site)}
                          className="shrink-0 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {isSaving ? "Saving…" : "Save"}
                        </button>
                      </>
                    ) : (
                      /* Non-admin: read-only display */
                      <p className="text-xs text-gray-500 truncate max-w-[260px]">
                        {mappedProject
                          ? mappedProject.name
                          : <span className="italic text-gray-400">Not mapped</span>}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Compliance table ── */}
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-400 w-44">Site</th>
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
                {siteRows.map(row => {
                  const preLight   = prestartLight(row.prestartCount);
                  const tbLight    = toolboxLight(row.toolboxDone);
                  const indLight   = countLight(row.pendingInductions);
                  const docLight   = countLight(row.pendingDocs);
                  const dLight     = diaryLight(row.diary);
                  const overall    = overallLight([preLight, tbLight, indLight, docLight, dLight]);
                  const isExpanded = expandedSite === row.site;

                  const project = row.mappedProjectId
                    ? projects.find(p => String(p.id) === row.mappedProjectId) ?? null
                    : null;

                  const diaryIsUnmapped = !row.diaryLoading && !row.mappedProjectId;

                  return (
                    <>
                      <tr
                        key={row.site}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => setExpandedSite(isExpanded ? null : row.site)}
                      >
                        {/* Site name */}
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900 text-xs leading-tight">{row.site}</div>
                          {project && (
                            <div className="text-[10px] text-gray-400 mt-0.5 truncate">
                              {project.name}
                            </div>
                          )}
                        </td>

                        <td className="px-4 py-3"><Pill light={preLight}>{row.prestartCount}/5</Pill></td>
                        <td className="px-4 py-3"><Pill light={tbLight}>{row.toolboxDone ? "Done" : "Missing"}</Pill></td>
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

                        {/* Open Site Diaries */}
                        <td className="px-4 py-3">
                          {row.diaryLoading ? (
                            <Spinner />
                          ) : diaryIsUnmapped ? (
                            <div className="flex flex-col gap-1">
                              <Pill light="gray">—</Pill>
                              <button
                                onClick={scrollToMapping}
                                className="text-[10px] text-amber-600 hover:text-amber-700 font-medium text-left underline-offset-2 hover:underline"
                              >
                                Map site →
                              </button>
                            </div>
                          ) : row.diary === null ? (
                            <Pill light="gray">—</Pill>
                          ) : (
                            <div>
                              <Pill light={dLight}>
                                {row.diary.open_count === null
                                  ? "—"
                                  : row.diary.open_count === 0
                                    ? "All closed"
                                    : `${row.diary.open_count} open`}
                              </Pill>
                              {row.diary.source === "notes_logs" && (
                                <p className="text-[10px] text-gray-400 mt-0.5" title="Daily Construction Reports not enabled; using Notes Logs as proxy">
                                  via notes
                                </p>
                              )}
                            </div>
                          )}
                        </td>

                        <td className="px-4 py-3">
                          <Pill light={overall}>
                            {{ green: "On track", amber: "Attention", red: "Action needed", gray: "—" }[overall]}
                          </Pill>
                        </td>
                        <td className="px-4 py-3 text-gray-400">
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </td>
                      </tr>

                      {/* ── Expanded detail row ── */}
                      {isExpanded && (
                        <tr key={`${row.site}-detail`}>
                          <td colSpan={8} className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

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

                              {row.diary && row.diary.entries.length > 0 && (
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                                    Site Diary — This Week
                                    {row.diary.source === "notes_logs" && (
                                      <span className="ml-1.5 normal-case font-normal text-gray-400">
                                        (via Notes Logs — Daily Reports not enabled)
                                      </span>
                                    )}
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
                                            isOpen ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                                          }`}>
                                            {entry.status ?? "Missing"}
                                          </span>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              )}

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

        </>)}

      </div>
    </div>
  );
}
