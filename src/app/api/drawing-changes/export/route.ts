// GET /api/drawing-changes/export?scan_id=X&format=csv
// Exports scan results as CSV.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

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

export async function GET(request: NextRequest) {
  const scanId = request.nextUrl.searchParams.get("scan_id");
  if (!scanId) {
    return NextResponse.json({ error: "scan_id required" }, { status: 400 });
  }

  const supabase = getSupabase();

  // Fetch scan metadata
  const { data: scan } = await supabase
    .from("drawing_revision_scans")
    .select("*")
    .eq("id", scanId)
    .single();

  if (!scan) {
    return NextResponse.json({ error: "Scan not found" }, { status: 404 });
  }

  // Fetch changes
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

  const rows = changes ?? [];

  // Build CSV
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
  const filename = `drawing-changes-${scan.project_name || scan.project_id}-${new Date(scan.created_at).toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
