// DELETE /api/drawing-changes/clear?company_id=X&project_id=Y
// Deletes all scan records and changes for a project.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function DELETE(request: NextRequest) {
  const companyId = request.nextUrl.searchParams.get("company_id");
  const projectId = request.nextUrl.searchParams.get("project_id");

  if (!companyId || !projectId) {
    return NextResponse.json({ error: "company_id and project_id required" }, { status: 400 });
  }

  const supabase = getSupabase();

  // Changes cascade-delete via FK, but delete explicitly for clarity
  const { error: changesErr } = await supabase
    .from("drawing_revision_changes")
    .delete()
    .eq("company_id", companyId)
    .eq("project_id", projectId);

  if (changesErr) {
    return NextResponse.json({ error: changesErr.message }, { status: 500 });
  }

  const { error: scansErr } = await supabase
    .from("drawing_revision_scans")
    .delete()
    .eq("company_id", companyId)
    .eq("project_id", projectId);

  if (scansErr) {
    return NextResponse.json({ error: scansErr.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
