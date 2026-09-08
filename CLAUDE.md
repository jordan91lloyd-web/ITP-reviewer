# CLAUDE.md — Holdpoint

## Auto-save at end of every session (MANDATORY)

At the end of every session — without being asked — run:

```bash
bash save.sh "Brief description of what changed"
```

This commits all changes and pushes to GitHub (`jordan91lloyd-web/itp-reviewer`). Always do this as the final step, even if the task felt small.

---

## Two AI engines — do not cross them

This app has two completely separate Claude-powered engines. They share nothing. Never import one engine's prompt or client into the other's route. Never consolidate them.

**Engine 1: ITP QA Reviewer**
- Files: `src/lib/prompt.ts`, `src/lib/claude.ts`, `src/lib/scoring.ts`, `src/lib/types.ts`
- Scores an ITP inspection package 0–100 across five dimensions.
- Used by: `/api/review` (manual upload) and `/api/procore/import` (Procore pipeline).

**Engine 2: Report to Action Plan converter**
- Files: `src/lib/actionPlanPrompt.ts`, `src/lib/actionPlanClaude.ts`, `src/lib/actionPlanTypes.ts`
- Converts a consultant report into a structured Procore Action Plan.
- Used by: `/api/action-plan/convert` and `/api/action-plan/upload`.

---

## What this app does

**Holdpoint** is a Next.js construction QA platform. Two core functions:

1. **ITP Review** — QA managers connect Procore, select an ITP inspection, and the app fetches all evidence (PDFs, images, emails, Word docs), runs a Claude review, and returns a structured assessment: score 0–100, score band, commercial confidence rating, evidence gaps, key issues, next actions. Results stored in Supabase.

2. **Report to Action Plan** — upload a consultant report (PDF, JPG, PNG, DOCX, XLSX), Claude converts it into structured sections and items matching Procore's two-level Action Plan model, preview it, then upload directly to Procore as a Draft plan.

---

## Current status

### Dashboard tabs (`/dashboard`)
The dashboard has 9 tabs in a horizontal tab bar:

| Tab | Component | Purpose |
|-----|-----------|---------|
| **Company** | Inline in `dashboard/page.tsx` | Financial summary, subcontract progress, site-level stats for the selected Procore company |
| **Insights** | `InsightsTab.tsx` | Per-project AI insight cards: stage, completion %, missing/upcoming ITPs, contract value |
| **ITP Reviews** | Inline in `dashboard/page.tsx` | Project → ITP list with scores, status filters, bulk review, side panel, score overrides |
| **Site Compliance** | `SiteComplianceTab.tsx` | Breadcrumb-sourced site attendance and prestart compliance in a Mon–Fri weekly grid |
| **Hold Points** | `HoldPointTab.tsx` | Extract hold point register from Procore drawings and documents via Claude |
| **Resourcing** | `ResourcingTab.tsx` | Programme-aligned subcontractor matrix with lockable rows and TODAY reference line |
| **Report** | `ReportTab.tsx` | Cross-project ITP Status Report with 7d/30d window, summary + detail PDFs |
| **Queue** | `QueuePanel.tsx` | Background bulk-review job monitor with per-inspection progress |
| **Action Plans** | `action-plans/page.tsx` | Report → Action Plan converter with Procore upload |

### Other features
- **Procore OAuth** — login, callback, token refresh, logout, CSRF-protected state cookie
- **Manual upload** — drag-and-drop PDF/JPG/PNG on `/`, runs Claude review
- **Procore import** — full pipeline: fetch inspection (view=extended), flatten items, download attachments (PDF + JPEG/PNG + .msg + .docx), run review, save to Supabase
- **Bulk review** — select ITPs, sequential fetch with per-row progress
- **Score overrides** — admins set manual override score + note
- **Audit log** (`/audit`) — filterable viewer, CSV export
- **Admin pages** (`/admin/users`, `/admin/documents`) — manage admins, upload scoring guidelines
- **Access control** — `FLEEK_COMPANY_ID` gates login to one Procore company
- **Holdpoint rebrand** — HP CSS custom properties (`--hp-*`) in `globals.css`, always applied via inline `style={{}}`, never Tailwind arbitrary values
- **Vercel deployment** — live at https://itp-reviewer.vercel.app

### Known limitations
- No email notifications
- Manual upload does not support .msg or .docx (only the Procore import pipeline does)
- No self-serve onboarding — new companies added manually
- Multi-tenant commercial version is the next major phase

---

## Report to Action Plan converter

### Flow
1. User uploads a report (PDF, JPG, PNG, DOCX, XLSX) on the Action Plans tab
2. Claude converts it into a `ConvertedActionPlan` — sections and activities
3. Read-only preview with Procore-style `section.position` numbering
4. User picks a target project and plan type (defaults to "Quality")
5. Upload creates a Draft plan in Procore with sections and items sequentially
6. Best-effort attachment of the source report is attempted but **does not work via the Procore API** — it is a manual step

### API routes
| Route | Purpose |
|-------|---------|
| `POST /api/action-plan/convert` | Accepts single file (multipart), returns `ConvertedActionPlan` |
| `POST /api/action-plan/upload` | Accepts multipart (payload JSON + optional file), creates plan/sections/items in Procore |
| `GET /api/action-plan/plan-types` | Proxies Procore company plan types |

