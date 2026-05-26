// ─── GET /api/breadcrumb/compliance-data ──────────────────────────────────────
// Fetches all four Breadcrumb data sets in parallel and returns pre-computed
// KPI values per site for the requested week.
//
// Query params:
//   company_id   (required)
//   week_start   YYYY-MM-DD (optional — defaults to current Monday)
//
// Returns:
//   { weekStart, weekEnd, fetchedAt, source, sites, errors }
//
// Never throws — errors per endpoint are captured in the errors[] array and
// partial data is returned.
//
// Coverage rules for Daily Prestarts and Toolbox Meetings:
//   With endDate (fetched from form-data API):
//     submission covers a day if fillDate <= day <= endDate (all Sydney dates)
//   Without endDate (fetch failed or no formDataId):
//     submission covers only its exact fillDate day

import { NextRequest, NextResponse } from "next/server";

// Force dynamic — never cache this route. week_start query param must be
// evaluated per-request.
export const dynamic = "force-dynamic";

const API_KEY  = process.env.BREADCRUMB_API_KEY;
const BASE_URL = (process.env.BREADCRUMB_API_BASE_URL ?? "https://ext-au.1bc.app").replace(/\/$/, "");
// All Breadcrumb endpoints silently return [] when pageSize exceeds ~100.
// Use 100 universally and paginate properly.
const PAGE_SIZE  = 100;
const MAX_PAGES  = 20;   // safety cap — 20 × 100 = 2000 records max per endpoint

// ── Excluded sites ─────────────────────────────────────────────────────────────

const EXCLUDED_SITE_REFERENCES = new Set([
  "BC3477059474", // Do Not Use 1 Breadcrumb Sandbox
  "xxxx",         // Do Not Use Glitch Sandbox
  "XXX",          // Sandbox Test Project
  "0000",         // Company Overheads
  "999",          // EOI Projects
  "001",          // Microniche - completed project
]);

const EXCLUDED_NAME_PREFIXES = [
  "do not use",
  "eoi",
  "company",
  "microniche",
];

function isExcluded(siteReference: string, siteName: string): boolean {
  if (EXCLUDED_SITE_REFERENCES.has(siteReference)) return true;
  const lower = siteName.toLowerCase();
  return EXCLUDED_NAME_PREFIXES.some(prefix => lower.startsWith(prefix));
}

// ── Week / date helpers ────────────────────────────────────────────────────────

// Convert any ISO date string to its YYYY-MM-DD calendar date in Sydney timezone.
function getSydneyDateString(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-CA", {
    timeZone: "Australia/Sydney",
  });
}

