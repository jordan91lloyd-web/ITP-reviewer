# Procore API: Assets (Core)

Source: https://developers.procore.com/reference/rest/ (tool category: Assets)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Company Asset Attachments](#company-asset-attachments) - versions 2.0
- [Company Asset Change History](#company-asset-change-history) - versions 2.0
- [Company Asset Permissions](#company-asset-permissions) - versions 2.0
- [Company Asset Statuses](#company-asset-statuses) - versions 2.0
- [Company Asset Type Available Fields](#company-asset-type-available-fields) - versions 2.0
- [Company Asset Type Field Rules](#company-asset-type-field-rules) - versions 2.0
- [Company Asset Types](#company-asset-types) - versions 2.0
- [Company Assets](#company-assets) - versions 2.0
- [Company Available Fields Multi Asset Type](#company-available-fields-multi-asset-type) - versions 2.0
- [Company Default Field Values](#company-default-field-values) - versions 2.0
- [Company Field Rules](#company-field-rules) - versions 2.0
- [Company Grouped Field Rules](#company-grouped-field-rules) - versions 2.0
- [Company Naming Standard](#company-naming-standard) - versions 2.0
- [Company Naming Standard LOV Codes](#company-naming-standard-lov-codes) - versions 2.0
- [Company Procore Default Fields](#company-procore-default-fields) - versions 2.0
- [Project Asset Attachments](#project-asset-attachments) - versions 2.0
- [Project Asset Change History](#project-asset-change-history) - versions 2.0
- [Project Asset Permissions](#project-asset-permissions) - versions 2.0
- [Project Asset Statuses](#project-asset-statuses) - versions 2.0
- [Project Asset Type Attachments](#project-asset-type-attachments) - versions 2.0
- [Project Asset Type Available Fields](#project-asset-type-available-fields) - versions 2.0
- [Project Asset Type Field Rules](#project-asset-type-field-rules) - versions 2.0
- [Project Asset Types](#project-asset-types) - versions 2.0
- [Project Assets](#project-assets) - versions 2.0
- [Project Default Field Values](#project-default-field-values) - versions 2.0
- [Project Field Rules](#project-field-rules) - versions 2.0
- [Project Fieldsets](#project-fieldsets) - versions 2.0
- [Project Naming Standard](#project-naming-standard) - versions 2.0
- [Project Naming Standard LOV Codes](#project-naming-standard-lov-codes) - versions 2.0
- [Project Procore Default Fields](#project-procore-default-fields) - versions 2.0
- [System States](#system-states) - versions 2.0

## Company Asset Attachments

Resource id: `company-asset-attachments`. Raw spec: `../openapi-raw/company-asset-attachments.json`. Web: https://developers.procore.com/reference/rest/company-asset-attachments?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/assets/{asset_id}/attachments

**List Attachments**
Returns a list of attachments for a given asset.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `asset_id` [path] string (required) - Unique identifier for the Asset
- `sort` [query] string enum[file_name, modified_at] - Sorting criteria in minus-based order format. Default sort order is ascending. Multiple sort criteria can be provided in CSV format, for example: sort=file_name,-modified_at.
- `page` [query] integer(int32) - One-based page index (1..N)
- `per_page` [query] integer(int32) - The size of the page to be returned
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `id`: string
  - `file_name`: string
  - `attachment_type_id`: string
  - `attachment_type_name`: string
  - `description`: string
  - `modified_at`: string
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `attachment_source`: string enum[LOCAL_FILE_UPLOAD, DRAWINGS, DOCUMENTS, PHOTOS, PDM]
  - `file_download_url`: string - Download URL for the attachment. Only populated when fetching a single attachment by ID or via bulk attachment APIs
  - `is_company_attachment`: boolean
  - `project_id`: string
  - `attachment_file_id`: string
  - `asset_id`: string - Asset ID this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_code`: string - Asset code this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_type_id`: string - Asset type ID when this attachment is stored at asset type scope (row has asset_type_id). Omitted for asset-only attachments.
  - `attachment_level`: string enum[COMPANY_ASSET, PROJECT_ASSET, COMPANY_ASSET_TYPE, PROJECT_ASSET_TYPE] - Scope at which this attachment row lives in the database: COMPANY_ASSET (asset-level, no project), PROJECT_ASSET (asset-level, project), COMPANY_ASSET_TYPE (type-level, no project), PROJECT_ASSET_TYPE (type-level, pro...

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/assets/{asset_id}/attachments

**Create Attachments**
Creates attachments for a given asset.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `asset_id` [path] string (required) - Unique identifier for the Asset
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `attachment_type_id`: string (required)
- `file_name`: string (required)
- `attachment_file_id`: string (required) - For attachment_source: - LOCAL_FILE_UPLOAD: attachment_file_id is the FAS ID. - DOCUMENTS: attachment_file_id is the document ID. - DRAWINGS: attachment_file_id is the drawing revision ID, but internally we store the ...
- `description`: string
- `attachment_source`: string enum[LOCAL_FILE_UPLOAD, DRAWINGS, DOCUMENTS, PHOTOS, PDM] (required) - Source of the attachment. For company asset attachments, only LOCAL_FILE_UPLOAD and DOCUMENTS are allowed. Project asset attachments support all sources: LOCAL_FILE_UPLOAD, DRAWINGS, DOCUMENTS, PHOTOS, PDM.

Response 201 (application/json): object

- `data`: array of object
  - `id`: string
  - `file_name`: string
  - `attachment_type_id`: string
  - `attachment_type_name`: string
  - `description`: string
  - `modified_at`: string
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `attachment_source`: string enum[LOCAL_FILE_UPLOAD, DRAWINGS, DOCUMENTS, PHOTOS, PDM]
  - `file_download_url`: string - Download URL for the attachment. Only populated when fetching a single attachment by ID or via bulk attachment APIs
  - `is_company_attachment`: boolean
  - `project_id`: string
  - `attachment_file_id`: string
  - `asset_id`: string - Asset ID this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_code`: string - Asset code this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_type_id`: string - Asset type ID when this attachment is stored at asset type scope (row has asset_type_id). Omitted for asset-only attachments.
  - `attachment_level`: string enum[COMPANY_ASSET, PROJECT_ASSET, COMPANY_ASSET_TYPE, PROJECT_ASSET_TYPE] - Scope at which this attachment row lives in the database: COMPANY_ASSET (asset-level, no project), PROJECT_ASSET (asset-level, project), COMPANY_ASSET_TYPE (type-level, no project), PROJECT_ASSET_TYPE (type-level, pro...

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/assets/{asset_id}/attachments/{attachment_id}

**Show Attachment**
Returns a specific attachment by its identifier.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `asset_id` [path] string (required) - Unique identifier for the Asset
- `attachment_id` [path] string (required) - Unique identifier for the Attachment
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: object
  - `id`: string
  - `file_name`: string
  - `attachment_type_id`: string
  - `attachment_type_name`: string
  - `description`: string
  - `modified_at`: string
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `attachment_source`: string enum[LOCAL_FILE_UPLOAD, DRAWINGS, DOCUMENTS, PHOTOS, PDM]
  - `file_download_url`: string - Download URL for the attachment. Only populated when fetching a single attachment by ID or via bulk attachment APIs
  - `is_company_attachment`: boolean
  - `project_id`: string
  - `attachment_file_id`: string
  - `asset_id`: string - Asset ID this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_code`: string - Asset code this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_type_id`: string - Asset type ID when this attachment is stored at asset type scope (row has asset_type_id). Omitted for asset-only attachments.
  - `attachment_level`: string enum[COMPANY_ASSET, PROJECT_ASSET, COMPANY_ASSET_TYPE, PROJECT_ASSET_TYPE] - Scope at which this attachment row lives in the database: COMPANY_ASSET (asset-level, no project), PROJECT_ASSET (asset-level, project), COMPANY_ASSET_TYPE (type-level, no project), PROJECT_ASSET_TYPE (type-level, pro...

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/assets/{asset_id}/attachments/{attachment_id}

**Update Attachment**
Updates a specific attachment. Updatable fields: attachment_type_id.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `asset_id` [path] string (required) - Unique identifier for the Asset
- `attachment_id` [path] string (required) - Unique identifier for the Attachment
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `op`: string enum[replace] (required) - The operation to perform e.g. `replace`
- `path`: string (required) - JSON Pointer to the target location e.g. `/description`
- `value`: object - The value to use for replace operations

Response 200 (application/json): object

- `data`: object
  - `id`: string
  - `file_name`: string
  - `attachment_type_id`: string
  - `attachment_type_name`: string
  - `description`: string
  - `modified_at`: string
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `attachment_source`: string enum[LOCAL_FILE_UPLOAD, DRAWINGS, DOCUMENTS, PHOTOS, PDM]
  - `file_download_url`: string - Download URL for the attachment. Only populated when fetching a single attachment by ID or via bulk attachment APIs
  - `is_company_attachment`: boolean
  - `project_id`: string
  - `attachment_file_id`: string
  - `asset_id`: string - Asset ID this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_code`: string - Asset code this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_type_id`: string - Asset type ID when this attachment is stored at asset type scope (row has asset_type_id). Omitted for asset-only attachments.
  - `attachment_level`: string enum[COMPANY_ASSET, PROJECT_ASSET, COMPANY_ASSET_TYPE, PROJECT_ASSET_TYPE] - Scope at which this attachment row lives in the database: COMPANY_ASSET (asset-level, no project), PROJECT_ASSET (asset-level, project), COMPANY_ASSET_TYPE (type-level, no project), PROJECT_ASSET_TYPE (type-level, pro...

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/assets/{asset_id}/attachments/{attachment_id}

**Delete Attachment**
Deletes a specific attachment.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `asset_id` [path] string (required) - Unique identifier for the Asset
- `attachment_id` [path] string (required) - Unique identifier for the Attachment
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/assets/attachments

**List All Attachments**
Returns a paginated list of all asset-level attachments plus asset-type-level attachments for the company with download URLs.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `filters[asset_id]` [query] string - Filter by asset IDs. Accepts a single ID or multiple comma-separated IDs (e.g., 'id1,id2,id3').
- `sort` [query] string enum[file_name, modified_at] - Sorting criteria in minus-based order format. Default sort order is ascending. Multiple sort criteria can be provided in CSV format, for example: sort=file_name,-modified_at.
- `page` [query] integer(int32) - One-based page index (1..N)
- `per_page` [query] integer(int32) - The size of the page to be returned. Maximum page size is 50.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `id`: string
  - `file_name`: string
  - `attachment_type_id`: string
  - `attachment_type_name`: string
  - `description`: string
  - `modified_at`: string
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `attachment_source`: string enum[LOCAL_FILE_UPLOAD, DRAWINGS, DOCUMENTS, PHOTOS, PDM]
  - `file_download_url`: string - Download URL for the attachment. Only populated when fetching a single attachment by ID or via bulk attachment APIs
  - `is_company_attachment`: boolean
  - `project_id`: string
  - `attachment_file_id`: string
  - `asset_id`: string - Asset ID this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_code`: string - Asset code this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_type_id`: string - Asset type ID when this attachment is stored at asset type scope (row has asset_type_id). Omitted for asset-only attachments.
  - `attachment_level`: string enum[COMPANY_ASSET, PROJECT_ASSET, COMPANY_ASSET_TYPE, PROJECT_ASSET_TYPE] - Scope at which this attachment row lives in the database: COMPANY_ASSET (asset-level, no project), PROJECT_ASSET (asset-level, project), COMPANY_ASSET_TYPE (type-level, no project), PROJECT_ASSET_TYPE (type-level, pro...

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/assets/{asset_id}/attachments/bulk_delete

**Bulk Delete Attachments**
Deletes multiple attachments in a single request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `asset_id` [path] string (required) - Unique identifier for the Asset
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `attachment_ids`: array of string - List of attachment IDs to delete. Required when select_all is false. e.g. `["ATT_001", "ATT_002"]`
- `select_all`: boolean - When true, deletes all attachments for the asset. Use excluded_attachment_ids to specify exceptions. When false (default), attachment_ids must be provided. e.g. `false`
- `excluded_attachment_ids`: array of string - List of attachment IDs to exclude from deletion. Only applicable when select_all is true. e.g. `["ATT_003"]`

Response 204: Attachments deleted successfully (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Asset Change History

Resource id: `company-asset-change-history`. Raw spec: `../openapi-raw/company-asset-change-history.json`. Web: https://developers.procore.com/reference/rest/company-asset-change-history?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/assets/{entity_type}/{entity_id}/history

**List Change History**
Returns change history for a specific entity

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `entity_type` [path] string enum[asset] (required) - The type of entity to retrieve change history for
- `entity_id` [path] string (required) - The unique identifier of the entity to retrieve change history for
- `filters[change_type]` [query] string - Filter by change type (e.g., asset_updated_asset_name)
- `filters[changed_by]` [query] string - Filter by user who made the change
- `filters[changed_at]` [query] string - Changed at filter (date range format: YYYY-MM-DD...YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ...YYYY-MM-DDTHH:MM:SSZ)
- `sort` [query] string enum[changed_at] - Sorting criteria in minus-based order format. Default sort order is ascending. Prefix with minus (-) for descending order. Default sort is by changed_at in descending order. Supports both snake_case and camelCase. Val...
- `page` [query] integer(int32) - Zero-based page index (0..N)
- `per_page` [query] integer(int32) - The number of items per page to be returned
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): oneOf(object)


Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/assets/{entity_type}/{entity_id}/history/filters/user

**List User Filter Options**
Returns all users who made changes to a specific entity for filtering change history

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `entity_type` [path] string enum[asset] (required) - The type of entity to retrieve filter options for
- `entity_id` [path] string (required) - The unique identifier of the entity to retrieve filter options for
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - User ID e.g. `12345`
  - `name`: string - User's full name e.g. `John Doe`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/assets/{entity_type}/{entity_id}/history/filters/change_type

**List Change Type Filter Options**
Returns all available Change Type values of a specific entity for filtering change history

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `entity_type` [path] string enum[asset] (required) - The type of entity to retrieve filter options for
- `entity_id` [path] string (required) - The unique identifier of the entity to retrieve filter options for
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `key`: string - The Change Type value e.g. `asset_updated_asset_name`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Asset Permissions

Resource id: `company-asset-permissions`. Raw spec: `../openapi-raw/company-asset-permissions.json`. Web: https://developers.procore.com/reference/rest/company-asset-permissions?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/assets/permissions

**List user permissions**
Returns the list of privileges/permissions for the current user

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of string

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Asset Statuses

Resource id: `company-asset-statuses`. Raw spec: `../openapi-raw/company-asset-statuses.json`. Web: https://developers.procore.com/reference/rest/company-asset-statuses?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/assets/asset_status

**List Asset Statuses**
Returns a list of Asset Statuses for a given company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `status_group_id` [query] string - Get statuses from given status group
- `sort` [query] string enum[id, company_id, status_name, description, color_code, display_order, modified_at, created_at] - Sorting criteria in minus-based order format. Default sort order is ascending. Multiple sort criteria can be provided in CSV format, for example: sort=status_name,-created_at. Default sorting is by company_id ascendin...
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `id`: string
  - `asset_status_group`: object
    - `id`: string
    - `name`: string
    - `metadata`: object
  - `status_group_id`: string (read-only) - ID of the status group this status belongs to
  - `status_name`: string
  - `description`: string
  - `color_code`: string
  - `display_order`: integer(int32)
  - `asset_system_state`: object
    - `id`: string
    - `name`: string
    - `metadata`: object

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Asset Type Available Fields

Resource id: `company-asset-type-available-fields`. Raw spec: `../openapi-raw/company-asset-type-available-fields.json`. Web: https://developers.procore.com/reference/rest/company-asset-type-available-fields?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/assets/settings/asset_types/{asset_type_id}/available_fields

**List Available Fields for Rule Configuration**
Returns the set of fields eligible for FIELD_DEFAULTS rule configuration on the given asset type: Procore default fields + configurable fieldset fields, with excluded field names / types (e.g., file uploads) filtered out.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `asset_type_id` [path] string (required) - Unique identifier for the asset type.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `name`: string - Field name (e.g. trade_id, custom_field_1234)
  - `label`: string - Display label
  - `data_type`: string enum[boolean, cost_code, datetime, datetime/time, datetime/mm_yyyy, datetime/yyyy, decimal, decimal/currency, location, login_information, login_information/project_directory, login_informations, ...] - FieldType key (string, boolean, decimal, lov_entry, etc.)
  - `variant`: string - Variant for the data type
  - `fieldset_id`: string - Fieldset id: '-1' for Procore defaults, external id for custom fields
  - `required`: boolean - Whether this field is required in the fieldset
  - `visible`: boolean - Whether this field is visible in the fieldset
  - `list_of_values`: array of object - List of values for LOV fields; null for Procore default LOV fields (values come from AssetStatus / AssetTrade) and for non-LOV fields
    - `id`: integer(int64)
    - `label`: string
    - `code`: string
    - `position`: integer(int32)
    - `active`: boolean

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Asset Type Field Rules

Resource id: `company-asset-type-field-rules`. Raw spec: `../openapi-raw/company-asset-type-field-rules.json`. Web: https://developers.procore.com/reference/rest/company-asset-type-field-rules?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/assets/settings/asset_types/{asset_type_id}/field_rules

**List Field Rules for an Asset Type**
Returns field rules (FIELD_DEFAULTS) scoped to the given asset type. Optionally filter by rule_type and fieldset_id. Used by the admin UI's configured fields table and by runtime clients that apply defaults / read-only flags during asset creation.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `asset_type_id` [path] string (required) - Unique identifier for the asset type.
- `rule_type` [query] string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Optional rule type filter (e.g. FIELD_DEFAULTS)
- `rule_types` [query] array of string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Optional repeatable rule-type filter (e.g. rule_type=MANDATORY&rule_type=WARNING). When provided, takes precedence over the single rule_type param.
- `fieldset_id` [query] string - Optional fieldset id filter ("-1" for Procore defaults)
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - Unique identifier of the field rule
  - `company_id`: integer(int64) - Company this rule belongs to
  - `project_id`: integer(int64) - Project this rule applies to; null for company-level rules
  - `asset_type_id`: string - Asset type this rule applies to. Populated for FIELD_DEFAULTS; null for NAMING.
  - `fieldset_id`: string - Fieldset scope. '-1' for Procore default fields, external configurable fieldset id for custom fields. Null for NAMING.
  - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Kind of rule
  - `trigger_field`: string - Field that triggers this rule (e.g. asset_code for NAMING, custom_field_1234 for FIELD_DEFAULTS)
  - `rule_name`: string - Name of the rule
  - `description`: string - Optional description of the rule
  - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
  - `conditions`: object - Conditions AST for a conditional-validation rule
    - `schema_version`: integer(int32) (required) - Version of the conditions schema
    - `root`: object (required) - Root node of the recursive conditions tree
  - `rule_group_id`: string - Group id linking granular rules authored from one admin UI row. Null when ungrouped.
  - `expression`: string - Derived expression string (e.g. 'default=Carrier, readOnly=true')
  - `is_active`: boolean - Whether the rule is active and applied; false to deactivate without deleting
  - `lov_fields`: object
  - `validation_errors`: array of object - Validation issues detected on this rule. Null when the rule is valid; a non-empty list otherwise.
    - `code`: string enum[FIELDSET_NOT_FOUND, FIELDSET_NOT_MAPPED, FIELD_NOT_FOUND, LOV_ENTRY_NOT_FOUND, VENDOR_NOT_FOUND, STATUS_NOT_FOUND, STATUS_GROUP_MISMATCH, CONDITIONAL_TARGET_FIELD_INELIGIBLE, CONDITIONAL_TARGET_FIELD_ALWAYS_REQUIRED, ASSET_TYPE_NOT_FOUND, TRADE_NOT_FOUND, ASSET_TYPE_HIDDEN_AT_PROJECT, ...] - Code identifying the class of issue.
    - `severity`: string - Severity of the issue ("error" or "warning").
    - `cause`: string - Description of what went wrong.
    - `effect`: string - Description of the impact of this issue.
    - `remedy`: string - Guidance on how an admin can resolve the issue.
  - `overridden`: boolean - Project-scope overlay indicator. Populated only in the project-scoped list view: true when a project rule overrides the company configuration for this field (value and/or editability differs, or no company rule exists...
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Asset Types

Resource id: `company-asset-types`. Raw spec: `../openapi-raw/company-asset-types.json`. Web: https://developers.procore.com/reference/rest/company-asset-types?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/assets/asset_types

**List Asset Types**
Returns a list of Assets Types for a given Company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `asset_type_ids` [query] string - Comma-separated list of Asset Type IDs to filter by
- `include_asset_counts` [query] boolean - When true, each item includes assetCount: assets assigned directly to this type. Defaults to false when omitted.
- `is_asset` [query] boolean - Filter by is_asset flag (true/false)
- `eligible_sub_asset_of` [query] string - Parent asset ID. When supplied, returns only the asset types eligible to receive sub-assets of that parent (a flat, eligibility-scoped list for the Link Sub-Assets dialog).
- `sort` [query] string enum[id, code, name, description, modified_at, created_at, display_order] - Sorting criteria in minus-based order format. Default sort order is ascending. Multiple sort criteria can be provided in CSV format, for example: sort=name,-created_at. Default sorting is by display_order in descendin...
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `id`: string
  - `name`: string
  - `code`: string
  - `description`: string
  - `parent_type_id`: string - Deprecated: use 'parents'. Single parent type ID kept for backward compatibility; set to the lowest-display-order parent.
  - `parents`: array of object
    - `parent_type_id`: string - ID of the parent asset type for this link. Null denotes a root (top-level) membership.
    - `display_order`: integer(int32) - Order of this child within the parent's sibling group.
  - `active`: boolean
  - `modified_at`: string(date-time)
  - `created_at`: string(date-time)
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `asset_status_group`: object
    - `id`: string
    - `name`: string
    - `metadata`: object
  - `fieldset_dto`: object
    - `id`: string
    - `name`: string
    - `metadata`: object
  - `company_id`: string
  - `project_id`: string
  - `is_leaf`: boolean
  - `is_asset`: boolean
  - `has_assets`: boolean
  - `display_order`: integer(int32)
  - `overridden`: boolean - True when the Asset Type ID is overridden for this project. Project-scoped reads only.
  - `asset_count`: integer(int64)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Assets

Resource id: `company-assets`. Raw spec: `../openapi-raw/company-assets.json`. Web: https://developers.procore.com/reference/rest/company-assets?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/assets

**List Assets**
Returns List of Assets by given Company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `search` [query] string - Search query. Searches across: asset_id (asset_code), asset_name, description, created_by (user name), modified_by (user name), asset_type (name), asset_status (name), trade (name), and custom field values.
- `view` [query] string enum[ids, compact, normal, extended] - The view type
- `include_profile_image` [query] boolean - Include profile image URLs in response. Profile image URLs are included in all views when this parameter is true.
- `include_bim_info` [query] boolean - Include BIM scene and object information in response. BIM info is included when this parameter is true.
- `wrap_custom_fields` [query] boolean - When true, wraps each custom field value as {"value": ...} and renames "name" to "label" inside LOV objects.
- `filters[id]` [query] string - Filter by asset IDs. Accepts a single ID or multiple comma-separated IDs (e.g., 'id1,id2,id3').
- `filters[asset_type_id]` [query] string - Filter by asset type IDs. Accepts a single ID or multiple comma-separated IDs (e.g., 'typeId1,typeId2').
- `filters[created_at]` [query] string - Created at filter (date range format: YYYY-MM-DD...YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ...YYYY-MM-DDTHH:MM:SSZ)
- `filters[modified_at]` [query] string - Updated at filter (date range format: YYYY-MM-DD...YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ...YYYY-MM-DDTHH:MM:SSZ)
- `filters[asset_status_id]` [query] string - Filter by asset status IDs. Accepts a single ID or multiple comma-separated IDs (e.g., 'statusId1,statusId2').
- `filters[location_id]` [query] string - Filter by location IDs. Accepts a single ID or multiple comma-separated IDs (e.g., 'locId1,locId2').
- `filters[trade_id]` [query] string - Filter by trade IDs. Accepts a single ID or multiple comma-separated IDs (e.g., 'tradeId1,tradeId2').
- `filters[scene_id]` [query] string - Filter by BIM scene IDs. Accepts a single ID or multiple comma-separated IDs (e.g., 'sceneId1,sceneId2').
- `filters[project_id]` [query] string - Filter by project IDs. Accepts a single ID or multiple comma-separated IDs (e.g., '12345,67890').
- `filters[exclude_project_id]` [query] string - Exclude assets by project IDs. Accepts a single ID or multiple comma-separated IDs (e.g., '12345,67890'). Assets belonging to these project IDs will be excluded from the results.
- `filters[asset_code]` [query] string - Filter by asset IDs (asset_code in API, also referred as asset_id). Case-insensitive. Accepts a single ID or multiple comma-separated IDs (e.g., 'ASSET-001,ASSET-002').
- `filters[custom_field_id]` [query] string - Filter by custom field values. Supported only for single select, multi-select, and datetime fields. Can be used multiple times for different custom fields. Supports single values (e.g., 'filters[custom_field_123]=id1'...
- `sort` [query] string enum[created_at, modified_at, asset_name, asset_code, asset_type, asset_status, trade] - Sorting criteria in minus-based order format. Default sort order is ascending. Multiple sort criteria can be provided in CSV format, for example: sort=asset_name,-modified_at.
- `page` [query] integer(int32) - One-based page index (1..N)
- `per_page` [query] integer(int32) - The size of the page to be returned
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): oneOf(object | object | object | object)


Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/assets

**Create Asset**
Creates a new company asset with the provided details

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `asset_type_id`: string (required) - Asset type ID (primary key of the asset type). Must have Is Asset enabled for that type.
- `asset_name`: string - Name of the asset.
- `asset_status_id`: string (required) - Asset status ID.
- `asset_code`: string - Unique identifier for the asset (also referred to as asset_code in API). Must be unique at company level (case-insensitive). Optional when an active naming rule exists—the ID (code) will be auto-generated.
- `description`: string - Description of the asset
- `location_id`: string - Location ID where the asset is located (only applicable for project asset)
- `trade_id`: string - Trade ID associated with the asset
- `latitude`: number(double) - Latitude must be provided together with longitude, or both must be omitted.(only applicable for project asset)
- `longitude`: number(double) - Longitude must be provided together with latitude, or both must be omitted.(only applicable for project asset)
- `profile_image_id`: string - Profile image FAS ID
- `parent_asset_id`: string - Parent asset ID. Optional. When provided, creates a parent-child relationship. The parent must exist, belong to the same company, and be in the same asset type hierarchy.
- `custom_fields`: object - Custom fields map. Key: 'custom\_field\_{id}'. Supported types: STRING (text), RICH_TEXT (HTML), BOOLEAN, DECIMAL, DATETIME (ISO 8601), LOV_ENTRY ({id, name}), LOV_ENTRIES ([{id, name}]). Field definitions available v... e.g. `{"custom_field_123": "text value", "custom_field_456": {"id": "1", "name": "O...`

Response 201 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/assets/{asset_id}/link_sub_assets

**Link Sub-Assets to a Parent Asset**
Links one or more existing assets as sub-assets of the parent asset identified by asset_id. All-or-nothing: any hierarchy rule violation rejects the whole call with HTTP 422. When the parent's ancestor chain is not in the children's project and cascadeAncestors is false (default), the call is rejected with HTTP 409; retry with cascadeAncestors=true to pull the ancestors into the project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `asset_id` [path] string (required) - Unique identifier for the parent asset
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `asset_ids`: array of string - Asset ids to link as sub-assets of the parent asset. Must contain at least one id and no more than 500 ids. e.g. `["01J0ABCXYZ123456789ABCDEF0", "01J0ABCXYZ123456789ABCDEF1"]`
- `cascade_ancestors`: boolean - If true, transparently pull the parent's ancestor chain into the children's project when the chain is not already there. If false (default), the request returns 409 listing the ancestors that need pulling in so the UI...

Response 200 (application/json): object

- `data`: object - Successful response for the Link-Sub-Assets endpoint. Returned only when every selected asset was linked; rule violations surface as 422 instead.
  - `linked_count`: integer(int32) - Number of assets linked as sub-assets in this request. e.g. `12`
  - `linked_asset_ids`: array of string - Asset ids that were linked as sub-assets of the parent. e.g. `["01J0ABCXYZ123456789ABCDEF0", "01J0ABCXYZ123456789ABCDEF1"]`
  - `message`: string - Human-readable summary, e.g. "12 assets linked as sub-assets of PUMP-001". e.g. `12 assets linked as sub-assets of PUMP-001`

Error responses: 400, 401, 403, 404, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/assets/{asset_id}

**Show Asset**
Returns Asset Details by given Company & Asset

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `asset_id` [path] string (required) - Unique identifier for the asset
- `wrap_custom_fields` [query] boolean - When true, wraps each custom field value as {"value": ...} and renames "name" to "label" inside LOV objects.
- `custom_field_format` [query] string - Custom field encoding. 'standard' (default) uses the existing published 200 schema; 'mobile' returns a bounded subset (AssetMobileResponse) with each custom field as {data_type, value} and (on update) accepts id-only ...
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/assets/{asset_id}

**Update Asset**
Updates the company asset model based on keys in the request body

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `asset_id` [path] string (required) - Unique identifier for the asset
- `company_id` [path] string (required) - Unique identifier for the company.
- `acknowledge_warnings` [query] boolean - When true, acknowledges field-default warnings and applies default values for read-only fields whose current value differs from the configured default.
- `wrap_custom_fields` [query] boolean - When true, wraps each custom field value as {"value": ...} and renames "name" to "label" inside LOV objects.
- `custom_field_format` [query] string - Custom field encoding. 'standard' (default) uses the existing published 200 schema; 'mobile' returns a bounded subset (AssetMobileResponse) with each custom field as {data_type, value} and (on update) accepts id-only ...
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json):

- `asset_type_id`: string - Asset type ID. Must have Is Asset enabled for that type. If asset type is changed, all custom fields will be reset and only the ones provided in this request will be set.
- `asset_name`: string - Name of the asset
- `asset_status_id`: string - Asset status ID
- `notes`: object - Notes by context. Keys are context identifiers; value is the note text. Supported keys: "asset_status" (stored only when status is changed in this request), "project_assignment" (stored when provided). Enables adding ... e.g. `{"asset_status": "Reason for status change", "project_assignment": "Assignmen...`
- `asset_code`: string - Unique identifier for the asset (also referred to as asset_code in API)
- `description`: string - Description of the asset. Pass null to clear the value.
- `location_id`: string - Location ID. Pass null to clear the value.
- `trade_id`: string - Trade ID. Pass null to clear the value.
- `latitude`: number(double) - Latitude must be provided together with longitude, or both must be omitted. Pass null to clear.
- `longitude`: number(double) - Longitude must be provided together with latitude, or both must be omitted. Pass null to clear.
- `parent_asset_id`: string - Parent asset ID. Pass null to remove parent (make standalone). The parent must exist, belong to the same company, and be in the same asset type hierarchy.
- `cascade_ancestors`: boolean - When the new parent (or any of its ancestors) is at company scope or on a different project than the child, opt in to cascade-pull those ancestors into the child's project. Defaults to false (returns HTTP 409 with the... e.g. `false`
- `profile_image_id`: string - Profile image FAS ID. Pass null to clear the value.
- `custom_fields`: object - Custom fields map with merge semantics. Key: 'custom\_field\_{id}'. Only fields included in this map will be updated - absent fields remain unchanged. To remove a specific field, set its value to null. To clear ALL cu... e.g. `{"custom_field_123": "text value", "custom_field_456": {"id": "1", "name": "O...`

Response 200 (application/json): oneOf(object | object | object)


Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/assets/{asset_id}

**Delete Asset**
Deletes a company asset and all its associated attachments and change history. If the asset has descendants in the asset hierarchy, the caller must opt in with ?cascade=true; otherwise the request fails with HTTP 409 and the response body lists the blocking descendants so the UI can prompt for confirmation.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `asset_id` [path] string (required) - Unique identifier for the asset
- `cascade` [query] boolean - When true, also delete every descendant asset in the subtree atomically. Defaults to false; required when the asset has children.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 204: Asset deleted successfully (no body)

Error responses: 400, 401, 403, 404, 409 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/assets/{asset_id}/delete_preview

**Preview Asset Deletion**
Returns the impact of deleting the given company asset, including the count and lightweight projections of every descendant in the subtree. Read-only — no rows are modified.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `asset_id` [path] string (required) - Unique identifier for the asset whose deletion is being previewed.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: object - Impact summary for a hierarchy-aware single-asset delete, including the leaves-first projections of every descendant that would be cascaded.
  - `asset_id`: string - ID of the asset whose deletion is being previewed.
  - `descendant_count`: integer(int32) - Number of descendant assets that would be cascaded. e.g. `4`
  - `total_impacted`: integer(int32) - Total number of assets impacted including the root (descendantCount + 1). e.g. `5`
  - `descendants`: array of object
    - `id`: string - Descendant asset ID.
    - `asset_code`: string - Descendant asset code. e.g. `PRJ-HVAC-0042`
    - `name`: string - Descendant asset name.
    - `depth`: integer(int32) - Depth from the root being deleted (1 = direct child). e.g. `2`
    - `scope`: string enum[company, project] - Asset scope: 'company' if the asset originated in the company register, 'project' if it was created directly in a project. Project-context callers cannot cascade-delete subtrees containing company-scoped descendants. e.g. `project`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/assets/by_code/{asset_code}

**Show Asset by Code**
Returns Asset Details by given Asset ID / Asset Code (case-insensitive)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `asset_code` [path] string (required) - Asset ID / asset code identifier (case-insensitive)
- `wrap_custom_fields` [query] boolean - When true, wraps each custom field value as {"value": ...} and renames "name" to "label" inside LOV objects.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: object - Asset item in normal view
  - `id`: string - Unique asset identifier e.g. `ASSET_001`
  - `asset_name`: string - Name of the asset e.g. `HVAC Unit 1`
  - `asset_code`: string - Unique Asset ID (asset_code in API) e.g. `HVAC-001`
  - `asset_status`: object - Reference object with id, name, and metadata (normal/extended view)
    - `id`: string - Unique identifier e.g. `ABC123XYZ`
    - `name`: string - Display name e.g. `Active`
    - `metadata`: object - Additional metadata. Content varies by reference type: asset_status has status_group_id and color_code; asset_type has Asset Type ID (code in metadata) and fieldset_id; location may have parent_id. e.g. `{"status_group_id": "STATUS_GRP_001", "color_code": "green"}`
  - `description`: string - Asset description
  - `asset_type`: object - Reference object with id, name, and metadata (normal/extended view)
    - `id`: string - Unique identifier e.g. `ABC123XYZ`
    - `name`: string - Display name e.g. `Active`
    - `metadata`: object - Additional metadata. Content varies by reference type: asset_status has status_group_id and color_code; asset_type has Asset Type ID (code in metadata) and fieldset_id; location may have parent_id. e.g. `{"status_group_id": "STATUS_GRP_001", "color_code": "green"}`
  - `location`: object - Reference object with id, name, and metadata (normal/extended view)
    - `id`: string - Unique identifier e.g. `ABC123XYZ`
    - `name`: string - Display name e.g. `Active`
    - `metadata`: object - Additional metadata. Content varies by reference type: asset_status has status_group_id and color_code; asset_type has Asset Type ID (code in metadata) and fieldset_id; location may have parent_id. e.g. `{"status_group_id": "STATUS_GRP_001", "color_code": "green"}`
  - `trade`: object - Reference object with id, name, and metadata (normal/extended view)
    - `id`: string - Unique identifier e.g. `ABC123XYZ`
    - `name`: string - Display name e.g. `Active`
    - `metadata`: object - Additional metadata. Content varies by reference type: asset_status has status_group_id and color_code; asset_type has Asset Type ID (code in metadata) and fieldset_id; location may have parent_id. e.g. `{"status_group_id": "STATUS_GRP_001", "color_code": "green"}`
  - `company_id`: string - Company identifier e.g. `100`
  - `project_id`: string - Project identifier (present for project-level assets) e.g. `200`
  - `modified_at`: string(date-time) - Last modification timestamp e.g. `2025-01-15T10:30:00Z`
  - `created_at`: string(date-time) - Creation timestamp e.g. `2025-01-01T08:00:00Z`
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `custom_fields`: object - Custom fields as key-value pairs. Keys are field identifiers, values vary by field type. e.g. `{"custom_field_1": "value", "custom_field_2": true}`
  - `profile_image_id`: string - Profile image attachment ID e.g. `fas-IMG001`
  - `notes`: object - Notes by context. Keys: project_assignment, asset_status, etc. Exposes all context notes. e.g. `{"project_assignment": "Assigned to project X", "asset_status": "Status chang...`
  - `profile_image_url`: string - Profile image URL. Only populated when include_profile_image=true query parameter is set.
  - `scene_bim_object_info`: object - BIM scene and object information. Populated when include_bim_info=true.
    - `scene_id`: string (required) - Scene identifier e.g. `SCENE_001`
    - `procore_object_id`: string (required)
    - `object_id`: string - BIM object identifier within the scene e.g. `OBJ_001`
    - `procore_instance_id`: string - Procore instance ID for BIM object e.g. `INST_001`
  - `latitude`: number(double) - Latitude coordinate for asset location
  - `longitude`: number(double) - Longitude coordinate for asset location
  - `scope`: string enum[company, project] - Scope of the asset (e.g., company, project). e.g. `project`
  - `attachment_count`: integer(int32) - Number of attachments for this asset
  - `project`: object - Reference object with id and name (compact view - no metadata)
    - `id`: string - Unique identifier e.g. `ABC123XYZ`
    - `name`: string - Display name e.g. `Active`
  - `parent_asset`: object - Parent asset reference with id, name, and asset_code
    - `id`: string - Unique identifier of the parent asset e.g. `ASSET_001`
    - `name`: string - Name of the parent asset e.g. `HVAC Unit 1`
    - `asset_code`: string - Asset code of the parent asset e.g. `HVAC-001`
  - `parent_asset_code`: string - Deprecated: use parent_asset.asset_code instead. Asset code of the parent asset. Null when the asset has no parent.
  - `punch_list`: integer(int32) - Number of punch list items linked to this asset
  - `observations`: integer(int32) - Number of observations linked to this asset
  - `inspections`: integer(int32) - Number of inspections linked to this asset
  - `inspection_items`: integer(int32) - Number of inspection items linked to this asset
  - `rfi`: integer(int32) - Number of RFIs linked to this asset
  - `submittals`: integer(int32) - Number of submittals linked to this asset
  - `incidents`: integer(int32) - Number of incidents linked to this asset
  - `linkable`: boolean - Whether this asset can be linked to other Procore items
  - `has_children`: boolean - Whether this asset has child assets
  - `children_count`: integer(int32) - Number of direct child assets. Null when hasChildren is false.

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Available Fields Multi Asset Type

Resource id: `company-available-fields-multi-asset-type`. Raw spec: `../openapi-raw/company-available-fields-multi-asset-type.json`. Web: https://developers.procore.com/reference/rest/company-available-fields-multi-asset-type?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/assets/settings/field_rules/available_fields

**List Available Fields Across Asset Types**
Returns the intersection of rule-eligible fields common to every supplied asset type, for the grouped conditional-rule builder of the given rule_type (MANDATORY or WARNING). Omit asset_type_id to target all asset types. Otherwise, supply asset types as repeated asset_type_id params and/or a single comma-separated value (e.g. asset_type_id=typeA,typeB). A blank/empty value means 'all asset types'.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `rule_type` [query] string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] (required) - Rule type the fields are being authored for (MANDATORY or WARNING). Determines the field-eligibility semantics.
- `asset_type_id` [query] array of string - Optional asset type ids. Omit for all asset types; or repeat the param and/or pass a single comma-separated value (e.g. asset_type_id=typeA,typeB). A blank value also means 'all asset types'.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `name`: string - Field name (e.g. trade_id, custom_field_1234)
  - `label`: string - Display label
  - `data_type`: string enum[boolean, cost_code, datetime, datetime/time, datetime/mm_yyyy, datetime/yyyy, decimal, decimal/currency, location, login_information, login_information/project_directory, login_informations, ...] - FieldType key (string, boolean, decimal, lov_entry, etc.)
  - `variant`: string - Variant for the data type
  - `fieldset_id`: string - Fieldset id: '-1' for Procore defaults, external id for custom fields
  - `required`: boolean - Whether this field is required in the fieldset
  - `visible`: boolean - Whether this field is visible in the fieldset
  - `list_of_values`: array of object - List of values for LOV fields; null for Procore default LOV fields (values come from AssetStatus / AssetTrade) and for non-LOV fields
    - `id`: integer(int64)
    - `label`: string
    - `code`: string
    - `position`: integer(int32)
    - `active`: boolean

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Default Field Values

Resource id: `company-default-field-values`. Raw spec: `../openapi-raw/company-default-field-values.json`. Web: https://developers.procore.com/reference/rest/company-default-field-values?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/assets/field_values

**List Default Field Values**
Returns default field values for a given field code.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `field_code` [query] string (required) - Unique field code to retrieve values for (e.g., ATTACHMENT_TYPE)
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `id`: string
  - `name`: string
  - `key`: string
  - `active`: boolean
  - `company_id`: string
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Field Rules

Resource id: `company-field-rules`. Raw spec: `../openapi-raw/company-field-rules.json`. Web: https://developers.procore.com/reference/rest/company-field-rules?version=latest
Product lines: asset-register

### POST /rest/v2.0/companies/{company_id}/assets/settings/field_rules

**Bulk Create Field Rules**
Creates multiple field rules in a single request. Each item is validated independently; the response reports successes and failures per item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Rule type. Defaults to NAMING for backward compatibility.
- `asset_type_id`: string - Asset type id (required for FIELD_DEFAULTS; null for NAMING).
- `fieldset_id`: string - Fieldset id (required for FIELD_DEFAULTS). '-1' for Procore default fields; external configurable fieldset id for custom fields. Null for NAMING.
- `trigger_field`: string (required) - Trigger field. For NAMING: asset_code. For FIELD_DEFAULTS: the field this rule configures (e.g., custom_field_1234, trade_id).
- `rule_name`: string - Display name for the rule. Optional: when omitted or blank, the backend auto-generates a scope-indicative name of the form '{rule_type}::{company_id}::{asset_type_id|NA}::{fieldset_id|NA}::{trigger_field}'.
- `description`: string - Optional description
- `is_active`: boolean - Whether the rule is created active. Absent/null defaults to active. Set false to create an inactive rule directly (e.g. a draft); for MANDATORY/WARNING rules an inactive rule skips conflict validation because inactive...
- `rule_group_id`: string - Groups granular rules created from a single admin UI row (MANDATORY/WARNING). Normally set by the grouped create API; optional and null for standalone/legacy clients.
- `conditions`: object - Conditions AST for a conditional-validation rule
  - `schema_version`: integer(int32) (required) - Version of the conditions schema
  - `root`: object (required) - Root node of the recursive conditions tree
- `definition`: oneOf(object | object | object) (required) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.

Response 200 (application/json): object

- `data`: object - Response for bulk field rule create or update operations
  - `succeeded`: array of object - Rules that were successfully created or updated
    - `id`: string - Unique identifier of the field rule
    - `company_id`: integer(int64) - Company this rule belongs to
    - `project_id`: integer(int64) - Project this rule applies to; null for company-level rules
    - `asset_type_id`: string - Asset type this rule applies to. Populated for FIELD_DEFAULTS; null for NAMING.
    - `fieldset_id`: string - Fieldset scope. '-1' for Procore default fields, external configurable fieldset id for custom fields. Null for NAMING.
    - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Kind of rule
    - `trigger_field`: string - Field that triggers this rule (e.g. asset_code for NAMING, custom_field_1234 for FIELD_DEFAULTS)
    - `rule_name`: string - Name of the rule
    - `description`: string - Optional description of the rule
    - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
    - `conditions`: object - Conditions AST for a conditional-validation rule
    - `rule_group_id`: string - Group id linking granular rules authored from one admin UI row. Null when ungrouped.
    - `expression`: string - Derived expression string (e.g. 'default=Carrier, readOnly=true')
    - `is_active`: boolean - Whether the rule is active and applied; false to deactivate without deleting
    - `lov_fields`: object
    - `validation_errors`: array of object - Validation issues detected on this rule. Null when the rule is valid; a non-empty list otherwise.
    - `overridden`: boolean - Project-scope overlay indicator. Populated only in the project-scoped list view: true when a project rule overrides the company configuration for this field (value and/or editability differs, or no company rule exists...
    - `created_at`: string(date-time)
    - `modified_at`: string(date-time)
    - `created_by`: object - Contact Information
    - `modified_by`: object - Contact Information
  - `failures`: array of object - Rules that failed validation or persistence
    - `index`: integer(int32) - Zero-based index of the item in the request list
    - `rule_id`: string - Rule ID (populated for update failures; null for create failures)
    - `trigger_field`: string - Trigger field (populated for create failures; null for update failures)
    - `error`: string - Error message describing why the operation failed

Response 207 (application/json): object

- `data`: object - Response for bulk field rule create or update operations
  - `succeeded`: array of object - Rules that were successfully created or updated
    - `id`: string - Unique identifier of the field rule
    - `company_id`: integer(int64) - Company this rule belongs to
    - `project_id`: integer(int64) - Project this rule applies to; null for company-level rules
    - `asset_type_id`: string - Asset type this rule applies to. Populated for FIELD_DEFAULTS; null for NAMING.
    - `fieldset_id`: string - Fieldset scope. '-1' for Procore default fields, external configurable fieldset id for custom fields. Null for NAMING.
    - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Kind of rule
    - `trigger_field`: string - Field that triggers this rule (e.g. asset_code for NAMING, custom_field_1234 for FIELD_DEFAULTS)
    - `rule_name`: string - Name of the rule
    - `description`: string - Optional description of the rule
    - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
    - `conditions`: object - Conditions AST for a conditional-validation rule
    - `rule_group_id`: string - Group id linking granular rules authored from one admin UI row. Null when ungrouped.
    - `expression`: string - Derived expression string (e.g. 'default=Carrier, readOnly=true')
    - `is_active`: boolean - Whether the rule is active and applied; false to deactivate without deleting
    - `lov_fields`: object
    - `validation_errors`: array of object - Validation issues detected on this rule. Null when the rule is valid; a non-empty list otherwise.
    - `overridden`: boolean - Project-scope overlay indicator. Populated only in the project-scoped list view: true when a project rule overrides the company configuration for this field (value and/or editability differs, or no company rule exists...
    - `created_at`: string(date-time)
    - `modified_at`: string(date-time)
    - `created_by`: object - Contact Information
    - `modified_by`: object - Contact Information
  - `failures`: array of object - Rules that failed validation or persistence
    - `index`: integer(int32) - Zero-based index of the item in the request list
    - `rule_id`: string - Rule ID (populated for update failures; null for create failures)
    - `trigger_field`: string - Trigger field (populated for create failures; null for update failures)
    - `error`: string - Error message describing why the operation failed

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PUT /rest/v2.0/companies/{company_id}/assets/settings/field_rules

**Bulk Update Field Rules**
Updates multiple field rules in a single request. Each item carries its own rule_id and is validated independently; the response reports successes and failures per item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `rule_id`: string (required) - ID of the field rule to update
- `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Optional metadata. NOT updatable: if provided, must match the existing rule's type; the server rejects mismatches.
- `fieldset_id`: string - New fieldset id (FIELD_DEFAULTS only)
- `rule_name`: string - Display name for the rule
- `description`: string - Optional description
- `definition`: object - Rule definition; shape must match the rule's stored type
- `is_active`: boolean - Whether the rule is active

Response 200 (application/json): object

- `data`: object - Response for bulk field rule create or update operations
  - `succeeded`: array of object - Rules that were successfully created or updated
    - `id`: string - Unique identifier of the field rule
    - `company_id`: integer(int64) - Company this rule belongs to
    - `project_id`: integer(int64) - Project this rule applies to; null for company-level rules
    - `asset_type_id`: string - Asset type this rule applies to. Populated for FIELD_DEFAULTS; null for NAMING.
    - `fieldset_id`: string - Fieldset scope. '-1' for Procore default fields, external configurable fieldset id for custom fields. Null for NAMING.
    - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Kind of rule
    - `trigger_field`: string - Field that triggers this rule (e.g. asset_code for NAMING, custom_field_1234 for FIELD_DEFAULTS)
    - `rule_name`: string - Name of the rule
    - `description`: string - Optional description of the rule
    - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
    - `conditions`: object - Conditions AST for a conditional-validation rule
    - `rule_group_id`: string - Group id linking granular rules authored from one admin UI row. Null when ungrouped.
    - `expression`: string - Derived expression string (e.g. 'default=Carrier, readOnly=true')
    - `is_active`: boolean - Whether the rule is active and applied; false to deactivate without deleting
    - `lov_fields`: object
    - `validation_errors`: array of object - Validation issues detected on this rule. Null when the rule is valid; a non-empty list otherwise.
    - `overridden`: boolean - Project-scope overlay indicator. Populated only in the project-scoped list view: true when a project rule overrides the company configuration for this field (value and/or editability differs, or no company rule exists...
    - `created_at`: string(date-time)
    - `modified_at`: string(date-time)
    - `created_by`: object - Contact Information
    - `modified_by`: object - Contact Information
  - `failures`: array of object - Rules that failed validation or persistence
    - `index`: integer(int32) - Zero-based index of the item in the request list
    - `rule_id`: string - Rule ID (populated for update failures; null for create failures)
    - `trigger_field`: string - Trigger field (populated for create failures; null for update failures)
    - `error`: string - Error message describing why the operation failed

Response 207 (application/json): object

- `data`: object - Response for bulk field rule create or update operations
  - `succeeded`: array of object - Rules that were successfully created or updated
    - `id`: string - Unique identifier of the field rule
    - `company_id`: integer(int64) - Company this rule belongs to
    - `project_id`: integer(int64) - Project this rule applies to; null for company-level rules
    - `asset_type_id`: string - Asset type this rule applies to. Populated for FIELD_DEFAULTS; null for NAMING.
    - `fieldset_id`: string - Fieldset scope. '-1' for Procore default fields, external configurable fieldset id for custom fields. Null for NAMING.
    - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Kind of rule
    - `trigger_field`: string - Field that triggers this rule (e.g. asset_code for NAMING, custom_field_1234 for FIELD_DEFAULTS)
    - `rule_name`: string - Name of the rule
    - `description`: string - Optional description of the rule
    - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
    - `conditions`: object - Conditions AST for a conditional-validation rule
    - `rule_group_id`: string - Group id linking granular rules authored from one admin UI row. Null when ungrouped.
    - `expression`: string - Derived expression string (e.g. 'default=Carrier, readOnly=true')
    - `is_active`: boolean - Whether the rule is active and applied; false to deactivate without deleting
    - `lov_fields`: object
    - `validation_errors`: array of object - Validation issues detected on this rule. Null when the rule is valid; a non-empty list otherwise.
    - `overridden`: boolean - Project-scope overlay indicator. Populated only in the project-scoped list view: true when a project rule overrides the company configuration for this field (value and/or editability differs, or no company rule exists...
    - `created_at`: string(date-time)
    - `modified_at`: string(date-time)
    - `created_by`: object - Contact Information
    - `modified_by`: object - Contact Information
  - `failures`: array of object - Rules that failed validation or persistence
    - `index`: integer(int32) - Zero-based index of the item in the request list
    - `rule_id`: string - Rule ID (populated for update failures; null for create failures)
    - `trigger_field`: string - Trigger field (populated for create failures; null for update failures)
    - `error`: string - Error message describing why the operation failed

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PUT /rest/v2.0/companies/{company_id}/assets/settings/field_rules/{rule_id}

**Update Field Rule**
Updates an existing field rule's definition / metadata. Scope fields (assetTypeId, fieldsetId, triggerField, ruleType) cannot be changed -- delete and recreate instead.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `rule_id` [path] string (required) - Unique identifier for the field rule.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Optional metadata. NOT updatable: if provided, must match the existing rule's type; the server rejects mismatches.
- `fieldset_id`: string - New fieldset id. FIELD_DEFAULTS only; ignored / rejected for NAMING. Provided to recover a rule whose asset type's fieldset has been changed by an admin. Must match the asset type's current fieldset and must contain t...
- `rule_name`: string - Display name for the rule
- `description`: string - Optional description
- `definition`: object - Rule definition. Shape must match the rule's stored type — for NAMING, supply expression_fields; for FIELD_DEFAULTS, supply actions. Sent as a raw JSON object; the server converts it to the correct subtype and runs ex...
- `is_active`: boolean - Whether the rule is active. Set to false to deactivate.
- `conditions`: object - Conditions AST for a conditional-validation rule
  - `schema_version`: integer(int32) (required) - Version of the conditions schema
  - `root`: object (required) - Root node of the recursive conditions tree

Response 200 (application/json): object

- `data`: object - Field rule response (NAMING or FIELD_DEFAULTS)
  - `id`: string - Unique identifier of the field rule
  - `company_id`: integer(int64) - Company this rule belongs to
  - `project_id`: integer(int64) - Project this rule applies to; null for company-level rules
  - `asset_type_id`: string - Asset type this rule applies to. Populated for FIELD_DEFAULTS; null for NAMING.
  - `fieldset_id`: string - Fieldset scope. '-1' for Procore default fields, external configurable fieldset id for custom fields. Null for NAMING.
  - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Kind of rule
  - `trigger_field`: string - Field that triggers this rule (e.g. asset_code for NAMING, custom_field_1234 for FIELD_DEFAULTS)
  - `rule_name`: string - Name of the rule
  - `description`: string - Optional description of the rule
  - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
  - `conditions`: object - Conditions AST for a conditional-validation rule
    - `schema_version`: integer(int32) (required) - Version of the conditions schema
    - `root`: object (required) - Root node of the recursive conditions tree
  - `rule_group_id`: string - Group id linking granular rules authored from one admin UI row. Null when ungrouped.
  - `expression`: string - Derived expression string (e.g. 'default=Carrier, readOnly=true')
  - `is_active`: boolean - Whether the rule is active and applied; false to deactivate without deleting
  - `lov_fields`: object
  - `validation_errors`: array of object - Validation issues detected on this rule. Null when the rule is valid; a non-empty list otherwise.
    - `code`: string enum[FIELDSET_NOT_FOUND, FIELDSET_NOT_MAPPED, FIELD_NOT_FOUND, LOV_ENTRY_NOT_FOUND, VENDOR_NOT_FOUND, STATUS_NOT_FOUND, STATUS_GROUP_MISMATCH, CONDITIONAL_TARGET_FIELD_INELIGIBLE, CONDITIONAL_TARGET_FIELD_ALWAYS_REQUIRED, ASSET_TYPE_NOT_FOUND, TRADE_NOT_FOUND, ASSET_TYPE_HIDDEN_AT_PROJECT, ...] - Code identifying the class of issue.
    - `severity`: string - Severity of the issue ("error" or "warning").
    - `cause`: string - Description of what went wrong.
    - `effect`: string - Description of the impact of this issue.
    - `remedy`: string - Guidance on how an admin can resolve the issue.
  - `overridden`: boolean - Project-scope overlay indicator. Populated only in the project-scoped list view: true when a project rule overrides the company configuration for this field (value and/or editability differs, or no company rule exists...
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/assets/settings/field_rules/{rule_id}

**Delete Field Rule**
Permanently deletes a field rule.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `rule_id` [path] string (required) - Unique identifier for the field rule.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/assets/settings/field_rules/create

**Create Field Rule**
Creates a field rule. For FIELD_DEFAULTS, the rule is scoped to an asset type, fieldset, and trigger field. The scope tuple must be unique among active rules.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Rule type. Defaults to NAMING for backward compatibility.
- `asset_type_id`: string - Asset type id (required for FIELD_DEFAULTS; null for NAMING).
- `fieldset_id`: string - Fieldset id (required for FIELD_DEFAULTS). '-1' for Procore default fields; external configurable fieldset id for custom fields. Null for NAMING.
- `trigger_field`: string (required) - Trigger field. For NAMING: asset_code. For FIELD_DEFAULTS: the field this rule configures (e.g., custom_field_1234, trade_id).
- `rule_name`: string - Display name for the rule. Optional: when omitted or blank, the backend auto-generates a scope-indicative name of the form '{rule_type}::{company_id}::{asset_type_id|NA}::{fieldset_id|NA}::{trigger_field}'.
- `description`: string - Optional description
- `is_active`: boolean - Whether the rule is created active. Absent/null defaults to active. Set false to create an inactive rule directly (e.g. a draft); for MANDATORY/WARNING rules an inactive rule skips conflict validation because inactive...
- `rule_group_id`: string - Groups granular rules created from a single admin UI row (MANDATORY/WARNING). Normally set by the grouped create API; optional and null for standalone/legacy clients.
- `conditions`: object - Conditions AST for a conditional-validation rule
  - `schema_version`: integer(int32) (required) - Version of the conditions schema
  - `root`: object (required) - Root node of the recursive conditions tree
- `definition`: oneOf(object | object | object) (required) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.

Response 201 (application/json): object

- `data`: object - Field rule response (NAMING or FIELD_DEFAULTS)
  - `id`: string - Unique identifier of the field rule
  - `company_id`: integer(int64) - Company this rule belongs to
  - `project_id`: integer(int64) - Project this rule applies to; null for company-level rules
  - `asset_type_id`: string - Asset type this rule applies to. Populated for FIELD_DEFAULTS; null for NAMING.
  - `fieldset_id`: string - Fieldset scope. '-1' for Procore default fields, external configurable fieldset id for custom fields. Null for NAMING.
  - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Kind of rule
  - `trigger_field`: string - Field that triggers this rule (e.g. asset_code for NAMING, custom_field_1234 for FIELD_DEFAULTS)
  - `rule_name`: string - Name of the rule
  - `description`: string - Optional description of the rule
  - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
  - `conditions`: object - Conditions AST for a conditional-validation rule
    - `schema_version`: integer(int32) (required) - Version of the conditions schema
    - `root`: object (required) - Root node of the recursive conditions tree
  - `rule_group_id`: string - Group id linking granular rules authored from one admin UI row. Null when ungrouped.
  - `expression`: string - Derived expression string (e.g. 'default=Carrier, readOnly=true')
  - `is_active`: boolean - Whether the rule is active and applied; false to deactivate without deleting
  - `lov_fields`: object
  - `validation_errors`: array of object - Validation issues detected on this rule. Null when the rule is valid; a non-empty list otherwise.
    - `code`: string enum[FIELDSET_NOT_FOUND, FIELDSET_NOT_MAPPED, FIELD_NOT_FOUND, LOV_ENTRY_NOT_FOUND, VENDOR_NOT_FOUND, STATUS_NOT_FOUND, STATUS_GROUP_MISMATCH, CONDITIONAL_TARGET_FIELD_INELIGIBLE, CONDITIONAL_TARGET_FIELD_ALWAYS_REQUIRED, ASSET_TYPE_NOT_FOUND, TRADE_NOT_FOUND, ASSET_TYPE_HIDDEN_AT_PROJECT, ...] - Code identifying the class of issue.
    - `severity`: string - Severity of the issue ("error" or "warning").
    - `cause`: string - Description of what went wrong.
    - `effect`: string - Description of the impact of this issue.
    - `remedy`: string - Guidance on how an admin can resolve the issue.
  - `overridden`: boolean - Project-scope overlay indicator. Populated only in the project-scoped list view: true when a project rule overrides the company configuration for this field (value and/or editability differs, or no company rule exists...
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Grouped Field Rules

Resource id: `company-grouped-field-rules`. Raw spec: `../openapi-raw/company-grouped-field-rules.json`. Web: https://developers.procore.com/reference/rest/company-grouped-field-rules?version=latest
Product lines: asset-register

### PUT /rest/v2.0/companies/{company_id}/assets/settings/field_rules/grouped/{rule_group_id}

**Update Grouped Conditional Rule**
Reconciles a grouped conditional-validation rule against the desired asset_type_ids x trigger_fields set (adds new rows, removes dropped rows, re-validates retained rows). Atomic: any conflict/validation failure rejects the whole update.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `rule_group_id` [path] string (required) - Group id of the rule to update.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Rule type; when provided must match the existing group's type (type is immutable)
- `asset_type_ids`: array of string (required) - Desired asset type ids; a single null entry means 'all asset types'. Maximum 100 entries.
- `trigger_fields`: array of string (required) - Desired trigger fields. Maximum 100 entries.
- `conditions`: object - Conditions AST for a conditional-validation rule
  - `schema_version`: integer(int32) (required) - Version of the conditions schema
  - `root`: object (required) - Root node of the recursive conditions tree
- `is_active`: boolean - Whether the group's rules are active
- `message`: string - Optional custom message shown when the rule fires; also used as the rule description

Response 200 (application/json): object

- `data`: object - Grouped conditional-validation rule (aggregates granular rows sharing a rule_group_id)
  - `id`: string - Representative granular rule id (the first row in the group)
  - `company_id`: string - Company this group belongs to
  - `project_id`: integer(int64) - Project this group applies to; null for company-level rules
  - `rule_group_id`: string - Group id linking the granular rules; null for an ungrouped singleton
  - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Rule type shared by every rule in the group
  - `asset_type_ids`: array of string - Asset type ids in the group; a single null entry means 'all asset types'
  - `trigger_field_ids`: array of string - Trigger field ids in the group
  - `rule_name`: string - Representative rule name
  - `description`: string - Shared description
  - `conditions`: object - Conditions AST for a conditional-validation rule
    - `schema_version`: integer(int32) (required) - Version of the conditions schema
    - `root`: object (required) - Root node of the recursive conditions tree
  - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
  - `expression`: string - Derived expression string
  - `is_active`: boolean - Whether the group's rules are active
  - `granular_rule_count`: integer(int32) - Number of granular rules in the group
  - `validation_errors`: array of object - Optional read-time health findings for this grouped rule.
    - `code`: string enum[FIELDSET_NOT_FOUND, FIELDSET_NOT_MAPPED, FIELD_NOT_FOUND, LOV_ENTRY_NOT_FOUND, VENDOR_NOT_FOUND, STATUS_NOT_FOUND, STATUS_GROUP_MISMATCH, CONDITIONAL_TARGET_FIELD_INELIGIBLE, CONDITIONAL_TARGET_FIELD_ALWAYS_REQUIRED, ASSET_TYPE_NOT_FOUND, TRADE_NOT_FOUND, ASSET_TYPE_HIDDEN_AT_PROJECT, ...] - Code identifying the class of issue.
    - `severity`: string - Severity of the issue ("error" or "warning").
    - `cause`: string - Description of what went wrong.
    - `effect`: string - Description of the impact of this issue.
    - `remedy`: string - Guidance on how an admin can resolve the issue.
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/assets/settings/field_rules/grouped/{rule_group_id}

**Delete Grouped Conditional Rule**
Deletes all granular rules that share the given rule_group_id.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `rule_group_id` [path] string (required) - Group id of the rule to delete.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/assets/settings/field_rules/grouped

**List Grouped Conditional Rules**
Lists conditional-validation rules (MANDATORY / WARNING) grouped by rule_group_id. Optionally filter by repeated rule_type, asset_type_id, and trigger_field. A conditional rule without a group id is returned as a singleton group.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `rule_type` [query] array of string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Optional repeatable rule-type filter (MANDATORY/WARNING)
- `asset_type_id` [query] string - Optional asset type id filter
- `trigger_field` [query] string - Optional trigger field filter
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - Representative granular rule id (the first row in the group)
  - `company_id`: string - Company this group belongs to
  - `project_id`: integer(int64) - Project this group applies to; null for company-level rules
  - `rule_group_id`: string - Group id linking the granular rules; null for an ungrouped singleton
  - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Rule type shared by every rule in the group
  - `asset_type_ids`: array of string - Asset type ids in the group; a single null entry means 'all asset types'
  - `trigger_field_ids`: array of string - Trigger field ids in the group
  - `rule_name`: string - Representative rule name
  - `description`: string - Shared description
  - `conditions`: object - Conditions AST for a conditional-validation rule
    - `schema_version`: integer(int32) (required) - Version of the conditions schema
    - `root`: object (required) - Root node of the recursive conditions tree
  - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
  - `expression`: string - Derived expression string
  - `is_active`: boolean - Whether the group's rules are active
  - `granular_rule_count`: integer(int32) - Number of granular rules in the group
  - `validation_errors`: array of object - Optional read-time health findings for this grouped rule.
    - `code`: string enum[FIELDSET_NOT_FOUND, FIELDSET_NOT_MAPPED, FIELD_NOT_FOUND, LOV_ENTRY_NOT_FOUND, VENDOR_NOT_FOUND, STATUS_NOT_FOUND, STATUS_GROUP_MISMATCH, CONDITIONAL_TARGET_FIELD_INELIGIBLE, CONDITIONAL_TARGET_FIELD_ALWAYS_REQUIRED, ASSET_TYPE_NOT_FOUND, TRADE_NOT_FOUND, ASSET_TYPE_HIDDEN_AT_PROJECT, ...] - Code identifying the class of issue.
    - `severity`: string - Severity of the issue ("error" or "warning").
    - `cause`: string - Description of what went wrong.
    - `effect`: string - Description of the impact of this issue.
    - `remedy`: string - Guidance on how an admin can resolve the issue.
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/assets/settings/field_rules/grouped

**Create Grouped Conditional Rule**
Creates a grouped conditional-validation rule that expands into asset_type_ids x trigger_fields granular rules sharing one rule_group_id. Atomic: the whole group is validated for conflicts before any row is persisted.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] (required) - Rule type; must be MANDATORY or WARNING
- `rule_group_id`: string - Optional caller-provided group id (unique within the company). When omitted the backend generates the next available id.
- `asset_type_ids`: array of string (required) - Asset type ids the rule applies to; a single null entry means 'all asset types'. Maximum 100 entries.
- `trigger_fields`: array of string (required) - Trigger fields the rule applies to (e.g. installation_date). Maximum 100 entries.
- `conditions`: object - Conditions AST for a conditional-validation rule
  - `schema_version`: integer(int32) (required) - Version of the conditions schema
  - `root`: object (required) - Root node of the recursive conditions tree
- `is_active`: boolean - Whether the created rules are active
- `message`: string - Optional custom message shown when the rule fires; also used as the rule description

Response 201 (application/json): object

- `data`: object - Grouped conditional-validation rule (aggregates granular rows sharing a rule_group_id)
  - `id`: string - Representative granular rule id (the first row in the group)
  - `company_id`: string - Company this group belongs to
  - `project_id`: integer(int64) - Project this group applies to; null for company-level rules
  - `rule_group_id`: string - Group id linking the granular rules; null for an ungrouped singleton
  - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Rule type shared by every rule in the group
  - `asset_type_ids`: array of string - Asset type ids in the group; a single null entry means 'all asset types'
  - `trigger_field_ids`: array of string - Trigger field ids in the group
  - `rule_name`: string - Representative rule name
  - `description`: string - Shared description
  - `conditions`: object - Conditions AST for a conditional-validation rule
    - `schema_version`: integer(int32) (required) - Version of the conditions schema
    - `root`: object (required) - Root node of the recursive conditions tree
  - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
  - `expression`: string - Derived expression string
  - `is_active`: boolean - Whether the group's rules are active
  - `granular_rule_count`: integer(int32) - Number of granular rules in the group
  - `validation_errors`: array of object - Optional read-time health findings for this grouped rule.
    - `code`: string enum[FIELDSET_NOT_FOUND, FIELDSET_NOT_MAPPED, FIELD_NOT_FOUND, LOV_ENTRY_NOT_FOUND, VENDOR_NOT_FOUND, STATUS_NOT_FOUND, STATUS_GROUP_MISMATCH, CONDITIONAL_TARGET_FIELD_INELIGIBLE, CONDITIONAL_TARGET_FIELD_ALWAYS_REQUIRED, ASSET_TYPE_NOT_FOUND, TRADE_NOT_FOUND, ASSET_TYPE_HIDDEN_AT_PROJECT, ...] - Code identifying the class of issue.
    - `severity`: string - Severity of the issue ("error" or "warning").
    - `cause`: string - Description of what went wrong.
    - `effect`: string - Description of the impact of this issue.
    - `remedy`: string - Guidance on how an admin can resolve the issue.
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/assets/settings/field_rules/grouped/{rule_group_id}/duplicate

**Duplicate Grouped Conditional Rule**
Copies a grouped conditional-validation rule under a new rule_group_id. The copy is created inactive (an editable draft), so it does not conflict with the source group.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `rule_group_id` [path] string (required) - Group id of the rule to duplicate.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 201 (application/json): object

- `data`: object - Grouped conditional-validation rule (aggregates granular rows sharing a rule_group_id)
  - `id`: string - Representative granular rule id (the first row in the group)
  - `company_id`: string - Company this group belongs to
  - `project_id`: integer(int64) - Project this group applies to; null for company-level rules
  - `rule_group_id`: string - Group id linking the granular rules; null for an ungrouped singleton
  - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Rule type shared by every rule in the group
  - `asset_type_ids`: array of string - Asset type ids in the group; a single null entry means 'all asset types'
  - `trigger_field_ids`: array of string - Trigger field ids in the group
  - `rule_name`: string - Representative rule name
  - `description`: string - Shared description
  - `conditions`: object - Conditions AST for a conditional-validation rule
    - `schema_version`: integer(int32) (required) - Version of the conditions schema
    - `root`: object (required) - Root node of the recursive conditions tree
  - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
  - `expression`: string - Derived expression string
  - `is_active`: boolean - Whether the group's rules are active
  - `granular_rule_count`: integer(int32) - Number of granular rules in the group
  - `validation_errors`: array of object - Optional read-time health findings for this grouped rule.
    - `code`: string enum[FIELDSET_NOT_FOUND, FIELDSET_NOT_MAPPED, FIELD_NOT_FOUND, LOV_ENTRY_NOT_FOUND, VENDOR_NOT_FOUND, STATUS_NOT_FOUND, STATUS_GROUP_MISMATCH, CONDITIONAL_TARGET_FIELD_INELIGIBLE, CONDITIONAL_TARGET_FIELD_ALWAYS_REQUIRED, ASSET_TYPE_NOT_FOUND, TRADE_NOT_FOUND, ASSET_TYPE_HIDDEN_AT_PROJECT, ...] - Code identifying the class of issue.
    - `severity`: string - Severity of the issue ("error" or "warning").
    - `cause`: string - Description of what went wrong.
    - `effect`: string - Description of the impact of this issue.
    - `remedy`: string - Guidance on how an admin can resolve the issue.
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Naming Standard

Resource id: `company-naming-standard`. Raw spec: `../openapi-raw/company-naming-standard.json`. Web: https://developers.procore.com/reference/rest/company-naming-standard?version=latest
Product lines: asset-register

### PUT /rest/v2.0/companies/{company_id}/assets/settings/naming_standard/{rule_id}

**Update company naming standard rule**
Updates an existing naming rule. Use isActive=false to deactivate without deleting.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `rule_id` [path] string (required) - Unique identifier for the naming rule.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Optional metadata. NOT updatable: if provided, must match the existing rule's type; the server rejects mismatches.
- `fieldset_id`: string - New fieldset id. FIELD_DEFAULTS only; ignored / rejected for NAMING. Provided to recover a rule whose asset type's fieldset has been changed by an admin. Must match the asset type's current fieldset and must contain t...
- `rule_name`: string - Display name for the rule
- `description`: string - Optional description
- `definition`: object - Rule definition. Shape must match the rule's stored type — for NAMING, supply expression_fields; for FIELD_DEFAULTS, supply actions. Sent as a raw JSON object; the server converts it to the correct subtype and runs ex...
- `is_active`: boolean - Whether the rule is active. Set to false to deactivate.
- `conditions`: object - Conditions AST for a conditional-validation rule
  - `schema_version`: integer(int32) (required) - Version of the conditions schema
  - `root`: object (required) - Root node of the recursive conditions tree

Response 200 (application/json): object

- `data`: object - Field rule response (NAMING or FIELD_DEFAULTS)
  - `id`: string - Unique identifier of the field rule
  - `company_id`: integer(int64) - Company this rule belongs to
  - `project_id`: integer(int64) - Project this rule applies to; null for company-level rules
  - `asset_type_id`: string - Asset type this rule applies to. Populated for FIELD_DEFAULTS; null for NAMING.
  - `fieldset_id`: string - Fieldset scope. '-1' for Procore default fields, external configurable fieldset id for custom fields. Null for NAMING.
  - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Kind of rule
  - `trigger_field`: string - Field that triggers this rule (e.g. asset_code for NAMING, custom_field_1234 for FIELD_DEFAULTS)
  - `rule_name`: string - Name of the rule
  - `description`: string - Optional description of the rule
  - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
  - `conditions`: object - Conditions AST for a conditional-validation rule
    - `schema_version`: integer(int32) (required) - Version of the conditions schema
    - `root`: object (required) - Root node of the recursive conditions tree
  - `rule_group_id`: string - Group id linking granular rules authored from one admin UI row. Null when ungrouped.
  - `expression`: string - Derived expression string (e.g. 'default=Carrier, readOnly=true')
  - `is_active`: boolean - Whether the rule is active and applied; false to deactivate without deleting
  - `lov_fields`: object
  - `validation_errors`: array of object - Validation issues detected on this rule. Null when the rule is valid; a non-empty list otherwise.
    - `code`: string enum[FIELDSET_NOT_FOUND, FIELDSET_NOT_MAPPED, FIELD_NOT_FOUND, LOV_ENTRY_NOT_FOUND, VENDOR_NOT_FOUND, STATUS_NOT_FOUND, STATUS_GROUP_MISMATCH, CONDITIONAL_TARGET_FIELD_INELIGIBLE, CONDITIONAL_TARGET_FIELD_ALWAYS_REQUIRED, ASSET_TYPE_NOT_FOUND, TRADE_NOT_FOUND, ASSET_TYPE_HIDDEN_AT_PROJECT, ...] - Code identifying the class of issue.
    - `severity`: string - Severity of the issue ("error" or "warning").
    - `cause`: string - Description of what went wrong.
    - `effect`: string - Description of the impact of this issue.
    - `remedy`: string - Guidance on how an admin can resolve the issue.
  - `overridden`: boolean - Project-scope overlay indicator. Populated only in the project-scoped list view: true when a project rule overrides the company configuration for this field (value and/or editability differs, or no company rule exists...
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/assets/settings/naming_standard/{rule_id}

**Delete company naming standard rule**
Permanently deletes the naming rule.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `rule_id` [path] string (required) - Unique identifier for the naming rule.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/assets/settings/naming_standard

**Get company naming standard rules**
Returns all field rules (naming standard) for the company, including inactive, ordered by modified date. Always includes the Procore Default naming rule in addition to company- or project-specific rules.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `include_lov_codes` [query] boolean - When true, active rules are enriched with LOV entries and their code mappings for LOV-type fields used in the expression.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object - List of naming standard rules
  - `id`: string - Unique identifier of the field rule
  - `company_id`: integer(int64) - Company this rule belongs to
  - `project_id`: integer(int64) - Project this rule applies to; null for company-level rules
  - `asset_type_id`: string - Asset type this rule applies to. Populated for FIELD_DEFAULTS; null for NAMING.
  - `fieldset_id`: string - Fieldset scope. '-1' for Procore default fields, external configurable fieldset id for custom fields. Null for NAMING.
  - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Kind of rule
  - `trigger_field`: string - Field that triggers this rule (e.g. asset_code for NAMING, custom_field_1234 for FIELD_DEFAULTS)
  - `rule_name`: string - Name of the rule
  - `description`: string - Optional description of the rule
  - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
  - `conditions`: object - Conditions AST for a conditional-validation rule
    - `schema_version`: integer(int32) (required) - Version of the conditions schema
    - `root`: object (required) - Root node of the recursive conditions tree
  - `rule_group_id`: string - Group id linking granular rules authored from one admin UI row. Null when ungrouped.
  - `expression`: string - Derived expression string (e.g. 'default=Carrier, readOnly=true')
  - `is_active`: boolean - Whether the rule is active and applied; false to deactivate without deleting
  - `lov_fields`: object
  - `validation_errors`: array of object - Validation issues detected on this rule. Null when the rule is valid; a non-empty list otherwise.
    - `code`: string enum[FIELDSET_NOT_FOUND, FIELDSET_NOT_MAPPED, FIELD_NOT_FOUND, LOV_ENTRY_NOT_FOUND, VENDOR_NOT_FOUND, STATUS_NOT_FOUND, STATUS_GROUP_MISMATCH, CONDITIONAL_TARGET_FIELD_INELIGIBLE, CONDITIONAL_TARGET_FIELD_ALWAYS_REQUIRED, ASSET_TYPE_NOT_FOUND, TRADE_NOT_FOUND, ASSET_TYPE_HIDDEN_AT_PROJECT, ...] - Code identifying the class of issue.
    - `severity`: string - Severity of the issue ("error" or "warning").
    - `cause`: string - Description of what went wrong.
    - `effect`: string - Description of the impact of this issue.
    - `remedy`: string - Guidance on how an admin can resolve the issue.
  - `overridden`: boolean - Project-scope overlay indicator. Populated only in the project-scoped list view: true when a project rule overrides the company configuration for this field (value and/or editability differs, or no company rule exists...
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/assets/settings/naming_standard

**Create company naming standard rule**
Creates a NAMING rule for the company. Only one active naming rule per company is allowed.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Rule type. Defaults to NAMING for backward compatibility.
- `asset_type_id`: string - Asset type id (required for FIELD_DEFAULTS; null for NAMING).
- `fieldset_id`: string - Fieldset id (required for FIELD_DEFAULTS). '-1' for Procore default fields; external configurable fieldset id for custom fields. Null for NAMING.
- `trigger_field`: string (required) - Trigger field. For NAMING: asset_code. For FIELD_DEFAULTS: the field this rule configures (e.g., custom_field_1234, trade_id).
- `rule_name`: string - Display name for the rule. Optional: when omitted or blank, the backend auto-generates a scope-indicative name of the form '{rule_type}::{company_id}::{asset_type_id|NA}::{fieldset_id|NA}::{trigger_field}'.
- `description`: string - Optional description
- `is_active`: boolean - Whether the rule is created active. Absent/null defaults to active. Set false to create an inactive rule directly (e.g. a draft); for MANDATORY/WARNING rules an inactive rule skips conflict validation because inactive...
- `rule_group_id`: string - Groups granular rules created from a single admin UI row (MANDATORY/WARNING). Normally set by the grouped create API; optional and null for standalone/legacy clients.
- `conditions`: object - Conditions AST for a conditional-validation rule
  - `schema_version`: integer(int32) (required) - Version of the conditions schema
  - `root`: object (required) - Root node of the recursive conditions tree
- `definition`: oneOf(object | object | object) (required) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.

Response 200 (application/json): object

- `data`: object - Field rule response (NAMING or FIELD_DEFAULTS)
  - `id`: string - Unique identifier of the field rule
  - `company_id`: integer(int64) - Company this rule belongs to
  - `project_id`: integer(int64) - Project this rule applies to; null for company-level rules
  - `asset_type_id`: string - Asset type this rule applies to. Populated for FIELD_DEFAULTS; null for NAMING.
  - `fieldset_id`: string - Fieldset scope. '-1' for Procore default fields, external configurable fieldset id for custom fields. Null for NAMING.
  - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Kind of rule
  - `trigger_field`: string - Field that triggers this rule (e.g. asset_code for NAMING, custom_field_1234 for FIELD_DEFAULTS)
  - `rule_name`: string - Name of the rule
  - `description`: string - Optional description of the rule
  - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
  - `conditions`: object - Conditions AST for a conditional-validation rule
    - `schema_version`: integer(int32) (required) - Version of the conditions schema
    - `root`: object (required) - Root node of the recursive conditions tree
  - `rule_group_id`: string - Group id linking granular rules authored from one admin UI row. Null when ungrouped.
  - `expression`: string - Derived expression string (e.g. 'default=Carrier, readOnly=true')
  - `is_active`: boolean - Whether the rule is active and applied; false to deactivate without deleting
  - `lov_fields`: object
  - `validation_errors`: array of object - Validation issues detected on this rule. Null when the rule is valid; a non-empty list otherwise.
    - `code`: string enum[FIELDSET_NOT_FOUND, FIELDSET_NOT_MAPPED, FIELD_NOT_FOUND, LOV_ENTRY_NOT_FOUND, VENDOR_NOT_FOUND, STATUS_NOT_FOUND, STATUS_GROUP_MISMATCH, CONDITIONAL_TARGET_FIELD_INELIGIBLE, CONDITIONAL_TARGET_FIELD_ALWAYS_REQUIRED, ASSET_TYPE_NOT_FOUND, TRADE_NOT_FOUND, ASSET_TYPE_HIDDEN_AT_PROJECT, ...] - Code identifying the class of issue.
    - `severity`: string - Severity of the issue ("error" or "warning").
    - `cause`: string - Description of what went wrong.
    - `effect`: string - Description of the impact of this issue.
    - `remedy`: string - Guidance on how an admin can resolve the issue.
  - `overridden`: boolean - Project-scope overlay indicator. Populated only in the project-scoped list view: true when a project rule overrides the company configuration for this field (value and/or editability differs, or no company rule exists...
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/assets/settings/naming_standard/fields

**Get Asset Naming Fields**
Returns all fields available for the naming standard expression builder, including procore default naming fields, parent_asset_id, and eligible custom fields from all fieldsets.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `name`: string
  - `label`: string
  - `data_type`: string
  - `variant`: string
  - `available_on_all_asset_types`: boolean
  - `list_of_values`: array of object
    - `id`: string e.g. `12345`
    - `label`: string
    - `code`: string
    - `active`: boolean

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Naming Standard LOV Codes

Resource id: `company-naming-standard-lov-codes`. Raw spec: `../openapi-raw/company-naming-standard-lov-codes.json`. Web: https://developers.procore.com/reference/rest/company-naming-standard-lov-codes?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/assets/settings/naming_standard/codes

**List LOV codes for a field**
Returns all naming standard LOV code mappings for a given field (e.g. trade_id or a custom field).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `field_name` [query] string (required) - Field name to list codes for (e.g. trade_id, custom_field_1234)
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - Unique identifier of this code mapping
  - `company_id`: integer(int64) - Company this code belongs to
  - `project_id`: integer(int64) - Project this code belongs to (null for company-level codes)
  - `field_name`: string - Field name this code is for (e.g. trade_id, custom_field_1234)
  - `entry_id`: string - LOV entry ID (trade ID or custom field LOV entry ID)
  - `code`: string - Short code value used in naming standard prefix
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PUT /rest/v2.0/companies/{company_id}/assets/settings/naming_standard/codes

**Bulk upsert LOV codes**
Creates or updates naming standard LOV code mappings in bulk.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `field_name`: string (required) - Field name (e.g. trade_id, custom_field_1234)
- `entry_id`: string (required) - LOV entry ID (trade ID or custom field LOV entry ID)
- `code`: string - Short code value for naming standard. Blank or null clears an existing mapping for the same field_name + entry_id.

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - Unique identifier of this code mapping
  - `company_id`: integer(int64) - Company this code belongs to
  - `project_id`: integer(int64) - Project this code belongs to (null for company-level codes)
  - `field_name`: string - Field name this code is for (e.g. trade_id, custom_field_1234)
  - `entry_id`: string - LOV entry ID (trade ID or custom field LOV entry ID)
  - `code`: string - Short code value used in naming standard prefix
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/assets/settings/naming_standard/codes/{code_id}

**Delete a LOV code**
Permanently deletes a naming standard LOV code mapping.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `code_id` [path] string (required) - Unique identifier for the LOV code mapping.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Procore Default Fields

Resource id: `company-procore-default-fields`. Raw spec: `../openapi-raw/company-procore-default-fields.json`. Web: https://developers.procore.com/reference/rest/company-procore-default-fields?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/assets/procore_default_fields

**Get procore default fieldsets configuration**
Retrieve the procore default fieldsets configuration.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: object

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Asset Attachments

Resource id: `project-asset-attachments`. Raw spec: `../openapi-raw/project-asset-attachments.json`. Web: https://developers.procore.com/reference/rest/project-asset-attachments?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/{asset_id}/attachments

**List Attachments**
Returns a list of attachments for a given asset.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `asset_id` [path] string (required) - Unique identifier for the Asset
- `sort` [query] string enum[file_name, modified_at] - Sorting criteria in minus-based order format. Default sort order is ascending. Multiple sort criteria can be provided in CSV format, for example: sort=file_name,-modified_at.
- `page` [query] integer(int32) - One-based page index (1..N)
- `per_page` [query] integer(int32) - The size of the page to be returned
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `id`: string
  - `file_name`: string
  - `attachment_type_id`: string
  - `attachment_type_name`: string
  - `description`: string
  - `modified_at`: string
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `attachment_source`: string enum[LOCAL_FILE_UPLOAD, DRAWINGS, DOCUMENTS, PHOTOS, PDM]
  - `file_download_url`: string - Download URL for the attachment. Only populated when fetching a single attachment by ID or via bulk attachment APIs
  - `is_company_attachment`: boolean
  - `project_id`: string
  - `attachment_file_id`: string
  - `asset_id`: string - Asset ID this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_code`: string - Asset code this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_type_id`: string - Asset type ID when this attachment is stored at asset type scope (row has asset_type_id). Omitted for asset-only attachments.
  - `attachment_level`: string enum[COMPANY_ASSET, PROJECT_ASSET, COMPANY_ASSET_TYPE, PROJECT_ASSET_TYPE] - Scope at which this attachment row lives in the database: COMPANY_ASSET (asset-level, no project), PROJECT_ASSET (asset-level, project), COMPANY_ASSET_TYPE (type-level, no project), PROJECT_ASSET_TYPE (type-level, pro...

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/{asset_id}/attachments

**Create Attachments**
Creates attachments for a given asset.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `asset_id` [path] string (required) - Unique identifier for the Asset
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `attachment_type_id`: string (required)
- `file_name`: string (required)
- `attachment_file_id`: string (required) - For attachment_source: - LOCAL_FILE_UPLOAD: attachment_file_id is the FAS ID. - DOCUMENTS: attachment_file_id is the document ID. - DRAWINGS: attachment_file_id is the drawing revision ID, but internally we store the ...
- `description`: string
- `attachment_source`: string enum[LOCAL_FILE_UPLOAD, DRAWINGS, DOCUMENTS, PHOTOS, PDM] (required) - Source of the attachment. For company asset attachments, only LOCAL_FILE_UPLOAD and DOCUMENTS are allowed. Project asset attachments support all sources: LOCAL_FILE_UPLOAD, DRAWINGS, DOCUMENTS, PHOTOS, PDM.

Response 201 (application/json): object

- `data`: array of object
  - `id`: string
  - `file_name`: string
  - `attachment_type_id`: string
  - `attachment_type_name`: string
  - `description`: string
  - `modified_at`: string
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `attachment_source`: string enum[LOCAL_FILE_UPLOAD, DRAWINGS, DOCUMENTS, PHOTOS, PDM]
  - `file_download_url`: string - Download URL for the attachment. Only populated when fetching a single attachment by ID or via bulk attachment APIs
  - `is_company_attachment`: boolean
  - `project_id`: string
  - `attachment_file_id`: string
  - `asset_id`: string - Asset ID this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_code`: string - Asset code this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_type_id`: string - Asset type ID when this attachment is stored at asset type scope (row has asset_type_id). Omitted for asset-only attachments.
  - `attachment_level`: string enum[COMPANY_ASSET, PROJECT_ASSET, COMPANY_ASSET_TYPE, PROJECT_ASSET_TYPE] - Scope at which this attachment row lives in the database: COMPANY_ASSET (asset-level, no project), PROJECT_ASSET (asset-level, project), COMPANY_ASSET_TYPE (type-level, no project), PROJECT_ASSET_TYPE (type-level, pro...

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/{asset_id}/attachments/{attachment_id}

**Show Attachment**
Returns a specific attachment by its identifier.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `asset_id` [path] string (required) - Unique identifier for the Asset
- `attachment_id` [path] string (required) - Unique identifier for the Attachment
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: object
  - `id`: string
  - `file_name`: string
  - `attachment_type_id`: string
  - `attachment_type_name`: string
  - `description`: string
  - `modified_at`: string
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `attachment_source`: string enum[LOCAL_FILE_UPLOAD, DRAWINGS, DOCUMENTS, PHOTOS, PDM]
  - `file_download_url`: string - Download URL for the attachment. Only populated when fetching a single attachment by ID or via bulk attachment APIs
  - `is_company_attachment`: boolean
  - `project_id`: string
  - `attachment_file_id`: string
  - `asset_id`: string - Asset ID this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_code`: string - Asset code this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_type_id`: string - Asset type ID when this attachment is stored at asset type scope (row has asset_type_id). Omitted for asset-only attachments.
  - `attachment_level`: string enum[COMPANY_ASSET, PROJECT_ASSET, COMPANY_ASSET_TYPE, PROJECT_ASSET_TYPE] - Scope at which this attachment row lives in the database: COMPANY_ASSET (asset-level, no project), PROJECT_ASSET (asset-level, project), COMPANY_ASSET_TYPE (type-level, no project), PROJECT_ASSET_TYPE (type-level, pro...

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/{asset_id}/attachments/{attachment_id}

**Update Attachment**
Updates a specific attachment. Updatable fields: attachment_type_id.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `asset_id` [path] string (required) - Unique identifier for the Asset
- `attachment_id` [path] string (required) - Unique identifier for the Attachment
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `op`: string enum[replace] (required) - The operation to perform e.g. `replace`
- `path`: string (required) - JSON Pointer to the target location e.g. `/description`
- `value`: object - The value to use for replace operations

Response 200 (application/json): object

- `data`: object
  - `id`: string
  - `file_name`: string
  - `attachment_type_id`: string
  - `attachment_type_name`: string
  - `description`: string
  - `modified_at`: string
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `attachment_source`: string enum[LOCAL_FILE_UPLOAD, DRAWINGS, DOCUMENTS, PHOTOS, PDM]
  - `file_download_url`: string - Download URL for the attachment. Only populated when fetching a single attachment by ID or via bulk attachment APIs
  - `is_company_attachment`: boolean
  - `project_id`: string
  - `attachment_file_id`: string
  - `asset_id`: string - Asset ID this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_code`: string - Asset code this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_type_id`: string - Asset type ID when this attachment is stored at asset type scope (row has asset_type_id). Omitted for asset-only attachments.
  - `attachment_level`: string enum[COMPANY_ASSET, PROJECT_ASSET, COMPANY_ASSET_TYPE, PROJECT_ASSET_TYPE] - Scope at which this attachment row lives in the database: COMPANY_ASSET (asset-level, no project), PROJECT_ASSET (asset-level, project), COMPANY_ASSET_TYPE (type-level, no project), PROJECT_ASSET_TYPE (type-level, pro...

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/attachments

**List All Attachments**
Returns a paginated list of project asset-level attachments plus inherited company-level and project-level asset-type attachments with download URLs.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `filters[asset_id]` [query] string - Filter by asset IDs. Accepts a single ID or multiple comma-separated IDs (e.g., 'id1,id2,id3').
- `sort` [query] string enum[file_name, modified_at] - Sorting criteria in minus-based order format. Default sort order is ascending. Multiple sort criteria can be provided in CSV format, for example: sort=file_name,-modified_at.
- `page` [query] integer(int32) - One-based page index (1..N)
- `per_page` [query] integer(int32) - The size of the page to be returned. Maximum page size is 50.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `id`: string
  - `file_name`: string
  - `attachment_type_id`: string
  - `attachment_type_name`: string
  - `description`: string
  - `modified_at`: string
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `attachment_source`: string enum[LOCAL_FILE_UPLOAD, DRAWINGS, DOCUMENTS, PHOTOS, PDM]
  - `file_download_url`: string - Download URL for the attachment. Only populated when fetching a single attachment by ID or via bulk attachment APIs
  - `is_company_attachment`: boolean
  - `project_id`: string
  - `attachment_file_id`: string
  - `asset_id`: string - Asset ID this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_code`: string - Asset code this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_type_id`: string - Asset type ID when this attachment is stored at asset type scope (row has asset_type_id). Omitted for asset-only attachments.
  - `attachment_level`: string enum[COMPANY_ASSET, PROJECT_ASSET, COMPANY_ASSET_TYPE, PROJECT_ASSET_TYPE] - Scope at which this attachment row lives in the database: COMPANY_ASSET (asset-level, no project), PROJECT_ASSET (asset-level, project), COMPANY_ASSET_TYPE (type-level, no project), PROJECT_ASSET_TYPE (type-level, pro...

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/{asset_id}/attachments/bulk_delete

**Bulk Delete Attachments**
Deletes multiple attachments in a single request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `asset_id` [path] string (required) - Unique identifier for the Asset
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `attachment_ids`: array of string - List of attachment IDs to delete. Required when select_all is false. e.g. `["ATT_001", "ATT_002"]`
- `select_all`: boolean - When true, deletes all attachments for the asset. Use excluded_attachment_ids to specify exceptions. When false (default), attachment_ids must be provided. e.g. `false`
- `excluded_attachment_ids`: array of string - List of attachment IDs to exclude from deletion. Only applicable when select_all is true. e.g. `["ATT_003"]`

Response 204: Attachments deleted successfully (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Asset Change History

Resource id: `project-asset-change-history`. Raw spec: `../openapi-raw/project-asset-change-history.json`. Web: https://developers.procore.com/reference/rest/project-asset-change-history?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/{entity_type}/{entity_id}/history

**List Change History**
Returns change history for a specific entity

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `entity_type` [path] string enum[asset] (required) - The type of entity to retrieve change history for
- `entity_id` [path] string (required) - The unique identifier of the entity to retrieve change history for
- `filters[change_type]` [query] array of string - Filter by change type (e.g., asset_updated_asset_name). Supports multiple values.
- `filters[changed_by]` [query] array of string - Filter by user who made the change. Supports multiple values.
- `filters[changed_at]` [query] string - Changed at filter (date range format: YYYY-MM-DD...YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ...YYYY-MM-DDTHH:MM:SSZ)
- `sort` [query] string enum[changed_at] - Sorting criteria in minus-based order format. Default sort order is ascending. Prefix with minus (-) for descending order. Default sort is by changed_at in descending order. Supports both snake_case and camelCase. Val...
- `page` [query] integer(int32) - Zero-based page index (0..N)
- `per_page` [query] integer(int32) - The number of items per page to be returned
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): oneOf(object)


Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/{entity_type}/{entity_id}/history/filters/user

**List User Filter Options**
Returns all users who made changes to a specific entity at project level for filtering change history

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `entity_type` [path] string enum[asset] (required) - The type of entity to retrieve filter options for
- `entity_id` [path] string (required) - The unique identifier of the entity to retrieve filter options for
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - User ID e.g. `12345`
  - `name`: string - User's full name e.g. `John Doe`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/{entity_type}/{entity_id}/history/filters/change_type

**List Change Type Filter Options**
Returns all available Change Type values of a specific entity at project level for filtering change history

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `entity_type` [path] string enum[asset] (required) - The type of entity to retrieve filter options for
- `entity_id` [path] string (required) - The unique identifier of the entity to retrieve filter options for
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `key`: string - The Change Type value e.g. `asset_updated_asset_name`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Asset Permissions

Resource id: `project-asset-permissions`. Raw spec: `../openapi-raw/project-asset-permissions.json`. Web: https://developers.procore.com/reference/rest/project-asset-permissions?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/permissions

**List user permissions**
Returns the list of privileges/permissions for the current user

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of string

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Asset Statuses

Resource id: `project-asset-statuses`. Raw spec: `../openapi-raw/project-asset-statuses.json`. Web: https://developers.procore.com/reference/rest/project-asset-statuses?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/asset_status

**List Asset Statuses**
Returns a list of Asset Statuses for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `status_group_id` [query] string - Get statuses from given status group
- `sort` [query] string enum[id, company_id, status_name, description, color_code, display_order, modified_at, created_at] - Sorting criteria in minus-based order format. Default sort order is ascending. Multiple sort criteria can be provided in CSV format, for example: sort=status_name,-created_at. Default sorting is by company_id ascendin...
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `id`: string
  - `asset_status_group`: object
    - `id`: string
    - `name`: string
    - `metadata`: object
  - `status_group_id`: string (read-only) - ID of the status group this status belongs to
  - `status_name`: string
  - `description`: string
  - `color_code`: string
  - `display_order`: integer(int32)
  - `asset_system_state`: object
    - `id`: string
    - `name`: string
    - `metadata`: object

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Asset Type Attachments

Resource id: `project-asset-type-attachments`. Raw spec: `../openapi-raw/project-asset-type-attachments.json`. Web: https://developers.procore.com/reference/rest/project-asset-type-attachments?version=latest
Product lines: asset-register

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/asset_types/{asset_type_id}/attachment

**Add attachment to project asset type**
Adds an attachment to an asset type scoped to a project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `asset_type_id` [path] string (required) - Unique identifier for the Asset Type
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `attachment_type_id`: string (required)
- `file_name`: string (required)
- `attachment_file_id`: string (required) - For attachment_source: - LOCAL_FILE_UPLOAD: attachment_file_id is the FAS ID. - DOCUMENTS: attachment_file_id is the document ID. - DRAWINGS: attachment_file_id is the drawing revision ID, but internally we store the ...
- `description`: string
- `attachment_source`: string enum[LOCAL_FILE_UPLOAD, DRAWINGS, DOCUMENTS, PHOTOS, PDM] (required) - Source of the attachment. For company asset attachments, only LOCAL_FILE_UPLOAD and DOCUMENTS are allowed. Project asset attachments support all sources: LOCAL_FILE_UPLOAD, DRAWINGS, DOCUMENTS, PHOTOS, PDM.

Response 201 (application/json): object

- `data`: array of object
  - `id`: string
  - `file_name`: string
  - `attachment_type_id`: string
  - `attachment_type_name`: string
  - `description`: string
  - `modified_at`: string
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `attachment_source`: string enum[LOCAL_FILE_UPLOAD, DRAWINGS, DOCUMENTS, PHOTOS, PDM]
  - `file_download_url`: string - Download URL for the attachment. Only populated when fetching a single attachment by ID or via bulk attachment APIs
  - `is_company_attachment`: boolean
  - `project_id`: string
  - `attachment_file_id`: string
  - `asset_id`: string - Asset ID this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_code`: string - Asset code this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_type_id`: string - Asset type ID when this attachment is stored at asset type scope (row has asset_type_id). Omitted for asset-only attachments.
  - `attachment_level`: string enum[COMPANY_ASSET, PROJECT_ASSET, COMPANY_ASSET_TYPE, PROJECT_ASSET_TYPE] - Scope at which this attachment row lives in the database: COMPANY_ASSET (asset-level, no project), PROJECT_ASSET (asset-level, project), COMPANY_ASSET_TYPE (type-level, no project), PROJECT_ASSET_TYPE (type-level, pro...

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/asset_types/{asset_type_id}/attachments/{attachment_id}

**Get attachment for project asset type**
Gets a specific project-scoped asset type attachment by ID

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `asset_type_id` [path] string (required) - Unique identifier for the Asset Type
- `attachment_id` [path] string (required) - Unique identifier for the Attachment
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: object
  - `id`: string
  - `file_name`: string
  - `attachment_type_id`: string
  - `attachment_type_name`: string
  - `description`: string
  - `modified_at`: string
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `attachment_source`: string enum[LOCAL_FILE_UPLOAD, DRAWINGS, DOCUMENTS, PHOTOS, PDM]
  - `file_download_url`: string - Download URL for the attachment. Only populated when fetching a single attachment by ID or via bulk attachment APIs
  - `is_company_attachment`: boolean
  - `project_id`: string
  - `attachment_file_id`: string
  - `asset_id`: string - Asset ID this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_code`: string - Asset code this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_type_id`: string - Asset type ID when this attachment is stored at asset type scope (row has asset_type_id). Omitted for asset-only attachments.
  - `attachment_level`: string enum[COMPANY_ASSET, PROJECT_ASSET, COMPANY_ASSET_TYPE, PROJECT_ASSET_TYPE] - Scope at which this attachment row lives in the database: COMPANY_ASSET (asset-level, no project), PROJECT_ASSET (asset-level, project), COMPANY_ASSET_TYPE (type-level, no project), PROJECT_ASSET_TYPE (type-level, pro...

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/asset_types/{asset_type_id}/attachments/{attachment_id}

**Update project asset type attachment**
Updates a project-scoped asset type attachment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `asset_type_id` [path] string (required) - Unique identifier for the Asset Type
- `attachment_id` [path] string (required) - Unique identifier for the Attachment
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `op`: string enum[replace] (required) - The operation to perform e.g. `replace`
- `path`: string (required) - JSON Pointer to the target location e.g. `/description`
- `value`: object - The value to use for replace operations

Response 200 (application/json): object

- `data`: object
  - `id`: string
  - `file_name`: string
  - `attachment_type_id`: string
  - `attachment_type_name`: string
  - `description`: string
  - `modified_at`: string
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `attachment_source`: string enum[LOCAL_FILE_UPLOAD, DRAWINGS, DOCUMENTS, PHOTOS, PDM]
  - `file_download_url`: string - Download URL for the attachment. Only populated when fetching a single attachment by ID or via bulk attachment APIs
  - `is_company_attachment`: boolean
  - `project_id`: string
  - `attachment_file_id`: string
  - `asset_id`: string - Asset ID this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_code`: string - Asset code this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_type_id`: string - Asset type ID when this attachment is stored at asset type scope (row has asset_type_id). Omitted for asset-only attachments.
  - `attachment_level`: string enum[COMPANY_ASSET, PROJECT_ASSET, COMPANY_ASSET_TYPE, PROJECT_ASSET_TYPE] - Scope at which this attachment row lives in the database: COMPANY_ASSET (asset-level, no project), PROJECT_ASSET (asset-level, project), COMPANY_ASSET_TYPE (type-level, no project), PROJECT_ASSET_TYPE (type-level, pro...

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/asset_types/{asset_type_id}/attachments/{attachment_id}

**Delete an attachment for a project asset type**
Deletes a project-scoped attachment for an asset type

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `asset_type_id` [path] string (required) - Unique identifier for the Asset Type
- `attachment_id` [path] string (required) - Unique identifier for the Attachment
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/asset_types/{asset_type_id}/attachments

**List attachments for project asset type**
Returns attachments linked to an asset type for a specific project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `asset_type_id` [path] string (required) - Unique identifier for the Asset Type
- `sort` [query] string - Sorting criteria in minus-based order format. Default sort order is ascending. Multiple sort criteria can be provided in CSV format, for example: sort=name1,-name2.
- `page` [query] integer(int32) - One-based page index (1..N)
- `per_page` [query] integer(int32) - The size of the page to be returned
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `id`: string
  - `file_name`: string
  - `attachment_type_id`: string
  - `attachment_type_name`: string
  - `description`: string
  - `modified_at`: string
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `attachment_source`: string enum[LOCAL_FILE_UPLOAD, DRAWINGS, DOCUMENTS, PHOTOS, PDM]
  - `file_download_url`: string - Download URL for the attachment. Only populated when fetching a single attachment by ID or via bulk attachment APIs
  - `is_company_attachment`: boolean
  - `project_id`: string
  - `attachment_file_id`: string
  - `asset_id`: string - Asset ID this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_code`: string - Asset code this attachment belongs to. Only populated in bulk attachment list responses.
  - `asset_type_id`: string - Asset type ID when this attachment is stored at asset type scope (row has asset_type_id). Omitted for asset-only attachments.
  - `attachment_level`: string enum[COMPANY_ASSET, PROJECT_ASSET, COMPANY_ASSET_TYPE, PROJECT_ASSET_TYPE] - Scope at which this attachment row lives in the database: COMPANY_ASSET (asset-level, no project), PROJECT_ASSET (asset-level, project), COMPANY_ASSET_TYPE (type-level, no project), PROJECT_ASSET_TYPE (type-level, pro...

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/asset_types/{asset_type_id}/attachments/bulk_delete

**Bulk Delete Attachments**
Deletes multiple attachments for a project-scoped asset type in a single request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `asset_type_id` [path] string (required) - Unique identifier for the Asset Type
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `attachment_ids`: array of string - List of attachment IDs to delete. Required when select_all is false. e.g. `["ATT_001", "ATT_002"]`
- `select_all`: boolean - When true, deletes all attachments for the asset. Use excluded_attachment_ids to specify exceptions. When false (default), attachment_ids must be provided. e.g. `false`
- `excluded_attachment_ids`: array of string - List of attachment IDs to exclude from deletion. Only applicable when select_all is true. e.g. `["ATT_003"]`

Response 204: Attachments deleted successfully (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Asset Type Available Fields

Resource id: `project-asset-type-available-fields`. Raw spec: `../openapi-raw/project-asset-type-available-fields.json`. Web: https://developers.procore.com/reference/rest/project-asset-type-available-fields?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/settings/asset_types/{asset_type_id}/available_fields

**List Available Fields for Rule Configuration (Project Scope)**
Project-scoped variant of the available-fields endpoint, exposed under the project route so it can be authorized with project-level permissions. The set of fields eligible for FIELD_DEFAULTS rule configuration on an asset type (Procore default fields + configurable fieldset fields, with excluded field names / types filtered out) is company-level metadata and does not vary by project, so the response is identical to the company-scoped endpoint for the same asset type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `asset_type_id` [path] string (required) - Unique identifier for the asset type.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `name`: string - Field name (e.g. trade_id, custom_field_1234)
  - `label`: string - Display label
  - `data_type`: string enum[boolean, cost_code, datetime, datetime/time, datetime/mm_yyyy, datetime/yyyy, decimal, decimal/currency, location, login_information, login_information/project_directory, login_informations, ...] - FieldType key (string, boolean, decimal, lov_entry, etc.)
  - `variant`: string - Variant for the data type
  - `fieldset_id`: string - Fieldset id: '-1' for Procore defaults, external id for custom fields
  - `required`: boolean - Whether this field is required in the fieldset
  - `visible`: boolean - Whether this field is visible in the fieldset
  - `list_of_values`: array of object - List of values for LOV fields; null for Procore default LOV fields (values come from AssetStatus / AssetTrade) and for non-LOV fields
    - `id`: integer(int64)
    - `label`: string
    - `code`: string
    - `position`: integer(int32)
    - `active`: boolean

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Asset Type Field Rules

Resource id: `project-asset-type-field-rules`. Raw spec: `../openapi-raw/project-asset-type-field-rules.json`. Web: https://developers.procore.com/reference/rest/project-asset-type-field-rules?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/settings/asset_types/{asset_type_id}/field_rules

**List Field Rules for an Asset Type (Project Scope)**
Returns the project inheritance overlay of company FIELD_DEFAULTS plus project overrides for the given asset type. Each row includes an {@code overridden} flag. Returns an empty list when the asset type is hidden on the project. The {@code project_id} path variable is required for project-level permission resolution.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `asset_type_id` [path] string (required) - Unique identifier for the asset type.
- `rule_type` [query] string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Optional rule type filter (e.g. FIELD_DEFAULTS)
- `rule_types` [query] array of string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Optional repeatable rule-type filter (e.g. rule_type=MANDATORY&rule_type=WARNING). When provided, takes precedence over the single rule_type param.
- `fieldset_id` [query] string - Optional fieldset id filter ("-1" for Procore defaults)
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - Unique identifier of the field rule
  - `company_id`: integer(int64) - Company this rule belongs to
  - `project_id`: integer(int64) - Project this rule applies to; null for company-level rules
  - `asset_type_id`: string - Asset type this rule applies to. Populated for FIELD_DEFAULTS; null for NAMING.
  - `fieldset_id`: string - Fieldset scope. '-1' for Procore default fields, external configurable fieldset id for custom fields. Null for NAMING.
  - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Kind of rule
  - `trigger_field`: string - Field that triggers this rule (e.g. asset_code for NAMING, custom_field_1234 for FIELD_DEFAULTS)
  - `rule_name`: string - Name of the rule
  - `description`: string - Optional description of the rule
  - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
  - `conditions`: object - Conditions AST for a conditional-validation rule
    - `schema_version`: integer(int32) (required) - Version of the conditions schema
    - `root`: object (required) - Root node of the recursive conditions tree
  - `rule_group_id`: string - Group id linking granular rules authored from one admin UI row. Null when ungrouped.
  - `expression`: string - Derived expression string (e.g. 'default=Carrier, readOnly=true')
  - `is_active`: boolean - Whether the rule is active and applied; false to deactivate without deleting
  - `lov_fields`: object
  - `validation_errors`: array of object - Validation issues detected on this rule. Null when the rule is valid; a non-empty list otherwise.
    - `code`: string enum[FIELDSET_NOT_FOUND, FIELDSET_NOT_MAPPED, FIELD_NOT_FOUND, LOV_ENTRY_NOT_FOUND, VENDOR_NOT_FOUND, STATUS_NOT_FOUND, STATUS_GROUP_MISMATCH, CONDITIONAL_TARGET_FIELD_INELIGIBLE, CONDITIONAL_TARGET_FIELD_ALWAYS_REQUIRED, ASSET_TYPE_NOT_FOUND, TRADE_NOT_FOUND, ASSET_TYPE_HIDDEN_AT_PROJECT, ...] - Code identifying the class of issue.
    - `severity`: string - Severity of the issue ("error" or "warning").
    - `cause`: string - Description of what went wrong.
    - `effect`: string - Description of the impact of this issue.
    - `remedy`: string - Guidance on how an admin can resolve the issue.
  - `overridden`: boolean - Project-scope overlay indicator. Populated only in the project-scoped list view: true when a project rule overrides the company configuration for this field (value and/or editability differs, or no company rule exists...
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Asset Types

Resource id: `project-asset-types`. Raw spec: `../openapi-raw/project-asset-types.json`. Web: https://developers.procore.com/reference/rest/project-asset-types?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/asset_types

**List Asset Types**
Returns a list of asset types for a given project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `asset_type_ids` [query] string - Comma-separated list of Asset Type IDs to filter by
- `include_asset_counts` [query] boolean - When true, each item includes assetCount for this type only, scoped to the project. Defaults to false when omitted.
- `is_asset` [query] boolean - Filter by is_asset flag (true/false)
- `eligible_sub_asset_of` [query] string - Parent asset ID. When supplied, returns only the asset types eligible to receive sub-assets of that parent (a flat, eligibility-scoped list for the Link Sub-Assets dialog).
- `sort` [query] string enum[id, code, name, description, modified_at, created_at, display_order] - Sorting criteria in minus-based order format. Default sort order is ascending. Multiple sort criteria can be provided in CSV format, for example: sort=name,-created_at. Default sorting is by display_order in descendin...
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `id`: string
  - `name`: string
  - `code`: string
  - `description`: string
  - `parent_type_id`: string - Deprecated: use 'parents'. Single parent type ID kept for backward compatibility; set to the lowest-display-order parent.
  - `parents`: array of object
    - `parent_type_id`: string - ID of the parent asset type for this link. Null denotes a root (top-level) membership.
    - `display_order`: integer(int32) - Order of this child within the parent's sibling group.
  - `active`: boolean
  - `modified_at`: string(date-time)
  - `created_at`: string(date-time)
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `asset_status_group`: object
    - `id`: string
    - `name`: string
    - `metadata`: object
  - `fieldset_dto`: object
    - `id`: string
    - `name`: string
    - `metadata`: object
  - `company_id`: string
  - `project_id`: string
  - `is_leaf`: boolean
  - `is_asset`: boolean
  - `has_assets`: boolean
  - `display_order`: integer(int32)
  - `overridden`: boolean - True when the Asset Type ID is overridden for this project. Project-scoped reads only.
  - `asset_count`: integer(int64)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Assets

Resource id: `project-assets`. Raw spec: `../openapi-raw/project-assets.json`. Web: https://developers.procore.com/reference/rest/project-assets?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets

**List Assets**
Returns List of Assets by given Company and Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `search` [query] string - Search query. Searches across: asset_id (asset_code), asset_name, description, created_by (user name), modified_by (user name), asset_type (name), asset_status (name), trade (name), and custom field values.
- `view` [query] string enum[ids, compact, normal, extended] - The view type
- `include_profile_image` [query] boolean - Include profile image URLs in response. Profile image URLs are included in all views when this parameter is true.
- `include_bim_info` [query] boolean - Include BIM scene and object information in response. BIM info is included when this parameter is true.
- `wrap_custom_fields` [query] boolean - When true, wraps each custom field value as {"value": ...} and renames "name" to "label" inside LOV objects.
- `can_link_with` [query] string - When provided with normal or extended view, each asset includes a 'linkable' boolean indicating whether it can be linked with the specified item type. Supported values: PublicDomainApi::BimModelContext.
- `filters[id]` [query] string - Filter by asset IDs. Accepts a single ID or multiple comma-separated IDs (e.g., 'id1,id2,id3').
- `filters[asset_type_id]` [query] string - Filter by asset type IDs. Accepts a single ID or multiple comma-separated IDs (e.g., 'typeId1,typeId2').
- `filters[created_at]` [query] string - Created at filter (date range format: YYYY-MM-DD...YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ...YYYY-MM-DDTHH:MM:SSZ)
- `filters[modified_at]` [query] string - Updated at filter (date range format: YYYY-MM-DD...YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ...YYYY-MM-DDTHH:MM:SSZ)
- `filters[asset_status_id]` [query] string - Filter by asset status IDs. Accepts a single ID or multiple comma-separated IDs (e.g., 'statusId1,statusId2').
- `filters[location_id]` [query] string - Filter by location IDs. Accepts a single ID or multiple comma-separated IDs (e.g., 'locId1,locId2').
- `filters[trade_id]` [query] string - Filter by trade IDs. Accepts a single ID or multiple comma-separated IDs (e.g., 'tradeId1,tradeId2').
- `filters[scene_id]` [query] string - Filter by BIM scene IDs. Accepts a single ID or multiple comma-separated IDs (e.g., 'sceneId1,sceneId2').
- `filters[asset_code]` [query] string - Filter by asset IDs (asset_code in API, also referred as asset_id). Case-insensitive. Accepts a single ID or multiple comma-separated IDs (e.g., 'ASSET-001,ASSET-002').
- `filters[custom_field_id]` [query] string - Filter by custom field values. Supported only for single select, multi-select, and datetime fields. Can be used multiple times for different custom fields. Supports single values (e.g., 'filters[custom_field_123]=id1'...
- `sort` [query] string enum[created_at, modified_at, asset_name, asset_code, asset_type, asset_status, trade] - Sorting criteria in minus-based order format. Default sort order is ascending. Multiple sort criteria can be provided in CSV format, for example: sort=asset_name,-modified_at.
- `page` [query] integer(int32) - One-based page index (1..N)
- `per_page` [query] integer(int32) - The size of the page to be returned
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): oneOf(object | object | object | object)


Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/assets

**Create Asset**
Creates a new project asset with the provided details

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `asset_type_id`: string (required) - Asset type ID (primary key of the asset type). Must have Is Asset enabled for that type.
- `asset_name`: string - Name of the asset.
- `asset_status_id`: string (required) - Asset status ID.
- `asset_code`: string - Unique identifier for the asset (also referred to as asset_code in API). Must be unique at company level (case-insensitive). Optional when an active naming rule exists—the ID (code) will be auto-generated.
- `description`: string - Description of the asset
- `location_id`: string - Location ID where the asset is located (only applicable for project asset)
- `trade_id`: string - Trade ID associated with the asset
- `latitude`: number(double) - Latitude must be provided together with longitude, or both must be omitted.(only applicable for project asset)
- `longitude`: number(double) - Longitude must be provided together with latitude, or both must be omitted.(only applicable for project asset)
- `profile_image_id`: string - Profile image FAS ID
- `parent_asset_id`: string - Parent asset ID. Optional. When provided, creates a parent-child relationship. The parent must exist, belong to the same company, and be in the same asset type hierarchy.
- `custom_fields`: object - Custom fields map. Key: 'custom\_field\_{id}'. Supported types: STRING (text), RICH_TEXT (HTML), BOOLEAN, DECIMAL, DATETIME (ISO 8601), LOV_ENTRY ({id, name}), LOV_ENTRIES ([{id, name}]). Field definitions available v... e.g. `{"custom_field_123": "text value", "custom_field_456": {"id": "1", "name": "O...`

Response 201 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/{asset_id}/link_sub_assets

**Link Sub-Assets to a Parent Asset**
Links one or more existing assets as sub-assets of the parent asset identified by asset_id within the given project. All-or-nothing: any hierarchy rule violation rejects the whole call with HTTP 422. When the parent's ancestor chain is not in the children's project and cascadeAncestors is false (default), the call is rejected with HTTP 409; retry with cascadeAncestors=true to pull the ancestors into the project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `asset_id` [path] string (required) - Unique identifier for the parent asset
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `asset_ids`: array of string - Asset ids to link as sub-assets of the parent asset. Must contain at least one id and no more than 500 ids. e.g. `["01J0ABCXYZ123456789ABCDEF0", "01J0ABCXYZ123456789ABCDEF1"]`
- `cascade_ancestors`: boolean - If true, transparently pull the parent's ancestor chain into the children's project when the chain is not already there. If false (default), the request returns 409 listing the ancestors that need pulling in so the UI...

Response 200 (application/json): object

- `data`: object - Successful response for the Link-Sub-Assets endpoint. Returned only when every selected asset was linked; rule violations surface as 422 instead.
  - `linked_count`: integer(int32) - Number of assets linked as sub-assets in this request. e.g. `12`
  - `linked_asset_ids`: array of string - Asset ids that were linked as sub-assets of the parent. e.g. `["01J0ABCXYZ123456789ABCDEF0", "01J0ABCXYZ123456789ABCDEF1"]`
  - `message`: string - Human-readable summary, e.g. "12 assets linked as sub-assets of PUMP-001". e.g. `12 assets linked as sub-assets of PUMP-001`

Error responses: 400, 401, 403, 404, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/{asset_id}

**Show Asset**
Returns Asset Details by given Company, Project & Asset

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `asset_id` [path] string (required) - Unique identifier for the asset
- `wrap_custom_fields` [query] boolean - When true, wraps each custom field value as {"value": ...} and renames "name" to "label" inside LOV objects.
- `custom_field_format` [query] string - Custom field encoding. 'standard' (default) uses the existing published 200 schema; 'mobile' returns a bounded subset (AssetMobileResponse) with each custom field as {data_type, value} and (on update) accepts id-only ...
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/{asset_id}

**Update Asset**
Updates the project asset model based on keys in the request body

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `asset_id` [path] string (required) - Unique identifier for the asset
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `acknowledge_warnings` [query] boolean - When true, acknowledges field-default warnings and applies default values for read-only fields whose current value differs from the configured default.
- `wrap_custom_fields` [query] boolean - When true, wraps each custom field value as {"value": ...} and renames "name" to "label" inside LOV objects.
- `custom_field_format` [query] string - Custom field encoding. 'standard' (default) uses the existing published 200 schema; 'mobile' returns a bounded subset (AssetMobileResponse) with each custom field as {data_type, value} and (on update) accepts id-only ...
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json):

- `asset_type_id`: string - Asset type ID. Must have Is Asset enabled for that type. If asset type is changed, all custom fields will be reset and only the ones provided in this request will be set.
- `asset_name`: string - Name of the asset
- `asset_status_id`: string - Asset status ID
- `notes`: object - Notes by context. Keys are context identifiers; value is the note text. Supported keys: "asset_status" (stored only when status is changed in this request), "project_assignment" (stored when provided). Enables adding ... e.g. `{"asset_status": "Reason for status change", "project_assignment": "Assignmen...`
- `asset_code`: string - Unique identifier for the asset (also referred to as asset_code in API)
- `description`: string - Description of the asset. Pass null to clear the value.
- `location_id`: string - Location ID. Pass null to clear the value.
- `trade_id`: string - Trade ID. Pass null to clear the value.
- `latitude`: number(double) - Latitude must be provided together with longitude, or both must be omitted. Pass null to clear.
- `longitude`: number(double) - Longitude must be provided together with latitude, or both must be omitted. Pass null to clear.
- `parent_asset_id`: string - Parent asset ID. Pass null to remove parent (make standalone). The parent must exist, belong to the same company, and be in the same asset type hierarchy.
- `cascade_ancestors`: boolean - When the new parent (or any of its ancestors) is at company scope or on a different project than the child, opt in to cascade-pull those ancestors into the child's project. Defaults to false (returns HTTP 409 with the... e.g. `false`
- `profile_image_id`: string - Profile image FAS ID. Pass null to clear the value.
- `custom_fields`: object - Custom fields map with merge semantics. Key: 'custom\_field\_{id}'. Only fields included in this map will be updated - absent fields remain unchanged. To remove a specific field, set its value to null. To clear ALL cu... e.g. `{"custom_field_123": "text value", "custom_field_456": {"id": "1", "name": "O...`

Response 200 (application/json): oneOf(object | object | object)


Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/{asset_id}

**Delete Asset**
Deletes a project asset and all its associated attachments, related items and change history. If the asset has descendants in the asset hierarchy, the caller must opt in with ?cascade=true; otherwise the request fails with HTTP 409 and the response body lists the blocking descendants so the UI can prompt for confirmation.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `asset_id` [path] string (required) - Unique identifier for the asset
- `cascade` [query] boolean - When true, also delete every descendant asset in the subtree atomically. Defaults to false; required when the asset has children.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 204: Asset deleted successfully (no body)

Error responses: 400, 401, 403, 404, 409 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/{asset_id}/delete_preview

**Preview Asset Deletion**
Returns the impact of deleting the given project asset, including the count and lightweight projections of every descendant in the subtree. Read-only — no rows are modified. The UI uses this to render the confirmation copy required by hierarchy v2.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `asset_id` [path] string (required) - Unique identifier for the asset whose deletion is being previewed.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: object - Impact summary for a hierarchy-aware single-asset delete, including the leaves-first projections of every descendant that would be cascaded.
  - `asset_id`: string - ID of the asset whose deletion is being previewed.
  - `descendant_count`: integer(int32) - Number of descendant assets that would be cascaded. e.g. `4`
  - `total_impacted`: integer(int32) - Total number of assets impacted including the root (descendantCount + 1). e.g. `5`
  - `descendants`: array of object
    - `id`: string - Descendant asset ID.
    - `asset_code`: string - Descendant asset code. e.g. `PRJ-HVAC-0042`
    - `name`: string - Descendant asset name.
    - `depth`: integer(int32) - Depth from the root being deleted (1 = direct child). e.g. `2`
    - `scope`: string enum[company, project] - Asset scope: 'company' if the asset originated in the company register, 'project' if it was created directly in a project. Project-context callers cannot cascade-delete subtrees containing company-scoped descendants. e.g. `project`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/by_code/{asset_code}

**Show Asset by Code**
Returns Asset Details by given Project & Asset Code (case-insensitive)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `asset_code` [path] string (required) - Asset ID / asset code identifier (case-insensitive)
- `wrap_custom_fields` [query] boolean - When true, wraps each custom field value as {"value": ...} and renames "name" to "label" inside LOV objects.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: object - Asset item in normal view
  - `id`: string - Unique asset identifier e.g. `ASSET_001`
  - `asset_name`: string - Name of the asset e.g. `HVAC Unit 1`
  - `asset_code`: string - Unique Asset ID (asset_code in API) e.g. `HVAC-001`
  - `asset_status`: object - Reference object with id, name, and metadata (normal/extended view)
    - `id`: string - Unique identifier e.g. `ABC123XYZ`
    - `name`: string - Display name e.g. `Active`
    - `metadata`: object - Additional metadata. Content varies by reference type: asset_status has status_group_id and color_code; asset_type has Asset Type ID (code in metadata) and fieldset_id; location may have parent_id. e.g. `{"status_group_id": "STATUS_GRP_001", "color_code": "green"}`
  - `description`: string - Asset description
  - `asset_type`: object - Reference object with id, name, and metadata (normal/extended view)
    - `id`: string - Unique identifier e.g. `ABC123XYZ`
    - `name`: string - Display name e.g. `Active`
    - `metadata`: object - Additional metadata. Content varies by reference type: asset_status has status_group_id and color_code; asset_type has Asset Type ID (code in metadata) and fieldset_id; location may have parent_id. e.g. `{"status_group_id": "STATUS_GRP_001", "color_code": "green"}`
  - `location`: object - Reference object with id, name, and metadata (normal/extended view)
    - `id`: string - Unique identifier e.g. `ABC123XYZ`
    - `name`: string - Display name e.g. `Active`
    - `metadata`: object - Additional metadata. Content varies by reference type: asset_status has status_group_id and color_code; asset_type has Asset Type ID (code in metadata) and fieldset_id; location may have parent_id. e.g. `{"status_group_id": "STATUS_GRP_001", "color_code": "green"}`
  - `trade`: object - Reference object with id, name, and metadata (normal/extended view)
    - `id`: string - Unique identifier e.g. `ABC123XYZ`
    - `name`: string - Display name e.g. `Active`
    - `metadata`: object - Additional metadata. Content varies by reference type: asset_status has status_group_id and color_code; asset_type has Asset Type ID (code in metadata) and fieldset_id; location may have parent_id. e.g. `{"status_group_id": "STATUS_GRP_001", "color_code": "green"}`
  - `company_id`: string - Company identifier e.g. `100`
  - `project_id`: string - Project identifier (present for project-level assets) e.g. `200`
  - `modified_at`: string(date-time) - Last modification timestamp e.g. `2025-01-15T10:30:00Z`
  - `created_at`: string(date-time) - Creation timestamp e.g. `2025-01-01T08:00:00Z`
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `custom_fields`: object - Custom fields as key-value pairs. Keys are field identifiers, values vary by field type. e.g. `{"custom_field_1": "value", "custom_field_2": true}`
  - `profile_image_id`: string - Profile image attachment ID e.g. `fas-IMG001`
  - `notes`: object - Notes by context. Keys: project_assignment, asset_status, etc. Exposes all context notes. e.g. `{"project_assignment": "Assigned to project X", "asset_status": "Status chang...`
  - `profile_image_url`: string - Profile image URL. Only populated when include_profile_image=true query parameter is set.
  - `scene_bim_object_info`: object - BIM scene and object information. Populated when include_bim_info=true.
    - `scene_id`: string (required) - Scene identifier e.g. `SCENE_001`
    - `procore_object_id`: string (required)
    - `object_id`: string - BIM object identifier within the scene e.g. `OBJ_001`
    - `procore_instance_id`: string - Procore instance ID for BIM object e.g. `INST_001`
  - `latitude`: number(double) - Latitude coordinate for asset location
  - `longitude`: number(double) - Longitude coordinate for asset location
  - `scope`: string enum[company, project] - Scope of the asset (e.g., company, project). e.g. `project`
  - `attachment_count`: integer(int32) - Number of attachments for this asset
  - `project`: object - Reference object with id and name (compact view - no metadata)
    - `id`: string - Unique identifier e.g. `ABC123XYZ`
    - `name`: string - Display name e.g. `Active`
  - `parent_asset`: object - Parent asset reference with id, name, and asset_code
    - `id`: string - Unique identifier of the parent asset e.g. `ASSET_001`
    - `name`: string - Name of the parent asset e.g. `HVAC Unit 1`
    - `asset_code`: string - Asset code of the parent asset e.g. `HVAC-001`
  - `parent_asset_code`: string - Deprecated: use parent_asset.asset_code instead. Asset code of the parent asset. Null when the asset has no parent.
  - `punch_list`: integer(int32) - Number of punch list items linked to this asset
  - `observations`: integer(int32) - Number of observations linked to this asset
  - `inspections`: integer(int32) - Number of inspections linked to this asset
  - `inspection_items`: integer(int32) - Number of inspection items linked to this asset
  - `rfi`: integer(int32) - Number of RFIs linked to this asset
  - `submittals`: integer(int32) - Number of submittals linked to this asset
  - `incidents`: integer(int32) - Number of incidents linked to this asset
  - `linkable`: boolean - Whether this asset can be linked to other Procore items
  - `has_children`: boolean - Whether this asset has child assets
  - `children_count`: integer(int32) - Number of direct child assets. Null when hasChildren is false.

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Default Field Values

Resource id: `project-default-field-values`. Raw spec: `../openapi-raw/project-default-field-values.json`. Web: https://developers.procore.com/reference/rest/project-default-field-values?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/field_values

**List Default Field Values**
Returns default field values for a given field code.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `field_code` [query] string (required) - Unique field code to retrieve values for (e.g., ATTACHMENT_TYPE)
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `id`: string
  - `name`: string
  - `key`: string
  - `active`: boolean
  - `company_id`: string
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Field Rules

Resource id: `project-field-rules`. Raw spec: `../openapi-raw/project-field-rules.json`. Web: https://developers.procore.com/reference/rest/project-field-rules?version=latest
Product lines: asset-register

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/settings/field_rules

**Bulk Create Field Rules (Project Scope)**
Creates multiple project-scoped field rules in a single request. Each item is validated independently; the response reports successes and failures per item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Rule type. Defaults to NAMING for backward compatibility.
- `asset_type_id`: string - Asset type id (required for FIELD_DEFAULTS; null for NAMING).
- `fieldset_id`: string - Fieldset id (required for FIELD_DEFAULTS). '-1' for Procore default fields; external configurable fieldset id for custom fields. Null for NAMING.
- `trigger_field`: string (required) - Trigger field. For NAMING: asset_code. For FIELD_DEFAULTS: the field this rule configures (e.g., custom_field_1234, trade_id).
- `rule_name`: string - Display name for the rule. Optional: when omitted or blank, the backend auto-generates a scope-indicative name of the form '{rule_type}::{company_id}::{asset_type_id|NA}::{fieldset_id|NA}::{trigger_field}'.
- `description`: string - Optional description
- `is_active`: boolean - Whether the rule is created active. Absent/null defaults to active. Set false to create an inactive rule directly (e.g. a draft); for MANDATORY/WARNING rules an inactive rule skips conflict validation because inactive...
- `rule_group_id`: string - Groups granular rules created from a single admin UI row (MANDATORY/WARNING). Normally set by the grouped create API; optional and null for standalone/legacy clients.
- `conditions`: object - Conditions AST for a conditional-validation rule
  - `schema_version`: integer(int32) (required) - Version of the conditions schema
  - `root`: object (required) - Root node of the recursive conditions tree
- `definition`: oneOf(object | object | object) (required) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.

Response 200 (application/json): object

- `data`: object - Response for bulk field rule create or update operations
  - `succeeded`: array of object - Rules that were successfully created or updated
    - `id`: string - Unique identifier of the field rule
    - `company_id`: integer(int64) - Company this rule belongs to
    - `project_id`: integer(int64) - Project this rule applies to; null for company-level rules
    - `asset_type_id`: string - Asset type this rule applies to. Populated for FIELD_DEFAULTS; null for NAMING.
    - `fieldset_id`: string - Fieldset scope. '-1' for Procore default fields, external configurable fieldset id for custom fields. Null for NAMING.
    - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Kind of rule
    - `trigger_field`: string - Field that triggers this rule (e.g. asset_code for NAMING, custom_field_1234 for FIELD_DEFAULTS)
    - `rule_name`: string - Name of the rule
    - `description`: string - Optional description of the rule
    - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
    - `conditions`: object - Conditions AST for a conditional-validation rule
    - `rule_group_id`: string - Group id linking granular rules authored from one admin UI row. Null when ungrouped.
    - `expression`: string - Derived expression string (e.g. 'default=Carrier, readOnly=true')
    - `is_active`: boolean - Whether the rule is active and applied; false to deactivate without deleting
    - `lov_fields`: object
    - `validation_errors`: array of object - Validation issues detected on this rule. Null when the rule is valid; a non-empty list otherwise.
    - `overridden`: boolean - Project-scope overlay indicator. Populated only in the project-scoped list view: true when a project rule overrides the company configuration for this field (value and/or editability differs, or no company rule exists...
    - `created_at`: string(date-time)
    - `modified_at`: string(date-time)
    - `created_by`: object - Contact Information
    - `modified_by`: object - Contact Information
  - `failures`: array of object - Rules that failed validation or persistence
    - `index`: integer(int32) - Zero-based index of the item in the request list
    - `rule_id`: string - Rule ID (populated for update failures; null for create failures)
    - `trigger_field`: string - Trigger field (populated for create failures; null for update failures)
    - `error`: string - Error message describing why the operation failed

Response 207 (application/json): object

- `data`: object - Response for bulk field rule create or update operations
  - `succeeded`: array of object - Rules that were successfully created or updated
    - `id`: string - Unique identifier of the field rule
    - `company_id`: integer(int64) - Company this rule belongs to
    - `project_id`: integer(int64) - Project this rule applies to; null for company-level rules
    - `asset_type_id`: string - Asset type this rule applies to. Populated for FIELD_DEFAULTS; null for NAMING.
    - `fieldset_id`: string - Fieldset scope. '-1' for Procore default fields, external configurable fieldset id for custom fields. Null for NAMING.
    - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Kind of rule
    - `trigger_field`: string - Field that triggers this rule (e.g. asset_code for NAMING, custom_field_1234 for FIELD_DEFAULTS)
    - `rule_name`: string - Name of the rule
    - `description`: string - Optional description of the rule
    - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
    - `conditions`: object - Conditions AST for a conditional-validation rule
    - `rule_group_id`: string - Group id linking granular rules authored from one admin UI row. Null when ungrouped.
    - `expression`: string - Derived expression string (e.g. 'default=Carrier, readOnly=true')
    - `is_active`: boolean - Whether the rule is active and applied; false to deactivate without deleting
    - `lov_fields`: object
    - `validation_errors`: array of object - Validation issues detected on this rule. Null when the rule is valid; a non-empty list otherwise.
    - `overridden`: boolean - Project-scope overlay indicator. Populated only in the project-scoped list view: true when a project rule overrides the company configuration for this field (value and/or editability differs, or no company rule exists...
    - `created_at`: string(date-time)
    - `modified_at`: string(date-time)
    - `created_by`: object - Contact Information
    - `modified_by`: object - Contact Information
  - `failures`: array of object - Rules that failed validation or persistence
    - `index`: integer(int32) - Zero-based index of the item in the request list
    - `rule_id`: string - Rule ID (populated for update failures; null for create failures)
    - `trigger_field`: string - Trigger field (populated for create failures; null for update failures)
    - `error`: string - Error message describing why the operation failed

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PUT /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/settings/field_rules

**Bulk Update Field Rules (Project Scope)**
Updates multiple project-scoped field rules in a single request. Each item carries its own rule_id, must belong to the given project, and is validated independently; the response reports successes and failures per item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `rule_id`: string (required) - ID of the field rule to update
- `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Optional metadata. NOT updatable: if provided, must match the existing rule's type; the server rejects mismatches.
- `fieldset_id`: string - New fieldset id (FIELD_DEFAULTS only)
- `rule_name`: string - Display name for the rule
- `description`: string - Optional description
- `definition`: object - Rule definition; shape must match the rule's stored type
- `is_active`: boolean - Whether the rule is active

Response 200 (application/json): object

- `data`: object - Response for bulk field rule create or update operations
  - `succeeded`: array of object - Rules that were successfully created or updated
    - `id`: string - Unique identifier of the field rule
    - `company_id`: integer(int64) - Company this rule belongs to
    - `project_id`: integer(int64) - Project this rule applies to; null for company-level rules
    - `asset_type_id`: string - Asset type this rule applies to. Populated for FIELD_DEFAULTS; null for NAMING.
    - `fieldset_id`: string - Fieldset scope. '-1' for Procore default fields, external configurable fieldset id for custom fields. Null for NAMING.
    - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Kind of rule
    - `trigger_field`: string - Field that triggers this rule (e.g. asset_code for NAMING, custom_field_1234 for FIELD_DEFAULTS)
    - `rule_name`: string - Name of the rule
    - `description`: string - Optional description of the rule
    - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
    - `conditions`: object - Conditions AST for a conditional-validation rule
    - `rule_group_id`: string - Group id linking granular rules authored from one admin UI row. Null when ungrouped.
    - `expression`: string - Derived expression string (e.g. 'default=Carrier, readOnly=true')
    - `is_active`: boolean - Whether the rule is active and applied; false to deactivate without deleting
    - `lov_fields`: object
    - `validation_errors`: array of object - Validation issues detected on this rule. Null when the rule is valid; a non-empty list otherwise.
    - `overridden`: boolean - Project-scope overlay indicator. Populated only in the project-scoped list view: true when a project rule overrides the company configuration for this field (value and/or editability differs, or no company rule exists...
    - `created_at`: string(date-time)
    - `modified_at`: string(date-time)
    - `created_by`: object - Contact Information
    - `modified_by`: object - Contact Information
  - `failures`: array of object - Rules that failed validation or persistence
    - `index`: integer(int32) - Zero-based index of the item in the request list
    - `rule_id`: string - Rule ID (populated for update failures; null for create failures)
    - `trigger_field`: string - Trigger field (populated for create failures; null for update failures)
    - `error`: string - Error message describing why the operation failed

Response 207 (application/json): object

- `data`: object - Response for bulk field rule create or update operations
  - `succeeded`: array of object - Rules that were successfully created or updated
    - `id`: string - Unique identifier of the field rule
    - `company_id`: integer(int64) - Company this rule belongs to
    - `project_id`: integer(int64) - Project this rule applies to; null for company-level rules
    - `asset_type_id`: string - Asset type this rule applies to. Populated for FIELD_DEFAULTS; null for NAMING.
    - `fieldset_id`: string - Fieldset scope. '-1' for Procore default fields, external configurable fieldset id for custom fields. Null for NAMING.
    - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Kind of rule
    - `trigger_field`: string - Field that triggers this rule (e.g. asset_code for NAMING, custom_field_1234 for FIELD_DEFAULTS)
    - `rule_name`: string - Name of the rule
    - `description`: string - Optional description of the rule
    - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
    - `conditions`: object - Conditions AST for a conditional-validation rule
    - `rule_group_id`: string - Group id linking granular rules authored from one admin UI row. Null when ungrouped.
    - `expression`: string - Derived expression string (e.g. 'default=Carrier, readOnly=true')
    - `is_active`: boolean - Whether the rule is active and applied; false to deactivate without deleting
    - `lov_fields`: object
    - `validation_errors`: array of object - Validation issues detected on this rule. Null when the rule is valid; a non-empty list otherwise.
    - `overridden`: boolean - Project-scope overlay indicator. Populated only in the project-scoped list view: true when a project rule overrides the company configuration for this field (value and/or editability differs, or no company rule exists...
    - `created_at`: string(date-time)
    - `modified_at`: string(date-time)
    - `created_by`: object - Contact Information
    - `modified_by`: object - Contact Information
  - `failures`: array of object - Rules that failed validation or persistence
    - `index`: integer(int32) - Zero-based index of the item in the request list
    - `rule_id`: string - Rule ID (populated for update failures; null for create failures)
    - `trigger_field`: string - Trigger field (populated for create failures; null for update failures)
    - `error`: string - Error message describing why the operation failed

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PUT /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/settings/field_rules/{rule_id}

**Update Field Rule (Project Scope)**
Updates a project-scoped field rule's definition / metadata. The rule must belong to the given project. Scope fields (assetTypeId, triggerField, ruleType) cannot be changed.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `rule_id` [path] string (required) - Unique identifier for the field rule.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Optional metadata. NOT updatable: if provided, must match the existing rule's type; the server rejects mismatches.
- `fieldset_id`: string - New fieldset id. FIELD_DEFAULTS only; ignored / rejected for NAMING. Provided to recover a rule whose asset type's fieldset has been changed by an admin. Must match the asset type's current fieldset and must contain t...
- `rule_name`: string - Display name for the rule
- `description`: string - Optional description
- `definition`: object - Rule definition. Shape must match the rule's stored type — for NAMING, supply expression_fields; for FIELD_DEFAULTS, supply actions. Sent as a raw JSON object; the server converts it to the correct subtype and runs ex...
- `is_active`: boolean - Whether the rule is active. Set to false to deactivate.
- `conditions`: object - Conditions AST for a conditional-validation rule
  - `schema_version`: integer(int32) (required) - Version of the conditions schema
  - `root`: object (required) - Root node of the recursive conditions tree

Response 200 (application/json): object

- `data`: object - Field rule response (NAMING or FIELD_DEFAULTS)
  - `id`: string - Unique identifier of the field rule
  - `company_id`: integer(int64) - Company this rule belongs to
  - `project_id`: integer(int64) - Project this rule applies to; null for company-level rules
  - `asset_type_id`: string - Asset type this rule applies to. Populated for FIELD_DEFAULTS; null for NAMING.
  - `fieldset_id`: string - Fieldset scope. '-1' for Procore default fields, external configurable fieldset id for custom fields. Null for NAMING.
  - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Kind of rule
  - `trigger_field`: string - Field that triggers this rule (e.g. asset_code for NAMING, custom_field_1234 for FIELD_DEFAULTS)
  - `rule_name`: string - Name of the rule
  - `description`: string - Optional description of the rule
  - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
  - `conditions`: object - Conditions AST for a conditional-validation rule
    - `schema_version`: integer(int32) (required) - Version of the conditions schema
    - `root`: object (required) - Root node of the recursive conditions tree
  - `rule_group_id`: string - Group id linking granular rules authored from one admin UI row. Null when ungrouped.
  - `expression`: string - Derived expression string (e.g. 'default=Carrier, readOnly=true')
  - `is_active`: boolean - Whether the rule is active and applied; false to deactivate without deleting
  - `lov_fields`: object
  - `validation_errors`: array of object - Validation issues detected on this rule. Null when the rule is valid; a non-empty list otherwise.
    - `code`: string enum[FIELDSET_NOT_FOUND, FIELDSET_NOT_MAPPED, FIELD_NOT_FOUND, LOV_ENTRY_NOT_FOUND, VENDOR_NOT_FOUND, STATUS_NOT_FOUND, STATUS_GROUP_MISMATCH, CONDITIONAL_TARGET_FIELD_INELIGIBLE, CONDITIONAL_TARGET_FIELD_ALWAYS_REQUIRED, ASSET_TYPE_NOT_FOUND, TRADE_NOT_FOUND, ASSET_TYPE_HIDDEN_AT_PROJECT, ...] - Code identifying the class of issue.
    - `severity`: string - Severity of the issue ("error" or "warning").
    - `cause`: string - Description of what went wrong.
    - `effect`: string - Description of the impact of this issue.
    - `remedy`: string - Guidance on how an admin can resolve the issue.
  - `overridden`: boolean - Project-scope overlay indicator. Populated only in the project-scoped list view: true when a project rule overrides the company configuration for this field (value and/or editability differs, or no company rule exists...
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/settings/field_rules/{rule_id}

**Delete Field Rule (Project Scope)**
Deletes a project-scoped field rule. This reverts the field to the inherited company configuration at the project. The rule must belong to the given project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `rule_id` [path] string (required) - Unique identifier for the field rule.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/settings/field_rules/create

**Create Field Rule (Project Scope)**
Creates a project-scoped FIELD_DEFAULTS rule. The rule fully overrides the company configuration for its field at this project (value + editability). The asset type must be visible at the project, and the (asset type, fieldset, trigger field) scope must be unique among the project's active rules.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Rule type. Defaults to NAMING for backward compatibility.
- `asset_type_id`: string - Asset type id (required for FIELD_DEFAULTS; null for NAMING).
- `fieldset_id`: string - Fieldset id (required for FIELD_DEFAULTS). '-1' for Procore default fields; external configurable fieldset id for custom fields. Null for NAMING.
- `trigger_field`: string (required) - Trigger field. For NAMING: asset_code. For FIELD_DEFAULTS: the field this rule configures (e.g., custom_field_1234, trade_id).
- `rule_name`: string - Display name for the rule. Optional: when omitted or blank, the backend auto-generates a scope-indicative name of the form '{rule_type}::{company_id}::{asset_type_id|NA}::{fieldset_id|NA}::{trigger_field}'.
- `description`: string - Optional description
- `is_active`: boolean - Whether the rule is created active. Absent/null defaults to active. Set false to create an inactive rule directly (e.g. a draft); for MANDATORY/WARNING rules an inactive rule skips conflict validation because inactive...
- `rule_group_id`: string - Groups granular rules created from a single admin UI row (MANDATORY/WARNING). Normally set by the grouped create API; optional and null for standalone/legacy clients.
- `conditions`: object - Conditions AST for a conditional-validation rule
  - `schema_version`: integer(int32) (required) - Version of the conditions schema
  - `root`: object (required) - Root node of the recursive conditions tree
- `definition`: oneOf(object | object | object) (required) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.

Response 201 (application/json): object

- `data`: object - Field rule response (NAMING or FIELD_DEFAULTS)
  - `id`: string - Unique identifier of the field rule
  - `company_id`: integer(int64) - Company this rule belongs to
  - `project_id`: integer(int64) - Project this rule applies to; null for company-level rules
  - `asset_type_id`: string - Asset type this rule applies to. Populated for FIELD_DEFAULTS; null for NAMING.
  - `fieldset_id`: string - Fieldset scope. '-1' for Procore default fields, external configurable fieldset id for custom fields. Null for NAMING.
  - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Kind of rule
  - `trigger_field`: string - Field that triggers this rule (e.g. asset_code for NAMING, custom_field_1234 for FIELD_DEFAULTS)
  - `rule_name`: string - Name of the rule
  - `description`: string - Optional description of the rule
  - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
  - `conditions`: object - Conditions AST for a conditional-validation rule
    - `schema_version`: integer(int32) (required) - Version of the conditions schema
    - `root`: object (required) - Root node of the recursive conditions tree
  - `rule_group_id`: string - Group id linking granular rules authored from one admin UI row. Null when ungrouped.
  - `expression`: string - Derived expression string (e.g. 'default=Carrier, readOnly=true')
  - `is_active`: boolean - Whether the rule is active and applied; false to deactivate without deleting
  - `lov_fields`: object
  - `validation_errors`: array of object - Validation issues detected on this rule. Null when the rule is valid; a non-empty list otherwise.
    - `code`: string enum[FIELDSET_NOT_FOUND, FIELDSET_NOT_MAPPED, FIELD_NOT_FOUND, LOV_ENTRY_NOT_FOUND, VENDOR_NOT_FOUND, STATUS_NOT_FOUND, STATUS_GROUP_MISMATCH, CONDITIONAL_TARGET_FIELD_INELIGIBLE, CONDITIONAL_TARGET_FIELD_ALWAYS_REQUIRED, ASSET_TYPE_NOT_FOUND, TRADE_NOT_FOUND, ASSET_TYPE_HIDDEN_AT_PROJECT, ...] - Code identifying the class of issue.
    - `severity`: string - Severity of the issue ("error" or "warning").
    - `cause`: string - Description of what went wrong.
    - `effect`: string - Description of the impact of this issue.
    - `remedy`: string - Guidance on how an admin can resolve the issue.
  - `overridden`: boolean - Project-scope overlay indicator. Populated only in the project-scoped list view: true when a project rule overrides the company configuration for this field (value and/or editability differs, or no company rule exists...
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Fieldsets

Resource id: `project-fieldsets`. Raw spec: `../openapi-raw/project-fieldsets.json`. Web: https://developers.procore.com/reference/rest/project-fieldsets?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/fieldsets/{fieldset_id}

**Show Fieldset**
Returns a fieldset with detailed field definitions for a given project. All fields including project-level fields (location_id, latitude, longitude) are included.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `fieldset_id` [path] string (required) - Unique identifier for the Fieldset
- `include_lov_entries` [query] boolean - Whether to include list of values entries for LOV fields
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: object
  - `id`: integer(int64)
  - `class_name`: string
  - `fields`: object
  - `name`: string
  - `sections`: array of object
    - `id`: integer(int64)
    - `description`: string
    - `name`: string
    - `position`: integer(int32)
    - `from_v1_custom_fields`: boolean
  - `type`: string
  - `updated_at`: string(date-time)
  - `updated_by`: object
    - `id`: integer(int64)
    - `name`: string

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Naming Standard

Resource id: `project-naming-standard`. Raw spec: `../openapi-raw/project-naming-standard.json`. Web: https://developers.procore.com/reference/rest/project-naming-standard?version=latest
Product lines: asset-register

### PUT /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/settings/naming_standard/{rule_id}

**Update project naming standard rule**
Updates an existing project naming rule. Use isActive=false to deactivate without deleting.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `rule_id` [path] string (required) - Unique identifier for the naming rule.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Optional metadata. NOT updatable: if provided, must match the existing rule's type; the server rejects mismatches.
- `fieldset_id`: string - New fieldset id. FIELD_DEFAULTS only; ignored / rejected for NAMING. Provided to recover a rule whose asset type's fieldset has been changed by an admin. Must match the asset type's current fieldset and must contain t...
- `rule_name`: string - Display name for the rule
- `description`: string - Optional description
- `definition`: object - Rule definition. Shape must match the rule's stored type — for NAMING, supply expression_fields; for FIELD_DEFAULTS, supply actions. Sent as a raw JSON object; the server converts it to the correct subtype and runs ex...
- `is_active`: boolean - Whether the rule is active. Set to false to deactivate.
- `conditions`: object - Conditions AST for a conditional-validation rule
  - `schema_version`: integer(int32) (required) - Version of the conditions schema
  - `root`: object (required) - Root node of the recursive conditions tree

Response 200 (application/json): object

- `data`: object - Field rule response (NAMING or FIELD_DEFAULTS)
  - `id`: string - Unique identifier of the field rule
  - `company_id`: integer(int64) - Company this rule belongs to
  - `project_id`: integer(int64) - Project this rule applies to; null for company-level rules
  - `asset_type_id`: string - Asset type this rule applies to. Populated for FIELD_DEFAULTS; null for NAMING.
  - `fieldset_id`: string - Fieldset scope. '-1' for Procore default fields, external configurable fieldset id for custom fields. Null for NAMING.
  - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Kind of rule
  - `trigger_field`: string - Field that triggers this rule (e.g. asset_code for NAMING, custom_field_1234 for FIELD_DEFAULTS)
  - `rule_name`: string - Name of the rule
  - `description`: string - Optional description of the rule
  - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
  - `conditions`: object - Conditions AST for a conditional-validation rule
    - `schema_version`: integer(int32) (required) - Version of the conditions schema
    - `root`: object (required) - Root node of the recursive conditions tree
  - `rule_group_id`: string - Group id linking granular rules authored from one admin UI row. Null when ungrouped.
  - `expression`: string - Derived expression string (e.g. 'default=Carrier, readOnly=true')
  - `is_active`: boolean - Whether the rule is active and applied; false to deactivate without deleting
  - `lov_fields`: object
  - `validation_errors`: array of object - Validation issues detected on this rule. Null when the rule is valid; a non-empty list otherwise.
    - `code`: string enum[FIELDSET_NOT_FOUND, FIELDSET_NOT_MAPPED, FIELD_NOT_FOUND, LOV_ENTRY_NOT_FOUND, VENDOR_NOT_FOUND, STATUS_NOT_FOUND, STATUS_GROUP_MISMATCH, CONDITIONAL_TARGET_FIELD_INELIGIBLE, CONDITIONAL_TARGET_FIELD_ALWAYS_REQUIRED, ASSET_TYPE_NOT_FOUND, TRADE_NOT_FOUND, ASSET_TYPE_HIDDEN_AT_PROJECT, ...] - Code identifying the class of issue.
    - `severity`: string - Severity of the issue ("error" or "warning").
    - `cause`: string - Description of what went wrong.
    - `effect`: string - Description of the impact of this issue.
    - `remedy`: string - Guidance on how an admin can resolve the issue.
  - `overridden`: boolean - Project-scope overlay indicator. Populated only in the project-scoped list view: true when a project rule overrides the company configuration for this field (value and/or editability differs, or no company rule exists...
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/settings/naming_standard/{rule_id}

**Delete project naming standard rule**
Permanently deletes the project naming rule.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `rule_id` [path] string (required) - Unique identifier for the naming rule.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/settings/naming_standard

**Get project naming standard rules**
Returns all naming standard rules visible at the project level: Procore Default rules, company-level rules, and project-specific rules, including inactive, ordered by modified date.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `include_lov_codes` [query] boolean - When true, active rules are enriched with LOV entries and their code mappings for LOV-type fields used in the expression.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object - List of naming standard rules
  - `id`: string - Unique identifier of the field rule
  - `company_id`: integer(int64) - Company this rule belongs to
  - `project_id`: integer(int64) - Project this rule applies to; null for company-level rules
  - `asset_type_id`: string - Asset type this rule applies to. Populated for FIELD_DEFAULTS; null for NAMING.
  - `fieldset_id`: string - Fieldset scope. '-1' for Procore default fields, external configurable fieldset id for custom fields. Null for NAMING.
  - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Kind of rule
  - `trigger_field`: string - Field that triggers this rule (e.g. asset_code for NAMING, custom_field_1234 for FIELD_DEFAULTS)
  - `rule_name`: string - Name of the rule
  - `description`: string - Optional description of the rule
  - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
  - `conditions`: object - Conditions AST for a conditional-validation rule
    - `schema_version`: integer(int32) (required) - Version of the conditions schema
    - `root`: object (required) - Root node of the recursive conditions tree
  - `rule_group_id`: string - Group id linking granular rules authored from one admin UI row. Null when ungrouped.
  - `expression`: string - Derived expression string (e.g. 'default=Carrier, readOnly=true')
  - `is_active`: boolean - Whether the rule is active and applied; false to deactivate without deleting
  - `lov_fields`: object
  - `validation_errors`: array of object - Validation issues detected on this rule. Null when the rule is valid; a non-empty list otherwise.
    - `code`: string enum[FIELDSET_NOT_FOUND, FIELDSET_NOT_MAPPED, FIELD_NOT_FOUND, LOV_ENTRY_NOT_FOUND, VENDOR_NOT_FOUND, STATUS_NOT_FOUND, STATUS_GROUP_MISMATCH, CONDITIONAL_TARGET_FIELD_INELIGIBLE, CONDITIONAL_TARGET_FIELD_ALWAYS_REQUIRED, ASSET_TYPE_NOT_FOUND, TRADE_NOT_FOUND, ASSET_TYPE_HIDDEN_AT_PROJECT, ...] - Code identifying the class of issue.
    - `severity`: string - Severity of the issue ("error" or "warning").
    - `cause`: string - Description of what went wrong.
    - `effect`: string - Description of the impact of this issue.
    - `remedy`: string - Guidance on how an admin can resolve the issue.
  - `overridden`: boolean - Project-scope overlay indicator. Populated only in the project-scoped list view: true when a project rule overrides the company configuration for this field (value and/or editability differs, or no company rule exists...
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/settings/naming_standard

**Create project naming standard rule**
Creates a NAMING rule for the project. Only one active naming rule per project is allowed.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Rule type. Defaults to NAMING for backward compatibility.
- `asset_type_id`: string - Asset type id (required for FIELD_DEFAULTS; null for NAMING).
- `fieldset_id`: string - Fieldset id (required for FIELD_DEFAULTS). '-1' for Procore default fields; external configurable fieldset id for custom fields. Null for NAMING.
- `trigger_field`: string (required) - Trigger field. For NAMING: asset_code. For FIELD_DEFAULTS: the field this rule configures (e.g., custom_field_1234, trade_id).
- `rule_name`: string - Display name for the rule. Optional: when omitted or blank, the backend auto-generates a scope-indicative name of the form '{rule_type}::{company_id}::{asset_type_id|NA}::{fieldset_id|NA}::{trigger_field}'.
- `description`: string - Optional description
- `is_active`: boolean - Whether the rule is created active. Absent/null defaults to active. Set false to create an inactive rule directly (e.g. a draft); for MANDATORY/WARNING rules an inactive rule skips conflict validation because inactive...
- `rule_group_id`: string - Groups granular rules created from a single admin UI row (MANDATORY/WARNING). Normally set by the grouped create API; optional and null for standalone/legacy clients.
- `conditions`: object - Conditions AST for a conditional-validation rule
  - `schema_version`: integer(int32) (required) - Version of the conditions schema
  - `root`: object (required) - Root node of the recursive conditions tree
- `definition`: oneOf(object | object | object) (required) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.

Response 200 (application/json): object

- `data`: object - Field rule response (NAMING or FIELD_DEFAULTS)
  - `id`: string - Unique identifier of the field rule
  - `company_id`: integer(int64) - Company this rule belongs to
  - `project_id`: integer(int64) - Project this rule applies to; null for company-level rules
  - `asset_type_id`: string - Asset type this rule applies to. Populated for FIELD_DEFAULTS; null for NAMING.
  - `fieldset_id`: string - Fieldset scope. '-1' for Procore default fields, external configurable fieldset id for custom fields. Null for NAMING.
  - `rule_type`: string enum[NAMING, FIELD_DEFAULTS, VALIDATION, CROSS_FIELD, MANDATORY, WARNING] - Kind of rule
  - `trigger_field`: string - Field that triggers this rule (e.g. asset_code for NAMING, custom_field_1234 for FIELD_DEFAULTS)
  - `rule_name`: string - Name of the rule
  - `description`: string - Optional description of the rule
  - `definition`: oneOf(object | object | object) - Structured rule definition. Shape depends on ruleType: FieldRuleDefinitionDTO for NAMING, FieldDefaultsDefinitionDTO for FIELD_DEFAULTS, ConditionalValidationDefinitionDTO for MANDATORY/WARNING.
  - `conditions`: object - Conditions AST for a conditional-validation rule
    - `schema_version`: integer(int32) (required) - Version of the conditions schema
    - `root`: object (required) - Root node of the recursive conditions tree
  - `rule_group_id`: string - Group id linking granular rules authored from one admin UI row. Null when ungrouped.
  - `expression`: string - Derived expression string (e.g. 'default=Carrier, readOnly=true')
  - `is_active`: boolean - Whether the rule is active and applied; false to deactivate without deleting
  - `lov_fields`: object
  - `validation_errors`: array of object - Validation issues detected on this rule. Null when the rule is valid; a non-empty list otherwise.
    - `code`: string enum[FIELDSET_NOT_FOUND, FIELDSET_NOT_MAPPED, FIELD_NOT_FOUND, LOV_ENTRY_NOT_FOUND, VENDOR_NOT_FOUND, STATUS_NOT_FOUND, STATUS_GROUP_MISMATCH, CONDITIONAL_TARGET_FIELD_INELIGIBLE, CONDITIONAL_TARGET_FIELD_ALWAYS_REQUIRED, ASSET_TYPE_NOT_FOUND, TRADE_NOT_FOUND, ASSET_TYPE_HIDDEN_AT_PROJECT, ...] - Code identifying the class of issue.
    - `severity`: string - Severity of the issue ("error" or "warning").
    - `cause`: string - Description of what went wrong.
    - `effect`: string - Description of the impact of this issue.
    - `remedy`: string - Guidance on how an admin can resolve the issue.
  - `overridden`: boolean - Project-scope overlay indicator. Populated only in the project-scoped list view: true when a project rule overrides the company configuration for this field (value and/or editability differs, or no company rule exists...
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)
  - `created_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`
  - `modified_by`: object - Contact Information
    - `id`: string - User ID e.g. `12345`
    - `name`: string - User's full name e.g. `John Doe`
    - `email`: string - User's email address e.g. `user@example.com`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/settings/naming_standard/fields

**Get Asset Naming Fields**
Returns all fields available for the naming standard expression builder, including procore default naming fields, parent_asset_id, and eligible custom fields from all fieldsets.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `name`: string
  - `label`: string
  - `data_type`: string
  - `variant`: string
  - `available_on_all_asset_types`: boolean
  - `list_of_values`: array of object
    - `id`: string e.g. `12345`
    - `label`: string
    - `code`: string
    - `active`: boolean

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Naming Standard LOV Codes

Resource id: `project-naming-standard-lov-codes`. Raw spec: `../openapi-raw/project-naming-standard-lov-codes.json`. Web: https://developers.procore.com/reference/rest/project-naming-standard-lov-codes?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/settings/naming_standard/codes

**List LOV codes for a field**
Returns all naming standard LOV code mappings for a given field (e.g. trade_id or a custom field).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `field_name` [query] string (required) - Field name to list codes for (e.g. trade_id, custom_field_1234)
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - Unique identifier of this code mapping
  - `company_id`: integer(int64) - Company this code belongs to
  - `project_id`: integer(int64) - Project this code belongs to (null for company-level codes)
  - `field_name`: string - Field name this code is for (e.g. trade_id, custom_field_1234)
  - `entry_id`: string - LOV entry ID (trade ID or custom field LOV entry ID)
  - `code`: string - Short code value used in naming standard prefix
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PUT /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/settings/naming_standard/codes

**Bulk upsert LOV codes**
Creates or updates project naming standard LOV code mappings in bulk.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Request body (application/json) (required):

- `field_name`: string (required) - Field name (e.g. trade_id, custom_field_1234)
- `entry_id`: string (required) - LOV entry ID (trade ID or custom field LOV entry ID)
- `code`: string - Short code value for naming standard. Blank or null clears an existing mapping for the same field_name + entry_id.

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - Unique identifier of this code mapping
  - `company_id`: integer(int64) - Company this code belongs to
  - `project_id`: integer(int64) - Project this code belongs to (null for company-level codes)
  - `field_name`: string - Field name this code is for (e.g. trade_id, custom_field_1234)
  - `entry_id`: string - LOV entry ID (trade ID or custom field LOV entry ID)
  - `code`: string - Short code value used in naming standard prefix
  - `created_at`: string(date-time)
  - `modified_at`: string(date-time)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/settings/naming_standard/codes/{code_id}

**Delete a LOV code**
Permanently deletes a project naming standard LOV code mapping.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `code_id` [path] string (required) - Unique identifier for the LOV code mapping.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Procore Default Fields

Resource id: `project-procore-default-fields`. Raw spec: `../openapi-raw/project-procore-default-fields.json`. Web: https://developers.procore.com/reference/rest/project-procore-default-fields?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/assets/procore_default_fields

**Get procore default fieldsets configuration**
Retrieve the procore default fieldsets configuration.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: object

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## System States

Resource id: `system-states`. Raw spec: `../openapi-raw/system-states.json`. Web: https://developers.procore.com/reference/rest/system-states?version=latest
Product lines: asset-register

### GET /rest/v2.0/companies/{company_id}/assets/settings/system_state

**List Asset System States**
Returns a List of Asset System States for a given company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `Accept-Language` [header] string - Locale for localized response messages (for example: en, fr-FR, pseudo)

Response 200 (application/json): object

- `data`: array of object
  - `id`: string
  - `name`: string

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

