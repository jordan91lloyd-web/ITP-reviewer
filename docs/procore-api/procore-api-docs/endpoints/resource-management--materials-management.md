# Procore API: Materials Management (Resource Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Materials Management)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Adjustments](#adjustments) - versions 2.0
- [Defects](#defects) - versions 2.0
- [InterProjectTransfers](#interprojecttransfers) - versions 2.0
- [Issuing](#issuing) - versions 2.0
- [Labels](#labels) - versions 2.0
- [MaterialRequirements](#materialrequirements) - versions 2.0
- [Materials](#materials) - versions 2.0
- [PurchaseOrders](#purchaseorders) - versions 2.0
- [Receipts](#receipts) - versions 2.0
- [RecycleBin](#recyclebin) - versions 2.0
- [Shipments](#shipments) - versions 2.0
- [Transfers](#transfers) - versions 2.0

## Adjustments

Resource id: `adjustments`. Raw spec: `../openapi-raw/adjustments.json`. Web: https://developers.procore.com/reference/rest/adjustments?version=latest
Product lines: material-management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/adjustments

**Gets a paginated list of adjustment documents.**
Returns a paginated list of adjustment documents with filtering and sorting options.
Supports multiple view types: Normal (default), Short, Compact, Extended, and Id.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[created_at]` [query] string - Date range filter. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[ids]` [query] string - Comma-separated list of adjustment GUIDs to filter by
- `filters[states]` [query] array of string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW] - Filter by document state(s)
- `filters[status]` [query] array of string enum[STARTED, IN_REVIEW, COMPLETE] - Filter by adjustment status(es)
- `filters[created_by]` [query] string - Filter by created by user ID(s)
- `filters[columns]` [query] string - Optional columns to include: created_at, properties
- `view` [query] string enum[Id, Compact, Short, Normal, Extended] - Response view type
- `sort` [query] string enum[created_at] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of string(uuid) | array of object | array of object | array of object)

Error responses: 400, 401, 403, 404, 406 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/adjustments

**Creates a new adjustment document.**
The adjustment document is created in Draft status. Line items can be added after creation or included in the initial request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `name`: string - Name of the adjustment.
- `notes`: string - Notes of the adjustment.
- `item_ids`: array of string(uuid) - Optional collection of item IDs (GUIDs) associated with the adjustment.
- `description`: string - Description of the adjustment.

Response 201 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `name`: string
  - `notes`: string
  - `created_at`: string(date-time)
  - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
  - `status`: string enum[STARTED, IN_REVIEW, COMPLETE]
  - `line_items`: array of object
    - `id`: string(uuid)
    - `line_number`: string
    - `item`: object
    - `adjustment_type`: string
    - `adjustment_reason`: string
    - `storage_location_id`: string
    - `item_condition`: string
    - `quantity`: number(double)
    - `quantity_available`: number(double)
    - `notes`: string
  - `description`: string

Error responses: 400, 401, 403, 404, 409, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/adjustments/{adjustment_id}/line_items/{id}

**Updates a line item on an adjustment document.**
Updates specific fields of an adjustment line item.
- Adjustment type determines the operation: Add to Stock or Remove from Stock.
- Storage location and item condition can be updated independently; both must be set before the adjustment can be posted to Final.
- Quantity must be greater than zero.
- Changing the adjustment type resets quantity, storage location , and item condition unless those values are also provided in the same request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `adjustment_id` [path] string(uuid) (required) - The adjustment document ID.
- `id` [path] string(uuid) (required) - The line item ID to update.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `adjustment_type`: string enum[ADD_TO_STOCK, REMOVE_FROM_STOCK]
- `adjustment_reason`: string enum[TRUE_UP, FOUND, REPAIRED, LOST, DAMAGED, STOLEN, SCRAPPED, RECYCLED]
- `storage_location_id`: string - Storage location (to location) id.
- `item_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
- `quantity`: number(double) - Quantity.
- `notes`: string - Notes for the line.

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `line_number`: string
  - `item`: object
    - `name`: string
    - `id`: string(uuid)
    - `description`: string
    - `uom`: string
  - `adjustment_type`: string enum[ADD_TO_STOCK, REMOVE_FROM_STOCK]
  - `adjustment_reason`: string enum[TRUE_UP, FOUND, REPAIRED, LOST, DAMAGED, STOLEN, SCRAPPED, RECYCLED]
  - `storage_location_id`: string
  - `item_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
  - `quantity`: number(double)
  - `quantity_available`: number(double)
  - `notes`: string

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/adjustments/{adjustment_id}/line_items/{id}

**Deletes an adjustment line item from an adjustment document.**
The adjustment document must not be in a Final state for line items to be removed.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `adjustment_id` [path] string(uuid) (required) - The adjustment document ID.
- `id` [path] string(uuid) (required) - The line item ID to delete.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `item`: object
    - `name`: string
    - `id`: string(uuid)
    - `description`: string
    - `uom`: string
  - `transfer`: object
    - `name`: string
    - `id`: string(uuid)
  - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
  - `status`: string enum[STARTED, COMPLETE]
  - `quantity`: number(double)
  - `from_location`: integer(int64)
  - `from_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
  - `to_location`: integer(int64)
  - `to_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
  - `line_number`: string
  - `labels`: array of string
  - `created_at`: string(date-time)
  - `notes`: string
  - `properties`: object
  - `adjustment_reason_id`: string
  - `adjustment_type_id`: string
  - `quantity_available`: number(double)
  - `to_project_id`: string

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/adjustments/{id}/line_items

**Gets line items for a specific adjustment document.**
Returns a paginated list of line items for the specified adjustment document.
Each line item includes item details, adjustment type, quantity, location, and condition.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The adjustment document ID.
- `filters[labels]` [query] string - Comma-separated list of labels to filter by
- `filters[adjustment_reasons]` [query] string - Comma-separated list of adjustment reasons to filter by
- `filters[columns]` [query] string - Comma-separated list of optional columns to include
- `sort` [query] string - The sort string
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `totalCount`: integer(int32)
  - `result`: array of object
    - `id`: string(uuid)
    - `line_number`: string
    - `item`: object
    - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
    - `status`: string enum[STARTED, IN_REVIEW, COMPLETE]
    - `quantity`: number(double)
    - `quantity_available`: number(double)
    - `storage_location_id`: string
    - `adjustment_type`: string enum[ADD_TO_STOCK, REMOVE_FROM_STOCK]
    - `adjustment_reason`: string enum[TRUE_UP, FOUND, REPAIRED, LOST, DAMAGED, STOLEN, SCRAPPED, RECYCLED]
    - `item_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
    - `notes`: string
    - `labels`: array of string
    - `properties`: object

Error responses: 400, 401, 403, 404, 406 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/adjustments/{id}/line_items

**Adds new line items to an existing adjustment document.**
Each line item requires an item ID, adjustment type (Add to Stock or Remove from Stock), and quantity greater than zero.
Storage location and item condition are optional at create time but both are required before the adjustment can be posted to Final.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The adjustment document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `item_id`: string(uuid) (required) - Item id.
- `adjustment_type`: string enum[ADD_TO_STOCK, REMOVE_FROM_STOCK]
- `adjustment_reason`: string enum[TRUE_UP, FOUND, REPAIRED, LOST, DAMAGED, STOLEN, SCRAPPED, RECYCLED]
- `storage_location_id`: string - Storage location (to location) id.
- `item_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
- `quantity`: number(double) - Quantity.
- `notes`: string - Notes for the line.

Response 201 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `line_number`: string
  - `item`: object
    - `name`: string
    - `id`: string(uuid)
    - `description`: string
    - `uom`: string
  - `adjustment_type`: string enum[ADD_TO_STOCK, REMOVE_FROM_STOCK]
  - `adjustment_reason`: string enum[TRUE_UP, FOUND, REPAIRED, LOST, DAMAGED, STOLEN, SCRAPPED, RECYCLED]
  - `storage_location_id`: string
  - `item_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
  - `quantity`: number(double)
  - `quantity_available`: number(double)
  - `notes`: string

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/adjustments/{id}

**Gets the header details for a specific adjustment document.**
Returns the header information for an adjustment document including status, dates, title, notes, and properties.
Supports Normal (default) and Extended view types.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The adjustment document ID.
- `view` [query] string enum[Normal, Extended] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(object | object)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/adjustments/{id}

**Updates an adjustment document header.**
Updates header fields such as title, notes, and status on the adjustment document.
Use status transitions to move the adjustment through its workflow states.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The adjustment document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `properties_to_add`: array of object - Collection of resource parameters to add to the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `properties_to_update`: array of object - Collection of resource parameters to update in the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `properties_to_delete`: array of object - Collection of resource parameters to delete from the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `name`: string - Name of the document header.
- `description`: string - Description of the document header.
- `notes`: string - Notes associated with the document header.
- `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `name`: string
  - `description`: string
  - `properties`: array of object
    - `key`: string
    - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
    - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
  - `status`: string enum[STARTED, IN_REVIEW, COMPLETE]
  - `total_line_count`: integer(int32)
  - `created_at`: string(date-time)
  - `notes`: string

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/adjustments/{id}

**Recycles an adjustment document.**
This performs a soft delete (recycle) of the adjustment document.
Recycled documents can be restored from the recycle bin by an admin user.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The adjustment document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/adjustments/{id}/comments

**Add up to 100 comments to an adjustment**
Adds one or more comments to an adjustment document.
A maximum of 100 comments can be added in a single request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Adjustment ID
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json) (required):

- array of string

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 406, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/adjustments/{id}/attachments

**Get details of attachments for an adjustment**
Returns metadata for all attachments associated with the specified adjustment document, including file name, MIME type, and download URL.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The adjustment document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/adjustments/{id}/attachments

**Adds one or more attachments to an adjustment document.**
Either provide a file_id already obtained from the File Access Service (FAS), or omit it to have FAS create a new file record. The response includes the file_id and, when FAS creates the record, an upload URL the client uses to upload the file content.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Id of the adjustment
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `file_id`: string
- `file_name`: string
- `attach_type`: string
- `description`: string

Response 200 (application/json): object

- `data`: object
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `url`: string
    - `type`: string
    - `url_expires_at`: integer(int64)
    - `status`: string

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/adjustments/{id}/attachments

**Updates an attachment for an adjustment resource.**
Updates the metadata of an existing attachment on an adjustment resource, such as its description or name.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Id of the adjustment
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `file_id`: string
- `file_name`: string
- `attach_type`: string
- `description`: string

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/adjustments/{id}/attachments

**Deletes attachment(s) from an adjustment resource.**
Removes one or more attachments from the adjustment by their file IDs.
The attachment records are removed from the database. The system attempts to delete the underlying files from storage; storage deletion failures are not surfaced to the caller.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Id of the adjustment
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- array of string

Response 200 (application/json): object

- `data`: object
  - `results`: array of object
    - `file_id`: string
    - `deleted`: boolean

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/adjustments/line_items

**Gets a paginated list of adjustment line items.**
Returns a paginated list of adjustment line items across all adjustment documents.
Supports multiple view types: Normal (default), Short, Compact, Extended, and Id.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[created_at]` [query] string - Date range filter. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[labels]` [query] string - Filter by label names
- `filters[columns]` [query] string - Optional columns to include
- `filters[adjustment_ids]` [query] string - Comma-separated list of adjustment document GUIDs to filter by
- `filters[states]` [query] array of string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW] - Filter by document state(s)
- `filters[adjustment_reasons]` [query] string - Filter by adjustment reason(s)
- `filters[status]` [query] array of string enum[STARTED, IN_REVIEW, COMPLETE] - Filter by adjustment status(es)
- `view` [query] string enum[Id, Compact, Short, Normal, Extended] - Response view type
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of string(uuid) | array of object | array of object | array of object)

Error responses: 400, 401, 403, 404, 406 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/adjustments/configure

**Get all configurable columns for adjustments.**
Returns the list of configurable columns available for the adjustment summary or line items view.
These columns can be used to customize which fields are displayed in the UI.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Summary, LineItems, Items, Locations] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `properties`: array of object
    - `name`: string
    - `type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `optional_columns`: array of object
    - `name`: string
    - `sortable`: boolean

Error responses: 400, 401, 403, 404, 406 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/adjustments/properties

**Get all properties for adjustments**
Returns the list of custom/dynamic properties defined for adjustment documents.
Properties are used to capture additional data fields beyond the standard adjustment fields.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Normal, Keys] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of object)

Error responses: 400, 401, 403, 404, 406 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/adjustments/{adjustment_id}/attachments/{id}

**Get details of an attachment for an adjustment**
Returns metadata for the specified attachment file, including file name, MIME type, and download URL.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `adjustment_id` [path] string(uuid) (required) - The adjustment document ID.
- `id` [path] string (required) - The attachment file ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/adjustments/{id}/change_history

**Get change history for an adjustment.**
Returns a paginated list of change history events for the specified adjustment document.
Each entry describes what changed, when it changed, and who made the change.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The adjustment document ID.
- `filters[activity_type]` [query] string - The activity type to filter by
- `filters[display_line_changes]` [query] boolean - Whether to display line item changes
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: array of object - The data
  - `id`: string(uuid)
  - `activity_type`: string enum[RESOURCE_UPDATED, RESOURCE_INSERTED, RESOURCE_DELETED, ATTACHMENT_ADDED, ATTACHMENT_DELETED, LABEL_ADDED, LABEL_REMOVED, PROPERTY_ADDED, PROPERTY_REMOVED, PROPERTY_UPDATED, ATTACHMENT_UPDATED, DOCUMENT_RESOLVED, ...]
  - `description`: string
  - `activity_timestamp`: string(date-time)
  - `old_data`: object
  - `new_data`: object
  - `user_id`: string

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/adjustments/{id}/properties

**Get all properties for a resource**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Resource ID
- `view` [query] string enum[Normal, Keys] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of string)

## Defects

Resource id: `defects`. Raw spec: `../openapi-raw/defects.json`. Web: https://developers.procore.com/reference/rest/defects?version=latest
Product lines: material-management

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/defects/bulk_transitions/{new_status}

**Bulk transition defects to a new status.**
Transitions multiple defect documents to the specified status in a single operation.
All specified defect IDs must belong to the same project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `new_status` [path] string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW] (required) - The new status to transition to
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `ids`: array of string(uuid)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/defects/{id}/line_items/bulk_update

**Updates a line item for a defect.**
Updates resolution_status, notes, and location_id for defect line items.
When the resolution is ADD_TO_STOCK, a location_id must be provided;
otherwise a 400 (RESOLUTION_LOCATION_NOT_SET) is returned.
When resolving a defect line with ADD_TO_STOCK resolution for a PO that originates from a commitment,
an invoice (requisition) will be created in Procore for the defect quantity.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The ID of the defect
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `line_item_guid`: string(uuid)
- `resolution_status`: string enum[UNRESOLVED, ADD_TO_STOCK, RESOLVED_WITHOUT_INVENTORY_CHANGE]
- `notes`: string
- `location_id`: string

Response 200 (application/json): object

- `data`: array of object - The data
  - `line_item_guid`: string(uuid)
  - `line_number`: string
  - `resource`: object
    - `name`: string
    - `id`: string(uuid)
    - `description`: string
    - `uom`: string
  - `condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
  - `quantity`: number(double)
  - `resolution_status`: string enum[UNRESOLVED, ADD_TO_STOCK, RESOLVED_WITHOUT_INVENTORY_CHANGE]
  - `resolved_at`: string(date-time)
  - `location_id`: string
  - `notes`: string
  - `invoice`: object
    - `created`: boolean
    - `id`: string
    - `error_codes`: array of string
    - `warnings`: array of string

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/defects/line_items/bulk_update

**Updates multiple line items for a defect.**
When resolving a defect line with ADD_TO_STOCK resolution for a PO that originates from a commitment,
an invoice (requisition) will be created in Procore for the defect quantity.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `line_item_guid`: string(uuid)
- `resolution_status`: string enum[UNRESOLVED, ADD_TO_STOCK, RESOLVED_WITHOUT_INVENTORY_CHANGE]
- `notes`: string
- `location_id`: string

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/defects/{id}/line_items/unresolve

**Un-resolves resolved line items for a defect.**
Reverses the resolution of one or more resolved defect line items, placing the material back into the
defect condition at the specified location and updating the resolution notes. A location_id is required
unless the defect line condition is Short, in which case no destination location is needed.
Only Admin users can un-resolve defect line items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The ID of the defect
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `line_item_guid`: string(uuid)
- `notes`: string
- `location_id`: string

Response 200 (application/json): object

- `data`: array of object - The data
  - `line_item_guid`: string(uuid)
  - `line_number`: string
  - `resource`: object
    - `name`: string
    - `id`: string(uuid)
    - `description`: string
    - `uom`: string
  - `condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
  - `quantity`: number(double)
  - `resolution_status`: string enum[UNRESOLVED, ADD_TO_STOCK, RESOLVED_WITHOUT_INVENTORY_CHANGE]
  - `resolved_at`: string(date-time)
  - `location_id`: string
  - `notes`: string
  - `invoice`: object
    - `created`: boolean
    - `id`: string
    - `error_codes`: array of string
    - `warnings`: array of string

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/defects/{id}/attachments

**Get details of one or more attachments for a defect resource.**
Returns the details of all attachments associated with a specific defect.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The defect ID to get attachments for
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/defects/{id}/attachments

**Adds attachments to a defect resource.**
Either provide a file_id already obtained from the File Access Service (FAS), or omit it to have FAS create a new file record. The response includes the file_id and, when FAS creates the record, an upload URL the client uses to upload the file content.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The ID of the defect
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `file_id`: string
- `file_name`: string
- `attach_type`: string
- `description`: string

Response 200 (application/json): object

- `data`: object
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `url`: string
    - `type`: string
    - `url_expires_at`: integer(int64)
    - `status`: string

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/defects/{id}/attachments

**Updates attachment for a defect resource.**
Updates the metadata of an existing attachment on a defect resource, such as its description or name.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The ID of the defect
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `file_id`: string
- `file_name`: string
- `attach_type`: string
- `description`: string

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/defects/{id}/attachments

**Deletes attachments from a defect resource.**
Removes one or more attachments from the defect by their file IDs.
The attachment records are removed from the database. The system attempts to delete the underlying files from storage; storage deletion failures are not surfaced to the caller.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The ID of the defect
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- array of string

Response 200 (application/json): object

- `data`: object
  - `results`: array of object
    - `file_id`: string
    - `deleted`: boolean

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/defects/{id}/comments

**Adds comments to a defect resource.**
Adds one or more comments to a defect document.
A maximum of 100 comments can be added in a single request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The ID of the defect
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json) (required):

- array of string

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 406, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/defects/{id}

**Get Defect Header by ID**
Returns the header details for a specific defect document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Defect ID
- `view` [query] string enum[Normal, Extended] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(object | object)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/defects/{id}

**Updates a defect resource.**
Updates header fields on a defect document such as title, notes, and status.
Use status transitions to move the defect through its workflow states.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The ID of the defect
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `properties_to_add`: array of object - Collection of resource parameters to add to the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `properties_to_update`: array of object - Collection of resource parameters to update in the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `properties_to_delete`: array of object - Collection of resource parameters to delete from the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `name`: string - Name of the document header.
- `description`: string - Description of the document header.
- `notes`: string - Notes associated with the document header.

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `name`: string
  - `description`: string
  - `total_line_count`: integer(int32)
  - `created_at`: string(date-time)
  - `status`: string enum[UNRESOLVED, RESOLVED]
  - `defect`: object
    - `name`: string
    - `id`: string(uuid)
  - `vendor`: string
  - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
  - `date_received`: string(date-time)
  - `purchase_order`: object
    - `name`: string
    - `id`: string(uuid)
  - `receipt`: object
    - `name`: string
    - `id`: string(uuid)
  - `properties`: array of object
    - `key`: string
    - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
    - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `notes`: string
  - `attachment_count`: integer(int32)
  - `invoices`: array of object
    - `created`: boolean
    - `id`: string
    - `error_codes`: array of string
    - `warnings`: array of string

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/defects

**Get all Defects**
Returns a paginated list of defects for the project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[status]` [query] array of string enum[UNRESOLVED, RESOLVED] - Filter by defect status(es)
- `filters[vendor]` [query] string - Vendor name to filter defects by
- `filters[labels]` [query] string - Comma-separated list of labels to filter defects by
- `filters[columns]` [query] string - Comma-separated list of columns to include in the response
- `filters[created_at]` [query] string - Date range filter for created_at field. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[resource_guids]` [query] string - The resource_guids filter is available only for Summary view
- `view` [query] string enum[Id, Compact, Short, Normal] - Response view type
- `per_page` [query] integer(int32) - The page size between 1 and 100. For Ids view the maximum page size is 5000.
- `filters[property_key]` [query] string - The property key for filtering
- `filters[property_value]` [query] string - The property value for filtering
- `sort` [query] string enum[created_at, audit_transaction_at] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of string(uuid) | object | object | object)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/defects/line_items

**Get all Defect Line Items**
Returns a paginated list of defect line items across all defects.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[vendor]` [query] string - Vendor name to filter defects by
- `filters[defect_id]` [query] string - Comma-separated list of resource GUIDs to filter defects by
- `filters[resolved_at]` [query] string - Date range filter for resolved date (e.g. 2025-01-01...2025-01-31)
- `filters[received_at]` [query] string - Date range filter for received date (e.g. 2025-01-01...2025-01-31)
- `view` [query] string enum[Id, Compact, Short, Normal] - Response view type
- `per_page` [query] integer(int32) - The page size between 1 and 100. For Ids view the maximum page size is 5000.
- `filters[status]` [query] array of string enum[UNRESOLVED, RESOLVED] - Filter by defect status(es)
- `filters[labels]` [query] string - Comma-separated list of labels to filter defects by
- `filters[condition]` [query] string - Comma-separated list of conditions to filter defects by
- `filters[columns]` [query] string - Comma-separated list of columns to include in the response
- `sort` [query] string enum[line_number, last_updated_at, received_at] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of string(uuid) | object | object | object)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/defects/{id}/line_items

**Get Defect Line Items by Defect ID**
Returns the line items for a specific defect document, including quantities, material details, and associated location information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Defect ID
- `filters[status]` [query] array of string enum[UNRESOLVED, RESOLVED] - Filter by defect status(es)
- `filters[labels]` [query] string - Comma-separated list of labels to filter defects by
- `filters[condition]` [query] string - Comma-separated list of conditions to filter defects by
- `filters[columns]` [query] string - Comma-separated list of columns to include in the response
- `sort` [query] string - The sort string
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `resource`: object
    - `name`: string
    - `id`: string(uuid)
    - `description`: string
    - `uom`: string
  - `condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
  - `quantity`: number(double)
  - `status`: string enum[UNRESOLVED, RESOLVED]
  - `receipt_notes`: string
  - `resolution_notes`: string
  - `storage_location`: integer(int64)
  - `labels`: array of string
  - `properties`: object
  - `resolution_decision`: string enum[UNRESOLVED, ADD_TO_STOCK, RESOLVED_WITHOUT_INVENTORY_CHANGE]
  - `line_number`: string
  - `resolved_at`: string(date-time)
  - `can_update_resolution`: boolean
  - `can_unresolve`: boolean

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/defects/{id}/details

**Get Defect by ID**
Returns the full details of a specific defect, including all header fields and associated line item information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Defect ID
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `name`: string
  - `description`: string
  - `properties`: array of object
    - `key`: string
    - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
    - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/defects/configure

**Get all configurable columns for Defects**
Returns the list of configurable columns available for defect records.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Summary, LineItems, Items, Locations] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `properties`: array of object
    - `name`: string
    - `type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `optional_columns`: array of object
    - `name`: string
    - `sortable`: boolean

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/defects/properties

**Get all properties for Defects**
Returns the list of custom property definitions available for defects.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Normal, Keys] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of object)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/defects/{defect_id}/attachments/{id}

**Get details of a single attachment for a defect resource.**
Returns the details of a single attachment on a defect.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `defect_id` [path] string(uuid) (required) - The defect ID to get the attachment for
- `id` [path] string (required) - The file ID of the attachment to retrieve
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/defects/{id}/change_history

**Gets change history for a defect.**
Returns the change history for a specific defect, including what was changed, when, and by whom.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The defect ID to find change history for
- `filters[activity_type]` [query] string - The activity type to filter by
- `filters[display_line_changes]` [query] boolean - Whether to display line item changes
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `activity_type`: string enum[RESOURCE_UPDATED, RESOURCE_INSERTED, RESOURCE_DELETED, ATTACHMENT_ADDED, ATTACHMENT_DELETED, LABEL_ADDED, LABEL_REMOVED, PROPERTY_ADDED, PROPERTY_REMOVED, PROPERTY_UPDATED, ATTACHMENT_UPDATED, DOCUMENT_RESOLVED, ...]
  - `description`: string
  - `activity_timestamp`: string(date-time)
  - `old_data`: object
  - `new_data`: object
  - `user_id`: string

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/defects/{id}/related_documents

**Gets related documents for a defect.**
Returns a list of documents related to a specific defect, such as needs, purchase orders, shipments, and receipts.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The defect ID to find related documents for
- `filters[source_document_type]` [query] string - Filter by source document type. Multiple values supported as comma-separated string. Available values: Requirement, Shipment, Receipt, AdverseCondition Example: "Shipment,Receipt" or "Shipment"
- `filters[created_at]` [query] string - The created date range. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[state]` [query] array of string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW] - Filter by document state(s)
- `sort` [query] string - The sort string
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `totalCount`: integer(int32)
  - `result`: array of object
    - `id`: string(uuid)
    - `name`: string
    - `document_type`: string
    - `subtype`: string
    - `created_at`: string(date)
    - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
    - `description`: string

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/defects/{id}/properties

**Get all properties for a resource**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Resource ID
- `view` [query] string enum[Normal, Keys] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of string)

## InterProjectTransfers

Resource id: `interprojecttransfers`. Raw spec: `../openapi-raw/interprojecttransfers.json`. Web: https://developers.procore.com/reference/rest/interprojecttransfers?version=latest
Product lines: material-management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/inter_project_transfers

**Gets a paginated list of inter-project transfer summaries.**
Returns a paginated list of inter-project transfer documents with filtering and sorting options.
Supports multiple view types: Normal (default), Short, Compact, and Id.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[created_at]` [query] string - Date range filter in format: [YYYY-MM-DD...YYYY-MM-DD]
- `filters[ids]` [query] string - Comma-separated list of inter-project transfer GUIDs to filter by
- `filters[columns]` [query] string - Optional columns to include: created_at, properties
- `filters[state]` [query] string - Comma-separated document states to filter by (e.g. open, document_in_review, final)
- `filters[status]` [query] string - Comma-separated transfer statuses to filter by (e.g. STARTED, IN_REVIEW, IN_TRANSIT, TRANSFER_COMPLETE)
- `filters[created_by]` [query] string - Filter by created by user ID(s)
- `view` [query] string enum[Id, Compact, Short, Normal] - Response view type: Normal (default), Id, Compact, or Short
- `sort` [query] string enum[created_at, name] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `totalCount`: integer(int32)
  - `result`: array of oneOf(array of string(uuid) | object | object | object)

Error responses: 400, 401, 403, 404, 406, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/inter_project_transfers

**Creates a new inter-project transfer.**
Creates a new inter-project transfer document in Draft state with the specified header details.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `name`: string - Name of the transfer. Optional — auto-generated if not provided.
- `notes`: string - Notes for the transfer.
- `properties`: object - Properties (key-value pairs) to be associated with the transfer.
- `to_project_id`: string - The ID of the destination project.
- `estimated_delivery_at`: string(date-time) - The estimated delivery date.
- `items`: array of object - The line items for the transfer. Omitted, `null`, and `[]` are equivalent (no lines yet).
  - `id`: string(uuid) (required) - The ID of the material/resource (item_physical.id). Required.
  - `from_location`: integer(int64) - From location ID.
  - `from_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
  - `quantity`: number(double) - Quantity for the line item. Optional (defaults to 1.0).
  - `notes`: string - Notes for the line item.
- `delivery_instructions`: string - The delivery instructions for the transfer.

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `name`: string
  - `notes`: string
  - `created_at`: string(date-time)
  - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
  - `status`: string enum[STARTED, COMPLETE]
  - `line_items`: array of object
    - `id`: string(uuid)
    - `line_number`: string
    - `item`: object
    - `quantity`: number(double)
    - `quantity_available`: number(double)
    - `from_location`: integer(int64)
    - `from_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
    - `notes`: string
    - `labels`: array of string
  - `to_project_id`: string
  - `estimated_delivery_at`: string(date-time)
  - `delivery_instructions`: string

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/inter_project_transfers/{id}

**Gets the header details for a specific inter-project transfer.**
Returns the header information for an inter-project transfer document including status, dates, notes, and properties.
Supports Normal (default) and Extended view types.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The inter-project transfer document ID.
- `view` [query] string enum[Normal, Extended] - The response view type (Normal or Extended).
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(object | object)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/inter_project_transfers/{id}

**Partially updates an inter-project transfer header.**
Updates one or more fields on the inter-project transfer header. Only the fields provided in the request body are modified.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The inter-project transfer document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `properties_to_add`: array of object - Collection of resource parameters to add to the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `properties_to_update`: array of object - Collection of resource parameters to update in the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `properties_to_delete`: array of object - Collection of resource parameters to delete from the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `name`: string - Name of the document header.
- `description`: string - Description of the document header.
- `notes`: string - Notes associated with the document header.
- `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
- `to_project_id`: string
- `estimated_delivery_at`: string
- `delivery_instructions`: string

Response 200 (application/json): object

- `data`: object - Inter-project transfer header/details for PATCH responses; aligns with Adapter.Api.Models.Response.Transfers.CreateInterProjectTransferResponseDTO for destination project id serialization.
  - `id`: string(uuid)
  - `name`: string
  - `description`: string
  - `properties`: array of object
    - `key`: string
    - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
    - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
  - `notes`: string
  - `line_count`: integer(int32)
  - `status`: string enum[STARTED, IN_REVIEW, IN_TRANSIT, TRANSFER_COMPLETE]
  - `created_at`: string(date-time)
  - `to_project_id`: string
  - `estimated_delivery_at`: string(date-time)
  - `delivery_instructions`: string

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/inter_project_transfers/{id}

**Recycles an inter-project transfer document.**
Moves the specified inter-project transfer to the recycle bin. Only transfers in Draft state can be recycled.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The inter-project transfer document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/inter_project_transfers/{transfer_id}/line_items/{id}

**Partially updates a line item on an inter-project transfer.**
Updates one or more fields on an existing line item. Only the fields provided in the request body are modified.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `transfer_id` [path] string(uuid) (required) - The inter-project transfer document id.
- `id` [path] string(uuid) (required) - The line item id.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `quantity`: number(double)
- `from_location`: integer(int64)
- `from_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
- `notes`: string

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `line_number`: string
  - `item`: object
    - `name`: string
    - `id`: string(uuid)
    - `description`: string
    - `uom`: string
  - `quantity`: number(double)
  - `quantity_available`: number(double)
  - `from_location`: integer(int64)
  - `from_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
  - `notes`: string
  - `labels`: array of string

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/inter_project_transfers/{transfer_id}/line_items/{id}

**Deletes a line item from an inter-project transfer.**
Removes the specified line item from an inter-project transfer. Only transfers in Draft or Ready for Review state allow line item deletion.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `transfer_id` [path] string(uuid) (required) - The inter-project transfer document ID.
- `id` [path] string(uuid) (required) - The line item ID to delete.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/inter_project_transfers/{id}/line_items

**Gets line items for a specific inter-project transfer.**
Returns a paginated list of line items for the specified inter-project transfer document.
Each line item includes item details, quantity, location, and condition information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[posted_at]` [query] string - The posted date filter for filtering transfers by their posted date. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[assigned_to]` [query] string - Gets or sets the identifier of the user to whom the item is assigned.
- `filters[document_status]` [query] array of string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW] - Gets or sets the collection of document status filters to apply to the query.
- `filters[created_at]` [query] string - The created at filter. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[adjustment_reasons]` [query] string - The adjustment reasons filter
- `filters[labels]` [query] string - The labels filter
- `filters[from_locations]` [query] string - The from locations filter
- `filters[from_containers]` [query] array of string(uuid) - The from containers filter
- `filters[to_locations]` [query] string - The to locations filter
- `filters[to_containers]` [query] array of string(uuid) - The to containers filter
- `filters[properties]` [query] object - The properties filter
- `filters[resource_guids]` [query] array of string(uuid) - The resource guids filter
- `filters[transfered_at]` [query] string - Transfer at date range filter. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[columns]` [query] string - The columns filter
- `view` [query] string enum[Id, Compact, Short, Normal] - Response view type
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `filters[property_key]` [query] string - The property key for filtering
- `filters[property_value]` [query] string - The property value for filtering
- `sort` [query] string - The sort string
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `id` [path] string(uuid) (required) - The inter-project transfer document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `totalCount`: integer(int32)
  - `result`: array of object
    - `id`: string(uuid)
    - `line_number`: string
    - `item`: object
    - `quantity`: number(double)
    - `quantity_available`: number(double)
    - `from_location`: integer(int64)
    - `from_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
    - `notes`: string
    - `labels`: array of string

Error responses: 400, 401, 403, 404, 406, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/inter_project_transfers/{id}/line_items

**Adds a line item to an inter-project transfer.**
Adds a new line item to an existing inter-project transfer in Draft state.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The inter-project transfer document id.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `id`: string(uuid) (required) - The ID of the material/resource (item_physical.id). Required.
- `from_location`: integer(int64) - From location ID.
- `from_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
- `quantity`: number(double) - Quantity for the line item. Optional (defaults to 1.0).
- `notes`: string - Notes for the line item.

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `line_number`: string
  - `item`: object
    - `name`: string
    - `id`: string(uuid)
    - `description`: string
    - `uom`: string
  - `quantity`: number(double)
  - `quantity_available`: number(double)
  - `from_location`: integer(int64)
  - `from_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
  - `notes`: string
  - `labels`: array of string

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/inter_project_transfers/{id}/comments

**Adds comments to an inter-project transfer.**
Adds up to 100 comments to the specified inter-project transfer document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The inter-project transfer document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- array of string

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/inter_project_transfers/{id}/attachments

**Get details of attachments for an inter-project transfer**
Returns the list of attachments associated with the specified inter-project transfer document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The inter-project transfer document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/inter_project_transfers/{id}/attachments

**Adds attachments to an inter-project transfer.**
Uploads one or more attachments to the specified inter-project transfer document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The inter-project transfer document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `file_id`: string
- `file_name`: string
- `attach_type`: string
- `description`: string

Response 200 (application/json): object

- `data`: object
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `url`: string
    - `type`: string
    - `url_expires_at`: integer(int64)
    - `status`: string

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/inter_project_transfers/{id}/attachments

**Updates an attachment for an inter-project transfer.**
Updates the metadata of an existing attachment on the specified inter-project transfer document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The inter-project transfer document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `file_id`: string
- `file_name`: string
- `attach_type`: string
- `description`: string

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/inter_project_transfers/{id}/attachments

**Deletes attachments from an inter-project transfer.**
Removes one or more attachments from the specified inter-project transfer document by file IDs.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The inter-project transfer document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- array of string

Response 200 (application/json): object

- `data`: object
  - `results`: array of object
    - `file_id`: string
    - `deleted`: boolean

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/inter_project_transfers/line_items

**Gets a paginated list of inter-project transfer line items.**
Returns a paginated list of inter-project transfer line items across all transfer documents.
Supports multiple view types: Normal (default), Short, Compact, and Id.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[created_at]` [query] string - Date range filter in format: [YYYY-MM-DD...YYYY-MM-DD]
- `filters[labels]` [query] string - Filter by label names
- `filters[columns]` [query] string - Optional columns to include
- `filters[transfer_ids]` [query] string - Comma-separated list of inter-project transfer document GUIDs to filter by
- `filters[state]` [query] string - Filter by document state(s)
- `filters[status]` [query] string - Filter by transfer status(es) (e.g. STARTED, IN_REVIEW, IN_TRANSIT, TRANSFER_COMPLETE)
- `filters[from_condition]` [query] string - Filter by pre-transfer condition (e.g. ACCEPTABLE, DAMAGED, SHORT, OVERAGE, UNACCEPTABLE)
- `filters[from_locations]` [query] string - Filter by source locations
- `filters[to_locations]` [query] string - Filter by destination locations
- `filters[to_project_id]` [query] string - Filter by destination project ID(s)
- `filters[created_by]` [query] string - Filter by created by user ID(s)
- `view` [query] string enum[Id, Compact, Short, Normal] - Response view type: Normal (default), Id, Compact, or Short
- `sort` [query] string enum[line_number, created_at] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `totalCount`: integer(int32)
  - `result`: array of oneOf(array of string(uuid) | object | object | object)

Error responses: 400, 401, 403, 404, 406, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/inter_project_transfers/configure

**Gets configurable columns for inter-project transfers.**
Returns the list of configurable columns available for the inter-project transfer summary or line items view.
These columns can be used to customize which fields are displayed in the UI.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Summary, LineItems, Items, Locations] - The view type (Summary or LineItems).
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `properties`: array of object
    - `name`: string
    - `type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `optional_columns`: array of object
    - `name`: string
    - `sortable`: boolean

Error responses: 400, 401, 403, 404, 406, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/inter_project_transfers/properties

**Gets properties for inter-project transfers.**
Returns the list of custom properties defined for inter-project transfers.
Supports Normal (default) and Keys view types.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Normal, Keys] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of object)

