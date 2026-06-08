// GET /api/breadcrumb/compliance-data?company_id=X
// Returns weekly prestart, toolbox, induction, and doc compliance per site.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const BREADCRUMB_BASE = "https://ext-au.1bc.app";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

async function requireAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return !!cookieStore.get("procore_access_token")?.value;
}

function sydneyTodayStr(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" });
}

// All date helpers parse YYYY-MM-DD strings as UTC midnight (Z suffix) and use
// UTC accessors so arithmetic is timezone-neutral. The YYYY-MM-DD string from
// sydneyTodayStr() is the Sydney calendar date; treating it as UTC midnight for
// arithmetic is safe because we only compare and display calendar dates, not
// absolute timestamps.

function getWeekStart(todayStr: string): string {
  // Return the Monday of the week containing todayStr (Mon = start of week).
  const d   = new Date(todayStr + "T00:00:00Z");
  const day = d.getUTCDay(); // 0=Sun … 6=Sat
  const diff = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + diff);
  return toYMD(d);
}

function toYMD(d: Date): string {
  return d.toISOString().substring(0, 10);
}

function addDays(dateStr: string, n: number): string {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return toYMD(d);
}

function fmtLabel(dateStr: string): string {
  const d     = new Date(dateStr + "T00:00:00Z");
  const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${names[d.getUTCDay()]} ${String(d.getUTCDate()).padStart(2, "0")}`;
}

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

async function bcPost(path: string, body: object, tries = 2): Promise<unknown> {
  for (let i = 0; i <= tries; i++) {
    const res = await fetch(`${BREADCRUMB_BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.BREADCRUMB_API_KEY ?? "",
      },
      body: JSON.stringify(body),
    });
    if (res.ok) return res.json();
    if (i < tries) await sleep(500);
  }
  throw new Error(`Breadcrumb API error on ${path}`);
}

async function fetchAll(path: string, bodyBase: object): Promise<unknown[]> {
  const all: unknown[] = [];
  let page = 0;
  while (true) {
    const data = (await bcPost(path, {
      ...bodyBase,
      pagingInfo: { pageSize: 500, pageNumber: page },
    })) as { result?: unknown[] };
    const items = data?.result ?? [];
    all.push(...items);
    if (items.length < 500) break;
    page++;
  }
  return all;
}

function groupBySiteRef<T extends { siteReference?: string }>(items: T[]): Map<string, T[]> {
  const m = new Map<string, T[]>();
  for (const it of items) {
    const r = it.siteReference;
    if (!r) continue;
    if (!m.has(r)) m.set(r, []);
    m.get(r)!.push(it);
  }
  return m;
}

