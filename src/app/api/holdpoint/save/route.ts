// GET  /api/holdpoint/save?company_id=X&project_id=Y  → return saved register
// POST /api/holdpoint/save                             → upsert hold_points array

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requirePermission } from "@/lib/route-auth";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function GET(request: NextRequest) {
  const auth = await requirePermission(request, "hold_points", "view");
  if (auth.error) return auth.error;

  const companyId = request.nextUrl.searchParams.get("company_id");
  const projectId = request.nextUrl.searchParams.get("project_id");
  if (!companyId || !projectId) {
    return NextResponse.json({ error: "company_id and project_id required" }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("holdpoint_registers")
    .select("hold_points, project_name, generated_at")
    .eq("company_id", companyId)
    .eq("project_id", projectId)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data)  return NextResponse.json({ register: null });

  return NextResponse.json({
    register: {
      hold_points:  data.hold_points ?? [],
      project_name: data.project_name,
      generated_at: data.generated_at,
    },
  });
}

export async function POST(request: NextRequest) {
  const authPost = await requirePermission(request, "hold_points", "edit");
  if (authPost.error) return authPost.error;

  let body: {
    company_id?:   string;
    project_id?:   string;
    project_name?: string;
    hold_points?:  unknown[];
  };
  try {
    body = await request.json() as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { company_id, project_id, project_name, hold_points } = body;
  if (!company_id || !project_id || !project_name || !hold_points) {
    return NextResponse.json(
      { error: "company_id, project_id, project_name, hold_points required" },
      { status: 400 },
    );
  }

  const supabase = getSupabase();
  const { error } = await supabase
    .from("holdpoint_registers")
    .upsert(
      { company_id, project_id, project_name, hold_points },
      { onConflict: "company_id,project_id" },
    );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