Error responses: 400, 401, 403, 404, 406, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/inter_project_transfers/{transfer_id}/attachments/{id}

**Get details of an attachment for an inter-project transfer**
Returns the details of a specific attachment identified by its file ID on the specified inter-project transfer document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `transfer_id` [path] string(uuid) (required) - The inter-project transfer document ID.
- `id` [path] string (required) - The attachment file ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/inter_project_transfers/{id}/change_history

**Gets the change history for a specific inter-project transfer.**
Returns a paginated list of audit history entries for the specified inter-project transfer document,
showing field-level changes made over time.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The inter-project transfer document ID.
- `filters[activity_type]` [query] string - The activity type to filter by
- `filters[display_line_changes]` [query] boolean - Whether to display line item changes
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: array of object - The data
  - `id`: string(uuid)
  - `activity_type`: string enum[RESOURCE_UPDATED, RESOURCE_INSERTED, RESOURCE_DELETED, ATTACHMENT_ADDED, ATTACHMENT_DELETED, LABEL_ADDED, LABEL_REMOVED, PROPERTY_ADDED, PROPERTY_REMOVED, PROPERTY_UPDATED, ATTACHMENT_UPDATED, DOCUMENT_RESOLVED, ...]
  - `description`: string
  - `activity_timestamp`: string(date-time)
  - `old_data`: object
  - `new_data`: object
  - `user_id`: string

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/inter_project_transfers/{id}/properties

**Get all properties for a resource**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Resource ID
- `view` [query] string enum[Normal, Keys] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of string)

## Issuing

Resource id: `issuing`. Raw spec: `../openapi-raw/issuing.json`. Web: https://developers.procore.com/reference/rest/issuing?version=latest
Product lines: material-management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing

