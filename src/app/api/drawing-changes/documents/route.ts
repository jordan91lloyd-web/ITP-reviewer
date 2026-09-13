// GET /api/drawing-changes/documents?company_id=X&project_id=Y
//     Returns top-level folders only (1 API call, fast).
// GET /api/drawing-changes/documents?company_id=X&project_id=Y&folder_id=Z
//     Returns one folder's contents: subfolders + files with download URLs.
//     Uses /rest/v1.0/projects/{pid}/documents?filters[folder_id]=Z

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
      // Fetch one folder's contents via documents index (includes download URLs)
      const allDocs: Record<string, unknown>[] = [];
      let page = 1;
      while (true) {
        const url = `${PROCORE_BASE}/rest/v1.0/projects/${projectId}/documents?filters[folder_id]=${folderId}&per_page=100&page=${page}`;
        const res = await fetch(url, { headers });
        if (!res.ok) break;
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) break;
        allDocs.push(...data);
        if (data.length < 100) break;
        page++;
      }

      const subfolders = allDocs
        .filter((d) => d.document_type === "folder")
        .map((d) => ({ id: d.id as number, name: d.name as string, has_children: true }));

      const files = allDocs
        .filter((d) => d.document_type === "file")
        .map((d) => {
          const file = d.file as Record<string, unknown> | undefined;
          const cv = file?.current_version as Record<string, unknown> | undefined;
          return {
            id: d.id as number,
            name: d.name as string,
            url: (cv?.url as string) ?? "",
            content_type: (file?.file_type as string) ?? "",
            size: (cv?.size as number) ?? null,
            is_supported: isSupported(d.name as string),
          };
        });

      return NextResponse.json({ folder_id: parseInt(folderId), subfolders, files });
    }

    // Top-level folders only (1 API call via /folders endpoint)
    const rootUrl = `${PROCORE_BASE}/rest/v1.0/folders?company_id=${companyId}&project_id=${projectId}&per_page=100`;
    const rootRes = await fetch(rootUrl, { headers });
    if (!rootRes.ok) {
      return NextResponse.json({ error: `Procore returned ${rootRes.status}` }, { status: 502 });
    }

    const rootData = await rootRes.json();

    let topFolders: { id: number; name: string }[] = [];
    if (Array.isArray(rootData)) {
      topFolders = rootData;
    } else if (rootData.folders && Array.isArray(rootData.folders)) {
      topFolders = rootData.folders;
    }

    const folders = topFolders.map((f) => ({
      id: f.id,
      name: f.name,
      has_children: true,
    }));

    return NextResponse.json({ folders });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
