// ─── GET /api/breadcrumb/compliance-pdf ───────────────────────────────────────
// Reads from site_compliance_snapshots and streams a landscape A4 PDF.
//
// Query params:
//   company_id   (required)
//   week_start   YYYY-MM-DD Monday of selected week (required)
//
// Returns application/pdf with Content-Disposition: attachment

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import React from "react";
import {
  renderToBuffer,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

export const dynamic = "force-dynamic";

// ── Brand colours ──────────────────────────────────────────────────────────────
const C = {
  navy:    "#1B2A3B",
  gold:    "#C8972A",
  cream:   "#F8F5F0",
  white:   "#FFFFFF",
  green:   "#16A34A",
  amber:   "#D97706",
  red:     "#DC2626",
  blue:    "#2563EB",
  border:  "#E5E7EB",
  grey:    "#9CA3AF",
  text:    "#111827",
  subText: "#6B7280",
  rowAlt:  "#F9FAFB",
};

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Page — no padding; header is full-width navy band
  page: {
    backgroundColor: C.cream,
    paddingBottom:   50,
    fontFamily:      "Helvetica",
    fontSize:        8,
  },

  // ── Header (full-width navy background) ───────────────────────────────────
  header: {
    backgroundColor:  C.navy,
    flexDirection:    "row",
    justifyContent:   "space-between",
    alignItems:       "flex-start",
    paddingVertical:  14,
    paddingHorizontal: 30,
    marginBottom:     14,
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
    fontSize:  8,
    color:     C.white,
    marginTop: 3,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  reportTitle: {
    fontSize:   12,
    fontFamily: "Helvetica-Bold",
    color:      C.white,
  },
  reportWeek: {
    fontSize:  9,
    color:     C.gold,
    marginTop: 3,
  },
  reportGenerated: {
    fontSize:  7,
    color:     C.white,
    marginTop: 3,
    opacity:   0.7,
  },

  // ── Body content wrapper ───────────────────────────────────────────────────
  body: {
    paddingHorizontal: 30,
  },

  // ── Summary strip ──────────────────────────────────────────────────────────
  summaryStrip: {
    flexDirection:    "row",
    backgroundColor:  C.cream,
    borderLeft:       3,
    borderColor:      C.gold,
    borderRadius:     3,
    paddingVertical:  10,
    paddingHorizontal: 14,
    marginBottom:     14,
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
    fontSize:   16,
    fontFamily: "Helvetica-Bold",
    color:      C.text,
  },
  summaryValueRed: {
    fontSize:   16,
    fontFamily: "Helvetica-Bold",
    color:      C.red,
  },
  summaryValueGreen: {
    fontSize:   16,
    fontFamily: "Helvetica-Bold",
    color:      C.green,
  },
  summaryLabel: {
    fontSize:  6.5,
    color:     C.subText,
    marginTop: 2,
    textAlign: "center",
    textTransform: "uppercase",
  },

  // ── Table ──────────────────────────────────────────────────────────────────
  table: {
    width:       "100%",
    borderRadius: 4,
    overflow:    "hidden",
    border:      1,
    borderColor: C.border,
  },
  thead: {
    flexDirection:    "row",
    backgroundColor:  C.navy,
    paddingVertical:  6,
    paddingHorizontal: 8,
    alignItems:       "center",
  },
  trow: {
    flexDirection:    "row",
    paddingVertical:  5,
    paddingHorizontal: 8,
    borderBottom:     1,
    borderColor:      C.border,
    alignItems:       "center",
  },
  trowAlt: {
    backgroundColor: C.rowAlt,
  },

  // Column widths
  colSite:       { width: "20%", paddingRight: 4 },
  colDay:        { width: "4%",  alignItems: "center" },
  colToolbox:    { width: "7%",  alignItems: "center" },
  colQuality:    { width: "9%",  alignItems: "center" },
  colInductions: { width: "9%",  alignItems: "center" },
  colDocs:       { width: "9%",  alignItems: "center" },
  colStatus:     { width: "10%", alignItems: "center" },

  // Text
  thText: {
    color:      C.white,
    fontFamily: "Helvetica-Bold",
    fontSize:   6.5,
    textTransform: "uppercase",
  },
  tdSiteName: {
    fontSize:   7.5,
    fontFamily: "Helvetica-Bold",
    color:      C.text,
  },
  tdSubText: {
    fontSize:  6,
    color:     C.subText,
    marginTop: 1,
  },

  // Day cells — solid background, white text
  dayCell: {
    borderRadius:      2,
    paddingVertical:   2,
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

  // Pill chips (toolbox, quality, status)
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
  pillBlue:  { backgroundColor: "#DBEAFE", color: C.blue   },
  pillGrey:  { backgroundColor: "#F3F4F6", color: C.subText },

  // ── Footer ─────────────────────────────────────────────────────────────────
  footer: {
    position:         "absolute",
    bottom:           16,
    left:             30,
    right:            30,
    flexDirection:    "row",
    justifyContent:   "space-between",
    alignItems:       "center",
    borderTop:        1,
    borderColor:      C.gold,
    paddingTop:       5,
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

interface SnapshotRow {
  site_reference:           string;
  site_name:                string;
  prestart_mon:             boolean;
  prestart_tue:             boolean;
  prestart_wed:             boolean;
  prestart_thu:             boolean;
  prestart_fri:             boolean;
  prestart_count:           number;
  toolbox_active:           boolean;
  toolbox_submission_dates: string[] | null;
  pending_inductions:       number;
  pending_docs:             number;
  generated_at:             string;
  // New columns (nullable for old snapshots before migration)
  gaming_flagged?:        boolean | null;
  prestart_day_statuses?: Record<string, DayStatus> | null;
  toolbox_status?:        string | null;
  quality_rating?:        string | null;
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

function rowStatus(row: SnapshotRow, checkableDays: number): "On Track" | "Attention" | "Action Needed" {
  const prestartOk = checkableDays === 0 || row.prestart_count >= checkableDays;
  const tbStatus   = row.toolbox_status ?? (row.toolbox_active ? "green" : "red");
  const tbOk       = tbStatus !== "red";
  const pendingOk  = row.pending_inductions === 0 && row.pending_docs === 0;

  if (prestartOk && tbOk && pendingOk) return "On Track";
  if (!prestartOk || tbStatus === "red")  return "Action Needed";
  return "Attention";
}

// ── PDF document ───────────────────────────────────────────────────────────────

function CompliancePDF({
  rows,
  weekStart,
  todayStr,
}: {
  rows:      SnapshotRow[];
  weekStart: string;   // YYYY-MM-DD Monday
  todayStr:  string;   // YYYY-MM-DD today in Sydney
}) {
  const weekdays     = getWeekdays(weekStart);
  const [y, m, d]    = weekStart.split("-").map(Number);
  const fridayDate   = new Date(Date.UTC(y, m - 1, d + 4));
  const fridayStr    = fridayDate.toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" });
  const checkableDays = weekdays.filter(wd => wd <= todayStr).length;

  const generatedAt = new Date().toLocaleString("en-AU", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "Australia/Sydney",
  });

  // Summary stats
  const actionCount  = rows.filter(r => rowStatus(r, checkableDays) === "Action Needed").length;
  const onTrackCount = rows.filter(r => rowStatus(r, checkableDays) === "On Track").length;
  const totalPending = rows.reduce((s, r) => s + r.pending_inductions + r.pending_docs, 0);

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
              Week of {fmtDate(weekStart)} – {fmtDate(fridayStr)}
            </Text>
            <Text style={styles.reportGenerated}>Generated {generatedAt} AEST</Text>
          </View>
        </View>

        <View style={styles.body}>

          {/* ── Summary strip — cream bg, gold left border ── */}
          <View style={styles.summaryStrip}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{rows.length}</Text>
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
                <Text style={styles.thText}>Site</Text>
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
              <View style={styles.colQuality}>
                <Text style={styles.thText}>Quality</Text>
              </View>
              <View style={styles.colInductions}>
                <Text style={styles.thText}>Inductions</Text>
              </View>
              <View style={styles.colDocs}>
                <Text style={styles.thText}>SWMS/Docs</Text>
              </View>
              <View style={styles.colStatus}>
                <Text style={styles.thText}>Status</Text>
              </View>
            </View>

            {/* Table rows */}
            {rows.map((row, idx) => {
              const dayStatuses = row.prestart_day_statuses ?? null;
              const bools       = [row.prestart_mon, row.prestart_tue, row.prestart_wed, row.prestart_thu, row.prestart_fri];
              const status      = rowStatus(row, checkableDays);
              const isAlt       = idx % 2 === 1;
              const tbStatus    = row.toolbox_status ?? (row.toolbox_active ? "green" : "red");

              return (
                <View key={row.site_reference} style={[styles.trow, ...(isAlt ? [styles.trowAlt] : [])]}>

                  {/* Site name + gaming flag */}
                  <View style={styles.colSite}>
                    <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 3 }}>
                      <Text style={styles.tdSiteName}>{row.site_name}</Text>
                      {row.gaming_flagged && (
                        <Text style={{ fontSize: 7, color: C.amber, fontFamily: "Helvetica-Bold" }}>⚠</Text>
                      )}
                    </View>
                  </View>

                  {/* Day cells — use prestartDayStatus if available, else booleans */}
                  {weekdays.map((wd, i) => {
                    const ds: DayStatus =
                      dayStatuses ? (dayStatuses[wd] ?? "red") :
                      wd > todayStr    ? "future"              :
                      bools[i]         ? "green"               : "red";

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
                      tbStatus === "green" ? styles.pillGreen :
                      tbStatus === "amber" ? styles.pillAmber : styles.pillRed,
                    ]}>
                      {tbStatus === "green" ? "Done" : tbStatus === "amber" ? "Long val." : "Missing"}
                    </Text>
                  </View>

                  {/* Quality */}
                  <View style={styles.colQuality}>
                    {row.quality_rating ? (
                      <Text style={[
                        styles.pill,
                        row.quality_rating === "Detailed"   ? styles.pillGreen :
                        row.quality_rating === "Adequate"   ? styles.pillBlue  :
                        row.quality_rating === "Minimal"    ? styles.pillAmber : styles.pillRed,
                      ]}>
                        {row.quality_rating}
                      </Text>
                    ) : (
                      <Text style={[styles.pill, styles.pillGrey]}>—</Text>
                    )}
                  </View>

                  {/* Inductions */}
                  <View style={styles.colInductions}>
                    <Text style={[
                      styles.pill,
                      row.pending_inductions === 0 ? styles.pillGreen : styles.pillAmber,
                    ]}>
                      {row.pending_inductions === 0 ? "Clear" : `${row.pending_inductions}`}
                    </Text>
                  </View>

                  {/* Docs */}
                  <View style={styles.colDocs}>
                    <Text style={[
                      styles.pill,
                      row.pending_docs === 0 ? styles.pillGreen : styles.pillAmber,
                    ]}>
                      {row.pending_docs === 0 ? "Clear" : `${row.pending_docs}`}
                    </Text>
                  </View>

                  {/* Status */}
                  <View style={styles.colStatus}>
                    <Text style={[
                      styles.pill,
                      status === "On Track"      ? styles.pillGreen :
                      status === "Attention"     ? styles.pillAmber : styles.pillRed,
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
            Generated {generatedAt} · Holdpoint ITP Platform
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

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data: rows, error } = await supabase
    .from("site_compliance_snapshots")
    .select("*")
    .eq("company_id", companyId)
    .eq("week_start", weekStart)
    .order("site_name");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!rows || rows.length === 0) {
    return NextResponse.json(
      { error: "No snapshot found for this week. Generate the report first." },
      { status: 404 },
    );
  }

  const todayStr = getSydneyDateString(new Date().toISOString());

  let buffer: Buffer;
  try {
    buffer = await renderToBuffer(
      <CompliancePDF
        rows={rows as SnapshotRow[]}
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
