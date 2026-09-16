# Procore API: Tax (Construction Financials)

Source: https://developers.procore.com/reference/rest/ (tool category: Tax)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Tax Codes](#tax-codes) - versions 1.0
- [Tax Types](#tax-types) - versions 1.0

## Tax Codes

Resource id: `tax-codes`. Raw spec: `../openapi-raw/tax-codes.json`. Web: https://developers.procore.com/reference/rest/tax-codes?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/tax_codes

**List Tax Codes**
Return a list of all Tax Codes for a given Company
When tax suport is enabled in Procore you can associate line items
with a specific Tax Code. The Tax Code (sometimes known as a Tax Group)
determines the tax rate to be applied to the line item for each Tax Type
defined in Procore (Note that presently Procore only supports a single
Tax Type per company).
You may define as many Tax Codes as required. Through the web interface, a
Procore admin user may identify one of these tax codes as the default
value to be shown when creating new line items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Expect number of items in response. min: 1, max: 100

Response 200 (application/json): array of object

- `id`: integer - The ID of the Tax Code e.g. `123`
- `code`: string - The Tax Code e.g. `GST@10%`
- `description`: string - Description of the Tax Code e.g. `Goods and Services Tax`
- `origin_data`: string - Additional Third-party Metadata for the Tax Code. Note: This is a free-form text field. e.g. `{ parent_ids: [1,2] }`
- `origin_id`: string - The Third-party ID of the Tax Code e.g. `1VT-33778-013`
- `rate1`: number(float) - Rate to apply for first Tax Type e.g. `10`
- `archived`: boolean - Set to true if this tax code has been archived e.g. `false`
- `default_tax_code`: boolean - Set to true if this tax code is default tax code e.g. `false`
- `display_in_budget`: boolean - Whether this tax code should be displayed in budget views. Defaults to false. e.g. `false`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/tax_codes

**Create Tax Code**
Creates a Tax Code for a given Company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `tax_code`: object (required)
  - `code`: string (required) - The Tax Code e.g. `GST@10%`
  - `description`: string - The Description of the Tax Code e.g. `Goods and Services Tax`
  - `origin_data`: string - Additional Third-party Metadata for the Tax Code. Note: This is a free-form text field. e.g. `{ parent_ids: [1,2] }`
  - `origin_id`: string - The Third-party ID of the Tax Code e.g. `1VT-33778-013`
  - `rate1`: number(float) - Rate to apply for first Tax Type e.g. `10`
  - `archived`: boolean - Set to true if this tax code has been archived e.g. `false`
  - `default_tax_code`: boolean - Set to true if this tax code is default tax code e.g. `false`

Response 201 (application/json): object

- `id`: integer - The ID of the Tax Code e.g. `123`
- `code`: string - The Tax Code e.g. `GST@10%`
- `description`: string - Description of the Tax Code e.g. `Goods and Services Tax`
- `origin_data`: string - Additional Third-party Metadata for the Tax Code. Note: This is a free-form text field. e.g. `{ parent_ids: [1,2] }`
- `origin_id`: string - The Third-party ID of the Tax Code e.g. `1VT-33778-013`
- `rate1`: number(float) - Rate to apply for first Tax Type e.g. `10`
- `archived`: boolean - Set to true if this tax code has been archived e.g. `false`
- `default_tax_code`: boolean - Set to true if this tax code is default tax code e.g. `false`
- `display_in_budget`: boolean - Whether this tax code should be displayed in budget views. Defaults to false. e.g. `false`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/tax_codes/{id}

**Show Tax Code**
Show detailed information for a specific Tax Code

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string (required) - The Tax Code ID
- `company_id` [query] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - The ID of the Tax Code e.g. `123`
- `code`: string - The Tax Code e.g. `GST@10%`
- `description`: string - Description of the Tax Code e.g. `Goods and Services Tax`
- `origin_data`: string - Additional Third-party Metadata for the Tax Code. Note: This is a free-form text field. e.g. `{ parent_ids: [1,2] }`
- `origin_id`: string - The Third-party ID of the Tax Code e.g. `1VT-33778-013`
- `rate1`: number(float) - Rate to apply for first Tax Type e.g. `10`
- `archived`: boolean - Set to true if this tax code has been archived e.g. `false`
- `default_tax_code`: boolean - Set to true if this tax code is default tax code e.g. `false`
- `display_in_budget`: boolean - Whether this tax code should be displayed in budget views. Defaults to false. e.g. `false`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/tax_codes/{id}

**Update Tax Code**
Update a Tax Code's attributes

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string (required) - The Tax Code ID
- `company_id` [query] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `tax_code`: object (required)
  - `code`: string - The Tax Code e.g. `GST@10%`
  - `description`: string - The Description of the Tax Code e.g. `Goods and Services Tax`
  - `origin_data`: string - Additional Third-party Metadata for the Tax Code. Note: This is a free-form text field. e.g. `{ parent_ids: [1,2] }`
  - `origin_id`: string - The Third-party ID of the Tax Code e.g. `1VT-33778-013`
  - `rate1`: number(float) - Rate to apply for first Tax Type e.g. `10`
  - `archived`: boolean - Set to true if this tax code has been archived e.g. `false`
  - `default_tax_code`: boolean - Set to true if this tax code is default tax code e.g. `false`

Response 200 (application/json): object

- `id`: integer - The ID of the Tax Code e.g. `123`
- `code`: string - The Tax Code e.g. `GST@10%`
- `description`: string - Description of the Tax Code e.g. `Goods and Services Tax`
- `origin_data`: string - Additional Third-party Metadata for the Tax Code. Note: This is a free-form text field. e.g. `{ parent_ids: [1,2] }`
- `origin_id`: string - The Third-party ID of the Tax Code e.g. `1VT-33778-013`
- `rate1`: number(float) - Rate to apply for first Tax Type e.g. `10`
- `archived`: boolean - Set to true if this tax code has been archived e.g. `false`
- `default_tax_code`: boolean - Set to true if this tax code is default tax code e.g. `false`
- `display_in_budget`: boolean - Whether this tax code should be displayed in budget views. Defaults to false. e.g. `false`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/tax_codes/sync

**Sync Tax Codes**
This endpoint creates or updates a batch of Tax Codes

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `company_id`: integer (required) - Company ID
- `updates`: array of object (required)
  - `id`: integer - The ID of the Tax Code. REQUIRED if 'origin_id' is not provided. e.g. `123`
  - `code`: string - The Tax Code e.g. `GST@10%`
  - `description`: string - The Description of the Tax Code e.g. `Goods and Services Tax`
  - `origin_data`: string - Additional Third-party Metadata for the Tax Code. Note: This is a free-form text field. e.g. `{ parent_ids: [1,2] }`
  - `origin_id`: string - The Third-party ID of the Tax Code. REQUIRED on update if 'id' is not provided. e.g. `1VT-33778-013`
  - `rate1`: number(float) - Rate to apply for first Tax Type e.g. `10`
  - `archived`: boolean - Set to true if this tax code has been archived e.g. `false`
  - `default_tax_code`: boolean - Set to true if this tax code is default tax code e.g. `false`

Response 200 (application/json): object

- `entities`: array of object
  - `id`: integer - The ID of the Tax Code e.g. `123`
  - `code`: string - The Tax Code e.g. `GST@10%`
  - `description`: string - Description of the Tax Code e.g. `Goods and Services Tax`
  - `origin_data`: string - Additional Third-party Metadata for the Tax Code. Note: This is a free-form text field. e.g. `{ parent_ids: [1,2] }`
  - `origin_id`: string - The Third-party ID of the Tax Code e.g. `1VT-33778-013`
  - `rate1`: number(float) - Rate to apply for first Tax Type e.g. `10`
  - `archived`: boolean - Set to true if this tax code has been archived e.g. `false`
  - `default_tax_code`: boolean - Set to true if this tax code is default tax code e.g. `false`
  - `display_in_budget`: boolean - Whether this tax code should be displayed in budget views. Defaults to false. e.g. `false`
- `errors`: array of object
  - `id`: integer - The ID of the Tax Code e.g. `123`
  - `code`: string - The Tax Code e.g. `GST@10%`
  - `description`: string - Description of the Tax Code e.g. `Goods and Services Tax`
  - `origin_data`: string - Additional Third-party Metadata for the Tax Code. Note: This is a free-form text field. e.g. `{ parent_ids: [1,2] }`
  - `origin_id`: string - The Third-party ID of the Tax Code e.g. `1VT-33778-013`
  - `rate1`: number(float) - Rate to apply for first Tax Type e.g. `10`
  - `archived`: boolean - Set to true if this tax code has been archived e.g. `false`
  - `default_tax_code`: boolean - Set to true if this tax code is default tax code e.g. `false`
  - `display_in_budget`: boolean - Whether this tax code should be displayed in budget views. Defaults to false. e.g. `false`
  - `errors`: object
    - `field_name`: array of string

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Tax Types

Resource id: `tax-types`. Raw spec: `../openapi-raw/tax-types.json`. Web: https://developers.procore.com/reference/rest/tax-types?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/tax_types

**List Tax Types**
Return a list of all Tax Types for a given Company
A Tax Type represents a "value added tax" or "goods and services tax"
which needs to be accounted for on a commitment or an invoice generated
by Procore. In many places there will just be a single tax to deal with,
for example in Australia it will be GST, in the UK it will be VAT.
Other countries may require that multiple taxes are displayed,
for example in Canada an invoice may be required to include both GST and PST.
Procore currently only supports the definition of one tax type per company.
Tax support can be enabled at the company level by an admin user though the
web interface. Once enabled at the company level, tax support can also be
enabled or disabled at the project level. When tax support is enabled at
the company level, it is disabled for existing projects, but by default
will be enabled for new projects. An admin user can change these settings
through the web interface.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - The ID of the Tax Type e.g. `123`
- `description`: string - Description of the Tax Type e.g. `Goods and Services Tax`
- `name`: string - The Name of the Tax Type e.g. `GST`
- `origin_data`: string - Additional Third-party Metadata for the Tax Type. Note: This is a free-form text field. e.g. `{ parent_ids: [1,2] }`
- `origin_id`: string - The Third-party ID of the Tax Type e.g. `1VT-33778-013`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/tax_types

**Create Tax Type**
Creates a Tax Type on a given Company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `tax_type`: object (required)
  - `description`: string - The Description of the Tax Type e.g. `Goods and Services Tax`
  - `name`: string (required) - The Name of the Tax Type e.g. `GST`
  - `origin_data`: string - Additional Third-party Metadata for the Tax Type. Note: This is a free-form text field. e.g. `{ parent_ids: [1,2] }`
  - `origin_id`: string - The Third-party ID of the Tax Type e.g. `1VT-33778-013`

Response 201 (application/json): object

- `id`: integer - The ID of the Tax Type e.g. `123`
- `description`: string - Description of the Tax Type e.g. `Goods and Services Tax`
- `name`: string - The Name of the Tax Type e.g. `GST`
- `origin_data`: string - Additional Third-party Metadata for the Tax Type. Note: This is a free-form text field. e.g. `{ parent_ids: [1,2] }`
- `origin_id`: string - The Third-party ID of the Tax Type e.g. `1VT-33778-013`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/tax_types/{id}

**Show Tax Type**
Show detailed information for a specific Tax Type

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string (required) - The Tax Type ID
- `company_id` [query] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - The ID of the Tax Type e.g. `123`
- `description`: string - Description of the Tax Type e.g. `Goods and Services Tax`
- `name`: string - The Name of the Tax Type e.g. `GST`
- `origin_data`: string - Additional Third-party Metadata for the Tax Type. Note: This is a free-form text field. e.g. `{ parent_ids: [1,2] }`
- `origin_id`: string - The Third-party ID of the Tax Type e.g. `1VT-33778-013`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/tax_types/{id}

**Update Tax Type**
Update a Tax Type's attributes

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string (required) - The Tax Type ID
- `company_id` [query] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `tax_type`: object (required)
  - `description`: string - The Description of the Tax Type e.g. `Goods and Services Tax`
  - `name`: string - The Name of the Tax Type e.g. `GST`
  - `origin_data`: string - Additional Third-party Metadata for the Tax Type. Note: This is a free-form text field. e.g. `{ parent_ids: [1,2] }`
  - `origin_id`: string - The Third-party ID of the Tax Type e.g. `1VT-33778-013`

Response 200 (application/json): object

- `id`: integer - The ID of the Tax Type e.g. `123`
- `description`: string - Description of the Tax Type e.g. `Goods and Services Tax`
- `name`: string - The Name of the Tax Type e.g. `GST`
- `origin_data`: string - Additional Third-party Metadata for the Tax Type. Note: This is a free-form text field. e.g. `{ parent_ids: [1,2] }`
- `origin_id`: string - The Third-party ID of the Tax Type e.g. `1VT-33778-013`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/tax_types/{id}

**Delete Tax Type**
Delete a Tax Type

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string (required) - The Tax Type ID
- `company_id` [query] integer (required) - Unique identifier for the company.

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/tax_types/sync

**Sync Tax Types**
This endpoint creates or updates a batch of Tax Types

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `company_id`: integer (required) - Company ID
- `updates`: array of object (required)
  - `id`: integer - The ID of the Tax Type. REQUIRED if 'origin_id' is not provided. e.g. `123`
  - `description`: string - The Description of the Tax Type e.g. `Goods and Services Tax`
  - `name`: string - The Name of the Tax Type e.g. `GST`
  - `origin_data`: string - Additional Third-party Metadata for the Tax Type. Note: This is a free-form text field. e.g. `{ parent_ids: [1,2] }`
  - `origin_id`: string - The Third-party ID of the Tax Type. REQUIRED on update if 'id' is not provided. e.g. `1VT-33778-013`

Response 200 (application/json): object

- `entities`: array of object
  - `id`: integer - The ID of the Tax Type e.g. `123`
  - `description`: string - Description of the Tax Type e.g. `Goods and Services Tax`
  - `name`: string - The Name of the Tax Type e.g. `GST`
  - `origin_data`: string - Additional Third-party Metadata for the Tax Type. Note: This is a free-form text field. e.g. `{ parent_ids: [1,2] }`
  - `origin_id`: string - The Third-party ID of the Tax Type e.g. `1VT-33778-013`
- `errors`: array of object
  - `id`: integer - The ID of the Tax Type e.g. `123`
  - `description`: string - Description of the Tax Type e.g. `Goods and Services Tax`
  - `name`: string - The Name of the Tax Type e.g. `GST`
  - `origin_data`: string - Additional Third-party Metadata for the Tax Type. Note: This is a free-form text field. e.g. `{ parent_ids: [1,2] }`
  - `origin_id`: string - The Third-party ID of the Tax Type e.g. `1VT-33778-013`
  - `errors`: object
    - `field_name`: array of string

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

