// ─── GET /api/resourcing/commitments ──────────────────────────────────────────
// Fetches all commitments for one project from Procore, then batch-fetches
// vendor names via /rest/v1.0/vendors?filters[id][]=...
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

// Raw commitment item as returned by Procore
interface RawCommitment {
  id:                        unknown;
  title:                     unknown;
  number:                    unknown;
  status:                    unknown;
  grand_total:               unknown;
  revised_contract_amount:   unknown;
  vendor:                    { id?: number; name?: string } | null | undefined;
  contract_company:          { id?: number; name?: string } | null | undefined;
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated with Procore." }, { status: 401 });
  }

  const companyId = request.nextUrl.searchParams.get("company_id");
  const projectId = request.nextUrl.searchParams.get("project_id");

  if (!companyId || !projectId) {
    return NextResponse.json(
      { error: "company_id and project_id are required" },
      { status: 400 },
    );
  }

  const authHeaders = {
    Authorization:        `Bearer ${accessToken}`,
    "Procore-Company-Id": companyId,
  };

  // ── 1. Fetch all commitments (paginated) ────────────────────────────────────
  const rawItems: RawCommitment[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const url = new URL(`${PROCORE_BASE_URL}/rest/v1.0/commitments`);
    url.searchParams.set("project_id", projectId);
    url.searchParams.set("company_id", companyId);
    url.searchParams.set("per_page",   String(perPage));
    url.searchParams.set("page",       String(page));

    const res = await fetch(url.toString(), {
      headers: authHeaders,
      signal:  AbortSignal.timeout(20_000),
    });

    if (!res.ok) break;

    const data: unknown = await res.json();
    if (!Array.isArray(data)) break;

    rawItems.push(...(data as RawCommitment[]));
    if (data.length < perPage) break;
    page++;
  }

  // Filter draft/void early so we don't look up vendor names we won't use
  const activeItems = rawItems.filter(item => {
    const status = String(item.status ?? "").toLowerCase();
    return status !== "draft" && status !== "void";
  });

  // ── 2. Collect unique vendor IDs ────────────────────────────────────────────
  const vendorIds = [
    ...new Set(
      activeItems
        .map(c => c.vendor?.id ?? c.contract_company?.id)
        .filter((id): id is number => typeof id === "number"),
    ),
  ];

  // ── 3. Batch-fetch vendor names ─────────────────────────────────────────────
  const vendorMap: Record<number, string> = {};

  if (vendorIds.length > 0) {
    const params = new URLSearchParams();
    params.set("company_id", companyId);
    params.set("per_page", "100");
    vendorIds.forEach(id => params.append("filters[id][]", String(id)));

    const vendorUrl = `${PROCORE_BASE_URL}/rest/v1.0/vendors?${params.toString()}`;

    try {
      const vendorRes = await fetch(vendorUrl, {
        headers: authHeaders,
        signal:  AbortSignal.timeout(20_000),
      });

      if (vendorRes.ok) {
        const vendorData: unknown = await vendorRes.json();
        if (Array.isArray(vendorData)) {
          for (const v of vendorData as Array<{ id?: number; name?: string }>) {
            if (typeof v.id === "number" && typeof v.name === "string") {
              vendorMap[v.id] = v.name;
            }
          }
        }
      }
    } catch {
      // Vendor lookup failed — continue with empty names rather than failing
    }
  }

  // ── 4. Build response ────────────────────────────────────────────────────────
  const commitments: Commitment[] = activeItems.map(item => {
    const vendorId   = item.vendor?.id ?? item.contract_company?.id;
    const vendorName = (vendorId != null ? vendorMap[vendorId] : undefined)
      ?? item.vendor?.name
      ?? item.contract_company?.name
      ?? "";

    return {
      id:          String(item.id ?? ""),
      title:       String(item.title ?? item.number ?? ""),
      vendor_name: vendorName,
      status:      String(item.status ?? "").toLowerCase(),
      value:       Number(item.grand_total ?? item.revised_contract_amount ?? 0) || 0,
    };
  });

  return NextResponse.json({ commitments });
}
