// GET /api/drawing-changes/documents?company_id=X&project_id=Y
//     Returns top-level folders (direct children of the project root).
// GET /api/drawing-changes/documents?company_id=X&project_id=Y&folder_id=Z
//     Returns one folder's direct contents: subfolders + files with download URLs.
//
// Uses /rest/v1.0/folders and /rest/v1.0/folders/{id} — these return only
// direct children, unlike /documents?filters[folder_id] which returns ALL descendants.

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

// Extract subfolders and files from a Procore folder object.
// The folder object has `folders` (child folders) and `files` (child files).
function extractContents(folderData: Record<string, unknown>) {
  const rawFolders = Array.isArray(folderData.folders) ? folderData.folders : [];
  const rawFiles = Array.isArray(folderData.files) ? folderData.files : [];
  const folderId = folderData.id as number | undefined;

  const subfolders = rawFolders
    .filter((f: Record<string, unknown>) => f.id !== folderId) // skip self-reference
    .map((f: Record<string, unknown>) => ({
      id: f.id as number,
      name: f.name as string,
      has_children: true,
    }));

  const files = rawFiles.map((f: Record<string, unknown>) => {
    const name = (f.name as string) ?? "";
    // Files from the folders endpoint have different shapes — try multiple paths
    const cv = f.current_version as Record<string, unknown> | undefined;
    const url = (cv?.url as string)
      ?? (f.url as string)
      ?? "";
    const size = (cv?.size as number)
      ?? (f.size as number)
      ?? null;
    return {
      id: f.id as number,
      name,
      url,
      content_type: (f.file_type as string) ?? (cv?.content_type as string) ?? "",
      size,
      is_supported: isSupported(name),
    };
  });

  return { subfolders, files };
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
      // Fetch a specific folder's direct children via /rest/v1.0/folders/{id}
      const url = `${PROCORE_BASE}/rest/v1.0/folders/${folderId}?company_id=${encodeURIComponent(companyId)}&project_id=${encodeURIComponent(projectId)}`;
      const res = await fetch(url, { headers });
      if (!res.ok) {
        return NextResponse.json({ error: `Procore returned ${res.status}` }, { status: 502 });
      }
      const folderData = await res.json();
      const { subfolders, files } = extractContents(folderData);
      return NextResponse.json({ folder_id: parseInt(folderId), subfolders, files });
    }

    // Top-level: fetch the root folder, then return its direct child folders
    const rootUrl = `${PROCORE_BASE}/rest/v1.0/folders?company_id=${encodeURIComponent(companyId)}&project_id=${encodeURIComponent(projectId)}`;
    const rootRes = await fetch(rootUrl, { headers });
    if (!rootRes.ok) {
      return NextResponse.json({ error: `Procore returned ${rootRes.status}` }, { status: 502 });
    }

    let rootData: unknown;
    try {
      rootData = await rootRes.json();
    } catch (parseErr) {
      const msg = parseErr instanceof Error ? parseErr.message : String(parseErr);
      console.error("[drawing-changes/documents] Failed to parse root folders:", msg);
      return NextResponse.json({ error: `Failed to parse Procore response: ${msg}` }, { status: 502 });
    }

    // The root endpoint returns a single folder object — extract its direct child folders
    if (rootData && typeof rootData === "object" && !Array.isArray(rootData)) {
      const { subfolders } = extractContents(rootData as Record<string, unknown>);
      return NextResponse.json({ folders: subfolders });
    }

    // Fallback: if it's an array, return as-is (shouldn't happen)
    if (Array.isArray(rootData)) {
      const folders = rootData.map((f: Record<string, unknown>) => ({
        id: f.id as number,
        name: f.name as string,
        has_children: true,
      }));
      return NextResponse.json({ folders });
    }

    return NextResponse.json({ folders: [] });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
