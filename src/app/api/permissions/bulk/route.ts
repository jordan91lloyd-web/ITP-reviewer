// ─── POST /api/permissions/bulk ──────────────────────────────────────────────
// Applies a permission template to multiple users at once.
// Body: { user_emails: string[], permissions: Record<string, string> }

import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/route-auth";
import { createClient } from "@supabase/supabase-js";
import { MODULES, ACCESS_LEVELS, type AccessLevel } from "@/lib/permissions";

const COMPANY_ID = process.env.FLEEK_COMPANY_ID ?? "";

export async function POST(request: NextRequest) {
  const auth = await requirePermission(request, "permissions", "admin");
  if (auth.error) return auth.error;

  let body: { user_emails: string[]; permissions: Record<string, string> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { user_emails, permissions } = body;
  if (!user_emails?.length || !permissions) {
    return NextResponse.json({ error: "user_emails[] and permissions required" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  // Prevent modifying super admins
  const { data: superAdmins } = await supabase
    .from("saas_users")
    .select("email")
    .eq("company_id", COMPANY_ID)
    .eq("is_super_admin", true);

  const superSet = new Set((superAdmins ?? []).map(u => u.email.toLowerCase()));
  const targetEmails = user_emails
    .map(e => e.toLowerCase().trim())
    .filter(e => !superSet.has(e));

  if (targetEmails.length === 0) {
    return NextResponse.json({ error: "No valid users to update (super admins excluded)" }, { status: 400 });
  }

  let totalChanges = 0;
  const auditRows: { company_id: string; target_email: string; module_key: string; old_level: string; new_level: string; changed_by: string; changed_at: string }[] = [];

  for (const email of targetEmails) {
    // Fetch existing permissions for audit
    const { data: existingPerms } = await supabase
      .from("saas_permissions")
      .select("module_key, access_level")
      .eq("company_id", COMPANY_ID)
      .eq("user_email", email);

    const oldMap: Record<string, string> = {};
    if (existingPerms) {
      for (const p of existingPerms) oldMap[p.module_key] = p.access_level;
    }

    for (const m of MODULES) {
      const newLevel = permissions[m.key];
      if (!newLevel || !ACCESS_LEVELS.includes(newLevel as AccessLevel)) continue;

      const oldLevel = oldMap[m.key] ?? "none";
      if (oldLevel === newLevel) continue;

      await supabase
        .from("saas_permissions")
        .upsert(
          {
            company_id: COMPANY_ID,
            user_email: email,
            module_key: m.key,
            access_level: newLevel,
            updated_at: new Date().toISOString(),
            updated_by: auth.email,
          },
          { onConflict: "company_id,user_email,module_key" },
        );

      auditRows.push({
        company_id: COMPANY_ID,
        target_email: email,
        module_key: m.key,
        old_level: oldLevel,
        new_level: newLevel,
        changed_by: auth.email,
        changed_at: new Date().toISOString(),
      });

      totalChanges++;
    }
  }

  if (auditRows.length > 0) {
    await supabase.from("saas_permission_audit").insert(auditRows);
  }

  return NextResponse.json({
    success: true,
    users_updated: targetEmails.length,
    total_changes: totalChanges,
  });
}
