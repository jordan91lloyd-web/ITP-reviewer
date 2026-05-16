// ─── GET /api/auth/me ─────────────────────────────────────────────────────
// Returns the currently authenticated Procore user, or 401 if not logged in.
// The frontend uses this to show/hide the "Connect to Procore" button.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getProcoreUser, refreshAccessToken } from "@/lib/procore";
import { upsertToken } from "@/lib/token-store";

export async function GET() {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("procore_access_token")?.value;
  const refreshToken = cookieStore.get("procore_refresh_token")?.value;
  const expiresAt = Number(cookieStore.get("procore_token_expires_at")?.value ?? 0);

  if (!accessToken) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  // Holds refreshed tokens to be written to the response cookies below
  let refreshedTokens: { access_token: string; refresh_token: string; expires_in: number } | null = null;

  // Auto-refresh if the token is within 5 minutes of expiry
  if (Date.now() > expiresAt - 5 * 60 * 1000 && refreshToken) {
    try {
      const newTokens = await refreshAccessToken(refreshToken);
      accessToken = newTokens.access_token;
      refreshedTokens = newTokens;
      console.log("[auth/me] Access token refreshed successfully");
    } catch (err) {
      console.error("[auth/me] Token refresh failed:", err);
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
  }

  try {
    const user = await getProcoreUser(accessToken);
    const res = NextResponse.json({ authenticated: true, user });

    // Write all three token cookies and sync the token store when a refresh occurred.
    // Previously only access_token and expires_at were updated — refresh_token was
    // silently dropped, causing every subsequent refresh to fail (Procore rotates it).
    if (refreshedTokens) {
      const newExpiresAt = Date.now() + refreshedTokens.expires_in * 1000;
      res.cookies.set("procore_access_token", refreshedTokens.access_token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: refreshedTokens.expires_in,
        path: "/",
      });
      res.cookies.set("procore_refresh_token", refreshedTokens.refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      res.cookies.set("procore_token_expires_at", String(newExpiresAt), {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      // Sync to Supabase token store for background queue use
      const companyId = process.env.FLEEK_COMPANY_ID ?? "default";
      void upsertToken(companyId, String(user.id), {
        access_token:  refreshedTokens.access_token,
        refresh_token: refreshedTokens.refresh_token,
        expires_at:    newExpiresAt,
      });
    }

    return res;
  } catch (err) {
    console.error("[auth/me] Failed to fetch user:", err);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
