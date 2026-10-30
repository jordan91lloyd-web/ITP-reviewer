// ─── POST /api/permissions/sync ──────────────────────────────────────────────
// Syncs the Procore company directory into saas_users.
// Only fetches users matching ALLOWED_EMAIL_DOMAINS (e.g. fleekconstructions.au).
// Creates new saas_users records for anyone not already in the table.
// Never removes users or modifies existing permissions.
// Requires permissions-admin access.

import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/route-auth";
import { resolveAccessToken } from "@/lib/resolve-token";
import { createClient } from "@supabase/supabase-js";

const COMPANY_ID = process.env.FLEEK_COMPANY_ID ?? "";
const PROCORE_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

// Domains to include — matches ALLOWED_EMAIL_DOMAINS or falls back to fleekconstructions
const ALLOWED_DOMAINS = (process.env.ALLOWED_EMAIL_DOMAINS ?? "fleekconstructions.au,fleekconstructions.com.au")
  .split(",")
  .map(d => d.trim().toLowerCase())
  .filter(Boolean);

export async function POST(request: NextRequest) {
  const auth = await requirePermission(request, "permissions", "admin");
  if (auth.error) return auth.error;

  const accessToken = await resolveAccessToken();
  if (!accessToken) {
    return NextResponse.json({ error: "No Procore token available" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  // Fetch all active employees from Procore (paginated)
  interface ProcoreCompanyUser {
    id: number;
    email_address: string;
    name: string;
    first_name: string;
    last_name: string;
    job_title: string | null;
    is_active: boolean;
    is_employee: boolean;
  }

  const allUsers: ProcoreCompanyUser[] = [];
  let page = 1;
  while (true) {
    const res = await fetch(
      `${PROCORE_BASE}/rest/v1.0/companies/${COMPANY_ID}/users?per_page=250&page=${page}&filters[is_active]=true`,
      { headers: { Authorization: `Bearer ${accessToken}`, "Procore-Company-Id": COMPANY_ID } },
    );
    if (!res.ok) break;
    const data: ProcoreCompanyUser[] = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    allUsers.push(...data);
    if (data.length < 250) break;
    page++;
    await new Promise(r => setTimeout(r, 600));
  }

  // Filter to allowed domains
  const domainUsers = allUsers.filter(u => {
    if (!u.email_address) return false;
    const email = u.email_address.toLowerCase().trim();
    const domain = email.split("@").pop() ?? "";
    return ALLOWED_DOMAINS.includes(domain);
  });

  // Fetch existing saas_users for this company
  const { data: existing } = await supabase
    .from("saas_users")
    .select("email")
    .eq("company_id", COMPANY_ID);

  const existingEmails = new Set((existing ?? []).map(u => u.email.toLowerCase()));

  // Upsert — create new, update name/procore_user_id on existing
  let created = 0;
  let updated = 0;

  for (const u of domainUsers) {
    const email = u.email_address.toLowerCase().trim();
    const name = u.name || `${u.first_name ?? ""} ${u.last_name ?? ""}`.trim() || email.split("@")[0];

    if (existingEmails.has(email)) {
      // Update name and procore_user_id if changed
      await supabase
        .from("saas_users")
        .update({ name, procore_user_id: String(u.id) })
        .eq("company_id", COMPANY_ID)
        .eq("email", email);
      updated++;
    } else {
      // Create new user — defaults to no permissions, not super admin
      await supabase
        .from("saas_users")
        .insert({
          company_id: COMPANY_ID,
          procore_user_id: String(u.id),
          email,
          name,
          is_super_admin: false,
        });
      created++;
    }
  }

  return NextResponse.json({
    success: true,
    procore_total: allUsers.length,
    domain_matched: domainUsers.length,
    created,
    updated,
    domains: ALLOWED_DOMAINS,
  });
}
