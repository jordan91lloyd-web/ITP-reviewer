// ─── POST /api/monitoring/session/start ───────────────────────────────────────
// Creates a new project attention session for the current user.
//
// SQL (run once in Supabase):
// CREATE TABLE project_attention_sessions (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   user_id TEXT NOT NULL,
//   company_id TEXT NOT NULL,
//   project_id TEXT NOT NULL,
//   project_name TEXT NOT NULL,
//   started_at TIMESTAMPTZ NOT NULL,
//   ended_at TIMESTAMPTZ,
//   active_seconds INTEGER DEFAULT 0,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
// CREATE INDEX ON project_attention_sessions(user_id, project_id);
// CREATE INDEX ON project_attention_sessions(user_id, company_id);

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { getProcoreUser } from "@/lib/procore";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
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

  let body: { project_id: string; project_name: string; company_id: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { project_id, project_name, company_id } = body;
  if (!project_id || !project_name || !company_id) {
    return NextResponse.json(
      { error: "project_id, project_name, and company_id are required." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("project_attention_sessions")
    .insert({
      user_id:        userId,
      company_id,
      project_id,
      project_name,
      started_at:     new Date().toISOString(),
      active_seconds: 0,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[monitoring/session/start]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ session_id: data.id });
}
