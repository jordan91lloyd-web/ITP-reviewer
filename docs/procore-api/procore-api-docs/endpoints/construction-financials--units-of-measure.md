# Procore API: Units of Measure (Construction Financials)

Source: https://developers.procore.com/reference/rest/ (tool category: Units of Measure)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Unit of Measure Categories](#unit-of-measure-categories) - versions 1.0
- [Units of Measure](#units-of-measure) - versions 2.0, 1.0

## Unit of Measure Categories

Resource id: `unit-of-measure-categories`. Raw spec: `../openapi-raw/unit-of-measure-categories.json`. Web: https://developers.procore.com/reference/rest/unit-of-measure-categories?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/companies/{company_id}/uom_categories

**List Unit of Measure Categories**
Returns the company's Unit of Measure (UOM) Categories. Categories are the seven Procore-standard groupings every company has by default — `time`, `amount`, `length`, `area`, `volume`, `mass`, and `other` — and are returned localized for the requesting user. Use the returned `id` as the `uom_category_id` when creating or updating a Unit of Measure via `POST` or `PATCH /rest/v1.0/companies/{company_id}/uoms`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `id`: integer - Numeric identifier of the UOM Category. Use as the `uom_category_id` when creating or updating a Unit of Measure via `POST` or `PATCH /rest/v1.0/companies/{company_id}/uoms`. e.g. `202`
- `name`: string - Name of the UOM Category. One of Procore's standard categories: `time`, `amount`, `length`, `area`, `volume`, `mass`, `other`. Returned localized for the requesting user. e.g. `time`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Units of Measure

Resource id: `units-of-measure`. Raw spec: `../openapi-raw/units-of-measure.json`. Web: https://developers.procore.com/reference/rest/units-of-measure?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/uoms/configuration

**Get Configuration for Uom Master List**
Returns configuration constraints for the company's UOM master list, derived from the company's connected ERP integration (when present). Includes the maximum allowed length of UOM names on commitment line items (`character_limit`, null when no integration is connected or no limit is configured) and the integration's short display name (`erp_integration_name`, empty string when no integration is connected).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object - Configuration payload for the UOM master list.
  - `character_limit`: string - Maximum number of characters allowed for a UOM name when used on commitment line items, expressed as a numeric string (e.g., `"32"`). Null when the ERP integration imposes no character limit, or when no integration is... e.g. `32`
  - `erp_integration_name`: string - Short display name of the company's connected ERP integration (e.g., `Sage 300 CRE`). Empty string when no ERP integration is connected. e.g. `Sage 300 CRE`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/uoms

**List Units of Measure**
Returns the Units of Measure (UOMs) configured for the company, grouped by UOM Category. Includes both Procore-provided standard UOMs (those with `is_standard: true`, e.g., `hours`, `sf`) and any custom UOMs defined by the company. Pass `view=ids_only` to return only the IDs. Filter by `filters[id]` (single ID or array) and `filters[updated_at]` (ISO 8601 datetime range) to narrow the result set.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[ids_only] - Serialization view. When set to `ids_only`, the response body is a JSON array of integer Unit of Measure IDs (pagination headers still apply). Omit for the default view (full UOM objects grouped by category).
- `filters[id]` [query] array of integer - Restrict results to UOMs with one or more matching IDs. Example: `filters[id]=[101,102]`.
- `filters[updated_at]` [query] string - Return item(s) within a specific updated at iso8601 datetime range

Response 200 (application/json): oneOf(array of object | array of integer)


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/uoms

**Create Unit of Measure**
Creates a new custom Unit of Measure (UOM) for the company. Only company admins can call this endpoint. The provided `name` must be unique within the company and cannot match the name of a Procore-provided standard UOM. Returns the newly created UOM resource.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `uom`: object (required)
  - `name`: string (required) - Display name of the Unit of Measure (e.g., `hours`). Must be unique within the company and cannot match a Procore-provided standard UOM name. e.g. `hours`
  - `uom_category_id`: integer (required) - ID of the parent UOM Category from `GET /rest/v1.0/companies/{company_id}/uom_categories`. e.g. `202`

Response 201 (application/json): object

- `id`: integer - Numeric identifier of the Unit of Measure. Use as the `{id}` path parameter on `GET`/`PATCH`/`DELETE /rest/v1.0/companies/{company_id}/uoms/{id}`. e.g. `101`
- `is_standard`: boolean - True when this UOM is one of Procore's built-in standard units (e.g., `hours`, `sf`, `ls`); standard UOMs cannot be deleted, and only `name` can be modified. False for company-defined custom UOMs. e.g. `false`
- `name`: string - Display name of the UOM (e.g., `hours`, `sf`, `ls`). Returned localized for the requesting user. Unique per company. e.g. `ls`
- `description`: string - Human-readable label for the UOM (e.g., `Lump Sum`). Present and localized only for Procore standard UOMs; null for company-defined custom UOMs. e.g. `Lump Sum`
- `uom_category`: object - The UOM Category this UOM belongs to.
  - `id`: integer (required) - Numeric identifier of the UOM Category. Use as the `uom_category_id` when creating or updating a Unit of Measure. e.g. `202`
  - `name`: string (required) - Name of the UOM Category. One of Procore's standard categories: `time`, `amount`, `length`, `area`, `volume`, `mass`, `other`. Returned localized for the requesting user. e.g. `time`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/uoms/{id}

**Show Unit of Measure**
Returns a single Unit of Measure (UOM) by ID. Use the `id` returned from the List endpoint as the `{id}` path parameter.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unit of Measure ID

Response 200 (application/json): object

- `id`: integer - Numeric identifier of the Unit of Measure. Use as the `{id}` path parameter on `GET`/`PATCH`/`DELETE /rest/v1.0/companies/{company_id}/uoms/{id}`. e.g. `101`
- `is_standard`: boolean - True when this UOM is one of Procore's built-in standard units (e.g., `hours`, `sf`, `ls`); standard UOMs cannot be deleted, and only `name` can be modified. False for company-defined custom UOMs. e.g. `false`
- `name`: string - Display name of the UOM (e.g., `hours`, `sf`, `ls`). Returned localized for the requesting user. Unique per company. e.g. `ls`
- `description`: string - Human-readable label for the UOM (e.g., `Lump Sum`). Present and localized only for Procore standard UOMs; null for company-defined custom UOMs. e.g. `Lump Sum`
- `uom_category`: object - The UOM Category this UOM belongs to.
  - `id`: integer (required) - Numeric identifier of the UOM Category. Use as the `uom_category_id` when creating or updating a Unit of Measure. e.g. `202`
  - `name`: string (required) - Name of the UOM Category. One of Procore's standard categories: `time`, `amount`, `length`, `area`, `volume`, `mass`, `other`. Returned localized for the requesting user. e.g. `time`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/uoms/{id}

**Update Unit of Measure**
Updates the `name` and/or `uom_category_id` of a Unit of Measure (UOM). Only company admins can call this endpoint. For Procore-provided standard UOMs (`is_standard: true`), only `name` can be updated; `uom_category_id` changes are silently ignored. Custom UOMs support both fields.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unit of Measure ID

Request body (application/json) (required):

- `uom`: object (required)
  - `name`: string (required) - Display name of the Unit of Measure (e.g., `hours`). Must be unique within the company and cannot match a Procore-provided standard UOM name. e.g. `hours`
  - `uom_category_id`: integer (required) - ID of the parent UOM Category from `GET /rest/v1.0/companies/{company_id}/uom_categories`. e.g. `202`

Response 200 (application/json): object

- `id`: integer - Numeric identifier of the Unit of Measure. Use as the `{id}` path parameter on `GET`/`PATCH`/`DELETE /rest/v1.0/companies/{company_id}/uoms/{id}`. e.g. `101`
- `is_standard`: boolean - True when this UOM is one of Procore's built-in standard units (e.g., `hours`, `sf`, `ls`); standard UOMs cannot be deleted, and only `name` can be modified. False for company-defined custom UOMs. e.g. `false`
- `name`: string - Display name of the UOM (e.g., `hours`, `sf`, `ls`). Returned localized for the requesting user. Unique per company. e.g. `ls`
- `description`: string - Human-readable label for the UOM (e.g., `Lump Sum`). Present and localized only for Procore standard UOMs; null for company-defined custom UOMs. e.g. `Lump Sum`
- `uom_category`: object - The UOM Category this UOM belongs to.
  - `id`: integer (required) - Numeric identifier of the UOM Category. Use as the `uom_category_id` when creating or updating a Unit of Measure. e.g. `202`
  - `name`: string (required) - Name of the UOM Category. One of Procore's standard categories: `time`, `amount`, `length`, `area`, `volume`, `mass`, `other`. Returned localized for the requesting user. e.g. `time`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/uoms/{id}

**Delete Unit of Measure**
Deletes a custom Unit of Measure (UOM). Only company admins can call this endpoint, and only custom UOMs can be deleted — attempting to delete a Procore-provided standard UOM (`is_standard: true`) returns `422 Unprocessable Entity`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unit of Measure ID

Response 204: No Content (no body)

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/uoms/sync

**Sync Units of Measure**
Creates, updates, and/or deletes a batch of Units of Measure (UOMs) for the company in a single call. Each entry in `updates` is treated as a create when `id` is omitted, or as an update when `id` is supplied. IDs in `deletes` remove the matching UOMs; standard (Procore-provided) UOMs cannot be deleted via this endpoint and will be reported in the response `errors` array. Only company admins can call this endpoint. See [Using Sync Actions](/documentation/using-sync-actions) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `updates`: array of object (required) - UOMs to create or update. Omit `id` to create a new custom UOM; supply `id` to update an existing UOM. For Procore-provided standard UOMs, only `name` can be updated; `uom_category_id` changes are silently ignored.
  - `id`: integer - ID of an existing Unit of Measure to update. Omit when creating a new UOM. e.g. `12`
  - `name`: string - Display name of the UOM (e.g., `hours`, `sf`). Required when creating; optional on updates. Must be unique within the company and cannot match a Procore standard UOM name. e.g. `hours`
  - `uom_category_id`: integer - ID of the parent UOM Category from `GET /rest/v1.0/companies/{company_id}/uom_categories`. Required when creating; optional on updates. e.g. `202`
- `deletes`: array of integer - IDs of custom UOMs to delete. Standard (Procore-provided) UOMs cannot be deleted via this endpoint and will be reported in the response `errors` array.

Response 200 (application/json): object

- `entities`: array of object
  - `id`: integer - Numeric identifier of the Unit of Measure. Use as the `{id}` path parameter on `GET`/`PATCH`/`DELETE /rest/v1.0/companies/{company_id}/uoms/{id}`. e.g. `101`
  - `is_standard`: boolean - True when this UOM is one of Procore's built-in standard units (e.g., `hours`, `sf`, `ls`); standard UOMs cannot be deleted, and only `name` can be modified. False for company-defined custom UOMs. e.g. `false`
  - `name`: string - Display name of the UOM (e.g., `hours`, `sf`, `ls`). Returned localized for the requesting user. Unique per company. e.g. `ls`
  - `description`: string - Human-readable label for the UOM (e.g., `Lump Sum`). Present and localized only for Procore standard UOMs; null for company-defined custom UOMs. e.g. `Lump Sum`
  - `uom_category`: object - The UOM Category this UOM belongs to.
    - `id`: integer (required) - Numeric identifier of the UOM Category. Use as the `uom_category_id` when creating or updating a Unit of Measure. e.g. `202`
    - `name`: string (required) - Name of the UOM Category. One of Procore's standard categories: `time`, `amount`, `length`, `area`, `volume`, `mass`, `other`. Returned localized for the requesting user. e.g. `time`
- `errors`: array of object
  - `id`: integer - ID of the Unit of Measure that failed to sync (echoed from the request). e.g. `101`
  - `is_standard`: boolean - True when the failed row references a Procore-provided standard UOM. Standard UOMs cannot be deleted via sync, and `uom_category_id` cannot be changed; only `name` can be modified. e.g. `false`
  - `name`: string - Name from the failed UOM payload (echoed from the request). e.g. `ls`
  - `description`: string - Human-readable label for the UOM. Present only for Procore standard UOMs; null for custom UOMs. e.g. `Lump Sum`
  - `uom_category`: object - The UOM Category associated with the failed UOM, if available.
    - `id`: integer (required) - Numeric identifier of the UOM Category. e.g. `202`
    - `name`: string (required) - Name of the UOM Category. One of Procore's standard categories: `time`, `amount`, `length`, `area`, `volume`, `mass`, `other`. e.g. `time`
  - `errors`: object - Validation errors keyed by field name. Each value is an array of human-readable error messages. The `base` key holds row-level errors not tied to a specific field (e.g., attempting to delete a Procore-provided standar...
    - `field_name`: array of string - Example error array for a single field. Replace `field_name` with the actual offending field key returned at runtime.

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

