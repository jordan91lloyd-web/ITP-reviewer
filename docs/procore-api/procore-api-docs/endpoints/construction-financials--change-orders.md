# Procore API: Change Orders (Construction Financials)

Source: https://developers.procore.com/reference/rest/ (tool category: Change Orders)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Change Order Change Reasons](#change-order-change-reasons) - versions 2.0, 1.0
- [Change Order Packages](#change-order-packages) - versions 1.0
- [Change Order Requests](#change-order-requests) - versions 1.0
- [Change Order Statuses](#change-order-statuses) - versions 1.0
- [Potential Change Orders](#potential-change-orders) - versions 1.0

## Change Order Change Reasons

Resource id: `change-order-change-reasons`. Raw spec: `../openapi-raw/change-order-change-reasons.json`. Web: https://developers.procore.com/reference/rest/change-order-change-reasons?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/change_order_change_reasons  **[BETA]**

**List Change Order Change Reasons**
List All Possible Change Order Change Reasons for a Specified Company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - Unique string identifier for the change reason. Use as the {id} path parameter to update or delete this change reason. e.g. `101`
  - `change_reason`: string - Human-readable label describing why a change order was raised (e.g. Allowance, Client Request). e.g. `Allowance`
  - `show_in_select`: boolean - When true, this reason appears in change-reason dropdowns in the UI; when false it is hidden from selection. e.g. `true`
  - `deletable`: boolean - True when the reason can be safely deleted; false when it is still referenced by existing change orders. e.g. `true`

Error responses: 400, 401, 403, 409, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/change_order_change_reasons  **[BETA]**

**Create a Change Order Change Reason**
Create a New Change Order Change Reason for a Company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `change_order_change_reason`: object (required)
  - `change_reason`: string - Human-readable label describing why a change order was raised (e.g. Allowance, Client Request). e.g. `Allowance`
  - `show_in_select`: boolean - When true, this reason appears in change-reason dropdowns in the UI; when false it is hidden from selection. e.g. `true`

Response 201 (application/json): object

- `data`: object - Change Order Change Reason
  - `id`: string - Unique string identifier for the change reason. Use as the {id} path parameter to update or delete this change reason. e.g. `101`
  - `change_reason`: string - Human-readable label describing why a change order was raised (e.g. Allowance, Client Request). e.g. `Allowance`
  - `show_in_select`: boolean - When true, this reason appears in change-reason dropdowns in the UI; when false it is hidden from selection. e.g. `true`
  - `deletable`: boolean - True when the reason can be safely deleted; false when it is still referenced by existing change orders. e.g. `true`

Error responses: 400, 401, 403, 422, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/change_order_change_reasons/{id}  **[BETA]**

**Update a Change Order Change Reason**
Update a Specific Change Order Change Reason for a Company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Identifier of the change order change reason to operate on.

Request body (application/json) (required):

- `change_order_change_reason`: object (required)
  - `change_reason`: string - Human-readable label describing why a change order was raised (e.g. Allowance, Client Request). e.g. `Allowance`
  - `show_in_select`: boolean - When true, this reason appears in change-reason dropdowns in the UI; when false it is hidden from selection. e.g. `true`

Response 200 (application/json): object

- `data`: object - Change Order Change Reason
  - `id`: string - Unique string identifier for the change reason. Use as the {id} path parameter to update or delete this change reason. e.g. `101`
  - `change_reason`: string - Human-readable label describing why a change order was raised (e.g. Allowance, Client Request). e.g. `Allowance`
  - `show_in_select`: boolean - When true, this reason appears in change-reason dropdowns in the UI; when false it is hidden from selection. e.g. `true`
  - `deletable`: boolean - True when the reason can be safely deleted; false when it is still referenced by existing change orders. e.g. `true`

Error responses: 400, 401, 403, 404, 422, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/change_order_change_reasons/{id}  **[BETA]**

**Delete a Change Order Change Reason**
Delete a Specific Change Order Change Reason for a Company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Identifier of the change order change reason to operate on.

Response 200: OK (no body)

Error responses: 400, 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/change_order_change_reasons  **[OLDER VERSION - a newer path version exists below/above]**

**List Change Order Change Reasons**
List Change Order Change Reasons

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this change reason. Use as the {id} path parameter on the v2 change order change reason update and delete endpoints. e.g. `3452`
- `company_id`: integer - ID of the company that owns this change reason. Change reasons are configured per company. e.g. `2342`
- `change_reason`: string - Human-readable label describing why a change order was raised (e.g. Allowance, Client Request). e.g. `Allowance`
- `show_in_select`: boolean - When true, this reason appears in change-reason dropdowns in the UI; when false it is hidden from selection but remains on existing records. e.g. `true`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Change Order Packages

Resource id: `change-order-packages`. Raw spec: `../openapi-raw/change-order-packages.json`. Web: https://developers.procore.com/reference/rest/change-order-packages?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/change_order_packages

**List Change Order Packages**
List Change Order Packages.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `contract_id` [query] integer - ID of the contract to scope change order packages to (a Prime, Purchase Order, or Work Order Contract).
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[reviewed_at]` [query] string - Returns item(s) reviewed within the specified ISO 8601 datetime range.
- `filters[due_date]` [query] string - Returns item(s) due within the specified ISO 8601 datetime range.
- `filters[include_deleted]` [query] string enum[only, with] - Use 'only' for only deleted resources. Use 'with' for deleted and undeleted resources.
- `filters[invoiced_date]` [query] string - Returns item(s) invoiced within the specified ISO 8601 datetime range.
- `filters[paid_date]` [query] string - Returns item(s) paid within the specified ISO 8601 datetime range.
- `filters[signed_change_order_received_date]` [query] string - Return item(s) with a signed change order received date within the specified ISO 8601 date range.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this change order package. Use as the {id} path parameter to retrieve or update it. e.g. `239475`
- `contract`: object - Contract details including the associated vendor
  - `vendor`: object - Vendor associated with the contract
    - `id`: integer - Unique identifier for the vendor company on the contract. e.g. `239475`
    - `name`: string - Display name of the vendor company on the contract. e.g. `ABC Contractors`
- `contract_id`: integer - ID of the parent contract this change order package belongs to. e.g. `64545`
- `created_at`: string(date-time) - Timestamp when the change order package was created, in ISO 8601 format. e.g. `2016-10-23T21:39:40Z`
- `created_by_id`: integer - ID of the user who created this change order package. e.g. `1`
- `deleted_at`: string(date-time) - Timestamp when the change order package was deleted, in ISO 8601 format. Null unless the record has been deleted. e.g. `2017-07-29T21:39:40Z`
- `due_date`: string(date) - Date the change order package is due (YYYY-MM-DD). e.g. `2016-10-23`
- `executed`: boolean - When true, the change order package has been fully executed (signed by all parties). e.g. `true`
- `invoiced_date`: string(date) - Date the change order package was invoiced (YYYY-MM-DD). e.g. `2016-10-09`
- `number`: string - Auto-generated, human-readable number identifying the change order package within its contract. e.g. `H-38`
- `origin_code`: string - Code identifying this record in an external or integrated system. e.g. `ABC-123`
- `origin_data`: string - Free-form data payload from the external system that created this record. e.g. `OD-123654789`
- `origin_id`: string - Identifier of this record in an external or integrated system. e.g. `654987123`
- `paid_date`: string(date) - Date the change order package was paid (YYYY-MM-DD). e.g. `2016-10-22`
- `reviewed_at`: string(date-time) - Timestamp when the change order package was reviewed, in ISO 8601 format. e.g. `2016-10-24T15:42:33Z`
- `signed_change_order_received_date`: string(date) - Date the signed change order was received from the vendor (YYYY-MM-DD). e.g. `2016-10-23`
- `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, pending_billable, no_charge, approved, rejected, void] - Status of the change order package. Note: pending_billable is only available in 1-tier change order projects. e.g. `draft`
- `title`: string - Short title summarizing the change order package. e.g. `Additional Time & Materials`
- `updated_at`: string(date-time) - Timestamp when the change order package was last updated, in ISO 8601 format. e.g. `2016-10-23T21:39:40Z`
- `revision`: integer - Revision number for this change order package. This is a manual input field; it is not automatically incremented. e.g. `1`
- `grand_total`: string - Total amount of the change order package including markup. Computed from its line items. e.g. `23474.0`
- `designated_reviewer`: object - User designated to review this change order package.
  - `id`: integer - Unique identifier of the designated reviewer user. e.g. `160586`
  - `login`: string - Email/login of the designated reviewer user. e.g. `carl.contractor@example.com`
  - `name`: string - Full name of the designated reviewer user. e.g. `Carl Contractor`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
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

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/change_order_packages

**Create Change Order Package**
Create Change Order Package

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `345357`
- `contract_id`: integer (required) - ID of the parent contract this change order package belongs to. e.g. `64545`
- `change_order`: object (required)
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, pending_billable, no_charge, approved, rejected, void] - Workflow status of the change order package. Defaults to `draft` when omitted on create. e.g. `draft`
  - `title`: string - Short title summarizing the change order package. e.g. `Additional Time & Materials`
  - `description`: string - Detailed description of the scope or reason for the change order package. e.g. `Additional Time & Materials for October`
  - `schedule_impact_amount`: integer - Estimated impact to the project schedule, in days. e.g. `5`
  - `origin_code`: string - Code identifying this record in an external or integrated system. e.g. `ABC-123`
  - `origin_data`: string - Free-form data payload from the external system that created this record. e.g. `OD-123654789`
  - `origin_id`: string - Identifier of this record in an external or integrated system. e.g. `654987123`
  - `paid_date`: string(date) - Date the change order package was paid (YYYY-MM-DD). e.g. `2016-10-22`
  - `invoiced_date`: string(date) - Date the change order package was invoiced (YYYY-MM-DD). e.g. `2016-10-26`
  - `due_date`: string(date) - Date the change order package is due (YYYY-MM-DD). e.g. `2016-10-23`
  - `executed`: boolean - When true, the change order package has been fully executed (signed by all parties). e.g. `true`
  - `signed_change_order_received_date`: string(date) - Date the signed change order was received from the vendor (YYYY-MM-DD). e.g. `2016-10-23`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this change order package. Use as the {id} path parameter to retrieve or update it. e.g. `239475`
- `contract_id`: integer - ID of the parent contract this change order package belongs to. e.g. `64545`
- `created_at`: string(date-time) - Timestamp when the change order package was created, in ISO 8601 format. e.g. `2016-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the change order package was deleted, in ISO 8601 format. Null unless the record has been deleted. e.g. `2016-10-27T21:39:40Z`
- `description`: string - Detailed description of the scope or reason for the change order package. e.g. `Additional Time & Materials for October`
- `due_date`: string(date) - Date the change order package is due (YYYY-MM-DD). e.g. `2016-10-23`
- `executed`: boolean - When true, the change order package has been fully executed (signed by all parties). e.g. `true`
- `grand_total`: string - Total amount of the change order package including markup. Computed from its line items. e.g. `23474.0`
- `invoiced_date`: string(date) - Date the change order package was invoiced (YYYY-MM-DD). e.g. `2016-10-26`
- `number`: string - Auto-generated, human-readable number identifying the change order package within its contract. e.g. `H-38`
- `origin_code`: string - Code identifying this record in an external or integrated system. e.g. `ABC-123`
- `origin_data`: string - Free-form data payload from the external system that created this record. e.g. `OD-123654789`
- `origin_id`: string - Identifier of this record in an external or integrated system. e.g. `654987123`
- `paid_date`: string(date) - Date the change order package was paid (YYYY-MM-DD). e.g. `2016-11-23T21:39:40Z`
- `position`: integer - Sort position of the change order package relative to others in its contract. e.g. `4`
- `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
- `review_notes`: string - Notes to assist the reviewer e.g. `Make sure Jon sees this before proceeding`
- `reviewed_at`: string(date-time) - Timestamp when the change order package was reviewed, in ISO 8601 format. e.g. `2016-10-24T15:42:33Z`
- `revised_substantial_completion_date`: string(date) - Revised project substantial-completion date resulting from this change order package (YYYY-MM-DD). e.g. `2017-10-30`
- `revision`: integer - Revision number, incremented each time the change order package is revised. e.g. `1`
- `schedule_impact_amount`: integer - Estimated impact to the project schedule, in days. e.g. `5`
- `signed_change_order_received_date`: string(date) - Date the signed change order was received from the vendor (YYYY-MM-DD). e.g. `2016-10-23`
- `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, pending_billable, no_charge, approved, rejected, void] - Workflow status of the change order package. e.g. `draft`
- `title`: string - Short title summarizing the change order package. e.g. `Additional Time & Materials`
- `type`: string enum[PrimeContractChangeOrder, CommitmentContractChangeOrder, ChangeOrderPackage] - Subtype of the change order package indicating which kind of contract it belongs to. e.g. `PrimeContractChangeOrder`
- `updated_at`: string(date-time) - Timestamp when the change order package was last updated, in ISO 8601 format. e.g. `2016-10-26T21:43:40Z`
- `creator`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `designated_reviewer`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `reviewer`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `line_items`: array of object
  - `id`: integer - ID e.g. `453927`
  - `position`: integer - Position e.g. `3`
  - `description`: string - Description e.g. `Extra materials`
  - `quantity`: string(float) - Quantity e.g. `30.0`
  - `uom`: string - Unit of measurement e.g. `lbs`
  - `total_amount`: string(float) - Total amount e.g. `60.0`
  - `extended_amount`: string(float) - Extended amount e.g. `900.0`
  - `cost_code`: oneOf(object | object)
  - `wbs_code`: object
    - `id`: integer - Wbs Code ID e.g. `999`
    - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
    - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
  - `unit_cost`: string(float) - Unit cost e.g. `2.0`
  - `holder`: object - Holder
    - `id`: integer - ID e.g. `233245`
    - `holder_type`: string - Holder type e.g. `WorkOrderContract`
  - `line_item_type`: object - Line Item Type
    - `id`: integer - Line Item Type ID e.g. `12345`
    - `name`: string - Line Item Type name e.g. `Equipment`
    - `code`: string - Code e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
    - `origin_data`: string - Origin data e.g. `OD-2398273424`
    - `origin_id`: string - Origin ID e.g. `ABC123`
  - `markup_line_items`: array of object
    - `id`: integer - Markup Line Item ID e.g. `352362`
    - `amount`: string - Markup Line Item amount
    - `created_at`: string(date-time) - Created at e.g. `2017-08-14T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2017-08-14T21:39:40Z`
    - `markup`: object
    - `currency_configuration`: object
  - `currency_configuration`: object
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
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

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/change_order_packages/{id}

**Show Change Order Package**
Show Change Order Package

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `contract_id` [query] integer - ID of the contract to scope change order packages to (a Prime, Purchase Order, or Work Order Contract).

Response 200 (application/json): object

- `id`: integer - Unique identifier for this change order package. Use as the {id} path parameter to retrieve or update it. e.g. `239475`
- `contract_id`: integer - ID of the parent contract this change order package belongs to. e.g. `64545`
- `created_at`: string(date-time) - Timestamp when the change order package was created, in ISO 8601 format. e.g. `2016-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the change order package was deleted, in ISO 8601 format. Null unless the record has been deleted. e.g. `2016-10-27T21:39:40Z`
- `description`: string - Detailed description of the scope or reason for the change order package. e.g. `Additional Time & Materials for October`
- `due_date`: string(date) - Date the change order package is due (YYYY-MM-DD). e.g. `2016-10-23`
- `executed`: boolean - When true, the change order package has been fully executed (signed by all parties). e.g. `true`
- `grand_total`: string - Total amount of the change order package including markup. Computed from its line items. e.g. `23474.0`
- `invoiced_date`: string(date) - Date the change order package was invoiced (YYYY-MM-DD). e.g. `2016-10-26`
- `number`: string - Auto-generated, human-readable number identifying the change order package within its contract. e.g. `H-38`
- `origin_code`: string - Code identifying this record in an external or integrated system. e.g. `ABC-123`
- `origin_data`: string - Free-form data payload from the external system that created this record. e.g. `OD-123654789`
- `origin_id`: string - Identifier of this record in an external or integrated system. e.g. `654987123`
- `paid_date`: string(date) - Date the change order package was paid (YYYY-MM-DD). e.g. `2016-11-23T21:39:40Z`
- `position`: integer - Sort position of the change order package relative to others in its contract. e.g. `4`
- `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
- `review_notes`: string - Notes to assist the reviewer e.g. `Make sure Jon sees this before proceeding`
- `reviewed_at`: string(date-time) - Timestamp when the change order package was reviewed, in ISO 8601 format. e.g. `2016-10-24T15:42:33Z`
- `revised_substantial_completion_date`: string(date) - Revised project substantial-completion date resulting from this change order package (YYYY-MM-DD). e.g. `2017-10-30`
- `revision`: integer - Revision number, incremented each time the change order package is revised. e.g. `1`
- `schedule_impact_amount`: integer - Estimated impact to the project schedule, in days. e.g. `5`
- `signed_change_order_received_date`: string(date) - Date the signed change order was received from the vendor (YYYY-MM-DD). e.g. `2016-10-23`
- `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, pending_billable, no_charge, approved, rejected, void] - Workflow status of the change order package. e.g. `draft`
- `title`: string - Short title summarizing the change order package. e.g. `Additional Time & Materials`
- `type`: string enum[PrimeContractChangeOrder, CommitmentContractChangeOrder, ChangeOrderPackage] - Subtype of the change order package indicating which kind of contract it belongs to. e.g. `PrimeContractChangeOrder`
- `updated_at`: string(date-time) - Timestamp when the change order package was last updated, in ISO 8601 format. e.g. `2016-10-26T21:43:40Z`
- `creator`: object
  - `id`: integer - Unique identifier of the user. e.g. `160586`
  - `login`: string - Email/login of the user. e.g. `carl.contractor@example.com`
  - `name`: string - Full name of the user. e.g. `Carl Contractor`
- `designated_reviewer`: object
  - `id`: integer - Unique identifier of the user. e.g. `160586`
  - `login`: string - Email/login of the user. e.g. `carl.contractor@example.com`
  - `name`: string - Full name of the user. e.g. `Carl Contractor`
- `reviewer`: object
  - `id`: integer - Unique identifier of the user. e.g. `160586`
  - `login`: string - Email/login of the user. e.g. `carl.contractor@example.com`
  - `name`: string - Full name of the user. e.g. `Carl Contractor`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `line_items`: array of object
  - `id`: integer - ID e.g. `453927`
  - `position`: integer - Position e.g. `3`
  - `description`: string - Description e.g. `Extra materials`
  - `quantity`: string(float) - Quantity e.g. `30.0`
  - `uom`: string - Unit of measurement e.g. `lbs`
  - `total_amount`: string(float) - Total amount e.g. `60.0`
  - `extended_amount`: string(float) - Extended amount e.g. `900.0`
  - `unit_cost`: string(float) - Unit cost e.g. `2.0`
  - `cost_code`: oneOf(object | object)
  - `wbs_code`: object
    - `id`: integer - Wbs Code ID e.g. `999`
    - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
    - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
  - `holder`: object - Holder
    - `id`: integer - ID e.g. `233245`
    - `holder_type`: string - Holder type e.g. `WorkOrderContract`
  - `line_item_type`: object - Line Item Type
    - `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
    - `name`: string - Name for the Line Item Type e.g. `Equipment`
    - `code`: string - Code for the Line Item Type e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
    - `origin_data`: string - Origin data e.g. `OD-2398273424`
    - `origin_id`: string - Origin ID e.g. `ABC123`
  - `markup_line_items`: array of object
    - `id`: integer - Markup Line Item ID e.g. `352362`
    - `amount`: string - Markup Line Item amount
    - `created_at`: string(date-time) - Created at e.g. `2017-08-14T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2017-08-14T21:39:40Z`
    - `markup`: object
    - `currency_configuration`: object
  - `currency_configuration`: object
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
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

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/change_order_packages/{id}

**Update Change Order Package**
Update Change Order Package

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `345357`
- `contract_id`: integer - ID of the parent contract this change order package belongs to. e.g. `64545`
- `change_order`: object (required)
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, pending_billable, no_charge, approved, rejected, void] - Workflow status of the change order package. Defaults to `draft` when omitted on create. e.g. `draft`
  - `title`: string - Short title summarizing the change order package. e.g. `Additional Time & Materials`
  - `description`: string - Detailed description of the scope or reason for the change order package. e.g. `Additional Time & Materials for October`
  - `schedule_impact_amount`: integer - Estimated impact to the project schedule, in days. e.g. `5`
  - `origin_code`: string - Code identifying this record in an external or integrated system. e.g. `ABC-123`
  - `origin_data`: string - Free-form data payload from the external system that created this record. e.g. `OD-123654789`
  - `origin_id`: string - Identifier of this record in an external or integrated system. e.g. `654987123`
  - `paid_date`: string(date) - Date the change order package was paid (YYYY-MM-DD). e.g. `2016-10-22`
  - `invoiced_date`: string(date) - Date the change order package was invoiced (YYYY-MM-DD). e.g. `2016-10-26`
  - `due_date`: string(date) - Date the change order package is due (YYYY-MM-DD). e.g. `2016-10-23`
  - `executed`: boolean - When true, the change order package has been fully executed (signed by all parties). e.g. `true`
  - `signed_change_order_received_date`: string(date) - Date the signed change order was received from the vendor (YYYY-MM-DD). e.g. `2016-10-23`

Response 200 (application/json): object

- `id`: integer - Unique identifier for this change order package. Use as the {id} path parameter to retrieve or update it. e.g. `239475`
- `contract_id`: integer - ID of the parent contract this change order package belongs to. e.g. `64545`
- `created_at`: string(date-time) - Timestamp when the change order package was created, in ISO 8601 format. e.g. `2016-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the change order package was deleted, in ISO 8601 format. Null unless the record has been deleted. e.g. `2016-10-27T21:39:40Z`
- `description`: string - Detailed description of the scope or reason for the change order package. e.g. `Additional Time & Materials for October`
- `due_date`: string(date) - Date the change order package is due (YYYY-MM-DD). e.g. `2016-10-23`
- `executed`: boolean - When true, the change order package has been fully executed (signed by all parties). e.g. `true`
- `grand_total`: string - Total amount of the change order package including markup. Computed from its line items. e.g. `23474.0`
- `invoiced_date`: string(date) - Date the change order package was invoiced (YYYY-MM-DD). e.g. `2016-10-26`
- `number`: string - Auto-generated, human-readable number identifying the change order package within its contract. e.g. `H-38`
- `origin_code`: string - Code identifying this record in an external or integrated system. e.g. `ABC-123`
- `origin_data`: string - Free-form data payload from the external system that created this record. e.g. `OD-123654789`
- `origin_id`: string - Identifier of this record in an external or integrated system. e.g. `654987123`
- `paid_date`: string(date) - Date the change order package was paid (YYYY-MM-DD). e.g. `2016-11-23T21:39:40Z`
- `position`: integer - Sort position of the change order package relative to others in its contract. e.g. `4`
- `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
- `review_notes`: string - Notes to assist the reviewer e.g. `Make sure Jon sees this before proceeding`
- `reviewed_at`: string(date-time) - Timestamp when the change order package was reviewed, in ISO 8601 format. e.g. `2016-10-24T15:42:33Z`
- `revised_substantial_completion_date`: string(date) - Revised project substantial-completion date resulting from this change order package (YYYY-MM-DD). e.g. `2017-10-30`
- `revision`: integer - Revision number, incremented each time the change order package is revised. e.g. `1`
- `schedule_impact_amount`: integer - Estimated impact to the project schedule, in days. e.g. `5`
- `signed_change_order_received_date`: string(date) - Date the signed change order was received from the vendor (YYYY-MM-DD). e.g. `2016-10-23`
- `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, pending_billable, no_charge, approved, rejected, void] - Workflow status of the change order package. e.g. `draft`
- `title`: string - Short title summarizing the change order package. e.g. `Additional Time & Materials`
- `type`: string enum[PrimeContractChangeOrder, CommitmentContractChangeOrder, ChangeOrderPackage] - Subtype of the change order package indicating which kind of contract it belongs to. e.g. `PrimeContractChangeOrder`
- `updated_at`: string(date-time) - Timestamp when the change order package was last updated, in ISO 8601 format. e.g. `2016-10-26T21:43:40Z`
- `creator`: object
  - `id`: integer - Unique identifier of the user. e.g. `160586`
  - `login`: string - Email/login of the user. e.g. `carl.contractor@example.com`
  - `name`: string - Full name of the user. e.g. `Carl Contractor`