**Get details of issuing records (summary)**
The returned data and pagination size depend on the Adapter.Api.Controller.rest.v2.Issuing.Read.ViewTypes.IssuingSummaryViewType specified
            in issuingRequest. If the view is set to Adapter.Api.Controller.rest.v2.Issuing.Read.ViewTypes.IssuingSummaryViewType.Id, up to 5000 records
            are returned; otherwise, the maximum page size is 100.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[columns]` [query] string - Optional columns to include in the query filter.
- `view` [query] string enum[Id, Compact, Normal] - Response view type
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `filters[id]` [query] string - Comma-separated list of unique identifiers (UUIDs) to filter.
- `filters[status]` [query] string - Comma-separated list of issue statuses to filter (values match Core.Models.Issuing.DirectIssueStatus serialization, e.g. STARTED).
- `filters[state]` [query] string - Comma-separated list of document states to filter (values match Core.Models.Documents.DocumentState.StateType serialization).
- `sort` [query] string enum[name, created_at] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(object | object | object)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing

**Creates a new Direct Issue document.**
Creates a new Direct Issue document. Line items are automatically expanded from available inventory locations based on the items specified in the request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `name`: string
- `issued_to`: string
- `notes`: string
- `item_ids`: array of string(uuid)

Response 201 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `name`: string
  - `issued_to`: string
  - `notes`: string
  - `created_at`: string(date-time)
  - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
  - `status`: string enum[STARTED, COMPLETE]
  - `line_count`: integer(int32)
  - `properties`: array of object
    - `key`: string
    - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
    - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing/{id}/line_items

**Gets all line items for a direct issue record.**
Returns all line items for a specific Direct Issue document, including inventory location details and quantities for each line.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[columns]` [query] string - Optional response fields to include
- `view` [query] string enum[Id, Compact, Normal] - Response view type
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `filters[labels]` [query] string - Comma-separated label names; lines are returned when the line's material has at least one matching label.
- `sort` [query] string enum[line_number] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `id` [path] string(uuid) (required) - The unique identifier of the issuing record for which to retrieve line items.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `line_number`: string
  - `item`: object
    - `name`: string
    - `id`: string(uuid)
    - `description`: string
    - `uom`: string
  - `locations`: array of object
    - `id`: string
    - `quantity`: number(double)
    - `available_quantity`: number(double)
  - `notes`: string
  - `labels`: array of string

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing/{id}/line_items

**Adds line items to an existing Direct Issue.**
Adds a new line item for the specified item to an existing Direct Issue document. The line item is expanded across all available inventory locations for the item. Returns the updated list of all line items on the Direct Issue.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Direct Issue document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `item_id`: string(uuid) (required)

Response 201 (application/json): object

- `data`: array of object - The data
  - `id`: string(uuid)
  - `item_id`: string(uuid)
  - `item_name`: string
  - `uom_id`: string
  - `quantity`: number(double)
  - `notes`: string
  - `line_number`: string
  - `locations`: array of object
    - `id`: string
    - `quantity`: number(double)
    - `available_quantity`: number(double)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing/{id}

**Gets a direct issue record by ID.**
Returns the full details of a specific Direct Issue document, including header information and all associated line items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The unique identifier of the issuing record.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `name`: string
  - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
  - `status`: string enum[STARTED, COMPLETE]
  - `issued_to`: string
  - `notes`: string
  - `line_count`: integer(int32)
  - `created_at`: string(date-time)
  - `properties`: array of object
    - `key`: string
    - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
    - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `attachment_count`: integer(int32)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing/{id}

**Updates header fields of a Direct Issue document.**
Updates one or more header fields on an existing Direct Issue document. Editable fields are state-specific:
- In Draft state, name, issued_to, and notes are editable.
- In Final state, only notes is editable.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Direct Issue document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `properties_to_add`: array of object - Collection of resource parameters to add to the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `properties_to_update`: array of object - Collection of resource parameters to update in the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `properties_to_delete`: array of object - Collection of resource parameters to delete from the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `name`: string - Name of the document header.
- `notes`: string - Notes associated with the document header.
- `issued_to`: string
- `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `name`: string
  - `issued_to`: string
  - `notes`: string
  - `created_at`: string(date-time)
  - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
  - `status`: string enum[STARTED, COMPLETE]
  - `line_count`: integer(int32)
  - `properties`: array of object
    - `key`: string
    - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
    - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing/{id}

**Recycles a Direct Issue document (soft delete).**
Moves a Direct Issue document to the recycle bin. Only Direct Issues in Draft state can be recycled. Recycled documents can be restored by an admin user.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Direct Issue document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing/{issue_id}/line_items/{id}

**Updates notes on a Direct Issue line item.**
Updates fields on a specific line item within a Direct Issue document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `issue_id` [path] string(uuid) (required) - The Direct Issue document ID.
- `id` [path] string(uuid) (required) - The line item ID to update.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `notes`: string

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `item_id`: string(uuid)
  - `item_name`: string
  - `uom_id`: string
  - `quantity`: number(double)
  - `notes`: string
  - `line_number`: string
  - `locations`: array of object
    - `id`: string
    - `quantity`: number(double)
    - `available_quantity`: number(double)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing/{issue_id}/line_items/{id}

**Deletes a line item from a Direct Issue document.**
Removes a line item from a Direct Issue document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `issue_id` [path] string(uuid) (required) - The Direct Issue document ID.
- `id` [path] string(uuid) (required) - The line item ID to delete.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing/{issue_id}/line_items/{line_id}/locations/{id}

**Updates quantity on a Direct Issue line item location.**
Updates the quantity on a specific inventory location associated with a Direct Issue line item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `issue_id` [path] string(uuid) (required) - The Direct Issue document ID.
- `line_id` [path] string(uuid) (required) - The line item ID.
- `id` [path] string (required) - The location id to update.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `quantity`: number(double)

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `item_id`: string(uuid)
  - `item_name`: string
  - `uom_id`: string
  - `quantity`: number(double)
  - `notes`: string
  - `line_number`: string
  - `locations`: array of object
    - `id`: string
    - `quantity`: number(double)
    - `available_quantity`: number(double)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing/{id}/comments

**Add comments to a Direct Issue.**
Adds one or more comments to a Direct Issue document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Direct Issue document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- array of string

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing/{id}/attachments

**Get details of attachments for a Direct Issue**
Returns the details of all attachments associated with a specific Direct Issue document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Direct Issue document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing/{id}/attachments

**Adds attachment(s) to a Direct Issue.**
Uploads one or more file attachments to a Direct Issue document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Direct Issue document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `file_id`: string
- `file_name`: string
- `attach_type`: string
- `description`: string

Response 200 (application/json): object

- `data`: object
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `url`: string
    - `type`: string
    - `url_expires_at`: integer(int64)
    - `status`: string

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing/{id}/attachments

**Updates an attachment for a Direct Issue.**
Updates the metadata of an existing attachment on a Direct Issue document, such as its name or description.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Direct Issue document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `file_id`: string
- `file_name`: string
- `attach_type`: string
- `description`: string

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing/{id}/attachments

**Deletes attachment(s) from a Direct Issue.**
Removes one or more attachments from a Direct Issue document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Direct Issue document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- array of string

Response 200 (application/json): object

- `data`: object
  - `results`: array of object
    - `file_id`: string
    - `deleted`: boolean

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing/line_items

**Get issuing line items**
The returned data and pagination size depend on the Adapter.Api.Controller.rest.v2.Issuing.Read.ViewTypes.IssuingSummaryViewType specified
            in issuingRequest. If the view is set to Adapter.Api.Controller.rest.v2.Issuing.Read.ViewTypes.IssuingSummaryViewType.Id, up to 5000 records
            are returned; otherwise, the maximum page size is 100.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[columns]` [query] string - Optional response fields to include
- `view` [query] string enum[Id, Compact, Normal] - Response view type
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `filters[labels]` [query] string - Comma-separated label names; lines are returned when the line's material has at least one matching label.
- `sort` [query] string enum[created_at, line_number] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of string(uuid) | object)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing/{id}/materials/ids

**List distinct material ids for a direct issue (pick) document**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Pick document id / direct issue id.
- `per_page` [query] integer(int32) - Page size; default 5000, maximum 5000.
- `sort` [query] string - The sort string
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `totalCount`: integer(int32)
  - `result`: array of string(uuid)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing/configure

**Gets configurable columns for the issuing resource.**
Returns the list of configurable columns available for direct issue records.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Summary, LineItems, Items, Locations] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `properties`: array of object
    - `name`: string
    - `type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `optional_columns`: array of object
    - `name`: string
    - `sortable`: boolean

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing/properties

**Get all properties for issuing**
Returns the list of custom property definitions available for direct issues.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Normal, Keys] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of object)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing/{issue_id}/attachments/{id}

**Get details of an attachment for a direct issue**
Returns the details of a single attachment on a Direct Issue document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `issue_id` [path] string(uuid) (required) - The issue ID
- `id` [path] string (required) - The file ID
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing/{id}/change_history

**Get change history for a direct issuing**
Returns the change history for a specific Direct Issue document, including what was changed, when, and by whom.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Issue ID
- `filters[activity_type]` [query] string - The activity type to filter by
- `filters[display_line_changes]` [query] boolean - Whether to display line item changes
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: array of object - The data
  - `id`: string(uuid)
  - `activity_type`: string enum[RESOURCE_UPDATED, RESOURCE_INSERTED, RESOURCE_DELETED, ATTACHMENT_ADDED, ATTACHMENT_DELETED, LABEL_ADDED, LABEL_REMOVED, PROPERTY_ADDED, PROPERTY_REMOVED, PROPERTY_UPDATED, ATTACHMENT_UPDATED, DOCUMENT_RESOLVED, ...]
  - `description`: string
  - `activity_timestamp`: string(date-time)
  - `old_data`: object
  - `new_data`: object
  - `user_id`: string

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/issuing/{id}/properties

**Get all properties for a resource**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Resource ID
- `view` [query] string enum[Normal, Keys] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of string)

## Labels

Resource id: `labels`. Raw spec: `../openapi-raw/labels.json`. Web: https://developers.procore.com/reference/rest/labels?version=latest
Product lines: material-management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/labels

**Returns a paginated list of labels for the specified company and project.**
Returns a list of labels available for the project and company. Supports filtering to show only labels shared across resources and searching labels by name.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[common_labels]` [query] string - Comma-separated list of resource GUIDs to filter common labels.
- `filters[search]` [query] string - Search term to filter labels by name.
- `cursor` [query] string - Base64-encoded JSON cursor token for pagination. Example: "eyJjcmVhdGVkX2RhdGUiOiIyMDI0LTAxLTE1IiwiaWQiOjEyM30=" Decodes to: {"created_date":"2024-01-15","id":123}
- `per_page` [query] integer(int32) - Number of elements per page. Must be between 1 and 100. Defaults to 20.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: array of object - The data
  - `label_id`: string(uuid)
  - `name`: string
  - `description`: string

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/labels

**Creates new labels in the specified company and project.**
Labels are used to categorize and filter materials and documents within a project.
Label names must be unique within the company and project scope.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `labels`: array of object (required)
  - `label_name`: string
  - `label_description`: string

Response 200 (application/json): object

- `data`: array of object - The data
  - `label_id`: string(uuid)
  - `name`: string
  - `description`: string

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/labels/resources

**Adds existing labels to specified resources.**
Associates one or more existing labels with one or more resources (materials or documents).
Labels must already exist within the company and project scope.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `label_guids`: array of string(uuid) (required)
- `resource_guids`: array of string(uuid)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/labels/resources

**Remove existing labels to specified resources.**
Removes the association between one or more labels and the specified resources.
The labels themselves are not deleted; only the association with the resources is removed.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `label_guids`: array of string(uuid) (required)
- `resource_guids`: array of string(uuid)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## MaterialRequirements

Resource id: `materialrequirements`. Raw spec: `../openapi-raw/materialrequirements.json`. Web: https://developers.procore.com/reference/rest/materialrequirements?version=latest
Product lines: material-management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements/{id}

**Gets details of a specific material requirements header by its ID.**
Returns the header details for a specific material requirements document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Material requirements GUID
- `view` [query] string enum[Normal, Extended] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(object | object)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements/{id}

**Updates a material requirements document header.**
Updates header fields such as title, notes, and status on the material requirements document.
Use status transitions to move the document through its workflow states.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The material requirements document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `properties_to_add`: array of object - Collection of resource parameters to add to the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `properties_to_update`: array of object - Collection of resource parameters to update in the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `properties_to_delete`: array of object - Collection of resource parameters to delete from the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `name`: string - Name of the document header.
- `description`: string - Description of the document header.
- `notes`: string - Notes associated with the document header.
- `scope_start_at`: string(date-time) - Start date and time for scope. Clears header field if value is an empty string or "0001-01-01T00:00:00.0000000+00:00".
- `scope_end_at`: string(date-time) - End date and time for the scope. Clears header field if value is an empty string or "0001-01-01T00:00:00.0000000+00:00".
- `required_on_site_date`: string(date-time) - Date and time by which the item is required to be on site.
- `status`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `name`: string
  - `description`: string
  - `total_line_count`: integer(int32)
  - `created_at`: string(date-time)
  - `status`: string enum[STARTED, AVAILABLE, ON_TRACK, DELAYED, NOT_ORDERED, CLOSED]
  - `material_requirement`: object
    - `name`: string
    - `id`: string(uuid)
  - `scope_start_at`: string(date-time)
  - `scope_end_at`: string(date-time)
  - `required_at`: string(date-time)
  - `notes`: string
  - `properties`: array of object
    - `key`: string
    - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
    - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
  - `item_availability_percentage`: number(double)
  - `connected_documents_count`: integer(int32)
  - `attachment_count`: integer(int32)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements/{id}

**Recycles a material requirement.**
Recycles a material requirement. When recycle_items is false, only the requirement document is recycled.
When recycle_items is true, associated items in resource_project are also recycled.
If the items on the requirement are connected to other documents, the items cannot be recycled.
Fails with 400 if the requirement is in Final state.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Material requirement ID
- `recycle_items` [query] boolean - If true, also recycle items in resource_project for this requirement's lines; default false
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements/{id}/attachments

**Gets details of attachments for a material requirements resource.**
Returns the details of all attachments associated with a specific material requirements document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The material requirements resource Id
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements/{id}/attachments

**Adds attachments to a material requirements resource.**
Either provide a file_id already obtained from the File Access Service (FAS), or omit it to have FAS create a new file record. The response includes the file_id and, when FAS creates the record, an upload URL the client uses to upload the file content.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The resource Id.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `file_id`: string
- `file_name`: string
- `attach_type`: string
- `description`: string

Response 200 (application/json): object

- `data`: object
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `url`: string
    - `type`: string
    - `url_expires_at`: integer(int64)
    - `status`: string

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements/{id}/attachments

**Updates an attachment for a material requirements resource.**
Updates the metadata of an existing attachment on a material requirements resource, such as its description or name.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The resource Id.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `file_id`: string
- `file_name`: string
- `attach_type`: string
- `description`: string

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements/{id}/attachments

**Deletes attachments from a material requirements resource.**
Removes one or more attachments from the material requirements document by their file IDs.
The attachment records are removed from the database. The system attempts to delete the underlying files from storage; storage deletion failures are not surfaced to the caller.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The resource Id.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- array of string

Response 200 (application/json): object

- `data`: object
  - `results`: array of object
    - `file_id`: string
    - `deleted`: boolean

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements/{id}/comments

**Adds comments to a material requirements resource.**
Adds one or more comments to a material requirements document.
A maximum of 100 comments can be added in a single request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The resource Id
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json) (required):

- array of string

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 406, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements/{material_requirement_id}/line_items/{id}

**Update line item**
Updates properties such as quantity, item, and notes for a specific line item in a material requirements document.
The document must not be in Final status for line items to be updated.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `material_requirement_id` [path] string(uuid) (required) - The material requirements ID
- `id` [path] string(uuid) (required) - The line item Id
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `quantity`: number(double)

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `item`: object
    - `name`: string
    - `id`: string(uuid)
    - `description`: string
    - `uom`: string
  - `line_number`: string
  - `quantity_required`: number(double)
  - `quantity_available`: number(double)
  - `quantity_reserved`: number(double)
  - `scope_start_at`: string(date-time)
  - `required_at`: string(date-time)
  - `status`: string
  - `labels`: array of string
  - `remaining_quantity_required`: number(double)
  - `previous_quantity`: number(double)
  - `properties`: object

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements/{material_requirement_id}/line_items/{id}

**Deletes a material requirement line item.**
This endpoint performs a hard delete of a material requirement line item. The deletion follows these rules:
1. The deletion is performed if document is in DRAFT or IN REVIEW state.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `material_requirement_id` [path] string(uuid) (required) - Material requirement id
- `id` [path] string(uuid) (required) - Line item id
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements/sync

**Sync material requirements headers**
Creates or updates material requirements headers identified using either ids or origin_ids.
The maximum number of entities per request is 1000. Exceeding this limit will result in a 413 response.
See https://developers.procore.com/documentation/using-sync-actions for more information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `id`: string(uuid) - The Procore id of the resource. This should only be set when updating existing resources.
- `origin_id`: string - The origin id of the resource. If an entry is missing both id and origin_id, then that entry will always be interpreted as an insert.
- `origin_data`: string - The origin data for the resource. Procore does not interpret this value.
- `name`: string - The name of this document header.
- `description`: string - The description of this document header.
- `notes`: string - Additional Notes about this document header.
- `scope_start_at`: string(date-time) - The start timestamp of the scope for this document header. Must be earlier than or equal to scope_end_at.
- `scope_end_at`: string(date-time) - The end timestamp of the scope for this document header. Must be later than or equal to scope_start_at.
- `required_on_site_at`: string(date-time) - The original required on-site date for this document header.

Response 200 (application/json): object

- `data`: object - Record representing a sync action response, including the entities and errors.
  - `entities`: array of object - The entities
    - `id`: string(uuid)
    - `origin_id`: string
    - `origin_data`: string
    - `errors`: object
    - `name`: string
    - `description`: string
    - `notes`: string
    - `scope_start_at`: string(date-time)
    - `scope_end_at`: string(date-time)
    - `required_on_site_at`: string(date-time)
  - `errors`: array of object - The errors
    - `id`: string(uuid)
    - `origin_id`: string
    - `origin_data`: string
    - `errors`: object
    - `name`: string
    - `description`: string
    - `notes`: string
    - `scope_start_at`: string(date-time)
    - `scope_end_at`: string(date-time)
    - `required_on_site_at`: string(date-time)

Error responses: 400, 401, 403, 404, 413, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements/{id}/line_items/sync

**Sync material requirements lines**
Creates or updates material requirements lines identified using either ids or origin_ids.
The material on the line must already exist and can be specified using either item_id or item_origin_id.
The connected material requirements header must already exist.
The maximum number of entities per request is 1000. Exceeding this limit will result in a 413 response.
See https://developers.procore.com/documentation/using-sync-actions for more information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Material requirements header ID
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `id`: string(uuid) - The Procore id of the resource. This should only be set when updating existing resources.
- `origin_id`: string - The origin id of the resource. If an entry is missing both id and origin_id, then that entry will always be interpreted as an insert.
- `origin_data`: string - The origin data for the resource. Procore does not interpret this value.
- `item_id`: string(uuid) - The Procore id of the item for this line. Do not specify this when using item_origin_id.
- `item_origin_id`: string - The origin id of the item for this line. Do not specify this when using item_id.
- `line_number`: string - The line number for this line.
- `subline_number`: integer(int32) - The subline number for this line.
- `quantity`: number(double) - The quantity for this line.
- `warning`: string - The warning message associated with this line.
- `note`: string - Additional notes for this line.

Response 200 (application/json): object

