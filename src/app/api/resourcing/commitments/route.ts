// ─── GET /api/resourcing/commitments ──────────────────────────────────────────
// Fetches all commitments for one project from Procore.
//
// Query params:
//   company_id  (required)
//   project_id  (required)

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PROCORE_BASE_URL =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

export interface Commitment {
  id:          string;
  title:       string;
  vendor_name: string;
  status:      string;
  value:       number;
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const sp        = request.nextUrl.searchParams;
  const companyId = sp.get("company_id");
  const projectId = sp.get("project_id");

  if (!companyId || !projectId) {
    return NextResponse.json(
      { error: "company_id and project_id are required" },
      { status: 400 },
    );
  }

  const commitments: Commitment[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const url = new URL(`${PROCORE_BASE_URL}/rest/v1.0/commitments`);
    url.searchParams.set("project_id", projectId);
    url.searchParams.set("per_page",   String(perPage));
    url.searchParams.set("page",       String(page));

    const res = await fetch(url.toString(), {
      headers: {
        Authorization:        `Bearer ${accessToken}`,
        "Procore-Company-Id": companyId,
      },
      signal: AbortSignal.timeout(20_000),
    });

    if (!res.ok) break;

    const data: unknown = await res.json();
    if (!Array.isArray(data)) break;

    const items = data as Record<string, unknown>[];
    for (const item of items) {
      const status = String(item.status ?? "").toLowerCase();
      if (status === "draft" || status === "void") continue;

      const vendor = item.vendor as Record<string, unknown> | null | undefined;
      const vendorName = String(vendor?.name ?? "");
      const value = Number(item.grand_total ?? item.revised_contract_amount ?? 0) || 0;

      commitments.push({
        id:          String(item.id ?? ""),
        title:       String(item.title ?? item.number ?? ""),
        vendor_name: vendorName,
        status,
        value,
      });
    }

    if (items.length < perPage) break;
    page++;
  }

  return NextResponse.json({ commitments });
}
