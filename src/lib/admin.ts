// ─── Admin Utility ────────────────────────────────────────────────────────────
// Checks whether a given email is a registered admin for a company.
// Used by API routes to gate access to admin-only features.
// Never throws — returns false on any error so callers can proceed safely.

import { createClient } from "@supabase/supabase-js";

export async function isCompanyAdmin(
  email:      string,
  company_id: string
): Promise<boolean> {
  if (!email || !company_id) return false;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Prefer service role key so RLS doesn't block the lookup; fall back to publishable key
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) return false;

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from("company_admins")
      .select("id")
      .eq("company_id", company_id)
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();

    if (error) {
      console.error("[admin] isCompanyAdmin query failed:", error.message);
      return false;
    }
    return data !== null;
  } catch (err) {
    console.error("[admin] isCompanyAdmin unexpected error:", err);
    return false;
  }
}
