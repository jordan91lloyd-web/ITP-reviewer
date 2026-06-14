// GET /api/holdpoint/procore-documents?company_id=X&project_id=Y
// Returns the project's Documents tool folder/file tree for the Hold Point picker.
// company_id is sent as both a query param AND the Procore-Company-Id header on every call.
//
// Confirmed Procore Documents endpoints (flat resources, NOT nested under /projects/{id}/):
//   Folders: GET /rest/v1.0/folders?company_id=X&project_id=Y
//   Files:   GET /rest/v1.0/documents?company_id=X&project_id=Y&filters[folder_id]=Z
//
// The response is a flat array of DocFolder (each with parent_id), from which the
// client builds the nested tree for display. ALL folders are returned, including
// parent folders that have no direct files but contain subfolders.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const PROCORE_BASE = process.env.PROCORE_ENV === "production"
  ? "https://api.procore.com"
  : "https://sandbox.procore.com";

// ── Defensive array extraction ───────────────────────────────────────────────
// Procore endpoints return either a bare array [] or a wrapped object.
// This extracts the array regardless of wrapper shape.
function toArray<T>(data: unknown): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data as T[];
  if (typeof data === "object") {
    // Try every plausible Procore envelope key
    for (const key of ["data", "folders", "documents", "files", "results", "items", "records"]) {
      const val = (data as Record<string, unknown>)[key];
      if (Array.isArray(val)) return val as T[];
    }
  }
  return [];
}

function isSupportedFile(name: string, contentType?: string | null): boolean {
  if (contentType === "application/pdf") return true;
  const ext = name.match(/\.[^.]+$/)?.[0]?.toLowerCase() ?? "";
  return ext === ".pdf";
}

interface RawFolder {
  id:         number;
  name?:      string;
  parent_id?: number | null;
}

interface RawFile {
  id:            number;
  name?:         string | null;
  filename?:     string | null;
  content_type?: string | null;
  file_size?:    number | null;
  size?:         number | null;
  url?:          string | null;
  // Some Procore endpoints nest under a "file" sub-object
  file?: {
    url?:          string | null;
    content_type?: string | null;
    file_size?:    number | null;
    size?:         number | null;
  } | null;
}

export interface DocFile {
  id:           number;
  name:         string;
  url:          string;
  content_type: string;
  size:         number | null;
  is_supported: boolean;
}

export interface DocFolder {
  id:        number;
  name:      string;
  parent_id: number | null;
  files:     DocFile[];
}

async function requireAuth(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("procore_access_token")?.value ?? null;
}

