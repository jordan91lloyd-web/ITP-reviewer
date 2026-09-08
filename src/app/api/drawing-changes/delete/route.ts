// POST /api/drawing-changes/delete
// Body: { change_ids: string[] }
// Deletes specific change rows by ID.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  let body: { change_ids: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { change_ids } = body;
  if (!Array.isArray(change_ids) || change_ids.length === 0) {
    return NextResponse.json({ error: "change_ids required" }, { status: 400 });
  }

  if (change_ids.length > 500) {
    return NextResponse.json({ error: "Maximum 500 deletions per request" }, { status: 400 });
  }

  const supabase = getSupabase();

  const { error, count } = await supabase
    .from("drawing_revision_changes")
    .delete()
    .in("id", change_ids);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, deleted: count ?? change_ids.length });
}
