// ─── GET /api/auth/logout ─────────────────────────────────────────────────
// Clears all Procore auth cookies and redirects to the homepage.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { logAuditEvent, resolveAuditUser, AUDIT_ACTIONS } from "@/lib/audit";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();

  // Capture identity before clearing cookies
  const accessToken = cookieStore.get("procore_access_token")?.value;
  const fleekId     = process.env.FLEEK_COMPANY_ID ?? "unknown";

  cookieStore.delete("procore_access_token");
  cookieStore.delete("procore_refresh_token");
  cookieStore.delete("procore_token_expires_at");

  console.log("[auth/logout] Procore session cleared");

  void resolveAuditUser(accessToken).then(auditUser =>
    logAuditEvent({ ...auditUser, company_id: fleekId, action: AUDIT_ACTIONS.LOGOUT })
  );

  return NextResponse.redirect(new URL("/", request.url));
}
