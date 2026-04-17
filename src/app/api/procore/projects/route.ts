// ─── GET /api/procore/projects?company_id=X ───────────────────────────────────
// Returns the Procore project list for a given company.
// Requires a valid procore_access_token cookie and a company_id query param.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getProcoreProjects } from "@/lib/procore";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated with Procore." }, { status: 401 });
  }

  const companyIdParam = request.nextUrl.searchParams.get("company_id");
  if (!companyIdParam || isNaN(Number(companyIdParam))) {
    return NextResponse.json({ error: "company_id query parameter is required." }, { status: 400 });
  }
  const companyId = Number(companyIdParam);

  try {
    const projects = await getProcoreProjects(accessToken, companyId);
    console.log(`[procore/projects] company=${companyId}: Returned ${projects.length} project(s)`);
    return NextResponse.json({ projects });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[procore/projects] Error:", msg);
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
