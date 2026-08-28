// ─── GET /.well-known/oauth-protected-resource ───────────────────────────────
// RFC 9728 Protected Resource Metadata.
// Tells MCP clients which authorization server protects this resource.

import { NextRequest } from "next/server";
import { protectedResourceMetadata, logMcpRequest } from "@/lib/mcp-oauth";

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
  logMcpRequest("protected-resource-metadata", request);
  const metadata = protectedResourceMetadata();
  console.log("[mcp-oauth:protected-resource-metadata] Responding with:", JSON.stringify(metadata));
  return new Response(JSON.stringify(metadata), {
    status: 200,
    headers: corsHeaders(),
  });
}

export async function OPTIONS(request: NextRequest) {
  logMcpRequest("protected-resource-metadata:OPTIONS", request);
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}
