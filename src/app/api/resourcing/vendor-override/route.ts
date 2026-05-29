// ─── /api/resourcing/vendor-override ──────────────────────────────────────────
// GET  ?company_id=X  → returns all vendor overrides for the company
// POST { company_id, vendor_name, project_id, override_stage, original_stage }
//       → upserts a vendor stage override

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

async function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

async function requireAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("procore_access_token")?.value ?? null;
}

// ── GET ────────────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  if (!await requireAuth()) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const companyId = request.nextUrl.searchParams.get("company_id");
  if (!companyId) {
    return NextResponse.json({ error: "company_id is required" }, { status: 400 });
  }

  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("resourcing_vendor_overrides")
    .select("vendor_name, project_id, override_stage, original_stage")
    .eq("company_id", companyId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ overrides: data ?? [] });
}

// ── POST ───────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  if (!await requireAuth()) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: {
    company_id?:     string;
    vendor_name?:    string;
    project_id?:     string;
    override_stage?: string;
    original_stage?: string;
  };
  try {
    body = await request.json() as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { company_id, vendor_name, project_id, override_stage, original_stage } = body;
  if (!company_id || !vendor_name || !project_id || !override_stage) {
    return NextResponse.json(
      { error: "company_id, vendor_name, project_id, and override_stage are required" },
      { status: 400 },
    );
  }

  const supabase = await getSupabase();
  const { error } = await supabase
    .from("resourcing_vendor_overrides")
    .upsert(
      { company_id, vendor_name, project_id, override_stage, original_stage: original_stage ?? null },
      { onConflict: "company_id,vendor_name,project_id" },
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
