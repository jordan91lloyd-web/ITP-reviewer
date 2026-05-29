// ─── POST /api/resourcing/project-offset ─────────────────────────────────────
// Upserts the current construction stage for a project.
//
// Body: { company_id, project_id, current_stage }

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: { company_id?: string; project_id?: string; current_stage?: string };
  try {
    body = await request.json() as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { company_id, project_id, current_stage } = body;
  if (!company_id || !project_id || !current_stage) {
    return NextResponse.json(
      { error: "company_id, project_id, and current_stage are required" },
      { status: 400 },
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { error } = await supabase
    .from("resourcing_project_offsets")
    .upsert(
      { company_id, project_id, current_stage, updated_at: new Date().toISOString() },
      { onConflict: "company_id,project_id" },
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
