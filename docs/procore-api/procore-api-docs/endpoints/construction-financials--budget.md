# Procore API: Budget (Construction Financials)

Source: https://developers.procore.com/reference/rest/ (tool category: Budget)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Advanced Forecasting](#advanced-forecasting) - versions 2.0
- [Budget](#budget) - versions 1.0
- [Budget Change](#budget-change) - versions 1.0
- [Budget Change Adjustment Line Items](#budget-change-adjustment-line-items) - versions 2.0
- [Budget Change History](#budget-change-history) - versions 2.0
- [Budget Detail Columns](#budget-detail-columns) - versions 1.0
- [Budget Detail Filters](#budget-detail-filters) - versions 1.0
- [Budget Details](#budget-details) - versions 1.0
- [Budget Line Items](#budget-line-items) - versions 2.0, 1.1, 1.0
- [Budget Modifications](#budget-modifications) - versions 1.0
- [Budget Notes](#budget-notes) - versions 2.0
- [Budget Project Status Snapshots](#budget-project-status-snapshots) - versions 2.0
- [Budget View Detail Rows](#budget-view-detail-rows) - versions 1.0
- [Budget View Snapshot Detail Rows](#budget-view-snapshot-detail-rows) - versions 1.0
- [Budget View Snapshot Summary Rows](#budget-view-snapshot-summary-rows) - versions 1.0
- [Budget View Snapshots](#budget-view-snapshots) - versions 1.0
- [Budget View Summary Rows](#budget-view-summary-rows) - versions 1.0
- [Budget Views](#budget-views) - versions 1.0
- [Budgeted Production Quantities](#budgeted-production-quantities) - versions 1.0
- [Company Budget Configuration](#company-budget-configuration) - versions 2.0
- [Financial Periods](#financial-periods) - versions 2.0
- [Manual Forecast Line Items](#manual-forecast-line-items) - versions 1.0
- [Monitoring Resources](#monitoring-resources) - versions 1.0

## Advanced Forecasting

Resource id: `advanced-forecasting`. Raw spec: `../openapi-raw/advanced-forecasting.json`. Web: https://developers.procore.com/reference/rest/advanced-forecasting?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/advanced_forecastings/rows

**Get Advanced Forecasting Rows of a Project**
Get Advanced forecasting rows. Each page will have a maximum of 100 items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `budget_view_id` [query] string - Unique identifier for the Budget View (also known as Budget Template). Required to return spread amount for other curves besides manual. Also required when column-based forecasting is enabled.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters` [query] array of object - Array structure to filter the result of the advanced forecasting endpoint Supported filter objects (with and without budget_view_id): - WBS segment item filter Structure: - id: <segment_id> - tier: <segment_tier> - ty...

Response 200 (application/json): object

- `data`: array of object - Array of Advanced forecasting summarized rows
  - `budget_line_item_id`: string - Identifier of the budget line item this forecasting row belongs to. Null for rows that do not yet have a persisted budget line item. e.g. `56`
  - `wbs_code_id`: string - Identifier of the WBS (Work Breakdown Structure) code that scopes this forecasting row. Uniquely identifies the budget cost code combination being forecast. e.g. `76`
  - `start_date`: string - First day the forecast applies to, in 'YYYY-MM-DD' format. Together with end_date it defines the span over which periods are distributed. e.g. `2024-06-24`
  - `end_date`: string - Last day the forecast applies to, in 'YYYY-MM-DD' format. Together with start_date it defines the span over which periods are distributed. e.g. `2024-07-24`
  - `curve`: string enum[bell, back_loaded, front_loaded, linear, manual] - The curve of the line item. For more information about the curve distribution visit https://support.procore.com/faq/how-do-procores-advanced-forecasting-curves-distribute-projected-cost-to-complete-amounts e.g. `manual`
  - `forecast_to_complete`: number - Total projected cost remaining (forecast to complete) for this line item, as a currency amount. This total is distributed across periods according to the curve. e.g. `100`
  - `periods`: array of object - Per-period breakdown of the forecast-to-complete amount across the line item's date span.
    - `period_date`: string - Month this period applies to, in 'YYYY-MM' format. e.g. `2024-06`
    - `amount`: number - Currency amount of the forecast allocated to this period. e.g. `100`

Error responses: 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/advanced_forecastings/rows

**Update Advanced Forecasting Rows**
Update Advanced Forecasting Rows.
When `async: true` and Budget Columns 2.0 is enabled, the response is `202 Accepted` with a single `receipt_id` that the client should use to poll `Check confirm budget version` API before re-fetching budget data. When `async: false` (default) or Budget Columns 2.0
is disabled, the response is `200 OK` with the updated rows.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `async`: boolean - Request asynchronous processing. When `true`, Budget Columns 2.0 must be enabled or the request will return `422`. On success returns `202 Accepted` with a single `receipt_id` that the client should use to poll `Check...
- `budget_view_id`: string - Unique identifier for the Budget View (also known as Budget Template). Required when column-based forecasting is enabled and the update changes forecasting data (period amounts/percentages, the curve, or the start/end... e.g. `42`
- `forecasting_rows`: array of object
  - `budget_line_item_id`: string - ID of the line item. e.g. `56`
  - `wbs_code_id`: string (required) - ID of the WBS code e.g. `76`
  - `start_date`: string - The start date of the line item e.g. `2024-06-24`
  - `end_date`: string - The end date of the line item e.g. `2024-07-24`
  - `curve`: string enum[bell, back_loaded, front_loaded, linear, manual] - The curve of the line item. For more information about the curve distribution visit https://support.procore.com/faq/how-do-procores-advanced-forecasting-curves-distribute-projected-cost-to-complete-amounts e.g. `manual`
  - `forecast_to_complete`: number - The forecast to complete of the line item e.g. `100`
  - `periods`: array of object - The periods of the line item
    - `period_date`: string (required) - Month this period applies to, in 'YYYY-MM' format. Identifies which forecast period the amount/percentage belongs to. e.g. `2024-06`
    - `amount`: number (required) - Currency amount allocated to this period. Provide either amount or percentage to distribute the forecast across periods; use amount for explicit per-period values. e.g. `100`
    - `percentage`: number - Percentage of the line item's forecast-to-complete allocated to this period. Alternative to amount for distributing the forecast; expressed as a percentage value (e.g. 25.0 for 25%). e.g. `25`

Response 200 (application/json): object

- `data`: array of object - Array of Advanced forecasting summarized rows
  - `budget_line_item_id`: string - Identifier of the budget line item this forecasting row belongs to. Null for rows that do not yet have a persisted budget line item. e.g. `56`
  - `wbs_code_id`: string - Identifier of the WBS (Work Breakdown Structure) code that scopes this forecasting row. Uniquely identifies the budget cost code combination being forecast. e.g. `76`
  - `start_date`: string - First day the forecast applies to, in 'YYYY-MM-DD' format. Together with end_date it defines the span over which periods are distributed. e.g. `2024-06-24`
  - `end_date`: string - Last day the forecast applies to, in 'YYYY-MM-DD' format. Together with start_date it defines the span over which periods are distributed. e.g. `2024-07-24`
  - `curve`: string enum[bell, back_loaded, front_loaded, linear, manual] - The curve of the line item. For more information about the curve distribution visit https://support.procore.com/faq/how-do-procores-advanced-forecasting-curves-distribute-projected-cost-to-complete-amounts e.g. `manual`
  - `forecast_to_complete`: number - Total projected cost remaining (forecast to complete) for this line item, as a currency amount. This total is distributed across periods according to the curve. e.g. `100`
  - `periods`: array of object - Per-period breakdown of the forecast-to-complete amount across the line item's date span.
    - `period_date`: string - Month this period applies to, in 'YYYY-MM' format. e.g. `2024-06`
    - `amount`: number - Currency amount of the forecast allocated to this period. e.g. `100`

Response 202 (application/json): object

- `data`: object - Receipt for an asynchronous update
  - `receipt_id`: string - ID used to poll `Check confirm budget version` API before re-fetching budget data e.g. `12345`

Error responses: 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Budget

Resource id: `budget`. Raw spec: `../openapi-raw/budget.json`. Web: https://developers.procore.com/reference/rest/budget?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/projects/{project_id}/budget

**Show Budget meta data**
Show meta data for a project's budget

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `locked`: boolean - Whether the project's budget is currently locked. True after a successful lock. e.g. `true`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/budget/lock

**Create a budget lock**
Lock the budget

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 201 (application/json): object

- `locked`: boolean - Whether the project's budget is currently locked. True after a successful lock. e.g. `true`

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/budget/lock

**Delete budget lock**
Unlock the budget

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `destroy_all_budget_line_item_transfers` [query] boolean - Allows users to unlock the budget while either preserving or destroying the existing budget modifications. Defaults to 'true' when not included in request.

Response 200 (application/json): object

- `locked`: boolean - Whether the project's budget is currently locked. False after a successful unlock. e.g. `false`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Budget Change

Resource id: `budget-change`. Raw spec: `../openapi-raw/budget-change.json`. Web: https://developers.procore.com/reference/rest/budget-change?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/projects/{project_id}/budget_changes

**List Budget Change Summaries**
Return a list of budget change summary rows.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `exclude_custom_fields` [query] boolean - When true, omits custom_fields from each summary row for faster response.

Response 200 (application/json): object

- `data`: array of object
  - `id`: integer - Unique identifier for the budget change e.g. `75414`
  - `number`: number - Number field of the budget change e.g. `10`
  - `status`: string enum[draft, approved, under_review, void] - Status of the budget change e.g. `draft`
  - `title`: string - Title of budget change e.g. `My title`
  - `description`: string - Description of the budget change in HTML format e.g. `<p>Bla bla <em>description</em></p>`
  - `erp_status`: string enum[not_in_erp, ready_to_export, exporting, failed_to_export, rejected, invalid, synced, not_integrated] - The ERP (Enterprise Resource Planning) synchronization state of this budget change. e.g. `ready_to_export`
  - `prime_contract_id`: integer - Unique identifier for the prime contract this budget change is associated with e.g. `1234`
  - `amount`: number - Total amount of adjustments e.g. `0`
  - `change_event_line_item_ids`: array of integer - List of change event line item ids
  - `created_by`: object - The user who created the budget change
    - `id`: number - The ID of the user e.g. `1`
    - `name`: string - The name of the user e.g. `John Doe`
    - `login`: string - The login of the user e.g. `johndoe@example.com`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
  - `currency_configuration`: object
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/budget_changes

**Create a budget change**
Create a new budget change with adjustments.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `number`: number - Number field of budget change. If not provided, it will be assigned. e.g. `10`
- `status`: string enum[draft, approved, under_review, void] (required) - Status of budget change e.g. `draft`
- `title`: string - Title of budget change e.g. `Equipment`
- `description`: string - Description of budget change in HTML format e.g. `<p>bla bla <em>description</em></p>`
- `adjustment_line_items`: array of object - List of budget change line items. todo this key be renamed to line_items in the future
  - `ref`: string - Identifier used to map line items in the request to their respective objects or errors in the response e.g. `item56`
  - `adjustment_number`: integer - Number of this adjustment e.g. `5`
  - `wbs_code_id`: integer - Work Breakdown Structure Code ID e.g. `56`
  - `description`: string - Description of the adjustment e.g. `Foobar`
  - `comment`: string - Comment of the adjustment e.g. `Baz`
  - `calculation_strategy`: string enum[automatic, manual] - Cost calculation strategy e.g. `manual`
  - `quantity`: number - Estimated cost quantity e.g. `1`
  - `type`: string enum[change_event, budget_change] - Used to identify type of line item. id uniquess is guaranteed per type. NOTE: To add an Adjustment Line Item with the type budget_change for an adjustment_number, an Adjustment Line item with the type change_event mus... e.g. `change_event`
  - `uom`: string - Unit of measure used e.g. `Ea`
  - `unit_cost`: number - Estimated unit cost e.g. `500`
  - `amount`: number - Estimated cost amount e.g. `500`
  - `change_event_line_item_id`: integer - ID for the change event line item associated with the adjustment e.g. `860001`
- `prostore_file_ids`: array of integer - The prostore file identifiers that will be associated with this budget change as attachments
- `production_quantities`: array of object - List of budget change production quantities
  - `comment`: string - Comment of the production quantity e.g. `Baz`
  - `cost_code_id`: integer (required) - Cost Code ID e.g. `56`
  - `description`: string - Description of the production quantity e.g. `Foobar`
  - `quantity`: number (required) - Estimated cost quantity e.g. `1`
  - `ref`: string - Identifier used to map production quantities in the request to their respective objects or errors in the response e.g. `item56`
  - `uom`: string (required) - Unit of measure used e.g. `Ea`
  - `change_event_production_quantity_id`: number - ID of the Change Event Production Quantity that is to be associated with the Budget Change Production Quantity e.g. `1`

Response 201 (application/json): object

- `data`: object
  - `id`: integer - Unique identifier for the budget change e.g. `75414`
  - `number`: number - Number field of the budget change e.g. `10`
  - `status`: string enum[draft, approved, under_review, void] - Status of the budget change e.g. `draft`
  - `title`: string - Title of budget change e.g. `My title`
  - `description`: string - Description of the budget change in HTML format e.g. `<p>Bla bla <em>description</em></p>`
  - `erp_status`: string enum[not_in_erp, ready_to_export, exporting, failed_to_export, rejected, invalid, synced, not_integrated] - The ERP (Enterprise Resource Planning) synchronization state of this budget change. e.g. `ready_to_export`
  - `attachments`: array of object
    - `prostore_file_id`: integer - Unique identifier of the attached file
    - `name`: string - Base name of the file without its path e.g. `snapshot.png`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `adjustment_line_items`: array of object - todo this key be renamed to line_items in the future
    - `id`: number - ID of this adjustment e.g. `56`
    - `ref`: string - Identifier used to map line items in the request to their respective objects or errors in the response e.g. `item56`
    - `adjustment_number`: integer - Number of this adjustment. When creating a line item with type 'change_event', this is optional and it will be auto-assigned an adjustment_number. However, it is required when creating a line item with type 'budget_ch... e.g. `5`
    - `budget_change_id`: number - ID of the budget change this line item belongs to. e.g. `235`
    - `wbs_code`: object
    - `description`: string - Description of the adjustment e.g. `Foobar`
    - `comment`: string - Comment of the adjustment e.g. `Baz`
    - `created_at`: string(date-time) - Timestamp when this line item was created, in ISO 8601 format. e.g. `2018-04-19T09:36:42Z`
    - `calculation_strategy`: string enum[automatic, manual] - Cost calculation strategy e.g. `manual`
    - `quantity`: number - Estimated cost quantity e.g. `1`
    - `type`: string enum[budget_change, change_event] - used to identify type of line item. id uniqueness is guaranteed per type e.g. `change_event`
    - `uom`: string - Unit of measure used e.g. `Ea`
    - `unit_cost`: number - Estimated unit cost e.g. `30.5`
    - `amount`: number - Estimated cost amount e.g. `76.25`
    - `change_event_line_item_id`: number - ID of the associated change event line item if it exists (To be deprecated, use change_event_line_item instead) e.g. `78`
    - `change_event_line_item`: object - change event line item simple object
    - `currency_configuration`: object
  - `created_change_event`: object
    - `id`: integer - Identifier of the created change event e.g. `123`
    - `number`: string - Number of the created change event e.g. `456`
  - `production_quantities`: array of object - List of budget change production quantities
    - `id`: number - ID of this production quantity e.g. `56`
    - `budget_change_id`: number - ID of the Budget Change to which this production quantity is associated e.g. `78`
    - `comment`: string - Comment of the production quantity e.g. `Baz`
    - `created_at`: string(date-time) - Timestamp when this production quantity was created, in ISO 8601 format. e.g. `2018-04-19T09:36:42Z`
    - `description`: string - Description of the production quantity e.g. `Foobar`
    - `quantity`: number - Estimated cost quantity e.g. `1`
    - `ref`: string - Identifier used to map production quantities in the request to their respective objects or errors in the response e.g. `item56`
    - `uom`: string - Unit of measure used e.g. `Ea`
    - `wbs_code`: object - Work Breakdown Structure
    - `cost_code`: object - The cost code associated with the Production Quantity
    - `sub_job`: object - The sub job associated with the Production Quantity
    - `change_event_production_quantity_id`: number - ID of the associated Change Event Production Quantity e.g. `1`
  - `currency_configuration`: object
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/budget_changes/{id}

**Get information of a budget change**
Get information of a budget change (without adjustment)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Unique identifier of budget change

Response 200 (application/json): object

- `data`: object
  - `id`: integer - Unique identifier for the budget change e.g. `75414`
  - `number`: number - Number field of the budget change e.g. `10`
  - `status`: string enum[draft, approved, under_review, void] - Status of the budget change e.g. `draft`
  - `title`: string - Title of budget change e.g. `My title`
  - `description`: string - Description of the budget change in HTML format e.g. `<p>Bla bla <em>description</em></p>`
  - `erp_status`: string enum[not_in_erp, ready_to_export, exporting, failed_to_export, rejected, invalid, synced, not_integrated] - The ERP (Enterprise Resource Planning) synchronization state of this budget change. e.g. `ready_to_export`
  - `amount`: number - Total amount of the budget change e.g. `9.99`
  - `prime_contract`: object - Information on the prime contract this budget change is associated with
    - `id`: number - The ID of the prime contract e.g. `1`
    - `number`: string - Number e.g. `A-1`
    - `title`: string - Title e.g. `ABC Owner Contract`
  - `budget_change_type`: object - The budget change type categorizing this budget change. Null when no type is assigned.
    - `id`: integer - ID of the budget change type. e.g. `12`
    - `display_name`: string - Human-readable name of the budget change type. e.g. `Owner Change`
  - `attachments`: array of object
    - `prostore_file_id`: integer - Unique identifier of the attached file
    - `name`: string - Base name of the file without its path e.g. `snapshot.png`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `adjustment_line_items`: array of object - todo this key be renamed to line_items in the future
    - `id`: number - ID of this adjustment e.g. `56`
    - `ref`: string - Identifier used to map line items in the request to their respective objects or errors in the response e.g. `item56`
    - `adjustment_number`: integer - Number of this adjustment. When creating a line item with type 'change_event', this is optional and it will be auto-assigned an adjustment_number. However, it is required when creating a line item with type 'budget_ch... e.g. `5`
    - `budget_change_id`: number - ID of the budget change this line item belongs to. e.g. `235`
    - `wbs_code`: object
    - `description`: string - Description of the adjustment e.g. `Foobar`
    - `comment`: string - Comment of the adjustment e.g. `Baz`
    - `created_at`: string(date-time) - Timestamp when this line item was created, in ISO 8601 format. e.g. `2018-04-19T09:36:42Z`
    - `calculation_strategy`: string enum[automatic, manual] - Cost calculation strategy e.g. `manual`
    - `quantity`: number - Estimated cost quantity e.g. `1`
    - `type`: string enum[budget_change, change_event] - used to identify type of line item. id uniqueness is guaranteed per type e.g. `change_event`
    - `uom`: string - Unit of measure used e.g. `Ea`
    - `unit_cost`: number - Estimated unit cost e.g. `30.5`
    - `amount`: number - Estimated cost amount e.g. `76.25`
    - `change_event_line_item_id`: number - ID of the associated change event line item if it exists (To be deprecated, use change_event_line_item instead) e.g. `78`
    - `change_event_line_item`: object - change event line item simple object
    - `currency_configuration`: object
  - `production_quantities`: array of object - List of budget change production quantities
    - `id`: number - ID of this production quantity e.g. `56`
    - `budget_change_id`: number - ID of the Budget Change to which this production quantity is associated e.g. `78`
    - `comment`: string - Comment of the production quantity e.g. `Baz`
    - `created_at`: string(date-time) - Timestamp when this production quantity was created, in ISO 8601 format. e.g. `2018-04-19T09:36:42Z`
    - `description`: string - Description of the production quantity e.g. `Foobar`
    - `quantity`: number - Estimated cost quantity e.g. `1`
    - `ref`: string - Identifier used to map production quantities in the request to their respective objects or errors in the response e.g. `item56`
    - `uom`: string - Unit of measure used e.g. `Ea`
    - `wbs_code`: object - Work Breakdown Structure
    - `cost_code`: object - The cost code associated with the Production Quantity
    - `sub_job`: object - The sub job associated with the Production Quantity
    - `change_event_production_quantity_id`: number - ID of the associated Change Event Production Quantity e.g. `1`
  - `currency_configuration`: object
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`
  - `created_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
  - `created_by`: object - The user who created the budget change
    - `id`: number - The ID of the user e.g. `1`
    - `name`: string - The name of the user e.g. `John Doe`
    - `login`: string - The login of the user e.g. `johndoe@example.com`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/budget_changes/{id}

**Update information of a Budget Change**
Update information of a Budget Change

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Unique identifier of budget change

Request body (application/json) (required):

- `id`: integer - Unique identifier of this budget change e.g. `1`
- `number`: number - Number field of budget change e.g. `10`
- `status`: string enum[draft, approved, under_review, void] - Status of budget change e.g. `draft`
- `title`: string - Title of budget change e.g. `Equipment`
- `description`: string - Description of budget change in HTML format e.g. `<p>bla bla <em>description</em></p>`
- `adjustment_line_items`: array of object - List of budget change adjustments
  - `id`: integer - ID of this adjustment e.g. `56`
  - `type`: string enum[change_event, budget_change] - Used to identify type of line item. id uniqueness is guaranteed per type NOTE: To update an Adjustment Line Item with the type budget_change for an adjustment_number, an Adjustment Line item with the type change_event... e.g. `change_event`
  - `ref`: string - Identifier used to map line items in the request to their respective objects or errors in the response e.g. `item56`
  - `adjustment_number`: integer - Number of this adjustment e.g. `5`
  - `wbs_code_id`: integer - Work Breakdown Structure Code ID e.g. `56`
  - `description`: string - Description of the adjustment e.g. `Foobar`
  - `comment`: string - Comment of the adjustment e.g. `Baz`
  - `calculation_strategy`: string enum[automatic, manual] - Cost calculation strategy e.g. `manual`
  - `quantity`: number - Estimated cost quantity e.g. `1`
  - `uom`: string - Unit of measure used e.g. `Ea`
  - `unit_cost`: number - Estimated unit cost e.g. `500`
  - `amount`: number - Estimated cost amount e.g. `500`
  - `change_event_line_item_id`: integer - ID for the change event line item associated with the adjustment e.g. `860001`
  - `_delete`: boolean - Whether this adjustment should be deleted e.g. `true`
- `prostore_file_ids`: array of integer - The desired prostore file identifiers that will replace the current collection of attachments associated with the budget change
- `production_quantities`: array of object - List of budget change production quantities
  - `id`: integer - ID of this Production Quantity e.g. `56`
  - `comment`: string - Comment of the adjustment e.g. `Baz`
  - `cost_code_id`: integer (required) - Cost Code ID e.g. `56`
  - `description`: string - Description of the Production Quantity e.g. `Foobar`
  - `quantity`: number (required) - Estimated cost quantity e.g. `1`
  - `ref`: string - Identifier used to map production quantities in the request to their respective objects or errors in the response e.g. `item56`
  - `uom`: string (required) - Unit of measure used e.g. `Ea`
  - `change_event_production_quantity_id`: number - ID of the Change Event Production Quantity that is to be associated with the Budget Change Production Quantity e.g. `1`
  - `_delete`: boolean - Whether this production quantity should be deleted e.g. `true`

Response 200 (application/json): object

- `data`: object
  - `id`: integer - Unique identifier for the budget change e.g. `75414`
  - `number`: number - Number field of the budget change e.g. `10`
  - `status`: string enum[draft, approved, under_review, void] - Status of the budget change e.g. `draft`
  - `title`: string - Title of budget change e.g. `My title`
  - `description`: string - Description of the budget change in HTML format e.g. `<p>Bla bla <em>description</em></p>`
  - `erp_status`: string enum[not_in_erp, ready_to_export, exporting, failed_to_export, rejected, invalid, synced, not_integrated] - The ERP (Enterprise Resource Planning) synchronization state of this budget change. e.g. `ready_to_export`
  - `amount`: number - Total amount of the budget change e.g. `9.99`
  - `prime_contract`: object - Information on the prime contract this budget change is associated with
    - `id`: number - The ID of the prime contract e.g. `1`
    - `number`: string - Number e.g. `A-1`
    - `title`: string - Title e.g. `ABC Owner Contract`
  - `budget_change_type`: object - The budget change type categorizing this budget change. Null when no type is assigned.
    - `id`: integer - ID of the budget change type. e.g. `12`
    - `display_name`: string - Human-readable name of the budget change type. e.g. `Owner Change`
  - `attachments`: array of object
    - `prostore_file_id`: integer - Unique identifier of the attached file
    - `name`: string - Base name of the file without its path e.g. `snapshot.png`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `adjustment_line_items`: array of object - todo this key be renamed to line_items in the future
    - `id`: number - ID of this adjustment e.g. `56`
    - `ref`: string - Identifier used to map line items in the request to their respective objects or errors in the response e.g. `item56`
    - `adjustment_number`: integer - Number of this adjustment. When creating a line item with type 'change_event', this is optional and it will be auto-assigned an adjustment_number. However, it is required when creating a line item with type 'budget_ch... e.g. `5`
    - `budget_change_id`: number - ID of the budget change this line item belongs to. e.g. `235`
    - `wbs_code`: object
    - `description`: string - Description of the adjustment e.g. `Foobar`
    - `comment`: string - Comment of the adjustment e.g. `Baz`
    - `created_at`: string(date-time) - Timestamp when this line item was created, in ISO 8601 format. e.g. `2018-04-19T09:36:42Z`
    - `calculation_strategy`: string enum[automatic, manual] - Cost calculation strategy e.g. `manual`
    - `quantity`: number - Estimated cost quantity e.g. `1`
    - `type`: string enum[budget_change, change_event] - used to identify type of line item. id uniqueness is guaranteed per type e.g. `change_event`
    - `uom`: string - Unit of measure used e.g. `Ea`
    - `unit_cost`: number - Estimated unit cost e.g. `30.5`
    - `amount`: number - Estimated cost amount e.g. `76.25`
    - `change_event_line_item_id`: number - ID of the associated change event line item if it exists (To be deprecated, use change_event_line_item instead) e.g. `78`
    - `change_event_line_item`: object - change event line item simple object
    - `currency_configuration`: object
  - `production_quantities`: array of object - List of budget change production quantities
    - `id`: number - ID of this production quantity e.g. `56`
    - `budget_change_id`: number - ID of the Budget Change to which this production quantity is associated e.g. `78`
    - `comment`: string - Comment of the production quantity e.g. `Baz`
    - `created_at`: string(date-time) - Timestamp when this production quantity was created, in ISO 8601 format. e.g. `2018-04-19T09:36:42Z`
    - `description`: string - Description of the production quantity e.g. `Foobar`
    - `quantity`: number - Estimated cost quantity e.g. `1`
    - `ref`: string - Identifier used to map production quantities in the request to their respective objects or errors in the response e.g. `item56`
    - `uom`: string - Unit of measure used e.g. `Ea`
    - `wbs_code`: object - Work Breakdown Structure
    - `cost_code`: object - The cost code associated with the Production Quantity
    - `sub_job`: object - The sub job associated with the Production Quantity
    - `change_event_production_quantity_id`: number - ID of the associated Change Event Production Quantity e.g. `1`
  - `currency_configuration`: object
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`
  - `created_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
  - `created_by`: object - The user who created the budget change
    - `id`: number - The ID of the user e.g. `1`
    - `name`: string - The name of the user e.g. `John Doe`
    - `login`: string - The login of the user e.g. `johndoe@example.com`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/budget_changes/{id}

**Delete a Budget Change**
Delete Budget Change

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Unique identifier of budget change

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Budget Change Adjustment Line Items

Resource id: `budget-change-adjustment-line-items`. Raw spec: `../openapi-raw/budget-change-adjustment-line-items.json`. Web: https://developers.procore.com/reference/rest/budget-change-adjustment-line-items?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/budget_changes/adjustment_line_items  **[BETA]**

**Get Adjustment and Adjustment Line Items of a Project**
Get Adjustment and Adjustment Line Items of a Project. Each page will have a maximum of 100 items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `budget_change_id` [query] string - Restrict results to adjustment line items belonging to this budget change. Pass the budget_change_id returned on each line item to fetch only that budget change's adjustments.
- `adjustment_id` [query] string - Restrict results to line items within this specific adjustment. Use together with budget_change_id to narrow to a single adjustment group.

Response 200 (application/json): object

- `data`: array of object - Array of Budget Change Adjustment Line Items
  - `id`: string - ID of the line item. ID can be combined with the type to uniquely identify an adjustment line item for a project e.g. `56`
  - `adjustment_number`: integer - The number of the adjustment this line item belongs to e.g. `5`
  - `wbs_code_id`: string - Identifier of the WBS (Work Breakdown Structure) code this line item is allocated to. Null when the line item is not yet assigned to a budget code. e.g. `76`
  - `amount`: number - Currency amount of this adjustment line item. Null when no amount has been set. e.g. `100`
  - `uom`: string - Unit of measure for this line item's quantity (e.g. 'ea'). Null when the line item is not quantity-based. e.g. `ea`
  - `quantity`: number - Quantity for this line item, expressed in the unit given by uom. Null when the line item is not quantity-based. e.g. `1`
  - `description`: string - Free-text description of this adjustment line item. Null when no description was provided. e.g. `This is a description`
  - `type`: string enum[change_event, budget_change] - Used to identify type of line item. Type can be combined with the ID to uniquely identify an adjustment line item for a project. Type change_event corresponds to the first line in an adjustment in the UI. The subseque... e.g. `change_event`
  - `budget_change_number`: string - The number of the budget change this line item belongs to e.g. `1`
  - `budget_change_status`: string enum[approved, draft, under_review, void] - The status of the budget change e.g. `approved`
  - `budget_change_name`: string - The name of the budget change e.g. `Budget Change 1`
  - `budget_change_id`: string - The ID of the budget change e.g. `1`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Budget Change History

Resource id: `budget-change-history`. Raw spec: `../openapi-raw/budget-change-history.json`. Web: https://developers.procore.com/reference/rest/budget-change-history?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/budget_change_history

**List of Budget Change Histories**
Returns the list of Budget Change Histories for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Request body (application/json):

- `filters`: object - A collection of named filters to apply to the change history query. Currently only supports the `segments` filter.
  - `segments`: array of object - An array of segment filter objects. Each object specifies the segment ID, the tier (if applicable), and the array of segment-option IDs to filter by.
    - `id`: string - The segment identifier. e.g. `18911`
    - `tier`: string - The tier for the segment (if applicable). Set to `null` if not used. e.g. `1`
    - `values`: array of string - An array of segment-option IDs for the given segment/tier.

Response 200 (application/json): object

- `data`: object
  - `budget_code`: string - The Work Breakdown Structure (WBS) code of the affected budget line, made up of its segment values concatenated by the company's configured delimiter. Identifies which budget line the change applies to. e.g. `01-001.C`
  - `description`: string - Human-readable description of the budget code (the WBS line item name). e.g. `Concrete - Labor`
  - `type`: string - Localized label describing which budget entity was changed (for example a budget line item, a forecast value, or a specific column). e.g. `Budget Line Item`
  - `column`: string - Localized name of the budget column whose value changed. e.g. `Original Budget Amount`
  - `created_at`: string - When the change was recorded, returned as a localized, human-readable display string (not ISO 8601). Format depends on the project's locale and timezone. e.g. `Jan 15, 2025 at 09:42 am PST`
  - `created_by`: string - Display name of the user who made the change, formatted for the company. e.g. `Doe, John`
  - `new_value`: string - The column's value after the change, formatted for display (currency, percentage, number, or option label depending on the column). e.g. `$12,500.00`
  - `old_value`: string - The column's value before the change, formatted for display (currency, percentage, number, or option label depending on the column). e.g. `$10,000.00`

Error responses: 400, 401, 403, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Budget Detail Columns

Resource id: `budget-detail-columns`. Raw spec: `../openapi-raw/budget-detail-columns.json`. Web: https://developers.procore.com/reference/rest/budget-detail-columns?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/budget_views/{budget_view_id}/budget_detail_columns

**List Budget Detail Columns**
Return a list of columns relevant to a Budget View for a Budget Detail Report.
Note: The ID field of each Budget Column will appear as keys in rows returned by the List Budget Details API.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `budget_view_id` [path] integer (required) - Budget View ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `aggregatable`: boolean - Whether this column's values can be summed when budget detail rows are grouped. true for numeric columns that are meaningful to total; false for descriptive or identifier columns. e.g. `true`
- `filterable`: boolean - Whether budget detail rows can be filtered by this column. When true, pass this column's id as column_id to the List Budget Detail Filter Options API to retrieve the valid filter values. e.g. `true`
- `groupable`: boolean - Whether budget detail rows can be grouped (subtotaled) by this column's values. e.g. `true`
- `id`: string - Identifier of the column, returned as a string. Appears as a key on each row of the List Budget Details response. Standard columns use slugs (e.g. 'biller', 'cost_code', 'detail_type'); template columns use the numeri... e.g. `biller`
- `name`: string - Localized, human-readable display name of the column as shown in the Budget Detail Report. e.g. `Detail Type`
- `position`: integer - Ordering index controlling the left-to-right placement of columns in the Budget Detail Report. Standard columns use negative positions so they sort ahead of configurable template columns, which use their own non-negat... e.g. `1`
- `type`: string enum[standard, source, budget_forecast] - Classification of the column, indicating what kind of data it represents. e.g. `source`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Budget Detail Filters

Resource id: `budget-detail-filters`. Raw spec: `../openapi-raw/budget-detail-filters.json`. Web: https://developers.procore.com/reference/rest/budget-detail-filters?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/budget_detail_filters

**List Budget Detail Filter Options**
Returns a list of valid filter options when given a specific filter type.
Note: When using "biller" for column_id, the "value" key will contain objects, not integers.
These objects will have a "type" field and a "value" field. Type indicates whether the biller
is a Sub Job or a Project and will be a string. "value" contains the ID of the biller and will be an array of integers.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `column_id` [query] string enum[biller, root_cost_code, cost_code, cost_type, vendor, detail_type] (required) - Type of filter options to return

Response 200 (application/json): array of object

- `label`: string - Localized display label for the filter option (for example a cost code's long name, a vendor name, or "None"). Options that share the same label are grouped into a single entry. e.g. `01-000 - Purpose`
- `value`: array of integer - Record IDs represented by this option. Pass these values in the "filters" object of the List Budget Details request to filter rows by this option. A single option can contain multiple IDs when records share the same l...

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Budget Details

Resource id: `budget-details`. Raw spec: `../openapi-raw/budget-details.json`. Web: https://developers.procore.com/reference/rest/budget-details?version=latest
Product lines: Construction Financials

### POST /rest/v1.0/budget_views/{budget_view_id}/budget_details

**List Budget Details**
Return a list of all rows from the Budget Detail Report for a Project and Budget View.
Note:
In addition to all the fields outlined in the response example, there will be an additional key for each visible,
non-formula, non-qualitative column (Ex: Original Budget Amount, Budget Modifications, Forecast to Complete, and Source Columns).
The integer keys returned represent the IDs of the budget columns which are returned by the Budget Detail Columns API.
As well, valid filter values can be found through the Budget Detail Filter Options API.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `budget_view_id` [path] integer (required) - Budget View ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `filters`: object - Optional filters restricting which budget detail rows are returned. Each key corresponds to a filterable column; valid values are obtained from the List Budget Detail Filter Options API.
  - `biller`: array of object - Filter rows by biller (Project or Sub Job). Each entry targets a Project or Sub Job by id and type.
    - `value`: array of integer - IDs of the Projects or Sub Jobs to filter by
    - `type`: string enum[Project, SubJob] - Whether the value identifies a Project or a Sub Job. e.g. `SubJob`
    - `name`: string - Display name of the Project or Sub Job e.g. `North Building`
  - `cost_code`: array of integer - Filter rows by Cost Code id.
  - `root_cost_code`: array of integer - Filter rows by Division (root cost code) id.
  - `cost_type`: array of integer - Filter rows by Cost Type id.
  - `vendor`: array of integer - Filter rows by Vendor id.
  - `detail_type`: array of string - Filter rows by detail type value.

Response 200 (application/json): array of object

- `biller`: object - The Project or Sub Job (biller) the row is attributed to. Filter by passing its id under filters.biller in the List Budget Details request.
  - `id`: integer e.g. `5`
  - `name`: string e.g. `Renovations for Tower B`
- `contract`: object - The contract associated with the row, when the source is a contract.
  - `id`: integer e.g. `123`
  - `name`: string e.g. `Framing Subcontract`
- `cost_code`: object - The Cost Code for the row. Filter by passing its id under filters.cost_code in the List Budget Details request.
  - `id`: integer e.g. `123`
  - `name`: string e.g. `01-000 - Purpose`
- `cost_type`: object - The Cost Type (line item type) for the row. Filter by passing its id under filters.cost_type in the List Budget Details request.
  - `id`: integer e.g. `123`
  - `name`: string e.g. `Labor`
- `description`: string - Free-text description of the underlying source record for the row. Null when the source has no description. e.g. `Lumber materials`
- `detail_type`: object - The type of source record the row represents (e.g. a commitment contract, direct cost, or forecast item). Filter by passing the id under filters.detail_type in the List Budget Details request.
  - `id`: string e.g. `commitment_contract`
  - `name`: string e.g. `Commitment Contract`
- `id`: string - Unique identifier of the budget detail row, formed from the source record type and its id (e.g. "budget_line_items-12345"). e.g. `budget_line_items-12345`
- `item`: string - Human-readable reference to the underlying source record (e.g. an invoice or contract line). Null when there is no associated item. e.g. `Invoice #0098: Lumber for northern wall`
- `link`: string - Web app URL where the source record for this row can be viewed. Null when the source has no linkable location. e.g. `https://app.procore.com/221781/project/commitments/work_order_contracts/4137556`
- `root_cost_code`: object - The Division (root cost code) of the row's cost code. Filter by passing its id under filters.root_cost_code in the List Budget Details request.
  - `id`: integer e.g. `5`
  - `name`: string e.g. `01 - General Requirements`
- `vendor`: object - The Vendor for the row. Filter by passing its id under filters.vendor in the List Budget Details request.
  - `id`: integer e.g. `123`
  - `name`: string e.g. `Fantastic Framers, LLC`
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`

Error responses: 400, 401, 403, 408, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Budget Line Items

Resource id: `budget-line-items`. Raw spec: `../openapi-raw/budget-line-items.json`. Web: https://developers.procore.com/reference/rest/budget-line-items?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/budget_line_items  **[BETA]**

**List Budget Line Items**
Returns a paginated list of budget line items for a project. Each page has a maximum of 100 items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - ID of the company
- `project_id` [path] string (required) - ID of the project
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[wbs_code_id]` [query] array of string - Work Breakdown Structure Code ID(s). Returns only budget line items for the specified WBS Code ID(s).

Response 200 (application/json): object

- `data`: array of object - Array of budget line items
  - `id`: string - Budget line item ID e.g. `123`
  - `original_budget_amount`: string - Original budget amount e.g. `10000.0`
  - `quantity`: number - Quantity e.g. `250.5`
  - `uom`: string - Unit of measure e.g. `hours`
  - `unit_cost`: string - Unit cost e.g. `40.0`
  - `calculation_strategy`: string enum[automatic, manual] - Calculation strategy e.g. `manual`
  - `project_id`: string - Project ID e.g. `456`
  - `company_id`: string - Company ID e.g. `789`
  - `updated_at`: string(date-time) - Last updated timestamp
  - `created_at`: string(date-time) - Created timestamp
  - `wbs_code`: object - WBS Code details for the line item
    - `id`: string - WBS Code ID e.g. `999`
    - `flat_code`: string - WBS Code flat code e.g. `01-011.CT1`
    - `description`: string - WBS Code description e.g. `Earthwork.Equipment`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It will be populated only when multicurrency phase two feature flag is enabled e.g. `1.234567`

Error responses: 400, 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/budget_line_items/{id}

**Delete Budget Line Item**
Deletes a specified budget line item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - ID of the company
- `project_id` [path] string (required) - ID of the project
- `id` [path] string (required) - ID of the budget line item

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/budget_line_items

**Create Budget Line Item**
Add a new line item to a budget.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `12345`
- `budget_line_item`: object (required) - Budget Line Item object
  - `wbs_code_id`: integer (required) - ID of the Work Breakdown Structure (WBS) code to budget this line against. Required. e.g. `67890`
  - `original_budget_amount`: number(float) - Original budgeted amount for this line. e.g. `10000.00`
  - `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure for the quantity, such as hours. Must be a value from the company's Units of Measure list. e.g. `hours`
  - `quantity`: number(float) - Budgeted quantity in the unit of measure. Used with unit_cost when calculation_strategy is 'automatic'. e.g. `250.5`
  - `unit_cost`: number(float) - Cost per unit of measure. Used with quantity when calculation_strategy is 'automatic'. e.g. `123.5`
  - `calculation_strategy`: string enum[automatic, manual] - Determines how the budgeted amount is derived for this line. e.g. `manual`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this budget line item. Use as the {id} path parameter for the Show and Update endpoints. e.g. `75414`
- `original_budget_amount`: number(float) - Original budgeted amount for this line, before any budget changes. e.g. `20000.0`
- `uom`: string - Unit of measure for the line's quantity, such as hours. Any value from the company's configured Units of Measure list. e.g. `hours`
- `quantity`: number(float) - Budgeted quantity in the line's unit of measure. Multiplied by unit_cost when calculation_strategy is 'automatic'. e.g. `250.5`
- `unit_cost`: number(float) - Cost per unit of measure. Multiplied by quantity when calculation_strategy is 'automatic'. e.g. `123.5`
- `calculation_strategy`: string - How original_budget_amount is derived, such as entered directly ('manual') or computed from quantity and unit_cost ('automatic'). e.g. `manual`
- `wbs_code`: object - Work Breakdown Structure (WBS) code this line item is budgeted against. e.g. `{"id": 44, "flat_code": "2.E", "description": "Earthwork.Equipment"}`
  - `id`: integer - Unique identifier of the WBS code. Pass as wbs_code_id when creating or updating a line item. e.g. `999`
  - `flat_code`: string - Flattened WBS code string combining all segment values. e.g. `01-011.CT1`
  - `description`: string - Human-readable description of the WBS code. e.g. `Project Engineer.Cost Type 1`
- `currency_configuration`: object - Currency in which this line item's monetary amounts are denominated.
  - `currency_iso_code`: string - ISO 4217 currency code for the line item's amounts. e.g. `USD`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/budget_line_items/{id}

**Show Budget Line Item**
Return information about a Budget Line Item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Unique identifier for this budget line item. Use as the {id} path parameter for the Show and Update endpoints. e.g. `75414`
- `original_budget_amount`: number(float) - Original budgeted amount for this line, before any budget changes. e.g. `20000.0`
- `uom`: string - Unit of measure for the line's quantity, such as hours. Any value from the company's configured Units of Measure list. e.g. `hours`
- `quantity`: number(float) - Budgeted quantity in the line's unit of measure. Multiplied by unit_cost when calculation_strategy is 'automatic'. e.g. `250.5`
- `unit_cost`: number(float) - Cost per unit of measure. Multiplied by quantity when calculation_strategy is 'automatic'. e.g. `123.5`
- `calculation_strategy`: string - How original_budget_amount is derived, such as entered directly ('manual') or computed from quantity and unit_cost ('automatic'). e.g. `manual`
- `wbs_code`: object - Work Breakdown Structure (WBS) code this line item is budgeted against. e.g. `{"id": 44, "flat_code": "2.E", "description": "Earthwork.Equipment"}`
  - `id`: integer - Unique identifier of the WBS code. Pass as wbs_code_id when creating or updating a line item. e.g. `999`
  - `flat_code`: string - Flattened WBS code string combining all segment values. e.g. `01-011.CT1`
  - `description`: string - Human-readable description of the WBS code. e.g. `Project Engineer.Cost Type 1`
- `currency_configuration`: object - Currency in which this line item's monetary amounts are denominated.
  - `currency_iso_code`: string - ISO 4217 currency code for the line item's amounts. e.g. `USD`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/budget_line_items/{id}

**Update Budget Line Item**
Update a line item of a specified budget.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `12345`
- `budget_line_item`: object (required) - Budget Line Item object
  - `wbs_code_id`: integer - ID of the Work Breakdown Structure (WBS) code to budget this line against. e.g. `67890`
  - `original_budget_amount`: number(float) - Original budgeted amount for this line, before any budget changes. e.g. `10000.00`
  - `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure for the quantity, such as hours. Must be a value from the company's Units of Measure list. e.g. `hours`
  - `quantity`: number(float) - Budgeted quantity in the unit of measure. Used with unit_cost when calculation_strategy is 'automatic'. e.g. `250.5`
  - `unit_cost`: number(float) - Cost per unit of measure. Used with quantity when calculation_strategy is 'automatic'. e.g. `123.5`
  - `calculation_strategy`: string enum[automatic, manual] - Determines how the budgeted amount is derived for this line. e.g. `manual`

Response 200 (application/json): object

- `id`: integer - Unique identifier for this budget line item. Use as the {id} path parameter for the Show and Update endpoints. e.g. `75414`
- `original_budget_amount`: number(float) - Original budgeted amount for this line, before any budget changes. e.g. `20000.0`
- `uom`: string - Unit of measure for the line's quantity, such as hours. Any value from the company's configured Units of Measure list. e.g. `hours`
- `quantity`: number(float) - Budgeted quantity in the line's unit of measure. Multiplied by unit_cost when calculation_strategy is 'automatic'. e.g. `250.5`
- `unit_cost`: number(float) - Cost per unit of measure. Multiplied by quantity when calculation_strategy is 'automatic'. e.g. `123.5`
- `calculation_strategy`: string - How original_budget_amount is derived, such as entered directly ('manual') or computed from quantity and unit_cost ('automatic'). e.g. `manual`
- `wbs_code`: object - Work Breakdown Structure (WBS) code this line item is budgeted against. e.g. `{"id": 44, "flat_code": "2.E", "description": "Earthwork.Equipment"}`
  - `id`: integer - Unique identifier of the WBS code. Pass as wbs_code_id when creating or updating a line item. e.g. `999`
  - `flat_code`: string - Flattened WBS code string combining all segment values. e.g. `01-011.CT1`
  - `description`: string - Human-readable description of the WBS code. e.g. `Project Engineer.Cost Type 1`
- `currency_configuration`: object - Currency in which this line item's monetary amounts are denominated.
  - `currency_iso_code`: string - ISO 4217 currency code for the line item's amounts. e.g. `USD`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/budget_line_items/sync  **[BETA]**

**Sync Budget Line Items**
Create or update multiple Budget Line Items

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Project ID e.g. `12345`
- `budget_line_items`: array of object (required)
  - `wbs_code_id`: integer (required) - ID of the Work Breakdown Structure (WBS) code to budget this line against. Required. e.g. `67890`
  - `original_budget_amount`: number(float) - Original budgeted amount for this line. e.g. `10000.00`
  - `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure for the quantity, such as hours. Must be a value from the company's Units of Measure list. e.g. `hours`
  - `quantity`: number(float) - Budgeted quantity in the unit of measure. Used with unit_cost when calculation_strategy is 'automatic'. e.g. `250.5`
  - `unit_cost`: number(float) - Cost per unit of measure. Used with quantity when calculation_strategy is 'automatic'. e.g. `123.5`
  - `calculation_strategy`: string enum[automatic, manual] - Determines how the budgeted amount is derived for this line. e.g. `manual`
  - `id`: integer - Budget Line Item ID e.g. `1232`

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this budget line item. Use as the {id} path parameter for the Show and Update endpoints. e.g. `75414`
- `original_budget_amount`: number(float) - Original budgeted amount for this line, before any budget changes. e.g. `20000.0`
- `uom`: string - Unit of measure for the line's quantity, such as hours. Any value from the company's configured Units of Measure list. e.g. `hours`
- `quantity`: number(float) - Budgeted quantity in the line's unit of measure. Multiplied by unit_cost when calculation_strategy is 'automatic'. e.g. `250.5`
- `unit_cost`: number(float) - Cost per unit of measure. Multiplied by quantity when calculation_strategy is 'automatic'. e.g. `123.5`
- `calculation_strategy`: string - How original_budget_amount is derived, such as entered directly ('manual') or computed from quantity and unit_cost ('automatic'). e.g. `manual`
- `wbs_code`: object - Work Breakdown Structure (WBS) code this line item is budgeted against. e.g. `{"id": 44, "flat_code": "2.E", "description": "Earthwork.Equipment"}`
  - `id`: integer - Unique identifier of the WBS code. Pass as wbs_code_id when creating or updating a line item. e.g. `999`
  - `flat_code`: string - Flattened WBS code string combining all segment values. e.g. `01-011.CT1`
  - `description`: string - Human-readable description of the WBS code. e.g. `Project Engineer.Cost Type 1`
- `currency_configuration`: object - Currency in which this line item's monetary amounts are denominated.
  - `currency_iso_code`: string - ISO 4217 currency code for the line item's amounts. e.g. `USD`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/budget_line_items  **[OLDER VERSION - a newer path version exists below/above]**

**Create Budget Line Item**
Add a new line item to a budget.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `12345`
- `budget_line_item`: object (required) - Budget Line Item object
  - `cost_code_id`: integer (required) - ID of the cost code to budget this line against. Must belong to the project or one of its sub jobs. e.g. `12345`
  - `line_item_type_id`: integer (required) - ID of the line item type (cost type), such as Labor or Equipment. Must belong to the project's company. e.g. `12345`
  - `original_budget_amount`: number(float) - Original budgeted amount for this line, before any budget changes. e.g. `10000.00`
  - `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure for the quantity, such as hours. Must be a value from the company's Units of Measure list. e.g. `hours`
  - `quantity`: number(float) - Budgeted quantity in the unit of measure. Used with unit_cost when calculation_strategy is 'automatic'. e.g. `250.5`
  - `unit_cost`: number(float) - Cost per unit of measure. Used with quantity when calculation_strategy is 'automatic'. e.g. `123.5`
  - `calculation_strategy`: string enum[automatic, manual] - Determines how the budgeted amount is derived for this line. e.g. `manual`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this budget line item. Use as the {id} path parameter for the Show and Update endpoints. e.g. `75414`
- `original_budget_amount`: number(float) - Original budgeted amount for this line. e.g. `20000.0`
- `uom`: string - Unit of measure for the line's quantity (e.g., hours, each, sq ft). Any value from the company's configured Units of Measure list. e.g. `hours`
- `quantity`: number(float) - Budgeted quantity in the line's unit of measure. Multiplied by unit_cost when calculation_strategy is 'automatic' to become the original_budget_amount. e.g. `250.5`
- `unit_cost`: number(float) - Cost per unit of measure. Multiplied by quantity when calculation_strategy is 'automatic'. e.g. `123.5`
- `calculation_strategy`: string - How original_budget_amount is derived, such as entered directly ('manual') or computed from quantity and unit_cost ('automatic'). e.g. `manual`
- `approved_budget_changes`: number(float) - Sum of approved budget changes applied to this line. e.g. `0.0`
- `revised_budget`: number(float) - Current budget after approved budget changes (original_budget_amount plus approved_budget_changes). e.g. `20000.0`
- `pending_budget_changes`: number(float) - Sum of budget changes that are proposed but not yet approved. e.g. `0.0`
- `projected_budget`: number(float) - Forecasted budget including both approved and pending budget changes. e.g. `20000.0`
- `committed_costs`: number(float) - Total costs committed against this line through commitments such as purchase orders and subcontracts. e.g. `0.0`
- `direct_costs`: number(float) - Total direct costs (e.g., invoices, expenses, timecards) recorded against this line. e.g. `0.0`
- `pending_cost_changes`: number(float) - Sum of cost changes that are proposed but not yet approved. e.g. `0.0`
- `projected_costs`: number(float) - Forecasted total cost at completion, including committed costs, direct costs, and pending cost changes. e.g. `0.0`
- `budget_modifications`: number(float) - Net amount transferred to or from this line via budget modifications. Positive when funds are transferred in, negative when transferred out. e.g. `0.0`
- `budget_forecast`: number(float) - Forecasted budget amount for this line, used when projecting costs over the schedule. e.g. `20000.0`
- `estimated_cost_at_completion`: number(float) - Estimated final cost of this line when work is complete. e.g. `20000.0`
- `projected_over_under`: number(float) - Projected budget surplus or shortfall (projected_budget minus projected_costs). Negative values indicate an expected overrun. e.g. `0.0`
- `cost_code`: object - Cost code this line item is budgeted against.
  - `id`: integer - Unique identifier of the cost code. e.g. `32780682`
  - `name`: string - Human-readable name of the cost code. e.g. `Wood Sub-floors`
  - `code`: string - Short cost code segment for this level. e.g. `162`
  - `full_code`: string - Fully qualified cost code including parent segments. e.g. `17-162`
- `division`: object - Root cost code (division) that groups this line item.
  - `id`: integer - Unique identifier of the division (root cost code). e.g. `236246`
  - `name`: string - Human-readable name of the division. e.g. `Wood floors`
  - `full_code`: string - Cost code of the division. e.g. `11-123`
- `line_item_type`: object - Line item type (cost type) categorizing this line, such as Labor or Equipment.
  - `id`: integer - Unique identifier of the line item type. e.g. `23107`
  - `name`: string - Human-readable name of the line item type. e.g. `Equipment`
- `currency_configuration`: object - Currency in which this line item's monetary amounts are denominated.
  - `currency_iso_code`: string - ISO 4217 currency code for the line item's amounts. e.g. `USD`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/budget_line_items/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Show Budget Line Item**
Return information about a Budget Line Item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Unique identifier for this budget line item. Use as the {id} path parameter for the Show and Update endpoints. e.g. `75414`
- `original_budget_amount`: number(float) - Original budgeted amount for this line. e.g. `20000.0`
- `uom`: string - Unit of measure for the line's quantity (e.g., hours, each, sq ft). Any value from the company's configured Units of Measure list. e.g. `hours`
- `quantity`: number(float) - Budgeted quantity in the line's unit of measure. Multiplied by unit_cost when calculation_strategy is 'automatic' to become the original_budget_amount. e.g. `250.5`
- `unit_cost`: number(float) - Cost per unit of measure. Multiplied by quantity when calculation_strategy is 'automatic'. e.g. `123.5`
- `calculation_strategy`: string - How original_budget_amount is derived, such as entered directly ('manual') or computed from quantity and unit_cost ('automatic'). e.g. `manual`
- `approved_budget_changes`: number(float) - Sum of approved budget changes applied to this line. e.g. `0.0`
- `revised_budget`: number(float) - Current budget after approved budget changes (original_budget_amount plus approved_budget_changes). e.g. `20000.0`
- `pending_budget_changes`: number(float) - Sum of budget changes that are proposed but not yet approved. e.g. `0.0`
- `projected_budget`: number(float) - Forecasted budget including both approved and pending budget changes. e.g. `20000.0`
- `committed_costs`: number(float) - Total costs committed against this line through commitments such as purchase orders and subcontracts. e.g. `0.0`
- `direct_costs`: number(float) - Total direct costs (e.g., invoices, expenses, timecards) recorded against this line. e.g. `0.0`
- `pending_cost_changes`: number(float) - Sum of cost changes that are proposed but not yet approved. e.g. `0.0`
- `projected_costs`: number(float) - Forecasted total cost at completion, including committed costs, direct costs, and pending cost changes. e.g. `0.0`
- `budget_modifications`: number(float) - Net amount transferred to or from this line via budget modifications. Positive when funds are transferred in, negative when transferred out. e.g. `0.0`
- `budget_forecast`: number(float) - Forecasted budget amount for this line, used when projecting costs over the schedule. e.g. `20000.0`
- `estimated_cost_at_completion`: number(float) - Estimated final cost of this line when work is complete. e.g. `20000.0`
- `projected_over_under`: number(float) - Projected budget surplus or shortfall (projected_budget minus projected_costs). Negative values indicate an expected overrun. e.g. `0.0`
- `cost_code`: object - Cost code this line item is budgeted against.
  - `id`: integer - Unique identifier of the cost code. e.g. `32780682`
  - `name`: string - Human-readable name of the cost code. e.g. `Wood Sub-floors`
  - `code`: string - Short cost code segment for this level. e.g. `162`
  - `full_code`: string - Fully qualified cost code including parent segments. e.g. `17-162`
- `division`: object - Root cost code (division) that groups this line item.
  - `id`: integer - Unique identifier of the division (root cost code). e.g. `236246`
  - `name`: string - Human-readable name of the division. e.g. `Wood floors`
  - `full_code`: string - Cost code of the division. e.g. `11-123`
- `line_item_type`: object - Line item type (cost type) categorizing this line, such as Labor or Equipment.
  - `id`: integer - Unique identifier of the line item type. e.g. `23107`
  - `name`: string - Human-readable name of the line item type. e.g. `Equipment`
- `currency_configuration`: object - Currency in which this line item's monetary amounts are denominated.
  - `currency_iso_code`: string - ISO 4217 currency code for the line item's amounts. e.g. `USD`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/budget_line_items/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Update Budget Line Item**
Update a line item of a specified budget.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `12345`
- `budget_line_item`: object (required) - Budget Line Item object
  - `cost_code_id`: integer - ID of the cost code to budget this line against. Must belong to the project or one of its sub jobs. e.g. `12345`
  - `line_item_type_id`: integer - ID of the line item type (cost type), such as Labor or Equipment. Must belong to the project's company. e.g. `12345`
  - `original_budget_amount`: number(float) - Original budgeted amount for this line, before any budget changes. e.g. `10000.00`
  - `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure for the quantity, such as hours. Must be a value from the company's Units of Measure list. e.g. `hours`
  - `quantity`: number(float) - Budgeted quantity in the unit of measure. Used with unit_cost when calculation_strategy is 'automatic'. e.g. `250.5`
  - `unit_cost`: number(float) - Cost per unit of measure. Used with quantity when calculation_strategy is 'automatic'. e.g. `123.5`
  - `calculation_strategy`: string enum[automatic, manual] - Determines how the budgeted amount is derived for this line. e.g. `manual`
  - `direct_costs`: number(float) - Direct costs recorded against this line. Include only when the Direct Costs tool is turned off for the project. e.g. `2450.35`

Response 200 (application/json): object

- `id`: integer - Unique identifier for this budget line item. Use as the {id} path parameter for the Show and Update endpoints. e.g. `75414`
- `original_budget_amount`: number(float) - Original budgeted amount for this line. e.g. `20000.0`
- `uom`: string - Unit of measure for the line's quantity (e.g., hours, each, sq ft). Any value from the company's configured Units of Measure list. e.g. `hours`
- `quantity`: number(float) - Budgeted quantity in the line's unit of measure. Multiplied by unit_cost when calculation_strategy is 'automatic' to become the original_budget_amount. e.g. `250.5`
- `unit_cost`: number(float) - Cost per unit of measure. Multiplied by quantity when calculation_strategy is 'automatic'. e.g. `123.5`
- `calculation_strategy`: string - How original_budget_amount is derived, such as entered directly ('manual') or computed from quantity and unit_cost ('automatic'). e.g. `manual`
- `approved_budget_changes`: number(float) - Sum of approved budget changes applied to this line. e.g. `0.0`
- `revised_budget`: number(float) - Current budget after approved budget changes (original_budget_amount plus approved_budget_changes). e.g. `20000.0`
- `pending_budget_changes`: number(float) - Sum of budget changes that are proposed but not yet approved. e.g. `0.0`
- `projected_budget`: number(float) - Forecasted budget including both approved and pending budget changes. e.g. `20000.0`
- `committed_costs`: number(float) - Total costs committed against this line through commitments such as purchase orders and subcontracts. e.g. `0.0`
- `direct_costs`: number(float) - Total direct costs (e.g., invoices, expenses, timecards) recorded against this line. e.g. `0.0`
- `pending_cost_changes`: number(float) - Sum of cost changes that are proposed but not yet approved. e.g. `0.0`
- `projected_costs`: number(float) - Forecasted total cost at completion, including committed costs, direct costs, and pending cost changes. e.g. `0.0`
- `budget_modifications`: number(float) - Net amount transferred to or from this line via budget modifications. Positive when funds are transferred in, negative when transferred out. e.g. `0.0`
- `budget_forecast`: number(float) - Forecasted budget amount for this line, used when projecting costs over the schedule. e.g. `20000.0`
- `estimated_cost_at_completion`: number(float) - Estimated final cost of this line when work is complete. e.g. `20000.0`
- `projected_over_under`: number(float) - Projected budget surplus or shortfall (projected_budget minus projected_costs). Negative values indicate an expected overrun. e.g. `0.0`
- `cost_code`: object - Cost code this line item is budgeted against.
  - `id`: integer - Unique identifier of the cost code. e.g. `32780682`
  - `name`: string - Human-readable name of the cost code. e.g. `Wood Sub-floors`
  - `code`: string - Short cost code segment for this level. e.g. `162`
  - `full_code`: string - Fully qualified cost code including parent segments. e.g. `17-162`
- `division`: object - Root cost code (division) that groups this line item.
  - `id`: integer - Unique identifier of the division (root cost code). e.g. `236246`
  - `name`: string - Human-readable name of the division. e.g. `Wood floors`
  - `full_code`: string - Cost code of the division. e.g. `11-123`
- `line_item_type`: object - Line item type (cost type) categorizing this line, such as Labor or Equipment.
  - `id`: integer - Unique identifier of the line item type. e.g. `23107`
  - `name`: string - Human-readable name of the line item type. e.g. `Equipment`
- `currency_configuration`: object - Currency in which this line item's monetary amounts are denominated.
  - `currency_iso_code`: string - ISO 4217 currency code for the line item's amounts. e.g. `USD`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Budget Modifications

Resource id: `budget-modifications`. Raw spec: `../openapi-raw/budget-modifications.json`. Web: https://developers.procore.com/reference/rest/budget-modifications?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/projects/{project_id}/budget_modifications

**List Budget Modifications**
Returns a list of all Budget Modifications for a project. For more information on the Budget Changes API, see our documentation on [upgrading from the Budget Modifications API to the Budget Changes API](https://developers.procore.com/documentation/tutorial-budget-changes-api).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this budget modification (a transfer between budget line items). Use as the {id} path parameter for the Show, Update, and Delete endpoints. e.g. `75414`
- `created_at`: string(date-time) - Timestamp when this budget modification was created, in ISO 8601 format. e.g. `2016-10-23T21:39:40Z`
- `from_budget_line_item_id`: integer - ID of the budget line item that funds are transferred from. Null when the modification only adds to the grand total rather than moving funds between lines. e.g. `348383`
- `notes`: string - Free-text notes describing the reason for the transfer. e.g. `Transfer money for extra concrete.`
- `origin_data`: string - Free-text reference data associating this modification with an external system record. e.g. `OD-3483830-2`
- `origin_id`: string - External system identifier for this modification, unique within the company. Use to reconcile with the source system. e.g. `4903400`
- `to_budget_line_item_id`: integer - ID of the budget line item that funds are transferred to. e.g. `4034034`
- `transfer_amount`: string(float) - Amount transferred from the source budget line item to the target budget line item. e.g. `4500.0`
- `updated_at`: string(date-time) - Timestamp when this budget modification was last updated, in ISO 8601 format. e.g. `2016-11-23T21:39:40Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/budget_modifications  **[DEPRECATED]**

**Create Budget Modification**
Creates a Budget Modification only if Budget Changes are not enabled.
This endpoint will be deprecated at October 16th of 2023. For more information on the Budget Changes API, see our documentation on [upgrading from the Budget Modifications API to the Budget Changes API](https://developers.procore.com/documentation/tutorial-budget-changes-api).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `budget_modification`: object (required)
  - `from_budget_line_item_id`: integer - ID of the Budget Line Item to transfer from. NOTE 1: required if 'Allow Budget Modifications Which Modify Grand Total' is not checked. NOTE 2: When updating if you want to remove the from_budget_line_item_id reference... e.g. `348383`
  - `notes`: string - Notes on the purpose of the transfer e.g. `Transfer money for extra concrete.`
  - `origin_data`: string - The Origin Data to associate with this Budget Modification e.g. `OD-3483830-2`
  - `origin_id`: string - The Origin ID to associate with this Budget Modification (must be unique within a company) e.g. `4903400`
  - `to_budget_line_item_id`: integer (required) - ID of the Budget Line Item to transfer to. NOTE: You may not pass the same to_budget_line_item_id as from_budget_line_item_id. e.g. `4034034`
  - `transfer_amount`: string(float) (required) - Transfer amount e.g. `4500.0`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this budget modification (a transfer between budget line items). Use as the {id} path parameter for the Show, Update, and Delete endpoints. e.g. `75414`
- `created_at`: string(date-time) - Timestamp when this budget modification was created, in ISO 8601 format. e.g. `2016-10-23T21:39:40Z`
- `from_budget_line_item_id`: integer - ID of the budget line item that funds are transferred from. Null when the modification only adds to the grand total rather than moving funds between lines. e.g. `348383`
- `notes`: string - Free-text notes describing the reason for the transfer. e.g. `Transfer money for extra concrete.`
- `origin_data`: string - Free-text reference data associating this modification with an external system record. e.g. `OD-3483830-2`
- `origin_id`: string - External system identifier for this modification, unique within the company. Use to reconcile with the source system. e.g. `4903400`
- `to_budget_line_item_id`: integer - ID of the budget line item that funds are transferred to. e.g. `4034034`
- `transfer_amount`: string(float) - Amount transferred from the source budget line item to the target budget line item. e.g. `4500.0`
- `updated_at`: string(date-time) - Timestamp when this budget modification was last updated, in ISO 8601 format. e.g. `2016-11-23T21:39:40Z`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/budget_modifications/{id}

**Show Budget Modification**
Returns detailed information on a specified Budget Modification. For more information on the Budget Changes API, see our documentation on [upgrading from the Budget Modifications API to the Budget Changes API](https://developers.procore.com/documentation/tutorial-budget-changes-api).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `id`: integer - Unique identifier for this budget modification (a transfer between budget line items). Use as the {id} path parameter for the Show, Update, and Delete endpoints. e.g. `75414`
- `created_at`: string(date-time) - Timestamp when this budget modification was created, in ISO 8601 format. e.g. `2016-10-23T21:39:40Z`
- `from_budget_line_item_id`: integer - ID of the budget line item that funds are transferred from. Null when the modification only adds to the grand total rather than moving funds between lines. e.g. `348383`
- `notes`: string - Free-text notes describing the reason for the transfer. e.g. `Transfer money for extra concrete.`
- `origin_data`: string - Free-text reference data associating this modification with an external system record. e.g. `OD-3483830-2`
- `origin_id`: string - External system identifier for this modification, unique within the company. Use to reconcile with the source system. e.g. `4903400`
- `to_budget_line_item_id`: integer - ID of the budget line item that funds are transferred to. e.g. `4034034`
- `transfer_amount`: string(float) - Amount transferred from the source budget line item to the target budget line item. e.g. `4500.0`
- `updated_at`: string(date-time) - Timestamp when this budget modification was last updated, in ISO 8601 format. e.g. `2016-11-23T21:39:40Z`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/budget_modifications/{id}  **[DEPRECATED]**

**Update Budget Modification**
Update a Budget Modification only if Budget Changes are not enabled.
This endpoint will be deprecated at October 16th of 2023. For more information on the Budget Changes API, see our documentation on [upgrading from the Budget Modifications API to the Budget Changes API](https://developers.procore.com/documentation/tutorial-budget-changes-api).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID

Request body (application/json) (required):

- `budget_modification`: object (required)
  - `from_budget_line_item_id`: integer - ID of the Budget Line Item to transfer from. NOTE 1: required if 'Allow Budget Modifications Which Modify Grand Total' is not checked. NOTE 2: When updating if you want to remove the from_budget_line_item_id reference... e.g. `348383`
  - `notes`: string - Notes on the purpose of the transfer e.g. `Transfer money for extra concrete.`
  - `origin_data`: string - The Origin Data to associate with this Budget Modification e.g. `OD-3483830-2`
  - `origin_id`: string - The Origin ID to associate with this Budget Modification (must be unique within a company) e.g. `4903400`
  - `to_budget_line_item_id`: integer (required) - ID of the Budget Line Item to transfer to. NOTE: You may not pass the same to_budget_line_item_id as from_budget_line_item_id. e.g. `4034034`
  - `transfer_amount`: string(float) (required) - Transfer amount e.g. `4500.0`

Response 200 (application/json): object

- `id`: integer - Unique identifier for this budget modification (a transfer between budget line items). Use as the {id} path parameter for the Show, Update, and Delete endpoints. e.g. `75414`
- `created_at`: string(date-time) - Timestamp when this budget modification was created, in ISO 8601 format. e.g. `2016-10-23T21:39:40Z`
- `from_budget_line_item_id`: integer - ID of the budget line item that funds are transferred from. Null when the modification only adds to the grand total rather than moving funds between lines. e.g. `348383`
- `notes`: string - Free-text notes describing the reason for the transfer. e.g. `Transfer money for extra concrete.`
- `origin_data`: string - Free-text reference data associating this modification with an external system record. e.g. `OD-3483830-2`
- `origin_id`: string - External system identifier for this modification, unique within the company. Use to reconcile with the source system. e.g. `4903400`
- `to_budget_line_item_id`: integer - ID of the budget line item that funds are transferred to. e.g. `4034034`
- `transfer_amount`: string(float) - Amount transferred from the source budget line item to the target budget line item. e.g. `4500.0`
- `updated_at`: string(date-time) - Timestamp when this budget modification was last updated, in ISO 8601 format. e.g. `2016-11-23T21:39:40Z`

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/budget_modifications/{id}  **[DEPRECATED]**

**Delete Budget Modification**
Delete a Budget Modification only if Budget Changes are not enabled.
This endpoint will be deprecated at October 16th of 2023. For more information on the Budget Changes API, see our documentation on [upgrading from the Budget Modifications API to the Budget Changes API](https://developers.procore.com/documentation/tutorial-budget-changes-api).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID

Response 200: OK (no body)

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Budget Notes

Resource id: `budget-notes`. Raw spec: `../openapi-raw/budget-notes.json`. Web: https://developers.procore.com/reference/rest/budget-notes?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/budget_notes/{wbs_code_id}  **[BETA]**

**Fetches a budget note**
Fetches the saved budget note for a WBS code. The data field is null when no note exists for the WBS code.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - ID of the company
- `project_id` [path] string (required) - ID of the project
- `wbs_code_id` [path] string (required) - ID of the WBS code

Response 200 (application/json): object

- `data`: object - Budget Notes
  - `note`: string - The note that was saved for a budget or a forecast row e.g. `A very important note`
  - `user`: string - Display name of the user who last created or updated the note. Null when no author history is available. e.g. `John Doe`
  - `updated_at`: string - Human-readable, locale- and timezone-formatted timestamp of when the note was last updated. Display only; not ISO 8601. e.g. `Oct 2, 2024, 5:15 AM PDT`

Error responses: 400, 401, 403, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/budget_notes/{wbs_code_id}  **[BETA]**

**Creates or updates a budget note for a budget or a forecasting row**
Creates or updates a budget note for a budget or a forecasting row

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - ID of the company
- `project_id` [path] string (required) - ID of the project
- `wbs_code_id` [path] string (required) - ID of the WBS code

Request body (application/json) (required):

- `note`: string - Note text for the budget or forecasting row. The note key must be present. Send an empty string or null to clear the note. Omitting the key returns 400. e.g. `A very important budget note`
- `label`: string - The custom name you have assigned to your Budget Note column. Use 'Notes' if using the default name e.g. `Notes`

Response 200 (application/json): object

- `data`: object - Budget Notes
  - `note`: string - The note that was saved for a budget or a forecast row e.g. `A very important note`
  - `user`: string - Display name of the user who last created or updated the note. Null when no author history is available. e.g. `John Doe`
  - `updated_at`: string - Human-readable, locale- and timezone-formatted timestamp of when the note was last updated. Display only; not ISO 8601. e.g. `Oct 2, 2024, 5:15 AM PDT`

Error responses: 400, 401, 403, 409, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Budget Project Status Snapshots

Resource id: `budget-project-status-snapshots`. Raw spec: `../openapi-raw/budget-project-status-snapshots.json`. Web: https://developers.procore.com/reference/rest/budget-project-status-snapshots?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/budget_views/{budget_view_id}/project_status_snapshots  **[BETA]**

**List Project Status Snapshots**
Returns a paginated list of project-level project status snapshots with optional filtering and sorting

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `budget_view_id` [path] string (required) - ID of the budget view
- `filters[status_id]` [query] string - Filter snapshots by PSS custom status ID
- `filters[approval_status]` [query] string enum[approved, under_review, custom] - Filter snapshots by approval status.
- `filters[financial_period_id][]` [query] array of string - Filter snapshots by financial period ID. Accepts one or more IDs. Pass the token `null` (or `nil`) as a value to match snapshots that have no financial period. Tokens and IDs can be combined — e.g. `["42", "null"]` ma...
- `comparison_budget_column_ids` [query] array of string - Restrict comparison data to these budget column IDs. When omitted, comparison is returned for all columns.
- `sort` [query] string enum[created_at, -created_at, financial_period, -financial_period] - Sort order for the returned snapshots. Prefix a value with `-` for descending order. `created_at` sorts by when the snapshot was taken; `financial_period` sorts by the associated financial period's date range (snapsho...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - The ID of the snapshot e.g. `1234`
  - `name`: string - The name of the snapshot e.g. `Q4 Budget Review`
  - `description`: string - A description of the snapshot e.g. `Description`
  - `approval_status`: string enum[approved, under_review, custom] - Approval state of the project status snapshot. Null for ad-hoc snapshots that have no approval workflow. e.g. `approved`
  - `status`: object
    - `id`: string - ID of the custom status e.g. `1234`
    - `name`: string - Name of the custom status e.g. `Approved`
    - `mapped_to_status`: string enum[open, closed, void, pending] - The default status this custom status maps to e.g. `closed`
    - `available`: boolean - Whether the status is available for selection e.g. `true`
    - `initial`: boolean - Whether this is the initial status for new snapshots e.g. `false`
    - `standard_type`: string enum[approved, under_review, custom] - Origin/category of the status: approved and under_review are Procore-provided; custom is company-defined. e.g. `approved`
    - `created_at`: string(date-time) - Created At timestamp e.g. `2024-01-17T18:09:03Z`
    - `updated_at`: string(date-time) - Updated At timestamp e.g. `2024-01-17T18:09:03Z`
  - `created_by`: object
    - `id`: string - The ID of the user who created the snapshot e.g. `5678`
    - `display`: string - The display name of the user who created the snapshot e.g. `John Doe`
  - `created_at`: string(date-time) - The time the snapshot request was created e.g. `2024-10-29T14:00:00Z`
  - `currency_configuration`: object - Currency configuration object, the currency for the snapshot
    - `currency_iso_code`: string - Currency Configuration ISO code e.g. `USD`
  - `financial_period`: object - The financial period associated with this snapshot. Null when the snapshot was not created within a financial period.
    - `id`: string - The ID of the financial period e.g. `42`
    - `name`: string - The name of the financial period e.g. `Q1 2026`
    - `group_name`: string - A user-defined label used to group related financial periods together (e.g., 'FY 2026'). e.g. `FY 2026`
    - `status`: string enum[open, closed] - The status of the financial period. One of open or closed. e.g. `open`
    - `start_date`: string(date) - The start date of the financial period e.g. `2026-01-01`
    - `end_date`: string(date) - The end date of the financial period e.g. `2026-03-31`
  - `column_totals`: array of object - Array of snapshot totals
    - `id`: string - The ID of the total e.g. `9012`
    - `total`: string(decimal) - The Snapshot Total e.g. `1000000.50`
    - `budget_column_id`: string - The id of the related budget column e.g. `1234`
    - `comparison`: object - Shows comparison if comparison exists

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/budget_views/{budget_view_id}/project_status_snapshots  **[BETA]**

**List Company Project Status Snapshots**
Returns a paginated list of company-level Project Status snapshots with optional filtering and sorting

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `budget_view_id` [path] string (required) - ID of the budget view
- `filters[status_id]` [query] string - Filter snapshots by PSS custom status ID
- `filters[approval_status]` [query] string enum[approved, under_review, custom] - Filter snapshots by approval status.
- `filters[financial_period_id][]` [query] array of string - Filter snapshots by financial period ID. Accepts one or more IDs. Pass the token `null` (or `nil`) as a value to match snapshots that have no financial period. Tokens and IDs can be combined — e.g. `["42", "null"]` ma...
- `filters[project_id]` [query] string - Filter snapshots by project ID
- `filters[project_number][]` [query] array of string - Filter snapshots by one or more project numbers
- `filters[program_id]` [query] string - Filter snapshots by program ID
- `filters[region_id]` [query] string - Filter snapshots by region ID
- `filters[stage_id]` [query] string - Filter snapshots by stage ID
- `filters[office_id]` [query] string - Filter snapshots by office ID
- `filters[department_id]` [query] string - Filter snapshots by department ID
- `filters[created_by_id]` [query] string - Filter snapshots by created_by_id
- `filters[created_at]` [query] string - Filter snapshots by created_at date range, inclusive
- `comparison_financial_period_id` [query] string - ID of the financial period to use as the comparison baseline. When omitted, no comparison data is returned.
- `comparison_budget_column_ids` [query] array of string - Restrict comparison data to these budget column IDs. When omitted, comparison is returned for all columns.
- `sort` [query] string enum[created_at, -created_at, project_number, -project_number, status, -status] - Sort parameter
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - The ID of the snapshot e.g. `12345`
  - `name`: string - The name of the snapshot e.g. `May 2016`
  - `description`: string - The description of the snapshot e.g. `New Snapshot for May`
  - `approval_status`: string enum[approved, under_review, custom] - Approval state of the project status snapshot. Null for ad-hoc snapshots that have no approval workflow. e.g. `approved`
  - `status`: object
    - `id`: string - ID of the custom status e.g. `1234`
    - `name`: string - Name of the custom status e.g. `Approved`
    - `mapped_to_status`: string enum[open, closed, void, pending] - The default status this custom status maps to e.g. `closed`
    - `available`: boolean - Whether the status is available for selection e.g. `true`
    - `initial`: boolean - Whether this is the initial status for new snapshots e.g. `false`
    - `standard_type`: string enum[approved, under_review, custom] - Origin/category of the status: approved and under_review are Procore-provided; custom is company-defined. e.g. `approved`
    - `created_at`: string(date-time) - Created At timestamp e.g. `2024-01-17T18:09:03Z`
    - `updated_at`: string(date-time) - Updated At timestamp e.g. `2024-01-17T18:09:03Z`
  - `created_by`: object
    - `id`: string - The ID of the user who created the snapshot e.g. `67890`
    - `display`: string - The display name of the user who created the snapshot e.g. `John Doe`
  - `created_at`: string(date-time) - The timestamp when the snapshot was created e.g. `2025-01-09T23:35:27Z`
  - `project`: object
    - `id`: string - The ID of the project e.g. `54321`
    - `name`: string - The name of the project e.g. `Main Street Development`
    - `project_number`: string - The user-assigned project number/code. Null when the project has no number set. e.g. `PRJ-001`
  - `currency_configuration`: object - Currency configuration object, the currency for the snapshot
    - `currency_iso_code`: string - Currency Configuration ISO code e.g. `USD`
  - `financial_period`: object - The financial period associated with this snapshot. Null when the snapshot was not created within a financial period.
    - `id`: string - The ID of the financial period e.g. `42`
    - `name`: string - The name of the financial period e.g. `Q1 2026`
    - `group_name`: string - A user-defined label used to group related financial periods together (e.g., 'FY 2026'). e.g. `FY 2026`
    - `status`: string enum[open, closed] - The status of the financial period. One of open or closed. e.g. `open`
    - `start_date`: string(date) - The start date of the financial period e.g. `2026-01-01`
    - `end_date`: string(date) - The end date of the financial period e.g. `2026-03-31`
  - `column_totals`: array of object - Array of per-budget-column totals for the snapshot.
    - `id`: string - The ID of the total e.g. `11111`
    - `total`: number - The total value e.g. `1000.5`
    - `budget_column_id`: string - The ID of the budget column e.g. `22222`
    - `comparison`: object - Comparison data relative to the matching snapshot in the requested comparison financial period. Present for every column by default, but omitted for a column when the comparison_budget_column_ids filter is supplied an...

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/budget_views/{budget_view_id}/project_status_snapshots/summary  **[BETA]**

**Get Company Snapshots Summary**
Returns a summary of all selected snapshots for a company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `budget_view_id` [path] string (required) - ID of the budget view
- `filters[status_id]` [query] string - Filter snapshots by PSS custom status ID
- `filters[approval_status]` [query] string enum[approved, under_review, custom] - Filter snapshots by approval status.
- `filters[financial_period_id][]` [query] array of string - Filter snapshots by financial period ID. Accepts one or more IDs. Pass the token `null` (or `nil`) as a value to match snapshots that have no financial period. Tokens and IDs can be combined — e.g. `["42", "null"]` ma...
- `filters[project_id]` [query] string - Filter snapshots by project ID
- `filters[project_number][]` [query] array of string - Filter snapshots by one or more project numbers
- `filters[program_id]` [query] string - Filter snapshots by program ID
- `filters[region_id]` [query] string - Filter snapshots by region ID
- `filters[stage_id]` [query] string - Filter snapshots by stage ID
- `filters[office_id]` [query] string - Filter snapshots by office ID
- `filters[department_id]` [query] string - Filter snapshots by department ID
- `filters[created_by_id]` [query] string - Filter snapshots by created_by_id
- `filters[created_at]` [query] string - Filter snapshots by created_at date range, inclusive
- `comparison_financial_period_id` [query] string - ID of the financial period to use as the comparison baseline. When omitted, no comparison data is returned.

Response 200 (application/json): object

- `data`: object
  - `company_id`: string - The ID of the company the snapshots belong to e.g. `12345`
  - `currency_configuration`: object - Currency configuration object that contains information about company currency
    - `currency_iso_code`: string - Currency Configuration ISO code e.g. `USD`
  - `grand_total`: array of object - Array of totals grouped by budget column id
    - `budget_column_id`: string - The ID of the budget column being aggregated e.g. `22222`
    - `total`: number - The total value of all project snapshots with this budget column e.g. `1000.5`
    - `comparison`: object - Comparison data relative to snapshots in the requested comparison financial period. Present only when a comparison financial period is requested; otherwise this object is omitted. When present, the value and delta sub...
  - `unique_projects_count`: integer - Count of distinct projects represented in the snapshots that match the filter set used to compute this summary. The grand_total array is computed across all matching snapshots (which can include multiple snapshots for... e.g. `47`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/project_status_snapshots/budget_views  **[BETA]**

**Get Budget View Options**
Returns available budget views for company Project Status snapshots

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - The ID of the budget view e.g. `12345`
  - `name`: string - The name of the budget view e.g. `Master Budget`
  - `created_by`: object
    - `id`: string - The ID of the user who created the budget view e.g. `67890`
    - `name`: string - The name of the user who created the budget view e.g. `John Doe`
  - `created_at`: string(date-time) - The timestamp when the budget view was created e.g. `2025-01-09T23:35:27Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/project_status_snapshots/budget_views  **[BETA]**

**Get Project Budget View Options**
Returns available budget views for project Project Status snapshots

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - The ID of the budget view e.g. `12345`
  - `name`: string - The name of the budget view e.g. `Master Budget`
  - `created_by`: object
    - `id`: string - The ID of the user who created the budget view e.g. `67890`
    - `name`: string - The name of the user who created the budget view e.g. `John Doe`
  - `created_at`: string(date-time) - The timestamp when the budget view was created e.g. `2025-01-09T23:35:27Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Budget View Detail Rows

Resource id: `budget-view-detail-rows`. Raw spec: `../openapi-raw/budget-view-detail-rows.json`. Web: https://developers.procore.com/reference/rest/budget-view-detail-rows?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/budget_views/{budget_view_id}/detail_rows

**List Budget View Detail Rows**
Return a list of all Budget View Detail Rows for a project and budget view.
Note: In addition to all the fields outlined in the response, there will be an additional key for each visible
source and formula column created for the particular budget view. As well, when using a Forecasting View ID, additional keys
will be visible that give calculated forecasts for each month, as defined by the Advanced Forecasting Tool.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `budget_view_id` [path] integer (required) - Budget View ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `biller[]` [query] array of string - Return item(s) within a specific biller. Format is biller[]=id=1,type=SubJob or biller[]=id=1,type=Project
- `cost_code_id[]` [query] array of integer - Return item(s) within a specific Cost Code id or range of Cost Code IDs
- `cost_code_name[]` [query] array of string - Return item(s) within a specific Cost Code name or range of Cost Code names
- `root_cost_code_id[]` [query] array of integer - Return item(s) within a specific Root Cost Code id or range of Root Cost Code IDs
- `root_cost_code_name[]` [query] array of string - Return item(s) within a specific Root Cost Code name or range of Root Cost Code names
- `category_id[]` [query] array of integer - Return item(s) within a specific category id (line item type id) or range of category IDs
- `budget_line_item_id[]` [query] array of integer - Return item(s) within a specific budget line item id or range of budget line item IDs
- `sort` [query] string enum[biller_type, project, biller, category_id, cost_code, root_cost_code] - Return item(s) with the specified sort. Default is biller_type,biller,root_cost_code,cost_code,category_id
- `budget_row_type` [query] string enum[budgeted, unbudgeted, all] - Return budgeted, unbudgeted or all item(s) from all budget rows for a project. Default is budgeted. Note that when the unbudgeted or all values are supplied, the id field will be null for rows that have budgeted false

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the budget line item backing this row. May be null for unbudgeted rows. e.g. `75414`
- `deletable`: boolean - Indicates whether the underlying budget line item can be deleted. e.g. `true`
- `budgeted`: boolean - Indicates whether this row has an associated budget line item. e.g. `true`
- `budgetable`: boolean - Indicates whether this row's cost code and cost type combination can be budgeted. e.g. `true`
- `company_id`: integer - ID of the company that owns the project this row belongs to. e.g. `75414`
- `company`: string - Name of the company that owns the project. e.g. `Acme Construction`
- `project_id`: integer - ID of the project this budget row belongs to. e.g. `75414`
- `wbs_code_id`: integer - ID of the Work Breakdown Structure (WBS) code for this row. Null when WBS information is not available. e.g. `75414`
- `biller_id`: integer - ID of the biller (sub job or project) the row is attributed to. e.g. `75414`
- `root_cost_code_id`: integer - ID of the root cost code (division) grouping this row. e.g. `75414`
- `cost_code_id`: integer - ID of the cost code for this row. e.g. `75414`
- `cost_code_origin_id`: string - External system identifier for the cost code, if integrated. Null when not set. e.g. `abc-123`
- `category_id`: integer - ID of the line item type (cost type) category for this row. e.g. `75414`
- `project`: string - Name of the project this row belongs to. e.g. `Downtown Office Tower`
- `biller`: string - Name of the biller (sub job or project) the row is attributed to. e.g. `Floor 1`
- `biller_type`: string enum[Project, SubJob] - Whether the biller is the project itself or a sub job. e.g. `SubJob`
- `root_cost_code`: string - Name of the root cost code (division). e.g. `1`
- `cost_code`: string - Name of the cost code. e.g. `300`
- `category`: string - Name of the line item type (cost type), such as Labor or Equipment. e.g. `Labor`
- `curve`: string enum[front_loaded, bell, back_loaded, linear, manual] - Distribution curve used to spread this line's budget over the schedule. Null when no curve is set. e.g. `linear`
- `start_date`: string - Formatted start date of the line's budgeted schedule. Null when no date range is set. e.g. `Jan 1, 2024`
- `end_date`: string - Formatted end date of the line's budgeted schedule. Null when no date range is set. e.g. `Dec 31, 2024`
- `budget_modifications`: string(float) - Net amount transferred to or from this row via budget modifications. e.g. `3000.00`
- `original_budget_amount`: string(float) - Original budgeted amount for this row, before any budget changes. e.g. `50000.00`
- `budget_forecast`: object - Forecasted budget detail for this row.
  - `id`: integer - Unique identifier of the budget forecast record. e.g. `123`
  - `manual_amount`: string(float) - Forecast amount entered manually by a user. e.g. `20000.00`
  - `automatic_amount`: string(float) - Forecast amount calculated automatically by the system. e.g. `20000.00`
  - `amount`: string(float) - Effective forecast amount in use, either the manual_amount or the automatic_amount. e.g. `20000.00`
  - `automatically_calculated`: boolean - True when amount is the automatic_amount; false when amount is the manual_amount. e.g. `true`
  - `calculation_strategy`: string - How the forecast amount is calculated, such as 'itemized'. e.g. `itemized`
  - `notes`: string - Free-text notes about the budget forecast. e.g. `forecast notes`
- `currency_configuration`: object - Currency in which this row's monetary amounts are denominated.
  - `currency_iso_code`: string - ISO 4217 currency code for the row's amounts. e.g. `USD`
- `unbudgeted_reason`: string - Explanation of why this row has no associated budget line item. Present only for unbudgeted rows. e.g. `Cost Code and Cost Type have not been budgeted.`

Error responses: 400, 401, 403, 503, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Budget View Snapshot Detail Rows

Resource id: `budget-view-snapshot-detail-rows`. Raw spec: `../openapi-raw/budget-view-snapshot-detail-rows.json`. Web: https://developers.procore.com/reference/rest/budget-view-snapshot-detail-rows?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/budget_view_snapshots/{budget_view_snapshot_id}/detail_rows

**List Budget View Snapshot Detail Rows**
Returns a list of all budget view snapshots detail rows for project status and ad hoc types.
Note: In addition to all the fields outlined in the response, there will be an additional key for each visible
source and formula column created for the particular budget view. As well, when using a Forecasting View ID, additional keys
will be visible that give calculated forecasts for each month, as defined by the Advanced Forecasting Tool.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `budget_view_snapshot_id` [path] integer (required) - Budget View Snapshot ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `biller[]` [query] array of string - Return item(s) within a specific biller. Format is biller[]=id=1,type=SubJob or biller[]=id=1,type=Project
- `cost_code_id[]` [query] array of integer - Return item(s) within a specific Cost Code id or range of Cost Code IDs
- `cost_code_name[]` [query] array of string - Return item(s) within a specific Cost Code name or range of Cost Code names
- `root_cost_code_id[]` [query] array of integer - Return item(s) within a specific Root Cost Code id or range of Root Cost Code IDs
- `root_cost_code_name[]` [query] array of string - Return item(s) within a specific Root Cost Code name or range of Root Cost Code names
- `category_id[]` [query] array of integer - Return item(s) within a specific category id (line item type id) or range of category IDs
- `budget_line_item_id[]` [query] array of integer - Return item(s) within a specific budget line item id or range of budget line item IDs
- `sort` [query] string enum[biller_type, project, biller, category_id, cost_code, root_cost_code] - Return item(s) with the specified sort. Default is biller_type,biller,root_cost_code,cost_code,category_id
- `budget_row_type` [query] string enum[budgeted, unbudgeted, all] - Return budgeted, unbudgeted or all item(s) from all budget rows for a project. Default is all. Note that when the unbudgeted or all values are supplied, the id field will be null for rows that have budgeted false

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the budget line item backing this row. May be null for unbudgeted rows. e.g. `75414`
- `deletable`: boolean - Indicates whether the underlying budget line item can be deleted. e.g. `true`
- `budgeted`: boolean - Indicates whether this row has an associated budget line item. e.g. `true`
- `budgetable`: boolean - Indicates whether this row's cost code and cost type combination can be budgeted. e.g. `true`
- `company_id`: integer - ID of the company that owns the project this row belongs to. e.g. `75414`
- `company`: string - Name of the company that owns the project. e.g. `Acme Construction`
- `project_id`: integer - ID of the project this budget row belongs to. e.g. `75414`
- `wbs_code_id`: integer - ID of the Work Breakdown Structure (WBS) code for this row. Null when WBS information is not available. e.g. `75414`
- `biller_id`: integer - ID of the biller (sub job or project) the row is attributed to. e.g. `75414`
- `root_cost_code_id`: integer - ID of the root cost code (division) grouping this row. e.g. `75414`
- `cost_code_id`: integer - ID of the cost code for this row. e.g. `75414`
- `cost_code_origin_id`: string - External system identifier for the cost code, if integrated. Null when not set. e.g. `abc-123`
- `category_id`: integer - ID of the line item type (cost type) category for this row. e.g. `75414`
- `project`: string - Name of the project this row belongs to. e.g. `Downtown Office Tower`
- `biller`: string - Name of the biller (sub job or project) the row is attributed to. e.g. `Floor 1`
- `biller_type`: string enum[Project, SubJob] - Whether the biller is the project itself or a sub job. e.g. `SubJob`
- `root_cost_code`: string - Name of the root cost code (division). e.g. `1`
- `cost_code`: string - Name of the cost code. e.g. `300`
- `category`: string - Name of the line item type (cost type), such as Labor or Equipment. e.g. `Labor`
- `curve`: string enum[front_loaded, bell, back_loaded, linear, manual] - Distribution curve used to spread this line's budget over the schedule. Null when no curve is set. e.g. `linear`
- `start_date`: string - Formatted start date of the line's budgeted schedule. Null when no date range is set. e.g. `Jan 1, 2024`
- `end_date`: string - Formatted end date of the line's budgeted schedule. Null when no date range is set. e.g. `Dec 31, 2024`
- `budget_modifications`: string(float) - Net amount transferred to or from this row via budget modifications. e.g. `3000.00`
- `original_budget_amount`: string(float) - Original budgeted amount for this row, before any budget changes. e.g. `50000.00`
- `budget_forecast`: object - Forecasted budget detail for this row.
  - `id`: integer - Unique identifier of the budget forecast record. e.g. `123`
  - `manual_amount`: string(float) - Forecast amount entered manually by a user. e.g. `20000.00`
  - `automatic_amount`: string(float) - Forecast amount calculated automatically by the system. e.g. `20000.00`
  - `amount`: string(float) - Effective forecast amount in use, either the manual_amount or the automatic_amount. e.g. `20000.00`
  - `automatically_calculated`: boolean - True when amount is the automatic_amount; false when amount is the manual_amount. e.g. `true`
  - `calculation_strategy`: string - How the forecast amount is calculated, such as 'itemized'. e.g. `itemized`
  - `notes`: string - Free-text notes about the budget forecast. e.g. `forecast notes`
- `currency_configuration`: object - Currency in which this row's monetary amounts are denominated.
  - `currency_iso_code`: string - ISO 4217 currency code for the row's amounts. e.g. `USD`
- `unbudgeted_reason`: string - Explanation of why this row has no associated budget line item. Present only for unbudgeted rows. e.g. `Cost Code and Cost Type have not been budgeted.`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Budget View Snapshot Summary Rows

Resource id: `budget-view-snapshot-summary-rows`. Raw spec: `../openapi-raw/budget-view-snapshot-summary-rows.json`. Web: https://developers.procore.com/reference/rest/budget-view-snapshot-summary-rows?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/budget_view_snapshots/{budget_view_snapshot_id}/summary_rows

**List Budget View Snapshot Summary Rows**
Returns a list of all budget view snapshots summary rows for project status and ad hoc types.
The type of row returned is dependent on
the value used in the group_by query param.
Note: In addition to all the fields outlined in the response, there will be an additional key for each visible
standard, source, and formula column created for the particular budget view.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `budget_view_snapshot_id` [path] integer (required) - Budget View Snapshot ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `biller[]` [query] array of string - Return item(s) within a specific biller. Format is biller[]=id=1,type=SubJob or biller[]=id=1,type=Project
- `cost_code_id[]` [query] array of integer - Return item(s) within a specific Cost Code id or range of Cost Code IDs
- `cost_code_name[]` [query] array of string - Return item(s) within a specific Cost Code name or range of Cost Code names
- `root_cost_code_id[]` [query] array of integer - Return item(s) within a specific Root Cost Code id or range of Root Cost Code IDs
- `root_cost_code_name[]` [query] array of string - Return item(s) within a specific Root Cost Code name or range of Root Cost Code names
- `category_id[]` [query] array of integer - Return item(s) within a specific category id (line item type id) or range of category IDs
- `budget_line_item_id[]` [query] array of integer - Return item(s) within a specific budget line item id or range of budget line item IDs
- `group_by` [query] string enum[project, biller, category, cost_code, root_cost_code, cost_code_name, root_cost_code_name] - Groups the data. Value can be a comma separated string. Default is biller,root_cost_code
- `budget_row_type` [query] string enum[budgeted, unbudgeted, all] - Return budgeted, unbudgeted or all item(s) from all budget rows for a project. Default is all. Note that when the unbudgeted or all values are supplied, the subtotals may change depending on the presence of rows that ...

Response 200 (application/json): array of object

- `id`: string - Identifier of the entity this snapshot summary row aggregates (e.g. a cost code, category, or biller, depending on the group_by used). e.g. `75414`
- `name`: string - Display name of the entity this snapshot summary row aggregates. e.g. `Labor`
- `biller_type`: string enum[Project, SubJob] - Whether the biller is the project itself or a sub job. Populated only when grouping by biller. e.g. `SubJob`
- `budget_line_item_ids`: array of string - IDs of the budget line items captured in this snapshot that roll up into this group.

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Budget View Snapshots

Resource id: `budget-view-snapshots`. Raw spec: `../openapi-raw/budget-view-snapshots.json`. Web: https://developers.procore.com/reference/rest/budget-view-snapshots?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/budget_view_snapshots

**List Budget View Snapshots**
Returns a list of project-level snapshots for both project status and ad hoc. You can filter by type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[budget_template_id]` [query] array of integer - Return snapshot(s) using the specified budget template id.
- `filters[budget_view_id]` [query] array of integer - Return snapshot(s) using the specified budget view id. (This will replace budget_template_id filter)
- `filters[snapshot_type]` [query] string enum[ad_hoc, project_status_snapshot] - Return snapshot(s) of the specified type.
- `filters[approval_status]` [query] string enum[approved, under_review] - Return snapshot(s) in the specified status.
- `sort` [query] string enum[snapshot_type, approval_status] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter

Response 200 (application/json): array of oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/budget_view_snapshots

**Create a Budget View Snapshot.**
Create a project-level snapshot for either project status or ad hoc type. This is rate limited to one request per hour for each project and budget view, regardless of snapshot type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - The project identifier e.g. `10`
- `budget_template_id`: integer (required) - The budget template identifier (deprecated, use budget_view_id instead) e.g. `99`
- `budget_view_id`: integer - The budget view identifier (replaces budget_template_id) e.g. `99`
- `name`: string (required) - Title of the budget view snapshot e.g. `New Year Budget`
- `description`: string - Description of the budget snapshot e.g. `This is the budget snapshot for the new year`
- `snapshot_type`: string enum[ad_hoc, project_status_snapshot] - Snapshot Type. Only available when Project Status Snapshots feature is enabled. e.g. `ad_hoc`
- `approval_status`: string enum[approved, under_review] - Approval Status. e.g. `approved`
- `status_id`: integer - The ID of a custom status. Only available when the Custom Statuses feature is enabled. When enabled, use this parameter instead of approval_status. The status_id must reference an available custom status configured fo... e.g. `12345`
- `date_range_for_actuals`: array of string(date) - Filters actuals data to a specific date range when generating the snapshot. Provide exactly two dates in ISO 8601 format representing the start and end of the range. e.g. `["2024-01-01", "2024-12-31"]`
- `only_actuals_with_dates`: boolean - When true, only actuals records with a date within date_range_for_actuals are included. When false (default), actuals records with no date are also included alongside date-ranged results. e.g. `false`
- `financial_period_id`: integer - The ID of the Financial Period to associate with this snapshot. Only available when the Financial Periods feature is enabled. e.g. `42`
- `reassign_financial_period`: boolean - Only applies when snapshot_type is project_status_snapshot and financial_period_id is provided. When true, if the requested financial_period_id is already assigned to another snapshot in the same project and budget vi... e.g. `false`

Response 201 (application/json): object

- `data`: object - Budget View Snapshot
  - `id`: integer - Unique identifier of the budget view snapshot. Use as the {budget_view_snapshot_id} path parameter to retrieve its summary rows or detail rows. e.g. `75414`
  - `name`: string - Display name of the snapshot. e.g. `January Snapshot`
  - `description`: string - Free-text description of the snapshot. e.g. `This is the January Budget Snapshot`
  - `created_at`: string - Timestamp when the snapshot was created, in ISO 8601 format. e.g. `2018-01-17T18:09:03Z`
  - `created_by`: object - User who created the snapshot.
    - `id`: integer - ID of the user who created the snapshot. e.g. `1234`
    - `name`: string - Full name of the user who created the snapshot. e.g. `John Doe`
    - `login`: string - Login email address of the user who created the snapshot. e.g. `john.doe@example.com`
  - `budget_view`: object - The budget view this snapshot was taken from.
    - `id`: integer - ID of the budget view this snapshot was taken from. e.g. `1234`
  - `snapshot_type`: string enum[ad_hoc, project_status_snapshot] - Kind of snapshot. Use filters[snapshot_type] to filter collections by this value. e.g. `ad_hoc`
  - `approval_status`: string enum[approved, under_review, custom] - Review state of the snapshot. Present for project status snapshots; when a company-defined custom status applies, see the status object. Use filters[approval_status] to filter collections by this value. e.g. `approved`
  - `status`: object - The company-defined custom status assigned to the snapshot. Present for project status snapshots that have a custom status assigned.
    - `id`: string - Identifier of the custom status. e.g. `1234`
    - `name`: string - Display name of the custom status. e.g. `Approved`
    - `mapped_to_status`: string enum[open, closed, void, pending] - The built-in status that this custom status maps to. e.g. `closed`
    - `available`: boolean - Whether the custom status can currently be selected for snapshots. e.g. `true`
    - `initial`: boolean - Whether this custom status is the default applied to newly created snapshots. e.g. `false`
    - `standard_type`: string enum[approved, under_review, custom] - The underlying standard category of the custom status. e.g. `approved`
    - `created_at`: string - Timestamp when the custom status was created, in ISO 8601 format. e.g. `2018-01-17T18:09:03Z`
    - `updated_at`: string - Timestamp when the custom status was last updated, in ISO 8601 format. e.g. `2018-01-17T18:09:03Z`
  - `financial_period_id`: integer - Obsolete. Identifier of the financial period the snapshot is assigned to. Use the `financial_period` object instead; this field is retained only for backward compatibility. e.g. `42`
  - `date_range_for_actuals`: array of string(date) - Start and end dates that bound the actuals captured in the snapshot, in ISO 8601 format. Null when the snapshot was generated without an actuals date range. e.g. `["2024-01-01", "2024-12-31"]`
  - `include_actuals_without_dates`: boolean - Whether actuals with no date were included alongside the date-ranged actuals when the snapshot was generated. Null when no actuals date range was applied. e.g. `true`
  - `forecast_start_date`: string(date) - Date from which forecasting calculations begin for this snapshot. Null when forecasting was not applied. e.g. `2024-01-01`
  - `financial_period`: object - The financial period the snapshot is assigned to. Present for project status snapshots that have a period assigned; null otherwise (including ad hoc snapshots).
    - `id`: string - Identifier of the financial period e.g. `1234`
    - `name`: string - Display name of the financial period e.g. `January 2026`
    - `group_name`: string - Name of the group the financial period belongs to e.g. `FY2026`
    - `status`: string enum[open, closed] - Whether the financial period is currently open or closed e.g. `open`
    - `start_date`: string - First day of the financial period e.g. `2026-01-01`
    - `end_date`: string - Last day of the financial period e.g. `2026-01-31`
  - `links`: object - URLs for retrieving the row data captured in this snapshot.
    - `detail_rows`: string - URL to fetch the Snapshot Detail Rows for this budget view snapshot. e.g. `https://app.procore.com/rest/v1.0/budget_view_snapshots/1/detail_rows?project...`
    - `summary_rows`: string - URL to fetch the Snapshot Summary Rows for this budget view snapshot. e.g. `https://app.procore.com/rest/v1.0/budget_view_snapshots/1/summary_rows?projec...`

Response 202 (application/json): object

- `data`: object - Budget View Snapshot Request
  - `snapshot_request_id`: integer - Identifier of the asynchronous snapshot request. Returned with a 202 Accepted when snapshot creation is queued for background processing; poll snapshot status to track progress. e.g. `75414`
  - `status`: string enum[queued, processing, completed, failed] - Processing state of the asynchronous snapshot request. e.g. `queued`
  - `budget_template_id`: integer - ID of the budget view (template) the snapshot is being generated from. e.g. `1234`
  - `project_id`: integer - ID of the project the snapshot belongs to. e.g. `1234`
  - `company_id`: integer - ID of the company that owns the project. e.g. `1234`

Error responses: 400, 401, 403, 429, 503, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Budget View Summary Rows

Resource id: `budget-view-summary-rows`. Raw spec: `../openapi-raw/budget-view-summary-rows.json`. Web: https://developers.procore.com/reference/rest/budget-view-summary-rows?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/budget_views/{budget_view_id}/summary_rows

**List Budget View Summary Rows**
Return a list of all Budget View Summary Rows for a project and budget view. The type of row returned is dependent on
the value used in the group_by query param.
Note: In addition to all the fields outlined in the response, there will be an additional key for each visible
source and formula column created for the particular budget view.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `budget_view_id` [path] integer (required) - Budget View ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `biller[]` [query] array of string - Return item(s) within a specific biller. Format is biller[]=id=1,type=SubJob or biller[]=id=1,type=Project
- `cost_code_id[]` [query] array of integer - Return item(s) within a specific Cost Code id or range of Cost Code IDs
- `cost_code_name[]` [query] array of string - Return item(s) within a specific Cost Code name or range of Cost Code names
- `root_cost_code_id[]` [query] array of integer - Return item(s) within a specific Root Cost Code id or range of Root Cost Code IDs
- `root_cost_code_name[]` [query] array of string - Return item(s) within a specific Root Cost Code name or range of Root Cost Code names
- `category_id[]` [query] array of integer - Return item(s) within a specific category id (line item type id) or range of category IDs
- `budget_line_item_id[]` [query] array of integer - Return item(s) within a specific budget line item id or range of budget line item IDs
- `group_by` [query] string enum[project, biller, category, cost_code, root_cost_code, cost_code_name, root_cost_code_name] - Groups the data. Value can be a comma separated string. Default is biller,root_cost_code
- `budget_row_type` [query] string enum[budgeted, unbudgeted, all] - Return budgeted, unbudgeted or all item(s) from all budget rows for a project. Default is budgeted. Note that when the unbudgeted or all values are supplied, the subtotals may change depending on the presence of rows ...

Response 200 (application/json): array of object

- `id`: string - Identifier of the entity this summary row aggregates (e.g. a cost code, category, or biller, depending on the group_by used). e.g. `75414`
- `name`: string - Display name of the entity this summary row aggregates. e.g. `Labor`
- `biller_type`: string enum[Project, SubJob] - Whether the biller is the project itself or a sub job. Populated only when grouping by biller. e.g. `SubJob`
- `original_budget_amount`: string(float) - Original budgeted amount for this group, before any budget changes, as a decimal string. e.g. `20000.00`
- `budget_modifications`: string(float) - Net amount transferred to or from this group via budget modifications, as a decimal string. e.g. `20000.00`
- `budget_forecast`: object - Forecasted budget totals for this group. Present only when the budget view includes a forecast column.
  - `amount`: string(float) - Forecasted budget amount for this group, as a decimal string. e.g. `20000.00`
- `currency_configuration`: object - Currency in which this row's monetary amounts are denominated.
  - `currency_iso_code`: string - ISO 4217 currency code for the row's amounts. e.g. `USD`

Error responses: 400, 401, 403, 503, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Budget Views

Resource id: `budget-views`. Raw spec: `../openapi-raw/budget-views.json`. Web: https://developers.procore.com/reference/rest/budget-views?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/budget_views

**List Budget Views**
Return a list of all Budget Views for a project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[created_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the budget view. Use as the {budget_view_id} path parameter to retrieve its summary rows (GET /rest/v1.0/budget_views/{budget_view_id}/summary_rows) or detail rows. e.g. `75414`
- `name`: string - Display name of the budget view, as shown in the Procore budget tool. e.g. `Procore Standard View`
- `description`: string - Free-text description of what the budget view is used for. e.g. `This is the procore standard view`
- `created_at`: string - Timestamp when the budget view was created, in ISO 8601 format. e.g. `2018-01-17T18:09:03Z`
- `created_by`: object - User who created the budget view.
  - `id`: integer - ID of the user who created the budget view. e.g. `1234`
  - `name`: string - Full name of the user who created the budget view. e.g. `John Doe`
  - `login`: string - Login email address of the user who created the budget view. e.g. `john.doe@example.com`
- `updated_at`: string - Timestamp when the budget view was last updated, in ISO 8601 format. e.g. `2018-01-17T18:09:03Z`
- `role`: string - Purpose this budget view serves, such as standard budgeting, forecasting (which exposes additional monthly forecast columns on detail rows), custom reporting, or column configuration. e.g. `forecasting`
- `links`: object - URLs for retrieving budgeting data scoped to this budget view.
  - `detail_rows`: string - URL to fetch the Budget Detail Rows for this budget view. e.g. `https://app.procore.com/rest/v1.0/budget_views/1/detail_rows?project_id=2`
  - `summary_rows`: string - URL to fetch the Budget Summary Rows for this budget view. e.g. `https://app.procore.com/rest/v1.0/budget_views/1/summary_rows?project_id=2`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Budgeted Production Quantities

Resource id: `budgeted-production-quantities`. Raw spec: `../openapi-raw/budgeted-production-quantities.json`. Web: https://developers.procore.com/reference/rest/budgeted-production-quantities?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/projects/{project_id}/budgeted_production_quantities

**List all Project Budgeted Production Quantities**
Return a list of all Budgeted Production Quantities with details for a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this budgeted production quantity. Use as the {id} path parameter to show, update, or delete the record via /rest/v1.0/projects/{project_id}/budgeted_production_quantities/{id}. e.g. `75414`
- `unit_of_measure`: string - Unit of measure for the budgeted quantity (for example, lf for linear feet or sf for square feet). Drawn from the company's master Units of Measure list, excluding units categorized as Time. e.g. `lf`
- `project_id`: integer - ID of the project this budgeted production quantity belongs to. Matches the {project_id} path parameter used to access the record. e.g. `1`
- `wbs_code_id`: integer - ID of the WBS (work breakdown structure) production quantity code this budgeted quantity is associated with. e.g. `1234`
- `cost_code`: object
  - `id`: integer - Cost Code ID e.g. `12345`
  - `biller_id`: integer - Biller ID e.g. `12345`
  - `biller_type`: string enum[Project, SubJob] - Biller type e.g. `Project`
  - `code`: string - Cost code, not including parent prefix e.g. `300`
  - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `full_code`: string - Full Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Name e.g. `Earthwork`
  - `parent_id`: integer - Parent e.g. `2345`
  - `position`: integer - Ordering position of the cost code among its siblings e.g. `1`
  - `sortable_code`: string - Sortable code (this property is deprecated - see full_code) e.g. `02-300`
  - `standard_cost_code_id`: integer - Standard Cost Code ID e.g. `122334`
  - `updated_at`: string(date-time) - Updated at e.g. `2015-05-15T00:00:00Z`
- `quantity`: number - Amount of cost code budgeted to be installed, rounded to two decimal places e.g. `1000.5`
- `updated_at`: string(date-time) - Timestamp when this budgeted production quantity was last updated, in ISO 8601 format. e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Timestamp when this budgeted production quantity was created, in ISO 8601 format. e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Timestamp when this budgeted production quantity was soft-deleted, in ISO 8601 format. Null when the record is active. e.g. `2017-07-29T21:39:40Z`
- `wbs_code`: object - The WBS (work breakdown structure) code this budgeted production quantity is associated with.
  - `id`: integer - Unique identifier of the WBS code. Matches wbs_code_id. e.g. `1234`
  - `flat_code`: string - Concatenated code string for the WBS code, combining its segment codes (for example, the cost code and sub job codes). e.g. `02-300`
  - `description`: string - Human-readable description of the WBS code. e.g. `Earthwork`
  - `flat_name`: string - Concatenated display name for the WBS code, combining the names of its segments. e.g. `Earthwork`
- `created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`

### POST /rest/v1.0/projects/{project_id}/budgeted_production_quantities

**Create a new Budgeted Production Quantity**
Create a new Budgeted Production Quantity associated with the specified Project. Optionally include a rules-of-credit tree as either components or a top-level scheme. A present-but-malformed tree is rejected with 422 when the project uses rules of credit.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `budgeted_production_quantity`: object (required) - Budgeted Production Quantity Object
  - `project_id`: integer - Ignored. The project is always taken from the {project_id} path parameter, so any value supplied here has no effect. e.g. `1`
  - `cost_code_id`: integer - ID of the cost code to budget against. DO NOT provide if your project is configured for Task Codes; provide wbs_code_id instead. e.g. `1`
  - `wbs_code_id`: integer - ID of the WBS production quantity code for the budgeted production quantity. Required when your project is configured for Task Codes. DO NOT provide if your project is not configured for Task Codes.
  - `quantity`: number - Quantity budgeted for a project cost code, rounded to two decimal places e.g. `10.49`
  - `unit_of_measure`: string enum[Any value present in the Company list of Units of Measure except those categorized as "Time"] - Unit of measure for the budgeted quantity. Must be a value from the company's master Units of Measure list that is not categorized as Time. e.g. `sf`
  - `components`: array of object - Visible components of the Budgeted Production Quantity. Mutually exclusive with scheme. Optional. On create, a present-but-malformed tree is rejected with 422 when the project uses rules of credit.
    - `name`: string (required) - Display name of the component. 1 to 255 characters after trimming. e.g. `Installation`
    - `weight`: number (required) - Relative weight of this component among siblings. 0.01 to 100.00 with at most two decimal places. Sibling weights must sum to exactly 100. e.g. `100`
    - `planned_quantity`: number (required) - Quantity planned for this component. Non-negative, at most 999,999,999.99, with at most two decimal places. e.g. `60`
    - `uom`: string - Unit of measure for this component. Omit to inherit the Budgeted Production Quantity unit of measure. Must be a value from the company Units of Measure list except those categorized as Time. e.g. `cy`
    - `scheme`: object - A claiming scheme and its exact step list. Send at the top level (mutually exclusive with components) for a step-only tree, or nest it on a component when that component is broken into steps. Both claiming_scheme_id a... e.g. `{"claiming_scheme_id": 77, "steps": [{"claiming_scheme_step_id": 501, "planne...`
      - `claiming_scheme_id`: integer (required) - ID of the project claiming scheme that owns this step list. Use a claiming scheme that belongs to the same project as the Budgeted Production Quantity. e.g. `77`
      - `steps`: array of object (required) - The scheme's complete step set. 1 to 100 items. Each item is a claiming-scheme step ID plus planned quantity.
        - `claiming_scheme_step_id`: integer (required) - ID of the claiming-scheme step this row derives from. The submitted set must match that scheme's steps exactly; send a planned_quantity of 0.00 for a step with nothing budgeted against it. e.g. `501`
        - `planned_quantity`: number (required) - Quantity planned against this step. Non-negative, at most 999,999,999.99, with at most two decimal places. e.g. `200`
  - `scheme`: object - A claiming scheme and its exact step list. Send at the top level (mutually exclusive with components) for a step-only tree, or nest it on a component when that component is broken into steps. Both claiming_scheme_id a... e.g. `{"claiming_scheme_id": 77, "steps": [{"claiming_scheme_step_id": 501, "planne...`
    - `claiming_scheme_id`: integer (required) - ID of the project claiming scheme that owns this step list. Use a claiming scheme that belongs to the same project as the Budgeted Production Quantity. e.g. `77`
    - `steps`: array of object (required) - The scheme's complete step set. 1 to 100 items. Each item is a claiming-scheme step ID plus planned quantity.
      - `claiming_scheme_step_id`: integer (required) - ID of the claiming-scheme step this row derives from. The submitted set must match that scheme's steps exactly; send a planned_quantity of 0.00 for a step with nothing budgeted against it. e.g. `501`
      - `planned_quantity`: number (required) - Quantity planned against this step. Non-negative, at most 999,999,999.99, with at most two decimal places. e.g. `200`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this budgeted production quantity. Use as the {id} path parameter to show, update, or delete the record via /rest/v1.0/projects/{project_id}/budgeted_production_quantities/{id}. e.g. `75414`
- `unit_of_measure`: string - Unit of measure for the budgeted quantity (for example, lf for linear feet or sf for square feet). Drawn from the company's master Units of Measure list, excluding units categorized as Time. e.g. `lf`
- `project_id`: integer - ID of the project this budgeted production quantity belongs to. Matches the {project_id} path parameter used to access the record. e.g. `1`
- `wbs_code_id`: integer - ID of the WBS (work breakdown structure) production quantity code this budgeted quantity is associated with. e.g. `1234`
- `cost_code`: object
  - `id`: integer - Cost Code ID e.g. `12345`
  - `biller_id`: integer - Biller ID e.g. `12345`
  - `biller_type`: string enum[Project, SubJob] - Biller type e.g. `Project`
  - `code`: string - Cost code, not including parent prefix e.g. `300`
  - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `full_code`: string - Full Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Name e.g. `Earthwork`
  - `parent_id`: integer - Parent e.g. `2345`
  - `position`: integer - Ordering position of the cost code among its siblings e.g. `1`
  - `sortable_code`: string - Sortable code (this property is deprecated - see full_code) e.g. `02-300`
  - `standard_cost_code_id`: integer - Standard Cost Code ID e.g. `122334`
  - `updated_at`: string(date-time) - Updated at e.g. `2015-05-15T00:00:00Z`
- `quantity`: number - Amount of cost code budgeted to be installed, rounded to two decimal places e.g. `1000.5`
- `updated_at`: string(date-time) - Timestamp when this budgeted production quantity was last updated, in ISO 8601 format. e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Timestamp when this budgeted production quantity was created, in ISO 8601 format. e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Timestamp when this budgeted production quantity was soft-deleted, in ISO 8601 format. Null when the record is active. e.g. `2017-07-29T21:39:40Z`
- `wbs_code`: object - The WBS (work breakdown structure) code this budgeted production quantity is associated with.
  - `id`: integer - Unique identifier of the WBS code. Matches wbs_code_id. e.g. `1234`
  - `flat_code`: string - Concatenated code string for the WBS code, combining its segment codes (for example, the cost code and sub job codes). e.g. `02-300`
  - `description`: string - Human-readable description of the WBS code. e.g. `Earthwork`
  - `flat_name`: string - Concatenated display name for the WBS code, combining the names of its segments. e.g. `Earthwork`
- `created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`

Error responses: 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/budgeted_production_quantities/ids

**List all Project Budgeted Production Quantity IDs**
Return a list of all Budgeted Production Quantity IDs with details for a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of integer


### GET /rest/v1.0/projects/{project_id}/budgeted_production_quantities/{id}

**Show a Budgeted Production Quantity**
Show a Budgeted Production Quantity associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Id of the Budgeted Production Quantity

Response 200 (application/json): object

- `id`: integer - Unique identifier for this budgeted production quantity. Use as the {id} path parameter to show, update, or delete the record via /rest/v1.0/projects/{project_id}/budgeted_production_quantities/{id}. e.g. `75414`
- `unit_of_measure`: string - Unit of measure for the budgeted quantity (for example, lf for linear feet or sf for square feet). Drawn from the company's master Units of Measure list, excluding units categorized as Time. e.g. `lf`
- `project_id`: integer - ID of the project this budgeted production quantity belongs to. Matches the {project_id} path parameter used to access the record. e.g. `1`
- `wbs_code_id`: integer - ID of the WBS (work breakdown structure) production quantity code this budgeted quantity is associated with. e.g. `1234`
- `cost_code`: object
  - `id`: integer - Cost Code ID e.g. `12345`
  - `biller_id`: integer - Biller ID e.g. `12345`
  - `biller_type`: string enum[Project, SubJob] - Biller type e.g. `Project`
  - `code`: string - Cost code, not including parent prefix e.g. `300`
  - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `full_code`: string - Full Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Name e.g. `Earthwork`
  - `parent_id`: integer - Parent e.g. `2345`
  - `position`: integer - Ordering position of the cost code among its siblings e.g. `1`
  - `sortable_code`: string - Sortable code (this property is deprecated - see full_code) e.g. `02-300`
  - `standard_cost_code_id`: integer - Standard Cost Code ID e.g. `122334`
  - `updated_at`: string(date-time) - Updated at e.g. `2015-05-15T00:00:00Z`
- `quantity`: number - Amount of cost code budgeted to be installed, rounded to two decimal places e.g. `1000.5`
- `updated_at`: string(date-time) - Timestamp when this budgeted production quantity was last updated, in ISO 8601 format. e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Timestamp when this budgeted production quantity was created, in ISO 8601 format. e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Timestamp when this budgeted production quantity was soft-deleted, in ISO 8601 format. Null when the record is active. e.g. `2017-07-29T21:39:40Z`
- `wbs_code`: object - The WBS (work breakdown structure) code this budgeted production quantity is associated with.
  - `id`: integer - Unique identifier of the WBS code. Matches wbs_code_id. e.g. `1234`
  - `flat_code`: string - Concatenated code string for the WBS code, combining its segment codes (for example, the cost code and sub job codes). e.g. `02-300`
  - `description`: string - Human-readable description of the WBS code. e.g. `Earthwork`
  - `flat_name`: string - Concatenated display name for the WBS code, combining the names of its segments. e.g. `Earthwork`
- `created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`

Error responses: default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/budgeted_production_quantities/{id}

**Update a Budgeted Production Quantity**
Updating a Budgeted Production Quantity associated with the specified Project. A rules-of-credit tree (components or scheme) may be sent. A component or a step may carry an id, to change one that already exists, or _destroy, to remove one. Update does not check the shape of the tree.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Id of the Budgeted Production Quantity

Request body (application/json) (required):

- `budgeted_production_quantity`: object (required) - Budgeted Production Quantity fields to update
  - `quantity`: number - Quantity budgeted for a project cost code e.g. `10.49`
  - `unit_of_measure`: string enum[Any value present in the Company list of Units of Measure except those categorized as "Time"] - Unit of Measure e.g. `sf`
  - `components`: array of object - Components to add, change, or remove.
    - `id`: integer - Production Tracking component id. e.g. `9001`
    - `_destroy`: boolean - When true, remove this component from the tree. e.g. `false`
    - `name`: string - Display name of the component. e.g. `Installation`
    - `weight`: number - Relative weight of this component among siblings. e.g. `100`
    - `planned_quantity`: number - Quantity planned for this component. e.g. `60`
    - `uom`: string - Unit of measure for this component. e.g. `cy`
    - `scheme`: object - Changes to a claiming scheme and its steps. Omitted fields keep their existing values. e.g. `{"steps": [{"id": 8001, "planned_quantity": 200}]}`
      - `claiming_scheme_id`: integer - ID of the project claiming scheme that owns this step list. e.g. `77`
      - `steps`: array of object - Steps to add, change, or remove.
        - `id`: integer - Production Tracking step id. e.g. `8001`
        - `_destroy`: boolean - When true, remove this step from the scheme. e.g. `false`
        - `claiming_scheme_step_id`: integer - ID of the claiming-scheme step this row derives from. e.g. `501`
        - `planned_quantity`: number - Quantity planned against this step. e.g. `200`
  - `scheme`: object - Changes to a claiming scheme and its steps. Omitted fields keep their existing values. e.g. `{"steps": [{"id": 8001, "planned_quantity": 200}]}`
    - `claiming_scheme_id`: integer - ID of the project claiming scheme that owns this step list. e.g. `77`
    - `steps`: array of object - Steps to add, change, or remove.
      - `id`: integer - Production Tracking step id. e.g. `8001`
      - `_destroy`: boolean - When true, remove this step from the scheme. e.g. `false`
      - `claiming_scheme_step_id`: integer - ID of the claiming-scheme step this row derives from. e.g. `501`
      - `planned_quantity`: number - Quantity planned against this step. e.g. `200`

Response 200 (application/json): object

- `id`: integer - Unique identifier for this budgeted production quantity. Use as the {id} path parameter to show, update, or delete the record via /rest/v1.0/projects/{project_id}/budgeted_production_quantities/{id}. e.g. `75414`
- `unit_of_measure`: string - Unit of measure for the budgeted quantity (for example, lf for linear feet or sf for square feet). Drawn from the company's master Units of Measure list, excluding units categorized as Time. e.g. `lf`
- `project_id`: integer - ID of the project this budgeted production quantity belongs to. Matches the {project_id} path parameter used to access the record. e.g. `1`
- `wbs_code_id`: integer - ID of the WBS (work breakdown structure) production quantity code this budgeted quantity is associated with. e.g. `1234`
- `cost_code`: object
  - `id`: integer - Cost Code ID e.g. `12345`
  - `biller_id`: integer - Biller ID e.g. `12345`
  - `biller_type`: string enum[Project, SubJob] - Biller type e.g. `Project`
  - `code`: string - Cost code, not including parent prefix e.g. `300`
  - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `full_code`: string - Full Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Name e.g. `Earthwork`
  - `parent_id`: integer - Parent e.g. `2345`
  - `position`: integer - Ordering position of the cost code among its siblings e.g. `1`
  - `sortable_code`: string - Sortable code (this property is deprecated - see full_code) e.g. `02-300`
  - `standard_cost_code_id`: integer - Standard Cost Code ID e.g. `122334`
  - `updated_at`: string(date-time) - Updated at e.g. `2015-05-15T00:00:00Z`
- `quantity`: number - Amount of cost code budgeted to be installed, rounded to two decimal places e.g. `1000.5`
- `updated_at`: string(date-time) - Timestamp when this budgeted production quantity was last updated, in ISO 8601 format. e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Timestamp when this budgeted production quantity was created, in ISO 8601 format. e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Timestamp when this budgeted production quantity was soft-deleted, in ISO 8601 format. Null when the record is active. e.g. `2017-07-29T21:39:40Z`
- `wbs_code`: object - The WBS (work breakdown structure) code this budgeted production quantity is associated with.
  - `id`: integer - Unique identifier of the WBS code. Matches wbs_code_id. e.g. `1234`
  - `flat_code`: string - Concatenated code string for the WBS code, combining its segment codes (for example, the cost code and sub job codes). e.g. `02-300`
  - `description`: string - Human-readable description of the WBS code. e.g. `Earthwork`
  - `flat_name`: string - Concatenated display name for the WBS code, combining the names of its segments. e.g. `Earthwork`
- `created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`

Error responses: 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/budgeted_production_quantities/{id}

**Delete a Budgeted Production Quantity**
Deleting a Budgeted Production Quantity associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Id of the Budgeted Production Quantity

Request body (application/json) (required):

- `budgeted_production_quantity`: object (required) - Budgeted Production Quantity Object
  - `project_id`: integer - Ignored. The project is always taken from the {project_id} path parameter, so any value supplied here has no effect. e.g. `1`
  - `cost_code_id`: integer - ID of the cost code to budget against. DO NOT provide if your project is configured for Task Codes; provide wbs_code_id instead. e.g. `1`
  - `wbs_code_id`: integer - ID of the WBS production quantity code for the budgeted production quantity. Required when your project is configured for Task Codes. DO NOT provide if your project is not configured for Task Codes.
  - `quantity`: number - Quantity budgeted for a project cost code, rounded to two decimal places e.g. `10.49`
  - `unit_of_measure`: string enum[Any value present in the Company list of Units of Measure except those categorized as "Time"] - Unit of measure for the budgeted quantity. Must be a value from the company's master Units of Measure list that is not categorized as Time. e.g. `sf`
  - `components`: array of object - Visible components of the Budgeted Production Quantity. Mutually exclusive with scheme. Optional. On create, a present-but-malformed tree is rejected with 422 when the project uses rules of credit.
    - `name`: string (required) - Display name of the component. 1 to 255 characters after trimming. e.g. `Installation`
    - `weight`: number (required) - Relative weight of this component among siblings. 0.01 to 100.00 with at most two decimal places. Sibling weights must sum to exactly 100. e.g. `100`
    - `planned_quantity`: number (required) - Quantity planned for this component. Non-negative, at most 999,999,999.99, with at most two decimal places. e.g. `60`
    - `uom`: string - Unit of measure for this component. Omit to inherit the Budgeted Production Quantity unit of measure. Must be a value from the company Units of Measure list except those categorized as Time. e.g. `cy`
    - `scheme`: object - A claiming scheme and its exact step list. Send at the top level (mutually exclusive with components) for a step-only tree, or nest it on a component when that component is broken into steps. Both claiming_scheme_id a... e.g. `{"claiming_scheme_id": 77, "steps": [{"claiming_scheme_step_id": 501, "planne...`
      - `claiming_scheme_id`: integer (required) - ID of the project claiming scheme that owns this step list. Use a claiming scheme that belongs to the same project as the Budgeted Production Quantity. e.g. `77`
      - `steps`: array of object (required) - The scheme's complete step set. 1 to 100 items. Each item is a claiming-scheme step ID plus planned quantity.
        - `claiming_scheme_step_id`: integer (required) - ID of the claiming-scheme step this row derives from. The submitted set must match that scheme's steps exactly; send a planned_quantity of 0.00 for a step with nothing budgeted against it. e.g. `501`
        - `planned_quantity`: number (required) - Quantity planned against this step. Non-negative, at most 999,999,999.99, with at most two decimal places. e.g. `200`
  - `scheme`: object - A claiming scheme and its exact step list. Send at the top level (mutually exclusive with components) for a step-only tree, or nest it on a component when that component is broken into steps. Both claiming_scheme_id a... e.g. `{"claiming_scheme_id": 77, "steps": [{"claiming_scheme_step_id": 501, "planne...`
    - `claiming_scheme_id`: integer (required) - ID of the project claiming scheme that owns this step list. Use a claiming scheme that belongs to the same project as the Budgeted Production Quantity. e.g. `77`
    - `steps`: array of object (required) - The scheme's complete step set. 1 to 100 items. Each item is a claiming-scheme step ID plus planned quantity.
      - `claiming_scheme_step_id`: integer (required) - ID of the claiming-scheme step this row derives from. The submitted set must match that scheme's steps exactly; send a planned_quantity of 0.00 for a step with nothing budgeted against it. e.g. `501`
      - `planned_quantity`: number (required) - Quantity planned against this step. Non-negative, at most 999,999,999.99, with at most two decimal places. e.g. `200`

Response 200: Budgeted Production Quantity Deleted (no body)

## Company Budget Configuration

Resource id: `company-budget-configuration`. Raw spec: `../openapi-raw/company-budget-configuration.json`. Web: https://developers.procore.com/reference/rest/company-budget-configuration?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/configurable_budgeting/company_budget_configuration  **[BETA]**

**View Company Budget Configuration**
Returns budget configuration for a company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object - The company budget configuration record.
  - `id`: string - Unique string identifier for this company budget configuration record. e.g. `1`
  - `company_id`: string - ID of the company this budget configuration belongs to. Use as the company_id path parameter in company-scoped budget requests. e.g. `1`
  - `created_at`: string - Timestamp when this configuration was created, in ISO 8601 format. e.g. `2026-05-07T13:14:15Z`
  - `updated_at`: string - Timestamp when this configuration was last updated, in ISO 8601 format. e.g. `2026-05-07T13:14:15Z`
  - `financial_periods_enabled`: boolean - Whether financial periods are enabled for the company's budgets. Update via PATCH /rest/v2.0/companies/{company_id}/configurable_budgeting/company_budget_configuration. e.g. `false`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/configurable_budgeting/company_budget_configuration  **[BETA]**

**Update Company Budget Configuration**
Updates budget configuration for a company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `company_budget_configuration`: object (required)
  - `financial_periods_enabled`: boolean - Whether or not financial periods are enabled for the given company e.g. `false`

Response 200 (application/json): object

- `data`: object - The company budget configuration record.
  - `id`: string - Unique string identifier for this company budget configuration record. e.g. `1`
  - `company_id`: string - ID of the company this budget configuration belongs to. Use as the company_id path parameter in company-scoped budget requests. e.g. `1`
  - `created_at`: string - Timestamp when this configuration was created, in ISO 8601 format. e.g. `2026-05-07T13:14:15Z`
  - `updated_at`: string - Timestamp when this configuration was last updated, in ISO 8601 format. e.g. `2026-05-07T13:14:15Z`
  - `financial_periods_enabled`: boolean - Whether financial periods are enabled for the company's budgets. Update via PATCH /rest/v2.0/companies/{company_id}/configurable_budgeting/company_budget_configuration. e.g. `false`

Error responses: 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Financial Periods

Resource id: `financial-periods`. Raw spec: `../openapi-raw/financial-periods.json`. Web: https://developers.procore.com/reference/rest/financial-periods?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/financial_periods  **[BETA]**

**List Financial Period groups**
Returns all Financial Period groups for the company, paginated by group. Groups are never split across pages and are ordered by their earliest period start date.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `filters[from_date]` [query] string(date) - Inclusive lower bound of the date window (ISO 8601 date, "YYYY-MM-DD"). When provided, only groups whose span ends on or after this date are returned. Groups are returned in full (all their periods), not only the peri...
- `filters[to_date]` [query] string(date) - Inclusive upper bound of the date window (ISO 8601 date, "YYYY-MM-DD"). When provided, only groups whose span starts on or before this date are returned. Groups are returned in full (all their periods), not only the p...
- `sort` [query] string enum[date, -date] - Sort groups by start date. `date` orders by earliest period start ascending (the default); `-date` orders descending.
- `page` [query] integer - Page number (default 1)
- `per_page` [query] integer - Number of groups per page (default 10, max 100)

Response 200 (application/json): object

- `data`: object - Financial periods grouped by group name

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/financial_periods  **[BETA]**

**Create a Financial Period group**
Creates all periods for a new group atomically. Period names must be unique within the group, periods must be internally contiguous, and the group's date span must not overlap any existing group.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `financial_period_group`: object (required)
  - `group_name`: string (required) - Unique name for this group within the company e.g. `FY 2026`
  - `periods`: array of object (required)
    - `name`: string (required) - Display name of the period within the group (e.g. "Q1 2026"). Must be unique within the group. e.g. `Q1 2026`
    - `start_date`: string(date) (required) - First day of the period, inclusive (ISO 8601 date). Periods within a group must be contiguous. e.g. `2026-01-01`
    - `end_date`: string(date) (required) - Last day of the period, inclusive (ISO 8601 date). e.g. `2026-03-31`
    - `status`: string enum[open, closed] - Initial lifecycle status of the period; defaults to open when omitted. e.g. `open`

Response 201 (application/json): object

- `data`: array of object
  - `id`: string (required) - Unique identifier of the financial period. Use as the {id} path parameter to update a single period's status via PATCH /financial_periods/periods/{id}. e.g. `1`
  - `group_name`: string (required) - Name of the period group this period belongs to (e.g. "FY 2026"). Use as the {group_name} path parameter to update or delete the whole group. e.g. `FY 2026`
  - `name`: string (required) - Display name of the individual period within the group (e.g. "Q1 2026"). e.g. `Q1 2026`
  - `start_date`: string(date) (required) - First day of the period, inclusive (ISO 8601 date). e.g. `2026-01-01`
  - `end_date`: string(date) (required) - Last day of the period, inclusive (ISO 8601 date). e.g. `2026-03-31`
  - `status`: string enum[open, closed] (required) - Lifecycle status of the period. e.g. `open`
  - `created_at`: string(date-time) (required) - Timestamp when the period was created (ISO 8601). e.g. `2026-05-11T13:14:15Z`
  - `updated_at`: string(date-time) (required) - Timestamp when the period was last updated (ISO 8601). e.g. `2026-05-11T13:14:15Z`

Error responses: 400, 401, 403, 409, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/financial_periods/with_project_status_snapshots  **[BETA]**

**List Financial Periods with project status snapshots**
Returns all Financial Periods for the company that have at least one project status snapshot attached, paginated by individual period and ordered by start date.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `filters[budget_view_id]` [query] string - Limit results to periods that have a snapshot on this budget view. When omitted, all periods with any PSS are returned.
- `filters[from_date]` [query] string(date) - Inclusive lower bound of the date window (ISO 8601 date, "YYYY-MM-DD"). When provided, only periods ending on or after this date are returned. Optional; when omitted the window is unbounded below.
- `filters[to_date]` [query] string(date) - Inclusive upper bound of the date window (ISO 8601 date, "YYYY-MM-DD"). When provided, only periods starting on or before this date are returned. Optional; when omitted the window is unbounded above. Must be on or aft...
- `sort` [query] string enum[date, -date] - Sort periods by start date. `date` orders ascending (the default); `-date` orders descending.
- `page` [query] integer - Page number (default 1)
- `per_page` [query] integer - Number of periods per page (default 10, max 100)

Response 200 (application/json): object

- `data`: array of object
  - `id`: string (required) - Unique identifier of the financial period. Use as the {id} path parameter to update a single period's status via PATCH /financial_periods/periods/{id}. e.g. `1`
  - `group_name`: string (required) - Name of the period group this period belongs to (e.g. "FY 2026"). Use as the {group_name} path parameter to update or delete the whole group. e.g. `FY 2026`
  - `name`: string (required) - Display name of the individual period within the group (e.g. "Q1 2026"). e.g. `Q1 2026`
  - `start_date`: string(date) (required) - First day of the period, inclusive (ISO 8601 date). e.g. `2026-01-01`
  - `end_date`: string(date) (required) - Last day of the period, inclusive (ISO 8601 date). e.g. `2026-03-31`
  - `status`: string enum[open, closed] (required) - Lifecycle status of the period. e.g. `open`
  - `created_at`: string(date-time) (required) - Timestamp when the period was created (ISO 8601). e.g. `2026-05-11T13:14:15Z`
  - `updated_at`: string(date-time) (required) - Timestamp when the period was last updated (ISO 8601). e.g. `2026-05-11T13:14:15Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/financial_periods/{group_name}  **[BETA]**

**Update a Financial Period group**
Updates all periods of an existing group. Creates additional periods or deletes extras when the counts are different. Optionally renames the group by passing a new group_name in the request body.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `group_name` [path] string (required) - URL-encoded name of the Financial Period group

Request body (application/json) (required):

- `financial_period_group`: object (required)
  - `group_name`: string - New name for the group. When provided and different from the URL group_name, renames the group atomically with the period update. e.g. `FY 2026 Renamed`
  - `periods`: array of object (required)
    - `name`: string (required) - Display name of the period within the group (e.g. "Q1 2026"). Must be unique within the group. e.g. `Q1 2026`
    - `start_date`: string(date) (required) - First day of the period, inclusive (ISO 8601 date). Periods within a group must be contiguous. e.g. `2026-01-01`
    - `end_date`: string(date) (required) - Last day of the period, inclusive (ISO 8601 date). e.g. `2026-03-31`
    - `status`: string enum[open, closed] - Lifecycle status of the period. e.g. `closed`

Response 200 (application/json): object

- `data`: array of object
  - `id`: string (required) - Unique identifier of the financial period. Use as the {id} path parameter to update a single period's status via PATCH /financial_periods/periods/{id}. e.g. `1`
  - `group_name`: string (required) - Name of the period group this period belongs to (e.g. "FY 2026"). Use as the {group_name} path parameter to update or delete the whole group. e.g. `FY 2026`
  - `name`: string (required) - Display name of the individual period within the group (e.g. "Q1 2026"). e.g. `Q1 2026`
  - `start_date`: string(date) (required) - First day of the period, inclusive (ISO 8601 date). e.g. `2026-01-01`
  - `end_date`: string(date) (required) - Last day of the period, inclusive (ISO 8601 date). e.g. `2026-03-31`
  - `status`: string enum[open, closed] (required) - Lifecycle status of the period. e.g. `open`
  - `created_at`: string(date-time) (required) - Timestamp when the period was created (ISO 8601). e.g. `2026-05-11T13:14:15Z`
  - `updated_at`: string(date-time) (required) - Timestamp when the period was last updated (ISO 8601). e.g. `2026-05-11T13:14:15Z`

Error responses: 401, 403, 404, 409, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/financial_periods/{group_name}  **[BETA]**

**Delete a Financial Period group**
Hard-deletes all periods belonging to the group.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `group_name` [path] string (required) - URL-encoded name of the Financial Period group

Response 204: No Content (no body)

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/financial_periods/periods/{id}  **[BETA]**

**Update a Financial Period status**
Updates the status of a single Financial Period, scoped to the company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - ID of the Financial Period

Request body (application/json) (required):

- `financial_period`: object (required)
  - `status`: string enum[open, closed] (required) - New lifecycle status to apply to this period. e.g. `open`

Response 200 (application/json): object

- `data`: object
  - `id`: string (required) - Unique identifier of the financial period. Use as the {id} path parameter to update a single period's status via PATCH /financial_periods/periods/{id}. e.g. `1`
  - `group_name`: string (required) - Name of the period group this period belongs to (e.g. "FY 2026"). Use as the {group_name} path parameter to update or delete the whole group. e.g. `FY 2026`
  - `name`: string (required) - Display name of the individual period within the group (e.g. "Q1 2026"). e.g. `Q1 2026`
  - `start_date`: string(date) (required) - First day of the period, inclusive (ISO 8601 date). e.g. `2026-01-01`
  - `end_date`: string(date) (required) - Last day of the period, inclusive (ISO 8601 date). e.g. `2026-03-31`
  - `status`: string enum[open, closed] (required) - Lifecycle status of the period. e.g. `open`
  - `created_at`: string(date-time) (required) - Timestamp when the period was created (ISO 8601). e.g. `2026-05-11T13:14:15Z`
  - `updated_at`: string(date-time) (required) - Timestamp when the period was last updated (ISO 8601). e.g. `2026-05-11T13:14:15Z`

Error responses: 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/financial_periods/open  **[BETA]**

**List open Financial Periods**
Returns all open Financial Periods for the company grouped by group_name. Intended for project-level consumers that need to know which periods are currently open.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Response 200 (application/json): object

- `data`: object - Financial periods grouped by group name

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Manual Forecast Line Items

Resource id: `manual-forecast-line-items`. Raw spec: `../openapi-raw/manual-forecast-line-items.json`. Web: https://developers.procore.com/reference/rest/manual-forecast-line-items?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/projects/{project_id}/manual_forecast_line_items

**List Manual Forecast Line Items**
Returns a list of Manual Forecast Line Items on a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this manual forecast line item. Use as the {id} path parameter to update or delete the record via /rest/v1.0/projects/{project_id}/manual_forecast_line_items/{id}. e.g. `999`
- `budget_line_item_id`: integer - ID of the budget line item this manual forecast line item forecasts against. e.g. `42`
- `wbs_code_id`: integer - ID of the WBS (work breakdown structure) code associated with the parent budget line item. e.g. `123`
- `budget_forecast_id`: integer - ID of the parent budget forecast that groups this line item. e.g. `234`
- `project_id`: integer - ID of the project this manual forecast line item belongs to. Matches the {project_id} path parameter. e.g. `456`
- `company_id`: integer - ID of the company that owns this manual forecast line item. e.g. `567`
- `description`: string - Free-text label for the forecast line item, typically the resource or role being forecast. e.g. `Senior Project Manager`
- `quantity`: integer - Number of units being forecast, expressed in the given unit of measure (uom). e.g. `5`
- `uom`: string - Unit of measure for the forecast quantity (for example, months or weeks). e.g. `months`
- `unit_cost`: string(float) - Cost per unit, as a decimal string. Multiplied by quantity to produce amount. e.g. `2250.0`
- `amount`: string(float) - Total forecast amount (quantity multiplied by unit_cost), as a decimal string. e.g. `11250.0`
- `created_at`: string(date-time) - Timestamp when this manual forecast line item was created, in ISO 8601 format. e.g. `2021-06-27T18:57:01Z`
- `updated_at`: string(date-time) - Timestamp when this manual forecast line item was last updated, in ISO 8601 format. e.g. `2021-06-27T18:57:01Z`
- `currency_configuration`: object
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/manual_forecast_line_items

**Create A Manual Forecast Line Item**
Create a manual forecast line item for a budget line item.
When `async: true` and Budget Columns 2.0 is enabled, the response is `202 Accepted` with a `receipt_id`.
When `async: false` (default) or Budget Columns 2.0 is disabled, the response is `201 Created`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `async`: boolean - Request asynchronous processing. When `true`, Budget Columns 2.0 must be enabled or the request will return `422`. On success returns `202 Accepted` with a `receipt_id`.
- `budget_line_item_id`: integer - Identifier of the parent budget line item. NOTE - budget line item id or wbs code id is required e.g. `123`
- `wbs_code_id`: integer - Wbs code id of the parent budget line item. NOTE - budget line item id or wbs code id is required e.g. `234`
- `description`: string - Free-text label for the forecast line item, typically the resource or role being forecast. e.g. `Senior Project Manager`
- `quantity`: integer - Number of units being forecast, expressed in the given unit of measure (uom). e.g. `5`
- `uom`: string - Unit of measure for the forecast quantity (for example, months or weeks). e.g. `months`
- `unit_cost`: number(float) - Cost per unit. Multiplied by quantity to produce amount. e.g. `2250.0`
- `amount`: number(float) - Total forecast amount (quantity multiplied by unit_cost). e.g. `11250.0`

Response 201 (application/json): object

- `data`: object
  - `id`: integer - Unique identifier for this manual forecast line item. Use as the {id} path parameter to update or delete the record via /rest/v1.0/projects/{project_id}/manual_forecast_line_items/{id}. e.g. `999`
  - `budget_line_item_id`: integer - ID of the budget line item this manual forecast line item forecasts against. e.g. `42`
  - `wbs_code_id`: integer - ID of the WBS (work breakdown structure) code associated with the parent budget line item. e.g. `123`
  - `budget_forecast_id`: integer - ID of the parent budget forecast that groups this line item. e.g. `234`
  - `project_id`: integer - ID of the project this manual forecast line item belongs to. Matches the {project_id} path parameter. e.g. `456`
  - `company_id`: integer - ID of the company that owns this manual forecast line item. e.g. `567`
  - `description`: string - Free-text label for the forecast line item, typically the resource or role being forecast. e.g. `Senior Project Manager`
  - `quantity`: integer - Number of units being forecast, expressed in the given unit of measure (uom). e.g. `5`
  - `uom`: string - Unit of measure for the forecast quantity (for example, months or weeks). e.g. `months`
  - `unit_cost`: string(float) - Cost per unit, as a decimal string. Multiplied by quantity to produce amount. e.g. `2250.0`
  - `amount`: string(float) - Total forecast amount (quantity multiplied by unit_cost), as a decimal string. e.g. `11250.0`
  - `created_at`: string(date-time) - Timestamp when this manual forecast line item was created, in ISO 8601 format. e.g. `2021-06-27T18:57:01Z`
  - `updated_at`: string(date-time) - Timestamp when this manual forecast line item was last updated, in ISO 8601 format. e.g. `2021-06-27T18:57:01Z`
  - `currency_configuration`: object
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`

Response 202 (application/json): object

- `data`: object - Receipt for an asynchronous update
  - `receipt_id`: string - ID used to poll `Check confirm budget version` API before re-fetching budget data e.g. `12345`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/manual_forecast_line_items/{id}

**Update A Manual Forecast Line Item**
Update a manual forecast line item for a budget line item.
When `async: true` and Budget Columns 2.0 is enabled, the response is `202 Accepted` with a `receipt_id`.
When `async: false` (default) or Budget Columns 2.0 is disabled, the response is `200 OK`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Unique identifier for the manual forecast line item.

Request body (application/json) (required):

- `async`: boolean - Request asynchronous processing. When `true`, Budget Columns 2.0 must be enabled or the request will return `422`. On success returns `202 Accepted` with a `receipt_id`.
- `budget_line_item_id`: integer - Identifier of the parent budget line item. NOTE - budget line item id or wbs code id is required e.g. `123`
- `wbs_code_id`: integer - Wbs code id of the parent budget line item. NOTE - budget line item id or wbs code id is required e.g. `234`
- `description`: string - Free-text label for the forecast line item, typically the resource or role being forecast. e.g. `Senior Project Manager`
- `quantity`: integer - Number of units being forecast, expressed in the given unit of measure (uom). e.g. `5`
- `uom`: string - Unit of measure for the forecast quantity (for example, months or weeks). e.g. `months`
- `unit_cost`: number(float) - Cost per unit. Multiplied by quantity to produce amount. e.g. `2250.0`
- `amount`: number(float) - Total forecast amount (quantity multiplied by unit_cost). e.g. `11250.0`

Response 200 (application/json): object

- `data`: object
  - `id`: integer - Unique identifier for this manual forecast line item. Use as the {id} path parameter to update or delete the record via /rest/v1.0/projects/{project_id}/manual_forecast_line_items/{id}. e.g. `999`
  - `budget_line_item_id`: integer - ID of the budget line item this manual forecast line item forecasts against. e.g. `42`
  - `wbs_code_id`: integer - ID of the WBS (work breakdown structure) code associated with the parent budget line item. e.g. `123`
  - `budget_forecast_id`: integer - ID of the parent budget forecast that groups this line item. e.g. `234`
  - `project_id`: integer - ID of the project this manual forecast line item belongs to. Matches the {project_id} path parameter. e.g. `456`
  - `company_id`: integer - ID of the company that owns this manual forecast line item. e.g. `567`
  - `description`: string - Free-text label for the forecast line item, typically the resource or role being forecast. e.g. `Senior Project Manager`
  - `quantity`: integer - Number of units being forecast, expressed in the given unit of measure (uom). e.g. `5`
  - `uom`: string - Unit of measure for the forecast quantity (for example, months or weeks). e.g. `months`
  - `unit_cost`: string(float) - Cost per unit, as a decimal string. Multiplied by quantity to produce amount. e.g. `2250.0`
  - `amount`: string(float) - Total forecast amount (quantity multiplied by unit_cost), as a decimal string. e.g. `11250.0`
  - `created_at`: string(date-time) - Timestamp when this manual forecast line item was created, in ISO 8601 format. e.g. `2021-06-27T18:57:01Z`
  - `updated_at`: string(date-time) - Timestamp when this manual forecast line item was last updated, in ISO 8601 format. e.g. `2021-06-27T18:57:01Z`
  - `currency_configuration`: object
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`

Response 202 (application/json): object

- `data`: object - Receipt for an asynchronous update
  - `receipt_id`: string - ID used to poll `Check confirm budget version` API before re-fetching budget data e.g. `12345`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/manual_forecast_line_items/{id}

**Delete A Manual Forecast Line Item**
Delete a manual forecast line item for a budget line item.
When `async: true` and Budget Columns 2.0 is enabled, the response is `202 Accepted` with a `receipt_id`.
When `async: false` (default) or Budget Columns 2.0 is disabled, the response is `204 No Content`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Unique identifier for the manual forecast line item.

Request body (application/json) (required):

- `budget_line_item_id`: integer - Identifier of the parent budget line item. NOTE - budget line item id or wbs code id is required e.g. `123`
- `wbs_code_id`: integer - Wbs code id of the parent budget line item. NOTE - budget line item id or wbs code id is required e.g. `234`
- `async`: boolean - Request asynchronous processing. When `true`, Budget Columns 2.0 must be enabled or the request will return `422`. On success returns `202 Accepted` with a `receipt_id`.

Response 202 (application/json): object

- `data`: object - Receipt for an asynchronous update
  - `receipt_id`: string - ID used to poll `Check confirm budget version` API before re-fetching budget data e.g. `12345`

Response 204: The manual forecast line item has been deleted (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Monitoring Resources

Resource id: `monitoring-resources`. Raw spec: `../openapi-raw/monitoring-resources.json`. Web: https://developers.procore.com/reference/rest/monitoring-resources?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/projects/{project_id}/monitoring_resources

**List Monitoring Resources**
Returns a list of Monitoring Resources on a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `forecast_start_date` [query] string - Forecast start date, expressed in ISO 8601 date format (YYYY-MM-DD)

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this monitoring resource. Use as the {id} path parameter to update or delete the record via /rest/v1.0/projects/{project_id}/monitoring_resources/{id}. e.g. `999`
- `description`: string - Free-text label for the monitoring resource, typically the resource or role being tracked. e.g. `Senior Project Manager`
- `start_date`: string - Date the resource begins, in ISO 8601 date format (YYYY-MM-DD). e.g. `2017-02-15`
- `end_date`: string - Date the resource ends, in ISO 8601 date format (YYYY-MM-DD). e.g. `2017-07-31`
- `unit_of_measure`: string enum[weeks, months] - Time unit over which the resource is spread between start_date and end_date. e.g. `months`
- `unit_cost`: number(float) - Cost per unit of measure for this resource. e.g. `2250.0`
- `units_remaining`: integer - Units still remaining as of today, or as of the forecast_start_date query parameter when provided. e.g. `5`
- `forecast_to_complete`: number(float) - Remaining cost forecast to complete this resource (units_remaining multiplied by unit_cost and utilization). e.g. `11250.0`
- `planned_total_cost`: number(float) - Total planned cost for this resource across its full duration. e.g. `13500.0`
- `total_units`: integer - Total number of units scheduled between start_date and end_date. e.g. `6`
- `utilization`: number(float) - Fraction of the resource applied per unit, expressed as a decimal where 1.0 is 100%. e.g. `1.0`
- `budget_line_item_id`: integer - ID of the budget line item this monitoring resource is tracked against. e.g. `42`
- `currency_configuration`: object
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/monitoring_resources

**Create Monitoring Resource**
Creates a Monitoring Resource on a given Project's Budget Line Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `monitoring_resource`: object (required)
  - `description`: string (required) - Free-text label for the monitoring resource, typically the resource or role being tracked. e.g. `Senior Project Manager`
  - `start_date`: string(date) (required) - Date the resource begins, in ISO 8601 date format (YYYY-MM-DD). e.g. `2017-02-15`
  - `end_date`: string(date) (required) - Date the resource ends, in ISO 8601 date format (YYYY-MM-DD). e.g. `2017-07-31`
  - `unit_of_measure`: string enum[weeks, months] (required) - Time unit over which the resource is spread between start_date and end_date. e.g. `months`
  - `unit_cost`: string (required) - Cost per unit of measure for this resource. e.g. `2250.0`
  - `utilization`: string (required) - Fraction of the resource applied per unit, expressed as a decimal where 1.0 is 100%. e.g. `1.0`
  - `budget_line_item_id`: integer (required) - ID of the budget line item this monitoring resource is tracked against. e.g. `42`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this monitoring resource. Use as the {id} path parameter to update or delete the record via /rest/v1.0/projects/{project_id}/monitoring_resources/{id}. e.g. `999`
- `description`: string - Free-text label for the monitoring resource, typically the resource or role being tracked. e.g. `Senior Project Manager`
- `start_date`: string - Date the resource begins, in ISO 8601 date format (YYYY-MM-DD). e.g. `2017-02-15`
- `end_date`: string - Date the resource ends, in ISO 8601 date format (YYYY-MM-DD). e.g. `2017-07-31`
- `unit_of_measure`: string enum[weeks, months] - Time unit over which the resource is spread between start_date and end_date. e.g. `months`
- `unit_cost`: number(float) - Cost per unit of measure for this resource. e.g. `2250.0`
- `units_remaining`: integer - Units still remaining as of today, or as of the forecast_start_date query parameter when provided. e.g. `5`
- `forecast_to_complete`: number(float) - Remaining cost forecast to complete this resource (units_remaining multiplied by unit_cost and utilization). e.g. `11250.0`
- `planned_total_cost`: number(float) - Total planned cost for this resource across its full duration. e.g. `13500.0`
- `total_units`: integer - Total number of units scheduled between start_date and end_date. e.g. `6`
- `utilization`: number(float) - Fraction of the resource applied per unit, expressed as a decimal where 1.0 is 100%. e.g. `1.0`
- `budget_line_item_id`: integer - ID of the budget line item this monitoring resource is tracked against. e.g. `42`
- `currency_configuration`: object
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/monitoring_resources/{id}

**Update Monitoring Resource**
Updates a Monitoring Resource's attributes

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Monitoring Resource ID

Request body (application/json) (required):

- `monitoring_resource`: object (required)
  - `description`: string - Free-text label for the monitoring resource, typically the resource or role being tracked. e.g. `Senior Project Manager`
  - `start_date`: string(date) - Date the resource begins, in ISO 8601 date format (YYYY-MM-DD). e.g. `2017-02-15`
  - `end_date`: string(date) - Date the resource ends, in ISO 8601 date format (YYYY-MM-DD). e.g. `2017-07-31`
  - `unit_of_measure`: string enum[weeks, months] - Time unit over which the resource is spread between start_date and end_date. e.g. `months`
  - `unit_cost`: string - Cost per unit of measure for this resource. e.g. `2250.0`
  - `utilization`: string - Fraction of the resource applied per unit, expressed as a decimal where 1.0 is 100%. e.g. `1.0`

Response 200 (application/json): object

- `id`: integer - Unique identifier for this monitoring resource. Use as the {id} path parameter to update or delete the record via /rest/v1.0/projects/{project_id}/monitoring_resources/{id}. e.g. `999`
- `description`: string - Free-text label for the monitoring resource, typically the resource or role being tracked. e.g. `Senior Project Manager`
- `start_date`: string - Date the resource begins, in ISO 8601 date format (YYYY-MM-DD). e.g. `2017-02-15`
- `end_date`: string - Date the resource ends, in ISO 8601 date format (YYYY-MM-DD). e.g. `2017-07-31`
- `unit_of_measure`: string enum[weeks, months] - Time unit over which the resource is spread between start_date and end_date. e.g. `months`
- `unit_cost`: number(float) - Cost per unit of measure for this resource. e.g. `2250.0`
- `units_remaining`: integer - Units still remaining as of today, or as of the forecast_start_date query parameter when provided. e.g. `5`
- `forecast_to_complete`: number(float) - Remaining cost forecast to complete this resource (units_remaining multiplied by unit_cost and utilization). e.g. `11250.0`
- `planned_total_cost`: number(float) - Total planned cost for this resource across its full duration. e.g. `13500.0`
- `total_units`: integer - Total number of units scheduled between start_date and end_date. e.g. `6`
- `utilization`: number(float) - Fraction of the resource applied per unit, expressed as a decimal where 1.0 is 100%. e.g. `1.0`
- `budget_line_item_id`: integer - ID of the budget line item this monitoring resource is tracked against. e.g. `42`
- `currency_configuration`: object
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `USD`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/monitoring_resources/{id}

**Delete Monitoring Resource**
Deletes a Monitoring Resource

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Monitoring Resource ID

Response 204: No Content (no body)

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