### Procore Action Plans API (confirmed contract)
Full details in `docs/PROCORE-ACTION-PLANS-API.md`. Key rules:

- Sections and items POST to **flat paths** with parent id in body. Nested paths 404.
- POST bodies use singular wrapper: `plan`, `plan_section`, `plan_item`.
- `plan_section_id` is **mandatory** on every item.
- Plan types are **company-scoped**: `GET /rest/v1.0/companies/{company_id}/action_plans/plan_types`
- Plans always created as **Draft**. Publishing is manual in Procore UI.
- `description` field maps to "Acceptance criteria" in Procore UI. `notes` maps to "Notes".
- **Attachments do not work via API.** All three strategies return 2xx but the assets array stays empty. Never trust a 2xx as proof — always verify by re-reading the plan's assets array.

### Conversion rules (in the prompt)
- Each top-level report item → its own Procore SECTION. Sub-items 2a, 2b → items 2.1, 2.2.
- Never write outline numbers into a title — Procore generates them.
- `acceptance_criteria` holds the consultant's own words or null. Never invent what is required to close an item.
- Never set assignees, due dates, hold points, priorities, verification methods, or item status.

---

## Tech stack

- **Next.js 15** (App Router, TypeScript), **React 19**
- **Tailwind CSS 3** + **HP CSS custom properties** (`--hp-*`) via inline `style={{}}`
- **Anthropic SDK** — model `claude-sonnet-4-6`, `max_tokens: 16000`
- **Procore REST API** (OAuth 2.0, `application/x-www-form-urlencoded` token exchange)
- **Supabase** — database + Storage (service role key for all server routes, see rules)
- **mammoth** — `.docx` text extraction (import pipeline + scoring guidelines + action plan converter)
- **xlsx** — `.xlsx` parsing for action plan converter (sheet → tab-delimited text)
- **msgreader** — `.msg` email extraction (import pipeline only)
- **lucide-react** — icons, **jszip** — bulk PDF zip, **@react-pdf/renderer** — PDF generation

Dev server: port **3010** (`npm run dev`).

---

## Supabase — critical rules

All tables have RLS enabled. **Every server-side route must use `SUPABASE_SERVICE_ROLE_KEY`**, not the anon key. The anon key silently returns empty results with no error — this is a bug when used server-side.

```ts
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

---

## Deployment (Vercel — LIVE)

Live URL: https://itp-reviewer.vercel.app

### Environment variables
```
ANTHROPIC_API_KEY, PROCORE_ENV=production, PROCORE_CLIENT_ID, PROCORE_CLIENT_SECRET,
PROCORE_REDIRECT_URI=https://your-domain.vercel.app/api/auth/callback,
FLEEK_COMPANY_ID=598134325535477,
NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, SUPABASE_SERVICE_ROLE_KEY
```

### Vercel considerations
- **Node.js runtime required** everywhere — mammoth, msgreader, xlsx, scoring.ts use Node APIs. Never set `runtime = "edge"`.
- **`maxDuration`** — import route = 60, report route = 300. Set per-route as needed.
- **No filesystem writes** — all persistence via Supabase.

---

## Breadcrumb / Site Compliance

Breadcrumb is a site access/induction platform. API spec at `docs/breadcrumb-api.json`.

**Critical date rules:**
- Week = Mon–Fri. Anchor = Monday of Sydney-local week.
- All date arithmetic uses `toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" })` → `T00:00:00Z` parse → UTC accessors. Never use `T00:00:00` (local parse) — it drifts by one day in UTC+10.
- Day-bucketing: always use `toSydneyDate()`, never `.substring(0, 10)` on a timestamp.
- Score: `x/y` where `y` = Mon–Fri days up to today, `x` = days with prestart. Green/amber/red thresholds.
- "On Track" requires all past prestarts + toolbox talk this week (Monday exemption for current week).

---

## Hold Point extractor

Routes share constants from `src/lib/holdpoint-prompt.ts` (`STAGE_ORDER`, `SYSTEM_PROMPT`).

| Route | Purpose |
|-------|---------|
| `GET /api/holdpoint/drawings` | Keyword-matched drawing revisions |
| `POST /api/holdpoint/generate` | Download drawings, extract hold points via Claude, dedup, save |
| `POST /api/holdpoint/analyse-doc` | Single-doc extraction |
| `POST /api/holdpoint/add-documents` | Extract from new docs, dedup against existing, merge |

Dedup key: `description.toLowerCase() + "|" + stage.toLowerCase()`. Do not change.

Procore Documents API uses flat endpoints (`/rest/v1.0/folders`, `/rest/v1.0/documents`) with `project_id` as query param. Do NOT use `procoreGetAllPages` — use `fetchAllFolders`/`fetchAllDocuments` with `toArray()`.

---

## ITP Status Report

**Report tab** — `src/components/ReportTab.tsx`, route `GET /api/dashboard/report?company_id=X`.

- Per-project inspection counts via serial batches of 2 with 600ms pause (do NOT raise — trips 429).
- 429 retry: up to 3 retries with exponential backoff.
- Insights refresh-if-stale: regenerates snapshots older than this Monday via existing routes.
- `maxDuration = 300`. Summary + Detailed PDF exports via `POST /api/dashboard/report-pdf`.

---

## Scoring framework (calibrated v1.0)

