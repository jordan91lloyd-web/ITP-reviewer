// ─── MCP Server Endpoint ──────────────────────────────────────────────────────
// Remote MCP server for Claude (chat / desktop / Claude Code) to call tools.
//
// Auth paths (checked in order):
//   1. Static bearer token — MCP_BEARER_TOKEN env var (Claude Code, curl)
//   2. OAuth-issued bearer token — looked up by SHA-256 hash in mcp_oauth_tokens
//      (Claude.ai, Claude Desktop — implemented in a later step)
//   3. No valid token → 401 with WWW-Authenticate pointing to our OAuth server
//      so the MCP client can discover the authorization flow (RFC 9728 / 6750).

import { createMcpHandler } from "mcp-handler";
import { NextRequest } from "next/server";
import { logMcpRequest } from "@/lib/mcp-oauth";

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "ping",
      {
        description: "Health-check tool. Returns a fixed string to confirm the MCP server is reachable.",
      },
      async () => ({
        content: [{ type: "text" as const, text: "pong — Holdpoint MCP server is alive" }],
      })
    );
  },
  {
    serverInfo: { name: "holdpoint", version: "0.1.0" },
  }
);

/** Build the 401 response with proper WWW-Authenticate header per RFC 6750 / MCP spec. */
function unauthorized(message: string, request: Request) {
  // Build the resource_metadata URL from the request's origin so it works
  // in both local dev and production without depending on MCP_SERVER_URL
  // (which may not be set yet during early testing).
  const url = new URL(request.url);
  const resourceMetadataUrl = `${url.protocol}//${url.host}/.well-known/oauth-protected-resource`;

  console.log(`[mcp] 401 Unauthorized: ${message}`);
  console.log(`[mcp] WWW-Authenticate resource_metadata=${resourceMetadataUrl}`);

  return new Response(JSON.stringify({ error: "invalid_token", error_description: message }), {
    status: 401,
    headers: {
      "Content-Type": "application/json",
      "WWW-Authenticate": `Bearer resource_metadata="${resourceMetadataUrl}"`,
    },
  });
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
    console.log("[mcp] Authenticated via static MCP_BEARER_TOKEN");
    return handler(request);
  }

  // ── Path 2: OAuth-issued token (placeholder — enabled in a later step) ──
  // Will look up SHA-256(token) in mcp_oauth_tokens table.
  // For now, fall through to 401.

  console.log("[mcp] Bearer token did not match static token. OAuth lookup not yet implemented.");
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
