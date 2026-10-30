// ─── SaaS Permissions ──────────────────────────────────────────────────────────
// Central module registry and permission checking for Holdpoint.
//
// Identity: Procore email (user.login)
// Levels:   none < view < edit < admin
// Default:  none (fail closed)
// Super Admin: bypasses all checks
//
// ── Supabase tables (run these in SQL Editor) ──────────────────────────────────
//
// CREATE TABLE saas_users (
//   id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
//   company_id      text NOT NULL,
//   procore_user_id text,
//   email           text NOT NULL,
//   name            text,
//   first_login     timestamptz,
//   last_login      timestamptz,
//   is_super_admin  boolean NOT NULL DEFAULT false,
//   created_at      timestamptz NOT NULL DEFAULT now(),
//   UNIQUE(company_id, email)
// );
// ALTER TABLE saas_users ENABLE ROW LEVEL SECURITY;
//
// CREATE TABLE saas_permissions (
//   id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
//   company_id   text NOT NULL,
//   user_email   text NOT NULL,
//   module_key   text NOT NULL,
//   access_level text NOT NULL DEFAULT 'none',
//   updated_at   timestamptz NOT NULL DEFAULT now(),
//   updated_by   text,
//   UNIQUE(company_id, user_email, module_key)
// );
// ALTER TABLE saas_permissions ENABLE ROW LEVEL SECURITY;
//
// CREATE TABLE saas_permission_audit (
//   id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
//   company_id   text NOT NULL,
//   target_email text NOT NULL,
//   module_key   text NOT NULL,
//   old_level    text,
//   new_level    text NOT NULL,
//   changed_by   text NOT NULL,
//   changed_at   timestamptz NOT NULL DEFAULT now()
// );
// ALTER TABLE saas_permission_audit ENABLE ROW LEVEL SECURITY;
//
// -- Seed super admin
// INSERT INTO saas_users (company_id, email, name, is_super_admin)
// VALUES ('598134325535477', 'jordan@fleekconstructions.au', 'Jordan', true)
// ON CONFLICT (company_id, email) DO UPDATE SET is_super_admin = true;

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// ── Access levels (ordered) ───────────────────────────────────────────────────

export const ACCESS_LEVELS = ["none", "view", "edit", "admin"] as const;
export type AccessLevel = (typeof ACCESS_LEVELS)[number];

function levelIndex(level: string): number {
  const idx = ACCESS_LEVELS.indexOf(level as AccessLevel);
  return idx === -1 ? 0 : idx; // unknown → none
}

/** Returns true if `userLevel` meets or exceeds `required`. */
export function meetsLevel(userLevel: string, required: AccessLevel): boolean {
  return levelIndex(userLevel) >= levelIndex(required);
}

// ── Module registry ───────────────────────────────────────────────────────────
// Add new modules here. They automatically appear in the Permissions UI
// and default to "none" for all users.

export interface ModuleDef {
  key: string;
  label: string;
  description: string;
  /** Dashboard tab key (if this module maps to a tab). Null for non-tab modules. */
  tabKey: string | null;
}

export const MODULES: ModuleDef[] = [
  { key: "company",            label: "Company",          description: "Company financial summary and stats",         tabKey: "company" },
  { key: "insights",           label: "Insights",         description: "AI insight cards per project",                tabKey: "insights" },
  { key: "digest",             label: "Digest",           description: "AI weekly project intelligence",              tabKey: "digest" },
  { key: "itp_reviews",        label: "ITP Reviews",      description: "ITP scoring, review, and score overrides",   tabKey: "itp_reviews" },
  { key: "hold_points",        label: "Hold Points",      description: "Hold point register extraction",              tabKey: "hold_points" },
  { key: "report",             label: "Report",           description: "Cross-project ITP status report",             tabKey: "report" },
  { key: "queue",              label: "Queue",            description: "Bulk review job monitor",                     tabKey: "queue" },
  { key: "action_plans",       label: "Action Plans",     description: "Report to Action Plan converter",             tabKey: "action_plans" },
  { key: "inspection_creator", label: "Inspections",      description: "Inspection creation tool",                    tabKey: "inspection_creator" },
  { key: "drawing_changes",    label: "Drawing Changes",  description: "Drawing revision tracker",                    tabKey: "drawing_changes" },
  { key: "photo_classifier",   label: "Photo Classifier", description: "Photo classification and location tagging",   tabKey: "photo_classifier" },
  { key: "resourcing",         label: "Resourcing",       description: "Staff resourcing across projects",             tabKey: "resourcing" },
  { key: "admin",              label: "Admin",            description: "User and document management",                tabKey: null },
  { key: "permissions",        label: "Permissions",      description: "Manage user permissions",                     tabKey: null },
  { key: "audit",              label: "Audit Log",        description: "System audit trail",                          tabKey: null },
];

export const MODULE_KEYS = MODULES.map(m => m.key);

