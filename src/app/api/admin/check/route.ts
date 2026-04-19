// ─── GET /api/admin/check ─────────────────────────────────────────────────────
// Returns whether the currently authenticated user is a company admin.
// Used by client components to conditionally show admin UI.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getProcoreUser } from "@/lib/procore";
import { isCompanyAdmin } from "@/lib/admin";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ isAdmin: false }, { status: 401 });
  }

  const companyId = process.env.FLEEK_COMPANY_ID ?? "";

  try {
    const user = await getProcoreUser(accessToken);
    const admin = await isCompanyAdmin(user.login, companyId);
    return NextResponse.json({ isAdmin: admin, email: user.login, company_id: companyId });
  } catch {
    return NextResponse.json({ isAdmin: false });
  }
}
