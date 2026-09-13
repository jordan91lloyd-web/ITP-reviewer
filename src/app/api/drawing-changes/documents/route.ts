// GET /api/drawing-changes/documents?company_id=X&project_id=Y
//     Returns top-level folders (direct children of the project root).
// GET /api/drawing-changes/documents?company_id=X&project_id=Y&folder_id=Z
//     Returns one folder's direct contents: subfolders + files with download URLs.
// GET /api/drawing-changes/documents?company_id=X&project_id=Y&folder_id=Z&recursive=true
//     Returns all descendant files (crawls subfolders server-side).
//
// Uses /rest/v1.0/folders and /rest/v1.0/folders/{id} exclusively.
// The /documents endpoint only returns metadata (no download URLs).
// File download URLs come from the file_versions array on /folders files.

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

// Extract download URL from a /folders file object.
// Files have a file_versions array — use the most recent version's URL.
function resolveFileUrl(f: Record<string, unknown>): string {
  const versions = f.file_versions as Record<string, unknown>[] | undefined;
  if (Array.isArray(versions) && versions.length > 0) {
    // Most recent version is typically last
    const latest = versions[versions.length - 1];
    // Try multiple URL field paths on the version object
    if (latest.url && typeof latest.url === "string") return latest.url;
    if (latest.download_url && typeof latest.download_url === "string") return latest.download_url;
    const ps = latest.prostore_file as Record<string, unknown> | undefined;
    if (ps?.url && typeof ps.url === "string") return ps.url;
    // Try first version as fallback
    const first = versions[0];
    if (first.url && typeof first.url === "string") return first.url;
    if (first.download_url && typeof first.download_url === "string") return first.download_url;
    const ps2 = first.prostore_file as Record<string, unknown> | undefined;
    if (ps2?.url && typeof ps2.url === "string") return ps2.url;
  }
  // Direct fields as fallback
  if (f.url && typeof f.url === "string") return f.url;
  if (f.download_url && typeof f.download_url === "string") return f.download_url;
  return "";
}

interface MappedFile {
  id: number;
  name: string;
  url: string;
  content_type: string;
  size: number | null;
  is_supported: boolean;
}

function mapFolderFile(f: Record<string, unknown>): MappedFile {
  const name = (f.name as string) ?? "";
  return {
    id: f.id as number,
    name,
    url: resolveFileUrl(f),
    content_type: (f.file_type as string) ?? "",
    size: typeof f.size === "number" ? f.size : null,
    is_supported: isSupported(name),
  };
}

interface MappedFolder {
  id: number;
  name: string;
  has_children: true;
}

