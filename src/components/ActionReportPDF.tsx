// ─── ActionReportPDF ──────────────────────────────────────────────────────────
// Server-side PDF component rendered via @react-pdf/renderer.
// Used by POST /api/dashboard/action-report.
//
// React PDF gotchas applied here:
//  - borderStyle: "solid" is REQUIRED for any border to render
//  - gap/columnGap not supported — use marginLeft/marginRight instead
//  - SVG strokeWidth must be a number, not a string
//  - percentage widths work but the containing View needs explicit width

import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Svg,
  Circle,
  Line,
  StyleSheet,
} from "@react-pdf/renderer";
import type { DashboardInspection } from "@/app/api/dashboard/inspections/route";

// ── Colours ───────────────────────────────────────────────────────────────────

const C = {
  bg:          "#FBF9F6",
  surface:     "#FFFFFF",
  border:      "#E8DDD0",
  sidebar:     "#8C7258",
  textPrimary: "#2E2418",
  textSecond:  "#6B5A42",
  textMuted:   "#A89278",
  compliant:   "#6A8C5E",
  minor:       "#4A6FA5",
  significant: "#C4924A",
  critical:    "#B85E3A",
  accent:      "#C4924A",
} as const;

// ── Helpers ───────────────────────────────────────────────────────────────────

function pillBg(band: string | null): string {
  if (band === "compliant")        return C.compliant;
  if (band === "minor_gaps")       return C.minor;
  if (band === "significant_gaps") return C.significant;
  if (band === "critical_risk")    return C.critical;
  return C.textMuted;
}

function bandLabel(band: string | null): string {
  if (band === "compliant")        return "Compliant";
  if (band === "minor_gaps")       return "Minor gaps";
  if (band === "significant_gaps") return "Significant gaps";
  if (band === "critical_risk")    return "Critical risk";
  return "—";
}

function scoreBandFromScore(score: number): string {
  if (score >= 85) return "compliant";
  if (score >= 70) return "minor_gaps";
  if (score >= 50) return "significant_gaps";
  return "critical_risk";
}


// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  page: {
    backgroundColor: C.bg,
    fontFamily:      "Helvetica",
    paddingTop:      36,
    paddingBottom:   52,
    paddingLeft:     40,
    paddingRight:    40,
  },
  // Header row
  header: {
    flexDirection:  "row",
    justifyContent: "space-between",
    alignItems:     "flex-start",
    marginBottom:   10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems:    "center",
  },
  wordmark: {
    fontSize:   18,
    fontFamily: "Helvetica-Bold",
    color:      C.sidebar,
    marginLeft: 8,        // replaces gap — React PDF Yoga does not support gap
  },
  headerRight: {
    alignItems: "flex-end",
  },
  headerProjectName: {
    fontSize:   11,
    fontFamily: "Helvetica-Bold",
    color:      C.textPrimary,
  },
  headerMeta: {
    fontSize: 10,
    color:    C.textMuted,
  },
  // Divider — borderStyle required or border is invisible
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    borderBottomStyle: "solid",
    marginBottom:      6,
  },
  // Summary strip
  summaryStrip: {
    fontSize:     10,
    color:        C.textMuted,
    marginBottom: 16,
  },
  // Card — borderStyle required
  card: {
    backgroundColor: C.surface,
    borderWidth:     1,
    borderColor:     C.border,
    borderStyle:     "solid",
    borderRadius:    4,
    padding:         12,
    marginBottom:    8,
  },
  cardRow1: {
    flexDirection:  "row",
    justifyContent: "space-between",
    alignItems:     "center",
    marginBottom:   6,
  },
  cardTitle: {
    fontSize:    11,
    fontFamily:  "Helvetica-Bold",
    color:       C.textPrimary,
    flex:        1,
    marginRight: 8,
  },
  // Score pill — minWidth prevents collapse; backgroundColor applied inline per-card
  scorePill: {
    borderRadius:  10,
    paddingLeft:   8,
    paddingRight:  8,
    paddingTop:    3,
    paddingBottom: 3,
    minWidth:      60,
    alignItems:    "center",
  },
  scorePillText: {
    fontSize:   9,
    fontFamily: "Helvetica-Bold",
    color:      "#FFFFFF",
  },
  // Score bar track — explicit width so percentage fill works
  barTrack: {
    width:           "100%",
    height:          3,
    backgroundColor: C.border,
    borderRadius:    2,
    marginBottom:    8,
  },
  // Section labels
  sectionLabel: {
    fontSize:     8,
    fontFamily:   "Helvetica-Bold",
    color:        C.textMuted,
    marginBottom: 3,
  },
  // Missing evidence
  evidenceItem: {
    fontSize:     9,
    color:        C.textSecond,
    marginBottom: 2,
  },
  // Action items
  actionItemRow: {
    flexDirection: "row",
    marginBottom:  2,
  },
  actionTag: {
    fontSize:    9,
    fontFamily:  "Helvetica-Bold",
    marginRight: 4,
    minWidth:    32,
  },
  actionText: {
    fontSize: 9,
    color:    C.textPrimary,
    flex:     1,
  },
  // Footer — fixed, absolute positioned; borderTopStyle required
  footer: {
    position:       "absolute",
    bottom:         18,
    left:           40,
    right:          40,
    borderTopWidth: 1,
    borderTopColor: C.border,
    borderTopStyle: "solid",
    paddingTop:     6,
    flexDirection:  "row",
    justifyContent: "space-between",
    alignItems:     "center",
  },
  footerText: {
    fontSize: 8,
    color:    C.textMuted,
  },
});

// ── Logo SVG ──────────────────────────────────────────────────────────────────
// strokeWidth must be a number in React PDF SVG (not a string)

