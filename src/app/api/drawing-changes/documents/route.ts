// GET /api/drawing-changes/documents?company_id=X&project_id=Y
//     Returns top-level folders (direct children of the project root).
// GET /api/drawing-changes/documents?company_id=X&project_id=Y&folder_id=Z
//     Returns one folder's direct contents: subfolders + files with download URLs.
// GET /api/drawing-changes/documents?company_id=X&project_id=Y&folder_id=Z&recursive=true
//     Returns all descendant files (for batch processing).

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

// Resolve download URL from a Procore document/file object.
// Tries every known field path — the shape varies between endpoints.
function resolveDocUrl(d: Record<string, unknown>): string {
  const file = d.file as Record<string, unknown> | undefined;
  const cv = file?.current_version as Record<string, unknown> | undefined;
  if (cv?.url && typeof cv.url === "string") return cv.url;
  const ps = cv?.prostore_file as Record<string, unknown> | undefined;
  if (ps?.url && typeof ps.url === "string") return ps.url;
  if (d.url && typeof d.url === "string") return d.url;
  if (d.file_url && typeof d.file_url === "string") return d.file_url;
  if (d.download_url && typeof d.download_url === "string") return d.download_url;
  if (file?.url && typeof file.url === "string") return file.url;
  const vd = d.viewable_document as Record<string, unknown> | undefined;
  if (vd?.url && typeof vd.url === "string") return vd.url;
  // For files from the /folders endpoint: current_version directly on the file
  const directCv = d.current_version as Record<string, unknown> | undefined;
  if (directCv?.url && typeof directCv.url === "string") return directCv.url;
  const directPs = directCv?.prostore_file as Record<string, unknown> | undefined;
  if (directPs?.url && typeof directPs.url === "string") return directPs.url;
  return "";
}

function resolveDocSize(d: Record<string, unknown>): number | null {
  const file = d.file as Record<string, unknown> | undefined;
  const cv = file?.current_version as Record<string, unknown> | undefined;
  if (typeof cv?.size === "number") return cv.size;
  if (typeof d.size === "number") return d.size;
  if (typeof file?.size === "number") return file.size;
  const directCv = d.current_version as Record<string, unknown> | undefined;
  if (typeof directCv?.size === "number") return directCv.size;
  return null;
}

function mapFile(d: Record<string, unknown>) {
  const name = (d.name as string) ?? "";
  return {
    id: d.id as number,
    name,
    url: resolveDocUrl(d),
    content_type: ((d.file as Record<string, unknown> | undefined)?.file_type as string)
      ?? (d.file_type as string) ?? (d.content_type as string) ?? "",
    size: resolveDocSize(d),
    is_supported: isSupported(name),
  };
}

// Paginate through /documents endpoint for a folder
async function fetchDocumentFiles(
  projectId: string,
  folderId: string,
  headers: Record<string, string>,
): Promise<Record<string, unknown>[]> {
  const allDocs: Record<string, unknown>[] = [];
  let page = 1;
  while (true) {
    const url = `${PROCORE_BASE}/rest/v1.0/projects/${projectId}/documents?filters[folder_id]=${folderId}&per_page=100&page=${page}`;
    const res = await fetch(url, { headers });
    if (!res.ok) {
      console.log(`[documents] /documents?filters[folder_id]=${folderId} page ${page} returned ${res.status}`);
      break;
    }
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    allDocs.push(...data);
    if (data.length < 100) break;
    page++;
  }
  return allDocs;
}

export async function GET(request: NextRequest) {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const companyId = request.nextUrl.searchParams.get("company_id");
  const projectId = request.nextUrl.searchParams.get("project_id");
  const folderId = request.nextUrl.searchParams.get("folder_id");
  const recursive = request.nextUrl.searchParams.get("recursive") === "true";

  if (!companyId || !projectId) {
    return NextResponse.json({ error: "company_id and project_id required" }, { status: 400 });
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    "Procore-Company-Id": companyId,
  };

  try {
    if (folderId) {
      const parsedFolderId = parseInt(folderId);

      // Fetch the folder via /folders/{id} — gives us subfolders AND files
      const folderUrl = `${PROCORE_BASE}/rest/v1.0/folders/${folderId}?company_id=${encodeURIComponent(companyId)}&project_id=${encodeURIComponent(projectId)}`;
      const folderRes = await fetch(folderUrl, { headers });

      let subfolders: { id: number; name: string; has_children: true }[] = [];
      let folderFiles: Record<string, unknown>[] = [];

      if (folderRes.ok) {
        const folderData = await folderRes.json();
        const rawFolders = Array.isArray(folderData.folders) ? folderData.folders : [];
        subfolders = rawFolders
          .filter((f: Record<string, unknown>) => (f.id as number) !== parsedFolderId)
          .map((f: Record<string, unknown>) => ({
            id: f.id as number,
            name: f.name as string,
            has_children: true as const,
          }));
        // Files from /folders endpoint (may or may not have download URLs)
        folderFiles = Array.isArray(folderData.files) ? folderData.files : [];
      }

      // Also try /documents endpoint — it has download URLs
      const docFiles = await fetchDocumentFiles(projectId, folderId, headers);

      // Merge: prefer /documents files (have URLs), fall back to /folders files
      const fileMap = new Map<number, Record<string, unknown>>();

      // Add files from /folders first
      for (const f of folderFiles) {
        if (f.id) fileMap.set(f.id as number, f);
      }

      // Filter /documents results
      const docFileItems = docFiles.filter((d) => d.document_type === "file");
      if (!recursive) {
        // Browser mode: only direct children
        for (const d of docFileItems) {
          const parentFolder = d.folder as { id: number } | undefined;
          const parentId = parentFolder?.id ?? (d.folder_id as number | undefined);
          if (parentId !== undefined && parentId !== parsedFolderId) continue;
          fileMap.set(d.id as number, d); // overwrite with richer data
        }
      } else {
        // Recursive mode: all descendants
        for (const d of docFileItems) {
          fileMap.set(d.id as number, d);
        }
      }

      const files = [...fileMap.values()].map(mapFile);

      console.log(`[documents] folder_id=${folderId} recursive=${recursive}: ${subfolders.length} subfolders, ${folderFiles.length} files from /folders, ${docFileItems.length} files from /documents, ${files.length} merged files (${files.filter(f => !!f.url).length} with URLs)`);

      return NextResponse.json({ folder_id: parsedFolderId, subfolders, files });
    }

    // Top-level: fetch the root folder, return its direct child folders
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
      console.error("[documents] Failed to parse root folders:", msg);
      return NextResponse.json({ error: `Failed to parse Procore response: ${msg}` }, { status: 502 });
    }

    if (rootData && typeof rootData === "object" && !Array.isArray(rootData)) {
      const rd = rootData as Record<string, unknown>;
      const rawFolders = Array.isArray(rd.folders) ? rd.folders : [];
      const rootId = rd.id as number | undefined;
      const subfolders = rawFolders
        .filter((f: Record<string, unknown>) => f.id !== rootId)
        .map((f: Record<string, unknown>) => ({
          id: f.id as number,
          name: f.name as string,
          has_children: true,
        }));
      return NextResponse.json({ folders: subfolders });
    }

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
