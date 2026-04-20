# CLAUDE.md — ITP QA Reviewer

## Auto-save at end of every session (MANDATORY)

At the end of every session — without being asked — run:

```bash
bash save.sh "Brief description of what changed"
```

This commits all changes and pushes to GitHub (`jordan91lloyd-web/itp-reviewer`). Always do this as the final step, even if the task felt small. If there is nothing to commit, the script exits cleanly with no harm done.

---

## What this app does

This is a **Next.js web app** for Fleek Constructions that reviews Inspection and Test Plan (ITP) packages using Claude AI. Construction QA managers upload a bundle of documents (PDFs, photos) from one inspection package, and the app returns a structured quality assessment: a numeric score (0–100), a score band, an audit readiness rating ("commercial confidence"), evidence gaps, key issues, and recommended next actions.

There are two input paths:
1. **Manual upload** — drag-and-drop or file-picker. Any mix of PDF/JPG/PNG files.
2. **Procore import** — OAuth-authenticated connection to Procore. The user picks a company → project → closed ITP inspection. The app fetches the inspection data, downloads all attached PDFs, converts the inspection form to a structured text file, and runs the same review engine.

Documents are never stored on the server. Everything is sent to Claude and returned to the browser. Review metadata (score, band, Procore inspection ID) is saved to a local JSON file (`data/review-history.json`) to support the "reviewed / changed" status badges in the Procore import UI.

---

## Tech stack

- **Next.js 15** (App Router, TypeScript)
- **React 19**
- **Tailwind CSS 3** for all styling
- **Anthropic SDK** (`@anthropic-ai/sdk`) — model is `claude-sonnet-4-6`, `max_tokens: 16000`
- **Procore REST API** (OAuth 2.0, `application/x-www-form-urlencoded` token exchange)
- No database — review history is a flat JSON file on disk

Dev server runs on port **3010** (`npm run dev`).

---

## Key files and what they do

### `src/lib/types.ts`
Single source of truth for all TypeScript interfaces. Everything the app passes around is typed here:
- `ProcessedFile` — union type: `text | image | pdf`. PDFs go natively to Claude; images as base64 vision blocks; text as raw string.
- `ReviewResult` — the full structured output from Claude. Every field the UI renders is defined here.
- `ScoreBreakdown`, `CategoryScore` — the five scoring dimensions D1–D5.
- `InspectionHeader` — metadata Claude extracts automatically: project name, ITP number, tier, closed_by, etc.
- `CommercialConfidence` — audit readiness judgement, independent of the numeric score.
- `ScoreBand` — `"compliant" | "minor_gaps" | "significant_gaps" | "critical_risk"`.

### `src/lib/prompt.ts`
**The brain of the scoring system.** Three exported functions build the Claude prompt:
- `buildSystemPrompt()` — the full expert-reviewer role, evidence classification rules, scoring dimensions, scoring states, tier definitions, output-length limits, and JSON output format. This is where all QA scoring logic lives.
- `buildPreamble(fileCount)` — opening context block injected before the documents.
- `buildInstructions(fileCount)` — closing block with the JSON template (prefill). Enforces that `document_observations` has exactly one entry per file.

