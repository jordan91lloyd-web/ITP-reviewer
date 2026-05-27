// ─── GET /api/breadcrumb/compliance-pdf ───────────────────────────────────────
// Fetches live compliance data and streams a landscape A4 PDF.
// Data source: /api/breadcrumb/compliance-data (live Breadcrumb fetch).
//
// Query params:
//   company_id   (required)
//   week_start   YYYY-MM-DD Monday of selected week (required)
//
// Returns application/pdf with Content-Disposition: attachment

import { NextRequest, NextResponse } from "next/server";
import React from "react";
import {
  renderToBuffer,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

export const dynamic     = "force-dynamic";
export const maxDuration = 60;

// ── Colours ────────────────────────────────────────────────────────────────────
const C = {
  slate:  "#2E3A4E",
  gold:   "#C8972A",
  white:  "#FFFFFF",
  green:  "#16A34A",
  amber:  "#D97706",
  red:    "#DC2626",
  border: "#E0E0E0",
  rowDiv: "#EEEEEE",
  rowAlt: "#F9F9F9",
  text:   "#111111",
  label:  "#666666",
  footer: "#888888",
};

// ── StyleSheet ─────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  page: {
    backgroundColor: C.white,
    fontFamily:      "Helvetica",
    fontSize:        8,
    paddingBottom:   50,
  },

  // ── Header ──
  header: {
    backgroundColor:   C.slate,
    flexDirection:     "row",
    justifyContent:    "space-between",
    alignItems:        "center",
    paddingVertical:   30,
    paddingHorizontal: 40,
  },
  hLeft:  { flexDirection: "column" },
  hRight: { alignItems: "flex-end" },
  hBrand: {
    color:      C.gold,
    fontSize:   22,
    fontFamily: "Helvetica-Bold",
  },
  hTagline: {
    color:     C.white,
    fontSize:  9,
    marginTop: 3,
  },
  hTitle: {
    color:      C.white,
    fontSize:   13,
    fontFamily: "Helvetica-Bold",
  },
  hWeek: {
    color:     C.gold,
    fontSize:  10,
    marginTop: 3,
  },
  hGenerated: {
    color:     C.white,
    fontSize:  8,
    marginTop: 3,
    opacity:   0.65,
  },

  // ── Summary strip ──
  summaryBar: {
    flexDirection:     "row",
    paddingVertical:   16,
    paddingHorizontal: 40,
    borderBottom:      1,
    borderColor:       C.border,
    backgroundColor:   C.white,
  },
  statBox:      { flex: 1, alignItems: "center" },
  statDiv:      { width: 1, backgroundColor: C.border, marginVertical: 4 },
  statNum:      { fontSize: 22, fontFamily: "Helvetica-Bold", color: C.text  },
  statNumRed:   { fontSize: 22, fontFamily: "Helvetica-Bold", color: C.red   },
  statNumGreen: { fontSize: 22, fontFamily: "Helvetica-Bold", color: C.green },
  statLabel:    {
    fontSize:      8,
    color:         C.label,
    marginTop:     3,
    textAlign:     "center",
    textTransform: "uppercase",
  },

  // ── Table ──
  tableWrap: {
    marginHorizontal: 40,
    marginTop:        16,
    border:           1,
    borderColor:      C.border,
    borderRadius:     2,
    overflow:         "hidden",
  },
  thead: {
    flexDirection:     "row",
    backgroundColor:   C.slate,
    paddingVertical:   7,
    paddingHorizontal: 8,
    alignItems:        "center",
  },
  trow: {
    flexDirection:     "row",
    paddingVertical:   5,
    paddingHorizontal: 8,
    borderBottom:      1,
    borderColor:       C.rowDiv,
    alignItems:        "flex-start",
  },
  trowAlt: {
    backgroundColor: C.rowAlt,
  },

  // Column widths (total 100%; landscape A4 ~740pt usable)
  colSite: { width: "38%", paddingRight: 8 },
  colPre:  { width: "14%", alignItems: "center" },
  colTb:   { width: "13%", alignItems: "center" },
  colInd:  { width: "12%", alignItems: "center" },
  colDocs: { width: "11%", alignItems: "center" },
  colStat: { width: "12%", alignItems: "flex-end" },

  // Table header labels
  th: {
    color:         C.white,
    fontFamily:    "Helvetica-Bold",
    fontSize:      7,
    textTransform: "uppercase",
    textAlign:     "center",
  },
  thLeft: {
    color:         C.white,
    fontFamily:    "Helvetica-Bold",
    fontSize:      7,
    textTransform: "uppercase",
  },

  // Site column
  siteName: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.text },
  siteFlag: { fontSize: 7, color: C.amber, marginTop: 2, fontFamily: "Helvetica-Oblique" },

  // Prestart fraction (large)
  preGreen: { fontSize: 14, fontFamily: "Helvetica-Bold", color: C.green, textAlign: "center" },
  preAmber: { fontSize: 14, fontFamily: "Helvetica-Bold", color: C.amber, textAlign: "center" },
  preRed:   { fontSize: 14, fontFamily: "Helvetica-Bold", color: C.red,   textAlign: "center" },
  preDash:  { fontSize: 14, fontFamily: "Helvetica-Bold", color: C.label, textAlign: "center" },
  preDays:  { fontSize: 7, color: C.footer, textAlign: "center", marginTop: 2 },

  // Toolbox
  tbGreen: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.green, textAlign: "center" },
  tbAmber: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.amber, textAlign: "center" },
  tbRed:   { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.red,   textAlign: "center" },

  // Inductions / Docs
  cntGreen: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.green, textAlign: "center" },
  cntAmber: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.amber, textAlign: "center" },

  // Status
  statusGreen: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.green, textAlign: "right" },
  statusAmber: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.amber, textAlign: "right" },
  statusRed:   { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.red,   textAlign: "right" },

  // Footer
  footer: {
    position:       "absolute",
    bottom:         16,
    left:           40,
    right:          40,
    flexDirection:  "row",
    justifyContent: "space-between",
    alignItems:     "center",
    borderTop:      1,
    borderColor:    C.gold,
    paddingTop:     5,
  },
  footerText: { fontSize: 7, color: C.footer },
});

