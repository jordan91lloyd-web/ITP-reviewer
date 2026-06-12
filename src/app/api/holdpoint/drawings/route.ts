// GET /api/holdpoint/drawings?company_id=X&project_id=Y
// Returns recommended drawing revisions from Procore.
// Recommended = keyword match in drawing title only (no per-discipline fallback).

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const PROCORE_BASE = process.env.PROCORE_ENV === "production"
  ? "https://api.procore.com"
  : "https://sandbox.procore.com";

// Requirement-signal terms only. Intentionally excludes: "general" (catches
// general arrangement plans), "schedule", "cover", "typical", "section",
// "detail", "standard", "index" — all pull in geometry/list sheets.
const KEYWORDS = [
  "notes",           // GENERAL NOTES, LEGENDS + NOTES, NOTES LEGEND AND DRAWING LIST
  "specification",
  "spec",
  "criteria",
  "durability",
  "waterproofing",
  "hold point",
  "witness",
  "inspection",
  "quality",
  "qa",
];

const DISCIPLINE_NAMES: Record<string, string> = {
  S: "Structural",    A: "Architectural", E: "Electrical",
  M: "Mechanical",   P: "Plumbing",       F: "Fire",
  C: "Civil",        L: "Landscape",
};

interface DrawingRevision {
  id:               number;
  number?:          string;
  title?:           string;
  revision_number?: string;
  pdf_url?:         string;
}

function getPrefix(drawingNumber: string): string {
  const m = drawingNumber.match(/^([A-Za-z]+)/);
  return m ? m[1].toUpperCase() : "OTHER";
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
  if (!companyId || !projectId) {
    return NextResponse.json({ error: "company_id and project_id required" }, { status: 400 });
  }

  const all: DrawingRevision[] = [];
  try {
    let page = 1;
    while (true) {
      const url = `${PROCORE_BASE}/rest/v1.0/projects/${projectId}/drawing_revisions?current=true&per_page=500&page=${page}`;
      const res = await fetch(url, {
        headers: {
          Authorization:       `Bearer ${token}`,
          "Procore-Company-Id": companyId,
        },
      });
      if (!res.ok) break;
      const data = await res.json() as DrawingRevision[];
      if (!Array.isArray(data) || data.length === 0) break;
      all.push(...data);
      if (data.length < 500) break;
      page++;
    }
  } catch {
    // ignore — return empty if Procore unavailable
  }

  // Deduplicate — keep only the latest revision per drawing number
  const latestByNumber = new Map<string, DrawingRevision>();
  for (const drawing of all) {
    const num      = drawing.number ?? "";
    const existing = latestByNumber.get(num);
    if (!existing) {
      latestByNumber.set(num, drawing);
    } else {
      const existingRev = parseInt(existing.revision_number ?? "") || 0;
      const newRev      = parseInt(drawing.revision_number  ?? "") || 0;
      if (newRev > existingRev ||
          (newRev === existingRev && (drawing.revision_number ?? "") > (existing.revision_number ?? ""))) {
        latestByNumber.set(num, drawing);
      }
    }
  }
  const deduplicated  = Array.from(latestByNumber.values());
  const totalDrawings = deduplicated.length;
  const recommendedIds = new Set<number>();

  // Title-keyword classification only — no per-discipline fallback
  for (const d of deduplicated) {
    const tl = (d.title ?? "").toLowerCase();
    if (KEYWORDS.some(kw => tl.includes(kw))) recommendedIds.add(d.id);
  }

  const recommended = deduplicated
    .filter(d => recommendedIds.has(d.id) && d.pdf_url)
    .sort((a, b) => (a.number ?? "").localeCompare(b.number ?? ""))
    .map(d => {
      const prefix = getPrefix(d.number ?? "");
      return {
        id:              d.id,
        number:          d.number          ?? "",
        title:           d.title           ?? "",
        revision_number: d.revision_number ?? "",
        pdf_url:         d.pdf_url         ?? "",
        discipline:      DISCIPLINE_NAMES[prefix] ?? prefix,
      };
    });

  return NextResponse.json({ recommended, total_drawings: totalDrawings });
}
