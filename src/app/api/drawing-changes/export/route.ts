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
  typeCell: { width: 70 },
  descCell: { flex: 1, paddingRight: 8 },
  locCell: { width: 120, fontSize: 8, color: "#78716C" },
  sevCell: { width: 50, textAlign: "right" },
  typePill: { fontSize: 7, fontWeight: "bold", textTransform: "uppercase" },
  sevPill: { fontSize: 7, fontWeight: "bold", textTransform: "uppercase" },
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
        )
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
                )
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
  ];

  const csvLines = [headers.join(",")];

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
