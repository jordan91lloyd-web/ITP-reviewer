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
  slate:   "#2E3A4E",
  gold:    "#C8972A",
  white:   "#FFFFFF",
  green:   "#16A34A",
  amber:   "#D97706",
  red:     "#DC2626",
  border:  "#E0E0E0",
  altRow:  "#F8F8F8",
  text:    "#111111",
  label:   "#666666",
  footer:  "#888888",
  daygrey: "#CCCCCC",
};

// ── Styles ─────────────────────────────────────────────────────────────────────
const S = StyleSheet.create({

  // Page
  page: {
    backgroundColor: C.white,
    fontFamily:      "Helvetica",
    fontSize:        8,
    paddingBottom:   44,
  },

  // ── Header ─────────────────────────────────────────────────────────────────
  header: {
    backgroundColor:   C.slate,
    flexDirection:     "row",
    justifyContent:    "space-between",
    alignItems:        "center",
    paddingVertical:   24,
    paddingHorizontal: 32,
    marginBottom:      0,
  },
  hLeft:    { flexDirection: "column" },
  hRight:   { alignItems: "flex-end" },
  hBrand: {
    fontSize:      22,
    fontFamily:    "Helvetica-Bold",
    color:         C.gold,
    letterSpacing: 1.5,
  },
  hTagline: {
    fontSize:  9,
    color:     C.white,
    marginTop: 4,
    opacity:   0.85,
  },
  hTitle: {
    fontSize:   13,
    fontFamily: "Helvetica-Bold",
    color:      C.white,
  },
  hWeek: {
    fontSize:  10,
    color:     C.gold,
    marginTop: 3,
  },
  hGenerated: {
    fontSize:  8,
    color:     C.white,
    marginTop: 3,
    opacity:   0.65,
  },

  // ── Summary bar ────────────────────────────────────────────────────────────
  summaryBar: {
    flexDirection:     "row",
    backgroundColor:   C.white,
    borderBottom:      1,
    borderColor:       C.border,
    paddingVertical:   16,
    paddingHorizontal: 32,
    marginBottom:      0,
  },
  statBox:   { flex: 1, alignItems: "center" },
  statDivider: {
    width:           1,
    backgroundColor: C.border,
    marginVertical:  4,
  },
  statNum: {
    fontSize:   26,
    fontFamily: "Helvetica-Bold",
    color:      C.text,
  },
  statNumRed:   { fontSize: 26, fontFamily: "Helvetica-Bold", color: C.red   },
  statNumGreen: { fontSize: 26, fontFamily: "Helvetica-Bold", color: C.green },
  statLabel: {
    fontSize:      8,
    color:         C.label,
    marginTop:     3,
    textAlign:     "center",
    textTransform: "uppercase",
  },

  // ── Table ──────────────────────────────────────────────────────────────────
  tableWrap: {
    marginHorizontal: 20,
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
    paddingHorizontal: 10,
    alignItems:        "center",
  },
  trow: {
    flexDirection:     "row",
    paddingVertical:   7,
    paddingHorizontal: 10,
    borderBottom:      1,
    borderColor:       C.border,
    alignItems:        "center",
  },
  trowAlt: { backgroundColor: C.altRow },

  // Columns — SITE(24%) M T W T F(4%×5=20%) TOOLBOX(10%) IND(12%) DOCS(12%) STATUS(14%)
  // Total: 24+20+10+12+12+14 = 92% — remaining flex fills gaps
  colSite:  { width: "24%", paddingRight: 6 },
  colDay:   { width: "4%",  alignItems: "center", justifyContent: "center" },
  colTb:    { width: "10%", alignItems: "center" },
  colInd:   { width: "12%", alignItems: "center" },
  colDocs:  { width: "12%", alignItems: "center" },
  colStat:  { width: "14%", alignItems: "flex-end" },

  // Header cells
  th: {
    color:         C.white,
    fontFamily:    "Helvetica-Bold",
    fontSize:      7.5,
    textTransform: "uppercase",
    textAlign:     "center",
  },
  thLeft: {
    color:         C.white,
    fontFamily:    "Helvetica-Bold",
    fontSize:      7.5,
    textTransform: "uppercase",
  },

  // Site cell
  siteName: {
    fontSize:   9,
    fontFamily: "Helvetica-Bold",
    color:      C.text,
  },
  siteFlag: {
    fontSize:   7,
    color:      C.amber,
    fontFamily: "Helvetica-Oblique",
    marginTop:  2,
  },

  // Day cell — 16×16 View box (background on View, reliable in react-pdf)
  dayBox: {
    width:          16,
    height:         16,
    borderRadius:   2,
    justifyContent: "center",
    alignItems:     "center",
  },
  dayBoxGreen: { backgroundColor: C.green   },
  dayBoxAmber: { backgroundColor: C.amber   },
  dayBoxRed:   { backgroundColor: C.red     },
  dayBoxGrey:  { backgroundColor: C.daygrey },
  dayLabel: {
    fontSize:   7.5,
    fontFamily: "Helvetica-Bold",
    color:      C.white,
    textAlign:  "center",
  },
  dayLabelDark: {
    fontSize:   7.5,
    fontFamily: "Helvetica-Bold",
    color:      "#555555",
    textAlign:  "center",
  },

  // Toolbox / status text cells
  tbGreen:  { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.green, textAlign: "center" },
  tbAmber:  { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.amber, textAlign: "center" },
  tbRed:    { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.red,   textAlign: "center" },

  countAmber: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.amber, textAlign: "center" },
  countGreen: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.green, textAlign: "center" },

  statGreen: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.green, textAlign: "right" },
  statAmber: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.amber, textAlign: "right" },
  statRed:   { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.red,   textAlign: "right" },

  // ── Footer ─────────────────────────────────────────────────────────────────
  footer: {
    position:       "absolute",
    bottom:         14,
    left:           20,
    right:          20,
    flexDirection:  "row",
    justifyContent: "space-between",
    alignItems:     "center",
    borderTop:      1,
    borderColor:    C.gold,
    paddingTop:     5,
  },
  footerLeft:  { fontSize: 7, color: C.footer },
  footerRight: { fontSize: 7, color: C.footer },
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

