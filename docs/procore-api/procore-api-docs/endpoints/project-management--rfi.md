# Procore API: RFI (Project Management)

Source: https://developers.procore.com/reference/rest/ (tool category: RFI)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Advanced Exports](#advanced-exports) - versions 1.0
- [External RFI](#external-rfi) - versions 2.0
- [External RFIs Filter Options](#external-rfis-filter-options) - versions 2.0
- [Filter Options](#filter-options) - versions 1.0
- [Potential Assignees](#potential-assignees) - versions 1.0
- [Potential RFI Managers](#potential-rfi-managers) - versions 1.0
- [RFIs](#rfis) - versions 1.1, 1.0
- [RFIs Default Distribution](#rfis-default-distribution) - versions 1.0
- [Replies](#replies) - versions 1.0

## Advanced Exports

Resource id: `advanced-exports`. Raw spec: `../openapi-raw/advanced-exports.json`. Web: https://developers.procore.com/reference/rest/advanced-exports?version=latest
Product lines: PM Starter Pack, PM Essentials

### GET /rest/v1.0/projects/{project_id}/rfis/{id}/advanced_exports

**Get Export Options for Existing RFI**
Get the available export options for an existing RFI.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - RFI ID

Response 200 (application/json): array of object

- `slug`: string - Machine-readable key identifying the export option group, e.g. `cover_sheet` or `files`. Pass sub-options from this group in the `options` request body when creating an export. e.g. `cover_sheet`
- `name`: string - Human-readable label for the export option group, suitable for display in an export UI. e.g. `Responses`
- `type`: string enum[single_select, multi_select] - Selection mode for this option group. `single_select` allows exactly one option to be chosen; `multi_select` allows multiple.
- `options`: array of object
  - `id`: oneOf(string | integer) - The value to pass in the request body for this option. For the `cover_sheet` group, pass this as `options.cover_sheet`; for the `files` group, pass this integer ID in the `options.files` array. e.g. `official_responses_only`
  - `name`: string - Human-readable display label for this export option. e.g. `Official Responses Only`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/rfis/{id}/advanced_exports

**Create Advanced Export for Existing RFI**
Request an advanced export for an existing RFI. Specify which kind of cover sheet you'd like, if one at all, and which associated attachments with the RFI you'd like included in the export. Specify whether you'd like the export to be in PDF or ZIP format at the tail end of the URL request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - RFI ID
- `format` [query] string enum[pdf, zip] (required) - Output format for the generated export. Pass as a query string parameter when posting to this endpoint.

Request body (application/json) (required):

- `options`: object (required)
  - `cover_sheet`: string enum[all_responses, official_responses_only] - Which version of the response cover sheet to include in the export. Omit to include no cover sheet. e.g. `all_responses`
  - `files`: array of integer - Array of attachment IDs to include in the export. IDs correspond to the `id` values in the GET response's `options` array for prostore file option sets. Pass an empty array to include no attachments. e.g. `[3453247, 6543893, 3476145]`

Response 200 (application/json): object

- `message`: string - Confirmation message. The export is processed asynchronously; the compiled file is delivered by email when ready. e.g. `Success! You'll receive an email with the file when we're done.`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## External RFI

Resource id: `external-rfi`. Raw spec: `../openapi-raw/external-rfi.json`. Web: https://developers.procore.com/reference/rest/external-rfi?version=latest
Product lines: PM Essentials, PM Starter Pack

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_rfis/{id}  **[BETA]**

**Show External RFI**
Returns the specified External RFI

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Unique identifier of the External RFI

Response 200 (application/json): object

- `data`: object - External RFI
  - `id`: string - Unique string identifier for this external RFI. e.g. `999`
  - `position`: string - Sequential position number of this external RFI within the project. e.g. `1`
  - `full_position`: string - Position number prefixed with the project identifier (e.g. `PRE-1`). e.g. `PRE-1`
  - `subject`: string - Subject line of the external RFI. e.g. `Specifications [99 14.44B]`
  - `revision`: string - Revision counter. Increments each time a new revision of this RFI is created. e.g. `5`
  - `current_revision`: boolean - When `true`, this record represents the most recent revision of the RFI. e.g. `true`
  - `has_revisions`: boolean - When `true`, this RFI has one or more prior revisions. e.g. `true`
  - `private`: boolean - When `true`, this RFI is only visible to users with admin-level access. e.g. `true`
  - `responsible_contractor`: object - Vendor designated as the party responsible for responding to this RFI.
    - `id`: string - Unique string identifier of the vendor. e.g. `161072`
    - `name`: string - Display name of the responsible contractor vendor. e.g. `SID Architecture`
  - `last_updated_at`: string(date-time) - Timestamp of the most recent update to this external RFI, in ISO 8601 format. e.g. `2012-10-24T21:39:40Z`
  - `sync_status`: string enum[in_sync, upstream_private] - Synchronization state between the local and upstream RFI. e.g. `in_sync`
  - `status`: string enum[open, closed, draft, pending, closed_draft, closed_with_revision, open_recycled, draft_recycled, closed_recycled, pending_recycled, closed_draft_recycled, closed_with_revision_recycled] - Lifecycle status of the external RFI. Recycled variants (e.g. `open_recycled`) appear when the RFI has been moved to the recycle bin. e.g. `open`
  - `due_date`: string(date) - Date by which a response is expected, in `YYYY-MM-DD` format. Null if no due date is set. e.g. `2017-01-18`
  - `created_by`: object - Contact who originally created this external RFI.
    - `id`: string - Unique string identifier of the contact record. e.g. `161072`
    - `login_information_id`: string - Deprecated. This field is not returned by the API. e.g. `161072`
    - `name`: string - Full display name of the contact. e.g. `Carl the Contractor`
  - `rfi_manager`: object - Contact assigned as manager of this external RFI.
    - `id`: string - Unique string identifier of the contact record. e.g. `161072`
    - `login_information_id`: string - Deprecated. This field is not returned by the API. e.g. `161072`
    - `name`: string - Full display name of the contact. e.g. `Carl the Contractor`
  - `received_from`: object - Contact who submitted or originated this external RFI.
    - `id`: string - Unique string identifier of the contact record. e.g. `161072`
    - `login_information_id`: string - Deprecated. This field is not returned by the API. e.g. `161072`
    - `name`: string - Full display name of the contact. e.g. `Carl the Contractor`
  - `download_all_attachments_url`: string - URL to download a zip archive of all attachments on this external RFI. e.g. `http://www.example.com/download/all`
  - `initiated_at`: string(date-time) - Timestamp when this external RFI was opened/initiated, in ISO 8601 format. Null for draft external RFIs. e.g. `2016-08-23T15:23:57Z`
  - `time_resolved`: string(date-time) - Timestamp when this external RFI was closed, in ISO 8601 format. Null if still open. e.g. `2017-01-12T17:09:15Z`
  - `created_at`: string(date-time) - Timestamp when this external RFI record was created, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
  - `question`: string - Body of the RFI question. May contain HTML markup. e.g. `<p>Are the items listed on Schedule C acceptable?</p>`
  - `attachments`: array of object - Files attached directly to this external RFI (not to its responses).
    - `id`: string - Unique string identifier of the attachment file. e.g. `5324`
    - `url`: string - Download URL for this attachment. e.g. `http://www.example.com/`
    - `viewable`: boolean - When `true`, the file can be rendered inline in a document viewer. e.g. `true`
    - `can_be_viewed`: boolean - When `true`, the current user has permission to view this attachment. e.g. `true`
  - `cover_sheet`: object - Cover sheet document for this external RFI, if one has been attached.
    - `id`: string e.g. `12345`
    - `attachment`: object
  - `responses`: array of object - Official and informal responses to this external RFI.
    - `id`: string - Unique string identifier of the response. e.g. `161072`
    - `body`: string - Body text of the response. May contain HTML markup. e.g. `RFI Response 1`
    - `created_by`: object
    - `created_at`: string(date-time) - Timestamp when this response was created, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
    - `official`: boolean - When `true`, this is an official response to the RFI. e.g. `true`
    - `download_all_attachments_url`: string - URL to download a zip archive of all attachments on this response. e.g. `http://www.example.com/download/all`
    - `attachments`: array of object - Files attached to this response.
  - `project_connection`: object - Details of the upstream project this external RFI is connected to. Null if not connected.
    - `upstream_project_name`: string - Display name of the upstream (GC) project. e.g. `Carpinteria Head Quarters`
    - `upstream_company_name`: string - Display name of the company that owns the upstream project. e.g. `Procore Construction`
    - `upstream_project_id`: string - Unique string identifier of the upstream project. e.g. `42`
    - `upstream_company_id`: string - Unique string identifier of the company that owns the upstream project. e.g. `7`
  - `connection_status`: string enum[connected, disconnected] - Whether this external RFI is actively connected to a local RFI. One of `connected` or `disconnected`. e.g. `connected`
  - `download_external_rfi_and_responses_attachments_url`: string - URL to download a zip of all attachments across this external RFI and its responses. Null if no attachments exist. e.g. `http://www.example.com/download/all`
  - `origin_rfi_id`: string - ID of the originating local RFI that was exported to create this external RFI. Null if there is no originating RFI. e.g. `101`
  - `origin_project_id`: string - ID of the upstream project that the originating RFI belongs to. e.g. `42`
  - `origin_company_id`: string - ID of the company that owns the upstream project. Null if there is no upstream company. e.g. `7`
  - `linked_local_rfis`: array of object - Local RFIs linked to this external RFI.
    - `id`: string - Unique string identifier of the linked local RFI. e.g. `55`
    - `status`: string - Current lifecycle status of the linked local RFI. e.g. `open`
    - `formatted_name`: string - Human-readable display name of the linked local RFI. e.g. `RFI-001 — Confirm spec material`
  - `cross_collab_originated`: boolean - When `true`, this external RFI was created via cross-company collaboration export. e.g. `false`
  - `origin_rfi_url`: string - URL to the originating RFI in the upstream project. Null if no origin RFI or URL is unavailable. e.g. `https://app.procore.com/123/project/rfi/show/456`
  - `linked_drawings`: array of object - Drawing attachments linked to this external RFI.
    - `id`: string - Unique string identifier of the linked drawing record. e.g. `78`
    - `attachment`: object - The drawing file attachment.

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_rfis  **[BETA]**

**List External RFIs**
Returns all External RFIs in the specified Project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[sync_status]` [query] string enum[in_sync, out_of_sync, deleted] - Return item(s) with the specified External RFI Sync Status.
- `filters[connection_status]` [query] string enum[connected, disconnected] - Return item(s) with the specified External RFI Connection Status.
- `filters[rfi_manager_id]` [query] string - Returns item(s) with the specified External RFI's Manager ID.
- `filters[responsible_contractor_id]` [query] string - Returns item(s) with the specified External RFI's Responsible Contractor ID.
- `filters[received_from_id]` [query] string - Returns item(s) with the specified External RFI's Received From ID.
- `filters[due_date]` [query] string - Return item(s) that are due within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[time_resolved]` [query] string - Return item(s) that are due within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[initiated_at]` [query] string - Return item(s) that were Initiated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM...
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[position, subject, updated_at, created_at, due_date, initiated_at, rfi_manager_id, received_from_id, responsible_contractor_id, time_resolved, private, status] - Field to sort the External Rfi list by. If the field is passed with a prefixed '-' (Example: -position) it will be sorted in reverse order.

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - Unique string identifier for this external RFI. e.g. `999`
  - `last_updated_at`: string(date-time) - Timestamp of the most recent update, in ISO 8601 format. e.g. `2017-08-23T15:23:57Z`
  - `subject`: string - Subject line of the external RFI. e.g. `Specifications [99 14.44B]`
  - `position`: string - Sequential position number within the project. e.g. `4`
  - `revision`: string - Revision counter. Increments each time a new revision is created. e.g. `5`
  - `current_revision`: boolean - When `true`, this record is the most recent revision of the RFI. e.g. `true`
  - `has_revisions`: boolean - When `true`, this RFI has one or more prior revisions. e.g. `true`
  - `private`: boolean - When `true`, visible only to admin-level users. e.g. `true`
  - `full_position`: string - Position number prefixed with the project identifier (e.g. `PRE-1`). e.g. `PRE-1`
  - `sync_status`: string enum[in_sync, private] - Synchronization state of the External RFI. Returns `private` when the origin RFI is private and unavailable to the current project. e.g. `in_sync`
  - `origin_rfi_id`: string - ID of the RFI in the origin project, or null until the origin ID is available. e.g. `12345`
  - `origin_project_id`: string - ID of the project that owns the origin RFI. e.g. `42`
  - `origin_company_id`: string - ID of the company that owns the origin project, or null when connection data is unavailable. e.g. `7`
  - `created_by`: object - Contact who originally created this external RFI.
    - `id`: string - Unique string identifier of the contact record. e.g. `161072`
    - `name`: string - Full display name of the contact. e.g. `Carl the Contractor`
  - `responsible_contractor`: object - Vendor designated as the party responsible for responding to this RFI.
    - `id`: string - Unique string identifier of the vendor. e.g. `161072`
    - `name`: string - Display name of the responsible contractor vendor. e.g. `SID Architecture`
  - `status`: string enum[open, open_recycled, closed, closed_recycled, draft, draft_recycled, closed_draft, closed_draft_recycled, closed_with_revision, closed_with_revision_recycled] - Lifecycle status of the external RFI. Recycled variants (e.g. `open_recycled`) appear when the RFI is in the recycle bin. e.g. `open`
  - `due_date`: string(date) - Response due date in `YYYY-MM-DD` format. Null if not set. e.g. `2017-01-18`
  - `rfi_manager`: object - Contact assigned as manager of this external RFI.
    - `id`: string - Unique string identifier of the contact record. e.g. `161072`
    - `name`: string - Full display name of the contact. e.g. `Carl the Contractor`
  - `received_from`: object - Contact who submitted or originated this external RFI.
    - `id`: string - Unique string identifier of the contact record. e.g. `161072`
    - `name`: string - Full display name of the contact. e.g. `Carl the Contractor`
  - `initiated_at`: string(date-time) - Timestamp when the RFI was opened/initiated, in ISO 8601 format. Null for draft external RFIs. e.g. `2016-08-23T15:23:57Z`
  - `time_resolved`: string(date-time) - Timestamp when the RFI was closed, in ISO 8601 format. Null if still open. e.g. `2017-01-12T17:09:15Z`
  - `project_connection`: object - Details of the upstream project this external RFI is connected to. Null if not connected.
    - `upstream_project_name`: string - Display name of the upstream (GC) project. e.g. `Carpinteria Head Quarters`
    - `upstream_company_name`: string - Display name of the company that owns the upstream project. e.g. `Procore Construction`
    - `upstream_project_id`: string - Unique string identifier of the upstream project. e.g. `42`
    - `upstream_company_id`: string - Unique string identifier of the company that owns the upstream project. e.g. `7`
  - `connection_status`: string enum[connected, disconnected] - Whether this external RFI is actively connected to a local RFI. One of `connected` or `disconnected`. e.g. `connected`
  - `download_external_rfi_and_responses_attachments_url`: string - URL to download a zip of all attachments across this external RFI and its responses. Null if no attachments exist. e.g. `http://www.example.com/download/all`
  - `download_pdf_export_url`: string - URL to download the most recent PDF export for this external RFI. Null if no export has been generated. e.g. `http://www.example.com/download`
  - `linked_local_rfis`: array of object - Local RFIs linked to this external RFI.
    - `id`: string - Unique string identifier of the linked local RFI. e.g. `55`
    - `status`: string - Current lifecycle status of the linked local RFI. e.g. `open`
    - `formatted_name`: string - Human-readable display name of the linked local RFI. e.g. `RFI-001 — Confirm spec material`
  - `cross_collab_originated`: boolean - When `true`, this external RFI was created via cross-company collaboration export. e.g. `false`
  - `origin_rfi_url`: string - URL to the originating RFI in the upstream project. Null if no origin RFI or URL is unavailable. e.g. `https://app.procore.com/123/project/rfi/show/456`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_rfis/{external_rfi_id}/advanced_exports  **[BETA]**

**Show Advanced Export Options for External RFI**
Returns the available advanced export configuration options for a specified External RFI, including cover sheet and file attachment selections.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `external_rfi_id` [path] string (required) - External RFI ID

Response 200 (application/json): object

- `data`: array of object
  - `slug`: string - Unique identifier for the option set e.g. `cover_sheet`
  - `name`: string - Display name of the option set e.g. `Cover Sheet`
  - `type`: string enum[single_select, multi_select] - Selection type
  - `options`: array of object
    - `id`: string - Option identifier
    - `name`: string - Display name of the option
    - `content_type`: string - MIME content type (for file options)

Error responses: 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_rfis/{id}/download_external_rfi_and_responses_attachments  **[BETA]**

**Download External RFI and Responses Attachments**
Initiates a zip download of the External RFI and all response attachments. Returns a redirect to the streaming download URL.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - External RFI ID

Error responses: 302, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_rfis/{external_rfi_id}/external_rfi_pdf_exports/{id}/download  **[BETA]**

**Download External RFI PDF Export**
Returns a redirect to download the generated PDF export for a specified External RFI.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `external_rfi_id` [path] string (required) - External RFI ID
- `id` [path] string (required) - PDF Export ID

Error responses: 302, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/external_rfis/{id}/linked_local_rfis  **[BETA]**

**Update Linked Local RFIs for an External RFI**
Adds or removes linked local RFIs from the specified External RFI. At least one of the add/remove ID arrays must be present.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - External RFI ID

Request body (application/json) (required):

- `linked_local_rfis_added_ids`: array of integer - IDs of local RFIs to add to this external RFI's linked list. At least one of `linked_local_rfis_added_ids` or `linked_local_rfis_removed_ids` must be non-empty.
- `linked_local_rfis_removed_ids`: array of integer - IDs of local RFIs to remove from this external RFI's linked list. At least one of `linked_local_rfis_added_ids` or `linked_local_rfis_removed_ids` must be non-empty.

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - Unique string identifier of the linked local RFI.
  - `status`: string - Current lifecycle status of the linked local RFI.
  - `formatted_name`: string - Human-readable display name of the linked local RFI.

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_rfis/{id}/revisions  **[BETA]**

**List External RFI Revisions**
Return information about specified External RFI revisions

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - External RFI ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - Unique string identifier for this RFI revision.
  - `title`: string - Display title of the RFI revision (the formatted name of the RFI at that revision point).
  - `current_revision`: boolean - When `true`, this record is the most recent revision.
  - `status`: string - Lifecycle status of the RFI at this revision point.
  - `revision`: string - Sequential revision counter (e.g. `0` for original, `1` for first revision).
  - `created_at`: string(date-time) - Timestamp when this revision was created, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
  - `time_resolved`: string(date-time) - Timestamp when this revision was closed, in ISO 8601 format. Null if not yet closed. e.g. `2016-08-23T15:23:57Z`
  - `initiated_at`: string(date-time) - Timestamp when this revision was opened/initiated, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
  - `translated_status`: string - Locale-translated display label for the status (e.g. `Open`, `Closed`).

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## External RFIs Filter Options

Resource id: `external-rfis-filter-options`. Raw spec: `../openapi-raw/external-rfis-filter-options.json`. Web: https://developers.procore.com/reference/rest/external-rfis-filter-options?version=latest
Product lines: PM Essentials, PM Starter Pack

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_rfis/filter_options  **[BETA]**

**List available External RFI Filter Options**
Returns a list of available External RFIs Filter Options for the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Response 200 (application/json): object

- `data`: array of object
  - `key`: string - Machine-readable filter name (e.g. `rfi_manager_id`, `status`). Use as a lookup for the corresponding filter options endpoint URL. e.g. `rfi_manager_id`
  - `value`: string - URL of the endpoint that returns the options for this filter. Fetch this URL to populate the corresponding filter dropdown. e.g. `/rest/v2.0/companies/:company_id/projects/:project_id/external_rfis/filter_op...`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_rfis/filter_options/rfi_manager_id  **[BETA]**

**List Existing RFI Managers for External RFIs filter options**
Returns a list of available RFI Manager filter fields and options for External RFIs on the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `key`: integer - ID of the RFI manager contact record. Pass as `filters[rfi_manager_id]` when filtering the external RFIs list. e.g. `999`
  - `value`: string - Full display name of the RFI manager. e.g. `John Doe`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_rfis/filter_options/received_from_id  **[BETA]**

**List Existing Received From Login Information for External RFIs filter options**
Returns a list of available Received From Login Information filter fields and options for External RFIs on the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `key`: integer - ID of the received-from contact record. Pass as `filters[received_from_id]` when filtering the external RFIs list. e.g. `999`
  - `value`: string - Full display name of the received-from contact. e.g. `John Doe`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_rfis/filter_options/responsible_contractor_id  **[BETA]**

**List Existing Responsible Contractors for External RFIs filter options**
Returns a list of available Responsible Contractors filter fields and options for External RFIs on the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `key`: integer - ID of the vendor record for the responsible contractor. Pass as `filters[responsible_contractor_id]` when filtering the external RFIs list. e.g. `999`
  - `value`: string - Display name of the responsible contractor vendor. e.g. `John Doe`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_rfis/filter_options/sync_status  **[BETA]**

**List Existing Sync Statuses for External RFIs filter options**
Returns a list of available Sync Statuses filter fields and options for External RFIs on the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Response 200 (application/json): object

- `data`: array of object
  - `key`: string - Machine-readable sync status key (e.g. `in_sync`). Pass as `filters[sync_status]` when filtering. e.g. `in_sync`
  - `value`: string - Human-readable display label for the sync status, uppercased. e.g. `CLOSED`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_rfis/filter_options/connection_status  **[BETA]**

**List All Connection Statuses for External RFIs filter options**
Returns a list of Possible Connection Statuses filter fields and options for External RFIs on the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Response 200 (application/json): object

- `data`: array of object
  - `key`: string - Machine-readable connection status key. One of `connected` or `disconnected`. Pass as `filters[connection_status]` when filtering. e.g. `connected`
  - `value`: string - Human-readable display label for the connection status, translated to the current locale. e.g. `Connected`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_rfis/filter_options/current_revision  **[BETA]**

**List Current Revision for External RFIs filter options**
Returns a list of available Current Revision filter fields and options for External RFIs

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Response 200 (application/json): object

- `data`: array of object
  - `key`: boolean - Boolean filter value. When `true`, filters to current-revision external RFIs only. Pass as `filters[current_revision]=true` when filtering. e.g. `true`
  - `value`: string - Human-readable label for the option, translated to the current locale (e.g. `Yes`). e.g. `Yes`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_rfis/filter_options/status  **[BETA]**

**List Available Statuses for External RFIs filter options**
Returns a list of all possible Status filter fields and options for External RFIs on the specified Project. This includes all filterable RFI statuses such as open, draft, closed, etc., including their recycled variants.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Response 200 (application/json): object

- `data`: array of object
  - `key`: string - Machine-readable external RFI status key. Pass as `filters[status]` when filtering the external RFIs list. e.g. `open`
  - `value`: string - Human-readable display label for this status, translated to the current locale. e.g. `Open`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Filter Options

Resource id: `filter-options`. Raw spec: `../openapi-raw/filter-options.json`. Web: https://developers.procore.com/reference/rest/filter-options?version=latest
Product lines: PM Starter Pack, PM Essentials

### GET /rest/v1.0/projects/{project_id}/rfis/filter_options

**List available RFI filters**
Returns a list of filter fields and options for RFIs on a specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `key`: string - Filter field name (e.g. `status`, `assigned_id`). The value for each key is the URL of the sub-endpoint that returns valid options for that filter.

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/rfis/filter_options/status

**List available RFI status filter options**
Returns a list of status filter fields and options for RFIs on a specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Status string value to pass as a filter parameter, e.g. `open`, `draft`, `closed`. Use as `filters[status][]=<key>` on the RFI list endpoint.
- `value`: string - Human-readable display label for the status, suitable for showing in a filter UI.

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/rfis/filter_options/assigned_id

**List available RFI assigned_id filter options**
Returns a list of assigned_id filter fields and options for RFIs on a specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: integer - Login information ID of the user. Pass as `filters[assigned_id][]=<key>` on the RFI list endpoint.
- `value`: string - Full name of the assignee.

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/rfis/filter_options/location_id

**List available RFIs locations**
Returns a list of RFI locations for a specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: integer - ID of the location. Pass as `filters[location_id][]=<key>` on the RFI list endpoint.
- `value`: string - Full hierarchical path name of the location.

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/rfis/filter_options/cost_code_id

**List available RFI cost code options**
Returns a list of RFI cost code options for a specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: integer - ID of the cost code. Pass as `filters[cost_code_id][]=<key>` on the RFI list endpoint.
- `value`: string - Long display name of the cost code.

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/rfis/filter_options/received_from_login_information_id

**List available RFI received from filter options**
Returns a list of received from filter options for RFIs on a specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: integer - Login information ID of the user. Pass as `filters[received_from_login_information_id][]=<key>` on the RFI list endpoint.
- `value`: string - Full name of the received-from contact.

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/rfis/filter_options/responsible_contractor_id

**List available RFI responsible contractor filter options**
Returns a list of responsible contractor filter fields and options for RFIs on a specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: integer - ID of the vendor/contractor. Pass as `filters[responsible_contractor_id][]=<key>` on the RFI list endpoint.
- `value`: string - Name of the responsible contractor company.

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/rfis/filter_options/ball_in_court_id

**List available RFI ball in court filter options**
Returns a list of available RFI ball in court filter fields and options for RFIs on a specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: integer - Login information ID of the user currently holding the ball in court. Pass as `filters[ball_in_court_id][]=<key>` on the RFI list endpoint. e.g. `999`
- `value`: string - Full name of the user holding the ball in court. e.g. `John Doe`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/rfis/filter_options/rfi_manager_id

**List available RFI RFI Manager filter options**
Returns a list of available RFI Manager filter fields and options for RFIs on a specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: integer - Login information ID of the RFI manager. Pass as `filters[rfi_manager_id][]=<key>` on the RFI list endpoint. e.g. `999`
- `value`: string - Full name of the RFI manager. e.g. `John Doe`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/rfis/filter_options/prefix_stage_id

**List available RFI Prefix Stage filter options**
Returns all Filter Options for Prefix Stage defined by the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: integer - ID of the RFI prefix stage. Pass as `filters[prefix_stage_id][]=<key>` on the RFI list endpoint. e.g. `42`
- `value`: string - Name label for the prefix stage, e.g. `BID`. e.g. `BID`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/rfis/filter_options/sub_job_id

**List available RFI Sub Job filter options**
Returns all Filter Options for Sub Jobs defined by the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: integer - ID of the sub-job. Pass as `filters[sub_job_id][]=<key>` on the RFI list endpoint. e.g. `42`
- `value`: string - Name of the sub-job. e.g. `Kitchen`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/rfis/filter_options/priority

**List available RFI Priority filter options**
Returns a list of available Priority options for RFIs

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: integer - Integer value of the priority level (0=Low, 1=Medium, 2=High, 3=Urgent). Pass as `filters[priority][]=<key>` on the RFI list endpoint. e.g. `1`
- `value`: string - Human-readable display name of the priority level, e.g. `Medium`. e.g. `Medium`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Potential Assignees

Resource id: `potential-assignees`. Raw spec: `../openapi-raw/potential-assignees.json`. Web: https://developers.procore.com/reference/rest/potential-assignees?version=latest
Product lines: PM Starter Pack, PM Essentials

### GET /rest/v1.0/projects/{project_id}/rfis/potential_assignees

**Get a list of possible assignees for an RFI**
Returns all potential Assignees for an RFI.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `login`: string - Email address (login) of the user. Uniquely identifies the account across Procore. e.g. `carl.contractor@example.com`
- `id`: integer - Unique integer identifier for this user. e.g. `161072`
- `name`: string - Full display name of the user, formatted as first + last name. e.g. `Carl the Contractor`
- `locale`: string - Locale preference of the user, e.g. `en-US`. Null if not explicitly set. e.g. `en-US`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Potential RFI Managers

Resource id: `potential-rfi-managers`. Raw spec: `../openapi-raw/potential-rfi-managers.json`. Web: https://developers.procore.com/reference/rest/potential-rfi-managers?version=latest
Product lines: PM Starter Pack, PM Essentials

### GET /rest/v1.0/projects/{project_id}/rfis/potential_rfi_managers

**Get a list of possible RFI Managers for an RFI**
Returns all potential RFI Managers for an RFI.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `login`: string - Email address (login) of the user. Uniquely identifies the account across Procore. e.g. `carl.contractor@example.com`
- `id`: integer - Unique integer identifier for this user. e.g. `161072`
- `name`: string - Full display name of the user, formatted as first + last name. e.g. `Carl the Contractor`
- `locale`: string - Locale preference of the user, e.g. `en-US`. Null if not explicitly set. e.g. `en-US`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## RFIs

Resource id: `rfis`. Raw spec: `../openapi-raw/rfis.json`. Web: https://developers.procore.com/reference/rest/rfis?version=latest
Product lines: PM Essentials, PM Starter Pack

### GET /rest/v1.1/projects/{project_id}/rfis/export

**Download RFIs List**
Downloads a PDF or CSV of the RFIs List

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[query]` [query] string - Search Query
- `export_format` [query] string enum[pdf, csv] - File format for the export - 'pdf' or 'csv'.
- `table_configuration_for_export` [query] object - Table configuration for the export that controls which columns are visible and their order in the generated PDF or CSV. When provided, the export will respect both the column visibility settings and the column order f...

Response 200 (application/json): string


Response 202: Accepted (no body)

Error responses: 400 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/rfis/{id}/advance_ball_in_court

**Update Advance Ball in Court**
Advances the ball in court to the specified ball in court.
The RFI Manager can move ball in court between the RFI Manager and the Assignee.
The Assignee can move the ball in court back to the RFI Manager, if the Assignee has responded.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - RFI ID

Response 200 (application/json): object

- `created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `link`: string(url) - Web link to resource e.g. `https://app.procore.com/123456/project/rfi/show/123456`
- `location_id`: integer - ID of the associated Location e.g. `999`
- `specification_section_id`: integer - ID of the associated Specification Section e.g. `999`
- `questions`: array of object - RFI Questions
  - `id`: integer - ID e.g. `999`
  - `body`: string - Body e.g. `<p>Are the items listed on Schedule C acceptable?</p>`
  - `errors`: array of object - Errors
    - `errors`: string
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `id`: integer - ID e.g. `999`
- `assignee`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `assignees`: array of object - RFI Assignees
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
  - `locale`: string - User locale e.g. `en`
  - `response_required`: boolean - Designate whether or not the assignee is required to respond e.g. `true`
- `ball_in_court`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `ball_in_courts`: array of object - Ball In Courts
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `cost_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
  - `value`: number(float) - Cost impact value in dollars e.g. `12039.55`
- `created_at`: string(date-time) - Date created e.g. `2016-08-23T15:23:57Z`
- `deleted`: boolean - Deleted status (this is only shown on deleted records) e.g. `true`
- `deleted_at`: string(date-time) - Time deleted (this is only shown on deleted records) e.g. `2016-08-23T15:23:57Z`
- `due_date`: oneOf(string(date) | string(date-time)) - Due Date e.g. `2017-01-18`
- `initiated_at`: string(date-time) - Date initiated e.g. `2016-08-23T15:23:57Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `full_number`: string - Full Number e.g. `C-1477`
- `number`: string - Number e.g. `1477`
- `prefix`: string - Prefix e.g. `C`
- `private`: boolean - Private Status e.g. `true`
- `project_stage`: object
  - `id`: integer - ID e.g. `12345`
  - `default_stage`: boolean - Default Stage e.g. `true`
  - `dependent_projects`: integer - Dependent Projects count e.g. `0`
  - `formatted_name`: string - Formatted Name e.g. `Course of Construction`
  - `formatted_parent_name`: string - Formatted Parent Name e.g. `Course of Construction`
  - `name`: string - Name e.g. `Course of Construction`
  - `parent_id`: integer - Construction Volume Stage ID. Returns null if prefix is linked to a project stage that is the parent. e.g. `12345`
  - `procore_category`: boolean - Indicates whether the project stage the prefix is linked to is a Construction Volume default stage. e.g. `false`
- `received_from`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `reference`: string - Reference e.g. `Schedule C`
- `responsible_contractor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `rfi_manager`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `schedule_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
  - `value`: integer - Schedule impact value e.g. `14`
- `status`: string enum[open, closed, draft, closed_with_revision, closed_draft] - Status e.g. `open`
- `translated_status`: string - Translated RFI status e.g. `Abierto`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `subject`: string - Subject e.g. `Specifications [99 14.44B]`
- `revision`: string - Revision Number e.g. `5`
- `current_revision`: boolean - Designate whether or not this RFI is the latest revision e.g. `true`
- `has_revisions`: boolean - Designate whether or not this RFI has other revisions e.g. `true`
- `source_rfi_header_id`: integer - The ID of The Root RFI Revision e.g. `12345`
- `time_resolved`: string(date-time) - Time RFI was closed e.g. `2017-01-12T17:09:15Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `connect_export_origin`: object - Export origin information for RFIs received via cross-account collaboration. Null for RFIs not received via export.
  - `source_provider_name`: string - The originating company name (cross-company export) or project name (same-company export). e.g. `SC Subcontractors`
  - `rfi_number`: string - The originating RFI number. Returns "Draft" if the source RFI was a draft at export time. e.g. `RFI-042`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/rfis/{id}/forward_for_review

**Update Forward For Review**
Assignee can forward the RFI to a forwardee who becomes a new ball in court.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - RFI ID

Request body (application/json) (required):

- `rfi`: object (required)
  - `forwardee_ids`: array of integer - An array of IDs of the Forwardees of the RFI *Only existing assignees can set this field when ball in court is in Assignees' court **Can only forward to one forwardee

Response 200 (application/json): object

- `created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `link`: string(url) - Web link to resource e.g. `https://app.procore.com/123456/project/rfi/show/123456`
- `location_id`: integer - ID of the associated Location e.g. `999`
- `specification_section_id`: integer - ID of the associated Specification Section e.g. `999`
- `questions`: array of object - RFI Questions
  - `id`: integer - ID e.g. `999`
  - `body`: string - Body e.g. `<p>Are the items listed on Schedule C acceptable?</p>`
  - `errors`: array of object - Errors
    - `errors`: string
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `id`: integer - ID e.g. `999`
- `assignee`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `assignees`: array of object - RFI Assignees
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
  - `locale`: string - User locale e.g. `en`
  - `response_required`: boolean - Designate whether or not the assignee is required to respond e.g. `true`
- `ball_in_court`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `ball_in_courts`: array of object - Ball In Courts
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `cost_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
  - `value`: number(float) - Cost impact value in dollars e.g. `12039.55`
- `created_at`: string(date-time) - Date created e.g. `2016-08-23T15:23:57Z`
- `deleted`: boolean - Deleted status (this is only shown on deleted records) e.g. `true`
- `deleted_at`: string(date-time) - Time deleted (this is only shown on deleted records) e.g. `2016-08-23T15:23:57Z`
- `due_date`: oneOf(string(date) | string(date-time)) - Due Date e.g. `2017-01-18`
- `initiated_at`: string(date-time) - Date initiated e.g. `2016-08-23T15:23:57Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `full_number`: string - Full Number e.g. `C-1477`
- `number`: string - Number e.g. `1477`
- `prefix`: string - Prefix e.g. `C`
- `private`: boolean - Private Status e.g. `true`
- `project_stage`: object
  - `id`: integer - ID e.g. `12345`
  - `default_stage`: boolean - Default Stage e.g. `true`
  - `dependent_projects`: integer - Dependent Projects count e.g. `0`
  - `formatted_name`: string - Formatted Name e.g. `Course of Construction`
  - `formatted_parent_name`: string - Formatted Parent Name e.g. `Course of Construction`
  - `name`: string - Name e.g. `Course of Construction`
  - `parent_id`: integer - Construction Volume Stage ID. Returns null if prefix is linked to a project stage that is the parent. e.g. `12345`
  - `procore_category`: boolean - Indicates whether the project stage the prefix is linked to is a Construction Volume default stage. e.g. `false`
- `received_from`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `reference`: string - Reference e.g. `Schedule C`
- `responsible_contractor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `rfi_manager`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `schedule_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
  - `value`: integer - Schedule impact value e.g. `14`
- `status`: string enum[open, closed, draft, closed_with_revision, closed_draft] - Status e.g. `open`
- `translated_status`: string - Translated RFI status e.g. `Abierto`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `subject`: string - Subject e.g. `Specifications [99 14.44B]`
- `revision`: string - Revision Number e.g. `5`
- `current_revision`: boolean - Designate whether or not this RFI is the latest revision e.g. `true`
- `has_revisions`: boolean - Designate whether or not this RFI has other revisions e.g. `true`
- `source_rfi_header_id`: integer - The ID of The Root RFI Revision e.g. `12345`
- `time_resolved`: string(date-time) - Time RFI was closed e.g. `2017-01-12T17:09:15Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `connect_export_origin`: object - Export origin information for RFIs received via cross-account collaboration. Null for RFIs not received via export.
  - `source_provider_name`: string - The originating company name (cross-company export) or project name (same-company export). e.g. `SC Subcontractors`
  - `rfi_number`: string - The originating RFI number. Returns "Draft" if the source RFI was a draft at export time. e.g. `RFI-042`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/rfis

**List RFIs**
Returns all RFIs in a specified Project.
Use the `serializer_view` query parameter to request alternate list item response shapes for existing web or mobile clients.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] oneOf(integer | string(integer) | array of oneOf(integer | string(integer))) - Return item(s) with the specified RFI ID or IDs. ID values may be sent as integers or numeric query-string values.
- `filters[status]` [query] oneOf(string enum[open, closed, draft, closed_with_revision, closed_draft] | array of string enum[open, closed, draft, closed_with_revision, closed_draft]) - Return item(s) with the specified RFI status or statuses.
- `filters[assigned_id]` [query] oneOf(integer | string(integer) | array of oneOf(integer | string(integer))) - Return item(s) with the specified Assigned ID or IDs. ID values may be sent as integers or numeric query-string values.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[responsible_contractor_id]` [query] oneOf(integer | string(integer) | array of oneOf(integer | string(integer))) - Return item(s) with the specified Responsible Contractor ID or IDs. ID values may be sent as integers or numeric query-string values.
- `filters[cost_code_id]` [query] oneOf(integer | string(integer) | array of oneOf(integer | string(integer))) - Return item(s) with the specified Cost Code ID or IDs. ID values may be sent as integers or numeric query-string values.
- `filters[received_from_login_information_id]` [query] oneOf(integer | string(integer) | array of oneOf(integer | string(integer))) - Return item(s) with the specified Received From Login Information ID or IDs. ID values may be sent as integers or numeric query-string values.
- `filters[ball_in_court_id]` [query] oneOf(integer | string(integer) | array of oneOf(integer | string(integer))) - Return item(s) where the specified User ID or IDs are Ball in Court. ID values may be sent as integers or numeric query-string values.
- `filters[location_id]` [query] oneOf(integer | string(integer) | array of oneOf(integer | string(integer))) - Return item(s) with the specified Location ID or IDs. ID values may be sent as integers or numeric query-string values.
- `filters[for_location_id_with_sublocations]` [query] oneOf(integer | string(integer) | array of oneOf(integer | string(integer))) - Return item(s) with the specified Location ID or IDs, including their sublocations. ID values may be sent as integers or numeric query-string values.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[initiated_at]` [query] string - Return item(s) initiated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00`...
- `filters[rfi_manager_id]` [query] oneOf(integer | string(integer) | array of oneOf(integer | string(integer))) - Return item(s) with the specified RFI Manager ID or IDs. ID values may be sent as integers or numeric query-string values.
- `filters[number]` [query] oneOf(string | array of string) - Return item(s) with the specified RFI number or full number.
- `filters[prefix_stage_id]` [query] oneOf(integer | string(integer) | array of oneOf(integer | string(integer))) - Return item(s) with the specified RFI Prefix Stage ID or IDs. ID values may be sent as integers or numeric query-string values.
- `filters[current_revision]` [query] oneOf(boolean | array of boolean) - When true, excludes RFIs that are closed with a newer revision.
- `filters[sub_job_id]` [query] oneOf(integer | string(integer) | array of oneOf(integer | string(integer))) - Return item(s) with the specified Sub Job ID or IDs. ID values may be sent as integers or numeric query-string values.
- `filters[priority]` [query] oneOf(string enum[low, medium, high, urgent] | integer enum[0, 1, 2, 3] | string enum[0, 1, 2, 3] | array of oneOf(string enum[low, medium, high, urgent] | integer enum[0, 1, 2, 3] | string enum[0, 1, 2, 3])) - Return item(s) with the specified RFI priority or priorities.
- `filters[linked_to_connected_rfis]` [query] boolean - Legacy alias of `filters[linked_to_external_rfis]`, which is the preferred parameter name. Returns RFIs linked to an external (connected) RFI when `true`, and RFIs with no such link when `false`. Sending both with con...
- `filters[linked_to_external_rfis]` [query] boolean - Returns RFIs linked to an external (connected) RFI when `true`, and RFIs with no such link when `false`. This is the preferred parameter name; `filters[linked_to_connected_rfis]` is a legacy alias that resolves to the...
- `filters[overdue]` [query] oneOf(boolean | array of boolean) - Returns only overdue RFIs. The filter applies whenever the parameter is present and the value is not evaluated, so `filters[overdue]=false` returns the same overdue results as `true`. Omit the parameter to include RFI...
- `serializer_view` [query] string enum[ids_only, base_web_index, web_index, flatten_v0] - Controls the RFI list item response shape. The default response schema shown for this endpoint documents the standard list item shape; the values below return alternate shapes used by existing clients. - `ids_only` - ...
- `as_datetimes` [query] boolean - When true, returns date fields as datetime format
- `search` [query] string - Search for RFIs by subject or number. This parameter will return all RFIs that match the search term.
- `q` [query] string - Alias for `search`. Search for RFIs by subject or number.
- `sort[attribute]` [query] string enum[assigned_id, ball_in_court_id, cost_code_id, cost_impact, created_by_id, date_created, drawing_number, due_date, due_date_variance, initiated_at, location_id, number, ...] - Field to sort the RFI list by.
- `sort[direction]` [query] string enum[asc, desc] - Sort direction. Only applies when `sort[attribute]` is also set.

Response 200 (application/json): oneOf(array of integer | array of object | array of object | array of object | array of object)


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/rfis

**Create RFI**
Creates a new RFI in a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `rfi`: object (required)
  - `subject`: string (required) - The Subject of the RFI e.g. `Wall Color`
  - `reference`: string - The Reference of the RFI e.g. `Color of the kitchen wall`
  - `assignee_id`: integer - The ID of the Assignee User. *Only admin users can set this field DEPRECATED. Please use assignee_ids instead
  - `assignee_ids`: array of integer - An array of IDs of the Assignees of the RFI *Only admin users can set this field **If this param is not provided, the assigned_id will be used instead e.g. `[123, 456]`
  - `required_assignee_ids`: array of integer - An array of IDs of the Assignees that are required to respond to the RFI * Only admin users can set this field ** IDs must also be present in assignee_ids e.g. `[123, 456]`
  - `draft`: boolean - The Draft status of the RFI e.g. `false`
  - `due_date`: string(date) - The Due Date of the RFI *Only admin users can set this field e.g. `2021-07-26`
  - `received_from_login_information_id`: integer - The ID of the Received From User of the RFI e.g. `123`
  - `responsible_contractor_id`: integer - The ID of the Responsible Contractor Vendor of the RFI e.g. `123`
  - `distribution_ids`: array of integer - An array of IDs of the Distributions of the RFI e.g. `[123, 456]`
  - `number`: string - The Number of the RFI *This field will be auto-populated if the RFI is not draft **When creating a new revision of an RFI, if not provided, it will inherit the number from the source RFI. e.g. `1234`
  - `private`: boolean - The Private status of the RFI e.g. `false`
  - `project_stage_id`: integer - The ID of the Project Stage of the RFI *If Number By Stage is enabled in RFI settings, this will add the prefix of the project stage to the full number of the RFI. **This field is not needed when creating a new revisi... e.g. `21`
  - `schedule_impact`: object - The Schedule Impact of the RFI
    - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - The Status of the Schedule Impact e.g. `yes_known`
    - `value`: integer - The Value in days of the Schedule Impact e.g. `0`
  - `cost_impact`: object - The Cost Impact of the RFI
    - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - The Status of the Cost Impact e.g. `yes_known`
    - `value`: number(float) - Cost impact value in dollars e.g. `12039.55`
  - `location_id`: integer - The ID of the Location of the RFI e.g. `123`
  - `drawing_number`: string - The Drawing Number of the RFI e.g. `1A`
  - `specification_section_id`: integer - The ID of the Specification Section of the RFI e.g. `123`
  - `cost_code_id`: integer - The ID of the Cost Code of the RFI e.g. `123`
  - `rfi_manager_id`: integer (required) - The ID of the RFI Manager User of the RFI *Only admin users (or standard users, if the project's configuration allows for it) can set this field e.g. `1`
  - `question`: object (required) - The Question of the RFI
    - `body`: string (required) - The Body of the Question e.g. `What color should the kitchen wall be?`
    - `attachments`: array of string(binary) - RFI Question Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
    - `prostore_file_ids`: array of integer - An array of Prostore File IDs. The Prostore Files will be associated with the RFI as attachments. e.g. `[6, 7]`
    - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
    - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
    - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
    - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
    - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
    - `document_management_document_revision_ids`: array of string - Document Management Document Revisions to attach to the response e.g. `["5c9800d3-bd12-45dd-a280-85fe887858b2", "da4b5e3b-ddaf-406f-8b2c-dceb6a60a203"]`
  - `custom_textfield_1`: string - The Custom Textfield 1 of the RFI
  - `custom_textfield_2`: string - The Custom Textfield 2 of the RFI
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `revision`: string - Revision Number *This field is required only when creating a new revision of an RFI. e.g. `1`
  - `source_rfi_header_id`: integer - The ID of The Root RFI Revision *This field is required only when creating a new revision of an RFI. e.g. `12345`

Response 201 (application/json): object

- `accepted`: boolean - RFI Acceptance status, true means the RFI is accepted and closed e.g. `false`
- `ball_in_court_role`: string - Ball in Court Role (can be Assignees, Creator, or RFI Manager) e.g. `assignees`
- `created_by`: object - User who created the RFI.
  - `id`: integer (required) - Unique identifier for the user's login information. e.g. `161072`
  - `login`: string (required) - User email address. e.g. `carl.contractor@example.com`
  - `name`: string (required) - User's first and last name without their company name. e.g. `Carl the Contractor`
  - `locale`: string - User locale. e.g. `en-US`
  - `vendor`: object - Company associated with the creator, or null when the creator has no company.
    - `id`: integer (required) - Unique identifier for the vendor. e.g. `12345`
    - `name`: string (required) - Vendor name. e.g. `SID Architecture`
- `custom_textfield_1`: object - Custom RFI text field 1
  - `label`: string - Project label for RFI custom text field 1
  - `value`: string - Value for RFI custom text field 1
- `custom_textfield_2`: object - Custom RFI text field 2
  - `label`: string - Project label for RFI custom text field 2
  - `value`: string - Value for RFI custom text field 2
- `distribution_list`: array of object - RFI Distribution List of Users
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `draft`: boolean - Draft status, true if draft e.g. `false`
- `drawing_ids`: array of integer - Array of IDs for associated Drawings
- `drawing_number`: string - Drawing Number e.g. `107.3D`
- `questions`: array of object - List of questions
  - `id`: integer - ID
  - `question_date`: string(date-time) - Date e.g. `2016-08-02T20:49:35Z`
  - `plain_text_body`: string - Plain text body e.g. `Are the items listed on Schedule C acceptable?`
  - `rich_text_body`: string - Rich text body e.g. `<p>Are the items listed on Schedule C acceptable?</p>`
  - `created_by`: string - Creator name e.g. `Joseph Shabadoo`
  - `attachments`: array of object - Attachments
    - `id`: integer
    - `name`: string - Use :name, :filename to be deprecated
    - `url`: string
    - `filename`: string - :filename to be deprecated, use :name
  - `answers`: array of object - Answers
    - `id`: integer - ID e.g. `999`
    - `official`: boolean - Official response, true if official e.g. `true`
    - `answer_date`: string(date-time) - Date e.g. `2016-08-29T14:37:22Z`
    - `plain_text_body`: string - Plain text body e.g. `No, they need to follow the guidelines on Schedule D`
    - `rich_text_body`: string - Rich text body e.g. `<p>No, they need to follow the guidelines on Schedule D</p>`
    - `created_by`: string - Creator name e.g. `Jane Doe`
    - `created_by_id`: integer - Creator ID e.g. `42`
    - `attachments`: array of object - Attachments
- `specification_section`: object
  - `id`: integer - ID
  - `description`: string - Description
  - `number`: string - Number
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `id`: integer - ID e.g. `999`
- `assignee`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `assignees`: array of object - RFI Assignees
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `ball_in_court`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `ball_in_courts`: array of object - Ball In Courts
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `cost_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
  - `value`: string - Cost impact value in dollars e.g. `12039.55`
- `created_at`: string(date-time) - Date created e.g. `2016-08-23T15:23:57Z`
- `deleted`: boolean - Deleted status (this is only shown on deleted records) e.g. `true`
- `deleted_at`: string(date-time) - Time deleted (this is only shown on deleted records) e.g. `2016-08-23T15:23:57Z`
- `due_date`: string(date) - Due Date e.g. `2017-01-18`
- `initiated_at`: string(date-time) - Date initiated e.g. `2016-08-23T15:23:57Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `full_number`: string - Full Number e.g. `C-1477`
- `number`: string - Number e.g. `1477`
- `prefix`: string - Prefix e.g. `C`
- `private`: boolean - Private Status e.g. `true`
- `received_from`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `reference`: string - Reference e.g. `Schedule C`
- `responsible_contractor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `rfi_manager`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `schedule_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
  - `value`: integer - Schedule impact value in days e.g. `14`
- `status`: string enum[open, closed, draft, closed_with_revision, closed_draft] - Status e.g. `open`
- `translated_status`: string - Translated RFI status e.g. `Abierto`
- `subject`: string - Subject e.g. `Specifications [99 14.44B]`
- `revision`: string - Revision Number e.g. `5`
- `source_rfi_header_id`: integer - The ID of The Root RFI Revision e.g. `12345`
- `current_revision`: boolean - Designate whether or not this RFI is the latest revision e.g. `true`
- `has_revisions`: boolean - Designate whether or not this RFI has other revisions e.g. `true`
- `time_resolved`: string(date-time) - Time RFI was closed e.g. `2017-01-12T17:09:15Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `connect_export_origin`: object - Export origin information for RFIs received via cross-account collaboration. Null for RFIs not received via export.
  - `source_provider_name`: string - The originating company name (cross-company export) or project name (same-company export). e.g. `SC Subcontractors`
  - `rfi_number`: string - The originating RFI number. Returns "Draft" if the source RFI was a draft at export time. e.g. `RFI-042`
- `connect_exported_project_ids`: array of integer - IDs of connected projects to which this RFI has already been exported. Use this list with connected project permissions to identify prior export destinations and avoid offering duplicate export targets.

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/rfis

**Batch Update RFIs**
Update specified RFIs in a specified project. Specify the RFIs by their IDs. Pass in the same values for each specified RFI for the action to succeed.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `data`: array of object (required)
  - `id`: string - The ID of the RFI e.g. `12345`
  - `add_assignee_ids`: array of integer - Array of Assignee IDs to add to the Assignees List e.g. `[123, 456]`
  - `add_required_assignee_ids`: array of integer - Array of Assignee IDs to make required in the Assignees List. Note: The Assignee must also be in the Assignees List to be marked as required. e.g. `[123, 456]`
  - `remove_assignee_ids`: array of integer - Array of Assignee IDs to remove from the Assignees List e.g. `[123, 456]`
  - `add_distribution_ids`: array of integer - Array of Distribution Member IDs to add to the Distribution List e.g. `[123, 456]`
  - `remove_distribution_ids`: array of integer - Array of Distribution Member IDs to remove from the Distribution List e.g. `[123, 456]`
  - `cost_code_id`: integer - The ID of the Cost Code of the RFI e.g. `21`
  - `cost_impact`: object - The Cost Impact of the RFI
    - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - The Status of the Cost Impact e.g. `yes_known`
    - `value`: number(float) - Cost impact value in dollars e.g. `12039.55`
  - `drawing_number`: string - The Drawing Number of the RFI e.g. `1A`
  - `due_date`: string(date) - The Due Date of the RFI *Only admin users can set this field e.g. `2021-07-26`
  - `location_id`: integer - The ID of the Location of the RFI e.g. `21`
  - `private`: boolean - The Private status of the RFI e.g. `false`
  - `received_from_login_information_id`: integer - The ID of the Received From User of the RFI e.g. `123`
  - `reference`: string - The Reference of the RFI e.g. `Color of the kitchen wall`
  - `responsible_contractor_id`: integer - The ID of the Responsible Contractor Vendor of the RFI e.g. `123`
  - `rfi_manager_id`: integer - The ID of the RFI Manager User of the RFI *Only admin users (or standard users, if the project's configuration allows for it) can set this field e.g. `1`
  - `schedule_impact`: object - The Schedule Impact of the RFI
    - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - The Status of the Schedule Impact e.g. `yes_known`
    - `value`: integer - The Value in days of the Schedule Impact e.g. `0`
  - `specification_section_id`: integer - The ID of the Specification Section of the RFI e.g. `123`
  - `sub_job_id`: integer - The ID of the Sub Job of the RFI e.g. `123`
  - `subject`: string - The Subject of the RFI e.g. `Wall color`

Response 200: OK (no body)

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/rfis/recycle_bin

**List Recycled RFIs**
Returns all deleted RFIs in a specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `link`: string(url) - Web link to resource e.g. `https://app.procore.com/123456/project/rfi/show/123456`
- `location_id`: integer - ID of the associated Location e.g. `999`
- `specification_section_id`: integer - ID of the associated Specification Section e.g. `999`
- `questions`: array of object - RFI Questions
  - `id`: integer - ID e.g. `999`
  - `body`: string - Body e.g. `<p>Are the items listed on Schedule C acceptable?</p>`
  - `errors`: array of object - Errors
    - `errors`: string
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `id`: integer - ID e.g. `999`
- `assignee`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `assignees`: array of object - RFI Assignees
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
  - `locale`: string - User locale e.g. `en`
  - `response_required`: boolean - Designate whether or not the assignee is required to respond e.g. `true`
- `ball_in_court`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `ball_in_courts`: array of object - Ball In Courts
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `cost_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
  - `value`: number(float) - Cost impact value in dollars e.g. `12039.55`
- `created_at`: string(date-time) - Date created e.g. `2016-08-23T15:23:57Z`
- `deleted`: boolean - Deleted status (this is only shown on deleted records) e.g. `true`
- `deleted_at`: string(date-time) - Time deleted (this is only shown on deleted records) e.g. `2016-08-23T15:23:57Z`
- `due_date`: oneOf(string(date) | string(date-time)) - Due Date e.g. `2017-01-18`
- `initiated_at`: string(date-time) - Date initiated e.g. `2016-08-23T15:23:57Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `full_number`: string - Full Number e.g. `C-1477`
- `number`: string - Number e.g. `1477`
- `prefix`: string - Prefix e.g. `C`
- `private`: boolean - Private Status e.g. `true`
- `project_stage`: object
  - `id`: integer - ID e.g. `12345`
  - `default_stage`: boolean - Default Stage e.g. `true`
  - `dependent_projects`: integer - Dependent Projects count e.g. `0`
  - `formatted_name`: string - Formatted Name e.g. `Course of Construction`
  - `formatted_parent_name`: string - Formatted Parent Name e.g. `Course of Construction`
  - `name`: string - Name e.g. `Course of Construction`
  - `parent_id`: integer - Construction Volume Stage ID. Returns null if prefix is linked to a project stage that is the parent. e.g. `12345`
  - `procore_category`: boolean - Indicates whether the project stage the prefix is linked to is a Construction Volume default stage. e.g. `false`
- `received_from`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `reference`: string - Reference e.g. `Schedule C`
- `responsible_contractor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `rfi_manager`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `schedule_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
  - `value`: integer - Schedule impact value e.g. `14`
- `status`: string enum[open, closed, draft, closed_with_revision, closed_draft] - Status e.g. `open`
- `translated_status`: string - Translated RFI status e.g. `Abierto`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `subject`: string - Subject e.g. `Specifications [99 14.44B]`
- `revision`: string - Revision Number e.g. `5`
- `current_revision`: boolean - Designate whether or not this RFI is the latest revision e.g. `true`
- `has_revisions`: boolean - Designate whether or not this RFI has other revisions e.g. `true`
- `source_rfi_header_id`: integer - The ID of The Root RFI Revision e.g. `12345`
- `time_resolved`: string(date-time) - Time RFI was closed e.g. `2017-01-12T17:09:15Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `connect_export_origin`: object - Export origin information for RFIs received via cross-account collaboration. Null for RFIs not received via export.
  - `source_provider_name`: string - The originating company name (cross-company export) or project name (same-company export). e.g. `SC Subcontractors`
  - `rfi_number`: string - The originating RFI number. Returns "Draft" if the source RFI was a draft at export time. e.g. `RFI-042`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/rfis/{id}

**Show RFI**
Return detailed information about a specified RFI in a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - RFI ID

Response 200 (application/json): object

- `accepted`: boolean - RFI Acceptance status, true means the RFI is accepted and closed e.g. `false`
- `ball_in_court_role`: string - Ball in Court Role (can be Assignees, Creator, or RFI Manager) e.g. `assignees`
- `created_by`: object - User who created the RFI.
  - `id`: integer (required) - Unique identifier for the user's login information. e.g. `161072`
  - `login`: string (required) - User email address. e.g. `carl.contractor@example.com`
  - `name`: string (required) - User's first and last name without their company name. e.g. `Carl the Contractor`
  - `locale`: string - User locale. e.g. `en-US`
  - `vendor`: object - Company associated with the creator, or null when the creator has no company.
    - `id`: integer (required) - Unique identifier for the vendor. e.g. `12345`
    - `name`: string (required) - Vendor name. e.g. `SID Architecture`
- `custom_textfield_1`: object - Custom RFI text field 1
  - `label`: string - Project label for RFI custom text field 1
  - `value`: string - Value for RFI custom text field 1
- `custom_textfield_2`: object - Custom RFI text field 2
  - `label`: string - Project label for RFI custom text field 2
  - `value`: string - Value for RFI custom text field 2
- `distribution_list`: array of object - RFI Distribution List of Users
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `draft`: boolean - Draft status, true if draft e.g. `false`
- `drawing_ids`: array of integer - Array of IDs for associated Drawings
- `drawing_number`: string - Drawing Number e.g. `107.3D`
- `questions`: array of object - List of questions
  - `id`: integer - ID
  - `question_date`: string(date-time) - Date e.g. `2016-08-02T20:49:35Z`
  - `plain_text_body`: string - Plain text body e.g. `Are the items listed on Schedule C acceptable?`
  - `rich_text_body`: string - Rich text body e.g. `<p>Are the items listed on Schedule C acceptable?</p>`
  - `created_by`: string - Creator name e.g. `Joseph Shabadoo`
  - `attachments`: array of object - Attachments
    - `id`: integer
    - `name`: string - Use :name, :filename to be deprecated
    - `url`: string
    - `filename`: string - :filename to be deprecated, use :name
  - `answers`: array of object - Answers
    - `id`: integer - ID e.g. `999`
    - `official`: boolean - Official response, true if official e.g. `true`
    - `answer_date`: string(date-time) - Date e.g. `2016-08-29T14:37:22Z`
    - `plain_text_body`: string - Plain text body e.g. `No, they need to follow the guidelines on Schedule D`
    - `rich_text_body`: string - Rich text body e.g. `<p>No, they need to follow the guidelines on Schedule D</p>`
    - `created_by`: string - Creator name e.g. `Jane Doe`
    - `created_by_id`: integer - Creator ID e.g. `42`
    - `attachments`: array of object - Attachments
- `specification_section`: object
  - `id`: integer - ID
  - `description`: string - Description
  - `number`: string - Number
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `id`: integer - ID e.g. `999`
- `assignee`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `assignees`: array of object - RFI Assignees
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `ball_in_court`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `ball_in_courts`: array of object - Ball In Courts
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `cost_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
  - `value`: string - Cost impact value in dollars e.g. `12039.55`
- `created_at`: string(date-time) - Date created e.g. `2016-08-23T15:23:57Z`
- `deleted`: boolean - Deleted status (this is only shown on deleted records) e.g. `true`
- `deleted_at`: string(date-time) - Time deleted (this is only shown on deleted records) e.g. `2016-08-23T15:23:57Z`
- `due_date`: string(date) - Due Date e.g. `2017-01-18`
- `initiated_at`: string(date-time) - Date initiated e.g. `2016-08-23T15:23:57Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `full_number`: string - Full Number e.g. `C-1477`
- `number`: string - Number e.g. `1477`
- `prefix`: string - Prefix e.g. `C`
- `private`: boolean - Private Status e.g. `true`
- `received_from`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `reference`: string - Reference e.g. `Schedule C`
- `responsible_contractor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `rfi_manager`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `schedule_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
  - `value`: integer - Schedule impact value in days e.g. `14`
- `status`: string enum[open, closed, draft, closed_with_revision, closed_draft] - Status e.g. `open`
- `translated_status`: string - Translated RFI status e.g. `Abierto`
- `subject`: string - Subject e.g. `Specifications [99 14.44B]`
- `revision`: string - Revision Number e.g. `5`
- `source_rfi_header_id`: integer - The ID of The Root RFI Revision e.g. `12345`
- `current_revision`: boolean - Designate whether or not this RFI is the latest revision e.g. `true`
- `has_revisions`: boolean - Designate whether or not this RFI has other revisions e.g. `true`
- `time_resolved`: string(date-time) - Time RFI was closed e.g. `2017-01-12T17:09:15Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `connect_export_origin`: object - Export origin information for RFIs received via cross-account collaboration. Null for RFIs not received via export.
  - `source_provider_name`: string - The originating company name (cross-company export) or project name (same-company export). e.g. `SC Subcontractors`
  - `rfi_number`: string - The originating RFI number. Returns "Draft" if the source RFI was a draft at export time. e.g. `RFI-042`
- `connect_exported_project_ids`: array of integer - IDs of connected projects to which this RFI has already been exported. Use this list with connected project permissions to identify prior export destinations and avoid offering duplicate export targets.

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/rfis/{id}

**Update RFI**
Updates a specified RFI in a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - RFI ID
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `rfi`: object (required)
  - `subject`: string - The Subject of the RFI e.g. `Wall Color`
  - `reference`: string - The Reference of the RFI e.g. `Color of the kitchen wall`
  - `accepted`: boolean - The Accepted status of the RFI - closes or opens an RFI e.g. `false`
  - `assignee_id`: integer - The ID of the Assignee User. Note: not required if the creator is an admin and the RFI is a draft. *Only admin users can set this field DEPRECATED. Please use assignee_ids instead
  - `assignee_ids`: array of integer - An array of IDs of the Assignees of the RFI *Only admin users can set this field **If this param is not provided, the assigned_id will be used instead e.g. `[123, 456]`
  - `required_assignee_ids`: array of integer - An array of IDs of the Assignees that are required to respond to the RFI * Only admin users can set this field ** IDs must also be present in assignee_ids e.g. `[123, 456]`
  - `ball_in_court_id`: integer - The ID of the Ball in Court of the RFI. This field is DEPRECATED as of March 31, 2019 and will no longer be supported as of October 1, 2019.
  - `draft`: boolean - The Draft status of the RFI (Can only be changed on draft RFIs) e.g. `false`
  - `due_date`: string(date) - The Due Date of the RFI *Only admin users can set this field e.g. `2021-07-26`
  - `received_from_login_information_id`: integer - The ID of the Received From User of the RFI e.g. `123`
  - `responsible_contractor_id`: integer - The ID of the Responsible Contractor Vendor of the RFI e.g. `123`
  - `distribution_ids`: array of integer - An array of IDs of the Distributions of the RFI e.g. `[123, 456]`
  - `number`: string - The Number of the RFI *This field will be auto-populated if the RFI is not draft e.g. `1234`
  - `private`: boolean - The Private status of the RFI e.g. `false`
  - `project_stage_id`: integer - The ID of the Project Stage of the RFI *If Number By Stage is enabled in RFI settings, this will add the prefix of the project stage to the full number of the RFI. e.g. `42`
  - `schedule_impact`: object - The Schedule Impact of the RFI
    - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - The Status of the Schedule Impact e.g. `yes_known`
    - `value`: integer - The Value in days of the Schedule Impact e.g. `0`
  - `cost_impact`: object - The Cost Impact of the RFI
    - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - The Status of the Cost Impact e.g. `yes_known`
    - `value`: number(float) - Cost impact value in dollars e.g. `12039.55`
  - `location_id`: integer - The ID of the Location of the RFI e.g. `123`
  - `drawing_number`: string - The Drawing Number of the RFI e.g. `1A`
  - `specification_section_id`: integer - The ID of the Specification Section of the RFI e.g. `123`
  - `cost_code_id`: integer - The ID of the Cost Code of the RFI e.g. `123`
  - `rfi_manager_id`: integer - The ID of the RFI Manager User of the RFI *Only admin users (or standard users, if the project's configuration allows for it) can set this field e.g. `123`
  - `question`: object - The Question of the RFI
    - `body`: string (required) - The Body of the Question e.g. `What color should the kitchen wall be?`
    - `prostore_file_ids`: array of integer - An array of Prostore File IDs. The Prostore Files will be associated with the RFI as attachments. e.g. `[6, 7]`
    - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
    - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
    - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
    - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
    - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
    - `document_management_document_revision_ids`: array of string - Document Management Document Revisions to attach to the response e.g. `["5c9800d3-bd12-45dd-a280-85fe887858b2", "da4b5e3b-ddaf-406f-8b2c-dceb6a60a203"]`
  - `custom_textfield_1`: string - The Custom Textfield 1 of the RFI
  - `custom_textfield_2`: string - The Custom Textfield 2 of the RFI
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `accepted`: boolean - RFI Acceptance status, true means the RFI is accepted and closed e.g. `false`
- `ball_in_court_role`: string - Ball in Court Role (can be Assignees, Creator, or RFI Manager) e.g. `assignees`
- `created_by`: object - User who created the RFI.
  - `id`: integer (required) - Unique identifier for the user's login information. e.g. `161072`
  - `login`: string (required) - User email address. e.g. `carl.contractor@example.com`
  - `name`: string (required) - User's first and last name without their company name. e.g. `Carl the Contractor`
  - `locale`: string - User locale. e.g. `en-US`
  - `vendor`: object - Company associated with the creator, or null when the creator has no company.
    - `id`: integer (required) - Unique identifier for the vendor. e.g. `12345`
    - `name`: string (required) - Vendor name. e.g. `SID Architecture`
- `custom_textfield_1`: object - Custom RFI text field 1
  - `label`: string - Project label for RFI custom text field 1
  - `value`: string - Value for RFI custom text field 1
- `custom_textfield_2`: object - Custom RFI text field 2
  - `label`: string - Project label for RFI custom text field 2
  - `value`: string - Value for RFI custom text field 2
- `distribution_list`: array of object - RFI Distribution List of Users
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `draft`: boolean - Draft status, true if draft e.g. `false`
- `drawing_ids`: array of integer - Array of IDs for associated Drawings
- `drawing_number`: string - Drawing Number e.g. `107.3D`
- `questions`: array of object - List of questions
  - `id`: integer - ID
  - `question_date`: string(date-time) - Date e.g. `2016-08-02T20:49:35Z`
  - `plain_text_body`: string - Plain text body e.g. `Are the items listed on Schedule C acceptable?`
  - `rich_text_body`: string - Rich text body e.g. `<p>Are the items listed on Schedule C acceptable?</p>`
  - `created_by`: string - Creator name e.g. `Joseph Shabadoo`
  - `attachments`: array of object - Attachments
    - `id`: integer
    - `name`: string - Use :name, :filename to be deprecated
    - `url`: string
    - `filename`: string - :filename to be deprecated, use :name
  - `answers`: array of object - Answers
    - `id`: integer - ID e.g. `999`
    - `official`: boolean - Official response, true if official e.g. `true`
    - `answer_date`: string(date-time) - Date e.g. `2016-08-29T14:37:22Z`
    - `plain_text_body`: string - Plain text body e.g. `No, they need to follow the guidelines on Schedule D`
    - `rich_text_body`: string - Rich text body e.g. `<p>No, they need to follow the guidelines on Schedule D</p>`
    - `created_by`: string - Creator name e.g. `Jane Doe`
    - `created_by_id`: integer - Creator ID e.g. `42`
    - `attachments`: array of object - Attachments
- `specification_section`: object
  - `id`: integer - ID
  - `description`: string - Description
  - `number`: string - Number
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `id`: integer - ID e.g. `999`
- `assignee`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `assignees`: array of object - RFI Assignees
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `ball_in_court`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `ball_in_courts`: array of object - Ball In Courts
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `cost_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
  - `value`: string - Cost impact value in dollars e.g. `12039.55`
- `created_at`: string(date-time) - Date created e.g. `2016-08-23T15:23:57Z`
- `deleted`: boolean - Deleted status (this is only shown on deleted records) e.g. `true`
- `deleted_at`: string(date-time) - Time deleted (this is only shown on deleted records) e.g. `2016-08-23T15:23:57Z`
- `due_date`: string(date) - Due Date e.g. `2017-01-18`
- `initiated_at`: string(date-time) - Date initiated e.g. `2016-08-23T15:23:57Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `full_number`: string - Full Number e.g. `C-1477`
- `number`: string - Number e.g. `1477`
- `prefix`: string - Prefix e.g. `C`
- `private`: boolean - Private Status e.g. `true`
- `received_from`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `reference`: string - Reference e.g. `Schedule C`
- `responsible_contractor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `rfi_manager`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `schedule_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
  - `value`: integer - Schedule impact value in days e.g. `14`
- `status`: string enum[open, closed, draft, closed_with_revision, closed_draft] - Status e.g. `open`
- `translated_status`: string - Translated RFI status e.g. `Abierto`
- `subject`: string - Subject e.g. `Specifications [99 14.44B]`
- `revision`: string - Revision Number e.g. `5`
- `source_rfi_header_id`: integer - The ID of The Root RFI Revision e.g. `12345`
- `current_revision`: boolean - Designate whether or not this RFI is the latest revision e.g. `true`
- `has_revisions`: boolean - Designate whether or not this RFI has other revisions e.g. `true`
- `time_resolved`: string(date-time) - Time RFI was closed e.g. `2017-01-12T17:09:15Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `connect_export_origin`: object - Export origin information for RFIs received via cross-account collaboration. Null for RFIs not received via export.
  - `source_provider_name`: string - The originating company name (cross-company export) or project name (same-company export). e.g. `SC Subcontractors`
  - `rfi_number`: string - The originating RFI number. Returns "Draft" if the source RFI was a draft at export time. e.g. `RFI-042`
- `connect_exported_project_ids`: array of integer - IDs of connected projects to which this RFI has already been exported. Use this list with connected project permissions to identify prior export destinations and avoid offering duplicate export targets.

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/rfis/{id}.pdf

**Show RFI in PDF format**
Return detailed information (as a PDF) about a specified RFI in a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - RFI ID
- `only_official` [query] boolean - If true, include only official responses; if false return all responses.

Error responses: 302, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/rfis/{id}/recycle

**Recycle RFI**
Send a specified RFI to the Recycle Bin.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - RFI ID

Response 200: OK (no body)

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/rfis/{id}/retrieve

**Retrieve Recycled RFI**
Retrieve a specified RFI from the Recycle Bin.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - RFI ID

Response 200: OK (no body)

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/rfis/export  **[OLDER VERSION - a newer path version exists below/above]**

**Download RFIs List**
Downloads a PDF or CSV of the RFIs List

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[query]` [query] string - Search Query
- `export_format` [query] string enum[pdf, csv] - File format for the export - 'pdf' or 'csv'.
- `table_configuration_for_export` [query] object - Table configuration for the export that controls which columns are visible and their order in the generated PDF or CSV. When provided, the export will respect both the column visibility settings and the column order f...

Response 200 (application/json): string


Response 202: Accepted (no body)

Error responses: 400 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/rfis/{id}/advance_ball_in_court  **[BETA / OLDER VERSION - a newer path version exists below/above]**

**Update Advance Ball in Court**
Advances the ball in court to the specified ball in court.
The RFI Manager can move ball in court between the RFI Manager and the Assignee.
The Assignee can move the ball in court back to the RFI Manager, if the Assignee has responded.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - RFI ID

Response 200 (application/json): object

- `created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `link`: string(url) - Web link to resource e.g. `https://app.procore.com/123456/project/rfi/show/123456`
- `location_id`: integer - ID of the associated Location e.g. `999`
- `specification_section_id`: integer - ID of the associated Specification Section e.g. `999`
- `questions`: array of object - RFI Questions
  - `id`: integer - ID e.g. `999`
  - `body`: string - Body e.g. `<p>Are the items listed on Schedule C acceptable?</p>`
  - `errors`: array of object - Errors
    - `errors`: string
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `id`: integer - ID e.g. `999`
- `assignee`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `assignees`: array of object - RFI Assignees
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
  - `locale`: string - User locale e.g. `en`
  - `response_required`: boolean - Designate whether or not the assignee is required to respond e.g. `true`
- `ball_in_court`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `ball_in_courts`: array of object - Ball In Courts
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `cost_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
  - `value`: number(float) - Cost impact value in dollars e.g. `12039.55`
- `created_at`: string(date-time) - Date created e.g. `2016-08-23T15:23:57Z`
- `deleted`: boolean - Deleted status (this is only shown on deleted records) e.g. `true`
- `deleted_at`: string(date-time) - Time deleted (this is only shown on deleted records) e.g. `2016-08-23T15:23:57Z`
- `due_date`: oneOf(string(date) | string(date-time)) - Due Date e.g. `2017-01-18`
- `initiated_at`: string(date-time) - Date initiated e.g. `2016-08-23T15:23:57Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `full_number`: string - Full Number e.g. `C-1477`
- `number`: string - Number e.g. `1477`
- `prefix`: string - Prefix e.g. `C`
- `private`: boolean - Private Status e.g. `true`
- `project_stage`: object
  - `id`: integer - ID e.g. `12345`
  - `default_stage`: boolean - Default Stage e.g. `true`
  - `dependent_projects`: integer - Dependent Projects count e.g. `0`
  - `formatted_name`: string - Formatted Name e.g. `Course of Construction`
  - `formatted_parent_name`: string - Formatted Parent Name e.g. `Course of Construction`
  - `name`: string - Name e.g. `Course of Construction`
  - `parent_id`: integer - Construction Volume Stage ID. Returns null if prefix is linked to a project stage that is the parent. e.g. `12345`
  - `procore_category`: boolean - Indicates whether the project stage the prefix is linked to is a Construction Volume default stage. e.g. `false`
- `received_from`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `reference`: string - Reference e.g. `Schedule C`
- `responsible_contractor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `rfi_manager`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `schedule_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
  - `value`: integer - Schedule impact value e.g. `14`
- `status`: string enum[open, closed, draft, closed_with_revision, closed_draft] - Status e.g. `open`
- `translated_status`: string - Translated RFI status e.g. `Abierto`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `subject`: string - Subject e.g. `Specifications [99 14.44B]`
- `revision`: string - Revision Number e.g. `5`
- `current_revision`: boolean - Designate whether or not this RFI is the latest revision e.g. `true`
- `has_revisions`: boolean - Designate whether or not this RFI has other revisions e.g. `true`
- `source_rfi_header_id`: integer - The ID of The Root RFI Revision e.g. `12345`
- `time_resolved`: string(date-time) - Time RFI was closed e.g. `2017-01-12T17:09:15Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `connect_export_origin`: object - Export origin information for RFIs received via cross-account collaboration. Null for RFIs not received via export.
  - `source_provider_name`: string - The originating company name (cross-company export) or project name (same-company export). e.g. `SC Subcontractors`
  - `rfi_number`: string - The originating RFI number. Returns "Draft" if the source RFI was a draft at export time. e.g. `RFI-042`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/rfis/{id}/forward_for_review  **[OLDER VERSION - a newer path version exists below/above]**

**Update Forward For Review**
Assignee can forward the RFI to a forwardee who becomes a new ball in court.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - RFI ID

Request body (application/json) (required):

- `rfi`: object (required)
  - `forwardee_ids`: array of integer - An array of IDs of the Forwardees of the RFI *Only existing assignees can set this field when ball in court is in Assignees' court **Can only forward to one forwardee

Response 200 (application/json): object

- `created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `link`: string(url) - Web link to resource e.g. `https://app.procore.com/123456/project/rfi/show/123456`
- `location_id`: integer - ID of the associated Location e.g. `999`
- `specification_section_id`: integer - ID of the associated Specification Section e.g. `999`
- `questions`: array of object - RFI Questions
  - `id`: integer - ID e.g. `999`
  - `body`: string - Body e.g. `<p>Are the items listed on Schedule C acceptable?</p>`
  - `errors`: array of object - Errors
    - `errors`: string
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `id`: integer - ID e.g. `999`
- `assignee`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `assignees`: array of object - RFI Assignees
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
  - `locale`: string - User locale e.g. `en`
  - `response_required`: boolean - Designate whether or not the assignee is required to respond e.g. `true`
- `ball_in_court`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `ball_in_courts`: array of object - Ball In Courts
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `cost_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
  - `value`: number(float) - Cost impact value in dollars e.g. `12039.55`
- `created_at`: string(date-time) - Date created e.g. `2016-08-23T15:23:57Z`
- `deleted`: boolean - Deleted status (this is only shown on deleted records) e.g. `true`
- `deleted_at`: string(date-time) - Time deleted (this is only shown on deleted records) e.g. `2016-08-23T15:23:57Z`
- `due_date`: oneOf(string(date) | string(date-time)) - Due Date e.g. `2017-01-18`
- `initiated_at`: string(date-time) - Date initiated e.g. `2016-08-23T15:23:57Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `full_number`: string - Full Number e.g. `C-1477`
- `number`: string - Number e.g. `1477`
- `prefix`: string - Prefix e.g. `C`
- `private`: boolean - Private Status e.g. `true`
- `project_stage`: object
  - `id`: integer - ID e.g. `12345`
  - `default_stage`: boolean - Default Stage e.g. `true`
  - `dependent_projects`: integer - Dependent Projects count e.g. `0`
  - `formatted_name`: string - Formatted Name e.g. `Course of Construction`
  - `formatted_parent_name`: string - Formatted Parent Name e.g. `Course of Construction`
  - `name`: string - Name e.g. `Course of Construction`
  - `parent_id`: integer - Construction Volume Stage ID. Returns null if prefix is linked to a project stage that is the parent. e.g. `12345`
  - `procore_category`: boolean - Indicates whether the project stage the prefix is linked to is a Construction Volume default stage. e.g. `false`
- `received_from`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `reference`: string - Reference e.g. `Schedule C`
- `responsible_contractor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `rfi_manager`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `schedule_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
  - `value`: integer - Schedule impact value e.g. `14`
- `status`: string enum[open, closed, draft, closed_with_revision, closed_draft] - Status e.g. `open`
- `translated_status`: string - Translated RFI status e.g. `Abierto`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `subject`: string - Subject e.g. `Specifications [99 14.44B]`
- `revision`: string - Revision Number e.g. `5`
- `current_revision`: boolean - Designate whether or not this RFI is the latest revision e.g. `true`
- `has_revisions`: boolean - Designate whether or not this RFI has other revisions e.g. `true`
- `source_rfi_header_id`: integer - The ID of The Root RFI Revision e.g. `12345`
- `time_resolved`: string(date-time) - Time RFI was closed e.g. `2017-01-12T17:09:15Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `connect_export_origin`: object - Export origin information for RFIs received via cross-account collaboration. Null for RFIs not received via export.
  - `source_provider_name`: string - The originating company name (cross-company export) or project name (same-company export). e.g. `SC Subcontractors`
  - `rfi_number`: string - The originating RFI number. Returns "Draft" if the source RFI was a draft at export time. e.g. `RFI-042`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## RFIs Default Distribution

Resource id: `rfis-default-distribution`. Raw spec: `../openapi-raw/rfis-default-distribution.json`. Web: https://developers.procore.com/reference/rest/rfis-default-distribution?version=latest
Product lines: PM Starter Pack, PM Essentials

### GET /rest/v1.0/projects/{project_id}/rfis/default_distribution

**List RFI Default Distribution**
Returns a list of contacts that comprise the RFI default distribution

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique integer identifier for this user. Use as a value in the `user_ids` array when updating the default distribution list. e.g. `160586`
- `login`: string - Email address used to log in to Procore. Uniquely identifies the account. e.g. `carl.contractor@example.com`
- `name`: string - Full display name of the user. e.g. `Carl the Contractor`
- `locale`: string - Locale preference of this user (e.g. `en`, `fr`). Null if the user has not set a locale preference. e.g. `en`
- `company_name`: string - Display name of the company this user is associated with. e.g. `Company ABC`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Replies

Resource id: `replies`. Raw spec: `../openapi-raw/replies.json`. Web: https://developers.procore.com/reference/rest/replies?version=latest
Product lines: PM Starter Pack, PM Essentials

### GET /rest/v1.0/projects/{project_id}/rfis/{rfi_id}/replies

**List RFI Replies**
Returns a list of replies for a specified RFI

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `rfi_id` [path] integer (required) - RFI ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique integer identifier for this RFI reply. Use as the `{id}` path parameter to retrieve, update, or delete via the replies endpoints. e.g. `999`
- `official`: boolean - Whether this reply is an official RFI response. Official replies represent the authoritative answer to the RFI question. e.g. `true`
- `answer_date`: string(date-time) - Timestamp when this reply was created, in ISO 8601 format. e.g. `2016-08-29T14:37:22Z`
- `plain_text_body`: string - Plain text content of the reply, with HTML tags stripped. e.g. `No, they need to follow the guidelines on Schedule D`
- `rich_text_body`: string - HTML-formatted content of the reply. e.g. `<p>No, they need to follow the guidelines on Schedule D</p>`
- `created_by`: string - Display name of the user who created this reply, formatted as first name, last name, and company. e.g. `Jane Doe`
- `created_by_id`: integer - Login information ID of the user who created this reply. e.g. `42`
- `attachments`: array of object - List of files attached to this reply.
  - `id`: integer - Unique integer identifier for this attachment.
  - `name`: string - Display name of the attached file.
  - `url`: string - URL to download the attached file.
  - `filename`: string - Duplicate of `name`. Deprecated — use `name` instead. Both fields carry the same value. e.g. `january_receipt_copy.jpg`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/rfis/{rfi_id}/replies

**Create RFI Reply**
Creates a reply for a specified RFI

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `rfi_id` [path] integer (required) - RFI ID

Request body (application/json) (required):

- `reply`: object (required)
  - `body`: string - HTML content of the reply. Rendered as rich text in the RFI interface.
  - `official`: boolean - Whether this reply is an official response. Set to `true` to mark the reply as the official answer to the RFI question.
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`
- `attachments`: array of string - RFI Response Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 201 (application/json): object

- `id`: integer - Unique integer identifier for this RFI reply. Use as the `{id}` path parameter to retrieve, update, or delete via the replies endpoints. e.g. `999`
- `official`: boolean - Whether this reply is an official RFI response. Official replies represent the authoritative answer to the RFI question. e.g. `true`
- `answer_date`: string(date-time) - Timestamp when this reply was created, in ISO 8601 format. e.g. `2016-08-29T14:37:22Z`
- `plain_text_body`: string - Plain text content of the reply, with HTML tags stripped. e.g. `No, they need to follow the guidelines on Schedule D`
- `rich_text_body`: string - HTML-formatted content of the reply. e.g. `<p>No, they need to follow the guidelines on Schedule D</p>`
- `created_by`: string - Display name of the user who created this reply, formatted as first name, last name, and company. e.g. `Jane Doe`
- `created_by_id`: integer - Login information ID of the user who created this reply. e.g. `42`
- `attachments`: array of object - List of files attached to this reply.
  - `id`: integer - Unique integer identifier for this attachment.
  - `name`: string - Display name of the attached file.
  - `url`: string - URL to download the attached file.
  - `filename`: string - Duplicate of `name`. Deprecated — use `name` instead. Both fields carry the same value. e.g. `january_receipt_copy.jpg`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/rfis/{rfi_id}/replies/{id}

**Show RFI Reply**
Returns detailed information on a specified RFI reply

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `rfi_id` [path] integer (required) - RFI ID
- `id` [path] integer (required) - Reply ID

Response 200 (application/json): object

- `id`: integer - Unique integer identifier for this RFI reply. Use as the `{id}` path parameter to retrieve, update, or delete via the replies endpoints. e.g. `999`
- `official`: boolean - Whether this reply is an official RFI response. Official replies represent the authoritative answer to the RFI question. e.g. `true`
- `answer_date`: string(date-time) - Timestamp when this reply was created, in ISO 8601 format. e.g. `2016-08-29T14:37:22Z`
- `plain_text_body`: string - Plain text content of the reply, with HTML tags stripped. e.g. `No, they need to follow the guidelines on Schedule D`
- `rich_text_body`: string - HTML-formatted content of the reply. e.g. `<p>No, they need to follow the guidelines on Schedule D</p>`
- `created_by`: string - Display name of the user who created this reply, formatted as first name, last name, and company. e.g. `Jane Doe`
- `created_by_id`: integer - Login information ID of the user who created this reply. e.g. `42`
- `attachments`: array of object - List of files attached to this reply.
  - `id`: integer - Unique integer identifier for this attachment.
  - `name`: string - Display name of the attached file.
  - `url`: string - URL to download the attached file.
  - `filename`: string - Duplicate of `name`. Deprecated — use `name` instead. Both fields carry the same value. e.g. `january_receipt_copy.jpg`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/rfis/{rfi_id}/replies/{id}

**Update RFI Reply**
Updates a specified RFI reply

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `rfi_id` [path] integer (required) - RFI ID
- `id` [path] integer (required) - Reply ID

Request body (application/json) (required):

- `reply`: object (required)
  - `official`: boolean - Whether this reply is an official response. Set to `true` to mark the reply as the official answer to the RFI question.

Response 200 (application/json): object

- `id`: integer - Unique integer identifier for this RFI reply. Use as the `{id}` path parameter to retrieve, update, or delete via the replies endpoints. e.g. `999`
- `official`: boolean - Whether this reply is an official RFI response. Official replies represent the authoritative answer to the RFI question. e.g. `true`
- `answer_date`: string(date-time) - Timestamp when this reply was created, in ISO 8601 format. e.g. `2016-08-29T14:37:22Z`
- `plain_text_body`: string - Plain text content of the reply, with HTML tags stripped. e.g. `No, they need to follow the guidelines on Schedule D`
- `rich_text_body`: string - HTML-formatted content of the reply. e.g. `<p>No, they need to follow the guidelines on Schedule D</p>`
- `created_by`: string - Display name of the user who created this reply, formatted as first name, last name, and company. e.g. `Jane Doe`
- `created_by_id`: integer - Login information ID of the user who created this reply. e.g. `42`
- `attachments`: array of object - List of files attached to this reply.
  - `id`: integer - Unique integer identifier for this attachment.
  - `name`: string - Display name of the attached file.
  - `url`: string - URL to download the attached file.
  - `filename`: string - Duplicate of `name`. Deprecated — use `name` instead. Both fields carry the same value. e.g. `january_receipt_copy.jpg`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/rfis/{rfi_id}/replies/{id}

**Delete an RFI Response**
Deletes a specified response associated with a specified RFI and specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `rfi_id` [path] integer (required) - RFI ID
- `id` [path] integer (required) - Reply ID

Response 200: Successfully deleted responses (no body)

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

