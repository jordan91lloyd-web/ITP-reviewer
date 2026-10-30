// ─── /api/dashboard/site-mappings ─────────────────────────────────────────────
// GET  ?company_id=X   — list all Breadcrumb→Procore site mappings for a company
// POST               — upsert a mapping (admin only)
//
// Requires the breadcrumb_site_mappings table (see site-diaries/route.ts for DDL).

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requirePermission } from "@/lib/route-auth";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── GET ────────────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const auth = await requirePermission(request, "company", "view");
  if (auth.error) return auth.error;

  const companyId = request.nextUrl.searchParams.get("company_id");
  if (!companyId) {
    return NextResponse.json({ error: "company_id is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("breadcrumb_site_mappings")
    .select("*")
    .eq("company_id", companyId)
    .order("breadcrumb_site_name");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ mappings: data ?? [] });
}

// ── POST ───────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const authPost = await requirePermission(request, "company", "edit");
  if (authPost.error) return authPost.error;

  let body: { company_id?: string; breadcrumb_site_name?: string; procore_project_id?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { company_id, breadcrumb_site_name, procore_project_id } = body;
  if (!company_id || !breadcrumb_site_name || !procore_project_id) {
    return NextResponse.json(
      { error: "company_id, breadcrumb_site_name, and procore_project_id are required" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("breadcrumb_site_mappings")
    .upsert(
      { company_id, breadcrumb_site_name, procore_project_id },
      { onConflict: "company_id,breadcrumb_site_name" }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
