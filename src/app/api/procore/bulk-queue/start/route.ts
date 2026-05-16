// ─── POST /api/procore/bulk-queue/start ───────────────────────────────────────
// Creates a bulk_queue_jobs row in Supabase and kicks off processing in a
// fire-and-forget call to /api/procore/bulk-queue/process.
// Returns { job_id } immediately so the browser can start polling status.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { getProcoreUser } from "@/lib/procore";
import { logAuditEvent, resolveAuditUser, AUDIT_ACTIONS } from "@/lib/audit";

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

  let body: { company_id?: string; project_id?: string; inspection_ids?: number[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { company_id, project_id, inspection_ids } = body;
  if (!company_id || !project_id || !Array.isArray(inspection_ids) || inspection_ids.length === 0) {
    return NextResponse.json(
      { error: "company_id, project_id, and inspection_ids are required." },
      { status: 400 }
    );
  }

  // Resolve user_id so the process route can fetch a fresh token per item
  let user_id: string;
  try {
    const user = await getProcoreUser(accessToken);
    user_id = String(user.id);
  } catch (err) {
    console.error("[bulk-queue/start] Failed to resolve user identity:", err);
    return NextResponse.json({ error: "Failed to verify identity." }, { status: 401 });
  }

  const items = inspection_ids.map(id => ({
    inspection_id: id,
    project_id,
    status: "queued" as const,
  }));

  const { data: job, error: insertError } = await supabase
    .from("bulk_queue_jobs")
    .insert({ company_id, project_id, user_id, status: "running", items })
    .select("id")
    .single();

  if (insertError || !job) {
    console.error("[bulk-queue/start] Supabase insert error:", insertError);
    return NextResponse.json({ error: "Failed to create job." }, { status: 500 });
  }

  const jobId = job.id as string;

  // Processing is handled by the Vercel Cron at /api/cron/process-queue
  // which fires every 2 minutes — no manual kick-off needed.

  // Audit log — fire-and-forget, never throws
  const auditUser = await resolveAuditUser(accessToken);
  void logAuditEvent({
    company_id,
    user_id:    auditUser.user_id,
    user_name:  auditUser.user_name,
    user_email: auditUser.user_email,
    action:     AUDIT_ACTIONS.BULK_REVIEW_STARTED,
    project_id,
    details:    { job_id: jobId, inspection_count: inspection_ids.length, mode: "background" },
  });

  return NextResponse.json({ job_id: jobId });
}
