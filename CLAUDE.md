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

| Tab | Component | Purpose |
|-----|-----------|---------|
| **Company** | Inline in `dashboard/page.tsx` | Financial summary, subcontract progress, site-level stats |
| **Insights** | `InsightsTab.tsx` | Per-project AI insight cards |
| **Digest** | `ProjectDigestTab.tsx` | AI weekly project digest: risks, missing ITPs, contract intelligence, recommended actions |
| **ITP Reviews** | Inline in `dashboard/page.tsx` | Project → ITP list with scores, status filters, bulk review, side panel |
| **Hold Points** | `HoldPointTab.tsx` | Extract hold point register from Procore drawings/documents via Claude |
| **Resourcing** | `ResourcingTab.tsx` | Programme-aligned subcontractor matrix |
| **Report** | `ReportTab.tsx` | Cross-project ITP Status Report with PDF exports |
| **Queue** | `QueuePanel.tsx` | Background bulk-review job monitor |
| **Photo Classifier** | `PhotoClassifierTab.tsx` | AI photo classification |
| **Action Plans** | `action-plans/page.tsx` | Report → Action Plan converter with Procore upload |

### Other features
- **Procore OAuth** — login, callback, token refresh, logout, CSRF-protected state cookie
- **Manual upload** — drag-and-drop PDF/JPG/PNG on `/`, runs Claude review
- **Procore import** — full pipeline: fetch inspection → flatten items → download attachments → review → save
- **Bulk review** — select ITPs, sequential fetch with per-row progress
- **Score overrides** — admins set manual override score + note
- **Audit log** (`/audit`) — filterable viewer, CSV export
- **Admin pages** (`/admin/users`, `/admin/documents`)
- **Access control** — `FLEEK_COMPANY_ID` gates login to one Procore company
- **Holdpoint rebrand** — HP CSS custom properties (`--hp-*`) in `globals.css`, applied via inline `style={{}}`
- **Vercel deployment** — live at https://itp-reviewer.vercel.app

---

## Tech stack

- **Next.js 15** (App Router, TypeScript), **React 19**
- **Tailwind CSS 3** + **HP CSS custom properties** (`--hp-*`) via inline `style={{}}`
- **Anthropic SDK** — model `claude-sonnet-4-6`, `max_tokens: 16000`
- **Procore REST API** (OAuth 2.0, `application/x-www-form-urlencoded` token exchange)
- **Supabase** — database + Storage (service role key for all server routes, see rules)
- **mammoth** — `.docx` text extraction
- **xlsx** — `.xlsx` parsing for action plan converter
- **msgreader** — `.msg` email extraction (import pipeline only)
- **lucide-react** — icons, **jszip** — bulk PDF zip, **@react-pdf/renderer** — PDF generation

Dev server: port **3010** (`npm run dev`).

---

## Supabase — critical rules

All tables have RLS enabled. **Every server-side route must use `SUPABASE_SERVICE_ROLE_KEY`**, not the anon key. The anon key silently returns empty results with no error.

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
- **Node.js runtime required** everywhere — mammoth, msgreader, xlsx use Node APIs. Never set `runtime = "edge"`.
- **`maxDuration`** — import route = 60, report route = 300. Set per-route as needed.
- **No filesystem writes** — all persistence via Supabase.

---

## Breadcrumb / Site Compliance

Breadcrumb is a site access/induction platform. API spec at `docs/breadcrumb-api.json`.

**Critical date rules:**
- Week = Mon–Fri. Anchor = Monday of Sydney-local week.
- All date arithmetic uses `toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" })` → `T00:00:00Z` parse → UTC accessors. Never use `T00:00:00` (local parse) — it drifts by one day in UTC+10.
- Day-bucketing: always use `toSydneyDate()`, never `.substring(0, 10)` on a timestamp.

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

Procore Documents API uses flat endpoints with `project_id` as query param. Do NOT use `procoreGetAllPages` — use `fetchAllFolders`/`fetchAllDocuments` with `toArray()`.

---

## ITP Status Report

`src/components/ReportTab.tsx`, route `GET /api/dashboard/report?company_id=X`.

