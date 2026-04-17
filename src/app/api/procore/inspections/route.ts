// ─── GET /api/procore/inspections?project_id=X&company_id=Y ──────────────────
// Returns filtered inspections for a Procore project:
//   • status must be "closed"
//   • name must start with "ITP-" (case-insensitive)
//
// Each inspection is enriched with a review_status from local history:
//   "not_reviewed" — never reviewed in this app
//   "reviewed"     — reviewed, and Procore hasn't updated it since
//   "changed"      — reviewed, but Procore's updated_at is newer than review

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getInspections } from "@/lib/procore";
import { findLatestForInspection } from "@/lib/history";

export interface InspectionWithStatus {
  id: number;
  name: string;
  status: string;
  updated_at: string | null;
  closed_at: string | null;
  // Review history fields
  review_status: "not_reviewed" | "reviewed" | "changed";
  last_reviewed_at: string | null;
  last_score: number | null;
  last_package_assessment: string | null;
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated with Procore." }, { status: 401 });
  }

  const projectIdParam = request.nextUrl.searchParams.get("project_id");
  if (!projectIdParam || isNaN(Number(projectIdParam))) {
    return NextResponse.json({ error: "project_id query parameter is required." }, { status: 400 });
  }
  const projectId = Number(projectIdParam);

  const companyIdParam = request.nextUrl.searchParams.get("company_id");
  if (!companyIdParam || isNaN(Number(companyIdParam))) {
    return NextResponse.json({ error: "company_id query parameter is required." }, { status: 400 });
  }
  const companyId = Number(companyIdParam);

  let allInspections;
  try {
    allInspections = await getInspections(accessToken, projectId, companyId);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[procore/inspections] Fetch error:", msg);
    return NextResponse.json({ error: msg }, { status: 502 });
  }

  // Filter: closed AND name starts with "itp" (case-insensitive).
  // Procore returns status values with a capital first letter ("Closed" /
  // "Open") on the checklist/lists endpoint, so we lowercase before comparing.
  const filtered = allInspections.filter(
    insp =>
      insp.status?.trim().toLowerCase() === "closed" &&
      insp.name?.trim().toLowerCase().startsWith("itp")
  );

  // Verbose logging so we can see what Procore actually returned.
  const statusCounts: Record<string, number> = {};
  const itpNames: string[] = [];
  for (const insp of allInspections) {
    const s = insp.status ?? "(null)";
    statusCounts[s] = (statusCounts[s] ?? 0) + 1;
    if (insp.name?.trim().toLowerCase().startsWith("itp")) {
      itpNames.push(`${insp.name} [status=${s}]`);
    }
  }
  console.log(
    `[procore/inspections] project=${projectId}: ` +
    `${allInspections.length} total → ${filtered.length} closed ITP-*`
  );
  console.log(`[procore/inspections] status breakdown: ${JSON.stringify(statusCounts)}`);
  console.log(`[procore/inspections] inspections with names starting "itp": ${itpNames.length}`);
  for (const n of itpNames.slice(0, 20)) console.log(`  • ${n}`);

  // Sort numerically by ITP number extracted from the name.
  // "ITP-001 Earthworks" → 1, "ITP-002 Concrete" → 2, etc.
  // Inspections with no recognisable number sort to the end.
  // Within the same ITP number, sort by closed_at descending (most recent first).
  filtered.sort((a, b) => {
    const numA = extractItpNumber(a.name);
    const numB = extractItpNumber(b.name);
    if (numA !== numB) return numA - numB;
    // Same number — sort most-recently-closed first
    const dateA = a.closed_at ? new Date(a.closed_at).getTime() : 0;
    const dateB = b.closed_at ? new Date(b.closed_at).getTime() : 0;
    return dateB - dateA;
  });

  // Enrich each with local review history
  const result: InspectionWithStatus[] = filtered.map(insp => {
    const record = findLatestForInspection(projectId, insp.id);

    let review_status: InspectionWithStatus["review_status"] = "not_reviewed";
    if (record) {
      const inspUpdated  = insp.updated_at ? new Date(insp.updated_at).getTime() : 0;
      const reviewedAt   = new Date(record.reviewed_at).getTime();
      review_status = inspUpdated > reviewedAt ? "changed" : "reviewed";
    }

    return {
      id:                    insp.id,
      name:                  insp.name,
      status:                insp.status,
      updated_at:            insp.updated_at  ?? null,
      closed_at:             insp.closed_at   ?? null,
      review_status,
      last_reviewed_at:      record?.reviewed_at       ?? null,
      last_score:            record?.score              ?? null,
      last_package_assessment: record?.package_assessment ?? null,
    };
  });

  return NextResponse.json({ inspections: result });
}

// Extracts the leading ITP number from a name like "ITP-002 Concrete, Form Reo, Pour"
// Returns 999 for names that don't match so they sort to the bottom.
function extractItpNumber(name: string): number {
  const match = (name ?? "").match(/^ITP[-\s]*0*(\d+)/i);
  return match ? parseInt(match[1], 10) : 999;
}