- `designated_reviewer`: object
  - `id`: integer - Unique identifier of the user. e.g. `160586`
  - `login`: string - Email/login of the user. e.g. `carl.contractor@example.com`
  - `name`: string - Full name of the user. e.g. `Carl Contractor`
- `reviewer`: object
  - `id`: integer - Unique identifier of the user. e.g. `160586`
  - `login`: string - Email/login of the user. e.g. `carl.contractor@example.com`
  - `name`: string - Full name of the user. e.g. `Carl Contractor`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `line_items`: array of object
  - `id`: integer - ID e.g. `453927`
  - `position`: integer - Position e.g. `3`
  - `description`: string - Description e.g. `Extra materials`
  - `quantity`: string(float) - Quantity e.g. `30.0`
  - `uom`: string - Unit of measurement e.g. `lbs`
  - `total_amount`: string(float) - Total amount e.g. `60.0`
  - `extended_amount`: string(float) - Extended amount e.g. `900.0`
  - `unit_cost`: string(float) - Unit cost e.g. `2.0`
  - `cost_code`: oneOf(object | object)
  - `wbs_code`: object
    - `id`: integer - Wbs Code ID e.g. `999`
    - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
    - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
  - `holder`: object - Holder
    - `id`: integer - ID e.g. `233245`
    - `holder_type`: string - Holder type e.g. `WorkOrderContract`
  - `line_item_type`: object - Line Item Type
    - `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
    - `name`: string - Name for the Line Item Type e.g. `Equipment`
    - `code`: string - Code for the Line Item Type e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
    - `origin_data`: string - Origin data e.g. `OD-2398273424`
    - `origin_id`: string - Origin ID e.g. `ABC123`
  - `markup_line_items`: array of object
    - `id`: integer - Markup Line Item ID e.g. `352362`
    - `amount`: string - Markup Line Item amount
    - `created_at`: string(date-time) - Created at e.g. `2017-08-14T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2017-08-14T21:39:40Z`
    - `markup`: object
    - `currency_configuration`: object
  - `currency_configuration`: object
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
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

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Change Order Requests

Resource id: `change-order-requests`. Raw spec: `../openapi-raw/change-order-requests.json`. Web: https://developers.procore.com/reference/rest/change-order-requests?version=latest
Product lines: Construction Financials

### PATCH /rest/v1.0/change_order_requests/sync

**Sync Change Order Requests**
This endpoint creates or updates a batch of Change Order Requests (COR).
See [Using Sync Actions](/documentation/using-sync-actions) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `contract_id` [query] integer (required) - ID of the contract (Prime, Purchase Order, or Work Order Contract) the change order requests belong to.

Request body (application/json) (required):

- `updates`: array of object (required)
  - `id`: integer - ID of an existing change order request to update. Omit to create a new request. e.g. `1361673`
  - `change_order_package_id`: integer - ID of the change order package (batch) this request belongs to. e.g. `98762`
  - `description`: string - Detailed description of the change order request. May contain HTML. e.g. `<p>Freezer slab replacement</p>`
  - `due_date`: string(date-time) - Date the change order request is due, in ISO 8601 format. e.g. `2016-11-23T21:39:40Z`
  - `invoiced_date`: string(date) - Date the change order request was invoiced (YYYY-MM-DD). e.g. `2017-08-22`
  - `number`: string - Human-readable number identifying the change order request within its contract. e.g. `B22`
  - `origin_data`: string(string) - Free-form data payload from the external system that created this record. e.g. `OD-2398273424`
  - `origin_id`: string(string) - Identifier of this record in an external or integrated system. e.g. `459247544`
  - `paid_date`: string(date) - Date the change order request was paid (YYYY-MM-DD). e.g. `2017-08-25`
  - `revision`: integer - Revision number, incremented each time the change order request is revised. e.g. `1`
  - `schedule_impact_amount`: integer - Estimated impact to the project schedule, in days. e.g. `2`
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, pending_billable, no_charge, approved, rejected, void] - Workflow status of the change order request. Defaults to `draft` when omitted on create. e.g. `draft`
  - `title`: string - Short title summarizing the change order request. e.g. `Concrete freezer slab`

Response 200 (application/json): object

- `entities`: array of object
  - `id`: integer - Unique identifier for this change order request. Use as the {id} path parameter to retrieve or update it. e.g. `3284756`
  - `change_order_package_id`: integer - ID of the change order package (batch) this request belongs to. Null when not assigned to a package. e.g. `2372497`
  - `contract_id`: integer - ID of the parent contract this change order request belongs to. e.g. `195735`
  - `created_at`: string(date-time) - Timestamp when the change order request was created, in ISO 8601 format. e.g. `2016-10-23T21:39:40Z`
  - `executed`: boolean - When true, the change order request has been fully executed (signed by all parties). e.g. `false`
  - `creator`: object - User who created this change order request.
    - `id`: integer - Unique identifier of the user. e.g. `160586`
    - `login`: string - Email/login of the user. e.g. `carl.contractor@example.com`
    - `name`: string - Full name of the user. e.g. `Carl Contractor`
  - `deleted_at`: string(date-time) - Timestamp when the change order request was deleted, in ISO 8601 format. Null unless the record has been deleted. e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Detailed description of the change order request. May contain HTML. e.g. `<p>Freezer slab replacement</p>`
  - `due_date`: string(date-time) - Date the change order request is due, in ISO 8601 format. e.g. `2016-11-23T21:39:40Z`
  - `grand_total`: string(float) - Total amount of the change order request including markup. Computed from its line items. e.g. `34535.0`
  - `total_tax_amount`: string - Total tax on the Change Order Request, aggregated from the line-item tax details of its associated change orders, in the contract's currency. Returned only in the `extended` view. Decimal encoded as a string. e.g. `150.0`
  - `invoiced_date`: string(date) - Date the change order request was invoiced (YYYY-MM-DD). e.g. `2017-08-22`
  - `number`: string - Human-readable number identifying the change order request within its contract. e.g. `B22`
  - `origin_data`: string - Free-form data payload from the external system that created this record. e.g. `OD-2398273424`
  - `origin_id`: string - Identifier of this record in an external or integrated system. e.g. `459247544`
  - `paid_date`: string(date) - Date the change order request was paid (YYYY-MM-DD). e.g. `2017-08-25`
  - `position`: integer - Sort position of the change order request relative to others in its contract. e.g. `4`
  - `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
  - `revision`: integer - Revision number, incremented each time the change order request is revised. e.g. `3`
  - `schedule_impact_amount`: integer - Estimated impact to the project schedule, in days. e.g. `2`
  - `signed_change_order_received_date`: string(date) - Date the signed change order was received from the vendor (YYYY-MM-DD). e.g. `2025-08-27`
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, pending_billable, no_charge, approved, rejected, void] - Workflow status of the change order request. e.g. `draft`
  - `title`: string - Short title summarizing the change order request. e.g. `Concrete freezer slab`
  - `updated_at`: string(date-time) - Timestamp when the change order request was last updated, in ISO 8601 format. e.g. `2016-10-25T21:39:40Z`
  - `attachments`: array of object
    - `id`: integer
    - `name`: string - Use :name, :filename to be deprecated
    - `url`: string
    - `filename`: string - :filename to be deprecated, use :name
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `contract`: object - Contract details (present if associated contract exists)
    - `id`: integer - Contract ID e.g. `195735`
    - `number`: string - Contract number e.g. `C-001`
    - `title`: string - Contract title e.g. `Main Concrete Package`
    - `type`: string - Contract type e.g. `prime_contract`
    - `status`: string - Contract status e.g. `draft`
    - `vendor`: object - Vendor associated to the contract (if applicable)
  - `batch`: object - Change Order Batch this request belongs to (if any)
    - `id`: integer - Batch ID e.g. `2372497`
    - `title`: string - Batch title e.g. `Batch 1 - Site Prep`
    - `number`: string - Batch number e.g. `B-001`
    - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, pending_billable, no_charge, approved, rejected, void] - Workflow status of the change order batch. e.g. `draft`
- `errors`: array of object
  - `id`: integer - ID e.g. `3284756`
  - `change_order_package_id`: integer - Change Order Package ID e.g. `2372497`
  - `contract_id`: integer - Contract ID e.g. `195735`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `creator`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Description e.g. `<p>Freezer slab replacement</p>`
  - `due_date`: string(date-time) - Due date e.g. `2016-11-23T21:39:40Z`
  - `grand_total`: string(float) - Total including markup e.g. `34535.0`
  - `invoiced_date`: string(date) - Invoiced date e.g. `2017-08-22`
  - `number`: string - Number e.g. `B22`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `459247544`
  - `paid_date`: string(date) - Paid date e.g. `2017-08-25`
  - `position`: integer - Position e.g. `4`
  - `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
  - `revision`: integer - Revision e.g. `3`
  - `schedule_impact_amount`: integer - Schedule impact in days e.g. `2`
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Status e.g. `draft`
  - `title`: string - Title e.g. `Concrete freezer slab`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-25T21:39:40Z`
  - `errors`: object
    - `field_name`: array of string

Error responses: 401, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/change_order_requests

