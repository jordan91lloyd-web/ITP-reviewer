// POST /api/breadcrumb/compliance-pdf
// Body: { data: ComplianceData, companyName?: string }
// Returns: landscape A4 PDF for the site compliance report.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
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

type PrestartDay = boolean | null;

interface SiteRow {
  siteReference: string;
  siteName:      string;
  prestart:      { mon: PrestartDay; tue: PrestartDay; wed: PrestartDay; thu: PrestartDay; fri: PrestartDay };
  toolbox:       boolean;
  pendingInductions: number;
  pendingDocs:   number;
  notes:         string;
  status:        "On Track" | "Action Req.";
}

interface ComplianceData {
  weekStart:  string;
  weekDates:  string[];
  weekDays:   string[];
  today:      string;
  sites:      SiteRow[];
}

const C = {
  slate:  "#2E3A4E",
  gold:   "#C8972A",
  white:  "#FFFFFF",
  green:  "#16A34A",
  red:    "#DC2626",
  amber:  "#D97706",
  grey:   "#94A3B8",
  border: "#E2E8F0",
  rowAlt: "#F8FAFC",
  header: "#F1F5F9",
  text:   "#0F172A",
  muted:  "#64748B",
};

const S = StyleSheet.create({
  page:       { backgroundColor: C.white, fontFamily: "Helvetica", fontSize: 7, paddingBottom: 40 },
  pageHeader: { backgroundColor: C.slate, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 18, paddingHorizontal: 30 },
  brand:      { color: C.gold, fontSize: 16, fontFamily: "Helvetica-Bold" },
  tagline:    { color: C.white, fontSize: 7, marginTop: 2 },
  reportTitle:{ color: C.white, fontSize: 11, fontFamily: "Helvetica-Bold", textAlign: "right" },
  weekLabel:  { color: C.gold, fontSize: 8, marginTop: 3, textAlign: "right" },
  tableWrap:  { marginHorizontal: 20, marginTop: 14 },
  tableHead:  { flexDirection: "row", backgroundColor: C.header, borderBottomWidth: 1, borderBottomColor: C.border, paddingVertical: 5 },
  tableRow:   { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: C.border, paddingVertical: 4 },
  tableRowAlt:{ flexDirection: "row", borderBottomWidth: 1, borderBottomColor: C.border, paddingVertical: 4, backgroundColor: C.rowAlt },
  thSite:     { width: 130, paddingHorizontal: 6, fontFamily: "Helvetica-Bold", fontSize: 7, color: C.muted },
  thDay:      { width: 34, textAlign: "center", fontFamily: "Helvetica-Bold", fontSize: 7, color: C.muted },
  thToolbox:  { width: 46, textAlign: "center", fontFamily: "Helvetica-Bold", fontSize: 7, color: C.muted },
  thCount:    { width: 56, textAlign: "center", fontFamily: "Helvetica-Bold", fontSize: 7, color: C.muted },
  thNotes:    { flex: 1, paddingHorizontal: 6, fontFamily: "Helvetica-Bold", fontSize: 7, color: C.muted },
  thStatus:   { width: 64, textAlign: "center", fontFamily: "Helvetica-Bold", fontSize: 7, color: C.muted },
  tdSite:     { width: 130, paddingHorizontal: 6, color: C.text, fontFamily: "Helvetica-Bold" },
  tdDay:            { width: 34, textAlign: "center" },
  tdDayGrey:        { width: 34, textAlign: "center", color: "#94A3B8" },
  tdDayGreen:       { width: 34, textAlign: "center", color: "#16A34A", fontFamily: "Helvetica-Bold" },
  tdDayRed:         { width: 34, textAlign: "center", color: "#DC2626", fontFamily: "Helvetica-Bold" },
  tdToolbox:        { width: 46, textAlign: "center" },
  tdToolboxGreen:   { width: 46, textAlign: "center", color: "#16A34A", fontFamily: "Helvetica-Bold" },
  tdToolboxRed:     { width: 46, textAlign: "center", color: "#DC2626", fontFamily: "Helvetica-Bold" },
  tdCount:          { width: 56, textAlign: "center" },
  tdCountAmber:     { width: 56, textAlign: "center", color: "#D97706", fontFamily: "Helvetica-Bold" },
  tdNotes:    { flex: 1, paddingHorizontal: 6, color: C.muted },
  tdStatus:   { width: 64, textAlign: "center" },
  pill:       { borderRadius: 4, paddingHorizontal: 4, paddingVertical: 1, fontSize: 6, fontFamily: "Helvetica-Bold", alignSelf: "center" },
  pillGreen:  { borderRadius: 4, paddingHorizontal: 4, paddingVertical: 1, fontSize: 6, fontFamily: "Helvetica-Bold", alignSelf: "center", backgroundColor: "#DCFCE7", color: "#16A34A" },
  pillRed:    { borderRadius: 4, paddingHorizontal: 4, paddingVertical: 1, fontSize: 6, fontFamily: "Helvetica-Bold", alignSelf: "center", backgroundColor: "#FEE2E2", color: "#DC2626" },
  footer:     { position: "absolute", bottom: 16, left: 20, right: 20, textAlign: "center", fontSize: 6, color: C.muted },
});

