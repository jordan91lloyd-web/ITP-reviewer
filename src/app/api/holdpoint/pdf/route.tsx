// POST /api/holdpoint/pdf
// Body: { project_name, hold_points, generated_date? }
// Returns a portrait A4 black-and-white PDF suitable for printing and laminating.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import React from "react";
import {
  renderToBuffer, Document, Page, View, Text, StyleSheet,
} from "@react-pdf/renderer";

export const dynamic     = "force-dynamic";
export const maxDuration = 60;

const STAGE_ORDER = [
  "Demolition & Excavation",
  "Piling & Retention",
  "Concrete & Structure",
  "Steel & Framing",
  "Facade & Roofing",
  "Waterproofing",
  "Services Rough-In",
  "Fitout & Finishes",
  "External Works",
  "Testing & Commissioning",
];

interface HoldPoint {
  id:                string;
  description:       string;
  stage:             string;
  responsible_party: string;
  source:            string;
}

const S = StyleSheet.create({
  // Page
  page:        { backgroundColor: "#FFFFFF", fontFamily: "Helvetica", fontSize: 9, paddingBottom: 40 },
  // Header (first page only)
  pageHeader:  { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", paddingHorizontal: 28, paddingTop: 20, paddingBottom: 8 },
  headerTitle: { fontSize: 16, fontFamily: "Helvetica-Bold", color: "#000000" },
  headerMeta:  { fontSize: 8, color: "#555555", marginTop: 2 },
  brandText:   { fontSize: 14, fontFamily: "Helvetica-Bold", color: "#000000" },
  headerLine:  { borderBottomWidth: 1, borderBottomColor: "#000000", marginHorizontal: 28, marginBottom: 10 },
  // Body
  body:        { marginHorizontal: 28 },
  stageGap:    { marginTop: 14 },
  // Stage heading bar
  stageHead:   { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#2D2D2D", paddingVertical: 6, paddingHorizontal: 8, marginBottom: 0 },
  stageLabel:  { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#FFFFFF" },
  stageCount:  { fontSize: 8, color: "#BBBBBB" },
  // Table
  tableHead:   { flexDirection: "row", backgroundColor: "#F0F0F0", borderBottomWidth: 1, borderBottomColor: "#AAAAAA", paddingVertical: 4, paddingHorizontal: 4 },
  tableRow:    { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#DDDDDD", paddingVertical: 5, paddingHorizontal: 4 },
  tableRowAlt: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#DDDDDD", paddingVertical: 5, paddingHorizontal: 4, backgroundColor: "#F5F5F5" },
  thText:      { fontFamily: "Helvetica-Bold", fontSize: 7, color: "#555555" },
  // Columns
  colNum:      { width: "8%",  fontSize: 8,  color: "#555555" },
  colDesc:     { width: "45%", fontSize: 9,  color: "#000000", paddingRight: 4 },
  colResp:     { width: "20%", fontSize: 8,  color: "#333333", paddingRight: 4 },
  colSource:   { width: "20%", fontSize: 7,  color: "#666666", paddingRight: 4 },
  colSignoff:  { width: "7%",  alignItems: "center", justifyContent: "center" },
  signoffBox:  { width: 17, height: 17, borderWidth: 1, borderColor: "#000000" },
  // Footer
  footer:      { position: "absolute", bottom: 12, left: 28, right: 28, borderTopWidth: 1, borderTopColor: "#CCCCCC", paddingTop: 5, textAlign: "center", fontSize: 7, color: "#777777" },
});

function groupByStage(holdPoints: HoldPoint[]): Map<string, HoldPoint[]> {
  const map = new Map<string, HoldPoint[]>();
  for (const s of STAGE_ORDER) map.set(s, []);
  for (const hp of holdPoints) {
    if (!map.has(hp.stage)) map.set(hp.stage, []);
    map.get(hp.stage)!.push(hp);
  }
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

  return (
    <Document>
      <Page size="A4" style={S.page}>
        {/* Header — first page */}
        <View style={S.pageHeader}>
          <View>
            <Text style={S.headerTitle}>HOLD POINT REGISTER</Text>
            <Text style={S.headerMeta}>Project: {projectName}</Text>
            <Text style={S.headerMeta}>Generated: {generatedDate}</Text>
          </View>
          <View>
            <Text style={S.brandText}>Holdpoint</Text>
          </View>
        </View>
        <View style={S.headerLine} />

        {/* Stage groups */}
        <View style={S.body}>
          {Array.from(grouped.entries()).map(([stage, items], gi) => (
            <View key={stage} style={gi > 0 ? S.stageGap : {}}>
              {/* Stage heading */}
              <View style={S.stageHead}>
                <Text style={S.stageLabel}>{stage.toUpperCase()}</Text>
                <Text style={S.stageCount}>{items.length} hold point{items.length !== 1 ? "s" : ""}</Text>
              </View>

              {/* Table header */}
              <View style={S.tableHead}>
                <Text style={[S.colNum,   S.thText]}>#</Text>
                <Text style={[S.colDesc,  S.thText]}>DESCRIPTION</Text>
                <Text style={[S.colResp,  S.thText]}>RESPONSIBLE</Text>
                <Text style={[S.colSource,S.thText]}>SOURCE</Text>
                <View  style={S.colSignoff}><Text style={S.thText}>□</Text></View>
              </View>

              {/* Rows */}
              {items.map((hp, ri) => (
                <View key={hp.id} style={ri % 2 === 0 ? S.tableRow : S.tableRowAlt} wrap={false}>
                  <Text style={S.colNum}>{hp.id}</Text>
                  <Text style={S.colDesc}>{hp.description}</Text>
                  <Text style={S.colResp}>{hp.responsible_party}</Text>
                  <Text style={S.colSource}>{hp.source}</Text>
                  <View style={S.colSignoff}><View style={S.signoffBox} /></View>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Footer */}
        <Text
          style={S.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            `Holdpoint · ${projectName} · Hold Point Register · Page ${pageNumber} of ${totalPages}`
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

  let body: { project_name?: string; hold_points?: HoldPoint[]; generated_date?: string };
  try {
    body = await request.json() as typeof body;
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  if (!body.project_name || !body.hold_points) {
    return new NextResponse("project_name and hold_points required", { status: 400 });
  }

  const generatedDate = body.generated_date ?? new Date().toLocaleDateString("en-AU", {
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
