// PATCH /api/drawing-changes/status
// Body: { change_ids: string[], status: string }
// Updates the review status of one or more change rows.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const VALID_STATUSES = ["needs_review", "not_a_variation", "variation_raised"];

export async function PATCH(request: NextRequest) {
  let body: { change_ids: string[]; status: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { change_ids, status } = body;
  if (!Array.isArray(change_ids) || change_ids.length === 0) {
    return NextResponse.json({ error: "change_ids required" }, { status: 400 });
  }
  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` }, { status: 400 });
  }

  const supabase = getSupabase();

  const { error } = await supabase
    .from("drawing_revision_changes")
    .update({ review_status: status })
    .in("id", change_ids);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, updated: change_ids.length });
}
