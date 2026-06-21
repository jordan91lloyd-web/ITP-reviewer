// POST /api/dashboard/report-pdf
// Body: { company_name, projects, window, mode }
// mode: "summary" (one-page table) or "detailed" (table + per-project Insights)
// Returns an A4 PDF buffer.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import React from "react";
import {
  renderToBuffer, Document, Page, View, Text, StyleSheet,
} from "@react-pdf/renderer";

export const dynamic     = "force-dynamic";
export const maxDuration = 60;

// ── Types (mirror ProjectReportRow subset needed for PDF) ─────────────────────

interface BandCounts {
  compliant:        number;
  minor_gaps:       number;
  significant_gaps: number;
  critical_risk:    number;
  not_reviewed:     number;
}

interface MissingItpItem {
  itp:    string;
  name:   string;
  reason: string;
}

interface ProjectRow {
  id:             number;
  name:           string;
  display_name:   string;
  project_number: string | null;
  open_count:     number | null;
  closed_count:   number | null;
  created_7d:     number | null;
  closed_7d:      number | null;
  created_30d:    number | null;
  closed_30d:     number | null;
  avg_score:      number | null;
  reviewed_count: number;
  band_counts:    BandCounts;
  ai_stage:              string | null;
  ai_missing_itps:       MissingItpItem[];
  ai_coming_up:          MissingItpItem[];
  itp_gaps:              string[];
  completion_pct:        number | null;
  snapshot_generated_at: string | null;
  procore_error:  string | null;
  insights_error: string | null;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const S = StyleSheet.create({
  page:         { backgroundColor: "#FFFFFF", fontFamily: "Helvetica", fontSize: 9, paddingBottom: 40, paddingHorizontal: 28, paddingTop: 20 },
  // Header
  headerRow:    { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 4 },
  headerTitle:  { fontSize: 16, fontFamily: "Helvetica-Bold", color: "#000000" },
  headerMeta:   { fontSize: 8, color: "#555555", marginTop: 2 },
  brandText:    { fontSize: 14, fontFamily: "Helvetica-Bold", color: "#000000" },
  headerLine:   { borderBottomWidth: 1, borderBottomColor: "#000000", marginBottom: 12 },
  // Summary table
  tHead:        { flexDirection: "row", backgroundColor: "#F0F0F0", borderBottomWidth: 1, borderBottomColor: "#AAAAAA", paddingVertical: 4, paddingHorizontal: 2 },
  tRow:         { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#DDDDDD", paddingVertical: 4, paddingHorizontal: 2 },
  tRowAlt:      { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#DDDDDD", paddingVertical: 4, paddingHorizontal: 2, backgroundColor: "#F5F5F5" },
  tRowTotal:    { flexDirection: "row", borderTopWidth: 2, borderTopColor: "#000000", paddingVertical: 5, paddingHorizontal: 2, backgroundColor: "#F0F0F0" },
  th:           { fontFamily: "Helvetica-Bold", fontSize: 7, color: "#555555" },
  td:           { fontSize: 8, color: "#000000" },
  tdMuted:      { fontSize: 8, color: "#777777" },
  tdBold:       { fontSize: 8, fontFamily: "Helvetica-Bold", color: "#000000" },
  // Column widths (percentage of table width)
  colProject:   { width: "28%" },
  colNum:       { width: "9%", textAlign: "center" },
  colNumR:      { width: "9%", textAlign: "center" },
  colScore:     { width: "9%", textAlign: "center" },
  colBands:     { width: "27%" },
  // Detail section
  detailWrap:   { marginTop: 16 },
  detailHead:   { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#2D2D2D", paddingVertical: 6, paddingHorizontal: 8, marginBottom: 0 },
  detailTitle:  { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#FFFFFF" },
  detailNumber: { fontSize: 8, color: "#BBBBBB" },
  detailBody:   { paddingVertical: 8, paddingHorizontal: 8, borderWidth: 1, borderColor: "#DDDDDD", borderTopWidth: 0 },
  detailRow:    { flexDirection: "row", marginBottom: 3 },
  detailLabel:  { width: "30%", fontSize: 8, fontFamily: "Helvetica-Bold", color: "#555555" },
  detailValue:  { width: "70%", fontSize: 8, color: "#000000" },
  sectionLabel: { fontSize: 8, fontFamily: "Helvetica-Bold", color: "#333333", marginTop: 6, marginBottom: 2 },
  gapPill:      { fontSize: 7, fontFamily: "Helvetica-Bold", color: "#DC2626", backgroundColor: "#FEF2F2", paddingVertical: 1, paddingHorizontal: 4, marginRight: 3, marginBottom: 2 },
  missingRow:   { flexDirection: "row", marginBottom: 2 },
  missingItp:   { width: "15%", fontSize: 7, fontFamily: "Helvetica-Bold", color: "#B45309" },
  missingName:  { width: "25%", fontSize: 7, color: "#000000" },
  missingReason:{ width: "60%", fontSize: 7, color: "#555555" },
  // Footer
  footer:       { position: "absolute", bottom: 12, left: 28, right: 28, borderTopWidth: 1, borderTopColor: "#CCCCCC", paddingTop: 5, textAlign: "center", fontSize: 7, color: "#777777" },
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function n(v: number | null): string { return v !== null ? String(v) : "—"; }

function bandSummary(b: BandCounts): string {
  const parts: string[] = [];
  if (b.compliant > 0)        parts.push(`${b.compliant} Compliant`);
  if (b.minor_gaps > 0)       parts.push(`${b.minor_gaps} Minor`);
  if (b.significant_gaps > 0) parts.push(`${b.significant_gaps} Sig.`);
  if (b.critical_risk > 0)    parts.push(`${b.critical_risk} Critical`);
  if (b.not_reviewed > 0)     parts.push(`${b.not_reviewed} N/R`);
  return parts.join(", ") || "—";
}

function scoreColor(score: number | null): string {
  if (score === null) return "#999999";
  if (score >= 85) return "#16A34A";
  if (score >= 70) return "#D97706";
  if (score >= 50) return "#EA580C";
  return "#DC2626";
}

function fmtAge(iso: string | null): string {
  if (!iso) return "no snapshot";
  const diffMs  = Date.now() - new Date(iso).getTime();
  const diffDays = Math.floor(diffMs / 86400_000);
  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  return `${diffDays}d ago`;
}

// ── PDF component ─────────────────────────────────────────────────────────────

function ReportPdf({
  companyName,
  projects,
  windowDays,
  mode,
  generatedDate,
}: {
  companyName:   string;
  projects:      ProjectRow[];
  windowDays:    number;
  mode:          "summary" | "detailed";
  generatedDate: string;
}) {
  const createdKey = windowDays === 7 ? "created_7d"  : "created_30d";
  const closedKey  = windowDays === 7 ? "closed_7d"   : "closed_30d";

  const totalOpen    = projects.reduce((s, r) => s + (r.open_count    ?? 0), 0);
  const totalClosed  = projects.reduce((s, r) => s + (r.closed_count  ?? 0), 0);
  const totalCreated = projects.reduce((s, r) => s + ((r[createdKey as keyof ProjectRow] as number | null) ?? 0), 0);
  const totalClosedW = projects.reduce((s, r) => s + ((r[closedKey  as keyof ProjectRow] as number | null) ?? 0), 0);
  const totalReviewed = projects.reduce((s, r) => s + r.reviewed_count, 0);

  return (
    <Document>
      <Page size="A4" style={S.page}>
        {/* Header */}
        <View style={S.headerRow}>
          <View>
            <Text style={S.headerTitle}>ITP STATUS REPORT</Text>
            <Text style={S.headerMeta}>{companyName} — Last {windowDays} days</Text>
            <Text style={S.headerMeta}>Generated: {generatedDate}</Text>
          </View>
          <View>
            <Text style={S.brandText}>Holdpoint</Text>
          </View>
        </View>
        <View style={S.headerLine} />

        {/* Summary table */}
        <View style={S.tHead}>
          <Text style={[S.colProject, S.th]}>PROJECT</Text>
          <Text style={[S.colNum,     S.th]}>CLOSED</Text>
          <Text style={[S.colNum,     S.th]}>OPEN</Text>
          <Text style={[S.colNumR,    S.th]}>NEW ({windowDays}d)</Text>
          <Text style={[S.colNumR,    S.th]}>CLS ({windowDays}d)</Text>
          <Text style={[S.colScore,   S.th]}>AVG</Text>
          <Text style={[S.colBands,   S.th]}>BANDS</Text>
        </View>

        {projects.map((row, idx) => (
          <View key={row.id} style={idx % 2 === 0 ? S.tRow : S.tRowAlt} wrap={false}>
            <View style={S.colProject}>
              <Text style={S.td}>{row.display_name || row.name}</Text>
              {row.project_number && <Text style={S.tdMuted}>#{row.project_number}</Text>}
            </View>
            <Text style={[S.colNum,   S.td]}>{n(row.closed_count)}</Text>
            <Text style={[S.colNum,   S.td]}>{n(row.open_count)}</Text>
            <Text style={[S.colNumR,  S.td]}>{n(row[createdKey as keyof ProjectRow] as number | null)}</Text>
            <Text style={[S.colNumR,  S.td]}>{n(row[closedKey  as keyof ProjectRow] as number | null)}</Text>
            <Text style={[S.colScore, S.tdBold, { color: scoreColor(row.avg_score) }]}>
              {row.avg_score !== null ? String(row.avg_score) : "—"}
            </Text>
            <Text style={[S.colBands, S.tdMuted]}>{bandSummary(row.band_counts)}</Text>
          </View>
        ))}

        {/* Totals row */}
        <View style={S.tRowTotal} wrap={false}>
          <Text style={[S.colProject, S.tdBold]}>{projects.length} projects</Text>
          <Text style={[S.colNum,   S.tdBold]}>{totalClosed}</Text>
          <Text style={[S.colNum,   S.tdBold]}>{totalOpen}</Text>
          <Text style={[S.colNumR,  S.tdBold]}>{totalCreated}</Text>
          <Text style={[S.colNumR,  S.tdBold]}>{totalClosedW}</Text>
          <Text style={[S.colScore, S.tdMuted]}>—</Text>
          <Text style={[S.colBands, S.tdMuted]}>{totalReviewed} reviewed</Text>
        </View>

        {/* Per-project detail (detailed mode only) */}
        {mode === "detailed" && projects.map(row => (
          <View key={row.id} style={S.detailWrap} wrap={false}>
            <View style={S.detailHead}>
              <Text style={S.detailTitle}>{row.display_name || row.name}</Text>
              {row.project_number && <Text style={S.detailNumber}>#{row.project_number}</Text>}
            </View>
            <View style={S.detailBody}>
              {/* Counts */}
              <View style={S.detailRow}>
                <Text style={S.detailLabel}>Closed / Open</Text>
                <Text style={S.detailValue}>{n(row.closed_count)} closed, {n(row.open_count)} open/in-progress</Text>
              </View>
              <View style={S.detailRow}>
                <Text style={S.detailLabel}>Created ({windowDays}d) / Closed ({windowDays}d)</Text>
                <Text style={S.detailValue}>{n(row[createdKey as keyof ProjectRow] as number | null)} created, {n(row[closedKey as keyof ProjectRow] as number | null)} closed†</Text>
              </View>
              <View style={S.detailRow}>
                <Text style={S.detailLabel}>Avg Score ({row.reviewed_count} reviewed)</Text>
                <Text style={[S.detailValue, { color: scoreColor(row.avg_score), fontFamily: "Helvetica-Bold" }]}>
                  {row.avg_score !== null ? String(row.avg_score) : "—"}
                </Text>
              </View>
              <View style={S.detailRow}>
                <Text style={S.detailLabel}>Bands</Text>
                <Text style={S.detailValue}>{bandSummary(row.band_counts)}</Text>
              </View>

              {/* Insights */}
              {row.completion_pct !== null && (
                <View style={S.detailRow}>
                  <Text style={S.detailLabel}>Subcontract progress</Text>
                  <Text style={S.detailValue}>{row.completion_pct}%</Text>
                </View>
              )}
              {row.ai_stage && (
                <View style={S.detailRow}>
                  <Text style={S.detailLabel}>Stage</Text>
                  <Text style={S.detailValue}>{row.ai_stage}</Text>
                </View>
              )}
              {row.snapshot_generated_at && (
                <View style={S.detailRow}>
                  <Text style={S.detailLabel}>Insights snapshot</Text>
                  <Text style={[S.detailValue, S.tdMuted]}>{fmtAge(row.snapshot_generated_at)}</Text>
                </View>
              )}

              {/* ITP gaps */}
              {row.itp_gaps.length > 0 && (
                <View>
                  <Text style={S.sectionLabel}>ITP Gaps ({row.itp_gaps.length})</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {row.itp_gaps.map(g => (
                      <Text key={g} style={S.gapPill}>{g}</Text>
                    ))}
                  </View>
                </View>
              )}

              {/* Missing ITPs */}
              {row.ai_missing_itps.length > 0 && (
                <View>
                  <Text style={S.sectionLabel}>Missing ITPs ({row.ai_missing_itps.length})</Text>
                  {row.ai_missing_itps.map(item => (
                    <View key={item.itp} style={S.missingRow}>
                      <Text style={S.missingItp}>{item.itp}</Text>
                      <Text style={S.missingName}>{item.name}</Text>
                      <Text style={S.missingReason}>{item.reason}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Coming up */}
              {row.ai_coming_up.length > 0 && (
                <View>
                  <Text style={S.sectionLabel}>Coming Up (next 2–4 weeks)</Text>
                  {row.ai_coming_up.map(item => (
                    <View key={item.itp} style={S.missingRow}>
                      <Text style={S.missingItp}>{item.itp}</Text>
                      <Text style={S.missingName}>{item.name}</Text>
                      <Text style={S.missingReason}>{item.reason}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        ))}

        {/* Footer */}
        <Text
          style={S.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            `Holdpoint · ${companyName} · ITP Status Report (${windowDays}d) · Page ${pageNumber} of ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
}

// ── Route handler ─────────────────────────────────────────────────────────────

async function requireAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return !!cookieStore.get("procore_access_token")?.value;
}

export async function POST(request: NextRequest) {
  if (!await requireAuth()) {
    return new NextResponse("Not authenticated", { status: 401 });
  }

  let body: {
    company_name?: string;
    projects?:     ProjectRow[];
    window?:       number;
    mode?:         "summary" | "detailed";
  };
  try {
    body = await request.json() as typeof body;
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  if (!body.company_name || !body.projects) {
    return new NextResponse("company_name and projects required", { status: 400 });
  }

  const windowDays    = body.window === 7 ? 7 : 30;
  const mode          = body.mode === "summary" ? "summary" : "detailed";
  const generatedDate = new Date().toLocaleDateString("en-AU", {
    day: "2-digit", month: "short", year: "numeric",
  });

  const pdfBuffer = await renderToBuffer(
    <ReportPdf
      companyName={body.company_name}
      projects={body.projects}
      windowDays={windowDays}
      mode={mode}
      generatedDate={generatedDate}
    />,
  );

  const safeCompany = body.company_name.replace(/[^a-z0-9]/gi, "-").toLowerCase();
  const filename    = mode === "summary"
    ? `itp-report-summary-${safeCompany}-${windowDays}d.pdf`
    : `itp-report-detailed-${safeCompany}-${windowDays}d.pdf`;

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type":        "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
