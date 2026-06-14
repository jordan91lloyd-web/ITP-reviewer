// GET /api/holdpoint/procore-documents?company_id=X&project_id=Y
// Returns the project's Documents tool folder/file tree for the Hold Point picker.
// company_id is sent as both a query param AND the Procore-Company-Id header on every call.
//
// Confirmed Procore Documents endpoints (flat resources, NOT nested under /projects/{id}/):
//   Folders:   GET /rest/v1.0/folders?company_id=X&project_id=Y
//   Documents: GET /rest/v1.0/documents?company_id=X&project_id=Y  (paginated, all at once)
//
// We fetch ALL documents for the project in one paginated call (no per-folder requests),
// then group by the document's folder_id (or parent_id) field. This is more reliable than
// per-folder filtering because it avoids bracket encoding issues and works regardless of
// how Procore implements the filters[] param server-side.
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
  // Folder reference — Procore may use folder_id or parent_id on document objects
  folder_id?:    number | null;
  parent_id?:    number | null;
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

    if (page === 1) {
      console.log(`[procore-documents] /rest/v1.0/folders raw response (first 600 chars):`, raw.slice(0, 600));
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      console.warn("[procore-documents] /rest/v1.0/folders returned non-JSON:", raw.slice(0, 200));
      break;
    }

    const rows = toArray<RawFolder>(parsed);
    console.log(`[procore-documents] /rest/v1.0/folders page ${page}: ${rows.length} folders`);
    all.push(...rows);

    if (rows.length < perPage) break;
  }

  return all;
}

// ── Fetch ALL documents for the project (no per-folder filtering) ────────────
// Returns the complete flat list; caller groups by folder_id / parent_id.
// One paginated call per page is far more reliable than N per-folder requests.
async function fetchAllDocuments(
  token:     string,
  companyId: string,
  projectId: string,
): Promise<RawFile[]> {
  const all: RawFile[] = [];
  const perPage = 100;
  const hardCap = 100; // max 10 000 documents

  for (let page = 1; page <= hardCap; page++) {
    const url =
      `${PROCORE_BASE}/rest/v1.0/documents` +
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
      // 403 means the Documents tool is not accessible for this project/user
      console.warn(`[procore-documents] /rest/v1.0/documents page ${page}: HTTP ${res.status} — ${body.slice(0, 200)}`);
      // Don't throw — return whatever we've got so far (may be empty)
      break;
    }

    const raw = await res.text();

    if (page === 1) {
      // Log the full first-page response so we can see the actual shape in server logs
      console.log(`[procore-documents] /rest/v1.0/documents raw response page 1 (first 1200 chars):`, raw.slice(0, 1200));
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      console.warn("[procore-documents] /rest/v1.0/documents returned non-JSON:", raw.slice(0, 200));
      break;
    }

    const rows = toArray<RawFile>(parsed);
    console.log(`[procore-documents] /rest/v1.0/documents page ${page}: ${rows.length} documents (cumulative ${all.length + rows.length})`);

    if (page === 1 && rows.length > 0) {
      // Log shape of first doc so we know the actual field names
      console.log(`[procore-documents] First document keys: ${Object.keys(rows[0] as object).join(", ")}`);
      console.log(`[procore-documents] First document sample:`, JSON.stringify(rows[0], null, 2).slice(0, 600));
    }

    all.push(...rows);

    if (rows.length < perPage) break;
  }

  return all;
}

function rawFileToDocFile(f: RawFile): DocFile | null {
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

  // Step 2 — fetch ALL documents for the project in one paginated call
  const rawDocs = await fetchAllDocuments(token, companyId, projectId).catch(() => [] as RawFile[]);
  console.log(`[procore-documents] ${rawDocs.length} total documents fetched`);

  // Step 3 — group documents by their folder reference
  // Procore documents have a folder_id or parent_id field pointing to their containing folder
  const filesByFolder = new Map<number, DocFile[]>();
  let docsWithNoFolder = 0;

  for (const raw of rawDocs) {
    // Try folder_id first, then parent_id
    const folderId = raw.folder_id ?? raw.parent_id ?? null;
    if (folderId === null) {
      docsWithNoFolder++;
      continue;
    }
    const docFile = rawFileToDocFile(raw);
    if (!docFile) continue; // skip docs with no URL

    if (!filesByFolder.has(folderId)) filesByFolder.set(folderId, []);
    filesByFolder.get(folderId)!.push(docFile);
  }

  if (docsWithNoFolder > 0) {
    console.log(`[procore-documents] ${docsWithNoFolder} documents had no folder_id or parent_id`);
  }
  console.log(`[procore-documents] Documents grouped into ${filesByFolder.size} folders`);

  // Step 4 — assign file groups to folder records
  const results: DocFolder[] = rawFolders.map((folder): DocFolder => ({
    id:        folder.id,
    name:      folder.name ?? `Folder ${folder.id}`,
    parent_id: folder.parent_id ?? null,
    files:     filesByFolder.get(folder.id) ?? [],
  }));

  // Return ALL folders including those with no direct files (they may contain subfolders).
  return NextResponse.json({ folders: results });
}
