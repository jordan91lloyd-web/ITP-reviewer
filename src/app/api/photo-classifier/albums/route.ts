// GET /api/photo-classifier/albums?project_id=X
// Lists photo albums (image categories) for a project.
// Uses the pinned integration user.

import { NextRequest, NextResponse } from "next/server";
import { getValidToken } from "@/lib/token-store";

export const dynamic = "force-dynamic";

const PROCORE_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

const COMPANY_ID = process.env.FLEEK_COMPANY_ID ?? "";

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function GET(request: NextRequest) {
  const projectId = request.nextUrl.searchParams.get("project_id");
  if (!projectId) {
    return NextResponse.json({ error: "project_id required" }, { status: 400 });
  }

  const userId = process.env.MCP_PROCORE_USER_ID;
  if (!userId) {
    return NextResponse.json({ error: "MCP_PROCORE_USER_ID not configured" }, { status: 500 });
  }

  const token = await getValidToken(COMPANY_ID, userId);
  if (!token) {
    return NextResponse.json({ error: "No valid Procore token" }, { status: 401 });
  }

  const all: { id: number; name: string; count: number }[] = [];
  let page = 1;
  while (true) {
    const url = `${PROCORE_BASE}/rest/v1.0/image_categories?project_id=${projectId}&per_page=100&page=${page}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, "Procore-Company-Id": COMPANY_ID },
    });
    if (!res.ok) break;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    all.push(...data.map((a: { id: number; name: string; count: number }) => ({
      id: a.id, name: a.name, count: a.count ?? 0,
    })));
    if (data.length < 100) break;
    page++;
    await sleep(300);
  }

  return NextResponse.json({ albums: all, total: all.length });
}
