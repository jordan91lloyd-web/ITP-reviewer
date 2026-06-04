// GET /api/holdpoint/documents?company_id=X&project_id=Y
// Fetches drawing revisions and PDF documents from Procore for a project.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PROCORE_BASE = process.env.PROCORE_ENV === "production"
  ? "https://api.procore.com"
  : "https://sandbox.procore.com";

async function requireAuth(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("procore_access_token")?.value ?? null;
}

async function procoreGetAll(
  path: string,
  token: string,
  companyId: string,
  extraParams = "",
): Promise<unknown[]> {
  const all: unknown[] = [];
  let page = 1;
  while (true) {
    const sep = path.includes("?") ? "&" : "?";
    const url = `${PROCORE_BASE}${path}${sep}per_page=100&page=${page}${extraParams ? "&" + extraParams : ""}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Procore-Company-Id": companyId,
      },
    });
    if (!res.ok) break;
    const data = (await res.json()) as unknown[];
    if (!Array.isArray(data) || data.length === 0) break;
    all.push(...data);
    if (data.length < 100) break;
    page++;
  }
  return all;
}

export async function GET(request: NextRequest) {
  const token = await requireAuth();
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const companyId = request.nextUrl.searchParams.get("company_id");
  const projectId = request.nextUrl.searchParams.get("project_id");
  if (!companyId || !projectId) {
    return NextResponse.json({ error: "company_id and project_id required" }, { status: 400 });
  }

  // ── Drawing revisions (current only) ──────────────────────────────────────
  type DrawingRevision = {
    id: number;
    number?: string;
    title?: string;
    pdf_url?: string;
    revision_number?: string;
  };
  let drawings: DrawingRevision[] = [];
  try {
    drawings = (await procoreGetAll(
      `/rest/v1.0/projects/${projectId}/drawing_revisions`,
      token,
      companyId,
      "current=true",
    )) as DrawingRevision[];
  } catch {
    // Project may not have Drawings tool enabled — ignore
  }

  // ── Documents (PDF files only) ─────────────────────────────────────────────
  type DocItem = {
    id: number;
    name?: string;
    name_with_path?: string;
    document_type?: string;
    download_url?: string;
    file?: { url?: string };
  };
  let docs: DocItem[] = [];
  try {
    const allDocs = (await procoreGetAll(
      `/rest/v1.0/projects/${projectId}/documents`,
      token,
      companyId,
      "filters[document_type]=file",
    )) as DocItem[];
    docs = allDocs.filter(
      d => d.document_type === "file" && (d.name ?? "").toLowerCase().endsWith(".pdf"),
    );
  } catch {
    // ignore
  }

  return NextResponse.json({
    drawings: drawings.map(d => ({
      id:              String(d.id),
      number:          d.number ?? "",
      title:           d.title ?? d.number ?? `Drawing ${d.id}`,
      revision_number: d.revision_number ?? "",
      pdf_url:         d.pdf_url ?? "",
      source:          "drawing" as const,
    })),
    documents: docs.map(d => ({
      id:             String(d.id),
      name:           d.name ?? "",
      name_with_path: d.name_with_path ?? d.name ?? "",
      download_url:   d.download_url ?? d.file?.url ?? "",
      source:         "document" as const,
    })),
  });
}
