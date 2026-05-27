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

// ── Brand colours ──────────────────────────────────────────────────────────────
const C = {
  navy:    "#1B2A3B",
  gold:    "#C8972A",
  white:   "#FFFFFF",
  green:   "#16A34A",
  amber:   "#D97706",
  red:     "#DC2626",
  border:  "#E5E7EB",
  grey:    "#9CA3AF",
  text:    "#111827",
  subText: "#6B7280",
  rowAlt:  "#F9FAFB",
};

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  page: {
    backgroundColor: C.white,
    paddingBottom:   50,
    fontFamily:      "Helvetica",
    fontSize:        8,
  },

  // ── Header (full-width navy band) ──────────────────────────────────────────
  header: {
    backgroundColor:   C.navy,
    flexDirection:     "row",
    justifyContent:    "space-between",
    alignItems:        "flex-start",
    paddingVertical:   14,
    paddingHorizontal: 30,
    marginBottom:      14,
  },
  headerLeft: {
    flexDirection: "column",
  },
  brandName: {
    fontSize:      20,
    fontFamily:    "Helvetica-Bold",
    color:         C.gold,
    letterSpacing: 2,
  },
  brandTagline: {
    fontSize:  9,
    color:     C.white,
    marginTop: 3,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  reportTitle: {
    fontSize:   14,
    fontFamily: "Helvetica-Bold",
    color:      C.white,
  },
  reportWeek: {
    fontSize:  10,
    color:     C.gold,
    marginTop: 3,
  },
  reportGenerated: {
    fontSize:  8,
    color:     C.white,
    marginTop: 3,
    opacity:   0.7,
  },

  // ── Body content wrapper ───────────────────────────────────────────────────
  body: {
    paddingHorizontal: 30,
  },

  // ── Summary strip — white bg, gold bottom border ──────────────────────────
  summaryStrip: {
    flexDirection:    "row",
    backgroundColor:  C.white,
    borderBottom:     2,
    borderColor:      C.gold,
    paddingVertical:  12,
    paddingHorizontal: 14,
    marginBottom:     16,
    gap:              0,
  },
  summaryItem: {
    flex:       1,
    alignItems: "center",
  },
  summaryDivider: {
    width:           1,
    backgroundColor: C.border,
    marginVertical:  2,
  },
  summaryValue: {
    fontSize:   24,
    fontFamily: "Helvetica-Bold",
    color:      C.text,
  },
  summaryValueRed: {
    fontSize:   24,
    fontFamily: "Helvetica-Bold",
    color:      C.red,
  },
  summaryValueGreen: {
    fontSize:   24,
    fontFamily: "Helvetica-Bold",
    color:      C.green,
  },
  summaryLabel: {
    fontSize:      8,
    color:         C.subText,
    marginTop:     2,
    textAlign:     "center",
    textTransform: "uppercase",
  },

  // ── Table ──────────────────────────────────────────────────────────────────
  table: {
    width:        "100%",
    borderRadius: 4,
    overflow:     "hidden",
    border:       1,
    borderColor:  C.border,
  },
  thead: {
    flexDirection:     "row",
    backgroundColor:   C.navy,
    paddingVertical:   6,
    paddingHorizontal: 8,
    alignItems:        "center",
  },
  trow: {
    flexDirection:     "row",
    paddingVertical:   5,
    paddingHorizontal: 8,
    borderBottom:      1,
    borderColor:       C.border,
    alignItems:        "center",
  },
  trowAlt: {
    backgroundColor: C.rowAlt,
  },

  // Column widths — no Quality column
  colSite:       { width: "24%", paddingRight: 4 },
  colDay:        { width: "4%",  alignItems: "center" },
  colToolbox:    { width: "10%", alignItems: "center" },
  colInductions: { width: "15%", alignItems: "center" },
  colDocs:       { width: "15%", alignItems: "center" },
  colStatus:     { width: "16%", alignItems: "center" },

  // Text
  thText: {
    color:         C.white,
    fontFamily:    "Helvetica-Bold",
    fontSize:      6.5,
    textTransform: "uppercase",
    textAlign:     "center",
  },
  thTextLeft: {
    color:         C.white,
    fontFamily:    "Helvetica-Bold",
    fontSize:      6.5,
    textTransform: "uppercase",
  },
  tdSiteName: {
    fontSize:   8,
    fontFamily: "Helvetica-Bold",
    color:      C.text,
  },
  tdGamingFlag: {
    fontSize:   7,
    color:      C.amber,
    fontFamily: "Helvetica-Bold",
    marginTop:  2,
  },

  // Day cells — solid fill, white text
  dayCell: {
    borderRadius:      2,
    paddingVertical:   3,
    paddingHorizontal: 4,
    fontSize:          7,
    fontFamily:        "Helvetica-Bold",
    color:             C.white,
    textAlign:         "center",
    minWidth:          16,
  },
  dayCellGreen: { backgroundColor: C.green  },
  dayCellAmber: { backgroundColor: C.amber  },
  dayCellRed:   { backgroundColor: C.red    },
  dayCellGrey:  { backgroundColor: C.grey   },

  // Pills
  pill: {
    borderRadius:      2,
    paddingVertical:   2,
    paddingHorizontal: 5,
    fontSize:          6.5,
    fontFamily:        "Helvetica-Bold",
    textAlign:         "center",
  },
  pillGreen: { backgroundColor: "#DCFCE7", color: C.green  },
  pillAmber: { backgroundColor: "#FEF3C7", color: C.amber  },
  pillRed:   { backgroundColor: "#FEE2E2", color: C.red    },

  // Status pills — solid for prominence
  pillStatusGreen: { backgroundColor: C.green, color: C.white },
  pillStatusAmber: { backgroundColor: C.amber, color: C.white },
  pillStatusRed:   { backgroundColor: C.red,   color: C.white },

  // ── Footer ─────────────────────────────────────────────────────────────────
  footer: {
    position:       "absolute",
    bottom:         16,
    left:           30,
    right:          30,
    flexDirection:  "row",
    justifyContent: "space-between",
    alignItems:     "center",
    borderTop:      1,
    borderColor:    C.gold,
    paddingTop:     5,
  },
  footerText: {
    fontSize: 6.5,
    color:    C.subText,
  },
  footerPage: {
    fontSize: 6.5,
    color:    C.subText,
  },
});