- `data`: object - Record representing a sync action response, including the entities and errors.
  - `entities`: array of object - The entities
    - `id`: string(uuid)
    - `origin_id`: string
    - `origin_data`: string
    - `errors`: object
    - `item_id`: string(uuid)
    - `item_origin_id`: string
    - `line_number`: string
    - `subline_number`: integer(int32)
    - `quantity`: number(double)
    - `warning`: string
    - `note`: string
  - `errors`: array of object - The errors
    - `id`: string(uuid)
    - `origin_id`: string
    - `origin_data`: string
    - `errors`: object
    - `item_id`: string(uuid)
    - `item_origin_id`: string
    - `line_number`: string
    - `subline_number`: integer(int32)
    - `quantity`: number(double)
    - `warning`: string
    - `note`: string

Error responses: 400, 401, 403, 404, 413, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements

**Gets material requirements based on the specified view type.**
Returns a paginated list of material requirements for the project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[requester]` [query] string - The requester string for material requirements to filter by
- `filters[assignee]` [query] string - Comma-separated list of material requirements assignee to filter by
- `filters[scope_start_at]` [query] string - The scope start date range for material requirements to filter by. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[material_requirement_guids]` [query] string - Comma-separated material requirements GUIDs.
- `filters[scope_end_at]` [query] string - The scope end date range for material requirements to filter by
- `filters[required_at]` [query] string - The date range string for material requirements creation dates. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[status]` [query] array of string enum[STARTED, AVAILABLE, ON_TRACK, DELAYED, NOT_ORDERED, CLOSED] - Filter by material requirement status(es)
- `filters[document_type]` [query] string - Comma-separated list of material requirements document types to filter by
- `filters[labels]` [query] string - The labels value for filtering
- `filters[properties]` [query] object - The document properties for filtering
- `filters[columns]` [query] string - The columns to include in the response
- `view` [query] string enum[Id, Compact, Short, Normal] - Response view type
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `filters[state]` [query] string - Filter by document state(s). Comma-separated list of document states to filter by
- `filters[property_key]` [query] string - The property key for filtering
- `filters[property_value]` [query] string - The property value for filtering
- `sort` [query] string enum[name, document_type, created_at, required_at, scope_start_at, scope_end_at, status] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of string(uuid) | array of object | array of object | array of object)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements/line_items

**Gets all material requirements line items.**
Returns a paginated list of material requirement line items across all requirements.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[material_type]` [query] string - Comma-separated list of material requirements material type to filter by
- `filters[material_property_key]` [query] string - Comma-separated list of material material property keys to filter by
- `filters[material_property_value]` [query] string - Comma-separated list of material requirements material property values to filter by
- `filters[material_requirement_guids]` [query] string - Comma-separated list of material requirements needs guids to filter by
- `filters[scope_start_at]` [query] string - The scope start date range for material requirements to filter by
- `filters[scope_end_at]` [query] string - The scope end date range for material requirements to filter by
- `filters[required_at]` [query] string - The date range string for material requirements creation dates. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[status]` [query] array of string enum[STARTED, AVAILABLE, ON_TRACK, DELAYED, NOT_ORDERED, CLOSED] - Filter by material requirement status(es)
- `filters[document_type]` [query] string - Comma-separated list of material requirements document types to filter by
- `filters[labels]` [query] string - The labels value for filtering
- `filters[properties]` [query] object - The document properties for filtering
- `filters[columns]` [query] string - The columns to include in the response
- `view` [query] string enum[Id, Compact, Short, Normal] - Response view type
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `filters[state]` [query] string - Filter by document state(s). Comma-separated list of document states to filter by
- `filters[property_key]` [query] string - The property key for filtering
- `filters[property_value]` [query] string - The property value for filtering
- `sort` [query] string enum[line_number, created_at, required_at, scope_start_at, status, scope_end_at, quantity_ordered] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of string(uuid) | array of object | array of object | array of object)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements/configure

**Get all configurable columns**
Returns the list of configurable columns available for material requirement records.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Summary, LineItems, Items, Locations] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `properties`: array of object
    - `name`: string
    - `type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `optional_columns`: array of object
    - `name`: string
    - `sortable`: boolean

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements/properties

**Get all properties**
Returns the list of custom property definitions available for material requirements.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Normal, Keys] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of object)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements/{id}/line_items

**Gets line items for a specific material requirements document.**
Returns the line items for a specific material requirements document, including quantities, statuses, and associated material details.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Material requirements GUID
- `filters[material_type]` [query] string - Comma-separated list of material requirements material type to filter by
- `filters[material_property_key]` [query] string - Comma-separated list of material material property keys to filter by
- `filters[material_property_value]` [query] string - Comma-separated list of material requirements material property values to filter by
- `filters[material_requirement_guids]` [query] string - Comma-separated list of material requirements needs guids to filter by
- `filters[scope_start_at]` [query] string - The scope start date range for material requirements to filter by
- `filters[scope_end_at]` [query] string - The scope end date range for material requirements to filter by
- `filters[required_at]` [query] string - The date range string for material requirements creation dates. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[status]` [query] array of string enum[STARTED, AVAILABLE, ON_TRACK, DELAYED, NOT_ORDERED, CLOSED] - Filter by material requirement status(es)
- `filters[document_type]` [query] string - Comma-separated list of material requirements document types to filter by
- `filters[labels]` [query] string - The labels value for filtering
- `filters[properties]` [query] object - The document properties for filtering
- `filters[columns]` [query] string - The columns to include in the response
- `view` [query] string enum[Id, Compact, Short, Normal] - Response view type
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `filters[state]` [query] string - Filter by document state(s). Comma-separated list of document states to filter by
- `filters[property_key]` [query] string - The property key for filtering
- `filters[property_value]` [query] string - The property value for filtering
- `sort` [query] string enum[line_number, scope_start_at, required_at, status] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `totalCount`: integer(int32)
  - `result`: array of object
    - `id`: string(uuid)
    - `item`: object
    - `line_number`: string
    - `quantity_required`: number(double)
    - `quantity_available`: number(double)
    - `quantity_reserved`: number(double)
    - `scope_start_at`: string(date-time)
    - `required_at`: string(date-time)
    - `status`: string
    - `labels`: array of string
    - `remaining_quantity_required`: number(double)
    - `previous_quantity`: number(double)
    - `properties`: object

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements/{id}/change_history

**Gets change history for a material requirement.**
Returns the change history for a specific material requirements document, including what was changed, when, and by whom.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Material Requirements ID
- `filters[activity_type]` [query] string - The activity type to filter by
- `filters[display_line_changes]` [query] boolean - Whether to display line item changes
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: array of object - The data
  - `id`: string(uuid)
  - `activity_type`: string enum[RESOURCE_UPDATED, RESOURCE_INSERTED, RESOURCE_DELETED, ATTACHMENT_ADDED, ATTACHMENT_DELETED, LABEL_ADDED, LABEL_REMOVED, PROPERTY_ADDED, PROPERTY_REMOVED, PROPERTY_UPDATED, ATTACHMENT_UPDATED, DOCUMENT_RESOLVED, ...]
  - `description`: string
  - `activity_timestamp`: string(date-time)
  - `old_data`: object
  - `new_data`: object
  - `user_id`: string

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements/{id}/related_documents

**Gets related documents for a material requirement.**
Returns a list of documents related to a specific material requirement, such as purchase orders, receipts, shipments, and defects.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The material requirements GUID to find related documents for
- `filters[source_document_type]` [query] string - Filter by source document type. Multiple values supported as comma-separated string. Available values: Requirement, Shipment, Receipt, AdverseCondition Example: "Shipment,Receipt" or "Shipment"
- `filters[created_at]` [query] string - The created date range. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[state]` [query] array of string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW] - Filter by document state(s)
- `sort` [query] string - The sort string
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `totalCount`: integer(int32)
  - `result`: array of object
    - `id`: string(uuid)
    - `name`: string
    - `document_type`: string
    - `subtype`: string
    - `created_at`: string(date)
    - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
    - `description`: string

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements/{needs_id}/attachments/{id}

**Gets details of a single attachment for a material requirements resource.**
Returns the details of a single attachment on a material requirements document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `needs_id` [path] string(uuid) (required) - The material requirements resource Id
- `id` [path] string (required) - The File Id of the attachment
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements/{id}/verify_deletion

**Verify if the material requirement items can be deleted.**
If the material requirement items are connected to other documents, the items on the material requirement cannot be deleted.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The ID of the material requirement to verify for deletion
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `can_delete`: boolean
  - `connected_documents`: array of object
    - `id`: string(uuid) - The ID
    - `name`: string - The name
    - `resource_type`: string - The resource type
    - `subtype`: string - The resource subtype
  - `connected_resources`: array of object
    - `resource_guid`: string(uuid)
    - `resource_name`: string
    - `connected_documents`: array of object

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/material_requirements/{id}/properties

**Get all properties for a resource**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Resource ID
- `view` [query] string enum[Normal, Keys] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of string)

## Materials

Resource id: `materials`. Raw spec: `../openapi-raw/materials.json`. Web: https://developers.procore.com/reference/rest/materials?version=latest
Product lines: material-management

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/sensors/unassign

**Unassign sensors from materials**
Removes the sensor association from one or more materials. The materials will no longer report sensor data after unassignment.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `resource_guids`: array of string(uuid) (required)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/bulk_update

**Restore materials in bulk**
Only Admin users can restore materials from the recycle bin.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `resource_guids`: array of string(uuid) (required)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/sync

**Syncs Materials**
Creates or updates Materials identified using either ids or origin_ids.
The maximum number of entities per request is 1000. Exceeding this limit will result in a 413 response.
See https://developers.procore.com/documentation/using-sync-actions for more information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `id`: string(uuid) - The Procore id of the resource. This should only be set when updating existing resources.
- `origin_id`: string - The origin id of the resource. If an entry is missing both id and origin_id, then that entry will always be interpreted as an insert.
- `origin_data`: string - The origin data for the resource. Procore does not interpret this value.
- `name`: string - The name of this material.
- `description`: string - The description of this material.
- `uom_name`: string - The unit of measure name for this material.
- `weight`: number(double) - The weight of this material.
- `notes`: string - Additional notes about this material.

Response 200 (application/json): object

- `data`: object - Record representing a sync action response, including the entities and errors.
  - `entities`: array of object - The entities
    - `id`: string(uuid)
    - `origin_id`: string
    - `origin_data`: string
    - `errors`: object
    - `name`: string
    - `description`: string
    - `uom_name`: string
    - `weight`: number(double)
    - `notes`: string
  - `errors`: array of object - The errors
    - `id`: string(uuid)
    - `origin_id`: string
    - `origin_data`: string
    - `errors`: object
    - `name`: string
    - `description`: string
    - `uom_name`: string
    - `weight`: number(double)
    - `notes`: string

Error responses: 400, 401, 403, 404, 413, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/{id}

**Get material details by ID**
Returns the details of a specific material.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Material ID
- `view` [query] string enum[Short, Normal, Extended] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(object | object | object)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/{id}

**Updates material header information.**
Updates fields such as name, description, category, and custom properties on a material.
The material must exist in the project scope.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Id of the material
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `properties_to_add`: array of object - Collection of resource parameters to add to the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `properties_to_update`: array of object - Collection of resource parameters to update in the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `properties_to_delete`: array of object - Collection of resource parameters to delete from the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `name`: string - Name of the document header.
- `description`: string - Description of the document header.
- `notes`: string - Notes associated with the document header.
- `stock_min`: integer(int32)
- `stock_max`: integer(int32)
- `label_guids_to_add`: array of string(uuid)
- `label_guids_to_remove`: array of string(uuid)

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `name`: string
  - `description`: string
  - `properties`: array of object
    - `key`: string
    - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
    - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `labels`: array of string
  - `stock_min`: integer(int32)
  - `stock_max`: integer(int32)
  - `uom`: string

Error responses: 400, 401, 403, 404, 406, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/{id}

**Recycles a material.**
Performs a soft delete (recycle) of the material. The material can be restored from the recycle bin by an admin user.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The GUID of the material to recycle
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/bulk_delete

**Recycle materials in bulk**
Performs a soft delete (recycle) of multiple materials in a single request.
Recycled materials can be restored from the recycle bin by an admin user.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- array of string(uuid)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/{id}/attachments

**Get details of attachments for a material**
Returns the details of all attachments associated with a specific material.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The material ID
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/{id}/attachments

**Adds attachments to a material resource.**
Either provide a file_id already obtained from the File Access Service (FAS), or omit it to have FAS create a new file record. The response includes the file_id and, when FAS creates the record, an upload URL the client uses to upload the file content.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Id of the material
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `file_id`: string
- `file_name`: string
- `attach_type`: string
- `description`: string

Response 200 (application/json): object

- `data`: object
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `url`: string
    - `type`: string
    - `url_expires_at`: integer(int64)
    - `status`: string

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/{id}/attachments

**Updates attachment for a material resource.**
Updates the metadata of an existing attachment on a material resource, such as its description or name.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Id of the material
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `file_id`: string
- `file_name`: string
- `attach_type`: string
- `description`: string

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/{id}/attachments

**Deletes attachments from a material resource.**
Removes one or more attachments from the material by their file IDs.
The attachment records are removed from the database. The system attempts to delete the underlying files from storage; storage deletion failures are not surfaced to the caller.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Id of the material
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- array of string

Response 200 (application/json): object

- `data`: object
  - `results`: array of object
    - `file_id`: string
    - `deleted`: boolean

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/calculations/refresh

**Triggers a recalculation of cached data for the specified materials.**
For the given set of material GUIDs, refreshes all calculated/cached data. The refresh covers calculations related to the material itself as well as any document the material is referenced by.
This operation is asynchronous: the refreshed calculations will not be immediately available or visible to subsequent reads.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `resource_guids`: array of string(uuid) (required)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/{id}/comments

**Add up to 100 comments to a Material**
Adds one or more comments to a material.
A maximum of 100 comments can be added in a single request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Material id
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json) (required):

- array of string

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/materials_mgmt/materials/{id}/properties

**Get all properties for a resource**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Resource ID
- `view` [query] string enum[Normal, Keys] - Response view type
- `company_id` [path] string (required) - The company identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of string)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials

**Get all materials**
Returns a paginated list of materials for the project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[labels]` [query] string - Comma-separated labels to filter materials by
- `filters[updated_at]` [query] string - Filter by updated date. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[created_at]` [query] string - Filter by created date. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[id]` [query] string - Filter by resource GUIDs
- `filters[show_zero_quantity]` [query] boolean - When set, controls zero-quantity visibility. Omitted: true for inventory/extended/compact views (GetMaterial); false for location view.
- `filters[status]` [query] string - Comma-separated line status filters
- `filters[columns]` [query] string - Columns to include in the response
- `filters[location]` [query] string - Filter by location IDs where the material is available
- `sort` [query] string enum[created_at] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `view` [query] string enum[Id, Compact, Short, Extended, Inventory, Location, Mobile] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(object | object | object | object | object | object | object)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/properties

**Get all properties for materials**
Returns the list of custom property definitions available for materials.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Normal, Keys] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of object)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/configure

**Get all configurable columns for materials**
Returns the list of configurable columns available for material records.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Summary, LineItems, Items, Locations] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `properties`: array of object
    - `name`: string
    - `type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `optional_columns`: array of object
    - `name`: string
    - `sortable`: boolean

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/resourcetypes

**Gets all available resource types in the system.**
Returns a list of all material resource types available in the system.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: array of object - The data
  - `id`: string
  - `name`: string
  - `description`: string

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/{material_id}/attachments/{id}

**Get details of an attachment for a material**
Returns the details of a single attachment on a material.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `material_id` [path] string(uuid) (required) - The material ID
- `id` [path] string (required) - The file ID
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/{id}/change_history

**Get change history for a Material**
Returns the change history for a specific material, including what was changed, when, and by whom.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Material ID
- `filters[activity_type]` [query] string - The activity type to filter by
- `filters[display_line_changes]` [query] boolean - Whether to display line item changes
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: array of object - The data
  - `id`: string(uuid)
  - `activity_type`: string enum[RESOURCE_UPDATED, RESOURCE_INSERTED, RESOURCE_DELETED, ATTACHMENT_ADDED, ATTACHMENT_DELETED, LABEL_ADDED, LABEL_REMOVED, PROPERTY_ADDED, PROPERTY_REMOVED, PROPERTY_UPDATED, ATTACHMENT_UPDATED, DOCUMENT_RESOLVED, ...]
  - `description`: string
  - `activity_timestamp`: string(date-time)
  - `old_data`: object
  - `new_data`: object
  - `user_id`: string

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/{id}/related_documents

