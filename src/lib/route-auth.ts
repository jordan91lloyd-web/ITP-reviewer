// ─── Route-level auth + permission check ──────────────────────────────────────
// Combines resolveAccessToken + permission checking into a single call
// that API routes can use.
//
// Usage:
//   const auth = await requirePermission(request, "itp_reviews", "view");
//   if (auth.error) return auth.error;
//   // auth.token, auth.email are available

import { NextRequest, NextResponse } from "next/server";
import { resolveAccessToken } from "@/lib/resolve-token";
import { checkPermission, type AccessLevel } from "@/lib/permissions";
import { getProcoreUser } from "@/lib/procore";

const COMPANY_ID = process.env.FLEEK_COMPANY_ID ?? "";

interface AuthSuccess {
  token: string;
  email: string;
  error: null;
}

interface AuthFailure {
  token: null;
  email: null;
  error: NextResponse;
}

type AuthResult = AuthSuccess | AuthFailure;

/**
 * Resolves the caller's email from cookies or Procore /me.
 */
async function resolveEmail(request: NextRequest, token: string): Promise<string | null> {
  // Try cached cookie first
  const cookieHeader = request.headers.get("cookie") ?? "";
  const emailMatch = cookieHeader.match(/holdpoint_user_email=([^;]+)/);
  if (emailMatch) return decodeURIComponent(emailMatch[1]).toLowerCase().trim();

  // Fall back to Procore
  try {
    const user = await getProcoreUser(token);
    return user.login.toLowerCase().trim();
  } catch {
    return null;
  }
}

/**
 * Checks authentication and permission in one call.
 * Returns { token, email, error: null } on success, or { error: NextResponse } on failure.
 */
export async function requirePermission(
  request: NextRequest,
  moduleKey: string,
  requiredLevel: AccessLevel,
): Promise<AuthResult> {
  const token = await resolveAccessToken();
  if (!token) {
    return { token: null, email: null, error: NextResponse.json({ error: "Not authenticated" }, { status: 401 }) };
  }

  const email = await resolveEmail(request, token);
  if (!email) {
    return { token: null, email: null, error: NextResponse.json({ error: "Could not identify user" }, { status: 401 }) };
  }

  const allowed = await checkPermission(COMPANY_ID, email, moduleKey, requiredLevel);
  if (!allowed) {
    return { token: null, email: null, error: NextResponse.json({ error: "Insufficient permissions" }, { status: 403 }) };
  }

  return { token, email, error: null };
}

/**
 * Lighter version — just checks auth + resolves email, no permission check.
 * Use for routes that need the user identity but don't map to a specific module.
 */
export async function requireAuth(
  request: NextRequest,
): Promise<AuthResult> {
  const token = await resolveAccessToken();
  if (!token) {
    return { token: null, email: null, error: NextResponse.json({ error: "Not authenticated" }, { status: 401 }) };
  }

  const email = await resolveEmail(request, token);
  if (!email) {
    return { token: null, email: null, error: NextResponse.json({ error: "Could not identify user" }, { status: 401 }) };
  }

  return { token, email, error: null };
}