**List Change Order Requests**
Return a list of all Change Order Requests (COR) to a specific Contract in a Project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `contract_id` [query] integer (required) - ID of the contract (Prime, Purchase Order, or Work Order Contract) the change order requests belong to.
- `view` [query] string enum[extended] - Parameter affecting the level of detail returned. The `extended` view includes the total tax amount for each Change Order Request.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[due_date]` [query] string - Returns item(s) due within the specified ISO 8601 datetime range.
- `filters[invoiced_date]` [query] string - Returns item(s) invoiced within the specified ISO 8601 datetime range.
- `filters[paid_date]` [query] string - Returns item(s) paid within the specified ISO 8601 datetime range.
- `filters[change_order_package_id]` [query] integer - Returns item(s) that belong to selected change order package.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[status]` [query] array of string - Returns item(s) matching the specified status value.
- `filters[not_status]` [query] array of string - Array of Status. Return item(s) that does not have specified status.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this change order request. Use as the {id} path parameter to retrieve or update it. e.g. `3284756`
- `created_at`: string(date-time) - Timestamp when the change order request was created, in ISO 8601 format. e.g. `2016-10-23T21:39:40Z`
- `created_by_id`: integer - ID of the user who created this change order request. e.g. `1`
- `deleted_at`: string(date-time) - Timestamp when the change order request was deleted, in ISO 8601 format. Null unless the record has been deleted. e.g. `2017-07-29T21:39:40Z`
- `due_date`: string(date) - Date the change order request is due (YYYY-MM-DD). e.g. `2016-11-23T21:39:40Z`
- `invoiced_date`: string(date) - Date the change order request was invoiced (YYYY-MM-DD). e.g. `2017-08-22`
- `number`: string - Human-readable number identifying the change order request within its contract. e.g. `B22`
- `paid_date`: string(date) - Date the change order request was paid (YYYY-MM-DD). e.g. `2017-08-25`
- `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, pending_billable, no_charge, approved, rejected, void] - Workflow status of the change order request. e.g. `draft`
- `title`: string - Short title summarizing the change order request. e.g. `Concrete freezer slab`
- `change_order_package_id`: integer - ID of the change order package (batch) this request belongs to. Null when not assigned to a package. e.g. `2372497`
- `updated_at`: string(date-time) - Timestamp when the change order request was last updated, in ISO 8601 format. e.g. `2016-10-25T21:39:40Z`
- `revision`: integer - Revision number, incremented each time the change order request is revised. e.g. `1`
- `grand_total`: string - Total amount of the change order request including markup. Computed from its line items. e.g. `23474.0`
- `total_tax_amount`: string - Total tax on the Change Order Request, aggregated from the line-item tax details of its associated change orders, in the contract's currency. Returned only in the `extended` view. Decimal encoded as a string. e.g. `150.0`
- `schedule_impact_amount`: integer - Estimated impact to the project schedule, in days. e.g. `2`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`

Error responses: 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/change_order_requests

**Create Change Order Request**
Create Change Order Request (COR).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `38276`
- `contract_id`: integer (required) - ID of the contract (Prime or Commitment Contract) the change order request belongs to. e.g. `957294`
- `change_order`: object (required)
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`
  - `change_order_package_id`: integer - ID of the change order package (batch) this request belongs to. e.g. `98762`
  - `description`: string - Detailed description of the change order request. May contain HTML. e.g. `<p>Freezer slab replacement</p>`
  - `due_date`: string(date-time) - Date the change order request is due, in ISO 8601 format. e.g. `2016-11-23T21:39:40Z`
  - `invoiced_date`: string(date) - Date the change order request was invoiced (YYYY-MM-DD). e.g. `2017-08-22`
  - `number`: string - Human-readable number identifying the change order request within its contract. e.g. `B22`
  - `origin_data`: string(string) - Free-form data payload from the external system that created this record. e.g. `OD-2398273424`
  - `origin_id`: string(string) - Identifier of this record in an external or integrated system. e.g. `459247544`
  - `paid_date`: string(date) - Date the change order request was paid. Accepts any valid date parseable by the server; YYYY-MM-DD is recommended. e.g. `2017-08-25`
  - `revision`: integer - Revision number for this change order request. This is a manual input field; it is not automatically incremented. e.g. `1`
  - `schedule_impact_amount`: integer - Estimated impact to the project schedule, in days. e.g. `2`
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Status of the change order request. Defaults to `draft` when omitted on create. e.g. `draft`
  - `title`: string - Short title summarizing the change order request. e.g. `Concrete freezer slab`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this change order request. Use as the {id} path parameter to retrieve or update it. e.g. `3284756`
- `contract_id`: integer - ID of the parent contract this change order request belongs to. e.g. `195735`
- `created_at`: string(date-time) - Timestamp when the change order request was created, in ISO 8601 format. e.g. `2016-10-23T21:39:40Z`
- `creator`: object - User who created this change order request.
  - `id`: integer - Unique identifier of the user. e.g. `160586`
  - `login`: string - Email/login of the user. e.g. `carl.contractor@example.com`
  - `name`: string - Full name of the user. e.g. `Carl Contractor`
- `description`: string - Detailed description of the change order request. May contain HTML. e.g. `<p>Freezer slab replacement</p>`
- `due_date`: string(date-time) - Date the change order request is due, in ISO 8601 format. e.g. `2016-11-23T21:39:40Z`
- `grand_total`: string(float) - Total amount of the change order request including markup. Computed from its line items. e.g. `34535.0`
- `invoiced_date`: string(date) - Date the change order request was invoiced (YYYY-MM-DD). e.g. `2017-08-22`
- `number`: string - Human-readable number identifying the change order request within its contract. e.g. `B22`
- `origin_data`: string - Free-form data payload from the external system that created this record. e.g. `OD-2398273424`
- `origin_id`: string - Identifier of this record in an external or integrated system. e.g. `459247544`
- `paid_date`: string(date) - Date the change order request was paid (YYYY-MM-DD). e.g. `2017-08-25`
- `position`: integer - Sort position of the change order request relative to others in its contract. e.g. `4`
- `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
- `revision`: integer - Revision number, incremented each time the change order request is revised. e.g. `3`
- `schedule_impact_amount`: integer - Estimated impact to the project schedule, in days. e.g. `2`
- `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, pending_billable, no_charge, approved, rejected, void] - Workflow status of the change order request. e.g. `draft`
- `title`: string - Short title summarizing the change order request. e.g. `Concrete freezer slab`
- `updated_at`: string(date-time) - Timestamp when the change order request was last updated, in ISO 8601 format. e.g. `2016-10-25T21:39:40Z`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/change_order_requests/{id}

**Show Change Order Request**
Return detailed information about a specified Change Order Request (COR).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `contract_id` [query] integer (required) - ID of the contract (Prime, Purchase Order, or Work Order Contract) the change order requests belong to.
- `view` [query] string enum[extended] - Parameter affecting the level of detail returned. The `extended` view includes the total tax amount for the Change Order Request.
- `filters[include_deleted]` [query] string enum[only, with] - Use 'only' for only deleted resources. Use 'with' for deleted and undeleted resources.

Response 200 (application/json): object

- `id`: integer - Unique identifier for this change order request. Use as the {id} path parameter to retrieve or update it. e.g. `3284756`
- `change_order_package_id`: integer - ID of the change order package (batch) this request belongs to. Null when not assigned to a package. e.g. `2372497`
- `contract_id`: integer - ID of the parent contract this change order request belongs to. e.g. `195735`
- `created_at`: string(date-time) - Timestamp when the change order request was created, in ISO 8601 format. e.g. `2016-10-23T21:39:40Z`
- `executed`: boolean - When true, the change order request has been fully executed (signed by all parties). e.g. `false`
- `creator`: object - User who created this change order request.
  - `id`: integer - Unique identifier of the user. e.g. `160586`
  - `login`: string - Email/login of the user. e.g. `carl.contractor@example.com`
  - `name`: string - Full name of the user. e.g. `Carl Contractor`
- `deleted_at`: string(date-time) - Timestamp when the change order request was deleted, in ISO 8601 format. Null unless the record has been deleted. e.g. `2017-07-29T21:39:40Z`
- `description`: string - Detailed description of the change order request. May contain HTML. e.g. `<p>Freezer slab replacement</p>`
- `due_date`: string(date-time) - Date the change order request is due, in ISO 8601 format. e.g. `2016-11-23T21:39:40Z`
- `grand_total`: string(float) - Total amount of the change order request including markup. Computed from its line items. e.g. `34535.0`
- `total_tax_amount`: string - Total tax on the Change Order Request, aggregated from the line-item tax details of its associated change orders, in the contract's currency. Returned only in the `extended` view. Decimal encoded as a string. e.g. `150.0`
- `invoiced_date`: string(date) - Date the change order request was invoiced (YYYY-MM-DD). e.g. `2017-08-22`
- `number`: string - Human-readable number identifying the change order request within its contract. e.g. `B22`
- `origin_data`: string - Free-form data payload from the external system that created this record. e.g. `OD-2398273424`
- `origin_id`: string - Identifier of this record in an external or integrated system. e.g. `459247544`
- `paid_date`: string(date) - Date the change order request was paid (YYYY-MM-DD). e.g. `2017-08-25`
- `position`: integer - Sort position of the change order request relative to others in its contract. e.g. `4`
- `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
- `revision`: integer - Revision number, incremented each time the change order request is revised. e.g. `3`
- `schedule_impact_amount`: integer - Estimated impact to the project schedule, in days. e.g. `2`
- `signed_change_order_received_date`: string(date) - Date the signed change order was received from the vendor (YYYY-MM-DD). e.g. `2025-08-27`
- `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, pending_billable, no_charge, approved, rejected, void] - Workflow status of the change order request. e.g. `draft`
- `title`: string - Short title summarizing the change order request. e.g. `Concrete freezer slab`
- `updated_at`: string(date-time) - Timestamp when the change order request was last updated, in ISO 8601 format. e.g. `2016-10-25T21:39:40Z`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
- `contract`: object - Contract details (present if associated contract exists)
  - `id`: integer - Contract ID e.g. `195735`
  - `number`: string - Contract number e.g. `C-001`
  - `title`: string - Contract title e.g. `Main Concrete Package`
  - `type`: string - Contract type e.g. `prime_contract`
  - `status`: string - Contract status e.g. `draft`
  - `vendor`: object - Vendor associated to the contract (if applicable)
    - `id`: integer - Vendor ID e.g. `998877`
    - `name`: string - Vendor name e.g. `Acme Concrete LLC`
- `batch`: object - Change Order Batch this request belongs to (if any)
  - `id`: integer - Batch ID e.g. `2372497`
  - `title`: string - Batch title e.g. `Batch 1 - Site Prep`
  - `number`: string - Batch number e.g. `B-001`
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, pending_billable, no_charge, approved, rejected, void] - Workflow status of the change order batch. e.g. `draft`

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/change_order_requests/{id}

**Update Change Order Request**
Update information about a specific Change Order Request (COR).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `38276`
- `contract_id`: integer (required) - ID of the contract (Prime or Commitment Contract) the change order request belongs to. e.g. `957294`
- `change_order`: object (required)
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`
  - `change_order_package_id`: integer - ID of the change order package (batch) this request belongs to. e.g. `98762`
  - `description`: string - Detailed description of the change order request. May contain HTML. e.g. `<p>Freezer slab replacement</p>`
  - `due_date`: string(date-time) - Date the change order request is due, in ISO 8601 format. e.g. `2016-11-23T21:39:40Z`
  - `invoiced_date`: string(date) - Date the change order request was invoiced (YYYY-MM-DD). e.g. `2017-08-22`
  - `number`: string - Human-readable number identifying the change order request within its contract. e.g. `B22`
  - `origin_data`: string(string) - Free-form data payload from the external system that created this record. e.g. `OD-2398273424`
  - `origin_id`: string(string) - Identifier of this record in an external or integrated system. e.g. `459247544`
  - `paid_date`: string(date) - Date the change order request was paid. Accepts any valid date parseable by the server; YYYY-MM-DD is recommended. e.g. `2017-08-25`
  - `revision`: integer - Revision number for this change order request. This is a manual input field; it is not automatically incremented. e.g. `1`
  - `schedule_impact_amount`: integer - Estimated impact to the project schedule, in days. e.g. `2`
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Status of the change order request. Defaults to `draft` when omitted on create. e.g. `draft`
  - `title`: string - Short title summarizing the change order request. e.g. `Concrete freezer slab`

Response 200 (application/json): object

- `id`: integer - Unique identifier for this change order request. Use as the {id} path parameter to retrieve or update it. e.g. `3284756`
- `change_order_package_id`: integer - ID of the change order package (batch) this request belongs to. Null when not assigned to a package. e.g. `2372497`
- `contract_id`: integer - ID of the parent contract this change order request belongs to. e.g. `195735`
- `created_at`: string(date-time) - Timestamp when the change order request was created, in ISO 8601 format. e.g. `2016-10-23T21:39:40Z`
- `executed`: boolean - When true, the change order request has been fully executed (signed by all parties). e.g. `false`
- `creator`: object - User who created this change order request.
  - `id`: integer - Unique identifier of the user. e.g. `160586`
  - `login`: string - Email/login of the user. e.g. `carl.contractor@example.com`
  - `name`: string - Full name of the user. e.g. `Carl Contractor`
- `deleted_at`: string(date-time) - Timestamp when the change order request was deleted, in ISO 8601 format. Null unless the record has been deleted. e.g. `2017-07-29T21:39:40Z`
- `description`: string - Detailed description of the change order request. May contain HTML. e.g. `<p>Freezer slab replacement</p>`
- `due_date`: string(date-time) - Date the change order request is due, in ISO 8601 format. e.g. `2016-11-23T21:39:40Z`
- `grand_total`: string(float) - Total amount of the change order request including markup. Computed from its line items. e.g. `34535.0`
- `total_tax_amount`: string - Total tax on the Change Order Request, aggregated from the line-item tax details of its associated change orders, in the contract's currency. Returned only in the `extended` view. Decimal encoded as a string. e.g. `150.0`
- `invoiced_date`: string(date) - Date the change order request was invoiced (YYYY-MM-DD). e.g. `2017-08-22`
- `number`: string - Human-readable number identifying the change order request within its contract. e.g. `B22`
- `origin_data`: string - Free-form data payload from the external system that created this record. e.g. `OD-2398273424`
- `origin_id`: string - Identifier of this record in an external or integrated system. e.g. `459247544`
- `paid_date`: string(date) - Date the change order request was paid (YYYY-MM-DD). e.g. `2017-08-25`
- `position`: integer - Sort position of the change order request relative to others in its contract. e.g. `4`
- `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
- `revision`: integer - Revision number, incremented each time the change order request is revised. e.g. `3`
- `schedule_impact_amount`: integer - Estimated impact to the project schedule, in days. e.g. `2`
- `signed_change_order_received_date`: string(date) - Date the signed change order was received from the vendor (YYYY-MM-DD). e.g. `2025-08-27`
- `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, pending_billable, no_charge, approved, rejected, void] - Workflow status of the change order request. e.g. `draft`
- `title`: string - Short title summarizing the change order request. e.g. `Concrete freezer slab`
- `updated_at`: string(date-time) - Timestamp when the change order request was last updated, in ISO 8601 format. e.g. `2016-10-25T21:39:40Z`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
- `contract`: object - Contract details (present if associated contract exists)
  - `id`: integer - Contract ID e.g. `195735`
  - `number`: string - Contract number e.g. `C-001`
  - `title`: string - Contract title e.g. `Main Concrete Package`
  - `type`: string - Contract type e.g. `prime_contract`
  - `status`: string - Contract status e.g. `draft`
  - `vendor`: object - Vendor associated to the contract (if applicable)
    - `id`: integer - Vendor ID e.g. `998877`
    - `name`: string - Vendor name e.g. `Acme Concrete LLC`
- `batch`: object - Change Order Batch this request belongs to (if any)
  - `id`: integer - Batch ID e.g. `2372497`
  - `title`: string - Batch title e.g. `Batch 1 - Site Prep`
  - `number`: string - Batch number e.g. `B-001`
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, pending_billable, no_charge, approved, rejected, void] - Workflow status of the change order batch. e.g. `draft`

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Change Order Statuses

Resource id: `change-order-statuses`. Raw spec: `../openapi-raw/change-order-statuses.json`. Web: https://developers.procore.com/reference/rest/change-order-statuses?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/change_order/statuses

**List Change Order Statuses**
Return a list of all Change Order Statuses.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this company-defined change order status. e.g. `324737`
- `name`: string - Display name of the custom change order status (e.g. No Charge). e.g. `No Charge`
- `mapped_to_status`: string - The built-in system status this custom status maps to for workflow and reporting purposes (e.g. approved, pending, draft). e.g. `approved`
- `show_in_select`: boolean - When true, this status is selectable in change order status dropdowns in the UI. e.g. `true`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Potential Change Orders

Resource id: `potential-change-orders`. Raw spec: `../openapi-raw/potential-change-orders.json`. Web: https://developers.procore.com/reference/rest/potential-change-orders?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/potential_change_orders/{potential_change_order_id}/line_items

