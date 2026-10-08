// ─── resolveAccessToken ────────────────────────────────────────────────────
// Unified auth helper for API routes. Tries two paths in order:
//   1. Browser session cookie (procore_access_token)
//   2. Token store fallback (Supabase procore_tokens table)
//
// This lets routes work for both browser sessions AND server-side callers
// (cron jobs, CLI testing, background workers) without code changes.
//
// Usage in a route:
//   const token = await resolveAccessToken();
//   if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

import { cookies } from "next/headers";
import { getValidToken } from "@/lib/token-store";

const COMPANY_ID = process.env.FLEEK_COMPANY_ID ?? "";
const PINNED_USER_ID = process.env.MCP_PROCORE_USER_ID ?? "";

/**
 * Returns a valid Procore access token, or null if none is available.
 *
 * Path 1: cookie — the browser session set at OAuth callback.
 * Path 2: token store — the Supabase-backed refresh token for the pinned user.
 */
export async function resolveAccessToken(): Promise<string | null> {
  // Path 1: browser cookie
  try {
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get("procore_access_token")?.value;
    if (cookieToken) return cookieToken;
  } catch {
    // cookies() throws outside of a request context — ignore
  }

  // Path 2: token store (background / server-side)
  if (COMPANY_ID && PINNED_USER_ID) {
    const storeToken = await getValidToken(COMPANY_ID, PINNED_USER_ID);
    if (storeToken) return storeToken;
  }

  return null;
}
