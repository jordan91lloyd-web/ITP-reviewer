// ─── GET /api/resourcing/project-offsets ─────────────────────────────────────
// Returns all saved stage offsets for a company.
//
// Query params: company_id (required)
// Returns: { [project_id]: current_stage }

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const companyId = request.nextUrl.searchParams.get("company_id");
  if (!companyId) {
    return NextResponse.json({ error: "company_id is required" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data, error } = await supabase
    .from("resourcing_project_offsets")
    .select("project_id, current_stage")
    .eq("company_id", companyId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const result: Record<string, string> = {};
  for (const row of data ?? []) {
    result[row.project_id as string] = row.current_stage as string;
  }

  return NextResponse.json(result);
}