**List Potential Change Order Line Items**
Return a list of all Potential Change Order Line Items.
Change Event Line Item information is only returned if a line item is associated to a change event line item and user can view change events.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.
Note: A v2.0 version of this endpoint is available and recommended for new integrations. Use the v2.0 change order line items endpoints, depending on the change order type: GET /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_change_orders/{prime_change_order_id}/line_items or GET /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_change_orders/{commitment_change_order_id}/line_items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `potential_change_order_id` [path] integer (required) - Potential Change Order ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[cost_code_id]` [query] string - Cost Code ID. Returns item(s) with the specified Cost Code ID or within the specified range of Cost Code IDs.
- `filters[line_item_type_id]` [query] integer - Line Item Type ID. Returns item(s) with the specified Line Item Type ID or range of Line Item Type IDs.

Response 200 (application/json): array of object

- `id`: integer - Line Item id e.g. `4896147`
- `amount`: string - Line Item amount e.g. `1000.0`
- `company`: object - Company
  - `id`: integer - ID e.g. `163215`
  - `name`: string - Name e.g. `Procore Tech`
- `cost_code`: object
  - `id`: integer - Unique identifier for this Cost Code record. e.g. `12345`
  - `biller`: string - Display name of the entity (project or sub job) that owns this cost code. e.g. `Campus`
  - `biller_id`: integer - Procore ID of the owning project or sub job. Use with biller_type to identify the owning entity. e.g. `12345`
  - `biller_type`: string enum[Project, SubJob] - Type of entity that owns this cost code. One of: 'Project' (a standard project) or 'SubJob' (a sub job within the project). e.g. `Project`
  - `biller_origin_id`: string - ERP origin ID of the owning project or sub job. Null when no ERP origin has been set. e.g. `98765`
  - `budgeted`: boolean - Whether this cost code has been marked as budgeted. True when at least one budget line item exists for this cost code. e.g. `false`
  - `code`: string - Cost code segment, not including the parent prefix. For example, for full code "02-300", this field is "300". e.g. `300`
  - `created_at`: string(date-time) - Timestamp when this cost code was created, in ISO 8601 format. e.g. `2015-05-15T00:00:00Z`
  - `deleted_at`: string(date-time) - Timestamp when this cost code was soft-deleted, in ISO 8601 format. Null when the record is active. e.g. `2017-07-29T21:39:40Z`
  - `full_code`: string - Full cost code including all parent prefixes (e.g. "02-300"). e.g. `02-300`
  - `name`: string - Display name of the cost code. e.g. `Earthwork`
  - `origin_data`: string - Free-form third-party metadata string from the ERP system. Null when no ERP origin data has been set. e.g. `OD-129947`
  - `origin_id`: string - ERP system identifier for this cost code. Used by sync operations to match records across systems. e.g. `9874484`
  - `parent`: object - The immediate parent cost code of this record, if any.
    - `id`: integer - Procore ID of this cost code's parent cost code. Null for root-level cost codes. e.g. `2345`
  - `position`: integer - Sort order of this cost code within its parent. e.g. `1`
  - `sortable_code`: string - Deprecated alias for full_code. Use full_code instead. Included for backwards compatibility. e.g. `02-300`
  - `standard_cost_code_id`: integer - ID of the company-level standard cost code that this project cost code was created from. Null when not derived from a standard list. e.g. `122334`
  - `standard_cost_code_list_id`: integer - ID of the company-level standard cost code list associated with this cost code via its standard cost code. Null when not linked to a standard list. Only present in the extended view. e.g. `133445`
  - `updated_at`: string(date-time) - Timestamp when this cost code was last updated, in ISO 8601 format. e.g. `2015-05-15T00:00:00Z`
  - `line_item_types`: array of object - Array of line item types (cost types) assigned to this cost code. Each entry represents one Cost Code / Line Item Type assignment.
    - `id`: integer - Unique identifier for the Line Item Type. e.g. `12345`
    - `name`: string - Display name of the Line Item Type. e.g. `Equipment`
    - `code`: string - Short code used for CSV import of this Line Item Type. e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, labor, other] - Canonical cost category for this line item type. One of: 'equipment', 'materials', 'commitment', 'owner_cost', 'professional_services', 'labor', 'other'. e.g. `materials`
    - `origin_id`: string - ERP system identifier for this line item type. Null when not linked to an ERP system. e.g. `ABC123`
- `created_at`: string(date-time) - Created at date and time e.g. `2016-08-01T23:33:54Z`
- `description`: string - Line Item description e.g. `Cleanup`
- `extended_type`: string enum[manual, calculated] - Line Item extended type e.g. `calculated`
- `holder`: object - Holder
  - `id`: integer - ID e.g. `233245`
  - `holder_type`: string - Holder type e.g. `WorkOrderContract`
- `line_item_type`: object - Line Item Type
  - `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
  - `name`: string - Name for the Line Item Type e.g. `Equipment`
  - `code`: string - Code for the Line Item Type e.g. `LB`
  - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`
- `origin_data`: string - Line Item third party data e.g. `OD-39823232`
- `origin_id`: string - Line Item third party id e.g. `239233`
- `position`: integer - Line Item position e.g. `1`
- `project`: object - Project
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name e.g. `Children's Hospital`
- `quantity`: string(float) - Line Item quantity e.g. `10.0`
- `tax_code_id`: integer - Tax Code ID e.g. `1`
- `total_amount`: string(float) - Line Item total amount e.g. `1000.0`
- `extended_amount`: string(float) - Line Item extended amount e.g. `900.0`
- `unit_cost`: string(float) - Line Item unit cost e.g. `100.0`
- `uom`: string - Line Item units of measure e.g. `Lbs`
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
- `updated_at`: string(date-time) - Updated at date and time e.g. `2016-09-01T21:33:54Z`
- `change_event_line_item`: object - Change Event Line Item
  - `id`: integer - Change Event Line Item ID e.g. `5`
  - `cost_rom`: string(float) - Change Event Line Item Cost ROM e.g. `100.0`
  - `revenue_rom`: string(float) - Change Event Line Item Revenue ROM e.g. `200.0`
  - `event_id`: integer - Change Event ID e.g. `6`
  - `cost_code`: oneOf(object | object)
  - `line_item_type`: object - Line Item Type
    - `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
    - `name`: string - Name for the Line Item Type e.g. `Equipment`
    - `code`: string - Code for the Line Item Type e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
    - `origin_data`: string - Origin data e.g. `OD-2398273424`
    - `origin_id`: string - Origin ID e.g. `ABC123`
  - `currency_configuration`: object
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`
- `currency_configuration`: object
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/potential_change_orders/{potential_change_order_id}/line_items

**Create Potential Change Order Line Item**
Create a Potential Change Order Line Item.
Note: For non-budgeted line items, a corresponding budget line item may be created automatically.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `potential_change_order_id` [path] integer (required) - Potential Change Order ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `34567`
- `line_item`: object (required) - The Line Item object
  - `amount`: string - Total amount for this line item, as a decimal string. When extended_type is "calculated", this is derived from quantity multiplied by unit_cost. When extended_type is "manual", this value is set directly and takes pre... e.g. `1000.0`
  - `cost_code_id`: integer - ID of the Cost Code this line item is charged against. Must belong to the project's cost code list. e.g. `77408196`
  - `description`: string - Free-text description of the work or item this line covers. e.g. `Cleanup`
  - `extended_type`: string enum[manual, calculated] - How the line item amount is derived. Use "calculated" to compute amount from quantity and unit cost, or "manual" to set the amount directly. e.g. `calculated`
  - `quantity`: string - Number of units for this line item, as a decimal string. e.g. `20.0`
  - `line_item_type_id`: integer - ID of the Line Item Type (cost classification such as labor, material, or equipment) applied to this line item. e.g. `5085801`
  - `origin_data`: string - Free-form metadata from an external system, stored to help correlate this line item with its source record. e.g. `AC-1234`
  - `origin_id`: string - Identifier of this line item in the external system it was imported from. Use to match records during integrations. e.g. `55555`
  - `tax_code_id`: integer - ID of the Tax Code applied to this line item, if any. e.g. `1`
  - `unit_cost`: string - Cost per unit, as a decimal string. Multiplied by quantity to compute amount when extended_type is "calculated". e.g. `50.00`
  - `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure for the quantity. Must be a unit present in the company's Units of Measure list. e.g. `Hours`
  - `wbs_code_id`: integer - ID of the Work Breakdown Structure (WBS) code this line item is assigned to. e.g. `34567`

Response 201 (application/json): object

- `id`: integer - Line Item id e.g. `4896147`
- `amount`: string - Line Item amount e.g. `1000.0`
- `company`: object - Company
  - `id`: integer - ID e.g. `163215`
  - `name`: string - Name e.g. `Procore Tech`
- `cost_code`: object
  - `id`: integer - Unique identifier for this Cost Code record. e.g. `12345`
  - `biller`: string - Display name of the entity (project or sub job) that owns this cost code. e.g. `Campus`
  - `biller_id`: integer - Procore ID of the owning project or sub job. Use with biller_type to identify the owning entity. e.g. `12345`
  - `biller_type`: string enum[Project, SubJob] - Type of entity that owns this cost code. One of: 'Project' (a standard project) or 'SubJob' (a sub job within the project). e.g. `Project`
  - `biller_origin_id`: string - ERP origin ID of the owning project or sub job. Null when no ERP origin has been set. e.g. `98765`
  - `budgeted`: boolean - Whether this cost code has been marked as budgeted. True when at least one budget line item exists for this cost code. e.g. `false`
  - `code`: string - Cost code segment, not including the parent prefix. For example, for full code "02-300", this field is "300". e.g. `300`
  - `created_at`: string(date-time) - Timestamp when this cost code was created, in ISO 8601 format. e.g. `2015-05-15T00:00:00Z`
  - `deleted_at`: string(date-time) - Timestamp when this cost code was soft-deleted, in ISO 8601 format. Null when the record is active. e.g. `2017-07-29T21:39:40Z`
  - `full_code`: string - Full cost code including all parent prefixes (e.g. "02-300"). e.g. `02-300`
  - `name`: string - Display name of the cost code. e.g. `Earthwork`
  - `origin_data`: string - Free-form third-party metadata string from the ERP system. Null when no ERP origin data has been set. e.g. `OD-129947`
  - `origin_id`: string - ERP system identifier for this cost code. Used by sync operations to match records across systems. e.g. `9874484`
  - `parent`: object - The immediate parent cost code of this record, if any.
    - `id`: integer - Procore ID of this cost code's parent cost code. Null for root-level cost codes. e.g. `2345`
  - `position`: integer - Sort order of this cost code within its parent. e.g. `1`
  - `sortable_code`: string - Deprecated alias for full_code. Use full_code instead. Included for backwards compatibility. e.g. `02-300`
  - `standard_cost_code_id`: integer - ID of the company-level standard cost code that this project cost code was created from. Null when not derived from a standard list. e.g. `122334`
  - `standard_cost_code_list_id`: integer - ID of the company-level standard cost code list associated with this cost code via its standard cost code. Null when not linked to a standard list. Only present in the extended view. e.g. `133445`
  - `updated_at`: string(date-time) - Timestamp when this cost code was last updated, in ISO 8601 format. e.g. `2015-05-15T00:00:00Z`
  - `line_item_types`: array of object - Array of line item types (cost types) assigned to this cost code. Each entry represents one Cost Code / Line Item Type assignment.
    - `id`: integer - Unique identifier for the Line Item Type. e.g. `12345`
    - `name`: string - Display name of the Line Item Type. e.g. `Equipment`
    - `code`: string - Short code used for CSV import of this Line Item Type. e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, labor, other] - Canonical cost category for this line item type. One of: 'equipment', 'materials', 'commitment', 'owner_cost', 'professional_services', 'labor', 'other'. e.g. `materials`
    - `origin_id`: string - ERP system identifier for this line item type. Null when not linked to an ERP system. e.g. `ABC123`
- `created_at`: string(date-time) - Created at date and time e.g. `2016-08-01T23:33:54Z`
- `description`: string - Line Item description e.g. `Cleanup`
- `extended_type`: string enum[manual, calculated] - Line Item extended type e.g. `calculated`
- `holder`: object - Holder
  - `id`: integer - ID e.g. `233245`
  - `holder_type`: string - Holder type e.g. `WorkOrderContract`
- `line_item_type`: object - Line Item Type
  - `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
  - `name`: string - Name for the Line Item Type e.g. `Equipment`
  - `code`: string - Code for the Line Item Type e.g. `LB`
  - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`
- `origin_data`: string - Line Item third party data e.g. `OD-39823232`
- `origin_id`: string - Line Item third party id e.g. `239233`
- `position`: integer - Line Item position e.g. `1`
- `project`: object - Project
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name e.g. `Children's Hospital`
- `quantity`: string(float) - Line Item quantity e.g. `10.0`
- `tax_code_id`: integer - Tax Code ID e.g. `1`
- `total_amount`: string(float) - Line Item total amount e.g. `1000.0`
- `extended_amount`: string(float) - Line Item extended amount e.g. `900.0`
- `unit_cost`: string(float) - Line Item unit cost e.g. `100.0`
- `uom`: string - Line Item units of measure e.g. `Lbs`
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
- `updated_at`: string(date-time) - Updated at date and time e.g. `2016-09-01T21:33:54Z`
- `change_event_line_item`: object - Change Event Line Item
  - `id`: integer - Change Event Line Item ID e.g. `5`
  - `cost_rom`: string(float) - Change Event Line Item Cost ROM e.g. `100.0`
  - `revenue_rom`: string(float) - Change Event Line Item Revenue ROM e.g. `200.0`
  - `event_id`: integer - Change Event ID e.g. `6`
  - `cost_code`: oneOf(object | object)
  - `line_item_type`: object - Line Item Type
    - `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
    - `name`: string - Name for the Line Item Type e.g. `Equipment`
    - `code`: string - Code for the Line Item Type e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
    - `origin_data`: string - Origin data e.g. `OD-2398273424`
    - `origin_id`: string - Origin ID e.g. `ABC123`
  - `currency_configuration`: object
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`
- `currency_configuration`: object
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/potential_change_orders/{potential_change_order_id}/line_items/{id}

**Show Potential Change Order Line Item**
Return a Potential Change Order Line Item.
Change Event Line Item information is only returned if a line item is associated to a change event line item and user can view change events.
Note: A v2.0 version of this endpoint is available and recommended for new integrations. Use the v2.0 change order line items endpoints, depending on the change order type: GET /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_change_orders/{prime_change_order_id}/line_items/{id} or GET /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_change_orders/{commitment_change_order_id}/line_items/{id}.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `potential_change_order_id` [path] integer (required) - Potential Change Order ID
- `id` [path] integer (required) - Unique identifier of the Potential Change Order Line Item.
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Line Item id e.g. `4896147`
- `amount`: string - Line Item amount e.g. `1000.0`
- `company`: object - Company
  - `id`: integer - ID e.g. `163215`
  - `name`: string - Name e.g. `Procore Tech`
- `cost_code`: object
  - `id`: integer - Unique identifier for this Cost Code record. e.g. `12345`
  - `biller`: string - Display name of the entity (project or sub job) that owns this cost code. e.g. `Campus`
  - `biller_id`: integer - Procore ID of the owning project or sub job. Use with biller_type to identify the owning entity. e.g. `12345`
  - `biller_type`: string enum[Project, SubJob] - Type of entity that owns this cost code. One of: 'Project' (a standard project) or 'SubJob' (a sub job within the project). e.g. `Project`
  - `biller_origin_id`: string - ERP origin ID of the owning project or sub job. Null when no ERP origin has been set. e.g. `98765`
  - `budgeted`: boolean - Whether this cost code has been marked as budgeted. True when at least one budget line item exists for this cost code. e.g. `false`
  - `code`: string - Cost code segment, not including the parent prefix. For example, for full code "02-300", this field is "300". e.g. `300`
  - `created_at`: string(date-time) - Timestamp when this cost code was created, in ISO 8601 format. e.g. `2015-05-15T00:00:00Z`
  - `deleted_at`: string(date-time) - Timestamp when this cost code was soft-deleted, in ISO 8601 format. Null when the record is active. e.g. `2017-07-29T21:39:40Z`
  - `full_code`: string - Full cost code including all parent prefixes (e.g. "02-300"). e.g. `02-300`
  - `name`: string - Display name of the cost code. e.g. `Earthwork`
  - `origin_data`: string - Free-form third-party metadata string from the ERP system. Null when no ERP origin data has been set. e.g. `OD-129947`
  - `origin_id`: string - ERP system identifier for this cost code. Used by sync operations to match records across systems. e.g. `9874484`
  - `parent`: object - The immediate parent cost code of this record, if any.
    - `id`: integer - Procore ID of this cost code's parent cost code. Null for root-level cost codes. e.g. `2345`
  - `position`: integer - Sort order of this cost code within its parent. e.g. `1`
  - `sortable_code`: string - Deprecated alias for full_code. Use full_code instead. Included for backwards compatibility. e.g. `02-300`
  - `standard_cost_code_id`: integer - ID of the company-level standard cost code that this project cost code was created from. Null when not derived from a standard list. e.g. `122334`
  - `standard_cost_code_list_id`: integer - ID of the company-level standard cost code list associated with this cost code via its standard cost code. Null when not linked to a standard list. Only present in the extended view. e.g. `133445`
  - `updated_at`: string(date-time) - Timestamp when this cost code was last updated, in ISO 8601 format. e.g. `2015-05-15T00:00:00Z`
  - `line_item_types`: array of object - Array of line item types (cost types) assigned to this cost code. Each entry represents one Cost Code / Line Item Type assignment.
    - `id`: integer - Unique identifier for the Line Item Type. e.g. `12345`
    - `name`: string - Display name of the Line Item Type. e.g. `Equipment`
    - `code`: string - Short code used for CSV import of this Line Item Type. e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, labor, other] - Canonical cost category for this line item type. One of: 'equipment', 'materials', 'commitment', 'owner_cost', 'professional_services', 'labor', 'other'. e.g. `materials`
    - `origin_id`: string - ERP system identifier for this line item type. Null when not linked to an ERP system. e.g. `ABC123`