function fmtWeekFull(weekStart: string): string {
  const d = new Date(weekStart + "T00:00:00");
  return d.toLocaleDateString("en-AU", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
}

function DayCell({ val }: { val: PrestartDay }) {
  if (val === null) return <Text style={S.tdDayGrey}>-</Text>;
  if (val)          return <Text style={S.tdDayGreen}>Y</Text>;
  return              <Text style={S.tdDayRed}>N</Text>;
}

function BoolCell({ val }: { val: boolean }) {
  return val
    ? <Text style={S.tdToolboxGreen}>Y</Text>
    : <Text style={S.tdToolboxRed}>N</Text>;
}

function CompliancePdf({ data, companyName, generatedDate }: { data: ComplianceData; companyName: string; generatedDate: string }) {
  const { weekStart, weekDates, today, sites } = data;
  const dayKeys = ["mon","tue","wed","thu","fri"] as const;
  const dayLabels = ["MON","TUE","WED","THU","FRI"];

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={S.page}>
        {/* Page header */}
        <View style={S.pageHeader}>
          <View>
            <Text style={S.brand}>Holdpoint</Text>
            <Text style={S.tagline}>{companyName}</Text>
          </View>
          <View>
            <Text style={S.reportTitle}>Site Compliance Report</Text>
            <Text style={S.weekLabel}>Week of {fmtWeekFull(weekStart)}</Text>
          </View>
        </View>

        {/* Table */}
        <View style={S.tableWrap}>
          {/* Header row */}
          <View style={S.tableHead}>
            <Text style={S.thSite}>SITE</Text>
            {dayLabels.map((label, i) => (
              <Text key={i} style={[S.thDay, weekDates[i] > today ? { color: C.grey } : {}]}>{label}</Text>
            ))}
            <Text style={S.thToolbox}>TOOLBOX</Text>
            <Text style={S.thCount}>INDUCTIONS</Text>
            <Text style={S.thCount}>DOCS</Text>
            <Text style={S.thNotes}>NOTES</Text>
            <Text style={S.thStatus}>STATUS</Text>
          </View>

          {/* Data rows */}
          {sites.map((site, si) => {
            const rowStyle = si % 2 === 0 ? S.tableRow : S.tableRowAlt;
            const pillColor   = site.status === "On Track" ? C.green : C.red;
            const pillBgColor = site.status === "On Track" ? "#DCFCE7" : "#FEE2E2";
            return (
              <View key={site.siteReference} style={rowStyle}>
                <Text style={S.tdSite}>{site.siteName}</Text>
                {dayKeys.map(k => <DayCell key={k} val={site.prestart[k] ?? null} />)}
                <BoolCell val={site.toolbox} />
                <Text style={site.pendingInductions > 0 ? S.tdCountAmber : S.tdCount}>
                  {site.pendingInductions}
                </Text>
                <Text style={site.pendingDocs > 0 ? S.tdCountAmber : S.tdCount}>
                  {site.pendingDocs}
                </Text>
                <Text style={S.tdNotes}>{site.notes}</Text>
                <View style={S.tdStatus}>
                  <Text style={site.status === "On Track" ? S.pillGreen : S.pillRed}>
                    {site.status}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Footer */}
        <Text
          style={S.footer}
          render={({ pageNumber, totalPages }) =>
            `Generated ${generatedDate} · Holdpoint · Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}

async function requireAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return !!cookieStore.get("procore_access_token")?.value;
}

export async function POST(request: NextRequest) {
  if (!await requireAuth()) {
    return new NextResponse("Not authenticated", { status: 401 });
  }

  let body: { data?: ComplianceData; companyName?: string };
  try {
    body = await request.json() as typeof body;
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  if (!body.data) return new NextResponse("data required", { status: 400 });

  const generatedDate = new Date().toLocaleDateString("en-AU", {
    timeZone: "Australia/Sydney",
    day: "2-digit", month: "short", year: "numeric",
  });

  const pdfBuffer = await renderToBuffer(
    <CompliancePdf
      data={body.data}
      companyName={body.companyName ?? "Fleek Constructions"}
      generatedDate={generatedDate}
    />
  );

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type":        "application/pdf",
      "Content-Disposition": `attachment; filename="site-compliance-${body.data.weekStart}.pdf"`,
    },
  });
}
