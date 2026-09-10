// GET /api/drawing-changes/documents?company_id=X&project_id=Y
// Returns the Procore Documents folder tree with files for baseline selection.
// Uses flat endpoints: /rest/v1.0/folders and individual folder fetches.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const PROCORE_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

interface ProcoreFile {
  id: number;
  name: string;
  url?: string;
  content_type?: string;
  size?: number | null;
}

interface ProcoreFolder {
  id: number;
  name: string;
  parent_id: number | null;
  has_children_folders?: boolean;
  has_children_files?: boolean;
  folders?: ProcoreFolder[];
  files?: ProcoreFile[];
}

interface OutputFolder {
  id: number;
  name: string;
  parent_id: number | null;
  files: {
    id: number;
    name: string;
    url: string;
    content_type: string;
    size: number | null;
    is_supported: boolean;
  }[];
}

const SUPPORTED_EXTENSIONS = new Set([".pdf", ".docx", ".xlsx", ".jpg", ".jpeg", ".png"]);

function isSupported(name: string): boolean {
  const lower = name.toLowerCase();
  return [...SUPPORTED_EXTENSIONS].some((ext) => lower.endsWith(ext));
}

async function requireAuth(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("procore_access_token")?.value ?? null;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function GET(request: NextRequest) {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const companyId = request.nextUrl.searchParams.get("company_id");
  const projectId = request.nextUrl.searchParams.get("project_id");
  if (!companyId || !projectId) {
    return NextResponse.json({ error: "company_id and project_id required" }, { status: 400 });
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    "Procore-Company-Id": companyId,
  };

  try {
    // Fetch root folders
    const rootUrl = `${PROCORE_BASE}/rest/v1.0/folders?company_id=${companyId}&project_id=${projectId}&per_page=100`;
    const rootRes = await fetch(rootUrl, { headers });
    if (!rootRes.ok) {
      return NextResponse.json({ error: `Procore returned ${rootRes.status}` }, { status: 502 });
    }

    const rootData = await rootRes.json();

    // The root response can be an object with folders[] and files[], or an array
    let topFolders: ProcoreFolder[] = [];
    let topFiles: ProcoreFile[] = [];

    if (Array.isArray(rootData)) {
      topFolders = rootData;
    } else if (rootData.folders) {
      topFolders = Array.isArray(rootData.folders) ? rootData.folders : [];
      topFiles = Array.isArray(rootData.files) ? rootData.files : [];
    }

    const outputFolders: OutputFolder[] = [];

    // Add root-level files as a virtual "Root" folder
    if (topFiles.length > 0) {
      outputFolders.push({
        id: 0,
        name: "Root",
        parent_id: null,
        files: topFiles.map((f) => ({
          id: f.id,
          name: f.name,
          url: f.url ?? "",
          content_type: f.content_type ?? "",
          size: f.size ?? null,
          is_supported: isSupported(f.name),
        })),
      });
    }

    // Recursively fetch each folder's contents (up to 2 levels deep)
    async function fetchFolder(folder: ProcoreFolder, depth: number): Promise<void> {
      const folderUrl = `${PROCORE_BASE}/rest/v1.0/folders/${folder.id}?company_id=${companyId}&project_id=${projectId}`;
      const res = await fetch(folderUrl, { headers });
      if (!res.ok) return;
      const data = await res.json() as ProcoreFolder;
      await sleep(300);

      const files = Array.isArray(data.files) ? data.files : [];
      outputFolders.push({
        id: folder.id,
        name: folder.name,
        parent_id: folder.parent_id ?? null,
        files: files.map((f) => ({
          id: f.id,
          name: f.name,
          url: f.url ?? "",
          content_type: f.content_type ?? "",
          size: f.size ?? null,
          is_supported: isSupported(f.name),
        })),
      });

      // Fetch subfolders (one level deeper)
      if (depth < 2 && Array.isArray(data.folders)) {
        for (const sub of data.folders) {
          await fetchFolder({ ...sub, parent_id: folder.id }, depth + 1);
        }
      }
    }

    // Fetch top-level folders (limit to first 20 to avoid timeout)
    const foldersToFetch = topFolders.slice(0, 20);
    for (const folder of foldersToFetch) {
      await fetchFolder({ ...folder, parent_id: null }, 0);
    }

    return NextResponse.json({ folders: outputFolders });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
