// ─── /api/resourcing ─────────────────────────────────────────────────────────
// GET  ?action=load       — load saved snapshot from Supabase (default)
// GET  ?action=sync       — sync fresh from Procore, save snapshot, return it
// POST                    — save the current matrix state (drag/drop changes)
//
// CREATE TABLE resourcing_snapshots (
//   id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
//   company_id   text NOT NULL,
//   snapshot     jsonb NOT NULL,
//   synced_at    timestamptz NOT NULL,
//   saved_at     timestamptz NOT NULL DEFAULT now(),
//   saved_by     text,
//   version      int NOT NULL DEFAULT 1,
//   UNIQUE(company_id, version)
// );
// ALTER TABLE resourcing_snapshots ENABLE ROW LEVEL SECURITY;
//
// CREATE TABLE resourcing_hidden_projects (
//   company_id   text NOT NULL,
//   project_id   text NOT NULL,
//   hidden_by    text,
//   hidden_at    timestamptz NOT NULL DEFAULT now(),
//   PRIMARY KEY (company_id, project_id)
// );
// ALTER TABLE resourcing_hidden_projects ENABLE ROW LEVEL SECURITY;

import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/route-auth";
import { resolveAccessToken } from "@/lib/resolve-token";
import { createClient } from "@supabase/supabase-js";

export const maxDuration = 120;

const COMPANY_ID = process.env.FLEEK_COMPANY_ID ?? "";
const PROCORE_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}

// ── Role categories ───────────────────────────────────────────────────────────

const ROLE_CATEGORIES = [
  { key: "construction_manager", label: "Construction Manager", short: "CM" },
  { key: "project_manager",     label: "Project Manager",      short: "PM" },
  { key: "site_manager",        label: "Site Manager",          short: "SM" },
  { key: "project_engineer",    label: "Project Engineer",      short: "PE" },
  { key: "site_foreman",        label: "Site Foreman",          short: "SF" },
  { key: "contracts",           label: "Contracts",             short: "CA" },
  { key: "design",              label: "Design",                short: "DM" },
  { key: "quality",             label: "Quality",               short: "QM" },
  { key: "whse",                label: "WHS",                   short: "WHS" },
  { key: "cadet",               label: "Cadet / Graduate",      short: "CAD" },
] as const;

type RoleKey = (typeof ROLE_CATEGORIES)[number]["key"];

function classifyRole(jobTitle: string | null | undefined): RoleKey | null {
  if (!jobTitle) return null;
  const t = jobTitle.toLowerCase().trim();
  if (t.includes("construction manager")) return "construction_manager";
  if (t.includes("project manager")) return "project_manager";
  if (t.includes("site manager")) return "site_manager";
  if (t.includes("project engineer")) return "project_engineer";
  if (t.includes("foreman") || t.includes("leading hand")) return "site_foreman";
  if (t.includes("contract")) return "contracts";
  if (t.includes("design")) return "design";
  if (t.includes("quality") || t.includes("qa")) return "quality";
  if (t.includes("whs") || t.includes("whse") || t.includes("safety")) return "whse";
  if (t.includes("cadet") || t.includes("graduate") || t.includes("intern")) return "cadet";
  // Skip directors, accounts — not site resourcing roles
  return null;
}

const ALLOWED_DOMAINS = (process.env.ALLOWED_EMAIL_DOMAINS ?? "fleekconstructions.au,fleekconstructions.com.au")
  .split(",").map(d => d.trim().toLowerCase()).filter(Boolean);

