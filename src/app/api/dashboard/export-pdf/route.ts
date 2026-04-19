// ─── POST /api/dashboard/export-pdf ──────────────────────────────────────────
// Thin audit-logging endpoint called by the client whenever a bulk PDF export
// is initiated. The actual export is performed client-side; this route exists
// solely to record the action in the audit trail.
//
// Body: { company_id, inspection_count, export_type, inspection_names }

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { logAuditEvent, resolveAuditUser, AUDIT_ACTIONS } from "@/lib/audit";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  let body: {
    company_id:        string;
    inspection_count:  number;
    export_type:       "separate" | "zip";
    inspection_names?: string[];
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { company_id, inspection_count, export_type, inspection_names } = body;
  if (!company_id || inspection_count == null || !export_type) {
    return NextResponse.json(
      { error: "company_id, inspection_count, and export_type are required." },
      { status: 400 }
    );
  }

  const auditUser = await resolveAuditUser(accessToken);
  void logAuditEvent({
    ...auditUser,
    company_id,
    action: AUDIT_ACTIONS.PDF_EXPORTED,
    details: {
      inspection_count,
      export_type,
      inspection_names: inspection_names ?? [],
    },
  });

  return NextResponse.json({ ok: true });
}
