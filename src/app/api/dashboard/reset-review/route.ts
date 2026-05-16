// ─── POST /api/dashboard/reset-review ────────────────────────────────────────
// Nulls out a review record so the ITP is treated as unreviewed.
// Restricted to company admins only.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { isCompanyAdmin } from "@/lib/admin";
import { resolveAuditUser, logAuditEvent, AUDIT_ACTIONS } from "@/lib/audit";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
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
    return NextResponse.json(
      { error: "review_record_id and company_id are required." },
      { status: 400 }
    );
  }

  // Resolve requesting user
  const auditUser = await resolveAuditUser(accessToken);
  console.log("[reset-review] Resolved user:", auditUser.user_email, "| company_id:", company_id, "| review_record_id:", review_record_id);

  // Admin check
  const admin = await isCompanyAdmin(auditUser.user_email, company_id);
  console.log("[reset-review] isCompanyAdmin result:", admin);
  if (!admin) {
    console.error("[reset-review] Admin check failed for email:", auditUser.user_email, "company_id:", company_id);
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  // Verify the record belongs to this company (security check)
  const { data: record, error: fetchError } = await supabase
    .from("review_records")
    .select("id, company_id")
    .eq("id", review_record_id)
    .single();

  if (fetchError || !record) {
    console.error("[reset-review] Record fetch failed:", fetchError?.message ?? "no record found", "| review_record_id:", review_record_id);
    return NextResponse.json({ error: "Review record not found." }, { status: 404 });
  }

  console.log("[reset-review] Record found. Record company_id:", record.company_id, "| Request company_id:", company_id);

  if (record.company_id !== company_id) {
    console.error("[reset-review] company_id mismatch — record:", record.company_id, "request:", company_id);
    return NextResponse.json({ error: "Access denied." }, { status: 403 });
  }

  // Null out the review fields
  console.log("[reset-review] Attempting update on record:", review_record_id);
  const { error: updateError } = await supabase
    .from("review_records")
    .update({
      score:                 null,
      score_band:            null,
      review_data:           null,
      reviewed_at:           new Date().toISOString(),
      action_items:          null,
      scoring_version_id:    null,
      scoring_version_label: null,
    })
    .eq("id", review_record_id);

  if (updateError) {
    console.error("[reset-review] Supabase update error:", updateError.message, "| code:", updateError.code, "| details:", updateError.details);
    return NextResponse.json({ error: updateError.message || "Failed to reset review." }, { status: 500 });
  }

  console.log("[reset-review] Update successful for record:", review_record_id);

  // Audit log — fire-and-forget
  void logAuditEvent({
    company_id,
    user_id:    auditUser.user_id,
    user_name:  auditUser.user_name,
    user_email: auditUser.user_email,
    action:     AUDIT_ACTIONS.REVIEW_RESET,
    details:    { review_record_id },
  });

  return NextResponse.json({ success: true });
}
