// ─── Procore OAuth + API Client ────────────────────────────────────────────
// Handles:
//   1. Building the OAuth authorization URL (redirects user to Procore login)
//   2. Exchanging an authorization code for an access token
//   3. Refreshing an expired access token
//   4. Making authenticated requests to the Procore REST API

const PROCORE_BASE_URL = "https://sandbox.procore.com";
const PROCORE_AUTH_URL = "https://login-sandbox.procore.com/oauth/authorize";
const PROCORE_TOKEN_URL = "https://login-sandbox.procore.com/oauth/token";

// ── Config helpers ────────────────────────────────────────────────────────
// Split into two: public config (client ID + redirect URI — needed for the
// login redirect) and private config (adds client secret — needed for token
// exchange). This way a missing secret doesn't break the login step.

function getPublicConfig() {
  const clientId = process.env.PROCORE_CLIENT_ID;
  const redirectUri = process.env.PROCORE_REDIRECT_URI;

  if (!clientId || clientId === "your-procore-client-id-here") {
    throw new Error("PROCORE_CLIENT_ID is not set in .env.local");
  }
  if (!redirectUri) {
    throw new Error("PROCORE_REDIRECT_URI is not set in .env.local");
  }

  return { clientId, redirectUri };
}

function getPrivateConfig() {
  const { clientId, redirectUri } = getPublicConfig();
  const clientSecret = process.env.PROCORE_CLIENT_SECRET;

  if (!clientSecret || clientSecret === "PASTE_YOUR_CLIENT_SECRET_HERE") {
    throw new Error(
      "PROCORE_CLIENT_SECRET is not set in .env.local. " +
      "Go to developers.procore.com → My Apps → ITP Reviewer → OAuth Credentials → Show Client Secret."
    );
  }

  return { clientId, clientSecret, redirectUri };
}

// ── Types ──────────────────────────────────────────────────────────────────

export interface ProcoreTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;   // seconds until expiry
  token_type: string;
}

export interface ProcoreUser {
  id: number;
  login: string;
  name: string;
}

export interface ProcoreProject {
  id: number;
  name: string;
  display_name: string;
  project_number: string | null;
  active: boolean;
}

// ── OAuth helpers ──────────────────────────────────────────────────────────

/**
 * Returns the URL to redirect the user to for Procore OAuth login.
 * Pass `state` as a random string to prevent CSRF.
 */
export function buildAuthorizationUrl(state: string): string {
  const { clientId, redirectUri } = getPublicConfig();

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
  });

  return `${PROCORE_AUTH_URL}?${params.toString()}`;
}

/**
 * Exchanges an authorization code (from Procore's callback) for tokens.
 */
export async function exchangeCodeForTokens(code: string): Promise<ProcoreTokens> {
  const { clientId, clientSecret, redirectUri } = getPrivateConfig();

  // Procore requires application/x-www-form-urlencoded, not JSON
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    client_secret: clientSecret,
    code,
    redirect_uri: redirectUri,
  });

  const response = await fetch(PROCORE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Procore token exchange failed (${response.status}): ${error}`);
  }

  return response.json() as Promise<ProcoreTokens>;
}

/**
 * Uses a refresh token to get a new access token.
 */
export async function refreshAccessToken(refreshToken: string): Promise<ProcoreTokens> {
  const { clientId, clientSecret } = getPrivateConfig();

  // Procore requires application/x-www-form-urlencoded, not JSON
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
  });

  const response = await fetch(PROCORE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Procore token refresh failed (${response.status}): ${error}`);
  }

  return response.json() as Promise<ProcoreTokens>;
}

// ── API helpers ────────────────────────────────────────────────────────────

/**
 * Makes an authenticated GET request to the Procore REST API.
 */
async function procoreGet<T>(accessToken: string, path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${PROCORE_BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Procore API error ${response.status} on ${path}: ${error}`);
  }

  return response.json() as Promise<T>;
}

// ── Procore API calls ─────────────────────────────────────────────────────

/**
 * Returns the currently authenticated Procore user.
 */
export async function getProcoreUser(accessToken: string): Promise<ProcoreUser> {
  return procoreGet<ProcoreUser>(accessToken, "/rest/v1.0/me");
}

/**
 * Returns all projects the user has access to.
 * Procore paginates at 100 per page — this fetches the first page.
 */
export async function getProcoreProjects(accessToken: string): Promise<ProcoreProject[]> {
  return procoreGet<ProcoreProject[]>(accessToken, "/rest/v1.0/projects", {
    per_page: "100",
  });
}
