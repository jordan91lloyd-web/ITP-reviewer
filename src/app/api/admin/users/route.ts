// ─── /api/admin/users ─────────────────────────────────────────────────────────
// GET  — list admins for the current company
// POST — add a new admin by email
// DELETE — remove an admin by email (cannot remove yourself)
// All operations require the caller to be a company admin.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { getProcoreUser } from "@/lib/procore";
import { isCompanyAdmin } from "@/lib/admin";

interface AdminRow {
  id:         string;
  company_id: string;
  email:      string;
  name:       string | null;
  created_at: string;
  created_by: string | null;
}

async function getCallerAndAssertAdmin(): Promise<
  { ok: true; user: { email: string; name: string }; companyId: string } |
  { ok: false; response: NextResponse }
> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return { ok: false, response: NextResponse.json({ error: "Not authenticated." }, { status: 401 }) };
  }

  const companyId = process.env.FLEEK_COMPANY_ID ?? "";
  let user: { login: string; name: string };
  try {
    user = await getProcoreUser(accessToken);
  } catch {
    return { ok: false, response: NextResponse.json({ error: "Failed to verify identity." }, { status: 401 }) };
  }

  const admin = await isCompanyAdmin(user.login, companyId);
  if (!admin) {
    return { ok: false, response: NextResponse.json({ error: "Access denied." }, { status: 403 }) };
  }

  return { ok: true, user: { email: user.login, name: user.name }, companyId };
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
  return createClient(url, key);
}

// ── GET — list admins ──────────────────────────────────────────────────────────

export async function GET() {
  const auth = await getCallerAndAssertAdmin();
  if (!auth.ok) return auth.response;

  const { data, error } = await getSupabase()
    .from("company_admins")
    .select("id, company_id, email, name, created_at, created_by")
    .eq("company_id", auth.companyId)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ admins: (data ?? []) as AdminRow[] });
}

// ── POST — add admin ───────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const auth = await getCallerAndAssertAdmin();
  if (!auth.ok) return auth.response;

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
      company_id: auth.companyId,
      email,
      name:       body.name?.trim() || null,
      created_by: auth.user.email,
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
  const auth = await getCallerAndAssertAdmin();
  if (!auth.ok) return auth.response;

  let body: { email?: string };
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = body.email?.toLowerCase().trim();
  if (!email) {
    return NextResponse.json({ error: "email is required." }, { status: 400 });
  }
  if (email === auth.user.email.toLowerCase()) {
    return NextResponse.json({ error: "You cannot remove yourself as an admin." }, { status: 400 });
  }

  const { error } = await getSupabase()
    .from("company_admins")
    .delete()
    .eq("company_id", auth.companyId)
    .eq("email", email);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