function isFleekEmail(email: string): boolean {
  const domain = email.toLowerCase().split("@").pop() ?? "";
  return ALLOWED_DOMAINS.includes(domain);
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface PersonAssignment {
  email: string;
  name: string;
  role_key: string;
  job_title: string;
}

interface ProjectRow {
  project_id: string;
  project_name: string;
  project_number: string | null;
  is_active: boolean;
  assignments: PersonAssignment[];
}

interface ResourcingSnapshot {
  projects: ProjectRow[];
  synced_at: string;
  version: number;
}

// ── Sync from Procore ─────────────────────────────────────────────────────────

async function syncFromProcore(accessToken: string): Promise<{ projects: ProjectRow[]; errors: string[] }> {
  const errors: string[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let projects: any[] = [];
  try {
    let page = 1;
    while (true) {
      const res = await fetch(
        `${PROCORE_BASE}/rest/v1.0/projects?company_id=${COMPANY_ID}&per_page=100&page=${page}`,
        { headers: { Authorization: `Bearer ${accessToken}`, "Procore-Company-Id": COMPANY_ID } },
      );
      if (!res.ok) break;
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) break;
      projects.push(...data);
      if (data.length < 100) break;
      page++;
      await sleep(600);
    }
  } catch { /* */ }

  const rows: ProjectRow[] = [];

  for (let i = 0; i < projects.length; i += 2) {
    const batch = projects.slice(i, i + 2);
    const results = await Promise.all(batch.map(async (p) => {
      try {
        const res = await fetch(
          `${PROCORE_BASE}/rest/v1.0/projects/${p.id}/users?per_page=250&company_id=${COMPANY_ID}`,
          { headers: { Authorization: `Bearer ${accessToken}`, "Procore-Company-Id": COMPANY_ID } },
        );
        if (!res.ok) { errors.push(`${p.name}: HTTP ${res.status}`); return { project: p, users: [] }; }
        return { project: p, users: await res.json() };
      } catch (err) {
        errors.push(`${p.name}: ${err instanceof Error ? err.message : String(err)}`);
        return { project: p, users: [] };
      }
    }));

    for (const { project: p, users } of results) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fleekUsers = (users as any[]).filter(u => u.email_address && isFleekEmail(u.email_address));
      const assignments: PersonAssignment[] = [];
      for (const u of fleekUsers) {
        const role = classifyRole(u.job_title);
        if (!role) continue;
        assignments.push({
          email: u.email_address.toLowerCase().trim(),
          name: u.name ?? `${u.first_name ?? ""} ${u.last_name ?? ""}`.trim(),
          role_key: role,
          job_title: u.job_title ?? "",
        });
      }
      rows.push({
        project_id: String(p.id),
        project_name: p.display_name ?? p.name,
        project_number: p.project_number ?? null,
        is_active: p.active ?? true,
        assignments,
      });
    }
    if (i + 2 < projects.length) await sleep(600);
  }

  // Sort by project number
  rows.sort((a, b) => {
    const na = parseInt(a.project_number ?? "999");
    const nb = parseInt(b.project_number ?? "999");
    return na - nb;
  });

  return { projects: rows, errors };
}

