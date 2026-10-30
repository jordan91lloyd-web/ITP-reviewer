// ─── GET /api/procore/companies ───────────────────────────────────────────────
// Returns all Procore companies visible to the authenticated user.
// This endpoint does NOT require a Procore-Company-Id header — it is used for
// initial company discovery before any project or inspection calls.

import { NextRequest, NextResponse } from "next/server";
import { getCompanies } from "@/lib/procore";
import { requirePermission } from "@/lib/route-auth";

export async function GET(request: NextRequest) {
  const auth = await requirePermission(request, "company", "view");
  if (auth.error) return auth.error;
  const accessToken = auth.token;

  try {
    const companies = await getCompanies(accessToken);
    console.log(`[procore/companies] Returned ${companies.length} company(ies)`);
    return NextResponse.json({ companies });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[procore/companies] Error:", msg);
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
