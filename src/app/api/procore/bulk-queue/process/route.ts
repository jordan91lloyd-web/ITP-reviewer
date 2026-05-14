// ─── POST /api/procore/bulk-queue/process ─────────────────────────────────────
// Processes one item from a bulk_queue_jobs row, then self-invokes for the next.
// Called by /start (and by itself) — never called directly by the browser.
//
// Pattern: one invocation = one item. After completing an item it fires a
// fire-and-forget request to itself for the next queued item. This keeps each
// invocation well within maxDuration while supporting arbitrarily large batches.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

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
  let body: { job_id?: string; access_token?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { job_id, access_token } = body;
  if (!job_id || !access_token) {
    return NextResponse.json({ error: "job_id and access_token are required." }, { status: 400 });
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

  if (queuedIndex === -1) {
    // Nothing left — mark completed
    await updateJob(job_id, items, "completed");
    return NextResponse.json({ message: "All items processed." });
  }

  const item = { ...items[queuedIndex] };
  items[queuedIndex] = { ...item, status: "processing" };
  await updateJob(job_id, items);

  const baseUrl   = new URL(request.url).origin;
  const cookieHdr = `procore_access_token=${access_token}`;

  // ── Call import ─────────────────────────────────────────────────────────────
  try {
    const importRes = await fetch(`${baseUrl}/api/procore/import`, {
      method:  "POST",
      headers: { "Content-Type": "application/json", Cookie: cookieHdr },
      body:    JSON.stringify({
        inspection_id: item.inspection_id,
        project_id:    item.project_id,
        company_id:    job.company_id as string,
      }),
    });

    // importRes.json() may fail if the response is not JSON
    const importData = await importRes.json().catch(() => ({})) as Record<string, unknown>;

    if (!importRes.ok || !importData.success) {
      throw new Error((importData.error as string | undefined) ?? `HTTP ${importRes.status}`);
    }

    items[queuedIndex] = { ...item, status: "done" };
    await updateJob(job_id, items);

    // ── Fire generate-action-items (best-effort, no await) ───────────────────
    const result = importData.result as Record<string, unknown> | undefined;
    void fetch(`${baseUrl}/api/procore/generate-action-items`, {
      method:  "POST",
      headers: { "Content-Type": "application/json", Cookie: cookieHdr },
      body:    JSON.stringify({
        inspection_id:    String(item.inspection_id),
        project_id:       item.project_id,
        company_id:       job.company_id as string,
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

  // 3s buffer between items (mirrors the browser bulk review delay)
  await delay(3000);

  // ── Determine next step ─────────────────────────────────────────────────────
  const remaining = items.filter(i => i.status === "queued").length;

  if (remaining > 0) {
    // Self-invoke for the next queued item (fire-and-forget)
    void fetch(`${baseUrl}/api/procore/bulk-queue/process`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ job_id, access_token }),
    });
  } else {
    // Last item — set final job status
    const anyFailed = items.some(i => i.status === "failed");
    await updateJob(job_id, items, anyFailed ? "failed" : "completed");
  }

  return NextResponse.json({ processed: item.inspection_id, remaining });
}
