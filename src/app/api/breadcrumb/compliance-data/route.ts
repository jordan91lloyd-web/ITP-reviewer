// ─── GET /api/breadcrumb/compliance-data ──────────────────────────────────────
// Fetches live from Breadcrumb API on every request. No snapshot.
//
// Query params:
//   company_id   (required)
//   week_start   YYYY-MM-DD Monday of the selected week (optional)
//
// Response shape:
//   { weekStart, weekEnd, fetchedAt, source, sites, errors? }
//
// Coverage rules:
//   Prestart: fillDay <= weekday <= endDay  (endDay = fillDay if no endDate found)
//   Toolbox:  fillDay <= friday AND endDay >= monday  (overlaps the week)
//   Lookback: only submissions where fillDay ∈ [monday − 30 days, friday]
//
// Gaming flag:
//   isLongValidity = (endDate − fillDate) > 7 days
//   prestartDayStatus per weekday: "green" (≤7d validity), "amber" (only >7d), "red", "future"
//   toolboxStatus: "green" (any normal submission), "amber" (only long-validity), "red" (none)
//   gamingFlagged = any prestart submission in lookback has validity > 7 days

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic     = "force-dynamic";
export const maxDuration = 60;   // Vercel Pro — endDate batch fetches can take 15-30s

const API_KEY        = process.env.BREADCRUMB_API_KEY;
const BASE_URL       = (process.env.BREADCRUMB_API_BASE_URL ?? "https://ext-au.1bc.app").replace(/\/$/, "");
const PAGE_SIZE      = 100;
const MAX_PAGES      = 20;
const LOOKBACK_DAYS  = 30;
const ENDBATCH_SIZE  = 5;
const ENDBATCH_DELAY = 300; // ms between batches

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
  return EXCLUDED_NAME_PREFIXES.some(p => lower.startsWith(p));
}

// ── Date helpers ───────────────────────────────────────────────────────────────

function getSydneyDateString(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-CA", {
    timeZone: "Australia/Sydney",
  });
}

function getWeekDays(monday: Date): string[] {
  const days: string[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + i);
    days.push(d.toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" }));
  }
  return days;
}

function getSydneyMonday(): Date {
  const now       = new Date();
  const sydStr    = now.toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" });
  const [y, m, d] = sydStr.split("-").map(Number);
  const syd       = new Date(Date.UTC(y, m - 1, d));
  const dow       = syd.getUTCDay();
  const daysToMon = dow === 0 ? 6 : dow - 1;
  syd.setUTCDate(syd.getUTCDate() - daysToMon);
  return syd;
}

function snapToMonday(d: Date): Date {
  const dow = d.getUTCDay(); // 0=Sun … 6=Sat
  if (dow === 1) return d;
  // Sun (+1), Mon (0), Tue (-1), Wed (-2), Thu (-3), Fri (-4), Sat (-5)
  d.setUTCDate(d.getUTCDate() + (dow === 0 ? 1 : 1 - dow));
  return d;
}

