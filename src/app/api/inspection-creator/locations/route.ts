// GET /api/inspection-creator/locations?project_id=X&company_id=Y
// Returns project locations for the location picker

import { NextRequest, NextResponse } from "next/server";
import { getProjectLocations } from "@/lib/procore";
import { resolveAccessToken } from "@/lib/resolve-token";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const token = await resolveAccessToken();
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const projectId = request.nextUrl.searchParams.get("project_id");
  const companyId = request.nextUrl.searchParams.get("company_id") ?? process.env.FLEEK_COMPANY_ID;
  if (!projectId || !companyId) {
    return NextResponse.json({ error: "project_id and company_id required" }, { status: 400 });
  }

  try {
    const locations = await getProjectLocations(token, parseInt(projectId), parseInt(companyId));
    return NextResponse.json({ locations });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
