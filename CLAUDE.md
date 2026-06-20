# CLAUDE.md — Holdpoint

## Auto-save at end of every session (MANDATORY)

At the end of every session — without being asked — run:

```bash
bash save.sh "Brief description of what changed"
```

This commits all changes and pushes to GitHub (`jordan91lloyd-web/itp-reviewer`). Always do this as the final step, even if the task felt small. If there is nothing to commit, the script exits cleanly with no harm done.

---

## Current status

### Built and working
- **Manual upload** — drag-and-drop PDF/JPG/PNG, runs Claude review, returns full structured report
- **Procore OAuth** — login, callback, token refresh, logout, CSRF-protected state cookie
- **Procore import** — full pipeline: fetch inspection (view=extended), flatten items, build text file, download attachments (PDF + JPEG/PNG + .msg + .docx), run review, save to Supabase
- **Attachment extraction** — PDFs natively, JPEG/PNG as vision blocks, .msg via msgreader (subject/sender/body), .docx via mammoth (raw text), .doc gracefully rejected
- **Dashboard** (`/dashboard`) — full ITP management interface with three tabs: ITP Reviews, Company, Insights
  - Company → project → inspection hierarchy; status filter tabs (closed/open/in-review) with counts
  - ITP rows: score pill, rating band, "Ready to close" badge, days-open with colour coding, description popover (ⓘ), closed-by / assignee, direct Procore link
  - Sort by score (ascending/descending)
  - Side panel: full `ReviewResults` report, score breakdown bars, score override input
  - Stale data banner when Procore inspection was updated after the last review
- **Bulk review** — select any combination of reviewed/unreviewed ITPs; smart button label (Run / Re-run / Run/Re-run); sequential fetch, per-row progress indicators, reload on completion
- **Score overrides** — admins can set a manual override score + note on any review record; displayed prominently in the dashboard
- **Audit log** (`/audit`) — every review, override, login, export, document update is written to Supabase `audit_log` table; filterable viewer page
- **Admin pages** (`/admin/users`, `/admin/documents`) — manage company admins, upload company-specific scoring guidelines to Supabase Storage
- **Scoring document versioning** — `src/lib/scoring.ts` fetches company-specific `.docx` from Supabase Storage (5-min cache), falls back to local `public/documents/ITP-QA-Scoring-Guidelines-v1.0.docx`, then hardcoded fallback. Version label stamped into every review record.
- **Collapsible report sections** — all 11 sections in `ReviewResults` are independently collapsible; single `sections` state object at top level; "Collapse All / Expand All" button; print expands all sections before `window.print()` and restores state after
- **PDF print fix** — `globals.css` sets `html, body { height: auto; overflow: visible }` for `@media print`; `break-inside: auto` on cards so large sections paginate across pages
- **Access control** — `FLEEK_COMPANY_ID` env var gates login to users belonging to a specific Procore company; leave blank to disable (dev/multi-tenant use)
- **Company tab** — financial summary, subcontract progress metrics, and site-level stats aggregated across all projects for the selected Procore company
- **Insights tab** — per-project AI-generated insight cards showing: missing ITPs that should be open now, coming up in next 2–4 weeks, stage summary, completion %, contract value, active trades. Snapshots persist in Supabase across navigation; stale banner shown when data is older than 24h. "Refresh All" re-generates all cards sequentially.
- **Action items** — AI-generated next-action recommendations per ITP, accessible from the side panel; stored in Supabase and reloaded on return
- **Bulk PDF export** — export all reviewed ITPs for a project as individual PDFs (downloaded as a zip) or combined; logs `pdf_exported` audit events
- **CSV export** — export audit log to CSV from the audit viewer page
- **Direct Procore links** — every ITP row links directly to the inspection in Procore (`us02.procore.com/...`)
- **Holdpoint rebrand** — full brand palette applied throughout. HP CSS custom properties (`--hp-*`) defined in `globals.css`; all server and client components use these vars via inline `style={{}}` (not Tailwind arbitrary values — they are unreliable with CSS custom properties)
- **Vercel deployment** — app is live in production on Vercel

### Known limitations / not yet built
- No email notifications
- Manual upload does not support .msg or .docx (only the Procore import pipeline does)
- The `how-it-works` page exists but is sparse
- No self-serve onboarding — new companies are added manually (Supabase row + Procore app access)
- **Multi-tenant commercial version** is the next major phase — will be a separate repo, Vercel project, and Supabase instance. Current codebase is single-tenant (one Procore company).

---

## Breadcrumb integration

Breadcrumb is a site access / induction platform used on Fleek construction sites. Integration pulls site attendance, induction status, and supplier doc data into the **Site Compliance** tab on the dashboard.

Full API spec available at `docs/breadcrumb-api.json` — reference this for all endpoint shapes, request bodies, response schemas, and available parameters before building any Breadcrumb feature.

### Site Compliance tab

- Component: `src/components/SiteComplianceTab.tsx`
- API route: `src/app/api/breadcrumb/compliance-data/route.ts`
- Supabase tables: `site_compliance_notes` (per-site per-week notes), `compliance_hidden_sites` (hidden site refs)

**Week calculation rules (critical):**
- Week = Monday–Friday only (5 columns). No weekends.
- Week anchor = the Monday of the Sydney-local calendar week.
- `getSydneyCurrentWeekStart()` uses `toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" })` to get today's Sydney date as YYYY-MM-DD, then parses it with `T00:00:00Z` (UTC parse) and uses `getUTCDay()`/`setUTCDate()` for arithmetic. This avoids UTC-drift in browsers that are UTC+10.
- All date helpers in both the component and the API route must use `T00:00:00Z` and UTC accessors (`getUTCDay`, `setUTCDate`, `getUTCDate`, `toISOString`). Never use `T00:00:00` (local parse) followed by `toISOString()` — this drifts the date by one day in Sydney (UTC+10).
- `fmtWeekLabel()` also passes `timeZone: "UTC"` to `toLocaleDateString` to avoid further drift.

**Score column:** `x/y` where `y` = number of Mon–Fri days up to and including today, `x` = days with prestart done. Shows `–` before any past days, green at `x===y`, amber at `x >= ceil(y/2)`, red otherwise.

