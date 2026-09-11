// GET /api/drawing-changes/documents?company_id=X&project_id=Y
//     Returns top-level folders.
// GET /api/drawing-changes/documents?company_id=X&project_id=Y&folder_id=Z
//     Returns files and subfolders in a specific folder.
//     Uses /rest/v1.0/projects/{pid}/documents?filters[folder_id]=Z
//     which returns file.current_version.url for download.

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

interface DocItem {
  id: number;
  name: string;
  document_type: string;
  parent_id: number | null;
  file?: {
    current_version?: {
      url?: string;
      size?: number;
    };
    file_type?: string;
  };
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
      // Fetch folder contents using the documents index with folder_id filter
      const allDocs: DocItem[] = [];
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

      // Separate folders and files
      const subfolders = allDocs
        .filter((d) => d.document_type === "folder")
        .map((d) => ({ id: d.id, name: d.name, has_children: true }));

      const files = allDocs
        .filter((d) => d.document_type === "file")
        .map((d) => ({
          id: d.id,
          name: d.name,
          url: d.file?.current_version?.url ?? "",
          content_type: d.file?.file_type ?? "",
          size: d.file?.current_version?.size ?? null,
          is_supported: isSupported(d.name),
        }));

      return NextResponse.json({ folder_id: parseInt(folderId), subfolders, files });
    }

    // Fetch root-level items (no folder_id filter = root)
    const allDocs: DocItem[] = [];
    let page = 1;
    while (true) {
      const url = `${PROCORE_BASE}/rest/v1.0/projects/${projectId}/documents?per_page=100&page=${page}`;
      const res = await fetch(url, { headers });
      if (!res.ok) break;
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) break;
      allDocs.push(...data);
      if (data.length < 100) break;
      page++;
    }

    // Root level folders only
    const folders = allDocs
      .filter((d) => d.document_type === "folder")
      .map((d) => ({ id: d.id, name: d.name, has_children: true }));

    return NextResponse.json({ folders });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
