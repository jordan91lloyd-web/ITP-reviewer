// GET /api/holdpoint/procore-documents?company_id=X&project_id=Y
//     Returns top-level document folders (direct children of project root).
// GET /api/holdpoint/procore-documents?company_id=X&project_id=Y&folder_id=Z
//     Returns one folder's direct contents: subfolders + files with download URLs.
//
// Hybrid: subfolders from /folders/{id}, files from /documents (has download URLs)
// filtered to direct children only.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const PROCORE_BASE = process.env.PROCORE_ENV === "production"
  ? "https://api.procore.com"
  : "https://sandbox.procore.com";

const SUPPORTED_EXTENSIONS = new Set([".pdf", ".docx", ".xlsx", ".jpg", ".jpeg", ".png"]);

function isSupported(name: string): boolean {
  const lower = name.toLowerCase();
  return [...SUPPORTED_EXTENSIONS].some((ext) => lower.endsWith(ext));
}

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
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

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
      const parsedFolderId = parseInt(folderId);

      // Subfolders from /folders/{id}, files from /documents (parallel)
      const [folderRes, docsRes] = await Promise.all([
        fetch(
          `${PROCORE_BASE}/rest/v1.0/folders/${folderId}?company_id=${encodeURIComponent(companyId)}&project_id=${encodeURIComponent(projectId)}`,
          { headers }
        ),
        fetch(
          `${PROCORE_BASE}/rest/v1.0/projects/${projectId}/documents?filters[folder_id]=${folderId}&per_page=100&page=1`,
          { headers }
        ),
      ]);

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

      // Collect all document pages
      const allDocs: Record<string, unknown>[] = [];
      if (docsRes.ok) {
        const firstPage = await docsRes.json();
        if (Array.isArray(firstPage)) {
          allDocs.push(...firstPage);
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

      // Only direct child files (not from subfolders)
      const files = allDocs
        .filter((d) => d.document_type === "file")
        .filter((d) => {
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

    // Top-level: fetch root folder, return direct child folders
    const rootUrl = `${PROCORE_BASE}/rest/v1.0/folders?company_id=${encodeURIComponent(companyId)}&project_id=${encodeURIComponent(projectId)}`;
    const rootRes = await fetch(rootUrl, { headers });
    if (!rootRes.ok) {
      return NextResponse.json({ error: `Procore returned ${rootRes.status}` }, { status: 502 });
    }

    const rootData = await rootRes.json();

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
