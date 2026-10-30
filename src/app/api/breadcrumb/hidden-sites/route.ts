// GET  /api/breadcrumb/hidden-sites?company_id=X  → array of hidden site_references
// POST   { company_id, site_reference }            → hide a site
// DELETE { company_id, site_reference }            → show a site

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
  const auth = await requirePermission(request, "company", "view");
  if (auth.error) return auth.error;

  const companyId = request.nextUrl.searchParams.get("company_id");
  if (!companyId) {
    return NextResponse.json({ error: "company_id required" }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("compliance_hidden_sites")
    .select("site_reference")
    .eq("company_id", companyId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    hidden: (data ?? []).map((r: { site_reference: string }) => r.site_reference),
  });
}

export async function POST(request: NextRequest) {
  const authPost = await requirePermission(request, "company", "view");
  if (authPost.error) return authPost.error;

  let body: { company_id?: string; site_reference?: string };
  try {
    body = await request.json() as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { company_id, site_reference } = body;
  if (!company_id || !site_reference) {
    return NextResponse.json({ error: "company_id and site_reference required" }, { status: 400 });
  }

  const supabase = getSupabase();
  const { error } = await supabase
    .from("compliance_hidden_sites")
    .upsert({ company_id, site_reference }, { onConflict: "company_id,site_reference" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const authDel = await requirePermission(request, "company", "view");
  if (authDel.error) return authDel.error;

  let body: { company_id?: string; site_reference?: string };
  try {
    body = await request.json() as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { company_id, site_reference } = body;
  if (!company_id || !site_reference) {
    return NextResponse.json({ error: "company_id and site_reference required" }, { status: 400 });
  }

  const supabase = getSupabase();
  const { error } = await supabase
    .from("compliance_hidden_sites")
    .delete()
    .eq("company_id", company_id)
    .eq("site_reference", site_reference);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
