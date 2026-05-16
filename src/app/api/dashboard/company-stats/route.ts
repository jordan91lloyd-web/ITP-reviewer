// ─── GET /api/dashboard/company-stats?company_id=X&date_from=Y&date_to=Z ────────
// Returns per-project review stats aggregated from Supabase review_records.
// Used by the Company overview tab in the dashboard.
//
// Query params:
//   company_id   (required)
//   date_from    YYYY-MM-DD (optional — filters reviewed_at >= date_from)
//   date_to      YYYY-MM-DD (optional — filters reviewed_at <= date_to)
//
// Returns:
//   { stats: [{ procore_project_id, review_count, avg_score, last_reviewed_at, last_closed_by }] }

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  const sp        = request.nextUrl.searchParams;
  const companyId = sp.get("company_id");
  const dateFrom  = sp.get("date_from");
  const dateTo    = sp.get("date_to");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required" }, { status: 400 });
  }

  try {
    let query = supabase
      .from("review_records")
      .select("procore_project_id, score, reviewed_at")
      .eq("company_id", companyId)
      .not("procore_project_id", "is", null);

    if (dateFrom) query = query.gte("reviewed_at", dateFrom);
    if (dateTo)   query = query.lte("reviewed_at", dateTo + "T23:59:59");

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    // Aggregate in JS — Supabase JS client doesn't expose GROUP BY directly
    const map = new Map<number, { scores: number[]; lastReviewedAt: string }>();

    for (const r of data ?? []) {
      const pid = r.procore_project_id as number;
      if (!map.has(pid)) map.set(pid, { scores: [], lastReviewedAt: r.reviewed_at as string });
      const entry = map.get(pid)!;
      if (typeof r.score === "number") entry.scores.push(r.score);
      if ((r.reviewed_at as string) > entry.lastReviewedAt) entry.lastReviewedAt = r.reviewed_at as string;
    }

    const stats = Array.from(map.entries()).map(([pid, entry]) => ({
      procore_project_id: pid,
      review_count:       entry.scores.length,
      avg_score:          entry.scores.length > 0
        ? Math.round(entry.scores.reduce((s, v) => s + v, 0) / entry.scores.length)
        : null,
      last_reviewed_at:   entry.lastReviewedAt,
      last_closed_by:     null,  // not stored in review_records; sourced from Procore inspection data
    }));

    return NextResponse.json({ stats });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error", stats: [] },
      { status: 500 }
    );
  }
}
