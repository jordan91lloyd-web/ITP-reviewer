// ─── GET /api/resourcing/debug ────────────────────────────────────────────────
// Temporary diagnostic route. Returns raw Procore responses for the first
// project's commitments/contracts and commitments/purchase_orders endpoints.
//
// Usage: GET /api/resourcing/debug?company_id=598134325535477

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PROCORE_BASE_URL =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

async function procoreFetch(url: URL, accessToken: string, companyId: string) {
  const res = await fetch(url.toString(), {
    headers: {
      Authorization:        `Bearer ${accessToken}`,
      "Procore-Company-Id": companyId,
    },
    signal: AbortSignal.timeout(20_000),
  });
  let data: unknown = null;
  try { data = await res.json(); } catch { /* ignore */ }
  return { status: res.status, data };
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const companyId = request.nextUrl.searchParams.get("company_id");
  if (!companyId) {
    return NextResponse.json({ error: "company_id is required" }, { status: 400 });
  }

  // ── 1. Fetch projects ──────────────────────────────────────────────────────
  const projectsUrl = new URL(`${PROCORE_BASE_URL}/rest/v1.0/projects`);
  projectsUrl.searchParams.set("company_id", companyId);
  projectsUrl.searchParams.set("per_page", "5");

  const projectsResult = await procoreFetch(projectsUrl, accessToken, companyId);
  const projects = Array.isArray(projectsResult.data)
    ? (projectsResult.data as Array<{ id: number; name: string }>)
    : [];

  const firstProject = projects[0] ?? null;

  if (!firstProject) {
    return NextResponse.json({
      projects_url:    projectsUrl.toString(),
      projects_status: projectsResult.status,
      projects_count:  projects.length,
      projects_raw:    projectsResult.data,
      first_project:   null,
      contracts_status:        null,
      contracts_count:         null,
      contracts_sample:        null,
      purchase_orders_status:  null,
      purchase_orders_count:   null,
      purchase_orders_sample:  null,
    });
  }

  const pid = String(firstProject.id);

  // ── 2. contracts ──────────────────────────────────────────────────────────
  const contractsUrl = new URL(
    `${PROCORE_BASE_URL}/rest/v1.0/projects/${pid}/commitments/contracts`,
  );
  contractsUrl.searchParams.set("company_id", companyId);
  contractsUrl.searchParams.set("per_page", "100");

  const contractsResult = await procoreFetch(contractsUrl, accessToken, companyId);
  const contracts = Array.isArray(contractsResult.data)
    ? (contractsResult.data as unknown[])
    : [];

  // ── 3. purchase_orders ────────────────────────────────────────────────────
  const poUrl = new URL(`${PROCORE_BASE_URL}/rest/v1.0/commitments/purchase_orders`);
  poUrl.searchParams.set("company_id", companyId);
  poUrl.searchParams.set("project_id", pid);
  poUrl.searchParams.set("per_page", "100");

  const poResult = await procoreFetch(poUrl, accessToken, companyId);
  const pos = Array.isArray(poResult.data) ? (poResult.data as unknown[]) : [];

  return NextResponse.json({
    projects_url:    projectsUrl.toString(),
    projects_status: projectsResult.status,
    projects_count:  projects.length,
    first_project:   { id: firstProject.id, name: firstProject.name },

    contracts_url:    contractsUrl.toString(),
    contracts_status: contractsResult.status,
    contracts_count:  contracts.length,
    contracts_sample: contracts[0] ?? null,

    purchase_orders_url:    poUrl.toString(),
    purchase_orders_status: poResult.status,
    purchase_orders_count:  pos.length,
    purchase_orders_sample: pos[0] ?? null,
  });
}
