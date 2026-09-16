# Procore API: Prime Contracts (Construction Financials)

Source: https://developers.procore.com/reference/rest/ (tool category: Prime Contracts)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Payment Application (Owner Invoice) Line Items](#payment-application-owner-invoice-line-items) - versions 1.0
- [Payment Application (Owner Invoice) Markup Line Items](#payment-application-owner-invoice-markup-line-items) - versions 1.0
- [Payment Applications (Owner Invoices)](#payment-applications-owner-invoices) - versions 1.0
- [Prime Change Order Batches](#prime-change-order-batches) - versions 1.0
- [Prime Change Order Line Items](#prime-change-order-line-items) - versions 2.0
- [Prime Change Order Rows CSV Exports](#prime-change-order-rows-csv-exports) - versions 2.0
- [Prime Change Orders](#prime-change-orders) - versions 1.0
- [Prime Change Orders Batches Export PDF](#prime-change-orders-batches-export-pdf) - versions 2.0
- [Prime Change Orders Export PDF](#prime-change-orders-export-pdf) - versions 2.0
- [Prime Contract Attachments](#prime-contract-attachments) - versions 2.0
- [Prime Contract Line Items](#prime-contract-line-items) - versions 2.0, 1.0
- [Prime Contract Summary](#prime-contract-summary) - versions 2.0
- [Prime Contracts](#prime-contracts) - versions 2.0, 1.0
- [Prime Contracts Export PDF](#prime-contracts-export-pdf) - versions 2.0

## Payment Application (Owner Invoice) Line Items

Resource id: `payment-application-owner-invoice-line-items`. Raw spec: `../openapi-raw/payment-application-owner-invoice-line-items.json`. Web: https://developers.procore.com/reference/rest/payment-application-owner-invoice-line-items?version=latest
Product lines: Construction Financials

### PATCH /rest/v1.0/prime_contracts/{prime_contract_id}/payment_application_line_items/{id}

**Update Payment Application (Owner Invoice) Line Item for Prime Contract**
Update a Payment Application (Owner Invoice) Line Item on a specified Prime Contract Payment Application (Owner Invoice)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `prime_contract_id` [path] integer (required) - Prime Contract ID
- `id` [path] integer (required) - Payment Application (Owner Invoice) Line item ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `55001`
- `payment_application_line_item`: object (required) - Payment Application (Owner Invoice) Line Item
  - `work_completed_this_period`: string - The amount of work completed this period (only for lines that use amount accounting or are calculated manually) e.g. `1000.00`
  - `materials_presently_stored`: string - The amount of materials presently stored (only for lines that use amount accounting) e.g. `500.00`
  - `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period (work_completed_this_period should be non-zero to hold a retainage) e.g. `100.00`
  - `materials_stored_retainage_retained_this_period`: string - Materials stored retainage amount retained this period (materials_presently_stored should be non-zero to hold a retainage) e.g. `100.00`
  - `work_completed_retainage_released_this_period`: string - The amount of work completed retainage released this period e.g. `0.00`
  - `work_completed_this_period_quantity`: string - Work completed this period quantity (only for lines that use unit accounting and are not calculated manually) e.g. `10.0`

Response 200 (application/json): object

- `id`: integer - ID e.g. `135135`
- `balance_to_finish`: string - Balance to finish amount e.g. `1.00`
- `materials_presently_stored`: string - Materials presently stored amount e.g. `0.00`
- `scheduled_value`: string - Scheduled value amount e.g. `1.00`
- `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
- `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
- `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
- `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
- `description_of_work`: string - Description of work e.g. `Install windows`
- `item_number`: integer - Item number e.g. `1`
- `cost_code`: oneOf(object | object)
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
- `scheduled_unit_price`: string - Scheduled unit price e.g. `0.0`
- `scheduled_quantity`: string - Scheduled quantity e.g. `0.0`
- `total_completed_and_stored_to_date_quantity`: string - Total completed and stored to date quantity e.g. `0.0`
- `work_completed_this_period_quantity`: string - Work completed this period quantity e.g. `0.0`
- `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity e.g. `0.0`
- `work_completed_retainage_currently_retained`: string - Work completed retainage currently retained amount e.g. `0.0`
- `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
- `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
- `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
- `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
- `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained e.g. `0.0`
- `materials_stored_retainage_from_previous_application`: string - Materials stored retainage amount from previous application e.g. `0.0`
- `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period e.g. `0.0`
- `materials_stored_retainage_retained_this_period`: string - Materials stored retainage amount retained this period e.g. `0.0`
- `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period e.g. `10.0`
- `total_retainage_currently_retained`: string - Total retainage amount currently retained e.g. `0.0`
- `total_retainage_from_previous_application`: string - Total retainage amount from previous application e.g. `0.0`
- `type`: string - Type of PaymentApplicationContractItem e.g. `payment_application_markup_line_item`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Payment Application (Owner Invoice) Markup Line Items

Resource id: `payment-application-owner-invoice-markup-line-items`. Raw spec: `../openapi-raw/payment-application-owner-invoice-markup-line-items.json`. Web: https://developers.procore.com/reference/rest/payment-application-owner-invoice-markup-line-items?version=latest
Product lines: Construction Financials

### PATCH /rest/v1.0/prime_contracts/{prime_contract_id}/payment_application_markup_line_items/{id}

**Update Payment Application (Owner Invoice) Markup Line item for Prime Contract**
Update a Payment Application (Owner Invoice) Markup Line item on a specified Prime Contract Payment Application (Owner Invoice)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `prime_contract_id` [path] integer (required) - Prime Contract ID
- `id` [path] integer (required) - Payment Application (Owner Invoice) Markup Line item ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `55001`
- `payment_application_markup_line_item`: object (required) - Payment Application (Owner Invoice) Markup Line Item
  - `work_completed_this_period`: string - The amount of work completed this period (only for lines that use amount accounting or are calculated manually) e.g. `1000.00`
  - `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period (work_completed_this_period should be non-zero to hold a retainage) e.g. `100.00`
  - `work_completed_retainage_released_this_period`: string - The amount of work completed retainage released this period e.g. `0.00`

Response 200 (application/json): object

- `id`: integer(int64) - Unique integer ID e.g. `12345`
- `balance_to_finish`: string - Balance to finish amount e.g. `1.00`
- `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
- `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
- `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
- `work_completed_this_period`: string - The amount of work completed this period e.g. `1000`
- `type`: string - Object type e.g. `payment_application_markup_line_item`
- `description_of_work`: string - Description of work e.g. `Install windows`
- `materials_presently_stored`: string - The amount of materials presently stored e.g. `500`
- `work_completed_retainage_currently_retained`: string - Work completed retainage currently retained amount e.g. `0.0`
- `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
- `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
- `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
- `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
- `total_retainage_currently_retained`: string - Total retainage amount currently retained e.g. `0.0`
- `total_retainage_from_previous_application`: string - Total retainage amount from previous application e.g. `0.0`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Payment Applications (Owner Invoices)

Resource id: `payment-applications-owner-invoices`. Raw spec: `../openapi-raw/payment-applications-owner-invoices.json`. Web: https://developers.procore.com/reference/rest/payment-applications-owner-invoices?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/payment_applications

**List Payment Applications (Owner Invoices) for a Project**
Return a list of all Payment Applications (Owner Invoices) on a specified Project
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `58820`
- `billing_date`: string(date) - Billing date e.g. `2013-11-20`
- `invoice_number`: string - Invoice number e.g. `123`
- `origin_data`: string - Payment Application (Owner Invoice) third party data e.g. `XYZ-0012`
- `origin_id`: string - Payment Application (Owner Invoice) third party ID e.g. `abc-123`
- `percent_complete`: string - Percent complete e.g. `0.00`
- `period_start`: string(date) - Period start date e.g. `2013-11-01`
- `period_end`: string(date) - Period end date e.g. `2013-11-02`
- `period_id`: integer - Billing Period Identifier e.g. `7682`
- `status`: string enum[draft, under_review, revise_and_resubmit, approved] - Status e.g. `approved`
- `total_amount_paid`: string - Total amount of Payments made to the Payment Application e.g. `250.00`
- `number`: integer - Payment Application (Owner Invoice) number e.g. `1`
- `total_amount_accrued_this_period`: string - Gross amount of the Invoice. e.g. `125.00`
- `formatted_contract_company`: string - Name of the Owner/Client of the Invoice. e.g. `Simplex Grinnell LLC`
- `currency_configuration`: object - Payment Application (Owner Invoice) Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
  - `currency_exchange_rate`: string - Exchange rate for the Currency e.g. `2.1`
  - `base_currency_iso_code`: string - ISO Code for the Base Currency Code e.g. `USD`
- `g702`: object - Payment Application (Owner Invoice) summary
  - `balance_to_finish_including_retainage`: string - Balance to finish including retainage e.g. `1268346.55`
  - `completed_work_retainage_percent`: string - Completed work retainage percent e.g. `10.00`
  - `completed_work_retainage_amount`: string - Completed work retainage amount e.g. `1201.0`
  - `contract_sum_to_date`: string - Contract sum to date e.g. `1279159.15`
  - `current_payment_due`: string - Current payment due e.g. `10812.60`
  - `formatted_period`: string - Formatted billing period e.g. `01/06/19 - 30/06/19`
  - `less_previous_certificates_for_payment`: string - Less previous certificates for payment e.g. `0.00`
  - `negative_change_order_item_total`: string - Negative change order item total e.g. `0.00`
  - `negative_new_change_order_item_total`: string - Negative new change order item total e.g. `0.00`
  - `negative_previous_change_order_item_total`: string - Negative previous change order item total e.g. `0.00`
  - `net_change_by_change_orders`: string - Net change by change orders e.g. `256706.65`
  - `original_contract_sum`: string - Original contract sum e.g. `1022452.50`
  - `positive_change_order_item_total`: string - Positive change order item total e.g. `0.00`
  - `positive_new_change_order_item_total`: string - Positive new change order item total e.g. `0.00`
  - `positive_previous_change_order_item_total`: string - Positive previous change order item total e.g. `0.00`
  - `stored_materials_retainage_amount`: string - Stored materials retainage amount e.g. `0.40`
  - `stored_materials_retainage_percent`: string - Stored materials retainage percent e.g. `10.00`
  - `tax_applicable_to_this_payment`: string - Tax applicable to this payment e.g. `0.00`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date e.g. `1201.40`
  - `total_earned_less_retainage`: string - Total earned less retainage e.g. `10812.60`
  - `total_retainage`: string - Total retainage e.g. `1201.40`
- `billing_period`: object - Commitment Billing Period
  - `start_date`: string(date) - Date representing the start of a period e.g. `2013-11-01`
  - `end_date`: string(date) - Date representing the end of a period e.g. `2013-11-30`
- `contract`: object - Contract
  - `id`: integer - Contract ID e.g. `133745`
  - `type`: string - Contract type e.g. `PrimeContract`
  - `title`: string - Contract title e.g. `ROYALE`
- `created_at`: string(date) - When the payment application was created e.g. `2022-04-12T14:55:00Z`
- `updated_at`: string(date) - When the payment application was last updated e.g. `2022-04-12T14:55:00Z`
- `description_type`: string enum[custom, automatic] - Description type to be shown for line items e.g. `automatic`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/payment_applications/{id}

**Show Payment Application (Owner Invoice)**
Return a Payment Application (Owner Invoice)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Payment Application (Owner Invoice) ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `g703`: array of object
  - `id`: integer - ID e.g. `135135`
  - `origin_id`: integer - ID for the record this item originated from. Only present if item type is payment_application_line_item. e.g. `135135`
  - `origin_type`: string enum[LineItem, ChangeOrderPackage] - Type of the record this item originated from. Only present if item type is payment_application_line_item. e.g. `LineItem`
  - `added_from_source`: string enum[contract, change_order] - String representing the type of object this line came from. Only present if item type is payment_application_line_item. e.g. `contract`
  - `added_from_source_id`: integer - ID for the source object this line came from. Only present if item type is payment_application_line_item. e.g. `135135`
  - `balance_to_finish`: string - Balance to finish amount e.g. `1.00`
  - `materials_presently_stored`: string - Materials presently stored amount e.g. `0.00`
  - `scheduled_value`: string - Scheduled value amount e.g. `1.00`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
  - `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
  - `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
  - `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
  - `description_of_work`: string - Description of work e.g. `Install windows`
  - `description_override`: string - Overridden description of work e.g. `Install windows again`
  - `currency_configuration`: object - Payment Application (Owner Invoice) Currency Configuration
    - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
  - `item_number`: integer - Item number e.g. `1`
  - `cost_code`: oneOf(object | object)
  - `wbs_code`: object
    - `id`: integer - Wbs Code ID e.g. `999`
    - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
    - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
  - `scheduled_unit_price`: string - Scheduled unit price e.g. `0.0`
  - `scheduled_quantity`: string - Scheduled quantity e.g. `0.0`
  - `total_completed_and_stored_to_date_quantity`: string - Total completed and stored to date quantity e.g. `0.0`
  - `work_completed_this_period_quantity`: string - Work completed this period quantity e.g. `0.0`
  - `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity e.g. `0.0`
  - `work_completed_retainage_currently_retained`: string - Work completed retainage currently retained amount e.g. `0.0`
  - `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
  - `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
  - `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
  - `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
  - `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained e.g. `0.0`
  - `materials_stored_retainage_from_previous_application`: string - Materials stored retainage amount from previous application e.g. `0.0`
  - `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period e.g. `0.0`
  - `materials_stored_retainage_retained_this_period`: string - Materials stored retainage amount retained this period e.g. `0.0`
  - `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period e.g. `10.0`
  - `total_retainage_currently_retained`: string - Total retainage amount currently retained e.g. `0.0`
  - `total_retainage_from_previous_application`: string - Total retainage amount from previous application e.g. `0.0`
  - `type`: string - Type of PaymentApplicationContractItem e.g. `payment_application_markup_line_item`
- `id`: integer - ID e.g. `58820`
- `billing_date`: string(date) - Billing date e.g. `2013-11-20`
- `invoice_number`: string - Invoice number e.g. `123`
- `origin_data`: string - Payment Application (Owner Invoice) third party data e.g. `XYZ-0012`
- `origin_id`: string - Payment Application (Owner Invoice) third party ID e.g. `abc-123`
- `percent_complete`: string - Percent complete e.g. `0.00`
- `period_start`: string(date) - Period start date e.g. `2013-11-01`
- `period_end`: string(date) - Period end date e.g. `2013-11-02`
- `period_id`: integer - Billing Period Identifier e.g. `7682`
- `status`: string enum[draft, under_review, revise_and_resubmit, approved] - Status e.g. `approved`
- `total_amount_paid`: string - Total amount of Payments made to the Payment Application e.g. `250.00`
- `number`: integer - Payment Application (Owner Invoice) number e.g. `1`
- `total_amount_accrued_this_period`: string - Gross amount of the Invoice. e.g. `125.00`
- `formatted_contract_company`: string - Name of the Owner/Client of the Invoice. e.g. `Simplex Grinnell LLC`
- `currency_configuration`: object - Payment Application (Owner Invoice) Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
- `description_type`: string enum[custom, automatic] - Description type to be shown for line items e.g. `automatic`
- `g702`: object - Payment Application (Owner Invoice) summary
  - `balance_to_finish_including_retainage`: string - Balance to finish including retainage e.g. `1268346.55`
  - `completed_work_retainage_percent`: string - Completed work retainage percent e.g. `10.00`
  - `completed_work_retainage_amount`: string - Completed work retainage amount e.g. `1201.0`
  - `contract_sum_to_date`: string - Contract sum to date e.g. `1279159.15`
  - `current_payment_due`: string - Current payment due e.g. `10812.60`
  - `formatted_period`: string - Formatted billing period e.g. `01/06/19 - 30/06/19`
  - `less_previous_certificates_for_payment`: string - Less previous certificates for payment e.g. `0.00`
  - `negative_change_order_item_total`: string - Negative change order item total e.g. `0.00`
  - `negative_new_change_order_item_total`: string - Negative new change order item total e.g. `0.00`
  - `negative_previous_change_order_item_total`: string - Negative previous change order item total e.g. `0.00`
  - `net_change_by_change_orders`: string - Net change by change orders e.g. `256706.65`
  - `original_contract_sum`: string - Original contract sum e.g. `1022452.50`
  - `positive_change_order_item_total`: string - Positive change order item total e.g. `0.00`
  - `positive_new_change_order_item_total`: string - Positive new change order item total e.g. `0.00`
  - `positive_previous_change_order_item_total`: string - Positive previous change order item total e.g. `0.00`
  - `stored_materials_retainage_amount`: string - Stored materials retainage amount e.g. `0.40`
  - `stored_materials_retainage_percent`: string - Stored materials retainage percent e.g. `10.00`
  - `tax_applicable_to_this_payment`: string - Tax applicable to this payment e.g. `0.00`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date e.g. `1201.40`
  - `total_earned_less_retainage`: string - Total earned less retainage e.g. `10812.60`
  - `total_retainage`: string - Total retainage e.g. `1201.40`
- `billing_period`: object - Commitment Billing Period
  - `start_date`: string(date) - Date representing the start of a period e.g. `2013-11-01`
  - `end_date`: string(date) - Date representing the end of a period e.g. `2013-11-30`
- `contract`: object - Contract
  - `id`: integer - Contract ID e.g. `133745`
  - `type`: string - Contract type e.g. `PrimeContract`
  - `title`: string - Contract title e.g. `ROYALE`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/payment_applications/{id}  **[BETA]**

**Delete a Payment Application (Owner Invoice)**
Delete a Payment Application (Owner Invoice) based on its id

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Payment Application (Owner Invoice) ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/prime_contracts/{prime_contract_id}/payment_applications

**List Payment Applications (Owner Invoices) for Prime Contract**
Return a list of all Payment Applications (Owner Invoices) on a specified Prime Contract
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `prime_contract_id` [path] integer (required) - Prime Contract ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page (default 30)
- `filters[is_last]` [query] boolean - Setting this to true will return only the last item. Setting this to false will return all the items except the last one.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `58820`
- `billing_date`: string(date) - Billing date e.g. `2013-11-20`
- `invoice_number`: string - Invoice number e.g. `123`
- `origin_data`: string - Payment Application (Owner Invoice) third party data e.g. `XYZ-0012`
- `origin_id`: string - Payment Application (Owner Invoice) third party ID e.g. `abc-123`
- `percent_complete`: string - Percent complete e.g. `0.00`
- `period_start`: string(date) - Period start date e.g. `2013-11-01`
- `period_end`: string(date) - Period end date e.g. `2013-11-02`
- `period_id`: integer - Billing Period Identifier e.g. `7682`
- `status`: string enum[draft, under_review, revise_and_resubmit, approved] - Status e.g. `approved`
- `total_amount_paid`: string - Total amount of Payments made to the Payment Application e.g. `250.00`
- `number`: integer - Payment Application (Owner Invoice) number e.g. `1`
- `total_amount_accrued_this_period`: string - Gross amount of the Invoice. e.g. `125.00`
- `formatted_contract_company`: string - Name of the Owner/Client of the Invoice. e.g. `Simplex Grinnell LLC`
- `currency_configuration`: object - Payment Application (Owner Invoice) Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
  - `currency_exchange_rate`: string - Exchange rate for the Currency e.g. `2.1`
  - `base_currency_iso_code`: string - ISO Code for the Base Currency Code e.g. `USD`
- `g702`: object - Payment Application (Owner Invoice) summary
  - `balance_to_finish_including_retainage`: string - Balance to finish including retainage e.g. `1268346.55`
  - `completed_work_retainage_percent`: string - Completed work retainage percent e.g. `10.00`
  - `completed_work_retainage_amount`: string - Completed work retainage amount e.g. `1201.0`
  - `contract_sum_to_date`: string - Contract sum to date e.g. `1279159.15`
  - `current_payment_due`: string - Current payment due e.g. `10812.60`
  - `formatted_period`: string - Formatted billing period e.g. `01/06/19 - 30/06/19`
  - `less_previous_certificates_for_payment`: string - Less previous certificates for payment e.g. `0.00`
  - `negative_change_order_item_total`: string - Negative change order item total e.g. `0.00`
  - `negative_new_change_order_item_total`: string - Negative new change order item total e.g. `0.00`
  - `negative_previous_change_order_item_total`: string - Negative previous change order item total e.g. `0.00`
  - `net_change_by_change_orders`: string - Net change by change orders e.g. `256706.65`
  - `original_contract_sum`: string - Original contract sum e.g. `1022452.50`
  - `positive_change_order_item_total`: string - Positive change order item total e.g. `0.00`
  - `positive_new_change_order_item_total`: string - Positive new change order item total e.g. `0.00`
  - `positive_previous_change_order_item_total`: string - Positive previous change order item total e.g. `0.00`
  - `stored_materials_retainage_amount`: string - Stored materials retainage amount e.g. `0.40`
  - `stored_materials_retainage_percent`: string - Stored materials retainage percent e.g. `10.00`
  - `tax_applicable_to_this_payment`: string - Tax applicable to this payment e.g. `0.00`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date e.g. `1201.40`
  - `total_earned_less_retainage`: string - Total earned less retainage e.g. `10812.60`
  - `total_retainage`: string - Total retainage e.g. `1201.40`
- `billing_period`: object - Commitment Billing Period
  - `start_date`: string(date) - Date representing the start of a period e.g. `2013-11-01`
  - `end_date`: string(date) - Date representing the end of a period e.g. `2013-11-30`
- `contract`: object - Contract
  - `id`: integer - Contract ID e.g. `133745`
  - `type`: string - Contract type e.g. `PrimeContract`
  - `title`: string - Contract title e.g. `ROYALE`
- `created_at`: string(date) - When the payment application was created e.g. `2022-04-12T14:55:00Z`
- `updated_at`: string(date) - When the payment application was last updated e.g. `2022-04-12T14:55:00Z`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/prime_contracts/{prime_contract_id}/payment_applications

**Create Payment Application (Owner Invoice) for Prime Contract**
Create a Payment Application (Owner Invoice) on a specified Prime Contract

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `prime_contract_id` [path] integer (required) - Prime Contract ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `55001`
- `attachments`: array of string - Payment application attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
- `payment_application`: object - Payment Application (Owner Invoice)
  - `commitment_billing_period_id`: integer - Billing Period ID e.g. `20093`
  - `period_start`: string(date) - Period start date e.g. `2013-10-01`
  - `period_end`: string(date) - Period end date e.g. `2013-10-31`
  - `billing_date`: string(date) - Billing date e.g. `2013-10-31`
  - `invoice_number`: string - Invoice number e.g. `ABC-1234`
  - `origin_data`: string - Payment Application (Owner Invoice) third party data e.g. `XYZ-0012`
  - `origin_id`: string - Payment Application (Owner Invoice) third party ID e.g. `abc-123`
  - `status`: string enum[draft, under_review, revise_and_resubmit, approved] - Status e.g. `under_review`
  - `include_attachments`: boolean - If true, all attachments from requisitions in the billing period will be attached to the payment application e.g. `true`

Response 201 (application/json): object

- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `g703`: array of object
  - `id`: integer - ID e.g. `135135`
  - `balance_to_finish`: string - Balance to finish amount e.g. `1.00`
  - `materials_presently_stored`: string - Materials presently stored amount e.g. `0.00`
  - `scheduled_value`: string - Scheduled value amount e.g. `1.00`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
  - `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
  - `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
  - `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
  - `description_of_work`: string - Description of work e.g. `Install windows`
  - `description_override`: string - Overridden description of work e.g. `Install windows again`
  - `currency_configuration`: object - Payment Application (Owner Invoice) Currency Configuration
    - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
    - `currency_exchange_rate`: string - Exchange rate for the Currency e.g. `2.1`
    - `base_currency_iso_code`: string - ISO Code for the Base Currency Code e.g. `USD`
  - `item_number`: integer - Item number e.g. `1`
  - `cost_code`: oneOf(object | object)
  - `wbs_code`: object
    - `id`: integer - Wbs Code ID e.g. `999`
    - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
    - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
  - `scheduled_unit_price`: string - Scheduled unit price e.g. `0.0`
  - `scheduled_quantity`: string - Scheduled quantity e.g. `0.0`
  - `total_completed_and_stored_to_date_quantity`: string - Total completed and stored to date quantity e.g. `0.0`
  - `work_completed_this_period_quantity`: string - Work completed this period quantity e.g. `0.0`
  - `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity e.g. `0.0`
  - `work_completed_retainage_currently_retained`: string - Work completed retainage currently retained amount e.g. `0.0`
  - `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
  - `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
  - `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
  - `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
  - `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained e.g. `0.0`
  - `materials_stored_retainage_from_previous_application`: string - Materials stored retainage amount from previous application e.g. `0.0`
  - `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period e.g. `0.0`
  - `materials_stored_retainage_retained_this_period`: string - Materials stored retainage amount retained this period e.g. `0.0`
  - `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period e.g. `10.0`
  - `total_retainage_currently_retained`: string - Total retainage amount currently retained e.g. `0.0`
  - `total_retainage_from_previous_application`: string - Total retainage amount from previous application e.g. `0.0`
  - `type`: string - Type of PaymentApplicationContractItem e.g. `payment_application_markup_line_item`
- `id`: integer - ID e.g. `58820`
- `billing_date`: string(date) - Billing date e.g. `2013-11-20`
- `invoice_number`: string - Invoice number e.g. `123`
- `origin_data`: string - Payment Application (Owner Invoice) third party data e.g. `XYZ-0012`
- `origin_id`: string - Payment Application (Owner Invoice) third party ID e.g. `abc-123`
- `percent_complete`: string - Percent complete e.g. `0.00`
- `period_start`: string(date) - Period start date e.g. `2013-11-01`
- `period_end`: string(date) - Period end date e.g. `2013-11-02`
- `period_id`: integer - Billing Period Identifier e.g. `7682`
- `status`: string enum[draft, under_review, revise_and_resubmit, approved] - Status e.g. `approved`
- `total_amount_paid`: string - Total amount of Payments made to the Payment Application e.g. `250.00`
- `number`: integer - Payment Application (Owner Invoice) number e.g. `1`
- `total_amount_accrued_this_period`: string - Gross amount of the Invoice. e.g. `125.00`
- `formatted_contract_company`: string - Name of the Owner/Client of the Invoice. e.g. `Simplex Grinnell LLC`
- `currency_configuration`: object - Payment Application (Owner Invoice) Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
  - `currency_exchange_rate`: string - Exchange rate for the Currency e.g. `2.1`
  - `base_currency_iso_code`: string - ISO Code for the Base Currency Code e.g. `USD`
- `description_type`: string enum[custom, automatic] - Description type to be shown for line items e.g. `automatic`
- `g702`: object - Payment Application (Owner Invoice) summary
  - `balance_to_finish_including_retainage`: string - Balance to finish including retainage e.g. `1268346.55`
  - `completed_work_retainage_percent`: string - Completed work retainage percent e.g. `10.00`
  - `completed_work_retainage_amount`: string - Completed work retainage amount e.g. `1201.0`
  - `contract_sum_to_date`: string - Contract sum to date e.g. `1279159.15`
  - `current_payment_due`: string - Current payment due e.g. `10812.60`
  - `formatted_period`: string - Formatted billing period e.g. `01/06/19 - 30/06/19`
  - `less_previous_certificates_for_payment`: string - Less previous certificates for payment e.g. `0.00`
  - `negative_change_order_item_total`: string - Negative change order item total e.g. `0.00`
  - `negative_new_change_order_item_total`: string - Negative new change order item total e.g. `0.00`
  - `negative_previous_change_order_item_total`: string - Negative previous change order item total e.g. `0.00`
  - `net_change_by_change_orders`: string - Net change by change orders e.g. `256706.65`
  - `original_contract_sum`: string - Original contract sum e.g. `1022452.50`
  - `positive_change_order_item_total`: string - Positive change order item total e.g. `0.00`
  - `positive_new_change_order_item_total`: string - Positive new change order item total e.g. `0.00`
  - `positive_previous_change_order_item_total`: string - Positive previous change order item total e.g. `0.00`
  - `stored_materials_retainage_amount`: string - Stored materials retainage amount e.g. `0.40`
  - `stored_materials_retainage_percent`: string - Stored materials retainage percent e.g. `10.00`
  - `tax_applicable_to_this_payment`: string - Tax applicable to this payment e.g. `0.00`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date e.g. `1201.40`
  - `total_earned_less_retainage`: string - Total earned less retainage e.g. `10812.60`
  - `total_retainage`: string - Total retainage e.g. `1201.40`
- `billing_period`: object - Commitment Billing Period
  - `start_date`: string(date) - Date representing the start of a period e.g. `2013-11-01`
  - `end_date`: string(date) - Date representing the end of a period e.g. `2013-11-30`
- `contract`: object - Contract
  - `id`: integer - Contract ID e.g. `133745`
  - `type`: string - Contract type e.g. `PrimeContract`
  - `title`: string - Contract title e.g. `ROYALE`

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/prime_contracts/{prime_contract_id}/payment_applications/{id}

**Update Payment Application (Owner Invoice) for Prime Contract**
Update a Payment Application (Owner Invoice) on a specified Prime Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `prime_contract_id` [path] integer (required) - Prime Contract ID
- `id` [path] integer (required) - Payment Application (Owner Invoice) ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `55001`
- `attachments`: array of string - Payment application attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
- `payment_application`: object - Payment Application (Owner Invoice)
  - `commitment_billing_period_id`: integer - Billing Period ID e.g. `20093`
  - `period_start`: string(date) - Period start date e.g. `2013-10-01`
  - `period_end`: string(date) - Period end date e.g. `2013-10-31`
  - `billing_date`: string(date) - Billing date e.g. `2013-10-31`
  - `invoice_number`: string - Invoice number e.g. `ABC-1234`
  - `origin_data`: string - Payment Application (Owner Invoice) third party data e.g. `XYZ-0012`
  - `origin_id`: string - Payment Application (Owner Invoice) third party ID e.g. `abc-123`
  - `status`: string enum[draft, under_review, revise_and_resubmit, approved] - Status e.g. `under_review`

Response 200 (application/json): object

- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `g703`: array of object
  - `id`: integer - ID e.g. `135135`
  - `balance_to_finish`: string - Balance to finish amount e.g. `1.00`
  - `materials_presently_stored`: string - Materials presently stored amount e.g. `0.00`
  - `scheduled_value`: string - Scheduled value amount e.g. `1.00`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date amount e.g. `0.00`
  - `total_completed_and_stored_to_date_percent`: string - Total completed and stored to date percent e.g. `0.0`
  - `work_completed_from_previous_application`: string - Work completed from previous application amount e.g. `0.00`
  - `work_completed_this_period`: string - Work completed this period amount e.g. `0.00`
  - `description_of_work`: string - Description of work e.g. `Install windows`
  - `description_override`: string - Overridden description of work e.g. `Install windows again`
  - `currency_configuration`: object - Payment Application (Owner Invoice) Currency Configuration
    - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
    - `currency_exchange_rate`: string - Exchange rate for the Currency e.g. `2.1`
    - `base_currency_iso_code`: string - ISO Code for the Base Currency Code e.g. `USD`
  - `item_number`: integer - Item number e.g. `1`
  - `cost_code`: oneOf(object | object)
  - `wbs_code`: object
    - `id`: integer - Wbs Code ID e.g. `999`
    - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
    - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
  - `scheduled_unit_price`: string - Scheduled unit price e.g. `0.0`
  - `scheduled_quantity`: string - Scheduled quantity e.g. `0.0`
  - `total_completed_and_stored_to_date_quantity`: string - Total completed and stored to date quantity e.g. `0.0`
  - `work_completed_this_period_quantity`: string - Work completed this period quantity e.g. `0.0`
  - `work_completed_from_previous_application_quantity`: string - Work completed from previous application quantity e.g. `0.0`
  - `work_completed_retainage_currently_retained`: string - Work completed retainage currently retained amount e.g. `0.0`
  - `work_completed_retainage_from_previous_application`: string - Work completed retainage amount from previous application e.g. `0.0`
  - `work_completed_retainage_released_this_period`: string - Work completed retainage amount released this period e.g. `0.0`
  - `work_completed_retainage_retained_this_period`: string - Work completed retainage amount retained this period e.g. `0.0`
  - `work_completed_retainage_percent_this_period`: string - Work completed retainage percent this period e.g. `10.0`
  - `materials_stored_retainage_currently_retained`: string - Materials stored retainage amount currently retained e.g. `0.0`
  - `materials_stored_retainage_from_previous_application`: string - Materials stored retainage amount from previous application e.g. `0.0`
  - `materials_stored_retainage_released_this_period`: string - Materials stored retainage amount released this period e.g. `0.0`
  - `materials_stored_retainage_retained_this_period`: string - Materials stored retainage amount retained this period e.g. `0.0`
  - `materials_stored_retainage_percent_this_period`: string - Materials stored retainage percent this period e.g. `10.0`
  - `total_retainage_currently_retained`: string - Total retainage amount currently retained e.g. `0.0`
  - `total_retainage_from_previous_application`: string - Total retainage amount from previous application e.g. `0.0`
  - `type`: string - Type of PaymentApplicationContractItem e.g. `payment_application_markup_line_item`
- `id`: integer - ID e.g. `58820`
- `billing_date`: string(date) - Billing date e.g. `2013-11-20`
- `invoice_number`: string - Invoice number e.g. `123`
- `origin_data`: string - Payment Application (Owner Invoice) third party data e.g. `XYZ-0012`
- `origin_id`: string - Payment Application (Owner Invoice) third party ID e.g. `abc-123`
- `percent_complete`: string - Percent complete e.g. `0.00`
- `period_start`: string(date) - Period start date e.g. `2013-11-01`
- `period_end`: string(date) - Period end date e.g. `2013-11-02`
- `period_id`: integer - Billing Period Identifier e.g. `7682`
- `status`: string enum[draft, under_review, revise_and_resubmit, approved] - Status e.g. `approved`
- `total_amount_paid`: string - Total amount of Payments made to the Payment Application e.g. `250.00`
- `number`: integer - Payment Application (Owner Invoice) number e.g. `1`
- `total_amount_accrued_this_period`: string - Gross amount of the Invoice. e.g. `125.00`
- `formatted_contract_company`: string - Name of the Owner/Client of the Invoice. e.g. `Simplex Grinnell LLC`
- `currency_configuration`: object - Payment Application (Owner Invoice) Currency Configuration
  - `currency_iso_code`: string - ISO Code for the Currency e.g. `USD`
  - `currency_exchange_rate`: string - Exchange rate for the Currency e.g. `2.1`
  - `base_currency_iso_code`: string - ISO Code for the Base Currency Code e.g. `USD`
- `description_type`: string enum[custom, automatic] - Description type to be shown for line items e.g. `automatic`
- `g702`: object - Payment Application (Owner Invoice) summary
  - `balance_to_finish_including_retainage`: string - Balance to finish including retainage e.g. `1268346.55`
  - `completed_work_retainage_percent`: string - Completed work retainage percent e.g. `10.00`
  - `completed_work_retainage_amount`: string - Completed work retainage amount e.g. `1201.0`
  - `contract_sum_to_date`: string - Contract sum to date e.g. `1279159.15`
  - `current_payment_due`: string - Current payment due e.g. `10812.60`
  - `formatted_period`: string - Formatted billing period e.g. `01/06/19 - 30/06/19`
  - `less_previous_certificates_for_payment`: string - Less previous certificates for payment e.g. `0.00`
  - `negative_change_order_item_total`: string - Negative change order item total e.g. `0.00`
  - `negative_new_change_order_item_total`: string - Negative new change order item total e.g. `0.00`
  - `negative_previous_change_order_item_total`: string - Negative previous change order item total e.g. `0.00`
  - `net_change_by_change_orders`: string - Net change by change orders e.g. `256706.65`
  - `original_contract_sum`: string - Original contract sum e.g. `1022452.50`
  - `positive_change_order_item_total`: string - Positive change order item total e.g. `0.00`
  - `positive_new_change_order_item_total`: string - Positive new change order item total e.g. `0.00`
  - `positive_previous_change_order_item_total`: string - Positive previous change order item total e.g. `0.00`
  - `stored_materials_retainage_amount`: string - Stored materials retainage amount e.g. `0.40`
  - `stored_materials_retainage_percent`: string - Stored materials retainage percent e.g. `10.00`
  - `tax_applicable_to_this_payment`: string - Tax applicable to this payment e.g. `0.00`
  - `total_completed_and_stored_to_date`: string - Total completed and stored to date e.g. `1201.40`
  - `total_earned_less_retainage`: string - Total earned less retainage e.g. `10812.60`
  - `total_retainage`: string - Total retainage e.g. `1201.40`
- `billing_period`: object - Commitment Billing Period
  - `start_date`: string(date) - Date representing the start of a period e.g. `2013-11-01`
  - `end_date`: string(date) - Date representing the end of a period e.g. `2013-11-30`
- `contract`: object - Contract
  - `id`: integer - Contract ID e.g. `133745`
  - `type`: string - Contract type e.g. `PrimeContract`
  - `title`: string - Contract title e.g. `ROYALE`

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Prime Change Order Batches

Resource id: `prime-change-order-batches`. Raw spec: `../openapi-raw/prime-change-order-batches.json`. Web: https://developers.procore.com/reference/rest/prime-change-order-batches?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/projects/{project_id}/prime_change_order_batches

**Show All Prime Change Order Batches**
Returns all Prime Change Order Batches for the specified Project.

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

### POST /rest/v1.0/projects/{project_id}/prime_change_order_batches

**Create Prime Change Order Batch**
Create a new Prime Change Order Batch.

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

- `id`: integer - Prime Change Order Batch ID e.g. `34219`
- `contract_id`: integer - Contract ID e.g. `45121`
- `created_at`: string(date-time) - Created at e.g. `2017-08-14T21:39:40Z`
- `description`: string - Description of the Prime Change Order Batch e.g. `<p>Batch description</p>`
- `due_date`: string(date) - Due date e.g. `2021-05-14`
- `executed`: boolean - Whether or not the Prime Change Order Batch is executed e.g. `true`
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
- `signature_required`: boolean - Whether or not a signature is required on the Prime Change Order e.g. `false`
- `signed_change_order_received_date`: string(date) - Signed change order received date e.g. `2016-10-23`
- `status`: string - The status of the Prime Change Order e.g. `draft`
- `title`: string - Title e.g. `ABC Prime Change Order Batch`
- `type`: string - Type e.g. `Prime`
- `updated_at`: string(date-time) e.g. `2016-10-26T21:43:40Z`
- `created_by`: object - User that created the Prime Change Order Batcb
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `designated_reviewer`: object - Prime CO Batch Designated Reviewer.
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `reviewed_by`: object - Prime CO Reviewed By
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

### GET /rest/v1.0/projects/{project_id}/prime_change_order_batches/{id}

**Show Prime Change Order Batch**
Show the details of the Prime Change Order Batch.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Prime Change Order Batch

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/prime_change_order_batches/{id}

**Update Prime Change Order Batch**
Update the specified Prime Change Order Batch.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Prime Change Order Batch
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

- `id`: integer - Prime Change Order Batch ID e.g. `34219`
- `contract_id`: integer - Contract ID e.g. `45121`
- `created_at`: string(date-time) - Created at e.g. `2017-08-14T21:39:40Z`
- `description`: string - Description of the Prime Change Order Batch e.g. `<p>Batch description</p>`
- `due_date`: string(date) - Due date e.g. `2021-05-14`
- `executed`: boolean - Whether or not the Prime Change Order Batch is executed e.g. `true`
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
- `signature_required`: boolean - Whether or not a signature is required on the Prime Change Order e.g. `false`
- `signed_change_order_received_date`: string(date) - Signed change order received date e.g. `2016-10-23`
- `status`: string - The status of the Prime Change Order e.g. `draft`
- `title`: string - Title e.g. `ABC Prime Change Order Batch`
- `type`: string - Type e.g. `Prime`
- `updated_at`: string(date-time) e.g. `2016-10-26T21:43:40Z`
- `created_by`: object - User that created the Prime Change Order Batcb
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `designated_reviewer`: object - Prime CO Batch Designated Reviewer.
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `reviewed_by`: object - Prime CO Reviewed By
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

### DELETE /rest/v1.0/projects/{project_id}/prime_change_order_batches/{id}

**Delete Prime Change Order Batch**
Delete the specified Prime Change Order Batch.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Prime Change Order Batch

Response 204: No Content (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Prime Change Order Line Items

Resource id: `prime-change-order-line-items`. Raw spec: `../openapi-raw/prime-change-order-line-items.json`. Web: https://developers.procore.com/reference/rest/prime-change-order-line-items?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_change_orders/{prime_change_order_id}/line_items

**List Prime Change Order Line Items**
List all line items for a given prime change order.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `prime_change_order_id` [path] string (required) - Unique identifier for the Prime Change Order. See `GET /rest/v1.0/projects/{project_id}/prime_change_orders`.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[default, extended] - The view to use for the response. Use `extended` to include `change_event_line_item` and `external_data` (ERP origin fields). An invalid value returns a 400 error.

Response 200 (application/json): object

- `data`: array of oneOf(object | object) - Array of Prime Change Order Line Items

Error responses: 400, 401, 403, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_change_orders/{prime_change_order_id}/line_items

**Create Prime Change Order Line Item**
Creates a line item for a given prime change order.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `prime_change_order_id` [path] string (required) - Unique identifier for the Prime Change Order. See `GET /rest/v1.0/projects/{project_id}/prime_change_orders`.

Request body (application/json) (required):

- `prime_line_item_id`: string - ID of the prime contract line item associated with this line item. Pass null when updating to remove the association. e.g. `12345`
- `rate_value_id`: string - ID of the project rate value selected for this line item. Accepted only for unit-quantity schedules of values. Pass null when updating to clear the selected rate. e.g. `01JFHMDB8AD4750F18KN8R2TF1`
- `resource_id`: string - ID of the resource assigned to this line item. When provided with a rate value, the resource must match the resource associated with that rate. Accepted only for unit-quantity schedules of values. Pass null when updat... e.g. `01JFHMDB8AD4750F18KN8R2TF2`
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
  - `funding_rule_id`: string - ID of the funding rule associated with this line item e.g. `12345`
  - `resource`: object - Rate and resource selection associated with a line item.
    - `rate_value_id`: string (required) - ID of the selected rate value. Null when the line item uses a manually entered rate. e.g. `01JFHMDB8AD4750F18KN8R2TF1`
    - `currency_iso_code`: string (required) - Three-letter ISO 4217 currency code for the selected or manually entered rate. e.g. `USD`
    - `resource_category`: string (required) - Category used to classify the selected labor, equipment, or other resource. Null when no resource is assigned. e.g. `work_classification`
    - `resource_id`: string (required) - ID of the resource assigned to the line item. Null when no resource is assigned. e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `resource_name`: string (required) - Display name of the resource assigned to the line item. Null when no resource is assigned. e.g. `Carpenter`
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

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_change_orders/{prime_change_order_id}/line_items/{id}

**Show Prime Change Order Line Item**
Get a specified line item for a given prime change order.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `prime_change_order_id` [path] string (required) - Unique identifier for the Prime Change Order. See `GET /rest/v1.0/projects/{project_id}/prime_change_orders`.
- `id` [path] string (required) - ID of the line item
- `view` [query] string enum[default, extended] - The view to use for the response. Use `extended` to include `change_event_line_item` and `external_data` (ERP origin fields). An invalid value returns a 400 error.

Response 200 (application/json): object

- `data`: oneOf(object | object)

Error responses: 400, 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_change_orders/{prime_change_order_id}/line_items/{id}

**Update Prime Change Order Line Item**
Updates a line item for a given prime change order.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `prime_change_order_id` [path] string (required) - Unique identifier for the Prime Change Order. See `GET /rest/v1.0/projects/{project_id}/prime_change_orders`.
- `id` [path] string (required) - ID of the line item

Request body (application/json) (required):

- `prime_line_item_id`: string - ID of the prime contract line item associated with this line item. Pass null when updating to remove the association. e.g. `12345`
- `rate_value_id`: string - ID of the project rate value selected for this line item. Accepted only for unit-quantity schedules of values. Pass null when updating to clear the selected rate. e.g. `01JFHMDB8AD4750F18KN8R2TF1`
- `resource_id`: string - ID of the resource assigned to this line item. When provided with a rate value, the resource must match the resource associated with that rate. Accepted only for unit-quantity schedules of values. Pass null when updat... e.g. `01JFHMDB8AD4750F18KN8R2TF2`
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
  - `funding_rule_id`: string - ID of the funding rule associated with this line item e.g. `12345`
  - `resource`: object - Rate and resource selection associated with a line item.
    - `rate_value_id`: string (required) - ID of the selected rate value. Null when the line item uses a manually entered rate. e.g. `01JFHMDB8AD4750F18KN8R2TF1`
    - `currency_iso_code`: string (required) - Three-letter ISO 4217 currency code for the selected or manually entered rate. e.g. `USD`
    - `resource_category`: string (required) - Category used to classify the selected labor, equipment, or other resource. Null when no resource is assigned. e.g. `work_classification`
    - `resource_id`: string (required) - ID of the resource assigned to the line item. Null when no resource is assigned. e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `resource_name`: string (required) - Display name of the resource assigned to the line item. Null when no resource is assigned. e.g. `Carpenter`
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

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_change_orders/{prime_change_order_id}/line_items/{id}

**Delete Prime Change Order Line Item**
Deletes a specified prime change order line item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `prime_change_order_id` [path] string (required) - Unique identifier for the Prime Change Order. See `GET /rest/v1.0/projects/{project_id}/prime_change_orders`.
- `id` [path] string (required) - ID of the line item

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Prime Change Order Rows CSV Exports

Resource id: `prime-change-order-rows-csv-exports`. Raw spec: `../openapi-raw/prime-change-order-rows-csv-exports.json`. Web: https://developers.procore.com/reference/rest/prime-change-order-rows-csv-exports?version=latest
Product lines: Construction Financials

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_change_order_rows/csv_exports  **[BETA]**

**Create CSV export for Prime Change Order Rows**
Creates a CSV export for the Prime Change Order Rows collection.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Response 202 (application/json): object

- `data`: object (required)
  - `export_id`: string (required) - Identifier for the asynchronous CSV export job.
  - `expires_at`: string(date-time) (required) - ISO8601 timestamp when the export URL will expire.

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_change_order_rows/csv_exports/{change_order_csv_export_id}  **[BETA]**

**Check CSV export status for Prime Change Order Rows**
Returns the current status of a Prime Change Order Rows CSV export request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `change_order_csv_export_id` [path] string (required) - Unique identifier for a change order CSV export job.

Response 202: Accepted. The CSV file is still being generated. (no body)

Error responses: 302, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Prime Change Orders

Resource id: `prime-change-orders`. Raw spec: `../openapi-raw/prime-change-orders.json`. Web: https://developers.procore.com/reference/rest/prime-change-orders?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/projects/{project_id}/prime_change_orders

**Show All Prime Change Orders**
Returns all Prime Change Orders for the specified Project. This endpoint currently only supports projects using 1 and 2 tier change order configurations.

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

### POST /rest/v1.0/projects/{project_id}/prime_change_orders

**Create Prime Change Order**
Create a new Prime Change Order. This endpoint currently only supports projects using 1 and 2 tier change order configurations.

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

### GET /rest/v1.0/projects/{project_id}/prime_change_orders/{id}

**Show Prime Change Order**
Show the details of the Prime Change Order. This endpoint currently only supports projects using 1 and 2 tier change order configurations.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Prime Change Order
- `view` [query] string enum[default, extended] - Specifies Which view (which attributes) of the resource is going to be present in the response. the extended view includes change events data, while the default view does not.

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/prime_change_orders/{id}

**Update Prime Change Order**
Update the specified Prime Change Order. This endpoint currently only supports projects using 1 and 2 tier change order configurations.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Prime Change Order
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

### DELETE /rest/v1.0/projects/{project_id}/prime_change_orders/{id}

**Delete Prime Change Order**
Delete the specified Prime Change Order. This endpoint currently only supports projects using 1 and 2 tier change order configurations.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Prime Change Order

Response 204: No Content (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Prime Change Orders Batches Export PDF

Resource id: `prime-change-orders-batches-export-pdf`. Raw spec: `../openapi-raw/prime-change-orders-batches-export-pdf.json`. Web: https://developers.procore.com/reference/rest/prime-change-orders-batches-export-pdf?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_change_order_batches/{prime_change_order_batch_id}/pdf  **[BETA]**

**Check PDF generation status**
Check the status of a PDF document generation for a prime contract change order batch.
Note: This endpoint is currently only supported in Procore Zones US01 && US02.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `prime_change_order_batch_id` [path] string (required) - Unique identifier for the Prime Change Order Batch.

Response 202: Accepted (no body)

Error responses: 302, 400, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_change_order_batches/{prime_change_order_batch_id}/pdf  **[BETA]**

**Create PDF export for a Prime Change Order Batch**
Creates a PDF export for a given Prime Change Order Batch.
Note: This endpoint is currently only supported in Procore Zones US01 && US02.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `prime_change_order_batch_id` [path] string (required) - Unique identifier for the Prime Change Order Batch.

Response 202: Accepted, returns back location to PDF export job which can be queried for progress. (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Prime Change Orders Export PDF

Resource id: `prime-change-orders-export-pdf`. Raw spec: `../openapi-raw/prime-change-orders-export-pdf.json`. Web: https://developers.procore.com/reference/rest/prime-change-orders-export-pdf?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_change_orders/{prime_change_order_id}/pdf  **[BETA]**

**Check PDF generation status**
Check the status of a PDF document generation for a prime contract change order.
Note: This endpoint is currently only supported in Procore Zones US01 && US02.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `prime_change_order_id` [path] string (required) - Unique identifier for the Prime Change Order. See `GET /rest/v1.0/projects/{project_id}/prime_change_orders`.

Response 202: Accepted (no body)

Error responses: 302, 400, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_change_orders/{prime_change_order_id}/pdf  **[BETA]**

**Create PDF export for a Prime Change Order**
Creates a PDF export for a given Prime Change Order.
Note: This endpoint is currently only supported in Procore Zones US01 && US02.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `prime_change_order_id` [path] string (required) - Unique identifier for the Prime Change Order. See `GET /rest/v1.0/projects/{project_id}/prime_change_orders`.

Response 202: Accepted, returns back location to PDF export job which can be queried for progress. (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Prime Contract Attachments

Resource id: `prime-contract-attachments`. Raw spec: `../openapi-raw/prime-contract-attachments.json`. Web: https://developers.procore.com/reference/rest/prime-contract-attachments?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_contracts/{prime_contract_id}/attachments  **[BETA]**

**List Prime Contract Attachments**
Returns a list of attachments for a given prime contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `prime_contract_id` [path] string (required) - Unique identifier for the Prime Contract.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[contract][include_deleted]` [query] boolean - Whether to resolve the parent contract when it has been deleted. Set to true to list attachments for a deleted contract. Defaults to false.

Response 200 (application/json): object

- `data`: array of object - Array of prime contract attachments
  - `id`: string - The unique identifier of the attachment e.g. `123`
  - `name`: string - The name of the attachment e.g. `attachment`
  - `url`: string - The URL of the attachment e.g. `https://example.com/attachment`
  - `content_type`: string - The content type of the attachment e.g. `application/pdf`
  - `uuid`: string - The UUID of the attachment e.g. `05bda4e805e4f29036435c0c94188cc61e34`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Prime Contract Line Items

Resource id: `prime-contract-line-items`. Raw spec: `../openapi-raw/prime-contract-line-items.json`. Web: https://developers.procore.com/reference/rest/prime-contract-line-items?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_contracts/{prime_contract_id}/line_items

**List Prime Contract Line Items**
List all line items for a given prime contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `prime_contract_id` [path] string (required) - Unique identifier for the Prime Contract.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[default, extended] - The view to use for the response. Use `extended` to include `external_data` (ERP origin fields). An invalid value returns a 400 error.

Response 200 (application/json): object

- `data`: array of oneOf(object | object) - Array of Prime Contract Line Items

Error responses: 400, 401, 403, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_contracts/{prime_contract_id}/line_items

**Create Prime Contract Line Item**
Creates a line item for a given prime contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `prime_contract_id` [path] string (required) - Unique identifier for the Prime Contract.

Request body (application/json) (required):

- `line_item_group_id`: string - ID of the line item group to associate with this line item e.g. `12345`
- `rate_value_id`: string - ID of the project rate value selected for this line item. Accepted only for unit-quantity schedule of values. Pass null when updating to clear the selected rate. e.g. `01JFHMDB8AD4750F18KN8R2TF1`
- `resource_id`: string - ID of the resource assigned to this line item. When provided with a rate value, the resource must match the resource associated with that rate. Accepted only for unit-quantity schedule of values. Pass null when updati... e.g. `01JFHMDB8AD4750F18KN8R2TF2`
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
  - `line_item_group_id`: string - ID of the line item group associated with this line item e.g. `12345`
  - `funding_rule_id`: string - ID of the funding rule associated with this line item e.g. `12345`
  - `resource`: object - Rate and resource selection associated with a line item.
    - `rate_value_id`: string (required) - ID of the selected rate value. Null when the line item uses a manually entered rate. e.g. `01JFHMDB8AD4750F18KN8R2TF1`
    - `currency_iso_code`: string (required) - Three-letter ISO 4217 currency code for the selected or manually entered rate. e.g. `USD`
    - `resource_category`: string (required) - Category used to classify the selected labor, equipment, or other resource. Null when no resource is assigned. e.g. `work_classification`
    - `resource_id`: string (required) - ID of the resource assigned to the line item. Null when no resource is assigned. e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `resource_name`: string (required) - Display name of the resource assigned to the line item. Null when no resource is assigned. e.g. `Carpenter`
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

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_contracts/{prime_contract_id}/line_items/{id}

**Show Prime Contract Line Item**
Get a specified line item for a given prime contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `prime_contract_id` [path] string (required) - Unique identifier for the Prime Contract.
- `id` [path] string (required) - ID of the line item
- `view` [query] string enum[default, extended] - The view to use for the response. Use `extended` to include `external_data` (ERP origin fields). An invalid value returns a 400 error.

Response 200 (application/json): object

- `data`: oneOf(object | object)

Error responses: 400, 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_contracts/{prime_contract_id}/line_items/{id}

**Update Prime Contract Line Item**
Updates a line item for a given prime contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `prime_contract_id` [path] string (required) - Unique identifier for the Prime Contract.
- `id` [path] string (required) - ID of the line item

Request body (application/json) (required):

- `line_item_group_id`: string - ID of the line item group to associate with this line item e.g. `12345`
- `rate_value_id`: string - ID of the project rate value selected for this line item. Accepted only for unit-quantity schedule of values. Pass null when updating to clear the selected rate. e.g. `01JFHMDB8AD4750F18KN8R2TF1`
- `resource_id`: string - ID of the resource assigned to this line item. When provided with a rate value, the resource must match the resource associated with that rate. Accepted only for unit-quantity schedule of values. Pass null when updati... e.g. `01JFHMDB8AD4750F18KN8R2TF2`
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
  - `line_item_group_id`: string - ID of the line item group associated with this line item e.g. `12345`
  - `funding_rule_id`: string - ID of the funding rule associated with this line item e.g. `12345`
  - `resource`: object - Rate and resource selection associated with a line item.
    - `rate_value_id`: string (required) - ID of the selected rate value. Null when the line item uses a manually entered rate. e.g. `01JFHMDB8AD4750F18KN8R2TF1`
    - `currency_iso_code`: string (required) - Three-letter ISO 4217 currency code for the selected or manually entered rate. e.g. `USD`
    - `resource_category`: string (required) - Category used to classify the selected labor, equipment, or other resource. Null when no resource is assigned. e.g. `work_classification`
    - `resource_id`: string (required) - ID of the resource assigned to the line item. Null when no resource is assigned. e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `resource_name`: string (required) - Display name of the resource assigned to the line item. Null when no resource is assigned. e.g. `Carpenter`
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

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_contracts/{prime_contract_id}/line_items/{id}

**Delete Prime Contract Line Item**
Deletes a specified prime contract line item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `prime_contract_id` [path] string (required) - Unique identifier for the Prime Contract.
- `id` [path] string (required) - ID of the line item

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/prime_contracts/{prime_contract_id}/line_items

**List Prime Contract line items**
Return a list of all Line Items for the Prime Contract.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.
Note: A v2.0 version of this endpoint is available and recommended for new integrations: GET /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_contracts/{prime_contract_id}/line_items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `prime_contract_id` [path] integer (required) - Prime Contract ID
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

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/prime_contracts/{prime_contract_id}/line_items

**Create Prime Contract line item**
Create a new Line Item for the Prime Contract.
Note: A budget line item will automatically be created for Non-budgeted line items for all new projects and for projects enabled with Non-Budgeted line item beta functionality

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `prime_contract_id` [path] integer (required) - Prime Contract ID
- `project_id` [query] integer (required) - Unique identifier for the project.

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

### GET /rest/v1.0/prime_contracts/{prime_contract_id}/line_items/{id}

**Show Prime Contract line item**
Return a specific Line Item from the Prime Contract.
Note: A v2.0 version of this endpoint is available and recommended for new integrations: GET /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_contracts/{prime_contract_id}/line_items/{id}.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `prime_contract_id` [path] integer (required) - Prime Contract ID
- `id` [path] integer (required) - Line Item ID
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

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/prime_contracts/{prime_contract_id}/line_items/{id}

**Update Prime Contract line item**
Update a Line Item from the Prime Contract.
Note: A budget line item will automatically be created for Non-budgeted line items for all new projects and for projects enabled with Non-Budgeted line item beta functionality

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `prime_contract_id` [path] integer (required) - Prime Contract ID
- `id` [path] integer (required) - Line Item ID
- `project_id` [query] integer (required) - Unique identifier for the project.

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

### DELETE /rest/v1.0/prime_contracts/{prime_contract_id}/line_items/{id}

**Delete a Prime Contract line item**
Delete a Line Item from the Prime Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `prime_contract_id` [path] integer (required) - Prime Contract ID
- `id` [path] integer (required) - Line Item ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/prime_contracts/{prime_contract_id}/line_items/sync

**Sync Prime Contract Line Items**
Sync Prime Contract Line Items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `prime_contract_id` [path] integer (required) - Prime Contract ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `updates`: array of object (required)
  - `id`: integer - ID of the line item e.g. `123`
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

## Prime Contract Summary

Resource id: `prime-contract-summary`. Raw spec: `../openapi-raw/prime-contract-summary.json`. Web: https://developers.procore.com/reference/rest/prime-contract-summary?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_contracts/{contract_id}/summary

**Show Prime Contract Summary**
Returns a combined summary of change order and invoicing information for a specific prime contract. summary endpoints.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `contract_id` [path] string (required) - ID of the Prime Contract

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

## Prime Contracts

Resource id: `prime-contracts`. Raw spec: `../openapi-raw/prime-contracts.json`. Web: https://developers.procore.com/reference/rest/prime-contracts?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_contracts  **[BETA]**

**List Prime Contracts**
Returns a list of Prime Contracts for a given project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[default, extended] - Specifies which view (which attributes) of the resource is going to be present in the response. The extended view includes architect name, contractor name, vendor name and custom fields data, while the default view do...
- `filters[accounting_method]` [query] string enum[unit, amount] - Filter to unit or amount based contracts
- `filters[architect_id]` [query] oneOf(integer | array of integer) - Return item(s) with the specified Architect ID(s). These are Login Information IDs.
- `filters[contractor_id]` [query] oneOf(integer | array of integer) - Return item(s) with the specified Contractor ID(s). These are Vendor IDs.
- `filters[created_at]` [query] oneOf(string(date-time) | array of string(date-time) | string) - Filter based on the created_at time.
- `filters[deleted_at]` [query] oneOf(string(date-time) | array of string(date-time) | string) - Filter based on the deleted_at time.
- `filters[id]` [query] oneOf(integer | array of integer) - Return item(s) with the specified ID(s).
- `filters[signature_required]` [query] boolean - Filter based on whether a signature is required.
- `filters[status]` [query] oneOf(string | array of string) - Filter to specific statuses. For Work Order Contracts: Draft, Out For Bid, Out For Signature, Approved, Complete, Terminated, Void. For Purchase Order Contracts: Draft, Processing, Submitted, Partially Received, Recei...
- `filters[updated_at]` [query] oneOf(string(date-time) | array of string(date-time) | string) - Filter based on the updated_at time.
- `filters[vendor_id]` [query] oneOf(integer | array of integer) - Return item(s) with the specified Vendor ID(s).
- `filters[executed]` [query] boolean - Filter based on whether a contract is executed.

Response 200 (application/json): object

- `data`: oneOf(array of object | array of object | array of object)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_contracts  **[BETA]**

**Create Prime Contract**
Creates a new Prime Contract for a given project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `view` [query] string enum[default, extended] - Specifies which view (which attributes) of the resource is going to be present in the response. The extended view includes architect name, contractor name, vendor name and custom fields data, while the default view do...

Request body (application/json) (required):

- `number`: string - The Prime Contract number. Defaults to the project numbering sequence for the respective contract type. e.g. `SC-001`
- `status`: string - The Prime Contract status. e.g. `Approved`
- `title`: string - The Prime Contract title. e.g. `ABC Contract`
- `description`: string - The Prime Contract description. e.g. `<p>Yep, do it.</p>`
- `executed`: boolean - The Prime Contract executed status. e.g. `true`
- `vendor_id`: string - The ID of the vendor for the contract. The selected invoice contacts must all belong to this vendor. When the vendor is changed, the invoice contacts are reset. e.g. `161072`
- `architect_id`: string - The ID of the architect for the contract. e.g. `161072`
- `contractor_id`: string - The ID of the contractor for the contract. e.g. `161072`
- `inclusions`: string - Only applicable to Work Order Contracts. The inclusions of the Prime Contract. e.g. `<p>Stairs, Elevator platform</p>`
- `exclusions`: string - Only applicable to Work Order Contracts. The exclusions of the Prime Contract. e.g. `<p>Stairs, Elevator platform</p>`
- `accounting_method`: string enum[amount, unit] - The accounting method for the contract. Default is driven by a project setting. e.g. `amount`
- `allow_comments`: boolean - If true, comments are allowed on the Prime Contract; otherwise comments are not allowed. Default is driven by a project setting. e.g. `true`
- `auto_approve_prefilled_requisitions_on_payapp`: boolean - If true, prefilled requisitions are auto-approved on payment applications; otherwise prefilled requisitions are not auto-approved. Default is driven by a project setting. e.g. `true`
- `allow_markups`: boolean - If true, markups are allowed on the Prime Contract; otherwise markups are not allowed. Default is driven by a project setting. e.g. `false`
- `change_order_level_of_detail`: string enum[change_order_package, change_order_request, potential_change_order, line_item] - The level of details for showing change orders on invoices attached to this contract. e.g. `line_item`
- `enable_ssov`: boolean - If true, the subcontractor schedule of values (SSOV) is enabled for the Prime Contract; otherwise the SSOV is not enabled. Default is driven by a project setting. e.g. `true`
- `allow_payment_applications`: boolean - If true, invoices are allowed on the Prime Contract; otherwise invoices are not allowed. Default is driven by a project setting. e.g. `true`
- `allow_payments`: boolean - If true, payments are allowed on the Prime Contract; otherwise payments are not allowed. Default is driven by a project setting. e.g. `true`
- `display_materials_retainage`: boolean - If true, materials retainage is displayed on the Prime Contract; otherwise materials retainage is not displayed. Default is driven by a project setting. e.g. `true`
- `display_work_retainage`: boolean - If true, work retainage is displayed on the Prime Contract; otherwise work retainage is not displayed. Default is driven by a project setting. e.g. `true`
- `show_cost_code_on_pdf`: boolean - If true, cost codes are displayed on the Prime Contract PDF; otherwise cost codes are not displayed. Default is driven by a project setting. e.g. `true`
- `accessor_ids`: array of string - Only applicable to private contracts. IDs of users in the project directory (see the Project Users endpoint). These users will be able to view the commitment contract. e.g. `["123", "456"]`
- `private`: boolean - If true, visible to admins and accessors only; otherwise visible to those with access to the Primes tool. Default based on project level setting. e.g. `true`
- `show_line_items_to_non_admins`: boolean - Only applicable to private contracts. If true, line items are visible to non-admins; otherwise visible to admins only. e.g. `true`
- `signature_required`: boolean - If true, a signature is required to execute the contract; otherwise no signature is required. e.g. `true`
- `actual_completion_date`: string(date) - Only applicable to Work Order Contracts. e.g. `2016-08-04`
- `approval_letter_date`: string(date) e.g. `2016-08-04`
- `contract_date`: string(date) e.g. `2016-08-04`
- `contract_estimated_completion_date`: string(date) - Only applicable to Work Order Contracts. e.g. `2016-08-04`
- `contract_start_date`: string(date) - Only applicable to Work Order Contracts. e.g. `2016-08-04`
- `execution_date`: string(date) e.g. `2016-08-04`
- `issued_on_date`: string(date) e.g. `2016-08-04`
- `letter_of_intent_date`: string(date) e.g. `2016-08-04`
- `returned_date`: string(date) e.g. `2016-08-04`
- `signed_contract_received_date`: string(date) e.g. `2016-08-04`
- `substantial_completion_date`: string(date) - Only applicable to Work Order Contracts. e.g. `2016-08-04`
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

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_contracts/{prime_contract_id}  **[BETA]**

**Show Prime Contract**
Returns a Prime Contract for a given project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `prime_contract_id` [path] string (required) - Unique identifier for the Prime Contract.
- `view` [query] string enum[default, extended] - Specifies which view (which attributes) of the resource is going to be present in the response. The extended view includes architect name, contractor name, vendor name and custom fields data, while the default view do...
- `filters[include_deleted]` [query] string enum[only, with] - Use 'only' to return only deleted resources. Use 'with' to return deleted and undeleted resources.

Response 200 (application/json): object

- `data`: oneOf(object | object)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_contracts/{prime_contract_id}  **[BETA]**

**Update Prime Contract**
Updates a Prime Contract for a given project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `prime_contract_id` [path] string (required) - Unique identifier for the Prime Contract.
- `view` [query] string enum[default, extended] - Specifies which view (which attributes) of the resource is going to be present in the response. The extended view includes architect name, contractor name, vendor name and custom fields data, while the default view do...

Request body (application/json) (required):

- `number`: string - The Prime Contract number. Defaults to the project numbering sequence for the respective contract type. e.g. `SC-001`
- `status`: string - The Prime Contract status. e.g. `Approved`
- `title`: string - The Prime Contract title. e.g. `ABC Contract`
- `description`: string - The Prime Contract description. e.g. `<p>Yep, do it.</p>`
- `executed`: boolean - The Prime Contract executed status. e.g. `true`
- `vendor_id`: string - The ID of the vendor for the contract. The selected invoice contacts must all belong to this vendor. When the vendor is changed, the invoice contacts are reset. e.g. `161072`
- `architect_id`: string - The ID of the architect for the contract. e.g. `161072`
- `contractor_id`: string - The ID of the contractor for the contract. e.g. `161072`
- `inclusions`: string - Only applicable to Work Order Contracts. The inclusions of the Prime Contract. e.g. `<p>Stairs, Elevator platform</p>`
- `exclusions`: string - Only applicable to Work Order Contracts. The exclusions of the Prime Contract. e.g. `<p>Stairs, Elevator platform</p>`
- `accounting_method`: string enum[amount, unit] - The accounting method for the contract. Default is driven by a project setting. e.g. `amount`
- `allow_comments`: boolean - If true, comments are allowed on the Prime Contract; otherwise comments are not allowed. Default is driven by a project setting. e.g. `true`
- `auto_approve_prefilled_requisitions_on_payapp`: boolean - If true, prefilled requisitions are auto-approved on payment applications; otherwise prefilled requisitions are not auto-approved. Default is driven by a project setting. e.g. `true`
- `allow_markups`: boolean - If true, markups are allowed on the Prime Contract; otherwise markups are not allowed. Default is driven by a project setting. e.g. `false`
- `change_order_level_of_detail`: string enum[change_order_package, change_order_request, potential_change_order, line_item] - The level of details for showing change orders on invoices attached to this contract. e.g. `line_item`
- `enable_ssov`: boolean - If true, the subcontractor schedule of values (SSOV) is enabled for the Prime Contract; otherwise the SSOV is not enabled. Default is driven by a project setting. e.g. `true`
- `allow_payment_applications`: boolean - If true, invoices are allowed on the Prime Contract; otherwise invoices are not allowed. Default is driven by a project setting. e.g. `true`
- `allow_payments`: boolean - If true, payments are allowed on the Prime Contract; otherwise payments are not allowed. Default is driven by a project setting. e.g. `true`
- `display_materials_retainage`: boolean - If true, materials retainage is displayed on the Prime Contract; otherwise materials retainage is not displayed. Default is driven by a project setting. e.g. `true`
- `display_work_retainage`: boolean - If true, work retainage is displayed on the Prime Contract; otherwise work retainage is not displayed. Default is driven by a project setting. e.g. `true`
- `show_cost_code_on_pdf`: boolean - If true, cost codes are displayed on the Prime Contract PDF; otherwise cost codes are not displayed. Default is driven by a project setting. e.g. `true`
- `accessor_ids`: array of string - Only applicable to private contracts. IDs of users in the project directory (see the Project Users endpoint). These users will be able to view the commitment contract. e.g. `["123", "456"]`
- `private`: boolean - If true, visible to admins and accessors only; otherwise visible to those with access to the Primes tool. Default based on project level setting. e.g. `true`
- `show_line_items_to_non_admins`: boolean - Only applicable to private contracts. If true, line items are visible to non-admins; otherwise visible to admins only. e.g. `true`
- `signature_required`: boolean - If true, a signature is required to execute the contract; otherwise no signature is required. e.g. `true`
- `actual_completion_date`: string(date) - Only applicable to Work Order Contracts. e.g. `2016-08-04`
- `approval_letter_date`: string(date) e.g. `2016-08-04`
- `contract_date`: string(date) e.g. `2016-08-04`
- `contract_estimated_completion_date`: string(date) - Only applicable to Work Order Contracts. e.g. `2016-08-04`
- `contract_start_date`: string(date) - Only applicable to Work Order Contracts. e.g. `2016-08-04`
- `execution_date`: string(date) e.g. `2016-08-04`
- `issued_on_date`: string(date) e.g. `2016-08-04`
- `letter_of_intent_date`: string(date) e.g. `2016-08-04`
- `returned_date`: string(date) e.g. `2016-08-04`
- `signed_contract_received_date`: string(date) e.g. `2016-08-04`
- `substantial_completion_date`: string(date) - Only applicable to Work Order Contracts. e.g. `2016-08-04`
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

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_contracts/{prime_contract_id}  **[BETA]**

**Delete Prime Contract**
Deletes a Prime Contract for a given project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `prime_contract_id` [path] string (required) - Unique identifier for the Prime Contract.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/prime_contracts

**List all Prime Contracts**
Returns all Prime Contracts for the specified Project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - Prime Contract ID e.g. `34219`
- `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
- `actual_completion_date`: string(date) - Actual completion date e.g. `2015-12-31`
- `approval_letter_date`: string(date) - Approval letter date e.g. `2014-01-02`
- `approved_change_orders`: string - Approved change orders amount e.g. `3434.0`
- `contract_date`: string(date) - Contract date e.g. `2014-01-02`
- `contract_estimated_completion_date`: string(date) - Contract estimated completion date e.g. `2016-01-31`
- `contract_start_date`: string(date) - Contract start date e.g. `2014-01-31`
- `contract_termination_date`: string(date) - Contract termination date e.g. `2016-12-31`
- `created_at`: string(date-time) - Created at e.g. `2014-01-01T21:55:10Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-01-04T23:55:19Z`
- `description`: string - Description of the Prime Contract e.g. `<p>Owner Contract</p>`
- `executed`: boolean - Executed status e.g. `true`
- `execution_date`: string(date) - Execution date e.g. `2014-01-02`
- `exclusions`: string - Exclusions e.g. `<p>Interior finishing</p>`
- `grand_total`: string - Total of Line items including markup, plus project level (vertical) markup, if any e.g. `57750.0`
- `inclusions`: string - Inclusions
- `issued_on_date`: string(date) - Issued on date e.g. `2014-01-02`
- `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2014-01-02`
- `number`: string - Number e.g. `A-1`
- `origin_code`: string - Origin code e.g. `ABC-123`
- `origin_data`: string - Prime Contract third party data e.g. `XYZ-012`
- `origin_id`: string - Prime Contract third party ID e.g. `abc-123`
- `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
- `retainage_percent`: string - Retainage percent e.g. `10`
- `returned_date`: string(date) - Returned date e.g. `2014-01-02`
- `signed_contract_received_date`: string(date) - Signed contract received date e.g. `2014-02-15`
- `show_line_items_to_non_admins`: boolean - If true and the contract is private, non admins with access to the contract will be able to view the SOV items e.g. `true`
- `status`: string enum[Draft, Out For Bid, Out For Signature, Approved, Complete, Terminated] - Status e.g. `Approved`
- `title`: string - Title e.g. `ABC Owner Contract`
- `updated_at`: string(date-time) - Updated at e.g. `2016-01-04T23:55:19Z`
- `architect`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
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
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
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
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/prime_contract

**Show First Prime Contract**
Returns the first Prime Contract created for the specified Project. Use the `/prime_contracts` endpoint if you need to return more than one Prime Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Prime Contract ID e.g. `34219`
- `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
- `actual_completion_date`: string(date) - Actual completion date e.g. `2015-12-31`
- `allow_comments`: boolean - Allow comments status e.g. `true`
- `allow_markups`: boolean - Allow markups status e.g. `false`
- `allow_payment_applications`: boolean - Enable/Disable Payment Applications (Owner Invoices) e.g. `true`
- `allow_payments`: boolean - Enable/Disable payments e.g. `true`
- `allow_redistributions`: boolean - Deprecated - always false e.g. `false`
- `approval_letter_date`: string(date) - Approval letter date e.g. `2014-01-02`
- `approved_change_orders`: string - Approved change orders amount e.g. `3434.0`
- `bill_to`: string - Bill to address e.g. `5000 Construction Street`
- `budget_line_item_id`: integer - Budget line item ID e.g. `50123`
- `contract_date`: string(date) - Contract date e.g. `2014-01-02`
- `contract_estimated_completion_date`: string(date) - Contract estimated completion date e.g. `2016-01-31`
- `contract_start_date`: string(date) - Contract start date e.g. `2014-01-31`
- `contract_termination_date`: string(date) - Contract termination date e.g. `2016-12-31`
- `created_at`: string(date-time) - Created at e.g. `2014-01-01T21:55:10Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-01-04T23:55:19Z`
- `delivery_date`: string(date) - Delivery date e.g. `2014-02-15`
- `description`: string - Description of the Prime Contract e.g. `<p>Owner Contract</p>`
- `display_materials_retainage`: boolean - Display materials retainage status e.g. `true`
- `display_stored_materials`: boolean - Enable/Disable stored materials e.g. `false`
- `display_work_retainage`: boolean - Display work retainage e.g. `true`
- `draft_change_orders_amount`: string - Total of all draft change orders e.g. `750.00`
- `exclusions`: string - Exclusions e.g. `<p>Interior finishing</p>`
- `executed`: boolean - Executed status e.g. `true`
- `execution_date`: string(date) - Execution date e.g. `2014-01-02`
- `grand_total`: string - Total of Line items including markup, plus project level (vertical) markup, if any e.g. `57750.0`
- `inclusions`: string - Inclusions
- `issued_on_date`: string(date) - Issued on date e.g. `2014-01-02`
- `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2014-01-02`
- `line_items_extended_total`: string - Total of Line items including markup e.g. `55000.0`
- `line_items_total`: string - Total of Line items without markup e.g. `50000.0`
- `number`: string - Number e.g. `A-1`
- `origin_data`: string - Prime Contract third party data e.g. `XYZ-012`
- `origin_id`: string - Prime Contract third party ID e.g. `abc-123`
- `outstanding_balance`: string - Revised contract amount minus total payments e.g. `750.00`
- `owner_invoices_amount`: string - Total of owner invoices e.g. `750.00`
- `payment_terms`: string - Payment terms e.g. `Net 30`
- `pending_change_orders_amount`: string - Total of all pending and revised change orders e.g. `750.00`
- `pending_revised_contract_amount`: string - Revised contract amount, plus pending and revised change orders e.g. `750.00`
- `percentage_paid`: string - Percentage paid e.g. `23.0`
- `position`: integer - Position e.g. `2`
- `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
- `requisition_number`: string - Requisition (Subcontractor Invoice) number e.g. `2011`
- `retainage_percent`: string - Retainage percent e.g. `10`
- `returned_date`: string(date) - Returned date e.g. `2014-01-02`
- `revised_contract_amount`: string - Grand total, plus approved change orders e.g. `750.00`
- `ship_to`: string - Ship to address e.g. `<p>5000 Construction Street</p>`
- `ship_via`: string - Ship via e.g. `Your truck`
- `signed_contract_received_date`: string(date) - Signed contract received date e.g. `2014-02-15`
- `show_line_items_to_non_admins`: boolean - If true and the contract is private, non admins with access to the contract will be able to view the SOV items e.g. `true`
- `status`: string enum[Draft, Out For Bid, Out For Signature, Approved, Complete, Terminated] - Status e.g. `Approved`
- `title`: string - Title e.g. `ABC Owner Contract`
- `total_payments`: string - Total payments e.g. `0.0`
- `type`: string - Type e.g. `PrimeContract`
- `updated_at`: string(date-time) - Updated at e.g. `2016-01-04T23:55:19Z`
- `original_substantial_completion_date`: string(date) - Original substantial completion date e.g. `2017-11-06`
- `substantial_completion_date`: string(date) - Substantial completion date e.g. `2017-10-30`
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
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `change_order_requests`: array of array of object - Change order requests
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
- `potential_change_orders`: array of object - Potential change orders
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
- `payments_received`: array of object - Payments received
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
- `received_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
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
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/prime_contract

**Create Prime Contract**
Create a new Prime Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `512340`
- `attachments`: array of string - Prime Contract attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
- `prime_contract`: object (required) - Prime Contract object
  - `actual_completion_date`: string - Actual Completion Date e.g. `2017-03-31`
  - `approval_letter_date`: string(date) - Approval letter date e.g. `2014-01-02`
  - `architect_id`: integer - Architect ID e.g. `160586`
  - `contractor_id`: integer - Contractor ID e.g. `13556`
  - `contract_date`: string(date) - Contract date e.g. `2014-01-02`
  - `contract_estimated_completion_date`: string - Contract Estimated Completion Date e.g. `2017-01-31`
  - `contract_start_date`: string - Contract Start Date e.g. `2015-01-31`
  - `description`: string - Description e.g. `New Building`
  - `exclusions`: string - Exclusions e.g. `Decoration`
  - `executed`: boolean - Executed e.g. `true`
  - `execution_date`: string(date) - Execution date e.g. `2014-01-02`
  - `inclusions`: string - Inclusions e.g. `Floor`
  - `issued_on_date`: string(date) - Issued on date e.g. `2014-01-02`
  - `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2014-01-02`
  - `number`: string - Number of the Prime Contract e.g. `2345`
  - `origin_data`: string - Prime Contract third party data e.g. `XYZ-012`
  - `origin_id`: string - Prime Contract third party ID e.g. `abc-123`
  - `retainage_percent`: string - Retainage Percent e.g. `10`
  - `returned_date`: string(date) - Returned date e.g. `2014-01-02`
  - `signed_contract_received_date`: string - Signed Contract Received Date e.g. `2015-01-30`
  - `status`: string enum[Draft, Out For Bid, Out For Signature, Approved, Complete, Terminated] - Status e.g. `Approved`
  - `title`: string - Title of the Prime Contract e.g. `Station 3`
  - `vendor_id`: integer - Vendor ID e.g. `1254`
  - `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `currency_exchange_rate`: number - Exchange rate from contract currency to project currency; It'll be accepted only when multicurrency phase two feature flag is enabled and user has the granular permission to edit the contract exchange rate. e.g. `1.5`
  - `currency_iso_code`: string - Currency ISO code; It'll be accepted only when multicurrency phase two feature flag is enabled. e.g. `USD`

Response 201 (application/json): object

- `id`: integer - Prime Contract ID e.g. `34219`
- `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
- `actual_completion_date`: string(date) - Actual completion date e.g. `2015-12-31`
- `allow_comments`: boolean - Allow comments status e.g. `true`
- `allow_markups`: boolean - Allow markups status e.g. `false`
- `allow_payment_applications`: boolean - Enable/Disable Payment Applications (Owner Invoices) e.g. `true`
- `allow_payments`: boolean - Enable/Disable payments e.g. `true`
- `allow_redistributions`: boolean - Deprecated - always false e.g. `false`
- `approval_letter_date`: string(date) - Approval letter date e.g. `2014-01-02`
- `approved_change_orders`: string - Approved change orders amount e.g. `3434.0`
- `bill_to`: string - Bill to address e.g. `5000 Construction Street`
- `budget_line_item_id`: integer - Budget line item ID e.g. `50123`
- `contract_date`: string(date) - Contract date e.g. `2014-01-02`
- `contract_estimated_completion_date`: string(date) - Contract estimated completion date e.g. `2016-01-31`
- `contract_start_date`: string(date) - Contract start date e.g. `2014-01-31`
- `contract_termination_date`: string(date) - Contract termination date e.g. `2016-12-31`
- `created_at`: string(date-time) - Created at e.g. `2014-01-01T21:55:10Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-01-04T23:55:19Z`
- `delivery_date`: string(date) - Delivery date e.g. `2014-02-15`
- `description`: string - Description of the Prime Contract e.g. `<p>Owner Contract</p>`
- `display_materials_retainage`: boolean - Display materials retainage status e.g. `true`
- `display_stored_materials`: boolean - Enable/Disable stored materials e.g. `false`
- `display_work_retainage`: boolean - Display work retainage e.g. `true`
- `draft_change_orders_amount`: string - Total of all draft change orders e.g. `750.00`
- `exclusions`: string - Exclusions e.g. `<p>Interior finishing</p>`
- `executed`: boolean - Executed status e.g. `true`
- `execution_date`: string(date) - Execution date e.g. `2014-01-02`
- `grand_total`: string - Total of Line items including markup, plus project level (vertical) markup, if any e.g. `57750.0`
- `inclusions`: string - Inclusions
- `issued_on_date`: string(date) - Issued on date e.g. `2014-01-02`
- `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2014-01-02`
- `line_items_extended_total`: string - Total of Line items including markup e.g. `55000.0`
- `line_items_total`: string - Total of Line items without markup e.g. `50000.0`
- `number`: string - Number e.g. `A-1`
- `origin_data`: string - Prime Contract third party data e.g. `XYZ-012`
- `origin_id`: string - Prime Contract third party ID e.g. `abc-123`
- `outstanding_balance`: string - Revised contract amount minus total payments e.g. `750.00`
- `owner_invoices_amount`: string - Total of owner invoices e.g. `750.00`
- `payment_terms`: string - Payment terms e.g. `Net 30`
- `pending_change_orders_amount`: string - Total of all pending and revised change orders e.g. `750.00`
- `pending_revised_contract_amount`: string - Revised contract amount, plus pending and revised change orders e.g. `750.00`
- `percentage_paid`: string - Percentage paid e.g. `23.0`
- `position`: integer - Position e.g. `2`
- `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
- `requisition_number`: string - Requisition (Subcontractor Invoice) number e.g. `2011`
- `retainage_percent`: string - Retainage percent e.g. `10`
- `returned_date`: string(date) - Returned date e.g. `2014-01-02`
- `revised_contract_amount`: string - Grand total, plus approved change orders e.g. `750.00`
- `ship_to`: string - Ship to address e.g. `<p>5000 Construction Street</p>`
- `ship_via`: string - Ship via e.g. `Your truck`
- `signed_contract_received_date`: string(date) - Signed contract received date e.g. `2014-02-15`
- `show_line_items_to_non_admins`: boolean - If true and the contract is private, non admins with access to the contract will be able to view the SOV items e.g. `true`
- `status`: string enum[Draft, Out For Bid, Out For Signature, Approved, Complete, Terminated] - Status e.g. `Approved`
- `title`: string - Title e.g. `ABC Owner Contract`
- `total_payments`: string - Total payments e.g. `0.0`
- `type`: string - Type e.g. `PrimeContract`
- `updated_at`: string(date-time) - Updated at e.g. `2016-01-04T23:55:19Z`
- `original_substantial_completion_date`: string(date) - Original substantial completion date e.g. `2017-11-06`
- `substantial_completion_date`: string(date) - Substantial completion date e.g. `2017-10-30`
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
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `change_order_requests`: array of array of object - Change order requests
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
- `potential_change_orders`: array of object - Potential change orders
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
- `payments_received`: array of object - Payments received
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
- `received_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
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
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/prime_contract/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Show Prime Contract**
Show the details of a Project's Prime Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Prime Contract
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Prime Contract ID e.g. `34219`
- `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
- `actual_completion_date`: string(date) - Actual completion date e.g. `2015-12-31`
- `allow_comments`: boolean - Allow comments status e.g. `true`
- `allow_markups`: boolean - Allow markups status e.g. `false`
- `allow_payment_applications`: boolean - Enable/Disable Payment Applications (Owner Invoices) e.g. `true`
- `allow_payments`: boolean - Enable/Disable payments e.g. `true`
- `allow_redistributions`: boolean - Deprecated - always false e.g. `false`
- `approval_letter_date`: string(date) - Approval letter date e.g. `2014-01-02`
- `approved_change_orders`: string - Approved change orders amount e.g. `3434.0`
- `bill_to`: string - Bill to address e.g. `5000 Construction Street`
- `budget_line_item_id`: integer - Budget line item ID e.g. `50123`
- `contract_date`: string(date) - Contract date e.g. `2014-01-02`
- `contract_estimated_completion_date`: string(date) - Contract estimated completion date e.g. `2016-01-31`
- `contract_start_date`: string(date) - Contract start date e.g. `2014-01-31`
- `contract_termination_date`: string(date) - Contract termination date e.g. `2016-12-31`
- `created_at`: string(date-time) - Created at e.g. `2014-01-01T21:55:10Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-01-04T23:55:19Z`
- `delivery_date`: string(date) - Delivery date e.g. `2014-02-15`
- `description`: string - Description of the Prime Contract e.g. `<p>Owner Contract</p>`
- `display_materials_retainage`: boolean - Display materials retainage status e.g. `true`
- `display_stored_materials`: boolean - Enable/Disable stored materials e.g. `false`
- `display_work_retainage`: boolean - Display work retainage e.g. `true`
- `draft_change_orders_amount`: string - Total of all draft change orders e.g. `750.00`
- `exclusions`: string - Exclusions e.g. `<p>Interior finishing</p>`
- `executed`: boolean - Executed status e.g. `true`
- `execution_date`: string(date) - Execution date e.g. `2014-01-02`
- `grand_total`: string - Total of Line items including markup, plus project level (vertical) markup, if any e.g. `57750.0`
- `inclusions`: string - Inclusions
- `issued_on_date`: string(date) - Issued on date e.g. `2014-01-02`
- `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2014-01-02`
- `line_items_extended_total`: string - Total of Line items including markup e.g. `55000.0`
- `line_items_total`: string - Total of Line items without markup e.g. `50000.0`
- `number`: string - Number e.g. `A-1`
- `origin_data`: string - Prime Contract third party data e.g. `XYZ-012`
- `origin_id`: string - Prime Contract third party ID e.g. `abc-123`
- `outstanding_balance`: string - Revised contract amount minus total payments e.g. `750.00`
- `owner_invoices_amount`: string - Total of owner invoices e.g. `750.00`
- `payment_terms`: string - Payment terms e.g. `Net 30`
- `pending_change_orders_amount`: string - Total of all pending and revised change orders e.g. `750.00`
- `pending_revised_contract_amount`: string - Revised contract amount, plus pending and revised change orders e.g. `750.00`
- `percentage_paid`: string - Percentage paid e.g. `23.0`
- `position`: integer - Position e.g. `2`
- `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
- `requisition_number`: string - Requisition (Subcontractor Invoice) number e.g. `2011`
- `retainage_percent`: string - Retainage percent e.g. `10`
- `returned_date`: string(date) - Returned date e.g. `2014-01-02`
- `revised_contract_amount`: string - Grand total, plus approved change orders e.g. `750.00`
- `ship_to`: string - Ship to address e.g. `<p>5000 Construction Street</p>`
- `ship_via`: string - Ship via e.g. `Your truck`
- `signed_contract_received_date`: string(date) - Signed contract received date e.g. `2014-02-15`
- `show_line_items_to_non_admins`: boolean - If true and the contract is private, non admins with access to the contract will be able to view the SOV items e.g. `true`
- `status`: string enum[Draft, Out For Bid, Out For Signature, Approved, Complete, Terminated] - Status e.g. `Approved`
- `title`: string - Title e.g. `ABC Owner Contract`
- `total_payments`: string - Total payments e.g. `0.0`
- `type`: string - Type e.g. `PrimeContract`
- `updated_at`: string(date-time) - Updated at e.g. `2016-01-04T23:55:19Z`
- `original_substantial_completion_date`: string(date) - Original substantial completion date e.g. `2017-11-06`
- `substantial_completion_date`: string(date) - Substantial completion date e.g. `2017-10-30`
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
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `change_order_requests`: array of array of object - Change order requests
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
- `potential_change_orders`: array of object - Potential change orders
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
- `payments_received`: array of object - Payments received
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
- `received_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
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
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/prime_contract/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Update Prime Contract**
Update the specified Prime Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Prime Contract
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `512340`
- `attachments`: array of string - Prime Contract attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
- `prime_contract`: object (required) - Prime Contract object
  - `actual_completion_date`: string - Actual Completion Date e.g. `2017-03-31`
  - `approval_letter_date`: string(date) - Approval letter date e.g. `2014-01-02`
  - `architect_id`: integer - Architect ID e.g. `160586`
  - `contractor_id`: integer - Contractor ID e.g. `13556`
  - `contract_date`: string(date) - Contract date e.g. `2014-01-02`
  - `contract_estimated_completion_date`: string - Contract Estimated Completion Date e.g. `2017-01-31`
  - `contract_start_date`: string - Contract Start Date e.g. `2015-01-31`
  - `description`: string - Description e.g. `New Building`
  - `exclusions`: string - Exclusions e.g. `Decoration`
  - `executed`: boolean - Executed e.g. `true`
  - `execution_date`: string(date) - Execution date e.g. `2014-01-02`
  - `inclusions`: string - Inclusions e.g. `Floor`
  - `issued_on_date`: string(date) - Issued on date e.g. `2014-01-02`
  - `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2014-01-02`
  - `number`: string - Number of the Prime Contract e.g. `2345`
  - `origin_data`: string - Prime Contract third party data e.g. `XYZ-012`
  - `origin_id`: string - Prime Contract third party ID e.g. `abc-123`
  - `retainage_percent`: string - Retainage Percent e.g. `10`
  - `returned_date`: string(date) - Returned date e.g. `2014-01-02`
  - `signed_contract_received_date`: string - Signed Contract Received Date e.g. `2015-01-30`
  - `status`: string enum[Draft, Out For Bid, Out For Signature, Approved, Complete, Terminated] - Status e.g. `Approved`
  - `title`: string - Title of the Prime Contract e.g. `Station 3`
  - `vendor_id`: integer - Vendor ID e.g. `1254`
  - `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `currency_exchange_rate`: number - Exchange rate from contract currency to project currency; It'll be accepted only when multicurrency phase two feature flag is enabled and user has the granular permission to edit the contract exchange rate. e.g. `1.5`
  - `currency_iso_code`: string - Currency ISO code; It'll be accepted only when multicurrency phase two feature flag is enabled. e.g. `USD`

Response 200 (application/json): object

- `id`: integer - Prime Contract ID e.g. `34219`
- `accounting_method`: string enum[amount, unit] - Accounting method e.g. `amount`
- `actual_completion_date`: string(date) - Actual completion date e.g. `2015-12-31`
- `allow_comments`: boolean - Allow comments status e.g. `true`
- `allow_markups`: boolean - Allow markups status e.g. `false`
- `allow_payment_applications`: boolean - Enable/Disable Payment Applications (Owner Invoices) e.g. `true`
- `allow_payments`: boolean - Enable/Disable payments e.g. `true`
- `allow_redistributions`: boolean - Deprecated - always false e.g. `false`
- `approval_letter_date`: string(date) - Approval letter date e.g. `2014-01-02`
- `approved_change_orders`: string - Approved change orders amount e.g. `3434.0`
- `bill_to`: string - Bill to address e.g. `5000 Construction Street`
- `budget_line_item_id`: integer - Budget line item ID e.g. `50123`
- `contract_date`: string(date) - Contract date e.g. `2014-01-02`
- `contract_estimated_completion_date`: string(date) - Contract estimated completion date e.g. `2016-01-31`
- `contract_start_date`: string(date) - Contract start date e.g. `2014-01-31`
- `contract_termination_date`: string(date) - Contract termination date e.g. `2016-12-31`
- `created_at`: string(date-time) - Created at e.g. `2014-01-01T21:55:10Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-01-04T23:55:19Z`
- `delivery_date`: string(date) - Delivery date e.g. `2014-02-15`
- `description`: string - Description of the Prime Contract e.g. `<p>Owner Contract</p>`
- `display_materials_retainage`: boolean - Display materials retainage status e.g. `true`
- `display_stored_materials`: boolean - Enable/Disable stored materials e.g. `false`
- `display_work_retainage`: boolean - Display work retainage e.g. `true`
- `draft_change_orders_amount`: string - Total of all draft change orders e.g. `750.00`
- `exclusions`: string - Exclusions e.g. `<p>Interior finishing</p>`
- `executed`: boolean - Executed status e.g. `true`
- `execution_date`: string(date) - Execution date e.g. `2014-01-02`
- `grand_total`: string - Total of Line items including markup, plus project level (vertical) markup, if any e.g. `57750.0`
- `inclusions`: string - Inclusions
- `issued_on_date`: string(date) - Issued on date e.g. `2014-01-02`
- `letter_of_intent_date`: string(date) - Letter of intent date e.g. `2014-01-02`
- `line_items_extended_total`: string - Total of Line items including markup e.g. `55000.0`
- `line_items_total`: string - Total of Line items without markup e.g. `50000.0`
- `number`: string - Number e.g. `A-1`
- `origin_data`: string - Prime Contract third party data e.g. `XYZ-012`
- `origin_id`: string - Prime Contract third party ID e.g. `abc-123`
- `outstanding_balance`: string - Revised contract amount minus total payments e.g. `750.00`
- `owner_invoices_amount`: string - Total of owner invoices e.g. `750.00`
- `payment_terms`: string - Payment terms e.g. `Net 30`
- `pending_change_orders_amount`: string - Total of all pending and revised change orders e.g. `750.00`
- `pending_revised_contract_amount`: string - Revised contract amount, plus pending and revised change orders e.g. `750.00`
- `percentage_paid`: string - Percentage paid e.g. `23.0`
- `position`: integer - Position e.g. `2`
- `private`: boolean - If true, visible to admins only; otherwise visible to those with access to the parent contract. e.g. `true`
- `requisition_number`: string - Requisition (Subcontractor Invoice) number e.g. `2011`
- `retainage_percent`: string - Retainage percent e.g. `10`
- `returned_date`: string(date) - Returned date e.g. `2014-01-02`
- `revised_contract_amount`: string - Grand total, plus approved change orders e.g. `750.00`
- `ship_to`: string - Ship to address e.g. `<p>5000 Construction Street</p>`
- `ship_via`: string - Ship via e.g. `Your truck`
- `signed_contract_received_date`: string(date) - Signed contract received date e.g. `2014-02-15`
- `show_line_items_to_non_admins`: boolean - If true and the contract is private, non admins with access to the contract will be able to view the SOV items e.g. `true`
- `status`: string enum[Draft, Out For Bid, Out For Signature, Approved, Complete, Terminated] - Status e.g. `Approved`
- `title`: string - Title e.g. `ABC Owner Contract`
- `total_payments`: string - Total payments e.g. `0.0`
- `type`: string - Type e.g. `PrimeContract`
- `updated_at`: string(date-time) - Updated at e.g. `2016-01-04T23:55:19Z`
- `original_substantial_completion_date`: string(date) - Original substantial completion date e.g. `2017-11-06`
- `substantial_completion_date`: string(date) - Substantial completion date e.g. `2017-10-30`
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
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `change_order_requests`: array of array of object - Change order requests
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
- `potential_change_orders`: array of object - Potential change orders
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
- `payments_received`: array of object - Payments received
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
- `received_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
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
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/prime_contract/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Delete Prime Contract**
Delete the specified Prime Contract.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Prime Contract
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Prime Contracts Export PDF

Resource id: `prime-contracts-export-pdf`. Raw spec: `../openapi-raw/prime-contracts-export-pdf.json`. Web: https://developers.procore.com/reference/rest/prime-contracts-export-pdf?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_contracts/{prime_contract_id}/pdf  **[BETA]**

**Check PDF generation status**
Check the status of a PDF document generation for a prime contract.
Note: This endpoint is currently only supported in Procore Zones US01 && US02.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `prime_contract_id` [path] string (required) - Unique identifier for the Prime Contract.

Response 202: Accepted (no body)

Error responses: 302, 400, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/prime_contracts/{prime_contract_id}/pdf  **[BETA]**

**Create PDF export for a Prime Contract**
Creates a PDF export for a given Prime Contract.
Note: This endpoint is currently only supported in Procore Zones US01 && US02.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `prime_contract_id` [path] string (required) - Unique identifier for the Prime Contract.

Response 202: Accepted, returns back location to PDF export job which can be queried for progress. (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

