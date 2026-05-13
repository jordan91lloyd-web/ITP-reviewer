// ─── /api/dashboard/confirm ───────────────────────────────────────────────────
// POST — mark a reviewed ITP as confirmed / signed-off by a QA manager.
//
// Body: { review_record_id: string, company_id: string }
// Returns: { success: true, confirmed_at: string, confirmed_by: string }

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { logAuditEvent, resolveAuditUser, AUDIT_ACTIONS } from "@/lib/audit";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("procore_access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  let body: { review_record_id?: string; company_id?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { review_record_id, company_id } = body;
  if (!review_record_id || !company_id) {
    return NextResponse.json({ error: "review_record_id and company_id are required." }, { status: 400 });
  }

  // Resolve the current user's identity from Procore.
  const auditUser = await resolveAuditUser(token);

  const confirmed_at = new Date().toISOString();
  const confirmed_by = auditUser.user_name ?? "Unknown";

  const { error } = await supabase
    .from("review_records")
    .update({ confirmed_at, confirmed_by })
    .eq("id", review_record_id)
    .eq("company_id", company_id);

  if (error) {
    console.error("[confirm] Supabase update error:", error);
    return NextResponse.json({ error: "Failed to confirm ITP." }, { status: 500 });
  }

  void logAuditEvent({
    company_id,
    user_id:    auditUser.user_id,
    user_name:  auditUser.user_name,
    user_email: auditUser.user_email,
    action:     AUDIT_ACTIONS.REVIEW_CONFIRMED,
    entity_type: "inspection",
    entity_id:   review_record_id,
    details: { confirmed_by, confirmed_at },
  });

  return NextResponse.json({ success: true, confirmed_at, confirmed_by });
}
