// GET /api/holdpoint/procore-documents?company_id=X&project_id=Y
// TEMPORARY DEBUG VERSION 2 — captures file shape and subfolder shape
// Remove fs.writeFileSync once confirmed.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const PROCORE_BASE = process.env.PROCORE_ENV === "production"
  ? "https://api.procore.com"
  : "https://sandbox.procore.com";

async function requireAuth(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("procore_access_token")?.value ?? null;
}

async function get(url: string, H: Record<string, string>) {
  const res = await fetch(url, { headers: H });
  const text = await res.text();
  let body: unknown = text;
  try { body = JSON.parse(text); } catch { /* keep raw */ }
  return { status: res.status, headers: Object.fromEntries(res.headers.entries()), body };
}

export async function GET(request: NextRequest) {
  const token = await requireAuth();
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const companyId = request.nextUrl.searchParams.get("company_id");
  const projectId = request.nextUrl.searchParams.get("project_id");
  if (!companyId || !projectId) {
    return NextResponse.json({ error: "company_id and project_id required" }, { status: 400 });
  }

  const H: Record<string, string> = {
    Authorization:        `Bearer ${token}`,
    "Procore-Company-Id": companyId,
  };

  const debug: Record<string, unknown> = { company_id: companyId, project_id: projectId, captured_at: new Date().toISOString() };

  // ── A. Folders root (already confirmed shape) ─────────────────────────────
  debug.A_folders_root = await get(
    `${PROCORE_BASE}/rest/v1.0/folders?company_id=${encodeURIComponent(companyId)}&project_id=${encodeURIComponent(projectId)}&per_page=100`,
    H,
  );

  // ── B. Fetch "Schedules" folder (id=598134463870146) — has_children_files:true, no subfolders
  //       Expect its files[] to be populated with real file objects ────────────
  debug.B_schedules_folder = await get(
    `${PROCORE_BASE}/rest/v1.0/folders/598134463870146?company_id=${encodeURIComponent(companyId)}&project_id=${encodeURIComponent(projectId)}`,
    H,
  );

  // ── C. Fetch "05 Design & Documentation" folder (id=598134465958570) — has subfolders
  //       Expect folders[] to be populated with "1. Project Reports" etc. ─────
  debug.C_design_docs_folder = await get(
    `${PROCORE_BASE}/rest/v1.0/folders/598134465958570?company_id=${encodeURIComponent(companyId)}&project_id=${encodeURIComponent(projectId)}`,
    H,
  );

  // ── D. Fetch documents endpoint page 10 (per_page=100) to find file items ─
  debug.D_documents_page10_per100 = await get(
    `${PROCORE_BASE}/rest/v1.0/documents?company_id=${encodeURIComponent(companyId)}&project_id=${encodeURIComponent(projectId)}&per_page=100&page=10`,
    H,
  );

  // ── E. Also try fetching children of root folder id directly ──────────────
  //       (checking if there's a children endpoint)
  debug.E_folder_children = await get(
    `${PROCORE_BASE}/rest/v1.0/folders/598134463867571/folders?company_id=${encodeURIComponent(companyId)}&project_id=${encodeURIComponent(projectId)}`,
    H,
  );

  try {
    const outPath = path.join(process.cwd(), "debug-procore-raw.json");
    fs.writeFileSync(outPath, JSON.stringify(debug, null, 2), "utf8");
    console.log("[procore-documents-debug] Wrote to", outPath);
  } catch (e) {
    console.error("[procore-documents-debug] Could not write debug file:", e);
  }

  return NextResponse.json({ debug: true, ...debug });
}
