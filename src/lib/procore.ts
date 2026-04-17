// ─── Procore OAuth + API Client ────────────────────────────────────────────
// Handles:
//   1. Building the OAuth authorization URL (redirects user to Procore login)
//   2. Exchanging an authorization code for an access token
//   3. Refreshing an expired access token
//   4. Making authenticated requests to the Procore REST API

// ── Environment selection ──────────────────────────────────────────────────
// Set PROCORE_ENV to "production" to hit Fleek Constructions' real Procore
// account, or "sandbox" (default) for developer testing.
// You can also override the individual URLs via PROCORE_API_BASE_URL and
// PROCORE_LOGIN_BASE_URL if you need to point at something custom.

const PROCORE_ENV = process.env.PROCORE_ENV ?? "sandbox";

const DEFAULT_API_BASE =
  PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

const DEFAULT_LOGIN_BASE =
  PROCORE_ENV === "production"
    ? "https://login.procore.com"
    : "https://login-sandbox.procore.com";

const PROCORE_BASE_URL  = process.env.PROCORE_API_BASE_URL   ?? DEFAULT_API_BASE;
const PROCORE_LOGIN_URL = process.env.PROCORE_LOGIN_BASE_URL ?? DEFAULT_LOGIN_BASE;
const PROCORE_AUTH_URL  = `${PROCORE_LOGIN_URL}/oauth/authorize`;
const PROCORE_TOKEN_URL = `${PROCORE_LOGIN_URL}/oauth/token`;

console.log(
  `[procore] env=${PROCORE_ENV} api=${PROCORE_BASE_URL} login=${PROCORE_LOGIN_URL}`
);

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

