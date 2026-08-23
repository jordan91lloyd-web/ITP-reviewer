// ─── GET /api/procore/debug-action-plans ──────────────────────────────────────
// Throwaway discovery route. Probes candidate Action Plans API paths on Procore
// and returns a structured summary of what responds 200.
//
// Usage (browser, while logged in):
//   /api/procore/debug-action-plans?project_id=123&company_id=456
//
// Read-only. No writes to Procore. No UI.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PROCORE_ENV = process.env.PROCORE_ENV ?? "sandbox";
const PROCORE_BASE_URL =
  process.env.PROCORE_API_BASE_URL ??
  (PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com");

interface ProbeResult {
  path: string;
  status: number;
  ok: boolean;
  record_count: number | null;
  first_record_fields: string[] | null;
  first_three_records: unknown[] | null;
  error: string | null;
}

async function probe(
  accessToken: string,
  path: string,
  companyId: string
): Promise<ProbeResult> {
  try {
    const url = new URL(`${PROCORE_BASE_URL}${path}`);
    url.searchParams.set("company_id", companyId);

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Procore-Company-Id": companyId,
      },
    });

    const status = res.status;

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return {
        path,
        status,
        ok: false,
        record_count: null,
        first_record_fields: null,
        first_three_records: null,
        error: body.slice(0, 500),
      };
    }

    const json = await res.json();

    // Procore may return a bare array or a wrapped object
    const records: unknown[] = Array.isArray(json)
      ? json
      : Array.isArray(json?.data)
        ? json.data
        : [];

    const first = records[0];
    const firstFields =
      first && typeof first === "object" && first !== null
        ? Object.keys(first as Record<string, unknown>).sort()
        : null;

    return {
      path,
      status,
      ok: true,
      record_count: records.length,
      first_record_fields: firstFields,
      first_three_records: records.slice(0, 3),
      error: null,
    };
  } catch (err) {
    return {
      path,
      status: 0,
      ok: false,
      record_count: null,
      first_record_fields: null,
      first_three_records: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json(
      { error: "Not authenticated with Procore." },
      { status: 401 }
    );
  }

  const sp = request.nextUrl.searchParams;
  const projectId = sp.get("project_id");
  const companyId = sp.get("company_id");

  if (!projectId || !companyId) {
    return NextResponse.json(
      { error: "project_id and company_id query params are required." },
      { status: 400 }
    );
  }

  const candidatePaths = [
    `/rest/v1.0/projects/${projectId}/action_plans/plans`,
    `/rest/v1.0/projects/${projectId}/action_plans`,
    `/rest/v1.0/projects/${projectId}/action_plan_templates`,
    `/rest/v1.0/projects/${projectId}/action_plans/plan_templates`,
    `/rest/v1.1/projects/${projectId}/action_plans/plans`,
    `/rest/v1.0/projects/${projectId}/action_plans/plan_items`,
  ];

  const results: ProbeResult[] = [];
  for (const path of candidatePaths) {
    results.push(await probe(accessToken, path, companyId));
  }

  // Follow-up: fetch detail for the first successful record that has an id
  let firstPlanDetail: unknown = null;
  for (const r of results) {
    if (!r.ok || !r.first_three_records?.length) continue;
    const first = r.first_three_records[0] as Record<string, unknown> | null;
    if (!first?.id) continue;

    // Build a detail path by appending /id to the list path
    const detailPath = `${r.path}/${first.id}`;
    try {
      const url = new URL(`${PROCORE_BASE_URL}${detailPath}`);
      url.searchParams.set("company_id", companyId);

      const res = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "Procore-Company-Id": companyId,
        },
      });

      if (res.ok) {
        firstPlanDetail = await res.json();
      } else {
        firstPlanDetail = {
          detail_path: detailPath,
          status: res.status,
          error: (await res.text().catch(() => "")).slice(0, 500),
        };
      }
    } catch (err) {
      firstPlanDetail = {
        detail_path: detailPath,
        error: err instanceof Error ? err.message : String(err),
      };
    }
    break;
  }

  // Trim to stay under 100KB
  const body = JSON.stringify(
    { results, first_plan_detail: firstPlanDetail },
    null,
    2
  );
  if (body.length > 100_000) {
    return new NextResponse(body.slice(0, 100_000), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return NextResponse.json({ results, first_plan_detail: firstPlanDetail });
}
