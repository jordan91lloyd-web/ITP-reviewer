# Procore API: Project Level Direct Costs (Construction Financials)

Source: https://developers.procore.com/reference/rest/ (tool category: Project Level Direct Costs)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Direct Costs](#direct-costs) - versions 1.1, 1.0

## Direct Costs

Resource id: `direct-costs`. Raw spec: `../openapi-raw/direct-costs.json`. Web: https://developers.procore.com/reference/rest/direct-costs?version=latest
Product lines: Construction Financials

### GET /rest/v1.1/projects/{project_id}/direct_costs

**List Direct Cost Items**
Returns a list of all Direct Cost Items for a Project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.
- `filters[invoice_number]` [query] string - Returns item(s) with the specified Invoice Number.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[payment_date]` [query] string - Returns item(s) with a payment date within the specified ISO 8601 datetime range.
- `filters[received_date]` [query] string - Returns item(s) with a received date within the specified ISO 8601 datetime range.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the Direct Cost Item. Use as the {id} path parameter to retrieve, update, or delete this item. e.g. `1`
- `amount`: string - Grand total of the Direct Cost Item, as a decimal string. For backwards compatibility this mirrors grand_total. e.g. `0.0`
- `created_at`: string(date-time) - Timestamp when the Direct Cost Item was created, in ISO 8601 format. e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the Direct Cost Item was soft-deleted, in ISO 8601 format. Null for active items. e.g. `2017-07-29T21:39:40Z`
- `description`: string - Free-text description of the Direct Cost Item. e.g. `Home Depot Purchase`
- `direct_cost_type`: string enum[invoice, expense, payroll] - Category of the Direct Cost Item. e.g. `invoice`
- `direct_cost_date`: string(date) - Date the direct cost was incurred, in YYYY-MM-DD format. e.g. `2016-12-14`
- `grand_total`: string - Sum of all line item amounts on the Direct Cost Item, as a decimal string. e.g. `0.0`
- `invoice_number`: string - Vendor invoice number. Present only for invoice-type items; must be unique per vendor within the tool. e.g. `ab-3456`
- `origin_data`: string - Opaque third-party payload stored with the item for external-system integrations. Not interpreted by Procore. e.g. `OD-2398273424`
- `origin_id`: string - Identifier of this item in the originating external system; used to correlate synced records. e.g. `px-1990`
- `payment_date`: string(date) - Date the direct cost was paid, in YYYY-MM-DD format. e.g. `2014-12-16`
- `received_date`: string(date) - Date the direct cost was received, in YYYY-MM-DD format. e.g. `2014-11-16`
- `status`: string enum[draft, pending, revise_and_resubmit, approved] - Review/approval state of the Direct Cost Item. e.g. `pending`
- `terms`: string - Agreed payment terms for the invoice (for example, Net 30). e.g. `Net 30`
- `updated_at`: string(date-time) - Timestamp when the Direct Cost Item was last updated, in ISO 8601 format. e.g. `2012-10-24T21:39:40Z`
- `vendor`: string - Display name of the vendor billed on the Direct Cost Item. e.g. `Steve's Plumbing and Hardware`
- `vendor_id`: integer - Identifier of the vendor billed on the Direct Cost Item. Required for invoice-type items. e.g. `1`
- `vendor_name`: string - Display name of the vendor billed on the Direct Cost Item. e.g. `Steve's Plumbing and Hardware`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `tax_breakdown`: object - Header-level tax rollup. Always included on the response as an object, including when Direct Cost taxes are disabled. tax_details is an empty array when no stored tax details are returned. Presence of this key does no...
  - `subtotal`: string - Sum of line-item amounts before tax e.g. `100.00`
  - `tax_total`: string - Total tax across all line items e.g. `12.00`
  - `grand_total`: string - subtotal plus tax_total e.g. `112.00`
  - `tax_details`: array of object - One entry per component tax code that produced tax on this Direct Cost
    - `tax_code_id`: integer - Component tax code that produced this amount e.g. `90`
    - `tax_code_name`: string - Tax code name for tax_code_id e.g. `GST-TEST-COMP`
    - `tax_code_rate`: string - Effective rate as a percentage e.g. `5.0`
    - `amount`: string - Tax amount for this component, summed across line items e.g. `5.00`
    - `taxable_amount`: string - Taxable basis this component was applied against e.g. `100.00`
    - `selected_tax_code_id`: integer - Tax code selected on the line item e.g. `93`
    - `selected_tax_code_name`: string - Tax code name for selected_tax_code_id e.g. `GRP-TEST`
- `employee`: object - Employee (project contact) associated with the Direct Cost Item.
  - `id`: integer - Contact ID of the employee (references the project Contact record, not LoginInformation). e.g. `5`
  - `name`: string - Display name of the employee. e.g. `Bob the Builder`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/projects/{project_id}/direct_costs

**Create Direct Cost Item**
Create a new Direct Cost Item in the specified Project. The number of Line Items that can be sent in a single create request is limited to 100.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `attachments`: array of string - Direct Cost Item attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
- `direct_cost`: object (required) - Direct Cost Item object
  - `description`: string - Free-text description of the Direct Cost Item. e.g. `Invoice for April`
  - `direct_cost_date`: string(date) - Date the direct cost was incurred, in YYYY-MM-DD format. e.g. `2016-12-14`
  - `employee_id`: integer - ID of the employee (project contact) associated with the Direct Cost Item. e.g. `43223`
  - `invoice_number`: string (required) - Unique identifier for a Direct Cost Item of type invoice. Is required only if `direct_cost_type` is set to `invoice`. e.g. `Invoice # abc123`
  - `origin_data`: string - Opaque third-party payload stored with the item for external-system integrations. Not interpreted by Procore. e.g. `OD-2398273424`
  - `origin_id`: string - Identifier of this item in the originating external system; used to correlate synced records. e.g. `px-1990`
  - `payment_date`: string(date) - Date the direct cost was paid, in YYYY-MM-DD format. e.g. `2017-01-10`
  - `received_date`: string(date) - Date the direct cost was received, in YYYY-MM-DD format. e.g. `2017-01-08`
  - `status`: string enum[draft, pending, revise_and_resubmit, approved] - Review/approval state of the Direct Cost Item. e.g. `approved`
  - `terms`: string - Agreed payment terms for the invoice (for example, Net 30). e.g. `Net 50`
  - `vendor_id`: integer (required) - ID of the vendor (company contact) billed on the Direct Cost Item. Required when direct_cost_type is `invoice`. e.g. `23423`
  - `direct_cost_type`: string enum[invoice, expense, payroll, subcontractor_invoice] (required) - Category of the Direct Cost Item. e.g. `invoice`
  - `currency_configuration`: object - Multicurrency values for the Direct Cost Item. Only validated and persisted when object-level multicurrency is enabled for the project.
    - `currency_iso_code`: string - ISO 4217 currency code for the item amounts. e.g. `USD`
    - `currency_exchange_rate`: number(float) - Exchange rate used to convert the item currency to the project base currency. e.g. `0.65`
  - `line_items`: array of object - Line items that should be assoicated with the direct cost item.
    - `manual_amount`: number(float) - Manually entered monetary amount for the line item. e.g. `1000`
    - `wbs_code_id`: integer (required) - ID of the WBS (Work Breakdown Structure) code to assign. Required when creating a line item. e.g. `1989`
    - `description`: string - Free-text description of what the line item covers. e.g. `100' of Copper Piping`
    - `direct_cost_id`: integer - ID of the parent Direct Cost Item this line item belongs to. e.g. `81753`
    - `origin_data`: string - Opaque third-party payload stored with the line item for external-system integrations. Not interpreted by Procore. e.g. `OD-2398273424`
    - `origin_id`: string - Identifier of this line item in the originating external system; used to correlate synced records. e.g. `px-1990`
    - `quantity`: number(float) - Quantity of the described item. Multiplied by unit_cost to compute the extended amount. e.g. `82.0201`
    - `ref`: string - Client-supplied reference passed on create to correlate the request with the response. Not persisted. e.g. `PQRS5678`
    - `tax_code_id`: integer - ID of the tax code applied to this line item. e.g. `1`
    - `unit_cost`: number(float) - Cost per unit of the described item. e.g. `12.03`
    - `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure for the described item. Must be a value from the company's Units of Measure list. e.g. `cubic feet`
    - `funding_rule_id`: integer - ID of the funding rule associated with this line item. Funding Sources must be enabled at the project level. The rule must be ACTIVE and its currency must match the direct cost currency. Pass null to disassociate an e... e.g. `12345`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the Direct Cost Item. Use as the {id} path parameter to retrieve, update, or delete this item. e.g. `3`
- `attachments`: array of object - Files attached to the Direct Cost Item (for example, scanned invoices or receipts).
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `attachments_count`: integer - Number of files attached to the Direct Cost Item. e.g. `0`
- `company`: object - Company that owns the project this Direct Cost Item belongs to.
  - `id`: integer - Unique identifier of the company. e.g. `163215`
  - `name`: string - Display name of the company. e.g. `Procore Tech`
- `created_at`: string(date-time) - Timestamp when the Direct Cost Item was created, in ISO 8601 format. e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the Direct Cost Item was soft-deleted, in ISO 8601 format. Null for active items. e.g. `2017-07-29T21:39:40Z`
- `description`: string - Free-text description of the Direct Cost Item. e.g. `Home Depot Purchase`
- `direct_cost_type`: string enum[invoice, expense, payroll] - Category of the Direct Cost Item. e.g. `invoice`
- `employee`: object - Employee (project contact) associated with the Direct Cost Item.
  - `id`: integer - Contact ID of the employee (references the project Contact record, not LoginInformation). e.g. `5`
  - `name`: string - Display name of the employee. e.g. `Bob the Builder`
- `invoice_number`: string - Vendor invoice number. Present only for invoice-type items; must be unique per vendor within the tool. e.g. `ab-3456`
- `direct_cost_date`: string(date) - Date the direct cost was incurred, in YYYY-MM-DD format. e.g. `2014-10-16`
- `origin_data`: string - Opaque third-party payload stored with the item for external-system integrations. Not interpreted by Procore. e.g. `OD-2398273424`
- `origin_id`: string - Identifier of this item in the originating external system; used to correlate synced records. e.g. `px-1990`
- `grand_total`: string - Sum of all line item amounts on the Direct Cost Item, as a decimal string. e.g. `0.0`
- `line_items_count`: integer - Number of line items on the Direct Cost Item. e.g. `0`
- `payment_date`: string(date) - Date the direct cost was paid, in YYYY-MM-DD format. e.g. `2014-12-16`
- `project`: object - Project the Direct Cost Item belongs to.
  - `id`: integer - Unique identifier of the project. e.g. `123456`
  - `name`: string - Display name of the project. e.g. `Children's Hospital`
- `received_date`: string(date) - Date the direct cost was received, in YYYY-MM-DD format. e.g. `2014-11-16`
- `status`: string enum[draft, pending, revise_and_resubmit, approved] - Review/approval state of the Direct Cost Item. e.g. `pending`
- `synced`: boolean - Whether the Direct Cost Item is linked to an external ERP/accounting system (has an origin ID or synced line items). e.g. `false`
- `has_workflows`: boolean - Whether the Direct Cost Item has an active workflow (approval) instance assigned. e.g. `false`
- `terms`: string - Agreed payment terms for the invoice (for example, Net 30). e.g. `Net 30`
- `updated_at`: string(date-time) - Timestamp when the Direct Cost Item was last updated, in ISO 8601 format. e.g. `2012-10-24T21:39:40Z`
- `vendor`: object - Vendor (company contact) billed on the Direct Cost Item.
  - `id`: integer - Unique identifier of the vendor. e.g. `8`
  - `name`: string - Display name of the vendor. e.g. `Steve's Plumbing and Hardware`
- `vendor_id`: integer - Identifier of the vendor billed on the Direct Cost Item. Required for invoice-type items. e.g. `1`
- `vendor_name`: string - Display name of the vendor billed on the Direct Cost Item. e.g. `Steves Plumbing and Hardware`
- `currency_configuration`: object - Multicurrency configuration for the Direct Cost Item. Values are meaningful only when object-level multicurrency is enabled.
  - `currency_iso_code`: string - ISO 4217 code of the currency the item amounts are recorded in. e.g. `USD`
  - `currency_exchange_rate`: string - Exchange rate used to convert the item currency to the project base currency, as a decimal string. e.g. `2.1`
  - `base_currency_iso_code`: string - ISO 4217 code of the project's base currency. e.g. `USD`
