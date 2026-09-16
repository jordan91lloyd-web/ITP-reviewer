# Procore API: Bid Management (Preconstruction)

Source: https://developers.procore.com/reference/rest/ (tool category: Bid Management)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Bid Contacts](#bid-contacts) - versions 1.0
- [Bid Form Items](#bid-form-items) - versions 1.0
- [Bid Form Sections](#bid-form-sections) - versions 1.0
- [Bid Forms](#bid-forms) - versions 1.1, 1.0
- [Bid Package Documents](#bid-package-documents) - versions 1.0
- [Bid Uploads](#bid-uploads) - versions 1.0
- [Bids](#bids) - versions 2.0, 1.2, 1.1, 1.0
- [Company Bid Forms](#company-bid-forms) - versions 1.0
- [Company Bid Packages](#company-bid-packages) - versions 1.0
- [Project Area Bids](#project-area-bids) - versions 2.0
- [Project Bid Packages](#project-bid-packages) - versions 1.1, 1.0

## Bid Contacts

Resource id: `bid-contacts`. Raw spec: `../openapi-raw/bid-contacts.json`. Web: https://developers.procore.com/reference/rest/bid-contacts?version=latest
Product lines: PM Essentials, Construction Financials

### GET /rest/v1.0/projects/{project_id}/bid_contacts

**List Bid Contacts**
Get a list of all the contacts of a company or contacts of a perticular vendor of the company (with vendor_id as a parameter). 
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[vendor_id]` [query] array of integer - Return item(s) with the specified Vendor IDs.
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.
- `filters[trade_id][]` [query] array of integer - Returns users whose vendor record is associated with the specified trade id(s).
- `filters[search]` [query] string - Return users where the search string matches the user's first name, last name, email address, keywords, job title, or company name
- `sort` [query] string enum[name, vendor_name, permission_template, full_name] - Return items with the specified sort.

Response 200 (application/json): array of object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `contact_id`: integer - User Contact ID e.g. `1`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `erp_integrated_accountant`: boolean - User ERP integrated accountant status e.g. `true`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_activated_at`: string(date-time) - User last activated at e.g. `2016-06-30T20:41:58Z`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Jane Doe`
- `notes`: string - User notes e.g. `notes`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `welcome_email_sent_at`: string(date-time) - User welcome email sent at e.g. `2013-05-30T20:41:58Z`
- `zip`: string - User zip code e.g. `93013`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `party_id`: integer - The Directory Party ID for this user, resolved via Contact → Person → Party. Null when the user has no associated person record. Use this ID when calling endpoints that require a party identifier (e.g. certification a... e.g. `12345`
- `permission_template`: object
  - `id`: integer - Unique identifier for the Permission Template e.g. `1`
  - `name`: string - The name of the Permission Template e.g. `General Contractor`
  - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
  - `type`: string enum[company_tools, global, project_specific] - The type of the Permission Template
- `company_permission_template`: object
  - `id`: integer - Unique identifier for the Permission Template e.g. `1`
  - `name`: string - The name of the Permission Template e.g. `General Contractor`
  - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
  - `type`: string enum[company_tools, global, project_specific] - The type of the Permission Template
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Bid Form Items

Resource id: `bid-form-items`. Raw spec: `../openapi-raw/bid-form-items.json`. Web: https://developers.procore.com/reference/rest/bid-form-items?version=latest
Product lines: Preconstruction

### DELETE /rest/v1.0/projects/{project_id}/bid_packages/{bid_package_id}/bid_form_items/{bid_form_item_id}

**Delete Bid Form Item**
Delete single Bid Form Item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `bid_form_item_id` [path] integer (required) - Bid Form Item ID

Response 204: No content (no body)

Error responses: 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Bid Form Sections

Resource id: `bid-form-sections`. Raw spec: `../openapi-raw/bid-form-sections.json`. Web: https://developers.procore.com/reference/rest/bid-form-sections?version=latest
Product lines: Preconstruction

### DELETE /rest/v1.0/projects/{project_id}/bid_packages/{bid_package_id}/bid_form_sections/{bid_form_section_id}

**Delete Bid Form Section**
Delete single Bid Form Section.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `bid_form_section_id` [path] integer (required) - Bid Form Section ID

Response 204: No content (no body)

Error responses: 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Bid Forms

Resource id: `bid-forms`. Raw spec: `../openapi-raw/bid-forms.json`. Web: https://developers.procore.com/reference/rest/bid-forms?version=latest
Product lines: Preconstruction

### POST /rest/v1.1/projects/{project_id}/bid_packages/{bid_package_id}/bid_forms

**Create a Bid Form**
Create a Bid Form for a Bid Package. A bid form is needed to submit a bid, since the bid will be made against the bid form.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID

Request body (application/json) (required):

- `title`: string (required) - Bid Form Title e.g. `Concrete`
- `proposal_id`: integer - Proposal ID e.g. `1234`
- `lock_unit_fields_base_bid`: boolean - Lock unit fields for all base bid items. Must be sent explicitly (no inheritance from bid package). Defaults to false if not provided. e.g. `false`
- `lock_quantity_fields_base_bid`: boolean - Lock quantity fields for all base bid items. Must be sent explicitly (no inheritance from bid package). Defaults to false if not provided. e.g. `false`
- `lock_unit_fields_alternates`: boolean - Lock unit fields for all alternate items. Must be sent explicitly (no inheritance from bid package). Defaults to false if not provided. e.g. `false`
- `lock_quantity_fields_alternates`: boolean - Lock quantity fields for all alternate items. Must be sent explicitly (no inheritance from bid package). Defaults to false if not provided. e.g. `false`
- `base_bid`: array of object - Base Bids
  - `title`: string - Base Bid Form Item Title e.g. `Concrete`
  - `position`: integer - Position e.g. `1`
  - `header`: boolean - Whether the item is a header or not e.g. `true`
  - `bid_form_items`: array of object - Bid Form Items
    - `cost_code_id`: integer - Cost Code ID e.g. `1`
    - `description`: string - Bid Form Item Description e.g. `Concrete`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Optional; when provided for any child of a section it must be provi... e.g. `2`
    - `subject`: string - Subject for Plain Text Items. e.g. `Is the insurance of tools included in the Bid?`
    - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
    - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
    - `estimated_amount`: number(double) - Amount from the Layer of an Estimate e.g. `1000`
    - `estimated_quantity`: number(double) - Quantity from the Layer of an Estimate e.g. `10`
    - `estimated_unit_of_measure`: string - Unit of Measure from the Layer of an Estimate e.g. `Cubic Yard`
    - `estimated_unit_cost`: number(double) - Estimated Unit from the Layer of an Estimate e.g. `100`
    - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
    - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
    - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`
  - `sub_sections`: array of object - Sub Sections
    - `title`: string - Sub Section Title e.g. `Floors 10-19`
    - `content_position`: integer - Position of this sub section in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Optional; when provided for any child of a section it must b... e.g. `3`
    - `bid_form_items`: array of object - Bid Form Items
      - `cost_code_id`: integer - Cost Code ID e.g. `1`
      - `description`: string - Bid Form Item Description e.g. `Concrete`
      - `position`: integer - Position e.g. `1`
      - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Optional; when provided for any child of a section it must be provi... e.g. `2`
      - `subject`: string - Subject for Plain Text Items. e.g. `Is the insurance of tools included in the Bid?`
      - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
      - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
      - `estimated_amount`: number(double) - Amount from the Layer of an Estimate e.g. `1000`
      - `estimated_quantity`: number(double) - Quantity from the Layer of an Estimate e.g. `10`
      - `estimated_unit_of_measure`: string - Unit of Measure from the Layer of an Estimate e.g. `Cubic Yard`
      - `estimated_unit_cost`: number(double) - Estimated Unit from the Layer of an Estimate e.g. `100`
      - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
      - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
      - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`
- `alternates`: array of object - Alternate bids
  - `title`: string - Alternate Bid Form Item Title e.g. `Flooring`
  - `position`: integer - Position e.g. `1`
  - `header`: boolean - Whether the item is a header or not e.g. `true`
  - `bid_form_items`: array of object - Bid Form Items
    - `cost_code_id`: integer - Cost Code ID e.g. `1`
    - `description`: string - Bid Form Item Description e.g. `Concrete`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Optional; when provided for any child of a section it must be provi... e.g. `2`
    - `subject`: string - Subject for Plain Text Items. e.g. `Is the insurance of tools included in the Bid?`
    - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
    - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
    - `estimated_amount`: number(double) - Amount from the Layer of an Estimate e.g. `1000`
    - `estimated_quantity`: number(double) - Quantity from the Layer of an Estimate e.g. `10`
    - `estimated_unit_of_measure`: string - Unit of Measure from the Layer of an Estimate e.g. `Cubic Yard`
    - `estimated_unit_cost`: number(double) - Estimated Unit from the Layer of an Estimate e.g. `100`
    - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
    - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
    - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`
  - `sub_sections`: array of object - Sub Sections
    - `title`: string - Sub Section Title e.g. `Floors 10-19`
    - `content_position`: integer - Position of this sub section in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Optional; when provided for any child of a section it must b... e.g. `3`
    - `bid_form_items`: array of object - Bid Form Items
      - `cost_code_id`: integer - Cost Code ID e.g. `1`
      - `description`: string - Bid Form Item Description e.g. `Concrete`
      - `position`: integer - Position e.g. `1`
      - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Optional; when provided for any child of a section it must be provi... e.g. `2`
      - `subject`: string - Subject for Plain Text Items. e.g. `Is the insurance of tools included in the Bid?`
      - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
      - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
      - `estimated_amount`: number(double) - Amount from the Layer of an Estimate e.g. `1000`
      - `estimated_quantity`: number(double) - Quantity from the Layer of an Estimate e.g. `10`
      - `estimated_unit_of_measure`: string - Unit of Measure from the Layer of an Estimate e.g. `Cubic Yard`
      - `estimated_unit_cost`: number(double) - Estimated Unit from the Layer of an Estimate e.g. `100`
      - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
      - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
      - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`

Response 201 (application/json): object

- `id`: integer - ID e.g. `75414`
- `title`: string - Bid Form Title e.g. `Concrete`
- `proposal_id`: integer - Proposal ID e.g. `1`
- `base_bid`: array of object
  - `id`: integer - ID e.g. `1234`
  - `title`: string - Bid Form Title e.g. `Concrete`
  - `position`: integer - Position e.g. `1`
  - `header`: boolean - Whether the item is a header or not e.g. `true`
  - `bid_form_items`: array of object
    - `id`: integer - ID e.g. `18`
    - `cost_code`: object
    - `description`: string - Bid Form Item Description e.g. `Wood Doors`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `2`
    - `subject`: string - Subject for Plain Text Items e.g. `Is the insurance of tools included in the Bid?`
    - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
    - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
    - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
    - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
    - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`
  - `sub_sections`: array of object
    - `id`: integer - ID e.g. `1234`
    - `title`: string - Sub Section Title e.g. `Floors 10-19`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this sub section in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `3`
    - `bid_form_items`: array of object - Bid Form Items
- `alternates`: array of object
  - `id`: integer - ID e.g. `1235`
  - `title`: string - Bid Form Title e.g. `Concrete`
  - `position`: integer - Position e.g. `1`
  - `header`: boolean - Whether the item is a header or not e.g. `true`
  - `bid_form_items`: array of object
    - `id`: integer - ID e.g. `18`
    - `cost_code`: object
    - `description`: string - Bid Form Item Description e.g. `Wood Doors`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `2`
    - `subject`: string - Subject for Plain Text Items e.g. `Is the insurance of tools included in the Bid?`
    - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
    - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
    - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
    - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
    - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`
  - `sub_sections`: array of object
    - `id`: integer - ID e.g. `1234`
    - `title`: string - Sub Section Title e.g. `Floors 10-19`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this sub section in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `3`
    - `bid_form_items`: array of object - Bid Form Items

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/bid_packages/{bid_package_id}/bid_forms/{bid_form_id}

**Update Bid Form**
Update single Bid Form.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `bid_form_id` [path] integer (required) - Bid Form ID

Request body (application/json) (required):

- `title`: string (required) - Bid Form Title e.g. `Concrete`
- `proposal_id`: integer - Proposal ID e.g. `1`
- `lock_unit_fields_base_bid`: boolean - Lock unit fields for all base bid items e.g. `false`
- `lock_quantity_fields_base_bid`: boolean - Lock quantity fields for all base bid items e.g. `false`
- `lock_unit_fields_alternates`: boolean - Lock unit fields for all alternate items e.g. `false`
- `lock_quantity_fields_alternates`: boolean - Lock quantity fields for all alternate items e.g. `false`
- `base_bid`: array of object - Base Bids
  - `title`: string - Base Bid Form Item Title e.g. `Concrete`
  - `position`: integer - Position e.g. `1`
  - `header`: boolean - Whether the item is a header or not e.g. `true`
  - `bid_form_items`: array of object - Bid Form Items
    - `id`: integer - ID e.g. `1235`
    - `cost_code_id`: integer - Cost Code ID e.g. `1`
    - `description`: string - Bid Form Item Description e.g. `Concrete`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Optional; when provided for any child of a section it must be provi... e.g. `2`
    - `subject`: string - Subject for Plain Text Items. e.g. `Is the insurance of tools included in the Bid?`
    - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
    - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
    - `estimated_amount`: number(double) - Amount from the Layer of an Estimate e.g. `1000`
    - `estimated_quantity`: number(double) - Quantity from the Layer of an Estimate e.g. `10`
    - `estimated_unit_of_measure`: string - Unit of Measure from the Layer of an Estimate e.g. `Cubic Yard`
    - `estimated_unit_cost`: number(double) - Estimated Unit from the Layer of an Estimate e.g. `100`
    - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
    - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
    - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`
  - `sub_sections`: array of object - Sub Sections
    - `id`: integer - ID e.g. `1235`
    - `title`: string - Sub Section Title e.g. `Floors 10-19`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this sub section in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Optional; when provided for any child of a section it must b... e.g. `3`
    - `bid_form_items`: array of object - Bid Form Items
      - `cost_code_id`: integer - Cost Code ID e.g. `1`
      - `description`: string - Bid Form Item Description e.g. `Concrete`
      - `position`: integer - Position e.g. `1`
      - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Optional; when provided for any child of a section it must be provi... e.g. `2`
      - `subject`: string - Subject for Plain Text Items. e.g. `Is the insurance of tools included in the Bid?`
      - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
      - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
      - `estimated_amount`: number(double) - Amount from the Layer of an Estimate e.g. `1000`
      - `estimated_quantity`: number(double) - Quantity from the Layer of an Estimate e.g. `10`
      - `estimated_unit_of_measure`: string - Unit of Measure from the Layer of an Estimate e.g. `Cubic Yard`
      - `estimated_unit_cost`: number(double) - Estimated Unit from the Layer of an Estimate e.g. `100`
      - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
      - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
      - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`
- `alternates`: array of object - Alternate bids
  - `title`: string - Alternate Bid Form Item Title e.g. `Flooring`
  - `position`: integer - Position e.g. `1`
  - `header`: boolean - Whether the item is a header or not e.g. `true`
  - `bid_form_items`: array of object - Bid Form Items
    - `id`: integer - ID e.g. `1235`
    - `cost_code_id`: integer - Cost Code ID e.g. `1`
    - `description`: string - Bid Form Item Description e.g. `Concrete`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Optional; when provided for any child of a section it must be provi... e.g. `2`
    - `subject`: string - Subject for Plain Text Items. e.g. `Is the insurance of tools included in the Bid?`
    - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
    - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
    - `estimated_amount`: number(double) - Amount from the Layer of an Estimate e.g. `1000`
    - `estimated_quantity`: number(double) - Quantity from the Layer of an Estimate e.g. `10`
    - `estimated_unit_of_measure`: string - Unit of Measure from the Layer of an Estimate e.g. `Cubic Yard`
    - `estimated_unit_cost`: number(double) - Estimated Unit from the Layer of an Estimate e.g. `100`
    - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
    - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
    - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`
  - `sub_sections`: array of object - Sub Sections
    - `id`: integer - ID e.g. `1235`
    - `title`: string - Sub Section Title e.g. `Floors 10-19`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this sub section in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Optional; when provided for any child of a section it must b... e.g. `3`
    - `bid_form_items`: array of object - Bid Form Items
      - `cost_code_id`: integer - Cost Code ID e.g. `1`
      - `description`: string - Bid Form Item Description e.g. `Concrete`
      - `position`: integer - Position e.g. `1`
      - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Optional; when provided for any child of a section it must be provi... e.g. `2`
      - `subject`: string - Subject for Plain Text Items. e.g. `Is the insurance of tools included in the Bid?`
      - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
      - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
      - `estimated_amount`: number(double) - Amount from the Layer of an Estimate e.g. `1000`
      - `estimated_quantity`: number(double) - Quantity from the Layer of an Estimate e.g. `10`
      - `estimated_unit_of_measure`: string - Unit of Measure from the Layer of an Estimate e.g. `Cubic Yard`
      - `estimated_unit_cost`: number(double) - Estimated Unit from the Layer of an Estimate e.g. `100`
      - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
      - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
      - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `title`: string - Bid Form Title e.g. `Concrete`
- `proposal_id`: integer - Proposal ID e.g. `1`
- `base_bid`: array of object
  - `id`: integer - ID e.g. `1234`
  - `title`: string - Bid Form Title e.g. `Concrete`
  - `position`: integer - Position e.g. `1`
  - `header`: boolean - Whether the item is a header or not e.g. `true`
  - `bid_form_items`: array of object
    - `id`: integer - ID e.g. `18`
    - `cost_code`: object
    - `description`: string - Bid Form Item Description e.g. `Wood Doors`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `2`
    - `subject`: string - Subject for Plain Text Items e.g. `Is the insurance of tools included in the Bid?`
    - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
    - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
    - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
    - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
    - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`
  - `sub_sections`: array of object
    - `id`: integer - ID e.g. `1234`
    - `title`: string - Sub Section Title e.g. `Floors 10-19`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this sub section in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `3`
    - `bid_form_items`: array of object - Bid Form Items
- `alternates`: array of object
  - `id`: integer - ID e.g. `1235`
  - `title`: string - Bid Form Title e.g. `Concrete`
  - `position`: integer - Position e.g. `1`
  - `header`: boolean - Whether the item is a header or not e.g. `true`
  - `bid_form_items`: array of object
    - `id`: integer - ID e.g. `18`
    - `cost_code`: object
    - `description`: string - Bid Form Item Description e.g. `Wood Doors`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `2`
    - `subject`: string - Subject for Plain Text Items e.g. `Is the insurance of tools included in the Bid?`
    - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
    - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
    - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
    - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
    - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`
  - `sub_sections`: array of object
    - `id`: integer - ID e.g. `1234`
    - `title`: string - Sub Section Title e.g. `Floors 10-19`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this sub section in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `3`
    - `bid_form_items`: array of object - Bid Form Items

Error responses: 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/projects/{project_id}/bid_packages/{bid_package_id}/bid_forms/bulk_create  **[BETA]**

**Bulk Create Bid Forms**
Creates multiple Bid Forms in one request

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `completion_mode` [query] string enum[all_or_nothing, atomic] - Whether to update what can be or nothing if one can not be updated. Defaults to "all_or_nothing"
- `bid_package_id` [path] integer (required) - Bid Package ID

Request body (application/json) (required):

- `bid_forms`: array of object (required)
  - `title`: string (required) - Bid Form Title e.g. `Concrete`
  - `proposal_id`: integer - Proposal ID e.g. `1234`
  - `lock_unit_fields_base_bid`: boolean - Lock unit fields for all base bid items. Must be sent explicitly (no inheritance from bid package). Defaults to false if not provided. e.g. `false`
  - `lock_quantity_fields_base_bid`: boolean - Lock quantity fields for all base bid items. Must be sent explicitly (no inheritance from bid package). Defaults to false if not provided. e.g. `false`
  - `lock_unit_fields_alternates`: boolean - Lock unit fields for all alternate items. Must be sent explicitly (no inheritance from bid package). Defaults to false if not provided. e.g. `false`
  - `lock_quantity_fields_alternates`: boolean - Lock quantity fields for all alternate items. Must be sent explicitly (no inheritance from bid package). Defaults to false if not provided. e.g. `false`
  - `base_bid`: array of object - Base Bids
    - `title`: string - Base Bid Form Item Title e.g. `Concrete`
    - `position`: integer - Position e.g. `1`
    - `header`: boolean - Whether the item is a header or not e.g. `true`
    - `bid_form_items`: array of object - Bid Form Items
      - `cost_code_id`: integer - Cost Code ID e.g. `1`
      - `description`: string - Bid Form Item Description e.g. `Concrete`
      - `position`: integer - Position e.g. `1`
      - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Optional; when provided for any child of a section it must be provi... e.g. `2`
      - `subject`: string - Subject for Plain Text Items. e.g. `Is the insurance of tools included in the Bid?`
      - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
      - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
      - `estimated_amount`: number(double) - Amount from the Layer of an Estimate e.g. `1000`
      - `estimated_quantity`: number(double) - Quantity from the Layer of an Estimate e.g. `10`
      - `estimated_unit_of_measure`: string - Unit of Measure from the Layer of an Estimate e.g. `Cubic Yard`
      - `estimated_unit_cost`: number(double) - Estimated Unit from the Layer of an Estimate e.g. `100`
      - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
      - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
      - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`
    - `sub_sections`: array of object - Sub Sections
      - `title`: string - Sub Section Title e.g. `Floors 10-19`
      - `content_position`: integer - Position of this sub section in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Optional; when provided for any child of a section it must b... e.g. `3`
      - `bid_form_items`: array of object - Bid Form Items
        - `cost_code_id`: integer - Cost Code ID e.g. `1`
        - `description`: string - Bid Form Item Description e.g. `Concrete`
        - `position`: integer - Position e.g. `1`
        - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Optional; when provided for any child of a section it must be provi... e.g. `2`
        - `subject`: string - Subject for Plain Text Items. e.g. `Is the insurance of tools included in the Bid?`
        - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
        - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
        - `estimated_amount`: number(double) - Amount from the Layer of an Estimate e.g. `1000`
        - `estimated_quantity`: number(double) - Quantity from the Layer of an Estimate e.g. `10`
        - `estimated_unit_of_measure`: string - Unit of Measure from the Layer of an Estimate e.g. `Cubic Yard`
        - `estimated_unit_cost`: number(double) - Estimated Unit from the Layer of an Estimate e.g. `100`
        - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
        - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
        - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`
  - `alternates`: array of object - Alternate bids
    - `title`: string - Alternate Bid Form Item Title e.g. `Flooring`
    - `position`: integer - Position e.g. `1`
    - `header`: boolean - Whether the item is a header or not e.g. `true`
    - `bid_form_items`: array of object - Bid Form Items
      - `cost_code_id`: integer - Cost Code ID e.g. `1`
      - `description`: string - Bid Form Item Description e.g. `Concrete`
      - `position`: integer - Position e.g. `1`
      - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Optional; when provided for any child of a section it must be provi... e.g. `2`
      - `subject`: string - Subject for Plain Text Items. e.g. `Is the insurance of tools included in the Bid?`
      - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
      - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
      - `estimated_amount`: number(double) - Amount from the Layer of an Estimate e.g. `1000`
      - `estimated_quantity`: number(double) - Quantity from the Layer of an Estimate e.g. `10`
      - `estimated_unit_of_measure`: string - Unit of Measure from the Layer of an Estimate e.g. `Cubic Yard`
      - `estimated_unit_cost`: number(double) - Estimated Unit from the Layer of an Estimate e.g. `100`
      - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
      - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
      - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`
    - `sub_sections`: array of object - Sub Sections
      - `title`: string - Sub Section Title e.g. `Floors 10-19`
      - `content_position`: integer - Position of this sub section in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Optional; when provided for any child of a section it must b... e.g. `3`
      - `bid_form_items`: array of object - Bid Form Items
        - `cost_code_id`: integer - Cost Code ID e.g. `1`
        - `description`: string - Bid Form Item Description e.g. `Concrete`
        - `position`: integer - Position e.g. `1`
        - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Optional; when provided for any child of a section it must be provi... e.g. `2`
        - `subject`: string - Subject for Plain Text Items. e.g. `Is the insurance of tools included in the Bid?`
        - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
        - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
        - `estimated_amount`: number(double) - Amount from the Layer of an Estimate e.g. `1000`
        - `estimated_quantity`: number(double) - Quantity from the Layer of an Estimate e.g. `10`
        - `estimated_unit_of_measure`: string - Unit of Measure from the Layer of an Estimate e.g. `Cubic Yard`
        - `estimated_unit_cost`: number(double) - Estimated Unit from the Layer of an Estimate e.g. `100`
        - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
        - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
        - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`

Response 200 (application/json): array of array of object


Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/bid_packages/{bid_package_id}/bid_forms/export_forms  **[BETA]**

**Export Forms with Bids**
Download a summary of all Bid Forms and their Bids in the Bid Package. Vendors are resolved from both the project directory and PCN Business Registry.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `export_format` [query] string enum[csv] (required) - Export File Format
- `bid_form_id` [query] string - Bid Form ID

Response 200 (application/json): string


Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/bid_packages/{bid_package_id}/bid_forms/{bid_form_id}/bid_leveling

**Bid Level across a Bid Form**
Compare all bids submitted to a bid form

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `bid_form_id` [path] integer (required) - Bid Form ID
- `export_format` [query] string enum[csv] - Export File Format

Response 200 (application/json): oneOf(object | string)


Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/bid_packages/{bid_package_id}/bid_forms

**Index Bid Forms**
Fetches a list of Bid Forms for a Bid Package

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `excluded_bid_form_id` [query] integer - Bid Form Id to exclude
- `view` [query] string enum[use_previous_bidders] - View that enables Use Previous Bidders functionality and provides project and bid package name
- `search` [query] string - Search for a bid form
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[title] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of oneOf(object | object)


Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/bid_packages/{bid_package_id}/bid_forms

**Create a Bid Form**
Create a Bid Form for a Bid Package. A bid form is needed to submit a bid, since the bid will be made against the bid form.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID

Request body (application/json) (required):

- `title`: string (required) - Bid Form Title e.g. `Concrete`
- `base_bid`: array of object - Base Bids
  - `title`: string - Base Bid Form Item Title e.g. `Concrete`
  - `position`: integer - Position e.g. `1`
  - `header`: boolean - Whether the item is a header or not e.g. `true`
  - `bid_form_items`: array of object - Bid Form Items
    - `cost_code_id`: integer - Cost Code ID e.g. `1`
    - `description`: string - Bid Form Item Description e.g. `Concrete`
    - `position`: integer - Position e.g. `1`
    - `subject`: string - Subject for Plain Text Items. e.g. `Is the insurance of tools included in the Bid?`
    - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
- `alternates`: array of object - Alternate bids
  - `title`: string - Alternate Bid Form Item Title e.g. `Flooring`
  - `position`: integer - Position e.g. `1`
  - `header`: boolean - Whether the item is a header or not e.g. `true`
  - `bid_form_items`: array of object - Bid Form Items
    - `cost_code_id`: integer - Cost Code ID e.g. `2`
    - `description`: string - Bid Form Item Description e.g. `Wood Floors`
    - `position`: integer - Position e.g. `1`
    - `subject`: string - Subject for Plain Text Items e.g. `Is the insurance of tools included in the Bid?`
    - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.

Response 201 (application/json): object

- `id`: integer - ID e.g. `75414`
- `title`: string - Bid Form Title e.g. `Concrete`
- `position`: integer - Display order position within the bid package e.g. `1`
- `proposal_id`: integer - Proposal ID e.g. `4321`
- `lock_unit_fields_base_bid`: boolean - Lock unit fields for all base bid items in this form e.g. `false`
- `lock_quantity_fields_base_bid`: boolean - Lock quantity fields for all base bid items in this form e.g. `false`
- `lock_unit_fields_alternates`: boolean - Lock unit fields for all alternate items in this form e.g. `false`
- `lock_quantity_fields_alternates`: boolean - Lock quantity fields for all alternate items in this form e.g. `false`
- `base_bid`: array of object
  - `id`: integer - ID e.g. `1234`
  - `title`: string - Bid Form Title e.g. `Concrete`
  - `position`: integer - Position e.g. `1`
  - `header`: boolean - Whether the item is a header or not e.g. `true`
  - `bid_form_items`: array of object
    - `id`: integer - ID e.g. `18`
    - `cost_code`: object
    - `description`: string - Bid Form Item Description e.g. `Wood Doors`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `2`
    - `subject`: string - Subject for Plain Text Items e.g. `Is the insurance of tools included in the Bid?`
    - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
    - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
    - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
    - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
    - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`
  - `sub_sections`: array of object
    - `id`: integer - ID e.g. `1234`
    - `title`: string - Sub Section Title e.g. `Floors 10-19`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this sub section in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `3`
    - `bid_form_items`: array of object - Bid Form Items
- `alternates`: array of object
  - `id`: integer - ID e.g. `1235`
  - `title`: string - Bid Form Title e.g. `Concrete`
  - `position`: integer - Position e.g. `1`
  - `header`: boolean - Whether the item is a header or not e.g. `true`
  - `bid_form_items`: array of object
    - `id`: integer - ID e.g. `18`
    - `cost_code`: object
    - `description`: string - Bid Form Item Description e.g. `Wood Doors`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `2`
    - `subject`: string - Subject for Plain Text Items e.g. `Is the insurance of tools included in the Bid?`
    - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
    - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
    - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
    - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
    - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`
  - `sub_sections`: array of object
    - `id`: integer - ID e.g. `1234`
    - `title`: string - Sub Section Title e.g. `Floors 10-19`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this sub section in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `3`
    - `bid_form_items`: array of object - Bid Form Items

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/bid_packages/{bid_package_id}/bid_forms/{bid_form_id}

**View Bid Form**
View single Bid Form.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `bid_form_id` [path] integer (required) - Bid Form ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `title`: string - Bid Form Title e.g. `Concrete`
- `position`: integer - Display order position within the bid package e.g. `1`
- `proposal_id`: integer - Proposal ID e.g. `4321`
- `lock_unit_fields_base_bid`: boolean - Lock unit fields for all base bid items in this form e.g. `false`
- `lock_quantity_fields_base_bid`: boolean - Lock quantity fields for all base bid items in this form e.g. `false`
- `lock_unit_fields_alternates`: boolean - Lock unit fields for all alternate items in this form e.g. `false`
- `lock_quantity_fields_alternates`: boolean - Lock quantity fields for all alternate items in this form e.g. `false`
- `base_bid`: array of object
  - `id`: integer - ID e.g. `1234`
  - `title`: string - Bid Form Title e.g. `Concrete`
  - `position`: integer - Position e.g. `1`
  - `header`: boolean - Whether the item is a header or not e.g. `true`
  - `bid_form_items`: array of object
    - `id`: integer - ID e.g. `18`
    - `cost_code`: object
    - `description`: string - Bid Form Item Description e.g. `Wood Doors`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `2`
    - `subject`: string - Subject for Plain Text Items e.g. `Is the insurance of tools included in the Bid?`
    - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
    - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
    - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
    - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
    - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`
  - `sub_sections`: array of object
    - `id`: integer - ID e.g. `1234`
    - `title`: string - Sub Section Title e.g. `Floors 10-19`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this sub section in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `3`
    - `bid_form_items`: array of object - Bid Form Items
- `alternates`: array of object
  - `id`: integer - ID e.g. `1235`
  - `title`: string - Bid Form Title e.g. `Concrete`
  - `position`: integer - Position e.g. `1`
  - `header`: boolean - Whether the item is a header or not e.g. `true`
  - `bid_form_items`: array of object
    - `id`: integer - ID e.g. `18`
    - `cost_code`: object
    - `description`: string - Bid Form Item Description e.g. `Wood Doors`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `2`
    - `subject`: string - Subject for Plain Text Items e.g. `Is the insurance of tools included in the Bid?`
    - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
    - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
    - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
    - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
    - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`
  - `sub_sections`: array of object
    - `id`: integer - ID e.g. `1234`
    - `title`: string - Sub Section Title e.g. `Floors 10-19`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this sub section in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `3`
    - `bid_form_items`: array of object - Bid Form Items

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/bid_packages/{bid_package_id}/bid_forms/{bid_form_id}

**Update Bid Form**
Update single Bid Form.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `bid_form_id` [path] integer (required) - Bid Form ID

Request body (application/json) (required):

- `title`: string (required) - Bid Form Title e.g. `Concrete`
- `base_bid`: array of object - Base Bids
  - `title`: string - Base Bid Form Item Title e.g. `Concrete`
  - `position`: integer - Position e.g. `1`
  - `header`: boolean - Whether the item is a header or not e.g. `true`
  - `bid_form_items`: array of object - Bid Form Items
    - `cost_code_id`: integer - Cost Code ID e.g. `1`
    - `description`: string - Bid Form Item Description e.g. `Concrete`
    - `position`: integer - Position e.g. `1`
    - `subject`: string - Subject for Plain Text Items. e.g. `Is the insurance of tools included in the Bid?`
    - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
- `alternates`: array of object - Alternate bids
  - `title`: string - Alternate Bid Form Item Title e.g. `Flooring`
  - `position`: integer - Position e.g. `1`
  - `header`: boolean - Whether the item is a header or not e.g. `true`
  - `bid_form_items`: array of object - Bid Form Items
    - `cost_code_id`: integer - Cost Code ID e.g. `2`
    - `description`: string - Bid Form Item Description e.g. `Wood Floors`
    - `position`: integer - Position e.g. `1`
    - `subject`: string - Subject for Plain Text Items e.g. `Is the insurance of tools included in the Bid?`
    - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `title`: string - Bid Form Title e.g. `Concrete`
- `position`: integer - Display order position within the bid package e.g. `1`
- `proposal_id`: integer - Proposal ID e.g. `4321`
- `lock_unit_fields_base_bid`: boolean - Lock unit fields for all base bid items in this form e.g. `false`
- `lock_quantity_fields_base_bid`: boolean - Lock quantity fields for all base bid items in this form e.g. `false`
- `lock_unit_fields_alternates`: boolean - Lock unit fields for all alternate items in this form e.g. `false`
- `lock_quantity_fields_alternates`: boolean - Lock quantity fields for all alternate items in this form e.g. `false`
- `base_bid`: array of object
  - `id`: integer - ID e.g. `1234`
  - `title`: string - Bid Form Title e.g. `Concrete`
  - `position`: integer - Position e.g. `1`
  - `header`: boolean - Whether the item is a header or not e.g. `true`
  - `bid_form_items`: array of object
    - `id`: integer - ID e.g. `18`
    - `cost_code`: object
    - `description`: string - Bid Form Item Description e.g. `Wood Doors`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `2`
    - `subject`: string - Subject for Plain Text Items e.g. `Is the insurance of tools included in the Bid?`
    - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
    - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
    - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
    - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
    - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`
  - `sub_sections`: array of object
    - `id`: integer - ID e.g. `1234`
    - `title`: string - Sub Section Title e.g. `Floors 10-19`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this sub section in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `3`
    - `bid_form_items`: array of object - Bid Form Items
- `alternates`: array of object
  - `id`: integer - ID e.g. `1235`
  - `title`: string - Bid Form Title e.g. `Concrete`
  - `position`: integer - Position e.g. `1`
  - `header`: boolean - Whether the item is a header or not e.g. `true`
  - `bid_form_items`: array of object
    - `id`: integer - ID e.g. `18`
    - `cost_code`: object
    - `description`: string - Bid Form Item Description e.g. `Wood Doors`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `2`
    - `subject`: string - Subject for Plain Text Items e.g. `Is the insurance of tools included in the Bid?`
    - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
    - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
    - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
    - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
    - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`
  - `sub_sections`: array of object
    - `id`: integer - ID e.g. `1234`
    - `title`: string - Sub Section Title e.g. `Floors 10-19`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this sub section in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `3`
    - `bid_form_items`: array of object - Bid Form Items

Error responses: 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/bid_packages/{bid_package_id}/bid_forms/{bid_form_id}

**Delete Bid Form**
Delete a single Bid Form and its associated Sections and Items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `bid_form_id` [path] integer (required) - Bid Form ID

Response 204: No content (no body)

Error responses: 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/bid_packages/{bid_package_id}/bid_forms/{bid_form_id}/bid_leveling  **[OLDER VERSION - a newer path version exists below/above]**

**Bid Level across a Bid Form**
Compare all bids submitted to a bid form

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `bid_form_id` [path] integer (required) - Bid Form ID
- `export_format` [query] string enum[csv] - Export File Format

Response 200 (application/json): oneOf(object | string)


Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Bid Package Documents

Resource id: `bid-package-documents`. Raw spec: `../openapi-raw/bid-package-documents.json`. Web: https://developers.procore.com/reference/rest/bid-package-documents?version=latest

### GET /rest/v1.0/companies/{company_id}/planroom/bid_packages/{bid_package_id}/documents

**Gets documents attached to Bid Package**
Returns list of all documents attached to Bid Package, with meta information about all drawings and PDM (Project Document Management) attachments. Supports optional pagination and sorting for PDM attachments via query parameters.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `pdm_page` [query] integer - Page number for paginating PDM attachments
- `pdm_per_page` [query] integer - Number of PDM attachments per page
- `pdm_sort_by` [query] string enum[document_revision_id, document_container_id, document_collection_id, created_at, updated_at] - Field to sort PDM attachments by
- `pdm_sort_order` [query] string enum[asc, desc] - Sort order for PDM attachments
- `pdm_search` [query] string - Search term to filter PDM attachments by document_revision_id

Response 200 (application/json): object

- `id`: integer - ID e.g. `101`
- `title`: string - Bid package title e.g. `Floor Bid Package`
- `files`: array of object - List of files, attached to the bid package
  - `size`: integer - Size of the file in bytes e.g. `17656`
  - `file_path`: string - Name of the file (as would be presented in bid package zip) e.g. `Bid_Drawings/Current/123-Sample-Plans.pdf`
  - `s3_source`: string - URI, where the file is accessible at. Could have limited lifetime e.g. `https://storage.procore.com/us-east-1/pro-core.com/prostore/file.pdf?sig=dead...`
  - `type`: string - type of the file e.g. `ZipManifests::BidDocsManifest::DrawingRevisionRow`
  - `drawing`: object - Metadata about drawing (if file is drawing)
    - `dpi`: number - DPI of the drawing e.g. `72`
    - `revision`: string - Revision property of the drawing e.g. `0`
    - `drawing_set_id`: number - ID of the drawing set e.g. `9`
    - `drawing_id`: number - ID of the drawing e.g. `309`
    - `width`: number - Width of the drawing, in pixels e.g. `4000`
    - `height`: number - Height of the drawing, in pixels e.g. `3000`
    - `png_s3_source`: string - URI, where the drawing, converted to PNG, is accessible at. Could have limited lifetime e.g. `https://storage.procore.com/us-east-1/pro-core.com/prostore/file.png?sig=dead...`
    - `thumbnail_url`: string - URI, where the drawing's thumbnail is accessible at. Could have limited lifetime e.g. `https://storage.procore.com/us-east-1/pro-core.com/prostore/thumbnail.png?sig...`
  - `pdm`: object - Metadata about PDM (Project Document Management) attachment (if file is a PDM document)
    - `id`: integer - ID of the PDM reference e.g. `1`
    - `document_revision_id`: string - Document revision ID (ULID) e.g. `01HZ8K9M2N3P4Q5R6S7T8U9V0W`
    - `document_container_id`: string - Document container ID (ULID) e.g. `01HZ8K9M2N3P4Q5R6S7T8U9V0Y`
    - `document_collection_id`: string - Document collection ID (ULID) e.g. `01HZ8K9M2N3P4Q5R6S7T8U9V0Z`
    - `document_revision`: object - Document revision data returned from Documents service
    - `attachment`: object - Attachment information for viewing the document
- `pdm_pagination`: object - Pagination metadata for PDM attachments (only included when pagination parameters are provided)
  - `current_page`: integer - Current page number e.g. `1`
  - `per_page`: integer - Number of items per page e.g. `10`
  - `total_count`: integer - Total number of PDM attachments e.g. `25`
  - `total_pages`: integer - Total number of pages e.g. `3`
  - `has_next_page`: boolean - Whether there is a next page e.g. `true`
  - `has_previous_page`: boolean - Whether there is a previous page e.g. `false`

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Bid Uploads

Resource id: `bid-uploads`. Raw spec: `../openapi-raw/bid-uploads.json`. Web: https://developers.procore.com/reference/rest/bid-uploads?version=latest
Product lines: Preconstruction

### GET /rest/v1.0/companies/{company_id}/bids/{bid_id}/uploads

**List Bid Uploads**
Fetches a list of Bid Uploads for a Bid

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `bid_id` [path] integer (required) - Bid ID

Response 200 (application/json): array of object

- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `name`: string - Bid Upload file name e.g. `test.pdf`
- `expired`: boolean - Bid Upload is expired e.g. `false`
- `links`: object - Path to uploaded file
  - `self`: string - Path to uploaded file e.g. `/123/company/bid/456/uploads/789"`
- `id`: integer - Upload ID e.g. `789`
- `uuid`: string - UUID e.g. `01FX7WP7FZECR4DSD18APQRT3E`
- `url`: string - URL of the storage e.g. `https://s3.amazonaws.com/test-location`
- `fields`: object - Properties to be passed to the storage for upload
  - `key`: string - Property to be passed to the storage for upload e.g. `companies/123/01FX7WP7FZECR4DSD18APQRT3E`
  - `filename`: string - Property to be passed to the storage for upload e.g. `test.pdf`
  - `policy`: string - Property to be passed to the storage for upload e.g. `a-base64-encoded-string`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Bids

Resource id: `bids`. Raw spec: `../openapi-raw/bids.json`. Web: https://developers.procore.com/reference/rest/bids?version=latest
Product lines: PM Essentials, Construction Financials

### GET /rest/v2.0/companies/{company_id}/bids  **[BETA]**

**List Bids within a Company**
Return a list of your assigned Bids within a Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Array of Bids
  - `id`: string - ID e.g. `75414`
  - `bid_package_id`: string - Bid Package ID e.g. `91011`
  - `bid_package_title`: string - Bid Package title e.g. `Test Bid documents email link from correspondence`
  - `bid_form_title`: string - Bid Form Title e.g. `Bid Form Title`
  - `bid_form_id`: string - Bid Form ID e.g. `12345`
  - `bid_status`: string enum[undecided, will_not_bid, will_bid, not_invited, submitted] - Bid status
  - `awarded`: boolean - Bid awarded to vendor e.g. `false`
  - `company_id`: string - Company ID e.g. `3355`
  - `invitation_last_sent_at`: string(date-time) - Date/time the Bid Package invitation was last sent e.g. `2012-10-23T21:39:40Z`
  - `is_bidder_committed`: boolean - Bidder committed e.g. `true`
  - `lump_sum_amount`: number(float) - Lump sum (overall) amount e.g. `200.5`
  - `lump_sum_enabled`: boolean - Lump sum bidding enabled e.g. `false`
  - `submitted`: boolean - Vendor submitted Bid e.g. `true`
  - `created_at`: string(date-time) - Date/time the Bid Package was created e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Date/time the Bid Package was last updated e.g. `2012-10-24T21:39:40Z`
  - `due_date`: string(date-time) - Due Date e.g. `2016-12-13T03:00:00Z`
  - `bidder_comments`: string - Comments e.g. `Test Bid`
  - `bid_requester`: object - Bid Requester Info
    - `company`: string - The bid requesters company name e.g. `Demo Company 1`
    - `contact`: string - The bid requester's contact information e.g. `John Doe ((503)744-3200 ext. 1234)`
    - `company_address`: string - Bid requesters company address e.g. `123 Campus Way Carpinteria, CA 91303`
    - `company_phone`: string - Bid requesters company phone e.g. `8051231234`
    - `company_website`: string - Bid requesters company website e.g. `https://www.procore.com/`
    - `email_address`: string - Bid requesters email_address e.g. `joe.doe@example.com`
    - `first_name`: string - Bid requesters first_name e.g. `Joe`
    - `last_name`: string - Bid requesters last_name e.g. `Doe`
    - `mobile_phone`: string - Bid requesters mobile number e.g. `8051231234`
    - `vendor_address`: string - Bid requesters company address e.g. `6309 Carpinteria Ave.`
    - `business_phone`: string - Bid requesters company phone number e.g. `8051231234`
    - `fax_number`: string - Bid requesters company fax number e.g. `8051231234`
  - `vendor`: object - Bid Vendor Info
    - `id`: string - ID e.g. `75414`
    - `name`: string - Name e.g. `Demo Company 1`
    - `avatar_url`: string - Link to avatar picture e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160422154654_production_3975...`
    - `trades`: string - List of trades for the vendor e.g. `General Conditions`
  - `project`: object - Project Info
    - `name`: string - Name e.g. `Project 1`
    - `address`: string - Address e.g. `One Space Way<br>Risa SB12<br>United States`
  - `nda_email_last_sent_at`: string(date-time) - Date/time the Bid Package invitation was last sent e.g. `2012-10-23T21:39:40Z`
  - `display_project_name`: boolean - Display project name e.g. `false`
  - `nda_first_name`: string - NDA first name e.g. `John`
  - `nda_last_name`: string - NDA last name e.g. `Doe`
  - `nda_updated_at`: string(date-time) - Date/time the NDA was last updated e.g. `2012-10-23T21:39:40Z`
  - `nda_status`: string enum[viewed, downloaded, signed, declined] - NDA status e.g. `viewed`
  - `nda_signed_at`: string(date-time) - Date/time the NDA was signed e.g. `2012-10-23T21:39:40Z`

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.2/projects/{project_id}/bid_packages/{bid_package_id}/bids/{id}  **[BETA]**

**Update a Bid from a Bid Package**
Update a Bid within a Bid Package. This v1.2 endpoint supports nullable directory-related identifiers (e.g. vendor.id) to accommodate PCN-based bidders.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `id` [path] integer (required) - ID

Request body (application/json) (required):

- `bid`: object
  - `lump_sum_amount`: number(float) - Lump sum (overall) amount e.g. `10000`
  - `bidder_comments`: string - Comments e.g. `Test Bid Comment`
  - `bidder_inclusion`: string - Inclusions e.g. `Include Concrete`
  - `bidder_exclusion`: string - Exclusions e.g. `Exclude Plumbing`
  - `bid_status`: string enum[not_invited, undecided, will_not_bid, will_bid, submitted, awarded] - This status is combination of the `invitation_last_sent_at`, `is_bidder_committed`, `submitted`, & `awarded` values. The `not_invited` status is the same as `invitation_last_sent_at` being null, `is_bidder_committed` ...
  - `is_bidder_committed`: boolean - Bidder committed e.g. `true`
  - `submitted`: boolean - Vendor submitted Bid e.g. `true`
  - `show_bid_in_estimating`: boolean - Show bid in Estimating e.g. `true`
  - `vendor_id`: integer - Vendor ID (optional, nullable for PCN-based bidders) e.g. `75414`
  - `prostore_file_ids`: array of integer - Array of Prostore File IDs for attachments e.g. `[1751318, 1837467]`
  - `recipient_ids`: array of integer - Array of Login IDs to add as recipients e.g. `[1751318, 1837467]`
  - `bid_items`: array of object - Bid Items for a Bid
    - `id`: number - ID e.g. `123124112`
    - `bid_form_item_id`: number - Bid Form Item ID e.g. `32780682`
    - `cost_code_id`: number - Cost Code ID e.g. `32780682`
    - `amount`: number - Amount e.g. `100000`
    - `unit_cost`: string - Unit Cost e.g. `900`
    - `quantity`: string - Quantity e.g. `15`
    - `uom`: string - Unit of Measure e.g. `pounds`
  - `bid_items_to_delete`: array of integer - IDs of Bid Items that need to be deleted e.g. `[1234324, 4992392]`

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `bid_package_id`: integer - Bid Package ID e.g. `91011`
- `bid_package_title`: string - Package Title e.g. `Test Bid Documents Email Link from Correspondence`
- `bid_form_title`: string - Bid Form Title e.g. `Bid Form Title`
- `awarded`: boolean - Bid awarded to vendor e.g. `false`
- `bidders_can_add_line_items`: boolean - Bidders can add line items e.g. `false`
- `bid_status`: string enum[not_invited, undecided, will_not_bid, will_bid, submitted, awarded] - This status is combination of the `invitation_last_sent_at`, `is_bidder_committed`, `submitted`, & `awarded` values. The `not_invited` status is the same as `invitation_last_sent_at` being null, `is_bidder_committed` ...
- `company_id`: integer - Company ID e.g. `2342`
- `invitation_last_sent_at`: string(date-time) - Date/time the Bid invitation was last sent e.g. `2012-10-23T21:39:40Z`
- `is_bidder_committed`: boolean - Bidder committed e.g. `true`
- `lump_sum_amount`: number(float) - Lump sum (overall) amount. It's an optional parameter when the blind bidding is on. e.g. `200.5`
- `lump_sum_enabled`: boolean - Lump sum bidding enabled e.g. `false`
- `submitted`: boolean - Vendor submitted bid e.g. `true`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `due_date`: string(date-time) - Due date e.g. `2016-12-13T03:00:00Z`
- `bidder_comments`: string - Comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `See Attached Proposal`
- `show_bid_in_estimating`: boolean - Show bid in Estimating e.g. `true`
- `bid_amount`: string(currency) - Bid amount e.g. `$1,000.00`
- `bid_requester`: object - Bid Requester Info
  - `company`: string - The bid requesters company name e.g. `Demo Company 1`
  - `contact`: string - The bid requester's contact information e.g. `John Doe ((503)744-3200 ext. 1234)`
  - `company_address`: string - Bid requesters company address e.g. `123 Campus Way Carpinteria, CA 91303`
  - `company_phone`: string - Bid requesters company phone e.g. `8051231234`
  - `company_website`: string - Bid requesters company website e.g. `https://www.procore.com/`
  - `email_address`: string - Bid requesters email_address e.g. `joe.doe@example.com`
  - `first_name`: string - Bid requesters first_name e.g. `Joe`
  - `last_name`: string - Bid requesters last_name e.g. `Doe`
  - `mobile_phone`: string - Bid requesters mobile number e.g. `8051231234`
  - `vendor_address`: string - Bid requesters company address e.g. `6309 Carpinteria Ave.`
  - `business_phone`: string - Bid requesters company phone number e.g. `8051231234`
  - `fax_number`: string - Bid requesters company fax number e.g. `8051231234`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `bidder_notes`: string - Notes. It's an optional parameter when the blind bidding is on. e.g. `Test Bid Notes`
- `attachments_count`: integer - Attachment count. It's an optional parameter when the blind bidding is on. e.g. `1`
- `recipient_ids`: array of integer - Login IDs of all recipients on a bid
- `recipient_list`: array of object - Detailed recipient informations on bid
  - `first`: string - Recipients first name e.g. `John`
  - `last`: string - Recipients last name e.g. `Doe`
  - `email`: string - Recipients email e.g. `j.doe@example.com`
  - `numbers`: string - Recipients office and mobile numbers e.g. `Office: N/A, Mobile: 805.123.1234`
- `recipient_list_with_email_and_number`: array of string - Recipient emails and phone numbers e.g. `Jane Doe, jane.doe@example.com, Office N/A, Mobile N/A`
- `mailto`: string - Email address associated with creating communications for bid e.g. `procore-f1234@example.com`
- `bidder_inclusion`: string - Inclusion comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `See Attached Proposal`
- `bidder_exclusion`: string - Exclusion comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `Please note I could not supply pricing on tapware or toilets.`
- `bid_convertible_to_subcontract`: boolean - Bid Convertible to Subcontract e.g. `true`
- `bid_convertible_to_purchase_order`: boolean - Bid Convertible to Purchase Order e.g. `true`
- `contract_button_disabled_reason`: string - Contract button disabled reason e.g. `One cost code must be associated with this lump sum bid.`
- `po_button_disabled_reason`: string - Purchase Order button disabled reason e.g. `Cost codes on bid cannot be divisions for purchase order conversion.`
- `links`: object
  - `uploads`: string - Upload link for current company e.g. `https://app.procore.com/upload`
  - `cost_codes`: string - Available cost codes link for bid e.g. `https://app.procore.com/cost_codes`
  - `bid_pdf`: string e.g. `/rest/v1.0/companies/16/bids/67.pdf`
- `vendor`: object - Bid Vendor Info
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name e.g. `Demo Company 1`
  - `avatar_url`: string - Link to avatar picture e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160422154654_production_3975...`
  - `trades`: string - List of trades for the vendor e.g. `General Conditions`
  - `address`: string - Vendor address e.g. `123 Main Street.`
  - `business_phone`: string - Vendor business phone e.g. `8051231234`
- `project`: object - Project Info
  - `name`: string - Name e.g. `Project 1`
  - `address`: string - Address e.g. `One Space Way<br>Risa SB12<br>United States`
- `bid_items`: array of object - Items
  - `amount`: number(float) - Amount in cents. It's an optional parameter when the blind bidding is on. e.g. `100000.0`
  - `bid_form_item_id`: integer - Bid Form Item ID e.g. `223345`
  - `cost_code_id`: integer - Cost Code ID e.g. `32780682`
  - `cost_code_name`: string - Cost Code name e.g. `Wood Sub-floors`
  - `cost_code_number`: string - Cost Code number e.g. `00-01 39-12`
  - `id`: integer - ID e.g. `223345`
  - `included`: boolean - Included e.g. `true`
  - `quantity`: string(float) - Quantity. It's an optional parameter when the blind bidding is on. e.g. `15.0`
  - `unit_cost`: string(float) - Unit cost of bid item. It's an optional parameter when the blind bidding is on. e.g. `900.0`
  - `uom`: string - Unit of Measure. It's an optional parameter when the blind bidding is on. e.g. `each`
- `cost_codes`: array of object - Cost Codes associated with items
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `attachments`: array of object - Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
  - `id`: integer - ID e.g. `5324`
  - `item_type`: string - Type of item attachment belongs to e.g. `Bid`
  - `prostore_file_id`: integer - prostore file ID e.g. `1234`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
- `attachments_zip_streaming_url`: string - Streaming URL to download all attachments. It's an optional parameter when the blind bidding is on. e.g. `http://www.example.com/`
- `values_converted_by_name`: string - Deprecated. Use `values_modified_by_name` instead. The name of the solicitor who last modified the bid values. e.g. `Katrina Massoni`
- `values_converted_at`: string(date-time) - Deprecated. Use `values_modified_at` instead. The date/time when the bid values were last modified by a solicitor. e.g. `2025-11-05T14:02:00Z`
- `values_modified_by_name`: string - The name of the solicitor who last modified the bid values. e.g. `Katrina Massoni`
- `values_modified_at`: string(date-time) - The date/time when the bid values were last modified by a solicitor. e.g. `2025-11-05T14:02:00Z`

Error responses: 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/bid_packages/{bid_package_id}/bids  **[BETA]**

**List Bids within a Bid Package**
Return a list of your assigned Bids within a Bid Package.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `bid_package_id`: integer - Bid Package ID e.g. `91011`
- `bid_package_title`: string - Bid Package title e.g. `Test Bid documents email link from correspondence`
- `bid_form_title`: string - Bid Form Title e.g. `Bid Form Title`
- `bid_form_id`: integer - Bid Form ID e.g. `123456`
- `bid_status`: string enum[undecided, will_not_bid, will_bid, not_invited, submitted] - Bid status
- `awarded`: boolean - Bid awarded to vendor e.g. `false`
- `company_id`: integer - Company ID e.g. `3355`
- `invitation_last_sent_at`: string(date-time) - Date/time the Bid Package invitation was last sent e.g. `2012-10-23T21:39:40Z`
- `is_bidder_committed`: boolean - Bidder committed e.g. `true`
- `lump_sum_amount`: number(float) - Lump sum (overall) amount e.g. `200.5`
- `lump_sum_enabled`: boolean - Lump sum bidding enabled e.g. `false`
- `submitted`: boolean - Vendor submitted Bid e.g. `true`
- `created_at`: string(date-time) - Date/time the Bid Package was created e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Date/time the Bid Package was last updated e.g. `2012-10-24T21:39:40Z`
- `due_date`: string(date-time) - Due Date e.g. `2016-12-13T03:00:00Z`
- `bidder_comments`: string - Comments e.g. `Test Bid`
- `bid_requester`: object - Bid Requester Info
  - `company`: string - The bid requesters company name e.g. `Demo Company 1`
  - `contact`: string - The bid requester's contact information e.g. `John Doe ((503)744-3200 ext. 1234)`
  - `company_address`: string - Bid requesters company address e.g. `123 Campus Way Carpinteria, CA 91303`
  - `company_phone`: string - Bid requesters company phone e.g. `8051231234`
  - `company_website`: string - Bid requesters company website e.g. `https://www.procore.com/`
  - `email_address`: string - Bid requesters email_address e.g. `joe.doe@example.com`
  - `first_name`: string - Bid requesters first_name e.g. `Joe`
  - `last_name`: string - Bid requesters last_name e.g. `Doe`
  - `mobile_phone`: string - Bid requesters mobile number e.g. `8051231234`
  - `vendor_address`: string - Bid requesters company address e.g. `6309 Carpinteria Ave.`
  - `business_phone`: string - Bid requesters company phone number e.g. `8051231234`
  - `fax_number`: string - Bid requesters company fax number e.g. `8051231234`
- `vendor`: object - Bid Vendor Info
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name e.g. `Demo Company 1`
  - `avatar_url`: string - Link to avatar picture e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160422154654_production_3975...`
  - `trades`: string - List of trades for the vendor e.g. `General Conditions`
- `project`: object - Project Info
  - `name`: string - Name e.g. `Project 1`
  - `address`: string - Address e.g. `One Space Way<br>Risa SB12<br>United States`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/bids/{id}  **[BETA]**

**Show a Bid within a Project**
Return information on a Bid from a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `bid_package_id`: integer - Bid Package ID e.g. `91011`
- `bid_package_title`: string - Package Title e.g. `Test Bid Documents Email Link from Correspondence`
- `awarded`: boolean - Bid awarded to vendor e.g. `false`
- `company_id`: integer - Company ID e.g. `2342`
- `invitation_last_sent_at`: string(date-time) - Date/time the Bid invitation was last sent e.g. `2012-10-23T21:39:40Z`
- `is_bidder_committed`: boolean - Bidder committed e.g. `true`
- `lump_sum_amount`: number(float) - Lump sum (overall) amount e.g. `200.5`
- `lump_sum_enabled`: boolean - Lump sum bidding enabled e.g. `false`
- `submitted`: boolean - Vendor submitted bid e.g. `true`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `due_date`: string(date-time) - Due date e.g. `2016-12-13T03:00:00Z`
- `bidder_comments`: string - Comments made on bid sheet e.g. `See Attached Proposal`
- `bid_requester`: object - Bid Requester Info
  - `company`: string - The bid requesters company name e.g. `Demo Company 1`
  - `contact`: string - The bid requester's contact information e.g. `John Doe ((503)744-3200 ext. 1234)`
  - `company_address`: string - Bid requesters company address e.g. `123 Campus Way Carpinteria, CA 91303`
  - `company_phone`: string - Bid requesters company phone e.g. `8051231234`
  - `company_website`: string - Bid requesters company website e.g. `https://www.procore.com/`
  - `email_address`: string - Bid requesters email_address e.g. `joe.doe@example.com`
  - `first_name`: string - Bid requesters first_name e.g. `Joe`
  - `last_name`: string - Bid requesters last_name e.g. `Doe`
  - `mobile_phone`: string - Bid requesters mobile number e.g. `8051231234`
  - `vendor_address`: string - Bid requesters company address e.g. `6309 Carpinteria Ave.`
  - `business_phone`: string - Bid requesters company phone number e.g. `8051231234`
  - `fax_number`: string - Bid requesters company fax number e.g. `8051231234`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `bidder_notes`: string - Notes e.g. `bid seems very low`
- `attachments_count`: integer - Attachment count e.g. `1`
- `recipient_ids`: array of integer - Login IDs of all recipients on a bid
- `recipient_list`: array of object - Detailed recipient informations on bid
  - `first`: string - Recipients first name e.g. `John`
  - `last`: string - Recipients last name e.g. `Doe`
  - `email`: string - Recipients email e.g. `j.doe@example.com`
  - `numbers`: string - Recipients office and mobile numbers e.g. `Office: N/A, Mobile: 805.123.1234`
- `recipient_list_with_email_and_number`: string - Recipient emails and phone numbers e.g. `Jane Doe, jane.doe@example.com, Office N/A, Mobile N/A`
- `mailto`: string - Email address associated with creating communications for bid e.g. `procore-f1234@example.com`
- `bidder_inclusion`: string - Inclusion comments made on bid sheet e.g. `See Attached Proposal`
- `bidder_exclusion`: string - Exclusion comments made on bid sheet e.g. `Please note I could not supply pricing on tapware or toilets.`
- `links`: object
  - `uploads`: string - Upload link for current company e.g. `https://app.procore.com/upload`
  - `cost_codes`: string - Available cost codes link for bid e.g. `https://app.procore.com/cost_codes`
- `vendor`: object - Bid Vendor Info
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name e.g. `Demo Company 1`
  - `avatar_url`: string - Link to avatar picture e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160422154654_production_3975...`
  - `trades`: string - List of trades for the vendor e.g. `General Conditions`
- `project`: object - Project Info
  - `name`: string - Name e.g. `Project 1`
  - `address`: string - Address e.g. `One Space Way<br>Risa SB12<br>United States`
- `bid_items`: array of object - Items
  - `amount`: number - Amount in cents e.g. `100000`
  - `bid_form_item_id`: integer - Bid Form Item ID e.g. `223345`
  - `cost_code_id`: integer - Cost Code ID e.g. `32780682`
  - `cost_code_name`: string - Cost Code name e.g. `Wood Sub-floors`
  - `cost_code_number`: string - Cost Code Number e.g. `100-1`
  - `id`: integer - ID e.g. `223345`
  - `included`: boolean - Included e.g. `true`
  - `position`: integer - position e.g. `2`
  - `quantity`: string(float) - Quantity e.g. `15.0`
  - `unit_cost`: string(float) - Unit cost of bid item e.g. `900.0`
  - `uom`: string - Unit of Measure e.g. `each`
- `cost_codes`: array of object - Cost Codes associated with items
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `attachments`: array of object - Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
  - `id`: integer - ID e.g. `5324`
  - `item_type`: string - Type of item attachment belongs to e.g. `Bid`
  - `prostore_file_id`: integer - prostore file ID e.g. `1234`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/bid_packages/{bid_package_id}/bids/{id}  **[BETA]**

**Show Bid within a Bid Package**
Return information on a Bid from a Bid Package.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `bid_package_id`: integer - Bid Package ID e.g. `91011`
- `bid_package_title`: string - Package Title e.g. `Test Bid Documents Email Link from Correspondence`
- `awarded`: boolean - Bid awarded to vendor e.g. `false`
- `company_id`: integer - Company ID e.g. `2342`
- `invitation_last_sent_at`: string(date-time) - Date/time the Bid invitation was last sent e.g. `2012-10-23T21:39:40Z`
- `is_bidder_committed`: boolean - Bidder committed e.g. `true`
- `lump_sum_amount`: number(float) - Lump sum (overall) amount e.g. `200.5`
- `lump_sum_enabled`: boolean - Lump sum bidding enabled e.g. `false`
- `submitted`: boolean - Vendor submitted bid e.g. `true`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `due_date`: string(date-time) - Due date e.g. `2016-12-13T03:00:00Z`
- `bidder_comments`: string - Comments made on bid sheet e.g. `See Attached Proposal`
- `bid_requester`: object - Bid Requester Info
  - `company`: string - The bid requesters company name e.g. `Demo Company 1`
  - `contact`: string - The bid requester's contact information e.g. `John Doe ((503)744-3200 ext. 1234)`
  - `company_address`: string - Bid requesters company address e.g. `123 Campus Way Carpinteria, CA 91303`
  - `company_phone`: string - Bid requesters company phone e.g. `8051231234`
  - `company_website`: string - Bid requesters company website e.g. `https://www.procore.com/`
  - `email_address`: string - Bid requesters email_address e.g. `joe.doe@example.com`
  - `first_name`: string - Bid requesters first_name e.g. `Joe`
  - `last_name`: string - Bid requesters last_name e.g. `Doe`
  - `mobile_phone`: string - Bid requesters mobile number e.g. `8051231234`
  - `vendor_address`: string - Bid requesters company address e.g. `6309 Carpinteria Ave.`
  - `business_phone`: string - Bid requesters company phone number e.g. `8051231234`
  - `fax_number`: string - Bid requesters company fax number e.g. `8051231234`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `bidder_notes`: string - Notes e.g. `bid seems very low`
- `attachments_count`: integer - Attachment count e.g. `1`
- `recipient_ids`: array of integer - Login IDs of all recipients on a bid
- `recipient_list`: array of object - Detailed recipient informations on bid
  - `first`: string - Recipients first name e.g. `John`
  - `last`: string - Recipients last name e.g. `Doe`
  - `email`: string - Recipients email e.g. `j.doe@example.com`
  - `numbers`: string - Recipients office and mobile numbers e.g. `Office: N/A, Mobile: 805.123.1234`
- `recipient_list_with_email_and_number`: string - Recipient emails and phone numbers e.g. `Jane Doe, jane.doe@example.com, Office N/A, Mobile N/A`
- `mailto`: string - Email address associated with creating communications for bid e.g. `procore-f1234@example.com`
- `bidder_inclusion`: string - Inclusion comments made on bid sheet e.g. `See Attached Proposal`
- `bidder_exclusion`: string - Exclusion comments made on bid sheet e.g. `Please note I could not supply pricing on tapware or toilets.`
- `links`: object
  - `uploads`: string - Upload link for current company e.g. `https://app.procore.com/upload`
  - `cost_codes`: string - Available cost codes link for bid e.g. `https://app.procore.com/cost_codes`
- `vendor`: object - Bid Vendor Info
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name e.g. `Demo Company 1`
  - `avatar_url`: string - Link to avatar picture e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160422154654_production_3975...`
  - `trades`: string - List of trades for the vendor e.g. `General Conditions`
- `project`: object - Project Info
  - `name`: string - Name e.g. `Project 1`
  - `address`: string - Address e.g. `One Space Way<br>Risa SB12<br>United States`
- `bid_items`: array of object - Items
  - `amount`: number - Amount in cents e.g. `100000`
  - `bid_form_item_id`: integer - Bid Form Item ID e.g. `223345`
  - `cost_code_id`: integer - Cost Code ID e.g. `32780682`
  - `cost_code_name`: string - Cost Code name e.g. `Wood Sub-floors`
  - `cost_code_number`: string - Cost Code Number e.g. `100-1`
  - `id`: integer - ID e.g. `223345`
  - `included`: boolean - Included e.g. `true`
  - `position`: integer - position e.g. `2`
  - `quantity`: string(float) - Quantity e.g. `15.0`
  - `unit_cost`: string(float) - Unit cost of bid item e.g. `900.0`
  - `uom`: string - Unit of Measure e.g. `each`
- `cost_codes`: array of object - Cost Codes associated with items
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `attachments`: array of object - Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
  - `id`: integer - ID e.g. `5324`
  - `item_type`: string - Type of item attachment belongs to e.g. `Bid`
  - `prostore_file_id`: integer - prostore file ID e.g. `1234`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/bid_packages/{bid_package_id}/bids/{id}  **[DEPRECATED]**

**Update a Bid from a Bid Package**
Update a Bid with a Bid Package.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `id` [path] integer (required) - ID

Request body (application/json) (required):

- `bid`: object
  - `lump_sum_amount`: number(float) - Lump sum (overall) amount e.g. `10000`
  - `bidder_comments`: string - Comments e.g. `Test Bid Comment`
  - `bidder_inclusion`: string - Inclusions e.g. `Include Concrete`
  - `bidder_exclusion`: string - Exclusions e.g. `Exclude Plumbing`
  - `bid_status`: string enum[not_invited, undecided, will_not_bid, will_bid, submitted, awarded] - This status is combination of the `invitation_last_sent_at`, `is_bidder_committed`, `submitted`, & `awarded` values. The `not_invited` status is the same as `invitation_last_sent_at` being null, `is_bidder_committed` ...
  - `is_bidder_committed`: boolean - Bidder committed e.g. `true`
  - `submitted`: boolean - Vendor submitted Bid e.g. `true`
  - `show_bid_in_estimating`: boolean - Show bid in Estimating e.g. `true`
  - `prostore_file_ids`: array of integer - Array of Prostore File IDs for attachments e.g. `[1751318, 1837467]`
  - `recipient_ids`: array of integer - Array of Login IDs to add as recipients e.g. `[1751318, 1837467]`
  - `bid_items`: array of object - Bid Items for a Bid
    - `id`: number - ID e.g. `123124112`
    - `bid_form_item_id`: number - Bid Form Item ID e.g. `32780682`
    - `cost_code_id`: number - Cost Code ID e.g. `32780682`
    - `amount`: number - Amount e.g. `100000`
    - `unit_cost`: string - Unit Cost e.g. `900`
    - `quantity`: string - Quantity e.g. `15`
    - `uom`: string - Unit of Measure e.g. `pounds`
  - `bid_items_to_delete`: array of integer - IDs of Bid Items that need to be deleted e.g. `[1234324, 4992392]`

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `bid_package_id`: integer - Bid Package ID e.g. `91011`
- `bid_package_title`: string - Package Title e.g. `Test Bid Documents Email Link from Correspondence`
- `bid_form_title`: string - Bid Form Title e.g. `Bid Form Title`
- `awarded`: boolean - Bid awarded to vendor e.g. `false`
- `bidders_can_add_line_items`: boolean - Bidders can add line items e.g. `false`
- `bid_status`: string enum[not_invited, undecided, will_not_bid, will_bid, submitted, awarded] - This status is combination of the `invitation_last_sent_at`, `is_bidder_committed`, `submitted`, & `awarded` values. The `not_invited` status is the same as `invitation_last_sent_at` being null, `is_bidder_committed` ...
- `company_id`: integer - Company ID e.g. `2342`
- `invitation_last_sent_at`: string(date-time) - Date/time the Bid invitation was last sent e.g. `2012-10-23T21:39:40Z`
- `is_bidder_committed`: boolean - Bidder committed e.g. `true`
- `lump_sum_amount`: number(float) - Lump sum (overall) amount. It's an optional parameter when the blind bidding is on. e.g. `200.5`
- `lump_sum_enabled`: boolean - Lump sum bidding enabled e.g. `false`
- `submitted`: boolean - Vendor submitted bid e.g. `true`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `due_date`: string(date-time) - Due date e.g. `2016-12-13T03:00:00Z`
- `bidder_comments`: string - Comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `See Attached Proposal`
- `show_bid_in_estimating`: boolean - Show bid in Estimating e.g. `true`
- `bid_amount`: string(currency) - Bid amount e.g. `$1,000.00`
- `bid_requester`: object - Bid Requester Info
  - `company`: string - The bid requesters company name e.g. `Demo Company 1`
  - `contact`: string - The bid requester's contact information e.g. `John Doe ((503)744-3200 ext. 1234)`
  - `company_address`: string - Bid requesters company address e.g. `123 Campus Way Carpinteria, CA 91303`
  - `company_phone`: string - Bid requesters company phone e.g. `8051231234`
  - `company_website`: string - Bid requesters company website e.g. `https://www.procore.com/`
  - `email_address`: string - Bid requesters email_address e.g. `joe.doe@example.com`
  - `first_name`: string - Bid requesters first_name e.g. `Joe`
  - `last_name`: string - Bid requesters last_name e.g. `Doe`
  - `mobile_phone`: string - Bid requesters mobile number e.g. `8051231234`
  - `vendor_address`: string - Bid requesters company address e.g. `6309 Carpinteria Ave.`
  - `business_phone`: string - Bid requesters company phone number e.g. `8051231234`
  - `fax_number`: string - Bid requesters company fax number e.g. `8051231234`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `bidder_notes`: string - Notes. It's an optional parameter when the blind bidding is on. e.g. `Test Bid Notes`
- `attachments_count`: integer - Attachment count. It's an optional parameter when the blind bidding is on. e.g. `1`
- `recipient_ids`: array of integer - Login IDs of all recipients on a bid
- `recipient_list`: array of object - Detailed recipient informations on bid
  - `first`: string - Recipients first name e.g. `John`
  - `last`: string - Recipients last name e.g. `Doe`
  - `email`: string - Recipients email e.g. `j.doe@example.com`
  - `numbers`: string - Recipients office and mobile numbers e.g. `Office: N/A, Mobile: 805.123.1234`
- `recipient_list_with_email_and_number`: array of string - Recipient emails and phone numbers e.g. `Jane Doe, jane.doe@example.com, Office N/A, Mobile N/A`
- `mailto`: string - Email address associated with creating communications for bid e.g. `procore-f1234@example.com`
- `bidder_inclusion`: string - Inclusion comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `See Attached Proposal`
- `bidder_exclusion`: string - Exclusion comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `Please note I could not supply pricing on tapware or toilets.`
- `bid_convertible_to_subcontract`: boolean - Bid Convertible to Subcontract e.g. `true`
- `bid_convertible_to_purchase_order`: boolean - Bid Convertible to Purchase Order e.g. `true`
- `contract_button_disabled_reason`: string - Contract button disabled reason e.g. `One cost code must be associated with this lump sum bid.`
- `po_button_disabled_reason`: string - Purchase Order button disabled reason e.g. `Cost codes on bid cannot be divisions for purchase order conversion.`
- `links`: object
  - `uploads`: string - Upload link for current company e.g. `https://app.procore.com/upload`
  - `cost_codes`: string - Available cost codes link for bid e.g. `https://app.procore.com/cost_codes`
  - `bid_pdf`: string e.g. `/rest/v1.0/companies/16/bids/67.pdf`
- `vendor`: object - Bid Vendor Info
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name e.g. `Demo Company 1`
  - `avatar_url`: string - Link to avatar picture e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160422154654_production_3975...`
  - `trades`: string - List of trades for the vendor e.g. `General Conditions`
  - `address`: string - Vendor address e.g. `123 Main Street.`
  - `business_phone`: string - Vendor business phone e.g. `8051231234`
- `project`: object - Project Info
  - `name`: string - Name e.g. `Project 1`
  - `address`: string - Address e.g. `One Space Way<br>Risa SB12<br>United States`
- `bid_items`: array of object - Items
  - `amount`: number(float) - Amount in cents. It's an optional parameter when the blind bidding is on. e.g. `100000.0`
  - `bid_form_item_id`: integer - Bid Form Item ID e.g. `223345`
  - `cost_code_id`: integer - Cost Code ID e.g. `32780682`
  - `cost_code_name`: string - Cost Code name e.g. `Wood Sub-floors`
  - `cost_code_number`: string - Cost Code number e.g. `00-01 39-12`
  - `id`: integer - ID e.g. `223345`
  - `included`: boolean - Included e.g. `true`
  - `quantity`: string(float) - Quantity. It's an optional parameter when the blind bidding is on. e.g. `15.0`
  - `unit_cost`: string(float) - Unit cost of bid item. It's an optional parameter when the blind bidding is on. e.g. `900.0`
  - `uom`: string - Unit of Measure. It's an optional parameter when the blind bidding is on. e.g. `each`
- `cost_codes`: array of object - Cost Codes associated with items
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `attachments`: array of object - Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
  - `id`: integer - ID e.g. `5324`
  - `item_type`: string - Type of item attachment belongs to e.g. `Bid`
  - `prostore_file_id`: integer - prostore file ID e.g. `1234`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
- `attachments_zip_streaming_url`: string - Streaming URL to download all attachments. It's an optional parameter when the blind bidding is on. e.g. `http://www.example.com/`
- `values_converted_by_name`: string - Deprecated. Use `values_modified_by_name` instead. The name of the solicitor who last modified the bid values. e.g. `Katrina Massoni`
- `values_converted_at`: string(date-time) - Deprecated. Use `values_modified_at` instead. The date/time when the bid values were last modified by a solicitor. e.g. `2025-11-05T14:02:00Z`
- `values_modified_by_name`: string - The name of the solicitor who last modified the bid values. e.g. `Katrina Massoni`
- `values_modified_at`: string(date-time) - The date/time when the bid values were last modified by a solicitor. e.g. `2025-11-05T14:02:00Z`

Error responses: 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/companies/{company_id}/bids/{id}  **[BETA]**

**Show a Bid within a Company**
Return information on a Bid from a Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `bid_package_id`: integer - Bid Package ID e.g. `91011`
- `bid_package_title`: string - Package Title e.g. `Test Bid Documents Email Link from Correspondence`
- `awarded`: boolean - Bid awarded to vendor e.g. `false`
- `company_id`: integer - Company ID e.g. `2342`
- `invitation_last_sent_at`: string(date-time) - Date/time the Bid invitation was last sent e.g. `2012-10-23T21:39:40Z`
- `is_bidder_committed`: boolean - Bidder committed e.g. `true`
- `lump_sum_amount`: number(float) - Lump sum (overall) amount e.g. `200.5`
- `lump_sum_enabled`: boolean - Lump sum bidding enabled e.g. `false`
- `submitted`: boolean - Vendor submitted bid e.g. `true`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `due_date`: string(date-time) - Due date e.g. `2016-12-13T03:00:00Z`
- `bidder_comments`: string - Comments made on bid sheet e.g. `See Attached Proposal`
- `bid_requester`: object - Bid Requester Info
  - `company`: string - The bid requesters company name e.g. `Demo Company 1`
  - `contact`: string - The bid requester's contact information e.g. `John Doe ((503)744-3200 ext. 1234)`
  - `company_address`: string - Bid requesters company address e.g. `123 Campus Way Carpinteria, CA 91303`
  - `company_phone`: string - Bid requesters company phone e.g. `8051231234`
  - `company_website`: string - Bid requesters company website e.g. `https://www.procore.com/`
  - `email_address`: string - Bid requesters email_address e.g. `joe.doe@example.com`
  - `first_name`: string - Bid requesters first_name e.g. `Joe`
  - `last_name`: string - Bid requesters last_name e.g. `Doe`
  - `mobile_phone`: string - Bid requesters mobile number e.g. `8051231234`
  - `vendor_address`: string - Bid requesters company address e.g. `6309 Carpinteria Ave.`
  - `business_phone`: string - Bid requesters company phone number e.g. `8051231234`
  - `fax_number`: string - Bid requesters company fax number e.g. `8051231234`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `bidder_notes`: string - Notes e.g. `bid seems very low`
- `attachments_count`: integer - Attachment count e.g. `1`
- `recipient_ids`: array of integer - Login IDs of all recipients on a bid
- `recipient_list`: array of object - Detailed recipient informations on bid
  - `first`: string - Recipients first name e.g. `John`
  - `last`: string - Recipients last name e.g. `Doe`
  - `email`: string - Recipients email e.g. `j.doe@example.com`
  - `numbers`: string - Recipients office and mobile numbers e.g. `Office: N/A, Mobile: 805.123.1234`
- `recipient_list_with_email_and_number`: string - Recipient emails and phone numbers e.g. `Jane Doe, jane.doe@example.com, Office N/A, Mobile N/A`
- `mailto`: string - Email address associated with creating communications for bid e.g. `procore-f1234@example.com`
- `bidder_inclusion`: string - Inclusion comments made on bid sheet e.g. `See Attached Proposal`
- `bidder_exclusion`: string - Exclusion comments made on bid sheet e.g. `Please note I could not supply pricing on tapware or toilets.`
- `links`: object
  - `uploads`: string - Upload link for current company e.g. `https://app.procore.com/upload`
  - `cost_codes`: string - Available cost codes link for bid e.g. `https://app.procore.com/cost_codes`
- `vendor`: object - Bid Vendor Info
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name e.g. `Demo Company 1`
  - `avatar_url`: string - Link to avatar picture e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160422154654_production_3975...`
  - `trades`: string - List of trades for the vendor e.g. `General Conditions`
- `project`: object - Project Info
  - `name`: string - Name e.g. `Project 1`
  - `address`: string - Address e.g. `One Space Way<br>Risa SB12<br>United States`
- `bid_items`: array of object - Items
  - `amount`: number - Amount in cents e.g. `100000`
  - `bid_form_item_id`: integer - Bid Form Item ID e.g. `223345`
  - `cost_code_id`: integer - Cost Code ID e.g. `32780682`
  - `cost_code_name`: string - Cost Code name e.g. `Wood Sub-floors`
  - `cost_code_number`: string - Cost Code Number e.g. `100-1`
  - `id`: integer - ID e.g. `223345`
  - `included`: boolean - Included e.g. `true`
  - `position`: integer - position e.g. `2`
  - `quantity`: string(float) - Quantity e.g. `15.0`
  - `unit_cost`: string(float) - Unit cost of bid item e.g. `900.0`
  - `uom`: string - Unit of Measure e.g. `each`
- `cost_codes`: array of object - Cost Codes associated with items
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `attachments`: array of object - Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
  - `id`: integer - ID e.g. `5324`
  - `item_type`: string - Type of item attachment belongs to e.g. `Bid`
  - `prostore_file_id`: integer - prostore file ID e.g. `1234`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/companies/{company_id}/bids/{id}  **[BETA]**

**Update a Bid within a Company**
Update a Bid at a company level.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID

Request body (application/json) (required):

- `bid`: object
  - `attachments_attributes`: array of object
    - `id`: number - Attachment ID e.g. `123`
    - `item_type`: string - Type of item attachment belongs to e.g. `Bid`
    - `prostore_file_id`: integer - prostore file ID e.g. `1234`
    - `item_id`: integer - The ID of the item associated with the attachment e.g. `5678`
    - `_destroy`: boolean - Set to true to delete the attachment e.g. `false`
  - `bidder_comments`: string - Comments e.g. `Test Bid Comment`
  - `bidder_exclusion`: string - Exclusions e.g. `Exclude Plumbing`
  - `bidder_id`: number - Bidder Login ID e.g. `42`
  - `bidder_inclusion`: string - Inclusions e.g. `Include Concrete`
  - `bid_items_attributes`: array of object
    - `amount_in_cents`: number - Amount In Cents e.g. `100000`
    - `bid_form_item_id`: number - Bid Form Item ID e.g. `32780682`
    - `cost_code_id`: number - Cost Code ID e.g. `32780682`
    - `id`: number - ID e.g. `123124112`
    - `included`: boolean - Incldued e.g. `true`
    - `quantity`: string - Quantity e.g. `15`
    - `unit_cost`: string - Unit Cost e.g. `900`
    - `uom`: string - Unit of Measure e.g. `pounds`
  - `is_bidder_committed`: boolean - Bidder committed e.g. `true`
  - `lump_sum_amount`: number(float) - Lump sum (overall) amount e.g. `10000`
  - `submitted`: boolean - Vendor submitted Bid e.g. `true`
  - `uploads`: array of object
    - `uuid`: string - uuid of the upload e.g. `ab1fa9b8a1a4fc1ed7b6e2c64968ebe77729`
  - `bid_items_to_delete`: array of integer - IDs of Bid Items that need to be deleted e.g. `[1234324, 4992392]`

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `bid_package_id`: integer - Bid Package ID e.g. `91011`
- `bid_package_title`: string - Package Title e.g. `Test Bid Documents Email Link from Correspondence`
- `awarded`: boolean - Bid awarded to vendor e.g. `false`
- `company_id`: integer - Company ID e.g. `2342`
- `invitation_last_sent_at`: string(date-time) - Date/time the Bid invitation was last sent e.g. `2012-10-23T21:39:40Z`
- `is_bidder_committed`: boolean - Bidder committed e.g. `true`
- `lump_sum_amount`: number(float) - Lump sum (overall) amount e.g. `200.5`
- `lump_sum_enabled`: boolean - Lump sum bidding enabled e.g. `false`
- `submitted`: boolean - Vendor submitted bid e.g. `true`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `due_date`: string(date-time) - Due date e.g. `2016-12-13T03:00:00Z`
- `bidder_comments`: string - Comments made on bid sheet e.g. `See Attached Proposal`
- `bid_requester`: object - Bid Requester Info
  - `company`: string - The bid requesters company name e.g. `Demo Company 1`
  - `contact`: string - The bid requester's contact information e.g. `John Doe ((503)744-3200 ext. 1234)`
  - `company_address`: string - Bid requesters company address e.g. `123 Campus Way Carpinteria, CA 91303`
  - `company_phone`: string - Bid requesters company phone e.g. `8051231234`
  - `company_website`: string - Bid requesters company website e.g. `https://www.procore.com/`
  - `email_address`: string - Bid requesters email_address e.g. `joe.doe@example.com`
  - `first_name`: string - Bid requesters first_name e.g. `Joe`
  - `last_name`: string - Bid requesters last_name e.g. `Doe`
  - `mobile_phone`: string - Bid requesters mobile number e.g. `8051231234`
  - `vendor_address`: string - Bid requesters company address e.g. `6309 Carpinteria Ave.`
  - `business_phone`: string - Bid requesters company phone number e.g. `8051231234`
  - `fax_number`: string - Bid requesters company fax number e.g. `8051231234`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `bidder_notes`: string - Notes e.g. `bid seems very low`
- `attachments_count`: integer - Attachment count e.g. `1`
- `recipient_ids`: array of integer - Login IDs of all recipients on a bid
- `recipient_list`: array of object - Detailed recipient informations on bid
  - `first`: string - Recipients first name e.g. `John`
  - `last`: string - Recipients last name e.g. `Doe`
  - `email`: string - Recipients email e.g. `j.doe@example.com`
  - `numbers`: string - Recipients office and mobile numbers e.g. `Office: N/A, Mobile: 805.123.1234`
- `recipient_list_with_email_and_number`: string - Recipient emails and phone numbers e.g. `Jane Doe, jane.doe@example.com, Office N/A, Mobile N/A`
- `mailto`: string - Email address associated with creating communications for bid e.g. `procore-f1234@example.com`
- `bidder_inclusion`: string - Inclusion comments made on bid sheet e.g. `See Attached Proposal`
- `bidder_exclusion`: string - Exclusion comments made on bid sheet e.g. `Please note I could not supply pricing on tapware or toilets.`
- `links`: object
  - `uploads`: string - Upload link for current company e.g. `https://app.procore.com/upload`
  - `cost_codes`: string - Available cost codes link for bid e.g. `https://app.procore.com/cost_codes`
- `vendor`: object - Bid Vendor Info
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name e.g. `Demo Company 1`
  - `avatar_url`: string - Link to avatar picture e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160422154654_production_3975...`
  - `trades`: string - List of trades for the vendor e.g. `General Conditions`
- `project`: object - Project Info
  - `name`: string - Name e.g. `Project 1`
  - `address`: string - Address e.g. `One Space Way<br>Risa SB12<br>United States`
- `bid_items`: array of object - Items
  - `amount`: number - Amount in cents e.g. `100000`
  - `bid_form_item_id`: integer - Bid Form Item ID e.g. `223345`
  - `cost_code_id`: integer - Cost Code ID e.g. `32780682`
  - `cost_code_name`: string - Cost Code name e.g. `Wood Sub-floors`
  - `cost_code_number`: string - Cost Code Number e.g. `100-1`
  - `id`: integer - ID e.g. `223345`
  - `included`: boolean - Included e.g. `true`
  - `position`: integer - position e.g. `2`
  - `quantity`: string(float) - Quantity e.g. `15.0`
  - `unit_cost`: string(float) - Unit cost of bid item e.g. `900.0`
  - `uom`: string - Unit of Measure e.g. `each`
- `cost_codes`: array of object - Cost Codes associated with items
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `attachments`: array of object - Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
  - `id`: integer - ID e.g. `5324`
  - `item_type`: string - Type of item attachment belongs to e.g. `Bid`
  - `prostore_file_id`: integer - prostore file ID e.g. `1234`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`

Error responses: 400, 401, 403, 409, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/bids/uom_categories

**List UOM Categories for Project Bids**
Returns a list of unit of measures available for bids in the project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `group_by`: string - Category e.g. `Time`
- `label`: string - Label e.g. `Hours`
- `value`: string - Value e.g. `hours`
- `identity`: string - Identity

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/bid_packages/{bid_package_id}/bids  **[DEPRECATED]**

**List Bids within a Bid Package**
Return a list of your assigned Bids within a Bid Package.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `bid_package_id`: integer - Bid Package ID e.g. `91011`
- `bid_package_title`: string - Bid Package title e.g. `Test Bid documents email link from correspondence`
- `bid_form_title`: string - Bid Form Title e.g. `Bid Form Title`
- `bid_form_id`: integer - Bid Form ID e.g. `123456`
- `bid_status`: string enum[undecided, will_not_bid, will_bid, not_invited, submitted] - Bid status
- `awarded`: boolean - Bid awarded to vendor e.g. `false`
- `company_id`: integer - Company ID e.g. `3355`
- `invitation_last_sent_at`: string(date-time) - Date/time the Bid Package invitation was last sent e.g. `2012-10-23T21:39:40Z`
- `is_bidder_committed`: boolean - Bidder committed e.g. `true`
- `lump_sum_amount`: number(float) - Lump sum (overall) amount e.g. `200.5`
- `lump_sum_enabled`: boolean - Lump sum bidding enabled e.g. `false`
- `submitted`: boolean - Vendor submitted Bid e.g. `true`
- `created_at`: string(date-time) - Date/time the Bid Package was created e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Date/time the Bid Package was last updated e.g. `2012-10-24T21:39:40Z`
- `due_date`: string(date-time) - Due Date e.g. `2016-12-13T03:00:00Z`
- `bidder_comments`: string - Comments e.g. `Test Bid`
- `bid_requester`: object - Bid Requester Info
  - `company`: string - The bid requesters company name e.g. `Demo Company 1`
  - `contact`: string - The bid requester's contact information e.g. `John Doe ((503)744-3200 ext. 1234)`
  - `company_address`: string - Bid requesters company address e.g. `123 Campus Way Carpinteria, CA 91303`
  - `company_phone`: string - Bid requesters company phone e.g. `8051231234`
  - `company_website`: string - Bid requesters company website e.g. `https://www.procore.com/`
  - `email_address`: string - Bid requesters email_address e.g. `joe.doe@example.com`
  - `first_name`: string - Bid requesters first_name e.g. `Joe`
  - `last_name`: string - Bid requesters last_name e.g. `Doe`
  - `mobile_phone`: string - Bid requesters mobile number e.g. `8051231234`
  - `vendor_address`: string - Bid requesters company address e.g. `6309 Carpinteria Ave.`
  - `business_phone`: string - Bid requesters company phone number e.g. `8051231234`
  - `fax_number`: string - Bid requesters company fax number e.g. `8051231234`
- `vendor`: object - Bid Vendor Info
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name e.g. `Demo Company 1`
  - `avatar_url`: string - Link to avatar picture e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160422154654_production_3975...`
  - `trades`: string - List of trades for the vendor e.g. `General Conditions`
- `project`: object - Project Info
  - `name`: string - Name e.g. `Project 1`
  - `address`: string - Address e.g. `One Space Way<br>Risa SB12<br>United States`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/bid_packages/{bid_package_id}/bids

**Create bid**
Create a Bid within a Bid Package. To submit a bid in Bid Management 2.0, a bid form must exist since the bid will be submitted against the bid form.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID

Request body (application/json) (required):

- `bid`: object
  - `vendor_id`: integer (required) - Vendor responsible for bid e.g. `3859014`
  - `lump_sum_amount`: number(float) - Lump sum (overall) amount e.g. `10000`
  - `bidder_comments`: string - Comments e.g. `Test Bid Comment`
  - `is_bidder_committed`: boolean - Bidder committed e.g. `true`
  - `submitted`: boolean - Vendor submitted Bid e.g. `true`
  - `recipient_ids`: array of integer - Array of Login IDs to add as recipients e.g. `[1751318, 1837467]`

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `bid_package_id`: integer - Bid Package ID e.g. `91011`
- `bid_package_title`: string - Package Title e.g. `Test Bid Documents Email Link from Correspondence`
- `bid_form_title`: string - Bid Form Title e.g. `Bid Form Title`
- `awarded`: boolean - Bid awarded to vendor e.g. `false`
- `bidders_can_add_line_items`: boolean - Bidders can add line items e.g. `false`
- `bid_status`: string enum[not_invited, undecided, will_not_bid, will_bid, submitted, awarded] - This status is combination of the `invitation_last_sent_at`, `is_bidder_committed`, `submitted`, & `awarded` values. The `not_invited` status is the same as `invitation_last_sent_at` being null, `is_bidder_committed` ...
- `company_id`: integer - Company ID e.g. `2342`
- `invitation_last_sent_at`: string(date-time) - Date/time the Bid invitation was last sent e.g. `2012-10-23T21:39:40Z`
- `is_bidder_committed`: boolean - Bidder committed e.g. `true`
- `lump_sum_amount`: number(float) - Lump sum (overall) amount. It's an optional parameter when the blind bidding is on. e.g. `200.5`
- `lump_sum_enabled`: boolean - Lump sum bidding enabled e.g. `false`
- `submitted`: boolean - Vendor submitted bid e.g. `true`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `due_date`: string(date-time) - Due date e.g. `2016-12-13T03:00:00Z`
- `bidder_comments`: string - Comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `See Attached Proposal`
- `show_bid_in_estimating`: boolean - Show bid in Estimating e.g. `true`
- `bid_amount`: string(currency) - Bid amount e.g. `$1,000.00`
- `bid_requester`: object - Bid Requester Info
  - `company`: string - The bid requesters company name e.g. `Demo Company 1`
  - `contact`: string - The bid requester's contact information e.g. `John Doe ((503)744-3200 ext. 1234)`
  - `company_address`: string - Bid requesters company address e.g. `123 Campus Way Carpinteria, CA 91303`
  - `company_phone`: string - Bid requesters company phone e.g. `8051231234`
  - `company_website`: string - Bid requesters company website e.g. `https://www.procore.com/`
  - `email_address`: string - Bid requesters email_address e.g. `joe.doe@example.com`
  - `first_name`: string - Bid requesters first_name e.g. `Joe`
  - `last_name`: string - Bid requesters last_name e.g. `Doe`
  - `mobile_phone`: string - Bid requesters mobile number e.g. `8051231234`
  - `vendor_address`: string - Bid requesters company address e.g. `6309 Carpinteria Ave.`
  - `business_phone`: string - Bid requesters company phone number e.g. `8051231234`
  - `fax_number`: string - Bid requesters company fax number e.g. `8051231234`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `bidder_notes`: string - Notes. It's an optional parameter when the blind bidding is on. e.g. `Test Bid Notes`
- `attachments_count`: integer - Attachment count. It's an optional parameter when the blind bidding is on. e.g. `1`
- `recipient_ids`: array of integer - Login IDs of all recipients on a bid
- `recipient_list`: array of object - Detailed recipient informations on bid
  - `first`: string - Recipients first name e.g. `John`
  - `last`: string - Recipients last name e.g. `Doe`
  - `email`: string - Recipients email e.g. `j.doe@example.com`
  - `numbers`: string - Recipients office and mobile numbers e.g. `Office: N/A, Mobile: 805.123.1234`
- `recipient_list_with_email_and_number`: array of string - Recipient emails and phone numbers e.g. `Jane Doe, jane.doe@example.com, Office N/A, Mobile N/A`
- `mailto`: string - Email address associated with creating communications for bid e.g. `procore-f1234@example.com`
- `bidder_inclusion`: string - Inclusion comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `See Attached Proposal`
- `bidder_exclusion`: string - Exclusion comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `Please note I could not supply pricing on tapware or toilets.`
- `bid_convertible_to_subcontract`: boolean - Bid Convertible to Subcontract e.g. `true`
- `bid_convertible_to_purchase_order`: boolean - Bid Convertible to Purchase Order e.g. `true`
- `contract_button_disabled_reason`: string - Contract button disabled reason e.g. `One cost code must be associated with this lump sum bid.`
- `po_button_disabled_reason`: string - Purchase Order button disabled reason e.g. `Cost codes on bid cannot be divisions for purchase order conversion.`
- `links`: object
  - `uploads`: string - Upload link for current company e.g. `https://app.procore.com/upload`
  - `cost_codes`: string - Available cost codes link for bid e.g. `https://app.procore.com/cost_codes`
  - `bid_pdf`: string e.g. `/rest/v1.0/companies/16/bids/67.pdf`
- `vendor`: object - Bid Vendor Info
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name e.g. `Demo Company 1`
  - `avatar_url`: string - Link to avatar picture e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160422154654_production_3975...`
  - `trades`: string - List of trades for the vendor e.g. `General Conditions`
  - `address`: string - Vendor address e.g. `123 Main Street.`
  - `business_phone`: string - Vendor business phone e.g. `8051231234`
- `project`: object - Project Info
  - `name`: string - Name e.g. `Project 1`
  - `address`: string - Address e.g. `One Space Way<br>Risa SB12<br>United States`
- `bid_items`: array of object - Items
  - `amount`: number(float) - Amount in cents. It's an optional parameter when the blind bidding is on. e.g. `100000.0`
  - `bid_form_item_id`: integer - Bid Form Item ID e.g. `223345`
  - `cost_code_id`: integer - Cost Code ID e.g. `32780682`
  - `cost_code_name`: string - Cost Code name e.g. `Wood Sub-floors`
  - `cost_code_number`: string - Cost Code number e.g. `00-01 39-12`
  - `id`: integer - ID e.g. `223345`
  - `included`: boolean - Included e.g. `true`
  - `quantity`: string(float) - Quantity. It's an optional parameter when the blind bidding is on. e.g. `15.0`
  - `unit_cost`: string(float) - Unit cost of bid item. It's an optional parameter when the blind bidding is on. e.g. `900.0`
  - `uom`: string - Unit of Measure. It's an optional parameter when the blind bidding is on. e.g. `each`
- `cost_codes`: array of object - Cost Codes associated with items
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `attachments`: array of object - Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
  - `id`: integer - ID e.g. `5324`
  - `item_type`: string - Type of item attachment belongs to e.g. `Bid`
  - `prostore_file_id`: integer - prostore file ID e.g. `1234`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
- `attachments_zip_streaming_url`: string - Streaming URL to download all attachments. It's an optional parameter when the blind bidding is on. e.g. `http://www.example.com/`
- `values_converted_by_name`: string - Deprecated. Use `values_modified_by_name` instead. The name of the solicitor who last modified the bid values. e.g. `Katrina Massoni`
- `values_converted_at`: string(date-time) - Deprecated. Use `values_modified_at` instead. The date/time when the bid values were last modified by a solicitor. e.g. `2025-11-05T14:02:00Z`
- `values_modified_by_name`: string - The name of the solicitor who last modified the bid values. e.g. `Katrina Massoni`
- `values_modified_at`: string(date-time) - The date/time when the bid values were last modified by a solicitor. e.g. `2025-11-05T14:02:00Z`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/bids

**List Bids within a Project**
Return a list of your assigned Bids within a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `bid_package_id`: integer - Bid Package ID e.g. `91011`
- `bid_package_title`: string - Bid Package title e.g. `Test Bid documents email link from correspondence`
- `bid_form_title`: string - Bid Form Title e.g. `Bid Form Title`
- `bid_form_id`: integer - Bid Form ID e.g. `123456`
- `bid_status`: string enum[undecided, will_not_bid, will_bid, not_invited, submitted] - Bid status
- `awarded`: boolean - Bid awarded to vendor e.g. `false`
- `company_id`: integer - Company ID e.g. `3355`
- `invitation_last_sent_at`: string(date-time) - Date/time the Bid Package invitation was last sent e.g. `2012-10-23T21:39:40Z`
- `is_bidder_committed`: boolean - Bidder committed e.g. `true`
- `lump_sum_amount`: number(float) - Lump sum (overall) amount e.g. `200.5`
- `lump_sum_enabled`: boolean - Lump sum bidding enabled e.g. `false`
- `submitted`: boolean - Vendor submitted Bid e.g. `true`
- `created_at`: string(date-time) - Date/time the Bid Package was created e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Date/time the Bid Package was last updated e.g. `2012-10-24T21:39:40Z`
- `due_date`: string(date-time) - Due Date e.g. `2016-12-13T03:00:00Z`
- `bidder_comments`: string - Comments e.g. `Test Bid`
- `bid_requester`: object - Bid Requester Info
  - `company`: string - The bid requesters company name e.g. `Demo Company 1`
  - `contact`: string - The bid requester's contact information e.g. `John Doe ((503)744-3200 ext. 1234)`
  - `company_address`: string - Bid requesters company address e.g. `123 Campus Way Carpinteria, CA 91303`
  - `company_phone`: string - Bid requesters company phone e.g. `8051231234`
  - `company_website`: string - Bid requesters company website e.g. `https://www.procore.com/`
  - `email_address`: string - Bid requesters email_address e.g. `joe.doe@example.com`
  - `first_name`: string - Bid requesters first_name e.g. `Joe`
  - `last_name`: string - Bid requesters last_name e.g. `Doe`
  - `mobile_phone`: string - Bid requesters mobile number e.g. `8051231234`
  - `vendor_address`: string - Bid requesters company address e.g. `6309 Carpinteria Ave.`
  - `business_phone`: string - Bid requesters company phone number e.g. `8051231234`
  - `fax_number`: string - Bid requesters company fax number e.g. `8051231234`
- `vendor`: object - Bid Vendor Info
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name e.g. `Demo Company 1`
  - `avatar_url`: string - Link to avatar picture e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160422154654_production_3975...`
  - `trades`: string - List of trades for the vendor e.g. `General Conditions`
- `project`: object - Project Info
  - `name`: string - Name e.g. `Project 1`
  - `address`: string - Address e.g. `One Space Way<br>Risa SB12<br>United States`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/bids  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**List Bids within a Company**
Return a list of your assigned Bids within a Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `bid_package_id`: integer - Bid Package ID e.g. `91011`
- `bid_package_title`: string - Bid Package title e.g. `Test Bid documents email link from correspondence`
- `bid_form_title`: string - Bid Form Title e.g. `Bid Form Title`
- `bid_form_id`: integer - Bid Form ID e.g. `123456`
- `bid_status`: string enum[undecided, will_not_bid, will_bid, not_invited, submitted] - Bid status
- `awarded`: boolean - Bid awarded to vendor e.g. `false`
- `company_id`: integer - Company ID e.g. `3355`
- `invitation_last_sent_at`: string(date-time) - Date/time the Bid Package invitation was last sent e.g. `2012-10-23T21:39:40Z`
- `is_bidder_committed`: boolean - Bidder committed e.g. `true`
- `lump_sum_amount`: number(float) - Lump sum (overall) amount e.g. `200.5`
- `lump_sum_enabled`: boolean - Lump sum bidding enabled e.g. `false`
- `submitted`: boolean - Vendor submitted Bid e.g. `true`
- `created_at`: string(date-time) - Date/time the Bid Package was created e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Date/time the Bid Package was last updated e.g. `2012-10-24T21:39:40Z`
- `due_date`: string(date-time) - Due Date e.g. `2016-12-13T03:00:00Z`
- `bidder_comments`: string - Comments e.g. `Test Bid`
- `bid_requester`: object - Bid Requester Info
  - `company`: string - The bid requesters company name e.g. `Demo Company 1`
  - `contact`: string - The bid requester's contact information e.g. `John Doe ((503)744-3200 ext. 1234)`
  - `company_address`: string - Bid requesters company address e.g. `123 Campus Way Carpinteria, CA 91303`
  - `company_phone`: string - Bid requesters company phone e.g. `8051231234`
  - `company_website`: string - Bid requesters company website e.g. `https://www.procore.com/`
  - `email_address`: string - Bid requesters email_address e.g. `joe.doe@example.com`
  - `first_name`: string - Bid requesters first_name e.g. `Joe`
  - `last_name`: string - Bid requesters last_name e.g. `Doe`
  - `mobile_phone`: string - Bid requesters mobile number e.g. `8051231234`
  - `vendor_address`: string - Bid requesters company address e.g. `6309 Carpinteria Ave.`
  - `business_phone`: string - Bid requesters company phone number e.g. `8051231234`
  - `fax_number`: string - Bid requesters company fax number e.g. `8051231234`
- `vendor`: object - Bid Vendor Info
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name e.g. `Demo Company 1`
  - `avatar_url`: string - Link to avatar picture e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160422154654_production_3975...`
  - `trades`: string - List of trades for the vendor e.g. `General Conditions`
- `project`: object - Project Info
  - `name`: string - Name e.g. `Project 1`
  - `address`: string - Address e.g. `One Space Way<br>Risa SB12<br>United States`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/bids/{id}  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Show a Bid Within a Company**
Return detailed information about a specified Bid.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `bid_package_id`: integer - Bid Package ID e.g. `91011`
- `bid_package_title`: string - Package Title e.g. `Test Bid Documents Email Link from Correspondence`
- `bid_form_title`: string - Bid Form Title e.g. `Bid Form Title`
- `awarded`: boolean - Bid awarded to vendor e.g. `false`
- `bidders_can_add_line_items`: boolean - Bidders can add line items e.g. `false`
- `bid_status`: string enum[not_invited, undecided, will_not_bid, will_bid, submitted, awarded] - This status is combination of the `invitation_last_sent_at`, `is_bidder_committed`, `submitted`, & `awarded` values. The `not_invited` status is the same as `invitation_last_sent_at` being null, `is_bidder_committed` ...
- `company_id`: integer - Company ID e.g. `2342`
- `invitation_last_sent_at`: string(date-time) - Date/time the Bid invitation was last sent e.g. `2012-10-23T21:39:40Z`
- `is_bidder_committed`: boolean - Bidder committed e.g. `true`
- `lump_sum_amount`: number(float) - Lump sum (overall) amount. It's an optional parameter when the blind bidding is on. e.g. `200.5`
- `lump_sum_enabled`: boolean - Lump sum bidding enabled e.g. `false`
- `submitted`: boolean - Vendor submitted bid e.g. `true`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `due_date`: string(date-time) - Due date e.g. `2016-12-13T03:00:00Z`
- `bidder_comments`: string - Comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `See Attached Proposal`
- `show_bid_in_estimating`: boolean - Show bid in Estimating e.g. `true`
- `bid_amount`: string(currency) - Bid amount e.g. `$1,000.00`
- `bid_requester`: object - Bid Requester Info
  - `company`: string - The bid requesters company name e.g. `Demo Company 1`
  - `contact`: string - The bid requester's contact information e.g. `John Doe ((503)744-3200 ext. 1234)`
  - `company_address`: string - Bid requesters company address e.g. `123 Campus Way Carpinteria, CA 91303`
  - `company_phone`: string - Bid requesters company phone e.g. `8051231234`
  - `company_website`: string - Bid requesters company website e.g. `https://www.procore.com/`
  - `email_address`: string - Bid requesters email_address e.g. `joe.doe@example.com`
  - `first_name`: string - Bid requesters first_name e.g. `Joe`
  - `last_name`: string - Bid requesters last_name e.g. `Doe`
  - `mobile_phone`: string - Bid requesters mobile number e.g. `8051231234`
  - `vendor_address`: string - Bid requesters company address e.g. `6309 Carpinteria Ave.`
  - `business_phone`: string - Bid requesters company phone number e.g. `8051231234`
  - `fax_number`: string - Bid requesters company fax number e.g. `8051231234`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `bidder_notes`: string - Notes. It's an optional parameter when the blind bidding is on. e.g. `Test Bid Notes`
- `attachments_count`: integer - Attachment count. It's an optional parameter when the blind bidding is on. e.g. `1`
- `recipient_ids`: array of integer - Login IDs of all recipients on a bid
- `recipient_list`: array of object - Detailed recipient informations on bid
  - `first`: string - Recipients first name e.g. `John`
  - `last`: string - Recipients last name e.g. `Doe`
  - `email`: string - Recipients email e.g. `j.doe@example.com`
  - `numbers`: string - Recipients office and mobile numbers e.g. `Office: N/A, Mobile: 805.123.1234`
- `recipient_list_with_email_and_number`: array of string - Recipient emails and phone numbers e.g. `Jane Doe, jane.doe@example.com, Office N/A, Mobile N/A`
- `mailto`: string - Email address associated with creating communications for bid e.g. `procore-f1234@example.com`
- `bidder_inclusion`: string - Inclusion comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `See Attached Proposal`
- `bidder_exclusion`: string - Exclusion comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `Please note I could not supply pricing on tapware or toilets.`
- `bid_convertible_to_subcontract`: boolean - Bid Convertible to Subcontract e.g. `true`
- `bid_convertible_to_purchase_order`: boolean - Bid Convertible to Purchase Order e.g. `true`
- `contract_button_disabled_reason`: string - Contract button disabled reason e.g. `One cost code must be associated with this lump sum bid.`
- `po_button_disabled_reason`: string - Purchase Order button disabled reason e.g. `Cost codes on bid cannot be divisions for purchase order conversion.`
- `links`: object
  - `uploads`: string - Upload link for current company e.g. `https://app.procore.com/upload`
  - `cost_codes`: string - Available cost codes link for bid e.g. `https://app.procore.com/cost_codes`
  - `bid_pdf`: string e.g. `/rest/v1.0/companies/16/bids/67.pdf`
- `vendor`: object - Bid Vendor Info
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name e.g. `Demo Company 1`
  - `avatar_url`: string - Link to avatar picture e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160422154654_production_3975...`
  - `trades`: string - List of trades for the vendor e.g. `General Conditions`
  - `address`: string - Vendor address e.g. `123 Main Street.`
  - `business_phone`: string - Vendor business phone e.g. `8051231234`
- `project`: object - Project Info
  - `name`: string - Name e.g. `Project 1`
  - `address`: string - Address e.g. `One Space Way<br>Risa SB12<br>United States`
- `bid_items`: array of object - Items
  - `amount`: number(float) - Amount in cents. It's an optional parameter when the blind bidding is on. e.g. `100000.0`
  - `bid_form_item_id`: integer - Bid Form Item ID e.g. `223345`
  - `cost_code_id`: integer - Cost Code ID e.g. `32780682`
  - `cost_code_name`: string - Cost Code name e.g. `Wood Sub-floors`
  - `cost_code_number`: string - Cost Code number e.g. `00-01 39-12`
  - `id`: integer - ID e.g. `223345`
  - `included`: boolean - Included e.g. `true`
  - `quantity`: string(float) - Quantity. It's an optional parameter when the blind bidding is on. e.g. `15.0`
  - `unit_cost`: string(float) - Unit cost of bid item. It's an optional parameter when the blind bidding is on. e.g. `900.0`
  - `uom`: string - Unit of Measure. It's an optional parameter when the blind bidding is on. e.g. `each`
- `cost_codes`: array of object - Cost Codes associated with items
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `attachments`: array of object - Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
  - `id`: integer - ID e.g. `5324`
  - `item_type`: string - Type of item attachment belongs to e.g. `Bid`
  - `prostore_file_id`: integer - prostore file ID e.g. `1234`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
- `attachments_zip_streaming_url`: string - Streaming URL to download all attachments. It's an optional parameter when the blind bidding is on. e.g. `http://www.example.com/`
- `values_converted_by_name`: string - Deprecated. Use `values_modified_by_name` instead. The name of the solicitor who last modified the bid values. e.g. `Katrina Massoni`
- `values_converted_at`: string(date-time) - Deprecated. Use `values_modified_at` instead. The date/time when the bid values were last modified by a solicitor. e.g. `2025-11-05T14:02:00Z`
- `values_modified_by_name`: string - The name of the solicitor who last modified the bid values. e.g. `Katrina Massoni`
- `values_modified_at`: string(date-time) - The date/time when the bid values were last modified by a solicitor. e.g. `2025-11-05T14:02:00Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/bids/{id}  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Update a Bid within a Company**
Update a Bid at a company level.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `bid`: object
  - `attachments_attributes`: array of object
    - `id`: number - Attachment ID e.g. `123`
    - `item_type`: string - Type of item attachment belongs to e.g. `Bid`
    - `prostore_file_id`: integer - prostore file ID e.g. `1234`
    - `item_id`: integer - The ID of the item associated with the attachment e.g. `5678`
    - `_destroy`: boolean - Set to true to delete the attachment e.g. `false`
  - `bidder_comments`: string - Comments e.g. `Test Bid Comment`
  - `bidder_exclusion`: string - Exclusions e.g. `Exclude Plumbing`
  - `bidder_id`: number - Bidder Login ID e.g. `42`
  - `bidder_inclusion`: string - Inclusions e.g. `Include Concrete`
  - `bid_items_attributes`: array of object
    - `amount_in_cents`: number - Amount In Cents e.g. `100000`
    - `bid_form_item_id`: number - Bid Form Item ID e.g. `32780682`
    - `cost_code_id`: number - Cost Code ID e.g. `32780682`
    - `id`: number - ID e.g. `123124112`
    - `included`: boolean - Incldued e.g. `true`
    - `quantity`: string - Quantity e.g. `15`
    - `unit_cost`: string - Unit Cost e.g. `900`
    - `uom`: string - Unit of Measure e.g. `pounds`
  - `is_bidder_committed`: boolean - Bidder committed e.g. `true`
  - `lump_sum_amount`: number(float) - Lump sum (overall) amount e.g. `10000`
  - `submitted`: boolean - Vendor submitted Bid e.g. `true`
  - `uploads`: array of object
    - `uuid`: string - uuid of the upload e.g. `ab1fa9b8a1a4fc1ed7b6e2c64968ebe77729`
  - `bid_items_to_delete`: array of integer - IDs of Bid Items that need to be deleted e.g. `[1234324, 4992392]`

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `bid_package_id`: integer - Bid Package ID e.g. `91011`
- `bid_package_title`: string - Package Title e.g. `Test Bid Documents Email Link from Correspondence`
- `bid_form_title`: string - Bid Form Title e.g. `Bid Form Title`
- `awarded`: boolean - Bid awarded to vendor e.g. `false`
- `bidders_can_add_line_items`: boolean - Bidders can add line items e.g. `false`
- `bid_status`: string enum[not_invited, undecided, will_not_bid, will_bid, submitted, awarded] - This status is combination of the `invitation_last_sent_at`, `is_bidder_committed`, `submitted`, & `awarded` values. The `not_invited` status is the same as `invitation_last_sent_at` being null, `is_bidder_committed` ...
- `company_id`: integer - Company ID e.g. `2342`
- `invitation_last_sent_at`: string(date-time) - Date/time the Bid invitation was last sent e.g. `2012-10-23T21:39:40Z`
- `is_bidder_committed`: boolean - Bidder committed e.g. `true`
- `lump_sum_amount`: number(float) - Lump sum (overall) amount. It's an optional parameter when the blind bidding is on. e.g. `200.5`
- `lump_sum_enabled`: boolean - Lump sum bidding enabled e.g. `false`
- `submitted`: boolean - Vendor submitted bid e.g. `true`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `due_date`: string(date-time) - Due date e.g. `2016-12-13T03:00:00Z`
- `bidder_comments`: string - Comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `See Attached Proposal`
- `show_bid_in_estimating`: boolean - Show bid in Estimating e.g. `true`
- `bid_amount`: string(currency) - Bid amount e.g. `$1,000.00`
- `bid_requester`: object - Bid Requester Info
  - `company`: string - The bid requesters company name e.g. `Demo Company 1`
  - `contact`: string - The bid requester's contact information e.g. `John Doe ((503)744-3200 ext. 1234)`
  - `company_address`: string - Bid requesters company address e.g. `123 Campus Way Carpinteria, CA 91303`
  - `company_phone`: string - Bid requesters company phone e.g. `8051231234`
  - `company_website`: string - Bid requesters company website e.g. `https://www.procore.com/`
  - `email_address`: string - Bid requesters email_address e.g. `joe.doe@example.com`
  - `first_name`: string - Bid requesters first_name e.g. `Joe`
  - `last_name`: string - Bid requesters last_name e.g. `Doe`
  - `mobile_phone`: string - Bid requesters mobile number e.g. `8051231234`
  - `vendor_address`: string - Bid requesters company address e.g. `6309 Carpinteria Ave.`
  - `business_phone`: string - Bid requesters company phone number e.g. `8051231234`
  - `fax_number`: string - Bid requesters company fax number e.g. `8051231234`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `bidder_notes`: string - Notes. It's an optional parameter when the blind bidding is on. e.g. `Test Bid Notes`
- `attachments_count`: integer - Attachment count. It's an optional parameter when the blind bidding is on. e.g. `1`
- `recipient_ids`: array of integer - Login IDs of all recipients on a bid
- `recipient_list`: array of object - Detailed recipient informations on bid
  - `first`: string - Recipients first name e.g. `John`
  - `last`: string - Recipients last name e.g. `Doe`
  - `email`: string - Recipients email e.g. `j.doe@example.com`
  - `numbers`: string - Recipients office and mobile numbers e.g. `Office: N/A, Mobile: 805.123.1234`
- `recipient_list_with_email_and_number`: array of string - Recipient emails and phone numbers e.g. `Jane Doe, jane.doe@example.com, Office N/A, Mobile N/A`
- `mailto`: string - Email address associated with creating communications for bid e.g. `procore-f1234@example.com`
- `bidder_inclusion`: string - Inclusion comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `See Attached Proposal`
- `bidder_exclusion`: string - Exclusion comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `Please note I could not supply pricing on tapware or toilets.`
- `bid_convertible_to_subcontract`: boolean - Bid Convertible to Subcontract e.g. `true`
- `bid_convertible_to_purchase_order`: boolean - Bid Convertible to Purchase Order e.g. `true`
- `contract_button_disabled_reason`: string - Contract button disabled reason e.g. `One cost code must be associated with this lump sum bid.`
- `po_button_disabled_reason`: string - Purchase Order button disabled reason e.g. `Cost codes on bid cannot be divisions for purchase order conversion.`
- `links`: object
  - `uploads`: string - Upload link for current company e.g. `https://app.procore.com/upload`
  - `cost_codes`: string - Available cost codes link for bid e.g. `https://app.procore.com/cost_codes`
  - `bid_pdf`: string e.g. `/rest/v1.0/companies/16/bids/67.pdf`
- `vendor`: object - Bid Vendor Info
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name e.g. `Demo Company 1`
  - `avatar_url`: string - Link to avatar picture e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160422154654_production_3975...`
  - `trades`: string - List of trades for the vendor e.g. `General Conditions`
  - `address`: string - Vendor address e.g. `123 Main Street.`
  - `business_phone`: string - Vendor business phone e.g. `8051231234`
- `project`: object - Project Info
  - `name`: string - Name e.g. `Project 1`
  - `address`: string - Address e.g. `One Space Way<br>Risa SB12<br>United States`
- `bid_items`: array of object - Items
  - `amount`: number(float) - Amount in cents. It's an optional parameter when the blind bidding is on. e.g. `100000.0`
  - `bid_form_item_id`: integer - Bid Form Item ID e.g. `223345`
  - `cost_code_id`: integer - Cost Code ID e.g. `32780682`
  - `cost_code_name`: string - Cost Code name e.g. `Wood Sub-floors`
  - `cost_code_number`: string - Cost Code number e.g. `00-01 39-12`
  - `id`: integer - ID e.g. `223345`
  - `included`: boolean - Included e.g. `true`
  - `quantity`: string(float) - Quantity. It's an optional parameter when the blind bidding is on. e.g. `15.0`
  - `unit_cost`: string(float) - Unit cost of bid item. It's an optional parameter when the blind bidding is on. e.g. `900.0`
  - `uom`: string - Unit of Measure. It's an optional parameter when the blind bidding is on. e.g. `each`
- `cost_codes`: array of object - Cost Codes associated with items
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `attachments`: array of object - Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
  - `id`: integer - ID e.g. `5324`
  - `item_type`: string - Type of item attachment belongs to e.g. `Bid`
  - `prostore_file_id`: integer - prostore file ID e.g. `1234`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
- `attachments_zip_streaming_url`: string - Streaming URL to download all attachments. It's an optional parameter when the blind bidding is on. e.g. `http://www.example.com/`
- `values_converted_by_name`: string - Deprecated. Use `values_modified_by_name` instead. The name of the solicitor who last modified the bid values. e.g. `Katrina Massoni`
- `values_converted_at`: string(date-time) - Deprecated. Use `values_modified_at` instead. The date/time when the bid values were last modified by a solicitor. e.g. `2025-11-05T14:02:00Z`
- `values_modified_by_name`: string - The name of the solicitor who last modified the bid values. e.g. `Katrina Massoni`
- `values_modified_at`: string(date-time) - The date/time when the bid values were last modified by a solicitor. e.g. `2025-11-05T14:02:00Z`

Error responses: 400, 401, 403, 409, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/bid_packages/{bid_package_id}/bids/{id}  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Show Bids within a Bid package**
Return information on a Bid from a Bid Package.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `bid_package_id`: integer - Bid Package ID e.g. `91011`
- `bid_package_title`: string - Package Title e.g. `Test Bid Documents Email Link from Correspondence`
- `bid_form_title`: string - Bid Form Title e.g. `Bid Form Title`
- `awarded`: boolean - Bid awarded to vendor e.g. `false`
- `bidders_can_add_line_items`: boolean - Bidders can add line items e.g. `false`
- `bid_status`: string enum[not_invited, undecided, will_not_bid, will_bid, submitted, awarded] - This status is combination of the `invitation_last_sent_at`, `is_bidder_committed`, `submitted`, & `awarded` values. The `not_invited` status is the same as `invitation_last_sent_at` being null, `is_bidder_committed` ...
- `company_id`: integer - Company ID e.g. `2342`
- `invitation_last_sent_at`: string(date-time) - Date/time the Bid invitation was last sent e.g. `2012-10-23T21:39:40Z`
- `is_bidder_committed`: boolean - Bidder committed e.g. `true`
- `lump_sum_amount`: number(float) - Lump sum (overall) amount. It's an optional parameter when the blind bidding is on. e.g. `200.5`
- `lump_sum_enabled`: boolean - Lump sum bidding enabled e.g. `false`
- `submitted`: boolean - Vendor submitted bid e.g. `true`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `due_date`: string(date-time) - Due date e.g. `2016-12-13T03:00:00Z`
- `bidder_comments`: string - Comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `See Attached Proposal`
- `show_bid_in_estimating`: boolean - Show bid in Estimating e.g. `true`
- `bid_amount`: string(currency) - Bid amount e.g. `$1,000.00`
- `bid_requester`: object - Bid Requester Info
  - `company`: string - The bid requesters company name e.g. `Demo Company 1`
  - `contact`: string - The bid requester's contact information e.g. `John Doe ((503)744-3200 ext. 1234)`
  - `company_address`: string - Bid requesters company address e.g. `123 Campus Way Carpinteria, CA 91303`
  - `company_phone`: string - Bid requesters company phone e.g. `8051231234`
  - `company_website`: string - Bid requesters company website e.g. `https://www.procore.com/`
  - `email_address`: string - Bid requesters email_address e.g. `joe.doe@example.com`
  - `first_name`: string - Bid requesters first_name e.g. `Joe`
  - `last_name`: string - Bid requesters last_name e.g. `Doe`
  - `mobile_phone`: string - Bid requesters mobile number e.g. `8051231234`
  - `vendor_address`: string - Bid requesters company address e.g. `6309 Carpinteria Ave.`
  - `business_phone`: string - Bid requesters company phone number e.g. `8051231234`
  - `fax_number`: string - Bid requesters company fax number e.g. `8051231234`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `bidder_notes`: string - Notes. It's an optional parameter when the blind bidding is on. e.g. `Test Bid Notes`
- `attachments_count`: integer - Attachment count. It's an optional parameter when the blind bidding is on. e.g. `1`
- `recipient_ids`: array of integer - Login IDs of all recipients on a bid
- `recipient_list`: array of object - Detailed recipient informations on bid
  - `first`: string - Recipients first name e.g. `John`
  - `last`: string - Recipients last name e.g. `Doe`
  - `email`: string - Recipients email e.g. `j.doe@example.com`
  - `numbers`: string - Recipients office and mobile numbers e.g. `Office: N/A, Mobile: 805.123.1234`
- `recipient_list_with_email_and_number`: array of string - Recipient emails and phone numbers e.g. `Jane Doe, jane.doe@example.com, Office N/A, Mobile N/A`
- `mailto`: string - Email address associated with creating communications for bid e.g. `procore-f1234@example.com`
- `bidder_inclusion`: string - Inclusion comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `See Attached Proposal`
- `bidder_exclusion`: string - Exclusion comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `Please note I could not supply pricing on tapware or toilets.`
- `bid_convertible_to_subcontract`: boolean - Bid Convertible to Subcontract e.g. `true`
- `bid_convertible_to_purchase_order`: boolean - Bid Convertible to Purchase Order e.g. `true`
- `contract_button_disabled_reason`: string - Contract button disabled reason e.g. `One cost code must be associated with this lump sum bid.`
- `po_button_disabled_reason`: string - Purchase Order button disabled reason e.g. `Cost codes on bid cannot be divisions for purchase order conversion.`
- `links`: object
  - `uploads`: string - Upload link for current company e.g. `https://app.procore.com/upload`
  - `cost_codes`: string - Available cost codes link for bid e.g. `https://app.procore.com/cost_codes`
  - `bid_pdf`: string e.g. `/rest/v1.0/companies/16/bids/67.pdf`
- `vendor`: object - Bid Vendor Info
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name e.g. `Demo Company 1`
  - `avatar_url`: string - Link to avatar picture e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160422154654_production_3975...`
  - `trades`: string - List of trades for the vendor e.g. `General Conditions`
  - `address`: string - Vendor address e.g. `123 Main Street.`
  - `business_phone`: string - Vendor business phone e.g. `8051231234`
- `project`: object - Project Info
  - `name`: string - Name e.g. `Project 1`
  - `address`: string - Address e.g. `One Space Way<br>Risa SB12<br>United States`
- `bid_items`: array of object - Items
  - `amount`: number(float) - Amount in cents. It's an optional parameter when the blind bidding is on. e.g. `100000.0`
  - `bid_form_item_id`: integer - Bid Form Item ID e.g. `223345`
  - `cost_code_id`: integer - Cost Code ID e.g. `32780682`
  - `cost_code_name`: string - Cost Code name e.g. `Wood Sub-floors`
  - `cost_code_number`: string - Cost Code number e.g. `00-01 39-12`
  - `id`: integer - ID e.g. `223345`
  - `included`: boolean - Included e.g. `true`
  - `quantity`: string(float) - Quantity. It's an optional parameter when the blind bidding is on. e.g. `15.0`
  - `unit_cost`: string(float) - Unit cost of bid item. It's an optional parameter when the blind bidding is on. e.g. `900.0`
  - `uom`: string - Unit of Measure. It's an optional parameter when the blind bidding is on. e.g. `each`
- `cost_codes`: array of object - Cost Codes associated with items
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `attachments`: array of object - Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
  - `id`: integer - ID e.g. `5324`
  - `item_type`: string - Type of item attachment belongs to e.g. `Bid`
  - `prostore_file_id`: integer - prostore file ID e.g. `1234`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
- `attachments_zip_streaming_url`: string - Streaming URL to download all attachments. It's an optional parameter when the blind bidding is on. e.g. `http://www.example.com/`
- `values_converted_by_name`: string - Deprecated. Use `values_modified_by_name` instead. The name of the solicitor who last modified the bid values. e.g. `Katrina Massoni`
- `values_converted_at`: string(date-time) - Deprecated. Use `values_modified_at` instead. The date/time when the bid values were last modified by a solicitor. e.g. `2025-11-05T14:02:00Z`
- `values_modified_by_name`: string - The name of the solicitor who last modified the bid values. e.g. `Katrina Massoni`
- `values_modified_at`: string(date-time) - The date/time when the bid values were last modified by a solicitor. e.g. `2025-11-05T14:02:00Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/bid_packages/{bid_package_id}/bids/{id}  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Update a Bid from a Bid Package**
Update a Bid with a Bid Package.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `id` [path] integer (required) - ID

Request body (application/json) (required):

- `bid`: object
  - `lump_sum_amount`: number(float) - Lump sum (overall) amount e.g. `10000`
  - `bidder_comments`: string - Comments e.g. `Test Bid Comment`
  - `bidder_inclusion`: string - Inclusions e.g. `Include Concrete`
  - `bidder_exclusion`: string - Exclusions e.g. `Exclude Plumbing`
  - `is_bidder_committed`: boolean - Bidder committed e.g. `true`
  - `submitted`: boolean - Vendor submitted Bid e.g. `true`
  - `recipient_ids`: array of integer - Array of Login IDs to add as recipients e.g. `[1751318, 1837467]`

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `bid_package_id`: integer - Bid Package ID e.g. `91011`
- `bid_package_title`: string - Package Title e.g. `Test Bid Documents Email Link from Correspondence`
- `bid_form_title`: string - Bid Form Title e.g. `Bid Form Title`
- `awarded`: boolean - Bid awarded to vendor e.g. `false`
- `bidders_can_add_line_items`: boolean - Bidders can add line items e.g. `false`
- `bid_status`: string enum[not_invited, undecided, will_not_bid, will_bid, submitted, awarded] - This status is combination of the `invitation_last_sent_at`, `is_bidder_committed`, `submitted`, & `awarded` values. The `not_invited` status is the same as `invitation_last_sent_at` being null, `is_bidder_committed` ...
- `company_id`: integer - Company ID e.g. `2342`
- `invitation_last_sent_at`: string(date-time) - Date/time the Bid invitation was last sent e.g. `2012-10-23T21:39:40Z`
- `is_bidder_committed`: boolean - Bidder committed e.g. `true`
- `lump_sum_amount`: number(float) - Lump sum (overall) amount. It's an optional parameter when the blind bidding is on. e.g. `200.5`
- `lump_sum_enabled`: boolean - Lump sum bidding enabled e.g. `false`
- `submitted`: boolean - Vendor submitted bid e.g. `true`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `due_date`: string(date-time) - Due date e.g. `2016-12-13T03:00:00Z`
- `bidder_comments`: string - Comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `See Attached Proposal`
- `show_bid_in_estimating`: boolean - Show bid in Estimating e.g. `true`
- `bid_amount`: string(currency) - Bid amount e.g. `$1,000.00`
- `bid_requester`: object - Bid Requester Info
  - `company`: string - The bid requesters company name e.g. `Demo Company 1`
  - `contact`: string - The bid requester's contact information e.g. `John Doe ((503)744-3200 ext. 1234)`
  - `company_address`: string - Bid requesters company address e.g. `123 Campus Way Carpinteria, CA 91303`
  - `company_phone`: string - Bid requesters company phone e.g. `8051231234`
  - `company_website`: string - Bid requesters company website e.g. `https://www.procore.com/`
  - `email_address`: string - Bid requesters email_address e.g. `joe.doe@example.com`
  - `first_name`: string - Bid requesters first_name e.g. `Joe`
  - `last_name`: string - Bid requesters last_name e.g. `Doe`
  - `mobile_phone`: string - Bid requesters mobile number e.g. `8051231234`
  - `vendor_address`: string - Bid requesters company address e.g. `6309 Carpinteria Ave.`
  - `business_phone`: string - Bid requesters company phone number e.g. `8051231234`
  - `fax_number`: string - Bid requesters company fax number e.g. `8051231234`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `bidder_notes`: string - Notes. It's an optional parameter when the blind bidding is on. e.g. `Test Bid Notes`
- `attachments_count`: integer - Attachment count. It's an optional parameter when the blind bidding is on. e.g. `1`
- `recipient_ids`: array of integer - Login IDs of all recipients on a bid
- `recipient_list`: array of object - Detailed recipient informations on bid
  - `first`: string - Recipients first name e.g. `John`
  - `last`: string - Recipients last name e.g. `Doe`
  - `email`: string - Recipients email e.g. `j.doe@example.com`
  - `numbers`: string - Recipients office and mobile numbers e.g. `Office: N/A, Mobile: 805.123.1234`
- `recipient_list_with_email_and_number`: array of string - Recipient emails and phone numbers e.g. `Jane Doe, jane.doe@example.com, Office N/A, Mobile N/A`
- `mailto`: string - Email address associated with creating communications for bid e.g. `procore-f1234@example.com`
- `bidder_inclusion`: string - Inclusion comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `See Attached Proposal`
- `bidder_exclusion`: string - Exclusion comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `Please note I could not supply pricing on tapware or toilets.`
- `bid_convertible_to_subcontract`: boolean - Bid Convertible to Subcontract e.g. `true`
- `bid_convertible_to_purchase_order`: boolean - Bid Convertible to Purchase Order e.g. `true`
- `contract_button_disabled_reason`: string - Contract button disabled reason e.g. `One cost code must be associated with this lump sum bid.`
- `po_button_disabled_reason`: string - Purchase Order button disabled reason e.g. `Cost codes on bid cannot be divisions for purchase order conversion.`
- `links`: object
  - `uploads`: string - Upload link for current company e.g. `https://app.procore.com/upload`
  - `cost_codes`: string - Available cost codes link for bid e.g. `https://app.procore.com/cost_codes`
  - `bid_pdf`: string e.g. `/rest/v1.0/companies/16/bids/67.pdf`
- `vendor`: object - Bid Vendor Info
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name e.g. `Demo Company 1`
  - `avatar_url`: string - Link to avatar picture e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160422154654_production_3975...`
  - `trades`: string - List of trades for the vendor e.g. `General Conditions`
  - `address`: string - Vendor address e.g. `123 Main Street.`
  - `business_phone`: string - Vendor business phone e.g. `8051231234`
- `project`: object - Project Info
  - `name`: string - Name e.g. `Project 1`
  - `address`: string - Address e.g. `One Space Way<br>Risa SB12<br>United States`
- `bid_items`: array of object - Items
  - `amount`: number(float) - Amount in cents. It's an optional parameter when the blind bidding is on. e.g. `100000.0`
  - `bid_form_item_id`: integer - Bid Form Item ID e.g. `223345`
  - `cost_code_id`: integer - Cost Code ID e.g. `32780682`
  - `cost_code_name`: string - Cost Code name e.g. `Wood Sub-floors`
  - `cost_code_number`: string - Cost Code number e.g. `00-01 39-12`
  - `id`: integer - ID e.g. `223345`
  - `included`: boolean - Included e.g. `true`
  - `quantity`: string(float) - Quantity. It's an optional parameter when the blind bidding is on. e.g. `15.0`
  - `unit_cost`: string(float) - Unit cost of bid item. It's an optional parameter when the blind bidding is on. e.g. `900.0`
  - `uom`: string - Unit of Measure. It's an optional parameter when the blind bidding is on. e.g. `each`
- `cost_codes`: array of object - Cost Codes associated with items
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `attachments`: array of object - Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
  - `id`: integer - ID e.g. `5324`
  - `item_type`: string - Type of item attachment belongs to e.g. `Bid`
  - `prostore_file_id`: integer - prostore file ID e.g. `1234`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
- `attachments_zip_streaming_url`: string - Streaming URL to download all attachments. It's an optional parameter when the blind bidding is on. e.g. `http://www.example.com/`
- `values_converted_by_name`: string - Deprecated. Use `values_modified_by_name` instead. The name of the solicitor who last modified the bid values. e.g. `Katrina Massoni`
- `values_converted_at`: string(date-time) - Deprecated. Use `values_modified_at` instead. The date/time when the bid values were last modified by a solicitor. e.g. `2025-11-05T14:02:00Z`
- `values_modified_by_name`: string - The name of the solicitor who last modified the bid values. e.g. `Katrina Massoni`
- `values_modified_at`: string(date-time) - The date/time when the bid values were last modified by a solicitor. e.g. `2025-11-05T14:02:00Z`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/bids/{id}  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Show a Bid within a Project**
Return information on a Bid from a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `bid_package_id`: integer - Bid Package ID e.g. `91011`
- `bid_package_title`: string - Package Title e.g. `Test Bid Documents Email Link from Correspondence`
- `bid_form_title`: string - Bid Form Title e.g. `Bid Form Title`
- `awarded`: boolean - Bid awarded to vendor e.g. `false`
- `bidders_can_add_line_items`: boolean - Bidders can add line items e.g. `false`
- `bid_status`: string enum[not_invited, undecided, will_not_bid, will_bid, submitted, awarded] - This status is combination of the `invitation_last_sent_at`, `is_bidder_committed`, `submitted`, & `awarded` values. The `not_invited` status is the same as `invitation_last_sent_at` being null, `is_bidder_committed` ...
- `company_id`: integer - Company ID e.g. `2342`
- `invitation_last_sent_at`: string(date-time) - Date/time the Bid invitation was last sent e.g. `2012-10-23T21:39:40Z`
- `is_bidder_committed`: boolean - Bidder committed e.g. `true`
- `lump_sum_amount`: number(float) - Lump sum (overall) amount. It's an optional parameter when the blind bidding is on. e.g. `200.5`
- `lump_sum_enabled`: boolean - Lump sum bidding enabled e.g. `false`
- `submitted`: boolean - Vendor submitted bid e.g. `true`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `due_date`: string(date-time) - Due date e.g. `2016-12-13T03:00:00Z`
- `bidder_comments`: string - Comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `See Attached Proposal`
- `show_bid_in_estimating`: boolean - Show bid in Estimating e.g. `true`
- `bid_amount`: string(currency) - Bid amount e.g. `$1,000.00`
- `bid_requester`: object - Bid Requester Info
  - `company`: string - The bid requesters company name e.g. `Demo Company 1`
  - `contact`: string - The bid requester's contact information e.g. `John Doe ((503)744-3200 ext. 1234)`
  - `company_address`: string - Bid requesters company address e.g. `123 Campus Way Carpinteria, CA 91303`
  - `company_phone`: string - Bid requesters company phone e.g. `8051231234`
  - `company_website`: string - Bid requesters company website e.g. `https://www.procore.com/`
  - `email_address`: string - Bid requesters email_address e.g. `joe.doe@example.com`
  - `first_name`: string - Bid requesters first_name e.g. `Joe`
  - `last_name`: string - Bid requesters last_name e.g. `Doe`
  - `mobile_phone`: string - Bid requesters mobile number e.g. `8051231234`
  - `vendor_address`: string - Bid requesters company address e.g. `6309 Carpinteria Ave.`
  - `business_phone`: string - Bid requesters company phone number e.g. `8051231234`
  - `fax_number`: string - Bid requesters company fax number e.g. `8051231234`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `bidder_notes`: string - Notes. It's an optional parameter when the blind bidding is on. e.g. `Test Bid Notes`
- `attachments_count`: integer - Attachment count. It's an optional parameter when the blind bidding is on. e.g. `1`
- `recipient_ids`: array of integer - Login IDs of all recipients on a bid
- `recipient_list`: array of object - Detailed recipient informations on bid
  - `first`: string - Recipients first name e.g. `John`
  - `last`: string - Recipients last name e.g. `Doe`
  - `email`: string - Recipients email e.g. `j.doe@example.com`
  - `numbers`: string - Recipients office and mobile numbers e.g. `Office: N/A, Mobile: 805.123.1234`
- `recipient_list_with_email_and_number`: array of string - Recipient emails and phone numbers e.g. `Jane Doe, jane.doe@example.com, Office N/A, Mobile N/A`
- `mailto`: string - Email address associated with creating communications for bid e.g. `procore-f1234@example.com`
- `bidder_inclusion`: string - Inclusion comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `See Attached Proposal`
- `bidder_exclusion`: string - Exclusion comments made on bid sheet. It's an optional parameter when the blind bidding is on. e.g. `Please note I could not supply pricing on tapware or toilets.`
- `bid_convertible_to_subcontract`: boolean - Bid Convertible to Subcontract e.g. `true`
- `bid_convertible_to_purchase_order`: boolean - Bid Convertible to Purchase Order e.g. `true`
- `contract_button_disabled_reason`: string - Contract button disabled reason e.g. `One cost code must be associated with this lump sum bid.`
- `po_button_disabled_reason`: string - Purchase Order button disabled reason e.g. `Cost codes on bid cannot be divisions for purchase order conversion.`
- `links`: object
  - `uploads`: string - Upload link for current company e.g. `https://app.procore.com/upload`
  - `cost_codes`: string - Available cost codes link for bid e.g. `https://app.procore.com/cost_codes`
  - `bid_pdf`: string e.g. `/rest/v1.0/companies/16/bids/67.pdf`
- `vendor`: object - Bid Vendor Info
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name e.g. `Demo Company 1`
  - `avatar_url`: string - Link to avatar picture e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160422154654_production_3975...`
  - `trades`: string - List of trades for the vendor e.g. `General Conditions`
  - `address`: string - Vendor address e.g. `123 Main Street.`
  - `business_phone`: string - Vendor business phone e.g. `8051231234`
- `project`: object - Project Info
  - `name`: string - Name e.g. `Project 1`
  - `address`: string - Address e.g. `One Space Way<br>Risa SB12<br>United States`
- `bid_items`: array of object - Items
  - `amount`: number(float) - Amount in cents. It's an optional parameter when the blind bidding is on. e.g. `100000.0`
  - `bid_form_item_id`: integer - Bid Form Item ID e.g. `223345`
  - `cost_code_id`: integer - Cost Code ID e.g. `32780682`
  - `cost_code_name`: string - Cost Code name e.g. `Wood Sub-floors`
  - `cost_code_number`: string - Cost Code number e.g. `00-01 39-12`
  - `id`: integer - ID e.g. `223345`
  - `included`: boolean - Included e.g. `true`
  - `quantity`: string(float) - Quantity. It's an optional parameter when the blind bidding is on. e.g. `15.0`
  - `unit_cost`: string(float) - Unit cost of bid item. It's an optional parameter when the blind bidding is on. e.g. `900.0`
  - `uom`: string - Unit of Measure. It's an optional parameter when the blind bidding is on. e.g. `each`
- `cost_codes`: array of object - Cost Codes associated with items
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `attachments`: array of object - Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
  - `id`: integer - ID e.g. `5324`
  - `item_type`: string - Type of item attachment belongs to e.g. `Bid`
  - `prostore_file_id`: integer - prostore file ID e.g. `1234`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
- `attachments_zip_streaming_url`: string - Streaming URL to download all attachments. It's an optional parameter when the blind bidding is on. e.g. `http://www.example.com/`
- `values_converted_by_name`: string - Deprecated. Use `values_modified_by_name` instead. The name of the solicitor who last modified the bid values. e.g. `Katrina Massoni`
- `values_converted_at`: string(date-time) - Deprecated. Use `values_modified_at` instead. The date/time when the bid values were last modified by a solicitor. e.g. `2025-11-05T14:02:00Z`
- `values_modified_by_name`: string - The name of the solicitor who last modified the bid values. e.g. `Katrina Massoni`
- `values_modified_at`: string(date-time) - The date/time when the bid values were last modified by a solicitor. e.g. `2025-11-05T14:02:00Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Bid Forms

Resource id: `company-bid-forms`. Raw spec: `../openapi-raw/company-bid-forms.json`. Web: https://developers.procore.com/reference/rest/company-bid-forms?version=latest
Product lines: Preconstruction

### GET /rest/v1.0/companies/{company_id}/bid/{bid_id}/bid_forms/{bid_form_id}

**View Bid Form**
View single Bid Form.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `bid_id` [path] integer (required) - Bid ID
- `bid_form_id` [path] integer (required) - Bid Form ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `title`: string - Bid Form Title e.g. `Concrete`
- `position`: integer - Display order position within the bid package e.g. `1`
- `proposal_id`: integer - Proposal ID e.g. `4321`
- `lock_unit_fields_base_bid`: boolean - Lock unit fields for all base bid items in this form e.g. `false`
- `lock_quantity_fields_base_bid`: boolean - Lock quantity fields for all base bid items in this form e.g. `false`
- `lock_unit_fields_alternates`: boolean - Lock unit fields for all alternate items in this form e.g. `false`
- `lock_quantity_fields_alternates`: boolean - Lock quantity fields for all alternate items in this form e.g. `false`
- `base_bid`: array of object
  - `id`: integer - ID e.g. `1234`
  - `title`: string - Bid Form Title e.g. `Concrete`
  - `position`: integer - Position e.g. `1`
  - `header`: boolean - Whether the item is a header or not e.g. `true`
  - `bid_form_items`: array of object
    - `id`: integer - ID e.g. `18`
    - `cost_code`: object
    - `description`: string - Bid Form Item Description e.g. `Wood Doors`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `2`
    - `subject`: string - Subject for Plain Text Items e.g. `Is the insurance of tools included in the Bid?`
    - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
    - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
    - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
    - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
    - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`
  - `sub_sections`: array of object
    - `id`: integer - ID e.g. `1234`
    - `title`: string - Sub Section Title e.g. `Floors 10-19`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this sub section in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `3`
    - `bid_form_items`: array of object - Bid Form Items
- `alternates`: array of object
  - `id`: integer - ID e.g. `1235`
  - `title`: string - Bid Form Title e.g. `Concrete`
  - `position`: integer - Position e.g. `1`
  - `header`: boolean - Whether the item is a header or not e.g. `true`
  - `bid_form_items`: array of object
    - `id`: integer - ID e.g. `18`
    - `cost_code`: object
    - `description`: string - Bid Form Item Description e.g. `Wood Doors`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this item in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `2`
    - `subject`: string - Subject for Plain Text Items e.g. `Is the insurance of tools included in the Bid?`
    - `item_type`: string enum[cost_code, plain_text] - Bid Form Items can be of various types. This property does determine which one is used.
    - `response_type`: string enum[amount, unit, include_exclude] - Bid Form Items can have various response types. This property determines which one is used.
    - `layer_id`: integer - ID of the Layer in the Estimate e.g. `141`
    - `locked_quantity`: number(double) - Locked quantity value that cannot be changed by bidders when submitting bids e.g. `10.5`
    - `locked_unit_of_measure`: string - Locked unit of measure that cannot be changed by bidders when submitting bids e.g. `sq ft`
  - `sub_sections`: array of object
    - `id`: integer - ID e.g. `1234`
    - `title`: string - Sub Section Title e.g. `Floors 10-19`
    - `position`: integer - Position e.g. `1`
    - `content_position`: integer - Position of this sub section in the unified ordering of its parent section's content, where bid form items and sub sections share a single 1-based sequence. Null when the unified ordering has not been assigned. e.g. `3`
    - `bid_form_items`: array of object - Bid Form Items

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Bid Packages

Resource id: `company-bid-packages`. Raw spec: `../openapi-raw/company-bid-packages.json`. Web: https://developers.procore.com/reference/rest/company-bid-packages?version=latest
Product lines: PM Essentials, Construction Financials

### GET /rest/v1.0/companies/{company_id}/bid_packages/{bid_package_id}/correspondences

**List Correspondences**
Return a list of all Correspondences for a Bid Package.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `94529`
- `bid_package_id`: integer - Bid package ID e.g. `91011`
- `bid_package_title`: string - Bid package title e.g. `Ocean Home Bid Package`
- `created_at`: string - Correspondence created-at e.g. `Monday, May 14, 2018 at 11:31 am`
- `subject`: string - Subject within Correspondence e.g. `Ocean Home 9171`
- `attachments`: array of object
  - `id`: integer - File ID e.g. `1`
  - `name`: string - Base name of the file without its path e.g. `contract.pdf`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com`
  - `filename`: string - Base name of the file without its path e.g. `contract.pdf`
  - `content_type`: string - A mime type or a file extension e.g. `application/pdf`
  - `share_url`: string - Shareable URL(enabled on company level) or file URL e.g. `https://storage.procore.com`
  - `viewable_type`: string enum[document, document_pending, image, mp4, default] - Document type e.g. `default`
  - `viewable_url`: string - Viewable document URL e.g. `https://app.procore.com/`
- `message`: string - Body of Correspondence e.g. `Please note new revision of Ocean Home 9171`
- `recipients`: array of string - List of recipient names Correspondence was sent to e.g. `["Hector Jimenez", "Mike Wazny"]`
- `from`: object
  - `first`: string - Recipients first name e.g. `John`
  - `last`: string - Recipients last name e.g. `Doe`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/bid_packages/{bid_package_id}/correspondences/{id}

**Show Correspondence**
Return Correspondence detailed information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `id` [path] integer (required) - Correspondence ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `94529`
- `bid_package_id`: integer - Bid package ID e.g. `91011`
- `bid_package_title`: string - Bid package title e.g. `Ocean Home Bid Package`
- `created_at`: string - Correspondence created-at e.g. `Monday, May 14, 2018 at 11:31 am`
- `subject`: string - Subject within Correspondence e.g. `Ocean Home 9171`
- `attachments`: array of object
  - `id`: integer - File ID e.g. `1`
  - `name`: string - Base name of the file without its path e.g. `contract.pdf`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com`
  - `filename`: string - Base name of the file without its path e.g. `contract.pdf`
  - `content_type`: string - A mime type or a file extension e.g. `application/pdf`
  - `share_url`: string - Shareable URL(enabled on company level) or file URL e.g. `https://storage.procore.com`
  - `viewable_type`: string enum[document, document_pending, image, mp4, default] - Document type e.g. `default`
  - `viewable_url`: string - Viewable document URL e.g. `https://app.procore.com/`
- `message`: string - Body of Correspondence e.g. `Please note new revision of Ocean Home 9171`
- `recipients`: array of string - List of recipient names Correspondence was sent to e.g. `["Hector Jimenez", "Mike Wazny"]`
- `from`: object
  - `first`: string - Recipients first name e.g. `John`
  - `last`: string - Recipients last name e.g. `Doe`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/bid_packages/{id}

**Show Bid Package**
Return Bid Package detailed information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `accept_post_due_submissions`: boolean - Accepts bid post due submissions e.g. `false`
- `accounting_method`: string - Bid package accounting method, either 'amount' or 'unit' e.g. `unit`
- `allow_bidder_sum`: boolean - Allow lump sum bidding e.g. `false`
- `project_currency_iso_code`: string - The ISO code of the project's currency (e.g., 'USD', 'EUR') e.g. `USD`
- `project_currency_display`: string - The display format of the project's currency (e.g., '$', '€') e.g. `$`
- `anticipated_award_date`: string(date) - Anticipated award date e.g. `2016-12-13`
- `bidding_countdown_email_days`: integer - Days before sending countdown email e.g. `2`
- `bid_docs_manifest`: object
  - `id`: integer - ID e.g. `5324`
  - `streaming_url`: string - Link to the bid package zip file e.g. `https://<server>/download?uuid=<id>`
- `bid_due_date`: string(date-time) - Due date e.g. `2016-12-13T03:00:00Z`
- `bid_email_message`: string - Information displayed in emails for Bidders e.g. `Procore would like to invite you to bid on new campus.`
- `bid_emails_include_link_to_bidding_documents`: boolean - Include link to download zipped bidding documents in the Bid Invitation email e.g. `false`
- `bid_submission_confirmation`: string - Bid Package submission confirmation text e.g. `Your Bid Has Been Successfully Submitted`
- `bid_web_message`: string - Bid Package instructions for Bidder e.g. `Please reach out to our help desk if you need assistance with bidding.`
- `blind_bidding`: boolean - Enable blind bidding e.g. `false`
- `created_by`: object
  - `email`: string - Email e.g. `john.doe@example.com`
  - `first`: string - First name e.g. `John`
  - `last`: string - First name e.g. `Doe`
  - `numbers`: string - Phone numbers e.g. `512-555-5555`
- `distribution_members`: array of object - Array of the distribution members
  - `email`: string - Contact email e.g. `john.doe@example.com`
  - `first`: string - Contact first name e.g. `John`
  - `last`: string - Contact last name e.g. `Doe`
  - `numbers`: string - Contact numbers e.g. `512-555-5555`
- `display_project_name`: boolean - Display Project Name e.g. `false`
- `bid_form_sections_enabled`: boolean - Bid Form Sections Enabled e.g. `true`
- `flexible_response_types_enabled`: boolean - Flexible Response Types Enabled e.g. `true`
- `distribution_member_ids`: array of integer - Array of distribution member ids
- `enable_countdown_emails`: boolean - Enable countdown emails e.g. `false`
- `enable_prebid_rfi_deadline`: boolean - Enable prebid RFI deadline e.g. `false`
- `enable_prebid_walkthrough`: boolean - Enable prebid walkthrough e.g. `false`
- `has_any_bid_invited`: boolean - Has any Bid been Invited e.g. `true`
- `has_bids_sent_nda`: boolean - Have any Bidders been sent NDA e.g. `true`
- `has_no_nda_activity`: boolean - Has no Non-Disclosure Agreement activity e.g. `false`
- `nda_invited_bids_with_activity_count`: integer - Bids count with Non-Disclosure Agreement activity like viewed, declined or downloaded e.g. `2`
- `attachments_zip_streaming_url`: string - Streaming URL to download all attachments. It's an optional parameter when the require non-disclosure agreement is on. e.g. `http://www.example.com/`
- `hidden`: boolean - Whether or not the bid package has been recycled e.g. `true`
- `id`: integer - ID e.g. `75414`
- `links`: object - Links that can be used by Frontend
  - `add_vendor`: string e.g. `/159/project/bid_packages/75/vendors`
  - `analyticsEventsPath`: string e.g. `/rest/v1.0/analytic_events`
  - `attach_documents`: string e.g. `/159/project/bid_packages/75/attachments`
  - `bid_list`: string e.g. `/159/project/bid_packages/75/bidders`
  - `bid_packages`: string e.g. `/rest/v1.0/projects/159/bid_packages`
  - `bid_packages_by_project`: string e.g. `/159/project/bid_packages/75/search_for_bidders/filter_options/copy_bid_list_...`
  - `bulk_create_bids`: string e.g. `/159/project/bid_packages/75/bids/bulk_create`
  - `cost_codes`: string e.g. `/159/project/bid_packages/75/search_for_bidders/filter_options/standard_cost_...`
  - `overview`: string e.g. `/159/project/bid_packages/75/overview`
  - `permission_templates`: string e.g. `/159/project/bid_packages/permission_templates`
  - `submit`: string e.g. `/159/project/bidding/bid_packages/75/add_to_bid_list`
  - `trades`: string e.g. `/159/project/bid_packages/75/search_for_bidders/filter_options/trades`
  - `vendors`: string e.g. `/159/project/bid_packages/75/vendors`
- `lump_sum_bidding`: boolean - Lump Sum Bidding Enabled e.g. `true`
- `manager`: object
  - `login_information_id`: integer - Login Information ID e.g. `67`
  - `contact_id`: integer - Contact ID e.g. `345`
  - `name`: string - Manager Name e.g. `John Doe`
  - `email`: string - Manager Email
  - `job_title`: string - Manager Job Title e.g. `Estimator`
  - `invited`: boolean - User Invited e.g. `true`
  - `vendor`: object
    - `id`: integer - Vendor ID e.g. `123`
    - `name`: string - Vendor name e.g. `Vendor Name`
- `nda_attachments`: array of object
  - `id`: string - ID e.g. `123`
  - `item_type`: string - Item Type e.g. `BidPackage`
  - `item_id`: string - Item ID e.g. `123`
  - `prostore_file_id`: string - Prostore File ID e.g. `123`
  - `url`: string - URL e.g. `https://procoretech-qa.com/v2/d/default/prostore-thumbnail-bucket/453550640`
  - `name`: string - Name e.g. `NDA.pdf`
- `number`: integer - Bid Package Number e.g. `46`
- `open`: boolean - Whether or not the bid package is active e.g. `true`
- `point_of_contact`: object
  - `email`: string - A person's email e.g. `john.doe@example.com`
  - `first`: string - A person's name e.g. `John`
  - `last`: string - A person's last name e.g. `Doe`
  - `numbers`: string - A person's phone numbers e.g. `5432132345`
- `point_of_contact_login_id`: integer - Point of contact ID e.g. `123`
- `pre_bid_rfi_deadline_date`: string(date-time) - Prebid RFI deadline date e.g. `2016-12-13T03:00:00Z`
- `pre_bid_walk_through_date`: string(date-time) - Scheduled pre-bid walkthrough date e.g. `2016-12-13T03:00:00Z`
- `pre_bid_walk_through_notes`: string - Pre-bid walkthrough notes e.g. `So Many Potential Change Orders`
- `project_id`: integer - Unique identifier for the project. e.g. `2342`
- `project_image_url`: string - Link to project image e.g. `https://procoretech-qa.com/v2/d/default/prostore-thumbnail-bucket/453550640`
- `project_logo_name`: string - Name of the project's logo file e.g. `procore-logo.png`
- `project_logo_url`: string - Link to project logo image e.g. `https://procoretech-qa.com/v2/d/default/prostore-thumbnail-bucket/453550640`
- `project_latitude`: string - Latitude of project location e.g. `-119.490849179262`
- `project_location`: string - Address of bid package project e.g. `123 Campus Way Carpinteria CA 91303`
- `project_longitude`: string - Longtitude of project location e.g. `34.385046412363`
- `project_name`: string - Name of bid package project e.g. `Procore Campus`
- `require_nda`: boolean - Require Non-Disclosure Agreement e.g. `false`
- `sealed`: boolean - Enabled sealed bidding e.g. `false`
- `show_bid_info`: boolean - Show bid info e.g. `false`
- `submitted_bids_count`: integer - Number bids submitted e.g. `2`
- `title`: string - Title e.g. `Procore Sky Campus`
- `enable_public_discovery`: boolean - Whether the bid package is discoverable by the public e.g. `false`
- `primary_slug_with_ids`: string - Primary public slug for the bid package with company ID and bid package ID prefix (format: {company_id}_{bid_package_id}_{slug}). Used in public URLs. Auto-generated from title when created or when title is updated. *... e.g. `123_456_procore-sky-campus`
- `pre_bid_meeting_location`: string - Location for the pre-bid meeting e.g. `123 Main St, Conference Room A, Austin, TX 78701`
- `pre_bid_meeting_date`: string(date-time) - Date and time for the pre-bid meeting in UTC (ISO 8601 format) e.g. `2025-10-20T14:00:00Z`
- `pre_bid_meeting_online_link`: string - Online meeting link for the pre-bid meeting e.g. `https://example.com`
- `pre_bid_meeting_notes`: string - Notes for the pre-bid meeting e.g. `Please bring safety equipment and hard hats`
- `public_project_funding_source`: string - Source of funding for the public project, either 'private' or 'public' e.g. `public`
- `show_location_for_nda_projects`: boolean - Whether the location for the NDA project is shown e.g. `false`
- `public_bid_opening_details_date`: string(date-time) - Date and time for the public bid opening in UTC (ISO 8601 format) e.g. `2025-10-20T14:00:00Z`
- `public_bid_opening_details_location`: string - Location for the public bid opening e.g. `City Hall, Room 301, Austin, TX 78701`
- `public_bid_opening_details_online_link`: string(uri) - Online link for the public bid opening e.g. `https://example.com`
- `trades_and_services`: array of object - Array of trades and services
  - `trade_level`: string - The level of the PCN trade classification e.g. `Division`
  - `trade_path`: string - The hierarchical path of the PCN trade e.g. `03 - Concrete`
  - `trade_key`: string - The unique key identifier for the PCN trade e.g. `03000`
- `business_classifications`: array of object - Array of business classifications
  - `classification_name`: string - The full name of the business classification e.g. `Asian American Business`
  - `classification_abbreviation`: string - The abbreviated form of the business classification e.g. `ABE`
  - `classification_key`: string - The unique key identifier for the business classification e.g. `ABE`
- `lock_unit_fields_base_bid`: boolean - Lock unit fields for all base bid items (global setting for new bid forms) e.g. `false`
- `lock_quantity_fields_base_bid`: boolean - Lock quantity fields for all base bid items (global setting for new bid forms) e.g. `false`
- `lock_unit_fields_alternates`: boolean - Lock unit fields for all alternate items (global setting for new bid forms) e.g. `false`
- `lock_quantity_fields_alternates`: boolean - Lock quantity fields for all alternate items (global setting for new bid forms) e.g. `false`
- `has_pdm_documents`: boolean - Whether the bid package has any PDM documents e.g. `true`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/bid_packages

**List Bid Packages**
Return a list of Bid Packages for a Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[bid_package_name, project_name, bid_due_date, bids_sent, bids_received] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): object

- `bidPackages`: array of object
  - `id`: integer - ID e.g. `75414`
  - `project_id`: integer - Unique identifier for the project. e.g. `2342`
  - `bid_due_date`: string(date-time) - Due date e.g. `2016-12-13T03:00:00Z`
  - `number`: integer - Bid Package Number e.g. `46`
  - `title`: string - Title e.g. `Procore Sky Campus`
  - `project_name`: string - Name of bid package project e.g. `Procore Campus`
  - `project_location`: string - Address of bid package project e.g. `123 Campus Way Carpinteria CA 91303`
  - `accounting_method`: string - Bid package accounting method, either 'amount' or 'unit' e.g. `unit`
  - `formatted_bid_due_date`: string - This is the date at which bids are due for this bid package e.g. `Thu Aug 23, 2018 at 01:00 am PDT <br /> Bid was Due over 2 years ago`
  - `links`: object - Links that can be used by Frontend
    - `self`: string e.g. `/rest/v1.0/companies/16/bid_packages/38`
    - `bid`: string e.g. `/rest/v1.0/companies/16/bids/67?view=planroom_redesign`
    - `bid_pdf`: string e.g. `/rest/v1.0/companies/16/bids/67.pdf`
    - `bid_list`: string e.g. `/17/project/bidding/bid_packages/39/bid_list?subtab=bid_list`
    - `emails`: string e.g. `/rest/v1.0/companies/16/bids/67/communications`
    - `addendums`: string e.g. `/rest/v1.0/companies/16/bid_packages/39/correspondences`
    - `files`: string
  - `allow_bidder_sum`: boolean - TODO e.g. `false`
  - `accept_post_due_submissions`: boolean e.g. `true`
  - `sealed`: boolean e.g. `false`
  - `bid_invites_sent_count`: number e.g. `2`
  - `bids_received_count`: number e.g. `0`
  - `enable_prebid_walkthrough`: boolean e.g. `false`
  - `enable_prebid_rfi_deadline`: boolean e.g. `false`
  - `pre_bid_rfi_deadline_date`: string e.g. `Thursday, August 23, 2018 at 01:00 am PDT`
  - `formatted_bid_web_message`: string e.g. `<p>&nbsp; &nbsp; &nbsp;If you need assistance accessing the bid documents, pl...`
  - `formatted_bid_email_message`: string e.g. `<p><span class="mceitemhidden">&nbsp; &nbsp; &nbsp;KP Construction [TEST[ wou...`
  - `formatted_pre_bid_walk_through_notes`: string
  - `has_bid_docs`: boolean e.g. `false`
  - `user_bid_id`: integer e.g. `24259822`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Area Bids

Resource id: `project-area-bids`. Raw spec: `../openapi-raw/project-area-bids.json`. Web: https://developers.procore.com/reference/rest/project-area-bids?version=latest
Product lines: PM Essentials, Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/bids  **[BETA]**

**List Bids within a Project**
Return a list of Bids within a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Array of Bids
  - `id`: string - ID e.g. `75414`
  - `bid_package_id`: string - Bid Package ID e.g. `91011`
  - `bid_package_title`: string - Bid Package title e.g. `Test Bid documents email link from correspondence`
  - `bid_form_title`: string - Bid Form Title e.g. `Bid Form Title`
  - `bid_form_id`: string - Bid Form ID e.g. `12345`
  - `bid_status`: string enum[undecided, will_not_bid, will_bid, not_invited, submitted] - Bid status
  - `awarded`: boolean - Bid awarded to vendor e.g. `false`
  - `company_id`: string - Company ID e.g. `3355`
  - `invitation_last_sent_at`: string(date-time) - Date/time the Bid Package invitation was last sent e.g. `2012-10-23T21:39:40Z`
  - `is_bidder_committed`: boolean - Bidder committed e.g. `true`
  - `lump_sum_amount`: number(float) - Lump sum (overall) amount e.g. `200.5`
  - `lump_sum_enabled`: boolean - Lump sum bidding enabled e.g. `false`
  - `submitted`: boolean - Vendor submitted Bid e.g. `true`
  - `created_at`: string(date-time) - Date/time the Bid Package was created e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Date/time the Bid Package was last updated e.g. `2012-10-24T21:39:40Z`
  - `due_date`: string(date-time) - Due Date e.g. `2016-12-13T03:00:00Z`
  - `bidder_comments`: string - Comments e.g. `Test Bid`
  - `require_nda`: boolean - Whether the bid requires NDA e.g. `false`
  - `display_project_name`: boolean - Whether to display project name before NDA is signed e.g. `true`
  - `nda_first_name`: string - NDA signer first name e.g. `John`
  - `nda_last_name`: string - NDA signer last name e.g. `Doe`
  - `nda_updated_at`: string(date-time) - Date/time when NDA was last updated e.g. `2012-10-23T21:39:40Z`
  - `nda_status`: string enum[viewed, downloaded, signed, declined] - NDA status
  - `nda_signed_at`: string(date-time) - Date/time when NDA was signed e.g. `2012-10-23T21:39:40Z`
  - `nda_email_last_sent_at`: string(date-time) - Date/time when NDA email was last sent e.g. `2012-10-23T21:39:40Z`
  - `bid_requester`: object - Bid Requester Info
    - `company`: string - The bid requesters company name e.g. `Demo Company 1`
    - `contact`: string - The bid requester's contact information e.g. `John Doe ((503)744-3200 ext. 1234)`
    - `company_address`: string - Bid requesters company address e.g. `123 Campus Way Carpinteria, CA 91303`
    - `company_phone`: string - Bid requesters company phone e.g. `8051231234`
    - `company_website`: string - Bid requesters company website e.g. `https://www.procore.com/`
    - `email_address`: string - Bid requesters email_address e.g. `joe.doe@example.com`
    - `first_name`: string - Bid requesters first_name e.g. `Joe`
    - `last_name`: string - Bid requesters last_name e.g. `Doe`
    - `mobile_phone`: string - Bid requesters mobile number e.g. `8051231234`
    - `vendor_address`: string - Bid requesters company address e.g. `6309 Carpinteria Ave.`
    - `business_phone`: string - Bid requesters company phone number e.g. `8051231234`
    - `fax_number`: string - Bid requesters company fax number e.g. `8051231234`
  - `vendor`: object - Bid Vendor Info
    - `name`: string - Name e.g. `Demo Company 1`
    - `avatar_url`: string - Link to avatar picture e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160422154654_production_3975...`
    - `trades`: string - List of trades for the vendor e.g. `General Conditions`
  - `project`: object - Project Info
    - `name`: string - Name e.g. `Project 1`
    - `address`: string - Address e.g. `One Space Way<br>Risa SB12<br>United States`

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Bid Packages

Resource id: `project-bid-packages`. Raw spec: `../openapi-raw/project-bid-packages.json`. Web: https://developers.procore.com/reference/rest/project-bid-packages?version=latest
Product lines: PM Essentials, Construction Financials

### GET /rest/v1.1/projects/{project_id}/bid_packages

**List Bid Packages**
Return a list of all Bid Packages for a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[all, internal, use_previous_bidders, use_previous_bid_packages] - When set to all, both open and closed bid packages will be returned. When set to internal, more keys will be made available for each bid package. When set to use_previous_bidders, a key will be made available that wil...
- `filter` [query] string enum[open, closed, hidden, has_bid_forms] - Filters down list of bid packages for a project.
- `with_flags` [query] array of string enum[flexible_response_types_enabled, bid_form_sections_enabled] - Filter bid packages by available features (e.g., flexible_response_types_enabled, bid_form_sections_enabled). For accurate results in the CPBP feature, both flags should be passed, not just one.
- `sort` [query] string enum[number, title, bid_due_date, invited_bids_count, bids_will_bid_count, submitted_bids_count, status] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter. Only applies when view=internal.
- `filters[bid_due_date]` [query] string(date) - Return item(s) whose associated bid package has the specified bid due date (ISO 8601 date format)
- `filters[status]` [query] string enum[open, closed, hidden] - Filter by bid package status. Accepted values are 'open', 'closed', or 'hidden'. When omitted, recycle-bin (hidden) bid packages are excluded by default.
- `filters[created_at]` [query] string - Return item(s) within a specific created at iso8601 datetime range
- `filters[has_bid_forms]` [query] boolean - Filter by bid form presence. When true, only bid packages that have bid forms are returned; when false, only bid packages without bid forms are returned. When omitted, no bid form filtering is applied. This filter is ...

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `project_id`: integer - Unique identifier for the project. e.g. `2342`
- `bid_due_date`: string(date-time) - Due date e.g. `2016-12-13T03:00:00Z`
- `created_at`: string(date-time) - Date the Bid Package was created e.g. `2016-12-01T00:00:00Z`
- `number`: integer - Package Number e.g. `42`
- `title`: string - Title e.g. `Package Bid`
- `submitted_bids_count`: integer - Number bids submitted e.g. `2`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/bid_packages/{bid_package_id}/correspondences

**List Correspondences**
Return a list of all Correspondences for a Bid Package.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `94529`
- `bid_package_id`: integer - Bid package ID e.g. `91011`
- `bid_package_title`: string - Bid package title e.g. `Ocean Home Bid Package`
- `created_at`: string - Correspondence created-at e.g. `Monday, May 14, 2018 at 11:31 am`
- `subject`: string - Subject within Correspondence e.g. `Ocean Home 9171`
- `attachments`: array of object
  - `id`: integer - File ID e.g. `1`
  - `name`: string - Base name of the file without its path e.g. `contract.pdf`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com`
  - `filename`: string - Base name of the file without its path e.g. `contract.pdf`
  - `content_type`: string - A mime type or a file extension e.g. `application/pdf`
  - `share_url`: string - Shareable URL(enabled on company level) or file URL e.g. `https://storage.procore.com`
  - `viewable_type`: string enum[document, document_pending, image, mp4, default] - Document type e.g. `default`
  - `viewable_url`: string - Viewable document URL e.g. `https://app.procore.com/`
- `message`: string - Body of Correspondence e.g. `Please note new revision of Ocean Home 9171`
- `recipients`: array of string - List of recipient names Correspondence was sent to e.g. `["Hector Jimenez", "Mike Wazny"]`
- `from`: object
  - `first`: string - Recipients first name e.g. `John`
  - `last`: string - Recipients last name e.g. `Doe`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/bid_packages/{bid_package_id}/correspondences/{id}

**Show Correspondence**
Return Correspondence detailed information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `bid_package_id` [path] integer (required) - Bid Package ID
- `id` [path] integer (required) - Correspondence ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `94529`
- `bid_package_id`: integer - Bid package ID e.g. `91011`
- `bid_package_title`: string - Bid package title e.g. `Ocean Home Bid Package`
- `created_at`: string - Correspondence created-at e.g. `Monday, May 14, 2018 at 11:31 am`
- `subject`: string - Subject within Correspondence e.g. `Ocean Home 9171`
- `attachments`: array of object
  - `id`: integer - File ID e.g. `1`
  - `name`: string - Base name of the file without its path e.g. `contract.pdf`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com`
  - `filename`: string - Base name of the file without its path e.g. `contract.pdf`
  - `content_type`: string - A mime type or a file extension e.g. `application/pdf`
  - `share_url`: string - Shareable URL(enabled on company level) or file URL e.g. `https://storage.procore.com`
  - `viewable_type`: string enum[document, document_pending, image, mp4, default] - Document type e.g. `default`
  - `viewable_url`: string - Viewable document URL e.g. `https://app.procore.com/`
- `message`: string - Body of Correspondence e.g. `Please note new revision of Ocean Home 9171`
- `recipients`: array of string - List of recipient names Correspondence was sent to e.g. `["Hector Jimenez", "Mike Wazny"]`
- `from`: object
  - `first`: string - Recipients first name e.g. `John`
  - `last`: string - Recipients last name e.g. `Doe`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/bid_packages

**Create Bid Package**
Create a Bid Package.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `bid_package`: object (required) - Bid Package Object
  - `accept_post_due_submissions`: boolean - Accepts bid post due submissions e.g. `false`
  - `bid_due_date`: string(date-time) (required) - Due date e.g. `2016-12-13T03:00:00Z`
  - `bid_email_message`: string (required) - Bid package email information details e.g. `Procore would like to invite you to bid on new campus`
  - `bid_web_message`: string (required) - Bid package bidding instructions e.g. `Please reach out to our help desk if you need assistance with bidding.`
  - `title`: string (required) - Bid package title e.g. `Procore Sky Campus`
  - `accounting_method`: string - Bid package accounting method, either 'amount' or 'unit' e.g. `unit`
  - `bid_submission_confirmation`: string - Bid Package submission confirmation text e.g. `Your Bid Has Been Successfully Submitted`
  - `anticipated_award_date`: string(date) - Anticipated award date e.g. `2016-12-13`
  - `number`: string - Bid package number e.g. `46`
  - `distribution_ids`: array of integer - Array of User IDs who will be on the bid package's distribution list
  - `blind_bidding`: boolean - Blind bidding enabled e.g. `false`
  - `pre_bid_walk_through_date`: string(date-time) - Scheduled pre-bid walkthrough date e.g. `2016-12-13T03:00:00Z`
  - `pre_bid_walk_through_notes`: string - Pre-bid walkthrough notes e.g. `So Many Potential Change Orders`
  - `enable_prebid_walkthrough`: boolean - Pre-bid walkthrough enabled e.g. `true`
  - `manager_id`: integer - Login Information ID for Manager e.g. `1587816`
  - `require_nda`: boolean - Require Non-Disclosure Agreement e.g. `false`
  - `display_project_name`: boolean - Display project name e.g. `true`
  - `prostore_file_ids`: array of integer - Array of Procore File IDs for Non-Disclosure Agreement
  - `enable_public_discovery`: boolean - Whether the bid package is discoverable by the public e.g. `false`
  - `pre_bid_meeting_location`: string - Location for the pre-bid meeting e.g. `123 Main St, Conference Room A, Austin, TX 78701`
  - `pre_bid_meeting_date`: string(date-time) - Date and time for the pre-bid meeting in UTC (ISO 8601 format) e.g. `2025-10-20T14:00:00Z`
  - `pre_bid_meeting_online_link`: string - Online meeting link for the pre-bid meeting e.g. `https://zoom.us/j/1234567890`
  - `pre_bid_meeting_notes`: string - Notes for the pre-bid meeting e.g. `Please bring safety equipment and hard hats`
  - `public_project_funding_source`: string - Source of funding for the public project, either 'private' or 'public' e.g. `public`
  - `show_location_for_nda_projects`: boolean - Whether the location for the NDA project is shown e.g. `false`
  - `public_bid_opening_details_date`: string(date-time) - Date and time for the public bid opening in UTC (ISO 8601 format) e.g. `2025-10-20T14:00:00Z`
  - `public_bid_opening_details_location`: string - Location for the public bid opening e.g. `City Hall, Room 301, Austin, TX 78701`
  - `public_bid_opening_details_online_link`: string(uri) - Online link for the public bid opening e.g. `https://zoom.us/j/9876543210`
  - `trades_and_services`: array of object - Array of trades and services
    - `trade_level`: string - The level of the PCN trade classification e.g. `Division`
    - `trade_path`: string - The hierarchical path of the PCN trade e.g. `03 - Concrete`
    - `trade_key`: string - The unique key identifier for the PCN trade e.g. `03000`
  - `business_classifications`: array of object - Array of business classifications
    - `classification_name`: string - The full name of the business classification e.g. `Small Business`
    - `classification_abbreviation`: string - The abbreviated form of the business classification e.g. `SBE`
    - `classification_key`: string - The unique key identifier for the business classification e.g. `SBE`

Response 201 (application/json): object

- `accept_post_due_submissions`: boolean - Accepts bid post due submissions e.g. `false`
- `accounting_method`: string - Bid package accounting method, either 'amount' or 'unit' e.g. `unit`
- `allow_bidder_sum`: boolean - Allow lump sum bidding e.g. `false`
- `project_currency_iso_code`: string - The ISO code of the project's currency (e.g., 'USD', 'EUR') e.g. `USD`
- `project_currency_display`: string - The display format of the project's currency (e.g., '$', '€') e.g. `$`
- `anticipated_award_date`: string(date) - Anticipated award date e.g. `2016-12-13`
- `bidding_countdown_email_days`: integer - Days before sending countdown email e.g. `2`
- `bid_docs_manifest`: object
  - `id`: integer - ID e.g. `5324`
  - `streaming_url`: string - Link to the bid package zip file e.g. `https://<server>/download?uuid=<id>`
- `bid_due_date`: string(date-time) - Due date e.g. `2016-12-13T03:00:00Z`
- `bid_email_message`: string - Information displayed in emails for Bidders e.g. `Procore would like to invite you to bid on new campus.`
- `bid_emails_include_link_to_bidding_documents`: boolean - Include link to download zipped bidding documents in the Bid Invitation email e.g. `false`
- `bid_submission_confirmation`: string - Bid Package submission confirmation text e.g. `Your Bid Has Been Successfully Submitted`
- `bid_web_message`: string - Bid Package instructions for Bidder e.g. `Please reach out to our help desk if you need assistance with bidding.`
- `blind_bidding`: boolean - Enable blind bidding e.g. `false`
- `created_by`: object
  - `email`: string - Email e.g. `john.doe@example.com`
  - `first`: string - First name e.g. `John`
  - `last`: string - First name e.g. `Doe`
  - `numbers`: string - Phone numbers e.g. `512-555-5555`
- `distribution_members`: array of object - Array of the distribution members
  - `email`: string - Contact email e.g. `john.doe@example.com`
  - `first`: string - Contact first name e.g. `John`
  - `last`: string - Contact last name e.g. `Doe`
  - `numbers`: string - Contact numbers e.g. `512-555-5555`
- `display_project_name`: boolean - Display Project Name e.g. `false`
- `bid_form_sections_enabled`: boolean - Bid Form Sections Enabled e.g. `true`
- `flexible_response_types_enabled`: boolean - Flexible Response Types Enabled e.g. `true`
- `distribution_member_ids`: array of integer - Array of distribution member ids
- `enable_countdown_emails`: boolean - Enable countdown emails e.g. `false`
- `enable_prebid_rfi_deadline`: boolean - Enable prebid RFI deadline e.g. `false`
- `enable_prebid_walkthrough`: boolean - Enable prebid walkthrough e.g. `false`
- `has_any_bid_invited`: boolean - Has any Bid been Invited e.g. `true`
- `has_bids_sent_nda`: boolean - Have any Bidders been sent NDA e.g. `true`
- `has_no_nda_activity`: boolean - Has no Non-Disclosure Agreement activity e.g. `false`
- `nda_invited_bids_with_activity_count`: integer - Bids count with Non-Disclosure Agreement activity like viewed, declined or downloaded e.g. `2`
- `attachments_zip_streaming_url`: string - Streaming URL to download all attachments. It's an optional parameter when the require non-disclosure agreement is on. e.g. `http://www.example.com/`
- `hidden`: boolean - Whether or not the bid package has been recycled e.g. `true`
- `id`: integer - ID e.g. `75414`
- `links`: object - Links that can be used by Frontend
  - `add_vendor`: string e.g. `/159/project/bid_packages/75/vendors`
  - `analyticsEventsPath`: string e.g. `/rest/v1.0/analytic_events`
  - `attach_documents`: string e.g. `/159/project/bid_packages/75/attachments`
  - `bid_list`: string e.g. `/159/project/bid_packages/75/bidders`
  - `bid_packages`: string e.g. `/rest/v1.0/projects/159/bid_packages`
  - `bid_packages_by_project`: string e.g. `/159/project/bid_packages/75/search_for_bidders/filter_options/copy_bid_list_...`
  - `bulk_create_bids`: string e.g. `/159/project/bid_packages/75/bids/bulk_create`
  - `cost_codes`: string e.g. `/159/project/bid_packages/75/search_for_bidders/filter_options/standard_cost_...`
  - `overview`: string e.g. `/159/project/bid_packages/75/overview`
  - `permission_templates`: string e.g. `/159/project/bid_packages/permission_templates`
  - `submit`: string e.g. `/159/project/bidding/bid_packages/75/add_to_bid_list`
  - `trades`: string e.g. `/159/project/bid_packages/75/search_for_bidders/filter_options/trades`
  - `vendors`: string e.g. `/159/project/bid_packages/75/vendors`
- `lump_sum_bidding`: boolean - Lump Sum Bidding Enabled e.g. `true`
- `manager`: object
  - `login_information_id`: integer - Login Information ID e.g. `67`
  - `contact_id`: integer - Contact ID e.g. `345`
  - `name`: string - Manager Name e.g. `John Doe`
  - `email`: string - Manager Email
  - `job_title`: string - Manager Job Title e.g. `Estimator`
  - `invited`: boolean - User Invited e.g. `true`
  - `vendor`: object
    - `id`: integer - Vendor ID e.g. `123`
    - `name`: string - Vendor name e.g. `Vendor Name`
- `nda_attachments`: array of object
  - `id`: string - ID e.g. `123`
  - `item_type`: string - Item Type e.g. `BidPackage`
  - `item_id`: string - Item ID e.g. `123`
  - `prostore_file_id`: string - Prostore File ID e.g. `123`
  - `url`: string - URL e.g. `https://procoretech-qa.com/v2/d/default/prostore-thumbnail-bucket/453550640`
  - `name`: string - Name e.g. `NDA.pdf`
- `number`: integer - Bid Package Number e.g. `46`
- `open`: boolean - Whether or not the bid package is active e.g. `true`
- `point_of_contact`: object
  - `email`: string - A person's email e.g. `john.doe@example.com`
  - `first`: string - A person's name e.g. `John`
  - `last`: string - A person's last name e.g. `Doe`
  - `numbers`: string - A person's phone numbers e.g. `5432132345`
- `point_of_contact_login_id`: integer - Point of contact ID e.g. `123`
- `pre_bid_rfi_deadline_date`: string(date-time) - Prebid RFI deadline date e.g. `2016-12-13T03:00:00Z`
- `pre_bid_walk_through_date`: string(date-time) - Scheduled pre-bid walkthrough date e.g. `2016-12-13T03:00:00Z`
- `pre_bid_walk_through_notes`: string - Pre-bid walkthrough notes e.g. `So Many Potential Change Orders`
- `project_id`: integer - Unique identifier for the project. e.g. `2342`
- `project_image_url`: string - Link to project image e.g. `https://procoretech-qa.com/v2/d/default/prostore-thumbnail-bucket/453550640`
- `project_logo_name`: string - Name of the project's logo file e.g. `procore-logo.png`
- `project_logo_url`: string - Link to project logo image e.g. `https://procoretech-qa.com/v2/d/default/prostore-thumbnail-bucket/453550640`
- `project_latitude`: string - Latitude of project location e.g. `-119.490849179262`
- `project_location`: string - Address of bid package project e.g. `123 Campus Way Carpinteria CA 91303`
- `project_longitude`: string - Longtitude of project location e.g. `34.385046412363`
- `project_name`: string - Name of bid package project e.g. `Procore Campus`
- `require_nda`: boolean - Require Non-Disclosure Agreement e.g. `false`
- `sealed`: boolean - Enabled sealed bidding e.g. `false`
- `show_bid_info`: boolean - Show bid info e.g. `false`
- `submitted_bids_count`: integer - Number bids submitted e.g. `2`
- `title`: string - Title e.g. `Procore Sky Campus`
- `enable_public_discovery`: boolean - Whether the bid package is discoverable by the public e.g. `false`
- `primary_slug_with_ids`: string - Primary public slug for the bid package with company ID and bid package ID prefix (format: {company_id}_{bid_package_id}_{slug}). Used in public URLs. Auto-generated from title when created or when title is updated. *... e.g. `123_456_procore-sky-campus`
- `pre_bid_meeting_location`: string - Location for the pre-bid meeting e.g. `123 Main St, Conference Room A, Austin, TX 78701`
- `pre_bid_meeting_date`: string(date-time) - Date and time for the pre-bid meeting in UTC (ISO 8601 format) e.g. `2025-10-20T14:00:00Z`
- `pre_bid_meeting_online_link`: string - Online meeting link for the pre-bid meeting e.g. `https://example.com`
- `pre_bid_meeting_notes`: string - Notes for the pre-bid meeting e.g. `Please bring safety equipment and hard hats`
- `public_project_funding_source`: string - Source of funding for the public project, either 'private' or 'public' e.g. `public`
- `show_location_for_nda_projects`: boolean - Whether the location for the NDA project is shown e.g. `false`
- `public_bid_opening_details_date`: string(date-time) - Date and time for the public bid opening in UTC (ISO 8601 format) e.g. `2025-10-20T14:00:00Z`
- `public_bid_opening_details_location`: string - Location for the public bid opening e.g. `City Hall, Room 301, Austin, TX 78701`
- `public_bid_opening_details_online_link`: string(uri) - Online link for the public bid opening e.g. `https://example.com`
- `trades_and_services`: array of object - Array of trades and services
  - `trade_level`: string - The level of the PCN trade classification e.g. `Division`
  - `trade_path`: string - The hierarchical path of the PCN trade e.g. `03 - Concrete`
  - `trade_key`: string - The unique key identifier for the PCN trade e.g. `03000`
- `business_classifications`: array of object - Array of business classifications
  - `classification_name`: string - The full name of the business classification e.g. `Asian American Business`
  - `classification_abbreviation`: string - The abbreviated form of the business classification e.g. `ABE`
  - `classification_key`: string - The unique key identifier for the business classification e.g. `ABE`
- `lock_unit_fields_base_bid`: boolean - Lock unit fields for all base bid items (global setting for new bid forms) e.g. `false`
- `lock_quantity_fields_base_bid`: boolean - Lock quantity fields for all base bid items (global setting for new bid forms) e.g. `false`
- `lock_unit_fields_alternates`: boolean - Lock unit fields for all alternate items (global setting for new bid forms) e.g. `false`
- `lock_quantity_fields_alternates`: boolean - Lock quantity fields for all alternate items (global setting for new bid forms) e.g. `false`
- `has_pdm_documents`: boolean - Whether the bid package has any PDM documents e.g. `true`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/bid_packages/{id}

**Show Bid Package**
Return Bid Package detailed information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `accept_post_due_submissions`: boolean - Accepts bid post due submissions e.g. `false`
- `accounting_method`: string - Bid package accounting method, either 'amount' or 'unit' e.g. `unit`
- `allow_bidder_sum`: boolean - Allow lump sum bidding e.g. `false`
- `project_currency_iso_code`: string - The ISO code of the project's currency (e.g., 'USD', 'EUR') e.g. `USD`
- `project_currency_display`: string - The display format of the project's currency (e.g., '$', '€') e.g. `$`
- `anticipated_award_date`: string(date) - Anticipated award date e.g. `2016-12-13`
- `bidding_countdown_email_days`: integer - Days before sending countdown email e.g. `2`
- `bid_docs_manifest`: object
  - `id`: integer - ID e.g. `5324`
  - `streaming_url`: string - Link to the bid package zip file e.g. `https://<server>/download?uuid=<id>`
- `bid_due_date`: string(date-time) - Due date e.g. `2016-12-13T03:00:00Z`
- `bid_email_message`: string - Information displayed in emails for Bidders e.g. `Procore would like to invite you to bid on new campus.`
- `bid_emails_include_link_to_bidding_documents`: boolean - Include link to download zipped bidding documents in the Bid Invitation email e.g. `false`
- `bid_submission_confirmation`: string - Bid Package submission confirmation text e.g. `Your Bid Has Been Successfully Submitted`
- `bid_web_message`: string - Bid Package instructions for Bidder e.g. `Please reach out to our help desk if you need assistance with bidding.`
- `blind_bidding`: boolean - Enable blind bidding e.g. `false`
- `created_by`: object
  - `email`: string - Email e.g. `john.doe@example.com`
  - `first`: string - First name e.g. `John`
  - `last`: string - First name e.g. `Doe`
  - `numbers`: string - Phone numbers e.g. `512-555-5555`
- `distribution_members`: array of object - Array of the distribution members
  - `email`: string - Contact email e.g. `john.doe@example.com`
  - `first`: string - Contact first name e.g. `John`
  - `last`: string - Contact last name e.g. `Doe`
  - `numbers`: string - Contact numbers e.g. `512-555-5555`
- `display_project_name`: boolean - Display Project Name e.g. `false`
- `bid_form_sections_enabled`: boolean - Bid Form Sections Enabled e.g. `true`
- `flexible_response_types_enabled`: boolean - Flexible Response Types Enabled e.g. `true`
- `distribution_member_ids`: array of integer - Array of distribution member ids
- `enable_countdown_emails`: boolean - Enable countdown emails e.g. `false`
- `enable_prebid_rfi_deadline`: boolean - Enable prebid RFI deadline e.g. `false`
- `enable_prebid_walkthrough`: boolean - Enable prebid walkthrough e.g. `false`
- `has_any_bid_invited`: boolean - Has any Bid been Invited e.g. `true`
- `has_bids_sent_nda`: boolean - Have any Bidders been sent NDA e.g. `true`
- `has_no_nda_activity`: boolean - Has no Non-Disclosure Agreement activity e.g. `false`
- `nda_invited_bids_with_activity_count`: integer - Bids count with Non-Disclosure Agreement activity like viewed, declined or downloaded e.g. `2`
- `attachments_zip_streaming_url`: string - Streaming URL to download all attachments. It's an optional parameter when the require non-disclosure agreement is on. e.g. `http://www.example.com/`
- `hidden`: boolean - Whether or not the bid package has been recycled e.g. `true`
- `id`: integer - ID e.g. `75414`
- `links`: object - Links that can be used by Frontend
  - `add_vendor`: string e.g. `/159/project/bid_packages/75/vendors`
  - `analyticsEventsPath`: string e.g. `/rest/v1.0/analytic_events`
  - `attach_documents`: string e.g. `/159/project/bid_packages/75/attachments`
  - `bid_list`: string e.g. `/159/project/bid_packages/75/bidders`
  - `bid_packages`: string e.g. `/rest/v1.0/projects/159/bid_packages`
  - `bid_packages_by_project`: string e.g. `/159/project/bid_packages/75/search_for_bidders/filter_options/copy_bid_list_...`
  - `bulk_create_bids`: string e.g. `/159/project/bid_packages/75/bids/bulk_create`
  - `cost_codes`: string e.g. `/159/project/bid_packages/75/search_for_bidders/filter_options/standard_cost_...`
  - `overview`: string e.g. `/159/project/bid_packages/75/overview`
  - `permission_templates`: string e.g. `/159/project/bid_packages/permission_templates`
  - `submit`: string e.g. `/159/project/bidding/bid_packages/75/add_to_bid_list`
  - `trades`: string e.g. `/159/project/bid_packages/75/search_for_bidders/filter_options/trades`
  - `vendors`: string e.g. `/159/project/bid_packages/75/vendors`
- `lump_sum_bidding`: boolean - Lump Sum Bidding Enabled e.g. `true`
- `manager`: object
  - `login_information_id`: integer - Login Information ID e.g. `67`
  - `contact_id`: integer - Contact ID e.g. `345`
  - `name`: string - Manager Name e.g. `John Doe`
  - `email`: string - Manager Email
  - `job_title`: string - Manager Job Title e.g. `Estimator`
  - `invited`: boolean - User Invited e.g. `true`
  - `vendor`: object
    - `id`: integer - Vendor ID e.g. `123`
    - `name`: string - Vendor name e.g. `Vendor Name`
- `nda_attachments`: array of object
  - `id`: string - ID e.g. `123`
  - `item_type`: string - Item Type e.g. `BidPackage`
  - `item_id`: string - Item ID e.g. `123`
  - `prostore_file_id`: string - Prostore File ID e.g. `123`
  - `url`: string - URL e.g. `https://procoretech-qa.com/v2/d/default/prostore-thumbnail-bucket/453550640`
  - `name`: string - Name e.g. `NDA.pdf`
- `number`: integer - Bid Package Number e.g. `46`
- `open`: boolean - Whether or not the bid package is active e.g. `true`
- `point_of_contact`: object
  - `email`: string - A person's email e.g. `john.doe@example.com`
  - `first`: string - A person's name e.g. `John`
  - `last`: string - A person's last name e.g. `Doe`
  - `numbers`: string - A person's phone numbers e.g. `5432132345`
- `point_of_contact_login_id`: integer - Point of contact ID e.g. `123`
- `pre_bid_rfi_deadline_date`: string(date-time) - Prebid RFI deadline date e.g. `2016-12-13T03:00:00Z`
- `pre_bid_walk_through_date`: string(date-time) - Scheduled pre-bid walkthrough date e.g. `2016-12-13T03:00:00Z`
- `pre_bid_walk_through_notes`: string - Pre-bid walkthrough notes e.g. `So Many Potential Change Orders`
- `project_id`: integer - Unique identifier for the project. e.g. `2342`
- `project_image_url`: string - Link to project image e.g. `https://procoretech-qa.com/v2/d/default/prostore-thumbnail-bucket/453550640`
- `project_logo_name`: string - Name of the project's logo file e.g. `procore-logo.png`
- `project_logo_url`: string - Link to project logo image e.g. `https://procoretech-qa.com/v2/d/default/prostore-thumbnail-bucket/453550640`
- `project_latitude`: string - Latitude of project location e.g. `-119.490849179262`
- `project_location`: string - Address of bid package project e.g. `123 Campus Way Carpinteria CA 91303`
- `project_longitude`: string - Longtitude of project location e.g. `34.385046412363`
- `project_name`: string - Name of bid package project e.g. `Procore Campus`
- `require_nda`: boolean - Require Non-Disclosure Agreement e.g. `false`
- `sealed`: boolean - Enabled sealed bidding e.g. `false`
- `show_bid_info`: boolean - Show bid info e.g. `false`
- `submitted_bids_count`: integer - Number bids submitted e.g. `2`
- `title`: string - Title e.g. `Procore Sky Campus`
- `enable_public_discovery`: boolean - Whether the bid package is discoverable by the public e.g. `false`
- `primary_slug_with_ids`: string - Primary public slug for the bid package with company ID and bid package ID prefix (format: {company_id}_{bid_package_id}_{slug}). Used in public URLs. Auto-generated from title when created or when title is updated. *... e.g. `123_456_procore-sky-campus`
- `pre_bid_meeting_location`: string - Location for the pre-bid meeting e.g. `123 Main St, Conference Room A, Austin, TX 78701`
- `pre_bid_meeting_date`: string(date-time) - Date and time for the pre-bid meeting in UTC (ISO 8601 format) e.g. `2025-10-20T14:00:00Z`
- `pre_bid_meeting_online_link`: string - Online meeting link for the pre-bid meeting e.g. `https://example.com`
- `pre_bid_meeting_notes`: string - Notes for the pre-bid meeting e.g. `Please bring safety equipment and hard hats`
- `public_project_funding_source`: string - Source of funding for the public project, either 'private' or 'public' e.g. `public`
- `show_location_for_nda_projects`: boolean - Whether the location for the NDA project is shown e.g. `false`
- `public_bid_opening_details_date`: string(date-time) - Date and time for the public bid opening in UTC (ISO 8601 format) e.g. `2025-10-20T14:00:00Z`
- `public_bid_opening_details_location`: string - Location for the public bid opening e.g. `City Hall, Room 301, Austin, TX 78701`
- `public_bid_opening_details_online_link`: string(uri) - Online link for the public bid opening e.g. `https://example.com`
- `trades_and_services`: array of object - Array of trades and services
  - `trade_level`: string - The level of the PCN trade classification e.g. `Division`
  - `trade_path`: string - The hierarchical path of the PCN trade e.g. `03 - Concrete`
  - `trade_key`: string - The unique key identifier for the PCN trade e.g. `03000`
- `business_classifications`: array of object - Array of business classifications
  - `classification_name`: string - The full name of the business classification e.g. `Asian American Business`
  - `classification_abbreviation`: string - The abbreviated form of the business classification e.g. `ABE`
  - `classification_key`: string - The unique key identifier for the business classification e.g. `ABE`
- `lock_unit_fields_base_bid`: boolean - Lock unit fields for all base bid items (global setting for new bid forms) e.g. `false`
- `lock_quantity_fields_base_bid`: boolean - Lock quantity fields for all base bid items (global setting for new bid forms) e.g. `false`
- `lock_unit_fields_alternates`: boolean - Lock unit fields for all alternate items (global setting for new bid forms) e.g. `false`
- `lock_quantity_fields_alternates`: boolean - Lock quantity fields for all alternate items (global setting for new bid forms) e.g. `false`
- `has_pdm_documents`: boolean - Whether the bid package has any PDM documents e.g. `true`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/bid_packages/{id}

**Update Bid Package**
Update a Bid Package.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID

Request body (application/json) (required):

- `bid_package`: object (required) - Bid Package Object
  - `accept_post_due_submissions`: boolean - Accepts bid post due submissions e.g. `false`
  - `bid_due_date`: string(date-time) (required) - Due date e.g. `2016-12-13T03:00:00Z`
  - `bid_email_message`: string (required) - Bid package email information details e.g. `Procore would like to invite you to bid on new campus`
  - `bid_web_message`: string (required) - Bid package bidding instructions e.g. `Please reach out to our help desk if you need assistance with bidding.`
  - `title`: string (required) - Bid package title e.g. `Procore Sky Campus`
  - `accounting_method`: string - Bid package accounting method, either 'amount' or 'unit' e.g. `unit`
  - `bid_submission_confirmation`: string - Bid Package submission confirmation text e.g. `Your Bid Has Been Successfully Submitted`
  - `anticipated_award_date`: string(date) - Anticipated award date e.g. `2016-12-13`
  - `number`: string - Bid package number e.g. `46`
  - `distribution_ids`: array of integer - Array of User IDs who will be on the bid package's distribution list
  - `blind_bidding`: boolean - Blind bidding enabled e.g. `false`
  - `pre_bid_walk_through_date`: string(date-time) - Scheduled pre-bid walkthrough date e.g. `2016-12-13T03:00:00Z`
  - `pre_bid_walk_through_notes`: string - Pre-bid walkthrough notes e.g. `So Many Potential Change Orders`
  - `enable_prebid_walkthrough`: boolean - Pre-bid walkthrough enabled e.g. `true`
  - `manager_id`: integer - Login Information ID for Manager e.g. `1587816`
  - `require_nda`: boolean - Require Non-Disclosure Agreement e.g. `false`
  - `display_project_name`: boolean - Display project name e.g. `true`
  - `prostore_file_ids`: array of integer - Array of Procore File IDs for Non-Disclosure Agreement
  - `enable_public_discovery`: boolean - Whether the bid package is discoverable by the public e.g. `false`
  - `pre_bid_meeting_location`: string - Location for the pre-bid meeting e.g. `123 Main St, Conference Room A, Austin, TX 78701`
  - `pre_bid_meeting_date`: string(date-time) - Date and time for the pre-bid meeting in UTC (ISO 8601 format) e.g. `2025-10-20T14:00:00Z`
  - `pre_bid_meeting_online_link`: string - Online meeting link for the pre-bid meeting e.g. `https://zoom.us/j/1234567890`
  - `pre_bid_meeting_notes`: string - Notes for the pre-bid meeting e.g. `Please bring safety equipment and hard hats`
  - `public_project_funding_source`: string - Source of funding for the public project, either 'private' or 'public' e.g. `public`
  - `show_location_for_nda_projects`: boolean - Whether the location for the NDA project is shown e.g. `false`
  - `public_bid_opening_details_date`: string(date-time) - Date and time for the public bid opening in UTC (ISO 8601 format) e.g. `2025-10-20T14:00:00Z`
  - `public_bid_opening_details_location`: string - Location for the public bid opening e.g. `City Hall, Room 301, Austin, TX 78701`
  - `public_bid_opening_details_online_link`: string(uri) - Online link for the public bid opening e.g. `https://zoom.us/j/9876543210`
  - `trades_and_services`: array of object - Array of trades and services
    - `trade_level`: string - The level of the PCN trade classification e.g. `Division`
    - `trade_path`: string - The hierarchical path of the PCN trade e.g. `03 - Concrete`
    - `trade_key`: string - The unique key identifier for the PCN trade e.g. `03000`
  - `business_classifications`: array of object - Array of business classifications
    - `classification_name`: string - The full name of the business classification e.g. `Small Business`
    - `classification_abbreviation`: string - The abbreviated form of the business classification e.g. `SBE`
    - `classification_key`: string - The unique key identifier for the business classification e.g. `SBE`

Response 200 (application/json): object

- `accept_post_due_submissions`: boolean - Accepts bid post due submissions e.g. `false`
- `accounting_method`: string - Bid package accounting method, either 'amount' or 'unit' e.g. `unit`
- `allow_bidder_sum`: boolean - Allow lump sum bidding e.g. `false`
- `project_currency_iso_code`: string - The ISO code of the project's currency (e.g., 'USD', 'EUR') e.g. `USD`
- `project_currency_display`: string - The display format of the project's currency (e.g., '$', '€') e.g. `$`
- `anticipated_award_date`: string(date) - Anticipated award date e.g. `2016-12-13`
- `bidding_countdown_email_days`: integer - Days before sending countdown email e.g. `2`
- `bid_docs_manifest`: object
  - `id`: integer - ID e.g. `5324`
  - `streaming_url`: string - Link to the bid package zip file e.g. `https://<server>/download?uuid=<id>`
- `bid_due_date`: string(date-time) - Due date e.g. `2016-12-13T03:00:00Z`
- `bid_email_message`: string - Information displayed in emails for Bidders e.g. `Procore would like to invite you to bid on new campus.`
- `bid_emails_include_link_to_bidding_documents`: boolean - Include link to download zipped bidding documents in the Bid Invitation email e.g. `false`
- `bid_submission_confirmation`: string - Bid Package submission confirmation text e.g. `Your Bid Has Been Successfully Submitted`
- `bid_web_message`: string - Bid Package instructions for Bidder e.g. `Please reach out to our help desk if you need assistance with bidding.`
- `blind_bidding`: boolean - Enable blind bidding e.g. `false`
- `created_by`: object
  - `email`: string - Email e.g. `john.doe@example.com`
  - `first`: string - First name e.g. `John`
  - `last`: string - First name e.g. `Doe`
  - `numbers`: string - Phone numbers e.g. `512-555-5555`
- `distribution_members`: array of object - Array of the distribution members
  - `email`: string - Contact email e.g. `john.doe@example.com`
  - `first`: string - Contact first name e.g. `John`
  - `last`: string - Contact last name e.g. `Doe`
  - `numbers`: string - Contact numbers e.g. `512-555-5555`
- `display_project_name`: boolean - Display Project Name e.g. `false`
- `bid_form_sections_enabled`: boolean - Bid Form Sections Enabled e.g. `true`
- `flexible_response_types_enabled`: boolean - Flexible Response Types Enabled e.g. `true`
- `distribution_member_ids`: array of integer - Array of distribution member ids
- `enable_countdown_emails`: boolean - Enable countdown emails e.g. `false`
- `enable_prebid_rfi_deadline`: boolean - Enable prebid RFI deadline e.g. `false`
- `enable_prebid_walkthrough`: boolean - Enable prebid walkthrough e.g. `false`
- `has_any_bid_invited`: boolean - Has any Bid been Invited e.g. `true`
- `has_bids_sent_nda`: boolean - Have any Bidders been sent NDA e.g. `true`
- `has_no_nda_activity`: boolean - Has no Non-Disclosure Agreement activity e.g. `false`
- `nda_invited_bids_with_activity_count`: integer - Bids count with Non-Disclosure Agreement activity like viewed, declined or downloaded e.g. `2`
- `attachments_zip_streaming_url`: string - Streaming URL to download all attachments. It's an optional parameter when the require non-disclosure agreement is on. e.g. `http://www.example.com/`
- `hidden`: boolean - Whether or not the bid package has been recycled e.g. `true`
- `id`: integer - ID e.g. `75414`
- `links`: object - Links that can be used by Frontend
  - `add_vendor`: string e.g. `/159/project/bid_packages/75/vendors`
  - `analyticsEventsPath`: string e.g. `/rest/v1.0/analytic_events`
  - `attach_documents`: string e.g. `/159/project/bid_packages/75/attachments`
  - `bid_list`: string e.g. `/159/project/bid_packages/75/bidders`
  - `bid_packages`: string e.g. `/rest/v1.0/projects/159/bid_packages`
  - `bid_packages_by_project`: string e.g. `/159/project/bid_packages/75/search_for_bidders/filter_options/copy_bid_list_...`
  - `bulk_create_bids`: string e.g. `/159/project/bid_packages/75/bids/bulk_create`
  - `cost_codes`: string e.g. `/159/project/bid_packages/75/search_for_bidders/filter_options/standard_cost_...`
  - `overview`: string e.g. `/159/project/bid_packages/75/overview`
  - `permission_templates`: string e.g. `/159/project/bid_packages/permission_templates`
  - `submit`: string e.g. `/159/project/bidding/bid_packages/75/add_to_bid_list`
  - `trades`: string e.g. `/159/project/bid_packages/75/search_for_bidders/filter_options/trades`
  - `vendors`: string e.g. `/159/project/bid_packages/75/vendors`
- `lump_sum_bidding`: boolean - Lump Sum Bidding Enabled e.g. `true`
- `manager`: object
  - `login_information_id`: integer - Login Information ID e.g. `67`
  - `contact_id`: integer - Contact ID e.g. `345`
  - `name`: string - Manager Name e.g. `John Doe`
  - `email`: string - Manager Email
  - `job_title`: string - Manager Job Title e.g. `Estimator`
  - `invited`: boolean - User Invited e.g. `true`
  - `vendor`: object
    - `id`: integer - Vendor ID e.g. `123`
    - `name`: string - Vendor name e.g. `Vendor Name`
- `nda_attachments`: array of object
  - `id`: string - ID e.g. `123`
  - `item_type`: string - Item Type e.g. `BidPackage`
  - `item_id`: string - Item ID e.g. `123`
  - `prostore_file_id`: string - Prostore File ID e.g. `123`
  - `url`: string - URL e.g. `https://procoretech-qa.com/v2/d/default/prostore-thumbnail-bucket/453550640`
  - `name`: string - Name e.g. `NDA.pdf`
- `number`: integer - Bid Package Number e.g. `46`
- `open`: boolean - Whether or not the bid package is active e.g. `true`
- `point_of_contact`: object
  - `email`: string - A person's email e.g. `john.doe@example.com`
  - `first`: string - A person's name e.g. `John`
  - `last`: string - A person's last name e.g. `Doe`
  - `numbers`: string - A person's phone numbers e.g. `5432132345`
- `point_of_contact_login_id`: integer - Point of contact ID e.g. `123`
- `pre_bid_rfi_deadline_date`: string(date-time) - Prebid RFI deadline date e.g. `2016-12-13T03:00:00Z`
- `pre_bid_walk_through_date`: string(date-time) - Scheduled pre-bid walkthrough date e.g. `2016-12-13T03:00:00Z`
- `pre_bid_walk_through_notes`: string - Pre-bid walkthrough notes e.g. `So Many Potential Change Orders`
- `project_id`: integer - Unique identifier for the project. e.g. `2342`
- `project_image_url`: string - Link to project image e.g. `https://procoretech-qa.com/v2/d/default/prostore-thumbnail-bucket/453550640`
- `project_logo_name`: string - Name of the project's logo file e.g. `procore-logo.png`
- `project_logo_url`: string - Link to project logo image e.g. `https://procoretech-qa.com/v2/d/default/prostore-thumbnail-bucket/453550640`
- `project_latitude`: string - Latitude of project location e.g. `-119.490849179262`
- `project_location`: string - Address of bid package project e.g. `123 Campus Way Carpinteria CA 91303`
- `project_longitude`: string - Longtitude of project location e.g. `34.385046412363`
- `project_name`: string - Name of bid package project e.g. `Procore Campus`
- `require_nda`: boolean - Require Non-Disclosure Agreement e.g. `false`
- `sealed`: boolean - Enabled sealed bidding e.g. `false`
- `show_bid_info`: boolean - Show bid info e.g. `false`
- `submitted_bids_count`: integer - Number bids submitted e.g. `2`
- `title`: string - Title e.g. `Procore Sky Campus`
- `enable_public_discovery`: boolean - Whether the bid package is discoverable by the public e.g. `false`
- `primary_slug_with_ids`: string - Primary public slug for the bid package with company ID and bid package ID prefix (format: {company_id}_{bid_package_id}_{slug}). Used in public URLs. Auto-generated from title when created or when title is updated. *... e.g. `123_456_procore-sky-campus`
- `pre_bid_meeting_location`: string - Location for the pre-bid meeting e.g. `123 Main St, Conference Room A, Austin, TX 78701`
- `pre_bid_meeting_date`: string(date-time) - Date and time for the pre-bid meeting in UTC (ISO 8601 format) e.g. `2025-10-20T14:00:00Z`
- `pre_bid_meeting_online_link`: string - Online meeting link for the pre-bid meeting e.g. `https://example.com`
- `pre_bid_meeting_notes`: string - Notes for the pre-bid meeting e.g. `Please bring safety equipment and hard hats`
- `public_project_funding_source`: string - Source of funding for the public project, either 'private' or 'public' e.g. `public`
- `show_location_for_nda_projects`: boolean - Whether the location for the NDA project is shown e.g. `false`
- `public_bid_opening_details_date`: string(date-time) - Date and time for the public bid opening in UTC (ISO 8601 format) e.g. `2025-10-20T14:00:00Z`
- `public_bid_opening_details_location`: string - Location for the public bid opening e.g. `City Hall, Room 301, Austin, TX 78701`
- `public_bid_opening_details_online_link`: string(uri) - Online link for the public bid opening e.g. `https://example.com`
- `trades_and_services`: array of object - Array of trades and services
  - `trade_level`: string - The level of the PCN trade classification e.g. `Division`
  - `trade_path`: string - The hierarchical path of the PCN trade e.g. `03 - Concrete`
  - `trade_key`: string - The unique key identifier for the PCN trade e.g. `03000`
- `business_classifications`: array of object - Array of business classifications
  - `classification_name`: string - The full name of the business classification e.g. `Asian American Business`
  - `classification_abbreviation`: string - The abbreviated form of the business classification e.g. `ABE`
  - `classification_key`: string - The unique key identifier for the business classification e.g. `ABE`
- `lock_unit_fields_base_bid`: boolean - Lock unit fields for all base bid items (global setting for new bid forms) e.g. `false`
- `lock_quantity_fields_base_bid`: boolean - Lock quantity fields for all base bid items (global setting for new bid forms) e.g. `false`
- `lock_unit_fields_alternates`: boolean - Lock unit fields for all alternate items (global setting for new bid forms) e.g. `false`
- `lock_quantity_fields_alternates`: boolean - Lock quantity fields for all alternate items (global setting for new bid forms) e.g. `false`
- `has_pdm_documents`: boolean - Whether the bid package has any PDM documents e.g. `true`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

