# Procore API: Coordination Issues (Project Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Coordination Issues)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Coordination Issue Activities](#coordination-issue-activities) - versions 1.0
- [Coordination Issue Activity Feed](#coordination-issue-activity-feed) - versions 1.0
- [Coordination Issue Assignment](#coordination-issue-assignment) - versions 1.0
- [Coordination Issue Attachment](#coordination-issue-attachment) - versions 1.0
- [Coordination Issue Change History](#coordination-issue-change-history) - versions 1.0
- [Coordination Issue Counts](#coordination-issue-counts) - versions 1.0
- [Coordination Issue Document Snapshots](#coordination-issue-document-snapshots) - versions 2.0
- [Coordination Issue Export](#coordination-issue-export) - versions 1.0
- [Coordination Issue Filter Options](#coordination-issue-filter-options) - versions 1.0
- [Coordination Issue Potential Assignees](#coordination-issue-potential-assignees) - versions 1.0
- [Coordination Issue Procore Item Associations](#coordination-issue-procore-item-associations) - versions 1.0
- [Coordination Issue Recycle Bin](#coordination-issue-recycle-bin) - versions 1.0
- [Coordination Issue Status Changes](#coordination-issue-status-changes) - versions 1.0
- [Coordination Issue Status Totals](#coordination-issue-status-totals) - versions 1.0
- [Coordination Issue Sync](#coordination-issue-sync) - versions 1.0
- [Coordination Issue Viewpoints](#coordination-issue-viewpoints) - versions 2.0
- [Coordination Issues](#coordination-issues) - versions 2.0, 1.0
- [Coordination Issues Workflow Issues](#coordination-issues-workflow-issues) - versions 2.0

## Coordination Issue Activities

Resource id: `coordination-issue-activities`. Raw spec: `../openapi-raw/coordination-issue-activities.json`. Web: https://developers.procore.com/reference/rest/coordination-issue-activities?version=latest
Product lines: Design Coordination

### GET /rest/v1.0/coordination_issue_activities

**List Coordination Issue Activities**
Lists activities in coordination issues associated with the specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[coordination_issue_id][]` [query] array of integer - Filter item(s) with coordination issues.
- `view` [query] string enum[compact, normal, extended] - The compact view contains only ids. The extended view contains the response shown below. The normal view contains all attributes in extended view except activity_details. The default view is normal.
- `filters[include_deleted]` [query] string enum[only, with] - Use 'only' for only deleted resources. Use 'with' for deleted and undeleted resources.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for the coordination issue activity. e.g. `101`
- `coordination_issue_id`: integer - Coordination Issue ID e.g. `86`
- `type`: string - Activity Type. e.g. `comment`
- `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
- `updated_at`: string(date-time) - Updated date e.g. `2018-04-19T09:36:42Z`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Coordination Issue Activity Feed

Resource id: `coordination-issue-activity-feed`. Raw spec: `../openapi-raw/coordination-issue-activity-feed.json`. Web: https://developers.procore.com/reference/rest/coordination-issue-activity-feed?version=latest
Product lines: Design Coordination

### GET /rest/v1.0/coordination_issue_activities/feed

**List Coordination Issue Activity Feed Items**
Lists activity feed items in coordination issues associated with the specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[coordination_issue_id][]` [query] array of integer - Filter item(s) with coordination issues.
- `filters[include_deleted]` [query] string enum[only, with] - Use 'only' for only deleted resources. Use 'with' for deleted and undeleted resources.

Response 200 (application/json): array of anyOf(object | object | object | object)


Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Coordination Issue Assignment

Resource id: `coordination-issue-assignment`. Raw spec: `../openapi-raw/coordination-issue-assignment.json`. Web: https://developers.procore.com/reference/rest/coordination-issue-assignment?version=latest
Product lines: Design Coordination

### POST /rest/v1.0/coordination_issues/{coordination_issue_id}/assignments

**Create Coordination Issue Assignment**
Create a Coordination Issue Assignment, which executes a series of actions that updates
coordination issue assignee_id and creates an instance of CoordinationIssueActivity.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `coordination_issue_id` [path] integer (required) - Coordination Issue ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `12345`
- `coordination_issue_assignment`: object (required)
  - `assignee_id`: integer (required) - ID of Procore user that should be assigned the issue e.g. `624`

Response 201 (application/json): object

- `id`: integer - Unique identifier for the coordination issue assignment. e.g. `101`
- `coordination_issue_id`: integer - Coordination Issue ID e.g. `86`
- `old_assignee_id`: integer - Coordination Issue Assignee ID before the change e.g. `99`
- `new_assignee_id`: integer - Coordination Issue Assignee ID after the change e.g. `199`
- `created_by_id`: integer - ID of the user responsible for the reassignment e.g. `199`
- `created_at`: string(date-time) - Created date e.g. `2019-05-14T14:39:36Z`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Coordination Issue Attachment

Resource id: `coordination-issue-attachment`. Raw spec: `../openapi-raw/coordination-issue-attachment.json`. Web: https://developers.procore.com/reference/rest/coordination-issue-attachment?version=latest
Product lines: Design Coordination

### DELETE /rest/v1.0/coordination_issues/{coordination_issue_id}/attachments/{id}

**Delete Coordination Issue Attachment**
Delete a Coordination Issue Attachment.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `coordination_issue_id` [path] integer (required) - Coordination Issue ID
- `id` [path] integer (required) - Attachment ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 204: No Content (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Coordination Issue Change History

Resource id: `coordination-issue-change-history`. Raw spec: `../openapi-raw/coordination-issue-change-history.json`. Web: https://developers.procore.com/reference/rest/coordination-issue-change-history?version=latest
Product lines: Design Coordination

### GET /rest/v1.0/coordination_issues/{id}/change_history

**List Coordination Issue Change History**
This endpoint returns the change history for the specified CoordinationIssue. The change history is sorted by most recent first.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Coordination Issue ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `view` [query] string enum[compact, normal, extended] - The extended view provides what is shown below. The normal view is the same as the extended view but excludes attribute created_by. The compact view returns ids only. The default view is normal.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for the change history entry. e.g. `101`
- `column`: string - Name of the column changed e.g. `assignee_id`
- `readable_column`: string - Localized readable name of the column changed e.g. `Assignee`
- `old_value`: string - Value of the column before change e.g. `The original title`
- `new_value`: string - Value of the column after change e.g. `The updated title`
- `created_by`: object
  - `id`: integer - The unique identifier of the user. e.g. `160586`
  - `login`: string - The email address of the user that is used to log in. e.g. `carl.contractor@example.com`
  - `name`: string - The name of the user. e.g. `Carl the Contractor`
  - `company_name`: string - User's Company Name e.g. `Company ABC`
- `created_at`: string(date-time) - Created date e.g. `2018-05-08T13:21:20Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Coordination Issue Counts

Resource id: `coordination-issue-counts`. Raw spec: `../openapi-raw/coordination-issue-counts.json`. Web: https://developers.procore.com/reference/rest/coordination-issue-counts?version=latest
Product lines: Design Coordination

### GET /rest/v1.0/coordination_issues/status_count

**List Grouped Coordination Issue Status Count**
This endpoint returns the status counts for Coordination Issues in a project.
The counts provide information about how the issues are distributed by location and assignee company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `filters[group_by]` [query] string enum[assignee_company, location] - Attribute to group the returned status counts by.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `group_by`: string - Attribute used for grouping to generate status count e.g. `location`
- `group_id`: integer - Id of the field used for grouping. For e.g. if grouped by location, this will be location id e.g. `148`
- `group_label`: string - Value of the field used for aggregation, for e.g. location name e.g. `Level 01>Kitchen`
- `open_count`: integer - Count of issues with status 'open' e.g. `5`
- `blocked_count`: integer - Count of issues with status 'blocked' e.g. `3`
- `unblocked_count`: integer - Count of issues with status 'unblocked' e.g. `2`
- `ready_for_review_count`: integer - Count of issues with status 'ready_for_review' e.g. `1`
- `moved_to_observation_count`: integer - Count of issues with status 'moved_to_observation' e.g. `1`
- `closed_count`: integer - Count of issues with status 'closed' e.g. `10`
- `in_progress_count`: integer - Count of issues with status 'in_progress' e.g. `4`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Coordination Issue Document Snapshots

Resource id: `coordination-issue-document-snapshots`. Raw spec: `../openapi-raw/coordination-issue-document-snapshots.json`. Web: https://developers.procore.com/reference/rest/coordination-issue-document-snapshots?version=latest
Product lines: Design Coordination

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues/{coordination_issue_id}/document_snapshots

**List document snapshots for a coordination issue (REST v2.0)**
Returns all document snapshots associated with the coordination issue. Each snapshot
represents a point-in-time capture of a document revision linked to the issue.
The response includes the snapshot metadata (`document_container_id`,
`document_revision_id`, `document_revision_version_id`, `created_at`) and the nested
`prostore_file` object with file URL, name, content type, and viewable status.
No pagination — all snapshots for the issue are returned in a single response.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `coordination_issue_id` [path] string (required) - Coordination Issue ID (numeric)

Response 200 (application/json): object

- `data`: array of object (required)
  - `id`: string (required) - Document snapshot record id. e.g. `42`
  - `document_container_id`: string - The document container (folder) the source document belongs to. e.g. `1001`
  - `document_name`: string - Human-readable name of the source document. Surfaced as the coordination issue's source file for outside-workflow (document snapshot) issues. May be null for snapshots created before this field existed. e.g. `Floor Plan.pdf`
  - `document_revision_id`: string - The document revision id from which the snapshot was taken. e.g. `2001`
  - `document_revision_version_id`: string - The specific document revision version id for this snapshot. e.g. `3001`
  - `created_at`: string(date-time) - Timestamp when the snapshot was created. e.g. `2026-03-30T12:00:00Z`
  - `prostore_file`: object - Prostore file object (`ProstoreFileBlueprint` view `:normal_with_viewable`). Contains the snapshot image file details including a signed URL, content type, and whether the file is viewable.
    - `id`: string - Prostore file id. e.g. `5001`
    - `name`: string - File name. e.g. `snapshot.png`
    - `url`: string(uri) - Signed download URL for the snapshot file. e.g. `https://api.procore.com/fas/...`
    - `content_type`: string - MIME content type. e.g. `image/png`
    - `viewable`: boolean - Whether this file has a viewable document representation. e.g. `true`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues/{coordination_issue_id}/document_snapshots

**Create a document snapshot on a coordination issue (REST v2.0)**
Creates a new document snapshot linked to the coordination issue. The `snapshot_upload_uuid`
must reference a previously uploaded file (via the Procore upload flow).
The `DocumentSnapshotCreator` service creates a `ProstoreFile` from the upload UUID
using `ProstoreFileCreator`. The snapshot record is then created with the resolved
file and the provided document container/revision identifiers.
A uniqueness constraint prevents duplicate snapshots for the same `prostore_file` on the
same coordination issue (scoped to non-deleted records).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `coordination_issue_id` [path] string (required) - Coordination Issue ID (numeric)

Request body (application/json) (required):

- `snapshot_upload_uuid`: string(uuid) (required) - UUID of the previously uploaded snapshot file. The server creates the corresponding `ProstoreFile` using `ProstoreFileCreator`. e.g. `7b3c8752-e03e-417f-bb57-46bb5aca1139`
- `document_container_id`: string (required) - The document container (folder) the source document belongs to. e.g. `1001`
- `document_name`: string - Human-readable name of the source document. Surfaced as the coordination issue's source file for outside-workflow (document snapshot) issues. Optional; limited to 255 characters by a database check constraint. e.g. `Floor Plan.pdf`
- `document_revision_id`: string (required) - The document revision id from which the snapshot was taken. e.g. `2001`
- `document_revision_version_id`: string - The specific document revision version id for this snapshot (optional). e.g. `3001`

Response 201 (application/json): object

- `data`: object (required) - Rendered by `CoordinationIssueDocumentSnapshotBlueprint` view `:normal`. Represents a point-in-time snapshot image of a document revision linked to a coordination issue. The `prostore_file` nested object provides the ...
  - `id`: string (required) - Document snapshot record id. e.g. `42`
  - `document_container_id`: string - The document container (folder) the source document belongs to. e.g. `1001`
  - `document_name`: string - Human-readable name of the source document. Surfaced as the coordination issue's source file for outside-workflow (document snapshot) issues. May be null for snapshots created before this field existed. e.g. `Floor Plan.pdf`
  - `document_revision_id`: string - The document revision id from which the snapshot was taken. e.g. `2001`
  - `document_revision_version_id`: string - The specific document revision version id for this snapshot. e.g. `3001`
  - `created_at`: string(date-time) - Timestamp when the snapshot was created. e.g. `2026-03-30T12:00:00Z`
  - `prostore_file`: object - Prostore file object (`ProstoreFileBlueprint` view `:normal_with_viewable`). Contains the snapshot image file details including a signed URL, content type, and whether the file is viewable.
    - `id`: string - Prostore file id. e.g. `5001`
    - `name`: string - File name. e.g. `snapshot.png`
    - `url`: string(uri) - Signed download URL for the snapshot file. e.g. `https://api.procore.com/fas/...`
    - `content_type`: string - MIME content type. e.g. `image/png`
    - `viewable`: boolean - Whether this file has a viewable document representation. e.g. `true`

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues/{coordination_issue_id}/document_snapshots/{id}

**Update a document snapshot on a coordination issue (REST v2.0)**
Updates the document snapshot by replacing the existing `ProstoreFile` with a new one
created from the provided `snapshot_upload_uuid`. The old `ProstoreFile` is destroyed
after the snapshot is updated.
The `DocumentSnapshotUpdater` service validates the upload UUID, creates a new
`ProstoreFile` using `ProstoreFileCreator`, updates the snapshot record, and then
destroys the old file.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `coordination_issue_id` [path] string (required) - Coordination Issue ID (numeric)
- `id` [path] string (required) - Document Snapshot ID (numeric)

Request body (application/json) (required):

- `snapshot_upload_uuid`: string(uuid) (required) - UUID of the new uploaded snapshot file. The server creates a new `ProstoreFile` from this upload, replaces the existing file on the snapshot, and destroys the old `ProstoreFile`. e.g. `8c4d9863-f14f-528a-cc68-57cc6bdb2240`
- `document_name`: string - Human-readable name of the source document. Optional; when provided it updates the snapshot's stored name. Limited to 255 characters by a database check constraint. e.g. `Updated Plan.pdf`

Response 200 (application/json): object

- `data`: object (required) - Rendered by `CoordinationIssueDocumentSnapshotBlueprint` view `:normal`. Represents a point-in-time snapshot image of a document revision linked to a coordination issue. The `prostore_file` nested object provides the ...
  - `id`: string (required) - Document snapshot record id. e.g. `42`
  - `document_container_id`: string - The document container (folder) the source document belongs to. e.g. `1001`
  - `document_name`: string - Human-readable name of the source document. Surfaced as the coordination issue's source file for outside-workflow (document snapshot) issues. May be null for snapshots created before this field existed. e.g. `Floor Plan.pdf`
  - `document_revision_id`: string - The document revision id from which the snapshot was taken. e.g. `2001`
  - `document_revision_version_id`: string - The specific document revision version id for this snapshot. e.g. `3001`
  - `created_at`: string(date-time) - Timestamp when the snapshot was created. e.g. `2026-03-30T12:00:00Z`
  - `prostore_file`: object - Prostore file object (`ProstoreFileBlueprint` view `:normal_with_viewable`). Contains the snapshot image file details including a signed URL, content type, and whether the file is viewable.
    - `id`: string - Prostore file id. e.g. `5001`
    - `name`: string - File name. e.g. `snapshot.png`
    - `url`: string(uri) - Signed download URL for the snapshot file. e.g. `https://api.procore.com/fas/...`
    - `content_type`: string - MIME content type. e.g. `image/png`
    - `viewable`: boolean - Whether this file has a viewable document representation. e.g. `true`

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues/{coordination_issue_id}/document_snapshots/{id}

**Delete a document snapshot from a coordination issue (REST v2.0)**
Soft-deletes the document snapshot (`acts_as_paranoid` — sets `deleted_at`). The snapshot
must belong to the specified coordination issue.
**Success response**: `head :ok` — **HTTP 200** with **no response body**.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `coordination_issue_id` [path] string (required) - Coordination Issue ID (numeric)
- `id` [path] string (required) - Document Snapshot ID (numeric)

Response 200: OK — empty body (Content-Length 0) (no body)

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Coordination Issue Export

Resource id: `coordination-issue-export`. Raw spec: `../openapi-raw/coordination-issue-export.json`. Web: https://developers.procore.com/reference/rest/coordination-issue-export?version=latest
Product lines: Design Coordination

### GET /rest/v1.0/coordination_issues/export

**Download Coordination Issues**
Downloads coordination issues to a file specified by the export format. The items to be exported can be scoped by using filters. BCF export will only export the issues with a snapshot and valid camera data.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `filters[assignee_company_id][]` [query] array of integer - Filter item(s) with matching assignee vendor companies.
- `filters[created_by_company_id][]` [query] array of integer - Filter item(s) with matching created by vendor companies.
- `column_state` [query] array of object - Optional array of column configuration objects from frontend table state. Allows export to respect custom column visibility and ordering. Each object should have a 'field' property with the column name.
- `filters[assignee_id][]` [query] array of integer - Filter item(s) with matching assignees.
- `filters[ids][]` [query] array of integer - Filter item(s) with matching ids.
- `filters[location_id][]` [query] array of integer - Filter item(s) with matching locations.
- `filters[search]` [query] string - Filter item(s) with the matching search query. The search is performed on title and issue number.
- `filters[coordination_issue_file_id][]` [query] array of integer - Filter item(s) with the exact coordination issue file.
- `filters[status][]` [query] array of string enum[open, in_progress, blocked, unblocked, ready_for_review, closed, moved_to_observation] - Filter item(s) with matching status.
- `filters[updated_at]` [query] string - Filter item(s) within a specific updated at iso8601 datetime range.
- `filters[issue_type][]` [query] array of string enum[building_code, clash, client_feedback, constructability, coordination, design_review, existing_condition, requirement_change, other] - Filter item(s) with matching issue_type.
- `filters[priority][]` [query] array of string enum[low, medium, high, critical] - Filter item(s) with matching priority.
- `filters[trade_id][]` [query] array of integer - Filter item(s) with matching trades.
- `filters[overdue]` [query] boolean - Filter item(s) with matching Overdue.
- `view` [query] string enum[pdf, with_activity] - Export View.
- `sort` [query] string enum[closed_date, company_then_status, description, due_date, issue_number, issue_type, location, location_then_created_at, location_then_due_date, location_then_issue_number, location_then_issue_type, location_then_priority, ...] - Sort item(s) by an attribute. The default sort is ascending. To sort in descending order, prepend the sort value with a hyphen character '-'
- `export_format` [query] string enum[bcf, csv, pdf] (required) - Export File Format.

Response 200 (application/json): string


Response 202: Accepted (no body)

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Coordination Issue Filter Options

Resource id: `coordination-issue-filter-options`. Raw spec: `../openapi-raw/coordination-issue-filter-options.json`. Web: https://developers.procore.com/reference/rest/coordination-issue-filter-options?version=latest
Product lines: Design Coordination

### GET /rest/v1.0/coordination_issues/filter_options

**List Available Filters for Coordination Issues**
Returns the filters available for filtering Coordination Issues.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `locale` [query] string - The locale in which you need the link to your translation file. Ensure it is one of the procore available locales.

Response 200 (application/json): array of object

- `key`: string - Name of the filter field. e.g. `status`
- `value`: string - Localized display name of the filter field. e.g. `Status`
- `endpoint`: string - Path to the endpoint that lists options for this filter. e.g. `/rest/v1.0/coordination_issues/filter_options/status?project_id=1`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/coordination_issues/filter_options/assignee_company_id

**List Assignee Company Filter Options**
Returns a list of available assignee vendor filters that can be used to filter Coordination Issues

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `filters[bim_file_id]` [query] integer - Filter item(s) with matching BIM File ids
- `locale` [query] string - The locale in which you need the link to your translation file. Ensure it is one of the procore available locales.

Response 200 (application/json): array of object

- `key`: integer - Key is the ID of the filter option object e.g. `1`
- `value`: string - Value is the rendered name for the filter option object e.g. `Paper Company`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/coordination_issues/filter_options/created_by_company_id

**List Created By Company Filter Options**
Returns a list of available created by company vendor filters that can be used to filter Coordination Issues

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `filters[bim_file_id]` [query] integer - Filter item(s) with matching BIM File ids
- `locale` [query] string - The locale in which you need the link to your translation file. Ensure it is one of the procore available locales.

Response 200 (application/json): array of object

- `key`: integer - Key is the ID of the filter option object e.g. `1`
- `value`: string - Value is the rendered name for the filter option object e.g. `Paper Company`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/coordination_issues/filter_options/assignee_id

**List Assignee Filter Options**
Returns a list of available assignee filters that can be used to filter Coordination Issues

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `filters[bim_file_id]` [query] integer - Filter item(s) with matching BIM File ids
- `locale` [query] string - The locale in which you need the link to your translation file. Ensure it is one of the procore available locales.

Response 200 (application/json): array of object

- `key`: integer - Key is the ID of the filter option object e.g. `1`
- `value`: string - Value is the rendered name for the filter option object e.g. `Joe the Plumber`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/coordination_issues/filter_options/watcher_id

**List Watcher Filter Options**
Returns a list of available watcher filters that can be used to filter Coordination Issues

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `filters[bim_file_id]` [query] integer - Filter item(s) with matching BIM File ids
- `locale` [query] string - The locale in which you need the link to your translation file. Ensure it is one of the procore available locales.

Response 200 (application/json): array of object

- `key`: integer - Key is the ID of the filter option object e.g. `1`
- `value`: string - Value is the rendered name for the filter option object e.g. `Joe the Plumber`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/coordination_issues/filter_options/created_by_id

**List Creator Filter Options**
Returns a list of available creator filters that can be used to filter Coordination Issues

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `filters[bim_file_id]` [query] integer - Filter item(s) with matching BIM File ids
- `locale` [query] string - The locale in which you need the link to your translation file. Ensure it is one of the procore available locales.

Response 200 (application/json): array of object

- `key`: integer - Key is the ID of the filter option object e.g. `1`
- `value`: string - Value is the rendered name for the filter option object e.g. `Joe the Plumber`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/coordination_issues/filter_options/created_from

**List Creation Source Filter Options**
Returns a list of available creation source filters that can be used to filter Coordination Issues

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `locale` [query] string - The locale in which you need the link to your translation file. Ensure it is one of the procore available locales.

Response 200 (application/json): array of object

- `key`: string - Key is the ID of the filter option object e.g. `navisworks`
- `value`: string - Value is the rendered name for the filter option object e.g. `Navisworks`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/coordination_issues/filter_options/location_id

**List Location Filter Options**
Returns a list of available location filters that can be used to filter Coordination Issues

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `filters[bim_file_id]` [query] integer - Filter item(s) with matching BIM File ids
- `locale` [query] string - The locale in which you need the link to your translation file. Ensure it is one of the procore available locales.

Response 200 (application/json): array of object

- `key`: integer - Key is the ID of the filter option object e.g. `1`
- `value`: string - Value is the rendered name for the filter option object e.g. `Building 1>Level 01`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/coordination_issues/filter_options/coordination_issue_file_id

**List Coordination Issue File Filter Options**
Returns a list of available source file filters that can be used to filter Coordination Issues

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `locale` [query] string - The locale in which you need the link to your translation file. Ensure it is one of the procore available locales.

Response 200 (application/json): array of object

- `key`: integer - Key is the ID of the filter option object e.g. `1`
- `value`: string - Value is the rendered name for the filter option object e.g. `Master_Coordination_File.nwf`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/coordination_issues/filter_options/status

**List Status Filter Options**
Returns a list of available status filters that can be used to filter Coordination Issues

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `filters[bim_file_id]` [query] integer - Filter item(s) with matching BIM File ids
- `locale` [query] string - The locale in which you need the link to your translation file. Ensure it is one of the procore available locales.

Response 200 (application/json): array of object

- `key`: string - Key name is generally the ID of the filter option object e.g. `open`
- `value`: string - Value is the rendered name for the filter option object e.g. `Open`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Coordination Issue Potential Assignees

Resource id: `coordination-issue-potential-assignees`. Raw spec: `../openapi-raw/coordination-issue-potential-assignees.json`. Web: https://developers.procore.com/reference/rest/coordination-issue-potential-assignees?version=latest
Product lines: Design Coordination

### GET /rest/v1.0/coordination_issues/assignees

**List Coordination Issue Assignable Users**
Lists potential assignees for Coordination Issues. Use the optional `min_access_level` query parameter to filter which project users (by access level on the Coordination Issues domain) are included; see that parameter for allowed values and default behavior.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `min_access_level` [query] string enum[admin, standard, read_only] - Minimum project access level for users included in the assignee list for the Coordination Issues domain. `admin` limits results to Admin (plus project admins per server rules). `standard` includes Standard and Admin. ...

Response 200 (application/json): array of object

- `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
- `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
- `login`: string - User's login email address. e.g. `johndoe@example.com`
- `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
- `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Coordination Issue Procore Item Associations

Resource id: `coordination-issue-procore-item-associations`. Raw spec: `../openapi-raw/coordination-issue-procore-item-associations.json`. Web: https://developers.procore.com/reference/rest/coordination-issue-procore-item-associations?version=latest
Product lines: Design Coordination

### POST /rest/v1.0/coordination_issues/{coordination_issue_id}/procore_item_associations

**Create Procore Item Association**
CoordinationIssue can be associated with other procore items. This API endpoint creates that association.
The extended view provides what is shown below.
The normal view is the same as the extended view but excludes subject and title in item_data.
The compact view returns coordination_issue_id, item_id, and item_type only.
The default view is normal.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `coordination_issue_id` [path] integer (required) - Coordination Issue ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `12345`
- `procore_item`: object - Details of Procore item to be linked to a CoordinationIssue
  - `item_id`: integer (required) - Id of the Procore item to be associated e.g. `1`
  - `item_type`: string enum[rfi] (required) - Type of the Procore item to be associated e.g. `rfi`

Response 200 (application/json): object

- `id`: integer - Unique identifier for this Procore item association. e.g. `101`
- `coordination_issue_id`: integer - ID of the associated Coordination Issue. e.g. `426`
- `coordination_issue_number`: integer - Sequential number of the associated Coordination Issue. e.g. `1`
- `item_id`: integer - Id of the associated Procore item e.g. `1287`
- `item_type`: string - Type of the associated Procore item e.g. `rfi`
- `item_url`: string - Deep-link URL to the associated Procore item e.g. `http://app.procore.com/3664/project/rfi/show/16768`
- `item_data`: object - This field shows data specific to the associated item. If item type is RFI, it will contain attribute subject, number, and has_official_response
  - `has_official_response`: boolean - Whether the associated RFI has an official response. e.g. `true`
  - `subject`: string - Subject of the associated RFI. e.g. `Construction RFI`
  - `number`: string - Number of the associated RFI. e.g. `84`

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/coordination_issues/{coordination_issue_id}/procore_item_associations/{id}

**Delete Procore Item Association**
Delete the association between Coordination Issue and Procore item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `coordination_issue_id` [path] integer (required) - Coordination Issue ID
- `id` [path] integer (required) - Procore Item Association ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `item_type` [query] string enum[rfi] (required) - Type of Procore item

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/procore_item_associations/bulk_destroy

**Bulk Delete Procore Item Associations**
Delete multiple associations between Coordination Issues and Procore items in a single request. This operation can delete associations across multiple coordination issues within the same project.
**Authorization:** Requires admin permission (`delete_coordination_issue`).
**Parameters:** All associations must belong to the specified project. Non-existent association IDs are ignored and returned in the response.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `12345`
- `item_type`: string enum[rfi] (required) - Type of Procore Association Items
- `association_ids`: array of integer (required) - Array of Procore Item Association IDs to delete e.g. `[1, 2, 3]`

Response 204: No Content - All specified associations were successfully deleted (no body)

Error responses: 400, 401, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Coordination Issue Recycle Bin

Resource id: `coordination-issue-recycle-bin`. Raw spec: `../openapi-raw/coordination-issue-recycle-bin.json`. Web: https://developers.procore.com/reference/rest/coordination-issue-recycle-bin?version=latest
Product lines: Design Coordination

### GET /rest/v1.0/coordination_issues/recycle_bin

**List Coordination Issues in Recycle Bin**
Lists all deleted Coordination Issues in the specified project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[assignee_company_id][]` [query] array of integer - Filter item(s) with matching assignee vendor companies.
- `filters[assignee_id][]` [query] array of integer - Filter item(s) with matching assignees.
- `filters[created_by_id][]` [query] array of integer - Filter item(s) with matching User IDs.
- `filters[created_by_company_id][]` [query] array of integer - Filter item(s) with matching created by vendor companies.
- `filters[created_from][]` [query] array of string - Filter item(s) with matching creation source.
- `filters[ids][]` [query] array of integer - Filter item(s) with matching ids.
- `filters[location_id][]` [query] array of integer - Filter item(s) with matching locations.
- `filters[include_sublocations]` [query] boolean - Use together with `filters[location_id]`
- `filters[search]` [query] string - Filter item(s) with the matching search query. The search is performed on title and issue number.
- `filters[coordination_issue_file_id][]` [query] array of integer - Filter item(s) with the exact coordination issue file.
- `filters[status][]` [query] array of string enum[open, in_progress, blocked, unblocked, ready_for_review, closed, moved_to_observation] - Filter item(s) with matching status.
- `filters[issue_type][]` [query] array of string enum[building_code, clash, client_feedback, constructability, coordination, design_review, existing_condition, requirement_change, other] - Filter item(s) with matching issue_type.
- `filters[priority][]` [query] array of string enum[low, medium, high, critical] - Filter item(s) with matching priority.
- `filters[trade_id][]` [query] array of integer - Filter item(s) with matching trades.
- `filters[updated_at]` [query] string - Filter item(s) within a specific updated at iso8601 datetime range.
- `filters[due_date]` [query] string - Filter item(s) within a specific due date iso8601 date range.
- `filters[created_at]` [query] string - Filter item(s) within a specific created at iso8601 datetime range.
- `sort` [query] string enum[closed_date, company_then_status, description, due_date, issue_number, issue_type, location, location_then_created_at, location_then_due_date, location_then_issue_number, location_then_issue_type, location_then_priority, ...] - Sort item(s) by an attribute. The default sort is ascending. To sort in descending order, prepend the sort value with a hyphen character '-'
- `view` [query] string enum[compact, normal, extended] - The compact view contains only ids. The normal view is a subset of the response shown below, and does not include attachments, viewpoints, linked items and updated_by The extended view contains the response shown belo...
- `filters[overdue]` [query] boolean - Filter item(s) with matching Overdue.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `426`
- `uuid`: string - Unique identifier for the issue. This is auto-generated attribute if not provided during issue creation. e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
- `title`: string - Coordination Issue title. The title can have a maximum of 80 characters. e.g. `Plumbing Issue on second floor`
- `description`: string - Coordination Issue description. e.g. `Elaborate details on the plumbing issue`
- `status`: string enum[open, in_progress, blocked, unblocked, ready_for_review, moved_to_observation, closed] - Status of the issue. e.g. `open`
- `issue_number`: integer - Issue Number. A number that can be referred by users to easily identify an issue. Issue number starts from 1 for each project, and is unique per project e.g. `2`
- `creation_source`: string - Coordination Issue can be created from Procore app or a plugin i.e. a source e.g. `navisworks`
- `due_date`: string - Due date of the Coordination Issue. Accepted date formats are "yyyy-mm-dd" and "yyyymmdd" e.g. `2018-08-16`
- `coordination_issue_file`: object - BIM File
  - `id`: integer - ID e.g. `101`
  - `name`: string - Name of the file to be associated to a project e.g. `101_BLDG_FLR_2.NWF`
  - `uuid`: string - Unique UUID associated with the file e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
- `project_id`: number(integer) - Unique identifier for the project. e.g. `29`
- `bim_model_id`: number(integer) - Model ID e.g. `86`
- `comments_count`: number(integer) - Count of comments e.g. `15`
- `issue_type`: string - Issue type of the Coordination Issue e.g. `building_code`
- `priority`: string - Priority of the Coordination Issue e.g. `high`
- `drawing_revision`: object
  - `id`: integer - ID e.g. `662`
  - `title`: string - Formatted title of the drawing revision e.g. `A001: COVER SHEET Rev.0`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `origin`: object - Origin source for a Coordination Issue
  - `title`: string - Title of the origin item e.g. `My BcfTopic`
  - `origin_id`: string - Id of the origin item e.g. `7b3c8752-e03e-417f-bb57-46bb5aca1139`
  - `origin_type`: string - Type of origin item e.g. `BcfTopic`
  - `deep_link_url`: string - Deep link URL to the origin item e.g. `https://some-company.com/bcf-topics/156`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `assignee`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `updated_by`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
- `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
- `viewpoints`: array of object - An array of viewpoints
  - `id`: integer - ID e.g. `206`
  - `bim_file_id`: integer - ID of associated BIM File e.g. `809`
  - `view_folder_id`: integer - ID of associated BIM View Folder e.g. `316`
  - `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
  - `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
  - `snapshot`: object
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `content_type`: string - A mime type or a file extension e.g. `image/png`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `name`: string - Viewpoint name e.g. `Mechanical Conflict View`
  - `render_mode`: string enum[shaded, xray] - Viewer render mode when viewpoint is applied
  - `uuid`: string - Unique identifier for the Extraction viewpoint e.g. `123e4567-e89b-12d3-a456-426614174000`
  - `visibility`: object - Object Visibility settings
    - `default_visibility`: boolean
    - `exceptions`: object - Group of model objects represented as an array of object ids, or object ranges
  - `camera_data`: string - JSON string representation of camera position e.g. `{"perspective_camera":{"camera_direction":{"x":-0.24,"y":-0.14,"z":-0.99},"ca...`
  - `redlines_data`: string - JSON string representation of markup e.g. `{"lines":[{"color":{"a":1.0,"b":0,"g":0,"r":1},"end_point":{"x":-0.29,"y":-0....`
  - `sections_data`: string - JSON string representation of sections applied to a 3d model as a set of clipping planes e.g. `[{"location":{"x":0.0,"y":0.0,"z":28.82},"direction":{"x":0,"y":0,"z":-1},"un...`
- `attachments`: array of object - An array of attachments
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `viewable`: boolean - Boolean value indicating whether or not a viewable document has been created for the file.
- `linked_procore_items`: array of object - Procore items linked to Coordination Issue
  - `id`: integer - ID e.g. `101`
  - `coordination_issue_id`: integer - Id of the associated Coordination Issue e.g. `426`
  - `item_id`: integer - Id of the associated Procore item e.g. `1287`
  - `item_type`: string - Type of the associated Procore item e.g. `rfi`
  - `item_url`: string - Deep-link URL to the associated Procore item e.g. `http://app.procore.com/3664/project/rfi/show/16768`
  - `item_data`: object - This field shows data specific to the associated item. If item type is RFI, it will contain attribute subject, number, and has_official_response
    - `has_official_response`: boolean e.g. `true`
    - `subject`: string e.g. `Construction RFI`
    - `number`: string e.g. `84`
- `linked_drawings`: array of object - Details of drawings linked to Coordination Issue
  - `id`: integer - Drawing ID e.g. `667`
  - `title`: string - Formatted title of the drawing e.g. `A201: Floor II Plan`
  - `url`: string - Procore Web App URL of the drawing e.g. `http://app.procore.com/drawings/1`
- `linked_observation_items`: array of object - Observation Items linked to Coordination Issue
  - `id`: integer - ID e.g. `93`
  - `number`: string - Observation Item number e.g. `113`
  - `personal`: boolean - Observation Item privacy status e.g. `true`
  - `title`: string - Formatted Observation Item title e.g. `#113 - Duct and Structural Conflict`
  - `url`: string - Deep-link URL to Observation Item e.g. `http://app.procore.com/3664/project/observations/items/7142`
  - `created_by_id`: integer - ID of user that created the Observation Item e.g. `47531`
- `document_container_metadata`: object - Document container metadata associated with the Coordination Issue
  - `id`: integer - ID of the document container metadata e.g. `1`
  - `document_container_id`: string - Unique identifier of the document container e.g. `container-123`
  - `document_revision_id`: string - Unique identifier of the document revision e.g. `revision-456`
  - `workflows_instance_id`: integer - ID of the associated workflow instance e.g. `789`
  - `pin_id`: string - Unique identifier of the pin e.g. `pin-abc-123`
- `document_snapshots`: array of object - Point-in-time snapshot images of document revisions linked to the Coordination Issue.
  - `id`: integer - ID of the document snapshot e.g. `42`
  - `document_container_id`: string - Unique identifier of the document container the source document belongs to e.g. `container-123`
  - `document_name`: string - Human-readable name of the source document. Surfaced as the Coordination Issue's source file for outside-workflow (document snapshot) issues. May be null for snapshots created before this field existed. e.g. `Floor Plan.pdf`
  - `document_revision_id`: string - Unique identifier of the document revision the snapshot was taken from e.g. `revision-456`
  - `document_revision_version_id`: string - Unique identifier of the specific document revision version for this snapshot e.g. `version-789`
  - `created_at`: string(date-time) - Timestamp when the snapshot was created e.g. `2018-04-19T09:36:42Z`
  - `prostore_file`: object
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
    - `viewable`: boolean - Boolean value indicating whether or not a viewable document has been created for the file.
- `drawing_markup_preview_images`: array of object - Preview images generated by drawings with Coordination Issue Pin
  - `id`: integer
  - `drawing_revision_id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
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

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/coordination_issues/recycle_bin

**List Coordination Issues in Recycle Bin (POST)**
Lists deleted Coordination Issues in the recycle bin via POST. Use when query parameters would exceed URL length limits.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json):

- object

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `426`
- `uuid`: string - Unique identifier for the issue. This is auto-generated attribute if not provided during issue creation. e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
- `title`: string - Coordination Issue title. The title can have a maximum of 80 characters. e.g. `Plumbing Issue on second floor`
- `description`: string - Coordination Issue description. e.g. `Elaborate details on the plumbing issue`
- `status`: string enum[open, in_progress, blocked, unblocked, ready_for_review, moved_to_observation, closed] - Status of the issue. e.g. `open`
- `issue_number`: integer - Issue Number. A number that can be referred by users to easily identify an issue. Issue number starts from 1 for each project, and is unique per project e.g. `2`
- `creation_source`: string - Coordination Issue can be created from Procore app or a plugin i.e. a source e.g. `navisworks`
- `due_date`: string - Due date of the Coordination Issue. Accepted date formats are "yyyy-mm-dd" and "yyyymmdd" e.g. `2018-08-16`
- `coordination_issue_file`: object - BIM File
  - `id`: integer - ID e.g. `101`
  - `name`: string - Name of the file to be associated to a project e.g. `101_BLDG_FLR_2.NWF`
  - `uuid`: string - Unique UUID associated with the file e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
- `project_id`: number(integer) - Unique identifier for the project. e.g. `29`
- `bim_model_id`: number(integer) - Model ID e.g. `86`
- `comments_count`: number(integer) - Count of comments e.g. `15`
- `issue_type`: string - Issue type of the Coordination Issue e.g. `building_code`
- `priority`: string - Priority of the Coordination Issue e.g. `high`
- `drawing_revision`: object
  - `id`: integer - ID e.g. `662`
  - `title`: string - Formatted title of the drawing revision e.g. `A001: COVER SHEET Rev.0`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `origin`: object - Origin source for a Coordination Issue
  - `title`: string - Title of the origin item e.g. `My BcfTopic`
  - `origin_id`: string - Id of the origin item e.g. `7b3c8752-e03e-417f-bb57-46bb5aca1139`
  - `origin_type`: string - Type of origin item e.g. `BcfTopic`
  - `deep_link_url`: string - Deep link URL to the origin item e.g. `https://some-company.com/bcf-topics/156`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `assignee`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `updated_by`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
- `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
- `viewpoints`: array of object - An array of viewpoints
  - `id`: integer - ID e.g. `206`
  - `bim_file_id`: integer - ID of associated BIM File e.g. `809`
  - `view_folder_id`: integer - ID of associated BIM View Folder e.g. `316`
  - `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
  - `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
  - `snapshot`: object
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `content_type`: string - A mime type or a file extension e.g. `image/png`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `name`: string - Viewpoint name e.g. `Mechanical Conflict View`
  - `render_mode`: string enum[shaded, xray] - Viewer render mode when viewpoint is applied
  - `uuid`: string - Unique identifier for the Extraction viewpoint e.g. `123e4567-e89b-12d3-a456-426614174000`
  - `visibility`: object - Object Visibility settings
    - `default_visibility`: boolean
    - `exceptions`: object - Group of model objects represented as an array of object ids, or object ranges
  - `camera_data`: string - JSON string representation of camera position e.g. `{"perspective_camera":{"camera_direction":{"x":-0.24,"y":-0.14,"z":-0.99},"ca...`
  - `redlines_data`: string - JSON string representation of markup e.g. `{"lines":[{"color":{"a":1.0,"b":0,"g":0,"r":1},"end_point":{"x":-0.29,"y":-0....`
  - `sections_data`: string - JSON string representation of sections applied to a 3d model as a set of clipping planes e.g. `[{"location":{"x":0.0,"y":0.0,"z":28.82},"direction":{"x":0,"y":0,"z":-1},"un...`
- `attachments`: array of object - An array of attachments
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `viewable`: boolean - Boolean value indicating whether or not a viewable document has been created for the file.
- `linked_procore_items`: array of object - Procore items linked to Coordination Issue
  - `id`: integer - ID e.g. `101`
  - `coordination_issue_id`: integer - Id of the associated Coordination Issue e.g. `426`
  - `item_id`: integer - Id of the associated Procore item e.g. `1287`
  - `item_type`: string - Type of the associated Procore item e.g. `rfi`
  - `item_url`: string - Deep-link URL to the associated Procore item e.g. `http://app.procore.com/3664/project/rfi/show/16768`
  - `item_data`: object - This field shows data specific to the associated item. If item type is RFI, it will contain attribute subject, number, and has_official_response
    - `has_official_response`: boolean e.g. `true`
    - `subject`: string e.g. `Construction RFI`
    - `number`: string e.g. `84`
- `linked_drawings`: array of object - Details of drawings linked to Coordination Issue
  - `id`: integer - Drawing ID e.g. `667`
  - `title`: string - Formatted title of the drawing e.g. `A201: Floor II Plan`
  - `url`: string - Procore Web App URL of the drawing e.g. `http://app.procore.com/drawings/1`
- `linked_observation_items`: array of object - Observation Items linked to Coordination Issue
  - `id`: integer - ID e.g. `93`
  - `number`: string - Observation Item number e.g. `113`
  - `personal`: boolean - Observation Item privacy status e.g. `true`
  - `title`: string - Formatted Observation Item title e.g. `#113 - Duct and Structural Conflict`
  - `url`: string - Deep-link URL to Observation Item e.g. `http://app.procore.com/3664/project/observations/items/7142`
  - `created_by_id`: integer - ID of user that created the Observation Item e.g. `47531`
- `document_container_metadata`: object - Document container metadata associated with the Coordination Issue
  - `id`: integer - ID of the document container metadata e.g. `1`
  - `document_container_id`: string - Unique identifier of the document container e.g. `container-123`
  - `document_revision_id`: string - Unique identifier of the document revision e.g. `revision-456`
  - `workflows_instance_id`: integer - ID of the associated workflow instance e.g. `789`
  - `pin_id`: string - Unique identifier of the pin e.g. `pin-abc-123`
- `document_snapshots`: array of object - Point-in-time snapshot images of document revisions linked to the Coordination Issue.
  - `id`: integer - ID of the document snapshot e.g. `42`
  - `document_container_id`: string - Unique identifier of the document container the source document belongs to e.g. `container-123`
  - `document_name`: string - Human-readable name of the source document. Surfaced as the Coordination Issue's source file for outside-workflow (document snapshot) issues. May be null for snapshots created before this field existed. e.g. `Floor Plan.pdf`
  - `document_revision_id`: string - Unique identifier of the document revision the snapshot was taken from e.g. `revision-456`
  - `document_revision_version_id`: string - Unique identifier of the specific document revision version for this snapshot e.g. `version-789`
  - `created_at`: string(date-time) - Timestamp when the snapshot was created e.g. `2018-04-19T09:36:42Z`
  - `prostore_file`: object
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
    - `viewable`: boolean - Boolean value indicating whether or not a viewable document has been created for the file.
- `drawing_markup_preview_images`: array of object - Preview images generated by drawings with Coordination Issue Pin
  - `id`: integer
  - `drawing_revision_id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
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

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/coordination_issues/recycle_bin/{id}

**Show Coordination Issue in Recycle Bin**
Return a single Coordination Issue item in Recycle Bin.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Coordination Issue ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `view` [query] string enum[compact, normal, extended] - The compact view contains only ids. The normal view is a subset of the response shown below, and does not include attachments, viewpoints, linked items and updated_by The extended view contains the response shown belo...

Response 200 (application/json): object

- `id`: integer - ID e.g. `426`
- `uuid`: string - Unique identifier for the issue. This is auto-generated attribute if not provided during issue creation. e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
- `title`: string - Coordination Issue title. The title can have a maximum of 80 characters. e.g. `Plumbing Issue on second floor`
- `description`: string - Coordination Issue description. e.g. `Elaborate details on the plumbing issue`
- `status`: string enum[open, in_progress, blocked, unblocked, ready_for_review, moved_to_observation, closed] - Status of the issue. e.g. `open`
- `issue_number`: integer - Issue Number. A number that can be referred by users to easily identify an issue. Issue number starts from 1 for each project, and is unique per project e.g. `2`
- `creation_source`: string - Coordination Issue can be created from Procore app or a plugin i.e. a source e.g. `navisworks`
- `due_date`: string - Due date of the Coordination Issue. Accepted date formats are "yyyy-mm-dd" and "yyyymmdd" e.g. `2018-08-16`
- `coordination_issue_file`: object - BIM File
  - `id`: integer - ID e.g. `101`
  - `name`: string - Name of the file to be associated to a project e.g. `101_BLDG_FLR_2.NWF`
  - `uuid`: string - Unique UUID associated with the file e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
- `project_id`: number(integer) - Unique identifier for the project. e.g. `29`
- `bim_model_id`: number(integer) - Model ID e.g. `86`
- `comments_count`: number(integer) - Count of comments e.g. `15`
- `issue_type`: string - Issue type of the Coordination Issue e.g. `building_code`
- `priority`: string - Priority of the Coordination Issue e.g. `high`
- `drawing_revision`: object
  - `id`: integer - ID e.g. `662`
  - `title`: string - Formatted title of the drawing revision e.g. `A001: COVER SHEET Rev.0`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `origin`: object - Origin source for a Coordination Issue
  - `title`: string - Title of the origin item e.g. `My BcfTopic`
  - `origin_id`: string - Id of the origin item e.g. `7b3c8752-e03e-417f-bb57-46bb5aca1139`
  - `origin_type`: string - Type of origin item e.g. `BcfTopic`
  - `deep_link_url`: string - Deep link URL to the origin item e.g. `https://some-company.com/bcf-topics/156`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `assignee`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `updated_by`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
- `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
- `viewpoints`: array of object - An array of viewpoints
  - `id`: integer - ID e.g. `206`
  - `bim_file_id`: integer - ID of associated BIM File e.g. `809`
  - `view_folder_id`: integer - ID of associated BIM View Folder e.g. `316`
  - `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
  - `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
  - `snapshot`: object
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `content_type`: string - A mime type or a file extension e.g. `image/png`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `name`: string - Viewpoint name e.g. `Mechanical Conflict View`
  - `render_mode`: string enum[shaded, xray] - Viewer render mode when viewpoint is applied
  - `uuid`: string - Unique identifier for the Extraction viewpoint e.g. `123e4567-e89b-12d3-a456-426614174000`
  - `visibility`: object - Object Visibility settings
    - `default_visibility`: boolean
    - `exceptions`: object - Group of model objects represented as an array of object ids, or object ranges
  - `camera_data`: string - JSON string representation of camera position e.g. `{"perspective_camera":{"camera_direction":{"x":-0.24,"y":-0.14,"z":-0.99},"ca...`
  - `redlines_data`: string - JSON string representation of markup e.g. `{"lines":[{"color":{"a":1.0,"b":0,"g":0,"r":1},"end_point":{"x":-0.29,"y":-0....`
  - `sections_data`: string - JSON string representation of sections applied to a 3d model as a set of clipping planes e.g. `[{"location":{"x":0.0,"y":0.0,"z":28.82},"direction":{"x":0,"y":0,"z":-1},"un...`
- `attachments`: array of object - An array of attachments
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `viewable`: boolean - Boolean value indicating whether or not a viewable document has been created for the file.
- `linked_procore_items`: array of object - Procore items linked to Coordination Issue
  - `id`: integer - ID e.g. `101`
  - `coordination_issue_id`: integer - Id of the associated Coordination Issue e.g. `426`
  - `item_id`: integer - Id of the associated Procore item e.g. `1287`
  - `item_type`: string - Type of the associated Procore item e.g. `rfi`
  - `item_url`: string - Deep-link URL to the associated Procore item e.g. `http://app.procore.com/3664/project/rfi/show/16768`
  - `item_data`: object - This field shows data specific to the associated item. If item type is RFI, it will contain attribute subject, number, and has_official_response
    - `has_official_response`: boolean e.g. `true`
    - `subject`: string e.g. `Construction RFI`
    - `number`: string e.g. `84`
- `linked_drawings`: array of object - Details of drawings linked to Coordination Issue
  - `id`: integer - Drawing ID e.g. `667`
  - `title`: string - Formatted title of the drawing e.g. `A201: Floor II Plan`
  - `url`: string - Procore Web App URL of the drawing e.g. `http://app.procore.com/drawings/1`
- `linked_observation_items`: array of object - Observation Items linked to Coordination Issue
  - `id`: integer - ID e.g. `93`
  - `number`: string - Observation Item number e.g. `113`
  - `personal`: boolean - Observation Item privacy status e.g. `true`
  - `title`: string - Formatted Observation Item title e.g. `#113 - Duct and Structural Conflict`
  - `url`: string - Deep-link URL to Observation Item e.g. `http://app.procore.com/3664/project/observations/items/7142`
  - `created_by_id`: integer - ID of user that created the Observation Item e.g. `47531`
- `document_container_metadata`: object - Document container metadata associated with the Coordination Issue
  - `id`: integer - ID of the document container metadata e.g. `1`
  - `document_container_id`: string - Unique identifier of the document container e.g. `container-123`
  - `document_revision_id`: string - Unique identifier of the document revision e.g. `revision-456`
  - `workflows_instance_id`: integer - ID of the associated workflow instance e.g. `789`
  - `pin_id`: string - Unique identifier of the pin e.g. `pin-abc-123`
- `document_snapshots`: array of object - Point-in-time snapshot images of document revisions linked to the Coordination Issue.
  - `id`: integer - ID of the document snapshot e.g. `42`
  - `document_container_id`: string - Unique identifier of the document container the source document belongs to e.g. `container-123`
  - `document_name`: string - Human-readable name of the source document. Surfaced as the Coordination Issue's source file for outside-workflow (document snapshot) issues. May be null for snapshots created before this field existed. e.g. `Floor Plan.pdf`
  - `document_revision_id`: string - Unique identifier of the document revision the snapshot was taken from e.g. `revision-456`
  - `document_revision_version_id`: string - Unique identifier of the specific document revision version for this snapshot e.g. `version-789`
  - `created_at`: string(date-time) - Timestamp when the snapshot was created e.g. `2018-04-19T09:36:42Z`
  - `prostore_file`: object
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
    - `viewable`: boolean - Boolean value indicating whether or not a viewable document has been created for the file.
- `drawing_markup_preview_images`: array of object - Preview images generated by drawings with Coordination Issue Pin
  - `id`: integer
  - `drawing_revision_id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
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

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/coordination_issues/recycle_bin/{id}

**Restore Coordination Issue from Recycle Bin**
Restore Coordination Issue from Recycle Bin

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Coordination Issue ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `12345`

Response 204: No Content (no body)

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Coordination Issue Status Changes

Resource id: `coordination-issue-status-changes`. Raw spec: `../openapi-raw/coordination-issue-status-changes.json`. Web: https://developers.procore.com/reference/rest/coordination-issue-status-changes?version=latest
Product lines: Design Coordination

### GET /rest/v1.0/coordination_issues/{id}/status_changes

**List status change history for a Coordination Issue**
This endpoint returns the status change history for the specified CoordinationIssue. The status change history is sorted by most recent first.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Coordination Issue ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `view` [query] string enum[compact, normal, extended] - The extended view provides what is shown below. The normal view is the same as the extended view but excludes attribute created_by, linked_rfi and linked_observation_item. The compact view returns ids only. The defaul...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this status change. e.g. `101`
- `coordination_issue_id`: integer - ID of the parent Coordination Issue. e.g. `123`
- `old_status`: string enum[open, in_progress, blocked, unblocked, ready_for_review, moved_to_observation, closed] - Value of the status prior to change e.g. `open`
- `new_status`: string enum[open, in_progress, blocked, unblocked, ready_for_review, moved_to_observation, closed] - Value of the status following the change e.g. `closed`
- `created_by_id`: integer - ID of the user who made the status change. e.g. `577`
- `created_by`: object
  - `login`: string - Login email address of the user who made the status change. e.g. `carl.contractor@example.com`
  - `id`: integer - Login Information ID of the user who made the status change. e.g. `161072`
  - `name`: string - Display name of the user who made the status change. e.g. `Carl the Contractor`
- `linked_rfi`: object
  - `id`: integer - Unique identifier for this Procore item association. e.g. `101`
  - `coordination_issue_id`: integer - ID of the associated Coordination Issue. e.g. `426`
  - `item_id`: integer - Id of the associated Procore item e.g. `1287`
  - `item_type`: string - Type of the associated Procore item e.g. `rfi`
  - `item_url`: string - Deep-link URL to the associated Procore item e.g. `http://app.procore.com/3664/project/rfi/show/16768`
  - `item_data`: object - This field shows data specific to the associated item. If item type is RFI, it will contain attribute subject, number, and has_official_response
    - `has_official_response`: boolean - Whether the associated RFI has an official response. e.g. `true`
    - `subject`: string - Subject of the associated RFI. e.g. `Construction RFI`
    - `number`: string - Number of the associated RFI. e.g. `84`
- `linked_observation_item`: object - CoordinationIssue linked Observation Item
  - `id`: integer - ID e.g. `93`
  - `number`: string - Observation Item number e.g. `113`
  - `personal`: boolean - Observation Item privacy status e.g. `true`
  - `title`: string - Formatted Observation Item title e.g. `#113 - Duct and Structural Conflict`
  - `url`: string - Deep-link URL to Observation Item e.g. `http://app.procore.com/3664/project/observations/items/7142`
  - `created_by_id`: integer - ID of user that created the Observation Item e.g. `47531`
- `created_at`: string(date-time) - Timestamp when the status change was recorded. e.g. `2018-05-08T13:21:20Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Coordination Issue Status Totals

Resource id: `coordination-issue-status-totals`. Raw spec: `../openapi-raw/coordination-issue-status-totals.json`. Web: https://developers.procore.com/reference/rest/coordination-issue-status-totals?version=latest
Product lines: Design Coordination

### GET /rest/v1.0/coordination_issues/status_total

**Show Coordination Issue Count by Status**
Returns the count of Coordination Issues in a project, grouped by status.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `workflow_issues` [query] boolean - When true, returns status counts for workflow-linked Coordination Issues instead of standard (non-workflow) issues. Defaults to false.

Response 200 (application/json): object

- `open_count`: integer - Count of issues with status 'open' e.g. `5`
- `blocked_count`: integer - Count of issues with status 'blocked' e.g. `3`
- `unblocked_count`: integer - Count of issues with status 'unblocked' e.g. `2`
- `ready_for_review_count`: integer - Count of issues with status 'ready_for_review' e.g. `1`
- `moved_to_observation_count`: integer - Count of issues with status 'moved_to_observation' e.g. `10`
- `closed_count`: integer - Count of issues with status 'closed' e.g. `10`
- `in_progress_count`: integer - Count of issues with status 'in_progress' e.g. `4`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Coordination Issue Sync

Resource id: `coordination-issue-sync`. Raw spec: `../openapi-raw/coordination-issue-sync.json`. Web: https://developers.procore.com/reference/rest/coordination-issue-sync?version=latest
Product lines: Design Coordination

### PATCH /rest/v1.0/coordination_issues/sync

**Create and Update Bulk Coordination Issues**
This endpoint is used to create and update a batch of CoordinationIssues.
See [Using Sync Actions](/documentation/using-sync-actions) for additional information.
If an 'id' attribute is present in any payload item, that item is processed for 'update'.
On update, only title, description, status, due_date, location_id, assignee_id, issue_type, priority, coordination_issue_type_id, coordination_issue_priority_id, trade_id, is_private, and watcher_ids can be modified.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `12345`
- `updates`: array of object (required) - An array of coordination issue payloads
  - `uuid`: string - Coordination Issue UUID. This is an optional parameter, and is set automatically on server if not present in the payload e.g. `0b1a32a7-9cf4-4e53-bef4-3d70201b709a`
  - `title`: string (required) - Coordination Issue title. The title can have a maximum of 80 characters e.g. `Plumbing Issue on second floor`
  - `description`: string - Coordination Issue description. e.g. `Plumbing conflicts with light fixtures`
  - `status`: string enum[open, in_progress, blocked, unblocked, ready_for_review, moved_to_observation, closed] - Status of the issue e.g. `open`
  - `creation_source`: string - Source of issue creation. This attribute is ignored when issue is create by third party developers. e.g. `navisworks`
  - `location_id`: integer - Location where the issue is present. The location must be in the same project as the project_id e.g. `5`
  - `assignee_id`: integer - ID of Procore user that should be assigned the issue e.g. `624`
  - `coordination_issue_file_id`: integer - ID of the BIM File to be set as origin source (required if viewpoints is included in payload) e.g. `8`
  - `drawing_revision_id`: integer - ID of the drawing revision to be set as origin source. Only one of drawing_revision_id or coordination_issue_file_id can be present e.g. `9`
  - `bim_model_id`: integer - ID of the model to be associated e.g. `19`
  - `due_date`: string - Due date of the Coordination Issue e.g. `2018-08-16`
  - `issue_type`: string enum[building_code, clash, client_feedback, constructability, coordination, design_review, existing_condition, requirement_change, other] - Issue Type of the Coordination Issue e.g. `building_code`
  - `priority`: string enum[low, medium, high, critical] - Priority of the Coordination Issue e.g. `high`
  - `trade_id`: integer - Trade associated with the Coordination Issue e.g. `999`
  - `is_private`: boolean - Whether the Coordination Issue is private. e.g. `false`
  - `coordination_issue_type_id`: integer - ID of the configurable issue type to associate with the issue. e.g. `45`
  - `coordination_issue_priority_id`: integer - ID of the configurable priority to associate with the issue. e.g. `12`
  - `watcher_ids`: array of integer - IDs of users to set as watchers of the issue. e.g. `[624, 625]`
  - `origin`: object - Origin source for a Coordination Issue
    - `title`: string (required) - Title of the origin item e.g. `My BcfTopic`
    - `origin_id`: string (required) - Id of the origin item e.g. `7b3c8752-e03e-417f-bb57-46bb5aca1139`
    - `origin_type`: string (required) - Type of origin item e.g. `BcfTopic`
    - `deep_link_url`: string (required) - Deep link URL to the origin item e.g. `https://some-company.com/bcf-topics/156`
  - `attachment_upload_uuids`: array of string
  - `attachments`: array of string
  - `viewpoints`: array of object - An array of issue viewpoints. Only one viewpoint is allowed at this time. If specified, must also include coordination_issue_file_id.
    - `name`: string - Viewpoint name e.g. `Ceiling view`
    - `view_folder_id`: integer - ID of the BIM View Folder the viewpoint belongs to
    - `snapshot_upload_uuid`: string (required) - UUID of uploaded snapshot e.g. `1ZE146W9K804SAJJZX19JVAD0R`
    - `camera_data`: string (required) - JSON string representation of camera position e.g. `{"perspective_camera":{"camera_direction":{"x":-0.24,"y":-0.14,"z":-0.99},"ca...`
    - `redlines_data`: string - JSON string representation of markup e.g. `{"lines":[{"color":{"a":1.0,"b":0,"g":0,"r":1},"end_point":{"x":-0.29,"y":-0....`
    - `sections_data`: string - JSON string representation of sections applied to a 3d model as a bounding box e.g. `{"min_boundary":{"x":6.24,"y":12.48,"z":24.96},"max_boundary":{"x":12.48,"y":...`
    - `render_mode`: string enum[shaded, xray] - Viewer render mode when viewpoint is applied
    - `visibility`: object - Object visibility settings
      - `default_visibility`: boolean
      - `exceptions`: object - Group of model objects represented as an array of object ids, or object ranges
        - `object_ids`: array of integer - Array of object ids e.g. `[24861, 46732]`
        - `object_ranges`: array of array of integer - Array of object ranges. A range is an array containing two numbers, the first represents object id, the second represents the number of objects in the range. e.g. `[[24862, 24]]`
  - `document_container_metadata`: object - Document container metadata associated with the Coordination Issue
    - `document_container_id`: string - Unique identifier of the document container e.g. `container-123`
    - `document_revision_id`: string - Unique identifier of the document revision e.g. `revision-456`
    - `workflows_instance_id`: integer - ID of the associated workflow instance e.g. `789`
    - `pin_id`: string - Unique identifier of the pin e.g. `pin-abc-123`

Response 200 (application/json): object

- `entities`: array of object
  - `id`: integer - ID e.g. `426`
  - `uuid`: string - Unique identifier for the issue. This is auto-generated attribute if not provided during issue creation. e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
  - `title`: string - Coordination Issue title. The title can have a maximum of 80 characters. e.g. `Plumbing Issue on second floor`
  - `description`: string - Coordination Issue description. e.g. `Elaborate details on the plumbing issue`
  - `status`: string enum[open, in_progress, blocked, unblocked, ready_for_review, moved_to_observation, closed] - Status of the issue. e.g. `open`
  - `issue_number`: integer - Issue Number. A number that can be referred by users to easily identify an issue. Issue number starts from 1 for each project, and is unique per project e.g. `2`
  - `creation_source`: string - Coordination Issue can be created from Procore app or a plugin i.e. a source e.g. `navisworks`
  - `due_date`: string - Due date of the Coordination Issue. Accepted date formats are "yyyy-mm-dd" and "yyyymmdd" e.g. `2018-08-16`
  - `coordination_issue_file`: object - BIM File
    - `id`: integer - ID e.g. `101`
    - `name`: string - Name of the file to be associated to a project e.g. `101_BLDG_FLR_2.NWF`
    - `uuid`: string - Unique UUID associated with the file e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
  - `project_id`: number(integer) - Unique identifier for the project. e.g. `29`
  - `bim_model_id`: number(integer) - Model ID e.g. `86`
  - `comments_count`: number(integer) - Count of comments e.g. `15`
  - `issue_type`: string - Issue type of the Coordination Issue e.g. `building_code`
  - `priority`: string - Priority of the Coordination Issue e.g. `high`
  - `drawing_revision`: object
    - `id`: integer - ID e.g. `662`
    - `title`: string - Formatted title of the drawing revision e.g. `A001: COVER SHEET Rev.0`
  - `trade`: object
    - `id`: integer - Trade ID e.g. `999`
    - `name`: string - Trade name e.g. `09 - acoustical panels`
    - `active`: boolean - Trade availability e.g. `true`
    - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
  - `origin`: object - Origin source for a Coordination Issue
    - `title`: string - Title of the origin item e.g. `My BcfTopic`
    - `origin_id`: string - Id of the origin item e.g. `7b3c8752-e03e-417f-bb57-46bb5aca1139`
    - `origin_type`: string - Type of origin item e.g. `BcfTopic`
    - `deep_link_url`: string - Deep link URL to the origin item e.g. `https://some-company.com/bcf-topics/156`
  - `location`: object
    - `id`: integer - Location ID e.g. `15504`
    - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
    - `node_name`: string - Location node name e.g. `Electrical Closet`
    - `parent_id`: integer - Location parent id e.g. `788866`
    - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
    - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
    - `code`: string - The unique code for this Location e.g. `L1`
  - `assignee`: object - Login Information
    - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
    - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
    - `login`: string - User's login email address. e.g. `johndoe@example.com`
    - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
    - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
  - `created_by`: object - Login Information
    - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
    - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
    - `login`: string - User's login email address. e.g. `johndoe@example.com`
    - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
    - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
  - `updated_by`: object - Login Information
    - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
    - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
    - `login`: string - User's login email address. e.g. `johndoe@example.com`
    - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
    - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
  - `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
  - `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
  - `viewpoints`: array of object - An array of viewpoints
    - `id`: integer - ID e.g. `206`
    - `bim_file_id`: integer - ID of associated BIM File e.g. `809`
    - `view_folder_id`: integer - ID of associated BIM View Folder e.g. `316`
    - `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
    - `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
    - `snapshot`: object
    - `name`: string - Viewpoint name e.g. `Mechanical Conflict View`
    - `render_mode`: string enum[shaded, xray] - Viewer render mode when viewpoint is applied
    - `uuid`: string - Unique identifier for the Extraction viewpoint e.g. `123e4567-e89b-12d3-a456-426614174000`
    - `visibility`: object - Object Visibility settings
    - `camera_data`: string - JSON string representation of camera position e.g. `{"perspective_camera":{"camera_direction":{"x":-0.24,"y":-0.14,"z":-0.99},"ca...`
    - `redlines_data`: string - JSON string representation of markup e.g. `{"lines":[{"color":{"a":1.0,"b":0,"g":0,"r":1},"end_point":{"x":-0.29,"y":-0....`
    - `sections_data`: string - JSON string representation of sections applied to a 3d model as a set of clipping planes e.g. `[{"location":{"x":0.0,"y":0.0,"z":28.82},"direction":{"x":0,"y":0,"z":-1},"un...`
  - `attachments`: array of object - An array of attachments
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
    - `viewable`: boolean - Boolean value indicating whether or not a viewable document has been created for the file.
  - `linked_procore_items`: array of object - Procore items linked to Coordination Issue
    - `id`: integer - ID e.g. `101`
    - `coordination_issue_id`: integer - Id of the associated Coordination Issue e.g. `426`
    - `item_id`: integer - Id of the associated Procore item e.g. `1287`
    - `item_type`: string - Type of the associated Procore item e.g. `rfi`
    - `item_url`: string - Deep-link URL to the associated Procore item e.g. `http://app.procore.com/3664/project/rfi/show/16768`
    - `item_data`: object - This field shows data specific to the associated item. If item type is RFI, it will contain attribute subject, number, and has_official_response
  - `linked_drawings`: array of object - Details of drawings linked to Coordination Issue
    - `id`: integer - Drawing ID e.g. `667`
    - `title`: string - Formatted title of the drawing e.g. `A201: Floor II Plan`
    - `url`: string - Procore Web App URL of the drawing e.g. `http://app.procore.com/drawings/1`
  - `linked_observation_items`: array of object - Observation Items linked to Coordination Issue
    - `id`: integer - ID e.g. `93`
    - `number`: string - Observation Item number e.g. `113`
    - `personal`: boolean - Observation Item privacy status e.g. `true`
    - `title`: string - Formatted Observation Item title e.g. `#113 - Duct and Structural Conflict`
    - `url`: string - Deep-link URL to Observation Item e.g. `http://app.procore.com/3664/project/observations/items/7142`
    - `created_by_id`: integer - ID of user that created the Observation Item e.g. `47531`
  - `document_container_metadata`: object - Document container metadata associated with the Coordination Issue
    - `id`: integer - ID of the document container metadata e.g. `1`
    - `document_container_id`: string - Unique identifier of the document container e.g. `container-123`
    - `document_revision_id`: string - Unique identifier of the document revision e.g. `revision-456`
    - `workflows_instance_id`: integer - ID of the associated workflow instance e.g. `789`
    - `pin_id`: string - Unique identifier of the pin e.g. `pin-abc-123`
  - `document_snapshots`: array of object - Point-in-time snapshot images of document revisions linked to the Coordination Issue.
    - `id`: integer - ID of the document snapshot e.g. `42`
    - `document_container_id`: string - Unique identifier of the document container the source document belongs to e.g. `container-123`
    - `document_name`: string - Human-readable name of the source document. Surfaced as the Coordination Issue's source file for outside-workflow (document snapshot) issues. May be null for snapshots created before this field existed. e.g. `Floor Plan.pdf`
    - `document_revision_id`: string - Unique identifier of the document revision the snapshot was taken from e.g. `revision-456`
    - `document_revision_version_id`: string - Unique identifier of the specific document revision version for this snapshot e.g. `version-789`
    - `created_at`: string(date-time) - Timestamp when the snapshot was created e.g. `2018-04-19T09:36:42Z`
    - `prostore_file`: object
  - `drawing_markup_preview_images`: array of object - Preview images generated by drawings with Coordination Issue Pin
    - `id`: integer
    - `drawing_revision_id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `errors`: array of object
  - `uuid`: string - Coordination Issue UUID. This is an optional parameter, and is set automatically on server if not present in the payload e.g. `0b1a32a7-9cf4-4e53-bef4-3d70201b709a`
  - `title`: string (required) - Coordination Issue title. The title can have a maximum of 80 characters e.g. `Plumbing Issue on second floor`
  - `description`: string - Coordination Issue description. e.g. `Plumbing conflicts with light fixtures`
  - `status`: string enum[open, in_progress, blocked, unblocked, ready_for_review, moved_to_observation, closed] - Status of the issue. e.g. `open`
  - `creation_source`: string - Source of issue creation. This attribute is ignored when issue is create by third party developers. e.g. `navisworks`
  - `location_id`: integer - Location where the issue is present. The location must be in the same project as the project_id e.g. `5`
  - `assignee_id`: integer - ID of Procore user that should be assigned the issue e.g. `624`
  - `coordination_issue_file_id`: integer - ID of the BIM File to be set as origin source e.g. `8`
  - `drawing_revision_id`: integer - ID of the drawing revision to be set as origin source. Only one of drawing_revision_id or coordination_issue_file_id can be present e.g. `9`
  - `bim_model_id`: integer - ID of the model to be associated e.g. `19`
  - `due_date`: string - Due date of the Coordination Issue e.g. `2018-08-16`
  - `origin`: object - Origin source for a Coordination Issue
    - `title`: string (required) - Title of the origin item e.g. `My BcfTopic`
    - `origin_id`: string (required) - Id of the origin item e.g. `7b3c8752-e03e-417f-bb57-46bb5aca1139`
    - `origin_type`: string (required) - Type of origin item e.g. `BcfTopic`
    - `deep_link_url`: string (required) - Deep link URL to the origin item e.g. `https://some-company.com/bcf-topics/156`
  - `attachment_upload_uuids`: array of string
  - `attachments`: array of string
  - `viewpoints`: array of object - An array of issue viewpoints. Only one viewpoint is allowed at this time.
    - `snapshot_upload_uuid`: string (required) - UUID of uploaded snapshot e.g. `1ZE146W9K804SAJJZX19JVAD0R`
    - `snapshot`: string - File to use as image data. Note that it's only possible to post a file using a multipart/form-data body (see RFC 2388). Most HTTP libraries will do the right thing when you pass in an open file or IO stream. Alternati...
    - `name`: string - Viewpoint name e.g. `Mechanical Conflict View`
    - `camera_data`: string (required) - Camera data for the building model associated with the issue e.g. `{"Type":"Camera","Scale":1,"Up":[0,0,1],"Front":[0,1,2.22],"Right":[1,0,0],"P...`
    - `redlines_data`: string - Lines data for the building model associated with the issue e.g. `{"Type":"RedlineCollection","Values":[{"Type":"RedlineEllipse","Thickness":3,...`
    - `sections_data`: string - Clipping plane data for the building model associated with the issue e.g. `{"Type":"ClipPlaneSet","Version":1"}`
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/coordination_issues/bulk_delete

**Delete Bulk Coordination Issues**
This endpoint is used to delete a batch of CoordinationIssues.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `12345`
- `deletes`: array of object (required) - An array of objects containing resource id to delete
  - `id`: integer (required) - Id of the Coordination Issue to delete e.g. `212`

Response 200 (application/json): object

- `entities`: array of object
  - `id`: integer - Coordination Issue Id e.g. `12345`
- `errors`: array of object
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Coordination Issue Viewpoints

Resource id: `coordination-issue-viewpoints`. Raw spec: `../openapi-raw/coordination-issue-viewpoints.json`. Web: https://developers.procore.com/reference/rest/coordination-issue-viewpoints?version=latest
Product lines: Design Coordination

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues/{coordination_issue_id}/viewpoints

**List coordination issue viewpoints (legacy + Model Manager, REST v2.0)**
**GET collection** — returns every viewpoint mapping on the issue. **Legacy** rows (join has
`bim_viewpoint_id`) use **`BimViewpointBlueprint`** view **`:procore_v0_1`** — the **same** shape as
the **`viewpoints`** array on the coordination issue resource (`CoordinationIssueBlueprint` view
`:extended_with_viewpoint_v0_1`): `camera_data`, `sections_data`, `redlines_data`, `snapshot`,
`bim_file_id`, `uuid`, numeric `id`, etc.
**MM-backed** rows (`viewpoint_uuid` only) are loaded in bulk from Model Manager
(`POST .../bim/viewpoints/batch`) and appear as full MM viewpoint objects (same shape as
`GET .../viewpoints/{uuid}` inner `data`).
Order follows the join table: `position`, then `created_at`. Pagination counts **join rows**, not
only legacy viewpoints.
Supports pagination (`page`, `per_page`; default per page **10**, max **100** per
`Rest::V2::ApplicationController` / `RestV2Pagination`).
Response headers may include `Per-Page`, `Total`, and `Link` (RFC 5988) for pagination.
**502** if Model Manager returns 5xx while resolving MM-backed rows on this page.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `coordination_issue_id` [path] string (required) - Coordination Issue ID
- `view` [query] string enum[ids_only] - When `ids_only`, response body is `{ "data": [...] }`: legacy mappings use integer `bim_viewpoint_id`; MM-backed mappings use UUID strings. Order matches the full list (`position`, `created_at`).
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `primary` [query] boolean - When `true`, only mappings marked primary on the issue are returned. When `false`, only non-primary mappings. When omitted, all mappings are returned (subject to pagination). Applies to both the full list and `view=id...
- `included` [query] string - **Ignored.** The `viewpoint_format` query parameter now controls the response shape. When `viewpoint_format=v2` (default), all viewpoints are returned in Model Manager shape. When `viewpoint_format=v1`, all viewpoints...
- `viewpoint_format` [query] string enum[v1, v2] - Specify the response format for viewpoint data. When `v1`, all viewpoints (including Model Manager-backed) are returned in legacy shape (`camera_data`, `sections_data`, `redlines_data` as JSON strings). Model Manager ...

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, 404, 502 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues/{coordination_issue_id}/viewpoints

**Create a Model Manager viewpoint and link it to the issue (REST v2.0)**
Proxies to Model Manager `POST /rest/v2.0/companies/{company_id}/projects/{project_id}/bim/viewpoints`
(`RequestsCreateViewpointRequest`: `scene_id`, optional `name`, `payload` per MM OpenAPI), plus
**Procore-required** `bim_model_uuid` for application validation. Then inserts
`coordination_issue_bim_viewpoints` with `viewpoint_uuid` (MM viewpoint id).
May trigger notification side effects for observers of the issue.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `coordination_issue_id` [path] string (required) - Coordination Issue ID

Request body (application/json) (required):

- `name`: string - Optional viewpoint name (MM `RequestsCreateViewpointRequest.name`).
- `scene_id`: string(uuid) (required) - Scene UUID (MM `scene_id` / `UuidUUID`).
- `bim_model_uuid`: string(uuid) (required) - Required by Procore `ViewpointCreateViaModelManagerService` validation (not sent to MM create as a top-level field).
- `payload`: oneOf(object | string)
- `camera_data`: oneOf(object | string) - Used when top-level `payload` is absent — becomes `camera` in the MM payload. Send a JSON object or a JSON string (parsed server-side).
- `redlines_data`: oneOf(object | string) - Used when top-level `payload` is absent — becomes `markup` in the MM payload (object or JSON string).
- `sections_data`: oneOf(object | string) - Used when top-level `payload` is absent — parsed value is set on `clipping.planes` in the MM payload. Model Manager expects an array of clipping planes (`TypesClippingPlane`); object or JSON string is accepted and pas...
- `render_mode`: string
- `bim_file_id`: string - Accepted in the JSON body for parity with other viewpoint APIs; **not** applied by MM create in this flow. e.g. `598134325540867`
- `bim_view_folder_id`: string - Accepted in the JSON body for parity with other viewpoint APIs; **not** applied by MM create in this flow. e.g. `598134325540868`
- `snapshot_upload_uuid`: string - Upload UUID of a previously uploaded snapshot image (via `POST /rest/v1.0/projects/{project_id}/uploads`). **Legacy strategy:** the image is attached to the created `BimViewpoint` as a `ProstoreFile`; the snapshot URL...
- `primary`: boolean - Sets `is_primary` on the coordination-issue viewpoint mapping.
- `position`: integer - Sets ordering `position` on the coordination-issue viewpoint mapping (auto-incremented if omitted).
- `visibility`: object

Response 201 (application/json): object

- `data`: object (required) - BIM MM `ResponsesViewpointResponse` (viewpoint resource). Procore may present this under `data` via `ModelManagerViewpointPresenter` (types should match MM).
  - `id`: string(uuid) e.g. `248df4b7-aa70-47b8-a036-33ac447e668d`
  - `company_id`: string e.g. `598134326349945`
  - `project_id`: string e.g. `598134325540867`
  - `scene_id`: string(uuid) e.g. `019c8ec2-961c-7895-887d-4d41bd2686fd`
  - `name`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `snapshot_url`: string
  - `created_by`: object
    - `id`: string e.g. `76490`
    - `name`: string
    - `first_name`: string
    - `last_name`: string
    - `email_address`: string
    - `avatar`: string
    - `job_title`: string
  - `updated_by`: object
    - `id`: string e.g. `76490`
    - `name`: string
    - `first_name`: string
    - `last_name`: string
    - `email_address`: string
    - `avatar`: string
    - `job_title`: string
  - `payload`: object - Viewpoint payload sent to / returned from Model Manager. Matches BIM MM `TypesViewpointPayload` (camera, clipping, visibility, snapshot, markup, measurements, etc.).
    - `camera`: object
    - `clipping`: object
    - `grouping`: string
    - `groups`: array of object
    - `id`: string(uuid)
    - `markup`: object
    - `measurements`: object
    - `name`: string
    - `outline_measure`: object
    - `render_mode`: string
    - `selection`: array of string
    - `snapshot`: object
    - `unit`: string
    - `visibility`: object
- `error`: object - BIM MM `ResponseErrorInfo` (optional on MM envelopes).
  - `code`: string
  - `message`: string
  - `details`: array of object

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues/{coordination_issue_id}/viewpoints/batch

**Batch-get Model Manager viewpoints by UUID (REST v2.0, issue-scoped)**
Request body must include `ids` (non-empty array of UUID strings). The server **filters** `ids`
to those present on this issue as MM-backed mappings, preserves request order for the intersection,
then calls Model Manager `POST .../bim/viewpoints/batch`.
If no ids remain after filtering, returns `{ "data": [] }` **without** calling Model Manager.
Response body is forwarded from Model Manager (typically `{ "data": [ ... ] }`).
When `viewpoint_format=v1`, the Model Manager viewpoint objects are transformed to legacy shape
(camera_data, sections_data, redlines_data as JSON strings).
When `viewpoint_format=v2` (default), viewpoints are returned in Model Manager shape as-is.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `coordination_issue_id` [path] string (required) - Coordination Issue ID
- `viewpoint_format` [query] string enum[v1, v2] - Specify the response format for viewpoint data. When `v1`, all viewpoints (including Model Manager-backed) are returned in legacy shape (`camera_data`, `sections_data`, `redlines_data` as JSON strings). Model Manager ...

Request body (application/json) (required):

- `ids`: array of string(uuid) (required) - Requested MM viewpoint UUIDs (server filters to those mapped on the issue)

Response 200 (application/json): object

- `data`: array of object (required) - Viewpoints for the requested ids (after issue-scoped filtering), MM order preserved.
  - `id`: string(uuid) e.g. `248df4b7-aa70-47b8-a036-33ac447e668d`
  - `company_id`: string e.g. `598134326349945`
  - `project_id`: string e.g. `598134325540867`
  - `scene_id`: string(uuid) e.g. `019c8ec2-961c-7895-887d-4d41bd2686fd`
  - `name`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `snapshot_url`: string
  - `created_by`: object
    - `id`: string e.g. `76490`
    - `name`: string
    - `first_name`: string
    - `last_name`: string
    - `email_address`: string
    - `avatar`: string
    - `job_title`: string
  - `updated_by`: object
    - `id`: string e.g. `76490`
    - `name`: string
    - `first_name`: string
    - `last_name`: string
    - `email_address`: string
    - `avatar`: string
    - `job_title`: string
  - `payload`: object - Viewpoint payload sent to / returned from Model Manager. Matches BIM MM `TypesViewpointPayload` (camera, clipping, visibility, snapshot, markup, measurements, etc.).
    - `camera`: object
    - `clipping`: object
    - `grouping`: string
    - `groups`: array of object
    - `id`: string(uuid)
    - `markup`: object
    - `measurements`: object
    - `name`: string
    - `outline_measure`: object
    - `render_mode`: string
    - `selection`: array of string
    - `snapshot`: object
    - `unit`: string
    - `visibility`: object
- `error`: object - BIM MM `ResponseErrorInfo` (optional on MM envelopes).
  - `code`: string
  - `message`: string
  - `details`: array of object

Error responses: 401, 403, 404, 422, 502 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues/{coordination_issue_id}/viewpoints/{viewpoint_id}

**Get one coordination issue viewpoint (Model Manager or legacy BimViewpoint, REST v2.0)**
Resolves a join row on this issue: **`viewpoint_uuid`** match first, else legacy **`bim_viewpoint_id`**.
- **MM-backed:** Model Manager `GET .../bim/viewpoints/{uuid}`; **`data`** is the MM viewpoint with
  **`primary`** and **`position`** merged from the join row (same idea as **PATCH** `200`).
- **Legacy:** `BimViewpointBlueprint` view `:procore_v0_1` for the linked `BimViewpoint`, plus **`primary`** /
  **`position`** from the join row.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `coordination_issue_id` [path] string (required) - Coordination Issue ID
- `viewpoint_id` [path] string (required) - **MM-backed:** Model Manager viewpoint UUID (`[0-9a-f-]{36}`, case-insensitive). **Legacy:** numeric `bim_viewpoints.id` for a join row that has `bim_viewpoint_id` (no `viewpoint_uuid`).
- `included` [query] string - **Ignored.** The `viewpoint_format` query parameter now controls the response shape. When `viewpoint_format=v2` (default), all viewpoints are returned in Model Manager shape. When `viewpoint_format=v1`, all viewpoints...
- `viewpoint_format` [query] string enum[v1, v2] - Specify the response format for viewpoint data. When `v1`, all viewpoints (including Model Manager-backed) are returned in legacy shape (`camera_data`, `sections_data`, `redlines_data` as JSON strings). Model Manager ...

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, 404, 502 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues/{coordination_issue_id}/viewpoints/{viewpoint_id}

**Update viewpoint mapping and/or Model Manager viewpoint content (REST v2.0)**
Updates the MM-backed mapping (`viewpoint_id` = `viewpoint_uuid`): **`primary`** and **`position`** on
`bim_viewpoints_coordination_issues`, and optionally **`name` / payload fields** via Model Manager PATCH.
Discrete fields (`camera_data`, `sections_data`, `redlines_data`, `visibility`, `render_mode`) are merged
into the current MM payload after loading the viewpoint from Model Manager, unless **`payload`** is sent
(full replace of MM payload).
Parity keys such as **`scene_id`** / **`bim_model_uuid`** are accepted but not applied on PATCH; a body
containing **only** those (and similar no-op) fields returns **422**.
When `primary` is `true`, any other primary mapping on this issue is cleared first (at most one primary).
Requires **at least one** attribute in the body. `position` must be an integer when provided
(unless explicitly set to `null` to clear). **502** if Model Manager returns 5xx.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `coordination_issue_id` [path] string (required) - Coordination Issue ID
- `viewpoint_id` [path] string (required) - **MM-backed:** Model Manager viewpoint UUID (`[0-9a-f-]{36}`, case-insensitive). **Legacy:** numeric `bim_viewpoints.id` for a join row that has `bim_viewpoint_id` (no `viewpoint_uuid`).

Request body (application/json) (required):

- `name`: string - Passed to Model Manager viewpoint PATCH (`name`) when provided.
- `scene_id`: string(uuid) - Accepted but not applied on PATCH (create-only relocation).
- `bim_model_uuid`: string(uuid) - Accepted but not applied on PATCH.
- `payload`: oneOf(object | string)
- `camera_data`: oneOf(object | string) - When `payload` is absent — merged into MM payload as `camera` (object or JSON string).
- `redlines_data`: oneOf(object | string) - When `payload` is absent — merged into MM payload as `markup`.
- `sections_data`: oneOf(object | string) - When `payload` is absent — merged into MM payload as `clipping.planes`.
- `render_mode`: string
- `bim_file_id`: string - Accepted but not applied on this PATCH flow.
- `bim_view_folder_id`: string - Accepted but not applied on this PATCH flow.
- `snapshot_upload_uuid`: string - Accepted but not applied on this PATCH flow.
- `primary`: boolean - Sets `is_primary` on the coordination-issue viewpoint mapping.
- `position`: integer - Sort order on the join row; send `null` to clear when supported by validation.
- `visibility`: object

Response 200 (application/json): object

- `data`: object (required)
  - `id`: string(uuid) e.g. `248df4b7-aa70-47b8-a036-33ac447e668d`
  - `company_id`: string e.g. `598134326349945`
  - `project_id`: string e.g. `598134325540867`
  - `scene_id`: string(uuid) e.g. `019c8ec2-961c-7895-887d-4d41bd2686fd`
  - `name`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `snapshot_url`: string
  - `created_by`: object
    - `id`: string e.g. `76490`
    - `name`: string
    - `first_name`: string
    - `last_name`: string
    - `email_address`: string
    - `avatar`: string
    - `job_title`: string
  - `updated_by`: object
    - `id`: string e.g. `76490`
    - `name`: string
    - `first_name`: string
    - `last_name`: string
    - `email_address`: string
    - `avatar`: string
    - `job_title`: string
  - `payload`: object - Viewpoint payload sent to / returned from Model Manager. Matches BIM MM `TypesViewpointPayload` (camera, clipping, visibility, snapshot, markup, measurements, etc.).
    - `camera`: object
    - `clipping`: object
    - `grouping`: string
    - `groups`: array of object
    - `id`: string(uuid)
    - `markup`: object
    - `measurements`: object
    - `name`: string
    - `outline_measure`: object
    - `render_mode`: string
    - `selection`: array of string
    - `snapshot`: object
    - `unit`: string
    - `visibility`: object
  - `primary`: boolean (required) - Whether this viewpoint mapping is primary on the coordination issue (`bim_viewpoints_coordination_issues.is_primary`).
  - `position`: integer (required) - Sort order on the coordination issue (`bim_viewpoints_coordination_issues.position`).

Error responses: 401, 403, 404, 422, 502 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues/{coordination_issue_id}/viewpoints/{viewpoint_id}

**Remove viewpoint association from issue (REST v2.0; MM soft-delete when applicable)**
Path parameter **`viewpoint_id`** must be a **UUID** (route constraint). The server resolves the join
row by **`viewpoint_uuid`** matching that id on this coordination issue (numeric `BimViewpoint` ids are
not valid on this path).
Transaction:
1. If the mapping has `viewpoint_uuid`, calls Model Manager `DELETE .../bim/viewpoints/{uuid}`.
   `404` from MM is ignored; local mapping is still removed.
2. Destroys the `coordination_issue_bim_viewpoints` row.
May trigger notification side effects for observers of the issue.
**Success response**: `head :ok` → **HTTP 200** with **no response body**.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `coordination_issue_id` [path] string (required) - Coordination Issue ID
- `viewpoint_id` [path] string (required) - **MM-backed:** Model Manager viewpoint UUID (`[0-9a-f-]{36}`, case-insensitive). **Legacy:** numeric `bim_viewpoints.id` for a join row that has `bim_viewpoint_id` (no `viewpoint_uuid`).

Response 200: OK — empty body (Content-Length 0) (no body)

Error responses: 401, 403, 404, 502 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues/viewpoints/resolve_model

**Resolve scene_id to bim_model_id for viewpoint deep linking**
Resolves a platform `scene_id` (from a Model Manager viewpoint) to the corresponding
`bim_model_id`. This endpoint is used by the CI MFE to construct deep-link URLs to
the document viewer with viewpoint restoration.
The resolution happens via the Model Manager service: queries model revisions filtered
by `current_platform_scene_id` and returns the `bim_model_id` from the first matching
revision.
**Not nested under a coordination issue** — authorized at the project level.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `scene_id` [query] string(uuid) (required) - Platform scene UUID from the Model Manager viewpoint's `scene_id` field.

Response 200 (application/json): object

- `data`: object (required)
  - `bim_model_id`: string(uuid) (required) - The BIM model UUID that owns the given scene.

Error responses: 401, 403, 404, 422, 502 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Coordination Issues

Resource id: `coordination-issues`. Raw spec: `../openapi-raw/coordination-issues.json`. Web: https://developers.procore.com/reference/rest/coordination-issues?version=latest
Product lines: Design Coordination

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues

**List coordination issues for a project (REST v2.0)**
Returns a paginated list of coordination issues visible to the user within the project.
Supports `view=ids_only` for `{ "data": [<id>, ...] }` (JSON numbers from `pluck(:id)`).
 Query `included` controls which attributes are present on each item (see schema description).
 Include `permissions` in the query to get `can_edit` field for each issue.
 When `save_sticky_filters` is truthy, list filters may be persisted for the tool (sticky filters).
 **`filters[is_private]`** narrows to public (`false`) or private (`true`) issues. Private-issue
 filtering may be unavailable in some projects, in which case all issues remain public.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `view` [query] string enum[ids_only] - When `ids_only`, response is id list only (no full blueprint objects).
- `save_sticky_filters` [query] boolean - When true, persist current filters for the coordination issues tool where supported.
- `included` [query] string - Comma-separated blueprint field names (e.g. `assignee,title,uuid,location,is_private`). When omitted or empty, all conditional fields are included.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[assignee_company_id]` [query] array of string - Filter item(s) with matching assignee vendor companies.
- `filters[assignee_id]` [query] array of string - Filter item(s) with matching assignee user IDs.
- `filters[created_by_id]` [query] array of string - Return item(s) created by the specified User IDs
- `filters[created_by_company_id]` [query] array of string - Filter item(s) with matching created by vendor companies.
- `filters[created_from]` [query] array of string - Filter item(s) by creation source.
- `filters[ids]` [query] array of integer - Return only coordination issues with these ids (see `CoordinationIssues::Filter` / `with_ids`).
- `filters[location_id]` [query] string - Filters by specific location (Note: Use *either* this or location_id_with_sublocations, but not both)
- `filters[include_sublocations]` [query] boolean - Use together with `filters[location_id]`
- `filters[search]` [query] string - Returns item(s) matching the specified search query string.
- `filters[status]` [query] string - Return item(s) with the specified statuses
- `filters[issue_type]` [query] array of string - Filter item(s) by issue type.
- `filters[priority]` [query] array of string - Filter item(s) by priority level.
- `filters[trade_id]` [query] string - Trade ID
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[due_date]` [query] string(date) - Filter Coordination Issues by due date.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `sort` [query] string enum[created_at, -created_at, updated_at, -updated_at, due_date, -due_date, title, -title, status, -status, assignee, -assignee, ...] - Sort results by field. Direction (asc/desc) controlled by presence or absence of '-' prefix.
- `filters[overdue]` [query] boolean - Filter for overdue Coordination Issues.
- `filters[document_container_id]` [query] array of string - Filter Coordination Issues by document container ID(s).
- `filters[document_revision_id]` [query] array of string - Filter Coordination Issues by document revision ID(s).
- `filters[coordination_issue_file_id]` [query] array of string - Filter by BIM / coordination issue file id(s).
- `filters[watcher_id]` [query] array of string - Filter by watcher user id(s).
- `filters[is_private]` [query] array of boolean - Filter by private flag. When the `enable-ci-private` feature is inactive for the project, all issues behave as public for visibility and this filter has limited effect. Values are booleans (`true` = private, `false` =...
- `filters[include_deleted]` [query] string enum[only, with] - Controls visibility of soft-deleted coordination issues (recycle bin). - `only`: return only soft-deleted issues - `with`: return all issues including deleted ones - omitted (default): return only active issues Requir...

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues

**Create a coordination issue (REST v2.0)**
Creates an issue via `CoordinationIssues::Public::CreateService`. Request body is **flat** JSON
(not wrapped in `coordination_issue`). See create schema for which fields are persisted vs accepted-only.
**`status: in_progress`:** May be unavailable in some projects; when unavailable it is stored as `open`.
**`is_private`:** Optional boolean; when sent, persisted on create (see create request schema).
Observers may enqueue notifications / activity side effects.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `project_id`: string - Path includes project; may be echoed in body (ignored for scoping).
- `company_id`: string - Company id for the new issue (typically matches path company).
- `title`: string (required) - Required issue title.
- `description`: string - Free-text description of the coordination issue.
- `creation_source`: string e.g. `navisworks`
- `status`: string - Initial status. On create, only `open`, `closed`, or `in_progress` are valid. `in_progress` may be unavailable in some projects, in which case it is stored as `open`.
- `location_id`: string - Location id scoped to the project.
- `assignee_id`: string - Login information / user id for assignee.
- `bim_file_id`: string - BIM file id for the coordination issue file association.
- `bim_model_id`: string
- `due_date`: string(date) - Due date for the coordination issue.
- `issue_type`: string - Issue type label, such as `clash` or `building_code`.
- `priority`: string - Permitted by controller; not applied by `CreateService` — use PATCH to set.
- `coordination_issue_type_id`: string - ID of the configurable coordination issue type to assign.
- `coordination_issue_priority_id`: string - ID of the configurable coordination issue priority to assign.
- `trade_id`: string
- `is_private`: boolean - When `true`, creates a **private** coordination issue (restricted visibility). Omitted keys leave the column at its default (typically public).
- `attachment_upload_uuids`: array of string - Prostore upload UUIDs for new attachments.
- `watcher_ids`: array of integer - User ids to add as watchers on the new coordination issue.
- `origin`: object - Optional origin metadata stored with the issue when created or updated.
  - `origin_id`: string
  - `origin_type`: string e.g. `BcfTopic`
  - `deep_link_url`: string(uri)
  - `title`: string
- `document_snapshot`: object - Optional inline document snapshot to create with the issue. The `snapshot_upload_uuid` references a previously uploaded file; a `ProstoreFile` is created from it and linked to the new snapshot.
  - `snapshot_upload_uuid`: string(uuid) - UUID of the previously uploaded snapshot file.
  - `document_container_id`: string - The document container (folder) the source document belongs to.
  - `document_revision_id`: string - The document revision id from which the snapshot was taken.
  - `document_revision_version_id`: string - The specific document revision version id for this snapshot.

Response 201 (application/json): object

- `data`: object (required) - Rendered by `V2::CoordinationIssueBlueprint`. **`id` is always present.** Other keys depend on `included`: when `included` is omitted or empty, all conditional blueprint fields are serialized; when `included` lists co...
  - `id`: string (required) e.g. `426`
  - `uuid`: string(uuid)
  - `title`: string
  - `description`: string
  - `status`: string - Current status (e.g. `open`, `closed`, `in_progress`). In projects where `in_progress` is unavailable, issues stored as `in_progress` may serialize as `open`.
  - `issue_number`: integer
  - `creation_source`: string
  - `is_private`: boolean - Present when `included` contains `is_private` or when `included` is omitted (all fields). Indicates a private coordination issue when `true`.
  - `issue_type`: string
  - `priority`: string
  - `coordination_issue_type`: object - Configurable issue type record (`CompanyConfigurableBlueprint`: `id`, `name`, `active`, `position`, `global`, `deletable`, timestamps). Present when `included` contains `coordination_issue_type` or is omitted.
  - `coordination_issue_priority`: object - Configurable priority record (`CompanyConfigurableBlueprint`: `id`, `name`, `active`, `position`, `global`, `deletable`, timestamps). Present when `included` contains `coordination_issue_priority` or is omitted.
  - `due_date`: string(date)
  - `closed_date`: string(date)
  - `project_id`: string
  - `bim_model_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `comments_count`: integer
  - `viewpoint_count`: integer - Number of viewpoints attached to this coordination issue.
  - `coordination_issue_bim_viewpoints`: array of object - Viewpoint mappings on this issue (`CoordinationIssueBimViewpointBlueprint` view `:normal`). Present when `included` contains `coordination_issue_bim_viewpoints` or is omitted.
    - `id`: integer - Viewpoint mapping (join) record id.
    - `bim_viewpoint_id`: integer - Linked legacy BIM viewpoint id; null for Model Manager-backed mappings.
    - `is_primary`: boolean - Whether this mapping is the primary viewpoint for the issue.
  - `bim_file`: object - BIM file (`BimFileBlueprint` basic), when included.
  - `source_file`: object - Resolved source file for the coordination issue. Returns the document name from `document_container_metadata` when present, otherwise falls back to the BIM file.
    - `id`: string - Document container id or BIM file id.
    - `name`: string - Document or BIM file name.
    - `type`: string enum[document, bim_file] - Source type — `document` or `bim_file`.
  - `trade`: object
  - `location`: object
  - `assignee`: object
  - `created_by`: object
  - `updated_by`: object
  - `watchers`: array of object
  - `origin`: object
  - `attachments`: array of object
  - `drawing_revision`: object
  - `linked_drawings`: array of object - Drawing revisions linked via published drawing markup (Coordination Issue pin), same semantics as REST v1 `view=extended`. Omitted unless `included` lists `linked_drawings` or `included` is omitted/empty.
    - `id`: string - Drawing revision id
    - `title`: string - Formatted drawing title
    - `url`: string - Deep link to the drawing with focused markup element
  - `drawing_markup_preview_images`: array of object - Preview images for published drawing markup layers. Omitted unless `included` lists `drawing_markup_preview_images` or `included` is omitted/empty.
    - `id`: string
    - `drawing_revision_id`: string
    - `name`: string
    - `content_type`: string
    - `url`: string
  - `linked_procore_items`: array of object
  - `linked_observation_items`: array of object
  - `document_container_metadata`: object
  - `document_snapshots`: array of object - Document snapshots linked to this coordination issue (`CoordinationIssueDocumentSnapshotBlueprint` view `:normal`). Present when `included` contains `document_snapshots` or is omitted.
    - `id`: string (required) - Document snapshot record id. e.g. `42`
    - `document_container_id`: string - The document container (folder) the source document belongs to. e.g. `1001`
    - `document_name`: string - Human-readable name of the source document. Surfaced as the coordination issue's source file for outside-workflow (document snapshot) issues. May be null for snapshots created before this field existed. e.g. `Floor Plan.pdf`
    - `document_revision_id`: string - The document revision id from which the snapshot was taken. e.g. `2001`
    - `document_revision_version_id`: string - The specific document revision version id for this snapshot. e.g. `3001`
    - `created_at`: string(date-time) - Timestamp when the snapshot was created. e.g. `2026-03-30T12:00:00Z`
    - `prostore_file`: object - Prostore file object (`ProstoreFileBlueprint` view `:normal_with_viewable`). Contains the snapshot image file details including a signed URL, content type, and whether the file is viewable.
  - `custom_fields`: object
  - `permissions`: object - User permissions on this coordination issue. Returned only when `policy_context` is provided in render options (typically by including the `X-Policy-Context` header or equivalent).
    - `can_edit`: boolean - Whether the current user can edit (update) this coordination issue. Requires `update_coordination_issue` permission from the policy AND the workflow (if present) to not be terminated or completed. e.g. `true`
    - `can_update_status`: boolean - Whether the current user can change the issue's status. Present only when the policy supports status transitions; true when at least one status action is available and the workflow (if present) is active. e.g. `true`

Error responses: 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues/{id}

**Show a coordination issue (REST v2.0)**
Returns a single issue through the scoped collection (filters apply). Supports `included` like index.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Coordination Issue ID (numeric)
- `included` [query] string - Comma-separated field names to include (same as list endpoint; e.g. `is_private`, `assignee`).
- `include_deleted` [query] string enum[true] - When `true`, also searches soft-deleted issues. Requires `view_deleted_coordination_issue` permission.

Response 200 (application/json): object

- `data`: object (required) - Rendered by `V2::CoordinationIssueBlueprint`. **`id` is always present.** Other keys depend on `included`: when `included` is omitted or empty, all conditional blueprint fields are serialized; when `included` lists co...
  - `id`: string (required) e.g. `426`
  - `uuid`: string(uuid)
  - `title`: string
  - `description`: string
  - `status`: string - Current status (e.g. `open`, `closed`, `in_progress`). In projects where `in_progress` is unavailable, issues stored as `in_progress` may serialize as `open`.
  - `issue_number`: integer
  - `creation_source`: string
  - `is_private`: boolean - Present when `included` contains `is_private` or when `included` is omitted (all fields). Indicates a private coordination issue when `true`.
  - `issue_type`: string
  - `priority`: string
  - `coordination_issue_type`: object - Configurable issue type record (`CompanyConfigurableBlueprint`: `id`, `name`, `active`, `position`, `global`, `deletable`, timestamps). Present when `included` contains `coordination_issue_type` or is omitted.
  - `coordination_issue_priority`: object - Configurable priority record (`CompanyConfigurableBlueprint`: `id`, `name`, `active`, `position`, `global`, `deletable`, timestamps). Present when `included` contains `coordination_issue_priority` or is omitted.
  - `due_date`: string(date)
  - `closed_date`: string(date)
  - `project_id`: string
  - `bim_model_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `comments_count`: integer
  - `viewpoint_count`: integer - Number of viewpoints attached to this coordination issue.
  - `coordination_issue_bim_viewpoints`: array of object - Viewpoint mappings on this issue (`CoordinationIssueBimViewpointBlueprint` view `:normal`). Present when `included` contains `coordination_issue_bim_viewpoints` or is omitted.
    - `id`: integer - Viewpoint mapping (join) record id.
    - `bim_viewpoint_id`: integer - Linked legacy BIM viewpoint id; null for Model Manager-backed mappings.
    - `is_primary`: boolean - Whether this mapping is the primary viewpoint for the issue.
  - `bim_file`: object - BIM file (`BimFileBlueprint` basic), when included.
  - `source_file`: object - Resolved source file for the coordination issue. Returns the document name from `document_container_metadata` when present, otherwise falls back to the BIM file.
    - `id`: string - Document container id or BIM file id.
    - `name`: string - Document or BIM file name.
    - `type`: string enum[document, bim_file] - Source type — `document` or `bim_file`.
  - `trade`: object
  - `location`: object
  - `assignee`: object
  - `created_by`: object
  - `updated_by`: object
  - `watchers`: array of object
  - `origin`: object
  - `attachments`: array of object
  - `drawing_revision`: object
  - `linked_drawings`: array of object - Drawing revisions linked via published drawing markup (Coordination Issue pin), same semantics as REST v1 `view=extended`. Omitted unless `included` lists `linked_drawings` or `included` is omitted/empty.
    - `id`: string - Drawing revision id
    - `title`: string - Formatted drawing title
    - `url`: string - Deep link to the drawing with focused markup element
  - `drawing_markup_preview_images`: array of object - Preview images for published drawing markup layers. Omitted unless `included` lists `drawing_markup_preview_images` or `included` is omitted/empty.
    - `id`: string
    - `drawing_revision_id`: string
    - `name`: string
    - `content_type`: string
    - `url`: string
  - `linked_procore_items`: array of object
  - `linked_observation_items`: array of object
  - `document_container_metadata`: object
  - `document_snapshots`: array of object - Document snapshots linked to this coordination issue (`CoordinationIssueDocumentSnapshotBlueprint` view `:normal`). Present when `included` contains `document_snapshots` or is omitted.
    - `id`: string (required) - Document snapshot record id. e.g. `42`
    - `document_container_id`: string - The document container (folder) the source document belongs to. e.g. `1001`
    - `document_name`: string - Human-readable name of the source document. Surfaced as the coordination issue's source file for outside-workflow (document snapshot) issues. May be null for snapshots created before this field existed. e.g. `Floor Plan.pdf`
    - `document_revision_id`: string - The document revision id from which the snapshot was taken. e.g. `2001`
    - `document_revision_version_id`: string - The specific document revision version id for this snapshot. e.g. `3001`
    - `created_at`: string(date-time) - Timestamp when the snapshot was created. e.g. `2026-03-30T12:00:00Z`
    - `prostore_file`: object - Prostore file object (`ProstoreFileBlueprint` view `:normal_with_viewable`). Contains the snapshot image file details including a signed URL, content type, and whether the file is viewable.
  - `custom_fields`: object
  - `permissions`: object - User permissions on this coordination issue. Returned only when `policy_context` is provided in render options (typically by including the `X-Policy-Context` header or equivalent).
    - `can_edit`: boolean - Whether the current user can edit (update) this coordination issue. Requires `update_coordination_issue` permission from the policy AND the workflow (if present) to not be terminated or completed. e.g. `true`
    - `can_update_status`: boolean - Whether the current user can change the issue's status. Present only when the policy supports status transitions; true when at least one status action is available and the workflow (if present) is active. e.g. `true`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues/{id}

**Update a coordination issue (REST v2.0)**
JSON body may be either:
1. **Nested (recommended):** a **`coordination_issue`** object with attributes to update, or  
2. **Flat:** the same attribute keys at the **root** of the JSON (no `coordination_issue` wrapper).
Updates use `CoordinationIssues::Public::UpdateService`. `bim_file_id` is mapped to the internal file association.
**`status: in_progress`:** May be unavailable in some projects; when unavailable it is stored as `open`.
**`is_private`:** Optional boolean; when sent, persisted on update (see update schema).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Coordination Issue ID (numeric)

Request body (application/json) (required):

- oneOf(object | object)

Response 200 (application/json): object

- `data`: object (required) - Rendered by `V2::CoordinationIssueBlueprint`. **`id` is always present.** Other keys depend on `included`: when `included` is omitted or empty, all conditional blueprint fields are serialized; when `included` lists co...
  - `id`: string (required) e.g. `426`
  - `uuid`: string(uuid)
  - `title`: string
  - `description`: string
  - `status`: string - Current status (e.g. `open`, `closed`, `in_progress`). In projects where `in_progress` is unavailable, issues stored as `in_progress` may serialize as `open`.
  - `issue_number`: integer
  - `creation_source`: string
  - `is_private`: boolean - Present when `included` contains `is_private` or when `included` is omitted (all fields). Indicates a private coordination issue when `true`.
  - `issue_type`: string
  - `priority`: string
  - `coordination_issue_type`: object - Configurable issue type record (`CompanyConfigurableBlueprint`: `id`, `name`, `active`, `position`, `global`, `deletable`, timestamps). Present when `included` contains `coordination_issue_type` or is omitted.
  - `coordination_issue_priority`: object - Configurable priority record (`CompanyConfigurableBlueprint`: `id`, `name`, `active`, `position`, `global`, `deletable`, timestamps). Present when `included` contains `coordination_issue_priority` or is omitted.
  - `due_date`: string(date)
  - `closed_date`: string(date)
  - `project_id`: string
  - `bim_model_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `comments_count`: integer
  - `viewpoint_count`: integer - Number of viewpoints attached to this coordination issue.
  - `coordination_issue_bim_viewpoints`: array of object - Viewpoint mappings on this issue (`CoordinationIssueBimViewpointBlueprint` view `:normal`). Present when `included` contains `coordination_issue_bim_viewpoints` or is omitted.
    - `id`: integer - Viewpoint mapping (join) record id.
    - `bim_viewpoint_id`: integer - Linked legacy BIM viewpoint id; null for Model Manager-backed mappings.
    - `is_primary`: boolean - Whether this mapping is the primary viewpoint for the issue.
  - `bim_file`: object - BIM file (`BimFileBlueprint` basic), when included.
  - `source_file`: object - Resolved source file for the coordination issue. Returns the document name from `document_container_metadata` when present, otherwise falls back to the BIM file.
    - `id`: string - Document container id or BIM file id.
    - `name`: string - Document or BIM file name.
    - `type`: string enum[document, bim_file] - Source type — `document` or `bim_file`.
  - `trade`: object
  - `location`: object
  - `assignee`: object
  - `created_by`: object
  - `updated_by`: object
  - `watchers`: array of object
  - `origin`: object
  - `attachments`: array of object
  - `drawing_revision`: object
  - `linked_drawings`: array of object - Drawing revisions linked via published drawing markup (Coordination Issue pin), same semantics as REST v1 `view=extended`. Omitted unless `included` lists `linked_drawings` or `included` is omitted/empty.
    - `id`: string - Drawing revision id
    - `title`: string - Formatted drawing title
    - `url`: string - Deep link to the drawing with focused markup element
  - `drawing_markup_preview_images`: array of object - Preview images for published drawing markup layers. Omitted unless `included` lists `drawing_markup_preview_images` or `included` is omitted/empty.
    - `id`: string
    - `drawing_revision_id`: string
    - `name`: string
    - `content_type`: string
    - `url`: string
  - `linked_procore_items`: array of object
  - `linked_observation_items`: array of object
  - `document_container_metadata`: object
  - `document_snapshots`: array of object - Document snapshots linked to this coordination issue (`CoordinationIssueDocumentSnapshotBlueprint` view `:normal`). Present when `included` contains `document_snapshots` or is omitted.
    - `id`: string (required) - Document snapshot record id. e.g. `42`
    - `document_container_id`: string - The document container (folder) the source document belongs to. e.g. `1001`
    - `document_name`: string - Human-readable name of the source document. Surfaced as the coordination issue's source file for outside-workflow (document snapshot) issues. May be null for snapshots created before this field existed. e.g. `Floor Plan.pdf`
    - `document_revision_id`: string - The document revision id from which the snapshot was taken. e.g. `2001`
    - `document_revision_version_id`: string - The specific document revision version id for this snapshot. e.g. `3001`
    - `created_at`: string(date-time) - Timestamp when the snapshot was created. e.g. `2026-03-30T12:00:00Z`
    - `prostore_file`: object - Prostore file object (`ProstoreFileBlueprint` view `:normal_with_viewable`). Contains the snapshot image file details including a signed URL, content type, and whether the file is viewable.
  - `custom_fields`: object
  - `permissions`: object - User permissions on this coordination issue. Returned only when `policy_context` is provided in render options (typically by including the `X-Policy-Context` header or equivalent).
    - `can_edit`: boolean - Whether the current user can edit (update) this coordination issue. Requires `update_coordination_issue` permission from the policy AND the workflow (if present) to not be terminated or completed. e.g. `true`
    - `can_update_status`: boolean - Whether the current user can change the issue's status. Present only when the policy supports status transitions; true when at least one status action is available and the workflow (if present) is active. e.g. `true`

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues/{id}

**Delete a coordination issue (REST v2.0)**
Soft-delete flow via `CoordinationIssues::Public::DeleteService` with notification observer.
**Success**: `head :ok` → **HTTP 200** with an **empty** body.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Coordination Issue ID (numeric)

Response 200: OK — empty body (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues/{id}/restore

**Restore a soft-deleted coordination issue (REST v2.0)**
Restores a soft-deleted coordination issue and all associated records (recursive restore).
The issue becomes active again and will appear in the standard index listing.
Requires `update_deleted_coordination_issue` permission.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - ID of the soft-deleted coordination issue to restore

Response 200 (application/json): object

- `data`: object (required) - Rendered by `V2::CoordinationIssueBlueprint`. **`id` is always present.** Other keys depend on `included`: when `included` is omitted or empty, all conditional blueprint fields are serialized; when `included` lists co...
  - `id`: string (required) e.g. `426`
  - `uuid`: string(uuid)
  - `title`: string
  - `description`: string
  - `status`: string - Current status (e.g. `open`, `closed`, `in_progress`). In projects where `in_progress` is unavailable, issues stored as `in_progress` may serialize as `open`.
  - `issue_number`: integer
  - `creation_source`: string
  - `is_private`: boolean - Present when `included` contains `is_private` or when `included` is omitted (all fields). Indicates a private coordination issue when `true`.
  - `issue_type`: string
  - `priority`: string
  - `coordination_issue_type`: object - Configurable issue type record (`CompanyConfigurableBlueprint`: `id`, `name`, `active`, `position`, `global`, `deletable`, timestamps). Present when `included` contains `coordination_issue_type` or is omitted.
  - `coordination_issue_priority`: object - Configurable priority record (`CompanyConfigurableBlueprint`: `id`, `name`, `active`, `position`, `global`, `deletable`, timestamps). Present when `included` contains `coordination_issue_priority` or is omitted.
  - `due_date`: string(date)
  - `closed_date`: string(date)
  - `project_id`: string
  - `bim_model_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `comments_count`: integer
  - `viewpoint_count`: integer - Number of viewpoints attached to this coordination issue.
  - `coordination_issue_bim_viewpoints`: array of object - Viewpoint mappings on this issue (`CoordinationIssueBimViewpointBlueprint` view `:normal`). Present when `included` contains `coordination_issue_bim_viewpoints` or is omitted.
    - `id`: integer - Viewpoint mapping (join) record id.
    - `bim_viewpoint_id`: integer - Linked legacy BIM viewpoint id; null for Model Manager-backed mappings.
    - `is_primary`: boolean - Whether this mapping is the primary viewpoint for the issue.
  - `bim_file`: object - BIM file (`BimFileBlueprint` basic), when included.
  - `source_file`: object - Resolved source file for the coordination issue. Returns the document name from `document_container_metadata` when present, otherwise falls back to the BIM file.
    - `id`: string - Document container id or BIM file id.
    - `name`: string - Document or BIM file name.
    - `type`: string enum[document, bim_file] - Source type — `document` or `bim_file`.
  - `trade`: object
  - `location`: object
  - `assignee`: object
  - `created_by`: object
  - `updated_by`: object
  - `watchers`: array of object
  - `origin`: object
  - `attachments`: array of object
  - `drawing_revision`: object
  - `linked_drawings`: array of object - Drawing revisions linked via published drawing markup (Coordination Issue pin), same semantics as REST v1 `view=extended`. Omitted unless `included` lists `linked_drawings` or `included` is omitted/empty.
    - `id`: string - Drawing revision id
    - `title`: string - Formatted drawing title
    - `url`: string - Deep link to the drawing with focused markup element
  - `drawing_markup_preview_images`: array of object - Preview images for published drawing markup layers. Omitted unless `included` lists `drawing_markup_preview_images` or `included` is omitted/empty.
    - `id`: string
    - `drawing_revision_id`: string
    - `name`: string
    - `content_type`: string
    - `url`: string
  - `linked_procore_items`: array of object
  - `linked_observation_items`: array of object
  - `document_container_metadata`: object
  - `document_snapshots`: array of object - Document snapshots linked to this coordination issue (`CoordinationIssueDocumentSnapshotBlueprint` view `:normal`). Present when `included` contains `document_snapshots` or is omitted.
    - `id`: string (required) - Document snapshot record id. e.g. `42`
    - `document_container_id`: string - The document container (folder) the source document belongs to. e.g. `1001`
    - `document_name`: string - Human-readable name of the source document. Surfaced as the coordination issue's source file for outside-workflow (document snapshot) issues. May be null for snapshots created before this field existed. e.g. `Floor Plan.pdf`
    - `document_revision_id`: string - The document revision id from which the snapshot was taken. e.g. `2001`
    - `document_revision_version_id`: string - The specific document revision version id for this snapshot. e.g. `3001`
    - `created_at`: string(date-time) - Timestamp when the snapshot was created. e.g. `2026-03-30T12:00:00Z`
    - `prostore_file`: object - Prostore file object (`ProstoreFileBlueprint` view `:normal_with_viewable`). Contains the snapshot image file details including a signed URL, content type, and whether the file is viewable.
  - `custom_fields`: object
  - `permissions`: object - User permissions on this coordination issue. Returned only when `policy_context` is provided in render options (typically by including the `X-Policy-Context` header or equivalent).
    - `can_edit`: boolean - Whether the current user can edit (update) this coordination issue. Requires `update_coordination_issue` permission from the policy AND the workflow (if present) to not be terminated or completed. e.g. `true`
    - `can_update_status`: boolean - Whether the current user can change the issue's status. Present only when the policy supports status transitions; true when at least one status action is available and the workflow (if present) is active. e.g. `true`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/coordination_issues

**List Coordination Issues**
Lists Coordination Issues associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[assignee_company_id][]` [query] array of integer - Filter item(s) with matching assignee vendor companies.
- `filters[assignee_id][]` [query] array of integer - Filter item(s) with matching assignees.
- `filters[created_by_id][]` [query] array of integer - Filter item(s) with matching User IDs.
- `filters[created_by_company_id][]` [query] array of integer - Filter item(s) with matching created by vendor companies.
- `filters[created_from][]` [query] array of string - Filter item(s) with matching creation source.
- `filters[ids][]` [query] array of integer - Filter item(s) with matching ids.
- `filters[location_id][]` [query] array of integer - Filter item(s) with matching locations.
- `filters[include_sublocations]` [query] boolean - Use together with `filters[location_id]`
- `filters[search]` [query] string - Filter item(s) with the matching search query. The search is performed on title and issue number.
- `filters[coordination_issue_file_id][]` [query] array of integer - Filter item(s) with the exact coordination issue file.
- `filters[status][]` [query] array of string enum[open, in_progress, blocked, unblocked, ready_for_review, closed, moved_to_observation] - Filter item(s) with matching status.
- `filters[issue_type][]` [query] array of string enum[building_code, clash, client_feedback, constructability, coordination, design_review, existing_condition, requirement_change, other] - Filter item(s) with matching issue_type.
- `filters[priority][]` [query] array of string enum[low, medium, high, critical] - Filter item(s) with matching priority.
- `filters[trade_id][]` [query] array of integer - Filter item(s) with matching trades.
- `filters[updated_at]` [query] string - Filter item(s) within a specific updated at iso8601 datetime range.
- `filters[due_date]` [query] string - Filter item(s) within a specific due date iso8601 date range.
- `filters[created_at]` [query] string - Filter item(s) within a specific created at iso8601 datetime range.
- `sort` [query] string enum[closed_date, company_then_status, description, due_date, issue_number, issue_type, location, location_then_created_at, location_then_due_date, location_then_issue_number, location_then_issue_type, location_then_priority, ...] - Sort item(s) by an attribute. The default sort is ascending. To sort in descending order, prepend the sort value with a hyphen character '-'
- `view` [query] string enum[compact, normal, extended] - The compact view contains only ids. The normal view is a subset of the response shown below, and does not include attachments, viewpoints, linked items and updated_by The extended view contains the response shown belo...
- `viewpoint_format` [query] string enum[default, procore] - Specify viewpoint data format. This parameter functions only when the query parameter view is 'extended' The default format returns the viewpoint content as saved. The procore format returns the viewpoint content conv...
- `filters[overdue]` [query] boolean - Filter item(s) with matching Overdue.
- `filters[document_container_id][]` [query] array of string - Filter Coordination Issues by document container ID(s).
- `filters[document_revision_id][]` [query] array of string - Filter Coordination Issues by document revision ID(s).
- `save_sticky_filters` [query] boolean - Persists filter parameters for the requesting user and project.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `426`
- `uuid`: string - Unique identifier for the issue. This is auto-generated attribute if not provided during issue creation. e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
- `title`: string - Coordination Issue title. The title can have a maximum of 80 characters. e.g. `Plumbing Issue on second floor`
- `description`: string - Coordination Issue description. e.g. `Elaborate details on the plumbing issue`
- `status`: string enum[open, in_progress, blocked, unblocked, ready_for_review, moved_to_observation, closed] - Status of the issue. e.g. `open`
- `issue_number`: integer - Issue Number. A number that can be referred by users to easily identify an issue. Issue number starts from 1 for each project, and is unique per project e.g. `2`
- `creation_source`: string - Coordination Issue can be created from Procore app or a plugin i.e. a source e.g. `navisworks`
- `due_date`: string - Due date of the Coordination Issue. Accepted date formats are "yyyy-mm-dd" and "yyyymmdd" e.g. `2018-08-16`
- `coordination_issue_file`: object - BIM File
  - `id`: integer - ID e.g. `101`
  - `name`: string - Name of the file to be associated to a project e.g. `101_BLDG_FLR_2.NWF`
  - `uuid`: string - Unique UUID associated with the file e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
- `project_id`: number(integer) - Unique identifier for the project. e.g. `29`
- `bim_model_id`: number(integer) - Model ID e.g. `86`
- `comments_count`: number(integer) - Count of comments e.g. `15`
- `issue_type`: string - Issue type of the Coordination Issue e.g. `building_code`
- `priority`: string - Priority of the Coordination Issue e.g. `high`
- `drawing_revision`: object
  - `id`: integer - ID e.g. `662`
  - `title`: string - Formatted title of the drawing revision e.g. `A001: COVER SHEET Rev.0`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `origin`: object - Origin source for a Coordination Issue
  - `title`: string - Title of the origin item e.g. `My BcfTopic`
  - `origin_id`: string - Id of the origin item e.g. `7b3c8752-e03e-417f-bb57-46bb5aca1139`
  - `origin_type`: string - Type of origin item e.g. `BcfTopic`
  - `deep_link_url`: string - Deep link URL to the origin item e.g. `https://some-company.com/bcf-topics/156`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `assignee`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `updated_by`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
- `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
- `viewpoints`: array of object - An array of viewpoints
  - `id`: integer - ID e.g. `206`
  - `bim_file_id`: integer - ID of associated BIM File e.g. `809`
  - `view_folder_id`: integer - ID of associated BIM View Folder e.g. `316`
  - `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
  - `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
  - `snapshot`: object
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `content_type`: string - A mime type or a file extension e.g. `image/png`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `name`: string - Viewpoint name e.g. `Mechanical Conflict View`
  - `render_mode`: string enum[shaded, xray] - Viewer render mode when viewpoint is applied
  - `uuid`: string - Unique identifier for the Extraction viewpoint e.g. `123e4567-e89b-12d3-a456-426614174000`
  - `visibility`: object - Object Visibility settings
    - `default_visibility`: boolean
    - `exceptions`: object - Group of model objects represented as an array of object ids, or object ranges
  - `camera_data`: string - JSON string representation of camera position e.g. `{"perspective_camera":{"camera_direction":{"x":-0.24,"y":-0.14,"z":-0.99},"ca...`
  - `redlines_data`: string - JSON string representation of markup e.g. `{"lines":[{"color":{"a":1.0,"b":0,"g":0,"r":1},"end_point":{"x":-0.29,"y":-0....`
  - `sections_data`: string - JSON string representation of sections applied to a 3d model as a set of clipping planes e.g. `[{"location":{"x":0.0,"y":0.0,"z":28.82},"direction":{"x":0,"y":0,"z":-1},"un...`
- `attachments`: array of object - An array of attachments
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `viewable`: boolean - Boolean value indicating whether or not a viewable document has been created for the file.
- `linked_procore_items`: array of object - Procore items linked to Coordination Issue
  - `id`: integer - ID e.g. `101`
  - `coordination_issue_id`: integer - Id of the associated Coordination Issue e.g. `426`
  - `item_id`: integer - Id of the associated Procore item e.g. `1287`
  - `item_type`: string - Type of the associated Procore item e.g. `rfi`
  - `item_url`: string - Deep-link URL to the associated Procore item e.g. `http://app.procore.com/3664/project/rfi/show/16768`
  - `item_data`: object - This field shows data specific to the associated item. If item type is RFI, it will contain attribute subject, number, and has_official_response
    - `has_official_response`: boolean e.g. `true`
    - `subject`: string e.g. `Construction RFI`
    - `number`: string e.g. `84`
- `linked_drawings`: array of object - Details of drawings linked to Coordination Issue
  - `id`: integer - Drawing ID e.g. `667`
  - `title`: string - Formatted title of the drawing e.g. `A201: Floor II Plan`
  - `url`: string - Procore Web App URL of the drawing e.g. `http://app.procore.com/drawings/1`
- `linked_observation_items`: array of object - Observation Items linked to Coordination Issue
  - `id`: integer - ID e.g. `93`
  - `number`: string - Observation Item number e.g. `113`
  - `personal`: boolean - Observation Item privacy status e.g. `true`
  - `title`: string - Formatted Observation Item title e.g. `#113 - Duct and Structural Conflict`
  - `url`: string - Deep-link URL to Observation Item e.g. `http://app.procore.com/3664/project/observations/items/7142`
  - `created_by_id`: integer - ID of user that created the Observation Item e.g. `47531`
- `document_container_metadata`: object - Document container metadata associated with the Coordination Issue
  - `id`: integer - ID of the document container metadata e.g. `1`
  - `document_container_id`: string - Unique identifier of the document container e.g. `container-123`
  - `document_revision_id`: string - Unique identifier of the document revision e.g. `revision-456`
  - `workflows_instance_id`: integer - ID of the associated workflow instance e.g. `789`
  - `pin_id`: string - Unique identifier of the pin e.g. `pin-abc-123`
- `document_snapshots`: array of object - Point-in-time snapshot images of document revisions linked to the Coordination Issue.
  - `id`: integer - ID of the document snapshot e.g. `42`
  - `document_container_id`: string - Unique identifier of the document container the source document belongs to e.g. `container-123`
  - `document_name`: string - Human-readable name of the source document. Surfaced as the Coordination Issue's source file for outside-workflow (document snapshot) issues. May be null for snapshots created before this field existed. e.g. `Floor Plan.pdf`
  - `document_revision_id`: string - Unique identifier of the document revision the snapshot was taken from e.g. `revision-456`
  - `document_revision_version_id`: string - Unique identifier of the specific document revision version for this snapshot e.g. `version-789`
  - `created_at`: string(date-time) - Timestamp when the snapshot was created e.g. `2018-04-19T09:36:42Z`
  - `prostore_file`: object
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
    - `viewable`: boolean - Boolean value indicating whether or not a viewable document has been created for the file.
- `drawing_markup_preview_images`: array of object - Preview images generated by drawings with Coordination Issue Pin
  - `id`: integer
  - `drawing_revision_id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
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

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/coordination_issues

**Create Coordination Issue**
Create a Coordination Issue in a Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `12345`
- `coordination_issue`: object (required) - Coordination Issue
  - `uuid`: string - Coordination Issue UUID. This is an optional parameter, and is set automatically on server if not present in the payload e.g. `0b1a32a7-9cf4-4e53-bef4-3d70201b709a`
  - `title`: string (required) - Coordination Issue title. The title can have a maximum of 80 characters e.g. `Plumbing Issue on second floor`
  - `description`: string - Coordination Issue description. e.g. `Plumbing conflicts with light fixtures`
  - `status`: string enum[open, in_progress, blocked, unblocked, ready_for_review, moved_to_observation, closed] - Status of the issue e.g. `open`
  - `creation_source`: string - Source of issue creation. This attribute is ignored when issue is create by third party developers. e.g. `navisworks`
  - `location_id`: integer - Location where the issue is present. The location must be in the same project as the project_id e.g. `5`
  - `assignee_id`: integer - ID of Procore user that should be assigned the issue e.g. `624`
  - `coordination_issue_file_id`: integer - ID of the BIM File to be set as origin source (required if viewpoints is included in payload) e.g. `8`
  - `drawing_revision_id`: integer - ID of the drawing revision to be set as origin source. Only one of drawing_revision_id or coordination_issue_file_id can be present e.g. `9`
  - `bim_model_id`: integer - ID of the model to be associated e.g. `19`
  - `due_date`: string - Due date of the Coordination Issue e.g. `2018-08-16`
  - `issue_type`: string enum[building_code, clash, client_feedback, constructability, coordination, design_review, existing_condition, requirement_change, other] - Issue Type of the Coordination Issue e.g. `building_code`
  - `priority`: string enum[low, medium, high, critical] - Priority of the Coordination Issue e.g. `high`
  - `trade_id`: integer - Trade associated with the Coordination Issue e.g. `999`
  - `is_private`: boolean - Whether the Coordination Issue is private. e.g. `false`
  - `coordination_issue_type_id`: integer - ID of the configurable issue type to associate with the issue. e.g. `45`
  - `coordination_issue_priority_id`: integer - ID of the configurable priority to associate with the issue. e.g. `12`
  - `watcher_ids`: array of integer - IDs of users to set as watchers of the issue. e.g. `[624, 625]`
  - `origin`: object - Origin source for a Coordination Issue
    - `title`: string (required) - Title of the origin item e.g. `My BcfTopic`
    - `origin_id`: string (required) - Id of the origin item e.g. `7b3c8752-e03e-417f-bb57-46bb5aca1139`
    - `origin_type`: string (required) - Type of origin item e.g. `BcfTopic`
    - `deep_link_url`: string (required) - Deep link URL to the origin item e.g. `https://some-company.com/bcf-topics/156`
  - `attachment_upload_uuids`: array of string
  - `attachments`: array of string
  - `viewpoints`: array of object - An array of issue viewpoints. Only one viewpoint is allowed at this time. If specified, must also include coordination_issue_file_id.
    - `name`: string - Viewpoint name e.g. `Ceiling view`
    - `view_folder_id`: integer - ID of the BIM View Folder the viewpoint belongs to
    - `snapshot_upload_uuid`: string (required) - UUID of uploaded snapshot e.g. `1ZE146W9K804SAJJZX19JVAD0R`
    - `camera_data`: string (required) - JSON string representation of camera position e.g. `{"perspective_camera":{"camera_direction":{"x":-0.24,"y":-0.14,"z":-0.99},"ca...`
    - `redlines_data`: string - JSON string representation of markup e.g. `{"lines":[{"color":{"a":1.0,"b":0,"g":0,"r":1},"end_point":{"x":-0.29,"y":-0....`
    - `sections_data`: string - JSON string representation of sections applied to a 3d model as a bounding box e.g. `{"min_boundary":{"x":6.24,"y":12.48,"z":24.96},"max_boundary":{"x":12.48,"y":...`
    - `render_mode`: string enum[shaded, xray] - Viewer render mode when viewpoint is applied
    - `visibility`: object - Object visibility settings
      - `default_visibility`: boolean
      - `exceptions`: object - Group of model objects represented as an array of object ids, or object ranges
        - `object_ids`: array of integer - Array of object ids e.g. `[24861, 46732]`
        - `object_ranges`: array of array of integer - Array of object ranges. A range is an array containing two numbers, the first represents object id, the second represents the number of objects in the range. e.g. `[[24862, 24]]`
  - `document_container_metadata`: object - Document container metadata associated with the Coordination Issue
    - `document_container_id`: string - Unique identifier of the document container e.g. `container-123`
    - `document_revision_id`: string - Unique identifier of the document revision e.g. `revision-456`
    - `workflows_instance_id`: integer - ID of the associated workflow instance e.g. `789`
    - `pin_id`: string - Unique identifier of the pin e.g. `pin-abc-123`

Response 201 (application/json): object

- `id`: integer - ID e.g. `426`
- `uuid`: string - Unique identifier for the issue. This is auto-generated attribute if not provided during issue creation. e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
- `title`: string - Coordination Issue title. The title can have a maximum of 80 characters. e.g. `Plumbing Issue on second floor`
- `description`: string - Coordination Issue description. e.g. `Elaborate details on the plumbing issue`
- `status`: string enum[open, in_progress, blocked, unblocked, ready_for_review, moved_to_observation, closed] - Status of the issue. e.g. `open`
- `issue_number`: integer - Issue Number. A number that can be referred by users to easily identify an issue. Issue number starts from 1 for each project, and is unique per project e.g. `2`
- `creation_source`: string - Coordination Issue can be created from Procore app or a plugin i.e. a source e.g. `navisworks`
- `due_date`: string - Due date of the Coordination Issue. Accepted date formats are "yyyy-mm-dd" and "yyyymmdd" e.g. `2018-08-16`
- `coordination_issue_file`: object - BIM File
  - `id`: integer - ID e.g. `101`
  - `name`: string - Name of the file to be associated to a project e.g. `101_BLDG_FLR_2.NWF`
  - `uuid`: string - Unique UUID associated with the file e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
- `project_id`: number(integer) - Unique identifier for the project. e.g. `29`
- `bim_model_id`: number(integer) - Model ID e.g. `86`
- `comments_count`: number(integer) - Count of comments e.g. `15`
- `issue_type`: string - Issue type of the Coordination Issue e.g. `building_code`
- `priority`: string - Priority of the Coordination Issue e.g. `high`
- `drawing_revision`: object
  - `id`: integer - ID e.g. `662`
  - `title`: string - Formatted title of the drawing revision e.g. `A001: COVER SHEET Rev.0`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `origin`: object - Origin source for a Coordination Issue
  - `title`: string - Title of the origin item e.g. `My BcfTopic`
  - `origin_id`: string - Id of the origin item e.g. `7b3c8752-e03e-417f-bb57-46bb5aca1139`
  - `origin_type`: string - Type of origin item e.g. `BcfTopic`
  - `deep_link_url`: string - Deep link URL to the origin item e.g. `https://some-company.com/bcf-topics/156`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `assignee`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `updated_by`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
- `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
- `viewpoints`: array of object - An array of viewpoints
  - `id`: integer - ID e.g. `206`
  - `bim_file_id`: integer - ID of associated BIM File e.g. `809`
  - `view_folder_id`: integer - ID of associated BIM View Folder e.g. `316`
  - `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
  - `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
  - `snapshot`: object
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `content_type`: string - A mime type or a file extension e.g. `image/png`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `name`: string - Viewpoint name e.g. `Mechanical Conflict View`
  - `render_mode`: string enum[shaded, xray] - Viewer render mode when viewpoint is applied
  - `uuid`: string - Unique identifier for the Extraction viewpoint e.g. `123e4567-e89b-12d3-a456-426614174000`
  - `visibility`: object - Object Visibility settings
    - `default_visibility`: boolean
    - `exceptions`: object - Group of model objects represented as an array of object ids, or object ranges
  - `camera_data`: string - JSON string representation of camera position e.g. `{"perspective_camera":{"camera_direction":{"x":-0.24,"y":-0.14,"z":-0.99},"ca...`
  - `redlines_data`: string - JSON string representation of markup e.g. `{"lines":[{"color":{"a":1.0,"b":0,"g":0,"r":1},"end_point":{"x":-0.29,"y":-0....`
  - `sections_data`: string - JSON string representation of sections applied to a 3d model as a set of clipping planes e.g. `[{"location":{"x":0.0,"y":0.0,"z":28.82},"direction":{"x":0,"y":0,"z":-1},"un...`
- `attachments`: array of object - An array of attachments
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `viewable`: boolean - Boolean value indicating whether or not a viewable document has been created for the file.
- `linked_procore_items`: array of object - Procore items linked to Coordination Issue
  - `id`: integer - ID e.g. `101`
  - `coordination_issue_id`: integer - Id of the associated Coordination Issue e.g. `426`
  - `item_id`: integer - Id of the associated Procore item e.g. `1287`
  - `item_type`: string - Type of the associated Procore item e.g. `rfi`
  - `item_url`: string - Deep-link URL to the associated Procore item e.g. `http://app.procore.com/3664/project/rfi/show/16768`
  - `item_data`: object - This field shows data specific to the associated item. If item type is RFI, it will contain attribute subject, number, and has_official_response
    - `has_official_response`: boolean e.g. `true`
    - `subject`: string e.g. `Construction RFI`
    - `number`: string e.g. `84`
- `linked_drawings`: array of object - Details of drawings linked to Coordination Issue
  - `id`: integer - Drawing ID e.g. `667`
  - `title`: string - Formatted title of the drawing e.g. `A201: Floor II Plan`
  - `url`: string - Procore Web App URL of the drawing e.g. `http://app.procore.com/drawings/1`
- `linked_observation_items`: array of object - Observation Items linked to Coordination Issue
  - `id`: integer - ID e.g. `93`
  - `number`: string - Observation Item number e.g. `113`
  - `personal`: boolean - Observation Item privacy status e.g. `true`
  - `title`: string - Formatted Observation Item title e.g. `#113 - Duct and Structural Conflict`
  - `url`: string - Deep-link URL to Observation Item e.g. `http://app.procore.com/3664/project/observations/items/7142`
  - `created_by_id`: integer - ID of user that created the Observation Item e.g. `47531`
- `document_container_metadata`: object - Document container metadata associated with the Coordination Issue
  - `id`: integer - ID of the document container metadata e.g. `1`
  - `document_container_id`: string - Unique identifier of the document container e.g. `container-123`
  - `document_revision_id`: string - Unique identifier of the document revision e.g. `revision-456`
  - `workflows_instance_id`: integer - ID of the associated workflow instance e.g. `789`
  - `pin_id`: string - Unique identifier of the pin e.g. `pin-abc-123`
- `document_snapshots`: array of object - Point-in-time snapshot images of document revisions linked to the Coordination Issue.
  - `id`: integer - ID of the document snapshot e.g. `42`
  - `document_container_id`: string - Unique identifier of the document container the source document belongs to e.g. `container-123`
  - `document_name`: string - Human-readable name of the source document. Surfaced as the Coordination Issue's source file for outside-workflow (document snapshot) issues. May be null for snapshots created before this field existed. e.g. `Floor Plan.pdf`
  - `document_revision_id`: string - Unique identifier of the document revision the snapshot was taken from e.g. `revision-456`
  - `document_revision_version_id`: string - Unique identifier of the specific document revision version for this snapshot e.g. `version-789`
  - `created_at`: string(date-time) - Timestamp when the snapshot was created e.g. `2018-04-19T09:36:42Z`
  - `prostore_file`: object
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
    - `viewable`: boolean - Boolean value indicating whether or not a viewable document has been created for the file.
- `drawing_markup_preview_images`: array of object - Preview images generated by drawings with Coordination Issue Pin
  - `id`: integer
  - `drawing_revision_id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
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

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/coordination_issues/list

**List Coordination Issues (POST)**
Lists Coordination Issues via POST. Use when query parameters would exceed URL length limits (e.g. large filter sets).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json):

- object

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `426`
- `uuid`: string - Unique identifier for the issue. This is auto-generated attribute if not provided during issue creation. e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
- `title`: string - Coordination Issue title. The title can have a maximum of 80 characters. e.g. `Plumbing Issue on second floor`
- `description`: string - Coordination Issue description. e.g. `Elaborate details on the plumbing issue`
- `status`: string enum[open, in_progress, blocked, unblocked, ready_for_review, moved_to_observation, closed] - Status of the issue. e.g. `open`
- `issue_number`: integer - Issue Number. A number that can be referred by users to easily identify an issue. Issue number starts from 1 for each project, and is unique per project e.g. `2`
- `creation_source`: string - Coordination Issue can be created from Procore app or a plugin i.e. a source e.g. `navisworks`
- `due_date`: string - Due date of the Coordination Issue. Accepted date formats are "yyyy-mm-dd" and "yyyymmdd" e.g. `2018-08-16`
- `coordination_issue_file`: object - BIM File
  - `id`: integer - ID e.g. `101`
  - `name`: string - Name of the file to be associated to a project e.g. `101_BLDG_FLR_2.NWF`
  - `uuid`: string - Unique UUID associated with the file e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
- `project_id`: number(integer) - Unique identifier for the project. e.g. `29`
- `bim_model_id`: number(integer) - Model ID e.g. `86`
- `comments_count`: number(integer) - Count of comments e.g. `15`
- `issue_type`: string - Issue type of the Coordination Issue e.g. `building_code`
- `priority`: string - Priority of the Coordination Issue e.g. `high`
- `drawing_revision`: object
  - `id`: integer - ID e.g. `662`
  - `title`: string - Formatted title of the drawing revision e.g. `A001: COVER SHEET Rev.0`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `origin`: object - Origin source for a Coordination Issue
  - `title`: string - Title of the origin item e.g. `My BcfTopic`
  - `origin_id`: string - Id of the origin item e.g. `7b3c8752-e03e-417f-bb57-46bb5aca1139`
  - `origin_type`: string - Type of origin item e.g. `BcfTopic`
  - `deep_link_url`: string - Deep link URL to the origin item e.g. `https://some-company.com/bcf-topics/156`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `assignee`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `updated_by`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
- `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
- `viewpoints`: array of object - An array of viewpoints
  - `id`: integer - ID e.g. `206`
  - `bim_file_id`: integer - ID of associated BIM File e.g. `809`
  - `view_folder_id`: integer - ID of associated BIM View Folder e.g. `316`
  - `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
  - `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
  - `snapshot`: object
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `content_type`: string - A mime type or a file extension e.g. `image/png`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `name`: string - Viewpoint name e.g. `Mechanical Conflict View`
  - `render_mode`: string enum[shaded, xray] - Viewer render mode when viewpoint is applied
  - `uuid`: string - Unique identifier for the Extraction viewpoint e.g. `123e4567-e89b-12d3-a456-426614174000`
  - `visibility`: object - Object Visibility settings
    - `default_visibility`: boolean
    - `exceptions`: object - Group of model objects represented as an array of object ids, or object ranges
  - `camera_data`: string - JSON string representation of camera position e.g. `{"perspective_camera":{"camera_direction":{"x":-0.24,"y":-0.14,"z":-0.99},"ca...`
  - `redlines_data`: string - JSON string representation of markup e.g. `{"lines":[{"color":{"a":1.0,"b":0,"g":0,"r":1},"end_point":{"x":-0.29,"y":-0....`
  - `sections_data`: string - JSON string representation of sections applied to a 3d model as a set of clipping planes e.g. `[{"location":{"x":0.0,"y":0.0,"z":28.82},"direction":{"x":0,"y":0,"z":-1},"un...`
- `attachments`: array of object - An array of attachments
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `viewable`: boolean - Boolean value indicating whether or not a viewable document has been created for the file.
- `linked_procore_items`: array of object - Procore items linked to Coordination Issue
  - `id`: integer - ID e.g. `101`
  - `coordination_issue_id`: integer - Id of the associated Coordination Issue e.g. `426`
  - `item_id`: integer - Id of the associated Procore item e.g. `1287`
  - `item_type`: string - Type of the associated Procore item e.g. `rfi`
  - `item_url`: string - Deep-link URL to the associated Procore item e.g. `http://app.procore.com/3664/project/rfi/show/16768`
  - `item_data`: object - This field shows data specific to the associated item. If item type is RFI, it will contain attribute subject, number, and has_official_response
    - `has_official_response`: boolean e.g. `true`
    - `subject`: string e.g. `Construction RFI`
    - `number`: string e.g. `84`
- `linked_drawings`: array of object - Details of drawings linked to Coordination Issue
  - `id`: integer - Drawing ID e.g. `667`
  - `title`: string - Formatted title of the drawing e.g. `A201: Floor II Plan`
  - `url`: string - Procore Web App URL of the drawing e.g. `http://app.procore.com/drawings/1`
- `linked_observation_items`: array of object - Observation Items linked to Coordination Issue
  - `id`: integer - ID e.g. `93`
  - `number`: string - Observation Item number e.g. `113`
  - `personal`: boolean - Observation Item privacy status e.g. `true`
  - `title`: string - Formatted Observation Item title e.g. `#113 - Duct and Structural Conflict`
  - `url`: string - Deep-link URL to Observation Item e.g. `http://app.procore.com/3664/project/observations/items/7142`
  - `created_by_id`: integer - ID of user that created the Observation Item e.g. `47531`
- `document_container_metadata`: object - Document container metadata associated with the Coordination Issue
  - `id`: integer - ID of the document container metadata e.g. `1`
  - `document_container_id`: string - Unique identifier of the document container e.g. `container-123`
  - `document_revision_id`: string - Unique identifier of the document revision e.g. `revision-456`
  - `workflows_instance_id`: integer - ID of the associated workflow instance e.g. `789`
  - `pin_id`: string - Unique identifier of the pin e.g. `pin-abc-123`
- `document_snapshots`: array of object - Point-in-time snapshot images of document revisions linked to the Coordination Issue.
  - `id`: integer - ID of the document snapshot e.g. `42`
  - `document_container_id`: string - Unique identifier of the document container the source document belongs to e.g. `container-123`
  - `document_name`: string - Human-readable name of the source document. Surfaced as the Coordination Issue's source file for outside-workflow (document snapshot) issues. May be null for snapshots created before this field existed. e.g. `Floor Plan.pdf`
  - `document_revision_id`: string - Unique identifier of the document revision the snapshot was taken from e.g. `revision-456`
  - `document_revision_version_id`: string - Unique identifier of the specific document revision version for this snapshot e.g. `version-789`
  - `created_at`: string(date-time) - Timestamp when the snapshot was created e.g. `2018-04-19T09:36:42Z`
  - `prostore_file`: object
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
    - `viewable`: boolean - Boolean value indicating whether or not a viewable document has been created for the file.
- `drawing_markup_preview_images`: array of object - Preview images generated by drawings with Coordination Issue Pin
  - `id`: integer
  - `drawing_revision_id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
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

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/coordination_issues/{id}

**Show Coordination Issue**
Return a single Coordination Issue item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Coordination Issue ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `view` [query] string enum[compact, normal, extended] - The compact view contains only ids. The normal view is a subset of the response shown below, and does not include attachments, viewpoints, linked items and updated_by The extended view contains the response shown belo...
- `viewpoint_format` [query] string enum[default, procore] - Specify viewpoint data format. This parameter functions only when the query parameter view is 'extended' The default format returns the viewpoint content as saved. The procore format returns the viewpoint content conv...

Response 200 (application/json): object

- `id`: integer - ID e.g. `426`
- `uuid`: string - Unique identifier for the issue. This is auto-generated attribute if not provided during issue creation. e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
- `title`: string - Coordination Issue title. The title can have a maximum of 80 characters. e.g. `Plumbing Issue on second floor`
- `description`: string - Coordination Issue description. e.g. `Elaborate details on the plumbing issue`
- `status`: string enum[open, in_progress, blocked, unblocked, ready_for_review, moved_to_observation, closed] - Status of the issue. e.g. `open`
- `issue_number`: integer - Issue Number. A number that can be referred by users to easily identify an issue. Issue number starts from 1 for each project, and is unique per project e.g. `2`
- `creation_source`: string - Coordination Issue can be created from Procore app or a plugin i.e. a source e.g. `navisworks`
- `due_date`: string - Due date of the Coordination Issue. Accepted date formats are "yyyy-mm-dd" and "yyyymmdd" e.g. `2018-08-16`
- `coordination_issue_file`: object - BIM File
  - `id`: integer - ID e.g. `101`
  - `name`: string - Name of the file to be associated to a project e.g. `101_BLDG_FLR_2.NWF`
  - `uuid`: string - Unique UUID associated with the file e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
- `project_id`: number(integer) - Unique identifier for the project. e.g. `29`
- `bim_model_id`: number(integer) - Model ID e.g. `86`
- `comments_count`: number(integer) - Count of comments e.g. `15`
- `issue_type`: string - Issue type of the Coordination Issue e.g. `building_code`
- `priority`: string - Priority of the Coordination Issue e.g. `high`
- `drawing_revision`: object
  - `id`: integer - ID e.g. `662`
  - `title`: string - Formatted title of the drawing revision e.g. `A001: COVER SHEET Rev.0`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `origin`: object - Origin source for a Coordination Issue
  - `title`: string - Title of the origin item e.g. `My BcfTopic`
  - `origin_id`: string - Id of the origin item e.g. `7b3c8752-e03e-417f-bb57-46bb5aca1139`
  - `origin_type`: string - Type of origin item e.g. `BcfTopic`
  - `deep_link_url`: string - Deep link URL to the origin item e.g. `https://some-company.com/bcf-topics/156`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `assignee`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `updated_by`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
- `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
- `viewpoints`: array of object - An array of viewpoints
  - `id`: integer - ID e.g. `206`
  - `bim_file_id`: integer - ID of associated BIM File e.g. `809`
  - `view_folder_id`: integer - ID of associated BIM View Folder e.g. `316`
  - `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
  - `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
  - `snapshot`: object
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `content_type`: string - A mime type or a file extension e.g. `image/png`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `name`: string - Viewpoint name e.g. `Mechanical Conflict View`
  - `render_mode`: string enum[shaded, xray] - Viewer render mode when viewpoint is applied
  - `uuid`: string - Unique identifier for the Extraction viewpoint e.g. `123e4567-e89b-12d3-a456-426614174000`
  - `visibility`: object - Object Visibility settings
    - `default_visibility`: boolean
    - `exceptions`: object - Group of model objects represented as an array of object ids, or object ranges
  - `camera_data`: string - JSON string representation of camera position e.g. `{"perspective_camera":{"camera_direction":{"x":-0.24,"y":-0.14,"z":-0.99},"ca...`
  - `redlines_data`: string - JSON string representation of markup e.g. `{"lines":[{"color":{"a":1.0,"b":0,"g":0,"r":1},"end_point":{"x":-0.29,"y":-0....`
  - `sections_data`: string - JSON string representation of sections applied to a 3d model as a set of clipping planes e.g. `[{"location":{"x":0.0,"y":0.0,"z":28.82},"direction":{"x":0,"y":0,"z":-1},"un...`
- `attachments`: array of object - An array of attachments
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `viewable`: boolean - Boolean value indicating whether or not a viewable document has been created for the file.
- `linked_procore_items`: array of object - Procore items linked to Coordination Issue
  - `id`: integer - ID e.g. `101`
  - `coordination_issue_id`: integer - Id of the associated Coordination Issue e.g. `426`
  - `item_id`: integer - Id of the associated Procore item e.g. `1287`
  - `item_type`: string - Type of the associated Procore item e.g. `rfi`
  - `item_url`: string - Deep-link URL to the associated Procore item e.g. `http://app.procore.com/3664/project/rfi/show/16768`
  - `item_data`: object - This field shows data specific to the associated item. If item type is RFI, it will contain attribute subject, number, and has_official_response
    - `has_official_response`: boolean e.g. `true`
    - `subject`: string e.g. `Construction RFI`
    - `number`: string e.g. `84`
- `linked_drawings`: array of object - Details of drawings linked to Coordination Issue
  - `id`: integer - Drawing ID e.g. `667`
  - `title`: string - Formatted title of the drawing e.g. `A201: Floor II Plan`
  - `url`: string - Procore Web App URL of the drawing e.g. `http://app.procore.com/drawings/1`
- `linked_observation_items`: array of object - Observation Items linked to Coordination Issue
  - `id`: integer - ID e.g. `93`
  - `number`: string - Observation Item number e.g. `113`
  - `personal`: boolean - Observation Item privacy status e.g. `true`
  - `title`: string - Formatted Observation Item title e.g. `#113 - Duct and Structural Conflict`
  - `url`: string - Deep-link URL to Observation Item e.g. `http://app.procore.com/3664/project/observations/items/7142`
  - `created_by_id`: integer - ID of user that created the Observation Item e.g. `47531`
- `document_container_metadata`: object - Document container metadata associated with the Coordination Issue
  - `id`: integer - ID of the document container metadata e.g. `1`
  - `document_container_id`: string - Unique identifier of the document container e.g. `container-123`
  - `document_revision_id`: string - Unique identifier of the document revision e.g. `revision-456`
  - `workflows_instance_id`: integer - ID of the associated workflow instance e.g. `789`
  - `pin_id`: string - Unique identifier of the pin e.g. `pin-abc-123`
- `document_snapshots`: array of object - Point-in-time snapshot images of document revisions linked to the Coordination Issue.
  - `id`: integer - ID of the document snapshot e.g. `42`
  - `document_container_id`: string - Unique identifier of the document container the source document belongs to e.g. `container-123`
  - `document_name`: string - Human-readable name of the source document. Surfaced as the Coordination Issue's source file for outside-workflow (document snapshot) issues. May be null for snapshots created before this field existed. e.g. `Floor Plan.pdf`
  - `document_revision_id`: string - Unique identifier of the document revision the snapshot was taken from e.g. `revision-456`
  - `document_revision_version_id`: string - Unique identifier of the specific document revision version for this snapshot e.g. `version-789`
  - `created_at`: string(date-time) - Timestamp when the snapshot was created e.g. `2018-04-19T09:36:42Z`
  - `prostore_file`: object
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
    - `viewable`: boolean - Boolean value indicating whether or not a viewable document has been created for the file.
- `drawing_markup_preview_images`: array of object - Preview images generated by drawings with Coordination Issue Pin
  - `id`: integer
  - `drawing_revision_id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
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

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/coordination_issues/{id}

**Update Coordination Issue**
Update a Coordination Issue item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Coordination Issue ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `12345`
- `coordination_issue`: object (required) - Coordination Issue Item object
  - `title`: string - Coordination Issue title. The title can have a maximum of 80 characters. e.g. `Plumbing Issue on second floor`
  - `description`: string - Coordination Issue description. e.g. `Plumbing conflicts with light fixtures`
  - `status`: string - Coordination Issue status. e.g. `closed`
  - `location_id`: integer - Location where the issue is present. The location must be in the same project as the project_id e.g. `5`
  - `assignee_id`: integer - ID of Procore user that should be assigned the issue e.g. `624`
  - `due_date`: string - Due date of the Coordination Issue e.g. `2018-08-16`
  - `issue_type`: string - Issue Type of the Coordination Issue e.g. `building_code`
  - `priority`: string - Priority of the Coordination Issue e.g. `high`
  - `trade_id`: integer - Trade associated with the Coordination Issue e.g. `999`
  - `origin`: string - Delete origin association. Only 'null' value accepted
  - `is_private`: boolean - Whether the Coordination Issue is private. e.g. `false`
  - `coordination_issue_file_id`: integer - ID of the BIM File to set as the issue's source. e.g. `8`
  - `bim_model_id`: integer - ID of the model to associate with the issue. e.g. `19`
  - `coordination_issue_type_id`: integer - ID of the configurable issue type to associate with the issue. e.g. `45`
  - `coordination_issue_priority_id`: integer - ID of the configurable priority to associate with the issue. e.g. `12`
  - `watcher_ids`: array of integer - IDs of users to set as watchers of the issue. e.g. `[624, 625]`

Response 200 (application/json): object

- `id`: integer - ID e.g. `426`
- `uuid`: string - Unique identifier for the issue. This is auto-generated attribute if not provided during issue creation. e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
- `title`: string - Coordination Issue title. The title can have a maximum of 80 characters. e.g. `Plumbing Issue on second floor`
- `description`: string - Coordination Issue description. e.g. `Elaborate details on the plumbing issue`
- `status`: string enum[open, in_progress, blocked, unblocked, ready_for_review, moved_to_observation, closed] - Status of the issue. e.g. `open`
- `issue_number`: integer - Issue Number. A number that can be referred by users to easily identify an issue. Issue number starts from 1 for each project, and is unique per project e.g. `2`
- `creation_source`: string - Coordination Issue can be created from Procore app or a plugin i.e. a source e.g. `navisworks`
- `due_date`: string - Due date of the Coordination Issue. Accepted date formats are "yyyy-mm-dd" and "yyyymmdd" e.g. `2018-08-16`
- `coordination_issue_file`: object - BIM File
  - `id`: integer - ID e.g. `101`
  - `name`: string - Name of the file to be associated to a project e.g. `101_BLDG_FLR_2.NWF`
  - `uuid`: string - Unique UUID associated with the file e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
- `project_id`: number(integer) - Unique identifier for the project. e.g. `29`
- `bim_model_id`: number(integer) - Model ID e.g. `86`
- `comments_count`: number(integer) - Count of comments e.g. `15`
- `issue_type`: string - Issue type of the Coordination Issue e.g. `building_code`
- `priority`: string - Priority of the Coordination Issue e.g. `high`
- `drawing_revision`: object
  - `id`: integer - ID e.g. `662`
  - `title`: string - Formatted title of the drawing revision e.g. `A001: COVER SHEET Rev.0`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `origin`: object - Origin source for a Coordination Issue
  - `title`: string - Title of the origin item e.g. `My BcfTopic`
  - `origin_id`: string - Id of the origin item e.g. `7b3c8752-e03e-417f-bb57-46bb5aca1139`
  - `origin_type`: string - Type of origin item e.g. `BcfTopic`
  - `deep_link_url`: string - Deep link URL to the origin item e.g. `https://some-company.com/bcf-topics/156`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `assignee`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `updated_by`: object - Login Information
  - `id`: integer - Login Information ID uniquely identifying this user. e.g. `1738090`
  - `name`: string - User's display name, formatted first name then last name. e.g. `John Doe`
  - `login`: string - User's login email address. e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
  - `locale`: string - IETF locale code for the user's language preference (e.g., 'en', 'ko'). Null when the user has not set a locale. e.g. `ko`
- `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
- `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
- `viewpoints`: array of object - An array of viewpoints
  - `id`: integer - ID e.g. `206`
  - `bim_file_id`: integer - ID of associated BIM File e.g. `809`
  - `view_folder_id`: integer - ID of associated BIM View Folder e.g. `316`
  - `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
  - `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
  - `snapshot`: object
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `content_type`: string - A mime type or a file extension e.g. `image/png`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `name`: string - Viewpoint name e.g. `Mechanical Conflict View`
  - `render_mode`: string enum[shaded, xray] - Viewer render mode when viewpoint is applied
  - `uuid`: string - Unique identifier for the Extraction viewpoint e.g. `123e4567-e89b-12d3-a456-426614174000`
  - `visibility`: object - Object Visibility settings
    - `default_visibility`: boolean
    - `exceptions`: object - Group of model objects represented as an array of object ids, or object ranges
  - `camera_data`: string - JSON string representation of camera position e.g. `{"perspective_camera":{"camera_direction":{"x":-0.24,"y":-0.14,"z":-0.99},"ca...`
  - `redlines_data`: string - JSON string representation of markup e.g. `{"lines":[{"color":{"a":1.0,"b":0,"g":0,"r":1},"end_point":{"x":-0.29,"y":-0....`
  - `sections_data`: string - JSON string representation of sections applied to a 3d model as a set of clipping planes e.g. `[{"location":{"x":0.0,"y":0.0,"z":28.82},"direction":{"x":0,"y":0,"z":-1},"un...`
- `attachments`: array of object - An array of attachments
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `viewable`: boolean - Boolean value indicating whether or not a viewable document has been created for the file.
- `linked_procore_items`: array of object - Procore items linked to Coordination Issue
  - `id`: integer - ID e.g. `101`
  - `coordination_issue_id`: integer - Id of the associated Coordination Issue e.g. `426`
  - `item_id`: integer - Id of the associated Procore item e.g. `1287`
  - `item_type`: string - Type of the associated Procore item e.g. `rfi`
  - `item_url`: string - Deep-link URL to the associated Procore item e.g. `http://app.procore.com/3664/project/rfi/show/16768`
  - `item_data`: object - This field shows data specific to the associated item. If item type is RFI, it will contain attribute subject, number, and has_official_response
    - `has_official_response`: boolean e.g. `true`
    - `subject`: string e.g. `Construction RFI`
    - `number`: string e.g. `84`
- `linked_drawings`: array of object - Details of drawings linked to Coordination Issue
  - `id`: integer - Drawing ID e.g. `667`
  - `title`: string - Formatted title of the drawing e.g. `A201: Floor II Plan`
  - `url`: string - Procore Web App URL of the drawing e.g. `http://app.procore.com/drawings/1`
- `linked_observation_items`: array of object - Observation Items linked to Coordination Issue
  - `id`: integer - ID e.g. `93`
  - `number`: string - Observation Item number e.g. `113`
  - `personal`: boolean - Observation Item privacy status e.g. `true`
  - `title`: string - Formatted Observation Item title e.g. `#113 - Duct and Structural Conflict`
  - `url`: string - Deep-link URL to Observation Item e.g. `http://app.procore.com/3664/project/observations/items/7142`
  - `created_by_id`: integer - ID of user that created the Observation Item e.g. `47531`
- `document_container_metadata`: object - Document container metadata associated with the Coordination Issue
  - `id`: integer - ID of the document container metadata e.g. `1`
  - `document_container_id`: string - Unique identifier of the document container e.g. `container-123`
  - `document_revision_id`: string - Unique identifier of the document revision e.g. `revision-456`
  - `workflows_instance_id`: integer - ID of the associated workflow instance e.g. `789`
  - `pin_id`: string - Unique identifier of the pin e.g. `pin-abc-123`
- `document_snapshots`: array of object - Point-in-time snapshot images of document revisions linked to the Coordination Issue.
  - `id`: integer - ID of the document snapshot e.g. `42`
  - `document_container_id`: string - Unique identifier of the document container the source document belongs to e.g. `container-123`
  - `document_name`: string - Human-readable name of the source document. Surfaced as the Coordination Issue's source file for outside-workflow (document snapshot) issues. May be null for snapshots created before this field existed. e.g. `Floor Plan.pdf`
  - `document_revision_id`: string - Unique identifier of the document revision the snapshot was taken from e.g. `revision-456`
  - `document_revision_version_id`: string - Unique identifier of the specific document revision version for this snapshot e.g. `version-789`
  - `created_at`: string(date-time) - Timestamp when the snapshot was created e.g. `2018-04-19T09:36:42Z`
  - `prostore_file`: object
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
    - `viewable`: boolean - Boolean value indicating whether or not a viewable document has been created for the file.
- `drawing_markup_preview_images`: array of object - Preview images generated by drawings with Coordination Issue Pin
  - `id`: integer
  - `drawing_revision_id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
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

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/coordination_issues/{id}

**Delete Coordination Issue**
Delete a Coordination Issue from the system

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Coordination Issue ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 204: No Content (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Coordination Issues Workflow Issues

Resource id: `coordination-issues-workflow-issues`. Raw spec: `../openapi-raw/coordination-issues-workflow-issues.json`. Web: https://developers.procore.com/reference/rest/coordination-issues-workflow-issues?version=latest
Product lines: Design Coordination

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues/workflow_issues

**List Coordination Issues Workflow Issues**
Returns a list of Coordination Issues that have associated workflow metadata.
Issues are filtered based on user visibility rules:
- Project Admins can see all workflow issues
- Issue creators can see issues they created
- Issue assignees can see issues assigned to them
- Workflow members can see issues for workflows they are part of
Include `permissions` in the query to get `can_edit` field for each issue.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[assignee_company_id]` [query] array of string - Filter item(s) with matching assignee vendor companies.
- `filters[assignee_id]` [query] array of string - Filter item(s) with matching assignee user IDs.
- `filters[created_by_id]` [query] array of string - Return item(s) created by the specified User IDs
- `filters[created_by_company_id]` [query] array of string - Filter item(s) with matching created by vendor companies.
- `filters[created_from]` [query] array of string - Filter item(s) by creation source.
- `filters[id]` [query] array of string - Filter by specific Coordination Issue IDs.
- `filters[location_id]` [query] string - Filters by specific location (Note: Use *either* this or location_id_with_sublocations, but not both)
- `filters[include_sublocations]` [query] boolean - Use together with `filters[location_id]`
- `filters[search]` [query] string - Returns item(s) matching the specified search query string.
- `filters[status]` [query] string - Return item(s) with the specified statuses
- `filters[issue_type]` [query] array of string - Filter item(s) by issue type.
- `filters[priority]` [query] array of string - Filter item(s) by priority level.
- `filters[trade_id]` [query] string - Trade ID
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[due_date]` [query] string(date) - Filter Coordination Issues by due date.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `sort` [query] string enum[created_at, -created_at, updated_at, -updated_at, due_date, -due_date, title, -title, status, -status, assignee, -assignee, ...] - Sort results by field. Direction (asc/desc) controlled by presence or absence of '-' prefix.
- `filters[overdue]` [query] boolean - Filter for overdue Coordination Issues.
- `filters[document_container_id]` [query] array of string - Filter Coordination Issues by document container ID(s).
- `filters[document_revision_id]` [query] array of string - Filter Coordination Issues by document revision ID(s).
- `filters[source_file_id]` [query] array of string - Filter by source BIM file ID
- `view` [query] string enum[normal, extended] - Specifies the view to use for the response. Use 'normal' for basic fields, 'extended' for full details including viewpoints and attachments.
- `viewpoint_format` [query] string enum[procore, bcf] - Specifies the format for viewpoint data. Use 'procore' for Procore format, 'bcf' for BCF format.
- `included` [query] string - Comma-separated list of fields to include in the response.

Response 200 (application/json): object

- `data`: array of object (required) - Array of Coordination Issues with workflow metadata
  - `id`: string - Unique identifier for the Coordination Issue e.g. `426`
  - `uuid`: string - UUID of the Coordination Issue e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
  - `title`: string - Title of the Coordination Issue (max 80 characters) e.g. `Plumbing Issue on second floor`
  - `description`: string - Description of the Coordination Issue e.g. `Elaborate details on the plumbing issue`
  - `status`: string enum[open, in_progress, blocked, unblocked, ready_for_review, moved_to_observation, closed] - Status of the issue e.g. `open`
  - `is_private`: boolean - Whether the Coordination Issue is private. e.g. `false`
  - `issue_number`: integer - Issue number unique per project e.g. `2`
  - `creation_source`: string - Source from which the issue was created e.g. `navisworks`
  - `due_date`: string(date) - Due date of the Coordination Issue e.g. `2018-08-16`
  - `closed_date`: string(date) - Date when the issue was closed
  - `project_id`: string - Unique identifier for the project e.g. `29`
  - `bim_model_id`: string - ID of the BIM model the issue is associated with. e.g. `86`
  - `comments_count`: integer - Count of comments e.g. `15`
  - `viewpoint_count`: integer - Number of BIM viewpoints associated with the issue. e.g. `3`
  - `issue_type`: string - Issue type of the Coordination Issue e.g. `building_code`
  - `priority`: string - Priority of the Coordination Issue e.g. `high`
  - `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
  - `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
  - `bim_file`: object - BIM file associated with the issue
    - `id`: string - BIM file ID e.g. `123`
    - `name`: string - BIM file name
    - `uuid`: string - UUID of the BIM file e.g. `a1b2c3d4-0000-4000-8000-000000000000`
  - `source_file`: object - Source document or model the issue originated from. Empty when no source is resolved.
    - `id`: string - Identifier of the source document, snapshot, or BIM file.
    - `name`: string - Name of the source document or model.
    - `type`: string enum[model_manager, document, bim_file] - Kind of source the issue originated from. e.g. `document`
  - `drawing_revision`: object - Drawing revision linked to the issue
    - `id`: string - Drawing revision ID e.g. `662`
    - `title`: string - Formatted title of the drawing revision e.g. `A001: COVER SHEET Rev.0`
  - `trade`: object - Trade associated with the issue
    - `id`: string - Trade ID e.g. `999`
    - `name`: string - Trade name e.g. `09 - acoustical panels`
    - `active`: boolean - Trade availability e.g. `true`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-08-01T23:33:54Z`
  - `coordination_issue_type`: object - Company-configurable issue type assigned to the Coordination Issue.
    - `id`: string - Issue type ID e.g. `12`
    - `name`: string - Issue type name e.g. `Clash`
    - `active`: boolean - Whether the issue type is active. e.g. `true`
    - `created_at`: string(date-time) - Timestamp when the issue type was created. e.g. `2018-04-19T09:36:42Z`
    - `position`: integer - Ordering position of the issue type. e.g. `1`
    - `updated_at`: string(date-time) - Timestamp when the issue type was last updated. e.g. `2018-04-20T09:36:42Z`
    - `global`: boolean - Whether the issue type is a default provided by Procore. e.g. `false`
    - `deletable`: boolean - Whether the issue type can be deleted. e.g. `true`
  - `coordination_issue_priority`: object - Company-configurable priority assigned to the Coordination Issue.
    - `id`: string - Priority ID e.g. `8`
    - `name`: string - Priority name e.g. `High`
    - `active`: boolean - Whether the priority is active. e.g. `true`
    - `created_at`: string(date-time) - Timestamp when the priority was created. e.g. `2018-04-19T09:36:42Z`
    - `position`: integer - Ordering position of the priority. e.g. `1`
    - `updated_at`: string(date-time) - Timestamp when the priority was last updated. e.g. `2018-04-20T09:36:42Z`
    - `global`: boolean - Whether the priority is a default provided by Procore. e.g. `false`
    - `deletable`: boolean - Whether the priority can be deleted. e.g. `true`
  - `origin`: object - Origin source for the Coordination Issue
    - `title`: string - Title of the origin item e.g. `My BcfTopic`
    - `origin_id`: string - ID of the origin item e.g. `7b3c8752-e03e-417f-bb57-46bb5aca1139`
    - `origin_type`: string - Type of origin item e.g. `BcfTopic`
    - `deep_link_url`: string - Deep link URL to the origin item e.g. `https://some-company.com/bcf-topics/156`
  - `location`: object - Location information
    - `id`: string - Location ID e.g. `5`
    - `name`: string - Location name
  - `assignee`: object - Assignee information
    - `id`: string - User ID e.g. `624`
    - `name`: string - User name
    - `login`: string - User email
    - `locale`: string - User locale
    - `company_name`: string - Company name
  - `created_by`: object - Creator information
    - `id`: string - User ID e.g. `100`
    - `name`: string - User name
    - `login`: string - User email
    - `locale`: string - User locale
    - `company_name`: string - Company name
  - `updated_by`: object - User who last updated the issue
    - `id`: string - User ID e.g. `101`
    - `name`: string - User name
    - `login`: string - User email
    - `locale`: string - User locale
    - `company_name`: string - Company name
  - `watchers`: array of object - Users watching the Coordination Issue.
    - `id`: string - User ID e.g. `624`
    - `name`: string - User name
    - `login`: string - User email
    - `locale`: string - User locale
    - `company_name`: string - Company name
  - `attachments`: array of object - Array of attachments
    - `id`: string - Attachment ID e.g. `456`
    - `name`: string - File name
    - `content_type`: string - MIME type
    - `url`: string - URL to download the attachment
  - `document_snapshots`: array of object - Snapshots of the source documents captured for the issue.
    - `id`: string - Document snapshot ID e.g. `77`
    - `document_container_id`: string - Unique identifier of the document container. e.g. `container-123`
    - `document_name`: string - Name of the document.
    - `document_revision_id`: string - Unique identifier of the document revision. e.g. `revision-456`
    - `document_revision_version_id`: string - Unique identifier of the document revision version. e.g. `version-789`
    - `created_at`: string(date-time) - Timestamp when the snapshot was created. e.g. `2018-04-19T09:36:42Z`
    - `prostore_file`: object - Stored file backing the document snapshot.
  - `linked_procore_items`: array of object - Procore items linked to the Coordination Issue
    - `id`: string - Association ID e.g. `101`
    - `coordination_issue_id`: string - ID of the associated Coordination Issue e.g. `426`
    - `item_id`: string - ID of the associated Procore item e.g. `1287`
    - `item_type`: string - Type of the associated Procore item e.g. `rfi`
    - `item_url`: string - Deep-link URL to the associated Procore item
    - `item_data`: object - Data specific to the associated item
  - `linked_drawings`: array of object - Details of drawings linked to Coordination Issue
    - `id`: string - Drawing ID e.g. `667`
    - `title`: string - Formatted title of the drawing
    - `url`: string - Procore Web App URL of the drawing
  - `linked_observation_items`: array of object - Observation items linked to the Coordination Issue
    - `id`: string - Observation item ID e.g. `789`
    - `name`: string - Observation item name
  - `document_container_metadata`: object - Document container metadata
    - `id`: string - ID of the document container metadata e.g. `1`
    - `document_container_id`: string - Unique identifier of the document container e.g. `container-123`
    - `document_revision_id`: string - Unique identifier of the document revision e.g. `revision-456`
    - `document_name`: string - Name of the document
    - `workflows_instance_id`: string - ID of the associated workflow instance e.g. `789`
    - `workflow_name`: string - Name of the associated workflow
    - `pin_id`: string - Unique identifier of the pin e.g. `pin-abc-123`
  - `drawing_markup_preview_images`: array of object - Preview images generated by drawings with Coordination Issue Pin
    - `id`: string - Preview image ID e.g. `100`
    - `drawing_revision_id`: string - Drawing revision ID e.g. `662`
    - `name`: string - Base name of the file
    - `content_type`: string - MIME type
    - `url`: string - URL to download the file
  - `coordination_issue_bim_viewpoints`: array of object - BIM viewpoints associated with the Coordination Issue.
    - `id`: string - Viewpoint mapping ID e.g. `45`
    - `bim_viewpoint_id`: string - ID of the associated BIM viewpoint. e.g. `981`
    - `is_primary`: boolean - Whether this is the primary viewpoint for the issue. e.g. `true`
  - `custom_fields`: object - Custom fields associated with the Coordination Issue
  - `permissions`: object - Permission flags for the current user on this Coordination Issue.
    - `can_edit`: boolean - Whether the current user can edit this Coordination Issue. Always false when the associated workflow instance is terminated or completed. e.g. `true`
    - `can_update_status`: boolean - Whether the current user can change the status of this Coordination Issue. Present only when a status transition or elevation action is available. e.g. `true`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues/workflow_issues/{id}

**Show Coordination Issue Workflow Issue**
Returns a specific Coordination Issue that has associated workflow metadata.
Access is controlled by the same visibility rules as the index endpoint:
- Project Admins can access all workflow issues
- Issue creators can access issues they created
- Issue assignees can access issues assigned to them
- Workflow members can access issues for workflows they are part of

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Coordination Issue ID
- `view` [query] string enum[normal, extended] - Specifies the view to use for the response. Use 'normal' for basic fields, 'extended' for full details including viewpoints and attachments.
- `viewpoint_format` [query] string enum[procore, bcf] - Specifies the format for viewpoint data. Use 'procore' for Procore format, 'bcf' for BCF format.
- `included` [query] string - Comma-separated list of fields to include in the response.

Response 200 (application/json): object

- `data`: object (required) - Coordination Issue with extended details
  - `id`: string - Unique identifier for the Coordination Issue e.g. `426`
  - `uuid`: string - UUID of the Coordination Issue e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
  - `title`: string - Title of the Coordination Issue (max 80 characters) e.g. `Plumbing Issue on second floor`
  - `description`: string - Description of the Coordination Issue e.g. `Elaborate details on the plumbing issue`
  - `status`: string enum[open, in_progress, blocked, unblocked, ready_for_review, moved_to_observation, closed] - Status of the issue e.g. `open`
  - `is_private`: boolean - Whether the Coordination Issue is private. e.g. `false`
  - `issue_number`: integer - Issue number unique per project e.g. `2`
  - `creation_source`: string - Source from which the issue was created e.g. `navisworks`
  - `due_date`: string(date) - Due date of the Coordination Issue e.g. `2018-08-16`
  - `closed_date`: string(date) - Date when the issue was closed
  - `project_id`: string - Unique identifier for the project e.g. `29`
  - `bim_model_id`: string - ID of the BIM model the issue is associated with. e.g. `86`
  - `comments_count`: integer - Count of comments e.g. `15`
  - `viewpoint_count`: integer - Number of BIM viewpoints associated with the issue. e.g. `3`
  - `issue_type`: string - Issue type of the Coordination Issue e.g. `building_code`
  - `priority`: string - Priority of the Coordination Issue e.g. `high`
  - `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
  - `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
  - `bim_file`: object - BIM file associated with the issue
    - `id`: string - BIM file ID e.g. `123`
    - `name`: string - BIM file name
    - `uuid`: string - UUID of the BIM file e.g. `a1b2c3d4-0000-4000-8000-000000000000`
  - `source_file`: object - Source document or model the issue originated from. Empty when no source is resolved.
    - `id`: string - Identifier of the source document, snapshot, or BIM file.
    - `name`: string - Name of the source document or model.
    - `type`: string enum[model_manager, document, bim_file] - Kind of source the issue originated from. e.g. `document`
  - `drawing_revision`: object - Drawing revision linked to the issue
    - `id`: string - Drawing revision ID e.g. `662`
    - `title`: string - Formatted title of the drawing revision e.g. `A001: COVER SHEET Rev.0`
  - `trade`: object - Trade associated with the issue
    - `id`: string - Trade ID e.g. `999`
    - `name`: string - Trade name e.g. `09 - acoustical panels`
    - `active`: boolean - Trade availability e.g. `true`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-08-01T23:33:54Z`
  - `coordination_issue_type`: object - Company-configurable issue type assigned to the Coordination Issue.
    - `id`: string - Issue type ID e.g. `12`
    - `name`: string - Issue type name e.g. `Clash`
    - `active`: boolean - Whether the issue type is active. e.g. `true`
    - `created_at`: string(date-time) - Timestamp when the issue type was created. e.g. `2018-04-19T09:36:42Z`
    - `position`: integer - Ordering position of the issue type. e.g. `1`
    - `updated_at`: string(date-time) - Timestamp when the issue type was last updated. e.g. `2018-04-20T09:36:42Z`
    - `global`: boolean - Whether the issue type is a default provided by Procore. e.g. `false`
    - `deletable`: boolean - Whether the issue type can be deleted. e.g. `true`
  - `coordination_issue_priority`: object - Company-configurable priority assigned to the Coordination Issue.
    - `id`: string - Priority ID e.g. `8`
    - `name`: string - Priority name e.g. `High`
    - `active`: boolean - Whether the priority is active. e.g. `true`
    - `created_at`: string(date-time) - Timestamp when the priority was created. e.g. `2018-04-19T09:36:42Z`
    - `position`: integer - Ordering position of the priority. e.g. `1`
    - `updated_at`: string(date-time) - Timestamp when the priority was last updated. e.g. `2018-04-20T09:36:42Z`
    - `global`: boolean - Whether the priority is a default provided by Procore. e.g. `false`
    - `deletable`: boolean - Whether the priority can be deleted. e.g. `true`
  - `origin`: object - Origin source for the Coordination Issue
    - `title`: string - Title of the origin item e.g. `My BcfTopic`
    - `origin_id`: string - ID of the origin item e.g. `7b3c8752-e03e-417f-bb57-46bb5aca1139`
    - `origin_type`: string - Type of origin item e.g. `BcfTopic`
    - `deep_link_url`: string - Deep link URL to the origin item e.g. `https://some-company.com/bcf-topics/156`
  - `location`: object - Location information
    - `id`: string - Location ID e.g. `5`
    - `name`: string - Location name
  - `assignee`: object - Assignee information
    - `id`: string - User ID e.g. `624`
    - `name`: string - User name
    - `login`: string - User email
    - `locale`: string - User locale
    - `company_name`: string - Company name
  - `created_by`: object - Creator information
    - `id`: string - User ID e.g. `100`
    - `name`: string - User name
    - `login`: string - User email
    - `locale`: string - User locale
    - `company_name`: string - Company name
  - `updated_by`: object - User who last updated the issue
    - `id`: string - User ID e.g. `101`
    - `name`: string - User name
    - `login`: string - User email
    - `locale`: string - User locale
    - `company_name`: string - Company name
  - `watchers`: array of object - Users watching the Coordination Issue.
    - `id`: string - User ID e.g. `624`
    - `name`: string - User name
    - `login`: string - User email
    - `locale`: string - User locale
    - `company_name`: string - Company name
  - `attachments`: array of object - Array of attachments
    - `id`: string - Attachment ID e.g. `456`
    - `name`: string - File name
    - `content_type`: string - MIME type
    - `url`: string - URL to download the attachment
  - `document_snapshots`: array of object - Snapshots of the source documents captured for the issue.
    - `id`: string - Document snapshot ID e.g. `77`
    - `document_container_id`: string - Unique identifier of the document container. e.g. `container-123`
    - `document_name`: string - Name of the document.
    - `document_revision_id`: string - Unique identifier of the document revision. e.g. `revision-456`
    - `document_revision_version_id`: string - Unique identifier of the document revision version. e.g. `version-789`
    - `created_at`: string(date-time) - Timestamp when the snapshot was created. e.g. `2018-04-19T09:36:42Z`
    - `prostore_file`: object - Stored file backing the document snapshot.
  - `linked_procore_items`: array of object - Procore items linked to the Coordination Issue
    - `id`: string - Association ID e.g. `101`
    - `coordination_issue_id`: string - ID of the associated Coordination Issue e.g. `426`
    - `item_id`: string - ID of the associated Procore item e.g. `1287`
    - `item_type`: string - Type of the associated Procore item e.g. `rfi`
    - `item_url`: string - Deep-link URL to the associated Procore item
    - `item_data`: object - Data specific to the associated item
  - `linked_drawings`: array of object - Details of drawings linked to Coordination Issue
    - `id`: string - Drawing ID e.g. `667`
    - `title`: string - Formatted title of the drawing
    - `url`: string - Procore Web App URL of the drawing
  - `linked_observation_items`: array of object - Observation items linked to the Coordination Issue
    - `id`: string - Observation item ID e.g. `789`
    - `name`: string - Observation item name
  - `document_container_metadata`: object - Document container metadata
    - `id`: string - ID of the document container metadata e.g. `1`
    - `document_container_id`: string - Unique identifier of the document container e.g. `container-123`
    - `document_revision_id`: string - Unique identifier of the document revision e.g. `revision-456`
    - `document_name`: string - Name of the document
    - `workflows_instance_id`: string - ID of the associated workflow instance e.g. `789`
    - `workflow_name`: string - Name of the associated workflow
    - `pin_id`: string - Unique identifier of the pin e.g. `pin-abc-123`
  - `drawing_markup_preview_images`: array of object - Preview images generated by drawings with Coordination Issue Pin
    - `id`: string - Preview image ID e.g. `100`
    - `drawing_revision_id`: string - Drawing revision ID e.g. `662`
    - `name`: string - Base name of the file
    - `content_type`: string - MIME type
    - `url`: string - URL to download the file
  - `coordination_issue_bim_viewpoints`: array of object - BIM viewpoints associated with the Coordination Issue.
    - `id`: string - Viewpoint mapping ID e.g. `45`
    - `bim_viewpoint_id`: string - ID of the associated BIM viewpoint. e.g. `981`
    - `is_primary`: boolean - Whether this is the primary viewpoint for the issue. e.g. `true`
  - `custom_fields`: object - Custom fields associated with the Coordination Issue
  - `permissions`: object - Permission flags for the current user on this Coordination Issue.
    - `can_edit`: boolean - Whether the current user can edit this Coordination Issue. Always false when the associated workflow instance is terminated or completed. e.g. `true`
    - `can_update_status`: boolean - Whether the current user can change the status of this Coordination Issue. Present only when a status transition or elevation action is available. e.g. `true`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues/workflow_issues/{id}

**Update Coordination Issue Workflow Issue**
Updates a specific Coordination Issue that has associated workflow metadata.
Access is controlled by the same visibility rules as other workflow issue endpoints:
- Project Admins can update all workflow issues
- Issue creators can update issues they created
- Issue assignees can update issues assigned to them
- Workflow members can update issues for workflows they are part of

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Coordination Issue ID

Request body (application/json) (required):

- `coordination_issue`: object
  - `title`: string - Title of the Coordination Issue (max 80 characters) e.g. `Plumbing Issue on second floor`
  - `description`: string - Description of the Coordination Issue e.g. `Plumbing conflicts with light fixtures`
  - `status`: string enum[open, closed, ready_for_review] - Status of the Coordination Issue. Must be open, ready_for_review or closed. Only issue assignee can set ready_for_review. e.g. `closed`
  - `location_id`: string - Location where the issue is present. The location must be in the same project as the project_id e.g. `5`
  - `assignee_id`: string - ID of Procore user that should be assigned the issue e.g. `12345`
  - `due_date`: string(date) - Due date of the Coordination Issue e.g. `2018-08-16`
  - `issue_type`: string - Issue Type of the Coordination Issue e.g. `building_code`
  - `priority`: string - Priority of the Coordination Issue e.g. `high`
  - `trade_id`: string - Trade associated with the Coordination Issue e.g. `999`
  - `origin`: string - Delete origin association. Only 'null' value accepted

Response 200 (application/json): object

- `data`: object (required) - Coordination Issue with extended details
  - `id`: string - Unique identifier for the Coordination Issue e.g. `426`
  - `uuid`: string - UUID of the Coordination Issue e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
  - `title`: string - Title of the Coordination Issue (max 80 characters) e.g. `Plumbing Issue on second floor`
  - `description`: string - Description of the Coordination Issue e.g. `Elaborate details on the plumbing issue`
  - `status`: string enum[open, in_progress, blocked, unblocked, ready_for_review, moved_to_observation, closed] - Status of the issue e.g. `open`
  - `is_private`: boolean - Whether the Coordination Issue is private. e.g. `false`
  - `issue_number`: integer - Issue number unique per project e.g. `2`
  - `creation_source`: string - Source from which the issue was created e.g. `navisworks`
  - `due_date`: string(date) - Due date of the Coordination Issue e.g. `2018-08-16`
  - `closed_date`: string(date) - Date when the issue was closed
  - `project_id`: string - Unique identifier for the project e.g. `29`
  - `bim_model_id`: string - ID of the BIM model the issue is associated with. e.g. `86`
  - `comments_count`: integer - Count of comments e.g. `15`
  - `viewpoint_count`: integer - Number of BIM viewpoints associated with the issue. e.g. `3`
  - `issue_type`: string - Issue type of the Coordination Issue e.g. `building_code`
  - `priority`: string - Priority of the Coordination Issue e.g. `high`
  - `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
  - `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
  - `bim_file`: object - BIM file associated with the issue
    - `id`: string - BIM file ID e.g. `123`
    - `name`: string - BIM file name
    - `uuid`: string - UUID of the BIM file e.g. `a1b2c3d4-0000-4000-8000-000000000000`
  - `source_file`: object - Source document or model the issue originated from. Empty when no source is resolved.
    - `id`: string - Identifier of the source document, snapshot, or BIM file.
    - `name`: string - Name of the source document or model.
    - `type`: string enum[model_manager, document, bim_file] - Kind of source the issue originated from. e.g. `document`
  - `drawing_revision`: object - Drawing revision linked to the issue
    - `id`: string - Drawing revision ID e.g. `662`
    - `title`: string - Formatted title of the drawing revision e.g. `A001: COVER SHEET Rev.0`
  - `trade`: object - Trade associated with the issue
    - `id`: string - Trade ID e.g. `999`
    - `name`: string - Trade name e.g. `09 - acoustical panels`
    - `active`: boolean - Trade availability e.g. `true`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-08-01T23:33:54Z`
  - `coordination_issue_type`: object - Company-configurable issue type assigned to the Coordination Issue.
    - `id`: string - Issue type ID e.g. `12`
    - `name`: string - Issue type name e.g. `Clash`
    - `active`: boolean - Whether the issue type is active. e.g. `true`
    - `created_at`: string(date-time) - Timestamp when the issue type was created. e.g. `2018-04-19T09:36:42Z`
    - `position`: integer - Ordering position of the issue type. e.g. `1`
    - `updated_at`: string(date-time) - Timestamp when the issue type was last updated. e.g. `2018-04-20T09:36:42Z`
    - `global`: boolean - Whether the issue type is a default provided by Procore. e.g. `false`
    - `deletable`: boolean - Whether the issue type can be deleted. e.g. `true`
  - `coordination_issue_priority`: object - Company-configurable priority assigned to the Coordination Issue.
    - `id`: string - Priority ID e.g. `8`
    - `name`: string - Priority name e.g. `High`
    - `active`: boolean - Whether the priority is active. e.g. `true`
    - `created_at`: string(date-time) - Timestamp when the priority was created. e.g. `2018-04-19T09:36:42Z`
    - `position`: integer - Ordering position of the priority. e.g. `1`
    - `updated_at`: string(date-time) - Timestamp when the priority was last updated. e.g. `2018-04-20T09:36:42Z`
    - `global`: boolean - Whether the priority is a default provided by Procore. e.g. `false`
    - `deletable`: boolean - Whether the priority can be deleted. e.g. `true`
  - `origin`: object - Origin source for the Coordination Issue
    - `title`: string - Title of the origin item e.g. `My BcfTopic`
    - `origin_id`: string - ID of the origin item e.g. `7b3c8752-e03e-417f-bb57-46bb5aca1139`
    - `origin_type`: string - Type of origin item e.g. `BcfTopic`
    - `deep_link_url`: string - Deep link URL to the origin item e.g. `https://some-company.com/bcf-topics/156`
  - `location`: object - Location information
    - `id`: string - Location ID e.g. `5`
    - `name`: string - Location name
  - `assignee`: object - Assignee information
    - `id`: string - User ID e.g. `624`
    - `name`: string - User name
    - `login`: string - User email
    - `locale`: string - User locale
    - `company_name`: string - Company name
  - `created_by`: object - Creator information
    - `id`: string - User ID e.g. `100`
    - `name`: string - User name
    - `login`: string - User email
    - `locale`: string - User locale
    - `company_name`: string - Company name
  - `updated_by`: object - User who last updated the issue
    - `id`: string - User ID e.g. `101`
    - `name`: string - User name
    - `login`: string - User email
    - `locale`: string - User locale
    - `company_name`: string - Company name
  - `watchers`: array of object - Users watching the Coordination Issue.
    - `id`: string - User ID e.g. `624`
    - `name`: string - User name
    - `login`: string - User email
    - `locale`: string - User locale
    - `company_name`: string - Company name
  - `attachments`: array of object - Array of attachments
    - `id`: string - Attachment ID e.g. `456`
    - `name`: string - File name
    - `content_type`: string - MIME type
    - `url`: string - URL to download the attachment
  - `document_snapshots`: array of object - Snapshots of the source documents captured for the issue.
    - `id`: string - Document snapshot ID e.g. `77`
    - `document_container_id`: string - Unique identifier of the document container. e.g. `container-123`
    - `document_name`: string - Name of the document.
    - `document_revision_id`: string - Unique identifier of the document revision. e.g. `revision-456`
    - `document_revision_version_id`: string - Unique identifier of the document revision version. e.g. `version-789`
    - `created_at`: string(date-time) - Timestamp when the snapshot was created. e.g. `2018-04-19T09:36:42Z`
    - `prostore_file`: object - Stored file backing the document snapshot.
  - `linked_procore_items`: array of object - Procore items linked to the Coordination Issue
    - `id`: string - Association ID e.g. `101`
    - `coordination_issue_id`: string - ID of the associated Coordination Issue e.g. `426`
    - `item_id`: string - ID of the associated Procore item e.g. `1287`
    - `item_type`: string - Type of the associated Procore item e.g. `rfi`
    - `item_url`: string - Deep-link URL to the associated Procore item
    - `item_data`: object - Data specific to the associated item
  - `linked_drawings`: array of object - Details of drawings linked to Coordination Issue
    - `id`: string - Drawing ID e.g. `667`
    - `title`: string - Formatted title of the drawing
    - `url`: string - Procore Web App URL of the drawing
  - `linked_observation_items`: array of object - Observation items linked to the Coordination Issue
    - `id`: string - Observation item ID e.g. `789`
    - `name`: string - Observation item name
  - `document_container_metadata`: object - Document container metadata
    - `id`: string - ID of the document container metadata e.g. `1`
    - `document_container_id`: string - Unique identifier of the document container e.g. `container-123`
    - `document_revision_id`: string - Unique identifier of the document revision e.g. `revision-456`
    - `document_name`: string - Name of the document
    - `workflows_instance_id`: string - ID of the associated workflow instance e.g. `789`
    - `workflow_name`: string - Name of the associated workflow
    - `pin_id`: string - Unique identifier of the pin e.g. `pin-abc-123`
  - `drawing_markup_preview_images`: array of object - Preview images generated by drawings with Coordination Issue Pin
    - `id`: string - Preview image ID e.g. `100`
    - `drawing_revision_id`: string - Drawing revision ID e.g. `662`
    - `name`: string - Base name of the file
    - `content_type`: string - MIME type
    - `url`: string - URL to download the file
  - `coordination_issue_bim_viewpoints`: array of object - BIM viewpoints associated with the Coordination Issue.
    - `id`: string - Viewpoint mapping ID e.g. `45`
    - `bim_viewpoint_id`: string - ID of the associated BIM viewpoint. e.g. `981`
    - `is_primary`: boolean - Whether this is the primary viewpoint for the issue. e.g. `true`
  - `custom_fields`: object - Custom fields associated with the Coordination Issue
  - `permissions`: object - Permission flags for the current user on this Coordination Issue.
    - `can_edit`: boolean - Whether the current user can edit this Coordination Issue. Always false when the associated workflow instance is terminated or completed. e.g. `true`
    - `can_update_status`: boolean - Whether the current user can change the status of this Coordination Issue. Present only when a status transition or elevation action is available. e.g. `true`

Error responses: 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues/workflow_issues/{id}

**Delete Coordination Issue Workflow Issue**
Deletes a specific Coordination Issue that has associated workflow metadata.
Access is controlled by the same visibility rules as other workflow issue endpoints:
- Project Admins can delete all workflow issues
- Issue creators can delete issues they created
- Issue assignees can delete issues assigned to them
- Workflow members can delete issues for workflows they are part of

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Coordination Issue ID

Response 204: Workflow Issue deleted successfully (no body)

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

