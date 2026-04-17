// ─── GET /api/dashboard/projects?company_id=X ────────────────────────────────
// Returns Procore projects enriched with review stats from Supabase:
//   reviewed_count  — distinct inspections reviewed for this project
//   avg_score       — mean score across all reviews (null if none)
//   last_reviewed_at — ISO timestamp of the most recent review

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getProcoreProjects } from "@/lib/procore";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated with Procore." }, { status: 401 });
  }

  const companyIdParam = request.nextUrl.searchParams.get("company_id");
  if (!companyIdParam || isNaN(Number(companyIdParam))) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }
  const companyId = Number(companyIdParam);

  // Fetch projects from Procore
  let projects;
  try {
    projects = await getProcoreProjects(accessToken, companyId);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 502 });
  }

  // Fetch all review summaries for this company from Supabase
  const { data: records, error } = await supabase
    .from("review_records")
    .select("procore_project_id, procore_inspection_id, score, reviewed_at")
    .eq("company_id", String(companyId));

  if (error) {
    console.error("[dashboard/projects] Supabase error:", error.message);
  }

  // Aggregate per project: distinct inspections reviewed + avg score + last date
  type Stats = { inspectionIds: Set<number>; scores: number[]; lastReviewedAt: string };
  const statsByProject = new Map<number, Stats>();

  for (const r of records ?? []) {
    const pid = r.procore_project_id as number;
    if (!statsByProject.has(pid)) {
      statsByProject.set(pid, { inspectionIds: new Set(), scores: [], lastReviewedAt: "" });
    }
    const s = statsByProject.get(pid)!;
    s.inspectionIds.add(r.procore_inspection_id as number);
    s.scores.push(r.score as number);
    if (!s.lastReviewedAt || (r.reviewed_at as string) > s.lastReviewedAt) {
      s.lastReviewedAt = r.reviewed_at as string;
    }
  }

  const result = projects.map(p => {
    const s = statsByProject.get(p.id);
    return {
      ...p,
      reviewed_count: s?.inspectionIds.size ?? 0,
      avg_score: s && s.scores.length > 0
        ? Math.round(s.scores.reduce((a, b) => a + b, 0) / s.scores.length)
        : null,
      last_reviewed_at: s?.lastReviewedAt || null,
    };
  });

  // Sort: project number ascending (numeric prefix of project_number or name)
  result.sort((a, b) => {
    const numA = extractProjectNumber(a);
    const numB = extractProjectNumber(b);
    if (numA !== numB) return numA - numB;
    return (a.name ?? "").localeCompare(b.name ?? "");
  });

  return NextResponse.json({ projects: result });
}

function extractProjectNumber(p: { project_number?: string | null; name?: string | null }): number {
  if (p.project_number?.trim()) {
    const n = parseInt(p.project_number.trim(), 10);
    if (!isNaN(n)) return n;
  }
  const match = (p.name ?? "").match(/^\s*(\d+)/);
  return match ? parseInt(match[1], 10) : 9999;
}