- `created_at`: string(date-time) - Created at date and time e.g. `2016-08-01T23:33:54Z`
- `description`: string - Line Item description e.g. `Cleanup`
- `extended_type`: string enum[manual, calculated] - Line Item extended type e.g. `calculated`
- `holder`: object - Holder
  - `id`: integer - ID e.g. `233245`
  - `holder_type`: string - Holder type e.g. `WorkOrderContract`
- `line_item_type`: object - Line Item Type
  - `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
  - `name`: string - Name for the Line Item Type e.g. `Equipment`
  - `code`: string - Code for the Line Item Type e.g. `LB`
  - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`
- `origin_data`: string - Line Item third party data e.g. `OD-39823232`
- `origin_id`: string - Line Item third party id e.g. `239233`
- `position`: integer - Line Item position e.g. `1`
- `project`: object - Project
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name e.g. `Children's Hospital`
- `quantity`: string(float) - Line Item quantity e.g. `10.0`
- `tax_code_id`: integer - Tax Code ID e.g. `1`
- `total_amount`: string(float) - Line Item total amount e.g. `1000.0`
- `extended_amount`: string(float) - Line Item extended amount e.g. `900.0`
- `unit_cost`: string(float) - Line Item unit cost e.g. `100.0`
- `uom`: string - Line Item units of measure e.g. `Lbs`
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
- `updated_at`: string(date-time) - Updated at date and time e.g. `2016-09-01T21:33:54Z`
- `change_event_line_item`: object - Change Event Line Item
  - `id`: integer - Change Event Line Item ID e.g. `5`
  - `cost_rom`: string(float) - Change Event Line Item Cost ROM e.g. `100.0`
  - `revenue_rom`: string(float) - Change Event Line Item Revenue ROM e.g. `200.0`
  - `event_id`: integer - Change Event ID e.g. `6`
  - `cost_code`: oneOf(object | object)
  - `line_item_type`: object - Line Item Type
    - `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
    - `name`: string - Name for the Line Item Type e.g. `Equipment`
    - `code`: string - Code for the Line Item Type e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
    - `origin_data`: string - Origin data e.g. `OD-2398273424`
    - `origin_id`: string - Origin ID e.g. `ABC123`
  - `currency_configuration`: object
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`
- `currency_configuration`: object
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/potential_change_orders/{potential_change_order_id}/line_items/{id}

**Update Potential Change Order Line Item**
Update a Potential Change Order Line Item.
Note: For non-budgeted line items, a corresponding budget line item may be created automatically.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `potential_change_order_id` [path] integer (required) - Potential Change Order ID
- `id` [path] integer (required) - Unique identifier of the Potential Change Order Line Item.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `34567`
- `line_item`: object (required) - The Line Item object
  - `amount`: string - Total amount for this line item, as a decimal string. When extended_type is "calculated", this is derived from quantity multiplied by unit_cost. When extended_type is "manual", this value is set directly and takes pre... e.g. `1000.0`
  - `cost_code_id`: integer - ID of the Cost Code this line item is charged against. Must belong to the project's cost code list. e.g. `77408196`
  - `description`: string - Free-text description of the work or item this line covers. e.g. `Cleanup`
  - `extended_type`: string enum[manual, calculated] - How the line item amount is derived. Use "calculated" to compute amount from quantity and unit cost, or "manual" to set the amount directly. e.g. `calculated`
  - `quantity`: string - Number of units for this line item, as a decimal string. e.g. `20.0`
  - `line_item_type_id`: integer - ID of the Line Item Type (cost classification such as labor, material, or equipment) applied to this line item. e.g. `5085801`
  - `origin_data`: string - Free-form metadata from an external system, stored to help correlate this line item with its source record. e.g. `AC-1234`
  - `origin_id`: string - Identifier of this line item in the external system it was imported from. Use to match records during integrations. e.g. `55555`
  - `tax_code_id`: integer - ID of the Tax Code applied to this line item, if any. e.g. `1`
  - `unit_cost`: string - Cost per unit, as a decimal string. Multiplied by quantity to compute amount when extended_type is "calculated". e.g. `50.00`
  - `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure for the quantity. Must be a unit present in the company's Units of Measure list. e.g. `Hours`
  - `wbs_code_id`: integer - ID of the Work Breakdown Structure (WBS) code this line item is assigned to. e.g. `34567`

Response 200 (application/json): object

- `id`: integer - Line Item id e.g. `4896147`
- `amount`: string - Line Item amount e.g. `1000.0`
- `company`: object - Company
  - `id`: integer - ID e.g. `163215`
  - `name`: string - Name e.g. `Procore Tech`
- `cost_code`: object
  - `id`: integer - Unique identifier for this Cost Code record. e.g. `12345`
  - `biller`: string - Display name of the entity (project or sub job) that owns this cost code. e.g. `Campus`
  - `biller_id`: integer - Procore ID of the owning project or sub job. Use with biller_type to identify the owning entity. e.g. `12345`
  - `biller_type`: string enum[Project, SubJob] - Type of entity that owns this cost code. One of: 'Project' (a standard project) or 'SubJob' (a sub job within the project). e.g. `Project`
  - `biller_origin_id`: string - ERP origin ID of the owning project or sub job. Null when no ERP origin has been set. e.g. `98765`
  - `budgeted`: boolean - Whether this cost code has been marked as budgeted. True when at least one budget line item exists for this cost code. e.g. `false`
  - `code`: string - Cost code segment, not including the parent prefix. For example, for full code "02-300", this field is "300". e.g. `300`
  - `created_at`: string(date-time) - Timestamp when this cost code was created, in ISO 8601 format. e.g. `2015-05-15T00:00:00Z`
  - `deleted_at`: string(date-time) - Timestamp when this cost code was soft-deleted, in ISO 8601 format. Null when the record is active. e.g. `2017-07-29T21:39:40Z`
  - `full_code`: string - Full cost code including all parent prefixes (e.g. "02-300"). e.g. `02-300`
  - `name`: string - Display name of the cost code. e.g. `Earthwork`
  - `origin_data`: string - Free-form third-party metadata string from the ERP system. Null when no ERP origin data has been set. e.g. `OD-129947`
  - `origin_id`: string - ERP system identifier for this cost code. Used by sync operations to match records across systems. e.g. `9874484`
  - `parent`: object - The immediate parent cost code of this record, if any.
    - `id`: integer - Procore ID of this cost code's parent cost code. Null for root-level cost codes. e.g. `2345`
  - `position`: integer - Sort order of this cost code within its parent. e.g. `1`
  - `sortable_code`: string - Deprecated alias for full_code. Use full_code instead. Included for backwards compatibility. e.g. `02-300`
  - `standard_cost_code_id`: integer - ID of the company-level standard cost code that this project cost code was created from. Null when not derived from a standard list. e.g. `122334`
  - `standard_cost_code_list_id`: integer - ID of the company-level standard cost code list associated with this cost code via its standard cost code. Null when not linked to a standard list. Only present in the extended view. e.g. `133445`
  - `updated_at`: string(date-time) - Timestamp when this cost code was last updated, in ISO 8601 format. e.g. `2015-05-15T00:00:00Z`
  - `line_item_types`: array of object - Array of line item types (cost types) assigned to this cost code. Each entry represents one Cost Code / Line Item Type assignment.
    - `id`: integer - Unique identifier for the Line Item Type. e.g. `12345`
    - `name`: string - Display name of the Line Item Type. e.g. `Equipment`
    - `code`: string - Short code used for CSV import of this Line Item Type. e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, labor, other] - Canonical cost category for this line item type. One of: 'equipment', 'materials', 'commitment', 'owner_cost', 'professional_services', 'labor', 'other'. e.g. `materials`
    - `origin_id`: string - ERP system identifier for this line item type. Null when not linked to an ERP system. e.g. `ABC123`
- `created_at`: string(date-time) - Created at date and time e.g. `2016-08-01T23:33:54Z`
- `description`: string - Line Item description e.g. `Cleanup`
- `extended_type`: string enum[manual, calculated] - Line Item extended type e.g. `calculated`
- `holder`: object - Holder
  - `id`: integer - ID e.g. `233245`
  - `holder_type`: string - Holder type e.g. `WorkOrderContract`
- `line_item_type`: object - Line Item Type
  - `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
  - `name`: string - Name for the Line Item Type e.g. `Equipment`
  - `code`: string - Code for the Line Item Type e.g. `LB`
  - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`
- `origin_data`: string - Line Item third party data e.g. `OD-39823232`
- `origin_id`: string - Line Item third party id e.g. `239233`
- `position`: integer - Line Item position e.g. `1`
- `project`: object - Project
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name e.g. `Children's Hospital`
- `quantity`: string(float) - Line Item quantity e.g. `10.0`
- `tax_code_id`: integer - Tax Code ID e.g. `1`
- `total_amount`: string(float) - Line Item total amount e.g. `1000.0`
- `extended_amount`: string(float) - Line Item extended amount e.g. `900.0`
- `unit_cost`: string(float) - Line Item unit cost e.g. `100.0`
- `uom`: string - Line Item units of measure e.g. `Lbs`
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
- `updated_at`: string(date-time) - Updated at date and time e.g. `2016-09-01T21:33:54Z`
- `change_event_line_item`: object - Change Event Line Item
  - `id`: integer - Change Event Line Item ID e.g. `5`
  - `cost_rom`: string(float) - Change Event Line Item Cost ROM e.g. `100.0`
  - `revenue_rom`: string(float) - Change Event Line Item Revenue ROM e.g. `200.0`
  - `event_id`: integer - Change Event ID e.g. `6`
  - `cost_code`: oneOf(object | object)
  - `line_item_type`: object - Line Item Type
    - `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
    - `name`: string - Name for the Line Item Type e.g. `Equipment`
    - `code`: string - Code for the Line Item Type e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
    - `origin_data`: string - Origin data e.g. `OD-2398273424`
    - `origin_id`: string - Origin ID e.g. `ABC123`
  - `currency_configuration`: object
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`
- `currency_configuration`: object
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/potential_change_orders/{potential_change_order_id}/line_items/{id}

**Delete Potential Change Order Line Item**
Delete a Potential Change Order Line Item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `potential_change_order_id` [path] integer (required) - Potential Change Order ID
- `id` [path] integer (required) - Unique identifier of the Potential Change Order Line Item.
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/potential_change_orders/{potential_change_order_id}/line_items/sync

**Sync Potential Change Order Line Items**
This endpoint creates or updates a batch of Potential Change Order Line Items.
See [Using Sync Actions](/documentation/using-sync-actions) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `potential_change_order_id` [path] integer (required) - Potential Change Order ID

Request body (application/json) (required):

- `updates`: array of object (required)
  - `amount`: string - Total amount for this line item (quantity multiplied by unit cost), as a decimal string. e.g. `1000.0`
  - `cost_code_id`: integer - ID of the Cost Code this line item is charged against. Must belong to the project's cost code list. e.g. `77408196`
  - `description`: string - Free-text description of the work or item this line covers. e.g. `Cleanup`
  - `extended_type`: string enum[manual, calculated] - How the line item amount is derived. Use "calculated" to compute amount from quantity and unit cost, or "manual" to set the amount directly. e.g. `calculated`
  - `quantity`: string - Number of units for this line item, as a decimal string. Combined with unit_cost when extended_type is "calculated". e.g. `20.0`
  - `line_item_type_id`: integer - ID of the Line Item Type (cost classification such as labor, material, or equipment) applied to this line item. e.g. `5085801`
  - `origin_data`: string - Free-form metadata from an external system, stored to help correlate this line item with its source record. e.g. `AC-1234`
  - `origin_id`: string - Identifier of this line item in the external system it was imported from. Use to match records during integrations. e.g. `55555`
  - `tax_code_id`: integer - ID of the Tax Code applied to this line item, if any. e.g. `1`
  - `unit_cost`: string - Cost per unit, as a decimal string. Multiplied by quantity to compute amount when extended_type is "calculated". e.g. `50.00`
  - `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure for the quantity. Must be a unit present in the company's Units of Measure list. e.g. `Hours`
  - `wbs_code_id`: integer - ID of the Work Breakdown Structure (WBS) code this line item is assigned to. e.g. `34567`

Response 200 (application/json): object

- `entities`: array of object
  - `id`: integer - Line Item id e.g. `4896147`
  - `amount`: string - Line Item amount e.g. `1000.0`
  - `company`: object - Company
    - `id`: integer - ID e.g. `163215`
    - `name`: string - Name e.g. `Procore Tech`
  - `cost_code`: object
    - `id`: integer - Unique identifier for this Cost Code record. e.g. `12345`
    - `biller`: string - Display name of the entity (project or sub job) that owns this cost code. e.g. `Campus`
    - `biller_id`: integer - Procore ID of the owning project or sub job. Use with biller_type to identify the owning entity. e.g. `12345`
    - `biller_type`: string enum[Project, SubJob] - Type of entity that owns this cost code. One of: 'Project' (a standard project) or 'SubJob' (a sub job within the project). e.g. `Project`
    - `biller_origin_id`: string - ERP origin ID of the owning project or sub job. Null when no ERP origin has been set. e.g. `98765`
    - `budgeted`: boolean - Whether this cost code has been marked as budgeted. True when at least one budget line item exists for this cost code. e.g. `false`
    - `code`: string - Cost code segment, not including the parent prefix. For example, for full code "02-300", this field is "300". e.g. `300`
    - `created_at`: string(date-time) - Timestamp when this cost code was created, in ISO 8601 format. e.g. `2015-05-15T00:00:00Z`
    - `deleted_at`: string(date-time) - Timestamp when this cost code was soft-deleted, in ISO 8601 format. Null when the record is active. e.g. `2017-07-29T21:39:40Z`
    - `full_code`: string - Full cost code including all parent prefixes (e.g. "02-300"). e.g. `02-300`
    - `name`: string - Display name of the cost code. e.g. `Earthwork`
    - `origin_data`: string - Free-form third-party metadata string from the ERP system. Null when no ERP origin data has been set. e.g. `OD-129947`
    - `origin_id`: string - ERP system identifier for this cost code. Used by sync operations to match records across systems. e.g. `9874484`
    - `parent`: object - The immediate parent cost code of this record, if any.
    - `position`: integer - Sort order of this cost code within its parent. e.g. `1`
    - `sortable_code`: string - Deprecated alias for full_code. Use full_code instead. Included for backwards compatibility. e.g. `02-300`
    - `standard_cost_code_id`: integer - ID of the company-level standard cost code that this project cost code was created from. Null when not derived from a standard list. e.g. `122334`
    - `standard_cost_code_list_id`: integer - ID of the company-level standard cost code list associated with this cost code via its standard cost code. Null when not linked to a standard list. Only present in the extended view. e.g. `133445`
    - `updated_at`: string(date-time) - Timestamp when this cost code was last updated, in ISO 8601 format. e.g. `2015-05-15T00:00:00Z`
    - `line_item_types`: array of object - Array of line item types (cost types) assigned to this cost code. Each entry represents one Cost Code / Line Item Type assignment.
  - `created_at`: string(date-time) - Created at date and time e.g. `2016-08-01T23:33:54Z`
  - `description`: string - Line Item description e.g. `Cleanup`
  - `extended_type`: string enum[manual, calculated] - Line Item extended type e.g. `calculated`
  - `holder`: object - Holder
    - `id`: integer - ID e.g. `233245`
    - `holder_type`: string - Holder type e.g. `WorkOrderContract`
  - `line_item_type`: object - Line Item Type
    - `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
    - `name`: string - Name for the Line Item Type e.g. `Equipment`
    - `code`: string - Code for the Line Item Type e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
    - `origin_data`: string - Origin data e.g. `OD-2398273424`
    - `origin_id`: string - Origin ID e.g. `ABC123`
  - `origin_data`: string - Line Item third party data e.g. `OD-39823232`
  - `origin_id`: string - Line Item third party id e.g. `239233`
  - `position`: integer - Line Item position e.g. `1`
  - `project`: object - Project
    - `id`: integer - ID e.g. `123456`
    - `name`: string - Name e.g. `Children's Hospital`
  - `quantity`: string(float) - Line Item quantity e.g. `10.0`
  - `tax_code_id`: integer - Tax Code ID e.g. `1`
  - `total_amount`: string(float) - Line Item total amount e.g. `1000.0`
  - `extended_amount`: string(float) - Line Item extended amount e.g. `900.0`
  - `unit_cost`: string(float) - Line Item unit cost e.g. `100.0`
  - `uom`: string - Line Item units of measure e.g. `Lbs`
  - `wbs_code`: object
    - `id`: integer - Wbs Code ID e.g. `999`
    - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
    - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
  - `updated_at`: string(date-time) - Updated at date and time e.g. `2016-09-01T21:33:54Z`
  - `change_event_line_item`: object - Change Event Line Item
    - `id`: integer - Change Event Line Item ID e.g. `5`
    - `cost_rom`: string(float) - Change Event Line Item Cost ROM e.g. `100.0`
    - `revenue_rom`: string(float) - Change Event Line Item Revenue ROM e.g. `200.0`
    - `event_id`: integer - Change Event ID e.g. `6`
    - `cost_code`: oneOf(object | object)
    - `line_item_type`: object - Line Item Type
    - `currency_configuration`: object
  - `currency_configuration`: object
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`
- `errors`: array of object
  - `id`: integer - Line Item id e.g. `4896147`
  - `amount`: string - Line Item amount e.g. `1000.0`
  - `company`: object - Company
    - `id`: integer - ID e.g. `163215`
    - `name`: string - Name e.g. `Procore Tech`
  - `cost_code`: oneOf(object | object)
  - `created_at`: string(date-time) - Created at date and time e.g. `2016-08-01T23:33:54Z`
  - `description`: string - Line Item description e.g. `Cleanup`
  - `extended_type`: string enum[manual, calculated] - Line Item extended type e.g. `calculated`
  - `holder`: object - Holder
    - `id`: integer - ID e.g. `233245`
    - `holder_type`: string - Holder type e.g. `DirectCost::Item`
  - `line_item_type`: object - Line Item Type
    - `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
    - `name`: string - Name for the Line Item Type e.g. `Equipment`
    - `code`: string - Code for the Line Item Type e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
    - `origin_data`: string - Origin data e.g. `OD-2398273424`
    - `origin_id`: string - Origin ID e.g. `ABC123`
  - `origin_data`: string - Line Item third party data e.g. `OD-39823232`
  - `origin_id`: string - Line Item third party id e.g. `239233`
  - `position`: integer - Line Item position e.g. `1`
  - `project`: object - Project
    - `id`: integer - ID e.g. `123456`
    - `name`: string - Name e.g. `Children's Hospital`
  - `quantity`: string(float) - Line Item quantity e.g. `10.0`
  - `tax_code_id`: integer - Tax Code ID e.g. `1`
  - `total_amount`: string(float) - Line Item total amount e.g. `1000.0`
  - `extended_amount`: string(float) - Line Item extended amount e.g. `900.0`
  - `unit_cost`: string(float) - Line Item unit cost e.g. `100.0`
  - `uom`: string - Line Item units of measure e.g. `Lbs`
  - `updated_at`: string(date-time) - Updated at date and time e.g. `2016-09-01T21:33:54Z`
  - `change_event_line_item`: object - Change Event Line Item
    - `id`: integer - Change Event Line Item ID e.g. `5`
    - `cost_rom`: string(float) - Change Event Line Item Cost ROM e.g. `100.0`
    - `revenue_rom`: string(float) - Change Event Line Item Revenue ROM e.g. `200.0`
    - `event_id`: integer - Change Event ID e.g. `6`
    - `cost_code`: oneOf(object | object)
    - `line_item_type`: object - Line Item Type
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/potential_change_orders/sync

