// ─── GET /api/auth/callback ───────────────────────────────────────────────
// Procore redirects here after the user authorizes the app.
// Verifies the state param, exchanges the code for tokens, then stores
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
