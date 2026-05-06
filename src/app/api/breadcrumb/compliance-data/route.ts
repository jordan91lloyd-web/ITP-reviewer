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

// ── Helpers ────────────────────────────────────────────────────────────────────

function getWeekBounds(weekStartParam: string | null): { monday: Date; weekdays: string[] } {
  let monday: Date;
  if (weekStartParam) {
    monday = new Date(weekStartParam + "T00:00:00");
    if (isNaN(monday.getTime())) monday = computeCurrentMonday();
  } else {
    monday = computeCurrentMonday();
  }
  const weekdays: string[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    weekdays.push(d.toISOString().slice(0, 10));
  }
  return { monday, weekdays };
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

function oldestDate(dates: Array<string | undefined | null>): string | null {
  let oldest: Date | null = null;
  for (const s of dates) {
    if (!s) continue;
    const d = new Date(s);
    if (isNaN(d.getTime())) continue;
    if (oldest === null || d < oldest) oldest = d;
  }
  return oldest ? oldest.toISOString() : null;
}

// Fetch all pages of a Breadcrumb paginated endpoint.
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

// ── Types ──────────────────────────────────────────────────────────────────────

interface FormRecord {
  siteReference?: string;
  siteName?: string;
  formTitle?: string;
  submittedDate?: string;
  status?: string;
}

interface ApprovalRecord {
  siteReference?: string;
  siteName?: string;
  fullName?: string;
  supplierName?: string;
  title?: string;
  submittedDate?: string;
  id?: string | number;
  approvalId?: string | number;
}

interface SupplierDocRecord {
  siteReference?: string;
  siteName?: string;
  supplierName?: string;
  documentTitle?: string;
  title?: string;
  status?: number;
  id?: string | number;
  documentId?: string | number;
}

interface SiteRecord {
  siteReference?: string;
  SiteReference?: string;
  siteName?: string;
  SiteName?: string;
  procoreProjectId?: string | number | null;
  ProcoreProjectId?: string | number | null;
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
  const weekEnd = new Date(monday);
  weekEnd.setDate(monday.getDate() + 4);

  const fromDt = `${isoDate(monday)}T00:00:00`;
  const toDt   = `${isoDate(new Date())}T23:59:59`;   // up to today within the week

  const errors: string[] = [];

  // ── Fetch all 5 data sources in parallel ────────────────────────────────────

  const [sitesResult, formsResult, inductionsResult, swmsResult, supplierDocsResult] =
    await Promise.allSettled([
      fetchAllPages<SiteRecord>("/integration/site/list", { IncludeProcoreEntities: true }),
      fetchAllPages<FormRecord>("/integration/v2/report/form-report", {
        sumbittedDateRange: { from: fromDt, to: toDt },
        convertDateTimeToLocalTimezone: true,
      }),
      fetchAllPages<ApprovalRecord>("/integration/v2/report/approval-report", {
        approveStatusList:    [0],
        approveEntityTypeList: [1],
        convertDateTimeToLocalTimezone: true,
      }),
      fetchAllPages<ApprovalRecord>("/integration/v2/report/approval-report", {
        approveStatusList:    [0],
        approveEntityTypeList: [2],
        convertDateTimeToLocalTimezone: true,
      }),
      fetchAllPages<SupplierDocRecord>("/integration/v2/report/supplier-document-report", {
        statusList: [1],
        convertDateTimeToLocalTimezone: true,
      }),
    ]);

  const siteList:       SiteRecord[]      = sitesResult.status       === "fulfilled" ? sitesResult.value       : [];
  const formRecords:    FormRecord[]      = formsResult.status        === "fulfilled" ? formsResult.value        : [];
  const inductions:     ApprovalRecord[]  = inductionsResult.status  === "fulfilled" ? inductionsResult.value  : [];
  const swmsApprovals:  ApprovalRecord[]  = swmsResult.status        === "fulfilled" ? swmsResult.value        : [];
  const supplierDocs:   SupplierDocRecord[] = supplierDocsResult.status === "fulfilled" ? supplierDocsResult.value : [];

  if (sitesResult.status       === "rejected") errors.push(`site/list: ${sitesResult.reason}`);
  if (formsResult.status       === "rejected") errors.push(`form-report: ${formsResult.reason}`);
  if (inductionsResult.status  === "rejected") errors.push(`approval-report (inductions): ${inductionsResult.reason}`);
  if (swmsResult.status        === "rejected") errors.push(`approval-report (SWMS): ${swmsResult.reason}`);
  if (supplierDocsResult.status === "rejected") errors.push(`supplier-document-report: ${supplierDocsResult.reason}`);

  // ── Build master site map ──────────────────────────────────────────────────

  // Collect all siteReferences seen across all data sources
  const siteMap = new Map<string, { siteName: string; procoreProjectId: string | null }>();

  for (const s of siteList) {
    const ref  = String(s.siteReference ?? s.SiteReference ?? "");
    const name = String(s.siteName ?? s.SiteName ?? "");
    if (!ref) continue;
    const pid = s.procoreProjectId ?? s.ProcoreProjectId;
    siteMap.set(ref, {
      siteName:         name,
      procoreProjectId: pid != null ? String(pid) : null,
    });
  }

  // Ensure sites from form/approval records are also in the map (in case site/list failed)
  for (const r of [...formRecords, ...inductions, ...swmsApprovals, ...supplierDocs]) {
    const ref  = r.siteReference ?? "";
    const name = r.siteName ?? "";
    if (ref && !siteMap.has(ref)) {
      siteMap.set(ref, { siteName: name, procoreProjectId: null });
    }
  }

  // ── Group form records by siteReference ───────────────────────────────────

  const formsBySite = new Map<string, FormRecord[]>();
  for (const r of formRecords) {
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

  // ── Combine SWMS approvals + supplier docs, dedup by title+supplier ─────

  const docsBySite = new Map<string, Array<{ documentTitle: string; supplier: string; submittedDate: string; dedupeKey: string }>>();

  for (const r of swmsApprovals) {
    const ref = r.siteReference ?? "";
    if (!ref) continue;
    if (!docsBySite.has(ref)) docsBySite.set(ref, []);
    const title    = r.title ?? "—";
    const supplier = r.supplierName ?? "—";
    const key      = `${title}|${supplier}`;
    const list     = docsBySite.get(ref)!;
    if (!list.some(d => d.dedupeKey === key)) {
      list.push({ documentTitle: title, supplier, submittedDate: r.submittedDate ?? "", dedupeKey: key });
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

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const sites = Array.from(siteMap.entries()).map(([siteReference, meta]) => {
    const forms = formsBySite.get(siteReference) ?? [];

    // Daily Prestarts: distinct Mon-Fri dates with at least one prestart form
    const prestartDays = new Set<string>();
    for (const r of forms) {
      if (!(r.formTitle ?? "").toLowerCase().includes("daily prestart")) continue;
      const d = new Date(r.submittedDate ?? "");
      if (isNaN(d.getTime())) continue;
      const ds = isoDate(d);
      if (weekdays.includes(ds)) prestartDays.add(ds);
    }

    // Toolbox Talk: any toolbox form in last 7 days
    let lastToolbox: string | null = null;
    let toolboxSubmitted = false;
    for (const r of forms) {
      if (!(r.formTitle ?? "").toLowerCase().includes("toolbox")) continue;
      const d = new Date(r.submittedDate ?? "");
      if (isNaN(d.getTime())) continue;
      if (d >= sevenDaysAgo) toolboxSubmitted = true;
      if (!lastToolbox || d > new Date(lastToolbox)) lastToolbox = r.submittedDate ?? null;
    }

    // Inductions
    const indItems = (inductionsBySite.get(siteReference) ?? []).map(r => ({
      name:          r.fullName ?? "—",
      supplier:      r.supplierName ?? "—",
      submittedDate: r.submittedDate ?? "",
      title:         r.title ?? r.fullName ?? "—",
    }));

    // Docs
    const rawDocs = docsBySite.get(siteReference) ?? [];
    const docItems = rawDocs.map(d => ({
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

  return NextResponse.json({
    weekStart:  isoDate(monday),
    weekEnd:    isoDate(weekEnd),
    fetchedAt:  new Date().toISOString(),
    source:     "breadcrumb_api",
    sites,
    errors:     errors.length > 0 ? errors : undefined,
  });
}
