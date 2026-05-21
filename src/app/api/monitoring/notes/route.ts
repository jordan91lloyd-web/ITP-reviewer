// ─── /api/monitoring/notes ────────────────────────────────────────────────────
// GET  ?project_id=X&company_id=Y  — fetch notes grouped by month
// POST                              — create a new note
//
// SQL (run once in Supabase):
// CREATE TABLE project_notes (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   user_id TEXT NOT NULL,
//   company_id TEXT NOT NULL,
//   project_id TEXT NOT NULL,
//   project_name TEXT NOT NULL,
//   note_text TEXT NOT NULL,
//   note_date TIMESTAMPTZ DEFAULT NOW(),
//   month_key TEXT NOT NULL,
//   is_archived BOOLEAN DEFAULT FALSE,
//   created_at TIMESTAMPTZ DEFAULT NOW(),
//   updated_at TIMESTAMPTZ DEFAULT NOW()
// );
// CREATE INDEX ON project_notes(user_id, project_id, month_key);

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { getProcoreUser } from "@/lib/procore";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function resolveUser(accessToken: string) {
  const user = await getProcoreUser(accessToken);
  return { userId: String(user.id), userName: user.name };
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const sp        = request.nextUrl.searchParams;
  const projectId = sp.get("project_id");
  const companyId = sp.get("company_id");

  if (!projectId || !companyId) {
    return NextResponse.json({ error: "project_id and company_id are required." }, { status: 400 });
  }

  let userId: string;
  try {
    ({ userId } = await resolveUser(accessToken));
  } catch {
    return NextResponse.json({ error: "Failed to resolve user." }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("project_notes")
    .select("id, note_text, note_date, month_key, is_archived, created_at")
    .eq("user_id", userId)
    .eq("company_id", companyId)
    .eq("project_id", projectId)
    .order("note_date", { ascending: false });

  if (error) {
    console.error("[monitoring/notes GET]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Group by month_key
  const monthMap = new Map<string, typeof data>();
  for (const note of data ?? []) {
    const mk = note.month_key as string;
    if (!monthMap.has(mk)) monthMap.set(mk, []);
    monthMap.get(mk)!.push(note);
  }

  // Sort month keys newest first
  const months = Array.from(monthMap.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([month_key, notes]) => ({ month_key, notes }));

  return NextResponse.json({ months });
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  let userId: string;
  try {
    ({ userId } = await resolveUser(accessToken));
  } catch {
    return NextResponse.json({ error: "Failed to resolve user." }, { status: 401 });
  }

  let body: {
    project_id: string;
    project_name: string;
    company_id: string;
    note_text: string;
    month_key: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { project_id, project_name, company_id, note_text, month_key } = body;
  if (!project_id || !project_name || !company_id || !note_text || !month_key) {
    return NextResponse.json(
      { error: "project_id, project_name, company_id, note_text, and month_key are required." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("project_notes")
    .insert({
      user_id:      userId,
      company_id,
      project_id,
      project_name,
      note_text,
      note_date:    new Date().toISOString(),
      month_key,
      is_archived:  false,
    })
    .select("id, note_text, note_date, month_key, is_archived, created_at")
    .single();

  if (error) {
    console.error("[monitoring/notes POST]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ note: data }, { status: 201 });
}
