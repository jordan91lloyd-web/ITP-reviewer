// ─── POST/DELETE /api/resourcing/hide-project ─────────────────────────────────
// POST   { company_id, project_id }  → hide project from resourcing matrix
// DELETE { company_id, project_id }  → unhide project

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

async function getBody(request: NextRequest) {
  try {
    return await request.json() as { company_id?: string; project_id?: string };
  } catch {
    return {};
  }
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { company_id, project_id } = await getBody(request);
  if (!company_id || !project_id) {
    return NextResponse.json({ error: "company_id and project_id are required" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { error } = await supabase
    .from("resourcing_hidden_projects")
    .upsert({ company_id, project_id }, { onConflict: "company_id,project_id" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { company_id, project_id } = await getBody(request);
  if (!company_id || !project_id) {
    return NextResponse.json({ error: "company_id and project_id are required" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { error } = await supabase
    .from("resourcing_hidden_projects")
    .delete()
    .eq("company_id", company_id)
    .eq("project_id", project_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
