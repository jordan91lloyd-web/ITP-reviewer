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
const PAGE_SIZE = 500;

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

function getWeekBounds(weekStartParam: string | null): {
  monday: Date;
  sunday: Date;
  weekdays: string[];  // Mon–Fri ISO date strings
} {
  const monday = weekStartParam
    ? (() => { const d = new Date(weekStartParam + "T00:00:00"); return isNaN(d.getTime()) ? computeCurrentMonday() : d; })()
    : computeCurrentMonday();

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const weekdays: string[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    weekdays.push(isoDate(d));
  }

  return { monday, sunday, weekdays };
}

function computeCurrentMonday(): Date {
  const today = new Date();
  const dow = today.getDay();
  const daysToMonday = dow === 0 ? 6 : dow - 1;
  const monday = new Date(today);
  monday.setDate(today.getDate() - daysToMonday);
  monday.setHours(0, 0, 0, 0);
  return monday;
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

  while (true) {
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

  const { monday, sunday, weekdays } = getWeekBounds(weekStartP);

  // Form report: Mon–Sun of current week (full week, not cut off at today)
  const weekFromDt = `${isoDate(monday)}T00:00:00`;
  const weekToDt   = `${isoDate(sunday)}T23:59:59`;

  // Toolbox: rolling 7-day window (may overlap previous week)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const toolboxFromDt = `${isoDate(sevenDaysAgo)}T00:00:00`;
  const toolboxToDt   = `${isoDate(new Date())}T23:59:59`;

  const errors: string[] = [];

  // ── Fetch all data sources in parallel ────────────────────────────────────
  // form-report is called twice:
  //   1. weekly range  → for daily prestart counting (Mon–Sun)
  //   2. 7-day rolling → for toolbox talk detection
  // Both calls are cheap and paginated the same way.

  const [
    sitesResult,
    weekFormsResult,
    toolboxFormsResult,
    inductionsResult,
    swmsResult,
    supplierDocsResult,
  ] = await Promise.allSettled([
    fetchAllPages<SiteRecord>("/integration/site/list", {}),
    fetchAllPages<FormRecord>("/integration/v2/report/form-report", {
      sumbittedDateRange: { from: weekFromDt, to: weekToDt },
      convertDateTimeToLocalTimezone: true,
    }),
    fetchAllPages<FormRecord>("/integration/v2/report/form-report", {
      sumbittedDateRange: { from: toolboxFromDt, to: toolboxToDt },
      convertDateTimeToLocalTimezone: true,
    }),
    fetchAllPages<ApprovalRecord>("/integration/v2/report/approval-report", {
      approveStatusList:     [0],
      approveEntityTypeList: [1],
      convertDateTimeToLocalTimezone: true,
    }),
    fetchAllPages<ApprovalRecord>("/integration/v2/report/approval-report", {
      approveStatusList:     [0],
      approveEntityTypeList: [2],
      convertDateTimeToLocalTimezone: true,
    }),
    fetchAllPages<SupplierDocRecord>("/integration/v2/report/supplier-document-report", {
      statusList: [1],
      convertDateTimeToLocalTimezone: true,
    }),
  ]);

  const siteList:      SiteRecord[]       = sitesResult.status         === "fulfilled" ? sitesResult.value         : [];
  const weekForms:     FormRecord[]       = weekFormsResult.status      === "fulfilled" ? weekFormsResult.value      : [];
  const toolboxForms:  FormRecord[]       = toolboxFormsResult.status   === "fulfilled" ? toolboxFormsResult.value   : [];
  const inductions:    ApprovalRecord[]   = inductionsResult.status     === "fulfilled" ? inductionsResult.value     : [];
  const swmsApprovals: ApprovalRecord[]   = swmsResult.status           === "fulfilled" ? swmsResult.value           : [];
  const supplierDocs:  SupplierDocRecord[] = supplierDocsResult.status  === "fulfilled" ? supplierDocsResult.value  : [];

  if (sitesResult.status         === "rejected") errors.push(`site/list: ${sitesResult.reason}`);
  if (weekFormsResult.status     === "rejected") errors.push(`form-report (week): ${weekFormsResult.reason}`);
  if (toolboxFormsResult.status  === "rejected") errors.push(`form-report (toolbox): ${toolboxFormsResult.reason}`);
  if (inductionsResult.status    === "rejected") errors.push(`approval-report (inductions): ${inductionsResult.reason}`);
  if (swmsResult.status          === "rejected") errors.push(`approval-report (SWMS): ${swmsResult.reason}`);
  if (supplierDocsResult.status  === "rejected") errors.push(`supplier-document-report: ${supplierDocsResult.reason}`);

  // ── Build procoreProjectId map from form records ──────────────────────────
  // Form records carry procoreProjectId; site/list does not.
  // Take the first non-null value seen per siteReference.

  const procoreIdFromForms = new Map<string, string>();
  for (const r of [...weekForms, ...toolboxForms]) {
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
    ...weekForms, ...toolboxForms,
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

  // ── Group week forms by siteReference ────────────────────────────────────

  const weekFormsBySite = new Map<string, FormRecord[]>();
  for (const r of weekForms) {
    const ref = r.siteReference ?? "";
    if (!ref) continue;
    if (!weekFormsBySite.has(ref)) weekFormsBySite.set(ref, []);
    weekFormsBySite.get(ref)!.push(r);
  }

  // ── Group toolbox forms by siteReference ─────────────────────────────────

  const toolboxFormsBySite = new Map<string, FormRecord[]>();
  for (const r of toolboxForms) {
    const ref = r.siteReference ?? "";
    if (!ref) continue;
    if (!toolboxFormsBySite.has(ref)) toolboxFormsBySite.set(ref, []);
    toolboxFormsBySite.get(ref)!.push(r);
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
    const prestartDays = new Set<string>();
    for (const r of weekFormsBySite.get(siteReference) ?? []) {
      if (!(r.formName ?? "").toLowerCase().includes("daily prestart")) continue;
      const d = new Date(r.fillDate ?? "");
      if (isNaN(d.getTime())) continue;
      const ds = isoDate(d);
      if (weekdays.includes(ds)) prestartDays.add(ds);
    }

    // ── Toolbox Talk: any toolbox form in the last 7 rolling days
    let lastToolbox: string | null = null;
    let toolboxSubmitted = false;
    for (const r of toolboxFormsBySite.get(siteReference) ?? []) {
      if (!(r.formName ?? "").toLowerCase().includes("toolbox")) continue;
      const d = new Date(r.fillDate ?? "");
      if (isNaN(d.getTime())) continue;
      if (d >= sevenDaysAgo) toolboxSubmitted = true;
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

  const weekEnd = new Date(monday);
  weekEnd.setDate(monday.getDate() + 6);

  return NextResponse.json({
    weekStart:  isoDate(monday),
    weekEnd:    isoDate(weekEnd),
    fetchedAt:  new Date().toISOString(),
    source:     "breadcrumb_api",
    sites,
    errors:     errors.length > 0 ? errors : undefined,
  });
}
