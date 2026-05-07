// ─── GET /api/dashboard/project-counts?project_id=X&company_id=Y ─────────────
// Lightweight endpoint: counts ITP-named inspections by Procore status for a
// single project. Used by the Company tab to progressively load row counts
// without fetching full inspection details or Supabase review records.
//
// Returns:
//   { project_id, open, in_review, closed, total }

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getInspections } from "@/lib/procore";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated with Procore." }, { status: 401 });
  }

  const sp            = request.nextUrl.searchParams;
  const projectIdParam = sp.get("project_id");
  const companyIdParam = sp.get("company_id");

  if (!projectIdParam || isNaN(Number(projectIdParam))) {
    return NextResponse.json({ error: "project_id is required." }, { status: 400 });
  }
  if (!companyIdParam || isNaN(Number(companyIdParam))) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const projectId = Number(projectIdParam);
  const companyId = Number(companyIdParam);

  try {
    const allInspections = await getInspections(accessToken, projectId, companyId);

    // Filter to ITP-named only (same rule as inspections route)
    const itpInspections = allInspections.filter(
      insp => insp.name?.trim().toLowerCase().startsWith("itp")
    );

    let open = 0, inReview = 0, closed = 0;
    for (const insp of itpInspections) {
      const s = insp.status?.toLowerCase();
      if (s === "closed")    closed++;
      else if (s === "in_review") inReview++;
      else                   open++;
    }

    return NextResponse.json({
      project_id: projectId,
      open,
      in_review: inReview,
      closed,
      total: itpInspections.length,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 502 }
    );
  }
}
