# Procore API Reference (offline copy for Claude Code)

Snapshot of https://developers.procore.com taken 2026-09-16.
Guides come from Procore's open-source docs repo (github.com/procore/documentation, last commit 7 Sep 2026).
Endpoint reference comes from the same OpenAPI JSON that powers developers.procore.com/reference/rest.

## How to use this folder (read this first, Claude)

1. Before writing any Procore API call, find the endpoint in `endpoints/` and copy the exact path, params and body field names from there. Do not guess field names or paths from memory.
2. `endpoints/000-ENDPOINTS-INDEX.md` lists one file per Procore tool. Open the right tool file and search for the resource (e.g. "## Checklists (Inspections)") or the path (e.g. "checklist/lists").
3. If the condensed entry is not enough (deep nested schema, exact enum), read the raw spec: `openapi-raw/<resource-id>.json`. The resource id is printed under each resource heading.
4. For how the API works (auth, headers, pagination, filtering, errors, rate limits, uploads, webhooks) read the guide in `guides/`. Index: `guides/000-GUIDES-INDEX.md`. The cheat sheet below covers the most common mistakes.
5. Anything marked **DEPRECATED** in the endpoint files: do not use. Anything marked **BETA**: works but may change.

## Cheat sheet: the things that keep going wrong

Base URL: `https://api.procore.com` (production, login at `https://login.procore.com`). Development sandbox: `https://sandbox.procore.com` (login `https://login-sandbox.procore.com`). Monthly sandbox: `https://api-sandbox-monthly.procore.com` (login `https://login-sandbox-monthly.procore.com`). Check `guides/006-development-environments.md` before hardcoding.

Headers on every call:
- `Authorization: Bearer <access_token>`
- `Procore-Company-Id: <company_id>` (required on nearly all v1.0/v1.1 endpoints; v2.0 puts company_id in the path instead)
- `Content-Type: application/json` on POST/PATCH/PUT

Versions live in the path: `/rest/v1.0/...`, `/rest/v1.1/...`, `/rest/v2.0/...`. Each resource lists which versions exist. Prefer the highest non-deprecated one. v1.x and v2.0 differ:
- v1.x: company via `Procore-Company-Id` header, project via `project_id` query param or path, IDs are integers, list responses are a bare JSON array.
- v2.0: `/rest/v2.0/companies/{company_id}/projects/{project_id}/...`, responses wrapped in `{"data": ...}`, IDs are **strings**, default page size 10, max 100.

Pagination (v1.x): `page` (1-based) and `per_page` (keep at or below 2000, many endpoints cap lower). Read `Total`, `Per-Page` and `Link` response headers; stop when `Link` has no `rel="next"`. Not every endpoint paginates; check the endpoint entry. Details: `guides/067-pagination.md`.

Filtering on list endpoints: `filters[<name>]=<value>`, sorting `sort=<field>` or `sort=-<field>`. Only the filters listed in the endpoint entry exist. Details: `guides/068-filtering-on-list-actions.md`.

Tokens: access tokens last 90 minutes. Refresh tokens are single-use; if a refresh call fails mid-flight the old refresh token is dead and the user must re-auth. Store the new pair atomically. Details: `guides/062-oauth-auth-grant-flow.md`, `guides/063-oauth-client-credentials.md`, `guides/064-oauth-endpoints.md`. Client credentials (service account / DMSA) vs auth code grant: `guides/014-oauth-choose-grant-type.md`.

Rate limits: hourly window plus a 10-second spike window. Read `X-Rate-Limit-Remaining` and `X-Rate-Limit-Reset` on every response; on 429 honour `Retry-After`. Failed calls (4xx) still count. Details: `guides/015-rate-limiting.md`.

Errors: 401 = token problem, 403 = permissions / app not installed / tool disabled in project, 404 = wrong id or no access, 422 = validation (read the body), 429 = rate limit. Full table: `guides/073-error-reference.md`.

Dates: ISO 8601 with timezone, e.g. `2019-08-18T23:36:30Z`; date-only fields are `YYYY-MM-DD`. Details: `guides/071-date-time.md`.

File uploads: two-step (create upload, then reference `upload_ids`/`upload_uuid` on the record) or multipart on some endpoints. Details: `guides/048-tutorial-uploads.md`, `guides/049-tutorial-unified-file-uploads.md`, `guides/047-attachments.md`.

Webhooks: `guides/016-webhooks.md`, `guides/021-webhooks-api.md`, endpoints in `endpoints/platform-developer-tools--webhooks.md`.

Inspections / ITPs (the tool this project cares about): Procore calls them Checklists. Create from a template with `POST /rest/v1.1/projects/{project_id}/checklist/lists` (`list_template_id` + `list{...}`). Items, sections, item responses, attachments and signature requests are separate resources. All in `endpoints/project-management--inspections.md`.

## Layout

```
README.md                      this file
guides/                        134 guide pages as markdown, numbered in site-nav order
  000-GUIDES-INDEX.md
endpoints/                     58 files, one per Procore tool, 3,216 endpoint operations (2,181 unique paths) condensed
  000-ENDPOINTS-INDEX.md
openapi-raw/                   624 raw OpenAPI 3.0 JSON specs, one per resource (all versions merged, 53 MB - consider .gitignore)
```

## Refreshing this snapshot

Guides: `git clone https://github.com/procore/documentation` and rerun the converter.
Endpoints: `GET https://developers.procore.com/api/v1/resource_groups` lists every resource with a `links` entry; each `?version=latest&aggregate_from_versions[]=...` link returns that resource's OpenAPI JSON. No auth needed.
