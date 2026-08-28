// ─── MCP OAuth Constants & Helpers ────────────────────────────────────────────
// Shared between the well-known metadata endpoints, the MCP route's 401
// response, and (later) the OAuth authorization server endpoints.
//
// The MCP_SERVER_URL env var is the canonical resource URL for the MCP server.
// The issuer (authorization server) is derived by stripping the path.

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
    registration_endpoint: `${issuer}/oauth/register`,
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    code_challenge_methods_supported: ["S256"],
    token_endpoint_auth_methods_supported: ["none"],
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
