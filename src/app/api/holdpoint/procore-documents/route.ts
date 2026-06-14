// GET /api/holdpoint/procore-documents?company_id=X&project_id=Y
// Returns the project's Documents tool folder/file tree for the Hold Point picker.
// company_id is sent as both a query param AND the Procore-Company-Id header on every call.
//
// The response is a flat array of DocFolder (each with parent_id), from which the
// client builds the nested tree for display. ALL folders are returned, including
// parent folders that have no direct files but contain subfolders.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { procoreGetAllPages } from "@/lib/procore";

export const dynamic = "force-dynamic";

const PROCORE_BASE = process.env.PROCORE_ENV === "production"
  ? "https://api.procore.com"
  : "https://sandbox.procore.com";

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
  file?: {
    url?:          string | null;
    content_type?: string | null;
    file_size?:    number | null;
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

async function fetchFolderFiles(
  token:     string,
  projectId: string,
  companyId: string,
  folderId:  number,
): Promise<DocFile[]> {
  // Build URL manually — URLSearchParams percent-encodes brackets (filters[folder_id]
  // → filters%5Bfolder_id%5D) and Procore's Rails backend requires literal brackets.
  const url =
    `${PROCORE_BASE}/rest/v1.0/projects/${projectId}/documents` +
    `?company_id=${encodeURIComponent(companyId)}` +
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

  const data: unknown = await res.json();
  if (!Array.isArray(data)) return [];

  return (data as RawFile[])
    .map((f): DocFile | null => {
      const name         = f.name ?? f.filename ?? `Document ${f.id}`;
      const url          = f.file?.url ?? f.url ?? "";
      const content_type = f.file?.content_type ?? f.content_type ?? "";
      const size         = f.file?.file_size ?? f.file_size ?? f.size ?? null;
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

  // Step 1 — list ALL folders (flat list; parent_id encodes the hierarchy)
  let rawFolders: RawFolder[] = [];
  try {
    rawFolders = await procoreGetAllPages<RawFolder>(
      token,
      `/rest/v1.0/projects/${projectId}/folders`,
      { company_id: companyId, per_page: "100" },
      { "Procore-Company-Id": companyId },
    );
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