export interface ProcoreCompany {
  id: number;
  name: string;
  is_active: boolean;
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

// ── Additional types ───────────────────────────────────────────────────────

export interface ProcoreAttachment {
  id: number;
  filename?: string | null;
  name?: string | null;
  // Procore uses many different property names for the download URL
  // depending on endpoint + API version. We try all of them when collecting.
  url?: string | null;
  file_url?: string | null;
  download_url?: string | null;
  view_url?: string | null;
  viewable_document?: { url?: string | null } | null;
  prostore_file?: { url?: string | null; filename?: string | null; name?: string | null; content_type?: string | null } | null;
  file?: { url?: string | null; filename?: string | null; content_type?: string | null } | null;
  // ⚠ Confirmed in production: inspection item attachments on Procore's
  // current API come wrapped as { id, created_at, created_by, attachment: {
  // id, name, filename, url } }. This nested `attachment` sub-object is
  // where the actual download URL and filename live.
  attachment?: {
    id?: number;
    url?: string | null;
    filename?: string | null;
    name?: string | null;
    content_type?: string | null;
  } | null;
  content_type?: string | null;
  file_size?: number | null;
  size?: number | null;
  created_at?: string | null;
}

export interface ProcorePhoto {
  id: number;
  filename?: string | null;
  url?: string | null;
  thumbnail_url?: string | null;
  content_type?: string | null;
  // Some Procore endpoints return nested image data
  image?: { url?: string | null; content_type?: string | null } | null;
  attachment?: { url?: string | null; content_type?: string | null; filename?: string | null } | null;
}

export interface ProcoreInspectionItem {
  id: number;
  description: string | null;
  position: number | null;
  // Extended view adds these fields on each item:
  name?: string | null;
  item_type?: string | null;
  status?: string | null;          // e.g. "pass", "fail", "na"
  response?: {
    answer?: string | null;
    comment?: string | null;
    attachments?: ProcoreAttachment[] | null;
    photos?: ProcorePhoto[] | null;
    // "Activity" log on an item often contains the comment history
    comments?: Array<{ body?: string | null; user?: { name?: string } | null; created_at?: string | null }> | null;
  } | null;
  attachments?: ProcoreAttachment[] | null;
  photos?: ProcorePhoto[] | null;
  comments?: Array<{ body?: string | null; user?: { name?: string } | null; created_at?: string | null }> | null;
  // Some responses come as a separate array
  list_item_responses?: Array<{
    answer?: string | null;
    comment?: string | null;
    attachments?: ProcoreAttachment[] | null;
    photos?: ProcorePhoto[] | null;
  }> | null;
  // Observations linked to this item — a common place photos/files live
  observations?: Array<{
    id: number;
    name?: string | null;
    description?: string | null;
    attachments?: ProcoreAttachment[] | null;
  }> | null;
}

export interface ProcoreInspectionSection {
  id: number;
  name: string | null;
  position: number | null;
  items: ProcoreInspectionItem[] | null;
}

export interface ProcoreInspectionResponse {
  id: number;
  answer: string | null;
  comment: string | null;
  inspection_item: ProcoreInspectionItem | null;
  attachments: ProcoreAttachment[] | null;
}

export interface ProcoreInspection {
  id: number;
  name: string;
  status: string;                          // "Open" | "Closed" | etc.
  number: string | null;
  // Some tenants use `inspection_number` or `position_of_type`
  inspection_number?: string | number | null;
  position_of_type?: string | number | null;
  created_at: string | null;
  updated_at: string | null;
  closed_at:  string | null;
  inspection_date?: string | null;
  description: string | null;
  inspection_type: { id: number; name: string } | null;
  // Extended view populates these:
  items?:    ProcoreInspectionItem[] | null;
  sections?: ProcoreInspectionSection[] | null;
  // Original response structure (may be empty on new API):
  responses?:   ProcoreInspectionResponse[] | null;
  attachments?: ProcoreAttachment[] | null;
  // Trade / location / inspector metadata — all optional because different
  // Procore tenants + API versions return different subsets.
  trade?: { id: number; name: string } | null;
  location?: { id: number; name: string } | null;
  // Procore uses plural "inspectors" for most API versions, but we accept
  // "inspector" singular as a fallback.
  inspectors?: Array<{ id: number; name: string; login?: string }> | null;
  inspector?: { id: number; name: string; login?: string } | null;
  created_by?: { id: number; name: string; login?: string } | null;
  closed_by?: { id: number; name: string; login?: string } | null;
  point_of_contact?: { id: number; name: string } | null;
  assignees?: Array<{ id: number; name: string }> | null;
  responsible_contractor?: { id: number; name: string } | null;
  responsible_party?: { id: number; name: string } | null;
  // Procore uses "specification_section" on the API, not "spec_section"
  specification_section?: { id: number; label?: string | null; number?: string | null; description?: string | null } | null;
  spec_section?: { id: number; section_number?: string | null; description?: string | null } | null;
  drawing_ids?: number[] | null;
  project_id?: number | null;
  identifier?: string | null;
  list_template_name?: string | null;
  // Procore uses "due_at" not "due_date"
  due_at?: string | null;
  due_date?: string | null;
  // Stat counters — Procore's naming is *_item_count with item_count/item_total for totals
  item_count?: number | null;
  item_total?: number | null;
  conforming_item_count?: number | null;
  deficient_item_count?: number | null;
  na_item_count?: number | null;
  neutral_item_count?: number | null;
  yes_item_count?: number | null;
  not_inspected_item_count?: number | null;
  // Fallback names (older API)
  conforming_count?: number | null;
  deficient_count?: number | null;
  not_applicable_count?: number | null;
  neutral_count?: number | null;
  items_count?: number | null;
}

// ── API helpers ────────────────────────────────────────────────────────────

/**
 * Makes an authenticated GET request to the Procore REST API.
 * Pass extraHeaders for optional headers like Procore-Company-ID.
 */
async function procoreGet<T>(
  accessToken: string,
  path: string,
  params?: Record<string, string>,
  extraHeaders?: Record<string, string>
): Promise<T> {
  const url = new URL(`${PROCORE_BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...extraHeaders,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Procore API error ${response.status} on ${path}: ${error}`);
  }

  return response.json() as Promise<T>;
}

