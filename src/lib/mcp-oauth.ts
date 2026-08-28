// ─── MCP OAuth Constants & Helpers ────────────────────────────────────────────
// Shared between the well-known metadata endpoints, the MCP route's 401
// response, and the OAuth authorization server endpoints.
//
// The MCP_SERVER_URL env var is the canonical resource URL for the MCP server.
// The issuer (authorization server) is derived by stripping the path.

import { createHash, randomBytes } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { getProcoreUser } from "@/lib/procore";

// ── Canonical URLs ────────────────────────────────────────────────────────────

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`[mcp-oauth] Missing required env var: ${name}`);
  return v;
}

/** e.g. "https://itp-reviewer.vercel.app/api/mcp" */
export function mcpServerUrl(): string {
  return requiredEnv("MCP_SERVER_URL");
}

/** e.g. "https://itp-reviewer.vercel.app" — the OAuth issuer / authorization base URL */
export function issuerUrl(): string {
  const url = new URL(mcpServerUrl());
  return `${url.protocol}//${url.host}`;
}

// ── RFC 9728: Protected Resource Metadata ─────────────────────────────────────

export function protectedResourceMetadata() {
  const issuer = issuerUrl();
  return {
    resource: mcpServerUrl(),
    authorization_servers: [issuer],
    bearer_methods_supported: ["header"],
  };
}

// ── RFC 8414: Authorization Server Metadata ───────────────────────────────────

export function authorizationServerMetadata() {
  const issuer = issuerUrl();
  return {
    issuer,
    authorization_endpoint: `${issuer}/oauth/authorize`,
    token_endpoint: `${issuer}/oauth/token`,
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    code_challenge_methods_supported: ["S256"],
    token_endpoint_auth_methods_supported: ["none"],
  };
}

// ── Supabase client (service role) ────────────────────────────────────────────

export function supabaseMcpClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// ── Client ID validation ──────────────────────────────────────────────────────

export function validateClientId(clientId: string): boolean {
  const expected = process.env.MCP_OAUTH_CLIENT_ID;
  if (!expected) {
    console.error("[mcp-oauth] MCP_OAUTH_CLIENT_ID env var is not set");
    return false;
  }
  return clientId === expected;
}

// ── PKCE (RFC 7636) ───────────────────────────────────────────────────────────

/** Verify a PKCE code_verifier against a stored code_challenge (S256 only). */
export function verifyPkce(codeVerifier: string, codeChallenge: string): boolean {
  // S256: BASE64URL(SHA256(code_verifier)) === code_challenge
  const hash = createHash("sha256").update(codeVerifier).digest("base64url");
  return hash === codeChallenge;
}

// ── Token hashing ─────────────────────────────────────────────────────────────

/** Generate a random opaque token. */
export function generateToken(): string {
  return randomBytes(32).toString("base64url");
}

/** SHA-256 hash of a token, hex-encoded, for storage and lookup. */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

// ── Authorization code ────────────────────────────────────────────────────────

/** Generate a random one-time authorization code. */
export function generateAuthCode(): string {
  return randomBytes(24).toString("base64url");
}

// ── Email allowlist check ─────────────────────────────────────────────────────
// Replicates the logic from src/app/api/auth/callback/route.ts lines 92-148.

export interface AllowlistResult {
  allowed: boolean;
  email: string;
  rule: string; // "email_allowlist" | "domain_allowlist" | "no_allowlist"
}

/**
 * Check whether a Procore user's email passes the ALLOWED_EMAILS /
 * ALLOWED_EMAIL_DOMAINS gate. Requires a valid Procore access token.
 *
 * Returns { allowed, email, rule } — never throws.
 */
export async function checkEmailAllowlist(
  procoreAccessToken: string
): Promise<AllowlistResult> {
  let userEmail = "";
  try {
    const user = await getProcoreUser(procoreAccessToken);
    userEmail = (user.login ?? "").toLowerCase().trim();
  } catch (err) {
    console.error("[mcp-oauth] Failed to fetch user for email check:", err);
    return { allowed: false, email: "", rule: "fetch_failed" };
  }

  const allowedEmailsRaw = (process.env.ALLOWED_EMAILS ?? "").trim();
  const allowedDomainsRaw = (process.env.ALLOWED_EMAIL_DOMAINS ?? "").trim();

  // If neither allowlist is configured, anyone with a valid Procore session
  // in the right company is allowed.
  if (!allowedEmailsRaw && !allowedDomainsRaw) {
    return { allowed: true, email: userEmail, rule: "no_allowlist" };
  }

  if (allowedEmailsRaw) {
    const allowedSet = new Set(
      allowedEmailsRaw.split(",").map(e => e.trim().toLowerCase()).filter(Boolean)
    );
    return {
      allowed: allowedSet.has(userEmail),
      email: userEmail,
      rule: "email_allowlist",
    };
  }

  // Domain check
  const allowedDomains = new Set(
    allowedDomainsRaw.split(",").map(d => d.trim().toLowerCase()).filter(Boolean)
  );
  const atIdx = userEmail.lastIndexOf("@");
  const userDomain = atIdx >= 0 ? userEmail.slice(atIdx + 1) : "";
  return {
    allowed: allowedDomains.has(userDomain),
    email: userEmail,
    rule: "domain_allowlist",
  };
}

// ── Request logging helper ────────────────────────────────────────────────────

export function logMcpRequest(tag: string, request: Request) {
  const url = new URL(request.url);
  const headers: Record<string, string> = {};
  request.headers.forEach((v, k) => {
    // Skip large / noisy headers
    if (!["cookie", "x-vercel-id", "x-real-ip"].includes(k.toLowerCase())) {
      headers[k] = v;
    }
  });
  console.log(
    `[mcp-oauth:${tag}] ${request.method} ${url.pathname}${url.search}`,
    JSON.stringify(headers, null, 2)
  );
}
