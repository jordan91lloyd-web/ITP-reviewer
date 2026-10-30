// ─── GET /api/resourcing?company_id=X ────────────────────────────────────────
// Fetches Fleek staff across all active projects from Procore project teams.
// Maps job_title to role categories and returns a matrix of project × role.
//
// POST /api/resourcing — saves manual overrides to Supabase
//
// CREATE TABLE resourcing_overrides (
//   id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
//   company_id   text NOT NULL,
//   project_id   text NOT NULL,
//   role_key     text NOT NULL,
//   user_email   text NOT NULL,
//   user_name    text,
//   action       text NOT NULL,  -- 'add' or 'remove'
//   created_by   text,
//   created_at   timestamptz NOT NULL DEFAULT now(),
//   UNIQUE(company_id, project_id, role_key, user_email)
// );
// ALTER TABLE resourcing_overrides ENABLE ROW LEVEL SECURITY;

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

// ── Role categories ───────────────────────────────────────────────────────────
// Order matters — this is left-to-right column order in the chart.

export const ROLE_CATEGORIES = [
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
  { key: "other",               label: "Other",                 short: "OTH" },
] as const;

export type RoleKey = (typeof ROLE_CATEGORIES)[number]["key"];

/** Map a Procore job_title to a role category key. */
function classifyRole(jobTitle: string | null | undefined): RoleKey {
  if (!jobTitle) return "other";
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
  if (t.includes("director")) return "other"; // Directors are on every project — not a resourcing concern
  if (t.includes("account")) return "other";   // Accounts team — not site resourcing

  return "other";
}

// Domains to include
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
  procore_user_id: number;
  role_key: RoleKey;
  job_title: string;
  source: "procore" | "override";
}

interface ProjectRow {
  project_id: string;
  project_name: string;
  project_number: string | null;
  assignments: PersonAssignment[];
}

// ── GET ─────────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const auth = await requirePermission(request, "resourcing", "view");
  if (auth.error) return auth.error;

  const accessToken = await resolveAccessToken();
  if (!accessToken) {
    return NextResponse.json({ error: "No Procore token" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  // 1. Fetch all active projects
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let projects: any[] = [];
  try {
    const res = await fetch(
      `${PROCORE_BASE}/rest/v1.0/projects?company_id=${COMPANY_ID}&per_page=100&filters[by_status]=Active`,
      { headers: { Authorization: `Bearer ${accessToken}`, "Procore-Company-Id": COMPANY_ID } },
    );
    if (res.ok) projects = await res.json();
  } catch { /* */ }

  // 2. Fetch team for each project (batches of 2 with 600ms pause)
  const rows: ProjectRow[] = [];
  const errors: string[] = [];

  for (let i = 0; i < projects.length; i += 2) {
    const batch = projects.slice(i, i + 2);
    const results = await Promise.all(batch.map(async (p) => {
      try {
        const res = await fetch(
          `${PROCORE_BASE}/rest/v1.0/projects/${p.id}/users?per_page=250&company_id=${COMPANY_ID}`,
          { headers: { Authorization: `Bearer ${accessToken}`, "Procore-Company-Id": COMPANY_ID } },
        );
        if (!res.ok) {
          errors.push(`Project ${p.name}: HTTP ${res.status}`);
          return { project: p, users: [] };
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const users: any[] = await res.json();
        return { project: p, users };
      } catch (err) {
        errors.push(`Project ${p.name}: ${err instanceof Error ? err.message : String(err)}`);
        return { project: p, users: [] };
      }
    }));

    for (const { project: p, users } of results) {
      const fleekUsers = users.filter(u => u.email_address && isFleekEmail(u.email_address));

      const assignments: PersonAssignment[] = fleekUsers
        .map(u => ({
          email: u.email_address.toLowerCase().trim(),
          name: u.name ?? `${u.first_name ?? ""} ${u.last_name ?? ""}`.trim(),
          procore_user_id: u.id,
          role_key: classifyRole(u.job_title),
          job_title: u.job_title ?? "",
          source: "procore" as const,
        }))
        .filter(a => a.role_key !== "other"); // Exclude directors, accounts, etc from the chart

      rows.push({
        project_id: String(p.id),
        project_name: p.display_name ?? p.name,
        project_number: p.project_number ?? null,
        assignments,
      });
    }

    if (i + 2 < projects.length) await sleep(600);
  }

  // 3. Apply manual overrides from Supabase
  const { data: overrides } = await supabase
    .from("resourcing_overrides")
    .select("*")
    .eq("company_id", COMPANY_ID);

  if (overrides) {
    for (const ov of overrides) {
      const row = rows.find(r => r.project_id === ov.project_id);
      if (!row) continue;

      if (ov.action === "add") {
        // Add if not already there
        const exists = row.assignments.some(a => a.email === ov.user_email && a.role_key === ov.role_key);
        if (!exists) {
          row.assignments.push({
            email: ov.user_email,
            name: ov.user_name ?? ov.user_email.split("@")[0],
            procore_user_id: 0,
            role_key: ov.role_key as RoleKey,
            job_title: "",
            source: "override",
          });
        }
      } else if (ov.action === "remove") {
        // Remove from assignments
        row.assignments = row.assignments.filter(
          a => !(a.email === ov.user_email && a.role_key === ov.role_key)
        );
      }
    }
  }

  // 4. Build people list (unique across all projects)
  const peopleMap = new Map<string, { email: string; name: string; role_key: RoleKey; job_title: string; project_count: number }>();
  for (const row of rows) {
    for (const a of row.assignments) {
      const existing = peopleMap.get(a.email);
      if (!existing) {
        peopleMap.set(a.email, { email: a.email, name: a.name, role_key: a.role_key, job_title: a.job_title, project_count: 1 });
      } else {
        existing.project_count++;
      }
    }
  }

  return NextResponse.json({
    projects: rows,
    people: [...peopleMap.values()].sort((a, b) => a.name.localeCompare(b.name)),
    roles: ROLE_CATEGORIES,
    errors: errors.length > 0 ? errors : undefined,
  });
}

// ── POST — save an override ─────────────────────────────────────────────────
// Body: { project_id, role_key, user_email, user_name, action: "add" | "remove" }

export async function POST(request: NextRequest) {
  const auth = await requirePermission(request, "resourcing", "edit");
  if (auth.error) return auth.error;

  let body: { project_id: string; role_key: string; user_email: string; user_name?: string; action: "add" | "remove" };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { project_id, role_key, user_email, user_name, action } = body;
  if (!project_id || !role_key || !user_email || !action) {
    return NextResponse.json({ error: "project_id, role_key, user_email, action required" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { error } = await supabase
    .from("resourcing_overrides")
    .upsert(
      {
        company_id: COMPANY_ID,
        project_id,
        role_key,
        user_email: user_email.toLowerCase().trim(),
        user_name: user_name ?? null,
        action,
        created_by: auth.email,
      },
      { onConflict: "company_id,project_id,role_key,user_email" },
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