All scoring logic defined in `buildSystemPrompt()` in `src/lib/prompt.ts`.

### Tiers and weights
| Dimension | Tier 1 (Structural) | Tier 2 (Waterproofing) | Tier 3 (Standard) |
|-----------|--------|--------|--------|
| D1 Engineer verification | 35 | 30 | 20 |
| D2 Technical testing | 25 | 30 | 10 |
| D3 ITP form completeness | 25 | 25 | 45 |
| D4 Material traceability | 10 | 5 | 15 |
| D5 Physical evidence | 5 | 10 | 10 |

### States: Full (100%), Declared No Evidence (70%), Partial (40–75%), Missing (0%), N/A (excluded from denominator)

### Bands: compliant (85–100), minor_gaps (70–84), significant_gaps (50–69), critical_risk (0–49)

### Commercial confidence: HIGH / MEDIUM / LOW — independent of total_score.

---

## Key files

### Engine 1 (ITP Review)
- `src/lib/prompt.ts` — system prompt, preamble, instructions with JSON template
- `src/lib/claude.ts` — Claude client, extractJson, normalizeEnums, validateResult
- `src/lib/scoring.ts` — company scoring content fetcher (Supabase → local → fallback). Never throws.
- `src/lib/types.ts` — all TypeScript interfaces (ProcessedFile, ReviewResult, ScoreBreakdown, etc.)

### Engine 2 (Action Plan converter)
- `src/lib/actionPlanPrompt.ts` — conversion system prompt and JSON instructions
- `src/lib/actionPlanClaude.ts` — own Claude client, extractJson, validateActionPlan
- `src/lib/actionPlanTypes.ts` — ConvertedActionPlan, ActionPlanActivity interfaces

### Procore
- `src/lib/procore.ts` — OAuth + REST client. `procoreGet` is private; `procoreGetAllPages` is exported.
- `getInspectionDetail()` always uses `view=extended`. `downloadFile()` omits auth for S3 URLs.

### Other
- `src/lib/history.ts` — writes to Supabase `review_records` table
- `src/lib/audit.ts` — fire-and-forget audit events. Never throws.
- `src/lib/admin.ts` — `isCompanyAdmin()`. Never throws.
- `src/lib/validation.ts` — manual upload validation constants (not used by import pipeline)

### API routes (import pipeline)
`POST /api/procore/import` — fetch inspection → flatten items → download attachments (PDF first, then 10 smallest images, then .msg/.docx text) → run review → save → audit log. `.doc` rejected. Total budget 20 MB.

### Dashboard routes
- `GET /api/dashboard/inspections` — all-status ITPs with review records (used by dashboard, not import UI)
- `GET /api/dashboard/projects` — projects with aggregate stats
- `POST /api/dashboard/override` — score override (admin only)
- `GET /api/dashboard/report` — cross-project ITP status report

---

## Rules that must never be broken

### ITP Review engine
1. **Never change scoring weights** without updating `buildSystemPrompt()` AND `types.ts` together.
2. **Always use `view=extended`** on `/rest/v1.0/checklist/lists/{id}`. Without it: scores of 18/100.
3. **`MAX_TOKENS` ≥ 16000** in `claude.ts`. Was truncating at 4096.
4. **JSON template in `buildInstructions()` must end with `}`** and nothing after. Breaks prefill.
5. **Output length limits are mandatory.** Exceeding causes truncation. Do not loosen.
6. **Never apply `Missing` when partial evidence exists.** Use `Partial`. Missing = 0 points.
7. **N/A excluded from denominator.** High N/A count is correct for small-scope ITPs.
8. **`commercial_confidence` is independent of `total_score`.** Never let one influence the other.
9. **All evidence formats are equivalent** when content is clear. Never penalise based on format.

### Action Plan converter
10. **`acceptance_criteria` holds the consultant's own words or null.** Never write what is required to close an item. Never invent acceptance criteria.
11. **Never set assignees, due dates, hold points, priorities, verification methods, or item status.**
12. **Each top-level report item → its own Procore SECTION.** Sub-items become items within that section. Never write outline numbers (1.1, 2.3) into a title — Procore generates them.
13. **Sections and items POST to flat paths** with parent id in the body. Nested paths 404.
14. **`plan_section_id` is mandatory** on every plan item.
15. **Plan types are company-scoped**, not project-scoped.
16. **Never treat a 2xx as proof an attachment landed.** Verify by re-reading the plan and checking assets array is non-empty.

### Procore API
17. **`company_id` as both query param AND `Procore-Company-Id` header** on all project/inspection endpoints.
18. **Never send `Authorization` header to S3 presigned URLs.** S3 returns 400.

### MCP tools
33. **MCP tools never throw.** Catch and return `{ isError: true }` with a readable message. A thrown error becomes a 500 the client cannot explain.
34. **Only `create_inspections` writes.** Every other MCP tool is read-only. Adding another write tool is a deliberate decision, not a convenience — it needs a cap, a read-back verification, and a description that tells the caller to confirm with the user first.
35. **Cap every list result.** Default 50, hard max 200. Inspection detail caps items at 300.
36. **Never return attachment or photo URLs from MCP tools.** Counts only. URLs are presigned and short-lived.

### Supabase
19. **All server routes use `SUPABASE_SERVICE_ROLE_KEY`.** Anon key silently returns empty results.