**Gets related documents for a material.**
Returns a list of documents related to a specific material, such as needs, purchase orders, shipments, receipts, and defects.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The source material GUID to find related documents for
- `filters[source_document_type]` [query] string - Filter by source document type. Multiple values supported as comma-separated string. Available values: Requirement, Shipment, Receipt, AdverseCondition Example: "Shipment,Receipt" or "Shipment"
- `filters[created_at]` [query] string - The created date range. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[state]` [query] array of string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW] - Filter by document state(s)
- `sort` [query] string - The sort string
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `totalCount`: integer(int32)
  - `result`: array of object
    - `id`: string(uuid)
    - `name`: string
    - `document_type`: string
    - `subtype`: string
    - `created_at`: string(date)
    - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
    - `description`: string

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/name

**Gets materials with name and unit of measure.**
Name matching is case sensitive and exact.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `name`: string (required) - The name of the material to search for.
- `uom_name`: string (required) - The unit of measure name for the material.

Response 200 (application/json): object

- `data`: array of object - The data
  - `id`: string(uuid)
  - `name`: string
  - `description`: string
  - `uom_name`: string

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/{id}/verify_deletion

**Verifies if a material can be deleted by checking for connected documents.**
Examining documents directly connected to this material.
If connected documents are found, the material cannot be deleted.
If no connected documents are found, the material can be safely deleted.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The GUID of the material to verify for deletion
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `can_delete`: boolean
  - `connected_documents`: array of object
    - `id`: string(uuid) - The ID
    - `name`: string - The name
    - `resource_type`: string - The resource type
    - `subtype`: string - The resource subtype
  - `connected_resources`: array of object
    - `resource_guid`: string(uuid)
    - `resource_name`: string
    - `connected_documents`: array of object

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/materials/{id}/properties  **[OLDER VERSION - a newer path version exists below/above]**

**Get all properties for a resource**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Resource ID
- `view` [query] string enum[Normal, Keys] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of string)

## PurchaseOrders

Resource id: `purchaseorders`. Raw spec: `../openapi-raw/purchaseorders.json`. Web: https://developers.procore.com/reference/rest/purchaseorders?version=latest
Product lines: material-management

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/{purchase_order_id}/line_items/{id}

**Updates a single purchase order line item.**
This endpoint allows updating properties (such as date and quantity) for a specific purchase order line item.
The line item must belong to the specified purchase order.
If the input is invalid or the line item doesn't exist, a 400 Bad Request response is returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `purchase_order_id` [path] string(uuid) (required) - The unique identifier of the purchase order containing the line item.
- `id` [path] string(uuid) (required) - The unique identifier of the line item to update.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `line_item_guid`: string(uuid)
- `quantity`: number(double)
- `contract_delivery_at`: string(date-time)

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `item`: object
    - `name`: string
    - `id`: string(uuid)
    - `description`: string
    - `uom`: string
  - `external_data`: object
    - `origin_id`: string
    - `origin_data`: string
  - `purchase_order`: object
    - `name`: string
    - `id`: string(uuid)
  - `status`: string
  - `vendor`: string
  - `estimated_delivery_at`: string(date-time)
  - `unit_of_measure`: string
  - `line_number`: string
  - `quantity_ordered`: number(double)
  - `quantity_shipped`: number(double)
  - `quantity_received`: number(double)
  - `quantity_outstanding`: number(double)
  - `contract_delivery_at`: string(date-time)
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `labels`: array of string
  - `properties`: object
  - `order_type`: string
  - `shipment`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `receipt`: array of object
    - `id`: string(uuid)
    - `name`: string

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/line_items/bulk_update

**Updates properties on multiple purchase order line items.**
Updates properties across multiple purchase order line items in a single request.
Each update in the array must include the line item GUID and the fields to update.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `line_item_guid`: string(uuid)
- `quantity`: number(double)
- `contract_delivery_at`: string(date-time)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/{id}

**Get purchase order header details**
Returns the header information for a purchase order including status, dates, title, notes, and properties.
Supports Normal (default) and Extended view types.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Purchase order ID
- `view` [query] string enum[Normal, Extended] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(object | object)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/{id}

**Update a purchase order**
Updates header fields on a purchase order document such as title, delivery date, notes, and status.
Use status transitions to move the purchase order through its workflow states.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Purchase order ID
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `properties_to_add`: array of object - Collection of resource parameters to add to the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `properties_to_update`: array of object - Collection of resource parameters to update in the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `properties_to_delete`: array of object - Collection of resource parameters to delete from the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `name`: string - Name of the document header.
- `description`: string - Description of the document header.
- `notes`: string - Notes associated with the document header.
- `vendor`: string

Response 204 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `name`: string
  - `description`: string
  - `total_line_count`: integer(int32)
  - `created_at`: string(date-time)
  - `status`: string enum[ORDERED, PARTIALLY_SHIPPED, FULLY_SHIPPED, PARTIALLY_RECEIVED, FULLY_RECEIVED, DELAYED, DEFECTS, OVER_RECEIVED, VOID]
  - `vendor`: string
  - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
  - `properties`: array of object
    - `key`: string
    - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
    - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `original_contract_delivery_at`: string(date-time)
  - `forecasted_delivery_at`: string(date-time)
  - `order_type`: string

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/{id}

**Deletes a purchase order and optionally its resources.**
This endpoint performs a soft delete of a purchase order. The deletion follows these rules:
1. If deleteResources is false: Only deletes the document if there are no connected documents
2. If deleteResources is true: Deletes both document and resources if there are no connected documents or resources
3. The deletion is performed as a soft delete (sets deleted = true)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The GUID of the purchase order to delete
- `delete_resources` [query] boolean - Whether to also delete the resources within the document
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/sync

**Sync Purchase Order headers**
Creates or updates Purchase Order headers identified using either ids or origin_ids.
The maximum number of entities per request is 1000. Exceeding this limit will result in a 413 response.
See https://developers.procore.com/documentation/using-sync-actions for more information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `id`: string(uuid) - The Procore id of the resource. This should only be set when updating existing resources.
- `origin_id`: string - The origin id of the resource. If an entry is missing both id and origin_id, then that entry will always be interpreted as an insert.
- `origin_data`: string - The origin data for the resource. Procore does not interpret this value.
- `name`: string - The name of this document header.
- `description`: string - The description of this document header.
- `notes`: string - Additional Notes about this document header.
- `order_type`: string enum[ERP, FIELD_AD_HOC, REQUEST] - Type of the purchase order
- `vendor`: string - Vendor associated with the purchase order
- `original_contract_delivery_at`: string(date-time) - Original contract delivery date for the purchase order

Response 200 (application/json): object

- `data`: object - Record representing a sync action response, including the entities and errors.
  - `entities`: array of object - The entities
    - `id`: string(uuid)
    - `origin_id`: string
    - `origin_data`: string
    - `errors`: object
    - `name`: string
    - `description`: string
    - `notes`: string
    - `order_type`: string
    - `vendor`: string
    - `original_contract_delivery_at`: string(date-time)
  - `errors`: array of object - The errors
    - `id`: string(uuid)
    - `origin_id`: string
    - `origin_data`: string
    - `errors`: object
    - `name`: string
    - `description`: string
    - `notes`: string
    - `order_type`: string
    - `vendor`: string
    - `original_contract_delivery_at`: string(date-time)

Error responses: 400, 401, 403, 404, 413, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/{id}/line_items/sync

**Sync Purchase Order lines**
Creates or updates Purchase Order lines identified using either ids or origin_ids.
The material on the line must already exist and can be specified using either item_id or item_origin_id.
The connected Purchase Order header must already exist.
The maximum number of entities per request is 1000. Exceeding this limit will result in a 413 response.
See https://developers.procore.com/documentation/using-sync-actions for more information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Purchase order ID
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `id`: string(uuid) - The Procore id of the resource. This should only be set when updating existing resources.
- `origin_id`: string - The origin id of the resource. If an entry is missing both id and origin_id, then that entry will always be interpreted as an insert.
- `origin_data`: string - The origin data for the resource. Procore does not interpret this value.
- `item_id`: string(uuid) - The Procore id of the item for this line. Do not specify this when using item_origin_id.
- `item_origin_id`: string - The origin id of the item for this line. Do not specify this when using item_id.
- `line_number`: string - The line number for this line.
- `subline_number`: integer(int32) - The subline number for this line.
- `quantity`: number(double) - The quantity for this line.
- `warning`: string - The warning message associated with this line.
- `note`: string - Additional notes for this line.
- `contract_delivery_at`: string(date-time) - Timestamp when this line is contracted to have its material delivered

Response 200 (application/json): object

- `data`: object - Record representing a sync action response, including the entities and errors.
  - `entities`: array of object - The entities
    - `id`: string(uuid)
    - `origin_id`: string
    - `origin_data`: string
    - `errors`: object
    - `item_id`: string(uuid)
    - `item_origin_id`: string
    - `line_number`: string
    - `subline_number`: integer(int32)
    - `quantity`: number(double)
    - `warning`: string
    - `note`: string
    - `contract_delivery_at`: string(date-time)
  - `errors`: array of object - The errors
    - `id`: string(uuid)
    - `origin_id`: string
    - `origin_data`: string
    - `errors`: object
    - `item_id`: string(uuid)
    - `item_origin_id`: string
    - `line_number`: string
    - `subline_number`: integer(int32)
    - `quantity`: number(double)
    - `warning`: string
    - `note`: string
    - `contract_delivery_at`: string(date-time)

Error responses: 400, 401, 403, 404, 413, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/{id}/verify_deletion

**Verifies if a purchase order can be deleted.**
This endpoint checks if a purchase order can be safely deleted by examining:
1. Documents directly connected to this purchase order
2. Resources within this purchase order that are connected to other documents
3. Document is not a commitment.
If connected documents are found, only those are returned (rule #1).
If no connected documents but connected resources are found, those are returned with their connected documents.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Id of the purchase order to verify for deletion
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `can_delete`: boolean
  - `connected_documents`: array of object
    - `id`: string(uuid)
    - `name`: string
    - `resource_type`: string enum[Material, Piping, Structural, RawMaterial, Electrical, Mechanical, Instrumentation, Surplus, Consumables, Miscellaneous, Cable, Valve, ...]
    - `subtype`: integer(int32)
  - `connected_resources`: array of object
    - `resource_guid`: string(uuid)
    - `resource_name`: string
    - `connected_documents`: array of object

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/{id}/comments

**Add up to 100 comments to a purchase order**
Adds one or more comments to a purchase order document.
A maximum of 100 comments can be added in a single request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Purchase order ID
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json) (required):

- array of string

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 406, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/{id}/attachments

**Get details of attachments for a purchase order**
Returns the details of all attachments associated with a specific purchase order.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The purchase order ID
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/{id}/attachments

**Adds attachments to a purchase order resource.**
Either provide a file_id already obtained from the File Access Service (FAS), or omit it to have FAS create a new file record. The response includes the file_id and, when FAS creates the record, an upload URL the client uses to upload the file content.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Id of the purchase order
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `file_id`: string
- `file_name`: string
- `attach_type`: string
- `description`: string

Response 200 (application/json): object

- `data`: object
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `url`: string
    - `type`: string
    - `url_expires_at`: integer(int64)
    - `status`: string

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/{id}/attachments

**Updates an attachment for a purchase order resource.**
Updates the metadata of an existing attachment on a purchase order resource, such as its description or name.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Id of the purchase order
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `file_id`: string
- `file_name`: string
- `attach_type`: string
- `description`: string

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/{id}/attachments

**Deletes attachments from a purchase order resource.**
Removes one or more attachments from the purchase order by their file IDs.
The attachment records are removed from the database. The system attempts to delete the underlying files from storage; storage deletion failures are not surfaced to the caller.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Id of the purchase order
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- array of string

Response 200 (application/json): object

- `data`: object
  - `results`: array of object
    - `file_id`: string
    - `deleted`: boolean

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders

**Get all purchase orders**
Returns a paginated list of purchase orders with filtering and sorting options.
Supports multiple view types: Normal (default), Short, Compact, Extended, Mobile, and Id.
Results can be filtered by associated document IDs, labels, and vendors.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Id, Compact, Short, Normal, Extended, Mobile] - Response view type
- `per_page` [query] integer(int32) - The page size between 1 and 100. For Ids view the maximum page size is 5000.
- `filters[created_at]` [query] string - The date range string for purchase order creation dates. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[updated_at]` [query] string - The updated date range string for purchase order modification dates. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[id]` [query] string - Comma-separated list of purchase order IDs to filter by
- `filters[origin_id]` [query] string - Comma-separated list of purchase order Origin IDs to filter by
- `filters[include_deleted]` [query] string enum[with, only] - Filter to include or exclude deleted purchase orders
- `filters[include_fully_received]` [query] boolean - Filter to include or exclude fully received purchase orders. When true (default), All purchase orders are returned.
- `filters[include_fully_shipped]` [query] boolean - Filter to include or exclude fully shipped purchase orders. When false (default), only POs with remaining quantity to ship are returned.
- `filters[status]` [query] array of string enum[ORDERED, PARTIALLY_SHIPPED, FULLY_SHIPPED, PARTIALLY_RECEIVED, FULLY_RECEIVED, DELAYED, DEFECTS, OVER_RECEIVED, VOID] - Filter by purchase order status(es)
- `filters[po_guids]` [query] string - Comma-separated list of purchase order GUIDs to filter by
- `overdue_po_lines` [query] string - Filter for overdue purchase order lines
- `filters[property_key]` [query] string - The document property key for filtering
- `filters[property_value]` [query] string - The document property value for filtering
- `filters[columns]` [query] string - The columns to include in the response
- `sort` [query] string enum[created_at, line_items_count, original_contract_delivery_date, estimated_delivery_at, name] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `filters[associated_doc_ids]` [query] string - Associated document IDs
- `filters[labels]` [query] string - Labels
- `filters[vendor]` [query] string - Vendors
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of object | array of object | array of object | array of object | array of object)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/line_items

**Get all purchase order line items**
Returns a paginated list of purchase order line items across all purchase orders.
Supports Normal, Mobile, and Id view types.
Results can be filtered by associated document IDs, labels, vendors, and material types.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Id, Compact, Short, Normal, Extended, Mobile] - Response view type
- `per_page` [query] integer(int32) - The page size between 1 and 100. For Ids view the maximum page size is 5000.
- `filters[estimated_delivery_at]` [query] string - The date range string for estimated delivery dates. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[id]` [query] string - Comma-separated list of purchase order line item IDs to filter by
- `filters[updated_at]` [query] string - The updated date range string for purchase order line item modification dates. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `overdue_po_lines` [query] string - Filter for overdue purchase order lines
- `filters[created_at]` [query] string - The created date range string for purchase order line item creation dates. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[material_property_key]` [query] string - The material property key for filtering line items
- `filters[material_property_value]` [query] string - The material property value for filtering line items
- `filters[status]` [query] array of string enum[ORDERED, PARTIALLY_SHIPPED, FULLY_SHIPPED, PARTIALLY_RECEIVED, FULLY_RECEIVED, DELAYED, DEFECTS, OVER_RECEIVED, VOID] - Filter by purchase order status(es)
- `filters[po_guids]` [query] string - Comma-separated list of purchase order GUIDs to filter by
- `filters[property_key]` [query] string - The document property key for filtering
- `filters[property_value]` [query] string - The document property value for filtering
- `filters[columns]` [query] string - The columns to include in the response
- `sort` [query] string enum[estimated_delivery_at, line_number, quantity_outstanding, contract_delivery_at, created_at] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `filters[associated_doc_ids]` [query] string - Associated document IDs
- `filters[labels]` [query] string - Labels
- `filters[vendor]` [query] string - Vendors
- `filters[material_types]` [query] string - Material types
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of object | array of string(uuid))

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/{id}/line_items

**Get all line items for a specific purchase order**
Returns a paginated list of line items for the specified purchase order.
Supports Normal (default), Receiving, and Id view types.
The Receiving view returns receipt-specific details for each line item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Purchase order ID
- `view` [query] string enum[Normal, Receiving] - Response view type
- `per_page` [query] integer(int32) - The page size between 1 and 100. For Ids view the maximum page size is 5000.
- `filters[estimated_delivery_at]` [query] string - The date range string for estimated delivery dates. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[id]` [query] string - Comma-separated list of purchase order line item IDs to filter by
- `filters[updated_at]` [query] string - The updated date range string for purchase order line item modification dates. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[created_at]` [query] string - The created date range string for purchase order line item creation dates. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[material_property_key]` [query] string - The material property key for filtering line items
- `filters[material_property_value]` [query] string - The material property value for filtering line items
- `filters[status]` [query] array of string enum[ORDERED, PARTIALLY_SHIPPED, FULLY_SHIPPED, PARTIALLY_RECEIVED, FULLY_RECEIVED, DELAYED, DEFECTS, OVER_RECEIVED, VOID] - Filter by purchase order status(es)
- `filters[po_guids]` [query] string - Comma-separated list of purchase order GUIDs to filter by
- `overdue_po_lines` [query] string - Filter for overdue purchase order lines
- `filters[property_key]` [query] string - The document property key for filtering
- `filters[property_value]` [query] string - The document property value for filtering
- `filters[columns]` [query] string - The columns to include in the response
- `sort` [query] string enum[estimated_delivery_at, line_number, quantity_outstanding, contract_delivery_at, created_at] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `filters[associated_doc_ids]` [query] string - Associated document IDs
- `filters[labels]` [query] string - Labels
- `filters[vendors]` [query] string - Vendors
- `filters[material_types]` [query] string - Material types
- `filters[receipt_id]` [query] string(uuid) - Receipt ID
- `filters[shipment_id]` [query] string(uuid) - Shipment ID
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of object)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/{id}/change_history

**Get change history for a purchase order**
Returns a paginated list of change history events for the specified purchase order.
Each entry describes what changed, when it changed, and who made the change.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Purchase order ID
- `filters[activity_type]` [query] string - The activity type to filter by
- `filters[display_line_changes]` [query] boolean - Whether to display line item changes
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: array of object - The data
  - `id`: string(uuid)
  - `activity_type`: string enum[RESOURCE_UPDATED, RESOURCE_INSERTED, RESOURCE_DELETED, ATTACHMENT_ADDED, ATTACHMENT_DELETED, LABEL_ADDED, LABEL_REMOVED, PROPERTY_ADDED, PROPERTY_REMOVED, PROPERTY_UPDATED, ATTACHMENT_UPDATED, DOCUMENT_RESOLVED, ...]
  - `description`: string
  - `activity_timestamp`: string(date-time)
  - `old_data`: object
  - `new_data`: object
  - `user_id`: string

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/{id}/related_documents

**Gets related documents for a purchase order.**
Returns documents that are connected to this purchase order (e.g., receipts, shipments, defects).
Supports filtering by document type and pagination.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The source document GUID to find related documents for
- `filters[source_document_type]` [query] string - Filter by source document type. Multiple values supported as comma-separated string. Available values: Requirement, Shipment, Receipt, AdverseCondition Example: "Shipment,Receipt" or "Shipment"
- `filters[created_at]` [query] string - The created date range. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[state]` [query] array of string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW] - Filter by document state(s)
- `sort` [query] string - The sort string
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `totalCount`: integer(int32)
  - `result`: array of object
    - `id`: string(uuid)
    - `name`: string
    - `document_type`: string
    - `subtype`: string
    - `created_at`: string(date)
    - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
    - `description`: string

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/associated_documents

**Gets associated documents for a purchase order.**
Returns a list of documents that can be associated with purchase orders. Supports searching by document name to help locate specific records.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `totalCount`: integer(int32)
  - `result`: array of object
    - `id`: string(uuid)
    - `name`: string
    - `document_type_id`: string
    - `created_at`: string(date)
    - `description`: string

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/vendors

**Get vendors for a company**
Returns a list of vendors available for the company. Supports filtering by vendor name to narrow results.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[vendor]` [query] string - Vendor filter
- `cursor` [query] string - Base64-encoded JSON cursor token for pagination. Example: "eyJjcmVhdGVkX2RhdGUiOiIyMDI0LTAxLTE1IiwiaWQiOjEyM30=" Decodes to: {"created_date":"2024-01-15","id":123}
- `per_page` [query] integer(int32) - Number of elements per page. Must be between 1 and 100. Defaults to 20.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: array of object - The data
  - `vendor`: string

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/{purchase_order_id}/attachments/{id}

**Get details of an attachment for a purchase order**
Returns the details of a single attachment on a purchase order.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `purchase_order_id` [path] string(uuid) (required) - The purchase order ID
- `id` [path] string (required) - The file ID
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/configure

**Get all configurable columns**
Returns the list of configurable columns available for purchase order records.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Summary, LineItems, Items, Locations] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `properties`: array of object
    - `name`: string
    - `type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `optional_columns`: array of object
    - `name`: string
    - `sortable`: boolean

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/properties

**Get all properties**
Returns the list of custom property definitions available for purchase orders.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Normal, Keys] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of object)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/purchase_orders/{id}/properties

**Get all properties for a resource**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Resource ID
- `view` [query] string enum[Normal, Keys] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of string)

## Receipts

Resource id: `receipts`. Raw spec: `../openapi-raw/receipts.json`. Web: https://developers.procore.com/reference/rest/receipts?version=latest
Product lines: material-management

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/{receipt_id}/line_items/{id}

**Updates a single receipt line item.**
This endpoint allows updating properties (such as date, quantity, status, and location) for a specific receipt line item.
The receipt must not be in a Final state.
If the input is invalid or the line item doesn't exist, a 400 Bad Request response is returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `receipt_id` [path] string(uuid) (required) - Receipt id
- `id` [path] string(uuid) (required) - Line item id
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `quantity_expected`: number(double)
- `quantity_received`: number(double)

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `line_number`: string
  - `item`: object
    - `name`: string
    - `id`: string(uuid)
    - `description`: string
    - `uom`: string
  - `receipt`: object
    - `name`: string
    - `id`: string(uuid)
  - `received_at`: string(date-time)
  - `quantity_received`: number(double)
  - `quantity_expected`: number(double)
  - `quantity_shipped`: number(double)
  - `unit_of_measure`: string
  - `purchase_order`: object
    - `name`: string
    - `id`: string(uuid)
  - `shipment`: object
    - `name`: string
    - `id`: string(uuid)
  - `vendor`: string
  - `container_received`: object
    - `name`: string
    - `id`: string(uuid)
  - `status`: string enum[STARTED, IN_REVIEW, COMPLETE, COMPLETE_HANDOVER, DEFECTS, VOID]
  - `line_status`: string enum[RECEIVED, VOID]
  - `notes`: string
  - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
  - `conditions`: array of object
    - `quantity`: number(double)
    - `condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
    - `location_id`: string
    - `id`: string(uuid)
    - `notes`: string
    - `subline_number`: integer(int32)
  - `updated_at`: string(date-time)
  - `created_at`: string(date-time)
  - `labels`: array of string
  - `shipment_reference`: string
  - `properties`: object

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/{receipt_id}/line_items/{id}

