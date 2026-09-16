# Procore API: Change Events (Construction Financials)

Source: https://developers.procore.com/reference/rest/ (tool category: Change Events)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Change Event Comments](#change-event-comments) - versions 2.0
- [Change Event Production Quantities](#change-event-production-quantities) - versions 1.0
- [Change Event Settings](#change-event-settings) - versions 2.0
- [Change Event Statuses](#change-event-statuses) - versions 2.0, 1.0
- [Change Events](#change-events) - versions 1.1, 1.0
- [Change Types](#change-types) - versions 1.0

## Change Event Comments

Resource id: `change-event-comments`. Raw spec: `../openapi-raw/change-event-comments.json`. Web: https://developers.procore.com/reference/rest/change-event-comments?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/change_events/{change_event_id}/comments  **[BETA]**

**List Change Event Comments**
Returns comments for a change event.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `change_event_id` [path] string (required) - Change event ID.

Response 200 (application/json): object

- `data`: array of object (required)
  - `id`: string - Unique identifier of the comment. Use as the {id} path parameter to delete the comment via DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/change_events/{change_event_id}/comments/{id}. e.g. `123`
  - `body`: string - Free-text content of the comment as entered by its author. e.g. `Comment's body`
  - `created_at`: string(date-time) - Timestamp when the comment was created, in ISO 8601 format. e.g. `2015-11-12T21:26:28Z`
  - `attachments`: array of object - Files attached to the comment. Each item describes a viewable Prostore file, including download URLs and file metadata.
    - `id`: string
    - `name`: string
    - `url`: string
    - `can_be_viewed`: boolean
    - `viewable`: boolean
  - `creator`: object - The user who authored the comment.
    - `id`: string - Procore user ID of the comment's author. e.g. `42`
    - `name`: string - Display name of the comment's author. e.g. `Jane Doe`
    - `login`: string - Login email of the comment's author. e.g. `jane.doe@example.com`
    - `initials`: string - Author's initials, derived from their name, for avatar fallbacks. e.g. `JD`
    - `avatar`: string - URL of the author's avatar image. Null when the author has no avatar set. e.g. `https://example.com/avatars/42.png`
  - `rating`: integer - Optional numeric rating associated with the comment. Null when no rating was provided. e.g. `5`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/change_events/{change_event_id}/comments  **[BETA]**

**Create Change Event Comment**
Creates a comment on a change event.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `change_event_id` [path] string (required) - Change event ID.

Request body (application/json):

- `comment`: object (required)
  - `body`: string (required) - Free-text content of the comment to create. Required.
  - `rating`: integer - Optional numeric rating to associate with the comment. Omit or send null for no rating.
  - `prostore_file_ids`: array of string - IDs of previously uploaded Prostore files to attach to the comment.

Response 201 (application/json): object

- `data`: object (required)
  - `id`: string - Unique identifier of the comment. Use as the {id} path parameter to delete the comment via DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/change_events/{change_event_id}/comments/{id}. e.g. `123`
  - `body`: string - Free-text content of the comment as entered by its author. e.g. `Comment's body`
  - `created_at`: string(date-time) - Timestamp when the comment was created, in ISO 8601 format. e.g. `2015-11-12T21:26:28Z`
  - `attachments`: array of object - Files attached to the comment. Each item describes a viewable Prostore file, including download URLs and file metadata.
    - `id`: string
    - `name`: string
    - `url`: string
    - `can_be_viewed`: boolean
    - `viewable`: boolean
  - `creator`: object - The user who authored the comment.
    - `id`: string - Procore user ID of the comment's author. e.g. `42`
    - `name`: string - Display name of the comment's author. e.g. `Jane Doe`
    - `login`: string - Login email of the comment's author. e.g. `jane.doe@example.com`
    - `initials`: string - Author's initials, derived from their name, for avatar fallbacks. e.g. `JD`
    - `avatar`: string - URL of the author's avatar image. Null when the author has no avatar set. e.g. `https://example.com/avatars/42.png`
  - `rating`: integer - Optional numeric rating associated with the comment. Null when no rating was provided. e.g. `5`

Error responses: 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/change_events/{change_event_id}/comments/{id}  **[BETA]**

**Delete Change Event Comment**
Deletes a comment on a change event. Returns 200 with empty body on success.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `change_event_id` [path] string (required) - Change event ID.
- `id` [path] string (required) - Change event comment ID.

Response 200: OK (empty body) (no body)

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Change Event Production Quantities

Resource id: `change-event-production-quantities`. Raw spec: `../openapi-raw/change-event-production-quantities.json`. Web: https://developers.procore.com/reference/rest/change-event-production-quantities?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/projects/{project_id}/change_events/{change_event_id}/change_event_production_quantities

**List Change Event Production Quantities**
Returns a list of all Change Event Production Quantities for a given Change Event.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `change_event_id` [path] integer (required) - Unique identifier for the Change Event

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this Change Event Production Quantity. Use as the {id} path parameter to update or delete it via /rest/v1.0/projects/{project_id}/change_events/{change_event_id}/change_event_production_quantitie... e.g. `999`
- `cost_code_id`: integer - ID of the Cost Code this production quantity is attributed to. Kept in sync with wbs_code_id. e.g. `123`
- `quantity`: string - Quantity of work for this production item, in the given unit of measure. Returned as a decimal string. e.g. `2250.0`
- `uom`: string - Unit of measure for the quantity. Must be a unit from the company's Units of Measure master list that is not categorized as "Time". e.g. `sf`
- `description`: string - Free-text description of the production quantity item. e.g. `Additional Concrete Needed`
- `wbs_code_id`: integer - ID of the WBS (Budget) Code this production quantity is attributed to. Kept in sync with cost_code_id. e.g. `333`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/change_events/{change_event_id}/change_event_production_quantities

**Create Change Event Production Quantity**
Creates a new Change Event Production Quantity for a given Change Event.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `change_event_id` [path] integer (required) - Unique identifier for the Change Event

Request body (application/json) (required):

- `change_event_production_quantity`: object (required) - Change Event Production Quantity object
  - `cost_code_id`: integer (required) - ID of the Cost Code to attribute this production quantity to. Provide either cost_code_id or wbs_code_id; the other is derived and kept in sync. e.g. `123`
  - `quantity`: number(float) (required) - Quantity of work for this production item, in the given unit of measure. e.g. `2250.0`
  - `uom`: string (required) - Unit of measure for the quantity. Must be a unit from the company's Units of Measure master list that is not categorized as "Time". e.g. `sf`
  - `description`: string - Free-text description of the production quantity item. e.g. `Additional Concrete Needed`
  - `wbs_code_id`: integer - ID of the WBS (Budget) Code to attribute this production quantity to. Provide either wbs_code_id or cost_code_id; the other is derived and kept in sync. e.g. `333`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this Change Event Production Quantity. Use as the {id} path parameter to update or delete it via /rest/v1.0/projects/{project_id}/change_events/{change_event_id}/change_event_production_quantitie... e.g. `999`
- `cost_code_id`: integer - ID of the Cost Code this production quantity is attributed to. Kept in sync with wbs_code_id. e.g. `123`
- `quantity`: string - Quantity of work for this production item, in the given unit of measure. Returned as a decimal string. e.g. `2250.0`
- `uom`: string - Unit of measure for the quantity. Must be a unit from the company's Units of Measure master list that is not categorized as "Time". e.g. `sf`
- `description`: string - Free-text description of the production quantity item. e.g. `Additional Concrete Needed`
- `wbs_code_id`: integer - ID of the WBS (Budget) Code this production quantity is attributed to. Kept in sync with cost_code_id. e.g. `333`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/change_events/{change_event_id}/change_event_production_quantities/{id}

**Update Change Event Production Quantity**
Updates a Change Event Production Quantity's attributes

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `change_event_id` [path] integer (required) - Unique identifier for the Change Event
- `id` [path] integer (required) - Change Event Production Quantity ID

Request body (application/json) (required):

- `change_event_production_quantity`: object (required) - Change Event Production Quantity object
  - `cost_code_id`: integer - ID of the Cost Code to attribute this production quantity to. Provide either cost_code_id or wbs_code_id; the other is derived and kept in sync. e.g. `123`
  - `quantity`: number(float) - Quantity of work for this production item, in the given unit of measure. e.g. `2250.0`
  - `uom`: string - Unit of measure for the quantity. Must be a unit from the company's Units of Measure master list that is not categorized as "Time". e.g. `sf`
  - `description`: string - Free-text description of the production quantity item. e.g. `Additional Concrete Needed`
  - `wbs_code_id`: integer - ID of the WBS (Budget) Code to attribute this production quantity to. Provide either wbs_code_id or cost_code_id; the other is derived and kept in sync. e.g. `333`

Response 200 (application/json): object

- `id`: integer - Unique identifier for this Change Event Production Quantity. Use as the {id} path parameter to update or delete it via /rest/v1.0/projects/{project_id}/change_events/{change_event_id}/change_event_production_quantitie... e.g. `999`
- `cost_code_id`: integer - ID of the Cost Code this production quantity is attributed to. Kept in sync with wbs_code_id. e.g. `123`
- `quantity`: string - Quantity of work for this production item, in the given unit of measure. Returned as a decimal string. e.g. `2250.0`
- `uom`: string - Unit of measure for the quantity. Must be a unit from the company's Units of Measure master list that is not categorized as "Time". e.g. `sf`
- `description`: string - Free-text description of the production quantity item. e.g. `Additional Concrete Needed`
- `wbs_code_id`: integer - ID of the WBS (Budget) Code this production quantity is attributed to. Kept in sync with cost_code_id. e.g. `333`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/change_events/{change_event_id}/change_event_production_quantities/{id}

**Delete Change Event Production Quantity**
Deletes a Change Event Production Quantity

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `change_event_id` [path] integer (required) - Unique identifier for the Change Event
- `id` [path] integer (required) - Change Event Production Quantity ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Change Event Settings

Resource id: `change-event-settings`. Raw spec: `../openapi-raw/change-event-settings.json`. Web: https://developers.procore.com/reference/rest/change-event-settings?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/change_event_settings  **[BETA]**

**Get Change Event Settings**
Get Values for Change Event Settings

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Response 200 (application/json): object

- `data`: object - Change Event Settings
  - `budget_rom_source_for_in_scope`: string - Source value used to calculate the budget ROM (rough order of magnitude) for change event line items marked 'In Scope'. e.g. `cost`
  - `budget_rom_source_for_out_of_scope`: string - Source value used to calculate the budget ROM for change event line items marked 'Out of Scope'. e.g. `revenue`
  - `budget_rom_source_for_tbd_scope`: string - Source value used to calculate the budget ROM for change event line items marked 'TBD' (scope not yet determined). e.g. `none`
  - `celi_prefill_automation`: boolean - When true, auto-populates Budget Code, Vendor, and Contract on new change event line items. e.g. `true`
  - `change_order_value_source`: string - Source value used when creating or updating Commitment Change Orders / Potential Change Orders from change events. e.g. `latest_cost`
  - `copy_rfq_attachments_to_commitment_cos`: boolean - When true, copies RFQ attachments onto generated Commitment Change Orders / Potential Change Orders. e.g. `false`
  - `copy_rfq_attachments_to_prime_cos`: boolean - When true, copies RFQ attachments onto generated Prime Change Orders / Potential Change Orders. e.g. `true`
  - `display_revenue_detail_columns`: boolean - When true, displays the revenue ROM, latest price, latest cost, and over/under columns on the change events grid. e.g. `true`
  - `display_spend_quantity_columns`: boolean - When true, displays the unit of measure, revenue quantity, revenue unit cost, ROM unit quantity, and ROM unit cost columns on the change events grid. e.g. `true`
  - `prevent_both_prime_cos_and_budget_changes`: boolean - When true, prevents a single change event line item from generating both a Budget Change and a Prime Potential Change Order. e.g. `false`
  - `sync_wbs_code`: boolean - When true, keeps the budget (WBS) code in sync between a change event line item and its linked change order / commitment line items. e.g. `true`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/change_event_settings  **[BETA]**

**Update the Change Event settings for the project**
Allows the Change Event settings for the project to be updated

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `settings`: object (required) - Change Event Settings
  - `budget_rom_source_for_in_scope`: string - Source value used to calculate the budget ROM (rough order of magnitude) for change event line items marked 'In Scope'. e.g. `cost`
  - `budget_rom_source_for_out_of_scope`: string - Source value used to calculate the budget ROM for change event line items marked 'Out of Scope'. e.g. `revenue`
  - `budget_rom_source_for_tbd_scope`: string - Source value used to calculate the budget ROM for change event line items marked 'TBD' (scope not yet determined). e.g. `none`
  - `celi_prefill_automation`: boolean - When true, auto-populates Budget Code, Vendor, and Contract on new change event line items. e.g. `true`
  - `change_order_value_source`: string - Source value used when creating or updating Commitment Change Orders / Potential Change Orders from change events. e.g. `latest_cost`
  - `copy_rfq_attachments_to_commitment_cos`: boolean - When true, copies RFQ attachments onto generated Commitment Change Orders / Potential Change Orders. e.g. `false`
  - `copy_rfq_attachments_to_prime_cos`: boolean - When true, copies RFQ attachments onto generated Prime Change Orders / Potential Change Orders. e.g. `true`
  - `display_revenue_detail_columns`: boolean - When true, displays the revenue ROM, latest price, latest cost, and over/under columns on the change events grid. e.g. `true`
  - `display_spend_quantity_columns`: boolean - When true, displays the unit of measure, revenue quantity, revenue unit cost, ROM unit quantity, and ROM unit cost columns on the change events grid. e.g. `true`
  - `prevent_both_prime_cos_and_budget_changes`: boolean - When true, prevents a single change event line item from generating both a Budget Change and a Prime Potential Change Order. e.g. `false`
  - `sync_wbs_code`: boolean - When true, keeps the budget (WBS) code in sync between a change event line item and its linked change order / commitment line items. e.g. `true`

Response 200 (application/json): object

- `data`: object - Change Event Settings
  - `budget_rom_source_for_in_scope`: string - Source value used to calculate the budget ROM (rough order of magnitude) for change event line items marked 'In Scope'. e.g. `cost`
  - `budget_rom_source_for_out_of_scope`: string - Source value used to calculate the budget ROM for change event line items marked 'Out of Scope'. e.g. `revenue`
  - `budget_rom_source_for_tbd_scope`: string - Source value used to calculate the budget ROM for change event line items marked 'TBD' (scope not yet determined). e.g. `none`
  - `celi_prefill_automation`: boolean - When true, auto-populates Budget Code, Vendor, and Contract on new change event line items. e.g. `true`
  - `change_order_value_source`: string - Source value used when creating or updating Commitment Change Orders / Potential Change Orders from change events. e.g. `latest_cost`
  - `copy_rfq_attachments_to_commitment_cos`: boolean - When true, copies RFQ attachments onto generated Commitment Change Orders / Potential Change Orders. e.g. `false`
  - `copy_rfq_attachments_to_prime_cos`: boolean - When true, copies RFQ attachments onto generated Prime Change Orders / Potential Change Orders. e.g. `true`
  - `display_revenue_detail_columns`: boolean - When true, displays the revenue ROM, latest price, latest cost, and over/under columns on the change events grid. e.g. `true`
  - `display_spend_quantity_columns`: boolean - When true, displays the unit of measure, revenue quantity, revenue unit cost, ROM unit quantity, and ROM unit cost columns on the change events grid. e.g. `true`
  - `prevent_both_prime_cos_and_budget_changes`: boolean - When true, prevents a single change event line item from generating both a Budget Change and a Prime Potential Change Order. e.g. `false`
  - `sync_wbs_code`: boolean - When true, keeps the budget (WBS) code in sync between a change event line item and its linked change order / commitment line items. e.g. `true`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Change Event Statuses

Resource id: `change-event-statuses`. Raw spec: `../openapi-raw/change-event-statuses.json`. Web: https://developers.procore.com/reference/rest/change-event-statuses?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/change_events/statuses  **[BETA]**

**List Change Event Statuses**
List All Possible Change Event Statuses for a Specified Company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Paginated list of change event statuses for the company.
  - `id`: string - Unique identifier of the change event status. Use as the {id} path parameter to update or delete the status. e.g. `101`
  - `default`: boolean - Indicates whether this is a built-in default status (one of open, closed, void, or pending) rather than a custom company status. e.g. `true`
  - `default_status`: boolean - Indicates whether this status is the company's default status applied to new change events. e.g. `true`
  - `deletable`: boolean - Indicates whether this change event status can be deleted. e.g. `true`
  - `name`: string - Display name of the change event status. e.g. `Pending`
  - `show_in_select`: boolean - Indicates whether this status appears in the status selection dropdown. e.g. `true`
  - `mapped_to_status`: string enum[open, closed, void, pending] - Underlying canonical status this status maps to, which determines how it behaves in change event workflows. e.g. `pending`

Error responses: 400, 401, 403, 409, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/change_events/statuses/{id}  **[BETA]**

**Update a Change Event Status**
Update a Specific Change Event Status for a Company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Change Event Status ID

Request body (application/json) (required):

- `change_event_status`: object (required)
  - `name`: string - Name of the Change Event status e.g. `Pending`
  - `mapped_to_status`: string enum[open, closed, void, pending] - Underlying canonical status this custom status maps to, which determines how it behaves in change event workflows. e.g. `closed`
  - `show_in_select`: boolean - Indicates whether the Change Event status will be shown in the status select dropdown e.g. `true`
  - `default_status`: boolean - Indicates whether the Change Event status is the default status e.g. `true`

Response 200 (application/json): object

- `data`: object
  - `id`: string - ID e.g. `101`
  - `name`: string - Name of the Change Event status e.g. `Pending`
  - `show_in_select`: boolean - Indicates whether the Change Event status will be shown in the status select dropdown e.g. `true`
  - `default_status`: boolean - Indicates whether the Change Event status is the default status e.g. `true`
  - `default`: boolean - Change Event status default identifier e.g. `true`
  - `deletable`: boolean - Indicates whether the change status can be deleted e.g. `true`
  - `mapped_to_status`: string enum[open, closed, void, pending] - Underlying canonical status this status maps to, which determines how it behaves in change event workflows. e.g. `pending`

Error responses: 400, 401, 403, 404, 422, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/change_events/statuses/{id}  **[BETA]**

**Delete a Change Event Status**
Deletes a specific Change Event Status for a company. Returns 200 with an empty body on success.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Change Event Status ID

Response 200: OK (empty body) (no body)

Error responses: 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/change_event/statuses

**List Change Event statuses**
List Change Event statuses for a specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `default_status`: boolean - Whether this status is flagged as the company default applied to new Change Events. e.g. `true`
- `id`: integer - Unique identifier for this Change Event status. Pass as the status filter id when filtering Change Events by status. e.g. `29715`
- `mapped_to_status`: string enum[open, closed, void, pending] - Internal lifecycle status this Change Event status maps to. Drives Procore's built-in behavior regardless of the customizable display name. e.g. `pending`
- `name`: string - Display name of the status. Company-customizable; for built-in default statuses this is the localized label of the mapped_to_status. e.g. `Open`
- `show_in_select`: boolean - Whether this status is available for selection in the UI. e.g. `true`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Change Events

Resource id: `change-events`. Raw spec: `../openapi-raw/change-events.json`. Web: https://developers.procore.com/reference/rest/change-events?version=latest
Product lines: PM Essentials, Construction Financials

### GET /rest/v1.1/change_events/{id}

**Show Change Event**
Show Change Event.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `include_deleted_change_event_line_items` [query] boolean - Used to include deleted Change Event Line Items in the response. Presence of the key includes the deleted items.

Response 200 (application/json): object

- `id`: integer - ID e.g. `43453`
- `number`: string - number e.g. `A056`
- `title`: string - title e.g. `Big Change`
- `description`: string - description e.g. `Additional concrete work for parking garage`
- `scope`: string - scope e.g. `tbd`
- `created_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `comments_enabled`: boolean - Comments Enabled e.g. `true`
- `deletable`: boolean e.g. `true`
- `in_recycle_bin`: boolean e.g. `false`
- `project_id`: integer - unique identifier for the project e.g. `60`
- `company_id`: integer - unique identifier for the company e.g. `39`
- `status`: object
  - `id`: integer - ID e.g. `1234`
  - `name`: string - name e.g. `open`
  - `mapped_to_status`: string - mapped_to_status e.g. `open`
- `event_origin`: object
  - `origin_id`: integer - ID e.g. `1234`
  - `origin_type`: string - type of object this change event originated from e.g. `Rfi::Header`
  - `display_name`: string - name of event origin used for view e.g. `RFI #91: Drawings Missing`
  - `web_page_url`: string - web page of event origin e.g. `/1/project/rfi/show/1`
- `change_type`: object
  - `id`: integer - ID e.g. `5`
  - `name`: string - name e.g. `Transfer`
  - `abbreviation`: string - abbreviation e.g. `TR`
- `change_reason`: object
  - `id`: integer - ID e.g. `3465`
  - `change_reason`: string - The reason for a change e.g. `Allowance`
- `prime_contract_for_estimates`: object
  - `id`: integer - ID e.g. `1122`
  - `number`: string - contract number e.g. `123`
  - `name`: string - name of contract e.g. `ACME Prime Contract`
- `attachments`: array of object
  - `id`: integer - ID e.g. `3456`
  - `url`: string - Remote Url for attached file e.g. `https://www.storage.com/files/contract.pdf`
  - `filename`: string - Filename e.g. `contract.pdf`
- `external_data`: object
  - `origin_id`: string - The Origin ID of the Change Event e.g. `654987123`
  - `origin_data`: string - The Origin Data of the Change Event e.g. `OD-123654789`
- `created_by`: object
  - `id`: integer - ID e.g. `987`
  - `login`: string - email address of Change Event creator e.g. `carl-contractor@example.com`
  - `name`: string - first and last name of Change Event creator e.g. `Carl Contractor`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `string`
    - `value`: string - The value of the custom field e.g. `custom field value`
    - `variant`: string - The variant of the Custom Field Definition (e.g. `phone_number`). Present only when the definition has an associated variant. e.g. `phone_number`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `decimal`
    - `value`: number - The value of the custom field e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `boolean`
    - `value`: boolean - The value of the custom field e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `lov_entry`
    - `value`: object
    - `variant`: string - The variant of the Custom Field Definition (e.g. `project_directory`). Present only when the definition has an associated variant. e.g. `with_code`
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `lov_entries`
    - `value`: array of object
- `change_items`: array of object
  - `budget_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `1`
    - `flat_code`: string - wbs code flat code e.g. `O.01-511`
    - `description`: string - wbs code description e.g. `Earthwork.Materials`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `budget_impact`: object
    - `budget_change`: object
    - `budget_modification`: object
    - `estimate`: object
    - `source_of_latest_budget_impact`: string enum[budget_change, estimate] - Source of latest budget impact e.g. `budget_change`
    - `source_of_stage`: string enum[estimate, budget_change] - The source of the stage
    - `source_of_budget_rom`: string enum[automatic, manual, quantity_by_unit_cost] - Source of budget ROM e.g. `automatic`
  - `cost_impact`: object
    - `change_order_package`: object
    - `commitment`: object
    - `contract`: object
    - `estimate`: object
    - `non_commitment`: object
    - `request_for_quote`: object - Request for Quote data if any present, can be null
    - `source_of_latest_cost`: string enum[commitment, estimate, latest_quote, non_commitment] - Source of latest cost e.g. `commitment`
    - `source_of_stage`: string enum[estimate, non-commitment, commitment, change_order_package, latest_quote] - Source of stage e.g. `estimate`
    - `vendor`: object
  - `created_at`: string(date-time) - Timestamp of when the Change Event Line Item was created e.g. `2024-10-23T21:39:40Z`
  - `currency_configuration`: object - Currency configuration information
    - `currency_iso_code`: string - currency ISO code e.g. `USD`
  - `deletable`: boolean - Whether the Line Item is deletable e.g. `false`
  - `deleted_at`: string(date-time) - Timestamp of when the Line Item was deleted e.g. `2024-10-23T21:39:40Z`
  - `description`: string - Description of the Line Item e.g. `labor for new swimming pool`
  - `editable`: boolean - Whether the Line Item is editable e.g. `true`
  - `event_id`: integer - The ID of the associated Change Event e.g. `123`
  - `event_number`: string - The number of the associated Change Event e.g. `A056`
  - `event_title`: string - The title of the associated Change Event e.g. `Big Change`
  - `id`: integer - The ID of the Line Item e.g. `3456`
  - `item_type`: string - The type of the Line Item e.g. `Event Line`
  - `latest_cost_values`: object
    - `amount`: string - Latest cost amount e.g. `76.25`
    - `amount_project_currency`: string - Latest cost amount in project currency e.g. `76.25`
    - `calculation_strategy`: string enum[automatic, manual] - Latest cost calculation strategy e.g. `manual`
    - `quantity`: string - Latest cost quantity e.g. `2.5`
    - `unit_cost`: string - Latest unit cost e.g. `30.5`
    - `unit_cost_project_currency`: string - Latest unit cost in project currency e.g. `30.5`
    - `unit_of_measure`: string - The unit of measure used e.g. `hours`
  - `latest_revenue_values`: object
    - `amount`: string - Latest revenue amount e.g. `76.25`
    - `amount_project_currency`: string - Latest revenue amount in project currency e.g. `76.25`
    - `calculation_strategy`: string enum[automatic, manual] - Latest revenue calculation strategy e.g. `manual`
    - `quantity`: string - Latest revenue quantity e.g. `2.5`
    - `unit_cost`: string - Latest revenue unit cost e.g. `30.5`
    - `unit_cost_project_currency`: string - Latest revenue unit cost in project currency e.g. `30.5`
  - `line_aging`: integer - Number of days since Change Event Line Item was added to Change Event and until the time the Change Event closed (or until today) e.g. `1`
  - `notes`: object - After successful update independent actions may be executed. For example: sync WBS code. The failures of those actions will be aggregated under attribute :notes and will not result in a Failure. e.g. `{ "5": { "message": "Affected Change Event Line Item #5", "children": [ { "me...`
  - `revenue_impact`: object
    - `estimate`: object
    - `change_order`: object
    - `change_order_package`: object
    - `source_of_latest_price`: string enum[change_order, estimate] - Latest price source e.g. `estimate`
    - `source_of_revenue_rom`: string enum[automatic, latest_cost, manual, no_revenue_expected] - Revenue ROM source e.g. `no_revenue_expected`
    - `source_of_stage`: string enum[estimate, change_order, change_order_package] - Source of the stage e.g. `estimate`
  - `source`: string enum[change_event, budget_change, field_initiated_change_orders] - Source of Change Item e.g. `change_event`
  - `updated_at`: string(date-time) - Timestamp of when the Change Event Line Item was updated e.g. `2024-10-23T21:39:40Z`
- `markup_items`: array of object - markup items
  - `id`: string - markup item ID e.g. `10-11-12-13`
  - `event_id`: integer - markup item's change event id e.g. `1`
  - `item_type`: string - item type e.g. `Markup`
  - `wbs_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `1`
    - `flat_code`: string - wbs code flat code e.g. `O.01-511`
    - `description`: string - wbs code description e.g. `Earthwork.Materials`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `revenue`: object - markup item revenue summary
    - `estimate_amount`: string - estimated amount e.g. `5.00`
    - `change_order_amount`: string - prime potential change order line items amount e.g. `3.00`
    - `latest_price_amount`: string - latest price e.g. `2.00`
- `production_quantities`: array of object - change event related production quantities
  - `id`: integer - production quantity id e.g. `1`
  - `event_id`: integer - production quantity event id e.g. `12`
  - `item_type`: string - item type e.g. `Production`
  - `estimate`: object - production quantity estimate
    - `quantity`: string - production quantity quantity e.g. `2.00`
    - `unit_of_measure`: string - production quantity unit of measure e.g. `hours`
  - `production_code`: object - production quantity cost code and if enabled sub job data
    - `cost_code`: object - cost code data
    - `sub_job`: object - cost code related sub job data in case when cost code biller is subjob
    - `wbs_code`: object - Item's associated Budget Code
  - `budget_change`: object - budget change
    - `id`: integer - budget change id e.g. `125132`
    - `number`: integer - budget change number e.g. `123`
    - `title`: string - title e.g. `Big Budget Change`
    - `description`: string - budget change description e.g. `Big Budget Change description`
    - `status`: string - budget change status e.g. `draft`
    - `production_quantity`: object - production quantity
  - `disabled_fields`: array of string - array of disabled fields for production quantities
  - `prime_change_order`: object - prime contract change order data
    - `id`: integer - Prime PCO id e.g. `125132`
    - `type`: string enum[potential_change_order, change_order_package] - type of change order e.g. `potential_change_order`
    - `number`: integer - Prime PCO number e.g. `123`
    - `title`: string - title e.g. `Big Prime PCO`
    - `description`: string - Prime PCO description e.g. `Some Prime PCO description`
    - `status`: string - Prime PCO status e.g. `draft`
    - `contract_id`: integer - Prime Contract ID e.g. `123`
    - `production_quantity`: object - production quantity
- `notes`: object - The failures of independent actions will be aggregated under the attribute and will not result in a Failure. For example: sync WBS code. e.g. `{ "5": { "message": "Affected Change Event Line Item #5", "children": [ { "me...`
- `currency_configuration`: object - currency configuration information
  - `currency_iso_code`: string - currency ISO code e.g. `USD`
- `source`: string enum[budget_change, field_initiated_change_orders] - The Change Event source refers to the resource that was responsible for creating this Change Event. e.g. `budget_change`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/change_events/{id}

**Update Change Event**
Update Change Event.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `change_event`: object (required)
  - `attachments`: array of object - Not to be used if other attachment types are included
    - `id`: integer - ID e.g. `3456`
  - `attachments_by_drawing_revision`: array of object
    - `id`: integer - ID e.g. `3456`
  - `attachments_by_file_version`: array of object
    - `id`: integer - ID e.g. `3456`
  - `attachments_by_form`: array of object
    - `id`: integer - ID e.g. `3456`
  - `attachments_by_image`: array of object
    - `id`: integer - ID e.g. `3456`
  - `attachments_by_uuid`: array of object
    - `upload_uuid`: string - UUID e.g. `01FG753MPADZBDWA63MH20XQVQ`
  - `change_items`: array of object - Change Event Line Items
    - `budget_code`: object - the Budget Code associated to the Change Item
      - `id`: integer - ID e.g. `40389`
    - `cost_impact`: object
      - `contract`: object
        - `proposed`: object - the Proposed Contract associated to the Change Item
      - `estimate`: object
        - `amount`: number - estimated cost amount e.g. `76.25`
        - `calculation_strategy`: string enum[automatic, manual] - cost calculation strategy e.g. `manual`
        - `quantity`: number - estimated cost quantity e.g. `2.5`
        - `unit_cost`: number - estimated unit cost e.g. `30.5`
        - `unit_of_measure`: string - unit of measure used e.g. `hours`
      - `vendor`: object
        - `proposed`: object - the Proposed Vendor associated to the Change Item
    - `deleted`: boolean - Whether change item should be deleted e.g. `true`
    - `description`: string - Description e.g. `Add caulk to bathtub base`
    - `id`: integer - ID of the change Event Line Item to update e.g. `12`
    - `revenue_impact`: object
      - `estimate`: object
        - `amount`: string - estimated revenue amount e.g. `116.55`
        - `calculation_strategy`: string enum[automatic, manual] - revenue calculation strategy e.g. `manual`
        - `quantity`: string - estimated revenue quantity e.g. `10.5`
        - `unit_cost`: string - estimated unit cost e.g. `11.1`
        - `unit_of_measure`: string - unit of measure used e.g. `hours`
      - `source_of_revenue_rom`: string enum[automatic, latest_cost, manual, no_revenue_expected] - revenue rom source e.g. `no_revenue_expected`
    - `budget_impact`: object
      - `estimate`: object
        - `amount`: number - the estimated budget impact amount e.g. `123.34`
        - `auto_balance`: boolean - indicates whether the Budget ROM should be automatically balanced e.g. `true`
        - `calculation_strategy`: string enum[manual, automatic] - the estimated budget impact calculation strategy e.g. `manual`
        - `quantity`: number - the estimated budget impact quantity e.g. `123.45`
        - `unit_cost`: number - the estimated unit cost for budget impact e.g. `321.54`
        - `unit_of_measure`: string - the unit of measure used e.g. `ft`
        - `transfer`: object
      - `source_of_budget_rom`: string enum[automatic, manual, quantity_by_unit_cost] - source of budget rom e.g. `automatic`
  - `change_reason`: object
    - `id`: integer - ID e.g. `3465`
  - `change_type`: object
    - `id`: integer - ID e.g. `123`
  - `custom_fields`: object e.g. `{"custom_field_10": "description"}`
  - `description`: string - Detailed description of the work or reason for the Change Event. e.g. `Additional concrete work for parking garage`
  - `event_origin`: object
    - `origin_id`: integer - ID of related event origin e.g. `3465`
    - `origin_type`: string enum[communication, generic_tools, meetings, observations, rfi, site_instructions] - type of related event origin e.g. `rfi`
  - `external_data`: object
    - `origin_data`: string - Free-form metadata about the corresponding record in an external (ERP) system. e.g. `OD-123654789`
    - `origin_id`: string - External record identifier in the originating source system.
  - `number`: string - User-defined identifier for the Change Event (may include alphanumeric characters). If omitted on create, one is auto-assigned. e.g. `A056`
  - `prime_contract_for_estimates`: object
    - `id`: integer - Prime Contract ID e.g. `3465`
  - `scope`: string enum[in_scope, out_of_scope, tbd] - Scope classification of the Change Event. e.g. `in_scope`
  - `source`: string enum[budget_change, field_initiated_change_orders] - The Change Event source refers to the resource that was responsible for creating this Change Event. e.g. `budget_change`
  - `source_of_revenue_rom`: string enum[automatic, latest_cost, manual, no_revenue_expected] - Revenue ROM source for this Change Event e.g. `latest_cost`
  - `status`: object
    - `id`: integer - ID e.g. `123`
  - `title`: string - Human-readable title summarizing the Change Event. e.g. `Big Change`

Response 200 (application/json): object

- `id`: integer - ID e.g. `43453`
- `number`: string - number e.g. `A056`
- `title`: string - title e.g. `Big Change`
- `description`: string - description e.g. `Additional concrete work for parking garage`
- `scope`: string - scope e.g. `tbd`
- `created_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `comments_enabled`: boolean - Comments Enabled e.g. `true`
- `deletable`: boolean e.g. `true`
- `in_recycle_bin`: boolean e.g. `false`
- `project_id`: integer - unique identifier for the project e.g. `60`
- `company_id`: integer - unique identifier for the company e.g. `39`
- `status`: object
  - `id`: integer - ID e.g. `1234`
  - `name`: string - name e.g. `open`
  - `mapped_to_status`: string - mapped_to_status e.g. `open`
- `event_origin`: object
  - `origin_id`: integer - ID e.g. `1234`
  - `origin_type`: string - type of object this change event originated from e.g. `Rfi::Header`
  - `display_name`: string - name of event origin used for view e.g. `RFI #91: Drawings Missing`
  - `web_page_url`: string - web page of event origin e.g. `/1/project/rfi/show/1`
- `change_type`: object
  - `id`: integer - ID e.g. `5`
  - `name`: string - name e.g. `Transfer`
  - `abbreviation`: string - abbreviation e.g. `TR`
- `change_reason`: object
  - `id`: integer - ID e.g. `3465`
  - `change_reason`: string - The reason for a change e.g. `Allowance`
- `prime_contract_for_estimates`: object
  - `id`: integer - ID e.g. `1122`
  - `number`: string - contract number e.g. `123`
  - `name`: string - name of contract e.g. `ACME Prime Contract`
- `attachments`: array of object
  - `id`: integer - ID e.g. `3456`
  - `url`: string - Remote Url for attached file e.g. `https://www.storage.com/files/contract.pdf`
  - `filename`: string - Filename e.g. `contract.pdf`
- `external_data`: object
  - `origin_id`: string - The Origin ID of the Change Event e.g. `654987123`
  - `origin_data`: string - The Origin Data of the Change Event e.g. `OD-123654789`
- `created_by`: object
  - `id`: integer - ID e.g. `987`
  - `login`: string - email address of Change Event creator e.g. `carl-contractor@example.com`
  - `name`: string - first and last name of Change Event creator e.g. `Carl Contractor`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `string`
    - `value`: string - The value of the custom field e.g. `custom field value`
    - `variant`: string - The variant of the Custom Field Definition (e.g. `phone_number`). Present only when the definition has an associated variant. e.g. `phone_number`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `decimal`
    - `value`: number - The value of the custom field e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `boolean`
    - `value`: boolean - The value of the custom field e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `lov_entry`
    - `value`: object
    - `variant`: string - The variant of the Custom Field Definition (e.g. `project_directory`). Present only when the definition has an associated variant. e.g. `with_code`
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `lov_entries`
    - `value`: array of object
- `change_items`: array of object
  - `budget_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `1`
    - `flat_code`: string - wbs code flat code e.g. `O.01-511`
    - `description`: string - wbs code description e.g. `Earthwork.Materials`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `budget_impact`: object
    - `budget_change`: object
    - `budget_modification`: object
    - `estimate`: object
    - `source_of_latest_budget_impact`: string enum[budget_change, estimate] - Source of latest budget impact e.g. `budget_change`
    - `source_of_stage`: string enum[estimate, budget_change] - The source of the stage
    - `source_of_budget_rom`: string enum[automatic, manual, quantity_by_unit_cost] - Source of budget ROM e.g. `automatic`
  - `cost_impact`: object
    - `change_order_package`: object
    - `commitment`: object
    - `contract`: object
    - `estimate`: object
    - `non_commitment`: object
    - `request_for_quote`: object - Request for Quote data if any present, can be null
    - `source_of_latest_cost`: string enum[commitment, estimate, latest_quote, non_commitment] - Source of latest cost e.g. `commitment`
    - `source_of_stage`: string enum[estimate, non-commitment, commitment, change_order_package, latest_quote] - Source of stage e.g. `estimate`
    - `vendor`: object
  - `created_at`: string(date-time) - Timestamp of when the Change Event Line Item was created e.g. `2024-10-23T21:39:40Z`
  - `currency_configuration`: object - Currency configuration information
    - `currency_iso_code`: string - currency ISO code e.g. `USD`
  - `deletable`: boolean - Whether the Line Item is deletable e.g. `false`
  - `deleted_at`: string(date-time) - Timestamp of when the Line Item was deleted e.g. `2024-10-23T21:39:40Z`
  - `description`: string - Description of the Line Item e.g. `labor for new swimming pool`
  - `editable`: boolean - Whether the Line Item is editable e.g. `true`
  - `event_id`: integer - The ID of the associated Change Event e.g. `123`
  - `event_number`: string - The number of the associated Change Event e.g. `A056`
  - `event_title`: string - The title of the associated Change Event e.g. `Big Change`
  - `id`: integer - The ID of the Line Item e.g. `3456`
  - `item_type`: string - The type of the Line Item e.g. `Event Line`
  - `latest_cost_values`: object
    - `amount`: string - Latest cost amount e.g. `76.25`
    - `amount_project_currency`: string - Latest cost amount in project currency e.g. `76.25`
    - `calculation_strategy`: string enum[automatic, manual] - Latest cost calculation strategy e.g. `manual`
    - `quantity`: string - Latest cost quantity e.g. `2.5`
    - `unit_cost`: string - Latest unit cost e.g. `30.5`
    - `unit_cost_project_currency`: string - Latest unit cost in project currency e.g. `30.5`
    - `unit_of_measure`: string - The unit of measure used e.g. `hours`
  - `latest_revenue_values`: object
    - `amount`: string - Latest revenue amount e.g. `76.25`
    - `amount_project_currency`: string - Latest revenue amount in project currency e.g. `76.25`
    - `calculation_strategy`: string enum[automatic, manual] - Latest revenue calculation strategy e.g. `manual`
    - `quantity`: string - Latest revenue quantity e.g. `2.5`
    - `unit_cost`: string - Latest revenue unit cost e.g. `30.5`
    - `unit_cost_project_currency`: string - Latest revenue unit cost in project currency e.g. `30.5`
  - `line_aging`: integer - Number of days since Change Event Line Item was added to Change Event and until the time the Change Event closed (or until today) e.g. `1`
  - `notes`: object - After successful update independent actions may be executed. For example: sync WBS code. The failures of those actions will be aggregated under attribute :notes and will not result in a Failure. e.g. `{ "5": { "message": "Affected Change Event Line Item #5", "children": [ { "me...`
  - `revenue_impact`: object
    - `estimate`: object
    - `change_order`: object
    - `change_order_package`: object
    - `source_of_latest_price`: string enum[change_order, estimate] - Latest price source e.g. `estimate`
    - `source_of_revenue_rom`: string enum[automatic, latest_cost, manual, no_revenue_expected] - Revenue ROM source e.g. `no_revenue_expected`
    - `source_of_stage`: string enum[estimate, change_order, change_order_package] - Source of the stage e.g. `estimate`
  - `source`: string enum[change_event, budget_change, field_initiated_change_orders] - Source of Change Item e.g. `change_event`
  - `updated_at`: string(date-time) - Timestamp of when the Change Event Line Item was updated e.g. `2024-10-23T21:39:40Z`
- `markup_items`: array of object - markup items
  - `id`: string - markup item ID e.g. `10-11-12-13`
  - `event_id`: integer - markup item's change event id e.g. `1`
  - `item_type`: string - item type e.g. `Markup`
  - `wbs_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `1`
    - `flat_code`: string - wbs code flat code e.g. `O.01-511`
    - `description`: string - wbs code description e.g. `Earthwork.Materials`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `revenue`: object - markup item revenue summary
    - `estimate_amount`: string - estimated amount e.g. `5.00`
    - `change_order_amount`: string - prime potential change order line items amount e.g. `3.00`
    - `latest_price_amount`: string - latest price e.g. `2.00`
- `production_quantities`: array of object - change event related production quantities
  - `id`: integer - production quantity id e.g. `1`
  - `event_id`: integer - production quantity event id e.g. `12`
  - `item_type`: string - item type e.g. `Production`
  - `estimate`: object - production quantity estimate
    - `quantity`: string - production quantity quantity e.g. `2.00`
    - `unit_of_measure`: string - production quantity unit of measure e.g. `hours`
  - `production_code`: object - production quantity cost code and if enabled sub job data
    - `cost_code`: object - cost code data
    - `sub_job`: object - cost code related sub job data in case when cost code biller is subjob
    - `wbs_code`: object - Item's associated Budget Code
  - `budget_change`: object - budget change
    - `id`: integer - budget change id e.g. `125132`
    - `number`: integer - budget change number e.g. `123`
    - `title`: string - title e.g. `Big Budget Change`
    - `description`: string - budget change description e.g. `Big Budget Change description`
    - `status`: string - budget change status e.g. `draft`
    - `production_quantity`: object - production quantity
  - `disabled_fields`: array of string - array of disabled fields for production quantities
  - `prime_change_order`: object - prime contract change order data
    - `id`: integer - Prime PCO id e.g. `125132`
    - `type`: string enum[potential_change_order, change_order_package] - type of change order e.g. `potential_change_order`
    - `number`: integer - Prime PCO number e.g. `123`
    - `title`: string - title e.g. `Big Prime PCO`
    - `description`: string - Prime PCO description e.g. `Some Prime PCO description`
    - `status`: string - Prime PCO status e.g. `draft`
    - `contract_id`: integer - Prime Contract ID e.g. `123`
    - `production_quantity`: object - production quantity
- `notes`: object - The failures of independent actions will be aggregated under the attribute and will not result in a Failure. For example: sync WBS code. e.g. `{ "5": { "message": "Affected Change Event Line Item #5", "children": [ { "me...`
- `currency_configuration`: object - currency configuration information
  - `currency_iso_code`: string - currency ISO code e.g. `USD`
- `source`: string enum[budget_change, field_initiated_change_orders] - The Change Event source refers to the resource that was responsible for creating this Change Event. e.g. `budget_change`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.1/change_events/{id}

**Delete Change Event**
Delete Change Event

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 204: No Content (no body)

Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/change_events

**List Change Events**
List Change Events.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[include_deleted]` [query] string enum[only, with] - Use 'only' to return only deleted resources. Use 'with' to return deleted and undeleted resources.
- `filters[search]` [query] string - Return item(s) matching the specified Search query.

Request body (application/json):

- `filters`: object
  - `budget_change`: object - Return Change Events with or without Change Items with the specified Budget Change
    - `id`: array of integer
    - `operator`: string enum[includes]
  - `budget_days_in_stage`: object - Return Change Events with Change Items having the specified budget days in stage e.g. `[{"budget_days_in_stage": {"id": [1, 2], "operator": "between"}}, {"budget_da...`
    - `id`: array of integer
    - `operator`: string enum[eq, lt, lteq, gt, gteq, between]
  - `budget_stage_status`: object - Return Change Events with Change Items having Budget Stage with the specified status
    - `id`: array of string enum[approved, draft]
    - `operator`: string enum[includes, excludes]
  - `budget_stage`: object - Return Change Events with Change Items having Budget Stage with the specified stage
    - `id`: array of string enum[bc, estimate]
    - `operator`: string enum[includes, excludes]
  - `budget_code`: object - Return Change Events with or without Change Items with the specified Budget Code
    - `id`: array of integer
    - `operator`: string enum[includes, excludes]
  - `change_event_line_item`: object
    - `id`: array of integer
    - `operator`: string enum[includes, excludes]
  - `change_reason`: object - Return Change Events with the specified Change Reason, or Change Events that do not have the specified Change Reason, based on the operator used
    - `id`: array of integer
    - `operator`: string enum[includes, excludes]
  - `change_type`: object - Return Change Events with the specified Change Type, or Change Events that do not have the specified Change Type, based on the operator used.
    - `id`: array of integer
    - `operator`: string enum[includes, excludes]
  - `commitment_status`: object - Return Change Events with Change Items having Commitment Contract or Commitment Change Order with the specified status
    - `id`: array of string enum[approved, closed, complete, draft, no_charge, not_pricing, not_proceeding, out_for_bid, out_for_signature, partially_received, pending, pricing, ...]
  - `commitment`: object - Return Change Events with or without Change Items associated with a Commitment or Commitment Change Orders
    - `id`: array of string enum[with, without]
    - `operator`: string enum[includes]
  - `custom_field_id`: object - Return Change Events with custom fields that match the specified custom field values
    - `id`: array of integer
    - `operator`: string enum[includes]
  - `created_at`: string - Change Events created within the specified ISO 8601 datetime range. Formats: - `N_months` - Within N month, - `N_days` - Within N days, - `YYYY-MM-DD`...`YYYY-MM-DD` - Date, - `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:M...
  - `cost_in_status_since`: string - Change Events with Change Items having cost entered status within the specified ISO 8601 datetime range. Formats: - `N_months` - Within N month, - `N_days` - Within N days, - `YYYY-MM-DD`...`YYYY-MM-DD` - Date, - `YYY...
  - `revenue_in_status_since`: string - Change Events with Change Items having revenue entered status within the specified ISO 8601 datetime range. Formats: - `N_months` - Within N month, - `N_days` - Within N days, - `YYYY-MM-DD`...`YYYY-MM-DD` - Date, - `...
  - `budget_in_status_since`: string - Change Events with Change Items having budget entered status within the specified ISO 8601 datetime range. Formats: - `N_months` - Within N month, - `N_days` - Within N days, - `YYYY-MM-DD`...`YYYY-MM-DD` - Date, - `Y...
  - `created_by`: object - Return Change Events created by the specified User
    - `id`: array of integer
  - `commitment_title`: object - Return Change Events with Change Items having Commitment or Commitment Change Orders with the specified title
    - `id`: array of string
    - `operator`: string enum[includes, excludes]
  - `contract`: object - Return Change Events with Change Items having Commitment or Commitment Change Orders with the specified Contract
    - `id`: array of string
    - `operator`: string enum[includes, excludes]
  - `cost_days_in_stage`: object - Return Change Events with Change Items having the specified cost days in stage e.g. `[{"cost_days_in_stage": {"id": [1, 2], "operator": "between"}}, {"cost_days_i...`
    - `id`: array of integer
    - `operator`: string enum[eq, lt, lteq, gt, gteq, between]
  - `cost_rom_amount`: object - Return Change Events with Change Items having the specified cost rom amount e.g. `[{"cost_rom_amount": {"id": [1, 2], "operator": "between"}}, {"cost_rom_amoun...`
    - `id`: array of integer
    - `operator`: string enum[eq, lt, lteq, gt, gteq, between]
  - `latest_cost_amount_project_currency`: object - Return Change Events with Change Items having the specified latest cost amount in project currency e.g. `[{"latest_cost_amount_project_currency": {"id": [1, 2], "operator": "between"...`
    - `id`: array of integer
    - `operator`: string enum[eq, lt, lteq, gt, gteq, between]
  - `latest_revenue_amount_project_currency`: object - Return Change Events with Change Items having the specified latest revenue amount in project currency e.g. `[{"latest_revenue_amount_project_currency": {"id": [1, 2], "operator": "betwe...`
    - `id`: array of integer
    - `operator`: string enum[eq, lt, lteq, gt, gteq, between]
  - `latest_budget_impact_project_currency`: object - Return Change Events with Change Items having the specified latest budget impact in project currency e.g. `[{"latest_budget_impact_project_currency": {"id": [1, 2], "operator": "betwee...`
    - `id`: array of integer
    - `operator`: string enum[eq, lt, lteq, gt, gteq, between]
  - `revenue_unit_cost_project_currency`: object - Return Change Events with Change Items having the specified revenue unit cost in project currency e.g. `[{"revenue_unit_cost_project_currency": {"id": [1, 2], "operator": "between"}...`
    - `id`: array of integer
    - `operator`: string enum[eq, lt, lteq, gt, gteq, between]
  - `budget_unit_cost_value_project_currency`: object - Return Change Events with Change Items having the specified budget unit cost in project currency e.g. `[{"budget_unit_cost_value_project_currency": {"id": [1, 2], "operator": "betw...`
    - `id`: array of integer
    - `operator`: string enum[eq, lt, lteq, gt, gteq, between]
  - `cost_unit_cost_value_project_currency`: object - Return Change Events with Change Items having the specified cost unit cost in project currency e.g. `[{"cost_unit_cost_value_project_currency": {"id": [1, 2], "operator": "betwee...`
    - `id`: array of integer
    - `operator`: string enum[eq, lt, lteq, gt, gteq, between]
  - `over_under_project_currency`: object - Return Change Events with Change Items having the specified over/under amount in project currency (revenue - cost) e.g. `[{"over_under_project_currency": {"id": [-100, 500], "operator": "between"}},...`
    - `id`: array of integer
    - `operator`: string enum[eq, lt, lteq, gt, gteq, between]
  - `latest_quote_amount_project_currency`: object - Return Change Events with Change Items having the specified request for quote amount in project currency e.g. `[{"latest_quote_amount_project_currency": {"id": [100, 1000], "operator": "be...`
    - `id`: array of integer
    - `operator`: string enum[eq, lt, lteq, gt, gteq, between]
  - `cost_stage_status`: object - Return Change Events with Change Items having Cost Stage with the specified status
    - `id`: array of string enum[approved, draft, not_pricing, out_for_bid, out_for_pricing, pending, processing, terminated, under_review, void]
    - `operator`: string enum[includes, excludes]
  - `cost_stage`: object - Return Change Events with Change Items having Cost Stage with the specified stage
    - `id`: array of string enum[change_order_package, commitment_contract, estimate, latest_quote, non_commitment]
    - `operator`: string enum[includes, excludes]
  - `event_origin_type`: object - Return Change Events with or without the assigned Origin with specified Origin Type.
    - `id`: array of string enum[communication, generic_tools, meetings, observations, rfi, site_instructions]
    - `operator`: string enum[includes, excludes]
  - `item_type`: object - Return Change Events with Change Items having the specified Item Type
    - `id`: array of string enum[change_event_line_item, markup, non_celi_change_event, production_quantity, recycled_change_event]
    - `operator`: string enum[includes, excludes]
  - `non_commitment`: object - Return Change Events with or without Change Items with Non Commitment Cost
    - `id`: array of string enum[with, without]
    - `operator`: string enum[includes]
  - `number`: object - Return Change Events with or without the specified Change Event ID
    - `id`: array of integer
    - `operator`: string enum[includes, excludes]
  - `number_title`: object - Return Change Events with or without the specified Change Event ID
    - `id`: array of integer
    - `operator`: string enum[includes, excludes]
  - `production_quantity`: object
    - `id`: array of integer
    - `operator`: string enum[includes, excludes]
  - `prime_pco_status`: object - Return Change Events with Change Items having Prime Change Order with the specified status
    - `id`: array of string enum[approved, draft, no_charge, not_pricing, not_proceeding, pending, pricing, proceeding, rejected, revised, void]
  - `prime_pco`: object - Return Change Events with or without Change Items associated with Prime PCO
    - `id`: array of string enum[with, without]
    - `operator`: string enum[includes]
  - `revenue_days_in_stage`: object - Return Change Events with Change Items having the specified revenue days in stage e.g. `[{"revenue_days_in_stage": {"id": [1, 2], "operator": "between"}}, {"revenue_...`
    - `id`: array of integer
    - `operator`: string enum[eq, lt, lteq, gt, gteq, between]
  - `revenue_rom_amount_project_currency`: object - Return Change Events with Change Items having the specified revenue rom amount in project currency e.g. `[{"revenue_rom_amount_project_currency": {"id": [1, 2], "operator": "between"...`
    - `id`: array of integer
    - `operator`: string enum[eq, lt, lteq, gt, gteq, between]
  - `budget_rom_amount_project_currency`: object - Return Change Events with Change Items having the specified budget rom amount in project currency e.g. `[{"budget_rom_amount_project_currency": {"id": [1, 2], "operator": "between"}...`
    - `id`: array of number
    - `operator`: string enum[eq, lt, lteq, gt, gteq, between]
  - `rfq`: object - Return Change Events with or without Change Items having Request for Quote
    - `id`: array of string enum[with, without]
    - `operator`: string enum[includes, excludes]
  - `rfq_status`: object - Return Change Events with Change Items having Request for Quote with the specified status
    - `id`: array of string enum[out_for_pricing, revise_and_resubmit, under_review, withdrawn, pending_final_approval, closed]
  - `rfq_title`: object - Change Items having Request for Quote with title groups which are represented by the RFQ ID and Composed RFQ ID or None which is empty string
    - `id`: array of string
  - `resource`: object - Return Change Events with Change Event Line Items assigned the specified Resource. Available when the Rates tool is enabled on the project.
    - `id`: array of string
    - `operator`: string enum[includes]
  - `scope`: object - Return Change Events with the specified event scope, or Change Events that do not have the specified event scope, based on the operator used
    - `id`: array of string enum[tbd, in_scope, out_of_scope]
    - `operator`: string enum[includes, excludes]
  - `status`: object - Return Change Events with the specified status, or Change Events that do not have the specified status, based on the operator used
    - `id`: array of integer
    - `operator`: string enum[includes, excludes]
  - `vendor`: object - Return Change Events with the ids of the specified Change Event Vendors
    - `id`: array of integer
    - `operator`: string enum[includes]
  - `wbs_segment_id`: object - Return Change Events with or without Change Items with Budget Code that has the specified WBS Segment ID
    - `id`: array of integer
    - `operator`: string enum[includes]

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `43453`
- `number`: string - number e.g. `A056`
- `title`: string - title e.g. `Big Change`
- `description`: string - description e.g. `Additional concrete work for parking garage`
- `scope`: string - scope e.g. `tbd`
- `created_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `comments_enabled`: boolean - Comments Enabled e.g. `true`
- `deletable`: boolean e.g. `true`
- `in_recycle_bin`: boolean e.g. `false`
- `project_id`: integer - unique identifier for the project e.g. `60`
- `company_id`: integer - unique identifier for the company e.g. `39`
- `status`: object
  - `id`: integer - ID e.g. `1234`
  - `name`: string - name e.g. `open`
  - `mapped_to_status`: string - mapped_to_status e.g. `open`
- `event_origin`: object
  - `origin_id`: integer - ID e.g. `1234`
  - `origin_type`: string - type of object this change event originated from e.g. `Rfi::Header`
  - `display_name`: string - name of event origin used for view e.g. `RFI #91: Drawings Missing`
  - `web_page_url`: string - web page of event origin e.g. `/1/project/rfi/show/1`
- `change_type`: object
  - `id`: integer - ID e.g. `5`
  - `name`: string - name e.g. `Transfer`
  - `abbreviation`: string - abbreviation e.g. `TR`
- `change_reason`: object
  - `id`: integer - ID e.g. `3465`
  - `change_reason`: string - The reason for a change e.g. `Allowance`
- `prime_contract_for_estimates`: object
  - `id`: integer - ID e.g. `1122`
  - `number`: string - contract number e.g. `123`
  - `name`: string - name of contract e.g. `ACME Prime Contract`
- `attachments`: array of object
  - `id`: integer - ID e.g. `3456`
  - `url`: string - Remote Url for attached file e.g. `https://www.storage.com/files/contract.pdf`
  - `filename`: string - Filename e.g. `contract.pdf`
- `external_data`: object
  - `origin_id`: string - The Origin ID of the Change Event e.g. `654987123`
  - `origin_data`: string - The Origin Data of the Change Event e.g. `OD-123654789`
- `created_by`: object
  - `id`: integer - ID e.g. `987`
  - `login`: string - email address of Change Event creator e.g. `carl-contractor@example.com`
  - `name`: string - first and last name of Change Event creator e.g. `Carl Contractor`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `string`
    - `value`: string - The value of the custom field e.g. `custom field value`
    - `variant`: string - The variant of the Custom Field Definition (e.g. `phone_number`). Present only when the definition has an associated variant. e.g. `phone_number`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `decimal`
    - `value`: number - The value of the custom field e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `boolean`
    - `value`: boolean - The value of the custom field e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `lov_entry`
    - `value`: object
    - `variant`: string - The variant of the Custom Field Definition (e.g. `project_directory`). Present only when the definition has an associated variant. e.g. `with_code`
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `lov_entries`
    - `value`: array of object
- `change_items`: array of object
  - `budget_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `1`
    - `flat_code`: string - wbs code flat code e.g. `O.01-511`
    - `description`: string - wbs code description e.g. `Earthwork.Materials`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `budget_impact`: object
    - `budget_change`: object
    - `budget_modification`: object
    - `estimate`: object
    - `source_of_latest_budget_impact`: string enum[budget_change, estimate] - Source of latest budget impact e.g. `budget_change`
    - `source_of_stage`: string enum[estimate, budget_change] - The source of the stage
    - `source_of_budget_rom`: string enum[automatic, manual, quantity_by_unit_cost] - Source of budget ROM e.g. `automatic`
  - `cost_impact`: object
    - `change_order_package`: object
    - `commitment`: object
    - `contract`: object
    - `estimate`: object
    - `non_commitment`: object
    - `request_for_quote`: object - Request for Quote data if any present, can be null
    - `source_of_latest_cost`: string enum[commitment, estimate, latest_quote, non_commitment] - Source of latest cost e.g. `commitment`
    - `source_of_stage`: string enum[estimate, non-commitment, commitment, change_order_package, latest_quote] - Source of stage e.g. `estimate`
    - `vendor`: object
  - `created_at`: string(date-time) - Timestamp of when the Change Event Line Item was created e.g. `2024-10-23T21:39:40Z`
  - `currency_configuration`: object - Currency configuration information
    - `currency_iso_code`: string - currency ISO code e.g. `USD`
  - `deletable`: boolean - Whether the Line Item is deletable e.g. `false`
  - `deleted_at`: string(date-time) - Timestamp of when the Line Item was deleted e.g. `2024-10-23T21:39:40Z`
  - `description`: string - Description of the Line Item e.g. `labor for new swimming pool`
  - `editable`: boolean - Whether the Line Item is editable e.g. `true`
  - `event_id`: integer - The ID of the associated Change Event e.g. `123`
  - `event_number`: string - The number of the associated Change Event e.g. `A056`
  - `event_title`: string - The title of the associated Change Event e.g. `Big Change`
  - `id`: integer - The ID of the Line Item e.g. `3456`
  - `item_type`: string - The type of the Line Item e.g. `Event Line`
  - `latest_cost_values`: object
    - `amount`: string - Latest cost amount e.g. `76.25`
    - `amount_project_currency`: string - Latest cost amount in project currency e.g. `76.25`
    - `calculation_strategy`: string enum[automatic, manual] - Latest cost calculation strategy e.g. `manual`
    - `quantity`: string - Latest cost quantity e.g. `2.5`
    - `unit_cost`: string - Latest unit cost e.g. `30.5`
    - `unit_cost_project_currency`: string - Latest unit cost in project currency e.g. `30.5`
    - `unit_of_measure`: string - The unit of measure used e.g. `hours`
  - `latest_revenue_values`: object
    - `amount`: string - Latest revenue amount e.g. `76.25`
    - `amount_project_currency`: string - Latest revenue amount in project currency e.g. `76.25`
    - `calculation_strategy`: string enum[automatic, manual] - Latest revenue calculation strategy e.g. `manual`
    - `quantity`: string - Latest revenue quantity e.g. `2.5`
    - `unit_cost`: string - Latest revenue unit cost e.g. `30.5`
    - `unit_cost_project_currency`: string - Latest revenue unit cost in project currency e.g. `30.5`
  - `line_aging`: integer - Number of days since Change Event Line Item was added to Change Event and until the time the Change Event closed (or until today) e.g. `1`
  - `notes`: object - After successful update independent actions may be executed. For example: sync WBS code. The failures of those actions will be aggregated under attribute :notes and will not result in a Failure. e.g. `{ "5": { "message": "Affected Change Event Line Item #5", "children": [ { "me...`
  - `revenue_impact`: object
    - `estimate`: object
    - `change_order`: object
    - `change_order_package`: object
    - `source_of_latest_price`: string enum[change_order, estimate] - Latest price source e.g. `estimate`
    - `source_of_revenue_rom`: string enum[automatic, latest_cost, manual, no_revenue_expected] - Revenue ROM source e.g. `no_revenue_expected`
    - `source_of_stage`: string enum[estimate, change_order, change_order_package] - Source of the stage e.g. `estimate`
  - `source`: string enum[change_event, budget_change, field_initiated_change_orders] - Source of Change Item e.g. `change_event`
  - `updated_at`: string(date-time) - Timestamp of when the Change Event Line Item was updated e.g. `2024-10-23T21:39:40Z`
- `markup_items`: array of object - markup items
  - `id`: string - markup item ID e.g. `10-11-12-13`
  - `event_id`: integer - markup item's change event id e.g. `1`
  - `item_type`: string - item type e.g. `Markup`
  - `wbs_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `1`
    - `flat_code`: string - wbs code flat code e.g. `O.01-511`
    - `description`: string - wbs code description e.g. `Earthwork.Materials`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `revenue`: object - markup item revenue summary
    - `estimate_amount`: string - estimated amount e.g. `5.00`
    - `change_order_amount`: string - prime potential change order line items amount e.g. `3.00`
    - `latest_price_amount`: string - latest price e.g. `2.00`
- `production_quantities`: array of object - change event related production quantities
  - `id`: integer - production quantity id e.g. `1`
  - `event_id`: integer - production quantity event id e.g. `12`
  - `item_type`: string - item type e.g. `Production`
  - `estimate`: object - production quantity estimate
    - `quantity`: string - production quantity quantity e.g. `2.00`
    - `unit_of_measure`: string - production quantity unit of measure e.g. `hours`
  - `production_code`: object - production quantity cost code and if enabled sub job data
    - `cost_code`: object - cost code data
    - `sub_job`: object - cost code related sub job data in case when cost code biller is subjob
    - `wbs_code`: object - Item's associated Budget Code
  - `budget_change`: object - budget change
    - `id`: integer - budget change id e.g. `125132`
    - `number`: integer - budget change number e.g. `123`
    - `title`: string - title e.g. `Big Budget Change`
    - `description`: string - budget change description e.g. `Big Budget Change description`
    - `status`: string - budget change status e.g. `draft`
    - `production_quantity`: object - production quantity
  - `disabled_fields`: array of string - array of disabled fields for production quantities
  - `prime_change_order`: object - prime contract change order data
    - `id`: integer - Prime PCO id e.g. `125132`
    - `type`: string enum[potential_change_order, change_order_package] - type of change order e.g. `potential_change_order`
    - `number`: integer - Prime PCO number e.g. `123`
    - `title`: string - title e.g. `Big Prime PCO`
    - `description`: string - Prime PCO description e.g. `Some Prime PCO description`
    - `status`: string - Prime PCO status e.g. `draft`
    - `contract_id`: integer - Prime Contract ID e.g. `123`
    - `production_quantity`: object - production quantity
- `notes`: object - The failures of independent actions will be aggregated under the attribute and will not result in a Failure. For example: sync WBS code. e.g. `{ "5": { "message": "Affected Change Event Line Item #5", "children": [ { "me...`
- `currency_configuration`: object - currency configuration information
  - `currency_iso_code`: string - currency ISO code e.g. `USD`
- `source`: string enum[budget_change, field_initiated_change_orders] - The Change Event source refers to the resource that was responsible for creating this Change Event. e.g. `budget_change`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/change_events

**Create Change Event**
Create Change Event.
`status.id` must identify a Change Event status that exists for the company. Unknown status IDs return 400.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `change_event`: object (required)
  - `number`: string - User-defined identifier for the Change Event (may include alphanumeric characters). If omitted on create, one is auto-assigned. e.g. `A056`
  - `title`: string - Human-readable title summarizing the Change Event. e.g. `New Bathtub Installation`
  - `description`: string - Detailed description of the work or reason for the Change Event. e.g. `Install a new bathtub in the bathroom`
  - `scope`: string enum[tbd, in_scope, out_of_scope] (required) - Scope classification of the Change Event. e.g. `in_scope`
  - `prime_contract_for_estimates`: object
    - `id`: integer - Prime Contract ID e.g. `3465`
  - `event_origin`: object
    - `origin_id`: integer - ID of related event origin e.g. `3465`
    - `origin_type`: string enum[observations, rfi, meetings, site_instructions, communication, generic_tools] - type of related event origin e.g. `rfi`
  - `change_reason`: object
    - `id`: integer - ID e.g. `3465`
  - `status`: object (required)
    - `id`: integer - ID of a Change Event status that exists for the company. Unknown IDs return 400. e.g. `123`
  - `source`: string enum[budget_change, field_initiated_change_orders] - The Change Event source refers to the resource that was responsible for creating this Change Event. e.g. `budget_change`
  - `source_of_revenue_rom`: string enum[latest_cost, manual, automatic, no_revenue_expected] - Revenue ROM source for this Change Event e.g. `latest_cost`
  - `change_type`: object
    - `id`: integer - ID e.g. `123`
  - `external_data`: object
    - `origin_data`: string - Free-form metadata about the corresponding record in an external (ERP) system. e.g. `OD-123654789`
    - `origin_id`: string - External record identifier in the originating source system.
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `change_items`: array of object - Change Event Line Items
    - `budget_code`: object - the Budget Code associated to the Change Item. If one is not provided, the Change Event Line Item will be created with a 'None' Budget Code.
      - `id`: integer - ID e.g. `40389`
    - `budget_impact`: object
      - `estimate`: object
        - `amount`: number - the estimated budget impact amount e.g. `123.34`
        - `auto_balance`: boolean - indicates whether the Budget ROM should be automatically balanced e.g. `true`
        - `calculation_strategy`: string enum[automatic, manual] - the estimated budget impact calculation strategy e.g. `manual`
        - `quantity`: number - the estimated budget impact quantity e.g. `123.45`
        - `transfer`: object
        - `unit_cost`: number - the estimated unit cost for budget impact e.g. `321.54`
        - `unit_of_measure`: string - the unit of measure used e.g. `ft`
      - `source_of_budget_rom`: string enum[automatic, manual, quantity_by_unit_cost] - source of budget rom e.g. `automatic`
    - `cost_impact`: object
      - `estimate`: object
        - `amount`: number - estimated cost amount e.g. `76.25`
        - `calculation_strategy`: string enum[automatic, manual] - cost calculation strategy e.g. `manual`
        - `quantity`: number - estimated cost quantity e.g. `2.5`
        - `unit_cost`: number - estimated unit cost e.g. `30.5`
        - `unit_of_measure`: string - unit of measure used e.g. `hours`
      - `vendor`: object
        - `proposed`: object - the Proposed Vendor associated to the Change Item
      - `contract`: object
        - `proposed`: object - the Proposed Contract associated to the Change Item
    - `description`: string - Description e.g. `Add caulk to bathtub base`
    - `revenue_impact`: object
      - `estimate`: object
        - `amount`: string - estimated revenue amount e.g. `116.55`
        - `calculation_strategy`: string enum[automatic, manual] - revenue calculation strategy e.g. `manual`
        - `quantity`: string - estimated revenue quantity e.g. `10.5`
        - `unit_cost`: string - estimated unit cost e.g. `11.1`
        - `unit_of_measure`: string - unit of measure used e.g. `hours`
      - `source_of_revenue_rom`: string enum[automatic, latest_cost, manual, no_revenue_expected] - Revenue ROM source for this Change Item e.g. `latest_cost`

Response 201 (application/json): object

- `id`: integer - ID e.g. `43453`
- `number`: string - number e.g. `A056`
- `title`: string - title e.g. `Big Change`
- `description`: string - description e.g. `Additional concrete work for parking garage`
- `scope`: string - scope e.g. `tbd`
- `created_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `comments_enabled`: boolean - Comments Enabled e.g. `true`
- `deletable`: boolean e.g. `true`
- `in_recycle_bin`: boolean e.g. `false`
- `project_id`: integer - unique identifier for the project e.g. `60`
- `company_id`: integer - unique identifier for the company e.g. `39`
- `status`: object
  - `id`: integer - ID e.g. `1234`
  - `name`: string - name e.g. `open`
  - `mapped_to_status`: string - mapped_to_status e.g. `open`
- `event_origin`: object
  - `origin_id`: integer - ID e.g. `1234`
  - `origin_type`: string - type of object this change event originated from e.g. `Rfi::Header`
  - `display_name`: string - name of event origin used for view e.g. `RFI #91: Drawings Missing`
  - `web_page_url`: string - web page of event origin e.g. `/1/project/rfi/show/1`
- `change_type`: object
  - `id`: integer - ID e.g. `5`
  - `name`: string - name e.g. `Transfer`
  - `abbreviation`: string - abbreviation e.g. `TR`
- `change_reason`: object
  - `id`: integer - ID e.g. `3465`
  - `change_reason`: string - The reason for a change e.g. `Allowance`
- `prime_contract_for_estimates`: object
  - `id`: integer - ID e.g. `1122`
  - `number`: string - contract number e.g. `123`
  - `name`: string - name of contract e.g. `ACME Prime Contract`
- `attachments`: array of object
  - `id`: integer - ID e.g. `3456`
  - `url`: string - Remote Url for attached file e.g. `https://www.storage.com/files/contract.pdf`
  - `filename`: string - Filename e.g. `contract.pdf`
- `external_data`: object
  - `origin_id`: string - The Origin ID of the Change Event e.g. `654987123`
  - `origin_data`: string - The Origin Data of the Change Event e.g. `OD-123654789`
- `created_by`: object
  - `id`: integer - ID e.g. `987`
  - `login`: string - email address of Change Event creator e.g. `carl-contractor@example.com`
  - `name`: string - first and last name of Change Event creator e.g. `Carl Contractor`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `string`
    - `value`: string - The value of the custom field e.g. `custom field value`
    - `variant`: string - The variant of the Custom Field Definition (e.g. `phone_number`). Present only when the definition has an associated variant. e.g. `phone_number`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `decimal`
    - `value`: number - The value of the custom field e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `boolean`
    - `value`: boolean - The value of the custom field e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `lov_entry`
    - `value`: object
    - `variant`: string - The variant of the Custom Field Definition (e.g. `project_directory`). Present only when the definition has an associated variant. e.g. `with_code`
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `lov_entries`
    - `value`: array of object
- `change_items`: array of object
  - `budget_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `1`
    - `flat_code`: string - wbs code flat code e.g. `O.01-511`
    - `description`: string - wbs code description e.g. `Earthwork.Materials`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `budget_impact`: object
    - `budget_change`: object
    - `budget_modification`: object
    - `estimate`: object
    - `source_of_latest_budget_impact`: string enum[budget_change, estimate] - Source of latest budget impact e.g. `budget_change`
    - `source_of_stage`: string enum[estimate, budget_change] - The source of the stage
    - `source_of_budget_rom`: string enum[automatic, manual, quantity_by_unit_cost] - Source of budget ROM e.g. `automatic`
  - `cost_impact`: object
    - `change_order_package`: object
    - `commitment`: object
    - `contract`: object
    - `estimate`: object
    - `non_commitment`: object
    - `request_for_quote`: object - Request for Quote data if any present, can be null
    - `source_of_latest_cost`: string enum[commitment, estimate, latest_quote, non_commitment] - Source of latest cost e.g. `commitment`
    - `source_of_stage`: string enum[estimate, non-commitment, commitment, change_order_package, latest_quote] - Source of stage e.g. `estimate`
    - `vendor`: object
  - `created_at`: string(date-time) - Timestamp of when the Change Event Line Item was created e.g. `2024-10-23T21:39:40Z`
  - `currency_configuration`: object - Currency configuration information
    - `currency_iso_code`: string - currency ISO code e.g. `USD`
  - `deletable`: boolean - Whether the Line Item is deletable e.g. `false`
  - `deleted_at`: string(date-time) - Timestamp of when the Line Item was deleted e.g. `2024-10-23T21:39:40Z`
  - `description`: string - Description of the Line Item e.g. `labor for new swimming pool`
  - `editable`: boolean - Whether the Line Item is editable e.g. `true`
  - `event_id`: integer - The ID of the associated Change Event e.g. `123`
  - `event_number`: string - The number of the associated Change Event e.g. `A056`
  - `event_title`: string - The title of the associated Change Event e.g. `Big Change`
  - `id`: integer - The ID of the Line Item e.g. `3456`
  - `item_type`: string - The type of the Line Item e.g. `Event Line`
  - `latest_cost_values`: object
    - `amount`: string - Latest cost amount e.g. `76.25`
    - `amount_project_currency`: string - Latest cost amount in project currency e.g. `76.25`
    - `calculation_strategy`: string enum[automatic, manual] - Latest cost calculation strategy e.g. `manual`
    - `quantity`: string - Latest cost quantity e.g. `2.5`
    - `unit_cost`: string - Latest unit cost e.g. `30.5`
    - `unit_cost_project_currency`: string - Latest unit cost in project currency e.g. `30.5`
    - `unit_of_measure`: string - The unit of measure used e.g. `hours`
  - `latest_revenue_values`: object
    - `amount`: string - Latest revenue amount e.g. `76.25`
    - `amount_project_currency`: string - Latest revenue amount in project currency e.g. `76.25`
    - `calculation_strategy`: string enum[automatic, manual] - Latest revenue calculation strategy e.g. `manual`
    - `quantity`: string - Latest revenue quantity e.g. `2.5`
    - `unit_cost`: string - Latest revenue unit cost e.g. `30.5`
    - `unit_cost_project_currency`: string - Latest revenue unit cost in project currency e.g. `30.5`
  - `line_aging`: integer - Number of days since Change Event Line Item was added to Change Event and until the time the Change Event closed (or until today) e.g. `1`
  - `notes`: object - After successful update independent actions may be executed. For example: sync WBS code. The failures of those actions will be aggregated under attribute :notes and will not result in a Failure. e.g. `{ "5": { "message": "Affected Change Event Line Item #5", "children": [ { "me...`
  - `revenue_impact`: object
    - `estimate`: object
    - `change_order`: object
    - `change_order_package`: object
    - `source_of_latest_price`: string enum[change_order, estimate] - Latest price source e.g. `estimate`
    - `source_of_revenue_rom`: string enum[automatic, latest_cost, manual, no_revenue_expected] - Revenue ROM source e.g. `no_revenue_expected`
    - `source_of_stage`: string enum[estimate, change_order, change_order_package] - Source of the stage e.g. `estimate`
  - `source`: string enum[change_event, budget_change, field_initiated_change_orders] - Source of Change Item e.g. `change_event`
  - `updated_at`: string(date-time) - Timestamp of when the Change Event Line Item was updated e.g. `2024-10-23T21:39:40Z`
- `markup_items`: array of object - markup items
  - `id`: string - markup item ID e.g. `10-11-12-13`
  - `event_id`: integer - markup item's change event id e.g. `1`
  - `item_type`: string - item type e.g. `Markup`
  - `wbs_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `1`
    - `flat_code`: string - wbs code flat code e.g. `O.01-511`
    - `description`: string - wbs code description e.g. `Earthwork.Materials`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `revenue`: object - markup item revenue summary
    - `estimate_amount`: string - estimated amount e.g. `5.00`
    - `change_order_amount`: string - prime potential change order line items amount e.g. `3.00`
    - `latest_price_amount`: string - latest price e.g. `2.00`
- `production_quantities`: array of object - change event related production quantities
  - `id`: integer - production quantity id e.g. `1`
  - `event_id`: integer - production quantity event id e.g. `12`
  - `item_type`: string - item type e.g. `Production`
  - `estimate`: object - production quantity estimate
    - `quantity`: string - production quantity quantity e.g. `2.00`
    - `unit_of_measure`: string - production quantity unit of measure e.g. `hours`
  - `production_code`: object - production quantity cost code and if enabled sub job data
    - `cost_code`: object - cost code data
    - `sub_job`: object - cost code related sub job data in case when cost code biller is subjob
    - `wbs_code`: object - Item's associated Budget Code
  - `budget_change`: object - budget change
    - `id`: integer - budget change id e.g. `125132`
    - `number`: integer - budget change number e.g. `123`
    - `title`: string - title e.g. `Big Budget Change`
    - `description`: string - budget change description e.g. `Big Budget Change description`
    - `status`: string - budget change status e.g. `draft`
    - `production_quantity`: object - production quantity
  - `disabled_fields`: array of string - array of disabled fields for production quantities
  - `prime_change_order`: object - prime contract change order data
    - `id`: integer - Prime PCO id e.g. `125132`
    - `type`: string enum[potential_change_order, change_order_package] - type of change order e.g. `potential_change_order`
    - `number`: integer - Prime PCO number e.g. `123`
    - `title`: string - title e.g. `Big Prime PCO`
    - `description`: string - Prime PCO description e.g. `Some Prime PCO description`
    - `status`: string - Prime PCO status e.g. `draft`
    - `contract_id`: integer - Prime Contract ID e.g. `123`
    - `production_quantity`: object - production quantity
- `notes`: object - The failures of independent actions will be aggregated under the attribute and will not result in a Failure. For example: sync WBS code. e.g. `{ "5": { "message": "Affected Change Event Line Item #5", "children": [ { "me...`
- `currency_configuration`: object - currency configuration information
  - `currency_iso_code`: string - currency ISO code e.g. `USD`
- `source`: string enum[budget_change, field_initiated_change_orders] - The Change Event source refers to the resource that was responsible for creating this Change Event. e.g. `budget_change`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PUT /rest/v1.1/change_events/{id}/restore

**Restore Change Event**
Restores a Previously Deleted Change Event

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `43453`
- `number`: string - number e.g. `A056`
- `title`: string - title e.g. `Big Change`
- `description`: string - description e.g. `Additional concrete work for parking garage`
- `scope`: string - scope e.g. `tbd`
- `created_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `comments_enabled`: boolean - Comments Enabled e.g. `true`
- `deletable`: boolean e.g. `true`
- `in_recycle_bin`: boolean e.g. `false`
- `project_id`: integer - unique identifier for the project e.g. `60`
- `company_id`: integer - unique identifier for the company e.g. `39`
- `status`: object
  - `id`: integer - ID e.g. `1234`
  - `name`: string - name e.g. `open`
  - `mapped_to_status`: string - mapped_to_status e.g. `open`
- `event_origin`: object
  - `origin_id`: integer - ID e.g. `1234`
  - `origin_type`: string - type of object this change event originated from e.g. `Rfi::Header`
  - `display_name`: string - name of event origin used for view e.g. `RFI #91: Drawings Missing`
  - `web_page_url`: string - web page of event origin e.g. `/1/project/rfi/show/1`
- `change_type`: object
  - `id`: integer - ID e.g. `5`
  - `name`: string - name e.g. `Transfer`
  - `abbreviation`: string - abbreviation e.g. `TR`
- `change_reason`: object
  - `id`: integer - ID e.g. `3465`
  - `change_reason`: string - The reason for a change e.g. `Allowance`
- `prime_contract_for_estimates`: object
  - `id`: integer - ID e.g. `1122`
  - `number`: string - contract number e.g. `123`
  - `name`: string - name of contract e.g. `ACME Prime Contract`
- `attachments`: array of object
  - `id`: integer - ID e.g. `3456`
  - `url`: string - Remote Url for attached file e.g. `https://www.storage.com/files/contract.pdf`
  - `filename`: string - Filename e.g. `contract.pdf`
- `external_data`: object
  - `origin_id`: string - The Origin ID of the Change Event e.g. `654987123`
  - `origin_data`: string - The Origin Data of the Change Event e.g. `OD-123654789`
- `created_by`: object
  - `id`: integer - ID e.g. `987`
  - `login`: string - email address of Change Event creator e.g. `carl-contractor@example.com`
  - `name`: string - first and last name of Change Event creator e.g. `Carl Contractor`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `string`
    - `value`: string - The value of the custom field e.g. `custom field value`
    - `variant`: string - The variant of the Custom Field Definition (e.g. `phone_number`). Present only when the definition has an associated variant. e.g. `phone_number`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `decimal`
    - `value`: number - The value of the custom field e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `boolean`
    - `value`: boolean - The value of the custom field e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `lov_entry`
    - `value`: object
    - `variant`: string - The variant of the Custom Field Definition (e.g. `project_directory`). Present only when the definition has an associated variant. e.g. `with_code`
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `lov_entries`
    - `value`: array of object
- `change_items`: array of object
  - `budget_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `1`
    - `flat_code`: string - wbs code flat code e.g. `O.01-511`
    - `description`: string - wbs code description e.g. `Earthwork.Materials`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `budget_impact`: object
    - `budget_change`: object
    - `budget_modification`: object
    - `estimate`: object
    - `source_of_latest_budget_impact`: string enum[budget_change, estimate] - Source of latest budget impact e.g. `budget_change`
    - `source_of_stage`: string enum[estimate, budget_change] - The source of the stage
    - `source_of_budget_rom`: string enum[automatic, manual, quantity_by_unit_cost] - Source of budget ROM e.g. `automatic`
  - `cost_impact`: object
    - `change_order_package`: object
    - `commitment`: object
    - `contract`: object
    - `estimate`: object
    - `non_commitment`: object
    - `request_for_quote`: object - Request for Quote data if any present, can be null
    - `source_of_latest_cost`: string enum[commitment, estimate, latest_quote, non_commitment] - Source of latest cost e.g. `commitment`
    - `source_of_stage`: string enum[estimate, non-commitment, commitment, change_order_package, latest_quote] - Source of stage e.g. `estimate`
    - `vendor`: object
  - `created_at`: string(date-time) - Timestamp of when the Change Event Line Item was created e.g. `2024-10-23T21:39:40Z`
  - `currency_configuration`: object - Currency configuration information
    - `currency_iso_code`: string - currency ISO code e.g. `USD`
  - `deletable`: boolean - Whether the Line Item is deletable e.g. `false`
  - `deleted_at`: string(date-time) - Timestamp of when the Line Item was deleted e.g. `2024-10-23T21:39:40Z`
  - `description`: string - Description of the Line Item e.g. `labor for new swimming pool`
  - `editable`: boolean - Whether the Line Item is editable e.g. `true`
  - `event_id`: integer - The ID of the associated Change Event e.g. `123`
  - `event_number`: string - The number of the associated Change Event e.g. `A056`
  - `event_title`: string - The title of the associated Change Event e.g. `Big Change`
  - `id`: integer - The ID of the Line Item e.g. `3456`
  - `item_type`: string - The type of the Line Item e.g. `Event Line`
  - `latest_cost_values`: object
    - `amount`: string - Latest cost amount e.g. `76.25`
    - `amount_project_currency`: string - Latest cost amount in project currency e.g. `76.25`
    - `calculation_strategy`: string enum[automatic, manual] - Latest cost calculation strategy e.g. `manual`
    - `quantity`: string - Latest cost quantity e.g. `2.5`
    - `unit_cost`: string - Latest unit cost e.g. `30.5`
    - `unit_cost_project_currency`: string - Latest unit cost in project currency e.g. `30.5`
    - `unit_of_measure`: string - The unit of measure used e.g. `hours`
  - `latest_revenue_values`: object
    - `amount`: string - Latest revenue amount e.g. `76.25`
    - `amount_project_currency`: string - Latest revenue amount in project currency e.g. `76.25`
    - `calculation_strategy`: string enum[automatic, manual] - Latest revenue calculation strategy e.g. `manual`
    - `quantity`: string - Latest revenue quantity e.g. `2.5`
    - `unit_cost`: string - Latest revenue unit cost e.g. `30.5`
    - `unit_cost_project_currency`: string - Latest revenue unit cost in project currency e.g. `30.5`
  - `line_aging`: integer - Number of days since Change Event Line Item was added to Change Event and until the time the Change Event closed (or until today) e.g. `1`
  - `notes`: object - After successful update independent actions may be executed. For example: sync WBS code. The failures of those actions will be aggregated under attribute :notes and will not result in a Failure. e.g. `{ "5": { "message": "Affected Change Event Line Item #5", "children": [ { "me...`
  - `revenue_impact`: object
    - `estimate`: object
    - `change_order`: object
    - `change_order_package`: object
    - `source_of_latest_price`: string enum[change_order, estimate] - Latest price source e.g. `estimate`
    - `source_of_revenue_rom`: string enum[automatic, latest_cost, manual, no_revenue_expected] - Revenue ROM source e.g. `no_revenue_expected`
    - `source_of_stage`: string enum[estimate, change_order, change_order_package] - Source of the stage e.g. `estimate`
  - `source`: string enum[change_event, budget_change, field_initiated_change_orders] - Source of Change Item e.g. `change_event`
  - `updated_at`: string(date-time) - Timestamp of when the Change Event Line Item was updated e.g. `2024-10-23T21:39:40Z`
- `markup_items`: array of object - markup items
  - `id`: string - markup item ID e.g. `10-11-12-13`
  - `event_id`: integer - markup item's change event id e.g. `1`
  - `item_type`: string - item type e.g. `Markup`
  - `wbs_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `1`
    - `flat_code`: string - wbs code flat code e.g. `O.01-511`
    - `description`: string - wbs code description e.g. `Earthwork.Materials`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `revenue`: object - markup item revenue summary
    - `estimate_amount`: string - estimated amount e.g. `5.00`
    - `change_order_amount`: string - prime potential change order line items amount e.g. `3.00`
    - `latest_price_amount`: string - latest price e.g. `2.00`
- `production_quantities`: array of object - change event related production quantities
  - `id`: integer - production quantity id e.g. `1`
  - `event_id`: integer - production quantity event id e.g. `12`
  - `item_type`: string - item type e.g. `Production`
  - `estimate`: object - production quantity estimate
    - `quantity`: string - production quantity quantity e.g. `2.00`
    - `unit_of_measure`: string - production quantity unit of measure e.g. `hours`
  - `production_code`: object - production quantity cost code and if enabled sub job data
    - `cost_code`: object - cost code data
    - `sub_job`: object - cost code related sub job data in case when cost code biller is subjob
    - `wbs_code`: object - Item's associated Budget Code
  - `budget_change`: object - budget change
    - `id`: integer - budget change id e.g. `125132`
    - `number`: integer - budget change number e.g. `123`
    - `title`: string - title e.g. `Big Budget Change`
    - `description`: string - budget change description e.g. `Big Budget Change description`
    - `status`: string - budget change status e.g. `draft`
    - `production_quantity`: object - production quantity
  - `disabled_fields`: array of string - array of disabled fields for production quantities
  - `prime_change_order`: object - prime contract change order data
    - `id`: integer - Prime PCO id e.g. `125132`
    - `type`: string enum[potential_change_order, change_order_package] - type of change order e.g. `potential_change_order`
    - `number`: integer - Prime PCO number e.g. `123`
    - `title`: string - title e.g. `Big Prime PCO`
    - `description`: string - Prime PCO description e.g. `Some Prime PCO description`
    - `status`: string - Prime PCO status e.g. `draft`
    - `contract_id`: integer - Prime Contract ID e.g. `123`
    - `production_quantity`: object - production quantity
- `notes`: object - The failures of independent actions will be aggregated under the attribute and will not result in a Failure. For example: sync WBS code. e.g. `{ "5": { "message": "Affected Change Event Line Item #5", "children": [ { "me...`
- `currency_configuration`: object - currency configuration information
  - `currency_iso_code`: string - currency ISO code e.g. `USD`
- `source`: string enum[budget_change, field_initiated_change_orders] - The Change Event source refers to the resource that was responsible for creating this Change Event. e.g. `budget_change`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/change_events/{id}/clone

**Clone Change Event**
Clones an existing Change Event

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `43453`
- `number`: string - number e.g. `A056`
- `title`: string - title e.g. `Big Change`
- `description`: string - description e.g. `Additional concrete work for parking garage`
- `scope`: string - scope e.g. `tbd`
- `created_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `comments_enabled`: boolean - Comments Enabled e.g. `true`
- `deletable`: boolean e.g. `true`
- `in_recycle_bin`: boolean e.g. `false`
- `project_id`: integer - unique identifier for the project e.g. `60`
- `company_id`: integer - unique identifier for the company e.g. `39`
- `status`: object
  - `id`: integer - ID e.g. `1234`
  - `name`: string - name e.g. `open`
  - `mapped_to_status`: string - mapped_to_status e.g. `open`
- `event_origin`: object
  - `origin_id`: integer - ID e.g. `1234`
  - `origin_type`: string - type of object this change event originated from e.g. `Rfi::Header`
  - `display_name`: string - name of event origin used for view e.g. `RFI #91: Drawings Missing`
  - `web_page_url`: string - web page of event origin e.g. `/1/project/rfi/show/1`
- `change_type`: object
  - `id`: integer - ID e.g. `5`
  - `name`: string - name e.g. `Transfer`
  - `abbreviation`: string - abbreviation e.g. `TR`
- `change_reason`: object
  - `id`: integer - ID e.g. `3465`
  - `change_reason`: string - The reason for a change e.g. `Allowance`
- `prime_contract_for_estimates`: object
  - `id`: integer - ID e.g. `1122`
  - `number`: string - contract number e.g. `123`
  - `name`: string - name of contract e.g. `ACME Prime Contract`
- `attachments`: array of object
  - `id`: integer - ID e.g. `3456`
  - `url`: string - Remote Url for attached file e.g. `https://www.storage.com/files/contract.pdf`
  - `filename`: string - Filename e.g. `contract.pdf`
- `external_data`: object
  - `origin_id`: string - The Origin ID of the Change Event e.g. `654987123`
  - `origin_data`: string - The Origin Data of the Change Event e.g. `OD-123654789`
- `created_by`: object
  - `id`: integer - ID e.g. `987`
  - `login`: string - email address of Change Event creator e.g. `carl-contractor@example.com`
  - `name`: string - first and last name of Change Event creator e.g. `Carl Contractor`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `string`
    - `value`: string - The value of the custom field e.g. `custom field value`
    - `variant`: string - The variant of the Custom Field Definition (e.g. `phone_number`). Present only when the definition has an associated variant. e.g. `phone_number`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `decimal`
    - `value`: number - The value of the custom field e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `boolean`
    - `value`: boolean - The value of the custom field e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `lov_entry`
    - `value`: object
    - `variant`: string - The variant of the Custom Field Definition (e.g. `project_directory`). Present only when the definition has an associated variant. e.g. `with_code`
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `lov_entries`
    - `value`: array of object
- `change_items`: array of object
  - `budget_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `1`
    - `flat_code`: string - wbs code flat code e.g. `O.01-511`
    - `description`: string - wbs code description e.g. `Earthwork.Materials`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `budget_impact`: object
    - `budget_change`: object
    - `budget_modification`: object
    - `estimate`: object
    - `source_of_latest_budget_impact`: string enum[budget_change, estimate] - Source of latest budget impact e.g. `budget_change`
    - `source_of_stage`: string enum[estimate, budget_change] - The source of the stage
    - `source_of_budget_rom`: string enum[automatic, manual, quantity_by_unit_cost] - Source of budget ROM e.g. `automatic`
  - `cost_impact`: object
    - `change_order_package`: object
    - `commitment`: object
    - `contract`: object
    - `estimate`: object
    - `non_commitment`: object
    - `request_for_quote`: object - Request for Quote data if any present, can be null
    - `source_of_latest_cost`: string enum[commitment, estimate, latest_quote, non_commitment] - Source of latest cost e.g. `commitment`
    - `source_of_stage`: string enum[estimate, non-commitment, commitment, change_order_package, latest_quote] - Source of stage e.g. `estimate`
    - `vendor`: object
  - `created_at`: string(date-time) - Timestamp of when the Change Event Line Item was created e.g. `2024-10-23T21:39:40Z`
  - `currency_configuration`: object - Currency configuration information
    - `currency_iso_code`: string - currency ISO code e.g. `USD`
  - `deletable`: boolean - Whether the Line Item is deletable e.g. `false`
  - `deleted_at`: string(date-time) - Timestamp of when the Line Item was deleted e.g. `2024-10-23T21:39:40Z`
  - `description`: string - Description of the Line Item e.g. `labor for new swimming pool`
  - `editable`: boolean - Whether the Line Item is editable e.g. `true`
  - `event_id`: integer - The ID of the associated Change Event e.g. `123`
  - `event_number`: string - The number of the associated Change Event e.g. `A056`
  - `event_title`: string - The title of the associated Change Event e.g. `Big Change`
  - `id`: integer - The ID of the Line Item e.g. `3456`
  - `item_type`: string - The type of the Line Item e.g. `Event Line`
  - `latest_cost_values`: object
    - `amount`: string - Latest cost amount e.g. `76.25`
    - `amount_project_currency`: string - Latest cost amount in project currency e.g. `76.25`
    - `calculation_strategy`: string enum[automatic, manual] - Latest cost calculation strategy e.g. `manual`
    - `quantity`: string - Latest cost quantity e.g. `2.5`
    - `unit_cost`: string - Latest unit cost e.g. `30.5`
    - `unit_cost_project_currency`: string - Latest unit cost in project currency e.g. `30.5`
    - `unit_of_measure`: string - The unit of measure used e.g. `hours`
  - `latest_revenue_values`: object
    - `amount`: string - Latest revenue amount e.g. `76.25`
    - `amount_project_currency`: string - Latest revenue amount in project currency e.g. `76.25`
    - `calculation_strategy`: string enum[automatic, manual] - Latest revenue calculation strategy e.g. `manual`
    - `quantity`: string - Latest revenue quantity e.g. `2.5`
    - `unit_cost`: string - Latest revenue unit cost e.g. `30.5`
    - `unit_cost_project_currency`: string - Latest revenue unit cost in project currency e.g. `30.5`
  - `line_aging`: integer - Number of days since Change Event Line Item was added to Change Event and until the time the Change Event closed (or until today) e.g. `1`
  - `notes`: object - After successful update independent actions may be executed. For example: sync WBS code. The failures of those actions will be aggregated under attribute :notes and will not result in a Failure. e.g. `{ "5": { "message": "Affected Change Event Line Item #5", "children": [ { "me...`
  - `revenue_impact`: object
    - `estimate`: object
    - `change_order`: object
    - `change_order_package`: object
    - `source_of_latest_price`: string enum[change_order, estimate] - Latest price source e.g. `estimate`
    - `source_of_revenue_rom`: string enum[automatic, latest_cost, manual, no_revenue_expected] - Revenue ROM source e.g. `no_revenue_expected`
    - `source_of_stage`: string enum[estimate, change_order, change_order_package] - Source of the stage e.g. `estimate`
  - `source`: string enum[change_event, budget_change, field_initiated_change_orders] - Source of Change Item e.g. `change_event`
  - `updated_at`: string(date-time) - Timestamp of when the Change Event Line Item was updated e.g. `2024-10-23T21:39:40Z`
- `markup_items`: array of object - markup items
  - `id`: string - markup item ID e.g. `10-11-12-13`
  - `event_id`: integer - markup item's change event id e.g. `1`
  - `item_type`: string - item type e.g. `Markup`
  - `wbs_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `1`
    - `flat_code`: string - wbs code flat code e.g. `O.01-511`
    - `description`: string - wbs code description e.g. `Earthwork.Materials`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `revenue`: object - markup item revenue summary
    - `estimate_amount`: string - estimated amount e.g. `5.00`
    - `change_order_amount`: string - prime potential change order line items amount e.g. `3.00`
    - `latest_price_amount`: string - latest price e.g. `2.00`
- `production_quantities`: array of object - change event related production quantities
  - `id`: integer - production quantity id e.g. `1`
  - `event_id`: integer - production quantity event id e.g. `12`
  - `item_type`: string - item type e.g. `Production`
  - `estimate`: object - production quantity estimate
    - `quantity`: string - production quantity quantity e.g. `2.00`
    - `unit_of_measure`: string - production quantity unit of measure e.g. `hours`
  - `production_code`: object - production quantity cost code and if enabled sub job data
    - `cost_code`: object - cost code data
    - `sub_job`: object - cost code related sub job data in case when cost code biller is subjob
    - `wbs_code`: object - Item's associated Budget Code
  - `budget_change`: object - budget change
    - `id`: integer - budget change id e.g. `125132`
    - `number`: integer - budget change number e.g. `123`
    - `title`: string - title e.g. `Big Budget Change`
    - `description`: string - budget change description e.g. `Big Budget Change description`
    - `status`: string - budget change status e.g. `draft`
    - `production_quantity`: object - production quantity
  - `disabled_fields`: array of string - array of disabled fields for production quantities
  - `prime_change_order`: object - prime contract change order data
    - `id`: integer - Prime PCO id e.g. `125132`
    - `type`: string enum[potential_change_order, change_order_package] - type of change order e.g. `potential_change_order`
    - `number`: integer - Prime PCO number e.g. `123`
    - `title`: string - title e.g. `Big Prime PCO`
    - `description`: string - Prime PCO description e.g. `Some Prime PCO description`
    - `status`: string - Prime PCO status e.g. `draft`
    - `contract_id`: integer - Prime Contract ID e.g. `123`
    - `production_quantity`: object - production quantity
- `notes`: object - The failures of independent actions will be aggregated under the attribute and will not result in a Failure. For example: sync WBS code. e.g. `{ "5": { "message": "Affected Change Event Line Item #5", "children": [ { "me...`
- `currency_configuration`: object - currency configuration information
  - `currency_iso_code`: string - currency ISO code e.g. `USD`
- `source`: string enum[budget_change, field_initiated_change_orders] - The Change Event source refers to the resource that was responsible for creating this Change Event. e.g. `budget_change`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/change_events/new

**Show new Change Event**
Show default attributes for a Change Event.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `selected_origin_id` [query] string - Global ID determines Event Origin of the entity

Response 200 (application/json): object

- `company_id`: integer - Company ID e.g. `43453`
- `project_id`: integer - Project ID e.g. `9123`
- `number`: string - next number scoped by project e.g. `A056`
- `scope`: string - default scope e.g. `tbd`
- `status`: object
  - `id`: integer - ID e.g. `1234`
- `event_origin`: object
  - `origin_id`: integer - ID e.g. `1234`
  - `origin_type`: string - type of object this change event originated from e.g. `Rfi::Header`
- `change_type`: object
  - `id`: integer - ID e.g. `5`
- `prime_contract_for_estimates`: object
  - `id`: integer - ID e.g. `1122`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/change_events  **[OLDER VERSION - a newer path version exists below/above]**

**List Change Events**
List Change Events for a specified Project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[change_event_status_id][]` [query] array of integer - Return item(s) with the specified Change Event Status ID(s).
- `filters[change_order_change_reason_id][]` [query] array of integer - Return item(s) with the specified Change Reason ID(s).
- `filters[change_type_id][]` [query] array of integer - Return item(s) with the specified Change Type ID(s).
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[include_deleted]` [query] string enum[only, with] - Use 'only' for only deleted resources. Use 'with' for deleted and undeleted resources.
- `filters[origin_type][]` [query] array of string enum[CommunicationThread, GenericToolItem, Meeting, Observations::Item, Rfi::Header, SiteInstruction] - Return item(s) with the specified origin type(s). Valid values are `Observations::Item`, `Rfi::Header`, `Meeting`, `SiteInstruction`, `CommunicationThread`, and `GenericToolItem`.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `include_rfqs` [query] boolean - Determines whether to include RFQs in the response. If it's true, or left off, RFQs will be shown in the response. If it is false, RFQs will not be shown.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the Change Event. Use as the {id} path parameter for GET/PATCH /rest/v1.0/change_events/{id}. e.g. `43453`
- `number`: integer - Number with alpha characters stripped out e.g. `14`
- `alphanumeric_number`: string - Number including alpha characters e.g. `A14`
- `origin_data`: string - Origin data e.g. `OD-123654789`
- `origin_id`: string - Origin ID e.g. `654987123`
- `title`: string - Human-readable title summarizing the Change Event. e.g. `Bathtub replacement`
- `description`: string - Detailed description of the work or reason for the Change Event. e.g. `Replace the bathtub in the bathroom`
- `status`: string - Name of the Change Event's current status, lowercased (e.g. 'pending - revised'). e.g. `pending - revised`
- `project_id`: integer - Unique identifier for the project. e.g. `23446`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `event_type`: string - Display name of the Change Event's Change Type (e.g. 'TBD', 'Owner Change'). e.g. `TBD`
- `event_scope`: string enum[tbd, in_scope, out_of_scope] - Scope classification indicating whether the Change Event is in scope, out of scope, or still to be determined. e.g. `in_scope`
- `change_event_origin_id`: integer - ID of the source record this Change Event originated from. Paired with change_event_origin_type. e.g. `34523`
- `change_event_origin_type`: string - Type of the source record this Change Event originated from (e.g. Rfi::Header, GenericToolItem). e.g. `Rfi::Header`
- `rfi`: object
  - `id`: integer - ID e.g. `34523`
  - `title`: string - Title e.g. `Electrical panel obstructed`
  - `number`: integer - Number e.g. `3`
  - `full_number`: string - RFI Number including the prefix stage if exists e.g. `pre-3`
  - `full_number_with_revision`: string - RFI Number including the prefix stage and revision number if exists e.g. `pre-3 (Revision 4)`
  - `due_date`: string(date-time) - Due date e.g. `2016-11-23T21:39:40Z`
  - `status`: string - Status e.g. `draft`
  - `revision`: string - Revision Number e.g. `3`
- `change_event_line_items`: array of object
  - `id`: integer - ID e.g. `345236`
  - `biller`: object
    - `id`: integer - Biller ID e.g. `115513`
    - `name`: string - Biller Name e.g. `Eemer Oakland`
    - `model_name`: string - Biller Model Name e.g. `Project`
    - `guid`: string - Biller GUID e.g. `Z2lkOi8vcHJvY29yZS9Qcm9qZWN0LzE`
  - `biller_guid`: string - Biller GUID e.g. `Z2lkOi8vcHJvY29yZS9Qcm9qZWN0LzE`
  - `budget_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `1`
    - `flat_code`: string - wbs code flat code e.g. `O.01-511`
    - `description`: string - wbs code description e.g. `Earthwork.Materials`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `budget_mod`: object - Budget Modification
    - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
    - `transfer_amount`: string(float) - Amount transfered from the source Budget Line Item to the Target Budget Line Item e.g. `4500.0`
    - `notes`: string - Notes describing the modification e.g. `Transfer money for extra concrete.`
    - `from_budget_line_item_id`: integer - Source line item id e.g. `348383`
    - `to_budget_line_item_id`: integer - Target line item id e.g. `4034034`
    - `from_budget_line_item_name`: string - Source line item name e.g. `Source Line Item`
    - `to_budget_line_item_name`: string - Target line item name e.g. `Target Line Item`
  - `budget_mod_amount`: string - Budget Modification Amount e.g. `0`
  - `commitment_contract_cost`: string - Commitment Contract Cost e.g. `155524.00`
  - `commitment_pco_cost`: string - Commitment PCO Cost e.g. `0.0`
  - `contract`: object
    - `id`: integer - Contract ID e.g. `853215`
    - `number`: string - Contract Number e.g. `001`
    - `title`: string - Contract Title e.g. `PO--001`
    - `name`: string - Contract Name e.g. `PO--001`
  - `cost_code`: oneOf(object | object)
  - `cost_code_biller_name`: string - Cost Code Biller name e.g. `Eemer Oakland`
  - `cost_code_id`: integer - Cost Code ID e.g. `12345`
  - `cost_code_is_budgeted`: boolean - Cost Code is budgeted e.g. `true`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `currency_configuration`: object - currency configuration information
    - `currency_iso_code`: string - currency ISO code e.g. `USD`
  - `deletable`: boolean - Deletable status e.g. `false`
  - `description`: string - Description e.g. `Add caulk to bathtub base`
  - `editable`: boolean - Editable status e.g. `false`
  - `estimated_cost_amount`: string - Estimated Cost Amount e.g. `13531.0`
  - `estimated_cost_calculation_strategy`: string - Estimated Cost Calculation Strategy controls whether estimated_cost_amount is calculated by multiplying the quantity and unit_cost attributes or set manually to a provided value. e.g. `manual`
  - `estimated_cost_quantity`: number(float) - Estimated Cost Quantity e.g. `125.5`
  - `estimated_cost_unit_cost`: number(float) - Estimated Cost Unit Cost e.g. `75.5`
  - `event_id`: integer - Change Event ID e.g. `151512`
  - `line_item_type`: object - Line Item Type
    - `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
    - `name`: string - Name for the Line Item Type e.g. `Equipment`
    - `code`: string - Code for the Line Item Type e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
    - `origin_data`: string - Origin data e.g. `OD-2398273424`
    - `origin_id`: string - Origin ID e.g. `ABC123`
  - `line_item_type_id`: integer - Line Item Type ID e.g. `12345`
  - `links`: object
    - `edit`: string - Edit link e.g. `https://app.procore.com/1513513/project/change_events/events/151512/edit?celi...`
    - `view`: string - View link e.g. `https://app.procore.com/1513513/project/change_events/events/151512?celi_id=3...`
    - `contract`: string - Contract link e.g. `https://app.procore.com/1513513/project/commitments/purchase_order_contracts/...`
    - `commitment_contract_cost`: string - Commitment Contract cost link e.g. `https://app.procore.com/1513513/project/commitments/purchase_order_contracts/...`
    - `commitment_pco_cost`: string - Commitment PCO cost link e.g. `https://app.procore.com/1513513/project/commitments/purchase_order_contracts/...`
    - `rfq_amount`: string - RFQ amount link e.g. `https://app.procore.com/1513513/project/commitments/purchase_order_contracts/...`
    - `rom`: string - ROM link e.g. `https://app.procore.com/1513513/project/change_events/events/639?celi_id=456#456`
    - `prime_pco_cost`: string - Prime PCO cost link e.g. `https://app.procore.com/1513513/project/prime_contract/change_orders/potentia...`
  - `number`: string - Number e.g. `428`
  - `prime_pco_cost`: string(float) - Prime PCO Cost e.g. `0.0`
  - `proposed_contract_id`: integer - Proposed Contract ID e.g. `4`
  - `proposed_vendor_id`: integer - Proposed Vendor ID e.g. `5`
  - `request_for_quote_id`: integer - Request For Quote ID e.g. `12345`
  - `rfq_amount`: string(float) - Request RFQ Amount e.g. `1111.00`
  - `rfq_sent`: string - RFQ status e.g. `Out for Pricing`
  - `rom`: integer - Rough order of magnitude (ROM) e.g. `17705`
  - `status`: string - Status e.g. `Change Event Status 1`
  - `statuses`: object
    - `contract`: string - Contract status e.g. `Approved`
    - `commitment_contract_cost`: string - Commitment Contract Cost status e.g. `Draft`
    - `commitment_contract_tooltip`: string - Commitment Contract tooltip e.g. `PO--001: (no title), Approved`
    - `commitment_pco_cost`: string - Commitment PCO cost status e.g. `Draft`
    - `commitment_pco_tooltip`: string - Commitment PCO tooltip e.g. `PCO #001: CE #400 - CE 400, Draft`
    - `rfq_amount`: string - RFQ Amount status e.g. `Out for Pricing`
    - `rfq_tooltip`: string - RFQ tooltip e.g. `RFQ #002: CE #429 - RFI 111, Out for Pricing`
    - `prime_pco_cost`: string - Prime PCO Cost status e.g. `Draft`
    - `prime_pco_tooltip`: string - Prime PCO tooltip e.g. `PCO #001: CE #428 - RFI 111, Draft`
  - `title`: string - Title e.g. `CE #429 - RFI 111`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
  - `uom`: string - Unit of Measure e.g. `hours`
  - `vendor`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
- `change_order_change_reason`: object
  - `id`: integer - ID e.g. `3452`
  - `company_id`: integer - Company ID e.g. `2342`
  - `change_reason`: string - Reason for change e.g. `Allowance`
  - `show_in_select`: boolean - Show in select e.g. `true`
- `change_event_status`: object
  - `id`: integer - ID e.g. `29715`
  - `name`: string - Name e.g. `Pending - Revised`
  - `mapped_to_status`: string - Internal status to which the Change Event Status maps e.g. `pending`
  - `show_in_select`: boolean - Whether Change Event is available for GUI selection e.g. `true`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `rfqs`: array of object - Return a list of all Request for Quotes (RFQs) to a specific change event in a project. **NOTE:** If you see `[]`, you might not have permissions to see RFQs for Change Events.
  - `id`: integer - ID e.g. `1199`
  - `commitment_contract_id`: integer - Commitment Contract ID e.g. `418232`
  - `created_at`: string(date-time) - Created at e.g. `2016-06-30T20:41:58Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2016-08-30T18:11:43Z`
  - `description`: string - Description e.g. `Please see attached documentation for Bulletin 3 and provide pricing within 1...`
  - `due_date`: string(date) - Due date e.g. `2016-10-13`
  - `estimated_amount`: number(float) - Estimated amount e.g. `4302.0`
  - `estimated_schedule_impact`: integer - Estimated schedule impact in days e.g. `2`
  - `estimated_status`: string enum[rom, final] - Estimated status e.g. `rom`
  - `intent_to_quote`: boolean - Intent to quote status e.g. `false`
  - `number`: string - Number e.g. `013`
  - `original_quote`: number(float) - Original quote e.g. `4500.0`
  - `position`: integer - Position e.g. `13`
  - `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
  - `prostore_file_ids`: array of integer - Prostore File IDs e.g. `[3423484, 6983730, 2736492]`
  - `status`: string enum[out_for_pricing, revise_and_resubmit, under_review, pending_final_approval, closed, withdrawn] - Status e.g. `under_review`
  - `title`: string - Title e.g. `Field Bulletin #3 - Steel staircase on roof`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-08-30T18:11:43Z`
  - `specification_section`: object - Specification Section
    - `specification_section_id`: integer - ID e.g. `32379`
    - `spec_section_description`: string - Description e.g. `Steel Structure`
    - `spec_section_number`: string - Number e.g. `236400`
  - `quotes`: array of object - Quotes
    - `id`: integer - ID e.g. `105445`
    - `commitment_quote_number`: string - Commitment quote number e.g. `2234`
    - `cost`: number(float) - Cost e.g. `4500.0`
    - `schedule_impact`: integer - Schedule impact e.g. `2`
    - `description`: string - Description e.g. `Need to destroy some of the roofing to install this staircase.`
    - `request_for_quote_id`: integer - RFQ ID e.g. `136264`
    - `attachments_count`: integer - Attachments count e.g. `1`
    - `import_origin_id`: string - Import origin ID e.g. `QWA44H`
    - `created_by_id`: integer - Created by ID — DEPRECATED, please use "created_by" instead e.g. `5136213`
    - `created_at`: string(date-time) - Created at e.g. `2016-10-21T21:39:41Z`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2016-10-23T21:44:45Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2016-10-22T21:41:42Z`
    - `prostore_file_ids`: array of integer - Array of prostore file ids e.g. `[2334, 776843, 22456]`
    - `created_by`: object
  - `responses`: array of object - Responses
    - `id`: integer - ID e.g. `105`
    - `comment`: string - Comment in response to the latest quote e.g. `This quote needs to be revised. See attached files.`
    - `created_at`: string(date-time) - Created at e.g. `2016-10-22T21:39:40Z`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2016-10-30T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2016-10-26T21:39:40Z`
    - `prostore_file_ids`: array of integer - Prostore file IDs e.g. `[3453247, 6543893, 3476145]`
    - `created_by`: object
  - `potential_change_orders`: object
    - `id`: integer - Potential change order id e.g. `570623`
    - `created_at`: string(date-time) - Potential change order created at e.g. `2012-10-23T21:39:40Z`
    - `created_by_id`: integer - Potential change order creator id e.g. `12`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2012-11-24T21:39:40Z`
    - `due_date`: string(date) - Potential change order due date e.g. `2012-11-23`
    - `invoiced_date`: string(date) - Potential change order invoiced date e.g. `2012-10-24`
    - `number`: string - Potential change order number e.g. `004`
    - `paid_date`: string(date) - Potential change order paid date e.g. `2012-11-21`
    - `reviewed_at`: string(date-time) - Potential change order reviewed at e.g. `2012-10-23T21:44:40Z`
    - `title`: string - Potential change order title e.g. `Field Bulletin #3 - Steel staircase on roof`
    - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Potential change order status e.g. `approved`
    - `updated_at`: string(date-time) - Potential change order updated at e.g. `2012-11-23T21:39:40Z`
    - `change_order_request_id`: integer - Change Order Request ID e.g. `283764`
    - `executed`: boolean - Executed (or not) e.g. `false`
    - `grand_total`: string - Grand total e.g. `3329738.0`
    - `revision`: integer - Revision e.g. `4`
    - `schedule_impact_amount`: integer - Schedule impact in days e.g. `2`
    - `change_reason`: string - Change reason e.g. `Deleted`
    - `change_order_request_title`: string - Change Order Request Title e.g. `Concrete freezer slab`
    - `change_order_package_title`: string - Change Order Package Title e.g. `Concrete freezer slab`
    - `potential_change_order_acronym_number`: string - If the change order tier is single tier, an empty string. Otherwise, the PCO acronym and number. e.g. `PCO 95`
    - `change_order_request_acronym_number`: string - If the change order tier is single tier or two-tiered, an empty string. Otherwise, the COR acronym and change order request number. e.g. `COR 9001`
    - `change_order_package_acronym_number`: string - The CCO acronym and change order package number. e.g. `CCO 42`
    - `change_order_tiers`: integer - Number of Change Order Tiers e.g. `3`
  - `change_order_packages`: object
    - `id`: integer - ID e.g. `458661`
    - `contract_id`: integer - Contract ID e.g. `64545`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
    - `due_date`: string(date) - Due date e.g. `2012-11-23`
    - `invoiced_date`: string(date) - Invoiced date e.g. `2012-10-24`
    - `number`: string - Number e.g. `002`
    - `origin_data`: string - Origin data e.g. `OD-123654789`
    - `origin_id`: string - Origin ID e.g. `654987123`
    - `paid_date`: string(date) - Paid date e.g. `2012-11-21`
    - `reviewed_at`: string(date-time) - Reviewed at e.g. `2012-11-23T21:39:40Z`
    - `title`: string - Title e.g. `November Changes`
    - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Status e.g. `approved`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-11-23T21:39:40Z`
  - `commitment_potential_change_orders`: object
    - `id`: integer - Potential change order id e.g. `570623`
    - `created_at`: string(date-time) - Potential change order created at e.g. `2012-10-23T21:39:40Z`
    - `created_by_id`: integer - Potential change order creator id e.g. `12`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2012-11-24T21:39:40Z`
    - `due_date`: string(date) - Potential change order due date e.g. `2012-11-23`
    - `invoiced_date`: string(date) - Potential change order invoiced date e.g. `2012-10-24`
    - `number`: string - Potential change order number e.g. `004`
    - `paid_date`: string(date) - Potential change order paid date e.g. `2012-11-21`
    - `reviewed_at`: string(date-time) - Potential change order reviewed at e.g. `2012-10-23T21:44:40Z`
    - `title`: string - Potential change order title e.g. `Field Bulletin #3 - Steel staircase on roof`
    - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Potential change order status e.g. `approved`
    - `updated_at`: string(date-time) - Potential change order updated at e.g. `2012-11-23T21:39:40Z`
    - `change_order_request_id`: integer - Change Order Request ID e.g. `283764`
    - `executed`: boolean - Executed (or not) e.g. `false`
    - `grand_total`: string - Grand total e.g. `3329738.0`
    - `revision`: integer - Revision e.g. `4`
    - `schedule_impact_amount`: integer - Schedule impact in days e.g. `2`
    - `change_reason`: string - Change reason e.g. `Deleted`
    - `change_order_request_title`: string - Change Order Request Title e.g. `Concrete freezer slab`
    - `change_order_package_title`: string - Change Order Package Title e.g. `Concrete freezer slab`
    - `potential_change_order_acronym_number`: string - If the change order tier is single tier, an empty string. Otherwise, the PCO acronym and number. e.g. `PCO 95`
    - `change_order_request_acronym_number`: string - If the change order tier is single tier or two-tiered, an empty string. Otherwise, the COR acronym and change order request number. e.g. `COR 9001`
    - `change_order_package_acronym_number`: string - The CCO acronym and change order package number. e.g. `CCO 42`
    - `change_order_tiers`: integer - Number of Change Order Tiers e.g. `3`
  - `commitment_change_order_packages`: object
    - `id`: integer - ID e.g. `458661`
    - `contract_id`: integer - Contract ID e.g. `64545`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
    - `due_date`: string(date) - Due date e.g. `2012-11-23`
    - `invoiced_date`: string(date) - Invoiced date e.g. `2012-10-24`
    - `number`: string - Number e.g. `002`
    - `origin_data`: string - Origin data e.g. `OD-123654789`
    - `origin_id`: string - Origin ID e.g. `654987123`
    - `paid_date`: string(date) - Paid date e.g. `2012-11-21`
    - `reviewed_at`: string(date-time) - Reviewed at e.g. `2012-11-23T21:39:40Z`
    - `title`: string - Title e.g. `November Changes`
    - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Status e.g. `approved`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-11-23T21:39:40Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `assigned`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `location`: object
    - `id`: integer - Location ID e.g. `15504`
    - `name`: string - Location name e.g. `1space>1 space`
    - `node_name`: string - Location node name e.g. `1 space`
    - `parent_id`: integer - Location parent id e.g. `788866`
    - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
    - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `cost_code`: oneOf(object | object)
- `currency_configuration`: object - currency configuration information
  - `currency_iso_code`: string - currency ISO code e.g. `USD`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/change_events  **[OLDER VERSION - a newer path version exists below/above]**

**Create Change Event**
Create Change Event.
`change_event_status_id` must identify a Change Event status that exists for the company. Unknown status IDs return 400.
Note: A budget line item will automatically be created for Non-budgeted line items for all new projects and for projects enabled with Non-Budgeted line item beta functionality

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `change_event`: object (required)
  - `title`: string - Human-readable title summarizing the Change Event. e.g. `Toilet replacement`
  - `number`: string - User-defined identifier for the Change Event (may include alphanumeric characters). If omitted on create, one is auto-assigned. e.g. `A14`
  - `status`: string enum[open, closed] - DEPRECATED: Use :change_event_status_id. Status e.g. `open`
  - `change_event_status_id`: integer (required) - ID of a Change Event status that exists for the company. Unknown IDs return 400. e.g. `345998`
  - `change_order_change_reason_id`: integer - ID of the Change Order Change Reason to associate with this Change Event. e.g. `3452`
  - `event_scope`: string enum[tbd, in_scope, out_of_scope] (required) - Scope classification of the Change Event. e.g. `in_scope`
  - `event_type`: string enum[tbd, allowance, contingency, owner_change, transfer] - Type classification of the Change Event. e.g. `tbd`
  - `origin_data`: string - Free-form metadata about the corresponding record in an external (ERP) system. e.g. `OD-123654789`
  - `origin_id`: string - External record identifier in the originating source system. e.g. `654987123`
  - `rfi_id`: integer - ID of the RFI this Change Event originates from, if any. e.g. `496787`
  - `change_event_line_items_attributes`: array of object - Change Event Line Items
    - `id`: integer - ID of an existing Change Event Line Item to update. Omit to create a new Line Item. e.g. `592648`
    - `budget_code`: object - the Budget Code associated to the Change Event Line Item
      - `id`: integer - ID e.g. `40389`
    - `created_at`: string(date-time) - Created At e.g. `2021-01-01T00:00:00Z`
    - `description`: string - Description of the Change Event Line Item. e.g. `Add caulk to bathtub base`
    - `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of Measure e.g. `hours`
    - `estimated_cost_amount`: number(float) - Estimated Cost Amount e.g. `17705.0`
    - `estimated_cost_quantity`: number(float) - Estimated Cost Quantity e.g. `125.5`
    - `estimated_cost_unit_cost`: number(float) - Estimated Cost Unit Cost e.g. `75.5`
    - `estimated_cost_calculation_strategy`: string enum[automatic, manual] - Estimated Cost Calculation Strategy. Controls whether estimated_cost_amount is calculated from the quantity and unit_cost attributes or set manually to a provided value. e.g. `manual`
    - `line_item_type_id`: integer - Line Item Type ID e.g. `657393`
    - `cost_code_id`: integer - Cost Code ID e.g. `32940`
    - `proposed_vendor_id`: integer - Proposed Vendor ID e.g. `58320`
    - `proposed_contract_id`: integer - Proposed Contract ID e.g. `234859`
    - `updated_at`: string(date-time) - Updated At e.g. `2021-01-01T00:00:00Z`
    - `commitment_contract_line_item_id`: integer - Commitment Contract Line Item ID e.g. `342949`
  - `attachments_by_drawing_revision`: array of object
    - `id`: integer - ID e.g. `3456`
  - `attachments_by_file_version`: array of object
    - `id`: integer - ID e.g. `3456`
  - `attachments_by_form`: array of object
    - `id`: integer - ID e.g. `3456`
  - `attachments_by_image`: array of object
    - `id`: integer - ID e.g. `3456`
  - `attachments_by_uuid`: array of object
    - `upload_uuid`: string - UUID e.g. `01FG753MPADZBDWA63MH20XQVQ`
- `change_event_origin_id`: integer - ID of the record to associate as the Change Event origin. Provide alongside `change_event_origin_type`. Send both values as `null` to remove an existing origin. e.g. `5944991`
- `change_event_origin_type`: string - Change Event origin type. Supported values: `GenericToolItem`, `CommunicationThread`, `Meeting`, `Observations::Item`, `Rfi::Header`, `SiteInstruction`. e.g. `GenericToolItem`
- `origin_global_id`: string - Global ID of the record to associate as the Change Event origin. Provide instead of `change_event_origin_id` and `change_event_origin_type`. e.g. `gid://procore/GenericToolItem/5944991`
- `attachments`: array of string - Change Event Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 201 (application/json): object

- `id`: integer - Unique identifier of the Change Event. Use as the {id} path parameter for GET/PATCH /rest/v1.0/change_events/{id}. e.g. `43453`
- `number`: integer - Number with alpha characters stripped out e.g. `14`
- `alphanumeric_number`: string - Number including alpha characters e.g. `A14`
- `origin_data`: string - Origin data e.g. `OD-123654789`
- `origin_id`: string - Origin ID e.g. `654987123`
- `title`: string - Human-readable title summarizing the Change Event. e.g. `Bathtub replacement`
- `description`: string - Detailed description of the work or reason for the Change Event. e.g. `Replace the bathtub in the bathroom`
- `status`: string - Name of the Change Event's current status, lowercased (e.g. 'pending - revised'). e.g. `pending - revised`
- `project_id`: integer - Unique identifier for the project. e.g. `23446`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `event_type`: string - Display name of the Change Event's Change Type (e.g. 'TBD', 'Owner Change'). e.g. `TBD`
- `event_scope`: string enum[tbd, in_scope, out_of_scope] - Scope classification indicating whether the Change Event is in scope, out of scope, or still to be determined. e.g. `in_scope`
- `change_event_origin_id`: integer - ID of the source record this Change Event originated from. Paired with change_event_origin_type. e.g. `34523`
- `change_event_origin_type`: string - Type of the source record this Change Event originated from (e.g. Rfi::Header, GenericToolItem). e.g. `Rfi::Header`
- `rfi`: object
  - `id`: integer - ID e.g. `34523`
  - `title`: string - Title e.g. `Electrical panel obstructed`
  - `number`: integer - Number e.g. `3`
  - `full_number`: string - RFI Number including the prefix stage if exists e.g. `pre-3`
  - `full_number_with_revision`: string - RFI Number including the prefix stage and revision number if exists e.g. `pre-3 (Revision 4)`
  - `due_date`: string(date-time) - Due date e.g. `2016-11-23T21:39:40Z`
  - `status`: string - Status e.g. `draft`
  - `revision`: string - Revision Number e.g. `3`
- `change_event_line_items`: array of object
  - `id`: integer - ID e.g. `345236`
  - `biller`: object
    - `id`: integer - Biller ID e.g. `115513`
    - `name`: string - Biller Name e.g. `Eemer Oakland`
    - `model_name`: string - Biller Model Name e.g. `Project`
    - `guid`: string - Biller GUID e.g. `Z2lkOi8vcHJvY29yZS9Qcm9qZWN0LzE`
  - `biller_guid`: string - Biller GUID e.g. `Z2lkOi8vcHJvY29yZS9Qcm9qZWN0LzE`
  - `budget_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `1`
    - `flat_code`: string - wbs code flat code e.g. `O.01-511`
    - `description`: string - wbs code description e.g. `Earthwork.Materials`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `budget_mod`: object - Budget Modification
    - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
    - `transfer_amount`: string(float) - Amount transfered from the source Budget Line Item to the Target Budget Line Item e.g. `4500.0`
    - `notes`: string - Notes describing the modification e.g. `Transfer money for extra concrete.`
    - `from_budget_line_item_id`: integer - Source line item id e.g. `348383`
    - `to_budget_line_item_id`: integer - Target line item id e.g. `4034034`
    - `from_budget_line_item_name`: string - Source line item name e.g. `Source Line Item`
    - `to_budget_line_item_name`: string - Target line item name e.g. `Target Line Item`
  - `budget_mod_amount`: string - Budget Modification Amount e.g. `0`
  - `commitment_contract_cost`: string - Commitment Contract Cost e.g. `155524.00`
  - `commitment_pco_cost`: string - Commitment PCO Cost e.g. `0.0`
  - `contract`: object
    - `id`: integer - Contract ID e.g. `853215`
    - `number`: string - Contract Number e.g. `001`
    - `title`: string - Contract Title e.g. `PO--001`
    - `name`: string - Contract Name e.g. `PO--001`
  - `cost_code`: oneOf(object | object)
  - `cost_code_biller_name`: string - Cost Code Biller name e.g. `Eemer Oakland`
  - `cost_code_id`: integer - Cost Code ID e.g. `12345`
  - `cost_code_is_budgeted`: boolean - Cost Code is budgeted e.g. `true`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `currency_configuration`: object - currency configuration information
    - `currency_iso_code`: string - currency ISO code e.g. `USD`
  - `deletable`: boolean - Deletable status e.g. `false`
  - `description`: string - Description e.g. `Add caulk to bathtub base`
  - `editable`: boolean - Editable status e.g. `false`
  - `estimated_cost_amount`: string - Estimated Cost Amount e.g. `13531.0`
  - `estimated_cost_calculation_strategy`: string - Estimated Cost Calculation Strategy controls whether estimated_cost_amount is calculated by multiplying the quantity and unit_cost attributes or set manually to a provided value. e.g. `manual`
  - `estimated_cost_quantity`: number(float) - Estimated Cost Quantity e.g. `125.5`
  - `estimated_cost_unit_cost`: number(float) - Estimated Cost Unit Cost e.g. `75.5`
  - `event_id`: integer - Change Event ID e.g. `151512`
  - `line_item_type`: object - Line Item Type
    - `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
    - `name`: string - Name for the Line Item Type e.g. `Equipment`
    - `code`: string - Code for the Line Item Type e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
    - `origin_data`: string - Origin data e.g. `OD-2398273424`
    - `origin_id`: string - Origin ID e.g. `ABC123`
  - `line_item_type_id`: integer - Line Item Type ID e.g. `12345`
  - `links`: object
    - `edit`: string - Edit link e.g. `https://app.procore.com/1513513/project/change_events/events/151512/edit?celi...`
    - `view`: string - View link e.g. `https://app.procore.com/1513513/project/change_events/events/151512?celi_id=3...`
    - `contract`: string - Contract link e.g. `https://app.procore.com/1513513/project/commitments/purchase_order_contracts/...`
    - `commitment_contract_cost`: string - Commitment Contract cost link e.g. `https://app.procore.com/1513513/project/commitments/purchase_order_contracts/...`
    - `commitment_pco_cost`: string - Commitment PCO cost link e.g. `https://app.procore.com/1513513/project/commitments/purchase_order_contracts/...`
    - `rfq_amount`: string - RFQ amount link e.g. `https://app.procore.com/1513513/project/commitments/purchase_order_contracts/...`
    - `rom`: string - ROM link e.g. `https://app.procore.com/1513513/project/change_events/events/639?celi_id=456#456`
    - `prime_pco_cost`: string - Prime PCO cost link e.g. `https://app.procore.com/1513513/project/prime_contract/change_orders/potentia...`
  - `number`: string - Number e.g. `428`
  - `prime_pco_cost`: string(float) - Prime PCO Cost e.g. `0.0`
  - `proposed_contract_id`: integer - Proposed Contract ID e.g. `4`
  - `proposed_vendor_id`: integer - Proposed Vendor ID e.g. `5`
  - `request_for_quote_id`: integer - Request For Quote ID e.g. `12345`
  - `rfq_amount`: string(float) - Request RFQ Amount e.g. `1111.00`
  - `rfq_sent`: string - RFQ status e.g. `Out for Pricing`
  - `rom`: integer - Rough order of magnitude (ROM) e.g. `17705`
  - `status`: string - Status e.g. `Change Event Status 1`
  - `statuses`: object
    - `contract`: string - Contract status e.g. `Approved`
    - `commitment_contract_cost`: string - Commitment Contract Cost status e.g. `Draft`
    - `commitment_contract_tooltip`: string - Commitment Contract tooltip e.g. `PO--001: (no title), Approved`
    - `commitment_pco_cost`: string - Commitment PCO cost status e.g. `Draft`
    - `commitment_pco_tooltip`: string - Commitment PCO tooltip e.g. `PCO #001: CE #400 - CE 400, Draft`
    - `rfq_amount`: string - RFQ Amount status e.g. `Out for Pricing`
    - `rfq_tooltip`: string - RFQ tooltip e.g. `RFQ #002: CE #429 - RFI 111, Out for Pricing`
    - `prime_pco_cost`: string - Prime PCO Cost status e.g. `Draft`
    - `prime_pco_tooltip`: string - Prime PCO tooltip e.g. `PCO #001: CE #428 - RFI 111, Draft`
  - `title`: string - Title e.g. `CE #429 - RFI 111`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
  - `uom`: string - Unit of Measure e.g. `hours`
  - `vendor`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
- `change_order_change_reason`: object
  - `id`: integer - ID e.g. `3452`
  - `company_id`: integer - Company ID e.g. `2342`
  - `change_reason`: string - Reason for change e.g. `Allowance`
  - `show_in_select`: boolean - Show in select e.g. `true`
- `change_event_status`: object
  - `id`: integer - ID e.g. `29715`
  - `name`: string - Name e.g. `Pending - Revised`
  - `mapped_to_status`: string - Internal status to which the Change Event Status maps e.g. `pending`
  - `show_in_select`: boolean - Whether Change Event is available for GUI selection e.g. `true`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `rfqs`: array of object - Return a list of all Request for Quotes (RFQs) to a specific change event in a project. **NOTE:** If you see `[]`, you might not have permissions to see RFQs for Change Events.
  - `id`: integer - ID e.g. `1199`
  - `commitment_contract_id`: integer - Commitment Contract ID e.g. `418232`
  - `created_at`: string(date-time) - Created at e.g. `2016-06-30T20:41:58Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2016-08-30T18:11:43Z`
  - `description`: string - Description e.g. `Please see attached documentation for Bulletin 3 and provide pricing within 1...`
  - `due_date`: string(date) - Due date e.g. `2016-10-13`
  - `estimated_amount`: number(float) - Estimated amount e.g. `4302.0`
  - `estimated_schedule_impact`: integer - Estimated schedule impact in days e.g. `2`
  - `estimated_status`: string enum[rom, final] - Estimated status e.g. `rom`
  - `intent_to_quote`: boolean - Intent to quote status e.g. `false`
  - `number`: string - Number e.g. `013`
  - `original_quote`: number(float) - Original quote e.g. `4500.0`
  - `position`: integer - Position e.g. `13`
  - `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
  - `prostore_file_ids`: array of integer - Prostore File IDs e.g. `[3423484, 6983730, 2736492]`
  - `status`: string enum[out_for_pricing, revise_and_resubmit, under_review, pending_final_approval, closed, withdrawn] - Status e.g. `under_review`
  - `title`: string - Title e.g. `Field Bulletin #3 - Steel staircase on roof`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-08-30T18:11:43Z`
  - `specification_section`: object - Specification Section
    - `specification_section_id`: integer - ID e.g. `32379`
    - `spec_section_description`: string - Description e.g. `Steel Structure`
    - `spec_section_number`: string - Number e.g. `236400`
  - `quotes`: array of object - Quotes
    - `id`: integer - ID e.g. `105445`
    - `commitment_quote_number`: string - Commitment quote number e.g. `2234`
    - `cost`: number(float) - Cost e.g. `4500.0`
    - `schedule_impact`: integer - Schedule impact e.g. `2`
    - `description`: string - Description e.g. `Need to destroy some of the roofing to install this staircase.`
    - `request_for_quote_id`: integer - RFQ ID e.g. `136264`
    - `attachments_count`: integer - Attachments count e.g. `1`
    - `import_origin_id`: string - Import origin ID e.g. `QWA44H`
    - `created_by_id`: integer - Created by ID — DEPRECATED, please use "created_by" instead e.g. `5136213`
    - `created_at`: string(date-time) - Created at e.g. `2016-10-21T21:39:41Z`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2016-10-23T21:44:45Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2016-10-22T21:41:42Z`
    - `prostore_file_ids`: array of integer - Array of prostore file ids e.g. `[2334, 776843, 22456]`
    - `created_by`: object
  - `responses`: array of object - Responses
    - `id`: integer - ID e.g. `105`
    - `comment`: string - Comment in response to the latest quote e.g. `This quote needs to be revised. See attached files.`
    - `created_at`: string(date-time) - Created at e.g. `2016-10-22T21:39:40Z`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2016-10-30T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2016-10-26T21:39:40Z`
    - `prostore_file_ids`: array of integer - Prostore file IDs e.g. `[3453247, 6543893, 3476145]`
    - `created_by`: object
  - `potential_change_orders`: object
    - `id`: integer - Potential change order id e.g. `570623`
    - `created_at`: string(date-time) - Potential change order created at e.g. `2012-10-23T21:39:40Z`
    - `created_by_id`: integer - Potential change order creator id e.g. `12`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2012-11-24T21:39:40Z`
    - `due_date`: string(date) - Potential change order due date e.g. `2012-11-23`
    - `invoiced_date`: string(date) - Potential change order invoiced date e.g. `2012-10-24`
    - `number`: string - Potential change order number e.g. `004`
    - `paid_date`: string(date) - Potential change order paid date e.g. `2012-11-21`
    - `reviewed_at`: string(date-time) - Potential change order reviewed at e.g. `2012-10-23T21:44:40Z`
    - `title`: string - Potential change order title e.g. `Field Bulletin #3 - Steel staircase on roof`
    - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Potential change order status e.g. `approved`
    - `updated_at`: string(date-time) - Potential change order updated at e.g. `2012-11-23T21:39:40Z`
    - `change_order_request_id`: integer - Change Order Request ID e.g. `283764`
    - `executed`: boolean - Executed (or not) e.g. `false`
    - `grand_total`: string - Grand total e.g. `3329738.0`
    - `revision`: integer - Revision e.g. `4`
    - `schedule_impact_amount`: integer - Schedule impact in days e.g. `2`
    - `change_reason`: string - Change reason e.g. `Deleted`
    - `change_order_request_title`: string - Change Order Request Title e.g. `Concrete freezer slab`
    - `change_order_package_title`: string - Change Order Package Title e.g. `Concrete freezer slab`
    - `potential_change_order_acronym_number`: string - If the change order tier is single tier, an empty string. Otherwise, the PCO acronym and number. e.g. `PCO 95`
    - `change_order_request_acronym_number`: string - If the change order tier is single tier or two-tiered, an empty string. Otherwise, the COR acronym and change order request number. e.g. `COR 9001`
    - `change_order_package_acronym_number`: string - The CCO acronym and change order package number. e.g. `CCO 42`
    - `change_order_tiers`: integer - Number of Change Order Tiers e.g. `3`
  - `change_order_packages`: object
    - `id`: integer - ID e.g. `458661`
    - `contract_id`: integer - Contract ID e.g. `64545`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
    - `due_date`: string(date) - Due date e.g. `2012-11-23`
    - `invoiced_date`: string(date) - Invoiced date e.g. `2012-10-24`
    - `number`: string - Number e.g. `002`
    - `origin_data`: string - Origin data e.g. `OD-123654789`
    - `origin_id`: string - Origin ID e.g. `654987123`
    - `paid_date`: string(date) - Paid date e.g. `2012-11-21`
    - `reviewed_at`: string(date-time) - Reviewed at e.g. `2012-11-23T21:39:40Z`
    - `title`: string - Title e.g. `November Changes`
    - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Status e.g. `approved`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-11-23T21:39:40Z`
  - `commitment_potential_change_orders`: object
    - `id`: integer - Potential change order id e.g. `570623`
    - `created_at`: string(date-time) - Potential change order created at e.g. `2012-10-23T21:39:40Z`
    - `created_by_id`: integer - Potential change order creator id e.g. `12`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2012-11-24T21:39:40Z`
    - `due_date`: string(date) - Potential change order due date e.g. `2012-11-23`
    - `invoiced_date`: string(date) - Potential change order invoiced date e.g. `2012-10-24`
    - `number`: string - Potential change order number e.g. `004`
    - `paid_date`: string(date) - Potential change order paid date e.g. `2012-11-21`
    - `reviewed_at`: string(date-time) - Potential change order reviewed at e.g. `2012-10-23T21:44:40Z`
    - `title`: string - Potential change order title e.g. `Field Bulletin #3 - Steel staircase on roof`
    - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Potential change order status e.g. `approved`
    - `updated_at`: string(date-time) - Potential change order updated at e.g. `2012-11-23T21:39:40Z`
    - `change_order_request_id`: integer - Change Order Request ID e.g. `283764`
    - `executed`: boolean - Executed (or not) e.g. `false`
    - `grand_total`: string - Grand total e.g. `3329738.0`
    - `revision`: integer - Revision e.g. `4`
    - `schedule_impact_amount`: integer - Schedule impact in days e.g. `2`
    - `change_reason`: string - Change reason e.g. `Deleted`
    - `change_order_request_title`: string - Change Order Request Title e.g. `Concrete freezer slab`
    - `change_order_package_title`: string - Change Order Package Title e.g. `Concrete freezer slab`
    - `potential_change_order_acronym_number`: string - If the change order tier is single tier, an empty string. Otherwise, the PCO acronym and number. e.g. `PCO 95`
    - `change_order_request_acronym_number`: string - If the change order tier is single tier or two-tiered, an empty string. Otherwise, the COR acronym and change order request number. e.g. `COR 9001`
    - `change_order_package_acronym_number`: string - The CCO acronym and change order package number. e.g. `CCO 42`
    - `change_order_tiers`: integer - Number of Change Order Tiers e.g. `3`
  - `commitment_change_order_packages`: object
    - `id`: integer - ID e.g. `458661`
    - `contract_id`: integer - Contract ID e.g. `64545`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
    - `due_date`: string(date) - Due date e.g. `2012-11-23`
    - `invoiced_date`: string(date) - Invoiced date e.g. `2012-10-24`
    - `number`: string - Number e.g. `002`
    - `origin_data`: string - Origin data e.g. `OD-123654789`
    - `origin_id`: string - Origin ID e.g. `654987123`
    - `paid_date`: string(date) - Paid date e.g. `2012-11-21`
    - `reviewed_at`: string(date-time) - Reviewed at e.g. `2012-11-23T21:39:40Z`
    - `title`: string - Title e.g. `November Changes`
    - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Status e.g. `approved`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-11-23T21:39:40Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `assigned`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `location`: object
    - `id`: integer - Location ID e.g. `15504`
    - `name`: string - Location name e.g. `1space>1 space`
    - `node_name`: string - Location node name e.g. `1 space`
    - `parent_id`: integer - Location parent id e.g. `788866`
    - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
    - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `cost_code`: oneOf(object | object)
- `currency_configuration`: object - currency configuration information
  - `currency_iso_code`: string - currency ISO code e.g. `USD`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/change_events/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Show Change Event**
Show Change Event.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Change Event. Use as the {id} path parameter for GET/PATCH /rest/v1.0/change_events/{id}. e.g. `43453`
- `number`: integer - Number with alpha characters stripped out e.g. `14`
- `alphanumeric_number`: string - Number including alpha characters e.g. `A14`
- `origin_data`: string - Origin data e.g. `OD-123654789`
- `origin_id`: string - Origin ID e.g. `654987123`
- `title`: string - Human-readable title summarizing the Change Event. e.g. `Bathtub replacement`
- `description`: string - Detailed description of the work or reason for the Change Event. e.g. `Replace the bathtub in the bathroom`
- `status`: string - Name of the Change Event's current status, lowercased (e.g. 'pending - revised'). e.g. `pending - revised`
- `project_id`: integer - Unique identifier for the project. e.g. `23446`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `event_type`: string - Display name of the Change Event's Change Type (e.g. 'TBD', 'Owner Change'). e.g. `TBD`
- `event_scope`: string enum[tbd, in_scope, out_of_scope] - Scope classification indicating whether the Change Event is in scope, out of scope, or still to be determined. e.g. `in_scope`
- `change_event_origin_id`: integer - ID of the source record this Change Event originated from. Paired with change_event_origin_type. e.g. `34523`
- `change_event_origin_type`: string - Type of the source record this Change Event originated from (e.g. Rfi::Header, GenericToolItem). e.g. `Rfi::Header`
- `rfi`: object
  - `id`: integer - ID e.g. `34523`
  - `title`: string - Title e.g. `Electrical panel obstructed`
  - `number`: integer - Number e.g. `3`
  - `full_number`: string - RFI Number including the prefix stage if exists e.g. `pre-3`
  - `full_number_with_revision`: string - RFI Number including the prefix stage and revision number if exists e.g. `pre-3 (Revision 4)`
  - `due_date`: string(date-time) - Due date e.g. `2016-11-23T21:39:40Z`
  - `status`: string - Status e.g. `draft`
  - `revision`: string - Revision Number e.g. `3`
- `change_event_line_items`: array of object
  - `id`: integer - ID e.g. `345236`
  - `biller`: object
    - `id`: integer - Biller ID e.g. `115513`
    - `name`: string - Biller Name e.g. `Eemer Oakland`
    - `model_name`: string - Biller Model Name e.g. `Project`
    - `guid`: string - Biller GUID e.g. `Z2lkOi8vcHJvY29yZS9Qcm9qZWN0LzE`
  - `biller_guid`: string - Biller GUID e.g. `Z2lkOi8vcHJvY29yZS9Qcm9qZWN0LzE`
  - `budget_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `1`
    - `flat_code`: string - wbs code flat code e.g. `O.01-511`
    - `description`: string - wbs code description e.g. `Earthwork.Materials`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `budget_mod`: object - Budget Modification
    - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
    - `transfer_amount`: string(float) - Amount transfered from the source Budget Line Item to the Target Budget Line Item e.g. `4500.0`
    - `notes`: string - Notes describing the modification e.g. `Transfer money for extra concrete.`
    - `from_budget_line_item_id`: integer - Source line item id e.g. `348383`
    - `to_budget_line_item_id`: integer - Target line item id e.g. `4034034`
    - `from_budget_line_item_name`: string - Source line item name e.g. `Source Line Item`
    - `to_budget_line_item_name`: string - Target line item name e.g. `Target Line Item`
  - `budget_mod_amount`: string - Budget Modification Amount e.g. `0`
  - `commitment_contract_cost`: string - Commitment Contract Cost e.g. `155524.00`
  - `commitment_pco_cost`: string - Commitment PCO Cost e.g. `0.0`
  - `contract`: object
    - `id`: integer - Contract ID e.g. `853215`
    - `number`: string - Contract Number e.g. `001`
    - `title`: string - Contract Title e.g. `PO--001`
    - `name`: string - Contract Name e.g. `PO--001`
  - `cost_code`: oneOf(object | object)
  - `cost_code_biller_name`: string - Cost Code Biller name e.g. `Eemer Oakland`
  - `cost_code_id`: integer - Cost Code ID e.g. `12345`
  - `cost_code_is_budgeted`: boolean - Cost Code is budgeted e.g. `true`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `currency_configuration`: object - currency configuration information
    - `currency_iso_code`: string - currency ISO code e.g. `USD`
  - `deletable`: boolean - Deletable status e.g. `false`
  - `description`: string - Description e.g. `Add caulk to bathtub base`
  - `editable`: boolean - Editable status e.g. `false`
  - `estimated_cost_amount`: string - Estimated Cost Amount e.g. `13531.0`
  - `estimated_cost_calculation_strategy`: string - Estimated Cost Calculation Strategy controls whether estimated_cost_amount is calculated by multiplying the quantity and unit_cost attributes or set manually to a provided value. e.g. `manual`
  - `estimated_cost_quantity`: number(float) - Estimated Cost Quantity e.g. `125.5`
  - `estimated_cost_unit_cost`: number(float) - Estimated Cost Unit Cost e.g. `75.5`
  - `event_id`: integer - Change Event ID e.g. `151512`
  - `line_item_type`: object - Line Item Type
    - `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
    - `name`: string - Name for the Line Item Type e.g. `Equipment`
    - `code`: string - Code for the Line Item Type e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
    - `origin_data`: string - Origin data e.g. `OD-2398273424`
    - `origin_id`: string - Origin ID e.g. `ABC123`
  - `line_item_type_id`: integer - Line Item Type ID e.g. `12345`
  - `links`: object
    - `edit`: string - Edit link e.g. `https://app.procore.com/1513513/project/change_events/events/151512/edit?celi...`
    - `view`: string - View link e.g. `https://app.procore.com/1513513/project/change_events/events/151512?celi_id=3...`
    - `contract`: string - Contract link e.g. `https://app.procore.com/1513513/project/commitments/purchase_order_contracts/...`
    - `commitment_contract_cost`: string - Commitment Contract cost link e.g. `https://app.procore.com/1513513/project/commitments/purchase_order_contracts/...`
    - `commitment_pco_cost`: string - Commitment PCO cost link e.g. `https://app.procore.com/1513513/project/commitments/purchase_order_contracts/...`
    - `rfq_amount`: string - RFQ amount link e.g. `https://app.procore.com/1513513/project/commitments/purchase_order_contracts/...`
    - `rom`: string - ROM link e.g. `https://app.procore.com/1513513/project/change_events/events/639?celi_id=456#456`
    - `prime_pco_cost`: string - Prime PCO cost link e.g. `https://app.procore.com/1513513/project/prime_contract/change_orders/potentia...`
  - `number`: string - Number e.g. `428`
  - `prime_pco_cost`: string(float) - Prime PCO Cost e.g. `0.0`
  - `proposed_contract_id`: integer - Proposed Contract ID e.g. `4`
  - `proposed_vendor_id`: integer - Proposed Vendor ID e.g. `5`
  - `request_for_quote_id`: integer - Request For Quote ID e.g. `12345`
  - `rfq_amount`: string(float) - Request RFQ Amount e.g. `1111.00`
  - `rfq_sent`: string - RFQ status e.g. `Out for Pricing`
  - `rom`: integer - Rough order of magnitude (ROM) e.g. `17705`
  - `status`: string - Status e.g. `Change Event Status 1`
  - `statuses`: object
    - `contract`: string - Contract status e.g. `Approved`
    - `commitment_contract_cost`: string - Commitment Contract Cost status e.g. `Draft`
    - `commitment_contract_tooltip`: string - Commitment Contract tooltip e.g. `PO--001: (no title), Approved`
    - `commitment_pco_cost`: string - Commitment PCO cost status e.g. `Draft`
    - `commitment_pco_tooltip`: string - Commitment PCO tooltip e.g. `PCO #001: CE #400 - CE 400, Draft`
    - `rfq_amount`: string - RFQ Amount status e.g. `Out for Pricing`
    - `rfq_tooltip`: string - RFQ tooltip e.g. `RFQ #002: CE #429 - RFI 111, Out for Pricing`
    - `prime_pco_cost`: string - Prime PCO Cost status e.g. `Draft`
    - `prime_pco_tooltip`: string - Prime PCO tooltip e.g. `PCO #001: CE #428 - RFI 111, Draft`
  - `title`: string - Title e.g. `CE #429 - RFI 111`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
  - `uom`: string - Unit of Measure e.g. `hours`
  - `vendor`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
- `change_order_change_reason`: object
  - `id`: integer - ID e.g. `3452`
  - `company_id`: integer - Company ID e.g. `2342`
  - `change_reason`: string - Reason for change e.g. `Allowance`
  - `show_in_select`: boolean - Show in select e.g. `true`
- `change_event_status`: object
  - `id`: integer - ID e.g. `29715`
  - `name`: string - Name e.g. `Pending - Revised`
  - `mapped_to_status`: string - Internal status to which the Change Event Status maps e.g. `pending`
  - `show_in_select`: boolean - Whether Change Event is available for GUI selection e.g. `true`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `rfqs`: array of object - Return a list of all Request for Quotes (RFQs) to a specific change event in a project. **NOTE:** If you see `[]`, you might not have permissions to see RFQs for Change Events.
  - `id`: integer - ID e.g. `1199`
  - `commitment_contract_id`: integer - Commitment Contract ID e.g. `418232`
  - `created_at`: string(date-time) - Created at e.g. `2016-06-30T20:41:58Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2016-08-30T18:11:43Z`
  - `description`: string - Description e.g. `Please see attached documentation for Bulletin 3 and provide pricing within 1...`
  - `due_date`: string(date) - Due date e.g. `2016-10-13`
  - `estimated_amount`: number(float) - Estimated amount e.g. `4302.0`
  - `estimated_schedule_impact`: integer - Estimated schedule impact in days e.g. `2`
  - `estimated_status`: string enum[rom, final] - Estimated status e.g. `rom`
  - `intent_to_quote`: boolean - Intent to quote status e.g. `false`
  - `number`: string - Number e.g. `013`
  - `original_quote`: number(float) - Original quote e.g. `4500.0`
  - `position`: integer - Position e.g. `13`
  - `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
  - `prostore_file_ids`: array of integer - Prostore File IDs e.g. `[3423484, 6983730, 2736492]`
  - `status`: string enum[out_for_pricing, revise_and_resubmit, under_review, pending_final_approval, closed, withdrawn] - Status e.g. `under_review`
  - `title`: string - Title e.g. `Field Bulletin #3 - Steel staircase on roof`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-08-30T18:11:43Z`
  - `specification_section`: object - Specification Section
    - `specification_section_id`: integer - ID e.g. `32379`
    - `spec_section_description`: string - Description e.g. `Steel Structure`
    - `spec_section_number`: string - Number e.g. `236400`
  - `quotes`: array of object - Quotes
    - `id`: integer - ID e.g. `105445`
    - `commitment_quote_number`: string - Commitment quote number e.g. `2234`
    - `cost`: number(float) - Cost e.g. `4500.0`
    - `schedule_impact`: integer - Schedule impact e.g. `2`
    - `description`: string - Description e.g. `Need to destroy some of the roofing to install this staircase.`
    - `request_for_quote_id`: integer - RFQ ID e.g. `136264`
    - `attachments_count`: integer - Attachments count e.g. `1`
    - `import_origin_id`: string - Import origin ID e.g. `QWA44H`
    - `created_by_id`: integer - Created by ID — DEPRECATED, please use "created_by" instead e.g. `5136213`
    - `created_at`: string(date-time) - Created at e.g. `2016-10-21T21:39:41Z`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2016-10-23T21:44:45Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2016-10-22T21:41:42Z`
    - `prostore_file_ids`: array of integer - Array of prostore file ids e.g. `[2334, 776843, 22456]`
    - `created_by`: object
  - `responses`: array of object - Responses
    - `id`: integer - ID e.g. `105`
    - `comment`: string - Comment in response to the latest quote e.g. `This quote needs to be revised. See attached files.`
    - `created_at`: string(date-time) - Created at e.g. `2016-10-22T21:39:40Z`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2016-10-30T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2016-10-26T21:39:40Z`
    - `prostore_file_ids`: array of integer - Prostore file IDs e.g. `[3453247, 6543893, 3476145]`
    - `created_by`: object
  - `potential_change_orders`: object
    - `id`: integer - Potential change order id e.g. `570623`
    - `created_at`: string(date-time) - Potential change order created at e.g. `2012-10-23T21:39:40Z`
    - `created_by_id`: integer - Potential change order creator id e.g. `12`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2012-11-24T21:39:40Z`
    - `due_date`: string(date) - Potential change order due date e.g. `2012-11-23`
    - `invoiced_date`: string(date) - Potential change order invoiced date e.g. `2012-10-24`
    - `number`: string - Potential change order number e.g. `004`
    - `paid_date`: string(date) - Potential change order paid date e.g. `2012-11-21`
    - `reviewed_at`: string(date-time) - Potential change order reviewed at e.g. `2012-10-23T21:44:40Z`
    - `title`: string - Potential change order title e.g. `Field Bulletin #3 - Steel staircase on roof`
    - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Potential change order status e.g. `approved`
    - `updated_at`: string(date-time) - Potential change order updated at e.g. `2012-11-23T21:39:40Z`
    - `change_order_request_id`: integer - Change Order Request ID e.g. `283764`
    - `executed`: boolean - Executed (or not) e.g. `false`
    - `grand_total`: string - Grand total e.g. `3329738.0`
    - `revision`: integer - Revision e.g. `4`
    - `schedule_impact_amount`: integer - Schedule impact in days e.g. `2`
    - `change_reason`: string - Change reason e.g. `Deleted`
    - `change_order_request_title`: string - Change Order Request Title e.g. `Concrete freezer slab`
    - `change_order_package_title`: string - Change Order Package Title e.g. `Concrete freezer slab`
    - `potential_change_order_acronym_number`: string - If the change order tier is single tier, an empty string. Otherwise, the PCO acronym and number. e.g. `PCO 95`
    - `change_order_request_acronym_number`: string - If the change order tier is single tier or two-tiered, an empty string. Otherwise, the COR acronym and change order request number. e.g. `COR 9001`
    - `change_order_package_acronym_number`: string - The CCO acronym and change order package number. e.g. `CCO 42`
    - `change_order_tiers`: integer - Number of Change Order Tiers e.g. `3`
  - `change_order_packages`: object
    - `id`: integer - ID e.g. `458661`
    - `contract_id`: integer - Contract ID e.g. `64545`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
    - `due_date`: string(date) - Due date e.g. `2012-11-23`
    - `invoiced_date`: string(date) - Invoiced date e.g. `2012-10-24`
    - `number`: string - Number e.g. `002`
    - `origin_data`: string - Origin data e.g. `OD-123654789`
    - `origin_id`: string - Origin ID e.g. `654987123`
    - `paid_date`: string(date) - Paid date e.g. `2012-11-21`
    - `reviewed_at`: string(date-time) - Reviewed at e.g. `2012-11-23T21:39:40Z`
    - `title`: string - Title e.g. `November Changes`
    - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Status e.g. `approved`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-11-23T21:39:40Z`
  - `commitment_potential_change_orders`: object
    - `id`: integer - Potential change order id e.g. `570623`
    - `created_at`: string(date-time) - Potential change order created at e.g. `2012-10-23T21:39:40Z`
    - `created_by_id`: integer - Potential change order creator id e.g. `12`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2012-11-24T21:39:40Z`
    - `due_date`: string(date) - Potential change order due date e.g. `2012-11-23`
    - `invoiced_date`: string(date) - Potential change order invoiced date e.g. `2012-10-24`
    - `number`: string - Potential change order number e.g. `004`
    - `paid_date`: string(date) - Potential change order paid date e.g. `2012-11-21`
    - `reviewed_at`: string(date-time) - Potential change order reviewed at e.g. `2012-10-23T21:44:40Z`
    - `title`: string - Potential change order title e.g. `Field Bulletin #3 - Steel staircase on roof`
    - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Potential change order status e.g. `approved`
    - `updated_at`: string(date-time) - Potential change order updated at e.g. `2012-11-23T21:39:40Z`
    - `change_order_request_id`: integer - Change Order Request ID e.g. `283764`
    - `executed`: boolean - Executed (or not) e.g. `false`
    - `grand_total`: string - Grand total e.g. `3329738.0`
    - `revision`: integer - Revision e.g. `4`
    - `schedule_impact_amount`: integer - Schedule impact in days e.g. `2`
    - `change_reason`: string - Change reason e.g. `Deleted`
    - `change_order_request_title`: string - Change Order Request Title e.g. `Concrete freezer slab`
    - `change_order_package_title`: string - Change Order Package Title e.g. `Concrete freezer slab`
    - `potential_change_order_acronym_number`: string - If the change order tier is single tier, an empty string. Otherwise, the PCO acronym and number. e.g. `PCO 95`
    - `change_order_request_acronym_number`: string - If the change order tier is single tier or two-tiered, an empty string. Otherwise, the COR acronym and change order request number. e.g. `COR 9001`
    - `change_order_package_acronym_number`: string - The CCO acronym and change order package number. e.g. `CCO 42`
    - `change_order_tiers`: integer - Number of Change Order Tiers e.g. `3`
  - `commitment_change_order_packages`: object
    - `id`: integer - ID e.g. `458661`
    - `contract_id`: integer - Contract ID e.g. `64545`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
    - `due_date`: string(date) - Due date e.g. `2012-11-23`
    - `invoiced_date`: string(date) - Invoiced date e.g. `2012-10-24`
    - `number`: string - Number e.g. `002`
    - `origin_data`: string - Origin data e.g. `OD-123654789`
    - `origin_id`: string - Origin ID e.g. `654987123`
    - `paid_date`: string(date) - Paid date e.g. `2012-11-21`
    - `reviewed_at`: string(date-time) - Reviewed at e.g. `2012-11-23T21:39:40Z`
    - `title`: string - Title e.g. `November Changes`
    - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Status e.g. `approved`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-11-23T21:39:40Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `assigned`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `location`: object
    - `id`: integer - Location ID e.g. `15504`
    - `name`: string - Location name e.g. `1space>1 space`
    - `node_name`: string - Location node name e.g. `1 space`
    - `parent_id`: integer - Location parent id e.g. `788866`
    - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
    - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `cost_code`: oneOf(object | object)
- `currency_configuration`: object - currency configuration information
  - `currency_iso_code`: string - currency ISO code e.g. `USD`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/change_events/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Update Change Event**
Update Change Event.
Note: A budget line item will automatically be created for Non-budgeted line items for all new projects and for projects enabled with Non-Budgeted line item beta functionality

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `345756`
- `change_event`: object (required)
  - `title`: string - Human-readable title summarizing the Change Event. e.g. `Toilet replacement`
  - `number`: string - User-defined identifier for the Change Event (may include alphanumeric characters). If omitted on create, one is auto-assigned. e.g. `A14`
  - `status`: string enum[open, closed] - DEPRECATED: Use :change_event_status_id. Status e.g. `open`
  - `change_event_status_id`: integer - ID of the Change Event Status to assign. Obtain valid IDs from GET /rest/v1.1/change_events/statuses. e.g. `345998`
  - `change_order_change_reason_id`: integer - ID of the Change Order Change Reason to associate with this Change Event. e.g. `3452`
  - `event_scope`: string enum[tbd, in_scope, out_of_scope] - Scope classification of the Change Event. e.g. `in_scope`
  - `event_type`: string enum[tbd, allowance, contingency, owner_change, transfer] - Type classification of the Change Event. e.g. `tbd`
  - `origin_data`: string - Free-form metadata about the corresponding record in an external (ERP) system. e.g. `OD-123654789`
  - `origin_id`: string - External record identifier in the originating source system. e.g. `654987123`
  - `rfi_id`: integer - ID of the RFI this Change Event originates from, if any. e.g. `496787`
  - `change_event_line_items_attributes`: array of object - Change Event Line Items
    - `id`: integer - ID of an existing Change Event Line Item to update. Omit to create a new Line Item. e.g. `592648`
    - `wbs_code_id`: object - the WBS (Budget) Code associated to the Change Event Line Item
      - `id`: integer - ID e.g. `40389`
    - `description`: string - Description of the Change Event Line Item. e.g. `Add caulk to bathtub base`
    - `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of Measure e.g. `hours`
    - `estimated_cost_amount`: number(float) - Estimated Cost Amount e.g. `17705.0`
    - `estimated_cost_quantity`: number(float) - Estimated Cost Quantity e.g. `125.5`
    - `estimated_cost_unit_cost`: number(float) - Estimated Cost Unit Cost e.g. `75.5`
    - `estimated_cost_calculation_strategy`: string enum[automatic, manual] - Estimated Cost Calculation Strategy. Controls whether estimated_cost_amount is calculated from the quantity and unit_cost attributes or set manually to a provided value. e.g. `manual`
    - `line_item_type_id`: integer - Line Item Type ID e.g. `657393`
    - `cost_code_id`: integer - Cost Code ID e.g. `32940`
    - `proposed_vendor_id`: integer - Proposed Vendor ID e.g. `58320`
    - `proposed_contract_id`: integer - Proposed Contract ID e.g. `234859`
    - `commitment_contract_line_item_id`: integer - Commitment Contract Line Item ID e.g. `342949`
  - `attachments_by_drawing_revision`: array of object
    - `id`: integer - ID e.g. `3456`
  - `attachments_by_file_version`: array of object
    - `id`: integer - ID e.g. `3456`
  - `attachments_by_form`: array of object
    - `id`: integer - ID e.g. `3456`
  - `attachments_by_image`: array of object
    - `id`: integer - ID e.g. `3456`
  - `attachments_by_uuid`: array of object
    - `upload_uuid`: string - UUID e.g. `01FG753MPADZBDWA63MH20XQVQ`
- `change_event_origin_id`: integer - ID of the record to associate as the Change Event origin. Provide alongside `change_event_origin_type`. Send both values as `null` to remove an existing origin. e.g. `5944991`
- `change_event_origin_type`: string - Change Event origin type. Supported values: `GenericToolItem`, `CommunicationThread`, `Meeting`, `Observations::Item`, `Rfi::Header`, `SiteInstruction`. e.g. `GenericToolItem`
- `origin_global_id`: string - Global ID of the record to associate as the Change Event origin. Provide instead of `change_event_origin_id` and `change_event_origin_type`. e.g. `gid://procore/GenericToolItem/5944991`
- `attachments`: array of string - Change Event Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Change Event. Use as the {id} path parameter for GET/PATCH /rest/v1.0/change_events/{id}. e.g. `43453`
- `number`: integer - Number with alpha characters stripped out e.g. `14`
- `alphanumeric_number`: string - Number including alpha characters e.g. `A14`
- `origin_data`: string - Origin data e.g. `OD-123654789`
- `origin_id`: string - Origin ID e.g. `654987123`
- `title`: string - Human-readable title summarizing the Change Event. e.g. `Bathtub replacement`
- `description`: string - Detailed description of the work or reason for the Change Event. e.g. `Replace the bathtub in the bathroom`
- `status`: string - Name of the Change Event's current status, lowercased (e.g. 'pending - revised'). e.g. `pending - revised`
- `project_id`: integer - Unique identifier for the project. e.g. `23446`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `event_type`: string - Display name of the Change Event's Change Type (e.g. 'TBD', 'Owner Change'). e.g. `TBD`
- `event_scope`: string enum[tbd, in_scope, out_of_scope] - Scope classification indicating whether the Change Event is in scope, out of scope, or still to be determined. e.g. `in_scope`
- `change_event_origin_id`: integer - ID of the source record this Change Event originated from. Paired with change_event_origin_type. e.g. `34523`
- `change_event_origin_type`: string - Type of the source record this Change Event originated from (e.g. Rfi::Header, GenericToolItem). e.g. `Rfi::Header`
- `rfi`: object
  - `id`: integer - ID e.g. `34523`
  - `title`: string - Title e.g. `Electrical panel obstructed`
  - `number`: integer - Number e.g. `3`
  - `full_number`: string - RFI Number including the prefix stage if exists e.g. `pre-3`
  - `full_number_with_revision`: string - RFI Number including the prefix stage and revision number if exists e.g. `pre-3 (Revision 4)`
  - `due_date`: string(date-time) - Due date e.g. `2016-11-23T21:39:40Z`
  - `status`: string - Status e.g. `draft`
  - `revision`: string - Revision Number e.g. `3`
- `change_event_line_items`: array of object
  - `id`: integer - ID e.g. `345236`
  - `biller`: object
    - `id`: integer - Biller ID e.g. `115513`
    - `name`: string - Biller Name e.g. `Eemer Oakland`
    - `model_name`: string - Biller Model Name e.g. `Project`
    - `guid`: string - Biller GUID e.g. `Z2lkOi8vcHJvY29yZS9Qcm9qZWN0LzE`
  - `biller_guid`: string - Biller GUID e.g. `Z2lkOi8vcHJvY29yZS9Qcm9qZWN0LzE`
  - `budget_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `1`
    - `flat_code`: string - wbs code flat code e.g. `O.01-511`
    - `description`: string - wbs code description e.g. `Earthwork.Materials`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `budget_mod`: object - Budget Modification
    - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
    - `transfer_amount`: string(float) - Amount transfered from the source Budget Line Item to the Target Budget Line Item e.g. `4500.0`
    - `notes`: string - Notes describing the modification e.g. `Transfer money for extra concrete.`
    - `from_budget_line_item_id`: integer - Source line item id e.g. `348383`
    - `to_budget_line_item_id`: integer - Target line item id e.g. `4034034`
    - `from_budget_line_item_name`: string - Source line item name e.g. `Source Line Item`
    - `to_budget_line_item_name`: string - Target line item name e.g. `Target Line Item`
  - `budget_mod_amount`: string - Budget Modification Amount e.g. `0`
  - `commitment_contract_cost`: string - Commitment Contract Cost e.g. `155524.00`
  - `commitment_pco_cost`: string - Commitment PCO Cost e.g. `0.0`
  - `contract`: object
    - `id`: integer - Contract ID e.g. `853215`
    - `number`: string - Contract Number e.g. `001`
    - `title`: string - Contract Title e.g. `PO--001`
    - `name`: string - Contract Name e.g. `PO--001`
  - `cost_code`: oneOf(object | object)
  - `cost_code_biller_name`: string - Cost Code Biller name e.g. `Eemer Oakland`
  - `cost_code_id`: integer - Cost Code ID e.g. `12345`
  - `cost_code_is_budgeted`: boolean - Cost Code is budgeted e.g. `true`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `currency_configuration`: object - currency configuration information
    - `currency_iso_code`: string - currency ISO code e.g. `USD`
  - `deletable`: boolean - Deletable status e.g. `false`
  - `description`: string - Description e.g. `Add caulk to bathtub base`
  - `editable`: boolean - Editable status e.g. `false`
  - `estimated_cost_amount`: string - Estimated Cost Amount e.g. `13531.0`
  - `estimated_cost_calculation_strategy`: string - Estimated Cost Calculation Strategy controls whether estimated_cost_amount is calculated by multiplying the quantity and unit_cost attributes or set manually to a provided value. e.g. `manual`
  - `estimated_cost_quantity`: number(float) - Estimated Cost Quantity e.g. `125.5`
  - `estimated_cost_unit_cost`: number(float) - Estimated Cost Unit Cost e.g. `75.5`
  - `event_id`: integer - Change Event ID e.g. `151512`
  - `line_item_type`: object - Line Item Type
    - `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
    - `name`: string - Name for the Line Item Type e.g. `Equipment`
    - `code`: string - Code for the Line Item Type e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
    - `origin_data`: string - Origin data e.g. `OD-2398273424`
    - `origin_id`: string - Origin ID e.g. `ABC123`
  - `line_item_type_id`: integer - Line Item Type ID e.g. `12345`
  - `links`: object
    - `edit`: string - Edit link e.g. `https://app.procore.com/1513513/project/change_events/events/151512/edit?celi...`
    - `view`: string - View link e.g. `https://app.procore.com/1513513/project/change_events/events/151512?celi_id=3...`
    - `contract`: string - Contract link e.g. `https://app.procore.com/1513513/project/commitments/purchase_order_contracts/...`
    - `commitment_contract_cost`: string - Commitment Contract cost link e.g. `https://app.procore.com/1513513/project/commitments/purchase_order_contracts/...`
    - `commitment_pco_cost`: string - Commitment PCO cost link e.g. `https://app.procore.com/1513513/project/commitments/purchase_order_contracts/...`
    - `rfq_amount`: string - RFQ amount link e.g. `https://app.procore.com/1513513/project/commitments/purchase_order_contracts/...`
    - `rom`: string - ROM link e.g. `https://app.procore.com/1513513/project/change_events/events/639?celi_id=456#456`
    - `prime_pco_cost`: string - Prime PCO cost link e.g. `https://app.procore.com/1513513/project/prime_contract/change_orders/potentia...`
  - `number`: string - Number e.g. `428`
  - `prime_pco_cost`: string(float) - Prime PCO Cost e.g. `0.0`
  - `proposed_contract_id`: integer - Proposed Contract ID e.g. `4`
  - `proposed_vendor_id`: integer - Proposed Vendor ID e.g. `5`
  - `request_for_quote_id`: integer - Request For Quote ID e.g. `12345`
  - `rfq_amount`: string(float) - Request RFQ Amount e.g. `1111.00`
  - `rfq_sent`: string - RFQ status e.g. `Out for Pricing`
  - `rom`: integer - Rough order of magnitude (ROM) e.g. `17705`
  - `status`: string - Status e.g. `Change Event Status 1`
  - `statuses`: object
    - `contract`: string - Contract status e.g. `Approved`
    - `commitment_contract_cost`: string - Commitment Contract Cost status e.g. `Draft`
    - `commitment_contract_tooltip`: string - Commitment Contract tooltip e.g. `PO--001: (no title), Approved`
    - `commitment_pco_cost`: string - Commitment PCO cost status e.g. `Draft`
    - `commitment_pco_tooltip`: string - Commitment PCO tooltip e.g. `PCO #001: CE #400 - CE 400, Draft`
    - `rfq_amount`: string - RFQ Amount status e.g. `Out for Pricing`
    - `rfq_tooltip`: string - RFQ tooltip e.g. `RFQ #002: CE #429 - RFI 111, Out for Pricing`
    - `prime_pco_cost`: string - Prime PCO Cost status e.g. `Draft`
    - `prime_pco_tooltip`: string - Prime PCO tooltip e.g. `PCO #001: CE #428 - RFI 111, Draft`
  - `title`: string - Title e.g. `CE #429 - RFI 111`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
  - `uom`: string - Unit of Measure e.g. `hours`
  - `vendor`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
- `change_order_change_reason`: object
  - `id`: integer - ID e.g. `3452`
  - `company_id`: integer - Company ID e.g. `2342`
  - `change_reason`: string - Reason for change e.g. `Allowance`
  - `show_in_select`: boolean - Show in select e.g. `true`
- `change_event_status`: object
  - `id`: integer - ID e.g. `29715`
  - `name`: string - Name e.g. `Pending - Revised`
  - `mapped_to_status`: string - Internal status to which the Change Event Status maps e.g. `pending`
  - `show_in_select`: boolean - Whether Change Event is available for GUI selection e.g. `true`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `rfqs`: array of object - Return a list of all Request for Quotes (RFQs) to a specific change event in a project. **NOTE:** If you see `[]`, you might not have permissions to see RFQs for Change Events.
  - `id`: integer - ID e.g. `1199`
  - `commitment_contract_id`: integer - Commitment Contract ID e.g. `418232`
  - `created_at`: string(date-time) - Created at e.g. `2016-06-30T20:41:58Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2016-08-30T18:11:43Z`
  - `description`: string - Description e.g. `Please see attached documentation for Bulletin 3 and provide pricing within 1...`
  - `due_date`: string(date) - Due date e.g. `2016-10-13`
  - `estimated_amount`: number(float) - Estimated amount e.g. `4302.0`
  - `estimated_schedule_impact`: integer - Estimated schedule impact in days e.g. `2`
  - `estimated_status`: string enum[rom, final] - Estimated status e.g. `rom`
  - `intent_to_quote`: boolean - Intent to quote status e.g. `false`
  - `number`: string - Number e.g. `013`
  - `original_quote`: number(float) - Original quote e.g. `4500.0`
  - `position`: integer - Position e.g. `13`
  - `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
  - `prostore_file_ids`: array of integer - Prostore File IDs e.g. `[3423484, 6983730, 2736492]`
  - `status`: string enum[out_for_pricing, revise_and_resubmit, under_review, pending_final_approval, closed, withdrawn] - Status e.g. `under_review`
  - `title`: string - Title e.g. `Field Bulletin #3 - Steel staircase on roof`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-08-30T18:11:43Z`
  - `specification_section`: object - Specification Section
    - `specification_section_id`: integer - ID e.g. `32379`
    - `spec_section_description`: string - Description e.g. `Steel Structure`
    - `spec_section_number`: string - Number e.g. `236400`
  - `quotes`: array of object - Quotes
    - `id`: integer - ID e.g. `105445`
    - `commitment_quote_number`: string - Commitment quote number e.g. `2234`
    - `cost`: number(float) - Cost e.g. `4500.0`
    - `schedule_impact`: integer - Schedule impact e.g. `2`
    - `description`: string - Description e.g. `Need to destroy some of the roofing to install this staircase.`
    - `request_for_quote_id`: integer - RFQ ID e.g. `136264`
    - `attachments_count`: integer - Attachments count e.g. `1`
    - `import_origin_id`: string - Import origin ID e.g. `QWA44H`
    - `created_by_id`: integer - Created by ID — DEPRECATED, please use "created_by" instead e.g. `5136213`
    - `created_at`: string(date-time) - Created at e.g. `2016-10-21T21:39:41Z`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2016-10-23T21:44:45Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2016-10-22T21:41:42Z`
    - `prostore_file_ids`: array of integer - Array of prostore file ids e.g. `[2334, 776843, 22456]`
    - `created_by`: object
  - `responses`: array of object - Responses
    - `id`: integer - ID e.g. `105`
    - `comment`: string - Comment in response to the latest quote e.g. `This quote needs to be revised. See attached files.`
    - `created_at`: string(date-time) - Created at e.g. `2016-10-22T21:39:40Z`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2016-10-30T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2016-10-26T21:39:40Z`
    - `prostore_file_ids`: array of integer - Prostore file IDs e.g. `[3453247, 6543893, 3476145]`
    - `created_by`: object
  - `potential_change_orders`: object
    - `id`: integer - Potential change order id e.g. `570623`
    - `created_at`: string(date-time) - Potential change order created at e.g. `2012-10-23T21:39:40Z`
    - `created_by_id`: integer - Potential change order creator id e.g. `12`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2012-11-24T21:39:40Z`
    - `due_date`: string(date) - Potential change order due date e.g. `2012-11-23`
    - `invoiced_date`: string(date) - Potential change order invoiced date e.g. `2012-10-24`
    - `number`: string - Potential change order number e.g. `004`
    - `paid_date`: string(date) - Potential change order paid date e.g. `2012-11-21`
    - `reviewed_at`: string(date-time) - Potential change order reviewed at e.g. `2012-10-23T21:44:40Z`
    - `title`: string - Potential change order title e.g. `Field Bulletin #3 - Steel staircase on roof`
    - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Potential change order status e.g. `approved`
    - `updated_at`: string(date-time) - Potential change order updated at e.g. `2012-11-23T21:39:40Z`
    - `change_order_request_id`: integer - Change Order Request ID e.g. `283764`
    - `executed`: boolean - Executed (or not) e.g. `false`
    - `grand_total`: string - Grand total e.g. `3329738.0`
    - `revision`: integer - Revision e.g. `4`
    - `schedule_impact_amount`: integer - Schedule impact in days e.g. `2`
    - `change_reason`: string - Change reason e.g. `Deleted`
    - `change_order_request_title`: string - Change Order Request Title e.g. `Concrete freezer slab`
    - `change_order_package_title`: string - Change Order Package Title e.g. `Concrete freezer slab`
    - `potential_change_order_acronym_number`: string - If the change order tier is single tier, an empty string. Otherwise, the PCO acronym and number. e.g. `PCO 95`
    - `change_order_request_acronym_number`: string - If the change order tier is single tier or two-tiered, an empty string. Otherwise, the COR acronym and change order request number. e.g. `COR 9001`
    - `change_order_package_acronym_number`: string - The CCO acronym and change order package number. e.g. `CCO 42`
    - `change_order_tiers`: integer - Number of Change Order Tiers e.g. `3`
  - `change_order_packages`: object
    - `id`: integer - ID e.g. `458661`
    - `contract_id`: integer - Contract ID e.g. `64545`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
    - `due_date`: string(date) - Due date e.g. `2012-11-23`
    - `invoiced_date`: string(date) - Invoiced date e.g. `2012-10-24`
    - `number`: string - Number e.g. `002`
    - `origin_data`: string - Origin data e.g. `OD-123654789`
    - `origin_id`: string - Origin ID e.g. `654987123`
    - `paid_date`: string(date) - Paid date e.g. `2012-11-21`
    - `reviewed_at`: string(date-time) - Reviewed at e.g. `2012-11-23T21:39:40Z`
    - `title`: string - Title e.g. `November Changes`
    - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Status e.g. `approved`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-11-23T21:39:40Z`
  - `commitment_potential_change_orders`: object
    - `id`: integer - Potential change order id e.g. `570623`
    - `created_at`: string(date-time) - Potential change order created at e.g. `2012-10-23T21:39:40Z`
    - `created_by_id`: integer - Potential change order creator id e.g. `12`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2012-11-24T21:39:40Z`
    - `due_date`: string(date) - Potential change order due date e.g. `2012-11-23`
    - `invoiced_date`: string(date) - Potential change order invoiced date e.g. `2012-10-24`
    - `number`: string - Potential change order number e.g. `004`
    - `paid_date`: string(date) - Potential change order paid date e.g. `2012-11-21`
    - `reviewed_at`: string(date-time) - Potential change order reviewed at e.g. `2012-10-23T21:44:40Z`
    - `title`: string - Potential change order title e.g. `Field Bulletin #3 - Steel staircase on roof`
    - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Potential change order status e.g. `approved`
    - `updated_at`: string(date-time) - Potential change order updated at e.g. `2012-11-23T21:39:40Z`
    - `change_order_request_id`: integer - Change Order Request ID e.g. `283764`
    - `executed`: boolean - Executed (or not) e.g. `false`
    - `grand_total`: string - Grand total e.g. `3329738.0`
    - `revision`: integer - Revision e.g. `4`
    - `schedule_impact_amount`: integer - Schedule impact in days e.g. `2`
    - `change_reason`: string - Change reason e.g. `Deleted`
    - `change_order_request_title`: string - Change Order Request Title e.g. `Concrete freezer slab`
    - `change_order_package_title`: string - Change Order Package Title e.g. `Concrete freezer slab`
    - `potential_change_order_acronym_number`: string - If the change order tier is single tier, an empty string. Otherwise, the PCO acronym and number. e.g. `PCO 95`
    - `change_order_request_acronym_number`: string - If the change order tier is single tier or two-tiered, an empty string. Otherwise, the COR acronym and change order request number. e.g. `COR 9001`
    - `change_order_package_acronym_number`: string - The CCO acronym and change order package number. e.g. `CCO 42`
    - `change_order_tiers`: integer - Number of Change Order Tiers e.g. `3`
  - `commitment_change_order_packages`: object
    - `id`: integer - ID e.g. `458661`
    - `contract_id`: integer - Contract ID e.g. `64545`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
    - `due_date`: string(date) - Due date e.g. `2012-11-23`
    - `invoiced_date`: string(date) - Invoiced date e.g. `2012-10-24`
    - `number`: string - Number e.g. `002`
    - `origin_data`: string - Origin data e.g. `OD-123654789`
    - `origin_id`: string - Origin ID e.g. `654987123`
    - `paid_date`: string(date) - Paid date e.g. `2012-11-21`
    - `reviewed_at`: string(date-time) - Reviewed at e.g. `2012-11-23T21:39:40Z`
    - `title`: string - Title e.g. `November Changes`
    - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Status e.g. `approved`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-11-23T21:39:40Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `assigned`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `location`: object
    - `id`: integer - Location ID e.g. `15504`
    - `name`: string - Location name e.g. `1space>1 space`
    - `node_name`: string - Location node name e.g. `1 space`
    - `parent_id`: integer - Location parent id e.g. `788866`
    - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
    - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `cost_code`: oneOf(object | object)
- `currency_configuration`: object - currency configuration information
  - `currency_iso_code`: string - currency ISO code e.g. `USD`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Change Types

Resource id: `change-types`. Raw spec: `../openapi-raw/change-types.json`. Web: https://developers.procore.com/reference/rest/change-types?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/change_types

**List Change Types**
List Change Types

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the Change Type. e.g. `234973`
- `abbreviation`: string - Short code/abbreviation for the Change Type shown in compact UI contexts. Null when no abbreviation is set. e.g. `TR`
- `company_id`: integer - ID of the Company that owns this Change Type. Pass as the company_id query parameter when listing Change Types. e.g. `355282`
- `change_type`: string - Display name of the Change Type (e.g. Transfer, Allowance). e.g. `Transfer`
- `show_in_select`: boolean - Whether this Change Type is available for selection in dropdowns/GUI. e.g. `true`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

