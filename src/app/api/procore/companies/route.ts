// ─── GET /api/procore/companies ───────────────────────────────────────────────
// Returns all Procore companies visible to the authenticated user.
// This endpoint does NOT require a Procore-Company-Id header — it is used for
// initial company discovery before any project or inspection calls.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCompanies } from "@/lib/procore";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated with Procore." }, { status: 401 });
  }

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
