# MCP OAuth Gotchas

> Extracted from CLAUDE.md on 8 Oct 2026. Hard-won lessons from implementing the MCP OAuth flow.

1. **`scopes_supported: []` kills the flow.** RFC 8414 §2: "Claims with zero elements MUST be omitted from the response." An empty array declares the server supports no scopes. Claude reads this, gives up, and never calls `/oauth/register`. Omit the field entirely if you have no scopes.

2. **Redirect after approve must be 303, not 307.** Next.js `NextResponse.redirect()` defaults to 307, which preserves the request method. The approve form POSTs, so the redirect sends a POST to Claude's callback, which rejects it with "Method Not Allowed." Use `NextResponse.redirect(url, 303)` — 303 See Other forces the browser to follow with GET. Per OAuth 2.1 §4.1.2.

3. **OAuth params lost after Procore login.** The authorize URL contains `client_id`, `redirect_uri`, `code_challenge`, `state`, etc. If the user has no Procore session, they must log in first. The Procore callback always redirects to `/?auth=success` — the original authorize URL is gone. Fix: store the full authorize path+query in a `mcp_oauth_return_to` cookie before redirecting to login, and have the callback redirect back to it.

4. **Vercel log exports cap at ~76 rows.** Filter by time range and function name before exporting.

5. **Protected Resource Metadata is path-aware (RFC 9728 §3).** For a resource at `/api/mcp`, the metadata must be served at `/.well-known/oauth-protected-resource/api/mcp`, not just at the root.

6. **WWW-Authenticate header must include `error` and `error_description`.** A bare `Bearer resource_metadata="..."` is not enough.
