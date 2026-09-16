# Procore API: Incidents (Project Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Incidents)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Action Attachments](#action-attachments) - versions 1.0
- [Action Types](#action-types) - versions 1.0
- [Actions](#actions) - versions 1.1, 1.0
- [Affliction Types](#affliction-types) - versions 1.0
- [Alert Recipients](#alert-recipients) - versions 1.0
- [Alerts](#alerts) - versions 1.0
- [Body Parts](#body-parts) - versions 1.0
- [Contributing Behaviors](#contributing-behaviors) - versions 1.0
- [Contributing Conditions](#contributing-conditions) - versions 1.0
- [Environmental Filter Options](#environmental-filter-options) - versions 1.0
- [Environmental Types](#environmental-types) - versions 1.0
- [Environmentals](#environmentals) - versions 1.0
- [Filing Types](#filing-types) - versions 1.0
- [Harm Sources](#harm-sources) - versions 1.0
- [Hazards](#hazards) - versions 1.0
- [Incident Attachments](#incident-attachments) - versions 1.0
- [Incident Filter Options](#incident-filter-options) - versions 1.0
- [Incident Picker Options](#incident-picker-options) - versions 1.0
- [Incidents](#incidents) - versions 1.0
- [Injuries](#injuries) - versions 1.0
- [Injury Filter Options](#injury-filter-options) - versions 1.0
- [Near Miss Filter Options](#near-miss-filter-options) - versions 1.0
- [Near Misses](#near-misses) - versions 1.0
- [Project Incident Configuration](#project-incident-configuration) - versions 1.0
- [Property Damage Filter Options](#property-damage-filter-options) - versions 1.0
- [Property Damages](#property-damages) - versions 1.0
- [Severity Levels](#severity-levels) - versions 1.0
- [Witness Statement Attachments](#witness-statement-attachments) - versions 1.0
- [Witness Statements](#witness-statements) - versions 1.1, 1.0
- [Work Activities](#work-activities) - versions 1.0

## Action Attachments

Resource id: `action-attachments`. Raw spec: `../openapi-raw/action-attachments.json`. Web: https://developers.procore.com/reference/rest/action-attachments?version=latest
Product lines: Total Quality and Safety Management

### POST /rest/v1.0/projects/{project_id}/incidents/actions/{action_id}/attachments

**Create Attachment**
Uploads a file attachment to the specified incident action. Supports multipart file upload or referencing a previously uploaded file by upload ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `action_id` [path] integer (required) - Unique identifier of the incident action to attach a file to.

Request body (application/json) (required):

- `upload_id`: string (required) - Identifier of a previously uploaded file (via the Uploads endpoint) to attach to this action. Use this approach for pre-uploaded files instead of multipart/form-data. e.g. `1ZE146W9K804SAJJZX19JVAD0R`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this incident attachment. Use as a reference when managing attachments on an action. e.g. `5324`
- `url`: string - Download URL for the full-size attachment file. e.g. `http://www.example.com/`
- `thumbnail_url`: string - URL for a large thumbnail preview of the attachment. Null if no preview is available. e.g. `http://www.example.com/`
- `name`: string - Original filename of the uploaded attachment, including file extension. e.g. `january_receipt_copy.jpg`
- `content_type`: string - MIME type of the attachment file (e.g. application/pdf, image/jpeg). e.g. `application/pdf`
- `viewable_document_id`: integer - Identifier of the associated viewable document for in-browser rendering. Null if the attachment has not been converted for viewing. e.g. `12`
- `viewable`: boolean - Indicates whether the attachment can be viewed in-browser. True if the file type supports viewing or a viewable document has been generated. e.g. `true`
- `can_be_viewed`: boolean - Indicates whether the attachment has finished processing and is ready for in-browser viewing. e.g. `true`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Action Types

Resource id: `action-types`. Raw spec: `../openapi-raw/action-types.json`. Web: https://developers.procore.com/reference/rest/action-types?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/incidents/action_types

**List Incident Action Types**
Returns a paginated list of all incident action types configured for the specified company. Supports filtering by active status, ID, and last-updated timestamp.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[active]` [query] boolean - If true, returns item(s) with a status of 'active'.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[name] - Sort results by the specified field.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this incident action type. e.g. `999`
- `name`: string - Display name of the action type, localized to the requester's language preference. Common examples include Corrective, Preventative, and custom names. e.g. `Corrective`
- `name_key`: string - Untranslated key for the action type name. Use this value for programmatic comparisons rather than the localized name field. e.g. `Corrective`
- `active`: boolean - Represents whether an Incident Action Type is available for use. e.g. `true`
- `global`: boolean - Represents whether an Incident Action Type has been provided by Procore. e.g. `true`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this action type was created. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this action type. e.g. `2016-10-25T17:53:35Z`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/incidents/action_types

**Create Incident Action Type**
Creates an Incident Action Type with the specified name.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `action_type`: object (required) - Incident Action Type object
  - `name`: string (required) - Display name for the incident action type. Required on create. Procore-provided (global) type names cannot be changed.
  - `active`: boolean - Flag that denotes if the Incident Action Type is available for use

Response 201 (application/json): object

- `id`: integer - Unique identifier for this incident action type. e.g. `999`
- `name`: string - Display name of the action type, localized to the requester's language preference. Common examples include Corrective, Preventative, and custom names. e.g. `Corrective`
- `name_key`: string - Untranslated key for the action type name. Use this value for programmatic comparisons rather than the localized name field. e.g. `Corrective`
- `active`: boolean - Represents whether an Incident Action Type is available for use. e.g. `true`
- `global`: boolean - Represents whether an Incident Action Type has been provided by Procore. e.g. `true`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this action type was created. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this action type. e.g. `2016-10-25T17:53:35Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/incidents/action_types/{id}

**Show Incident Action Type**
Returns the details of a single incident action type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the incident action type.

Response 200 (application/json): object

- `id`: integer - Unique identifier for this incident action type. e.g. `999`
- `name`: string - Display name of the action type, localized to the requester's language preference. Common examples include Corrective, Preventative, and custom names. e.g. `Corrective`
- `name_key`: string - Untranslated key for the action type name. Use this value for programmatic comparisons rather than the localized name field. e.g. `Corrective`
- `active`: boolean - Represents whether an Incident Action Type is available for use. e.g. `true`
- `global`: boolean - Represents whether an Incident Action Type has been provided by Procore. e.g. `true`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this action type was created. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this action type. e.g. `2016-10-25T17:53:35Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/incidents/action_types/{id}

**Update Incident Action Type**
Updates a specified Incident Action Type. Note that Procore provided Incident Action Types' names cannot be changed.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the incident action type.

Request body (application/json) (required):

- `action_type`: object (required) - Incident Action Type object
  - `name`: string (required) - Display name for the incident action type. Required on create. Procore-provided (global) type names cannot be changed.
  - `active`: boolean - Flag that denotes if the Incident Action Type is available for use

Response 200 (application/json): object

- `id`: integer - Unique identifier for this incident action type. e.g. `999`
- `name`: string - Display name of the action type, localized to the requester's language preference. Common examples include Corrective, Preventative, and custom names. e.g. `Corrective`
- `name_key`: string - Untranslated key for the action type name. Use this value for programmatic comparisons rather than the localized name field. e.g. `Corrective`
- `active`: boolean - Represents whether an Incident Action Type is available for use. e.g. `true`
- `global`: boolean - Represents whether an Incident Action Type has been provided by Procore. e.g. `true`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this action type was created. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this action type. e.g. `2016-10-25T17:53:35Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/incidents/action_types/{id}

**Delete Incident Action Type**
Deletes an Incident Action Type. Note that Procore provided Incident Action Types cannot be deleted.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the incident action type.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/incidents/action_types/bulk_update

**Bulk Update Incident Action Types**
Update multiple Incident Action Types with one request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `action_type`: object (required) - IDs of all Incident Action Types specified for bulk update
  - `ids`: array of integer
  - `active`: boolean - Flag that denotes if the Incident Action Types are available for use

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this incident action type. e.g. `999`
- `name`: string - Display name of the action type, localized to the requester's language preference. Common examples include Corrective, Preventative, and custom names. e.g. `Corrective`
- `name_key`: string - Untranslated key for the action type name. Use this value for programmatic comparisons rather than the localized name field. e.g. `Corrective`
- `active`: boolean - Represents whether an Incident Action Type is available for use. e.g. `true`
- `global`: boolean - Represents whether an Incident Action Type has been provided by Procore. e.g. `true`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this action type was created. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this action type. e.g. `2016-10-25T17:53:35Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Actions

Resource id: `actions`. Raw spec: `../openapi-raw/actions.json`. Web: https://developers.procore.com/reference/rest/actions?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.1/projects/{project_id}/recycle_bin/incidents/actions

**List Recycled Actions**
Returns a paginated list of soft-deleted incident actions in the Recycle Bin for the specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID. When provided, the list will be scoped to only the Recycled Actions for a given Incident.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[query]` [query] string - Return item(s) containing query
- `sort` [query] string enum[created_at, updated_at, action_type]

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this incident action. e.g. `99`
- `incident_id`: integer - Identifier of the parent incident this action belongs to. Use as the incident_id query parameter to scope action lists. e.g. `42`
- `action_type`: object
  - `id`: integer - Unique identifier for this incident action type. Use as the {id} path parameter in GET/PATCH/DELETE requests to /rest/v1.0/companies/{company_id}/incidents/action_types/{id}. e.g. `999`
  - `name`: string - Display name of the action type, localized to the requester's language preference. e.g. `Corrective`
  - `name_key`: string - Untranslated key for the action type name. Use this value for programmatic comparisons rather than the localized name field. e.g. `Corrective`
  - `active`: boolean - Represents whether an Incident Action Type is available for use. e.g. `true`
  - `global`: boolean - Represents whether an Incident Action Type has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - ISO 8601 timestamp of when this action type was created. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this action type. e.g. `2016-10-25T17:53:35Z`
- `attachments`: array of object
  - `id`: integer - Unique identifier for this attachment. e.g. `5324`
  - `url`: string - Download URL for the full-size attachment file. e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL for a large thumbnail preview of the attachment. e.g. `http://www.example.com/`
  - `name`: string - Original filename of the uploaded attachment, including file extension. e.g. `january_receipt_copy.jpg`
  - `content_type`: string - MIME type of the attachment file (e.g. application/pdf, image/jpeg). e.g. `application/pdf`
  - `viewable_document_id`: integer - Identifier of the associated viewable document for in-browser rendering. Null if the attachment has not been converted for viewing. e.g. `12`
  - `viewable`: boolean - Indicates whether the attachment can be viewed in-browser. True if the file type supports viewing or a viewable document has been generated. e.g. `true`
  - `can_be_viewed`: boolean - Indicates whether the attachment has finished processing and is ready for in-browser viewing. e.g. `true`
- `description`: string - The account of the action in rich text form. e.g. `<p>I took action.</p>`
- `description_plain_text`: string - Plain-text version of the action description, with all HTML markup stripped. e.g. `I took action`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this action was created. e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - ISO 8601 timestamp of when this action was soft-deleted (moved to Recycle Bin). Null if the action has not been deleted. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this action. e.g. `2016-10-25T17:53:35Z`
- `observation_id`: integer - Identifier of the linked observation item, if this action is associated with an observation. Null if no observation is linked. e.g. `99`
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

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/recycle_bin/incidents/actions/{id}

**Show Recycled Action**
Returns the details of a single soft-deleted incident action from the Recycle Bin.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Unique identifier of the recycled incident action.

Response 200 (application/json): object

- `id`: integer - Unique identifier for this incident action. e.g. `99`
- `incident_id`: integer - Identifier of the parent incident this action belongs to. Use as the incident_id query parameter to scope action lists. e.g. `42`
- `action_type`: object
  - `id`: integer - Unique identifier for this incident action type. Use as the {id} path parameter in GET/PATCH/DELETE requests to /rest/v1.0/companies/{company_id}/incidents/action_types/{id}. e.g. `999`
  - `name`: string - Display name of the action type, localized to the requester's language preference. e.g. `Corrective`
  - `name_key`: string - Untranslated key for the action type name. Use this value for programmatic comparisons rather than the localized name field. e.g. `Corrective`
  - `active`: boolean - Represents whether an Incident Action Type is available for use. e.g. `true`
  - `global`: boolean - Represents whether an Incident Action Type has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - ISO 8601 timestamp of when this action type was created. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this action type. e.g. `2016-10-25T17:53:35Z`
- `attachments`: array of object
  - `id`: integer - Unique identifier for this attachment. e.g. `5324`
  - `url`: string - Download URL for the full-size attachment file. e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL for a large thumbnail preview of the attachment. e.g. `http://www.example.com/`
  - `name`: string - Original filename of the uploaded attachment, including file extension. e.g. `january_receipt_copy.jpg`
  - `content_type`: string - MIME type of the attachment file (e.g. application/pdf, image/jpeg). e.g. `application/pdf`
  - `viewable_document_id`: integer - Identifier of the associated viewable document for in-browser rendering. Null if the attachment has not been converted for viewing. e.g. `12`
  - `viewable`: boolean - Indicates whether the attachment can be viewed in-browser. True if the file type supports viewing or a viewable document has been generated. e.g. `true`
  - `can_be_viewed`: boolean - Indicates whether the attachment has finished processing and is ready for in-browser viewing. e.g. `true`
- `description`: string - The account of the action in rich text form. e.g. `<p>I took action.</p>`
- `description_plain_text`: string - Plain-text version of the action description, with all HTML markup stripped. e.g. `I took action`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this action was created. e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - ISO 8601 timestamp of when this action was soft-deleted (moved to Recycle Bin). Null if the action has not been deleted. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this action. e.g. `2016-10-25T17:53:35Z`
- `observation_id`: integer - Identifier of the linked observation item, if this action is associated with an observation. Null if no observation is linked. e.g. `99`
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

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/recycle_bin/incidents/actions/{id}/restore

**Retrieve Recycled Action**
Restores a soft-deleted incident action from the Recycle Bin back to its parent incident.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Unique identifier of the recycled incident action to restore.

Response 200: OK (no body)

Error responses: 401, 403, 404, 409, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/actions

**List Actions**
Returns a paginated list of incident actions for the specified project. Optionally scope to a single incident by providing incident_id.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID. When provided, the list will be scoped to only the Actions for a given Incident.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[query]` [query] string - Return item(s) containing query
- `sort` [query] string enum[created_at, updated_at, action_type]

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this incident action. e.g. `99`
- `incident_id`: integer - Identifier of the parent incident this action belongs to. Use as the incident_id query parameter to scope action lists. e.g. `42`
- `action_type`: object
  - `id`: integer - Unique identifier for this incident action type. Use as the {id} path parameter in GET/PATCH/DELETE requests to /rest/v1.0/companies/{company_id}/incidents/action_types/{id}. e.g. `999`
  - `name`: string - Display name of the action type, localized to the requester's language preference. e.g. `Corrective`
  - `name_key`: string - Untranslated key for the action type name. Use this value for programmatic comparisons rather than the localized name field. e.g. `Corrective`
  - `active`: boolean - Represents whether an Incident Action Type is available for use. e.g. `true`
  - `global`: boolean - Represents whether an Incident Action Type has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - ISO 8601 timestamp of when this action type was created. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this action type. e.g. `2016-10-25T17:53:35Z`
- `attachments`: array of object
  - `id`: integer - Unique identifier for this attachment. e.g. `5324`
  - `url`: string - Download URL for the full-size attachment file. e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL for a large thumbnail preview of the attachment. e.g. `http://www.example.com/`
  - `name`: string - Original filename of the uploaded attachment, including file extension. e.g. `january_receipt_copy.jpg`
  - `content_type`: string - MIME type of the attachment file (e.g. application/pdf, image/jpeg). e.g. `application/pdf`
  - `viewable_document_id`: integer - Identifier of the associated viewable document for in-browser rendering. Null if the attachment has not been converted for viewing. e.g. `12`
  - `viewable`: boolean - Indicates whether the attachment can be viewed in-browser. True if the file type supports viewing or a viewable document has been generated. e.g. `true`
  - `can_be_viewed`: boolean - Indicates whether the attachment has finished processing and is ready for in-browser viewing. e.g. `true`
- `description`: string - The account of the action in rich text form. e.g. `<p>I took action.</p>`
- `description_plain_text`: string - Plain-text version of the action description, with all HTML markup stripped. e.g. `I took action`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this action was created. e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - ISO 8601 timestamp of when this action was soft-deleted (moved to Recycle Bin). Null if the action has not been deleted. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this action. e.g. `2016-10-25T17:53:35Z`
- `observation_id`: integer - Identifier of the linked observation item, if this action is associated with an observation. Null if no observation is linked. e.g. `99`
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

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/incidents/actions

**Create Action**
Creates a new incident action and associates it with the specified incident.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - Whether or not Configurable validations from the Incident/Injury Configurable Field Set should be run (default: false). See (https://developers.procore.com/reference/configurable-field-sets#list-project-configurable-f...

Request body (application/json) (required):

- `incident_action`: object (required)
  - `incident_id`: integer (required) - Identifier of the incident to associate this action with. Required on create.
  - `action_type_id`: integer (required) - Identifier of the action type to classify this action. Obtain valid IDs from GET /rest/v1.0/companies/{company_id}/incidents/action_types.
  - `description`: string - Description of action taken, in HTML rich-text format. e.g. `<p>I took action.</p>`
  - `drawing_revision_ids`: array of integer - Array of drawing revision IDs to attach to this action. e.g. `[4, 5]`
  - `file_version_ids`: array of integer - Array of file version IDs to attach to this action. e.g. `[6, 7]`
  - `form_ids`: array of integer - Array of form IDs to attach to this action. e.g. `[7, 8]`
  - `image_ids`: array of integer - Array of image IDs to attach to this action. e.g. `[9, 10]`
  - `upload_ids`: array of string - Array of upload identifiers (from the Uploads endpoint) to attach to this action. e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this incident action. e.g. `99`
- `incident_id`: integer - Identifier of the parent incident this action belongs to. Use as the incident_id query parameter to scope action lists. e.g. `42`
- `action_type`: object
  - `id`: integer - Unique identifier for this incident action type. Use as the {id} path parameter in GET/PATCH/DELETE requests to /rest/v1.0/companies/{company_id}/incidents/action_types/{id}. e.g. `999`
  - `name`: string - Display name of the action type, localized to the requester's language preference. e.g. `Corrective`
  - `name_key`: string - Untranslated key for the action type name. Use this value for programmatic comparisons rather than the localized name field. e.g. `Corrective`
  - `active`: boolean - Represents whether an Incident Action Type is available for use. e.g. `true`
  - `global`: boolean - Represents whether an Incident Action Type has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - ISO 8601 timestamp of when this action type was created. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this action type. e.g. `2016-10-25T17:53:35Z`
- `attachments`: array of object
  - `id`: integer - Unique identifier for this attachment. e.g. `5324`
  - `url`: string - Download URL for the full-size attachment file. e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL for a large thumbnail preview of the attachment. e.g. `http://www.example.com/`
  - `name`: string - Original filename of the uploaded attachment, including file extension. e.g. `january_receipt_copy.jpg`
  - `content_type`: string - MIME type of the attachment file (e.g. application/pdf, image/jpeg). e.g. `application/pdf`
  - `viewable_document_id`: integer - Identifier of the associated viewable document for in-browser rendering. Null if the attachment has not been converted for viewing. e.g. `12`
  - `viewable`: boolean - Indicates whether the attachment can be viewed in-browser. True if the file type supports viewing or a viewable document has been generated. e.g. `true`
  - `can_be_viewed`: boolean - Indicates whether the attachment has finished processing and is ready for in-browser viewing. e.g. `true`
- `description`: string - The account of the action in rich text form. e.g. `<p>I took action.</p>`
- `description_plain_text`: string - Plain-text version of the action description, with all HTML markup stripped. e.g. `I took action`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this action was created. e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - ISO 8601 timestamp of when this action was soft-deleted (moved to Recycle Bin). Null if the action has not been deleted. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this action. e.g. `2016-10-25T17:53:35Z`
- `observation_id`: integer - Identifier of the linked observation item, if this action is associated with an observation. Null if no observation is linked. e.g. `99`
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

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/actions/{id}

**Show Action**
Returns the details of a single incident action, including its attachments, action type, and custom fields.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Unique identifier of the incident action.

Response 200 (application/json): object

- `id`: integer - Unique identifier for this incident action. e.g. `99`
- `incident_id`: integer - Identifier of the parent incident this action belongs to. Use as the incident_id query parameter to scope action lists. e.g. `42`
- `action_type`: object
  - `id`: integer - Unique identifier for this incident action type. Use as the {id} path parameter in GET/PATCH/DELETE requests to /rest/v1.0/companies/{company_id}/incidents/action_types/{id}. e.g. `999`
  - `name`: string - Display name of the action type, localized to the requester's language preference. e.g. `Corrective`
  - `name_key`: string - Untranslated key for the action type name. Use this value for programmatic comparisons rather than the localized name field. e.g. `Corrective`
  - `active`: boolean - Represents whether an Incident Action Type is available for use. e.g. `true`
  - `global`: boolean - Represents whether an Incident Action Type has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - ISO 8601 timestamp of when this action type was created. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this action type. e.g. `2016-10-25T17:53:35Z`
- `attachments`: array of object
  - `id`: integer - Unique identifier for this attachment. e.g. `5324`
  - `url`: string - Download URL for the full-size attachment file. e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL for a large thumbnail preview of the attachment. e.g. `http://www.example.com/`
  - `name`: string - Original filename of the uploaded attachment, including file extension. e.g. `january_receipt_copy.jpg`
  - `content_type`: string - MIME type of the attachment file (e.g. application/pdf, image/jpeg). e.g. `application/pdf`
  - `viewable_document_id`: integer - Identifier of the associated viewable document for in-browser rendering. Null if the attachment has not been converted for viewing. e.g. `12`
  - `viewable`: boolean - Indicates whether the attachment can be viewed in-browser. True if the file type supports viewing or a viewable document has been generated. e.g. `true`
  - `can_be_viewed`: boolean - Indicates whether the attachment has finished processing and is ready for in-browser viewing. e.g. `true`
- `description`: string - The account of the action in rich text form. e.g. `<p>I took action.</p>`
- `description_plain_text`: string - Plain-text version of the action description, with all HTML markup stripped. e.g. `I took action`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this action was created. e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - ISO 8601 timestamp of when this action was soft-deleted (moved to Recycle Bin). Null if the action has not been deleted. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this action. e.g. `2016-10-25T17:53:35Z`
- `observation_id`: integer - Identifier of the linked observation item, if this action is associated with an observation. Null if no observation is linked. e.g. `99`
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

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/incidents/actions/{id}

**Update Action**
Updates the specified incident action. Supports changing the action type, description, and associated attachments.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Unique identifier of the incident action.
- `run_configurable_validations` [query] boolean - Whether or not Configurable validations from the Incident/Injury Configurable Field Set should be run (default: false). See (https://developers.procore.com/reference/configurable-field-sets#list-project-configurable-f...

Request body (application/json) (required):

- `incident_action`: object (required)
  - `incident_id`: integer - Identifier of the incident this action belongs to.
  - `action_type_id`: integer - Identifier of the action type to classify this action. Obtain valid IDs from GET /rest/v1.0/companies/{company_id}/incidents/action_types.
  - `description`: string - Description of action taken, in HTML rich-text format. e.g. `<p>I took action.</p>`
  - `drawing_revision_ids`: array of integer - Array of drawing revision IDs to attach to this action. e.g. `[4, 5]`
  - `file_version_ids`: array of integer - Array of file version IDs to attach to this action. e.g. `[6, 7]`
  - `form_ids`: array of integer - Array of form IDs to attach to this action. e.g. `[7, 8]`
  - `image_ids`: array of integer - Array of image IDs to attach to this action. e.g. `[9, 10]`
  - `upload_ids`: array of string - Array of upload identifiers (from the Uploads endpoint) to attach to this action. e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `id`: integer - Unique identifier for this incident action. e.g. `99`
- `incident_id`: integer - Identifier of the parent incident this action belongs to. Use as the incident_id query parameter to scope action lists. e.g. `42`
- `action_type`: object
  - `id`: integer - Unique identifier for this incident action type. Use as the {id} path parameter in GET/PATCH/DELETE requests to /rest/v1.0/companies/{company_id}/incidents/action_types/{id}. e.g. `999`
  - `name`: string - Display name of the action type, localized to the requester's language preference. e.g. `Corrective`
  - `name_key`: string - Untranslated key for the action type name. Use this value for programmatic comparisons rather than the localized name field. e.g. `Corrective`
  - `active`: boolean - Represents whether an Incident Action Type is available for use. e.g. `true`
  - `global`: boolean - Represents whether an Incident Action Type has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - ISO 8601 timestamp of when this action type was created. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this action type. e.g. `2016-10-25T17:53:35Z`
- `attachments`: array of object
  - `id`: integer - Unique identifier for this attachment. e.g. `5324`
  - `url`: string - Download URL for the full-size attachment file. e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL for a large thumbnail preview of the attachment. e.g. `http://www.example.com/`
  - `name`: string - Original filename of the uploaded attachment, including file extension. e.g. `january_receipt_copy.jpg`
  - `content_type`: string - MIME type of the attachment file (e.g. application/pdf, image/jpeg). e.g. `application/pdf`
  - `viewable_document_id`: integer - Identifier of the associated viewable document for in-browser rendering. Null if the attachment has not been converted for viewing. e.g. `12`
  - `viewable`: boolean - Indicates whether the attachment can be viewed in-browser. True if the file type supports viewing or a viewable document has been generated. e.g. `true`
  - `can_be_viewed`: boolean - Indicates whether the attachment has finished processing and is ready for in-browser viewing. e.g. `true`
- `description`: string - The account of the action in rich text form. e.g. `<p>I took action.</p>`
- `description_plain_text`: string - Plain-text version of the action description, with all HTML markup stripped. e.g. `I took action`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this action was created. e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - ISO 8601 timestamp of when this action was soft-deleted (moved to Recycle Bin). Null if the action has not been deleted. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this action. e.g. `2016-10-25T17:53:35Z`
- `observation_id`: integer - Identifier of the linked observation item, if this action is associated with an observation. Null if no observation is linked. e.g. `99`
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

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/incidents/actions/{id}

**Destroy Action**
Soft-deletes the specified incident action by moving it to the Recycle Bin. Retrieve it later via the Recycled Actions endpoints.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Unique identifier of the incident action.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/incidents/actions  **[OLDER VERSION - a newer path version exists below/above]**

**List Recycled Actions**
Returns a paginated list of soft-deleted incident actions in the Recycle Bin for the specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `incident_id` [query] integer - Incident ID. When provided, the list will be scoped to only the Recycled Actions for a given Incident.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[query]` [query] string - Return item(s) containing query
- `sort` [query] string enum[created_at, updated_at, action_type]

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this incident action. e.g. `99`
- `incident_id`: integer - Identifier of the parent incident this action belongs to. Use as the incident_id query parameter to scope action lists. e.g. `42`
- `action_type`: object
  - `id`: integer - Unique identifier for this incident action type. Use as the {id} path parameter in GET/PATCH/DELETE requests to /rest/v1.0/companies/{company_id}/incidents/action_types/{id}. e.g. `999`
  - `name`: string - Display name of the action type, localized to the requester's language preference. e.g. `Corrective`
  - `name_key`: string - Untranslated key for the action type name. Use this value for programmatic comparisons rather than the localized name field. e.g. `Corrective`
  - `active`: boolean - Represents whether an Incident Action Type is available for use. e.g. `true`
  - `global`: boolean - Represents whether an Incident Action Type has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - ISO 8601 timestamp of when this action type was created. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this action type. e.g. `2016-10-25T17:53:35Z`
- `attachments`: array of object
  - `id`: integer - Unique identifier for this attachment. e.g. `5324`
  - `url`: string - Download URL for the full-size attachment file. e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL for a large thumbnail preview of the attachment. e.g. `http://www.example.com/`
  - `name`: string - Original filename of the uploaded attachment, including file extension. e.g. `january_receipt_copy.jpg`
  - `content_type`: string - MIME type of the attachment file (e.g. application/pdf, image/jpeg). e.g. `application/pdf`
  - `viewable_document_id`: integer - Identifier of the associated viewable document for in-browser rendering. Null if the attachment has not been converted for viewing. e.g. `12`
  - `viewable`: boolean - Indicates whether the attachment can be viewed in-browser. True if the file type supports viewing or a viewable document has been generated. e.g. `true`
  - `can_be_viewed`: boolean - Indicates whether the attachment has finished processing and is ready for in-browser viewing. e.g. `true`
- `description`: string - The account of the action in rich text form. e.g. `<p>I took action.</p>`
- `description_plain_text`: string - Plain-text version of the action description, with all HTML markup stripped. e.g. `I took action`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this action was created. e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - ISO 8601 timestamp of when this action was soft-deleted (moved to Recycle Bin). Null if the action has not been deleted. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this action. e.g. `2016-10-25T17:53:35Z`
- `observation_id`: integer - Identifier of the linked observation item, if this action is associated with an observation. Null if no observation is linked. e.g. `99`
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

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/incidents/actions/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Show Recycled Action**
Returns the details of a single soft-deleted incident action from the Recycle Bin.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Unique identifier of the recycled incident action.

Response 200 (application/json): object

- `id`: integer - Unique identifier for this incident action. e.g. `99`
- `incident_id`: integer - Identifier of the parent incident this action belongs to. Use as the incident_id query parameter to scope action lists. e.g. `42`
- `action_type`: object
  - `id`: integer - Unique identifier for this incident action type. Use as the {id} path parameter in GET/PATCH/DELETE requests to /rest/v1.0/companies/{company_id}/incidents/action_types/{id}. e.g. `999`
  - `name`: string - Display name of the action type, localized to the requester's language preference. e.g. `Corrective`
  - `name_key`: string - Untranslated key for the action type name. Use this value for programmatic comparisons rather than the localized name field. e.g. `Corrective`
  - `active`: boolean - Represents whether an Incident Action Type is available for use. e.g. `true`
  - `global`: boolean - Represents whether an Incident Action Type has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - ISO 8601 timestamp of when this action type was created. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this action type. e.g. `2016-10-25T17:53:35Z`
- `attachments`: array of object
  - `id`: integer - Unique identifier for this attachment. e.g. `5324`
  - `url`: string - Download URL for the full-size attachment file. e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL for a large thumbnail preview of the attachment. e.g. `http://www.example.com/`
  - `name`: string - Original filename of the uploaded attachment, including file extension. e.g. `january_receipt_copy.jpg`
  - `content_type`: string - MIME type of the attachment file (e.g. application/pdf, image/jpeg). e.g. `application/pdf`
  - `viewable_document_id`: integer - Identifier of the associated viewable document for in-browser rendering. Null if the attachment has not been converted for viewing. e.g. `12`
  - `viewable`: boolean - Indicates whether the attachment can be viewed in-browser. True if the file type supports viewing or a viewable document has been generated. e.g. `true`
  - `can_be_viewed`: boolean - Indicates whether the attachment has finished processing and is ready for in-browser viewing. e.g. `true`
- `description`: string - The account of the action in rich text form. e.g. `<p>I took action.</p>`
- `description_plain_text`: string - Plain-text version of the action description, with all HTML markup stripped. e.g. `I took action`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this action was created. e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - ISO 8601 timestamp of when this action was soft-deleted (moved to Recycle Bin). Null if the action has not been deleted. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this action. e.g. `2016-10-25T17:53:35Z`
- `observation_id`: integer - Identifier of the linked observation item, if this action is associated with an observation. Null if no observation is linked. e.g. `99`
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

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/recycle_bin/incidents/actions/{id}/restore  **[OLDER VERSION - a newer path version exists below/above]**

**Retrieve Recycled Action**
Restores a soft-deleted incident action from the Recycle Bin back to its parent incident.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Unique identifier of the recycled incident action to restore.

Response 200: OK (no body)

Error responses: 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Affliction Types

Resource id: `affliction-types`. Raw spec: `../openapi-raw/affliction-types.json`. Web: https://developers.procore.com/reference/rest/affliction-types?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/incidents/affliction_types

**List Affliction Types**
Returns a paginated list of all affliction types configured for the specified company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[active]` [query] boolean - If true, returns item(s) with a status of 'active'.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[name] - Sort results by the specified field.
- `filters[query]` [query] string - Return item(s) containing query.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this affliction type. e.g. `999`
- `name`: string - Display name of the affliction type, localized to the requester's language preference. e.g. `Sprain`
- `name_key`: string - Untranslated key for the affliction type name. Use this value for programmatic comparisons rather than the localized name field. e.g. `Sprain`
- `active`: boolean - Indicates whether this affliction type is available for selection when recording injuries. Inactive types are hidden from end users. e.g. `true`
- `global`: boolean - Indicates whether this affliction type is a Procore-provided default. Global types cannot have their names changed. e.g. `true`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this affliction type was created. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this affliction type. e.g. `2016-10-25T17:53:35Z`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/incidents/affliction_types

**Create Affliction Type**
Creates an affliction type with the specified name.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `affliction_type`: object (required) - Affliction Type object
  - `name`: string (required) - Display name for the affliction type. Required on create. Procore-provided (global) type names cannot be changed.
  - `active`: boolean - Flag that denotes if the Affliction Type is available for use

Response 201 (application/json): object

- `id`: integer - Unique identifier for this affliction type. e.g. `999`
- `name`: string - Display name of the affliction type, localized to the requester's language preference. e.g. `Sprain`
- `name_key`: string - Untranslated key for the affliction type name. Use this value for programmatic comparisons rather than the localized name field. e.g. `Sprain`
- `active`: boolean - Indicates whether this affliction type is available for selection when recording injuries. Inactive types are hidden from end users. e.g. `true`
- `global`: boolean - Indicates whether this affliction type is a Procore-provided default. Global types cannot have their names changed. e.g. `true`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this affliction type was created. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this affliction type. e.g. `2016-10-25T17:53:35Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/incidents/affliction_types/{id}

**Show Affliction Type**
Returns the details of a single affliction type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the affliction type.

Response 200 (application/json): object

- `id`: integer - Unique identifier for this affliction type. e.g. `999`
- `name`: string - Display name of the affliction type, localized to the requester's language preference. e.g. `Sprain`
- `name_key`: string - Untranslated key for the affliction type name. Use this value for programmatic comparisons rather than the localized name field. e.g. `Sprain`
- `active`: boolean - Indicates whether this affliction type is available for selection when recording injuries. Inactive types are hidden from end users. e.g. `true`
- `global`: boolean - Indicates whether this affliction type is a Procore-provided default. Global types cannot have their names changed. e.g. `true`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this affliction type was created. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this affliction type. e.g. `2016-10-25T17:53:35Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/incidents/affliction_types/{id}

**Update Affliction Type**
Updates a specified Affliction Type. Note that Procore provided Affliction Types' names cannot be changed.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the affliction type.

Request body (application/json) (required):

- `affliction_type`: object (required) - Affliction Type object
  - `name`: string (required) - Display name for the affliction type. Required on create. Procore-provided (global) type names cannot be changed.
  - `active`: boolean - Flag that denotes if the Affliction Type is available for use

Response 200 (application/json): object

- `id`: integer - Unique identifier for this affliction type. e.g. `999`
- `name`: string - Display name of the affliction type, localized to the requester's language preference. e.g. `Sprain`
- `name_key`: string - Untranslated key for the affliction type name. Use this value for programmatic comparisons rather than the localized name field. e.g. `Sprain`
- `active`: boolean - Indicates whether this affliction type is available for selection when recording injuries. Inactive types are hidden from end users. e.g. `true`
- `global`: boolean - Indicates whether this affliction type is a Procore-provided default. Global types cannot have their names changed. e.g. `true`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this affliction type was created. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this affliction type. e.g. `2016-10-25T17:53:35Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/incidents/affliction_types/{id}

**Delete Affliction Type**
Deletes an Affliction Type. Note that Procore provided Affliction Types cannot be deleted.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the affliction type.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/incidents/affliction_types/bulk_update

**Bulk Update Affliction Types**
Update multiple Affliction Types with one request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `affliction_type`: object (required) - IDs of all Affliction Types specified for bulk update
  - `ids`: array of integer
  - `active`: boolean - Flag that denotes if the Affliction Types are available for use

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this affliction type. e.g. `999`
- `name`: string - Display name of the affliction type, localized to the requester's language preference. e.g. `Sprain`
- `name_key`: string - Untranslated key for the affliction type name. Use this value for programmatic comparisons rather than the localized name field. e.g. `Sprain`
- `active`: boolean - Indicates whether this affliction type is available for selection when recording injuries. Inactive types are hidden from end users. e.g. `true`
- `global`: boolean - Indicates whether this affliction type is a Procore-provided default. Global types cannot have their names changed. e.g. `true`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this affliction type was created. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this affliction type. e.g. `2016-10-25T17:53:35Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Alert Recipients

Resource id: `alert-recipients`. Raw spec: `../openapi-raw/alert-recipients.json`. Web: https://developers.procore.com/reference/rest/alert-recipients?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/incidents/severity_levels/{severity_level_id}/alert_recipients

**List Incident Alert Recipients**
Return a list of all Incident Alert Recipients associated with the specified Company and Incident Severity Level.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `severity_level_id` [path] integer (required) - Incident Severity Level ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[name] - Sort results by the specified field.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the user who is configured as an alert recipient. e.g. `160586`
- `login`: string - Email address the user uses to log in to Procore. e.g. `carl.contractor@example.com`
- `name`: string - Full name of the alert recipient. e.g. `Carl Contractor`
- `company_name`: string - Name of the company the alert recipient belongs to. e.g. `Company ABC`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/incidents/severity_levels/{severity_level_id}/alert_recipients/{id}

**Show Incident Alert Recipient**
Returns the specified Incident Alert Recipient.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `severity_level_id` [path] integer (required) - Incident Severity Level ID
- `id` [path] integer (required) - User ID of the incident alert recipient.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the user who is configured as an alert recipient. e.g. `160586`
- `login`: string - Email address the user uses to log in to Procore. e.g. `carl.contractor@example.com`
- `name`: string - Full name of the alert recipient. e.g. `Carl Contractor`
- `company_name`: string - Name of the company the alert recipient belongs to. e.g. `Company ABC`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/incidents/severity_levels/{severity_level_id}/alert_recipients/{id}

**Create or Update Incident Alert Recipient**
Finds an existing Incident Alert Recipient or creates one for the specified user. This operation is idempotent.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `severity_level_id` [path] integer (required) - Incident Severity Level ID
- `id` [path] integer (required) - User ID of the incident alert recipient.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the user who is configured as an alert recipient. e.g. `160586`
- `login`: string - Email address the user uses to log in to Procore. e.g. `carl.contractor@example.com`
- `name`: string - Full name of the alert recipient. e.g. `Carl Contractor`
- `company_name`: string - Name of the company the alert recipient belongs to. e.g. `Company ABC`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/incidents/severity_levels/{severity_level_id}/alert_recipients/{id}

**Delete Incident Alert Recipient**
Deletes an Incident Alert Recipient.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `severity_level_id` [path] integer (required) - Incident Severity Level ID
- `id` [path] integer (required) - User ID of the incident alert recipient.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Alerts

Resource id: `alerts`. Raw spec: `../openapi-raw/alerts.json`. Web: https://developers.procore.com/reference/rest/alerts?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/incidents/alerts

**List Incident Alerts**
Returns a paginated list of all incident alerts for the specified project. Optionally scope to a single incident by providing incident_id.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[incident_id]` [query] array of integer - Return item(s) with the specified Incident IDs.
- `filters[injury_id]` [query] array of integer - Return item(s) with the specified Injury IDs.
- `filters[recipient_id]` [query] array of integer - Return item(s) with the specified recipient (User) IDs
- `filters[severity_level_id]` [query] array of integer - Return item(s) with the specified Incident Severity Level IDs
- `filters[triggered_by_id]` [query] array of integer - Return item(s) with the specified triggered by (User) IDs
- `filters[filing_type_id]` [query] array of integer - Return item(s) with the specified Incident Filing Type IDs.
- `sort` [query] string enum[created_at, updated_at] - Sort results by the specified field.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this incident alert. e.g. `1`
- `event_id`: integer - Identifier of the alert event that triggered this alert notification. e.g. `1`
- `emailed_at`: string(date-time) - ISO 8601 timestamp of when the alert email was delivered to the recipient. Null if the email has not been sent. e.g. `2016-10-25T17:53:35Z`
- `filing_type`: object
  - `id`: integer - Unique identifier of the filing type classification for this incident record. e.g. `999`
  - `name`: string - Name of the filing type (e.g. report_only, first_aid, fatality). e.g. `report_only`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `severity_level`: object
    - `id`: integer - Unique identifier for this severity level. e.g. `1`
    - `name`: string - Name of the Incident Severity Level e.g. `major`
    - `procore_default_name`: string enum[insignificant, minor, major, critical, moderate] - Procore default name of the Incident Severity Level e.g. `major`
    - `active`: boolean - Denotes whether the Incident Severity Level is active e.g. `false`
    - `email_trigger`: boolean - Denotes whether an email should be sent e.g. `false`
    - `push_notification_trigger`: boolean - Denotes whether a push notification should be sent e.g. `false`
    - `order`: integer - Ranking order of the Incident Severity Level
    - `created_at`: string(date-time) - iso8601 timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - iso8601 timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `injury`: object
  - `id`: integer - Incident Record ID e.g. `9`
  - `number`: integer - The number of the Record e.g. `4`
  - `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
  - `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
  - `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
  - `type`: string - The type of incident record (environmental, injury, near_miss, property_damage) e.g. `injury`
  - `date_returned_to_work`: string(date) - Date returned to work e.g. `2018-10-31`
  - `affected_party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `affected_person`: object
    - `login`: string - Email e.g. `exampleuser@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `harm_source`: object
    - `id`: integer - Harm Source ID e.g. `999`
    - `name`: string - Harm Source Name e.g. `Material`
    - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `date_of_death`: string(date) - Date of death e.g. `2018-11-10`
  - `filing_type`: string enum[fatality, first_aid, lost_time, medically_treated, refused_care, report_only, restricted_work] - Filing Type e.g. `first_aid`
  - `hospitalized_overnight`: boolean - Represents whether the injured person was hospitalized overnight e.g. `true`
  - `treated_in_er`: boolean - Represents whether the injured person was treated in the ER e.g. `true`
  - `treatment_facility_address`: string - The street address of the treatment facility e.g. `6309 Carpinteria Ave.`
  - `treatment_facility`: string - The name of the treatment facility e.g. `Procore Hospital`
  - `treatment_provider`: string - The name of the treatment provider e.g. `Dr. Doctor`
  - `work_days_absent`: integer - The number of days absent from work e.g. `1`
  - `work_days_restricted`: integer - The number of days on restricted work e.g. `3`
  - `work_days_transferred`: integer - The number of days transferred e.g. `4`
  - `body_diagram_type`: string enum[feminine, masculine] - Body Type displayed in Body Diagram e.g. `feminine`
  - `affliction_type`: object
    - `id`: integer - Affliction Type ID e.g. `999`
    - `name`: string - Affliction Type Name e.g. `Sprain`
    - `active`: boolean - Represents whether a Affliction Type is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Affliction Type has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - DEPRECATED. The body part affected by the affliction e.g. `ankle`
  - `affected_body_parts`: array of string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - Array of body parts affected by the affliction
  - `afflictions`: array of object - DEPRECATED. Array of afflictions affecting the injured person. Currently this is limited to one.
    - `id`: integer - Affliction ID e.g. `999`
    - `affliction_type`: object
    - `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - The body part affected by the affliction e.g. `ankle`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
  - `body_parts`: array of object - Body parts affected by the injury
    - `id`: integer - Body Part ID e.g. `999`
    - `name`: string - Body Part Name e.g. `finger_index_right`
    - `selectable`: boolean - Represents whether a Body Part can be associated to an injury. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
    - `parent_id`: integer - Parent Body Part ID e.g. `999`
- `pushed_at`: string(date-time) - ISO 8601 timestamp of when the push notification was delivered. Null if no push notification was sent. e.g. `2016-10-25T17:53:35Z`
- `recipient`: object
  - `id`: integer - The unique identifier of the user. e.g. `160586`
  - `login`: string - The email address of the user that is used to log in. e.g. `carl.contractor@example.com`
  - `name`: string - The name of the user. e.g. `Carl the Contractor`
  - `company_name`: string - User's Company Name e.g. `Company ABC`
- `severity_level`: object
  - `id`: integer - Unique identifier for this severity level. e.g. `1`
  - `name`: string - Name of the Incident Severity Level e.g. `major`
  - `procore_default_name`: string enum[insignificant, minor, major, critical, moderate] - Procore default name of the Incident Severity Level e.g. `major`
  - `active`: boolean - Denotes whether the Incident Severity Level is active e.g. `false`
  - `email_trigger`: boolean - Denotes whether an email should be sent e.g. `false`
  - `push_notification_trigger`: boolean - Denotes whether a push notification should be sent e.g. `false`
  - `order`: integer - Ranking order of the Incident Severity Level
  - `created_at`: string(date-time) - iso8601 timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - iso8601 timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `triggered_at`: string(date-time) - ISO 8601 timestamp of when the alert was triggered by an incident event. e.g. `2016-10-25T17:53:35Z`
- `triggered_by`: object
  - `id`: integer - The unique identifier of the user. e.g. `160586`
  - `login`: string - The email address of the user that is used to log in. e.g. `carl.contractor@example.com`
  - `name`: string - The name of the user. e.g. `Carl the Contractor`
  - `company_name`: string - User's Company Name e.g. `Company ABC`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/alerts/{id}

**Show Incident Alert**
Returns the details of a single incident alert, including the associated injury, severity level, and recipient.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Unique identifier of the incident alert.

Response 200 (application/json): object

- `id`: integer - Unique identifier for this incident alert. e.g. `1`
- `event_id`: integer - Identifier of the alert event that triggered this alert notification. e.g. `1`
- `emailed_at`: string(date-time) - ISO 8601 timestamp of when the alert email was delivered to the recipient. Null if the email has not been sent. e.g. `2016-10-25T17:53:35Z`
- `filing_type`: object
  - `id`: integer - Unique identifier of the filing type classification for this incident record. e.g. `999`
  - `name`: string - Name of the filing type (e.g. report_only, first_aid, fatality). e.g. `report_only`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `severity_level`: object
    - `id`: integer - Unique identifier for this severity level. e.g. `1`
    - `name`: string - Name of the Incident Severity Level e.g. `major`
    - `procore_default_name`: string enum[insignificant, minor, major, critical, moderate] - Procore default name of the Incident Severity Level e.g. `major`
    - `active`: boolean - Denotes whether the Incident Severity Level is active e.g. `false`
    - `email_trigger`: boolean - Denotes whether an email should be sent e.g. `false`
    - `push_notification_trigger`: boolean - Denotes whether a push notification should be sent e.g. `false`
    - `order`: integer - Ranking order of the Incident Severity Level
    - `created_at`: string(date-time) - iso8601 timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - iso8601 timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `injury`: object
  - `id`: integer - Incident Record ID e.g. `9`
  - `number`: integer - The number of the Record e.g. `4`
  - `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
  - `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
  - `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
  - `type`: string - The type of incident record (environmental, injury, near_miss, property_damage) e.g. `injury`
  - `date_returned_to_work`: string(date) - Date returned to work e.g. `2018-10-31`
  - `affected_party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `affected_person`: object
    - `login`: string - Email e.g. `exampleuser@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `harm_source`: object
    - `id`: integer - Harm Source ID e.g. `999`
    - `name`: string - Harm Source Name e.g. `Material`
    - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `date_of_death`: string(date) - Date of death e.g. `2018-11-10`
  - `filing_type`: string enum[fatality, first_aid, lost_time, medically_treated, refused_care, report_only, restricted_work] - Filing Type e.g. `first_aid`
  - `hospitalized_overnight`: boolean - Represents whether the injured person was hospitalized overnight e.g. `true`
  - `treated_in_er`: boolean - Represents whether the injured person was treated in the ER e.g. `true`
  - `treatment_facility_address`: string - The street address of the treatment facility e.g. `6309 Carpinteria Ave.`
  - `treatment_facility`: string - The name of the treatment facility e.g. `Procore Hospital`
  - `treatment_provider`: string - The name of the treatment provider e.g. `Dr. Doctor`
  - `work_days_absent`: integer - The number of days absent from work e.g. `1`
  - `work_days_restricted`: integer - The number of days on restricted work e.g. `3`
  - `work_days_transferred`: integer - The number of days transferred e.g. `4`
  - `body_diagram_type`: string enum[feminine, masculine] - Body Type displayed in Body Diagram e.g. `feminine`
  - `affliction_type`: object
    - `id`: integer - Affliction Type ID e.g. `999`
    - `name`: string - Affliction Type Name e.g. `Sprain`
    - `active`: boolean - Represents whether a Affliction Type is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Affliction Type has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - DEPRECATED. The body part affected by the affliction e.g. `ankle`
  - `affected_body_parts`: array of string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - Array of body parts affected by the affliction
  - `afflictions`: array of object - DEPRECATED. Array of afflictions affecting the injured person. Currently this is limited to one.
    - `id`: integer - Affliction ID e.g. `999`
    - `affliction_type`: object
    - `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - The body part affected by the affliction e.g. `ankle`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
  - `body_parts`: array of object - Body parts affected by the injury
    - `id`: integer - Body Part ID e.g. `999`
    - `name`: string - Body Part Name e.g. `finger_index_right`
    - `selectable`: boolean - Represents whether a Body Part can be associated to an injury. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
    - `parent_id`: integer - Parent Body Part ID e.g. `999`
- `pushed_at`: string(date-time) - ISO 8601 timestamp of when the push notification was delivered. Null if no push notification was sent. e.g. `2016-10-25T17:53:35Z`
- `recipient`: object
  - `id`: integer - The unique identifier of the user. e.g. `160586`
  - `login`: string - The email address of the user that is used to log in. e.g. `carl.contractor@example.com`
  - `name`: string - The name of the user. e.g. `Carl the Contractor`
  - `company_name`: string - User's Company Name e.g. `Company ABC`
- `severity_level`: object
  - `id`: integer - Unique identifier for this severity level. e.g. `1`
  - `name`: string - Name of the Incident Severity Level e.g. `major`
  - `procore_default_name`: string enum[insignificant, minor, major, critical, moderate] - Procore default name of the Incident Severity Level e.g. `major`
  - `active`: boolean - Denotes whether the Incident Severity Level is active e.g. `false`
  - `email_trigger`: boolean - Denotes whether an email should be sent e.g. `false`
  - `push_notification_trigger`: boolean - Denotes whether a push notification should be sent e.g. `false`
  - `order`: integer - Ranking order of the Incident Severity Level
  - `created_at`: string(date-time) - iso8601 timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - iso8601 timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `triggered_at`: string(date-time) - ISO 8601 timestamp of when the alert was triggered by an incident event. e.g. `2016-10-25T17:53:35Z`
- `triggered_by`: object
  - `id`: integer - The unique identifier of the user. e.g. `160586`
  - `login`: string - The email address of the user that is used to log in. e.g. `carl.contractor@example.com`
  - `name`: string - The name of the user. e.g. `Carl the Contractor`
  - `company_name`: string - User's Company Name e.g. `Company ABC`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Body Parts

Resource id: `body-parts`. Raw spec: `../openapi-raw/body-parts.json`. Web: https://developers.procore.com/reference/rest/body-parts?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/incidents/body_parts

**List Body Parts**
Returns a paginated list of all body parts available for associating with incident injuries. Supports filtering by selectable status.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[selectable]` [query] boolean - If true, return item(s) with 'selectable' status.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[name] - Sort results by the specified field.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this body part entry. e.g. `999`
- `name`: string - Machine-readable name of the body part (e.g. finger_index_right, shoulder_left). Use this value when associating body parts to injuries. e.g. `finger_index_right`
- `selectable`: boolean - Represents whether a Body Part can be associated to an injury. e.g. `true`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this body part record was created. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the most recent update to this body part record. e.g. `2016-10-25T17:53:35Z`
- `parent_id`: integer - Identifier of the parent body part in the anatomical hierarchy. Null for top-level body parts (e.g. hand is parent of finger). e.g. `999`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Contributing Behaviors

Resource id: `contributing-behaviors`. Raw spec: `../openapi-raw/contributing-behaviors.json`. Web: https://developers.procore.com/reference/rest/contributing-behaviors?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/contributing_behaviors

**List Contributing Behaviors**
Returns a paginated list of contributing behaviors for the specified company. By default only active contributing behaviors are returned; pass all=true to include inactive ones.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[active]` [query] boolean - If true, returns item(s) with a status of 'active'.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[name] - Sort direction. Use the value to sort ascending, or prefix with a hyphen (e.g. -name) to sort descending.
- `all` [query] boolean - Both active and inactive Contributing Behaviors

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the contributing behavior. e.g. `999`
- `name`: string - Translated display name of the contributing behavior. e.g. `Distraction`
- `name_key`: string - Untranslated name of the contributing behavior, matching the original value stored in the database. e.g. `Distraction`
- `active`: boolean - Whether this contributing behavior is available for selection on incident records. When false, existing references are preserved but new assignments are prevented. e.g. `true`
- `global`: boolean - Whether this contributing behavior is a Procore-provided default. Global contributing behaviors cannot be deleted and their names cannot be changed. e.g. `false`
- `created_at`: string(date-time) - Timestamp when this contributing behavior was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp when this contributing behavior was last modified, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/contributing_behaviors

**Create Contributing Behavior**
Creates a new contributing behavior for the specified company. The request is idempotent; repeated calls with the same name return the existing record.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `contributing_behavior`: object (required) - Contributing behavior attributes.
  - `name`: string (required) - Display name for the contributing behavior. Must be unique within the company. Names of Procore-provided contributing behaviors cannot be changed.
  - `active`: boolean - Flag that denotes if the Contributing Behavior is available for use

Response 201 (application/json): object

- `id`: integer - Unique identifier of the contributing behavior. e.g. `999`
- `name`: string - Translated display name of the contributing behavior. e.g. `Distraction`
- `name_key`: string - Untranslated name of the contributing behavior, matching the original value stored in the database. e.g. `Distraction`
- `active`: boolean - Whether this contributing behavior is available for selection on incident records. When false, existing references are preserved but new assignments are prevented. e.g. `true`
- `global`: boolean - Whether this contributing behavior is a Procore-provided default. Global contributing behaviors cannot be deleted and their names cannot be changed. e.g. `false`
- `created_at`: string(date-time) - Timestamp when this contributing behavior was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp when this contributing behavior was last modified, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/contributing_behaviors/{id}

**Show Contributing Behavior**
Returns the details for a single contributing behavior identified by its ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the contributing behavior. Returned as id in List and Show responses.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the contributing behavior. e.g. `999`
- `name`: string - Translated display name of the contributing behavior. e.g. `Distraction`
- `name_key`: string - Untranslated name of the contributing behavior, matching the original value stored in the database. e.g. `Distraction`
- `active`: boolean - Whether this contributing behavior is available for selection on incident records. When false, existing references are preserved but new assignments are prevented. e.g. `true`
- `global`: boolean - Whether this contributing behavior is a Procore-provided default. Global contributing behaviors cannot be deleted and their names cannot be changed. e.g. `false`
- `created_at`: string(date-time) - Timestamp when this contributing behavior was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp when this contributing behavior was last modified, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/contributing_behaviors/{id}

**Update Contributing Behavior**
Updates a Contributing Behavior. Note that Procore provided Contributing Behaviors' names cannot be changed.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the contributing behavior. Returned as id in List and Show responses.

Request body (application/json) (required):

- `contributing_behavior`: object (required) - Contributing behavior attributes.
  - `name`: string - Display name for the contributing behavior. Must be unique within the company. Names of Procore-provided contributing behaviors cannot be changed.
  - `active`: boolean - Flag that denotes if the Contributing Behavior is available for use

Response 200 (application/json): object

- `id`: integer - Unique identifier of the contributing behavior. e.g. `999`
- `name`: string - Translated display name of the contributing behavior. e.g. `Distraction`
- `name_key`: string - Untranslated name of the contributing behavior, matching the original value stored in the database. e.g. `Distraction`
- `active`: boolean - Whether this contributing behavior is available for selection on incident records. When false, existing references are preserved but new assignments are prevented. e.g. `true`
- `global`: boolean - Whether this contributing behavior is a Procore-provided default. Global contributing behaviors cannot be deleted and their names cannot be changed. e.g. `false`
- `created_at`: string(date-time) - Timestamp when this contributing behavior was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp when this contributing behavior was last modified, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/contributing_behaviors/{id}

**Delete Contributing Behavior**
Deletes a Contributing Behavior. Note that Procore provided Contributing Behaviors cannot be deleted.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the contributing behavior. Returned as id in List and Show responses.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/contributing_behaviors/bulk_update

**Bulk Update Contributing Behaviors**
Updates the active status of multiple contributing behaviors in a single request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `contributing_behavior`: object (required) - Contributing behavior bulk update attributes.
  - `ids`: array of integer
  - `active`: boolean - Flag that denotes if the Contributing Behaviors are available for use

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the contributing behavior. e.g. `999`
- `name`: string - Translated display name of the contributing behavior. e.g. `Distraction`
- `name_key`: string - Untranslated name of the contributing behavior, matching the original value stored in the database. e.g. `Distraction`
- `active`: boolean - Whether this contributing behavior is available for selection on incident records. When false, existing references are preserved but new assignments are prevented. e.g. `true`
- `global`: boolean - Whether this contributing behavior is a Procore-provided default. Global contributing behaviors cannot be deleted and their names cannot be changed. e.g. `false`
- `created_at`: string(date-time) - Timestamp when this contributing behavior was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp when this contributing behavior was last modified, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Contributing Conditions

Resource id: `contributing-conditions`. Raw spec: `../openapi-raw/contributing-conditions.json`. Web: https://developers.procore.com/reference/rest/contributing-conditions?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/contributing_conditions

**List Contributing Conditions**
Returns a paginated list of contributing conditions for the specified company. By default only active contributing conditions are returned; pass all=true to include inactive ones.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[active]` [query] boolean - If true, returns item(s) with a status of 'active'.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[name] - Sort direction. Use the value to sort ascending, or prefix with a hyphen (e.g. -name) to sort descending.
- `all` [query] boolean - Both active and inactive Contributing Conditions

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the contributing condition. e.g. `9001`
- `name`: string - Translated display name of the contributing condition. e.g. `Environment`
- `name_key`: string - Untranslated name of the contributing condition, matching the original value stored in the database. e.g. `Environment`
- `active`: boolean - Whether this contributing condition is available for selection on incident records. When false, existing references are preserved but new assignments are prevented. e.g. `true`
- `global`: boolean - Whether this contributing condition is a Procore-provided default. Global contributing conditions cannot be deleted and their names cannot be changed. e.g. `false`
- `created_at`: string(date-time) - Timestamp when this contributing condition was created, in ISO 8601 format. e.g. `2019-01-18T21:36:55Z`
- `updated_at`: string(date-time) - Timestamp when this contributing condition was last modified, in ISO 8601 format. e.g. `2019-01-18T21:46:56Z`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/contributing_conditions

**Create Contributing Condition**
Creates a new contributing condition for the specified company. The request is idempotent; repeated calls with the same name return the existing record.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `contributing_condition`: object (required) - Contributing condition attributes.
  - `name`: string (required) - Display name for the contributing condition. Must be unique within the company. Names of Procore-provided contributing conditions cannot be changed.
  - `active`: boolean - Flag that denotes if the Contributing Condition is available for use

Response 201 (application/json): object

- `id`: integer - Unique identifier of the contributing condition. e.g. `9001`
- `name`: string - Translated display name of the contributing condition. e.g. `Environment`
- `name_key`: string - Untranslated name of the contributing condition, matching the original value stored in the database. e.g. `Environment`
- `active`: boolean - Whether this contributing condition is available for selection on incident records. When false, existing references are preserved but new assignments are prevented. e.g. `true`
- `global`: boolean - Whether this contributing condition is a Procore-provided default. Global contributing conditions cannot be deleted and their names cannot be changed. e.g. `false`
- `created_at`: string(date-time) - Timestamp when this contributing condition was created, in ISO 8601 format. e.g. `2019-01-18T21:36:55Z`
- `updated_at`: string(date-time) - Timestamp when this contributing condition was last modified, in ISO 8601 format. e.g. `2019-01-18T21:46:56Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/contributing_conditions/{id}

**Show Contributing Condition**
Returns the details for a single contributing condition identified by its ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the contributing condition. Returned as id in List and Show responses.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the contributing condition. e.g. `9001`
- `name`: string - Translated display name of the contributing condition. e.g. `Environment`
- `name_key`: string - Untranslated name of the contributing condition, matching the original value stored in the database. e.g. `Environment`
- `active`: boolean - Whether this contributing condition is available for selection on incident records. When false, existing references are preserved but new assignments are prevented. e.g. `true`
- `global`: boolean - Whether this contributing condition is a Procore-provided default. Global contributing conditions cannot be deleted and their names cannot be changed. e.g. `false`
- `created_at`: string(date-time) - Timestamp when this contributing condition was created, in ISO 8601 format. e.g. `2019-01-18T21:36:55Z`
- `updated_at`: string(date-time) - Timestamp when this contributing condition was last modified, in ISO 8601 format. e.g. `2019-01-18T21:46:56Z`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/contributing_conditions/{id}

**Update Contributing Condition**
Updates a Contributing Condition. Note that Procore provided Contributing Conditions' names cannot be changed.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the contributing condition. Returned as id in List and Show responses.

Request body (application/json) (required):

- `contributing_condition`: object (required) - Contributing condition attributes.
  - `name`: string - Display name for the contributing condition. Must be unique within the company. Names of Procore-provided contributing conditions cannot be changed.
  - `active`: boolean - Flag that denotes if the Contributing Condition is available for use

Response 200 (application/json): object

- `id`: integer - Unique identifier of the contributing condition. e.g. `9001`
- `name`: string - Translated display name of the contributing condition. e.g. `Environment`
- `name_key`: string - Untranslated name of the contributing condition, matching the original value stored in the database. e.g. `Environment`
- `active`: boolean - Whether this contributing condition is available for selection on incident records. When false, existing references are preserved but new assignments are prevented. e.g. `true`
- `global`: boolean - Whether this contributing condition is a Procore-provided default. Global contributing conditions cannot be deleted and their names cannot be changed. e.g. `false`
- `created_at`: string(date-time) - Timestamp when this contributing condition was created, in ISO 8601 format. e.g. `2019-01-18T21:36:55Z`
- `updated_at`: string(date-time) - Timestamp when this contributing condition was last modified, in ISO 8601 format. e.g. `2019-01-18T21:46:56Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/contributing_conditions/{id}

**Delete Contributing Condition**
Deletes a Contributing Condition. Note that Procore provided Contributing Conditions cannot be deleted.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the contributing condition. Returned as id in List and Show responses.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/contributing_conditions/bulk_update

**Bulk Update Contributing Conditions**
Updates the active status of multiple contributing conditions in a single request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `contributing_condition`: object (required) - Contributing condition bulk update attributes.
  - `ids`: array of integer
  - `active`: boolean - Flag that denotes if the Contributing Conditions are available for use

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the contributing condition. e.g. `9001`
- `name`: string - Translated display name of the contributing condition. e.g. `Environment`
- `name_key`: string - Untranslated name of the contributing condition, matching the original value stored in the database. e.g. `Environment`
- `active`: boolean - Whether this contributing condition is available for selection on incident records. When false, existing references are preserved but new assignments are prevented. e.g. `true`
- `global`: boolean - Whether this contributing condition is a Procore-provided default. Global contributing conditions cannot be deleted and their names cannot be changed. e.g. `false`
- `created_at`: string(date-time) - Timestamp when this contributing condition was created, in ISO 8601 format. e.g. `2019-01-18T21:36:55Z`
- `updated_at`: string(date-time) - Timestamp when this contributing condition was last modified, in ISO 8601 format. e.g. `2019-01-18T21:46:56Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Environmental Filter Options

Resource id: `environmental-filter-options`. Raw spec: `../openapi-raw/environmental-filter-options.json`. Web: https://developers.procore.com/reference/rest/environmental-filter-options?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/incidents/environmentals/filter_options/affected_companies

**Get Affected Company Filter Options**
Returns the list of affected companies currently referenced by environmental records in this project. Use these values to populate a filter dropdown when querying environmentals.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/environmentals/filter_options/environmental_types

**Get Environmental Type Filter Options**
Returns the environmental types currently referenced by environmental records in this project. Use these values to populate a filter dropdown when querying environmentals by environmental_type_id.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Enum key identifying the filter option as stored on the server. Pass this value in filter parameters when querying the parent resource. e.g. `enum`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/environmentals/filter_options/managed_equipment

**Get Managed Equipment Filter Options**
Returns managed equipment currently referenced by environmental records in this project. Use these values to populate a filter dropdown when querying environmentals.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/environmentals/filter_options/work_activities

**Get Work Activity Filter Options**
Returns work activities currently referenced by environmental records in this project. Use these values to populate a filter dropdown when querying environmentals.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Environmental Types

Resource id: `environmental-types`. Raw spec: `../openapi-raw/environmental-types.json`. Web: https://developers.procore.com/reference/rest/environmental-types?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/incidents/environmental_types

**List Environmental Types**
Returns a paginated list of environmental types for the specified company. Environmental types classify the nature of environmental incident records.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[active]` [query] boolean - If true, returns item(s) with a status of 'active'.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[name] - Sort direction. Use the value to sort ascending, or prefix with a hyphen (e.g. -name) to sort descending.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the environmental type. Use as the environmental_type_id parameter when creating or updating environmental records. e.g. `999`
- `name`: string - Translated display name of the environmental type. e.g. `Air Quality`
- `active`: boolean - Whether this environmental type is available for selection on environmental records. When false, existing references are preserved but new assignments are prevented. e.g. `true`
- `global`: boolean - Whether this environmental type is a Procore-provided default. Global environmental types cannot be deleted. e.g. `true`
- `created_at`: string(date-time) - Timestamp when this environmental type was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp when this environmental type was last modified, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Environmentals

Resource id: `environmentals`. Raw spec: `../openapi-raw/environmentals.json`. Web: https://developers.procore.com/reference/rest/environmentals?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/incidents/environmentals

**List Environmentals**
Returns a paginated list of environmental records for the specified project. Optionally scope to a single incident by passing incident_id.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID. When provided, the list will be scoped to only the Environmentals for a given Incident.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[environmental_type_id]` [query] array of integer - Return item(s) with the specified Environmental Type ID.
- `filters[query]` [query] string - Return item(s) containing search query
- `sort` [query] string enum[affected_company, created_at, environmental_type, managed_equipment, full_number, number, work_activity] - Sort direction. Use the value to sort ascending, or prefix with a hyphen (e.g. -full_number) to sort descending.

Response 200 (application/json): array of object

- `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `environmental`
- `environmental_type`: object
  - `id`: integer - Unique identifier of the environmental type. Use as the environmental_type_id parameter when creating or updating environmental records. e.g. `999`
  - `name`: string - Translated display name of the environmental type. e.g. `Air Quality`
  - `active`: boolean - Whether this environmental type is available for selection on environmental records. e.g. `true`
  - `global`: boolean - Whether this environmental type is a Procore-provided default. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when this environmental type was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp when this environmental type was last modified, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `estimated_cost_impact`: string - Estimated monetary cost impact of this environmental event, formatted as a decimal string. e.g. `20000.00`
- `quantity_value`: string - Numeric quantity associated with this environmental event, formatted as a decimal string. e.g. `1000.0`
- `quantity_unit_of_measure`: string enum[hours, days, weeks, months, years, ea, ls, lf, sf, sy, cy, lbs, ...] - Unit of measure for the quantity_value field. e.g. `lbs`
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
- `id`: integer - Unique identifier of this environmental record. e.g. `9`
- `number`: integer - Sequential record number within the parent incident. e.g. `4`
- `full_number`: string - Composite identifier combining the incident number and record number (e.g. "16.4"). e.g. `16.4`
- `incident_id`: integer - Unique identifier of the parent incident. Use as the incident_id query parameter to scope list requests. e.g. `16`
- `recordable`: boolean - Whether this record is classified as OSHA-recordable. Note: this field may not be applicable to environmental records. e.g. `true`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Plain-text version of the event description, with HTML tags stripped. e.g. `Sprain to Hand by Ground`
- `description`: string - Description of the environmental event in Rich Text (HTML) format. e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer - Unique identifier of the affected vendor company. e.g. `161072`
  - `name`: string - Display name of the affected vendor company. e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp when this environmental record was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp when this record was soft-deleted (sent to Recycle Bin), in ISO 8601 format. Null if the record is active. e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Unique identifier of the managed equipment item. e.g. `15504`
  - `name`: string - Display name of the managed equipment item. e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email address the incident creator uses to log in to Procore. e.g. `carl.contractor@example.com`
  - `id`: integer - Unique identifier of the user who created the parent incident. e.g. `161072`
  - `name`: string - Full name of the user who created the parent incident. e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp when this environmental record was last modified, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `equipment_register`: object
  - `id`: integer - Unique identifier of the equipment register entry. e.g. `4521`
  - `name`: string - Display name of the equipment register entry. e.g. `Excavator CAT 320`
- `work_activity`: object
  - `id`: integer - Unique identifier of the work activity. e.g. `999`
  - `name`: string - Translated display name of the work activity. e.g. `Earthwork`
  - `active`: boolean - Whether this work activity is available for selection. e.g. `true`
  - `global`: boolean - Whether this work activity is a Procore-provided default. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when this work activity was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp when this work activity was last modified, in ISO 8601 format. e.g. `2015-11-12T21:26:28Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/incidents/environmentals

**Create Environmental**
Creates a new environmental record and associates it with the specified incident.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `environmental`: object (required)
  - `incident_id`: integer (required) - Unique identifier of the incident to associate this environmental record with. Required on create.
  - `environmental_type_id`: integer - Unique identifier of the environmental type classifying this record. Retrieve valid IDs from GET /rest/v1.0/companies/{company_id}/incidents/environmental_types.
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `estimated_cost_impact`: number(float) - Estimated monetary cost impact of this environmental event. e.g. `20000`
  - `quantity_value`: number(float) - Numeric portion of the "quantity" field e.g. `1000`
  - `quantity_unit_of_measure`: string enum[hours, days, weeks, months, years, ea, ls, lf, sf, sy, cy, lbs, ...] - Unit of measure for the "quantity" field e.g. `lbs`
  - `affected_company_id`: integer - Unique identifier of the vendor company affected by this environmental event.
  - `managed_equipment_id`: integer - Unique identifier of the managed equipment involved in this environmental event.
  - `work_activity_id`: integer - Unique identifier of the work activity during which this environmental event occurred.
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 201 (application/json): object

- `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `environmental`
- `environmental_type`: object
  - `id`: integer - Unique identifier of the environmental type. Use as the environmental_type_id parameter when creating or updating environmental records. e.g. `999`
  - `name`: string - Translated display name of the environmental type. e.g. `Air Quality`
  - `active`: boolean - Whether this environmental type is available for selection on environmental records. e.g. `true`
  - `global`: boolean - Whether this environmental type is a Procore-provided default. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when this environmental type was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp when this environmental type was last modified, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `estimated_cost_impact`: string - Estimated monetary cost impact of this environmental event, formatted as a decimal string. e.g. `20000.00`
- `quantity_value`: string - Numeric quantity associated with this environmental event, formatted as a decimal string. e.g. `1000.0`
- `quantity_unit_of_measure`: string enum[hours, days, weeks, months, years, ea, ls, lf, sf, sy, cy, lbs, ...] - Unit of measure for the quantity_value field. e.g. `lbs`
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
- `id`: integer - Unique identifier of this environmental record. e.g. `9`
- `number`: integer - Sequential record number within the parent incident. e.g. `4`
- `full_number`: string - Composite identifier combining the incident number and record number (e.g. "16.4"). e.g. `16.4`
- `incident_id`: integer - Unique identifier of the parent incident. Use as the incident_id query parameter to scope list requests. e.g. `16`
- `recordable`: boolean - Whether this record is classified as OSHA-recordable. Note: this field may not be applicable to environmental records. e.g. `true`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Plain-text version of the event description, with HTML tags stripped. e.g. `Sprain to Hand by Ground`
- `description`: string - Description of the environmental event in Rich Text (HTML) format. e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer - Unique identifier of the affected vendor company. e.g. `161072`
  - `name`: string - Display name of the affected vendor company. e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp when this environmental record was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp when this record was soft-deleted (sent to Recycle Bin), in ISO 8601 format. Null if the record is active. e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Unique identifier of the managed equipment item. e.g. `15504`
  - `name`: string - Display name of the managed equipment item. e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email address the incident creator uses to log in to Procore. e.g. `carl.contractor@example.com`
  - `id`: integer - Unique identifier of the user who created the parent incident. e.g. `161072`
  - `name`: string - Full name of the user who created the parent incident. e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp when this environmental record was last modified, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `equipment_register`: object
  - `id`: integer - Unique identifier of the equipment register entry. e.g. `4521`
  - `name`: string - Display name of the equipment register entry. e.g. `Excavator CAT 320`
- `work_activity`: object
  - `id`: integer - Unique identifier of the work activity. e.g. `999`
  - `name`: string - Translated display name of the work activity. e.g. `Earthwork`
  - `active`: boolean - Whether this work activity is available for selection. e.g. `true`
  - `global`: boolean - Whether this work activity is a Procore-provided default. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when this work activity was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp when this work activity was last modified, in ISO 8601 format. e.g. `2015-11-12T21:26:28Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/environmentals/{id}

**Show Environmental**
Returns the details of a single environmental record identified by its ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Unique identifier of the environmental record. Returned as id in List and Show responses.

Response 200 (application/json): object

- `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `environmental`
- `environmental_type`: object
  - `id`: integer - Unique identifier of the environmental type. Use as the environmental_type_id parameter when creating or updating environmental records. e.g. `999`
  - `name`: string - Translated display name of the environmental type. e.g. `Air Quality`
  - `active`: boolean - Whether this environmental type is available for selection on environmental records. e.g. `true`
  - `global`: boolean - Whether this environmental type is a Procore-provided default. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when this environmental type was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp when this environmental type was last modified, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `estimated_cost_impact`: string - Estimated monetary cost impact of this environmental event, formatted as a decimal string. e.g. `20000.00`
- `quantity_value`: string - Numeric quantity associated with this environmental event, formatted as a decimal string. e.g. `1000.0`
- `quantity_unit_of_measure`: string enum[hours, days, weeks, months, years, ea, ls, lf, sf, sy, cy, lbs, ...] - Unit of measure for the quantity_value field. e.g. `lbs`
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
- `id`: integer - Unique identifier of this environmental record. e.g. `9`
- `number`: integer - Sequential record number within the parent incident. e.g. `4`
- `full_number`: string - Composite identifier combining the incident number and record number (e.g. "16.4"). e.g. `16.4`
- `incident_id`: integer - Unique identifier of the parent incident. Use as the incident_id query parameter to scope list requests. e.g. `16`
- `recordable`: boolean - Whether this record is classified as OSHA-recordable. Note: this field may not be applicable to environmental records. e.g. `true`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Plain-text version of the event description, with HTML tags stripped. e.g. `Sprain to Hand by Ground`
- `description`: string - Description of the environmental event in Rich Text (HTML) format. e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer - Unique identifier of the affected vendor company. e.g. `161072`
  - `name`: string - Display name of the affected vendor company. e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp when this environmental record was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp when this record was soft-deleted (sent to Recycle Bin), in ISO 8601 format. Null if the record is active. e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Unique identifier of the managed equipment item. e.g. `15504`
  - `name`: string - Display name of the managed equipment item. e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email address the incident creator uses to log in to Procore. e.g. `carl.contractor@example.com`
  - `id`: integer - Unique identifier of the user who created the parent incident. e.g. `161072`
  - `name`: string - Full name of the user who created the parent incident. e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp when this environmental record was last modified, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `equipment_register`: object
  - `id`: integer - Unique identifier of the equipment register entry. e.g. `4521`
  - `name`: string - Display name of the equipment register entry. e.g. `Excavator CAT 320`
- `work_activity`: object
  - `id`: integer - Unique identifier of the work activity. e.g. `999`
  - `name`: string - Translated display name of the work activity. e.g. `Earthwork`
  - `active`: boolean - Whether this work activity is available for selection. e.g. `true`
  - `global`: boolean - Whether this work activity is a Procore-provided default. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when this work activity was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp when this work activity was last modified, in ISO 8601 format. e.g. `2015-11-12T21:26:28Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/incidents/environmentals/{id}

**Update Environmental**
Updates the specified environmental record with the provided attributes.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Unique identifier of the environmental record. Returned as id in List and Show responses.

Request body (application/json) (required):

- `environmental`: object (required)
  - `environmental_type_id`: integer - Unique identifier of the environmental type classifying this record. Retrieve valid IDs from GET /rest/v1.0/companies/{company_id}/incidents/environmental_types.
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `estimated_cost_impact`: number(float) - Estimated monetary cost impact of this environmental event. e.g. `20000`
  - `quantity_value`: number(float) - Numeric portion of the "quantity" field e.g. `1000`
  - `quantity_unit_of_measure`: string enum[hours, days, weeks, months, years, ea, ls, lf, sf, sy, cy, lbs, ...] - Unit of measure for the "quantity" field e.g. `lbs`
  - `affected_company_id`: integer - Unique identifier of the vendor company affected by this environmental event.
  - `managed_equipment_id`: integer - Unique identifier of the managed equipment involved in this environmental event.
  - `work_activity_id`: integer - Unique identifier of the work activity during which this environmental event occurred.
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `environmental`
- `environmental_type`: object
  - `id`: integer - Unique identifier of the environmental type. Use as the environmental_type_id parameter when creating or updating environmental records. e.g. `999`
  - `name`: string - Translated display name of the environmental type. e.g. `Air Quality`
  - `active`: boolean - Whether this environmental type is available for selection on environmental records. e.g. `true`
  - `global`: boolean - Whether this environmental type is a Procore-provided default. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when this environmental type was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp when this environmental type was last modified, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `estimated_cost_impact`: string - Estimated monetary cost impact of this environmental event, formatted as a decimal string. e.g. `20000.00`
- `quantity_value`: string - Numeric quantity associated with this environmental event, formatted as a decimal string. e.g. `1000.0`
- `quantity_unit_of_measure`: string enum[hours, days, weeks, months, years, ea, ls, lf, sf, sy, cy, lbs, ...] - Unit of measure for the quantity_value field. e.g. `lbs`
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
- `id`: integer - Unique identifier of this environmental record. e.g. `9`
- `number`: integer - Sequential record number within the parent incident. e.g. `4`
- `full_number`: string - Composite identifier combining the incident number and record number (e.g. "16.4"). e.g. `16.4`
- `incident_id`: integer - Unique identifier of the parent incident. Use as the incident_id query parameter to scope list requests. e.g. `16`
- `recordable`: boolean - Whether this record is classified as OSHA-recordable. Note: this field may not be applicable to environmental records. e.g. `true`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Plain-text version of the event description, with HTML tags stripped. e.g. `Sprain to Hand by Ground`
- `description`: string - Description of the environmental event in Rich Text (HTML) format. e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer - Unique identifier of the affected vendor company. e.g. `161072`
  - `name`: string - Display name of the affected vendor company. e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp when this environmental record was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp when this record was soft-deleted (sent to Recycle Bin), in ISO 8601 format. Null if the record is active. e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Unique identifier of the managed equipment item. e.g. `15504`
  - `name`: string - Display name of the managed equipment item. e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email address the incident creator uses to log in to Procore. e.g. `carl.contractor@example.com`
  - `id`: integer - Unique identifier of the user who created the parent incident. e.g. `161072`
  - `name`: string - Full name of the user who created the parent incident. e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp when this environmental record was last modified, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `equipment_register`: object
  - `id`: integer - Unique identifier of the equipment register entry. e.g. `4521`
  - `name`: string - Display name of the equipment register entry. e.g. `Excavator CAT 320`
- `work_activity`: object
  - `id`: integer - Unique identifier of the work activity. e.g. `999`
  - `name`: string - Translated display name of the work activity. e.g. `Earthwork`
  - `active`: boolean - Whether this work activity is available for selection. e.g. `true`
  - `global`: boolean - Whether this work activity is a Procore-provided default. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when this work activity was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp when this work activity was last modified, in ISO 8601 format. e.g. `2015-11-12T21:26:28Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/incidents/environmentals/{id}

**Destroy Environmental**
Soft-deletes the specified environmental record by sending it to the Recycle Bin. Use the restore endpoint to recover it.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Unique identifier of the environmental record. Returned as id in List and Show responses.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/incidents/environmentals

**List Recycled Environmentals**
Returns a paginated list of soft-deleted environmental records in the Recycle Bin for the specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID. When provided, the list will be scoped to only the Environmentals for a given Incident.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[environmental_type_id]` [query] array of integer - Return item(s) with the specified Environmental Type ID.
- `filters[query]` [query] string - Return item(s) containing search query
- `sort` [query] string enum[affected_company, created_at, managed_equipment, full_number, number, work_activity] - Sort direction. Use the value to sort ascending, or prefix with a hyphen (e.g. -full_number) to sort descending.

Response 200 (application/json): array of object

- `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `environmental`
- `environmental_type`: object
  - `id`: integer - Unique identifier of the environmental type. Use as the environmental_type_id parameter when creating or updating environmental records. e.g. `999`
  - `name`: string - Translated display name of the environmental type. e.g. `Air Quality`
  - `active`: boolean - Whether this environmental type is available for selection on environmental records. e.g. `true`
  - `global`: boolean - Whether this environmental type is a Procore-provided default. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when this environmental type was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp when this environmental type was last modified, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `estimated_cost_impact`: string - Estimated monetary cost impact of this environmental event, formatted as a decimal string. e.g. `20000.00`
- `quantity_value`: string - Numeric quantity associated with this environmental event, formatted as a decimal string. e.g. `1000.0`
- `quantity_unit_of_measure`: string enum[hours, days, weeks, months, years, ea, ls, lf, sf, sy, cy, lbs, ...] - Unit of measure for the quantity_value field. e.g. `lbs`
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
- `id`: integer - Unique identifier of this environmental record. e.g. `9`
- `number`: integer - Sequential record number within the parent incident. e.g. `4`
- `full_number`: string - Composite identifier combining the incident number and record number (e.g. "16.4"). e.g. `16.4`
- `incident_id`: integer - Unique identifier of the parent incident. Use as the incident_id query parameter to scope list requests. e.g. `16`
- `recordable`: boolean - Whether this record is classified as OSHA-recordable. Note: this field may not be applicable to environmental records. e.g. `true`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Plain-text version of the event description, with HTML tags stripped. e.g. `Sprain to Hand by Ground`
- `description`: string - Description of the environmental event in Rich Text (HTML) format. e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer - Unique identifier of the affected vendor company. e.g. `161072`
  - `name`: string - Display name of the affected vendor company. e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp when this environmental record was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp when this record was soft-deleted (sent to Recycle Bin), in ISO 8601 format. Null if the record is active. e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Unique identifier of the managed equipment item. e.g. `15504`
  - `name`: string - Display name of the managed equipment item. e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email address the incident creator uses to log in to Procore. e.g. `carl.contractor@example.com`
  - `id`: integer - Unique identifier of the user who created the parent incident. e.g. `161072`
  - `name`: string - Full name of the user who created the parent incident. e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp when this environmental record was last modified, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `equipment_register`: object
  - `id`: integer - Unique identifier of the equipment register entry. e.g. `4521`
  - `name`: string - Display name of the equipment register entry. e.g. `Excavator CAT 320`
- `work_activity`: object
  - `id`: integer - Unique identifier of the work activity. e.g. `999`
  - `name`: string - Translated display name of the work activity. e.g. `Earthwork`
  - `active`: boolean - Whether this work activity is available for selection. e.g. `true`
  - `global`: boolean - Whether this work activity is a Procore-provided default. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when this work activity was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp when this work activity was last modified, in ISO 8601 format. e.g. `2015-11-12T21:26:28Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/incidents/environmentals/{id}

**Show Recycled Environmental**
Returns the details of a single soft-deleted environmental record from the Recycle Bin.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Unique identifier of the recycled environmental record.

Response 200 (application/json): object

- `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `environmental`
- `environmental_type`: object
  - `id`: integer - Unique identifier of the environmental type. Use as the environmental_type_id parameter when creating or updating environmental records. e.g. `999`
  - `name`: string - Translated display name of the environmental type. e.g. `Air Quality`
  - `active`: boolean - Whether this environmental type is available for selection on environmental records. e.g. `true`
  - `global`: boolean - Whether this environmental type is a Procore-provided default. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when this environmental type was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp when this environmental type was last modified, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `estimated_cost_impact`: string - Estimated monetary cost impact of this environmental event, formatted as a decimal string. e.g. `20000.00`
- `quantity_value`: string - Numeric quantity associated with this environmental event, formatted as a decimal string. e.g. `1000.0`
- `quantity_unit_of_measure`: string enum[hours, days, weeks, months, years, ea, ls, lf, sf, sy, cy, lbs, ...] - Unit of measure for the quantity_value field. e.g. `lbs`
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
- `id`: integer - Unique identifier of this environmental record. e.g. `9`
- `number`: integer - Sequential record number within the parent incident. e.g. `4`
- `full_number`: string - Composite identifier combining the incident number and record number (e.g. "16.4"). e.g. `16.4`
- `incident_id`: integer - Unique identifier of the parent incident. Use as the incident_id query parameter to scope list requests. e.g. `16`
- `recordable`: boolean - Whether this record is classified as OSHA-recordable. Note: this field may not be applicable to environmental records. e.g. `true`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Plain-text version of the event description, with HTML tags stripped. e.g. `Sprain to Hand by Ground`
- `description`: string - Description of the environmental event in Rich Text (HTML) format. e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer - Unique identifier of the affected vendor company. e.g. `161072`
  - `name`: string - Display name of the affected vendor company. e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp when this environmental record was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp when this record was soft-deleted (sent to Recycle Bin), in ISO 8601 format. Null if the record is active. e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Unique identifier of the managed equipment item. e.g. `15504`
  - `name`: string - Display name of the managed equipment item. e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email address the incident creator uses to log in to Procore. e.g. `carl.contractor@example.com`
  - `id`: integer - Unique identifier of the user who created the parent incident. e.g. `161072`
  - `name`: string - Full name of the user who created the parent incident. e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp when this environmental record was last modified, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `equipment_register`: object
  - `id`: integer - Unique identifier of the equipment register entry. e.g. `4521`
  - `name`: string - Display name of the equipment register entry. e.g. `Excavator CAT 320`
- `work_activity`: object
  - `id`: integer - Unique identifier of the work activity. e.g. `999`
  - `name`: string - Translated display name of the work activity. e.g. `Earthwork`
  - `active`: boolean - Whether this work activity is available for selection. e.g. `true`
  - `global`: boolean - Whether this work activity is a Procore-provided default. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when this work activity was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp when this work activity was last modified, in ISO 8601 format. e.g. `2015-11-12T21:26:28Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/recycle_bin/incidents/environmentals/{id}/restore

**Restore Environmental**
Restores the specified environmental record from the Recycle Bin back to active status.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Unique identifier of the recycled environmental record to restore.

Response 200: OK (no body)

Error responses: 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Filing Types

Resource id: `filing-types`. Raw spec: `../openapi-raw/filing-types.json`. Web: https://developers.procore.com/reference/rest/filing-types?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/incidents/injury_filing_types

**List Incident Filing Types**
Returns a paginated list of incident filing types for the specified company. Each filing type represents a severity classification (e.g. first aid, lost time, fatality) that can be assigned to an injury record.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[active]` [query] boolean - If true, returns item(s) with a status of 'active'.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[name, severity_level] - Sort direction. Use the value to sort ascending, or prefix with a hyphen (e.g. -name) to sort descending.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the filing type. e.g. `999`
- `name`: string - Name of the filing type (e.g. report_only, first_aid, lost_time, fatality). Procore-provided filing type names cannot be changed. e.g. `report_only`
- `created_at`: string(date-time) - Timestamp when this filing type was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `severity_level`: object
  - `id`: integer - Unique identifier of the severity level. e.g. `1`
  - `name`: string - Display name of the severity level. May be customized by the company. e.g. `major`
  - `procore_default_name`: string enum[insignificant, minor, major, critical, moderate] - Procore's original default name for this severity level, before any company customization. e.g. `major`
  - `active`: boolean - Whether this severity level is active and available for assignment. e.g. `false`
  - `email_trigger`: boolean - Whether recording an incident with this severity level triggers an email notification. e.g. `false`
  - `push_notification_trigger`: boolean - Whether recording an incident with this severity level triggers a push notification. e.g. `false`
  - `order`: integer - Numeric ranking of this severity level, used for ordering from least to most severe.
  - `created_at`: string(date-time) - Timestamp when this severity level was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp when this severity level was last updated, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp when this filing type was last updated, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/incidents/injury_filing_types/{id}

**Show Filing Type**
Returns a single incident filing type by its ID, including the associated severity level.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the filing type. Use the id from the List Filing Types response.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the filing type. e.g. `999`
- `name`: string - Name of the filing type (e.g. report_only, first_aid, lost_time, fatality). Procore-provided filing type names cannot be changed. e.g. `report_only`
- `created_at`: string(date-time) - Timestamp when this filing type was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `severity_level`: object
  - `id`: integer - Unique identifier of the severity level. e.g. `1`
  - `name`: string - Display name of the severity level. May be customized by the company. e.g. `major`
  - `procore_default_name`: string enum[insignificant, minor, major, critical, moderate] - Procore's original default name for this severity level, before any company customization. e.g. `major`
  - `active`: boolean - Whether this severity level is active and available for assignment. e.g. `false`
  - `email_trigger`: boolean - Whether recording an incident with this severity level triggers an email notification. e.g. `false`
  - `push_notification_trigger`: boolean - Whether recording an incident with this severity level triggers a push notification. e.g. `false`
  - `order`: integer - Numeric ranking of this severity level, used for ordering from least to most severe.
  - `created_at`: string(date-time) - Timestamp when this severity level was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp when this severity level was last updated, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp when this filing type was last updated, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/incidents/injury_filing_types/{id}

**Update Filing Type**
Updates the severity level assignment for the specified filing type. Procore-provided filing type names cannot be changed.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the filing type. Use the id from the List Filing Types response.

Request body (application/json) (required):

- `filing_type`: object (required)
  - `severity_level_id`: integer - ID of the severity level to associate with this filing type. Obtain valid IDs from the company's incident severity levels. e.g. `435`

Response 200 (application/json): object

- `id`: integer - Unique identifier of the filing type. e.g. `999`
- `name`: string - Name of the filing type (e.g. report_only, first_aid, lost_time, fatality). Procore-provided filing type names cannot be changed. e.g. `report_only`
- `created_at`: string(date-time) - Timestamp when this filing type was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `severity_level`: object
  - `id`: integer - Unique identifier of the severity level. e.g. `1`
  - `name`: string - Display name of the severity level. May be customized by the company. e.g. `major`
  - `procore_default_name`: string enum[insignificant, minor, major, critical, moderate] - Procore's original default name for this severity level, before any company customization. e.g. `major`
  - `active`: boolean - Whether this severity level is active and available for assignment. e.g. `false`
  - `email_trigger`: boolean - Whether recording an incident with this severity level triggers an email notification. e.g. `false`
  - `push_notification_trigger`: boolean - Whether recording an incident with this severity level triggers a push notification. e.g. `false`
  - `order`: integer - Numeric ranking of this severity level, used for ordering from least to most severe.
  - `created_at`: string(date-time) - Timestamp when this severity level was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp when this severity level was last updated, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp when this filing type was last updated, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Harm Sources

Resource id: `harm-sources`. Raw spec: `../openapi-raw/harm-sources.json`. Web: https://developers.procore.com/reference/rest/harm-sources?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/incidents/harm_sources

**List Harm Sources**
Returns a paginated list of harm sources for the specified company. Harm sources identify the material, substance, or object that caused or could cause harm in an incident.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[active]` [query] boolean - If true, returns item(s) with a status of 'active'.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[name] - Sort direction. Use the value to sort ascending, or prefix with a hyphen (e.g. -name) to sort descending.
- `all` [query] boolean - When true, returns both active and inactive harm sources. When omitted or false, returns only active harm sources.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the harm source. e.g. `999`
- `name`: string - Display name of the harm source, translated to the requested locale. For the untranslated original name, see name_key. e.g. `Material`
- `name_key`: string - Untranslated original name of the harm source. Use for programmatic matching when locale-independent identification is needed. e.g. `Material`
- `active`: boolean - Whether this harm source is active and available for selection when recording incidents. e.g. `true`
- `global`: boolean - Whether this harm source is a Procore-provided default. Global harm sources cannot be renamed or deleted. e.g. `true`
- `created_at`: string(date-time) - Timestamp when this harm source was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp when this harm source was last updated, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/incidents/harm_sources

**Create Harm Source**
Creates a new custom harm source for the company. The name must be unique within the company. The operation is idempotent.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `harm_source`: object (required) - Harm source attributes to create or update.
  - `name`: string (required) - Display name of the harm source. Required on create. Must be unique within the company.
  - `active`: boolean - Flag that denotes if the Harm Source is available for use. Defaults to true on create.

Response 201 (application/json): object

- `id`: integer - Unique identifier of the harm source. e.g. `999`
- `name`: string - Display name of the harm source, translated to the requested locale. For the untranslated original name, see name_key. e.g. `Material`
- `name_key`: string - Untranslated original name of the harm source. Use for programmatic matching when locale-independent identification is needed. e.g. `Material`
- `active`: boolean - Whether this harm source is active and available for selection when recording incidents. e.g. `true`
- `global`: boolean - Whether this harm source is a Procore-provided default. Global harm sources cannot be renamed or deleted. e.g. `true`
- `created_at`: string(date-time) - Timestamp when this harm source was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp when this harm source was last updated, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/incidents/harm_sources/{id}

**Show Harm Source**
Returns a single harm source by its ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the harm source. Use the id from the List Harm Sources response.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the harm source. e.g. `999`
- `name`: string - Display name of the harm source, translated to the requested locale. For the untranslated original name, see name_key. e.g. `Material`
- `name_key`: string - Untranslated original name of the harm source. Use for programmatic matching when locale-independent identification is needed. e.g. `Material`
- `active`: boolean - Whether this harm source is active and available for selection when recording incidents. e.g. `true`
- `global`: boolean - Whether this harm source is a Procore-provided default. Global harm sources cannot be renamed or deleted. e.g. `true`
- `created_at`: string(date-time) - Timestamp when this harm source was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp when this harm source was last updated, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/incidents/harm_sources/{id}

**Update Harm Source**
Updates the specified harm source. Procore-provided harm source names cannot be changed.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the harm source. Use the id from the List Harm Sources response.

Request body (application/json) (required):

- `harm_source`: object (required) - Harm source attributes to create or update.
  - `name`: string (required) - Display name of the harm source. Required on create. Must be unique within the company.
  - `active`: boolean - Flag that denotes if the Harm Source is available for use. Defaults to true on create.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the harm source. e.g. `999`
- `name`: string - Display name of the harm source, translated to the requested locale. For the untranslated original name, see name_key. e.g. `Material`
- `name_key`: string - Untranslated original name of the harm source. Use for programmatic matching when locale-independent identification is needed. e.g. `Material`
- `active`: boolean - Whether this harm source is active and available for selection when recording incidents. e.g. `true`
- `global`: boolean - Whether this harm source is a Procore-provided default. Global harm sources cannot be renamed or deleted. e.g. `true`
- `created_at`: string(date-time) - Timestamp when this harm source was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp when this harm source was last updated, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/incidents/harm_sources/{id}

**Delete Harm Source**
Deletes a custom harm source. Procore-provided harm sources cannot be deleted.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the harm source. Use the id from the List Harm Sources response.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/incidents/harm_sources/bulk_update

**Bulk Update Harm Sources**
Updates the active status for multiple harm sources in a single request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `harm_source`: object (required) - Harm source identifiers and the active status to apply.
  - `ids`: array of integer
  - `active`: boolean - Whether the specified harm sources should be active (available for selection) or inactive.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the harm source. e.g. `999`
- `name`: string - Display name of the harm source, translated to the requested locale. For the untranslated original name, see name_key. e.g. `Material`
- `name_key`: string - Untranslated original name of the harm source. Use for programmatic matching when locale-independent identification is needed. e.g. `Material`
- `active`: boolean - Whether this harm source is active and available for selection when recording incidents. e.g. `true`
- `global`: boolean - Whether this harm source is a Procore-provided default. Global harm sources cannot be renamed or deleted. e.g. `true`
- `created_at`: string(date-time) - Timestamp when this harm source was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp when this harm source was last updated, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Hazards

Resource id: `hazards`. Raw spec: `../openapi-raw/hazards.json`. Web: https://developers.procore.com/reference/rest/hazards?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/hazards

**List Hazards**
Returns a paginated list of hazards for the specified company. By default, only active hazards are returned; pass all=true to include inactive ones. Hazards categorize the type of danger associated with an incident.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[active]` [query] boolean - If true, returns item(s) with a status of 'active'.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[name] - Sort direction. Use the value to sort ascending, or prefix with a hyphen (e.g. -name) to sort descending.
- `all` [query] boolean - When true, returns both active and inactive hazards. When omitted or false, only active hazards are returned.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the hazard. e.g. `1738`
- `name`: string - Display name of the hazard, translated to the requested locale. For the untranslated original name, see name_key. e.g. `Slip`
- `name_key`: string - Untranslated original name of the hazard. Use for programmatic matching when locale-independent identification is needed. e.g. `Slip`
- `active`: boolean - Whether this hazard is active and available for selection when recording incidents. e.g. `true`
- `global`: boolean - Whether this hazard is a Procore-provided default. Global hazards cannot be renamed or deleted. e.g. `false`
- `created_at`: string(date-time) - Timestamp when this hazard was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp when this hazard was last updated, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/hazards

**Create Hazard**
Creates a new custom hazard for the company. The name must be unique within the company. The operation is idempotent.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `hazard`: object (required) - Hazard attributes to create.
  - `name`: string (required) - Display name of the hazard. Required on create. Must be unique within the company.
  - `active`: boolean - Whether the hazard is available for selection when recording incidents. Defaults to true on create.

Response 201 (application/json): object

- `id`: integer - Unique identifier of the hazard. e.g. `1738`
- `name`: string - Display name of the hazard, translated to the requested locale. For the untranslated original name, see name_key. e.g. `Slip`
- `name_key`: string - Untranslated original name of the hazard. Use for programmatic matching when locale-independent identification is needed. e.g. `Slip`
- `active`: boolean - Whether this hazard is active and available for selection when recording incidents. e.g. `true`
- `global`: boolean - Whether this hazard is a Procore-provided default. Global hazards cannot be renamed or deleted. e.g. `false`
- `created_at`: string(date-time) - Timestamp when this hazard was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp when this hazard was last updated, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/hazards/{id}

**Show Hazard**
Returns a single hazard by its ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the hazard. Use the id from the List Hazards response.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the hazard. e.g. `1738`
- `name`: string - Display name of the hazard, translated to the requested locale. For the untranslated original name, see name_key. e.g. `Slip`
- `name_key`: string - Untranslated original name of the hazard. Use for programmatic matching when locale-independent identification is needed. e.g. `Slip`
- `active`: boolean - Whether this hazard is active and available for selection when recording incidents. e.g. `true`
- `global`: boolean - Whether this hazard is a Procore-provided default. Global hazards cannot be renamed or deleted. e.g. `false`
- `created_at`: string(date-time) - Timestamp when this hazard was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp when this hazard was last updated, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/hazards/{id}

**Update Hazard**
Updates the specified hazard. Procore-provided hazard names cannot be changed.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the hazard. Use the id from the List Hazards response.

Request body (application/json) (required):

- `hazard`: object (required) - Hazard attributes to update.
  - `name`: string - Display name of the hazard. Must be unique within the company. Cannot be changed for Procore-provided hazards.
  - `active`: boolean - Whether the hazard is available for selection when recording incidents.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the hazard. e.g. `1738`
- `name`: string - Display name of the hazard, translated to the requested locale. For the untranslated original name, see name_key. e.g. `Slip`
- `name_key`: string - Untranslated original name of the hazard. Use for programmatic matching when locale-independent identification is needed. e.g. `Slip`
- `active`: boolean - Whether this hazard is active and available for selection when recording incidents. e.g. `true`
- `global`: boolean - Whether this hazard is a Procore-provided default. Global hazards cannot be renamed or deleted. e.g. `false`
- `created_at`: string(date-time) - Timestamp when this hazard was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp when this hazard was last updated, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/hazards/{id}

**Delete Hazard**
Deletes a custom hazard. Procore-provided hazards cannot be deleted.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the hazard. Use the id from the List Hazards response.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/hazards/bulk_update

**Bulk Update Hazards**
Updates the active status for multiple hazards in a single request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `hazard`: object (required) - Hazard identifiers and the active status to apply.
  - `ids`: array of integer
  - `active`: boolean - Whether the specified hazards should be active (available for selection) or inactive.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the hazard. e.g. `1738`
- `name`: string - Display name of the hazard, translated to the requested locale. For the untranslated original name, see name_key. e.g. `Slip`
- `name_key`: string - Untranslated original name of the hazard. Use for programmatic matching when locale-independent identification is needed. e.g. `Slip`
- `active`: boolean - Whether this hazard is active and available for selection when recording incidents. e.g. `true`
- `global`: boolean - Whether this hazard is a Procore-provided default. Global hazards cannot be renamed or deleted. e.g. `false`
- `created_at`: string(date-time) - Timestamp when this hazard was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp when this hazard was last updated, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Incident Attachments

Resource id: `incident-attachments`. Raw spec: `../openapi-raw/incident-attachments.json`. Web: https://developers.procore.com/reference/rest/incident-attachments?version=latest
Product lines: Total Quality and Safety Management

### POST /rest/v1.0/projects/{project_id}/incidents/{incident_id}/attachments

**Create Attachment**
Uploads a file attachment to the specified incident. Supports both multipart file upload and upload-ID-based attachment. The operation is idempotent.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [path] integer (required) - Unique identifier of the incident to attach the file to. Use the id from the List or Show Incidents response.
- `run_configurable_validations` [query] boolean - Whether or not Configurable validations from the Incident/Injury Configurable Field Set should be run (default: false). See (https://developers.procore.com/reference/configurable-field-sets#list-project-configurable-f...

Request body (application/json) (required):

- `upload_id`: string (required) - Upload ID from a previously completed upload. The referenced file is saved as an incident attachment. e.g. `1ZE146W9K804SAJJZX19JVAD0R`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this incident attachment. Use as a reference when managing attachments on an action. e.g. `5324`
- `url`: string - Download URL for the full-size attachment file. e.g. `http://www.example.com/`
- `thumbnail_url`: string - URL for a large thumbnail preview of the attachment. Null if no preview is available. e.g. `http://www.example.com/`
- `name`: string - Original filename of the uploaded attachment, including file extension. e.g. `january_receipt_copy.jpg`
- `content_type`: string - MIME type of the attachment file (e.g. application/pdf, image/jpeg). e.g. `application/pdf`
- `viewable_document_id`: integer - Identifier of the associated viewable document for in-browser rendering. Null if the attachment has not been converted for viewing. e.g. `12`
- `viewable`: boolean - Indicates whether the attachment can be viewed in-browser. True if the file type supports viewing or a viewable document has been generated. e.g. `true`
- `can_be_viewed`: boolean - Indicates whether the attachment has finished processing and is ready for in-browser viewing. e.g. `true`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Incident Filter Options

Resource id: `incident-filter-options`. Raw spec: `../openapi-raw/incident-filter-options.json`. Web: https://developers.procore.com/reference/rest/incident-filter-options?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/incidents/filter_options/contributing_behaviors

**Get Contributing Behavior Filter Options**
Returns contributing behaviors that are currently associated with incidents in this project, for use as filter options. Each option contains a key (ID) and a display value (name).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/filter_options/contributing_conditions

**Get Contributing Condition Filter Options**
Returns contributing conditions that are currently associated with incidents in this project, for use as filter options. Each option contains a key (ID) and a display value (name).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/filter_options/hazards

**Get Hazard Filter Options**
Returns hazards that are currently associated with incidents in this project, for use as filter options. Each option contains a key (ID) and a display value (name).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/filter_options/locations

**Get Location Filter Options**
Returns project locations that are currently associated with incidents, for use as filter options. Each option contains a key (location ID) and a display value (full location path).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/filter_options/statuses

**Get Status Filter Options**
Returns available incident statuses for use as filter options. Each option contains a key (status enum value) and a display value (label).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Enum key identifying the filter option as stored on the server. Pass this value in filter parameters when querying the parent resource. e.g. `enum`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/filter_options/assignees

**Get Assignee Filter Options**
Returns users who are currently assigned to incidents in this project, for use as filter options. Each option contains a key (login information ID) and a display value (full name).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Incident Picker Options

Resource id: `incident-picker-options`. Raw spec: `../openapi-raw/incident-picker-options.json`. Web: https://developers.procore.com/reference/rest/incident-picker-options?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/incidents/affected_body_parts

**Get Affected Body Parts**
Returns available affected body part options for use in injury record forms. Each option contains a label for display and a value to submit when creating or updating injuries.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `label`: string - Human-readable display name for the affected body part (e.g. 'Finger index'). Use in UI dropdowns and form labels. e.g. `Finger index`
- `value`: string - Server-side value to submit when creating or updating an injury record's affected body part (e.g. 'finger_index'). e.g. `finger_index`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/incidents/filing_types

**Get Filing Types**
Returns available filing type options for use in injury record forms. Each option contains a label for display and a value to submit when creating or updating injuries. Values are ordered from least to highest severity.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `label`: string - Human-readable display name for the filing type (e.g. 'First Aid'). Use in UI dropdowns and form labels. e.g. `First Aid`
- `value`: string - Server-side value to submit when creating or updating an injury record's filing type (e.g. 'first_aid'). e.g. `first_aid`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/incidents/statuses

**Get Incident Statuses**
Returns available incident status options. Each option contains a label for display and a value to submit when creating or updating incidents.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `label`: string - Human-readable display name for the incident status (e.g. 'Open'). Use in UI dropdowns and form labels. e.g. `Open`
- `value`: string - Server-side value to submit when creating or updating an incident's status (e.g. 'open'). e.g. `open`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/incidents/units_of_measure

**Get Units of Measure**
Returns available unit of measure options for use in environmental incident record forms. Each option contains a label for display and a value to submit when creating or updating environmental records.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `label`: string - Human-readable display name for the unit of measure (e.g. 'lump sum'). Use in UI dropdowns and form labels. e.g. `lump sum`
- `value`: string - Server-side value to submit when creating or updating an environmental record's unit of measure (e.g. 'ls'). e.g. `ls`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Incidents

Resource id: `incidents`. Raw spec: `../openapi-raw/incidents.json`. Web: https://developers.procore.com/reference/rest/incidents?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/incidents

**List Incidents**
Returns a paginated list of incidents for the specified project, ordered by descending number by default. Each incident includes summary information, associated records count, and linked resources (location, contributing factors, assignees). Supports filtering by date, location, status, root cause fields, recordable flag, and full-text search across title, creator, witness statements, actions, and related fields. Use filters[query] for keyword search.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Number of items returned per page (Min: 1, Max: 1000). Defaults to 1000 when parameter is not provided.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[event_date]` [query] string(date) - Returns item(s) with an event date within the specified ISO 8601 datetime range.
- `filters[location_id]` [query] array of integer - Return item(s) with the specified Location IDs.
- `filters[status]` [query] array of string - Returns item(s) matching the specified status value.
- `filters[contributing_behavior_id]` [query] array of integer - Contributing Behavior ID. Returns item(s) with the specified Contributing Behavior ID.
- `filters[contributing_condition_id]` [query] array of integer - Contributing Condition ID. Returns item(s) with the specified Contributing Condition ID.
- `filters[hazard_id]` [query] array of integer - Hazard ID. Returns item(s) with the specified Hazard ID.
- `filters[time_unknown]` [query] boolean - If true, returns item(s) where the time of Incident occurrence is unknown.
- `filters[recordable]` [query] boolean - Return item(s) that are recordable.
- `filters[has_root_cause_analysis]` [query] boolean - If true, returns only Incidents that have a Root Cause Analysis. If false, returns only Incidents that do not have one. Omit the parameter to return both.
- `filters[custom_status_id]` [query] array of integer - Return item(s) with the specified Custom Status IDs
- `filters[type_id]` [query] array of integer - Return item(s) with a specific Type ID or a range of Type IDs.
- `filters[assignee_id]` [query] array of integer - Return item(s) with a specific Assignee ID or a range of Assignee IDs.
- `filters[query]` [query] string - Full-text search across incident title, creator name, witness statements, action descriptions, action types, contributing behaviors, contributing conditions, hazards, and location names. Returns incidents where any of...
- `sort` [query] string enum[contributing_behavior, contributing_condition, created_at, event_date, hazard, number, recordable, records_count, title]

Response 200 (application/json): array of object

- `id`: integer e.g. `1`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `description`: string - Description of the Incident e.g. `Can of gasoline tipped over near drying cement.`
- `event_date`: string(date-time) - Date of Incident occurrence e.g. `2016-10-25T17:53:35Z`
- `number`: integer - Number e.g. `109`
- `private`: boolean - Indicates whether an Incident is private e.g. `false`
- `recordable`: boolean - Indicates whether an Incident is recordable e.g. `false`
- `records_count`: integer - Number of Records associated to the Incident e.g. `1`
- `open_observations_count`: integer - Number of Open Observations associated to the Incident e.g. `1`
- `closed_observations_count`: integer - Number of Closed Observations associated to the Incident e.g. `1`
- `actions_count`: integer - Number of Actions associated to the Incident
- `witness_statements_count`: integer - Number of Witness Statements associated to the Incident
- `status`: string enum[open, closed] - Status e.g. `open`
- `time_unknown`: boolean - Indicates that the time of the Incident occurrence is unknown e.g. `false`
- `title`: string - Incident Title e.g. `HAZMAT Spill`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `contributing_behavior`: object
  - `id`: integer - Contributing Behavior ID e.g. `999`
  - `name`: string - Contributing Behavior Name e.g. `Distraction`
  - `active`: boolean - Represents whether a Contributing Behavior is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Contributing Behavior has been provided by Procore. e.g. `false`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `contributing_condition`: object
  - `id`: integer - Contributing Condition ID e.g. `9001`
  - `name`: string - Contributing Condition Name e.g. `Environment`
  - `active`: boolean - Represents whether a Contributing Condition is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Contributing Condition has been provided by Procore. e.g. `false`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2019-01-18T21:36:55Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2019-01-18T21:46:56Z`
- `hazard`: object
  - `id`: integer - Hazard ID e.g. `1738`
  - `name`: string - Hazard Name e.g. `Slip`
  - `active`: boolean - Represents whether a Hazard is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Hazard has been provided by Procore. e.g. `false`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `attachments_count`: integer - Number of Attachments attached to the Incident
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

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/incidents

**Create Incident**
Creates a new incident in the specified project. Requires at minimum a title and event_date. Optionally attach associated records (injuries, near_misses, environmentals, property_damages) in a single request. Pass run_configurable_validations=true to enforce any custom validation rules configured for the Incidents tool. The operation is idempotent via UUID-based deduplication.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - Whether or not Configurable validations from the Incident/Injury Configurable Field Set should be run (default: false). See (https://developers.procore.com/reference/configurable-field-sets#list-project-configurable-f...

Request body (application/json) (required):

- `incident`: object (required)
  - `description`: string - Description of the Incident e.g. `Can of gasoline tipped over near drying cement.`
  - `event_date`: string(date-time) - Iso8601 datetime of Incident occurrence. If time is unknown, send in the date at 0:00 project time converted to UTC. e.g. `2016-10-25T17:53:35Z`
  - `type_id`: integer - The ID of the Incident Type. Defaults to the company's General type if not provided. The type must be active. e.g. `1`
  - `custom_status_id`: integer - The ID of the Custom Status. Mutually exclusive with the status field — setting one sets the other. Not updatable if the Incident has a workflows instance. e.g. `5`
  - `assignee_ids`: array of integer - An array of Login Information IDs to assign to the Incident. Assignees gain visibility into the Incident and its related records. Not updatable if the Incident has a workflows instance. e.g. `[101, 202]`
  - `distribution_member_ids`: array of integer - An Array of the IDs of the Distribution Members (Not updatable if an incident has a workflows instance)
  - `private`: boolean - Indicates whether an Incident is private e.g. `false`
  - `recordable`: boolean - Indicates whether an Incident is recordable e.g. `false`
  - `status`: string enum[open, closed] - Status (Not updatable if an incident has a workflows instance) e.g. `open`
  - `time_unknown`: boolean - Indicates that the time of the Incident occurrence is unknown e.g. `false`
  - `title`: string - Incident Title e.g. `HAZMAT Spill`
  - `contributing_behavior_id`: integer - The ID of a Contributing Behavior
  - `contributing_condition_id`: integer - The ID of a Contributing Condition
  - `hazard_id`: integer - The ID of a Hazard
  - `location_id`: integer - The ID of a Location
  - `environmentals`: array of object - Associated Environmentals to create
    - `environmental_type_id`: integer - The ID of the Environmental Type
    - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
    - `estimated_cost_impact`: number(float) - Estimated cost impact of the record e.g. `20000`
    - `quantity_value`: number(float) - Numeric portion of the "quantity" field e.g. `1000`
    - `quantity_unit_of_measure`: string enum[hours, days, weeks, months, years, ea, ls, lf, sf, sy, cy, lbs, ...] - Unit of measure for the "quantity" field e.g. `Lbs`
    - `affected_company_id`: integer - The ID of the Affected Company
    - `managed_equipment_id`: integer - The ID of the Managed Equipment
    - `work_activity_id`: integer - The ID of the Work Activity
    - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `injuries`: array of object - Associated Injuries to create
    - `date_of_death`: string(date-time) - Date of death e.g. `2016-10-25T17:53:35Z`
    - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
    - `filing_type`: string enum[fatality, first_aid, lost_time, medically_treated, refused_care, report_only, restricted_work] - Filing Type - The 'recordable' filing_type value is deprecated. When a filing type of 'recordable' is provided, the `recordable` attribute of the Injury will instead be set to 'true'. e.g. `first_aid`
    - `hospitalized_overnight`: boolean - Represents whether the injured person was hospitalized overnight e.g. `true`
    - `recordable`: boolean - Represents whether the Injury record is recordable e.g. `true`
    - `treated_in_er`: boolean - Represents whether the injured person was treated in the ER e.g. `true`
    - `treatment_facility_address`: string - The street address of the treatment facility e.g. `6309 Carpinteria Ave.`
    - `treatment_facility`: string - The name of the treatment facility e.g. `Procore Hospital`
    - `treatment_provider`: string - The name of the treatment provider e.g. `Dr. Doctor`
    - `work_days_absent`: integer - The number of days absent from work e.g. `1`
    - `work_days_restricted`: integer - The number of days on restricted work e.g. `3`
    - `work_days_transferred`: integer - The number of days transferred e.g. `4`
    - `affliction_type_id`: integer - The ID of the Affliction Type. This cannot be cleared if there is an affected_body_part.
    - `body_diagram_type`: string enum[feminine, masculine] e.g. `feminine`
    - `affected_body_parts`: array of string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - DEPRECATED - Use body_part_ids instead. The body parts affected by the affliction. This requires an affliction_type to be set.
    - `affected_person_id`: integer - The ID of the Affected Person. This only supports full Users from the Users endpoints.
    - `affected_party_id`: integer - The ID of the Affected Person. This supports full and reference Users from the People endpoints.
    - `body_part_ids`: array of integer - The IDs of body parts affected by the affliction. This requires an affliction_type to be set.
    - `harm_source_id`: integer - The ID of the Harm Source
    - `affected_company_id`: integer - The ID of the Affected Company
    - `managed_equipment_id`: integer - The ID of the Managed Equipment
    - `work_activity_id`: integer - The ID of the Work Activity
    - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `near_misses`: array of object - Associated Near Misses to create
    - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
    - `affected_person_id`: integer - The ID of the Affected Person. This only supports full Users from the Users endpoints.
    - `affected_party_id`: integer - The ID of the Affected Person. This supports full and reference Users from the People endpoints.
    - `harm_source_id`: integer - The ID of the Harm Source
    - `affected_company_id`: integer - The ID of the Affected Company
    - `managed_equipment_id`: integer - The ID of the Managed Equipment
    - `work_activity_id`: integer - The ID of the Work Activity
    - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `property_damages`: array of object - Associated Property Damages to create
    - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
    - `estimated_cost_impact`: number(float) - Estimated cost impact of the record e.g. `20000`
    - `affected_company_id`: integer - The ID of the Affected Company
    - `responsible_company_id`: integer - The ID of the Responsible Company
    - `managed_equipment_id`: integer - The ID of the Managed Equipment
    - `work_activity_id`: integer - The ID of the Work Activity
    - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `witness_statements_attributes`: array of object - Associated Witness Statement to create
    - `statement`: string - The account of the event by the witness in rich text form. e.g. `<p>I witnessed what happened.</p>`
    - `date_received`: string(date) - Date that the Witness Statement was received. This assumes the dates provided are in the project timezone. e.g. `2016-10-25`
    - `witness_id`: integer - Witness ID e.g. `1`
    - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `upload_uuids`: array of string - Array of uploaded file UUIDs.
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`

Response 201 (application/json): object

- `id`: integer e.g. `1`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `description`: string - Description of the Incident e.g. `Can of gasoline tipped over near drying cement.`
- `event_date`: string(date-time) - Date of Incident occurrence e.g. `2016-10-25T17:53:35Z`
- `number`: integer - Number e.g. `109`
- `private`: boolean - Indicates whether an Incident is private e.g. `false`
- `recordable`: boolean - Indicates whether an Incident is recordable e.g. `false`
- `records_count`: integer - Number of Records associated to the Incident e.g. `1`
- `open_observations_count`: integer - Number of Open Observations associated to the Incident e.g. `1`
- `closed_observations_count`: integer - Number of Closed Observations associated to the Incident e.g. `1`
- `actions_count`: integer - Number of Actions associated to the Incident
- `witness_statements_count`: integer - Number of Witness Statements associated to the Incident
- `status`: string enum[open, closed] - Status e.g. `open`
- `time_unknown`: boolean - Indicates that the time of the Incident occurrence is unknown e.g. `false`
- `title`: string - Incident Title e.g. `HAZMAT Spill`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `contributing_behavior`: object
  - `id`: integer - Contributing Behavior ID e.g. `999`
  - `name`: string - Contributing Behavior Name e.g. `Distraction`
  - `active`: boolean - Represents whether a Contributing Behavior is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Contributing Behavior has been provided by Procore. e.g. `false`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `contributing_condition`: object
  - `id`: integer - Contributing Condition ID e.g. `9001`
  - `name`: string - Contributing Condition Name e.g. `Environment`
  - `active`: boolean - Represents whether a Contributing Condition is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Contributing Condition has been provided by Procore. e.g. `false`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2019-01-18T21:36:55Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2019-01-18T21:46:56Z`
- `hazard`: object
  - `id`: integer - Hazard ID e.g. `1738`
  - `name`: string - Hazard Name e.g. `Slip`
  - `active`: boolean - Represents whether a Hazard is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Hazard has been provided by Procore. e.g. `false`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `attachments_count`: integer - Number of Attachments attached to the Incident
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
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable`: boolean e.g. `true`
  - `can_be_viewed`: boolean e.g. `true`
- `type`: object - The Incident Type.
  - `id`: integer - Type ID e.g. `1`
  - `name`: string - Type name e.g. `General`
  - `global_type`: string - Translation key for default types, null for custom types e.g. `GENERAL`
  - `default`: boolean - Whether this is a default type e.g. `true`
  - `active`: boolean - Whether this type is active e.g. `true`
- `custom_status`: object - The Custom Status.
  - `id`: integer - Custom Status ID e.g. `5`
  - `name`: string - Custom Status name e.g. `Under Review`
  - `default`: boolean - Whether this is a default status e.g. `false`
  - `global_status`: object
    - `id`: integer - Global Status ID e.g. `2`
    - `name`: string - Global Status name e.g. `Open`
- `assignees`: array of object - Users assigned to the Incident. Assignees gain visibility into the Incident and its related records.
  - `id`: integer - Login Information ID e.g. `101`
  - `name`: string - Name e.g. `Jane Smith`
- `distribution_members`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `environmentals`: array of object - Environmentals
  - `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `environmental`
  - `environmental_type`: object
    - `id`: integer - Environmental Type ID e.g. `999`
    - `name`: string - Environmental Type Name e.g. `Air Quality`
    - `active`: boolean - Represents whether a Environmental Type is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Environmental Type has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `estimated_cost_impact`: string - Estimated cost impact of the record e.g. `20000.00`
  - `quantity_value`: string - Numeric portion of the "quantity" field e.g. `1000.0`
  - `quantity_unit_of_measure`: string enum[hours, days, weeks, months, years, ea, ls, lf, sf, sy, cy, lbs, ...] - Unit of measure for the "quantity" field e.g. `lbs`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
  - `id`: integer - Incident Record ID e.g. `9`
  - `number`: integer - The number of the Record e.g. `4`
  - `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
  - `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
  - `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
  - `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
  - `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
  - `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
  - `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `affected_company`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `managed_equipment`: object
    - `id`: integer - Equipment ID e.g. `15504`
    - `name`: string - Equipment name e.g. `Jackhammer`
  - `incident_created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `work_activity`: object
    - `id`: integer - Work Activity ID e.g. `999`
    - `name`: string - Work Activity Name e.g. `Earthwork`
    - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
- `injuries`: array of object - Injuries
  - `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `injury`
  - `date_returned_to_work`: string(date) - Date returned to work e.g. `2018-10-31`
  - `affected_party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `affected_person`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `harm_source`: object
    - `id`: integer - Harm Source ID e.g. `999`
    - `name`: string - Harm Source Name e.g. `Material`
    - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `date_of_death`: string(date) - Date of death e.g. `2018-11-10`
  - `filing_type`: string enum[fatality, first_aid, lost_time, medically_treated, refused_care, report_only, restricted_work] - Filing Type e.g. `first_aid`
  - `hospitalized_overnight`: boolean - Represents whether the injured person was hospitalized overnight e.g. `true`
  - `treated_in_er`: boolean - Represents whether the injured person was treated in the ER e.g. `true`
  - `treatment_facility_address`: string - The street address of the treatment facility e.g. `6309 Carpinteria Ave.`
  - `treatment_facility`: string - The name of the treatment facility e.g. `Procore Hospital`
  - `treatment_provider`: string - The name of the treatment provider e.g. `Dr. Doctor`
  - `work_days_absent`: integer - The number of days absent from work e.g. `1`
  - `work_days_restricted`: integer - The number of days on restricted work e.g. `3`
  - `work_days_transferred`: integer - The number of days transferred e.g. `4`
  - `body_diagram_type`: string enum[feminine, masculine] - Body Type displayed in Body Diagram e.g. `feminine`
  - `affliction_type`: object
    - `id`: integer - Affliction Type ID e.g. `999`
    - `name`: string - Affliction Type Name e.g. `Sprain`
    - `active`: boolean - Represents whether a Affliction Type is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Affliction Type has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - DEPRECATED. The body part affected by the affliction e.g. `ankle`
  - `affected_body_parts`: array of string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - Array of body parts affected by the affliction
  - `afflictions`: array of object - DEPRECATED. Array of afflictions affecting the injured person. Currently this is limited to one.
    - `id`: integer - Affliction ID e.g. `999`
    - `affliction_type`: object
    - `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - The body part affected by the affliction e.g. `ankle`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
  - `body_parts`: array of object - Body parts affected by the injury
    - `id`: integer - Body Part ID e.g. `999`
    - `name`: string - Body Part Name e.g. `finger_index_right`
    - `selectable`: boolean - Represents whether a Body Part can be associated to an injury. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
    - `parent_id`: integer - Parent Body Part ID e.g. `999`
  - `id`: integer - Incident Record ID e.g. `9`
  - `number`: integer - The number of the Record e.g. `4`
  - `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
  - `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
  - `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
  - `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
  - `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
  - `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
  - `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `affected_company`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `managed_equipment`: object
    - `id`: integer - Equipment ID e.g. `15504`
    - `name`: string - Equipment name e.g. `Jackhammer`
  - `incident_created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `work_activity`: object
    - `id`: integer - Work Activity ID e.g. `999`
    - `name`: string - Work Activity Name e.g. `Earthwork`
    - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
- `near_misses`: array of object - NearMisses
  - `id`: integer - Incident Record ID e.g. `9`
  - `number`: integer - The number of the Record e.g. `4`
  - `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
  - `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
  - `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
  - `type`: string - The type of incident record (environmental, injury, near_miss, property_damage) e.g. `injury`
  - `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
  - `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
  - `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
  - `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `affected_company`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `managed_equipment`: object
    - `id`: integer - Equipment ID e.g. `15504`
    - `name`: string - Equipment name e.g. `Jackhammer`
  - `incident_created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `work_activity`: object
    - `id`: integer - Work Activity ID e.g. `999`
    - `name`: string - Work Activity Name e.g. `Earthwork`
    - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
  - `affected_party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `affected_person`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `harm_source`: object
    - `id`: integer - Harm Source ID e.g. `999`
    - `name`: string - Harm Source Name e.g. `Material`
    - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `property_damages`: array of object - PropertyDamages
  - `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `property_damage`
  - `estimated_cost_impact`: string - Estimated cost impact of the record e.g. `20000.00`
  - `responsible_company`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
  - `id`: integer - Incident Record ID e.g. `9`
  - `number`: integer - The number of the Record e.g. `4`
  - `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
  - `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
  - `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
  - `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
  - `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
  - `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `affected_company`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `managed_equipment`: object
    - `id`: integer - Equipment ID e.g. `15504`
    - `name`: string - Equipment name e.g. `Jackhammer`
  - `incident_created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `work_activity`: object
    - `id`: integer - Work Activity ID e.g. `999`
    - `name`: string - Work Activity Name e.g. `Earthwork`
    - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
- `witness_statements`: array of object - WitnessStatements
  - `id`: integer - Witness Statement ID e.g. `99`
  - `incident_id`: integer - Incident ID e.g. `42`
  - `attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `name`: string - Filename e.g. `january_receipt_copy.jpg`
    - `content_type`: string e.g. `application/pdf`
    - `viewable`: boolean e.g. `true`
    - `can_be_viewed`: boolean e.g. `true`
  - `statement`: string - The account of the event by the witness in rich text form. e.g. `<p>I witnessed what happened.</p>`
  - `statement_plain_text`: string - The account of the event by the witness in plain text form. e.g. `I witnessed what happened.`
  - `date_received`: string(date) - Date that the Witness Statement was received. e.g. `2016-10-25`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `witness`: object
    - `id`: integer e.g. `1`
    - `name`: string e.g. `John Doe`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `actions`: array of object - Actions
  - `id`: integer - Action ID e.g. `99`
  - `incident_id`: integer - Incident ID e.g. `42`
  - `action_type`: object
    - `id`: integer - Incident Action Type ID e.g. `999`
    - `name`: string - Incident Action Type Name e.g. `Corrective`
    - `active`: boolean - Represents whether an Incident Action Type is available for use. e.g. `true`
    - `global`: boolean - Represents whether an Incident Action Type has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `name`: string - Filename e.g. `january_receipt_copy.jpg`
    - `content_type`: string e.g. `application/pdf`
    - `viewable`: boolean e.g. `true`
    - `can_be_viewed`: boolean e.g. `true`
  - `description`: string - The account of the action in rich text form. e.g. `<p>I took action.</p>`
  - `description_plain_text`: string - The account of the action plain text form. e.g. `I took action`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `observation_id`: integer - Observation ID e.g. `99`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/{id}

**Show Incident**
Returns the specified incident with full details including nested arrays of associated records (injuries, near_misses, environmentals, property_damages), witness statements, actions, attachments, and distribution members. The response structure varies by record type and includes custom fields configured for each record type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Unique identifier of the incident. Use the `id` from the List or Create Incidents response.

Response 200 (application/json): object

- `id`: integer e.g. `1`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `description`: string - Description of the Incident e.g. `Can of gasoline tipped over near drying cement.`
- `event_date`: string(date-time) - Date of Incident occurrence e.g. `2016-10-25T17:53:35Z`
- `number`: integer - Number e.g. `109`
- `private`: boolean - Indicates whether an Incident is private e.g. `false`
- `recordable`: boolean - Indicates whether an Incident is recordable e.g. `false`
- `records_count`: integer - Number of Records associated to the Incident e.g. `1`
- `open_observations_count`: integer - Number of Open Observations associated to the Incident e.g. `1`
- `closed_observations_count`: integer - Number of Closed Observations associated to the Incident e.g. `1`
- `actions_count`: integer - Number of Actions associated to the Incident
- `witness_statements_count`: integer - Number of Witness Statements associated to the Incident
- `status`: string enum[open, closed] - Status e.g. `open`
- `time_unknown`: boolean - Indicates that the time of the Incident occurrence is unknown e.g. `false`
- `title`: string - Incident Title e.g. `HAZMAT Spill`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `contributing_behavior`: object
  - `id`: integer - Contributing Behavior ID e.g. `999`
  - `name`: string - Contributing Behavior Name e.g. `Distraction`
  - `active`: boolean - Represents whether a Contributing Behavior is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Contributing Behavior has been provided by Procore. e.g. `false`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `contributing_condition`: object
  - `id`: integer - Contributing Condition ID e.g. `9001`
  - `name`: string - Contributing Condition Name e.g. `Environment`
  - `active`: boolean - Represents whether a Contributing Condition is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Contributing Condition has been provided by Procore. e.g. `false`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2019-01-18T21:36:55Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2019-01-18T21:46:56Z`
- `hazard`: object
  - `id`: integer - Hazard ID e.g. `1738`
  - `name`: string - Hazard Name e.g. `Slip`
  - `active`: boolean - Represents whether a Hazard is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Hazard has been provided by Procore. e.g. `false`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `attachments_count`: integer - Number of Attachments attached to the Incident
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
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable`: boolean e.g. `true`
  - `can_be_viewed`: boolean e.g. `true`
- `type`: object - The Incident Type.
  - `id`: integer - Type ID e.g. `1`
  - `name`: string - Type name e.g. `General`
  - `global_type`: string - Translation key for default types, null for custom types e.g. `GENERAL`
  - `default`: boolean - Whether this is a default type e.g. `true`
  - `active`: boolean - Whether this type is active e.g. `true`
- `custom_status`: object - The Custom Status.
  - `id`: integer - Custom Status ID e.g. `5`
  - `name`: string - Custom Status name e.g. `Under Review`
  - `default`: boolean - Whether this is a default status e.g. `false`
  - `global_status`: object
    - `id`: integer - Global Status ID e.g. `2`
    - `name`: string - Global Status name e.g. `Open`
- `assignees`: array of object - Users assigned to the Incident. Assignees gain visibility into the Incident and its related records.
  - `id`: integer - Login Information ID e.g. `101`
  - `name`: string - Name e.g. `Jane Smith`
- `distribution_members`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `environmentals`: array of object - Environmentals
  - `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `environmental`
  - `environmental_type`: object
    - `id`: integer - Environmental Type ID e.g. `999`
    - `name`: string - Environmental Type Name e.g. `Air Quality`
    - `active`: boolean - Represents whether a Environmental Type is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Environmental Type has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `estimated_cost_impact`: string - Estimated cost impact of the record e.g. `20000.00`
  - `quantity_value`: string - Numeric portion of the "quantity" field e.g. `1000.0`
  - `quantity_unit_of_measure`: string enum[hours, days, weeks, months, years, ea, ls, lf, sf, sy, cy, lbs, ...] - Unit of measure for the "quantity" field e.g. `lbs`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
  - `id`: integer - Incident Record ID e.g. `9`
  - `number`: integer - The number of the Record e.g. `4`
  - `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
  - `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
  - `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
  - `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
  - `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
  - `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
  - `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `affected_company`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `managed_equipment`: object
    - `id`: integer - Equipment ID e.g. `15504`
    - `name`: string - Equipment name e.g. `Jackhammer`
  - `incident_created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `work_activity`: object
    - `id`: integer - Work Activity ID e.g. `999`
    - `name`: string - Work Activity Name e.g. `Earthwork`
    - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
- `injuries`: array of object - Injuries
  - `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `injury`
  - `date_returned_to_work`: string(date) - Date returned to work e.g. `2018-10-31`
  - `affected_party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `affected_person`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `harm_source`: object
    - `id`: integer - Harm Source ID e.g. `999`
    - `name`: string - Harm Source Name e.g. `Material`
    - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `date_of_death`: string(date) - Date of death e.g. `2018-11-10`
  - `filing_type`: string enum[fatality, first_aid, lost_time, medically_treated, refused_care, report_only, restricted_work] - Filing Type e.g. `first_aid`
  - `hospitalized_overnight`: boolean - Represents whether the injured person was hospitalized overnight e.g. `true`
  - `treated_in_er`: boolean - Represents whether the injured person was treated in the ER e.g. `true`
  - `treatment_facility_address`: string - The street address of the treatment facility e.g. `6309 Carpinteria Ave.`
  - `treatment_facility`: string - The name of the treatment facility e.g. `Procore Hospital`
  - `treatment_provider`: string - The name of the treatment provider e.g. `Dr. Doctor`
  - `work_days_absent`: integer - The number of days absent from work e.g. `1`
  - `work_days_restricted`: integer - The number of days on restricted work e.g. `3`
  - `work_days_transferred`: integer - The number of days transferred e.g. `4`
  - `body_diagram_type`: string enum[feminine, masculine] - Body Type displayed in Body Diagram e.g. `feminine`
  - `affliction_type`: object
    - `id`: integer - Affliction Type ID e.g. `999`
    - `name`: string - Affliction Type Name e.g. `Sprain`
    - `active`: boolean - Represents whether a Affliction Type is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Affliction Type has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - DEPRECATED. The body part affected by the affliction e.g. `ankle`
  - `affected_body_parts`: array of string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - Array of body parts affected by the affliction
  - `afflictions`: array of object - DEPRECATED. Array of afflictions affecting the injured person. Currently this is limited to one.
    - `id`: integer - Affliction ID e.g. `999`
    - `affliction_type`: object
    - `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - The body part affected by the affliction e.g. `ankle`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
  - `body_parts`: array of object - Body parts affected by the injury
    - `id`: integer - Body Part ID e.g. `999`
    - `name`: string - Body Part Name e.g. `finger_index_right`
    - `selectable`: boolean - Represents whether a Body Part can be associated to an injury. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
    - `parent_id`: integer - Parent Body Part ID e.g. `999`
  - `id`: integer - Incident Record ID e.g. `9`
  - `number`: integer - The number of the Record e.g. `4`
  - `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
  - `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
  - `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
  - `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
  - `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
  - `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
  - `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `affected_company`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `managed_equipment`: object
    - `id`: integer - Equipment ID e.g. `15504`
    - `name`: string - Equipment name e.g. `Jackhammer`
  - `incident_created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `work_activity`: object
    - `id`: integer - Work Activity ID e.g. `999`
    - `name`: string - Work Activity Name e.g. `Earthwork`
    - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
- `near_misses`: array of object - NearMisses
  - `id`: integer - Incident Record ID e.g. `9`
  - `number`: integer - The number of the Record e.g. `4`
  - `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
  - `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
  - `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
  - `type`: string - The type of incident record (environmental, injury, near_miss, property_damage) e.g. `injury`
  - `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
  - `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
  - `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
  - `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `affected_company`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `managed_equipment`: object
    - `id`: integer - Equipment ID e.g. `15504`
    - `name`: string - Equipment name e.g. `Jackhammer`
  - `incident_created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `work_activity`: object
    - `id`: integer - Work Activity ID e.g. `999`
    - `name`: string - Work Activity Name e.g. `Earthwork`
    - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
  - `affected_party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `affected_person`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `harm_source`: object
    - `id`: integer - Harm Source ID e.g. `999`
    - `name`: string - Harm Source Name e.g. `Material`
    - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `property_damages`: array of object - PropertyDamages
  - `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `property_damage`
  - `estimated_cost_impact`: string - Estimated cost impact of the record e.g. `20000.00`
  - `responsible_company`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
  - `id`: integer - Incident Record ID e.g. `9`
  - `number`: integer - The number of the Record e.g. `4`
  - `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
  - `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
  - `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
  - `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
  - `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
  - `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `affected_company`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `managed_equipment`: object
    - `id`: integer - Equipment ID e.g. `15504`
    - `name`: string - Equipment name e.g. `Jackhammer`
  - `incident_created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `work_activity`: object
    - `id`: integer - Work Activity ID e.g. `999`
    - `name`: string - Work Activity Name e.g. `Earthwork`
    - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
- `witness_statements`: array of object - WitnessStatements
  - `id`: integer - Witness Statement ID e.g. `99`
  - `incident_id`: integer - Incident ID e.g. `42`
  - `attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `name`: string - Filename e.g. `january_receipt_copy.jpg`
    - `content_type`: string e.g. `application/pdf`
    - `viewable`: boolean e.g. `true`
    - `can_be_viewed`: boolean e.g. `true`
  - `statement`: string - The account of the event by the witness in rich text form. e.g. `<p>I witnessed what happened.</p>`
  - `statement_plain_text`: string - The account of the event by the witness in plain text form. e.g. `I witnessed what happened.`
  - `date_received`: string(date) - Date that the Witness Statement was received. e.g. `2016-10-25`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `witness`: object
    - `id`: integer e.g. `1`
    - `name`: string e.g. `John Doe`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `actions`: array of object - Actions
  - `id`: integer - Action ID e.g. `99`
  - `incident_id`: integer - Incident ID e.g. `42`
  - `action_type`: object
    - `id`: integer - Incident Action Type ID e.g. `999`
    - `name`: string - Incident Action Type Name e.g. `Corrective`
    - `active`: boolean - Represents whether an Incident Action Type is available for use. e.g. `true`
    - `global`: boolean - Represents whether an Incident Action Type has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `name`: string - Filename e.g. `january_receipt_copy.jpg`
    - `content_type`: string e.g. `application/pdf`
    - `viewable`: boolean e.g. `true`
    - `can_be_viewed`: boolean e.g. `true`
  - `description`: string - The account of the action in rich text form. e.g. `<p>I took action.</p>`
  - `description_plain_text`: string - The account of the action plain text form. e.g. `I took action`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `observation_id`: integer - Observation ID e.g. `99`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/incidents/{id}

**Update Incident**
Updates the specified incident's attributes. Cannot update status, assignees, or distribution_members if the incident has an active workflow instance. To update nested records (injuries, witness statements, etc.), use their dedicated endpoints. Pass run_configurable_validations=true to enforce custom validation rules.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Unique identifier of the incident. Use the `id` from the List or Create Incidents response.
- `run_configurable_validations` [query] boolean - Whether or not Configurable validations from the Incident/Injury Configurable Field Set should be run (default: false). See (https://developers.procore.com/reference/configurable-field-sets#list-project-configurable-f...

Request body (application/json) (required):

- `incident`: object (required)
  - `description`: string - Description of the Incident e.g. `Can of gasoline tipped over near drying cement.`
  - `event_date`: string(date-time) - Iso8601 datetime of Incident occurrence. If time is unknown, send in the date at 0:00 project time converted to UTC. e.g. `2016-10-25T17:53:35Z`
  - `type_id`: integer - The ID of the Incident Type. Defaults to the company's General type if not provided. The type must be active. e.g. `1`
  - `custom_status_id`: integer - The ID of the Custom Status. Mutually exclusive with the status field — setting one sets the other. Not updatable if the Incident has a workflows instance. e.g. `5`
  - `assignee_ids`: array of integer - An array of Login Information IDs to assign to the Incident. Assignees gain visibility into the Incident and its related records. Not updatable if the Incident has a workflows instance. e.g. `[101, 202]`
  - `distribution_member_ids`: array of integer - An Array of the IDs of the Distribution Members (Not updatable if an incident has a workflows instance)
  - `private`: boolean - Indicates whether an Incident is private e.g. `false`
  - `recordable`: boolean - Indicates whether an Incident is recordable e.g. `false`
  - `status`: string enum[open, closed] - Status (Not updatable if an incident has a workflows instance) e.g. `open`
  - `time_unknown`: boolean - Indicates that the time of the Incident occurrence is unknown e.g. `false`
  - `title`: string - Incident Title e.g. `HAZMAT Spill`
  - `contributing_behavior_id`: integer - The ID of a Contributing Behavior
  - `contributing_condition_id`: integer - The ID of a Contributing Condition
  - `hazard_id`: integer - The ID of a Hazard
  - `location_id`: integer - The ID of a Location
  - `environmentals`: array of object - Associated Environmentals to create
    - `environmental_type_id`: integer - The ID of the Environmental Type
    - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
    - `estimated_cost_impact`: number(float) - Estimated cost impact of the record e.g. `20000`
    - `quantity_value`: number(float) - Numeric portion of the "quantity" field e.g. `1000`
    - `quantity_unit_of_measure`: string enum[hours, days, weeks, months, years, ea, ls, lf, sf, sy, cy, lbs, ...] - Unit of measure for the "quantity" field e.g. `Lbs`
    - `affected_company_id`: integer - The ID of the Affected Company
    - `managed_equipment_id`: integer - The ID of the Managed Equipment
    - `work_activity_id`: integer - The ID of the Work Activity
    - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `injuries`: array of object - Associated Injuries to create
    - `date_of_death`: string(date-time) - Date of death e.g. `2016-10-25T17:53:35Z`
    - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
    - `filing_type`: string enum[fatality, first_aid, lost_time, medically_treated, refused_care, report_only, restricted_work] - Filing Type - The 'recordable' filing_type value is deprecated. When a filing type of 'recordable' is provided, the `recordable` attribute of the Injury will instead be set to 'true'. e.g. `first_aid`
    - `hospitalized_overnight`: boolean - Represents whether the injured person was hospitalized overnight e.g. `true`
    - `recordable`: boolean - Represents whether the Injury record is recordable e.g. `true`
    - `treated_in_er`: boolean - Represents whether the injured person was treated in the ER e.g. `true`
    - `treatment_facility_address`: string - The street address of the treatment facility e.g. `6309 Carpinteria Ave.`
    - `treatment_facility`: string - The name of the treatment facility e.g. `Procore Hospital`
    - `treatment_provider`: string - The name of the treatment provider e.g. `Dr. Doctor`
    - `work_days_absent`: integer - The number of days absent from work e.g. `1`
    - `work_days_restricted`: integer - The number of days on restricted work e.g. `3`
    - `work_days_transferred`: integer - The number of days transferred e.g. `4`
    - `affliction_type_id`: integer - The ID of the Affliction Type. This cannot be cleared if there is an affected_body_part.
    - `body_diagram_type`: string enum[feminine, masculine] e.g. `feminine`
    - `affected_body_parts`: array of string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - DEPRECATED - Use body_part_ids instead. The body parts affected by the affliction. This requires an affliction_type to be set.
    - `affected_person_id`: integer - The ID of the Affected Person. This only supports full Users from the Users endpoints.
    - `affected_party_id`: integer - The ID of the Affected Person. This supports full and reference Users from the People endpoints.
    - `body_part_ids`: array of integer - The IDs of body parts affected by the affliction. This requires an affliction_type to be set.
    - `harm_source_id`: integer - The ID of the Harm Source
    - `affected_company_id`: integer - The ID of the Affected Company
    - `managed_equipment_id`: integer - The ID of the Managed Equipment
    - `work_activity_id`: integer - The ID of the Work Activity
    - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `near_misses`: array of object - Associated Near Misses to create
    - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
    - `affected_person_id`: integer - The ID of the Affected Person. This only supports full Users from the Users endpoints.
    - `affected_party_id`: integer - The ID of the Affected Person. This supports full and reference Users from the People endpoints.
    - `harm_source_id`: integer - The ID of the Harm Source
    - `affected_company_id`: integer - The ID of the Affected Company
    - `managed_equipment_id`: integer - The ID of the Managed Equipment
    - `work_activity_id`: integer - The ID of the Work Activity
    - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `property_damages`: array of object - Associated Property Damages to create
    - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
    - `estimated_cost_impact`: number(float) - Estimated cost impact of the record e.g. `20000`
    - `affected_company_id`: integer - The ID of the Affected Company
    - `responsible_company_id`: integer - The ID of the Responsible Company
    - `managed_equipment_id`: integer - The ID of the Managed Equipment
    - `work_activity_id`: integer - The ID of the Work Activity
    - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `witness_statements_attributes`: array of object - Associated Witness Statement to create
    - `statement`: string - The account of the event by the witness in rich text form. e.g. `<p>I witnessed what happened.</p>`
    - `date_received`: string(date) - Date that the Witness Statement was received. This assumes the dates provided are in the project timezone. e.g. `2016-10-25`
    - `witness_id`: integer - Witness ID e.g. `1`
    - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `upload_uuids`: array of string - Array of uploaded file UUIDs.
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`

Response 200 (application/json): object

- `id`: integer e.g. `1`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `description`: string - Description of the Incident e.g. `Can of gasoline tipped over near drying cement.`
- `event_date`: string(date-time) - Date of Incident occurrence e.g. `2016-10-25T17:53:35Z`
- `number`: integer - Number e.g. `109`
- `private`: boolean - Indicates whether an Incident is private e.g. `false`
- `recordable`: boolean - Indicates whether an Incident is recordable e.g. `false`
- `records_count`: integer - Number of Records associated to the Incident e.g. `1`
- `open_observations_count`: integer - Number of Open Observations associated to the Incident e.g. `1`
- `closed_observations_count`: integer - Number of Closed Observations associated to the Incident e.g. `1`
- `actions_count`: integer - Number of Actions associated to the Incident
- `witness_statements_count`: integer - Number of Witness Statements associated to the Incident
- `status`: string enum[open, closed] - Status e.g. `open`
- `time_unknown`: boolean - Indicates that the time of the Incident occurrence is unknown e.g. `false`
- `title`: string - Incident Title e.g. `HAZMAT Spill`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `contributing_behavior`: object
  - `id`: integer - Contributing Behavior ID e.g. `999`
  - `name`: string - Contributing Behavior Name e.g. `Distraction`
  - `active`: boolean - Represents whether a Contributing Behavior is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Contributing Behavior has been provided by Procore. e.g. `false`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `contributing_condition`: object
  - `id`: integer - Contributing Condition ID e.g. `9001`
  - `name`: string - Contributing Condition Name e.g. `Environment`
  - `active`: boolean - Represents whether a Contributing Condition is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Contributing Condition has been provided by Procore. e.g. `false`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2019-01-18T21:36:55Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2019-01-18T21:46:56Z`
- `hazard`: object
  - `id`: integer - Hazard ID e.g. `1738`
  - `name`: string - Hazard Name e.g. `Slip`
  - `active`: boolean - Represents whether a Hazard is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Hazard has been provided by Procore. e.g. `false`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `attachments_count`: integer - Number of Attachments attached to the Incident
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
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable`: boolean e.g. `true`
  - `can_be_viewed`: boolean e.g. `true`
- `type`: object - The Incident Type.
  - `id`: integer - Type ID e.g. `1`
  - `name`: string - Type name e.g. `General`
  - `global_type`: string - Translation key for default types, null for custom types e.g. `GENERAL`
  - `default`: boolean - Whether this is a default type e.g. `true`
  - `active`: boolean - Whether this type is active e.g. `true`
- `custom_status`: object - The Custom Status.
  - `id`: integer - Custom Status ID e.g. `5`
  - `name`: string - Custom Status name e.g. `Under Review`
  - `default`: boolean - Whether this is a default status e.g. `false`
  - `global_status`: object
    - `id`: integer - Global Status ID e.g. `2`
    - `name`: string - Global Status name e.g. `Open`
- `assignees`: array of object - Users assigned to the Incident. Assignees gain visibility into the Incident and its related records.
  - `id`: integer - Login Information ID e.g. `101`
  - `name`: string - Name e.g. `Jane Smith`
- `distribution_members`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `environmentals`: array of object - Environmentals
  - `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `environmental`
  - `environmental_type`: object
    - `id`: integer - Environmental Type ID e.g. `999`
    - `name`: string - Environmental Type Name e.g. `Air Quality`
    - `active`: boolean - Represents whether a Environmental Type is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Environmental Type has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `estimated_cost_impact`: string - Estimated cost impact of the record e.g. `20000.00`
  - `quantity_value`: string - Numeric portion of the "quantity" field e.g. `1000.0`
  - `quantity_unit_of_measure`: string enum[hours, days, weeks, months, years, ea, ls, lf, sf, sy, cy, lbs, ...] - Unit of measure for the "quantity" field e.g. `lbs`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
  - `id`: integer - Incident Record ID e.g. `9`
  - `number`: integer - The number of the Record e.g. `4`
  - `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
  - `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
  - `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
  - `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
  - `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
  - `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
  - `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `affected_company`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `managed_equipment`: object
    - `id`: integer - Equipment ID e.g. `15504`
    - `name`: string - Equipment name e.g. `Jackhammer`
  - `incident_created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `work_activity`: object
    - `id`: integer - Work Activity ID e.g. `999`
    - `name`: string - Work Activity Name e.g. `Earthwork`
    - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
- `injuries`: array of object - Injuries
  - `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `injury`
  - `date_returned_to_work`: string(date) - Date returned to work e.g. `2018-10-31`
  - `affected_party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `affected_person`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `harm_source`: object
    - `id`: integer - Harm Source ID e.g. `999`
    - `name`: string - Harm Source Name e.g. `Material`
    - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `date_of_death`: string(date) - Date of death e.g. `2018-11-10`
  - `filing_type`: string enum[fatality, first_aid, lost_time, medically_treated, refused_care, report_only, restricted_work] - Filing Type e.g. `first_aid`
  - `hospitalized_overnight`: boolean - Represents whether the injured person was hospitalized overnight e.g. `true`
  - `treated_in_er`: boolean - Represents whether the injured person was treated in the ER e.g. `true`
  - `treatment_facility_address`: string - The street address of the treatment facility e.g. `6309 Carpinteria Ave.`
  - `treatment_facility`: string - The name of the treatment facility e.g. `Procore Hospital`
  - `treatment_provider`: string - The name of the treatment provider e.g. `Dr. Doctor`
  - `work_days_absent`: integer - The number of days absent from work e.g. `1`
  - `work_days_restricted`: integer - The number of days on restricted work e.g. `3`
  - `work_days_transferred`: integer - The number of days transferred e.g. `4`
  - `body_diagram_type`: string enum[feminine, masculine] - Body Type displayed in Body Diagram e.g. `feminine`
  - `affliction_type`: object
    - `id`: integer - Affliction Type ID e.g. `999`
    - `name`: string - Affliction Type Name e.g. `Sprain`
    - `active`: boolean - Represents whether a Affliction Type is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Affliction Type has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - DEPRECATED. The body part affected by the affliction e.g. `ankle`
  - `affected_body_parts`: array of string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - Array of body parts affected by the affliction
  - `afflictions`: array of object - DEPRECATED. Array of afflictions affecting the injured person. Currently this is limited to one.
    - `id`: integer - Affliction ID e.g. `999`
    - `affliction_type`: object
    - `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - The body part affected by the affliction e.g. `ankle`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
  - `body_parts`: array of object - Body parts affected by the injury
    - `id`: integer - Body Part ID e.g. `999`
    - `name`: string - Body Part Name e.g. `finger_index_right`
    - `selectable`: boolean - Represents whether a Body Part can be associated to an injury. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
    - `parent_id`: integer - Parent Body Part ID e.g. `999`
  - `id`: integer - Incident Record ID e.g. `9`
  - `number`: integer - The number of the Record e.g. `4`
  - `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
  - `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
  - `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
  - `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
  - `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
  - `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
  - `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `affected_company`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `managed_equipment`: object
    - `id`: integer - Equipment ID e.g. `15504`
    - `name`: string - Equipment name e.g. `Jackhammer`
  - `incident_created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `work_activity`: object
    - `id`: integer - Work Activity ID e.g. `999`
    - `name`: string - Work Activity Name e.g. `Earthwork`
    - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
- `near_misses`: array of object - NearMisses
  - `id`: integer - Incident Record ID e.g. `9`
  - `number`: integer - The number of the Record e.g. `4`
  - `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
  - `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
  - `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
  - `type`: string - The type of incident record (environmental, injury, near_miss, property_damage) e.g. `injury`
  - `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
  - `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
  - `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
  - `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `affected_company`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `managed_equipment`: object
    - `id`: integer - Equipment ID e.g. `15504`
    - `name`: string - Equipment name e.g. `Jackhammer`
  - `incident_created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `work_activity`: object
    - `id`: integer - Work Activity ID e.g. `999`
    - `name`: string - Work Activity Name e.g. `Earthwork`
    - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
  - `affected_party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `affected_person`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `harm_source`: object
    - `id`: integer - Harm Source ID e.g. `999`
    - `name`: string - Harm Source Name e.g. `Material`
    - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `property_damages`: array of object - PropertyDamages
  - `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `property_damage`
  - `estimated_cost_impact`: string - Estimated cost impact of the record e.g. `20000.00`
  - `responsible_company`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
  - `id`: integer - Incident Record ID e.g. `9`
  - `number`: integer - The number of the Record e.g. `4`
  - `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
  - `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
  - `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
  - `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
  - `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
  - `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `affected_company`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `managed_equipment`: object
    - `id`: integer - Equipment ID e.g. `15504`
    - `name`: string - Equipment name e.g. `Jackhammer`
  - `incident_created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `work_activity`: object
    - `id`: integer - Work Activity ID e.g. `999`
    - `name`: string - Work Activity Name e.g. `Earthwork`
    - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
- `witness_statements`: array of object - WitnessStatements
  - `id`: integer - Witness Statement ID e.g. `99`
  - `incident_id`: integer - Incident ID e.g. `42`
  - `attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `name`: string - Filename e.g. `january_receipt_copy.jpg`
    - `content_type`: string e.g. `application/pdf`
    - `viewable`: boolean e.g. `true`
    - `can_be_viewed`: boolean e.g. `true`
  - `statement`: string - The account of the event by the witness in rich text form. e.g. `<p>I witnessed what happened.</p>`
  - `statement_plain_text`: string - The account of the event by the witness in plain text form. e.g. `I witnessed what happened.`
  - `date_received`: string(date) - Date that the Witness Statement was received. e.g. `2016-10-25`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `witness`: object
    - `id`: integer e.g. `1`
    - `name`: string e.g. `John Doe`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `actions`: array of object - Actions
  - `id`: integer - Action ID e.g. `99`
  - `incident_id`: integer - Incident ID e.g. `42`
  - `action_type`: object
    - `id`: integer - Incident Action Type ID e.g. `999`
    - `name`: string - Incident Action Type Name e.g. `Corrective`
    - `active`: boolean - Represents whether an Incident Action Type is available for use. e.g. `true`
    - `global`: boolean - Represents whether an Incident Action Type has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `name`: string - Filename e.g. `january_receipt_copy.jpg`
    - `content_type`: string e.g. `application/pdf`
    - `viewable`: boolean e.g. `true`
    - `can_be_viewed`: boolean e.g. `true`
  - `description`: string - The account of the action in rich text form. e.g. `<p>I took action.</p>`
  - `description_plain_text`: string - The account of the action plain text form. e.g. `I took action`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `observation_id`: integer - Observation ID e.g. `99`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/incidents/{id}

**Delete Incident**
Soft-deletes the specified incident, moving it to the recycle bin where it remains recoverable. The incident can be listed via the List Recycled Incidents endpoint and restored via the restore endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Unique identifier of the incident. Use the `id` from the List or Create Incidents response.

Response 204: No Content (no body)

Error responses: 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/incidents

**List Recycled Incidents**
Returns a paginated list of soft-deleted incidents in the project's recycle bin. Supports the same filtering and sorting options as the main incidents list. Recycled incidents can be restored via the restore endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[event_date]` [query] string(date) - Returns item(s) with an event date within the specified ISO 8601 datetime range.
- `filters[location_id]` [query] array of integer - Return item(s) with the specified Location IDs.
- `filters[status]` [query] array of string - Returns item(s) matching the specified status value.
- `filters[contributing_behavior_id]` [query] array of integer - Contributing Behavior ID. Returns item(s) with the specified Contributing Behavior ID.
- `filters[contributing_condition_id]` [query] array of integer - Contributing Condition ID. Returns item(s) with the specified Contributing Condition ID.
- `filters[hazard_id]` [query] array of integer - Hazard ID. Returns item(s) with the specified Hazard ID.
- `filters[time_unknown]` [query] boolean - If true, returns item(s) where the time of Incident occurrence is unknown.
- `filters[recordable]` [query] boolean - Return item(s) that are recordable.
- `filters[has_root_cause_analysis]` [query] boolean - If true, returns only Incidents that have a Root Cause Analysis. If false, returns only Incidents that do not have one. Omit the parameter to return both.
- `filters[query]` [query] string - Full-text search across incident title, creator name, witness statements, action descriptions, action types, contributing behaviors, contributing conditions, hazards, and location names. Returns incidents where any of...
- `sort` [query] string enum[contributing_behavior, contributing_condition, created_at, event_date, hazard, number, recordable, records_count, title]

Response 200 (application/json): array of object

- `id`: integer e.g. `1`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `description`: string - Description of the Incident e.g. `Can of gasoline tipped over near drying cement.`
- `event_date`: string(date-time) - Date of Incident occurrence e.g. `2016-10-25T17:53:35Z`
- `number`: integer - Number e.g. `109`
- `private`: boolean - Indicates whether an Incident is private e.g. `false`
- `recordable`: boolean - Indicates whether an Incident is recordable e.g. `false`
- `records_count`: integer - Number of Records associated to the Incident e.g. `1`
- `open_observations_count`: integer - Number of Open Observations associated to the Incident e.g. `1`
- `closed_observations_count`: integer - Number of Closed Observations associated to the Incident e.g. `1`
- `actions_count`: integer - Number of Actions associated to the Incident
- `witness_statements_count`: integer - Number of Witness Statements associated to the Incident
- `status`: string enum[open, closed] - Status e.g. `open`
- `time_unknown`: boolean - Indicates that the time of the Incident occurrence is unknown e.g. `false`
- `title`: string - Incident Title e.g. `HAZMAT Spill`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `contributing_behavior`: object
  - `id`: integer - Contributing Behavior ID e.g. `999`
  - `name`: string - Contributing Behavior Name e.g. `Distraction`
  - `active`: boolean - Represents whether a Contributing Behavior is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Contributing Behavior has been provided by Procore. e.g. `false`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `contributing_condition`: object
  - `id`: integer - Contributing Condition ID e.g. `9001`
  - `name`: string - Contributing Condition Name e.g. `Environment`
  - `active`: boolean - Represents whether a Contributing Condition is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Contributing Condition has been provided by Procore. e.g. `false`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2019-01-18T21:36:55Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2019-01-18T21:46:56Z`
- `hazard`: object
  - `id`: integer - Hazard ID e.g. `1738`
  - `name`: string - Hazard Name e.g. `Slip`
  - `active`: boolean - Represents whether a Hazard is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Hazard has been provided by Procore. e.g. `false`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `attachments_count`: integer - Number of Attachments attached to the Incident
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

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/incidents/{id}

**Show Recycled Incident**
Returns the specified recycled incident with full details including all associated records. The response structure is identical to the Show Incident endpoint but represents a soft-deleted incident.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Unique identifier of the incident. Use the `id` from the List or Create Incidents response.

Response 200 (application/json): object

- `id`: integer e.g. `1`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `description`: string - Description of the Incident e.g. `Can of gasoline tipped over near drying cement.`
- `event_date`: string(date-time) - Date of Incident occurrence e.g. `2016-10-25T17:53:35Z`
- `number`: integer - Number e.g. `109`
- `private`: boolean - Indicates whether an Incident is private e.g. `false`
- `recordable`: boolean - Indicates whether an Incident is recordable e.g. `false`
- `records_count`: integer - Number of Records associated to the Incident e.g. `1`
- `open_observations_count`: integer - Number of Open Observations associated to the Incident e.g. `1`
- `closed_observations_count`: integer - Number of Closed Observations associated to the Incident e.g. `1`
- `actions_count`: integer - Number of Actions associated to the Incident
- `witness_statements_count`: integer - Number of Witness Statements associated to the Incident
- `status`: string enum[open, closed] - Status e.g. `open`
- `time_unknown`: boolean - Indicates that the time of the Incident occurrence is unknown e.g. `false`
- `title`: string - Incident Title e.g. `HAZMAT Spill`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `contributing_behavior`: object
  - `id`: integer - Contributing Behavior ID e.g. `999`
  - `name`: string - Contributing Behavior Name e.g. `Distraction`
  - `active`: boolean - Represents whether a Contributing Behavior is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Contributing Behavior has been provided by Procore. e.g. `false`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `contributing_condition`: object
  - `id`: integer - Contributing Condition ID e.g. `9001`
  - `name`: string - Contributing Condition Name e.g. `Environment`
  - `active`: boolean - Represents whether a Contributing Condition is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Contributing Condition has been provided by Procore. e.g. `false`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2019-01-18T21:36:55Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2019-01-18T21:46:56Z`
- `hazard`: object
  - `id`: integer - Hazard ID e.g. `1738`
  - `name`: string - Hazard Name e.g. `Slip`
  - `active`: boolean - Represents whether a Hazard is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Hazard has been provided by Procore. e.g. `false`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `attachments_count`: integer - Number of Attachments attached to the Incident
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
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable`: boolean e.g. `true`
  - `can_be_viewed`: boolean e.g. `true`
- `type`: object - The Incident Type.
  - `id`: integer - Type ID e.g. `1`
  - `name`: string - Type name e.g. `General`
  - `global_type`: string - Translation key for default types, null for custom types e.g. `GENERAL`
  - `default`: boolean - Whether this is a default type e.g. `true`
  - `active`: boolean - Whether this type is active e.g. `true`
- `custom_status`: object - The Custom Status.
  - `id`: integer - Custom Status ID e.g. `5`
  - `name`: string - Custom Status name e.g. `Under Review`
  - `default`: boolean - Whether this is a default status e.g. `false`
  - `global_status`: object
    - `id`: integer - Global Status ID e.g. `2`
    - `name`: string - Global Status name e.g. `Open`
- `assignees`: array of object - Users assigned to the Incident. Assignees gain visibility into the Incident and its related records.
  - `id`: integer - Login Information ID e.g. `101`
  - `name`: string - Name e.g. `Jane Smith`
- `distribution_members`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `environmentals`: array of object - Environmentals
  - `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `environmental`
  - `environmental_type`: object
    - `id`: integer - Environmental Type ID e.g. `999`
    - `name`: string - Environmental Type Name e.g. `Air Quality`
    - `active`: boolean - Represents whether a Environmental Type is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Environmental Type has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `estimated_cost_impact`: string - Estimated cost impact of the record e.g. `20000.00`
  - `quantity_value`: string - Numeric portion of the "quantity" field e.g. `1000.0`
  - `quantity_unit_of_measure`: string enum[hours, days, weeks, months, years, ea, ls, lf, sf, sy, cy, lbs, ...] - Unit of measure for the "quantity" field e.g. `lbs`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
  - `id`: integer - Incident Record ID e.g. `9`
  - `number`: integer - The number of the Record e.g. `4`
  - `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
  - `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
  - `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
  - `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
  - `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
  - `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
  - `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `affected_company`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `managed_equipment`: object
    - `id`: integer - Equipment ID e.g. `15504`
    - `name`: string - Equipment name e.g. `Jackhammer`
  - `incident_created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `work_activity`: object
    - `id`: integer - Work Activity ID e.g. `999`
    - `name`: string - Work Activity Name e.g. `Earthwork`
    - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
- `injuries`: array of object - Injuries
  - `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `injury`
  - `date_returned_to_work`: string(date) - Date returned to work e.g. `2018-10-31`
  - `affected_party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `affected_person`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `harm_source`: object
    - `id`: integer - Harm Source ID e.g. `999`
    - `name`: string - Harm Source Name e.g. `Material`
    - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `date_of_death`: string(date) - Date of death e.g. `2018-11-10`
  - `filing_type`: string enum[fatality, first_aid, lost_time, medically_treated, refused_care, report_only, restricted_work] - Filing Type e.g. `first_aid`
  - `hospitalized_overnight`: boolean - Represents whether the injured person was hospitalized overnight e.g. `true`
  - `treated_in_er`: boolean - Represents whether the injured person was treated in the ER e.g. `true`
  - `treatment_facility_address`: string - The street address of the treatment facility e.g. `6309 Carpinteria Ave.`
  - `treatment_facility`: string - The name of the treatment facility e.g. `Procore Hospital`
  - `treatment_provider`: string - The name of the treatment provider e.g. `Dr. Doctor`
  - `work_days_absent`: integer - The number of days absent from work e.g. `1`
  - `work_days_restricted`: integer - The number of days on restricted work e.g. `3`
  - `work_days_transferred`: integer - The number of days transferred e.g. `4`
  - `body_diagram_type`: string enum[feminine, masculine] - Body Type displayed in Body Diagram e.g. `feminine`
  - `affliction_type`: object
    - `id`: integer - Affliction Type ID e.g. `999`
    - `name`: string - Affliction Type Name e.g. `Sprain`
    - `active`: boolean - Represents whether a Affliction Type is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Affliction Type has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - DEPRECATED. The body part affected by the affliction e.g. `ankle`
  - `affected_body_parts`: array of string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - Array of body parts affected by the affliction
  - `afflictions`: array of object - DEPRECATED. Array of afflictions affecting the injured person. Currently this is limited to one.
    - `id`: integer - Affliction ID e.g. `999`
    - `affliction_type`: object
    - `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - The body part affected by the affliction e.g. `ankle`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
  - `body_parts`: array of object - Body parts affected by the injury
    - `id`: integer - Body Part ID e.g. `999`
    - `name`: string - Body Part Name e.g. `finger_index_right`
    - `selectable`: boolean - Represents whether a Body Part can be associated to an injury. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
    - `parent_id`: integer - Parent Body Part ID e.g. `999`
  - `id`: integer - Incident Record ID e.g. `9`
  - `number`: integer - The number of the Record e.g. `4`
  - `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
  - `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
  - `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
  - `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
  - `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
  - `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
  - `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `affected_company`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `managed_equipment`: object
    - `id`: integer - Equipment ID e.g. `15504`
    - `name`: string - Equipment name e.g. `Jackhammer`
  - `incident_created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `work_activity`: object
    - `id`: integer - Work Activity ID e.g. `999`
    - `name`: string - Work Activity Name e.g. `Earthwork`
    - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
- `near_misses`: array of object - NearMisses
  - `id`: integer - Incident Record ID e.g. `9`
  - `number`: integer - The number of the Record e.g. `4`
  - `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
  - `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
  - `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
  - `type`: string - The type of incident record (environmental, injury, near_miss, property_damage) e.g. `injury`
  - `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
  - `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
  - `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
  - `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `affected_company`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `managed_equipment`: object
    - `id`: integer - Equipment ID e.g. `15504`
    - `name`: string - Equipment name e.g. `Jackhammer`
  - `incident_created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `work_activity`: object
    - `id`: integer - Work Activity ID e.g. `999`
    - `name`: string - Work Activity Name e.g. `Earthwork`
    - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
  - `affected_party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `affected_person`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `harm_source`: object
    - `id`: integer - Harm Source ID e.g. `999`
    - `name`: string - Harm Source Name e.g. `Material`
    - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `property_damages`: array of object - PropertyDamages
  - `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `property_damage`
  - `estimated_cost_impact`: string - Estimated cost impact of the record e.g. `20000.00`
  - `responsible_company`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
  - `id`: integer - Incident Record ID e.g. `9`
  - `number`: integer - The number of the Record e.g. `4`
  - `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
  - `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
  - `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
  - `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
  - `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
  - `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `affected_company`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `managed_equipment`: object
    - `id`: integer - Equipment ID e.g. `15504`
    - `name`: string - Equipment name e.g. `Jackhammer`
  - `incident_created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `work_activity`: object
    - `id`: integer - Work Activity ID e.g. `999`
    - `name`: string - Work Activity Name e.g. `Earthwork`
    - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
- `witness_statements`: array of object - WitnessStatements
  - `id`: integer - Witness Statement ID e.g. `99`
  - `incident_id`: integer - Incident ID e.g. `42`
  - `attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `name`: string - Filename e.g. `january_receipt_copy.jpg`
    - `content_type`: string e.g. `application/pdf`
    - `viewable`: boolean e.g. `true`
    - `can_be_viewed`: boolean e.g. `true`
  - `statement`: string - The account of the event by the witness in rich text form. e.g. `<p>I witnessed what happened.</p>`
  - `statement_plain_text`: string - The account of the event by the witness in plain text form. e.g. `I witnessed what happened.`
  - `date_received`: string(date) - Date that the Witness Statement was received. e.g. `2016-10-25`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `witness`: object
    - `id`: integer e.g. `1`
    - `name`: string e.g. `John Doe`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `actions`: array of object - Actions
  - `id`: integer - Action ID e.g. `99`
  - `incident_id`: integer - Incident ID e.g. `42`
  - `action_type`: object
    - `id`: integer - Incident Action Type ID e.g. `999`
    - `name`: string - Incident Action Type Name e.g. `Corrective`
    - `active`: boolean - Represents whether an Incident Action Type is available for use. e.g. `true`
    - `global`: boolean - Represents whether an Incident Action Type has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `name`: string - Filename e.g. `january_receipt_copy.jpg`
    - `content_type`: string e.g. `application/pdf`
    - `viewable`: boolean e.g. `true`
    - `can_be_viewed`: boolean e.g. `true`
  - `description`: string - The account of the action in rich text form. e.g. `<p>I took action.</p>`
  - `description_plain_text`: string - The account of the action plain text form. e.g. `I took action`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `observation_id`: integer - Observation ID e.g. `99`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/recycle_bin/incidents/{id}/restore

**Retrieve Recycled Incident**
Restores the specified incident from the recycle bin, making it active again. The incident and all its associated records (injuries, near_misses, attachments, etc.) are recovered. Returns 200 OK on success.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Incident ID

Response 200: OK (no body)

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Injuries

Resource id: `injuries`. Raw spec: `../openapi-raw/injuries.json`. Web: https://developers.procore.com/reference/rest/injuries?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/incidents/injuries

**List Injuries**
Returns a paginated list of injury records for the specified project, optionally scoped to a single incident via incident_id. Each injury includes affliction details, affected person, body parts, medical treatment information, and work impact metrics. By default sorted by descending full_number (incident.number). Supports filtering by affected party, body part, affliction type, filing type, harm source, and full-text search.
NOTE: The afflictions and affected_body_part keys are deprecated. Please disregard and use the affected_body_parts and affliction_type keys as documented below.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Optional incident ID to scope results. When provided, returns only injury records belonging to the specified incident. Omit to retrieve injuries across all incidents in the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[affected_company_id]` [query] array of integer - Array of Company IDs. Returns item(s) with the specified affected Company IDs.
- `filters[affected_party_id]` [query] array of integer - Array of Affected Party IDs. Returns item(s) with the specified Affected Party IDs.
- `filters[affected_person_id]` [query] array of integer - Array of Person IDs. Returns item(s) with the specified affected Person IDs.
- `filters[harm_source_id]` [query] array of integer - Array of Harm Source IDs. Returns item(s) with the specified Harm Source IDs.
- `filters[work_activity_id]` [query] array of integer - Array of Work Activity IDs. Returns item(s) with the specified Work Activity IDs.
- `filters[managed_equipment_id]` [query] integer - Return item(s) with the specified Managed Equipment ID.
- `filters[recordable]` [query] boolean - Return item(s) that are recordable.
- `filters[affected_body_part]` [query] array of string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - Return item(s) with any of the specified Affected Body Parts.
- `filters[affliction_type_id]` [query] integer - Return item(s) with the specified Affliction Type IDs
- `filters[body_part_id]` [query] array of integer - Return item(s) with the specified Body Part IDs
- `filters[filing_type]` [query] array of string enum[fatality, first_aid, lost_time, medically_treated, refused_care, report_only, restricted_work] - Return item(s) with the specified filing types. The `recordable` filing_type filter value is deprecated.
- `filters[query]` [query] string - Full-text search across injury description and related fields. Returns injuries where any searchable field contains the query string.
- `sort` [query] string enum[affected_company, affected_person, created_at, full_number, harm_source, managed_equipment, number, recordable, work_activity]

Response 200 (application/json): array of object

- `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `injury`
- `date_returned_to_work`: string(date) - Date returned to work e.g. `2018-10-31`
- `affected_party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `affected_person`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
  - `login`: string - Email e.g. `carl.contractor@example.com`
- `harm_source`: object
  - `id`: integer - Harm Source ID e.g. `999`
  - `name`: string - Harm Source Name e.g. `Material`
  - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `date_of_death`: string(date) - Date of death e.g. `2018-11-10`
- `filing_type`: string enum[fatality, first_aid, lost_time, medically_treated, refused_care, report_only, restricted_work] - Filing Type e.g. `first_aid`
- `hospitalized_overnight`: boolean - Represents whether the injured person was hospitalized overnight e.g. `true`
- `recordable`: boolean - Represents whether the Injury record is recordable e.g. `true`
- `treated_in_er`: boolean - Represents whether the injured person was treated in the ER e.g. `true`
- `treatment_facility_address`: string - The street address of the treatment facility e.g. `6309 Carpinteria Ave.`
- `treatment_facility`: string - The name of the treatment facility e.g. `Procore Hospital`
- `treatment_provider`: string - The name of the treatment provider e.g. `Dr. Doctor`
- `work_days_absent`: integer - The number of days absent from work e.g. `1`
- `work_days_restricted`: integer - The number of days on restricted work e.g. `3`
- `work_days_transferred`: integer - The number of days transferred e.g. `4`
- `body_diagram_type`: string enum[feminine, masculine, None] - Body Type displayed in Body Diagram e.g. `feminine`
- `affliction_type`: object
  - `id`: integer - Affliction Type ID e.g. `999`
  - `name`: string - Affliction Type Name e.g. `Sprain`
  - `active`: boolean - Represents whether a Affliction Type is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Affliction Type has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - DEPRECATED. The body part affected by the affliction e.g. `ankle`
- `affected_body_parts`: array of string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - Array of body parts affected by the affliction
- `afflictions`: array of object - DEPRECATED. Array of afflictions affecting the injured person. Currently this is limited to one.
  - `id`: integer - Affliction ID e.g. `999`
  - `affliction_type`: object
    - `id`: integer - Affliction Type ID e.g. `999`
    - `name`: string - Affliction Type Name e.g. `Sprain`
    - `active`: boolean - Represents whether a Affliction Type is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Affliction Type has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - The body part affected by the affliction e.g. `ankle`
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
- `body_parts`: array of object - Body parts affected by the injury
  - `id`: integer - Body Part ID e.g. `999`
  - `name`: string - Body Part Name e.g. `finger_index_right`
  - `selectable`: boolean - Represents whether a Body Part can be associated to an injury. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `parent_id`: integer - Parent Body Part ID e.g. `999`
- `id`: integer - Incident Record ID e.g. `9`
- `number`: integer - The number of the Record e.g. `4`
- `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
- `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
- `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Equipment ID e.g. `15504`
  - `name`: string - Equipment name e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `work_activity`: object
  - `id`: integer - Work Activity ID e.g. `999`
  - `name`: string - Work Activity Name e.g. `Earthwork`
  - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/incidents/injuries

**Create Injury**
Creates a new injury record associated with the specified incident. Requires incident_id. Optionally specify affliction details (affliction_type_id, body_part_ids), affected person information, medical treatment details, and work impact metrics. The affected_body_parts field is deprecated; use body_part_ids instead. Pass run_configurable_validations=true to enforce custom validation rules. The operation is idempotent.
NOTE: The afflictions and affected_body_part keys are deprecated. Please disregard and use the affected_body_parts and affliction_type keys as documented below.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - Whether or not Configurable validations from the Injury Configurable Field Set should be run (default: false). See (https://developers.procore.com/reference/configurable-field-sets#list-project-configurable-field-sets...

Request body (application/json) (required):

- `injury`: object (required)
  - `incident_id`: integer (required) - The ID of the Incident
  - `date_of_death`: string(date) - Date of death e.g. `2018-11-12`
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `date_returned_to_work`: string(date) - Date returned to work e.g. `2018-10-31`
  - `filing_type`: string enum[fatality, first_aid, lost_time, medically_treated, refused_care, report_only, restricted_work] - Filing Type - The 'recordable' filing_type value is deprecated. When a filing type of 'recordable' is provided, the `recordable` attribute of the Injury will instead be set to 'true'. e.g. `first_aid`
  - `hospitalized_overnight`: boolean - Represents whether the injured person was hospitalized overnight e.g. `true`
  - `recordable`: boolean - Represents whether the Injury record is recordable e.g. `true`
  - `treated_in_er`: boolean - Represents whether the injured person was treated in the ER e.g. `true`
  - `treatment_facility_address`: string - The street address of the treatment facility e.g. `6309 Carpinteria Ave.`
  - `treatment_facility`: string - The name of the treatment facility e.g. `Procore Hospital`
  - `treatment_provider`: string - The name of the treatment provider e.g. `Dr. Doctor`
  - `work_days_absent`: integer - The number of days absent from work e.g. `1`
  - `work_days_restricted`: integer - The number of days on restricted work e.g. `3`
  - `work_days_transferred`: integer - The number of days transferred e.g. `4`
  - `affliction_type_id`: integer - The ID of the Affliction Type. This cannot be cleared if there is an affected_body_part.
  - `body_diagram_type`: string enum[feminine, masculine] e.g. `feminine`
  - `affected_body_parts`: array of string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - DEPRECATED - Use body_part_ids instead. The body parts affected by the affliction. This requires an affliction_type to be set.
  - `affected_person_id`: integer - The ID of the Affected Person. This only supports full Users from the Users endpoints.
  - `affected_party_id`: integer - The ID of the Affected Person. This supports full and reference Users from the People endpoints.
  - `body_part_ids`: array of integer - The IDs of body parts affected by the affliction. This requires an affliction_type to be set.
  - `harm_source_id`: integer - The ID of the Harm Source
  - `affected_company_id`: integer - The ID of the Affected Company
  - `managed_equipment_id`: integer - The ID of the Managed Equipment
  - `work_activity_id`: integer - The ID of the Work Activity
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 201 (application/json): object

- `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `injury`
- `date_returned_to_work`: string(date) - Date returned to work e.g. `2018-10-31`
- `affected_party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `affected_person`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
  - `login`: string - Email e.g. `carl.contractor@example.com`
- `harm_source`: object
  - `id`: integer - Harm Source ID e.g. `999`
  - `name`: string - Harm Source Name e.g. `Material`
  - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `date_of_death`: string(date) - Date of death e.g. `2018-11-10`
- `filing_type`: string enum[fatality, first_aid, lost_time, medically_treated, refused_care, report_only, restricted_work] - Filing Type e.g. `first_aid`
- `hospitalized_overnight`: boolean - Represents whether the injured person was hospitalized overnight e.g. `true`
- `recordable`: boolean - Represents whether the Injury record is recordable e.g. `true`
- `treated_in_er`: boolean - Represents whether the injured person was treated in the ER e.g. `true`
- `treatment_facility_address`: string - The street address of the treatment facility e.g. `6309 Carpinteria Ave.`
- `treatment_facility`: string - The name of the treatment facility e.g. `Procore Hospital`
- `treatment_provider`: string - The name of the treatment provider e.g. `Dr. Doctor`
- `work_days_absent`: integer - The number of days absent from work e.g. `1`
- `work_days_restricted`: integer - The number of days on restricted work e.g. `3`
- `work_days_transferred`: integer - The number of days transferred e.g. `4`
- `body_diagram_type`: string enum[feminine, masculine, None] - Body Type displayed in Body Diagram e.g. `feminine`
- `affliction_type`: object
  - `id`: integer - Affliction Type ID e.g. `999`
  - `name`: string - Affliction Type Name e.g. `Sprain`
  - `active`: boolean - Represents whether a Affliction Type is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Affliction Type has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - DEPRECATED. The body part affected by the affliction e.g. `ankle`
- `affected_body_parts`: array of string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - Array of body parts affected by the affliction
- `afflictions`: array of object - DEPRECATED. Array of afflictions affecting the injured person. Currently this is limited to one.
  - `id`: integer - Affliction ID e.g. `999`
  - `affliction_type`: object
    - `id`: integer - Affliction Type ID e.g. `999`
    - `name`: string - Affliction Type Name e.g. `Sprain`
    - `active`: boolean - Represents whether a Affliction Type is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Affliction Type has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - The body part affected by the affliction e.g. `ankle`
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
- `body_parts`: array of object - Body parts affected by the injury
  - `id`: integer - Body Part ID e.g. `999`
  - `name`: string - Body Part Name e.g. `finger_index_right`
  - `selectable`: boolean - Represents whether a Body Part can be associated to an injury. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `parent_id`: integer - Parent Body Part ID e.g. `999`
- `id`: integer - Incident Record ID e.g. `9`
- `number`: integer - The number of the Record e.g. `4`
- `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
- `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
- `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Equipment ID e.g. `15504`
  - `name`: string - Equipment name e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `work_activity`: object
  - `id`: integer - Work Activity ID e.g. `999`
  - `name`: string - Work Activity Name e.g. `Earthwork`
  - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/injuries/{id}

**Show Injury**
Returns the specified injury record with full details including affliction type, affected body parts, harm source, medical treatment information, work days impacted, and custom fields. The affected_body_part and afflictions fields are deprecated; use affected_body_parts array and affliction_type instead.
NOTE: The afflictions and affected_body_part keys are deprecated. Please disregard and use the affected_body_parts and affliction_type keys as documented below.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Injury ID

Response 200 (application/json): object

- `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `injury`
- `date_returned_to_work`: string(date) - Date returned to work e.g. `2018-10-31`
- `affected_party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `affected_person`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
  - `login`: string - Email e.g. `carl.contractor@example.com`
- `harm_source`: object
  - `id`: integer - Harm Source ID e.g. `999`
  - `name`: string - Harm Source Name e.g. `Material`
  - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `date_of_death`: string(date) - Date of death e.g. `2018-11-10`
- `filing_type`: string enum[fatality, first_aid, lost_time, medically_treated, refused_care, report_only, restricted_work] - Filing Type e.g. `first_aid`
- `hospitalized_overnight`: boolean - Represents whether the injured person was hospitalized overnight e.g. `true`
- `recordable`: boolean - Represents whether the Injury record is recordable e.g. `true`
- `treated_in_er`: boolean - Represents whether the injured person was treated in the ER e.g. `true`
- `treatment_facility_address`: string - The street address of the treatment facility e.g. `6309 Carpinteria Ave.`
- `treatment_facility`: string - The name of the treatment facility e.g. `Procore Hospital`
- `treatment_provider`: string - The name of the treatment provider e.g. `Dr. Doctor`
- `work_days_absent`: integer - The number of days absent from work e.g. `1`
- `work_days_restricted`: integer - The number of days on restricted work e.g. `3`
- `work_days_transferred`: integer - The number of days transferred e.g. `4`
- `body_diagram_type`: string enum[feminine, masculine, None] - Body Type displayed in Body Diagram e.g. `feminine`
- `affliction_type`: object
  - `id`: integer - Affliction Type ID e.g. `999`
  - `name`: string - Affliction Type Name e.g. `Sprain`
  - `active`: boolean - Represents whether a Affliction Type is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Affliction Type has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - DEPRECATED. The body part affected by the affliction e.g. `ankle`
- `affected_body_parts`: array of string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - Array of body parts affected by the affliction
- `afflictions`: array of object - DEPRECATED. Array of afflictions affecting the injured person. Currently this is limited to one.
  - `id`: integer - Affliction ID e.g. `999`
  - `affliction_type`: object
    - `id`: integer - Affliction Type ID e.g. `999`
    - `name`: string - Affliction Type Name e.g. `Sprain`
    - `active`: boolean - Represents whether a Affliction Type is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Affliction Type has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - The body part affected by the affliction e.g. `ankle`
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
- `body_parts`: array of object - Body parts affected by the injury
  - `id`: integer - Body Part ID e.g. `999`
  - `name`: string - Body Part Name e.g. `finger_index_right`
  - `selectable`: boolean - Represents whether a Body Part can be associated to an injury. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `parent_id`: integer - Parent Body Part ID e.g. `999`
- `id`: integer - Incident Record ID e.g. `9`
- `number`: integer - The number of the Record e.g. `4`
- `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
- `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
- `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Equipment ID e.g. `15504`
  - `name`: string - Equipment name e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `work_activity`: object
  - `id`: integer - Work Activity ID e.g. `999`
  - `name`: string - Work Activity Name e.g. `Earthwork`
  - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/incidents/injuries/{id}

**Update Injury**
Updates the specified injury record's attributes. All fields are optional. To clear a nullable field, explicitly pass null. The affected_body_parts field is deprecated; use body_part_ids instead. Pass run_configurable_validations=true to enforce custom validation rules.
NOTE: The afflictions and affected_body_part keys are deprecated. Please disregard and use the affected_body_parts and affliction_type keys as documented below.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Injury ID
- `run_configurable_validations` [query] boolean - Whether or not Configurable validations from the Injury Configurable Field Set should be run (default: false). See (https://developers.procore.com/reference/configurable-field-sets#list-project-configurable-field-sets...

Request body (application/json) (required):

- `injury`: object (required)
  - `date_of_death`: string(date-time) - Date of death e.g. `2016-10-25T17:53:35Z`
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `filing_type`: string enum[fatality, first_aid, lost_time, medically_treated, refused_care, report_only, restricted_work] - Filing Type - The 'recordable' filing_type value is deprecated. When a filing type of 'recordable' is provided, the `recordable` attribute of the Injury will instead be set to 'true'. e.g. `first_aid`
  - `hospitalized_overnight`: boolean - Represents whether the injured person was hospitalized overnight e.g. `true`
  - `recordable`: boolean - Represents whether the Injury record is recordable e.g. `true`
  - `treated_in_er`: boolean - Represents whether the injured person was treated in the ER e.g. `true`
  - `treatment_facility_address`: string - The street address of the treatment facility e.g. `6309 Carpinteria Ave.`
  - `treatment_facility`: string - The name of the treatment facility e.g. `Procore Hospital`
  - `treatment_provider`: string - The name of the treatment provider e.g. `Dr. Doctor`
  - `work_days_absent`: integer - The number of days absent from work e.g. `1`
  - `work_days_restricted`: integer - The number of days on restricted work e.g. `3`
  - `work_days_transferred`: integer - The number of days transferred e.g. `4`
  - `affliction_type_id`: integer - The ID of the Affliction Type. This cannot be cleared if there is an affected_body_part.
  - `body_diagram_type`: string enum[feminine, masculine] e.g. `feminine`
  - `affected_body_parts`: array of string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - DEPRECATED - Use body_part_ids instead. The body parts affected by the affliction. This requires an affliction_type to be set.
  - `affected_person_id`: integer - The ID of the Affected Person. This only supports full Users from the Users endpoints.
  - `affected_party_id`: integer - The ID of the Affected Person. This supports full and reference Users from the People endpoints.
  - `body_part_ids`: array of integer - The IDs of body parts affected by the affliction. This requires an affliction_type to be set.
  - `harm_source_id`: integer - The ID of the Harm Source
  - `affected_company_id`: integer - The ID of the Affected Company
  - `managed_equipment_id`: integer - The ID of the Managed Equipment
  - `work_activity_id`: integer - The ID of the Work Activity
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `injury`
- `date_returned_to_work`: string(date) - Date returned to work e.g. `2018-10-31`
- `affected_party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `affected_person`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
  - `login`: string - Email e.g. `carl.contractor@example.com`
- `harm_source`: object
  - `id`: integer - Harm Source ID e.g. `999`
  - `name`: string - Harm Source Name e.g. `Material`
  - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `date_of_death`: string(date) - Date of death e.g. `2018-11-10`
- `filing_type`: string enum[fatality, first_aid, lost_time, medically_treated, refused_care, report_only, restricted_work] - Filing Type e.g. `first_aid`
- `hospitalized_overnight`: boolean - Represents whether the injured person was hospitalized overnight e.g. `true`
- `recordable`: boolean - Represents whether the Injury record is recordable e.g. `true`
- `treated_in_er`: boolean - Represents whether the injured person was treated in the ER e.g. `true`
- `treatment_facility_address`: string - The street address of the treatment facility e.g. `6309 Carpinteria Ave.`
- `treatment_facility`: string - The name of the treatment facility e.g. `Procore Hospital`
- `treatment_provider`: string - The name of the treatment provider e.g. `Dr. Doctor`
- `work_days_absent`: integer - The number of days absent from work e.g. `1`
- `work_days_restricted`: integer - The number of days on restricted work e.g. `3`
- `work_days_transferred`: integer - The number of days transferred e.g. `4`
- `body_diagram_type`: string enum[feminine, masculine, None] - Body Type displayed in Body Diagram e.g. `feminine`
- `affliction_type`: object
  - `id`: integer - Affliction Type ID e.g. `999`
  - `name`: string - Affliction Type Name e.g. `Sprain`
  - `active`: boolean - Represents whether a Affliction Type is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Affliction Type has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - DEPRECATED. The body part affected by the affliction e.g. `ankle`
- `affected_body_parts`: array of string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - Array of body parts affected by the affliction
- `afflictions`: array of object - DEPRECATED. Array of afflictions affecting the injured person. Currently this is limited to one.
  - `id`: integer - Affliction ID e.g. `999`
  - `affliction_type`: object
    - `id`: integer - Affliction Type ID e.g. `999`
    - `name`: string - Affliction Type Name e.g. `Sprain`
    - `active`: boolean - Represents whether a Affliction Type is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Affliction Type has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - The body part affected by the affliction e.g. `ankle`
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
- `body_parts`: array of object - Body parts affected by the injury
  - `id`: integer - Body Part ID e.g. `999`
  - `name`: string - Body Part Name e.g. `finger_index_right`
  - `selectable`: boolean - Represents whether a Body Part can be associated to an injury. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `parent_id`: integer - Parent Body Part ID e.g. `999`
- `id`: integer - Incident Record ID e.g. `9`
- `number`: integer - The number of the Record e.g. `4`
- `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
- `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
- `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Equipment ID e.g. `15504`
  - `name`: string - Equipment name e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `work_activity`: object
  - `id`: integer - Work Activity ID e.g. `999`
  - `name`: string - Work Activity Name e.g. `Earthwork`
  - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/incidents/injuries/{id}

**Destroy Injury**
Soft-deletes the specified injury record, moving it to the recycle bin where it remains recoverable. The injury can be restored via the recycle bin restore endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Injury ID

Response 204: No Content (no body)

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/incidents/injuries

**List Recycled Injuries**
Returns a paginated list of soft-deleted injury records in the project's recycle bin, optionally scoped to a single incident via incident_id. Supports the same filtering and sorting options as the main injuries list. Recycled injuries can be restored via the restore endpoint.
NOTE: The afflictions and affected_body_part keys are deprecated. Please disregard and use the affected_body_parts and affliction_type keys as documented below.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `incident_id` [query] integer - Optional incident ID to scope results. When provided, returns only injury records belonging to the specified incident. Omit to retrieve injuries across all incidents in the project. NOTE: The afflictions and affected_...
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[affected_company_id]` [query] array of integer - Array of Company IDs. Returns item(s) with the specified affected Company IDs.
- `filters[affected_party_id]` [query] array of integer - Array of Affected Party IDs. Returns item(s) with the specified Affected Party IDs.
- `filters[affected_person_id]` [query] array of integer - Array of Person IDs. Returns item(s) with the specified affected Person IDs.
- `filters[harm_source_id]` [query] array of integer - Array of Harm Source IDs. Returns item(s) with the specified Harm Source IDs.
- `filters[work_activity_id]` [query] array of integer - Array of Work Activity IDs. Returns item(s) with the specified Work Activity IDs.
- `filters[managed_equipment_id]` [query] integer - Return item(s) with the specified Managed Equipment ID.
- `filters[recordable]` [query] boolean - Return item(s) that are recordable.
- `filters[affected_body_part]` [query] array of string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - Return item(s) with any of the specified Affected Body Parts.
- `filters[affliction_type_id]` [query] array of integer - Return item(s) with the specified Affliction Type IDs
- `filters[filing_type]` [query] array of string enum[fatality, first_aid, lost_time, medically_treated, refused_care, report_only, restricted_work] - Return item(s) with the specified filing types. The `recordable` filing_type filter value is deprecated.
- `filters[query]` [query] string - Full-text search across injury description and related fields. Returns injuries where any searchable field contains the query string.
- `sort` [query] string enum[affected_company, affected_person, created_at, full_number, harm_source, managed_equipment, number, recordable, work_activity]
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `injury`
- `date_returned_to_work`: string(date) - Date returned to work e.g. `2018-10-31`
- `affected_party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `affected_person`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
  - `login`: string - Email e.g. `carl.contractor@example.com`
- `harm_source`: object
  - `id`: integer - Harm Source ID e.g. `999`
  - `name`: string - Harm Source Name e.g. `Material`
  - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `date_of_death`: string(date) - Date of death e.g. `2018-11-10`
- `filing_type`: string enum[fatality, first_aid, lost_time, medically_treated, refused_care, report_only, restricted_work] - Filing Type e.g. `first_aid`
- `hospitalized_overnight`: boolean - Represents whether the injured person was hospitalized overnight e.g. `true`
- `recordable`: boolean - Represents whether the Injury record is recordable e.g. `true`
- `treated_in_er`: boolean - Represents whether the injured person was treated in the ER e.g. `true`
- `treatment_facility_address`: string - The street address of the treatment facility e.g. `6309 Carpinteria Ave.`
- `treatment_facility`: string - The name of the treatment facility e.g. `Procore Hospital`
- `treatment_provider`: string - The name of the treatment provider e.g. `Dr. Doctor`
- `work_days_absent`: integer - The number of days absent from work e.g. `1`
- `work_days_restricted`: integer - The number of days on restricted work e.g. `3`
- `work_days_transferred`: integer - The number of days transferred e.g. `4`
- `body_diagram_type`: string enum[feminine, masculine, None] - Body Type displayed in Body Diagram e.g. `feminine`
- `affliction_type`: object
  - `id`: integer - Affliction Type ID e.g. `999`
  - `name`: string - Affliction Type Name e.g. `Sprain`
  - `active`: boolean - Represents whether a Affliction Type is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Affliction Type has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - DEPRECATED. The body part affected by the affliction e.g. `ankle`
- `affected_body_parts`: array of string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - Array of body parts affected by the affliction
- `afflictions`: array of object - DEPRECATED. Array of afflictions affecting the injured person. Currently this is limited to one.
  - `id`: integer - Affliction ID e.g. `999`
  - `affliction_type`: object
    - `id`: integer - Affliction Type ID e.g. `999`
    - `name`: string - Affliction Type Name e.g. `Sprain`
    - `active`: boolean - Represents whether a Affliction Type is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Affliction Type has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - The body part affected by the affliction e.g. `ankle`
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
- `body_parts`: array of object - Body parts affected by the injury
  - `id`: integer - Body Part ID e.g. `999`
  - `name`: string - Body Part Name e.g. `finger_index_right`
  - `selectable`: boolean - Represents whether a Body Part can be associated to an injury. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `parent_id`: integer - Parent Body Part ID e.g. `999`
- `id`: integer - Incident Record ID e.g. `9`
- `number`: integer - The number of the Record e.g. `4`
- `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
- `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
- `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Equipment ID e.g. `15504`
  - `name`: string - Equipment name e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `work_activity`: object
  - `id`: integer - Work Activity ID e.g. `999`
  - `name`: string - Work Activity Name e.g. `Earthwork`
  - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/incidents/injuries/{id}

**Show Recycled Injury**
Returns the specified recycled injury record with full details. The response structure is identical to the Show Injury endpoint but represents a soft-deleted injury.
NOTE: The afflictions and affected_body_part keys are deprecated. Please disregard and use the affected_body_parts and affliction_type keys as documented below.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Injury ID
- `incident_id` [query] integer - Incident ID

Response 200 (application/json): object

- `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `injury`
- `date_returned_to_work`: string(date) - Date returned to work e.g. `2018-10-31`
- `affected_party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `affected_person`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
  - `login`: string - Email e.g. `carl.contractor@example.com`
- `harm_source`: object
  - `id`: integer - Harm Source ID e.g. `999`
  - `name`: string - Harm Source Name e.g. `Material`
  - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `date_of_death`: string(date) - Date of death e.g. `2018-11-10`
- `filing_type`: string enum[fatality, first_aid, lost_time, medically_treated, refused_care, report_only, restricted_work] - Filing Type e.g. `first_aid`
- `hospitalized_overnight`: boolean - Represents whether the injured person was hospitalized overnight e.g. `true`
- `recordable`: boolean - Represents whether the Injury record is recordable e.g. `true`
- `treated_in_er`: boolean - Represents whether the injured person was treated in the ER e.g. `true`
- `treatment_facility_address`: string - The street address of the treatment facility e.g. `6309 Carpinteria Ave.`
- `treatment_facility`: string - The name of the treatment facility e.g. `Procore Hospital`
- `treatment_provider`: string - The name of the treatment provider e.g. `Dr. Doctor`
- `work_days_absent`: integer - The number of days absent from work e.g. `1`
- `work_days_restricted`: integer - The number of days on restricted work e.g. `3`
- `work_days_transferred`: integer - The number of days transferred e.g. `4`
- `body_diagram_type`: string enum[feminine, masculine, None] - Body Type displayed in Body Diagram e.g. `feminine`
- `affliction_type`: object
  - `id`: integer - Affliction Type ID e.g. `999`
  - `name`: string - Affliction Type Name e.g. `Sprain`
  - `active`: boolean - Represents whether a Affliction Type is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Affliction Type has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - DEPRECATED. The body part affected by the affliction e.g. `ankle`
- `affected_body_parts`: array of string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - Array of body parts affected by the affliction
- `afflictions`: array of object - DEPRECATED. Array of afflictions affecting the injured person. Currently this is limited to one.
  - `id`: integer - Affliction ID e.g. `999`
  - `affliction_type`: object
    - `id`: integer - Affliction Type ID e.g. `999`
    - `name`: string - Affliction Type Name e.g. `Sprain`
    - `active`: boolean - Represents whether a Affliction Type is available for use. e.g. `true`
    - `global`: boolean - Represents whether a Affliction Type has been provided by Procore. e.g. `true`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `affected_body_part`: string enum[abdomen, ankle, ankle_left, ankle_right, arm, arm_left, arm_right, back, body_systems, breast, breast_left, breast_right, ...] - The body part affected by the affliction e.g. `ankle`
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
- `body_parts`: array of object - Body parts affected by the injury
  - `id`: integer - Body Part ID e.g. `999`
  - `name`: string - Body Part Name e.g. `finger_index_right`
  - `selectable`: boolean - Represents whether a Body Part can be associated to an injury. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
  - `parent_id`: integer - Parent Body Part ID e.g. `999`
- `id`: integer - Incident Record ID e.g. `9`
- `number`: integer - The number of the Record e.g. `4`
- `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
- `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
- `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Equipment ID e.g. `15504`
  - `name`: string - Equipment name e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `work_activity`: object
  - `id`: integer - Work Activity ID e.g. `999`
  - `name`: string - Work Activity Name e.g. `Earthwork`
  - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/recycle_bin/incidents/injuries/{id}/restore

**Retrieve Recycled Injury**
Restores the specified injury record from the recycle bin, making it active again. Returns 200 OK on success.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Injury ID
- `incident_id` [query] integer - Incident ID

Response 200: OK (no body)

Error responses: 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Injury Filter Options

Resource id: `injury-filter-options`. Raw spec: `../openapi-raw/injury-filter-options.json`. Web: https://developers.procore.com/reference/rest/injury-filter-options?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/incidents/injuries/filter_options/affected_companies

**Get Affected Company Filter Options**
Returns all distinct companies that have been assigned as affected companies on existing injury records in the project. Use the returned IDs to populate the filters[affected_company_id] dropdown when filtering injuries.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/injuries/filter_options/affected_parties

**Get Affected Parties Filter Options**
Returns all distinct parties (from the People directory) that have been assigned as affected parties on existing injury records in the project. Use the returned IDs to populate the filters[affected_party_id] dropdown when filtering injuries.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/injuries/filter_options/affected_persons

**Get Affected Persons Filter Options**
Returns all distinct users (from the Users directory) that have been assigned as affected persons on existing injury records in the project. Use the returned IDs to populate the filters[affected_person_id] dropdown when filtering injuries.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/injuries/filter_options/managed_equipment

**Get Managed Equipment Filter Options**
Returns all distinct managed equipment items that have been associated with existing injury records in the project. Use the returned IDs to populate the filters[managed_equipment_id] dropdown when filtering injuries.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/injuries/filter_options/harm_sources

**Get Harm Source Filter Options**
Returns all distinct harm sources that have been assigned to existing injury records in the project. Use the returned IDs to populate the filters[harm_source_id] dropdown when filtering injuries.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/injuries/filter_options/work_activities

**Get Work Activity Filter Options**
Returns all distinct work activities that have been assigned to existing injury records in the project. Use the returned IDs to populate the filters[work_activity_id] dropdown when filtering injuries.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/injuries/filter_options/affected_body_parts

**Get Affected Body Part Filter Options**
Returns all distinct body part enum values that have been assigned to existing injury records in the project. Each option includes the enum key (for filtering) and human-readable label. Use the key values to populate the filters[affected_body_part] dropdown when filtering injuries.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Enum key identifying the filter option as stored on the server. Pass this value in filter parameters when querying the parent resource. e.g. `enum`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/injuries/filter_options/affliction_types

**Get Affliction Type Filter Options**
Returns all distinct affliction types (e.g., Sprain, Fracture, Burn) that have been assigned to existing injury records in the project. Each option includes the enum key (for filtering) and human-readable label. Use the key values to populate the filters[affliction_type_id] dropdown when filtering injuries.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Enum key identifying the filter option as stored on the server. Pass this value in filter parameters when querying the parent resource. e.g. `enum`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/injuries/filter_options/filing_types

**Get Filing Type Filter Options**
Returns all distinct filing type enum values (e.g., first_aid, lost_time, fatality) that have been assigned to existing injury records in the project. Each option includes the enum key (for filtering) and human-readable label. The 'recordable' filing type is deprecated. Use the key values to populate the filters[filing_type] dropdown when filtering injuries.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Enum key identifying the filter option as stored on the server. Pass this value in filter parameters when querying the parent resource. e.g. `enum`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Near Miss Filter Options

Resource id: `near-miss-filter-options`. Raw spec: `../openapi-raw/near-miss-filter-options.json`. Web: https://developers.procore.com/reference/rest/near-miss-filter-options?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/incidents/near_misses/filter_options/affected_companies

**Get Affected Company Filter Options**
Returns all distinct companies that have been assigned as affected companies on existing near miss records in the project. Use the returned IDs to populate the filters[affected_company_id] dropdown when filtering near misses.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/near_misses/filter_options/affected_parties

**Get Affected Parties Filter Options**
Returns all distinct parties (from the People directory) that have been assigned as affected parties on existing near miss records in the project. Use the returned IDs to populate the filters[affected_party_id] dropdown when filtering near misses.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/near_misses/filter_options/affected_persons

**Get Affected Persons Filter Options**
Returns all distinct users (from the Users directory) that have been assigned as affected persons on existing near miss records in the project. Use the returned IDs to populate the filters[affected_person_id] dropdown when filtering near misses.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/near_misses/filter_options/managed_equipment

**Get Managed Equipment Filter Options**
Returns all distinct managed equipment items that have been associated with existing near miss records in the project. Use the returned IDs to populate the filters[managed_equipment_id] dropdown when filtering near misses.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/near_misses/filter_options/harm_sources

**Get Harm Source Filter Options**
Returns all distinct harm sources that have been assigned to existing near miss records in the project. Use the returned IDs to populate the filters[harm_source_id] dropdown when filtering near misses.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/near_misses/filter_options/work_activities

**Get Work Activity Filter Options**
Returns all distinct work activities that have been assigned to existing near miss records in the project. Use the returned IDs to populate the filters[work_activity_id] dropdown when filtering near misses.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Near Misses

Resource id: `near-misses`. Raw spec: `../openapi-raw/near-misses.json`. Web: https://developers.procore.com/reference/rest/near-misses?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/incidents/near_misses

**List Near Misses**
Returns a paginated list of near miss records for the specified project, optionally scoped to a single incident via incident_id. Each near miss includes description, affected person, harm source, potential for injury details, and custom fields. By default sorted by descending full_number (incident.number). Supports filtering by affected party, harm source, managed equipment, and full-text search.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Optional incident ID to scope results. When provided, returns only near miss records belonging to the specified incident. Omit to retrieve near misses across all incidents in the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[affected_company_id]` [query] array of integer - Array of Company IDs. Returns item(s) with the specified affected Company IDs.
- `filters[affected_party_id]` [query] array of integer - Array of Affected Party IDs. Returns item(s) with the specified Affected Party IDs.
- `filters[affected_person_id]` [query] array of integer - Array of Person IDs. Returns item(s) with the specified affected Person IDs.
- `filters[harm_source_id]` [query] array of integer - Array of Harm Source IDs. Returns item(s) with the specified Harm Source IDs.
- `filters[work_activity_id]` [query] array of integer - Array of Work Activity IDs. Returns item(s) with the specified Work Activity IDs.
- `filters[managed_equipment_id]` [query] integer - Return item(s) with the specified Managed Equipment ID.
- `filters[query]` [query] string - Full-text search across near miss description and related fields. Returns near misses where any searchable field contains the query string.
- `sort` [query] string enum[affected_company, affected_person, created_at, managed_equipment, full_number, harm_source, number, work_activity]

Response 200 (application/json): array of object

- `id`: integer - Incident Record ID e.g. `9`
- `number`: integer - The number of the Record e.g. `4`
- `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
- `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
- `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
- `type`: string - The type of incident record (environmental, injury, near_miss, property_damage) e.g. `injury`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
- `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Equipment ID e.g. `15504`
  - `name`: string - Equipment name e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `work_activity`: object
  - `id`: integer - Work Activity ID e.g. `999`
  - `name`: string - Work Activity Name e.g. `Earthwork`
  - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
- `affected_party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `affected_person`: object
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `harm_source`: object
  - `id`: integer - Harm Source ID e.g. `999`
  - `name`: string - Harm Source Name e.g. `Material`
  - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
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

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/incidents/near_misses

**Create Near Miss**
Creates a new near miss record associated with the specified incident. Requires incident_id. Optionally specify description, affected person information, harm source, potential injury details, and custom fields. Pass run_configurable_validations=true to enforce custom validation rules. The operation is idempotent.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `near_miss`: object (required)
  - `incident_id`: integer (required) - The ID of the Incident
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `affected_person_id`: integer - The ID of the Affected Person. This only supports full Users from the Users endpoints.
  - `affected_party_id`: integer - The ID of the Affected Person. This supports full and reference Users from the People endpoints.
  - `harm_source_id`: integer - The ID of the Harm Source
  - `affected_company_id`: integer - The ID of the Affected Company
  - `managed_equipment_id`: integer - The ID of the Managed Equipment
  - `work_activity_id`: integer - The ID of the Work Activity
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 201 (application/json): object

- `id`: integer - Incident Record ID e.g. `9`
- `number`: integer - The number of the Record e.g. `4`
- `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
- `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
- `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
- `type`: string - The type of incident record (environmental, injury, near_miss, property_damage) e.g. `injury`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
- `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Equipment ID e.g. `15504`
  - `name`: string - Equipment name e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `work_activity`: object
  - `id`: integer - Work Activity ID e.g. `999`
  - `name`: string - Work Activity Name e.g. `Earthwork`
  - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
- `affected_party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `affected_person`: object
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `harm_source`: object
  - `id`: integer - Harm Source ID e.g. `999`
  - `name`: string - Harm Source Name e.g. `Material`
  - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
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

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/near_misses/{id}

**Show Near Miss**
Returns specific Near Miss

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Near Miss ID

Response 200 (application/json): object

- `id`: integer - Incident Record ID e.g. `9`
- `number`: integer - The number of the Record e.g. `4`
- `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
- `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
- `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
- `type`: string - The type of incident record (environmental, injury, near_miss, property_damage) e.g. `injury`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
- `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Equipment ID e.g. `15504`
  - `name`: string - Equipment name e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `work_activity`: object
  - `id`: integer - Work Activity ID e.g. `999`
  - `name`: string - Work Activity Name e.g. `Earthwork`
  - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
- `affected_party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `affected_person`: object
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `harm_source`: object
  - `id`: integer - Harm Source ID e.g. `999`
  - `name`: string - Harm Source Name e.g. `Material`
  - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
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

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/incidents/near_misses/{id}

**Update Near Miss**
Update a Near Miss' attributes

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Near Miss ID

Request body (application/json) (required):

- `near_miss`: object (required)
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `affected_person_id`: integer - The ID of the Affected Person. This only supports full Users from the Users endpoints.
  - `affected_party_id`: integer - The ID of the Affected Person. This supports full and reference Users from the People endpoints.
  - `harm_source_id`: integer - The ID of the Harm Source
  - `affected_company_id`: integer - The ID of the Affected Company
  - `managed_equipment_id`: integer - The ID of the Managed Equipment
  - `work_activity_id`: integer - The ID of the Work Activity
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `id`: integer - Incident Record ID e.g. `9`
- `number`: integer - The number of the Record e.g. `4`
- `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
- `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
- `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
- `type`: string - The type of incident record (environmental, injury, near_miss, property_damage) e.g. `injury`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
- `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Equipment ID e.g. `15504`
  - `name`: string - Equipment name e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `work_activity`: object
  - `id`: integer - Work Activity ID e.g. `999`
  - `name`: string - Work Activity Name e.g. `Earthwork`
  - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
- `affected_party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `affected_person`: object
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `harm_source`: object
  - `id`: integer - Harm Source ID e.g. `999`
  - `name`: string - Harm Source Name e.g. `Material`
  - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
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

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/incidents/near_misses/{id}

**Destroy Near Miss**
Soft-deletes the specified near miss record, moving it to the recycle bin where it remains recoverable. The near miss can be restored via the recycle bin restore endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Near Miss ID

Response 204: No Content (no body)

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/incidents/near_misses

**List Recycled Near Misses**
Returns a paginated list of soft-deleted near miss records in the project's recycle bin, optionally scoped to a single incident via incident_id. Supports the same filtering and sorting options as the main near misses list. Recycled near misses can be restored via the restore endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `incident_id` [query] integer - Optional incident ID to scope results. When provided, returns only near miss records belonging to the specified incident. Omit to retrieve near misses across all incidents in the project.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[affected_company_id]` [query] array of integer - Array of Company IDs. Returns item(s) with the specified affected Company IDs.
- `filters[affected_party_id]` [query] array of integer - Array of Affected Party IDs. Returns item(s) with the specified Affected Party IDs.
- `filters[affected_person_id]` [query] array of integer - Array of Person IDs. Returns item(s) with the specified affected Person IDs.
- `filters[harm_source_id]` [query] array of integer - Array of Harm Source IDs. Returns item(s) with the specified Harm Source IDs.
- `filters[work_activity_id]` [query] array of integer - Array of Work Activity IDs. Returns item(s) with the specified Work Activity IDs.
- `filters[managed_equipment_id]` [query] integer - Return item(s) with the specified Managed Equipment ID.
- `filters[query]` [query] string - Full-text search across near miss description and related fields. Returns near misses where any searchable field contains the query string.
- `sort` [query] string enum[affected_company, affected_person, created_at, managed_equipment, full_number, harm_source, number, work_activity]
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Incident Record ID e.g. `9`
- `number`: integer - The number of the Record e.g. `4`
- `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
- `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
- `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
- `type`: string - The type of incident record (environmental, injury, near_miss, property_damage) e.g. `injury`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
- `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Equipment ID e.g. `15504`
  - `name`: string - Equipment name e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `work_activity`: object
  - `id`: integer - Work Activity ID e.g. `999`
  - `name`: string - Work Activity Name e.g. `Earthwork`
  - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
- `affected_party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `affected_person`: object
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `harm_source`: object
  - `id`: integer - Harm Source ID e.g. `999`
  - `name`: string - Harm Source Name e.g. `Material`
  - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
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

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/incidents/near_misses/{id}

**Show Recycled Near Miss**
Returns the specified recycled near miss record with full details. The response structure is identical to the Show Near Miss endpoint but represents a soft-deleted near miss.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Near Miss ID
- `incident_id` [query] integer - Incident ID

Response 200 (application/json): object

- `id`: integer - Incident Record ID e.g. `9`
- `number`: integer - The number of the Record e.g. `4`
- `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
- `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
- `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
- `type`: string - The type of incident record (environmental, injury, near_miss, property_damage) e.g. `injury`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
- `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Equipment ID e.g. `15504`
  - `name`: string - Equipment name e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `work_activity`: object
  - `id`: integer - Work Activity ID e.g. `999`
  - `name`: string - Work Activity Name e.g. `Earthwork`
  - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`
- `affected_party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `affected_person`: object
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `harm_source`: object
  - `id`: integer - Harm Source ID e.g. `999`
  - `name`: string - Harm Source Name e.g. `Material`
  - `active`: boolean - Represents whether a Harm Source is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Harm Source has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
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

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/recycle_bin/incidents/near_misses/{id}/restore

**Retrieve Recycled Near Miss**
Retrieves a specific Recycled Near Miss from the recycle bin

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Near Miss ID
- `incident_id` [query] integer - Incident ID

Response 200: OK (no body)

Error responses: 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Incident Configuration

Resource id: `project-incident-configuration`. Raw spec: `../openapi-raw/project-incident-configuration.json`. Web: https://developers.procore.com/reference/rest/project-incident-configuration?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/incidents/configuration

**Get Project Incidents Configuration**
Returns the project's Incidents tool configuration including privacy defaults and default distribution list members. The default distribution list includes only users with at least Read-level permissions to the Incidents tool.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `project_id`: integer - Unique identifier for the project. e.g. `5`
- `private_by_default`: boolean - Ensures that all Incidents are private by default e.g. `true`
- `default_distribution`: array of object - Users in the default distribution list
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/incidents/configuration

**Update Project Incidents Configuration**
Updates the project's Incidents tool configuration. Modifies privacy defaults and/or the default distribution list for new incidents. Distribution list members must have at least Read-level permissions to the Incidents tool.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `configuration`: object (required)
  - `private_by_default`: boolean - When true, new incidents are created as private by default. When false, new incidents are public and visible to all users with Incidents tool access. e.g. `true`
  - `default_distribution_ids`: array of integer - Array of Login Information IDs for users to include in the default distribution list for new incidents. Only users with Read or higher permissions to the Incidents tool are included in the response.

Response 200 (application/json): object

- `project_id`: integer - Unique identifier for the project. e.g. `5`
- `private_by_default`: boolean - Ensures that all Incidents are private by default e.g. `true`
- `default_distribution`: array of object - Users in the default distribution list
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Property Damage Filter Options

Resource id: `property-damage-filter-options`. Raw spec: `../openapi-raw/property-damage-filter-options.json`. Web: https://developers.procore.com/reference/rest/property-damage-filter-options?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/incidents/property_damages/filter_options/affected_companies

**Get Affected Company Filter Options**
Returns all distinct companies that have been assigned as affected companies on existing property damage records in the project. Use the returned IDs to populate the filters[affected_company_id] dropdown when filtering property damages.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/property_damages/filter_options/managed_equipment

**Get Managed Equipment Filter Options**
Returns all distinct managed equipment items that have been associated with existing property damage records in the project. Use the returned IDs to populate the filters[managed_equipment_id] dropdown when filtering property damages.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/property_damages/filter_options/responsible_companies

**Get Responsible Company Filter Options**
Returns all distinct companies that have been assigned as responsible companies on existing property damage records in the project. Use the returned IDs to populate the filters[responsible_company_id] dropdown when filtering property damages.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/property_damages/filter_options/work_activities

**Get Work Activity Filter Options**
Returns all distinct work activities that have been assigned to existing property damage records in the project. Use the returned IDs to populate the filters[work_activity_id] dropdown when filtering property damages.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Identifier of the filter option, typically the record's primary key as a string. Pass this value in filter parameters when querying the parent resource. e.g. `1`
- `value`: string - Human-readable label for the filter option, suitable for display in a dropdown or filter UI. e.g. `label`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Property Damages

Resource id: `property-damages`. Raw spec: `../openapi-raw/property-damages.json`. Web: https://developers.procore.com/reference/rest/property-damages?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/incidents/property_damages

**List Property Damages**
Returns a paginated list of property damage records for the specified project, optionally scoped to a single incident via incident_id. Each property damage includes description, cost impact, responsible company, managed equipment, work activity, and custom fields. By default sorted by descending full_number (incident.number). Supports filtering by responsible company and full-text search.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Optional incident ID to scope results. When provided, returns only property damage records belonging to the specified incident. Omit to retrieve property damages across all incidents in the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[responsible_company_id]` [query] array of integer - Return item(s) with the specified Vendor ID.
- `filters[query]` [query] string - Return item(s) containing search query
- `sort` [query] string enum[affected_company, created_at, managed_equipment, full_number, number, responsible_company, work_activity]

Response 200 (application/json): array of object

- `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `property_damage`
- `estimated_cost_impact`: string - Estimated cost impact of the record e.g. `20000.00`
- `responsible_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
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
- `id`: integer - Incident Record ID e.g. `9`
- `number`: integer - The number of the Record e.g. `4`
- `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
- `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
- `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
- `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Equipment ID e.g. `15504`
  - `name`: string - Equipment name e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `work_activity`: object
  - `id`: integer - Work Activity ID e.g. `999`
  - `name`: string - Work Activity Name e.g. `Earthwork`
  - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/incidents/property_damages

**Create Property Damage**
Creates a new property damage record associated with the specified incident. Requires incident_id. Optionally specify description, estimated cost impact, responsible company, affected company, managed equipment, work activity, and custom fields. The operation is idempotent.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `property_damage`: object (required)
  - `incident_id`: integer (required) - The ID of the Incident
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `estimated_cost_impact`: number(float) - Estimated cost impact of the record e.g. `20000`
  - `affected_company_id`: integer - The ID of the Affected Company
  - `responsible_company_id`: integer - The ID of the Responsible Company
  - `managed_equipment_id`: integer - The ID of the Managed Equipment
  - `work_activity_id`: integer - The ID of the Work Activity
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 201 (application/json): object

- `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `property_damage`
- `estimated_cost_impact`: string - Estimated cost impact of the record e.g. `20000.00`
- `responsible_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
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
- `id`: integer - Incident Record ID e.g. `9`
- `number`: integer - The number of the Record e.g. `4`
- `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
- `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
- `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
- `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Equipment ID e.g. `15504`
  - `name`: string - Equipment name e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `work_activity`: object
  - `id`: integer - Work Activity ID e.g. `999`
  - `name`: string - Work Activity Name e.g. `Earthwork`
  - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/property_damages/{id}

**Show Property Damage**
Returns the specified property damage record with full details including description, cost impact, responsible company, affected company, managed equipment, work activity, and custom fields.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Unique identifier of the property damage record. Use the `id` from the List or Create Property Damages response.

Response 200 (application/json): object

- `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `property_damage`
- `estimated_cost_impact`: string - Estimated cost impact of the record e.g. `20000.00`
- `responsible_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
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
- `id`: integer - Incident Record ID e.g. `9`
- `number`: integer - The number of the Record e.g. `4`
- `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
- `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
- `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
- `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Equipment ID e.g. `15504`
  - `name`: string - Equipment name e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `work_activity`: object
  - `id`: integer - Work Activity ID e.g. `999`
  - `name`: string - Work Activity Name e.g. `Earthwork`
  - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/incidents/property_damages/{id}

**Update Property Damage**
Updates the specified property damage record's attributes. All fields are optional. To clear a nullable field, explicitly pass null.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Unique identifier of the property damage record. Use the `id` from the List or Create Property Damages response.

Request body (application/json) (required):

- `property_damage`: object (required)
  - `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
  - `estimated_cost_impact`: number(float) - Estimated cost impact of the record e.g. `20000`
  - `affected_company_id`: integer - The ID of the Affected Company
  - `responsible_company_id`: integer - The ID of the Responsible Company
  - `managed_equipment_id`: integer - The ID of the Managed Equipment
  - `work_activity_id`: integer - The ID of the Work Activity
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `property_damage`
- `estimated_cost_impact`: string - Estimated cost impact of the record e.g. `20000.00`
- `responsible_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
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
- `id`: integer - Incident Record ID e.g. `9`
- `number`: integer - The number of the Record e.g. `4`
- `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
- `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
- `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
- `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Equipment ID e.g. `15504`
  - `name`: string - Equipment name e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `work_activity`: object
  - `id`: integer - Work Activity ID e.g. `999`
  - `name`: string - Work Activity Name e.g. `Earthwork`
  - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/incidents/property_damages/{id}

**Destroy Property Damage**
Soft-deletes the specified property damage record, moving it to the recycle bin where it remains recoverable. The record can be restored via the recycle bin restore endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Unique identifier of the property damage record. Use the `id` from the List or Create Property Damages response.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/incidents/property_damages

**List Recycled Property Damages**
Returns a paginated list of soft-deleted property damage records in the project's recycle bin, optionally scoped to a single incident via incident_id. Supports the same filtering and sorting options as the main property damages list. Recycled records can be restored via the restore endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID. When provided, the list will be scoped to only the Property Damages for a given Incident.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[responsible_company_id]` [query] array of integer - Return item(s) with the specified Vendor ID.
- `filters[query]` [query] string - Return item(s) containing search query
- `sort` [query] string enum[affected_company, created_at, managed_equipment, full_number, number, work_activity]

Response 200 (application/json): array of object

- `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `property_damage`
- `estimated_cost_impact`: string - Estimated cost impact of the record e.g. `20000.00`
- `responsible_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
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
- `id`: integer - Incident Record ID e.g. `9`
- `number`: integer - The number of the Record e.g. `4`
- `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
- `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
- `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
- `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Equipment ID e.g. `15504`
  - `name`: string - Equipment name e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `work_activity`: object
  - `id`: integer - Work Activity ID e.g. `999`
  - `name`: string - Work Activity Name e.g. `Earthwork`
  - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/incidents/property_damages/{id}

**Show Recycled Property Damage**
Returns the specified recycled property damage record with full details. The response structure is identical to the Show Property Damage endpoint but represents a soft-deleted record.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Unique identifier of the property damage record. Use the `id` from the List or Create Property Damages response.

Response 200 (application/json): object

- `type`: string - The record type, i.e. 'injury', 'near_miss', 'environmental', or 'property_damage' e.g. `property_damage`
- `estimated_cost_impact`: string - Estimated cost impact of the record e.g. `20000.00`
- `responsible_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
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
- `id`: integer - Incident Record ID e.g. `9`
- `number`: integer - The number of the Record e.g. `4`
- `full_number`: string - The Incident Number combined with the Record Number e.g. `16.4`
- `incident_id`: integer - The id of the Incident to which the record belongs e.g. `16`
- `recordable`: boolean - Indicates whether the Incident Record is recordable e.g. `true`
- `incident_title`: string - The title of the Incident to which the record belongs e.g. `HAZMAT Spill`
- `incident_private`: boolean - Indicates whether the Incident to which the record belongs is private e.g. `false`
- `summary`: string - Summary combining the affliction type, body part affected, and source of harm. e.g. `Sprain to Hand by Ground / Floor. Note: This key has been deprecated.`
- `description_plain_text`: string - Description of event e.g. `Sprain to Hand by Ground`
- `description`: string - Description of event in Rich Text format e.g. `<p>Sprain to <b>Hand</b> by Ground</p>`
- `affected_company`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `managed_equipment`: object
  - `id`: integer - Equipment ID e.g. `15504`
  - `name`: string - Equipment name e.g. `Jackhammer`
- `incident_created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `work_activity`: object
  - `id`: integer - Work Activity ID e.g. `999`
  - `name`: string - Work Activity Name e.g. `Earthwork`
  - `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/recycle_bin/incidents/property_damages/{id}/restore

**Retrieve Property Damage**
Restores the specified property damage record from the recycle bin, making it active again. Returns 200 OK on success.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Property Damage ID

Response 200: OK (no body)

Error responses: 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Severity Levels

Resource id: `severity-levels`. Raw spec: `../openapi-raw/severity-levels.json`. Web: https://developers.procore.com/reference/rest/severity-levels?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/incidents/severity_levels

**List Incident Severity Levels**
Returns a paginated list of incident severity levels configured for the company. Each severity level includes its name, notification triggers (email and push), alert recipients, and ranking order. Companies have 4-5 predefined severity levels (insignificant, minor, moderate, major, critical) that can be customized. Supports filtering by trigger flags and sorting by name.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[email_trigger]` [query] string - Return item(s) set to trigger email notifications.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[push_notification_trigger]` [query] string - Return item(s) set to trigger push notifications.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[name]

Response 200 (application/json): array of object

- `id`: integer e.g. `1`
- `name`: string - Name of the Incident Severity Level e.g. `major`
- `procore_default_name`: string enum[insignificant, minor, major, critical, moderate] - Procore default name of the Incident Severity Level e.g. `major`
- `active`: boolean - Denotes whether the Incident Severity Level is active e.g. `false`
- `email_trigger`: boolean - Denotes whether an email should be sent e.g. `false`
- `push_notification_trigger`: boolean - Denotes whether a push notification should be sent e.g. `false`
- `order`: integer - Ranking order of the Incident Severity Level
- `created_at`: string(date-time) - iso8601 timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - iso8601 timestamp of last update e.g. `2016-10-25T17:53:35Z`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/incidents/severity_levels/{id}

**Show Incident Severity Level**
Returns the specified incident severity level with full details including name, procore_default_name, notification triggers, alert recipients, active status, ranking order, and timestamps.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the incident severity level. Use the `id` from the List Severity Levels response.

Response 200 (application/json): object

- `id`: integer e.g. `1`
- `name`: string - Name of the Incident Severity Level e.g. `major`
- `procore_default_name`: string enum[insignificant, minor, major, critical, moderate] - Procore default name of the Incident Severity Level e.g. `major`
- `active`: boolean - Denotes whether the Incident Severity Level is active e.g. `false`
- `email_trigger`: boolean - Denotes whether an email should be sent e.g. `false`
- `push_notification_trigger`: boolean - Denotes whether a push notification should be sent e.g. `false`
- `order`: integer - Ranking order of the Incident Severity Level
- `created_at`: string(date-time) - iso8601 timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - iso8601 timestamp of last update e.g. `2016-10-25T17:53:35Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/incidents/severity_levels/{id}

**Update Incident Severity Level**
Updates the specified incident severity level's attributes. Allows modifying the display name, notification triggers (email_trigger, push_notification_trigger), and alert recipient list. The procore_default_name cannot be changed. Pass alert_recipient_ids as an array of Login Information IDs for users who should receive notifications when incidents are created with this severity level.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique identifier of the incident severity level. Use the `id` from the List Severity Levels response.

Request body (application/json) (required):

- `severity_level`: object (required) - Severity Level object
  - `name`: string - Display name for the severity level. Can be customized from the default (procore_default_name). e.g. `Critical`
  - `email_trigger`: boolean - When true, email notifications are sent to alert recipients when an incident is created with this severity level. e.g. `false`
  - `push_notification_trigger`: boolean - When true, push notifications are sent to alert recipients when an incident is created with this severity level. e.g. `false`
  - `alert_recipient_ids`: array of integer - Array of Login Information IDs for users who receive notifications (email and/or push) when an incident is created with this severity level. Replaces the existing alert recipient list.

Response 200 (application/json): object

- `id`: integer e.g. `1`
- `name`: string - Name of the Incident Severity Level e.g. `major`
- `procore_default_name`: string enum[insignificant, minor, major, critical, moderate] - Procore default name of the Incident Severity Level e.g. `major`
- `active`: boolean - Denotes whether the Incident Severity Level is active e.g. `false`
- `email_trigger`: boolean - Denotes whether an email should be sent e.g. `false`
- `push_notification_trigger`: boolean - Denotes whether a push notification should be sent e.g. `false`
- `order`: integer - Ranking order of the Incident Severity Level
- `created_at`: string(date-time) - iso8601 timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - iso8601 timestamp of last update e.g. `2016-10-25T17:53:35Z`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Witness Statement Attachments

Resource id: `witness-statement-attachments`. Raw spec: `../openapi-raw/witness-statement-attachments.json`. Web: https://developers.procore.com/reference/rest/witness-statement-attachments?version=latest
Product lines: Total Quality and Safety Management

### POST /rest/v1.0/projects/{project_id}/incidents/witness_statements/{witness_statement_id}/attachments

**Create Attachment**
Creates an attachment for the specified Witness Statement.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `witness_statement_id` [path] integer (required) - Witness Statement ID

Request body (application/json) (required):

- `upload_id`: string (required) - The specified upload ID is saved as Incident Witness Statement Attachment. e.g. `1ZE146W9K804SAJJZX19JVAD0R`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this incident attachment. Use as a reference when managing attachments on an action. e.g. `5324`
- `url`: string - Download URL for the full-size attachment file. e.g. `http://www.example.com/`
- `thumbnail_url`: string - URL for a large thumbnail preview of the attachment. Null if no preview is available. e.g. `http://www.example.com/`
- `name`: string - Original filename of the uploaded attachment, including file extension. e.g. `january_receipt_copy.jpg`
- `content_type`: string - MIME type of the attachment file (e.g. application/pdf, image/jpeg). e.g. `application/pdf`
- `viewable_document_id`: integer - Identifier of the associated viewable document for in-browser rendering. Null if the attachment has not been converted for viewing. e.g. `12`
- `viewable`: boolean - Indicates whether the attachment can be viewed in-browser. True if the file type supports viewing or a viewable document has been generated. e.g. `true`
- `can_be_viewed`: boolean - Indicates whether the attachment has finished processing and is ready for in-browser viewing. e.g. `true`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Witness Statements

Resource id: `witness-statements`. Raw spec: `../openapi-raw/witness-statements.json`. Web: https://developers.procore.com/reference/rest/witness-statements?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.1/projects/{project_id}/recycle_bin/incidents/witness_statements

**List Recycled Witness Statements**
Returns a list of Recycled Witness Statements for a given project (or Incident, if incident_id is present).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID. When provided, the list will be scoped to only the Recycled Witness Statements for a given Incident.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[date_received]` [query] string(date) - Return item(s) within the specified date received date range. This assumes the dates provided are in the project time zone.
- `filters[witness_id]` [query] array of integer - Return item(s) with the specified Witness (Party) ID.
- `filters[query]` [query] string - Return item(s) containing query
- `sort` [query] string enum[created_at, date_received, witness]

Response 200 (application/json): array of object

- `id`: integer - Witness Statement ID e.g. `99`
- `incident_id`: integer - Incident ID e.g. `42`
- `attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable`: boolean e.g. `true`
  - `can_be_viewed`: boolean e.g. `true`
- `statement`: string - The account of the event by the witness in rich text form. e.g. `<p>I witnessed what happened.</p>`
- `statement_plain_text`: string - The account of the event by the witness in plain text form. e.g. `I witnessed what happened.`
- `date_received`: string(date) - Date that the Witness Statement was received. e.g. `2016-10-25`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `witness`: object
  - `id`: integer e.g. `1`
  - `name`: string e.g. `John Doe`
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
- `recording`: object
  - `id`: integer - Recording ID e.g. `1`
  - `witness_statement_id`: integer - Witeness Statement ID e.g. `8`
  - `attachment`: object
    - `id`: integer - Attachment ID e.g. `30`
    - `content_type`: string - Attachment Content Type e.g. `audio/mp4`
    - `name`: string - Attachment name e.g. `attachment.mp4`
    - `thumbnail_url`: string - Attachment thumbnail URL e.g. `http://example.com/v4/d/us-east-1/attachment-thumbnail.mp4`
    - `url`: string - Attachment URL e.g. `http://example.com/v4/d/us-east-1/attachment.mp4`
    - `viewable_document_id`: integer - Attachment viewable document ID e.g. `4`
  - `captured_by`: object
    - `id`: integer e.g. `1`
    - `name`: string e.g. `John Doe`
    - `locale`: string e.g. `en-GB`
    - `login`: string e.g. `test@example.com`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/recycle_bin/incidents/witness_statements/{id}

**Show Recycled Witness Statement**
Returns a specific Recycled Witness Statement

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Witness Statement ID

Response 200 (application/json): object

- `id`: integer - Witness Statement ID e.g. `99`
- `incident_id`: integer - Incident ID e.g. `42`
- `attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable`: boolean e.g. `true`
  - `can_be_viewed`: boolean e.g. `true`
- `statement`: string - The account of the event by the witness in rich text form. e.g. `<p>I witnessed what happened.</p>`
- `statement_plain_text`: string - The account of the event by the witness in plain text form. e.g. `I witnessed what happened.`
- `date_received`: string(date) - Date that the Witness Statement was received. e.g. `2016-10-25`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `witness`: object
  - `id`: integer e.g. `1`
  - `name`: string e.g. `John Doe`
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
- `recording`: object
  - `id`: integer - Recording ID e.g. `1`
  - `witness_statement_id`: integer - Witeness Statement ID e.g. `8`
  - `attachment`: object
    - `id`: integer - Attachment ID e.g. `30`
    - `content_type`: string - Attachment Content Type e.g. `audio/mp4`
    - `name`: string - Attachment name e.g. `attachment.mp4`
    - `thumbnail_url`: string - Attachment thumbnail URL e.g. `http://example.com/v4/d/us-east-1/attachment-thumbnail.mp4`
    - `url`: string - Attachment URL e.g. `http://example.com/v4/d/us-east-1/attachment.mp4`
    - `viewable_document_id`: integer - Attachment viewable document ID e.g. `4`
  - `captured_by`: object
    - `id`: integer e.g. `1`
    - `name`: string e.g. `John Doe`
    - `locale`: string e.g. `en-GB`
    - `login`: string e.g. `test@example.com`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/recycle_bin/incidents/witness_statements/{id}/restore

**Retrieve Recycled Witness Statement**
Retrieves a specific Recycled Witness Statement from the recycle bin

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Witness Statement ID

Response 200: OK (no body)

Error responses: 401, 403, 404, 409, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/witness_statements

**List Witness Statements**
Returns a list of Witness Statements for a given project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID. When provided, the list will be scoped to only the Witness Statements for a given Incident.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[date_received]` [query] string(date) - Return item(s) within the specified date received date range. This assumes the dates provided are in the project time zone.
- `filters[witness_id]` [query] array of integer - Return item(s) with the specified Witness (Party) ID.
- `filters[query]` [query] string - Return item(s) containing query
- `sort` [query] string enum[created_at, date_received, witness]

Response 200 (application/json): array of object

- `id`: integer - Witness Statement ID e.g. `99`
- `incident_id`: integer - Incident ID e.g. `42`
- `attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable`: boolean e.g. `true`
  - `can_be_viewed`: boolean e.g. `true`
- `statement`: string - The account of the event by the witness in rich text form. e.g. `<p>I witnessed what happened.</p>`
- `statement_plain_text`: string - The account of the event by the witness in plain text form. e.g. `I witnessed what happened.`
- `date_received`: string(date) - Date that the Witness Statement was received. e.g. `2016-10-25`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `witness`: object
  - `id`: integer e.g. `1`
  - `name`: string e.g. `John Doe`
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
- `recording`: object
  - `id`: integer - Recording ID e.g. `1`
  - `witness_statement_id`: integer - Witeness Statement ID e.g. `8`
  - `attachment`: object
    - `id`: integer - Attachment ID e.g. `30`
    - `content_type`: string - Attachment Content Type e.g. `audio/mp4`
    - `name`: string - Attachment name e.g. `attachment.mp4`
    - `thumbnail_url`: string - Attachment thumbnail URL e.g. `http://example.com/v4/d/us-east-1/attachment-thumbnail.mp4`
    - `url`: string - Attachment URL e.g. `http://example.com/v4/d/us-east-1/attachment.mp4`
    - `viewable_document_id`: integer - Attachment viewable document ID e.g. `4`
  - `captured_by`: object
    - `id`: integer e.g. `1`
    - `name`: string e.g. `John Doe`
    - `locale`: string e.g. `en-GB`
    - `login`: string e.g. `test@example.com`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/incidents/witness_statements

**Create Witness Statement**
Creates a Witness Statement.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `witness_statement`: object (required)
  - `incident_id`: integer (required) - The ID of the Incident
  - `statement`: string - The account of the event by the witness in rich text form. e.g. `<p>I witnessed what happened.</p>`
  - `date_received`: string(date) - Date that the Witness Statement was received. This assumes the dates provided are in the project timezone. e.g. `2016-10-25`
  - `witness_id`: integer (required) - Witness ID e.g. `1`
  - `upload_uuids`: array of string - Array of uploaded file UUIDs.
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `recording`: object
    - `upload_id`: string - Recording Upload ID e.g. `01JBD3HF2SA3JZ5AR107GTWF4E`

Response 201 (application/json): object

- `id`: integer - Witness Statement ID e.g. `99`
- `incident_id`: integer - Incident ID e.g. `42`
- `attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable`: boolean e.g. `true`
  - `can_be_viewed`: boolean e.g. `true`
- `statement`: string - The account of the event by the witness in rich text form. e.g. `<p>I witnessed what happened.</p>`
- `statement_plain_text`: string - The account of the event by the witness in plain text form. e.g. `I witnessed what happened.`
- `date_received`: string(date) - Date that the Witness Statement was received. e.g. `2016-10-25`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `witness`: object
  - `id`: integer e.g. `1`
  - `name`: string e.g. `John Doe`
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
- `recording`: object
  - `id`: integer - Recording ID e.g. `1`
  - `witness_statement_id`: integer - Witeness Statement ID e.g. `8`
  - `attachment`: object
    - `id`: integer - Attachment ID e.g. `30`
    - `content_type`: string - Attachment Content Type e.g. `audio/mp4`
    - `name`: string - Attachment name e.g. `attachment.mp4`
    - `thumbnail_url`: string - Attachment thumbnail URL e.g. `http://example.com/v4/d/us-east-1/attachment-thumbnail.mp4`
    - `url`: string - Attachment URL e.g. `http://example.com/v4/d/us-east-1/attachment.mp4`
    - `viewable_document_id`: integer - Attachment viewable document ID e.g. `4`
  - `captured_by`: object
    - `id`: integer e.g. `1`
    - `name`: string e.g. `John Doe`
    - `locale`: string e.g. `en-GB`
    - `login`: string e.g. `test@example.com`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/incidents/witness_statements/{id}

**Show Witness Statement**
Returns the specified Witness Statement

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Witness Statement ID

Response 200 (application/json): object

- `id`: integer - Witness Statement ID e.g. `99`
- `incident_id`: integer - Incident ID e.g. `42`
- `attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable`: boolean e.g. `true`
  - `can_be_viewed`: boolean e.g. `true`
- `statement`: string - The account of the event by the witness in rich text form. e.g. `<p>I witnessed what happened.</p>`
- `statement_plain_text`: string - The account of the event by the witness in plain text form. e.g. `I witnessed what happened.`
- `date_received`: string(date) - Date that the Witness Statement was received. e.g. `2016-10-25`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `witness`: object
  - `id`: integer e.g. `1`
  - `name`: string e.g. `John Doe`
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
- `recording`: object
  - `id`: integer - Recording ID e.g. `1`
  - `witness_statement_id`: integer - Witeness Statement ID e.g. `8`
  - `attachment`: object
    - `id`: integer - Attachment ID e.g. `30`
    - `content_type`: string - Attachment Content Type e.g. `audio/mp4`
    - `name`: string - Attachment name e.g. `attachment.mp4`
    - `thumbnail_url`: string - Attachment thumbnail URL e.g. `http://example.com/v4/d/us-east-1/attachment-thumbnail.mp4`
    - `url`: string - Attachment URL e.g. `http://example.com/v4/d/us-east-1/attachment.mp4`
    - `viewable_document_id`: integer - Attachment viewable document ID e.g. `4`
  - `captured_by`: object
    - `id`: integer e.g. `1`
    - `name`: string e.g. `John Doe`
    - `locale`: string e.g. `en-GB`
    - `login`: string e.g. `test@example.com`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/incidents/witness_statements/{id}

**Update Witness Statement**
Updates the specified Witness Statement

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Witness Statement ID

Request body (application/json) (required):

- `witness_statement`: object (required)
  - `statement`: string - The account of the event by the witness in rich text form. e.g. `<p>I witnessed what happened.</p>`
  - `date_received`: string(date) - Date that the Witness Statement was received. This assumes the dates provided are in the project timezone. e.g. `2016-10-25`
  - `witness_id`: integer - Witness ID e.g. `1`
  - `upload_uuids`: array of string - Array of uploaded file UUIDs.
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `recording`: object
    - `upload_id`: string - Recording Upload ID e.g. `01JBD3HF2SA3JZ5AR107GTWF4E`

Response 200 (application/json): object

- `id`: integer - Witness Statement ID e.g. `99`
- `incident_id`: integer - Incident ID e.g. `42`
- `attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable`: boolean e.g. `true`
  - `can_be_viewed`: boolean e.g. `true`
- `statement`: string - The account of the event by the witness in rich text form. e.g. `<p>I witnessed what happened.</p>`
- `statement_plain_text`: string - The account of the event by the witness in plain text form. e.g. `I witnessed what happened.`
- `date_received`: string(date) - Date that the Witness Statement was received. e.g. `2016-10-25`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `witness`: object
  - `id`: integer e.g. `1`
  - `name`: string e.g. `John Doe`
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
- `recording`: object
  - `id`: integer - Recording ID e.g. `1`
  - `witness_statement_id`: integer - Witeness Statement ID e.g. `8`
  - `attachment`: object
    - `id`: integer - Attachment ID e.g. `30`
    - `content_type`: string - Attachment Content Type e.g. `audio/mp4`
    - `name`: string - Attachment name e.g. `attachment.mp4`
    - `thumbnail_url`: string - Attachment thumbnail URL e.g. `http://example.com/v4/d/us-east-1/attachment-thumbnail.mp4`
    - `url`: string - Attachment URL e.g. `http://example.com/v4/d/us-east-1/attachment.mp4`
    - `viewable_document_id`: integer - Attachment viewable document ID e.g. `4`
  - `captured_by`: object
    - `id`: integer e.g. `1`
    - `name`: string e.g. `John Doe`
    - `locale`: string e.g. `en-GB`
    - `login`: string e.g. `test@example.com`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/incidents/witness_statements/{id}

**Destroy Witness Statement**
Sends the specified Witness Statement to the Recycle Bin

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Witness Statement ID

Response 204: No Content (no body)

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/incidents/witness_statements  **[OLDER VERSION - a newer path version exists below/above]**

**List Recycled Witness Statements**
Returns a list of Recycled Witness Statements for a given project (or Incident, if incident_id is present).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `incident_id` [query] integer - Incident ID. When provided, the list will be scoped to only the Recycled Witness Statements for a given Incident.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[date_received]` [query] string(date) - Return item(s) within the specified date received date range. This assumes the dates provided are in the project time zone.
- `filters[witness_id]` [query] array of integer - Return item(s) with the specified Witness (Party) ID.
- `filters[query]` [query] string - Return item(s) containing query
- `sort` [query] string enum[created_at, date_received, witness]
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Witness Statement ID e.g. `99`
- `incident_id`: integer - Incident ID e.g. `42`
- `attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable`: boolean e.g. `true`
  - `can_be_viewed`: boolean e.g. `true`
- `statement`: string - The account of the event by the witness in rich text form. e.g. `<p>I witnessed what happened.</p>`
- `statement_plain_text`: string - The account of the event by the witness in plain text form. e.g. `I witnessed what happened.`
- `date_received`: string(date) - Date that the Witness Statement was received. e.g. `2016-10-25`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `witness`: object
  - `id`: integer e.g. `1`
  - `name`: string e.g. `John Doe`
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
- `recording`: object
  - `id`: integer - Recording ID e.g. `1`
  - `witness_statement_id`: integer - Witeness Statement ID e.g. `8`
  - `attachment`: object
    - `id`: integer - Attachment ID e.g. `30`
    - `content_type`: string - Attachment Content Type e.g. `audio/mp4`
    - `name`: string - Attachment name e.g. `attachment.mp4`
    - `thumbnail_url`: string - Attachment thumbnail URL e.g. `http://example.com/v4/d/us-east-1/attachment-thumbnail.mp4`
    - `url`: string - Attachment URL e.g. `http://example.com/v4/d/us-east-1/attachment.mp4`
    - `viewable_document_id`: integer - Attachment viewable document ID e.g. `4`
  - `captured_by`: object
    - `id`: integer e.g. `1`
    - `name`: string e.g. `John Doe`
    - `locale`: string e.g. `en-GB`
    - `login`: string e.g. `test@example.com`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/incidents/witness_statements/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Show Recycled Witness Statement**
Returns a specific Recycled Witness Statement

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Witness Statement ID

Response 200 (application/json): object

- `id`: integer - Witness Statement ID e.g. `99`
- `incident_id`: integer - Incident ID e.g. `42`
- `attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable`: boolean e.g. `true`
  - `can_be_viewed`: boolean e.g. `true`
- `statement`: string - The account of the event by the witness in rich text form. e.g. `<p>I witnessed what happened.</p>`
- `statement_plain_text`: string - The account of the event by the witness in plain text form. e.g. `I witnessed what happened.`
- `date_received`: string(date) - Date that the Witness Statement was received. e.g. `2016-10-25`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2016-10-25T17:53:35Z`
- `witness`: object
  - `id`: integer e.g. `1`
  - `name`: string e.g. `John Doe`
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
- `recording`: object
  - `id`: integer - Recording ID e.g. `1`
  - `witness_statement_id`: integer - Witeness Statement ID e.g. `8`
  - `attachment`: object
    - `id`: integer - Attachment ID e.g. `30`
    - `content_type`: string - Attachment Content Type e.g. `audio/mp4`
    - `name`: string - Attachment name e.g. `attachment.mp4`
    - `thumbnail_url`: string - Attachment thumbnail URL e.g. `http://example.com/v4/d/us-east-1/attachment-thumbnail.mp4`
    - `url`: string - Attachment URL e.g. `http://example.com/v4/d/us-east-1/attachment.mp4`
    - `viewable_document_id`: integer - Attachment viewable document ID e.g. `4`
  - `captured_by`: object
    - `id`: integer e.g. `1`
    - `name`: string e.g. `John Doe`
    - `locale`: string e.g. `en-GB`
    - `login`: string e.g. `test@example.com`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/recycle_bin/incidents/witness_statements/{id}/restore  **[OLDER VERSION - a newer path version exists below/above]**

**Retrieve Recycled Witness Statement**
Retrieves a specific Recycled Witness Statement from the recycle bin

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `incident_id` [query] integer - Incident ID
- `id` [path] integer (required) - Witness Statement ID

Response 200: OK (no body)

Error responses: 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Work Activities

Resource id: `work-activities`. Raw spec: `../openapi-raw/work-activities.json`. Web: https://developers.procore.com/reference/rest/work-activities?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/incidents/work_activities

**List Work Activities**
Return a list of all Work Activities associated with a Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[active]` [query] boolean - If true, returns item(s) with a status of 'active'.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[name]

Response 200 (application/json): array of object

- `id`: integer - Work Activity ID e.g. `999`
- `name`: string - Work Activity Name e.g. `Earthwork`
- `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
- `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/incidents/work_activities

**Create Work Activity**
Creates a Work Activity with the specified name.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `work_activity`: object (required) - Work Activity object
  - `name`: string (required) - The Name of the Work Activity
  - `active`: boolean - Flag that denotes if the Work Activity is available for use

Response 201 (application/json): object

- `id`: integer - Work Activity ID e.g. `999`
- `name`: string - Work Activity Name e.g. `Earthwork`
- `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
- `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/incidents/work_activities/{id}

**Show Work Activity**
Returns the specified Work Activity.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Work Activity ID

Response 200 (application/json): object

- `id`: integer - Work Activity ID e.g. `999`
- `name`: string - Work Activity Name e.g. `Earthwork`
- `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
- `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/incidents/work_activities/{id}

**Update Work Activity**
Updates a specified Work Activity. Note that Procore provided Work Activities' names cannot be changed.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Work Activity ID

Request body (application/json) (required):

- `work_activity`: object (required) - Work Activity object
  - `name`: string (required) - The Name of the Work Activity
  - `active`: boolean - Flag that denotes if the Work Activity is available for use

Response 200 (application/json): object

- `id`: integer - Work Activity ID e.g. `999`
- `name`: string - Work Activity Name e.g. `Earthwork`
- `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
- `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/incidents/work_activities/{id}

**Delete Work Activity**
Deletes a Work Activity. Note that Procore provided Work Activities cannot be deleted.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Work Activity ID

Response 204: No Content (no body)

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/incidents/work_activities/bulk_update

**Bulk Update Work Activities**
Update multiple Work Activities with one request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `work_activity`: object (required) - IDs of all Work Activities specified for bulk update
  - `ids`: array of integer
  - `active`: boolean - Flag that denotes if the Work Activities are available for use

Response 200 (application/json): array of object

- `id`: integer - Work Activity ID e.g. `999`
- `name`: string - Work Activity Name e.g. `Earthwork`
- `active`: boolean - Represents whether a Work Activity is available for use. e.g. `true`
- `global`: boolean - Represents whether a Work Activity has been provided by Procore. e.g. `true`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Date the work activity was updated e.g. `2015-11-12T21:26:28Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

