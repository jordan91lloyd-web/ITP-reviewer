// ─── DELETE /api/monitoring/notes/[id] ────────────────────────────────────────
// Deletes a single note. Only allowed if the note belongs to the current user.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { getProcoreUser } from "@/lib/procore";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id } = await params;

  // Delete only if the note belongs to this user
  const { error, count } = await supabase
    .from("project_notes")
    .delete({ count: "exact" })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    console.error("[monitoring/notes DELETE]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (count === 0) {
    return NextResponse.json({ error: "Note not found or not owned by you." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
