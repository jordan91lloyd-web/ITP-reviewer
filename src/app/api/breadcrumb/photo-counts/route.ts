// ─── GET /api/breadcrumb/photo-counts ────────────────────────────────────────
// Returns the number of photos uploaded to each Procore project in the last
// 7 calendar days.
//
// Query params:
//   company_id   (required)
//   project_ids  (required) — comma-separated Procore project IDs
//
// Returns: { counts: { [project_id: string]: number } }

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PROCORE_API_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

const PER_PAGE = 500;

async function fetchProjectPhotoCount(
  projectId: string,
  companyId: string,
  accessToken: string,
  fromDate: string,
  toDate: string,
): Promise<number> {
  const authHeaders: Record<string, string> = {
    Authorization:        `Bearer ${accessToken}`,
    "Procore-Company-Id": companyId,
  };

  let total = 0;
  let page  = 1;

  while (true) {
    const url = new URL(`${PROCORE_API_BASE}/rest/v1.0/photos`);
    url.searchParams.set("project_id",          projectId);
    url.searchParams.set("filters[created_at]", `${fromDate}..${toDate}`);
    url.searchParams.set("per_page",            String(PER_PAGE));
    url.searchParams.set("page",                String(page));

    const res = await fetch(url.toString(), {
      headers: authHeaders,
      signal:  AbortSignal.timeout(15_000),
    });

    if (!res.ok) return total;

    const data = await res.json();
    const results: unknown[] = Array.isArray(data) ? data : [];
    total += results.length;

    if (results.length < PER_PAGE) break;
    page++;
  }

  return total;
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

    // 7 calendar days ago → today (UTC YYYY-MM-DD)
    const toDate   = new Date().toISOString().slice(0, 10);
    const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    const counts: Record<string, number> = {};
    await Promise.all(
      projectIds.map(async id => {
        counts[id] = await fetchProjectPhotoCount(id, companyId, accessToken, fromDate, toDate);
      })
    );

    return NextResponse.json({ counts });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error", counts: {} },
      { status: 502 },
    );
  }
}
