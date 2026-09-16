# Procore API: Document Management (Project Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Document Management)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Document Revisions](#document-revisions) - versions 2.2, 2.1, 2.0
- [Document Uploads](#document-uploads) - versions 2.2, 2.1, 2.0
- [Project Fields](#project-fields) - versions 2.0
- [Project Metadata Values](#project-metadata-values) - versions 2.0
- [Project Upload Requirements](#project-upload-requirements) - versions 2.0

## Document Revisions

Resource id: `document-revisions`. Raw spec: `../openapi-raw/document-revisions.json`. Web: https://developers.procore.com/reference/rest/document-revisions?version=latest

### POST /rest/v2.2/companies/{company_id}/projects/{project_id}/document_management/document_revisions/selected_revisions  **[BETA]**

**List Selected Document Revisions V2.2**
Returns details for selected document revision IDs in a project.
Pass `view=ids_only` to receive an array of Document Revision ids instead of full objects.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project
- `view` [query] string enum[default, ids_only] - Optional response view. Omit or pass `default` for full Document Revision objects. `ids_only` returns an array of ids and raises the `per_page` ceiling from 100 to 5000. The published `per_page` maximum reflects the d...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `locale` [query] string enum[de-DE, en-AE, en-AU, en-CA, en-GB, en-SG, en, es-ES, es, fr-CA, fr-FR, is-IS, ...] - Language for the response to be translated into
- `sort` [query] string - Comma-separated set of attributes to sort the list of records by. Format: :primary_sort_attribute,:secondary_sort_attribute Valid sort attribute options are [<field_id>, file_format, file_size, created_at, uploaded_at]

Request body (application/json) (required):

- `ids`: array of string (required) - Array of Document Revision IDs to fetch.

Response 200 (application/json): oneOf(object | object)


Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.1/companies/{company_id}/projects/{project_id}/document_management/document_revisions  **[BETA]**

**Bulk Create Document Revisions**
Create document revisions from uploads with workflow conflict resolution support

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project

Request body (application/json) (required):

- `uploads`: array of object (required) - Array of uploads to submit, with optional termination parameters for conflict resolution
  - `id`: string (required) - Document Upload ID to submit e.g. `01G3SGC3RXZ854BV1NVNN2PG7A`
  - `upload_latest_event_id`: string (required) - This field is no longer validated. It is kept for backward compatibility and may be used for optimistic locking in the future. e.g. `01G3SGC3RXZ854BV1NVNN2PG7B`
  - `termination_reason`: string - Termination reason for existing workflows in the container (required if terminated_revision_status_id is provided) e.g. `Superseded by new revision`
  - `terminated_revision_status_id`: string - Status metadata value ID to set on terminated revisions (required if termination_reason is provided) e.g. `01G3SGC3RXZ854BV1NVNN2PG7A`
- `file_locked`: boolean - Whether files should be locked after submission

Response 201 (application/json): object

- `data`: object (required)
  - `ids`: array of string (required) (read-only) e.g. `["01G3SGC3RXZ854BV1NVNN2PG7A"]`
  - `failures`: array of object (required) (read-only)
    - `upload_id`: string (required) (read-only) e.g. `01G3SGC3RXZ854BV1NVNN2PG7A`
    - `reason_code`: string enum[CONCURRENCY_CONFLICT, UNKNOWN_FAILURE] (required) (read-only) e.g. `CONCURRENCY_CONFLICT`
    - `message`: string (required) (read-only) e.g. `Upload was modified since last read`

Error responses: 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.1/companies/{company_id}/projects/{project_id}/document_management/document_revisions/selected_revisions  **[BETA / DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**List Selected Document Revisions (deprecated)**
Deprecated: use /rest/v2.2/companies/{company_id}/projects/{project_id}/document_management/document_revisions/selected_revisions, which returns 200.
This version returns 201 at runtime despite the documented 200 below.
Returns details for selected document revision IDs in a project.
Pass `view=ids_only` to receive an array of Document Revision ids instead of full objects.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project
- `view` [query] string enum[default, ids_only] - Optional response view. Omit or pass `default` for full Document Revision objects. `ids_only` returns an array of ids and raises the `per_page` ceiling from 100 to 5000. The published `per_page` maximum reflects the d...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `locale` [query] string enum[de-DE, en-AE, en-AU, en-CA, en-GB, en-SG, en, es-ES, es, fr-CA, fr-FR, is-IS, ...] - Language for the response to be translated into
- `sort` [query] string - Comma-separated set of attributes to sort the list of records by. Format: :primary_sort_attribute,:secondary_sort_attribute Valid sort attribute options are [<field_id>, file_format, file_size, created_at, uploaded_at]

Request body (application/json) (required):

- `ids`: array of string (required) - Array of Document Revision IDs to fetch.

Response 200 (application/json): object

- `data`: array of object (required)
  - `id`: string (required) e.g. `f25577d8-50ce-43d7-a165-e3587babcca1`
  - `fields`: array of object (required)
    - `id`: string (required) e.g. `0d4f4b00-19ec-4dad-9e80-5a880d215775`
    - `name`: string enum[original_filename, format, type, name, description, revision, status, classification, project_stage, project, originator, volume, ...] (required)
    - `type`: string enum[string, reference, lov_entry, lov_entries, rich_text, timestamp, numeric] (required)
    - `label`: string (required) e.g. `Status`
    - `description`: string (required) e.g. `The current status of a document that a workflow may set`
    - `values`: array of oneOf(object | object) (required)
    - `label_source`: string enum[MANUAL, NONE, FILENAME_SCRAPING, SCRAPING_FAILED, ML, ML_FAILED, SYSTEM, CONTAINER_MATCH] - The source of the label for the field e.g. `FILENAME_SCRAPING`
  - `document_container_id`: string (required) e.g. `01G3F39BRDKDK04FV9BARK6YTS`
  - `position_within_container`: string (required) e.g. `aaa`
  - `file_locked`: boolean (required) e.g. `false`
  - `download_url`: string (required) e.g. `document-service.procoretech-qa.com/rest/v1.0/companies/42/projects/42/docume...`
  - `permissions`: object (required) e.g. `{"allowed_actions": ["view", "download", "edit_markup", "edit_public_layers",...`
  - `recycled`: boolean (required) e.g. `false`
  - `download_filename`: string - Download filename including revision identifier, when available e.g. `FloorPlan-01-Initial Upload.pdf`
  - `file_key`: string - FAS (File Access Service) file identifier e.g. `abc123def456`
  - `latest_document_collection_ids`: array of string (required) - Array of Document Collection IDs in which the Revision is the latest.
  - `integrations`: object
    - `bim_processing`: object (required)
    - `workflow`: object
  - `indexUpdatedAt`: string e.g. `2024-01-01T00:00:00.000Z`
  - `latest_event_id`: string - Event ID for optimistic concurrency control e.g. `01HW7PE6TJTVC32HJ7JBJVBNJR`
  - `match_type`: object
  - `standalone_upload_id`: string - For a placeholder revision row with an active EXACT or CLOSE match, the id of the paired standalone upload. Confirm/reject/recycle actions target this id rather than the placeholder-owned upload. null when the pairing... e.g. `01FW7PE6TJTVC32HJ7JBJVBNJR`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_revisions  **[BETA / OLDER VERSION - a newer path version exists below/above]**

**Bulk Create Document Revisions**
Create document revisions from uploads with workflow conflict resolution support

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project

Request body (application/json) (required):

- `uploads`: array of object (required) - Array of uploads to submit, with optional termination parameters for conflict resolution
  - `id`: string (required) - Document Upload ID to submit e.g. `01G3SGC3RXZ854BV1NVNN2PG7A`
  - `upload_latest_event_id`: string (required) - This field is no longer validated. It is kept for backward compatibility and may be used for optimistic locking in the future. e.g. `01G3SGC3RXZ854BV1NVNN2PG7B`
  - `termination_reason`: string - Termination reason for existing workflows in the container (required if terminated_revision_status_id is provided) e.g. `Superseded by new revision`
  - `terminated_revision_status_id`: string - Status metadata value ID to set on terminated revisions (required if termination_reason is provided) e.g. `01G3SGC3RXZ854BV1NVNN2PG7A`
- `file_locked`: boolean - Whether files should be locked after submission

Response 201 (application/json): object

- `data`: object (required)
  - `ids`: array of string (required) (read-only) e.g. `["01G3SGC3RXZ854BV1NVNN2PG7A"]`
  - `failureIds`: array of string (required) (read-only) e.g. `["01G3SGC3RXZ854BV1NVNN2PG7A"]`
  - `failures`: array of object (required) (read-only)
    - `upload_id`: string (required) (read-only) e.g. `01G3SGC3RXZ854BV1NVNN2PG7A`
    - `reason_code`: string enum[CONCURRENCY_CONFLICT, UNKNOWN_FAILURE] (required) (read-only) e.g. `CONCURRENCY_CONFLICT`
    - `message`: string (required) (read-only) e.g. `Upload was modified since last read`

Error responses: 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_revisions/selected_revisions  **[BETA / DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**List Selected Document Revisions (deprecated)**
Deprecated: use /rest/v2.2/companies/{company_id}/projects/{project_id}/document_management/document_revisions/selected_revisions, which returns 200.
This version returns 201 at runtime despite the documented 200 below.
Returns details for selected document revision IDs in a project.
Pass `view=ids_only` to receive an array of Document Revision ids instead of full objects.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project
- `view` [query] string enum[default, ids_only] - Optional response view. Omit or pass `default` for full Document Revision objects. `ids_only` returns an array of ids and raises the `per_page` ceiling from 100 to 5000. The published `per_page` maximum reflects the d...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `locale` [query] string enum[de-DE, en-AE, en-AU, en-CA, en-GB, en-SG, en, es-ES, es, fr-CA, fr-FR, is-IS, ...] - Language for the response to be translated into
- `sort` [query] string - Comma-separated set of attributes to sort the list of records by. Format: :primary_sort_attribute,:secondary_sort_attribute Valid sort attribute options are [<field_id>, file_format, file_size, created_at, uploaded_at]

Request body (application/json) (required):

- `ids`: array of string (required) - Array of Document Revision IDs to fetch.

Response 200 (application/json): object

- `data`: array of object (required)
  - `id`: string (required) e.g. `f25577d8-50ce-43d7-a165-e3587babcca1`
  - `fields`: array of object (required)
    - `id`: string (required) e.g. `0d4f4b00-19ec-4dad-9e80-5a880d215775`
    - `name`: string enum[original_filename, format, type, name, description, revision, status, classification, project_stage, project, originator, volume, ...] (required)
    - `type`: string enum[string, reference, lov_entry, lov_entries, rich_text, timestamp, numeric] (required)
    - `label`: string (required) e.g. `Status`
    - `description`: string (required) e.g. `The current status of a document that a workflow may set`
    - `values`: array of oneOf(object | object) (required)
    - `label_source`: string enum[MANUAL, NONE, FILENAME_SCRAPING, SCRAPING_FAILED, ML, ML_FAILED, SYSTEM, CONTAINER_MATCH] - The source of the label for the field e.g. `FILENAME_SCRAPING`
  - `document_container_id`: string (required) e.g. `01G3F39BRDKDK04FV9BARK6YTS`
  - `position_within_container`: string (required) e.g. `aaa`
  - `file_locked`: boolean (required) e.g. `false`
  - `download_url`: string (required) e.g. `document-service.procoretech-qa.com/rest/v1.0/companies/42/projects/42/docume...`
  - `permissions`: object (required) e.g. `{"allowed_actions": ["view", "download", "edit_markup", "edit_public_layers",...`
  - `recycled`: boolean (required) e.g. `false`
  - `download_filename`: string - Download filename including revision identifier, when available e.g. `FloorPlan-01-Initial Upload.pdf`
  - `file_key`: string - FAS (File Access Service) file identifier e.g. `abc123def456`
  - `latest_document_collection_ids`: array of string (required) - Array of Document Collection IDs in which the Revision is the latest.
  - `integrations`: object
    - `bim_processing`: object (required)
    - `workflow`: object
  - `indexUpdatedAt`: string e.g. `2024-01-01T00:00:00.000Z`
  - `latest_event_id`: string - Event ID for optimistic concurrency control e.g. `01HW7PE6TJTVC32HJ7JBJVBNJR`
  - `match_type`: object
  - `standalone_upload_id`: string - For a placeholder revision row with an active EXACT or CLOSE match, the id of the paired standalone upload. Confirm/reject/recycle actions target this id rather than the placeholder-owned upload. null when the pairing... e.g. `01FW7PE6TJTVC32HJ7JBJVBNJR`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Document Uploads

Resource id: `document-uploads`. Raw spec: `../openapi-raw/document-uploads.json`. Web: https://developers.procore.com/reference/rest/document-uploads?version=latest

### POST /rest/v2.2/companies/{company_id}/projects/{project_id}/document_management/document_uploads/selected_uploads  **[BETA]**

**List Selected Document Uploads V2.2**
Returns selected Document Uploads for a Project.
Pass `view=ids_only` to receive an array of Document Upload ids instead of full objects.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Project ID
- `company_id` [path] string (required) - Company ID
- `view` [query] string enum[default, ids_only] - Optional response view. Omit or pass `default` for full Document Upload objects. `ids_only` returns an array of ids and raises the `per_page` ceiling from 100 to 5000. The published `per_page` maximum reflects the def...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `locale` [query] string enum[de-DE, en-AE, en-AU, en-CA, en-GB, en-SG, en, es-ES, es, fr-CA, fr-FR, is-IS, ...] - Language for the response to be translated into
- `sort` [query] string - Comma-separated set of attributes to sort the list of records by. Format: :primary_sort_attribute,:secondary_sort_attribute Valid sort attribute options are [<field_id>, id]

Request body (application/json) (required):

- `ids`: array of string (required) - Array of Document Upload IDs to fetch.

Response 200 (application/json): object

- `data`: array of object (required)
  - `id`: string (required) e.g. `01FW7PE6TJTVC32HJ7JBJVBNJR`
  - `latest_event_id`: string - Event ID for optimistic concurrency control e.g. `01HW7PE6TJTVC32HJ7JBJVBNJR`
  - `fields`: array of object (required)
    - `id`: string (required) e.g. `0d4f4b00-19ec-4dad-9e80-5a880d215775`
    - `name`: string enum[original_filename, format, type, name, description, revision, status, classification, project_stage, project, originator, volume, ...] (required)
    - `type`: string enum[string, reference, lov_entry, lov_entries, rich_text, timestamp, numeric] (required)
    - `label`: string (required) e.g. `Status`
    - `description`: string (required) e.g. `The current status of a document that a workflow may set`
    - `values`: array of oneOf(object | object) (required)
    - `label_source`: string enum[MANUAL, NONE, FILENAME_SCRAPING, SCRAPING_FAILED, ML, ML_FAILED, SYSTEM, CONTAINER_MATCH] - The source of the label for the field e.g. `FILENAME_SCRAPING`
  - `upload_status`: object (required) e.g. `INCOMPLETE`
  - `integration_statuses`: object (required) - Integration statuses for ML and filename scraping services e.g. `{"ml": "in_progress", "filename_scraping": "completed"}`
  - `position_within_container`: string (required) e.g. `aaa`
  - `document_container_id`: object (required) e.g. `f25577d8-50ce-43d7-a165-e3587babcca1`
  - `file_locked`: boolean (required) e.g. `false`
  - `download_url`: string (required) e.g. `document-service.procoretech-qa.com/rest/v1.0/companies/42/projects/42/docume...`
  - `integrations`: object
    - `bim_processing`: object (required)
    - `workflow`: object
  - `match_criteria`: string - Identifier generated based on naming standard and file format used for grouping documents into containers. e.g. `TEST4-SP-I-17|application/pdf`
  - `upload_completed_at`: string - The date and time when the document upload was completed. e.g. `2025-01-01T12:00:00.000Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/document_management/document_uploads  **[BETA]**

**List Document Uploads V2.1**
Returns Document Uploads for a Project.
Pass `view=ids_only` to receive an array of Document Upload ids instead of full objects.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Project ID
- `company_id` [path] string (required) - Company ID
- `view` [query] string enum[default, ids_only] - Optional response view. Omit or pass `default` for full Document Upload objects. `ids_only` returns an array of ids and raises the `per_page` ceiling from 100 to 5000. The published `per_page` maximum reflects the def...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `locale` [query] string enum[de-DE, en-AE, en-AU, en-CA, en-GB, en-SG, en, es-ES, es, fr-CA, fr-FR, is-IS, ...] - Language for the response to be translated into
- `search` [query] string - Search records by [original_filename, file_format, format, type, name, description, revision, status, classification, project_stage, project, originator, volume, location, discipline, number, created_at, created_by, d...
- `sort` [query] string - Comma-separated set of attributes to sort the list of records by. Format: :primary_sort_attribute,:secondary_sort_attribute Valid sort attribute options are [<field_id>, id]
- `filters` [query] object - Object with whitelisted Field ids as keys and their corresponding MetadataValue id, MetadataValue ids array, or primitive string value as values. Valid filterable fields are: original_filename, file_format, format, ty...

Response 200 (application/json): object

- `data`: array of object (required)
  - `id`: string (required) e.g. `01FW7PE6TJTVC32HJ7JBJVBNJR`
  - `latest_event_id`: string - Event ID for optimistic concurrency control e.g. `01HW7PE6TJTVC32HJ7JBJVBNJR`
  - `fields`: array of object (required)
    - `id`: string (required) e.g. `0d4f4b00-19ec-4dad-9e80-5a880d215775`
    - `name`: string enum[original_filename, format, type, name, description, revision, status, classification, project_stage, project, originator, volume, ...] (required)
    - `type`: string enum[string, reference, lov_entry, lov_entries, rich_text, timestamp, numeric] (required)
    - `label`: string (required) e.g. `Status`
    - `description`: string (required) e.g. `The current status of a document that a workflow may set`
    - `values`: array of oneOf(object | object) (required)
    - `label_source`: string enum[MANUAL, NONE, FILENAME_SCRAPING, SCRAPING_FAILED, ML, ML_FAILED, SYSTEM, CONTAINER_MATCH] - The source of the label for the field e.g. `FILENAME_SCRAPING`
  - `upload_status`: object (required) e.g. `INCOMPLETE`
  - `integration_statuses`: object (required) - Integration statuses for ML and filename scraping services e.g. `{"ml": "in_progress", "filename_scraping": "completed"}`
  - `position_within_container`: string (required) e.g. `aaa`
  - `document_container_id`: object (required) e.g. `f25577d8-50ce-43d7-a165-e3587babcca1`
  - `file_locked`: boolean (required) e.g. `false`
  - `download_url`: string (required) e.g. `document-service.procoretech-qa.com/rest/v1.0/companies/42/projects/42/docume...`
  - `integrations`: object
    - `bim_processing`: object (required)
    - `workflow`: object
  - `match_criteria`: string - Identifier generated based on naming standard and file format used for grouping documents into containers. e.g. `TEST4-SP-I-17|application/pdf`
  - `upload_completed_at`: string - The date and time when the document upload was completed. e.g. `2025-01-01T12:00:00.000Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/document_management/document_uploads/recycled_uploads  **[BETA]**

**List Recycled Document Uploads and Placeholders V2.1**
Returns recycled standalone uploads and recycled placeholders (empty and filled) for the Recycle Bin. The item_content field identifies whether a row is a placeholder or a standalone upload. For users with Uploads access, download_url is populated for rows that have an uploaded file and null otherwise; for users without Uploads access, file data is redacted on all rows. The recycled_by field in the fields array contains the user who recycled the item.
Pass `view=ids_only` to receive an array of Document Upload ids instead of full objects.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Project ID
- `company_id` [path] string (required) - Company ID
- `view` [query] string enum[default, ids_only] - Optional response view. Omit or pass `default` for full Recycled Document Upload objects. `ids_only` returns an array of ids and raises the `per_page` ceiling from 100 to 5000. The published `per_page` maximum reflect...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `locale` [query] string enum[de-DE, en-AE, en-AU, en-CA, en-GB, en-SG, en, es-ES, es, fr-CA, fr-FR, is-IS, ...] - Language for the response to be translated into
- `search` [query] string - Search records by [original_filename, file_format, format, type, name, description, revision, status, classification, project_stage, project, originator, volume, location, discipline, number, created_at, created_by, d...
- `sort` [query] string - Comma-separated set of attributes to sort the list of records by. Format: :primary_sort_attribute,:secondary_sort_attribute Valid sort attribute options are [<field_id>, id]
- `filters` [query] object - Object with whitelisted Field ids as keys and their corresponding MetadataValue id, MetadataValue ids array, or primitive string value as values. Valid filterable fields are: original_filename, file_format, format, ty...

Response 200 (application/json): object

- `data`: array of object (required)
  - `id`: string (required) e.g. `01FW7PE6TJTVC32HJ7JBJVBNJR`
  - `latest_event_id`: string - Event ID for optimistic concurrency control e.g. `01HW7PE6TJTVC32HJ7JBJVBNJR`
  - `fields`: array of object (required)
    - `id`: string (required) e.g. `0d4f4b00-19ec-4dad-9e80-5a880d215775`
    - `name`: string enum[original_filename, format, type, name, description, revision, status, classification, project_stage, project, originator, volume, ...] (required)
    - `type`: string enum[string, reference, lov_entry, lov_entries, rich_text, timestamp, numeric] (required)
    - `label`: string (required) e.g. `Status`
    - `description`: string (required) e.g. `The current status of a document that a workflow may set`
    - `values`: array of oneOf(object | object) (required)
    - `label_source`: string enum[MANUAL, NONE, FILENAME_SCRAPING, SCRAPING_FAILED, ML, ML_FAILED, SYSTEM, CONTAINER_MATCH] - The source of the label for the field e.g. `FILENAME_SCRAPING`
  - `upload_status`: object (required) e.g. `INCOMPLETE`
  - `integration_statuses`: object (required) - Integration statuses for ML and filename scraping services e.g. `{"ml": "in_progress", "filename_scraping": "completed"}`
  - `position_within_container`: string (required) e.g. `aaa`
  - `document_container_id`: object (required) e.g. `f25577d8-50ce-43d7-a165-e3587babcca1`
  - `file_locked`: boolean (required) e.g. `false`
  - `integrations`: object
    - `bim_processing`: object (required)
    - `workflow`: object
  - `match_criteria`: string - Identifier generated based on naming standard and file format used for grouping documents into containers. e.g. `TEST4-SP-I-17|application/pdf`
  - `upload_completed_at`: string - The date and time when the document upload was completed. e.g. `2025-01-01T12:00:00.000Z`
  - `download_url`: string (required) - URL to download the file. null when the row is an empty placeholder (no file uploaded) or when the user lacks Uploads tab permission (file data redacted). e.g. `document-service.procoretech-qa.com/rest/v1.0/companies/42/projects/42/docume...`
  - `recycled_from_placeholder_id`: string (required) - Id of the placeholder this file was recycled from. Recycle Bin source only — not an ownership link. e.g. `01FW7PE6TJTVC32HJ7JBJVBNJR`
  - `recycled_from_placeholder_name`: string (required) - Name of the placeholder this file was recycled from, snapshotted at recycle time. e.g. `VTX-PRO-ZZ-DR-E-701`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/document_management/document_uploads/{document_upload_id}  **[BETA]**

**Show Document Upload V2.1**
Returns details about a Document Upload

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Company ID
- `project_id` [path] string (required) - Project ID
- `document_upload_id` [path] string (required) - Unique identifier for the document upload
- `locale` [query] string enum[de-DE, en-AE, en-AU, en-CA, en-GB, en-SG, en, es-ES, es, fr-CA, fr-FR, is-IS, ...] - Language for the response to be translated into

Response 200 (application/json): object

- `data`: object (required)
  - `id`: string (required) e.g. `01FW7PE6TJTVC32HJ7JBJVBNJR`
  - `latest_event_id`: string - Event ID for optimistic concurrency control e.g. `01HW7PE6TJTVC32HJ7JBJVBNJR`
  - `fields`: array of object (required)
    - `id`: string (required) e.g. `0d4f4b00-19ec-4dad-9e80-5a880d215775`
    - `name`: string enum[original_filename, format, type, name, description, revision, status, classification, project_stage, project, originator, volume, ...] (required)
    - `type`: string enum[string, reference, lov_entry, lov_entries, rich_text, timestamp, numeric] (required)
    - `label`: string (required) e.g. `Status`
    - `description`: string (required) e.g. `The current status of a document that a workflow may set`
    - `values`: array of oneOf(object | object) (required)
    - `label_source`: string enum[MANUAL, NONE, FILENAME_SCRAPING, SCRAPING_FAILED, ML, ML_FAILED, SYSTEM, CONTAINER_MATCH] - The source of the label for the field e.g. `FILENAME_SCRAPING`
  - `upload_status`: object (required) e.g. `INCOMPLETE`
  - `integration_statuses`: object (required) - Integration statuses for ML and filename scraping services e.g. `{"ml": "in_progress", "filename_scraping": "completed"}`
  - `position_within_container`: string (required) e.g. `aaa`
  - `document_container_id`: object (required) e.g. `f25577d8-50ce-43d7-a165-e3587babcca1`
  - `file_locked`: boolean (required) e.g. `false`
  - `download_url`: string (required) e.g. `document-service.procoretech-qa.com/rest/v1.0/companies/42/projects/42/docume...`
  - `permissions`: object (required) e.g. `{"allowed_actions": ["view"]}`
  - `upload_url`: string - A url with which the user can retry a failed upload. This field is returned if and only if the upload status is INCOMPLETE e.g. `https://procore-fas-general-default-staging.s3.amazonaws.com/8-c/01HPQ30TEY8A...`
  - `url_expires_at`: number(timestamp) - The expiration for the url found in the upload_url field. This field is returned if and only if the upload status is INCOMPLETE e.g. `1640693102`
  - `integrations`: object
    - `bim_processing`: object (required)
    - `workflow`: object
  - `match_criteria`: string - Identifier generated based on naming standard and file format used for grouping documents into containers. e.g. `TEST4-SP-I-17|application/pdf`
  - `upload_completed_at`: string - The date and time when the document upload was completed. e.g. `2025-01-01T12:00:00.000Z`

Error responses: 400, 401, 403, 404, 410 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_uploads  **[BETA]**

**List Document Uploads V2**
Returns Document Uploads for a Project.
Pass `view=ids_only` to receive an array of Document Upload ids instead of full objects.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Project ID
- `company_id` [path] string (required) - Company ID
- `view` [query] string enum[default, ids_only] - Optional response view. Omit or pass `default` for full Document Upload objects. `ids_only` returns an array of ids and raises the `per_page` ceiling from 100 to 5000. The published `per_page` maximum reflects the def...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `locale` [query] string enum[de-DE, en-AE, en-AU, en-CA, en-GB, en-SG, en, es-ES, es, fr-CA, fr-FR, is-IS, ...] - Language for the response to be translated into
- `search` [query] string - Search records by [original_filename, file_format, format, type, name, description, revision, status, classification, project_stage, project, originator, volume, location, discipline, number, created_at, created_by, d...
- `sort` [query] string - Comma-separated set of attributes to sort the list of records by. Format: :primary_sort_attribute,:secondary_sort_attribute Valid sort attribute options are [<field_id>, id]
- `filters` [query] object - Object with whitelisted Field ids as keys and their corresponding MetadataValue id, MetadataValue ids array, or primitive string value as values. Valid filterable fields are: original_filename, file_format, format, ty...

Response 200 (application/json): object

- `data`: array of object (required)
  - `id`: string (required) e.g. `01FW7PE6TJTVC32HJ7JBJVBNJR`
  - `latest_event_id`: string - Event ID for optimistic concurrency control e.g. `01HW7PE6TJTVC32HJ7JBJVBNJR`
  - `fields`: array of object (required)
    - `id`: string (required) e.g. `0d4f4b00-19ec-4dad-9e80-5a880d215775`
    - `name`: string enum[original_filename, format, type, name, description, revision, status, classification, project_stage, project, originator, volume, ...] (required)
    - `type`: string enum[string, reference, lov_entry, lov_entries, rich_text, timestamp, numeric] (required)
    - `label`: string (required) e.g. `Status`
    - `description`: string (required) e.g. `The current status of a document that a workflow may set`
    - `values`: array of oneOf(object | object) (required)
    - `label_source`: string enum[MANUAL, NONE, FILENAME_SCRAPING, SCRAPING_FAILED, ML, ML_FAILED, SYSTEM, CONTAINER_MATCH] - The source of the label for the field e.g. `FILENAME_SCRAPING`
  - `upload_status`: object (required) e.g. `INCOMPLETE`
  - `integration_statuses`: object (required) - Integration statuses for ML and filename scraping services e.g. `{"ml": "in_progress", "filename_scraping": "completed"}`
  - `position_within_container`: string (required) e.g. `aaa`
  - `document_container_id`: object (required) e.g. `f25577d8-50ce-43d7-a165-e3587babcca1`
  - `file_locked`: boolean (required) e.g. `false`
  - `download_url`: string (required) e.g. `document-service.procoretech-qa.com/rest/v1.0/companies/42/projects/42/docume...`
  - `integrations`: object
    - `bim_processing`: object (required)
    - `workflow`: object
  - `match_criteria`: string - Identifier generated based on naming standard and file format used for grouping documents into containers. e.g. `TEST4-SP-I-17|application/pdf`
  - `upload_completed_at`: string - The date and time when the document upload was completed. e.g. `2025-01-01T12:00:00.000Z`
  - `file_key`: string - FAS (File Access Service) file identifier. Deprecated: this internal storage identifier must not appear on public responses. Use v2.1, which omits it. e.g. `abc123def456`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_uploads  **[BETA]**

**Bulk Create Document Uploads**
Creates new Document Uploads and returns an array of upload metadata

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project

Request body (application/json) (required):

- `uploads`: array of object (required) - list of uploads
  - `file_name`: string (required) - file.txt
  - `mime_type`: string (required) - text/plain
  - `file_locked`: boolean
  - `expected_container_id`: string - Expected target container for this upload. Used for post-update mismatch notifications.

Response 201 (application/json): object

- `data`: array of object (required) - Array of created document uploads
  - `id`: string (required) - Unique identifier for the document upload e.g. `01G3SGC3RXZ854BV1NVNN2PG7A`
  - `file_locked`: boolean - Whether the file is locked

Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_uploads  **[BETA]**

**Bulk Update Document Uploads**
Update multiple Document Uploads

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project

Request body (application/json) (required):

- `update_params`: array of object (required) - Array of document upload update parameters
  - `id`: string (required) - ID of the Document Upload e.g. `01G3SGC3RXZ854BV1NVNN2PG7A`
  - `fields`: array of object - An array of Field Update Parameters
    - `id`: string (required) - Project Field ID
    - `values`: array of string (required) - Array of Metadata Value IDs if the Project Field has Metadata Type of single or multi select. If the Metadata Type is text, then a one-element array with a string containing the field value.
    - `label_source`: string enum[MANUAL, NONE, FILENAME_SCRAPING, SCRAPING_FAILED, ML, ML_FAILED, SYSTEM, CONTAINER_MATCH] - Source of how the field value was populated (ML, manual, or filename scraping)
    - `confidence_score`: number - Confidence score for ML-populated fields (0.0 to 1.0)
  - `upload_status`: string enum[INCOMPLETE, COMPLETED, PLACEHOLDER] - Upload status of the Document Upload
  - `file_locked`: boolean - Whether the file is locked
  - `integrations`: object
    - `bim_processing`: object (required)
      - `bim_file_extraction_id`: object (required) - ID of 3D model file extraction e.g. `12345`
      - `status`: string enum[not_applicable, not_started, pending, in_progress, ready, error] (required) - Status of 3D model file processing e.g. `in_progress`
      - `errors`: array of object (required) - Errors that occurred during 3D model file processing
        - `code`: string (required) - Error code e.g. `12345`
        - `type`: string (required) - Error type e.g. `SegmentationFaultErr`
        - `message`: string (required) - Error message e.g. `Sorry, we couldn't publish the file at this time. Please try again later.`
    - `workflow`: object
      - `status`: string enum[not_created, creation_requested, created, failed, ended, termination_requested, terminated, termination_failed] - Lifecycle status of the workflow integration on this document revision. The server blocks recycle (and other writes that would orphan an in-flight external workflow instance) when status is `created`, `creation_reques... e.g. `created`
      - `workflowInstanceId`: string - ID of the active workflow instance, when one exists. e.g. `01HW7PE6TJTVC32HJ7JBJVBNJR`
      - `latestWorfklowIntegrationEventTimestamp`: string - Timestamp of the most recent workflow lifecycle event (started/updated/ended). e.g. `2024-01-01T00:00:00.000Z`
      - `latestWorkflowOperationEventTimestamp`: string - Timestamp of the most recent workflow operation metadata event (e.g. operation_ended). e.g. `2024-01-01T00:00:00.000Z`
      - `operationId`: string - ID of the operation that created the workflow, if applicable. e.g. `01HW7PE6TJTVC32HJ7JBJVBNJR`
      - `operationType`: string - Type of the operation that created the workflow. e.g. `bulk_instance_create`
      - `terminationReason`: string - Human-readable reason captured when a workflow was terminated. e.g. `Document recycled by user`
      - `terminatedAt`: string - Timestamp when the workflow was terminated, if applicable. e.g. `2024-01-01T00:00:00.000Z`
      - `terminatedStatusId`: string - ID of the status the document revision was set to on workflow termination. e.g. `01HW7PE6TJTVC32HJ7JBJVBNJR`
      - `selectedPresetId`: string - ID of the workflow preset selected for this workflow instance. e.g. `01HW7PE6TJTVC32HJ7JBJVBNJR`
  - `integrationStatuses`: object - Integration statuses for ML and filename scraping services e.g. `{"ML": "in_progress", "FILENAME_SCRAPING": "completed"}`
  - `file_upload_id`: string - ID of the uploaded file
  - `document_container_id`: string - ID of the container to assign the upload to. When set, metadata from the container's latest revision is applied (unless container has no revisions).
- `update_all_document_uploads`: boolean - If true, all document uploads that satisfy the filter params will be updated.
- `only_update_empty_fields`: boolean - If true, only empty fields will be updated. Existing field values will be preserved.

Response 207 (application/json): object

- `data`: object (required)
  - `success`: array of object (required) - Successfully updated document uploads
    - `id`: string (required) e.g. `01G3SGC3RXZ854BV1NVNN2PG7A`
  - `failed`: array of object (required) - Failed document upload updates
    - `id`: string (required) e.g. `01G3SGC3RXZ854BV1NVNN2PG7A`
    - `code`: number (required) - The error code
    - `message`: string (required) - The error message

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.1/companies/{company_id}/projects/{project_id}/document_management/document_uploads/selected_uploads  **[BETA / DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**List Selected Document Uploads V2.1 (deprecated)**
Deprecated: use /rest/v2.2/companies/{company_id}/projects/{project_id}/document_management/document_uploads/selected_uploads, which returns 200.
This version returns 201 at runtime despite the documented 200 below.
Returns selected Document Uploads for a Project.
Pass `view=ids_only` to receive an array of Document Upload ids instead of full objects.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Project ID
- `company_id` [path] string (required) - Company ID
- `view` [query] string enum[default, ids_only] - Optional response view. Omit or pass `default` for full Document Upload objects. `ids_only` returns an array of ids and raises the `per_page` ceiling from 100 to 5000. The published `per_page` maximum reflects the def...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `locale` [query] string enum[de-DE, en-AE, en-AU, en-CA, en-GB, en-SG, en, es-ES, es, fr-CA, fr-FR, is-IS, ...] - Language for the response to be translated into
- `sort` [query] string - Comma-separated set of attributes to sort the list of records by. Format: :primary_sort_attribute,:secondary_sort_attribute Valid sort attribute options are [<field_id>, id]

Request body (application/json) (required):

- `ids`: array of string (required) - Array of Document Upload IDs to fetch.

Response 200 (application/json): object

- `data`: array of object (required)
  - `id`: string (required) e.g. `01FW7PE6TJTVC32HJ7JBJVBNJR`
  - `latest_event_id`: string - Event ID for optimistic concurrency control e.g. `01HW7PE6TJTVC32HJ7JBJVBNJR`
  - `fields`: array of object (required)
    - `id`: string (required) e.g. `0d4f4b00-19ec-4dad-9e80-5a880d215775`
    - `name`: string enum[original_filename, format, type, name, description, revision, status, classification, project_stage, project, originator, volume, ...] (required)
    - `type`: string enum[string, reference, lov_entry, lov_entries, rich_text, timestamp, numeric] (required)
    - `label`: string (required) e.g. `Status`
    - `description`: string (required) e.g. `The current status of a document that a workflow may set`
    - `values`: array of oneOf(object | object) (required)
    - `label_source`: string enum[MANUAL, NONE, FILENAME_SCRAPING, SCRAPING_FAILED, ML, ML_FAILED, SYSTEM, CONTAINER_MATCH] - The source of the label for the field e.g. `FILENAME_SCRAPING`
  - `upload_status`: object (required) e.g. `INCOMPLETE`
  - `integration_statuses`: object (required) - Integration statuses for ML and filename scraping services e.g. `{"ml": "in_progress", "filename_scraping": "completed"}`
  - `position_within_container`: string (required) e.g. `aaa`
  - `document_container_id`: object (required) e.g. `f25577d8-50ce-43d7-a165-e3587babcca1`
  - `file_locked`: boolean (required) e.g. `false`
  - `download_url`: string (required) e.g. `document-service.procoretech-qa.com/rest/v1.0/companies/42/projects/42/docume...`
  - `integrations`: object
    - `bim_processing`: object (required)
    - `workflow`: object
  - `match_criteria`: string - Identifier generated based on naming standard and file format used for grouping documents into containers. e.g. `TEST4-SP-I-17|application/pdf`
  - `upload_completed_at`: string - The date and time when the document upload was completed. e.g. `2025-01-01T12:00:00.000Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_uploads/recycled_uploads  **[BETA / OLDER VERSION - a newer path version exists below/above]**

**List Recycled Document Uploads and Placeholders V2**
Returns recycled standalone uploads and recycled placeholders (empty and filled) for the Recycle Bin. The item_content field identifies whether a row is a placeholder or a standalone upload. For users with Uploads access, file_key/download_url are populated for rows that have an uploaded file and null otherwise; for users without Uploads access, file data is redacted on all rows. The recycled_by field in the fields array contains the user who recycled the item.
Pass `view=ids_only` to receive an array of Document Upload ids instead of full objects.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Project ID
- `company_id` [path] string (required) - Company ID
- `view` [query] string enum[default, ids_only] - Optional response view. Omit or pass `default` for full Recycled Document Upload objects. `ids_only` returns an array of ids and raises the `per_page` ceiling from 100 to 5000. The published `per_page` maximum reflect...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `locale` [query] string enum[de-DE, en-AE, en-AU, en-CA, en-GB, en-SG, en, es-ES, es, fr-CA, fr-FR, is-IS, ...] - Language for the response to be translated into
- `search` [query] string - Search records by [original_filename, file_format, format, type, name, description, revision, status, classification, project_stage, project, originator, volume, location, discipline, number, created_at, created_by, d...
- `sort` [query] string - Comma-separated set of attributes to sort the list of records by. Format: :primary_sort_attribute,:secondary_sort_attribute Valid sort attribute options are [<field_id>, id]
- `filters` [query] object - Object with whitelisted Field ids as keys and their corresponding MetadataValue id, MetadataValue ids array, or primitive string value as values. Valid filterable fields are: original_filename, file_format, format, ty...

Response 200 (application/json): object

- `data`: array of object (required)
  - `id`: string (required) e.g. `01FW7PE6TJTVC32HJ7JBJVBNJR`
  - `latest_event_id`: string - Event ID for optimistic concurrency control e.g. `01HW7PE6TJTVC32HJ7JBJVBNJR`
  - `fields`: array of object (required)
    - `id`: string (required) e.g. `0d4f4b00-19ec-4dad-9e80-5a880d215775`
    - `name`: string enum[original_filename, format, type, name, description, revision, status, classification, project_stage, project, originator, volume, ...] (required)
    - `type`: string enum[string, reference, lov_entry, lov_entries, rich_text, timestamp, numeric] (required)
    - `label`: string (required) e.g. `Status`
    - `description`: string (required) e.g. `The current status of a document that a workflow may set`
    - `values`: array of oneOf(object | object) (required)
    - `label_source`: string enum[MANUAL, NONE, FILENAME_SCRAPING, SCRAPING_FAILED, ML, ML_FAILED, SYSTEM, CONTAINER_MATCH] - The source of the label for the field e.g. `FILENAME_SCRAPING`
  - `upload_status`: object (required) e.g. `INCOMPLETE`
  - `integration_statuses`: object (required) - Integration statuses for ML and filename scraping services e.g. `{"ml": "in_progress", "filename_scraping": "completed"}`
  - `position_within_container`: string (required) e.g. `aaa`
  - `document_container_id`: object (required) e.g. `f25577d8-50ce-43d7-a165-e3587babcca1`
  - `file_locked`: boolean (required) e.g. `false`
  - `integrations`: object
    - `bim_processing`: object (required)
    - `workflow`: object
  - `match_criteria`: string - Identifier generated based on naming standard and file format used for grouping documents into containers. e.g. `TEST4-SP-I-17|application/pdf`
  - `upload_completed_at`: string - The date and time when the document upload was completed. e.g. `2025-01-01T12:00:00.000Z`
  - `file_key`: string (required) - FAS (File Access Service) file identifier. null when no file has been uploaded or when file data is redacted. Deprecated: this internal storage identifier must not appear on public responses. Use v2.1, which omits it. e.g. `abc123def456`
  - `download_url`: string (required) - URL to download the file. null when the row is an empty placeholder (no file uploaded) or when the user lacks Uploads tab permission (file data redacted). e.g. `document-service.procoretech-qa.com/rest/v1.0/companies/42/projects/42/docume...`
  - `recycled_from_placeholder_id`: string (required) - Id of the placeholder this file was recycled from. Recycle Bin source only — not an ownership link. e.g. `01FW7PE6TJTVC32HJ7JBJVBNJR`
  - `recycled_from_placeholder_name`: string (required) - Name of the placeholder this file was recycled from, snapshotted at recycle time. e.g. `VTX-PRO-ZZ-DR-E-701`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_uploads/selected_uploads  **[BETA / DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**List Selected Document Uploads V2 (deprecated)**
Deprecated: use /rest/v2.2/companies/{company_id}/projects/{project_id}/document_management/document_uploads/selected_uploads, which returns 200.
This version returns 201 at runtime despite the documented 200 below.
Returns selected Document Uploads for a Project.
Pass `view=ids_only` to receive an array of Document Upload ids instead of full objects.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Project ID
- `company_id` [path] string (required) - Company ID
- `view` [query] string enum[default, ids_only] - Optional response view. Omit or pass `default` for full Document Upload objects. `ids_only` returns an array of ids and raises the `per_page` ceiling from 100 to 5000. The published `per_page` maximum reflects the def...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `locale` [query] string enum[de-DE, en-AE, en-AU, en-CA, en-GB, en-SG, en, es-ES, es, fr-CA, fr-FR, is-IS, ...] - Language for the response to be translated into
- `sort` [query] string - Comma-separated set of attributes to sort the list of records by. Format: :primary_sort_attribute,:secondary_sort_attribute Valid sort attribute options are [<field_id>, id]

Request body (application/json) (required):

- `ids`: array of string (required) - Array of Document Upload IDs to fetch.

Response 200 (application/json): object

- `data`: array of object (required)
  - `id`: string (required) e.g. `01FW7PE6TJTVC32HJ7JBJVBNJR`
  - `latest_event_id`: string - Event ID for optimistic concurrency control e.g. `01HW7PE6TJTVC32HJ7JBJVBNJR`
  - `fields`: array of object (required)
    - `id`: string (required) e.g. `0d4f4b00-19ec-4dad-9e80-5a880d215775`
    - `name`: string enum[original_filename, format, type, name, description, revision, status, classification, project_stage, project, originator, volume, ...] (required)
    - `type`: string enum[string, reference, lov_entry, lov_entries, rich_text, timestamp, numeric] (required)
    - `label`: string (required) e.g. `Status`
    - `description`: string (required) e.g. `The current status of a document that a workflow may set`
    - `values`: array of oneOf(object | object) (required)
    - `label_source`: string enum[MANUAL, NONE, FILENAME_SCRAPING, SCRAPING_FAILED, ML, ML_FAILED, SYSTEM, CONTAINER_MATCH] - The source of the label for the field e.g. `FILENAME_SCRAPING`
  - `upload_status`: object (required) e.g. `INCOMPLETE`
  - `integration_statuses`: object (required) - Integration statuses for ML and filename scraping services e.g. `{"ml": "in_progress", "filename_scraping": "completed"}`
  - `position_within_container`: string (required) e.g. `aaa`
  - `document_container_id`: object (required) e.g. `f25577d8-50ce-43d7-a165-e3587babcca1`
  - `file_locked`: boolean (required) e.g. `false`
  - `download_url`: string (required) e.g. `document-service.procoretech-qa.com/rest/v1.0/companies/42/projects/42/docume...`
  - `integrations`: object
    - `bim_processing`: object (required)
    - `workflow`: object
  - `match_criteria`: string - Identifier generated based on naming standard and file format used for grouping documents into containers. e.g. `TEST4-SP-I-17|application/pdf`
  - `upload_completed_at`: string - The date and time when the document upload was completed. e.g. `2025-01-01T12:00:00.000Z`
  - `file_key`: string - FAS (File Access Service) file identifier. Deprecated: this internal storage identifier must not appear on public responses. Use v2.1, which omits it. e.g. `abc123def456`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_uploads/{document_upload_id}  **[BETA / OLDER VERSION - a newer path version exists below/above]**

**Show Document Upload**
Returns details about a Document Upload

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Company ID
- `project_id` [path] string (required) - Project ID
- `document_upload_id` [path] string (required) - Unique identifier for the document upload
- `locale` [query] string enum[de-DE, en-AE, en-AU, en-CA, en-GB, en-SG, en, es-ES, es, fr-CA, fr-FR, is-IS, ...] - Language for the response to be translated into

Response 200 (application/json): object

- `data`: object (required)
  - `id`: string (required) e.g. `01FW7PE6TJTVC32HJ7JBJVBNJR`
  - `latest_event_id`: string - Event ID for optimistic concurrency control e.g. `01HW7PE6TJTVC32HJ7JBJVBNJR`
  - `fields`: array of object (required)
    - `id`: string (required) e.g. `0d4f4b00-19ec-4dad-9e80-5a880d215775`
    - `name`: string enum[original_filename, format, type, name, description, revision, status, classification, project_stage, project, originator, volume, ...] (required)
    - `type`: string enum[string, reference, lov_entry, lov_entries, rich_text, timestamp, numeric] (required)
    - `label`: string (required) e.g. `Status`
    - `description`: string (required) e.g. `The current status of a document that a workflow may set`
    - `values`: array of oneOf(object | object) (required)
    - `label_source`: string enum[MANUAL, NONE, FILENAME_SCRAPING, SCRAPING_FAILED, ML, ML_FAILED, SYSTEM, CONTAINER_MATCH] - The source of the label for the field e.g. `FILENAME_SCRAPING`
  - `upload_status`: object (required) e.g. `INCOMPLETE`
  - `integration_statuses`: object (required) - Integration statuses for ML and filename scraping services e.g. `{"ml": "in_progress", "filename_scraping": "completed"}`
  - `position_within_container`: string (required) e.g. `aaa`
  - `document_container_id`: object (required) e.g. `f25577d8-50ce-43d7-a165-e3587babcca1`
  - `file_locked`: boolean (required) e.g. `false`
  - `download_url`: string (required) e.g. `document-service.procoretech-qa.com/rest/v1.0/companies/42/projects/42/docume...`
  - `permissions`: object (required) e.g. `{"allowed_actions": ["view"]}`
  - `upload_url`: string - A url with which the user can retry a failed upload. This field is returned if and only if the upload status is INCOMPLETE e.g. `https://procore-fas-general-default-staging.s3.amazonaws.com/8-c/01HPQ30TEY8A...`
  - `url_expires_at`: number(timestamp) - The expiration for the url found in the upload_url field. This field is returned if and only if the upload status is INCOMPLETE e.g. `1640693102`
  - `integrations`: object
    - `bim_processing`: object (required)
    - `workflow`: object
  - `match_criteria`: string - Identifier generated based on naming standard and file format used for grouping documents into containers. e.g. `TEST4-SP-I-17|application/pdf`
  - `upload_completed_at`: string - The date and time when the document upload was completed. e.g. `2025-01-01T12:00:00.000Z`
  - `file_key`: string - FAS (File Access Service) file identifier. Deprecated: this internal storage identifier must not appear on public responses. Use v2.1, which omits it. e.g. `abc123def456`

Error responses: 400, 401, 403, 404, 410 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Fields

Resource id: `project-fields`. Raw spec: `../openapi-raw/project-fields.json`. Web: https://developers.procore.com/reference/rest/project-fields?version=latest

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/fields  **[BETA]**

**List Project Fields**
Returns the Fields for a Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Company ID
- `project_id` [path] string (required) - Project ID
- `filters` [query] object - Object with whitelisted Field ids as keys and their corresponding MetadataValue id, MetadataValue ids array, or primitive string value as values. Valid filterable fields are: active, can_affect_permissions
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `locale` [query] string enum[de-DE, en-AE, en-AU, en-CA, en-GB, en-SG, en, es-ES, es, fr-CA, fr-FR, is-IS, ...] - Language for the response to be translated into

Response 200 (application/json): object

- `data`: array of object (required)
  - `id`: string (required) e.g. `01G3F39BRDKDK04FV9BARK6YTS`
  - `name`: string enum[original_filename, format, type, name, description, revision, status, classification, project_stage, project, originator, volume, ...] (required) e.g. `status`
  - `label`: string (required) e.g. `ISO 96850 Status`
  - `description`: string (required) e.g. `ISO 96850 Status`
  - `position`: string (required) e.g. `a`
  - `active`: boolean (required) e.g. `true`
  - `visible`: boolean (required) e.g. `true`
  - `readonly`: boolean (required) e.g. `true`
  - `can_affect_permissions`: boolean (required) e.g. `true`
  - `type`: string enum[string, reference, lov_entry, lov_entries, rich_text, timestamp, numeric] (required)
  - `variant`: string enum[procore_project, procore_project_stage, procore_location, procore_company, procore_user, procore_vendor, procore_workflow_template, procore_workflow_template_preset, procore_workflow_status, procore_workflow_template_version, with_code, procore_users, ...]
  - `custom_field_definition_id`: string e.g. `456`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Metadata Values

Resource id: `project-metadata-values`. Raw spec: `../openapi-raw/project-metadata-values.json`. Web: https://developers.procore.com/reference/rest/project-metadata-values?version=latest

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/fields/{field_id_or_name}/values  **[BETA]**

**List Project Metadata Values**
Returns a list of Metadata Values for the specified field

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Company ID
- `project_id` [path] string (required) - Project ID
- `field_id_or_name` [path] string (required) - Field ID or Name
- `include_inactive` [query] boolean - Include inactive metadata values
- `document_collection_id` [query] string - Only return metadata values that are included in the filters of the given document collection
- `upload_collection_id` [query] string - Only return metadata values that are included in the filters of the given upload collection
- `keyword` [query] string - Returns metadata values that are matched with the given keyword
- `sort_by` [query] string enum[position, active, code, label] - Sort by field values
- `sort_order` [query] string enum[asc, desc] - Sort order for the sort_by field values
- `include_all` [query] boolean - Include all metadata values
- `include_readonly` [query] boolean - Include read-only metadata values
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `locale` [query] string enum[de-DE, en-AE, en-AU, en-CA, en-GB, en-SG, en, es-ES, es, fr-CA, fr-FR, is-IS, ...] - Language for the response to be translated into

Response 200 (application/json): object

- `data`: array of object (required) - List of project metadata values
  - `id`: string (required) - Unique identifier for the metadata value e.g. `01FVG7CQBPS470N4DAC1GTB1DS`
  - `code`: string (required) - Code for the metadata value e.g. `S3`
  - `label`: string (required) - Label for the metadata value e.g. `Suitable for review and comment`
  - `active`: boolean (required) - Is project metadata value active e.g. `true`
  - `tags`: array of string (required) - Tags associated with the metadata value
  - `field_id`: string - Field ID for reference metadata values (present when originId exists) e.g. `01FVG7CQBPS470N4DAC1GTB1DT`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Upload Requirements

Resource id: `project-upload-requirements`. Raw spec: `../openapi-raw/project-upload-requirements.json`. Web: https://developers.procore.com/reference/rest/project-upload-requirements?version=latest

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/upload_requirements  **[BETA]**

**List Project Upload Requirements**
Returns a list of Upload Requirements for the Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Company ID
- `project_id` [path] string (required) - Project ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `locale` [query] string enum[de-DE, en-AE, en-AU, en-CA, en-GB, en-SG, en, es-ES, es, fr-CA, fr-FR, is-IS, ...] - Language for the response to be translated into

Response 200 (application/json): object

- `data`: array of object (required)
  - `id`: string (required) e.g. `01FX1K37F93ZDVEJSN3EMXK7DV`
  - `updated_at`: string (read-only) - Date of last update e.g. `2012-04-23T18:25:43Z`
  - `naming_standard`: object (required)
    - `id`: string (required) e.g. `ADEF1526Z`
    - `updated_at`: string (read-only) - Date of last update e.g. `2012-04-23T18:25:43Z`
    - `name`: string (required) - Name of this Naming Standard e.g. `ISO 19650`
    - `fields`: array of object (required) - Array of Fields for this Naming Standard
  - `fields_required_by_project`: array of object (required)
    - `id`: string (required) e.g. `def456`
    - `name`: string enum[original_filename, format, type, name, description, revision, status, classification, project_stage, project, originator, volume, ...] (required) e.g. `status`
    - `label`: string (required) e.g. `ISO 96850 Status`
    - `description`: string (required) e.g. `ISO 96850 Status`
    - `position`: string (required) e.g. `a`
    - `active`: boolean (required) e.g. `true`
    - `visible`: boolean (required) e.g. `true`
    - `readonly`: boolean (required) e.g. `true`
    - `can_affect_permissions`: boolean (required) e.g. `true`
    - `type`: string enum[string, reference, lov_entry, lov_entries, rich_text, timestamp, numeric] (required)
    - `variant`: string enum[procore_project, procore_project_stage, procore_location, procore_company, procore_user, procore_vendor, procore_workflow_template, procore_workflow_template_preset, procore_workflow_status, procore_workflow_template_version, with_code, procore_users, ...]
    - `custom_field_definition_id`: string e.g. `456`
  - `additional_required_fields`: array of object (required)
    - `id`: string (required) e.g. `def456`
    - `name`: string enum[original_filename, format, type, name, description, revision, status, classification, project_stage, project, originator, volume, ...] (required) e.g. `status`
    - `label`: string (required) e.g. `ISO 96850 Status`
    - `description`: string (required) e.g. `ISO 96850 Status`
    - `position`: string (required) e.g. `a`
    - `active`: boolean (required) e.g. `true`
    - `visible`: boolean (required) e.g. `true`
    - `readonly`: boolean (required) e.g. `true`
    - `can_affect_permissions`: boolean (required) e.g. `true`
    - `type`: string enum[string, reference, lov_entry, lov_entries, rich_text, timestamp, numeric] (required)
    - `variant`: string enum[procore_project, procore_project_stage, procore_location, procore_company, procore_user, procore_vendor, procore_workflow_template, procore_workflow_template_preset, procore_workflow_status, procore_workflow_template_version, with_code, procore_users, ...]
    - `custom_field_definition_id`: string e.g. `456`
  - `rule_qualifiers`: array of object (required)
    - `field`: object (required)
    - `type`: string enum[string, reference, lov_entry, lov_entries, rich_text, timestamp, numeric] (required)
    - `acceptable_values`: array of object (required)
  - `allow_duplicate_revisions`: boolean (required) e.g. `false`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

