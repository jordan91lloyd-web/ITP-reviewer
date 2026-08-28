// ─── GET /.well-known/oauth-authorization-server ─────────────────────────────
// RFC 8414 Authorization Server Metadata.
// Tells MCP clients where to register, authorize, and exchange tokens.

import { NextRequest } from "next/server";
import { authorizationServerMetadata, logMcpRequest } from "@/lib/mcp-oauth";

export async function GET(request: NextRequest) {
  logMcpRequest("authorization-server-metadata", request);
  const metadata = authorizationServerMetadata();
  console.log("[mcp-oauth:authorization-server-metadata] Responding with:", JSON.stringify(metadata));
  return Response.json(metadata, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}

export async function OPTIONS(request: NextRequest) {
  logMcpRequest("authorization-server-metadata:OPTIONS", request);
  const requestedHeaders = request.headers.get("access-control-request-headers");
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      ...(requestedHeaders ? {
        "Access-Control-Allow-Headers": requestedHeaders,
        "Vary": "Access-Control-Request-Headers",
      } : {}),
    },
  });
}