// ── Types ─────────────────────────────────────────────────────────────────────

type DayStatus = "green" | "amber" | "red" | "future";

interface SiteData {
  siteReference:     string;
  siteName:          string;
  dailyPrestarts:    { count: number; days: string[] };
  prestartDayStatus: Record<string, DayStatus> | null;
  gamingFlagged:     boolean;
  toolboxTalk:       { submitted: boolean };
  toolboxStatus:     "green" | "amber" | "red";
  pendingInductions: { count: number };
  pendingDocs:       { count: number };
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const DAY_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getSydneyDateString(iso: string): string {
  return new Date(iso).toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" });
}

function fmtDate(yyyymmdd: string): string {
  const d = new Date(yyyymmdd + "T00:00:00Z");
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}

// Snaps a UTC Date to Monday (guards against client sending Sunday due to timezone conversion)
function snapToMonday(d: Date): Date {
  const dow = d.getUTCDay(); // 0=Sun … 6=Sat
  if (dow === 1) return d;
  d.setUTCDate(d.getUTCDate() + (dow === 0 ? 1 : 1 - dow));
  return d;
}

// Returns Mon–Fri YYYY-MM-DD strings snapped from the given week start param.
function getWeekdays(mondayStr: string): string[] {
  const [y, m, d] = mondayStr.split("-").map(Number);
  const monday = snapToMonday(new Date(Date.UTC(y, m - 1, d)));
  const days: string[] = [];
  for (let i = 0; i < 5; i++) {
    const day = new Date(monday);
    day.setUTCDate(monday.getUTCDate() + i);
    days.push(day.toISOString().slice(0, 10));
  }
  return days;
}

function rowStatus(site: SiteData, checkableDays: number): "On Track" | "Attention" | "Action Req." {
  const prestartOk = checkableDays === 0 || site.dailyPrestarts.count >= checkableDays;
  const tbOk       = site.toolboxStatus !== "red";
  const pendingOk  = site.pendingInductions.count === 0 && site.pendingDocs.count === 0;
  if (prestartOk && tbOk && pendingOk) return "On Track";
  if (!prestartOk || site.toolboxStatus === "red") return "Action Req.";
  return "Attention";
}

// ── PDF document ───────────────────────────────────────────────────────────────

function CompliancePDF({
  sites,
  weekStart,
  todayStr,
}: {
  sites:     SiteData[];
  weekStart: string;
  todayStr:  string;
}) {
  const weekdays      = getWeekdays(weekStart);
  // weekdays[0] = Monday, weekdays[4] = Friday
  const checkableDays = weekdays.filter(wd => wd <= todayStr).length;

  const generatedAt = new Date().toLocaleString("en-AU", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "Australia/Sydney",
  });