**Status logic:** "On Track" requires all past days to have prestart AND a toolbox talk this week. Monday exemption: on Monday of the current week the toolbox is not yet required (it may not have happened yet). The exemption only applies to `isCurrentWeek === true`.

**Week navigation:** ChevronLeft/Right buttons in the header. `selectedWeekStart` state drives `week_start` query param in the compliance-data fetch. The "next" button is disabled when already on the current week. Notes are saved against `selectedWeekStart`.

**Day-bucketing rule (critical):** A daily brief counts for a working day if its timestamp falls within that day in Australia/Sydney time (00:00–23:59 Sydney, inclusive), regardless of the brief's start time. Day-bucketing is done via `toSydneyDate()` in `compliance-data/route.ts`, which calls `new Date(ts).toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" })`. This correctly handles all timestamp formats the Breadcrumb API may return: UTC-with-Z (`"2026-06-08T18:00:00Z"` → Sydney `"2026-06-09"`), offset-aware (`"+10:00"`), and naive local strings. Never use `.substring(0, 10)` directly on a Breadcrumb timestamp — always use `toSydneyDate()`.

Timestamp field names: `fillDate` (from `/integration/v2/report/form-report`, type `date-time`), `endDate` (from `/integration/v2/report/form-data` → `filledFormInfo.endDate`, type `date-time`). The `form-report` call sets `convertDateTimeToLocalTimezone: true`; the `form-data` call does not — both must go through `toSydneyDate()` so they are compared on the same timezone basis. The Breadcrumb endpoint ignores date-filter params and returns all history; day-matching is done client-side (server-side in the route) by filtering the full returned set to the current Mon–Fri Sydney week.

---

## ITP Status Report (cross-project)

Accessible via the **Report** tab in the dashboard nav. On-screen only (PDF export is a future pass).

### What it shows
- **Summary table** — one row per non-hidden project: Closed count, Open/In-Progress count, Created-in-window, Closed-in-window, Avg score, band distribution.
- **Per-project detail blocks** — collapsible; shows all table columns plus score/band breakdown grid, AI stage summary, missing ITP list, coming-up list.
- **Window toggle** — 7 days / 30 days at the top; recomputes "created in window" and "closed in window" only. Open/closed totals and avg score are not window-dependent.

### Data sources
- **Open / Closed counts**: live `getInspections()` per project. `status.toLowerCase() === "closed"` → Closed; everything else → Open / In Progress. No in-review bucket.
- **Created in window**: count ITPs whose `created_at` (Sydney timezone, `toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" })`) ≥ window start date.
- **Closed in window**: count ITPs whose `closed_at` ≥ window start date. `closed_at` may be null on some closed ITPs — those are excluded from the count (not crashed on). Label reads "Closed (Nd)†" with a footnote.
- **Avg score + band counts**: from `review_records` Supabase table (latest record per inspection). Computed server-side in the route.
- **AI stage/missing ITPs**: from `project_financial_snapshots` cache (same as Insights tab). Shows snapshot age.

### Route: `GET /api/dashboard/report?company_id=X`
- File: `src/app/api/dashboard/report/route.ts`
- Fetches project list from Procore, excludes hidden projects, pulls review_records + snapshots from Supabase.
- Per-project `getInspections()` calls run in **serial batches of 2** with a **600 ms pause between batches** (`runInBatches`). Do NOT raise concurrency back to 5 — it trips Procore's rate limit (429) when there are many projects.
- **429 retry**: each project's fetch is wrapped in `getInspectionsWithRetry()` which retries up to 3 times on a 429 response with exponential back-off (1 s → 2 s → 4 s). `procoreGet` throws `"Procore API error 429 on …"` — 429 is detected by checking for `"429"` in the error message (Retry-After header is not accessible from the thrown error).
- Only after all retries are exhausted is a project marked "Data unavailable" (`procore_error` set, counts null).
- If a project's Procore fetch fails, that project row is returned with `procore_error` set and counts null — the whole report still loads.
- `maxDuration = 120` (Vercel serverless timeout).
- **Caching**: not yet implemented. Repeated refreshes re-pull all projects live. Future: 5-minute Supabase snapshot cache per company similar to `project_financial_snapshots`.

### Window date logic
- `sydneyWindowStart(daysBack)` returns the YYYY-MM-DD that is `daysBack-1` days before today in Sydney time (inclusive boundary).
- `toSydneyDate(isoStr)` converts any timestamp to its Sydney calendar date via `toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" })`.
- Comparison is string-based YYYY-MM-DD ≥ window start.

### Component: `src/components/ReportTab.tsx`
- Client component; receives `companyId` from the dashboard.
- Fetches `/api/dashboard/report` on mount and on Refresh click.
- Window toggle is purely client-side — no re-fetch needed; the API returns both 7d and 30d counts.

---

## What this app does

**Holdpoint** is a Next.js construction QA platform that reviews Inspection and Test Plan (ITP) packages using Claude AI. QA managers connect their Procore account, select a project and ITP inspection, and the app fetches the inspection data, downloads all attached evidence (PDFs, images, emails, Word docs), and returns a structured quality assessment: a numeric score (0–100), a score band, an audit readiness rating ("commercial confidence"), evidence gaps, key issues, and recommended next actions.

There are two input paths:
1. **Manual upload** — drag-and-drop or file-picker. PDF/JPG/PNG files only.
2. **Procore import** — OAuth-authenticated connection to Procore. The user picks a company → project → ITP inspection. The app fetches the inspection data, downloads all attached files (PDFs, images, emails, Word docs), converts the inspection form to a structured text file, and runs the same review engine.

Review metadata (score, band, full `ReviewResult` JSON, scoring version, Procore inspection ID) is stored in Supabase (`review_records` table). The dashboard reads from Supabase to show current review status, scores, and D1–D5 breakdowns without re-running the review.

The Insights tab provides a project-level view: AI-generated summaries of which ITPs are missing, what's coming up, and the overall project stage — built from Procore financial and inspection data.

---

## Tech stack

