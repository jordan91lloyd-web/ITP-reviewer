// ─── GET /api/auth/login ──────────────────────────────────────────────────
// Redirects the user to the Procore OAuth authorization page.
// Generates a random `state` value and stores it in a cookie so the
// callback handler can verify it (prevents CSRF attacks).

import { NextResponse } from "next/server";
import { buildAuthorizationUrl } from "@/lib/procore";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";

export async function GET() {
  // Generate a random state token
  const state = randomBytes(16).toString("hex");

  // Store it in a short-lived cookie so we can verify it on callback
  const cookieStore = await cookies();
  cookieStore.set("procore_oauth_state", state, {
    httpOnly: true,
    secure: false,         // false for localhost (http)
    sameSite: "lax",
    maxAge: 60 * 10,       // 10 minutes
    path: "/",
  });

  const authUrl = buildAuthorizationUrl(state);
  console.log("[auth/login] Redirecting to Procore OAuth:", authUrl);

  return NextResponse.redirect(authUrl);
}
