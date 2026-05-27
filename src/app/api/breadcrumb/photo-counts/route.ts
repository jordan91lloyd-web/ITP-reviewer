// ─── GET /api/breadcrumb/photo-counts ────────────────────────────────────────
// Returns the number of photos uploaded to each Procore project in the last
// 7 calendar days.
//
// Query params:
//   company_id   (required)
//   project_ids  (required) — comma-separated Procore project IDs
//
// Returns: { counts: { [project_id: string]: number } }
//
// Diagnostic note: logs URL + raw response shape for the first project so we
// can verify the Procore endpoint and filter format via Vercel logs.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PROCORE_API_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

const PER_PAGE = 500;

// ── Try both known endpoint shapes ────────────────────────────────────────────
// Shape A: /rest/v1.0/photos           (company-scoped, project_id as param)
// Shape B: /rest/v1.0/projects/{id}/photos  (project-scoped)
// Date filter: gte/lte separate params (Procore v1 documented format)

async function fetchPageCount(
  url: URL,
  authHeaders: Record<string, string>,
): Promise<{ count: number; rawType: string; status: number }> {
  const res = await fetch(url.toString(), {
    headers: authHeaders,
    signal:  AbortSignal.timeout(15_000),
  });

  const status  = res.status;
  const rawType = res.headers.get("content-type") ?? "unknown";

  if (!res.ok) {
    return { count: 0, rawType: `${status} ${rawType}`, status };
  }

  const data                = await res.json();
  const results: unknown[]  = Array.isArray(data) ? data : [];
  return { count: results.length, rawType, status };
}

async function fetchProjectPhotoCount(
  projectId: string,
  companyId: string,
  accessToken: string,
  fromDate: string,
  toDate: string,
  isFirst: boolean,
): Promise<number> {
  const authHeaders: Record<string, string> = {
    Authorization:        `Bearer ${accessToken}`,
    "Procore-Company-Id": companyId,
  };

  // ── Shape A: /rest/v1.0/photos with gte/lte filters ─────────────────────
  {
    let total = 0;
    let page  = 1;

    while (true) {
      const url = new URL(`${PROCORE_API_BASE}/rest/v1.0/photos`);
      url.searchParams.set("project_id",                    projectId);
      url.searchParams.set("filters[created_at][gte]",      fromDate);
      url.searchParams.set("filters[created_at][lte]",      toDate);
      url.searchParams.set("per_page",                      String(PER_PAGE));
      url.searchParams.set("page",                          String(page));

      const { count, rawType, status } = await fetchPageCount(url, authHeaders);

      if (isFirst && page === 1) {
        console.log(`[photo-counts] Shape A  project=${projectId}  status=${status}  count=${count}  url=${url.toString()}  type=${rawType}`);
      }

      if (status === 404 || status === 403) break; // endpoint not available — try Shape B

      total += count;
      if (count < PER_PAGE) return total;
      page++;
    }

    // If Shape A returned something (even 0 with a 200), trust it
    // Check with a single unfiltered request to see if photos exist at all
    if (isFirst) {
      const probe = new URL(`${PROCORE_API_BASE}/rest/v1.0/photos`);
      probe.searchParams.set("project_id", projectId);
      probe.searchParams.set("per_page",   "1");
      probe.searchParams.set("page",       "1");
      const { count: unfiltered, status: us } = await fetchPageCount(probe, authHeaders);
      console.log(`[photo-counts] Shape A unfiltered probe  project=${projectId}  status=${us}  count=${unfiltered}  (if 0 here, project has no photos at all)`);
    }
  }

  // ── Shape B: /rest/v1.0/projects/{id}/photos with gte/lte filters ────────
  {
    let total = 0;
    let page  = 1;

    while (true) {
      const url = new URL(`${PROCORE_API_BASE}/rest/v1.0/projects/${projectId}/photos`);
      url.searchParams.set("filters[created_at][gte]",  fromDate);
      url.searchParams.set("filters[created_at][lte]",  toDate);
      url.searchParams.set("per_page",                  String(PER_PAGE));
      url.searchParams.set("page",                      String(page));

      const { count, rawType, status } = await fetchPageCount(url, authHeaders);

      if (isFirst && page === 1) {
        console.log(`[photo-counts] Shape B  project=${projectId}  status=${status}  count=${count}  url=${url.toString()}  type=${rawType}`);
      }

      if (status === 404 || status === 403) break;

      total += count;
      if (count < PER_PAGE) return total;
      page++;
    }
  }

  return 0;
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("procore_access_token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const sp          = request.nextUrl.searchParams;
    const companyId   = sp.get("company_id");
    const projectIdsP = sp.get("project_ids");

    if (!companyId || !projectIdsP) {
      return NextResponse.json(
        { error: "company_id and project_ids are required" },
        { status: 400 },
      );
    }

    const projectIds = projectIdsP.split(",").map(s => s.trim()).filter(Boolean);
    if (projectIds.length === 0) {
      return NextResponse.json({ counts: {} });
    }

    // 7 calendar days ago → today (YYYY-MM-DD, no time component)
    const toDate   = new Date().toISOString().slice(0, 10);
    const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    console.log(`[photo-counts] date range: ${fromDate}..${toDate}  projects: ${projectIds.join(",")}`);

    const counts: Record<string, number> = {};
    await Promise.all(
      projectIds.map(async (id, idx) => {
        counts[id] = await fetchProjectPhotoCount(
          id, companyId, accessToken, fromDate, toDate,
          idx === 0, // only log diagnostics for first project
        );
      })
    );

    console.log(`[photo-counts] results: ${JSON.stringify(counts)}`);

    return NextResponse.json({ counts });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error", counts: {} },
      { status: 502 },
    );
  }
}