- **Next.js 15** (App Router, TypeScript)
- **React 19**
- **Tailwind CSS 3** for utility classes; **HP CSS custom properties** (`--hp-*`) in `globals.css` for brand colours — always applied via inline `style={{}}`, never via Tailwind arbitrary values
- **Anthropic SDK** (`@anthropic-ai/sdk`) — model is `claude-sonnet-4-6`, `max_tokens: 16000`
- **Procore REST API** (OAuth 2.0, `application/x-www-form-urlencoded` token exchange)
- **Supabase** (`@supabase/supabase-js`, `@supabase/ssr`) — database (review_records, audit_log, score_overrides, company_admins, scoring_versions, project_snapshots tables) + Storage (company scoring documents)
- **mammoth** (`^1.12.0`) — extracts plain text from `.docx` files; also used in `scoring.ts` to read `.docx` scoring guidelines from Supabase Storage
- **msgreader** (`^1.0.1`) — extracts subject, sender, and body from Outlook `.msg` files
- **lucide-react** (`^1.8.0`) — icon library used in dashboard UI
- **jszip** (`^3.10.1`) — used for bundling bulk PDF exports into a zip download
- **pdf-parse** (`^1.1.1`) — in dependencies but no longer used; PDFs go natively to Claude

Dev server runs on port **3010** (`npm run dev`).

---

## Supabase — critical rules

**All Supabase tables have RLS (Row Level Security) enabled.** The anon/publishable key respects RLS and will be blocked from reading most tables in server routes.

**Rule: every server-side API route that reads from or writes to Supabase must use `SUPABASE_SERVICE_ROLE_KEY`, not `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.** The service role key bypasses RLS and is safe to use server-side (it is never exposed to the browser).

The only exception is `src/lib/history.ts`, which currently uses the anon key for inserts — this works only because RLS insert policies allow it. For any new routes or queries, always default to the service role key.

```ts
// Correct for server-side routes:
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

---

## Deployment (Vercel — LIVE)

App is deployed and live. Key configuration:

Live URL: https://itp-reviewer.vercel.app

