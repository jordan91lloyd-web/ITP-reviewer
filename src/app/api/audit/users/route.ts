// ─── GET /api/audit/users?company_id=X ───────────────────────────────────────
// Returns distinct (user_id, user_name) pairs recorded in the audit log for
// a company. Used to populate the user filter dropdown on the audit log page.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  if (!cookieStore.get("procore_access_token")?.value) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const company_id = request.nextUrl.searchParams.get("company_id");
  if (!company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("audit_log")
    .select("user_id, user_name")
    .eq("company_id", company_id)
    .limit(5000);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Deduplicate by user_id, sort by name
  const seen  = new Set<string>();
  const users = (data ?? [])
    .filter(u => { if (seen.has(u.user_id)) return false; seen.add(u.user_id); return true; })
    .sort((a, b) => a.user_name.localeCompare(b.user_name));

  return NextResponse.json({ users });
}
