// ─── GET /api/breadcrumb/photo-counts ────────────────────────────────────────
// Probes three candidate Procore image/photo endpoints to find which one works.
// Only uses the first project_id; ignores date filters entirely.
//
// Query params:
//   company_id   (required)
//   project_ids  (required) — comma-separated; only first is used for the probe
//
// Returns:
//   { attempt1, attempt2, attempt3 }
//   each: { status: number, count: number, sample: unknown }

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PROCORE_API_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

interface AttemptResult {
  url:    string;
  status: number;
  count:  number;
  sample: unknown;
}

async function probe(
  url: URL,
  authHeaders: Record<string, string>,
): Promise<AttemptResult> {
  try {
    const res    = await fetch(url.toString(), { headers: authHeaders, signal: AbortSignal.timeout(15_000) });
    const status = res.status;
    let count    = 0;
    let sample: unknown = null;

    try {
      const body = await res.json();
      const arr  = Array.isArray(body) ? body : (Array.isArray(body?.data) ? body.data : []);
      count      = arr.length;
      sample     = arr[0] ?? body;
    } catch {
      sample = "(non-JSON body)";
    }

    console.log(`[photo-probe] ${url.toString()}  status=${status}  count=${count}`);
    return { url: url.toString(), status, count, sample };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.log(`[photo-probe] ${url.toString()}  error=${msg}`);
    return { url: url.toString(), status: 0, count: 0, sample: msg };
  }
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const sp          = request.nextUrl.searchParams;
  const companyId   = sp.get("company_id");
  const projectIdsP = sp.get("project_ids");

  if (!companyId || !projectIdsP) {
    return NextResponse.json({ error: "company_id and project_ids are required" }, { status: 400 });
  }

  const projectId = projectIdsP.split(",")[0].trim();
  if (!projectId) {
    return NextResponse.json({ error: "No project_id found" }, { status: 400 });
  }

  const authHeaders: Record<string, string> = {
    Authorization:        `Bearer ${accessToken}`,
    "Procore-Company-Id": companyId,
  };

  // ── Attempt 1: /rest/v1.0/images ─────────────────────────────────────────
  const url1 = new URL(`${PROCORE_API_BASE}/rest/v1.0/images`);
  url1.searchParams.set("project_id", projectId);
  url1.searchParams.set("per_page",   "5");

  // ── Attempt 2: /rest/v1.0/projects/{id}/images ────────────────────────────
  const url2 = new URL(`${PROCORE_API_BASE}/rest/v1.0/projects/${projectId}/images`);
  url2.searchParams.set("per_page", "5");

  // ── Attempt 3: /rest/v1.0/projects/{id}/photos ────────────────────────────
  const url3 = new URL(`${PROCORE_API_BASE}/rest/v1.0/projects/${projectId}/photos`);
  url3.searchParams.set("per_page", "5");

  const [attempt1, attempt2, attempt3] = await Promise.all([
    probe(url1, authHeaders),
    probe(url2, authHeaders),
    probe(url3, authHeaders),
  ]);

  return NextResponse.json({ projectId, attempt1, attempt2, attempt3 });
}
