// ─── POST /oauth/token ────────────────────────────────────────────────────────
// OAuth 2.1 Token Endpoint.
//
// Handles two grant types:
//   1. authorization_code — exchanges code + code_verifier for access/refresh tokens
//   2. refresh_token      — exchanges refresh token for a new token pair
//
// Public client: no client_secret required (token_endpoint_auth_method=none).
// Tokens are stored as SHA-256 hashes in Supabase. The plain token is returned
// to the client exactly once.

import { NextRequest } from "next/server";
import {
  validateClientId,
  verifyPkce,
  generateToken,
  hashToken,
  supabaseMcpClient,
  logMcpRequest,
} from "@/lib/mcp-oauth";

// ── Token lifetimes ───────────────────────────────────────────────────────────

const ACCESS_TOKEN_TTL_SECONDS = 3600;        // 1 hour
const REFRESH_TOKEN_TTL_SECONDS = 30 * 24 * 3600; // 30 days

// ── CORS headers (token endpoint must allow cross-origin POST) ────────────────

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
    "Pragma": "no-cache",
  };
}

function tokenError(error: string, description: string, status = 400) {
  return Response.json(
    { error, error_description: description },
    { status, headers: corsHeaders() }
  );
}

// ── POST ──────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  logMcpRequest("token", request);

  // Token endpoint accepts application/x-www-form-urlencoded per OAuth 2.1
  const contentType = request.headers.get("content-type") ?? "";
  let params: URLSearchParams;

  if (contentType.includes("application/x-www-form-urlencoded")) {
    params = new URLSearchParams(await request.text());
  } else if (contentType.includes("application/json")) {
    // Some clients send JSON — be lenient
    const body = await request.json();
    params = new URLSearchParams(body as Record<string, string>);
  } else {
    params = new URLSearchParams(await request.text());
  }

  const grantType = params.get("grant_type") ?? "";
  const clientId = params.get("client_id") ?? "";

  console.log("[oauth/token] grant_type:", grantType, "client_id:", clientId);

  if (!validateClientId(clientId)) {
    return tokenError("invalid_client", "Unknown client_id", 401);
  }

  switch (grantType) {
    case "authorization_code":
      return handleAuthorizationCode(params, clientId);
    case "refresh_token":
      return handleRefreshToken(params, clientId);
    default:
      return tokenError("unsupported_grant_type", `Grant type "${grantType}" is not supported`);
  }
}

// ── CORS preflight ────────────────────────────────────────────────────────────

export async function OPTIONS(request: NextRequest) {
  logMcpRequest("token:OPTIONS", request);
  return new Response(null, { status: 204, headers: corsHeaders() });
}

// ── Authorization Code Exchange ───────────────────────────────────────────────

async function handleAuthorizationCode(params: URLSearchParams, clientId: string) {
  const code = params.get("code") ?? "";
  const redirectUri = params.get("redirect_uri") ?? "";
  const codeVerifier = params.get("code_verifier") ?? "";

  console.log("[oauth/token:auth_code] code:", code.slice(0, 10) + "...", "redirect_uri:", redirectUri);

  if (!code || !redirectUri || !codeVerifier) {
    return tokenError("invalid_request", "code, redirect_uri, and code_verifier are required");
  }

  const supabase = supabaseMcpClient();

  // Look up the authorization code
  const { data: codeRow, error: fetchError } = await supabase
    .from("mcp_oauth_codes")
    .select("*")
    .eq("code", code)
    .single();

  if (fetchError || !codeRow) {
    console.warn("[oauth/token:auth_code] Code not found");
    return tokenError("invalid_grant", "Authorization code is invalid or expired");
  }

  // Check expiry
  if (new Date(codeRow.expires_at) < new Date()) {
    console.warn("[oauth/token:auth_code] Code expired");
    return tokenError("invalid_grant", "Authorization code has expired");
  }

  // Check single-use
  if (codeRow.used) {
    console.warn("[oauth/token:auth_code] Code already used — possible replay");
    return tokenError("invalid_grant", "Authorization code has already been used");
  }

  // Check client_id matches
  if (codeRow.client_id !== clientId) {
    console.warn("[oauth/token:auth_code] client_id mismatch");
    return tokenError("invalid_grant", "client_id does not match");
  }

  // Check redirect_uri matches exactly
  if (codeRow.redirect_uri !== redirectUri) {
    console.warn("[oauth/token:auth_code] redirect_uri mismatch:", codeRow.redirect_uri, "vs", redirectUri);
    return tokenError("invalid_grant", "redirect_uri does not match");
  }

  // Verify PKCE
  if (!verifyPkce(codeVerifier, codeRow.code_challenge)) {
    console.warn("[oauth/token:auth_code] PKCE verification failed");
    return tokenError("invalid_grant", "PKCE code_verifier is invalid");
  }

  // Mark code as used
  await supabase
    .from("mcp_oauth_codes")
    .update({ used: true })
    .eq("code", code);

  // Issue tokens
  return issueTokenPair(clientId, codeRow.procore_user_id, codeRow.scope);
}

