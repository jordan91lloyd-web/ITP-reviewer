// GET /api/drawing-changes/export?scan_id=X&format=csv|pdf
// Exports scan results as CSV or PDF.

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
export const maxDuration = 60;

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function escapeCsv(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

interface ChangeRow {
  discipline: string;
  drawing_number: string;
  drawing_title: string;
  old_revision: string;
  new_revision: string;
  change_type: string;
  description: string;
  location_on_drawing: string | null;
  severity: string;
  variation_risk: string | null;
  variation_note: string | null;
  review_status: string | null;
}

const SEV_ORDER: Record<string, number> = { high: 0, medium: 1, low: 2 };
const RISK_ORDER: Record<string, number> = { likely_variation: 0, unclear: 1, within_scope: 2 };

function sortRows(rows: ChangeRow[], sort: string): ChangeRow[] {
  const copy = [...rows];
  switch (sort) {
    case "severity":
      return copy.sort((a, b) => (SEV_ORDER[a.severity] ?? 9) - (SEV_ORDER[b.severity] ?? 9));
    case "variation_risk":
      return copy.sort((a, b) => (RISK_ORDER[a.variation_risk ?? ""] ?? 9) - (RISK_ORDER[b.variation_risk ?? ""] ?? 9));
    case "discipline":
      return copy.sort((a, b) => a.discipline.localeCompare(b.discipline) || a.drawing_number.localeCompare(b.drawing_number));
    case "change_type":
      return copy.sort((a, b) => a.change_type.localeCompare(b.change_type));
    default:
      return copy;
  }
}

function filterRows(rows: ChangeRow[], severity?: string, variationRisk?: string): ChangeRow[] {
  let result = rows;
  if (severity) result = result.filter((r) => r.severity === severity);
  if (variationRisk) result = result.filter((r) => r.variation_risk === variationRisk);
  return result;
}

interface ScanRow {
  id: string;
  project_name: string;
  project_id: string;
  completed_drawings: number;
  failed_drawings: number;
  created_at: string;
}

// ── PDF styles ───────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  page: { padding: 40, fontSize: 9, fontFamily: "Helvetica", color: "#1C1917" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  subtitle: { fontSize: 10, color: "#78716C", marginBottom: 16 },
  summaryBox: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
    padding: 10,
    backgroundColor: "#FAFAF9",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E7E5E4",
  },
  summaryLabel: { fontSize: 8, color: "#78716C" },
  summaryValue: { fontSize: 14, fontWeight: "bold" },
  disciplineHeader: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 6,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#D6D3D1",
    color: "#292524",
  },
  drawingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: "#FAFAF9",
    borderBottomWidth: 1,
    borderBottomColor: "#E7E5E4",
    marginTop: 6,
  },
  drawingTitle: { fontSize: 9, fontWeight: "bold", color: "#44403C" },
  drawingMeta: { fontSize: 8, color: "#78716C" },
  row: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#E7E5E4",
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  rowHighSeverity: {
    backgroundColor: "#FEF2F2",
  },
  typeCell: { width: 65 },
  descCell: { flex: 1, paddingRight: 6 },
  locCell: { width: 120, fontSize: 8, color: "#78716C" },
  sevCell: { width: 45, textAlign: "center" },
  riskCell: { width: 75, textAlign: "center" },
  statusCell: { width: 65, textAlign: "center" },
  typePill: { fontSize: 7, fontWeight: "bold", textTransform: "uppercase" },
  sevPill: { fontSize: 7, fontWeight: "bold", textTransform: "uppercase" },
  riskPill: { fontSize: 7, fontWeight: "bold" },
  statusPill: { fontSize: 6, color: "#78716C" },
  colHeader: { fontSize: 7, fontWeight: "bold", textTransform: "uppercase", color: "#78716C" } as const,
  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7,
    color: "#A8A29E",
  },
});

const TYPE_COLORS: Record<string, string> = {
  addition: "#166534",
  deletion: "#991B1B",
  spec_change: "#92400E",
  relocation: "#1E40AF",
};

const SEV_COLORS: Record<string, string> = {
  high: "#991B1B",
  medium: "#92400E",
  low: "#166534",
};

const TYPE_LABELS: Record<string, string> = {
  addition: "Addition",
  deletion: "Deletion",
  spec_change: "Spec Change",
  relocation: "Relocation",
};

const RISK_COLORS: Record<string, string> = {
  likely_variation: "#991B1B",
  unclear: "#92400E",
  within_scope: "#166534",
};

