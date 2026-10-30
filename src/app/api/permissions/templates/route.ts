// ─── /api/permissions/templates ──────────────────────────────────────────────
// GET  — list all templates
// POST — create or update a template
// DELETE — delete a template
//
// CREATE TABLE saas_permission_templates (
//   id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
//   company_id   text NOT NULL,
//   name         text NOT NULL,
//   description  text,
//   permissions  jsonb NOT NULL,  -- { module_key: access_level }
//   created_by   text,
//   created_at   timestamptz NOT NULL DEFAULT now(),
//   updated_at   timestamptz NOT NULL DEFAULT now(),
//   UNIQUE(company_id, name)
// );
// ALTER TABLE saas_permission_templates ENABLE ROW LEVEL SECURITY;

import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/route-auth";
import { createClient } from "@supabase/supabase-js";
import { MODULES, ACCESS_LEVELS, type AccessLevel } from "@/lib/permissions";

const COMPANY_ID = process.env.FLEEK_COMPANY_ID ?? "";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function GET(request: NextRequest) {
  const auth = await requirePermission(request, "permissions", "admin");
  if (auth.error) return auth.error;

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("saas_permission_templates")
    .select("*")
    .eq("company_id", COMPANY_ID)
    .order("name");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ templates: data ?? [] });
}

export async function POST(request: NextRequest) {
  const auth = await requirePermission(request, "permissions", "admin");
  if (auth.error) return auth.error;

  let body: { name: string; description?: string; permissions: Record<string, string> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, description, permissions } = body;
  if (!name || !permissions) {
    return NextResponse.json({ error: "name and permissions required" }, { status: 400 });
  }

  // Validate permissions
  const cleaned: Record<string, string> = {};
  for (const m of MODULES) {
    const level = permissions[m.key];
    if (level && ACCESS_LEVELS.includes(level as AccessLevel)) {
      cleaned[m.key] = level;
    } else {
      cleaned[m.key] = "none";
    }
  }

  const supabase = getSupabase();
  const { error } = await supabase
    .from("saas_permission_templates")
    .upsert(
      {
        company_id: COMPANY_ID,
        name: name.trim(),
        description: description?.trim() ?? null,
        permissions: cleaned,
        created_by: auth.email,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "company_id,name" },
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const auth = await requirePermission(request, "permissions", "admin");
  if (auth.error) return auth.error;

  const name = request.nextUrl.searchParams.get("name");
  if (!name) {
    return NextResponse.json({ error: "name query param required" }, { status: 400 });
  }

  const supabase = getSupabase();
  await supabase
    .from("saas_permission_templates")
    .delete()
    .eq("company_id", COMPANY_ID)
    .eq("name", name);

  return NextResponse.json({ success: true });
}
