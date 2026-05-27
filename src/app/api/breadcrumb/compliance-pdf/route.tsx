// ─── GET /api/breadcrumb/compliance-pdf ───────────────────────────────────────
// Reads from site_compliance_snapshots and streams a PDF report.
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

// ── Colours (HP brand palette) ─────────────────────────────────────────────────
const C = {
  navy:    "#2E3A4E",
  gold:    "#C8972A",
  cream:   "#FDFAF5",
  green:   "#15803D",
  greenBg: "#DCFCE7",
  red:     "#B91C1C",
  redBg:   "#FEE2E2",
  amber:   "#B45309",
  amberBg: "#FEF3C7",
  gray:    "#6B7280",
  grayBg:  "#F3F4F6",
  white:   "#FFFFFF",
  border:  "#E5E7EB",
  text:    "#111827",
  subText: "#6B7280",
};

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  page: {
    backgroundColor: C.cream,
    paddingTop:    40,
    paddingBottom: 50,
    paddingLeft:   36,
    paddingRight:  36,
    fontFamily:    "Helvetica",
    fontSize:      8,
  },
  // Header
  headerRow: {
    flexDirection:  "row",
    justifyContent: "space-between",
    alignItems:     "flex-start",
    marginBottom:   20,
    borderBottom:   1,
    borderColor:    C.gold,
    paddingBottom:  12,
  },
  brandBlock: {
    flexDirection: "column",
  },
  brandName: {
    fontSize:    18,
    fontFamily:  "Helvetica-Bold",
    color:       C.navy,
    letterSpacing: 1,
  },
  brandTagline: {
    fontSize: 8,
    color:    C.subText,
    marginTop: 2,
  },
  reportMeta: {
    alignItems: "flex-end",
  },
  reportTitle: {
    fontSize:   11,
    fontFamily: "Helvetica-Bold",
    color:      C.navy,
  },
  reportWeek: {
    fontSize:  8,
    color:     C.subText,
    marginTop: 2,
  },
  reportGenerated: {
    fontSize:  7,
    color:     C.subText,
    marginTop: 2,
  },
  // Table
  table: {
    width:       "100%",
    borderRadius: 4,
    overflow:    "hidden",
    border:      1,
    borderColor: C.border,
  },
  thead: {
    flexDirection:   "row",
    backgroundColor: C.navy,
    paddingVertical: 6,
    paddingLeft:     8,
  },
  trow: {
    flexDirection:  "row",
    paddingVertical: 5,
    paddingLeft:     8,
    borderBottom:    1,
    borderColor:     C.border,
  },
  trowAlt: {
    backgroundColor: "#F9FAFB",
  },
  // Column widths
  colSite:       { width: "22%", paddingRight: 4 },
  colDay:        { width: "5%",  alignItems: "center" },
  colToolbox:    { width: "8%",  alignItems: "center" },
  colInductions: { width: "10%", alignItems: "center" },
  colDocs:       { width: "10%", alignItems: "center" },
  colStatus:     { width: "13%", alignItems: "center" },
  // Text
  thText: {
    color:      C.white,
    fontFamily: "Helvetica-Bold",
    fontSize:   7,
  },
  tdText: {
    color:   C.text,
    fontSize: 7,
  },
  tdSubText: {
    color:    C.subText,
    fontSize: 6,
    marginTop: 1,
  },
  // Day cell chips
  dayChip: {
    borderRadius:    2,
    paddingVertical: 1,
    paddingHorizontal: 3,
    fontSize:        7,
    fontFamily:      "Helvetica-Bold",
    textAlign:       "center",
  },
  dayGreen: { backgroundColor: C.greenBg, color: C.green },
  dayRed:   { backgroundColor: C.redBg,   color: C.red   },
  dayGray:  { backgroundColor: C.grayBg,  color: C.gray  },
  // Status chips
  statusChip: {
    borderRadius:    2,
    paddingVertical: 1,
    paddingHorizontal: 4,
    fontSize:        7,
    fontFamily:      "Helvetica-Bold",
    textAlign:       "center",
  },
  statusGreen: { backgroundColor: C.greenBg, color: C.green },
  statusAmber: { backgroundColor: C.amberBg, color: C.amber },
  statusRed:   { backgroundColor: C.redBg,   color: C.red   },
  // Footer
  footer: {
    position:   "absolute",
    bottom:     20,
    left:       36,
    right:      36,
    flexDirection:  "row",
    justifyContent: "space-between",
    alignItems:     "center",
    borderTop:      1,
    borderColor:    C.border,
    paddingTop:     6,
  },
  footerText: {
    fontSize: 7,
    color:    C.subText,
  },
  pageNumber: {
    fontSize: 7,
    color:    C.subText,
  },
  // Summary strip
  summaryStrip: {
    flexDirection:  "row",
    gap:            10,
    marginBottom:   16,
    backgroundColor: C.navy,
    borderRadius:   4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryValue: {
    fontSize:   14,
    fontFamily: "Helvetica-Bold",
    color:      C.white,
  },
  summaryLabel: {
    fontSize: 6,
    color:    "#94A3B8",
    marginTop: 2,
    textAlign: "center",
  },
});

// ── Types ─────────────────────────────────────────────────────────────────────

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
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function getSydneyDateString(iso: string): string {
  return new Date(iso).toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" });
}

function fmtDate(yyyymmdd: string): string {
  const d = new Date(yyyymmdd + "T00:00:00Z");
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}

