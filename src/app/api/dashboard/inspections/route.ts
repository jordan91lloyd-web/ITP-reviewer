// ─── GET /api/dashboard/inspections?project_id=X&company_id=Y ────────────────
// Returns all ITP-named inspections for a Procore project (both open and closed),
// merged with the latest review record from Supabase and any score override.
//
// Each inspection in the response includes:
//   review_status       — "not_reviewed" | "reviewed" | "changed"
//   last_score/band     — from the latest review record
//   review_data         — full ReviewResult JSON for the side panel
//   override_score/note — from the latest score_override for that record

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getInspections, type ProcoreInspection } from "@/lib/procore";
import { createClient } from "@supabase/supabase-js";
import type { ReviewResult } from "@/lib/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export interface DashboardInspection {
  // From Procore
  id: number;
  name: string;
  status: string;
  closed_at: string | null;
  updated_at: string | null;
  closed_by: string | null;   // name of the person who closed the inspection
  assignee: string | null;    // first assignee name (for open/in-review ITPs)
  // From review_records (latest)
  review_status: "not_reviewed" | "reviewed" | "changed";
  review_record_id: string | null;
  last_score: number | null;
  last_score_band: string | null;
  last_package_assessment: string | null;
  last_reviewed_at: string | null;
  inspection_number_of_type: number | null;
  review_data: ReviewResult | null;
  // From score_overrides (latest for this record)
  override_score: number | null;
  override_note: string | null;
  override_created_by: string | null;
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated with Procore." }, { status: 401 });
  }

  const projectIdParam = request.nextUrl.searchParams.get("project_id");
  const companyIdParam = request.nextUrl.searchParams.get("company_id");
  if (!projectIdParam || isNaN(Number(projectIdParam))) {
    return NextResponse.json({ error: "project_id is required." }, { status: 400 });
  }
  if (!companyIdParam || isNaN(Number(companyIdParam))) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }
  const projectId = Number(projectIdParam);
  const companyId = Number(companyIdParam);

  // Fetch all inspections from Procore (both open and closed)
  let allInspections;
  try {
    allInspections = await getInspections(accessToken, projectId, companyId);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 502 });
  }

  // Filter to ITP-named only (both statuses)
  const itpInspections = allInspections.filter(
    insp => insp.name?.trim().toLowerCase().startsWith("itp")
  );

  // Fetch all review records for this project + company (latest first)
  const { data: allRecords } = await supabase
    .from("review_records")
    .select("*")
    .eq("company_id", String(companyId))
    .eq("procore_project_id", projectId)
    .order("reviewed_at", { ascending: false });

  // Group records by inspection_id — first entry is latest
  const latestByInspection = new Map<number, Record<string, unknown>>();
  for (const r of allRecords ?? []) {
    const iid = r.procore_inspection_id as number;
    if (!latestByInspection.has(iid)) {
      latestByInspection.set(iid, r as Record<string, unknown>);
    }
  }

  // Fetch score_overrides for all those record IDs
  const latestRecordIds = Array.from(latestByInspection.values()).map(r => r.id as string);
  const overrideByRecordId = new Map<string, Record<string, unknown>>();

  if (latestRecordIds.length > 0) {
    const { data: overrides } = await supabase
      .from("score_overrides")
      .select("*")
      .in("review_record_id", latestRecordIds)
      .order("created_at", { ascending: false });

    for (const o of overrides ?? []) {
      const rid = o.review_record_id as string;
      if (!overrideByRecordId.has(rid)) {
        overrideByRecordId.set(rid, o as Record<string, unknown>);
      }
    }
  }

  // Build the merged response
  const result: DashboardInspection[] = itpInspections.map(insp => {
    const record = latestByInspection.get(insp.id);
    const recordId = record?.id as string | undefined;
    const override = recordId ? overrideByRecordId.get(recordId) : undefined;

    let review_status: DashboardInspection["review_status"] = "not_reviewed";
    if (record) {
      const inspUpdated = insp.updated_at ? new Date(insp.updated_at).getTime() : 0;
      const reviewedAt  = new Date(record.reviewed_at as string).getTime();
      review_status = inspUpdated > reviewedAt ? "changed" : "reviewed";
    }

    return {
      id:             insp.id,
      name:           insp.name,
      status:         insp.status,
      closed_at:      insp.closed_at  ?? null,
      updated_at:     insp.updated_at ?? null,
      closed_by:      insp.closed_by?.name ?? null,
      // Procore's list endpoint doesn't always return `assignees` — try
      // every field name Procore uses across API versions and tenants.
      assignee:
        insp.assignees?.[0]?.name ??
        insp.responsible_party?.name ??
        insp.responsible_contractor?.name ??
        insp.point_of_contact?.name ??
        null,
      review_status,
      review_record_id:         recordId ?? null,
      last_score:               record ? (record.score as number) : null,
      last_score_band:          record ? (record.score_band as string) : null,
      last_package_assessment:  record ? (record.package_assessment as string) : null,
      last_reviewed_at:         record ? (record.reviewed_at as string) : null,
      // Prefer the Procore-native sequence number (available for all inspections)
      // and fall back to what Claude extracted during a previous review.
      inspection_number_of_type:
        extractProcoreSequenceNumber(insp) ??
        (record ? (record.inspection_number_of_type as number | null) : null),
      review_data:              record ? (record.review_data as ReviewResult | null) : null,
      override_score:           override ? (override.override_score as number) : null,
      override_note:            override ? (override.note as string | null) : null,
      override_created_by:      override ? (override.created_by as string | null) : null,
    };
  });

  // Sort: ITP number ascending, then inspection_number_of_type ascending
  result.sort((a, b) => {
    const numA = extractItpNumber(a.name);
    const numB = extractItpNumber(b.name);
    if (numA !== numB) return numA - numB;
    const seqA = a.inspection_number_of_type ?? 9999;
    const seqB = b.inspection_number_of_type ?? 9999;
    return seqA - seqB;
  });

  return NextResponse.json({ inspections: result });
}

function extractItpNumber(name: string): number {
  const match = (name ?? "").match(/^ITP[-\s]*0*(\d+)/i);
  return match ? parseInt(match[1], 10) : 999;
}

/**
 * Extracts the Procore sequential inspection number directly from the
 * inspection object. Procore exposes this as `number`, `inspection_number`,
 * or `position_of_type` depending on API version and tenant config.
 * This is available for all inspections regardless of review status.
 */
function extractProcoreSequenceNumber(insp: ProcoreInspection): number | null {
  const raw =
    insp.number ??
    (insp.inspection_number != null ? String(insp.inspection_number) : null) ??
    (insp.position_of_type  != null ? String(insp.position_of_type)  : null) ??
    null;
  if (raw == null) return null;
  const n = parseInt(raw, 10);
  return isNaN(n) ? null : n;
}
