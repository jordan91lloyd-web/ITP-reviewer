// ─── GET  /api/permissions — returns current user's permissions ───────────────
// ─── GET  /api/permissions?admin=true — returns all users + permissions (admin only)
// ─── POST /api/permissions — update a user's permissions (admin only)

import { NextRequest, NextResponse } from "next/server";
import { resolveAccessToken } from "@/lib/resolve-token";
import { createClient } from "@supabase/supabase-js";
import { getProcoreUser } from "@/lib/procore";
import {
  getUserPermissions,
  checkPermission,
  MODULES,
  ACCESS_LEVELS,
  type AccessLevel,
} from "@/lib/permissions";

const COMPANY_ID = process.env.FLEEK_COMPANY_ID ?? "";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

async function resolveEmail(accessToken: string, request: NextRequest): Promise<string | null> {
  // Try cached cookie first
  const cookieHeader = request.headers.get("cookie") ?? "";
  const emailMatch = cookieHeader.match(/holdpoint_user_email=([^;]+)/);
  if (emailMatch) return decodeURIComponent(emailMatch[1]).toLowerCase().trim();

  // Fall back to Procore /me
  try {
    const user = await getProcoreUser(accessToken);
    return user.login.toLowerCase().trim();
  } catch {
    return null;
  }
}

// ── GET ─────────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const accessToken = await resolveAccessToken();
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const email = await resolveEmail(accessToken, request);
  if (!email) {
    return NextResponse.json({ error: "Could not identify user" }, { status: 401 });
  }

  const isAdminRequest = request.nextUrl.searchParams.get("admin") === "true";

  if (!isAdminRequest) {
    // Return current user's own permissions
    const perms = await getUserPermissions(COMPANY_ID, email);
    if (!perms) {
      // User exists in Procore but not yet in saas_users → no access
      return NextResponse.json({
        user: { email, name: null, is_super_admin: false },
        permissions: Object.fromEntries(MODULES.map(m => [m.key, "none"])),
        modules: MODULES,
      });
    }
    return NextResponse.json({
      user: { email: perms.user.email, name: perms.user.name, is_super_admin: perms.user.is_super_admin },
      permissions: perms.permissions,
      modules: MODULES,
    });
  }

  // ── Admin request: return all users + their permissions ──────────────────
  const canManage = await checkPermission(COMPANY_ID, email, "permissions", "admin");
  if (!canManage) {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
  }

  const supabase = getSupabase();

  // Fetch all users for this company
  const { data: users, error: usersErr } = await supabase
    .from("saas_users")
    .select("id, company_id, procore_user_id, email, name, is_super_admin, first_login, last_login")
    .eq("company_id", COMPANY_ID)
    .order("name", { ascending: true });

  if (usersErr) {
    return NextResponse.json({ error: usersErr.message }, { status: 500 });
  }

  // Fetch all permissions for this company
  const { data: allPerms } = await supabase
    .from("saas_permissions")
    .select("user_email, module_key, access_level")
    .eq("company_id", COMPANY_ID);

  // Build per-user permission map
  const permMap = new Map<string, Record<string, string>>();
  if (allPerms) {
    for (const p of allPerms) {
      if (!permMap.has(p.user_email)) {
        permMap.set(p.user_email, {});
      }
      permMap.get(p.user_email)![p.module_key] = p.access_level;
    }
  }

  const usersWithPerms = (users ?? []).map(u => ({
    ...u,
    permissions: Object.fromEntries(
      MODULES.map(m => [m.key, u.is_super_admin ? "admin" : (permMap.get(u.email)?.[m.key] ?? "none")])
    ),
  }));

  return NextResponse.json({
    users: usersWithPerms,
    modules: MODULES,
    access_levels: ACCESS_LEVELS,
  });
}

// ── POST ────────────────────────────────────────────────────────────────────
// Body: { target_email: string, permissions: Record<string, AccessLevel> }

export async function POST(request: NextRequest) {
  const accessToken = await resolveAccessToken();
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const callerEmail = await resolveEmail(accessToken, request);
  if (!callerEmail) {
    return NextResponse.json({ error: "Could not identify user" }, { status: 401 });
  }

  // Check caller has permissions-admin access
  const canManage = await checkPermission(COMPANY_ID, callerEmail, "permissions", "admin");
  if (!canManage) {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
  }

  let body: { target_email: string; permissions: Record<string, string> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { target_email, permissions } = body;
  if (!target_email || !permissions) {
    return NextResponse.json({ error: "target_email and permissions required" }, { status: 400 });
  }

  const normalTarget = target_email.toLowerCase().trim();

  // Prevent modifying super admin permissions (they always have full access)
  const supabase = getSupabase();
  const { data: targetUser } = await supabase
    .from("saas_users")
    .select("is_super_admin")
    .eq("company_id", COMPANY_ID)
    .eq("email", normalTarget)
    .single();

  if (targetUser?.is_super_admin) {
    return NextResponse.json({ error: "Cannot modify Super Admin permissions" }, { status: 403 });
  }

  // Prevent non-super-admin from granting permissions-admin to others
  const { data: callerUser } = await supabase
    .from("saas_users")
    .select("is_super_admin")
    .eq("company_id", COMPANY_ID)
    .eq("email", callerEmail)
    .single();

  if (permissions.permissions === "admin" && !callerUser?.is_super_admin) {
    return NextResponse.json({ error: "Only Super Admin can grant permissions-admin access" }, { status: 403 });
  }

  // Fetch existing permissions for audit
  const { data: existingPerms } = await supabase
    .from("saas_permissions")
    .select("module_key, access_level")
    .eq("company_id", COMPANY_ID)
    .eq("user_email", normalTarget);

  const oldMap: Record<string, string> = {};
  if (existingPerms) {
    for (const p of existingPerms) oldMap[p.module_key] = p.access_level;
  }

  // Upsert permissions and audit changes
  const auditEntries: { module_key: string; old_level: string; new_level: string }[] = [];

  for (const [moduleKey, level] of Object.entries(permissions)) {
    if (!MODULES.some(m => m.key === moduleKey)) continue;
    if (!ACCESS_LEVELS.includes(level as AccessLevel)) continue;

    const oldLevel = oldMap[moduleKey] ?? "none";
    if (oldLevel === level) continue; // no change

    await supabase
      .from("saas_permissions")
      .upsert(
        {
          company_id: COMPANY_ID,
          user_email: normalTarget,
          module_key: moduleKey,
          access_level: level,
          updated_at: new Date().toISOString(),
          updated_by: callerEmail,
        },
        { onConflict: "company_id,user_email,module_key" },
      );

    auditEntries.push({ module_key: moduleKey, old_level: oldLevel, new_level: level });
  }

  // Write audit log
  if (auditEntries.length > 0) {
    const rows = auditEntries.map(e => ({
      company_id: COMPANY_ID,
      target_email: normalTarget,
      module_key: e.module_key,
      old_level: e.old_level,
      new_level: e.new_level,
      changed_by: callerEmail,
      changed_at: new Date().toISOString(),
    }));
    await supabase.from("saas_permission_audit").insert(rows);
  }

  return NextResponse.json({
    success: true,
    changes: auditEntries.length,
    details: auditEntries,
  });
}