### Environment variables to set in Vercel dashboard
```
ANTHROPIC_API_KEY=...
PROCORE_ENV=production
PROCORE_CLIENT_ID=...                    # production app credentials (different from sandbox)
PROCORE_CLIENT_SECRET=...
PROCORE_REDIRECT_URI=https://your-domain.vercel.app/api/auth/callback
FLEEK_COMPANY_ID=598134325535477         # restricts login to one Procore company; blank = no restriction
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### Known Vercel considerations
- **Serverless function timeout** — the `/api/procore/import` route downloads files and calls Claude; total wall time can exceed Vercel's default 10s timeout. Vercel Pro allows up to 60s. Set `maxDuration = 60` in the route file or `vercel.json` if needed.
- **Node.js runtime required** — `mammoth`, `msgreader`, and `scoring.ts` (which uses `fs`/`path` to read local `.docx`) cannot run on the Vercel Edge runtime. All API routes must use the default Node.js runtime (the app currently does not set `export const runtime = "edge"` anywhere, so this is not currently an issue).
- **No native binaries** — `sharp` is not installed. If added later (e.g. for HEIC conversion), Vercel requires `sharp` to be installed from `@img/sharp-linux-x64` or similar for the Linux build environment.
- **File system writes** — all persistence is via Supabase. No filesystem writes occur in production.
- **PROCORE_REDIRECT_URI** — must match the Vercel production URL and be registered in the Procore developer portal for the production app.

---

## Hold Point extractor

The Hold Point Register tab lets users generate a project-wide register of mandatory inspection gates extracted from Procore drawings and uploaded documents.

### Architecture
Three API routes collaborate, all sharing constants from `src/lib/holdpoint-prompt.ts`:

| Route | Purpose |
|-------|---------|
| `GET /api/holdpoint/drawings` | Returns recommended Procore drawing revisions (keyword-matched on title) |
| `POST /api/holdpoint/generate` | Downloads drawing PDFs + Supabase uploads, extracts hold points via Claude, deduplicates, numbers, saves register |
| `POST /api/holdpoint/analyse-doc` | Single-document extraction — browser uploads one PDF to Supabase Storage, this route downloads, extracts, deletes, returns raw hold points |
| `POST /api/holdpoint/add-documents` | Extracts from new documents only, deduplicates against existing, numbers continuing from last ID, merges, saves |

### `src/lib/holdpoint-prompt.ts` — single source of truth
Exports:
- `STAGE_ORDER` — the 10 construction stages (string array). All routes and `HoldPointTab.tsx` import from here.
- `SYSTEM_PROMPT` — the extraction prompt. Do NOT copy-paste this into individual routes. Import and use.

### Extraction prompt design
The prompt recognises two categories:
- **Explicit hold points** (`confidence: "explicit"`) — directly labelled in the document as HP, WP, NP, Witness Point, etc.
- **Assumed hold points** (`confidence: "assumed"`) — no label but language implies a mandatory gate: "do not proceed without", "notify engineer before", "inspect and record", "engineer to inspect", etc.

The `confidence` field is part of the `RawHoldPoint`/`HoldPoint` interface in all routes and in `HoldPointTab.tsx`. It is optional (`confidence?`) in the component interface for backwards compatibility with existing Supabase records that pre-date the field.

### Hold point data model
```ts
interface HoldPoint {
  id:                string;   // "HP-001", "HP-002", … zero-padded, sequential
  description:       string;
  stage:             string;   // one of STAGE_ORDER
  responsible_party: string;
  source:            string;   // drawing number + title, or document name
  confidence?:       "explicit" | "assumed";
}
```

Deduplication key: `description.toLowerCase() + "|" + stage.toLowerCase()`. Do NOT change this — it preserves dedup behaviour across add-document calls.

### Drawing triage (`/api/holdpoint/drawings`)
- Fetches all current drawing revisions from Procore (`drawing_revisions?current=true`).
- Deduplicates to one revision per drawing number (latest revision wins).
- Recommends drawings whose **title** contains a keyword from `KEYWORDS`.
- **No "first N per discipline" fallback** — pure title-keyword classification only. This avoids pulling plan sheets (S-101, A-201, etc.) that contain geometry but rarely hold points.
- **Keywords target requirement/notes/spec sheets only.** Current list: `notes`, `specification`, `spec`, `criteria`, `durability`, `waterproofing`, `hold point`, `witness`, `inspection`, `quality`, `qa`. Intentionally excluded: `general` (catches general arrangement plans), `schedule`, `cover`, `typical`, `section`, `detail`, `standard`, `index` — all pull in geometry, list, or cover sheets that rarely contain hold point language.
- `DISCIPLINE_NAMES` and `getPrefix()` are still used to label the `discipline` field on output, but they do not influence which drawings are recommended.

### Drawing selection UI (`HoldPointTab.tsx` step 1)
- **Collapsible discipline groups**: each discipline header toggles its drawing list. Default: all disciplines containing auto-recommended drawings start expanded; others start collapsed (currently all shown disciplines are from recommendations so all start open).
- **Per-discipline bulk select**: each discipline header has a "Select all / Clear" control scoped to that group only. The global "Select all / Clear all" at the top remains.
- **Recommended badge**: drawings auto-selected by triage show a small "Recommended" pill. The badge is driven by `recommendedIds` (a Set populated from the API response on project load). Manually ticked drawings that were not in the original recommendation set show no badge.

### Procore Documents picker (`/api/holdpoint/procore-documents` + `HoldPointTab.tsx` step 1)
Lets users browse the project's Procore Documents tool and select files (PDFs) to feed into the same hold-point extraction pipeline as drawings.

**Confirmed Procore Documents API endpoints (empirically verified via 403 vs 404 probe):**
- `GET /rest/v1.0/folders?company_id=X&project_id=Y` — **flat list** of ALL folders with `parent_id` encoding hierarchy. project_id is a query param, NOT in the path. `/rest/v1.0/projects/{id}/folders` → 404 (doesn't exist).
- `GET /rest/v1.0/documents?company_id=X&project_id=Y` — **flat list of ALL documents** for the project. NO per-folder filtering needed — each document has a `folder_id` (or `parent_id`) field which the route uses to group by folder. This is more reliable than per-folder calls with `filters[folder_id]`.
- Both flat endpoints return 403 for service account tokens (endpoint exists, blocked for service account); they work with user OAuth tokens. `/rest/v1.0/projects/{id}/folders` and `/rest/v1.0/folders/{id}/documents` return 404 (don't exist).
- **Do NOT use `procoreGetAllPages`** for these endpoints. It does `all.push(...rows)` which throws if Procore returns a wrapped object. Use the custom `fetchAllFolders` / `fetchAllDocuments` functions instead, which use `toArray()` defensively.
- **`toArray()`** handles bare arrays, `{ data: [...] }`, `{ folders: [...] }`, `{ documents: [...] }`, and any other common wrapper key. The raw response body is logged on first page fetch for shape confirmation.

**API route** `GET /api/holdpoint/procore-documents?company_id=X&project_id=Y`:
- Step 1: `fetchAllFolders` — paginated, returns ALL folders with `parent_id`. `company_id` as both query param and header.
- Step 2: `fetchAllDocuments` — paginated, returns ALL documents for the project in one request sequence. First-page raw response logged for shape discovery.
- Step 3: Documents grouped by `folder_id ?? parent_id` into a Map, then assigned to folders.
- Returns ALL folders including parent folders with no direct files. `parent_id` preserved for tree-building.
- Errors surfaced with real HTTP status codes (403/404/500) — NOT silently swallowed into `{ folders: [] }`.

**Tree rendering in `HoldPointTab.tsx`:**
- `buildDocTree(folders)` builds a nested `DocTreeNode[]` from the flat folder list using `parent_id`.
- `allFilesInNode(node)` recursively collects all files from a node and all descendants.
- `renderDocNode(node, depth)` closure renders collapsible folder header + direct files + recursive children. Indentation scales with depth.
- "Select all / Clear" per folder acts recursively across the full subtree.
- On fetch error: red error banner with the real error message (not silent "no folders found").

**generate/route.ts** `procore_documents` body field `{ id, name, url, content_type?, size? }[]`:
- Cap: 15 documents per run. Files beyond the cap → `skipped_documents` with reason "run limit reached".
- Only PDFs extracted. Non-PDF → `skipped_documents`. Per-file size cap: 15 MB.
- Download via `downloadPdf()`. Extraction via `extractHoldPoints()`. Pooled into `allRaw[]` → dedup → save.
- Response includes `skipped_documents: { name, reason }[]`.

**UI** (step 1, between drawings and upload zone):
- Full nested folder tree: collapsible at every level. Per-folder "Select all" selects recursively. Unsupported files greyed with "Unsupported" tag. Files over 10 MB show "Large file — may take longer".
- After generation, any `skipped_documents` shown as dismissible amber notice above the register.

### Supabase table
`holdpoint_registers` — upserted on `(company_id, project_id)`. Columns: `company_id`, `project_id`, `project_name`, `hold_points` (JSONB array of `HoldPoint`), `generated_at`.

---

## Key files and what they do

### `src/lib/types.ts`
Single source of truth for all TypeScript interfaces. Everything the app passes around is typed here:
- `ProcessedFile` — union type: `text | image | pdf`. PDFs go natively to Claude; images as base64 vision blocks; text as raw string (used for inspection form text, .msg bodies, .docx content).
- `ReviewResult` — the full structured output from Claude. Every field the UI renders is defined here.
- `ScoreBreakdown`, `CategoryScore` — the five scoring dimensions D1–D5.
- `InspectionHeader` — metadata Claude extracts automatically: project name, ITP number, tier, closed_by, etc.
- `CommercialConfidence` — audit readiness judgement, independent of the numeric score.
- `ScoreBand` — `"compliant" | "minor_gaps" | "significant_gaps" | "critical_risk"`.
- `SkippedFile` — structured record of a file excluded from a Procore import (filename, reason, optional size_mb). Returned in `import_summary.skipped_files`.

### `src/lib/prompt.ts`
**The brain of the scoring system.** Three exported functions build the Claude prompt:
- `buildSystemPrompt(scoringContent)` — the full expert-reviewer role, evidence classification rules, scoring dimensions, scoring states, tier definitions, output-length limits, and JSON output format. Takes `scoringContent` string injected from `scoring.ts` so company-specific guidelines override the hardcoded defaults.
- `buildPreamble(fileCount)` — opening context block injected before the documents.
- `buildInstructions(fileCount)` — closing block with the JSON template (prefill). Enforces that `document_observations` has exactly one entry per file, STRICTLY one sentence each (applies to images too — no exceptions).
- `FALLBACK_SCORING_CONTENT` — exported constant; the hardcoded scoring guidelines used when Supabase and local file are both unavailable.

### `src/lib/claude.ts`
Claude API client. Key behaviours:
- Fetches company-specific scoring content via `getCompanyScoringContent()` before building the prompt.
- Filters images exceeding Claude's 5 MB hard limit before building content blocks.
- Builds content blocks: one text label + one document/image/text block per file.
- Calls `client.messages.create` with `system=buildSystemPrompt(scoringContent)`.
- Detects `stop_reason === "max_tokens"` **outside** the API try/catch so it throws cleanly rather than being re-wrapped.
- `extractJson()` — robustly strips markdown fences and extracts the JSON object from Claude's response (three fallback strategies).
- `normalizeEnums()` — maps Claude's occasional capitalisation variants (`"Moderate"`, `"Minor Gaps"`, etc.) to canonical lowercase enum values before validation.
- `validateResult()` — strict field-by-field validation of the parsed JSON. Throws specific error messages if any field is missing or wrong type.
- Always-on diagnostic logging: response length, first/last 500 chars, stop_reason.

### `src/lib/scoring.ts`
Company scoring content fetcher. Priority order:
1. Supabase Storage — `{company_id}/scoring-guidelines.docx` (extracted via mammoth)
2. Local static file — `public/documents/ITP-QA-Scoring-Guidelines-v1.0.docx`
3. Hardcoded fallback — `FALLBACK_SCORING_CONTENT` from `prompt.ts`

Results are cached in memory for 5 minutes per `company_id`. Never throws — always returns some content. Returns `{ content, source, version_id, version_label }` — the version label is stamped into every `ReviewResult` and displayed in the report footer.

### `src/lib/procore.ts`
Procore OAuth + REST API client. Key points:
- Reads `PROCORE_ENV` (`sandbox` or `production`) to select the correct base URLs.
- `buildAuthorizationUrl()` — constructs the OAuth redirect URL.
- `exchangeCodeForTokens()` / `refreshAccessToken()` — both require `application/x-www-form-urlencoded` (not JSON).
- `getInspections()` fetches all pages via `procoreGetAllPages()` — Procore's `/checklist/lists` endpoint is the correct one; `/projects/{id}/inspections` returns 404 on production.
- `getInspectionDetail()` always passes `view=extended` — without it, Procore returns the shell only (no items, responses, or attachments), which caused scores of 18/100 instead of ~80/100.
- `downloadFile()` — detects S3 presigned URLs and omits the `Authorization` header for them (S3 rejects requests with an auth header).
- `ProcoreAttachment` has many optional URL fields — Procore uses different property names across API versions. All are tried in `resolveAttachmentUrl()` inside the import route.

### `src/lib/history.ts`
Review history store. **Writes to Supabase `review_records` table** (not a flat file). Functions: `appendRecord()` — inserts a review record; `findLatestForInspection()` — looks up the most recent record for a given inspection ID. Stores the full `ReviewResult` JSON in the `review_data` column so the dashboard can display the full report without re-running the review.

### `src/lib/audit.ts`
Audit event service. Writes structured events to the Supabase `audit_log` table. `logAuditEvent()` never throws — audit failures are console-only. `resolveAuditUser()` fetches the Procore user identity from the access token cookie. `AUDIT_ACTIONS` constants cover: `review_run`, `review_failed`, `score_override`, `pdf_exported`, `bulk_review_started`, `bulk_review_completed`, `login`, `logout`, `scoring_document_updated`, `project_hidden`, `project_unhidden`, `compliance_report_uploaded`.

### `src/lib/admin.ts`
Admin check utility. `isCompanyAdmin(email, company_id)` queries the Supabase `company_admins` table to determine whether a user has admin privileges for a company. Never throws — returns `false` on any error. Used by admin API routes to gate access.

### `src/lib/validation.ts`
Upload validation constants for the **manual upload** path: `MAX_FILE_SIZE_BYTES` (20 MB), `MAX_BUNDLE_SIZE_BYTES` (50 MB), `MAX_FILE_COUNT` (20), allowed MIME types (PDF/JPEG/PNG). Shared between the API route and the DropZone component. **Note:** the Procore import pipeline has its own separate caps and uses `normaliseMime()` in the import route — it does not use these constants.

### `src/app/page.tsx`
Root page (Holdpoint landing page). Unauthenticated: hero gradient (`#3D2E1E → #6B5A42 → #8C7258`), HoldpointLogo (size 72), tagline, stats strip, "Learn how it works" teaser, "Connect to Procore" CTA. Authenticated: shows `ProcoreConnect`, `ProcoreImport`, divider, `UploadPortal`.

