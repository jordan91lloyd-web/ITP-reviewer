// ─── POST /api/procore/bulk-queue/process ─────────────────────────────────────
// Processes ONE queued item from a bulk_queue_jobs row and returns.
// Called by GET /api/cron/process-queue every 2 minutes — no self-chaining.
// Can also be called directly for manual triggering.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getValidToken } from "@/lib/token-store";

export const maxDuration = 300;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface QueueItem {
  inspection_id: number;
  project_id:    string;
  status:        "queued" | "processing" | "done" | "failed";
  error?:        string;
}

async function updateJob(
  jobId: string,
  items: QueueItem[],
  status?: string
): Promise<void> {
  const patch: Record<string, unknown> = {
    items,
    updated_at: new Date().toISOString(),
  };
  if (status) patch.status = status;
  const { error } = await supabase
    .from("bulk_queue_jobs")
    .update(patch)
    .eq("id", jobId);
  if (error) console.error("[bulk-queue/process] updateJob error:", error.message);
}

export async function POST(request: NextRequest) {
  let body: { job_id?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { job_id } = body;
  if (!job_id) {
    return NextResponse.json({ error: "job_id is required." }, { status: 400 });
  }

  // Fetch the job
  const { data: job, error: fetchError } = await supabase
    .from("bulk_queue_jobs")
    .select("*")
    .eq("id", job_id)
    .single();

  if (fetchError || !job) {
    return NextResponse.json({ error: "Job not found." }, { status: 404 });
  }

  if (job.status !== "running") {
    return NextResponse.json({ message: "Job not running.", status: job.status });
  }

  const items = job.items as QueueItem[];
  const queuedIndex = items.findIndex(i => i.status === "queued");

  // Nothing left — mark completed
  if (queuedIndex === -1) {
    await updateJob(job_id, items, "completed");
    return NextResponse.json({ status: "completed" });
  }

  // Mark item as processing
  const item = { ...items[queuedIndex] };
  items[queuedIndex] = { ...item, status: "processing" };
  await updateJob(job_id, items);

  const companyId = job.company_id as string;
  const userId    = job.user_id as string | undefined;

  // Resolve a fresh token
  if (!userId) {
    items[queuedIndex] = { ...item, status: "failed", error: "Job missing user_id — re-queue from the dashboard" };
    await updateJob(job_id, items);
    return NextResponse.json({ status: "token_error" });
  }

  const token = await getValidToken(companyId, userId);
  if (!token) {
    items[queuedIndex] = { ...item, status: "failed", error: "Token unavailable — please log in again" };
    await updateJob(job_id, items);
    return NextResponse.json({ status: "token_error" });
  }

  // Call the import route
  const baseUrl = new URL(request.url).origin;
  try {
    const importRes = await fetch(`${baseUrl}/api/procore/import`, {
      method:  "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie:         `procore_access_token=${token}`,
      },
      body: JSON.stringify({
        inspection_id: item.inspection_id,
        project_id:    item.project_id,
        company_id:    companyId,
      }),
    });

    const importData = await importRes.json().catch(() => ({})) as Record<string, unknown>;

    if (!importRes.ok || !importData.success) {
      throw new Error((importData.error as string | undefined) ?? `HTTP ${importRes.status}`);
    }

    items[queuedIndex] = { ...item, status: "done" };
    await updateJob(job_id, items);

    // Fire generate-action-items (best-effort, no await)
    const result = importData.result as Record<string, unknown> | undefined;
    void fetch(`${baseUrl}/api/procore/generate-action-items`, {
      method:  "POST",
      headers: { "Content-Type": "application/json", Cookie: `procore_access_token=${token}` },
      body:    JSON.stringify({
        inspection_id:    String(item.inspection_id),
        project_id:       item.project_id,
        company_id:       companyId,
        review_summary:   (result?.executive_summary as string | undefined) ?? "",
        key_issues:       ((result?.key_issues as Array<{ title: string }> | undefined) ?? []).map(i => i.title),
        missing_evidence: ((result?.missing_evidence as Array<{ evidence_type: string }> | undefined) ?? []).map(m => m.evidence_type),
        score:            (result?.total_score as number | undefined) ?? 0,
        score_band:       (result?.score_band as string | undefined) ?? "",
        itp_name:         ((result?.inspection_header as Record<string, unknown> | undefined)?.itp_number as string | undefined)
                            ?? String(item.inspection_id),
      }),
    });

  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    items[queuedIndex] = { ...item, status: "failed", error: errMsg };
    await updateJob(job_id, items);
  }

  // Check whether all items are now done/failed — if so, close the job
  const remaining = items.filter(i => i.status === "queued").length;
  if (remaining === 0) {
    const anyFailed = items.some(i => i.status === "failed");
    await updateJob(job_id, items, anyFailed ? "failed" : "completed");
  }

  return NextResponse.json({ status: "processed", inspection_id: item.inspection_id });
}