// ── GET ─────────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const auth = await requirePermission(request, "resourcing", "view");
  if (auth.error) return auth.error;

  const action = request.nextUrl.searchParams.get("action") ?? "load";
  const supabase = getSupabase();

  if (action === "load") {
    // Load latest snapshot from Supabase
    const { data: snapshot } = await supabase
      .from("resourcing_snapshots")
      .select("snapshot, synced_at, version")
      .eq("company_id", COMPANY_ID)
      .order("version", { ascending: false })
      .limit(1)
      .single();

    // Load hidden projects
    const { data: hidden } = await supabase
      .from("resourcing_hidden_projects")
      .select("project_id")
      .eq("company_id", COMPANY_ID);
    const hiddenSet = new Set((hidden ?? []).map(h => h.project_id));

    if (snapshot?.snapshot) {
      const parsed = typeof snapshot.snapshot === "string" ? JSON.parse(snapshot.snapshot) : snapshot.snapshot;
      return NextResponse.json({
        ...parsed,
        synced_at: snapshot.synced_at,
        version: snapshot.version,
        hidden_project_ids: [...hiddenSet],
        roles: ROLE_CATEGORIES,
        source: "cache",
      });
    }

    // No snapshot yet — return empty
    return NextResponse.json({
      projects: [],
      synced_at: null,
      version: 0,
      hidden_project_ids: [...hiddenSet],
      roles: ROLE_CATEGORIES,
      source: "empty",
    });
  }

  if (action === "sync") {
    const accessToken = await resolveAccessToken();
    if (!accessToken) return NextResponse.json({ error: "No Procore token" }, { status: 401 });

    const { projects, errors } = await syncFromProcore(accessToken);

    // Get next version number
    const { data: latest } = await supabase
      .from("resourcing_snapshots")
      .select("version")
      .eq("company_id", COMPANY_ID)
      .order("version", { ascending: false })
      .limit(1)
      .single();

    const nextVersion = (latest?.version ?? 0) + 1;
    const now = new Date().toISOString();

    await supabase.from("resourcing_snapshots").insert({
      company_id: COMPANY_ID,
      snapshot: JSON.stringify({ projects }),
      synced_at: now,
      saved_at: now,
      saved_by: auth.email,
      version: nextVersion,
    });

    // Load hidden projects
    const { data: hidden } = await supabase
      .from("resourcing_hidden_projects")
      .select("project_id")
      .eq("company_id", COMPANY_ID);
    const hiddenSet = new Set((hidden ?? []).map(h => h.project_id));

    return NextResponse.json({
      projects,
      synced_at: now,
      version: nextVersion,
      hidden_project_ids: [...hiddenSet],
      roles: ROLE_CATEGORIES,
      source: "procore",
      errors: errors.length > 0 ? errors : undefined,
    });
  }

  // List versions for revert
  if (action === "versions") {
    const { data } = await supabase
      .from("resourcing_snapshots")
      .select("version, synced_at, saved_at, saved_by")
      .eq("company_id", COMPANY_ID)
      .order("version", { ascending: false })
      .limit(20);

    return NextResponse.json({ versions: data ?? [] });
  }

  // Load a specific version
  if (action === "revert") {
    const version = parseInt(request.nextUrl.searchParams.get("version") ?? "0");
    if (!version) return NextResponse.json({ error: "version required" }, { status: 400 });

    const { data: snapshot } = await supabase
      .from("resourcing_snapshots")
      .select("snapshot, synced_at, version")
      .eq("company_id", COMPANY_ID)
      .eq("version", version)
      .single();

    if (!snapshot) return NextResponse.json({ error: "Version not found" }, { status: 404 });

    const parsed = typeof snapshot.snapshot === "string" ? JSON.parse(snapshot.snapshot) : snapshot.snapshot;
    return NextResponse.json({ ...parsed, synced_at: snapshot.synced_at, version: snapshot.version, roles: ROLE_CATEGORIES, source: "revert" });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

// ── POST — save current state ───────────────────────────────────────────────
// Body: { projects: ProjectRow[] } — saves the full matrix as a new version
// OR:   { action: "hide_project", project_id: string }
// OR:   { action: "unhide_project", project_id: string }

export async function POST(request: NextRequest) {
  const auth = await requirePermission(request, "resourcing", "edit");
  if (auth.error) return auth.error;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let body: any;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const supabase = getSupabase();

  // Hide/unhide project
  if (body.action === "hide_project") {
    await supabase.from("resourcing_hidden_projects").upsert(
      { company_id: COMPANY_ID, project_id: body.project_id, hidden_by: auth.email },
      { onConflict: "company_id,project_id" },
    );
    return NextResponse.json({ success: true });
  }
  if (body.action === "unhide_project") {
    await supabase.from("resourcing_hidden_projects").delete()
      .eq("company_id", COMPANY_ID).eq("project_id", body.project_id);
    return NextResponse.json({ success: true });
  }

  // Save full matrix as new version
  if (body.projects) {
    const { data: latest } = await supabase
      .from("resourcing_snapshots")
      .select("version")
      .eq("company_id", COMPANY_ID)
      .order("version", { ascending: false })
      .limit(1)
      .single();

    const nextVersion = (latest?.version ?? 0) + 1;
    const now = new Date().toISOString();

    await supabase.from("resourcing_snapshots").insert({
      company_id: COMPANY_ID,
      snapshot: JSON.stringify({ projects: body.projects }),
      synced_at: body.synced_at ?? now,
      saved_at: now,
      saved_by: auth.email,
      version: nextVersion,
    });

    return NextResponse.json({ success: true, version: nextVersion });
  }

  return NextResponse.json({ error: "Invalid body" }, { status: 400 });
}