/**
 * Fetches every page of a paginated Procore list endpoint and concatenates
 * the results. Procore uses classic `page` + `per_page` pagination — we stop
 * as soon as a page returns fewer rows than the page size (i.e. the last
 * page). A hard safety cap prevents runaway loops if something goes wrong.
 */
async function procoreGetAllPages<T>(
  accessToken: string,
  path: string,
  params?: Record<string, string>,
  extraHeaders?: Record<string, string>
): Promise<T[]> {
  const perPage = Number(params?.per_page ?? "100");
  const hardCap = 50; // 50 pages × 100 rows = 5,000 rows; plenty for one project.
  const all: T[] = [];

  for (let page = 1; page <= hardCap; page++) {
    const pageParams = { ...params, page: String(page), per_page: String(perPage) };
    const rows = await procoreGet<T[]>(accessToken, path, pageParams, extraHeaders);
    all.push(...rows);
    console.log(`[procore] ${path} page ${page}: ${rows.length} rows (cumulative ${all.length})`);
    if (rows.length < perPage) break;
  }

  return all;
}

// ── Procore API calls ─────────────────────────────────────────────────────

/**
 * Returns the currently authenticated Procore user.
 */
export async function getProcoreUser(accessToken: string): Promise<ProcoreUser> {
  return procoreGet<ProcoreUser>(accessToken, "/rest/v1.0/me");
}

/**
 * Returns all companies the authenticated user belongs to.
 * This endpoint does NOT require a Procore-Company-Id header — use it for
 * initial company discovery before any other API calls.
 */
export async function getCompanies(accessToken: string): Promise<ProcoreCompany[]> {
  console.log("[procore] getCompanies: endpoint=/rest/v1.0/companies (no company header needed)");
  return procoreGet<ProcoreCompany[]>(accessToken, "/rest/v1.0/companies", {
    per_page: "100",
  });
}

/**
 * Returns all projects the user has access to within a company.
 *
 * The generic /rest/v1.0/projects endpoint requires company_id as BOTH:
 *   • a query parameter (?company_id=X)  — used for filtering
 *   • the Procore-Company-Id header      — used for access-control
 * Omitting the query param produces 400 "Missing Project or Company ID".
 */
export async function getProcoreProjects(
  accessToken: string,
  companyId: number
): Promise<ProcoreProject[]> {
  console.log(
    `[procore] getProcoreProjects: company_id=${companyId} ` +
    `endpoint=/rest/v1.0/projects?company_id=${companyId} ` +
    `header=Procore-Company-Id:${companyId}`
  );
  return procoreGet<ProcoreProject[]>(
    accessToken,
    "/rest/v1.0/projects",
    { per_page: "100", company_id: String(companyId) },   // ← query param required
    { "Procore-Company-Id": String(companyId) }            // ← header also required
  );
}

/**
 * Returns inspections (a.k.a. checklist lists) for a project.
 *
 * NOTE: In Procore's UI this tool is called "Inspections", but in the REST API
 * the resource is named "checklist/lists". Calling `/projects/{id}/inspections`
 * returns 404 on production accounts — you must use `/checklist/lists`.
 *
 * We fetch all and filter by status + name prefix in the calling route,
 * because Procore's name filter isn't always available everywhere.
 */
export async function getInspections(
  accessToken: string,
  projectId: number,
  companyId: number
): Promise<ProcoreInspection[]> {
  console.log(
    `[procore] getInspections: project_id=${projectId} company_id=${companyId} ` +
    `header=Procore-Company-Id:${companyId}`
  );
  // NOTE: We intentionally do NOT pass filters[status]=closed here.
  // Procore's /checklist/lists endpoint sometimes silently returns 0 rows
  // when that filter is applied. We fetch everything and filter status +
  // name locally in the route — simpler and more reliable.
  //
  // Big projects often have >100 inspections, so we page through every
  // page via procoreGetAllPages rather than just taking page 1.
  return procoreGetAllPages<ProcoreInspection>(
    accessToken,
    `/rest/v1.0/projects/${projectId}/checklist/lists`,
    { per_page: "100" },
    { "Procore-Company-Id": String(companyId) }
  );
}

