// POST /api/holdpoint/pdf
// Body: { project_name, hold_points }
// Returns a portrait A4 PDF of the Hold Point Register.

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

const STAGE_ORDER = [
  "Demolition",
  "Structure",
  "Facade",
  "Services Rough-In",
  "Fitout",
  "External Works",
  "Defects & Handover",
];

const STAGE_COLORS: Record<string, string> = {
  "Demolition":        "#FEF3C7",
  "Structure":         "#DBEAFE",
  "Facade":            "#F0FDF4",
  "Services Rough-In": "#FDF4FF",
  "Fitout":            "#FFF7ED",
  "External Works":    "#F0FDF4",
  "Defects & Handover":"#F8FAFC",
};

const STAGE_TEXT: Record<string, string> = {
  "Demolition":        "#92400E",
  "Structure":         "#1E40AF",
  "Facade":            "#166534",
  "Services Rough-In": "#6B21A8",
  "Fitout":            "#9A3412",
  "External Works":    "#14532D",
  "Defects & Handover":"#334155",
};

interface HoldPoint {
  id:                string;
  description:       string;
  trade:             string;
  stage:             string;
  responsible_party: string;
  source_reference:  string;
  completed:         boolean;
}

const S = StyleSheet.create({
  page:        { backgroundColor: "#FFFFFF", fontFamily: "Helvetica", fontSize: 8, paddingBottom: 45 },
  pageHeader:  { backgroundColor: "#2E3A4E", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 20, paddingHorizontal: 30 },
  brand:       { color: "#C8972A", fontSize: 18, fontFamily: "Helvetica-Bold" },
  tagline:     { color: "#FFFFFF", fontSize: 7, marginTop: 2 },
  headerRight: { alignItems: "flex-end" },
  reportTitle: { color: "#FFFFFF", fontSize: 12, fontFamily: "Helvetica-Bold" },
  projectName: { color: "#C8972A", fontSize: 9, marginTop: 3 },
  genDate:     { color: "#94A3B8", fontSize: 7, marginTop: 2 },
  summaryBar:  { flexDirection: "row", backgroundColor: "#F8FAFC", padding: 12, marginHorizontal: 20, marginTop: 12, borderRadius: 6, gap: 20 },
  summaryItem: { alignItems: "center" },
  summaryNum:  { fontSize: 16, fontFamily: "Helvetica-Bold", color: "#0F172A" },
  summaryLbl:  { fontSize: 6, color: "#64748B", marginTop: 2 },
  body:        { marginHorizontal: 20, marginTop: 12 },
  stageHead:   { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 7, marginBottom: 2, borderRadius: 3 },
  stageLabel:  { fontSize: 9, fontFamily: "Helvetica-Bold" },
  stageCount:  { fontSize: 7 },
  tableHead:   { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#E2E8F0", paddingVertical: 4, paddingHorizontal: 4, backgroundColor: "#F1F5F9" },
  tableRow:    { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#F1F5F9", paddingVertical: 5, paddingHorizontal: 4 },
  tableRowAlt: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#F1F5F9", paddingVertical: 5, paddingHorizontal: 4, backgroundColor: "#FAFAFA" },
  colNum:      { width: 40, fontFamily: "Helvetica-Bold", fontSize: 7, color: "#475569" },
  colDesc:     { flex: 3, paddingRight: 6, fontSize: 7, color: "#0F172A" },
  colTrade:    { flex: 1, fontSize: 7, color: "#475569" },
  colResp:     { flex: 1.5, fontSize: 7, color: "#475569" },
  colSource:   { flex: 1.5, fontSize: 7, color: "#64748B" },
  colSignoff:  { width: 44, alignItems: "center" },
  checkbox:    { width: 14, height: 14, borderWidth: 1, borderColor: "#CBD5E1" },
  thText:      { fontFamily: "Helvetica-Bold", fontSize: 7, color: "#64748B" },
  stageGap:    { marginTop: 10 },
  footer:      { position: "absolute", bottom: 14, left: 20, right: 20, textAlign: "center", fontSize: 6, color: "#94A3B8", borderTopWidth: 1, borderTopColor: "#E2E8F0", paddingTop: 6 },
});

function groupByStage(holdPoints: HoldPoint[]): Map<string, HoldPoint[]> {
  const map = new Map<string, HoldPoint[]>();
  // Ensure stage order
  for (const stage of STAGE_ORDER) map.set(stage, []);
  for (const hp of holdPoints) {
    if (!map.has(hp.stage)) map.set(hp.stage, []);
    map.get(hp.stage)!.push(hp);
  }
  // Remove empty stages
  for (const [k, v] of map) { if (v.length === 0) map.delete(k); }
  return map;
}

function HoldPointPdf({
  projectName,
  holdPoints,
  generatedDate,
}: {
  projectName:   string;
  holdPoints:    HoldPoint[];
  generatedDate: string;
}) {
  const grouped = groupByStage(holdPoints);

  const by_stage: Record<string, number> = {};
  for (const [stage, items] of grouped) by_stage[stage] = items.length;

  return (
    <Document>
      <Page size="A4" style={S.page}>
        {/* Header */}
        <View style={S.pageHeader}>
          <View>
            <Text style={S.brand}>Holdpoint</Text>
            <Text style={S.tagline}>Construction QA Platform</Text>
          </View>
          <View style={S.headerRight}>
            <Text style={S.reportTitle}>Hold Point Register</Text>
            <Text style={S.projectName}>{projectName}</Text>
            <Text style={S.genDate}>Generated {generatedDate}</Text>
          </View>
        </View>

        {/* Summary bar */}
        <View style={S.summaryBar}>
          <View style={S.summaryItem}>
            <Text style={S.summaryNum}>{holdPoints.length}</Text>
            <Text style={S.summaryLbl}>Total Hold Points</Text>
          </View>
          {Object.entries(by_stage).map(([stage, count]) => (
            <View key={stage} style={S.summaryItem}>
              <Text style={S.summaryNum}>{count}</Text>
              <Text style={S.summaryLbl}>{stage}</Text>
            </View>
          ))}
        </View>

        {/* Stage groups */}
        <View style={S.body}>
          {Array.from(grouped.entries()).map(([stage, items], gi) => {
            const bgColor   = STAGE_COLORS[stage] ?? "#F8FAFC";
            const textColor = STAGE_TEXT[stage]   ?? "#334155";
            return (
              <View key={stage} style={gi > 0 ? S.stageGap : {}}>
                {/* Stage heading */}
                <View style={[S.stageHead, { backgroundColor: bgColor }]}>
                  <Text style={[S.stageLabel, { color: textColor }]}>{stage.toUpperCase()}</Text>
                  <Text style={[S.stageCount, { color: textColor }]}>{items.length} hold point{items.length !== 1 ? "s" : ""}</Text>
                </View>

                {/* Table header */}
                <View style={S.tableHead}>
                  <Text style={[S.colNum, S.thText]}>#</Text>
                  <Text style={[S.colDesc, S.thText]}>DESCRIPTION</Text>
                  <Text style={[S.colTrade, S.thText]}>TRADE</Text>
                  <Text style={[S.colResp, S.thText]}>RESPONSIBLE PARTY</Text>
                  <Text style={[S.colSource, S.thText]}>SOURCE</Text>
                  <View style={S.colSignoff}><Text style={S.thText}>SIGN-OFF</Text></View>
                </View>

                {/* Rows */}
                {items.map((hp, ri) => (
                  <View key={hp.id} style={ri % 2 === 0 ? S.tableRow : S.tableRowAlt} wrap={false}>
                    <Text style={S.colNum}>{hp.id}</Text>
                    <Text style={S.colDesc}>{hp.description}</Text>
                    <Text style={S.colTrade}>{hp.trade}</Text>
                    <Text style={S.colResp}>{hp.responsible_party}</Text>
                    <Text style={S.colSource}>{hp.source_reference}</Text>
                    <View style={S.colSignoff}><View style={S.checkbox} /></View>
                  </View>
                ))}
              </View>
            );
          })}
        </View>

        {/* Footer */}
        <Text
          style={S.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            `Holdpoint · Confidential · Generated ${generatedDate} · Page ${pageNumber} of ${totalPages}`
          }
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

  let body: { project_name?: string; hold_points?: HoldPoint[] };
  try {
    body = await request.json() as typeof body;
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  if (!body.project_name || !body.hold_points) {
    return new NextResponse("project_name and hold_points required", { status: 400 });
  }

  const generatedDate = new Date().toLocaleDateString("en-AU", {
    day: "2-digit", month: "short", year: "numeric",
  });

  const pdfBuffer = await renderToBuffer(
    <HoldPointPdf
      projectName={body.project_name}
      holdPoints={body.hold_points}
      generatedDate={generatedDate}
    />,
  );

  const safeName = body.project_name.replace(/[^a-z0-9]/gi, "-").toLowerCase();
  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type":        "application/pdf",
      "Content-Disposition": `attachment; filename="holdpoint-register-${safeName}.pdf"`,
    },
  });
}