const RISK_LABELS: Record<string, string> = {
  likely_variation: "Likely Variation",
  unclear: "Unclear",
  within_scope: "Within Scope",
};

const STATUS_LABELS: Record<string, string> = {
  needs_review: "Needs Review",
  not_a_variation: "Not a Variation",
  variation_raised: "Raised",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ── PDF document ─────────────────────────────────────────────────────────────

function DrawingChangesPdf({
  scan,
  rows,
}: {
  scan: ScanRow;
  rows: ChangeRow[];
}) {
  // Group by discipline → drawing
  const byDiscipline: Record<
    string,
    { number: string; title: string; rev: string; changes: ChangeRow[] }[]
  > = {};

  for (const c of rows) {
    const disc = c.discipline || "Other";
    if (!byDiscipline[disc]) byDiscipline[disc] = [];

    const key = `${c.drawing_number}|${c.old_revision}|${c.new_revision}`;
    let group = byDiscipline[disc].find(
      (g) =>
        `${g.number}|${g.changes[0]?.old_revision}|${g.changes[0]?.new_revision}` ===
        key
    );
    if (!group) {
      group = {
        number: c.drawing_number,
        title: c.drawing_title,
        rev: `${c.old_revision} → ${c.new_revision}`,
        changes: [],
      };
      byDiscipline[disc].push(group);
    }
    group.changes.push(c);
  }

  const disciplines = Object.keys(byDiscipline).sort();
  const highCount = rows.filter((r) => r.severity === "high").length;

  // Summary counts
  const counts = { addition: 0, deletion: 0, spec_change: 0, relocation: 0 };
  for (const c of rows) {
    if (c.change_type in counts) counts[c.change_type as keyof typeof counts]++;
  }
  const variationCount = rows.filter((r) => r.variation_risk === "likely_variation").length;
  const unclearCount = rows.filter((r) => r.variation_risk === "unclear").length;
  const hasVariationData = rows.some((r) => r.variation_risk !== null && r.variation_risk !== undefined);

  return React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: "A4", style: s.page },
      // Title
      React.createElement(Text, { style: s.title }, "Drawing Revision Changes"),
      React.createElement(
        Text,
        { style: s.subtitle },
        `${scan.project_name} · Scan ${fmtDate(scan.created_at)} · ${scan.completed_drawings} drawings compared`
      ),

      // Summary box
      React.createElement(
        View,
        { style: s.summaryBox },
        React.createElement(
          View,
          null,
          React.createElement(Text, { style: s.summaryLabel }, "Total Changes"),
          React.createElement(Text, { style: s.summaryValue }, String(rows.length))
        ),
        React.createElement(
          View,
          null,
          React.createElement(Text, { style: s.summaryLabel }, "High Severity"),
          React.createElement(
            Text,
            { style: { ...s.summaryValue, color: highCount > 0 ? "#991B1B" : "#166534" } },
            String(highCount)
          )
        ),
        React.createElement(
          View,
          null,
          React.createElement(Text, { style: s.summaryLabel }, "Additions"),
          React.createElement(Text, { style: s.summaryValue }, String(counts.addition))
        ),
        React.createElement(
          View,
          null,
          React.createElement(Text, { style: s.summaryLabel }, "Deletions"),
          React.createElement(Text, { style: s.summaryValue }, String(counts.deletion))
        ),
        React.createElement(
          View,
          null,
          React.createElement(Text, { style: s.summaryLabel }, "Spec Changes"),
          React.createElement(Text, { style: s.summaryValue }, String(counts.spec_change))
        ),
        React.createElement(
          View,
          null,
          React.createElement(Text, { style: s.summaryLabel }, "Relocations"),
          React.createElement(Text, { style: s.summaryValue }, String(counts.relocation))
        ),
        ...(hasVariationData ? [
          React.createElement(
            View,
            { key: "var-count" },
            React.createElement(Text, { style: s.summaryLabel }, "Likely Variations"),
            React.createElement(
              Text,
              { style: { ...s.summaryValue, color: variationCount > 0 ? "#991B1B" : "#166534" } },
              String(variationCount)
            )
          ),
          React.createElement(
            View,
            { key: "unclear-count" },
            React.createElement(Text, { style: s.summaryLabel }, "Unclear"),
            React.createElement(
              Text,
              { style: { ...s.summaryValue, color: unclearCount > 0 ? "#92400E" : "#166534" } },
              String(unclearCount)
            )
          ),
        ] : [])
      ),

      // Disciplines
      ...disciplines.flatMap((discipline) => {
        const drawings = byDiscipline[discipline];
        const discHigh = drawings.flatMap((d) => d.changes).filter((c) => c.severity === "high").length;

        return [
          React.createElement(
            Text,
            { key: `dh-${discipline}`, style: s.disciplineHeader },
            `${discipline} — ${drawings.flatMap((d) => d.changes).length} changes${discHigh > 0 ? ` (${discHigh} high)` : ""}`
          ),
          ...drawings.flatMap((group) => [
            React.createElement(
              View,
              { key: `gh-${group.number}-${group.rev}`, style: s.drawingHeader, wrap: false },
              React.createElement(
                Text,
                { style: s.drawingTitle },
                `${group.number} — ${group.title}`
              ),
              React.createElement(
                Text,
                { style: s.drawingMeta },
                `Rev ${group.rev} · ${group.changes.length} change${group.changes.length !== 1 ? "s" : ""}`
              )
            ),
            // Column headers
            React.createElement(
              View,
              { key: `ch-${group.number}-${group.rev}`, style: { ...s.row, borderBottomWidth: 1, borderBottomColor: "#D6D3D1", paddingVertical: 3 }, wrap: false },
              React.createElement(View, { style: s.typeCell }, React.createElement(Text, { style: s.colHeader }, "TYPE")),
              React.createElement(View, { style: s.descCell }, React.createElement(Text, { style: s.colHeader }, "DESCRIPTION")),
              React.createElement(View, { style: s.sevCell }, React.createElement(Text, { style: s.colHeader }, "SEV.")),
              ...(hasVariationData ? [
                React.createElement(View, { key: "rh", style: s.riskCell }, React.createElement(Text, { style: s.colHeader }, "VARIATION")),
                React.createElement(View, { key: "sh", style: s.statusCell }, React.createElement(Text, { style: s.colHeader }, "STATUS")),
              ] : [])
            ),
            ...group.changes.map((c, ci) =>
              React.createElement(
                View,
                {
                  key: `cr-${group.number}-${ci}`,
                  style: {
                    ...s.row,
                    ...(c.severity === "high" ? s.rowHighSeverity : {}),
                  },
                  wrap: false,
                },
                React.createElement(
                  View,
                  { style: s.typeCell },
                  React.createElement(
                    Text,
                    {
                      style: {
                        ...s.typePill,
                        color: TYPE_COLORS[c.change_type] ?? "#44403C",
                      },
                    },
                    TYPE_LABELS[c.change_type] ?? c.change_type
                  )
                ),
                React.createElement(
                  View,
                  { style: s.descCell },
                  React.createElement(Text, null, c.description),
                  c.location_on_drawing
                    ? React.createElement(
                        Text,
                        { style: { fontSize: 7, color: "#78716C", marginTop: 2 } },
                        `Location: ${c.location_on_drawing}`
                      )
                    : null
                ),
                React.createElement(
                  View,
                  { style: s.sevCell },
                  React.createElement(
                    Text,
                    {
                      style: {
                        ...s.sevPill,
                        color: SEV_COLORS[c.severity] ?? "#44403C",
                      },
                    },
                    c.severity.toUpperCase()
                  )
                ),
                ...(hasVariationData ? [
                  React.createElement(
                    View,
                    { key: "risk", style: s.riskCell },
                    c.variation_risk
                      ? React.createElement(
                          Text,
                          { style: { ...s.riskPill, color: RISK_COLORS[c.variation_risk] ?? "#44403C" } },
                          RISK_LABELS[c.variation_risk] ?? ""
                        )
                      : null
                  ),
                  React.createElement(
                    View,
                    { key: "status", style: s.statusCell },
                    c.review_status
                      ? React.createElement(
                          Text,
                          { style: s.statusPill },
                          STATUS_LABELS[c.review_status] ?? ""
                        )
                      : null
                  ),
                ] : [])
              )
            ),
          ]),
        ];
      }),

      // Footer
      React.createElement(
        View,
        { style: s.footer, fixed: true },
        React.createElement(Text, null, `Holdpoint — Drawing Revision Changes`),
        React.createElement(
          Text,
          { render: ({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) => `Page ${pageNumber} of ${totalPages}` }
        )
      )
    )
  );
}

