// GET /api/drawing-changes/documents?company_id=X&project_id=Y
//     Returns top-level folders (direct children of the project root).
// GET /api/drawing-changes/documents?company_id=X&project_id=Y&folder_id=Z
//     Returns one folder's direct contents: subfolders + files with download URLs.
//
// Hybrid approach:
//   Subfolders from /rest/v1.0/folders/{id} (direct children only, correct tree)
//   Files from /rest/v1.0/projects/{pid}/documents (has download URLs),
//     filtered to only include direct children of the requested folder.

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

// Resolve download URL from a Procore document object — tries every known field path.
// The Documents endpoint nests URLs differently from Attachments, and the shape
// varies between document types and API versions.
function resolveDocUrl(d: Record<string, unknown>): string {
  // Path 1: file.current_version.url (most common for /documents endpoint)
  const file = d.file as Record<string, unknown> | undefined;
  const cv = file?.current_version as Record<string, unknown> | undefined;
  if (cv?.url && typeof cv.url === "string") return cv.url;

  // Path 2: file.current_version.prostore_file.url
  const ps = cv?.prostore_file as Record<string, unknown> | undefined;
  if (ps?.url && typeof ps.url === "string") return ps.url;

  // Path 3: direct fields on the document
  if (d.url && typeof d.url === "string") return d.url;
  if (d.file_url && typeof d.file_url === "string") return d.file_url;
  if (d.download_url && typeof d.download_url === "string") return d.download_url;

  // Path 4: file.url
  if (file?.url && typeof file.url === "string") return file.url;

  // Path 5: viewable_document
  const vd = d.viewable_document as Record<string, unknown> | undefined;
  if (vd?.url && typeof vd.url === "string") return vd.url;

  return "";
}

function resolveDocSize(d: Record<string, unknown>): number | null {
  const file = d.file as Record<string, unknown> | undefined;
  const cv = file?.current_version as Record<string, unknown> | undefined;
  if (typeof cv?.size === "number") return cv.size;
  if (typeof d.size === "number") return d.size;
  if (typeof file?.size === "number") return file.size;
  return null;
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
  // When recursive=true, return ALL descendant files (no parent filter).
  // Used by the crawl/process flow which deduplicates on its own.
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

      // Fetch subfolders from /folders/{id} (returns only direct children)
      // and files from /documents endpoint (has download URLs)
      const [folderRes, ...filePages] = await Promise.all([
        fetch(
          `${PROCORE_BASE}/rest/v1.0/folders/${folderId}?company_id=${encodeURIComponent(companyId)}&project_id=${encodeURIComponent(projectId)}`,
          { headers }
        ),
        // Fetch first page of documents for this folder (includes all descendants with URLs)
        fetch(
          `${PROCORE_BASE}/rest/v1.0/projects/${projectId}/documents?filters[folder_id]=${folderId}&per_page=100&page=1`,
          { headers }
        ),
      ]);

      // Extract subfolders from /folders/{id} (correct nesting)
      let subfolders: { id: number; name: string; has_children: true }[] = [];
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
      }

      // Collect subfolder ids so we can distinguish direct files from descendant files
      const subfolderIds = new Set(subfolders.map(s => s.id));

      // Extract files from /documents endpoint, but only DIRECT children of this folder.
      // The /documents endpoint returns ALL descendants. A file is a direct child if
      // it's not inside any of our subfolders. We check the file's parent_folder_id.
      const allDocs: Record<string, unknown>[] = [];
      if (filePages[0]?.ok) {
        const firstPage = await filePages[0].json();
        if (Array.isArray(firstPage)) {
          allDocs.push(...firstPage);
          // Paginate if needed
          if (firstPage.length >= 100) {
            let page = 2;
            while (true) {
              const res = await fetch(
                `${PROCORE_BASE}/rest/v1.0/projects/${projectId}/documents?filters[folder_id]=${folderId}&per_page=100&page=${page}`,
                { headers }
              );
              if (!res.ok) break;
              const data = await res.json();
              if (!Array.isArray(data) || data.length === 0) break;
              allDocs.push(...data);
              if (data.length < 100) break;
              page++;
            }
          }
        }
      }

      // Filter files — when recursive, return all descendants; otherwise direct children only
      const files = allDocs
        .filter((d) => d.document_type === "file")
        .filter((d) => {
          if (recursive) return true; // crawl mode: take everything, client deduplicates
          // Browser mode: only direct children of this folder
          const parentFolder = d.folder as { id: number } | undefined;
          const parentId = parentFolder?.id ?? (d.folder_id as number | undefined);
          if (parentId === undefined) return true;
          return parentId === parsedFolderId;
        })
        .map((d) => ({
          id: d.id as number,
          name: d.name as string,
          url: resolveDocUrl(d),
          content_type: (d.file as Record<string, unknown> | undefined)?.file_type as string ?? "",
          size: resolveDocSize(d),
          is_supported: isSupported(d.name as string),
        }));

      return NextResponse.json({ folder_id: parsedFolderId, subfolders, files });
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

    // Fallback: if it's an array, return as-is
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