function fmtDayLabel(yyyymmdd: string): string {
  const d = new Date(yyyymmdd + "T00:00:00Z");
  return d.toLocaleDateString("en-AU", { weekday: "short" }).slice(0, 3);
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

function siteStatus(row: SnapshotRow, checkableDays: number): "On Track" | "Attention" | "Action Needed" {
  const prestartOk   = checkableDays === 0 || row.prestart_count >= checkableDays;
  const toolboxOk    = row.toolbox_active;
  const inductionsOk = row.pending_inductions === 0;
  const docsOk       = row.pending_docs === 0;
  if (prestartOk && toolboxOk && inductionsOk && docsOk) return "On Track";
  if (!prestartOk || !toolboxOk) return "Action Needed";
  return "Attention";
}

// ── PDF document ───────────────────────────────────────────────────────────────

function CompliancePDF({
  rows,
  weekStart,
  todayStr,
}: {
  rows: SnapshotRow[];
  weekStart: string;   // YYYY-MM-DD Monday
  todayStr: string;    // YYYY-MM-DD today
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
  const onTrackCount    = rows.filter(r => siteStatus(r, checkableDays) === "On Track").length;
  const attentionCount  = rows.filter(r => siteStatus(r, checkableDays) === "Attention").length;
  const actionCount     = rows.filter(r => siteStatus(r, checkableDays) === "Action Needed").length;
  const totalPending    = rows.reduce((s, r) => s + r.pending_inductions + r.pending_docs, 0);

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>

        {/* ── Header ── */}
        <View style={styles.headerRow}>
          <View style={styles.brandBlock}>
            <Text style={styles.brandName}>HOLDPOINT</Text>
            <Text style={styles.brandTagline}>Construction QA Platform</Text>
          </View>
          <View style={styles.reportMeta}>
            <Text style={styles.reportTitle}>Site Compliance Report</Text>
            <Text style={styles.reportWeek}>
              {fmtDate(weekStart)} – {fmtDate(fridayStr)}
            </Text>
            <Text style={styles.reportGenerated}>Generated {generatedAt} AEST</Text>
          </View>
        </View>

        {/* ── Summary strip ── */}
        <View style={styles.summaryStrip}>
          {[
            { value: rows.length,    label: "Sites tracked"     },
            { value: onTrackCount,   label: "On track"          },
            { value: attentionCount, label: "Attention"         },
            { value: actionCount,    label: "Action needed"     },
            { value: totalPending,   label: "Pending approvals" },
          ].map(({ value, label }) => (
            <View key={label} style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{value}</Text>
              <Text style={styles.summaryLabel}>{label.toUpperCase()}</Text>
            </View>
          ))}
        </View>

        {/* ── Table ── */}
        <View style={styles.table}>

          {/* Table header */}
          <View style={styles.thead}>
            <View style={styles.colSite}><Text style={styles.thText}>SITE</Text></View>
            {weekdays.map(wd => (
              <View key={wd} style={styles.colDay}>
                <Text style={styles.thText}>{fmtDayLabel(wd)}</Text>
              </View>
            ))}
            <View style={styles.colToolbox}><Text style={styles.thText}>TOOLBOX</Text></View>
            <View style={styles.colInductions}><Text style={styles.thText}>INDUCTIONS</Text></View>
            <View style={styles.colDocs}><Text style={styles.thText}>SWMS/DOCS</Text></View>
            <View style={styles.colStatus}><Text style={styles.thText}>STATUS</Text></View>
          </View>

          {/* Table rows */}
          {rows.map((row, idx) => {
            const bools  = [row.prestart_mon, row.prestart_tue, row.prestart_wed, row.prestart_thu, row.prestart_fri];
            const status = siteStatus(row, checkableDays);
            const isAlt  = idx % 2 === 1;

            return (
              <View key={row.site_reference} style={[styles.trow, ...(isAlt ? [styles.trowAlt] : [])]}>
                {/* Site name */}
                <View style={styles.colSite}>
                  <Text style={styles.tdText}>{row.site_name}</Text>
                </View>

                {/* Day cells */}
                {weekdays.map((wd, i) => {
                  const isFuture  = wd > todayStr;
                  const isCovered = bools[i];
                  const chipColour = isFuture ? styles.dayGray : isCovered ? styles.dayGreen : styles.dayRed;
                  const label      = isFuture ? "—" : isCovered ? "✓" : "✗";
                  return (
                    <View key={wd} style={styles.colDay}>
                      <View style={[styles.dayChip, chipColour]}>
                        <Text>{label}</Text>
                      </View>
                    </View>
                  );
                })}

                {/* Toolbox */}
                <View style={styles.colToolbox}>
                  <View style={[styles.dayChip, row.toolbox_active ? styles.dayGreen : styles.dayRed]}>
                    <Text>{row.toolbox_active ? "Done" : "Missing"}</Text>
                  </View>
                </View>

                {/* Inductions */}
                <View style={styles.colInductions}>
                  <Text style={[styles.tdText, row.pending_inductions > 0 ? { color: C.amber } : {}]}>
                    {row.pending_inductions === 0 ? "Clear" : `${row.pending_inductions} pending`}
                  </Text>
                </View>

                {/* Docs */}
                <View style={styles.colDocs}>
                  <Text style={[styles.tdText, row.pending_docs > 0 ? { color: C.amber } : {}]}>
                    {row.pending_docs === 0 ? "Clear" : `${row.pending_docs} pending`}
                  </Text>
                </View>

                {/* Status */}
                <View style={styles.colStatus}>
                  <View style={[
                    styles.statusChip,
                    status === "On Track"      ? styles.statusGreen :
                    status === "Attention"     ? styles.statusAmber :
                    styles.statusRed,
                  ]}>
                    <Text>{status}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* ── Footer ── */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Powered by Holdpoint · itp-reviewer.vercel.app</Text>
          <Text
            style={styles.pageNumber}
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
