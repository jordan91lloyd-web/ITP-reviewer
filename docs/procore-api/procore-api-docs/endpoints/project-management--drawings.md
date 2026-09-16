# Procore API: Drawings (Project Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Drawings)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Coordination Issue Statuses](#coordination-issue-statuses) - versions 2.0
- [Drawing Areas](#drawing-areas) - versions 1.1, 1.0
- [Drawing Disciplines](#drawing-disciplines) - versions 1.1, 1.0
- [Drawing Revision Emails](#drawing-revision-emails) - versions 1.0
- [Drawings](#drawings) - versions 1.1, 1.0

## Coordination Issue Statuses

Resource id: `coordination-issue-statuses`. Raw spec: `../openapi-raw/coordination-issue-statuses.json`. Web: https://developers.procore.com/reference/rest/coordination-issue-statuses?version=latest
Product lines: PM Essentials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/coordination_issues/{coordination_issue_id}/statuses

**List Available Status Transitions**
Returns the available status transitions for a coordination issue based on the current user's permissions and the issue's current state.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `coordination_issue_id` [path] string (required) - Coordination Issue ID

Response 200 (application/json): object

- `data`: array of object (required) - Available status transitions for the coordination issue.
  - `key`: string (required) - The status key value to use when updating the coordination issue. e.g. `ready_for_review`
  - `label`: string (required) - The translated display name of the status. e.g. `Ready for review`
  - `action_label`: string (required) - The action button text for transitioning to this status. e.g. `Mark done`
  - `is_primary`: boolean (required) - Whether this is the primary/recommended action for the current user. e.g. `true`
- `actions`: array of object (required) - Additional actions available for the coordination issue (e.g., unlink RFI when blocked).
  - `key`: string (required) - The action key identifier. e.g. `unlink_rfi`
  - `label`: string (required) - The display label for the action. e.g. `Unlink RFI`
  - `is_primary`: boolean (required) - Whether this is the primary action. e.g. `true`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Drawing Areas

Resource id: `drawing-areas`. Raw spec: `../openapi-raw/drawing-areas.json`. Web: https://developers.procore.com/reference/rest/drawing-areas?version=latest
Product lines: PM Starter Pack, PM Essentials, Total Quality and Safety Management

### GET /rest/v1.1/projects/{project_id}/drawing_areas

**List drawing areas**
Returns a list of all Drawing Areas in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Filter by Drawing Areas ID To request specific drawing area ids add `filters[id]=[1,2,3]` to filters
- `filters[exclude_empty_connected]` [query] boolean - When `true`, excludes connected drawing areas with no active revisions. Example: `filters[exclude_empty_connected]=true`
- `view` [query] string enum[compact, extended, only_ids, mfe] - Specify response schema view

Response 200 (application/json): array of object

- `id`: integer - Drawing Area ID e.g. `1`
- `name`: string - Drawing Area name e.g. `Building A`
- `drawings_count`: integer - Amount of Drawings e.g. `3`
- `description`: string - Drawing Area Description e.g. `East Hall`
- `created_at`: string(date-time) - Drawing Area created at timestamp
- `updated_at`: string(date-time) - Drawing Area updated at timestamp
- `deletable`: boolean - Whether the Drawing Area can be deleted
- `latest_revision_update`: string(date-time) - Timestamp of the most recent revision update in this Drawing Area, falls back to the area's updated_at if no revisions exist. Only included in the mfe view.

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/projects/{project_id}/drawing_areas

**Create drawing area**
Create a new Drawing Area in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `name`: string (required) - Drawing Area name e.g. `My new drawing area`
- `description`: string - Drawing Area description

Response 201 (application/json): object

- `id`: integer - Drawing Area ID
- `name`: string - Drawing Area name
- `description`: string - Description of Drawing Area

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/drawing_areas/{id}

**Update a drawing area**
Update an existing Drawing Area in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Unique identifier for the drawing area.

Request body (application/json) (required):

- `name`: string - Drawing Area name e.g. `My new drawing area`
- `description`: string - Drawing Area description

Response 200 (application/json): object

- `id`: integer - Drawing Area ID
- `name`: string - Drawing Area name
- `description`: string - Description of Drawing Area

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.1/projects/{project_id}/drawing_areas/{id}

**Delete a drawing area**
Delete an existing Drawing Area in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Unique identifier for the drawing area.

Response 200 (application/json): object

- `id`: integer - Drawing Area ID
- `success`: boolean - True if the drawing area was successfully deleted.

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/drawing_areas  **[OLDER VERSION - a newer path version exists below/above]**

**List drawing areas**
Returns a list of all Drawing Areas in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[exclude_empty_connected]` [query] boolean - When `true`, excludes connected drawing areas with no active revisions. Example: `filters[exclude_empty_connected]=true`

Response 200 (application/json): array of object

- `id`: integer - Drawing Area ID e.g. `1`
- `name`: string - Drawing Area name e.g. `Building A`
- `drawings_count`: integer - Amount of Drawings e.g. `3`
- `description`: string - Drawing Area Description e.g. `East Hall`
- `drawing_sets`: array of object - Array of Drawing Sets
  - `id`: integer - Drawing Set ID e.g. `268062`
  - `project_id`: integer - Drawing Set project ID e.g. `225096`
  - `name`: string - Drawing Set name e.g. `another new drawing set`
  - `created_at`: string(date-time) - Drawing Set created at e.g. `2016-09-01T20:02:27Z`
  - `updated_at`: string(date-time) - Drawing Set updated at e.g. `2016-09-01T20:02:27Z`
  - `date`: string(date) - Drawing Set date e.g. `2016-08-31`
  - `position`: integer - Drawing Set position e.g. `1`
  - `drawing_revisions_count`: integer - Amount of Drawing Revisions e.g. `3`
- `drawing_disciplines`: array of object - Array of Drawing Disciplines
  - `id`: integer - Drawing Discipline ID e.g. `6739`
  - `name`: string - Drawing Discipline name e.g. `Architectural`
  - `position`: integer - Drawing Discipline position e.g. `1`
- `created_at`: string(date-time) - Drawing Area created at e.g. `2015-03-19T12:00:00Z`
- `updated_at`: string(date-time) - Drawing Area updated at e.g. `2015-03-19T12:00:00Z`
- `area_deletable`: boolean - True if Drawing Area can be deleted. Does not check permissions e.g. `true`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/drawing_areas  **[OLDER VERSION - a newer path version exists below/above]**

**Create drawing area**
Create a new Drawing Area in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `name`: string (required) - Drawing Area name
- `description`: string - Drawing Area description

Response 201 (application/json): object

- `id`: integer - Drawing Area ID
- `name`: string - Drawing Area name
- `description`: string - Description of Drawing Area

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/drawing_areas/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Update a drawing area**
Update an existing Drawing Area in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Unique identifier for the drawing area.

Request body (application/json) (required):

- `name`: string - Drawing Area name e.g. `My new drawing area`
- `description`: string - Drawing Area description

Response 200 (application/json): object

- `id`: integer - Drawing Area ID
- `name`: string - Drawing Area name
- `description`: string - Description of Drawing Area

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/drawing_areas/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Delete a drawing area**
Delete an existing Drawing Area in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Unique identifier for the drawing area.

Response 200 (application/json): object

- `id`: integer - Drawing Area ID
- `success`: boolean - True if the drawing area was successfully deleted.

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Drawing Disciplines

Resource id: `drawing-disciplines`. Raw spec: `../openapi-raw/drawing-disciplines.json`. Web: https://developers.procore.com/reference/rest/drawing-disciplines?version=latest
Product lines: PM Starter Pack, PM Essentials, Total Quality and Safety Management

### GET /rest/v1.1/projects/{project_id}/drawing_disciplines

**List Drawing Disciplines**
List of Drawing Disciplines

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[id]` [query] array of integer - Filter by Drawing Disciplines ID To request specific drawing discipline ids add `filters[id]=[1,2,3]` to filters
- `view` [query] string enum[only_ids] - Specify response schema view
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Drawing Discipline ID e.g. `1`
- `name`: string - Drawing Discipline name e.g. `Architectural`
- `position`: integer - Position of the discipline in the drawing log e.g. `3`
- `abbreviations`: array of string - List of discipline abbreviations e.g. `["A", "ARC"]`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/drawing_disciplines/{id}

**Update drawing discipline**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the discipline to update

Request body (application/json):

- `name`: string (required) - New name for the Drawing Discipline e.g. `New Name`

Response 200 (application/json): object

- `id`: integer - Drawing Discipline ID e.g. `1`
- `name`: string - Drawing Discipline name e.g. `New Name`
- `position`: integer - Position of the discipline in the drawing log e.g. `5`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PUT /rest/v1.0/projects/{project_id}/drawing_disciplines/{id}  **[DEPRECATED]**

**Update drawing discipline**
This is a deprecated endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the discipline to update
- `name` [query] string (required) - New name for the Drawing Discipline

Response 200 (application/json): object

- `id`: integer - Drawing Discipline ID e.g. `1`
- `name`: string - Drawing Discipline name e.g. `Architectural`
- `position`: integer - Position of the discipline in the drawing log e.g. `3`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/drawing_disciplines/{id}

**Update drawing discipline**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the discipline to update

Request body (application/json):

- `name`: string (required) - New name for the Drawing Discipline e.g. `New Name`

Response 200 (application/json): object

- `id`: integer - Drawing Discipline ID e.g. `1`
- `name`: string - Drawing Discipline name e.g. `New Name`
- `position`: integer - Position of the discipline in the drawing log e.g. `5`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/drawing_disciplines  **[OLDER VERSION - a newer path version exists below/above]**

**List Drawing Disciplines**
List of Drawing Disciplines

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `id`: integer - Drawing Discipline ID e.g. `1`
- `name`: string - Drawing Discipline name e.g. `Architectural`
- `position`: integer - Position of the discipline in the drawing log e.g. `3`
- `abbreviations`: array of string - List of discipline abbreviations e.g. `["A", "ARC"]`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Drawing Revision Emails

Resource id: `drawing-revision-emails`. Raw spec: `../openapi-raw/drawing-revision-emails.json`. Web: https://developers.procore.com/reference/rest/drawing-revision-emails?version=latest
Product lines: PM Starter Pack, PM Essentials, Total Quality and Safety Management

### POST /rest/v1.0/projects/{project_id}/drawing_revision_emails/{id}/send_email

**Send email**
Sends an email with an associated Drawing Revision. The text of the
email and recipients are specified in the request body.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Drawing Revision to email

Request body (application/json) (required):

- `subject`: string - Subject of Email e.g. `Subject`
- `body`: string - Body of email e.g. `Body`
- `distribution_ids`: array of integer (required)
- `cc_distribution_ids`: array of integer
- `bcc_distribution_ids`: array of integer

Response 204: No Content (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Drawings

Resource id: `drawings`. Raw spec: `../openapi-raw/drawings.json`. Web: https://developers.procore.com/reference/rest/drawings?version=latest
Product lines: PM Starter Pack, PM Essentials, Total Quality and Safety Management

### GET /rest/v1.1/drawing_areas/{drawing_area_id}/drawings

**List drawings**
Returns a list of all Drawings for a specified drawing area.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `drawing_area_id` [path] integer (required) - ID of the drawing area
- `project_id` [query] integer - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[drawing_discipline_id]` [query] integer - Returns a list of drawings that are linked to the provided drawing_discipline_id
- `filters[drawing_set_id]` [query] integer - Returns a list of drawings that are linked to the provided drawing_set_id. Can optionally pass 'current_set' to return only drawings that are published.
- `with_position` [query] boolean - Returns a list of drawings conditionally ordered by position. By default, it will order by position.
- `view` [query] string enum[compact, extended, with_revisions] - The 'compact' view returns the minimal attributes of a drawing (id, number, title, obsolete, and discipline). The 'extended' view returns minimal attributes with the current_revision object, which contains image urls....

Response 200 (application/json): array of object

- `id`: integer - Drawing ID e.g. `1`
- `discipline`: string - Drawing discipline e.g. `Architectural`
- `drawing_discipline_id`: integer - Drawing discipline ID e.g. `3`
- `number`: string - Drawing number e.g. `A2`
- `drawing_number`: string - Canonical drawing number without sheet-number suffix formatting e.g. `A2`
- `sheet_number`: integer - Sheet number when assigned for multi-sheet drawings e.g. `1`
- `title`: string - Drawing title e.g. `Architectural 2nd Floor`
- `obsolete`: boolean - Obsolete status e.g. `true`
- `current_revision`: object - Current drawing revision
  - `floorplan`: boolean - Revision floorplan status e.g. `false`
  - `has_drawing_sketches`: boolean - Revision has drawing sketches status e.g. `true`
  - `id`: integer - Revision ID e.g. `2`
  - `pdf_size`: integer - PDF file size e.g. `1024000`
  - `pdf_url`: string - PDF url address e.g. `https://s3.amazonaws.com/pro-core.com/prostore/drawing.pdf`
  - `png_size`: integer - PNG file size e.g. `1024000`
  - `png_url`: string - PNG url address e.g. `https://s3.amazonaws.com/pro-core.com/prostore/drawing.png`
  - `revision_number`: string - Revision number e.g. `0`
  - `thumbnail_url`: string - Thumbnail url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/drawing_thumbnail.png`
  - `large_thumbnail_url`: string - Large thumbnail url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/drawing_thumbnail.png`
  - `updated_at`: string(date-time) - Revision updated at e.g. `2015-03-19T12:00:00Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/drawing_areas/{drawing_area_id}/drawings

**Create Drawing**
Create specified Drawing. For additional information on using the Create Drawing Upload endpoint, see the [Direct Drawing Uploads](https://developers.procore.com/documentation/tutorial-direct-drawing-uploads) tutorial.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `drawing_area_id` [path] integer (required) - ID of the drawing area

Request body (application/json) (required):

- `drawing`: object (required) - Drawing
  - `number`: string (required) - Drawing number e.g. `A2`
  - `sheet_number`: integer - Non-negative whole-number identifier for a sheet within a multi-sheet drawing. Include it with `number` to distinguish sheets that share the same drawing number; omit or set to `null` when the drawing has no sheet num... e.g. `5`
  - `title`: string - Drawing title e.g. `Architectural 2nd Floor`
  - `drawing_discipline`: object (required) - Drawing discipline
    - `name`: string (required) - Drawing discipline name e.g. `Architectural`

Response 201 (application/json): object

- `id`: integer - Drawing ID e.g. `1`
- `number`: string - Drawing number e.g. `A2`
- `drawing_number`: string - Canonical drawing number without sheet-number suffix formatting e.g. `A2`
- `sheet_number`: integer - Sheet number when assigned for multi-sheet drawings e.g. `1`
- `title`: string - Drawing title e.g. `Architectural 2nd Floor`
- `obsolete`: boolean - Obsolete status e.g. `true`
- `discipline`: string - Drawing discipline e.g. `Architectural`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/drawing_areas/{drawing_area_id}/drawings/{id}

**Update Drawing**
Update specified Drawing

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `drawing_area_id` [path] integer (required) - ID of the drawing area
- `id` [path] integer (required) - Drawing ID

Request body (application/json) (required):

- `drawing`: object (required) - Drawing
  - `number`: string - Drawing number e.g. `A2`
  - `sheet_number`: integer - Non-negative whole-number identifier for a sheet within a multi-sheet drawing. Include it with `number` to distinguish sheets that share the same drawing number; set to `null` to clear an existing sheet number. e.g. `5`
  - `title`: string - Drawing title e.g. `Architectural 2nd Floor`
  - `obsolete`: boolean - Obsolete status e.g. `true`
  - `drawing_discipline`: object - Drawing discipline
    - `name`: string - Drawing discipline name e.g. `Architectural`
  - `ordered_revision_ids`: array of integer - Ordered array of the complete list of reviewed and published Drawing Revision IDs that belong to the drawing e.g. `[1587816]`

Response 200 (application/json): object

- `id`: integer - Drawing ID e.g. `1`
- `number`: string - Drawing number e.g. `A2`
- `drawing_number`: string - Canonical drawing number without sheet-number suffix formatting e.g. `A2`
- `sheet_number`: integer - Sheet number when assigned for multi-sheet drawings e.g. `1`
- `title`: string - Drawing title e.g. `Architectural 2nd Floor`
- `obsolete`: boolean - Obsolete status e.g. `true`
- `discipline`: string - Drawing discipline e.g. `Architectural`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/drawing_uploads

**List drawing uploads**
Returns a list of all Drawing Uploads in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[normal, with_drawing_log_imports] - Specifies the level of detail returned in the response. The 'with_drawing_log_imports' view provides additional data as shown below. The 'normal' view is the default if not specified.

Response 200 (application/json): array of object

- `id`: integer - Drawing Upload ID e.g. `85`
- `project_id`: integer - Unique identifier for the project. e.g. `2`
- `company_id`: integer - Unique identifier for the company. e.g. `3`
- `created_by_id`: integer - ID of creator e.g. `5`
- `created_at`: string(date-time) - Drawing Upload created at e.g. `2016-08-08T21:35:58Z`
- `updated_at`: string(date-time) - Drawing Upload updated at e.g. `2016-08-08T21:35:58Z`
- `error_email_sent`: boolean - Error email sent status e.g. `false`
- `notify_on_success`: boolean - Notify on success status e.g. `false`
- `deletion_in_progress`: boolean - Deletion in progress status e.g. `false`
- `success_email_sent`: boolean - Success email sent status e.g. `false`
- `drawing_area_id`: integer - Drawing Area ID e.g. `1`
- `status`: string enum[in_queue, in_progress, mechanical_turk, failed, ready_for_review, reviewed] e.g. `in_progress`
- `pre_adaptive_complete`: boolean - Pre adaptive complete status e.g. `false`
- `drawing_number_contains_revision`: boolean - Drawing number contains revision e.g. `false`
- `get_info_from_filename`: boolean - Get info from filename e.g. `false`
- `language`: string - Language for OCR e.g. `es`
- `drawing_log_imports`: array of object - Drawing Log Imports (Only included in 'with_drawing_log_imports' view)
  - `id`: integer - Drawing Log Import ID e.g. `85`
  - `filename`: string - Filename e.g. `example.pdf`
  - `drawing_set_id`: integer - Drawing Set ID e.g. `42`
  - `drawing_date`: string(date) - Drawing date e.g. `2021-09-07`
  - `received_date`: string(date) - Received date e.g. `2021-09-07`
  - `default_revision`: string - Default Revision for any Drawing Revisions in the Import e.g. `23`
  - `drawing_id`: integer - Drawing ID e.g. `88`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/projects/{project_id}/drawing_uploads

**Create drawing upload**
Create a new Drawing Upload in the specified project.
It creates one `DrawingUpload`, which includes a `DrawingLogImport` and a `ProstoreFile` for each file uploaded. The Drawing Upload will be processed asynchronously after the response.
For additional information on using the Create Drawing endpoint, see [Direct Drawing Uploads](/documentation/tutorial-direct-drawing-uploads) tutorial.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `Idempotency-Token` [header] string - Unique idempotent token

Request body (multipart/form-data) (required):

- `drawing_upload`: object
  - `drawing_area_id`: integer - Drawing Area ID *Required only if Drawing Area is turned on e.g. `123456`
  - `drawing_number_contains_revision`: boolean - Drawing number contains revision status e.g. `true`
  - `drawing_set_id`: integer (required) - Drawing Set ID e.g. `123456`
  - `get_info_from_filename`: boolean - Get drawing title, number from filename e.g. `false`
  - `drawing_log_imports`: array of object (required) - Array of Drawing Log Import parameters. There should be one Drawing Log Import per file/Upload in the Drawing Upload.
    - `upload_uuid`: string (required) - An Uploads objects uuid. Must be a pdf. e.g. `1ZE258W9K804SAJJZX19JVAB3R`
    - `drawing_date`: string(date-time) (required) - Drawing date *Required only if a drawing_id is provided e.g. `2021-03-17T12:42:00Z`
    - `received_date`: string(date-time) - Received date e.g. `2021-03-17T12:42:00Z`
    - `default_revision`: string (required) - Default Revision for any Drawing Revisions in the Import *Required only if a drawing_id is provided e.g. `23`
    - `drawing_id`: integer - Drawing ID to associate any created Drawing Revisions to e.g. `123456`
    - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `id`: integer - Drawing Upload ID e.g. `85`
- `project_id`: integer - Unique identifier for the project. e.g. `2`
- `company_id`: integer - Unique identifier for the company. e.g. `3`
- `created_by_id`: integer - ID of creator e.g. `5`
- `created_at`: string(date-time) - Drawing Upload created at e.g. `2016-08-08T21:35:58Z`
- `updated_at`: string(date-time) - Drawing Upload updated at e.g. `2016-08-08T21:35:58Z`
- `error_email_sent`: boolean - Error email sent status e.g. `false`
- `notify_on_success`: boolean - Notify on success status e.g. `false`
- `deletion_in_progress`: boolean - Deletion in progress status e.g. `false`
- `success_email_sent`: boolean - Success email sent status e.g. `false`
- `drawing_area_id`: integer - Drawing Area ID e.g. `1`
- `status`: string enum[in_queue, in_progress, mechanical_turk, failed, ready_for_review, reviewed] e.g. `in_progress`
- `pre_adaptive_complete`: boolean - Pre adaptive complete status e.g. `false`
- `drawing_number_contains_revision`: boolean - Drawing number contains revision e.g. `false`
- `get_info_from_filename`: boolean - Get info from filename e.g. `false`
- `language`: string - Language for OCR e.g. `es`

Response 201 (application/json): object

- `id`: integer - Drawing Upload ID e.g. `85`
- `project_id`: integer - Unique identifier for the project. e.g. `2`
- `company_id`: integer - Unique identifier for the company. e.g. `3`
- `created_by_id`: integer - ID of creator e.g. `5`
- `created_at`: string(date-time) - Drawing Upload created at e.g. `2016-08-08T21:35:58Z`
- `updated_at`: string(date-time) - Drawing Upload updated at e.g. `2016-08-08T21:35:58Z`
- `error_email_sent`: boolean - Error email sent status e.g. `false`
- `notify_on_success`: boolean - Notify on success status e.g. `false`
- `deletion_in_progress`: boolean - Deletion in progress status e.g. `false`
- `success_email_sent`: boolean - Success email sent status e.g. `false`
- `drawing_area_id`: integer - Drawing Area ID e.g. `1`
- `status`: string enum[in_queue, in_progress, mechanical_turk, failed, ready_for_review, reviewed] e.g. `in_progress`
- `pre_adaptive_complete`: boolean - Pre adaptive complete status e.g. `false`
- `drawing_number_contains_revision`: boolean - Drawing number contains revision e.g. `false`
- `get_info_from_filename`: boolean - Get info from filename e.g. `false`
- `language`: string - Language for OCR e.g. `es`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/drawing_uploads/{id}

**Show Drawing Upload**
Get the details of a single Drawing Upload

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Drawing Upload ID
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[normal, with_drawing_log_imports] - Specifies the level of detail returned in the response. The 'with_drawing_log_imports' view provides additional data as shown below. The 'normal' view is the default if not specified.

Response 200 (application/json): object

- `id`: integer - Drawing Upload ID e.g. `85`
- `project_id`: integer - Unique identifier for the project. e.g. `2`
- `company_id`: integer - Unique identifier for the company. e.g. `3`
- `created_by_id`: integer - ID of creator e.g. `5`
- `created_at`: string(date-time) - Drawing Upload created at e.g. `2016-08-08T21:35:58Z`
- `updated_at`: string(date-time) - Drawing Upload updated at e.g. `2016-08-08T21:35:58Z`
- `error_email_sent`: boolean - Error email sent status e.g. `false`
- `notify_on_success`: boolean - Notify on success status e.g. `false`
- `deletion_in_progress`: boolean - Deletion in progress status e.g. `false`
- `success_email_sent`: boolean - Success email sent status e.g. `false`
- `drawing_area_id`: integer - Drawing Area ID e.g. `1`
- `status`: string enum[in_queue, in_progress, mechanical_turk, failed, ready_for_review, reviewed] e.g. `in_progress`
- `pre_adaptive_complete`: boolean - Pre adaptive complete status e.g. `false`
- `drawing_number_contains_revision`: boolean - Drawing number contains revision e.g. `false`
- `get_info_from_filename`: boolean - Get info from filename e.g. `false`
- `language`: string - Language for OCR e.g. `es`
- `drawing_log_imports`: array of object - Drawing Log Imports (Only included in 'with_drawing_log_imports' view)
  - `id`: integer - Drawing Log Import ID e.g. `85`
  - `filename`: string - Filename e.g. `example.pdf`
  - `drawing_set_id`: integer - Drawing Set ID e.g. `42`
  - `drawing_date`: string(date) - Drawing date e.g. `2021-09-07`
  - `received_date`: string(date) - Received date e.g. `2021-09-07`
  - `default_revision`: string - Default Revision for any Drawing Revisions in the Import e.g. `23`
  - `drawing_id`: integer - Drawing ID e.g. `88`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.1/projects/{project_id}/drawing_uploads/{id}

**Delete drawing upload**
Delete an unreviewed Drawing Upload.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Drawing Upload ID
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[normal, with_drawing_log_imports] - Specifies the level of detail returned in the response. The 'with_drawing_log_imports' view provides additional data as shown below. The 'normal' view is the default if not specified.

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/drawing_revision_terms

**List drawing revision terms**
Returns extracted text terms and locations for a collection of Drawing Revisions.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `drawing_revision_ids` [query] array of integer - Drawing Revisions to fetch extracted terms for. Limited to 50 revisions per call; clients should paginate larger collections.

Response 200 (application/json): array of object

- `drawing_revision_id`: integer - Revision ID e.g. `2`
- `updated_at`: string(date-time) - Revision term coordinates updated at e.g. `2015-03-19T12:00:00Z`
- `terms`: object

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/drawing_revisions/{drawing_revision_id}/drawing_tiles

**List drawing tiles**
Lists the Drawing Tiles in the specified Drawing Revision along with the maximum Zoom Level and Tile Size.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `drawing_revision_id` [path] integer (required) - ID of the drawing revision

Response 200 (application/json): object

- `max_zoom_level`: integer - Max zoom level e.g. `2`
- `tile_size`: array of integer - Array of tile width and height e.g. `[750, 750]`
- `zip_url`: string - ZIP url e.g. `https://streaming.procore.com/download?uuid=03bb9d61702ce533caef169d4370b98f7...`
- `tiles`: array of object - Array of drawing tiles
  - `id`: integer - Drawing Tile ID e.g. `402785892`
  - `x`: integer - Tile X e.g. `8`
  - `y`: integer - Tile Y e.g. `6`
  - `z`: integer - Zoom level e.g. `2`
  - `url`: string - This has been deprecated. e.g. `deprecated`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/drawing_revisions

**List drawing revisions**
Returns a list of all Drawing Revisions in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `drawing_area_id` [query] integer - Filter by Drawing Area
- `drawing_id` [query] integer - Filter by Drawing
- `drawing_discipline_id` [query] integer - Filter by Drawing Discipline
- `drawing_set_id` [query] integer - Filter by Drawing Set. To retreive revisions from current set add `drawing_set_id=current_set` to query
- `id` [query] array of integer - Filter by Drawing Revision ID To request specific drawing revision ids add `id[]=42&id[]=43` to query
- `filters[ids]` [query] array of integer - Filter by Drawing Revisions ID To request specific drawing revision ids add `filters[ids]=[1,2,3]` to filters
- `filters[updated_at]` [query] string(date) - Return item(s) updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[deleted]` [query] string enum[only, with] - Include deleted drawing revisions. Deleted drawing revisions are filtered by default.
- `is_reviewed` [query] boolean - Filter by `reviewed` status
- `query` [query] string - Filter by custom query
- `with_obsolete` [query] boolean - Include obsolete drawing revisions. Obsolete drawing revisions are filtered by default.
- `sort` [query] string enum[id, -id, created_at, deleted_at, drawing_number, number, title, drawing_date, received_date, status, revision_number, revision, ...] - Sort by field. Prefix the sort key with `-` for descending order (e.g. `-drawing_number`). Multiple comma-separated sort keys are supported and applied in order. In addition to the fixed keys below, drawing revisions ...
- `view` [query] string enum[only_pdf_urls, only_ids, only_ids_post_review, web_index, web_show, extended_coordinates, extended_files, extended_dpi, android] - Defines the type of view returned. Must be one of 'only_pdf_urls', 'only_ids', 'only_ids_post_review', 'web_index', 'web_show', 'extended_coordinates', 'extended_files', 'extended_dpi' or 'android'.

Response 200 (application/json): array of object

- `drawing_date`: string(date) - Drawing date e.g. `2015-03-17`
- `drawing_id`: integer - Drawing ID e.g. `1`
- `drawing_number`: string - Drawing number (falls back to deleted_number when drawing is deleted) e.g. `A2`
- `sheet_number`: integer - Sheet number when assigned for multi-sheet drawings e.g. `1`
- `drawing_sketches_count`: integer - Amount of drawing sketches e.g. `2`
- `height`: integer - Height e.g. `3431`
- `id`: integer - Revision ID e.g. `2`
- `number`: string - Drawing Revision number e.g. `A2`
- `pdf_size`: integer - PDF file size e.g. `1024000`
- `pdf_url`: string - PDF url address e.g. `https://s3.amazonaws.com/pro-core.com/prostore/drawing.pdf`
- `png_size`: integer - PNG file size e.g. `1024000`
- `png_url`: string - PNG url address e.g. `https://s3.amazonaws.com/pro-core.com/prostore/drawing.png`
- `received_date`: string(date) - Received date e.g. `2015-03-17`
- `title`: string - Title e.g. `Floor 2`
- `updated_at`: string(date-time) - Revision updated at e.g. `2015-03-19T12:00:00Z`
- `width`: integer - Width e.g. `4803`
- `has_public_markup_layer_elements`: boolean - Has public markup layer elements status e.g. `true`
- `has_drawing_sketches`: boolean - Revision has drawing sketches status e.g. `true`
- `current`: boolean - Current Drawing Revision e.g. `true`
- `floorplan`: boolean - Revision floorplan status e.g. `false`
- `revision_number`: string - Revision number e.g. `0`
- `thumbnail_url`: string - Thumbnail url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/drawing_thumbnail.png`
- `large_thumbnail_url`: string - Large thumbnail url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/drawing_thumbnail_large.png`
- `activity_stream_last_viewed_at`: string - Activity stream last viewed at, currently not available e.g. `null`
- `position`: integer - Drawing Revision position e.g. `2`
- `zip_url`: string - ZIP url of Drawing Tiles e.g. `https://streaming.procore.com/download?uuid=03bb9d61702ce533caef169d4370b98f7...`
- `obsolete`: boolean - Revision of an obsolete Drawing e.g. `false`
- `connectability_outdated`: boolean - More recent Connectability Drawing Revision available to publish e.g. `false`
- `drawing_set`: object - Drawing Set
  - `id`: integer - Drawing Set ID e.g. `123`
- `drawing_area`: object - Drawing Area
  - `id`: integer - Drawing Area ID e.g. `456`
- `discipline`: object - Drawing discipline
  - `id`: integer - Discipline ID e.g. `1234`
  - `name`: string - Discipline name e.g. `Architectural`
  - `position`: integer - Discipline position e.g. `1`
- `status`: string
- `order_in_drawing`: integer
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

### GET /rest/v1.0/projects/{project_id}/drawing_revisions/{id}

**Show Drawing Revision**
Returns a specific Drawing Revision from the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Drawing Revision

Response 200 (application/json): object

- `drawing_date`: string(date) - Drawing date e.g. `2015-03-17`
- `drawing_id`: integer - Drawing ID e.g. `1`
- `drawing_number`: string - Drawing number (falls back to deleted_number when drawing is deleted) e.g. `A2`
- `sheet_number`: integer - Sheet number when assigned for multi-sheet drawings e.g. `1`
- `drawing_sketches_count`: integer - Amount of drawing sketches e.g. `2`
- `height`: integer - Height e.g. `3431`
- `id`: integer - Revision ID e.g. `2`
- `number`: string - Drawing Revision number e.g. `A2`
- `pdf_size`: integer - PDF file size e.g. `1024000`
- `pdf_url`: string - PDF url address e.g. `https://s3.amazonaws.com/pro-core.com/prostore/drawing.pdf`
- `png_size`: integer - PNG file size e.g. `1024000`
- `png_url`: string - PNG url address e.g. `https://s3.amazonaws.com/pro-core.com/prostore/drawing.png`
- `received_date`: string(date) - Received date e.g. `2015-03-17`
- `title`: string - Title e.g. `Floor 2`
- `updated_at`: string(date-time) - Revision updated at e.g. `2015-03-19T12:00:00Z`
- `width`: integer - Width e.g. `4803`
- `has_public_markup_layer_elements`: boolean - Has public markup layer elements status e.g. `true`
- `has_drawing_sketches`: boolean - Revision has drawing sketches status e.g. `true`
- `current`: boolean - Current Drawing Revision e.g. `true`
- `floorplan`: boolean - Revision floorplan status e.g. `false`
- `revision_number`: string - Revision number e.g. `0`
- `thumbnail_url`: string - Thumbnail url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/drawing_thumbnail.png`
- `large_thumbnail_url`: string - Large thumbnail url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/drawing_thumbnail_large.png`
- `activity_stream_last_viewed_at`: string - Activity stream last viewed at, currently not available e.g. `null`
- `position`: integer - Drawing Revision position e.g. `2`
- `zip_url`: string - ZIP url of Drawing Tiles e.g. `https://streaming.procore.com/download?uuid=03bb9d61702ce533caef169d4370b98f7...`
- `obsolete`: boolean - Revision of an obsolete Drawing e.g. `false`
- `connectability_outdated`: boolean - More recent Connectability Drawing Revision available to publish e.g. `false`
- `drawing_set`: object - Drawing Set
  - `id`: integer - Drawing Set ID e.g. `123`
- `drawing_area`: object - Drawing Area
  - `id`: integer - Drawing Area ID e.g. `456`
- `discipline`: object - Drawing discipline
  - `id`: integer - Discipline ID e.g. `1234`
  - `name`: string - Discipline name e.g. `Architectural`
  - `position`: integer - Discipline position e.g. `1`
- `status`: string
- `order_in_drawing`: integer
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

### PATCH /rest/v1.0/projects/{project_id}/drawing_revisions/{id}

**Update Drawing Revision**
Update specified Drawing Revision

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Drawing Revision

Request body (application/json) (required):

- `drawing_revision`: object (required) - Drawing Revision
  - `drawing_date`: string(date) - Drawing date e.g. `2015-03-17`
  - `received_date`: string(date) - Received date e.g. `2015-03-17`
  - `revision_number`: string - Revision number e.g. `0`
  - `floorplan`: boolean - Revision floorplan status e.g. `false`
  - `drawing_set_id`: integer - Drawing Set ID e.g. `123`
  - `drawing_id`: integer - Drawing ID e.g. `234`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `id`: integer - Revision ID e.g. `2`
- `drawing_date`: string(date) - Drawing date e.g. `2015-03-17`
- `received_date`: string(date) - Received date e.g. `2015-03-17`
- `revision_number`: string - Revision number e.g. `0`
- `floorplan`: boolean - Revision floorplan status e.g. `false`
- `current`: boolean - Current Drawing Revision e.g. `true`
- `drawing_id`: integer - Drawing ID e.g. `1`
- `sheet_number`: integer - Sheet number when assigned for multi-sheet drawings e.g. `1`
- `drawing_set`: object - Drawing Set
  - `id`: integer - Drawing Set ID e.g. `123`
- `ordered_revision_ids`: array of integer - Ordered array of the complete list of reviewed and published Drawing Revision IDs that belong to the drawing e.g. `[1587816]`
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

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/drawing_revisions/publish

**Publish Drawing Revisions**
Publish Drawing Revisions in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `drawing_set_id`: integer (required) - Drawing Set ID e.g. `123`
- `drawing_area_id`: integer - Drawing Area ID. Is required only if Drawing Area is enabled. e.g. `456`
- `distribute`: boolean - Drawing log subscribers will be sent a notification email after drawings have been published and distributed. Additionally, a push notification will appear on mobile devices for Procore users with push notifications e... e.g. `true`

Response 200 (application/json): object

- `drawing_revisions`: array of object
  - `id`: integer - Revision ID e.g. `2`
- `errors`: array of string

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/drawing_sets

**List drawing sets**
Lists the Drawing Sets in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[exclude_empty_sets]` [query] boolean - If true, returns drawing sets that contain at least one drawing.
- `filters[only_attachable_sets]` [query] boolean - If true, returns drawing sets that contain at least one published drawing.
- `filters[with_sketches]` [query] boolean - If true, returns only drawing sets that contain at least one drawing sketch.
- `filters[with_measurements]` [query] boolean - If true, returns only drawing sets that contain at least one measurement.
- `drawing_area_id` [query] integer - Filters to only drawing sets with a least one revision in that drawing area.

Response 200 (application/json): array of object

- `id`: integer - Drawing Set ID e.g. `268062`
- `project_id`: integer - Drawing Set project ID e.g. `225096`
- `company_id`: integer - Drawing Set company ID e.g. `1547`
- `name`: string - Drawing Set name e.g. `another new drawing set`
- `created_at`: string(date-time) - Drawing Set created at e.g. `2016-09-01T20:02:27Z`
- `updated_at`: string(date-time) - Drawing Set updated at e.g. `2016-09-01T20:02:27Z`
- `date`: string(date) - Drawing Set date e.g. `2016-08-31`
- `position`: integer - Drawing Set position e.g. `1`
- `connected`: boolean - Drawing Set is connected e.g. `true`
- `deletable`: boolean - This field is deprecated and will always return false. It does not indicate whether the drawing set can be deleted or not. e.g. `false`
- `published_drawings_count`: integer - Number of published Drawing Revisions in the Drawing Set. Requires a drawing_area_id param. e.g. `42`
- `unpublished_drawings_count`: integer - Number of unpublished Drawing Revisions in the Drawing Set. Requires a drawing_area_id param. e.g. `42`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/drawing_sets

**Create drawing set**
Create a new Drawing Set in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `name`: string (required) - Drawing Set name e.g. `another new drawing set`
- `date`: string(date) - Drawing Set date e.g. `2016-08-31`

Response 201 (application/json): object

- `id`: integer - Drawing Set ID e.g. `268062`
- `project_id`: integer - Drawing Set project ID e.g. `225096`
- `company_id`: integer - Drawing Set company ID e.g. `1547`
- `name`: string - Drawing Set name e.g. `another new drawing set`
- `created_at`: string(date-time) - Drawing Set created at e.g. `2016-09-01T20:02:27Z`
- `updated_at`: string(date-time) - Drawing Set updated at e.g. `2016-09-01T20:02:27Z`
- `date`: string(date) - Drawing Set date e.g. `2016-08-31`
- `position`: integer - Drawing Set position e.g. `1`
- `connected`: boolean - Drawing Set is connected e.g. `true`
- `deletable`: boolean - This field is deprecated and will always return false. It does not indicate whether the drawing set can be deleted or not. e.g. `false`
- `published_drawings_count`: integer - Number of published Drawing Revisions in the Drawing Set. Requires a drawing_area_id param. e.g. `42`
- `unpublished_drawings_count`: integer - Number of unpublished Drawing Revisions in the Drawing Set. Requires a drawing_area_id param. e.g. `42`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/drawing_sets/{id}

**Update drawing set**
Update an existing Drawing Set in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the drawing set

Request body (application/json) (required):

- `drawing_set`: object (required)
  - `name`: string - Drawing Set name e.g. `another new drawing set`
  - `date`: string(date) - Drawing Set date e.g. `2016-08-31`

Response 200 (application/json): object

- `id`: integer - Drawing Set ID e.g. `268062`
- `project_id`: integer - Drawing Set project ID e.g. `225096`
- `company_id`: integer - Drawing Set company ID e.g. `1547`
- `name`: string - Drawing Set name e.g. `another new drawing set`
- `created_at`: string(date-time) - Drawing Set created at e.g. `2016-09-01T20:02:27Z`
- `updated_at`: string(date-time) - Drawing Set updated at e.g. `2016-09-01T20:02:27Z`
- `date`: string(date) - Drawing Set date e.g. `2016-08-31`
- `position`: integer - Drawing Set position e.g. `1`
- `connected`: boolean - Drawing Set is connected e.g. `true`
- `deletable`: boolean - This field is deprecated and will always return false. It does not indicate whether the drawing set can be deleted or not. e.g. `false`
- `published_drawings_count`: integer - Number of published Drawing Revisions in the Drawing Set. Requires a drawing_area_id param. e.g. `42`
- `unpublished_drawings_count`: integer - Number of unpublished Drawing Revisions in the Drawing Set. Requires a drawing_area_id param. e.g. `42`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/drawing_sets/{id}

**Delete drawing set**
Delete a specified Drawing Set.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the drawing set

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/drawing_areas/{drawing_area_id}/drawings  **[OLDER VERSION - a newer path version exists below/above]**

**List drawings**
Returns a list of all Drawings for a specified drawing area.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `drawing_area_id` [path] integer (required) - ID of the drawing area
- `project_id` [query] integer - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Drawing ID e.g. `1`
- `discipline`: string - Drawing discipline e.g. `Architectural`
- `drawing_discipline_id`: integer - Drawing discipline ID e.g. `3`
- `number`: string - Drawing number e.g. `A2`
- `drawing_number`: string - Canonical drawing number without sheet-number suffix formatting e.g. `A2`
- `sheet_number`: integer - Sheet number when assigned for multi-sheet drawings e.g. `1`
- `title`: string - Drawing title e.g. `Architectural 2nd Floor`
- `obsolete`: boolean - Obsolete status e.g. `true`
- `current_revision`: object - Current drawing revision
  - `floorplan`: boolean - Revision floorplan status e.g. `false`
  - `has_drawing_sketches`: boolean - Revision has drawing sketches status e.g. `true`
  - `id`: integer - Revision ID e.g. `2`
  - `pdf_size`: integer - PDF file size e.g. `1024000`
  - `pdf_url`: string - PDF url address e.g. `https://s3.amazonaws.com/pro-core.com/prostore/drawing.pdf`
  - `png_size`: integer - PNG file size e.g. `1024000`
  - `png_url`: string - PNG url address e.g. `https://s3.amazonaws.com/pro-core.com/prostore/drawing.png`
  - `revision_number`: string - Revision number e.g. `0`
  - `thumbnail_url`: string - Thumbnail url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/drawing_thumbnail.png`
  - `large_thumbnail_url`: string - Large thumbnail url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/drawing_thumbnail.png`
  - `updated_at`: string(date-time) - Revision updated at e.g. `2015-03-19T12:00:00Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/drawing_areas/{drawing_area_id}/drawings/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Update Drawing**
Update specified Drawing

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `drawing_area_id` [path] integer (required) - ID of the drawing area
- `id` [path] integer (required) - Drawing ID

Request body (application/json) (required):

- `drawing`: object (required) - Drawing
  - `number`: string - Drawing number e.g. `A2`
  - `sheet_number`: integer - Non-negative whole-number identifier for a sheet within a multi-sheet drawing. Include it with `number` to distinguish sheets that share the same drawing number; set to `null` to clear an existing sheet number. e.g. `5`
  - `title`: string - Drawing title e.g. `Architectural 2nd Floor`
  - `obsolete`: boolean - Obsolete status e.g. `true`
  - `drawing_discipline`: object - Drawing discipline
    - `name`: string - Drawing discipline name e.g. `Architectural`
  - `ordered_revision_ids`: array of integer - Ordered array of the complete list of reviewed and published Drawing Revision IDs that belong to the drawing e.g. `[1587816]`

Response 200 (application/json): object

- `id`: integer - Drawing ID e.g. `1`
- `number`: string - Drawing number e.g. `A2`
- `drawing_number`: string - Canonical drawing number without sheet-number suffix formatting e.g. `A2`
- `sheet_number`: integer - Sheet number when assigned for multi-sheet drawings e.g. `1`
- `title`: string - Drawing title e.g. `Architectural 2nd Floor`
- `obsolete`: boolean - Obsolete status e.g. `true`
- `discipline`: string - Drawing discipline e.g. `Architectural`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/drawing_revision_terms  **[OLDER VERSION - a newer path version exists below/above]**

**List drawing revision terms**
Returns extracted text terms and locations for a collection of Drawing Revisions.
Drawing Revisions which do not have any recorded term data will be omitted from the response.
An empty term collection for a drawing indicates that the drawing has been processed, but that
no terms were found.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `drawing_revision_ids` [query] array of integer - Drawing Revisions to fetch extracted terms for. Limited to 50 revisions per call; clients should paginate larger collections.

Response 200 (application/json): array of object

- `drawing_revision_id`: integer - Revision ID e.g. `2`
- `updated_at`: string(date-time) - Revision term coordinates updated at e.g. `2015-03-19T12:00:00Z`
- `terms`: object

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/drawing_uploads  **[OLDER VERSION - a newer path version exists below/above]**

**List drawing uploads**
Returns a list of all Drawing Uploads in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Drawing Upload ID e.g. `85`
- `project_id`: integer - Unique identifier for the project. e.g. `2`
- `company_id`: integer - Unique identifier for the company. e.g. `3`
- `created_by_id`: integer - ID of creator e.g. `5`
- `created_at`: string(date-time) - Drawing Upload created at e.g. `2016-08-08T21:35:58Z`
- `updated_at`: string(date-time) - Drawing Upload updated at e.g. `2016-08-08T21:35:58Z`
- `error_email_sent`: boolean - Error email sent status e.g. `false`
- `notify_on_success`: boolean - Notify on success status e.g. `false`
- `deletion_in_progress`: boolean - Deletion in progress status e.g. `false`
- `success_email_sent`: boolean - Success email sent status e.g. `false`
- `drawing_area_id`: integer - Drawing Area ID e.g. `1`
- `status`: string enum[in_queue, in_progress, mechanical_turk, failed, ready_for_review, reviewed] e.g. `in_progress`
- `pre_adaptive_complete`: boolean - Pre adaptive complete status e.g. `false`
- `drawing_number_contains_revision`: boolean - Drawing number contains revision e.g. `false`
- `get_info_from_filename`: boolean - Get info from filename e.g. `false`
- `language`: string - Language for OCR e.g. `es`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/drawing_uploads  **[OLDER VERSION - a newer path version exists below/above]**

**Create drawing upload**
Create a new Drawing Upload in the specified project.
It creates one `DrawingUpload`, which includes a `DrawingLogImport` and a `ProstoreFile`
for each file uploaded. Sidekiq then sends them to the image processing server.
First, it will try to process `files` parameter, if is empty, it will use `upload_uuids`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `Idempotency-Token` [header] string - Unique idempotent token

Request body (multipart/form-data) (required):

- `files`: array of string - One or more files in PDF format to include in the upload. *To upload drawings you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `files[]` as...
- `upload_uuids`: array of string - Array of uploaded files UUIDs. *Required only if files is empty e.g. `["1ZE258W9K804SAJJZX19JVAB3R"]`
- `drawing_set_id`: integer (required) - Drawing Set ID e.g. `123456`
- `drawing_area_id`: integer - Drawing Area ID *Required only if Drawing Area is turned on e.g. `987654`
- `drawing_number_contains_revision`: boolean - Drawing number contains revision status e.g. `true`
- `drawing_date`: string(date) - Drawing date e.g. `2016-08-31`
- `received_date`: string(date) - Received date e.g. `2016-08-31`
- `get_info_from_filename`: boolean - Get info from filename e.g. `false`

Response 200 (application/json): object

- `id`: integer - Drawing Upload ID e.g. `85`
- `project_id`: integer - Unique identifier for the project. e.g. `2`
- `company_id`: integer - Unique identifier for the company. e.g. `3`
- `created_by_id`: integer - ID of creator e.g. `5`
- `created_at`: string(date-time) - Drawing Upload created at e.g. `2016-08-08T21:35:58Z`
- `updated_at`: string(date-time) - Drawing Upload updated at e.g. `2016-08-08T21:35:58Z`
- `error_email_sent`: boolean - Error email sent status e.g. `false`
- `notify_on_success`: boolean - Notify on success status e.g. `false`
- `deletion_in_progress`: boolean - Deletion in progress status e.g. `false`
- `success_email_sent`: boolean - Success email sent status e.g. `false`
- `drawing_area_id`: integer - Drawing Area ID e.g. `1`
- `status`: string enum[in_queue, in_progress, mechanical_turk, failed, ready_for_review, reviewed] e.g. `in_progress`
- `pre_adaptive_complete`: boolean - Pre adaptive complete status e.g. `false`
- `drawing_number_contains_revision`: boolean - Drawing number contains revision e.g. `false`
- `get_info_from_filename`: boolean - Get info from filename e.g. `false`
- `language`: string - Language for OCR e.g. `es`

Response 201 (application/json): object

- `id`: integer - Drawing Upload ID e.g. `85`
- `project_id`: integer - Unique identifier for the project. e.g. `2`
- `company_id`: integer - Unique identifier for the company. e.g. `3`
- `created_by_id`: integer - ID of creator e.g. `5`
- `created_at`: string(date-time) - Drawing Upload created at e.g. `2016-08-08T21:35:58Z`
- `updated_at`: string(date-time) - Drawing Upload updated at e.g. `2016-08-08T21:35:58Z`
- `error_email_sent`: boolean - Error email sent status e.g. `false`
- `notify_on_success`: boolean - Notify on success status e.g. `false`
- `deletion_in_progress`: boolean - Deletion in progress status e.g. `false`
- `success_email_sent`: boolean - Success email sent status e.g. `false`
- `drawing_area_id`: integer - Drawing Area ID e.g. `1`
- `status`: string enum[in_queue, in_progress, mechanical_turk, failed, ready_for_review, reviewed] e.g. `in_progress`
- `pre_adaptive_complete`: boolean - Pre adaptive complete status e.g. `false`
- `drawing_number_contains_revision`: boolean - Drawing number contains revision e.g. `false`
- `get_info_from_filename`: boolean - Get info from filename e.g. `false`
- `language`: string - Language for OCR e.g. `es`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/drawing_uploads/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Delete drawing upload**
Delete an unreviewed Drawing Upload.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the drawing upload

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