  const actionCount  = sites.filter(s => rowStatus(s, checkableDays) === "Action Req.").length;
  const onTrackCount = sites.filter(s => rowStatus(s, checkableDays) === "On Track").length;
  const totalPending = sites.reduce((n, s) => n + s.pendingInductions.count + s.pendingDocs.count, 0);

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={S.page}>

        {/* ── Header ── */}
        <View style={S.header}>
          <View style={S.hLeft}>
            <Text style={S.hBrand}>HOLDPOINT</Text>
            <Text style={S.hTagline}>Construction QA Platform</Text>
          </View>
          <View style={S.hRight}>
            <Text style={S.hTitle}>Site Compliance Report</Text>
            <Text style={S.hWeek}>Week of {fmtDate(weekdays[0])} – {fmtDate(weekdays[4])}</Text>
            <Text style={S.hGenerated}>Generated {generatedAt} AEST</Text>
          </View>
        </View>

        {/* ── Summary strip ── */}
        <View style={S.summaryBar}>
          <View style={S.statBox}>
            <Text style={S.statNum}>{sites.length}</Text>
            <Text style={S.statLabel}>Sites Tracked</Text>
          </View>
          <View style={S.statDiv} />
          <View style={S.statBox}>
            <Text style={S.statNumRed}>{actionCount}</Text>
            <Text style={S.statLabel}>Action Required</Text>
          </View>
          <View style={S.statDiv} />
          <View style={S.statBox}>
            <Text style={S.statNum}>{totalPending}</Text>
            <Text style={S.statLabel}>Total Pending</Text>
          </View>
          <View style={S.statDiv} />
          <View style={S.statBox}>
            <Text style={S.statNumGreen}>{onTrackCount}</Text>
            <Text style={S.statLabel}>On Track</Text>
          </View>
        </View>

        {/* ── Table ── */}
        <View style={S.tableWrap}>

          {/* Header row */}
          <View style={S.thead}>
            <View style={S.colSite}><Text style={S.thLeft}>Site</Text></View>
            <View style={S.colPre}><Text style={S.th}>Prestart</Text></View>
            <View style={S.colTb}><Text style={S.th}>Toolbox</Text></View>
            <View style={S.colInd}><Text style={S.th}>Inductions</Text></View>
            <View style={S.colDocs}><Text style={S.th}>Docs</Text></View>
            <View style={S.colStat}><Text style={S.th}>Status</Text></View>
          </View>

