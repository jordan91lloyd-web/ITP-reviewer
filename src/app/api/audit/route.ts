// ─── GET /api/audit ───────────────────────────────────────────────────────────
// Returns paginated audit log entries for a company.
//
// Query params:
//   company_id  — required
//   action      — optional filter e.g. "review_run"
//   from        — optional ISO date string (inclusive)
//   to          — optional ISO date string (inclusive, treated as end-of-day)
//   page        — 1-based page number (default 1)
//   limit       — rows per page (default 50, max 100)

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

  const sp         = request.nextUrl.searchParams;
  const company_id = sp.get("company_id");
  if (!company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const action   = sp.get("action")  ?? null;
  const from     = sp.get("from")    ?? null;
  const to       = sp.get("to")      ?? null;
  const page     = Math.max(1, parseInt(sp.get("page")  ?? "1",  10));
  const limit    = Math.min(100, Math.max(1, parseInt(sp.get("limit") ?? "50", 10)));
  const offset   = (page - 1) * limit;

  let query = supabase
    .from("audit_log")
    .select("*", { count: "exact" })
    .eq("company_id", company_id)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (action) query = query.eq("action", action);
  if (from)   query = query.gte("created_at", from);
  if (to) {
    // Treat "to" as end-of-day by appending T23:59:59Z if no time component
    const toEnd = to.includes("T") ? to : `${to}T23:59:59Z`;
    query = query.lte("created_at", toEnd);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("[audit/route] Supabase error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const total       = count ?? 0;
  const total_pages = Math.max(1, Math.ceil(total / limit));

  return NextResponse.json({
    events:      data ?? [],
    total,
    page,
    limit,
    total_pages,
  });
}
