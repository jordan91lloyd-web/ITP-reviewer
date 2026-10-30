// ─── /api/admin/users ─────────────────────────────────────────────────────────
// GET  — list admins for the current company
// POST — add a new admin by email
// DELETE — remove an admin by email (cannot remove yourself)
// All operations require the caller to be a company admin.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requirePermission } from "@/lib/route-auth";

interface AdminRow {
  id:         string;
  company_id: string;
  email:      string;
  name:       string | null;
  created_at: string;
  created_by: string | null;
}

const COMPANY_ID = process.env.FLEEK_COMPANY_ID ?? "";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key);
}

// ── GET — list admins ──────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const auth = await requirePermission(request, "admin", "admin");
  if (auth.error) return auth.error;

  const { data, error } = await getSupabase()
    .from("company_admins")
    .select("id, company_id, email, name, created_at, created_by")
    .eq("company_id", COMPANY_ID)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ admins: (data ?? []) as AdminRow[] });
}

// ── POST — add admin ───────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const auth = await requirePermission(request, "admin", "admin");
  if (auth.error) return auth.error;

  let body: { email?: string; name?: string };
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = body.email?.toLowerCase().trim();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  const { error } = await getSupabase()
    .from("company_admins")
    .insert({
      company_id: COMPANY_ID,
      email,
      name:       body.name?.trim() || null,
      created_by: auth.email,
    });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "This email is already an admin." }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// ── DELETE — remove admin ──────────────────────────────────────────────────────

export async function DELETE(request: NextRequest) {
  const auth = await requirePermission(request, "admin", "admin");
  if (auth.error) return auth.error;

  let body: { email?: string };
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = body.email?.toLowerCase().trim();
  if (!email) {
    return NextResponse.json({ error: "email is required." }, { status: 400 });
  }
  if (email === auth.email.toLowerCase()) {
    return NextResponse.json({ error: "You cannot remove yourself as an admin." }, { status: 400 });
  }

  const { error } = await getSupabase()
    .from("company_admins")
    .delete()
    .eq("company_id", COMPANY_ID)
    .eq("email", email);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
