// ─── /api/dashboard/projects/hide ─────────────────────────────────────────────
// Manages project visibility in the dashboard sidebar.
//
// POST   { company_id, project_id, project_name? } — hide a project
// DELETE { company_id, project_id }                — unhide a project
// GET    ?company_id=X                             — list hidden project_ids

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { resolveAuditUser, logAuditEvent, AUDIT_ACTIONS } from "@/lib/audit";

function getServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("procore_access_token")?.value;
}

// ── GET — list hidden project_ids for a company ────────────────────────────────

export async function GET(request: NextRequest) {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const companyId = request.nextUrl.searchParams.get("company_id");
  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  if (!supabase) {
    // Supabase not configured — return empty (all projects visible)
    return NextResponse.json({ hidden_project_ids: [] });
  }

  const { data, error } = await supabase
    .from("hidden_projects")
    .select("project_id")
    .eq("company_id", companyId);

  if (error) {
    console.error("[projects/hide] GET error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    hidden_project_ids: (data ?? []).map(r => r.project_id as string),
  });
}

// ── POST — hide a project ──────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  let body: { company_id: string; project_id: string; project_name?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { company_id, project_id, project_name } = body;
  if (!company_id || !project_id) {
    return NextResponse.json({ error: "company_id and project_id are required." }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured." }, { status: 503 });
  }

  const auditUser = await resolveAuditUser(accessToken);

  const { error } = await supabase
    .from("hidden_projects")
    .upsert(
      { company_id, project_id, hidden_by: auditUser.user_email || auditUser.user_name },
      { onConflict: "company_id,project_id" }
    );

  if (error) {
    console.error("[projects/hide] POST error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  void logAuditEvent({
    ...auditUser,
    company_id,
    action: AUDIT_ACTIONS.PROJECT_HIDDEN,
    entity_type: "project",
    entity_id:   project_id,
    entity_name: project_name,
  });

  return NextResponse.json({ success: true });
}

// ── DELETE — unhide a project ──────────────────────────────────────────────────

export async function DELETE(request: NextRequest) {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  let body: { company_id: string; project_id: string; project_name?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { company_id, project_id, project_name } = body;
  if (!company_id || !project_id) {
    return NextResponse.json({ error: "company_id and project_id are required." }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured." }, { status: 503 });
  }

  const auditUser = await resolveAuditUser(accessToken);

  const { error } = await supabase
    .from("hidden_projects")
    .delete()
    .eq("company_id", company_id)
    .eq("project_id", project_id);

  if (error) {
    console.error("[projects/hide] DELETE error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  void logAuditEvent({
    ...auditUser,
    company_id,
    action: AUDIT_ACTIONS.PROJECT_UNHIDDEN,
    entity_type: "project",
    entity_id:   project_id,
    entity_name: project_name,
  });

  return NextResponse.json({ success: true });
}