**Deletes a Receipt Line Item.**
This endpoint performs a deletion of a Receipt Line Item. The deletion follows these rules:
1. If locked is false: Only then Deletion can be performed as in that case it is a draft Receipt
2. The hard deletion is performed for the specified receipt line.
3. The hard deletion is performed for the connected shipment and shipment lines only if shipment is system generated.
4. The Shipment will be deleted only if there are no shipment lines connected to it. Otherwise only the related shipment line will be deleted.
5. The refdoc_related_id is marked as null in the receipt if the line being deleted is the only line in the receipt.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `receipt_id` [path] string(uuid) (required) - Receipt id
- `id` [path] string(uuid) (required) - Receipt line item id
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/{id}/comments

**Add up to 100 comments to a receipt**
Adds one or more comments to a receipt document.
A maximum of 100 comments can be added in a single request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Receipt id
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json) (required):

- array of string

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/{id}/attachments

**Gets details of attachments for a receipt resource.**
Returns metadata for all attachments associated with the specified receipt, including file name, MIME type, and download URL.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Receipt id
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/{id}/attachments

**Adds attachments to a receipt resource.**
Either provide a file_id already obtained from the File Access Service (FAS), or omit it to have FAS create a new file record. The response includes the file_id and, when FAS creates the record, an upload URL the client uses to upload the file content.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Receipt id
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `file_id`: string
- `file_name`: string
- `attach_type`: string
- `description`: string

Response 200 (application/json): object

- `data`: object
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `url`: string
    - `type`: string
    - `url_expires_at`: integer(int64)
    - `status`: string

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/{id}/attachments

**Updates an attachment for a receipt resource.**
Updates the metadata of an existing attachment on a receipt resource, such as its description or name.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Receipt id
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `file_id`: string
- `file_name`: string
- `attach_type`: string
- `description`: string

Response 200 (application/json): object

- `data`: array of object - The data
  - `id`: string(uuid)
  - `name`: string

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/{id}/attachments

**Deletes attachments from a receipt resource.**
Removes one or more attachments from the receipt by their file IDs.
The attachment records are removed from the database. The system attempts to delete the underlying files from storage; storage deletion failures are not surfaced to the caller.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Receipt id
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- array of string

Response 200 (application/json): object

- `data`: object
  - `results`: array of object
    - `file_id`: string
    - `deleted`: boolean

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/{id}/attachment

**Adds a single attachment to a receipt resource.**
Either provide a file_id already obtained from the File Access Service (FAS), or omit it to have FAS create a new file record. The response includes the file_id and, when FAS creates the record, an upload URL the client uses to upload the file content.
Returns 201 Created with the attachment data on success.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Receipt id
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `file_id`: string
- `file_name`: string
- `attach_type`: string
- `description`: string

Response 201 (application/json): object

- `data`: object
  - `id`: string
  - `name`: string
  - `url`: string
  - `type`: string
  - `url_expires_at`: integer(int64)
  - `status`: string

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/{id}

**Get receipt header details by id**
Returns the header information for a specific receipt including status, dates, and dynamic properties.
Supports view types: Extended (default), Normal, and Compact.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Receipt id
- `view` [query] string enum[Compact, Normal, Extended] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(object | object | object)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/{id}

**Updates a receipt header.**
This endpoint allows updating various receipt header properties including status, signature,
received by name, received at timestamp, shipment reference, delivery location, and related document associations.
It also supports adding, updating, and removing dynamic properties.
When transitioning a receipt to Final status for a PO that originates from a commitment (order_type_id == 2),
an invoice (requisition) will be created in Procore for the received quantities.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The unique identifier of the receipt to update.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `properties_to_add`: array of object - Collection of resource parameters to add to the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `properties_to_update`: array of object - Collection of resource parameters to update in the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `properties_to_delete`: array of object - Collection of resource parameters to delete from the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `name`: string - Name of the document header.
- `description`: string - Description of the document header.
- `notes`: string - Notes associated with the document header.
- `status`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
- `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
- `signature`: string - The signature to update on the receipt.
- `received_by_id`: string - The id of the user who received the receipt. Clears field if value is empty string or "-1".
- `received_at`: string(date-time) - The timestamp when the receipt was received.
- `shipment_reference`: string - The reference metadata for the shipment.
- `delivery_location`: integer(int64) - The location ID of the delivery location. Clears field if value is empty string or -1.
- `order_id`: string - The related order ID associated with the receipt.
- `shipment_id`: string - The related shipment ID associated with the receipt.

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `name`: string
  - `description`: string
  - `total_line_count`: integer(int32)
  - `created_at`: string(date-time)
  - `status`: string enum[STARTED, IN_REVIEW, COMPLETE, COMPLETE_HANDOVER, DEFECTS, VOID]
  - `vendor`: string
  - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
  - `properties`: array of object
    - `key`: string
    - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
    - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `received_at`: string(date-time)
  - `delivery_location`: integer(int64)
  - `receiving_location_id`: string
  - `received_by_id`: string
  - `notes`: string
  - `shipment_reference`: string
  - `shipment`: object
    - `id`: string(uuid)
    - `name`: string
  - `order`: object
    - `id`: string(uuid)
    - `name`: string
  - `signature`: string
  - `invoice`: object
    - `created`: boolean
    - `id`: string
    - `error_codes`: array of string
    - `warnings`: array of string
- `info`: array of object
  - `reason_code`: string enum[OPERATION_COMPLETED_WITH_WARNINGS, DOCUMENT_CREATED]
  - `message`: string
  - `source`: string

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/{id}

**Recycles a receipt.**
Performs a soft delete (recycle) of the receipt. The receipt can be restored from the recycle bin by an admin user.
Receipts in a Final state cannot be recycled.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The GUID of the receipt to recycle.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/{id}/line_items/bulk_create

**Adds multiple line items to a draft receipt in bulk.**
This method processes the bulk creation of line items for a draft receipt. It validates the
            receipt ID and forwards the request to the receipt service for processing. The response includes the created
            line items or an error message if the operation fails.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The unique identifier of the draft receipt. Must not be an empty GUID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- oneOf(object | object | object | object)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/{id}/line_items

**Get paginated receipt line items for a receipt with specified id**
Returns a paginated list of line items for the specified receipt.
Supports view types: Normal (default), Compact, and Id.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[condition]` [query] string - Filter by condition
- `filters[storage_location]` [query] integer(int64) - Filter by storage location ID
- `filters[columns]` [query] string - Filter by dynamic columns (comma separated)
- `view` [query] string enum[Id, Compact, Normal, Mobile] - Response view type
- `per_page` [query] integer(int32) - The page size between 1 and 100. For Ids view the maximum page size is 5000.
- `filters[labels]` [query] string - Filter for labels (comma separated).
- `filters[id]` [query] string - Filter by line item ID
- `sort` [query] string - The sort string
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `id` [path] string(uuid) (required) - Receipt id
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of object | array of object | array of string(uuid))

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/{id}/line_items

**Adds a single line item to a draft receipt.**
This endpoint creates a single receipt line item for a draft receipt based on the provided line item or item ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The unique identifier of the draft receipt. Must not be an empty GUID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- oneOf(object | object)

Response 200 (application/json): object

- `data`: object
  - `line_guid`: string(uuid)
  - `line_number`: string
  - `guid`: string(uuid)
  - `name`: string
  - `description`: string
  - `uom`: string
  - `expected_quantity`: number(double)
  - `received_quantity`: number(double)
  - `conditions`: array of object
    - `quantity`: number(double)
    - `condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
    - `location_id`: string
    - `id`: string(uuid)
    - `notes`: string
    - `subline_number`: integer(int32)
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts

**Get paginated receipt details**
Returns a paginated list of receipts with filtering and sorting options.
Supports multiple view types: Normal (default), Short, Compact, Mobile, and Id.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[received_at]` [query] string - Raw date range string for received_at filter. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31]). Setting this constructs Adapter.Api.Controller.rest.v2.ReceiptRequest.Read.ReceiptsRequest.dates.
- `filters[created_at]` [query] string - Raw date range string for created_at filter. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31]).
- `filters[updated_at]` [query] string - Raw date range string for updated_at filter. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31]).
- `filters[status]` [query] array of string enum[STARTED, IN_REVIEW, COMPLETE, COMPLETE_HANDOVER, DEFECTS, VOID] - Filter by receipt status(es)
- `filters[state]` [query] string - Filter by receipt state. Multiple values supported as comma-separated string.
- `filters[condition]` [query] string - Receipt condition value; serialized in UPPER_SNAKE_CASE via Core.JsonConverters.UpperSnakeCaseConverter.
- `filters[site]` [query] string - Site identifier filter.
- `filters[location_received]` [query] string - Location where the receipt was received.
- `filters[columns]` [query] string - Comma-separated column keys controlling dynamic projection (e.g. "id,status,site").
- `filters[show_recycled]` [query] boolean - Whether to include recycled receipts.
- `view` [query] string enum[Id, Compact, Short, Normal, Mobile] - Response view type
- `per_page` [query] integer(int32) - The page size between 1 and 100. For Ids view the maximum page size is 5000.
- `filters[labels]` [query] string - Comma-separated label identifiers.
- `filters[associated_doc_ids]` [query] string - Comma-separated associated document IDs.
- `filters[receipt_id]` [query] string - Comma-separated receipt IDs.
- `filters[id]` [query] string - Comma-separated internal record IDs.
- `filters[vendor]` [query] string - Comma-separated vendor identifiers.
- `filters[property_key]` [query] string - Dynamic property key for document property filtering.
- `filters[property_value]` [query] string - Dynamic property value for document property filtering.
- `sort` [query] string enum[created_at, posted_at, received_at, name] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of object | array of object | array of object | array of string(uuid))

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts

**Creates a new receipt.**
This endpoint handles HTTP POST requests and returns different response types based on the
outcome of the operation. A successful creation returns a 200 OK response with the receipt header details, while
various error conditions return appropriate error responses.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `purchase_order_id`: string(uuid) - The ID of the purchase order associated with the receipt.
- `shipment_id`: string(uuid) - The ID of the shipment associated with the receipt.
- `name`: string - The name of the receipt.
- `description`: string - The description of the receipt.
- `vendor`: string - Name of vendor for receipt.
- `received_at`: string(date-time) - The timestamp when the receipt was received.
- `receiving_location`: object
  - `location`: integer(int64)
- `received_by`: string - The name of the user who received the receipt.
- `received_by_id`: string - The name of the user who received the receipt.
- `inspected_by`: string - The name of the user who inspected the receipt.
- `notes`: string - Additional notes for the receipt.
- `destination`: object
  - `location`: integer(int64)
- `signature`: string - The signature associated with the receipt.
- `shipment_reference`: string - Reference to the parent shipment
- `receiving_location_id`: string - The ID of the location where the receipt was received.

Response 200 (application/json): object

- `data`: array of object - The data
  - `id`: string(uuid)
  - `name`: string
  - `description`: string
  - `total_line_count`: integer(int32)
  - `created_at`: string(date-time)
  - `status`: string enum[STARTED, IN_REVIEW, COMPLETE, COMPLETE_HANDOVER, DEFECTS, VOID]
  - `vendor`: string
  - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
  - `properties`: array of object
    - `key`: string
    - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
    - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `received_at`: string(date-time)
  - `delivery_location`: integer(int64)
  - `receiving_location_id`: string
  - `received_by_id`: string
  - `notes`: string
  - `shipment_reference`: string
  - `shipment`: object
    - `id`: string(uuid)
    - `name`: string
  - `order`: object
    - `id`: string(uuid)
    - `name`: string
  - `signature`: string
  - `invoice`: object
    - `created`: boolean
    - `id`: string
    - `error_codes`: array of string
    - `warnings`: array of string

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/{receipt_id}/line_items/{id}/conditions

**Creates a new condition for a specific line item in a receipt.**
This method creates a condition for a specific line item in a receipt. The receipt and line
            item are identified by their respective IDs. The condition details must be provided in the request
            body.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `receipt_id` [path] string(uuid) (required) - The unique identifier of the receipt to which the line item belongs.
- `id` [path] string(uuid) (required) - The unique identifier of the line item for which the condition is being created.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `quantity`: number(double) - The quantity for the line condition. Must be non-negative.
- `condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
- `location_id`: string - The location ID associated with the line condition.
- `notes`: string - Optional notes for the line condition.

Response 200 (application/json): object

- `data`: object
  - `line_guid`: string(uuid)
  - `line_number`: string
  - `guid`: string(uuid)
  - `name`: string
  - `description`: string
  - `uom`: string
  - `expected_quantity`: number(double)
  - `received_quantity`: number(double)
  - `conditions`: array of object
    - `quantity`: number(double)
    - `condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
    - `location_id`: string
    - `id`: string(uuid)
    - `notes`: string
    - `subline_number`: integer(int32)
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/{receipt_id}/line_items/{line_id}/conditions/{id}

**Updates an existing condition for a specific line item in a receipt.**
Updates the condition type and quantity for an existing line condition on a receipt line item.
The receipt must not be in a Final state for condition updates to succeed.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `receipt_id` [path] string(uuid) (required) - Receipt id
- `line_id` [path] string(uuid) (required) - Receipt line item id
- `id` [path] string(uuid) (required) - Receipt condition id
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `quantity`: number(double) - The quantity for the line condition. Must be non-negative.
- `status`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
- `location_id`: string - The location ID associated with the line condition.
- `notes`: string - Optional notes for the line condition.

Response 200 (application/json): object

- `data`: object
  - `line_guid`: string(uuid)
  - `line_number`: string
  - `guid`: string(uuid)
  - `name`: string
  - `description`: string
  - `uom`: string
  - `expected_quantity`: number(double)
  - `received_quantity`: number(double)
  - `conditions`: array of object
    - `quantity`: number(double)
    - `condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
    - `location_id`: string
    - `id`: string(uuid)
    - `notes`: string
    - `subline_number`: integer(int32)
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/{receipt_id}/line_items/{line_id}/conditions/{id}

**Deletes a condition from a receipt line item and adjusts line quantities.**
Deletes a specific condition from a receipt line item and adjusts the line quantity based on the condition type:
- Overage conditions: reduce the line quantity (overage is subtracted from the main line quantity).
- Shortage conditions: increase the line quantity (shortage is added back to the main line quantity).
- Other conditions: the deleted quantity is added to the primary condition.
The receipt must not be in a Final state for conditions to be deleted.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `receipt_id` [path] string(uuid) (required) - Receipt id
- `line_id` [path] string(uuid) (required) - Receipt line item id
- `id` [path] string(uuid) (required) - Receipt condition id
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/line_items

**Get paginated receipt line items**
Returns a paginated list of receipt line items across all receipts in the project.
Supports view types: Normal (default), Short, Mobile, and Id.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[material_types]` [query] string - Filter by line item material types (comma separated)
- `filters[material_property_key]` [query] string - Filter by line item material property key (comma separated)
- `filters[material_property_value]` [query] string - Filter by line item material property value (comma separated)
- `filters[received_at]` [query] string - Raw date range string for received_at filter. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31]). Setting this constructs Adapter.Api.Controller.rest.v2.ReceiptRequest.Read.ReceiptsRequest.dates.
- `filters[created_at]` [query] string - Raw date range string for created_at filter. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31]).
- `filters[updated_at]` [query] string - Raw date range string for updated_at filter. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31]).
- `filters[status]` [query] array of string enum[STARTED, IN_REVIEW, COMPLETE, COMPLETE_HANDOVER, DEFECTS, VOID] - Filter by receipt status(es)
- `filters[state]` [query] string - Filter by receipt state. Multiple values supported as comma-separated string.
- `filters[condition]` [query] string - Receipt condition value; serialized in UPPER_SNAKE_CASE via Core.JsonConverters.UpperSnakeCaseConverter.
- `filters[site]` [query] string - Site identifier filter.
- `filters[location_received]` [query] string - Location where the receipt was received.
- `filters[columns]` [query] string - Comma-separated column keys controlling dynamic projection (e.g. "id,status,site").
- `filters[show_recycled]` [query] boolean - Whether to include recycled receipts.
- `view` [query] string enum[Id, Compact, Short, Normal, Mobile] - Response view type
- `per_page` [query] integer(int32) - The page size between 1 and 100. For Ids view the maximum page size is 5000.
- `filters[labels]` [query] string - Comma-separated label identifiers.
- `filters[associated_doc_ids]` [query] string - Comma-separated associated document IDs.
- `filters[receipt_id]` [query] string - Comma-separated receipt IDs.
- `filters[id]` [query] string - Comma-separated internal record IDs.
- `filters[vendor]` [query] string - Comma-separated vendor identifiers.
- `filters[property_key]` [query] string - Dynamic property key for document property filtering.
- `filters[property_value]` [query] string - Dynamic property value for document property filtering.
- `sort` [query] string - The sort string
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of object | array of object | array of object)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/{id}/change_history

**Get receipt change history**
Returns a paginated list of change history events for the specified receipt.
Each entry describes what changed, when it changed, and who made the change.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Receipt id
- `filters[activity_type]` [query] string - The activity type to filter by
- `filters[display_line_changes]` [query] boolean - Whether to display line item changes
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `activity_type`: string enum[RESOURCE_UPDATED, RESOURCE_INSERTED, RESOURCE_DELETED, ATTACHMENT_ADDED, ATTACHMENT_DELETED, LABEL_ADDED, LABEL_REMOVED, PROPERTY_ADDED, PROPERTY_REMOVED, PROPERTY_UPDATED, ATTACHMENT_UPDATED, DOCUMENT_RESOLVED, ...]
  - `description`: string
  - `activity_timestamp`: string(date-time)
  - `old_data`: object
  - `new_data`: object
  - `user_id`: string

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/configure

**Gets configurable columns for the receipt view.**
Returns the list of configurable columns available for the receipt summary or line items view.
These columns can be used to customize which fields are displayed in the UI.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Summary, LineItems, Items, Locations] - Data view
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `properties`: array of object
    - `name`: string
    - `type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `optional_columns`: array of object
    - `name`: string
    - `sortable`: boolean

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/{id}/related_documents

**Gets related documents for a receipt.**
Returns documents related to the specified receipt, such as referenced shipments or purchase orders.
Supports filtering, sorting, and pagination.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The receipt id of the related documents.
- `filters[source_document_type]` [query] string - Filter by source document type. Multiple values supported as comma-separated string. Available values: Requirement, Shipment, Receipt, AdverseCondition Example: "Shipment,Receipt" or "Shipment"
- `filters[created_at]` [query] string - The created date range. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[state]` [query] array of string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW] - Filter by document state(s)
- `sort` [query] string - The sort string
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `totalCount`: integer(int32)
  - `result`: array of object
    - `id`: string(uuid)
    - `name`: string
    - `document_type`: string
    - `subtype`: string
    - `created_at`: string(date)
    - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
    - `description`: string

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/related_documents