function getSydneyDateString(iso: string): string {
  return new Date(iso).toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" });
}

function fmtDate(yyyymmdd: string): string {
  const d = new Date(yyyymmdd + "T00:00:00Z");
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}

function getWeekdays(mondayStr: string): string[] {
  const [y, m, d] = mondayStr.split("-").map(Number);
  const monday = new Date(Date.UTC(y, m - 1, d));
  const days: string[] = [];
  for (let i = 0; i < 5; i++) {
    const day = new Date(monday);
    day.setUTCDate(monday.getUTCDate() + i);
    days.push(day.toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" }));
  }
  return days;
}

function rowStatus(site: SiteData, checkableDays: number): "On Track" | "Attention" | "Action Needed" {
  const prestartOk = checkableDays === 0 || site.dailyPrestarts.count >= checkableDays;
  const tbOk       = site.toolboxStatus !== "red";
  const pendingOk  = site.pendingInductions.count === 0 && site.pendingDocs.count === 0;
  if (prestartOk && tbOk && pendingOk) return "On Track";
  if (!prestartOk || site.toolboxStatus === "red") return "Action Needed";
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
  const [y, m, d]     = weekStart.split("-").map(Number);
  const fridayDate    = new Date(Date.UTC(y, m - 1, d + 4));
  const fridayStr     = fridayDate.toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" });
  const checkableDays = weekdays.filter(wd => wd <= todayStr).length;

  const generatedAt = new Date().toLocaleString("en-AU", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "Australia/Sydney",
  });

  const actionCount  = sites.filter(s => rowStatus(s, checkableDays) === "Action Needed").length;
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
            <Text style={S.hWeek}>Week of {fmtDate(weekStart)} – {fmtDate(fridayStr)}</Text>
            <Text style={S.hGenerated}>Generated {generatedAt} AEST</Text>
          </View>
        </View>

        {/* ── Summary bar ── */}
        <View style={S.summaryBar}>
          <View style={S.statBox}>
            <Text style={S.statNum}>{sites.length}</Text>
            <Text style={S.statLabel}>Sites Tracked</Text>
          </View>
          <View style={S.statDivider} />
          <View style={S.statBox}>
            <Text style={S.statNumRed}>{actionCount}</Text>
            <Text style={S.statLabel}>Action Required</Text>
          </View>
          <View style={S.statDivider} />
          <View style={S.statBox}>
            <Text style={S.statNum}>{totalPending}</Text>
            <Text style={S.statLabel}>Total Pending</Text>
          </View>
          <View style={S.statDivider} />
          <View style={S.statBox}>
            <Text style={S.statNumGreen}>{onTrackCount}</Text>
            <Text style={S.statLabel}>On Track</Text>
          </View>
        </View>

        {/* ── Table ── */}
        <View style={S.tableWrap}>

          {/* Header row */}
          <View style={S.thead}>
            <View style={S.colSite}>
              <Text style={S.thLeft}>Site</Text>
            </View>
            {weekdays.map(wd => (
              <View key={wd} style={S.colDay}>
                <Text style={S.th}>
                  {new Date(wd + "T00:00:00Z").toLocaleDateString("en-AU", { weekday: "narrow" })}
                </Text>
              </View>
            ))}
            <View style={S.colTb}>
              <Text style={S.th}>Toolbox</Text>
            </View>
            <View style={S.colInd}>
              <Text style={S.th}>Inductions</Text>
            </View>
            <View style={S.colDocs}>
              <Text style={S.th}>Docs</Text>
            </View>
            <View style={S.colStat}>
              <Text style={S.th}>Status</Text>
            </View>
          </View>

          {/* Data rows */}
          {sites.map((site, idx) => {
            const dayStatuses = site.prestartDayStatus ?? null;
            const coveredDays = site.dailyPrestarts.days;
            const status      = rowStatus(site, checkableDays);
            const isAlt       = idx % 2 === 1;
            const submitted   = site.toolboxTalk?.submitted ?? (site.toolboxStatus !== "red");

            return (
              <View
                key={site.siteReference}
                style={[S.trow, ...(isAlt ? [S.trowAlt] : [])]}
                wrap={false}
              >
                {/* Site */}
                <View style={S.colSite}>
                  <Text style={S.siteName}>{site.siteName}</Text>
                  {site.gamingFlagged && (
                    <Text style={S.siteFlag}>! Long validity</Text>
                  )}
                </View>

                {/* Day cells — coloured 16×16 View boxes */}
                {weekdays.map(wd => {
                  const ds: DayStatus =
                    dayStatuses              ? (dayStatuses[wd] ?? "future") :
                    wd > todayStr            ? "future"                       :
                    coveredDays.includes(wd) ? "green"                        : "red";

                  const boxStyle =
                    ds === "green"  ? S.dayBoxGreen :
                    ds === "amber"  ? S.dayBoxAmber :
                    ds === "future" ? S.dayBoxGrey  : S.dayBoxRed;

                  const label =
                    ds === "green"  ? "OK" :
                    ds === "amber"  ? "!"  :
                    ds === "future" ? "-"  : "X";

                  const labelStyle = ds === "future" ? S.dayLabelDark : S.dayLabel;

                  return (
                    <View key={wd} style={S.colDay}>
                      <View style={[S.dayBox, boxStyle]}>
                        <Text style={labelStyle}>{label}</Text>
                      </View>
                    </View>
                  );
                })}

                {/* Toolbox */}
                <View style={S.colTb}>
                  <Text style={
                    submitted && site.toolboxStatus === "green" ? S.tbGreen :
                    submitted && site.toolboxStatus === "amber" ? S.tbAmber : S.tbRed
                  }>
                    {submitted && site.toolboxStatus === "green" ? "Done"      :
                     submitted && site.toolboxStatus === "amber" ? "Long val." : "Missing"}
                  </Text>
                </View>

                {/* Inductions */}
                <View style={S.colInd}>
                  <Text style={site.pendingInductions.count === 0 ? S.countGreen : S.countAmber}>
                    {site.pendingInductions.count === 0 ? "Clear" : String(site.pendingInductions.count)}
                  </Text>
                </View>

                {/* Docs */}
                <View style={S.colDocs}>
                  <Text style={site.pendingDocs.count === 0 ? S.countGreen : S.countAmber}>
                    {site.pendingDocs.count === 0 ? "Clear" : String(site.pendingDocs.count)}
                  </Text>
                </View>

                {/* Status */}
                <View style={S.colStat}>
                  <Text style={
                    status === "On Track"  ? S.statGreen :
                    status === "Attention" ? S.statAmber : S.statRed
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
          <Text style={S.footerLeft}>Holdpoint · Confidential · Site Compliance Report</Text>
          <Text
            style={S.footerRight}
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
