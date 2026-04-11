// ─── GET /api/auth/me ─────────────────────────────────────────────────────
// Returns the currently authenticated Procore user, or 401 if not logged in.
// The frontend uses this to show/hide the "Connect to Procore" button.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getProcoreUser, refreshAccessToken } from "@/lib/procore";

export async function GET() {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("procore_access_token")?.value;
  const refreshToken = cookieStore.get("procore_refresh_token")?.value;
  const expiresAt = Number(cookieStore.get("procore_token_expires_at")?.value ?? 0);

  if (!accessToken) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  // Auto-refresh if the token is within 5 minutes of expiry
  if (Date.now() > expiresAt - 5 * 60 * 1000 && refreshToken) {
    try {
      const newTokens = await refreshAccessToken(refreshToken);
      accessToken = newTokens.access_token;

      const response = NextResponse.json({ authenticated: false });
      response.cookies.set("procore_access_token", newTokens.access_token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: newTokens.expires_in,
        path: "/",
      });
      response.cookies.set("procore_token_expires_at", String(Date.now() + newTokens.expires_in * 1000), {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      console.log("[auth/me] Access token refreshed successfully");
    } catch (err) {
      console.error("[auth/me] Token refresh failed:", err);
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
  }

  try {
    const user = await getProcoreUser(accessToken);
    return NextResponse.json({ authenticated: true, user });
  } catch (err) {
    console.error("[auth/me] Failed to fetch user:", err);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