// ── Route handler ────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const scanId = request.nextUrl.searchParams.get("scan_id");
  const companyId = request.nextUrl.searchParams.get("company_id");
  const projectId = request.nextUrl.searchParams.get("project_id");
  const all = request.nextUrl.searchParams.get("all") === "true";
  const format = request.nextUrl.searchParams.get("format") ?? "csv";
  const sort = request.nextUrl.searchParams.get("sort") ?? "discipline";
  const severityFilter = request.nextUrl.searchParams.get("severity") ?? undefined;
  const variationFilter = request.nextUrl.searchParams.get("variation_risk") ?? undefined;

  const supabase = getSupabase();

  let scan: ScanRow;
  let rows: ChangeRow[];
  let baseName: string;

  if (all && companyId && projectId) {
    // Full project export — all changes across all scans
    const { data: changes, error } = await supabase
      .from("drawing_revision_changes")
      .select("*")
      .eq("company_id", companyId)
      .eq("project_id", projectId)
      .order("discipline", { ascending: true })
      .order("drawing_number", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get project name from latest scan
    const { data: latestScan } = await supabase
      .from("drawing_revision_scans")
      .select("*")
      .eq("company_id", companyId)
      .eq("project_id", projectId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    const uniqueDrawings = new Set((changes ?? []).map((c) => c.drawing_number));
    scan = {
      id: "all",
      project_name: latestScan?.project_name ?? projectId,
      project_id: projectId,
      completed_drawings: uniqueDrawings.size,
      failed_drawings: 0,
      created_at: new Date().toISOString(),
    };
    rows = changes ?? [];
    baseName = `drawing-changes-ALL-${scan.project_name}-${new Date().toISOString().slice(0, 10)}`;
  } else if (scanId) {
    // Single scan export
    const { data: scanData } = await supabase
      .from("drawing_revision_scans")
      .select("*")
      .eq("id", scanId)
      .single();

    if (!scanData) {
      return NextResponse.json({ error: "Scan not found" }, { status: 404 });
    }
    scan = scanData;

    const { data: changes, error } = await supabase
      .from("drawing_revision_changes")
      .select("*")
      .eq("scan_id", scanId)
      .order("discipline", { ascending: true })
      .order("drawing_number", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    rows = changes ?? [];
    baseName = `drawing-changes-${scan.project_name || scan.project_id}-${new Date(scan.created_at).toISOString().slice(0, 10)}`;
  } else {
    return NextResponse.json({ error: "scan_id or (company_id + project_id + all=true) required" }, { status: 400 });
  }

  // Apply filter and sort
  rows = filterRows(rows, severityFilter, variationFilter);
  rows = sortRows(rows, sort);

  // ── PDF ─────────────────────────────────────────────────────────────────
  if (format === "pdf") {
    const doc = React.createElement(DrawingChangesPdf, { scan, rows });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buffer = await renderToBuffer(doc as any);

    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${baseName}.pdf"`,
      },
    });
  }

  // ── CSV (default) ───────────────────────────────────────────────────────
  const headers = [
    "Discipline",
    "Drawing Number",
    "Drawing Title",
    "Old Revision",
    "New Revision",
    "Change Type",
    "Severity",
    "Description",
    "Location on Drawing",
    "Variation Risk",
    "Variation Note",
    "Review Status",
  ];

  const csvLines = [headers.join(",")];

  const riskLabel = (r: string | null) =>
    r === "likely_variation" ? "Likely Variation" : r === "unclear" ? "Unclear" : r === "within_scope" ? "Within Scope" : "";
  const statusLabel = (s: string | null) =>
    s === "variation_raised" ? "Variation Raised" : s === "not_a_variation" ? "Not a Variation" : s === "needs_review" ? "Needs Review" : "";

  for (const c of rows) {
    csvLines.push(
      [
        escapeCsv(c.discipline),
        escapeCsv(c.drawing_number),
        escapeCsv(c.drawing_title),
        escapeCsv(c.old_revision),
        escapeCsv(c.new_revision),
        escapeCsv(c.change_type),
        escapeCsv(c.severity),
        escapeCsv(c.description),
        escapeCsv(c.location_on_drawing ?? ""),
        escapeCsv(riskLabel(c.variation_risk)),
        escapeCsv(c.variation_note ?? ""),
        escapeCsv(statusLabel(c.review_status)),
      ].join(",")
    );
  }

  const csv = csvLines.join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${baseName}.csv"`,
    },
  });
}
