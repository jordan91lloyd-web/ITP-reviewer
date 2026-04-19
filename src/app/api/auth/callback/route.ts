// ─── GET /api/auth/callback ───────────────────────────────────────────────
// Procore redirects here after the user authorizes the app.
// Verifies the state param, exchanges the code for tokens, checks that the
// user belongs to the authorised company (FLEEK_COMPANY_ID), then stores
// the access token in a cookie and redirects back to the homepage.

import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/procore";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  // ── Handle user-denied or Procore error ──────────────────────────────────
  if (error) {
    console.error("[auth/callback] Procore returned error:", error);
    return NextResponse.redirect(
      new URL(`/?auth_error=${encodeURIComponent(error)}`, request.url)
    );
  }

  if (!code || !state) {
    console.error("[auth/callback] Missing code or state in callback");
    return NextResponse.redirect(new URL("/?auth_error=missing_params", request.url));
  }

  // ── Verify state to prevent CSRF ─────────────────────────────────────────
  const cookieStore = await cookies();
  const savedState = cookieStore.get("procore_oauth_state")?.value;

  if (!savedState || savedState !== state) {
    console.error("[auth/callback] State mismatch — possible CSRF attempt");
    return NextResponse.redirect(new URL("/?auth_error=state_mismatch", request.url));
  }

  // Clear the state cookie — it's single-use
  cookieStore.delete("procore_oauth_state");

  // ── Exchange code for tokens ─────────────────────────────────────────────
  let tokens;
  try {
    tokens = await exchangeCodeForTokens(code);
    console.log("[auth/callback] Token exchange successful");
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Token exchange failed";
    console.error("[auth/callback]", msg);
    return NextResponse.redirect(
      new URL(`/?auth_error=${encodeURIComponent(msg)}`, request.url)
    );
  }

  // ── Verify company membership ────────────────────────────────────────────
  // Only users who belong to FLEEK_COMPANY_ID are permitted to use the app.
  const fleekCompanyId = process.env.FLEEK_COMPANY_ID;
  if (fleekCompanyId) {
    const procoreApiBase =
      process.env.PROCORE_API_BASE_URL ??
      (process.env.PROCORE_ENV === "sandbox"
        ? "https://sandbox.procore.com"
        : "https://api.procore.com");

    try {
      const companiesRes = await fetch(`${procoreApiBase}/rest/v1.0/companies`, {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });
      if (!companiesRes.ok) {
        throw new Error(`Procore /companies returned ${companiesRes.status}`);
      }
      const companies: { id: number }[] = await companiesRes.json();
      const isMember = companies.some(c => String(c.id) === fleekCompanyId);
      if (!isMember) {
        console.warn(
          `[auth/callback] User is not a member of company ${fleekCompanyId} — access denied`
        );
        return NextResponse.redirect(new URL("/?error=unauthorized", request.url));
      }
      console.log(`[auth/callback] Company membership confirmed for company ${fleekCompanyId}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[auth/callback] Company check failed:", msg);
      return NextResponse.redirect(
        new URL(`/?auth_error=${encodeURIComponent("Company verification failed: " + msg)}`, request.url)
      );
    }
  }

  // ── Store tokens in cookies ───────────────────────────────────────────────
  // For a local dev app, cookies are fine.
  // In production you'd encrypt these or store them server-side.
  const expiresAt = Date.now() + tokens.expires_in * 1000;

  cookieStore.set("procore_access_token", tokens.access_token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: tokens.expires_in,
    path: "/",
  });

  cookieStore.set("procore_refresh_token", tokens.refresh_token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  cookieStore.set("procore_token_expires_at", String(expiresAt), {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  console.log("[auth/callback] Tokens stored. Redirecting to homepage.");
  return NextResponse.redirect(new URL("/?auth=success", request.url));
}
