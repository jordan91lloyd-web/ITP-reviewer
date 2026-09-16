# Procore API: Specifications (Project Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Specifications)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Specification Area Transfers](#specification-area-transfers) - versions 2.0
- [Specification Areas](#specification-areas) - versions 2.1
- [Specification Section Divisions](#specification-section-divisions) - versions 2.1, 2.0, 1.0
- [Specification Section Revision Emails](#specification-section-revision-emails) - versions 1.0
- [Specification Section Revisions](#specification-section-revisions) - versions 2.1, 2.0, 1.0
- [Specification Section Terms](#specification-section-terms) - versions 1.1, 1.0
- [Specification Sections](#specification-sections) - versions 2.1, 2.0, 1.0
- [Specification Sets](#specification-sets) - versions 2.0, 1.0
- [Specification Uploads](#specification-uploads) - versions 2.0, 1.0
- [Specifications Configuration](#specifications-configuration) - versions 2.1, 2.0
- [Specifications User Permissions](#specifications-user-permissions) - versions 2.0

## Specification Area Transfers

Resource id: `specification-area-transfers`. Raw spec: `../openapi-raw/specification-area-transfers.json`. Web: https://developers.procore.com/reference/rest/specification-area-transfers?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/specification_area_transfers/{specification_area_transfer_id}

**Delete Specification Area Transfer**
Delete an existing Specification Area Transfer in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `specification_area_transfer_id` [path] string (required) - Unique identifier for the specification area transfer.
- `specification_area_id` [query] string (required) - ID of the destination specification area for the unreviewed transfer.

Response 200: OK (no body)

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Specification Areas

Resource id: `specification-areas`. Raw spec: `../openapi-raw/specification-areas.json`. Web: https://developers.procore.com/reference/rest/specification-areas?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_areas

**List Specification Areas for a Project**
This endpoint returns a paginated list of Specification Areas for a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - List of Specification Areas for the Project
  - `id`: string - Specification Area ID e.g. `123`
  - `created_at`: string(date-time) - Date and time when the Specification Area was created e.g. `2020-01-01T00:00:00Z`
  - `description`: string - Specification Area Description as free form text e.g. `Area 01 represents the first floor of the building`
  - `divisions_count`: integer - Number of unique Specification Section Divisions of Specification Sections in the Specification Area e.g. `2`
  - `name`: string - Name of Specification Area e.g. `Area 01`
  - `sections_count`: integer - Number of Specification Sections in the Specification Area e.g. `5`
  - `updated_at`: string(date-time) - Date and time when the Specification Area was last updated e.g. `2020-01-01T00:00:00Z`

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_areas

**Create Specification Area**
Creates a new Specification Area in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `specification_area`: object (required)
  - `name`: string (required) - Name of the Specification Area e.g. `Building A - Ground Floor`
  - `description`: string - Description of the Specification Area e.g. `Ground floor specifications for Building A including all structural, mechanic...`

Response 201 (application/json): object

- `data`: object - Created Specification Area
  - `id`: string - Specification Area ID e.g. `123`
  - `created_at`: string(date-time) - Date and time when the Specification Area was created e.g. `2020-01-01T00:00:00Z`
  - `description`: string - Specification Area Description e.g. `Ground floor specifications for Building A including all structural, mechanic...`
  - `divisions_count`: integer - Number of unique Specification Section Divisions e.g. `0`
  - `name`: string - Name of Specification Area e.g. `Building A - Ground Floor`
  - `sections_count`: integer - Number of Specification Sections in the Specification Area e.g. `0`
  - `updated_at`: string(date-time) - Date and time when the Specification Area was last updated e.g. `2020-01-01T00:00:00Z`

Error responses: 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PUT /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_areas/{specification_area_id}

**Update Specification Area**
Updates an existing Specification Area in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `specification_area_id` [path] string (required) - Unique identifier for the specification area.

Request body (application/json) (required):

- `specification_area`: object (required)
  - `name`: string - Name of the Specification Area e.g. `Building A - Ground Floor (Updated)`
  - `description`: string - Description of the Specification Area e.g. `Updated ground floor specifications for Building A including all structural, ...`

Response 200 (application/json): object

- `data`: object - Updated Specification Area
  - `id`: string - Specification Area ID e.g. `123`
  - `created_at`: string(date-time) - Date and time when the Specification Area was created e.g. `2020-01-01T00:00:00Z`
  - `description`: string - Specification Area Description e.g. `Updated ground floor specifications for Building A including all structural, ...`
  - `divisions_count`: integer - Number of unique Specification Section Divisions e.g. `2`
  - `name`: string - Name of Specification Area e.g. `Building A - Ground Floor (Updated)`
  - `sections_count`: integer - Number of Specification Sections in the Specification Area e.g. `5`
  - `updated_at`: string(date-time) - Date and time when the Specification Area was last updated e.g. `2020-01-01T00:01:00Z`

Error responses: 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_areas/{specification_area_id}

**Delete Specification Area**
Delete an existing Specification Area in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `specification_area_id` [path] string (required) - Unique identifier for the specification area.

Response 200: OK (no body)

Error responses: 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Specification Section Divisions

Resource id: `specification-section-divisions`. Raw spec: `../openapi-raw/specification-section-divisions.json`. Web: https://developers.procore.com/reference/rest/specification-section-divisions?version=latest
Product lines: PM Essentials, PM Starter Pack

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_section_divisions

**List Specification Section Divisions**
Returns a paginated list of Specification Section Divisions for a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `specification_area_id` [query] string - Unique identifier for the specification area.
- `id` [query] string - Filter by specification section division ID.
- `search_string` [query] string - Search string to filter divisions by number or description (case-insensitive).
- `specification_set_ids` [query] array of string - Array of specification set IDs to filter divisions by. Use 'none' in the array to include divisions with sections that have no specification set.
- `with_sections` [query] string enum[true, false] - When set to 'true', returns only divisions that contain at least one non-obsolete specification section.
- `view` [query] string enum[default, api_v21, with_sections] - Blueprint view to render when `no_filter` is provided.
- `no_filter` [query] boolean - When present, returns all divisions without section-based filtering.

Response 200 (application/json): object

- `data`: array of object - List of specification section divisions
  - `id`: string - Unique identifier of the specification section division. e.g. `12`
  - `number`: string - Division number used to group specification sections. e.g. `00`
  - `description`: string - Name of the construction division. e.g. `Procurement and Contracting Requirements`
  - `deletable`: boolean - Indicates if the division can be deleted e.g. `true`
  - `sections_ids`: array of integer - IDs of the specification sections that belong to this division. e.g. `[5, 6, 12]`
  - `specification_section_revision_ids`: array of integer - IDs of the specification section revisions within this division. e.g. `[1, 2, 3]`

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_section_divisions

**Create a Specification Section Division**
This endpoint creates a specification section division.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `specification_section_division`: object (required)
  - `number`: string (required) - Division number.
  - `description`: string (required) - Division description.

Response 200 (application/json): object

- `data`: array of object - List of specification section divisions
  - `id`: string - Unique identifier of the specification section division. e.g. `209260`
  - `description`: string - Name of the construction division. e.g. `Mechanical`
  - `number`: string - Division number used to group specification sections. e.g. `15`

Error responses: 400, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_section_divisions

**Update Specification Section Divisions**
Bulk creates, updates, and deletes Specification Section Divisions for a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `creation_params`: array of object
  - `id`: string - Optional client-supplied identifier used to correlate validation errors.
  - `number`: string
  - `description`: string
- `updation_params`: array of object
  - `id`: string (required)
  - `number`: string
  - `description`: string
- `deletion_params`: array of object
  - `id`: string (required)

Response 200 (application/json): object

- `data`: array of object - List of specification section divisions
  - `id`: string - Unique identifier of the specification section division. e.g. `12`
  - `number`: string - Division number used to group specification sections. e.g. `00`
  - `description`: string - Name of the construction division. e.g. `Procurement and Contracting Requirements`
  - `deletable`: boolean - Indicates if the division can be deleted e.g. `true`
  - `sections_ids`: array of integer - IDs of the specification sections that belong to this division. e.g. `[5, 6, 12]`
  - `specification_section_revision_ids`: array of integer - IDs of the specification section revisions within this division. e.g. `[1, 2, 3]`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/specification_section_divisions

**List Specification Section Divisions for a Project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer e.g. `209260`
- `number`: string e.g. `15`
- `description`: string e.g. `Mechanical`
- `url`: string - Address of a PDF file containing the PDFs for all of the SpecificationSections in this division, concatenated into one.

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/specification_section_divisions

**Create Specification Section Division for a Project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer - Unique identifier for the project.

Request body (application/json):

- `specification_section_division`: object (required)
  - `number`: string (required) e.g. `15`
  - `description`: string (required) e.g. `Mechanical`

Response 201 (application/json): object

- `id`: integer e.g. `209260`
- `number`: string e.g. `15`
- `description`: string e.g. `Mechanical`
- `url`: string - Address of a PDF file containing the PDFs for all of the SpecificationSections in this division, concatenated into one.

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/specification_section_divisions  **[OLDER VERSION - a newer path version exists below/above]**

**List Specification Sections Divisions**
This endpoint returns a paginated list of Specification Sections Division for a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `specification_area_id` [query] string - Unique identifier for the specification area.

Response 200 (application/json): object

- `data`: array of object - List of specification section divisions
  - `id`: string - Unique identifier of the specification section division. e.g. `209260`
  - `description`: string - Name of the construction division. e.g. `Mechanical`
  - `number`: string - Division number used to group specification sections. e.g. `15`

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Specification Section Revision Emails

Resource id: `specification-section-revision-emails`. Raw spec: `../openapi-raw/specification-section-revision-emails.json`. Web: https://developers.procore.com/reference/rest/specification-section-revision-emails?version=latest
Product lines: PM Starter Pack, PM Essentials, Total Quality and Safety Management

### POST /rest/v1.0/projects/{project_id}/specification_section_revision_emails/{id}/send_email

**Send email**
Sends an email with an associated Specification Section Revision. The text of the
email and recipients are specified in the request body.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Specification Section Revision to email

Request body (application/json) (required):

- `subject`: string - Subject of Email e.g. `Subject`
- `body`: string - Body of email e.g. `Body`
- `distribution_ids`: array of integer (required)
- `cc_distribution_ids`: array of integer
- `bcc_distribution_ids`: array of integer

Response 204: No Content (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Specification Section Revisions

Resource id: `specification-section-revisions`. Raw spec: `../openapi-raw/specification-section-revisions.json`. Web: https://developers.procore.com/reference/rest/specification-section-revisions?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_section_revisions

**List Specification Sections Revisions for a Project**
This endpoint returns a paginated list of Specification Sections Revisions for a Project. This version (2.1) uses improved pagination with a default of 100 items per page and a maximum of 1000 items per page.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `search_string` [query] string - Search string to filter specification sections
- `filter_division_id` [query] string - Filter by specification section division ID
- `with_prostore_url` [query] boolean - When true, includes a `prostore_url` field on each nested `specification_section_revisions` entry containing the download URL for the associated Procore Store document file. Null when the revision has no associated file.

Response 200 (application/json): object

- `data`: object
  - `divisions`: array of object - Array of specification section divisions with their associated sections, sets, and revisions
    - `data`: array of object - Array of specification sections with their associated sets, and revisions

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_section_revisions/{id}/change_history

**Change History of Specification Section Revision**
This endpoint returns the change history of a specification section revision.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Unique identifier for the specification section revision.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[created_at] - Sort by `created_at` ascending when provided; otherwise results are newest first.

Response 200 (application/json): object

- `data`: object
  - `message`: string - The message of the change history e.g. `Change history sent successfully`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_section_revisions/create_zip_download

**Download zip of Specification Section Revisions**
This endpoint sends an url to download zip of a collection of specification section revisions.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `specification_section_revision_ids`: array of string (required)
- `has_public_markup`: boolean - Optional flag. When true, the API attempts to generate and include a merged public-markup PDF download in the resulting email flow. When false or omitted, only the standard merged PDF flow is used.

Response 200 (application/json): object

- `data`: object
  - `url`: string - the url of zip created for revisions e.g. `https://example.com/download.zip`

Error responses: 400 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_section_revisions/single_pdf_download

**Download single pdf of Specification Section Revisions**
This endpoint sends an email with a single pdf for collection of specification section revisions.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `specification_section_revision_ids`: array of string (required)

Response 200 (application/json): object

- `data`: object
  - `message`: string - success message e.g. `Your download is being generated. It will be emailed to you when it is ready.`

Error responses: 400, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_section_revisions/{id}/download_log

**Download Log of Specification Section Revision**
This endpoint returns the download log of a specification section revision. Access is granted to Admin users and to non-admin users who have the `can_view_download_log` granular permission.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Unique identifier for the specification section revision.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - Download ID e.g. `12345`
  - `download_method`: string - Download method info e.g. `via Procore`
  - `downloaded_by`: object
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User Name e.g. `Test User`
    - `login`: string - User login information e.g. `testuser@example.com`
  - `created_at`: string - Download datetime e.g. `2025-07-17T07:13:47Z`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_section_revisions/{id}

**Show Specification Section Revision**
This endpoint returns the specification section revision.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Unique identifier for the specification section revision.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: object
  - `selected_revision`: object - The selected revision of the specification section
    - `id`: string - The unique identifier of the selected revision e.g. `347`
    - `division`: object - Represents a construction division, which is used to group specification sections. Each SpecificationSectionDivision can contain many SpecificationSections.
    - `issued_date`: string(date) - The date when the SpecificationRevision was issued by the architect e.g. `2023-09-06`
    - `received_date`: string(date) - The date when the SpecificationRevision was received by the project e.g. `2018-11-15`
    - `revision`: string(4) - The revision number of the SpecificationSectionRevision
    - `number`: string e.g. `01`
    - `description`: string e.g. `General Requirements`
    - `set`: object
    - `specification_section_id`: string e.g. `100120`
    - `updated_at`: string - Updated at e.g. `2017-08-24T22:12:22Z`
    - `specification_area_id`: string e.g. `100120`
    - `specification_area_name`: string - Name of the associated specification area. `null` when the specification section does not belong to an area. e.g. `Area A`
    - `long_description`: string - Human-readable section label in the format `<number> - <description>`. e.g. `01 11 13 - Summary of Work`
    - `url`: string e.g. `https://pz01-procore-512b1432.na-east-01-tugboat.procoretech-qa.com/fas/api/v...`
    - `viewable_document_id`: string e.g. `100120`
    - `section_obsolete`: boolean e.g. `false`
    - `size`: integer(int64) - Size in bytes of the associated prostore_file. `null` if the revision has no associated prostore_file. e.g. `1048576`
    - `content_type`: string - MIME content type of the associated prostore_file. `null` if the revision has no associated prostore_file. e.g. `application/pdf`
    - `s3_key`: string - S3 object key for the associated prostore_file. `null` if the revision has no associated prostore_file. e.g. `a1b2c3d4-e5f6-7890-abcd-1234567890ef`
    - `confirmed_by`: object - The user who confirmed the specification section revision
  - `all_revisions`: array of object - All revisions of the specification section
    - `id`: string e.g. `347`
    - `issued_date`: string(date) - The date when the SpecificationRevision was issued by the architect e.g. `2023-09-06`
    - `received_date`: string(date) - The date when the SpecificationRevision was received by the project e.g. `2018-11-15`
    - `revision`: string(4) - The revision number of the SpecificationSectionRevision
    - `set`: object
    - `specification_section_id`: string e.g. `100120`
    - `updated_at`: string - Updated at e.g. `2017-08-24T22:12:22Z`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PUT /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_section_revisions/{id}

**Update Specification Section Revision**
Updates a specification section revision. The request body must include `specification_section`
and `specification_section_revision` objects (see schema).
**HTTP methods:** Both `PUT` and `PATCH` are supported with the same request body.
**Success:** Returns `200 OK` with the updated revision.
**Validation errors:** Returns `422 Unprocessable Entity` when attribute validation fails
(for example duplicate number and description, invalid division or specification set, or invalid
revision). The response uses `error.code` `UNPROCESSABLE_ENTITY`, a summary `error.message`,
and `error.details` with `reason_code` `VALIDATION_ERROR` and a `failures` object whose keys are
API field names and whose values are arrays of validation message strings.
**Not found:** Returns `404 Not Found` when the specification section revision id does not exist
for the project—not for validation failures on the payload.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Unique identifier for the specification section revision.

Request body (application/json) (required):

- `specification_section`: object - The description of the specification section
  - `description`: string - The description of the specification section e.g. `PAYMENT PROCEDURES testing`
  - `number`: string - The number of the specification section e.g. `012900`
  - `specification_section_division_id`: string - The specification section division id of the specification section e.g. `20`
  - `obsolete`: boolean - The obsolete status of the specification section e.g. `false`
- `specification_section_revision`: object
  - `issued_date`: string - The issued date of the specification section revision e.g. `2022-12-01`
  - `received_date`: string - The received date of the specification section revision e.g. `2022-12-01`
  - `revision`: string - The revision of the specification section revision e.g. `1000`

Response 200 (application/json): object

- `data`: array of object - List of specification section revisions
  - `id`: string - Unique identifier of the specification section revision. e.g. `347`
  - `description`: string - The description of this revision's SpecificationSection e.g. `CONTRACT MODIFICATION PROCEDURES`
  - `division`: object - Represents a construction division, which is used to group specification sections. Each SpecificationSectionDivision can contain many SpecificationSections.
    - `id`: string e.g. `4`
    - `description`: string e.g. `General Requirements`
    - `number`: string e.g. `01`
  - `issued_date`: string(date) - The date when the SpecificationRevision was issued by the architect e.g. `2023-09-06`
  - `number`: string - The number of this revision's SpecificationSection e.g. `012600`
  - `received_date`: string(date) - The date when the SpecificationRevision was received by the project e.g. `2018-11-15`
  - `revision`: string(4) - The revision number of the SpecificationSectionRevision
  - `set`: object
    - `id`: string e.g. `8`
    - `name`: string e.g. `Test Spec Set`
  - `specification_area_id`: string - ID of the specification area the section belongs to. e.g. `100120`
  - `specification_section_id`: string - ID of the specification section this revision belongs to. e.g. `100120`
  - `updated_at`: string - Updated at e.g. `2017-08-24T22:12:22Z`
  - `url`: string - Address of SpecificationRevision PDF. This can be blank if the Specification Section was created manually without an upload, and no revisions have been uploaded yet.
  - `created_at`: string(date-time) - Timestamp when the specification section revision was created. e.g. `2017-08-24T22:12:22Z`

Error responses: 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_section_revisions/{id}

**Destroy Specification Section Revision**
This endpoint destroys a specification section revision.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Unique identifier for the specification section revision.

Response 200 (application/json): object

- `data`: object
  - `message`: string - Message indicating the successful deletion of the specification section revision e.g. `Specification section revision deleted successfully`
  - `current_revision_id`: string - ID of the current revision of the specification section e.g. `12345`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_section_revisions/{id}/download

**Download Specification Section Revision**
This endpoint returns the specification section revision download.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Unique identifier for the specification section revision.

Response 200 (application/json): object

- `data`: object - Specification section revision download
  - `download_url`: string - URL of the specification section revision download e.g. `https://s3.amazonaws.com/pro-core.com/prostore/specification_section_revision...`
  - `message`: string - Message of the specification section revision download e.g. `PDFs downloaded`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_section_revisions/{id}/header_info

**Header info for Specification Section Revision**
This endpoint returns the header info of a specification section revision.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Unique identifier for the specification section revision.

Response 200 (application/json): object

- `data`: object
  - `id`: string - Specification Section Revision ID e.g. `12345`
  - `description`: string - Specification Section Revision Description e.g. `Default Section`
  - `issued_date`: string - Issued date of the Specification Section Revision e.g. `2025-10-15`
  - `number`: string - Specification Section Revision Number e.g. `0009`
  - `revision`: string - Specification Section Revision e.g. `2`
  - `specification_area`: object
    - `id`: string - Specification Area ID e.g. `1`
    - `name`: string - Specification Area Name e.g. `Area 01`
  - `tab_counts`: object
    - `download_log`: integer - Count of download log entries e.g. `2`
    - `revision_related_items`: integer - Count of related items for specification section revision e.g. `1`
    - `section_related_items`: integer - Count of related items for specification section e.g. `1`
    - `change_history`: integer - Count of change history entries e.g. `7`
    - `emails`: integer - Count of emails e.g. `1`
  - `specification_by_area_enabled`: boolean - Indicates if specification by area is enabled e.g. `true`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_section_revisions/bulk_update

**Bulk Update Specification Section Revisions**
This endpoint bulk updates specification section revisions.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `id`: string (required) - Specification Section Revision ID e.g. `2485`
- `issued_date`: string - The issued date of the Specification Section Revision e.g. `2025-10-16T18:30:00.000Z`
- `received_date`: string - The received date of the Specification Section Revision e.g. `2025-10-16T18:30:00.000Z`
- `specification_set_id`: string - ID of the Specification Set e.g. `3047`
- `revision`: string - Revision number of the Specification Section Revision e.g. `2`

Response 200 (application/json): object

- `data`: object
  - `message`: string - Message indicating the result of the bulk update e.g. `Bulk update successful`
  - `results`: array of object - List of the bulk updated Specification Section Revision statuses
    - `id`: string - ID of the Specification Section Revision e.g. `2485`
    - `status`: string - Status of the update operation for this revision e.g. `success`

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/specification_section_revisions

**List Specification Section Revisions for a Specification Section Division**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `specification_section_division_id` [query] integer (required)
- `all_revisions` [query] string - By default, only current specification section revisions are returned. Set this parameter to "true" to return all specification section revisions.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer e.g. `209260`
- `specification_section_id`: integer e.g. `100120`
- `specification_section_division_id`: integer - Id of the Section Division
- `specification_set_id`: integer - Id of the Set e.g. `42`
- `number`: string - The number of this revision's SpecificationSection e.g. `15`
- `description`: string - The description of this revision's SpecificationSection e.g. `Mechanical`
- `url`: string - Address of SpecificationRevision PDF. This can be blank if the Specification Section was created manually without an upload, and no revisions have been uploaded yet.
- `revision`: string - The revision number
- `issued_date`: string(date) - The date when the SpecificationRevision was issued by the architect
- `received_date`: string(date) - The date when the SpecificationRevision was received by the project
- `updated_at`: string - Updated at e.g. `2017-08-24T22:12:22Z`
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

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_areas/{specification_area_id}/specification_section_revisions  **[OLDER VERSION - a newer path version exists below/above]**

**List Specification Sections Revisions for a Project**
This endpoint returns a paginated list of Specification Sections Revisions for a Project. This version (2.1) uses improved pagination with a default of 100 items per page and a maximum of 1000 items per page.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `specification_area_id` [path] string (required) - Unique identifier for the specification area.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `search_string` [query] string - Search string to filter specification sections
- `filter_division_id` [query] string - Filter by specification section division ID
- `with_prostore_url` [query] boolean - When true, includes a `prostore_url` field on each nested `specification_section_revisions` entry containing the download URL for the associated Procore Store document file. Null when the revision has no associated file.

Response 200 (application/json): object

- `data`: object
  - `divisions`: array of object - Array of specification sections with their sets, and revisions
    - `data`: array of object - Array of specification sections with their associated sets, and revisions

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/specification_section_revisions  **[OLDER VERSION - a newer path version exists below/above]**

**List Specification Sections Revisions for a Project**
This endpoint returns a paginated list of Specification Sections Revisions for a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `specification_area_id` [query] string - Unique identifier for the specification area.

Response 200 (application/json): object

- `data`: array of object - List of specification section revisions
  - `id`: string - Unique identifier of the specification section revision. e.g. `347`
  - `description`: string - The description of this revision's SpecificationSection e.g. `CONTRACT MODIFICATION PROCEDURES`
  - `division`: object - Represents a construction division, which is used to group specification sections. Each SpecificationSectionDivision can contain many SpecificationSections.
    - `id`: string e.g. `4`
    - `description`: string e.g. `General Requirements`
    - `number`: string e.g. `01`
  - `issued_date`: string(date) - The date when the SpecificationRevision was issued by the architect e.g. `2023-09-06`
  - `number`: string - The number of this revision's SpecificationSection e.g. `012600`
  - `received_date`: string(date) - The date when the SpecificationRevision was received by the project e.g. `2018-11-15`
  - `revision`: string(4) - The revision number of the SpecificationSectionRevision
  - `set`: object
    - `id`: string e.g. `8`
    - `name`: string e.g. `Test Spec Set`
  - `specification_area_id`: string - ID of the specification area the section belongs to. e.g. `100120`
  - `specification_section_id`: string - ID of the specification section this revision belongs to. e.g. `100120`
  - `updated_at`: string - Updated at e.g. `2017-08-24T22:12:22Z`
  - `url`: string - Address of SpecificationRevision PDF. This can be blank if the Specification Section was created manually without an upload, and no revisions have been uploaded yet.
  - `created_at`: string(date-time) - Timestamp when the specification section revision was created. e.g. `2017-08-24T22:12:22Z`

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/specification_section_revisions/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Show Specification Section Revision**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Specification section revision ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer e.g. `209260`
- `source_id`: integer e.g. `3535`
- `name`: string e.g. `ABC`
- `section_id`: integer e.g. `42`
- `section_name`: string e.g. `Scope of Bids`
- `source_create_time`: string(date-time) e.g. `2019-10-01T00:00:00Z`
- `source_update_time`: string(date-time) e.g. `2019-10-02T00:00:00Z`
- `url`: string e.g. `https://storage.procore.com/123.pdf`
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

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Specification Section Terms

Resource id: `specification-section-terms`. Raw spec: `../openapi-raw/specification-section-terms.json`. Web: https://developers.procore.com/reference/rest/specification-section-terms?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.1/projects/{project_id}/specification_section_terms

**List specification section terms**
Returns extracted text terms and page numbers for a collection of Specification Sections.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `specification_section_ids` [query] array of integer - Specification Sections to fetch extracted terms for. Limited to 100 sections per call; clients should paginate larger collections.

Response 200 (application/json): array of object

- `specification_section_id`: integer - Specification Section ID e.g. `123`
- `updated_at`: string(date-time) - Specification Section terms updated at e.g. `2025-11-12T12:00:00Z`
- `terms`: array of object - Array of searchable pages with extracted text e.g. `[{"page_number": 1, "text": "Introduction to project specifications"}, {"page...`
  - `page_number`: integer - Page number e.g. `1`
  - `text`: string - Extracted text from the page e.g. `This is sample text extracted from the specification page.`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/specification_section_terms  **[OLDER VERSION - a newer path version exists below/above]**

**List specification section terms**
Returns extracted text terms and page numbers for a collection of Specification Sections.
Specification Sections which do not have any recorded term data will be omitted from the response.
An empty term collection for a specification section indicates that the section has been processed, but that
no terms were found.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `specification_section_ids` [query] array of integer - Specification Sections to fetch extracted terms for. Limited to 100 sections per call; clients should paginate larger collections.

Response 200 (application/json): array of object

- `specification_section_id`: integer - Specification Section ID e.g. `123`
- `updated_at`: string(date-time) - Specification Section terms updated at e.g. `2025-11-12T12:00:00Z`
- `terms`: array of object - Array of searchable pages with extracted text e.g. `[{"page_number": 1, "text": "Introduction to project specifications"}, {"page...`
  - `page_number`: integer - Page number e.g. `1`
  - `text`: string - Extracted text from the page e.g. `This is sample text extracted from the specification page.`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Specification Sections

Resource id: `specification-sections`. Raw spec: `../openapi-raw/specification-sections.json`. Web: https://developers.procore.com/reference/rest/specification-sections?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_areas/{specification_area_id}/specification_sections

**List Specification Sections for a Project**
This endpoint returns a paginated list of Specification Sections for a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `specification_area_id` [path] string (required) - Unique identifier for the specification area.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filter_set_id` [query] string - Filter by specification set ID. Use `none` for sections without a set.
- `filter_division_id` [query] string - Filter by a single specification section division ID.
- `search_string` [query] string - Search string to filter sections by number, description, division, set, or revision.
- `filters[division_ids]` [query] array of string - List of Unique identifier for the specification division(s).
- `exclude_ids` [query] array of string - Exclude records by ids from the response
- `viewable_document_id_required` [query] boolean - When `true`, only return sections whose current revision has a viewable document (i.e. `viewable_document_id` is populated). Defaults to `false`, which returns sections regardless.

Response 200 (application/json): object

- `data`: array of object - List of specifications sections for current project
  - `id`: string - Specification Section ID e.g. `123`
  - `current_revision_id`: string - Id of the Section Revision e.g. `396`
  - `description`: string - Specification Section Description as free form text e.g. `Section 01 represents the first floor of the building`
  - `number`: string - Number of Specification Section e.g. `08 45 11`
  - `specification_area_id`: string - Id of the Section Area e.g. `4`
  - `specification_section_division_id`: string - Id of the Section Division e.g. `54`
  - `created_at`: string(date-time) - Timestamp when the specification section was created. e.g. `2017-08-24T22:12:22Z`

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_sections

**List Specification Sections for a Project**
This endpoint returns a paginated list of Specification Sections for a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `specification_area_id` [query] string - Unique identifier for the specification area.
- `filter_set_id` [query] string - Filter by specification set ID. Use `none` for sections without a set.
- `filter_division_id` [query] string - Filter by a single specification section division ID.
- `search_string` [query] string - Search string to filter sections by number, description, division, set, or revision.
- `filters[division_ids]` [query] array of string - List of Unique identifier for the specification division(s).
- `viewable_document_id_required` [query] boolean - When `true`, only return sections whose current revision has a viewable document (i.e. `viewable_document_id` is populated). Defaults to `false`, which returns sections regardless.

Response 200 (application/json): object

- `data`: array of object - List of specification section revisions
  - `id`: string - Unique identifier of the specification section revision. e.g. `347`
  - `description`: string - The description of this revision's SpecificationSection e.g. `CONTRACT MODIFICATION PROCEDURES`
  - `division`: object - Represents a construction division, which is used to group specification sections. Each SpecificationSectionDivision can contain many SpecificationSections.
    - `id`: string e.g. `4`
    - `description`: string e.g. `General Requirements`
    - `number`: string e.g. `01`
  - `issued_date`: string(date) - The date when the SpecificationRevision was issued by the architect e.g. `2023-09-06`
  - `number`: string - The number of this revision's SpecificationSection e.g. `012600`
  - `received_date`: string(date) - The date when the SpecificationRevision was received by the project e.g. `2018-11-15`
  - `revision`: string(4) - The revision number of the SpecificationSectionRevision
  - `set`: object
    - `id`: string e.g. `8`
    - `name`: string e.g. `Test Spec Set`
  - `specification_area_id`: string - ID of the specification area the section belongs to. e.g. `100120`
  - `specification_section_id`: string - ID of the specification section this revision belongs to. e.g. `100120`
  - `updated_at`: string - Updated at e.g. `2017-08-24T22:12:22Z`
  - `url`: string - Address of SpecificationRevision PDF. This can be blank if the Specification Section was created manually without an upload, and no revisions have been uploaded yet.
  - `created_at`: string(date-time) - Timestamp when the specification section revision was created. e.g. `2017-08-24T22:12:22Z`

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_sections

**Create a Specification Section**
This endpoint creates a specification section.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `specification_area_id`: string - Required when Specifications by Area is enabled.
- `specification_section`: object (required)
  - `number`: string (required) - Section number identifier.
  - `description`: string (required) - Human-readable description of the specification section.
  - `specification_section_division_id`: string (required) - ID of the specification section division this section belongs to.

Response 200 (application/json): object

- `data`: array of object - List of specification section revisions
  - `id`: string - Unique identifier of the specification section revision. e.g. `347`
  - `description`: string - The description of this revision's SpecificationSection e.g. `CONTRACT MODIFICATION PROCEDURES`
  - `division`: object - Represents a construction division, which is used to group specification sections. Each SpecificationSectionDivision can contain many SpecificationSections.
    - `id`: string e.g. `4`
    - `description`: string e.g. `General Requirements`
    - `number`: string e.g. `01`
  - `issued_date`: string(date) - The date when the SpecificationRevision was issued by the architect e.g. `2023-09-06`
  - `number`: string - The number of this revision's SpecificationSection e.g. `012600`
  - `received_date`: string(date) - The date when the SpecificationRevision was received by the project e.g. `2018-11-15`
  - `revision`: string(4) - The revision number of the SpecificationSectionRevision
  - `set`: object
    - `id`: string e.g. `8`
    - `name`: string e.g. `Test Spec Set`
  - `specification_area_id`: string - ID of the specification area the section belongs to. e.g. `100120`
  - `specification_section_id`: string - ID of the specification section this revision belongs to. e.g. `100120`
  - `updated_at`: string - Updated at e.g. `2017-08-24T22:12:22Z`
  - `url`: string - Address of SpecificationRevision PDF. This can be blank if the Specification Section was created manually without an upload, and no revisions have been uploaded yet.
  - `created_at`: string(date-time) - Timestamp when the specification section revision was created. e.g. `2017-08-24T22:12:22Z`

Error responses: 400, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_sections/client_configs

**Get Client Configuration for Specification Sections**
This endpoint returns client configuration for the specification sections tool.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Response 200 (application/json): object

- `data`: object
  - `procore`: object
    - `environment`: object
    - `entitlements`: object

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_sections/flags_and_permissions

**Get Permissions and Feature Flags for Specification Sections**
This endpoint returns permissions and feature flags for the specification sections tool.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Response 200 (application/json): object

- `data`: object
  - `permissions`: object
    - `canUseDocumentsTool`: boolean - Whether user can use documents tool
    - `canSeeDocusign`: boolean - Whether user can see DocuSign integration
    - `canUploadSpecifications`: boolean - Whether user can upload specifications
    - `canCreateSpecifications`: boolean - Whether user can create specifications
    - `canShowUploads`: boolean - Whether user can show specification uploads
    - `canDeletePendingSpecificationUploads`: boolean - Whether user can delete pending specification uploads
    - `canReviewSpecifications`: boolean - Whether user can review uploaded specifications
    - `canOpenCurrentSpecBook`: boolean - Whether user can open current spec book
    - `hasDownloadAccess`: boolean - Whether user has download access
    - `canForwardViaEmail`: boolean - Whether user can forward via email
    - `canEditSpecifications`: boolean - Whether user can edit specifications
    - `canDeleteSpecifications`: boolean - Whether user can delete specifications
    - `canViewSubmittalDraftRequests`: boolean - Whether user can view submittal draft requests
    - `canCreateSubmittal`: boolean - Whether user can create submittal
    - `canManuallyCreateDivisions`: boolean - Whether user can manually create divisions
    - `canCreateSpecificationSets`: boolean - Whether user can create specification sets
    - `canManuallyCreateSpecSections`: boolean - Whether user can manually create specification sections
    - `isAdmin`: boolean - Whether user is admin
    - `canConfigureSpecifications`: boolean - Whether user can access the Specifications configuration page
    - `canDownloadSpecifications`: boolean - Whether user can download specifications
    - `canViewDownloadLog`: boolean - Whether user can view specification revision download logs
    - `canViewDeletedSpecifications`: boolean - Whether user can view deleted specifications
    - `canEditRelatedItem`: boolean - Whether user can edit related items
    - `canViewChangeHistory`: boolean - Whether user can view specification change history
  - `feature_flags`: object
    - `cfsEnabled`: boolean - Whether CFS is enabled
    - `centrifugoEnabled`: boolean - Whether Centrifugo is enabled
    - `dwfProcessingEnabled`: boolean - Whether DWF processing is enabled
    - `submittalsFromSpecsMfeEnabled`: boolean - Whether submittals from specs MFE is enabled
    - `customFieldsSpecificationSectionRevisionEnabled`: boolean - Whether custom fields for specification section revision is enabled
    - `specificationsBulkDownloadModalEnabled`: boolean - Whether bulk download modal is enabled
    - `specificationsMfeEnabled`: boolean - Whether the Specifications MFE is enabled
    - `specificationsSettingsMfeEnabled`: boolean - Whether the Specifications settings MFE is enabled
    - `specificationsLandingMfeEnabled`: boolean - Whether the Specifications landing MFE is enabled
    - `specificationsAllRevisionsMfeEnabled`: boolean - Whether the Specifications all revisions MFE is enabled
    - `specificationsRecycleBinMfeEnabled`: boolean - Whether the Specifications recycle bin MFE is enabled
    - `specificationsAreaMfeEnabled`: boolean - Whether the Specifications area MFE is enabled
    - `specificationsMfeInfoPageEnabled`: boolean - Whether the Specifications info page MFE is enabled
    - `specificationsAreaTransferRedirectEnabled`: boolean - Whether specification area transfer redirects are enabled
    - `specExpAdvancedOpts`: boolean - Whether the experimental Upload Specification advanced options (e.g., Project Title field) are enabled. Sourced from the LaunchDarkly flag `spec_exp_advanced_opts`.

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_sections/divisions_and_sets

**Get divisions and sets options for specification sections for a Project**
This endpoint returns divisions and sets options for specification sections for a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: object - Divisions and sets options for specification sections for current project
  - `division_options`: object - Divisions options
    - `all_divisions`: array of object
    - `selected_division`: object - Selected division
  - `sets_options`: object - Sets options
    - `all_sets`: array of object
    - `selected_set`: object - Selected set

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_sections/unreviewed_uploads

**Get unreviewed uploads for specification sections for a Project**
This endpoint returns unreviewed uploads for specification sections for a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Response 200 (application/json): object

- `data`: object - Unreviewed uploads for specification sections for current project
  - `uploads`: array of object
    - `created_at`: string - Unreviewed upload created at e.g. `2025-07-17T07:13:47Z`
    - `state`: string - Unreviewed upload state e.g. `review`
    - `id`: string - Unreviewed upload ID e.g. `69`
    - `status`: string - Unreviewed upload status e.g. `ready_for_review`
    - `type`: string - Unreviewed upload type e.g. `specification_area_transfer`
    - `review_url`: string - Unreviewed upload review url e.g. `/8/project/specification_areas/7/specification_area_transfers/69/review`
    - `created_by`: string - Unreviewed upload created by e.g. `Contact`
    - `file`: object - Unreviewed upload file

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_sections/deletion_log

**Get list of deleted specification sections for a Project**
This endpoint returns deleted specification sections for a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filter_set_id` [query] string - Filter by specification set ID. Use 'none' for sections without a set.
- `filter_division_id` [query] string - Filter by a single specification section division ID.
- `filter_division_ids` [query] array of string - Filter by multiple specification section division IDs.
- `search_string` [query] string - Search string to filter sections by number, description, division description, set name, or revision.
- `exclude_ids` [query] array of string - Array of specification section revision IDs to exclude from results.

Response 200 (application/json): object

- `data`: array of object - deleted specification sections for a project
  - `id`: string - Specification Section Revision ID e.g. `123`
  - `revision`: string - Revision number of the deleted Section Revision e.g. `396`
  - `description`: string - Specification Section Description as free form text e.g. `Section 01 represents the first floor of the building`
  - `number`: string - Number of Specification Section e.g. `08 45 11`
  - `specification_area_id`: string - Id of the Section Area e.g. `4`
  - `specification_section_id`: string - Id of the Specification Section e.g. `54`
  - `deleted_at`: string - Date of deletion of the Specification Section Revision e.g. `2025-04-21T05:13:46Z`
  - `updated_at`: string - Date of last update on the Specification Section Revision e.g. `2025-04-21T05:13:46Z`
  - `issued_date`: string - Date of issue of the Specification Section Revision e.g. `2025-02-02`
  - `received_date`: string - Date of receiving of the Specification Section Revision e.g. `2025-02-02`
  - `deleted_by`: object - User who deleted the Specification Section Revision
    - `id`: string - User ID e.g. `3`
    - `login`: string - User login e.g. `marcia@example.com`
    - `name`: string - User name e.g. `Marcia Carrera`
  - `set`: object - Set to which the deleted Specification Section Revision belongs
    - `id`: string - Set ID e.g. `1`
    - `date`: string - Date of the set e.g. `2025-02-02`
    - `deletable`: boolean - Whether the set is deletable e.g. `false`
    - `name`: string - Name of the set e.g. `set 1`
    - `position`: integer - Position of the set in the list e.g. `1`

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_sections/destroy_collection

**Bulk delete specification sections**
This endpoint bulk deletes specification sections.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `specification_section_revision_ids`: array of string (required) - Specification section revision IDs to delete.

Response 200 (application/json): object

- `data`: object - Destroy collection of specification sections
  - `success`: boolean - Success of the destroy collection e.g. `true`

Error responses: 400, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_sections/create_submittals_from_specs

**Create submittals from specs**
This endpoint creates submittals from specs.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `specification_section_revision_ids`: array of string (required) - Specification section revision ids e.g. `["4"]`
- `user_instructions`: string - Optional instructions for submittal generation.

Response 200: OK (no body)

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_sections/bulk_edit_collection

**Bulk edit specification sections**
This endpoint bulk edits specification sections.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `specification_section_revision_ids`: array of string (required) - Specification section revision IDs to edit. e.g. `["184", "528"]`
- `specification_sections`: object
  - `specification_section_division_id`: string - Specification section division ID to assign to the sections. e.g. `11`
  - `obsolete`: boolean - Whether to mark the sections as obsolete. e.g. `false`
  - `specification_area_id`: string - Target specification area ID when moving sections between areas.
- `specification_section_revisions`: object
  - `issued_date`: string(date-time) - Issued date to set on the revisions. e.g. `2017-08-14T21:39:40Z`
  - `received_date`: string(date-time) - Received date to set on the revisions. e.g. `2017-08-14T21:39:40Z`
  - `specification_set_id`: string - Specification set ID to assign to the revisions. e.g. `126`

Response 200 (application/json): object

- `data`: object - Bulk Edit Collections collection
  - `message`: string - Message of the Bulk Edit Collections collection e.g. `Bulk edit collection successfully`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/specification_sections

**List Specification Sections**
List the Specification Sections in a Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `sort` [query] string enum[number] - Sorts the specification sections by number Ex. 'sort=number' Use 'sort=-number' to sort in descending order

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `161072`
- `number`: string - Number e.g. `08560`
- `description`: string - Description e.g. `Vinyl Windows`
- `label`: string - Label e.g. `08560 Vinyl Windows`
- `current_revision_id`: integer - Current Revision ID e.g. `145092`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/specification_sections

**Create Specification Section for a Project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json):

- `specification_section`: object (required)
  - `number`: string (required) e.g. `15`
  - `description`: string e.g. `Mechanical`
  - `specification_section_division_id`: integer (required) - The ID of the parent Specification Section Division e.g. `3001`

Response 201 (application/json): object

- `id`: integer - ID e.g. `161072`
- `number`: string - Number e.g. `08560`
- `description`: string - Description e.g. `Vinyl Windows`
- `label`: string - Label e.g. `08560 Vinyl Windows`
- `current_revision_id`: integer - Current Revision ID e.g. `145092`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_areas/{specification_area_id}/specification_sections/unreviewed_uploads  **[OLDER VERSION - a newer path version exists below/above]**

**Get unreviewed uploads for specification sections for a Project**
This endpoint returns unreviewed uploads for specification sections for a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `specification_area_id` [path] string (required) - Unique identifier for the specification area.

Response 200 (application/json): object

- `data`: object - Unreviewed uploads for specification sections for current project
  - `uploads`: array of object
    - `created_at`: string - Unreviewed upload created at e.g. `2025-07-17T07:13:47Z`
    - `state`: string - Unreviewed upload state e.g. `review`
    - `id`: string - Unreviewed upload ID e.g. `69`
    - `status`: string - Unreviewed upload status e.g. `ready_for_review`
    - `type`: string - Unreviewed upload type e.g. `specification_area_transfer`
    - `review_url`: string - Unreviewed upload review url e.g. `/8/project/specification_areas/7/specification_area_transfers/69/review`
    - `created_by`: string - Unreviewed upload created by e.g. `Contact`
    - `file`: object - Unreviewed upload file

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_areas/{specification_area_id}/specification_sections/deletion_log  **[OLDER VERSION - a newer path version exists below/above]**

**Get list of deleted specification sections for a Project**
This endpoint returns deleted specification sections for a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `specification_area_id` [path] string (required) - Unique identifier for the specification area.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filter_set_id` [query] string - Filter by specification set ID. Use 'none' for sections without a set.
- `filter_division_id` [query] string - Filter by a single specification section division ID.
- `filter_division_ids` [query] array of string - Filter by multiple specification section division IDs.
- `search_string` [query] string - Search string to filter sections by number, description, division description, set name, or revision.
- `exclude_ids` [query] array of string - Array of specification section revision IDs to exclude from results.

Response 200 (application/json): object

- `data`: array of object - deleted specification sections for a project
  - `id`: string - Specification Section Revision ID e.g. `123`
  - `revision`: string - Revision number of the deleted Section Revision e.g. `396`
  - `description`: string - Specification Section Description as free form text e.g. `Section 01 represents the first floor of the building`
  - `number`: string - Number of Specification Section e.g. `08 45 11`
  - `specification_area_id`: string - Id of the Section Area e.g. `4`
  - `specification_section_id`: string - Id of the Specification Section e.g. `54`
  - `deleted_at`: string - Date of deletion of the Specification Section Revision e.g. `2025-04-21T05:13:46Z`
  - `updated_at`: string - Date of last update on the Specification Section Revision e.g. `2025-04-21T05:13:46Z`
  - `issued_date`: string - Date of issue of the Specification Section Revision e.g. `2025-02-02`
  - `received_date`: string - Date of receiving of the Specification Section Revision e.g. `2025-02-02`
  - `deleted_by`: object - User who deleted the Specification Section Revision
    - `id`: string - User ID e.g. `3`
    - `login`: string - User login e.g. `marcia@example.com`
    - `name`: string - User name e.g. `Marcia Carrera`
  - `set`: object - Set to which the deleted Specification Section Revision belongs
    - `id`: string - Set ID e.g. `1`
    - `date`: string - Date of the set e.g. `2025-02-02`
    - `deletable`: boolean - Whether the set is deletable e.g. `false`
    - `name`: string - Name of the set e.g. `set 1`
    - `position`: integer - Position of the set in the list e.g. `1`

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/specification_sections  **[OLDER VERSION - a newer path version exists below/above]**

**List Specification Sections for a Project**
This endpoint returns a paginated list of Specification Sections for a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `specification_area_id` [query] string - Unique identifier for the specification area.
- `filter_set_id` [query] string - Filter by specification set ID. Use `none` for sections without a set.
- `filter_division_id` [query] string - Filter by a single specification section division ID.
- `search_string` [query] string - Search string to filter sections by number, description, division, set, or revision.
- `filters[division_ids]` [query] array of string - List of Unique identifier for the specification division(s).

Response 200 (application/json): object

- `data`: array of object - List of specifications sections for current project
  - `id`: string - Specification Section ID e.g. `123`
  - `current_revision_id`: string - Id of the Section Revision e.g. `396`
  - `description`: string - Specification Section Description as free form text e.g. `Section 01 represents the first floor of the building`
  - `number`: string - Number of Specification Section e.g. `08 45 11`
  - `specification_area_id`: string - Id of the Section Area e.g. `4`
  - `specification_section_division_id`: string - Id of the Section Division e.g. `54`
  - `created_at`: string(date-time) - Timestamp when the specification section was created. e.g. `2017-08-24T22:12:22Z`

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Specification Sets

Resource id: `specification-sets`. Raw spec: `../openapi-raw/specification-sets.json`. Web: https://developers.procore.com/reference/rest/specification-sets?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/specification_sets

**List Specification Sets for a Project**
This endpoint returns a paginated list of Specification sets for a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `specification_area_id` [query] string - Unique identifier for the specification area.
- `with_none_set` [query] string enum[true, false] - When true on the first page, includes a synthetic `none` set when sections exist without a specification set.
- `is_recycle_bin` [query] string enum[true, false] - When true, evaluates the `none` set option against deleted specification sections.

Response 200 (application/json): object

- `data`: array of object - List of specifications sets for current project
  - `id`: string - Specification Set ID e.g. `123`
  - `name`: string - Name of the set e.g. `An example set`
  - `date`: string - Specification Set Date e.g. `2025-07-07`
  - `position`: integer - Position of Specification set e.g. `1`
  - `deletable`: boolean - True if set does not have any related revisions or uploads e.g. `true`

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/specification_sets

**Bulk update for Specification Sets for a Project**
Applies create, update, and delete operations for specification sets in a single request.
Include any of `creation_params`, `updation_params`, and `deletion_params` as needed.
Successful operations run in one database transaction. Valid rows are persisted even when other
rows in the same request fail validation.
When one or more rows fail validation, the response is **400 Bad Request** with
`error.details[0].reason_code` set to `VALIDATION_FAILED` and a `failures` object grouping errors
under `creation_failures`, `updation_failures`, and `deletion_failures` (see the `400` response schema).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `creation_params`: array of object - New sets to create. Use `key` to correlate validation errors in the response.
  - `key`: string - Client-supplied id for matching entries in `error.details[0].failures.creation_failures`.
  - `name`: string - Name of the specification set.
  - `date`: string - Set date (ISO date string).
  - `position`: integer - Ordering position of the set within the project.
- `updation_params`: array of object - Existing sets to update; failures are keyed by set `id` in the error payload.
  - `id`: string (required) - Specification set id. e.g. `2906`
  - `name`: string - Updated name of the specification set.
  - `date`: string - Updated set date (ISO date string).
  - `position`: integer - Updated ordering position of the set within the project.
- `deletion_params`: array of object - Sets to delete.
  - `id`: string (required) - Specification set id to delete. e.g. `2906`

Response 200 (application/json): object

- `data`: array of object - List of specifications sets for current project
  - `id`: string - Specification Set ID e.g. `123`
  - `name`: string - Name of the set e.g. `An example set`
  - `date`: string - Specification Set Date e.g. `2025-07-07`
  - `position`: integer - Position of Specification set e.g. `1`
  - `deletable`: boolean - True if set does not have any related revisions or uploads e.g. `true`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/specification_sets

**List Specification Sets**
List the Specification Sets in a Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - The ID of the project for the new set
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer
- `project_id`: integer
- `company_id`: integer
- `name`: string
- `created_at`: string(date)
- `deleted_at`: string(date)
- `updated_at`: string(date)
- `date`: string(date)
- `position`: integer

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/specification_sets

**Create Specification Set**
Create a new Specification Set in the specified project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - The ID of the project for the new set

Request body (application/json) (required):

- `name`: string (required) - Name of specification set
- `date`: string - Creation date of specification set

Response 201 (application/json): object

- `id`: integer
- `project_id`: integer
- `company_id`: integer
- `name`: string
- `created_at`: string(date)
- `deleted_at`: string(date)
- `updated_at`: string(date)
- `date`: string(date)
- `position`: integer

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/specification_sets/{id}

**Show Specification Set**
Show a specific Specification Set

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the specification section to show

Response 200 (application/json): object

- `id`: integer
- `project_id`: integer
- `company_id`: integer
- `name`: string
- `created_at`: string(date)
- `deleted_at`: string(date)
- `updated_at`: string(date)
- `date`: string(date)
- `position`: integer

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Specification Uploads

Resource id: `specification-uploads`. Raw spec: `../openapi-raw/specification-uploads.json`. Web: https://developers.procore.com/reference/rest/specification-uploads?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/specification_uploads/{specification_upload_id}

**Delete Specification Upload**
Delete an existing Specification Upload in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `specification_upload_id` [path] string (required) - Unique identifier for the specification upload.
- `specification_area_id` [query] string - Unique identifier for the specification area.

Response 200: OK (no body)

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/specification_uploads

**List Specification Uploads**
List the Specification Uploads in a Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - The ID of the project to upload to
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[status]` [query] string - Return item(s) with the specified status.
- `filters[specification_set_id]` [query] array of integer - Return items with the specified set ID.

Response 200 (application/json): array of object

- `id`: integer
- `issued_date`: string e.g. `2020-10-20`
- `received_date`: string e.g. `2021-10-20`
- `status`: string e.g. `ready_for_review`
- `spec_format`: string enum[CSI, NCS, no_format] e.g. `CSI`
- `specification_set_id`: integer e.g. `21`
- `locale`: string - Language used for parsing text e.g. `es-419`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/specification_uploads

**Create specification upload**
Upload Specifications that will be pending review

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - The ID of the project to upload to

Request body (application/json) (required):

- `specification_set_id`: integer (required) - The ID of the specification set to upload to e.g. `1144`
- `specification_section_id`: integer - The ID of a Specification Section to apply to all pages in the attached file. If present, the upload will not require review unless the Specification Section is deleted during processing. e.g. `3001`
- `default_revision`: string - A default revision designation to be applied to Specification Section Revisions generated from this upload e.g. `1`
- `files`: array of string - One or more files in PDF format to include in the upload (limited to one if specification_section_id is set). *To upload drawings you must upload the entire payload as `multipart/form-data` content-type and specify ea...
- `upload_uuids`: array of string - Array of uploaded files UUIDs. *Required only if files is empty
- `issued_date`: string - The date when the specifications were issued by the design team e.g. `2015-02-17`
- `received_date`: string - The date when the specifications were received by the GC e.g. `2015-03-17`
- `ignore_number`: string - Numbers that resemble a spec section number can make it difficult to accurately split up and auto-label the spec sections. This field contains a number flagged to be ignored by the OCR technology and therefore not rea... e.g. `072100`
- `spec_format`: string enum[CSI, NCS, no_format] (required) - Specification format to apply to the upload. e.g. `CSI`

Response 201 (application/json): array of object

- `id`: integer
- `issued_date`: string e.g. `2020-10-20`
- `received_date`: string e.g. `2021-10-20`
- `status`: string e.g. `ready_for_review`
- `spec_format`: string enum[CSI, NCS, no_format] e.g. `CSI`
- `specification_set_id`: integer e.g. `21`
- `locale`: string - Language used for parsing text e.g. `es-419`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Specifications Configuration

Resource id: `specifications-configuration`. Raw spec: `../openapi-raw/specifications-configuration.json`. Web: https://developers.procore.com/reference/rest/specifications-configuration?version=latest
Product lines: PM Essentials, PM Starter Pack

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_configuration

**List Specification Configurations**
Returns all specification settings in a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `specification_configuration` [query] object (required) - specification configuration options

Response 200 (application/json): object

- `data`: object
  - `settings`: object
    - `specification_revisions_ordered_by_letter_first`: boolean - Identifies if Specification Revisions are ordered by letter first e.g. `true`
    - `specification_by_area_enabled`: boolean - Identifies if Specification by Area feature is enabled e.g. `true`
    - `specification_by_area_editable`: boolean - Identifies if Specification by Area feature is editable e.g. `true`
  - `specification_subscribers`: object
    - `users`: array of object

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_configuration

**Update Specification Configurations**
Saves configuration changes and returns all updated specification settings in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `specification_configuration` [query] object (required) - specification configuration options

Response 200 (application/json): object

- `data`: object
  - `settings`: object
    - `specification_revisions_ordered_by_letter_first`: boolean - Identifies if Specification Revisions are ordered by letter first e.g. `true`
    - `specification_by_area_enabled`: boolean - Identifies if Specification by Area feature is enabled e.g. `true`
    - `specification_by_area_editable`: boolean - Identifies if Specification by Area feature is editable e.g. `true`
  - `specification_subscribers`: object
    - `users`: array of object

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_configuration/potential_distribution_members

**List potential distribution members for Specifications**
This endpoint returns a paginated list of potential distribution members for specifications.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - User ID e.g. `12345`
  - `company_name`: string - Company Name e.g. `Test Company`
  - `locale`: string - User Locale e.g. `en`
  - `login`: string - User Login e.g. `testuser@example.com`
  - `name`: string - User Name e.g. `Test User`

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/specification_configuration/distribution_groups

**List distribution groups for Specifications**
This endpoint returns a paginated list of distribution groups with users for specifications.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - Group ID e.g. `12345`
  - `name`: string - Group Name e.g. `Test Group`
  - `description`: string - Group Description e.g. `Description of the test group`
  - `users`: array of object
    - `id`: string - User ID e.g. `12345`
    - `company_name`: string - Company Name e.g. `Test Company`
    - `locale`: string - User Locale e.g. `en`
    - `login`: string - User Login e.g. `testuser@example.com`
    - `name`: string - User Name e.g. `Test User`

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/specification_configuration  **[OLDER VERSION - a newer path version exists below/above]**

**Configuration of Specifications tool**
This endpoint returns specs configuration for a Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Response 200 (application/json): object

- `data`: object
  - `company_id`: string - Company ID e.g. `12345`
  - `project_id`: string - Project ID e.g. `12345`
  - `spec_by_area`: boolean - Identifies if Specification by Area feature is enabled e.g. `true`

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Specifications User Permissions

Resource id: `specifications-user-permissions`. Raw spec: `../openapi-raw/specifications-user-permissions.json`. Web: https://developers.procore.com/reference/rest/specifications-user-permissions?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/specification_configuration/user_permissions

**Get the Specifications User Permissions**
Returns the Specifications User Permissions

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[query]` [query] string - Return item(s) containing search query
- `sort` [query] string enum[name, company] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter

Response 200 (application/json): object

- `data`: array of object - Specification User Permissions List
  - `id`: string - Unique identifier for the user. e.g. `5`
  - `company_directory_admin`: boolean - Whether the user is an administrator of the company directory. e.g. `false`
  - `project_directory_admin`: boolean - Whether the user is an administrator of the project directory. e.g. `false`
  - `has_permission_template`: boolean - Whether a permission template governs this user's access on the project. e.g. `false`
  - `contact_id`: string - ID of the user's contact record in the company directory. e.g. `1`
  - `name`: string - User's name in "Last, First" format. e.g. `Willier, Paul`
  - `user_access_level`: object
    - `id`: string - User Access Level Id e.g. `1`
    - `name`: string - User Access Level Name e.g. `Standard`
  - `vendor`: object
    - `id`: string - Vendor Id e.g. `1`
    - `name`: string - Vendor Name e.g. `Brickworks`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/specification_configuration/user_permissions/{user_id}

**Update the Specifications User Permissions**
Update the Specifications User Permissions

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `user_id` [path] string (required) - User ID
- `user_access_level_id` [query] string enum[1, 2, 3, 4] (required) - User Access Level ID - '1' for None, '2' for Read-Only, '3' for Standard, '4' for Admin

Response 200 (application/json): object

- `data`: object - Specification User Permission
  - `id`: string - Unique identifier for the user. e.g. `5`
  - `company_directory_admin`: boolean - Whether the user is an administrator of the company directory. e.g. `false`
  - `project_directory_admin`: boolean - Whether the user is an administrator of the project directory. e.g. `false`
  - `has_permission_template`: boolean - Whether a permission template governs this user's access on the project. e.g. `false`
  - `contact_id`: string - ID of the user's contact record in the company directory. e.g. `1`
  - `name`: string - User's name in "Last, First" format. e.g. `Willier, Paul`
  - `user_access_level`: object
    - `id`: string - User Access Level Id e.g. `1`
    - `name`: string - User Access Level Name e.g. `Standard`
  - `vendor`: object
    - `id`: string - Vendor Id e.g. `1`
    - `name`: string - Vendor Name e.g. `Brickworks`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

