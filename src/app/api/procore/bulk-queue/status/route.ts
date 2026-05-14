// ─── GET /api/procore/bulk-queue/status?job_id=X&company_id=Y ─────────────────
// Polled by the browser every 5 seconds to track background review progress.
// Returns job status and per-item statuses.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  if (!cookieStore.get("procore_access_token")?.value) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const jobId    = request.nextUrl.searchParams.get("job_id");
  const companyId = request.nextUrl.searchParams.get("company_id");
  if (!jobId || !companyId) {
    return NextResponse.json(
      { error: "job_id and company_id are required." },
      { status: 400 }
    );
  }

  const { data: job, error } = await supabase
    .from("bulk_queue_jobs")
    .select("*")
    .eq("id", jobId)
    .single();

  if (error || !job) {
    return NextResponse.json({ error: "Job not found." }, { status: 404 });
  }

  // Security: company_id must match the job record
  if (job.company_id !== companyId) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const items = job.items as Array<{
    inspection_id: number;
    project_id:    string;
    status:        string;
    error?:        string;
  }>;

  return NextResponse.json({
    job_id:    jobId,
    status:    job.status as string,
    total:     items.length,
    completed: items.filter(i => i.status === "done").length,
    failed:    items.filter(i => i.status === "failed").length,
    items,
  });
}