- Per-project inspection counts via serial batches of 2 with 600ms pause (do NOT raise — trips 429).
- 429 retry: up to 3 retries with exponential backoff.
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
- `src/lib/types.ts` — all TypeScript interfaces

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
- `GET /api/dashboard/inspections` — all-status ITPs with review records
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
10. **`acceptance_criteria` holds the consultant's own words or null.** Never invent acceptance criteria.
11. **Never set assignees, due dates, hold points, priorities, verification methods, or item status.**
12. **Each top-level report item → its own Procore SECTION.** Never write outline numbers into a title.
13. **Sections and items POST to flat paths** with parent id in the body. Nested paths 404.
14. **`plan_section_id` is mandatory** on every plan item.
15. **Plan types are company-scoped**, not project-scoped.
16. **Never treat a 2xx as proof an attachment landed.** Verify by re-reading assets array.

### Procore API
17. **`company_id` as both query param AND `Procore-Company-Id` header** on all project/inspection endpoints.
18. **Never send `Authorization` header to S3 presigned URLs.** S3 returns 400.

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
31. **Confirm Procore endpoints against developers.procore.com at build time.** Never recall endpoint shapes from memory.
32. **Windows environment.** No unix-only commands. Dev server runs on port 3010 — start it with `npm run dev` if it's not running, and use `curl localhost:3010` to test API routes. Avoid restarting it unnecessarily if it's already up. Use `MSYS_NO_PATHCONV=1 npx tsx scripts/screenshot.ts /path` to take UI screenshots, then read them with the Read tool. Prefix `MSYS_NO_PATHCONV=1` on any command with a leading `/` argument in Git Bash.

### MCP tools
33. **MCP tools never throw.** Catch and return `{ isError: true }` with a readable message.
34. **Only `create_inspections` writes.** Every other MCP tool is read-only. New write tools need a cap, read-back verification, and user confirmation.
35. **Cap every list result.** Default 50, hard max 200. Inspection detail caps items at 300.
36. **Never return attachment or photo URLs from MCP tools.** Counts only. URLs are presigned and short-lived.

---

## MCP Server

`/api/mcp` is a remote MCP server exposing Procore tools to Claude. Built on `mcp-handler` v2.

### Auth paths
1. **Static bearer token** — `MCP_BEARER_TOKEN` env var. Used by Claude Code and curl.
2. **OAuth-issued bearer token** — SHA-256 hash lookup in `mcp_oauth_tokens` table. Used by Claude.ai/Desktop.
3. **No valid token** → 401 with RFC 9728 metadata pointer.

### OAuth endpoints
| Route | Method | Purpose |
|-------|--------|---------|
| `/.well-known/oauth-protected-resource[/api/mcp]` | GET | RFC 9728 Protected Resource Metadata |
| `/.well-known/oauth-authorization-server` | GET | RFC 8414 Authorization Server Metadata |
| `/oauth/authorize` | GET/POST | Authorization + approve (303 redirect, not 307) |
| `/oauth/token` | POST | Token exchange / refresh |

OAuth gotchas documented in `docs/MCP-OAUTH-GOTCHAS.md`.

### Tools (registered in `src/lib/mcp-tools.ts`)

| Tool | Purpose |
|------|---------|
| `ping` | Health check + auth path info |
| `list_projects` | Active projects with ids |
| `list_inspections` | Inspection summaries (no items/attachments) |
| `get_inspection_detail` | Sections, items, answers. Attachment/photo **counts only** |
| `list_templates` | Project-level inspection templates |
| `list_locations` | Location tree, flat with path and depth |
| `create_inspections` | **WRITES.** One per location, capped at 25, read-back verified |

### Env vars (MCP-specific)
```
MCP_BEARER_TOKEN, MCP_SERVER_URL, MCP_OAUTH_CLIENT_ID, MCP_PROCORE_USER_ID
```

### Identity resolution
OAuth path → `procore_user_id` from token row. Static bearer → `MCP_PROCORE_USER_ID`. Handler built per-request (not module scope) because of this.

---

## Reference docs — read these when the topic comes up

| Doc | Read when... |
|-----|-------------|
| `docs/PROCORE-ACTION-PLANS-API.md` | Creating, editing, or debugging action plans in Procore |
| `docs/PROCORE-BULK-ITP-API.md` | Bulk ITP creation, tracker linking, test records, assigning contractors/parties |
| `docs/BONDI-RUN-NOTES.md` | Working on Bondi Rd project (598134326053879) — past run history, template IDs, apartment groupings |
| `docs/PROCORE-EDITOR-AUTOMATION.md` | Editing Procore checklist templates, adding/removing/renaming items, quick add, driving the Procore UI |
| `docs/MCP-OAUTH-GOTCHAS.md` | Debugging MCP auth, OAuth flow, token issues, connector problems |
| `docs/BULK-ITP-BUILDER-DESIGN.md` | Planning a new bulk ITP run on any project — six design principles |
