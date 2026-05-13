// ─── GET /api/dashboard/recent-activity?company_id=X ─────────────────────────
// Returns up to 10 recent activity events across all projects for a company,
// sourced from the audit_log and review_records tables.
// Read-only — never writes to audit_log.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Service role client — needed to read audit_log without RLS restrictions
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface RecentActivityEvent {
  id: string;
  type: "review_run" | "score_override" | "bulk_review_completed" | "new_review";
  label: string;
  project_name?: string;
  inspection_name?: string;
  user_name?: string;
  created_at: string;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const sp        = request.nextUrl.searchParams;
  const companyId = sp.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required" }, { status: 400 });
  }

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  try {
    // ── 1. Query audit_log ──────────────────────────────────────────────────
    const { data: auditRows, error: auditError } = await supabase
      .from("audit_log")
      .select("id, action, entity_name, project_name, user_name, details, created_at")
      .eq("company_id", companyId)
      .in("action", ["review_run", "score_override", "bulk_review_completed"])
      .gte("created_at", sevenDaysAgo)
      .order("created_at", { ascending: false })
      .limit(20);

    if (auditError) {
      console.error("[recent-activity] audit_log query error:", auditError.message);
    }

    // ── 2. Query review_records (new reviews in last 7 days) ───────────────
    const { data: reviewRows, error: reviewError } = await supabase
      .from("review_records")
      .select("id, inspection_name, procore_project_id, created_at")
      .eq("company_id", companyId)
      .gte("created_at", sevenDaysAgo)
      .order("created_at", { ascending: false })
      .limit(20);

    if (reviewError) {
      console.error("[recent-activity] review_records query error:", reviewError.message);
    }

    // ── 3. Build events from audit rows ────────────────────────────────────
    const events: RecentActivityEvent[] = [];

    for (const row of auditRows ?? []) {
      const action = row.action as string;
      const details = row.details as Record<string, unknown> | null;

      if (action === "review_run") {
        events.push({
          id:              String(row.id),
          type:            "review_run",
          label:           `Reviewed: ${row.entity_name ?? "ITP"}`,
          project_name:    row.project_name ?? undefined,
          inspection_name: row.entity_name ?? undefined,
          user_name:       row.user_name ?? undefined,
          created_at:      row.created_at,
        });
      } else if (action === "score_override") {
        events.push({
          id:              String(row.id),
          type:            "score_override",
          label:           `Override set: ${row.entity_name ?? "ITP"}`,
          project_name:    row.project_name ?? undefined,
          inspection_name: row.entity_name ?? undefined,
          user_name:       row.user_name ?? undefined,
          created_at:      row.created_at,
        });
      } else if (action === "bulk_review_completed") {
        const count = typeof details?.completed === "number" ? details.completed : null;
        events.push({
          id:           String(row.id),
          type:         "bulk_review_completed",
          label:        count !== null ? `Bulk review: ${count} ITPs` : "Bulk review completed",
          project_name: row.project_name ?? undefined,
          user_name:    row.user_name ?? undefined,
          created_at:   row.created_at,
        });
      }
    }

    // ── 4. Build events from review_records (new scores) ──────────────────
    // Deduplicate against audit review_run events by inspection_name + date proximity
    const auditInspectionNames = new Set(
      (auditRows ?? [])
        .filter(r => r.action === "review_run")
        .map(r => r.entity_name as string)
    );

    for (const row of reviewRows ?? []) {
      // Skip if already represented by an audit review_run event for same inspection
      if (row.inspection_name && auditInspectionNames.has(row.inspection_name)) continue;

      events.push({
        id:              `rr-${String(row.id)}`,
        type:            "new_review",
        label:           `New ITP scored: ${row.inspection_name ?? "ITP"}`,
        inspection_name: row.inspection_name ?? undefined,
        created_at:      row.created_at,
      });
    }

    // ── 5. Sort by created_at DESC, return top 10 ─────────────────────────
    events.sort((a, b) => b.created_at.localeCompare(a.created_at));
    const top10 = events.slice(0, 10);

    return NextResponse.json({ events: top10 });
  } catch (err) {
    console.error("[recent-activity] Unexpected error:", err instanceof Error ? err.message : String(err));
    return NextResponse.json({ events: [] });
  }
}
