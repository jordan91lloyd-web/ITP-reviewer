"use client";

// ─── SiteComplianceTab ─────────────────────────────────────────────────────────
// Weekly traffic-light compliance view across all Fleek projects.
// When BREADCRUMB_API_KEY is configured, data loads automatically from the
// Breadcrumb API on mount. Falls back to CSV upload if the key is missing.

import { useState, useEffect, useCallback, useRef } from "react";
import {
  AlertTriangle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  CheckCircle, Clock, RefreshCw,
} from "lucide-react";
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

interface SiteDiaryResult {
  siteReference: string;
  projectId: string;
  completedDays: number;
  totalDays: number;
  display: string;   // "X/Y" or "—"
  missedDates: string[];
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
  siteDiary: SiteDiaryResult | null;
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

// Breadcrumb API compliance-data response types
interface ApiDailyPrestarts {
  count: number;
  total: number;
  days: string[];
}
interface ApiToolboxTalk {
  submitted: boolean;
  lastSubmitted: string | null;
}
interface ApiInductionItem {
  name: string;
  supplier: string;
  submittedDate: string;
  title: string;
}
interface ApiDocItem {
  documentTitle: string;
  supplier: string;
  submittedDate: string;
}
interface ApiSiteData {
  siteReference: string;
  siteName: string;
  procoreProjectId: string | null;
  dailyPrestarts: ApiDailyPrestarts;
  toolboxTalk: ApiToolboxTalk;
  pendingInductions: { count: number; items: ApiInductionItem[] };
  pendingDocs: { count: number; items: ApiDocItem[] };
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

function addDays(d: Date, n: number): Date {
  const result = new Date(d);
  result.setDate(result.getDate() + n);
  return result;
}

function fmtWeekLabelFromMonday(monday: Date): string {
  const friday = addDays(monday, 4);
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
  const optsYear: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
  return `Week of ${monday.toLocaleDateString("en-AU", opts)} – ${friday.toLocaleDateString("en-AU", optsYear)}`;
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
function diaryLight(result: SiteDiaryResult | null): TrafficLight {
  if (!result || result.display === "—") return "gray";
  if (result.completedDays >= result.totalDays) return "green";
  return "amber";
}
function overallLight(lights: TrafficLight[]): TrafficLight {
  const active = lights.filter(l => l !== "gray");
  if (active.some(l => l === "red"))   return "red";
  if (active.some(l => l === "amber")) return "amber";
  if (active.length > 0 && active.every(l => l === "green")) return "green";
  return "gray";
}

// ── CSV KPI calculation (used in fallback CSV mode only) ──────────────────────

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

export default function SiteComplianceTab({ companyId, projects, isAdmin }: Props) {
  // ── Mode: "checking" | "api" | "csv"
  const [mode, setMode] = useState<"checking" | "api" | "csv">("checking");

  // ── API mode state
  const [isLoading, setIsLoading]   = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const lastApiSaveRef = useRef<string>("");   // prevents duplicate saves per week
  const isManualRefreshRef = useRef(false);   // prevents stale Supabase load from overwriting fresh API data

  // ── Selected week (defaults to current Monday; navigation updates this)
  const [selectedMonday, setSelectedMonday] = useState<Date>(() => getCurrentWeekBounds().monday);

  // ── CSV fallback state
  const [csvBriefings, setCsvBriefings] = useState<Record<string, string>[] | null>(null);
  const [csvApprovals, setCsvApprovals] = useState<Record<string, string>[] | null>(null);
  const [rawBriefingsCsv, setRawBriefingsCsv]   = useState<string | null>(null);
  const [rawApprovalsCsv, setRawApprovalsCsv]   = useState<string | null>(null);
  const [briefingsFilename, setBriefingsFilename] = useState<string | null>(null);
  const [approvalsFilename, setApprovalsFilename] = useState<string | null>(null);
  const lastCsvSaveKey = useRef<string>("");

  // ── Shared state
  const [siteRows, setSiteRows]         = useState<SiteRow[]>([]);
  const [mappings, setMappings]         = useState<SiteMapping[]>([]);
  const [expandedSite, setExpandedSite] = useState<string | null>(null);

  const [pendingMaps, setPendingMaps]   = useState<Map<string, string>>(new Map());
  const [savingMap, setSavingMap]       = useState<string | null>(null);
  const [mapSaveError, setMapSaveError] = useState<Map<string, string>>(new Map());

  const [savedReportMeta, setSavedReportMeta]   = useState<SavedReportMeta | null>(null);
  const [reportHistory, setReportHistory]       = useState<ReportHistoryItem[]>([]);
  const [historyOpen, setHistoryOpen]           = useState(false);
  const [isSavingReport, setIsSavingReport]     = useState(false);
  const [reportSaveError, setReportSaveError]   = useState<string | null>(null);

  const mappingSectionRef = useRef<HTMLDivElement>(null);
  const [mappingOpen, setMappingOpen] = useState(false);

  // ── Build SiteRows from API compliance-data response ─────────────────────────

  const buildApiSiteRows = useCallback(
    (apiSites: ApiSiteData[], currentMappings: SiteMapping[], currentProjects: DashboardProject[]): SiteRow[] => {
      const mapBySiteName = new Map(currentMappings.map(m => [m.breadcrumb_site_name, m.procore_project_id]));
      const projectOrder  = new Map(currentProjects.map((p, i) => [String(p.id), i]));

      const rows: SiteRow[] = apiSites.map(s => {
        // Manual DB mapping overrides Breadcrumb's procoreProjectId
        const mappedProjectId = mapBySiteName.get(s.siteName) ?? s.procoreProjectId ?? null;

        const allDates = [
          ...s.pendingInductions.items.map(i => i.submittedDate),
          ...s.pendingDocs.items.map(i => i.submittedDate),
        ].filter(Boolean);

        let oldestPendingDate: string | null = null;
        for (const ds of allDates) {
          const d = new Date(ds);
          if (!isNaN(d.getTime()) && (!oldestPendingDate || d < new Date(oldestPendingDate))) {
            oldestPendingDate = ds;
          }
        }

        return {
          site:          s.siteName,
          mappedProjectId,
          prestartCount: s.dailyPrestarts.count,
          toolboxDone:   s.toolboxTalk.submitted,
          pendingInductions: s.pendingInductions.count,
          pendingDocs:       s.pendingDocs.count,
          pendingInductionDetails: s.pendingInductions.items.map(i => ({
            title:         i.title,
            supplier:      i.supplier,
            dateSubmitted: i.submittedDate,
          })),
          pendingDocDetails: s.pendingDocs.items.map(i => ({
            title:         i.documentTitle,
            supplier:      i.supplier,
            dateSubmitted: i.submittedDate,
          })),
          oldestPendingDate,
          siteDiary:    null,
          diaryLoading: !!mappedProjectId,
        };
      });

      // Sort: mapped sites by Procore project order, unmapped alphabetically at bottom
      return rows.sort((a, b) => {
        const oA = a.mappedProjectId ? (projectOrder.get(a.mappedProjectId) ?? Infinity) : Infinity;
        const oB = b.mappedProjectId ? (projectOrder.get(b.mappedProjectId) ?? Infinity) : Infinity;
        if (oA !== Infinity && oB !== Infinity) return oA - oB;
        if (oA !== Infinity) return -1;
        if (oB !== Infinity) return 1;
        return a.site.localeCompare(b.site);
      });
    },
    []
  );

  // ── Build SiteRows from CSV data (fallback mode) ─────────────────────────────

  const buildCsvSiteRows = useCallback(
    (
      briefings: Record<string, string>[] | null,
      approvals: Record<string, string>[] | null,
      currentMappings: SiteMapping[],
      currentProjects: DashboardProject[],
    ): SiteRow[] => {
      const { monday, friday } = getCurrentWeekBounds();

      const allSites = new Set<string>();
      for (const row of briefings ?? []) if (row["Site"]) allSites.add(row["Site"]);
      for (const row of approvals ?? []) if (row["Site"]) allSites.add(row["Site"]);

      const mapBySite    = new Map(currentMappings.map(m => [m.breadcrumb_site_name, m.procore_project_id]));
      const projectOrder = new Map(currentProjects.map((p, i) => [String(p.id), i]));

      const sortedSites = Array.from(allSites).sort((a, b) => {
        const pidA   = mapBySite.get(a);
        const pidB   = mapBySite.get(b);
        const orderA = pidA !== undefined ? (projectOrder.get(pidA) ?? Infinity) : Infinity;
        const orderB = pidB !== undefined ? (projectOrder.get(pidB) ?? Infinity) : Infinity;
        if (orderA !== Infinity && orderB !== Infinity) return orderA - orderB;
        if (orderA !== Infinity) return -1;
        if (orderB !== Infinity) return 1;
        return a.localeCompare(b);
      });

      return sortedSites.map(site => ({
        site,
        mappedProjectId: mapBySite.get(site) ?? null,
        prestartCount: calcPrestartCount(briefings ?? [], site, monday, friday),
        toolboxDone:   calcToolboxDone(briefings ?? [], site),
        ...calcApprovalKPIs(approvals ?? [], site),
        siteDiary:    null,
        diaryLoading: !!(mapBySite.get(site)),
      }));
    },
    []
  );

  // ── Fetch site diary data (current partial week, Mon–yesterday, Sydney time) ──

  const loadSiteDiaries = useCallback(
    async (rows: SiteRow[]) => {
      if (!companyId) return;

      const projectIds = Array.from(
        new Set(rows.filter(r => r.mappedProjectId).map(r => r.mappedProjectId!))
      );
      console.log("[SiteDiaries] rows:", rows.length, "| rows with mappedProjectId:", rows.filter(r => r.mappedProjectId).length, "| projectIds to fetch:", projectIds);
      if (projectIds.length === 0) {
        console.log("[SiteDiaries] No project IDs — skipping fetch. Row mappings:", rows.map(r => ({ site: r.site, mappedProjectId: r.mappedProjectId })));
        setSiteRows(prev => prev.map(r => ({ ...r, diaryLoading: false })));
        return;
      }

      try {
        console.log("[SiteDiaries] Fetching /api/breadcrumb/site-diaries with project_ids:", projectIds.join(","));
        const res = await fetch(
          `/api/breadcrumb/site-diaries?company_id=${companyId}&project_ids=${projectIds.join(",")}`
        );
        console.log("[SiteDiaries] API response status:", res.status);
        if (!res.ok) {
          setSiteRows(prev => prev.map(r => ({ ...r, diaryLoading: false })));
          return;
        }
        const data = await res.json();
        console.log("[SiteDiaries] API response:", JSON.stringify(data));

        if (data.todayIsMonday) {
          // Today is Monday — nothing to check yet; show "—" for all sites
          setSiteRows(prev => prev.map(r => ({ ...r, siteDiary: null, diaryLoading: false })));
          return;
        }

        const diaryMap = new Map<string, SiteDiaryResult>(
          (data.results ?? []).map((r: SiteDiaryResult) => [r.projectId, r])
        );

        setSiteRows(prev =>
          prev.map(row => ({
            ...row,
            siteDiary:    row.mappedProjectId ? (diaryMap.get(row.mappedProjectId) ?? null) : null,
            diaryLoading: false,
          }))
        );
      } catch {
        setSiteRows(prev => prev.map(r => ({ ...r, diaryLoading: false })));
      }
    },
    [companyId]
  );

  // ── Save compliance report ────────────────────────────────────────────────────

  const saveComplianceReport = useCallback(
    async (
      rows: SiteRow[],
      opts?: { briefingsFile?: string | null; approvalsFile?: string | null; source?: string; weekMonday?: Date }
    ) => {
      if (!companyId || rows.length === 0) return;
      setIsSavingReport(true);
      setReportSaveError(null);

      const effectiveMonday = opts?.weekMonday ?? getCurrentWeekBounds().monday;
      const monday = effectiveMonday;
      const friday = addDays(effectiveMonday, 4);

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

      const bFile = opts?.briefingsFile !== undefined ? opts.briefingsFile : briefingsFilename;
      const aFile = opts?.approvalsFile !== undefined ? opts.approvalsFile : approvalsFilename;

      try {
        const res = await fetch("/api/dashboard/compliance-reports", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company_id:              String(companyId),
            report_week_start:       toDateString(monday),
            report_week_end:         toDateString(friday),
            site_briefings_filename: bFile,
            approvals_filename:      aFile,
            site_data:               siteData,
            raw_briefings_csv:       opts?.source === "api" ? null : rawBriefingsCsv,
            raw_approvals_csv:       opts?.source === "api" ? null : rawApprovalsCsv,
          }),
        });

        if (!res.ok) {
          const body = await res.json();
          setReportSaveError(body.error ?? "Failed to save report");
          return;
        }

        const body = await res.json();
        const newMeta: SavedReportMeta = {
          id:                body.id ?? "",
          report_week_start: toDateString(monday),
          report_week_end:   toDateString(friday),
          uploaded_at:       new Date().toISOString(),
        };
        setSavedReportMeta(newMeta);

        // Update siteRows with the freshly-saved data, preserving any diary data already loaded
        setSiteRows(prev => {
          const diaryBySite = new Map(prev.map(r => [r.site, { siteDiary: r.siteDiary, diaryLoading: r.diaryLoading }]));
          return rows.map(r => ({
            ...r,
            siteDiary:    diaryBySite.get(r.site)?.siteDiary ?? null,
            diaryLoading: diaryBySite.get(r.site)?.diaryLoading ?? r.diaryLoading,
          }));
        });

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

  // ── Fetch API compliance data ─────────────────────────────────────────────────

  const fetchApiData = useCallback(
    async (currentMappings: SiteMapping[], weekMonday?: Date) => {
      if (!companyId) return;
      setIsLoading(true);
      setFetchError(null);

      const effectiveMonday = weekMonday ?? selectedMonday;
      const weekStart = toDateString(effectiveMonday);

      try {
        const res = await fetch(
          `/api/breadcrumb/compliance-data?company_id=${companyId}&week_start=${weekStart}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const apiSites: ApiSiteData[] = data.sites ?? [];

        const rows = buildApiSiteRows(apiSites, currentMappings, projects);
        setSiteRows(rows);
        setLastFetched(new Date());
        void loadSiteDiaries(rows);

        // Auto-save once per week (keyed by week start)
        if (weekStart !== lastApiSaveRef.current) {
          lastApiSaveRef.current = weekStart;
          void saveComplianceReport(rows, { briefingsFile: "breadcrumb_api", approvalsFile: null, source: "api", weekMonday: effectiveMonday });
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to load compliance data";
        setFetchError(msg);
        // Attempt to load last cached report from Supabase
        try {
          const cached = await fetch(`/api/dashboard/compliance-reports?company_id=${companyId}`);
          if (cached.ok) {
            const cData = await cached.json();
            if (cData?.report && Array.isArray(cData.report.site_data)) {
              const restored: SiteRow[] = (cData.report.site_data as SiteRow[]).map(r => ({
                ...r, siteDiary: null, diaryLoading: !!r.mappedProjectId,
              }));
              setSiteRows(restored);
              void loadSiteDiaries(restored);
            }
          }
        } catch {
          // ignore — no cached data to restore
        }
      } finally {
        setIsLoading(false);
      }
    },
    [companyId, selectedMonday, projects, buildApiSiteRows, loadSiteDiaries, saveComplianceReport]
  );

  // ── On-mount: check API, load mappings, load history ─────────────────────────

  useEffect(() => {
    if (!companyId) return;

    // Kick off mappings + mode detection in parallel
    Promise.all([
      fetch(`/api/breadcrumb/sites?company_id=${companyId}`).then(r => r.ok ? r.json() : null),
      fetch(`/api/dashboard/site-mappings?company_id=${companyId}`).then(r => r.ok ? r.json() : null),
    ]).then(([sitesData, mappingsData]) => {
      const loadedMappings: SiteMapping[] = mappingsData?.mappings ?? [];
      setMappings(loadedMappings);

      if (sitesData?.fallback === true) {
        setMode("csv");
        return;
      }

      // API is configured
      setMode("api");
      void fetchApiData(loadedMappings);
    }).catch(() => setMode("csv"));

    // Load saved report meta (for banner) — only on initial mount, not after manual refresh
    fetch(`/api/dashboard/compliance-reports?company_id=${companyId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        // If a manual refresh has already run, don't let this stale fetch overwrite the fresh meta
        if (isManualRefreshRef.current) return;
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

    // Load report history
    fetch(`/api/dashboard/compliance-reports/history?company_id=${companyId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => setReportHistory(data?.history ?? []))
      .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  // ── Rebuild CSV rows when CSVs or mappings change (CSV mode only) ─────────────

  useEffect(() => {
    if (mode !== "csv") return;
    if (!csvBriefings && !csvApprovals) return;
    const rows = buildCsvSiteRows(csvBriefings, csvApprovals, mappings, projects);
    setSiteRows(rows);
    void loadSiteDiaries(rows);
  }, [csvBriefings, csvApprovals, mappings, projects, mode, buildCsvSiteRows, loadSiteDiaries]);

  // ── Auto-save when CSV data is present (CSV mode only) ───────────────────────

  useEffect(() => {
    if (mode !== "csv") return;
    if (!csvBriefings || !csvApprovals || siteRows.length === 0) return;
    const key = `${briefingsFilename ?? ""}|${approvalsFilename ?? ""}`;
    if (key === lastCsvSaveKey.current || key === "|") return;
    lastCsvSaveKey.current = key;
    void saveComplianceReport(siteRows);
  }, [mode, csvBriefings, csvApprovals, siteRows, briefingsFilename, approvalsFilename, saveComplianceReport]);

  // ── Manual refresh (API mode) ─────────────────────────────────────────────────

  const handleRefresh = useCallback(async () => {
    if (!companyId || mode !== "api") return;
    const mappingsRes = await fetch(`/api/dashboard/site-mappings?company_id=${companyId}`).catch(() => null);
    const mappingsData = mappingsRes?.ok ? await mappingsRes.json().catch(() => null) : null;
    const currentMappings: SiteMapping[] = mappingsData?.mappings ?? mappings;
    if (mappingsData) setMappings(currentMappings);
    isManualRefreshRef.current = true;   // prevent stale mount fetch from overwriting fresh data
    lastApiSaveRef.current = "";         // force re-save on manual refresh
    void fetchApiData(currentMappings, selectedMonday);
  }, [companyId, mode, mappings, selectedMonday, fetchApiData]);

  // ── Load historical report by ID ──────────────────────────────────────────────

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

        if (Array.isArray(report.site_data)) {
          const restored: SiteRow[] = (report.site_data as SiteRow[]).map(r => ({
            ...r, siteDiary: null, diaryLoading: !!r.mappedProjectId,
          }));
          setSiteRows(restored);
          void loadSiteDiaries(restored);
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

  // ── CSV handlers (fallback mode) ──────────────────────────────────────────────

  function handleBriefingsParsed(rows: Record<string, string>[], name: string, uploadTime: Date, rawText: string) {
    setCsvBriefings(rows);
    setBriefingsFilename(name);
    setRawBriefingsCsv(rawText);
  }

  function handleApprovalsParsed(rows: Record<string, string>[], name: string, _uploadTime: Date, rawText: string) {
    setCsvApprovals(rows);
    setApprovalsFilename(name);
    setRawApprovalsCsv(rawText);
  }

  // ── Mapping save ──────────────────────────────────────────────────────────────

  async function handleSaveMapping(site: string) {
    const projectId = pendingMaps.get(site);
    if (!projectId || !companyId) return;

    setSavingMap(site);
    setMapSaveError(prev => { const m = new Map(prev); m.delete(site); return m; });

    try {
      const res = await fetch("/api/dashboard/site-mappings", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
      const updatedRes = await fetch(`/api/dashboard/site-mappings?company_id=${companyId}`);
      const data = await updatedRes.json();
      setMappings(data?.mappings ?? []);
    } catch {
      setMapSaveError(prev => new Map(prev).set(site, "Network error — please retry"));
    } finally {
      setSavingMap(null);
    }
  }

  // ── Week navigation ────────────────────────────────────────────────────────────

  const isCurrentWeek = toDateString(selectedMonday) === toDateString(getCurrentWeekBounds().monday);

  const handleWeekNav = useCallback((direction: -1 | 1) => {
    const newMonday = addDays(selectedMonday, direction * 7);
    setSelectedMonday(newMonday);
    void fetchApiData(mappings, newMonday);
  }, [selectedMonday, mappings, fetchApiData]);

  const handleGoToCurrentWeek = useCallback(() => {
    const monday = getCurrentWeekBounds().monday;
    setSelectedMonday(monday);
    void fetchApiData(mappings, monday);
  }, [mappings, fetchApiData]);

  // ── Derived stats ─────────────────────────────────────────────────────────────

  const siteLights = siteRows.map(row =>
    overallLight([
      prestartLight(row.prestartCount),
      toolboxLight(row.toolboxDone),
      countLight(row.pendingInductions),
      countLight(row.pendingDocs),
      diaryLight(row.siteDiary),
    ])
  );

  const trackedSites   = siteRows.length;
  const actionRequired = siteLights.filter(l => l === "red").length;
  const onTrack        = siteLights.filter(l => l === "green" || l === "amber").length;
  const totalPending   = siteRows.reduce((s, r) => s + r.pendingInductions + r.pendingDocs, 0);
  const unmappedCount  = siteRows.filter(r => !r.mappedProjectId).length;

  const hasData = siteRows.length > 0;

  const isStale =
    mode === "csv" &&
    ((csvBriefings && isDataStale(csvBriefings, "Date Submitted")) ||
     (csvApprovals && isDataStale(csvApprovals, "Date Submitted")));

  const sortedProjects = [...projects].sort((a, b) =>
    (a.name || a.display_name).localeCompare(b.name || b.display_name)
  );

  function scrollToMapping(e: React.MouseEvent) {
    e.stopPropagation();
    mappingSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-7xl px-6 py-6 space-y-6">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Site Compliance</h1>
            <div className="flex items-center gap-0.5 mt-1">
              <button
                type="button"
                onClick={() => handleWeekNav(-1)}
                disabled={isLoading}
                aria-label="Previous week"
                className="rounded p-0.5 hover:bg-gray-100 transition-colors disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4 text-gray-500" />
              </button>
              <span className="text-sm text-gray-600 font-medium px-1">
                {fmtWeekLabelFromMonday(selectedMonday)}
              </span>
              <button
                type="button"
                onClick={() => handleWeekNav(1)}
                disabled={isLoading || isCurrentWeek}
                aria-label="Next week"
                className="rounded p-0.5 hover:bg-gray-100 transition-colors disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4 text-gray-500" />
              </button>
              {!isCurrentWeek && (
                <button
                  type="button"
                  onClick={handleGoToCurrentWeek}
                  disabled={isLoading}
                  className="ml-1.5 text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors disabled:opacity-40"
                >
                  This week
                </button>
              )}
              {mode === "api" && isLoading && (
                <Spinner className="h-3.5 w-3.5 ml-2" />
              )}
            </div>
            {mode === "api" && lastFetched && !isLoading && (
              <p className="text-xs text-gray-400 mt-0.5">
                Fetched {lastFetched.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" })}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* ── API mode: refresh button + live badge ── */}
            {mode === "api" && (
              <>
                <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                  <CheckCircle className="h-3 w-3" />
                  Live via Breadcrumb API
                </span>
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {isLoading
                    ? <Spinner className="h-3 w-3" />
                    : <RefreshCw className="h-3.5 w-3.5 text-gray-400" />}
                  Refresh
                </button>
              </>
            )}

            {/* ── Report history dropdown ── */}
            {reportHistory.length > 0 && (
              <div className="relative">
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
            {isSavingReport && <Spinner className="h-3.5 w-3.5 ml-auto" />}
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

        {/* ── Stale data warning (CSV mode only) ── */}
        {isStale && (
          <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
            <p className="text-sm text-amber-700">
              These reports may be from a previous week. Please upload fresh exports from Breadcrumb.
            </p>
          </div>
        )}

        {/* ── API fetch error ── */}
        {mode === "api" && fetchError && (
          <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-red-700 font-medium">Failed to fetch live data — {fetchError}</p>
              {siteRows.length > 0 && (
                <p className="text-xs text-red-500 mt-0.5">Showing last saved report instead.</p>
              )}
            </div>
            <button
              type="button"
              onClick={handleRefresh}
              className="shrink-0 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-500 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* ── Loading state ── */}
        {mode === "api" && isLoading && siteRows.length === 0 && (
          <div className="flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-8 py-16">
            <Spinner className="h-5 w-5" />
            <p className="text-sm text-gray-500">Loading compliance data…</p>
          </div>
        )}

        {/* ── CSV fallback mode ── */}
        {mode === "csv" && (
          <>
            <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
              <p className="text-xs text-amber-700">
                Breadcrumb API not configured — using CSV upload mode.{" "}
                Add <code className="font-mono bg-amber-100 px-1 rounded">BREADCRUMB_API_KEY</code> to enable live data.
              </p>
            </div>
            <SiteComplianceCsvUpload
              onBriefingsParsed={handleBriefingsParsed}
              onApprovalsParsed={handleApprovalsParsed}
            />
          </>
        )}

        {/* ── Empty state ── */}
        {!hasData && mode !== "checking" && !(mode === "api" && isLoading) && (
          <div className="rounded-xl border border-gray-200 bg-white px-8 py-16 text-center">
            {mode === "csv" ? (
              <>
                <p className="text-sm font-medium text-gray-700">
                  Upload your weekly Breadcrumb exports to populate the compliance report.
                </p>
                <p className="text-xs text-gray-400 mt-1">Procore data loads automatically.</p>
              </>
            ) : (
              <p className="text-sm text-gray-500">No site data returned from Breadcrumb API.</p>
            )}
          </div>
        )}

        {hasData && (<>

          {/* ── Summary stat cards ── */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Sites tracked",           value: trackedSites,   note: mode === "api" ? "from Breadcrumb" : "from CSV" },
              { label: "Action required",          value: actionRequired, note: "1+ red KPI",        highlight: actionRequired > 0 },
              { label: "Total pending approvals",  value: totalPending,   note: "inductions + docs" },
              { label: "On track",                 value: onTrack,        note: "no red KPIs" },
            ].map(({ label, value, note, highlight }) => (
              <div key={label} className={`rounded-xl border bg-white px-5 py-4 ${highlight ? "border-red-200" : "border-gray-200"}`}>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</p>
                <p className={`mt-1 text-3xl font-bold ${highlight ? "text-red-600" : "text-gray-900"}`}>{value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{note}</p>
              </div>
            ))}
          </div>

          {/* ── Site → Project mapping (collapsible; editable by admins) ── */}
          <div ref={mappingSectionRef} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <button
              type="button"
              onClick={() => setMappingOpen(o => !o)}
              className="w-full px-5 py-4 bg-gray-50 flex items-center justify-between gap-3 hover:bg-gray-100 transition-colors text-left"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">
                  Site mappings ({trackedSites - unmappedCount} auto-mapped)
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {mode === "api"
                    ? "Sites are auto-mapped via Breadcrumb. Admins can override."
                    : "Link each Breadcrumb site to its Procore project for the Site Diaries column."}
                  {!isAdmin && " Contact an admin to update mappings."}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {unmappedCount > 0 && (
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                    {unmappedCount} unmapped
                  </span>
                )}
                {mappingOpen
                  ? <ChevronUp className="h-4 w-4 text-gray-400" />
                  : <ChevronDown className="h-4 w-4 text-gray-400" />}
              </div>
            </button>

            {mappingOpen && <div className="divide-y divide-gray-100 border-t border-gray-200">
              {siteRows.map(row => {
                const currentMapping = mappings.find(m => m.breadcrumb_site_name === row.site);
                const isMapped       = !!row.mappedProjectId;
                const isAutoMapped   = mode === "api" && isMapped && !currentMapping;
                const pendingValue   = pendingMaps.get(row.site) ?? currentMapping?.procore_project_id ?? "";
                const hasChange      = isAdmin && pendingValue !== (currentMapping?.procore_project_id ?? "");
                const isSaving       = savingMap === row.site;
                const saveErr        = mapSaveError.get(row.site);

                const mappedProject = isMapped
                  ? projects.find(p => String(p.id) === row.mappedProjectId)
                  : null;

                return (
                  <div key={row.site} className="px-5 py-3 flex items-center gap-3">
                    <div className="shrink-0">
                      {isMapped
                        ? <CheckCircle className="h-4 w-4 text-green-500" />
                        : <div className="h-4 w-4 rounded-full border-2 border-gray-300" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">{row.site}</p>
                      {isAutoMapped && (
                        <p className="text-[10px] text-green-600 mt-0.5">Auto-mapped via Breadcrumb</p>
                      )}
                      {saveErr && <p className="text-xs text-red-500 mt-0.5">{saveErr}</p>}
                    </div>

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
                              {p.name}{p.project_number ? ` (#${p.project_number})` : ""}
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
                      <p className="text-xs text-gray-500 truncate max-w-[260px]">
                        {mappedProject
                          ? mappedProject.name
                          : <span className="italic text-gray-400">Not mapped</span>}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>}
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
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Site Diaries</th>
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
                  const dLight     = diaryLight(row.siteDiary);
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
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900 text-xs leading-tight">{row.site}</div>
                          {project && (
                            <div className="text-[10px] text-gray-400 mt-0.5 truncate">{project.name}</div>
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
                          ) : row.siteDiary === null ? (
                            <Pill light="gray">—</Pill>
                          ) : (
                            <Pill light={dLight}>{row.siteDiary.display}</Pill>
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

                              {row.siteDiary && row.siteDiary.missedDates.length > 0 && (
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                                    Site Diary — Missing Days
                                  </p>
                                  <ul className="space-y-1">
                                    {row.siteDiary.missedDates.map(date => (
                                      <li key={date} className="flex items-center justify-between text-xs">
                                        <span className="text-gray-600">
                                          {new Date(date + "T00:00:00").toLocaleDateString("en-AU", {
                                            weekday: "short", day: "numeric", month: "short",
                                          })}
                                        </span>
                                        <span className="rounded-full px-2 py-0.5 font-medium bg-amber-100 text-amber-700">
                                          Missing
                                        </span>
                                      </li>
                                    ))}
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
                               (!row.siteDiary || row.siteDiary.missedDates.length === 0) && (
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