**Sync Potential Change Orders**
This endpoint creates or updates a batch of Potential Change Orders (PCO).
See [Using Sync Actions](/documentation/using-sync-actions) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `contract_id` [query] integer (required) - ID of the contract (prime or commitment) whose potential change orders this request targets.

Request body (application/json) (required):

- `updates`: array of object (required)
  - `change_order_request_id`: integer - ID of the Change Order Request (COR) this PCO belongs to. Used on multi-tier contract configurations to group the PCO under a request. e.g. `56490`
  - `change_order_request`: object
    - `change_order_package_id`: integer - ID of the Change Order Package the PCO's Change Order Request is assigned to. Applies to two-tier contract configurations. e.g. `875689`
  - `commitment_change_event_id`: integer - ID of the commitment Change Event this PCO was generated from. Set when the contract is a commitment. e.g. `135314`
  - `description`: string - Free-text description of the scope of this change order. e.g. `Freezer slab replacement`
  - `due_date`: string(date-time) - Date by which the change order is due, in ISO 8601 format. e.g. `2017-08-19T21:39:40Z`
  - `invoiced_date`: string(date) - Date the change order was invoiced (YYYY-MM-DD). e.g. `2017-08-19`
  - `number`: string - Human-readable change order number, unique within the contract. e.g. `C34`
  - `origin_data`: string - Free-form metadata from an external system, stored to correlate this PCO with its source record. e.g. `OD-2398273424`
  - `origin_id`: string - Identifier of this PCO in the external system it was imported from. Use to match records during integrations. e.g. `459247544`
  - `paid_date`: string(date) - Date the change order was paid (YYYY-MM-DD). e.g. `2017-08-18`
  - `prime_change_event_id`: integer - ID of the prime contract Change Event this PCO was generated from. Set when the contract is a prime contract. e.g. `135314`
  - `schedule_impact_amount`: integer - Estimated impact of this change order on the project schedule, in days. e.g. `2`
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Workflow status of the change order. Ignored on projects where the tool is configured for single-tier change orders. e.g. `draft`
  - `title`: string - Short title summarizing the change order. e.g. `Concrete freezer slab`
  - `currency_exchange_rate`: string - Exchange rate used to convert from the change order's currency to the project's currency. Accepted only on projects where multicurrency conversion is available. e.g. `20.0`

Response 200 (application/json): object