### Code patterns
20. **Review history in Supabase**, not filesystem. No `data/review-history.json`.
21. **PDFs passed natively to Claude**, not parsed to text.
22. **`sections` state in `ReviewResults` is the single source of truth** for collapse state.
23. **`logAuditEvent()` never throws.** Fire-and-forget.
24. **`scoring.ts` never throws.** Always falls back silently.
25. **HP CSS custom properties via inline `style={{}}`.** Not Tailwind arbitrary values.
26. **Procore inspections for manual import UI** filter `status === "closed"` AND `name.startsWith("itp")`. Dashboard endpoint shows all statuses — different filter.
27. **Images from Procore: max 10, smallest-first, under 4 MB each.** PDFs processed first.
28. **`.msg`/`.docx` converted to plain text**, not sent as binary. `.doc` rejected.
29. **Never modify `getValidToken` in `token-store.ts`.** The bulk queue depends on its exact behaviour.
30. **Never commit secrets, never edit `.env.local`.** Tell the user what to add and they will add it.
31. **Confirm Procore endpoints against developers.procore.com at build time.** Never recall endpoint shapes or field names from memory.
32. **Windows environment.** No unix-only commands, no background processes, do not start or restart the dev server. The user runs it.

---

## MCP Server

### What it is
`/api/mcp` is a remote MCP (Model Context Protocol) server that exposes Procore tools to Claude. Built on `mcp-handler` v2 with `@modelcontextprotocol/server` helpers.

### Auth paths (checked in order)
1. **Static bearer token** — `MCP_BEARER_TOKEN` env var. Used by Claude Code and curl. Exact string match.
2. **OAuth-issued bearer token** — looked up by SHA-256 hash in `mcp_oauth_tokens` table. Used by Claude.ai and Claude Desktop via the custom connector.
3. **No valid token** → 401 with `WWW-Authenticate: Bearer error="invalid_token", error_description="...", resource_metadata="..."` pointing to the RFC 9728 Protected Resource Metadata.

### OAuth endpoints
| Route | Method | Purpose |
|-------|--------|---------|
| `/.well-known/oauth-protected-resource` | GET | RFC 9728 Protected Resource Metadata (root fallback) |
| `/.well-known/oauth-protected-resource/api/mcp` | GET | RFC 9728 Protected Resource Metadata (path-aware, probed first by clients) |
| `/.well-known/oauth-authorization-server` | GET | RFC 8414 Authorization Server Metadata |
| `/oauth/authorize` | GET | Authorization endpoint — validates params, checks Procore session + email allowlist, renders approve page |
| `/oauth/authorize` | POST | Approve submission — generates one-time auth code, stores in Supabase, redirects to Claude's callback with 303 |
| `/oauth/token` | POST | Token endpoint — exchanges code + code_verifier for access/refresh tokens, or refreshes a token pair |

### Shared helpers
`src/lib/mcp-oauth.ts` — metadata builders, PKCE verification, token hashing, email allowlist check, Supabase client, request logging.

### Supabase tables
Both tables have RLS enabled. All access uses `SUPABASE_SERVICE_ROLE_KEY`.

**`mcp_oauth_codes`** — one-time authorization codes. Columns: `code` (PK), `client_id`, `redirect_uri`, `code_challenge`, `procore_user_id`, `scope`, `expires_at` (10 min), `used`, `created_at`.

**`mcp_oauth_tokens`** — issued token pairs. **Tokens stored as SHA-256 hashes, never plain text.** Columns: `access_token_hash` (PK), `refresh_token_hash` (UNIQUE), `client_id`, `procore_user_id`, `scope`, `expires_at` (1 hour), `refresh_expires_at` (30 days), `created_at`. Refresh tokens are single-use — on refresh the old pair is deleted and a new pair issued.

### Client registration
Claude.ai does **not** support Dynamic Client Registration (RFC 7591). It requires a pre-registered `client_id` pasted into the connector dialog's "OAuth Client ID" field. The `registration_endpoint` is omitted from the AS metadata.

- **`MCP_OAUTH_CLIENT_ID`** — a single pre-registered UUID stored as an env var.
- **Claude's redirect_uri** — `https://claude.ai/api/mcp/auth_callback`, locked to exact string match in `ALLOWED_REDIRECT_URIS` in `/oauth/authorize/route.ts`.
- **OAuth Client Secret** — left empty in the connector dialog. Public client (`token_endpoint_auth_method: "none"`).

### Procore session gating
The `/oauth/authorize` page requires an existing Procore login session (cookies) AND the user's email must pass `ALLOWED_EMAILS` / `ALLOWED_EMAIL_DOMAINS`. If no session exists, the authorize route sets a `mcp_oauth_return_to` cookie (httpOnly, secure, sameSite=lax, 10-min TTL) containing the full authorize path+query, then redirects to `/api/auth/login`. After Procore login, `/api/auth/callback` checks for this cookie and redirects back to the authorize URL with all OAuth params intact.

### Env vars (MCP-specific)
```
MCP_BEARER_TOKEN          — static token for Claude Code / curl
MCP_SERVER_URL            — canonical resource URL, e.g. https://itp-reviewer.vercel.app/api/mcp
MCP_OAUTH_CLIENT_ID       — pre-registered UUID for the Claude.ai connector
MCP_PROCORE_USER_ID       — pinned Procore user id used by the static bearer path only
```