// Fetch a single folder from Procore and extract its direct children
async function fetchFolder(
  folderId: string | number,
  companyId: string,
  projectId: string,
  headers: Record<string, string>,
): Promise<{ subfolders: MappedFolder[]; files: MappedFile[] }> {
  const url = `${PROCORE_BASE}/rest/v1.0/folders/${folderId}?company_id=${encodeURIComponent(companyId)}&project_id=${encodeURIComponent(projectId)}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.log(`[documents] /folders/${folderId} returned ${res.status}`);
    return { subfolders: [], files: [] };
  }
  const data = await res.json();
  const parsedId = typeof folderId === "number" ? folderId : parseInt(String(folderId));

  const rawFolders = Array.isArray(data.folders) ? data.folders : [];
  const subfolders: MappedFolder[] = rawFolders
    .filter((f: Record<string, unknown>) => (f.id as number) !== parsedId)
    .map((f: Record<string, unknown>) => ({
      id: f.id as number,
      name: f.name as string,
      has_children: true as const,
    }));

  const rawFiles = Array.isArray(data.files) ? data.files : [];

  // Log file_versions structure once so we can discover the URL field
  if (rawFiles.length > 0 && !rawFiles.some((f: Record<string, unknown>) => resolveFileUrl(f) !== "")) {
    const sample = rawFiles[0] as Record<string, unknown>;
    const fv = sample.file_versions;
    if (Array.isArray(fv) && fv.length > 0) {
      console.log(`[documents] file_versions[0] KEYS: ${JSON.stringify(Object.keys(fv[0]))}`);
      // Log all string values that might be URLs
      for (const k of Object.keys(fv[0])) {
        const v = fv[0][k];
        if (typeof v === "string" && v.length > 5) {
          console.log(`[documents] file_versions[0].${k} = ${String(v).substring(0, 150)}`);
        } else if (v && typeof v === "object" && !Array.isArray(v)) {
          console.log(`[documents] file_versions[0].${k} KEYS: ${JSON.stringify(Object.keys(v as Record<string, unknown>))}`);
          for (const sk of Object.keys(v as Record<string, unknown>)) {
            const sv = (v as Record<string, unknown>)[sk];
            if (typeof sv === "string" && sv.length > 5) {
              console.log(`[documents] file_versions[0].${k}.${sk} = ${String(sv).substring(0, 150)}`);
            }
          }
        }
      }
    } else {
      console.log(`[documents] file_versions is ${JSON.stringify(fv)?.substring(0, 200)}`);
    }
  }

  const files: MappedFile[] = rawFiles.map(mapFolderFile);

  return { subfolders, files };
}

// Recursively crawl a folder and all subfolders, collecting all files
async function crawlFolder(
  folderId: string | number,
  companyId: string,
  projectId: string,
  headers: Record<string, string>,
  visited: Set<number>,
  maxDepth: number,
): Promise<MappedFile[]> {
  const numId = typeof folderId === "number" ? folderId : parseInt(String(folderId));
  if (visited.has(numId) || maxDepth <= 0) return [];
  visited.add(numId);

  const { subfolders, files } = await fetchFolder(folderId, companyId, projectId, headers);
  const allFiles = [...files];

  for (const sub of subfolders) {
    const subFiles = await crawlFolder(sub.id, companyId, projectId, headers, visited, maxDepth - 1);
    allFiles.push(...subFiles);
  }

  return allFiles;
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
      if (recursive) {
        // Crawl this folder + all subfolders, collecting every file
        const visited = new Set<number>();
        const allFiles = await crawlFolder(folderId, companyId, projectId, headers, visited, 20);
        console.log(`[documents] folder_id=${folderId} recursive: crawled ${visited.size} folders, found ${allFiles.length} files (${allFiles.filter(f => !!f.url).length} with URLs)`);

        // Log sample file_versions structure on first run if URLs are missing
        if (allFiles.length > 0 && !allFiles.some(f => !!f.url)) {
          const parsedId = parseInt(folderId);
          // Re-fetch one folder to log raw file_versions
          const { files: rawCheck } = await fetchFolder(folderId, companyId, projectId, headers);
          if (rawCheck.length === 0) {
            // Try first subfolder
            const { subfolders: subs } = await fetchFolder(folderId, companyId, projectId, headers);
            if (subs.length > 0) {
              const subUrl = `${PROCORE_BASE}/rest/v1.0/folders/${subs[0].id}?company_id=${encodeURIComponent(companyId)}&project_id=${encodeURIComponent(projectId)}`;
              const subRes = await fetch(subUrl, { headers });
              if (subRes.ok) {
                const subData = await subRes.json();
                const sampleFiles = Array.isArray(subData.files) ? subData.files : [];
                if (sampleFiles.length > 0) {
                  const fv = sampleFiles[0].file_versions;
                  if (Array.isArray(fv) && fv.length > 0) {
                    console.log(`[documents] SAMPLE file_versions[0] KEYS: ${JSON.stringify(Object.keys(fv[0]))}`);
                    // Log URL-like values
                    for (const k of Object.keys(fv[0])) {
                      if (typeof fv[0][k] === "string" && (fv[0][k].startsWith("http") || k.includes("url"))) {
                        console.log(`[documents] file_versions[0].${k} = ${String(fv[0][k]).substring(0, 100)}`);
                      }
                    }
                  } else {
                    console.log(`[documents] SAMPLE file_versions: ${JSON.stringify(fv)}`);
                  }
                }
              }
            }
          }
        }

        return NextResponse.json({ folder_id: parseInt(folderId), subfolders: [], files: allFiles });
      }

      // Non-recursive: just this folder's direct children
      const { subfolders, files } = await fetchFolder(folderId, companyId, projectId, headers);
      console.log(`[documents] folder_id=${folderId}: ${subfolders.length} subfolders, ${files.length} files (${files.filter(f => !!f.url).length} with URLs)`);
      return NextResponse.json({ folder_id: parseInt(folderId), subfolders, files });
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