// ── Refresh Token Exchange ────────────────────────────────────────────────────

async function handleRefreshToken(params: URLSearchParams, clientId: string) {
  const refreshTokenPlain = params.get("refresh_token") ?? "";

  if (!refreshTokenPlain) {
    return tokenError("invalid_request", "refresh_token is required");
  }

  const refreshTokenHash = hashToken(refreshTokenPlain);
  const supabase = supabaseMcpClient();

  // Look up by hash
  const { data: tokenRow, error: fetchError } = await supabase
    .from("mcp_oauth_tokens")
    .select("*")
    .eq("refresh_token_hash", refreshTokenHash)
    .single();

  if (fetchError || !tokenRow) {
    console.warn("[oauth/token:refresh] Refresh token not found");
    return tokenError("invalid_grant", "Refresh token is invalid");
  }

  // Check expiry
  if (new Date(tokenRow.refresh_expires_at) < new Date()) {
    console.warn("[oauth/token:refresh] Refresh token expired");
    return tokenError("invalid_grant", "Refresh token has expired");
  }

  // Check client_id matches
  if (tokenRow.client_id !== clientId) {
    console.warn("[oauth/token:refresh] client_id mismatch");
    return tokenError("invalid_grant", "client_id does not match");
  }

  // Revoke old token pair (single-use refresh tokens)
  await supabase
    .from("mcp_oauth_tokens")
    .delete()
    .eq("refresh_token_hash", refreshTokenHash);

  console.log("[oauth/token:refresh] Old token revoked, issuing new pair");

  // Issue new token pair
  return issueTokenPair(clientId, tokenRow.procore_user_id, tokenRow.scope);
}

// ── Issue a new access + refresh token pair ───────────────────────────────────

async function issueTokenPair(clientId: string, procoreUserId: string, scope: string | null) {
  const accessTokenPlain = generateToken();
  const refreshTokenPlain = generateToken();
  const accessTokenHash = hashToken(accessTokenPlain);
  const refreshTokenHash = hashToken(refreshTokenPlain);

  const now = new Date();
  const accessExpiresAt = new Date(now.getTime() + ACCESS_TOKEN_TTL_SECONDS * 1000).toISOString();
  const refreshExpiresAt = new Date(now.getTime() + REFRESH_TOKEN_TTL_SECONDS * 1000).toISOString();

  const supabase = supabaseMcpClient();

  const { error: insertError } = await supabase
    .from("mcp_oauth_tokens")
    .insert({
      access_token_hash: accessTokenHash,
      refresh_token_hash: refreshTokenHash,
      client_id: clientId,
      procore_user_id: procoreUserId,
      scope: scope || null,
      expires_at: accessExpiresAt,
      refresh_expires_at: refreshExpiresAt,
    });

  if (insertError) {
    console.error("[oauth/token] Failed to store token:", insertError.message);
    return tokenError("server_error", "Failed to issue token", 500);
  }

  console.log("[oauth/token] Token pair issued for user:", procoreUserId);

  return Response.json(
    {
      access_token: accessTokenPlain,
      token_type: "Bearer",
      expires_in: ACCESS_TOKEN_TTL_SECONDS,
      refresh_token: refreshTokenPlain,
      scope: scope || undefined,
    },
    { headers: corsHeaders() }
  );
}
