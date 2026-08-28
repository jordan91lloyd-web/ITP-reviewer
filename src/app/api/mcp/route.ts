// ─── MCP Server Endpoint ──────────────────────────────────────────────────────
// Remote MCP server for Claude (chat / desktop) to call Procore tools.
// Protected by a static bearer token checked against MCP_BEARER_TOKEN.

import { createMcpHandler } from "mcp-handler";
import { NextRequest } from "next/server";

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

function unauthorized(message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}

async function authedHandler(request: Request) {
  const expected = process.env.MCP_BEARER_TOKEN;
  if (!expected) {
    console.error("[mcp] MCP_BEARER_TOKEN env var is not set — rejecting request");
    return unauthorized("MCP endpoint is not configured");
  }

  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token || token !== expected) {
    return unauthorized("Invalid or missing bearer token");
  }

  return handler(request);
}

export async function GET(request: NextRequest) {
  return authedHandler(request);
}

export async function POST(request: NextRequest) {
  return authedHandler(request);
}
