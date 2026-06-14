// GET /api/holdpoint/procore-documents?company_id=X&project_id=Y
// Returns the project's Documents tool folder/file tree for the Hold Point picker.
// company_id is sent as both a query param AND the Procore-Company-Id header on every call.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { procoreGetAllPages } from "@/lib/procore";

export const dynamic = "force-dynamic";

const PROCORE_BASE = process.env.PROCORE_ENV === "production"
  ? "https://api.procore.com"
  : "https://sandbox.procore.com";

const SUPPORTED_CONTENT_TYPES = new Set([
  "application/pdf",
]);

const SUPPORTED_EXTENSIONS = new Set([".pdf"]);

function isSupportedFile(name: string, contentType?: string | null): boolean {
  if (contentType && SUPPORTED_CONTENT_TYPES.has(contentType)) return true;
  const ext = name.match(/\.[^.]+$/)?.[0]?.toLowerCase() ?? "";
  return SUPPORTED_EXTENSIONS.has(ext);
}

interface RawFolder {
  id:        number;
  name?:     string;
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
  // Build the URL manually so that filter brackets are NOT percent-encoded.
  // Procore's Rails backend requires unencoded brackets: filters[folder_id]=X
  const url =
    `${PROCORE_BASE}/rest/v1.0/projects/${projectId}/documents` +
    `?company_id=${encodeURIComponent(companyId)}` +
    `&filters[folder_id]=${folderId}` +
    `&per_page=100`;

  const res = await fetch(url, {
    headers: {
      Authorization:       `Bearer ${token}`,
      "Procore-Company-Id": companyId,
    },
  });

  if (!res.ok) return [];

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

  // Step 1 — list all folders.
  // procoreGetAllPages handles pagination and sends company_id as a query param.
  // The Procore-Company-Id header is passed via extraHeaders.
  let rawFolders: RawFolder[] = [];
  try {
    rawFolders = await procoreGetAllPages<RawFolder>(
      token,
      `/rest/v1.0/projects/${projectId}/folders`,
      { company_id: companyId, per_page: "100" },
      { "Procore-Company-Id": companyId },
    );
  } catch {
    // Documents tool not accessible or not enabled — return empty gracefully
    console.warn("[procore-documents] Folders fetch failed — Documents tool may be unavailable");
    return NextResponse.json({ folders: [] });
  }

  if (rawFolders.length === 0) {
    return NextResponse.json({ folders: [] });
  }

  // Step 2 — fetch files for each folder in parallel.
  // Cap at 20 folders to stay within the 300-second serverless wall-clock limit.
  const foldersToProcess = rawFolders.slice(0, 20);

  const results: DocFolder[] = await Promise.all(
    foldersToProcess.map(async (folder): Promise<DocFolder> => {
      const files = await fetchFolderFiles(token, projectId, companyId, folder.id).catch(() => []);
      return {
        id:        folder.id,
        name:      folder.name ?? `Folder ${folder.id}`,
        parent_id: folder.parent_id ?? null,
        files,
      };
    }),
  );

  // Omit folders with no files — they add noise to the picker
  const nonEmpty = results.filter(f => f.files.length > 0);

  return NextResponse.json({ folders: nonEmpty });
}