### `src/lib/claude.ts`
Claude API client. Key behaviours:
- Filters images exceeding Claude's 5 MB hard limit before building content blocks.
- Builds content blocks: one text label + one document/image block per file.
- Calls `client.messages.create` with `system=buildSystemPrompt()`.
- Detects `stop_reason === "max_tokens"` and throws a user-friendly error (don't silently return truncated JSON).
- `extractJson()` — robustly strips markdown fences and extracts the JSON object from Claude's response (three fallback strategies).
- `normalizeEnums()` — maps Claude's occasional capitalisation variants (`"Moderate"`, `"Minor Gaps"`, etc.) to canonical lowercase enum values before validation.
- `validateResult()` — strict field-by-field validation of the parsed JSON. Throws specific error messages if any field is missing or wrong type.

### `src/lib/procore.ts`
Procore OAuth + REST API client. Key points:
- Reads `PROCORE_ENV` (`sandbox` or `production`) to select the correct base URLs.
- `buildAuthorizationUrl()` — constructs the OAuth redirect URL.
- `exchangeCodeForTokens()` / `refreshAccessToken()` — both require `application/x-www-form-urlencoded` (not JSON).
- `getInspections()` fetches all pages via `procoreGetAllPages()` — Procore's `/checklist/lists` endpoint is the correct one; `/projects/{id}/inspections` returns 404 on production.
- `getInspectionDetail()` always passes `view=extended` — without it, Procore returns the shell only (no items, responses, or attachments), which caused scores of 18/100 instead of ~80/100.
- `downloadFile()` — detects S3 presigned URLs and omits the `Authorization` header for them (S3 rejects requests with an auth header).
- `ProcoreAttachment` has many optional URL fields — Procore uses different property names across API versions. All are tried in `resolveAttachmentUrl()`.

### `src/lib/validation.ts`
Upload validation constants: `MAX_FILE_SIZE_BYTES` (20 MB), `MAX_BUNDLE_SIZE_BYTES` (50 MB), `MAX_FILE_COUNT` (20), allowed MIME types (PDF/JPEG/PNG). Shared between the API route and the DropZone component.

### `src/lib/history.ts`
Local review history store. Reads/writes `data/review-history.json`. Functions: `loadHistory()`, `appendRecord()`, `findLatestForInspection()`. The file is flat JSON; no database. Designed so it can be swapped for a real DB without changing callers.

### `src/app/page.tsx`
Root page. Renders: `ProcoreConnect` (auth status bar), `ProcoreImport` (Procore import flow), a divider, and `UploadPortal` (manual upload). Max width 2xl, centred.

### `src/components/UploadPortal.tsx`
Manual upload form. Uses `DropZone` for file selection. Posts `multipart/form-data` to `/api/review`. Shows `ReviewResults` on success.

### `src/components/DropZone.tsx`
Drag-and-drop + click-to-select file input. Respects the validation constants.

### `src/components/ProcoreConnect.tsx`
Calls `/api/auth/me` on mount. Shows "Connect to Procore" button (→ `/api/auth/login`) when unauthenticated, or user name + disconnect link when authenticated.

### `src/components/ProcoreImport.tsx`
Multi-step Procore import UI. Steps: company discovery → project select → inspection list → import/loading → result. Only visible when authenticated. Shows review history badges (not reviewed / reviewed with score / changed since review) on each inspection row. After import, shows `EvidenceSummaryBar`, `ReviewResults`, `ImportSummaryPanel` (Appendix A), and `DiagnosticsPanel` (Appendix B — raw Procore shape, for debugging).

### `src/components/ReviewResults.tsx`
The QA report UI. Two view modes: compact (collapsible sections) and full (all expanded). PDF export uses the full layout regardless of current mode (`window.print()` triggered after a React re-render with `printMode=true`). Key sections: Inspection Header, QA Status banner, Score ring (SVG gauge), Package assessment, Confidence, Commercial Confidence card, Summary, Score Breakdown (with CategoryBar progress bars), Missing Evidence table, Key Issues, Next Actions, Document Observations. `getQAStatus()` computes `"strong" | "acceptable" | "high-risk"` from `total_score` + `commercial_confidence.rating`.

### `src/app/api/review/route.ts`
`POST /api/review`. Validates uploaded files (count, size, type), converts to `ProcessedFile[]`, calls `runBundleReview()`, returns `{ success: true, result }`.

### `src/app/api/procore/import/route.ts`
`POST /api/procore/import`. The Procore review pipeline:
1. Fetch inspection detail (`view=extended`).
2. Flatten items from `items[]`, `sections[].items[]`, or fallback `list_items` endpoint.
3. Fetch project name/number.
4. Build a text representation of the inspection form (`buildInspectionText()`).
5. Collect all attachment refs from every location Procore uses (`items`, `responses`, `item.response`, `list_item_responses`, `observations`). Deduplicate by URL.
6. Sort PDFs first (prioritised over images for budget).
7. Download each supported file. Caps: 5 MB per image, 15 MB per PDF, 20 MB total.
8. Pass assembled bundle to `runBundleReview()`.
9. Save to history via `appendRecord()`.
10. Return result + import summary + diagnostics.

PDFs and images (JPEG/PNG) are in `SUPPORTED`. Images under 4 MB are included — they can contain document photos (test certs, signed reports). Images over 4 MB are skipped with "Image too large (Xmb)". PDFs are prioritised first in the bundle budget. Skipped files are returned as a structured `SkippedFile[]` with filename, reason, and optional size_mb.

### `src/app/api/procore/inspections/route.ts`
`GET /api/procore/inspections?project_id=X&company_id=Y`. Fetches all inspections, filters to `status === "closed"` AND `name.startsWith("itp")` (case-insensitive). Sorts by ITP number extracted from the name. Enriches each with `review_status` from local history.

### `src/app/api/procore/companies/route.ts`
`GET /api/procore/companies`. Returns the user's Procore companies. No company header needed for this endpoint.

### `src/app/api/procore/projects/route.ts`
`GET /api/procore/projects?company_id=X`. Requires `company_id` as both a query param AND the `Procore-Company-Id` header — Procore enforces both.

### `src/app/api/auth/login/route.ts`
`GET /api/auth/login`. Generates a random `state` token, saves it as an `httpOnly` cookie, redirects to Procore OAuth.

### `src/app/api/auth/callback/route.ts`
`GET /api/auth/callback`. Verifies state (CSRF protection), exchanges code for tokens, stores `procore_access_token` / `procore_refresh_token` / `procore_token_expires_at` as `httpOnly` cookies.

### `src/app/api/auth/me/route.ts`
`GET /api/auth/me`. Checks for an access token cookie, calls `/rest/v1.0/me`. Returns `{ authenticated, user }`.

### `src/app/api/auth/logout/route.ts`
`GET /api/auth/logout`. Deletes the three Procore cookies and redirects to homepage.

### `src/app/api/procore/debug-inspection/route.ts`
Dev/debug route. Returns raw Procore inspection data for diagnosing API shape issues.

---

## Scoring framework (calibrated v1.0)

Claude scores each ITP package across five dimensions. **All scoring logic is defined in `buildSystemPrompt()` in `src/lib/prompt.ts` — this is the authoritative definition.**

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
All formats are equivalent when content is clear: signed PDF, unsigned PDF, email, photo of a document, screenshot. Never penalise based on format.

---

## Environment variables

Defined in `.env.local` (not committed). See `.env.example`:

```
ANTHROPIC_API_KEY=...          # Required — Anthropic API key
PROCORE_ENV=sandbox            # "sandbox" or "production"
PROCORE_CLIENT_ID=...          # From developers.procore.com
PROCORE_CLIENT_SECRET=...      # From developers.procore.com
PROCORE_REDIRECT_URI=http://localhost:3010/api/auth/callback
```

---

## Rules that must never be broken

1. **Never change the scoring weights without updating the system prompt AND the `types.ts` interfaces together.** The weights in `buildSystemPrompt()` are calibrated. Any change must be intentional and agreed with Fleek.

2. **Always use `view=extended` when calling `/rest/v1.0/checklist/lists/{id}`.** Without it, Procore returns only the shell — no items, responses, or attachments. This was confirmed in production: omitting it caused scores of 18/100.

3. **Procore `company_id` must appear as both a query parameter AND the `Procore-Company-Id` header** on project and inspection endpoints. Omitting the query param produces a 400 error even when the header is set.

4. **Never send the `Authorization` header to S3 presigned URLs.** S3 returns 400 if an auth header is present. The check in `downloadFile()` (`url.includes("procore.com") && !url.includes("s3.")`) is intentional.

5. **`MAX_TOKENS` in `claude.ts` must be at least 16000.** The `document_observations` array grows with file count and was truncating at 4096. Do not reduce it without testing multi-file bundles.

6. **The JSON output template in `buildInstructions()` must always end with `}`** and nothing after it. Claude prefills from this template. Any trailing text after `}` will appear in the response and break JSON parsing.

7. **Output length limits in the system prompt are mandatory.** `executive_summary` 3–5 sentences, `missing_evidence` max 6 items, `key_issues` max 5 items, etc. Exceeding them causes response truncation and breaks the app. Do not remove or loosen these limits.

8. **Never apply `Missing` scoring when any partial evidence exists.** Use `Partial` instead. This is a core calibration principle — `Missing` is 0 points and should only apply when there is literally nothing in the bundle.

9. **N/A dimensions are excluded from the denominator.** A package with many N/A dimensions should not be penalised. A high N/A count is correct for small-scope ITPs.

10. **`commercial_confidence` is completely independent of `total_score`.** Do not let one influence the other in the prompt or in UI logic. `getQAStatus()` in `ReviewResults.tsx` combines them deliberately.

11. **Review history is append-only.** `appendRecord()` never overwrites existing records. The `review_status` computation in the inspections route compares `inspection.updated_at` vs `record.reviewed_at` timestamps to detect changes.

12. **Procore inspections are filtered to `status === "closed"` AND `name.startsWith("itp")`.** Both conditions are required. Do not relax the status filter without understanding that open/in-progress inspections have incomplete evidence by definition.

13. **PDFs are passed natively to Claude** (not parsed to text). This is intentional — native PDF mode lets Claude see embedded photos, signatures, stamps, and scanned pages. `pdf-parse` (still in dependencies) is no longer used for this purpose.

14. **Images from Procore are included if under 4 MB** in the import route. The 4 MB cap filters out large site photos while keeping document photos (test certificates, signed reports, compliance certs) which can satisfy scoring dimensions. Images over 4 MB are skipped with reason "Image too large (Xmb)". PDFs are always prioritised first in the bundle budget. The `SUPPORTED` set includes `image/jpeg` and `image/png`.
