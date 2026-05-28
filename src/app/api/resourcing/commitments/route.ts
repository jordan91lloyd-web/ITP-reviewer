// ─── GET /api/resourcing/commitments ──────────────────────────────────────────
// Fetches subcontract commitments from Procore across all visible projects for
// the given company, merges with hidden-project and completed-scope records from
// Supabase, and returns data shaped for the Resourcing tab conflict matrix.
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
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function procoreGet<T>(
  path: string,
  accessToken: string,
  companyId: string,
): Promise<T> {
  const url = new URL(`${PROCORE_BASE_URL}${path}`);
  url.searchParams.set("company_id", companyId);

  const res = await fetch(url.toString(), {
    headers: {
      Authorization:        `Bearer ${accessToken}`,
      "Procore-Company-Id": companyId,
    },
    signal: AbortSignal.timeout(20_000),
  });

  if (!res.ok) {
    throw new Error(`Procore ${path} returned ${res.status}`);
  }
  return res.json() as Promise<T>;
}

async function fetchAllCommitments(
  projectId: string,
  accessToken: string,
  companyId: string,
): Promise<ProcoreCommitment[]> {
  const all: ProcoreCommitment[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const url = new URL(
      `${PROCORE_BASE_URL}/rest/v1.0/projects/${projectId}/commitments/contracts`,
    );
    url.searchParams.set("company_id", companyId);
    url.searchParams.set("page", String(page));
    url.searchParams.set("per_page", String(perPage));

    const res = await fetch(url.toString(), {
      headers: {
        Authorization:        `Bearer ${accessToken}`,
        "Procore-Company-Id": companyId,
      },
      signal: AbortSignal.timeout(20_000),
    });

    if (!res.ok) break;

    const data: ProcoreCommitment[] = await res.json();
    all.push(...data);

    if (data.length < perPage) break;
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

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    // Load hidden projects and completed scopes from Supabase in parallel
    const [hiddenRes, completedRes, projectsRes] = await Promise.all([
      supabase
        .from("resourcing_hidden_projects")
        .select("project_id")
        .eq("company_id", companyId),
      supabase
        .from("resourcing_completed_scopes")
        .select("project_id, commitment_id")
        .eq("company_id", companyId),
      procoreGet<Array<{ id: number; name: string; display_name?: string }>>(
        `/rest/v1.0/projects`,
        accessToken,
        companyId,
      ),
    ]);

    const hiddenIds = new Set<string>(
      (hiddenRes.data ?? []).map(r => r.project_id),
    );
    const completedKeys = new Set<string>(
      (completedRes.data ?? []).map(r => `${r.project_id}:${r.commitment_id}`),
    );

    const projects = Array.isArray(projectsRes) ? projectsRes : [];

    // Fetch commitments for all non-hidden projects in parallel (cap at 20 projects)
    const visibleProjects = projects.slice(0, 20);

    const projectCommitments = await Promise.all(
      visibleProjects.map(async (proj): Promise<ProjectCommitments> => {
        const pid = String(proj.id);
        const isHidden = hiddenIds.has(pid);
        if (isHidden) {
          return {
            project_id:   pid,
            project_name: proj.display_name ?? proj.name,
            is_hidden:    true,
            commitments:  [],
          };
        }

        let commitments: ProcoreCommitment[] = [];
        try {
          commitments = await fetchAllCommitments(pid, accessToken, companyId);
        } catch {
          // Return empty on error — don't fail the whole response
        }

        return {
          project_id:   pid,
          project_name: proj.display_name ?? proj.name,
          is_hidden:    false,
          commitments:  commitments.map(c => ({
            ...c,
            is_completed: completedKeys.has(`${pid}:${String(c.id)}`),
          })),
        };
      }),
    );

    const response: CommitmentsResponse = {
      projects:      projectCommitments,
      hidden_ids:    Array.from(hiddenIds),
      completed_ids: Array.from(completedKeys),
    };

    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 502 },
    );
  }
}
