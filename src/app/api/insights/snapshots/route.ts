// ─── GET /api/insights/snapshots?company_id=X ─────────────────────────────────
// Returns all project_financial_snapshots for today for a given company.
// Used by the Insights tab on first load to show cached data without API calls.

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

  const today = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("project_financial_snapshots")
    .select("*")
    .eq("company_id", companyId)
    .eq("snapshot_date", today)
    .order("generated_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message, snapshots: [] }, { status: 500 });
  }

  return NextResponse.json({ snapshots: data ?? [] });
}
