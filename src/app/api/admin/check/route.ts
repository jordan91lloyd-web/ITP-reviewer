// ─── GET /api/admin/check ─────────────────────────────────────────────────────
// Returns whether the currently authenticated user is a company admin.
// Used by client components to conditionally show admin UI.

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/route-auth";
import { checkPermission } from "@/lib/permissions";

const COMPANY_ID = process.env.FLEEK_COMPANY_ID ?? "";

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request);
  if (auth.error) {
    return NextResponse.json({ isAdmin: false }, { status: 401 });
  }

  // Check if user has admin-level access on the admin module
  const isAdmin = await checkPermission(COMPANY_ID, auth.email, "admin", "admin");

  return NextResponse.json({ isAdmin, email: auth.email, company_id: COMPANY_ID });
}
