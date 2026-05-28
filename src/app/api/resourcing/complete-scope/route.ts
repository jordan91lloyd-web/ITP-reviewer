// ─── POST/DELETE /api/resourcing/complete-scope ───────────────────────────────
// POST   { company_id, project_id, commitment_id }  → mark scope as complete
// DELETE { company_id, project_id, commitment_id }  → unmark scope as complete

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

async function getBody(request: NextRequest) {
  try {
    return await request.json() as {
      company_id?:    string;
      project_id?:    string;
      commitment_id?: string;
    };
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

  const { company_id, project_id, commitment_id } = await getBody(request);
  if (!company_id || !project_id || !commitment_id) {
    return NextResponse.json(
      { error: "company_id, project_id, and commitment_id are required" },
      { status: 400 },
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { error } = await supabase
    .from("resourcing_completed_scopes")
    .upsert(
      { company_id, project_id, commitment_id },
      { onConflict: "company_id,project_id,commitment_id" },
    );

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

  const { company_id, project_id, commitment_id } = await getBody(request);
  if (!company_id || !project_id || !commitment_id) {
    return NextResponse.json(
      { error: "company_id, project_id, and commitment_id are required" },
      { status: 400 },
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { error } = await supabase
    .from("resourcing_completed_scopes")
    .delete()
    .eq("company_id", company_id)
    .eq("project_id", project_id)
    .eq("commitment_id", commitment_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