// Convert a YYYY-MM-DD string to a UTC millisecond timestamp for comparison.
function dateToMs(yyyymmdd: string): number {
  const [y, m, d] = yyyymmdd.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

// Generate Mon–Fri YYYY-MM-DD strings for the given Monday (UTC midnight Date).
function getWeekDays(monday: Date): string[] {
  const days: string[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + i);
    days.push(d.toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" }));
  }
  return days;
}

// Returns the Monday of the current week as midnight UTC for that Sydney calendar date.
function getSydneyMonday(): Date {
  const now           = new Date();
  const sydneyDateStr = now.toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" });
  const [year, month, day] = sydneyDateStr.split("-").map(Number);
  const sydneyDate    = new Date(Date.UTC(year, month - 1, day));
  const dow           = sydneyDate.getUTCDay();   // 0=Sun, 1=Mon … 6=Sat
  const daysToMon     = dow === 0 ? 6 : dow - 1;
  sydneyDate.setUTCDate(sydneyDate.getUTCDate() - daysToMon);
  return sydneyDate;
}

function getWeekBounds(weekStartParam: string | null): {
  monday: Date;
  weekdays: string[];   // Mon–Fri YYYY-MM-DD in Sydney timezone
} {
  let monday: Date;
  if (weekStartParam && /^\d{4}-\d{2}-\d{2}$/.test(weekStartParam)) {
    const [y, m, d] = weekStartParam.split("-").map(Number);
    const candidate = new Date(Date.UTC(y, m - 1, d));
    monday = isNaN(candidate.getTime()) ? getSydneyMonday() : candidate;
  } else {
    monday = getSydneyMonday();
  }
  return { monday, weekdays: getWeekDays(monday) };
}

// ── Form-name matchers ─────────────────────────────────────────────────────────

function isPrestartForm(formName: string): boolean {
  const n = formName.trim().toLowerCase();
  return (
    n.includes("daily prestart") ||
    n.includes("daily pre-start") ||
    n.includes("prestart") ||
    n.includes("pre start") ||
    n.includes("daily brief") ||
    n.includes("daily briefing") ||
    n.includes("site briefing")
  );
}

function isToolboxForm(formName: string): boolean {
  const n = formName.trim().toLowerCase();
  return (
    n.includes("toolbox") ||
    n.includes("tool box") ||
    n === "tbt"
  );
}

// ── Fetch actual endDate from Breadcrumb form-data API ─────────────────────────
// Returns a YYYY-MM-DD Sydney date string, or null on any failure.
// Tries all known response field paths in priority order.
async function fetchFormDataEndDate(formDataId: number | string): Promise<string | null> {
  try {
    const res = await fetch(`${BASE_URL}/integration/v2/report/form-data`, {
      method: "POST",
      headers: { "X-Api-Key": API_KEY!, "Content-Type": "application/json" },
      body: JSON.stringify({ formDataId }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const rawEnd: string | undefined =
      data?.result?.filledFormInfo?.endDate ??
      data?.filledFormInfo?.endDate          ??
      data?.result?.endDate                  ??
      data?.endDate;
    if (!rawEnd) return null;
    return getSydneyDateString(rawEnd);
  } catch {
    return null;
  }
}

// ── Paginated fetch ────────────────────────────────────────────────────────────

async function fetchAllPages<T>(
  endpoint: string,
  body: Record<string, unknown>,
): Promise<T[]> {
  let pageNumber = 0;
  const allResults: T[] = [];

  while (pageNumber <= MAX_PAGES) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "X-Api-Key": API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body, pagingInfo: { pageSize: PAGE_SIZE, pageNumber, SortOrder: "DESC" } }),
      signal: AbortSignal.timeout(20_000),
    });

    if (!res.ok) {
      throw new Error(`Breadcrumb ${endpoint} returned ${res.status}`);
    }

    const data = await res.json();
    const results: T[] = Array.isArray(data?.result)
      ? data.result
      : Array.isArray(data)
        ? data
        : [];

    allResults.push(...results);

    if (results.length < PAGE_SIZE) break;
    pageNumber++;
  }

  return allResults;
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormRecord {
  siteReference?: string;
  siteName?: string;
  formName?: string;          // confirmed field name (NOT formTitle)
  formType?: number | string; // 7 = Site Briefing (Daily Prestart + Toolbox Meeting)
  fillDate?: string;          // confirmed field name (NOT submittedDate)
  status?: string;
  procoreProjectId?: string | number | null;
  formDataId?: number | string | null;
}

interface ApprovalRecord {
  siteReference?: string;
  siteName?: string;
  userFullName?: string;      // confirmed field name
  supplierName?: string;
  title?: string;
  submittedDateTime?: string; // confirmed field name (NOT submittedDate)
  id?: string | number;
}

interface SupplierDocRecord {
  siteReference?: string;
  siteName?: string;
  supplierName?: string;
  documentTitle?: string;
  title?: string;
  status?: number;
  id?: string | number;
}

interface SiteRecord {
  siteReference?: string;
  name?: string;              // confirmed field name (NOT siteName)
}

