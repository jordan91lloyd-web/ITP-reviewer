// ─── GET /api/resourcing/commitments ──────────────────────────────────────────
// Fetches subcontract commitments from Procore across all visible projects for
// the given company, merges with hidden-project and completed-scope records from
// Supabase, and returns data shaped for the Resourcing tab conflict matrix.
//
// Processes one project at a time (sequential, 500ms delay) to avoid rate limits.
//
// Query params:
//   company_id  (required)

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const PROCORE_BASE_URL =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ProcoreCommitment {
  id:              number;
  title:           string;
  status:          string;
  start_date:      string | null;
  completion_date: string | null;
  grand_total:     string | null;
  vendor: {
    id:   number;
    name: string;
  } | null;
}

export interface ProjectCommitments {
  project_id:   string;
  project_name: string;
  is_hidden:    boolean;
  commitments:  (ProcoreCommitment & { is_completed: boolean })[];
}

export interface CommitmentsResponse {
  projects:      ProjectCommitments[];
  hidden_ids:    string[];
  completed_ids: string[]; // "projectId:commitmentId"
  diagnostics:   Record<string, unknown>;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function procoreGet(
  url: URL,
  accessToken: string,
  companyId: string,
): Promise<{ status: number; data: unknown }> {
  const res = await fetch(url.toString(), {
    headers: {
      Authorization:        `Bearer ${accessToken}`,
      "Procore-Company-Id": companyId,
    },
    signal: AbortSignal.timeout(20_000),
  });
  let data: unknown = null;
  try { data = await res.json(); } catch { /* ignore */ }
  return { status: res.status, data };
}

async function fetchCommitments(
  endpoint: string,
  projectId: string,
  accessToken: string,
  companyId: string,
): Promise<ProcoreCommitment[]> {
  const all: ProcoreCommitment[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const url = new URL(`${PROCORE_BASE_URL}${endpoint}`);
    url.searchParams.set("company_id", companyId);
    url.searchParams.set("project_id", projectId);
    url.searchParams.set("page", String(page));
    url.searchParams.set("per_page", String(perPage));

    const { status, data } = await procoreGet(url, accessToken, companyId);
    if (status < 200 || status >= 300) break;

    const items = Array.isArray(data) ? (data as ProcoreCommitment[]) : [];
    all.push(...items);
    if (items.length < perPage) break;
    page++;
  }

  return all;
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("procore_access_token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const companyId = request.nextUrl.searchParams.get("company_id");
    if (!companyId) {
      return NextResponse.json({ error: "company_id is required" }, { status: 400 });
    }

    const diagnostics: Record<string, unknown> = {};

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    // ── Fetch projects ─────────────────────────────────────────────────────────
    const projectsUrl = new URL(`${PROCORE_BASE_URL}/rest/v1.0/projects`);
    projectsUrl.searchParams.set("company_id", companyId);
    projectsUrl.searchParams.set("per_page", "100");

    const projectsResult = await procoreGet(projectsUrl, accessToken, companyId);
    diagnostics["projects_status"] = projectsResult.status;

    const projects = Array.isArray(projectsResult.data)
      ? (projectsResult.data as Array<{ id: number; name: string; display_name?: string }>)
      : [];
    diagnostics["projects_count"] = projects.length;

    // Load hidden / completed from Supabase
    const [hiddenRes, completedRes] = await Promise.all([
      supabase
        .from("resourcing_hidden_projects")
        .select("project_id")
        .eq("company_id", companyId),
      supabase
        .from("resourcing_completed_scopes")
        .select("project_id, commitment_id")
        .eq("company_id", companyId),
    ]);

    const hiddenIds = new Set<string>(
      (hiddenRes.data ?? []).map(r => r.project_id),
    );
    const completedKeys = new Set<string>(
      (completedRes.data ?? []).map(r => `${r.project_id}:${r.commitment_id}`),
    );

    // ── Sequential fetch — one project at a time, 500ms apart ─────────────────
    const projectCommitments: ProjectCommitments[] = [];

    for (const proj of projects.slice(0, 20)) {
      const pid = String(proj.id);
      const projectName = proj.display_name ?? proj.name;

      if (hiddenIds.has(pid)) {
        projectCommitments.push({
          project_id:   pid,
          project_name: projectName,
          is_hidden:    true,
          commitments:  [],
        });
        continue;
      }

      let contracts: ProcoreCommitment[]     = [];
      let purchaseOrders: ProcoreCommitment[] = [];

      try {
        contracts = await fetchCommitments(
          `/rest/v1.0/projects/${pid}/commitments/contracts`,
          pid,
          accessToken,
          companyId,
        );
      } catch { /* leave empty */ }

      try {
        purchaseOrders = await fetchCommitments(
          `/rest/v1.0/commitments/purchase_orders`,
          pid,
          accessToken,
          companyId,
        );
      } catch { /* leave empty */ }

      // Merge — deduplicate by id
      const seen = new Set<number>();
      const all: ProcoreCommitment[] = [];
      for (const c of [...contracts, ...purchaseOrders]) {
        if (!seen.has(c.id)) {
          seen.add(c.id);
          all.push(c);
        }
      }

      projectCommitments.push({
        project_id:   pid,
        project_name: projectName,
        is_hidden:    false,
        commitments:  all.map(c => ({
          ...c,
          is_completed: completedKeys.has(`${pid}:${String(c.id)}`),
        })),
      });

      await sleep(500);
    }

    console.log("[resourcing/commitments] diagnostics:", JSON.stringify(diagnostics));

    return NextResponse.json({
      projects:      projectCommitments,
      hidden_ids:    Array.from(hiddenIds),
      completed_ids: Array.from(completedKeys),
      diagnostics,
    } satisfies CommitmentsResponse);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 502 },
    );
  }
}