### `src/components/HoldpointLogo.tsx`
SVG logo. `variant="dark"` (white on dark bg) or `"light"` (brown on white). At `size >= 48` in dark variant, renders an inner dashed ring for a richer look. Used in the hero (size 72), nav (size 24), and authenticated upload page (size 32).

### `src/components/GlobalNav.tsx`
Top navigation bar shown on all authenticated pages. Holds the Holdpoint logo/wordmark, nav links (Dashboard, Audit, Admin), and the user connection status.

### `src/components/UploadPortal.tsx`
Manual upload form. Uses `DropZone` for file selection. Posts `multipart/form-data` to `/api/review`. Shows `ReviewResults` on success.

### `src/components/DropZone.tsx`
Drag-and-drop + click-to-select file input. Respects the validation constants.

### `src/components/ProcoreConnect.tsx`
Calls `/api/auth/me` on mount. Shows "Connect to Procore" button (→ `/api/auth/login`) when unauthenticated, or user name + disconnect link when authenticated.

### `src/components/ProcoreImport.tsx`
Multi-step Procore import UI. Steps: company discovery → project select → inspection list → import/loading → result. Only visible when authenticated. Shows review history badges (not reviewed / reviewed with score / changed since review) on each inspection row. After import, shows `EvidenceSummaryBar`, `ReviewResults`, `ImportSummaryPanel` (Appendix A — imported files + skipped files list), and `DiagnosticsPanel` (Appendix B — raw Procore shape, for debugging).

