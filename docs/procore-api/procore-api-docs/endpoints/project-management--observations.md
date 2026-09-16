# Procore API: Observations (Project Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Observations)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Company Observation Templates](#company-observation-templates) - versions 1.0
- [Company Observation Types](#company-observation-types) - versions 1.0
- [Observations](#observations) - versions 1.0
- [Observations Assignees](#observations-assignees) - versions 1.0
- [Project Observation Templates](#project-observation-templates) - versions 1.0
- [Project Observation Types](#project-observation-types) - versions 1.0

## Company Observation Templates

Resource id: `company-observation-templates`. Raw spec: `../openapi-raw/company-observation-templates.json`. Web: https://developers.procore.com/reference/rest/company-observation-templates?version=latest
Product lines: Total Quality and Safety Management

### PATCH /rest/v1.0/companies/{company_id}/observation_templates/bulk_update

**Bulk Update Company Observation Templates**
Sets the same Trade on several Company Observation Templates in one request. `trade_id` is the only attribute this endpoint changes; a Trade that does not belong to the Company is rejected with a `422` before any template is written.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `observation_template_ids` [query] array of integer - IDs of the Company Observation Templates to update. Comma-separate to include several. Templates not owned by this Company are silently skipped.

Request body (application/json) (required):

- `observation_template`: object (required)
  - `trade_id`: integer - ID of the Trade to set on every template in `observation_template_ids`. Must belong to this Company. e.g. `54`

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this Company Observation Template. Pass as the `{id}` path parameter to `GET /rest/v1.0/companies/{company_id}/observation_templates/{id}`. e.g. `1738`
- `observation_title`: string - Title pre-filled on Observations created from this template, and inherited by any Project Observation Template cloned from it. e.g. `Worker seen not wearing PPE`
- `observation_type`: object - Observation Type applied to Observations created from this template.
  - `id`: integer - Unique identifier for this Company Observation Type. Pass as `observation_template[observation_type_id]` when creating an Observation Template, or as `observation[type_id]` when creating an Observation Item on a Proje... e.g. `2020`
  - `name`: string - Display name of the Observation Type, localized to the requesting user's locale when a translation exists. e.g. `Air Quality`
  - `localized_name`: string - Type name resolved for the locale of the request, falling back to the Company default and then the stored name. Display this to end users rather than reimplementing the fallback chain. e.g. `Air Quality`
  - `category`: string - Localized display name of the type's Observations Category. Procore ships six built-in categories (Quality, Safety, Commissioning, Warranty, Work to Complete, Environmental), but companies can define additional catego... e.g. `Environmental`
  - `category_key`: string - Stable, unlocalized key of the type's Observations Category. Prefer this over `category` when branching on category in code. e.g. `environmental`
  - `category_id`: integer - ID of the Observations Category this type belongs to. Corresponds to the `id` returned by `GET /rest/v2.0/companies/{company_id}/observations/categories`. e.g. `13`
  - `company_active`: boolean - Whether the type is active at the Company level. For a company-level type this always matches `active`; the two diverge only when the same type is read in a Project scope where it has been deactivated. e.g. `true`
  - `active`: boolean - Whether the type can be selected on new Observations. Inactive types are still returned so existing Observations render correctly. e.g. `true`
  - `kind`: string enum[company, project] - Whether the type is owned by the Company or defined on a single Project. Always `company` for records returned by the Company Observation Types endpoint. e.g. `company`
  - `parent_inactive`: boolean - Whether the type's parent company-level type has been deactivated. Always false here, since Company Observation Types have no parent. e.g. `false`
  - `in_use`: boolean - Whether at least one Observation Item currently references this type or one of its project-level children. Use to warn before deactivating or deleting a type. e.g. `false`
  - `name_translations`: object - Company-authored translations of the type name, keyed by locale code (for example `en`, `es`, `fr-CA`). Null when the Company has not configured custom translations for this type. e.g. `{"en": "Air Quality", "es": "Calidad del aire"}`
- `trade`: object - Trade applied to Observations created from this template. Null when the template does not set a Trade. This is the only attribute the bulk update endpoint changes.
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Observation Types

Resource id: `company-observation-types`. Raw spec: `../openapi-raw/company-observation-types.json`. Web: https://developers.procore.com/reference/rest/company-observation-types?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/observation_types

**List Company Observation Types**
Returns every Observation Type defined at the Company level, including deactivated ones. Company types are the pool that individual Projects activate from; use `GET /rest/v1.0/projects/{project_id}/observation_types` to see what is actually selectable on a given Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this Company Observation Type. Pass as `observation_template[observation_type_id]` when creating an Observation Template, or as `observation[type_id]` when creating an Observation Item on a Proje... e.g. `2020`
- `name`: string - Display name of the Observation Type, localized to the requesting user's locale when a translation exists. e.g. `Air Quality`
- `localized_name`: string - Type name resolved for the locale of the request, falling back to the Company default and then the stored name. Display this to end users rather than reimplementing the fallback chain. e.g. `Air Quality`
- `category`: string - Localized display name of the type's Observations Category. Procore ships six built-in categories (Quality, Safety, Commissioning, Warranty, Work to Complete, Environmental), but companies can define additional catego... e.g. `Environmental`
- `category_key`: string - Stable, unlocalized key of the type's Observations Category. Prefer this over `category` when branching on category in code. e.g. `environmental`
- `category_id`: integer - ID of the Observations Category this type belongs to. Corresponds to the `id` returned by `GET /rest/v2.0/companies/{company_id}/observations/categories`. e.g. `13`
- `company_active`: boolean - Whether the type is active at the Company level. For a company-level type this always matches `active`; the two diverge only when the same type is read in a Project scope where it has been deactivated. e.g. `true`
- `active`: boolean - Whether the type can be selected on new Observations. Inactive types are still returned so existing Observations render correctly. e.g. `true`
- `kind`: string enum[company, project] - Whether the type is owned by the Company or defined on a single Project. Always `company` for records returned by the Company Observation Types endpoint. e.g. `company`
- `parent_inactive`: boolean - Whether the type's parent company-level type has been deactivated. Always false here, since Company Observation Types have no parent. e.g. `false`
- `in_use`: boolean - Whether at least one Observation Item currently references this type or one of its project-level children. Use to warn before deactivating or deleting a type. e.g. `false`
- `name_translations`: object - Company-authored translations of the type name, keyed by locale code (for example `en`, `es`, `fr-CA`). Null when the Company has not configured custom translations for this type. e.g. `{"en": "Air Quality", "es": "Calidad del aire"}`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Observations

Resource id: `observations`. Raw spec: `../openapi-raw/observations.json`. Web: https://developers.procore.com/reference/rest/observations?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/observations/category_configurable_field_sets

**List Observation Category Configurable Field Sets**
Returns a collection of Observation Category Configurable Field Sets from the Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer (required) - Observation Cateogry Configurable Field Set e.g. `4`
- `category`: string enum[Quality, Safety, Commissioning, Warranty, Work To Complete, Environmental] (required) - Observation Cateogry Configurable Field Set category e.g. `Commissioning`
- `category_key`: string - Observation Type category (snake_case) e.g. `work_to_complete`
- `observations_category_id`: integer - The unique identifier of the observations category. e.g. `1`
- `configurable_field_set`: object (required)
  - `id`: integer - The unique identifier of the configurable field set. e.g. `999`
  - `name`: string - The name of the configurable field set. e.g. `Observation Fields`
  - `category`: string - Specifies the category for the configurable field set if it exists or an empty string. This property was added for the ConfigurableFieldSet::Observations::Item class. e.g. `commissioning`
  - `class_name`: string - Specifies the class the configurable field set is associated with. e.g. `Observations::Item`
  - `fields`: object - Specifies the hash of fields on an object. This is for example purposes only.
    - `field_1`: object - The first Observation Field object.
    - `custom_field_1`: object - Custom Field object for an existing custom field in this configurable field set object.
  - `sections`: array of object - An array of sections that are used for custom fields.
    - `id`: integer - The unique identifier of the section. e.g. `1`
    - `name`: string - The name of the section. e.g. `Section 1`
    - `description`: string - The description of the section. e.g. `Project ABC`
    - `position`: integer - The display position of the section, which is sorted ascending, lowest position is visually the top of the page. e.g. `999`
    - `from_v1_custom_fields`: boolean - If field was migrated from a v1 custom field. e.g. `false`
  - `inspection_type_id`: integer - The unique identifier of the inspection type. e.g. `1`
  - `generic_tool_id`: integer - The unique idenfitier of the generic tool. e.g. `1`
  - `action_plan_type_id`: integer - The unique idenfitier of the action plan type. e.g. `1`
  - `observations_category_id`: integer - The unique identifier of the observations category. e.g. `1`
  - `type`: string - Specificies the type the configurable field set is associated with. e.g. `ConfigurabkeFieldSet::Observations::Item`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/observations/default_distribution

**List Observation Default Distribution Members**
Returns a collection of Users that are of the Observations Default Distribution list

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - User ID. Pass inside `observation[distribution_member_ids]` when creating or updating an Observation Item, or inside `default_distribution` when updating the Project's Observations configuration. e.g. `160586`
- `login`: string - Email address Observation notifications are sent to. e.g. `example@example.com`
- `name`: string - User's name, formatted first-name-first. e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/observations/items/{id}/pdf

**Get Observation Item PDF url**
Generates a PDF of a single Observation Item and returns a time-limited download URL. This also records a "PDF shared" entry in the Observation's change history, so treat it as an action rather than a cacheable read.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Observation Item ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID of the Observation Item the PDF was generated for. e.g. `9`
- `url`: string - Deprecated — not returned by this endpoint. Use `pdf_url`. e.g. `https://www.example.com`
- `pdf_url`: string - Time-limited URL for downloading the generated PDF. Requesting this endpoint also records a "PDF shared" entry in the Observation's change history, so treat it as an action rather than a cacheable read. e.g. `https://storage.procore.com/observation-9378.pdf`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/observations/items/{item_id}/response_logs

**List Observation Item Response Logs**
Returns a collection of Response Logs for a given Observation Item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `item_id` [path] integer (required) - Observation Item ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this Response Log entry. Pass as the `{id}` path parameter to `GET /rest/v1.0/observations/items/{item_id}/response_logs/{id}`. e.g. `2974`
- `item_id`: integer - ID of the Observation Item this Response Log belongs to. Use as the `{item_id}` path parameter when reading sibling Response Logs. e.g. `49`
- `status`: string enum[Initiated, Ready For Review, Not Accepted, Closed, Draft] - Status the Observation was moved to by this Response Log, stored in title-cased form. Comment-only entries carry the Observation's status at the time the comment was posted. Note the casing differs from the `snake_cas... e.g. `Ready For Review`
- `comment`: string - Free-text note recorded with this Response Log. Null when the entry was generated by a status change with no accompanying comment. e.g. `See the attached photo for issue resolution.`
- `created_at`: string(date-time) - ISO 8601 timestamp of when the Response Log was recorded. Response Logs are returned oldest-first, so this doubles as the activity-feed ordering key. e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Deprecated — not returned by this endpoint. Response Logs are immutable once created; use `created_at`. e.g. `2012-10-23T21:39:40Z`
- `created_by_name`: string - Deprecated — not returned by this endpoint. Use `created_by.name`. e.g. `John Smith`
- `attachments`: array of oneOf(object | object) - Files attached to this Response Log. Each entry is either a Procore-stored file or a Procore Document Management document reference. Add attachments on create with `response_log[upload_ids]` or `response_log[document_...
- `created_by`: object - User who recorded this Response Log.
  - `id`: integer - User ID of the author. e.g. `973`
  - `name`: string - Author's name as captured when the Response Log was created. Stored on the record, so it does not change if the user is later renamed. e.g. `John Smith`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/observations/items/{item_id}/response_logs

**Create Observation Item Response Log**
Adds a comment and/or status change to an Observation Item's activity feed. Supplying a top-level `status` also moves the Observation itself to that status. Notifies the Observation's distribution list.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `item_id` [path] integer (required) - Observation Item ID
- `run_configurable_validations` [query] boolean - Whether or not Configurable validations from the Observation Items Category Configurable Field Set should be run (default: false). See (https://developers.procore.com/reference/observations#list-observation-category-c...

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the Observation Item Response Log belongs to e.g. `123456`
- `response_log`: object (required) - Response Log body
  - `comment`: string - The Comments of the Response Log e.g. `Response log comment`
  - `prostore_file_ids`: array of integer - An array of the Attachment IDs e.g. `[123, 456]`
  - `upload_ids`: array of string - An array of the Attachment Upload IDs e.g. `["1ZE146W9K804SAJJZX19JVAD0R"]`
  - `document_management_document_revision_ids`: array of string - PDM document revision IDs to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`
- `status`: string enum[initiated, ready_for_review, not_accepted, closed, draft] - The Status of the Observation e.g. `initiated`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this Response Log entry. Pass as the `{id}` path parameter to `GET /rest/v1.0/observations/items/{item_id}/response_logs/{id}`. e.g. `2974`
- `item_id`: integer - ID of the Observation Item this Response Log belongs to. Use as the `{item_id}` path parameter when reading sibling Response Logs. e.g. `49`
- `status`: string enum[Initiated, Ready For Review, Not Accepted, Closed, Draft] - Status the Observation was moved to by this Response Log, stored in title-cased form. Comment-only entries carry the Observation's status at the time the comment was posted. Note the casing differs from the `snake_cas... e.g. `Ready For Review`
- `comment`: string - Free-text note recorded with this Response Log. Null when the entry was generated by a status change with no accompanying comment. e.g. `See the attached photo for issue resolution.`
- `created_at`: string(date-time) - ISO 8601 timestamp of when the Response Log was recorded. Response Logs are returned oldest-first, so this doubles as the activity-feed ordering key. e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Deprecated — not returned by this endpoint. Response Logs are immutable once created; use `created_at`. e.g. `2012-10-23T21:39:40Z`
- `created_by_name`: string - Deprecated — not returned by this endpoint. Use `created_by.name`. e.g. `John Smith`
- `attachments`: array of oneOf(object | object) - Files attached to this Response Log. Each entry is either a Procore-stored file or a Procore Document Management document reference. Add attachments on create with `response_log[upload_ids]` or `response_log[document_...
- `created_by`: object - User who recorded this Response Log.
  - `id`: integer - User ID of the author. e.g. `973`
  - `name`: string - Author's name as captured when the Response Log was created. Stored on the record, so it does not change if the user is later renamed. e.g. `John Smith`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/observations/items

**List Observation Items**
Returns a collection of Observation Items.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[assignee_company_id]` [query] array of integer - Array of Vendor IDs. Returns item(s) where the assignee is associated to the specified Vendor ID.
- `filters[checklist_list_id]` [query] array of string - Array of Checklist List IDs. Return item(s) associated with the specified Checklist List IDs.
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[location_id]` [query] array of integer - Return item(s) with the specified Location IDs.
- `filters[assignee_id]` [query] array of integer - Return item(s) assigned to the specified User ID.
- `filters[checklist_item_id]` [query] integer - Return Observations(s) originating from the specified Checklist Item(s).
- `filters[custom_fields]` [query] object - Return Observation Items whose custom field values match the supplied JSON object. The object is keyed by custom field definition ID. Matching uses JSONB containment, so only item(s) containing all of the supplied key...
- `filters[priority]` [query] array of string enum[Low, Medium, High, Urgent] - Return only Observation Items at the given priorities. Values are case-sensitive and match the `priority` field on the Observation. Comma-separate values to match several priorities, e.g. `filters[priority]=High,Urgent`.
- `filters[search]` [query] string - Return item(s) matching the specified Search query.
- `filters[status]` [query] array of integer enum[0, 1, 2, 3, 4] - Return only Observation Items in the given lifecycle states. Statuses are supplied as their integer codes: ``` 0: Initiated 1: Ready For Review 2: Not Accepted 3: Closed 4: Draft ``` Comma-separate values to match sev...
- `filters[type_id]` [query] array of integer - Return item(s) with the specified Observation Type ID.
- `filters[trade_ids]` [query] array of integer - Array of Trade IDs. Returns item(s) with the specified Trade IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[assignee, assignee_company, contributing_behavior, contributing_condition, created_at, created_by, date_notified, due_date, hazard, location, name, number, ...] - Sort item(s) by an attribute. The default sort is ascending. To sort in descending order, prepend the sort value with a hyphen character '-'. Default sort is number ascending.
- `view` [query] string enum[base, compact, full, ids, normal, permissions, safety_hub, web] - Controls how much of each Observation is returned. `normal` (the default) returns the documented response body. `ids` returns a bare array of Observation IDs — by far the cheapest option when you only need to know whi...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this Observation Item. Pass as the `{id}` path parameter to `GET /rest/v1.0/observations/items/{id}`, or as `filters[id]` to narrow a list request. e.g. `9378`
- `created_at`: string(date-time) - ISO 8601 timestamp of when the Observation was created. e.g. `2012-10-23T21:39:40Z`
- `closed_at`: string(date-time) - ISO 8601 timestamp of when the Observation last moved to `closed`. Null if the Observation has never been closed. e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - ISO 8601 timestamp of when the Observation was sent to the recycle bin. Null for active Observations. e.g. `2017-07-29T21:39:40Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the last change to the Observation. Use with `filters[updated_at]` to poll for incremental changes. e.g. `2012-10-24T21:39:40Z`
- `number`: string - Human-facing identifier of the Observation within its Project. Sortable via `sort=number`, which is also the default sort. e.g. `87`
- `name`: string - Short title of the Observation, shown as the row label in the Observations list. e.g. `Personnel not wearing full PPE`
- `description`: string - Plain-text rendering of the Observation description, with HTML markup stripped. Use `description_rich_text` to render formatted content. e.g. `Worker was seen not wearing their hard hat`
- `description_rich_text`: string - Sanitized HTML version of the Observation description, safe to render in a rich-text viewer. e.g. `<p>Worker was seen not wearing their hard hat</p>`
- `status`: string enum[initiated, ready_for_review, not_accepted, closed, draft] - Current lifecycle state of the Observation. `draft` is only produced for Observations governed by a workflow that has not yet been started. Filter collections with `filters[status]`. e.g. `initiated`
- `priority`: string enum[Low, Medium, High, Urgent] - Urgency assigned to the Observation. Filter collections with `filters[priority]` and sort with `sort=priority`. e.g. `High`
- `date_notified`: string(date) - Date the current assignee was last notified by email. Null while the Observation is unsent — those are the Observations returned by `POST /rest/v1.0/observations/items/send_unsent`. e.g. `2016-02-17`
- `due_date`: string(date) - Date the assignee is expected to resolve the Observation. Defaults from the Project's Observations configuration `days_due_default`. e.g. `2016-02-22`
- `personal`: boolean - Whether the Observation is private. Private Observations are visible only to their creator, assignees, distribution members, and Observations admins. e.g. `false`
- `origin`: object - The record this Observation was created from. Null when the Observation was created directly in the Observations tool. `payload` keys vary by `type`.
  - `type`: string enum[incident, bim_model, inspection, coordination_issue] - Kind of record the Observation originated from. e.g. `inspection`
  - `payload`: object - Identifiers for the originating record. Only the keys relevant to `type` are present.
    - `checklist_item_id`: integer - ID of the source Checklist Item. Present when `type` is `inspection`. e.g. `42`
    - `checklist_list_id`: integer - ID of the source Checklist List. Present when `type` is `inspection`. e.g. `42`
    - `coordination_issue_id`: integer - ID of the source Coordination Issue. Present when `type` is `coordination_issue`. e.g. `1231`
    - `coordination_issue_number`: integer - Display number of the source Coordination Issue. Present when `type` is `coordination_issue`. e.g. `42`
    - `incident_action_id`: integer - ID of the source Incident Action. Present when `type` is `incident`. e.g. `53`
    - `incident_id`: integer - ID of the Incident owning the source Incident Action. Present when `type` is `incident`. e.g. `53`
    - `bim_model_id`: integer - ID of the source BIM Model. Present when `type` is `bim_model`. e.g. `63`
    - `bim_model_name`: string - Title of the source BIM Model. Present when `type` is `bim_model`. e.g. `Combined Model`
- `assignee`: object - Most recently added assignee. Null when the Observation has no assignees. Read the full list from `assignees`.
  - `id`: integer - User ID of the assignee. Matches an `id` from `GET /rest/v1.0/observations/assignees`. e.g. `9378`
  - `name`: string - Assignee's name, formatted first-name-first. e.g. `Katrina Smith`
  - `vendor`: object - Company the assignee belongs to. Null when the assignee is not associated with a vendor.
    - `id`: integer - Vendor ID of the assignee's company. e.g. `2675`
    - `name`: string - Name of the assignee's company. e.g. `Brick and Morty`
- `assignees`: array of object - Every user currently assigned to the Observation, most recently added first. Empty when the Observation is unassigned. Set with `observation[assignee_ids]`.
  - `id`: integer - User ID of the assignee. e.g. `9378`
  - `name`: string - Assignee's name, formatted first-name-first. e.g. `Katrina Smith`
  - `current`: boolean - Whether the assignee is on the active workflow step. True for assignees outside a workflow. e.g. `true`
  - `vendor`: object - Company the assignee belongs to. Null when the assignee is not associated with a vendor.
    - `id`: integer - Vendor ID of the assignee's company. e.g. `2675`
    - `name`: string - Name of the assignee's company. e.g. `Brick and Morty`
- `created_by`: object - User recorded as the author of the Observation.
  - `id`: integer - User ID of the creator. e.g. `160586`
  - `login`: string - Email address the creator signs in with. e.g. `carl.contractor@example.com`
  - `name`: string - Creator's name, formatted first-name-first. e.g. `Carl Contractor`
  - `company_name`: string - Name of the vendor the creator belongs to in this Procore company directory. Null when the creator is not associated with a vendor. e.g. `Brick and Morty`
- `location`: object - Location the Observation was recorded at. Null when no location is set. Filter collections with `filters[location_id]`.
  - `id`: integer - ID of the Location. Pass as `observation[location_id]` on create or update. e.g. `15504`
  - `name`: string - Full multi-tier path of the Location, tiers joined with `>`. e.g. `Building A>Level 2`
  - `node_name`: string - Name of the deepest Location tier only, without its ancestors. e.g. `Level 2`
  - `parent_id`: integer - ID of the parent Location tier. Null for a top-level Location. Use to walk the Location hierarchy. e.g. `788866`
  - `created_at`: string(date-time) - ISO 8601 timestamp of when the Location was created. e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - ISO 8601 timestamp of the last change to the Location. e.g. `2016-08-01T23:33:54Z`
- `specification_section`: object - Specification Section the Observation references. Null when no section is set.
  - `id`: integer - ID of the Specification Section. e.g. `4521`
  - `description`: string - Title of the Specification Section. e.g. `Acoustical Panel Ceilings`
  - `number`: string - Section number as printed in the specification book. e.g. `09 51 00`
  - `latest_revision_url`: string - Time-limited URL to the PDF of the section's current revision. Null when the section has no uploaded revision. e.g. `https://storage.procore.com/spec-section.pdf`
  - `current_revision_id`: integer - ID of the section's current revision. Null when the section has no revisions. e.g. `42`
  - `viewable_document_id`: integer - ID of the viewable document generated for the current revision, for use with the document viewer. Null while conversion is pending. e.g. `42`
- `trade`: object - Trade responsible for the Observation. Null when no trade is set. Filter collections with `filters[trade_ids]`.
  - `id`: integer - ID of the Trade. Pass as `observation[trade_id]` on create or update. e.g. `999`
  - `name`: string - Display name of the Trade. e.g. `09 - acoustical panels`
  - `active`: boolean - Whether the Trade can still be selected on new records. Inactive Trades remain on existing Observations. e.g. `true`
  - `updated_at`: string(date-time) - ISO 8601 timestamp of the last change to the Trade. e.g. `2016-08-01T23:33:54Z`
- `category`: object - Observations Category of this Observation's type, flattened for convenience. Null when the Observation has no type. Use `grouping` to route the item to the Quality or Safety area when the Company has group split enabled.
  - `name`: string - Stable, unlocalized name of the Observations Category. e.g. `commissioning`
  - `grouping`: string enum[quality, safety] - Top-level bucket the Observations Category rolls up to. e.g. `quality`
- `type`: object - Observation Type classifying this Observation.
  - `id`: integer (required) - ID of the Observation Type. Pass as `observation[type_id]` on create or update, or as `filters[type_id]` when listing. e.g. `9`
  - `category`: string (required) - Localized display name of the type's Observations Category. Companies can define their own categories, so treat this as free-form text; use `category_key` for programmatic comparisons. e.g. `Commissioning`
  - `category_key`: string - Stable, unlocalized key of the type's Observations Category. Prefer this over `category` when branching on category in code. e.g. `work_to_complete`
  - `category_id`: integer - Deprecated — not returned by this endpoint. Use `type.observations_category.id`. e.g. `13`
  - `name`: string (required) - Display name of the Observation Type, localized where a translation exists. e.g. `Commissioning`
  - `observations_category`: object - The Observations Category the type belongs to. Managed via `GET /rest/v2.0/companies/{company_id}/observations/categories`.
    - `id`: integer - ID of the Observations Category. e.g. `13`
    - `name`: string - Stable, unlocalized name of the category. e.g. `commissioning`
    - `grouping`: string enum[quality, safety] - Top-level bucket the category rolls up to. e.g. `quality`
    - `updated_at`: string(date-time) - ISO 8601 timestamp of the last change to the category. e.g. `2016-08-01T23:33:54Z`
  - `active`: boolean - Whether the type can be selected on new Observations in this Project. Inactive types are still returned so existing Observations render correctly. e.g. `true`
  - `company_active`: boolean - Whether the type is active at the Company level, ignoring any project-level override. Compare with `active` to detect a type enabled company-wide but switched off for this Project. e.g. `true`
  - `parent_inactive`: boolean - True when this is a project-level type whose parent company-level type has been deactivated. e.g. `false`
  - `in_use`: boolean - Whether at least one Observation references this type. Always true here, since the Observation being serialized uses it. e.g. `true`
  - `kind`: string enum[company, project] - Whether the type is owned by the Company or defined on a single Project. e.g. `project`
  - `name_translations`: object - Company-authored translations of the type name, keyed by locale code. Null when the Company has not configured custom translations for this type. Additional locale keys beyond those listed may be present.
    - `en`: string - Translation of the type name for the `en` locale. e.g. `Commissioning`
    - `es`: string - Translation of the type name for the `es` locale. e.g. `Puesta en marcha`
    - `fr-CA`: string - Translation of the type name for the `fr-CA` locale. e.g. `Mise en service`
    - `en-AU`: string - Translation of the type name for the `en-AU` locale. e.g. `Commissioning`
  - `localized_name`: string - Type name resolved for the locale of the request, falling back to the Company default and then the stored name. e.g. `Commissioning`
- `custom_fields`: object - Values for the Custom Fields configured on the Observations Category Configurable Field Set that applies to this Observation. Keys are `custom_field_{custom_field_definition_id}`; the definitions are listed by `GET /r...
  - `custom_field_%{custom_field_string_definition_id}`: object - A Custom Field whose definition has a `string` data type.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `string`
    - `value`: string - Text value recorded for this Custom Field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object - A Custom Field whose definition has a `decimal` data type.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `decimal`
    - `value`: number - Numeric value recorded for this Custom Field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object - A Custom Field whose definition has a `boolean` data type.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `boolean`
    - `value`: boolean - Boolean value recorded for this Custom Field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object - A Custom Field whose definition has a `lov_entry` data type — a single selection from a configured list of values.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `lov_entry`
    - `value`: object - The selected list-of-values entry.
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object - A Custom Field whose definition has a `lov_entries` data type — multiple selections from a configured list of values.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `lov_entries`
    - `value`: array of object - The selected list-of-values entries.
- `permissions`: object - What the requesting user may do with this Observation. Only populated when the request asks for a permission-aware view (`view=permissions` or `view=web`); null otherwise.
  - `can_edit`: boolean - Whether the requesting user can update this Observation. When false, a `PATCH` to the Observation will be rejected. e.g. `true`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/observations/items

**Create Observation Item**
Creates an Observation Item on the specified Project. `observation[name]` and `observation[type_id]` are required; `number`, `personal` and `due_date` default from the Project's Observations configuration when omitted.
Assignees must be users the requesting user is permitted to assign — check `GET /rest/v1.0/observations/assignees` first, or the request is rejected with a `403`. Supply either `assignee_id` or `assignee_ids`, not both.
An Observation can be linked to an originating record by supplying exactly one of `checklist_item_id`, `coordination_issue_id`, `incident_action_id` or `bim_model_id`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `run_configurable_validations` [query] boolean - Whether or not Configurable validations from the Observation Items Category Configurable Field Set should be run (default: false). See (https://developers.procore.com/reference/observations#list-observation-category-c...
- `view` [query] string enum[flat_v0, normal, safety_hub] - Controls which Observation Item fields are returned. `normal` (the default) returns the documented detail payload, including `distribution_members`. `flat_v0` adds `distribution_member_ids`, which always matches `dist...

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the Observation Item belongs to e.g. `123`
- `inspection_item_failed`: integer - 1 denotes that this Observation Item is being created from a failed Checklist Item. This will update the status of the Checklist Item to 'no' (fail). `observation[checklist_item_id]` must be provided for this to work. e.g. `456`
- `observation`: object (required)
  - `assignee_id`: integer - The ID of the User that will be assigned to the Observation Item e.g. `123`
  - `asset_ids`: array of string - IDs of Assets to link to the Observation Item via Related Items. Replaces any existing asset links. e.g. `["01HRBC2PNKW5ZDJX7MQVE4TF8G", "01HRBC5YVST8AMKN3XCJP6WD2H"]`
  - `contributing_behavior_id`: integer - The ID of the Contributing Behavior associated to the Observation Item e.g. `456`
  - `contributing_condition_id`: integer - The ID of the Contributing Condition associated to the Observation Item e.g. `789`
  - `checklist_item_id`: integer - Sets the origin to the ID of a Checklist Item (Note: the Item's origin can either be a coordination_issue_id, checklist_list_id or incident_action_id) e.g. `123`
  - `coordination_issue_id`: integer - Sets the origin to the ID of a Coordination Issue (Note: the Item's origin can either be a coordination_issue_id, checklist_list_id or incident_action_id) e.g. `456`
  - `created_by_id`: integer - The ID of the User creating the Observation Item. Only Observations Admin Users can set the creator e.g. `789`
  - `description`: string - The Description of the Observation Item e.g. `Example Observation Item`
  - `due_date`: string(date) - The Due Date of the Observation Item e.g. `2021-09-21`
  - `hazard_id`: integer - The ID of the Hazard associated to the Observation Item e.g. `123`
  - `incident_action_id`: integer - Sets the origin to the ID of an Incident Action (Note: the Item's origin can either be a coordination_issue_id, checklist_list_id or incident_action_id) e.g. `456`
  - `name`: string - The Name of the Observation Item e.g. `Example Observation`
  - `number`: integer - The Number of the Observation Item e.g. `42`
  - `personal`: boolean - The Privacy status of the Observation Item e.g. `true`
  - `priority`: string enum[Low, Medium, High, Urgent] - The Priority of the Observation Item e.g. `Low`
  - `specification_section_id`: integer - The ID of the specification section to set on the Observation. e.g. `456`
  - `status`: string enum[initiated, ready_for_review, not_accepted, closed, draft] - The Status of the Observation Item e.g. `initiated`
  - `trade_id`: integer - The ID of the Trade of the Observation Item e.g. `123`
  - `type_id`: integer - The ID of the Type of the Observation Item e.g. `456`
  - `distribution_member_ids`: array of integer - An array of the User IDs of the Observation Item distribution members e.g. `[123, 456]`
  - `location_id`: integer - The ID of the Location of the Observation Item. `location_id` takes precedence over `mt_location`. e.g. `789`
  - `mt_location`: array of string - Use this for creating a new multi-tier or single-tier Location. This will be ignored if `location_id` is provided. e.g. `["Location 1", "Location 2"]`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `prostore_file_ids`: array of integer - Prostore file IDs to attach to the observation item e.g. `[7889253049, 8981591777]`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this Observation Item. Pass as the `{id}` path parameter to `GET /rest/v1.0/observations/items/{id}`, or as `filters[id]` when listing. e.g. `9378`
- `number`: string - Human-facing identifier of the Observation within its Project. Assigned automatically from the next available number when not supplied on create. Sortable via `sort=number`. e.g. `96`
- `name`: string - Short title of the Observation, shown as the row label in the Observations list. e.g. `Personnel not wearing full PPE`
- `description`: string - Plain-text rendering of the Observation description, with HTML markup stripped. Use for search indexing or plain-text export; use `description_rich_text` to render formatted content. e.g. `Worker was seen not wearing their hard hat`
- `description_rich_text`: string - Sanitized HTML version of the Observation description, safe to render in a rich-text viewer. e.g. `<p>Worker was seen not wearing their hard hat</p>`
- `status`: string enum[initiated, ready_for_review, not_accepted, closed, draft] - Current lifecycle state of the Observation. `draft` is only produced for Observations governed by a workflow that has not yet been started. Filter collections with `filters[status]`, and read the settable values for a... e.g. `initiated`
- `checklist_item`: object - Inspection (Checklist) item this Observation was raised from. Null unless the Observation originated from an Inspection.
  - `id`: integer - ID of the source Checklist Item. e.g. `98`
- `checklist_list`: object - Inspection (Checklist List) containing the source Checklist Item. Null unless the Observation originated from an Inspection.
  - `id`: integer - ID of the source Checklist List. e.g. `11`
- `priority`: string enum[Low, Medium, High, Urgent] - Urgency assigned to the Observation. Filter collections with `filters[priority]` and sort with `sort=priority`. e.g. `Urgent`
- `date_notified`: string(date) - Date the current assignee was last notified by email. Set when an assignee is added and cleared when the last assignee is removed. Null while the Observation is unsent — those Observations are the ones returned by `PO... e.g. `2016-02-17`
- `due_date`: string(date) - Date the assignee is expected to resolve the Observation. Defaults from the Project's Observations configuration `days_due_default` when the client does not supply one. e.g. `2016-02-25`
- `closed_at`: string(date-time) - ISO 8601 timestamp of when the Observation last moved to `closed`. Null if the Observation has never been closed. e.g. `2020-01-23T21:39:40Z`
- `created_at`: string(date-time) - ISO 8601 timestamp of when the Observation was created. e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the last change to the Observation. Use with `filters[updated_at]` to poll for incremental changes. e.g. `2012-10-24T21:39:40Z`
- `deleted_at`: string(date-time) - ISO 8601 timestamp of when the Observation was sent to the recycle bin. Null for active Observations. Deleted Observations are only returned by the recycle bin endpoints. e.g. `2012-10-24T21:39:40Z`
- `personal`: boolean - Whether the Observation is private. Private Observations are visible only to their creator, assignees, distribution members, and Observations admins. Defaults from the Project's `private_by_default` configuration. e.g. `false`
- `asset_ids`: array of string - IDs of Assets linked to this Observation Item via Related Items e.g. `["01HRBC2PNKW5ZDJX7MQVE4TF8G", "01HRBC5YVST8AMKN3XCJP6WD2H"]`
- `current_drawing_revision_ids`: array of integer - IDs of the current revisions of every Drawing this Observation is pinned to. Empty when the Observation is not linked to any Drawing. e.g. `[4471203]`
- `drawing_revisions`: array of integer - IDs of every Drawing Revision this Observation is associated with, including superseded revisions. e.g. `[4471203, 4471190]`
- `drawing_ids`: array of integer - Distinct Drawing IDs derived from `drawing_revisions`. Use to link back to the Drawings tool without resolving revisions yourself. e.g. `[88213]`
- `origin`: object - The record this Observation was created from. Omitted when the Observation was created directly in the Observations tool. `payload` keys vary by `type`.
  - `type`: string enum[inspection, incident, coordination_issue, bim_model] - Kind of record the Observation originated from. e.g. `inspection`
  - `payload`: object - Identifiers for the originating record. Only the keys relevant to `type` are present.
    - `checklist_item_id`: integer - ID of the source Checklist Item. Present when `type` is `inspection`. e.g. `42`
    - `checklist_list_id`: integer - ID of the source Checklist List. Present when `type` is `inspection`. e.g. `42`
    - `coordination_issue_id`: integer - ID of the source Coordination Issue. Present when `type` is `coordination_issue`. e.g. `2312`
    - `coordination_issue_number`: integer - Display number of the source Coordination Issue. Present when `type` is `coordination_issue`. e.g. `21`
    - `incident_action_id`: integer - ID of the source Incident Action. Present when `type` is `incident`. e.g. `53`
    - `incident_id`: integer - ID of the Incident owning the source Incident Action. Present when `type` is `incident`. e.g. `53`
    - `bim_model_id`: integer - ID of the source BIM Model. Present when `type` is `bim_model`. e.g. `63`
    - `bim_model_name`: string - Title of the source BIM Model. Present when `type` is `bim_model`. e.g. `Combined Model`
    - `name`: string - Human-readable label for the originating record, suitable for display as a breadcrumb back to the source tool. e.g. `Origin Name`
- `viewpoint`: object - Saved BIM camera position captured when the Observation was raised from a BIM Model. Present only when `origin.type` is `bim_model` and a viewpoint was captured.
  - `id`: integer - ID of the BIM Viewpoint. e.g. `3312`
  - `name`: string - Name given to the saved viewpoint. e.g. `Level 2 - Mechanical Room`
  - `bim_file_id`: integer - ID of the BIM File the viewpoint was captured in. e.g. `8891`
  - `camera_data`: object - Opaque camera state (position, target, field of view) used by the BIM viewer to restore the saved view. Pass back to the viewer unmodified.
  - `redlines_data`: object - Opaque markup overlay data drawn on the viewpoint. Pass back to the BIM viewer unmodified.
  - `sections_data`: object - Opaque section-plane state applied to the model in this viewpoint. Pass back to the BIM viewer unmodified.
  - `snapshot`: object - Rendered still image of the viewpoint. An empty object when no snapshot image was stored.
    - `id`: integer - ID of the snapshot file. e.g. `77123`
    - `filename`: string - Stored filename of the snapshot image. e.g. `viewpoint-snapshot.png`
    - `name`: string - Display name of the snapshot image. e.g. `viewpoint-snapshot.png`
    - `url`: string - Time-limited URL for downloading the snapshot image. e.g. `https://storage.procore.com/viewpoint-snapshot.png`
- `attachments`: array of oneOf(object | object) - Files attached to the Observation. Each entry is either a Procore-stored file or a Procore Document Management document reference. Add attachments with `upload_ids` or `document_management_document_revision_ids`.
- `assignee`: object - Most recently added assignee. Omitted when the Observation has no assignees. When multiple assignees are supported, read the full list from `assignees` instead.
  - `id`: integer - User ID of the assignee. Matches an `id` from `GET /rest/v1.0/observations/assignees`. e.g. `29837`
  - `name`: string - Assignee's name, formatted first-name-first. e.g. `John Smith`
  - `vendor`: object - Company the assignee belongs to in this Procore company directory. Omitted when the assignee is not associated with a vendor.
    - `id`: integer - Vendor ID of the assignee's company. e.g. `2675`
    - `name`: string - Name of the assignee's company. e.g. `Brick and Morty`
- `assignees`: array of object - Every user currently assigned to the Observation, most recently added first. Omitted when the Observation has no assignees. Set with `observation[assignee_ids]`.
  - `id`: integer - User ID of the assignee. e.g. `29837`
  - `name`: string - Assignee's name, formatted first-name-first. e.g. `John Smith`
  - `vendor`: object - Company the assignee belongs to. Omitted when the assignee is not associated with a vendor.
    - `id`: integer - Vendor ID of the assignee's company. e.g. `2675`
    - `name`: string - Name of the assignee's company. e.g. `Brick and Morty`
- `distribution_members`: array of object - Users copied on email notifications for this Observation. Omitted when the distribution list is empty. Set with `observation[distribution_member_ids]`.
  - `id`: integer - User ID of the distribution member. e.g. `160586`
  - `login`: string - Email address the notification is sent to. e.g. `carl.contractor@example.com`
  - `name`: string - Distribution member's name, formatted first-name-first. e.g. `Carl Contractor`
- `distribution_member_ids`: array of integer - User IDs of the Observation distribution members, returned when `view=flat_v0`. Always matches `distribution_members`. Empty when the distribution list has no members. e.g. `[160586]`
- `created_by`: object - User recorded as the author of the Observation.
  - `id`: integer - User ID of the creator. e.g. `47531`
  - `name`: string - Creator's name as stored on the Observation at creation time. e.g. `Jane Doe`
  - `login`: string - Deprecated — not returned by this endpoint. Resolve the creator's email from the Directory using `created_by.id`. e.g. `carl.contractor@example.com`
  - `vendor`: object - Company the creator belongs to. Omitted when the creator is not associated with a vendor.
    - `id`: integer - Vendor ID of the creator's company. e.g. `2675`
    - `name`: string - Name of the creator's company. e.g. `Brick and Morty`
- `specification_section`: object - Specification Section the Observation references. Omitted when no section is set.
  - `id`: integer - ID of the Specification Section. e.g. `4521`
  - `description`: string - Title of the Specification Section. e.g. `Acoustical Panel Ceilings`
  - `number`: string - Deprecated — not returned by this endpoint. Use `section` for the section number. e.g. `42`
  - `section`: string - Section number as printed in the specification book. e.g. `09 51 00`
  - `latest_revision_url`: string - Time-limited URL to the PDF of the section's current revision. Null when the section has no uploaded revision. e.g. `https://storage.procore.com/spec-section.pdf`
  - `current_revision_id`: integer - ID of the section's current revision. Null when the section has no revisions. e.g. `42`
  - `viewable_document_id`: integer - ID of the viewable document generated for the current revision, for use with the document viewer. Null while conversion is pending. e.g. `42`
- `location`: object - Location the Observation was recorded at. Omitted when no location is set.
  - `id`: integer - ID of the Location. Pass as `observation[location_id]` on create or update, or as `filters[location_id]` when listing. e.g. `15504`
  - `name`: string - Full multi-tier path of the Location, tiers joined with `>`. e.g. `Building A>Level 2>Room 210`
  - `node_name`: string - Name of the deepest Location tier only, without its ancestors. e.g. `Room 210`
  - `parent_id`: integer - Deprecated — not returned by this endpoint. e.g. `788866`
  - `created_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2016-08-01T23:33:54Z`
- `trade`: object - Trade responsible for the Observation. Omitted when no trade is set.
  - `id`: integer - ID of the Trade. Pass as `observation[trade_id]` on create or update, or as `filters[trade_ids]` when listing. e.g. `999`
  - `name`: string - Display name of the Trade. e.g. `09 - acoustical panels`
  - `active`: boolean - Deprecated — not returned by this endpoint. e.g. `true`
  - `updated_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2016-08-01T23:33:54Z`
- `type`: object - Observation Type classifying this Observation. Omitted only if the Observation has no type.
  - `id`: integer - ID of the Observation Type. Pass as `observation[type_id]` on create or update, or as `filters[type_id]` when listing. e.g. `9`
  - `category`: string - Localized display name of the type's Observations Category. Companies can define their own categories, so treat this as free-form text; use `category_key` for programmatic comparisons. e.g. `Commissioning`
  - `category_key`: string - Stable, unlocalized key of the type's Observations Category. Prefer this over `category` when branching on category in code. e.g. `work_to_complete`
  - `category_id`: integer - Deprecated — not returned by this endpoint. Use `type.observations_category.id`. e.g. `13`
  - `name`: string - Display name of the Observation Type, localized where a translation exists. e.g. `Commissioning`
  - `observations_category`: object - The Observations Category the type belongs to. Managed via `GET /rest/v2.0/companies/{company_id}/observations/categories`.
    - `id`: integer - ID of the Observations Category. e.g. `13`
    - `name`: string - Stable, unlocalized name of the category. e.g. `commissioning`
    - `grouping`: string enum[quality, safety] - Top-level bucket the category rolls up to. Drives which Observations area the item appears in when the Company has group split enabled. e.g. `quality`
    - `updated_at`: string(date-time) - ISO 8601 timestamp of the last change to the category. e.g. `2016-08-01T23:33:54Z`
  - `active`: boolean - Deprecated — not returned by this endpoint. Read from `GET /rest/v1.0/observations/types` instead. e.g. `true`
  - `company_active`: boolean - Deprecated — not returned by this endpoint. Read from `GET /rest/v1.0/observations/types` instead. e.g. `true`
  - `parent_inactive`: boolean - Deprecated — not returned by this endpoint. Read from `GET /rest/v1.0/observations/types` instead. e.g. `false`
  - `in_use`: boolean - Deprecated — not returned by this endpoint. Read from `GET /rest/v1.0/observations/types` instead. e.g. `false`
  - `kind`: string - Deprecated — not returned by this endpoint. Read from `GET /rest/v1.0/observations/types` instead. e.g. `project`
  - `name_translations`: object - Company-authored translations of the type name, keyed by locale code. Null when the Company has not configured custom translations for this type. Additional locale keys beyond those listed may be present.
    - `en`: string - Translation of the type name for the `en` locale. e.g. `Commissioning`
    - `es`: string - Translation of the type name for the `es` locale. e.g. `Puesta en marcha`
    - `fr-CA`: string - Translation of the type name for the `fr-CA` locale. e.g. `Mise en service`
    - `en-AU`: string - Translation of the type name for the `en-AU` locale. e.g. `Commissioning`
  - `localized_name`: string - Deprecated — not returned by this endpoint. `type.name` is already localized. e.g. `Commissioning`
- `contributing_behavior`: object - Root-cause behavior recorded against the Observation. Omitted when none is set. The full list is managed at the Company level.
  - `id`: integer - ID of the Contributing Behavior. Pass as `observation[contributing_behavior_id]` on create or update. e.g. `999`
  - `name`: string - Display name of the Contributing Behavior. e.g. `Distraction`
  - `active`: boolean - Deprecated — not returned by this endpoint. e.g. `true`
  - `global`: boolean - Deprecated — not returned by this endpoint. e.g. `false`
  - `created_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2016-10-25T17:53:35Z`
- `contributing_condition`: object - Root-cause condition recorded against the Observation. Omitted when none is set. The full list is managed at the Company level.
  - `id`: integer - ID of the Contributing Condition. Pass as `observation[contributing_condition_id]` on create or update. e.g. `9001`
  - `name`: string - Display name of the Contributing Condition. e.g. `Environment`
  - `active`: boolean - Deprecated — not returned by this endpoint. e.g. `true`
  - `global`: boolean - Deprecated — not returned by this endpoint. e.g. `false`
  - `created_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2019-01-18T21:36:55Z`
  - `updated_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2019-01-18T21:46:56Z`
- `hazard`: object - Hazard recorded against the Observation. Omitted when none is set. The full list is managed at the Company level.
  - `id`: integer - ID of the Hazard. Pass as `observation[hazard_id]` on create or update. e.g. `1738`
  - `name`: string - Display name of the Hazard. e.g. `Slip`
  - `active`: boolean - Deprecated — not returned by this endpoint. e.g. `true`
  - `global`: boolean - Deprecated — not returned by this endpoint. e.g. `false`
  - `created_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2016-10-25T17:53:35Z`
- `download_all_attachments_uuid`: string - Single-use token identifying a bulk download of every attachment on this Observation. Returned only by `GET /rest/v1.0/observations/items/{id}`. Supply it to the attachment bulk-download endpoint to retrieve the zip. e.g. `8f14e45f-ceea-467a-9a2c-4a4b0e0e6c1d`
- `custom_fields`: object - Values for the Custom Fields configured on the Observations Category Configurable Field Set that applies to this Observation. Keys are `custom_field_{custom_field_definition_id}`; the definitions are listed by `GET /r...
  - `custom_field_%{custom_field_string_definition_id}`: object - A Custom Field whose definition has a `string` data type.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `string`
    - `value`: string - Text value recorded for this Custom Field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object - A Custom Field whose definition has a `decimal` data type.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `decimal`
    - `value`: number - Numeric value recorded for this Custom Field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object - A Custom Field whose definition has a `boolean` data type.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `boolean`
    - `value`: boolean - Boolean value recorded for this Custom Field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object - A Custom Field whose definition has a `lov_entry` data type — a single selection from a configured list of values.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `lov_entry`
    - `value`: object - The selected list-of-values entry.
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object - A Custom Field whose definition has a `lov_entries` data type — multiple selections from a configured list of values.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `lov_entries`
    - `value`: array of object - The selected list-of-values entries.

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/observations/items/send_unsent

**Send unsent Observation Items**
Sends the pending notification digests for every Observation on the Project that has not yet been notified, and stamps each one's `date_notified`. Users without permission to email all Observations only send their own. Use `GET /rest/v1.0/observations/items/stats` to check how many are pending first.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - ID of the Project e.g. `123`

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this Observation Item. Pass as the `{id}` path parameter to `GET /rest/v1.0/observations/items/{id}`, or as `filters[id]` to narrow a list request. e.g. `9378`
- `created_at`: string(date-time) - ISO 8601 timestamp of when the Observation was created. e.g. `2012-10-23T21:39:40Z`
- `closed_at`: string(date-time) - ISO 8601 timestamp of when the Observation last moved to `closed`. Null if the Observation has never been closed. e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - ISO 8601 timestamp of when the Observation was sent to the recycle bin. Null for active Observations. e.g. `2017-07-29T21:39:40Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the last change to the Observation. Use with `filters[updated_at]` to poll for incremental changes. e.g. `2012-10-24T21:39:40Z`
- `number`: string - Human-facing identifier of the Observation within its Project. Sortable via `sort=number`, which is also the default sort. e.g. `87`
- `name`: string - Short title of the Observation, shown as the row label in the Observations list. e.g. `Personnel not wearing full PPE`
- `description`: string - Plain-text rendering of the Observation description, with HTML markup stripped. Use `description_rich_text` to render formatted content. e.g. `Worker was seen not wearing their hard hat`
- `description_rich_text`: string - Sanitized HTML version of the Observation description, safe to render in a rich-text viewer. e.g. `<p>Worker was seen not wearing their hard hat</p>`
- `status`: string enum[initiated, ready_for_review, not_accepted, closed, draft] - Current lifecycle state of the Observation. `draft` is only produced for Observations governed by a workflow that has not yet been started. Filter collections with `filters[status]`. e.g. `initiated`
- `priority`: string enum[Low, Medium, High, Urgent] - Urgency assigned to the Observation. Filter collections with `filters[priority]` and sort with `sort=priority`. e.g. `High`
- `date_notified`: string(date) - Date the current assignee was last notified by email. Null while the Observation is unsent — those are the Observations returned by `POST /rest/v1.0/observations/items/send_unsent`. e.g. `2016-02-17`
- `due_date`: string(date) - Date the assignee is expected to resolve the Observation. Defaults from the Project's Observations configuration `days_due_default`. e.g. `2016-02-22`
- `personal`: boolean - Whether the Observation is private. Private Observations are visible only to their creator, assignees, distribution members, and Observations admins. e.g. `false`
- `origin`: object - The record this Observation was created from. Null when the Observation was created directly in the Observations tool. `payload` keys vary by `type`.
  - `type`: string enum[incident, bim_model, inspection, coordination_issue] - Kind of record the Observation originated from. e.g. `inspection`
  - `payload`: object - Identifiers for the originating record. Only the keys relevant to `type` are present.
    - `checklist_item_id`: integer - ID of the source Checklist Item. Present when `type` is `inspection`. e.g. `42`
    - `checklist_list_id`: integer - ID of the source Checklist List. Present when `type` is `inspection`. e.g. `42`
    - `coordination_issue_id`: integer - ID of the source Coordination Issue. Present when `type` is `coordination_issue`. e.g. `1231`
    - `coordination_issue_number`: integer - Display number of the source Coordination Issue. Present when `type` is `coordination_issue`. e.g. `42`
    - `incident_action_id`: integer - ID of the source Incident Action. Present when `type` is `incident`. e.g. `53`
    - `incident_id`: integer - ID of the Incident owning the source Incident Action. Present when `type` is `incident`. e.g. `53`
    - `bim_model_id`: integer - ID of the source BIM Model. Present when `type` is `bim_model`. e.g. `63`
    - `bim_model_name`: string - Title of the source BIM Model. Present when `type` is `bim_model`. e.g. `Combined Model`
- `assignee`: object - Most recently added assignee. Null when the Observation has no assignees. Read the full list from `assignees`.
  - `id`: integer - User ID of the assignee. Matches an `id` from `GET /rest/v1.0/observations/assignees`. e.g. `9378`
  - `name`: string - Assignee's name, formatted first-name-first. e.g. `Katrina Smith`
  - `vendor`: object - Company the assignee belongs to. Null when the assignee is not associated with a vendor.
    - `id`: integer - Vendor ID of the assignee's company. e.g. `2675`
    - `name`: string - Name of the assignee's company. e.g. `Brick and Morty`
- `assignees`: array of object - Every user currently assigned to the Observation, most recently added first. Empty when the Observation is unassigned. Set with `observation[assignee_ids]`.
  - `id`: integer - User ID of the assignee. e.g. `9378`
  - `name`: string - Assignee's name, formatted first-name-first. e.g. `Katrina Smith`
  - `current`: boolean - Whether the assignee is on the active workflow step. True for assignees outside a workflow. e.g. `true`
  - `vendor`: object - Company the assignee belongs to. Null when the assignee is not associated with a vendor.
    - `id`: integer - Vendor ID of the assignee's company. e.g. `2675`
    - `name`: string - Name of the assignee's company. e.g. `Brick and Morty`
- `created_by`: object - User recorded as the author of the Observation.
  - `id`: integer - User ID of the creator. e.g. `160586`
  - `login`: string - Email address the creator signs in with. e.g. `carl.contractor@example.com`
  - `name`: string - Creator's name, formatted first-name-first. e.g. `Carl Contractor`
  - `company_name`: string - Name of the vendor the creator belongs to in this Procore company directory. Null when the creator is not associated with a vendor. e.g. `Brick and Morty`
- `location`: object - Location the Observation was recorded at. Null when no location is set. Filter collections with `filters[location_id]`.
  - `id`: integer - ID of the Location. Pass as `observation[location_id]` on create or update. e.g. `15504`
  - `name`: string - Full multi-tier path of the Location, tiers joined with `>`. e.g. `Building A>Level 2`
  - `node_name`: string - Name of the deepest Location tier only, without its ancestors. e.g. `Level 2`
  - `parent_id`: integer - ID of the parent Location tier. Null for a top-level Location. Use to walk the Location hierarchy. e.g. `788866`
  - `created_at`: string(date-time) - ISO 8601 timestamp of when the Location was created. e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - ISO 8601 timestamp of the last change to the Location. e.g. `2016-08-01T23:33:54Z`
- `specification_section`: object - Specification Section the Observation references. Null when no section is set.
  - `id`: integer - ID of the Specification Section. e.g. `4521`
  - `description`: string - Title of the Specification Section. e.g. `Acoustical Panel Ceilings`
  - `number`: string - Section number as printed in the specification book. e.g. `09 51 00`
  - `latest_revision_url`: string - Time-limited URL to the PDF of the section's current revision. Null when the section has no uploaded revision. e.g. `https://storage.procore.com/spec-section.pdf`
  - `current_revision_id`: integer - ID of the section's current revision. Null when the section has no revisions. e.g. `42`
  - `viewable_document_id`: integer - ID of the viewable document generated for the current revision, for use with the document viewer. Null while conversion is pending. e.g. `42`
- `trade`: object - Trade responsible for the Observation. Null when no trade is set. Filter collections with `filters[trade_ids]`.
  - `id`: integer - ID of the Trade. Pass as `observation[trade_id]` on create or update. e.g. `999`
  - `name`: string - Display name of the Trade. e.g. `09 - acoustical panels`
  - `active`: boolean - Whether the Trade can still be selected on new records. Inactive Trades remain on existing Observations. e.g. `true`
  - `updated_at`: string(date-time) - ISO 8601 timestamp of the last change to the Trade. e.g. `2016-08-01T23:33:54Z`
- `category`: object - Observations Category of this Observation's type, flattened for convenience. Null when the Observation has no type. Use `grouping` to route the item to the Quality or Safety area when the Company has group split enabled.
  - `name`: string - Stable, unlocalized name of the Observations Category. e.g. `commissioning`
  - `grouping`: string enum[quality, safety] - Top-level bucket the Observations Category rolls up to. e.g. `quality`
- `type`: object - Observation Type classifying this Observation.
  - `id`: integer (required) - ID of the Observation Type. Pass as `observation[type_id]` on create or update, or as `filters[type_id]` when listing. e.g. `9`
  - `category`: string (required) - Localized display name of the type's Observations Category. Companies can define their own categories, so treat this as free-form text; use `category_key` for programmatic comparisons. e.g. `Commissioning`
  - `category_key`: string - Stable, unlocalized key of the type's Observations Category. Prefer this over `category` when branching on category in code. e.g. `work_to_complete`
  - `category_id`: integer - Deprecated — not returned by this endpoint. Use `type.observations_category.id`. e.g. `13`
  - `name`: string (required) - Display name of the Observation Type, localized where a translation exists. e.g. `Commissioning`
  - `observations_category`: object - The Observations Category the type belongs to. Managed via `GET /rest/v2.0/companies/{company_id}/observations/categories`.
    - `id`: integer - ID of the Observations Category. e.g. `13`
    - `name`: string - Stable, unlocalized name of the category. e.g. `commissioning`
    - `grouping`: string enum[quality, safety] - Top-level bucket the category rolls up to. e.g. `quality`
    - `updated_at`: string(date-time) - ISO 8601 timestamp of the last change to the category. e.g. `2016-08-01T23:33:54Z`
  - `active`: boolean - Whether the type can be selected on new Observations in this Project. Inactive types are still returned so existing Observations render correctly. e.g. `true`
  - `company_active`: boolean - Whether the type is active at the Company level, ignoring any project-level override. Compare with `active` to detect a type enabled company-wide but switched off for this Project. e.g. `true`
  - `parent_inactive`: boolean - True when this is a project-level type whose parent company-level type has been deactivated. e.g. `false`
  - `in_use`: boolean - Whether at least one Observation references this type. Always true here, since the Observation being serialized uses it. e.g. `true`
  - `kind`: string enum[company, project] - Whether the type is owned by the Company or defined on a single Project. e.g. `project`
  - `name_translations`: object - Company-authored translations of the type name, keyed by locale code. Null when the Company has not configured custom translations for this type. Additional locale keys beyond those listed may be present.
    - `en`: string - Translation of the type name for the `en` locale. e.g. `Commissioning`
    - `es`: string - Translation of the type name for the `es` locale. e.g. `Puesta en marcha`
    - `fr-CA`: string - Translation of the type name for the `fr-CA` locale. e.g. `Mise en service`
    - `en-AU`: string - Translation of the type name for the `en-AU` locale. e.g. `Commissioning`
  - `localized_name`: string - Type name resolved for the locale of the request, falling back to the Company default and then the stored name. e.g. `Commissioning`
- `custom_fields`: object - Values for the Custom Fields configured on the Observations Category Configurable Field Set that applies to this Observation. Keys are `custom_field_{custom_field_definition_id}`; the definitions are listed by `GET /r...
  - `custom_field_%{custom_field_string_definition_id}`: object - A Custom Field whose definition has a `string` data type.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `string`
    - `value`: string - Text value recorded for this Custom Field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object - A Custom Field whose definition has a `decimal` data type.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `decimal`
    - `value`: number - Numeric value recorded for this Custom Field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object - A Custom Field whose definition has a `boolean` data type.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `boolean`
    - `value`: boolean - Boolean value recorded for this Custom Field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object - A Custom Field whose definition has a `lov_entry` data type — a single selection from a configured list of values.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `lov_entry`
    - `value`: object - The selected list-of-values entry.
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object - A Custom Field whose definition has a `lov_entries` data type — multiple selections from a configured list of values.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `lov_entries`
    - `value`: array of object - The selected list-of-values entries.
- `permissions`: object - What the requesting user may do with this Observation. Only populated when the request asks for a permission-aware view (`view=permissions` or `view=web`); null otherwise.
  - `can_edit`: boolean - Whether the requesting user can update this Observation. When false, a `PATCH` to the Observation will be rejected. e.g. `true`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/observations/items/next_available_number

**Show Next Available Number for Observation Items**
Returns the `number` that would be assigned to the next Observation created on this Project. Use it to pre-fill a create form. The value is not reserved, so a concurrent create can claim it first — omit `observation[number]` on create to let the server assign it safely.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `next_available_number`: string - Next Available Number for Observation Item e.g. `2`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/observations/items/{id}

**Show Observation Item**
Returns a single Observation Item with its full detail payload, including attachments, drawing links, root-cause associations, distribution members and custom field values. Also returns `download_all_attachments_uuid`, a token for bulk-downloading every attachment on the Observation.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Observation Item ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `view` [query] string enum[flat_v0, normal, safety_hub] - Controls which Observation Item fields are returned. `normal` (the default) returns the documented detail payload, including `distribution_members`. `flat_v0` adds `distribution_member_ids`, which always matches `dist...

Response 200 (application/json): object

- `id`: integer - Unique identifier for this Observation Item. Pass as the `{id}` path parameter to `GET /rest/v1.0/observations/items/{id}`, or as `filters[id]` when listing. e.g. `9378`
- `number`: string - Human-facing identifier of the Observation within its Project. Assigned automatically from the next available number when not supplied on create. Sortable via `sort=number`. e.g. `96`
- `name`: string - Short title of the Observation, shown as the row label in the Observations list. e.g. `Personnel not wearing full PPE`
- `description`: string - Plain-text rendering of the Observation description, with HTML markup stripped. Use for search indexing or plain-text export; use `description_rich_text` to render formatted content. e.g. `Worker was seen not wearing their hard hat`
- `description_rich_text`: string - Sanitized HTML version of the Observation description, safe to render in a rich-text viewer. e.g. `<p>Worker was seen not wearing their hard hat</p>`
- `status`: string enum[initiated, ready_for_review, not_accepted, closed, draft] - Current lifecycle state of the Observation. `draft` is only produced for Observations governed by a workflow that has not yet been started. Filter collections with `filters[status]`, and read the settable values for a... e.g. `initiated`
- `checklist_item`: object - Inspection (Checklist) item this Observation was raised from. Null unless the Observation originated from an Inspection.
  - `id`: integer - ID of the source Checklist Item. e.g. `98`
- `checklist_list`: object - Inspection (Checklist List) containing the source Checklist Item. Null unless the Observation originated from an Inspection.
  - `id`: integer - ID of the source Checklist List. e.g. `11`
- `priority`: string enum[Low, Medium, High, Urgent] - Urgency assigned to the Observation. Filter collections with `filters[priority]` and sort with `sort=priority`. e.g. `Urgent`
- `date_notified`: string(date) - Date the current assignee was last notified by email. Set when an assignee is added and cleared when the last assignee is removed. Null while the Observation is unsent — those Observations are the ones returned by `PO... e.g. `2016-02-17`
- `due_date`: string(date) - Date the assignee is expected to resolve the Observation. Defaults from the Project's Observations configuration `days_due_default` when the client does not supply one. e.g. `2016-02-25`
- `closed_at`: string(date-time) - ISO 8601 timestamp of when the Observation last moved to `closed`. Null if the Observation has never been closed. e.g. `2020-01-23T21:39:40Z`
- `created_at`: string(date-time) - ISO 8601 timestamp of when the Observation was created. e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the last change to the Observation. Use with `filters[updated_at]` to poll for incremental changes. e.g. `2012-10-24T21:39:40Z`
- `deleted_at`: string(date-time) - ISO 8601 timestamp of when the Observation was sent to the recycle bin. Null for active Observations. Deleted Observations are only returned by the recycle bin endpoints. e.g. `2012-10-24T21:39:40Z`
- `personal`: boolean - Whether the Observation is private. Private Observations are visible only to their creator, assignees, distribution members, and Observations admins. Defaults from the Project's `private_by_default` configuration. e.g. `false`
- `asset_ids`: array of string - IDs of Assets linked to this Observation Item via Related Items e.g. `["01HRBC2PNKW5ZDJX7MQVE4TF8G", "01HRBC5YVST8AMKN3XCJP6WD2H"]`
- `current_drawing_revision_ids`: array of integer - IDs of the current revisions of every Drawing this Observation is pinned to. Empty when the Observation is not linked to any Drawing. e.g. `[4471203]`
- `drawing_revisions`: array of integer - IDs of every Drawing Revision this Observation is associated with, including superseded revisions. e.g. `[4471203, 4471190]`
- `drawing_ids`: array of integer - Distinct Drawing IDs derived from `drawing_revisions`. Use to link back to the Drawings tool without resolving revisions yourself. e.g. `[88213]`
- `origin`: object - The record this Observation was created from. Omitted when the Observation was created directly in the Observations tool. `payload` keys vary by `type`.
  - `type`: string enum[inspection, incident, coordination_issue, bim_model] - Kind of record the Observation originated from. e.g. `inspection`
  - `payload`: object - Identifiers for the originating record. Only the keys relevant to `type` are present.
    - `checklist_item_id`: integer - ID of the source Checklist Item. Present when `type` is `inspection`. e.g. `42`
    - `checklist_list_id`: integer - ID of the source Checklist List. Present when `type` is `inspection`. e.g. `42`
    - `coordination_issue_id`: integer - ID of the source Coordination Issue. Present when `type` is `coordination_issue`. e.g. `2312`
    - `coordination_issue_number`: integer - Display number of the source Coordination Issue. Present when `type` is `coordination_issue`. e.g. `21`
    - `incident_action_id`: integer - ID of the source Incident Action. Present when `type` is `incident`. e.g. `53`
    - `incident_id`: integer - ID of the Incident owning the source Incident Action. Present when `type` is `incident`. e.g. `53`
    - `bim_model_id`: integer - ID of the source BIM Model. Present when `type` is `bim_model`. e.g. `63`
    - `bim_model_name`: string - Title of the source BIM Model. Present when `type` is `bim_model`. e.g. `Combined Model`
    - `name`: string - Human-readable label for the originating record, suitable for display as a breadcrumb back to the source tool. e.g. `Origin Name`
- `viewpoint`: object - Saved BIM camera position captured when the Observation was raised from a BIM Model. Present only when `origin.type` is `bim_model` and a viewpoint was captured.
  - `id`: integer - ID of the BIM Viewpoint. e.g. `3312`
  - `name`: string - Name given to the saved viewpoint. e.g. `Level 2 - Mechanical Room`
  - `bim_file_id`: integer - ID of the BIM File the viewpoint was captured in. e.g. `8891`
  - `camera_data`: object - Opaque camera state (position, target, field of view) used by the BIM viewer to restore the saved view. Pass back to the viewer unmodified.
  - `redlines_data`: object - Opaque markup overlay data drawn on the viewpoint. Pass back to the BIM viewer unmodified.
  - `sections_data`: object - Opaque section-plane state applied to the model in this viewpoint. Pass back to the BIM viewer unmodified.
  - `snapshot`: object - Rendered still image of the viewpoint. An empty object when no snapshot image was stored.
    - `id`: integer - ID of the snapshot file. e.g. `77123`
    - `filename`: string - Stored filename of the snapshot image. e.g. `viewpoint-snapshot.png`
    - `name`: string - Display name of the snapshot image. e.g. `viewpoint-snapshot.png`
    - `url`: string - Time-limited URL for downloading the snapshot image. e.g. `https://storage.procore.com/viewpoint-snapshot.png`
- `attachments`: array of oneOf(object | object) - Files attached to the Observation. Each entry is either a Procore-stored file or a Procore Document Management document reference. Add attachments with `upload_ids` or `document_management_document_revision_ids`.
- `assignee`: object - Most recently added assignee. Omitted when the Observation has no assignees. When multiple assignees are supported, read the full list from `assignees` instead.
  - `id`: integer - User ID of the assignee. Matches an `id` from `GET /rest/v1.0/observations/assignees`. e.g. `29837`
  - `name`: string - Assignee's name, formatted first-name-first. e.g. `John Smith`
  - `vendor`: object - Company the assignee belongs to in this Procore company directory. Omitted when the assignee is not associated with a vendor.
    - `id`: integer - Vendor ID of the assignee's company. e.g. `2675`
    - `name`: string - Name of the assignee's company. e.g. `Brick and Morty`
- `assignees`: array of object - Every user currently assigned to the Observation, most recently added first. Omitted when the Observation has no assignees. Set with `observation[assignee_ids]`.
  - `id`: integer - User ID of the assignee. e.g. `29837`
  - `name`: string - Assignee's name, formatted first-name-first. e.g. `John Smith`
  - `vendor`: object - Company the assignee belongs to. Omitted when the assignee is not associated with a vendor.
    - `id`: integer - Vendor ID of the assignee's company. e.g. `2675`
    - `name`: string - Name of the assignee's company. e.g. `Brick and Morty`
- `distribution_members`: array of object - Users copied on email notifications for this Observation. Omitted when the distribution list is empty. Set with `observation[distribution_member_ids]`.
  - `id`: integer - User ID of the distribution member. e.g. `160586`
  - `login`: string - Email address the notification is sent to. e.g. `carl.contractor@example.com`
  - `name`: string - Distribution member's name, formatted first-name-first. e.g. `Carl Contractor`
- `distribution_member_ids`: array of integer - User IDs of the Observation distribution members, returned when `view=flat_v0`. Always matches `distribution_members`. Empty when the distribution list has no members. e.g. `[160586]`
- `created_by`: object - User recorded as the author of the Observation.
  - `id`: integer - User ID of the creator. e.g. `47531`
  - `name`: string - Creator's name as stored on the Observation at creation time. e.g. `Jane Doe`
  - `login`: string - Deprecated — not returned by this endpoint. Resolve the creator's email from the Directory using `created_by.id`. e.g. `carl.contractor@example.com`
  - `vendor`: object - Company the creator belongs to. Omitted when the creator is not associated with a vendor.
    - `id`: integer - Vendor ID of the creator's company. e.g. `2675`
    - `name`: string - Name of the creator's company. e.g. `Brick and Morty`
- `specification_section`: object - Specification Section the Observation references. Omitted when no section is set.
  - `id`: integer - ID of the Specification Section. e.g. `4521`
  - `description`: string - Title of the Specification Section. e.g. `Acoustical Panel Ceilings`
  - `number`: string - Deprecated — not returned by this endpoint. Use `section` for the section number. e.g. `42`
  - `section`: string - Section number as printed in the specification book. e.g. `09 51 00`
  - `latest_revision_url`: string - Time-limited URL to the PDF of the section's current revision. Null when the section has no uploaded revision. e.g. `https://storage.procore.com/spec-section.pdf`
  - `current_revision_id`: integer - ID of the section's current revision. Null when the section has no revisions. e.g. `42`
  - `viewable_document_id`: integer - ID of the viewable document generated for the current revision, for use with the document viewer. Null while conversion is pending. e.g. `42`
- `location`: object - Location the Observation was recorded at. Omitted when no location is set.
  - `id`: integer - ID of the Location. Pass as `observation[location_id]` on create or update, or as `filters[location_id]` when listing. e.g. `15504`
  - `name`: string - Full multi-tier path of the Location, tiers joined with `>`. e.g. `Building A>Level 2>Room 210`
  - `node_name`: string - Name of the deepest Location tier only, without its ancestors. e.g. `Room 210`
  - `parent_id`: integer - Deprecated — not returned by this endpoint. e.g. `788866`
  - `created_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2016-08-01T23:33:54Z`
- `trade`: object - Trade responsible for the Observation. Omitted when no trade is set.
  - `id`: integer - ID of the Trade. Pass as `observation[trade_id]` on create or update, or as `filters[trade_ids]` when listing. e.g. `999`
  - `name`: string - Display name of the Trade. e.g. `09 - acoustical panels`
  - `active`: boolean - Deprecated — not returned by this endpoint. e.g. `true`
  - `updated_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2016-08-01T23:33:54Z`
- `type`: object - Observation Type classifying this Observation. Omitted only if the Observation has no type.
  - `id`: integer - ID of the Observation Type. Pass as `observation[type_id]` on create or update, or as `filters[type_id]` when listing. e.g. `9`
  - `category`: string - Localized display name of the type's Observations Category. Companies can define their own categories, so treat this as free-form text; use `category_key` for programmatic comparisons. e.g. `Commissioning`
  - `category_key`: string - Stable, unlocalized key of the type's Observations Category. Prefer this over `category` when branching on category in code. e.g. `work_to_complete`
  - `category_id`: integer - Deprecated — not returned by this endpoint. Use `type.observations_category.id`. e.g. `13`
  - `name`: string - Display name of the Observation Type, localized where a translation exists. e.g. `Commissioning`
  - `observations_category`: object - The Observations Category the type belongs to. Managed via `GET /rest/v2.0/companies/{company_id}/observations/categories`.
    - `id`: integer - ID of the Observations Category. e.g. `13`
    - `name`: string - Stable, unlocalized name of the category. e.g. `commissioning`
    - `grouping`: string enum[quality, safety] - Top-level bucket the category rolls up to. Drives which Observations area the item appears in when the Company has group split enabled. e.g. `quality`
    - `updated_at`: string(date-time) - ISO 8601 timestamp of the last change to the category. e.g. `2016-08-01T23:33:54Z`
  - `active`: boolean - Deprecated — not returned by this endpoint. Read from `GET /rest/v1.0/observations/types` instead. e.g. `true`
  - `company_active`: boolean - Deprecated — not returned by this endpoint. Read from `GET /rest/v1.0/observations/types` instead. e.g. `true`
  - `parent_inactive`: boolean - Deprecated — not returned by this endpoint. Read from `GET /rest/v1.0/observations/types` instead. e.g. `false`
  - `in_use`: boolean - Deprecated — not returned by this endpoint. Read from `GET /rest/v1.0/observations/types` instead. e.g. `false`
  - `kind`: string - Deprecated — not returned by this endpoint. Read from `GET /rest/v1.0/observations/types` instead. e.g. `project`
  - `name_translations`: object - Company-authored translations of the type name, keyed by locale code. Null when the Company has not configured custom translations for this type. Additional locale keys beyond those listed may be present.
    - `en`: string - Translation of the type name for the `en` locale. e.g. `Commissioning`
    - `es`: string - Translation of the type name for the `es` locale. e.g. `Puesta en marcha`
    - `fr-CA`: string - Translation of the type name for the `fr-CA` locale. e.g. `Mise en service`
    - `en-AU`: string - Translation of the type name for the `en-AU` locale. e.g. `Commissioning`
  - `localized_name`: string - Deprecated — not returned by this endpoint. `type.name` is already localized. e.g. `Commissioning`
- `contributing_behavior`: object - Root-cause behavior recorded against the Observation. Omitted when none is set. The full list is managed at the Company level.
  - `id`: integer - ID of the Contributing Behavior. Pass as `observation[contributing_behavior_id]` on create or update. e.g. `999`
  - `name`: string - Display name of the Contributing Behavior. e.g. `Distraction`
  - `active`: boolean - Deprecated — not returned by this endpoint. e.g. `true`
  - `global`: boolean - Deprecated — not returned by this endpoint. e.g. `false`
  - `created_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2016-10-25T17:53:35Z`
- `contributing_condition`: object - Root-cause condition recorded against the Observation. Omitted when none is set. The full list is managed at the Company level.
  - `id`: integer - ID of the Contributing Condition. Pass as `observation[contributing_condition_id]` on create or update. e.g. `9001`
  - `name`: string - Display name of the Contributing Condition. e.g. `Environment`
  - `active`: boolean - Deprecated — not returned by this endpoint. e.g. `true`
  - `global`: boolean - Deprecated — not returned by this endpoint. e.g. `false`
  - `created_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2019-01-18T21:36:55Z`
  - `updated_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2019-01-18T21:46:56Z`
- `hazard`: object - Hazard recorded against the Observation. Omitted when none is set. The full list is managed at the Company level.
  - `id`: integer - ID of the Hazard. Pass as `observation[hazard_id]` on create or update. e.g. `1738`
  - `name`: string - Display name of the Hazard. e.g. `Slip`
  - `active`: boolean - Deprecated — not returned by this endpoint. e.g. `true`
  - `global`: boolean - Deprecated — not returned by this endpoint. e.g. `false`
  - `created_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2016-10-25T17:53:35Z`
- `download_all_attachments_uuid`: string - Single-use token identifying a bulk download of every attachment on this Observation. Returned only by `GET /rest/v1.0/observations/items/{id}`. Supply it to the attachment bulk-download endpoint to retrieve the zip. e.g. `8f14e45f-ceea-467a-9a2c-4a4b0e0e6c1d`
- `custom_fields`: object - Values for the Custom Fields configured on the Observations Category Configurable Field Set that applies to this Observation. Keys are `custom_field_{custom_field_definition_id}`; the definitions are listed by `GET /r...
  - `custom_field_%{custom_field_string_definition_id}`: object - A Custom Field whose definition has a `string` data type.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `string`
    - `value`: string - Text value recorded for this Custom Field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object - A Custom Field whose definition has a `decimal` data type.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `decimal`
    - `value`: number - Numeric value recorded for this Custom Field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object - A Custom Field whose definition has a `boolean` data type.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `boolean`
    - `value`: boolean - Boolean value recorded for this Custom Field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object - A Custom Field whose definition has a `lov_entry` data type — a single selection from a configured list of values.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `lov_entry`
    - `value`: object - The selected list-of-values entry.
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object - A Custom Field whose definition has a `lov_entries` data type — multiple selections from a configured list of values.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `lov_entries`
    - `value`: array of object - The selected list-of-values entries.

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/observations/items/{id}

**Update Observation Item**
Updates an Observation Item. Only the attributes you send are changed.
Changing `status` appends a Response Log entry and notifies the distribution list; changing the assignee set notifies the users added. Supply either `assignee_id` or `assignee_ids`, not both.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Observation Item ID
- `view` [query] string enum[flat_v0, normal, safety_hub] - Controls which Observation Item fields are returned. `normal` (the default) returns the documented detail payload, including `distribution_members`. `flat_v0` adds `distribution_member_ids`, which always matches `dist...

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the Observation Item belongs to
- `observation`: object (required)
  - `assignee_id`: integer - The ID of the Assignee of the Observation Item e.g. `123`
  - `asset_ids`: array of string - IDs of Assets to link to the Observation Item via Related Items. Replaces any existing asset links. Pass an empty array to unlink all Assets. e.g. `["01HRBC2PNKW5ZDJX7MQVE4TF8G", "01HRBC5YVST8AMKN3XCJP6WD2H"]`
  - `checklist_item_id`: integer - Sets the origin to the ID of a Checklist Item (Note: the Item's origin can either be a coordination_issue_id, checklist_list_id or incident_action_id) e.g. `456`
  - `contributing_behavior_id`: integer - The ID of the Contributing Behavior associated to the Observation Item e.g. `789`
  - `contributing_condition_id`: integer - The ID of the Contributing Condition associated to the Observation Item e.g. `123`
  - `coordination_issue_id`: integer - Sets the origin to the ID of a Coordination Issue (Note: the Item's origin can either be a coordination_issue_id, checklist_list_id or incident_action_id) e.g. `456`
  - `description`: string - The Description of the Observation Item e.g. `Example Observation Item`
  - `due_date`: string(date) - The Due Date of the Observation Item e.g. `2021-09-21`
  - `hazard_id`: integer - The ID of the Hazard associated to the Observation Item e.g. `123`
  - `name`: string - The Name of the Observation Item e.g. `Example Observation Item`
  - `number`: string - The Number of the Observation Item e.g. `42`
  - `incident_action_id`: integer - Sets the origin to the ID of an Incident Action (Note: the Item's origin can either be a coordination_issue_id, checklist_list_id or incident_action_id) e.g. `123`
  - `personal`: boolean - The Personal status of the Observation Item e.g. `true`
  - `priority`: string enum[Low, Medium, High, Urgent] - The Priority of the Observation Item e.g. `Low`
  - `specification_section_id`: integer - The ID of a Specification Section e.g. `123`
  - `status`: string enum[initiated, ready_for_review, not_accepted, closed, draft] - Lifecycle state to set on the Observation Item. Read the values the requesting user may set from `GET /rest/v1.0/projects/{project_id}/observations/items/statuses?id={id}`. `draft` is managed by Observations workflows... e.g. `initiated`
  - `trade_id`: integer - The ID of the Trade of the Observation Item e.g. `123`
  - `type_id`: integer - The ID of the Type of the Observation Item e.g. `456`
  - `distribution_member_ids`: array of integer - An array of the IDs of the Distribution Member of the Observation Item e.g. `[123, 456]`
  - `location_id`: integer - The ID of the Location of the Observation Item. Use either `location_id` or `mt_location` but not both. e.g. `123`
  - `mt_location`: array of string - Use this for creating a new multi-tier or single-tier Location. This will be ignored if `location_id` is provided. e.g. `["Location 1", "Location 2"]`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `prostore_file_ids`: array of integer - Prostore file IDs to attach to the observation item e.g. `[7889253049, 8981591777]`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer - Unique identifier for this Observation Item. Pass as the `{id}` path parameter to `GET /rest/v1.0/observations/items/{id}`, or as `filters[id]` when listing. e.g. `9378`
- `number`: string - Human-facing identifier of the Observation within its Project. Assigned automatically from the next available number when not supplied on create. Sortable via `sort=number`. e.g. `96`
- `name`: string - Short title of the Observation, shown as the row label in the Observations list. e.g. `Personnel not wearing full PPE`
- `description`: string - Plain-text rendering of the Observation description, with HTML markup stripped. Use for search indexing or plain-text export; use `description_rich_text` to render formatted content. e.g. `Worker was seen not wearing their hard hat`
- `description_rich_text`: string - Sanitized HTML version of the Observation description, safe to render in a rich-text viewer. e.g. `<p>Worker was seen not wearing their hard hat</p>`
- `status`: string enum[initiated, ready_for_review, not_accepted, closed, draft] - Current lifecycle state of the Observation. `draft` is only produced for Observations governed by a workflow that has not yet been started. Filter collections with `filters[status]`, and read the settable values for a... e.g. `initiated`
- `checklist_item`: object - Inspection (Checklist) item this Observation was raised from. Null unless the Observation originated from an Inspection.
  - `id`: integer - ID of the source Checklist Item. e.g. `98`
- `checklist_list`: object - Inspection (Checklist List) containing the source Checklist Item. Null unless the Observation originated from an Inspection.
  - `id`: integer - ID of the source Checklist List. e.g. `11`
- `priority`: string enum[Low, Medium, High, Urgent] - Urgency assigned to the Observation. Filter collections with `filters[priority]` and sort with `sort=priority`. e.g. `Urgent`
- `date_notified`: string(date) - Date the current assignee was last notified by email. Set when an assignee is added and cleared when the last assignee is removed. Null while the Observation is unsent — those Observations are the ones returned by `PO... e.g. `2016-02-17`
- `due_date`: string(date) - Date the assignee is expected to resolve the Observation. Defaults from the Project's Observations configuration `days_due_default` when the client does not supply one. e.g. `2016-02-25`
- `closed_at`: string(date-time) - ISO 8601 timestamp of when the Observation last moved to `closed`. Null if the Observation has never been closed. e.g. `2020-01-23T21:39:40Z`
- `created_at`: string(date-time) - ISO 8601 timestamp of when the Observation was created. e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the last change to the Observation. Use with `filters[updated_at]` to poll for incremental changes. e.g. `2012-10-24T21:39:40Z`
- `deleted_at`: string(date-time) - ISO 8601 timestamp of when the Observation was sent to the recycle bin. Null for active Observations. Deleted Observations are only returned by the recycle bin endpoints. e.g. `2012-10-24T21:39:40Z`
- `personal`: boolean - Whether the Observation is private. Private Observations are visible only to their creator, assignees, distribution members, and Observations admins. Defaults from the Project's `private_by_default` configuration. e.g. `false`
- `asset_ids`: array of string - IDs of Assets linked to this Observation Item via Related Items e.g. `["01HRBC2PNKW5ZDJX7MQVE4TF8G", "01HRBC5YVST8AMKN3XCJP6WD2H"]`
- `current_drawing_revision_ids`: array of integer - IDs of the current revisions of every Drawing this Observation is pinned to. Empty when the Observation is not linked to any Drawing. e.g. `[4471203]`
- `drawing_revisions`: array of integer - IDs of every Drawing Revision this Observation is associated with, including superseded revisions. e.g. `[4471203, 4471190]`
- `drawing_ids`: array of integer - Distinct Drawing IDs derived from `drawing_revisions`. Use to link back to the Drawings tool without resolving revisions yourself. e.g. `[88213]`
- `origin`: object - The record this Observation was created from. Omitted when the Observation was created directly in the Observations tool. `payload` keys vary by `type`.
  - `type`: string enum[inspection, incident, coordination_issue, bim_model] - Kind of record the Observation originated from. e.g. `inspection`
  - `payload`: object - Identifiers for the originating record. Only the keys relevant to `type` are present.
    - `checklist_item_id`: integer - ID of the source Checklist Item. Present when `type` is `inspection`. e.g. `42`
    - `checklist_list_id`: integer - ID of the source Checklist List. Present when `type` is `inspection`. e.g. `42`
    - `coordination_issue_id`: integer - ID of the source Coordination Issue. Present when `type` is `coordination_issue`. e.g. `2312`
    - `coordination_issue_number`: integer - Display number of the source Coordination Issue. Present when `type` is `coordination_issue`. e.g. `21`
    - `incident_action_id`: integer - ID of the source Incident Action. Present when `type` is `incident`. e.g. `53`
    - `incident_id`: integer - ID of the Incident owning the source Incident Action. Present when `type` is `incident`. e.g. `53`
    - `bim_model_id`: integer - ID of the source BIM Model. Present when `type` is `bim_model`. e.g. `63`
    - `bim_model_name`: string - Title of the source BIM Model. Present when `type` is `bim_model`. e.g. `Combined Model`
    - `name`: string - Human-readable label for the originating record, suitable for display as a breadcrumb back to the source tool. e.g. `Origin Name`
- `viewpoint`: object - Saved BIM camera position captured when the Observation was raised from a BIM Model. Present only when `origin.type` is `bim_model` and a viewpoint was captured.
  - `id`: integer - ID of the BIM Viewpoint. e.g. `3312`
  - `name`: string - Name given to the saved viewpoint. e.g. `Level 2 - Mechanical Room`
  - `bim_file_id`: integer - ID of the BIM File the viewpoint was captured in. e.g. `8891`
  - `camera_data`: object - Opaque camera state (position, target, field of view) used by the BIM viewer to restore the saved view. Pass back to the viewer unmodified.
  - `redlines_data`: object - Opaque markup overlay data drawn on the viewpoint. Pass back to the BIM viewer unmodified.
  - `sections_data`: object - Opaque section-plane state applied to the model in this viewpoint. Pass back to the BIM viewer unmodified.
  - `snapshot`: object - Rendered still image of the viewpoint. An empty object when no snapshot image was stored.
    - `id`: integer - ID of the snapshot file. e.g. `77123`
    - `filename`: string - Stored filename of the snapshot image. e.g. `viewpoint-snapshot.png`
    - `name`: string - Display name of the snapshot image. e.g. `viewpoint-snapshot.png`
    - `url`: string - Time-limited URL for downloading the snapshot image. e.g. `https://storage.procore.com/viewpoint-snapshot.png`
- `attachments`: array of oneOf(object | object) - Files attached to the Observation. Each entry is either a Procore-stored file or a Procore Document Management document reference. Add attachments with `upload_ids` or `document_management_document_revision_ids`.
- `assignee`: object - Most recently added assignee. Omitted when the Observation has no assignees. When multiple assignees are supported, read the full list from `assignees` instead.
  - `id`: integer - User ID of the assignee. Matches an `id` from `GET /rest/v1.0/observations/assignees`. e.g. `29837`
  - `name`: string - Assignee's name, formatted first-name-first. e.g. `John Smith`
  - `vendor`: object - Company the assignee belongs to in this Procore company directory. Omitted when the assignee is not associated with a vendor.
    - `id`: integer - Vendor ID of the assignee's company. e.g. `2675`
    - `name`: string - Name of the assignee's company. e.g. `Brick and Morty`
- `assignees`: array of object - Every user currently assigned to the Observation, most recently added first. Omitted when the Observation has no assignees. Set with `observation[assignee_ids]`.
  - `id`: integer - User ID of the assignee. e.g. `29837`
  - `name`: string - Assignee's name, formatted first-name-first. e.g. `John Smith`
  - `vendor`: object - Company the assignee belongs to. Omitted when the assignee is not associated with a vendor.
    - `id`: integer - Vendor ID of the assignee's company. e.g. `2675`
    - `name`: string - Name of the assignee's company. e.g. `Brick and Morty`
- `distribution_members`: array of object - Users copied on email notifications for this Observation. Omitted when the distribution list is empty. Set with `observation[distribution_member_ids]`.
  - `id`: integer - User ID of the distribution member. e.g. `160586`
  - `login`: string - Email address the notification is sent to. e.g. `carl.contractor@example.com`
  - `name`: string - Distribution member's name, formatted first-name-first. e.g. `Carl Contractor`
- `distribution_member_ids`: array of integer - User IDs of the Observation distribution members, returned when `view=flat_v0`. Always matches `distribution_members`. Empty when the distribution list has no members. e.g. `[160586]`
- `created_by`: object - User recorded as the author of the Observation.
  - `id`: integer - User ID of the creator. e.g. `47531`
  - `name`: string - Creator's name as stored on the Observation at creation time. e.g. `Jane Doe`
  - `login`: string - Deprecated — not returned by this endpoint. Resolve the creator's email from the Directory using `created_by.id`. e.g. `carl.contractor@example.com`
  - `vendor`: object - Company the creator belongs to. Omitted when the creator is not associated with a vendor.
    - `id`: integer - Vendor ID of the creator's company. e.g. `2675`
    - `name`: string - Name of the creator's company. e.g. `Brick and Morty`
- `specification_section`: object - Specification Section the Observation references. Omitted when no section is set.
  - `id`: integer - ID of the Specification Section. e.g. `4521`
  - `description`: string - Title of the Specification Section. e.g. `Acoustical Panel Ceilings`
  - `number`: string - Deprecated — not returned by this endpoint. Use `section` for the section number. e.g. `42`
  - `section`: string - Section number as printed in the specification book. e.g. `09 51 00`
  - `latest_revision_url`: string - Time-limited URL to the PDF of the section's current revision. Null when the section has no uploaded revision. e.g. `https://storage.procore.com/spec-section.pdf`
  - `current_revision_id`: integer - ID of the section's current revision. Null when the section has no revisions. e.g. `42`
  - `viewable_document_id`: integer - ID of the viewable document generated for the current revision, for use with the document viewer. Null while conversion is pending. e.g. `42`
- `location`: object - Location the Observation was recorded at. Omitted when no location is set.
  - `id`: integer - ID of the Location. Pass as `observation[location_id]` on create or update, or as `filters[location_id]` when listing. e.g. `15504`
  - `name`: string - Full multi-tier path of the Location, tiers joined with `>`. e.g. `Building A>Level 2>Room 210`
  - `node_name`: string - Name of the deepest Location tier only, without its ancestors. e.g. `Room 210`
  - `parent_id`: integer - Deprecated — not returned by this endpoint. e.g. `788866`
  - `created_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2016-08-01T23:33:54Z`
- `trade`: object - Trade responsible for the Observation. Omitted when no trade is set.
  - `id`: integer - ID of the Trade. Pass as `observation[trade_id]` on create or update, or as `filters[trade_ids]` when listing. e.g. `999`
  - `name`: string - Display name of the Trade. e.g. `09 - acoustical panels`
  - `active`: boolean - Deprecated — not returned by this endpoint. e.g. `true`
  - `updated_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2016-08-01T23:33:54Z`
- `type`: object - Observation Type classifying this Observation. Omitted only if the Observation has no type.
  - `id`: integer - ID of the Observation Type. Pass as `observation[type_id]` on create or update, or as `filters[type_id]` when listing. e.g. `9`
  - `category`: string - Localized display name of the type's Observations Category. Companies can define their own categories, so treat this as free-form text; use `category_key` for programmatic comparisons. e.g. `Commissioning`
  - `category_key`: string - Stable, unlocalized key of the type's Observations Category. Prefer this over `category` when branching on category in code. e.g. `work_to_complete`
  - `category_id`: integer - Deprecated — not returned by this endpoint. Use `type.observations_category.id`. e.g. `13`
  - `name`: string - Display name of the Observation Type, localized where a translation exists. e.g. `Commissioning`
  - `observations_category`: object - The Observations Category the type belongs to. Managed via `GET /rest/v2.0/companies/{company_id}/observations/categories`.
    - `id`: integer - ID of the Observations Category. e.g. `13`
    - `name`: string - Stable, unlocalized name of the category. e.g. `commissioning`
    - `grouping`: string enum[quality, safety] - Top-level bucket the category rolls up to. Drives which Observations area the item appears in when the Company has group split enabled. e.g. `quality`
    - `updated_at`: string(date-time) - ISO 8601 timestamp of the last change to the category. e.g. `2016-08-01T23:33:54Z`
  - `active`: boolean - Deprecated — not returned by this endpoint. Read from `GET /rest/v1.0/observations/types` instead. e.g. `true`
  - `company_active`: boolean - Deprecated — not returned by this endpoint. Read from `GET /rest/v1.0/observations/types` instead. e.g. `true`
  - `parent_inactive`: boolean - Deprecated — not returned by this endpoint. Read from `GET /rest/v1.0/observations/types` instead. e.g. `false`
  - `in_use`: boolean - Deprecated — not returned by this endpoint. Read from `GET /rest/v1.0/observations/types` instead. e.g. `false`
  - `kind`: string - Deprecated — not returned by this endpoint. Read from `GET /rest/v1.0/observations/types` instead. e.g. `project`
  - `name_translations`: object - Company-authored translations of the type name, keyed by locale code. Null when the Company has not configured custom translations for this type. Additional locale keys beyond those listed may be present.
    - `en`: string - Translation of the type name for the `en` locale. e.g. `Commissioning`
    - `es`: string - Translation of the type name for the `es` locale. e.g. `Puesta en marcha`
    - `fr-CA`: string - Translation of the type name for the `fr-CA` locale. e.g. `Mise en service`
    - `en-AU`: string - Translation of the type name for the `en-AU` locale. e.g. `Commissioning`
  - `localized_name`: string - Deprecated — not returned by this endpoint. `type.name` is already localized. e.g. `Commissioning`
- `contributing_behavior`: object - Root-cause behavior recorded against the Observation. Omitted when none is set. The full list is managed at the Company level.
  - `id`: integer - ID of the Contributing Behavior. Pass as `observation[contributing_behavior_id]` on create or update. e.g. `999`
  - `name`: string - Display name of the Contributing Behavior. e.g. `Distraction`
  - `active`: boolean - Deprecated — not returned by this endpoint. e.g. `true`
  - `global`: boolean - Deprecated — not returned by this endpoint. e.g. `false`
  - `created_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2016-10-25T17:53:35Z`
- `contributing_condition`: object - Root-cause condition recorded against the Observation. Omitted when none is set. The full list is managed at the Company level.
  - `id`: integer - ID of the Contributing Condition. Pass as `observation[contributing_condition_id]` on create or update. e.g. `9001`
  - `name`: string - Display name of the Contributing Condition. e.g. `Environment`
  - `active`: boolean - Deprecated — not returned by this endpoint. e.g. `true`
  - `global`: boolean - Deprecated — not returned by this endpoint. e.g. `false`
  - `created_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2019-01-18T21:36:55Z`
  - `updated_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2019-01-18T21:46:56Z`
- `hazard`: object - Hazard recorded against the Observation. Omitted when none is set. The full list is managed at the Company level.
  - `id`: integer - ID of the Hazard. Pass as `observation[hazard_id]` on create or update. e.g. `1738`
  - `name`: string - Display name of the Hazard. e.g. `Slip`
  - `active`: boolean - Deprecated — not returned by this endpoint. e.g. `true`
  - `global`: boolean - Deprecated — not returned by this endpoint. e.g. `false`
  - `created_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2016-10-25T17:53:35Z`
  - `updated_at`: string(date-time) - Deprecated — not returned by this endpoint. e.g. `2016-10-25T17:53:35Z`
- `download_all_attachments_uuid`: string - Single-use token identifying a bulk download of every attachment on this Observation. Returned only by `GET /rest/v1.0/observations/items/{id}`. Supply it to the attachment bulk-download endpoint to retrieve the zip. e.g. `8f14e45f-ceea-467a-9a2c-4a4b0e0e6c1d`
- `custom_fields`: object - Values for the Custom Fields configured on the Observations Category Configurable Field Set that applies to this Observation. Keys are `custom_field_{custom_field_definition_id}`; the definitions are listed by `GET /r...
  - `custom_field_%{custom_field_string_definition_id}`: object - A Custom Field whose definition has a `string` data type.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `string`
    - `value`: string - Text value recorded for this Custom Field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object - A Custom Field whose definition has a `decimal` data type.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `decimal`
    - `value`: number - Numeric value recorded for this Custom Field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object - A Custom Field whose definition has a `boolean` data type.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `boolean`
    - `value`: boolean - Boolean value recorded for this Custom Field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object - A Custom Field whose definition has a `lov_entry` data type — a single selection from a configured list of values.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `lov_entry`
    - `value`: object - The selected list-of-values entry.
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object - A Custom Field whose definition has a `lov_entries` data type — multiple selections from a configured list of values.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `lov_entries`
    - `value`: array of object - The selected list-of-values entries.

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/observations/items/{id}/send_email

**Send Observation Item Email**
Sends an email for an Observation Item in a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Observation Item ID
- `project_id` [query] integer (required) - Project ID

Request body (application/json) (required):

- `subject`: string - Email Subject e.g. `Description of email`
- `body`: string - Email Body e.g. `Body of email`
- `distribution_ids`: array of integer
- `cc_distribution_ids`: array of integer
- `bcc_distribution_ids`: array of integer

Response 200: OK (no body)

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/observations/potential_distribution_members

**List Observation Potential Distribution Members**
Returns a collection of Potential Users for the Observations Distribution List

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[search]` [query] string - Return item(s) matching the specified Search query.

Response 200 (application/json): array of object

- `id`: integer - User ID. Pass inside `observation[distribution_member_ids]` when creating or updating an Observation Item, or inside `default_distribution` when updating the Project's Observations configuration. e.g. `160586`
- `login`: string - Email address Observation notifications are sent to. e.g. `example@example.com`
- `name`: string - User's name, formatted first-name-first. e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/observations/types

**List Observation Types**
Returns a collection of Observation Types from the Project's Company or from the Company,
depending on which query parameter is used.
NOTE: Though both query parameters are marked as required below, only one of the two
needs to be passed in (i.e., if you pass in a project_id then you do not need to also
pass in a company_id, and vice versa).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer (required) - Unique identifier for this Observation Type. Pass as `observation[type_id]` when creating or updating an Observation Item, or as `filters[type_id]` to scope a list of Observation Items to this type. e.g. `9`
- `category`: string (required) - Localized display name of the Observations Category this type belongs to. Procore ships six built-in categories (Quality, Safety, Commissioning, Warranty, Work to Complete, Environmental), but companies can define add... e.g. `Commissioning`
- `category_key`: string - Stable, unlocalized key of the Observations Category (the category's stored `name`). Prefer this over `category` when branching on category in code. e.g. `work_to_complete`
- `category_id`: integer (required) - ID of the Observations Category this type belongs to. Corresponds to the `id` returned by `GET /rest/v2.0/companies/{company_id}/observations/categories`. e.g. `13`
- `name`: string (required) - Display name of the Observation Type, localized to the requesting user's locale when a translation exists. Shown in the Observation Type picker. e.g. `Commissioning`
- `active`: boolean - Whether this type can be selected on new Observations in the current context. For a company-level type viewed in a Project scope this reflects the project-level activation; otherwise it reflects the type's own active ... e.g. `true`
- `company_active`: boolean - Whether the type is active at the Company level, ignoring any project-level activation override. Compare with `active` to detect a type that is enabled company-wide but switched off for this Project. e.g. `true`
- `parent_inactive`: boolean - True when this is a project-level type whose parent company-level type has been deactivated. Such a type cannot be used on new Observations even if `active` is true. e.g. `false`
- `in_use`: boolean - Whether at least one Observation Item currently references this type (or one of its project-level children). Use to warn before deactivating or deleting a type. e.g. `false`
- `kind`: string enum[company, project] - Whether the type is owned by the Company or defined on a single Project. Project-level types are only selectable within their own Project. e.g. `project`
- `name_translations`: object - Company-authored translations of the type name, keyed by locale code. Null when the Company has not configured any custom translations for this type. Additional locale keys beyond those listed may be present.
  - `en`: string - Translation of the type name for the `en` locale. e.g. `Commissioning`
  - `es`: string - Translation of the type name for the `es` locale. e.g. `Puesta en marcha`
  - `fr-CA`: string - Translation of the type name for the `fr-CA` locale. e.g. `Mise en service`
  - `en-AU`: string - Translation of the type name for the `en-AU` locale. e.g. `Commissioning`
- `localized_name`: string - Type name resolved for the locale of the request, falling back to the Company default and then the stored name. Display this to end users rather than reimplementing the fallback chain. e.g. `Commissioning`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/observations/response_logs

**List Observations Response Logs**
Returns a collection of Response Logs scoped to viewable Observations
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this Response Log entry. Pass as the `{id}` path parameter to `GET /rest/v1.0/observations/items/{item_id}/response_logs/{id}`. e.g. `2974`
- `item_id`: integer - ID of the Observation Item this Response Log belongs to. Use as the `{item_id}` path parameter when reading sibling Response Logs. e.g. `49`
- `status`: string enum[Initiated, Ready For Review, Not Accepted, Closed, Draft] - Status the Observation was moved to by this Response Log, stored in title-cased form. Comment-only entries carry the Observation's status at the time the comment was posted. Note the casing differs from the `snake_cas... e.g. `Ready For Review`
- `comment`: string - Free-text note recorded with this Response Log. Null when the entry was generated by a status change with no accompanying comment. e.g. `See the attached photo for issue resolution.`
- `created_at`: string(date-time) - ISO 8601 timestamp of when the Response Log was recorded. Response Logs are returned oldest-first, so this doubles as the activity-feed ordering key. e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Deprecated — not returned by this endpoint. Response Logs are immutable once created; use `created_at`. e.g. `2012-10-23T21:39:40Z`
- `created_by_name`: string - Deprecated — not returned by this endpoint. Use `created_by.name`. e.g. `John Smith`
- `attachments`: array of oneOf(object | object) - Files attached to this Response Log. Each entry is either a Procore-stored file or a Procore Document Management document reference. Add attachments on create with `response_log[upload_ids]` or `response_log[document_...
- `created_by`: object - User who recorded this Response Log.
  - `id`: integer - User ID of the author. e.g. `973`
  - `name`: string - Author's name as captured when the Response Log was created. Stored on the record, so it does not change if the user is later renamed. e.g. `John Smith`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/observations/items/statuses

**List available Observation Item statuses with localized labels**
Returns the Observation statuses available on this Project, each paired with a localized label suitable for a status picker.
When `id` is omitted, every available status is returned without permission filtering. When `id` is supplied, the list is narrowed to the statuses the requesting user is actually allowed to set on that Observation — call it with `id` before rendering a status dropdown so users are not offered transitions that will be rejected.
The `draft` status is only included for Companies whose Observations are workflow-governed.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [query] integer - Observation Item ID. When provided, returns only the statuses the requesting user may set on that specific Observation. When omitted, returns all statuses available on the Project.

Response 200 (application/json): array of object

- `value`: string enum[initiated, ready_for_review, not_accepted, closed, draft] - Status value to send as `observation[status]` when updating an Observation Item. e.g. `initiated`
- `label`: string - Human-readable status name, localized to the requesting user's locale. Display this rather than `value`. e.g. `Initiated`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/observations/items/{id}

**Delete Observation Item**
Sends the specified Observation Item to the recycle bin.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Observation ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/observations/items

**List Recycled Observation Items**
Returns a collection of Recycled Observation Items.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[type_id]` [query] array of integer - Return item(s) with the specified Observation Type ID.
- `filters[trade_ids]` [query] array of integer - Array of Trade IDs. Returns item(s) with the specified Trade IDs.
- `filters[assignee_id]` [query] array of integer - Return item(s) assigned to the specified User ID.
- `filters[status]` [query] array of integer enum[0, 1, 2, 3, 4] - Return only Observation Items in the given lifecycle states. Statuses are supplied as their integer codes: ``` 0: Initiated 1: Ready For Review 2: Not Accepted 3: Closed 4: Draft ``` Comma-separate values to match sev...
- `filters[priority]` [query] array of string enum[Low, Medium, High, Urgent] - Return only Observation Items at the given priorities. Values are case-sensitive and match the `priority` field on the Observation. Comma-separate values to match several priorities, e.g. `filters[priority]=High,Urgent`.
- `filters[location_id]` [query] array of integer - Return item(s) with the specified Location IDs.
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `filters[assignee_company_id]` [query] array of integer - Array of Vendor IDs. Returns item(s) where the assignee is associated to the specified Vendor ID.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this Observation Item. Pass as the `{id}` path parameter to `GET /rest/v1.0/observations/items/{id}`, or as `filters[id]` to narrow a list request. e.g. `9378`
- `created_at`: string(date-time) - ISO 8601 timestamp of when the Observation was created. e.g. `2012-10-23T21:39:40Z`
- `closed_at`: string(date-time) - ISO 8601 timestamp of when the Observation last moved to `closed`. Null if the Observation has never been closed. e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - ISO 8601 timestamp of when the Observation was sent to the recycle bin. Null for active Observations. e.g. `2017-07-29T21:39:40Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the last change to the Observation. Use with `filters[updated_at]` to poll for incremental changes. e.g. `2012-10-24T21:39:40Z`
- `number`: string - Human-facing identifier of the Observation within its Project. Sortable via `sort=number`, which is also the default sort. e.g. `87`
- `name`: string - Short title of the Observation, shown as the row label in the Observations list. e.g. `Personnel not wearing full PPE`
- `description`: string - Plain-text rendering of the Observation description, with HTML markup stripped. Use `description_rich_text` to render formatted content. e.g. `Worker was seen not wearing their hard hat`
- `description_rich_text`: string - Sanitized HTML version of the Observation description, safe to render in a rich-text viewer. e.g. `<p>Worker was seen not wearing their hard hat</p>`
- `status`: string enum[initiated, ready_for_review, not_accepted, closed, draft] - Current lifecycle state of the Observation. `draft` is only produced for Observations governed by a workflow that has not yet been started. Filter collections with `filters[status]`. e.g. `initiated`
- `priority`: string enum[Low, Medium, High, Urgent] - Urgency assigned to the Observation. Filter collections with `filters[priority]` and sort with `sort=priority`. e.g. `High`
- `date_notified`: string(date) - Date the current assignee was last notified by email. Null while the Observation is unsent — those are the Observations returned by `POST /rest/v1.0/observations/items/send_unsent`. e.g. `2016-02-17`
- `due_date`: string(date) - Date the assignee is expected to resolve the Observation. Defaults from the Project's Observations configuration `days_due_default`. e.g. `2016-02-22`
- `personal`: boolean - Whether the Observation is private. Private Observations are visible only to their creator, assignees, distribution members, and Observations admins. e.g. `false`
- `origin`: object - The record this Observation was created from. Null when the Observation was created directly in the Observations tool. `payload` keys vary by `type`.
  - `type`: string enum[incident, bim_model, inspection, coordination_issue] - Kind of record the Observation originated from. e.g. `inspection`
  - `payload`: object - Identifiers for the originating record. Only the keys relevant to `type` are present.
    - `checklist_item_id`: integer - ID of the source Checklist Item. Present when `type` is `inspection`. e.g. `42`
    - `checklist_list_id`: integer - ID of the source Checklist List. Present when `type` is `inspection`. e.g. `42`
    - `coordination_issue_id`: integer - ID of the source Coordination Issue. Present when `type` is `coordination_issue`. e.g. `1231`
    - `coordination_issue_number`: integer - Display number of the source Coordination Issue. Present when `type` is `coordination_issue`. e.g. `42`
    - `incident_action_id`: integer - ID of the source Incident Action. Present when `type` is `incident`. e.g. `53`
    - `incident_id`: integer - ID of the Incident owning the source Incident Action. Present when `type` is `incident`. e.g. `53`
    - `bim_model_id`: integer - ID of the source BIM Model. Present when `type` is `bim_model`. e.g. `63`
    - `bim_model_name`: string - Title of the source BIM Model. Present when `type` is `bim_model`. e.g. `Combined Model`
- `assignee`: object - Most recently added assignee. Null when the Observation has no assignees. Read the full list from `assignees`.
  - `id`: integer - User ID of the assignee. Matches an `id` from `GET /rest/v1.0/observations/assignees`. e.g. `9378`
  - `name`: string - Assignee's name, formatted first-name-first. e.g. `Katrina Smith`
  - `vendor`: object - Company the assignee belongs to. Null when the assignee is not associated with a vendor.
    - `id`: integer - Vendor ID of the assignee's company. e.g. `2675`
    - `name`: string - Name of the assignee's company. e.g. `Brick and Morty`
- `assignees`: array of object - Every user currently assigned to the Observation, most recently added first. Empty when the Observation is unassigned. Set with `observation[assignee_ids]`.
  - `id`: integer - User ID of the assignee. e.g. `9378`
  - `name`: string - Assignee's name, formatted first-name-first. e.g. `Katrina Smith`
  - `current`: boolean - Whether the assignee is on the active workflow step. True for assignees outside a workflow. e.g. `true`
  - `vendor`: object - Company the assignee belongs to. Null when the assignee is not associated with a vendor.
    - `id`: integer - Vendor ID of the assignee's company. e.g. `2675`
    - `name`: string - Name of the assignee's company. e.g. `Brick and Morty`
- `created_by`: object - User recorded as the author of the Observation.
  - `id`: integer - User ID of the creator. e.g. `160586`
  - `login`: string - Email address the creator signs in with. e.g. `carl.contractor@example.com`
  - `name`: string - Creator's name, formatted first-name-first. e.g. `Carl Contractor`
  - `company_name`: string - Name of the vendor the creator belongs to in this Procore company directory. Null when the creator is not associated with a vendor. e.g. `Brick and Morty`
- `location`: object - Location the Observation was recorded at. Null when no location is set. Filter collections with `filters[location_id]`.
  - `id`: integer - ID of the Location. Pass as `observation[location_id]` on create or update. e.g. `15504`
  - `name`: string - Full multi-tier path of the Location, tiers joined with `>`. e.g. `Building A>Level 2`
  - `node_name`: string - Name of the deepest Location tier only, without its ancestors. e.g. `Level 2`
  - `parent_id`: integer - ID of the parent Location tier. Null for a top-level Location. Use to walk the Location hierarchy. e.g. `788866`
  - `created_at`: string(date-time) - ISO 8601 timestamp of when the Location was created. e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - ISO 8601 timestamp of the last change to the Location. e.g. `2016-08-01T23:33:54Z`
- `specification_section`: object - Specification Section the Observation references. Null when no section is set.
  - `id`: integer - ID of the Specification Section. e.g. `4521`
  - `description`: string - Title of the Specification Section. e.g. `Acoustical Panel Ceilings`
  - `number`: string - Section number as printed in the specification book. e.g. `09 51 00`
  - `latest_revision_url`: string - Time-limited URL to the PDF of the section's current revision. Null when the section has no uploaded revision. e.g. `https://storage.procore.com/spec-section.pdf`
  - `current_revision_id`: integer - ID of the section's current revision. Null when the section has no revisions. e.g. `42`
  - `viewable_document_id`: integer - ID of the viewable document generated for the current revision, for use with the document viewer. Null while conversion is pending. e.g. `42`
- `trade`: object - Trade responsible for the Observation. Null when no trade is set. Filter collections with `filters[trade_ids]`.
  - `id`: integer - ID of the Trade. Pass as `observation[trade_id]` on create or update. e.g. `999`
  - `name`: string - Display name of the Trade. e.g. `09 - acoustical panels`
  - `active`: boolean - Whether the Trade can still be selected on new records. Inactive Trades remain on existing Observations. e.g. `true`
  - `updated_at`: string(date-time) - ISO 8601 timestamp of the last change to the Trade. e.g. `2016-08-01T23:33:54Z`
- `category`: object - Observations Category of this Observation's type, flattened for convenience. Null when the Observation has no type. Use `grouping` to route the item to the Quality or Safety area when the Company has group split enabled.
  - `name`: string - Stable, unlocalized name of the Observations Category. e.g. `commissioning`
  - `grouping`: string enum[quality, safety] - Top-level bucket the Observations Category rolls up to. e.g. `quality`
- `type`: object - Observation Type classifying this Observation.
  - `id`: integer (required) - ID of the Observation Type. Pass as `observation[type_id]` on create or update, or as `filters[type_id]` when listing. e.g. `9`
  - `category`: string (required) - Localized display name of the type's Observations Category. Companies can define their own categories, so treat this as free-form text; use `category_key` for programmatic comparisons. e.g. `Commissioning`
  - `category_key`: string - Stable, unlocalized key of the type's Observations Category. Prefer this over `category` when branching on category in code. e.g. `work_to_complete`
  - `category_id`: integer - Deprecated — not returned by this endpoint. Use `type.observations_category.id`. e.g. `13`
  - `name`: string (required) - Display name of the Observation Type, localized where a translation exists. e.g. `Commissioning`
  - `observations_category`: object - The Observations Category the type belongs to. Managed via `GET /rest/v2.0/companies/{company_id}/observations/categories`.
    - `id`: integer - ID of the Observations Category. e.g. `13`
    - `name`: string - Stable, unlocalized name of the category. e.g. `commissioning`
    - `grouping`: string enum[quality, safety] - Top-level bucket the category rolls up to. e.g. `quality`
    - `updated_at`: string(date-time) - ISO 8601 timestamp of the last change to the category. e.g. `2016-08-01T23:33:54Z`
  - `active`: boolean - Whether the type can be selected on new Observations in this Project. Inactive types are still returned so existing Observations render correctly. e.g. `true`
  - `company_active`: boolean - Whether the type is active at the Company level, ignoring any project-level override. Compare with `active` to detect a type enabled company-wide but switched off for this Project. e.g. `true`
  - `parent_inactive`: boolean - True when this is a project-level type whose parent company-level type has been deactivated. e.g. `false`
  - `in_use`: boolean - Whether at least one Observation references this type. Always true here, since the Observation being serialized uses it. e.g. `true`
  - `kind`: string enum[company, project] - Whether the type is owned by the Company or defined on a single Project. e.g. `project`
  - `name_translations`: object - Company-authored translations of the type name, keyed by locale code. Null when the Company has not configured custom translations for this type. Additional locale keys beyond those listed may be present.
    - `en`: string - Translation of the type name for the `en` locale. e.g. `Commissioning`
    - `es`: string - Translation of the type name for the `es` locale. e.g. `Puesta en marcha`
    - `fr-CA`: string - Translation of the type name for the `fr-CA` locale. e.g. `Mise en service`
    - `en-AU`: string - Translation of the type name for the `en-AU` locale. e.g. `Commissioning`
  - `localized_name`: string - Type name resolved for the locale of the request, falling back to the Company default and then the stored name. e.g. `Commissioning`
- `custom_fields`: object - Values for the Custom Fields configured on the Observations Category Configurable Field Set that applies to this Observation. Keys are `custom_field_{custom_field_definition_id}`; the definitions are listed by `GET /r...
  - `custom_field_%{custom_field_string_definition_id}`: object - A Custom Field whose definition has a `string` data type.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `string`
    - `value`: string - Text value recorded for this Custom Field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object - A Custom Field whose definition has a `decimal` data type.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `decimal`
    - `value`: number - Numeric value recorded for this Custom Field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object - A Custom Field whose definition has a `boolean` data type.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `boolean`
    - `value`: boolean - Boolean value recorded for this Custom Field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object - A Custom Field whose definition has a `lov_entry` data type — a single selection from a configured list of values.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `lov_entry`
    - `value`: object - The selected list-of-values entry.
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object - A Custom Field whose definition has a `lov_entries` data type — multiple selections from a configured list of values.
    - `data_type`: string - Data type of the Custom Field Definition, determining how `value` is encoded. e.g. `lov_entries`
    - `value`: array of object - The selected list-of-values entries.
- `permissions`: object - What the requesting user may do with this Observation. Only populated when the request asks for a permission-aware view (`view=permissions` or `view=web`); null otherwise.
  - `can_edit`: boolean - Whether the requesting user can update this Observation. When false, a `PATCH` to the Observation will be rejected. e.g. `true`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/observations/items/{id}

**Show Recycled Observation**
Returns a single Observation that is currently in the recycle bin. The response has the same shape as `GET /rest/v1.0/projects/{project_id}/observations/items/{id}` and honors the same `view` parameter. Restore the Observation with `PATCH /rest/v1.0/projects/{project_id}/recycle_bin/observations/items/{id}/restore`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Observation ID

Response 200 (application/json): object

- `id`: integer - Observation Item ID e.g. `9378`
- `number`: string - Observation Item number e.g. `96`
- `name`: string - Observation Item name e.g. `Personnel not wearing full PPE`
- `description`: string - Observation Item description e.g. `Worker was seen not wearing their hard hat`
- `description_rich_text`: string - Observation Item description e.g. `<p>Worker was seen not wearing their hard hat</p>`
- `status`: string enum[initiated, ready_for_review, not_accepted, closed, draft] - Current lifecycle state of the Observation. `draft` is only produced for Observations governed by a workflow that has not yet been started. Read the values the requesting user may set on this Observation from `GET /re... e.g. `initiated`
- `priority`: string enum[Low, Medium, High, Urgent, None] - Observation Item priority e.g. `Urgent`
- `date_notified`: string(date) - Date that the Observation Item Assignee was notified e.g. `2016-02-17`
- `due_date`: string(date) - Observation Item due date e.g. `2016-02-25`
- `closed_at`: string(date-time) - Closed at e.g. `2020-01-23T21:39:40Z`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2012-10-24T21:39:40Z`
- `personal`: boolean - Observation Item privacy status e.g. `false`
- `current_drawing_revision_ids`: array of integer - Current Drawing Revision IDs associated to the Observation Item
- `drawing_revisions`: array of integer - Drawing Revision IDs associated to the Observation Item
- `drawing_ids`: array of integer - Drawing IDs associated to an Observation Item's Drawing Revisions
- `origin`: object - Inspection (Checklist List) that the Observation Item was created from
  - `type`: string - Origin Type e.g. `inspection`
  - `payload`: object - Payload Keys change depending on origin.
    - `checklist_item_id`: integer - Checklist Item ID e.g. `42`
    - `checklist_list_id`: integer - Checklist List ID e.g. `42`
    - `coordination_issue_id`: integer - Coordination Issue ID the Observation Item belongs to e.g. `2312`
    - `coordination_issue_number`: integer - Coordination Issue Number the Observation Item belongs to e.g. `21`
    - `incident_action_id`: integer - Incident action Id the Observation Item belongs to e.g. `53`
    - `incident_id`: integer - Incident Id the Observation Item belongs to e.g. `53`
    - `bim_model_id`: integer - Bim model Id the Observation Item belongs to e.g. `63`
    - `bim_model_name`: string - Bim model name the Observation Item belongs to e.g. `Combined Model`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `assignee`: object - User assigned to the Observation Item
  - `id`: integer - User ID e.g. `29837`
  - `name`: string - User Name e.g. `John Smith`
  - `vendor`: object - Company of User assigned to the Observation Item
    - `id`: integer - Vendor ID e.g. `2675`
    - `name`: string - Vendor Name e.g. `Brick and Morty`
- `distribution_members`: array of object - Users on the Observation Item distribution list
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `created_by`: object - User that created the Observation Item
  - `id`: integer - User ID e.g. `47531`
  - `name`: string - User Name e.g. `Jane Doe`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `vendor`: object - Company of User that created the Observation Item
    - `id`: integer - Vendor ID e.g. `2675`
    - `name`: string - Vendor Name e.g. `Brick and Morty`
- `specification_section`: object - Specification Section
  - `id`: integer - ID
  - `description`: string - Description
  - `number`: string - Number e.g. `42`
  - `section`: string - Number e.g. `42`
  - `latest_revision_url`: string - Url to PDF view e.g. `link_to_pdf`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `type`: object
  - `id`: integer (required) - ID of the Observation Type. Pass as `observation[type_id]` on create or update, or as `filters[type_id]` when listing. e.g. `9`
  - `category`: string (required) - Observation Type category. Default categories are Quality, Safety, Commissioning, Warranty, Work to Complete, and Environmental. Companies may also define custom categories, so this field is not restricted to the defa... e.g. `Commissioning`
  - `category_key`: string - Stable, unlocalized key of the type's Observations Category. Prefer this over `category` when branching on category in code. e.g. `work_to_complete`
  - `category_id`: integer - Deprecated — not returned by this endpoint. Use `type.observations_category.id`. e.g. `13`
  - `name`: string (required) - Display name of the Observation Type, localized where a translation exists. e.g. `Commissioning`
  - `observations_category`: object - The Observations Category the type belongs to. Managed via `GET /rest/v2.0/companies/{company_id}/observations/categories`.
    - `id`: integer - ID of the Observations Category. e.g. `13`
    - `name`: string - Stable, unlocalized name of the category. e.g. `commissioning`
    - `grouping`: string enum[quality, safety] - Top-level bucket the category rolls up to. Drives which Observations area the item appears in when the Company has group split enabled. e.g. `quality`
    - `updated_at`: string(date-time) - ISO 8601 timestamp of the last change to the category. e.g. `2016-08-01T23:33:54Z`
  - `active`: boolean - Whether the type can be selected on new Observations in this Project. Inactive types are still returned so existing Observations render correctly. e.g. `true`
  - `company_active`: boolean - Whether the type is active at the Company level, ignoring any project-level override. Compare with `active` to detect a type enabled company-wide but switched off for this Project. e.g. `true`
  - `parent_inactive`: boolean - True when this is a project-level type whose parent company-level type has been deactivated. e.g. `false`
  - `in_use`: boolean - Whether at least one Observation references this type. Always true here, since the Observation being serialized uses it. e.g. `true`
  - `kind`: string enum[company, project] - Whether the type is owned by the Company or defined on a single Project. e.g. `project`
  - `name_translations`: object - Company-authored translations of the type name, keyed by locale code. Null when the Company has not configured custom translations for this type. Additional locale keys beyond those listed may be present.
    - `en`: string - Translation of the type name for the `en` locale. e.g. `Commissioning`
    - `es`: string - Translation of the type name for the `es` locale. e.g. `Puesta en marcha`
    - `fr-CA`: string - Translation of the type name for the `fr-CA` locale. e.g. `Mise en service`
    - `en-AU`: string - Translation of the type name for the `en-AU` locale. e.g. `Commissioning`
  - `localized_name`: string - Type name resolved for the locale of the request, falling back to the Company default and then the stored name. e.g. `Commissioning`
- `category`: object - Observations Category of this Observation's type, flattened for convenience. Null when the Observation has no type. Use `grouping` to route the item to the Quality or Safety area when the Company has group split enabled.
  - `name`: string - Stable, unlocalized name of the Observations Category. e.g. `commissioning`
  - `grouping`: string enum[quality, safety] - Top-level bucket the Observations Category rolls up to. e.g. `quality`
- `assignees`: array of object - Every user currently assigned to the Observation, most recently added first. Empty when the Observation is unassigned. Set with `observation[assignee_ids]`.
  - `id`: integer - User ID of the assignee. e.g. `29837`
  - `name`: string - Assignee's name, formatted first-name-first. e.g. `John Smith`
  - `current`: boolean - Whether the assignee is on the active workflow step. True for assignees outside a workflow. e.g. `true`
  - `vendor`: object - Company the assignee belongs to. Null when the assignee is not associated with a vendor.
    - `id`: integer - Vendor ID of the assignee's company. e.g. `2675`
    - `name`: string - Name of the assignee's company. e.g. `Brick and Morty`
- `permissions`: object - What the requesting user may do with this Observation. Null unless the request asks for a permission-aware view.
  - `can_edit`: boolean - Whether the requesting user can update this Observation. When false, a `PATCH` to the Observation will be rejected. e.g. `true`
- `viewpoint`: object - Saved BIM camera position captured when the Observation was raised from a BIM Model. Returned when `view=flat_v0`, and only when the Observation originated from a BIM Model.
  - `id`: integer - ID of the BIM Viewpoint. e.g. `3312`
  - `name`: string - Name given to the saved viewpoint. e.g. `Level 2 - Mechanical Room`
  - `bim_file_id`: integer - ID of the BIM File the viewpoint was captured in. e.g. `8891`
  - `camera_data`: object - Opaque camera state used by the BIM viewer to restore the saved view. Pass back to the viewer unmodified.
  - `redlines_data`: object - Opaque markup overlay data drawn on the viewpoint. Pass back to the BIM viewer unmodified.
  - `sections_data`: object - Opaque section-plane state applied to the model in this viewpoint. Pass back to the BIM viewer unmodified.
- `hazard_id`: integer - ID of the Hazard recorded against the Observation, returned as a flat scalar when `view=flat_v0`. Null when no Hazard is set. e.g. `1738`
- `location_id`: integer - ID of the Observation's Location, returned as a flat scalar when `view=flat_v0`. Null when no Location is set. e.g. `15504`
- `trade_id`: integer - ID of the Observation's Trade, returned as a flat scalar when `view=flat_v0`. Null when no Trade is set. e.g. `999`
- `overdue`: boolean - Whether the Observation is past its `due_date` and not yet resolved. Returned when `view=safety_hub`. e.g. `false`
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
- `hazard`: object - Deprecated — not returned by this endpoint under any supported `view`. Use the flat `hazard_id` scalar (`view=flat_v0`) and resolve the Hazard from the Company-level Hazards list.
  - `id`: integer - Hazard ID e.g. `1738`
  - `name`: string - Hazard Name e.g. `Slip`
  - `active`: boolean - Represents whether a Hazard is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Hazard has been provided by Procore. e.g. `false`
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

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/recycle_bin/observations/items/{id}/restore

**Retrieve Recycled Observation**
Restores a single Observation from the recycle bin and returns it. The restored Observation's `deleted_at` is cleared and it becomes visible to the standard list and show endpoints again. To restore many Observations at once, use `PATCH /rest/v1.0/observations/items/batch_restore_async`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Observation ID

Response 200 (application/json): object

- `id`: integer - Observation Item ID e.g. `9378`
- `number`: string - Observation Item number e.g. `96`
- `name`: string - Observation Item name e.g. `Personnel not wearing full PPE`
- `description`: string - Observation Item description e.g. `Worker was seen not wearing their hard hat`
- `description_rich_text`: string - Observation Item description e.g. `<p>Worker was seen not wearing their hard hat</p>`
- `status`: string enum[initiated, ready_for_review, not_accepted, closed, draft] - Current lifecycle state of the Observation. `draft` is only produced for Observations governed by a workflow that has not yet been started. Read the values the requesting user may set on this Observation from `GET /re... e.g. `initiated`
- `priority`: string enum[Low, Medium, High, Urgent, None] - Observation Item priority e.g. `Urgent`
- `date_notified`: string(date) - Date that the Observation Item Assignee was notified e.g. `2016-02-17`
- `due_date`: string(date) - Observation Item due date e.g. `2016-02-25`
- `closed_at`: string(date-time) - Closed at e.g. `2020-01-23T21:39:40Z`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2012-10-24T21:39:40Z`
- `personal`: boolean - Observation Item privacy status e.g. `false`
- `current_drawing_revision_ids`: array of integer - Current Drawing Revision IDs associated to the Observation Item
- `drawing_revisions`: array of integer - Drawing Revision IDs associated to the Observation Item
- `drawing_ids`: array of integer - Drawing IDs associated to an Observation Item's Drawing Revisions
- `origin`: object - Inspection (Checklist List) that the Observation Item was created from
  - `type`: string - Origin Type e.g. `inspection`
  - `payload`: object - Payload Keys change depending on origin.
    - `checklist_item_id`: integer - Checklist Item ID e.g. `42`
    - `checklist_list_id`: integer - Checklist List ID e.g. `42`
    - `coordination_issue_id`: integer - Coordination Issue ID the Observation Item belongs to e.g. `2312`
    - `coordination_issue_number`: integer - Coordination Issue Number the Observation Item belongs to e.g. `21`
    - `incident_action_id`: integer - Incident action Id the Observation Item belongs to e.g. `53`
    - `incident_id`: integer - Incident Id the Observation Item belongs to e.g. `53`
    - `bim_model_id`: integer - Bim model Id the Observation Item belongs to e.g. `63`
    - `bim_model_name`: string - Bim model name the Observation Item belongs to e.g. `Combined Model`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `assignee`: object - User assigned to the Observation Item
  - `id`: integer - User ID e.g. `29837`
  - `name`: string - User Name e.g. `John Smith`
  - `vendor`: object - Company of User assigned to the Observation Item
    - `id`: integer - Vendor ID e.g. `2675`
    - `name`: string - Vendor Name e.g. `Brick and Morty`
- `distribution_members`: array of object - Users on the Observation Item distribution list
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `created_by`: object - User that created the Observation Item
  - `id`: integer - User ID e.g. `47531`
  - `name`: string - User Name e.g. `Jane Doe`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `vendor`: object - Company of User that created the Observation Item
    - `id`: integer - Vendor ID e.g. `2675`
    - `name`: string - Vendor Name e.g. `Brick and Morty`
- `specification_section`: object - Specification Section
  - `id`: integer - ID
  - `description`: string - Description
  - `number`: string - Number e.g. `42`
  - `section`: string - Number e.g. `42`
  - `latest_revision_url`: string - Url to PDF view e.g. `link_to_pdf`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `type`: object
  - `id`: integer (required) - ID of the Observation Type. Pass as `observation[type_id]` on create or update, or as `filters[type_id]` when listing. e.g. `9`
  - `category`: string (required) - Observation Type category. Default categories are Quality, Safety, Commissioning, Warranty, Work to Complete, and Environmental. Companies may also define custom categories, so this field is not restricted to the defa... e.g. `Commissioning`
  - `category_key`: string - Stable, unlocalized key of the type's Observations Category. Prefer this over `category` when branching on category in code. e.g. `work_to_complete`
  - `category_id`: integer - Deprecated — not returned by this endpoint. Use `type.observations_category.id`. e.g. `13`
  - `name`: string (required) - Display name of the Observation Type, localized where a translation exists. e.g. `Commissioning`
  - `observations_category`: object - The Observations Category the type belongs to. Managed via `GET /rest/v2.0/companies/{company_id}/observations/categories`.
    - `id`: integer - ID of the Observations Category. e.g. `13`
    - `name`: string - Stable, unlocalized name of the category. e.g. `commissioning`
    - `grouping`: string enum[quality, safety] - Top-level bucket the category rolls up to. Drives which Observations area the item appears in when the Company has group split enabled. e.g. `quality`
    - `updated_at`: string(date-time) - ISO 8601 timestamp of the last change to the category. e.g. `2016-08-01T23:33:54Z`
  - `active`: boolean - Whether the type can be selected on new Observations in this Project. Inactive types are still returned so existing Observations render correctly. e.g. `true`
  - `company_active`: boolean - Whether the type is active at the Company level, ignoring any project-level override. Compare with `active` to detect a type enabled company-wide but switched off for this Project. e.g. `true`
  - `parent_inactive`: boolean - True when this is a project-level type whose parent company-level type has been deactivated. e.g. `false`
  - `in_use`: boolean - Whether at least one Observation references this type. Always true here, since the Observation being serialized uses it. e.g. `true`
  - `kind`: string enum[company, project] - Whether the type is owned by the Company or defined on a single Project. e.g. `project`
  - `name_translations`: object - Company-authored translations of the type name, keyed by locale code. Null when the Company has not configured custom translations for this type. Additional locale keys beyond those listed may be present.
    - `en`: string - Translation of the type name for the `en` locale. e.g. `Commissioning`
    - `es`: string - Translation of the type name for the `es` locale. e.g. `Puesta en marcha`
    - `fr-CA`: string - Translation of the type name for the `fr-CA` locale. e.g. `Mise en service`
    - `en-AU`: string - Translation of the type name for the `en-AU` locale. e.g. `Commissioning`
  - `localized_name`: string - Type name resolved for the locale of the request, falling back to the Company default and then the stored name. e.g. `Commissioning`
- `category`: object - Observations Category of this Observation's type, flattened for convenience. Null when the Observation has no type. Use `grouping` to route the item to the Quality or Safety area when the Company has group split enabled.
  - `name`: string - Stable, unlocalized name of the Observations Category. e.g. `commissioning`
  - `grouping`: string enum[quality, safety] - Top-level bucket the Observations Category rolls up to. e.g. `quality`
- `assignees`: array of object - Every user currently assigned to the Observation, most recently added first. Empty when the Observation is unassigned. Set with `observation[assignee_ids]`.
  - `id`: integer - User ID of the assignee. e.g. `29837`
  - `name`: string - Assignee's name, formatted first-name-first. e.g. `John Smith`
  - `current`: boolean - Whether the assignee is on the active workflow step. True for assignees outside a workflow. e.g. `true`
  - `vendor`: object - Company the assignee belongs to. Null when the assignee is not associated with a vendor.
    - `id`: integer - Vendor ID of the assignee's company. e.g. `2675`
    - `name`: string - Name of the assignee's company. e.g. `Brick and Morty`
- `permissions`: object - What the requesting user may do with this Observation. Null unless the request asks for a permission-aware view.
  - `can_edit`: boolean - Whether the requesting user can update this Observation. When false, a `PATCH` to the Observation will be rejected. e.g. `true`
- `viewpoint`: object - Saved BIM camera position captured when the Observation was raised from a BIM Model. Returned when `view=flat_v0`, and only when the Observation originated from a BIM Model.
  - `id`: integer - ID of the BIM Viewpoint. e.g. `3312`
  - `name`: string - Name given to the saved viewpoint. e.g. `Level 2 - Mechanical Room`
  - `bim_file_id`: integer - ID of the BIM File the viewpoint was captured in. e.g. `8891`
  - `camera_data`: object - Opaque camera state used by the BIM viewer to restore the saved view. Pass back to the viewer unmodified.
  - `redlines_data`: object - Opaque markup overlay data drawn on the viewpoint. Pass back to the BIM viewer unmodified.
  - `sections_data`: object - Opaque section-plane state applied to the model in this viewpoint. Pass back to the BIM viewer unmodified.
- `hazard_id`: integer - ID of the Hazard recorded against the Observation, returned as a flat scalar when `view=flat_v0`. Null when no Hazard is set. e.g. `1738`
- `location_id`: integer - ID of the Observation's Location, returned as a flat scalar when `view=flat_v0`. Null when no Location is set. e.g. `15504`
- `trade_id`: integer - ID of the Observation's Trade, returned as a flat scalar when `view=flat_v0`. Null when no Trade is set. e.g. `999`
- `overdue`: boolean - Whether the Observation is past its `due_date` and not yet resolved. Returned when `view=safety_hub`. e.g. `false`
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
- `hazard`: object - Deprecated — not returned by this endpoint under any supported `view`. Use the flat `hazard_id` scalar (`view=flat_v0`) and resolve the Hazard from the Company-level Hazards list.
  - `id`: integer - Hazard ID e.g. `1738`
  - `name`: string - Hazard Name e.g. `Slip`
  - `active`: boolean - Represents whether a Hazard is available for use. e.g. `true`
  - `global`: boolean - Represents whether a Hazard has been provided by Procore. e.g. `false`
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

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Observations Assignees

Resource id: `observations-assignees`. Raw spec: `../openapi-raw/observations-assignees.json`. Web: https://developers.procore.com/reference/rest/observations-assignees?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/observations/assignees

**List Observation Assignee options**
Returns the Project users the requesting user is permitted to assign to an Observation. Call this before setting `observation[assignee_id]` or `observation[assignee_ids]` — assigning a user absent from this list is rejected with a `403`.
The list narrows based on the requesting user's own permissions: users who cannot assign standard-level members see only Observations admins.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - User ID of a person the requesting user is allowed to assign to an Observation. Pass as `observation[assignee_id]`, or inside `observation[assignee_ids]`, when creating or updating an Observation Item. e.g. `9378`
- `name`: string - User's name, formatted first-name-first. e.g. `Katrina Smith`
- `vendor`: object - Company the user belongs to in this Procore company directory. Null when the user is not associated with a vendor. Use `vendor.id` with `filters[assignee_company_id]` to list Observations assigned to that company.
  - `id`: integer - Vendor ID of the user's company. e.g. `2675`
  - `name`: string - Name of the user's company. e.g. `Brick and Morty`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Observation Templates

Resource id: `project-observation-templates`. Raw spec: `../openapi-raw/project-observation-templates.json`. Web: https://developers.procore.com/reference/rest/project-observation-templates?version=latest
Product lines: Total Quality and Safety Management

### PATCH /rest/v1.0/projects/{project_id}/observation_templates/bulk_update

**Bulk Update Project Observation Templates**
Applies the same attribute changes to several Project Observation Templates in one request. The templates are validated first — if any fails, nothing is written and the response is a `422` listing the offending template IDs and their errors.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `observation_template_ids` [query] array of integer - IDs of all Project Observation Templates specified for bulk update

Request body (application/json) (required):

- `observation_template`: object (required)
  - `active`: boolean - Whether the templates can be selected when creating a new Observation. Applied to every template in `observation_template_ids`. e.g. `true`
  - `assignee_id`: integer - User ID of a single default assignee to set on every template in `observation_template_ids`. Mutually exclusive with `assignee_ids`. e.g. `54`
  - `assignee_ids`: array of integer - User IDs of the default assignees to set on every template in `observation_template_ids`, replacing their existing assignee lists. Mutually exclusive with `assignee_id`. e.g. `[123, 456]`
  - `trade_id`: integer - ID of the Trade to set on every template in `observation_template_ids`. e.g. `54`

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this Project Observation Template. Pass as the `{id}` path parameter to `GET /rest/v1.0/projects/{project_id}/observation_templates/{id}`. e.g. `1738`
- `active`: boolean - Whether the template can be selected when creating a new Observation. Inactive templates are retained but hidden from the picker. e.g. `true`
- `assignee`: object - Most recently added default assignee applied to Observations created from this template. Null when the template has no assignees. Read the full list from `assignees`.
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `assignees`: array of object - Every default assignee applied to Observations created from this template, most recently added first. Empty when the template has no assignees. Set with `observation_template[assignee_ids]`.
  - `id`: integer - User ID of the default assignee. e.g. `160586`
  - `login`: string - Email address the assignee signs in with. e.g. `carl.contractor@example.com`
  - `name`: string - Assignee's name, formatted first-name-first. e.g. `Carl Contractor`
- `updated_at`: string(date-time) - ISO 8601 timestamp of the last change to the template. Bulk updates stamp this even when no attribute value actually changed. e.g. `2016-08-23T15:23:57Z`
- `company_observation_template_id`: integer - ID of the Company Observation Template this template was cloned from. Null for templates created directly on the Project. When set, `observation_title`, `observation_type_id`, and `trade_id` are inherited from the com... e.g. `1337`
- `observation_title`: string - Title pre-filled on Observations created from this template. Inherited from the company template when `company_observation_template_id` is set. e.g. `Worker seen not wearing PPE`
- `observation_type`: object - Observation Type applied to Observations created from this template. Inherited from the company template when `company_observation_template_id` is set.
  - `id`: integer - Unique identifier for this Project Observation Type. Pass as the `{id}` path parameter to `PATCH /rest/v1.0/projects/{project_id}/observation_types/{id}`, as `observation[type_id]` when creating an Observation Item, o... e.g. `2020`
  - `name`: string - Display name of the Observation Type, localized to the requesting user's locale when a translation exists. e.g. `No Type`
  - `localized_name`: string - Type name resolved for the locale of the request, falling back to the Company default and then the stored name. Display this to end users rather than reimplementing the fallback chain. e.g. `No Type`
  - `category`: string - Localized display name of the type's Observations Category. Procore ships six built-in categories (Quality, Safety, Commissioning, Warranty, Work to Complete, Environmental), but companies can define additional catego... e.g. `Quality`
  - `category_key`: string - Stable, unlocalized key of the type's Observations Category. Prefer this over `category` when branching on category in code. e.g. `quality`
  - `category_id`: integer - ID of the Observations Category this type belongs to. Corresponds to the `id` returned by `GET /rest/v2.0/companies/{company_id}/observations/categories`, and to the `observations_category_id` accepted on create. e.g. `13`
  - `name_translations`: object - Company-authored translations of the type name, keyed by locale code (for example `en`, `es`, `fr-CA`). Null when the Company has not configured custom translations for this type. e.g. `{"en": "No Type", "es": "Sin tipo"}`
  - `active`: boolean - Whether the type can be selected on new Observations in this Project. For a company-level type this reflects the project-level activation. Filter the collection with `filters[active]`. e.g. `true`
  - `company_active`: boolean - Whether the type is active at the Company level, ignoring any project-level override. Compare with `active` to detect a type enabled company-wide but switched off for this Project. e.g. `true`
  - `parent_inactive`: boolean - True when this project-level type's parent company-level type has been deactivated. Such a type cannot be used on new Observations even if `active` is true. e.g. `false`
  - `in_use`: boolean - Whether at least one Observation Item currently references this type. Use to warn before deactivating or deleting a type. e.g. `false`
  - `kind`: string enum[company, project] - Whether the type is owned by the Company or defined on this Project only. Project-level types are selectable only within their own Project. e.g. `project`
- `trade`: object - Trade applied to Observations created from this template. Null when the template does not set a Trade.
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Observation Types

Resource id: `project-observation-types`. Raw spec: `../openapi-raw/project-observation-types.json`. Web: https://developers.procore.com/reference/rest/project-observation-types?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/observation_types

**List Project Observation Types**
Returns the Observation Types available on this Project — both project-specific types and Company types activated for the Project.
Only active types are returned unless you pass `filters[active]` explicitly.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[active]` [query] boolean - Return only types matching the given active state. Defaults to `true` when omitted — pass `false` to list deactivated types, or set it explicitly to control the filter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this Project Observation Type. Pass as the `{id}` path parameter to `PATCH /rest/v1.0/projects/{project_id}/observation_types/{id}`, as `observation[type_id]` when creating an Observation Item, o... e.g. `2020`
- `name`: string - Display name of the Observation Type, localized to the requesting user's locale when a translation exists. e.g. `No Type`
- `localized_name`: string - Type name resolved for the locale of the request, falling back to the Company default and then the stored name. Display this to end users rather than reimplementing the fallback chain. e.g. `No Type`
- `category`: string - Localized display name of the type's Observations Category. Procore ships six built-in categories (Quality, Safety, Commissioning, Warranty, Work to Complete, Environmental), but companies can define additional catego... e.g. `Quality`
- `category_key`: string - Stable, unlocalized key of the type's Observations Category. Prefer this over `category` when branching on category in code. e.g. `quality`
- `category_id`: integer - ID of the Observations Category this type belongs to. Corresponds to the `id` returned by `GET /rest/v2.0/companies/{company_id}/observations/categories`, and to the `observations_category_id` accepted on create. e.g. `13`
- `name_translations`: object - Company-authored translations of the type name, keyed by locale code (for example `en`, `es`, `fr-CA`). Null when the Company has not configured custom translations for this type. e.g. `{"en": "No Type", "es": "Sin tipo"}`
- `active`: boolean - Whether the type can be selected on new Observations in this Project. For a company-level type this reflects the project-level activation. Filter the collection with `filters[active]`. e.g. `true`
- `company_active`: boolean - Whether the type is active at the Company level, ignoring any project-level override. Compare with `active` to detect a type enabled company-wide but switched off for this Project. e.g. `true`
- `parent_inactive`: boolean - True when this project-level type's parent company-level type has been deactivated. Such a type cannot be used on new Observations even if `active` is true. e.g. `false`
- `in_use`: boolean - Whether at least one Observation Item currently references this type. Use to warn before deactivating or deleting a type. e.g. `false`
- `kind`: string enum[company, project] - Whether the type is owned by the Company or defined on this Project only. Project-level types are selectable only within their own Project. e.g. `project`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/observation_types

**Create Project Observation Type**
Creates an Observation Type scoped to this Project. Project types are selectable only within their own Project; to create a type available across all Projects, use the Company Observation Types endpoint instead.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `observation_type`: object (required)
  - `name`: string - Display name of the Observation Type, shown in the type picker when creating an Observation. e.g. `Air Quality`
  - `category`: string - Legacy category key. Prefer `observations_category_id`, which references a Company-managed Observations Category. e.g. `quality`
  - `observations_category_id`: integer - ID of the Observations Category to file this type under. Determines which Configurable Field Set applies to Observations of this type. See `GET /rest/v2.0/companies/{company_id}/observations/categories`. e.g. `12`
  - `active`: boolean - Whether the type can be selected on new Observations. Defaults to active. e.g. `true`
  - `parent_id`: integer - ID of the Company Observation Type this project type is derived from. Leave unset to create a standalone project-level type.

Response 201 (application/json): object

- `id`: integer - Unique identifier for this Project Observation Type. Pass as the `{id}` path parameter to `PATCH /rest/v1.0/projects/{project_id}/observation_types/{id}`, as `observation[type_id]` when creating an Observation Item, o... e.g. `2020`
- `name`: string - Display name of the Observation Type, localized to the requesting user's locale when a translation exists. e.g. `No Type`
- `localized_name`: string - Type name resolved for the locale of the request, falling back to the Company default and then the stored name. Display this to end users rather than reimplementing the fallback chain. e.g. `No Type`
- `category`: string - Localized display name of the type's Observations Category. Procore ships six built-in categories (Quality, Safety, Commissioning, Warranty, Work to Complete, Environmental), but companies can define additional catego... e.g. `Quality`
- `category_key`: string - Stable, unlocalized key of the type's Observations Category. Prefer this over `category` when branching on category in code. e.g. `quality`
- `category_id`: integer - ID of the Observations Category this type belongs to. Corresponds to the `id` returned by `GET /rest/v2.0/companies/{company_id}/observations/categories`, and to the `observations_category_id` accepted on create. e.g. `13`
- `name_translations`: object - Company-authored translations of the type name, keyed by locale code (for example `en`, `es`, `fr-CA`). Null when the Company has not configured custom translations for this type. e.g. `{"en": "No Type", "es": "Sin tipo"}`
- `active`: boolean - Whether the type can be selected on new Observations in this Project. For a company-level type this reflects the project-level activation. Filter the collection with `filters[active]`. e.g. `true`
- `company_active`: boolean - Whether the type is active at the Company level, ignoring any project-level override. Compare with `active` to detect a type enabled company-wide but switched off for this Project. e.g. `true`
- `parent_inactive`: boolean - True when this project-level type's parent company-level type has been deactivated. Such a type cannot be used on new Observations even if `active` is true. e.g. `false`
- `in_use`: boolean - Whether at least one Observation Item currently references this type. Use to warn before deactivating or deleting a type. e.g. `false`
- `kind`: string enum[company, project] - Whether the type is owned by the Company or defined on this Project only. Project-level types are selectable only within their own Project. e.g. `project`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/observation_types/{id}

**Update Project Observation Type**
Updates a Project Observation Type. Only the attributes you send are changed. Setting `active` to false hides the type from the picker without affecting Observations that already use it.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Project Observation Type, as returned in `id` by the list endpoint.

Request body (application/json) (required):

- `observation_type`: object (required)
  - `name`: string - Display name of the Observation Type, shown in the type picker when creating an Observation.
  - `category`: string - Legacy category key. Prefer `observations_category_id`, which references a Company-managed Observations Category.
  - `observations_category_id`: integer - ID of the Observations Category to file this type under. Determines which Configurable Field Set applies to Observations of this type. e.g. `12`
  - `active`: boolean - Whether the type can be selected on new Observations. Deactivating a type leaves existing Observations untouched.

Response 200 (application/json): object

- `id`: integer - Unique identifier for this Project Observation Type. Pass as the `{id}` path parameter to `PATCH /rest/v1.0/projects/{project_id}/observation_types/{id}`, as `observation[type_id]` when creating an Observation Item, o... e.g. `2020`
- `name`: string - Display name of the Observation Type, localized to the requesting user's locale when a translation exists. e.g. `No Type`
- `localized_name`: string - Type name resolved for the locale of the request, falling back to the Company default and then the stored name. Display this to end users rather than reimplementing the fallback chain. e.g. `No Type`
- `category`: string - Localized display name of the type's Observations Category. Procore ships six built-in categories (Quality, Safety, Commissioning, Warranty, Work to Complete, Environmental), but companies can define additional catego... e.g. `Quality`
- `category_key`: string - Stable, unlocalized key of the type's Observations Category. Prefer this over `category` when branching on category in code. e.g. `quality`
- `category_id`: integer - ID of the Observations Category this type belongs to. Corresponds to the `id` returned by `GET /rest/v2.0/companies/{company_id}/observations/categories`, and to the `observations_category_id` accepted on create. e.g. `13`
- `name_translations`: object - Company-authored translations of the type name, keyed by locale code (for example `en`, `es`, `fr-CA`). Null when the Company has not configured custom translations for this type. e.g. `{"en": "No Type", "es": "Sin tipo"}`
- `active`: boolean - Whether the type can be selected on new Observations in this Project. For a company-level type this reflects the project-level activation. Filter the collection with `filters[active]`. e.g. `true`
- `company_active`: boolean - Whether the type is active at the Company level, ignoring any project-level override. Compare with `active` to detect a type enabled company-wide but switched off for this Project. e.g. `true`
- `parent_inactive`: boolean - True when this project-level type's parent company-level type has been deactivated. Such a type cannot be used on new Observations even if `active` is true. e.g. `false`
- `in_use`: boolean - Whether at least one Observation Item currently references this type. Use to warn before deactivating or deleting a type. e.g. `false`
- `kind`: string enum[company, project] - Whether the type is owned by the Company or defined on this Project only. Project-level types are selectable only within their own Project. e.g. `project`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/observation_types/{id}

**Delete Project Observation Type**
Deletes a Project Observation Type. Check the type's `in_use` flag first — deleting a type that Observations still reference is rejected.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Project Observation Type, as returned in `id` by the list endpoint.

Response 200: OK (no body)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

