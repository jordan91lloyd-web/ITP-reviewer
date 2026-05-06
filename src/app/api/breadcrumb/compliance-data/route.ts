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

// AEST is UTC+10. We use a fixed +10 offset (not AEDT +11) to be consistent —
// Breadcrumb timestamps arrive with explicit offsets so local parsing is fine.
const AEST_OFFSET_MINUTES = 10 * 60;

// Returns the current date/time expressed as if it were UTC but shifted to AEST.
// All .getUTC*() calls on the returned Date give AEST wall-clock values.
function nowInAest(): Date {
  return new Date(Date.now() + AEST_OFFSET_MINUTES * 60_000);
}

function computeCurrentMondayAest(): Date {
  const aestNow  = nowInAest();
  const dow      = aestNow.getUTCDay();          // 0=Sun, 1=Mon … 6=Sat
  const daysBack = dow === 0 ? 6 : dow - 1;
  const monday   = new Date(aestNow);
  monday.setUTCDate(aestNow.getUTCDate() - daysBack);
  monday.setUTCHours(0, 0, 0, 0);
  return monday;                                 // Mon 00:00:00 AEST as UTC
}

// Format as "YYYY-MM-DDThh:mm:ss" (no timezone suffix) for Breadcrumb date range
// params. The debug endpoint confirmed the API accepts plain local datetimes;
// including "+10:00" causes it to silently ignore the filter and return all records.
function aestDatetime(d: Date, endOfDay = false): string {
  const y  = d.getUTCFullYear();
  const mo = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dy = String(d.getUTCDate()).padStart(2, "0");
  const time = endOfDay ? "23:59:59" : "00:00:00";
  return `${y}-${mo}-${dy}T${time}`;
}

