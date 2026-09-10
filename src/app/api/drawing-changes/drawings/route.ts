// GET /api/drawing-changes/drawings?company_id=X&project_id=Y
// Fetches ALL drawing revisions from Procore (not just current), groups by
// drawing number, and returns those with more than one revision — i.e. drawings
// that have been updated and need comparison. Also fetches disciplines.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const PROCORE_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

const DISCIPLINE_FALLBACK: Record<string, string> = {
  S: "Structural",
  A: "Architectural",
  E: "Electrical",
  M: "Mechanical",
  P: "Plumbing",
  H: "Hydraulic",
  F: "Fire",
  C: "Civil",
  L: "Landscape",
};

interface RawRevision {
  id: number;
  drawing_id?: number;
  number?: string;
  title?: string;
  revision_number?: string;
  received_date?: string;
  current?: boolean;
  pdf_url?: string;
  drawing_discipline?: { id: number; name: string } | null;
}

interface Discipline {
  id: number;
  name: string;
}

function getPrefix(drawingNumber: string): string {
  const m = drawingNumber.match(/^([A-Za-z]+)/);
  return m ? m[1].toUpperCase() : "OTHER";
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function requireAuth(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("procore_access_token")?.value ?? null;
}

async function fetchAllRevisions(
  token: string,
  companyId: string,
  projectId: string
): Promise<RawRevision[]> {
  const all: RawRevision[] = [];
  let page = 1;
  while (true) {
    const url = `${PROCORE_BASE}/rest/v1.0/projects/${projectId}/drawing_revisions?per_page=500&page=${page}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Procore-Company-Id": companyId,
      },
    });
    if (!res.ok) break;
    const data = (await res.json()) as RawRevision[];
    if (!Array.isArray(data) || data.length === 0) break;
    all.push(...data);
    if (data.length < 500) break;
    page++;
    await sleep(600);
  }
  return all;
}

async function fetchDisciplines(
  token: string,
  companyId: string,
  projectId: string
): Promise<Discipline[]> {
  try {
    const url = `${PROCORE_BASE}/rest/v1.0/projects/${projectId}/drawing_disciplines?per_page=500`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Procore-Company-Id": companyId,
      },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

// Sort revision numbers: numeric first, then alphabetic
function revisionSortKey(rev: string): number {
  const n = parseInt(rev);
  if (!isNaN(n)) return n;
  // Alphabetic: A=1000, B=1001, etc.
  return 1000 + (rev.toUpperCase().charCodeAt(0) - 65);
}

export async function GET(request: NextRequest) {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const companyId = request.nextUrl.searchParams.get("company_id");
  const projectId = request.nextUrl.searchParams.get("project_id");
  if (!companyId || !projectId) {
    return NextResponse.json(
      { error: "company_id and project_id required" },
      { status: 400 }
    );
  }

  // Fetch revisions and disciplines in parallel
  const [allRevisions, disciplines] = await Promise.all([
    fetchAllRevisions(token, companyId, projectId),
    fetchDisciplines(token, companyId, projectId),
  ]);

  // Build discipline lookup from Procore data
  const disciplineLookup = new Map<number, string>();
  for (const d of disciplines) {
    disciplineLookup.set(d.id, d.name);
  }

  // Group revisions by drawing number
  const byDrawing = new Map<
    string,
    {
      drawing_id: number;
      number: string;
      title: string;
      discipline: string;
      revisions: {
        id: number;
        revision_number: string;
        pdf_url: string;
        current: boolean;
        received_date: string | null;
      }[];
    }
  >();

  for (const rev of allRevisions) {
    const num = rev.number ?? "";
    if (!num) continue;

    let entry = byDrawing.get(num);
    if (!entry) {
      // Resolve discipline: API data first, then prefix fallback
      let discipline = "Other";
      if (rev.drawing_discipline?.name) {
        discipline = rev.drawing_discipline.name;
      } else if (rev.drawing_discipline?.id) {
        discipline = disciplineLookup.get(rev.drawing_discipline.id) ?? "Other";
      } else {
        const prefix = getPrefix(num);
        discipline = DISCIPLINE_FALLBACK[prefix] ?? prefix;
      }

      entry = {
        drawing_id: rev.drawing_id ?? rev.id,
        number: num,
        title: rev.title ?? "",
        discipline,
        revisions: [],
      };
      byDrawing.set(num, entry);
    }

    if (rev.pdf_url) {
      entry.revisions.push({
        id: rev.id,
        revision_number: rev.revision_number ?? "",
        pdf_url: rev.pdf_url,
        current: rev.current ?? false,
        received_date: rev.received_date ?? null,
      });
    }
  }

  // Sort revisions within each drawing, then dedupe by revision label
  // (Procore can have multiple uploads under one revision label)
  for (const entry of byDrawing.values()) {
    entry.revisions.sort(
      (a, b) =>
        revisionSortKey(a.revision_number) - revisionSortKey(b.revision_number)
    );
    // Keep only the latest upload per revision label
    const seen = new Map<string, typeof entry.revisions[0]>();
    for (const rev of entry.revisions) {
      seen.set(rev.revision_number, rev); // last one wins (latest upload)
    }
    entry.revisions = [...seen.values()];
  }

  // Query Supabase for already-scanned revision pairs on this project
  const scannedPairs = new Set<string>();
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data: existingChanges } = await supabase
      .from("drawing_revision_changes")
      .select("drawing_number, old_revision, new_revision")
      .eq("project_id", projectId)
      .eq("company_id", companyId);

    if (existingChanges) {
      for (const c of existingChanges) {
        scannedPairs.add(`${c.drawing_number}|${c.old_revision}|${c.new_revision}`);
      }
    }
  } catch {
    // Non-critical — just won't show scanned status
  }

  // Build output with all revisions and scan status
  const drawingsWithRevisions: {
    drawing_id: number;
    drawing_number: string;
    drawing_title: string;
    discipline: string;
    revision_count: number;
    revisions: { revision_number: string; pdf_url: string }[];
    old_revision: { revision_number: string; pdf_url: string };
    new_revision: { revision_number: string; pdf_url: string };
    scanned_pairs: string[];  // e.g. ["A→B", "B→C"]
    status: "scanned" | "new_revision" | "not_scanned";
  }[] = [];

  for (const entry of byDrawing.values()) {
    // Need at least 2 distinct revision labels
    if (entry.revisions.length < 2) continue;

    const prev = entry.revisions[entry.revisions.length - 2];
    const curr = entry.revisions[entry.revisions.length - 1];

    // Skip if the two latest revisions have the same label (same-revision pair)
    if (prev.revision_number === curr.revision_number) continue;

    // Find which pairs have been scanned
    const scanned: string[] = [];
    for (let i = 0; i < entry.revisions.length - 1; i++) {
      const from = entry.revisions[i].revision_number;
      const to = entry.revisions[i + 1].revision_number;
      if (scannedPairs.has(`${entry.number}|${from}|${to}`)) {
        scanned.push(`${from}→${to}`);
      }
    }

    // Status: latest pair scanned? new revision available? or never scanned?
    const latestPairKey = `${entry.number}|${prev.revision_number}|${curr.revision_number}`;
    let status: "scanned" | "new_revision" | "not_scanned";
    if (scannedPairs.has(latestPairKey)) {
      status = "scanned";
    } else if (scanned.length > 0) {
      status = "new_revision";
    } else {
      status = "not_scanned";
    }

    drawingsWithRevisions.push({
      drawing_id: entry.drawing_id,
      drawing_number: entry.number,
      drawing_title: entry.title,
      discipline: entry.discipline,
      revision_count: entry.revisions.length,
      revisions: entry.revisions.map((r) => ({
        revision_number: r.revision_number,
        pdf_url: r.pdf_url,
      })),
      old_revision: {
        revision_number: prev.revision_number,
        pdf_url: prev.pdf_url,
      },
      new_revision: {
        revision_number: curr.revision_number,
        pdf_url: curr.pdf_url,
      },
      scanned_pairs: scanned,
      status,
    });
  }

  // Sort by discipline then drawing number
  drawingsWithRevisions.sort((a, b) => {
    const dc = a.discipline.localeCompare(b.discipline);
    if (dc !== 0) return dc;
    return a.drawing_number.localeCompare(b.drawing_number);
  });

  return NextResponse.json({
    drawings_with_revisions: drawingsWithRevisions,
    disciplines: disciplines.map((d) => d.name),
    total_drawings: byDrawing.size,
    total_with_revisions: drawingsWithRevisions.length,
  });
}