          {/* Data rows */}
          {sites.map((site, idx) => {
            const isAlt     = idx % 2 === 1;
            const status    = rowStatus(site, checkableDays);
            const submitted = site.toolboxTalk?.submitted ?? (site.toolboxStatus !== "red");

            // Prestart fraction
            const preCount = site.dailyPrestarts.count;
            const preFrac  = checkableDays === 0 ? "—" : `${preCount}/${checkableDays}`;
            const preStyle =
              checkableDays === 0       ? S.preDash  :
              preCount >= checkableDays ? S.preGreen :
              preCount > 0              ? S.preAmber : S.preRed;

            // Covered day labels: "Mon Wed Thu"
            const coveredDayNames = site.dailyPrestarts.days
              .map(d => DAY_ABBR[new Date(d + "T00:00:00Z").getUTCDay()])
              .join(" ");

            return (
              <View
                key={site.siteReference}
                style={isAlt ? [S.trow, S.trowAlt] : S.trow}
                wrap={false}
              >
                {/* Site */}
                <View style={S.colSite}>
                  <Text style={S.siteName}>{site.siteName}</Text>
                  {site.gamingFlagged && (
                    <Text style={S.siteFlag}>! Long validity</Text>
                  )}
                </View>

                {/* Daily Prestart */}
                <View style={S.colPre}>
                  <Text style={preStyle}>{preFrac}</Text>
                  {coveredDayNames.length > 0 && (
                    <Text style={S.preDays}>{coveredDayNames}</Text>
                  )}
                </View>

                {/* Toolbox */}
                <View style={S.colTb}>
                  <Text style={
                    submitted && site.toolboxStatus === "green" ? S.tbGreen :
                    submitted && site.toolboxStatus === "amber" ? S.tbAmber : S.tbRed
                  }>
                    {submitted && site.toolboxStatus === "green" ? "Done"          :
                     submitted && site.toolboxStatus === "amber" ? "Long validity" : "Missing"}
                  </Text>
                </View>

                {/* Inductions */}
                <View style={S.colInd}>
                  <Text style={site.pendingInductions.count === 0 ? S.cntGreen : S.cntAmber}>
                    {site.pendingInductions.count === 0 ? "Clear" : String(site.pendingInductions.count)}
                  </Text>
                </View>

                {/* Docs */}
                <View style={S.colDocs}>
                  <Text style={site.pendingDocs.count === 0 ? S.cntGreen : S.cntAmber}>
                    {site.pendingDocs.count === 0 ? "Clear" : String(site.pendingDocs.count)}
                  </Text>
                </View>

                {/* Status */}
                <View style={S.colStat}>
                  <Text style={
                    status === "On Track"  ? S.statusGreen :
                    status === "Attention" ? S.statusAmber  : S.statusRed
                  }>
                    {status}
                  </Text>
                </View>

              </View>
            );
          })}
        </View>

        {/* ── Footer ── */}
        <View style={S.footer} fixed>
          <Text style={S.footerText}>Holdpoint · Confidential · Site Compliance</Text>
          <Text
            style={S.footerText}
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
            fixed
          />
        </View>

      </Page>
    </Document>
  );
}

// ── Handler ────────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const sp        = request.nextUrl.searchParams;
  const companyId = sp.get("company_id");
  const weekStart = sp.get("week_start");

  if (!companyId || !weekStart) {
    return NextResponse.json({ error: "company_id and week_start are required" }, { status: 400 });
  }

  const origin  = request.nextUrl.origin;
  const dataRes = await fetch(
    `${origin}/api/breadcrumb/compliance-data?company_id=${encodeURIComponent(companyId)}&week_start=${encodeURIComponent(weekStart)}`
  );

  if (!dataRes.ok) {
    return NextResponse.json({ error: "Failed to fetch compliance data" }, { status: 502 });
  }

  const data  = await dataRes.json();
  const sites = (data.sites ?? []) as SiteData[];

  if (sites.length === 0) {
    return NextResponse.json({ error: "No site data available for this week." }, { status: 404 });
  }

  const todayStr = getSydneyDateString(new Date().toISOString());

  let buffer: Buffer;
  try {
    buffer = await renderToBuffer(
      <CompliancePDF sites={sites} weekStart={weekStart} todayStr={todayStr} />
    );
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "PDF render failed" },
      { status: 500 },
    );
  }

  const uint8 = new Uint8Array(buffer);
  return new NextResponse(uint8, {
    headers: {
      "Content-Type":        "application/pdf",
      "Content-Disposition": `attachment; filename="site-compliance-${weekStart}.pdf"`,
      "Content-Length":      String(uint8.byteLength),
    },
  });
}