**Gets related documents for receipts by dashboard type.**
Returns receipt-related documents grouped by resource type, using cursor-based pagination for large result sets.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `dashboard_type` [query] string enum[Inventory, PurchaseOrder, Shipment, Receipt, Defect] - Dashboard type
- `cursor` [query] string - Base64-encoded JSON cursor token for pagination. Example: "eyJjcmVhdGVkX2RhdGUiOiIyMDI0LTAxLTE1IiwiaWQiOjEyM30=" Decodes to: {"created_date":"2024-01-15","id":123}
- `per_page` [query] integer(int32) - Number of elements per page. Must be between 1 and 100. Defaults to 20.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object - The data
  - `Material`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Piping`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Structural`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `RawMaterial`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Electrical`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Mechanical`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Instrumentation`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Surplus`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Consumables`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Miscellaneous`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Cable`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Valve`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Pipe_Support`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Ductwork`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Civil`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Spares`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Casing`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Asset`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `PVModule`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `RackingPiles`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Aggregate`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `PressureVessels`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Uncategorized_Equipment`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Light_Stand_Generator`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Light_Stand`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Forklift`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Fire_Extinguisher`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Generator`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Drill`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Compressor`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Welder`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Light_Tower`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Trash_Pump`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Ground_Heater`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Equipment_Attachment`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Herman_Nelson_Heater`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Electronic`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Zoom_Boom`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Propane_Tank`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Fuel_Tank`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Skid_Steer`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Rock_Truck`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Excavator`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Grader`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Tractor_Trailer_Truck`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Flat_Deck_Truck`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Pick_Up_Truck`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Scaffolding`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Flat_Deck_Trailer`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Packer`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Front_End_Loader`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Frost_Fighter`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Scissor_Lift`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Aerial_Work_Platform`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Heater`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Water_Pump`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Electrical_Panel`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Utility_Vehicle`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Crane`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Pressure_Washer`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Radio`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `SCBA`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Gas_Detection_Unit`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Impacter`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Trowel`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Electric_Heater`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Cement_Mixer`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Office_Trailer`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `C_CAN`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `PPE`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `IT`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Office`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Signage`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Barriers`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Rigging`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Ladder`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Harness`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Small_Tool`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Hand_Tool`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `FacingTool`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `TubeBender`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Dozer`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `CompactionEquipment`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `DumpTruck`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `WaterTruck`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Scraper`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `PileDriver`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Mechanical_Equipment`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Filtration_Equip`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `FiltrationMedia`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `FiltrationOther`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Tradesperson`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Foreman`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `General_Foreman`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Guest`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Employee`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Temporary_Worker`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Manager`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Contractor`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Crew`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Subcontractor`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Job`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `PreFab`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Pipeline`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `CWA`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `EWP`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `CWP`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `IWP`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `UserList`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Facility`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `WBS`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Module`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `CWSA`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Group`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `ISO`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Lot`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `FinishedGoodBom`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `SubComponent`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Component`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `SubAssembly`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `MainAssembly`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Package`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Substitutes`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Requirement`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `PO`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Shipment`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `BOL`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `PackingList`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `ReleaseNote`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `TransferNote`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Receipt`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `IssueRequest`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `PickTicket`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `ReturnNotice`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Adjustment`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `ExpeditingRequest`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Load_List`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Allocation`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `AdverseCondition`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `WithdrawalRequest`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `InventoryTotal`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `RentalAgreement`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `FieldInspection`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `NonCompliance`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `TransferShipment`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `TransferReceipt`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `InventoryAudit`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Delivery`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `CWPPackage`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `IWPPackage`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Commodity`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Generic_Container`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `ToolBox`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Box`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Trailer`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Seacan`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Pallet`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Crate`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `RebarBundle`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `CableReel`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Skid`: array of object
    - `id`: string(uuid)
    - `name`: string

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/properties

**Get receipt properties**
Returns custom/dynamic properties defined for receipt documents.
Use view=Keys to get only property keys; the default view returns the full property metadata.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Normal, Keys] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of object)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/{receipt_id}/attachments/{id}

**Gets details of a single attachment for a receipt resource.**
Returns metadata for the specified attachment file, including file name, MIME type, and download URL.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `receipt_id` [path] string(uuid) (required) - Receipt id
- `id` [path] string (required) - Attachment file id
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/receipts/{id}/properties

**Get all properties for a resource**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Resource ID
- `view` [query] string enum[Normal, Keys] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of string)

## RecycleBin

Resource id: `recyclebin`. Raw spec: `../openapi-raw/recyclebin.json`. Web: https://developers.procore.com/reference/rest/recyclebin?version=latest
Product lines: material-management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/recycle_bin

**Retrieves recycled resources matching the specified filter criteria.**
The returned collection is streamed asynchronously, which allows efficient handling of large
            result sets. The response will have a status code of 200 (OK) if successful, or 406 (Not Acceptable) if the
            request parameters are invalid.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[resource_type]` [query] string - Comma-separated list of resource types to filter the results by.
- `filters[recycled_at]` [query] string - Date and time when the item was recycled. Formatted as YYYY-MM-DDThh:mm:ssZ...YYYY-MM-DDThh:mm:ssZ.
- `filters[recycled_by_user]` [query] string - Comma-separated list of user IDs used to filter items recycled by specific users.
- `sort` [query] string - The sort string
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `totalCount`: integer(int32)
  - `result`: array of object
    - `id`: string(uuid)
    - `name`: string
    - `description`: string
    - `uom`: string
    - `resource_type`: string
    - `subtype`: string
    - `recycled_at`: string(date-time)
    - `created_at`: string(date-time)
    - `recycled_by`: integer(int64)

Error responses: 400, 401, 403, 404, 406 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Shipments

Resource id: `shipments`. Raw spec: `../openapi-raw/shipments.json`. Web: https://developers.procore.com/reference/rest/shipments?version=latest
Product lines: material-management

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/container

**Creates a container from shipment line items.**
Creates a new container (package) from the specified shipment line items.
The line items must belong to an existing shipment in the project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `quantity_by_line_item_ids`: object
- `doc_id`: string(uuid)
- `container_type`: string enum[Material, Piping, Structural, RawMaterial, Electrical, Mechanical, Instrumentation, Surplus, Consumables, Miscellaneous, Cable, Valve, ...]
- `name`: string
- `description`: string
- `sensor_id`: string
- `existing_container_id`: string(uuid)
- `length`: number(double)
- `width`: number(double)
- `height`: number(double)
- `dimension_uom`: integer(int64)
- `is_reusable`: boolean
- `weight`: number(double)
- `weight_uom`: integer(int64)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 406, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/line_items/set_line_item_modifier

**Sets a modifier on shipment line items.**
Sets or clears a modifier value (such as a line warning or identifier) on one or more shipment line items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `line_item_guids`: array of string(uuid) (required)
- `update_value`: object (required)
  - `key`: string enum[LineWarning, LineIdentifier]
  - `value`: string

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/{id}

**Get shipment header details**
Returns the header information for a specific shipment including status, delivery details, and dynamic properties.
Supports view types: Extended (default) and Normal.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Shipment ID
- `view` [query] string enum[Normal, Extended] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(object | object)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/{id}

**Updates properties on a single shipment.**
Updates header fields on a shipment document such as title, delivery date, notes, and status.
Use status transitions to move the shipment through its workflow states.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Shipment ID
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- oneOf(object)

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `name`: string
  - `description`: string
  - `total_line_count`: integer(int32)
  - `created_at`: string(date-time)
  - `status`: string enum[IN_TRANSIT, DELIVERED, TRANSFER_RECEIVED, STARTED]
  - `vendor`: string
  - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
  - `properties`: array of object
    - `key`: string
    - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
    - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `estimated_delivery_at`: string(date-time)
  - `notes`: string
  - `delivery_instructions`: string
  - `order`: object
    - `name`: string
    - `id`: string(uuid)
  - `dest_location_id`: string
  - `shipment_type`: string enum[SHIPMENT, TRANSFER_SHIPMENT, EXTERNAL_ERP_SHIPMENT]
  - `supply_project_id`: string

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/{id}

**Recycles a shipment by marking it as recycled.**
Performs a soft delete (recycle) of the shipment. Shipments in a posted (Final) status cannot be recycled.
Recycled shipments can be restored from the recycle bin by an admin user.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The shipment ID to recycle. Must not be an empty GUID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/{id}/line_items

**Get all line items for a specific shipment**
Returns line items for the specified shipment.
Use view=Receiving to get the receiving view (with PO line linkage and remaining-to-receive amounts);
the default view returns standard line items with connected document details.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Shipment ID
- `filters[status]` [query] array of string enum[IN_TRANSIT, DELIVERED, TRANSFER_RECEIVED, STARTED] - Filter by shipment status(es)
- `filters[labels]` [query] string - Comma-separated list of label/tag IDs to filter by
- `filters[estimated_delivery_date]` [query] string - Date range for filtering by estimated delivery date. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `view` [query] string enum[Normal, Receiving] - Response view type
- `per_page` [query] integer(int32) - The page size between 1 and 100. For Ids view the maximum page size is 5000.
- `filters[columns]` [query] string - Comma-separated list of dynamic columns to include in the response
- `sort` [query] string enum[estimated_delivery_at] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `filters[receipt_id]` [query] string(uuid) - Receipt ID
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of object)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/{id}/line_items

**Bulk-updates line items on a single shipment.**
Currently Date and Quantity are supported.
Updates Date and Quantity across multiple line items for a single shipment in a single request.
Each update must include the line item GUID and the fields to update.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Shipment ID
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `line_item_guid`: string(uuid)
- `quantity`: number(double)
- `estimated_delivery_at`: string(date-time)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/{shipment_id}/line_items/{id}

**Updates a line item of a shipment.**
This method applies partial updates to a line item within a shipment. The request body should
            specify only the fields  to be updated. If the operation is successful, the updated line item details are
            returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `shipment_id` [path] string(uuid) (required) - The unique identifier of the shipment containing the line item to be updated. Must not be an empty GUID.
- `id` [path] string(uuid) (required) - The unique identifier of the line item to be updated. Must not be an empty GUID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `quantity`: number(double) - The quantity to update for the shipment line. Specify null to leave the quantity unchanged.
- `date`: string(date-time) - The date and time to update for the shipment line. Specify null to leave the date and time unchanged.

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `item`: object
    - `name`: string
    - `id`: string(uuid)
    - `description`: string
    - `uom`: string
  - `estimated_delivery_at`: string(date-time)
  - `quantity_shipped`: number(double)
  - `quantity_received`: number(double)
  - `line_number`: string
  - `status`: string enum[IN_TRANSIT, DELIVERED, TRANSFER_RECEIVED, STARTED]
  - `receipts`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `labels`: array of string
  - `properties`: object

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/{shipment_id}/line_items/{id}

**Deletes a line item from a draft shipment.**
Deletes a line item from a draft shipment. Line items can only be deleted when the shipment is in Draft status (not locked).
The line item is marked as recycled (sets is_recycled = true).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `shipment_id` [path] string(uuid) (required) - The ID of the shipment containing the line item
- `id` [path] string(uuid) (required) - The GUID of the line item to delete
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/line_items/bulk_update

**Updates properties on multiple shipment line items.**
Updates properties across multiple shipment line items in a single request.
Each update must include the line item GUID and the fields to update.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `line_item_guid`: string(uuid)
- `quantity`: number(double)
- `estimated_delivery_at`: string(date-time)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/{id}/line_items/bulk_create

**Adds bulk line items to a shipment from a purchase order.**
Creates multiple shipment line items from existing purchase order line items in a single request.
The shipment must not be in a posted (Final) status for line items to be added.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The shipment ID from the route
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- oneOf(object | object | object)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/{id}/verify_deletion

**Verifies if a shipment can be deleted by checking for connected documents.**
Checks if there are documents directly connected to this shipment (e.g., receipts referencing this shipment).
If connected documents are found, the shipment cannot be deleted.
If no connected documents are found, the shipment can be safely deleted.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The GUID of the shipment to verify for deletion
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `can_delete`: boolean
  - `connected_documents`: array of object
    - `id`: string(uuid)
    - `name`: string
    - `resource_type`: string enum[Material, Piping, Structural, RawMaterial, Electrical, Mechanical, Instrumentation, Surplus, Consumables, Miscellaneous, Cable, Valve, ...]
    - `subtype`: integer(int32)
  - `connected_resources`: array of object
    - `resource_guid`: string(uuid)
    - `resource_name`: string
    - `connected_documents`: array of object

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/{id}/comments

**Add up to 100 comments to a shipment**
Adds one or more comments to a shipment document.
A maximum of 100 comments can be added in a single request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The shipment ID
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json) (required):

- array of string

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 406, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/{id}/attachments

**Get details of attachments for a shipment**
Returns metadata for all attachments associated with the specified shipment, including file name, MIME type, and download URL.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The shipment resource Id
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/{id}/attachments

**Adds attachments to a shipment resource.**
Either provide a file_id already obtained from the File Access Service (FAS), or omit it to have FAS create a new file record. The response includes the file_id and, when FAS creates the record, an upload URL the client uses to upload the file content.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The ID of the shipment resource to which attachments will be added.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `file_id`: string
- `file_name`: string
- `attach_type`: string
- `description`: string

Response 200 (application/json): object

- `data`: object
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `url`: string
    - `type`: string
    - `url_expires_at`: integer(int64)
    - `status`: string

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/{id}/attachments

**Update an attachment's metadata**
Updates the metadata of an existing attachment on a shipment resource, such as its description or name.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The ID of the shipment resource for which the attachment will be updated.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `file_id`: string
- `file_name`: string
- `attach_type`: string
- `description`: string

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/{id}/attachments

**Deletes attachments from a shipment resource.**
Removes one or more attachments from the shipment by their file IDs.
The attachment records are removed from the database. The system attempts to delete the underlying files from storage; storage deletion failures are not surfaced to the caller.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The ID of the shipment resource from which attachments will be deleted.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- array of string

Response 200 (application/json): object

- `data`: object
  - `results`: array of object
    - `file_id`: string
    - `deleted`: boolean

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments

**Get all shipments**
Returns a paginated list of shipments with filtering and sorting options.
Supports view types: Normal (default), Compact, and Id.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Id, Compact, Normal] - Response view type
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `filters[id]` [query] string - Comma-separated list of shipment GUIDs to filter by
- `filters[updated_at]` [query] string - Date range for filtering shipments based on their last updated date. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[include_deleted]` [query] string enum[with, only] - Filter to include or exclude deleted shipments
- `filters[state]` [query] array of string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW] - Filter by document state(s)
- `filters[include_fully_delivered]` [query] boolean - Filter to include or exclude fully delivered shipments
- `filters[estimated_delivery_at]` [query] string - Date range for filtering shipments based on their delivery date. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[columns]` [query] string - The columns to include in the response
- `filters[status]` [query] array of string enum[IN_TRANSIT, DELIVERED, TRANSFER_RECEIVED, STARTED] - Filter by shipment status(es)
- `filters[destination]` [query] string - Comma-separated list of shipment destinations to filter by
- `filters[labels]` [query] string - Comma-separated list of shipment tags to filter by
- `filters[vendor]` [query] string - The vendor associated with the shipments
- `filters[associated_document_ids]` [query] string - Comma-separated list of associated document IDs to filter by
- `filters[shipment_type]` [query] string - Comma-separated values (filters[shipment_type]). Filters shipment.subtype_id, not document shipment_type_id / .
- `filters[property_key]` [query] string - The property key for filtering
- `filters[property_value]` [query] string - The property value for filtering
- `sort` [query] string enum[estimated_delivery_at, created_at] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of object | array of object)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments

**Creates a new shipment.**
This method handles HTTP POST requests and returns different response types based on the
            outcome of the operation. A successful creation returns a 200 OK response with the shipment details, while
            various error conditions return appropriate error responses.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `purchase_order_id`: string(uuid)
- `name`: string
- `description`: string
- `vendor`: string
- `estimated_delivery_at`: string(date-time)
- `properties`: object

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `name`: string
  - `description`: string
  - `total_line_count`: integer(int32)
  - `created_at`: string(date-time)
  - `status`: string enum[IN_TRANSIT, DELIVERED, TRANSFER_RECEIVED, STARTED]
  - `vendor`: string
  - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
  - `properties`: array of object
    - `key`: string
    - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
    - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `estimated_delivery_at`: string(date-time)
  - `notes`: string
  - `delivery_instructions`: string
  - `order`: object
    - `name`: string
    - `id`: string(uuid)
  - `dest_location_id`: string
  - `shipment_type`: string enum[SHIPMENT, TRANSFER_SHIPMENT, EXTERNAL_ERP_SHIPMENT]
  - `supply_project_id`: string

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/line_items

**Get all shipment line items**
Returns a paginated list of shipment line items across all shipments in the project.
Supports view types: Normal (default), Mobile, and Id. The Mobile view also includes the remaining-to-be-received quantity.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Id, Normal, Mobile] - Response view type
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `filters[shipment_ids]` [query] string - Comma-separated list of shipment GUIDs to filter by
- `filters[id]` [query] string - Comma-separated list of shipment line item GUIDs to filter by
- `filters[updated_at]` [query] string - Date range for filtering shipment line items based on their last updated date. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[material_type]` [query] string - The material type to filter by
- `filters[material_property_key]` [query] string - The material property key for filtering
- `filters[material_property_value]` [query] string - The material property value for filtering
- `filters[estimated_delivery_at]` [query] string - Date range for filtering shipments based on their delivery date. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[columns]` [query] string - The columns to include in the response
- `filters[status]` [query] array of string enum[IN_TRANSIT, DELIVERED, TRANSFER_RECEIVED, STARTED] - Filter by shipment status(es)
- `filters[destination]` [query] string - Comma-separated list of shipment destinations to filter by
- `filters[labels]` [query] string - Comma-separated list of shipment tags to filter by
- `filters[vendor]` [query] string - The vendor associated with the shipments
- `filters[associated_document_ids]` [query] string - Comma-separated list of associated document IDs to filter by
- `filters[shipment_type]` [query] string - Comma-separated values (filters[shipment_type]). Filters shipment.subtype_id, not document shipment_type_id / .
- `filters[property_key]` [query] string - The property key for filtering
- `filters[property_value]` [query] string - The property value for filtering
- `sort` [query] string enum[estimated_delivery_at] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of object | array of object)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/{id}/change_history

**Get change history for a shipment**
Returns a paginated list of change history events for the specified shipment.
Each entry describes what changed, when it changed, and who made the change.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Shipment ID
- `filters[activity_type]` [query] string - The activity type to filter by
- `filters[display_line_changes]` [query] boolean - Whether to display line item changes
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: array of object - The data
  - `id`: string(uuid)
  - `activity_type`: string enum[RESOURCE_UPDATED, RESOURCE_INSERTED, RESOURCE_DELETED, ATTACHMENT_ADDED, ATTACHMENT_DELETED, LABEL_ADDED, LABEL_REMOVED, PROPERTY_ADDED, PROPERTY_REMOVED, PROPERTY_UPDATED, ATTACHMENT_UPDATED, DOCUMENT_RESOLVED, ...]
  - `description`: string
  - `activity_timestamp`: string(date-time)
  - `old_data`: object
  - `new_data`: object
  - `user_id`: string

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/{id}/related_documents

**Gets related documents for a shipment.**
Returns documents related to the specified shipment, such as receipts, purchase orders, or transfers.
Supports filtering, sorting, and pagination.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The source document GUID to find related documents for
- `filters[source_document_type]` [query] string - Filter by source document type. Multiple values supported as comma-separated string. Available values: Requirement, Shipment, Receipt, AdverseCondition Example: "Shipment,Receipt" or "Shipment"
- `filters[created_at]` [query] string - The created date range. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[state]` [query] array of string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW] - Filter by document state(s)
- `sort` [query] string - The sort string
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `totalCount`: integer(int32)
  - `result`: array of object
    - `id`: string(uuid)
    - `name`: string
    - `document_type`: string
    - `subtype`: string
    - `created_at`: string(date)
    - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
    - `description`: string

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/{shipment_id}/linked_po_lines

**Search purchase order lines linked to a shipment**
Searches purchase order lines that are linked to the specified shipment.
Supports view types: normal (default), compact, and id, plus filtering by updated date.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `purchase_order_id` [query] string(uuid) - The GUID of the purchase order to search for
- `filters[id]` [query] string(uuid) - The internal ID of the purchase order to filter by
- `view` [query] string enum[Id, Compact, Normal] - Response view type
- `filters[updated_date]` [query] string(date-time) - The date when the purchase order was last updated
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `shipment_id` [path] string(uuid) (required) - Shipment Id
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: array of object - The data
  - `id`: string(uuid)
  - `line_number`: string
  - `name`: string
  - `description`: string
  - `remaining_qty`: number(double)
  - `resource_in_shipment`: boolean

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/configure

**Get all configurable columns**
Returns the list of configurable columns available for the shipment summary or line items view.
These columns can be used to customize which fields are displayed in the UI.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Summary, LineItems, Items, Locations] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `properties`: array of object
    - `name`: string
    - `type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `optional_columns`: array of object
    - `name`: string
    - `sortable`: boolean

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/related_documents

