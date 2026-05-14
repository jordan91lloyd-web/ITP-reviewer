// ─── POST /api/procore/bulk-queue/auto ────────────────────────────────────────
// Smart targeting route. Finds all closed ITPs that are either:
//   a) never reviewed, OR
//   b) updated in Procore since the last review
// Then queues them for background review without requiring manual selection.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { getInspections } from "@/lib/procore";

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

  let body: { company_id?: string; project_id?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { company_id, project_id } = body;
  if (!company_id || !project_id) {
    return NextResponse.json(
      { error: "company_id and project_id are required." },
      { status: 400 }
    );
  }

  // ── Fetch all closed ITPs from Procore ─────────────────────────────────────
  let allInspections;
  try {
    allInspections = await getInspections(
      accessToken,
      Number(project_id),
      Number(company_id)
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Failed to fetch inspections: ${msg}` }, { status: 502 });
  }

  const closedItps = allInspections.filter(
    i =>
      i.status?.toLowerCase() === "closed" &&
      i.name?.trim().toLowerCase().startsWith("itp")
  );

  if (closedItps.length === 0) {
    return NextResponse.json({ queued: 0, message: "No closed ITPs found." });
  }

  // ── Fetch review records from Supabase ─────────────────────────────────────
  const { data: records } = await supabase
    .from("review_records")
    .select("procore_inspection_id, reviewed_at, procore_updated_at")
    .eq("company_id", company_id)
    .eq("procore_project_id", Number(project_id));

  // Build map: inspection_id → most recent reviewed_at
  const reviewedMap = new Map<number, string>();
  for (const r of records ?? []) {
    const iid = r.procore_inspection_id as number;
    const ra  = r.reviewed_at as string;
    if (!reviewedMap.has(iid) || ra > reviewedMap.get(iid)!) {
      reviewedMap.set(iid, ra);
    }
  }

  // ── Determine which ITPs need review ──────────────────────────────────────
  const needsReview = closedItps.filter(insp => {
    const lastReviewed = reviewedMap.get(insp.id);
    if (!lastReviewed) return true; // never reviewed
    // Procore updated_at > last reviewed_at
    if (insp.updated_at) {
      return new Date(insp.updated_at) > new Date(lastReviewed);
    }
    return false;
  });

  if (needsReview.length === 0) {
    return NextResponse.json({ queued: 0, message: "All ITPs are up to date." });
  }

  // ── Create bulk_queue_jobs row ─────────────────────────────────────────────
  const items = needsReview.map(insp => ({
    inspection_id: insp.id,
    project_id,
    status: "queued" as const,
  }));

  const { data: job, error: insertError } = await supabase
    .from("bulk_queue_jobs")
    .insert({ company_id, project_id, status: "running", items })
    .select("id")
    .single();

  if (insertError || !job) {
    console.error("[bulk-queue/auto] Insert error:", insertError);
    return NextResponse.json({ error: "Failed to create job." }, { status: 500 });
  }

  const jobId   = job.id as string;
  const baseUrl = new URL(request.url).origin;

  // Fire-and-forget processing
  void fetch(`${baseUrl}/api/procore/bulk-queue/process`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ job_id: jobId, access_token: accessToken }),
  });

  return NextResponse.json({ queued: needsReview.length, job_id: jobId });
}
