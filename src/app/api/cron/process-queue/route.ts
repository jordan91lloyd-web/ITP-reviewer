// ─── GET /api/cron/process-queue ─────────────────────────────────────────────
// Called by Vercel Cron every 2 minutes. Processes one queued item per running
// job, detects stuck jobs, and returns a summary.
//
// CRON_SECRET must be set in Vercel environment variables.
// Generate one with: openssl rand -base64 32
// Vercel automatically passes it as a Bearer token to cron routes.
//
// Schedule (vercel.json): "*/2 * * * *"

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const maxDuration = 300;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const STUCK_COMPLETE_MINUTES = 30;  // job with no queued items older than this → completed
const STUCK_TIMEOUT_HOURS    = 2;   // job still running after this → failed

export async function GET(request: NextRequest) {
  // ── Auth check ─────────────────────────────────────────────────────────────
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Fetch all running jobs ─────────────────────────────────────────────────
  const { data: jobs, error: fetchError } = await supabase
    .from("bulk_queue_jobs")
    .select("*")
    .eq("status", "running");

  if (fetchError) {
    console.error("[cron/process-queue] Failed to fetch running jobs:", fetchError.message);
    return NextResponse.json({ error: "Failed to fetch jobs." }, { status: 500 });
  }

  if (!jobs || jobs.length === 0) {
    return NextResponse.json({ status: "idle" });
  }

  const now            = Date.now();
  let   jobsProcessed  = 0;
  let   itemsProcessed = 0;

  const baseUrl = new URL(request.url).origin;

  for (const job of jobs) {
    const updatedAt   = new Date(job.updated_at as string).getTime();
    const ageMinutes  = (now - updatedAt) / 1000 / 60;
    const ageHours    = ageMinutes / 60;
    const items       = (job.items ?? []) as Array<{ status: string }>;
    const hasQueued   = items.some(i => i.status === "queued");
    const hasProcessing = items.some(i => i.status === "processing");

    // ── Stuck job: timed out after 2 hours ───────────────────────────────────
    if (ageHours >= STUCK_TIMEOUT_HOURS) {
      console.warn(`[cron/process-queue] Job ${job.id} timed out after ${Math.round(ageHours)}h — marking failed`);
      await supabase
        .from("bulk_queue_jobs")
        .update({
          status:     "failed",
          updated_at: new Date().toISOString(),
          items:      items.map(i =>
            i.status === "queued" || i.status === "processing"
              ? { ...i, status: "failed", error: "Job timed out — re-queue to retry" }
              : i
          ),
        })
        .eq("id", job.id);
      continue;
    }

    // ── Stuck job: no queued items left, been idle for 30 min ───────────────
    if (!hasQueued && !hasProcessing && ageMinutes >= STUCK_COMPLETE_MINUTES) {
      console.warn(`[cron/process-queue] Job ${job.id} has no queued items and is stale — marking completed`);
      await supabase
        .from("bulk_queue_jobs")
        .update({ status: "completed", updated_at: new Date().toISOString() })
        .eq("id", job.id);
      continue;
    }

    // ── Process one item ──────────────────────────────────────────────────────
    if (!hasQueued) {
      // Currently processing or genuinely empty — skip this tick
      continue;
    }

    try {
      const res = await fetch(`${baseUrl}/api/procore/bulk-queue/process`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ job_id: job.id }),
      });

      const data = await res.json().catch(() => ({})) as Record<string, unknown>;

      if (res.ok) {
        jobsProcessed++;
        if (data.status === "processed") itemsProcessed++;
        console.log(`[cron/process-queue] Job ${job.id}: processed inspection ${data.inspection_id ?? "—"}`);
      } else {
        console.error(`[cron/process-queue] Job ${job.id}: process route returned ${res.status}`, data);
      }
    } catch (err) {
      console.error(`[cron/process-queue] Job ${job.id}: fetch failed:`, err instanceof Error ? err.message : String(err));
    }
  }

  return NextResponse.json({
    status:          "ok",
    jobs_processed:  jobsProcessed,
    items_processed: itemsProcessed,
  });
}
