// ─── MCP Server Endpoint ──────────────────────────────────────────────────────
// Remote MCP server for Claude (chat / desktop / Claude Code) to call tools.
//
// Auth paths (checked in order):
//   1. Static bearer token — MCP_BEARER_TOKEN env var (Claude Code, curl).
//      No user is attached to this path, so tools act as the pinned account in
//      MCP_PROCORE_USER_ID.
//   2. OAuth-issued bearer token — looked up by SHA-256 hash in mcp_oauth_tokens
//      (Claude.ai, Claude Desktop). Tools act as the token owner.
//   3. No valid token → 401 with WWW-Authenticate pointing to our OAuth server
//      so the MCP client can discover the authorization flow (RFC 9728 / 6750).

import { createMcpHandler } from "mcp-handler";
import { NextRequest } from "next/server";
import { logMcpRequest, hashToken, supabaseMcpClient } from "@/lib/mcp-oauth";
import { registerHoldpointTools, type McpToolContext } from "@/lib/mcp-tools";

/**
 * Builds a handler bound to one request's Procore identity.
 *
 * The handler is built per request rather than at module scope because the
 * tools close over `ctx` — the Procore user this call acts as changes between
 * the OAuth path and the static bearer path.
 */
function buildHandler(ctx: McpToolContext) {
  return createMcpHandler(
    (server) => {
      registerHoldpointTools(server, ctx);
    },
    {
      serverInfo: { name: "holdpoint", version: "0.2.0" },
    }
  );
}

/**
 * Build the 401 response with proper WWW-Authenticate header.
 *
 * Matches the format emitted by @modelcontextprotocol/server's
 * bearerAuthChallengeResponse(): error, error_description, then
 * resource_metadata pointing to the path-aware RFC 9728 location.
 */
function unauthorized(message: string, request: Request) {
  const url = new URL(request.url);
  // Path-aware: /.well-known/oauth-protected-resource/api/mcp  (RFC 9728 §3)
  const resourceMetadataUrl = `${url.protocol}//${url.host}/.well-known/oauth-protected-resource/api/mcp`;

  // Match the library's WWW-Authenticate format exactly:
  //   Bearer error="invalid_token", error_description="...", resource_metadata="..."
  const wwwAuth = [
    `Bearer error="invalid_token"`,
    `error_description="${message}"`,
    `resource_metadata="${resourceMetadataUrl}"`,
  ].join(", ");

  console.log(`[mcp] 401 Unauthorized: ${message}`);
  console.log(`[mcp] WWW-Authenticate: ${wwwAuth}`);

  return Response.json(
    { error: "invalid_token", error_description: message },
    {
      status: 401,
      headers: { "WWW-Authenticate": wwwAuth },
    }
  );
}

async function authedHandler(request: Request) {
  logMcpRequest("mcp", request);

  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token) {
    console.log("[mcp] No bearer token provided");
    return unauthorized("Missing bearer token", request);
  }

  // ── Path 1: static MCP_BEARER_TOKEN (Claude Code, curl) ─────────────────
  const expected = process.env.MCP_BEARER_TOKEN;
  if (expected && token === expected) {
    const pinned = process.env.MCP_PROCORE_USER_ID ?? null;
    console.log(
      `[mcp] Authenticated via static MCP_BEARER_TOKEN, acting as pinned user: ${pinned ?? "none set"}`
    );
    return buildHandler({ authPath: "static-bearer", procoreUserId: pinned })(request);
  }

  // ── Path 2: OAuth-issued token (lookup by SHA-256 hash) ──────────────────
  try {
    const tokenHash = hashToken(token);
    const supabase = supabaseMcpClient();
    const { data: tokenRow } = await supabase
      .from("mcp_oauth_tokens")
      .select("expires_at, procore_user_id")
      .eq("access_token_hash", tokenHash)
      .single();

    if (tokenRow) {
      if (new Date(tokenRow.expires_at) < new Date()) {
        console.log("[mcp] OAuth token found but expired");
        return unauthorized("Token has expired", request);
      }
      console.log("[mcp] Authenticated via OAuth token for user:", tokenRow.procore_user_id);
      return buildHandler({
        authPath: "oauth",
        procoreUserId: tokenRow.procore_user_id ? String(tokenRow.procore_user_id) : null,
      })(request);
    }
  } catch (err) {
    console.error("[mcp] OAuth token lookup error:", err);
  }

  console.log("[mcp] Bearer token did not match any auth path");
  return unauthorized("Invalid bearer token", request);
}

export async function GET(request: NextRequest) {
  return authedHandler(request);
}

export async function POST(request: NextRequest) {
  return authedHandler(request);
}

// ── CORS preflight for MCP requests ──────────────────────────────────────────
export async function OPTIONS(request: NextRequest) {
  logMcpRequest("mcp:OPTIONS", request);
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type, MCP-Protocol-Version",
    },
  });
}