### `src/components/ReviewResults.tsx`
The QA report UI. All 11 major sections are independently collapsible:
- State is held in a single `sections: Record<SectionKey, boolean>` object at the component root — not distributed across sub-components.
- "Collapse All / Expand All" toggle button in the controls bar (compact mode only).
- `SectionShell` wrapper component for sections that aren't `ResultCard`s (QA Status banner, Scores grid, Commercial Confidence).
- `ResultCard` is fully controlled: accepts `open` and `onToggle` props; falls back to internal `useState` only when neither is provided.
- **Print**: `handlePrint()` saves `sections`, sets all to open, sets `printMode=true`, calls `window.print()` via `useEffect` after re-render, restores state in `window.onafterprint`.
- PDF export `@media print` CSS: `html, body { height: auto; overflow: visible }` fixes the "only page 1 prints" issue. `break-inside: auto` on cards lets large sections paginate across pages. `[data-section-content] { display: block !important }` forces all content visible in print as a safety net.
- `getQAStatus()` computes `"strong" | "acceptable" | "high-risk"` from `total_score` + `commercial_confidence.rating`.

### `src/components/InsightCard.tsx`
Per-project insight card rendered in the Insights tab. Displays: completion %, contract value, active trade chips, open ITP stats, AI-generated missing ITP warnings, coming-up list, and stage summary. Has idle / fetching_financial / fetching_summary / done / error states. Exports `ProjectSnapshot` and `DashboardInspection`-adjacent types.

### `src/components/InsightsTab.tsx`
Renders a grid of `InsightCard` components — one per project. Manages per-card `cardState` and `snapshot` state. "Refresh All" button re-generates all cards sequentially. Loads the most recent snapshot from Supabase on mount (via `/api/dashboard/company-stats` or snapshot endpoint).

### `src/app/dashboard/page.tsx`
Full ITP dashboard. Three top-level tabs:
- **ITP Reviews** — project list → ITP inspection list. 8-column grid per row: checkbox, status dot, ITP name+subtitle, sequence #, score, rating pill, status pill, reviewed date + Procore link. Bulk review, score override, side panel, sort by score, status filters.
- **Company** — financial summary and site-level metrics for the selected company (CompanyTab component inline).
- **Insights** — renders `InsightsTab` with per-project AI insight cards.

### `src/app/audit/page.tsx`
Audit log viewer. Reads from Supabase `audit_log` table. Filterable by action type, user, date range. CSV export. Admin-only (requires `isCompanyAdmin`).

### `src/app/admin/users/page.tsx`
Admin user management. Lists and manages entries in the `company_admins` Supabase table.

### `src/app/admin/documents/page.tsx`
Scoring document admin. Uploads `.docx` scoring guidelines to Supabase Storage under `{company_id}/scoring-guidelines.docx`. Triggers a cache invalidation so the next review picks up the new version.

### `src/app/api/review/route.ts`
`POST /api/review`. Validates uploaded files (count, size, type), converts to `ProcessedFile[]`, calls `runBundleReview()`, returns `{ success: true, result }`.

### `src/app/api/procore/import/route.ts`
`POST /api/procore/import`. The Procore review pipeline:
1. Resolve audit user identity.
2. Fetch inspection detail (`view=extended`).
3. Flatten items from `items[]`, `sections[].items[]`, or fallback `list_items` endpoint.
4. Fetch project name/number.
5. Build a text representation of the inspection form (`buildInspectionText()`).
6. Collect all attachment refs from every location Procore uses (`items`, `responses`, `item.response`, `list_item_responses`, `observations`). Deduplicate by URL.
7. Split into three buckets: `pdfRefs`, `imageRefs`, `textRefs` (using `normaliseMime()` + `SUPPORTED` + `SUPPORTED_TEXT`).
8. Download Phase 1 — PDFs first: cap 15 MB/file, 20 MB total.
9. Download Phase 2 — Images: download all under 4 MB, sort by size ascending (smallest = most likely document photos), include only the 10 smallest.
10. Download Phase 3 — Text-convertible: `.msg` via `extractMsgText()`, `.docx` via `extractDocxText()`, `.doc` rejected without download. Counts against 20 MB total budget.
11. Call `runBundleReview()`. On Claude API error: retry once without images.
12. Save to history via `appendRecord()`.
13. Log audit event.
14. Return result + import summary (imported files, skipped files) + diagnostics.

**Supported file types in the import pipeline:**
| Set | Types | How processed |
|-----|-------|---------------|
| `SUPPORTED` | `application/pdf`, `image/jpeg`, `image/png` | Native/vision blocks to Claude |
| `SUPPORTED_TEXT` | `application/vnd.ms-outlook` (.msg), `application/vnd.openxmlformats-officedocument.wordprocessingml.document` (.docx), `application/msword` (.doc) | Converted to plain text; `.doc` rejected without download |

**`normaliseMime(contentType, filename)`** — resolves effective MIME from `content_type` field first, then falls back to file extension. Extension cases: `.pdf`, `.jpg`/`.jpeg`, `.png`, `.msg`, `.docx`, `.doc`.

**Skip reasons** (in `skipped_files` array):
- `"Unsupported type: {mime}"` / `"Unknown file type"` — not in SUPPORTED or SUPPORTED_TEXT
- `"Unsupported document type — .doc format not supported, use .docx"` — `.doc` rejected
- `"PDF too large ({X} MB — limit is 15 MB)"`
- `"Image too large ({X}MB) — download and attach as PDF for best results"`
- `"Image limit reached — only the 10 smallest images are included..."`
- `"Total attachment budget reached"`
- `"Text extraction returned empty content"` — msgreader/mammoth returned empty string
- `"Download failed: {message}"`
- `"Skipped on retry: Claude API rejected the initial request"`

