# Procore API: Equipment (Resource Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Equipment)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Attachment](#attachment) - versions 2.0
- [Category](#category) - versions 2.0
- [Equipment](#equipment) - versions 2.1, 2.0
- [Equipment Maintenance](#equipment-maintenance) - versions 2.0
- [Field Sets](#field-sets) - versions 2.0
- [Make](#make) - versions 2.0
- [Model](#model) - versions 2.0
- [Project Association](#project-association) - versions 2.0
- [Status](#status) - versions 2.0
- [Type](#type) - versions 2.0
- [Unmanaged Equipment](#unmanaged-equipment) - versions 2.0

## Attachment

Resource id: `attachment`. Raw spec: `../openapi-raw/attachment.json`. Web: https://developers.procore.com/reference/rest/attachment?version=latest
Product lines: equipment-register

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register/{equipment_id}/attachment

**Create equipment attachment (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment Id
- `resource_id` [query] string - ID of the specific resource to associate this attachment with (e.g., maintenance record ID). Used to link attachments to specific resources under this equipment.
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `name`: string (required) - The name of the file. e.g. `Test file`
- `type`: string enum[DOCUMENT, PROFILE, MAINTENANCE] (required) - The type of the equipment attachment. e.g. `DOCUMENT`

Response 200 (application/json): object

- `data`: object
  - `id`: string - The equipment attachment id. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`
  - `upload_url`: string - The upload url for the equipment attachment. e.g. `Url`
  - `download_url`: string - The download url for the equipment attachment. e.g. `Url`
  - `type`: string enum[DOCUMENT, PROFILE, MAINTENANCE] - The type of the equipment attachment. e.g. `DOCUMENT`
  - `file_id`: string - The file id of the equipment attachment. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`
  - `name`: string - The name of the file. e.g. `Test file`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/equipment_register/{equipment_id}/attachment

**Create equipment attachment (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment Id
- `resource_id` [query] string - ID of the specific resource to associate this attachment with (e.g., maintenance record ID). Used to link attachments to specific resources under this equipment.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `name`: string (required) - The name of the file. e.g. `Test file`
- `type`: string enum[DOCUMENT, PROFILE, MAINTENANCE] (required) - The type of the equipment attachment. e.g. `DOCUMENT`

Response 200 (application/json): object

- `data`: object
  - `id`: string - The equipment attachment id. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`
  - `upload_url`: string - The upload url for the equipment attachment. e.g. `Url`
  - `download_url`: string - The download url for the equipment attachment. e.g. `Url`
  - `type`: string enum[DOCUMENT, PROFILE, MAINTENANCE] - The type of the equipment attachment. e.g. `DOCUMENT`
  - `file_id`: string - The file id of the equipment attachment. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`
  - `name`: string - The name of the file. e.g. `Test file`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register/{equipment_id}/attachment/{attachment_id}

**Fetch attachment by Id (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment id
- `attachment_id` [path] string (required) - Attachment id
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object
  - `id`: string - The equipment attachment id. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`
  - `upload_url`: string - The upload url for the equipment attachment. e.g. `Url`
  - `download_url`: string - The download url for the equipment attachment. e.g. `Url`
  - `type`: string enum[DOCUMENT, PROFILE, MAINTENANCE] - The type of the equipment attachment. e.g. `DOCUMENT`
  - `file_id`: string - The file id of the equipment attachment. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`
  - `name`: string - The name of the file. e.g. `Test file`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register/{equipment_id}/attachment/{attachment_id}

**Update equipment attachment (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment id
- `attachment_id` [path] string (required) - Attachment id
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register/{equipment_id}/attachment/{attachment_id}

**Delete equipment attachment (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipmnet Id
- `attachment_id` [path] string (required) - Attachment id
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/equipment_register/{equipment_id}/attachment/{attachment_id}

**Fetch attachment by Id (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment id
- `attachment_id` [path] string (required) - Attachment id
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object
  - `id`: string - The equipment attachment id. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`
  - `upload_url`: string - The upload url for the equipment attachment. e.g. `Url`
  - `download_url`: string - The download url for the equipment attachment. e.g. `Url`
  - `type`: string enum[DOCUMENT, PROFILE, MAINTENANCE] - The type of the equipment attachment. e.g. `DOCUMENT`
  - `file_id`: string - The file id of the equipment attachment. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`
  - `name`: string - The name of the file. e.g. `Test file`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/equipment_register/{equipment_id}/attachment/{attachment_id}

**Update equipment attachment (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment id
- `attachment_id` [path] string (required) - Attachment id
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/equipment_register/{equipment_id}/attachment/{attachment_id}

**Delete equipment attachment (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipmnet Id
- `attachment_id` [path] string (required) - Attachment id
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register/{equipment_id}/attachments

**Get all attachments for equipment (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment id
- `resource_id` [query] string - ID of the specific resource to filter attachments by (e.g., maintenance record ID). Only attachments associated with this resource will be returned.
- `resource_type` [query] string - Type of resource to filter attachments by. Currently supported: 'MAINTENANCE' for maintenance-related attachments.
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object
  - `attachments`: array of object - The list of attachments.
    - `attached_to_item_id`: string - Attachment id. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`
    - `attached_to_item_type`: string - The type of the item the attachment is attached to.
    - `id`: string - Attachment Uid. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`
    - `type`: string - The type of the equipment attachment. e.g. `DOCUMENT`
    - `url`: string - The download url for the equipment attachment. e.g. `url`
    - `filename`: string - The name of the file. e.g. `Test file`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/equipment_register/{equipment_id}/attachments

**Get all attachments for equipment (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment id
- `resource_id` [query] string - ID of the specific resource to filter attachments by (e.g., maintenance record ID). Only attachments associated with this resource will be returned.
- `resource_type` [query] string - Type of resource to filter attachments by. Currently supported: 'MAINTENANCE' for maintenance-related attachments.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object
  - `attachments`: array of object - The list of attachments.
    - `attached_to_item_id`: string - Attachment id. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`
    - `attached_to_item_type`: string - The type of the item the attachment is attached to.
    - `id`: string - Attachment Uid. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`
    - `type`: string - The type of the equipment attachment. e.g. `DOCUMENT`
    - `url`: string - The download url for the equipment attachment. e.g. `url`
    - `filename`: string - The name of the file. e.g. `Test file`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Category

Resource id: `category`. Raw spec: `../openapi-raw/category.json`. Web: https://developers.procore.com/reference/rest/category?version=latest
Product lines: equipment-register

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register_categories

**Get all equipment categories (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer(int32) - The page number to retrieve. Default is 1.
- `per_page` [query] integer (required) - Number of records per page
- `filters[is_active]` [query] boolean - Is active filter
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: array of object
  - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
  - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register_categories

**Create equipment category (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `name`: string (required) - The name of the equipment category. e.g. `Asphalt Aggregate Concrete`
- `is_active`: boolean (required) - Active/Inactive indicator for Equipment Category. e.g. `true`

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
  - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/equipment_register_categories

**Get all equipment categories (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer(int32) - The page number to retrieve. Default is 1.
- `per_page` [query] integer (required) - Number of records per page
- `filters[is_active]` [query] boolean - Is active filter
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: array of object
  - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
  - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/equipment_register_categories

**Create equipment category (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `name`: string (required) - The name of the equipment category. e.g. `Asphalt Aggregate Concrete`
- `is_active`: boolean (required) - Active/Inactive indicator for Equipment Category. e.g. `true`

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
  - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/equipment_register_categories/{category_id}

**Update equipment category (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `category_id` [path] string (required) - Category id
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `name`: string - The name of the equipment category. e.g. `Asphalt Aggregate Concrete`
- `is_active`: boolean - Active/Inactive indicator for Equipment Category. e.g. `true`

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
  - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/equipment_register_categories/{category_id}

**Delete equipment category (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `category_id` [path] string (required) - Category id
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Equipment

Resource id: `equipment`. Raw spec: `../openapi-raw/equipment.json`. Web: https://developers.procore.com/reference/rest/equipment?version=latest
Product lines: equipment-register

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/equipment_register

**Get equipment by project (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - The Id of the project
- `search` [query] string - Search criteria applied on name, identification number and serial number
- `filters[id]` [query] string - Filter ids
- `filters[association_status]` [query] string enum[current, past, all] - The status of association. Values can be 'current', 'past' or 'all'. Default is 'current'
- `filters[type]` [query] string - Type filter
- `filters[category]` [query] string - Category filter
- `filters[make]` [query] string - Make filter
- `filters[model]` [query] string - Model filter
- `filters[type_ids]` [query] string - Type filter by Ids
- `filters[category_ids]` [query] string - Category filter by Ids
- `filters[make_ids]` [query] string - Make filter by Ids
- `filters[model_ids]` [query] string - Model filter by Ids
- `filters[year]` [query] string - Year filter
- `filters[status]` [query] string - Status filter
- `filters[ownership]` [query] string - Ownership filter
- `filters[vendor_ids]` [query] string - Vendor filter
- `filters[group_ids]` [query] string - Group filter
- `filters[is_current_project]` [query] string - Flag to filter by current project
- `filters[assignee_ids]` [query] string - Assignee filter
- `filters[updated_at]` [query] string - Updated at filter (date range format: YYYY-MM-DD...YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ...YYYY-MM-DDTHH:MM:SSZ)
- `page` [query] integer(int32) - The page number to retrieve. Default is 1.
- `per_page` [query] integer (required) - Number of records per page
- `view` [query] string enum[compact, basic, short, normal, ids] - Equipment view type
- `sort` [query] string enum[make, model, category, type, equipmentId, equipmentName, serialNumber, year, ownership, ratePerHour, notes, rentalStartDate, ...] - Equipment sort. Also supports custom field sorting like 'custom_field_123' or '-custom_field_123' for descending
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): oneOf(object | object | object | object | object)


Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.1/companies/{company_id}/projects/{project_id}/equipment_register

**Create equipment (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - The Id of the project
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `equipment_name`: string
- `name`: string (required) - The name of the equipment. e.g. `Excavator`
- `equipment_id`: string
- `identification_number`: string (required) - The identification number of the equipment. e.g. `A1H231hH`
- `status_id`: string (required) - The status of the equipment. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`
- `serial_number`: string - The serial number of the equipment. e.g. `C123D1332`
- `profile_photo`: string(byte)
- `category_id`: string (required) - The category of the equipment. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`
- `type_id`: string (required) - The type of the equipment. e.g. `01J3F5MZ637Y41EYA3G2MGCCGQ`
- `make_id`: string - The make of the equipment. e.g. `01J3F5NBTN430VT97FRRKBTCSJ`
- `model_id`: string - The model of the equipment. e.g. `01J3F5NT7667K14RWWWEM93VNN`
- `year`: integer(int32) - The year of the equipment. e.g. `2021`
- `rate_per_hour`: number(float) - The rate per hour of the equipment. e.g. `100`
- `ownership`: string enum[OWNED, RENTED, SUBCONTRACTED] (required) - The ownership of the equipment. e.g. `RENTED`
- `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
- `vendor_id`: string - The vendor id of the equipment. e.g. `1`
- `rental_start_date`: string(date) - The start date of the rental. e.g. `2021-01-01`
- `rental_end_date`: string(date) - The end date of the rental. e.g. `2021-01-01`
- `notes`: string
- `purchase_order`: string - The purchase order number. e.g. `PO-2026-0042`
- `group_ids`: array of string - List of group IDs to be associated with the equipment
- `upload_ids`: array of string - List of FAS file IDs for generic document uploads (PDFs, images, etc.)
- `profile_ids`: array of string - List of FAS file IDs for profile image uploads
- `onsite`: boolean - Flag indicating to set or unset the equipment on the project. e.g. `true`

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Active`
    - `type`: string e.g. `Utilised`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `purchase_order`: string e.g. `PO-2026-0042`
  - `source`: string - Origin of the equipment record (e.g. import source or sync vendor). e.g. `united_rentals`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `updated_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
  - `assignees`: array of object - The assignees associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `vendor`: object
    - `id`: string e.g. `1`
    - `name`: string
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `projects`: array of object - The projects associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `group_ids`: array of string - The group ids associated with the equipment.
  - `custom_fields`: object - Values keyed by custom_field_{definition_id} (definition_id comes from your category fieldset). Each entry includes data_type and value as returned by the API. e.g. `{"custom_field_1001": {"data_type": "string", "value": "custom field value"},...`
  - `attachments`: array of object - Attachments associated with this equipment (SDR-0018 format)
    - `id`: string - Equipment-register internal attachment record ID e.g. `01KPZCKVX9TZXN81WYYRZR30CD`
    - `attached_to_item_id`: string - The FAS ID from the request e.g. `fas-01KPQE63CX0GPFBR12K3M01J59`
    - `attached_to_item_type`: string - The request key type (e.g. upload_id, profile_id) e.g. `upload_id`
    - `name`: string - Original filename e.g. `inspection-report.pdf`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/equipment_register

**Get all equipment (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `search` [query] string - Search criteria applied on name, identification number and serial number
- `filters[id]` [query] string - Filter ids
- `filters[identification_numbers]` [query] string - Filter identification_numbers
- `filters[type]` [query] string - Type filter
- `filters[category]` [query] string - Category filter
- `filters[make]` [query] string - Make filter
- `filters[model]` [query] string - Model filter
- `filters[type_ids]` [query] string - Type filter by Ids
- `filters[category_ids]` [query] string - Category filter by Ids
- `filters[make_ids]` [query] string - Make filter by Ids
- `filters[model_ids]` [query] string - Model filter by Ids
- `filters[year]` [query] string - Year filter
- `filters[status]` [query] string - Status filter by ids
- `filters[ownership]` [query] string - Ownership filter
- `filters[vendor_ids]` [query] string - Vendor filter
- `filters[group_ids]` [query] string - Group filter
- `filters[assignee_ids]` [query] string - Assignee filter
- `filters[current_project_ids]` [query] string - Current project filter by ids
- `filters[exclude_equipment_in_project_ids]` [query] string - Exclude equipment associated with these project ids
- `filters[include_equipment_in_project_ids]` [query] string - Include only equipment associated with these project ids
- `filters[is_deleted]` [query] boolean - Is deleted filter
- `filters[updated_at]` [query] string - Updated at filter (date range format: YYYY-MM-DD...YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ...YYYY-MM-DDTHH:MM:SSZ)
- `page` [query] integer(int32) - The page number to retrieve. Default is 1.
- `per_page` [query] integer (required) - Number of records per page
- `view` [query] string enum[compact, short, normal, ids, extended] - Equipment view type
- `sort` [query] string enum[make, model, category, type, equipmentId, equipmentName, serialNumber, year, ownership, ratePerHour, notes, rentalStartDate, ...] - Equipment sort. Also supports custom field sorting like 'custom_field_123' or '-custom_field_123' for descending
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): oneOf(object | object | object | object | object)


Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.1/companies/{company_id}/equipment_register

**Create equipment (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `equipment_name`: string
- `name`: string (required) - The name of the equipment. e.g. `Excavator`
- `equipment_id`: string
- `identification_number`: string (required) - The identification number of the equipment. e.g. `A1H231hH`
- `status_id`: string (required) - The status of the equipment. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`
- `serial_number`: string - The serial number of the equipment. e.g. `C123D1332`
- `profile_photo`: string(byte)
- `category_id`: string (required) - The category of the equipment. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`
- `type_id`: string (required) - The type of the equipment. e.g. `01J3F5MZ637Y41EYA3G2MGCCGQ`
- `make_id`: string - The make of the equipment. e.g. `01J3F5NBTN430VT97FRRKBTCSJ`
- `model_id`: string - The model of the equipment. e.g. `01J3F5NT7667K14RWWWEM93VNN`
- `year`: integer(int32) - The year of the equipment. e.g. `2021`
- `rate_per_hour`: number(float) - The rate per hour of the equipment. e.g. `100`
- `ownership`: string enum[OWNED, RENTED, SUBCONTRACTED] (required) - The ownership of the equipment. e.g. `RENTED`
- `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
- `vendor_id`: string - The vendor id of the equipment. e.g. `1`
- `rental_start_date`: string(date) - The start date of the rental. e.g. `2021-01-01`
- `rental_end_date`: string(date) - The end date of the rental. e.g. `2021-01-01`
- `notes`: string
- `purchase_order`: string - The purchase order number. e.g. `PO-2026-0042`
- `group_ids`: array of string - List of group IDs to be associated with the equipment
- `upload_ids`: array of string - List of FAS file IDs for generic document uploads (PDFs, images, etc.)
- `profile_ids`: array of string - List of FAS file IDs for profile image uploads

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Active`
    - `type`: string e.g. `Utilised`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `purchase_order`: string e.g. `PO-2026-0042`
  - `source`: string - Origin of the equipment record (e.g. import source or sync vendor). e.g. `united_rentals`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `updated_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
  - `assignees`: array of object - The assignees associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `vendor`: object
    - `id`: string e.g. `1`
    - `name`: string
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `projects`: array of object - The projects associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `group_ids`: array of string - The group ids associated with the equipment.
  - `custom_fields`: object - Values keyed by custom_field_{definition_id} (definition_id comes from your category fieldset). Each entry includes data_type and value as returned by the API. e.g. `{"custom_field_1001": {"data_type": "string", "value": "custom field value"},...`
  - `attachments`: array of object - Attachments associated with this equipment (SDR-0018 format)
    - `id`: string - Equipment-register internal attachment record ID e.g. `01KPZCKVX9TZXN81WYYRZR30CD`
    - `attached_to_item_id`: string - The FAS ID from the request e.g. `fas-01KPQE63CX0GPFBR12K3M01J59`
    - `attached_to_item_type`: string - The request key type (e.g. upload_id, profile_id) e.g. `upload_id`
    - `name`: string - Original filename e.g. `inspection-report.pdf`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/equipment_register/{equipment_id}

**Get equipment by ID (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - The Id of the project
- `equipment_id` [path] string (required) - The UID of the equipment
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): oneOf(object)


Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.1/companies/{company_id}/projects/{project_id}/equipment_register/{equipment_id}

**Update equipment (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - The Id of the project
- `equipment_id` [path] string (required) - The ID of the equipment
- `x-procore-patch-merge-key-ids` [header] string - Comma-separated list of attachment field keys to merge (append) instead of replace. Currently supports `upload_ids`.
- `x-procore-patch-delete-key-ids` [header] string - Comma-separated list of attachment field keys to safe-delete. Supports `upload_ids` and `profile_ids`.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `equipment_name`: object
  - `present`: boolean
- `name`: string - The name of the equipment. e.g. `Excavator`
- `equipment_id`: object
  - `present`: boolean
- `identification_number`: string - The identification number of the equipment. e.g. `A1H231hH`
- `serial_number`: string - The serial number of the equipment. e.g. `C123D1332`
- `profile_photo`: string
- `category_id`: string - The category of the equipment. e.g. `01J3F5S73XY0T9KYCC6V383GYK`
- `type_id`: string - The type of the equipment. e.g. `01J3F5SJDJYTBKJV0VK4M8ZM9P`
- `make_id`: string - The make of the equipment. e.g. `01J3F5SY28Y3TM2712VD64M4P0`
- `model_id`: string - The model of the equipment. e.g. `01J3F5T86WXS843Q4Q36CEYQ83`
- `status_id`: string - The status of the equipment. e.g. `01J3F5T86WXS843Q4Q36CEYQ46`
- `year`: integer(int32) - The year of the equipment. e.g. `2021`
- `rate_per_hour`: number(float) e.g. `100`
- `ownership`: string enum[OWNED, RENTED, SUBCONTRACTED] e.g. `OWNED`
- `notes`: string e.g. `This is notes`
- `purchase_order`: string - The purchase order number. e.g. `PO-2026-0042`
- `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
- `vendor_id`: string - The vendor id of the equipment. e.g. `1`
- `rental_start_date`: string(date) - The start date of the rental. e.g. `2021-01-01`
- `rental_end_date`: string(date) - The end date of the rental. e.g. `2021-01-01`
- `group_ids`: array of string - List of group IDs to be associated with the equipment
- `upload_ids`: object - Attachment mutation input key for document uploads in PATCH operations.
- `profile_ids`: object - Attachment mutation input key for profile image uploads in PATCH operations.
- `onsite`: boolean - Flag indicating to set or unset the equipment on the project. e.g. `true`

Response 200 (application/json): oneOf(object)


Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.1/companies/{company_id}/projects/{project_id}/equipment_register/{equipment_id}/current_project

**Update current project (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment Id
- `project_id` [path] string (required) - The Id of the project
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Active`
    - `type`: string e.g. `Utilised`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `purchase_order`: string e.g. `PO-2026-0042`
  - `source`: string - Origin of the equipment record (e.g. import source or sync vendor). e.g. `united_rentals`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `updated_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
  - `assignees`: array of object - The assignees associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `vendor`: object
    - `id`: string e.g. `1`
    - `name`: string
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `projects`: array of object - The projects associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `group_ids`: array of string - The group ids associated with the equipment.
  - `custom_fields`: object - Values keyed by custom_field_{definition_id} (definition_id comes from your category fieldset). Each entry includes data_type and value as returned by the API. e.g. `{"custom_field_1001": {"data_type": "string", "value": "custom field value"},...`
  - `attachments`: array of object - Attachments associated with this equipment (SDR-0018 format)
    - `id`: string - Equipment-register internal attachment record ID e.g. `01KPZCKVX9TZXN81WYYRZR30CD`
    - `attached_to_item_id`: string - The FAS ID from the request e.g. `fas-01KPQE63CX0GPFBR12K3M01J59`
    - `attached_to_item_type`: string - The request key type (e.g. upload_id, profile_id) e.g. `upload_id`
    - `name`: string - Original filename e.g. `inspection-report.pdf`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.1/companies/{company_id}/projects/{project_id}/equipment_register/{equipment_id}/current_project

**Remove current project (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment Id
- `project_id` [path] string (required) - The Id of the project
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Active`
    - `type`: string e.g. `Utilised`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `purchase_order`: string e.g. `PO-2026-0042`
  - `source`: string - Origin of the equipment record (e.g. import source or sync vendor). e.g. `united_rentals`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `updated_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
  - `assignees`: array of object - The assignees associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `vendor`: object
    - `id`: string e.g. `1`
    - `name`: string
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `projects`: array of object - The projects associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `group_ids`: array of string - The group ids associated with the equipment.
  - `custom_fields`: object - Values keyed by custom_field_{definition_id} (definition_id comes from your category fieldset). Each entry includes data_type and value as returned by the API. e.g. `{"custom_field_1001": {"data_type": "string", "value": "custom field value"},...`
  - `attachments`: array of object - Attachments associated with this equipment (SDR-0018 format)
    - `id`: string - Equipment-register internal attachment record ID e.g. `01KPZCKVX9TZXN81WYYRZR30CD`
    - `attached_to_item_id`: string - The FAS ID from the request e.g. `fas-01KPQE63CX0GPFBR12K3M01J59`
    - `attached_to_item_type`: string - The request key type (e.g. upload_id, profile_id) e.g. `upload_id`
    - `name`: string - Original filename e.g. `inspection-report.pdf`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.1/companies/{company_id}/projects/{project_id}/equipment_register/status/{equipment_id}

**Update status of equipment (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - The Id of the project
- `equipment_id` [path] string (required) - The ID of the equipment
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `status_id`: string - The status of the equipment. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Active`
    - `type`: string e.g. `Utilised`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `purchase_order`: string e.g. `PO-2026-0042`
  - `source`: string - Origin of the equipment record (e.g. import source or sync vendor). e.g. `united_rentals`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `updated_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
  - `assignees`: array of object - The assignees associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `vendor`: object
    - `id`: string e.g. `1`
    - `name`: string
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `projects`: array of object - The projects associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `group_ids`: array of string - The group ids associated with the equipment.
  - `custom_fields`: object - Values keyed by custom_field_{definition_id} (definition_id comes from your category fieldset). Each entry includes data_type and value as returned by the API. e.g. `{"custom_field_1001": {"data_type": "string", "value": "custom field value"},...`
  - `attachments`: array of object - Attachments associated with this equipment (SDR-0018 format)
    - `id`: string - Equipment-register internal attachment record ID e.g. `01KPZCKVX9TZXN81WYYRZR30CD`
    - `attached_to_item_id`: string - The FAS ID from the request e.g. `fas-01KPQE63CX0GPFBR12K3M01J59`
    - `attached_to_item_type`: string - The request key type (e.g. upload_id, profile_id) e.g. `upload_id`
    - `name`: string - Original filename e.g. `inspection-report.pdf`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.1/companies/{company_id}/projects/{project_id}/equipment_register/status/bulk_update

**Bulk Update status of equipment (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - The Id of the project
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `status_id`: string - The status of the equipment. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`
- `id`: string (required) - The equipment id. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`

Response 200 (application/json): object

- `data`: array of object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Active`
    - `type`: string e.g. `Utilised`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `purchase_order`: string e.g. `PO-2026-0042`
  - `source`: string - Origin of the equipment record (e.g. import source or sync vendor). e.g. `united_rentals`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `updated_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
  - `assignees`: array of object - The assignees associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `vendor`: object
    - `id`: string e.g. `1`
    - `name`: string
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `projects`: array of object - The projects associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `group_ids`: array of string - The group ids associated with the equipment.
  - `custom_fields`: object - Values keyed by custom_field_{definition_id} (definition_id comes from your category fieldset). Each entry includes data_type and value as returned by the API. e.g. `{"custom_field_1001": {"data_type": "string", "value": "custom field value"},...`
  - `attachments`: array of object - Attachments associated with this equipment (SDR-0018 format)
    - `id`: string - Equipment-register internal attachment record ID e.g. `01KPZCKVX9TZXN81WYYRZR30CD`
    - `attached_to_item_id`: string - The FAS ID from the request e.g. `fas-01KPQE63CX0GPFBR12K3M01J59`
    - `attached_to_item_type`: string - The request key type (e.g. upload_id, profile_id) e.g. `upload_id`
    - `name`: string - Original filename e.g. `inspection-report.pdf`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.1/companies/{company_id}/projects/{project_id}/equipment_register/current_project/bulk_update

**Bulk update current project (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - The Id of the project
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `equipment_id`: string (required) e.g. `A1d2D3432`

Response 200 (application/json): object

- `data`: array of object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Active`
    - `type`: string e.g. `Utilised`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `purchase_order`: string e.g. `PO-2026-0042`
  - `source`: string - Origin of the equipment record (e.g. import source or sync vendor). e.g. `united_rentals`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `updated_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
  - `assignees`: array of object - The assignees associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `vendor`: object
    - `id`: string e.g. `1`
    - `name`: string
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `projects`: array of object - The projects associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `group_ids`: array of string - The group ids associated with the equipment.
  - `custom_fields`: object - Values keyed by custom_field_{definition_id} (definition_id comes from your category fieldset). Each entry includes data_type and value as returned by the API. e.g. `{"custom_field_1001": {"data_type": "string", "value": "custom field value"},...`
  - `attachments`: array of object - Attachments associated with this equipment (SDR-0018 format)
    - `id`: string - Equipment-register internal attachment record ID e.g. `01KPZCKVX9TZXN81WYYRZR30CD`
    - `attached_to_item_id`: string - The FAS ID from the request e.g. `fas-01KPQE63CX0GPFBR12K3M01J59`
    - `attached_to_item_type`: string - The request key type (e.g. upload_id, profile_id) e.g. `upload_id`
    - `name`: string - Original filename e.g. `inspection-report.pdf`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/equipment_register/{equipment_id}

**Get equipment by ID (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment Id
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Active`
    - `type`: string e.g. `Utilised`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `purchase_order`: string e.g. `PO-2026-0042`
  - `source`: string - Origin of the equipment record (e.g. import source or sync vendor). e.g. `united_rentals`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `updated_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
  - `assignees`: array of object - The assignees associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `vendor`: object
    - `id`: string e.g. `1`
    - `name`: string
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `projects`: array of object - The projects associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `group_ids`: array of string - The group ids associated with the equipment.
  - `custom_fields`: object - Values keyed by custom_field_{definition_id} (definition_id comes from your category fieldset). Each entry includes data_type and value as returned by the API. e.g. `{"custom_field_1001": {"data_type": "string", "value": "custom field value"},...`
  - `attachments`: array of object - Attachments associated with this equipment (SDR-0018 format)
    - `id`: string - Equipment-register internal attachment record ID e.g. `01KPZCKVX9TZXN81WYYRZR30CD`
    - `attached_to_item_id`: string - The FAS ID from the request e.g. `fas-01KPQE63CX0GPFBR12K3M01J59`
    - `attached_to_item_type`: string - The request key type (e.g. upload_id, profile_id) e.g. `upload_id`
    - `name`: string - Original filename e.g. `inspection-report.pdf`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.1/companies/{company_id}/equipment_register/{equipment_id}

**Update equipment (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - The ID of the equipment
- `x-procore-patch-merge-key-ids` [header] string - Comma-separated list of attachment field keys to merge (append) instead of replace. Currently supports `upload_ids`.
- `x-procore-patch-delete-key-ids` [header] string - Comma-separated list of attachment field keys to safe-delete. Supports `upload_ids` and `profile_ids`.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `equipment_name`: object
  - `present`: boolean
- `name`: string - The name of the equipment. e.g. `Excavator`
- `equipment_id`: object
  - `present`: boolean
- `identification_number`: string - The identification number of the equipment. e.g. `A1H231hH`
- `serial_number`: string - The serial number of the equipment. e.g. `C123D1332`
- `profile_photo`: string
- `category_id`: string - The category of the equipment. e.g. `01J3F5S73XY0T9KYCC6V383GYK`
- `type_id`: string - The type of the equipment. e.g. `01J3F5SJDJYTBKJV0VK4M8ZM9P`
- `make_id`: string - The make of the equipment. e.g. `01J3F5SY28Y3TM2712VD64M4P0`
- `model_id`: string - The model of the equipment. e.g. `01J3F5T86WXS843Q4Q36CEYQ83`
- `status_id`: string - The status of the equipment. e.g. `01J3F5T86WXS843Q4Q36CEYQ46`
- `year`: integer(int32) - The year of the equipment. e.g. `2021`
- `rate_per_hour`: number(float) e.g. `100`
- `ownership`: string enum[OWNED, RENTED, SUBCONTRACTED] e.g. `OWNED`
- `notes`: string e.g. `This is notes`
- `purchase_order`: string - The purchase order number. e.g. `PO-2026-0042`
- `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
- `vendor_id`: string - The vendor id of the equipment. e.g. `1`
- `rental_start_date`: string(date) - The start date of the rental. e.g. `2021-01-01`
- `rental_end_date`: string(date) - The end date of the rental. e.g. `2021-01-01`
- `group_ids`: array of string - List of group IDs to be associated with the equipment
- `upload_ids`: object - Attachment mutation input key for document uploads in PATCH operations.
- `profile_ids`: object - Attachment mutation input key for profile image uploads in PATCH operations.

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Active`
    - `type`: string e.g. `Utilised`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `purchase_order`: string e.g. `PO-2026-0042`
  - `source`: string - Origin of the equipment record (e.g. import source or sync vendor). e.g. `united_rentals`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `updated_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
  - `assignees`: array of object - The assignees associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `vendor`: object
    - `id`: string e.g. `1`
    - `name`: string
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `projects`: array of object - The projects associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `group_ids`: array of string - The group ids associated with the equipment.
  - `custom_fields`: object - Values keyed by custom_field_{definition_id} (definition_id comes from your category fieldset). Each entry includes data_type and value as returned by the API. e.g. `{"custom_field_1001": {"data_type": "string", "value": "custom field value"},...`
  - `attachments`: array of object - Attachments associated with this equipment (SDR-0018 format)
    - `id`: string - Equipment-register internal attachment record ID e.g. `01KPZCKVX9TZXN81WYYRZR30CD`
    - `attached_to_item_id`: string - The FAS ID from the request e.g. `fas-01KPQE63CX0GPFBR12K3M01J59`
    - `attached_to_item_type`: string - The request key type (e.g. upload_id, profile_id) e.g. `upload_id`
    - `name`: string - Original filename e.g. `inspection-report.pdf`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.1/companies/{company_id}/equipment_register/{equipment_id}/current_project

**Update current project (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment Id
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `project_id`: string (required) - The project being logged on the equipment. e.g. `1234`

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Active`
    - `type`: string e.g. `Utilised`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `purchase_order`: string e.g. `PO-2026-0042`
  - `source`: string - Origin of the equipment record (e.g. import source or sync vendor). e.g. `united_rentals`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `updated_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
  - `assignees`: array of object - The assignees associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `vendor`: object
    - `id`: string e.g. `1`
    - `name`: string
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `projects`: array of object - The projects associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `group_ids`: array of string - The group ids associated with the equipment.
  - `custom_fields`: object - Values keyed by custom_field_{definition_id} (definition_id comes from your category fieldset). Each entry includes data_type and value as returned by the API. e.g. `{"custom_field_1001": {"data_type": "string", "value": "custom field value"},...`
  - `attachments`: array of object - Attachments associated with this equipment (SDR-0018 format)
    - `id`: string - Equipment-register internal attachment record ID e.g. `01KPZCKVX9TZXN81WYYRZR30CD`
    - `attached_to_item_id`: string - The FAS ID from the request e.g. `fas-01KPQE63CX0GPFBR12K3M01J59`
    - `attached_to_item_type`: string - The request key type (e.g. upload_id, profile_id) e.g. `upload_id`
    - `name`: string - Original filename e.g. `inspection-report.pdf`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.1/companies/{company_id}/equipment_register/{equipment_id}/current_project

**Remove current project (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment Id
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Active`
    - `type`: string e.g. `Utilised`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `purchase_order`: string e.g. `PO-2026-0042`
  - `source`: string - Origin of the equipment record (e.g. import source or sync vendor). e.g. `united_rentals`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `updated_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
  - `assignees`: array of object - The assignees associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `vendor`: object
    - `id`: string e.g. `1`
    - `name`: string
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `projects`: array of object - The projects associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `group_ids`: array of string - The group ids associated with the equipment.
  - `custom_fields`: object - Values keyed by custom_field_{definition_id} (definition_id comes from your category fieldset). Each entry includes data_type and value as returned by the API. e.g. `{"custom_field_1001": {"data_type": "string", "value": "custom field value"},...`
  - `attachments`: array of object - Attachments associated with this equipment (SDR-0018 format)
    - `id`: string - Equipment-register internal attachment record ID e.g. `01KPZCKVX9TZXN81WYYRZR30CD`
    - `attached_to_item_id`: string - The FAS ID from the request e.g. `fas-01KPQE63CX0GPFBR12K3M01J59`
    - `attached_to_item_type`: string - The request key type (e.g. upload_id, profile_id) e.g. `upload_id`
    - `name`: string - Original filename e.g. `inspection-report.pdf`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.1/companies/{company_id}/equipment_register/status/{equipment_id}

**Update status of equipment (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - The ID of the equipment
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `status_id`: string - The status of the equipment. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Active`
    - `type`: string e.g. `Utilised`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `purchase_order`: string e.g. `PO-2026-0042`
  - `source`: string - Origin of the equipment record (e.g. import source or sync vendor). e.g. `united_rentals`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `updated_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
  - `assignees`: array of object - The assignees associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `vendor`: object
    - `id`: string e.g. `1`
    - `name`: string
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `projects`: array of object - The projects associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `group_ids`: array of string - The group ids associated with the equipment.
  - `custom_fields`: object - Values keyed by custom_field_{definition_id} (definition_id comes from your category fieldset). Each entry includes data_type and value as returned by the API. e.g. `{"custom_field_1001": {"data_type": "string", "value": "custom field value"},...`
  - `attachments`: array of object - Attachments associated with this equipment (SDR-0018 format)
    - `id`: string - Equipment-register internal attachment record ID e.g. `01KPZCKVX9TZXN81WYYRZR30CD`
    - `attached_to_item_id`: string - The FAS ID from the request e.g. `fas-01KPQE63CX0GPFBR12K3M01J59`
    - `attached_to_item_type`: string - The request key type (e.g. upload_id, profile_id) e.g. `upload_id`
    - `name`: string - Original filename e.g. `inspection-report.pdf`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.1/companies/{company_id}/equipment_register/status/bulk_update

**Bulk Update status of equipment (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `status_id`: string - The status of the equipment. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`
- `id`: string (required) - The equipment id. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`

Response 200 (application/json): object

- `data`: array of object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Active`
    - `type`: string e.g. `Utilised`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `purchase_order`: string e.g. `PO-2026-0042`
  - `source`: string - Origin of the equipment record (e.g. import source or sync vendor). e.g. `united_rentals`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `updated_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
  - `assignees`: array of object - The assignees associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `vendor`: object
    - `id`: string e.g. `1`
    - `name`: string
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `projects`: array of object - The projects associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `group_ids`: array of string - The group ids associated with the equipment.
  - `custom_fields`: object - Values keyed by custom_field_{definition_id} (definition_id comes from your category fieldset). Each entry includes data_type and value as returned by the API. e.g. `{"custom_field_1001": {"data_type": "string", "value": "custom field value"},...`
  - `attachments`: array of object - Attachments associated with this equipment (SDR-0018 format)
    - `id`: string - Equipment-register internal attachment record ID e.g. `01KPZCKVX9TZXN81WYYRZR30CD`
    - `attached_to_item_id`: string - The FAS ID from the request e.g. `fas-01KPQE63CX0GPFBR12K3M01J59`
    - `attached_to_item_type`: string - The request key type (e.g. upload_id, profile_id) e.g. `upload_id`
    - `name`: string - Original filename e.g. `inspection-report.pdf`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.1/companies/{company_id}/equipment_register/current_project/bulk_update

**Bulk update current project (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `project_id`: string (required) - The project being logged on the equipment. e.g. `1234`
- `equipment_id`: string (required) e.g. `A1d2D3432`

Response 200 (application/json): object

- `data`: array of object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Active`
    - `type`: string e.g. `Utilised`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `purchase_order`: string e.g. `PO-2026-0042`
  - `source`: string - Origin of the equipment record (e.g. import source or sync vendor). e.g. `united_rentals`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `updated_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
  - `assignees`: array of object - The assignees associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `vendor`: object
    - `id`: string e.g. `1`
    - `name`: string
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `projects`: array of object - The projects associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `group_ids`: array of string - The group ids associated with the equipment.
  - `custom_fields`: object - Values keyed by custom_field_{definition_id} (definition_id comes from your category fieldset). Each entry includes data_type and value as returned by the API. e.g. `{"custom_field_1001": {"data_type": "string", "value": "custom field value"},...`
  - `attachments`: array of object - Attachments associated with this equipment (SDR-0018 format)
    - `id`: string - Equipment-register internal attachment record ID e.g. `01KPZCKVX9TZXN81WYYRZR30CD`
    - `attached_to_item_id`: string - The FAS ID from the request e.g. `fas-01KPQE63CX0GPFBR12K3M01J59`
    - `attached_to_item_type`: string - The request key type (e.g. upload_id, profile_id) e.g. `upload_id`
    - `name`: string - Original filename e.g. `inspection-report.pdf`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.1/companies/{company_id}/equipment_register/bulk_update

**Bulk Update equipment (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `equipment_name`: object
  - `present`: boolean
- `name`: string - The name of the equipment. e.g. `Excavator`
- `equipment_id`: object
  - `present`: boolean
- `identification_number`: string - The identification number of the equipment. e.g. `A1H231hH`
- `serial_number`: string - The serial number of the equipment. e.g. `C123D1332`
- `profile_photo`: string
- `category_id`: string - The category of the equipment. e.g. `01J3F5S73XY0T9KYCC6V383GYK`
- `type_id`: string - The type of the equipment. e.g. `01J3F5SJDJYTBKJV0VK4M8ZM9P`
- `make_id`: string - The make of the equipment. e.g. `01J3F5SY28Y3TM2712VD64M4P0`
- `model_id`: string - The model of the equipment. e.g. `01J3F5T86WXS843Q4Q36CEYQ83`
- `status_id`: string - The status of the equipment. e.g. `01J3F5T86WXS843Q4Q36CEYQ46`
- `year`: integer(int32) - The year of the equipment. e.g. `2021`
- `rate_per_hour`: number(float) e.g. `100`
- `ownership`: string enum[OWNED, RENTED, SUBCONTRACTED] e.g. `OWNED`
- `notes`: string e.g. `This is notes`
- `purchase_order`: string - The purchase order number. e.g. `PO-2026-0042`
- `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
- `vendor_id`: string - The vendor id of the equipment. e.g. `1`
- `rental_start_date`: string(date) - The start date of the rental. e.g. `2021-01-01`
- `rental_end_date`: string(date) - The end date of the rental. e.g. `2021-01-01`
- `group_ids`: array of string - List of group IDs to be associated with the equipment
- `upload_ids`: object - Attachment mutation input key for document uploads in PATCH operations.
- `profile_ids`: object - Attachment mutation input key for profile image uploads in PATCH operations.
- `id`: string (required) - The equipment id. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`

Response 200 (application/json): object

- `data`: array of object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Active`
    - `type`: string e.g. `Utilised`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `purchase_order`: string e.g. `PO-2026-0042`
  - `source`: string - Origin of the equipment record (e.g. import source or sync vendor). e.g. `united_rentals`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `updated_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
  - `assignees`: array of object - The assignees associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `vendor`: object
    - `id`: string e.g. `1`
    - `name`: string
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `projects`: array of object - The projects associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `group_ids`: array of string - The group ids associated with the equipment.
  - `custom_fields`: object - Values keyed by custom_field_{definition_id} (definition_id comes from your category fieldset). Each entry includes data_type and value as returned by the API. e.g. `{"custom_field_1001": {"data_type": "string", "value": "custom field value"},...`
  - `attachments`: array of object - Attachments associated with this equipment (SDR-0018 format)
    - `id`: string - Equipment-register internal attachment record ID e.g. `01KPZCKVX9TZXN81WYYRZR30CD`
    - `attached_to_item_id`: string - The FAS ID from the request e.g. `fas-01KPQE63CX0GPFBR12K3M01J59`
    - `attached_to_item_type`: string - The request key type (e.g. upload_id, profile_id) e.g. `upload_id`
    - `name`: string - Original filename e.g. `inspection-report.pdf`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/equipment_register/ids

**Get equipment ids by project (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - The Id of the project
- `search` [query] string - Search criteria applied on name, identification number and serial number
- `filters[id]` [query] string - Filter ids
- `filters[association_status]` [query] string enum[current, past, all] - The status of association. Values can be 'current', 'past' or 'all'. Default is 'current'
- `filters[type]` [query] string - Type filter
- `filters[category]` [query] string - Category filter
- `filters[make]` [query] string - Make filter
- `filters[model]` [query] string - Model filter
- `filters[type_ids]` [query] string - Type filter by Ids
- `filters[category_ids]` [query] string - Category filter by Ids
- `filters[make_ids]` [query] string - Make filter by Ids
- `filters[model_ids]` [query] string - Model filter by Ids
- `filters[year]` [query] string - Year filter
- `filters[status]` [query] string - Status filter
- `filters[ownership]` [query] string - Ownership filter
- `filters[vendor_ids]` [query] string - Vendor filter
- `filters[group_ids]` [query] string - Group filter
- `filters[is_current_project]` [query] string - Flag to filter by current project
- `filters[assignee_ids]` [query] string - Assignee filter
- `filters[updated_at]` [query] string - Updated at filter (date range format: YYYY-MM-DD...YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ...YYYY-MM-DDTHH:MM:SSZ)
- `page` [query] integer(int32) - The page number to retrieve. Default is 1.
- `per_page` [query] integer (required) - Number of records per page
- `sort` [query] string enum[make, model, category, type, equipmentId, equipmentName, serialNumber, year, ownership, ratePerHour, notes, rentalStartDate, ...] - Equipment sort. Also supports custom field sorting like 'custom_field_123' or '-custom_field_123' for descending
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): oneOf(object)


Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/equipment_register/ids

**Get all equipment ids (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `search` [query] string - Search criteria applied on name, identification number and serial number
- `filters[id]` [query] string - Filter ids
- `filters[type]` [query] string - Type filter
- `filters[category]` [query] string - Category filter
- `filters[make]` [query] string - Make filter
- `filters[model]` [query] string - Model filter
- `filters[type_ids]` [query] string - Type filter by Ids
- `filters[category_ids]` [query] string - Category filter by Ids
- `filters[make_ids]` [query] string - Make filter by Ids
- `filters[model_ids]` [query] string - Model filter by Ids
- `filters[year]` [query] string - Year filter
- `filters[status]` [query] string - Status filter by ids
- `filters[ownership]` [query] string - Ownership filter
- `filters[vendor_ids]` [query] string - Vendor filter
- `filters[group_ids]` [query] string - Group filter
- `filters[assignee_ids]` [query] string - Assignee filter
- `filters[current_project_ids]` [query] string - Current project filter by ids
- `filters[include_equipment_in_project_ids]` [query] string - Include only equipment associated with these project ids
- `filters[is_deleted]` [query] boolean - Is deleted filter
- `filters[updated_at]` [query] string - Updated at filter (date range format: YYYY-MM-DD...YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ...YYYY-MM-DDTHH:MM:SSZ)
- `page` [query] integer(int32) - The page number to retrieve. Default is 1.
- `per_page` [query] integer (required) - Number of records per page
- `sort` [query] string enum[make, model, category, type, equipmentId, equipmentName, serialNumber, year, ownership, ratePerHour, notes, rentalStartDate, ...] - Equipment sort. Also supports custom field sorting like 'custom_field_123' or '-custom_field_123' for descending
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): oneOf(object)


Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.1/companies/{company_id}/projects/{project_id}/equipment_register/current_project/bulk_destroy

**Bulk remove current project (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - The Id of the project
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- array of string

Response 200 (application/json): object

- `data`: array of object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Active`
    - `type`: string e.g. `Utilised`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `purchase_order`: string e.g. `PO-2026-0042`
  - `source`: string - Origin of the equipment record (e.g. import source or sync vendor). e.g. `united_rentals`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `updated_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
  - `assignees`: array of object - The assignees associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `vendor`: object
    - `id`: string e.g. `1`
    - `name`: string
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `projects`: array of object - The projects associated with this equipment
    - `id`: string e.g. `1`
    - `name`: string
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `group_ids`: array of string - The group ids associated with the equipment.
  - `custom_fields`: object - Values keyed by custom_field_{definition_id} (definition_id comes from your category fieldset). Each entry includes data_type and value as returned by the API. e.g. `{"custom_field_1001": {"data_type": "string", "value": "custom field value"},...`
  - `attachments`: array of object - Attachments associated with this equipment (SDR-0018 format)
    - `id`: string - Equipment-register internal attachment record ID e.g. `01KPZCKVX9TZXN81WYYRZR30CD`
    - `attached_to_item_id`: string - The FAS ID from the request e.g. `fas-01KPQE63CX0GPFBR12K3M01J59`
    - `attached_to_item_type`: string - The request key type (e.g. upload_id, profile_id) e.g. `upload_id`
    - `name`: string - Original filename e.g. `inspection-report.pdf`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register/{equipment_id}/project_log  **[DEPRECATED]**

**Set current project (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment Id
- `project_id` [path] string (required) - The Id of the project
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object
  - `equipment_id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `project_id`: string - The project logged on the equipment e.g. `1`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/equipment_register/restore

**Restore equipment (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `ids`: array of string (required) - A list of unique identifiers (ULIDs) for the equipment to be deleted. e.g. `["01J3F5HDS3A3KE980C4H7HW3KQ", "01J3F5HR0NVJFAP90BCX9NAP1B"]`

Response 200 (application/json): object

- `data`: array of object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `equipment_id`: string e.g. `A31788`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `equipment_name`: string e.g. `Small Excavator`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: string enum[inactive, active] e.g. `active`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/equipment_register  **[DEPRECATED]**

**Get all equipment (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `search` [query] string - Search criteria applied on name, identification number and serial number
- `filters[id]` [query] string - Filter ids
- `filters[type]` [query] string - Type filter
- `filters[category]` [query] string - Category filter
- `filters[make]` [query] string - Make filter
- `filters[model]` [query] string - Model filter
- `filters[type_ids]` [query] string - Type filter by Ids
- `filters[category_ids]` [query] string - Category filter by Ids
- `filters[make_ids]` [query] string - Make filter by Ids
- `filters[model_ids]` [query] string - Model filter by Ids
- `filters[year]` [query] string - Year filter
- `filters[status]` [query] string - Status filter
- `filters[ownership]` [query] string - Ownership filter
- `filters[vendor_ids]` [query] string - Vendor filter
- `filters[is_deleted]` [query] boolean - Is deleted filter
- `filters[assignee_ids]` [query] string - Assignee filter
- `page` [query] integer(int32) - The page number to retrieve. Default is 1.
- `per_page` [query] integer (required) - Number of records per page
- `view` [query] string enum[compact, short, normal, ids, extended] - Equipment view type
- `sort` [query] string enum[make, model, category, type, equipmentId, equipmentName, serialNumber, year, ownership, ratePerHour, notes, rentalStartDate, ...] - Equipment sort
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): oneOf(object | object | object | object | object)


Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/equipment_register

**Delete equipment (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `ids`: array of string (required) - A list of unique identifiers (ULIDs) for the equipment to be deleted. e.g. `["01J3F5HDS3A3KE980C4H7HW3KQ", "01J3F5HR0NVJFAP90BCX9NAP1B"]`

Response 200 (application/json): object

- `data`: array of object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `equipment_id`: string e.g. `A31788`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `equipment_name`: string e.g. `Small Excavator`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: string enum[inactive, active] e.g. `active`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/equipment_register/{equipment_id}/projects

**Get equipment projects (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment id
- `per_page` [query] integer (required) - Number of records per page
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: array of object
  - `project_id`: string (required) - The project id to associate the equipment with e.g. `1234`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/equipment_register/{equipment_id}/change_history

**Get equipment change history (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment id
- `page` [query] integer(int32) - The page number to retrieve. Default is 1.
- `per_page` [query] integer (required) - Number of records per page
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: array of object
  - `action_by`: string - The user who performed the action. e.g. `John Doe`
  - `changed`: string - The field that was changed. e.g. `status`
  - `from`: string - The value of the field before the change. e.g. `ACTIVE`
  - `to`: string - The value of the field after the change. e.g. `INACTIVE`
  - `date`: string(date-time) - The date and time the change was made. e.g. `2021-08-01T00:00:00Z`
  - `id`: string - The unique identifier of the history record. e.g. `01J3F666D50DSW9X16JEWJP60Z`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.1/companies/{company_id}/projects/{project_id}/equipment_register/bulk_update  **[OLDER VERSION - a newer path version exists below/above]**

**Update equipment (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - The Id of the project
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `equipment_name`: object
  - `present`: boolean
- `name`: string - The name of the equipment. e.g. `Excavator`
- `equipment_id`: object
  - `present`: boolean
- `identification_number`: string - The identification number of the equipment. e.g. `A1H231hH`
- `serial_number`: string - The serial number of the equipment. e.g. `C123D1332`
- `profile_photo`: string
- `category_id`: string - The category of the equipment. e.g. `01J3F5S73XY0T9KYCC6V383GYK`
- `type_id`: string - The type of the equipment. e.g. `01J3F5SJDJYTBKJV0VK4M8ZM9P`
- `make_id`: string - The make of the equipment. e.g. `01J3F5SY28Y3TM2712VD64M4P0`
- `model_id`: string - The model of the equipment. e.g. `01J3F5T86WXS843Q4Q36CEYQ83`
- `status_id`: string - The status of the equipment. e.g. `01J3F5T86WXS843Q4Q36CEYQ46`
- `year`: integer(int32) - The year of the equipment. e.g. `2021`
- `rate_per_hour`: number(float) e.g. `100`
- `ownership`: string enum[OWNED, RENTED, SUBCONTRACTED] e.g. `OWNED`
- `notes`: string e.g. `This is notes`
- `purchase_order`: string - The purchase order number. e.g. `PO-2026-0042`
- `assignee_ids`: string - The people id of the equipment. e.g. `1,2,3`
- `vendor_id`: string - The vendor id of the equipment. e.g. `1`
- `rental_start_date`: string(date) - The start date of the rental. e.g. `2021-01-01`
- `rental_end_date`: string(date) - The end date of the rental. e.g. `2021-01-01`
- `group_ids`: array of string - List of group IDs to be associated with the equipment
- `upload_ids`: object - Attachment mutation input key for document uploads in PATCH operations.
- `profile_ids`: object - Attachment mutation input key for profile image uploads in PATCH operations.
- `onsite`: boolean - Flag indicating to set or unset the equipment on the project. e.g. `true`
- `id`: string (required) - The equipment id. e.g. `01J3F5HR0NVJFAP90BCX9NAP1B`

Response 207 (application/json): oneOf(object)


Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register/{equipment_id}/current_project  **[OLDER VERSION - a newer path version exists below/above]**

**Update current project (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment Id
- `project_id` [path] string (required) - The Id of the project
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `equipment_id`: string e.g. `A31788`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `equipment_name`: string e.g. `Small Excavator`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: string enum[inactive, active] e.g. `active`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register/{equipment_id}/current_project  **[OLDER VERSION - a newer path version exists below/above]**

**Remove current project (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment Id
- `project_id` [path] string (required) - The Id of the project
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `equipment_id`: string e.g. `A31788`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `equipment_name`: string e.g. `Small Excavator`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: string enum[inactive, active] e.g. `active`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register/current_project/bulk_update  **[OLDER VERSION - a newer path version exists below/above]**

**Bulk update current project (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - The Id of the project
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `equipment_id`: string (required) e.g. `A1d2D3432`

Response 200 (application/json): object

- `data`: array of object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `equipment_id`: string e.g. `A31788`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `equipment_name`: string e.g. `Small Excavator`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: string enum[inactive, active] e.g. `active`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/equipment_register/{equipment_id}/current_project  **[OLDER VERSION - a newer path version exists below/above]**

**Update current project (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment Id
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `project_id`: string (required) - The project being logged on the equipment. e.g. `1234`

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `equipment_id`: string e.g. `A31788`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `equipment_name`: string e.g. `Small Excavator`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: string enum[inactive, active] e.g. `active`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/equipment_register/{equipment_id}/current_project  **[OLDER VERSION - a newer path version exists below/above]**

**Remove current project (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment Id
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `equipment_id`: string e.g. `A31788`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `equipment_name`: string e.g. `Small Excavator`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: string enum[inactive, active] e.g. `active`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/equipment_register/current_project/bulk_update  **[OLDER VERSION - a newer path version exists below/above]**

**Bulk update current project (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `project_id`: string (required) - The project being logged on the equipment. e.g. `1234`
- `equipment_id`: string (required) e.g. `A1d2D3432`

Response 200 (application/json): object

- `data`: array of object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `equipment_id`: string e.g. `A31788`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `equipment_name`: string e.g. `Small Excavator`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: string enum[inactive, active] e.g. `active`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Get equipment by project (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - The Id of the project
- `search` [query] string - Search criteria applied on name, identification number and serial number
- `filters[id]` [query] string - Filter ids
- `filters[association_status]` [query] string enum[current, past, all] - The status of association. Values can be 'current', 'past' or 'all'. Default is 'current'
- `filters[type]` [query] string - Type filter
- `filters[category]` [query] string - Category filter
- `filters[make]` [query] string - Make filter
- `filters[model]` [query] string - Model filter
- `filters[type_ids]` [query] string - Type filter by Ids
- `filters[category_ids]` [query] string - Category filter by Ids
- `filters[make_ids]` [query] string - Make filter by Ids
- `filters[model_ids]` [query] string - Model filter by Ids
- `filters[year]` [query] string - Year filter
- `filters[status]` [query] string - Status filter
- `filters[ownership]` [query] string - Ownership filter
- `filters[vendor_ids]` [query] string - Vendor filter
- `filters[is_current_project]` [query] string - Flag to filter by current project
- `filters[assignee_ids]` [query] string - Assignee filter
- `page` [query] integer(int32) - The page number to retrieve. Default is 1.
- `per_page` [query] integer (required) - Number of records per page
- `view` [query] string enum[compact, short, normal, ids] - Equipment view type
- `sort` [query] string enum[make, model, category, type, equipmentId, equipmentName, serialNumber, year, ownership, ratePerHour, notes, rentalStartDate, ...] - Equipment sort
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): oneOf(object | object | object | object)


Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/equipment_register/{equipment_id}  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Get equipment by ID (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment Id
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `equipment_id`: string e.g. `A31788`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `equipment_name`: string e.g. `Small Excavator`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: string enum[inactive, active] e.g. `active`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register/current_project/bulk_destroy  **[OLDER VERSION - a newer path version exists below/above]**

**Bulk remove current project (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - The Id of the project
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- array of string

Response 200 (application/json): object

- `data`: array of object
  - `id`: string e.g. `01J3F27HC2Z2NJ0879JDM5FMSY`
  - `equipment_id`: string e.g. `A31788`
  - `identification_number`: string e.g. `C612C7adasd76`
  - `equipment_name`: string e.g. `Small Excavator`
  - `name`: string e.g. `Small Excavator`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
  - `profile_photo`: string e.g. `BGA336adHFstpolknasdyhjasdvk`
  - `status`: string enum[inactive, active] e.g. `active`
  - `serial_number`: string e.g. `123Had6Hasdk`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
  - `model`: object
    - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
    - `name`: string e.g. `PW1500`
  - `year`: integer(int32) e.g. `2021`
  - `rate_per_hour`: number(float) e.g. `100`
  - `ownership`: string enum[owned, rented, subcontracted] e.g. `Owned`
  - `notes`: string e.g. `This is a note`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `vendor_id`: string - The vendor id of the equipment e.g. `1`
  - `rental_start_date`: string(date) e.g. `2021-09-10`
  - `rental_end_date`: string(date) e.g. `2021-09-10`
  - `is_current_project`: boolean e.g. `true`
  - `project_ids`: array of integer(int64) e.g. `1,2,3`
  - `current_project_id`: string - The current project id of the equipment e.g. `1`
  - `error`: object
    - `code`: string
    - `message`: string
    - `details`: array of object
  - `is_deleted`: boolean e.g. `false`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Equipment Maintenance

Resource id: `equipment-maintenance`. Raw spec: `../openapi-raw/equipment-maintenance.json`. Web: https://developers.procore.com/reference/rest/equipment-maintenance?version=latest
Product lines: equipment-register

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register/{equipment_id}/maintenance/records

**Get all equipment maintenance records (Project)**
Retrieve equipment maintenance records for a specific equipment.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `search` [query] string - Search criteria
- `filters[type]` [query] string - Filter by service type
- `page` [query] integer(int32) - The page number to retrieve. Default is 1.
- `per_page` [query] integer (required) - Number of records per page
- `sort` [query] string enum[maintenanceType, duration, startDate, issue, notes] - Maintenance sort
- `equipment_id` [path] string (required) - Equipment Id
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - The id of the equipment maintenance. e.g. `01FJ4G5K8Z3X1D2F6G4H5J6K7L`
  - `type`: string - The type of maintenance. e.g. `maintenance type`
  - `issue`: string - Description of the maintenance issue. e.g. `Oil change`
  - `notes`: string
  - `start_date`: string(date) - Start date for equipment maintenance. e.g. `2023-10-01T00:00:00Z`
  - `duration`: integer(int32) - Duration in days. e.g. `4`
  - `attachments`: array of object - List of attachments associated with the maintenance record
    - `id`: string - The id of the attachment e.g. `01JX9XTJYMFYJXJJP6VVF8WKTK`
    - `name`: string - The name of the attachment file e.g. `text.jpeg`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register/{equipment_id}/maintenance/records

**Create a new maintenance record (Project)**
Create a new maintenance record for equipment.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment Id
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `equipment_id`: string (required) - The id of the equipment. e.g. `equipment_id`
- `type`: string enum[PLANNED, UNPLANNED] (required) - The type of maintenance. e.g. `maintenance type`
- `issue`: string - Description of the maintenance issue. e.g. `Oil change`
- `notes`: string - Notes about the maintenance.
- `start_date`: string(date) - Start date for equipment maintenance. e.g. `2025-05-21`
- `duration`: integer(int32) - Duration in days. e.g. `4`

Response 200 (application/json): object

- `data`: object
  - `id`: string - The id of the equipment maintenance. e.g. `01FJ4G5K8Z3X1D2F6G4H5J6K7L`
  - `type`: string - The type of maintenance. e.g. `maintenance type`
  - `issue`: string - Description of the maintenance issue. e.g. `Oil change`
  - `notes`: string
  - `start_date`: string(date) - Start date for equipment maintenance. e.g. `2023-10-01T00:00:00Z`
  - `duration`: integer(int32) - Duration in days. e.g. `4`
  - `attachments`: array of object - List of attachments associated with the maintenance record
    - `id`: string - The id of the attachment e.g. `01JX9XTJYMFYJXJJP6VVF8WKTK`
    - `name`: string - The name of the attachment file e.g. `text.jpeg`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/equipment_register/{equipment_id}/maintenance/records

**Get all equipment maintenance records (Company)**
Retrieve equipment maintenance records for a specific company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `search` [query] string - Search criteria
- `filters[type]` [query] string - Filter by service type
- `page` [query] integer(int32) - The page number to retrieve. Default is 1.
- `per_page` [query] integer (required) - Number of records per page
- `sort` [query] string enum[maintenanceType, duration, startDate, issue, notes] - Maintenance sort
- `equipment_id` [path] string (required) - Equipment Id
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - The id of the equipment maintenance. e.g. `01FJ4G5K8Z3X1D2F6G4H5J6K7L`
  - `type`: string - The type of maintenance. e.g. `maintenance type`
  - `issue`: string - Description of the maintenance issue. e.g. `Oil change`
  - `notes`: string
  - `start_date`: string(date) - Start date for equipment maintenance. e.g. `2023-10-01T00:00:00Z`
  - `duration`: integer(int32) - Duration in days. e.g. `4`
  - `attachments`: array of object - List of attachments associated with the maintenance record
    - `id`: string - The id of the attachment e.g. `01JX9XTJYMFYJXJJP6VVF8WKTK`
    - `name`: string - The name of the attachment file e.g. `text.jpeg`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/equipment_register/{equipment_id}/maintenance/records

**Create a new maintenance record (Company)**
Create a new maintenance record for equipment.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment Id
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `equipment_id`: string (required) - The id of the equipment. e.g. `equipment_id`
- `type`: string enum[PLANNED, UNPLANNED] (required) - The type of maintenance. e.g. `maintenance type`
- `issue`: string - Description of the maintenance issue. e.g. `Oil change`
- `notes`: string - Notes about the maintenance.
- `start_date`: string(date) - Start date for equipment maintenance. e.g. `2025-05-21`
- `duration`: integer(int32) - Duration in days. e.g. `4`

Response 200 (application/json): object

- `data`: object
  - `id`: string - The id of the equipment maintenance. e.g. `01FJ4G5K8Z3X1D2F6G4H5J6K7L`
  - `type`: string - The type of maintenance. e.g. `maintenance type`
  - `issue`: string - Description of the maintenance issue. e.g. `Oil change`
  - `notes`: string
  - `start_date`: string(date) - Start date for equipment maintenance. e.g. `2023-10-01T00:00:00Z`
  - `duration`: integer(int32) - Duration in days. e.g. `4`
  - `attachments`: array of object - List of attachments associated with the maintenance record
    - `id`: string - The id of the attachment e.g. `01JX9XTJYMFYJXJJP6VVF8WKTK`
    - `name`: string - The name of the attachment file e.g. `text.jpeg`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register/{equipment_id}/maintenance/records/{maintenance_id}

**Get equipment maintenance record by its ID (Project)**
Retrieve a equipment maintenance record by its ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `maintenance_id` [path] string (required) - Maintenance Id
- `equipment_id` [path] string (required) - Equipment Id
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object
  - `id`: string - The id of the equipment maintenance. e.g. `01FJ4G5K8Z3X1D2F6G4H5J6K7L`
  - `type`: string - The type of maintenance. e.g. `maintenance type`
  - `issue`: string - Description of the maintenance issue. e.g. `Oil change`
  - `notes`: string
  - `start_date`: string(date) - Start date for equipment maintenance. e.g. `2023-10-01T00:00:00Z`
  - `duration`: integer(int32) - Duration in days. e.g. `4`
  - `attachments`: array of object - List of attachments associated with the maintenance record
    - `id`: string - The id of the attachment e.g. `01JX9XTJYMFYJXJJP6VVF8WKTK`
    - `name`: string - The name of the attachment file e.g. `text.jpeg`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register/{equipment_id}/maintenance/records/{maintenance_id}

**Update a maintenance record (Project)**
Update an existing maintenance record by its ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `maintenance_id` [path] string (required) - Maintenance Id
- `equipment_id` [path] string (required) - Equipment Id
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `equipment_id`: object - The id of the equipment. e.g. `01FJ4G5K8Z3X1D2F6G4H5J6K7L`
  - `present`: boolean
- `type`: string enum[PLANNED, UNPLANNED] - The type of maintenance. e.g. `PLANNED`
- `issue`: object - Description of the maintenance issue. e.g. `Oil change`
  - `present`: boolean
- `notes`: object - Notes about the maintenance.
  - `present`: boolean
- `start_date`: object - Start date for equipment maintenance. e.g. `2025-05-21`
  - `present`: boolean
- `duration`: object - Duration in days. e.g. `4`
  - `present`: boolean

Response 200 (application/json): object

- `data`: object
  - `id`: string - The id of the equipment maintenance. e.g. `01FJ4G5K8Z3X1D2F6G4H5J6K7L`
  - `type`: string - The type of maintenance. e.g. `maintenance type`
  - `issue`: string - Description of the maintenance issue. e.g. `Oil change`
  - `notes`: string
  - `start_date`: string(date) - Start date for equipment maintenance. e.g. `2023-10-01T00:00:00Z`
  - `duration`: integer(int32) - Duration in days. e.g. `4`
  - `attachments`: array of object - List of attachments associated with the maintenance record
    - `id`: string - The id of the attachment e.g. `01JX9XTJYMFYJXJJP6VVF8WKTK`
    - `name`: string - The name of the attachment file e.g. `text.jpeg`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register/{equipment_id}/maintenance/records/{maintenance_id}

**Delete a maintenance record by ID(Project)**
Delete a specific maintenance record by its ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `maintenance_id` [path] string (required) - Maintenance Id
- `equipment_id` [path] string (required) - Equipment Id
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/equipment_register/{equipment_id}/maintenance/records/{maintenance_id}

**Get equipment maintenance record by its ID (Company)**
Retrieve a equipment maintenance record by its ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `maintenance_id` [path] string (required) - Maintenance Id
- `equipment_id` [path] string (required) - Equipment Id
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object
  - `id`: string - The id of the equipment maintenance. e.g. `01FJ4G5K8Z3X1D2F6G4H5J6K7L`
  - `type`: string - The type of maintenance. e.g. `maintenance type`
  - `issue`: string - Description of the maintenance issue. e.g. `Oil change`
  - `notes`: string
  - `start_date`: string(date) - Start date for equipment maintenance. e.g. `2023-10-01T00:00:00Z`
  - `duration`: integer(int32) - Duration in days. e.g. `4`
  - `attachments`: array of object - List of attachments associated with the maintenance record
    - `id`: string - The id of the attachment e.g. `01JX9XTJYMFYJXJJP6VVF8WKTK`
    - `name`: string - The name of the attachment file e.g. `text.jpeg`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/equipment_register/{equipment_id}/maintenance/records/{maintenance_id}

**Update a maintenance record**
Update an existing maintenance record by its ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `maintenance_id` [path] string (required) - Maintenance Id
- `equipment_id` [path] string (required) - Equipment Id
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `equipment_id`: object - The id of the equipment. e.g. `01FJ4G5K8Z3X1D2F6G4H5J6K7L`
  - `present`: boolean
- `type`: string enum[PLANNED, UNPLANNED] - The type of maintenance. e.g. `PLANNED`
- `issue`: object - Description of the maintenance issue. e.g. `Oil change`
  - `present`: boolean
- `notes`: object - Notes about the maintenance.
  - `present`: boolean
- `start_date`: object - Start date for equipment maintenance. e.g. `2025-05-21`
  - `present`: boolean
- `duration`: object - Duration in days. e.g. `4`
  - `present`: boolean

Response 200 (application/json): object

- `data`: object
  - `id`: string - The id of the equipment maintenance. e.g. `01FJ4G5K8Z3X1D2F6G4H5J6K7L`
  - `type`: string - The type of maintenance. e.g. `maintenance type`
  - `issue`: string - Description of the maintenance issue. e.g. `Oil change`
  - `notes`: string
  - `start_date`: string(date) - Start date for equipment maintenance. e.g. `2023-10-01T00:00:00Z`
  - `duration`: integer(int32) - Duration in days. e.g. `4`
  - `attachments`: array of object - List of attachments associated with the maintenance record
    - `id`: string - The id of the attachment e.g. `01JX9XTJYMFYJXJJP6VVF8WKTK`
    - `name`: string - The name of the attachment file e.g. `text.jpeg`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/equipment_register/{equipment_id}/maintenance/records/{maintenance_id}

**Delete a maintenance record by ID**
Delete a specific maintenance record by its ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `maintenance_id` [path] string (required) - Maintenance Id
- `equipment_id` [path] string (required) - Equipment Id
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Field Sets

Resource id: `field-sets`. Raw spec: `../openapi-raw/field-sets.json`. Web: https://developers.procore.com/reference/rest/field-sets?version=latest
Product lines: equipment-register

### GET /rest/v2.0/companies/{company_id}/equipment_register/configurable_field_sets  **[BETA]**

**Get Configurable Field Sets (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer(int32) - The page number to retrieve. Default is 1.
- `per_page` [query] integer(int32) - The number of items to retrieve per page. Default is 10, maximum is 100.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: array of object
  - `id`: string
  - `cfsId`: integer(int64)
  - `companyId`: integer(int64)
  - `createdAt`: string(date-time)
  - `updatedAt`: string(date-time)
  - `equipmentCategoryId`: string
  - `configurableFields`: object
  - `customFields`: object

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Make

Resource id: `make`. Raw spec: `../openapi-raw/make.json`. Web: https://developers.procore.com/reference/rest/make?version=latest
Product lines: equipment-register

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register_makes

**Get all equipment makes (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer(int32) - The page number to retrieve. Default is 1.
- `per_page` [query] integer (required) - Number of records per page
- `filters[is_active]` [query] boolean - Is active filter
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: array of object
  - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
  - `name`: string e.g. `Antec`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register_makes

**Create equipment make (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `name`: string (required) - The name of the equipment make. e.g. `Caterpillar`
- `is_active`: boolean (required) - Active/Inactive indicator for Equipment Make. e.g. `true`

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
  - `name`: string e.g. `Antec`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/equipment_register_makes

**Get all equipment makes (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer(int32) - The page number to retrieve. Default is 1.
- `per_page` [query] integer (required) - Number of records per page
- `filters[is_active]` [query] boolean - Is active filter
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: array of object
  - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
  - `name`: string e.g. `Antec`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/equipment_register_makes

**Create equipment make (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `name`: string (required) - The name of the equipment make. e.g. `Caterpillar`
- `is_active`: boolean (required) - Active/Inactive indicator for Equipment Make. e.g. `true`

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
  - `name`: string e.g. `Antec`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/equipment_register_makes/{make_id}

**Update equipment make (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `make_id` [path] string (required) - Make id
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `name`: string
- `is_active`: boolean - Active/Inactive indicator for Equipment Make. e.g. `true`

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
  - `name`: string e.g. `Antec`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/equipment_register_makes/{make_id}

**Delete equipment make (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `make_id` [path] string (required) - Make id
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Model

Resource id: `model`. Raw spec: `../openapi-raw/model.json`. Web: https://developers.procore.com/reference/rest/model?version=latest
Product lines: equipment-register

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register_models

**Get all equipment models (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer(int32) - The page number to retrieve. Default is 1.
- `per_page` [query] integer (required) - Number of records per page
- `filters[is_active]` [query] boolean - Is active filter
- `filters[make_id]` [query] string - Make filter
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: array of object
  - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
  - `name`: string e.g. `PW1500`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
    - `category`: object
    - `in_use`: boolean
    - `is_active`: boolean e.g. `true`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
    - `in_use`: boolean
    - `is_active`: boolean e.g. `true`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register_models

**Create equipment model (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `name`: string (required) - The name of the equipment model. e.g. `D6T`
- `make_id`: string (required) - The unique identifier of the equipment make. e.g. `01J3F6YFWJSGZQP2Y38JHJ2SH4`
- `type_id`: string
- `is_active`: boolean (required) - Active/Inactive indicator for Equipment Model. e.g. `true`

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
  - `name`: string e.g. `PW1500`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
    - `category`: object
    - `in_use`: boolean
    - `is_active`: boolean e.g. `true`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
    - `in_use`: boolean
    - `is_active`: boolean e.g. `true`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/equipment_register_models

**Get all equipment models (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer(int32) - The page number to retrieve. Default is 1.
- `per_page` [query] integer (required) - Number of records per page
- `filters[is_active]` [query] boolean - Is active filter
- `filters[make_id]` [query] string - Make filter
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: array of object
  - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
  - `name`: string e.g. `PW1500`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
    - `category`: object
    - `in_use`: boolean
    - `is_active`: boolean e.g. `true`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
    - `in_use`: boolean
    - `is_active`: boolean e.g. `true`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/equipment_register_models

**Create equipment model (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `name`: string (required) - The name of the equipment model. e.g. `D6T`
- `make_id`: string (required) - The unique identifier of the equipment make. e.g. `01J3F6YFWJSGZQP2Y38JHJ2SH4`
- `type_id`: string
- `is_active`: boolean (required) - Active/Inactive indicator for Equipment Model. e.g. `true`

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
  - `name`: string e.g. `PW1500`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
    - `category`: object
    - `in_use`: boolean
    - `is_active`: boolean e.g. `true`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
    - `in_use`: boolean
    - `is_active`: boolean e.g. `true`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/equipment_register_models/{model_id}

**Update equipment model (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `model_id` [path] string (required) - Model id
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `name`: string - The name of the equipment model. e.g. `D6T`
- `type_id`: string - The unique identifier of the equipment make. e.g. `01J3F6YFWJSGZQP2Y38JHJ2SH4`
- `is_active`: boolean - Active/Inactive indicator for Equipment Model. e.g. `true`

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F3DJK1XGQMG8RZH3M131BX`
  - `name`: string e.g. `PW1500`
  - `type`: object
    - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
    - `name`: string e.g. `Asphalt Paver`
    - `category`: object
    - `in_use`: boolean
    - `is_active`: boolean e.g. `true`
  - `make`: object
    - `id`: string e.g. `01J3F3BYX9G11R3XHXPFA2G361`
    - `name`: string e.g. `Antec`
    - `in_use`: boolean
    - `is_active`: boolean e.g. `true`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/equipment_register_models/{model_id}

**Delete equipment model (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `model_id` [path] string (required) - Model id
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Association

Resource id: `project-association`. Raw spec: `../openapi-raw/project-association.json`. Web: https://developers.procore.com/reference/rest/project-association?version=latest
Product lines: equipment-register

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register/associate

**Associate equipment with project (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - The Id of the project
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `ids`: array of string (required) - A list of unique identifiers for the equipment to be associated/dissociated with the project.

Response 200 (application/json): object

- `data`: array of object
  - `equipment_id`: string (required) e.g. `A1d2D3432`
  - `project_id`: string (required) - The project id to associate the equipment with e.g. `1234`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register/associate

**Disassociate equipment with project (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - The Id of the project
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `ids`: array of string (required) - A list of unique identifiers for the equipment to be associated/dissociated with the project.

Response 200 (application/json): object

- `data`: array of object
  - `equipment_id`: string (required) e.g. `A1d2D3432`
  - `project_id`: string (required) - The project id to associate the equipment with e.g. `1234`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/equipment_register/associate

**Associate equipment with project (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `equipment_id`: string (required) e.g. `A1d2D3432`
- `project_id`: string (required) - The project id to associate the equipment with e.g. `1234`

Response 200 (application/json): object

- `data`: array of object
  - `equipment_id`: string (required) e.g. `A1d2D3432`
  - `project_id`: string (required) - The project id to associate the equipment with e.g. `1234`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/equipment_register/associate

**Disassociate equipment with project (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `equipment_id`: string (required) e.g. `A1d2D3432`
- `project_id`: string (required) - The project id to associate the equipment with e.g. `1234`

Response 200 (application/json): object

- `data`: array of object
  - `equipment_id`: string (required) e.g. `A1d2D3432`
  - `project_id`: string (required) - The project id to associate the equipment with e.g. `1234`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Status

Resource id: `status`. Raw spec: `../openapi-raw/status.json`. Web: https://developers.procore.com/reference/rest/status?version=latest
Product lines: equipment-register

### GET /rest/v2.0/companies/{company_id}/equipment_register/statuses

**Get all equipment Statuses (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer(int32) - The page number to retrieve. Default is 1.
- `per_page` [query] integer (required) - Number of records per page
- `filters[is_active]` [query] boolean - Is active filter
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: array of object
  - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
  - `name`: string e.g. `Active`
  - `type`: string e.g. `Utilised`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/equipment_register/statuses

**Create equipment status (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `name`: string (required) - The name of the equipment status. e.g. `Active`
- `type`: string enum[AVAILABLE, UNAVAILABLE, IN_USE] (required) - The type of the equipment status. e.g. `Utilised`
- `is_active`: boolean - Active/Inactive indicator for Equipment Status. e.g. `true`

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
  - `name`: string e.g. `Active`
  - `type`: string e.g. `Utilised`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/equipment_register/statuses/{status_id}

**Update equipment status (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `status_id` [path] string (required) - Status id
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `name`: string - The name of the equipment status. e.g. `Active`
- `type`: string enum[AVAILABLE, UNAVAILABLE, IN_USE] - The type of the equipment status. e.g. `Available`
- `is_active`: boolean - Active/Inactive indicator for Equipment Status. e.g. `true`

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
  - `name`: string e.g. `Active`
  - `type`: string e.g. `Utilised`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/equipment_register/statuses/{status_id}

**Delete equipment status (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `status_id` [path] string (required) - Status id
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register/statuses

**Get all equipment Statuses (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer(int32) - The page number to retrieve. Default is 1.
- `per_page` [query] integer (required) - Number of records per page
- `filters[is_active]` [query] boolean - Is active filter
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: array of object
  - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
  - `name`: string e.g. `Active`
  - `type`: string e.g. `Utilised`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Type

Resource id: `type`. Raw spec: `../openapi-raw/type.json`. Web: https://developers.procore.com/reference/rest/type?version=latest
Product lines: equipment-register

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register_types

**Get all equipment types (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer(int32) - The page number to retrieve. Default is 1.
- `per_page` [query] integer (required) - Number of records per page
- `filters[is_active]` [query] boolean - Is active filter
- `filters[category_id]` [query] string - Category id filter
- `filters[id]` [query] string - Filter ids
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: array of object
  - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
  - `name`: string e.g. `Asphalt Paver`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
    - `in_use`: boolean
    - `is_active`: boolean e.g. `true`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register_types

**Create equipment type (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `name`: string (required) - The name of the equipment type. e.g. `Asphalt Paver`
- `category_id`: string (required) - The unique identifier of the equipment category. e.g. `01J3F72FXP141K23AWQ0AN2YNJ`
- `is_active`: boolean (required) - Active/Inactive indicator for Equipment Type. e.g. `true`

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
  - `name`: string e.g. `Asphalt Paver`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
    - `in_use`: boolean
    - `is_active`: boolean e.g. `true`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/equipment_register_types

**Get all equipment types (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer(int32) - The page number to retrieve. Default is 1.
- `per_page` [query] integer (required) - Number of records per page
- `filters[is_active]` [query] boolean - Is active filter
- `filters[category_id]` [query] string - Category id filter
- `filters[id]` [query] string - Filter ids
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: array of object
  - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
  - `name`: string e.g. `Asphalt Paver`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
    - `in_use`: boolean
    - `is_active`: boolean e.g. `true`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/equipment_register_types

**Create equipment type (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `name`: string (required) - The name of the equipment type. e.g. `Asphalt Paver`
- `category_id`: string (required) - The unique identifier of the equipment category. e.g. `01J3F72FXP141K23AWQ0AN2YNJ`
- `is_active`: boolean (required) - Active/Inactive indicator for Equipment Type. e.g. `true`

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
  - `name`: string e.g. `Asphalt Paver`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
    - `in_use`: boolean
    - `is_active`: boolean e.g. `true`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/equipment_register_types/{type_id}

**Update equipment type (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `type_id` [path] string (required) - Type id
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `name`: string - The name of the equipment type. e.g. `Asphalt Paver`
- `is_active`: boolean - Active/Inactive indicator for Equipment Type. e.g. `true`

Response 200 (application/json): object

- `data`: object
  - `id`: string e.g. `01J3F3015CWKSMHKY6KPDWFFHZ`
  - `name`: string e.g. `Asphalt Paver`
  - `category`: object
    - `id`: string e.g. `01J3F36T5VVPR9RN20328Q2275`
    - `name`: string e.g. `Asphalt Aggregate Concrete`
    - `in_use`: boolean
    - `is_active`: boolean e.g. `true`
  - `in_use`: boolean
  - `is_active`: boolean e.g. `true`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/equipment_register_types/{type_id}

**Delete equipment type (Company)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `type_id` [path] string (required) - Type id
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Unmanaged Equipment

Resource id: `unmanaged-equipment`. Raw spec: `../openapi-raw/unmanaged-equipment.json`. Web: https://developers.procore.com/reference/rest/unmanaged-equipment?version=latest
Product lines: equipment-register

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register/equipment_unmanaged  **[BETA]**

**Get unmanaged equipment (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - The Id of the project
- `search` [query] string - Search criteria
- `filters[id]` [query] string - Filter ids
- `filters[updated_at]` [query] string - Updated at filter (date range format: YYYY-MM-DD...YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ...YYYY-MM-DDTHH:MM:SSZ)
- `page` [query] integer(int32) - The page number to retrieve. Default is 1.
- `per_page` [query] integer (required) - Number of records per page
- `view` [query] string enum[ids, normal, extended] - Equipment view type
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): oneOf(object | object | object)


Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register/equipment_unmanaged  **[BETA]**

**Create unmanaged equipment (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - The Id of the project
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `identification_number`: string (required) - Identification number of the unmanaged equipment e.g. `EQ123`

Response 200 (application/json): object

- `data`: object
  - `id`: string - Unique identifier of the unmanaged equipment e.g. `01HXSAXEAHVJ3VCRXSRTXQKXXX`
  - `identification_number`: string - Identification number of the unmanaged equipment e.g. `EQ123`
  - `is_active`: boolean - Flag indicating if the unmanaged equipment is active e.g. `true`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `updated_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_register/equipment_unmanaged/{equipment_id}  **[BETA]**

**Update unmanaged equipment (Project)**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `equipment_id` [path] string (required) - Equipment id
- `project_id` [path] string (required) - The Id of the project
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `is_active`: boolean (required) - Active/Inactive indicator for Equipment Category. e.g. `true`

Response 200 (application/json): object

- `data`: object
  - `id`: string - Unique identifier of the unmanaged equipment e.g. `01HXSAXEAHVJ3VCRXSRTXQKXXX`
  - `identification_number`: string - Identification number of the unmanaged equipment e.g. `EQ123`
  - `is_active`: boolean - Flag indicating if the unmanaged equipment is active e.g. `true`
  - `created_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`
  - `updated_at`: string(date-time) e.g. `2021-08-01T12:00:00Z`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

