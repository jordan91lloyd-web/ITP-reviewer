// ─── POST /api/monitoring/session/end ────────────────────────────────────────
// Final update when the user navigates away from a project.
// Sessions with active_seconds < 120 are excluded from attention queries.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  if (!cookieStore.get("procore_access_token")?.value) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  let body: { session_id: string; active_seconds: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { session_id, active_seconds } = body;
  if (!session_id || active_seconds == null) {
    return NextResponse.json({ error: "session_id and active_seconds are required." }, { status: 400 });
  }

  const { error } = await supabase
    .from("project_attention_sessions")
    .update({
      active_seconds,
      ended_at: new Date().toISOString(),
    })
    .eq("id", session_id);

  if (error) {
    console.error("[monitoring/session/end]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
