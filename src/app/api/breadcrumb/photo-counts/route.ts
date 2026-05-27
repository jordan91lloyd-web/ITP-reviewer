// ─── GET /api/breadcrumb/photo-counts ────────────────────────────────────────
// Returns the number of photos uploaded to each Procore project in the last
// 7 calendar days.
//
// Query params:
//   company_id   (required)
//   project_ids  (required) — comma-separated Procore project IDs
//
// Returns:
//   { counts: { [project_id]: number },
//     debug:  { [project_id]: { unfiltered: number, filtered: number } } }
//
// Debug response lets callers see whether the endpoint returns ANY photos at
// all (unfiltered) vs photos in the date window (filtered), so we can tell
// whether 0 is caused by a bad date filter or a bad endpoint/company_id.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PROCORE_API_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

const PER_PAGE = 500;

// ── Fetch one page, return count + status ─────────────────────────────────────

async function fetchPage(
  url: URL,
  authHeaders: Record<string, string>,
): Promise<{ count: number; status: number }> {
  const res = await fetch(url.toString(), {
    headers: authHeaders,
    signal:  AbortSignal.timeout(15_000),
  });
  if (!res.ok) return { count: 0, status: res.status };
  const data           = await res.json();
  const results: unknown[] = Array.isArray(data) ? data : [];
  return { count: results.length, status: res.status };
}

// ── Paginate through all results for a given base URL ─────────────────────────

async function paginateCount(
  base: URL,
  authHeaders: Record<string, string>,
): Promise<number> {
  let total = 0;
  let page  = 1;

  while (true) {
    const url = new URL(base.toString());
    url.searchParams.set("per_page", String(PER_PAGE));
    url.searchParams.set("page",     String(page));

    const { count, status } = await fetchPage(url, authHeaders);
    if (status !== 200) break;

    total += count;
    if (count < PER_PAGE) break;
    page++;
  }

  return total;
}

// ── Per-project fetch: unfiltered then filtered ────────────────────────────────

async function fetchProjectCounts(
  projectId: string,
  companyId: string,
  accessToken: string,
  fromDate: string,
  toDate: string,
  isFirst: boolean,
): Promise<{ unfiltered: number; filtered: number }> {
  const authHeaders: Record<string, string> = {
    Authorization:        `Bearer ${accessToken}`,
    // company_id MUST appear in both header and query param (Procore rule)
    "Procore-Company-Id": companyId,
  };

  // ── Unfiltered probe (1 page, no date) — confirm endpoint works ──────────
  const probeUrl = new URL(`${PROCORE_API_BASE}/rest/v1.0/photos`);
  probeUrl.searchParams.set("project_id", projectId);
  probeUrl.searchParams.set("company_id", companyId);   // required as query param too
  probeUrl.searchParams.set("per_page",   "1");
  probeUrl.searchParams.set("page",       "1");

  const { count: probeCount, status: probeStatus } = await fetchPage(probeUrl, authHeaders);

  if (isFirst) {
    console.log(
      `[photo-counts] unfiltered probe  project=${projectId}  status=${probeStatus}  hasPhotos=${probeCount > 0}  url=${probeUrl.toString()}`
    );
  }

  // If endpoint itself doesn't work (404/403/401), return early
  if (probeStatus === 404 || probeStatus === 403 || probeStatus === 401) {
    if (isFirst) console.log(`[photo-counts] endpoint unavailable status=${probeStatus}`);
    return { unfiltered: 0, filtered: 0 };
  }

  // ── Full unfiltered count ─────────────────────────────────────────────────
  const unfilteredBase = new URL(`${PROCORE_API_BASE}/rest/v1.0/photos`);
  unfilteredBase.searchParams.set("project_id", projectId);
  unfilteredBase.searchParams.set("company_id", companyId);

  const unfiltered = await paginateCount(unfilteredBase, authHeaders);

  // ── Filtered count (gte/lte, YYYY-MM-DD) ─────────────────────────────────
  const filteredBase = new URL(`${PROCORE_API_BASE}/rest/v1.0/photos`);
  filteredBase.searchParams.set("project_id",               projectId);
  filteredBase.searchParams.set("company_id",               companyId);
  filteredBase.searchParams.set("filters[created_at][gte]", fromDate);
  filteredBase.searchParams.set("filters[created_at][lte]", toDate);

  const filtered = await paginateCount(filteredBase, authHeaders);

  if (isFirst) {
    console.log(
      `[photo-counts] project=${projectId}  unfiltered=${unfiltered}  filtered=${filtered}  range=${fromDate}..${toDate}`
    );
  }

  return { unfiltered, filtered };
}

// ── Handler ───────────────────────────────────────────────────────────────────

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
      return NextResponse.json({ counts: {}, debug: {} });
    }

    // 7 calendar days ago → today (YYYY-MM-DD, no time component)
    const toDate   = new Date().toISOString().slice(0, 10);
    const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    console.log(`[photo-counts] company=${companyId}  range=${fromDate}..${toDate}  projects=${projectIds.join(",")}`);

    const counts: Record<string, number>                                    = {};
    const debug:  Record<string, { unfiltered: number; filtered: number }>  = {};

    await Promise.all(
      projectIds.map(async (id, idx) => {
        const result  = await fetchProjectCounts(id, companyId, accessToken, fromDate, toDate, idx === 0);
        counts[id]    = result.filtered;
        debug[id]     = result;
      })
    );

    return NextResponse.json({ counts, debug });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error", counts: {}, debug: {} },
      { status: 502 },
    );
  }
}