function getWeekBounds(param: string | null): { monday: Date; weekdays: string[] } {
  let monday: Date;
  if (param && /^\d{4}-\d{2}-\d{2}$/.test(param)) {
    const [y, m, d] = param.split("-").map(Number);
    const c = new Date(Date.UTC(y, m - 1, d));
    // Snap to Monday — guards against timezone edge cases where the browser
    // sends the UTC equivalent of Sydney midnight (which lands on Sunday)
    monday = isNaN(c.getTime()) ? getSydneyMonday() : snapToMonday(c);
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
    n.includes("prestart")        ||
    n.includes("pre start")       ||
    n.includes("daily brief")     ||
    n.includes("daily briefing")  ||
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

// ── Types ─────────────────────────────────────────────────────────────────────

type DayStatus = "green" | "amber" | "red" | "future";

interface FormRecord {
  siteReference?:    string;
  siteName?:         string;
  formName?:         string;
  formType?:         number | string;
  fillDate?:         string;
  status?:           string;
  procoreProjectId?: string | number | null;
  formDataId?:       number | string | null;
}

interface ApprovalRecord {
  siteReference?:     string;
  siteName?:          string;
  userFullName?:      string;
  supplierName?:      string;
  title?:             string;
  submittedDateTime?: string;
  id?:                string | number;
}

interface SupplierDocRecord {
  siteReference?: string;
  siteName?:      string;
  supplierName?:  string;
  documentTitle?: string;
  title?:         string;
  status?:        number;
  id?:            string | number;
}

interface SiteRecord {
  siteReference?: string;
  name?:          string;
}

// ── FormData fetcher (endDate only) ───────────────────────────────────────────

async function fetchFormData(formDataId: string): Promise<{ endDate: string | null }> {
  try {
    const res = await fetch(`${BASE_URL}/integration/v2/report/form-data`, {
      method:  "POST",
      headers: { "X-Api-Key": API_KEY!, "Content-Type": "application/json" },
      body:    JSON.stringify({ formDataId: Number(formDataId) }),
      signal:  AbortSignal.timeout(10_000),
    });
    if (!res.ok) return { endDate: null };
    const data = await res.json();

    const rawEnd: string | undefined =
      data?.result?.filledFormInfo?.endDate ??
      data?.filledFormInfo?.endDate          ??
      data?.result?.endDate                  ??
      data?.endDate;
    const endDate = rawEnd ? getSydneyDateString(rawEnd) : null;

    return { endDate };
  } catch {
    return { endDate: null };
  }
}

// ── Batch endDate resolver: Supabase cache-first, Breadcrumb fallback ─────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function resolveEndDates(
  supabase: any,
  companyId: string,
  formDataIds: string[],
): Promise<Map<string, string>> {
  const endDateMap = new Map<string, string>();
  if (formDataIds.length === 0) return endDateMap;

  // Step 1 — read endDates from Supabase cache
  const { data: cached } = await supabase
    .from("breadcrumb_form_endates")
    .select("form_data_id, end_date")
    .eq("company_id", companyId)
    .in("form_data_id", formDataIds) as { data: Array<{ form_data_id: string; end_date: string }> | null };

  for (const row of cached ?? []) {
    endDateMap.set(row.form_data_id, row.end_date);
  }

  // Step 2 — fetch uncached IDs from Breadcrumb
  const uncached = formDataIds.filter(id => !endDateMap.has(id));
  const toInsert: { form_data_id: string; company_id: string; end_date: string }[] = [];

  for (let i = 0; i < uncached.length; i += ENDBATCH_SIZE) {
    const batch = uncached.slice(i, i + ENDBATCH_SIZE);
    const results = await Promise.all(
      batch.map(async id => ({ id, result: await fetchFormData(id) }))
    );
    for (const { id, result } of results) {
      if (result.endDate) {
        endDateMap.set(id, result.endDate);
        toInsert.push({ form_data_id: id, company_id: companyId, end_date: result.endDate });
      }
    }
    if (i + ENDBATCH_SIZE < uncached.length) {
      await new Promise(resolve => setTimeout(resolve, ENDBATCH_DELAY));
    }
  }

  // Step 3 — upsert newly-fetched endDates into cache
  if (toInsert.length > 0) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from("breadcrumb_form_endates")
        .upsert(toInsert, { onConflict: "form_data_id", ignoreDuplicates: true });
      if (error) console.error("[endDate cache] upsert failed:", error);
    } catch (e) {
      console.error("[endDate cache] upsert threw:", e);
    }
  }

  return endDateMap;
}

// ── Paginated Breadcrumb fetch ─────────────────────────────────────────────────

