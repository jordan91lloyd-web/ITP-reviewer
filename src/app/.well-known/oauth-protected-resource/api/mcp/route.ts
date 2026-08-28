// ─── GET /.well-known/oauth-protected-resource/api/mcp ───────────────────────
// RFC 9728 Protected Resource Metadata — path-aware location.
// For a resource at /api/mcp, clients probe this path first per RFC 9728 §3.

import { NextRequest } from "next/server";
import { protectedResourceMetadata, logMcpRequest } from "@/lib/mcp-oauth";

function metadataResponse(request: NextRequest) {
  logMcpRequest("protected-resource-metadata:/api/mcp", request);
  const metadata = protectedResourceMetadata();
  console.log("[mcp-oauth:protected-resource-metadata:/api/mcp] Responding with:", JSON.stringify(metadata));
  return Response.json(metadata, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}

export async function GET(request: NextRequest) {
  return metadataResponse(request);
}

export async function OPTIONS(request: NextRequest) {
  logMcpRequest("protected-resource-metadata:/api/mcp:OPTIONS", request);
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