### Procore identity for tool calls (decided 28 Aug 2026)
A tool call acts as **the token owner** when authenticated by OAuth — `procore_user_id` from the `mcp_oauth_tokens` row. The static bearer path has no user attached to it, so it falls back to the pinned account in `MCP_PROCORE_USER_ID`.

`src/app/api/mcp/route.ts` resolves this per request into an `McpToolContext` and builds the handler with it, which is why `createMcpHandler` is called inside `buildHandler()` rather than at module scope. Tools then call `getValidToken(FLEEK_COMPANY_ID, procoreUserId)` for a fresh access token.

If the resolved user has never logged in to Holdpoint, `getValidToken` returns null and the tool returns an `isError` result telling the caller to log in. That is expected behaviour, not a bug.

### Tools
Registered in `src/lib/mcp-tools.ts` via `registerHoldpointTools(server, ctx)`.

| Tool | Inputs | Returns |
|------|--------|---------|
| `ping` | none | Health check plus the auth path and Procore user id in play |
| `list_projects` | `active_only?` (default true), `limit?` (default 50, max 200) | `id`, `name`, `display_name`, `project_number` |
| `list_inspections` | `project_id`, `status?`, `name_starts_with?`, `limit?` | Inspection summaries — no items, no attachments |
| `get_inspection_detail` | `project_id`, `inspection_id` | Sections, items, answers and comments. Attachment and photo **counts only**, no URLs |
| `list_templates` | `project_id`, `contains?`, `limit?` | Project-level inspection templates. Never company templates |
| `list_locations` | `project_id`, `path_contains?`, `depth?`, `limit?` | Location tree, flat, with full `path` and `depth`. Fully paged |
| `create_inspections` | `project_id`, `list_template_id`, `location_ids[]`, `inspection_date?` | **WRITES.** One inspection per location, capped at 25, read back and confirmed |

All reuse the confirmed helpers in `src/lib/procore.ts`.

`create_inspections` is the only write. It refuses duplicate location ids, validates every location against the project before writing anything, creates serially with a 600ms pause (Procore rate-limits this account hard), then re-reads the project and reports which inspections it could actually confirm. A 2xx alone is never reported as success.

Decided 28 Aug 2026: the bulk ITP builder is driven from chat through these tools, not through a dashboard tab. A tab was built and removed the same day — a list in chat is as reviewable as a list on screen, and chat handles the exceptions ("skip G.02", "add ITP-018 to the ones with laundries") that a form cannot. `src/components/_to_delete/BulkItpTab.tsx` is the removed component, kept only until it is deleted from disk.

Still to build: creating the tracker sections and rows, and linking each inspection to its row via a test record request and test record.

---

## MCP OAuth gotchas (learned the hard way)

1. **`scopes_supported: []` kills the flow.** RFC 8414 §2: "Claims with zero elements MUST be omitted from the response." An empty array declares the server supports no scopes. Claude reads this, gives up, and never calls `/oauth/register`. Omit the field entirely if you have no scopes.

2. **Redirect after approve must be 303, not 307.** Next.js `NextResponse.redirect()` defaults to 307, which preserves the request method. The approve form POSTs, so the redirect sends a POST to Claude's callback, which rejects it with "Method Not Allowed." Use `NextResponse.redirect(url, 303)` — 303 See Other forces the browser to follow with GET. Per OAuth 2.1 §4.1.2.

3. **OAuth params lost after Procore login.** The authorize URL contains `client_id`, `redirect_uri`, `code_challenge`, `state`, etc. If the user has no Procore session, they must log in first. The Procore callback always redirects to `/?auth=success` — the original authorize URL is gone. Fix: store the full authorize path+query in a `mcp_oauth_return_to` cookie before redirecting to login, and have the callback redirect back to it.

4. **Vercel log exports cap at ~76 rows.** Filter by time range and function name before exporting, or the useful lines get cut off.

5. **Protected Resource Metadata is path-aware (RFC 9728 §3).** For a resource at `/api/mcp`, the metadata must be served at `/.well-known/oauth-protected-resource/api/mcp`, not just at the root. Clients probe the path-aware location first.

6. **WWW-Authenticate header must include `error` and `error_description`.** A bare `Bearer resource_metadata="..."` is not enough. The library emits `Bearer error="invalid_token", error_description="...", resource_metadata="..."`. Match this format exactly.

---

## Bondi tiling ITP run — COMPLETE as at 30 Aug 2026

Project 598134326053879. Template `ITP- 018 Tiling` = 598134329344256 (project level).

17 apartments group into **5 sets** by wet-area content. Balconies excluded (external, AS 4654). Room names standardised — `Powder/ Laundry`, `Laundry/ Pantry` and `Pantry/ Laundry` all become `Laundry`; `Ensuit` and `BAth` corrected.

| Set | Wet areas | Apartments | Status |
|-----|-----------|-----------|--------|
| 1 | Bath, Ensuite, Laundry | G.01, G.02, W102, W201, W301, B102, B103, B201, B202, B203, B204 | Done |
| 2 | Bath, Ensuite, Laundry, WC | B301, B302 | Done |
| 3 | Bath, Laundry | B101, B104 | Done |
| 4 | Bath, WC, Laundry | W101 | Done |
| 5 | Ensuite | W202 | Done |

