// ─── PATCH /api/monitoring/notes/archive ─────────────────────────────────────
// Archives all notes for a user + project + month_key.
// Returns the most recent note's text (for the "copy forward" option).

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { getProcoreUser } from "@/lib/procore";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  let userId: string;
  try {
    const user = await getProcoreUser(accessToken);
    userId = String(user.id);
  } catch {
    return NextResponse.json({ error: "Failed to resolve user." }, { status: 401 });
  }

  let body: { project_id: string; company_id: string; month_key: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { project_id, company_id, month_key } = body;
  if (!project_id || !company_id || !month_key) {
    return NextResponse.json(
      { error: "project_id, company_id, and month_key are required." },
      { status: 400 }
    );
  }

  // Fetch the latest note text before archiving (for copy-forward option)
  const { data: latestNote } = await supabase
    .from("project_notes")
    .select("note_text")
    .eq("user_id", userId)
    .eq("company_id", company_id)
    .eq("project_id", project_id)
    .eq("month_key", month_key)
    .eq("is_archived", false)
    .order("note_date", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { error } = await supabase
    .from("project_notes")
    .update({ is_archived: true, updated_at: new Date().toISOString() })
    .eq("user_id", userId)
    .eq("company_id", company_id)
    .eq("project_id", project_id)
    .eq("month_key", month_key);

  if (error) {
    console.error("[monitoring/notes/archive]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    last_note_text: latestNote?.note_text ?? null,
  });
}
