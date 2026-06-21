// TEMPORARY DEBUG ROUTE — delete after diagnosis
// GET /api/debug/kellett-inspect?company_id=X
// Finds project 003 (Kellett), fetches all its inspections, and dumps
// the raw closed_at / created_at / status fields so we can diagnose
// the closed_7d window count.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const PROCORE_BASE = process.env.PROCORE_ENV === "production"
  ? "https://api.procore.com"
  : "https://sandbox.procore.com";

async function get(url: string, H: Record<string, string>) {
  const res = await fetch(url, { headers: H });
  const text = await res.text();
  let body: unknown = text;
  try { body = JSON.parse(text); } catch { /* keep raw */ }
  return { status: res.status, body };
}

// Sydney helpers (same as report route)
function toSydneyDate(isoStr: string | null | undefined): string | null {
  if (!isoStr) return null;
  try {
    return new Date(isoStr).toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" });
  } catch { return null; }
}

function sydneyWindowStart(daysBack: number): string {
  const todaySydney = new Date().toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" });
  const d = new Date(todaySydney + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - (daysBack - 1));
  return d.toISOString().slice(0, 10);
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("procore_access_token")?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const companyId = request.nextUrl.searchParams.get("company_id") ?? "598134325535477";
  const H: Record<string, string> = {
    Authorization:        `Bearer ${token}`,
    "Procore-Company-Id": companyId,
  };

  const debug: Record<string, unknown> = {
    captured_at:   new Date().toISOString(),
    server_utc_now: new Date().toISOString(),
    sydney_today:  new Date().toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" }),
    window7_start: sydneyWindowStart(7),
    window30_start: sydneyWindowStart(30),
  };

  // Step 1: find all projects, identify Kellett (project 003)
  const projRes = await get(
    `${PROCORE_BASE}/rest/v1.0/projects?company_id=${companyId}&per_page=100`,
    H,
  );
  debug.projects_status = projRes.status;

  if (projRes.status !== 200 || !Array.isArray(projRes.body)) {
    debug.projects_error = projRes.body;
    writeDebug(debug);
    return NextResponse.json(debug);
  }

  const projects = projRes.body as Array<{ id: number; name: string; project_number: string | null; display_name?: string }>;
  debug.all_projects = projects.map(p => ({ id: p.id, name: p.name, project_number: p.project_number }));

  // Find Kellett by project_number "003" or name contains "Kellett"
  const kellett = projects.find(p =>
    p.project_number?.trim() === "003" ||
    p.name?.toLowerCase().includes("kellett") ||
    (p.display_name ?? "")?.toLowerCase().includes("kellett")
  );

  if (!kellett) {
    debug.kellett_error = "Could not find project 003 / Kellett in project list";
    writeDebug(debug);
    return NextResponse.json(debug);
  }

  debug.kellett_project = { id: kellett.id, name: kellett.name, project_number: kellett.project_number };

  // Step 2: fetch all inspections for Kellett
  const inspRes = await get(
    `${PROCORE_BASE}/rest/v1.0/projects/${kellett.id}/checklist/lists?per_page=100&page=1`,
    H,
  );
  debug.inspections_status = inspRes.status;

  if (inspRes.status !== 200 || !Array.isArray(inspRes.body)) {
    debug.inspections_error = inspRes.body;
    writeDebug(debug);
    return NextResponse.json(debug);
  }

  const allInspections = inspRes.body as Array<Record<string, unknown>>;
  debug.total_inspections_page1 = allInspections.length;

  // Filter to ITP-named only
  const itps = allInspections.filter(i =>
    String(i.name ?? "").trim().toLowerCase().startsWith("itp")
  );
  debug.total_itp_inspections = itps.length;

  // Step 3: compute what the report route would count
  const window7  = sydneyWindowStart(7);
  const window30 = sydneyWindowStart(30);

  const counted_closed_7d:  Array<Record<string, unknown>> = [];
  const counted_closed_30d: Array<Record<string, unknown>> = [];
  const counted_created_7d: Array<Record<string, unknown>> = [];
  const null_closed_at:     Array<Record<string, unknown>> = [];

  for (const itp of itps) {
    const closedAt   = itp.closed_at  as string | null | undefined;
    const createdAt  = itp.created_at as string | null | undefined;
    const status     = itp.status     as string | null | undefined;
    const closedDate = toSydneyDate(closedAt);
    const createdDate = toSydneyDate(createdAt);

    if (!closedAt) {
      null_closed_at.push({ id: itp.id, name: itp.name, status, created_at: createdAt, closed_at: closedAt });
    }

    if (closedDate && closedDate >= window7) {
      counted_closed_7d.push({
        id:          itp.id,
        name:        itp.name,
        status,
        closed_at_raw:    closedAt,
        closed_at_sydney: closedDate,
        window7_start:    window7,
        in_window:        closedDate >= window7,
      });
    }

    if (closedDate && closedDate >= window30) {
      counted_closed_30d.push({ id: itp.id, name: itp.name, status, closed_at_raw: closedAt, closed_at_sydney: closedDate });
    }

    if (createdDate && createdDate >= window7) {
      counted_created_7d.push({ id: itp.id, name: itp.name, status, created_at_raw: createdAt, created_at_sydney: createdDate });
    }
  }

  // Also dump ALL ITP inspections with their raw timestamp fields
  debug.window7_start    = window7;
  debug.window30_start   = window30;
  debug.counted_closed_7d  = counted_closed_7d;
  debug.counted_closed_30d = counted_closed_30d;
  debug.counted_created_7d = counted_created_7d;
  debug.null_closed_at_count = null_closed_at.length;
  debug.null_closed_at_sample = null_closed_at.slice(0, 3);

  // Full dump of all ITPs with timestamp fields
  debug.all_itps_timestamps = itps.map(i => ({
    id:         i.id,
    name:       i.name,
    status:     i.status,
    created_at: i.created_at,
    closed_at:  i.closed_at,
    updated_at: i.updated_at,
    // Other potential "closed" fields Procore might use
    completed_at:   i.completed_at,
    date_closed:    i.date_closed,
    completed_date: i.completed_date,
    closed_at_sydney:  toSydneyDate(i.closed_at  as string | null),
    created_at_sydney: toSydneyDate(i.created_at as string | null),
  }));

  writeDebug(debug);
  return NextResponse.json(debug);
}

function writeDebug(data: unknown) {
  try {
    const p = path.join(process.cwd(), "debug-kellett.json");
    fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf8");
    console.log("[debug/kellett] wrote", p);
  } catch { /* ignore */ }
}
