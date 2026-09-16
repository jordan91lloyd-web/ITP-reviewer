# Procore API: Commitments (Construction Financials)

Source: https://developers.procore.com/reference/rest/ (tool category: Commitments)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Billing Periods](#billing-periods) - versions 1.0
- [Bulk Update Subcontractor Invoice (Requisition) Items](#bulk-update-subcontractor-invoice-requisition-items) - versions 1.0
- [Commitment Change Order Batch Export PDF](#commitment-change-order-batch-export-pdf) - versions 2.0
- [Commitment Change Order Batches](#commitment-change-order-batches) - versions 1.0
- [Commitment Change Order Export PDF](#commitment-change-order-export-pdf) - versions 2.0
- [Commitment Change Order Line Items](#commitment-change-order-line-items) - versions 2.0
- [Commitment Change Order Rows CSV Exports](#commitment-change-order-rows-csv-exports) - versions 2.0
- [Commitment Change Orders](#commitment-change-orders) - versions 1.0
- [Commitment Compliance](#commitment-compliance) - versions 1.0
- [Commitment Compliance Documents](#commitment-compliance-documents) - versions 1.0
- [Commitment Contract Attachments](#commitment-contract-attachments) - versions 2.0
- [Commitment Contract Export PDF](#commitment-contract-export-pdf) - versions 2.0
- [Commitment Contract Line Items](#commitment-contract-line-items) - versions 2.0
- [Commitment Contract Summary](#commitment-contract-summary) - versions 2.0
- [Commitment Contracts](#commitment-contracts) - versions 2.0
- [Commitments](#commitments) - versions 1.0
- [Contract Payments](#contract-payments) - versions 1.0
- [Line Item Types (Cost Types)](#line-item-types-cost-types) - versions 1.0
- [Purchase Order Contract Detail Line Items](#purchase-order-contract-detail-line-items) - versions 1.0
- [Purchase Order Contract Line Items](#purchase-order-contract-line-items) - versions 1.0
- [Purchase Order Contract Subcontractor SOV Status](#purchase-order-contract-subcontractor-sov-status) - versions 1.0
- [Purchase Order Contracts](#purchase-order-contracts) - versions 1.0
- [RFQs](#rfqs) - versions 1.0
- [Requisition (Subcontractor Invoice) Change Histories](#requisition-subcontractor-invoice-change-histories) - versions 1.0
- [Requisition (Subcontractor Invoice) Change Order Items](#requisition-subcontractor-invoice-change-order-items) - versions 1.0
- [Requisition (Subcontractor Invoice) Contract Detail Items](#requisition-subcontractor-invoice-contract-detail-items) - versions 1.0
- [Requisition (Subcontractor Invoice) Contract Items](#requisition-subcontractor-invoice-contract-items) - versions 1.0
- [Requisition (Subcontractor Invoice) Single PDF Compilers](#requisition-subcontractor-invoice-single-pdf-compilers) - versions 1.0
- [Requisition (Subcontractor Invoice) Whole Change Order Items](#requisition-subcontractor-invoice-whole-change-order-items) - versions 1.0
- [Requisitions (Subcontractor Invoices)](#requisitions-subcontractor-invoices) - versions 2.0, 1.1, 1.0
- [Work Order Contract Detail Line Items](#work-order-contract-detail-line-items) - versions 1.0
- [Work Order Contract Line Items](#work-order-contract-line-items) - versions 1.0
- [Work Order Contract Subcontractor SOV Status](#work-order-contract-subcontractor-sov-status) - versions 1.0
- [Work Order Contracts](#work-order-contracts) - versions 1.0

## Billing Periods

Resource id: `billing-periods`. Raw spec: `../openapi-raw/billing-periods.json`. Web: https://developers.procore.com/reference/rest/billing-periods?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/projects/{project_id}/billing_periods

**List billing periods**
Return a list of all Billing Periods of a specified Project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[status]` [query] string enum[open, closed] - Return item(s) with the specified Billing Period status.

Response 200 (application/json): array of object

- `id`: integer - Billing Period ID e.g. `1`
- `created_at`: string(date-time) - Date/time the Billing Period was created e.g. `2012-10-01T21:00:00Z`
- `due_date`: string(date) - Due date for the Billing Period e.g. `2012-10-25`
- `end_date`: string(date) - End date for the Billing Period e.g. `2012-10-31`
- `position`: integer - Position of the Billing Period e.g. `2`
- `project_id`: integer - Project ID for the Billing Period e.g. `1`
- `start_date`: string(date) - Start date for the Billing Period e.g. `2012-10-31`
- `status`: string enum[open, closed] - Billing Period status e.g. `open`
- `updated_at`: string(date-time) - Date/time the Billing Period was last updated e.g. `2012-10-02T21:00:00Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/billing_periods

**Create billing period**
Create a Billing Period

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `billing_period`: object (required) - The Billing Period object
  - `due_date`: string(date) (required) - Due date e.g. `2012-10-25`
  - `start_date`: string(date) (required) - Start date e.g. `2012-10-01`
  - `end_date`: string(date) (required) - End date e.g. `2012-10-31`
  - `status`: string enum[open, closed] (required) - Status e.g. `open`

Response 201 (application/json): object

- `id`: integer - Billing Period ID e.g. `1`
- `created_at`: string(date-time) - Date/time the Billing Period was created e.g. `2012-10-01T21:00:00Z`
- `due_date`: string(date) - Due date for the Billing Period e.g. `2012-10-25`
- `end_date`: string(date) - End date for the Billing Period e.g. `2012-10-31`
- `position`: integer - Position of the Billing Period e.g. `2`
- `project_id`: integer - Project ID for the Billing Period e.g. `1`
- `start_date`: string(date) - Start date for the Billing Period e.g. `2012-10-31`
- `status`: string enum[open, closed] - Billing Period status e.g. `open`
- `updated_at`: string(date-time) - Date/time the Billing Period was last updated e.g. `2012-10-02T21:00:00Z`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/billing_periods/{id}

**Show Billing Period for Project**
Return information for a Billing Period

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Billing Period ID

Response 200 (application/json): object

- `id`: integer - Billing Period ID e.g. `1`
- `created_at`: string(date-time) - Date/time the Billing Period was created e.g. `2012-10-01T21:00:00Z`
- `due_date`: string(date) - Due date for the Billing Period e.g. `2012-10-25`
- `end_date`: string(date) - End date for the Billing Period e.g. `2012-10-31`
- `position`: integer - Position of the Billing Period e.g. `2`
- `project_id`: integer - Project ID for the Billing Period e.g. `1`
- `start_date`: string(date) - Start date for the Billing Period e.g. `2012-10-31`
- `status`: string enum[open, closed] - Billing Period status e.g. `open`
- `updated_at`: string(date-time) - Date/time the Billing Period was last updated e.g. `2012-10-02T21:00:00Z`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/billing_periods/{id}

**Update billing period**
Update a specified Billing Period

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Billing Period ID

Request body (application/json) (required):

- `billing_period`: object (required) - The Billing Period object
  - `due_date`: string(date) (required) - Due date e.g. `2012-10-25`
  - `start_date`: string(date) (required) - Start date e.g. `2012-10-01`
  - `end_date`: string(date) (required) - End date e.g. `2012-10-31`
  - `status`: string enum[open, closed] (required) - Status e.g. `open`

Response 200 (application/json): object

- `id`: integer - Billing Period ID e.g. `1`
- `created_at`: string(date-time) - Date/time the Billing Period was created e.g. `2012-10-01T21:00:00Z`
- `due_date`: string(date) - Due date for the Billing Period e.g. `2012-10-25`
- `end_date`: string(date) - End date for the Billing Period e.g. `2012-10-31`
- `position`: integer - Position of the Billing Period e.g. `2`
- `project_id`: integer - Project ID for the Billing Period e.g. `1`
- `start_date`: string(date) - Start date for the Billing Period e.g. `2012-10-31`
- `status`: string enum[open, closed] - Billing Period status e.g. `open`
- `updated_at`: string(date-time) - Date/time the Billing Period was last updated e.g. `2012-10-02T21:00:00Z`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/billing_periods/{id}

**Delete billing period**
Delete a specified Billing Period

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Billing Period ID

Response 200: OK (no body)

Error responses: 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Bulk Update Subcontractor Invoice (Requisition) Items

Resource id: `bulk-update-subcontractor-invoice-requisition-items`. Raw spec: `../openapi-raw/bulk-update-subcontractor-invoice-requisition-items.json`. Web: https://developers.procore.com/reference/rest/bulk-update-subcontractor-invoice-requisition-items?version=latest
Product lines: Construction Financials

### PATCH /rest/v1.0/requisitions/{requisition_id}/bulk_item_update

**Bulk Update Subcontractor Invoice (Requisitions) Items**
Updates all requisition items received in the body. Can be contract items, contract detail items, or change order items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `requisition_id` [path] integer (required) - Requisition ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `requisition_items`: array of object (required) - Requisition Items
  - `id`: integer - The id of the item to update e.g. `1001`
  - `item_type`: string enum[contract_item, contract_detail_item, change_order_item] - The type of the item your are updating e.g. `1001`
  - `work_completed_this_period`: string - The amount of work completed this period e.g. `1000`
  - `materials_presently_stored`: string - The amount of materials presently stored e.g. `500`
  - `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period (admin user only, work_completed_this_period should be non-zero to hold a retainage) e.g. `0.22`
  - `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained (admin user, amount accounting only, materials_presently_stored should be non-zero to hold a retainage) e.g. `0.23`
  - `work_completed_retainage_released_this_period`: string - The amount of work completed retainage released this period e.g. `0.24`
  - `work_completed_this_period_quantity`: string - Work completed this period quantity (unit accounting contract only) e.g. `10`
  - `subcontractor_claimed_amount`: string - The total amount the subcontractor original claimed for this line e.g. `20.5`
  - `status`: string enum[approved, rejected, no_action] - Approval status of the invoice line item e.g. `rejected`
  - `comment`: string - Comment about the invoice line item e.g. `This work was not yet completed`

Response 200: OK (no body)

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Commitment Change Order Batch Export PDF

Resource id: `commitment-change-order-batch-export-pdf`. Raw spec: `../openapi-raw/commitment-change-order-batch-export-pdf.json`. Web: https://developers.procore.com/reference/rest/commitment-change-order-batch-export-pdf?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_change_order_batches/{commitment_co_batch_id}/pdf  **[BETA]**

**Check PDF generation status**
Check the status of a PDF document generation for a Commitment Change Order Batch.
Note: This endpoint is currently only supported in Procore Zones US01 && US02.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `commitment_co_batch_id` [path] string (required) - Unique identifier for the Commitment Change Order Batch.

Response 202: Accepted (no body)

Error responses: 302, 400, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_change_order_batches/{commitment_co_batch_id}/pdf  **[BETA]**

**Create PDF export for a Commitment Change Order Batch**
Creates a PDF export for a given Commitment Change Order Batch.
Note: This endpoint is currently only supported in Procore Zones US01 && US02.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `commitment_co_batch_id` [path] string (required) - Unique identifier for the Commitment Change Order Batch.

Response 202: Accepted, returns back location to PDF export job which can be queried for progress. (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Commitment Change Order Batches

Resource id: `commitment-change-order-batches`. Raw spec: `../openapi-raw/commitment-change-order-batches.json`. Web: https://developers.procore.com/reference/rest/commitment-change-order-batches?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/projects/{project_id}/commitment_change_order_batches

**Show All Commitment Change Order Batches**
Returns all Commitment Change Order Batches for the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `sort` [query] string enum[id, created_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.
- `filters[id]` [query] integer - Filter results by Change Order Batch ID
- `filters[change_order_id]` [query] integer - Filter results by Change Order ID
- `filters[contract_id]` [query] integer - Filter results by Contract ID
- `filters[updated_at]` [query] string - Return item(s) within a specific updated at iso8601 datetime range
- `filters[status]` [query] array of string - Array of Status. Return item(s) with the specified status.
- `filters[status][not]` [query] array of string - Array of Status. Return item(s) that does not have specified status.

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/commitment_change_order_batches

**Create Commitment Change Order Batch**
Create a new Commitment Change Order Batch.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `change_order_batch`: object (required) - Change Order Batch object
  - `contract_id`: integer (required) - Unique identifier for the contract. e.g. `512340`
  - `description`: string - Description e.g. `New Building`
  - `due_date`: string(date) - Due Date e.g. `2017-03-31`
  - `executed`: boolean - Whether or not the Change Order Batch is executed e.g. `true`
  - `invoiced_date`: string(date) - Invoiced Date e.g. `2017-03-31`
  - `number`: string - Number of the Change Order Batch e.g. `COB-1`
  - `paid_date`: string(date) - Paid Date e.g. `2017-03-31`
  - `private`: boolean - Whether or not the Change Order Batch is private e.g. `true`
  - `revised_substantial_completion_date`: string(date) - Revised substantial completion date e.g. `2017-10-30`
  - `revision`: integer - Revision Number e.g. `1`
  - `schedule_impact_amount`: integer - Schedule impact in days e.g. `5`
  - `signature_required`: boolean - Whether a signature will be required for this Change Order Batch e.g. `true`
  - `signed_change_order_received_date`: string(date) - Signed Change Order Batch Received Date e.g. `2015-01-30`
  - `status`: string - Status e.g. `draft`
  - `title`: string - Title of the Change Order Batch e.g. `Station 3`
  - `designated_reviewer_id`: integer - Unique identifier for the designated reviewer. This field is only supported for single-tier projects. Behavior is undefined in multi-tier projects. e.g. `512340`
  - `change_order_ids`: array of integer - Array of Change Order (PCO) IDs to link to this batch. This field is only supported for two-tier projects. e.g. `[123, 456, 789]`
  - `legacy_request_ids`: array of integer - Array of Change Order Request IDs to link to this batch. This field is only supported for three-tier projects. e.g. `[123, 456, 789]`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `change_event_attachment_ids`: array of integer - List of attachment IDs to attach. These must presently be associated with Change Events. e.g. `[55, 66, 77]`
  - `request_for_quote_attachment_ids`: array of integer - List of attachment IDs to attach. These must presently be associated with Request For Quotes (or their Quotes / Responses). e.g. `[55, 66, 77]`
  - `attachment_ids`: array of integer - Existing attachments to preserve on the response e.g. `[6, 7]`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`

Response 201 (application/json): object

- `id`: integer - Commitment Change Order Batch ID e.g. `34219`
- `contract_id`: integer - Contract ID e.g. `45121`
- `created_at`: string(date-time) - Created at e.g. `2017-08-14T21:39:40Z`
- `description`: string - Description of the Commitment Change Order Batch e.g. `<p>Batch description</p>`
- `due_date`: string(date) - Due date e.g. `2021-05-14`
- `executed`: boolean - Whether or not the Commitment Change Order Batch is executed e.g. `true`
- `grand_total`: string - Total including markup e.g. `23474.0`
- `invoiced_date`: string(date) - Invoiced date e.g. `2021-05-14`
- `number`: string - Number e.g. `H-38`
- `paid_date`: string(date) - Paid date e.g. `2021-05-14`
- `private`: boolean - Only show this Contract to Admins and specific Accessors
- `review_notes`: string - Notes to assist the reviewer e.g. `Make sure Jon sees this before proceeding`
- `reviewed_at`: string(date-time) - Reviewed at e.g. `2016-10-24T15:42:33Z`
- `revised_substantial_completion_date`: string(date) - Revised substantial completion date e.g. `2021-05-13`
- `revision`: integer - Revision number e.g. `1`
- `schedule_impact_amount`: integer - Schedule impact in days e.g. `5`
- `signature_required`: boolean - Whether or not a signature is required on the Commitment Change Order e.g. `false`
- `signed_change_order_received_date`: string(date) - Signed change order received date e.g. `2016-10-23`
- `status`: string - The status of the Commitment Change Order e.g. `draft`
- `title`: string - Title e.g. `ABC Commitment Change Order Batch`
- `type`: string - Type e.g. `Commitment`
- `updated_at`: string(date-time) e.g. `2016-10-26T21:43:40Z`
- `created_by`: object - User that created the Commitment Change Order Batcb
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `designated_reviewer`: object - Commitment CO Batch Designated Reviewer.
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `reviewed_by`: object - Commitment CO Reviewed By
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
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
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/commitment_change_order_batches/{id}

**Show Commitment Change Order Batch**
Show the details of the Commitment Change Order Batch.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Commitment Change Order Batch

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/commitment_change_order_batches/{id}

**Update Commitment Change Order Batch**
Update the specified Commitment Change Order Batch.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Commitment Change Order Batch
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `change_order_batch`: object (required) - Change Order Batch object
  - `contract_id`: integer - Unique identifier for the contract. e.g. `512340`
  - `description`: string - Description e.g. `New Building`
  - `due_date`: string(date) - Due Date e.g. `2017-03-31`
  - `executed`: boolean - Whether or not the Change Order Batch is executed e.g. `true`
  - `invoiced_date`: string(date) - Invoiced Date e.g. `2017-03-31`
  - `number`: string - Number of the Change Order Batch e.g. `COB-1`
  - `paid_date`: string(date) - Paid Date e.g. `2017-03-31`
  - `private`: boolean - Whether or not the Change Order Batch is private e.g. `true`
  - `revised_substantial_completion_date`: string(date) - Revised substantial completion date e.g. `2017-10-30`
  - `revision`: integer - Revision Number e.g. `1`
  - `schedule_impact_amount`: integer - Schedule impact in days e.g. `5`
  - `signature_required`: boolean - Whether a signature will be required for this Change Order Batch e.g. `true`
  - `signed_change_order_received_date`: string(date) - Signed Change Order Batch Received Date e.g. `2015-01-30`
  - `status`: string - Status e.g. `draft`
  - `title`: string - Title of the Change Order Batch e.g. `Station 3`
  - `designated_reviewer_id`: integer - Unique identifier for the designated reviewer. This field is only supported for single-tier projects. Behavior is undefined in multi-tier projects. e.g. `512340`
  - `change_order_ids`: array of integer - Array of Change Order (PCO) IDs to link to this batch. This field is only supported for two-tier projects. e.g. `[123, 456, 789]`
  - `legacy_request_ids`: array of integer - Array of Change Order Request IDs to link to this batch. This field is only supported for three-tier projects. e.g. `[123, 456, 789]`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `change_event_attachment_ids`: array of integer - List of attachment IDs to attach. These must presently be associated with Change Events. e.g. `[55, 66, 77]`
  - `request_for_quote_attachment_ids`: array of integer - List of attachment IDs to attach. These must presently be associated with Request For Quotes (or their Quotes / Responses). e.g. `[55, 66, 77]`
  - `attachment_ids`: array of integer - Existing attachments to preserve on the response e.g. `[6, 7]`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`

Response 200 (application/json): object

- `id`: integer - Commitment Change Order Batch ID e.g. `34219`
- `contract_id`: integer - Contract ID e.g. `45121`
- `created_at`: string(date-time) - Created at e.g. `2017-08-14T21:39:40Z`
- `description`: string - Description of the Commitment Change Order Batch e.g. `<p>Batch description</p>`
- `due_date`: string(date) - Due date e.g. `2021-05-14`
- `executed`: boolean - Whether or not the Commitment Change Order Batch is executed e.g. `true`
- `grand_total`: string - Total including markup e.g. `23474.0`
- `invoiced_date`: string(date) - Invoiced date e.g. `2021-05-14`
- `number`: string - Number e.g. `H-38`
- `paid_date`: string(date) - Paid date e.g. `2021-05-14`
- `private`: boolean - Only show this Contract to Admins and specific Accessors
- `review_notes`: string - Notes to assist the reviewer e.g. `Make sure Jon sees this before proceeding`
- `reviewed_at`: string(date-time) - Reviewed at e.g. `2016-10-24T15:42:33Z`
- `revised_substantial_completion_date`: string(date) - Revised substantial completion date e.g. `2021-05-13`
- `revision`: integer - Revision number e.g. `1`
- `schedule_impact_amount`: integer - Schedule impact in days e.g. `5`
- `signature_required`: boolean - Whether or not a signature is required on the Commitment Change Order e.g. `false`
- `signed_change_order_received_date`: string(date) - Signed change order received date e.g. `2016-10-23`
- `status`: string - The status of the Commitment Change Order e.g. `draft`
- `title`: string - Title e.g. `ABC Commitment Change Order Batch`
- `type`: string - Type e.g. `Commitment`
- `updated_at`: string(date-time) e.g. `2016-10-26T21:43:40Z`
- `created_by`: object - User that created the Commitment Change Order Batcb
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `designated_reviewer`: object - Commitment CO Batch Designated Reviewer.
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `reviewed_by`: object - Commitment CO Reviewed By
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
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
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/commitment_change_order_batches/{id}

**Delete Commitment Change Order Batch**
Delete the specified Commitment Change Order Batch.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Commitment Change Order Batch

Response 204: No Content (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Commitment Change Order Export PDF

Resource id: `commitment-change-order-export-pdf`. Raw spec: `../openapi-raw/commitment-change-order-export-pdf.json`. Web: https://developers.procore.com/reference/rest/commitment-change-order-export-pdf?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_change_orders/{commitment_change_order_id}/pdf  **[BETA]**

**Check PDF generation status**
Check the status of a PDF document generation for a Commitment Change Order.
Note: This endpoint is currently only supported in Procore Zones US01 && US02.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `commitment_change_order_id` [path] string (required) - Unique identifier for the Commitment Change Order.

Response 202: Accepted (no body)

Error responses: 302, 400, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_change_orders/{commitment_change_order_id}/pdf  **[BETA]**

**Create PDF export for a Commitment Change Order**
Creates a PDF export for a given Commitment Change Order.
Note: This endpoint is currently only supported in Procore Zones US01 && US02.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `commitment_change_order_id` [path] string (required) - Unique identifier for the Commitment Change Order.

Response 202: Accepted, returns back location to PDF export job which can be queried for progress. (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Commitment Change Order Line Items

Resource id: `commitment-change-order-line-items`. Raw spec: `../openapi-raw/commitment-change-order-line-items.json`. Web: https://developers.procore.com/reference/rest/commitment-change-order-line-items?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_change_orders/{commitment_change_order_id}/line_items

**List Commitment Change Order Line Items**
List all line items for a given commitment change order.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `commitment_change_order_id` [path] string (required) - Unique identifier for the Commitment Change Order.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[default, extended] - The view to use for the response. Use `extended` to include `change_event_line_item` and `external_data` (ERP origin fields). An invalid value returns a 400 error.

Response 200 (application/json): object

- `data`: array of oneOf(object | object) - Array of Commitment Change Order Line Items

Error responses: 400, 401, 403, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_change_orders/{commitment_change_order_id}/line_items

**Create Commitment Change Order Line Item**
Creates a line item for a given commitment change order.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `commitment_change_order_id` [path] string (required) - Unique identifier for the Commitment Change Order.

Request body (application/json) (required):

- `prime_line_item_id`: string - ID of the prime contract line item associated with this line item e.g. `12345`
- `commitment_line_item_id`: string - ID of the commitment contract line item associated with this line item. For ERP-integrated projects, pass the string "new" to create a new zero-dollar line item on the parent commitment contract and automatically link... e.g. `12345`
- `amount`: string - Amount - this field is nullable on unit quantity SOVs but NOT amount-based SOVs. For line item creates, if this field is omitted on unit quantity SOVs, the amount will be calculated as quantity * unit_cost. For line i... e.g. `1000.0`
- `description`: string - Description e.g. `Cleanup`
- `quantity`: string - Quantity - only accepted on unit quantity SOVs e.g. `20.0`
- `unit_cost`: string - Unit cost - only accepted on unit quantity SOVs e.g. `50.00`
- `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure - only accepted on unit quantity SOVs e.g. `Hours`
- `wbs_code_id`: string (required) - WBS code ID e.g. `34567`
- `tax_code_id`: string - Tax code ID e.g. `12345`
- `funding_rule_id`: string - ID of the funding rule associated with this line item. Funding Sources must be enabled at the project level. The rule must be ACTIVE and its currency must match the contract currency. Pass null to disassociate an exis... e.g. `12345`

Response 200 (application/json): object

- `data`: object - A row on a schedule of values.
  - `prime_line_item_id`: string - ID of the prime contract line item associated with this line item e.g. `12345`
  - `commitment_line_item_id`: string - ID of the commitment contract line item associated with this line item e.g. `12345`
  - `funding_rule_id`: string - ID of the funding rule associated with this line item e.g. `12345`
  - `id`: string - ID e.g. `100`
  - `description`: string - Line item Description e.g. `Drywall for the 2nd floor`
  - `uom`: string - Line Item Unit of Measure e.g. `m²`
  - `quantity`: number - Line Item Quantity e.g. `100`
  - `unit_cost`: string - An "unformatted" decimal number. Specifically a number with a period as the decimal separator, without a thousands separator, and with an optional sign. It should be assumed that this number includes arbitrary precisi... e.g. `-12345.6789`
  - `amount`: string - An "unformatted" decimal number. Specifically a number with a period as the decimal separator, without a thousands separator, and with an optional sign. It should be assumed that this number includes arbitrary precisi... e.g. `-12345.6789`
  - `extended_type`: string enum[manual, calculated] - Extended type e.g. `calculated`
  - `wbs_code_id`: string - ID e.g. `100`
  - `tax_code_id`: string - ID e.g. `100`
  - `position`: number - Position of the line item within the schedule of values e.g. `1`
  - `wbs_code`: object - WBS Code details for the line item
    - `id`: string - WBS Code ID e.g. `999`
    - `flat_code`: string - WBS Code flat code e.g. `01-011.CT1`
    - `description`: string - WBS Code description e.g. `Earthwork.Equipment`

Error responses: 400, 401, 403, 409, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_change_orders/{commitment_change_order_id}/line_items/{id}

**Show Commitment Change Order Line Item**
Get a specified line item for a given commitment change order.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `commitment_change_order_id` [path] string (required) - Unique identifier for the Commitment Change Order.
- `id` [path] string (required) - ID of the line item
- `view` [query] string enum[default, extended] - The view to use for the response. Use `extended` to include `change_event_line_item` and `external_data` (ERP origin fields). An invalid value returns a 400 error.

Response 200 (application/json): object

- `data`: oneOf(object | object)

Error responses: 400, 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_change_orders/{commitment_change_order_id}/line_items/{id}

**Update Commitment Change Order Line Item**
Updates a line item for a given commitment change order.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `commitment_change_order_id` [path] string (required) - Unique identifier for the Commitment Change Order.
- `id` [path] string (required) - ID of the line item

Request body (application/json) (required):

- `prime_line_item_id`: string - ID of the prime contract line item associated with this line item e.g. `12345`
- `commitment_line_item_id`: string - ID of the commitment contract line item associated with this line item. For ERP-integrated projects, pass the string "new" to create a new zero-dollar line item on the parent commitment contract and automatically link... e.g. `12345`
- `amount`: string - Amount - this field is nullable on unit quantity SOVs but NOT amount-based SOVs. For line item creates, if this field is omitted on unit quantity SOVs, the amount will be calculated as quantity * unit_cost. For line i... e.g. `1000.0`
- `description`: string - Description e.g. `Cleanup`
- `quantity`: string - Quantity - only accepted on unit quantity SOVs e.g. `20.0`
- `unit_cost`: string - Unit cost - only accepted on unit quantity SOVs e.g. `50.00`
- `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure - only accepted on unit quantity SOVs e.g. `Hours`
- `wbs_code_id`: string - WBS code ID e.g. `34567`
- `tax_code_id`: string - Tax code ID e.g. `12345`
- `funding_rule_id`: string - ID of the funding rule associated with this line item. Funding Sources must be enabled at the project level. The rule must be ACTIVE and its currency must match the contract currency. Pass null to disassociate an exis... e.g. `12345`

Response 200 (application/json): object

- `data`: object - A row on a schedule of values.
  - `prime_line_item_id`: string - ID of the prime contract line item associated with this line item e.g. `12345`
  - `commitment_line_item_id`: string - ID of the commitment contract line item associated with this line item e.g. `12345`
  - `funding_rule_id`: string - ID of the funding rule associated with this line item e.g. `12345`
  - `id`: string - ID e.g. `100`
  - `description`: string - Line item Description e.g. `Drywall for the 2nd floor`
  - `uom`: string - Line Item Unit of Measure e.g. `m²`
  - `quantity`: number - Line Item Quantity e.g. `100`
  - `unit_cost`: string - An "unformatted" decimal number. Specifically a number with a period as the decimal separator, without a thousands separator, and with an optional sign. It should be assumed that this number includes arbitrary precisi... e.g. `-12345.6789`
  - `amount`: string - An "unformatted" decimal number. Specifically a number with a period as the decimal separator, without a thousands separator, and with an optional sign. It should be assumed that this number includes arbitrary precisi... e.g. `-12345.6789`
  - `extended_type`: string enum[manual, calculated] - Extended type e.g. `calculated`
  - `wbs_code_id`: string - ID e.g. `100`
  - `tax_code_id`: string - ID e.g. `100`
  - `position`: number - Position of the line item within the schedule of values e.g. `1`
  - `wbs_code`: object - WBS Code details for the line item
    - `id`: string - WBS Code ID e.g. `999`
    - `flat_code`: string - WBS Code flat code e.g. `01-011.CT1`
    - `description`: string - WBS Code description e.g. `Earthwork.Equipment`

Error responses: 400, 401, 403, 409, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_change_orders/{commitment_change_order_id}/line_items/{id}

**Delete Commitment Change Order Line Item**
Deletes a specified commitment change order line item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `commitment_change_order_id` [path] string (required) - Unique identifier for the Commitment Change Order.
- `id` [path] string (required) - ID of the line item

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Commitment Change Order Rows CSV Exports

Resource id: `commitment-change-order-rows-csv-exports`. Raw spec: `../openapi-raw/commitment-change-order-rows-csv-exports.json`. Web: https://developers.procore.com/reference/rest/commitment-change-order-rows-csv-exports?version=latest
Product lines: Construction Financials

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_change_order_rows/csv_exports  **[BETA]**

**Create CSV export for Commitment Change Order Rows**
Creates a CSV export for the Commitment Change Order Rows collection.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Response 202 (application/json): object

- `data`: object (required)
  - `export_id`: string (required) - Identifier for the asynchronous CSV export job.
  - `expires_at`: string(date-time) (required) - ISO8601 timestamp when the export URL will expire.

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_change_order_rows/csv_exports/{change_order_csv_export_id}  **[BETA]**

**Check CSV export status for Commitment Change Order Rows**
Returns the current status of a Commitment Change Order Rows CSV export request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `change_order_csv_export_id` [path] string (required) - Unique identifier for a change order CSV export job.

Response 202: Accepted. The CSV file is still being generated. (no body)

Error responses: 302, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Commitment Change Orders

Resource id: `commitment-change-orders`. Raw spec: `../openapi-raw/commitment-change-orders.json`. Web: https://developers.procore.com/reference/rest/commitment-change-orders?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/projects/{project_id}/commitment_change_orders

**Show All Commitment Change Orders**
Returns all Commitment Change Orders for the specified Project. This endpoint currently only supports projects using 1 and 2 tier change order configurations.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[default, extended] - Specifies Which view (which attributes) of the resource is going to be present in the response. the extended view includes change events data, while the default view does not.
- `sort` [query] string enum[id, created_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.
- `filters[id]` [query] integer - Filter results by Change Order ID
- `filters[batch_id]` [query] integer - Filter results by Change Order Batch ID
- `filters[legacy_package_id]` [query] integer - Filter results by legacy Change Order Package ID
- `filters[contract_id]` [query] integer - Filter results by Contract ID
- `filters[vendor_id]` [query] integer - Filter results by Contract Vendor ID
- `filters[signature_required]` [query] boolean - Filter results by signature_required
- `filters[executed]` [query] boolean - Filter results by executed
- `filters[status]` [query] string enum[draft, pricing, not_pricing, pending, revised, proceeding, not_proceeding, pending_billable, no_charge, approved, rejected, void] - Filter results by status
- `filters[updated_at]` [query] string - Return item(s) within a specific updated at iso8601 datetime range

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/commitment_change_orders

**Create Commitment Change Order**
Create a new Commitment Change Order. This endpoint currently only supports projects using 1 and 2 tier change order configurations.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `change_order`: object (required) - Change Order object
  - `contract_id`: integer (required) - Unique identifier for the contract. e.g. `512340`
  - `batch_id`: integer - Unique identifier for a change order batch. e.g. `512340`
  - `change_order_change_reason_id`: integer - Unique identifier for the change reason. e.g. `512340`
  - `location_id`: integer - Unique identifier for the location. e.g. `512340`
  - `designated_reviewer_id`: integer - Unique identifier for the designated reviewer. This field is only supported for single-tier projects. Behavior is undefined in multi-tier projects. e.g. `512340`
  - `received_from_id`: integer - Unique identifier for the received from entity. e.g. `512340`
  - `description`: string - Description e.g. `New Building`
  - `due_date`: string(date) - Due Date e.g. `2017-03-31`
  - `paid_date`: string(date) - Paid Date e.g. `2017-03-31`
  - `invoiced_date`: string(date) - Invoiced Date e.g. `2017-03-31`
  - `title`: string - Title of the Contract e.g. `Station 3`
  - `status`: string - Status e.g. `draft`
  - `reference`: string - Reference e.g. `Reference`
  - `number`: string - Number of the Change Order e.g. `CO-1`
  - `revision`: integer - Revision Number e.g. `1`
  - `field_change`: boolean - Field Change e.g. `Field Change`
  - `signature_required`: boolean - Whether a signature will be required for this Change Order e.g. `true`
  - `signed_change_order_received_date`: string(date) - Signed Change Order Received Date e.g. `2015-01-30`
  - `schedule_impact_amount`: integer - Schedule impact in days e.g. `5`
  - `executed`: boolean - Whether or not the Change Order is executed e.g. `true`
  - `private`: boolean - Whether or not the Commitment Change Order is private e.g. `true`
  - `paid`: boolean - Whether or not the Commitment Change Order is paid e.g. `true`
  - `reason`: string - Reason for the change order e.g. `Material cost increase`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `enable_ssov`: boolean - Whether to enable SSOV on this Change Order. Only applicable to Commitment Change Orders. e.g. `false`
  - `revised_substantial_completion_date`: string(date) - Revised substantial completion date, only supported for Prime Change Orders on single-tier projects. e.g. `2017-10-30`
  - `change_event_attachment_ids`: array of integer - List of attachment IDs to attach. These must presently be associated with Change Events. e.g. `[55, 66, 77]`
  - `request_for_quote_attachment_ids`: array of integer - List of attachment IDs to attach. These must presently be associated with Request For Quotes (or their Quotes / Responses). e.g. `[55, 66, 77]`
  - `attachment_ids`: array of integer - Existing attachments to preserve on the response e.g. `[6, 7]`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`

Response 201 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/commitment_change_orders/{id}

**Show Commitment Change Order**
Show the details of the Commitment Change Order. This endpoint currently only supports projects using 1 and 2 tier change order configurations.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Commitment Change Order
- `view` [query] string enum[default, extended] - Specifies Which view (which attributes) of the resource is going to be present in the response. the extended view includes change events data, while the default view does not.

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/commitment_change_orders/{id}

**Update Commitment Change Order**
Update the specified Commitment Change Order. This endpoint currently only supports projects using 1 and 2 tier change order configurations.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Commitment Change Order
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.
- `view` [query] string enum[default, extended] - Specifies Which view (which attributes) of the resource is going to be present in the response. the extended view includes change events data, while the default view does not.

Request body (application/json) (required):

- `change_order`: object (required) - Change Order object
  - `contract_id`: integer - Unique identifier for the contract. e.g. `512340`
  - `batch_id`: integer - Unique identifier for a change order batch. e.g. `512340`
  - `change_order_change_reason_id`: integer - Unique identifier for the change reason. e.g. `512340`
  - `location_id`: integer - Unique identifier for the location. e.g. `512340`
  - `designated_reviewer_id`: integer - Unique identifier for the designated reviewer. This field is only supported for single-tier projects. Behavior is undefined in multi-tier projects. e.g. `512340`
  - `received_from_id`: integer - Unique identifier for the received from entity. e.g. `512340`
  - `description`: string - Description e.g. `New Building`
  - `due_date`: string(date) - Due Date e.g. `2017-03-31`
  - `paid_date`: string(date) - Paid Date e.g. `2017-03-31`
  - `invoiced_date`: string(date) - Invoiced Date e.g. `2017-03-31`
  - `title`: string - Title of the Contract e.g. `Station 3`
  - `status`: string - Status e.g. `draft`
  - `reference`: string - Reference e.g. `Reference`
  - `number`: string - Number of the Change Order e.g. `CO-1`
  - `revision`: integer - Revision Number e.g. `1`
  - `field_change`: boolean - Field Change e.g. `Field Change`
  - `signature_required`: boolean - Whether a signature will be required for this Change Order e.g. `true`
  - `signed_change_order_received_date`: string(date) - Signed Change Order Received Date e.g. `2015-01-30`
  - `schedule_impact_amount`: integer - Schedule impact in days e.g. `5`
  - `executed`: boolean - Whether or not the Change Order is executed e.g. `true`
  - `private`: boolean - Whether or not the Commitment Change Order is private e.g. `true`
  - `paid`: boolean - Whether or not the Commitment Change Order is paid e.g. `true`
  - `reason`: string - Reason for the change order e.g. `Material cost increase`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `enable_ssov`: boolean - Whether to enable SSOV on this Change Order. Only applicable to Commitment Change Orders. e.g. `false`
  - `revised_substantial_completion_date`: string(date) - Revised substantial completion date, only supported for Prime Change Orders on single-tier projects. e.g. `2017-10-30`
  - `change_event_attachment_ids`: array of integer - List of attachment IDs to attach. These must presently be associated with Change Events. e.g. `[55, 66, 77]`
  - `request_for_quote_attachment_ids`: array of integer - List of attachment IDs to attach. These must presently be associated with Request For Quotes (or their Quotes / Responses). e.g. `[55, 66, 77]`
  - `attachment_ids`: array of integer - Existing attachments to preserve on the response e.g. `[6, 7]`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`

Response 200 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/commitment_change_orders/{id}

**Delete Commitment Change Order**
Delete the specified Commitment Change Order. This endpoint currently only supports projects using 1 and 2 tier change order configurations.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Commitment Change Order

Response 204: No Content (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Commitment Compliance

Resource id: `commitment-compliance`. Raw spec: `../openapi-raw/commitment-compliance.json`. Web: https://developers.procore.com/reference/rest/commitment-compliance?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/projects/{project_id}/work_order_contracts/{contract_id}/compliance

**Show compliance information for a Work Order Contract**
Return the compliance and insurance information for the specified contract. Includes any insurance documents for the vendor on this contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `contract_id` [path] integer (required) - identifier for the work order contract

Response 200 (application/json): object

- `updated_at`: string(datetime) - The last time the any of this compliance information was updated on this contract e.g. `2023-08-10T12:27:02Z`
- `updated_by_id`: integer - The last user who updated this compliance information e.g. `123`
- `compliance_status`: string enum[compliant, not_compliant, not_required] - The compliance status of this contract e.g. `compliant`
- `compliance_notes`: string - Any notes about the compliance status e.g. `Seems good.`
- `insurance_status`: string enum[compliant, not_compliant, not_required] - The insurance status of this contract e.g. `not_compliant`
- `insurance_notes`: string - Any notes about the insurance status e.g. `Could be better.`
- `derived_insurance_status`: string - A computed status based on the insurance documents for this contract's vendor. If all documents are compliant, this will be compliant. If any documents are not compliant, this will be not_compliant. If there are no do... e.g. `not_compliant`
- `insurance_documents`: array of object
  - `id`: integer - The identifier of the insurance record
  - `name`: string - The name of the insurance record
  - `insurance_type`: string - The type of the insurance record
  - `level`: string enum[company, project] - Whether this insurance record is attached in the company or project directory
  - `status`: string - The compliance status of this insurance document
  - `effective_at`: string(datetime) - The time which this insurance becomes effective. This time is the effective_date in the project or companies timezone converted to UTC.
  - `expires_at`: string(datetime) - The time which this insurance expires. This time is the expiration_date in the project or companies timezone converted to UTC.
  - `attachments`: array of object - the files attached to this insurance record
    - `id`: integer - a file identifier
    - `filename`: string - the name of the file
    - `content_type`: string - the content type of the file
    - `url`: string - a signed URL to load the file
- `derived_compliance_status`: string - A computed status based on the compliance documents for this contract. If all documents are compliant, this will be compliant. If any documents are not compliant, this will be not_compliant. If there are no documents,... e.g. `not_compliant`
- `compliance_documents`: array of object - Compliance Documents
  - `id`: integer
  - `name`: string
  - `notes`: string
  - `type`: string
  - `status`: string
  - `effective_at`: string(datetime)
  - `expires_at`: string(datetime)
  - `created_at`: string(datetime)
  - `updated_at`: string(datetime)
  - `attachments`: array of object - the files attached to this document
    - `id`: integer - a file identifier
    - `filename`: string - the name of the file
    - `content_type`: string - the content type of the file
    - `url`: string - a signed URL to load the file
- `insurance_requirements_not_created`: array of object - Insurance requirements that have conditions but are not yet created
  - `id`: integer - The identifier of the insurance requirement e.g. `1`
  - `name`: string - The name of the insurance requirement e.g. `Insurance Requirement with Conditions`
  - `level`: string - The level of the insurance requirement e.g. `project`
  - `status`: string - The status of the insurance requirement e.g. `condition_not_met`
- `compliance_requirements_not_created`: array of object - Compliance requirements that have conditions but are not yet created
  - `id`: integer - The identifier of the compliance requirement e.g. `1`
  - `name`: string - The name of the compliance requirement e.g. `Compliance Requirement with Conditions`
  - `type`: string - The type of the compliance requirement e.g. `safety`
  - `status`: string - The status of the compliance requirement e.g. `condition_not_met`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/work_order_contracts/{contract_id}/compliance

**Update the compliance information for a Work Order Contract**
Update the compliance information stored on the contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `contract_id` [path] integer (required) - identifier for the work order contract

Request body (application/json) (required):

- `compliance_status`: string enum[compliant, not_compliant, not_required]
- `compliance_notes`: string
- `insurance_status`: string enum[compliant, not_compliant, not_required]
- `insurance_notes`: string

Response 200 (application/json): object

- `updated_at`: string(datetime) - The last time the any of this compliance information was updated on this contract e.g. `2023-08-10T12:27:02Z`
- `updated_by_id`: integer - The last user who updated this compliance information e.g. `123`
- `compliance_status`: string enum[compliant, not_compliant, not_required] - The compliance status of this contract e.g. `compliant`
- `compliance_notes`: string - Any notes about the compliance status e.g. `Seems good.`
- `insurance_status`: string enum[compliant, not_compliant, not_required] - The insurance status of this contract e.g. `not_compliant`
- `insurance_notes`: string - Any notes about the insurance status e.g. `Could be better.`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/purchase_order_contracts/{contract_id}/compliance

**Show compliance information for a Purchase Order Contract**
Return the compliance and insurance information for the specified contract. Includes any insurance documents for the vendor on this contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `contract_id` [path] integer (required) - identifier for the work order contract

Response 200 (application/json): object

- `updated_at`: string(datetime) - The last time the any of this compliance information was updated on this contract e.g. `2023-08-10T12:27:02Z`
- `updated_by_id`: integer - The last user who updated this compliance information e.g. `123`
- `compliance_status`: string enum[compliant, not_compliant, not_required] - The compliance status of this contract e.g. `compliant`
- `compliance_notes`: string - Any notes about the compliance status e.g. `Seems good.`
- `insurance_status`: string enum[compliant, not_compliant, not_required] - The insurance status of this contract e.g. `not_compliant`
- `insurance_notes`: string - Any notes about the insurance status e.g. `Could be better.`
- `derived_insurance_status`: string - A computed status based on the insurance documents for this contract's vendor. If all documents are compliant, this will be compliant. If any documents are not compliant, this will be not_compliant. If there are no do... e.g. `not_compliant`
- `insurance_documents`: array of object
  - `id`: integer - The identifier of the insurance record
  - `name`: string - The name of the insurance record
  - `insurance_type`: string - The type of the insurance record
  - `level`: string enum[company, project] - Whether this insurance record is attached in the company or project directory
  - `status`: string - The compliance status of this insurance document
  - `effective_at`: string(datetime) - The time which this insurance becomes effective. This time is the effective_date in the project or companies timezone converted to UTC.
  - `expires_at`: string(datetime) - The time which this insurance expires. This time is the expiration_date in the project or companies timezone converted to UTC.
  - `attachments`: array of object - the files attached to this insurance record
    - `id`: integer - a file identifier
    - `filename`: string - the name of the file
    - `content_type`: string - the content type of the file
    - `url`: string - a signed URL to load the file
- `derived_compliance_status`: string - A computed status based on the compliance documents for this contract. If all documents are compliant, this will be compliant. If any documents are not compliant, this will be not_compliant. If there are no documents,... e.g. `not_compliant`
- `compliance_documents`: array of object - Compliance Documents
  - `id`: integer
  - `name`: string
  - `notes`: string
  - `type`: string
  - `status`: string
  - `effective_at`: string(datetime)
  - `expires_at`: string(datetime)
  - `created_at`: string(datetime)
  - `updated_at`: string(datetime)
  - `attachments`: array of object - the files attached to this document
    - `id`: integer - a file identifier
    - `filename`: string - the name of the file
    - `content_type`: string - the content type of the file
    - `url`: string - a signed URL to load the file
- `insurance_requirements_not_created`: array of object - Insurance requirements that have conditions but are not yet created
  - `id`: integer - The identifier of the insurance requirement e.g. `1`
  - `name`: string - The name of the insurance requirement e.g. `Insurance Requirement with Conditions`
  - `level`: string - The level of the insurance requirement e.g. `project`
  - `status`: string - The status of the insurance requirement e.g. `condition_not_met`
- `compliance_requirements_not_created`: array of object - Compliance requirements that have conditions but are not yet created
  - `id`: integer - The identifier of the compliance requirement e.g. `1`
  - `name`: string - The name of the compliance requirement e.g. `Compliance Requirement with Conditions`
  - `type`: string - The type of the compliance requirement e.g. `safety`
  - `status`: string - The status of the compliance requirement e.g. `condition_not_met`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/purchase_order_contracts/{contract_id}/compliance

**Update the compliance information for a Purchase Order Contract**
Update the compliance information stored on the contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `contract_id` [path] integer (required) - identifier for the work order contract

Request body (application/json) (required):

- `compliance_status`: string enum[compliant, not_compliant, not_required]
- `compliance_notes`: string
- `insurance_status`: string enum[compliant, not_compliant, not_required]
- `insurance_notes`: string

Response 200 (application/json): object

- `updated_at`: string(datetime) - The last time the any of this compliance information was updated on this contract e.g. `2023-08-10T12:27:02Z`
- `updated_by_id`: integer - The last user who updated this compliance information e.g. `123`
- `compliance_status`: string enum[compliant, not_compliant, not_required] - The compliance status of this contract e.g. `compliant`
- `compliance_notes`: string - Any notes about the compliance status e.g. `Seems good.`
- `insurance_status`: string enum[compliant, not_compliant, not_required] - The insurance status of this contract e.g. `not_compliant`
- `insurance_notes`: string - Any notes about the insurance status e.g. `Could be better.`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Commitment Compliance Documents

Resource id: `commitment-compliance-documents`. Raw spec: `../openapi-raw/commitment-compliance-documents.json`. Web: https://developers.procore.com/reference/rest/commitment-compliance-documents?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/projects/{project_id}/work_order_contracts/{contract_id}/compliance_documents

**Show compliance documents for a contract.**
Return all the compliance documents for a contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `contract_id` [path] integer (required) - identifier for the a commitment contract
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer
- `name`: string
- `notes`: string
- `type`: string
- `status`: string
- `effective_at`: string(datetime)
- `expires_at`: string(datetime)
- `created_at`: string(datetime)
- `updated_at`: string(datetime)
- `attachments`: array of object - the files attached to this document
  - `id`: integer - a file identifier
  - `filename`: string - the name of the file
  - `content_type`: string - the content type of the file
  - `url`: string - a signed URL to load the file

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/work_order_contracts/{contract_id}/compliance_documents

**Create a compliance document.**
Create a compliance document on a contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `contract_id` [path] integer (required) - identifier for the commitment contract

Request body (application/json) (required):

- `attributes`: object
  - `name`: string
  - `notes`: string
  - `type`: string enum[bond, license, master_agreement, permit, safety, w9, other]
  - `status`: string enum[compliant, not_compliant]
  - `effective_at`: string(datetime)
  - `expires_at`: string(datetime)
  - `send_expiration_notification`: boolean
  - `attachment_ids`: array of integer - Existing attachments to preserve on the response e.g. `[6, 7]`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`

Response 201 (application/json): object

- `id`: integer
- `name`: string
- `notes`: string
- `type`: string
- `status`: string
- `effective_at`: string(datetime)
- `expires_at`: string(datetime)
- `created_at`: string(datetime)
- `updated_at`: string(datetime)
- `attachments`: array of object - the files attached to this document
  - `id`: integer - a file identifier
  - `filename`: string - the name of the file
  - `content_type`: string - the content type of the file
  - `url`: string - a signed URL to load the file

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/work_order_contracts/{contract_id}/compliance_documents/{id}

**Show a compliance document.**
Show a specific compliance document by id.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `contract_id` [path] integer (required) - identifier for the a commitment contract
- `id` [path] integer (required) - identifier for the document

Response 200 (application/json): object

- `id`: integer
- `name`: string
- `notes`: string
- `type`: string
- `status`: string
- `effective_at`: string(datetime)
- `expires_at`: string(datetime)
- `created_at`: string(datetime)
- `updated_at`: string(datetime)
- `attachments`: array of object - the files attached to this document
  - `id`: integer - a file identifier
  - `filename`: string - the name of the file
  - `content_type`: string - the content type of the file
  - `url`: string - a signed URL to load the file

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/work_order_contracts/{contract_id}/compliance_documents/{id}

**Update a compliance document.**
Update the specified compliance document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `contract_id` [path] integer (required) - identifier for the commitment contract
- `id` [path] integer (required) - identifier for the document

Request body (application/json) (required):

- `attributes`: object
  - `name`: string
  - `notes`: string
  - `type`: string enum[bond, license, master_agreement, permit, safety, w9, other]
  - `status`: string enum[compliant, not_compliant]
  - `effective_at`: string(datetime)
  - `expires_at`: string(datetime)
  - `send_expiration_notification`: boolean
  - `attachment_ids`: array of integer - Existing attachments to preserve on the response e.g. `[6, 7]`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`

Response 200 (application/json): object

- `id`: integer
- `name`: string
- `notes`: string
- `type`: string
- `status`: string
- `effective_at`: string(datetime)
- `expires_at`: string(datetime)
- `created_at`: string(datetime)
- `updated_at`: string(datetime)
- `attachments`: array of object - the files attached to this document
  - `id`: integer - a file identifier
  - `filename`: string - the name of the file
  - `content_type`: string - the content type of the file
  - `url`: string - a signed URL to load the file

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/work_order_contracts/{contract_id}/compliance_documents/{id}

**Delete a compliance document.**
Delete the specified compliance document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `contract_id` [path] integer (required) - identifier for the commitment contract
- `id` [path] integer (required) - identifier for the document

Response 204: No Content (no body)

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/purchase_order_contracts/{contract_id}/compliance_documents  **[OLDER VERSION - a newer path version exists below/above]**

**Show compliance documents for a contract.**
Return all the compliance documents for a contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `contract_id` [path] integer (required) - identifier for the a commitment contract
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer
- `name`: string
- `notes`: string
- `type`: string
- `status`: string
- `effective_at`: string(datetime)
- `expires_at`: string(datetime)
- `created_at`: string(datetime)
- `updated_at`: string(datetime)
- `attachments`: array of object - the files attached to this document
  - `id`: integer - a file identifier
  - `filename`: string - the name of the file
  - `content_type`: string - the content type of the file
  - `url`: string - a signed URL to load the file

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/purchase_order_contracts/{contract_id}/compliance_documents  **[OLDER VERSION - a newer path version exists below/above]**

**Create a compliance document.**
Create a compliance document on a contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `contract_id` [path] integer (required) - identifier for the commitment contract

Request body (application/json) (required):

- `attributes`: object
  - `name`: string
  - `notes`: string
  - `type`: string enum[bond, license, master_agreement, permit, safety, w9, other]
  - `status`: string enum[compliant, not_compliant]
  - `effective_at`: string(datetime)
  - `expires_at`: string(datetime)
  - `send_expiration_notification`: boolean
  - `attachment_ids`: array of integer - Existing attachments to preserve on the response e.g. `[6, 7]`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`

Response 201 (application/json): object

- `id`: integer
- `name`: string
- `notes`: string
- `type`: string
- `status`: string
- `effective_at`: string(datetime)
- `expires_at`: string(datetime)
- `created_at`: string(datetime)
- `updated_at`: string(datetime)
- `attachments`: array of object - the files attached to this document
  - `id`: integer - a file identifier
  - `filename`: string - the name of the file
  - `content_type`: string - the content type of the file
  - `url`: string - a signed URL to load the file

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/purchase_order_contracts/{contract_id}/compliance_documents/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Show a compliance document.**
Show a specific compliance document by id.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `contract_id` [path] integer (required) - identifier for the a commitment contract
- `id` [path] integer (required) - identifier for the document

Response 200 (application/json): object

- `id`: integer
- `name`: string
- `notes`: string
- `type`: string
- `status`: string
- `effective_at`: string(datetime)
- `expires_at`: string(datetime)
- `created_at`: string(datetime)
- `updated_at`: string(datetime)
- `attachments`: array of object - the files attached to this document
  - `id`: integer - a file identifier
  - `filename`: string - the name of the file
  - `content_type`: string - the content type of the file
  - `url`: string - a signed URL to load the file

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/purchase_order_contracts/{contract_id}/compliance_documents/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Update a compliance document.**
Update the specified compliance document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `contract_id` [path] integer (required) - identifier for the commitment contract
- `id` [path] integer (required) - identifier for the document

Request body (application/json) (required):

- `attributes`: object
  - `name`: string
  - `notes`: string
  - `type`: string enum[bond, license, master_agreement, permit, safety, w9, other]
  - `status`: string enum[compliant, not_compliant]
  - `effective_at`: string(datetime)
  - `expires_at`: string(datetime)
  - `send_expiration_notification`: boolean
  - `attachment_ids`: array of integer - Existing attachments to preserve on the response e.g. `[6, 7]`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`

Response 200 (application/json): object

- `id`: integer
- `name`: string
- `notes`: string
- `type`: string
- `status`: string
- `effective_at`: string(datetime)
- `expires_at`: string(datetime)
- `created_at`: string(datetime)
- `updated_at`: string(datetime)
- `attachments`: array of object - the files attached to this document
  - `id`: integer - a file identifier
  - `filename`: string - the name of the file
  - `content_type`: string - the content type of the file
  - `url`: string - a signed URL to load the file

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/purchase_order_contracts/{contract_id}/compliance_documents/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Delete a compliance document.**
Delete the specified compliance document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `contract_id` [path] integer (required) - identifier for the commitment contract
- `id` [path] integer (required) - identifier for the document

Response 204: No Content (no body)

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Commitment Contract Attachments

Resource id: `commitment-contract-attachments`. Raw spec: `../openapi-raw/commitment-contract-attachments.json`. Web: https://developers.procore.com/reference/rest/commitment-contract-attachments?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_contracts/{commitment_contract_id}/attachments  **[BETA]**

**List Commitment Contract Attachments**
Returns a list of attachments for a given commitment contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `commitment_contract_id` [path] string (required) - Unique identifier for the Commitment Contract.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[contract][include_deleted]` [query] boolean - Whether to resolve the parent contract when it has been deleted. Set to true to list attachments for a deleted contract. Defaults to false.

Response 200 (application/json): object

- `data`: array of object - Array of commitment contract attachments
  - `id`: string - The unique identifier of the attachment e.g. `123`
  - `name`: string - The name of the attachment e.g. `attachment`
  - `url`: string - The URL of the attachment e.g. `https://example.com/attachment`
  - `content_type`: string - The content type of the attachment e.g. `application/pdf`
  - `uuid`: string - The UUID of the attachment e.g. `05bda4e805e4f29036435c0c94188cc61e34`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Commitment Contract Export PDF

Resource id: `commitment-contract-export-pdf`. Raw spec: `../openapi-raw/commitment-contract-export-pdf.json`. Web: https://developers.procore.com/reference/rest/commitment-contract-export-pdf?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_contracts/{commitment_contract_id}/pdf  **[BETA]**

**Check PDF generation status**
Check the status of a PDF document generation for a prime contract.
Note: This endpoint is currently only supported in Procore Zones US01 && US02.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `commitment_contract_id` [path] string (required) - Unique identifier for the Commitment Contract.

Response 202: Accepted (no body)

Error responses: 302, 400, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_contracts/{commitment_contract_id}/pdf  **[BETA]**

**Create PDF export for Commitment Contracts**
Creates a PDF export for a given Commitment Contract.
Note: This endpoint is currently only supported in Procore Zones US01 && US02.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `commitment_contract_id` [path] string (required) - Unique identifier for the Commitment Contract.

Response 202: Accepted, returns back location to PDF export job which can be queried for progress. (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Commitment Contract Line Items

Resource id: `commitment-contract-line-items`. Raw spec: `../openapi-raw/commitment-contract-line-items.json`. Web: https://developers.procore.com/reference/rest/commitment-contract-line-items?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_contracts/{commitment_contract_id}/line_items

**List Commitment Contract Line Items**
List all line items for a given commitment contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `commitment_contract_id` [path] string (required) - Unique identifier for the Commitment Contract.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[default, extended] - The view to use for the response. Use `extended` to include `change_event_line_item` and `external_data` (ERP origin fields). An invalid value returns a 400 error.

Response 200 (application/json): object

- `data`: array of oneOf(object | object) - Array of Commitment Contract Line Items

Error responses: 400, 401, 403, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_contracts/{commitment_contract_id}/line_items

**Create Commitment Contract Line Item**
Creates a line item for a given commitment contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `commitment_contract_id` [path] string (required) - Unique identifier for the Commitment Contract.

Request body (application/json) (required):

- `prime_line_item_id`: string - ID of the prime contract line item associated with this line item e.g. `12345`
- `amount`: string - Amount - this field is nullable on unit quantity SOVs but NOT amount-based SOVs. For line item creates, if this field is omitted on unit quantity SOVs, the amount will be calculated as quantity * unit_cost. For line i... e.g. `1000.0`
- `description`: string - Description e.g. `Cleanup`
- `quantity`: string - Quantity - only accepted on unit quantity SOVs e.g. `20.0`
- `unit_cost`: string - Unit cost - only accepted on unit quantity SOVs e.g. `50.00`
- `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure - only accepted on unit quantity SOVs e.g. `Hours`
- `wbs_code_id`: string (required) - WBS code ID e.g. `34567`
- `tax_code_id`: string - Tax code ID e.g. `12345`
- `funding_rule_id`: string - ID of the funding rule associated with this line item. Funding Sources must be enabled at the project level. The rule must be ACTIVE and its currency must match the contract currency. Pass null to disassociate an exis... e.g. `12345`

Response 200 (application/json): object

- `data`: object - A row on a commitment contract schedule of values.
  - `prime_line_item_id`: string - ID of the prime contract line item associated with this line item e.g. `12345`
  - `funding_rule_id`: string - ID of the funding rule associated with this line item e.g. `12345`
  - `id`: string - ID e.g. `100`
  - `description`: string - Line item Description e.g. `Drywall for the 2nd floor`
  - `uom`: string - Line Item Unit of Measure e.g. `m²`
  - `quantity`: number - Line Item Quantity e.g. `100`
  - `unit_cost`: string - An "unformatted" decimal number. Specifically a number with a period as the decimal separator, without a thousands separator, and with an optional sign. It should be assumed that this number includes arbitrary precisi... e.g. `-12345.6789`
  - `amount`: string - An "unformatted" decimal number. Specifically a number with a period as the decimal separator, without a thousands separator, and with an optional sign. It should be assumed that this number includes arbitrary precisi... e.g. `-12345.6789`
  - `extended_type`: string enum[manual, calculated] - Extended type e.g. `calculated`
  - `wbs_code_id`: string - ID e.g. `100`
  - `tax_code_id`: string - ID e.g. `100`
  - `position`: number - Position of the line item within the schedule of values e.g. `1`
  - `wbs_code`: object - WBS Code details for the line item
    - `id`: string - WBS Code ID e.g. `999`
    - `flat_code`: string - WBS Code flat code e.g. `01-011.CT1`
    - `description`: string - WBS Code description e.g. `Earthwork.Equipment`

Error responses: 400, 401, 403, 409, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_contracts/{commitment_contract_id}/line_items/{id}

**Show Commitment Contract Line Item**
Get a specified line item for a given commitment contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `commitment_contract_id` [path] string (required) - Unique identifier for the Commitment Contract.
- `id` [path] string (required) - ID of the line item
- `view` [query] string enum[default, extended] - The view to use for the response. Use `extended` to include `change_event_line_item` and `external_data` (ERP origin fields). An invalid value returns a 400 error.

Response 200 (application/json): object

- `data`: oneOf(object | object)

Error responses: 400, 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_contracts/{commitment_contract_id}/line_items/{id}

**Update Commitment Contract Line Item**
Updates a line item for a given commitment contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `commitment_contract_id` [path] string (required) - Unique identifier for the Commitment Contract.
- `id` [path] string (required) - ID of the line item

Request body (application/json) (required):

- `prime_line_item_id`: string - ID of the prime contract line item associated with this line item e.g. `12345`
- `amount`: string - Amount - this field is nullable on unit quantity SOVs but NOT amount-based SOVs. For line item creates, if this field is omitted on unit quantity SOVs, the amount will be calculated as quantity * unit_cost. For line i... e.g. `1000.0`
- `description`: string - Description e.g. `Cleanup`
- `quantity`: string - Quantity - only accepted on unit quantity SOVs e.g. `20.0`
- `unit_cost`: string - Unit cost - only accepted on unit quantity SOVs e.g. `50.00`
- `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure - only accepted on unit quantity SOVs e.g. `Hours`
- `wbs_code_id`: string - WBS code ID e.g. `34567`
- `tax_code_id`: string - Tax code ID e.g. `12345`
- `funding_rule_id`: string - ID of the funding rule associated with this line item. Funding Sources must be enabled at the project level. The rule must be ACTIVE and its currency must match the contract currency. Pass null to disassociate an exis... e.g. `12345`

Response 200 (application/json): object

- `data`: object - A row on a commitment contract schedule of values.
  - `prime_line_item_id`: string - ID of the prime contract line item associated with this line item e.g. `12345`
  - `funding_rule_id`: string - ID of the funding rule associated with this line item e.g. `12345`
  - `id`: string - ID e.g. `100`
  - `description`: string - Line item Description e.g. `Drywall for the 2nd floor`
  - `uom`: string - Line Item Unit of Measure e.g. `m²`
  - `quantity`: number - Line Item Quantity e.g. `100`
  - `unit_cost`: string - An "unformatted" decimal number. Specifically a number with a period as the decimal separator, without a thousands separator, and with an optional sign. It should be assumed that this number includes arbitrary precisi... e.g. `-12345.6789`
  - `amount`: string - An "unformatted" decimal number. Specifically a number with a period as the decimal separator, without a thousands separator, and with an optional sign. It should be assumed that this number includes arbitrary precisi... e.g. `-12345.6789`
  - `extended_type`: string enum[manual, calculated] - Extended type e.g. `calculated`
  - `wbs_code_id`: string - ID e.g. `100`
  - `tax_code_id`: string - ID e.g. `100`
  - `position`: number - Position of the line item within the schedule of values e.g. `1`
  - `wbs_code`: object - WBS Code details for the line item
    - `id`: string - WBS Code ID e.g. `999`
    - `flat_code`: string - WBS Code flat code e.g. `01-011.CT1`
    - `description`: string - WBS Code description e.g. `Earthwork.Equipment`

Error responses: 400, 401, 403, 409, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_contracts/{commitment_contract_id}/line_items/{id}

**Delete Commitment Contract Line Item**
Deletes a specified commitment contract line item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `commitment_contract_id` [path] string (required) - Unique identifier for the Commitment Contract.
- `id` [path] string (required) - ID of the line item

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Commitment Contract Summary

Resource id: `commitment-contract-summary`. Raw spec: `../openapi-raw/commitment-contract-summary.json`. Web: https://developers.procore.com/reference/rest/commitment-contract-summary?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_contracts/{contract_id}/summary

**Show Commitment Contract Summary**
Returns a combined summary of change order and invoicing information for a specific commitment contract (Purchase Order or Work Order).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `contract_id` [path] string (required) - ID of the Commitment Contract

Response 200 (application/json): object

- `data`: object - Combined Contract Summary containing both change order and invoicing information
  - `approved_change_total`: string(decimal) - The sum of all approved change orders' grand totals
  - `approved_change_total_tax_amount`: string(decimal) - The sum of all approved change orders' tax amounts
  - `pending_revised_change_total`: string(decimal) - The sum of all pending or revised change orders' grand totals
  - `pending_revised_change_total_tax_amount`: string(decimal) - The sum of all pending or revised change orders' tax amounts
  - `draft_change_total`: string(decimal) - The sum of all draft change orders' grand totals
  - `draft_change_total_tax_amount`: string(decimal) - The sum of all draft change orders' tax amounts
  - `total_invoices_amount`: string(decimal) - The amount of money billed on the contract to date
  - `total_payments_amount`: string(decimal) - Sum of all contract payments for this contract
  - `currency_configuration`: object - Currency configuration for the contract
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Commitment Contracts

Resource id: `commitment-contracts`. Raw spec: `../openapi-raw/commitment-contracts.json`. Web: https://developers.procore.com/reference/rest/commitment-contracts?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_contracts  **[BETA]**

**List Commitment Contracts**
Returns a list of Commitment Contracts for a given project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[default, extended] - Specifies which view (which attributes) of the resource is going to be present in the response. The extended view includes vendor name and custom fields data, while the default view does not.
- `filters[include_deleted]` [query] string enum[only, with] - Use 'only' to return only deleted resources. Use 'with' to return deleted and undeleted resources.
- `filters[accounting_method]` [query] string enum[unit, amount] - Filter to unit or amount based contracts
- `filters[type]` [query] string enum[WorkOrderContract, PurchaseOrderContract] - Filter based on what type of commitment contract it is.
- `filters[created_at]` [query] oneOf(string(date-time) | array of string(date-time) | string) - Filter based on the created_at time.
- `filters[deleted_at]` [query] oneOf(string(date-time) | array of string(date-time) | string) - Filter based on the deleted_at time.
- `filters[id]` [query] oneOf(integer | array of integer) - Return item(s) with the specified ID(s).
- `filters[signature_required]` [query] boolean - Filter based on whether a signature is required.
- `filters[status]` [query] oneOf(string | array of string) - Filter to specific statuses. For Work Order Contracts: Draft, Out For Bid, Out For Signature, Approved, Complete, Terminated, Void. For Purchase Order Contracts: Draft, Processing, Submitted, Partially Received, Recei...
- `filters[updated_at]` [query] oneOf(string(date-time) | array of string(date-time) | string) - Filter based on the updated_at time.
- `filters[vendor_id]` [query] oneOf(integer | array of integer) - Return item(s) with the specified Vendor ID(s).
- `filters[executed]` [query] boolean - Filter based on whether a contract is executed.
- `filters[search]` [query] string - Returns item(s) matching the specified search query string.

Response 200 (application/json): object

- `data`: oneOf(array of object | array of object | array of object)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_contracts  **[BETA]**

**Create Commitment Contract**
Creates a new Commitment Contract for a given project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `view` [query] string enum[default, extended] - Specifies which view (which attributes) of the resource is going to be present in the response. The extended view includes vendor name and custom fields data, while the default view does not.

Request body (application/json) (required):

- `type`: string enum[WorkOrderContract, PurchaseOrderContract] (required) - The type of the Commitment Contract. e.g. `WorkOrderContract`
- `number`: string - The Commitment Contract number. Defaults to the project numbering sequence for the respective contract type. e.g. `SC-001`
- `status`: string - The Commitment Contract status. e.g. `Approved`
- `title`: string - The Commitment Contract title. e.g. `ABC Contract`
- `description`: string - The Commitment Contract description. e.g. `<p>Yep, do it.</p>`
- `executed`: boolean - The Commitment Contract executed status. e.g. `true`
- `vendor_id`: string - The ID of the vendor for the contract. The selected invoice contacts must all belong to this vendor. When the vendor is changed, the invoice contacts are reset. e.g. `161072`
- `assignee_id`: string - Only applicable to Purchase Order Contracts. The ID of the user assigned to the Commitment Contract. The user must belong to the project directory (see the Project Users endpoint). e.g. `123`
- `signature_required`: boolean - If true, a signature is required to execute the contract; otherwise no signature is required. e.g. `true`
- `billing_schedule_of_values_status`: string - The subcontractor schedule of values (SSOV) status. Only applicable to contracts which use an SSOV. e.g. `approved`
- `inclusions`: string - Only applicable to Work Order Contracts. The inclusions of the Commitment Contract. e.g. `<p>Stairs, Elevator platform</p>`
- `exclusions`: string - Only applicable to Work Order Contracts. The exclusions of the Commitment Contract. e.g. `<p>Stairs, Elevator platform</p>`
- `bill_to_address`: string - Only applicable to Purchase Order Contracts. The address to which invoices are sent. The default will be the bill to address of the most recently created purchase order. e.g. `123 Maine Street, Brunswick, ME 04011`
- `ship_to_address`: string - Only applicable to Purchase Order Contracts. The address to which materials are shipped. The default will be the ship to address of the most recently created purchase order. e.g. `123 Maine Street, Brunswick, ME 04011`
- `ship_via`: string - Only applicable to Purchase Order Contracts. The shipping method for the Commitment Contract. e.g. `UPS`
- `payment_terms`: string - Only applicable to Purchase Order Contracts. The payment terms for the Commitment Contract. e.g. `Net 30`
- `payment_terms_id`: string - UUID of the payment terms record to associate with this Commitment Contract. e.g. `123e4567-e89b-12d3-a456-426614174000`
- `retainage_percent`: string - An "unformatted" decimal number. Specifically a number with a period as the decimal separator, without a thousands separator, and with an optional sign. It should be assumed that this number includes arbitrary precisi... e.g. `-12345.6789`
- `accounting_method`: string enum[amount, unit] - The accounting method for the contract. Default is driven by a project setting. e.g. `amount`
- `allow_comments`: boolean - If true, comments are allowed on the Commitment Contract; otherwise comments are not allowed. Default is driven by a project setting. e.g. `true`
- `allow_markups`: boolean - If true, markups are allowed on the Commitment Contract; otherwise markups are not allowed. Default is driven by a project setting. e.g. `false`
- `change_order_level_of_detail`: string enum[change_order_package, change_order_request, potential_change_order, line_item] - The level of details for showing change orders on invoices attached to this contract. e.g. `line_item`
- `enable_ssov`: boolean - If true, the subcontractor schedule of values (SSOV) is enabled for the Commitment Contract; otherwise the SSOV is not enabled. Default is driven by a project setting. e.g. `true`
- `allow_change_orders_ssov`: boolean - If true, the subcontractor schedule of values (SSOV) can be enabled on change orders for this Commitment Contract. When enabled, Change Order SSOV toggles become available. Default is false. e.g. `false`
- `allow_payment_applications`: boolean - If true, invoices are allowed on the Commitment Contract; otherwise invoices are not allowed. Default is driven by a project setting. e.g. `true`
- `allow_payments`: boolean - If true, payments are allowed on the Commitment Contract; otherwise payments are not allowed. Default is driven by a project setting. e.g. `true`
- `display_materials_retainage`: boolean - If true, materials retainage is displayed on the Commitment Contract; otherwise materials retainage is not displayed. Default is driven by a project setting. e.g. `true`
- `display_work_retainage`: boolean - If true, work retainage is displayed on the Commitment Contract; otherwise work retainage is not displayed. Default is driven by a project setting. e.g. `true`
- `show_cost_code_on_pdf`: boolean - If true, cost codes are displayed on the Commitment Contract PDF; otherwise cost codes are not displayed. Default is driven by a project setting. e.g. `true`
- `ssr_enabled`: boolean - If true, the sliding scale retention is enabled for the Commitment Contract. Default is driven by a project setting. e.g. `true`
- `bill_recipient_ids`: array of string - IDs of users in the project directory (see the Project Users endpoint). These users must belong to the selected vendor and are the invoice contacts for submitting subcontractor invoices. To grant access to view the co... e.g. `["123", "456"]`
- `private`: boolean - If true, visible to admins and accessors only; otherwise visible to those with access to the commitments tool. Default based on project level setting. e.g. `true`
- `show_line_items_to_non_admins`: boolean - Only applicable to private contracts. If true, line items are visible to non-admins; otherwise visible to admins only. e.g. `true`
- `accessor_ids`: array of string - Only applicable to private contracts. IDs of users in the project directory (see the Project Users endpoint). These users will be able to view the commitment contract. e.g. `["123", "456"]`
- `actual_completion_date`: string(date) - Only applicable to Work Order Contracts. e.g. `2016-08-04`
- `approval_letter_date`: string(date) e.g. `2016-08-04`
- `contract_date`: string(date) e.g. `2016-08-04`
- `contract_estimated_completion_date`: string(date) - Only applicable to Work Order Contracts. e.g. `2016-08-04`
- `contract_start_date`: string(date) - Only applicable to Work Order Contracts. e.g. `2016-08-04`
- `delivery_date`: string(date) - Only applicable to Purchase Order Contracts. e.g. `2016-08-04`
- `execution_date`: string(date) e.g. `2016-08-04`
- `issued_on_date`: string(date) e.g. `2016-08-04`
- `letter_of_intent_date`: string(date) e.g. `2016-08-04`
- `returned_date`: string(date) e.g. `2016-08-04`
- `signed_contract_received_date`: string(date) e.g. `2016-08-04`
- `currency_exchange_rate`: string - Exchange Rate from Contract Currency to Project Currency; It'll be accepted only when multicurrency phase two feature flag is enabled and user has the granular permission to edit the contract exchange rate. e.g. `1.5`
- `currency_iso_code`: string - Currency ISO code; It'll be accepted only when multicurrency phase two feature flag is enabled. e.g. `USD`
- `custom_field_%{custom_field_definition_id}`: oneOf(string | boolean | array of string) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
- `change_event_attachment_ids`: array of integer - List of attachment IDs to attach. These must presently be associated with Change Events. e.g. `[55, 66, 77]`
- `request_for_quote_attachment_ids`: array of integer - List of attachment IDs to attach. These must presently be associated with Request For Quotes (or their Quotes / Responses). e.g. `[55, 66, 77]`
- `attachment_ids`: array of string - The current attachments to the item. Values should be omitted to remove attachments. New files cannot be attached via this param. If the key is omitted, the existing attachments will remain unchanged. e.g. `["1", "2"]`
- `drawing_revision_ids`: array of string - Drawing Revisions to attach to the response e.g. `["3", "4"]`
- `file_version_ids`: array of string - File Versions to attach to the response e.g. `["5", "6"]`
- `form_ids`: array of string - Forms to attach to the response e.g. `["7", "8"]`
- `image_ids`: array of string - Images to attach to the response e.g. `["9", "10"]`
- `upload_ids`: array of string - Uploads to attach to the response e.g. `["01J15GF28TDQ2X20RNRJ5DDX27", "01J15GFDKQ4TDRBQPZ2M6E9H44"]`

Response 201 (application/json): object

- `data`: oneOf(object | object)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_contracts/{commitment_contract_id}  **[BETA]**

**Show Commitment Contract**
Returns a Commitment Contract for a given project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `commitment_contract_id` [path] string (required) - Unique identifier for the Commitment Contract.
- `view` [query] string enum[default, extended] - Specifies which view (which attributes) of the resource is going to be present in the response. The extended view includes vendor name and custom fields data, while the default view does not.
- `filters[include_deleted]` [query] string enum[only, with] - Use 'only' to return only deleted resources. Use 'with' to return deleted and undeleted resources.

Response 200 (application/json): object

- `data`: oneOf(object | object)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_contracts/{commitment_contract_id}  **[BETA]**

**Update Commitment Contract**
Updates a Commitment Contract for a given project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `commitment_contract_id` [path] string (required) - Unique identifier for the Commitment Contract.
- `view` [query] string enum[default, extended] - Specifies which view (which attributes) of the resource is going to be present in the response. The extended view includes vendor name and custom fields data, while the default view does not.

Request body (application/json) (required):

- `number`: string - The Commitment Contract number. Defaults to the project numbering sequence for the respective contract type. e.g. `SC-001`
- `status`: string - The Commitment Contract status. e.g. `Approved`
- `title`: string - The Commitment Contract title. e.g. `ABC Contract`
- `description`: string - The Commitment Contract description. e.g. `<p>Yep, do it.</p>`
- `executed`: boolean - The Commitment Contract executed status. e.g. `true`
- `vendor_id`: string - The ID of the vendor for the contract. The selected invoice contacts must all belong to this vendor. When the vendor is changed, the invoice contacts are reset. e.g. `161072`
- `assignee_id`: string - Only applicable to Purchase Order Contracts. The ID of the user assigned to the Commitment Contract. The user must belong to the project directory (see the Project Users endpoint). e.g. `123`
- `signature_required`: boolean - If true, a signature is required to execute the contract; otherwise no signature is required. e.g. `true`
- `billing_schedule_of_values_status`: string - The subcontractor schedule of values (SSOV) status. Only applicable to contracts which use an SSOV. e.g. `approved`
- `inclusions`: string - Only applicable to Work Order Contracts. The inclusions of the Commitment Contract. e.g. `<p>Stairs, Elevator platform</p>`
- `exclusions`: string - Only applicable to Work Order Contracts. The exclusions of the Commitment Contract. e.g. `<p>Stairs, Elevator platform</p>`
- `bill_to_address`: string - Only applicable to Purchase Order Contracts. The address to which invoices are sent. The default will be the bill to address of the most recently created purchase order. e.g. `123 Maine Street, Brunswick, ME 04011`
- `ship_to_address`: string - Only applicable to Purchase Order Contracts. The address to which materials are shipped. The default will be the ship to address of the most recently created purchase order. e.g. `123 Maine Street, Brunswick, ME 04011`
- `ship_via`: string - Only applicable to Purchase Order Contracts. The shipping method for the Commitment Contract. e.g. `UPS`
- `payment_terms`: string - Only applicable to Purchase Order Contracts. The payment terms for the Commitment Contract. e.g. `Net 30`
- `payment_terms_id`: string - UUID of the payment terms record to associate with this Commitment Contract. e.g. `123e4567-e89b-12d3-a456-426614174000`
- `retainage_percent`: string - An "unformatted" decimal number. Specifically a number with a period as the decimal separator, without a thousands separator, and with an optional sign. It should be assumed that this number includes arbitrary precisi... e.g. `-12345.6789`
- `accounting_method`: string enum[amount, unit] - The accounting method for the contract. Default is driven by a project setting. e.g. `amount`
- `allow_comments`: boolean - If true, comments are allowed on the Commitment Contract; otherwise comments are not allowed. Default is driven by a project setting. e.g. `true`
- `allow_markups`: boolean - If true, markups are allowed on the Commitment Contract; otherwise markups are not allowed. Default is driven by a project setting. e.g. `false`
- `change_order_level_of_detail`: string enum[change_order_package, change_order_request, potential_change_order, line_item] - The level of details for showing change orders on invoices attached to this contract. e.g. `line_item`
- `enable_ssov`: boolean - If true, the subcontractor schedule of values (SSOV) is enabled for the Commitment Contract; otherwise the SSOV is not enabled. Default is driven by a project setting. e.g. `true`
- `allow_change_orders_ssov`: boolean - If true, the subcontractor schedule of values (SSOV) can be enabled on change orders for this Commitment Contract. When enabled, Change Order SSOV toggles become available. Default is false. e.g. `false`
- `allow_payment_applications`: boolean - If true, invoices are allowed on the Commitment Contract; otherwise invoices are not allowed. Default is driven by a project setting. e.g. `true`
- `allow_payments`: boolean - If true, payments are allowed on the Commitment Contract; otherwise payments are not allowed. Default is driven by a project setting. e.g. `true`
- `display_materials_retainage`: boolean - If true, materials retainage is displayed on the Commitment Contract; otherwise materials retainage is not displayed. Default is driven by a project setting. e.g. `true`
- `display_work_retainage`: boolean - If true, work retainage is displayed on the Commitment Contract; otherwise work retainage is not displayed. Default is driven by a project setting. e.g. `true`
- `show_cost_code_on_pdf`: boolean - If true, cost codes are displayed on the Commitment Contract PDF; otherwise cost codes are not displayed. Default is driven by a project setting. e.g. `true`
- `ssr_enabled`: boolean - If true, the sliding scale retention is enabled for the Commitment Contract. Default is driven by a project setting. e.g. `true`
- `bill_recipient_ids`: array of string - IDs of users in the project directory (see the Project Users endpoint). These users must belong to the selected vendor and are the invoice contacts for submitting subcontractor invoices. To grant access to view the co... e.g. `["123", "456"]`
- `private`: boolean - If true, visible to admins and accessors only; otherwise visible to those with access to the commitments tool. Default based on project level setting. e.g. `true`
- `show_line_items_to_non_admins`: boolean - Only applicable to private contracts. If true, line items are visible to non-admins; otherwise visible to admins only. e.g. `true`
- `accessor_ids`: array of string - Only applicable to private contracts. IDs of users in the project directory (see the Project Users endpoint). These users will be able to view the commitment contract. e.g. `["123", "456"]`
- `actual_completion_date`: string(date) - Only applicable to Work Order Contracts. e.g. `2016-08-04`
- `approval_letter_date`: string(date) e.g. `2016-08-04`
- `contract_date`: string(date) e.g. `2016-08-04`
- `contract_estimated_completion_date`: string(date) - Only applicable to Work Order Contracts. e.g. `2016-08-04`
- `contract_start_date`: string(date) - Only applicable to Work Order Contracts. e.g. `2016-08-04`
- `delivery_date`: string(date) - Only applicable to Purchase Order Contracts. e.g. `2016-08-04`
- `execution_date`: string(date) e.g. `2016-08-04`
- `issued_on_date`: string(date) e.g. `2016-08-04`
- `letter_of_intent_date`: string(date) e.g. `2016-08-04`
- `returned_date`: string(date) e.g. `2016-08-04`
- `signed_contract_received_date`: string(date) e.g. `2016-08-04`
- `currency_exchange_rate`: string - Exchange Rate from Contract Currency to Project Currency; It'll be accepted only when multicurrency phase two feature flag is enabled and user has the granular permission to edit the contract exchange rate. e.g. `1.5`
- `currency_iso_code`: string - Currency ISO code; It'll be accepted only when multicurrency phase two feature flag is enabled. e.g. `USD`
- `custom_field_%{custom_field_definition_id}`: oneOf(string | boolean | array of string) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
- `change_event_attachment_ids`: array of integer - List of attachment IDs to attach. These must presently be associated with Change Events. e.g. `[55, 66, 77]`
- `request_for_quote_attachment_ids`: array of integer - List of attachment IDs to attach. These must presently be associated with Request For Quotes (or their Quotes / Responses). e.g. `[55, 66, 77]`
- `attachment_ids`: array of string - The current attachments to the item. Values should be omitted to remove attachments. New files cannot be attached via this param. If the key is omitted, the existing attachments will remain unchanged. e.g. `["1", "2"]`
- `drawing_revision_ids`: array of string - Drawing Revisions to attach to the response e.g. `["3", "4"]`
- `file_version_ids`: array of string - File Versions to attach to the response e.g. `["5", "6"]`
- `form_ids`: array of string - Forms to attach to the response e.g. `["7", "8"]`
- `image_ids`: array of string - Images to attach to the response e.g. `["9", "10"]`
- `upload_ids`: array of string - Uploads to attach to the response e.g. `["01J15GF28TDQ2X20RNRJ5DDX27", "01J15GFDKQ4TDRBQPZ2M6E9H44"]`

Response 200 (application/json): object

- `data`: oneOf(object | object)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_contracts/{commitment_contract_id}  **[BETA]**

**Delete Commitment Contract**
Deletes a Commitment Contract for a given project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `commitment_contract_id` [path] string (required) - Unique identifier for the Commitment Contract.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Commitments

Resource id: `commitments`. Raw spec: `../openapi-raw/commitments.json`. Web: https://developers.procore.com/reference/rest/commitments?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/commitments  **[DEPRECATED]**

**List Commitments**
Returns a list of Commitments.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: number - Commitment ID e.g. `1`
- `title`: string - Title e.g. `ABC Owner Contract`
- `number`: string - Number e.g. `A-1`
- `status`: string enum[Draft, Out For Bid, Out For Signature, Approved, Complete, Terminated, Void] - Status e.g. `Approved`
- `description`: string - Description of the Prime Contract e.g. `<p>Owner Contract</p>`
- `executed`: boolean - Executed status e.g. `true`
- `delivery_date`: string(date) - Delivery date e.g. `2014-02-15`
- `created_at`: string(date-time) - Created at e.g. `2014-01-01T21:55:10Z`
- `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/commitments/{id}  **[DEPRECATED]**

**Show a Commitment Contract**
Returns detailed information on a Commitment Contract.
### Special notes (Tiers)
The visibility of Change Order Packages, Potential Change Orders & Change Order Requests
depends on the number of tiers defined in the Commitment Contract as follows:
1-tier: Change Order Packages
2-tier: Change Order Packages, Potential Change Orders
3-tier: Change Order Packages, Change Order Requests, Potential Change Orders

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: number - Commitment ID e.g. `1`
- `title`: string - Title e.g. `ABC Owner Contract`
- `number`: string - Number e.g. `A-1`
- `status`: string enum[Draft, Out For Bid, Out For Signature, Approved, Complete, Terminated, Void] - Status e.g. `Approved`
- `description`: string - Description of the Prime Contract e.g. `<p>Owner Contract</p>`
- `executed`: boolean - Executed status e.g. `true`
- `delivery_date`: string(date) - Delivery date e.g. `2014-02-15`
- `created_at`: string(date-time) - Created at e.g. `2014-01-01T21:55:10Z`
- `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
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
- `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
- `actual_completion_date`: string(date) - Actual completion date e.g. `2015-12-31`
- `allow_comments`: boolean - Allow comments status e.g. `true`
- `allow_markups`: boolean - Allow markups status e.g. `false`
- `allow_payment_applications`: boolean - Enable/Disable Payment Applications (Owner Invoices) e.g. `true`
- `allow_payments`: boolean - Enable/Disable payments e.g. `true`
- `allow_redistributions`: boolean - Deprecated - always false e.g. `false`
- `approved_change_orders`: string - Approved change orders amount e.g. `3434.0`
- `bill_to`: string - Bill to address e.g. `5000 Construction Street`
- `budget_line_item_id`: integer - Budget line item ID e.g. `50123`
- `contract_estimated_completion_date`: string(date) - Contract estimated completion date e.g. `2016-01-31`
- `contract_start_date`: string(date) - Contract start date e.g. `2014-01-31`
- `contract_termination_date`: string(date) - Contract termination date e.g. `2016-12-31`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-01-04T23:55:19Z`
- `display_materials_retainage`: boolean - Display materials retainage status e.g. `true`
- `display_stored_materials`: boolean - Enable/Disable stored materials e.g. `false`
- `display_work_retainage`: boolean - Display work retainage e.g. `true`
- `exclusions`: string - Exclusions e.g. `<p>Interior finishing</p>`
- `grand_total`: string - Total of Line items including markup, plus project level (vertical) markup, if any e.g. `57750.0`
- `inclusions`: string - Inclusions
- `line_items_extended_total`: string - Total of Line items including markup e.g. `55000.0`
- `line_items_total`: string - Total of Line items without markup e.g. `50000.0`
- `payment_terms`: string - Payment terms e.g. `Net 30`
- `pending_change_orders`: string - Total of all pending and revised change orders e.g. `750.00`
- `pending_revised_contract`: string - Revised contract amount, plus pending and revised change orders e.g. `750.00`
- `percentage_paid`: string - Percentage paid e.g. `23.0`
- `position`: integer - Position e.g. `2`
- `remaining_balance_outstanding`: string - Revised contract amount minus total payments e.g. `750.00`
- `requisition_number`: string - Requisition (Subcontractor Invoice) number e.g. `2011`
- `retainage_percent`: string - Retainage percent e.g. `10`
- `revised_contract`: string - Grand total, plus approved change orders e.g. `750.00`
- `ship_to`: string - Ship to address e.g. `<p>5000 Construction Street</p>`
- `ship_via`: string - Ship via e.g. `Your truck`
- `signed_contract_received_date`: string(date) - Signed contract received date e.g. `2014-02-15`
- `total_payments`: string - Total payments e.g. `0.0`
- `total_draw_requests_amount`: string - Total draw requests amount e.g. `0.0`
- `type`: string enum[WorkOrderContract, PurchaseOrderContract] - Type e.g. `WorkOrderContract`
- `updated_at`: string(date-time) - Updated at e.g. `2016-01-04T23:55:19Z`
- `architect`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `assigned_to`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `change_order_packages`: array of object - Change order packages
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
- `change_order_requests`: array of array of object - Change order requests (tiers > 2)
- `contractor`: object
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
- `cost_code`: oneOf(object | object)
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `line_items`: array of object - Line items
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
  - `updated_at`: string(date-time) - Updated at date and time e.g. `2016-09-01T21:33:54Z`
  - `change_event_line_item`: object - Change Event Line Item
    - `id`: integer - Change Event Line Item ID e.g. `5`
    - `cost_rom`: string(float) - Change Event Line Item Cost ROM e.g. `100.0`
    - `revenue_rom`: string(float) - Change Event Line Item Revenue ROM e.g. `200.0`
    - `event_id`: integer - Change Event ID e.g. `6`
    - `cost_code`: oneOf(object | object)
    - `line_item_type`: object - Line Item Type
- `potential_change_orders`: array of object - Potential change orders (tiers > 1)
  - `id`: integer - Potential change order id e.g. `570623`
  - `created_at`: string(date-time) - Potential change order created at e.g. `2012-10-23T21:39:40Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2012-11-24T21:39:40Z`
  - `due_date`: string(date) - Potential change order due date e.g. `2012-11-23`
  - `invoiced_date`: string(date) - Potential change order invoiced date e.g. `2012-10-24`
  - `number`: string - Potential change order number e.g. `004`
  - `paid_date`: string(date) - Potential change order paid date e.g. `2012-11-21`
  - `reviewed_at`: string(date-time) - Potential change order reviewed at e.g. `2012-10-23T21:44:40Z`
  - `title`: string - Potential change order title e.g. `Field Bulletin #3 - Steel staircase on roof`
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Potential change order status e.g. `approved`
  - `updated_at`: string(date-time) - Potential change order updated at e.g. `2012-11-23T21:39:40Z`
- `payments_issued`: array of object - Payments issued
  - `id`: integer - ID e.g. `1551516`
  - `amount`: string - Payment amount e.g. `1000000.0`
  - `check_number`: string - Check number e.g. `ABC93759372`
  - `created_at`: string(date-time) - Created at e.g. `2015-07-14T22:03:27Z`
  - `date`: string(date) - Payment date e.g. `2015-07-15`
  - `draw_request_number`: integer - Payment number of a Draw Request, Owner Invoice, or Subcontractor Invoice e.g. `5`
  - `invoice_number`: string - Invoice number e.g. `Invoice 123`
  - `notes`: string - Associated notes e.g. `January Payment`
  - `payment_number`: integer - Payment number e.g. `5`
  - `attachments`: array of object - Payment attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `origin_id`: string - Origin ID e.g. `abc-123`
  - `origin_data`: string - Origin data e.g. `XYZ-0012`
- `received_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Contract Payments

Resource id: `contract-payments`. Raw spec: `../openapi-raw/contract-payments.json`. Web: https://developers.procore.com/reference/rest/contract-payments?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/contract_payments

**List Contract Payments**
Return a list of Contract Payments.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `contract_id` [query] integer (required) - ID of the Contract
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this contract payment. e.g. `1551516`
- `amount`: string - Monetary amount of this payment, as a decimal string. e.g. `1000000.0`
- `check_number`: string - Check number associated with this payment, when paid by check. e.g. `ABC93759372`
- `contract_id`: integer - Contract ID associated with the payment e.g. `1630397`
- `created_at`: string(date-time) - Created at e.g. `2015-07-14T22:03:27Z`
- `updated_at`: string(date-time) - Updated at e.g. `2015-07-14T22:03:27Z`
- `date`: string(date) - Payment Date e.g. `2015-07-15`
- `date_payment_settled`: string(date-time) - Date Payment settled e.g. `2022-07-18T22:03:27Z`
- `date_payment_initiated`: string(date-time) - Date Payment Initiated e.g. `2022-07-18T22:03:27Z`
- `draw_request_number`: integer - Payment number of a Draw Request, Owner Invoice, or Subcontractor Invoice e.g. `5`
- `external_payment_id`: string - Only payments made through Procore Pay have an external_payment_id e.g. `2169c3f0-5ee4-4eec-8e3c-9644db424550`
- `invoice_number`: string - Invoice number e.g. `Invoice 123`
- `notes`: string - Associated notes e.g. `January Payment`
- `payment_number`: integer - Payment number e.g. `5`
- `attachments`: array of object - Payment attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `project_id`: integer(int64) - Integer ID for the associated Project e.g. `1232`
- `requisition_id`: integer - Subcontractor requisition ID e.g. `789`
- `origin_id`: string - Identifier for this payment in the external/third-party system it originated from. e.g. `abc-123`
- `origin_code`: string - Code for this payment in the external/third-party system it originated from. e.g. `code-1`
- `origin_data`: string - Additional third-party data captured with this payment. e.g. `XYZ-0012`
- `status`: string - Lifecycle status of this payment (for example, unpaid, in_review, approved, processing, paid, rejected, failed). e.g. `in_review`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/contract_payments

**Create Contract Payment**
Create a new Contract Payment.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `66005`
- `contract_id`: integer (required) - Contract ID e.g. `85302`
- `attachments`: array of string - Contract payment attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
- `contract_payment`: object - Contract Payment object
  - `date`: string(date) - Payment date e.g. `2015-09-29`
  - `invoice_number`: string - Invoice number e.g. `Invoice 123`
  - `check_number`: string - Check number e.g. `ABC93759372`
  - `invoice_date`: string(date) - Invoice date e.g. `2015-09-20`
  - `draw_request_number`: integer - Draw Request number e.g. `5`
  - `notes`: string - Associated notes e.g. `January Payment`
  - `payment_number`: integer - Payment number e.g. `5`
  - `payment_method`: string enum[check, credit_card, electronic] - Payment method e.g. `credit_card`
  - `amount`: string - Payment amount e.g. `1000000.0`
  - `origin_id`: string - Contract payment third party ID e.g. `abc-123`
  - `origin_data`: string - Contract payment third party data e.g. `XYZ-0012`
  - `requisition_id`: integer - Subcontractor requisition ID e.g. `123`
  - `prostore_file_ids`: array of integer - Any prostore files to actualize contract payment's attachments. Mutually exclusive with the `attachments` property. e.g. `[1, 2, 3, 4]`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this contract payment. e.g. `1551516`
- `amount`: string - Monetary amount of this payment, as a decimal string. e.g. `1000000.0`
- `check_number`: string - Check number associated with this payment, when paid by check. e.g. `ABC93759372`
- `contract_id`: integer - Contract ID associated with the payment e.g. `1630397`
- `created_at`: string(date-time) - Created at e.g. `2015-07-14T22:03:27Z`
- `updated_at`: string(date-time) - Updated at e.g. `2015-07-14T22:03:27Z`
- `date`: string(date) - Payment Date e.g. `2015-07-15`
- `date_payment_settled`: string(date-time) - Date Payment settled e.g. `2022-07-18T22:03:27Z`
- `date_payment_initiated`: string(date-time) - Date Payment Initiated e.g. `2022-07-18T22:03:27Z`
- `draw_request_number`: integer - Payment number of a Draw Request, Owner Invoice, or Subcontractor Invoice e.g. `5`
- `external_payment_id`: string - Only payments made through Procore Pay have an external_payment_id e.g. `2169c3f0-5ee4-4eec-8e3c-9644db424550`
- `invoice_number`: string - Invoice number e.g. `Invoice 123`
- `notes`: string - Associated notes e.g. `January Payment`
- `payment_number`: integer - Payment number e.g. `5`
- `attachments`: array of object - Payment attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `project_id`: integer(int64) - Integer ID for the associated Project e.g. `1232`
- `requisition_id`: integer - Subcontractor requisition ID e.g. `789`
- `origin_id`: string - Identifier for this payment in the external/third-party system it originated from. e.g. `abc-123`
- `origin_code`: string - Code for this payment in the external/third-party system it originated from. e.g. `code-1`
- `origin_data`: string - Additional third-party data captured with this payment. e.g. `XYZ-0012`
- `status`: string - Lifecycle status of this payment (for example, unpaid, in_review, approved, processing, paid, rejected, failed). e.g. `in_review`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/contract_payments/{id}

**Show Contract Payment**
Return detailed information on the specified Contract Payment.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `contract_id` [query] integer (required) - ID of the Contract

Response 200 (application/json): object

- `id`: integer - Unique identifier for this contract payment. e.g. `1551516`
- `amount`: string - Monetary amount of this payment, as a decimal string. e.g. `1000000.0`
- `check_number`: string - Check number associated with this payment, when paid by check. e.g. `ABC93759372`
- `contract_id`: integer - Contract ID associated with the payment e.g. `1630397`
- `created_at`: string(date-time) - Created at e.g. `2015-07-14T22:03:27Z`
- `updated_at`: string(date-time) - Updated at e.g. `2015-07-14T22:03:27Z`
- `date`: string(date) - Payment Date e.g. `2015-07-15`
- `date_payment_settled`: string(date-time) - Date Payment settled e.g. `2022-07-18T22:03:27Z`
- `date_payment_initiated`: string(date-time) - Date Payment Initiated e.g. `2022-07-18T22:03:27Z`
- `draw_request_number`: integer - Payment number of a Draw Request, Owner Invoice, or Subcontractor Invoice e.g. `5`
- `external_payment_id`: string - Only payments made through Procore Pay have an external_payment_id e.g. `2169c3f0-5ee4-4eec-8e3c-9644db424550`
- `invoice_number`: string - Invoice number e.g. `Invoice 123`
- `notes`: string - Associated notes e.g. `January Payment`
- `payment_number`: integer - Payment number e.g. `5`
- `attachments`: array of object - Payment attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `project_id`: integer(int64) - Integer ID for the associated Project e.g. `1232`
- `requisition_id`: integer - Subcontractor requisition ID e.g. `789`
- `origin_id`: string - Identifier for this payment in the external/third-party system it originated from. e.g. `abc-123`
- `origin_code`: string - Code for this payment in the external/third-party system it originated from. e.g. `code-1`
- `origin_data`: string - Additional third-party data captured with this payment. e.g. `XYZ-0012`
- `status`: string - Lifecycle status of this payment (for example, unpaid, in_review, approved, processing, paid, rejected, failed). e.g. `in_review`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/contract_payments/{id}

**Update Contract Payment**
Update a Contract Payment. All attributes other than 'attachments', 'origin_id', and 'origin_data' will be locked if the contract payment is synced with an ERP system.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `66005`
- `contract_id`: integer (required) - Contract ID e.g. `85302`
- `attachments`: array of string - Contract payment attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
- `contract_payment`: object - Contract Payment object
  - `date`: string(date) - Payment date e.g. `2015-09-29`
  - `invoice_number`: string - Invoice number e.g. `Invoice 123`
  - `check_number`: string - Check number e.g. `ABC93759372`
  - `invoice_date`: string(date) - Invoice date e.g. `2015-09-20`
  - `draw_request_number`: integer - Draw Request number e.g. `5`
  - `notes`: string - Associated notes e.g. `January Payment`
  - `payment_number`: integer - Payment number e.g. `5`
  - `payment_method`: string enum[check, credit_card, electronic] - Payment method e.g. `credit_card`
  - `amount`: string - Payment amount e.g. `1000000.0`
  - `origin_id`: string - Contract payment third party ID e.g. `abc-123`
  - `origin_data`: string - Contract payment third party data e.g. `XYZ-0012`
  - `requisition_id`: integer - Subcontractor requisition ID e.g. `123`
  - `prostore_file_ids`: array of integer - Any prostore files to actualize contract payment's attachments. Mutually exclusive with the `attachments` property. e.g. `[1, 2, 3, 4]`

Response 200 (application/json): object

- `id`: integer - Unique identifier for this contract payment. e.g. `1551516`
- `amount`: string - Monetary amount of this payment, as a decimal string. e.g. `1000000.0`
- `check_number`: string - Check number associated with this payment, when paid by check. e.g. `ABC93759372`
- `contract_id`: integer - Contract ID associated with the payment e.g. `1630397`
- `created_at`: string(date-time) - Created at e.g. `2015-07-14T22:03:27Z`
- `updated_at`: string(date-time) - Updated at e.g. `2015-07-14T22:03:27Z`
- `date`: string(date) - Payment Date e.g. `2015-07-15`
- `date_payment_settled`: string(date-time) - Date Payment settled e.g. `2022-07-18T22:03:27Z`
- `date_payment_initiated`: string(date-time) - Date Payment Initiated e.g. `2022-07-18T22:03:27Z`
- `draw_request_number`: integer - Payment number of a Draw Request, Owner Invoice, or Subcontractor Invoice e.g. `5`
- `external_payment_id`: string - Only payments made through Procore Pay have an external_payment_id e.g. `2169c3f0-5ee4-4eec-8e3c-9644db424550`
- `invoice_number`: string - Invoice number e.g. `Invoice 123`
- `notes`: string - Associated notes e.g. `January Payment`
- `payment_number`: integer - Payment number e.g. `5`
- `attachments`: array of object - Payment attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `project_id`: integer(int64) - Integer ID for the associated Project e.g. `1232`
- `requisition_id`: integer - Subcontractor requisition ID e.g. `789`
- `origin_id`: string - Identifier for this payment in the external/third-party system it originated from. e.g. `abc-123`
- `origin_code`: string - Code for this payment in the external/third-party system it originated from. e.g. `code-1`
- `origin_data`: string - Additional third-party data captured with this payment. e.g. `XYZ-0012`
- `status`: string - Lifecycle status of this payment (for example, unpaid, in_review, approved, processing, paid, rejected, failed). e.g. `in_review`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/contract_payments/{id}

**Delete Contract Payment**
Deletes a specified Contract Payment.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `contract_id` [query] integer (required) - ID of the Contract

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Line Item Types (Cost Types)

Resource id: `line-item-types-cost-types`. Raw spec: `../openapi-raw/line-item-types-cost-types.json`. Web: https://developers.procore.com/reference/rest/line-item-types-cost-types?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/line_item_types

**List Line Item Types**
Return a list of all defined Line Item Types.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company. You must supply either a company_id or project_id.
- `project_id` [query] integer (required) - Unique identifier for the project. You must supply either a company_id or project_id.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[origin_id]` [query] string - Origin ID

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
- `name`: string - Name for the Line Item Type e.g. `Equipment`
- `code`: string - Code for the Line Item Type e.g. `LB`
- `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `ABC123`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/line_item_types

**Create Line Item Type**
Create a new Line Item Type (e.g. L2 for Labor).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `company_id`: integer (required) - Company ID e.g. `12345`
- `line_item_type`: object (required) - Line Item Type object
  - `name`: string - Line Item Type name e.g. `Labor Burden`
  - `csv_import_code`: string - Abbreviation code e.g. `LB`
  - `base_type`: string enum[labor, equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`

Response 201 (application/json): object

- `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
- `name`: string - Name for the Line Item Type e.g. `Equipment`
- `code`: string - Code for the Line Item Type e.g. `LB`
- `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `ABC123`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/line_item_types/{id}

**Show Line Item Type**
Return detailed information for a specified Line Item Type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `company_id` [query] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
- `name`: string - Name for the Line Item Type e.g. `Equipment`
- `code`: string - Code for the Line Item Type e.g. `LB`
- `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `ABC123`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/line_item_types/{id}

**Update Line Item Type**
Update a Line Item Type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID

Request body (application/json) (required):

- `company_id`: integer (required) - Company ID e.g. `12345`
- `line_item_type`: object (required) - Line Item Type object
  - `name`: string - Line Item Type name e.g. `Labor Burden`
  - `csv_import_code`: string - Abbreviation code e.g. `LB`
  - `base_type`: string enum[labor, equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`

Response 200 (application/json): object

- `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
- `name`: string - Name for the Line Item Type e.g. `Equipment`
- `code`: string - Code for the Line Item Type e.g. `LB`
- `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `ABC123`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/line_item_types/sync

**Sync Line Item Types**
This endpoint creates or updates a batch of Line Item Types.
See [Using Sync Actions](/documentation/using-sync-actions) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `company_id`: integer (required) - Company ID e.g. `124251`
- `updates`: array of object (required)
  - `id`: integer - Line Item Type ID e.g. `12345`
  - `name`: string - Line Item Type name e.g. `Equipment`
  - `csv_import_code`: string - Abbreviation code e.g. `LB`
  - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`

Response 200 (application/json): object

- `entities`: array of object - Array of updated entities
  - `id`: integer - Unique identifier for the Line Item Type e.g. `12345`
  - `name`: string - Name for the Line Item Type e.g. `Equipment`
  - `code`: string - Code for the Line Item Type e.g. `LB`
  - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`
- `errors`: array of object - Array of errors e.g. `[{"id": 3, "name": "No line item type has this ID value", "errors": {"id": ["...`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Purchase Order Contract Detail Line Items

Resource id: `purchase-order-contract-detail-line-items`. Raw spec: `../openapi-raw/purchase-order-contract-detail-line-items.json`. Web: https://developers.procore.com/reference/rest/purchase-order-contract-detail-line-items?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/purchase_order_contracts/{purchase_order_contract_id}/line_item_contract_details

**List Purchase Order Contract detail line items**
List Detail Line Items on a given Purchase Order Contract

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `purchase_order_contract_id` [path] integer (required) - Purchase Order Contract ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[line_item_id]` [query] integer - Line Item ID. Returns item(s) with the specified Line Item ID or within a range of Line Item IDs.

Response 200 (application/json): array of object

- `id`: integer - Detail Line Item ID e.g. `4896147`
- `amount`: string - Detail Line Item amount e.g. `1000.0`
- `description`: string - Detail Line Item description e.g. `Cleanup`
- `position`: integer - Detail Line Item position e.g. `1`
- `line_item_id`: integer - Line Item ID e.g. `4320911`
- `billed_to_date`: string - Detail Line Item actual billed amount e.g. `500.0`
- `billed_against`: boolean - Has this line item ever been billed for a non-zero amount on a previous invoice e.g. `true`
- `currency_configuration`: object
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/purchase_order_contracts/{purchase_order_contract_id}/line_item_contract_details

**Create Purchase Order Contract detail line item**
Creates a Detail Line Item on a given Purchase Order Contract Line Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `purchase_order_contract_id` [path] integer (required) - Purchase Order Contract ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `34567`
- `contract_detail_line_item`: object (required) - The Detail Line Item object
  - `line_item_id`: integer - Line Item ID e.g. `1`
  - `amount`: string - Amount e.g. `1000.0`
  - `description`: string - Description e.g. `Cleanup`

Response 201 (application/json): object

- `id`: integer - Detail Line Item ID e.g. `4896147`
- `amount`: string - Detail Line Item amount e.g. `1000.0`
- `description`: string - Detail Line Item description e.g. `Cleanup`
- `position`: integer - Detail Line Item position e.g. `1`
- `line_item_id`: integer - Line Item ID e.g. `4320911`
- `billed_to_date`: string - Detail Line Item actual billed amount e.g. `500.0`
- `billed_against`: boolean - Has this line item ever been billed for a non-zero amount on a previous invoice e.g. `true`
- `currency_configuration`: object
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`
- `created_at`: string(date-time) - Created at date and time e.g. `2016-08-01T23:33:54Z`
- `updated_at`: string(date-time) - Updated at date and time e.g. `2016-09-01T21:33:54Z`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/purchase_order_contracts/{purchase_order_contract_id}/line_item_contract_details/{id}

**Show Purchase Order Contract detail line item**
Return a Detail Line Item in a specific Purchase Order Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `purchase_order_contract_id` [path] integer (required) - Purchase Order Contract ID
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Detail Line Item ID e.g. `4896147`
- `amount`: string - Detail Line Item amount e.g. `1000.0`
- `description`: string - Detail Line Item description e.g. `Cleanup`
- `position`: integer - Detail Line Item position e.g. `1`
- `line_item_id`: integer - Line Item ID e.g. `4320911`
- `billed_to_date`: string - Detail Line Item actual billed amount e.g. `500.0`
- `billed_against`: boolean - Has this line item ever been billed for a non-zero amount on a previous invoice e.g. `true`
- `currency_configuration`: object
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`
- `created_at`: string(date-time) - Created at date and time e.g. `2016-08-01T23:33:54Z`
- `updated_at`: string(date-time) - Updated at date and time e.g. `2016-09-01T21:33:54Z`

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/purchase_order_contracts/{purchase_order_contract_id}/line_item_contract_details/{id}

**Update Purchase Order Contract detail line item**
Update a Detail Line Item in a specific Purchase Order Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `purchase_order_contract_id` [path] integer (required) - Purchase Order Contract ID
- `id` [path] integer (required) - ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `34567`
- `contract_detail_line_item`: object (required) - The Detail Line Item object
  - `line_item_id`: integer - Line Item ID e.g. `1`
  - `amount`: string - Amount e.g. `1000.0`
  - `description`: string - Description e.g. `Cleanup`

Response 200 (application/json): object

- `id`: integer - Detail Line Item ID e.g. `4896147`
- `amount`: string - Detail Line Item amount e.g. `1000.0`
- `description`: string - Detail Line Item description e.g. `Cleanup`
- `position`: integer - Detail Line Item position e.g. `1`
- `line_item_id`: integer - Line Item ID e.g. `4320911`
- `billed_to_date`: string - Detail Line Item actual billed amount e.g. `500.0`
- `billed_against`: boolean - Has this line item ever been billed for a non-zero amount on a previous invoice e.g. `true`
- `currency_configuration`: object
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`
- `created_at`: string(date-time) - Created at date and time e.g. `2016-08-01T23:33:54Z`
- `updated_at`: string(date-time) - Updated at date and time e.g. `2016-09-01T21:33:54Z`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/purchase_order_contracts/{purchase_order_contract_id}/line_item_contract_details/{id}

**Delete Purchase Order Contract detail line item**
Delete a Detail Line Item in a specific Purchase Order Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `purchase_order_contract_id` [path] integer (required) - Purchase Order Contract ID
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Purchase Order Contract Line Items

Resource id: `purchase-order-contract-line-items`. Raw spec: `../openapi-raw/purchase-order-contract-line-items.json`. Web: https://developers.procore.com/reference/rest/purchase-order-contract-line-items?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/purchase_order_contracts/{purchase_order_contract_id}/line_items

**List Purchase Order Contract Line Items**
Return a list of all Purchase Order Contract Line Items.
Change Event Line Item information is only returned if a line item is associated to a change event line item and user can view change events.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.
Note: A v2.0 version of this endpoint is available and recommended for new integrations. Use the Commitment Contract Line Items endpoint GET /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_contracts/{commitment_contract_id}/line_items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `purchase_order_contract_id` [path] integer (required) - Purchase Order Contract ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[cost_code_id]` [query] string - Cost Code ID. Returns item(s) with the specified Cost Code ID or within the specified range of Cost Code IDs.
- `filters[line_item_type_id]` [query] integer - Line Item Type ID. Returns item(s) with the specified Line Item Type ID or range of Line Item Type IDs.
- `view` [query] string enum[default, ssov_source_lines] - Specifies which view (which attributes) of the resource is going to be present in the response. 'default' view will be rendered by default if the parameter is not provided. For the 'ssov_source_lines' view lower permi...

Response 200 (application/json): array of oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/purchase_order_contracts/{purchase_order_contract_id}/line_items

**Create Purchase Order Contract Line Item**
Create a Purchase Order Contract Line Item.
Note: A budget line item will automatically be created for Non-budgeted line items for all new projects and for projects enabled with Non-Budgeted line item beta functionality

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `purchase_order_contract_id` [path] integer (required) - Purchase Order Contract ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `34567`
- `line_item`: object (required) - The Line Item object
  - `amount`: string - Amount e.g. `1000.0`
  - `cost_code_id`: integer - Cost Code ID e.g. `77408196`
  - `description`: string - Description e.g. `Cleanup`
  - `extended_type`: string enum[manual, calculated] - Extended type e.g. `calculated`
  - `quantity`: string - Quantity e.g. `20.0`
  - `line_item_type_id`: integer - Line Item Type ID e.g. `5085801`
  - `origin_data`: string - Origin Data e.g. `AC-1234`
  - `origin_id`: string - Origin ID e.g. `55555`
  - `tax_code_id`: integer - Tax Code ID e.g. `1`
  - `unit_cost`: string - Unit cost e.g. `50.00`
  - `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure e.g. `Hours`
  - `wbs_code_id`: integer - WBS code ID e.g. `34567`

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

### GET /rest/v1.0/purchase_order_contracts/{purchase_order_contract_id}/line_items/{id}

**Show Purchase Order Contract Line Item**
Return a Purchase Order Contract Line Item.
Change Event Line Item information is only returned if a line item is associated to a change event line item and user can view change events.
Note: A v2.0 version of this endpoint is available and recommended for new integrations. Use the Commitment Contract Line Items endpoint GET /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_contracts/{commitment_contract_id}/line_items/{id}.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `purchase_order_contract_id` [path] integer (required) - Purchase Order Contract ID
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `view` [query] string enum[default, ssov_source_lines] - Specifies which view (which attributes) of the resource is going to be present in the response. 'default' view will be rendered by default if the parameter is not provided. For the 'ssov_source_lines' view lower permi...

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/purchase_order_contracts/{purchase_order_contract_id}/line_items/{id}

**Update Purchase Order Contract Line Item**
Update a Purchase Order Contract Line Item.
Note: A budget line item will automatically be created for Non-budgeted line items for all new projects and for projects enabled with Non-Budgeted line item beta functionality

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `purchase_order_contract_id` [path] integer (required) - Purchase Order Contract ID
- `id` [path] integer (required) - ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `34567`
- `line_item`: object (required) - The Line Item object
  - `amount`: string - Amount e.g. `1000.0`
  - `cost_code_id`: integer - Cost Code ID e.g. `77408196`
  - `description`: string - Description e.g. `Cleanup`
  - `extended_type`: string enum[manual, calculated] - Extended type e.g. `calculated`
  - `quantity`: string - Quantity e.g. `20.0`
  - `line_item_type_id`: integer - Line Item Type ID e.g. `5085801`
  - `origin_data`: string - Origin Data e.g. `AC-1234`
  - `origin_id`: string - Origin ID e.g. `55555`
  - `tax_code_id`: integer - Tax Code ID e.g. `1`
  - `unit_cost`: string - Unit cost e.g. `50.00`
  - `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure e.g. `Hours`
  - `wbs_code_id`: integer - WBS code ID e.g. `34567`

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

### DELETE /rest/v1.0/purchase_order_contracts/{purchase_order_contract_id}/line_items/{id}

**Delete Purchase Order Contract Line Item**
Delete a Purchase Order Contract Line Item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `purchase_order_contract_id` [path] integer (required) - Purchase Order Contract ID
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/purchase_order_contracts/{purchase_order_contract_id}/line_items/sync

**Sync Purchase Order Contract Line Items**
Sync Purchase Order Contract Line Items.
Note: A budget line item will automatically be created for Non-budgeted line items for all new projects and for projects enabled with Non-Budgeted line item beta functionality

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `purchase_order_contract_id` [path] integer (required) - Purchase Order Contract ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `updates`: array of object (required)
  - `amount`: string - Amount e.g. `1000.0`
  - `cost_code_id`: integer - Cost Code ID e.g. `77408196`
  - `description`: string - Description e.g. `Cleanup`
  - `extended_type`: string enum[manual, calculated] - Extended type e.g. `calculated`
  - `quantity`: string - Quantity e.g. `20.0`
  - `line_item_type_id`: integer - Line Item Type ID e.g. `5085801`
  - `origin_data`: string - Origin Data e.g. `AC-1234`
  - `origin_id`: string - Origin ID e.g. `55555`
  - `tax_code_id`: integer - Tax Code ID e.g. `1`
  - `unit_cost`: string - Unit cost e.g. `50.00`
  - `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure e.g. `Hours`
  - `wbs_code_id`: integer - WBS code ID e.g. `34567`

Response 200 (application/json): object

- `entities`: array of object
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
  - `updated_at`: string(date-time) - Updated at date and time e.g. `2016-09-01T21:33:54Z`
  - `wbs_code`: object
    - `id`: integer - Wbs Code ID e.g. `999`
    - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
    - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
  - `change_event_line_item`: object - Change Event Line Item
    - `id`: integer - Change Event Line Item ID e.g. `5`
    - `cost_rom`: string(float) - Change Event Line Item Cost ROM e.g. `100.0`
    - `revenue_rom`: string(float) - Change Event Line Item Revenue ROM e.g. `200.0`
    - `event_id`: integer - Change Event ID e.g. `6`
    - `cost_code`: oneOf(object | object)
    - `line_item_type`: object - Line Item Type
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

Error responses: 400, 401, 403, 413, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Purchase Order Contract Subcontractor SOV Status

Resource id: `purchase-order-contract-subcontractor-sov-status`. Raw spec: `../openapi-raw/purchase-order-contract-subcontractor-sov-status.json`. Web: https://developers.procore.com/reference/rest/purchase-order-contract-subcontractor-sov-status?version=latest
Product lines: Construction Financials

### PATCH /rest/v1.0/purchase_order_contracts/{purchase_order_contract_id}/subcontractor_schedule_of_values_status

**Update Purchase Order Contract Subcontractor SOV status**
Update the Subcontractor SOV status of a specific Purchase Order Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `purchase_order_contract_id` [path] integer (required) - Purchase Order Contract ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `34567`
- `status`: string enum[draft, revise_and_resubmit, under_review, approved] (required) - Subcontractor SOV status. Admin users or users with granular permissions to update the contract can chan ge the status if the contract has no requisitions (sub invoices) or approved commitment change orders. Bill reci... e.g. `approved`

Response 200 (application/json): object

- `status`: string - Subcontractor SOV status e.g. `under_review`

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Purchase Order Contracts

Resource id: `purchase-order-contracts`. Raw spec: `../openapi-raw/purchase-order-contracts.json`. Web: https://developers.procore.com/reference/rest/purchase-order-contracts?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/purchase_order_contracts

**List of Purchase Order Contracts**
Returns a list of all Purchase Order Contracts.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `view` [query] string enum[compact, extended] - Specifies how much information to show for each purchase order contract. The compact view is returned by default.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[status]` [query] string enum[Draft, Processing, Submitted, Partially Received, Received, Approved, Closed] - Return item(s) with the specified Purchase Order Contract status.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[include_deleted]` [query] string enum[only, with] - Use 'only' for only deleted resources. Use 'with' for deleted and undeleted resources.
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.

Response 200 (application/json): array of object

- `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
- `approval_letter_date`: string - Approval letter date e.g. `2013-10-23`
- `approved_change_orders`: string - Approved Change Orders amount e.g. `23556.0`
- `assignee`: object - Assignee
  - `id`: integer - ID e.g. `464773`
- `bill_to_address`: string - Bill to address e.g. `Santa Claus Lane, Carpinteria, CA`
- `billing_schedule_of_values_status`: string enum[draft, under_review, revise_and_submit, approved] - Subcontractor SOV status
- `contract_date`: string(date) - Contract date e.g. `2013-10-23`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2012-10-23T21:49:40Z`
- `delivery_date`: string(date) - Delivery date e.g. `2012-10-23`
- `description`: string - Description e.g. `<p>3 tons of cement.</p>`
- `draft_change_orders_amount`: string - Total of all draft change orders e.g. `750.00`
- `executed`: boolean - Executed status e.g. `false`
- `execution_date`: string(date) - Execution date e.g. `2013-10-23`
- `grand_total`: string - Grand total e.g. `3329738.0`
- `id`: integer - ID e.g. `64382`
- `issued_on_date`: string(date) - Issued on e.g. `2013-10-23`
- `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2013-10-23`
- `number`: string - Number e.g. `PO-17-1990-00001`
- `origin_code`: string - Origin code e.g. `OC-abc123`
- `origin_data`: string - Origin Data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `459247544`
- `payment_terms`: string - Payment terms e.g. `Net 30`
- `pending_change_orders`: string - Pending Change Orders amount e.g. `23672.0`
- `pending_revised_contract`: string - Pending Revised Contract amount e.g. `973630.0`
- `percentage_paid`: string - Purchase Order Contract percentage paid e.g. `10`
- `private`: boolean - Enable/Disable Private status e.g. `false`
- `project`: object - Project
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name e.g. `Children's Hospital`
- `remaining_balance_outstanding`: string - Remaining Balance Outstanding amount e.g. `233456.0`
- `requisitions_are_enabled`: boolean - If true, Requisitions (Subcontractor Invoices) are enabled on the Commitment Contract e.g. `true`
- `retainage_percent`: string - Retainage percent e.g. `10`
- `returned_date`: string(date) - Returned date e.g. `2013-10-23`
- `revised_contract`: string - Revised Contract amount e.g. `4566564.0`
- `ship_to_address`: string - Ship to address e.g. `1410 Harbor View Drive Newport Beach, CA 92663`
- `ship_via`: string - Ship via e.g. `Acme Shipping`
- `show_line_items_to_non_admins`: boolean - If true and the contract is private, non admins with access to the contract will be able to view the SOV items e.g. `true`
- `signed_contract_received_date`: string(date) - Signed contract received date e.g. `2012-10-25`
- `status`: string enum[Draft, Processing, Submitted, Partially Received, Received, Approved, Closed] - Status e.g. `Processing`
- `title`: string - Title e.g. `Initial cement order.`
- `total_draw_requests_amount`: string - Total Draw Requests Amount e.g. `232224.0`
- `total_payments`: string - Total Payments Amount e.g. `111312.0`
- `total_requisitions_amount`: string - Total Requisitions (Subcontractor Invoices) Amount e.g. `5670.0`
- `updated_at`: string(date-time) - Updated at e.g. `2015-11-04T15:18:57Z`
- `vendor`: object - Vendor
  - `id`: integer - ID e.g. `356493`
  - `company`: string - Company e.g. `Mau Mixers, LLC`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/purchase_order_contracts

**Create Purchase Order Contract**
Create a Purchase Order Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `66005`
- `attachments`: array of string - Purchase Order Contract attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
- `purchase_order_contract`: object (required) - Purchase Order Contract object
  - `accounting_method`: string enum[amount, unit] - Accounting method. If not provided on create action, defaults to Project Configuration. e.g. `amount`
  - `approval_letter_date`: string - Approval letter date e.g. `2012-10-23`
  - `assignee_id`: integer - Assignee ID e.g. `4325`
  - `bill_to_address`: string - Bill to address e.g. `Santa Claus Lane, Carpinteria, CA`
  - `contract_date`: string(date) - Contract date e.g. `2012-10-23`
  - `delivery_date`: string(date) - Delivery date e.g. `2012-10-23`
  - `description`: string - Description e.g. `<p>3 tons of cement.</p>`
  - `executed`: boolean - Executed status e.g. `false`
  - `execution_date`: string(date) - Execution date e.g. `2012-10-23`
  - `invoice_contact_user_ids`: array of integer - IDs of users in the project directory (see the Project Users endpoint). The users with these IDs will be added as invoice contacts if they belong to the same vendor as the contract vendor. Invoice contacts are the poi...
  - `issued_on_date`: string(date) - Issued on e.g. `2012-10-23`
  - `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2012-10-23`
  - `origin_code`: string - Origin code e.g. `OC-abc123`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `459247544`
  - `number`: string - Number e.g. `PO-17-1990-00001`
  - `payment_terms`: string - Payment terms e.g. `Net 20`
  - `private`: boolean - Enable/Disable private status e.g. `false`
  - `retainage_percent`: string - Retainage percent e.g. `10`
  - `returned_date`: string(date) - Returned date e.g. `2012-10-23`
  - `ship_to_address`: string - Ship to address e.g. `1410 Harbor View Drive Newport Beach, CA 92663`
  - `ship_via`: string - Ship via e.g. `Acme Shipping`
  - `status`: string enum[Draft, Processing, Submitted, Partially Received, Received, Approved, Closed] - Status e.g. `Processing`
  - `title`: string - Title e.g. `Initial cement order.`
  - `vendor_id`: integer - Vendor ID e.g. `92681`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `currency_exchange_rate`: number - Exchange rate from contract currency to project currency; It'll be accepted only when multicurrency phase two feature flag is enabled and user has the granular permission to edit the contract exchange rate. e.g. `1.5`
  - `currency_iso_code`: string - Currency ISO code; It'll be accepted only when multicurrency phase two feature flag is enabled. e.g. `USD`

Response 201 (application/json): object

- `id`: integer - ID e.g. `64382`
- `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
- `approval_letter_date`: string - Approval letter date e.g. `2012-10-23`
- `approved_change_orders`: string - Approved Change Orders Amount e.g. `23556.0`
- `assignee`: object - Assignee
  - `id`: integer - ID e.g. `464773`
- `attachments`: object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `bill_to_address`: string - Bill to Address e.g. `1410 Harbor View Drive Newport Beach, CA 92663`
- `change_order_packages`: array of object
  - `id`: integer - ID e.g. `239475`
  - `contract_id`: integer - Contract ID e.g. `64545`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `due_date`: string(date) - Due date e.g. `2016-10-23`
  - `invoiced_date`: string(date) - Invoiced date e.g. `2016-10-09`
  - `number`: string - Number e.g. `H-38`
  - `origin_code`: string - Origin code e.g. `ABC-123`
  - `origin_data`: string - Origin data e.g. `OD-123654789`
  - `origin_id`: string - Origin ID e.g. `654987123`
  - `paid_date`: string(date) - Paid date e.g. `2016-10-22`
  - `reviewed_at`: string(date-time) - Reviewed at e.g. `2016-10-24T15:42:33Z`
  - `signed_change_order_received_date`: string(date) - Signed change order received date e.g. `2016-10-23`
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Status e.g. `draft`
  - `title`: string - Title e.g. `Additional Time & Materials`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `change_order_requests`: array of object
  - `id`: integer - ID e.g. `3284756`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `due_date`: string(date) - Due date e.g. `2016-11-23T21:39:40Z`
  - `invoiced_date`: string(date) - Invoiced date e.g. `2017-08-22`
  - `number`: string - Number e.g. `B22`
  - `paid_date`: string(date) - Paid date e.g. `2017-08-25`
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Status e.g. `draft`
  - `title`: string - Title e.g. `Concrete freezer slab`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-25T21:39:40Z`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `contract_date`: string(date) - Contract date e.g. `2012-10-23`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `created_by_id`: integer - ID of the user who created the Contract e.g. `5432`
- `deleted_at`: string(date-time) - Deleted at e.g. `2012-10-23T21:49:40Z`
- `delivery_date`: string(date) - Delivery date e.g. `2012-10-23`
- `description`: string - Description e.g. `<p>3 tons of cement.</p>`
- `draft_change_orders_amount`: string - Total of all draft change orders e.g. `750.00`
- `executed`: boolean - Executed status e.g. `false`
- `execution_date`: string(date) - Execution date e.g. `2012-10-23`
- `grand_total`: string - Grand total e.g. `3329738.0`
- `invoice_contacts`: array of object - Invoice Contacts
  - `id`: integer e.g. `1128828`
  - `business_phone`: string e.g. `(503)744-3200`
  - `business_phone_extension`: integer e.g. `1234`
  - `email`: string e.g. `john.doe@example.com`
  - `fax_number`: string e.g. `813043`
  - `job_title`: string e.g. `Engineer`
  - `login_information_id`: integer
  - `mobile_phone`: string
  - `name`: string e.g. `A-1 Electric Company`
  - `vendor_name`: string
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `issued_on_date`: string(date) - Issued on e.g. `2012-10-23`
- `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2012-10-23`
- `line_items`: array of object - Line items
  - `id`: integer - Line Item id e.g. `4896147`
  - `amount`: string - Line Item amount e.g. `1000.0`
  - `company`: object - Company
    - `id`: integer - ID e.g. `163215`
    - `name`: string - Name e.g. `Procore Tech`
  - `wbs_code`: object
    - `id`: integer - Wbs Code ID e.g. `999`
    - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
    - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
  - `cost_code`: oneOf(object | object)
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
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `number`: string - Number e.g. `PO-17-1990-00001`
- `origin_code`: string - Origin code e.g. `OC-abc123`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `459247544`
- `payment_terms`: string - Payment terms e.g. `Net 30`
- `payments_issued`: array of object - Payments issued
  - `id`: integer - ID e.g. `1551516`
  - `amount`: string - Payment amount e.g. `1000000.0`
  - `check_number`: string - Check number e.g. `ABC93759372`
  - `created_at`: string(date-time) - Created at e.g. `2015-07-14T22:03:27Z`
  - `date`: string(date) - Payment date e.g. `2015-07-15`
  - `draw_request_number`: integer - Payment number of a Draw Request, Owner Invoice, or Subcontractor Invoice e.g. `5`
  - `invoice_number`: string - Invoice number e.g. `Invoice 123`
  - `notes`: string - Associated notes e.g. `January Payment`
  - `payment_number`: integer - Payment number e.g. `5`
  - `attachments`: array of object - Payment attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `origin_id`: string - Origin ID e.g. `abc-123`
  - `origin_data`: string - Origin data e.g. `XYZ-0012`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `pending_change_orders`: string - Pending Change Orders amount e.g. `23672.0`
- `pending_revised_contract`: string - Pending Revised Contract amount e.g. `973630.0`
- `percentage_paid`: string - Percentage paid amount e.g. `32.0`
- `potential_change_orders`: array of array of object - Potential Change Orders
- `private`: boolean - Enable/Disable Pivate status e.g. `false`
- `project`: object - Project
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name e.g. `Children's Hospital`
- `remaining_balance_outstanding`: string - Remaining Balance Outstanding amount e.g. `233456.0`
- `requisitions_are_enabled`: boolean - If true, Requisitions (Subcontractor Invoices) are enabled on the Commitment Contract e.g. `true`
- `retainage_percent`: string - Retainage Percent e.g. `10`
- `returned_date`: string(date) - Returned date e.g. `2012-10-23`
- `revised_contract`: string - Revised contracts amount e.g. `4566564.0`
- `ship_to_address`: string - Ship to address e.g. `Santa Claus Lane, Carpinteria, CA`
- `ship_via`: string - Ship via e.g. `Acme Shipping`
- `show_line_items_to_non_admins`: boolean - If true and the contract is private, non admins with access to the contract will be able to view the SOV items e.g. `true`
- `signed_contract_received_date`: string(date) - Signed contract received date e.g. `2012-10-25`
- `status`: string enum[Draft, Processing, Submitted, Partially Received, Received, Approved, Closed] - Status e.g. `Processing`
- `title`: string - Title e.g. `Initial cement order.`
- `total_draw_requests_amount`: string - Total Draw Requests amount e.g. `232224.0`
- `total_payments`: string - Total Payments amount e.g. `111312.0`
- `total_requisitions_amount`: string - Total Requisitions (Subcontractor Invoices) amount e.g. `5670.0`
- `updated_at`: string(date-time) - Updated at e.g. `2015-11-04T15:18:57Z`
- `vendor`: object - Vendor
  - `id`: integer - ID e.g. `356493`
  - `company`: string - Company e.g. `Mau Mixers, LLC`
  - `origin_data`: string - Origin data e.g. `OD-876901523`
  - `origin_id`: string - Origin ID e.g. `0981234567`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/purchase_order_contracts/{id}

**Show Purchase Order Contract**
Return detailed information on a Purchase Order Contract.
### Special notes (Tiers)
The visibility of Change Order Packages, Potential Change Orders & Change Order Requests
depends on the number of tiers defined in the Work Order Contract as follows:
1-tier: Change Order Packages
2-tier: Change Order Packages, Potential Change Orders
3-tier: Change Order Packages, Change Order Requests, Potential Change Orders

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `64382`
- `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
- `approval_letter_date`: string - Approval letter date e.g. `2012-10-23`
- `approved_change_orders`: string - Approved Change Orders Amount e.g. `23556.0`
- `assignee`: object - Assignee
  - `id`: integer - ID e.g. `464773`
- `attachments`: object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `bill_to_address`: string - Bill to Address e.g. `1410 Harbor View Drive Newport Beach, CA 92663`
- `change_order_packages`: array of object
  - `id`: integer - ID e.g. `239475`
  - `contract_id`: integer - Contract ID e.g. `64545`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `due_date`: string(date) - Due date e.g. `2016-10-23`
  - `invoiced_date`: string(date) - Invoiced date e.g. `2016-10-09`
  - `number`: string - Number e.g. `H-38`
  - `origin_code`: string - Origin code e.g. `ABC-123`
  - `origin_data`: string - Origin data e.g. `OD-123654789`
  - `origin_id`: string - Origin ID e.g. `654987123`
  - `paid_date`: string(date) - Paid date e.g. `2016-10-22`
  - `reviewed_at`: string(date-time) - Reviewed at e.g. `2016-10-24T15:42:33Z`
  - `signed_change_order_received_date`: string(date) - Signed change order received date e.g. `2016-10-23`
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Status e.g. `draft`
  - `title`: string - Title e.g. `Additional Time & Materials`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `change_order_requests`: array of object
  - `id`: integer - ID e.g. `3284756`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `due_date`: string(date) - Due date e.g. `2016-11-23T21:39:40Z`
  - `invoiced_date`: string(date) - Invoiced date e.g. `2017-08-22`
  - `number`: string - Number e.g. `B22`
  - `paid_date`: string(date) - Paid date e.g. `2017-08-25`
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Status e.g. `draft`
  - `title`: string - Title e.g. `Concrete freezer slab`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-25T21:39:40Z`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `contract_date`: string(date) - Contract date e.g. `2012-10-23`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `created_by_id`: integer - ID of the user who created the Contract e.g. `5432`
- `deleted_at`: string(date-time) - Deleted at e.g. `2012-10-23T21:49:40Z`
- `delivery_date`: string(date) - Delivery date e.g. `2012-10-23`
- `description`: string - Description e.g. `<p>3 tons of cement.</p>`
- `draft_change_orders_amount`: string - Total of all draft change orders e.g. `750.00`
- `executed`: boolean - Executed status e.g. `false`
- `execution_date`: string(date) - Execution date e.g. `2012-10-23`
- `grand_total`: string - Grand total e.g. `3329738.0`
- `invoice_contacts`: array of object - Invoice Contacts
  - `id`: integer e.g. `1128828`
  - `business_phone`: string e.g. `(503)744-3200`
  - `business_phone_extension`: integer e.g. `1234`
  - `email`: string e.g. `john.doe@example.com`
  - `fax_number`: string e.g. `813043`
  - `job_title`: string e.g. `Engineer`
  - `login_information_id`: integer
  - `mobile_phone`: string
  - `name`: string e.g. `A-1 Electric Company`
  - `vendor_name`: string
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `issued_on_date`: string(date) - Issued on e.g. `2012-10-23`
- `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2012-10-23`
- `line_items`: array of object - Line items
  - `id`: integer - Line Item id e.g. `4896147`
  - `amount`: string - Line Item amount e.g. `1000.0`
  - `company`: object - Company
    - `id`: integer - ID e.g. `163215`
    - `name`: string - Name e.g. `Procore Tech`
  - `wbs_code`: object
    - `id`: integer - Wbs Code ID e.g. `999`
    - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
    - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
  - `cost_code`: oneOf(object | object)
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
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `number`: string - Number e.g. `PO-17-1990-00001`
- `origin_code`: string - Origin code e.g. `OC-abc123`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `459247544`
- `payment_terms`: string - Payment terms e.g. `Net 30`
- `payments_issued`: array of object - Payments issued
  - `id`: integer - ID e.g. `1551516`
  - `amount`: string - Payment amount e.g. `1000000.0`
  - `check_number`: string - Check number e.g. `ABC93759372`
  - `created_at`: string(date-time) - Created at e.g. `2015-07-14T22:03:27Z`
  - `date`: string(date) - Payment date e.g. `2015-07-15`
  - `draw_request_number`: integer - Payment number of a Draw Request, Owner Invoice, or Subcontractor Invoice e.g. `5`
  - `invoice_number`: string - Invoice number e.g. `Invoice 123`
  - `notes`: string - Associated notes e.g. `January Payment`
  - `payment_number`: integer - Payment number e.g. `5`
  - `attachments`: array of object - Payment attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `origin_id`: string - Origin ID e.g. `abc-123`
  - `origin_data`: string - Origin data e.g. `XYZ-0012`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `pending_change_orders`: string - Pending Change Orders amount e.g. `23672.0`
- `pending_revised_contract`: string - Pending Revised Contract amount e.g. `973630.0`
- `percentage_paid`: string - Percentage paid amount e.g. `32.0`
- `potential_change_orders`: array of array of object - Potential Change Orders
- `private`: boolean - Enable/Disable Pivate status e.g. `false`
- `project`: object - Project
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name e.g. `Children's Hospital`
- `remaining_balance_outstanding`: string - Remaining Balance Outstanding amount e.g. `233456.0`
- `requisitions_are_enabled`: boolean - If true, Requisitions (Subcontractor Invoices) are enabled on the Commitment Contract e.g. `true`
- `retainage_percent`: string - Retainage Percent e.g. `10`
- `returned_date`: string(date) - Returned date e.g. `2012-10-23`
- `revised_contract`: string - Revised contracts amount e.g. `4566564.0`
- `ship_to_address`: string - Ship to address e.g. `Santa Claus Lane, Carpinteria, CA`
- `ship_via`: string - Ship via e.g. `Acme Shipping`
- `show_line_items_to_non_admins`: boolean - If true and the contract is private, non admins with access to the contract will be able to view the SOV items e.g. `true`
- `signed_contract_received_date`: string(date) - Signed contract received date e.g. `2012-10-25`
- `status`: string enum[Draft, Processing, Submitted, Partially Received, Received, Approved, Closed] - Status e.g. `Processing`
- `title`: string - Title e.g. `Initial cement order.`
- `total_draw_requests_amount`: string - Total Draw Requests amount e.g. `232224.0`
- `total_payments`: string - Total Payments amount e.g. `111312.0`
- `total_requisitions_amount`: string - Total Requisitions (Subcontractor Invoices) amount e.g. `5670.0`
- `updated_at`: string(date-time) - Updated at e.g. `2015-11-04T15:18:57Z`
- `vendor`: object - Vendor
  - `id`: integer - ID e.g. `356493`
  - `company`: string - Company e.g. `Mau Mixers, LLC`
  - `origin_data`: string - Origin data e.g. `OD-876901523`
  - `origin_id`: string - Origin ID e.g. `0981234567`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/purchase_order_contracts/{id}

**Update Purchase Order Contract**
Update a Purchase Order Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `66005`
- `attachments`: array of string - Purchase Order Contract attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
- `purchase_order_contract`: object (required) - Purchase Order Contract object
  - `accounting_method`: string enum[amount, unit] - Accounting method. If not provided on create action, defaults to Project Configuration. e.g. `amount`
  - `approval_letter_date`: string - Approval letter date e.g. `2012-10-23`
  - `assignee_id`: integer - Assignee ID e.g. `4325`
  - `bill_to_address`: string - Bill to address e.g. `Santa Claus Lane, Carpinteria, CA`
  - `contract_date`: string(date) - Contract date e.g. `2012-10-23`
  - `delivery_date`: string(date) - Delivery date e.g. `2012-10-23`
  - `description`: string - Description e.g. `<p>3 tons of cement.</p>`
  - `executed`: boolean - Executed status e.g. `false`
  - `execution_date`: string(date) - Execution date e.g. `2012-10-23`
  - `invoice_contact_user_ids`: array of integer - IDs of users in the project directory (see the Project Users endpoint). The users with these IDs will be added as invoice contacts if they belong to the same vendor as the contract vendor. Invoice contacts are the poi...
  - `issued_on_date`: string(date) - Issued on e.g. `2012-10-23`
  - `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2012-10-23`
  - `origin_code`: string - Origin code e.g. `OC-abc123`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `459247544`
  - `number`: string - Number e.g. `PO-17-1990-00001`
  - `payment_terms`: string - Payment terms e.g. `Net 20`
  - `private`: boolean - Enable/Disable private status e.g. `false`
  - `retainage_percent`: string - Retainage percent e.g. `10`
  - `returned_date`: string(date) - Returned date e.g. `2012-10-23`
  - `ship_to_address`: string - Ship to address e.g. `1410 Harbor View Drive Newport Beach, CA 92663`
  - `ship_via`: string - Ship via e.g. `Acme Shipping`
  - `status`: string enum[Draft, Processing, Submitted, Partially Received, Received, Approved, Closed] - Status e.g. `Processing`
  - `title`: string - Title e.g. `Initial cement order.`
  - `vendor_id`: integer - Vendor ID e.g. `92681`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `currency_exchange_rate`: number - Exchange rate from contract currency to project currency; It'll be accepted only when multicurrency phase two feature flag is enabled and user has the granular permission to edit the contract exchange rate. e.g. `1.5`
  - `currency_iso_code`: string - Currency ISO code; It'll be accepted only when multicurrency phase two feature flag is enabled. e.g. `USD`

Response 200 (application/json): object

- `id`: integer - ID e.g. `64382`
- `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
- `approval_letter_date`: string - Approval letter date e.g. `2012-10-23`
- `approved_change_orders`: string - Approved Change Orders Amount e.g. `23556.0`
- `assignee`: object - Assignee
  - `id`: integer - ID e.g. `464773`
- `attachments`: object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `bill_to_address`: string - Bill to Address e.g. `1410 Harbor View Drive Newport Beach, CA 92663`
- `change_order_packages`: array of object
  - `id`: integer - ID e.g. `239475`
  - `contract_id`: integer - Contract ID e.g. `64545`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `due_date`: string(date) - Due date e.g. `2016-10-23`
  - `invoiced_date`: string(date) - Invoiced date e.g. `2016-10-09`
  - `number`: string - Number e.g. `H-38`
  - `origin_code`: string - Origin code e.g. `ABC-123`
  - `origin_data`: string - Origin data e.g. `OD-123654789`
  - `origin_id`: string - Origin ID e.g. `654987123`
  - `paid_date`: string(date) - Paid date e.g. `2016-10-22`
  - `reviewed_at`: string(date-time) - Reviewed at e.g. `2016-10-24T15:42:33Z`
  - `signed_change_order_received_date`: string(date) - Signed change order received date e.g. `2016-10-23`
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Status e.g. `draft`
  - `title`: string - Title e.g. `Additional Time & Materials`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `change_order_requests`: array of object
  - `id`: integer - ID e.g. `3284756`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `due_date`: string(date) - Due date e.g. `2016-11-23T21:39:40Z`
  - `invoiced_date`: string(date) - Invoiced date e.g. `2017-08-22`
  - `number`: string - Number e.g. `B22`
  - `paid_date`: string(date) - Paid date e.g. `2017-08-25`
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Status e.g. `draft`
  - `title`: string - Title e.g. `Concrete freezer slab`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-25T21:39:40Z`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `contract_date`: string(date) - Contract date e.g. `2012-10-23`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `created_by_id`: integer - ID of the user who created the Contract e.g. `5432`
- `deleted_at`: string(date-time) - Deleted at e.g. `2012-10-23T21:49:40Z`
- `delivery_date`: string(date) - Delivery date e.g. `2012-10-23`
- `description`: string - Description e.g. `<p>3 tons of cement.</p>`
- `draft_change_orders_amount`: string - Total of all draft change orders e.g. `750.00`
- `executed`: boolean - Executed status e.g. `false`
- `execution_date`: string(date) - Execution date e.g. `2012-10-23`
- `grand_total`: string - Grand total e.g. `3329738.0`
- `invoice_contacts`: array of object - Invoice Contacts
  - `id`: integer e.g. `1128828`
  - `business_phone`: string e.g. `(503)744-3200`
  - `business_phone_extension`: integer e.g. `1234`
  - `email`: string e.g. `john.doe@example.com`
  - `fax_number`: string e.g. `813043`
  - `job_title`: string e.g. `Engineer`
  - `login_information_id`: integer
  - `mobile_phone`: string
  - `name`: string e.g. `A-1 Electric Company`
  - `vendor_name`: string
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `issued_on_date`: string(date) - Issued on e.g. `2012-10-23`
- `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2012-10-23`
- `line_items`: array of object - Line items
  - `id`: integer - Line Item id e.g. `4896147`
  - `amount`: string - Line Item amount e.g. `1000.0`
  - `company`: object - Company
    - `id`: integer - ID e.g. `163215`
    - `name`: string - Name e.g. `Procore Tech`
  - `wbs_code`: object
    - `id`: integer - Wbs Code ID e.g. `999`
    - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
    - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
  - `cost_code`: oneOf(object | object)
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
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `number`: string - Number e.g. `PO-17-1990-00001`
- `origin_code`: string - Origin code e.g. `OC-abc123`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `459247544`
- `payment_terms`: string - Payment terms e.g. `Net 30`
- `payments_issued`: array of object - Payments issued
  - `id`: integer - ID e.g. `1551516`
  - `amount`: string - Payment amount e.g. `1000000.0`
  - `check_number`: string - Check number e.g. `ABC93759372`
  - `created_at`: string(date-time) - Created at e.g. `2015-07-14T22:03:27Z`
  - `date`: string(date) - Payment date e.g. `2015-07-15`
  - `draw_request_number`: integer - Payment number of a Draw Request, Owner Invoice, or Subcontractor Invoice e.g. `5`
  - `invoice_number`: string - Invoice number e.g. `Invoice 123`
  - `notes`: string - Associated notes e.g. `January Payment`
  - `payment_number`: integer - Payment number e.g. `5`
  - `attachments`: array of object - Payment attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `origin_id`: string - Origin ID e.g. `abc-123`
  - `origin_data`: string - Origin data e.g. `XYZ-0012`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `pending_change_orders`: string - Pending Change Orders amount e.g. `23672.0`
- `pending_revised_contract`: string - Pending Revised Contract amount e.g. `973630.0`
- `percentage_paid`: string - Percentage paid amount e.g. `32.0`
- `potential_change_orders`: array of array of object - Potential Change Orders
- `private`: boolean - Enable/Disable Pivate status e.g. `false`
- `project`: object - Project
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name e.g. `Children's Hospital`
- `remaining_balance_outstanding`: string - Remaining Balance Outstanding amount e.g. `233456.0`
- `requisitions_are_enabled`: boolean - If true, Requisitions (Subcontractor Invoices) are enabled on the Commitment Contract e.g. `true`
- `retainage_percent`: string - Retainage Percent e.g. `10`
- `returned_date`: string(date) - Returned date e.g. `2012-10-23`
- `revised_contract`: string - Revised contracts amount e.g. `4566564.0`
- `ship_to_address`: string - Ship to address e.g. `Santa Claus Lane, Carpinteria, CA`
- `ship_via`: string - Ship via e.g. `Acme Shipping`
- `show_line_items_to_non_admins`: boolean - If true and the contract is private, non admins with access to the contract will be able to view the SOV items e.g. `true`
- `signed_contract_received_date`: string(date) - Signed contract received date e.g. `2012-10-25`
- `status`: string enum[Draft, Processing, Submitted, Partially Received, Received, Approved, Closed] - Status e.g. `Processing`
- `title`: string - Title e.g. `Initial cement order.`
- `total_draw_requests_amount`: string - Total Draw Requests amount e.g. `232224.0`
- `total_payments`: string - Total Payments amount e.g. `111312.0`
- `total_requisitions_amount`: string - Total Requisitions (Subcontractor Invoices) amount e.g. `5670.0`
- `updated_at`: string(date-time) - Updated at e.g. `2015-11-04T15:18:57Z`
- `vendor`: object - Vendor
  - `id`: integer - ID e.g. `356493`
  - `company`: string - Company e.g. `Mau Mixers, LLC`
  - `origin_data`: string - Origin data e.g. `OD-876901523`
  - `origin_id`: string - Origin ID e.g. `0981234567`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/purchase_order_contracts/{id}

**Delete Purchase Order Contract**
Deletes a Purchase Order Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/purchase_order_contracts/sync

**Sync Purchase Order Contracts**
This endpoint creates or updates a batch of Purchase Order Contracts.
See [Using Sync Actions](/documentation/using-sync-actions) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project.
- `updates`: array of object (required) - Updated Purchase Order Contracts
  - `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
  - `approval_letter_date`: string - Approval letter date e.g. `2012-10-23`
  - `assignee_id`: integer - Assignee ID e.g. `38175`
  - `bill_to_address`: string - Bill to address e.g. `1410 Harbor View Drive Newport Beach, CA 92663`
  - `contract_date`: string(date) - Contract date e.g. `2012-10-23`
  - `delivery_date`: string(date) - Delivery date e.g. `2012-10-23`
  - `description`: string - Description e.g. `<p>3 tons of cement.</p>`
  - `executed`: boolean - Executed status e.g. `false`
  - `execution_date`: string(date) - Execution date e.g. `2012-10-23`
  - `issued_on_date`: string(date) - Issued on e.g. `2012-10-23`
  - `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2012-10-23`
  - `origin_code`: string - Origin code e.g. `OC-abc123`
  - `origin_data`: string - Origin Data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `459247544`
  - `number`: string - Number e.g. `PO-17-1990-00001`
  - `payment_terms`: string - Payment terms e.g. `Net 30`
  - `private`: boolean - Enable/Disable private status e.g. `false`
  - `retainage_percent`: string - Retainage percent e.g. `10`
  - `returned_date`: string(date) - Returned date e.g. `2012-10-23`
  - `ship_to_address`: string - Ship to address e.g. `Santa Claus Lane, Carpinteria, CA`
  - `ship_via`: string - Ship via e.g. `Acme Shipping`
  - `status`: string enum[Draft, Processing, Submitted, Partially Received, Received, Approved, Closed] - Status e.g. `Processing`
  - `title`: string - Title e.g. `Initial cement order.`
  - `vendor_id`: integer - Vendor ID e.g. `28572`

Response 200 (application/json): object

- `entities`: array of object
  - `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
  - `approval_letter_date`: string - Approval letter date e.g. `2013-10-23`
  - `approved_change_orders`: string - Approved Change Orders amount e.g. `23556.0`
  - `assignee`: object - Assignee
    - `id`: integer - ID e.g. `464773`
  - `bill_to_address`: string - Bill to address e.g. `Santa Claus Lane, Carpinteria, CA`
  - `billing_schedule_of_values_status`: string enum[draft, under_review, revise_and_submit, approved] - Subcontractor SOV status
  - `contract_date`: string(date) - Contract date e.g. `2013-10-23`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2012-10-23T21:49:40Z`
  - `delivery_date`: string(date) - Delivery date e.g. `2012-10-23`
  - `description`: string - Description e.g. `<p>3 tons of cement.</p>`
  - `draft_change_orders_amount`: string - Total of all draft change orders e.g. `750.00`
  - `executed`: boolean - Executed status e.g. `false`
  - `execution_date`: string(date) - Execution date e.g. `2013-10-23`
  - `grand_total`: string - Grand total e.g. `3329738.0`
  - `id`: integer - ID e.g. `64382`
  - `issued_on_date`: string(date) - Issued on e.g. `2013-10-23`
  - `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2013-10-23`
  - `number`: string - Number e.g. `PO-17-1990-00001`
  - `origin_code`: string - Origin code e.g. `OC-abc123`
  - `origin_data`: string - Origin Data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `459247544`
  - `payment_terms`: string - Payment terms e.g. `Net 30`
  - `pending_change_orders`: string - Pending Change Orders amount e.g. `23672.0`
  - `pending_revised_contract`: string - Pending Revised Contract amount e.g. `973630.0`
  - `percentage_paid`: string - Purchase Order Contract percentage paid e.g. `10`
  - `private`: boolean - Enable/Disable Private status e.g. `false`
  - `project`: object - Project
    - `id`: integer - ID e.g. `123456`
    - `name`: string - Name e.g. `Children's Hospital`
  - `remaining_balance_outstanding`: string - Remaining Balance Outstanding amount e.g. `233456.0`
  - `requisitions_are_enabled`: boolean - If true, Requisitions (Subcontractor Invoices) are enabled on the Commitment Contract e.g. `true`
  - `retainage_percent`: string - Retainage percent e.g. `10`
  - `returned_date`: string(date) - Returned date e.g. `2013-10-23`
  - `revised_contract`: string - Revised Contract amount e.g. `4566564.0`
  - `ship_to_address`: string - Ship to address e.g. `1410 Harbor View Drive Newport Beach, CA 92663`
  - `ship_via`: string - Ship via e.g. `Acme Shipping`
  - `show_line_items_to_non_admins`: boolean - If true and the contract is private, non admins with access to the contract will be able to view the SOV items e.g. `true`
  - `signed_contract_received_date`: string(date) - Signed contract received date e.g. `2012-10-25`
  - `status`: string enum[Draft, Processing, Submitted, Partially Received, Received, Approved, Closed] - Status e.g. `Processing`
  - `title`: string - Title e.g. `Initial cement order.`
  - `total_draw_requests_amount`: string - Total Draw Requests Amount e.g. `232224.0`
  - `total_payments`: string - Total Payments Amount e.g. `111312.0`
  - `total_requisitions_amount`: string - Total Requisitions (Subcontractor Invoices) Amount e.g. `5670.0`
  - `updated_at`: string(date-time) - Updated at e.g. `2015-11-04T15:18:57Z`
  - `vendor`: object - Vendor
    - `id`: integer - ID e.g. `356493`
    - `company`: string - Company e.g. `Mau Mixers, LLC`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `errors`: array of object

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## RFQs

Resource id: `rfqs`. Raw spec: `../openapi-raw/rfqs.json`. Web: https://developers.procore.com/reference/rest/rfqs?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/rfqs/{rfq_id}/quotes

**List RFQ Quotes**
Return a list of all Quotes in a specified RFQ.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `rfq_id` [path] integer (required) - RFQ ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `contract_id` [query] integer (required) - Contract ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

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
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/rfqs/{rfq_id}/quotes

**Create RFQ Quote**
Create a new Quote in a specified RFQ.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `rfq_id` [path] integer (required) - RFQ ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project.
- `contract_id`: integer (required) - Contract ID
- `rfq_quote`: object (required)
  - `commitment_quote_number`: string - Commitment quote number e.g. `45`
  - `cost`: number(float) - Cost e.g. `3653`
  - `description`: string - Description e.g. `Need to rip out and reinstall windows. Keep the painter out of the area.`
  - `schedule_impact`: integer - Schedule impact e.g. `145`

Response 201 (application/json): object

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
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/rfqs/{rfq_id}/quotes/{id}

**Show RFQ Quote**
Return detailed information about a specified Quote in a specified RFQ.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `rfq_id` [path] integer (required) - RFQ ID
- `id` [path] integer (required) - RFQ Quote ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `contract_id` [query] integer (required) - Contract ID

Response 200 (application/json): object

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
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/rfqs/{rfq_id}/quotes/{id}

**Update RFQ Quote**
Update a specified Quote in a specified RFQ.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `rfq_id` [path] integer (required) - RFQ ID
- `id` [path] integer (required) - RFQ Quote ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project.
- `contract_id`: integer (required) - Contract ID
- `rfq_quote`: object (required)
  - `commitment_quote_number`: string - Commitment quote number e.g. `45`
  - `cost`: number(float) - Cost e.g. `3653`
  - `description`: string - Description e.g. `Need to rip out and reinstall windows. Keep the painter out of the area.`
  - `schedule_impact`: integer - Schedule impact e.g. `145`

Response 200 (application/json): object

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
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/rfqs/{rfq_id}/responses

**List RFQ Responses**
Return a list of all Responses in a specified RFQ.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `rfq_id` [path] integer (required) - RFQ ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `contract_id` [query] integer (required) - Contract ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `105`
- `comment`: string - Comment in response to the latest quote e.g. `This quote needs to be revised. See attached files.`
- `created_at`: string(date-time) - Created at e.g. `2016-10-22T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2016-10-30T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2016-10-26T21:39:40Z`
- `prostore_file_ids`: array of integer - Prostore file IDs e.g. `[3453247, 6543893, 3476145]`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/rfqs/{rfq_id}/responses

**Create RFQ Response**
Create a new Response in a specified RFQ.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `rfq_id` [path] integer (required) - RFQ ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `256754`
- `contract_id`: integer (required) - Contract ID e.g. `392745`
- `rfq_response`: object (required)
  - `comment`: string - Comment in response to the latest quote e.g. `This quote needs to be revised. See attached files.`
  - `prostore_file_ids`: array of integer - Prostore file IDs e.g. `[3453247, 6543893, 3476145]`

Response 201 (application/json): object

- `id`: integer - ID e.g. `105`
- `comment`: string - Comment in response to the latest quote e.g. `This quote needs to be revised. See attached files.`
- `created_at`: string(date-time) - Created at e.g. `2016-10-22T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2016-10-30T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2016-10-26T21:39:40Z`
- `prostore_file_ids`: array of integer - Prostore file IDs e.g. `[3453247, 6543893, 3476145]`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/rfqs/{rfq_id}/responses/{id}

**Show RFQ Response**
Return detailed information about a specified Response in a specified RFQ.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `rfq_id` [path] integer (required) - RFQ ID
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `contract_id` [query] integer (required) - Contract ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `105`
- `comment`: string - Comment in response to the latest quote e.g. `This quote needs to be revised. See attached files.`
- `created_at`: string(date-time) - Created at e.g. `2016-10-22T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2016-10-30T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2016-10-26T21:39:40Z`
- `prostore_file_ids`: array of integer - Prostore file IDs e.g. `[3453247, 6543893, 3476145]`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/rfqs/{rfq_id}/responses/{id}

**Update RFQ Response**
Update a specified Response in a specified RFQ.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `rfq_id` [path] integer (required) - RFQ ID
- `id` [path] integer (required) - ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `256754`
- `contract_id`: integer (required) - Contract ID e.g. `392745`
- `rfq_response`: object (required)
  - `comment`: string - Comment in response to the latest quote e.g. `This quote needs to be revised. See attached files.`
  - `prostore_file_ids`: array of integer - Prostore file IDs e.g. `[3453247, 6543893, 3476145]`

Response 200 (application/json): object

- `id`: integer - ID e.g. `105`
- `comment`: string - Comment in response to the latest quote e.g. `This quote needs to be revised. See attached files.`
- `created_at`: string(date-time) - Created at e.g. `2016-10-22T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2016-10-30T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2016-10-26T21:39:40Z`
- `prostore_file_ids`: array of integer - Prostore file IDs e.g. `[3453247, 6543893, 3476145]`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/rfqs

**List RFQs**
Return a list of all RFQs in a specified Project and Contract.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `contract_id` [query] integer (required) - Contract ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[status]` [query] string enum[out_for_pricing, revise_and_resubmit, under_review, pending_final_approval, closed, withdrawn] - Returns item(s) with the specified value for RFQ status.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[commitment_contract_id]` [query] integer - Return item(s) with the specified Commitment Contract ID.

Response 200 (application/json): array of object

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
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `responses`: array of object - Responses
  - `id`: integer - ID e.g. `105`
  - `comment`: string - Comment in response to the latest quote e.g. `This quote needs to be revised. See attached files.`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-22T21:39:40Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2016-10-30T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-26T21:39:40Z`
  - `prostore_file_ids`: array of integer - Prostore file IDs e.g. `[3453247, 6543893, 3476145]`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
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
- `change_event`: object
  - `id`: integer - ID e.g. `43453`
  - `number`: integer - Number with alpha characters stripped out e.g. `14`
  - `alphanumeric_number`: string - Number including alpha characters e.g. `A14`
  - `origin_data`: string - Origin data e.g. `OD-123654789`
  - `origin_id`: string - Origin ID e.g. `654987123`
  - `title`: string - Title e.g. `Bathtub replacement`
  - `description`: string - Description e.g. `Replace the bathtub in the bathroom`
  - `status`: string - Status e.g. `Pending - Revised`
  - `project_id`: integer - Unique identifier for the project. e.g. `23446`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `event_type`: string enum[tbd, allowance, contingency, owner_change, transfer] - Event type e.g. `tbd`
  - `event_scope`: string enum[tbd, in_scope, out_of_scope] - Event scope e.g. `in_scope`
  - `change_event_origin_id`: integer - Origin ID e.g. `34523`
  - `change_event_origin_type`: string - Origin type e.g. `Rfi::Header`
  - `rfi`: object
    - `id`: integer - ID e.g. `34523`
    - `title`: string - Title e.g. `Electrical panel obstructed`
    - `number`: integer - Number e.g. `3`
    - `due_date`: string(date-time) - Due date e.g. `2016-11-23T21:39:40Z`
    - `status`: string - Status e.g. `draft`
  - `change_event_line_items`: array of object
    - `id`: integer - ID e.g. `345236`
    - `cost_code_biller_name`: string - Cost Code biller name e.g. `Campus`
    - `cost_code`: oneOf(object | object)
    - `cost_code_is_budgeted`: boolean - Cost Code budgeted status e.g. `true`
    - `description`: string - Description e.g. `Add caulk to bathtub base`
    - `event_id`: integer - Event ID e.g. `623153`
    - `line_item_type`: object - Line Item Type
    - `rom`: integer - Rough order of magnitude (ROM) e.g. `17705`
    - `contract`: object - Contract
    - `links`: object - Links
    - `statuses`: object - Statuses
    - `number`: string - Number e.g. `52225`
    - `status`: string - Change Event Status name e.g. `Open`
    - `title`: string - Title e.g. `Example Title`
    - `vendor`: object
    - `commitment_contract_cost`: string - Commitment contract cost e.g. `0.0`
    - `commitment_pco_cost`: string - Commitment Potential Change Order cost e.g. `1240.0`
    - `budget_mod_amount`: string - Budget Modification transfer amount e.g. `4500.0`
    - `budget_mod`: object - Budget Modification
    - `prime_pco_cost`: string - Prime Potential Change Order cost e.g. `4500.0`
    - `rfq_amount`: string - RFQ amount e.g. `1000.0`
    - `rfq_status`: string - RFQ status e.g. `Out for Pricing`
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
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/rfqs

**Create RFQ**
Create a new RFQ in a specified Project and Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `585355`
- `contract_id`: integer (required) - Contract ID e.g. `423400`
- `rfq`: object (required)
  - `assigned_id`: integer - Assigned ID e.g. `324884`
  - `change_event_event_id`: integer - Change Event ID e.g. `1362613`
  - `cost_code_id`: integer - Cost Code ID e.g. `2193644`
  - `description`: string - Description e.g. `Please see attached documentation for Bulletin 3 and provide pricing within 1...`
  - `due_date`: string(date) - Due date e.g. `2016-10-13`
  - `estimated_amount`: number(float) - Estimated amount e.g. `4302.0`
  - `estimated_schedule_impact`: integer - Estimated schedule impact in days e.g. `2`
  - `estimated_status`: string enum[rom, final] - Estimated status e.g. `rom`
  - `location_id`: integer - Location ID e.g. `237236`
  - `number`: string - Number e.g. `013`
  - `original_quote`: number(float) - Original quote e.g. `4500.0`
  - `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract.
  - `spec_section_description`: string - Specification Section description e.g. `Steel Structure`
  - `spec_section_number`: string - Specification Section number e.g. `236400`
  - `specification_section_id`: integer - Specification Section ID e.g. `32379`
  - `status`: string enum[out_for_pricing, revise_and_resubmit, under_review, pending_final_approval, closed, withdrawn] - Status e.g. `under_review`
  - `title`: string (required) - Title e.g. `Field Bulletin #3 - Steel staircase on roof`
  - `prostore_file_ids`: array of integer - Prostore File IDs e.g. `[3423484, 6983730, 2736492]`

Response 201 (application/json): object

- `id`: integer - ID e.g. `1199`
- `commitment_contract_id`: integer - Commitment Contract ID e.g. `418232`
- `created_at`: string(date-time) - Created at e.g. `2016-06-30T20:41:58Z`
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
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/rfqs/{id}

**Show RFQ**
Return detailed information about a specified RFQ in a specified Project and Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `contract_id` [query] integer (required) - Contract ID

Response 200 (application/json): object

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
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `responses`: array of object - Responses
  - `id`: integer - ID e.g. `105`
  - `comment`: string - Comment in response to the latest quote e.g. `This quote needs to be revised. See attached files.`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-22T21:39:40Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2016-10-30T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-26T21:39:40Z`
  - `prostore_file_ids`: array of integer - Prostore file IDs e.g. `[3453247, 6543893, 3476145]`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
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
- `change_event`: object
  - `id`: integer - ID e.g. `43453`
  - `number`: integer - Number with alpha characters stripped out e.g. `14`
  - `alphanumeric_number`: string - Number including alpha characters e.g. `A14`
  - `origin_data`: string - Origin data e.g. `OD-123654789`
  - `origin_id`: string - Origin ID e.g. `654987123`
  - `title`: string - Title e.g. `Bathtub replacement`
  - `description`: string - Description e.g. `Replace the bathtub in the bathroom`
  - `status`: string - Status e.g. `Pending - Revised`
  - `project_id`: integer - Unique identifier for the project. e.g. `23446`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `event_type`: string enum[tbd, allowance, contingency, owner_change, transfer] - Event type e.g. `tbd`
  - `event_scope`: string enum[tbd, in_scope, out_of_scope] - Event scope e.g. `in_scope`
  - `change_event_origin_id`: integer - Origin ID e.g. `34523`
  - `change_event_origin_type`: string - Origin type e.g. `Rfi::Header`
  - `rfi`: object
    - `id`: integer - ID e.g. `34523`
    - `title`: string - Title e.g. `Electrical panel obstructed`
    - `number`: integer - Number e.g. `3`
    - `due_date`: string(date-time) - Due date e.g. `2016-11-23T21:39:40Z`
    - `status`: string - Status e.g. `draft`
  - `change_event_line_items`: array of object
    - `id`: integer - ID e.g. `345236`
    - `cost_code_biller_name`: string - Cost Code biller name e.g. `Campus`
    - `cost_code`: oneOf(object | object)
    - `cost_code_is_budgeted`: boolean - Cost Code budgeted status e.g. `true`
    - `description`: string - Description e.g. `Add caulk to bathtub base`
    - `event_id`: integer - Event ID e.g. `623153`
    - `line_item_type`: object - Line Item Type
    - `rom`: integer - Rough order of magnitude (ROM) e.g. `17705`
    - `contract`: object - Contract
    - `links`: object - Links
    - `statuses`: object - Statuses
    - `number`: string - Number e.g. `52225`
    - `status`: string - Change Event Status name e.g. `Open`
    - `title`: string - Title e.g. `Example Title`
    - `vendor`: object
    - `commitment_contract_cost`: string - Commitment contract cost e.g. `0.0`
    - `commitment_pco_cost`: string - Commitment Potential Change Order cost e.g. `1240.0`
    - `budget_mod_amount`: string - Budget Modification transfer amount e.g. `4500.0`
    - `budget_mod`: object - Budget Modification
    - `prime_pco_cost`: string - Prime Potential Change Order cost e.g. `4500.0`
    - `rfq_amount`: string - RFQ amount e.g. `1000.0`
    - `rfq_status`: string - RFQ status e.g. `Out for Pricing`
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
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/rfqs/{id}

**Update RFQ**
Update an RFQ in a specified Project and Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `585355`
- `contract_id`: integer (required) - Contract ID e.g. `423400`
- `rfq`: object (required)
  - `assigned_id`: integer - Assigned ID e.g. `324884`
  - `change_event_event_id`: integer - Change Event ID e.g. `1362613`
  - `cost_code_id`: integer - Cost Code ID e.g. `2193644`
  - `description`: string - Description e.g. `Please see attached documentation for Bulletin 3 and provide pricing within 1...`
  - `due_date`: string(date) - Due date e.g. `2016-10-13`
  - `estimated_amount`: number(float) - Estimated amount e.g. `4302.0`
  - `estimated_schedule_impact`: integer - Estimated schedule impact in days e.g. `2`
  - `estimated_status`: string enum[rom, final] - Estimated status e.g. `rom`
  - `location_id`: integer - Location ID e.g. `237236`
  - `number`: string - Number e.g. `013`
  - `original_quote`: number(float) - Original quote e.g. `4500.0`
  - `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract.
  - `spec_section_description`: string - Specification Section description e.g. `Steel Structure`
  - `spec_section_number`: string - Specification Section number e.g. `236400`
  - `specification_section_id`: integer - Specification Section ID e.g. `32379`
  - `status`: string enum[out_for_pricing, revise_and_resubmit, under_review, pending_final_approval, closed, withdrawn] - Status e.g. `under_review`
  - `title`: string - Title e.g. `Field Bulletin #3 - Steel staircase on roof`
  - `prostore_file_ids`: array of integer - Prostore File IDs e.g. `[3423484, 6983730, 2736492]`

Response 200 (application/json): object

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
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `responses`: array of object - Responses
  - `id`: integer - ID e.g. `105`
  - `comment`: string - Comment in response to the latest quote e.g. `This quote needs to be revised. See attached files.`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-22T21:39:40Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2016-10-30T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-26T21:39:40Z`
  - `prostore_file_ids`: array of integer - Prostore file IDs e.g. `[3453247, 6543893, 3476145]`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
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
- `change_event`: object
  - `id`: integer - ID e.g. `43453`
  - `number`: integer - Number with alpha characters stripped out e.g. `14`
  - `alphanumeric_number`: string - Number including alpha characters e.g. `A14`
  - `origin_data`: string - Origin data e.g. `OD-123654789`
  - `origin_id`: string - Origin ID e.g. `654987123`
  - `title`: string - Title e.g. `Bathtub replacement`
  - `description`: string - Description e.g. `Replace the bathtub in the bathroom`
  - `status`: string - Status e.g. `Pending - Revised`
  - `project_id`: integer - Unique identifier for the project. e.g. `23446`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `event_type`: string enum[tbd, allowance, contingency, owner_change, transfer] - Event type e.g. `tbd`
  - `event_scope`: string enum[tbd, in_scope, out_of_scope] - Event scope e.g. `in_scope`
  - `change_event_origin_id`: integer - Origin ID e.g. `34523`
  - `change_event_origin_type`: string - Origin type e.g. `Rfi::Header`
  - `rfi`: object
    - `id`: integer - ID e.g. `34523`
    - `title`: string - Title e.g. `Electrical panel obstructed`
    - `number`: integer - Number e.g. `3`
    - `due_date`: string(date-time) - Due date e.g. `2016-11-23T21:39:40Z`
    - `status`: string - Status e.g. `draft`
  - `change_event_line_items`: array of object
    - `id`: integer - ID e.g. `345236`
    - `cost_code_biller_name`: string - Cost Code biller name e.g. `Campus`
    - `cost_code`: oneOf(object | object)
    - `cost_code_is_budgeted`: boolean - Cost Code budgeted status e.g. `true`
    - `description`: string - Description e.g. `Add caulk to bathtub base`
    - `event_id`: integer - Event ID e.g. `623153`
    - `line_item_type`: object - Line Item Type
    - `rom`: integer - Rough order of magnitude (ROM) e.g. `17705`
    - `contract`: object - Contract
    - `links`: object - Links
    - `statuses`: object - Statuses
    - `number`: string - Number e.g. `52225`
    - `status`: string - Change Event Status name e.g. `Open`
    - `title`: string - Title e.g. `Example Title`
    - `vendor`: object
    - `commitment_contract_cost`: string - Commitment contract cost e.g. `0.0`
    - `commitment_pco_cost`: string - Commitment Potential Change Order cost e.g. `1240.0`
    - `budget_mod_amount`: string - Budget Modification transfer amount e.g. `4500.0`
    - `budget_mod`: object - Budget Modification
    - `prime_pco_cost`: string - Prime Potential Change Order cost e.g. `4500.0`
    - `rfq_amount`: string - RFQ amount e.g. `1000.0`
    - `rfq_status`: string - RFQ status e.g. `Out for Pricing`
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
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/rfqs/{id}

**Delete RFQ**
Delete a specified RFQ in a specified Project and Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `contract_id` [query] integer (required) - Contract ID

Response 200: OK (no body)

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Requisition (Subcontractor Invoice) Change Histories

Resource id: `requisition-subcontractor-invoice-change-histories`. Raw spec: `../openapi-raw/requisition-subcontractor-invoice-change-histories.json`. Web: https://developers.procore.com/reference/rest/requisition-subcontractor-invoice-change-histories?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/requisitions/{requisition_id}/change_histories

**List Requisition (Subcontractor Invoice) Change Histories**
Return a list of Requisition (Subcontractor Invoice) Change Histories

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `requisition_id` [path] integer (required) - Requisition (Subcontractor Invoice) ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `101`
- `column`: string - Name of the column changed e.g. `assignee_id`
- `old_value`: string - Value of the column before change e.g. `The original title`
- `new_value`: string - Value of the column after change e.g. `The updated title`
- `action_by`: string - Name of the person who made the change e.g. `Tom Sawyer`
- `action_by_id`: integer - ID of the person who made the change e.g. `1011`
- `created_at`: string(date-time) - Created date e.g. `2018-05-08T13:21:20Z`
- `ref_id`: integer - The reference ID for the change e.g. `5424666`
- `ref_type`: string - The rereference type for the change e.g. `Billings::Requisition`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Requisition (Subcontractor Invoice) Change Order Items

Resource id: `requisition-subcontractor-invoice-change-order-items`. Raw spec: `../openapi-raw/requisition-subcontractor-invoice-change-order-items.json`. Web: https://developers.procore.com/reference/rest/requisition-subcontractor-invoice-change-order-items?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/requisitions/{requisition_id}/change_order_items

**List Requisition (Subcontractor Invoice) Change Order Items**
Return a list of Requisition (Subcontractor Invoice) Change Order Items
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `requisition_id` [path] integer (required) - Requisition (Subcontractor Invoice) ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[change_order_id]` [query] array of integer - Return item(s) associated to Change Orders with the specified IDs.

Response 200 (application/json): array of object

- `id`: integer - ID for Change Order Item e.g. `341256`
- `cost_code_id`: integer - Cost Code ID e.g. `21585118`
- `line_item_id`: integer - Line Item ID e.g. `3129856`
- `commitment_line_item_id`: integer - Commitment Line Item ID e.g. `3129856`
- `commitment_line_item_origin_id`: string - Commitment Line Item Origin ID e.g. `abc-123`
- `description_of_work`: string - Description of work e.g. `Install windows`
- `scheduled_value`: string - Scheduled value amount e.g. `1.00`
- `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
- `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
- `materials_presently_stored`: string - Materials presently stored amount. Only present when using amount based accounting. e.g. `0.00`
- `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
- `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
- `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
- `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
- `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
- `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained. Only present when using amount based accounting. e.g. `0.0`
- `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period. Only present when using amount based accounting. e.g. `10.0`
- `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
- `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period. Only present when using amount based accounting. e.g. `0.0`
- `scheduled_quantity`: string - Scheduled quantity. Only present when using unit based accounting. e.g. `0.0`
- `scheduled_unit_price`: string - Scheduled unit price. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_this_period_quantity`: string - Work completed this period quantity. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity. Only present when using unit based accounting. e.g. `0.0`
- `change_order_package_id`: integer - ID for Change Order Package e.g. `12345`
- `subcontractor_claimed_amount`: string - Amount claimed by the subcontractor e.g. `0.0`
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
- `position`: integer - Position e.g. `1`
- `currency_configuration`: object - Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
- `materials_moved`: string - Materials automatically moved from previous line item into previous work completed. This will be non-zero only if move_materials_to_previous_work_completed is true on the payment application. e.g. `0.00`
- `materials_retainage_retained_moved`: string - Retainage on materials automatically moved from previous line item into work completed retainage amount accrued previously. This will be non-zero only if move_materials_to_previous_work_completed is true on the paymen... e.g. `0.00`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/requisitions/{requisition_id}/change_order_items/{id}

**Show Requisition (Subcontractor Invoice) Change Order Item**
Return a Requisition (Subcontractor Invoice) Change Order Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `requisition_id` [path] integer (required) - Requisition (Subcontractor Invoice) ID
- `id` [path] integer (required) - Change Order Item ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID for Change Order Item e.g. `341256`
- `cost_code_id`: integer - Cost Code ID e.g. `21585118`
- `line_item_id`: integer - Line Item ID e.g. `3129856`
- `commitment_line_item_id`: integer - Commitment Line Item ID e.g. `3129856`
- `commitment_line_item_origin_id`: string - Commitment Line Item Origin ID e.g. `abc-123`
- `description_of_work`: string - Description of work e.g. `Install windows`
- `scheduled_value`: string - Scheduled value amount e.g. `1.00`
- `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
- `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
- `materials_presently_stored`: string - Materials presently stored amount. Only present when using amount based accounting. e.g. `0.00`
- `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
- `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
- `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
- `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
- `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
- `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained. Only present when using amount based accounting. e.g. `0.0`
- `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period. Only present when using amount based accounting. e.g. `10.0`
- `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
- `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period. Only present when using amount based accounting. e.g. `0.0`
- `scheduled_quantity`: string - Scheduled quantity. Only present when using unit based accounting. e.g. `0.0`
- `scheduled_unit_price`: string - Scheduled unit price. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_this_period_quantity`: string - Work completed this period quantity. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity. Only present when using unit based accounting. e.g. `0.0`
- `change_order_package_id`: integer - ID for Change Order Package e.g. `12345`
- `subcontractor_claimed_amount`: string - Amount claimed by the subcontractor e.g. `0.0`
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
- `position`: integer - Position e.g. `1`
- `currency_configuration`: object - Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
- `materials_moved`: string - Materials automatically moved from previous line item into previous work completed. This will be non-zero only if move_materials_to_previous_work_completed is true on the payment application. e.g. `0.00`
- `materials_retainage_retained_moved`: string - Retainage on materials automatically moved from previous line item into work completed retainage amount accrued previously. This will be non-zero only if move_materials_to_previous_work_completed is true on the paymen... e.g. `0.00`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/requisitions/{requisition_id}/change_order_items/{id}  **[DEPRECATED]**

**Update Requisition (Subcontractor Invoice) Change Order Item**
This is a deprecated endpoint, please use [/rest/v1.0/requisitions/{requisition_id}/bulk_item_update](bulk-update-subcontractor-invoice-requisition-items#bulk-update-subcontractor-invoice-requisitions-items)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `requisition_id` [path] integer (required) - Requisition (Subcontractor Invoice) ID
- `id` [path] integer (required) - Change Order Item ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `requisition_change_order_item`: object (required) - Requisition (Subcontractor Invoice) Change Order Item
  - `work_completed_this_period`: string - The amount of work completed this period e.g. `1000`
  - `materials_presently_stored`: string - The amount of materials presently stored (amount accounting only) e.g. `500`
  - `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period (admin user only, work_completed_this_period should be non-zero to hold a retainage) e.g. `100`
  - `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained (admin user, amount accounting only, materials_presently_stored should be non-zero to hold a retainage) e.g. `50`
  - `work_completed_retainage_released_this_period`: string - The amount of work completed retainage released this period e.g. `0`
  - `work_completed_this_period_quantity`: string - Work completed this period quantity (unit accounting only) e.g. `10`

Response 200 (application/json): object

- `id`: integer - ID for Change Order Item e.g. `341256`
- `cost_code_id`: integer - Cost Code ID e.g. `21585118`
- `line_item_id`: integer - Line Item ID e.g. `3129856`
- `commitment_line_item_id`: integer - Commitment Line Item ID e.g. `3129856`
- `commitment_line_item_origin_id`: string - Commitment Line Item Origin ID e.g. `abc-123`
- `description_of_work`: string - Description of work e.g. `Install windows`
- `scheduled_value`: string - Scheduled value amount e.g. `1.00`
- `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
- `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
- `materials_presently_stored`: string - Materials presently stored amount. Only present when using amount based accounting. e.g. `0.00`
- `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
- `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
- `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
- `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
- `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
- `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained. Only present when using amount based accounting. e.g. `0.0`
- `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period. Only present when using amount based accounting. e.g. `10.0`
- `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
- `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period. Only present when using amount based accounting. e.g. `0.0`
- `scheduled_quantity`: string - Scheduled quantity. Only present when using unit based accounting. e.g. `0.0`
- `scheduled_unit_price`: string - Scheduled unit price. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_this_period_quantity`: string - Work completed this period quantity. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity. Only present when using unit based accounting. e.g. `0.0`
- `change_order_package_id`: integer - ID for Change Order Package e.g. `12345`
- `subcontractor_claimed_amount`: string - Amount claimed by the subcontractor e.g. `0.0`
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
- `position`: integer - Position e.g. `1`
- `currency_configuration`: object - Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
- `materials_moved`: string - Materials automatically moved from previous line item into previous work completed. This will be non-zero only if move_materials_to_previous_work_completed is true on the payment application. e.g. `0.00`
- `materials_retainage_retained_moved`: string - Retainage on materials automatically moved from previous line item into work completed retainage amount accrued previously. This will be non-zero only if move_materials_to_previous_work_completed is true on the paymen... e.g. `0.00`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Requisition (Subcontractor Invoice) Contract Detail Items

Resource id: `requisition-subcontractor-invoice-contract-detail-items`. Raw spec: `../openapi-raw/requisition-subcontractor-invoice-contract-detail-items.json`. Web: https://developers.procore.com/reference/rest/requisition-subcontractor-invoice-contract-detail-items?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/requisitions/{requisition_id}/contract_detail_items

**List Requisition (Subcontractor Invoice) Contract Detail Items**
Return a list of Requisition (Subcontractor Invoice) Contract Detail Items

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `requisition_id` [path] integer (required) - Requisition (Subcontractor Invoice) ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID for a Contract Detail Item e.g. `341256`
- `cost_code_id`: integer - Cost Code ID e.g. `21585118`
- `detail_line_item_id`: integer - ID for a Work Order Contract Detail Line Item or Purchase Order Contract Detail Line Item e.g. `3129856`
- `description_of_work`: string - Description of work e.g. `Install windows`
- `scheduled_value`: string - Scheduled value amount e.g. `1.00`
- `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
- `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
- `materials_presently_stored`: string - Materials presently stored amount. Only present when using amount based accounting. e.g. `0.00`
- `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
- `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
- `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
- `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
- `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
- `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained. Only present when using amount based accounting. e.g. `0.0`
- `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period. Only present when using amount based accounting. e.g. `10.0`
- `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
- `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period. Only present when using amount based accounting. e.g. `0.0`
- `scheduled_quantity`: string - Scheduled quantity. Only present when using unit based accounting. e.g. `0.0`
- `scheduled_unit_price`: string - Scheduled unit price. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_this_period_quantity`: string - Work completed this period quantity. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity. Only present when using unit based accounting. e.g. `0.0`
- `subcontractor_claimed_amount`: string - Amount claimed by the subcontractor e.g. `0.0`
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
- `position`: integer - Position e.g. `1`
- `currency_configuration`: object - Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
- `materials_moved`: string - Materials automatically moved from previous line item into previous work completed. This will be non-zero only if move_materials_to_previous_work_completed is true on the payment application. e.g. `200.00`
- `materials_retainage_retained_moved`: string - Retainage on materials automatically moved from previous line item into work completed retainage amount accrued previously. This will be non-zero only if move_materials_to_previous_work_completed is true on the paymen... e.g. `300.00`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/requisitions/{requisition_id}/contract_detail_items/{id}

**Show Requisition (Subcontractor Invoice) Contract Detail Item**
Return a Requisition (Subcontractor Invoice) Contract Detail Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `requisition_id` [path] integer (required) - Requisition (Subcontractor Invoice) ID
- `id` [path] integer (required) - Contract Detail Item ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID for a Contract Detail Item e.g. `341256`
- `cost_code_id`: integer - Cost Code ID e.g. `21585118`
- `detail_line_item_id`: integer - ID for a Work Order Contract Detail Line Item or Purchase Order Contract Detail Line Item e.g. `3129856`
- `description_of_work`: string - Description of work e.g. `Install windows`
- `scheduled_value`: string - Scheduled value amount e.g. `1.00`
- `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
- `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
- `materials_presently_stored`: string - Materials presently stored amount. Only present when using amount based accounting. e.g. `0.00`
- `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
- `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
- `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
- `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
- `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
- `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained. Only present when using amount based accounting. e.g. `0.0`
- `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period. Only present when using amount based accounting. e.g. `10.0`
- `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
- `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period. Only present when using amount based accounting. e.g. `0.0`
- `scheduled_quantity`: string - Scheduled quantity. Only present when using unit based accounting. e.g. `0.0`
- `scheduled_unit_price`: string - Scheduled unit price. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_this_period_quantity`: string - Work completed this period quantity. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity. Only present when using unit based accounting. e.g. `0.0`
- `subcontractor_claimed_amount`: string - Amount claimed by the subcontractor e.g. `0.0`
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
- `position`: integer - Position e.g. `1`
- `currency_configuration`: object - Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
- `materials_moved`: string - Materials automatically moved from previous line item into previous work completed. This will be non-zero only if move_materials_to_previous_work_completed is true on the payment application. e.g. `200.00`
- `materials_retainage_retained_moved`: string - Retainage on materials automatically moved from previous line item into work completed retainage amount accrued previously. This will be non-zero only if move_materials_to_previous_work_completed is true on the paymen... e.g. `300.00`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/requisitions/{requisition_id}/contract_detail_items/{id}  **[DEPRECATED]**

**Update Requisition (Subcontractor Invoice) Contract Detail Item**
This is a deprecated endpoint, please use [/rest/v1.0/requisitions/{requisition_id}/bulk_item_update](bulk-update-subcontractor-invoice-requisition-items#bulk-update-subcontractor-invoice-requisitions-items)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `requisition_id` [path] integer (required) - Requisition (Subcontractor Invoice) ID
- `id` [path] integer (required) - Contract Detail Item ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `requisition_contract_detail_item`: object (required) - Requisition (Subcontractor Invoice) Contract Detail Item
  - `work_completed_this_period`: string - The amount of work completed this period e.g. `1000`
  - `materials_presently_stored`: string - The amount of materials presently stored e.g. `500`
  - `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period (admin user only, work_completed_this_period should be non-zero to hold a retainage) e.g. `100`
  - `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained (admin user, amount accounting only, materials_presently_stored should be non-zero to hold a retainage) e.g. `50`
  - `work_completed_retainage_released_this_period`: string - The amount of work completed retainage released this period e.g. `0`
  - `work_completed_this_period_quantity`: string - Work completed this period quantity (unit accounting contract only) e.g. `10`

Response 200 (application/json): object

- `id`: integer - ID for a Contract Detail Item e.g. `341256`
- `cost_code_id`: integer - Cost Code ID e.g. `21585118`
- `detail_line_item_id`: integer - ID for a Work Order Contract Detail Line Item or Purchase Order Contract Detail Line Item e.g. `3129856`
- `description_of_work`: string - Description of work e.g. `Install windows`
- `scheduled_value`: string - Scheduled value amount e.g. `1.00`
- `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
- `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
- `materials_presently_stored`: string - Materials presently stored amount. Only present when using amount based accounting. e.g. `0.00`
- `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
- `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
- `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
- `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
- `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
- `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained. Only present when using amount based accounting. e.g. `0.0`
- `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period. Only present when using amount based accounting. e.g. `10.0`
- `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
- `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period. Only present when using amount based accounting. e.g. `0.0`
- `scheduled_quantity`: string - Scheduled quantity. Only present when using unit based accounting. e.g. `0.0`
- `scheduled_unit_price`: string - Scheduled unit price. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_this_period_quantity`: string - Work completed this period quantity. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity. Only present when using unit based accounting. e.g. `0.0`
- `subcontractor_claimed_amount`: string - Amount claimed by the subcontractor e.g. `0.0`
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
- `position`: integer - Position e.g. `1`
- `currency_configuration`: object - Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
- `materials_moved`: string - Materials automatically moved from previous line item into previous work completed. This will be non-zero only if move_materials_to_previous_work_completed is true on the payment application. e.g. `200.00`
- `materials_retainage_retained_moved`: string - Retainage on materials automatically moved from previous line item into work completed retainage amount accrued previously. This will be non-zero only if move_materials_to_previous_work_completed is true on the paymen... e.g. `300.00`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Requisition (Subcontractor Invoice) Contract Items

Resource id: `requisition-subcontractor-invoice-contract-items`. Raw spec: `../openapi-raw/requisition-subcontractor-invoice-contract-items.json`. Web: https://developers.procore.com/reference/rest/requisition-subcontractor-invoice-contract-items?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/requisitions/{requisition_id}/contract_items

**List Requisition (Subcontractor Invoice) Contract Items**
Return a list of Requisition (Subcontractor Invoice) Contract Items

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `requisition_id` [path] integer (required) - Requisition (Subcontractor Invoice) ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID for Contract Item or Whole Change Order Item e.g. `341256`
- `item_type`: string - Item Type - (contract_item, contract_detail_item, change_order_item) e.g. `contract_detail_item`
- `cost_code_id`: integer - Cost Code ID e.g. `21585118`
- `line_item_id`: integer - Line Item ID e.g. `3129856`
- `description_of_work`: string - Description of work e.g. `Install windows`
- `scheduled_value`: string - Scheduled value amount e.g. `1.00`
- `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
- `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
- `materials_presently_stored`: string - Materials presently stored amount. Only present when using amount based accounting. e.g. `0.00`
- `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
- `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
- `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
- `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
- `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
- `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained. Only present when using amount based accounting. e.g. `0.0`
- `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period. Only present when using amount based accounting. e.g. `10.0`
- `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
- `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period. Only present when using amount based accounting. e.g. `0.0`
- `scheduled_quantity`: string - Scheduled quantity. Only present when using unit based accounting. e.g. `0.0`
- `scheduled_unit_price`: string - Scheduled unit price. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_this_period_quantity`: string - Work completed this period quantity. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity. Only present when using unit based accounting. e.g. `0.0`
- `comment`: string - Comment e.g. `Installation charges`
- `status`: string - Status e.g. `no_action`
- `position`: integer - Position of this item e.g. `1`
- `ssr_manual_override`: boolean - SSR Manual Override e.g. `false`
- `subcontractor_claimed_amount`: string - Amount claimed by the subcontractor e.g. `0.0`
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
- `currency_configuration`: object - Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
- `materials_moved`: string - Materials automatically moved from previous line item into previous work completed. This will be non-zero only if move_materials_to_previous_work_completed is true on the payment application. e.g. `0.00`
- `materials_retainage_retained_moved`: string - Retainage on materials automatically moved from previous line item into work completed retainage amount accrued previously. This will be non-zero only if move_materials_to_previous_work_completed is true on the paymen... e.g. `0.00`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/requisitions/{requisition_id}/contract_items/{id}

**Show Requisition (Subcontractor Invoice) Contract Item**
Return a Requisition (Subcontractor Invoice) Contract Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `requisition_id` [path] integer (required) - Requisition (Subcontractor Invoice) ID
- `id` [path] integer (required) - Contract Item ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID for Contract Item or Whole Change Order Item e.g. `341256`
- `item_type`: string - Item Type - (contract_item, contract_detail_item, change_order_item) e.g. `contract_detail_item`
- `cost_code_id`: integer - Cost Code ID e.g. `21585118`
- `line_item_id`: integer - Line Item ID e.g. `3129856`
- `description_of_work`: string - Description of work e.g. `Install windows`
- `scheduled_value`: string - Scheduled value amount e.g. `1.00`
- `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
- `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
- `materials_presently_stored`: string - Materials presently stored amount. Only present when using amount based accounting. e.g. `0.00`
- `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
- `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
- `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
- `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
- `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
- `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained. Only present when using amount based accounting. e.g. `0.0`
- `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period. Only present when using amount based accounting. e.g. `10.0`
- `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
- `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period. Only present when using amount based accounting. e.g. `0.0`
- `scheduled_quantity`: string - Scheduled quantity. Only present when using unit based accounting. e.g. `0.0`
- `scheduled_unit_price`: string - Scheduled unit price. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_this_period_quantity`: string - Work completed this period quantity. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity. Only present when using unit based accounting. e.g. `0.0`
- `comment`: string - Comment e.g. `Installation charges`
- `status`: string - Status e.g. `no_action`
- `position`: integer - Position of this item e.g. `1`
- `ssr_manual_override`: boolean - SSR Manual Override e.g. `false`
- `subcontractor_claimed_amount`: string - Amount claimed by the subcontractor e.g. `0.0`
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
- `currency_configuration`: object - Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
- `materials_moved`: string - Materials automatically moved from previous line item into previous work completed. This will be non-zero only if move_materials_to_previous_work_completed is true on the payment application. e.g. `0.00`
- `materials_retainage_retained_moved`: string - Retainage on materials automatically moved from previous line item into work completed retainage amount accrued previously. This will be non-zero only if move_materials_to_previous_work_completed is true on the paymen... e.g. `0.00`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/requisitions/{requisition_id}/contract_items/{id}  **[DEPRECATED]**

**Update Requisition (Subcontractor Invoice) Contract Item**
This is a deprecated endpoint, please use [/rest/v1.0/requisitions/{requisition_id}/bulk_item_update](bulk-update-subcontractor-invoice-requisition-items#bulk-update-subcontractor-invoice-requisitions-items)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `requisition_id` [path] integer (required) - Requisition (Subcontractor Invoice) ID
- `id` [path] integer (required) - Contract Item ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `requisition_contract_item`: object (required) - Requisition (Subcontractor Invoice) Contract Item
  - `work_completed_this_period`: string - The amount of work completed this period e.g. `1000`
  - `materials_presently_stored`: string - The amount of materials presently stored e.g. `500`
  - `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period (admin user only, work_completed_this_period should be non-zero to hold a retainage) e.g. `100`
  - `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained (admin user, amount accounting only, materials_presently_stored should be non-zero to hold a retainage) e.g. `50`
  - `work_completed_retainage_released_this_period`: string - The amount of work completed retainage released this period e.g. `0`
  - `work_completed_this_period_quantity`: string - Work completed this period quantity (unit accounting contract only) e.g. `10`

Response 200 (application/json): object

- `id`: integer - ID for Contract Item or Whole Change Order Item e.g. `341256`
- `item_type`: string - Item Type - (contract_item, contract_detail_item, change_order_item) e.g. `contract_detail_item`
- `cost_code_id`: integer - Cost Code ID e.g. `21585118`
- `line_item_id`: integer - Line Item ID e.g. `3129856`
- `description_of_work`: string - Description of work e.g. `Install windows`
- `scheduled_value`: string - Scheduled value amount e.g. `1.00`
- `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
- `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
- `materials_presently_stored`: string - Materials presently stored amount. Only present when using amount based accounting. e.g. `0.00`
- `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
- `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
- `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
- `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
- `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
- `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained. Only present when using amount based accounting. e.g. `0.0`
- `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period. Only present when using amount based accounting. e.g. `10.0`
- `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
- `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period. Only present when using amount based accounting. e.g. `0.0`
- `scheduled_quantity`: string - Scheduled quantity. Only present when using unit based accounting. e.g. `0.0`
- `scheduled_unit_price`: string - Scheduled unit price. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_this_period_quantity`: string - Work completed this period quantity. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity. Only present when using unit based accounting. e.g. `0.0`
- `comment`: string - Comment e.g. `Installation charges`
- `status`: string - Status e.g. `no_action`
- `position`: integer - Position of this item e.g. `1`
- `ssr_manual_override`: boolean - SSR Manual Override e.g. `false`
- `subcontractor_claimed_amount`: string - Amount claimed by the subcontractor e.g. `0.0`
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
- `currency_configuration`: object - Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
- `materials_moved`: string - Materials automatically moved from previous line item into previous work completed. This will be non-zero only if move_materials_to_previous_work_completed is true on the payment application. e.g. `0.00`
- `materials_retainage_retained_moved`: string - Retainage on materials automatically moved from previous line item into work completed retainage amount accrued previously. This will be non-zero only if move_materials_to_previous_work_completed is true on the paymen... e.g. `0.00`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Requisition (Subcontractor Invoice) Single PDF Compilers

Resource id: `requisition-subcontractor-invoice-single-pdf-compilers`. Raw spec: `../openapi-raw/requisition-subcontractor-invoice-single-pdf-compilers.json`. Web: https://developers.procore.com/reference/rest/requisition-subcontractor-invoice-single-pdf-compilers?version=latest
Product lines: Construction Financials

### POST /rest/v1.0/requisitions/{requisition_id}/single_pdf_compilers  **[BETA]**

**Merges one or more PDFs of a requisition into a single PDF**
Merges one or more PDFs of a requisition into a single PDF. There are two ways to use this endpoint. First to generate a cover sheet for the requisition.
If you would like to receive a polling URL that will follow the job provide the polling option in the query params `polling=true`. If you would like the file emailed to you omit the polling param in the query params.
You can use the following request payload as an example
````json
{
  "files":[
    {"type": "cover_sheet", "id": ""}
  ]
}
````
If you would like to include some attachments, you can use the following request payload as an example
````json
{
  "files": [
    {
      "id": "",
      "type": "cover_sheet"
    },
    {
      "id": 1234,
      "url": "http://example.com/file_1.pdf",
      "type": "prostore_file"
    }
  ]
}
````

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `requisition_id` [path] integer (required) - Requisition (Subcontractor Invoice) ID
- `polling` [query] boolean - Determines if the PDF is emailed or a job URL is returned
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `files`: array of object (required)
  - `type`: string (required) - Type of file e.g. `prostore_file`
  - `id`: integer (required) - Unique identifier for the file. e.g. `1234`
  - `url`: string - Url of the file e.g. `https://example.com/foo.pdf`

Response 200 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Requisition (Subcontractor Invoice) Whole Change Order Items

Resource id: `requisition-subcontractor-invoice-whole-change-order-items`. Raw spec: `../openapi-raw/requisition-subcontractor-invoice-whole-change-order-items.json`. Web: https://developers.procore.com/reference/rest/requisition-subcontractor-invoice-whole-change-order-items?version=latest
Product lines: Construction Financials

### PATCH /rest/v1.0/requisitions/{requisition_id}/whole_change_order_items/{id}

**Update Requisition (Subcontractor Invoice) Whole Change Order Item**
Update a specific Requisition (Subcontractor Invoice) Whole Change Order Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `requisition_id` [path] integer (required) - Requisition (Subcontractor Invoice) ID
- `id` [path] integer (required) - Whole Change Order Item ID

Request body (application/json) (required):

- `requisition_whole_change_order_item`: object (required) - Requisition (Subcontractor Invoice) Whole Change Order Item
  - `work_completed_this_period`: string - The amount of work completed this period e.g. `1000`
  - `materials_presently_stored`: string - The amount of materials presently stored e.g. `500`
  - `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `100`
  - `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained e.g. `50`
  - `work_completed_retainage_released_this_period`: string - The amount of work completed retainage released this period e.g. `0`
  - `work_completed_this_period_quantity`: string - Work completed this period quantity e.g. `10`
  - `ssr_manual_override`: boolean - SSR manual override e.g. `false`
  - `comment`: string - Comment for the Whole Change Order Item e.g. `Installation charges`
  - `status`: string - Status of the Whole Change Order Item e.g. `draft`

Response 200 (application/json): object

- `id`: integer - ID of the Whole Change Order Item e.g. `341256`
- `cost_code_id`: integer - Cost Code ID e.g. `21585118`
- `item_type`: string - Item type e.g. `whole_change_order_item`
- `line_item_id`: integer - Line Item ID e.g. `3129856`
- `description_of_work`: string - Description of work e.g. `Install windows`
- `scheduled_value`: string - Scheduled value amount e.g. `1.00`
- `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
- `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
- `materials_presently_stored`: string - Materials presently stored amount e.g. `0.00`
- `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
- `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
- `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
- `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
- `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
- `ssr_manual_override`: boolean - SSR manual override e.g. `false`
- `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained e.g. `0.0`
- `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period e.g. `10.0`
- `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
- `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period e.g. `0.0`
- `scheduled_quantity`: string - Scheduled quantity e.g. `0.0`
- `scheduled_unit_price`: string - Scheduled unit price e.g. `0.0`
- `work_completed_this_period_quantity`: string - Work completed this period quantity e.g. `0.0`
- `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity e.g. `0.0`
- `change_order_package_id`: integer - ID for Change Order Package e.g. `12345`
- `subcontractor_claimed_amount`: string - Amount claimed by the subcontractor e.g. `0.0`
- `comment`: string - Comment for the Whole Change Order Item e.g. `Installation charges`
- `status`: string - Status of the Whole Change Order Item e.g. `draft`
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
- `position`: integer - Position e.g. `1`
- `currency_configuration`: object - Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
- `materials_moved`: string - Materials automatically moved from previous line item into previous work completed. This will be non-zero only if move_materials_to_previous_work_completed is true on the payment application. e.g. `0.00`
- `materials_retainage_retained_moved`: string - Retainage on materials automatically moved from previous line item into work completed retainage amount accrued previously. This will be non-zero only if move_materials_to_previous_work_completed is true on the paymen... e.g. `0.00`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Requisitions (Subcontractor Invoices)

Resource id: `requisitions-subcontractor-invoices`. Raw spec: `../openapi-raw/requisitions-subcontractor-invoices.json`. Web: https://developers.procore.com/reference/rest/requisitions-subcontractor-invoices?version=latest
Product lines: Construction Financials

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/requisitions/{id}/payment_details

**Update the Due Date for a Requisition (Subcontractor Invoice)**
Updates the Due Date for a Requisition (Subcontractor Invoice)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Unique identifier for the Requisition (Subcontractor Invoice)

Request body (application/json) (required):

- `due_date`: string - Payment Due Date for the Requisition (Subcontractor Invoice) e.g. `2024-02-02`

Response 200 (application/json): object

- `data`: object
  - `due_date`: string - Payment Due Date for the Requisition (Subcontractor Invoice) e.g. `2024-02-02`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/requisitions

**List Requisitions (Subcontractor Invoices) for Project**
Return a list of Requisitions (Subcontractor Invoices) on a specified project
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page, default 30
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[commitment_id]` [query] integer - Commitment ID(s). Returns item(s) with the specified Commitment ID(s).
- `filters[period_id]` [query] integer - Billing Period ID. Returns item(s) with the specified Billing Period ID.
- `filters[status]` [query] string enum[draft, under_review, revise_and_resubmit, approved, approved_as_noted, pending_owner_approval] - Return item(s) with the specified Requisition (Subcontractor Invoice) status.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.
- `filters[is_last]` [query] boolean - Setting this to true will return only the last item. Setting this to false will return all the items except the last one.
- `view` [query] string enum[default, extended, items, action_policy, header_only] - Specifies which view (which attributes) of the resource is going to be present in the response. The `header_only` view is intended for split header / line-items rendering on the Subcontractor Invoicing UI: it returns ...

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `58820`
- `previous_requisition_id`: integer - ID for the previous requisition before this one on the same contract e.g. `58819`
- `project_id`: integer - Project ID e.g. `789`
- `billing_date`: string(date) - Billing date e.g. `2013-11-20`
- `created_at`: string(date-time) - Date req was created e.g. `2013-11-15T12:00:00Z`
- `updated_at`: string(date-time) - Date req was last updated e.g. `2013-11-15T12:00:00Z`
- `commitment_id`: integer - commitment ID e.g. `701973`
- `commitment_type`: string - Commitment Type e.g. `WorkOrderContract`
- `contract_name`: string - Contract Name e.g. `Contract SC-001`
- `deletable`: boolean - A boolean indicating whether or not the invoice can be deleted. e.g. `false`
- `final`: boolean - true or false value indicating whether or not this is the final invoice e.g. `true`
- `vendor_name`: string - Name of Vendor for Invoice e.g. `Ernie's Electrical`
- `vendor_id`: integer - ID of Vendor for Invoice e.g. `8881212`
- `invoice_number`: string - Invoice number e.g. `123`
- `invoice_type`: string enum[progress, retainage_release, progress_and_retainage_release] - Invoice type (present in all views) e.g. `progress_and_retainage_release`
- `contract_invoicing_method`: string enum[progressive, simplified] - The invoicing method for the contract, either progressive or simplified e.g. `progressive`
- `origin_data`: string - Requisition (Subcontractor Invoice) third party data e.g. `XYZ-0012`
- `origin_id`: string - Requisition (Subcontractor Invoice) third party ID e.g. `abc-123`
- `payment_date`: string(date) - Date requisition was paid e.g. `2013-11-15`
- `percent_complete`: string - Percent complete e.g. `0`
- `period_id`: integer - Period ID e.g. `4293`
- `requisition_start`: string(date) - Requisition (Subcontractor Invoice) start date e.g. `2013-11-01`
- `requisition_end`: string(date) - Requisition (Subcontractor Invoice) end date e.g. `2013-11-02`
- `status`: string enum[draft, under_review, revise_and_resubmit, approved, approved_as_noted, pending_owner_approval] - Status e.g. `approved`
- `erp_status`: string - Current ERP status of Requisition e.g. `synced`
- `number`: integer - Requisition (Subcontractor Invoice) number e.g. `1`
- `submitted_at`: string(date) - Date requisition was submitted e.g. `2013-11-02`
- `total_claimed_amount`: string - Total Claimed Amount for the Invoice e.g. `100.00`
- `electronic_signature_id`: integer - Electronic Signature ID e.g. `701973`
- `move_materials_to_previous_work_completed`: boolean - A boolean indicating if should move materials to previous work completed. e.g. `false`
- `summary_text`: object - Requisition (Subcontractor Invoice) summary text. Included when the view query param is 'extended' or 'header_only' AND the contract's invoicing method is 'progressive'. Omitted for 'simplified' contracts regardless o...
  - `project_name`: string - Name of the project e.g. `Project`
  - `project_number`: string - Number of the project e.g. `100`
  - `to_general_contractor`: string - Name of the company the requisition is for e.g. `Company A`
  - `requisition_period_start`: string(date) - Requisition period start date e.g. `2010-01-01`
  - `requisition_period_end`: string(date) - Requisition period end date e.g. `2010-01-01`
  - `subcontractor_name`: string - Name of the company the requisition is from e.g. `Company B`
  - `subcontractor_street`: string - Street address of the company the requisition is from e.g. `101 XYZ Avenue`
  - `subcontractor_city`: string - City of the company the requisition is from e.g. `New York`
  - `subcontractor_state_code`: string - State code of the company the requisition is from e.g. `NY`
  - `subcontractor_zip`: string - Zip code of the company the requisition is from e.g. `10101`
  - `subcontractor_country_code`: string - Country code of the company the requisition is from e.g. `US`
  - `application_number`: string - Invoice number e.g. `1`
  - `contract_for`: string - The contract title e.g. `Ceiling Tiles`
  - `contract_date`: string(date) - Date the signed contract is received e.g. `2010-01-01`
- `summary`: object - Requisition (Subcontractor Invoice) summary
  - `balance_to_finish_including_retainage`: string - Balance to finish including retainage e.g. `1268346.55`
  - `completed_work_retainage_percent`: string - Completed work retainage percent e.g. `10`
  - `completed_work_retainage_amount`: string - Completed work retainage amount e.g. `1201.0`
  - `contract_sum_to_date`: string - Contract sum to date e.g. `1279159.15`
  - `current_payment_due`: string - Current payment due e.g. `10812.6`
  - `formatted_period`: string - Formatted billing period e.g. `01/06/19 - 30/06/19`
  - `less_previous_certificates_for_payment`: string - Less previous certificates for payment e.g. `0`
  - `negative_change_order_item_total`: string - Negative change order item total e.g. `0`
  - `negative_new_change_order_item_total`: string - Negative new change order item total e.g. `0`
  - `negative_previous_change_order_item_total`: string - Negative previous change order item total e.g. `0`
  - `net_change_by_change_orders`: string - Net change by change orders e.g. `256706.65`
  - `original_contract_sum`: string - Original contract sum e.g. `1022452.5`
  - `positive_change_order_item_total`: string - Positive change order item total e.g. `0.00`
  - `positive_new_change_order_item_total`: string - Positive new change order item total e.g. `0.00`
  - `positive_previous_change_order_item_total`: string - Positive previous change order item total e.g. `0.00`
  - `stored_materials_retainage_amount`: string - Stored materials retainage amount e.g. `0.4`
  - `stored_materials_retainage_percent`: string - Stored materials retainage percent e.g. `10`
  - `tax_applicable_to_this_payment`: string - Tax applicable to this payment e.g. `0`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date e.g. `1201.4`
  - `total_earned_less_retainage`: string - Total earned less retainage e.g. `10812.6`
  - `total_retainage`: string - Total retainage e.g. `1201.4`
  - `new_materials`: string - Amount of new materials added this period e.g. `1975.31`
  - `new_materials_quantity`: string - Quantity of new materials added this period, only for unit based line items e.g. `98.7654`
  - `stored_materials`: string - Amount of materials presently stored less the new materials added this period e.g. `716.05`
  - `stored_materials_quantity`: string - Quantity of materials presently stored less the new materials added this period e.g. `35.80249`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
- `subtiers_certified_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
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
- `currency_configuration`: object - Requisition (Subcontractor Invoice) Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
  - `currency_exchange_rate`: number(float) - The exchange rate between the invoice currency and the project currency e.g. `1.8`
  - `base_currency_iso_code`: string - Project or Company ISO Code e.g. `EUR`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string - Content Type e.g. `image/jpeg`
- `action_policy`: object
  - `controls`: object - Map of action names to their permission descriptors.
- `tax_summary`: array of object - Aggregated tax summary for the requisition, grouped by tax code. Included only when the view query param is 'extended' or 'header_only'.
  - `tax_code_id`: integer - Tax code id e.g. `163215`
  - `tax_code_name`: string - Tax code name e.g. `HST`
  - `tax_code_rate`: number - Tax code rate e.g. `0.15`
  - `applied_amount`: number - Total applied amount for all line items with this tax code e.g. `54321`
- `accounting_method`: string enum[amount, unit] - Accounting method of the requisition's contract. Included only when the view query param is 'extended' or 'header_only'. e.g. `amount`
- `items`: array of object - Requisition items. Included only when the views query param includes 'extended' or 'items'.
  - `id`: integer - ID of the Contract Item or Contract Detail Item or Change Order Item or Whole Change Order Item e.g. `341256`
  - `item_type`: string - Item Type - (contract_item, contract_detail_item, change_order_item, whole_change_order_item) e.g. `contract_detail_item`
  - `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
  - `cost_code_id`: integer - Cost Code ID e.g. `21585118`
  - `currency_configuration`: object - Requisition (Subcontractor Invoice) Currency Configuration
    - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
    - `currency_exchange_rate`: number(float) - The exchange rate between the invoice currency and the project currency e.g. `1.8`
    - `base_currency_iso_code`: string - Project or Company ISO Code e.g. `EUR`
  - `line_item_id`: integer - Line Item ID e.g. `3129856`
  - `description_of_work`: string e.g. `Install windows`
  - `net_amount`: string - Net amount of line item e.g. `100.00`
  - `gross_amount`: string - Gross amount of line item e.g. `200.00`
  - `wbs_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `44`
    - `flat_code`: string - wbs code flat code e.g. `2.E`
    - `description`: string - wbs code description e.g. `Earthwork.Equipment`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `scheduled_value`: string - Scheduled value amount e.g. `1.00`
  - `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
  - `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
  - `materials_presently_stored`: string - Amount of materials presently stored e.g. `2691.36`
  - `materials_presently_stored_quantity`: string - Quantity of the Materials presently stored, only for unit based line items e.g. `134.56789`
  - `materials_presently_stored_from_previous_progress`: string - Materials presently stored from previous progress e.g. `0.00`
  - `materials_previously_stored_quantity`: string - Quantity of the Materials stored from the previous invoice, only for unit based line items e.g. `12.3456`
  - `materials_moved`: string - Materials automatically moved from previous line item into previous work completed. This will be non-zero only if move_materials_to_previous_work_completed is true on the payment application. e.g. `0.00`
  - `materials_retainage_retained_moved`: string - Retainage on materials automatically moved from previous line item into work completed retainage amount accrued previously. This will be non-zero only if move_materials_to_previous_work_completed is true on the paymen... e.g. `0.00`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
  - `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
  - `total_completed_and_stored_to_date_from_previous`: string - Total completed and stored to date from previous e.g. `100.00`
  - `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
  - `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
  - `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
  - `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained e.g. `0.0`
  - `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period, present e.g. `10.0`
  - `materials_stored_retainage_new_materials`: string - Materials stored retainage from new materials, present e.g. `10.0`
  - `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
  - `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period e.g. `0.0`
  - `scheduled_quantity`: string - Scheduled quantity e.g. `0.0`
  - `scheduled_unit_price`: string - Scheduled unit price e.g. `20.0`
  - `work_completed_this_period_quantity`: string - Work completed this period quantity e.g. `0.0`
  - `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity e.g. `0.0`
  - `comment`: string - Comment e.g. `Installation charges`
  - `status`: string - Status e.g. `no_action`
  - `position`: integer - Position of this item e.g. `1`
  - `line_number`: string - Line Number for the item e.g. `1.1`
  - `ssr_manual_override`: boolean - SSR Manual Override e.g. `false`
  - `subcontractor_claimed_amount`: string - Amount claimed by the subcontractor e.g. `0.0`
  - `previous_progress_id`: integer - ID of the previous progress for the item e.g. `55463`
  - `taxes`: array of object - Tax code information associated with the item
    - `tax_code_id`: integer - ID of the tax code e.g. `1`
    - `tax_code_name`: string - Code of the tax code e.g. `VAT`
    - `tax_code_rate`: number(float) - Rate of the tax code e.g. `0.1`
  - `uom`: string - Unit of measure for this line item e.g. `m²`
- `item_packages`: array of object - Requisition item packages. An item package can have either a contract or change order as its parent entity. Included only when the views query param includes 'extended' or 'items'.
  - `id`: integer - ID of the item package e.g. `341256`
  - `contract_id`: integer - ID of the contract associated with the item package e.g. `341256`
  - `change_order_id`: integer - ID of the change order associated with the item package e.g. `341256`
  - `number`: string - number associated with the item package's parent entity e.g. `1`
  - `title`: string - title associated with the item package's parent entity e.g. `Contract Title`
  - `status`: string - status associated with the item package's parent entity e.g. `Approved`
  - `position`: integer - position associated with the item package's parent entity e.g. `1`
  - `change_order_acronym_number`: string - acronym for the change order object associated with the item package. Null if the item package's parent entity is a contract. e.g. `PCO #003`
  - `change_order_request`: object - The change order request an item package is associated with. Only returned on three tier projects.
    - `id`: integer - ID of the change order request associated with the item package e.g. `341256`
    - `title`: string - title of the change order request associated with the item package e.g. `COR Title`
    - `change_order_acronym_number`: string - acronym and number for the change order request associated with the item package e.g. `COR #003`
  - `batch`: object - The change order batch an item package is associated with. Only returned on multi tier projects.
    - `id`: integer - ID of the change order batch associated with the item package e.g. `341256`
    - `title`: string - title of the change order batch associated with the item package e.g. `COR Title`
    - `change_order_acronym_number`: string - acronym and number for the change order batch associated with the item package e.g. `CCO #003`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/requisitions

**Create Requisition (Subcontractor Invoices) for Commitment**
Create a new Requisition (Subcontractor Invoices) for the specified Commitment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[default, extended, items, action_policy, header_only] - Specifies which view (which attributes) of the resource is going to be present in the response. The `header_only` view is intended for split header / line-items rendering on the Subcontractor Invoicing UI: it returns ...
- `invite_id` [query] integer - Unique identifier for the invite to associate with the requisition.

Request body (application/json) (required):

- `project_id`: integer (required) - Project ID e.g. `55001`
- `commitment_id`: integer (required) - Commitment ID e.g. `66005`
- `requisition`: object - Requisition (Subcontractor Invoice)
  - `items`: array of object
    - `line_item_id`: integer - The line item id of a contract line item e.g. `1001`
    - `detail_line_item_id`: integer - Contract Detail Item ID e.g. `1001`
    - `item_type`: string enum[contract_item, contract_detail_item, change_order_item] (required) - The type of the item your are updating. Required if you are updating a line item. e.g. `contract_detail_item`
    - `work_completed_this_period`: string - The amount of work completed this period e.g. `1000`
    - `materials_presently_stored`: string - The amount of materials presently stored. Only considered when neither new_materials nor stored_materials are in the input. Ingored for unit based line items. e.g. `500`
    - `materials_presently_stored_from_previous_progress`: string - The amount of materials presently stored from the previous progress e.g. `250`
    - `new_materials`: string - New materials amount, ignored for unit base line items. e.g. `30`
    - `new_materials_quantity`: string - Quantity of new materials added. Only applicable to unit based line items. e.g. `30.1234`
    - `stored_materials`: string - Previously stored materials amount, ignored for unit base line items. e.g. `50`
    - `stored_materials_quantity`: number(float)
    - `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period (admin user only, work_completed_this_period should be non-zero to hold a retainage) e.g. `100`
    - `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained (Admin user, amount accounting only, materials_presently_stored should be non-zero to hold a retainage. Ignored unless "Materials presently stored" is manually mana... e.g. `50`
    - `work_completed_retainage_released_this_period`: string - The amount of work completed retainage released this period e.g. `0`
    - `work_completed_this_period_quantity`: string - Work completed this period quantity (unit accounting contract only) e.g. `10`
    - `work_completed_retainage_percent_this_period`: string - Work completed percentage for this period (this field is only persisted if work_completed_this_period is zero or nil) e.g. `10`
    - `materials_stored_retainage_percent_this_period`: string - Materials retainage percentage for this period (This field is only persisted if materials_presently_stored is zero or nil. Ignored unless "Materials presently stored" is manually managed in your configuration.) e.g. `10`
    - `subcontractor_claimed_amount`: string - The total amount the subcontractor original claimed for this line e.g. `20.5`
    - `status`: string enum[approved, rejected, no_action] - Approval status of the invoice line item e.g. `rejected`
    - `comment`: string - Comment about the invoice line item e.g. `This work was not yet completed`
  - `period_id`: integer - Period ID e.g. `20093`
  - `requisition_start`: string(date) - Requisition (Subcontractor Invoice) start date e.g. `2013-10-01`
  - `requisition_end`: string(date) - Requisition (Subcontractor Invoice) end date e.g. `2013-10-31`
  - `billing_date`: string(date) - Billing date e.g. `2013-10-31`
  - `final`: boolean - true or false value indicating whether or not this is the final invoice e.g. `true`
  - `invoice_number`: string - Invoice number e.g. `ABC-1234`
  - `payment_date`: string(date) - Date requisition was paid e.g. `2013-11-15`
  - `origin_data`: string - Requisition (Subcontractor Invoice) third party data e.g. `XYZ-0012`
  - `origin_id`: string - Requisition (Subcontractor Invoice) third party ID e.g. `abc-123`
  - `status`: string enum[draft, under_review, revise_and_resubmit, approved, approved_as_noted, pending_owner_approval] - Status; admin can set any status, standard and billing recipient can set to under_review (submit) or draft (save) e.g. `under_review`
  - `submitted_at`: string(date) - Date requisition was submitted e.g. `2013-11-02`
  - `prostore_file_ids`: array of integer - An array of Prostore File IDs. The Prostore Files will be associated with the Requisition (Subcontractor Invoice) as attachments. e.g. `[42]`
  - `upload_ids`: array of string - An array of Upload UUIDs. The Uploads will be associated with the Requisition (Subcontractor Invoice) as attachments.
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 201 (application/json): object

- `id`: integer - ID e.g. `58820`
- `previous_requisition_id`: integer - ID for the previous requisition before this one on the same contract e.g. `58819`
- `project_id`: integer - Project ID e.g. `789`
- `billing_date`: string(date) - Billing date e.g. `2013-11-20`
- `created_at`: string(date-time) - Date req was created e.g. `2013-11-15T12:00:00Z`
- `updated_at`: string(date-time) - Date req was last updated e.g. `2013-11-15T12:00:00Z`
- `commitment_id`: integer - commitment ID e.g. `701973`
- `commitment_type`: string - Commitment Type e.g. `WorkOrderContract`
- `contract_name`: string - Contract Name e.g. `Contract SC-001`
- `deletable`: boolean - A boolean indicating whether or not the invoice can be deleted. e.g. `false`
- `final`: boolean - true or false value indicating whether or not this is the final invoice e.g. `true`
- `vendor_name`: string - Name of Vendor for Invoice e.g. `Ernie's Electrical`
- `vendor_id`: integer - ID of Vendor for Invoice e.g. `8881212`
- `invoice_number`: string - Invoice number e.g. `123`
- `invoice_type`: string enum[progress, retainage_release, progress_and_retainage_release] - Invoice type (present in all views) e.g. `progress_and_retainage_release`
- `contract_invoicing_method`: string enum[progressive, simplified] - The invoicing method for the contract, either progressive or simplified e.g. `progressive`
- `origin_data`: string - Requisition (Subcontractor Invoice) third party data e.g. `XYZ-0012`
- `origin_id`: string - Requisition (Subcontractor Invoice) third party ID e.g. `abc-123`
- `payment_date`: string(date) - Date requisition was paid e.g. `2013-11-15`
- `percent_complete`: string - Percent complete e.g. `0`
- `period_id`: integer - Period ID e.g. `4293`
- `requisition_start`: string(date) - Requisition (Subcontractor Invoice) start date e.g. `2013-11-01`
- `requisition_end`: string(date) - Requisition (Subcontractor Invoice) end date e.g. `2013-11-02`
- `status`: string enum[draft, under_review, revise_and_resubmit, approved, approved_as_noted, pending_owner_approval] - Status e.g. `approved`
- `erp_status`: string - Current ERP status of Requisition e.g. `synced`
- `number`: integer - Requisition (Subcontractor Invoice) number e.g. `1`
- `submitted_at`: string(date) - Date requisition was submitted e.g. `2013-11-02`
- `total_claimed_amount`: string - Total Claimed Amount for the Invoice e.g. `100.00`
- `electronic_signature_id`: integer - Electronic Signature ID e.g. `701973`
- `move_materials_to_previous_work_completed`: boolean - A boolean indicating if should move materials to previous work completed. e.g. `false`
- `summary_text`: object - Requisition (Subcontractor Invoice) summary text. Included when the view query param is 'extended' or 'header_only' AND the contract's invoicing method is 'progressive'. Omitted for 'simplified' contracts regardless o...
  - `project_name`: string - Name of the project e.g. `Project`
  - `project_number`: string - Number of the project e.g. `100`
  - `to_general_contractor`: string - Name of the company the requisition is for e.g. `Company A`
  - `requisition_period_start`: string(date) - Requisition period start date e.g. `2010-01-01`
  - `requisition_period_end`: string(date) - Requisition period end date e.g. `2010-01-01`
  - `subcontractor_name`: string - Name of the company the requisition is from e.g. `Company B`
  - `subcontractor_street`: string - Street address of the company the requisition is from e.g. `101 XYZ Avenue`
  - `subcontractor_city`: string - City of the company the requisition is from e.g. `New York`
  - `subcontractor_state_code`: string - State code of the company the requisition is from e.g. `NY`
  - `subcontractor_zip`: string - Zip code of the company the requisition is from e.g. `10101`
  - `subcontractor_country_code`: string - Country code of the company the requisition is from e.g. `US`
  - `application_number`: string - Invoice number e.g. `1`
  - `contract_for`: string - The contract title e.g. `Ceiling Tiles`
  - `contract_date`: string(date) - Date the signed contract is received e.g. `2010-01-01`
- `summary`: object - Requisition (Subcontractor Invoice) summary
  - `balance_to_finish_including_retainage`: string - Balance to finish including retainage e.g. `1268346.55`
  - `completed_work_retainage_percent`: string - Completed work retainage percent e.g. `10`
  - `completed_work_retainage_amount`: string - Completed work retainage amount e.g. `1201.0`
  - `contract_sum_to_date`: string - Contract sum to date e.g. `1279159.15`
  - `current_payment_due`: string - Current payment due e.g. `10812.6`
  - `formatted_period`: string - Formatted billing period e.g. `01/06/19 - 30/06/19`
  - `less_previous_certificates_for_payment`: string - Less previous certificates for payment e.g. `0`
  - `negative_change_order_item_total`: string - Negative change order item total e.g. `0`
  - `negative_new_change_order_item_total`: string - Negative new change order item total e.g. `0`
  - `negative_previous_change_order_item_total`: string - Negative previous change order item total e.g. `0`
  - `net_change_by_change_orders`: string - Net change by change orders e.g. `256706.65`
  - `original_contract_sum`: string - Original contract sum e.g. `1022452.5`
  - `positive_change_order_item_total`: string - Positive change order item total e.g. `0.00`
  - `positive_new_change_order_item_total`: string - Positive new change order item total e.g. `0.00`
  - `positive_previous_change_order_item_total`: string - Positive previous change order item total e.g. `0.00`
  - `stored_materials_retainage_amount`: string - Stored materials retainage amount e.g. `0.4`
  - `stored_materials_retainage_percent`: string - Stored materials retainage percent e.g. `10`
  - `tax_applicable_to_this_payment`: string - Tax applicable to this payment e.g. `0`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date e.g. `1201.4`
  - `total_earned_less_retainage`: string - Total earned less retainage e.g. `10812.6`
  - `total_retainage`: string - Total retainage e.g. `1201.4`
  - `new_materials`: string - Amount of new materials added this period e.g. `1975.31`
  - `new_materials_quantity`: string - Quantity of new materials added this period, only for unit based line items e.g. `98.7654`
  - `stored_materials`: string - Amount of materials presently stored less the new materials added this period e.g. `716.05`
  - `stored_materials_quantity`: string - Quantity of materials presently stored less the new materials added this period e.g. `35.80249`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
- `subtiers_certified_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
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
- `currency_configuration`: object - Requisition (Subcontractor Invoice) Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
  - `currency_exchange_rate`: number(float) - The exchange rate between the invoice currency and the project currency e.g. `1.8`
  - `base_currency_iso_code`: string - Project or Company ISO Code e.g. `EUR`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string - Content Type e.g. `image/jpeg`
- `action_policy`: object
  - `controls`: object - Map of action names to their permission descriptors.
- `tax_summary`: array of object - Aggregated tax summary for the requisition, grouped by tax code. Included only when the view query param is 'extended' or 'header_only'.
  - `tax_code_id`: integer - Tax code id e.g. `163215`
  - `tax_code_name`: string - Tax code name e.g. `HST`
  - `tax_code_rate`: number - Tax code rate e.g. `0.15`
  - `applied_amount`: number - Total applied amount for all line items with this tax code e.g. `54321`
- `accounting_method`: string enum[amount, unit] - Accounting method of the requisition's contract. Included only when the view query param is 'extended' or 'header_only'. e.g. `amount`
- `items`: array of object - Requisition items. Included only when the views query param includes 'extended' or 'items'.
  - `id`: integer - ID of the Contract Item or Contract Detail Item or Change Order Item or Whole Change Order Item e.g. `341256`
  - `item_type`: string - Item Type - (contract_item, contract_detail_item, change_order_item, whole_change_order_item) e.g. `contract_detail_item`
  - `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
  - `cost_code_id`: integer - Cost Code ID e.g. `21585118`
  - `currency_configuration`: object - Requisition (Subcontractor Invoice) Currency Configuration
    - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
    - `currency_exchange_rate`: number(float) - The exchange rate between the invoice currency and the project currency e.g. `1.8`
    - `base_currency_iso_code`: string - Project or Company ISO Code e.g. `EUR`
  - `line_item_id`: integer - Line Item ID e.g. `3129856`
  - `description_of_work`: string e.g. `Install windows`
  - `net_amount`: string - Net amount of line item e.g. `100.00`
  - `gross_amount`: string - Gross amount of line item e.g. `200.00`
  - `wbs_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `44`
    - `flat_code`: string - wbs code flat code e.g. `2.E`
    - `description`: string - wbs code description e.g. `Earthwork.Equipment`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `scheduled_value`: string - Scheduled value amount e.g. `1.00`
  - `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
  - `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
  - `materials_presently_stored`: string - Amount of materials presently stored e.g. `2691.36`
  - `materials_presently_stored_quantity`: string - Quantity of the Materials presently stored, only for unit based line items e.g. `134.56789`
  - `materials_presently_stored_from_previous_progress`: string - Materials presently stored from previous progress e.g. `0.00`
  - `materials_previously_stored_quantity`: string - Quantity of the Materials stored from the previous invoice, only for unit based line items e.g. `12.3456`
  - `materials_moved`: string - Materials automatically moved from previous line item into previous work completed. This will be non-zero only if move_materials_to_previous_work_completed is true on the payment application. e.g. `0.00`
  - `materials_retainage_retained_moved`: string - Retainage on materials automatically moved from previous line item into work completed retainage amount accrued previously. This will be non-zero only if move_materials_to_previous_work_completed is true on the paymen... e.g. `0.00`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
  - `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
  - `total_completed_and_stored_to_date_from_previous`: string - Total completed and stored to date from previous e.g. `100.00`
  - `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
  - `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
  - `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
  - `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained e.g. `0.0`
  - `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period, present e.g. `10.0`
  - `materials_stored_retainage_new_materials`: string - Materials stored retainage from new materials, present e.g. `10.0`
  - `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
  - `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period e.g. `0.0`
  - `scheduled_quantity`: string - Scheduled quantity e.g. `0.0`
  - `scheduled_unit_price`: string - Scheduled unit price e.g. `20.0`
  - `work_completed_this_period_quantity`: string - Work completed this period quantity e.g. `0.0`
  - `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity e.g. `0.0`
  - `comment`: string - Comment e.g. `Installation charges`
  - `status`: string - Status e.g. `no_action`
  - `position`: integer - Position of this item e.g. `1`
  - `line_number`: string - Line Number for the item e.g. `1.1`
  - `ssr_manual_override`: boolean - SSR Manual Override e.g. `false`
  - `subcontractor_claimed_amount`: string - Amount claimed by the subcontractor e.g. `0.0`
  - `previous_progress_id`: integer - ID of the previous progress for the item e.g. `55463`
  - `taxes`: array of object - Tax code information associated with the item
    - `tax_code_id`: integer - ID of the tax code e.g. `1`
    - `tax_code_name`: string - Code of the tax code e.g. `VAT`
    - `tax_code_rate`: number(float) - Rate of the tax code e.g. `0.1`
  - `uom`: string - Unit of measure for this line item e.g. `m²`
- `item_packages`: array of object - Requisition item packages. An item package can have either a contract or change order as its parent entity. Included only when the views query param includes 'extended' or 'items'.
  - `id`: integer - ID of the item package e.g. `341256`
  - `contract_id`: integer - ID of the contract associated with the item package e.g. `341256`
  - `change_order_id`: integer - ID of the change order associated with the item package e.g. `341256`
  - `number`: string - number associated with the item package's parent entity e.g. `1`
  - `title`: string - title associated with the item package's parent entity e.g. `Contract Title`
  - `status`: string - status associated with the item package's parent entity e.g. `Approved`
  - `position`: integer - position associated with the item package's parent entity e.g. `1`
  - `change_order_acronym_number`: string - acronym for the change order object associated with the item package. Null if the item package's parent entity is a contract. e.g. `PCO #003`
  - `change_order_request`: object - The change order request an item package is associated with. Only returned on three tier projects.
    - `id`: integer - ID of the change order request associated with the item package e.g. `341256`
    - `title`: string - title of the change order request associated with the item package e.g. `COR Title`
    - `change_order_acronym_number`: string - acronym and number for the change order request associated with the item package e.g. `COR #003`
  - `batch`: object - The change order batch an item package is associated with. Only returned on multi tier projects.
    - `id`: integer - ID of the change order batch associated with the item package e.g. `341256`
    - `title`: string - title of the change order batch associated with the item package e.g. `COR Title`
    - `change_order_acronym_number`: string - acronym and number for the change order batch associated with the item package e.g. `CCO #003`

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/requisitions/{id}

**Show Requisition (Subcontractor Invoice)**
Return a Requisition (Subcontractor Invoice) on a specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Requisition (Subcontractor Invoice) ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `view` [query] string enum[default, extended, items, action_policy, header_only] - Specifies which view (which attributes) of the resource is going to be present in the response. The `header_only` view is intended for split header / line-items rendering on the Subcontractor Invoicing UI: it returns ...

Response 200 (application/json): object

- `id`: integer - ID e.g. `58820`
- `previous_requisition_id`: integer - ID for the previous requisition before this one on the same contract e.g. `58819`
- `project_id`: integer - Project ID e.g. `789`
- `billing_date`: string(date) - Billing date e.g. `2013-11-20`
- `created_at`: string(date-time) - Date req was created e.g. `2013-11-15T12:00:00Z`
- `updated_at`: string(date-time) - Date req was last updated e.g. `2013-11-15T12:00:00Z`
- `commitment_id`: integer - commitment ID e.g. `701973`
- `commitment_type`: string - Commitment Type e.g. `WorkOrderContract`
- `contract_name`: string - Contract Name e.g. `Contract SC-001`
- `deletable`: boolean - A boolean indicating whether or not the invoice can be deleted. e.g. `false`
- `final`: boolean - true or false value indicating whether or not this is the final invoice e.g. `true`
- `vendor_name`: string - Name of Vendor for Invoice e.g. `Ernie's Electrical`
- `vendor_id`: integer - ID of Vendor for Invoice e.g. `8881212`
- `invoice_number`: string - Invoice number e.g. `123`
- `invoice_type`: string enum[progress, retainage_release, progress_and_retainage_release] - Invoice type (present in all views) e.g. `progress_and_retainage_release`
- `contract_invoicing_method`: string enum[progressive, simplified] - The invoicing method for the contract, either progressive or simplified e.g. `progressive`
- `origin_data`: string - Requisition (Subcontractor Invoice) third party data e.g. `XYZ-0012`
- `origin_id`: string - Requisition (Subcontractor Invoice) third party ID e.g. `abc-123`
- `payment_date`: string(date) - Date requisition was paid e.g. `2013-11-15`
- `percent_complete`: string - Percent complete e.g. `0`
- `period_id`: integer - Period ID e.g. `4293`
- `requisition_start`: string(date) - Requisition (Subcontractor Invoice) start date e.g. `2013-11-01`
- `requisition_end`: string(date) - Requisition (Subcontractor Invoice) end date e.g. `2013-11-02`
- `status`: string enum[draft, under_review, revise_and_resubmit, approved, approved_as_noted, pending_owner_approval] - Status e.g. `approved`
- `erp_status`: string - Current ERP status of Requisition e.g. `synced`
- `number`: integer - Requisition (Subcontractor Invoice) number e.g. `1`
- `submitted_at`: string(date) - Date requisition was submitted e.g. `2013-11-02`
- `total_claimed_amount`: string - Total Claimed Amount for the Invoice e.g. `100.00`
- `electronic_signature_id`: integer - Electronic Signature ID e.g. `701973`
- `move_materials_to_previous_work_completed`: boolean - A boolean indicating if should move materials to previous work completed. e.g. `false`
- `summary_text`: object - Requisition (Subcontractor Invoice) summary text. Included when the view query param is 'extended' or 'header_only' AND the contract's invoicing method is 'progressive'. Omitted for 'simplified' contracts regardless o...
  - `project_name`: string - Name of the project e.g. `Project`
  - `project_number`: string - Number of the project e.g. `100`
  - `to_general_contractor`: string - Name of the company the requisition is for e.g. `Company A`
  - `requisition_period_start`: string(date) - Requisition period start date e.g. `2010-01-01`
  - `requisition_period_end`: string(date) - Requisition period end date e.g. `2010-01-01`
  - `subcontractor_name`: string - Name of the company the requisition is from e.g. `Company B`
  - `subcontractor_street`: string - Street address of the company the requisition is from e.g. `101 XYZ Avenue`
  - `subcontractor_city`: string - City of the company the requisition is from e.g. `New York`
  - `subcontractor_state_code`: string - State code of the company the requisition is from e.g. `NY`
  - `subcontractor_zip`: string - Zip code of the company the requisition is from e.g. `10101`
  - `subcontractor_country_code`: string - Country code of the company the requisition is from e.g. `US`
  - `application_number`: string - Invoice number e.g. `1`
  - `contract_for`: string - The contract title e.g. `Ceiling Tiles`
  - `contract_date`: string(date) - Date the signed contract is received e.g. `2010-01-01`
- `summary`: object - Requisition (Subcontractor Invoice) summary
  - `balance_to_finish_including_retainage`: string - Balance to finish including retainage e.g. `1268346.55`
  - `completed_work_retainage_percent`: string - Completed work retainage percent e.g. `10`
  - `completed_work_retainage_amount`: string - Completed work retainage amount e.g. `1201.0`
  - `contract_sum_to_date`: string - Contract sum to date e.g. `1279159.15`
  - `current_payment_due`: string - Current payment due e.g. `10812.6`
  - `formatted_period`: string - Formatted billing period e.g. `01/06/19 - 30/06/19`
  - `less_previous_certificates_for_payment`: string - Less previous certificates for payment e.g. `0`
  - `negative_change_order_item_total`: string - Negative change order item total e.g. `0`
  - `negative_new_change_order_item_total`: string - Negative new change order item total e.g. `0`
  - `negative_previous_change_order_item_total`: string - Negative previous change order item total e.g. `0`
  - `net_change_by_change_orders`: string - Net change by change orders e.g. `256706.65`
  - `original_contract_sum`: string - Original contract sum e.g. `1022452.5`
  - `positive_change_order_item_total`: string - Positive change order item total e.g. `0.00`
  - `positive_new_change_order_item_total`: string - Positive new change order item total e.g. `0.00`
  - `positive_previous_change_order_item_total`: string - Positive previous change order item total e.g. `0.00`
  - `stored_materials_retainage_amount`: string - Stored materials retainage amount e.g. `0.4`
  - `stored_materials_retainage_percent`: string - Stored materials retainage percent e.g. `10`
  - `tax_applicable_to_this_payment`: string - Tax applicable to this payment e.g. `0`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date e.g. `1201.4`
  - `total_earned_less_retainage`: string - Total earned less retainage e.g. `10812.6`
  - `total_retainage`: string - Total retainage e.g. `1201.4`
  - `new_materials`: string - Amount of new materials added this period e.g. `1975.31`
  - `new_materials_quantity`: string - Quantity of new materials added this period, only for unit based line items e.g. `98.7654`
  - `stored_materials`: string - Amount of materials presently stored less the new materials added this period e.g. `716.05`
  - `stored_materials_quantity`: string - Quantity of materials presently stored less the new materials added this period e.g. `35.80249`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
- `subtiers_certified_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
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
- `currency_configuration`: object - Requisition (Subcontractor Invoice) Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
  - `currency_exchange_rate`: number(float) - The exchange rate between the invoice currency and the project currency e.g. `1.8`
  - `base_currency_iso_code`: string - Project or Company ISO Code e.g. `EUR`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string - Content Type e.g. `image/jpeg`
- `action_policy`: object
  - `controls`: object - Map of action names to their permission descriptors.
- `tax_summary`: array of object - Aggregated tax summary for the requisition, grouped by tax code. Included only when the view query param is 'extended' or 'header_only'.
  - `tax_code_id`: integer - Tax code id e.g. `163215`
  - `tax_code_name`: string - Tax code name e.g. `HST`
  - `tax_code_rate`: number - Tax code rate e.g. `0.15`
  - `applied_amount`: number - Total applied amount for all line items with this tax code e.g. `54321`
- `accounting_method`: string enum[amount, unit] - Accounting method of the requisition's contract. Included only when the view query param is 'extended' or 'header_only'. e.g. `amount`
- `items`: array of object - Requisition items. Included only when the views query param includes 'extended' or 'items'.
  - `id`: integer - ID of the Contract Item or Contract Detail Item or Change Order Item or Whole Change Order Item e.g. `341256`
  - `item_type`: string - Item Type - (contract_item, contract_detail_item, change_order_item, whole_change_order_item) e.g. `contract_detail_item`
  - `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
  - `cost_code_id`: integer - Cost Code ID e.g. `21585118`
  - `currency_configuration`: object - Requisition (Subcontractor Invoice) Currency Configuration
    - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
    - `currency_exchange_rate`: number(float) - The exchange rate between the invoice currency and the project currency e.g. `1.8`
    - `base_currency_iso_code`: string - Project or Company ISO Code e.g. `EUR`
  - `line_item_id`: integer - Line Item ID e.g. `3129856`
  - `description_of_work`: string e.g. `Install windows`
  - `net_amount`: string - Net amount of line item e.g. `100.00`
  - `gross_amount`: string - Gross amount of line item e.g. `200.00`
  - `wbs_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `44`
    - `flat_code`: string - wbs code flat code e.g. `2.E`
    - `description`: string - wbs code description e.g. `Earthwork.Equipment`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `scheduled_value`: string - Scheduled value amount e.g. `1.00`
  - `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
  - `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
  - `materials_presently_stored`: string - Amount of materials presently stored e.g. `2691.36`
  - `materials_presently_stored_quantity`: string - Quantity of the Materials presently stored, only for unit based line items e.g. `134.56789`
  - `materials_presently_stored_from_previous_progress`: string - Materials presently stored from previous progress e.g. `0.00`
  - `materials_previously_stored_quantity`: string - Quantity of the Materials stored from the previous invoice, only for unit based line items e.g. `12.3456`
  - `materials_moved`: string - Materials automatically moved from previous line item into previous work completed. This will be non-zero only if move_materials_to_previous_work_completed is true on the payment application. e.g. `0.00`
  - `materials_retainage_retained_moved`: string - Retainage on materials automatically moved from previous line item into work completed retainage amount accrued previously. This will be non-zero only if move_materials_to_previous_work_completed is true on the paymen... e.g. `0.00`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
  - `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
  - `total_completed_and_stored_to_date_from_previous`: string - Total completed and stored to date from previous e.g. `100.00`
  - `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
  - `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
  - `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
  - `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained e.g. `0.0`
  - `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period, present e.g. `10.0`
  - `materials_stored_retainage_new_materials`: string - Materials stored retainage from new materials, present e.g. `10.0`
  - `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
  - `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period e.g. `0.0`
  - `scheduled_quantity`: string - Scheduled quantity e.g. `0.0`
  - `scheduled_unit_price`: string - Scheduled unit price e.g. `20.0`
  - `work_completed_this_period_quantity`: string - Work completed this period quantity e.g. `0.0`
  - `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity e.g. `0.0`
  - `comment`: string - Comment e.g. `Installation charges`
  - `status`: string - Status e.g. `no_action`
  - `position`: integer - Position of this item e.g. `1`
  - `line_number`: string - Line Number for the item e.g. `1.1`
  - `ssr_manual_override`: boolean - SSR Manual Override e.g. `false`
  - `subcontractor_claimed_amount`: string - Amount claimed by the subcontractor e.g. `0.0`
  - `previous_progress_id`: integer - ID of the previous progress for the item e.g. `55463`
  - `taxes`: array of object - Tax code information associated with the item
    - `tax_code_id`: integer - ID of the tax code e.g. `1`
    - `tax_code_name`: string - Code of the tax code e.g. `VAT`
    - `tax_code_rate`: number(float) - Rate of the tax code e.g. `0.1`
  - `uom`: string - Unit of measure for this line item e.g. `m²`
- `item_packages`: array of object - Requisition item packages. An item package can have either a contract or change order as its parent entity. Included only when the views query param includes 'extended' or 'items'.
  - `id`: integer - ID of the item package e.g. `341256`
  - `contract_id`: integer - ID of the contract associated with the item package e.g. `341256`
  - `change_order_id`: integer - ID of the change order associated with the item package e.g. `341256`
  - `number`: string - number associated with the item package's parent entity e.g. `1`
  - `title`: string - title associated with the item package's parent entity e.g. `Contract Title`
  - `status`: string - status associated with the item package's parent entity e.g. `Approved`
  - `position`: integer - position associated with the item package's parent entity e.g. `1`
  - `change_order_acronym_number`: string - acronym for the change order object associated with the item package. Null if the item package's parent entity is a contract. e.g. `PCO #003`
  - `change_order_request`: object - The change order request an item package is associated with. Only returned on three tier projects.
    - `id`: integer - ID of the change order request associated with the item package e.g. `341256`
    - `title`: string - title of the change order request associated with the item package e.g. `COR Title`
    - `change_order_acronym_number`: string - acronym and number for the change order request associated with the item package e.g. `COR #003`
  - `batch`: object - The change order batch an item package is associated with. Only returned on multi tier projects.
    - `id`: integer - ID of the change order batch associated with the item package e.g. `341256`
    - `title`: string - title of the change order batch associated with the item package e.g. `COR Title`
    - `change_order_acronym_number`: string - acronym and number for the change order batch associated with the item package e.g. `CCO #003`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/requisitions/{id}

**Update Requisition (Subcontractor Invoice)**
Update a specified Requisition (Subcontractor Invoice). Users without admin permissions can only update a requisition (sub invoice) if it is the most recent and has a status of 'draft' or 'revise_and_resubmit'. Users with admin permissions can update a requisition (sub invoice) regardless of its status or whether it is the most recent. Requisition items are optional.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Requisition (Subcontractor Invoice) ID
- `view` [query] string enum[default, extended, items, action_policy, header_only] - Specifies which view (which attributes) of the resource is going to be present in the response. The `header_only` view is intended for split header / line-items rendering on the Subcontractor Invoicing UI: it returns ...

Request body (application/json) (required):

- `project_id`: integer (required) - Project ID e.g. `55001`
- `commitment_id`: integer (required) - Commitment ID e.g. `66005`
- `requisition`: object - Requisition (Subcontractor Invoice)
  - `items`: array of object
    - `id`: integer (required) - The id of a requisition line item e.g. `1001`
    - `line_item_id`: integer - The line item id of a contract line item e.g. `1001`
    - `detail_line_item_id`: integer - Contract Detail Item ID e.g. `1001`
    - `item_type`: string enum[contract_item, contract_detail_item, change_order_item] (required) - The type of the item your are updating. Required if you are updating a line item. e.g. `contract_detail_item`
    - `work_completed_this_period`: string - The amount of work completed this period e.g. `1000`
    - `materials_presently_stored`: string - The amount of materials presently stored. Only considered when neither new_materials nor stored_materials are in the input. Ingored for unit based line items. e.g. `500`
    - `materials_presently_stored_from_previous_progress`: string - The amount of materials presently stored from the previous progress e.g. `250`
    - `new_materials`: string - New materials amount e.g. `30`
    - `new_materials_quantity`: string - Quantity of new materials added. Only applicable to unit based line items. e.g. `30.1234`
    - `stored_materials`: string - Previously stored materials amount, ignored for unit base line items. e.g. `0.00`
    - `stored_materials_quantity`: number(float) - Quantity of previously stored materials. Only applicable for unit based line items. e.g. `50.456`
    - `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period (admin user only, work_completed_this_period should be non-zero to hold a retainage). If both this field and work_completed_retainage_percent_this_period are sent, ... e.g. `100`
    - `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained (admin user, amount accounting only, materials_presently_stored should be non-zero to hold a retainage). If both this field and materials_stored_retainage_percent_t... e.g. `50`
    - `work_completed_retainage_released_this_period`: string - The amount of work completed retainage released this period e.g. `0`
    - `work_completed_this_period_quantity`: string - Work completed this period quantity (unit accounting contract only) e.g. `10`
    - `work_completed_retainage_percent_this_period`: string - Work completed retainage percent for this period. When provided without work_completed_retainage_retained_this_period, this field is only persisted if work_completed_this_period is zero. In that case, the explicit per... e.g. `10`
    - `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent for this period. When provided without materials_stored_retainage_currently_retained, this field is only persisted if materials_presently_stored is zero. In that case, the explicit p... e.g. `10`
    - `subcontractor_claimed_amount`: string - The total amount the subcontractor original claimed for this line e.g. `20.5`
    - `status`: string enum[approved, rejected, no_action] - Approval status of the invoice line item e.g. `rejected`
    - `comment`: string - Comment about the invoice line item e.g. `This work was not yet completed`
  - `period_id`: integer - Period ID e.g. `20093`
  - `requisition_start`: string(date) - Requisition (Subcontractor Invoice) start date e.g. `2013-10-01`
  - `requisition_end`: string(date) - Requisition (Subcontractor Invoice) end date e.g. `2013-10-31`
  - `billing_date`: string(date) - Billing date e.g. `2013-10-31`
  - `final`: boolean - true or false value indicating whether or not this is the final invoice e.g. `true`
  - `invoice_number`: string - Invoice number e.g. `ABC-1234`
  - `payment_date`: string(date) - Date requisition was paid e.g. `2013-11-15`
  - `origin_data`: string - Requisition (Subcontractor Invoice) third party data e.g. `XYZ-0012`
  - `origin_id`: string - Requisition (Subcontractor Invoice) third party ID e.g. `abc-123`
  - `status`: string enum[draft, under_review, revise_and_resubmit, approved, approved_as_noted, pending_owner_approval] - Status; admin can set any status, standard and billing recipient can set to under_review (submit) or draft (save) e.g. `under_review`
  - `submitted_at`: string(date) - Date requisition was submitted e.g. `2013-11-02`
  - `prostore_file_ids`: array of integer - An array of Prostore File IDs. The Prostore Files will be associated with the Requisition (Subcontractor Invoice) as attachments. e.g. `[42]`
  - `upload_ids`: array of string - An array of Upload UUIDs. The Uploads will be associated with the Requisition (Subcontractor Invoice) as attachments.
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `id`: integer - ID e.g. `58820`
- `previous_requisition_id`: integer - ID for the previous requisition before this one on the same contract e.g. `58819`
- `project_id`: integer - Project ID e.g. `789`
- `billing_date`: string(date) - Billing date e.g. `2013-11-20`
- `created_at`: string(date-time) - Date req was created e.g. `2013-11-15T12:00:00Z`
- `updated_at`: string(date-time) - Date req was last updated e.g. `2013-11-15T12:00:00Z`
- `commitment_id`: integer - commitment ID e.g. `701973`
- `commitment_type`: string - Commitment Type e.g. `WorkOrderContract`
- `contract_name`: string - Contract Name e.g. `Contract SC-001`
- `deletable`: boolean - A boolean indicating whether or not the invoice can be deleted. e.g. `false`
- `final`: boolean - true or false value indicating whether or not this is the final invoice e.g. `true`
- `vendor_name`: string - Name of Vendor for Invoice e.g. `Ernie's Electrical`
- `vendor_id`: integer - ID of Vendor for Invoice e.g. `8881212`
- `invoice_number`: string - Invoice number e.g. `123`
- `invoice_type`: string enum[progress, retainage_release, progress_and_retainage_release] - Invoice type (present in all views) e.g. `progress_and_retainage_release`
- `contract_invoicing_method`: string enum[progressive, simplified] - The invoicing method for the contract, either progressive or simplified e.g. `progressive`
- `origin_data`: string - Requisition (Subcontractor Invoice) third party data e.g. `XYZ-0012`
- `origin_id`: string - Requisition (Subcontractor Invoice) third party ID e.g. `abc-123`
- `payment_date`: string(date) - Date requisition was paid e.g. `2013-11-15`
- `percent_complete`: string - Percent complete e.g. `0`
- `period_id`: integer - Period ID e.g. `4293`
- `requisition_start`: string(date) - Requisition (Subcontractor Invoice) start date e.g. `2013-11-01`
- `requisition_end`: string(date) - Requisition (Subcontractor Invoice) end date e.g. `2013-11-02`
- `status`: string enum[draft, under_review, revise_and_resubmit, approved, approved_as_noted, pending_owner_approval] - Status e.g. `approved`
- `erp_status`: string - Current ERP status of Requisition e.g. `synced`
- `number`: integer - Requisition (Subcontractor Invoice) number e.g. `1`
- `submitted_at`: string(date) - Date requisition was submitted e.g. `2013-11-02`
- `total_claimed_amount`: string - Total Claimed Amount for the Invoice e.g. `100.00`
- `electronic_signature_id`: integer - Electronic Signature ID e.g. `701973`
- `move_materials_to_previous_work_completed`: boolean - A boolean indicating if should move materials to previous work completed. e.g. `false`
- `summary_text`: object - Requisition (Subcontractor Invoice) summary text. Included when the view query param is 'extended' or 'header_only' AND the contract's invoicing method is 'progressive'. Omitted for 'simplified' contracts regardless o...
  - `project_name`: string - Name of the project e.g. `Project`
  - `project_number`: string - Number of the project e.g. `100`
  - `to_general_contractor`: string - Name of the company the requisition is for e.g. `Company A`
  - `requisition_period_start`: string(date) - Requisition period start date e.g. `2010-01-01`
  - `requisition_period_end`: string(date) - Requisition period end date e.g. `2010-01-01`
  - `subcontractor_name`: string - Name of the company the requisition is from e.g. `Company B`
  - `subcontractor_street`: string - Street address of the company the requisition is from e.g. `101 XYZ Avenue`
  - `subcontractor_city`: string - City of the company the requisition is from e.g. `New York`
  - `subcontractor_state_code`: string - State code of the company the requisition is from e.g. `NY`
  - `subcontractor_zip`: string - Zip code of the company the requisition is from e.g. `10101`
  - `subcontractor_country_code`: string - Country code of the company the requisition is from e.g. `US`
  - `application_number`: string - Invoice number e.g. `1`
  - `contract_for`: string - The contract title e.g. `Ceiling Tiles`
  - `contract_date`: string(date) - Date the signed contract is received e.g. `2010-01-01`
- `summary`: object - Requisition (Subcontractor Invoice) summary
  - `balance_to_finish_including_retainage`: string - Balance to finish including retainage e.g. `1268346.55`
  - `completed_work_retainage_percent`: string - Completed work retainage percent e.g. `10`
  - `completed_work_retainage_amount`: string - Completed work retainage amount e.g. `1201.0`
  - `contract_sum_to_date`: string - Contract sum to date e.g. `1279159.15`
  - `current_payment_due`: string - Current payment due e.g. `10812.6`
  - `formatted_period`: string - Formatted billing period e.g. `01/06/19 - 30/06/19`
  - `less_previous_certificates_for_payment`: string - Less previous certificates for payment e.g. `0`
  - `negative_change_order_item_total`: string - Negative change order item total e.g. `0`
  - `negative_new_change_order_item_total`: string - Negative new change order item total e.g. `0`
  - `negative_previous_change_order_item_total`: string - Negative previous change order item total e.g. `0`
  - `net_change_by_change_orders`: string - Net change by change orders e.g. `256706.65`
  - `original_contract_sum`: string - Original contract sum e.g. `1022452.5`
  - `positive_change_order_item_total`: string - Positive change order item total e.g. `0.00`
  - `positive_new_change_order_item_total`: string - Positive new change order item total e.g. `0.00`
  - `positive_previous_change_order_item_total`: string - Positive previous change order item total e.g. `0.00`
  - `stored_materials_retainage_amount`: string - Stored materials retainage amount e.g. `0.4`
  - `stored_materials_retainage_percent`: string - Stored materials retainage percent e.g. `10`
  - `tax_applicable_to_this_payment`: string - Tax applicable to this payment e.g. `0`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date e.g. `1201.4`
  - `total_earned_less_retainage`: string - Total earned less retainage e.g. `10812.6`
  - `total_retainage`: string - Total retainage e.g. `1201.4`
  - `new_materials`: string - Amount of new materials added this period e.g. `1975.31`
  - `new_materials_quantity`: string - Quantity of new materials added this period, only for unit based line items e.g. `98.7654`
  - `stored_materials`: string - Amount of materials presently stored less the new materials added this period e.g. `716.05`
  - `stored_materials_quantity`: string - Quantity of materials presently stored less the new materials added this period e.g. `35.80249`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
- `subtiers_certified_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
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
- `currency_configuration`: object - Requisition (Subcontractor Invoice) Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
  - `currency_exchange_rate`: number(float) - The exchange rate between the invoice currency and the project currency e.g. `1.8`
  - `base_currency_iso_code`: string - Project or Company ISO Code e.g. `EUR`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string - Content Type e.g. `image/jpeg`
- `action_policy`: object
  - `controls`: object - Map of action names to their permission descriptors.
- `tax_summary`: array of object - Aggregated tax summary for the requisition, grouped by tax code. Included only when the view query param is 'extended' or 'header_only'.
  - `tax_code_id`: integer - Tax code id e.g. `163215`
  - `tax_code_name`: string - Tax code name e.g. `HST`
  - `tax_code_rate`: number - Tax code rate e.g. `0.15`
  - `applied_amount`: number - Total applied amount for all line items with this tax code e.g. `54321`
- `accounting_method`: string enum[amount, unit] - Accounting method of the requisition's contract. Included only when the view query param is 'extended' or 'header_only'. e.g. `amount`
- `items`: array of object - Requisition items. Included only when the views query param includes 'extended' or 'items'.
  - `id`: integer - ID of the Contract Item or Contract Detail Item or Change Order Item or Whole Change Order Item e.g. `341256`
  - `item_type`: string - Item Type - (contract_item, contract_detail_item, change_order_item, whole_change_order_item) e.g. `contract_detail_item`
  - `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
  - `cost_code_id`: integer - Cost Code ID e.g. `21585118`
  - `currency_configuration`: object - Requisition (Subcontractor Invoice) Currency Configuration
    - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
    - `currency_exchange_rate`: number(float) - The exchange rate between the invoice currency and the project currency e.g. `1.8`
    - `base_currency_iso_code`: string - Project or Company ISO Code e.g. `EUR`
  - `line_item_id`: integer - Line Item ID e.g. `3129856`
  - `description_of_work`: string e.g. `Install windows`
  - `net_amount`: string - Net amount of line item e.g. `100.00`
  - `gross_amount`: string - Gross amount of line item e.g. `200.00`
  - `wbs_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `44`
    - `flat_code`: string - wbs code flat code e.g. `2.E`
    - `description`: string - wbs code description e.g. `Earthwork.Equipment`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `scheduled_value`: string - Scheduled value amount e.g. `1.00`
  - `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
  - `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
  - `materials_presently_stored`: string - Amount of materials presently stored e.g. `2691.36`
  - `materials_presently_stored_quantity`: string - Quantity of the Materials presently stored, only for unit based line items e.g. `134.56789`
  - `materials_presently_stored_from_previous_progress`: string - Materials presently stored from previous progress e.g. `0.00`
  - `materials_previously_stored_quantity`: string - Quantity of the Materials stored from the previous invoice, only for unit based line items e.g. `12.3456`
  - `materials_moved`: string - Materials automatically moved from previous line item into previous work completed. This will be non-zero only if move_materials_to_previous_work_completed is true on the payment application. e.g. `0.00`
  - `materials_retainage_retained_moved`: string - Retainage on materials automatically moved from previous line item into work completed retainage amount accrued previously. This will be non-zero only if move_materials_to_previous_work_completed is true on the paymen... e.g. `0.00`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
  - `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
  - `total_completed_and_stored_to_date_from_previous`: string - Total completed and stored to date from previous e.g. `100.00`
  - `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
  - `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
  - `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
  - `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained e.g. `0.0`
  - `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period, present e.g. `10.0`
  - `materials_stored_retainage_new_materials`: string - Materials stored retainage from new materials, present e.g. `10.0`
  - `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
  - `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period e.g. `0.0`
  - `scheduled_quantity`: string - Scheduled quantity e.g. `0.0`
  - `scheduled_unit_price`: string - Scheduled unit price e.g. `20.0`
  - `work_completed_this_period_quantity`: string - Work completed this period quantity e.g. `0.0`
  - `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity e.g. `0.0`
  - `comment`: string - Comment e.g. `Installation charges`
  - `status`: string - Status e.g. `no_action`
  - `position`: integer - Position of this item e.g. `1`
  - `line_number`: string - Line Number for the item e.g. `1.1`
  - `ssr_manual_override`: boolean - SSR Manual Override e.g. `false`
  - `subcontractor_claimed_amount`: string - Amount claimed by the subcontractor e.g. `0.0`
  - `previous_progress_id`: integer - ID of the previous progress for the item e.g. `55463`
  - `taxes`: array of object - Tax code information associated with the item
    - `tax_code_id`: integer - ID of the tax code e.g. `1`
    - `tax_code_name`: string - Code of the tax code e.g. `VAT`
    - `tax_code_rate`: number(float) - Rate of the tax code e.g. `0.1`
  - `uom`: string - Unit of measure for this line item e.g. `m²`
- `item_packages`: array of object - Requisition item packages. An item package can have either a contract or change order as its parent entity. Included only when the views query param includes 'extended' or 'items'.
  - `id`: integer - ID of the item package e.g. `341256`
  - `contract_id`: integer - ID of the contract associated with the item package e.g. `341256`
  - `change_order_id`: integer - ID of the change order associated with the item package e.g. `341256`
  - `number`: string - number associated with the item package's parent entity e.g. `1`
  - `title`: string - title associated with the item package's parent entity e.g. `Contract Title`
  - `status`: string - status associated with the item package's parent entity e.g. `Approved`
  - `position`: integer - position associated with the item package's parent entity e.g. `1`
  - `change_order_acronym_number`: string - acronym for the change order object associated with the item package. Null if the item package's parent entity is a contract. e.g. `PCO #003`
  - `change_order_request`: object - The change order request an item package is associated with. Only returned on three tier projects.
    - `id`: integer - ID of the change order request associated with the item package e.g. `341256`
    - `title`: string - title of the change order request associated with the item package e.g. `COR Title`
    - `change_order_acronym_number`: string - acronym and number for the change order request associated with the item package e.g. `COR #003`
  - `batch`: object - The change order batch an item package is associated with. Only returned on multi tier projects.
    - `id`: integer - ID of the change order batch associated with the item package e.g. `341256`
    - `title`: string - title of the change order batch associated with the item package e.g. `COR Title`
    - `change_order_acronym_number`: string - acronym and number for the change order batch associated with the item package e.g. `CCO #003`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.1/requisitions/{id}

**Delete Requisition (Subcontractor Invoice)**
Delete specified Requisition (Subcontractor Invoice)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Requisition (Subcontractor Invoice) ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/requisitions/{requisition_id}/add_change_order_package

**Add Change Order Package to a Requisition (Subcontractor Invoice)**
The Add Change Order Package endpoint allows for the addition of a Change Order Package to a Requisition (Subcontractor Invoice)
which will cause change_order_items to be added to the Requisition (Subcontractor Invoice)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `requisition_id` [path] integer (required) - Requisition (Subcontractor Invoice) ID
- `commitment_id` [query] integer (required) - Commitment ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `change_order_package_id` [query] integer (required) - Change Order Package ID

Response 201 (application/json): array of object

- `id`: integer - ID for Change Order Item e.g. `341256`
- `cost_code_id`: integer - Cost Code ID e.g. `21585118`
- `line_item_id`: integer - Line Item ID e.g. `3129856`
- `commitment_line_item_id`: integer - Commitment Line Item ID e.g. `3129856`
- `commitment_line_item_origin_id`: string - Commitment Line Item Origin ID e.g. `abc-123`
- `description_of_work`: string - Description of work e.g. `Install windows`
- `scheduled_value`: string - Scheduled value amount e.g. `1.00`
- `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
- `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
- `materials_presently_stored`: string - Materials presently stored amount. Only present when using amount based accounting. e.g. `0.00`
- `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
- `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
- `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
- `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
- `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
- `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained. Only present when using amount based accounting. e.g. `0.0`
- `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period. Only present when using amount based accounting. e.g. `10.0`
- `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
- `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period. Only present when using amount based accounting. e.g. `0.0`
- `scheduled_quantity`: string - Scheduled quantity. Only present when using unit based accounting. e.g. `0.0`
- `scheduled_unit_price`: string - Scheduled unit price. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_this_period_quantity`: string - Work completed this period quantity. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity. Only present when using unit based accounting. e.g. `0.0`
- `change_order_package_id`: integer - ID for Change Order Package e.g. `12345`
- `subcontractor_claimed_amount`: string - Amount claimed by the subcontractor e.g. `0.0`
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
- `position`: integer - Position e.g. `1`
- `currency_configuration`: object - Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
- `materials_moved`: string - Materials automatically moved from previous line item into previous work completed. This will be non-zero only if move_materials_to_previous_work_completed is true on the payment application. e.g. `0.00`
- `materials_retainage_retained_moved`: string - Retainage on materials automatically moved from previous line item into work completed retainage amount accrued previously. This will be non-zero only if move_materials_to_previous_work_completed is true on the paymen... e.g. `0.00`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/requisitions/{requisition_id}/remove_change_order_package

**Remove Change Order Package from a Requisition (Subcontractor Invoice)**
Remove a specified Change Order Package from a Requisition (Subcontractor Invoice)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `requisition_id` [path] integer (required) - Requisition (Subcontractor Invoice) ID
- `commitment_id` [query] integer (required) - Commitment ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `change_order_package_id` [query] integer (required) - Change Order Package ID

Response 200: OK (no body)

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/requisitions/{requisition_id}/detail

**Show Detail for Requisition (Subcontractor Invoice)**
Return Requisition (Subcontractor Invoice) Detail

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `requisition_id` [path] integer (required) - Requisition (Subcontractor Invoice) ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `id`: integer - ID (for the item_type) e.g. `58820`
- `balance_to_finish`: string - Balance to finish amount e.g. `1.00`
- `materials_presently_stored`: string - Materials presently stored amount. Only present when using amount based accounting. e.g. `0.00`
- `scheduled_value`: string - Scheduled value amount e.g. `1.00`
- `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
- `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
- `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
- `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
- `description_of_work`: string - Description of work e.g. `Install windows`
- `item_number`: integer - Item number e.g. `1`
- `item_type`: string enum[change_order_item, whole_change_order_item, contract_detail_item, contract_item] - Requisition (Subcontractor Invoice) detail line type e.g. `contract_detail_item`
- `cost_code_id`: integer - Cost code ID e.g. `21585118`
- `scheduled_unit_price`: string - Scheduled unit price. Only present when using unit based accounting. e.g. `0.0`
- `scheduled_quantity`: string - Scheduled quantity. Only present when using unit based accounting. e.g. `0.0`
- `total_completed_and_stored_to_date_quantity`: string - Total completed and stored to date quantity. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_this_period_quantity`: string - Work completed this period quantity. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity. Only present when using unit based accounting. e.g. `0.0`
- `work_completed_retainage_currently_retained`: string - Work completed retainage currently retained amount e.g. `0.0`
- `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
- `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
- `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
- `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
- `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained. Only present when using amount based accounting. e.g. `0.0`
- `materials_stored_retainage_from_previous_application`: string - Materials stored retainage amount from previous application. Only present when using amount based accounting. e.g. `0.0`
- `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period. Only present when using amount based accounting. e.g. `0.0`
- `materials_stored_retainage_retained_this_period`: string - Materials stored retainage amount retained this period. Only present when using amount based accounting. e.g. `0.0`
- `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period. Only present when using amount based accounting. e.g. `10.0`
- `total_retainage_currently_retained`: string - Total retainage amount currently retained e.g. `0.0`
- `total_retainage_from_previous_application`: string - Total retainage amount from previous application e.g. `0.0`
- `materials_moved`: string - Materials automatically moved from previous line item into previous work completed. This will be non-zero only if move_materials_to_previous_work_completed is true on the payment application. e.g. `0.00`
- `materials_retainage_retained_moved`: string - Retainage on materials automatically moved from previous line item into work completed retainage amount accrued previously. This will be non-zero only if move_materials_to_previous_work_completed is true on the paymen... e.g. `0.00`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/requisitions  **[OLDER VERSION - a newer path version exists below/above]**

**List Requisitions (Subcontractor Invoices) for Project**
Return a list of Requisitions (Subcontractor Invoices) on a specified project
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[commitment_id]` [query] integer - Commitment ID(s). Returns item(s) with the specified Commitment ID(s).
- `filters[period_id]` [query] integer - Billing Period ID. Returns item(s) with the specified Billing Period ID.
- `filters[status]` [query] string enum[draft, under_review, revise_and_resubmit, approved, approved_as_noted, pending_owner_approval] - Return item(s) with the specified Requisition (Subcontractor Invoice) status.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.
- `filters[search]` [query] string - Return item(s) matching the specified Search query.

Response 200 (application/json): array of object

- `id`: integer - ID (present in all views) e.g. `58820`
- `project_id`: integer - Project ID (present in all views) e.g. `789`
- `electronic_signature_id`: integer - Eletronic Signature ID (present in all views) e.g. `20`
- `billing_date`: string(date) - Billing date (present in all views) e.g. `2013-11-20`
- `commitment_id`: integer - commitment ID (present in all views) e.g. `701973`
- `commitment_type`: string - Commitment Type (present in all views) e.g. `WorkOrderContract`
- `contract_name`: string - Contract Name (present in all views) e.g. `Contract SC-001`
- `created_at`: string(date-time) - Date req was created (present in all views) e.g. `2013-11-15T12:00:00Z`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
- `updated_at`: string(date-time) - Date req was last updated (present in all views) e.g. `2013-11-15T12:00:00Z`
- `invoice_number`: string - Invoice number (present in all views) e.g. `123`
- `invoice_type`: string enum[progress, retainage_release, progress_and_retainage_release] - Invoice type (present in all views) e.g. `progress_and_retainage_release`
- `contract_invoicing_method`: string enum[progressive, simplified] - The invoicing method for the contract, either progressive or simplified (present in all views) e.g. `progressive`
- `move_materials_to_previous_work_completed`: boolean - True if the Project Invoice Configuration is set to move materials to previous work completed (present in all views) e.g. `true`
- `origin_data`: string - Requisition (Subcontractor Invoice) third party data (present in all views) e.g. `XYZ-0012`
- `origin_id`: string - Requisition (Subcontractor Invoice) third party ID (present in all views) e.g. `abc-123`
- `payment_date`: string(date) - Date requisition was paid (present in all views) e.g. `2013-11-15`
- `period_id`: integer - Period ID (present in all views) e.g. `4293`
- `requisition_start`: string(date) - Requisition (Subcontractor Invoice) start date (present in all views) e.g. `2013-11-01`
- `requisition_end`: string(date) - Requisition (Subcontractor Invoice) end date (present in all views) e.g. `2013-11-02`
- `status`: string enum[draft, under_review, revise_and_resubmit, approved, approved_as_noted, pending_owner_approval] - Status (present in all views) e.g. `approved`
- `erp_status`: string
- `submitted_at`: string(date) - Date requisition was submitted (present in all views) e.g. `2013-11-02`
- `comment`: string - Comment (present in all views) e.g. `Materials requested for foyer upgrade.`
- `final`: boolean - true or false value indicating whether or not this is the final invoice (present in all views) e.g. `true`
- `number`: integer - Requisition (Subcontractor Invoice) number (present in all views) e.g. `1`
- `percent_complete`: string - Percent complete (present in all views) e.g. `0`
- `vendor_name`: string - Name of Vendor for Invoice (present in all views) e.g. `Ernie's Electrical`
- `total_claimed_amount`: string - Total Claimed Amount for the Invoice (present in all views) e.g. `100.00`
- `deletable`: boolean - A boolean indicating whether or not the invoice can be deleted. (present in all views) e.g. `false`
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
- `currency_configuration`: object - Requisition (Subcontractor Invoice) Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
- `attachments`: array of object - Attachments (present in all views)
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string - Content Type e.g. `image/jpeg`
- `summary`: object - Requisition (Subcontractor Invoice) summary (present in all views)
  - `balance_to_finish_including_retainage`: string - Balance to finish including retainage e.g. `1268346.55`
  - `completed_work_retainage_percent`: string - Completed work retainage percent e.g. `10`
  - `completed_work_retainage_amount`: string - Completed work retainage amount e.g. `1201.0`
  - `contract_sum_to_date`: string - Contract sum to date e.g. `1279159.15`
  - `current_payment_due`: string - Current payment due e.g. `10812.6`
  - `formatted_period`: string - Formatted billing period e.g. `01/06/19 - 30/06/19`
  - `less_previous_certificates_for_payment`: string - Less previous certificates for payment e.g. `0`
  - `negative_change_order_item_total`: string - Negative change order item total e.g. `0`
  - `negative_new_change_order_item_total`: string - Negative new change order item total e.g. `0`
  - `negative_previous_change_order_item_total`: string - Negative previous change order item total e.g. `0`
  - `net_change_by_change_orders`: string - Net change by change orders e.g. `256706.65`
  - `original_contract_sum`: string - Original contract sum e.g. `1022452.5`
  - `positive_change_order_item_total`: string - Positive change order item total e.g. `0.00`
  - `positive_new_change_order_item_total`: string - Positive new change order item total e.g. `0.00`
  - `positive_previous_change_order_item_total`: string - Positive previous change order item total e.g. `0.00`
  - `stored_materials_retainage_amount`: string - Stored materials retainage amount e.g. `0.4`
  - `stored_materials_retainage_percent`: string - Stored materials retainage percent e.g. `10`
  - `tax_applicable_to_this_payment`: string - Tax applicable to this payment e.g. `0`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date e.g. `1201.4`
  - `total_earned_less_retainage`: string - Total earned less retainage e.g. `10812.6`
  - `total_retainage`: string - Total retainage e.g. `1201.4`
- `action_policy`: object
  - `controls`: object - Map of action names to their permission descriptors.

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/requisitions  **[OLDER VERSION - a newer path version exists below/above]**

**Create Requisition (Subcontractor Invoices) for Commitment**
Create a new Requisition (Subcontractor Invoices) for the specified Commitment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `55001`
- `commitment_id`: integer (required) - Commitment ID e.g. `66005`
- `attachments`: array of string - Requisition (Subcontractor Invoice) attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as ...
- `requisition`: object - Requisition (Subcontractor Invoice)
  - `period_id`: integer - Period ID e.g. `20093`
  - `requisition_start`: string(date) - Requisition (Subcontractor Invoice) start date e.g. `2013-10-01`
  - `requisition_end`: string(date) - Requisition (Subcontractor Invoice) end date e.g. `2013-10-31`
  - `billing_date`: string(date) - Billing date e.g. `2013-10-31`
  - `final`: boolean - true or false value indicating whether or not this is the final invoice e.g. `true`
  - `invoice_number`: string - Invoice number e.g. `ABC-1234`
  - `payment_date`: string(date) - Date requisition was paid e.g. `2013-11-15`
  - `origin_data`: string - Requisition (Subcontractor Invoice) third party data e.g. `XYZ-0012`
  - `origin_id`: string - Requisition (Subcontractor Invoice) third party ID e.g. `abc-123`
  - `status`: string enum[draft, under_review, revise_and_resubmit, approved, approved_as_noted, pending_owner_approval] - Status; admin can set any status, standard and billing recipient can set to under_review (submit) or draft (save) e.g. `under_review`
  - `submitted_at`: string(date) - Date requisition was submitted e.g. `2013-11-02`
  - `comment`: string - Any comment e.g. `Materials requested for foyer upgrade.`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 201 (application/json): object

- `id`: integer - ID e.g. `58820`
- `previous_requisition_id`: integer - ID for the previous requisition before this one on the same contract e.g. `58819`
- `project_id`: integer - Project ID e.g. `789`
- `billing_date`: string(date) - Billing date e.g. `2013-11-20`
- `created_at`: string(date-time) - Date req was created e.g. `2013-11-15T12:00:00Z`
- `updated_at`: string(date-time) - Date req was last updated e.g. `2013-11-15T12:00:00Z`
- `commitment_id`: integer - commitment ID e.g. `701973`
- `commitment_type`: string - Commitment Type e.g. `WorkOrderContract`
- `contract_name`: string - Contract Name e.g. `Contract SC-001`
- `deletable`: boolean - A boolean indicating whether or not the invoice can be deleted. e.g. `false`
- `final`: boolean - true or false value indicating whether or not this is the final invoice e.g. `true`
- `vendor_name`: string - Name of Vendor for Invoice e.g. `Ernie's Electrical`
- `vendor_id`: integer - ID of Vendor for Invoice e.g. `8881212`
- `invoice_number`: string - Invoice number e.g. `123`
- `invoice_type`: string enum[progress, retainage_release, progress_and_retainage_release] - Invoice type (present in all views) e.g. `progress_and_retainage_release`
- `contract_invoicing_method`: string enum[progressive, simplified] - The invoicing method for the contract, either progressive or simplified e.g. `progressive`
- `origin_data`: string - Requisition (Subcontractor Invoice) third party data e.g. `XYZ-0012`
- `origin_id`: string - Requisition (Subcontractor Invoice) third party ID e.g. `abc-123`
- `payment_date`: string(date) - Date requisition was paid e.g. `2013-11-15`
- `percent_complete`: string - Percent complete e.g. `0`
- `period_id`: integer - Period ID e.g. `4293`
- `requisition_start`: string(date) - Requisition (Subcontractor Invoice) start date e.g. `2013-11-01`
- `requisition_end`: string(date) - Requisition (Subcontractor Invoice) end date e.g. `2013-11-02`
- `status`: string enum[draft, under_review, revise_and_resubmit, approved, approved_as_noted, pending_owner_approval] - Status e.g. `approved`
- `erp_status`: string - Current ERP status of Requisition e.g. `synced`
- `number`: integer - Requisition (Subcontractor Invoice) number e.g. `1`
- `submitted_at`: string(date) - Date requisition was submitted e.g. `2013-11-02`
- `total_claimed_amount`: string - Total Claimed Amount for the Invoice e.g. `100.00`
- `electronic_signature_id`: integer - Electronic Signature ID e.g. `701973`
- `move_materials_to_previous_work_completed`: boolean - A boolean indicating if should move materials to previous work completed. e.g. `false`
- `summary_text`: object - Requisition (Subcontractor Invoice) summary text. Included when the view query param is 'extended' or 'header_only' AND the contract's invoicing method is 'progressive'. Omitted for 'simplified' contracts regardless o...
  - `project_name`: string - Name of the project e.g. `Project`
  - `project_number`: string - Number of the project e.g. `100`
  - `to_general_contractor`: string - Name of the company the requisition is for e.g. `Company A`
  - `requisition_period_start`: string(date) - Requisition period start date e.g. `2010-01-01`
  - `requisition_period_end`: string(date) - Requisition period end date e.g. `2010-01-01`
  - `subcontractor_name`: string - Name of the company the requisition is from e.g. `Company B`
  - `subcontractor_street`: string - Street address of the company the requisition is from e.g. `101 XYZ Avenue`
  - `subcontractor_city`: string - City of the company the requisition is from e.g. `New York`
  - `subcontractor_state_code`: string - State code of the company the requisition is from e.g. `NY`
  - `subcontractor_zip`: string - Zip code of the company the requisition is from e.g. `10101`
  - `subcontractor_country_code`: string - Country code of the company the requisition is from e.g. `US`
  - `application_number`: string - Invoice number e.g. `1`
  - `contract_for`: string - The contract title e.g. `Ceiling Tiles`
  - `contract_date`: string(date) - Date the signed contract is received e.g. `2010-01-01`
- `summary`: object - Requisition (Subcontractor Invoice) summary
  - `balance_to_finish_including_retainage`: string - Balance to finish including retainage e.g. `1268346.55`
  - `completed_work_retainage_percent`: string - Completed work retainage percent e.g. `10`
  - `completed_work_retainage_amount`: string - Completed work retainage amount e.g. `1201.0`
  - `contract_sum_to_date`: string - Contract sum to date e.g. `1279159.15`
  - `current_payment_due`: string - Current payment due e.g. `10812.6`
  - `formatted_period`: string - Formatted billing period e.g. `01/06/19 - 30/06/19`
  - `less_previous_certificates_for_payment`: string - Less previous certificates for payment e.g. `0`
  - `negative_change_order_item_total`: string - Negative change order item total e.g. `0`
  - `negative_new_change_order_item_total`: string - Negative new change order item total e.g. `0`
  - `negative_previous_change_order_item_total`: string - Negative previous change order item total e.g. `0`
  - `net_change_by_change_orders`: string - Net change by change orders e.g. `256706.65`
  - `original_contract_sum`: string - Original contract sum e.g. `1022452.5`
  - `positive_change_order_item_total`: string - Positive change order item total e.g. `0.00`
  - `positive_new_change_order_item_total`: string - Positive new change order item total e.g. `0.00`
  - `positive_previous_change_order_item_total`: string - Positive previous change order item total e.g. `0.00`
  - `stored_materials_retainage_amount`: string - Stored materials retainage amount e.g. `0.4`
  - `stored_materials_retainage_percent`: string - Stored materials retainage percent e.g. `10`
  - `tax_applicable_to_this_payment`: string - Tax applicable to this payment e.g. `0`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date e.g. `1201.4`
  - `total_earned_less_retainage`: string - Total earned less retainage e.g. `10812.6`
  - `total_retainage`: string - Total retainage e.g. `1201.4`
  - `new_materials`: string - Amount of new materials added this period e.g. `1975.31`
  - `new_materials_quantity`: string - Quantity of new materials added this period, only for unit based line items e.g. `98.7654`
  - `stored_materials`: string - Amount of materials presently stored less the new materials added this period e.g. `716.05`
  - `stored_materials_quantity`: string - Quantity of materials presently stored less the new materials added this period e.g. `35.80249`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
- `subtiers_certified_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
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
- `currency_configuration`: object - Requisition (Subcontractor Invoice) Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
  - `currency_exchange_rate`: number(float) - The exchange rate between the invoice currency and the project currency e.g. `1.8`
  - `base_currency_iso_code`: string - Project or Company ISO Code e.g. `EUR`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string - Content Type e.g. `image/jpeg`
- `action_policy`: object
  - `controls`: object - Map of action names to their permission descriptors.
- `tax_summary`: array of object - Aggregated tax summary for the requisition, grouped by tax code. Included only when the view query param is 'extended' or 'header_only'.
  - `tax_code_id`: integer - Tax code id e.g. `163215`
  - `tax_code_name`: string - Tax code name e.g. `HST`
  - `tax_code_rate`: number - Tax code rate e.g. `0.15`
  - `applied_amount`: number - Total applied amount for all line items with this tax code e.g. `54321`
- `accounting_method`: string enum[amount, unit] - Accounting method of the requisition's contract. Included only when the view query param is 'extended' or 'header_only'. e.g. `amount`
- `items`: array of object - Requisition items. Included only when the views query param includes 'extended' or 'items'.
  - `id`: integer - ID of the Contract Item or Contract Detail Item or Change Order Item or Whole Change Order Item e.g. `341256`
  - `item_type`: string - Item Type - (contract_item, contract_detail_item, change_order_item, whole_change_order_item) e.g. `contract_detail_item`
  - `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
  - `cost_code_id`: integer - Cost Code ID e.g. `21585118`
  - `currency_configuration`: object - Requisition (Subcontractor Invoice) Currency Configuration
    - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
    - `currency_exchange_rate`: number(float) - The exchange rate between the invoice currency and the project currency e.g. `1.8`
    - `base_currency_iso_code`: string - Project or Company ISO Code e.g. `EUR`
  - `line_item_id`: integer - Line Item ID e.g. `3129856`
  - `description_of_work`: string e.g. `Install windows`
  - `net_amount`: string - Net amount of line item e.g. `100.00`
  - `gross_amount`: string - Gross amount of line item e.g. `200.00`
  - `wbs_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `44`
    - `flat_code`: string - wbs code flat code e.g. `2.E`
    - `description`: string - wbs code description e.g. `Earthwork.Equipment`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `scheduled_value`: string - Scheduled value amount e.g. `1.00`
  - `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
  - `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
  - `materials_presently_stored`: string - Amount of materials presently stored e.g. `2691.36`
  - `materials_presently_stored_quantity`: string - Quantity of the Materials presently stored, only for unit based line items e.g. `134.56789`
  - `materials_presently_stored_from_previous_progress`: string - Materials presently stored from previous progress e.g. `0.00`
  - `materials_previously_stored_quantity`: string - Quantity of the Materials stored from the previous invoice, only for unit based line items e.g. `12.3456`
  - `materials_moved`: string - Materials automatically moved from previous line item into previous work completed. This will be non-zero only if move_materials_to_previous_work_completed is true on the payment application. e.g. `0.00`
  - `materials_retainage_retained_moved`: string - Retainage on materials automatically moved from previous line item into work completed retainage amount accrued previously. This will be non-zero only if move_materials_to_previous_work_completed is true on the paymen... e.g. `0.00`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
  - `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
  - `total_completed_and_stored_to_date_from_previous`: string - Total completed and stored to date from previous e.g. `100.00`
  - `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
  - `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
  - `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
  - `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained e.g. `0.0`
  - `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period, present e.g. `10.0`
  - `materials_stored_retainage_new_materials`: string - Materials stored retainage from new materials, present e.g. `10.0`
  - `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
  - `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period e.g. `0.0`
  - `scheduled_quantity`: string - Scheduled quantity e.g. `0.0`
  - `scheduled_unit_price`: string - Scheduled unit price e.g. `20.0`
  - `work_completed_this_period_quantity`: string - Work completed this period quantity e.g. `0.0`
  - `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity e.g. `0.0`
  - `comment`: string - Comment e.g. `Installation charges`
  - `status`: string - Status e.g. `no_action`
  - `position`: integer - Position of this item e.g. `1`
  - `line_number`: string - Line Number for the item e.g. `1.1`
  - `ssr_manual_override`: boolean - SSR Manual Override e.g. `false`
  - `subcontractor_claimed_amount`: string - Amount claimed by the subcontractor e.g. `0.0`
  - `previous_progress_id`: integer - ID of the previous progress for the item e.g. `55463`
  - `taxes`: array of object - Tax code information associated with the item
    - `tax_code_id`: integer - ID of the tax code e.g. `1`
    - `tax_code_name`: string - Code of the tax code e.g. `VAT`
    - `tax_code_rate`: number(float) - Rate of the tax code e.g. `0.1`
  - `uom`: string - Unit of measure for this line item e.g. `m²`
- `item_packages`: array of object - Requisition item packages. An item package can have either a contract or change order as its parent entity. Included only when the views query param includes 'extended' or 'items'.
  - `id`: integer - ID of the item package e.g. `341256`
  - `contract_id`: integer - ID of the contract associated with the item package e.g. `341256`
  - `change_order_id`: integer - ID of the change order associated with the item package e.g. `341256`
  - `number`: string - number associated with the item package's parent entity e.g. `1`
  - `title`: string - title associated with the item package's parent entity e.g. `Contract Title`
  - `status`: string - status associated with the item package's parent entity e.g. `Approved`
  - `position`: integer - position associated with the item package's parent entity e.g. `1`
  - `change_order_acronym_number`: string - acronym for the change order object associated with the item package. Null if the item package's parent entity is a contract. e.g. `PCO #003`
  - `change_order_request`: object - The change order request an item package is associated with. Only returned on three tier projects.
    - `id`: integer - ID of the change order request associated with the item package e.g. `341256`
    - `title`: string - title of the change order request associated with the item package e.g. `COR Title`
    - `change_order_acronym_number`: string - acronym and number for the change order request associated with the item package e.g. `COR #003`
  - `batch`: object - The change order batch an item package is associated with. Only returned on multi tier projects.
    - `id`: integer - ID of the change order batch associated with the item package e.g. `341256`
    - `title`: string - title of the change order batch associated with the item package e.g. `COR Title`
    - `change_order_acronym_number`: string - acronym and number for the change order batch associated with the item package e.g. `CCO #003`

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/requisitions/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Show Requisition (Subcontractor Invoice)**
Return a Requisition (Subcontractor Invoice) on a specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Requisition (Subcontractor Invoice) ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID (present in all views) e.g. `58820`
- `project_id`: integer - Project ID (present in all views) e.g. `789`
- `electronic_signature_id`: integer - Eletronic Signature ID (present in all views) e.g. `20`
- `billing_date`: string(date) - Billing date (present in all views) e.g. `2013-11-20`
- `commitment_id`: integer - commitment ID (present in all views) e.g. `701973`
- `commitment_type`: string - Commitment Type (present in all views) e.g. `WorkOrderContract`
- `contract_name`: string - Contract Name (present in all views) e.g. `Contract SC-001`
- `created_at`: string(date-time) - Date req was created (present in all views) e.g. `2013-11-15T12:00:00Z`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
- `updated_at`: string(date-time) - Date req was last updated (present in all views) e.g. `2013-11-15T12:00:00Z`
- `invoice_number`: string - Invoice number (present in all views) e.g. `123`
- `invoice_type`: string enum[progress, retainage_release, progress_and_retainage_release] - Invoice type (present in all views) e.g. `progress_and_retainage_release`
- `contract_invoicing_method`: string enum[progressive, simplified] - The invoicing method for the contract, either progressive or simplified (present in all views) e.g. `progressive`
- `move_materials_to_previous_work_completed`: boolean - True if the Project Invoice Configuration is set to move materials to previous work completed (present in all views) e.g. `true`
- `origin_data`: string - Requisition (Subcontractor Invoice) third party data (present in all views) e.g. `XYZ-0012`
- `origin_id`: string - Requisition (Subcontractor Invoice) third party ID (present in all views) e.g. `abc-123`
- `payment_date`: string(date) - Date requisition was paid (present in all views) e.g. `2013-11-15`
- `period_id`: integer - Period ID (present in all views) e.g. `4293`
- `requisition_start`: string(date) - Requisition (Subcontractor Invoice) start date (present in all views) e.g. `2013-11-01`
- `requisition_end`: string(date) - Requisition (Subcontractor Invoice) end date (present in all views) e.g. `2013-11-02`
- `status`: string enum[draft, under_review, revise_and_resubmit, approved, approved_as_noted, pending_owner_approval] - Status (present in all views) e.g. `approved`
- `erp_status`: string
- `submitted_at`: string(date) - Date requisition was submitted (present in all views) e.g. `2013-11-02`
- `comment`: string - Comment (present in all views) e.g. `Materials requested for foyer upgrade.`
- `final`: boolean - true or false value indicating whether or not this is the final invoice (present in all views) e.g. `true`
- `number`: integer - Requisition (Subcontractor Invoice) number (present in all views) e.g. `1`
- `percent_complete`: string - Percent complete (present in all views) e.g. `0`
- `vendor_name`: string - Name of Vendor for Invoice (present in all views) e.g. `Ernie's Electrical`
- `total_claimed_amount`: string - Total Claimed Amount for the Invoice (present in all views) e.g. `100.00`
- `deletable`: boolean - A boolean indicating whether or not the invoice can be deleted. (present in all views) e.g. `false`
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
- `currency_configuration`: object - Requisition (Subcontractor Invoice) Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
- `attachments`: array of object - Attachments (present in all views)
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string - Content Type e.g. `image/jpeg`
- `summary`: object - Requisition (Subcontractor Invoice) summary (present in all views)
  - `balance_to_finish_including_retainage`: string - Balance to finish including retainage e.g. `1268346.55`
  - `completed_work_retainage_percent`: string - Completed work retainage percent e.g. `10`
  - `completed_work_retainage_amount`: string - Completed work retainage amount e.g. `1201.0`
  - `contract_sum_to_date`: string - Contract sum to date e.g. `1279159.15`
  - `current_payment_due`: string - Current payment due e.g. `10812.6`
  - `formatted_period`: string - Formatted billing period e.g. `01/06/19 - 30/06/19`
  - `less_previous_certificates_for_payment`: string - Less previous certificates for payment e.g. `0`
  - `negative_change_order_item_total`: string - Negative change order item total e.g. `0`
  - `negative_new_change_order_item_total`: string - Negative new change order item total e.g. `0`
  - `negative_previous_change_order_item_total`: string - Negative previous change order item total e.g. `0`
  - `net_change_by_change_orders`: string - Net change by change orders e.g. `256706.65`
  - `original_contract_sum`: string - Original contract sum e.g. `1022452.5`
  - `positive_change_order_item_total`: string - Positive change order item total e.g. `0.00`
  - `positive_new_change_order_item_total`: string - Positive new change order item total e.g. `0.00`
  - `positive_previous_change_order_item_total`: string - Positive previous change order item total e.g. `0.00`
  - `stored_materials_retainage_amount`: string - Stored materials retainage amount e.g. `0.4`
  - `stored_materials_retainage_percent`: string - Stored materials retainage percent e.g. `10`
  - `tax_applicable_to_this_payment`: string - Tax applicable to this payment e.g. `0`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date e.g. `1201.4`
  - `total_earned_less_retainage`: string - Total earned less retainage e.g. `10812.6`
  - `total_retainage`: string - Total retainage e.g. `1201.4`
- `action_policy`: object
  - `controls`: object - Map of action names to their permission descriptors.

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/requisitions/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Update Requisition (Subcontractor Invoice)**
Update a specified Requisition (Subcontractor Invoice). Users without admin permissions can only update a requisition (sub invoice) if it is the most recent and has a status of 'draft' or 'revise_and_resubmit'. Users with admin permissions can update a requisition (sub invoice) regardless of its status or whether it is the most recent.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Requisition (Subcontractor Invoice) ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `55001`
- `commitment_id`: integer (required) - Commitment ID e.g. `66005`
- `attachments`: array of string - Requisition (Subcontractor Invoice) attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as ...
- `requisition`: object - Requisition (Subcontractor Invoice)
  - `period_id`: integer - Period ID e.g. `20093`
  - `requisition_start`: string(date) - Requisition (Subcontractor Invoice) start date e.g. `2013-10-01`
  - `requisition_end`: string(date) - Requisition (Subcontractor Invoice) end date e.g. `2013-10-31`
  - `billing_date`: string(date) - Billing date e.g. `2013-10-31`
  - `final`: boolean - true or false value indicating whether or not this is the final invoice e.g. `true`
  - `invoice_number`: string - Invoice number e.g. `ABC-1234`
  - `payment_date`: string(date) - Date requisition was paid e.g. `2013-11-15`
  - `origin_data`: string - Requisition (Subcontractor Invoice) third party data e.g. `XYZ-0012`
  - `origin_id`: string - Requisition (Subcontractor Invoice) third party ID e.g. `abc-123`
  - `status`: string enum[draft, under_review, revise_and_resubmit, approved, approved_as_noted, pending_owner_approval] - Status; admin can set any status, standard and billing recipient can set to under_review (submit) or draft (save) e.g. `under_review`
  - `submitted_at`: string(date) - Date requisition was submitted e.g. `2013-11-02`
  - `comment`: string - Any comment e.g. `Materials requested for foyer upgrade.`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `id`: integer - ID e.g. `58820`
- `previous_requisition_id`: integer - ID for the previous requisition before this one on the same contract e.g. `58819`
- `project_id`: integer - Project ID e.g. `789`
- `billing_date`: string(date) - Billing date e.g. `2013-11-20`
- `created_at`: string(date-time) - Date req was created e.g. `2013-11-15T12:00:00Z`
- `updated_at`: string(date-time) - Date req was last updated e.g. `2013-11-15T12:00:00Z`
- `commitment_id`: integer - commitment ID e.g. `701973`
- `commitment_type`: string - Commitment Type e.g. `WorkOrderContract`
- `contract_name`: string - Contract Name e.g. `Contract SC-001`
- `deletable`: boolean - A boolean indicating whether or not the invoice can be deleted. e.g. `false`
- `final`: boolean - true or false value indicating whether or not this is the final invoice e.g. `true`
- `vendor_name`: string - Name of Vendor for Invoice e.g. `Ernie's Electrical`
- `vendor_id`: integer - ID of Vendor for Invoice e.g. `8881212`
- `invoice_number`: string - Invoice number e.g. `123`
- `invoice_type`: string enum[progress, retainage_release, progress_and_retainage_release] - Invoice type (present in all views) e.g. `progress_and_retainage_release`
- `contract_invoicing_method`: string enum[progressive, simplified] - The invoicing method for the contract, either progressive or simplified e.g. `progressive`
- `origin_data`: string - Requisition (Subcontractor Invoice) third party data e.g. `XYZ-0012`
- `origin_id`: string - Requisition (Subcontractor Invoice) third party ID e.g. `abc-123`
- `payment_date`: string(date) - Date requisition was paid e.g. `2013-11-15`
- `percent_complete`: string - Percent complete e.g. `0`
- `period_id`: integer - Period ID e.g. `4293`
- `requisition_start`: string(date) - Requisition (Subcontractor Invoice) start date e.g. `2013-11-01`
- `requisition_end`: string(date) - Requisition (Subcontractor Invoice) end date e.g. `2013-11-02`
- `status`: string enum[draft, under_review, revise_and_resubmit, approved, approved_as_noted, pending_owner_approval] - Status e.g. `approved`
- `erp_status`: string - Current ERP status of Requisition e.g. `synced`
- `number`: integer - Requisition (Subcontractor Invoice) number e.g. `1`
- `submitted_at`: string(date) - Date requisition was submitted e.g. `2013-11-02`
- `total_claimed_amount`: string - Total Claimed Amount for the Invoice e.g. `100.00`
- `electronic_signature_id`: integer - Electronic Signature ID e.g. `701973`
- `move_materials_to_previous_work_completed`: boolean - A boolean indicating if should move materials to previous work completed. e.g. `false`
- `summary_text`: object - Requisition (Subcontractor Invoice) summary text. Included when the view query param is 'extended' or 'header_only' AND the contract's invoicing method is 'progressive'. Omitted for 'simplified' contracts regardless o...
  - `project_name`: string - Name of the project e.g. `Project`
  - `project_number`: string - Number of the project e.g. `100`
  - `to_general_contractor`: string - Name of the company the requisition is for e.g. `Company A`
  - `requisition_period_start`: string(date) - Requisition period start date e.g. `2010-01-01`
  - `requisition_period_end`: string(date) - Requisition period end date e.g. `2010-01-01`
  - `subcontractor_name`: string - Name of the company the requisition is from e.g. `Company B`
  - `subcontractor_street`: string - Street address of the company the requisition is from e.g. `101 XYZ Avenue`
  - `subcontractor_city`: string - City of the company the requisition is from e.g. `New York`
  - `subcontractor_state_code`: string - State code of the company the requisition is from e.g. `NY`
  - `subcontractor_zip`: string - Zip code of the company the requisition is from e.g. `10101`
  - `subcontractor_country_code`: string - Country code of the company the requisition is from e.g. `US`
  - `application_number`: string - Invoice number e.g. `1`
  - `contract_for`: string - The contract title e.g. `Ceiling Tiles`
  - `contract_date`: string(date) - Date the signed contract is received e.g. `2010-01-01`
- `summary`: object - Requisition (Subcontractor Invoice) summary
  - `balance_to_finish_including_retainage`: string - Balance to finish including retainage e.g. `1268346.55`
  - `completed_work_retainage_percent`: string - Completed work retainage percent e.g. `10`
  - `completed_work_retainage_amount`: string - Completed work retainage amount e.g. `1201.0`
  - `contract_sum_to_date`: string - Contract sum to date e.g. `1279159.15`
  - `current_payment_due`: string - Current payment due e.g. `10812.6`
  - `formatted_period`: string - Formatted billing period e.g. `01/06/19 - 30/06/19`
  - `less_previous_certificates_for_payment`: string - Less previous certificates for payment e.g. `0`
  - `negative_change_order_item_total`: string - Negative change order item total e.g. `0`
  - `negative_new_change_order_item_total`: string - Negative new change order item total e.g. `0`
  - `negative_previous_change_order_item_total`: string - Negative previous change order item total e.g. `0`
  - `net_change_by_change_orders`: string - Net change by change orders e.g. `256706.65`
  - `original_contract_sum`: string - Original contract sum e.g. `1022452.5`
  - `positive_change_order_item_total`: string - Positive change order item total e.g. `0.00`
  - `positive_new_change_order_item_total`: string - Positive new change order item total e.g. `0.00`
  - `positive_previous_change_order_item_total`: string - Positive previous change order item total e.g. `0.00`
  - `stored_materials_retainage_amount`: string - Stored materials retainage amount e.g. `0.4`
  - `stored_materials_retainage_percent`: string - Stored materials retainage percent e.g. `10`
  - `tax_applicable_to_this_payment`: string - Tax applicable to this payment e.g. `0`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date e.g. `1201.4`
  - `total_earned_less_retainage`: string - Total earned less retainage e.g. `10812.6`
  - `total_retainage`: string - Total retainage e.g. `1201.4`
  - `new_materials`: string - Amount of new materials added this period e.g. `1975.31`
  - `new_materials_quantity`: string - Quantity of new materials added this period, only for unit based line items e.g. `98.7654`
  - `stored_materials`: string - Amount of materials presently stored less the new materials added this period e.g. `716.05`
  - `stored_materials_quantity`: string - Quantity of materials presently stored less the new materials added this period e.g. `35.80249`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
- `subtiers_certified_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`
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
- `currency_configuration`: object - Requisition (Subcontractor Invoice) Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
  - `currency_exchange_rate`: number(float) - The exchange rate between the invoice currency and the project currency e.g. `1.8`
  - `base_currency_iso_code`: string - Project or Company ISO Code e.g. `EUR`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string - Content Type e.g. `image/jpeg`
- `action_policy`: object
  - `controls`: object - Map of action names to their permission descriptors.
- `tax_summary`: array of object - Aggregated tax summary for the requisition, grouped by tax code. Included only when the view query param is 'extended' or 'header_only'.
  - `tax_code_id`: integer - Tax code id e.g. `163215`
  - `tax_code_name`: string - Tax code name e.g. `HST`
  - `tax_code_rate`: number - Tax code rate e.g. `0.15`
  - `applied_amount`: number - Total applied amount for all line items with this tax code e.g. `54321`
- `accounting_method`: string enum[amount, unit] - Accounting method of the requisition's contract. Included only when the view query param is 'extended' or 'header_only'. e.g. `amount`
- `items`: array of object - Requisition items. Included only when the views query param includes 'extended' or 'items'.
  - `id`: integer - ID of the Contract Item or Contract Detail Item or Change Order Item or Whole Change Order Item e.g. `341256`
  - `item_type`: string - Item Type - (contract_item, contract_detail_item, change_order_item, whole_change_order_item) e.g. `contract_detail_item`
  - `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
  - `cost_code_id`: integer - Cost Code ID e.g. `21585118`
  - `currency_configuration`: object - Requisition (Subcontractor Invoice) Currency Configuration
    - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
    - `currency_exchange_rate`: number(float) - The exchange rate between the invoice currency and the project currency e.g. `1.8`
    - `base_currency_iso_code`: string - Project or Company ISO Code e.g. `EUR`
  - `line_item_id`: integer - Line Item ID e.g. `3129856`
  - `description_of_work`: string e.g. `Install windows`
  - `net_amount`: string - Net amount of line item e.g. `100.00`
  - `gross_amount`: string - Gross amount of line item e.g. `200.00`
  - `wbs_code`: object - Item's associated Budget Code
    - `id`: integer - ID e.g. `44`
    - `flat_code`: string - wbs code flat code e.g. `2.E`
    - `description`: string - wbs code description e.g. `Earthwork.Equipment`
    - `segment_items`: array of object - Work breakdown structure segment items
  - `scheduled_value`: string - Scheduled value amount e.g. `1.00`
  - `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
  - `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
  - `materials_presently_stored`: string - Amount of materials presently stored e.g. `2691.36`
  - `materials_presently_stored_quantity`: string - Quantity of the Materials presently stored, only for unit based line items e.g. `134.56789`
  - `materials_presently_stored_from_previous_progress`: string - Materials presently stored from previous progress e.g. `0.00`
  - `materials_previously_stored_quantity`: string - Quantity of the Materials stored from the previous invoice, only for unit based line items e.g. `12.3456`
  - `materials_moved`: string - Materials automatically moved from previous line item into previous work completed. This will be non-zero only if move_materials_to_previous_work_completed is true on the payment application. e.g. `0.00`
  - `materials_retainage_retained_moved`: string - Retainage on materials automatically moved from previous line item into work completed retainage amount accrued previously. This will be non-zero only if move_materials_to_previous_work_completed is true on the paymen... e.g. `0.00`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
  - `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
  - `total_completed_and_stored_to_date_from_previous`: string - Total completed and stored to date from previous e.g. `100.00`
  - `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
  - `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
  - `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
  - `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained e.g. `0.0`
  - `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period, present e.g. `10.0`
  - `materials_stored_retainage_new_materials`: string - Materials stored retainage from new materials, present e.g. `10.0`
  - `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
  - `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period e.g. `0.0`
  - `scheduled_quantity`: string - Scheduled quantity e.g. `0.0`
  - `scheduled_unit_price`: string - Scheduled unit price e.g. `20.0`
  - `work_completed_this_period_quantity`: string - Work completed this period quantity e.g. `0.0`
  - `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity e.g. `0.0`
  - `comment`: string - Comment e.g. `Installation charges`
  - `status`: string - Status e.g. `no_action`
  - `position`: integer - Position of this item e.g. `1`
  - `line_number`: string - Line Number for the item e.g. `1.1`
  - `ssr_manual_override`: boolean - SSR Manual Override e.g. `false`
  - `subcontractor_claimed_amount`: string - Amount claimed by the subcontractor e.g. `0.0`
  - `previous_progress_id`: integer - ID of the previous progress for the item e.g. `55463`
  - `taxes`: array of object - Tax code information associated with the item
    - `tax_code_id`: integer - ID of the tax code e.g. `1`
    - `tax_code_name`: string - Code of the tax code e.g. `VAT`
    - `tax_code_rate`: number(float) - Rate of the tax code e.g. `0.1`
  - `uom`: string - Unit of measure for this line item e.g. `m²`
- `item_packages`: array of object - Requisition item packages. An item package can have either a contract or change order as its parent entity. Included only when the views query param includes 'extended' or 'items'.
  - `id`: integer - ID of the item package e.g. `341256`
  - `contract_id`: integer - ID of the contract associated with the item package e.g. `341256`
  - `change_order_id`: integer - ID of the change order associated with the item package e.g. `341256`
  - `number`: string - number associated with the item package's parent entity e.g. `1`
  - `title`: string - title associated with the item package's parent entity e.g. `Contract Title`
  - `status`: string - status associated with the item package's parent entity e.g. `Approved`
  - `position`: integer - position associated with the item package's parent entity e.g. `1`
  - `change_order_acronym_number`: string - acronym for the change order object associated with the item package. Null if the item package's parent entity is a contract. e.g. `PCO #003`
  - `change_order_request`: object - The change order request an item package is associated with. Only returned on three tier projects.
    - `id`: integer - ID of the change order request associated with the item package e.g. `341256`
    - `title`: string - title of the change order request associated with the item package e.g. `COR Title`
    - `change_order_acronym_number`: string - acronym and number for the change order request associated with the item package e.g. `COR #003`
  - `batch`: object - The change order batch an item package is associated with. Only returned on multi tier projects.
    - `id`: integer - ID of the change order batch associated with the item package e.g. `341256`
    - `title`: string - title of the change order batch associated with the item package e.g. `COR Title`
    - `change_order_acronym_number`: string - acronym and number for the change order batch associated with the item package e.g. `CCO #003`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/requisitions/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Delete Requisition (Subcontractor Invoice)**
Delete specified Requisition (Subcontractor Invoice)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Requisition (Subcontractor Invoice) ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Work Order Contract Detail Line Items

Resource id: `work-order-contract-detail-line-items`. Raw spec: `../openapi-raw/work-order-contract-detail-line-items.json`. Web: https://developers.procore.com/reference/rest/work-order-contract-detail-line-items?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/work_order_contracts/{work_order_contract_id}/line_item_contract_details

**List Work Order Contract detail line items**
List Detail Line Items on a given Work Order Contract

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `work_order_contract_id` [path] integer (required) - Work Order Contract ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[line_item_id]` [query] integer - Line Item ID. Returns item(s) with the specified Line Item ID or within a range of Line Item IDs.

Response 200 (application/json): array of object

- `id`: integer - Detail Line Item ID e.g. `4896147`
- `amount`: string - Detail Line Item amount e.g. `1000.0`
- `description`: string - Detail Line Item description e.g. `Cleanup`
- `position`: integer - Detail Line Item position e.g. `1`
- `line_item_id`: integer - Line Item ID e.g. `4320911`
- `billed_to_date`: string - Detail Line Item actual billed amount e.g. `500.0`
- `billed_against`: boolean - Has this line item ever been billed for a non-zero amount on a previous invoice e.g. `true`
- `currency_configuration`: object
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/work_order_contracts/{work_order_contract_id}/line_item_contract_details

**Create Work Order Contract detail line item**
Creates a Detail Line Item on a given Work Order Contract Line Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `work_order_contract_id` [path] integer (required) - Work Order Contract ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `34567`
- `contract_detail_line_item`: object (required) - The Detail Line Item object
  - `line_item_id`: integer - Line Item ID e.g. `1`
  - `amount`: string - Amount e.g. `1000.0`
  - `description`: string - Description e.g. `Cleanup`

Response 201 (application/json): object

- `id`: integer - Detail Line Item ID e.g. `4896147`
- `amount`: string - Detail Line Item amount e.g. `1000.0`
- `description`: string - Detail Line Item description e.g. `Cleanup`
- `position`: integer - Detail Line Item position e.g. `1`
- `line_item_id`: integer - Line Item ID e.g. `4320911`
- `billed_to_date`: string - Detail Line Item actual billed amount e.g. `500.0`
- `billed_against`: boolean - Has this line item ever been billed for a non-zero amount on a previous invoice e.g. `true`
- `currency_configuration`: object
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`
- `created_at`: string(date-time) - Created at date and time e.g. `2016-08-01T23:33:54Z`
- `updated_at`: string(date-time) - Updated at date and time e.g. `2016-09-01T21:33:54Z`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/work_order_contracts/{work_order_contract_id}/line_item_contract_details/{id}

**Show Work Order Contract detail line item**
Return a Detail Line Item in a specific Work Order Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `work_order_contract_id` [path] integer (required) - Work Order Contract ID
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Detail Line Item ID e.g. `4896147`
- `amount`: string - Detail Line Item amount e.g. `1000.0`
- `description`: string - Detail Line Item description e.g. `Cleanup`
- `position`: integer - Detail Line Item position e.g. `1`
- `line_item_id`: integer - Line Item ID e.g. `4320911`
- `billed_to_date`: string - Detail Line Item actual billed amount e.g. `500.0`
- `billed_against`: boolean - Has this line item ever been billed for a non-zero amount on a previous invoice e.g. `true`
- `currency_configuration`: object
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`
- `created_at`: string(date-time) - Created at date and time e.g. `2016-08-01T23:33:54Z`
- `updated_at`: string(date-time) - Updated at date and time e.g. `2016-09-01T21:33:54Z`

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/work_order_contracts/{work_order_contract_id}/line_item_contract_details/{id}

**Update Work Order Contract detail line item**
Update a Detail Line Item in a specific Work Order Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `work_order_contract_id` [path] integer (required) - Work Order Contract ID
- `id` [path] integer (required) - ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `34567`
- `contract_detail_line_item`: object (required) - The Detail Line Item object
  - `line_item_id`: integer - Line Item ID e.g. `1`
  - `amount`: string - Amount e.g. `1000.0`
  - `description`: string - Description e.g. `Cleanup`

Response 200 (application/json): object

- `id`: integer - Detail Line Item ID e.g. `4896147`
- `amount`: string - Detail Line Item amount e.g. `1000.0`
- `description`: string - Detail Line Item description e.g. `Cleanup`
- `position`: integer - Detail Line Item position e.g. `1`
- `line_item_id`: integer - Line Item ID e.g. `4320911`
- `billed_to_date`: string - Detail Line Item actual billed amount e.g. `500.0`
- `billed_against`: boolean - Has this line item ever been billed for a non-zero amount on a previous invoice e.g. `true`
- `currency_configuration`: object
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`
- `created_at`: string(date-time) - Created at date and time e.g. `2016-08-01T23:33:54Z`
- `updated_at`: string(date-time) - Updated at date and time e.g. `2016-09-01T21:33:54Z`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/work_order_contracts/{work_order_contract_id}/line_item_contract_details/{id}

**Delete Work Order Contract detail line item**
Delete a Detail Line Item in a specific Work Order Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `work_order_contract_id` [path] integer (required) - Work Order Contract ID
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Work Order Contract Line Items

Resource id: `work-order-contract-line-items`. Raw spec: `../openapi-raw/work-order-contract-line-items.json`. Web: https://developers.procore.com/reference/rest/work-order-contract-line-items?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/work_order_contracts/{work_order_contract_id}/line_items

**List Work Order Contract Line Items**
Return a list of all Line Items of a specified Work Order Contract in a specified Project.
Change Event Line Item information is only returned if a line item is associated to a change event line item and user can view change events.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.
Note: A v2.0 version of this endpoint is available and recommended for new integrations. Use the Commitment Contract Line Items endpoint GET /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_contracts/{commitment_contract_id}/line_items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `work_order_contract_id` [path] integer (required) - Work Order Contract ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[cost_code_id]` [query] string - Cost Code ID. Returns item(s) with the specified Cost Code ID or within the specified range of Cost Code IDs.
- `filters[line_item_type_id]` [query] integer - Line Item Type ID. Returns item(s) with the specified Line Item Type ID or range of Line Item Type IDs.
- `view` [query] string enum[default, ssov_source_lines] - Specifies which view (which attributes) of the resource is going to be present in the response. 'default' view will be rendered by default if the parameter is not provided. For the 'ssov_source_lines' view lower permi...

Response 200 (application/json): array of oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/work_order_contracts/{work_order_contract_id}/line_items

**Create Work Order Contract line item**
Create a new Line Item in a specified Work Order Contract.
Note: A budget line item will automatically be created for Non-budgeted line items for all new projects and for projects enabled with Non-Budgeted line item beta functionality

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `work_order_contract_id` [path] integer (required) - Work Order Contract ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `34567`
- `line_item`: object (required) - The Line Item object
  - `amount`: string - Amount e.g. `1000.0`
  - `cost_code_id`: integer - Cost Code ID e.g. `77408196`
  - `description`: string - Description e.g. `Cleanup`
  - `extended_type`: string enum[manual, calculated] - Extended type e.g. `calculated`
  - `quantity`: string - Quantity e.g. `20.0`
  - `line_item_type_id`: integer - Line Item Type ID e.g. `5085801`
  - `origin_data`: string - Origin Data e.g. `AC-1234`
  - `origin_id`: string - Origin ID e.g. `55555`
  - `tax_code_id`: integer - Tax Code ID e.g. `1`
  - `unit_cost`: string - Unit cost e.g. `50.00`
  - `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure e.g. `Hours`
  - `wbs_code_id`: integer - WBS code ID e.g. `34567`

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

### GET /rest/v1.0/work_order_contracts/{work_order_contract_id}/line_items/{id}

**Show Work Order Contract line item**
Return a specific Line Item in a specified Work Order Contract.
Change Event Line Item information is only returned if a line item is associated to a change event line item and user can view change events.
Note: A v2.0 version of this endpoint is available and recommended for new integrations. Use the Commitment Contract Line Items endpoint GET /rest/v2.0/companies/{company_id}/projects/{project_id}/commitment_contracts/{commitment_contract_id}/line_items/{id}.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `work_order_contract_id` [path] integer (required) - Work Order Contract ID
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `view` [query] string enum[default, ssov_source_lines] - Specifies which view (which attributes) of the resource is going to be present in the response. 'default' view will be rendered by default if the parameter is not provided. For the 'ssov_source_lines' view lower permi...

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/work_order_contracts/{work_order_contract_id}/line_items/{id}

**Update Work Order Contract line item**
Update a Line Item in a specific Work Order Contract.
Note: A budget line item will automatically be created for Non-budgeted line items for all new projects and for projects enabled with Non-Budgeted line item beta functionality

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `work_order_contract_id` [path] integer (required) - Work Order Contract ID
- `id` [path] integer (required) - ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `34567`
- `line_item`: object (required) - The Line Item object
  - `amount`: string - Amount e.g. `1000.0`
  - `cost_code_id`: integer - Cost Code ID e.g. `77408196`
  - `description`: string - Description e.g. `Cleanup`
  - `extended_type`: string enum[manual, calculated] - Extended type e.g. `calculated`
  - `quantity`: string - Quantity e.g. `20.0`
  - `line_item_type_id`: integer - Line Item Type ID e.g. `5085801`
  - `origin_data`: string - Origin Data e.g. `AC-1234`
  - `origin_id`: string - Origin ID e.g. `55555`
  - `tax_code_id`: integer - Tax Code ID e.g. `1`
  - `unit_cost`: string - Unit cost e.g. `50.00`
  - `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure e.g. `Hours`
  - `wbs_code_id`: integer - WBS code ID e.g. `34567`

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

### DELETE /rest/v1.0/work_order_contracts/{work_order_contract_id}/line_items/{id}

**Delete Work Order Contract line item**
Delete a Line Item in a specific Work Order Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `work_order_contract_id` [path] integer (required) - Work Order Contract ID
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/work_order_contracts/{work_order_contract_id}/line_items/sync

**Sync Work Order Contract Line Items**
Sync Work Order Contract Line Items.
Note: A budget line item will automatically be created for Non-budgeted line items for all new projects and for projects enabled with Non-Budgeted line item beta functionality

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `work_order_contract_id` [path] integer (required) - Work Order Contract ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `updates`: array of object (required)
  - `amount`: string - Amount e.g. `1000.0`
  - `cost_code_id`: integer - Cost Code ID e.g. `77408196`
  - `description`: string - Description e.g. `Cleanup`
  - `extended_type`: string enum[manual, calculated] - Extended type e.g. `calculated`
  - `quantity`: string - Quantity e.g. `20.0`
  - `line_item_type_id`: integer - Line Item Type ID e.g. `5085801`
  - `origin_data`: string - Origin Data e.g. `AC-1234`
  - `origin_id`: string - Origin ID e.g. `55555`
  - `tax_code_id`: integer - Tax Code ID e.g. `1`
  - `unit_cost`: string - Unit cost e.g. `50.00`
  - `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure e.g. `Hours`
  - `wbs_code_id`: integer - WBS code ID e.g. `34567`

Response 200 (application/json): object

- `entities`: array of object
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
  - `updated_at`: string(date-time) - Updated at date and time e.g. `2016-09-01T21:33:54Z`
  - `wbs_code`: object
    - `id`: integer - Wbs Code ID e.g. `999`
    - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
    - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
  - `change_event_line_item`: object - Change Event Line Item
    - `id`: integer - Change Event Line Item ID e.g. `5`
    - `cost_rom`: string(float) - Change Event Line Item Cost ROM e.g. `100.0`
    - `revenue_rom`: string(float) - Change Event Line Item Revenue ROM e.g. `200.0`
    - `event_id`: integer - Change Event ID e.g. `6`
    - `cost_code`: oneOf(object | object)
    - `line_item_type`: object - Line Item Type
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

Error responses: 400, 401, 403, 413, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Work Order Contract Subcontractor SOV Status

Resource id: `work-order-contract-subcontractor-sov-status`. Raw spec: `../openapi-raw/work-order-contract-subcontractor-sov-status.json`. Web: https://developers.procore.com/reference/rest/work-order-contract-subcontractor-sov-status?version=latest
Product lines: Construction Financials

### PATCH /rest/v1.0/work_order_contracts/{work_order_contract_id}/subcontractor_schedule_of_values_status

**Update Work Order Contract Subcontractor SOV status**
Update the Subcontractor SOV status of a specific Work Order Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `work_order_contract_id` [path] integer (required) - Work Order Contract ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `34567`
- `status`: string enum[draft, revise_and_resubmit, under_review, approved] (required) - Subcontractor SOV status. Admin users or users with granular permissions to update the contract can chan ge the status if the contract has no requisitions (sub invoices) or approved commitment change orders. Bill reci... e.g. `approved`

Response 200 (application/json): object

- `status`: string - Subcontractor SOV status e.g. `under_review`

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Work Order Contracts

Resource id: `work-order-contracts`. Raw spec: `../openapi-raw/work-order-contracts.json`. Web: https://developers.procore.com/reference/rest/work-order-contracts?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/work_order_contracts

**List work order contracts**
Return a list of all Work Order Contracts of a specified Project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `view` [query] string enum[compact, extended] - Specifies how much information to show for each work order contract. The compact view is returned by default.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[status]` [query] string enum[Draft, Out For Bid, Out For Signature, Approved, Complete, Terminated, Void] - Return item(s) with the specified Work Order Contract status.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[include_deleted]` [query] string enum[only, with] - Use 'only' for only deleted resources. Use 'with' for deleted and undeleted resources.
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.

Response 200 (application/json): array of object

- `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
- `actual_completion_date`: string(date) - Actual completion date e.g. `2012-10-27`
- `approval_letter_date`: string - Approval letter date e.g. `2012-10-23`
- `approved_change_orders`: string - Approved change orders amount e.g. `34.4`
- `contract_date`: string(date) - Contract date e.g. `2012-10-23`
- `contract_start_date`: string(date) - Start date e.g. `2012-10-03`
- `contract_estimated_completion_date`: string(date) - Estimated completion date e.g. `2012-10-31`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2012-10-23T21:49:40Z`
- `description`: string - Description e.g. `<p>Paving level 3 parking lot.</p>`
- `draft_change_orders_amount`: string - Total of all draft change orders e.g. `750.0`
- `exclusions`: string - Exclusions e.g. `<p>Stairs, Elevator platform</p>`
- `executed`: boolean - Executed (or not) e.g. `false`
- `execution_date`: string(date) - Execution date e.g. `2012-10-23`
- `grand_total`: string - Grand total e.g. `12000.0`
- `id`: integer - ID e.g. `64382`
- `inclusions`: string - Inclusions e.g. `<p>Level 3 parking lot.</p>`
- `issued_on_date`: string(date) - Issued on date e.g. `2012-10-23`
- `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2012-10-23`
- `number`: string - Number e.g. `SC-17-1990-00001`
- `origin_data`: string - Origin data e.g. `OD-2398273423`
- `origin_code`: string - Origin code e.g. `OC-abc123`
- `origin_id`: string - Origin ID e.g. `459247543`
- `pending_change_orders`: string - Pending change orders amount e.g. `1000.0`
- `pending_revised_contract`: string - Pending revised contracts amount e.g. `2000.0`
- `percentage_paid`: string - Percentage paid e.g. `75.5`
- `private`: boolean - If true, visible to admins and whitelisted accessors; otherwise visible to those with read only access. e.g. `false`
- `project`: object - Project
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name e.g. `Children's Hospital`
- `remaining_balance_outstanding`: string - Remaining outstanding balance e.g. `500.0`
- `requisitions_are_enabled`: boolean - If true, Requisitions (Subcontractor Invoice) are enabled on the Commitment Contract e.g. `true`
- `retainage_percent`: string - Retainage percent e.g. `10.5`
- `returned_date`: string(date) - Returned date e.g. `2012-10-23`
- `revised_contract`: string - Revised contract amount e.g. `4833.55`
- `signed_contract_received_date`: string(date) - Signed contract received date e.g. `2012-10-25`
- `show_line_items_to_non_admins`: boolean - If true and the contract is private, non admins with access to the contract will be able to view the SOV items e.g. `true`
- `status`: string enum[Draft, Out For Bid, Out For Signature, Approved, Complete, Terminated, Void] - Status e.g. `Draft`
- `title`: string - Title e.g. `Concrete Paving`
- `total_draw_requests_amount`: string - Total draw requests amount e.g. `5670.0`
- `total_payments`: string - Total payments amount e.g. `12344.0`
- `total_requisitions_amount`: string - Total requisitions (sub invoices) amount e.g. `5670.0`
- `updated_at`: string(date-time) - Updated at e.g. `2015-11-04T15:18:57Z`
- `vendor`: object - Vendor
  - `id`: integer - ID e.g. `356493`
  - `company`: string - Company e.g. `Mau Mixers, LLC`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/work_order_contracts

**Create work order contract**
Create a Work Order Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project.
- `attachments`: array of string - Work Order Contract attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
- `work_order_contract`: object (required) - Work Order Contract object
  - `accounting_method`: string enum[amount, unit] - Accounting method. If not provided on create action, defaults to Project Configuration. e.g. `amount`
  - `actual_completion_date`: string(date) - Actual completion date e.g. `2012-10-27`
  - `approval_letter_date`: string - Approval letter date e.g. `2012-10-23`
  - `contract_date`: string(date) - Contract date e.g. `2012-10-23`
  - `contract_estimated_completion_date`: string(date) - Estimated completion date e.g. `2012-10-31`
  - `contract_start_date`: string(date) - Start date e.g. `2012-10-03`
  - `description`: string - Description e.g. `<p>Paving level 3 parking lot.</p>`
  - `exclusions`: string - Exclusions e.g. `<p>Stairs, Elevator platform</p>`
  - `executed`: boolean - Executed (or not) e.g. `false`
  - `execution_date`: string(date) - Execution date e.g. `2012-10-23`
  - `inclusions`: string - Inclusions e.g. `<p>Level 3 parking lot.</p>`
  - `invoice_contact_user_ids`: array of integer - IDs of users in the project directory (see the Project Users endpoint). The users with these IDs will be added as invoice contacts if they belong to the same vendor as the contract vendor. Invoice contacts are the poi...
  - `issued_on_date`: string(date) - Issued on date e.g. `2012-10-23`
  - `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2012-10-23`
  - `origin_code`: string - Origin code e.g. `OC-abc123`
  - `origin_data`: string - Origin Data e.g. `OD-2398273423`
  - `origin_id`: string - Origin ID e.g. `459247543`
  - `number`: string - Number e.g. `SC-17-1990-00001`
  - `private`: boolean - If true, visible to admins and whitelisted accessors; otherwise visible to those with read only access. e.g. `true`
  - `retainage_percent`: string - Retainage percent e.g. `10.5`
  - `returned_date`: string(date) - Returned date e.g. `2012-10-23`
  - `signed_contract_received_date`: string(date) - Signed contract received date e.g. `2012-10-25`
  - `status`: string enum[Draft, Out For Bid, Out For Signature, Approved, Complete, Terminated, Void] - Status e.g. `Draft`
  - `title`: string - Title e.g. `Concrete Paving`
  - `vendor_id`: integer - Vendor ID e.g. `4398347`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `currency_exchange_rate`: number - Exchange rate from contract currency to project currency; It'll be accepted only when multicurrency phase two feature flag is enabled and user has the granular permission to edit the contract exchange rate. e.g. `1.5`
  - `currency_iso_code`: string - Currency ISO code; It'll be accepted only when multicurrency phase two feature flag is enabled. e.g. `USD`

Response 201 (application/json): object

- `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
- `actual_completion_date`: string(date) - Actual completion date e.g. `2012-10-27`
- `approval_letter_date`: string - Approval letter date e.g. `2013-10-23`
- `approved_change_orders`: string - Approved change orders amount e.g. `3434.0`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `change_order_packages`: array of object - Change order packages
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
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `change_order_requests`: array of array of object - Change order requests
- `contract_date`: string(date) - Contract date e.g. `2013-10-23`
- `contract_start_date`: string(date) - Start date e.g. `2012-10-03`
- `contract_estimated_completion_date`: string(date) - Estimated completion date e.g. `2012-10-31`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `created_by_id`: integer - ID of the user who created the Contract e.g. `5432`
- `deleted_at`: string(date-time) - Deleted at e.g. `2012-10-23T21:49:40Z`
- `description`: string - Description e.g. `<p>Paving level 3 parking lot.</p>`
- `draft_change_orders_amount`: string - Total of all draft change orders e.g. `750.00`
- `exclusions`: string - Exclusions e.g. `<p>Stairs, Elevator platform</p>`
- `executed`: boolean - Executed (or not) e.g. `false`
- `execution_date`: string(date) - Execution date e.g. `2013-10-23`
- `grand_total`: string - Grand total e.g. `12000.0`
- `id`: integer - ID e.g. `64382`
- `inclusions`: string - Inclusions e.g. `<p>Level 3 parking lot.</p>`
- `invoice_contacts`: array of object - Invoice Contacts
  - `id`: integer e.g. `1128828`
  - `business_phone`: string e.g. `(503)744-3200`
  - `business_phone_extension`: integer e.g. `1234`
  - `email`: string e.g. `john.doe@example.com`
  - `fax_number`: string e.g. `813043`
  - `job_title`: string e.g. `Engineer`
  - `login_information_id`: integer
  - `mobile_phone`: string
  - `name`: string e.g. `A-1 Electric Company`
  - `vendor_name`: string
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `issued_on_date`: string(date) - Issued on date e.g. `2013-10-23`
- `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2013-10-23`
- `line_items`: array of object - Line items
  - `id`: integer - Line Item id e.g. `4896147`
  - `amount`: string - Line Item amount e.g. `1000.0`
  - `company`: object - Company
    - `id`: integer - ID e.g. `163215`
    - `name`: string - Name e.g. `Procore Tech`
  - `wbs_code`: object
    - `id`: integer - Wbs Code ID e.g. `999`
    - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
    - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
  - `cost_code`: oneOf(object | object)
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
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `number`: string - Number e.g. `SC-17-1990-00001`
- `origin_data`: string - Origin data e.g. `OD-2398273423`
- `origin_code`: string - Origin code e.g. `OC-abc123`
- `origin_id`: string - Origin ID e.g. `459247543`
- `payments_issued`: array of object - Payment issued
  - `id`: integer - ID e.g. `1551516`
  - `amount`: string - Payment amount e.g. `1000000.0`
  - `check_number`: string - Check number e.g. `ABC93759372`
  - `created_at`: string(date-time) - Created at e.g. `2015-07-14T22:03:27Z`
  - `date`: string(date) - Payment date e.g. `2015-07-15`
  - `draw_request_number`: integer - Payment number of a Draw Request, Owner Invoice, or Subcontractor Invoice e.g. `5`
  - `invoice_number`: string - Invoice number e.g. `Invoice 123`
  - `notes`: string - Associated notes e.g. `January Payment`
  - `payment_number`: integer - Payment number e.g. `5`
  - `attachments`: array of object - Payment attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `origin_id`: string - Origin ID e.g. `abc-123`
  - `origin_data`: string - Origin data e.g. `XYZ-0012`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `pending_change_orders`: string - Pending change orders amount e.g. `1000.00`
- `pending_revised_contract`: string - Pending revised contracts amount e.g. `2000.00`
- `percentage_paid`: string - Percentage paid e.g. `75.5`
- `potential_change_orders`: array of object - Work Order Contract potential change orders
  - `id`: integer - Potential change order id e.g. `570623`
  - `created_at`: string(date-time) - Potential change order created at e.g. `2012-10-23T21:39:40Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2012-11-24T21:39:40Z`
  - `due_date`: string(date) - Potential change order due date e.g. `2012-11-23`
  - `invoiced_date`: string(date) - Potential change order invoiced date e.g. `2012-10-24`
  - `number`: string - Potential change order number e.g. `004`
  - `paid_date`: string(date) - Potential change order paid date e.g. `2012-11-21`
  - `reviewed_at`: string(date-time) - Potential change order reviewed at e.g. `2012-10-23T21:44:40Z`
  - `title`: string - Potential change order title e.g. `Field Bulletin #3 - Steel staircase on roof`
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Potential change order status e.g. `approved`
  - `updated_at`: string(date-time) - Potential change order updated at e.g. `2012-11-23T21:39:40Z`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `private`: boolean - If true, visible to admins and whitelisted accessors; otherwise visible to those with read only access. e.g. `false`
- `project`: object - Project
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name e.g. `Children's Hospital`
- `remaining_balance_outstanding`: string - Remaining outstanding balance e.g. `500.00`
- `requisitions_are_enabled`: boolean - If true, Requisitions (Subcontractor Invoice) are enabled on the Commitment Contract e.g. `true`
- `retainage_percent`: string - Retainage percent e.g. `10.5`
- `returned_date`: string(date) - Returned date e.g. `2013-10-23`
- `revised_contract`: string - Revised contract amount e.g. `4833.55`
- `signed_contract_received_date`: string(date) - Signed contract received date e.g. `2012-10-25`
- `show_line_items_to_non_admins`: boolean - If true and the contract is private, non admins with access to the contract will be able to view the SOV items e.g. `true`
- `status`: string enum[Draft, Out For Bid, Out For Signature, Approved, Complete, Terminated, Void] - Status e.g. `Draft`
- `title`: string - Title e.g. `Concrete Paving`
- `total_draw_requests_amount`: string - Total draw requests amount e.g. `5670.0`
- `total_payments`: string - Total payments amount e.g. `12344.0`
- `total_requisitions_amount`: string - Total requisitions (sub invoices) amount e.g. `5670.0`
- `updated_at`: string(date-time) - Updated at e.g. `2015-11-04T15:18:57Z`
- `vendor`: object - Vendor
  - `id`: integer - ID e.g. `356493`
  - `company`: string - Company e.g. `Mau Mixers, LLC`
  - `origin_data`: string - Origin data e.g. `OD-876901523`
  - `origin_id`: string - Origin ID e.g. `0981234567`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/work_order_contracts/{id}

**Show work order contract**
Return a Work Order Contract.
### Special notes (Tiers)
The visibility of Change Order Packages, Potential Change Orders & Change Order Requests
depends on the number of tiers defined in the Work Order Contract as follows:
1-tier: Change Order Packages
2-tier: Change Order Packages, Potential Change Orders
3-tier: Change Order Packages, Change Order Requests, Potential Change Orders

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
- `actual_completion_date`: string(date) - Actual completion date e.g. `2012-10-27`
- `approval_letter_date`: string - Approval letter date e.g. `2013-10-23`
- `approved_change_orders`: string - Approved change orders amount e.g. `3434.0`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `change_order_packages`: array of object - Change order packages
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
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `change_order_requests`: array of array of object - Change order requests
- `contract_date`: string(date) - Contract date e.g. `2013-10-23`
- `contract_start_date`: string(date) - Start date e.g. `2012-10-03`
- `contract_estimated_completion_date`: string(date) - Estimated completion date e.g. `2012-10-31`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `created_by_id`: integer - ID of the user who created the Contract e.g. `5432`
- `deleted_at`: string(date-time) - Deleted at e.g. `2012-10-23T21:49:40Z`
- `description`: string - Description e.g. `<p>Paving level 3 parking lot.</p>`
- `draft_change_orders_amount`: string - Total of all draft change orders e.g. `750.00`
- `exclusions`: string - Exclusions e.g. `<p>Stairs, Elevator platform</p>`
- `executed`: boolean - Executed (or not) e.g. `false`
- `execution_date`: string(date) - Execution date e.g. `2013-10-23`
- `grand_total`: string - Grand total e.g. `12000.0`
- `id`: integer - ID e.g. `64382`
- `inclusions`: string - Inclusions e.g. `<p>Level 3 parking lot.</p>`
- `invoice_contacts`: array of object - Invoice Contacts
  - `id`: integer e.g. `1128828`
  - `business_phone`: string e.g. `(503)744-3200`
  - `business_phone_extension`: integer e.g. `1234`
  - `email`: string e.g. `john.doe@example.com`
  - `fax_number`: string e.g. `813043`
  - `job_title`: string e.g. `Engineer`
  - `login_information_id`: integer
  - `mobile_phone`: string
  - `name`: string e.g. `A-1 Electric Company`
  - `vendor_name`: string
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `issued_on_date`: string(date) - Issued on date e.g. `2013-10-23`
- `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2013-10-23`
- `line_items`: array of object - Line items
  - `id`: integer - Line Item id e.g. `4896147`
  - `amount`: string - Line Item amount e.g. `1000.0`
  - `company`: object - Company
    - `id`: integer - ID e.g. `163215`
    - `name`: string - Name e.g. `Procore Tech`
  - `wbs_code`: object
    - `id`: integer - Wbs Code ID e.g. `999`
    - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
    - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
  - `cost_code`: oneOf(object | object)
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
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `number`: string - Number e.g. `SC-17-1990-00001`
- `origin_data`: string - Origin data e.g. `OD-2398273423`
- `origin_code`: string - Origin code e.g. `OC-abc123`
- `origin_id`: string - Origin ID e.g. `459247543`
- `payments_issued`: array of object - Payment issued
  - `id`: integer - ID e.g. `1551516`
  - `amount`: string - Payment amount e.g. `1000000.0`
  - `check_number`: string - Check number e.g. `ABC93759372`
  - `created_at`: string(date-time) - Created at e.g. `2015-07-14T22:03:27Z`
  - `date`: string(date) - Payment date e.g. `2015-07-15`
  - `draw_request_number`: integer - Payment number of a Draw Request, Owner Invoice, or Subcontractor Invoice e.g. `5`
  - `invoice_number`: string - Invoice number e.g. `Invoice 123`
  - `notes`: string - Associated notes e.g. `January Payment`
  - `payment_number`: integer - Payment number e.g. `5`
  - `attachments`: array of object - Payment attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `origin_id`: string - Origin ID e.g. `abc-123`
  - `origin_data`: string - Origin data e.g. `XYZ-0012`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `pending_change_orders`: string - Pending change orders amount e.g. `1000.00`
- `pending_revised_contract`: string - Pending revised contracts amount e.g. `2000.00`
- `percentage_paid`: string - Percentage paid e.g. `75.5`
- `potential_change_orders`: array of object - Work Order Contract potential change orders
  - `id`: integer - Potential change order id e.g. `570623`
  - `created_at`: string(date-time) - Potential change order created at e.g. `2012-10-23T21:39:40Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2012-11-24T21:39:40Z`
  - `due_date`: string(date) - Potential change order due date e.g. `2012-11-23`
  - `invoiced_date`: string(date) - Potential change order invoiced date e.g. `2012-10-24`
  - `number`: string - Potential change order number e.g. `004`
  - `paid_date`: string(date) - Potential change order paid date e.g. `2012-11-21`
  - `reviewed_at`: string(date-time) - Potential change order reviewed at e.g. `2012-10-23T21:44:40Z`
  - `title`: string - Potential change order title e.g. `Field Bulletin #3 - Steel staircase on roof`
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Potential change order status e.g. `approved`
  - `updated_at`: string(date-time) - Potential change order updated at e.g. `2012-11-23T21:39:40Z`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `private`: boolean - If true, visible to admins and whitelisted accessors; otherwise visible to those with read only access. e.g. `false`
- `project`: object - Project
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name e.g. `Children's Hospital`
- `remaining_balance_outstanding`: string - Remaining outstanding balance e.g. `500.00`
- `requisitions_are_enabled`: boolean - If true, Requisitions (Subcontractor Invoice) are enabled on the Commitment Contract e.g. `true`
- `retainage_percent`: string - Retainage percent e.g. `10.5`
- `returned_date`: string(date) - Returned date e.g. `2013-10-23`
- `revised_contract`: string - Revised contract amount e.g. `4833.55`
- `signed_contract_received_date`: string(date) - Signed contract received date e.g. `2012-10-25`
- `show_line_items_to_non_admins`: boolean - If true and the contract is private, non admins with access to the contract will be able to view the SOV items e.g. `true`
- `status`: string enum[Draft, Out For Bid, Out For Signature, Approved, Complete, Terminated, Void] - Status e.g. `Draft`
- `title`: string - Title e.g. `Concrete Paving`
- `total_draw_requests_amount`: string - Total draw requests amount e.g. `5670.0`
- `total_payments`: string - Total payments amount e.g. `12344.0`
- `total_requisitions_amount`: string - Total requisitions (sub invoices) amount e.g. `5670.0`
- `updated_at`: string(date-time) - Updated at e.g. `2015-11-04T15:18:57Z`
- `vendor`: object - Vendor
  - `id`: integer - ID e.g. `356493`
  - `company`: string - Company e.g. `Mau Mixers, LLC`
  - `origin_data`: string - Origin data e.g. `OD-876901523`
  - `origin_id`: string - Origin ID e.g. `0981234567`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/work_order_contracts/{id}

**Update work order contract**
Update a specified Work Order Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project.
- `attachments`: array of string - Work Order Contract attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
- `work_order_contract`: object (required) - Work Order Contract object
  - `accounting_method`: string enum[amount, unit] - Accounting method. If not provided on create action, defaults to Project Configuration. e.g. `amount`
  - `actual_completion_date`: string(date) - Actual completion date e.g. `2012-10-27`
  - `approval_letter_date`: string - Approval letter date e.g. `2012-10-23`
  - `contract_date`: string(date) - Contract date e.g. `2012-10-23`
  - `contract_estimated_completion_date`: string(date) - Estimated completion date e.g. `2012-10-31`
  - `contract_start_date`: string(date) - Start date e.g. `2012-10-03`
  - `description`: string - Description e.g. `<p>Paving level 3 parking lot.</p>`
  - `exclusions`: string - Exclusions e.g. `<p>Stairs, Elevator platform</p>`
  - `executed`: boolean - Executed (or not) e.g. `false`
  - `execution_date`: string(date) - Execution date e.g. `2012-10-23`
  - `inclusions`: string - Inclusions e.g. `<p>Level 3 parking lot.</p>`
  - `invoice_contact_user_ids`: array of integer - IDs of users in the project directory (see the Project Users endpoint). The users with these IDs will be added as invoice contacts if they belong to the same vendor as the contract vendor. Invoice contacts are the poi...
  - `issued_on_date`: string(date) - Issued on date e.g. `2012-10-23`
  - `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2012-10-23`
  - `origin_code`: string - Origin code e.g. `OC-abc123`
  - `origin_data`: string - Origin Data e.g. `OD-2398273423`
  - `origin_id`: string - Origin ID e.g. `459247543`
  - `number`: string - Number e.g. `SC-17-1990-00001`
  - `private`: boolean - If true, visible to admins and whitelisted accessors; otherwise visible to those with read only access. e.g. `true`
  - `retainage_percent`: string - Retainage percent e.g. `10.5`
  - `returned_date`: string(date) - Returned date e.g. `2012-10-23`
  - `signed_contract_received_date`: string(date) - Signed contract received date e.g. `2012-10-25`
  - `status`: string enum[Draft, Out For Bid, Out For Signature, Approved, Complete, Terminated, Void] - Status e.g. `Draft`
  - `title`: string - Title e.g. `Concrete Paving`
  - `vendor_id`: integer - Vendor ID e.g. `4398347`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `currency_exchange_rate`: number - Exchange rate from contract currency to project currency; It'll be accepted only when multicurrency phase two feature flag is enabled and user has the granular permission to edit the contract exchange rate. e.g. `1.5`
  - `currency_iso_code`: string - Currency ISO code; It'll be accepted only when multicurrency phase two feature flag is enabled. e.g. `USD`

Response 200 (application/json): object

- `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
- `actual_completion_date`: string(date) - Actual completion date e.g. `2012-10-27`
- `approval_letter_date`: string - Approval letter date e.g. `2013-10-23`
- `approved_change_orders`: string - Approved change orders amount e.g. `3434.0`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `change_order_packages`: array of object - Change order packages
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
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `change_order_requests`: array of array of object - Change order requests
- `contract_date`: string(date) - Contract date e.g. `2013-10-23`
- `contract_start_date`: string(date) - Start date e.g. `2012-10-03`
- `contract_estimated_completion_date`: string(date) - Estimated completion date e.g. `2012-10-31`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `created_by_id`: integer - ID of the user who created the Contract e.g. `5432`
- `deleted_at`: string(date-time) - Deleted at e.g. `2012-10-23T21:49:40Z`
- `description`: string - Description e.g. `<p>Paving level 3 parking lot.</p>`
- `draft_change_orders_amount`: string - Total of all draft change orders e.g. `750.00`
- `exclusions`: string - Exclusions e.g. `<p>Stairs, Elevator platform</p>`
- `executed`: boolean - Executed (or not) e.g. `false`
- `execution_date`: string(date) - Execution date e.g. `2013-10-23`
- `grand_total`: string - Grand total e.g. `12000.0`
- `id`: integer - ID e.g. `64382`
- `inclusions`: string - Inclusions e.g. `<p>Level 3 parking lot.</p>`
- `invoice_contacts`: array of object - Invoice Contacts
  - `id`: integer e.g. `1128828`
  - `business_phone`: string e.g. `(503)744-3200`
  - `business_phone_extension`: integer e.g. `1234`
  - `email`: string e.g. `john.doe@example.com`
  - `fax_number`: string e.g. `813043`
  - `job_title`: string e.g. `Engineer`
  - `login_information_id`: integer
  - `mobile_phone`: string
  - `name`: string e.g. `A-1 Electric Company`
  - `vendor_name`: string
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `issued_on_date`: string(date) - Issued on date e.g. `2013-10-23`
- `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2013-10-23`
- `line_items`: array of object - Line items
  - `id`: integer - Line Item id e.g. `4896147`
  - `amount`: string - Line Item amount e.g. `1000.0`
  - `company`: object - Company
    - `id`: integer - ID e.g. `163215`
    - `name`: string - Name e.g. `Procore Tech`
  - `wbs_code`: object
    - `id`: integer - Wbs Code ID e.g. `999`
    - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
    - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
  - `cost_code`: oneOf(object | object)
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
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `number`: string - Number e.g. `SC-17-1990-00001`
- `origin_data`: string - Origin data e.g. `OD-2398273423`
- `origin_code`: string - Origin code e.g. `OC-abc123`
- `origin_id`: string - Origin ID e.g. `459247543`
- `payments_issued`: array of object - Payment issued
  - `id`: integer - ID e.g. `1551516`
  - `amount`: string - Payment amount e.g. `1000000.0`
  - `check_number`: string - Check number e.g. `ABC93759372`
  - `created_at`: string(date-time) - Created at e.g. `2015-07-14T22:03:27Z`
  - `date`: string(date) - Payment date e.g. `2015-07-15`
  - `draw_request_number`: integer - Payment number of a Draw Request, Owner Invoice, or Subcontractor Invoice e.g. `5`
  - `invoice_number`: string - Invoice number e.g. `Invoice 123`
  - `notes`: string - Associated notes e.g. `January Payment`
  - `payment_number`: integer - Payment number e.g. `5`
  - `attachments`: array of object - Payment attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `origin_id`: string - Origin ID e.g. `abc-123`
  - `origin_data`: string - Origin data e.g. `XYZ-0012`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `pending_change_orders`: string - Pending change orders amount e.g. `1000.00`
- `pending_revised_contract`: string - Pending revised contracts amount e.g. `2000.00`
- `percentage_paid`: string - Percentage paid e.g. `75.5`
- `potential_change_orders`: array of object - Work Order Contract potential change orders
  - `id`: integer - Potential change order id e.g. `570623`
  - `created_at`: string(date-time) - Potential change order created at e.g. `2012-10-23T21:39:40Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2012-11-24T21:39:40Z`
  - `due_date`: string(date) - Potential change order due date e.g. `2012-11-23`
  - `invoiced_date`: string(date) - Potential change order invoiced date e.g. `2012-10-24`
  - `number`: string - Potential change order number e.g. `004`
  - `paid_date`: string(date) - Potential change order paid date e.g. `2012-11-21`
  - `reviewed_at`: string(date-time) - Potential change order reviewed at e.g. `2012-10-23T21:44:40Z`
  - `title`: string - Potential change order title e.g. `Field Bulletin #3 - Steel staircase on roof`
  - `status`: string enum[draft, not_pricing, pricing, pending, revised, proceeding, not_proceeding, no_charge, approved, rejected, void] - Potential change order status e.g. `approved`
  - `updated_at`: string(date-time) - Potential change order updated at e.g. `2012-11-23T21:39:40Z`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `private`: boolean - If true, visible to admins and whitelisted accessors; otherwise visible to those with read only access. e.g. `false`
- `project`: object - Project
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name e.g. `Children's Hospital`
- `remaining_balance_outstanding`: string - Remaining outstanding balance e.g. `500.00`
- `requisitions_are_enabled`: boolean - If true, Requisitions (Subcontractor Invoice) are enabled on the Commitment Contract e.g. `true`
- `retainage_percent`: string - Retainage percent e.g. `10.5`
- `returned_date`: string(date) - Returned date e.g. `2013-10-23`
- `revised_contract`: string - Revised contract amount e.g. `4833.55`
- `signed_contract_received_date`: string(date) - Signed contract received date e.g. `2012-10-25`
- `show_line_items_to_non_admins`: boolean - If true and the contract is private, non admins with access to the contract will be able to view the SOV items e.g. `true`
- `status`: string enum[Draft, Out For Bid, Out For Signature, Approved, Complete, Terminated, Void] - Status e.g. `Draft`
- `title`: string - Title e.g. `Concrete Paving`
- `total_draw_requests_amount`: string - Total draw requests amount e.g. `5670.0`
- `total_payments`: string - Total payments amount e.g. `12344.0`
- `total_requisitions_amount`: string - Total requisitions (sub invoices) amount e.g. `5670.0`
- `updated_at`: string(date-time) - Updated at e.g. `2015-11-04T15:18:57Z`
- `vendor`: object - Vendor
  - `id`: integer - ID e.g. `356493`
  - `company`: string - Company e.g. `Mau Mixers, LLC`
  - `origin_data`: string - Origin data e.g. `OD-876901523`
  - `origin_id`: string - Origin ID e.g. `0981234567`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/work_order_contracts/{id}

**Delete work order contract**
Delete a specified Work Order Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/work_order_contracts/sync

**Sync work order contracts**
This endpoint creates or updates a batch of Work Order Contracts.
See [Using Sync Actions](/documentation/using-sync-actions) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `320923`
- `updates`: array of object (required) - Updated Work order contracts
  - `id`: integer - ID e.g. `3232302`
  - `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
  - `actual_completion_date`: string(date) - Actual completion date e.g. `2012-10-27`
  - `approval_letter_date`: string - Approval letter date e.g. `2012-10-23`
  - `contract_date`: string(date) - Contract date e.g. `2012-10-23`
  - `contract_estimated_completion_date`: string(date) - Estimated completion date e.g. `2012-10-31`
  - `contract_start_date`: string(date) - Start Date e.g. `2012-10-03`
  - `description`: string - Description e.g. `<p>Paving level 3 parking lot.</p>`
  - `exclusions`: string - Exclusions e.g. `<p>Stairs, Elevator platform</p>`
  - `executed`: boolean - Executed (or not) e.g. `false`
  - `execution_date`: string(date) - Execution date e.g. `2012-10-23`
  - `inclusions`: string - Inclusions e.g. `<p>Level 3 parking lot.</p>`
  - `issued_on_date`: string(date) - Issued on date e.g. `2012-10-23`
  - `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2012-10-23`
  - `origin_code`: string - Origin code e.g. `OC-abc123`
  - `origin_data`: string - Origin Data e.g. `OD-2398273423`
  - `origin_id`: string - Origin ID e.g. `459247543`
  - `number`: string - Number e.g. `SC-17-1990-00001`
  - `private`: boolean - If true, visible to admins and whitelisted accessors; otherwise visible to those with read only access. e.g. `true`
  - `retainage_percent`: string - Retainage percent e.g. `10.5`
  - `returned_date`: string(date) - Returned date e.g. `2012-10-23`
  - `signed_contract_received_date`: string(date) - Signed contract received date e.g. `2012-10-25`
  - `status`: string enum[Draft, Out For Bid, Out For Signature, Approved, Complete, Terminated, Void] - Status e.g. `Draft`
  - `title`: string - Title e.g. `Concrete Paving`
  - `vendor_id`: integer - Vendor ID e.g. `4398347`

Response 200 (application/json): object

- `entities`: array of object
  - `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
  - `actual_completion_date`: string(date) - Actual completion date e.g. `2012-10-27`
  - `approval_letter_date`: string - Approval letter date e.g. `2012-10-23`
  - `approved_change_orders`: string - Approved change orders amount e.g. `34.4`
  - `contract_date`: string(date) - Contract date e.g. `2012-10-23`
  - `contract_start_date`: string(date) - Start date e.g. `2012-10-03`
  - `contract_estimated_completion_date`: string(date) - Estimated completion date e.g. `2012-10-31`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2012-10-23T21:49:40Z`
  - `description`: string - Description e.g. `<p>Paving level 3 parking lot.</p>`
  - `draft_change_orders_amount`: string - Total of all draft change orders e.g. `750.0`
  - `exclusions`: string - Exclusions e.g. `<p>Stairs, Elevator platform</p>`
  - `executed`: boolean - Executed (or not) e.g. `false`
  - `execution_date`: string(date) - Execution date e.g. `2012-10-23`
  - `grand_total`: string - Grand total e.g. `12000.0`
  - `id`: integer - ID e.g. `64382`
  - `inclusions`: string - Inclusions e.g. `<p>Level 3 parking lot.</p>`
  - `issued_on_date`: string(date) - Issued on date e.g. `2012-10-23`
  - `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2012-10-23`
  - `number`: string - Number e.g. `SC-17-1990-00001`
  - `origin_data`: string - Origin data e.g. `OD-2398273423`
  - `origin_code`: string - Origin code e.g. `OC-abc123`
  - `origin_id`: string - Origin ID e.g. `459247543`
  - `pending_change_orders`: string - Pending change orders amount e.g. `1000.0`
  - `pending_revised_contract`: string - Pending revised contracts amount e.g. `2000.0`
  - `percentage_paid`: string - Percentage paid e.g. `75.5`
  - `private`: boolean - If true, visible to admins and whitelisted accessors; otherwise visible to those with read only access. e.g. `false`
  - `project`: object - Project
    - `id`: integer - ID e.g. `123456`
    - `name`: string - Name e.g. `Children's Hospital`
  - `remaining_balance_outstanding`: string - Remaining outstanding balance e.g. `500.0`
  - `requisitions_are_enabled`: boolean - If true, Requisitions (Subcontractor Invoice) are enabled on the Commitment Contract e.g. `true`
  - `retainage_percent`: string - Retainage percent e.g. `10.5`
  - `returned_date`: string(date) - Returned date e.g. `2012-10-23`
  - `revised_contract`: string - Revised contract amount e.g. `4833.55`
  - `signed_contract_received_date`: string(date) - Signed contract received date e.g. `2012-10-25`
  - `show_line_items_to_non_admins`: boolean - If true and the contract is private, non admins with access to the contract will be able to view the SOV items e.g. `true`
  - `status`: string enum[Draft, Out For Bid, Out For Signature, Approved, Complete, Terminated, Void] - Status e.g. `Draft`
  - `title`: string - Title e.g. `Concrete Paving`
  - `total_draw_requests_amount`: string - Total draw requests amount e.g. `5670.0`
  - `total_payments`: string - Total payments amount e.g. `12344.0`
  - `total_requisitions_amount`: string - Total requisitions (sub invoices) amount e.g. `5670.0`
  - `updated_at`: string(date-time) - Updated at e.g. `2015-11-04T15:18:57Z`
  - `vendor`: object - Vendor
    - `id`: integer - ID e.g. `356493`
    - `company`: string - Company e.g. `Mau Mixers, LLC`
  - `currency_configuration`: object
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`
- `errors`: array of object

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