- `tax_breakdown`: object - Header-level tax rollup. Always included on the response as an object, including when Direct Cost taxes are disabled. tax_details is an empty array when no stored tax details are returned. Presence of this key does no...
  - `subtotal`: string - Sum of line-item amounts before tax e.g. `100.00`
  - `tax_total`: string - Total tax across all line items e.g. `12.00`
  - `grand_total`: string - subtotal plus tax_total e.g. `112.00`
  - `tax_details`: array of object - One entry per component tax code that produced tax on this Direct Cost
    - `tax_code_id`: integer - Component tax code that produced this amount e.g. `90`
    - `tax_code_name`: string - Tax code name for tax_code_id e.g. `GST-TEST-COMP`
    - `tax_code_rate`: string - Effective rate as a percentage e.g. `5.0`
    - `amount`: string - Tax amount for this component, summed across line items e.g. `5.00`
    - `taxable_amount`: string - Taxable basis this component was applied against e.g. `100.00`
    - `selected_tax_code_id`: integer - Tax code selected on the line item e.g. `93`
    - `selected_tax_code_name`: string - Tax code name for selected_tax_code_id e.g. `GRP-TEST`
- `line_items`: array of object - Line items belonging to the Direct Cost Item.
  - `id`: integer - Unique identifier of the line item. e.g. `4896147`
  - `amount`: string - Bottom-line monetary amount of the line item, as a decimal string. e.g. `1000.0`
  - `company`: object - Company that owns the project this line item belongs to.
    - `id`: integer - Unique identifier of the company. e.g. `163215`
    - `name`: string - Display name of the company. e.g. `Procore Tech`
  - `cost_code`: oneOf(object | object)
  - `created_at`: string(date-time) - Timestamp when the line item was created, in ISO 8601 format. e.g. `2016-08-01T23:33:54Z`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
  - `description`: string - Free-text description of what the line item covers. e.g. `Cleanup`
  - `extended_type`: string enum[manual, calculated] - How the line item amount is derived. `calculated` means amount = quantity × unit_cost; `manual` means the amount was entered directly. e.g. `calculated`
  - `line_item_type`: object - Cost category (line item type) assigned to this line item.
    - `id`: integer - Unique identifier of the line item type. e.g. `12345`
    - `name`: string - Display name of the line item type. e.g. `Equipment`
    - `code`: string - Short code for the line item type. e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Underlying category the line item type maps to. e.g. `materials`
    - `origin_data`: string - Opaque third-party payload stored with the line item type for external integrations. e.g. `OD-2398273424`
    - `origin_id`: string - Identifier of the line item type in the originating external system. Null when not synced. e.g. `ABC123`
  - `origin_data`: string - Opaque third-party payload stored with the line item for external-system integrations. Not interpreted by Procore. e.g. `OD-39823232`
  - `origin_id`: string - Identifier of this line item in the originating external system; used to correlate synced records. Null when not synced. e.g. `239233`
  - `funding_rule_id`: integer - ID of the funding rule associated with this line item e.g. `12345`
  - `position`: integer - Sort order of the line item within its parent Direct Cost Item. e.g. `1`
  - `quantity`: string(float) - Quantity of the described item, as a decimal string. Multiplied by unit_cost when extended_type is calculated. e.g. `10.0`
  - `tax_code_id`: integer - Identifier of the tax code applied to this line item. e.g. `1`
  - `total_amount`: string(float) - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. Currently identical to `amount` and `extended_amount` ... e.g. `1000.0`
  - `extended_amount`: string(float) - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. Currently identical to `amount` and `total_amount` (Di... e.g. `1000.0`
  - `unit_cost`: string(float) - Cost per unit of the described item, as a decimal string. e.g. `100.0`
  - `uom`: string - Unit of measure for the described item (for example, Lbs, cubic feet). Must be a value from the company's Units of Measure list. e.g. `Lbs`
  - `updated_at`: string(date-time) - Timestamp when the line item was last updated, in ISO 8601 format. e.g. `2016-09-01T21:33:54Z`
  - `wbs_code`: object
    - `id`: integer - Wbs Code ID e.g. `999`
    - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
    - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
  - `ref`: string - Client-supplied reference passed on create to correlate the request with the response. Not persisted. e.g. `PQRS5678`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/direct_costs/{id}

**Show Direct Cost Item**
Show detail on specified Direct Cost Item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Direct Cost Item.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Direct Cost Item. Use as the {id} path parameter to retrieve, update, or delete this item. e.g. `3`
- `attachments`: array of object - Files attached to the Direct Cost Item (for example, scanned invoices or receipts).
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `attachments_count`: integer - Number of files attached to the Direct Cost Item. e.g. `0`
- `company`: object - Company that owns the project this Direct Cost Item belongs to.
  - `id`: integer - Unique identifier of the company. e.g. `163215`
  - `name`: string - Display name of the company. e.g. `Procore Tech`
- `created_at`: string(date-time) - Timestamp when the Direct Cost Item was created, in ISO 8601 format. e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the Direct Cost Item was soft-deleted, in ISO 8601 format. Null for active items. e.g. `2017-07-29T21:39:40Z`
- `description`: string - Free-text description of the Direct Cost Item. e.g. `Home Depot Purchase`
- `direct_cost_type`: string enum[invoice, expense, payroll] - Category of the Direct Cost Item. e.g. `invoice`
- `employee`: object - Employee (project contact) associated with the Direct Cost Item.
  - `id`: integer - Contact ID of the employee (references the project Contact record, not LoginInformation). e.g. `5`
  - `name`: string - Display name of the employee. e.g. `Bob the Builder`
- `invoice_number`: string - Vendor invoice number. Present only for invoice-type items; must be unique per vendor within the tool. e.g. `ab-3456`
- `direct_cost_date`: string(date) - Date the direct cost was incurred, in YYYY-MM-DD format. e.g. `2014-10-16`
- `origin_data`: string - Opaque third-party payload stored with the item for external-system integrations. Not interpreted by Procore. e.g. `OD-2398273424`
- `origin_id`: string - Identifier of this item in the originating external system; used to correlate synced records. e.g. `px-1990`
- `grand_total`: string - Sum of all line item amounts on the Direct Cost Item, as a decimal string. e.g. `0.0`
- `line_items_count`: integer - Number of line items on the Direct Cost Item. e.g. `0`
- `payment_date`: string(date) - Date the direct cost was paid, in YYYY-MM-DD format. e.g. `2014-12-16`
- `project`: object - Project the Direct Cost Item belongs to.
  - `id`: integer - Unique identifier of the project. e.g. `123456`
  - `name`: string - Display name of the project. e.g. `Children's Hospital`
- `received_date`: string(date) - Date the direct cost was received, in YYYY-MM-DD format. e.g. `2014-11-16`
- `status`: string enum[draft, pending, revise_and_resubmit, approved] - Review/approval state of the Direct Cost Item. e.g. `pending`
- `synced`: boolean - Whether the Direct Cost Item is linked to an external ERP/accounting system (has an origin ID or synced line items). e.g. `false`
- `has_workflows`: boolean - Whether the Direct Cost Item has an active workflow (approval) instance assigned. e.g. `false`
- `terms`: string - Agreed payment terms for the invoice (for example, Net 30). e.g. `Net 30`
- `updated_at`: string(date-time) - Timestamp when the Direct Cost Item was last updated, in ISO 8601 format. e.g. `2012-10-24T21:39:40Z`
- `vendor`: object - Vendor (company contact) billed on the Direct Cost Item.
  - `id`: integer - Unique identifier of the vendor. e.g. `8`
  - `name`: string - Display name of the vendor. e.g. `Steve's Plumbing and Hardware`
- `vendor_id`: integer - Identifier of the vendor billed on the Direct Cost Item. Required for invoice-type items. e.g. `1`
- `vendor_name`: string - Display name of the vendor billed on the Direct Cost Item. e.g. `Steves Plumbing and Hardware`
- `currency_configuration`: object - Multicurrency configuration for the Direct Cost Item. Values are meaningful only when object-level multicurrency is enabled.
  - `currency_iso_code`: string - ISO 4217 code of the currency the item amounts are recorded in. e.g. `USD`
  - `currency_exchange_rate`: string - Exchange rate used to convert the item currency to the project base currency, as a decimal string. e.g. `2.1`
  - `base_currency_iso_code`: string - ISO 4217 code of the project's base currency. e.g. `USD`
- `tax_breakdown`: object - Header-level tax rollup. Always included on the response as an object, including when Direct Cost taxes are disabled. tax_details is an empty array when no stored tax details are returned. Presence of this key does no...
  - `subtotal`: string - Sum of line-item amounts before tax e.g. `100.00`
  - `tax_total`: string - Total tax across all line items e.g. `12.00`
  - `grand_total`: string - subtotal plus tax_total e.g. `112.00`
  - `tax_details`: array of object - One entry per component tax code that produced tax on this Direct Cost
    - `tax_code_id`: integer - Component tax code that produced this amount e.g. `90`
    - `tax_code_name`: string - Tax code name for tax_code_id e.g. `GST-TEST-COMP`
    - `tax_code_rate`: string - Effective rate as a percentage e.g. `5.0`
    - `amount`: string - Tax amount for this component, summed across line items e.g. `5.00`
    - `taxable_amount`: string - Taxable basis this component was applied against e.g. `100.00`
    - `selected_tax_code_id`: integer - Tax code selected on the line item e.g. `93`
    - `selected_tax_code_name`: string - Tax code name for selected_tax_code_id e.g. `GRP-TEST`
- `line_items`: array of object - Line items belonging to the Direct Cost Item.
  - `id`: integer - Unique identifier of the line item. e.g. `4896147`
  - `amount`: string - Bottom-line monetary amount of the line item, as a decimal string. e.g. `1000.0`
  - `company`: object - Company that owns the project this line item belongs to.
    - `id`: integer - Unique identifier of the company. e.g. `163215`
    - `name`: string - Display name of the company. e.g. `Procore Tech`
  - `cost_code`: oneOf(object | object)
  - `created_at`: string(date-time) - Timestamp when the line item was created, in ISO 8601 format. e.g. `2016-08-01T23:33:54Z`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
  - `description`: string - Free-text description of what the line item covers. e.g. `Cleanup`
  - `extended_type`: string enum[manual, calculated] - How the line item amount is derived. `calculated` means amount = quantity × unit_cost; `manual` means the amount was entered directly. e.g. `calculated`
  - `line_item_type`: object - Cost category (line item type) assigned to this line item.
    - `id`: integer - Unique identifier of the line item type. e.g. `12345`
    - `name`: string - Display name of the line item type. e.g. `Equipment`
    - `code`: string - Short code for the line item type. e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Underlying category the line item type maps to. e.g. `materials`
    - `origin_data`: string - Opaque third-party payload stored with the line item type for external integrations. e.g. `OD-2398273424`
    - `origin_id`: string - Identifier of the line item type in the originating external system. Null when not synced. e.g. `ABC123`
  - `origin_data`: string - Opaque third-party payload stored with the line item for external-system integrations. Not interpreted by Procore. e.g. `OD-39823232`
  - `origin_id`: string - Identifier of this line item in the originating external system; used to correlate synced records. Null when not synced. e.g. `239233`
  - `funding_rule_id`: integer - ID of the funding rule associated with this line item e.g. `12345`
  - `position`: integer - Sort order of the line item within its parent Direct Cost Item. e.g. `1`
  - `quantity`: string(float) - Quantity of the described item, as a decimal string. Multiplied by unit_cost when extended_type is calculated. e.g. `10.0`
  - `tax_code_id`: integer - Identifier of the tax code applied to this line item. e.g. `1`
  - `total_amount`: string(float) - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. Currently identical to `amount` and `extended_amount` ... e.g. `1000.0`
  - `extended_amount`: string(float) - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. Currently identical to `amount` and `total_amount` (Di... e.g. `1000.0`
  - `unit_cost`: string(float) - Cost per unit of the described item, as a decimal string. e.g. `100.0`
  - `uom`: string - Unit of measure for the described item (for example, Lbs, cubic feet). Must be a value from the company's Units of Measure list. e.g. `Lbs`
  - `updated_at`: string(date-time) - Timestamp when the line item was last updated, in ISO 8601 format. e.g. `2016-09-01T21:33:54Z`
  - `wbs_code`: object
    - `id`: integer - Wbs Code ID e.g. `999`
    - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
    - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
  - `ref`: string - Client-supplied reference passed on create to correlate the request with the response. Not persisted. e.g. `PQRS5678`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/direct_costs/{id}

**Update Direct Cost Item**
Update a specific Direct Cost Item. The number of Line Items that can be sent in a single update request is limited to 100. This action does not support concurrent requests. If there is an attempt to update a Direct Cost that is being updated or deleted by another request, a 409 Conflict error will be returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Direct Cost Item.

Request body (application/json) (required):

- `attachments`: array of string - Direct Cost Item attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
- `direct_cost`: object - Direct Cost Item object
  - `description`: string - Free-text description of the Direct Cost Item. e.g. `Home Depot Purchase`
  - `employee_id`: integer - ID of the employee (project contact) associated with the Direct Cost Item. e.g. `14522`
  - `direct_cost_date`: string(date) - Date the direct cost was incurred, in YYYY-MM-DD format. e.g. `2016-12-14`
  - `origin_data`: string - Opaque third-party payload stored with the item for external-system integrations. Not interpreted by Procore. e.g. `OD-2398273424`
  - `origin_id`: string - Identifier of this item in the originating external system; used to correlate synced records. e.g. `px-1990`
  - `payment_date`: string(date) - Date the direct cost was paid, in YYYY-MM-DD format. e.g. `2017-01-05`
  - `received_date`: string(date) - Date the direct cost was received, in YYYY-MM-DD format. e.g. `2017-01-10`
  - `status`: string enum[draft, pending, revise_and_resubmit, approved] - Review/approval state of the Direct Cost Item. e.g. `approved`
  - `terms`: string - Agreed payment terms for the invoice (for example, Net 30). e.g. `Net 30`
  - `vendor_id`: integer - ID of the vendor (company contact) billed on the Direct Cost Item. e.g. `43122`
  - `currency_configuration`: object - Multicurrency values for the Direct Cost Item. Only validated and persisted when object-level multicurrency is enabled for the project.
    - `currency_iso_code`: string - ISO 4217 currency code for the item amounts. e.g. `USD`
    - `currency_exchange_rate`: number(float) - Exchange rate used to convert the item currency to the project base currency. e.g. `0.65`
  - `line_items`: array of object - Line items that should be assoicated with the direct cost item.
    - `id`: integer - ID of an existing line item to update. Omit to create a new line item on the direct cost. e.g. `1234`
    - `manual_amount`: number(float) - Manually entered monetary amount for the line item. e.g. `1000`
    - `wbs_code_id`: integer - ID of the WBS (Work Breakdown Structure) code to assign. Required when creating new line items on the direct cost. e.g. `1989`
    - `description`: string - Free-text description of what the line item covers. e.g. `100' of Copper Piping`
    - `direct_cost_id`: integer - ID of the parent Direct Cost Item this line item belongs to. e.g. `81753`
    - `origin_data`: string - Opaque third-party payload stored with the line item for external-system integrations. Not interpreted by Procore. e.g. `OD-2398273424`
    - `origin_id`: string - Identifier of this line item in the originating external system; used to correlate synced records. e.g. `px-1990`
    - `quantity`: number(float) - Quantity of the described item. Multiplied by unit_cost to compute the extended amount. e.g. `82.0201`
    - `ref`: string - Client-supplied reference passed on create to correlate the request with the response. Not persisted. e.g. `PQRS5678`
    - `tax_code_id`: integer - ID of the tax code applied to this line item. e.g. `1`
    - `unit_cost`: number(float) - Cost per unit of the described item. e.g. `12.03`
    - `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure for the described item. Must be a value from the company's Units of Measure list. e.g. `cubic feet`
    - `funding_rule_id`: integer - ID of the funding rule associated with this line item. Funding Sources must be enabled at the project level. The rule must be ACTIVE and its currency must match the direct cost currency. Pass null to disassociate an e... e.g. `12345`

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Direct Cost Item. Use as the {id} path parameter to retrieve, update, or delete this item. e.g. `3`
- `attachments`: array of object - Files attached to the Direct Cost Item (for example, scanned invoices or receipts).
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `attachments_count`: integer - Number of files attached to the Direct Cost Item. e.g. `0`
- `company`: object - Company that owns the project this Direct Cost Item belongs to.
  - `id`: integer - Unique identifier of the company. e.g. `163215`
  - `name`: string - Display name of the company. e.g. `Procore Tech`
- `created_at`: string(date-time) - Timestamp when the Direct Cost Item was created, in ISO 8601 format. e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the Direct Cost Item was soft-deleted, in ISO 8601 format. Null for active items. e.g. `2017-07-29T21:39:40Z`
- `description`: string - Free-text description of the Direct Cost Item. e.g. `Home Depot Purchase`
- `direct_cost_type`: string enum[invoice, expense, payroll] - Category of the Direct Cost Item. e.g. `invoice`
- `employee`: object - Employee (project contact) associated with the Direct Cost Item.
  - `id`: integer - Contact ID of the employee (references the project Contact record, not LoginInformation). e.g. `5`
  - `name`: string - Display name of the employee. e.g. `Bob the Builder`
- `invoice_number`: string - Vendor invoice number. Present only for invoice-type items; must be unique per vendor within the tool. e.g. `ab-3456`
- `direct_cost_date`: string(date) - Date the direct cost was incurred, in YYYY-MM-DD format. e.g. `2014-10-16`
- `origin_data`: string - Opaque third-party payload stored with the item for external-system integrations. Not interpreted by Procore. e.g. `OD-2398273424`
- `origin_id`: string - Identifier of this item in the originating external system; used to correlate synced records. e.g. `px-1990`
- `grand_total`: string - Sum of all line item amounts on the Direct Cost Item, as a decimal string. e.g. `0.0`
- `line_items_count`: integer - Number of line items on the Direct Cost Item. e.g. `0`
- `payment_date`: string(date) - Date the direct cost was paid, in YYYY-MM-DD format. e.g. `2014-12-16`
- `project`: object - Project the Direct Cost Item belongs to.
  - `id`: integer - Unique identifier of the project. e.g. `123456`
  - `name`: string - Display name of the project. e.g. `Children's Hospital`
- `received_date`: string(date) - Date the direct cost was received, in YYYY-MM-DD format. e.g. `2014-11-16`
- `status`: string enum[draft, pending, revise_and_resubmit, approved] - Review/approval state of the Direct Cost Item. e.g. `pending`
- `synced`: boolean - Whether the Direct Cost Item is linked to an external ERP/accounting system (has an origin ID or synced line items). e.g. `false`
- `has_workflows`: boolean - Whether the Direct Cost Item has an active workflow (approval) instance assigned. e.g. `false`
- `terms`: string - Agreed payment terms for the invoice (for example, Net 30). e.g. `Net 30`
- `updated_at`: string(date-time) - Timestamp when the Direct Cost Item was last updated, in ISO 8601 format. e.g. `2012-10-24T21:39:40Z`
- `vendor`: object - Vendor (company contact) billed on the Direct Cost Item.
  - `id`: integer - Unique identifier of the vendor. e.g. `8`
  - `name`: string - Display name of the vendor. e.g. `Steve's Plumbing and Hardware`
- `vendor_id`: integer - Identifier of the vendor billed on the Direct Cost Item. Required for invoice-type items. e.g. `1`
- `vendor_name`: string - Display name of the vendor billed on the Direct Cost Item. e.g. `Steves Plumbing and Hardware`
- `currency_configuration`: object - Multicurrency configuration for the Direct Cost Item. Values are meaningful only when object-level multicurrency is enabled.
  - `currency_iso_code`: string - ISO 4217 code of the currency the item amounts are recorded in. e.g. `USD`
  - `currency_exchange_rate`: string - Exchange rate used to convert the item currency to the project base currency, as a decimal string. e.g. `2.1`
  - `base_currency_iso_code`: string - ISO 4217 code of the project's base currency. e.g. `USD`
- `tax_breakdown`: object - Header-level tax rollup. Always included on the response as an object, including when Direct Cost taxes are disabled. tax_details is an empty array when no stored tax details are returned. Presence of this key does no...
  - `subtotal`: string - Sum of line-item amounts before tax e.g. `100.00`
  - `tax_total`: string - Total tax across all line items e.g. `12.00`
  - `grand_total`: string - subtotal plus tax_total e.g. `112.00`
  - `tax_details`: array of object - One entry per component tax code that produced tax on this Direct Cost
    - `tax_code_id`: integer - Component tax code that produced this amount e.g. `90`
    - `tax_code_name`: string - Tax code name for tax_code_id e.g. `GST-TEST-COMP`
    - `tax_code_rate`: string - Effective rate as a percentage e.g. `5.0`
    - `amount`: string - Tax amount for this component, summed across line items e.g. `5.00`
    - `taxable_amount`: string - Taxable basis this component was applied against e.g. `100.00`
    - `selected_tax_code_id`: integer - Tax code selected on the line item e.g. `93`
    - `selected_tax_code_name`: string - Tax code name for selected_tax_code_id e.g. `GRP-TEST`
- `line_items`: array of object - Line items belonging to the Direct Cost Item.
  - `id`: integer - Unique identifier of the line item. e.g. `4896147`
  - `amount`: string - Bottom-line monetary amount of the line item, as a decimal string. e.g. `1000.0`
  - `company`: object - Company that owns the project this line item belongs to.
    - `id`: integer - Unique identifier of the company. e.g. `163215`
    - `name`: string - Display name of the company. e.g. `Procore Tech`
  - `cost_code`: oneOf(object | object)
  - `created_at`: string(date-time) - Timestamp when the line item was created, in ISO 8601 format. e.g. `2016-08-01T23:33:54Z`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
  - `description`: string - Free-text description of what the line item covers. e.g. `Cleanup`
  - `extended_type`: string enum[manual, calculated] - How the line item amount is derived. `calculated` means amount = quantity × unit_cost; `manual` means the amount was entered directly. e.g. `calculated`
  - `line_item_type`: object - Cost category (line item type) assigned to this line item.
    - `id`: integer - Unique identifier of the line item type. e.g. `12345`
    - `name`: string - Display name of the line item type. e.g. `Equipment`
    - `code`: string - Short code for the line item type. e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Underlying category the line item type maps to. e.g. `materials`
    - `origin_data`: string - Opaque third-party payload stored with the line item type for external integrations. e.g. `OD-2398273424`
    - `origin_id`: string - Identifier of the line item type in the originating external system. Null when not synced. e.g. `ABC123`
  - `origin_data`: string - Opaque third-party payload stored with the line item for external-system integrations. Not interpreted by Procore. e.g. `OD-39823232`
  - `origin_id`: string - Identifier of this line item in the originating external system; used to correlate synced records. Null when not synced. e.g. `239233`
  - `funding_rule_id`: integer - ID of the funding rule associated with this line item e.g. `12345`
  - `position`: integer - Sort order of the line item within its parent Direct Cost Item. e.g. `1`
  - `quantity`: string(float) - Quantity of the described item, as a decimal string. Multiplied by unit_cost when extended_type is calculated. e.g. `10.0`
  - `tax_code_id`: integer - Identifier of the tax code applied to this line item. e.g. `1`
  - `total_amount`: string(float) - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. Currently identical to `amount` and `extended_amount` ... e.g. `1000.0`
  - `extended_amount`: string(float) - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. Currently identical to `amount` and `total_amount` (Di... e.g. `1000.0`
  - `unit_cost`: string(float) - Cost per unit of the described item, as a decimal string. e.g. `100.0`
  - `uom`: string - Unit of measure for the described item (for example, Lbs, cubic feet). Must be a value from the company's Units of Measure list. e.g. `Lbs`
  - `updated_at`: string(date-time) - Timestamp when the line item was last updated, in ISO 8601 format. e.g. `2016-09-01T21:33:54Z`
  - `wbs_code`: object
    - `id`: integer - Wbs Code ID e.g. `999`
    - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
    - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
  - `ref`: string - Client-supplied reference passed on create to correlate the request with the response. Not persisted. e.g. `PQRS5678`

Error responses: 400, 401, 403, 409, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.1/projects/{project_id}/direct_costs/{id}

**Delete Direct Cost Item**
Delete a specific Direct Cost Item and its Line Items. This action does not support concurrent requests. If there is an attempt to delete a Direct Cost that is being updated or deleted by another request, a 409 Conflict error will be returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Direct Cost Item.

Response 200 (application/json): object

- `id`: integer - ID of the deleted Direct Cost Item. e.g. `1`

Error responses: 400, 403, 404, 409, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/direct_costs/line_items

**List All Direct Cost Line Items**
Return a list of all Direct Cost Line Items.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[direct_cost_id]` [query] integer - Return item(s) with the specified Direct Cost ID or range of Direct Cost IDs.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[cost_code_id]` [query] string - Cost Code ID. Returns item(s) with the specified Cost Code ID or within the specified range of Cost Code IDs.
- `filters[line_item_type_id]` [query] integer - Line Item Type ID. Returns item(s) with the specified Line Item Type ID or range of Line Item Type IDs.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the line item. Use as the {id} path parameter to retrieve, update, or delete this line item. e.g. `4896147`
- `amount`: string - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. e.g. `1000.0`
- `cost_code`: object - Cost code assigned to the line item.
  - `id`: integer - Unique identifier of the cost code. e.g. `12345`
  - `full_code`: string - Fully qualified cost code including any parent prefixes. e.g. `02-300`
  - `name`: string - Display name of the cost code. e.g. `Earthwork`
  - `origin_id`: string - Identifier of the cost code in the originating external system. Null when not synced. e.g. `9874484`
- `created_at`: string(date-time) - Timestamp when the line item was created, in ISO 8601 format. e.g. `2016-08-01T23:33:54Z`
- `description`: string - Free-text description of what the line item covers. e.g. `Cleanup`
- `extended_amount`: string(float) - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. Currently identical to `amount` and `total_amount` (Di... e.g. `1000.0`
- `extended_type`: string enum[manual, calculated] - How the line item amount is derived. `calculated` means amount = quantity × unit_cost; `manual` means the amount was entered directly. e.g. `calculated`
- `holder`: object - Parent record that owns this line item (the Direct Cost Item).
  - `id`: integer - Unique identifier of the holder record (the Direct Cost Item ID). e.g. `233245`
  - `holder_type`: string - Class name of the holder record. Always DirectCost::Item for direct cost line items. e.g. `DirectCost::Item`
- `line_item_type`: object - Cost category (line item type) assigned to this line item.
  - `id`: integer - Unique identifier of the line item type. e.g. `12345`
  - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Underlying category the line item type maps to. e.g. `materials`
  - `code`: string - Short code for the line item type. e.g. `LB`
  - `name`: string - Display name of the line item type. e.g. `Equipment`
  - `origin_data`: string - Opaque third-party payload stored with the line item type for external integrations. e.g. `OD-2398273424`
  - `origin_id`: string - Identifier of the line item type in the originating external system. Null when not synced. e.g. `ABC123`
- `origin_id`: string - Identifier of this line item in the originating external system; used to correlate synced records. Null when not synced. e.g. `239233`
- `funding_rule_id`: integer - ID of the funding rule associated with this line item e.g. `12345`
- `position`: integer - Sort order of the line item within its parent Direct Cost Item. e.g. `1`
- `project`: object - Project the line item belongs to.
  - `id`: integer - Unique identifier of the project. e.g. `123456`
  - `name`: string - Display name of the project. e.g. `Children's Hospital`
- `quantity`: string(float) - Quantity of the described item, as a decimal string. Multiplied by unit_cost when extended_type is calculated. e.g. `10.0`
- `sub_job_id`: integer - Identifier of the sub job the line item's cost code belongs to. Present only when the cost code is billed to a sub job; otherwise omitted. e.g. `45`
- `tax_code_id`: integer - Identifier of the tax code applied to this line item. e.g. `1`
- `total_amount`: string(float) - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. Currently identical to `amount` and `extended_amount` ... e.g. `1000.0`
- `unit_cost`: string(float) - Cost per unit of the described item, as a decimal string. e.g. `100.0`
- `uom`: string - Unit of measure for the described item (for example, Lbs, cubic feet). Must be a value from the company's Units of Measure list. e.g. `Lbs`
- `updated_at`: string(date-time) - Timestamp when the line item was last updated, in ISO 8601 format. e.g. `2016-09-01T21:33:54Z`
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/direct_costs/{direct_cost_id}/line_items

**List Direct Cost Line Items**
Return a list of all Direct Cost Line Items.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `direct_cost_id` [path] integer (required) - ID of the parent Direct Cost Item.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[cost_code_id]` [query] string - Cost Code ID. Returns item(s) with the specified Cost Code ID or within the specified range of Cost Code IDs.
- `filters[line_item_type_id]` [query] integer - Line Item Type ID. Returns item(s) with the specified Line Item Type ID or range of Line Item Type IDs.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the line item. Use as the {id} path parameter to retrieve, update, or delete this line item. e.g. `4896147`
- `amount`: string - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. e.g. `1000.0`
- `company`: object - Company that owns the project this line item belongs to.
  - `id`: integer - Unique identifier of the company. e.g. `163215`
  - `name`: string - Display name of the company. e.g. `Procore Tech`
- `cost_code`: oneOf(object | object)
- `created_at`: string(date-time) - Timestamp when the line item was created, in ISO 8601 format. e.g. `2016-08-01T23:33:54Z`
- `description`: string - Free-text description of what the line item covers. e.g. `Cleanup`
- `extended_type`: string enum[manual, calculated] - How the line item amount is derived. `calculated` means amount = quantity × unit_cost; `manual` means the amount was entered directly. e.g. `calculated`
- `holder`: object - Parent record that owns this line item (the Direct Cost Item).
  - `id`: integer - Unique identifier of the holder record (the Direct Cost Item ID). e.g. `233245`
  - `holder_type`: string - Class name of the holder record. Always DirectCost::Item for direct cost line items. e.g. `DirectCost::Item`
- `funding_rule_id`: integer - ID of the funding rule associated with this line item e.g. `12345`
- `line_item_type`: object - Cost category (line item type) assigned to this line item.
  - `id`: integer - Unique identifier of the line item type. e.g. `12345`
  - `name`: string - Display name of the line item type. e.g. `Equipment`
  - `code`: string - Short code for the line item type. e.g. `LB`
  - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Underlying category the line item type maps to. e.g. `materials`
  - `origin_data`: string - Opaque third-party payload stored with the line item type for external integrations. e.g. `OD-2398273424`
  - `origin_id`: string - Identifier of the line item type in the originating external system. Null when not synced. e.g. `ABC123`
- `origin_data`: string - Opaque third-party payload stored with the line item for external-system integrations. Not interpreted by Procore. e.g. `OD-39823232`
- `origin_id`: string - Identifier of this line item in the originating external system; used to correlate synced records. Null when not synced. e.g. `239233`
- `position`: integer - Sort order of the line item within its parent Direct Cost Item. e.g. `1`
- `project`: object - Project the line item belongs to.
  - `id`: integer - Unique identifier of the project. e.g. `123456`
  - `name`: string - Display name of the project. e.g. `Children's Hospital`
- `quantity`: string(float) - Quantity of the described item, as a decimal string. Multiplied by unit_cost when extended_type is calculated. e.g. `10.0`
- `tax_code_id`: integer - Identifier of the tax code applied to this line item. e.g. `1`
- `total_amount`: string(float) - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. Currently identical to `amount` and `extended_amount` ... e.g. `1000.0`
- `extended_amount`: string(float) - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. Currently identical to `amount` and `total_amount` (Di... e.g. `1000.0`
- `unit_cost`: string(float) - Cost per unit of the described item, as a decimal string. e.g. `100.0`
- `uom`: string - Unit of measure for the described item (for example, Lbs, cubic feet). Must be a value from the company's Units of Measure list. e.g. `Lbs`
- `updated_at`: string(date-time) - Timestamp when the line item was last updated, in ISO 8601 format. e.g. `2016-09-01T21:33:54Z`
- `change_event_line_item`: object - Change event line item linked to this direct cost line item. Present only when the line item was created from a change event and the user can view change events.
  - `id`: integer - Unique identifier of the linked change event line item. e.g. `5`
  - `cost_rom`: string(float) - Rough order of magnitude (ROM) estimated cost for the change event line item, as a decimal string. e.g. `100.0`
  - `revenue_rom`: string(float) - Rough order of magnitude (ROM) estimated revenue for the change event line item, as a decimal string. e.g. `200.0`
  - `event_id`: integer - Identifier of the parent change event. e.g. `6`
  - `cost_code`: oneOf(object | object)
  - `line_item_type`: object - Cost category (line item type) assigned to the change event line item.
    - `id`: integer - Unique identifier of the line item type. e.g. `12345`
    - `name`: string - Display name of the line item type. e.g. `Equipment`
    - `code`: string - Short code for the line item type. e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Underlying category the line item type maps to. e.g. `materials`
    - `origin_data`: string - Opaque third-party payload stored with the line item type for external integrations. e.g. `OD-2398273424`
    - `origin_id`: string - Identifier of the line item type in the originating external system. Null when not synced. e.g. `ABC123`
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/direct_costs/{direct_cost_id}/line_items

**Create Direct Cost Line Item**
Create a new Direct Cost Line Item.
This action does not support concurrent requests. If there is an attempt to create a Direct Cost Line Item that belongs to a Direct Cost which is being updated or deleted by another request, a 409 Conflict error will be returned.
Note: A budget line item will automatically be created for Non-budgeted line items for all new projects and for projects enabled with Non-Budgeted line item beta functionality

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `direct_cost_id` [path] integer (required) - ID of the parent Direct Cost Item.

Request body (application/json) (required):

- `line_item`: object (required) - Line Item object
  - `amount`: number(float) - Monetary amount for the line item. When extended_type is `calculated` it is derived from quantity × unit_cost; when `manual` it is the entered value. e.g. `1000`
  - `wbs_code_id`: integer - ID of the WBS (Work Breakdown Structure) code to assign. Either wbs_code_id or cost_code_id + line_item_type_id is required when creating a line item; wbs_code_id takes precedence. e.g. `1989`
  - `cost_code_id`: integer - ID of the cost code to assign to the line item. Ignored if wbs_code_id is supplied. e.g. `4682`
  - `description`: string - Free-text description of what the line item covers. e.g. `100' of Copper Piping`
  - `direct_cost_id`: integer - ID of the parent Direct Cost Item this line item belongs to. e.g. `81753`
  - `extended_type`: string enum[manual, calculated] - How the line item amount is derived. `calculated` means amount = quantity × unit_cost; `manual` means the amount is entered directly. e.g. `manual`
  - `quantity`: number(float) - Quantity of the described item. Multiplied by unit_cost when extended_type is `calculated`. e.g. `82.0201`
  - `line_item_type_id`: integer - ID of the line item type (cost category) to assign. e.g. `26943`
  - `origin_data`: string - Opaque third-party payload stored with the line item for external-system integrations. Not interpreted by Procore. e.g. `OD-2398273424`
  - `origin_id`: string - Identifier of this line item in the originating external system; used to correlate synced records. e.g. `px-1990`
  - `unit_cost`: number(float) - Cost per unit of the described item. e.g. `12.03`
  - `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure for the described item. Must be a value from the company's Units of Measure list. e.g. `cubic feet`
  - `tax_code_id`: integer - ID of the tax code applied to this line item. e.g. `1`
  - `funding_rule_id`: integer - ID of the funding rule associated with this line item. Funding Sources must be enabled at the project level. The rule must be ACTIVE and its currency must match the direct cost currency. Pass null to disassociate an e... e.g. `12345`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the line item. Use as the {id} path parameter to retrieve, update, or delete this line item. e.g. `4896147`
- `amount`: string - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. e.g. `1000.0`
- `company`: object - Company that owns the project this line item belongs to.
  - `id`: integer - Unique identifier of the company. e.g. `163215`
  - `name`: string - Display name of the company. e.g. `Procore Tech`
- `cost_code`: oneOf(object | object)
- `created_at`: string(date-time) - Timestamp when the line item was created, in ISO 8601 format. e.g. `2016-08-01T23:33:54Z`
- `description`: string - Free-text description of what the line item covers. e.g. `Cleanup`
- `extended_type`: string enum[manual, calculated] - How the line item amount is derived. `calculated` means amount = quantity × unit_cost; `manual` means the amount was entered directly. e.g. `calculated`
- `holder`: object - Parent record that owns this line item (the Direct Cost Item).
  - `id`: integer - Unique identifier of the holder record (the Direct Cost Item ID). e.g. `233245`
  - `holder_type`: string - Class name of the holder record. Always DirectCost::Item for direct cost line items. e.g. `DirectCost::Item`
- `funding_rule_id`: integer - ID of the funding rule associated with this line item e.g. `12345`
- `line_item_type`: object - Cost category (line item type) assigned to this line item.
  - `id`: integer - Unique identifier of the line item type. e.g. `12345`
  - `name`: string - Display name of the line item type. e.g. `Equipment`
  - `code`: string - Short code for the line item type. e.g. `LB`
  - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Underlying category the line item type maps to. e.g. `materials`
  - `origin_data`: string - Opaque third-party payload stored with the line item type for external integrations. e.g. `OD-2398273424`
  - `origin_id`: string - Identifier of the line item type in the originating external system. Null when not synced. e.g. `ABC123`
- `origin_data`: string - Opaque third-party payload stored with the line item for external-system integrations. Not interpreted by Procore. e.g. `OD-39823232`
- `origin_id`: string - Identifier of this line item in the originating external system; used to correlate synced records. Null when not synced. e.g. `239233`
- `position`: integer - Sort order of the line item within its parent Direct Cost Item. e.g. `1`
- `project`: object - Project the line item belongs to.
  - `id`: integer - Unique identifier of the project. e.g. `123456`
  - `name`: string - Display name of the project. e.g. `Children's Hospital`
- `quantity`: string(float) - Quantity of the described item, as a decimal string. Multiplied by unit_cost when extended_type is calculated. e.g. `10.0`
- `tax_code_id`: integer - Identifier of the tax code applied to this line item. e.g. `1`
- `total_amount`: string(float) - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. Currently identical to `amount` and `extended_amount` ... e.g. `1000.0`
- `extended_amount`: string(float) - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. Currently identical to `amount` and `total_amount` (Di... e.g. `1000.0`
- `unit_cost`: string(float) - Cost per unit of the described item, as a decimal string. e.g. `100.0`
- `uom`: string - Unit of measure for the described item (for example, Lbs, cubic feet). Must be a value from the company's Units of Measure list. e.g. `Lbs`
- `updated_at`: string(date-time) - Timestamp when the line item was last updated, in ISO 8601 format. e.g. `2016-09-01T21:33:54Z`
- `change_event_line_item`: object - Change event line item linked to this direct cost line item. Present only when the line item was created from a change event and the user can view change events.
  - `id`: integer - Unique identifier of the linked change event line item. e.g. `5`
  - `cost_rom`: string(float) - Rough order of magnitude (ROM) estimated cost for the change event line item, as a decimal string. e.g. `100.0`
  - `revenue_rom`: string(float) - Rough order of magnitude (ROM) estimated revenue for the change event line item, as a decimal string. e.g. `200.0`
  - `event_id`: integer - Identifier of the parent change event. e.g. `6`
  - `cost_code`: oneOf(object | object)
  - `line_item_type`: object - Cost category (line item type) assigned to the change event line item.
    - `id`: integer - Unique identifier of the line item type. e.g. `12345`
    - `name`: string - Display name of the line item type. e.g. `Equipment`
    - `code`: string - Short code for the line item type. e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Underlying category the line item type maps to. e.g. `materials`
    - `origin_data`: string - Opaque third-party payload stored with the line item type for external integrations. e.g. `OD-2398273424`
    - `origin_id`: string - Identifier of the line item type in the originating external system. Null when not synced. e.g. `ABC123`
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 400, 401, 403, 404, 409, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/direct_costs/line_items/sync

**Sync Direct Cost Line Items**
This endpoint creates or updates a batch of Direct Cost Line Items. For this endpoint either wbs_code_id or cost_code_id and line_item_type_id are required when creating a line item. If both wbs_code_id and cost_code_id are provided, the endpoint will use wbs_code_id.
This action does not support concurrent requests. If there is an attempt to update or create a Direct Cost Line Item that belongs to a Direct Cost which is being updated or deleted by another request, a 409 Conflict error will be returned.
See [Using Sync Actions](/documentation/using-sync-actions) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `updates`: array of object (required)
  - `id`: integer - ID of an existing line item to update. Omit to create a new line item.
  - `amount`: number(float) - Monetary amount for the line item. When extended_type is `calculated` it is derived from quantity × unit_cost; when `manual` it is the entered value. e.g. `1000`
  - `wbs_code_id`: integer - ID of the WBS (Work Breakdown Structure) code to assign. Required when creating a line item if cost_code_id and line_item_type_id is not provided. e.g. `1989`
  - `cost_code_id`: integer - ID of the cost code to assign to the line item. Required when creating a line item if wbs_code_id is not provided. e.g. `4682`
  - `description`: string - Free-text description of what the line item covers. e.g. `100' of Copper Piping`
  - `direct_cost_id`: integer - ID of the parent Direct Cost Item this line item belongs to. Required when creating a line item. e.g. `81753`
  - `extended_type`: string enum[manual, calculated] - How the line item amount is derived. `calculated` means amount = quantity × unit_cost; `manual` means the amount is entered directly. e.g. `manual`
  - `quantity`: number(float) - Quantity of the described item. Multiplied by unit_cost when extended_type is `calculated`. e.g. `82.0201`
  - `line_item_type_id`: integer - ID of the line item type (cost category) to assign. Required when creating a line item if wbs_code_id and cost_code_id are not provided. e.g. `26943`
  - `origin_data`: string - Opaque third-party payload stored with the line item for external-system integrations. Not interpreted by Procore. e.g. `OD-2398273424`
  - `origin_id`: string - Identifier of this line item in the originating external system; used to correlate synced records. e.g. `px-1990`
  - `unit_cost`: number(float) - Cost per unit of the described item. e.g. `12.03`
  - `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure for the described item. Must be a value from the company's Units of Measure list. e.g. `cubic feet`
  - `tax_code_id`: integer - ID of the tax code applied to this line item. e.g. `1`
  - `funding_rule_id`: integer - ID of the funding rule associated with this line item. Funding Sources must be enabled at the project level. The rule must be ACTIVE and its currency must match the direct cost currency. Pass null to disassociate an e... e.g. `12345`

Response 200 (application/json): object

- `entities`: array of object
  - `id`: integer - Unique identifier of the line item. Use as the {id} path parameter to retrieve, update, or delete this line item. e.g. `4896147`
  - `amount`: string - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. e.g. `1000.0`
  - `company`: object - Company that owns the project this line item belongs to.
    - `id`: integer - Unique identifier of the company. e.g. `163215`
    - `name`: string - Display name of the company. e.g. `Procore Tech`
  - `cost_code`: oneOf(object | object)
  - `created_at`: string(date-time) - Timestamp when the line item was created, in ISO 8601 format. e.g. `2016-08-01T23:33:54Z`
  - `description`: string - Free-text description of what the line item covers. e.g. `Cleanup`
  - `extended_type`: string enum[manual, calculated] - How the line item amount is derived. `calculated` means amount = quantity × unit_cost; `manual` means the amount was entered directly. e.g. `calculated`
  - `holder`: object - Parent record that owns this line item (the Direct Cost Item).
    - `id`: integer - Unique identifier of the holder record (the Direct Cost Item ID). e.g. `233245`
    - `holder_type`: string - Class name of the holder record. Always DirectCost::Item for direct cost line items. e.g. `DirectCost::Item`
  - `funding_rule_id`: integer - ID of the funding rule associated with this line item e.g. `12345`
  - `line_item_type`: object - Cost category (line item type) assigned to this line item.
    - `id`: integer - Unique identifier of the line item type. e.g. `12345`
    - `name`: string - Display name of the line item type. e.g. `Equipment`
    - `code`: string - Short code for the line item type. e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Underlying category the line item type maps to. e.g. `materials`
    - `origin_data`: string - Opaque third-party payload stored with the line item type for external integrations. e.g. `OD-2398273424`
    - `origin_id`: string - Identifier of the line item type in the originating external system. Null when not synced. e.g. `ABC123`
  - `origin_data`: string - Opaque third-party payload stored with the line item for external-system integrations. Not interpreted by Procore. e.g. `OD-39823232`
  - `origin_id`: string - Identifier of this line item in the originating external system; used to correlate synced records. Null when not synced. e.g. `239233`
  - `position`: integer - Sort order of the line item within its parent Direct Cost Item. e.g. `1`
  - `project`: object - Project the line item belongs to.
    - `id`: integer - Unique identifier of the project. e.g. `123456`
    - `name`: string - Display name of the project. e.g. `Children's Hospital`
  - `quantity`: string(float) - Quantity of the described item, as a decimal string. Multiplied by unit_cost when extended_type is calculated. e.g. `10.0`
  - `tax_code_id`: integer - Identifier of the tax code applied to this line item. e.g. `1`
  - `total_amount`: string(float) - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. Currently identical to `amount` and `extended_amount` ... e.g. `1000.0`
  - `extended_amount`: string(float) - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. Currently identical to `amount` and `total_amount` (Di... e.g. `1000.0`
  - `unit_cost`: string(float) - Cost per unit of the described item, as a decimal string. e.g. `100.0`
  - `uom`: string - Unit of measure for the described item (for example, Lbs, cubic feet). Must be a value from the company's Units of Measure list. e.g. `Lbs`
  - `updated_at`: string(date-time) - Timestamp when the line item was last updated, in ISO 8601 format. e.g. `2016-09-01T21:33:54Z`
  - `change_event_line_item`: object - Change event line item linked to this direct cost line item. Present only when the line item was created from a change event and the user can view change events.
    - `id`: integer - Unique identifier of the linked change event line item. e.g. `5`
    - `cost_rom`: string(float) - Rough order of magnitude (ROM) estimated cost for the change event line item, as a decimal string. e.g. `100.0`
    - `revenue_rom`: string(float) - Rough order of magnitude (ROM) estimated revenue for the change event line item, as a decimal string. e.g. `200.0`
    - `event_id`: integer - Identifier of the parent change event. e.g. `6`
    - `cost_code`: oneOf(object | object)
    - `line_item_type`: object - Cost category (line item type) assigned to the change event line item.
  - `wbs_code`: object
    - `id`: integer - Wbs Code ID e.g. `999`
    - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
    - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
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

Error responses: 400, 401, 403, 409, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/direct_costs/{direct_cost_id}/line_items/{id}

**Show Direct Cost Line Item**
Returns detailed information on a Direct Cost Line Item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `direct_cost_id` [path] integer (required) - ID of the parent Direct Cost Item.
- `id` [path] integer (required) - ID of the Direct Cost Line Item.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the line item. Use as the {id} path parameter to retrieve, update, or delete this line item. e.g. `4896147`
- `amount`: string - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. e.g. `1000.0`
- `company`: object - Company that owns the project this line item belongs to.
  - `id`: integer - Unique identifier of the company. e.g. `163215`
  - `name`: string - Display name of the company. e.g. `Procore Tech`
- `cost_code`: oneOf(object | object)
- `created_at`: string(date-time) - Timestamp when the line item was created, in ISO 8601 format. e.g. `2016-08-01T23:33:54Z`
- `description`: string - Free-text description of what the line item covers. e.g. `Cleanup`
- `extended_type`: string enum[manual, calculated] - How the line item amount is derived. `calculated` means amount = quantity × unit_cost; `manual` means the amount was entered directly. e.g. `calculated`
- `holder`: object - Parent record that owns this line item (the Direct Cost Item).
  - `id`: integer - Unique identifier of the holder record (the Direct Cost Item ID). e.g. `233245`
  - `holder_type`: string - Class name of the holder record. Always DirectCost::Item for direct cost line items. e.g. `DirectCost::Item`
- `funding_rule_id`: integer - ID of the funding rule associated with this line item e.g. `12345`
- `line_item_type`: object - Cost category (line item type) assigned to this line item.
  - `id`: integer - Unique identifier of the line item type. e.g. `12345`
  - `name`: string - Display name of the line item type. e.g. `Equipment`
  - `code`: string - Short code for the line item type. e.g. `LB`
  - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Underlying category the line item type maps to. e.g. `materials`
  - `origin_data`: string - Opaque third-party payload stored with the line item type for external integrations. e.g. `OD-2398273424`
  - `origin_id`: string - Identifier of the line item type in the originating external system. Null when not synced. e.g. `ABC123`
- `origin_data`: string - Opaque third-party payload stored with the line item for external-system integrations. Not interpreted by Procore. e.g. `OD-39823232`
- `origin_id`: string - Identifier of this line item in the originating external system; used to correlate synced records. Null when not synced. e.g. `239233`
- `position`: integer - Sort order of the line item within its parent Direct Cost Item. e.g. `1`
- `project`: object - Project the line item belongs to.
  - `id`: integer - Unique identifier of the project. e.g. `123456`
  - `name`: string - Display name of the project. e.g. `Children's Hospital`
- `quantity`: string(float) - Quantity of the described item, as a decimal string. Multiplied by unit_cost when extended_type is calculated. e.g. `10.0`
- `tax_code_id`: integer - Identifier of the tax code applied to this line item. e.g. `1`
- `total_amount`: string(float) - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. Currently identical to `amount` and `extended_amount` ... e.g. `1000.0`
- `extended_amount`: string(float) - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. Currently identical to `amount` and `total_amount` (Di... e.g. `1000.0`
- `unit_cost`: string(float) - Cost per unit of the described item, as a decimal string. e.g. `100.0`
- `uom`: string - Unit of measure for the described item (for example, Lbs, cubic feet). Must be a value from the company's Units of Measure list. e.g. `Lbs`
- `updated_at`: string(date-time) - Timestamp when the line item was last updated, in ISO 8601 format. e.g. `2016-09-01T21:33:54Z`
- `change_event_line_item`: object - Change event line item linked to this direct cost line item. Present only when the line item was created from a change event and the user can view change events.
  - `id`: integer - Unique identifier of the linked change event line item. e.g. `5`
  - `cost_rom`: string(float) - Rough order of magnitude (ROM) estimated cost for the change event line item, as a decimal string. e.g. `100.0`
  - `revenue_rom`: string(float) - Rough order of magnitude (ROM) estimated revenue for the change event line item, as a decimal string. e.g. `200.0`
  - `event_id`: integer - Identifier of the parent change event. e.g. `6`
  - `cost_code`: oneOf(object | object)
  - `line_item_type`: object - Cost category (line item type) assigned to the change event line item.
    - `id`: integer - Unique identifier of the line item type. e.g. `12345`
    - `name`: string - Display name of the line item type. e.g. `Equipment`
    - `code`: string - Short code for the line item type. e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Underlying category the line item type maps to. e.g. `materials`
    - `origin_data`: string - Opaque third-party payload stored with the line item type for external integrations. e.g. `OD-2398273424`
    - `origin_id`: string - Identifier of the line item type in the originating external system. Null when not synced. e.g. `ABC123`
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/direct_costs/{direct_cost_id}/line_items/{id}

**Update Direct Cost Line Item**
Update a Direct Cost Line Item.
This action does not support concurrent requests. If there is an attempt to update a Direct Cost Line Item that belongs to a Direct Cost which is being updated or deleted by another request, a 409 Conflict error will be returned.
Note: A budget line item will automatically be created for Non-budgeted line items for all new projects and for projects enabled with Non-Budgeted line item beta functionality

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `direct_cost_id` [path] integer (required) - ID of the parent Direct Cost Item.
- `id` [path] integer (required) - ID of the Direct Cost Line Item.

Request body (application/json) (required):

- `line_item`: object (required) - Line Item object
  - `amount`: number(float) - Monetary amount for the line item. When extended_type is `calculated` it is derived from quantity × unit_cost; when `manual` it is the entered value. e.g. `1000`
  - `wbs_code_id`: integer - ID of the WBS (Work Breakdown Structure) code to assign. Either wbs_code_id or cost_code_id + line_item_type_id is required when creating a line item; wbs_code_id takes precedence. e.g. `1989`
  - `cost_code_id`: integer - ID of the cost code to assign to the line item. Ignored if wbs_code_id is supplied. e.g. `4682`
  - `description`: string - Free-text description of what the line item covers. e.g. `100' of Copper Piping`
  - `direct_cost_id`: integer - ID of the parent Direct Cost Item this line item belongs to. e.g. `81753`
  - `extended_type`: string enum[manual, calculated] - How the line item amount is derived. `calculated` means amount = quantity × unit_cost; `manual` means the amount is entered directly. e.g. `manual`
  - `quantity`: number(float) - Quantity of the described item. Multiplied by unit_cost when extended_type is `calculated`. e.g. `82.0201`
  - `line_item_type_id`: integer - ID of the line item type (cost category) to assign. e.g. `26943`
  - `origin_data`: string - Opaque third-party payload stored with the line item for external-system integrations. Not interpreted by Procore. e.g. `OD-2398273424`
  - `origin_id`: string - Identifier of this line item in the originating external system; used to correlate synced records. e.g. `px-1990`
  - `unit_cost`: number(float) - Cost per unit of the described item. e.g. `12.03`
  - `uom`: string enum[Any value present in the Company list of Units of Measure] - Unit of measure for the described item. Must be a value from the company's Units of Measure list. e.g. `cubic feet`
  - `tax_code_id`: integer - ID of the tax code applied to this line item. e.g. `1`
  - `funding_rule_id`: integer - ID of the funding rule associated with this line item. Funding Sources must be enabled at the project level. The rule must be ACTIVE and its currency must match the direct cost currency. Pass null to disassociate an e... e.g. `12345`

Response 200 (application/json): object

- `id`: integer - Unique identifier of the line item. Use as the {id} path parameter to retrieve, update, or delete this line item. e.g. `4896147`
- `amount`: string - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. e.g. `1000.0`
- `company`: object - Company that owns the project this line item belongs to.
  - `id`: integer - Unique identifier of the company. e.g. `163215`
  - `name`: string - Display name of the company. e.g. `Procore Tech`
- `cost_code`: oneOf(object | object)
- `created_at`: string(date-time) - Timestamp when the line item was created, in ISO 8601 format. e.g. `2016-08-01T23:33:54Z`
- `description`: string - Free-text description of what the line item covers. e.g. `Cleanup`
- `extended_type`: string enum[manual, calculated] - How the line item amount is derived. `calculated` means amount = quantity × unit_cost; `manual` means the amount was entered directly. e.g. `calculated`
- `holder`: object - Parent record that owns this line item (the Direct Cost Item).
  - `id`: integer - Unique identifier of the holder record (the Direct Cost Item ID). e.g. `233245`
  - `holder_type`: string - Class name of the holder record. Always DirectCost::Item for direct cost line items. e.g. `DirectCost::Item`
- `funding_rule_id`: integer - ID of the funding rule associated with this line item e.g. `12345`
- `line_item_type`: object - Cost category (line item type) assigned to this line item.
  - `id`: integer - Unique identifier of the line item type. e.g. `12345`
  - `name`: string - Display name of the line item type. e.g. `Equipment`
  - `code`: string - Short code for the line item type. e.g. `LB`
  - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Underlying category the line item type maps to. e.g. `materials`
  - `origin_data`: string - Opaque third-party payload stored with the line item type for external integrations. e.g. `OD-2398273424`
  - `origin_id`: string - Identifier of the line item type in the originating external system. Null when not synced. e.g. `ABC123`
- `origin_data`: string - Opaque third-party payload stored with the line item for external-system integrations. Not interpreted by Procore. e.g. `OD-39823232`
- `origin_id`: string - Identifier of this line item in the originating external system; used to correlate synced records. Null when not synced. e.g. `239233`
- `position`: integer - Sort order of the line item within its parent Direct Cost Item. e.g. `1`
- `project`: object - Project the line item belongs to.
  - `id`: integer - Unique identifier of the project. e.g. `123456`
  - `name`: string - Display name of the project. e.g. `Children's Hospital`
- `quantity`: string(float) - Quantity of the described item, as a decimal string. Multiplied by unit_cost when extended_type is calculated. e.g. `10.0`
- `tax_code_id`: integer - Identifier of the tax code applied to this line item. e.g. `1`
- `total_amount`: string(float) - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. Currently identical to `amount` and `extended_amount` ... e.g. `1000.0`
- `extended_amount`: string(float) - Bottom-line monetary amount of the line item, as a decimal string. Equals quantity × unit_cost when extended_type is calculated, or the entered value when manual. Currently identical to `amount` and `total_amount` (Di... e.g. `1000.0`
- `unit_cost`: string(float) - Cost per unit of the described item, as a decimal string. e.g. `100.0`
- `uom`: string - Unit of measure for the described item (for example, Lbs, cubic feet). Must be a value from the company's Units of Measure list. e.g. `Lbs`
- `updated_at`: string(date-time) - Timestamp when the line item was last updated, in ISO 8601 format. e.g. `2016-09-01T21:33:54Z`
- `change_event_line_item`: object - Change event line item linked to this direct cost line item. Present only when the line item was created from a change event and the user can view change events.
  - `id`: integer - Unique identifier of the linked change event line item. e.g. `5`
  - `cost_rom`: string(float) - Rough order of magnitude (ROM) estimated cost for the change event line item, as a decimal string. e.g. `100.0`
  - `revenue_rom`: string(float) - Rough order of magnitude (ROM) estimated revenue for the change event line item, as a decimal string. e.g. `200.0`
  - `event_id`: integer - Identifier of the parent change event. e.g. `6`
  - `cost_code`: oneOf(object | object)
  - `line_item_type`: object - Cost category (line item type) assigned to the change event line item.
    - `id`: integer - Unique identifier of the line item type. e.g. `12345`
    - `name`: string - Display name of the line item type. e.g. `Equipment`
    - `code`: string - Short code for the line item type. e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Underlying category the line item type maps to. e.g. `materials`
    - `origin_data`: string - Opaque third-party payload stored with the line item type for external integrations. e.g. `OD-2398273424`
    - `origin_id`: string - Identifier of the line item type in the originating external system. Null when not synced. e.g. `ABC123`
- `wbs_code`: object
  - `id`: integer - Wbs Code ID e.g. `999`
  - `flat_code`: string - Wbs Code e.g. `01-011.CT1`
  - `description`: string - Wbs Code Description e.g. `Project Engineer.Cost Type 1`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`

Error responses: 400, 401, 403, 404, 409, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/direct_costs/{direct_cost_id}/line_items/{id}

**Delete a Direct Cost Line Item**
Delete a specified Direct Cost Line Item.
This action does not support concurrent requests. If there is an attempt to delete a Direct Cost Line Item that belongs to a Direct Cost which is being updated or deleted by another request, a 409 Conflict error will be returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `direct_cost_id` [path] integer (required) - ID of the parent Direct Cost Item.
- `id` [path] integer (required) - ID of the Direct Cost Line Item.

Response 200: OK (no body)

Error responses: 400, 401, 403, 409, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/direct_costs/sync

**Sync Direct Cost Items**
This endpoint creates or updates a batch of Direct Cost Items.
See [Using Sync Actions](/documentation/using-sync-actions) for additional information.
Note: In addition to the values documented below for the **direct_cost_type** attribute, an enum value of `subcontractor_invoice` is also allowed. To enable this feature in the Procore web application, contact [apisupport@procore.com](mailto:apisupport@procore.com).
This action does not support concurrent requests. If there is an attempt to update a Direct Cost that is being updated or deleted by another request, a 409 Conflict error will be returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `updates`: array of object (required) - An array of Direct Cost Items
  - `id`: integer - ID of the Direct Cost Item to update. Required when updating a direct cost item. e.g. `8341`
  - `currency_iso_code`: string - ISO 4217 currency code for the item amounts. Only validated and persisted when object-level multicurrency is enabled. e.g. `USD`
  - `currency_exchange_rate`: number(float) - Exchange rate used to convert the item currency to the project base currency. Only validated and persisted when object-level multicurrency is enabled. e.g. `0.65`
  - `description`: string - Free-text description of the Direct Cost Item. e.g. `Home Depot Purchase`
  - `direct_cost_date`: string(date) - Date the direct cost was incurred, in YYYY-MM-DD format. e.g. `2016-12-14`
  - `employee_id`: integer - ID of the employee (project contact) associated with the Direct Cost Item. e.g. `54672`
  - `invoice_number`: string - Unique identifier for a Direct Cost Item of type invoice. Is required only if `direct_cost_type` is set to `invoice`. e.g. `Invoice # abc123`
  - `origin_data`: string - Opaque third-party payload stored with the item for external-system integrations. Not interpreted by Procore. e.g. `OD-2398273424`
  - `origin_id`: string - Identifier of this item in the originating external system; used to correlate synced records. e.g. `23423`
  - `payment_date`: string(date) - Date the direct cost was paid, in YYYY-MM-DD format. e.g. `2017-01-13`
  - `received_date`: string(date) - Date the direct cost was received, in YYYY-MM-DD format. e.g. `2017-01-15`
  - `status`: string enum[draft, pending, revise_and_resubmit, approved] - Review/approval state of the Direct Cost Item. e.g. `approved`
  - `terms`: string - Agreed payment terms for the invoice (for example, Net 30). e.g. `Net 20`
  - `vendor_id`: integer - ID of the vendor (company contact) billed on the item. Is required only if `direct_cost_type` is set to `invoice`. e.g. `54662`
  - `direct_cost_type`: string enum[invoice, expense, payroll] - Category of the Direct Cost Item. Can only be set when creating an item and is required on create; it cannot be changed on update. e.g. `invoice`

Response 200 (application/json): object

- `entities`: array of object
  - `id`: integer - Unique identifier of the Direct Cost Item. Use as the {id} path parameter to retrieve, update, or delete this item. e.g. `3`
  - `attachments`: array of object - Files attached to the Direct Cost Item (for example, scanned invoices or receipts).
    - `id`: integer - Unique identifier of the attachment. e.g. `5324`
    - `url`: string - Download URL for the attachment file. e.g. `http://www.example.com/`
    - `filename`: string - Original name of the attached file. e.g. `january_receipt_copy.jpg`
  - `attachments_count`: integer - Number of files attached to the Direct Cost Item. e.g. `0`
  - `created_at`: string(date-time) - Timestamp when the Direct Cost Item was created, in ISO 8601 format. e.g. `2012-10-23T21:39:40Z`
  - `deleted_at`: string(date-time) - Timestamp when the Direct Cost Item was soft-deleted, in ISO 8601 format. Null for active items. e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Free-text description of the Direct Cost Item. e.g. `Home Depot Purchase`
  - `direct_cost_type`: string enum[invoice, expense, payroll] - Category of the Direct Cost Item. e.g. `invoice`
  - `employee`: object - Employee (project contact) associated with the Direct Cost Item.
    - `id`: integer - Contact ID of the employee (references the project Contact record, not LoginInformation). e.g. `5`
    - `name`: string - Display name of the employee. e.g. `Bob the Builder`
  - `invoice_number`: string - Vendor invoice number. Present only for invoice-type items; must be unique per vendor within the tool. e.g. `ab-3456`
  - `direct_cost_date`: string(date) - Date the direct cost was incurred, in YYYY-MM-DD format. e.g. `2014-10-16`
  - `origin_data`: string - Opaque third-party payload stored with the item for external-system integrations. Not interpreted by Procore. e.g. `OD-2398273424`
  - `origin_id`: string - Identifier of this item in the originating external system; used to correlate synced records. e.g. `px-1990`
  - `grand_total`: string - Sum of all line item amounts on the Direct Cost Item, as a decimal string. e.g. `0.0`
  - `line_items_count`: integer - Number of line items on the Direct Cost Item. e.g. `0`
  - `payment_date`: string(date) - Date the direct cost was paid, in YYYY-MM-DD format. e.g. `2014-12-16`
  - `received_date`: string(date) - Date the direct cost was received, in YYYY-MM-DD format. e.g. `2014-11-16`
  - `status`: string enum[draft, pending, revise_and_resubmit, approved] - Review/approval state of the Direct Cost Item. e.g. `pending`
  - `terms`: string - Agreed payment terms for the invoice (for example, Net 30). e.g. `Net 30`
  - `updated_at`: string(date-time) - Timestamp when the Direct Cost Item was last updated, in ISO 8601 format. e.g. `2012-10-24T21:39:40Z`
  - `vendor`: object - Vendor (company contact) billed on the Direct Cost Item.
    - `id`: integer - Unique identifier of the vendor. e.g. `8`
    - `name`: string - Display name of the vendor. e.g. `Steve's Plumbing and Hardware`
  - `vendor_id`: integer - Identifier of the vendor billed on the Direct Cost Item. Required for invoice-type items. e.g. `1`
  - `vendor_name`: string - Display name of the vendor billed on the Direct Cost Item. e.g. `Steve's Plumbing and Hardware`
  - `currency_configuration`: object
    - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
    - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
    - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
  - `tax_breakdown`: object - Header-level tax rollup. Always included on the response as an object, including when Direct Cost taxes are disabled. tax_details is an empty array when no stored tax details are returned. Presence of this key does no...
    - `subtotal`: string - Sum of line-item amounts before tax e.g. `100.00`
    - `tax_total`: string - Total tax across all line items e.g. `12.00`
    - `grand_total`: string - subtotal plus tax_total e.g. `112.00`
    - `tax_details`: array of object - One entry per component tax code that produced tax on this Direct Cost
- `errors`: array of object
  - `id`: integer - ID e.g. `3`
  - `attachments`: array of object - Attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `attachments_count`: integer - Attachments count e.g. `0`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Description e.g. `Home Depot Purchase`
  - `direct_cost_type`: string enum[invoice, expense, payroll] - Type e.g. `invoice`
  - `employee`: object - Employee tied to the Direct Cost Item
    - `id`: integer - Employee ID e.g. `5`
    - `name`: string - Employee name e.g. `Bob the Builder`
  - `invoice_number`: string - Unique identifier for a Direct Cost Item of type invoice e.g. `ab-3456`
  - `direct_cost_date`: string(date) - Date e.g. `2014-10-16`
  - `origin_data`: string - Origin Data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `px-1990`
  - `grand_total`: string - Grand total e.g. `0.0`
  - `line_items_count`: integer - Line Items count e.g. `0`
  - `payment_date`: string(date) - Payment Date e.g. `2014-12-16`
  - `received_date`: string(date) - Received Date e.g. `2014-11-16`
  - `status`: string enum[draft, pending, revise_and_resubmit, approved] - Status e.g. `pending`
  - `terms`: string - The agreed upon Terms for the date of payment e.g. `Net 30`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `vendor`: object - Vendor
    - `id`: integer - Vendor ID e.g. `8`
    - `name`: string - Vendor name e.g. `Steve's Plumbing and Hardware`
  - `vendor_id`: integer - Vendor ID e.g. `1`
  - `vendor_name`: string - Vendor name e.g. `Steve's Plumbing and Hardware`
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403, 409, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/direct_costs  **[OLDER VERSION - a newer path version exists below/above]**

**List Direct Cost Items**
Returns a list of all Direct Cost Items for a Project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.
Note: In addition to the values documented below for the **direct_cost_type** attribute, an enum value of `subcontractor_invoice` is also allowed. To enable this feature in the Procore web application, contact [apisupport@procore.com](mailto:apisupport@procore.com).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.
- `filters[invoice_number]` [query] string - Returns item(s) with the specified Invoice Number.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[payment_date]` [query] string - Returns item(s) with a payment date within the specified ISO 8601 datetime range.
- `filters[received_date]` [query] string - Returns item(s) with a received date within the specified ISO 8601 datetime range.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the Direct Cost Item. Use as the {id} path parameter to retrieve, update, or delete this item. e.g. `1`
- `amount`: string - Grand total of the Direct Cost Item, as a decimal string. For backwards compatibility this mirrors grand_total. e.g. `0.0`
- `created_at`: string(date-time) - Timestamp when the Direct Cost Item was created, in ISO 8601 format. e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the Direct Cost Item was soft-deleted, in ISO 8601 format. Null for active items. e.g. `2017-07-29T21:39:40Z`
- `description`: string - Free-text description of the Direct Cost Item. e.g. `Home Depot Purchase`
- `direct_cost_type`: string enum[invoice, expense, payroll] - Category of the Direct Cost Item. e.g. `invoice`
- `direct_cost_date`: string(date) - Date the direct cost was incurred, in YYYY-MM-DD format. e.g. `2016-12-14`
- `grand_total`: string - Sum of all line item amounts on the Direct Cost Item, as a decimal string. e.g. `0.0`
- `invoice_number`: string - Vendor invoice number. Present only for invoice-type items; must be unique per vendor within the tool. e.g. `ab-3456`
- `origin_data`: string - Opaque third-party payload stored with the item for external-system integrations. Not interpreted by Procore. e.g. `OD-2398273424`
- `origin_id`: string - Identifier of this item in the originating external system; used to correlate synced records. e.g. `px-1990`
- `payment_date`: string(date) - Date the direct cost was paid, in YYYY-MM-DD format. e.g. `2014-12-16`
- `received_date`: string(date) - Date the direct cost was received, in YYYY-MM-DD format. e.g. `2014-11-16`
- `status`: string enum[draft, pending, revise_and_resubmit, approved] - Review/approval state of the Direct Cost Item. e.g. `pending`
- `terms`: string - Agreed payment terms for the invoice (for example, Net 30). e.g. `Net 30`
- `updated_at`: string(date-time) - Timestamp when the Direct Cost Item was last updated, in ISO 8601 format. e.g. `2012-10-24T21:39:40Z`
- `vendor`: string - Display name of the vendor billed on the Direct Cost Item. e.g. `Steve's Plumbing and Hardware`
- `vendor_id`: integer - Identifier of the vendor billed on the Direct Cost Item. Required for invoice-type items. e.g. `1`
- `vendor_name`: string - Display name of the vendor billed on the Direct Cost Item. e.g. `Steve's Plumbing and Hardware`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `tax_breakdown`: object - Header-level tax rollup. Always included on the response as an object, including when Direct Cost taxes are disabled. tax_details is an empty array when no stored tax details are returned. Presence of this key does no...
  - `subtotal`: string - Sum of line-item amounts before tax e.g. `100.00`
  - `tax_total`: string - Total tax across all line items e.g. `12.00`
  - `grand_total`: string - subtotal plus tax_total e.g. `112.00`
  - `tax_details`: array of object - One entry per component tax code that produced tax on this Direct Cost
    - `tax_code_id`: integer - Component tax code that produced this amount e.g. `90`
    - `tax_code_name`: string - Tax code name for tax_code_id e.g. `GST-TEST-COMP`
    - `tax_code_rate`: string - Effective rate as a percentage e.g. `5.0`
    - `amount`: string - Tax amount for this component, summed across line items e.g. `5.00`
    - `taxable_amount`: string - Taxable basis this component was applied against e.g. `100.00`
    - `selected_tax_code_id`: integer - Tax code selected on the line item e.g. `93`
    - `selected_tax_code_name`: string - Tax code name for selected_tax_code_id e.g. `GRP-TEST`
- `employee`: object - Employee (project contact) associated with the Direct Cost Item.
  - `id`: integer - Contact ID of the employee (references the project Contact record, not LoginInformation). e.g. `5`
  - `name`: string - Display name of the employee. e.g. `Bob the Builder`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/direct_costs  **[OLDER VERSION - a newer path version exists below/above]**

**Create Direct Cost Item**
Create a new Direct Cost Item in the specified Project.
Note: In addition to the values documented below for the **direct_cost_type** attribute, an enum value of `subcontractor_invoice` is also allowed. To enable this feature in the Procore web application, contact [apisupport@procore.com](mailto:apisupport@procore.com).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `attachments`: array of string - Direct Cost Item attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
- `item`: object (required) - Direct Cost Item object
  - `description`: string - Free-text description of the Direct Cost Item. e.g. `Invoice for April`
  - `direct_cost_date`: string(date) - Date the direct cost was incurred, in YYYY-MM-DD format. e.g. `2016-12-14`
  - `employee_id`: integer - ID of the employee (project contact) associated with the Direct Cost Item. e.g. `43223`
  - `invoice_number`: string (required) - Unique identifier for a Direct Cost Item of type invoice. Is required only if `direct_cost_type` is set to `invoice`. e.g. `Invoice # abc123`
  - `origin_data`: string - Opaque third-party payload stored with the item for external-system integrations. Not interpreted by Procore. e.g. `OD-2398273424`
  - `origin_id`: string - Identifier of this item in the originating external system; used to correlate synced records. e.g. `23423`
  - `payment_date`: string(date) - Date the direct cost was paid, in YYYY-MM-DD format. e.g. `2017-01-10`
  - `received_date`: string(date) - Date the direct cost was received, in YYYY-MM-DD format. e.g. `2017-01-08`
  - `status`: string enum[draft, pending, revise_and_resubmit, approved] - Review/approval state of the Direct Cost Item. e.g. `approved`
  - `terms`: string - Agreed payment terms for the invoice (for example, Net 30). e.g. `Net 50`
  - `vendor_id`: integer (required) - ID of the vendor (company contact) billed on the Direct Cost Item. Required when direct_cost_type is `invoice`. e.g. `23423`
  - `direct_cost_type`: string enum[invoice, expense, payroll] (required) - Category of the Direct Cost Item. e.g. `invoice`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the Direct Cost Item. Use as the {id} path parameter to retrieve, update, or delete this item. e.g. `3`
- `attachments`: array of object - Files attached to the Direct Cost Item (for example, scanned invoices or receipts).
  - `id`: integer - Unique identifier of the attachment. e.g. `5324`
  - `url`: string - Download URL for the attachment file. e.g. `http://www.example.com/`
  - `filename`: string - Original name of the attached file. e.g. `january_receipt_copy.jpg`
- `attachments_count`: integer - Number of files attached to the Direct Cost Item. e.g. `0`
- `created_at`: string(date-time) - Timestamp when the Direct Cost Item was created, in ISO 8601 format. e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the Direct Cost Item was soft-deleted, in ISO 8601 format. Null for active items. e.g. `2017-07-29T21:39:40Z`
- `description`: string - Free-text description of the Direct Cost Item. e.g. `Home Depot Purchase`
- `direct_cost_type`: string enum[invoice, expense, payroll] - Category of the Direct Cost Item. e.g. `invoice`
- `employee`: object - Employee (project contact) associated with the Direct Cost Item.
  - `id`: integer - Contact ID of the employee (references the project Contact record, not LoginInformation). e.g. `5`
  - `name`: string - Display name of the employee. e.g. `Bob the Builder`
- `invoice_number`: string - Vendor invoice number. Present only for invoice-type items; must be unique per vendor within the tool. e.g. `ab-3456`
- `direct_cost_date`: string(date) - Date the direct cost was incurred, in YYYY-MM-DD format. e.g. `2014-10-16`
- `origin_data`: string - Opaque third-party payload stored with the item for external-system integrations. Not interpreted by Procore. e.g. `OD-2398273424`
- `origin_id`: string - Identifier of this item in the originating external system; used to correlate synced records. e.g. `px-1990`
- `grand_total`: string - Sum of all line item amounts on the Direct Cost Item, as a decimal string. e.g. `0.0`
- `line_items_count`: integer - Number of line items on the Direct Cost Item. e.g. `0`
- `payment_date`: string(date) - Date the direct cost was paid, in YYYY-MM-DD format. e.g. `2014-12-16`
- `received_date`: string(date) - Date the direct cost was received, in YYYY-MM-DD format. e.g. `2014-11-16`
- `status`: string enum[draft, pending, revise_and_resubmit, approved] - Review/approval state of the Direct Cost Item. e.g. `pending`
- `terms`: string - Agreed payment terms for the invoice (for example, Net 30). e.g. `Net 30`
- `updated_at`: string(date-time) - Timestamp when the Direct Cost Item was last updated, in ISO 8601 format. e.g. `2012-10-24T21:39:40Z`
- `vendor`: object - Vendor (company contact) billed on the Direct Cost Item.
  - `id`: integer - Unique identifier of the vendor. e.g. `8`
  - `name`: string - Display name of the vendor. e.g. `Steve's Plumbing and Hardware`
- `vendor_id`: integer - Identifier of the vendor billed on the Direct Cost Item. Required for invoice-type items. e.g. `1`
- `vendor_name`: string - Display name of the vendor billed on the Direct Cost Item. e.g. `Steve's Plumbing and Hardware`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `tax_breakdown`: object - Header-level tax rollup. Always included on the response as an object, including when Direct Cost taxes are disabled. tax_details is an empty array when no stored tax details are returned. Presence of this key does no...
  - `subtotal`: string - Sum of line-item amounts before tax e.g. `100.00`
  - `tax_total`: string - Total tax across all line items e.g. `12.00`
  - `grand_total`: string - subtotal plus tax_total e.g. `112.00`
  - `tax_details`: array of object - One entry per component tax code that produced tax on this Direct Cost
    - `tax_code_id`: integer - Component tax code that produced this amount e.g. `90`
    - `tax_code_name`: string - Tax code name for tax_code_id e.g. `GST-TEST-COMP`
    - `tax_code_rate`: string - Effective rate as a percentage e.g. `5.0`
    - `amount`: string - Tax amount for this component, summed across line items e.g. `5.00`
    - `taxable_amount`: string - Taxable basis this component was applied against e.g. `100.00`
    - `selected_tax_code_id`: integer - Tax code selected on the line item e.g. `93`
    - `selected_tax_code_name`: string - Tax code name for selected_tax_code_id e.g. `GRP-TEST`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/direct_costs/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Show Direct Cost Item**
Show detail on specified Direct Cost Item.
Note: In addition to the values documented below for the **direct_cost_type** attribute, an enum value of `subcontractor_invoice` is also allowed. To enable this feature in the Procore web application, contact [apisupport@procore.com](mailto:apisupport@procore.com).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Direct Cost Item.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Direct Cost Item. Use as the {id} path parameter to retrieve, update, or delete this item. e.g. `3`
- `attachments`: array of object - Files attached to the Direct Cost Item (for example, scanned invoices or receipts).
  - `id`: integer - Unique identifier of the attachment. e.g. `5324`
  - `url`: string - Download URL for the attachment file. e.g. `http://www.example.com/`
  - `filename`: string - Original name of the attached file. e.g. `january_receipt_copy.jpg`
- `attachments_count`: integer - Number of files attached to the Direct Cost Item. e.g. `0`
- `created_at`: string(date-time) - Timestamp when the Direct Cost Item was created, in ISO 8601 format. e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the Direct Cost Item was soft-deleted, in ISO 8601 format. Null for active items. e.g. `2017-07-29T21:39:40Z`
- `description`: string - Free-text description of the Direct Cost Item. e.g. `Home Depot Purchase`
- `direct_cost_type`: string enum[invoice, expense, payroll] - Category of the Direct Cost Item. e.g. `invoice`
- `employee`: object - Employee (project contact) associated with the Direct Cost Item.
  - `id`: integer - Contact ID of the employee (references the project Contact record, not LoginInformation). e.g. `5`
  - `name`: string - Display name of the employee. e.g. `Bob the Builder`
- `invoice_number`: string - Vendor invoice number. Present only for invoice-type items; must be unique per vendor within the tool. e.g. `ab-3456`
- `direct_cost_date`: string(date) - Date the direct cost was incurred, in YYYY-MM-DD format. e.g. `2014-10-16`
- `origin_data`: string - Opaque third-party payload stored with the item for external-system integrations. Not interpreted by Procore. e.g. `OD-2398273424`
- `origin_id`: string - Identifier of this item in the originating external system; used to correlate synced records. e.g. `px-1990`
- `grand_total`: string - Sum of all line item amounts on the Direct Cost Item, as a decimal string. e.g. `0.0`
- `line_items_count`: integer - Number of line items on the Direct Cost Item. e.g. `0`
- `payment_date`: string(date) - Date the direct cost was paid, in YYYY-MM-DD format. e.g. `2014-12-16`
- `received_date`: string(date) - Date the direct cost was received, in YYYY-MM-DD format. e.g. `2014-11-16`
- `status`: string enum[draft, pending, revise_and_resubmit, approved] - Review/approval state of the Direct Cost Item. e.g. `pending`
- `terms`: string - Agreed payment terms for the invoice (for example, Net 30). e.g. `Net 30`
- `updated_at`: string(date-time) - Timestamp when the Direct Cost Item was last updated, in ISO 8601 format. e.g. `2012-10-24T21:39:40Z`
- `vendor`: object - Vendor (company contact) billed on the Direct Cost Item.
  - `id`: integer - Unique identifier of the vendor. e.g. `8`
  - `name`: string - Display name of the vendor. e.g. `Steve's Plumbing and Hardware`
- `vendor_id`: integer - Identifier of the vendor billed on the Direct Cost Item. Required for invoice-type items. e.g. `1`
- `vendor_name`: string - Display name of the vendor billed on the Direct Cost Item. e.g. `Steve's Plumbing and Hardware`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `tax_breakdown`: object - Header-level tax rollup. Always included on the response as an object, including when Direct Cost taxes are disabled. tax_details is an empty array when no stored tax details are returned. Presence of this key does no...
  - `subtotal`: string - Sum of line-item amounts before tax e.g. `100.00`
  - `tax_total`: string - Total tax across all line items e.g. `12.00`
  - `grand_total`: string - subtotal plus tax_total e.g. `112.00`
  - `tax_details`: array of object - One entry per component tax code that produced tax on this Direct Cost
    - `tax_code_id`: integer - Component tax code that produced this amount e.g. `90`
    - `tax_code_name`: string - Tax code name for tax_code_id e.g. `GST-TEST-COMP`
    - `tax_code_rate`: string - Effective rate as a percentage e.g. `5.0`
    - `amount`: string - Tax amount for this component, summed across line items e.g. `5.00`
    - `taxable_amount`: string - Taxable basis this component was applied against e.g. `100.00`
    - `selected_tax_code_id`: integer - Tax code selected on the line item e.g. `93`
    - `selected_tax_code_name`: string - Tax code name for selected_tax_code_id e.g. `GRP-TEST`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/direct_costs/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Update Direct Cost Item**
Update a specific Direct Cost Item.
This action does not support concurrent requests. If there is an attempt to update a Direct Cost that is being updated or deleted by another request, a 409 Conflict error will be returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Direct Cost Item.

Request body (application/json) (required):

- `attachments`: array of string - Direct Cost Item attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
- `item`: object - Direct Cost Item object
  - `description`: string - Free-text description of the Direct Cost Item. e.g. `Home Depot Purchase`
  - `employee_id`: integer - ID of the employee (project contact) associated with the Direct Cost Item. e.g. `14522`
  - `invoice_number`: string - Vendor invoice number. Applies only to invoice-type items; must be unique per vendor within the tool. e.g. `Invoice # abc123`
  - `direct_cost_date`: string(date) - Date the direct cost was incurred, in YYYY-MM-DD format. e.g. `2016-12-14`
  - `origin_data`: string - Opaque third-party payload stored with the item for external-system integrations. Not interpreted by Procore. e.g. `OD-2398273424`
  - `origin_id`: string - Identifier of this item in the originating external system; used to correlate synced records. e.g. `43232`
  - `payment_date`: string(date) - Date the direct cost was paid, in YYYY-MM-DD format. e.g. `2017-01-05`
  - `received_date`: string(date) - Date the direct cost was received, in YYYY-MM-DD format. e.g. `2017-01-10`
  - `status`: string enum[draft, pending, revise_and_resubmit, approved] - Review/approval state of the Direct Cost Item. e.g. `approved`
  - `terms`: string - Agreed payment terms for the invoice (for example, Net 30). e.g. `Net 30`
  - `vendor_id`: integer - ID of the vendor (company contact) billed on the Direct Cost Item. e.g. `43122`

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Direct Cost Item. Use as the {id} path parameter to retrieve, update, or delete this item. e.g. `3`
- `attachments`: array of object - Files attached to the Direct Cost Item (for example, scanned invoices or receipts).
  - `id`: integer - Unique identifier of the attachment. e.g. `5324`
  - `url`: string - Download URL for the attachment file. e.g. `http://www.example.com/`
  - `filename`: string - Original name of the attached file. e.g. `january_receipt_copy.jpg`
- `attachments_count`: integer - Number of files attached to the Direct Cost Item. e.g. `0`
- `created_at`: string(date-time) - Timestamp when the Direct Cost Item was created, in ISO 8601 format. e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the Direct Cost Item was soft-deleted, in ISO 8601 format. Null for active items. e.g. `2017-07-29T21:39:40Z`
- `description`: string - Free-text description of the Direct Cost Item. e.g. `Home Depot Purchase`
- `direct_cost_type`: string enum[invoice, expense, payroll] - Category of the Direct Cost Item. e.g. `invoice`
- `employee`: object - Employee (project contact) associated with the Direct Cost Item.
  - `id`: integer - Contact ID of the employee (references the project Contact record, not LoginInformation). e.g. `5`
  - `name`: string - Display name of the employee. e.g. `Bob the Builder`
- `invoice_number`: string - Vendor invoice number. Present only for invoice-type items; must be unique per vendor within the tool. e.g. `ab-3456`
- `direct_cost_date`: string(date) - Date the direct cost was incurred, in YYYY-MM-DD format. e.g. `2014-10-16`
- `origin_data`: string - Opaque third-party payload stored with the item for external-system integrations. Not interpreted by Procore. e.g. `OD-2398273424`
- `origin_id`: string - Identifier of this item in the originating external system; used to correlate synced records. e.g. `px-1990`
- `grand_total`: string - Sum of all line item amounts on the Direct Cost Item, as a decimal string. e.g. `0.0`
- `line_items_count`: integer - Number of line items on the Direct Cost Item. e.g. `0`
- `payment_date`: string(date) - Date the direct cost was paid, in YYYY-MM-DD format. e.g. `2014-12-16`
- `received_date`: string(date) - Date the direct cost was received, in YYYY-MM-DD format. e.g. `2014-11-16`
- `status`: string enum[draft, pending, revise_and_resubmit, approved] - Review/approval state of the Direct Cost Item. e.g. `pending`
- `terms`: string - Agreed payment terms for the invoice (for example, Net 30). e.g. `Net 30`
- `updated_at`: string(date-time) - Timestamp when the Direct Cost Item was last updated, in ISO 8601 format. e.g. `2012-10-24T21:39:40Z`
- `vendor`: object - Vendor (company contact) billed on the Direct Cost Item.
  - `id`: integer - Unique identifier of the vendor. e.g. `8`
  - `name`: string - Display name of the vendor. e.g. `Steve's Plumbing and Hardware`
- `vendor_id`: integer - Identifier of the vendor billed on the Direct Cost Item. Required for invoice-type items. e.g. `1`
- `vendor_name`: string - Display name of the vendor billed on the Direct Cost Item. e.g. `Steve's Plumbing and Hardware`
- `currency_configuration`: object
  - `base_currency_iso_code`: string - Base Currency ISO Code configured from project level; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `USD`
  - `currency_iso_code`: string - Currency ISO Code configured for the financial entity e.g. `EUR`
  - `currency_exchange_rate`: string - Exchange Rate from currency_iso_code to base_currency_iso_code; It'll be populated only when multicurrency phase two feature flag is enabled e.g. `1.5`
- `tax_breakdown`: object - Header-level tax rollup. Always included on the response as an object, including when Direct Cost taxes are disabled. tax_details is an empty array when no stored tax details are returned. Presence of this key does no...
  - `subtotal`: string - Sum of line-item amounts before tax e.g. `100.00`
  - `tax_total`: string - Total tax across all line items e.g. `12.00`
  - `grand_total`: string - subtotal plus tax_total e.g. `112.00`
  - `tax_details`: array of object - One entry per component tax code that produced tax on this Direct Cost
    - `tax_code_id`: integer - Component tax code that produced this amount e.g. `90`
    - `tax_code_name`: string - Tax code name for tax_code_id e.g. `GST-TEST-COMP`
    - `tax_code_rate`: string - Effective rate as a percentage e.g. `5.0`
    - `amount`: string - Tax amount for this component, summed across line items e.g. `5.00`
    - `taxable_amount`: string - Taxable basis this component was applied against e.g. `100.00`
    - `selected_tax_code_id`: integer - Tax code selected on the line item e.g. `93`
    - `selected_tax_code_name`: string - Tax code name for selected_tax_code_id e.g. `GRP-TEST`

Error responses: 400, 401, 403, 409, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/direct_costs/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Delete Direct Cost Item**
Delete a specific Direct Cost Item and its Line Items.
This action does not support concurrent requests. If there is an attempt to update a Direct Cost that is being updated or deleted by another request, a 409 Conflict error will be returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Direct Cost Item.

Response 200 (application/json): object

- `id`: integer - ID of the deleted Direct Cost Item. e.g. `1`

Error responses: 400, 403, 404, 409, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