- `entities`: array of object
  - `id`: integer - Unique identifier for this Potential Change Order. Use as the {id} path parameter to retrieve, update, or delete it. e.g. `2843048`
  - `accounting_method`: string enum[amount, unit] - How the change order is priced: "amount" for a lump-sum total or "unit" for quantity-times-unit-cost line items. e.g. `unit`
  - `change_order_change_reason_id`: integer - ID of the change reason assigned to this PCO, if change reasons are enabled for the project. e.g. `847264`
  - `change_order_request_id`: integer - ID of the Change Order Request (COR) this PCO belongs to, on multi-tier contract configurations. e.g. `283764`
  - `commitment_change_event_id`: integer - ID of the commitment Change Event this PCO was generated from. Set when the contract is a commitment. e.g. `135314`
  - `contract_id`: integer - ID of the contract (prime or commitment) this PCO belongs to. e.g. `304485`
  - `created_at`: string(date-time) - Timestamp when the PCO was created, in ISO 8601 format. e.g. `2017-08-14T21:39:40Z`
  - `creator`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `deleted_at`: string(date-time) - Timestamp when the PCO was soft-deleted, in ISO 8601 format. Null for active PCOs. e.g. `2017-11-10T21:39:40Z`
  - `description`: string - Free-text description of the scope of this change order. e.g. `Freezer slab replacement`
  - `designated_reviewer`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `due_date`: string(date-time) - Date by which the change order is due, in ISO 8601 format. e.g. `2017-08-19T21:39:40Z`
  - `field_change`: boolean - True when this change order originated as a field change (a change identified in the field rather than through the office workflow). e.g. `true`
  - `grand_total`: string(float) - Total value of the change order including markup, as a decimal string. e.g. `37593.0`
  - `invoiced_date`: string(date) - Date the change order was invoiced (YYYY-MM-DD). e.g. `2017-08-18`
  - `attachments`: array of object
    - `id`: integer
    - `name`: string - Use :name, :filename to be deprecated
    - `url`: string
    - `filename`: string - :filename to be deprecated, use :name
  - `line_items`: array of object
    - `id`: integer - Unique identifier for this change order line item. e.g. `238473`
    - `position`: integer - Ordering position of this line item within the change order. e.g. `3`
    - `description`: string - Free-text description of the work or item this line covers. e.g. `Concrete slab`
    - `quantity`: number(float) - Number of units for this line item, in the given unit of measure. e.g. `2000`
    - `uom`: string - Unit of measure for the quantity (a unit from the company's Units of Measure list). e.g. `lbs`
    - `total_amount`: string(float) - Total amount for this line item, as a decimal string. e.g. `100.0`
    - `extended_amount`: string(float) - Line item amount after applied markup, as a decimal string. e.g. `900.0`
    - `cost_code_id`: integer - ID of the Cost Code this line item is charged against. e.g. `383762`
    - `tax_code_id`: integer - ID of the Tax Code applied to this line item, if any. e.g. `1`
    - `unit_cost`: number(float) - Cost per unit, as a decimal. Multiplied by quantity to compute the line item amount. e.g. `0.05`
    - `cost_code`: oneOf(object | object)
    - `line_item_type`: object - Line Item Type
    - `markup_line_items`: array of object
    - `currency_configuration`: object
  - `line_items_extended_total`: string(float) - Sum of all line item extended amounts (after markup), as a decimal string. e.g. `100.0`
  - `line_items_total`: string(float) - Sum of all line item amounts (before markup), as a decimal string. e.g. `100.0`
  - `location_id`: integer - ID of the project location this change order is associated with. e.g. `438264`
  - `number`: string - Human-readable change order number, unique within the contract. e.g. `C34`
  - `origin_data`: string - Free-form metadata from an external system, stored to correlate this PCO with its source record. e.g. `OD-2398273424`
  - `origin_id`: string - Identifier of this PCO in the external system it was imported from. Use to match records during integrations. e.g. `459247544`
  - `paid`: boolean - True when the change order has been marked as paid. e.g. `true`
  - `paid_date`: string(date) - Date the change order was paid (YYYY-MM-DD). e.g. `2017-08-18`
  - `position`: integer - Ordering position of this PCO within its contract. e.g. `3`
  - `prime_change_event_id`: integer - ID of the prime contract Change Event this PCO was generated from. Set when the contract is a prime contract. e.g. `135314`
  - `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
  - `reason`: string - Reason the change order was raised. e.g. `Owner Request`
  - `received_from`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `reference`: string - Free-text reference linking this PCO to a related record (for example, a change event). e.g. `CE #23`
  - `request_for_quote_id`: integer - ID of the Request for Quote (RFQ) this PCO is associated with, if any. e.g. `4336438`
  - `reviewed_at`: string(date-time) - Timestamp when the change order was reviewed, in ISO 8601 format. Null if not yet reviewed. e.g. `2017-08-20T21:39:40Z`
  - `reviewer`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `revision`: integer - Revision number of the change order, incremented on each revision. e.g. `4`
  - `schedule_impact_amount`: integer - Estimated impact of this change order on the project schedule, in days. e.g. `2`
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Workflow status of the change order. e.g. `draft`
  - `title`: string - Short title summarizing the change order. e.g. `Concrete freezer slab`
  - `updated_at`: string(date-time) - Timestamp when the PCO was last updated, in ISO 8601 format. e.g. `2017-08-16T21:39:40Z`
  - `vendor`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
    - `abbreviated_name`: string - Abbreviated name e.g. `PE`
    - `address`: string - Address e.g. `846 Dogglesworth Drive`
    - `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
    - `business_phone`: string - Business phone e.g. `(800) 555-1234`
    - `city`: string - City e.g. `Jeffersonville`
    - `contact_count`: integer - Count of active Contacts associated with the vendor record. e.g. `5`
    - `company`: string - Company e.g. `Stock Construction`
    - `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
    - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
    - `email_address`: string(email) - Email address e.g. `joe-vendor@example.com`
    - `fax_number`: string - Fax number e.g. `(800) 555-5678`
    - `is_active`: boolean - Active status e.g. `true`
    - `labor_union`: string - Labor union e.g. `IWW 872`
    - `license_number`: string - License number e.g. `1901XYZ`
    - `logo`: string - Logo url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160718141208_development_528...`
    - `mobile_phone`: string - Mobile phone e.g. `(800) 555-1234`
    - `non_union_prevailing_wage`: boolean - Non-union prevailing wage status e.g. `false`
    - `notes`: string - Notes e.g. `owned by a dog`
    - `origin_data`: string - Origin data e.g. `OD-2398273424`
    - `origin_id`: string - Origin unique identifiers e.g. `foobar`
    - `origin_code`: string - Origin Code e.g. `foobar`
    - `prequalified`: boolean - Prequalified status e.g. `false`
    - `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
    - `synced_to_erp`: boolean - Synced to ERP e.g. `false`
    - `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
    - `union_member`: boolean - Union member status e.g. `false`
    - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
    - `website`: string - Website url e.g. `http://example-vendor.com`
    - `zip`: string - Zip code e.g. `47130`
    - `business_register`: object - business register e.g. `{"id": 321, "type": "abn", "identifier": "51824753556", "verified_at": "2018-...`
    - `vendor_group`: object e.g. `{"id": 1, "name": "Otis Elevators"}`
    - `primary_contact`: object - Primary contact e.g. `{"id": 1306796, "first_name": "John", "last_name": "Doe", "business_phone": "...`
    - `attachments`: array of object - Attachments
    - `children_count`: integer - Count of vendors whose parent_id is this vendor's unique identifier e.g. `0`
    - `legal_name`: string - Name of the parent, if one exists. Otherwise same as name. e.g. `Stock Construction`
    - `parent`: object e.g. `{"id": 634512, "name": "Poodle Electric Inc."}`
    - `trades`: array of object - Trades
    - `bidding_distribution`: array of object - Bidding distribution list
    - `bidding`: object - Bidding status e.g. `{"affirmative_action": false, "small_business": false, "african_american_busi...`
    - `project_ids`: array of integer - Array of Project IDs
    - `standard_cost_codes`: array of object
  - `void`: boolean - True when the change order has been voided. e.g. `true`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `errors`: array of object
  - `errors`: object - Validation errors that prevented this PCO from syncing, keyed by field name with an array of messages per field.
    - `field_name`: array of string

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/potential_change_orders

**List Potential Change Orders**
Return a list of all Potential Change Orders (PCO).
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[due_date]` [query] string - Returns item(s) due within the specified ISO 8601 datetime range.
- `filters[contract_id]` [query] integer - Contract ID. Returns item(s) with the specified Contract ID.
- `filters[include_deleted]` [query] string enum[only, with] - Use 'only' for only deleted resources. Use 'with' for deleted and undeleted resources.
- `filters[invoiced_date]` [query] string - Returns item(s) invoiced within the specified ISO 8601 datetime range.
- `filters[paid_date]` [query] string - Returns item(s) paid within the specified ISO 8601 datetime range.
- `filters[reviewed_at]` [query] string - Returns item(s) reviewed within the specified ISO 8601 datetime range.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this Potential Change Order. Use as the {id} path parameter to retrieve, update, or delete it. e.g. `2843048`
- `contract_id`: integer - ID of the contract (prime or commitment) this PCO belongs to. e.g. `304485`
- `created_at`: string(date-time) - Timestamp when the PCO was created, in ISO 8601 format. e.g. `2017-08-14T21:39:40Z`
- `created_by_id`: integer - ID of the user who created the PCO. e.g. `1`
- `deleted_at`: string(date-time) - Timestamp when the PCO was soft-deleted, in ISO 8601 format. Null for active PCOs. e.g. `2017-08-14T21:39:40Z`
- `due_date`: string(date) - Date by which the change order is due. e.g. `2017-08-19T21:39:40Z`
- `invoiced_date`: string(date) - Date the change order was invoiced (YYYY-MM-DD). e.g. `2017-08-18`
- `number`: string - Human-readable change order number, unique within the contract. e.g. `C34`
- `paid_date`: string(date) - Date the change order was paid (YYYY-MM-DD). e.g. `2017-08-18`
- `reviewed_at`: string(date-time) - Timestamp when the change order was reviewed, in ISO 8601 format. Null if not yet reviewed. e.g. `2017-08-19T21:39:40Z`
- `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Workflow status of the change order. e.g. `draft`
- `title`: string - Short title summarizing the change order. e.g. `Concrete freezer slab`
- `updated_at`: string(date-time) - Timestamp when the PCO was last updated, in ISO 8601 format. e.g. `2017-08-16T21:39:40Z`
- `revision`: integer - Revision number of the change order, incremented on each revision. e.g. `1`
- `change_reason`: string - Name of the change reason assigned to this PCO, if any. e.g. `Deleted`
- `schedule_impact_amount`: integer - Estimated impact of this change order on the project schedule, in days. e.g. `10`
- `change_order_request_id`: integer - ID of the Change Order Request (COR) this PCO belongs to, on multi-tier contract configurations. e.g. `10`
- `executed`: boolean - True when the change order has been executed (fully approved). e.g. `true`
- `grand_total`: string - Total value of the change order including markup, as a decimal string. e.g. `23474.0`
- `change_order_request_title`: string - Title of the Change Order Request this PCO belongs to. e.g. `Concrete freezer slab`
- `change_order_package_title`: string - Title of the Change Order Package this PCO belongs to. e.g. `Concrete freezer slab`
- `potential_change_order_acronym_number`: string - If the change order tier is single tier, an empty string. Otherwise, the PCO acronym and number. e.g. `PCO 95`
- `change_order_request_acronym_number`: string - If the change order tier is single tier or two-tiered, an empty string. Otherwise, the COR acronym and change order request number. e.g. `COR 9001`
- `change_order_package_acronym_number`: string - The CCO acronym and change order package number. e.g. `CCO 42`
- `change_order_tiers`: integer - Number of Change Order Tiers e.g. `3`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
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

Error responses: 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/potential_change_orders

**Create Potential Change Order**
Create a new Potential Change Order (PCO).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `349583`
- `contract_id`: integer (required) - ID of the contract (prime or commitment) this change order belongs to. e.g. `274058`
- `change_order`: object (required)
  - `commitment_change_event_id`: integer - ID of the commitment Change Event this PCO was generated from. Set when the contract is a commitment. e.g. `135314`
  - `description`: string - Free-text description of the scope of this change order. e.g. `Freezer slab replacement`
  - `due_date`: string(date-time) - Date by which the change order is due, in ISO 8601 format. e.g. `2017-08-19T21:39:40Z`
  - `grand_total`: string(float) - Total value of the change order including markup, as a decimal string. e.g. `37593.0`
  - `invoiced_date`: string(date) - Date the change order was invoiced (YYYY-MM-DD). e.g. `2017-08-19`
  - `number`: string - Human-readable change order number, unique within the contract. e.g. `C34`
  - `origin_data`: string - Free-form metadata from an external system, stored to correlate this PCO with its source record. e.g. `OD-2398273424`
  - `origin_id`: string - Identifier of this PCO in the external system it was imported from. Use to match records during integrations. e.g. `459247544`
  - `paid_date`: string(date) - Date the change order was paid (YYYY-MM-DD). e.g. `2017-08-18`
  - `prime_change_event_id`: integer - ID of the prime contract Change Event this PCO was generated from. Set when the contract is a prime contract. e.g. `135314`
  - `schedule_impact_amount`: integer - Estimated impact of this change order on the project schedule, in days. e.g. `2`
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Workflow status of the change order. e.g. `draft`
  - `title`: string - Short title summarizing the change order. e.g. `Concrete freezer slab`
  - `currency_exchange_rate`: string - Exchange rate used to convert from the change order's currency to the project's currency. Accepted only on projects where multicurrency conversion is available. e.g. `20.0`

Response 201 (application/json): object

- `id`: integer - Unique identifier for the newly created Potential Change Order. Use as the {id} path parameter to retrieve, update, or delete it. e.g. `2843048`
- `accounting_method`: string enum[amount, unit] - How the change order is priced: "amount" for a lump-sum total or "unit" for quantity-times-unit-cost line items. e.g. `unit`
- `change_order_request_id`: integer - ID of the Change Order Request (COR) this PCO belongs to, on multi-tier contract configurations. e.g. `283764`
- `commitment_change_event_id`: integer - ID of the commitment Change Event this PCO was generated from. Set when the contract is a commitment. e.g. `135314`
- `contract_id`: integer - ID of the contract (prime or commitment) this PCO belongs to. e.g. `304485`
- `created_at`: string(date-time) - Timestamp when the PCO was created, in ISO 8601 format. e.g. `2017-08-14T21:39:40Z`
- `creator`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `description`: string - Free-text description of the scope of this change order. e.g. `Freezer slab replacement`
- `due_date`: string(date-time) - Date by which the change order is due, in ISO 8601 format. e.g. `2017-08-19T21:39:40Z`
- `field_change`: boolean - True when this change order originated as a field change (a change identified in the field rather than through the office workflow). e.g. `true`
- `grand_total`: string(float) - Total value of the change order including markup, as a decimal string. e.g. `37593.0`
- `invoiced_date`: string(date) - Date the change order was invoiced (YYYY-MM-DD). e.g. `2017-08-18`
- `line_items`: array of object - Line items belonging to the change order. Empty for a newly created PCO until line items are added.
- `line_items_extended_total`: string(float) - Sum of all line item extended amounts (after markup), as a decimal string. e.g. `100.0`
- `line_items_total`: string(float) - Sum of all line item amounts (before markup), as a decimal string. e.g. `100.0`
- `number`: string - Human-readable change order number, unique within the contract. e.g. `C34`
- `origin_data`: string - Free-form metadata from an external system, stored to correlate this PCO with its source record. e.g. `OD-2398273424`
- `origin_id`: string - Identifier of this PCO in the external system it was imported from. Use to match records during integrations. e.g. `459247544`
- `paid`: boolean - True when the change order has been marked as paid. e.g. `true`
- `paid_date`: string(date) - Date the change order was paid (YYYY-MM-DD). e.g. `2017-08-18`
- `position`: integer - Ordering position of this PCO within its contract. e.g. `3`
- `prime_change_event_id`: integer - ID of the prime contract Change Event this PCO was generated from. Set when the contract is a prime contract. e.g. `135314`
- `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
- `revision`: integer - Revision number of the change order, incremented on each revision. e.g. `4`
- `schedule_impact_amount`: integer - Estimated impact of this change order on the project schedule, in days. e.g. `2`
- `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Workflow status of the change order. e.g. `draft`
- `title`: string - Short title summarizing the change order. e.g. `Concrete freezer slab`
- `updated_at`: string(date-time) - Timestamp when the PCO was last updated, in ISO 8601 format. e.g. `2017-08-16T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
  - `abbreviated_name`: string - Abbreviated name e.g. `PE`
  - `address`: string - Address e.g. `846 Dogglesworth Drive`
  - `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
  - `business_phone`: string - Business phone e.g. `(800) 555-1234`
  - `city`: string - City e.g. `Jeffersonville`
  - `contact_count`: integer - Count of active Contacts associated with the vendor record. e.g. `5`
  - `company`: string - Company e.g. `Stock Construction`
  - `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `email_address`: string(email) - Email address e.g. `joe-vendor@example.com`
  - `fax_number`: string - Fax number e.g. `(800) 555-5678`
  - `is_active`: boolean - Active status e.g. `true`
  - `labor_union`: string - Labor union e.g. `IWW 872`
  - `license_number`: string - License number e.g. `1901XYZ`
  - `logo`: string - Logo url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160718141208_development_528...`
  - `mobile_phone`: string - Mobile phone e.g. `(800) 555-1234`
  - `non_union_prevailing_wage`: boolean - Non-union prevailing wage status e.g. `false`
  - `notes`: string - Notes e.g. `owned by a dog`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin unique identifiers e.g. `foobar`
  - `origin_code`: string - Origin Code e.g. `foobar`
  - `prequalified`: boolean - Prequalified status e.g. `false`
  - `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
  - `synced_to_erp`: boolean - Synced to ERP e.g. `false`
  - `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
  - `union_member`: boolean - Union member status e.g. `false`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
  - `website`: string - Website url e.g. `http://example-vendor.com`
  - `zip`: string - Zip code e.g. `47130`
  - `business_register`: object - business register e.g. `{"id": 321, "type": "abn", "identifier": "51824753556", "verified_at": "2018-...`
    - `id`: integer e.g. `321`
    - `type`: string - business register type (ABN, EIN) e.g. `abn`
    - `identifier`: string - Identification code e.g. `51824753556`
    - `verified_at`: string(date-time) - Verified at e.g. `2018-06-11T15:56:25Z`
    - `verification_status`: string enum[active, cancelled, does_not_exist, None] - Verification status (active, cancelled, does_not_exist) e.g. `active`
  - `vendor_group`: object e.g. `{"id": 1, "name": "Otis Elevators"}`
    - `id`: integer e.g. `1`
    - `name`: string (required) e.g. `Otis Elevators`
  - `primary_contact`: object - Primary contact e.g. `{"id": 1306796, "first_name": "John", "last_name": "Doe", "business_phone": "...`
    - `id`: integer - ID e.g. `1306796`
    - `first_name`: string - First name e.g. `John`
    - `last_name`: string - Last name e.g. `Doe`
    - `business_phone`: string - Business phone
    - `business_phone_extension`: integer - Business phone extension
    - `fax_number`: string - Fax number
    - `mobile_phone`: string - Mobile phone
    - `email_address`: string(email) - Email e.g. `john.doe@example.com`
    - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
  - `attachments`: array of object - Attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `children_count`: integer - Count of vendors whose parent_id is this vendor's unique identifier e.g. `0`
  - `legal_name`: string - Name of the parent, if one exists. Otherwise same as name. e.g. `Stock Construction`
  - `parent`: object e.g. `{"id": 634512, "name": "Poodle Electric Inc."}`
    - `id`: integer
    - `name`: string
  - `trades`: array of object - Trades
    - `id`: integer - Trade ID e.g. `999`
    - `name`: string - Trade name e.g. `09 - acoustical panels`
    - `active`: boolean - Trade availability e.g. `true`
    - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
  - `bidding_distribution`: array of object - Bidding distribution list
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `bidding`: object - Bidding status e.g. `{"affirmative_action": false, "small_business": false, "african_american_busi...`
    - `affirmative_action`: boolean e.g. `true`
    - `small_business`: boolean e.g. `false`
    - `african_american_business`: boolean e.g. `false`
    - `hispanic_business`: boolean e.g. `false`
    - `womens_business`: boolean e.g. `false`
    - `historically_underutilized_business`: boolean e.g. `false`
    - `sdvo_business`: boolean e.g. `false`
    - `certified_business_enterprise`: boolean e.g. `false`
    - `asian_american_business`: boolean e.g. `false`
    - `native_american_business`: boolean e.g. `false`
    - `disadvantaged_business`: boolean e.g. `false`
    - `minority_business_enterprise`: boolean e.g. `true`
    - `eight_a_business`: boolean e.g. `false`
  - `project_ids`: array of integer - Array of Project IDs
  - `standard_cost_codes`: array of object
    - `id`: integer - ID e.g. `12345`
    - `standard_cost_code_list_id`: integer - Standard Cost Code List ID e.g. `12345`
    - `parent_id`: integer - Parent ID e.g. `12345`
    - `code`: string - Cost code, not including parent prefix e.g. `300`
    - `full_code`: string - Cost code, including parent prefixes e.g. `02-300`
    - `name`: string - Description e.g. `Site Work`
    - `origin_data`: string - Origin data e.g. `OD-2398273424`
    - `origin_id`: string - Origin ID e.g. `ABC123`
- `void`: boolean - True when the change order has been voided. e.g. `true`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
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

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/potential_change_orders/{id}

**Show Potential Change Orders**
Return detailed information about a Potential Change Order (PCO).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Unique identifier of the Potential Change Order.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `contract_id` [query] integer (required) - ID of the contract (prime or commitment) whose potential change orders this request targets.

Response 200 (application/json): object

- `id`: integer - Unique identifier for this Potential Change Order. Use as the {id} path parameter to retrieve, update, or delete it. e.g. `2843048`
- `accounting_method`: string enum[amount, unit] - How the change order is priced: "amount" for a lump-sum total or "unit" for quantity-times-unit-cost line items. e.g. `unit`
- `change_order_change_reason_id`: integer - ID of the change reason assigned to this PCO, if change reasons are enabled for the project. e.g. `847264`
- `change_order_request_id`: integer - ID of the Change Order Request (COR) this PCO belongs to, on multi-tier contract configurations. e.g. `283764`
- `commitment_change_event_id`: integer - ID of the commitment Change Event this PCO was generated from. Set when the contract is a commitment. e.g. `135314`
- `contract_id`: integer - ID of the contract (prime or commitment) this PCO belongs to. e.g. `304485`
- `created_at`: string(date-time) - Timestamp when the PCO was created, in ISO 8601 format. e.g. `2017-08-14T21:39:40Z`
- `creator`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `deleted_at`: string(date-time) - Timestamp when the PCO was soft-deleted, in ISO 8601 format. Null for active PCOs. e.g. `2017-11-10T21:39:40Z`
- `description`: string - Free-text description of the scope of this change order. e.g. `Freezer slab replacement`
- `designated_reviewer`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `due_date`: string(date-time) - Date by which the change order is due, in ISO 8601 format. e.g. `2017-08-19T21:39:40Z`
- `field_change`: boolean - True when this change order originated as a field change (a change identified in the field rather than through the office workflow). e.g. `true`
- `grand_total`: string(float) - Total value of the change order including markup, as a decimal string. e.g. `37593.0`
- `invoiced_date`: string(date) - Date the change order was invoiced (YYYY-MM-DD). e.g. `2017-08-18`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `line_items`: array of object
  - `id`: integer - Unique identifier for this change order line item. e.g. `238473`
  - `position`: integer - Ordering position of this line item within the change order. e.g. `3`
  - `description`: string - Free-text description of the work or item this line covers. e.g. `Concrete slab`
  - `quantity`: number(float) - Number of units for this line item, in the given unit of measure. e.g. `2000`
  - `uom`: string - Unit of measure for the quantity (a unit from the company's Units of Measure list). e.g. `lbs`
  - `total_amount`: string(float) - Total amount for this line item, as a decimal string. e.g. `100.0`
  - `extended_amount`: string(float) - Line item amount after applied markup, as a decimal string. e.g. `900.0`
  - `cost_code_id`: integer - ID of the Cost Code this line item is charged against. e.g. `383762`
  - `tax_code_id`: integer - ID of the Tax Code applied to this line item, if any. e.g. `1`
  - `unit_cost`: number(float) - Cost per unit, as a decimal. Multiplied by quantity to compute the line item amount. e.g. `0.05`
  - `cost_code`: oneOf(object | object)
  - `line_item_type`: object - Line Item Type
    - `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
    - `name`: string - Name for the Line Item Type e.g. `Equipment`
    - `code`: string - Code for the Line Item Type e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
    - `origin_data`: string - Origin data e.g. `OD-2398273424`
    - `origin_id`: string - Origin ID e.g. `ABC123`
  - `markup_line_items`: array of object
    - `id`: integer - Markup Line Item ID e.g. `352362`
    - `amount`: string - Markup Line Item amount
    - `created_at`: string(date-time) - Created at e.g. `2017-08-14T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2017-08-14T21:39:40Z`
    - `markup`: object
    - `currency_configuration`: object
  - `currency_configuration`: object
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`
- `line_items_extended_total`: string(float) - Sum of all line item extended amounts (after markup), as a decimal string. e.g. `100.0`
- `line_items_total`: string(float) - Sum of all line item amounts (before markup), as a decimal string. e.g. `100.0`
- `location_id`: integer - ID of the project location this change order is associated with. e.g. `438264`
- `number`: string - Human-readable change order number, unique within the contract. e.g. `C34`
- `origin_data`: string - Free-form metadata from an external system, stored to correlate this PCO with its source record. e.g. `OD-2398273424`
- `origin_id`: string - Identifier of this PCO in the external system it was imported from. Use to match records during integrations. e.g. `459247544`
- `paid`: boolean - True when the change order has been marked as paid. e.g. `true`
- `paid_date`: string(date) - Date the change order was paid (YYYY-MM-DD). e.g. `2017-08-18`
- `position`: integer - Ordering position of this PCO within its contract. e.g. `3`
- `prime_change_event_id`: integer - ID of the prime contract Change Event this PCO was generated from. Set when the contract is a prime contract. e.g. `135314`
- `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
- `reason`: string - Reason the change order was raised. e.g. `Owner Request`
- `received_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `reference`: string - Free-text reference linking this PCO to a related record (for example, a change event). e.g. `CE #23`
- `request_for_quote_id`: integer - ID of the Request for Quote (RFQ) this PCO is associated with, if any. e.g. `4336438`
- `reviewed_at`: string(date-time) - Timestamp when the change order was reviewed, in ISO 8601 format. Null if not yet reviewed. e.g. `2017-08-20T21:39:40Z`
- `reviewer`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `revision`: integer - Revision number of the change order, incremented on each revision. e.g. `4`
- `schedule_impact_amount`: integer - Estimated impact of this change order on the project schedule, in days. e.g. `2`
- `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Workflow status of the change order. e.g. `draft`
- `title`: string - Short title summarizing the change order. e.g. `Concrete freezer slab`
- `updated_at`: string(date-time) - Timestamp when the PCO was last updated, in ISO 8601 format. e.g. `2017-08-16T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
  - `abbreviated_name`: string - Abbreviated name e.g. `PE`
  - `address`: string - Address e.g. `846 Dogglesworth Drive`
  - `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
  - `business_phone`: string - Business phone e.g. `(800) 555-1234`
  - `city`: string - City e.g. `Jeffersonville`
  - `contact_count`: integer - Count of active Contacts associated with the vendor record. e.g. `5`
  - `company`: string - Company e.g. `Stock Construction`
  - `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `email_address`: string(email) - Email address e.g. `joe-vendor@example.com`
  - `fax_number`: string - Fax number e.g. `(800) 555-5678`
  - `is_active`: boolean - Active status e.g. `true`
  - `labor_union`: string - Labor union e.g. `IWW 872`
  - `license_number`: string - License number e.g. `1901XYZ`
  - `logo`: string - Logo url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160718141208_development_528...`
  - `mobile_phone`: string - Mobile phone e.g. `(800) 555-1234`
  - `non_union_prevailing_wage`: boolean - Non-union prevailing wage status e.g. `false`
  - `notes`: string - Notes e.g. `owned by a dog`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin unique identifiers e.g. `foobar`
  - `origin_code`: string - Origin Code e.g. `foobar`
  - `prequalified`: boolean - Prequalified status e.g. `false`
  - `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
  - `synced_to_erp`: boolean - Synced to ERP e.g. `false`
  - `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
  - `union_member`: boolean - Union member status e.g. `false`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
  - `website`: string - Website url e.g. `http://example-vendor.com`
  - `zip`: string - Zip code e.g. `47130`
  - `business_register`: object - business register e.g. `{"id": 321, "type": "abn", "identifier": "51824753556", "verified_at": "2018-...`
    - `id`: integer e.g. `321`
    - `type`: string - business register type (ABN, EIN) e.g. `abn`
    - `identifier`: string - Identification code e.g. `51824753556`
    - `verified_at`: string(date-time) - Verified at e.g. `2018-06-11T15:56:25Z`
    - `verification_status`: string enum[active, cancelled, does_not_exist, None] - Verification status (active, cancelled, does_not_exist) e.g. `active`
  - `vendor_group`: object e.g. `{"id": 1, "name": "Otis Elevators"}`
    - `id`: integer e.g. `1`
    - `name`: string (required) e.g. `Otis Elevators`
  - `primary_contact`: object - Primary contact e.g. `{"id": 1306796, "first_name": "John", "last_name": "Doe", "business_phone": "...`
    - `id`: integer - ID e.g. `1306796`
    - `first_name`: string - First name e.g. `John`
    - `last_name`: string - Last name e.g. `Doe`
    - `business_phone`: string - Business phone
    - `business_phone_extension`: integer - Business phone extension
    - `fax_number`: string - Fax number
    - `mobile_phone`: string - Mobile phone
    - `email_address`: string(email) - Email e.g. `john.doe@example.com`
    - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
  - `attachments`: array of object - Attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `children_count`: integer - Count of vendors whose parent_id is this vendor's unique identifier e.g. `0`
  - `legal_name`: string - Name of the parent, if one exists. Otherwise same as name. e.g. `Stock Construction`
  - `parent`: object e.g. `{"id": 634512, "name": "Poodle Electric Inc."}`
    - `id`: integer
    - `name`: string
  - `trades`: array of object - Trades
    - `id`: integer - Trade ID e.g. `999`
    - `name`: string - Trade name e.g. `09 - acoustical panels`
    - `active`: boolean - Trade availability e.g. `true`
    - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
  - `bidding_distribution`: array of object - Bidding distribution list
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `bidding`: object - Bidding status e.g. `{"affirmative_action": false, "small_business": false, "african_american_busi...`
    - `affirmative_action`: boolean e.g. `true`
    - `small_business`: boolean e.g. `false`
    - `african_american_business`: boolean e.g. `false`
    - `hispanic_business`: boolean e.g. `false`
    - `womens_business`: boolean e.g. `false`
    - `historically_underutilized_business`: boolean e.g. `false`
    - `sdvo_business`: boolean e.g. `false`
    - `certified_business_enterprise`: boolean e.g. `false`
    - `asian_american_business`: boolean e.g. `false`
    - `native_american_business`: boolean e.g. `false`
    - `disadvantaged_business`: boolean e.g. `false`
    - `minority_business_enterprise`: boolean e.g. `true`
    - `eight_a_business`: boolean e.g. `false`
  - `project_ids`: array of integer - Array of Project IDs
  - `standard_cost_codes`: array of object
    - `id`: integer - ID e.g. `12345`
    - `standard_cost_code_list_id`: integer - Standard Cost Code List ID e.g. `12345`
    - `parent_id`: integer - Parent ID e.g. `12345`
    - `code`: string - Cost code, not including parent prefix e.g. `300`
    - `full_code`: string - Cost code, including parent prefixes e.g. `02-300`
    - `name`: string - Description e.g. `Site Work`
    - `origin_data`: string - Origin data e.g. `OD-2398273424`
    - `origin_id`: string - Origin ID e.g. `ABC123`
- `void`: boolean - True when the change order has been voided. e.g. `true`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
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

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/potential_change_orders/{id}

**Update Potential Change Order**
Update information about a specific Potential Change Order (PCO).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Unique identifier of the Potential Change Order.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `349583`
- `contract_id`: integer (required) - ID of the contract (prime or commitment) this change order belongs to. e.g. `274058`
- `change_order`: object (required)
  - `change_order_request_id`: integer - ID of the Change Order Request (COR) this PCO belongs to. Used on multi-tier contract configurations to group the PCO under a request. e.g. `56490`
  - `change_order_request`: object
    - `change_order_package_id`: integer - ID of the Change Order Package the PCO's Change Order Request is assigned to. Applies to two-tier contract configurations. e.g. `875689`
  - `commitment_change_event_id`: integer - ID of the commitment Change Event this PCO was generated from. Set when the contract is a commitment. e.g. `135314`
  - `description`: string - Free-text description of the scope of this change order. e.g. `Freezer slab replacement`
  - `due_date`: string(date-time) - Date by which the change order is due, in ISO 8601 format. e.g. `2017-08-19T21:39:40Z`
  - `invoiced_date`: string(date) - Date the change order was invoiced (YYYY-MM-DD). e.g. `2017-08-19`
  - `number`: string - Human-readable change order number, unique within the contract. e.g. `C34`
  - `origin_data`: string - Free-form metadata from an external system, stored to correlate this PCO with its source record. e.g. `OD-2398273424`
  - `origin_id`: string - Identifier of this PCO in the external system it was imported from. Use to match records during integrations. e.g. `459247544`
  - `paid_date`: string(date) - Date the change order was paid (YYYY-MM-DD). e.g. `2017-08-18`
  - `prime_change_event_id`: integer - ID of the prime contract Change Event this PCO was generated from. Set when the contract is a prime contract. e.g. `135314`
  - `schedule_impact_amount`: integer - Estimated impact of this change order on the project schedule, in days. e.g. `2`
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Workflow status of the change order. Ignored on projects where the tool is configured for single-tier change orders. e.g. `draft`
  - `title`: string - Short title summarizing the change order. e.g. `Concrete freezer slab`
  - `currency_exchange_rate`: string - Exchange rate used to convert from the change order's currency to the project's currency. Accepted only on projects where multicurrency conversion is available. e.g. `20.0`

Response 200 (application/json): object

- `id`: integer - Unique identifier for this Potential Change Order. Use as the {id} path parameter to retrieve, update, or delete it. e.g. `2843048`
- `accounting_method`: string enum[amount, unit] - How the change order is priced: "amount" for a lump-sum total or "unit" for quantity-times-unit-cost line items. e.g. `unit`
- `change_order_change_reason_id`: integer - ID of the change reason assigned to this PCO, if change reasons are enabled for the project. e.g. `847264`
- `change_order_request_id`: integer - ID of the Change Order Request (COR) this PCO belongs to, on multi-tier contract configurations. e.g. `283764`
- `commitment_change_event_id`: integer - ID of the commitment Change Event this PCO was generated from. Set when the contract is a commitment. e.g. `135314`
- `contract_id`: integer - ID of the contract (prime or commitment) this PCO belongs to. e.g. `304485`
- `created_at`: string(date-time) - Timestamp when the PCO was created, in ISO 8601 format. e.g. `2017-08-14T21:39:40Z`
- `creator`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `deleted_at`: string(date-time) - Timestamp when the PCO was soft-deleted, in ISO 8601 format. Null for active PCOs. e.g. `2017-11-10T21:39:40Z`
- `description`: string - Free-text description of the scope of this change order. e.g. `Freezer slab replacement`
- `designated_reviewer`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `due_date`: string(date-time) - Date by which the change order is due, in ISO 8601 format. e.g. `2017-08-19T21:39:40Z`
- `field_change`: boolean - True when this change order originated as a field change (a change identified in the field rather than through the office workflow). e.g. `true`
- `grand_total`: string(float) - Total value of the change order including markup, as a decimal string. e.g. `37593.0`
- `invoiced_date`: string(date) - Date the change order was invoiced (YYYY-MM-DD). e.g. `2017-08-18`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `line_items`: array of object
  - `id`: integer - Unique identifier for this change order line item. e.g. `238473`
  - `position`: integer - Ordering position of this line item within the change order. e.g. `3`
  - `description`: string - Free-text description of the work or item this line covers. e.g. `Concrete slab`
  - `quantity`: number(float) - Number of units for this line item, in the given unit of measure. e.g. `2000`
  - `uom`: string - Unit of measure for the quantity (a unit from the company's Units of Measure list). e.g. `lbs`
  - `total_amount`: string(float) - Total amount for this line item, as a decimal string. e.g. `100.0`
  - `extended_amount`: string(float) - Line item amount after applied markup, as a decimal string. e.g. `900.0`
  - `cost_code_id`: integer - ID of the Cost Code this line item is charged against. e.g. `383762`
  - `tax_code_id`: integer - ID of the Tax Code applied to this line item, if any. e.g. `1`
  - `unit_cost`: number(float) - Cost per unit, as a decimal. Multiplied by quantity to compute the line item amount. e.g. `0.05`
  - `cost_code`: oneOf(object | object)
  - `line_item_type`: object - Line Item Type
    - `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
    - `name`: string - Name for the Line Item Type e.g. `Equipment`
    - `code`: string - Code for the Line Item Type e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
    - `origin_data`: string - Origin data e.g. `OD-2398273424`
    - `origin_id`: string - Origin ID e.g. `ABC123`
  - `markup_line_items`: array of object
    - `id`: integer - Markup Line Item ID e.g. `352362`
    - `amount`: string - Markup Line Item amount
    - `created_at`: string(date-time) - Created at e.g. `2017-08-14T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2017-08-14T21:39:40Z`
    - `markup`: object
    - `currency_configuration`: object
  - `currency_configuration`: object
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`
- `line_items_extended_total`: string(float) - Sum of all line item extended amounts (after markup), as a decimal string. e.g. `100.0`
- `line_items_total`: string(float) - Sum of all line item amounts (before markup), as a decimal string. e.g. `100.0`
- `location_id`: integer - ID of the project location this change order is associated with. e.g. `438264`
- `number`: string - Human-readable change order number, unique within the contract. e.g. `C34`
- `origin_data`: string - Free-form metadata from an external system, stored to correlate this PCO with its source record. e.g. `OD-2398273424`
- `origin_id`: string - Identifier of this PCO in the external system it was imported from. Use to match records during integrations. e.g. `459247544`
- `paid`: boolean - True when the change order has been marked as paid. e.g. `true`
- `paid_date`: string(date) - Date the change order was paid (YYYY-MM-DD). e.g. `2017-08-18`
- `position`: integer - Ordering position of this PCO within its contract. e.g. `3`
- `prime_change_event_id`: integer - ID of the prime contract Change Event this PCO was generated from. Set when the contract is a prime contract. e.g. `135314`
- `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
- `reason`: string - Reason the change order was raised. e.g. `Owner Request`
- `received_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `reference`: string - Free-text reference linking this PCO to a related record (for example, a change event). e.g. `CE #23`
- `request_for_quote_id`: integer - ID of the Request for Quote (RFQ) this PCO is associated with, if any. e.g. `4336438`
- `reviewed_at`: string(date-time) - Timestamp when the change order was reviewed, in ISO 8601 format. Null if not yet reviewed. e.g. `2017-08-20T21:39:40Z`
- `reviewer`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `revision`: integer - Revision number of the change order, incremented on each revision. e.g. `4`
- `schedule_impact_amount`: integer - Estimated impact of this change order on the project schedule, in days. e.g. `2`
- `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Workflow status of the change order. e.g. `draft`
- `title`: string - Short title summarizing the change order. e.g. `Concrete freezer slab`
- `updated_at`: string(date-time) - Timestamp when the PCO was last updated, in ISO 8601 format. e.g. `2017-08-16T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
  - `abbreviated_name`: string - Abbreviated name e.g. `PE`
  - `address`: string - Address e.g. `846 Dogglesworth Drive`
  - `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
  - `business_phone`: string - Business phone e.g. `(800) 555-1234`
  - `city`: string - City e.g. `Jeffersonville`
  - `contact_count`: integer - Count of active Contacts associated with the vendor record. e.g. `5`
  - `company`: string - Company e.g. `Stock Construction`
  - `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `email_address`: string(email) - Email address e.g. `joe-vendor@example.com`
  - `fax_number`: string - Fax number e.g. `(800) 555-5678`
  - `is_active`: boolean - Active status e.g. `true`
  - `labor_union`: string - Labor union e.g. `IWW 872`
  - `license_number`: string - License number e.g. `1901XYZ`
  - `logo`: string - Logo url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160718141208_development_528...`
  - `mobile_phone`: string - Mobile phone e.g. `(800) 555-1234`
  - `non_union_prevailing_wage`: boolean - Non-union prevailing wage status e.g. `false`
  - `notes`: string - Notes e.g. `owned by a dog`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin unique identifiers e.g. `foobar`
  - `origin_code`: string - Origin Code e.g. `foobar`
  - `prequalified`: boolean - Prequalified status e.g. `false`
  - `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
  - `synced_to_erp`: boolean - Synced to ERP e.g. `false`
  - `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
  - `union_member`: boolean - Union member status e.g. `false`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
  - `website`: string - Website url e.g. `http://example-vendor.com`
  - `zip`: string - Zip code e.g. `47130`
  - `business_register`: object - business register e.g. `{"id": 321, "type": "abn", "identifier": "51824753556", "verified_at": "2018-...`
    - `id`: integer e.g. `321`
    - `type`: string - business register type (ABN, EIN) e.g. `abn`
    - `identifier`: string - Identification code e.g. `51824753556`
    - `verified_at`: string(date-time) - Verified at e.g. `2018-06-11T15:56:25Z`
    - `verification_status`: string enum[active, cancelled, does_not_exist, None] - Verification status (active, cancelled, does_not_exist) e.g. `active`
  - `vendor_group`: object e.g. `{"id": 1, "name": "Otis Elevators"}`
    - `id`: integer e.g. `1`
    - `name`: string (required) e.g. `Otis Elevators`
  - `primary_contact`: object - Primary contact e.g. `{"id": 1306796, "first_name": "John", "last_name": "Doe", "business_phone": "...`
    - `id`: integer - ID e.g. `1306796`
    - `first_name`: string - First name e.g. `John`
    - `last_name`: string - Last name e.g. `Doe`
    - `business_phone`: string - Business phone
    - `business_phone_extension`: integer - Business phone extension
    - `fax_number`: string - Fax number
    - `mobile_phone`: string - Mobile phone
    - `email_address`: string(email) - Email e.g. `john.doe@example.com`
    - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
  - `attachments`: array of object - Attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `children_count`: integer - Count of vendors whose parent_id is this vendor's unique identifier e.g. `0`
  - `legal_name`: string - Name of the parent, if one exists. Otherwise same as name. e.g. `Stock Construction`
  - `parent`: object e.g. `{"id": 634512, "name": "Poodle Electric Inc."}`
    - `id`: integer
    - `name`: string
  - `trades`: array of object - Trades
    - `id`: integer - Trade ID e.g. `999`
    - `name`: string - Trade name e.g. `09 - acoustical panels`
    - `active`: boolean - Trade availability e.g. `true`
    - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
  - `bidding_distribution`: array of object - Bidding distribution list
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `bidding`: object - Bidding status e.g. `{"affirmative_action": false, "small_business": false, "african_american_busi...`
    - `affirmative_action`: boolean e.g. `true`
    - `small_business`: boolean e.g. `false`
    - `african_american_business`: boolean e.g. `false`
    - `hispanic_business`: boolean e.g. `false`
    - `womens_business`: boolean e.g. `false`
    - `historically_underutilized_business`: boolean e.g. `false`
    - `sdvo_business`: boolean e.g. `false`
    - `certified_business_enterprise`: boolean e.g. `false`
    - `asian_american_business`: boolean e.g. `false`
    - `native_american_business`: boolean e.g. `false`
    - `disadvantaged_business`: boolean e.g. `false`
    - `minority_business_enterprise`: boolean e.g. `true`
    - `eight_a_business`: boolean e.g. `false`
  - `project_ids`: array of integer - Array of Project IDs
  - `standard_cost_codes`: array of object
    - `id`: integer - ID e.g. `12345`
    - `standard_cost_code_list_id`: integer - Standard Cost Code List ID e.g. `12345`
    - `parent_id`: integer - Parent ID e.g. `12345`
    - `code`: string - Cost code, not including parent prefix e.g. `300`
    - `full_code`: string - Cost code, including parent prefixes e.g. `02-300`
    - `name`: string - Description e.g. `Site Work`
    - `origin_data`: string - Origin data e.g. `OD-2398273424`
    - `origin_id`: string - Origin ID e.g. `ABC123`
- `void`: boolean - True when the change order has been voided. e.g. `true`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
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

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