async function fetchAllPages<T>(
  endpoint: string,
  body: Record<string, unknown>,
): Promise<T[]> {
  let pageNumber = 0;
  const all: T[] = [];
  while (pageNumber <= MAX_PAGES) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method:  "POST",
      headers: { "X-Api-Key": API_KEY!, "Content-Type": "application/json" },
      body:    JSON.stringify({ ...body, pagingInfo: { pageSize: PAGE_SIZE, pageNumber, SortOrder: "DESC" } }),
      signal:  AbortSignal.timeout(20_000),
    });
    if (!res.ok) throw new Error(`Breadcrumb ${endpoint} returned ${res.status}`);
    const data = await res.json();
    const results: T[] = Array.isArray(data?.result) ? data.result : Array.isArray(data) ? data : [];
    all.push(...results);
    if (results.length < PAGE_SIZE) break;
    pageNumber++;
  }
  return all;
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
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  const weekEndDate = getSydneyDateString(sunday.toISOString());

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  // Lookback window: monday − 30 days through friday (Sydney)
  const fetchFrom       = new Date(monday.getTime() - LOOKBACK_DAYS * 86_400_000);
  const fetchFromSydney = getSydneyDateString(fetchFrom.toISOString());
  const fetchToSydney   = weekdays[4]; // Friday

  // Today in Sydney — used to classify future days
  const todaySydney = getSydneyDateString(new Date().toISOString());

  const mondaySydney = weekdays[0];
  const fridaySydney = weekdays[4];

  const errors: string[] = [];

  // Fetch all Breadcrumb data sources in parallel
  const [
    sitesResult,
    allFormsResult,
    inductionsResult,
    swmsResult,
    supplierDocsResult,
  ] = await Promise.allSettled([
    fetchAllPages<SiteRecord>("/integration/site/list", {}),
    fetchAllPages<FormRecord>("/integration/v2/report/form-report", {
      formTypeList: [7], // Site Briefing (Daily Prestart + Toolbox)
    }),
    fetchAllPages<ApprovalRecord>("/integration/v2/report/approval-report", {
      approveStatusList: [0], approveEntityTypeList: [1],
    }),
    fetchAllPages<ApprovalRecord>("/integration/v2/report/approval-report", {
      approveStatusList: [0], approveEntityTypeList: [2],
    }),
    fetchAllPages<SupplierDocRecord>("/integration/v2/report/supplier-document-report", {
      statusList: [1], convertDateTimeToLocalTimezone: true,
    }),
  ]);

  const siteList:      SiteRecord[]        = sitesResult.status       === "fulfilled" ? sitesResult.value       : [];
  const allForms:      FormRecord[]        = allFormsResult.status     === "fulfilled" ? allFormsResult.value     : [];
  const inductions:    ApprovalRecord[]    = inductionsResult.status   === "fulfilled" ? inductionsResult.value   : [];
  const swmsApprovals: ApprovalRecord[]    = swmsResult.status         === "fulfilled" ? swmsResult.value         : [];
  const supplierDocs:  SupplierDocRecord[] = supplierDocsResult.status === "fulfilled" ? supplierDocsResult.value : [];

  if (sitesResult.status        === "rejected") errors.push(`site/list: ${sitesResult.reason}`);
  if (allFormsResult.status     === "rejected") errors.push(`form-report: ${allFormsResult.reason}`);
  if (inductionsResult.status   === "rejected") errors.push(`approval-report (inductions): ${inductionsResult.reason}`);
  if (swmsResult.status         === "rejected") errors.push(`approval-report (SWMS): ${swmsResult.reason}`);
  if (supplierDocsResult.status === "rejected") errors.push(`supplier-document-report: ${supplierDocsResult.reason}`);

  // ── Filter forms to lookback window and collect formDataIds ───────────────

  const filteredForms: FormRecord[] = [];
  const formDataIdSet = new Set<string>();

  for (const r of allForms) {
    if (!r.fillDate) continue;
    if (!isPrestartForm(r.formName ?? "") && !isToolboxForm(r.formName ?? "")) continue;
    const fillDay = getSydneyDateString(r.fillDate);
    if (fillDay < fetchFromSydney || fillDay > fetchToSydney) continue;
    filteredForms.push(r);
    if (r.formDataId != null && r.formDataId !== "") {
      formDataIdSet.add(String(r.formDataId));
    }
  }

  // ── Resolve endDates (Supabase cache-first, Breadcrumb fallback) ─────────────

  const endDateMap = await resolveEndDates(supabase, companyId, Array.from(formDataIdSet));

  // ── Build procoreProjectId map from form records ───────────────────────────

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
    const name = String(s.name ?? "");
    if (!ref || isExcluded(ref, name)) continue;
    siteMap.set(ref, { siteName: name, procoreProjectId: procoreIdFromForms.get(ref) ?? null });
  }

  // Sites that appear in form/approval records but not site/list (resilience)
  const allRecords = [
    ...allForms,
    ...inductions, ...swmsApprovals,
    ...(supplierDocs as Array<{ siteReference?: string; siteName?: string }>),
  ];
  for (const r of allRecords) {
    const ref  = r.siteReference ?? "";
    const name = r.siteName ?? "";
    if (!ref || siteMap.has(ref) || isExcluded(ref, name)) continue;
    siteMap.set(ref, { siteName: name, procoreProjectId: procoreIdFromForms.get(ref) ?? null });
  }

  // ── Group filtered forms by site ───────────────────────────────────────────

  const formsBySite = new Map<string, FormRecord[]>();
  for (const r of filteredForms) {
    const ref = r.siteReference ?? "";
    if (!ref) continue;
    if (!formsBySite.has(ref)) formsBySite.set(ref, []);
    formsBySite.get(ref)!.push(r);
  }

  // ── Group inductions by site ───────────────────────────────────────────────

  const inductionsBySite = new Map<string, ApprovalRecord[]>();
  for (const r of inductions) {
    const ref = r.siteReference ?? "";
    if (!ref) continue;
    if (!inductionsBySite.has(ref)) inductionsBySite.set(ref, []);
    inductionsBySite.get(ref)!.push(r);
  }

  // ── Combine SWMS approvals + supplier docs, dedup by title+supplier ─────────

  const docsBySite = new Map<string, Array<{
    documentTitle: string; supplier: string; submittedDate: string; dedupeKey: string;
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
      list.push({ documentTitle: title, supplier, submittedDate: r.submittedDateTime ?? "", dedupeKey: key });
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

  // ── Compute per-site coverage with gaming flag ─────────────────────────────

  const sites = Array.from(siteMap.entries()).map(([siteReference, meta]) => {
    const siteForms = formsBySite.get(siteReference) ?? [];

    // ── Prestart coverage + gaming flag ──────────────────────────────────────
    // Track normal (≤7d validity) and long (>7d validity) coverage sets separately.
    const normalCoverSet = new Set<string>(); // days covered by normal submissions
    const longCoverSet   = new Set<string>(); // days covered only by long-validity submissions
    let longestValidityDays = 0;
    let gamingFlagged = false;

    for (const r of siteForms) {
      if (!isPrestartForm(r.formName ?? "")) continue;
      if (!r.fillDate) continue;
      const fillDay = getSydneyDateString(r.fillDate);
      const idStr   = r.formDataId != null ? String(r.formDataId) : null;
      const endDay  = (idStr && endDateMap.has(idStr)) ? endDateMap.get(idStr)! : fillDay;

      // Validity = number of days from fillDate to endDate (inclusive span)
      const validityDays = Math.round(
        (new Date(endDay + "T00:00:00Z").getTime() - new Date(fillDay + "T00:00:00Z").getTime())
        / (1000 * 60 * 60 * 24)
      );
      if (validityDays > longestValidityDays) longestValidityDays = validityDays;

      const isLong = validityDays > 7;
      if (isLong) gamingFlagged = true;

      for (const wd of weekdays) {
        if (fillDay <= wd && wd <= endDay) {
          if (isLong) {
            longCoverSet.add(wd);
          } else {
            normalCoverSet.add(wd);
          }
        }
      }
    }

    // Build per-day status
    const prestartDayStatus: Record<string, DayStatus> = {};
    for (const wd of weekdays) {
      if (wd > todaySydney) {
        prestartDayStatus[wd] = "future";
      } else if (normalCoverSet.has(wd)) {
        prestartDayStatus[wd] = "green";
      } else if (longCoverSet.has(wd)) {
        prestartDayStatus[wd] = "amber";
      } else {
        prestartDayStatus[wd] = "red";
      }
    }

    // For backwards-compat fields: a day is "covered" if green or amber
    const prestartDays = weekdays.filter(wd => normalCoverSet.has(wd) || longCoverSet.has(wd));

    // ── Toolbox coverage + gaming flag ────────────────────────────────────────
    let toolboxActive    = false;
    let hasNormalToolbox = false;
    const toolboxDates: string[] = [];

    for (const r of siteForms) {
      if (!isToolboxForm(r.formName ?? "")) continue;
      if (!r.fillDate) continue;
      const fillDay = getSydneyDateString(r.fillDate);
      const idStr   = r.formDataId != null ? String(r.formDataId) : null;
      const endDay  = (idStr && endDateMap.has(idStr)) ? endDateMap.get(idStr)! : fillDay;

      if (fillDay <= fridaySydney && endDay >= mondaySydney) {
        toolboxActive = true;
        toolboxDates.push(fillDay);

        const validityDays = Math.round(
          (new Date(endDay + "T00:00:00Z").getTime() - new Date(fillDay + "T00:00:00Z").getTime())
          / (1000 * 60 * 60 * 24)
        );
        if (validityDays <= 7) hasNormalToolbox = true;
      }
    }

    const toolboxStatus: "green" | "amber" | "red" =
      !toolboxActive   ? "red"   :
      hasNormalToolbox ? "green" : "amber";

    // ── Pending inductions ────────────────────────────────────────────────────

    const indItems = (inductionsBySite.get(siteReference) ?? []).map(r => ({
      name:          r.userFullName ?? "—",
      supplier:      r.supplierName ?? "—",
      submittedDate: r.submittedDateTime ?? "",
      title:         r.title ?? r.userFullName ?? "—",
    }));

    // ── Pending docs ──────────────────────────────────────────────────────────

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
        count: prestartDays.length,
        total: 5,
        days:  prestartDays,
      },
      prestartDayStatus,
      gamingFlagged,
      longestValidityDays,
      toolboxTalk: {
        submitted:     toolboxActive,
        lastSubmitted: toolboxDates.length > 0 ? toolboxDates.sort().at(-1)! : null,
      },
      toolboxStatus,
      pendingInductions: { count: indItems.length, items: indItems },
      pendingDocs:       { count: docItems.length, items: docItems },
      _toolboxDates: toolboxDates,
    };
  });

  // Strip internal _toolboxDates field from response
  const responseSites = sites.map(({ _toolboxDates: _, ...rest }) => rest);

  return NextResponse.json({
    weekStart: weekStartP ?? weekdays[0],
    weekEnd:   weekEndDate,
    fetchedAt: new Date().toISOString(),
    source:    "breadcrumb_api",
    sites:     responseSites,
    errors:    errors.length > 0 ? errors : undefined,
  });
}
