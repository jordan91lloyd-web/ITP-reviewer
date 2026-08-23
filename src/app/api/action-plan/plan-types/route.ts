// ─── GET /api/action-plan/plan-types ──────────────────────────────────────
// Proxies the Procore Action Plan plan_types endpoint (company scope).
// Returns { plan_types: [...] }.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PROCORE_ENV = process.env.PROCORE_ENV ?? "sandbox";
const PROCORE_BASE_URL =
  process.env.PROCORE_API_BASE_URL ??
  (PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com");

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated with Procore." }, { status: 401 });
  }

  const companyId = request.nextUrl.searchParams.get("company_id");
  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  try {
    const url = new URL(`${PROCORE_BASE_URL}/rest/v1.0/companies/${companyId}/action_plans/plan_types`);
    url.searchParams.set("company_id", companyId);

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Procore-Company-Id": companyId,
      },
    });

    if (!res.ok) {
      const body = await res.text();
      return NextResponse.json(
        { error: `Procore API error ${res.status}: ${body.slice(0, 500)}` },
        { status: res.status }
      );
    }

    const json = await res.json();
    const planTypes = Array.isArray(json) ? json : (json?.data ?? []);

    return NextResponse.json({ plan_types: planTypes });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
