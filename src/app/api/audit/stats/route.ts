// ─── GET /api/audit/stats?company_id=X&project_id=Y ──────────────────────────
// Returns summary statistics for a company (optionally scoped to a project):
//   total_reviews    — count of review_run actions
//   total_overrides  — count of score_override actions
//   last_activity    — ISO timestamp of the most recent event
//   most_active_user — user_name with the most events

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
  const project_id = sp.get("project_id") ?? null;

  if (!company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  // Base filter builder — starts after .select() so .eq() is available
  function base(cols = "*") {
    let q = supabase.from("audit_log").select(cols).eq("company_id", company_id!);
    if (project_id) q = q.eq("project_id", project_id);
    return q;
  }

  function baseCount(action: string) {
    let q = supabase.from("audit_log").select("*", { count: "exact", head: true })
      .eq("company_id", company_id!).eq("action", action);
    if (project_id) q = q.eq("project_id", project_id);
    return q;
  }

  const [reviewRes, overrideRes, lastRes, usersRes] = await Promise.all([
    // Count review_run
    baseCount("review_run"),
    // Count score_override
    baseCount("score_override"),
    // Most recent event
    base("created_at").order("created_at", { ascending: false }).limit(1),
    // All user_names to compute most active
    base("user_name").limit(10000),
  ]);

  // Most active user
  const userCounts: Record<string, number> = {};
  for (const row of (usersRes.data ?? []) as unknown as { user_name: string }[]) {
    userCounts[row.user_name] = (userCounts[row.user_name] ?? 0) + 1;
  }
  const mostActiveUser =
    Object.entries(userCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ?? null;

  const lastRow = ((lastRes.data ?? []) as unknown as { created_at: string }[])[0];

  return NextResponse.json({
    total_reviews:    reviewRes.count   ?? 0,
    total_overrides:  overrideRes.count ?? 0,
    last_activity:    lastRow?.created_at ?? null,
    most_active_user: mostActiveUser,
  });
}