export async function GET(request: NextRequest) {
  if (!await requireAuth()) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const companyId = request.nextUrl.searchParams.get("company_id");
  if (!companyId) {
    return NextResponse.json({ error: "company_id required" }, { status: 400 });
  }

  const today          = sydneyTodayStr();
  const currentWeekMon = getWeekStart(today);

  // Accept an explicit week_start param; fall back to the current week.
  // Validated as YYYY-MM-DD to reject garbage values.
  const requestedWS   = request.nextUrl.searchParams.get("week_start");
  const weekStart     = (requestedWS && /^\d{4}-\d{2}-\d{2}$/.test(requestedWS))
    ? requestedWS
    : currentWeekMon;
  const isCurrentWeek = weekStart === currentWeekMon;

  const weekEnd   = addDays(weekStart, 4);          // Friday of the requested week
  const weekDates = [0, 1, 2, 3, 4].map(i => addDays(weekStart, i));
  const weekDays  = weekDates.map(fmtLabel);
  const dayKeys   = ["mon", "tue", "wed", "thu", "fri"] as const;

  // ── 1. Site list ──────────────────────────────────────────────────────────────
  type SiteRecord = { siteReference?: string; name?: string };
  const sitesRes = (await bcPost("/integration/site/list", { includeInactiveSites: false })) as { sites?: SiteRecord[] };
  const siteMap = new Map<string, string>(); // ref → name
  for (const s of sitesRes?.sites ?? []) {
    if (s.siteReference) siteMap.set(s.siteReference, s.name ?? s.siteReference);
  }
  const nameToRef = new Map<string, string>();
  for (const [ref, name] of siteMap) nameToRef.set(name, ref);

  // ── 2. All Site Briefing forms (formType 7) ───────────────────────────────────
  type FormRecord = { formDataId: number; siteReference?: string; formName?: string; fillDate?: string };
  const allForms = (await fetchAll("/integration/v2/report/form-report", {
    formTypeList: [7],
    convertDateTimeToLocalTimezone: true,
  })) as FormRecord[];

  const prestarts: FormRecord[] = [];
  const toolboxes: FormRecord[] = [];
  for (const f of allForms) {
    const n = (f.formName ?? "").toLowerCase();
    if (n.includes("prestart") || n.includes("daily brief")) prestarts.push(f);
    else if (n.includes("toolbox")) toolboxes.push(f);
  }

  // ── 3. Fetch endDates for this-week prestarts ─────────────────────────────────
  const thisWeekPrestarts = prestarts.filter(f => {
    const d = f.fillDate?.substring(0, 10) ?? "";
    return d >= weekStart && d <= weekEnd;
  });

  const endDateMap = new Map<number, string>(); // formDataId → endDate YYYY-MM-DD
  for (let i = 0; i < thisWeekPrestarts.length; i += 5) {
    const batch = thisWeekPrestarts.slice(i, i + 5);
    await Promise.all(batch.map(async f => {
      try {
        type FDRes = { result?: { filledFormInfo?: { endDate?: string } } };
        const d = (await bcPost("/integration/v2/report/form-data", { formDataId: f.formDataId })) as FDRes;
        const ed = d?.result?.filledFormInfo?.endDate;
        if (ed) endDateMap.set(f.formDataId, ed.substring(0, 10));
      } catch { /* skip */ }
    }));
    if (i + 5 < thisWeekPrestarts.length) await sleep(200);
  }

  const prestartsBySite = groupBySiteRef(prestarts);
  const toolboxBySite   = groupBySiteRef(toolboxes);

  // ── 4. Pending inductions (Submitted = 1) ────────────────────────────────────
  type InductionRecord = { siteReference?: string };
  const allInductions = (await fetchAll("/integration/v2/report/site-induction-report", {
    currentStatusList: [1],
    convertDateTimeToLocalTimezone: true,
  })) as InductionRecord[];
  const inductionsBySite = new Map<string, number>();
  for (const ind of allInductions) {
    const r = ind.siteReference;
    if (!r) continue;
    inductionsBySite.set(r, (inductionsBySite.get(r) ?? 0) + 1);
  }

  // ── 5. Pending supplier docs (Submitted = 1) ─────────────────────────────────
  type DocRecord = { siteName?: string };
  const allDocs = (await fetchAll("/integration/v2/report/supplier-document-report", {
    statusList: [1],
    convertDateTimeToLocalTimezone: true,
  })) as DocRecord[];
  const docsBySite = new Map<string, number>();
  for (const doc of allDocs) {
    const ref = doc.siteName ? nameToRef.get(doc.siteName) : undefined;
    if (!ref) continue;
    docsBySite.set(ref, (docsBySite.get(ref) ?? 0) + 1);
  }

  // ── 6. Notes from Supabase ────────────────────────────────────────────────────
  const supabase = getSupabase();
  const { data: notesRows } = await supabase
    .from("site_compliance_notes")
    .select("site_reference, notes")
    .eq("company_id", companyId)
    .eq("week_start", weekStart);
  const notesMap = new Map<string, string>();
  for (const n of notesRows ?? []) notesMap.set(n.site_reference, n.notes ?? "");

  // ── 7. Build per-site rows ───────────────────────────────────────────────────
  const isMonday = new Date(today + "T00:00:00").getDay() === 1;
  const allRefs  = new Set([...siteMap.keys(), ...prestartsBySite.keys(), ...toolboxBySite.keys()]);

  const sites = Array.from(allRefs).map(siteRef => {
    const siteName       = siteMap.get(siteRef) ?? siteRef;
    const sitePrestarts  = prestartsBySite.get(siteRef) ?? [];

    const prestart: Record<string, boolean | null> = {};
    for (let d = 0; d < 5; d++) {
      const dayStr = weekDates[d];
      const key    = dayKeys[d];
      if (dayStr > today) { prestart[key] = null; continue; }
      prestart[key] = sitePrestarts.some(p => {
        const start = p.fillDate?.substring(0, 10);
        if (!start) return false;
        const end = endDateMap.get(p.formDataId) ?? start;
        return start <= dayStr && end >= dayStr;
      });
    }

    // Toolbox: must fall within the requested week (Mon–Fri).
    // Using weekEnd (not today) fixes an off-by-one bug when viewing past weeks:
    // fd <= today would include toolboxes from subsequent weeks.
    const toolbox = (toolboxBySite.get(siteRef) ?? []).some(f => {
      const fd = f.fillDate?.substring(0, 10) ?? "";
      return fd >= weekStart && fd <= weekEnd;
    });

    const pendingInductions = inductionsBySite.get(siteRef) ?? 0;
    const pendingDocs       = docsBySite.get(siteRef) ?? 0;
    const notes             = notesMap.get(siteRef) ?? "";

    const pastKeys   = dayKeys.filter((_, i) => weekDates[i] <= today);
    const allCovered = pastKeys.every(k => prestart[k] === true);
    // Monday exemption only applies to the current week (toolbox may not be done yet on Mon morning).
    const status: "On Track" | "Action Req." =
      allCovered && (toolbox || (isCurrentWeek && isMonday)) ? "On Track" : "Action Req.";

    return { siteReference: siteRef, siteName, prestart, toolbox, pendingInductions, pendingDocs, notes, status };
  }).sort((a, b) => a.siteName.localeCompare(b.siteName));

  return NextResponse.json({ weekStart, weekDates, weekDays, today, sites });
}