// ── Types ─────────────────────────────────────────────────────────────────────

type DayStatus = "green" | "amber" | "red" | "future";

interface SiteData {
  siteReference:     string;
  siteName:          string;
  dailyPrestarts:    { count: number; days: string[] };
  prestartDayStatus: Record<string, DayStatus> | null;
  gamingFlagged:     boolean;
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
  weekStart: string;   // YYYY-MM-DD Monday
  todayStr:  string;   // YYYY-MM-DD today in Sydney
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

  // Summary stats
  const actionCount  = sites.filter(s => rowStatus(s, checkableDays) === "Action Needed").length;
  const onTrackCount = sites.filter(s => rowStatus(s, checkableDays) === "On Track").length;
  const totalPending = sites.reduce((sum, s) => sum + s.pendingInductions.count + s.pendingDocs.count, 0);

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>

        {/* ── Header — full-width navy band ── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.brandName}>HOLDPOINT</Text>
            <Text style={styles.brandTagline}>Construction QA Platform</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.reportTitle}>Site Compliance Report</Text>
            <Text style={styles.reportWeek}>
              {fmtDate(weekStart)} – {fmtDate(fridayStr)}
            </Text>
            <Text style={styles.reportGenerated}>Generated {generatedAt} AEST</Text>
          </View>
        </View>

        <View style={styles.body}>

          {/* ── Summary strip — white, gold bottom border ── */}
          <View style={styles.summaryStrip}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{sites.length}</Text>
              <Text style={styles.summaryLabel}>Sites Tracked</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValueRed}>{actionCount}</Text>
              <Text style={styles.summaryLabel}>Action Required</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{totalPending}</Text>
              <Text style={styles.summaryLabel}>Total Pending</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValueGreen}>{onTrackCount}</Text>
              <Text style={styles.summaryLabel}>On Track</Text>
            </View>
          </View>

          {/* ── Compliance table ── */}
          <View style={styles.table}>

            {/* Table header */}
            <View style={styles.thead}>
              <View style={styles.colSite}>
                <Text style={styles.thTextLeft}>Site</Text>
              </View>
              {weekdays.map(wd => (
                <View key={wd} style={styles.colDay}>
                  <Text style={styles.thText}>
                    {new Date(wd + "T00:00:00Z").toLocaleDateString("en-AU", { weekday: "narrow" })}
                  </Text>
                </View>
              ))}
              <View style={styles.colToolbox}>
                <Text style={styles.thText}>Toolbox</Text>
              </View>
              <View style={styles.colInductions}>
                <Text style={styles.thText}>Pending</Text>
              </View>
              <View style={styles.colDocs}>
                <Text style={styles.thText}>Docs</Text>
              </View>
              <View style={styles.colStatus}>
                <Text style={styles.thText}>Status</Text>
              </View>
            </View>

            {/* Table rows */}
            {sites.map((site, idx) => {
              const dayStatuses = site.prestartDayStatus ?? null;
              const coveredDays = site.dailyPrestarts.days;
              const status      = rowStatus(site, checkableDays);
              const isAlt       = idx % 2 === 1;

              return (
                <View key={site.siteReference} style={[styles.trow, ...(isAlt ? [styles.trowAlt] : [])]}>

                  {/* Site name + gaming flag */}
                  <View style={styles.colSite}>
                    <Text style={styles.tdSiteName}>{site.siteName}</Text>
                    {site.gamingFlagged && (
                      <Text style={styles.tdGamingFlag}>⚠ Long validity</Text>
                    )}
                  </View>

                  {/* Day cells — use prestartDayStatus if available, else days array */}
                  {weekdays.map((wd, i) => {
                    const ds: DayStatus =
                      dayStatuses    ? (dayStatuses[wd] ?? "red") :
                      wd > todayStr  ? "future"                   :
                      coveredDays.includes(wd) ? "green"          : "red";

                    const cellStyle =
                      ds === "green"  ? styles.dayCellGreen :
                      ds === "amber"  ? styles.dayCellAmber :
                      ds === "future" ? styles.dayCellGrey  : styles.dayCellRed;
                    const label =
                      ds === "green"  ? "✓" :
                      ds === "amber"  ? "⚠" :
                      ds === "future" ? "—" : "✗";

                    return (
                      <View key={wd} style={styles.colDay}>
                        <Text style={[styles.dayCell, cellStyle]}>{label}</Text>
                      </View>
                    );
                  })}

                  {/* Toolbox */}
                  <View style={styles.colToolbox}>
                    <Text style={[
                      styles.pill,
                      site.toolboxStatus === "green" ? styles.pillGreen :
                      site.toolboxStatus === "amber" ? styles.pillAmber : styles.pillRed,
                    ]}>
                      {site.toolboxStatus === "green" ? "Done" :
                       site.toolboxStatus === "amber" ? "Long val." : "Missing"}
                    </Text>
                  </View>

                  {/* Pending Inductions */}
                  <View style={styles.colInductions}>
                    <Text style={[
                      styles.pill,
                      site.pendingInductions.count === 0 ? styles.pillGreen : styles.pillAmber,
                    ]}>
                      {site.pendingInductions.count === 0 ? "Clear" : `${site.pendingInductions.count}`}
                    </Text>
                  </View>

                  {/* Pending Docs */}
                  <View style={styles.colDocs}>
                    <Text style={[
                      styles.pill,
                      site.pendingDocs.count === 0 ? styles.pillGreen : styles.pillAmber,
                    ]}>
                      {site.pendingDocs.count === 0 ? "Clear" : `${site.pendingDocs.count}`}
                    </Text>
                  </View>

                  {/* Status */}
                  <View style={styles.colStatus}>
                    <Text style={[
                      styles.pill,
                      status === "On Track"      ? styles.pillStatusGreen :
                      status === "Attention"     ? styles.pillStatusAmber : styles.pillStatusRed,
                    ]}>
                      {status}
                    </Text>
                  </View>

                </View>
              );
            })}

          </View>
        </View>

        {/* ── Footer — gold top border ── */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Holdpoint · Site Compliance
          </Text>
          <Text
            style={styles.footerPage}
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

  // Fetch live compliance data from the compliance-data endpoint
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
    return NextResponse.json(
      { error: "No site data available for this week." },
      { status: 404 },
    );
  }

  const todayStr = getSydneyDateString(new Date().toISOString());

  let buffer: Buffer;
  try {
    buffer = await renderToBuffer(
      <CompliancePDF
        sites={sites}
        weekStart={weekStart}
        todayStr={todayStr}
      />
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
