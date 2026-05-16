// ─── Procore Token Store ───────────────────────────────────────────────────────
// Manages Procore OAuth tokens in Supabase (procore_tokens table).
// Used by the background queue to obtain fresh tokens without browser cookies.
//
// All three exported functions NEVER throw — errors are logged only.
// The cookie-based auth flow is unchanged; this store is additive.
//
// See src/lib/history.ts for the CREATE TABLE / ALTER TABLE statements.

import { createClient } from "@supabase/supabase-js";
import { refreshAccessToken } from "@/lib/procore";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface TokenRow {
  access_token:  string;
  refresh_token: string;
  expires_at:    number;
}

// ── upsertToken ────────────────────────────────────────────────────────────────

/**
 * Inserts or updates the token record for a (company_id, user_id) pair.
 * Call this after every OAuth callback and after every token refresh.
 */
export async function upsertToken(
  company_id: string,
  user_id:    string,
  tokens: { access_token: string; refresh_token: string; expires_at: number }
): Promise<void> {
  try {
    const { error } = await supabase
      .from("procore_tokens")
      .upsert(
        {
          company_id,
          user_id,
          access_token:  tokens.access_token,
          refresh_token: tokens.refresh_token,
          expires_at:    tokens.expires_at,
          updated_at:    new Date().toISOString(),
        },
        { onConflict: "company_id,user_id" }
      );
    if (error) {
      console.error("[token-store] upsertToken error:", error.message);
    }
  } catch (err) {
    console.error("[token-store] upsertToken threw:", err);
  }
}

// ── getValidToken ──────────────────────────────────────────────────────────────

/**
 * Returns a valid Procore access token for (company_id, user_id).
 *
 * - If no record exists, returns null.
 * - If the token expires more than 5 minutes from now, returns it as-is.
 * - If within 5 minutes of expiry or already expired, attempts a refresh:
 *     - On success: upserts the new tokens and returns the new access_token.
 *     - On failure: returns null.
 */
export async function getValidToken(
  company_id: string,
  user_id:    string
): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("procore_tokens")
      .select("access_token, refresh_token, expires_at")
      .eq("company_id", company_id)
      .eq("user_id", user_id)
      .single();

    if (error || !data) {
      console.warn(
        `[token-store] getValidToken: no record for company=${company_id} user=${user_id}`
      );
      return null;
    }

    const row = data as TokenRow;

    // Token is fresh — return it directly
    if (row.expires_at > Date.now() + 5 * 60 * 1000) {
      return row.access_token;
    }

    // Token is expiring / expired — refresh it
    console.log(
      `[token-store] getValidToken: refreshing token for company=${company_id} user=${user_id}`
    );
    try {
      const newTokens = await refreshAccessToken(row.refresh_token);
      const newExpiresAt = Date.now() + newTokens.expires_in * 1000;
      await upsertToken(company_id, user_id, {
        access_token:  newTokens.access_token,
        refresh_token: newTokens.refresh_token,
        expires_at:    newExpiresAt,
      });
      return newTokens.access_token;
    } catch (refreshErr) {
      console.error("[token-store] getValidToken: refresh failed:", refreshErr);
      return null;
    }
  } catch (err) {
    console.error("[token-store] getValidToken threw:", err);
    return null;
  }
}

// ── deleteToken ────────────────────────────────────────────────────────────────

/**
 * Removes the token record for (company_id, user_id) on logout.
 */
export async function deleteToken(
  company_id: string,
  user_id:    string
): Promise<void> {
  try {
    const { error } = await supabase
      .from("procore_tokens")
      .delete()
      .eq("company_id", company_id)
      .eq("user_id", user_id);
    if (error) {
      console.error("[token-store] deleteToken error:", error.message);
    }
  } catch (err) {
    console.error("[token-store] deleteToken threw:", err);
  }
}
