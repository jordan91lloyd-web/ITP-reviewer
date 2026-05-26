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

// ── Form-name matchers ─────────────────────────────────────────────────────────
// Both Daily Prestart and Toolbox Meeting are FormType = 7 (Site Briefing).
// They are distinguished by formName. All matching is case-insensitive.

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

// ── Coverage check ─────────────────────────────────────────────────────────────
// If an actual endDate is known (fetched from /integration/v2/report/form-data),
// a submission covers fillDate through endDate inclusive (both Sydney calendar dates).
// Otherwise falls back to fillDate + 6 days (the original 7-day rule).
//
// All date parameters must be YYYY-MM-DD Sydney calendar date strings.
function coversDay(fillDateSydney: string, targetDay: string, endDateSydney?: string): boolean {
  const [fy, fm, fd] = fillDateSydney.split("-").map(Number);
  const [ty, tm, td] = targetDay.split("-").map(Number);
  const fillMs   = Date.UTC(fy, fm - 1, fd);
  const targetMs = Date.UTC(ty, tm - 1, td);
  if (targetMs < fillMs) return false;

  if (endDateSydney) {
    const [ey, em, ed] = endDateSydney.split("-").map(Number);
    const endMs = Date.UTC(ey, em - 1, ed);
    return targetMs <= endMs;
  }

  // Fallback: 7-day forward window (fillDate + 6 days)
  const diffDays = (targetMs - fillMs) / 86_400_000;
  return diffDays <= 6;
}

// ── Fetch actual endDate from Breadcrumb form-data API ─────────────────────────
// Returns a YYYY-MM-DD Sydney date string, or null on any failure.
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

    // DEBUG: log the top-level keys and filledFormInfo shape so we can confirm
    // the correct field path. Remove once the path is verified.
    console.log(`[FORM-DATA DEBUG] formDataId=${formDataId} top-level keys:`, Object.keys(data ?? {}));
    console.log(`[FORM-DATA DEBUG] data.result?.filledFormInfo?.endDate =`, data?.result?.filledFormInfo?.endDate);
    console.log(`[FORM-DATA DEBUG] data.filledFormInfo?.endDate         =`, data?.filledFormInfo?.endDate);
    console.log(`[FORM-DATA DEBUG] data.result?.endDate                 =`, data?.result?.endDate);
    console.log(`[FORM-DATA DEBUG] data.endDate                         =`, data?.endDate);

    // Try all known field paths in priority order
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

  // Date range for form-report: 14 days before Monday → Friday 23:59:59.
  // Captures submissions made up to 2 weeks prior that still cover days in
  // the selected week via the 7-day forward coverage rule.
  // NOTE: Breadcrumb's sumbittedDateRange filter is currently ignored by the
  // API — records are returned regardless and we filter client-side by fillDate.
  // The range is set here for semantic correctness and future-proofing.
  const fetchFrom = new Date(monday.getTime() - 14 * 86_400_000);
  const fetchTo   = new Date(monday.getTime() +  4 * 86_400_000); // Friday
  const fromDt = `${getSydneyDateString(fetchFrom.toISOString())}T00:00:00`;
  const toDt   = `${getSydneyDateString(fetchTo.toISOString())}T23:59:59`;

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

  // ── Fetch actual endDates for pre-week prestart/toolbox submissions ──────────
  // Submissions made before the selected week's Monday cannot be reliably covered
  // by the fixed 7-day rule alone (e.g. a form submitted 10 days ago with a
  // "Valid Until" date that extends into this week would be missed).
  // For those submissions only, we call /integration/v2/report/form-data to get
  // the real expiry date. Submissions within the current week use the 7-day
  // fallback — no extra fetch needed.

  const mondaySydney = getSydneyDateString(monday.toISOString());

  // Collect unique formDataIds for qualifying submissions
  const preWeekFormDataIds = new Set<string>();
  for (const r of allForms) {
    if (!r.fillDate || !r.formDataId) continue;
    if (!isPrestartForm(r.formName ?? "") && !isToolboxForm(r.formName ?? "")) continue;
    const fillDaySydney = getSydneyDateString(r.fillDate);
    if (fillDaySydney < mondaySydney) {
      preWeekFormDataIds.add(String(r.formDataId));
    }
  }

  // Fetch in parallel — failures silently return null (fallback to 7-day rule)
  const endDateMap = new Map<string, string>(); // formDataId → YYYY-MM-DD Sydney
  if (preWeekFormDataIds.size > 0) {
    const detailResults = await Promise.all(
      Array.from(preWeekFormDataIds).map(async id => ({
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
    const isBondi = meta.siteName.toLowerCase().includes("bondi");

    // ── Daily Prestarts: count Mon–Fri days covered by ≥1 "Daily Prestart" submission.
    // For submissions made before this week, uses the actual endDate from the
    // form-data API (fetched above). For submissions within this week, falls back
    // to fillDate + 6 days. Count distinct weekdays covered; display as X/5.
    const prestartDays = new Set<string>();
    for (const r of formsBySite.get(siteReference) ?? []) {
      if (!isPrestartForm(r.formName ?? "")) continue;
      if (!r.fillDate) continue;
      const fillDaySydney = getSydneyDateString(r.fillDate);
      const endDateSydney = r.formDataId ? endDateMap.get(String(r.formDataId)) : undefined;

      if (isBondi) {
        console.log("[BONDI DEBUG] prestart record:", {
          formDataId:     r.formDataId ?? null,
          fillDateRaw:    r.fillDate,
          fillDateSydney: fillDaySydney,
          endDateFromMap: endDateSydney ?? null,
          coverageMode:   endDateSydney ? "actual endDate" : "7-day fallback",
        });
        for (const wd of weekdays) {
          const covers = coversDay(fillDaySydney, wd, endDateSydney);
          console.log(`  → coversDay("${fillDaySydney}", "${wd}", ${endDateSydney ?? "undefined"}) = ${covers}`);
          if (covers) prestartDays.add(wd);
        }
      } else {
        for (const wd of weekdays) {
          if (coversDay(fillDaySydney, wd, endDateSydney)) prestartDays.add(wd);
        }
      }
    }

    if (isBondi) {
      console.log("[BONDI DEBUG] final prestartDays:", Array.from(prestartDays).sort());
    }

    // ── Toolbox Meeting: "Done" if ≥1 "Toolbox Meeting" submission covers any Mon–Fri
    // day in the selected week. Uses actual endDate from form-data API for pre-week
    // submissions; falls back to 7-day rule for submissions within this week.
    // lastToolbox tracks the most recent submission ever (informational).
    let toolboxSubmitted = false;
    let lastToolbox: string | null = null;
    for (const r of formsBySite.get(siteReference) ?? []) {
      if (!isToolboxForm(r.formName ?? "")) continue;
      if (!r.fillDate) continue;
      const fillDaySydney = getSydneyDateString(r.fillDate);
      const endDateSydney = r.formDataId ? endDateMap.get(String(r.formDataId)) : undefined;
      if (weekdays.some(wd => coversDay(fillDaySydney, wd, endDateSydney))) {
        toolboxSubmitted = true;
      }
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