// YYYY-MM-DD in AEST local date (for weekday list used to match fillDate values).
function aestIsoDate(d: Date): string {
  const y  = d.getUTCFullYear();
  const mo = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dy = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${mo}-${dy}`;
}

function getWeekBounds(weekStartParam: string | null): {
  monday: Date;          // Mon 00:00:00 AEST (stored as UTC-shifted)
  weekdays: string[];    // Mon–Fri YYYY-MM-DD in AEST
} {
  let monday: Date;
  if (weekStartParam) {
    // weekStartParam is YYYY-MM-DD from the client; interpret as AEST local date
    const [y, m, d] = weekStartParam.split("-").map(Number);
    const candidate = new Date(Date.UTC(y, m - 1, d));
    monday = isNaN(candidate.getTime()) ? computeCurrentMondayAest() : candidate;
  } else {
    monday = computeCurrentMondayAest();
  }

  const weekdays: string[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + i);
    weekdays.push(aestIsoDate(d));
  }

  return { monday, weekdays };
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
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

    console.log(`[compliance-data] ${endpoint} page ${pageNumber}: ${results.length} records`);
    if (pageNumber === 1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log(`[compliance-data] ${endpoint} sample dates:`,
        (results as any[]).slice(0, 3).map((r: any) => r.fillDate ?? r.submittedDateTime ?? r.submittedDate ?? "(no date)"));
    }

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

  // Week bounds for client-side filtering
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);

  // Toolbox: rolling 7-day window — compute threshold for client-side filter
  const sevenDaysAgo = nowInAest();
  sevenDaysAgo.setUTCDate(sevenDaysAgo.getUTCDate() - 7);

  // TEMP DEBUG — three date format variants to find what Breadcrumb accepts
  {
    const headers = { "Content-Type": "application/json", "X-Api-Key": API_KEY! };
    const base = { pagingInfo: { pageSize: 100, pageNumber: 1 }, convertDateTimeToLocalTimezone: true };

    const [t1, t2, t3] = await Promise.all([
      fetch(`${BASE_URL}/integration/v2/report/form-report`, {
        method: "POST", headers,
        body: JSON.stringify({ ...base, sumbittedDateRange: { from: "2026-05-04T00:00:00", to: "2026-05-06T23:59:59" } }),
        signal: AbortSignal.timeout(15_000),
      }).then(r => r.json()),
      fetch(`${BASE_URL}/integration/v2/report/form-report`, {
        method: "POST", headers,
        body: JSON.stringify({ ...base, sumbittedDateRange: { from: "2026-05-04", to: "2026-05-06" } }),
        signal: AbortSignal.timeout(15_000),
      }).then(r => r.json()),
      fetch(`${BASE_URL}/integration/v2/report/form-report`, {
        method: "POST", headers,
        body: JSON.stringify({ ...base, sumbittedDateRange: { from: "2026-05-03T14:00:00", to: "2026-05-06T13:59:59" } }),
        signal: AbortSignal.timeout(15_000),
      }).then(r => r.json()),
    ]);

    console.log("[DEBUG t1] plain datetime (no tz)  count:", t1.result?.length, " first fillDate:", t1.result?.[0]?.fillDate);
    console.log("[DEBUG t2] date-only format          count:", t2.result?.length, " first fillDate:", t2.result?.[0]?.fillDate);
    console.log("[DEBUG t3] UTC offset for AEST       count:", t3.result?.length, " first fillDate:", t3.result?.[0]?.fillDate);
  }

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

  console.log('[compliance-data] total form records (all time):', allForms.length);
  console.log('[compliance-data] sample fillDates:', allForms.slice(0, 3).map(r => r.fillDate));
  console.log('[compliance-data] weekdays filter:', weekdays);
  console.log('[compliance-data] approval results count:', inductions.length + swmsApprovals.length);

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
    // ── Daily Prestarts: distinct Mon-Fri dates with at least one prestart form
    // fillDate arrives with +10:00 offset; shift to AEST to get the local date.
    const prestartDays = new Set<string>();
    for (const r of formsBySite.get(siteReference) ?? []) {
      if (!(r.formName ?? "").toLowerCase().includes("daily prestart")) continue;
      const d = new Date(r.fillDate ?? "");
      if (isNaN(d.getTime())) continue;
      const ds = aestIsoDate(new Date(d.getTime() + AEST_OFFSET_MINUTES * 60_000));
      if (weekdays.includes(ds)) prestartDays.add(ds);
    }

    // ── Toolbox Talk: any toolbox form in the last 7 rolling days
    let lastToolbox: string | null = null;
    let toolboxSubmitted = false;
    for (const r of formsBySite.get(siteReference) ?? []) {
      if (!(r.formName ?? "").toLowerCase().includes("toolbox")) continue;
      const d = new Date(r.fillDate ?? "");
      if (isNaN(d.getTime())) continue;
      // sevenDaysAgo is AEST-shifted; subtract offset to get real UTC threshold
      if (d.getTime() >= sevenDaysAgo.getTime() - AEST_OFFSET_MINUTES * 60_000) toolboxSubmitted = true;
      if (!lastToolbox || d > new Date(lastToolbox)) lastToolbox = r.fillDate ?? null;
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

  console.log('[compliance-data] site rows built:', JSON.stringify(sites.map(r => ({
    site:       r.siteName,
    prestarts:  r.dailyPrestarts.count,
    toolbox:    r.toolboxTalk.submitted,
    inductions: r.pendingInductions.count,
    docs:       r.pendingDocs.count,
  }))));

  // TEMP DEBUG — expose diagnostic info in response body
  const uniqueFormNames = [...new Set(allForms.map(r => r.formName ?? "(null)"))];
  const mayRecords = allForms.filter(r => (r.fillDate ?? "").startsWith("2026-05"));
  const prestartRecordsThisWeek = allForms.filter(r => {
    if (!(r.formName ?? "").toLowerCase().includes("daily prestart")) return false;
    const d = new Date(r.fillDate ?? "");
    if (isNaN(d.getTime())) return false;
    const ds = aestIsoDate(new Date(d.getTime() + AEST_OFFSET_MINUTES * 60_000));
    return weekdays.includes(ds);
  });

  return NextResponse.json({
    weekStart:  aestIsoDate(monday),
    weekEnd:    aestIsoDate(sunday),
    fetchedAt:  new Date().toISOString(),
    source:     "breadcrumb_api",
    sites,
    errors:     errors.length > 0 ? errors : undefined,
    _debug: {
      serverUtcNow:             new Date().toISOString(),
      weekdays,
      allFormsCount:            allForms.length,
      uniqueFormNames,
      mayRecordsCount:          mayRecords.length,
      mayRecordsSample:         mayRecords.slice(0, 5).map(r => ({ fillDate: r.fillDate, formName: r.formName, site: r.siteReference })),
      prestartThisWeekCount:    prestartRecordsThisWeek.length,
      prestartThisWeekSample:   prestartRecordsThisWeek.slice(0, 3).map(r => ({ fillDate: r.fillDate, site: r.siteReference })),
      latestFillDates:          [...allForms].sort((a, b) => (b.fillDate ?? "").localeCompare(a.fillDate ?? "")).slice(0, 5).map(r => ({ fillDate: r.fillDate, formName: r.formName, site: r.siteReference })),
    },
  });
}