// Map dashboard tab key → module key (for tab gating)
export const TAB_TO_MODULE: Record<string, string> = {};
for (const m of MODULES) {
  if (m.tabKey) TAB_TO_MODULE[m.tabKey] = m.key;
}

// ── User + permission lookups ─────────────────────────────────────────────────

interface SaasUser {
  id: string;
  company_id: string;
  procore_user_id: string | null;
  email: string;
  name: string | null;
  is_super_admin: boolean;
}

export interface UserPermissions {
  user: SaasUser;
  permissions: Record<string, AccessLevel>; // module_key → level
}

/**
 * Loads a user and all their permissions. Returns null if user doesn't exist.
 * Super admins get "admin" on everything.
 */
export async function getUserPermissions(
  companyId: string,
  email: string,
): Promise<UserPermissions | null> {
  try {
    const normalEmail = email.toLowerCase().trim();

    // Fetch user
    const { data: user, error: userErr } = await supabase
      .from("saas_users")
      .select("id, company_id, procore_user_id, email, name, is_super_admin")
      .eq("company_id", companyId)
      .eq("email", normalEmail)
      .single();

    if (userErr || !user) return null;

    // Super admin → admin on everything
    if (user.is_super_admin) {
      const permissions: Record<string, AccessLevel> = {};
      for (const m of MODULES) permissions[m.key] = "admin";
      return { user: user as SaasUser, permissions };
    }

    // Fetch permissions
    const { data: perms } = await supabase
      .from("saas_permissions")
      .select("module_key, access_level")
      .eq("company_id", companyId)
      .eq("user_email", normalEmail);

    const permissions: Record<string, AccessLevel> = {};
    for (const m of MODULES) permissions[m.key] = "none"; // default
    if (perms) {
      for (const p of perms) {
        if (ACCESS_LEVELS.includes(p.access_level as AccessLevel)) {
          permissions[p.module_key] = p.access_level as AccessLevel;
        }
      }
    }

    return { user: user as SaasUser, permissions };
  } catch {
    return null; // fail closed
  }
}

/**
 * Checks if a user has at least `required` access to `moduleKey`.
 * Returns false on any error (fail closed).
 */
export async function checkPermission(
  companyId: string,
  email: string,
  moduleKey: string,
  required: AccessLevel,
): Promise<boolean> {
  try {
    const normalEmail = email.toLowerCase().trim();

    // Quick super admin check
    const { data: user } = await supabase
      .from("saas_users")
      .select("is_super_admin")
      .eq("company_id", companyId)
      .eq("email", normalEmail)
      .single();

    if (!user) return false;
    if (user.is_super_admin) return true;

    // Check specific permission
    const { data: perm } = await supabase
      .from("saas_permissions")
      .select("access_level")
      .eq("company_id", companyId)
      .eq("user_email", normalEmail)
      .eq("module_key", moduleKey)
      .single();

    if (!perm) return false;
    return meetsLevel(perm.access_level, required);
  } catch {
    return false; // fail closed
  }
}

/**
 * Upserts a user record on login. Creates the record if it doesn't exist.
 * Never throws.
 */
export async function upsertSaasUser(
  companyId: string,
  procoreUserId: string,
  email: string,
  name: string,
): Promise<void> {
  try {
    const normalEmail = email.toLowerCase().trim();
    const now = new Date().toISOString();

    const { data: existing } = await supabase
      .from("saas_users")
      .select("id, first_login")
      .eq("company_id", companyId)
      .eq("email", normalEmail)
      .single();

    if (existing) {
      // Update last_login and name
      await supabase
        .from("saas_users")
        .update({ last_login: now, name, procore_user_id: procoreUserId })
        .eq("id", existing.id);
    } else {
      // Insert new user — defaults to no permissions, not super admin
      await supabase
        .from("saas_users")
        .insert({
          company_id: companyId,
          procore_user_id: procoreUserId,
          email: normalEmail,
          name,
          first_login: now,
          last_login: now,
          is_super_admin: false,
        });
    }
  } catch (err) {
    console.error("[permissions] upsertSaasUser error:", err);
  }
}

// ── Resolve user email from access token ──────────────────────────────────────
// Used by API routes to identify the caller.

import { cookies } from "next/headers";
import { getProcoreUser } from "@/lib/procore";

/**
 * Resolves the caller's email from their Procore access token.
 * Returns null if not authenticated or on error.
 * Caches the result in a cookie to avoid repeated /me calls.
 */
export async function resolveCallerEmail(accessToken: string): Promise<string | null> {
  try {
    // Check for cached email cookie first
    const cookieStore = await cookies();
    const cachedEmail = cookieStore.get("holdpoint_user_email")?.value;
    if (cachedEmail) return cachedEmail.toLowerCase().trim();

    // Fetch from Procore
    const user = await getProcoreUser(accessToken);
    return user.login.toLowerCase().trim();
  } catch {
    return null;
  }
}
