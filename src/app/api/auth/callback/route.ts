// ─── GET /api/auth/callback ───────────────────────────────────────────────
// Procore redirects here after the user authorizes the app.
// Verifies the state param, exchanges the code for tokens, checks that the
// user belongs to the authorised company (FLEEK_COMPANY_ID), then stores
// the access token in a cookie and redirects back to the homepage.

import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens, getProcoreUser } from "@/lib/procore";
import { cookies } from "next/headers";
import { logAuditEvent, resolveAuditUser, AUDIT_ACTIONS } from "@/lib/audit";
import { upsertToken } from "@/lib/token-store";

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

  // ── Email / domain access check ───────────────────────────────────────────
  // Priority: ALLOWED_EMAILS (explicit list) > ALLOWED_EMAIL_DOMAINS (domain gate)
  // If neither is set, anyone who passed the company check is allowed.
  const allowedEmailsRaw = (process.env.ALLOWED_EMAILS ?? "").trim();
  const allowedDomainsRaw = (process.env.ALLOWED_EMAIL_DOMAINS ?? "").trim();

  if (allowedEmailsRaw || allowedDomainsRaw) {
    let userEmail = "";
    try {
      const user = await getProcoreUser(tokens.access_token);
      userEmail = (user.login ?? "").toLowerCase().trim();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[auth/callback] Failed to fetch user for email check:", msg);
      return NextResponse.redirect(
        new URL(`/?auth_error=${encodeURIComponent("Could not verify user email")}`, request.url)
      );
    }

    const auditCompanyId = process.env.FLEEK_COMPANY_ID ?? "unknown";
    let allowed = false;
    let ruleUsed = "";

    if (allowedEmailsRaw) {
      // Rule 1: explicit email list (overrides domain check)
      const allowedSet = new Set(
        allowedEmailsRaw.split(",").map(e => e.trim().toLowerCase()).filter(Boolean)
      );
      allowed = allowedSet.has(userEmail);
      ruleUsed = "email_allowlist";
    } else {
      // Rule 2: domain check
      const allowedDomains = new Set(
        allowedDomainsRaw.split(",").map(d => d.trim().toLowerCase()).filter(Boolean)
      );
      const atIdx = userEmail.lastIndexOf("@");
      const userDomain = atIdx >= 0 ? userEmail.slice(atIdx + 1) : "";
      allowed = allowedDomains.has(userDomain);
      ruleUsed = "domain_allowlist";
    }

    if (!allowed) {
      console.warn(`[auth/callback] Email "${userEmail}" rejected by ${ruleUsed} — access denied`);
      void logAuditEvent({
        company_id: auditCompanyId,
        user_id: "unknown",
        user_name: userEmail,
        user_email: userEmail,
        action: AUDIT_ACTIONS.LOGIN_REJECTED,
        details: { reason: ruleUsed, email: userEmail },
      });
      return NextResponse.redirect(
        new URL("/?error=email_not_allowed", request.url)
      );
    }
    console.log(`[auth/callback] Access check passed for ${userEmail} (${ruleUsed})`);
  }

  // ── Store tokens in cookies ───────────────────────────────────────────────
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

  // Persist tokens to Supabase store for background queue use (non-blocking).
  // Only store when we have a real company_id — the process route looks up tokens
  // by the numeric Procore company ID sent in the job record, so the stored
  // company_id must match exactly. Skip when FLEEK_COMPANY_ID is unset (dev mode).
  if (fleekCompanyId) {
    void getProcoreUser(tokens.access_token)
      .then(user =>
        upsertToken(fleekCompanyId, String(user.id), {
          access_token:  tokens.access_token,
          refresh_token: tokens.refresh_token,
          expires_at:    expiresAt,
        })
      )
      .catch(err => console.error("[auth/callback] Failed to persist token to store:", err));
  }

  // Fire-and-forget audit log — must not delay the redirect
  const fleekId = process.env.FLEEK_COMPANY_ID ?? "unknown";
  void resolveAuditUser(tokens.access_token).then(auditUser =>
    logAuditEvent({
      ...auditUser,
      company_id: fleekId,
      action: AUDIT_ACTIONS.LOGIN,
    })
  );

  // ── MCP OAuth return-to redirect ──────────────────────────────────────────
  // If the user arrived here via the MCP OAuth authorize flow (which set a
  // return_to cookie), redirect back to the authorize URL so the OAuth flow
  // continues. Otherwise, redirect to the homepage as usual.
  const mcpReturnTo = cookieStore.get("mcp_oauth_return_to")?.value;
  if (mcpReturnTo) {
    // Validate: must be a relative path starting with /oauth/authorize.
    // Reject anything absolute or pointing elsewhere (open redirect defence).
    const safe =
      mcpReturnTo.startsWith("/oauth/authorize") &&
      !mcpReturnTo.startsWith("//") &&
      !mcpReturnTo.includes("://");

    // Delete the cookie regardless — single use
    cookieStore.delete("mcp_oauth_return_to");

    if (safe) {
      console.log("[auth/callback] MCP OAuth return_to redirect:", mcpReturnTo);
      return NextResponse.redirect(new URL(mcpReturnTo, request.url));
    }
    console.warn("[auth/callback] Rejected invalid mcp_oauth_return_to:", mcpReturnTo);
  }

  return NextResponse.redirect(new URL("/?auth=success", request.url));
}
