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

import { NextRequest, NextResponse } from "next/server";

const API_KEY  = process.env.BREADCRUMB_API_KEY;
const BASE_URL = (process.env.BREADCRUMB_API_BASE_URL ?? "https://ext-au.1bc.app").replace(/\/$/, "");
// All Breadcrumb endpoints silently return [] when pageSize exceeds ~100.
// Use 100 universally and paginate properly.
const PAGE_SIZE  = 100;
const MAX_PAGES  = 20;   // safety cap — 20 × 100 = 2000 records max per endpoint

// ── Excluded sites ─────────────────────────────────────────────────────────────
// Sandbox / overhead / completed-project siteReferences that should never
// appear in the compliance table. Add new entries here as needed.

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
// Uses Australia/Sydney so DST (AEST +10 / AEDT +11) is handled automatically.
function getSydneyDateString(fillDate: string): string {
  return new Date(fillDate).toLocaleDateString("en-CA", {
    timeZone: "Australia/Sydney",
  });
}

// Generate Mon–Fri YYYY-MM-DD strings for the given Monday in Sydney timezone.
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
  if (weekStartParam) {
    const [y, m, d] = weekStartParam.split("-").map(Number);
    const candidate = new Date(Date.UTC(y, m - 1, d));
    monday = isNaN(candidate.getTime()) ? getSydneyMonday() : candidate;
  } else {
    monday = getSydneyMonday();
  }
  return { monday, weekdays: getWeekDays(monday) };
}

// ── Paginated fetch ────────────────────────────────────────────────────────────

async function fetchAllPages<T>(
  endpoint: string,
  body: Record<string, unknown>,
): Promise<T[]> {
  let pageNumber = 1;
  const allResults: T[] = [];

  while (pageNumber <= MAX_PAGES) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "X-Api-Key": API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body, pagingInfo: { pageSize: PAGE_SIZE, pageNumber } }),
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

    // Stop if this page was not full — no more pages
    if (results.length < PAGE_SIZE) break;
    pageNumber++;
  }

  return allResults;
}

// ── Types (confirmed from debug endpoint) ─────────────────────────────────────

interface FormRecord {
  siteReference?: string;
  siteName?: string;
  formName?: string;          // confirmed field name (NOT formTitle)
  fillDate?: string;          // confirmed field name (NOT submittedDate)
  status?: string;
  procoreProjectId?: string | number | null;
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

  // Toolbox: 7-day window in Sydney time (today + 6 prior days, inclusive).
  const todaySydney        = getSydneyDateString(new Date().toISOString());
  const [ty, tm, td]       = todaySydney.split("-").map(Number);
  const todayUtc           = new Date(Date.UTC(ty, tm - 1, td));
  const sixDaysAgoUtc      = new Date(todayUtc);
  sixDaysAgoUtc.setUTCDate(sixDaysAgoUtc.getUTCDate() - 6);
  const toolboxWindowStart = sixDaysAgoUtc.toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" });

  const errors: string[] = [];

  // ── Fetch all data sources in parallel ────────────────────────────────────
  // form-report is called twice:
  //   1. weekly range  → for daily prestart counting (Mon–Sun)
  //   2. 7-day rolling → for toolbox talk detection
  // Both calls are cheap and paginated the same way.

  // NOTE: Breadcrumb's sumbittedDateRange filter does not work — the API returns
  // all records regardless of any date param. We fetch everything once and filter
  // client-side by fillDate. Both prestart (weekly) and toolbox (7-day) logic
  // uses the same allForms array.
  const [
    sitesResult,
    allFormsResult,
    inductionsResult,
    swmsResult,
    supplierDocsResult,
  ] = await Promise.allSettled([
    fetchAllPages<SiteRecord>("/integration/site/list", {}),
    fetchAllPages<FormRecord>("/integration/v2/report/form-report", {
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
  // Both prestart (weekly) and toolbox (7-day) use the same set; date filtering
  // is done client-side per record since the API's sumbittedDateRange is ignored.

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
        submittedDate: r.submittedDateTime ?? "",  // confirmed field name
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
    // ── Daily Prestarts: distinct Mon-Fri Sydney-timezone dates with ≥1 prestart form
    const prestartDays = new Set<string>();
    for (const r of formsBySite.get(siteReference) ?? []) {
      const name = (r.formName ?? "").toLowerCase();
      if (!name.includes("daily prestart") && !name.includes("daily pre-start") &&
          !name.includes("prestart") && !name.includes("pre start")) continue;
      if (!r.fillDate) continue;
      const ds = getSydneyDateString(r.fillDate);
      if (weekdays.includes(ds)) prestartDays.add(ds);
    }

    // ── Toolbox Talk: any toolbox form within the last 7 Sydney calendar days
    let lastToolbox: string | null = null;
    let toolboxSubmitted = false;
    for (const r of formsBySite.get(siteReference) ?? []) {
      const name = (r.formName ?? "").toLowerCase();
      if (!name.includes("toolbox") && !name.includes("tool box") &&
          !name.includes("tbm") && !name.includes("tbt")) continue;
      if (!r.fillDate) continue;
      const ds = getSydneyDateString(r.fillDate);
      if (ds >= toolboxWindowStart) toolboxSubmitted = true;
      if (!lastToolbox || r.fillDate > lastToolbox) lastToolbox = r.fillDate;
    }

    // ── Inductions
    const indItems = (inductionsBySite.get(siteReference) ?? []).map(r => ({
      name:          r.userFullName ?? "—",       // confirmed field name
      supplier:      r.supplierName ?? "—",
      submittedDate: r.submittedDateTime ?? "",   // confirmed field name
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
