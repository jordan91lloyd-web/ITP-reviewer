// ─── GET /api/resourcing/commitments ──────────────────────────────────────────
// Fetches subcontract commitments for ONE project from Procore.
// Tries both /commitments/contracts and /commitments/purchase_orders.
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

async function fetchEndpoint(
  path: string,
  projectId: string,
  companyId: string,
  accessToken: string,
): Promise<Commitment[]> {
  const url = new URL(`${PROCORE_BASE_URL}${path}`);
  url.searchParams.set("project_id", projectId);
  url.searchParams.set("company_id", companyId);
  url.searchParams.set("per_page", "100");

  const res = await fetch(url.toString(), {
    headers: {
      Authorization:        `Bearer ${accessToken}`,
      "Procore-Company-Id": companyId,
    },
    signal: AbortSignal.timeout(20_000),
  });

  if (!res.ok) return [];

  const data: unknown = await res.json();
  if (!Array.isArray(data)) return [];

  return (data as Record<string, unknown>[])
    .map(item => {
      const vendor =
        (item.vendor as Record<string, unknown> | null)?.name ??
        (item.contract_company as Record<string, unknown> | null)?.name ??
        "";
      const value =
        Number(item.grand_total ?? item.revised_contract_amount ?? 0) || 0;
      const status = String(item.status ?? "").toLowerCase();

      return {
        id:          String(item.id ?? ""),
        title:       String(item.title ?? item.number ?? ""),
        vendor_name: String(vendor),
        status,
        value,
      };
    })
    .filter(c => c.status !== "draft" && c.status !== "void");
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

  const [contracts, purchaseOrders] = await Promise.all([
    fetchEndpoint(
      "/rest/v1.0/commitments/contracts",
      projectId, companyId, accessToken,
    ),
    fetchEndpoint(
      "/rest/v1.0/commitments/purchase_orders",
      projectId, companyId, accessToken,
    ),
  ]);

  // Deduplicate by id
  const seen = new Set<string>();
  const commitments: Commitment[] = [];
  for (const c of [...contracts, ...purchaseOrders]) {
    if (!seen.has(c.id)) {
      seen.add(c.id);
      commitments.push(c);
    }
  }

  return NextResponse.json({ commitments });
}