// ── Paginated folder fetch ───────────────────────────────────────────────────
// Does NOT use procoreGetAllPages — that function spreads the raw JSON response
// which throws if Procore returns a non-array wrapper instead of a bare array.
// This version logs the raw body for shape discovery and extracts arrays defensively.
async function fetchAllFolders(
  token:     string,
  companyId: string,
  projectId: string,
): Promise<RawFolder[]> {
  const all: RawFolder[] = [];
  const perPage = 100;
  const hardCap = 50; // max 5 000 folders

  for (let page = 1; page <= hardCap; page++) {
    const url =
      `${PROCORE_BASE}/rest/v1.0/folders` +
      `?company_id=${encodeURIComponent(companyId)}` +
      `&project_id=${encodeURIComponent(projectId)}` +
      `&per_page=${perPage}&page=${page}`;

    const res = await fetch(url, {
      headers: {
        Authorization:        `Bearer ${token}`,
        "Procore-Company-Id": companyId,
      },
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Procore API ${res.status} on /rest/v1.0/folders page ${page}: ${body.slice(0, 300)}`);
    }

    const raw = await res.text();

    // Log the raw response on page 1 so we can see the actual shape in server logs
    if (page === 1) {
      console.log(`[procore-documents] /rest/v1.0/folders raw response (first 800 chars):`, raw.slice(0, 800));
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      console.warn("[procore-documents] /rest/v1.0/folders returned non-JSON:", raw.slice(0, 200));
      break;
    }

    const rows = toArray<RawFolder>(parsed);
    console.log(`[procore-documents] /rest/v1.0/folders page ${page}: ${rows.length} folders (cumulative ${all.length + rows.length})`);
    all.push(...rows);

    if (rows.length < perPage) break; // last page
  }

  return all;
}

// ── Per-folder file fetch ────────────────────────────────────────────────────
async function fetchFolderFiles(
  token:     string,
  projectId: string,
  companyId: string,
  folderId:  number,
): Promise<DocFile[]> {
  // Correct Procore endpoint: /rest/v1.0/documents (flat resource, project_id as query param).
  // NOT /rest/v1.0/projects/{id}/documents — that path returns 404.
  // Build URL manually — URLSearchParams percent-encodes brackets (filters[folder_id]
  // → filters%5Bfolder_id%5D) and Procore's Rails backend requires literal brackets.
  const url =
    `${PROCORE_BASE}/rest/v1.0/documents` +
    `?company_id=${encodeURIComponent(companyId)}` +
    `&project_id=${encodeURIComponent(projectId)}` +
    `&filters[folder_id]=${folderId}` +
    `&per_page=100`;

  const res = await fetch(url, {
    headers: {
      Authorization:        `Bearer ${token}`,
      "Procore-Company-Id": companyId,
    },
  });

  if (!res.ok) {
    console.warn(`[procore-documents] folder ${folderId} files → HTTP ${res.status}`);
    return [];
  }

  let parsed: unknown;
  try {
    parsed = await res.json();
  } catch {
    return [];
  }

  // Defensive: log shape of first-ever folder response (folder 0 = first in iteration)
  const rows = toArray<RawFile>(parsed);

  return rows
    .map((f): DocFile | null => {
      const name         = f.name ?? f.filename ?? `Document ${f.id}`;
      const url          = f.file?.url ?? f.url ?? "";
      const content_type = f.file?.content_type ?? f.content_type ?? "";
      const size         = f.file?.file_size ?? f.file?.size ?? f.file_size ?? f.size ?? null;
      if (!url) return null;
      return {
        id:           f.id,
        name,
        url,
        content_type,
        size,
        is_supported: isSupportedFile(name, content_type),
      };
    })
    .filter((f): f is DocFile => f !== null);
}

export async function GET(request: NextRequest) {
  const token = await requireAuth();
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const companyId = request.nextUrl.searchParams.get("company_id");
  const projectId = request.nextUrl.searchParams.get("project_id");
  if (!companyId || !projectId) {
    return NextResponse.json({ error: "company_id and project_id required" }, { status: 400 });
  }

  // Step 1 — list ALL folders (flat resource; parent_id encodes the hierarchy)
  let rawFolders: RawFolder[] = [];
  try {
    rawFolders = await fetchAllFolders(token, companyId, projectId);
  } catch (err) {
    const msg    = err instanceof Error ? err.message : String(err);
    const status = msg.includes("403") ? 403 : msg.includes("404") ? 404 : 500;
    console.warn("[procore-documents] Folders fetch failed:", msg);
    return NextResponse.json(
      { error: "Procore Documents unavailable", detail: msg },
      { status },
    );
  }

  if (rawFolders.length === 0) {
    console.log(`[procore-documents] No folders returned for project ${projectId}`);
    return NextResponse.json({ folders: [] });
  }

  console.log(`[procore-documents] ${rawFolders.length} folders for project ${projectId}`);

  // Step 2 — fetch files for every folder in parallel (no folder cap)
  const results: DocFolder[] = await Promise.all(
    rawFolders.map(async (folder): Promise<DocFolder> => {
      const files = await fetchFolderFiles(token, projectId, companyId, folder.id).catch(() => []);
      return {
        id:        folder.id,
        name:      folder.name ?? `Folder ${folder.id}`,
        parent_id: folder.parent_id ?? null,
        files,
      };
    }),
  );

  // Return ALL folders including those with no direct files (they may contain subfolders).
  // The client builds the nested tree from parent_id relationships.
  return NextResponse.json({ folders: results });
}