**All 17 created and read-back verified. All 17 descriptions set to the apartment code** (`W102`, `B301`, `G. 01` etc). The template has been stripped back to its original 17 items — sections 2, 3 and 4 end at x.4 again.

Sub-location items go in **PRE-INSTALL CHECKS, INSTALLATION and POST-INSTALLATION** only. Not Documents, not Compliance. Numbering picks up at 2.5, 3.5 and 4.5.

Still outstanding for this run: linking the inspections to an Action Plan tracker (no tool yet), and the Bondi location tree needs a tidy — see the review notes: five parallel hierarchies for the same building, plus typos (`bath 1`, `BAth`, `Ensuit`, `Recyling`, `Exausts`).

### Joinery / external waterproofing / pre-sheet — done 30 Aug 2026

Modelled on the William Street Alexandria `4 - Internal Inspection Tracker` Jordy supplied. Its per-unit (T1) section is the canonical Fleek order; Bondi Rd now matches it. Three more straight runs, 17 each:

- `ITP- 017 Joinery ` = 598134329344264 (note the trailing space in the name)
- `ITP- 010 External Waterproofing` = 598134330945839
- `ITP- 022 internal Pre Sheet Inspection` = 598134329344252 — William Street uses this single ITP at unit level and reserves ITP-023/024/025 for basement service rough-in, so Bondi Rd does the same

**Correction — ITP-011 was already done.** An earlier note in this file claimed only a G.01 trial record of `ITP- 011 Internal Waterproofing` existed, with id 598134331798637. That was wrong. All 17 apartment records exist (numbers 12-28, created 26 Aug 2026, template 598134329484536), with per-wet-area line items and item counts varying 29/32/35/38 by wet-area set. The quoted id matches no ITP-011 record. Ten older ITP-011s also sit at building and level locations (numbers 1-11, 26 items) covering basement and common area membrane.

Lesson: check live data before telling Jordy something is missing. He caught this one.

**Real gap: assignee, responsible contractor and due date are blank on every record created on 30 Aug.** The 26 Aug ITP-011 run set all three (inspector Amjad Siddiqui, contractor Capital Choice Waterproofing, due 6 Oct 2026). `create_inspections` does not set them and nothing since has. They are settable in bulk via the same `PATCH /rest/v1.1/projects/{pid}/checklist/lists/{id}` used for descriptions — `updateInspection` in `src/lib/procore.ts` already takes `due_at`.

Descriptions: 51 PATCH calls in one `javascript_tool` call **times out** (CDP limit is 45s). Split into batches of ~17. PATCH is idempotent so a retry after a timeout is safe.

### Flooring and glazing ITPs — done 30 Aug 2026, no template edits needed

Three more ITPs raised against all 17 apartments, straight runs with no template passes because none needs per-room sub-areas:

- `ITP- 016 Timber/ Engineered Floor Finishes` = 598134329344257 — 17 created
- `ITP- 019 Pedestal Floor Covering` = 598134329344251 — 17 created
- `ITP- 014 Windows and Glazing` = 598134329484550 — 17 created

All 51 read-back verified, all descriptions set to the apartment code. Full id table in the project doc `claude/bondi-apartment-itp-runs.md`.

Glazing is per apartment, not per elevation: ITP-014's checks are operable panels, gaskets, storm moulds, door hardware and the site hose test — inside-the-unit work whose defects have to point at a unit. The facade side (flashings over openings) is already in ITP-015. Common areas and retail were deliberately excluded on Jordy's call.

Note for later: G.01 and G.02 have a `Garden` child, not a `Balcony`. Jordy chose to raise ITP-019 against them anyway. If those courtyards turn out not to be pedestal-paved, delete 598134331809291 and 598134331809292.

### Facade cladding ITPs — done 30 Aug 2026

8 created off `ITP- 015 Facade Cladding` = 598134329484524, one per elevation per building, each carrying LVL 1/2/3 as line items. Full detail in the project doc `claude/bondi-facade-cladding-itps.md`.

Two firsts on this run:

**Locations can be created through the UI.** The Locations tool (`/tools/locations`) has a tiered picker: click a tier-1 node to select it, then focus the `+ Nth tier` input and type + press Return to create a child. The tier list is virtualised — set `scrollTop` AND dispatch a `scroll` event or the next rows never render. The React setter trick does NOT commit here; the value must be typed with real key events (`computer` `type` then `key: Return`) after focusing the input via JS. 10 locations added this way: `Bondi Rd Building > Facades > North/South/East/West Elevation` and the same under `Wellington St Manning Building`.

**Quick add can be driven the same way.** Focus the Quick add textarea (the one with no placeholder, lowest on the page), type the item names separated by Return, then read the Preview pane numbering before clicking `Add N items`. Pick the right section's Quick add button by y-coordinate between that section's header and the next section's header — never by DOM index, which shifts with virtualisation. Items land as Pass/fail.

The template was left with the LVL rows in place, unlike tiling, because all 8 inspections use the same configuration.

### Responsible contractors set from commitments (30 Aug 2026)

Read the project's commitments, proposed a contractor per ITP, Jordy confirmed. 86 inspections now carry one. Detail and the still-blank ones in the project doc `claude/bondi-itp-contractors.md`.

Set: Capital Choice Waterproofing on ITP-010 and ITP-011, Aluxus on ITP-014, B&C Glass and Aluminium on ITP-015, Addison Joinery on ITP-017.

