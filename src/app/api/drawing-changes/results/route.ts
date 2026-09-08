// GET /api/drawing-changes/results?company_id=X&project_id=Y
// or  /api/drawing-changes/results?scan_id=X
// Returns scan metadata + changes grouped by discipline.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(request: NextRequest) {
  const scanId = request.nextUrl.searchParams.get("scan_id");
  const companyId = request.nextUrl.searchParams.get("company_id");
  const projectId = request.nextUrl.searchParams.get("project_id");

  const supabase = getSupabase();

  // Fetch scan
  let scanQuery = supabase
    .from("drawing_revision_scans")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  if (scanId) {
    scanQuery = supabase
      .from("drawing_revision_scans")
      .select("*")
      .eq("id", scanId)
      .limit(1);
  } else if (companyId && projectId) {
    scanQuery = supabase
      .from("drawing_revision_scans")
      .select("*")
      .eq("company_id", companyId)
      .eq("project_id", projectId)
      .order("created_at", { ascending: false })
      .limit(1);
  } else {
    return NextResponse.json(
      { error: "scan_id or (company_id + project_id) required" },
      { status: 400 }
    );
  }

  const { data: scans, error: scanErr } = await scanQuery;
  if (scanErr) {
    return NextResponse.json({ error: scanErr.message }, { status: 500 });
  }
  if (!scans || scans.length === 0) {
    return NextResponse.json({ scan: null, changes: [], by_discipline: {} });
  }

  const scan = scans[0];

  // Fetch changes for this scan
  const { data: changes, error: changesErr } = await supabase
    .from("drawing_revision_changes")
    .select("*")
    .eq("scan_id", scan.id)
    .order("discipline", { ascending: true })
    .order("drawing_number", { ascending: true })
    .order("created_at", { ascending: true });

  if (changesErr) {
    return NextResponse.json({ error: changesErr.message }, { status: 500 });
  }

  // Group by discipline
  const byDiscipline: Record<string, typeof changes> = {};
  for (const change of changes ?? []) {
    const disc = change.discipline || "Other";
    if (!byDiscipline[disc]) byDiscipline[disc] = [];
    byDiscipline[disc].push(change);
  }

  return NextResponse.json({
    scan,
    changes: changes ?? [],
    by_discipline: byDiscipline,
  });
}