function HoldpointLogoSvg() {
  return (
    <Svg width={24} height={24} viewBox="0 0 36 36">
      {/* Outer circle */}
      <Circle cx="18" cy="18" r="13" stroke={C.sidebar} strokeWidth={1.5} fill="none" />
      {/* N tick */}
      <Line x1="18" y1="5"  x2="18" y2="9"  stroke={C.sidebar} strokeWidth={1.5} />
      {/* S tick */}
      <Line x1="18" y1="27" x2="18" y2="31" stroke={C.sidebar} strokeWidth={1.5} />
      {/* W tick */}
      <Line x1="5"  y1="18" x2="9"  y2="18" stroke={C.sidebar} strokeWidth={1.5} />
      {/* E tick */}
      <Line x1="27" y1="18" x2="31" y2="18" stroke={C.sidebar} strokeWidth={1.5} />
      {/* Centre dot */}
      <Circle cx="18" cy="18" r="2.5" fill={C.accent} />
      {/* Hold bar */}
      <Line x1="12" y1="33" x2="24" y2="33" stroke={C.accent} strokeWidth={2} />
    </Svg>
  );
}

// ── ITP Card ──────────────────────────────────────────────────────────────────

function ItpCard({ insp }: { insp: DashboardInspection }) {
  const rd           = insp.review_data!;
  const displayScore = insp.override_score ?? insp.last_score ?? 0;
  const band         = insp.last_score_band ?? scoreBandFromScore(displayScore);
  const bg           = pillBg(band);
  const pct          = Math.min(100, Math.max(0, displayScore));

  const titleText = insp.inspection_number_of_type != null
    ? `${insp.name} · #${insp.inspection_number_of_type}`
    : insp.name;

  const missingEvidence = (rd.missing_evidence ?? []).slice(0, 4);

  return (
    <View style={styles.card} wrap={false}>
      {/* Row 1: title + score pill */}
      <View style={styles.cardRow1}>
        <Text style={styles.cardTitle}>{titleText}</Text>
        {/* backgroundColor applied inline — dynamic per band colour */}
        <View style={[styles.scorePill, { backgroundColor: bg }]}>
          <Text style={styles.scorePillText}>
            {displayScore} · {bandLabel(band)}
          </Text>
        </View>
      </View>

      {/* Row 2: score bar */}
      <View style={styles.barTrack}>
        <View style={{
          width:           `${pct}%`,
          height:          3,
          backgroundColor: bg,
          borderRadius:    2,
        }} />
      </View>

      {/* Row 3: missing evidence */}
      {missingEvidence.length > 0 && (
        <View>
          <Text style={styles.sectionLabel}>PLEASE CONFIRM THE FOLLOWING ARE ATTACHED</Text>
          {missingEvidence.map((m, i) => (
            <Text key={i} style={styles.evidenceItem}>·  {m.evidence_type}</Text>
          ))}
        </View>
      )}

    </View>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

interface ActionReportPDFProps {
  inspections:   DashboardInspection[];
  projectName:   string;
  projectNumber: string;
}

export default function ActionReportPDF({
  inspections,
  projectName,
  projectNumber,
}: ActionReportPDFProps) {
  const reviewed = inspections.filter(
    i => i.review_data != null
      && (i.override_score ?? i.last_score) !== null
      && i.last_score_band !== "reset"
  );

  // Summary stats
  const countBand = (b: string) => reviewed.filter(i => {
    const s    = i.override_score ?? i.last_score;
    const band = i.last_score_band ?? (s !== null ? scoreBandFromScore(s) : null);
    return band === b;
  }).length;
  const avgScore = reviewed.length > 0
    ? Math.round(reviewed.reduce((sum, i) => sum + (i.override_score ?? i.last_score ?? 0), 0) / reviewed.length)
    : null;
  const cCompliant   = countBand("compliant");
  const cMinor       = countBand("minor_gaps");
  const cSignificant = countBand("significant_gaps");
  const cCritical    = countBand("critical_risk");

  const dateStr = new Date().toLocaleDateString("en-AU", {
    day: "2-digit", month: "long", year: "numeric",
  });

  const summaryParts = [
    `${reviewed.length} ITP${reviewed.length !== 1 ? "s" : ""} reviewed`,
    avgScore !== null ? `Average score: ${avgScore}` : null,
    cCompliant   > 0 ? `${cCompliant} Compliant`          : null,
    cMinor       > 0 ? `${cMinor} Minor gaps`             : null,
    cSignificant > 0 ? `${cSignificant} Significant gaps`  : null,
    cCritical    > 0 ? `${cCritical} Critical risk`        : null,
  ].filter(Boolean).join("  ·  ");

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header — does not repeat (fixed=false is default) */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <HoldpointLogoSvg />
            <Text style={styles.wordmark}>Holdpoint</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerProjectName}>{projectName}</Text>
            {projectNumber ? (
              <Text style={styles.headerMeta}>#{projectNumber}</Text>
            ) : null}
            <Text style={styles.headerMeta}>Generated {dateStr}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Summary strip */}
        <Text style={styles.summaryStrip}>{summaryParts}</Text>

        {/* ITP cards */}
        {reviewed.length === 0 ? (
          <Text style={{ fontSize: 10, color: C.textMuted, fontFamily: "Helvetica-Oblique" }}>
            No reviewed ITPs in the current selection.
          </Text>
        ) : (
          reviewed.map(insp => <ItpCard key={insp.id} insp={insp} />)
        )}

        {/* Footer — fixed, repeats every page */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Holdpoint  ·  Confidential  ·  {projectName}
          </Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
            fixed
          />
        </View>

      </Page>
    </Document>
  );
}
