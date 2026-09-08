// POST /api/drawing-changes/dedup?company_id=X&project_id=Y
// For each drawing+revision pair, keeps only the latest scan's results
// and deletes older duplicates.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  const companyId = request.nextUrl.searchParams.get("company_id");
  const projectId = request.nextUrl.searchParams.get("project_id");

  if (!companyId || !projectId) {
    return NextResponse.json({ error: "company_id and project_id required" }, { status: 400 });
  }

  const supabase = getSupabase();

  // Fetch all changes for this project
  const { data: allChanges, error } = await supabase
    .from("drawing_revision_changes")
    .select("id, drawing_number, old_revision, new_revision, scan_id, created_at")
    .eq("company_id", companyId)
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!allChanges || allChanges.length === 0) {
    return NextResponse.json({ success: true, removed: 0 });
  }

  // Group by drawing+revision pair, find the latest scan_id for each
  const groups = new Map<string, { latestScanId: string; ids: string[] }>();

  for (const c of allChanges) {
    const key = `${c.drawing_number}|${c.old_revision}|${c.new_revision}`;
    let group = groups.get(key);
    if (!group) {
      // First entry is the latest (ordered desc by created_at)
      group = { latestScanId: c.scan_id, ids: [] };
      groups.set(key, group);
    }
    // If this change is from a different (older) scan, mark for deletion
    if (c.scan_id !== group.latestScanId) {
      group.ids.push(c.id);
    }
  }

  const toDelete = [...groups.values()].flatMap((g) => g.ids);

  if (toDelete.length === 0) {
    return NextResponse.json({ success: true, removed: 0 });
  }

  // Delete in batches of 500
  let removed = 0;
  for (let i = 0; i < toDelete.length; i += 500) {
    const batch = toDelete.slice(i, i + 500);
    const { error: delErr } = await supabase
      .from("drawing_revision_changes")
      .delete()
      .in("id", batch);
    if (!delErr) removed += batch.length;
  }

  return NextResponse.json({ success: true, removed });
}