**Gets related documents for shipments by dashboard type.**
Returns shipment-related documents grouped by resource type, using cursor-based pagination for large result sets.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `dashboard_type` [query] string enum[Inventory, PurchaseOrder, Shipment, Receipt, Defect] - The dashboard type to filter related documents
- `cursor` [query] string - Base64-encoded JSON cursor token for pagination. Example: "eyJjcmVhdGVkX2RhdGUiOiIyMDI0LTAxLTE1IiwiaWQiOjEyM30=" Decodes to: {"created_date":"2024-01-15","id":123}
- `per_page` [query] integer(int32) - Number of elements per page. Must be between 1 and 100. Defaults to 20.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object - The data
  - `Material`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Piping`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Structural`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `RawMaterial`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Electrical`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Mechanical`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Instrumentation`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Surplus`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Consumables`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Miscellaneous`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Cable`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Valve`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Pipe_Support`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Ductwork`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Civil`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Spares`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Casing`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Asset`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `PVModule`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `RackingPiles`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Aggregate`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `PressureVessels`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Uncategorized_Equipment`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Light_Stand_Generator`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Light_Stand`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Forklift`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Fire_Extinguisher`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Generator`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Drill`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Compressor`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Welder`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Light_Tower`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Trash_Pump`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Ground_Heater`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Equipment_Attachment`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Herman_Nelson_Heater`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Electronic`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Zoom_Boom`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Propane_Tank`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Fuel_Tank`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Skid_Steer`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Rock_Truck`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Excavator`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Grader`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Tractor_Trailer_Truck`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Flat_Deck_Truck`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Pick_Up_Truck`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Scaffolding`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Flat_Deck_Trailer`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Packer`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Front_End_Loader`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Frost_Fighter`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Scissor_Lift`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Aerial_Work_Platform`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Heater`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Water_Pump`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Electrical_Panel`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Utility_Vehicle`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Crane`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Pressure_Washer`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Radio`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `SCBA`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Gas_Detection_Unit`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Impacter`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Trowel`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Electric_Heater`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Cement_Mixer`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Office_Trailer`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `C_CAN`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `PPE`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `IT`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Office`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Signage`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Barriers`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Rigging`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Ladder`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Harness`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Small_Tool`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Hand_Tool`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `FacingTool`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `TubeBender`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Dozer`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `CompactionEquipment`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `DumpTruck`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `WaterTruck`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Scraper`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `PileDriver`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Mechanical_Equipment`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Filtration_Equip`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `FiltrationMedia`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `FiltrationOther`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Tradesperson`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Foreman`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `General_Foreman`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Guest`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Employee`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Temporary_Worker`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Manager`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Contractor`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Crew`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Subcontractor`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Job`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `PreFab`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Pipeline`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `CWA`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `EWP`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `CWP`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `IWP`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `UserList`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Facility`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `WBS`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Module`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `CWSA`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Group`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `ISO`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Lot`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `FinishedGoodBom`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `SubComponent`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Component`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `SubAssembly`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `MainAssembly`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Package`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Substitutes`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Requirement`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `PO`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Shipment`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `BOL`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `PackingList`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `ReleaseNote`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `TransferNote`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Receipt`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `IssueRequest`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `PickTicket`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `ReturnNotice`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Adjustment`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `ExpeditingRequest`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Load_List`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Allocation`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `AdverseCondition`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `WithdrawalRequest`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `InventoryTotal`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `RentalAgreement`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `FieldInspection`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `NonCompliance`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `TransferShipment`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `TransferReceipt`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `InventoryAudit`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Delivery`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `CWPPackage`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `IWPPackage`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Commodity`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Generic_Container`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `ToolBox`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Box`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Trailer`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Seacan`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Pallet`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Crate`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `RebarBundle`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `CableReel`: array of object
    - `id`: string(uuid)
    - `name`: string
  - `Skid`: array of object
    - `id`: string(uuid)
    - `name`: string

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/properties

**Get all properties**
Returns custom/dynamic properties defined for shipment documents.
Use view=Keys to get only property keys; the default view returns the full property metadata.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Normal, Keys] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of object)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/{shipment_id}/attachments/{id}

**Get details of an attachment for a shipment**
Returns metadata for the specified attachment file, including file name, MIME type, and download URL.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `shipment_id` [path] string(uuid) (required) - The shipment resource Id
- `id` [path] string (required) - The attachment file Id
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/shipments/{id}/properties

**Get all properties for a resource**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Resource ID
- `view` [query] string enum[Normal, Keys] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of string)

## Transfers

Resource id: `transfers`. Raw spec: `../openapi-raw/transfers.json`. Web: https://developers.procore.com/reference/rest/transfers?version=latest
Product lines: material-management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers/{id}

**Gets transfer details by ID based on the specified view type.**
Returns the header details for a specific transfer document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The transfer ID
- `view` [query] string enum[Normal, Extended] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(object | object)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers/{id}

**Updates a transfer document header.**
Updates header fields such as title, notes, and status on the transfer document.
Use status transitions to move the transfer through its workflow states.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The transfer document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `properties_to_add`: array of object - Collection of resource parameters to add to the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `properties_to_update`: array of object - Collection of resource parameters to update in the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `properties_to_delete`: array of object - Collection of resource parameters to delete from the document header.
  - `key`: string
  - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
  - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
- `name`: string - Name of the document header.
- `description`: string - Description of the document header.
- `notes`: string - Notes associated with the document header.
- `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]

Response 200 (application/json): object

- `data`: object - Transfer details for generic `/materials_mgmt/transfers` routes (no inter-project destination fields).
  - `id`: string(uuid)
  - `name`: string
  - `description`: string
  - `properties`: array of object
    - `key`: string
    - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
    - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
  - `notes`: string
  - `line_count`: integer(int32)
  - `status`: string enum[STARTED, COMPLETE]
  - `created_at`: string(date-time)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers/{id}

**Recycles a transfer document.**
Performs a soft delete (recycle) of the transfer document.
Transfers in a Final state cannot be recycled.
Recycled transfers can be restored from the recycle bin by an admin user.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The transfer document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers

**Gets a paginated list of transfers for the project.**
Returns a paginated list of transfers for the project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[created_at]` [query] string - Date range filter. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[ids]` [query] string - Filter by transfer IDs (comma-separated GUIDs) Example: "[guid1,guid2,guid3]"
- `filters[columns]` [query] string - Comma-separated list of optional column names to include in the response. Available optional columns: "created_at", "properties" By default, these fields are excluded to reduce response size. Example: "CreatedAt"
- `filters[state]` [query] array of string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW] - Filter by document state(s)
- `filters[status]` [query] array of string enum[STARTED, COMPLETE] - Filter by transfer status(es)
- `view` [query] string enum[Id, Compact, Short, Normal] - Response view type
- `sort` [query] string enum[created_at, name] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of string(uuid) | array of object | array of object | array of object)

Error responses: 400, 401, 403, 404, 406 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers

**Creates a new stand-alone transfer.**
Creates a transfer document with the specified header information and line items.
Line items must include a resource guid and quantity. Optional fields include
from/to locations and from/to statuses.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `properties`: object - Properties (key-value pairs) to be associated with the transfer.
- `type`: string enum[SIMPLE_TRANSFER, INTER_PROJECT_TRANSFER]
- `name`: string
- `notes`: string - Notes for the transfer.
- `items`: array of object - Collection of items for the transfer.
  - `id`: string(uuid) (required) - The ID of the material/resource (item_physical.id). Required.
  - `from_location`: integer(int64) - From location ID.
  - `from_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
  - `quantity`: number(double) - Quantity for the line item. Optional (defaults to 1.0).
  - `notes`: string - Notes for the line item.
  - `to_location`: integer(int64) - To location ID.
  - `to_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `name`: string
  - `notes`: string
  - `created_at`: string(date-time)
  - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
  - `status`: string enum[STARTED, COMPLETE]
  - `line_items`: array of object
    - `id`: string(uuid)
    - `line_number`: string
    - `item`: object
    - `quantity`: number(double)
    - `quantity_available`: number(double)
    - `from_location`: integer(int64)
    - `from_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
    - `to_location`: integer(int64)
    - `to_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
    - `notes`: string

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers/{id}/line_items

**Get line items for a transfer**
Returns all line items associated with a specific transfer document, including quantities, material details, and source and destination locations.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[posted_at]` [query] string - The posted date filter for filtering transfers by their posted date. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[assigned_to]` [query] string - Gets or sets the identifier of the user to whom the item is assigned.
- `filters[document_status]` [query] array of string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW] - Gets or sets the collection of document status filters to apply to the query.
- `filters[created_at]` [query] string - The created at filter. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[adjustment_reasons]` [query] string - The adjustment reasons filter
- `filters[labels]` [query] string - The labels filter
- `filters[from_locations]` [query] string - The from locations filter
- `filters[from_containers]` [query] array of string(uuid) - The from containers filter
- `filters[to_locations]` [query] string - The to locations filter
- `filters[to_containers]` [query] array of string(uuid) - The to containers filter
- `filters[properties]` [query] object - The properties filter
- `filters[resource_guids]` [query] array of string(uuid) - The resource guids filter
- `filters[transfered_at]` [query] string - Transfer at date range filter. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[columns]` [query] string - The columns filter
- `view` [query] string enum[Id, Compact, Short, Normal] - Response view type
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `filters[property_key]` [query] string - The property key for filtering
- `filters[property_value]` [query] string - The property value for filtering
- `sort` [query] string enum[lineitem_uuid, refdoc_uuid, item_uuid, line_number, resource_name, quantity, created_at, line_status] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `id` [path] string(uuid) (required) - The transfer ID
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `totalCount`: integer(int32)
  - `result`: array of object
    - `lineitem_uuid`: string(uuid)
    - `refdoc_uuid`: string(uuid)
    - `item_uuid`: string(uuid)
    - `line_number`: string
    - `resource_name`: string
    - `quantity`: number(double)
    - `quantity_available`: number(double)
    - `created_at`: string(date-time)
    - `from_location`: string
    - `to_location`: string
    - `line_status`: string
    - `notes`: string
    - `labels`: array of string

Error responses: 400, 401, 403, 404, 406 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers/{id}/line_items

**Adds a single line item to an existing transfer document.**
Adds a line item to a transfer document. The transfer must be in Draft status for line items to be added.
The line item requires a resource ID and quantity.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The transfer document ID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `id`: string(uuid) (required) - The ID of the material/resource (item_physical.id). Required.
- `from_location`: integer(int64) - From location ID.
- `from_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
- `quantity`: number(double) - Quantity for the line item. Optional (defaults to 1.0).
- `notes`: string - Notes for the line item.
- `to_location`: integer(int64) - To location ID.
- `to_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]

Response 201 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `line_number`: string
  - `item`: object
    - `name`: string
    - `id`: string(uuid)
    - `description`: string
    - `uom`: string
  - `quantity`: number(double)
  - `quantity_available`: number(double)
  - `from_location`: integer(int64)
  - `from_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
  - `to_location`: integer(int64)
  - `to_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
  - `notes`: string

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers/consolidate

**Consolidates inventory of a material from multiple locations into a single destination location.**
This operation creates and immediately finalizes a transfer document, moving acceptable-status inventory of the
specified material from all source locations (excluding the destination location) to a single destination location.
Inventory in Short or Overage status is not consolidated.
The resulting transfer is in Final (locked) status and cannot be modified.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `resource_id`: string(uuid) (required)
- `to_location`: integer(int64) (required)

Response 201 (application/json): object

- `data`: object - Transfer details for generic `/materials_mgmt/transfers` routes (no inter-project destination fields).
  - `id`: string(uuid)
  - `name`: string
  - `description`: string
  - `properties`: array of object
    - `key`: string
    - `value`: string - Value rules: - TEXT: Any string - BOOLEAN: "true" / "false" - DATE: "YYYY-MM-DD" (e.g. "2026-03-02"). Send null or "" to clear. - NUMBER: Numeric string (e.g. "42", "3.14"). Stored as-is. - LOCATION: Any string (e.g. ...
    - `property_type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
  - `notes`: string
  - `line_count`: integer(int32)
  - `status`: string enum[STARTED, COMPLETE]
  - `created_at`: string(date-time)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers/line_items/bulk_update

**Bulk updates destination for multiple line items.**
Updates the destination location for multiple transfer line items in a single request.
The transfer must be in Draft status for line items to be updated.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `line_item_ids`: array of string(uuid) (required)
- `to_location`: integer(int64) (required)

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers/{transfer_id}/line_items/{id}

**Updates the specified transfer line item.**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `transfer_id` [path] string(uuid) (required) - The unique identifier of the transfer containing the line item to update. Must not be empty.
- `id` [path] string(uuid) (required) - The unique identifier of the line item to update within the transfer. Must not be empty.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `quantity`: number(double)
- `from_location`: integer(int64)
- `from_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
- `to_location`: string
- `to_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
- `notes`: string

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `item`: object
    - `name`: string
    - `id`: string(uuid)
    - `description`: string
    - `uom`: string
  - `transfer`: object
    - `name`: string
    - `id`: string(uuid)
  - `state`: string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW]
  - `status`: string enum[STARTED, COMPLETE]
  - `quantity`: number(double)
  - `from_location`: integer(int64)
  - `from_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
  - `to_location`: integer(int64)
  - `to_condition`: string enum[ACCEPTABLE, UNACCEPTABLE, DAMAGED, SHORT, OVERAGE, ADD, REMOVE, RETURNED_TO_STOCK]
  - `line_number`: string
  - `labels`: array of string
  - `created_at`: string(date-time)
  - `notes`: string
  - `properties`: object
  - `adjustment_reason_id`: string
  - `adjustment_type_id`: string
  - `quantity_available`: number(double)
  - `to_project_id`: string

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers/{transfer_id}/line_items/{id}

**Deletes a line item from a draft transfer.**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `transfer_id` [path] string(uuid) (required) - The unique identifier of the draft transfer from which the line item will be deleted. Must be a non-empty GUID.
- `id` [path] string(uuid) (required) - The unique identifier of the line item to delete from the draft transfer. Must be a non-empty GUID.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers/{id}/comments

**Add up to 100 comments to a transfer**
Adds one or more comments to a transfer document.
A maximum of 100 comments can be added in a single request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Transfer ID
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json) (required):

- array of string

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 406, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers/{id}/attachments

**Get details of attachments for a transfer**
Returns the details of all attachments associated with a specific transfer.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Transfer ID
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers/{id}/attachments

**Adds attachments to a transfer.**
Either provide a file_id already obtained from the File Access Service (FAS), or omit it to have FAS create a new file record. The response includes the file_id and, when FAS creates the record, an upload URL the client uses to upload the file content.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Id of the transfer
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `file_id`: string
- `file_name`: string
- `attach_type`: string
- `description`: string

Response 200 (application/json): object

- `data`: object
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `url`: string
    - `type`: string
    - `url_expires_at`: integer(int64)
    - `status`: string

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers/{id}/attachments

**Updates an attachment for a transfer.**
Updates the metadata of an existing attachment on a transfer resource, such as its description or name.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Id of the transfer
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- `file_id`: string
- `file_name`: string
- `attach_type`: string
- `description`: string

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers/{id}/attachments

**Deletes attachments from a transfer.**
Removes one or more attachments from the transfer by their file IDs.
The attachment records are removed from the database. The system attempts to delete the underlying files from storage; storage deletion failures are not surfaced to the caller.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - The Id of the transfer
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Request body (application/json):

- array of string

Response 200 (application/json): object

- `data`: object
  - `results`: array of object
    - `file_id`: string
    - `deleted`: boolean

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers/line_items

**Gets a paginated list of transfer line items across all transfers.**
Returns a paginated list of transfer line items across all transfers.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[created_at]` [query] string - Filter by creation date. Format: [YYYY-MM-DD...YYYY-MM-DD] (e.g. [2026-01-01...2026-12-31])
- `filters[labels]` [query] string - Filter by labels
- `filters[from_locations]` [query] string - Filter by source locations
- `filters[to_locations]` [query] string - Filter by destination locations
- `filters[columns]` [query] string - Filter by columns
- `filters[transfer_ids]` [query] string - Filter by transfer IDs
- `filters[state]` [query] array of string enum[DRAFT, FINAL, CLOSED, READY_FOR_REVIEW] - Filter by document state(s)
- `filters[status]` [query] array of string enum[STARTED, COMPLETE] - Filter by transfer status(es)
- `view` [query] string enum[Id, Compact, Short, Normal] - Response view type
- `sort` [query] string enum[line_number, created_at] - Sort results by field. Prefix with '-' for descending order (e.g. '-created_at').
- `filters[search]` [query] string - The search term
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of string(uuid) | array of object | array of object | array of object)

Error responses: 400, 401, 403, 404, 406 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers/configure

**Get all configurable columns**
Returns the list of configurable columns available for transfer records.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Summary, LineItems, Items, Locations] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `properties`: array of object
    - `name`: string
    - `type`: string enum[BOOLEAN, DATE, NUMBER, LOCATION, TEXT, HIDDEN, PERSON]
  - `optional_columns`: array of object
    - `name`: string
    - `sortable`: boolean

Error responses: 400, 401, 403, 404, 406 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers/properties

**Get all properties**
Returns the list of custom property definitions available for transfers.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[Normal, Keys] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of object)

Error responses: 400, 401, 403, 404, 406 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers/{transfer_id}/attachments/{id}

**Get details of an attachment for a transfer**
Returns the details of a single attachment on a transfer.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `transfer_id` [path] string(uuid) (required) - The Transfer ID
- `id` [path] string (required) - The file ID
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid)
  - `attachments`: array of object
    - `id`: string
    - `name`: string
    - `mime_type`: string
    - `upload_url`: string
    - `download_url`: string
    - `url_expires_at`: integer(int64)
    - `status`: string
    - `uploaded_at`: string(date-time)

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers/{id}/change_history

**Get change history for a transfer**
Returns the change history for a specific transfer, including what was changed, when, and by whom.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Transfer ID
- `filters[activity_type]` [query] string - The activity type to filter by
- `filters[display_line_changes]` [query] boolean - Whether to display line item changes
- `page` [query] integer(int32) - The page number
- `per_page` [query] integer(int32) - The page size between 1 and 100.
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: array of object - The data
  - `id`: string(uuid)
  - `activity_type`: string enum[RESOURCE_UPDATED, RESOURCE_INSERTED, RESOURCE_DELETED, ATTACHMENT_ADDED, ATTACHMENT_DELETED, LABEL_ADDED, LABEL_REMOVED, PROPERTY_ADDED, PROPERTY_REMOVED, PROPERTY_UPDATED, ATTACHMENT_UPDATED, DOCUMENT_RESOLVED, ...]
  - `description`: string
  - `activity_timestamp`: string(date-time)
  - `old_data`: object
  - `new_data`: object
  - `user_id`: string

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/materials_mgmt/transfers/{id}/properties

**Get all properties for a resource**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string(uuid) (required) - Resource ID
- `view` [query] string enum[Normal, Keys] - Response view type
- `company_id` [path] string (required) - The company identifier
- `project_id` [path] string (required) - The project identifier

Response 200 (application/json): object

- `data`: oneOf(array of object | array of string)

