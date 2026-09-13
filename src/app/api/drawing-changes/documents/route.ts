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

      const parsedFolderId = parseInt(folderId);
      const subfolders = allDocs
        .filter((d) => d.document_type === "folder")
        // Filter out self-referencing folders to prevent infinite recursion on the client
        .filter((d) => (d.id as number) !== parsedFolderId)
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

    // Step 1: Get the root folder id from /rest/v1.0/folders
    const rootUrl = `${PROCORE_BASE}/rest/v1.0/folders?company_id=${companyId}&project_id=${projectId}&per_page=1`;
    const rootRes = await fetch(rootUrl, { headers });
    if (!rootRes.ok) {
      return NextResponse.json({ error: `Procore returned ${rootRes.status}` }, { status: 502 });
    }

    let rootData: unknown;
    try {
      rootData = await rootRes.json();
    } catch (parseErr) {
      const msg = parseErr instanceof Error ? parseErr.message : String(parseErr);
      console.error("[drawing-changes/documents] Failed to parse Procore root folders response:", msg);
      return NextResponse.json({ error: `Failed to parse Procore response: ${msg}` }, { status: 502 });
    }

    // Extract root folder id — response is a single folder object with nested children
    let rootFolderId: number | null = null;
    if (rootData && typeof rootData === "object" && "id" in rootData) {
      rootFolderId = (rootData as { id: number }).id;
    } else if (Array.isArray(rootData) && rootData.length > 0 && rootData[0]?.id) {
      // Some Procore responses return an array — use the first folder's parent
      rootFolderId = rootData[0].id;
    }

    if (!rootFolderId) {
      return NextResponse.json({ folders: [] });
    }

    // Step 2: Fetch direct children of the root folder via the documents endpoint.
    // This returns ONLY direct children (not all descendants), matching Procore's
    // own folder tree structure.
    const allDocs: Record<string, unknown>[] = [];
    let page = 1;
    while (true) {
      const url = `${PROCORE_BASE}/rest/v1.0/projects/${projectId}/documents?filters[folder_id]=${rootFolderId}&per_page=100&page=${page}`;
      const res = await fetch(url, { headers });
      if (!res.ok) break;
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) break;
      allDocs.push(...data);
      if (data.length < 100) break;
      page++;
    }

    const folders = allDocs
      .filter((d) => d.document_type === "folder")
      .map((d) => ({ id: d.id as number, name: d.name as string, has_children: true }));

    return NextResponse.json({ folders });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
