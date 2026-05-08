// ─── GET /api/insights/snapshots?company_id=X ─────────────────────────────────
// Returns the most recent snapshot per project for a given company,
// regardless of date. Used by the Insights tab on mount to show cached data.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

export async function GET(request: NextRequest) {
  const companyId = request.nextUrl.searchParams.get("company_id");
  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  // Fetch all snapshots ordered newest first, then deduplicate by project
  // (DISTINCT ON is not available via the JS client, so we do it in JS).
  const { data, error } = await supabase
    .from("project_financial_snapshots")
    .select("*")
    .eq("company_id", companyId)
    .order("snapshot_date", { ascending: false })
    .order("generated_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message, snapshots: [] }, { status: 500 });
  }

  // Keep only the most recent row per procore_project_id
  const seen    = new Set<string>();
  const latest  = (data ?? []).filter(row => {
    const pid = String(row.procore_project_id);
    if (seen.has(pid)) return false;
    seen.add(pid);
    return true;
  });

  return NextResponse.json({ snapshots: latest });
}