// ── Handler ────────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ fallback: true, sites: [] });
  }

  const sp         = request.nextUrl.searchParams;
  const companyId  = sp.get("company_id");
  const weekStartP = sp.get("week_start");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required" }, { status: 400 });
  }

  const { monday, weekdays } = getWeekBounds(weekStartP);

  // Lookback window: 14 days before Monday → Friday of selected week.
  // NOTE: Breadcrumb's sumbittedDateRange filter is currently ignored by the API —
  // records are returned regardless of date range. The range is set here for
  // semantic correctness and future-proofing.
  const fetchFrom = new Date(monday.getTime() - 14 * 86_400_000);
  const fetchTo   = new Date(monday.getTime() +  4 * 86_400_000); // Friday
  const fetchFromSydney = getSydneyDateString(fetchFrom.toISOString());
  const fetchToSydney   = getSydneyDateString(fetchTo.toISOString());
  const fromDt = `${fetchFromSydney}T00:00:00`;
  const toDt   = `${fetchToSydney}T23:59:59`;

  const errors: string[] = [];

  // ── Fetch all data sources in parallel ────────────────────────────────────
  const [
    sitesResult,
    allFormsResult,
    inductionsResult,
    swmsResult,
    supplierDocsResult,
  ] = await Promise.allSettled([
    fetchAllPages<SiteRecord>("/integration/site/list", {}),
    fetchAllPages<FormRecord>("/integration/v2/report/form-report", {
      sumbittedDateRange: { from: fromDt, to: toDt },
      convertDateTimeToLocalTimezone: true,
    }),
    fetchAllPages<ApprovalRecord>("/integration/v2/report/approval-report", {
      approveStatusList:     [0],
      approveEntityTypeList: [1],
    }),
    fetchAllPages<ApprovalRecord>("/integration/v2/report/approval-report", {
      approveStatusList:     [0],
      approveEntityTypeList: [2],
    }),
    fetchAllPages<SupplierDocRecord>("/integration/v2/report/supplier-document-report", {
      statusList: [1],
      convertDateTimeToLocalTimezone: true,
    }),
  ]);

  const siteList:      SiteRecord[]        = sitesResult.status      === "fulfilled" ? sitesResult.value      : [];
  const allForms:      FormRecord[]        = allFormsResult.status    === "fulfilled" ? allFormsResult.value    : [];
  const inductions:    ApprovalRecord[]    = inductionsResult.status  === "fulfilled" ? inductionsResult.value  : [];
  const swmsApprovals: ApprovalRecord[]    = swmsResult.status        === "fulfilled" ? swmsResult.value        : [];
  const supplierDocs:  SupplierDocRecord[] = supplierDocsResult.status === "fulfilled" ? supplierDocsResult.value : [];

  if (sitesResult.status         === "rejected") errors.push(`site/list: ${sitesResult.reason}`);
  if (allFormsResult.status      === "rejected") errors.push(`form-report: ${allFormsResult.reason}`);
  if (inductionsResult.status    === "rejected") errors.push(`approval-report (inductions): ${inductionsResult.reason}`);
  if (swmsResult.status          === "rejected") errors.push(`approval-report (SWMS): ${swmsResult.reason}`);
  if (supplierDocsResult.status  === "rejected") errors.push(`supplier-document-report: ${supplierDocsResult.reason}`);

  // ── Fetch endDate for all prestart/toolbox submissions in the lookback window ─
  // Fetch for every record whose fillDate falls within fetchFrom–fetchTo, not just
  // pre-Monday ones. This handles same-week submissions that have multi-day validity.
  // Deduplicates by formDataId before fetching. Failures silently return null.

  const formDataIdsToFetch = new Set<string>();
  for (const r of allForms) {
    if (!r.fillDate || !r.formDataId) continue;
    if (!isPrestartForm(r.formName ?? "") && !isToolboxForm(r.formName ?? "")) continue;
    const fillDaySydney = getSydneyDateString(r.fillDate);
    if (fillDaySydney >= fetchFromSydney && fillDaySydney <= fetchToSydney) {
      formDataIdsToFetch.add(String(r.formDataId));
    }
  }

  const endDateMap = new Map<string, string>(); // formDataId → YYYY-MM-DD Sydney
  if (formDataIdsToFetch.size > 0) {
    const detailResults = await Promise.all(
      Array.from(formDataIdsToFetch).map(async id => ({
        id,
        endDate: await fetchFormDataEndDate(id),
      }))
    );
    for (const { id, endDate } of detailResults) {
      if (endDate) endDateMap.set(id, endDate);
    }
  }

  // ── Build procoreProjectId map from form records ──────────────────────────
  // Form records carry procoreProjectId; site/list does not.
  // Take the first non-null value seen per siteReference.

  const procoreIdFromForms = new Map<string, string>();
  for (const r of allForms) {
    const ref = r.siteReference ?? "";
    if (!ref || procoreIdFromForms.has(ref)) continue;
    if (r.procoreProjectId != null && r.procoreProjectId !== "") {
      procoreIdFromForms.set(ref, String(r.procoreProjectId));
    }
  }

  // ── Build master site map ──────────────────────────────────────────────────

  const siteMap = new Map<string, { siteName: string; procoreProjectId: string | null }>();

  for (const s of siteList) {
    const ref  = String(s.siteReference ?? "");
    const name = String(s.name ?? "");  // confirmed: "name" not "siteName"
    if (!ref || isExcluded(ref, name)) continue;
    siteMap.set(ref, {
      siteName:         name,
      procoreProjectId: procoreIdFromForms.get(ref) ?? null,
    });
  }

  // Ensure sites that appear in form/approval records but not site/list are included
  // (provides resilience if site/list call failed)
  const allRecords = [
    ...allForms,
    ...inductions, ...swmsApprovals,
    ...(supplierDocs as Array<{ siteReference?: string; siteName?: string }>),
  ];
  for (const r of allRecords) {
    const ref  = r.siteReference ?? "";
    const name = r.siteName ?? "";
    if (!ref || siteMap.has(ref) || isExcluded(ref, name)) continue;
    siteMap.set(ref, {
      siteName:         name,
      procoreProjectId: procoreIdFromForms.get(ref) ?? null,
    });
  }

  // ── Group all forms by siteReference ─────────────────────────────────────

  const formsBySite = new Map<string, FormRecord[]>();
  for (const r of allForms) {
    const ref = r.siteReference ?? "";
    if (!ref) continue;
    if (!formsBySite.has(ref)) formsBySite.set(ref, []);
    formsBySite.get(ref)!.push(r);
  }

  // ── Group inductions by siteReference ────────────────────────────────────

  const inductionsBySite = new Map<string, ApprovalRecord[]>();
  for (const r of inductions) {
    const ref = r.siteReference ?? "";
    if (!ref) continue;
    if (!inductionsBySite.has(ref)) inductionsBySite.set(ref, []);
    inductionsBySite.get(ref)!.push(r);
  }

  // ── Combine SWMS approvals + supplier docs, dedup by title+supplier ───────

  const docsBySite = new Map<string, Array<{
    documentTitle: string;
    supplier: string;
    submittedDate: string;
    dedupeKey: string;
  }>>();

  for (const r of swmsApprovals) {
    const ref = r.siteReference ?? "";
    if (!ref) continue;
    if (!docsBySite.has(ref)) docsBySite.set(ref, []);
    const title    = r.title ?? "—";
    const supplier = r.supplierName ?? "—";
    const key      = `${title}|${supplier}`;
    const list     = docsBySite.get(ref)!;
    if (!list.some(d => d.dedupeKey === key)) {
      list.push({
        documentTitle: title,
        supplier,
        submittedDate: r.submittedDateTime ?? "",
        dedupeKey: key,
      });
    }
  }

  for (const r of supplierDocs) {
    const ref = r.siteReference ?? "";
    if (!ref) continue;
    if (!docsBySite.has(ref)) docsBySite.set(ref, []);
    const title    = r.documentTitle ?? r.title ?? "—";
    const supplier = r.supplierName ?? "—";
    const key      = `${title}|${supplier}`;
    const list     = docsBySite.get(ref)!;
    if (!list.some(d => d.dedupeKey === key)) {
      list.push({ documentTitle: title, supplier, submittedDate: "", dedupeKey: key });
    }
  }

  // ── Build per-site output ─────────────────────────────────────────────────

  const sites = Array.from(siteMap.entries()).map(([siteReference, meta]) => {

    // ── Daily Prestarts ───────────────────────────────────────────────────────
    // Coverage per submission:
    //   With endDate:    fillDate <= day <= endDate  (all YYYY-MM-DD Sydney)
    //   Without endDate: day === fillDate             (exact match only)
    const prestartDays = new Set<string>();
    for (const r of formsBySite.get(siteReference) ?? []) {
      if (!isPrestartForm(r.formName ?? "")) continue;
      if (!r.fillDate) continue;
      const fillDay    = getSydneyDateString(r.fillDate);
      const endDay     = r.formDataId ? endDateMap.get(String(r.formDataId)) : undefined;
      const fillMs     = dateToMs(fillDay);
      const endMs      = endDay ? dateToMs(endDay) : null;

      for (const wd of weekdays) {
        const wdMs = dateToMs(wd);
        const covered = endMs !== null
          ? (fillMs <= wdMs && wdMs <= endMs)
          : (wdMs === fillMs || wdMs === fillMs + 86400000);
        if (covered) prestartDays.add(wd);
      }
    }

    // ── Toolbox Meeting ───────────────────────────────────────────────────────
    // "Done" if ≥1 toolbox submission covers any Mon–Fri day in the selected week.
    // Same coverage rules as prestarts.
    // lastToolbox tracks the most recent submission ever (informational).
    let toolboxSubmitted = false;
    let lastToolbox: string | null = null;
    for (const r of formsBySite.get(siteReference) ?? []) {
      if (!isToolboxForm(r.formName ?? "")) continue;
      if (!r.fillDate) continue;
      const fillDay = getSydneyDateString(r.fillDate);
      const endDay  = r.formDataId ? endDateMap.get(String(r.formDataId)) : undefined;
      const fillMs  = dateToMs(fillDay);
      const endMs   = endDay ? dateToMs(endDay) : null;

      if (weekdays.some(wd => {
        const wdMs = dateToMs(wd);
        return endMs !== null
          ? (fillMs <= wdMs && wdMs <= endMs)
          : (wdMs === fillMs || wdMs === fillMs + 86400000);
      })) {
        toolboxSubmitted = true;
      }

      if (!lastToolbox || r.fillDate > lastToolbox) lastToolbox = r.fillDate;
    }

    // ── Inductions
    const indItems = (inductionsBySite.get(siteReference) ?? []).map(r => ({
      name:          r.userFullName ?? "—",
      supplier:      r.supplierName ?? "—",
      submittedDate: r.submittedDateTime ?? "",
      title:         r.title ?? r.userFullName ?? "—",
    }));

    // ── Docs
    const docItems = (docsBySite.get(siteReference) ?? []).map(d => ({
      documentTitle: d.documentTitle,
      supplier:      d.supplier,
      submittedDate: d.submittedDate,
    }));

    return {
      siteReference,
      siteName:         meta.siteName,
      procoreProjectId: meta.procoreProjectId,
      dailyPrestarts: {
        count: prestartDays.size,
        total: 5,
        days:  Array.from(prestartDays).sort(),
      },
      toolboxTalk: {
        submitted:     toolboxSubmitted,
        lastSubmitted: lastToolbox,
      },
      pendingInductions: {
        count: indItems.length,
        items: indItems,
      },
      pendingDocs: {
        count: docItems.length,
        items: docItems,
      },
    };
  });

  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);

  return NextResponse.json({
    weekStart:  getSydneyDateString(monday.toISOString()),
    weekEnd:    getSydneyDateString(sunday.toISOString()),
    fetchedAt:  new Date().toISOString(),
    source:     "breadcrumb_api",
    sites,
    errors:     errors.length > 0 ? errors : undefined,
  });
}
