# Procore API: Invoices (Construction Financials)

Source: https://developers.procore.com/reference/rest/ (tool category: Invoices)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Invoicing Async Jobs](#invoicing-async-jobs) - versions 1.0
- [Lien Waivers](#lien-waivers) - versions 1.0
- [Payment Readiness Manual Holds](#payment-readiness-manual-holds) - versions 1.0
- [Requisition Line Item Payment Application Associations](#requisition-line-item-payment-application-associations) - versions 2.0

## Invoicing Async Jobs

Resource id: `invoicing-async-jobs`. Raw spec: `../openapi-raw/invoicing-async-jobs.json`. Web: https://developers.procore.com/reference/rest/invoicing-async-jobs?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/companies/{company_id}/invoices/async_jobs/{uuid}  **[BETA]**

**Show an Async Job for a Company**
Return detailed information about a specified Async Job.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `uuid` [path] string (required) - UUID of the Async Job
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `uuid`: string - Unique identifier for the async job. Use as the {uuid} path parameter to poll this endpoint for the job's current status and result. e.g. `329e09cc-315b-42c8-9ffe-4a328017f747`
- `company_id`: integer - ID of the company that owns this async job. e.g. `2`
- `created_by_id`: integer - ID of the user who initiated the async job. e.g. `3`
- `status`: string enum[pending, in_progress, completed, failed] - Current lifecycle state of the async job. Poll this endpoint until the status is `completed` or `failed`; `result` is populated once the job succeeds. e.g. `completed`
- `result`: oneOf(object) - Payload produced by the async job. Populated only after the job reaches `completed`; null while the job is pending, in progress, or failed. Shape depends on the job type.
- `created_at`: string(date-time) - Timestamp when the async job was created, in ISO 8601 format. e.g. `2016-10-25T17:53:35Z`
- `updated_at`: string(date-time) - Timestamp of the most recent update to the async job, in ISO 8601 format. Advances as the job transitions between statuses. e.g. `2015-11-12T21:26:28Z`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Lien Waivers

Resource id: `lien-waivers`. Raw spec: `../openapi-raw/lien-waivers.json`. Web: https://developers.procore.com/reference/rest/lien-waivers?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/projects/{project_id}/lien_waivers

**List Lien Waivers**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `invoice_id` [query] integer (required) - Unique identifier of the invoice to retrieve lien waivers for

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the lien waiver. Use as the {id} path parameter to delete the waiver via DELETE /rest/v1.0/projects/{project_id}/lien_waivers/{id}. e.g. `12345`
- `company_id`: integer - ID of the company that owns this lien waiver. e.g. `54321`
- `project_id`: integer - ID of the project this lien waiver belongs to. Matches the {project_id} path parameter used to list and manage waivers. e.g. `1234`
- `invoice_id`: integer - ID of the invoice this lien waiver is associated with. Pass as the invoice_id query parameter when listing or managing an invoice's waivers. e.g. `5678`
- `status`: string enum[awaiting_signature, complete, cancelled, draft] - Current signing status of the lien waiver. e.g. `awaiting_signature`
- `type`: string enum[conditional_progress, unconditional_progress, conditional_final, unconditional_final] - Classification of the lien waiver, combining its condition (conditional vs. unconditional) and billing stage (progress vs. final). e.g. `conditional_progress`
- `waiver_date`: string(date) - Date the lien waiver was issued, in ISO 8601 date format (YYYY-MM-DD). e.g. `2019-09-20`
- `updated_at`: string(date-time) - Timestamp when the lien waiver was last updated, in ISO 8601 format. Null if the waiver has not been updated since creation. e.g. `2019-09-20T12:42:00Z`
- `waiver_created`: string(date-time) - Timestamp when the lien waiver was created, in ISO 8601 format. Null if unavailable. e.g. `2019-09-20T12:42:00Z`
- `locked`: boolean - Whether the signed lien waiver is locked from the general contractor's view. Unconditional waivers remain locked until released via the unlock endpoint. e.g. `true`
- `last_unlock_request`: object
  - `user_name`: string - Full name of who requested the unlock e.g. `John Smith`
  - `requested_at`: string(date-time) - When the unlock was requested e.g. `2019-09-20T12:42:00Z`
- `last_sign_request`: object - Metadata about the most recent sign request for the waiver, or null when no sign request exists
  - `user_name`: string - Full name of who requested the signature e.g. `John Smith`
  - `requested_at`: string(date-time) - When the sign request was sent e.g. `2019-09-20T12:42:00Z`
- `unlocker`: object
  - `user_name`: string - Full name of who unlocked the waiver e.g. `John Smith`
  - `requested_at`: string(date-time) - When the waiver was unlocked e.g. `2019-09-20T12:42:00Z`
- `sign_url`: string - URL a user can open to sign the lien waiver outside of an iframe context. Empty string unless the requesting user is an invoice contact. e.g. `signme.procore.com`
- `iframe_sign_url`: string - URL a user can open to sign the lien waiver inside an iframe context. Empty string unless the requesting user is an invoice contact. e.g. `signme.procore.com`
- `pdf_url`: string - URL of the current lien waiver PDF document. e.g. `pdf.procore.com`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Payment Readiness Manual Holds

Resource id: `payment-readiness-manual-holds`. Raw spec: `../openapi-raw/payment-readiness-manual-holds.json`. Web: https://developers.procore.com/reference/rest/payment-readiness-manual-holds?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/projects/{project_id}/payment_readiness/manual_holds

**List manual holds for a given invoice**
Return a list of all manual holds for a given invoice

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `invoice_id` [query] integer (required) - Unique identifier of the invoice to retrieve manual holds

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the manual hold. Use as the {id} path parameter to update it via PATCH /rest/v1.0/projects/{project_id}/payment_readiness/manual_holds/{id}. e.g. `1`
- `status`: string - Whether the manual hold is currently applied to (blocking payment on) or released from the invoice or vendor. Either 'applied' or 'released'. e.g. `applied`
- `description`: string - Free-text explanation of why the manual hold was placed. e.g. `description`
- `created_by`: string - Full name of the user who created the manual hold. e.g. `John Doe`
- `created_at`: string(date-time) - Timestamp when the manual hold was created, in ISO 8601 format. e.g. `2012-10-23T21:39:40Z`
- `updated_by`: string - Full name of the user who last updated the manual hold. e.g. `Jane Doe`
- `updated_at`: string(date-time) - Timestamp when the manual hold was last updated, in ISO 8601 format. e.g. `2013-10-23T21:49:40Z`
- `company_id`: integer - ID of the company that owns this manual hold. e.g. `123`
- `project_id`: integer - ID of the project this manual hold belongs to. Matches the {project_id} path parameter. e.g. `234`
- `invoice_id`: integer - ID of the invoice the hold is placed on. Required when hold_type is `invoice`. e.g. `345`
- `hold_type`: string - Scope of the hold. 'invoice' applies it to a single invoice; 'vendor' applies it to the vendor across invoices. e.g. `invoice`
- `vendor_id`: integer - ID of the vendor the hold is placed on. Required when hold_type is `vendor`. e.g. `456`
- `visible_to_vendor`: boolean - Whether the hold is visible to the vendor. When true, the vendor can see this hold. e.g. `true`
- `attachments`: array of object - Files attached to the manual hold, such as supporting documentation.
  - `id`: integer - Unique identifier of the attachment. e.g. `5324`
  - `url`: string - URL to download the attached file. e.g. `http://www.example.com/`
  - `filename`: string - Original name of the attached file. e.g. `january_receipt_copy.jpg`
  - `content_type`: string - MIME type of the attached file. e.g. `image/jpeg`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/payment_readiness/manual_holds

**Create a manual hold for a given invoice**
Create a manual hold for an invoice or vendor.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `invoice_id` [query] integer - Unique identifier of the invoice. This is required if the hold_type is invoice

Request body (application/json) (required):

- `manual_hold`: object (required)
  - `status`: string - State of the hold. Either 'applied' or 'released'. e.g. `applied`
  - `description`: string - Free-text explanation of why the hold is being placed. e.g. `Awaiting insurance documentation`
  - `hold_type`: string - Scope of the hold. 'invoice' applies it to a single invoice; 'vendor' applies it to the vendor across invoices. e.g. `invoice`
  - `vendor_id`: integer - ID of the vendor the hold applies to. Required when hold_type is 'vendor'. e.g. `456`
  - `visible_to_vendor`: boolean - When true, the hold is visible to the vendor. e.g. `true`
  - `prostore_file_ids`: array of integer - IDs of uploaded files to attach to the manual hold as supporting documentation. e.g. `[5324, 5325]`

Response 200 (application/json): object

- `id`: integer - Unique identifier of the manual hold. Use as the {id} path parameter to update it via PATCH /rest/v1.0/projects/{project_id}/payment_readiness/manual_holds/{id}. e.g. `1`
- `status`: string - Whether the manual hold is currently applied to (blocking payment on) or released from the invoice or vendor. Either 'applied' or 'released'. e.g. `applied`
- `description`: string - Free-text explanation of why the manual hold was placed. e.g. `description`
- `created_by`: string - Full name of the user who created the manual hold. e.g. `John Doe`
- `created_at`: string(date-time) - Timestamp when the manual hold was created, in ISO 8601 format. e.g. `2012-10-23T21:39:40Z`
- `updated_by`: string - Full name of the user who last updated the manual hold. e.g. `Jane Doe`
- `updated_at`: string(date-time) - Timestamp when the manual hold was last updated, in ISO 8601 format. e.g. `2013-10-23T21:49:40Z`
- `company_id`: integer - ID of the company that owns this manual hold. e.g. `123`
- `project_id`: integer - ID of the project this manual hold belongs to. Matches the {project_id} path parameter. e.g. `234`
- `invoice_id`: integer - ID of the invoice the hold is placed on. Required when hold_type is `invoice`. e.g. `345`
- `hold_type`: string - Scope of the hold. 'invoice' applies it to a single invoice; 'vendor' applies it to the vendor across invoices. e.g. `invoice`
- `vendor_id`: integer - ID of the vendor the hold is placed on. Required when hold_type is `vendor`. e.g. `456`
- `visible_to_vendor`: boolean - Whether the hold is visible to the vendor. When true, the vendor can see this hold. e.g. `true`
- `attachments`: array of object - Files attached to the manual hold, such as supporting documentation.
  - `id`: integer - Unique identifier of the attachment. e.g. `5324`
  - `url`: string - URL to download the attached file. e.g. `http://www.example.com/`
  - `filename`: string - Original name of the attached file. e.g. `january_receipt_copy.jpg`
  - `content_type`: string - MIME type of the attached file. e.g. `image/jpeg`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/payment_readiness/manual_holds/{id}

**Update a manual hold**
Update a manual hold with the ID specified in the URL

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Manual Hold ID
- `project_id` [path] integer (required) - Unique identifier for the project.
- `invoice_id` [query] integer (required) - Unique identifier of the invoice

Request body (application/json) (required):

- `manual_hold`: object (required)
  - `status`: string - State of the hold. Either 'applied' or 'released'. e.g. `released`
  - `description`: string - Free-text explanation of why the hold is being placed or updated. e.g. `Awaiting insurance documentation`
  - `hold_type`: string - Scope of the hold. 'invoice' applies it to a single invoice; 'vendor' applies it to the vendor across invoices. e.g. `invoice`
  - `vendor_id`: integer - ID of the vendor the hold applies to. Required when hold_type is 'vendor'. e.g. `456`
  - `visible_to_vendor`: boolean - When true, the hold is visible to the vendor. e.g. `true`
  - `prostore_file_ids`: array of integer - IDs of uploaded files to attach to the manual hold as supporting documentation. e.g. `[5324, 5325]`

Response 200 (application/json): object

- `id`: integer - Unique identifier of the manual hold. Use as the {id} path parameter to update it via PATCH /rest/v1.0/projects/{project_id}/payment_readiness/manual_holds/{id}. e.g. `1`
- `status`: string - Whether the manual hold is currently applied to (blocking payment on) or released from the invoice or vendor. Either 'applied' or 'released'. e.g. `applied`
- `description`: string - Free-text explanation of why the manual hold was placed. e.g. `description`
- `created_by`: string - Full name of the user who created the manual hold. e.g. `John Doe`
- `created_at`: string(date-time) - Timestamp when the manual hold was created, in ISO 8601 format. e.g. `2012-10-23T21:39:40Z`
- `updated_by`: string - Full name of the user who last updated the manual hold. e.g. `Jane Doe`
- `updated_at`: string(date-time) - Timestamp when the manual hold was last updated, in ISO 8601 format. e.g. `2013-10-23T21:49:40Z`
- `company_id`: integer - ID of the company that owns this manual hold. e.g. `123`
- `project_id`: integer - ID of the project this manual hold belongs to. Matches the {project_id} path parameter. e.g. `234`
- `invoice_id`: integer - ID of the invoice the hold is placed on. Required when hold_type is `invoice`. e.g. `345`
- `hold_type`: string - Scope of the hold. 'invoice' applies it to a single invoice; 'vendor' applies it to the vendor across invoices. e.g. `invoice`
- `vendor_id`: integer - ID of the vendor the hold is placed on. Required when hold_type is `vendor`. e.g. `456`
- `visible_to_vendor`: boolean - Whether the hold is visible to the vendor. When true, the vendor can see this hold. e.g. `true`
- `attachments`: array of object - Files attached to the manual hold, such as supporting documentation.
  - `id`: integer - Unique identifier of the attachment. e.g. `5324`
  - `url`: string - URL to download the attached file. e.g. `http://www.example.com/`
  - `filename`: string - Original name of the attached file. e.g. `january_receipt_copy.jpg`
  - `content_type`: string - MIME type of the attached file. e.g. `image/jpeg`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Requisition Line Item Payment Application Associations

Resource id: `requisition-line-item-payment-application-associations`. Raw spec: `../openapi-raw/requisition-line-item-payment-application-associations.json`. Web: https://developers.procore.com/reference/rest/requisition-line-item-payment-application-associations?version=latest
Product lines: Invoicing

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/invoices/requisitions/{invoice_id}/line_item_payment_application_associations  **[BETA]**

**List Requisition Line Item Payment Application Associations**
Returns the owner Payment Applications that each line item of a requisition (subcontractor
invoice) was prefilled into.
Prefill v2 associations are line-item-exact: `line_item_id` is the requisition line item
(Billings Progress) id. Legacy (prefill_version != 2) associations are only known at the
requisition level and are returned with a `null` `line_item_id`, one row per associated
Payment Application.
Access mirrors the requisition line items permission: a user without commitment view receives
a 403. Payment Applications the user cannot view (prime contract permission) are omitted, so a
user with commitment view but no prime contract access receives an empty array.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `invoice_id` [path] string (required) - ID of the requisition (subcontractor invoice)
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `line_item_ids` [query] array of integer - Optional list of requisition line item (Billings Progress) ids to filter the associations by.

Response 200 (application/json): object

- `data`: array of object (required) - One entry per (line item, payment application) association.
  - `line_item_id`: string (required) - The requisition line item (Billings Progress) id the Payment Application was prefilled from. Populated for prefill v2 associations (line-item-exact) and `null` for legacy (prefill_version != 2) associations, which are... e.g. `6`
  - `item_type`: string enum[contract_item, contract_detail_item, change_order_item] (required) - The requisition item type the line item belongs to (the SOV / change-order item). `null` for legacy associations. e.g. `contract_item`
  - `item_id`: string (required) - The requisition item id (of `item_type`) the line item belongs to. `null` for legacy associations. Together with `item_type` this correlates to the line items endpoint's `requisition_item_id` / `requisition_item_type`. e.g. `42`
  - `payment_application`: object (required) - The owner Payment Application the line item was prefilled into.
    - `id`: string (required) - The Payment Application id. e.g. `1`
    - `number`: integer (required) - The Payment Application number (its sequential position within the contract). e.g. `3`
    - `url`: string (required) - Deep-link URL to the Payment Application. e.g. `https://app.procore.com/1234/project/prime_contracts/5/payment_applications/1`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

