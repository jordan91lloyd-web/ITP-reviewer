// ─── GET /.well-known/oauth-authorization-server ─────────────────────────────
// RFC 8414 Authorization Server Metadata.
// Tells MCP clients where to register, authorize, and exchange tokens.

import { NextRequest } from "next/server";
import { authorizationServerMetadata, logMcpRequest } from "@/lib/mcp-oauth";

function corsHeaders() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, MCP-Protocol-Version",
    "Cache-Control": "public, max-age=3600",
  };
}

export async function GET(request: NextRequest) {
  logMcpRequest("authorization-server-metadata", request);
  const metadata = authorizationServerMetadata();
  console.log("[mcp-oauth:authorization-server-metadata] Responding with:", JSON.stringify(metadata));
  return new Response(JSON.stringify(metadata), {
    status: 200,
    headers: corsHeaders(),
  });
}

export async function OPTIONS(request: NextRequest) {
  logMcpRequest("authorization-server-metadata:OPTIONS", request);
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}