### `src/app/api/dashboard/inspections/route.ts`
`GET /api/dashboard/inspections?project_id=X&company_id=Y`. Fetches all ITP-named inspections from Procore (all statuses), merges with latest `review_records` from Supabase (using service role key) and any `score_overrides`, returns enriched `DashboardInspection[]`. The dashboard uses this endpoint (not `/api/procore/inspections`). Exports the `DashboardInspection` interface — single source of truth for the ITP list data shape.

### `src/app/api/dashboard/projects/route.ts`
`GET /api/dashboard/projects?company_id=X`. Returns Procore projects enriched with aggregate stats from Supabase (reviewed count, avg score, last reviewed date, hidden flag).

### `src/app/api/dashboard/override/route.ts`
`GET /api/dashboard/override?review_record_id=X&company_id=Y` — fetch latest override.
`POST /api/dashboard/override` — create a new override (admin only). Logs audit event.

### `src/app/api/dashboard/export-pdf/route.ts`
`POST /api/dashboard/export-pdf`. Logs a `pdf_exported` audit event.

### `src/app/api/dashboard/company-stats/route.ts`
Fetches financial and site-level aggregate stats for the Company tab and Insights tab. Calls Procore financial APIs for contract sums and subcontract progress.

### `src/app/api/dashboard/site-diaries/route.ts`
Fetches site diary entries from Procore for the selected project/company. Used by the Company tab.

### `src/app/api/dashboard/site-mappings/route.ts`
Maps Procore project IDs to site names/metadata. Used to resolve display names in the Company and Insights tabs.

### `src/app/api/dashboard/project-counts/route.ts`
Returns ITP counts (reviewed, unreviewed, total) per project for the dashboard sidebar stats.

### `src/app/api/dashboard/compliance-reports/route.ts`
Handles compliance report uploads and retrieval for the Company tab.

### `src/app/api/procore/inspections/route.ts`
`GET /api/procore/inspections?project_id=X&company_id=Y`. Used by the **manual import UI** (`ProcoreImport.tsx`), not the dashboard. Filters to `status === "closed"` AND `name.startsWith("itp")` (case-insensitive). Enriches with `review_status` from Supabase.

### `src/app/api/procore/companies/route.ts`
`GET /api/procore/companies`. Returns the user's Procore companies. No company header needed for this endpoint.

### `src/app/api/procore/projects/route.ts`
`GET /api/procore/projects?company_id=X`. Requires `company_id` as both a query param AND the `Procore-Company-Id` header — Procore enforces both.

### `src/app/api/auth/login/route.ts`
`GET /api/auth/login`. Generates a random `state` token, saves it as an `httpOnly` cookie, redirects to Procore OAuth.

### `src/app/api/auth/callback/route.ts`
`GET /api/auth/callback`. Verifies state (CSRF protection), exchanges code for tokens. If `FLEEK_COMPANY_ID` env var is set, verifies the user belongs to that Procore company before allowing login (redirects to `/?error=unauthorized` otherwise). Stores `procore_access_token` / `procore_refresh_token` / `procore_token_expires_at` as `httpOnly` cookies. Logs `login` audit event.

### `src/app/api/auth/me/route.ts`
`GET /api/auth/me`. Checks for an access token cookie, calls `/rest/v1.0/me`. Returns `{ authenticated, user }`.

### `src/app/api/auth/logout/route.ts`
`GET /api/auth/logout`. Deletes the three Procore cookies and redirects to homepage. Logs `logout` audit event.

### `src/app/api/audit/route.ts` and related
Audit log API endpoints. `GET /api/audit` returns paginated audit events from Supabase. `/api/audit/stats`, `/api/audit/users`, `/api/audit/export` for summary stats, user list, and CSV export.

### `src/app/api/admin/check/route.ts`
`GET /api/admin/check`. Returns whether the current user is a company admin. Used by admin pages to gate UI.

### `src/app/api/admin/users/route.ts`
Admin user management CRUD against `company_admins` Supabase table.

### `src/app/api/documents/route.ts` and `src/app/api/documents/upload/route.ts`
Document management for scoring guidelines. Upload routes write to Supabase Storage and log audit events.

### `src/app/api/procore/debug-inspection/route.ts`
Dev/debug route. Returns raw Procore inspection data for diagnosing API shape issues.

---

## Scoring framework (calibrated v1.0)

Claude scores each ITP package across five dimensions. **All scoring logic is defined in `buildSystemPrompt()` in `src/lib/prompt.ts` — this is the authoritative definition.** Company-specific scoring guidelines from `scoring.ts` are injected into the system prompt and take precedence over the hardcoded defaults.

### Tier classification
Claude classifies the ITP into one of three tiers based on the nature of the work (not the ITP number):

| Tier | Work type | Example |
|------|-----------|---------|
| Tier 1 | Structural | Reinforcement, concrete pours, formwork, piling |
| Tier 2 | Waterproofing | Basement, wet area, planter box waterproofing |
| Tier 3 | Standard | Licensed services (3A), envelope (3B), mechanical (3C), finishes (3D) |

### Dimension weights by tier

| Dimension | Tier 1 | Tier 2 | Tier 3 |
|-----------|--------|--------|--------|
| D1 Engineer & inspector verification | 35 pts | 30 pts | 20 pts |
| D2 Technical testing evidence | 25 pts | 30 pts | 10 pts |
| D3 ITP form & subcontractor ITP completeness | 25 pts | 25 pts | 45 pts |
| D4 Material traceability | 10 pts | 5 pts | 15 pts |
| D5 Physical evidence record | 5 pts | 10 pts | 10 pts |

### Scoring states per dimension
- **Full** — 100% of available points
- **Declared No Evidence** — 70% (ITP item marked Yes/Pass but no supporting doc)
- **Partial** — 40–75% (some evidence exists; lean generous when intent is clear)
- **Missing** — 0% (genuinely absent, no evidence of any kind)
- **N/A** — excluded from denominator entirely

### Score calculation
`total_score = round(achieved_points / applicable_points × 100)`

### Score bands
| Score | Band |
|-------|------|
| 85–100 | `compliant` |
| 70–84 | `minor_gaps` |
| 50–69 | `significant_gaps` |
| 0–49 | `critical_risk` |

