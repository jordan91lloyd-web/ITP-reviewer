// ─── GET /oauth/authorize ─────────────────────────────────────────────────────
// OAuth 2.1 Authorization Endpoint.
//
// Claude opens this URL in the user's browser. The user must have an existing
// Procore session (cookies) and pass the email allowlist. If both checks pass,
// an approve page is shown. On approval, we generate a one-time authorization
// code and redirect back to Claude's redirect_uri.
//
// Query params (from Claude):
//   response_type=code  (required)
//   client_id           (must match MCP_OAUTH_CLIENT_ID)
//   redirect_uri        (logged; permissive for first deploy, locked down after)
//   code_challenge      (PKCE S256)
//   code_challenge_method=S256
//   state               (opaque, returned unchanged)
//   scope               (optional, ignored for now)
//   resource            (optional, RFC 8707)
//
// POST /oauth/authorize — form submission from the approve page.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getProcoreUser } from "@/lib/procore";
import { refreshAccessToken } from "@/lib/procore";
import {
  validateClientId,
  checkEmailAllowlist,
  generateAuthCode,
  supabaseMcpClient,
  logMcpRequest,
  issuerUrl,
} from "@/lib/mcp-oauth";
import { logAuditEvent, AUDIT_ACTIONS } from "@/lib/audit";

// ── Accepted redirect URIs (exact string match) ──────────────────────────────
const ALLOWED_REDIRECT_URIS: string[] = [
  "https://claude.ai/api/mcp/auth_callback",
];

function isRedirectAllowed(uri: string): boolean {
  return ALLOWED_REDIRECT_URIS.includes(uri);
}

// ── Error redirect helper ─────────────────────────────────────────────────────

function errorRedirect(redirectUri: string, error: string, description: string, state?: string) {
  const url = new URL(redirectUri);
  url.searchParams.set("error", error);
  url.searchParams.set("error_description", description);
  if (state) url.searchParams.set("state", state);
  return NextResponse.redirect(url.toString(), 303);
}

// ── GET: validate params, check session + allowlist, render approve page ───────

