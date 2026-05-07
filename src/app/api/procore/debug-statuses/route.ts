// ─── GET /api/procore/debug-statuses?project_id=X&company_id=Y ───────────────
// Temporary debug endpoint — shows what status/inspection_type values Procore
// actually returns for a project's checklist/lists.
// Remove once In Review tab filtering is confirmed.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PROCORE_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("procore_access_token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Not authenticated with Procore." }, { status: 401 });
    }

    const sp        = request.nextUrl.searchParams;
    const projectId = sp.get("project_id");
    const companyId = sp.get("company_id");

    if (!projectId || !companyId) {
      return NextResponse.json({ error: "project_id and company_id are required." }, { status: 400 });
    }

    const res = await fetch(
      `${PROCORE_BASE}/rest/v1.0/projects/${projectId}/checklist/lists?per_page=100`,
      {
        headers: {
          Authorization:        `Bearer ${accessToken}`,
          "Procore-Company-Id": companyId,
        },
        signal: AbortSignal.timeout(15_000),
      }
    );

    if (!res.ok) {
      const body = await res.text().catch(() => "(unreadable)");
      return NextResponse.json({ error: `Procore returned ${res.status}`, body }, { status: 502 });
    }

    const data: unknown[] = await res.json();
    const inspections = Array.isArray(data) ? data : [];

    // Unique status values with counts
    const statusCounts = new Map<string, number>();
    for (const insp of inspections) {
      const s = String((insp as Record<string, unknown>).status ?? "null");
      statusCounts.set(s, (statusCounts.get(s) ?? 0) + 1);
    }

    // Unique inspection_type values
    const inspectionTypes = new Set<string>();
    for (const insp of inspections) {
      const t = (insp as Record<string, unknown>).inspection_type;
      if (t != null) inspectionTypes.add(JSON.stringify(t));
    }

    return NextResponse.json({
      total:           inspections.length,
      statusCounts:    Object.fromEntries(statusCounts),
      inspectionTypes: Array.from(inspectionTypes).map(t => { try { return JSON.parse(t); } catch { return t; } }),
      sample:          inspections.slice(0, 3),
    });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
