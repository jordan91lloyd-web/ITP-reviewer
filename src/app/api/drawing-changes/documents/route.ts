// GET /api/drawing-changes/documents?company_id=X&project_id=Y
//     Returns top-level folders only (fast).
// GET /api/drawing-changes/documents?company_id=X&project_id=Y&folder_id=Z
//     Returns contents of a specific folder (files + subfolders).

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const PROCORE_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

const SUPPORTED_EXTENSIONS = new Set([".pdf", ".docx", ".xlsx", ".jpg", ".jpeg", ".png"]);

function isSupported(name: string): boolean {
  const lower = name.toLowerCase();
  return [...SUPPORTED_EXTENSIONS].some((ext) => lower.endsWith(ext));
}

async function requireAuth(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("procore_access_token")?.value ?? null;
}

export async function GET(request: NextRequest) {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const companyId = request.nextUrl.searchParams.get("company_id");
  const projectId = request.nextUrl.searchParams.get("project_id");
  const folderId = request.nextUrl.searchParams.get("folder_id");

  if (!companyId || !projectId) {
    return NextResponse.json({ error: "company_id and project_id required" }, { status: 400 });
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    "Procore-Company-Id": companyId,
  };

  try {
    if (folderId) {
      // Fetch a specific folder's contents
      const url = `${PROCORE_BASE}/rest/v1.0/folders/${folderId}?company_id=${companyId}&project_id=${projectId}`;
      const res = await fetch(url, { headers });
      if (!res.ok) {
        return NextResponse.json({ error: `Procore returned ${res.status}` }, { status: 502 });
      }
      const data = await res.json();

      const subfolders = (Array.isArray(data.folders) ? data.folders : []).map(
        (f: { id: number; name: string; has_children_files?: boolean; has_children_folders?: boolean }) => ({
          id: f.id,
          name: f.name,
          has_children: !!(f.has_children_files || f.has_children_folders),
        })
      );

      const files = (Array.isArray(data.files) ? data.files : []).map(
        (f: { id: number; name: string; url?: string; content_type?: string; size?: number | null }) => ({
          id: f.id,
          name: f.name,
          url: f.url ?? "",
          content_type: f.content_type ?? "",
          size: f.size ?? null,
          is_supported: isSupported(f.name),
        })
      );

      return NextResponse.json({ folder_id: parseInt(folderId), subfolders, files });
    }

    // Fetch root folders only (no recursion)
    const rootUrl = `${PROCORE_BASE}/rest/v1.0/folders?company_id=${companyId}&project_id=${projectId}&per_page=100`;
    const rootRes = await fetch(rootUrl, { headers });
    if (!rootRes.ok) {
      return NextResponse.json({ error: `Procore returned ${rootRes.status}` }, { status: 502 });
    }

    const rootData = await rootRes.json();

    let topFolders: { id: number; name: string; has_children_files?: boolean; has_children_folders?: boolean }[] = [];
    if (Array.isArray(rootData)) {
      topFolders = rootData;
    } else if (rootData.folders) {
      topFolders = Array.isArray(rootData.folders) ? rootData.folders : [];
    }

    const folders = topFolders.map((f) => ({
      id: f.id,
      name: f.name,
      has_children: !!(f.has_children_files || f.has_children_folders),
    }));

    return NextResponse.json({ folders });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
