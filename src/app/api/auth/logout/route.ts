// ─── GET /api/auth/logout ─────────────────────────────────────────────────
// Clears all Procore auth cookies and redirects to the homepage.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete("procore_access_token");
  cookieStore.delete("procore_refresh_token");
  cookieStore.delete("procore_token_expires_at");

  console.log("[auth/logout] Procore session cleared");
  return NextResponse.redirect(new URL("/", request.url));
}