### Commercial confidence (independent of numeric score)
A separate audit-readiness judgement. `HIGH` = low audit risk (engineer evidence present in any valid format). `MEDIUM` = some key gaps or indirect evidence. `LOW` = engineer evidence missing or major verification gaps. **Does not affect `total_score`.**

### Evidence format rule (critical)
All formats are equivalent when content is clear: signed PDF, unsigned PDF, email, photo of a document, screenshot, extracted .msg body, .docx text. Never penalise based on format.

---

## Environment variables

Defined in `.env.local` (not committed). See `.env.example` for the full list:

```
# Required
ANTHROPIC_API_KEY=...

# Procore
PROCORE_ENV=sandbox                        # "sandbox" or "production"
PROCORE_CLIENT_ID=...
PROCORE_CLIENT_SECRET=...
PROCORE_REDIRECT_URI=http://localhost:3010/api/auth/callback

# Access control — restrict login to one Procore company (leave blank to disable)
FLEEK_COMPANY_ID=598134325535477

# Supabase
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...   # anon/publishable key (browser-safe)
SUPABASE_SERVICE_ROLE_KEY=...              # server-side only — bypasses RLS — use in all API routes
```

---

## Rules that must never be broken

1. **Never change the scoring weights without updating the system prompt AND the `types.ts` interfaces together.** The weights in `buildSystemPrompt()` are calibrated. Any change must be intentional and explicitly agreed before implementation.

2. **Always use `view=extended` when calling `/rest/v1.0/checklist/lists/{id}`.** Without it, Procore returns only the shell — no items, responses, or attachments. This was confirmed in production: omitting it caused scores of 18/100.

3. **Procore `company_id` must appear as both a query parameter AND the `Procore-Company-Id` header** on project and inspection endpoints. Omitting the query param produces a 400 error even when the header is set.

4. **Never send the `Authorization` header to S3 presigned URLs.** S3 returns 400 if an auth header is present. The check in `downloadFile()` (`url.includes("procore.com") && !url.includes("s3.")`) is intentional.

5. **`MAX_TOKENS` in `claude.ts` must be at least 16000.** The `document_observations` array grows with file count and was truncating at 4096. Do not reduce it without testing multi-file bundles.

6. **The JSON output template in `buildInstructions()` must always end with `}`** and nothing after it. Claude prefills from this template. Any trailing text after `}` will appear in the response and break JSON parsing.

7. **Output length limits in the system prompt are mandatory.** `executive_summary` 3–5 sentences, `missing_evidence` max 6 items, `key_issues` max 5 items, etc. Exceeding them causes response truncation and breaks the app. Do not remove or loosen these limits.

8. **Never apply `Missing` scoring when any partial evidence exists.** Use `Partial` instead. This is a core calibration principle — `Missing` is 0 points and should only apply when there is literally nothing in the bundle.

9. **N/A dimensions are excluded from the denominator.** A package with many N/A dimensions should not be penalised. A high N/A count is correct for small-scope ITPs.

10. **`commercial_confidence` is completely independent of `total_score`.** Do not let one influence the other in the prompt or in UI logic. `getQAStatus()` in `ReviewResults.tsx` combines them deliberately.

11. **Review history is stored in Supabase, not a flat file.** `appendRecord()` inserts to the `review_records` table. There is no `data/review-history.json` — that approach was replaced. Do not reintroduce filesystem persistence.

12. **Procore inspections for the manual import UI are filtered to `status === "closed"` AND `name.startsWith("itp")`.** The dashboard endpoint (`/api/dashboard/inspections`) shows all statuses and uses a different filter. Do not confuse the two routes.

13. **PDFs are passed natively to Claude** (not parsed to text). This is intentional — native PDF mode lets Claude see embedded photos, signatures, stamps, and scanned pages. `pdf-parse` (still in dependencies) is no longer used for this purpose.

14. **Images from Procore: max 10 per review, smallest-first, under 4 MB each.** The import route downloads all images under 4 MB, sorts them by actual file size ascending (smallest = most likely document photos like test certificates, signed reports), then includes only the 10 smallest. Images over 4 MB are skipped with "Image too large (Xmb) — download and attach as PDF for best results". Images beyond the 10-image cap are skipped with "Image limit reached — only the 10 smallest images are included to prioritise document photos over site photos". PDFs are always processed first before images. `SUPPORTED` includes `image/jpeg` and `image/png`.

15. **`.msg` and `.docx` are converted to plain text, not sent as binary.** `.msg` files are parsed with `msgreader` — subject, sender name/email, and body are concatenated into a single text string. `.docx` files are parsed with `mammoth.extractRawText()`. Both are passed to Claude as `ProcessedFile { kind: "text" }`. They count against the 20 MB total bundle budget but NOT against the 10-image cap. `.doc` (legacy Word binary) is rejected without downloading — users must re-save as `.docx`.

16. **The `sections` state in `ReviewResults` is the single source of truth for collapse state.** Do not add internal `useState` to `ResultCard` or `SectionShell` when the parent is passing `open` + `onToggle` props. The print handler saves and restores this state — any parallel state in children will break print.

17. **`logAuditEvent()` must never throw.** Wrap all audit writes in try/catch internally. The audit service is fire-and-forget — use `void logAuditEvent(...)` at call sites.

18. **`scoring.ts` must never throw.** It always returns some content (Supabase → local file → hardcoded). Do not add logic that throws from this function — a failed scoring load must fall back silently, not break the review.

19. **All server-side API routes must use `SUPABASE_SERVICE_ROLE_KEY` when querying Supabase.** All tables have RLS enabled. The anon/publishable key will be silently blocked from reading most tables. Using the anon key in a server route is a bug — it will return empty results with no error. See the Supabase section above.

20. **HP CSS custom properties (`--hp-*`) must be applied via inline `style={{}}`, not Tailwind arbitrary values.** Tailwind JIT does not reliably resolve CSS custom properties in arbitrary value syntax (`bg-[var(--hp-bg)]`). Always use `style={{ backgroundColor: "var(--hp-bg)" }}` etc.
