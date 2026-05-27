import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const COMPANY_ID = "598134325535477";
const BASE = process.env.PROCORE_ENV === "production"
  ? "https://api.procore.com"
  : "https://sandbox.procore.com";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("procore_access_token")?.value;
  if (!token) return NextResponse.json({ error: "not authenticated" }, { status: 401 });

  const projectId = request.nextUrl.searchParams.get("project_id");
  if (!projectId) return NextResponse.json({ error: "project_id required" }, { status: 400 });

  const url = new URL(`${BASE}/rest/v1.0/photos`);
  url.searchParams.set("project_id", projectId);
  url.searchParams.set("company_id", COMPANY_ID);
  url.searchParams.set("per_page",   "5");

  const res = await fetch(url.toString(), {
    headers: {
      Authorization:        `Bearer ${token}`,
      "Procore-Company-Id": COMPANY_ID,
    },
  });

  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("content-type") ?? "application/json" },
  });
}
