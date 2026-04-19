// ─── /api/dashboard/override ─────────────────────────────────────────────────
// GET  ?review_record_id=X  — fetch the latest override for a record
// POST                      — create a new override

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { logAuditEvent, resolveAuditUser, AUDIT_ACTIONS } from "@/lib/audit";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  if (!cookieStore.get("procore_access_token")?.value) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const recordId = request.nextUrl.searchParams.get("review_record_id");
  if (!recordId) {
    return NextResponse.json({ error: "review_record_id is required." }, { status: 400 });
  }

  const companyId = request.nextUrl.searchParams.get("company_id");
  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  // Verify the review_record belongs to this company before returning its override
  const { data: record, error: recordError } = await supabase
    .from("review_records")
    .select("id")
    .eq("id", recordId)
    .eq("company_id", companyId)
    .maybeSingle();

  if (recordError) {
    return NextResponse.json({ error: recordError.message }, { status: 500 });
  }
  if (!record) {
    return NextResponse.json({ error: "Not found." }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("score_overrides")
    .select("*")
    .eq("review_record_id", recordId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ override: data ?? null });
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  let body: {
    review_record_id: string;
    company_id: string;
    original_score: number;
    override_score: number;
    note?: string;
    created_by?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { review_record_id, company_id, original_score, override_score, note, created_by } = body;

  if (!review_record_id || !company_id || original_score == null || override_score == null) {
    return NextResponse.json(
      { error: "review_record_id, company_id, original_score, and override_score are required." },
      { status: 400 }
    );
  }

  if (override_score < 0 || override_score > 100) {
    return NextResponse.json({ error: "override_score must be between 0 and 100." }, { status: 400 });
  }

  // Verify the review_record belongs to the specified company before writing
  const { data: record, error: recordError } = await supabase
    .from("review_records")
    .select("id")
    .eq("id", review_record_id)
    .eq("company_id", company_id)
    .maybeSingle();

  if (recordError) {
    return NextResponse.json({ error: recordError.message }, { status: 500 });
  }
  if (!record) {
    return NextResponse.json({ error: "review_record_id does not belong to this company." }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("score_overrides")
    .insert({
      review_record_id,
      company_id,
      original_score,
      override_score,
      note: note ?? null,
      created_by: created_by ?? null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const auditUser = await resolveAuditUser(accessToken);
  void logAuditEvent({
    ...auditUser,
    company_id: company_id,
    action: AUDIT_ACTIONS.SCORE_OVERRIDE,
    entity_type: "inspection",
    entity_id: review_record_id,
    details: {
      old_score: original_score,
      new_score: override_score,
      note: note ?? null,
    },
  });

  return NextResponse.json({ override: data });
}