**Do not infer the facade contractor from the partitions package.** Aluxus holds partitions, metal works AND terracotta cladding, and signs the facade rows at William Street, so every signal pointed at them. Jordy's answer was B&C — "B&C are doing the cladding, Aluxus are doing glazing." Proposing and asking was right; guessing would have been wrong on 8 records.

Blank and genuinely unknowable from Procore: ITP-018 Tiling, ITP-019 Pedestal and ITP-016 Timber have no install commitment at all, only supply POs. ITP-022 Pre Sheet spans five trades and one field.

`responsible_contractor_id` is the PATCH field; `vendor_id` returns 200 and does nothing. Written up in `docs/PROCORE-BULK-ITP-API.md`.

### Attachment and photo requests added to every row (31 Aug 2026)

A row will not accept a file or photo until a request of that type exists on it. Added to all 163 rows: 163 `attachment` + 163 `photo`, on top of the 146 `checklist` links. 472 requests, no duplicates. Same endpoint as the ITP link with `type: "attachment"` / `"photo"` and no payload. Written up in `docs/PROCORE-BULK-ITP-API.md`.

Note this needed no draft round trip — **only sections are locked on a published plan.**

### Sections lock on publish — and the way back (30 Aug 2026)

Adding a BASEMENT section to the live tracker hit `409 Unable to modify sections while plan's status is in_progress`. Sections are frozen once a plan is published; items are not.

The way out: `PATCH {plan:{status_id:1}}` reverts to draft, add the section and items, then press Publish in the UI again. **Use `status_id`, not `status`** — `{plan:{status:"draft"}}` worked once then silently stopped working, 200 with no change. Items also cannot be moved between sections by any PATCH shape; delete and recreate. **The round trip is non-destructive** — 19 sections / 161 items / 144 requests / 144 records / 118 assignees all survived unchanged. Snapshot counts before and after regardless.

Basement was then split on Jordy's call into three sections at positions 20-22: **BASEMENT 1** (598134327094062, empty for now), **BASEMENT 2** (598134327094115) and **BASEMENTS COMBINED** (598134327094116). Procore ignores a requested `position` on create and always appends, which conveniently left every existing section number stable — B101 is still section 3.

**The rule for COMBINED**, agreed with Jordy so it does not become a dumping ground: a row goes there only when the inspection is a single record signed off once across both levels. If the work happens twice, once per level, it belongs in the level section even when it is the same trade. Car stacker qualifies (one machine, commissioned once). Services rough in does not (B2 then B1, months apart).

Rationale for splitting by level, not by building: both levels contain Lift B and Lift W, so it is one shared basement under both buildings. B1 holds the plant (fire pump room, main switchboard, comm board, cold water plant, grease arrestor, waste, retail store); B2 holds parking, the pump out pit, sewer pump and turntable. Different scopes, and B2 gets tanked and backfilled before B1 exists, so B2 records cannot be reopened later.

Tracker now: 22 sections, 163 items, 146 requests, 147 records, 118 assignees, nothing blocking, no orphans.

### Tracker assignees set (30 Aug 2026)

118 assignees across the Internal Inspection Tracker, verified, no duplicates. The mapping repeats identically in every apartment section, so it is row-title driven, not per-section. Detail in `claude/bondi-itp-contractors.md`.

`plan_item_assignees` takes a **`party_id`, not a user id** — parties come from `/action_plans/parties` and carry the vendor, which is how people map to subcontractors. Written up in `docs/PROCORE-BULK-ITP-API.md`.

Also added two roof ITPs: ITP-032 METAL ROOFING at `A Roof>Wellington>W Roof` (598134331810795, contractor pending) and ITP-010 External Waterproofing at `A Roof>Bondi>B Roof` (598134331810798, Capital Choice). Neither is in the tracker — it covers apartments and elevations only.

**Watch the browser tab.** The Chrome tab was closed mid-session and every `window.*` variable went with it, including the batch cursor. Rebuild state from the API after any navigation or tab loss, and keep batches at ~50 writes per `javascript_tool` call — 55 timed out at the 45s CDP limit partway through, though the writes that landed were fine and the cursor let it resume.

### Internal Inspection Tracker built — Action Plan linking is done (30 Aug 2026)

Action Plan #14 `Internal Inspection Tracker` on Bondi Rd, plan id 598134325853211. 19 sections, 161 items, **144 inspections linked and verified**. Modelled on William Street Alexandria's Action Plan #4. Full structure in the project doc `claude/bondi-internal-inspection-tracker.md`.

This closes the last open question from the original goal: bulk-create inspections AND link them to a tracker. Both halves now work. The confirmed POST body wrappers are written up in `docs/PROCORE-BULK-ITP-API.md` — the previous "still not confirmed" note there is resolved.

Two gotchas worth keeping:

- **A draft plan silently rejects test records** with a 409. `PATCH {plan:{status:"in_progress"}}` returns 200 and does nothing; the plan must be published from the UI. See the doc.
- **Batch size.** One `javascript_tool` call is capped at 45s by CDP. ~50 links (100 POSTs) per call is safe; 144 in one call times out. Keep the cursor on `window` so batches resume rather than restart — and note a page navigation wipes `window` state, so rebuild from the API rather than from memory.

### Driving the Procore template editor — use JavaScript, not clicks