export async function GET(request: NextRequest) {
  logMcpRequest("authorize", request);

  const { searchParams } = new URL(request.url);
  const responseType = searchParams.get("response_type");
  const clientId = searchParams.get("client_id") ?? "";
  const redirectUri = searchParams.get("redirect_uri") ?? "";
  const codeChallenge = searchParams.get("code_challenge") ?? "";
  const codeChallengeMethod = searchParams.get("code_challenge_method") ?? "";
  const state = searchParams.get("state") ?? "";
  const scope = searchParams.get("scope") ?? "";
  const resource = searchParams.get("resource") ?? "";

  console.log("[oauth/authorize] Params:", {
    responseType, clientId, redirectUri, codeChallenge: codeChallenge.slice(0, 10) + "...",
    codeChallengeMethod, state: state.slice(0, 10) + "...", scope, resource,
  });

  // ── Validate required params ────────────────────────────────────────────
  if (responseType !== "code") {
    return Response.json(
      { error: "unsupported_response_type", error_description: "Only response_type=code is supported" },
      { status: 400 }
    );
  }

  if (!validateClientId(clientId)) {
    return Response.json(
      { error: "invalid_client", error_description: "Unknown client_id" },
      { status: 400 }
    );
  }

  if (!redirectUri) {
    return Response.json(
      { error: "invalid_request", error_description: "redirect_uri is required" },
      { status: 400 }
    );
  }

  if (!isRedirectAllowed(redirectUri)) {
    return Response.json(
      { error: "invalid_request", error_description: "redirect_uri is not allowed" },
      { status: 400 }
    );
  }

  if (!codeChallenge || codeChallengeMethod !== "S256") {
    return errorRedirect(redirectUri, "invalid_request", "PKCE with S256 is required", state);
  }

  // ── Check Procore session ───────────────────────────────────────────────
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("procore_access_token")?.value;
  const refreshToken = cookieStore.get("procore_refresh_token")?.value;
  const expiresAt = Number(cookieStore.get("procore_token_expires_at")?.value ?? 0);

  // Auto-refresh if within 5 minutes of expiry
  if (accessToken && refreshToken && Date.now() > expiresAt - 5 * 60 * 1000) {
    try {
      const newTokens = await refreshAccessToken(refreshToken);
      accessToken = newTokens.access_token;
      console.log("[oauth/authorize] Procore token refreshed");
    } catch {
      accessToken = undefined;
    }
  }

  if (!accessToken) {
    // No Procore session — store the full authorize path+query in a cookie
    // so /api/auth/callback can redirect back after Procore login.
    const url = new URL(request.url);
    const returnPath = url.pathname + url.search; // relative, starts with /oauth/authorize
    console.log("[oauth/authorize] No Procore session. Setting return_to cookie:", returnPath);

    const loginUrl = `${issuerUrl()}/api/auth/login`;
    const response = NextResponse.redirect(loginUrl);
    response.cookies.set("mcp_oauth_return_to", returnPath, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 10, // 10 minutes
      path: "/",
    });
    return response;
  }

  // ── Check email allowlist ───────────────────────────────────────────────
  const allowlistResult = await checkEmailAllowlist(accessToken);
  console.log("[oauth/authorize] Allowlist check:", allowlistResult);

  if (!allowlistResult.allowed) {
    console.warn(`[oauth/authorize] Email "${allowlistResult.email}" rejected by ${allowlistResult.rule}`);
    void logAuditEvent({
      company_id: process.env.FLEEK_COMPANY_ID ?? "unknown",
      user_id: "unknown",
      user_name: allowlistResult.email,
      user_email: allowlistResult.email,
      action: AUDIT_ACTIONS.LOGIN_REJECTED,
      details: { reason: allowlistResult.rule, context: "mcp_oauth_authorize" },
    });
    return new Response(renderAccessDenied(allowlistResult.email), {
      status: 403,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // ── Get user info for the approve page ──────────────────────────────────
  let userName = allowlistResult.email;
  let userId = "";
  try {
    const user = await getProcoreUser(accessToken);
    userName = user.name || user.login || allowlistResult.email;
    userId = String(user.id);
  } catch {
    // Fall back to email — non-fatal
  }

  // ── Render approve page ─────────────────────────────────────────────────
  return new Response(
    renderApprovePage({
      userName,
      userId,
      clientId,
      redirectUri,
      codeChallenge,
      state,
      scope,
    }),
    {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}

// ── POST: user clicked Approve ────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  logMcpRequest("authorize:POST", request);

  const formData = await request.formData();
  const clientId = formData.get("client_id") as string ?? "";
  const redirectUri = formData.get("redirect_uri") as string ?? "";
  const codeChallenge = formData.get("code_challenge") as string ?? "";
  const state = formData.get("state") as string ?? "";
  const scope = formData.get("scope") as string ?? "";
  const userId = formData.get("user_id") as string ?? "";

  console.log("[oauth/authorize:POST] Approve submitted:", { clientId, redirectUri, state: state.slice(0, 10) + "...", userId });

  // Re-validate
  if (!validateClientId(clientId)) {
    return Response.json({ error: "invalid_client" }, { status: 400 });
  }
  if (!redirectUri || !isRedirectAllowed(redirectUri)) {
    return Response.json({ error: "invalid_request", error_description: "Invalid redirect_uri" }, { status: 400 });
  }

  // Re-check Procore session (someone could POST without a session)
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return Response.json({ error: "access_denied", error_description: "No session" }, { status: 403 });
  }

  // Re-check allowlist
  const allowlistResult = await checkEmailAllowlist(accessToken);
  if (!allowlistResult.allowed) {
    return Response.json({ error: "access_denied", error_description: "Not authorized" }, { status: 403 });
  }

  // ── Generate authorization code ─────────────────────────────────────────
  const code = generateAuthCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

  const supabase = supabaseMcpClient();
  const { error: insertError } = await supabase
    .from("mcp_oauth_codes")
    .insert({
      code,
      client_id: clientId,
      redirect_uri: redirectUri,
      code_challenge: codeChallenge,
      procore_user_id: userId,
      scope: scope || null,
      expires_at: expiresAt,
      used: false,
    });

  if (insertError) {
    console.error("[oauth/authorize:POST] Failed to store auth code:", insertError.message);
    return errorRedirect(redirectUri, "server_error", "Failed to generate authorization code", state);
  }

  console.log("[oauth/authorize:POST] Code issued, redirecting to:", redirectUri);

  // ── Redirect back to Claude with the code ───────────────────────────────
  const callbackUrl = new URL(redirectUri);
  callbackUrl.searchParams.set("code", code);
  if (state) callbackUrl.searchParams.set("state", state);

  // 303 See Other — forces the browser to follow with GET, not POST.
  // OAuth 2.1 §4.1.2: the authorization server redirects the user-agent
  // back to the client using the redirection URI.
  return NextResponse.redirect(callbackUrl.toString(), 303);
}

// ── HTML rendering ────────────────────────────────────────────────────────────

function renderApprovePage(params: {
  userName: string;
  userId: string;
  clientId: string;
  redirectUri: string;
  codeChallenge: string;
  state: string;
  scope: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Authorize — Holdpoint</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f5f5f5; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    .card { background: white; border-radius: 12px; padding: 2rem; max-width: 420px; width: 100%; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    h1 { font-size: 1.25rem; margin-bottom: 0.5rem; }
    .subtitle { color: #666; font-size: 0.9rem; margin-bottom: 1.5rem; }
    .user { background: #f0f7ff; border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 1.5rem; font-size: 0.9rem; }
    .user strong { display: block; }
    .actions { display: flex; gap: 0.75rem; }
    button { flex: 1; padding: 0.75rem; border-radius: 8px; font-size: 0.95rem; cursor: pointer; border: none; }
    .approve { background: #2563eb; color: white; font-weight: 600; }
    .approve:hover { background: #1d4ed8; }
    .deny { background: #e5e7eb; color: #374151; }
    .deny:hover { background: #d1d5db; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Authorize Claude</h1>
    <p class="subtitle">Claude wants to access Holdpoint on your behalf.</p>
    <div class="user">
      <strong>${escapeHtml(params.userName)}</strong>
      Signed in via Procore
    </div>
    <form method="POST" action="/oauth/authorize">
      <input type="hidden" name="client_id" value="${escapeAttr(params.clientId)}" />
      <input type="hidden" name="redirect_uri" value="${escapeAttr(params.redirectUri)}" />
      <input type="hidden" name="code_challenge" value="${escapeAttr(params.codeChallenge)}" />
      <input type="hidden" name="state" value="${escapeAttr(params.state)}" />
      <input type="hidden" name="scope" value="${escapeAttr(params.scope)}" />
      <input type="hidden" name="user_id" value="${escapeAttr(params.userId)}" />
      <div class="actions">
        <button type="button" class="deny" onclick="window.close()">Deny</button>
        <button type="submit" class="approve">Approve</button>
      </div>
    </form>
  </div>
</body>
</html>`;
}

function renderAccessDenied(email: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Access Denied — Holdpoint</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f5f5f5; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    .card { background: white; border-radius: 12px; padding: 2rem; max-width: 420px; width: 100%; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center; }
    h1 { font-size: 1.25rem; color: #dc2626; margin-bottom: 0.5rem; }
    p { color: #666; font-size: 0.9rem; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Access Denied</h1>
    <p>${escapeHtml(email)} is not authorized to use Holdpoint.</p>
  </div>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