/**
 * Returns full detail for one inspection (checklist list), including
 * responses (items) and attachments.
 *
 * Procore exposes the single-list endpoint at `/checklist/lists/{id}` — note
 * that it is NOT nested under `/projects/{project_id}/…` in v1.0.
 */
export async function getInspectionDetail(
  accessToken: string,
  projectId: number,
  inspectionId: number,
  companyId: number
): Promise<ProcoreInspection> {
  console.log(
    `[procore] getInspectionDetail: project_id=${projectId} inspection_id=${inspectionId} ` +
    `company_id=${companyId} header=Procore-Company-Id:${companyId}`
  );
  // view=extended returns sections + items + responses + attachments inline.
  // Without it Procore returns only the shell (name/status/dates) — no items,
  // no responses, no attachments — which is why reviews were scoring 18/100
  // instead of ~80/100.
  return procoreGet<ProcoreInspection>(
    accessToken,
    `/rest/v1.0/checklist/lists/${inspectionId}`,
    { project_id: String(projectId), view: "extended" },
    { "Procore-Company-Id": String(companyId) }
  );
}

/**
 * Returns detail for a single project (name, project_number, etc).
 */
export async function getProcoreProject(
  accessToken: string,
  projectId: number,
  companyId: number
): Promise<ProcoreProject> {
  console.log(
    `[procore] getProcoreProject: project_id=${projectId} company_id=${companyId}`
  );
  // Procore's single-project endpoint requires company_id as BOTH a query
  // param and the Procore-Company-Id header. Omitting the query param
  // produces 400 "Missing Project or Company ID" even though the header is
  // set — confirmed against Fleek's production tenant.
  return procoreGet<ProcoreProject>(
    accessToken,
    `/rest/v1.0/projects/${projectId}`,
    { company_id: String(companyId) },
    { "Procore-Company-Id": String(companyId) }
  );
}

/**
 * Fallback: fetches checklist items for an inspection as a separate endpoint.
 * Used when the extended view on /checklist/lists/{id} doesn't return the
 * items array (some older Procore tenants).
 */
export async function getInspectionItems(
  accessToken: string,
  projectId: number,
  inspectionId: number,
  companyId: number
): Promise<ProcoreInspectionItem[]> {
  console.log(
    `[procore] getInspectionItems: project_id=${projectId} inspection_id=${inspectionId}`
  );
  try {
    return await procoreGetAllPages<ProcoreInspectionItem>(
      accessToken,
      `/rest/v1.0/checklist/lists/${inspectionId}/list_items`,
      { project_id: String(projectId), per_page: "100" },
      { "Procore-Company-Id": String(companyId) }
    );
  } catch (err) {
    console.warn(`[procore] getInspectionItems fallback failed:`, err instanceof Error ? err.message : err);
    return [];
  }
}

/**
 * Downloads a file from a URL, handling both Procore API URLs (need auth)
 * and S3 presigned URLs (no auth header — adding one causes a 400).
 * Returns { buffer, filename, contentType }.
 */
export async function downloadFile(
  url: string,
  accessToken: string
): Promise<{ buffer: Buffer; filename: string; contentType: string }> {
  // S3 presigned URLs must NOT receive an Authorization header
  const needsAuth = url.includes("procore.com") && !url.includes("s3.");

  const response = await fetch(url, {
    headers: needsAuth ? { Authorization: `Bearer ${accessToken}` } : {},
  });

  if (!response.ok) {
    throw new Error(`Download failed (${response.status}): ${url.slice(0, 80)}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  // Extract filename from Content-Disposition, fall back to URL path
  const cd = response.headers.get("content-disposition") ?? "";
  const cdMatch = cd.match(/filename[^;=\n]*=["']?([^"'\n;]+)["']?/i);
  const urlFilename = decodeURIComponent(new URL(url).pathname.split("/").pop() ?? "attachment");
  const filename = cdMatch?.[1]?.trim() ?? urlFilename;

  const contentType = response.headers.get("content-type")?.split(";")[0].trim() ?? "";

  return { buffer, filename, contentType };
}
