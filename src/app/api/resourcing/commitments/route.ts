// ─── GET /api/resourcing/commitments ──────────────────────────────────────────
// Fetches subcontract commitments from Procore across all visible projects for
// the given company, merges with hidden-project and completed-scope records from
// Supabase, and returns data shaped for the Resourcing tab conflict matrix.
//
// Tries two Procore endpoints per project:
//   - /rest/v1.0/projects/{id}/commitments/contracts  (subcontracts)
//   - /rest/v1.0/commitments/purchase_orders          (purchase orders)
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
  diagnostics:   Record<string, unknown>;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function fetchPage(
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
  let data: unknown;
  try { data = await res.json(); } catch { data = null; }
  return { status: res.status, data };
}

// Fetches all pages from a project-scoped endpoint.
// Returns { items, status, firstItemKeys }
async function fetchPaged(
  endpoint: string,
  projectId: string,
  accessToken: string,
  companyId: string,
  diag: Record<string, unknown>,
  diagKey: string,
): Promise<ProcoreCommitment[]> {
  const all: ProcoreCommitment[] = [];
  let page = 1;
  const perPage = 100;
  let firstStatus = 0;
  let firstItemKeys: string[] = [];

  while (true) {
    const url = new URL(`${PROCORE_BASE_URL}${endpoint}`);
    url.searchParams.set("company_id", companyId);
    url.searchParams.set("project_id", projectId);
    url.searchParams.set("page", String(page));
    url.searchParams.set("per_page", String(perPage));

    const fullUrl = url.toString();
    if (page === 1) {
      diag[`${diagKey}_url`] = fullUrl;
    }

    const { status, data } = await fetchPage(url, accessToken, companyId);
    if (page === 1) {
      firstStatus = status;
      diag[`${diagKey}_status`] = status;
    }

    if (status < 200 || status >= 300) break;

    const items = Array.isArray(data) ? (data as ProcoreCommitment[]) : [];

    if (page === 1 && items.length > 0) {
      firstItemKeys = Object.keys(items[0] as object);
      diag[`${diagKey}_first_item_keys`] = firstItemKeys;
    }

    all.push(...items);
    if (items.length < perPage) break;
    page++;
  }

  diag[`${diagKey}_count`] = all.length;
  void firstStatus; // used for diag only
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

    // ── Fetch projects from Procore ────────────────────────────────────────────
    // company_id as BOTH query param AND header (CLAUDE.md rule 3)
    const projectsUrl = new URL(`${PROCORE_BASE_URL}/rest/v1.0/projects`);
    projectsUrl.searchParams.set("company_id", companyId);
    diagnostics["projects_url"] = projectsUrl.toString();

    const projectsResult = await fetchPage(projectsUrl, accessToken, companyId);
    diagnostics["projects_status"] = projectsResult.status;

    const projects = Array.isArray(projectsResult.data)
      ? (projectsResult.data as Array<{ id: number; name: string; display_name?: string }>)
      : [];
    diagnostics["projects_count"] = projects.length;

    // Load hidden / completed from Supabase in parallel
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

    // Cap at 20 projects
    const visibleProjects = projects.slice(0, 20);

    const projectCommitments = await Promise.all(
      visibleProjects.map(async (proj, idx): Promise<ProjectCommitments> => {
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

        // For the first project only: full diagnostics
        const projDiag: Record<string, unknown> = {};
        const isFirst = idx === 0;

        let contracts: ProcoreCommitment[]     = [];
        let purchaseOrders: ProcoreCommitment[] = [];

        try {
          // Subcontracts: /rest/v1.0/projects/{id}/commitments/contracts
          contracts = await fetchPaged(
            `/rest/v1.0/projects/${pid}/commitments/contracts`,
            pid,
            accessToken,
            companyId,
            isFirst ? projDiag : {},
            "contracts",
          );
        } catch (e) {
          if (isFirst) projDiag["contracts_error"] = String(e);
        }

        try {
          // Purchase orders: /rest/v1.0/commitments/purchase_orders?project_id=
          purchaseOrders = await fetchPaged(
            `/rest/v1.0/commitments/purchase_orders`,
            pid,
            accessToken,
            companyId,
            isFirst ? projDiag : {},
            "purchase_orders",
          );
        } catch (e) {
          if (isFirst) projDiag["purchase_orders_error"] = String(e);
        }

        if (isFirst) {
          diagnostics["first_project_id"]   = pid;
          diagnostics["first_project_name"] = proj.display_name ?? proj.name;
          diagnostics["first_project"]      = projDiag;
        }

        // Merge — deduplicate by id
        const seen = new Set<number>();
        const all: ProcoreCommitment[] = [];
        for (const c of [...contracts, ...purchaseOrders]) {
          if (!seen.has(c.id)) {
            seen.add(c.id);
            all.push(c);
          }
        }

        return {
          project_id:   pid,
          project_name: proj.display_name ?? proj.name,
          is_hidden:    false,
          commitments:  all.map(c => ({
            ...c,
            is_completed: completedKeys.has(`${pid}:${String(c.id)}`),
          })),
        };
      }),
    );

    // Console log diagnostics server-side
    console.log("[resourcing/commitments] diagnostics:", JSON.stringify(diagnostics, null, 2));

    const response: CommitmentsResponse = {
      projects:      projectCommitments,
      hidden_ids:    Array.from(hiddenIds),
      completed_ids: Array.from(completedKeys),
      diagnostics,
    };

    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 502 },
    );
  }
}