Coordinate clicks and accessibility-tree refs both cost hours on this run. Two things fixed it. Do these first next time.

**1. Never trust screenshot coordinates on this page.** Check the real geometry before clicking anything:

```js
JSON.stringify({dpr:devicePixelRatio, vw:innerWidth, vh:innerHeight})
```

On the run of 30 Aug this returned `dpr 0.75, vw 2560` while the screenshot came back 1568px wide with the page drawn into the top-left ~783px of it. Screenshot coords were off by a factor of ~3.3, so every coordinate click missed. The a11y tree is no better — it does not expose textarea values at all, so `find` cannot locate a row by its title.

**2. Drive the editor from the DOM.** Item titles are `<textarea>` elements. The row is `textarea.parentElement.parentElement.parentElement` and carries a `button[aria-label="Delete"]`. React responds to `.click()` normally.

```js
// collapse every section first — collapsed sections are removed from the DOM,
// so only the expanded one's rows exist and matching by title is unambiguous
const secBtns = () => [...document.querySelectorAll('button')]
  .filter(b => /section/i.test(b.getAttribute('aria-label') || ''));
for (let i = 0; i < 12; i++) {
  const b = secBtns().find(x => x.getAttribute('aria-label') === 'Collapse section');
  if (!b) break; b.click(); await new Promise(r => setTimeout(r, 700));
}

// pick a section by its leading number, never by name — "INSTALLATION" also
// matches "POST-INSTALLATION"
const secBtn = n => secBtns().find(b => {
  const r = b.closest('tr') || b.parentElement.parentElement.parentElement;
  return (r.innerText || '').trim().split(/\s+/)[0] === String(n);
});

// delete a row by title
const ta = [...document.querySelectorAll('textarea')].find(t => t.value === 'Ensuite');
const row = ta.parentElement.parentElement.parentElement;
[...row.querySelectorAll('button')].find(b => b.getAttribute('aria-label') === 'Delete').click();
```

Renaming a row is cheaper than delete-plus-Quick-add. Use the native setter so React sees it:

```js
const set = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
set.call(ta, 'Ensuite');
ta.dispatchEvent(new Event('input', {bubbles: true}));
ta.dispatchEvent(new Event('change', {bubbles: true}));
```

Verify with `[...document.querySelectorAll('textarea')].map(t => t.value)` before pressing Update, then confirm the URL drops `/edit`. Cancel is a full undo until Update.

The old warning still stands if you ever fall back to clicking: the a11y tree misattributes which section a `Quick add` button belongs to — it put three items in PRE-INSTALL CHECKS while reporting INSTALLATION. Read the preview numbering (2.5 / 3.5 / 4.5) before committing.

### The Procore REST API accepts the browser session cookie

From a page on `us02.procore.com`, a same-origin `fetch` to `/rest/v1.1/...` with `credentials:'include'` and the `Procore-Company-Id` header works. No bearer token, no CSRF token needed (PATCH returned 200 with no `X-CSRF-Token`). This is how the 6 outstanding descriptions were set:

```js
await fetch(`/rest/v1.1/projects/${pid}/checklist/lists/${id}`, {
  method: 'PATCH', credentials: 'include',
  headers: {'Procore-Company-Id': cid, 'Content-Type': 'application/json'},
  body: JSON.stringify({list: {description: 'W101'}})
});
```

Useful escape hatch when the chat's MCP connector snapshot is stale and a tool you built is not in the session's tool list.

---

## Next up (as at 30 Aug 2026)

1. ~~Rotate `MCP_BEARER_TOKEN`~~ — done 28 Aug 2026. `.env.local` and Vercel both updated and redeployed.
2. ~~Rotate the Supabase service role key~~ — reviewed 28 Aug 2026 and deliberately not done. No known exposure; the key lives only in gitignored `.env.local` and Vercel, and it is a new-style `sb_secret_` key, not a legacy service_role JWT. Revisit only if it is actually exposed.
3. ~~Build the bulk ITP creation tab~~ — **binned 28 Aug 2026.** Jordy's call: chat-driven MCP tools plus browser automation beat a UI, because a UI is still work he has to do. `BulkItpTab.tsx` was removed. The `/api/bulk-itp/*` read routes stay as a reference. `docs/BULK-ITP-BUILDER-DESIGN.md` still holds the six principles; ignore its tab framing.
4. ~~Locations and checklist template MCP tools~~ — done. `list_locations` and `list_templates` are live.
5. **Action Plan tracker linking.** Endpoints are confirmed in `docs/PROCORE-BULK-ITP-API.md` (the two-record chain: test-record-requests then test-records). No tool built yet. This is the last piece of the original goal.
6. **Tidy the Bondi location tree.** Five parallel hierarchies for the same building, plus typos (`bath 1`, `BAth`, `Ensuit`, `Recyling`, `Exausts`). Worth doing before the next bulk run.
7. **Connector tool-list staleness.** claude.ai chats and Claude Code sessions both snapshot the connector's tool list at session start. After adding a tool, reconnect and then start a NEW session. On 30 Aug the chat was still on 7 tools and could not see `set_inspection_descriptions` — the session-cookie fetch above was the workaround.

Both MCP auth paths are verified working as at 28 Aug 2026: static bearer acting as the pinned `MCP_PROCORE_USER_ID`, and OAuth acting as the token owner.
