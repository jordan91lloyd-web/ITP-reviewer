# Procore API: Inspections (Project Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Inspections)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Alternative Response Sets](#alternative-response-sets) - versions 1.0
- [Checklist Attachments](#checklist-attachments) - versions 1.0
- [Checklist Comments](#checklist-comments) - versions 1.0
- [Checklist Default Distribution](#checklist-default-distribution) - versions 1.0
- [Checklist Item Attachments](#checklist-item-attachments) - versions 1.0
- [Checklist Item Observations](#checklist-item-observations) - versions 1.0
- [Checklist Item Types](#checklist-item-types) - versions 1.0
- [Checklist Items](#checklist-items) - versions 1.1, 1.0
- [Checklist List Filter Options](#checklist-list-filter-options) - versions 2.0, 1.0
- [Checklist Schedule Attachments](#checklist-schedule-attachments) - versions 1.0
- [Checklist Schedule Change Histories](#checklist-schedule-change-histories) - versions 1.0
- [Checklist Schedule Filter Options](#checklist-schedule-filter-options) - versions 2.0, 1.0
- [Checklist Schedules](#checklist-schedules) - versions 1.0
- [Checklist Sections](#checklist-sections) - versions 1.1, 1.0
- [Checklist Signature Requests](#checklist-signature-requests) - versions 1.0
- [Checklist Templates](#checklist-templates) - versions 1.0
- [Checklists](#checklists) - versions 1.1, 1.0
- [Company Checklist Sections](#company-checklist-sections) - versions 1.0
- [Company Checklist Template Sections](#company-checklist-template-sections) - versions 1.0
- [Company Checklist Templates](#company-checklist-templates) - versions 1.0
- [Company Inspection Template Item Evidence Configurations](#company-inspection-template-item-evidence-configurations) - versions 2.0
- [Company Inspection Template Item References](#company-inspection-template-item-references) - versions 1.0
- [Company Inspection Template Items](#company-inspection-template-items) - versions 1.0
- [Inspection Item Attachments](#inspection-item-attachments) - versions 1.0
- [Inspection Item Comments](#inspection-item-comments) - versions 1.0
- [Inspection Item Evidence Configurations](#inspection-item-evidence-configurations) - versions 2.0
- [Inspection Item References](#inspection-item-references) - versions 1.0
- [Inspection Item Signature Requests](#inspection-item-signature-requests) - versions 2.0
- [Inspection Item Signatures](#inspection-item-signatures) - versions 2.0
- [Inspection Reinspections](#inspection-reinspections) - versions 2.0
- [Inspection Types](#inspection-types) - versions 1.0
- [Inspection Users](#inspection-users) - versions 1.1
- [Item Response Set Responses](#item-response-set-responses) - versions 1.0
- [Item Response Sets](#item-response-sets) - versions 1.0
- [Possible Inspectors](#possible-inspectors) - versions 1.0
- [Potential Points of Contact](#potential-points-of-contact) - versions 1.0
- [Project Checklist Templates](#project-checklist-templates) - versions 1.1, 1.0
- [Project Inspection Template Item Evidence Configurations](#project-inspection-template-item-evidence-configurations) - versions 2.0
- [Project Inspection Template Item References](#project-inspection-template-item-references) - versions 1.0
- [Responses](#responses) - versions 1.0

## Alternative Response Sets

Resource id: `alternative-response-sets`. Raw spec: `../openapi-raw/alternative-response-sets.json`. Web: https://developers.procore.com/reference/rest/alternative-response-sets?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/checklist/alternative_response_sets

**List Alternative Response Sets**
Lists Alternative Response Sets for a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `id`: integer - Alternative Response Set ID e.g. `1`
- `conforming_response`: string - Term to represent a conforming status on an item, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Safe`
- `deficient_response`: string - Term to represent a deficient status on an item, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `At Risk`
- `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/checklist/alternative_response_sets/{id}

**Show Alternative Response Set**
Returns a specified Alternative Response Set. The set includes alternative terms to represent conforming and deficient item responses, e.g. "Safe" instead of "Pass" for an item with an internal status of "yes". The global attribute indicates whether a response set has been provided by Procore.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Alternative Response Set ID
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - Alternative Response Set ID e.g. `1`
- `conforming_response`: string - Term to represent a conforming status on an item, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Safe`
- `deficient_response`: string - Term to represent a deficient status on an item, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `At Risk`
- `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Checklist Attachments

Resource id: `checklist-attachments`. Raw spec: `../openapi-raw/checklist-attachments.json`. Web: https://developers.procore.com/reference/rest/checklist-attachments?version=latest
Product lines: Total Quality and Safety Management

### POST /rest/v1.0/projects/{project_id}/checklist/lists/{list_id}/attachments

**Create Attachment**
Creates an attachment for the specified Checklist (Inspection).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `list_id` [path] integer (required) - Checklist (Inspection) ID

Request body (application/json) (required):

- `attachment`: object (required)
  - `upload_id`: string (required) - Upload ID e.g. `01JE72344JZKJD6KWEKSVBEKCD`

Response 201 (application/json): object

- `id`: integer - ID e.g. `5324`
- `url`: string - URL e.g. `http://www.example.com/`
- `thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `name`: string - Filename e.g. `january_receipt_copy.jpg`
- `filename`: string - Filename (deprecated) e.g. `january_receipt_copy.jpg`
- `content_type`: string e.g. `application/pdf`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/checklist/lists/{list_id}/attachments/{id}

**Delete Attachment**
Deletes the specified Attachment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `list_id` [path] integer (required) - Checklist (Inspection) ID
- `id` [path] integer (required) - Attachment ID

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Checklist Comments

Resource id: `checklist-comments`. Raw spec: `../openapi-raw/checklist-comments.json`. Web: https://developers.procore.com/reference/rest/checklist-comments?version=latest
Product lines: Total Quality and Safety Management

### POST /rest/v1.0/checklist/lists/{list_id}/comments

**Create Checklist Comment**
Creates Checklist Comment in a specified Checklist

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `list_id` [path] integer (required) - Checklist ID

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project
- `item_id`: integer (required) - The ID of the Item
- `comment`: object (required) - Comment object
  - `body`: string (required) - The text Body of the Comment

Response 201 (application/json): object

- `id`: integer - ID e.g. `1137`
- `body`: string - Comment body e.g. `There is more paint splatter on the top of the window frame.`
- `item_id`: integer - Checklist Item ID e.g. `8637`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2021-08-20T23:36:30Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `company_name`: string - User Company name e.g. `Builders Inc.`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/checklist/lists/{list_id}/comments/{id}

**Show Checklist Comment**
Retrieves Checklist Comment in a specified Checklist.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `list_id` [path] integer (required) - Checklist ID
- `id` [path] integer (required) - Comment ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `1137`
- `body`: string - Comment body e.g. `There is more paint splatter on the top of the window frame.`
- `item_id`: integer - Checklist Item ID e.g. `8637`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2021-08-20T23:36:30Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `company_name`: string - User Company name e.g. `Builders Inc.`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/list_item_comments

**List Checklist (Inspection) Comments**
Returns the Checklist Comments from Checklists (Inspections) on the Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[item_id]` [query] array of integer - Array of Checklist Item IDs. Return item(s) associated with the specified Checklist Item IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[created_at]

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `1137`
- `body`: string - Comment body e.g. `There is more paint splatter on the top of the window frame.`
- `item_id`: integer - Checklist Item ID e.g. `8637`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2021-08-20T23:36:30Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `company_name`: string - User Company name e.g. `Builders Inc.`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/checklist/list_item_comments

**List Recycled Checklist (Inspection) Comments**
Returns the Checklist Comments from recycled Checklists (Inspections) on the Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[item_id]` [query] array of integer - Array of Checklist Item IDs. Return item(s) associated with the specified Checklist Item IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[created_at]

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `1137`
- `body`: string - Comment body e.g. `There is more paint splatter on the top of the window frame.`
- `item_id`: integer - Checklist Item ID e.g. `8637`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2021-08-20T23:36:30Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `company_name`: string - User Company name e.g. `Builders Inc.`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Checklist Default Distribution

Resource id: `checklist-default-distribution`. Raw spec: `../openapi-raw/checklist-default-distribution.json`. Web: https://developers.procore.com/reference/rest/checklist-default-distribution?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/checklist/default_distribution

**List Default Distribution Members**
Returns a collection of Users that are on the Inspections Default Distribution list. x-deprecated-at: 1644250224 deprecated: true

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `vendor_id` [query] integer - Vendor ID

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `160586`
- `login`: string - Email e.g. `carl.contractor@example.com`
- `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Checklist Item Attachments

Resource id: `checklist-item-attachments`. Raw spec: `../openapi-raw/checklist-item-attachments.json`. Web: https://developers.procore.com/reference/rest/checklist-item-attachments?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/checklist/list_item_attachments

**List Checklist (Inspections) Item Attachments**
Lists Checklist (Inspections) Item Attachments in a specified Project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[item_id]` [query] array of integer - Array of Checklist Item IDs. Return item(s) associated with the specified Checklist Item IDs.

Response 200 (application/json): array of object

- `id`: integer - Attachment ID e.g. `6485`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `company_name`: string - User Company name e.g. `Builders Inc.`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachment`: object
  - `id`: integer - ID e.g. `5324`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `thumbnail_url`: string - Thumbnail URL e.g. `http://www.example.com/`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
  - `attached_to_item_id`: integer - Attached to item ID e.g. `323`
  - `attached_to_item_type`: string - Attached to item type e.g. `Image`
  - `viewer_url`: string - Unified viewer link e.g. `/webclients/host/companies/1/projects/1/tools/document-viewer/document-viewer...`
- `item_id`: integer - Checklist Item ID e.g. `303`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/checklist/list_item_attachments/bulk_create

**Bulk Create Checklist (Inspections) Item Attachments**
Uploads Attachments to the specified Checklist Item for a given Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `item_id`: integer (required) - The ID of the Checklist Item
- `prostore_file_ids`: array of integer (required) - An array of Prostore Files to link to the Checklist Item

Response 201 (application/json): array of object

- `id`: integer - Attachment ID e.g. `6485`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `company_name`: string - User Company name e.g. `Builders Inc.`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachment`: object
  - `id`: integer - ID e.g. `5324`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `thumbnail_url`: string - Thumbnail URL e.g. `http://www.example.com/`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
  - `attached_to_item_id`: integer - Attached to item ID e.g. `323`
  - `attached_to_item_type`: string - Attached to item type e.g. `Image`
  - `viewer_url`: string - Unified viewer link e.g. `/webclients/host/companies/1/projects/1/tools/document-viewer/document-viewer...`
- `item_id`: integer - Checklist Item ID e.g. `303`

Error responses: 400, 401, 403, 404, 409, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/checklist/list_item_attachments/{id}

**Delete Checklist (Inspections) Item Attachment**
Removes the Attachment for a specified Checklist Item on a given Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Item ID

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 409, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/checklist/list_item_attachments

**List Recycled Checklist (Inspections) Item Attachments**
Lists Checklist (Inspections) Item Attachments from deleted inspections in a specified Project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[item_id]` [query] array of integer - Array of Checklist Item IDs. Return item(s) associated with the specified Checklist Item IDs.

Response 200 (application/json): array of object

- `id`: integer - Attachment ID e.g. `6485`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `company_name`: string - User Company name e.g. `Builders Inc.`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachment`: object
  - `id`: integer - ID e.g. `5324`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `thumbnail_url`: string - Thumbnail URL e.g. `http://www.example.com/`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
  - `attached_to_item_id`: integer - Attached to item ID e.g. `323`
  - `attached_to_item_type`: string - Attached to item type e.g. `Image`
  - `viewer_url`: string - Unified viewer link e.g. `/webclients/host/companies/1/projects/1/tools/document-viewer/document-viewer...`
- `item_id`: integer - Checklist Item ID e.g. `303`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Checklist Item Observations

Resource id: `checklist-item-observations`. Raw spec: `../openapi-raw/checklist-item-observations.json`. Web: https://developers.procore.com/reference/rest/checklist-item-observations?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/checklist/list_item_observations

**List Checklist Item Observations**
Returns the Observations from Checklist (Inspection) Items on the Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[item_id]` [query] array of integer - Array of Checklist Item IDs. Return item(s) associated with the specified Checklist Item IDs.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[created_at]

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `1`
- `checklist_item_id`: integer - Checklist Item ID e.g. `1`
- `checklist_list_id`: integer - Checklist List ID e.g. `5`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2017-10-31T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2017-10-31T23:36:30Z`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
  - `company_name`: string - User Company name. If the user belongs to a vendor, the vendor name will be returned. e.g. `Builders Inc.`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Checklist Item Types

Resource id: `checklist-item-types`. Raw spec: `../openapi-raw/checklist-item-types.json`. Web: https://developers.procore.com/reference/rest/checklist-item-types?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/checklist/item_types

**List Available Checklist Item Types**
Lists available Checklist Item Types
NOTE: Though both query parameters are marked as required below, only one of the two needs to be passed in (i.e., if you pass in a project_id then you do not need to also pass in a company_id, and vice versa).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `1`
- `category`: string - The category of the Item Type e.g. `multiple_choice`
- `name`: string - The name of the Item Type e.g. `default`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/checklist/item_types/{id}

**Show Checklist Item Type**
Retrieves specific Checklist Item Type
NOTE: Though both query parameters are marked as required below, only one of the two needs to be passed in (i.e., if you pass in a project_id then you do not need to also pass in a company_id, and vice versa).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Item Type ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `1`
- `category`: string - The category of the Item Type e.g. `multiple_choice`
- `name`: string - The name of the Item Type e.g. `default`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Checklist Items

Resource id: `checklist-items`. Raw spec: `../openapi-raw/checklist-items.json`. Web: https://developers.procore.com/reference/rest/checklist-items?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.1/projects/{project_id}/checklist/list_items

**List Checklist (Inspections) Items**
Lists Checklist (Inspections) Items in a specified Project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[section_id]` [query] array of integer - Return item(s) with the specified Checklist Section IDs
- `filters[list_id]` [query] array of integer - Return item(s) with the specified Checklist List IDs

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `2`
- `details`: string - Details e.g. `+/- 1 degrees`
- `company_template_item_details`: string - Details from the company template item e.g. `+/- 1 degrees`
- `item_response`: object - Item Response
  - `item_id`: integer - Item ID e.g. `4323`
  - `item_type`: object
    - `id`: integer - ID e.g. `1`
    - `category`: string - The category of the Item Type e.g. `multiple_choice`
    - `name`: string - The name of the Item Type e.g. `default`
  - `payload`: object
    - `text_value`: string - Response for an Open Ended Text Item e.g. `Supplies arrived at 10:00 AM`
    - `number_value`: integer - Response for an Open Ended Number Item e.g. `4232`
    - `date_value`: string(date) - Response for an Open Ended Date Item e.g. `2019-01-20`
    - `response_option`: object
  - `responded_at`: string(date-time) - Timestamp indicating when Response was added e.g. `2018-10-23T21:39:40Z`
  - `responder`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `exampleuser@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `status`: string - Item Status e.g. `conforming`
- `list_id`: integer - List ID e.g. `1`
- `name`: string - Name e.g. `Item 1`
- `position`: integer - Position e.g. `1`
- `number`: string - Number e.g. `1.1`
- `relative_position`: integer - Relative Position e.g. `1`
- `parent_item_id`: integer - Parent Inspection Item ID e.g. `34`
- `responded_with`: string - Representation of an Item's Response e.g. `Safe - Knowledge`
- `response`: object
  - `id`: integer - ID e.g. `1`
  - `name`: string - The name of the Response e.g. `Safe - Knowledge`
  - `corresponding_status`: string enum[yes, no, n/a, none] - Corresponding Checklist Item status e.g. `yes`
- `response_set`: object
  - `id`: integer - ID e.g. `1`
  - `name`: string - The name of the Item Response Set e.g. `Safety Responses`
  - `active`: boolean - Indicates whether an Item Response Set is available for use. e.g. `true`
  - `created_at`: string(date-time) - Represents when an Item Response Set was created e.g. `2012-10-02T21:00:00Z`
  - `updated_at`: string(date-time) - Represents when a Item Response Set was last updated e.g. `2012-10-02T21:00:00Z`
  - `responses`: array of object - Responses
    - `id`: integer - ID e.g. `1`
    - `name`: string - The name of the Response e.g. `Safe - Knowledge`
    - `status`: string enum[conforming, non_conforming, not_applicable] - Checklist Item status e.g. `non_conforming`
    - `item_status_id`: integer - Checklist Item Status ID e.g. `1`
  - `deletable`: boolean - Indicates whether a Response Set is deletable. e.g. `true`
  - `procore_standard`: boolean - Indicates whether a Response Set is a Procore standard set. e.g. `false`
- `section_id`: integer - Checklist Section ID e.g. `21`
- `status`: string enum[yes, no, n/a, none] - Status e.g. `yes`
- `template_item_id`: integer - Template Item ID e.g. `3`
- `type`: object
  - `id`: integer - ID e.g. `1`
  - `category`: string - The category of the Item Type e.g. `multiple_choice`
  - `name`: string - The name of the Item Type e.g. `default`
- `display_conditions`: array of object - Display Conditions
  - `id`: integer - ID e.g. `1`
  - `child_item_id`: integer - Child Inspection Item ID e.g. `34`
  - `status_ids`: array of integer - Status IDs
  - `response_option_ids`: array of integer - Response Option IDs
  - `created_at`: string(date-time) - Represents when the Item Display Condition was created e.g. `2024-10-02T21:00:00Z`
  - `updated_at`: string(date-time) - Represents when the Item Display Condition was last updated e.g. `2024-10-02T21:00:00Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2012-10-23T21:39:40Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/checklist/lists/{list_id}/items/{item_id}/item_attachments

**Create Checklist Item Attachment**
Uploads an Attachment to the specified Checklist Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `list_id` [path] integer (required) - Checklist ID
- `item_id` [path] integer (required) - Checklist Item ID

Request body (multipart/form-data) (required):

- `project_id`: integer (required) - The ID of the Project the Item belongs to
- `section_id`: integer (required) - The ID of the Section the Item belongs to
- `attachment`: string(binary) - Item Attachment. To upload an attachment you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with the `attachment` file.
- `document_management_document_revision_id`: string - PDM document revision ID to attach to the Checklist Item.

Response 200 (application/json): object

- `id`: integer - Attachment ID e.g. `6485`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `company_name`: string - User Company name e.g. `Builders Inc.`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachment`: object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `name`: string - Name e.g. `january_receipt_copy.jpg`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/checklist/lists/{list_id}/items/{id}

**Show Checklist Item**
Retrieves Checklist Item in a specified Checklist

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `list_id` [path] integer (required) - Checklist ID
- `id` [path] integer (required) - Item ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `section_id` [query] integer (required) - Checklist Section ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `2`
- `name`: string - Name e.g. `Item 1`
- `details`: string - Details e.g. `+/- 1 degrees`
- `status`: string enum[yes, no, n/a, none] - Status e.g. `yes`
- `responded_with`: string - Representation of an Item's Response e.g. `Safe - Knowledge`
- `origin_id`: integer - ID of Corresponding Checklist Template Item e.g. `1`
- `section_id`: integer - Checklist Section ID e.g. `21`
- `position`: integer - Position e.g. `1`
- `observations`: array of object - Observations created from the Checklist Item
  - `id`: integer - ID e.g. `2085`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
  - `number`: string - Number e.g. `56`
  - `status`: string - Status e.g. `initiated`
  - `title`: string - Title e.g. `Clean up paint splatter`
  - `type`: object - Observation Type
    - `id`: integer - ID e.g. `4952`
    - `name`: string - Name e.g. `Deficiency`
  - `assignee`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `exampleuser@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `exampleuser@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `attachment_histories`: array of object - Item attachment histories
  - `id`: integer - Attachment ID e.g. `6485`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `exampleuser@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `attachments`: array of object - Item attachments
  - `id`: integer - Attachment ID e.g. `34`
  - `url`: string - Attachment URL e.g. `http://www.example.com/test.pdf`
  - `filename`: string - Attachment filename e.g. `test.pdf`
- `histories`: array of object - Item histories
  - `id`: integer - ID
  - `body`: string - Text describing the status change e.g. `changed the status to yes`
  - `status`: string e.g. `yes`
  - `responded_with`: string - Name of Response at time of inspection e.g. `Safe - Knowledge`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `exampleuser@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `item_response`: object - Item Response
  - `item_id`: integer - Item ID e.g. `4323`
  - `status`: string - Item Status e.g. `conforming`
  - `responded_at`: string(date-time) - Timestamp indicating when Response was added e.g. `2018-10-23T21:39:40Z`
  - `responder`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `exampleuser@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `item_type`: object
    - `id`: integer - ID e.g. `1`
    - `category`: string - The category of the Item Type e.g. `multiple_choice`
    - `name`: string - The name of the Item Type e.g. `default`
  - `payload`: object
    - `text_value`: string - Response for an Open Ended Text Item e.g. `Supplies arrived at 10:00 AM`
    - `number_value`: integer - Response for an Open Ended Number Item e.g. `4232`
    - `date_value`: string(date) - Response for an Open Ended Date Item e.g. `2019-01-20`
    - `response_option`: object
- `comments`: array of object - Item comments
  - `id`: integer - ID e.g. `4798`
  - `body`: string - Comment body e.g. `Paint splatter is also on the top panel of the frame.`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `exampleuser@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `response`: object
  - `id`: integer - ID e.g. `1`
  - `name`: string - The name of the Response e.g. `Safe - Knowledge`
  - `corresponding_status`: string enum[yes, no, n/a, none] - Corresponding Checklist Item status e.g. `yes`
- `response_set`: object
  - `id`: integer - ID of the response set e.g. `83`
  - `name`: string - Name of the response set e.g. `Safety Responses`
  - `responses`: array of object
    - `id`: integer - ID e.g. `1`
    - `name`: string - The name of the Response e.g. `Safe - Knowledge`
    - `corresponding_status`: string enum[yes, no, n/a, none] - Corresponding Checklist Item status e.g. `yes`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2012-10-23T21:39:40Z`
- `response_set_id`: integer - Response Set ID e.g. `9`
- `type`: object
  - `id`: integer - ID e.g. `1`
  - `category`: string - The category of the Item Type e.g. `multiple_choice`
  - `name`: string - The name of the Item Type e.g. `default`
- `template_item_id`: integer - Template Item ID e.g. `3`
- `response_type_id`: integer - Response Type ID e.g. `3`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2012-10-23T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/checklist/lists/{list_id}/items/{id}  **[DEPRECATED]**

**Update Checklist Item**
Updates Checklist Item in a specified Checklist

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `list_id` [path] integer (required) - Checklist ID
- `id` [path] integer (required) - Item ID

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the Item belongs to
- `section_id`: integer (required) - The ID of the Section the Item belongs to
- `item`: object (required) - Item object
  - `name`: string - The Name of the Item
  - `position`: integer - The Position of the Item
  - `status`: string enum[yes, no, n/a, none] - The Status of the item e.g. `yes`
  - `response_id`: integer - ID of the response if using multiple response sets, otherwise null e.g. `5`
  - `item_attachments_attributes`: array of object - An array of the Item's Attachments attributes
    - `prostore_file_id`: integer - Attachment prostore file id
    - `created_by_id`: integer - Attachment created by id
    - `item_id`: integer - Attachment item id
    - `from_mobile`: boolean - Attachment from mobile status
- `attachments`: array of string - Item's Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 200 (application/json): object

- `id`: integer - ID e.g. `2`
- `name`: string - Name e.g. `Item 1`
- `details`: string - Details e.g. `+/- 1 degrees`
- `status`: string enum[yes, no, n/a, none] - Status e.g. `yes`
- `responded_with`: string - Representation of an Item's Response e.g. `Safe - Knowledge`
- `origin_id`: integer - ID of Corresponding Checklist Template Item e.g. `1`
- `section_id`: integer - Checklist Section ID e.g. `21`
- `position`: integer - Position e.g. `1`
- `observations`: array of object - Observations created from the Checklist Item
  - `id`: integer - ID e.g. `2085`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
  - `number`: string - Number e.g. `56`
  - `status`: string - Status e.g. `initiated`
  - `title`: string - Title e.g. `Clean up paint splatter`
  - `type`: object - Observation Type
    - `id`: integer - ID e.g. `4952`
    - `name`: string - Name e.g. `Deficiency`
  - `assignee`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `exampleuser@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `exampleuser@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `attachment_histories`: array of object - Item attachment histories
  - `id`: integer - Attachment ID e.g. `6485`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `exampleuser@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `attachments`: array of object - Item attachments
  - `id`: integer - Attachment ID e.g. `34`
  - `url`: string - Attachment URL e.g. `http://www.example.com/test.pdf`
  - `filename`: string - Attachment filename e.g. `test.pdf`
- `histories`: array of object - Item histories
  - `id`: integer - ID
  - `body`: string - Text describing the status change e.g. `changed the status to yes`
  - `status`: string e.g. `yes`
  - `responded_with`: string - Name of Response at time of inspection e.g. `Safe - Knowledge`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `exampleuser@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `item_response`: object - Item Response
  - `item_id`: integer - Item ID e.g. `4323`
  - `status`: string - Item Status e.g. `conforming`
  - `responded_at`: string(date-time) - Timestamp indicating when Response was added e.g. `2018-10-23T21:39:40Z`
  - `responder`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `exampleuser@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `item_type`: object
    - `id`: integer - ID e.g. `1`
    - `category`: string - The category of the Item Type e.g. `multiple_choice`
    - `name`: string - The name of the Item Type e.g. `default`
  - `payload`: object
    - `text_value`: string - Response for an Open Ended Text Item e.g. `Supplies arrived at 10:00 AM`
    - `number_value`: integer - Response for an Open Ended Number Item e.g. `4232`
    - `date_value`: string(date) - Response for an Open Ended Date Item e.g. `2019-01-20`
    - `response_option`: object
- `comments`: array of object - Item comments
  - `id`: integer - ID e.g. `4798`
  - `body`: string - Comment body e.g. `Paint splatter is also on the top panel of the frame.`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `exampleuser@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `response`: object
  - `id`: integer - ID e.g. `1`
  - `name`: string - The name of the Response e.g. `Safe - Knowledge`
  - `corresponding_status`: string enum[yes, no, n/a, none] - Corresponding Checklist Item status e.g. `yes`
- `response_set`: object
  - `id`: integer - ID of the response set e.g. `83`
  - `name`: string - Name of the response set e.g. `Safety Responses`
  - `responses`: array of object
    - `id`: integer - ID e.g. `1`
    - `name`: string - The name of the Response e.g. `Safe - Knowledge`
    - `corresponding_status`: string enum[yes, no, n/a, none] - Corresponding Checklist Item status e.g. `yes`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2012-10-23T21:39:40Z`
- `response_set_id`: integer - Response Set ID e.g. `9`
- `type`: object
  - `id`: integer - ID e.g. `1`
  - `category`: string - The category of the Item Type e.g. `multiple_choice`
  - `name`: string - The name of the Item Type e.g. `default`
- `template_item_id`: integer - Template Item ID e.g. `3`
- `response_type_id`: integer - Response Type ID e.g. `3`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2012-10-23T21:39:40Z`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/items/{item_id}/item_response

**Show Checklist Item Response**
Returns the Checklist Item Response for a specified Checklist Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `item_id` [path] integer (required) - Checklist Item ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `item_id`: integer - Item ID e.g. `4323`
- `status`: string - Item Status. Possible values are 'conforming', 'non_conforming', and 'not_applicable'. e.g. `conforming`
- `responded_at`: string(date-time) - Timestamp indicating when Response was added e.g. `2018-10-23T21:39:40Z`
- `responder`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
- `item_type`: object
  - `id`: integer - ID e.g. `1`
  - `category`: string - The category of the Item Type e.g. `multiple_choice`
  - `name`: string - The name of the Item Type e.g. `default`
- `payload`: object
  - `text_value`: string - Response for an Open Ended Text Item e.g. `Supplies arrived at 10:00 AM`
  - `number_value`: integer - Response for an Open Ended Number Item e.g. `4232`
  - `date_value`: string(date) - Response for an Open Ended Date Item e.g. `2019-01-20`
  - `response_option`: object
    - `id`: integer - Response Option ID e.g. `3432`
    - `name`: string - Response Option Name e.g. `Safe`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/checklist/items/{item_id}/item_response

**Create Checklist Item Response**
Create Checklist Item Response for a specified Checklist Item
Checklist Item Response can have one of the following payload formats (text_value, number_value, date_value, response_option, status)
A specific Item Type can only leverage its corresponding format.
*For instance, Number Items can only leverage a number_value while Date Items can only leverage a date_value.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `item_id` [path] integer (required) - Checklist Item ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `item_response`: object (required) - Item Response object
  - `status`: string - Item Status - Value for Default-Typed items. Allowed values are 'conforming', 'non_conforming', and 'not_applicable'. e.g. `not_applicable`
  - `response_option_id`: integer - Response Option ID - Value for Multiple Choice Response Items e.g. `546`
  - `text_value`: string - Text Response - Value for Open Ended Text Items e.g. `Supplies arrived at 10:00 AM`
  - `number_value`: integer - Number Response - Value for Open Ended Number Items e.g. `7.54`
  - `date_value`: string(date) - Date Response - Value for Open Ended Date Items. Format should be YYYY-MM-DD e.g. `2019-04-21`

Response 201 (application/json): object

- `item_id`: integer - Item ID e.g. `4323`
- `status`: string - Item Status. Possible values are 'conforming', 'non_conforming', and 'not_applicable'. e.g. `conforming`
- `responded_at`: string(date-time) - Timestamp indicating when Response was added e.g. `2018-10-23T21:39:40Z`
- `responder`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
- `item_type`: object
  - `id`: integer - ID e.g. `1`
  - `category`: string - The category of the Item Type e.g. `multiple_choice`
  - `name`: string - The name of the Item Type e.g. `default`
- `payload`: object
  - `text_value`: string - Response for an Open Ended Text Item e.g. `Supplies arrived at 10:00 AM`
  - `number_value`: integer - Response for an Open Ended Number Item e.g. `4232`
  - `date_value`: string(date) - Response for an Open Ended Date Item e.g. `2019-01-20`
  - `response_option`: object
    - `id`: integer - Response Option ID e.g. `3432`
    - `name`: string - Response Option Name e.g. `Safe`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/checklist/items/{item_id}/item_response

**Delete Checklist Item Response**
Removes the Checklist Item Response for a specified Checklist Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `item_id` [path] integer (required) - Checklist Item ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/list_items  **[OLDER VERSION - a newer path version exists below/above]**

**List Checklist (Inspections) Items**
Lists Checklist (Inspections) Items in a specified Project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[section_id]` [query] array of integer - Return item(s) with the specified Checklist Section IDs
- `filters[list_id]` [query] array of integer - Return item(s) with the specified Checklist List IDs
- `filters[item_response_status]` [query] string enum[conforming, non_conforming, neutral, not_applicable, null] - Filter item(s) with matching item_response status.
- `sort` [query] string enum[position_by_section] - Sort item(s) by the chosen param; check below for a list of options. The direction of sorting is ascending by default; for descending sort, insert the - symbol before the param.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `2`
- `details`: string - Details e.g. `+/- 1 degrees`
- `item_response`: object - Item Response
  - `item_id`: integer - Item ID e.g. `4323`
  - `item_type`: object
    - `id`: integer - ID e.g. `1`
    - `category`: string - The category of the Item Type e.g. `multiple_choice`
    - `name`: string - The name of the Item Type e.g. `default`
  - `payload`: object
    - `text_value`: string - Response for an Open Ended Text Item e.g. `Supplies arrived at 10:00 AM`
    - `number_value`: integer - Response for an Open Ended Number Item e.g. `4232`
    - `date_value`: string(date) - Response for an Open Ended Date Item e.g. `2019-01-20`
    - `response_option`: object
  - `responded_at`: string(date-time) - Timestamp indicating when Response was added e.g. `2018-10-23T21:39:40Z`
  - `responder`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `exampleuser@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `status`: string - Item Status e.g. `conforming`
- `list_id`: integer - List ID e.g. `1`
- `name`: string - Name e.g. `Item 1`
- `position`: integer - Position e.g. `1`
- `responded_with`: string - Representation of an Item's Response e.g. `Safe - Knowledge`
- `response`: object
  - `id`: integer - ID e.g. `1`
  - `name`: string - The name of the Response e.g. `Safe - Knowledge`
  - `corresponding_status`: string enum[yes, no, n/a, none] - Corresponding Checklist Item status e.g. `yes`
- `response_set`: object
  - `id`: integer - ID of the response set e.g. `83`
  - `name`: string - Name of the response set e.g. `Safety Responses`
  - `responses`: array of object
    - `id`: integer - ID e.g. `1`
    - `name`: string - The name of the Response e.g. `Safe - Knowledge`
    - `corresponding_status`: string enum[yes, no, n/a, none] - Corresponding Checklist Item status e.g. `yes`
    - `item_status_id`: integer - Checklist Item Status ID e.g. `1`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2012-10-23T21:39:40Z`
- `response_type_id`: integer - Response Type ID e.g. `9`
- `section_id`: integer - Checklist Section ID e.g. `21`
- `status`: string enum[yes, no, n/a, none] - Status e.g. `yes`
- `template_item_id`: integer - Template Item ID e.g. `3`
- `type`: object
  - `id`: integer - ID e.g. `1`
  - `category`: string - The category of the Item Type e.g. `multiple_choice`
  - `name`: string - The name of the Item Type e.g. `default`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2012-10-23T21:39:40Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Checklist List Filter Options

Resource id: `checklist-list-filter-options`. Raw spec: `../openapi-raw/checklist-list-filter-options.json`. Web: https://developers.procore.com/reference/rest/checklist-list-filter-options?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/inspections/inspectors

**List Checklist List Inspector Filter Options**
Returns inspectors associated to inspections with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter inspectors by name or company
- `filters[inspection_type_grouping]` [query] string enum[quality, safety] - Filter by inspection type grouping
- `view` [query] string enum[recycle_bin] - Set to 'recycle_bin' to return filter options from deleted inspections

Response 200 (application/json): object

- `data`: array of object - List of available user filter options
  - `id`: string (required) - The unique identifier of the user e.g. `101`
  - `login`: string (required) - The email address of the user e.g. `carl.contractor@example.com`
  - `name`: string - The display name of the user e.g. `Carl Contractor`
  - `company_name`: string - The company name associated with the user e.g. `Carl's Construction`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/inspections/points_of_contact

**List Checklist List Point of Contact Filter Options**
Returns points of contact associated to inspections with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter points of contact by name or company
- `filters[inspection_type_grouping]` [query] string enum[quality, safety] - Filter by inspection type grouping
- `view` [query] string enum[recycle_bin] - Set to 'recycle_bin' to return filter options from deleted inspections

Response 200 (application/json): object

- `data`: array of object - List of available user filter options
  - `id`: string (required) - The unique identifier of the user e.g. `101`
  - `login`: string (required) - The email address of the user e.g. `carl.contractor@example.com`
  - `name`: string - The display name of the user e.g. `Carl Contractor`
  - `company_name`: string - The company name associated with the user e.g. `Carl's Construction`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/inspections/responsible_contractors

**List Checklist List Responsible Contractor Filter Options**
Returns responsible contractors associated to inspections with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter responsible contractors by name
- `filters[inspection_type_grouping]` [query] string enum[quality, safety] - Filter by inspection type grouping
- `view` [query] string enum[recycle_bin] - Set to 'recycle_bin' to return filter options from deleted inspections

Response 200 (application/json): object

- `data`: array of object - List of available filter options
  - `key`: string (required) - The unique identifier of the option e.g. `54`
  - `value`: string (required) - The display label for the option e.g. `John Doe`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/inspections/closed_by_contacts

**List Checklist List Closed By Contact Filter Options**
Returns contacts that have closed inspections with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter closed by contacts by name or company
- `filters[inspection_type_grouping]` [query] string enum[quality, safety] - Filter by inspection type grouping
- `view` [query] string enum[recycle_bin] - Set to 'recycle_bin' to return filter options from deleted inspections

Response 200 (application/json): object

- `data`: array of object - List of available user filter options
  - `id`: string (required) - The unique identifier of the user e.g. `101`
  - `login`: string (required) - The email address of the user e.g. `carl.contractor@example.com`
  - `name`: string - The display name of the user e.g. `Carl Contractor`
  - `company_name`: string - The company name associated with the user e.g. `Carl's Construction`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/inspections/created_by_contacts

**List Checklist List Created By Contact Filter Options**
Returns contacts that have created inspections in the project with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter created by contacts by name or company
- `filters[inspection_type_grouping]` [query] string enum[quality, safety] - Filter by inspection type grouping
- `view` [query] string enum[recycle_bin] - Set to 'recycle_bin' to return filter options from deleted inspections

Response 200 (application/json): object

- `data`: array of object - List of available user filter options
  - `id`: string (required) - The unique identifier of the user e.g. `101`
  - `login`: string (required) - The email address of the user e.g. `carl.contractor@example.com`
  - `name`: string - The display name of the user e.g. `Carl Contractor`
  - `company_name`: string - The company name associated with the user e.g. `Carl's Construction`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/inspections/trades

**List Checklist List Trade Filter Options**
Returns trades associated to inspections with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter trades by name
- `filters[inspection_type_grouping]` [query] string enum[quality, safety] - Filter by inspection type grouping
- `view` [query] string enum[recycle_bin] - Set to 'recycle_bin' to return filter options from deleted inspections

Response 200 (application/json): object

- `data`: array of object - List of available filter options
  - `key`: string (required) - The unique identifier of the option e.g. `54`
  - `value`: string (required) - The display label for the option e.g. `John Doe`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/inspections/spec_sections

**List Checklist List Specification Section Filter Options**
Returns specification sections associated to inspections with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter specification sections by number or description
- `filters[inspection_type_grouping]` [query] string enum[quality, safety] - Filter by inspection type grouping
- `view` [query] string enum[recycle_bin] - Set to 'recycle_bin' to return filter options from deleted inspections

Response 200 (application/json): object

- `data`: array of object - List of available filter options
  - `key`: string (required) - The unique identifier of the option e.g. `54`
  - `value`: string (required) - The display label for the option e.g. `John Doe`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/inspections/list_templates

**List Checklist List Template Filter Options**
Returns list templates associated to inspections with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter list templates by name
- `filters[inspection_type_grouping]` [query] string enum[quality, safety] - Filter by inspection type grouping
- `view` [query] string enum[recycle_bin] - Set to 'recycle_bin' to return filter options from deleted inspections

Response 200 (application/json): object

- `data`: array of object - List of available filter options
  - `key`: string (required) - The unique identifier of the option e.g. `54`
  - `value`: string (required) - The display label for the option e.g. `John Doe`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/inspections/locations

**List Checklist List Location Filter Options**
Returns locations associated to inspections with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter locations by full name
- `filters[inspection_type_grouping]` [query] string enum[quality, safety] - Filter by inspection type grouping
- `view` [query] string enum[recycle_bin] - Set to 'recycle_bin' to return filter options from deleted inspections

Response 200 (application/json): object

- `data`: array of object - List of available filter options
  - `key`: string (required) - The unique identifier of the option e.g. `54`
  - `value`: string (required) - The display label for the option e.g. `John Doe`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/inspections/types

**List Checklist List Type Filter Options**
Returns inspection types associated to inspections with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter inspection types by name
- `filters[inspection_type_grouping]` [query] string enum[quality, safety] - Filter by inspection type grouping
- `view` [query] string enum[recycle_bin] - Set to 'recycle_bin' to return filter options from deleted inspections

Response 200 (application/json): object

- `data`: array of object - List of available filter options
  - `key`: string (required) - The unique identifier of the option e.g. `54`
  - `value`: string (required) - The display label for the option e.g. `John Doe`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/lists/filter_options/asset_ids  **[BETA]**

**List Checklist List Asset Id Filter Options**
Returns the ids of the assets linked to inspections for filtering

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of string


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/lists/filter_options/assigned_companies

**List Checklist List Assigned Company Filter Options**
Returns companies assigned to inspections for filtering

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - ID of Checklist List filter object e.g. `54`
- `value`: string - Value of Checklist List filter object e.g. `Value`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/lists/filter_options/equipment  **[BETA]**

**List Checklist List Equipment Filter Options**
Returns equipment associated to inspections

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - ID of Checklist List filter object e.g. `54`
- `value`: string - Value of Checklist List filter object e.g. `Value`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/lists/filter_options/statuses

**List Checklist List Status Filter Options**
Returns possible statuses of an inspection

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - ID of Checklist List filter object e.g. `54`
- `value`: string - Value of Checklist List filter object e.g. `Value`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/lists/filter_options/types

**List Checklist List Inspection Type Filter Options**
Returns inspection types associated to inspections

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - ID of Checklist List filter object e.g. `54`
- `value`: string - Value of Checklist List filter object e.g. `Value`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/lists/filter_options/closed_by_contacts  **[OLDER VERSION - a newer path version exists below/above]**

**List Checklist List Closed By Contact Filter Options**
Returns contacts that have closed inspections

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - ID of Checklist List filter object e.g. `54`
- `value`: string - Value of Checklist List filter object e.g. `Value`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/lists/filter_options/created_by_contacts  **[OLDER VERSION - a newer path version exists below/above]**

**List Checklist List Created By Contact Filter Options**
Returns contacts that have created inspections for filtering

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - ID of Checklist List filter object e.g. `54`
- `value`: string - Value of Checklist List filter object e.g. `Value`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/lists/filter_options/inspectors  **[OLDER VERSION - a newer path version exists below/above]**

**List Checklist List Inspector Filter Options**
Returns inspectors associated to inspections

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - ID of Checklist List filter object e.g. `54`
- `value`: string - Value of Checklist List filter object e.g. `Value`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/lists/filter_options/list_templates  **[OLDER VERSION - a newer path version exists below/above]**

**List Checklist List Template Filter Options**
Returns list templates associated to inspections

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - ID of Checklist List filter object e.g. `54`
- `value`: string - Value of Checklist List filter object e.g. `Value`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/lists/filter_options/locations  **[OLDER VERSION - a newer path version exists below/above]**

**List Checklist List Location Filter Options**
Returns locations associated to inspections

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - ID of Checklist List filter object e.g. `54`
- `value`: string - Value of Checklist List filter object e.g. `Value`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/lists/filter_options/points_of_contact  **[OLDER VERSION - a newer path version exists below/above]**

**List Checklist List Point of Contact Filter Options**
Returns points of contact associated to inspections

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - ID of Checklist List filter object e.g. `54`
- `value`: string - Value of Checklist List filter object e.g. `Value`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/lists/filter_options/responsible_contractors  **[OLDER VERSION - a newer path version exists below/above]**

**List Checklist List Responsible Contractor Filter Options**
Returns responsible contractors associated to inspections

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - ID of Checklist List filter object e.g. `54`
- `value`: string - Value of Checklist List filter object e.g. `Value`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/lists/filter_options/spec_sections  **[OLDER VERSION - a newer path version exists below/above]**

**List Checklist List Specification Section Filter Options**
Returns specification sections associated to inspections

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - ID of Checklist List filter object e.g. `54`
- `value`: string - Value of Checklist List filter object e.g. `Value`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/lists/filter_options/trades  **[OLDER VERSION - a newer path version exists below/above]**

**List Checklist List Trade Filter Options**
Returns trades associated to inspections

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - ID of Checklist List filter object e.g. `54`
- `value`: string - Value of Checklist List filter object e.g. `Value`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Checklist Schedule Attachments

Resource id: `checklist-schedule-attachments`. Raw spec: `../openapi-raw/checklist-schedule-attachments.json`. Web: https://developers.procore.com/reference/rest/checklist-schedule-attachments?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/checklist/schedules/{schedule_id}/attachments

**List Checklist Schedule Attachments**
Lists Checklist Schedule Attachments for given Project and Schedule

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `schedule_id` [path] integer (required) - Checklist Schedule ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Attachment ID e.g. `6485`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
- `schedule_id`: integer - Checklist Schedule ID associated with attachment e.g. `6485`
- `attachment`: object
  - `id`: integer - File ID e.g. `1`
  - `name`: string - Base name of the file without its path e.g. `contract.pdf`
  - `content_type`: string - A mime type or a file extension e.g. `application/pdf`
  - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com`
  - `filename`: string - Base name of the file without its path e.g. `contract.pdf`
  - `viewable_document_id`: integer - Viewable document ID e.g. `323`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/checklist/schedules/{schedule_id}/attachments

**Create Checklist Schedule Attachment**
Uploads an Attachment to the specified Checklist Schedule

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `schedule_id` [path] integer (required) - Checklist Schedule ID

Request body (multipart/form-data) (required):

- `attachment`: string(binary) (required) - Checklist Schedule Attachment. To upload an attachment you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with the `attachment` file.

Response 200 (application/json): object

- `id`: integer - Attachment ID e.g. `6485`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
- `schedule_id`: integer - Checklist Schedule ID associated with attachment e.g. `6485`
- `attachment`: object
  - `id`: integer - File ID e.g. `1`
  - `name`: string - Base name of the file without its path e.g. `contract.pdf`
  - `content_type`: string - A mime type or a file extension e.g. `application/pdf`
  - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com`
  - `filename`: string - Base name of the file without its path e.g. `contract.pdf`
  - `viewable_document_id`: integer - Viewable document ID e.g. `323`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/checklist/schedules/{schedule_id}/attachments/{id}

**Delete Checklist Schedule Attachment**
Delete the attachment pertaining to the Checklist Schedule Attachment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `schedule_id` [path] integer (required) - Checklist Schedule ID
- `id` [path] integer (required) - Checklist Schedule Attachment ID

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Checklist Schedule Change Histories

Resource id: `checklist-schedule-change-histories`. Raw spec: `../openapi-raw/checklist-schedule-change-histories.json`. Web: https://developers.procore.com/reference/rest/checklist-schedule-change-histories?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/checklist/schedules/{schedule_id}/change_history

**List Checklist Schedule Change Histories**
Lists Checklist Schedule Change Histories for given Project and Schedule

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `schedule_id` [path] integer (required) - Checklist Schedule ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `101`
- `column`: string - Name of the column changed e.g. `name`
- `old_value`: string - Value of the column before change e.g. `The original title`
- `new_value`: string - Value of the column after change e.g. `The updated title`
- `created_by_id`: integer - The ID of the user e.g. `102`
- `created_at`: string(date-time) - Created date e.g. `2018-05-08T13:21:20Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Checklist Schedule Filter Options

Resource id: `checklist-schedule-filter-options`. Raw spec: `../openapi-raw/checklist-schedule-filter-options.json`. Web: https://developers.procore.com/reference/rest/checklist-schedule-filter-options?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/inspections/schedules/assignees

**List Checklist Schedule Assignee Filter Options**
Returns assignees of the checklist schedule with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter assignees by name or email
- `filters[inspection_type_grouping]` [query] string enum[quality, safety] - Filter by inspection type grouping

Response 200 (application/json): object

- `data`: array of object - List of available user filter options
  - `id`: string (required) - The unique identifier of the user e.g. `101`
  - `login`: string (required) - The email address of the user e.g. `carl.contractor@example.com`
  - `name`: string - The display name of the user e.g. `Carl Contractor`
  - `company_name`: string - The company name associated with the user e.g. `Carl's Construction`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/inspections/schedules/inspection_templates

**List Checklist Schedule Inspection Template Filter Options**
Returns inspection templates associated to inspection schedules with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter inspection templates by name
- `filters[inspection_type_grouping]` [query] string enum[quality, safety] - Filter by inspection type grouping

Response 200 (application/json): object

- `data`: array of object - List of available filter options
  - `key`: string (required) - The unique identifier of the option e.g. `54`
  - `value`: string (required) - The display label for the option e.g. `John Doe`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/inspections/schedules/types

**List Checklist Schedule Inspection Type Filter Options**
Returns inspection types associated to inspection schedules with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter inspection types by name
- `filters[inspection_type_grouping]` [query] string enum[quality, safety] - Filter by inspection type grouping

Response 200 (application/json): object

- `data`: array of object - List of available filter options
  - `key`: string (required) - The unique identifier of the option e.g. `54`
  - `value`: string (required) - The display label for the option e.g. `John Doe`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/schedules/filter_options/assignees

**Checklist Schedule Assignee Filter Options**
Returns assignees of the checklist schedule

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `id`: string - ID of Checklist List filter object e.g. `54`
- `label`: string - Value of Checklist List filter object e.g. `Value`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/schedules/filter_options/inspection_templates

**Checklist Schedule Inspection Template Filter Options**
Returns inspection templates associated to the inspections schedule

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `id`: string - ID of Checklist List filter object e.g. `54`
- `label`: string - Value of Checklist List filter object e.g. `Value`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/schedules/filter_options/locations

**Checklist Schedule Location Filter Options**
Returns locations associated to the inspection schedules

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `id`: string - ID of Checklist List filter object e.g. `54`
- `label`: string - Value of Checklist List filter object e.g. `Value`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/schedules/filter_options/types

**Checklist Schedule Inspection Type Filter Options**
Returns Inspection types associated to inspection schedules

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `id`: string - ID of Checklist List filter object e.g. `54`
- `label`: string - Value of Checklist List filter object e.g. `Value`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/schedules/filter_options/equipment  **[BETA]**

**Checklist Schedule Equipment Filter Options**
Returns equipment associated to inspection schedules

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `id`: string - ID of Checklist List filter object e.g. `01HZRNVP4XY9T49471H5SMDJ7Z`
- `label`: string - Value of Checklist List filter object e.g. `Value`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Checklist Schedules

Resource id: `checklist-schedules`. Raw spec: `../openapi-raw/checklist-schedules.json`. Web: https://developers.procore.com/reference/rest/checklist-schedules?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/checklist/schedules

**List Checklist (Inspection) Schedules**
Returns the Checklist Schedules from Checklists (Inspections) on the Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[inspection_type_id]` [query] array of integer - Return schedule(s) with the specified Checklist Type IDs
- `filters[frequency]` [query] array of string - Return schedule(s) with the specified Frequency Types
- `filters[location_id]` [query] array of integer - Return schedule(s) with the specified Location IDs
- `filters[list_template_id]` [query] array of integer - Return schedule(s) with the specified Inspection Template IDs
- `filters[assignee_id]` [query] array of integer - Return schedule(s) with the specified Assignee IDs
- `filters[first_inspection_due_at]` [query] array of string(date) - Return schedule(s) with the specified First Inspection Due Date
- `filters[ends_at]` [query] array of string(date) - Return schedule(s) with the specified Last Inspection Due Date.
- `filters[ended]` [query] boolean - Return schedule(s) that are finished when true, returns unfinished schedule(s) otherwise
- `filters[equipment_id]` [query] array of string - Return schedule(s) with the specified Equipment IDs
- `sort` [query] string enum[name, location_id, first_inspection_due_at, ends_at, frequency, inspections_created, inspection_template_name, inspection_type_name, location_name, inspection_type_then_name] - Sort schedule(s) by the chosen param; check below for a list of options. The direction of sorting is ascending by default; for descending sort, insert the - symbol before the param.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `21`
- `name`: string - Name e.g. `Framing`
- `first_inspection_due_at`: string(date-time) - Due at timestamp of first inspection
- `ends_at`: string(date-time) - Due at timestamp of last inspection e.g. `2012-10-23T21:39:40Z`
- `next_due_at`: string(date-time) - Due at timestamp of next inspection to be created e.g. `2012-10-23T21:39:40Z`
- `frequency`: string - Name e.g. `Weekly`
- `inspections_created`: integer - Number of inspections created e.g. `9`
- `total_inspections_scheduled`: integer - Total amount of inpections that will be created e.g. `50`
- `inspection_template`: object
  - `id`: integer - ID
  - `attachment_ids`: array of integer
  - `description`: string - Description
  - `inspection_type`: object - Inspection Type
    - `id`: integer - ID e.g. `1`
    - `name`: string - Name e.g. `Quality`
  - `name`: string - Name
  - `trade_id`: integer - Trade ID e.g. `56`
- `location_id`: integer - Location ID e.g. `3`
- `assignee_ids`: array of integer
- `point_of_contact_id`: integer - Point of contact ID e.g. `1`
- `responsible_contractor_id`: integer - ID of Vendor responsible for the work being inspected e.g. `1`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Timestamp of update e.g. `2012-10-23T21:39:40Z`
- `equipment_id`: string - Equipment ID e.g. `01J9BV3N9YQ34CDYA0G4J8R95R`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/checklist/schedules

**Create a Checklist (Inspection) Schedule**
Creates a Checklist Schedule from a Checklist (Inspection) Template on the Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `schedule`: object (required) - Checklist Schedule object
  - `name`: string - The name for the Checklist Schedule. e.g. `New Checklist Schedule`
  - `days_created_before_due_date`: integer - The number of days an Inspection is to be created before the due date e.g. `3`
  - `inspection_template_id`: integer - The ID of the Inspection Template to create the Schedule from. e.g. `23`
  - `first_inspection_due_at`: string(date-time) - Timestamp indicating when the first Inspection in the Schedule should be due. Cannot be in the past. e.g. `2021-09-23T11:34:27Z`
  - `ends_at`: string(date-time) - Timestamp indicating when the last Inspection in the Schedule should be due. Not used when frequency is once. e.g. `2023-10-23T11:34:27Z`
  - `frequency`: string enum[once, once_every_two_weeks, daily, weekly, monthly, quarterly, twice_yearly, yearly] - The frequency at which Inspections will be created by the Schedule. e.g. `monthly`
  - `location_id`: integer - The ID of the Location to set on the Schedule. e.g. `42`
  - `point_of_contact_id`: integer - The ID of a User to be set as the of the point of contact on the Schedule e.g. `42`
  - `responsible_contractor_id`: integer - The ID of a vendor to set as the responsible contractor on the Schedule. e.g. `76`
  - `specification_section_id`: integer - The ID of the specification section to set on the Schedule. e.g. `178`
  - `assignee_ids`: array of integer
  - `distribution_member_ids`: array of integer
  - `equipment_id`: string - The ID of the Equipment to set on the Schedule. e.g. `01J9BV3N9YQ34CDYA0G4J8R95R`

Response 201 (application/json): object

- `id`: integer - ID e.g. `21`
- `name`: string - Name e.g. `Framing`
- `first_inspection_due_at`: string(date-time) - Due at timestamp of first inspection
- `ends_at`: string(date-time) - Due at timestamp of last inspection e.g. `2012-10-23T21:39:40Z`
- `next_due_at`: string(date-time) - Due at timestamp of next inspection to be created e.g. `2012-10-23T21:39:40Z`
- `frequency`: string - Name e.g. `Weekly`
- `inspections_created`: integer - Number of inspections created e.g. `9`
- `total_inspections_scheduled`: integer - Total amount of inpections that will be created e.g. `50`
- `inspection_template`: object
  - `id`: integer - ID
  - `attachment_ids`: array of integer
  - `description`: string - Description
  - `inspection_type`: object - Inspection Type
    - `id`: integer - ID e.g. `1`
    - `name`: string - Name e.g. `Quality`
  - `name`: string - Name
  - `trade_id`: integer - Trade ID e.g. `56`
- `location_id`: integer - Location ID e.g. `3`
- `assignee_ids`: array of integer
- `point_of_contact_id`: integer - Point of contact ID e.g. `1`
- `responsible_contractor_id`: integer - ID of Vendor responsible for the work being inspected e.g. `1`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Timestamp of update e.g. `2012-10-23T21:39:40Z`
- `equipment_id`: string - Equipment ID e.g. `01J9BV3N9YQ34CDYA0G4J8R95R`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/schedules/{id}

**Show Checklist Schedule**
Retrieves Checklist Schedule in a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Checklist Schedule ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `21`
- `name`: string - Name e.g. `Framing`
- `first_inspection_due_at`: string(date-time) - Due at timestamp of first inspection
- `ends_at`: string(date-time) - Due at timestamp of last inspection e.g. `2012-10-23T21:39:40Z`
- `next_due_at`: string(date-time) - Due at timestamp of next inspection to be created e.g. `2012-10-23T21:39:40Z`
- `frequency`: string - Name e.g. `Weekly`
- `inspections_created`: integer - Number of inspections created e.g. `9`
- `total_inspections_scheduled`: integer - Total amount of inpections that will be created e.g. `50`
- `inspection_template`: object
  - `id`: integer - ID
  - `attachment_ids`: array of integer
  - `description`: string - Description
  - `inspection_type`: object - Inspection Type
    - `id`: integer - ID e.g. `1`
    - `name`: string - Name e.g. `Quality`
  - `name`: string - Name
  - `trade_id`: integer - Trade ID e.g. `56`
- `location_id`: integer - Location ID e.g. `3`
- `assignee_ids`: array of integer
- `point_of_contact_id`: integer - Point of contact ID e.g. `1`
- `responsible_contractor_id`: integer - ID of Vendor responsible for the work being inspected e.g. `1`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Timestamp of update e.g. `2012-10-23T21:39:40Z`
- `equipment_id`: string - Equipment ID e.g. `01J9BV3N9YQ34CDYA0G4J8R95R`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/checklist/schedules/{id}

**Update a Checklist (Inspection) Schedule**
Updates a Checklist (Inspection) Schedule in a specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Checklist Schedule ID

Request body (application/json):

- `schedule`: object (required) - Checklist Schedule object
  - `name`: string - The name for the Checklist Schedule. e.g. `New Checklist Schedule`
  - `first_inspection_due_at`: string(date-time) - Timestamp indicating when the first Inspection in the Schedule should be due. Cannot be in the past. e.g. `2021-09-23T11:34:27Z`
  - `ends_at`: string(date-time) - Timestamp indicating when the last Inspection in the Schedule should be due. Not used when frequency is once. e.g. `2023-10-23T11:34:27Z`
  - `frequency`: string enum[once, daily, once_every_two_weeks, weekly, monthly, yearly] - The frequency at which Inspections will be created by the Schedule. e.g. `monthly`
  - `location_id`: integer - The ID of the Location to set on the Schedule. e.g. `42`
  - `point_of_contact_id`: integer - The ID of a User to be set as the of the point of contact on the Schedule e.g. `42`
  - `responsible_contractor_id`: integer - The ID of a vendor to set as the responsible contractor on the Schedule. e.g. `76`
  - `specification_section_id`: integer - The ID of the specification section to set on the Schedule. e.g. `178`
  - `assignee_ids`: array of integer
  - `distribution_member_ids`: array of integer
  - `equipment_id`: string - The ID of the Equipment to set on the Schedule. e.g. `01J9BV3N9YQ34CDYA0G4J8R95R`

Response 200 (application/json): object

- `id`: integer - ID e.g. `21`
- `name`: string - Name e.g. `Framing`
- `first_inspection_due_at`: string(date-time) - Due at timestamp of first inspection
- `ends_at`: string(date-time) - Due at timestamp of last inspection e.g. `2012-10-23T21:39:40Z`
- `next_due_at`: string(date-time) - Due at timestamp of next inspection to be created e.g. `2012-10-23T21:39:40Z`
- `frequency`: string - Name e.g. `Weekly`
- `inspections_created`: integer - Number of inspections created e.g. `9`
- `total_inspections_scheduled`: integer - Total amount of inpections that will be created e.g. `50`
- `inspection_template`: object
  - `id`: integer - ID
  - `attachment_ids`: array of integer
  - `description`: string - Description
  - `inspection_type`: object - Inspection Type
    - `id`: integer - ID e.g. `1`
    - `name`: string - Name e.g. `Quality`
  - `name`: string - Name
  - `trade_id`: integer - Trade ID e.g. `56`
- `location_id`: integer - Location ID e.g. `3`
- `assignee_ids`: array of integer
- `point_of_contact_id`: integer - Point of contact ID e.g. `1`
- `responsible_contractor_id`: integer - ID of Vendor responsible for the work being inspected e.g. `1`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Timestamp of update e.g. `2012-10-23T21:39:40Z`
- `equipment_id`: string - Equipment ID e.g. `01J9BV3N9YQ34CDYA0G4J8R95R`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/checklist/schedules/{id}

**Delete Checklist Schedule**
Delete a Checklist Schedule in a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Checklist Schedule ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/schedules/calculate_first_inspection_created_at

**Calculate when the first Inspection of an Inspection Schedule will be created**
Calculates the creation date for the first Inspection to be created based on an Inspection Schedule's temporal attributes.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `schedule`: object (required)
  - `starts_at`: string(date-time) (required) - Schedule start date e.g. `2019-10-27T07:40:12Z`
  - `ends_at`: string(date-time) (required) - Schedule end date. When frequency is 'once' this should be the same value as starts_at. e.g. `2019-10-27T07:40:12Z`
  - `frequency`: string enum[once, daily, weekly, once_every_two_weeks, monthly, yearly] (required) - Schedule frequency type name e.g. `once_every_two_weeks`
  - `days_created_before_due_date`: integer (required) - Number of days before the inspection due date that the inspection should be created e.g. `3`

Response 200 (application/json): object

- `first_inspection_created_at`: string(date-time) - Timestamp of when the first inspection will be created from the schedule. e.g. `2019-10-27T07:40:12Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/schedules/calculate_total_inspections_count

**Calculate number of Inspections to create based on Schedule**
Calculates the total number of Inspections to create based on Schedule parameters.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `schedule`: object (required)
  - `starts_at`: string(date-time) (required) - Schedule start date e.g. `2019-10-27T07:40:12Z`
  - `ends_at`: string(date-time) (required) - Schedule end date e.g. `2019-10-27T07:40:12Z`
  - `frequency`: string enum[once, daily, weekly, once_every_two_weeks, monthly, yearly] (required) - Schedule frequency type name e.g. `once_every_two_weeks`

Response 200 (application/json): object

- `total_in_schedule`: integer - Total inspections number calculated. e.g. `2`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Checklist Sections

Resource id: `checklist-sections`. Raw spec: `../openapi-raw/checklist-sections.json`. Web: https://developers.procore.com/reference/rest/checklist-sections?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.1/projects/{project_id}/recycle_bin/checklist/list_sections

**List Recycled Checklist (Inspection) Sections**
Returns the Recycled Checklist Sections from Checklists (Inspections) on the Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[list_id]` [query] array of integer - Return section(s) with the specified Checklist List IDs
- `sort` [query] string enum[position] - Sort item(s) by the chosen param; check below for a list of options. The direction of sorting is ascending by default; for descending sort, insert the - symbol before the param.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `21`
- `name`: string - Name e.g. `Framing`
- `position`: integer - Position e.g. `1`
- `template_section_id`: integer - ID of Corresponding Checklist Template Section e.g. `3`
- `updated_at`: string(date-time) - Timestamp of update e.g. `2012-10-23T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/checklist/lists/{list_id}/sections  **[DEPRECATED]**

**Create Checklist Section**
This is a deprecated endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `list_id` [path] integer (required) - Checklist ID

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the Section belongs to
- `section`: object (required) - Section object
  - `name`: string (required) - The Name of the Section
  - `position`: integer (required) - The Position of the Section
  - `not_applicable`: boolean - The Not Applicable status of the Section
  - `items_attributes`: array of object - An array of the Section's Item attributes
    - `name`: string (required) - The Name of the Item
    - `position`: integer (required) - The Position of the Item
    - `status`: string enum[yes, no, n/a, none] - The Status of the Item

Response 201 (application/json): object

- `id`: integer - ID e.g. `21`
- `name`: string - Name e.g. `Framing`
- `position`: integer - Position e.g. `1`
- `list_id`: integer - Checklist ID. A Checklist Section will either have a `list_id` or `list_template_id`, but not both. e.g. `42`
- `not_applicable`: boolean - Not applicable status e.g. `false`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/checklist/lists/{list_id}/sections/{id}

**Show Checklist Section**
Retrieves Checklist Section in a specified Checklist.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `list_id` [path] integer (required) - Checklist ID
- `id` [path] integer (required) - Checklist Section ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `21`
- `name`: string - Name e.g. `Framing`
- `position`: integer - Position e.g. `1`
- `list_id`: integer - Checklist ID. A Checklist Section will either have a `list_id` or `list_template_id`, but not both. e.g. `42`
- `not_applicable`: boolean - Not applicable status e.g. `false`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/checklist/lists/{list_id}/sections/{id}  **[DEPRECATED]**

**Update Checklist Section**
This is a deprecated endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `list_id` [path] integer (required) - Checklist ID
- `id` [path] integer (required) - Checklist Section ID

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the Section belongs to
- `section`: object (required) - Section object
  - `name`: string (required) - The Name of the Section
  - `position`: integer (required) - The Position of the Section
  - `not_applicable`: boolean - The Not Applicable status of the Section
  - `items_attributes`: array of object - An array of the Section's Item attributes
    - `name`: string (required) - The Name of the Item
    - `position`: integer (required) - The Position of the Item
    - `status`: string enum[yes, no, n/a, none] - The Status of the Item

Response 200 (application/json): object

- `id`: integer - ID e.g. `21`
- `name`: string - Name e.g. `Framing`
- `position`: integer - Position e.g. `1`
- `list_id`: integer - Checklist ID. A Checklist Section will either have a `list_id` or `list_template_id`, but not both. e.g. `42`
- `not_applicable`: boolean - Not applicable status e.g. `false`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/checklist/lists/{list_id}/sections/{id}  **[DEPRECATED]**

**Delete Checklist Section**
This is a deprecated endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `list_id` [path] integer (required) - Checklist ID
- `id` [path] integer (required) - Checklist Section ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PUT /rest/v1.0/checklist/lists/{list_id}/sections/{section_id}/toggle_not_applicable

**Toggle Checklist Section Not Applicable status**
Toggles Checklist Section Not Applicable status in a specified Checklist and Checklist Section.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `list_id` [path] integer (required) - Checklist ID
- `section_id` [path] integer (required) - Checklist Section ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project.
- `not_applicable`: boolean (required) - Not applicable status

Response 200 (application/json): object

- `id`: integer - ID e.g. `21`
- `name`: string - Name e.g. `Framing`
- `position`: integer - Position e.g. `1`
- `list_id`: integer - Checklist ID. A Checklist Section will either have a `list_id` or `list_template_id`, but not both. e.g. `42`
- `not_applicable`: boolean - Not applicable status e.g. `false`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/checklist/lists/{list_id}/sections/{section_id}/toggle_not_applicable

**Toggle Checklist Section Not Applicable status**
Toggles Checklist Section Not Applicable status in a specified Checklist and Checklist Section.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `list_id` [path] integer (required) - Checklist ID
- `section_id` [path] integer (required) - Checklist Section ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project.
- `not_applicable`: boolean (required) - Not applicable status

Response 200 (application/json): object

- `id`: integer - ID e.g. `21`
- `name`: string - Name e.g. `Framing`
- `position`: integer - Position e.g. `1`
- `list_id`: integer - Checklist ID. A Checklist Section will either have a `list_id` or `list_template_id`, but not both. e.g. `42`
- `not_applicable`: boolean - Not applicable status e.g. `false`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/list_sections

**List Checklist (Inspection) Sections**
Returns the Checklist Sections from Checklists (Inspections) on the Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[list_id]` [query] array of integer - Return section(s) with the specified Checklist List IDs
- `sort` [query] string enum[position] - Sort item(s) by the chosen param; check below for a list of options. The direction of sorting is ascending by default; for descending sort, insert the - symbol before the param.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `21`
- `name`: string - Name e.g. `Framing`
- `position`: integer - Position e.g. `1`
- `template_section_id`: integer - ID of Corresponding Checklist Template Section e.g. `3`
- `updated_at`: string(date-time) - Timestamp of update e.g. `2012-10-23T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Checklist Signature Requests

Resource id: `checklist-signature-requests`. Raw spec: `../openapi-raw/checklist-signature-requests.json`. Web: https://developers.procore.com/reference/rest/checklist-signature-requests?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/checklist/lists/{list_id}/signature_requests

**List Checklist Signature Requests**
Lists Signature Requests for a specified Checklist

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `list_id` [path] integer (required) - Checklist ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `21`
- `signatory`: object
  - `id`: integer - The unique identifier of the user. e.g. `160586`
  - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
  - `name`: string - The name of the user. e.g. `Carl the Contractor`
  - `company_name`: string - User's Company Name e.g. `Company ABC`
- `signature`: object
  - `id`: integer - ID e.g. `5324`
  - `captured_by`: object
    - `id`: integer - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
    - `name`: string - Attachment name e.g. `january_receipt_copy.jpg`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/checklist/lists/{list_id}/signature_requests

**Create Checklist Signature Request**
Creates a Signature Request for a specified Checklist.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `list_id` [path] integer (required) - Checklist ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `signature_request`: object (required) - Checklist Signature Request object
  - `signatory_id`: integer (required) - ID of the User requested to sign e.g. `160586`

Response 201 (application/json): object

- `id`: integer - ID e.g. `21`
- `signatory`: object
  - `id`: integer - The unique identifier of the user. e.g. `160586`
  - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
  - `name`: string - The name of the user. e.g. `Carl the Contractor`
  - `company_name`: string - User's Company Name e.g. `Company ABC`
- `signature`: object
  - `id`: integer - ID e.g. `5324`
  - `captured_by`: object
    - `id`: integer - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
    - `name`: string - Attachment name e.g. `january_receipt_copy.jpg`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/checklist/lists/{list_id}/signature_requests/{id}

**Show Checklist Signature Request**
Retrieves Signature Request for a specified Checklist.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `list_id` [path] integer (required) - Checklist ID
- `id` [path] integer (required) - Signature Request ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `21`
- `signatory`: object
  - `id`: integer - The unique identifier of the user. e.g. `160586`
  - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
  - `name`: string - The name of the user. e.g. `Carl the Contractor`
  - `company_name`: string - User's Company Name e.g. `Company ABC`
- `signature`: object
  - `id`: integer - ID e.g. `5324`
  - `captured_by`: object
    - `id`: integer - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
    - `name`: string - Attachment name e.g. `january_receipt_copy.jpg`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/checklist/lists/{list_id}/signature_requests/{id}

**Delete Checklist Signature Request**
Deletes a Signature Request for a specified Checklist.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `list_id` [path] integer (required) - Checklist ID
- `id` [path] integer (required) - Signature Request ID

Response 200: OK (no body)

Error responses: 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/checklist/lists/{list_id}/signature_requests/{signature_request_id}/signature  **[DEPRECATED]**

**Create Checklist Signature**
Creates a Signature for a specified Checklist Signature Request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `list_id` [path] integer (required) - Checklist ID
- `signature_request_id` [path] integer (required) - Checklist Signature Request ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `attachment_id`: integer - Use either attachment_id or upload_id for creating a signature e.g. `42`
- `upload_id`: string - Use either upload_id or attachment_id for creating a signature e.g. `1ZE146W9K804SAJJZX19JVAD0R`

Response 201 (application/json): object

- `id`: integer - ID e.g. `21`
- `signatory`: object
  - `id`: integer - The unique identifier of the user. e.g. `160586`
  - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
  - `name`: string - The name of the user. e.g. `Carl the Contractor`
  - `company_name`: string - User's Company Name e.g. `Company ABC`
- `signature`: object
  - `id`: integer - ID e.g. `5324`
  - `captured_by`: object
    - `id`: integer - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
    - `name`: string - Attachment name e.g. `january_receipt_copy.jpg`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/checklist/lists/{list_id}/signature_requests/{signature_request_id}/signature

**Delete Checklist Signature**
Deletes a Signature for a specified Checklist Signature Request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `list_id` [path] integer (required) - Checklist ID
- `signature_request_id` [path] integer (required) - Checklist Signature Request ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Checklist Templates

Resource id: `checklist-templates`. Raw spec: `../openapi-raw/checklist-templates.json`. Web: https://developers.procore.com/reference/rest/checklist-templates?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/checklist/list_templates  **[DEPRECATED]**

**List Checklist Templates**
Returns a list of all Inspection Checklist Templates for a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Window Inspection`
- `description`: string - Description e.g. `Checklist for circular windows`
- `company_description`: string - Company level inspection template description e.g. `Checklist for windows`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `inspection_type`: object - Inspection Type
  - `id`: integer - ID e.g. `1`
  - `name`: string - Name e.g. `Quality`
  - `created_at`: string(date-time) - Timestamp of Inspection Type creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Inspection Type e.g. `2016-08-01T23:33:54Z`
- `alternative_response_set_id`: integer - The ID of the associated Alternative Response Set (if null, the default response set is being used) e.g. `1234`
- `response_set`: object
  - `conforming_response`: string - Term used to represent conforming statuses on items within the current template, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Pass`
  - `deficient_response`: string - Term used to represent deficient statuses on items within the current template, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `Fail`
  - `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `sections`: array of object - Checklist Sections
  - `id`: integer - ID e.g. `21`
  - `name`: string - Name e.g. `Framing`
  - `position`: integer - Position e.g. `1`
  - `items`: array of object - Checklist Items
    - `id`: integer - ID e.g. `2`
    - `name`: string - Name e.g. `Framing has no visible defects`
    - `status`: string enum[yes, no, n/a, none] - Status e.g. `n/a`
    - `section_id`: integer - Checklist Section ID e.g. `21`
    - `section_position`: integer - Checklist Section Position e.g. `3`
    - `position`: integer - Position e.g. `1`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/checklist/list_templates/{id}  **[DEPRECATED]**

**Show Checklist Template**
Shows an Inspection Checklist Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist Template ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Window Inspection`
- `description`: string - Description e.g. `Checklist for circular windows`
- `company_description`: string - Company level inspection template description e.g. `Checklist for windows`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `inspection_type`: object - Inspection Type
  - `id`: integer - ID e.g. `1`
  - `name`: string - Name e.g. `Quality`
  - `created_at`: string(date-time) - Timestamp of Inspection Type creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Inspection Type e.g. `2016-08-01T23:33:54Z`
- `alternative_response_set_id`: integer - The ID of the associated Alternative Response Set (if null, the default response set is being used) e.g. `1234`
- `response_set`: object
  - `conforming_response`: string - Term used to represent conforming statuses on items within the current template, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Pass`
  - `deficient_response`: string - Term used to represent deficient statuses on items within the current template, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `Fail`
  - `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `sections`: array of object - Checklist Sections
  - `id`: integer - ID e.g. `21`
  - `name`: string - Name e.g. `Framing`
  - `position`: integer - Position e.g. `1`
  - `items`: array of object - Checklist Items
    - `id`: integer - ID e.g. `2`
    - `name`: string - Name e.g. `Framing has no visible defects`
    - `status`: string enum[yes, no, n/a, none] - Status e.g. `n/a`
    - `section_id`: integer - Checklist Section ID e.g. `21`
    - `section_position`: integer - Checklist Section Position e.g. `3`
    - `position`: integer - Position e.g. `1`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/checklist/list_templates/{id}/use_alternative_response_set  **[DEPRECATED]**

**Add Checklist Template Alternative Response Set**
Sets a Checklist Template's Response Set to the specified Alternative Response Set.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist Template ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project.
- `alternative_response_set_id`: integer (required) - Alternative Response Set ID e.g. `1`

Response 200 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Window Inspection`
- `description`: string - Description e.g. `Checklist for circular windows`
- `company_description`: string - Company level inspection template description e.g. `Checklist for windows`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `inspection_type`: object - Inspection Type
  - `id`: integer - ID e.g. `1`
  - `name`: string - Name e.g. `Quality`
  - `created_at`: string(date-time) - Timestamp of Inspection Type creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Inspection Type e.g. `2016-08-01T23:33:54Z`
- `alternative_response_set_id`: integer - The ID of the associated Alternative Response Set (if null, the default response set is being used) e.g. `1`
- `response_set`: object
  - `conforming_response`: string - Term used to represent conforming statuses on items within the current template, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Safe`
  - `deficient_response`: string - Term used to represent deficient statuses on items within the current template, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `At Risk`
  - `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `sections`: array of object - Checklist Sections
  - `id`: integer - ID e.g. `21`
  - `name`: string - Name e.g. `Framing`
  - `position`: integer - Position e.g. `1`
  - `items`: array of object - Checklist Items
    - `id`: integer - ID e.g. `2`
    - `name`: string - Name e.g. `Framing has no visible defects`
    - `status`: string enum[yes, no, n/a, none] - Status e.g. `n/a`
    - `section_id`: integer - Checklist Section ID e.g. `21`
    - `position`: integer - Position e.g. `1`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/checklist/list_templates/{id}/remove_alternative_response_set  **[DEPRECATED]**

**Remove Checklist Template Alternative Response Set**
Removes a Checklist Template's Alternative Response Set, returning the template to the default Response Set

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist Template ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Window Inspection`
- `description`: string - Description e.g. `Checklist for circular windows`
- `company_description`: string - Company level inspection template description e.g. `Checklist for windows`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `inspection_type`: object - Inspection Type
  - `id`: integer - ID e.g. `1`
  - `name`: string - Name e.g. `Quality`
  - `created_at`: string(date-time) - Timestamp of Inspection Type creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Inspection Type e.g. `2016-08-01T23:33:54Z`
- `alternative_response_set_id`: integer - The ID of the associated Alternative Response Set (if null, the default response set is being used) e.g. `1`
- `response_set`: object
  - `conforming_response`: string - Term used to represent conforming statuses on items within the current template, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Safe`
  - `deficient_response`: string - Term used to represent deficient statuses on items within the current template, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `At Risk`
  - `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `sections`: array of object - Checklist Sections
  - `id`: integer - ID e.g. `21`
  - `name`: string - Name e.g. `Framing`
  - `position`: integer - Position e.g. `1`
  - `items`: array of object - Checklist Items
    - `id`: integer - ID e.g. `2`
    - `name`: string - Name e.g. `Framing has no visible defects`
    - `status`: string enum[yes, no, n/a, none] - Status e.g. `n/a`
    - `section_id`: integer - Checklist Section ID e.g. `21`
    - `position`: integer - Position e.g. `1`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Checklists

Resource id: `checklists`. Raw spec: `../openapi-raw/checklists.json`. Web: https://developers.procore.com/reference/rest/checklists?version=latest
Product lines: Total Quality and Safety Management

### POST /rest/v1.1/projects/{project_id}/checklist/lists

**Create Checklist (Inspection)**
Creates an instance of Inspection in a given Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `list_template_id`: integer(int64) (required) - ID of the Checklist List Template (Inspection Template) that the Checklist (Inspection) will be created from e.g. `12`
- `list`: object (required)
  - `description`: string - Description of the Inspection e.g. `Ensure proper window installation`
  - `due_at`: string(date-time) - Timestamp indicating when the Inspection is due. e.g. `2019-08-18T23:36:30Z`
  - `identifier`: string - Identifier of the Inspection e.g. `W-123`
  - `inspection_date`: string(date) - Date of the Inspection e.g. `2019-10-31`
  - `inspection_type_id`: integer - The ID of the Inspection's Type e.g. `34`
  - `number`: integer - The Number of the Checklist. If no number is passed in, the next available number will be used. e.g. `42`
  - `managed_equipment_id`: integer - The ID of the Inspection's Managed Equipment e.g. `123`
  - `point_of_contact_id`: integer - The ID of the Inspection's Point of Contact e.g. `12`
  - `inspector_ids`: array of integer - The IDs of the Inspectors performing the Inspection e.g. `[12, 13]`
  - `private`: boolean - Indicates whether this Inspection is private e.g. `true`
  - `responsible_contractor_id`: integer - The ID of the Inspection's Responsible Contractor e.g. `123`
  - `spec_section_id`: integer - The ID of the Inspection's Specification Section e.g. `5`
  - `status`: string enum[open, in_review, closed] - The Inspection's status e.g. `open`
  - `trade_id`: integer - The ID of the Trade involved in the Inspection e.g. `123`
  - `distribution_member_ids`: array of integer - The IDs of the Distribution Members for the Inspection e.g. `[2, 3]`
  - `location_id`: integer - The ID of the Location of the Inspection e.g. `1`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 201 (application/json): object

- `id`: integer - ID e.g. `42`
- `name`: string - Name e.g. `Window Inspection`
- `list_template_id`: integer - Checklist Template ID from which this Checklist was created e.g. `1`
- `list_template_name`: string - Current name of the Checklist Template from which this Checklist was created e.g. `Window Inspection v2`
- `number`: integer - Number e.g. `1`
- `status`: string enum[Open, In Review, Closed] - Status e.g. `Closed`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `code`: string - Location code e.g. `code`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2017-10-31T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2018-12-11T04:58:42Z`
- `closed_at`: string(date-time) - Timestamp of when inspection was closed e.g. `2018-12-11T04:58:42Z`
- `drawing_ids`: array of integer - Array of Drawing IDs
- `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
- `description`: string - Description e.g. `Checklist for circular windows`
- `deleted`: boolean - Indicates whether this Checklist has been deleted e.g. `false`
- `due_at`: string(date-time) - Timestamp indicating when the Inspection is due e.g. `2019-08-18T23:36:30Z`
- `identifier`: string - Identifier e.g. `176-09B`
- `inspection_date`: string(date) - Date that the inspection was performed
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `private`: boolean - Indicates whether this Checklist is private e.g. `false`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `closed_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `responsible_contractor`: object - Vendor responsible for the work being inspected
  - `id`: integer - ID e.g. `1`
  - `name`: string - Name e.g. `Freddie's Excavating`
- `point_of_contact`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `inspectors`: array of object - Inspectors
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `distribution_members`: array of object - Distribution Members
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `signature_requests`: array of object - Checklist Signature Requests
  - `id`: integer - ID e.g. `21`
  - `signatory`: object
    - `id`: integer - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `signature`: object
    - `id`: integer - ID e.g. `5324`
    - `captured_by`: object
    - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
    - `attachment`: object
- `managed_equipment_id`: integer - Managed Equipment ID e.g. `1`
- `specification_section`: object - Specification Section
  - `id`: integer - ID e.g. `1`
  - `current_revision_id`: integer - Current revision ID e.g. `11`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `section`: string - Number e.g. `08560`
  - `latest_revision_url`: string - Url to PDF view e.g. `link_to_pdf`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename (deprecated) e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
- `conforming_item_count`: integer - Number of Checklist Items with a status of `yes` e.g. `1`
- `deficient_item_count`: integer - Number of Checklist Items with a status of `no` e.g. `1`
- `not_applicable_item_count`: integer - Number of Checklist Items with a status of `n/a` e.g. `0`
- `neutral_item_count`: integer - Number of Checklist Items with a status of `neutral` e.g. `1`
- `inspected_item_count`: integer - Number of Checklist Items that have been inspected e.g. `4`
- `observations_count`: integer - Number of Observations from this Checklist e.g. `2`
- `closed_observations_count`: integer - Number of closed Observations pertaining to the Checklist e.g. `1`
- `item_count`: integer - Number of Checklist Items within the Checklist e.g. `1`
- `respondable_item_count`: integer - Number of Respondable Checklist Items within the Checklist. e.g. `1`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `asset_ids`: array of string - IDs of Assets linked to this Inspection via Related Items e.g. `["01HQRT4MNBV2XJKZ8DPWE3YC5A"]`
- `template_id`: integer - Template ID e.g. `176`
- `overdue`: boolean - Checklist List overdue flag e.g. `true`
- `reinspected_by_id`: string - The ID of the Reinspection that was created from this Inspection e.g. `105`
- `reinspected_from_id`: string - The ID of the Inspection this Inspection was reinspected from (labeled "Origin" in UI) e.g. `58`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/checklist/lists/{id}

**Update Checklist (Inspection)**
Updates a specified Checklist (Inspection)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist ID
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `list`: object (required)
  - `name`: string - The Name of the Inspection e.g. `Window Inspection`
  - `description`: string - Description of the Inspection e.g. `Ensure proper window installation`
  - `due_at`: string(date-time) - Timestamp indicating when the Inspection is due. e.g. `2019-08-18T23:36:30Z`
  - `identifier`: string - Identifier of the Inspection e.g. `W-123`
  - `inspection_date`: string(date) - Date of the Inspection e.g. `2019-10-31`
  - `inspection_type_id`: integer - The ID of the Inspection's Type e.g. `34`
  - `number`: integer - The Number of the Checklist. If no number is passed in, the next available number will be used. e.g. `42`
  - `point_of_contact_id`: integer - The ID of the Inspection's Point of Contact e.g. `12`
  - `inspector_ids`: array of integer - The IDs of the Inspectors performing the Inspection e.g. `[12, 13]`
  - `private`: boolean - Indicates whether this Inspection is private e.g. `true`
  - `responsible_contractor_id`: integer - The ID of the Inspection's Responsible Contractor e.g. `123`
  - `spec_section_id`: integer - The ID of the Inspection's Specification Section e.g. `5`
  - `status`: string enum[open, in_review, closed] - The Inspection's status e.g. `open`
  - `trade_id`: integer - The ID of the Trade involved in the Inspection e.g. `123`
  - `distribution_member_ids`: array of integer - The IDs of the Distribution Members for the Inspection e.g. `[2, 3]`
  - `location_id`: integer - The ID of the Location of the Inspection e.g. `1`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer - ID e.g. `42`
- `name`: string - Name e.g. `Window Inspection`
- `list_template_id`: integer - Checklist Template ID from which this Checklist was created e.g. `1`
- `list_template_name`: string - Current name of the Checklist Template from which this Checklist was created e.g. `Window Inspection v2`
- `number`: integer - Number e.g. `1`
- `status`: string enum[Open, In Review, Closed] - Status e.g. `Closed`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `code`: string - Location code e.g. `code`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2017-10-31T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2018-12-11T04:58:42Z`
- `closed_at`: string(date-time) - Timestamp of when inspection was closed e.g. `2018-12-11T04:58:42Z`
- `drawing_ids`: array of integer - Array of Drawing IDs
- `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
- `description`: string - Description e.g. `Checklist for circular windows`
- `deleted`: boolean - Indicates whether this Checklist has been deleted e.g. `false`
- `due_at`: string(date-time) - Timestamp indicating when the Inspection is due e.g. `2019-08-18T23:36:30Z`
- `identifier`: string - Identifier e.g. `176-09B`
- `inspection_date`: string(date) - Date that the inspection was performed
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `private`: boolean - Indicates whether this Checklist is private e.g. `false`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `closed_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `responsible_contractor`: object - Vendor responsible for the work being inspected
  - `id`: integer - ID e.g. `1`
  - `name`: string - Name e.g. `Freddie's Excavating`
- `point_of_contact`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `inspectors`: array of object - Inspectors
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `distribution_members`: array of object - Distribution Members
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `signature_requests`: array of object - Checklist Signature Requests
  - `id`: integer - ID e.g. `21`
  - `signatory`: object
    - `id`: integer - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `signature`: object
    - `id`: integer - ID e.g. `5324`
    - `captured_by`: object
    - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
    - `attachment`: object
- `managed_equipment_id`: integer - Managed Equipment ID e.g. `1`
- `specification_section`: object - Specification Section
  - `id`: integer - ID e.g. `1`
  - `current_revision_id`: integer - Current revision ID e.g. `11`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `section`: string - Number e.g. `08560`
  - `latest_revision_url`: string - Url to PDF view e.g. `link_to_pdf`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename (deprecated) e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
- `conforming_item_count`: integer - Number of Checklist Items with a status of `yes` e.g. `1`
- `deficient_item_count`: integer - Number of Checklist Items with a status of `no` e.g. `1`
- `not_applicable_item_count`: integer - Number of Checklist Items with a status of `n/a` e.g. `0`
- `neutral_item_count`: integer - Number of Checklist Items with a status of `neutral` e.g. `1`
- `inspected_item_count`: integer - Number of Checklist Items that have been inspected e.g. `4`
- `observations_count`: integer - Number of Observations from this Checklist e.g. `2`
- `closed_observations_count`: integer - Number of closed Observations pertaining to the Checklist e.g. `1`
- `item_count`: integer - Number of Checklist Items within the Checklist e.g. `1`
- `respondable_item_count`: integer - Number of Respondable Checklist Items within the Checklist. e.g. `1`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `asset_ids`: array of string - IDs of Assets linked to this Inspection via Related Items e.g. `["01HQRT4MNBV2XJKZ8DPWE3YC5A"]`
- `template_id`: integer - Template ID e.g. `176`
- `overdue`: boolean - Checklist List overdue flag e.g. `true`
- `reinspected_by_id`: string - The ID of the Reinspection that was created from this Inspection e.g. `105`
- `reinspected_from_id`: string - The ID of the Inspection this Inspection was reinspected from (labeled "Origin" in UI) e.g. `58`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.1/projects/{project_id}/checklist/lists/{id}

**Delete Checklist (Inspection)**
Deletes specified Checklist (Inspection)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/checklist/lists/{id}/close

**Close Checklist (Inspection)**
Closes the specified Checklist (Inspection) by transitioning its status to `closed`. This is a dedicated endpoint that performs only the close action and does not accept any additional update parameters. Closing an already-closed Inspection is idempotent and returns the Inspection in its current state.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `42`
- `name`: string - Name e.g. `Window Inspection`
- `list_template_id`: integer - Checklist Template ID from which this Checklist was created e.g. `1`
- `list_template_name`: string - Current name of the Checklist Template from which this Checklist was created e.g. `Window Inspection v2`
- `number`: integer - Number e.g. `1`
- `status`: string enum[Open, In Review, Closed] - Status e.g. `Closed`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `code`: string - Location code e.g. `code`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2017-10-31T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2018-12-11T04:58:42Z`
- `closed_at`: string(date-time) - Timestamp of when inspection was closed e.g. `2018-12-11T04:58:42Z`
- `drawing_ids`: array of integer - Array of Drawing IDs
- `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
- `description`: string - Description e.g. `Checklist for circular windows`
- `deleted`: boolean - Indicates whether this Checklist has been deleted e.g. `false`
- `due_at`: string(date-time) - Timestamp indicating when the Inspection is due e.g. `2019-08-18T23:36:30Z`
- `identifier`: string - Identifier e.g. `176-09B`
- `inspection_date`: string(date) - Date that the inspection was performed
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `private`: boolean - Indicates whether this Checklist is private e.g. `false`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `closed_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `responsible_contractor`: object - Vendor responsible for the work being inspected
  - `id`: integer - ID e.g. `1`
  - `name`: string - Name e.g. `Freddie's Excavating`
- `point_of_contact`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `inspectors`: array of object - Inspectors
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `distribution_members`: array of object - Distribution Members
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `signature_requests`: array of object - Checklist Signature Requests
  - `id`: integer - ID e.g. `21`
  - `signatory`: object
    - `id`: integer - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `signature`: object
    - `id`: integer - ID e.g. `5324`
    - `captured_by`: object
    - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
    - `attachment`: object
- `managed_equipment_id`: integer - Managed Equipment ID e.g. `1`
- `specification_section`: object - Specification Section
  - `id`: integer - ID e.g. `1`
  - `current_revision_id`: integer - Current revision ID e.g. `11`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `section`: string - Number e.g. `08560`
  - `latest_revision_url`: string - Url to PDF view e.g. `link_to_pdf`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename (deprecated) e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
- `conforming_item_count`: integer - Number of Checklist Items with a status of `yes` e.g. `1`
- `deficient_item_count`: integer - Number of Checklist Items with a status of `no` e.g. `1`
- `not_applicable_item_count`: integer - Number of Checklist Items with a status of `n/a` e.g. `0`
- `neutral_item_count`: integer - Number of Checklist Items with a status of `neutral` e.g. `1`
- `inspected_item_count`: integer - Number of Checklist Items that have been inspected e.g. `4`
- `observations_count`: integer - Number of Observations from this Checklist e.g. `2`
- `closed_observations_count`: integer - Number of closed Observations pertaining to the Checklist e.g. `1`
- `item_count`: integer - Number of Checklist Items within the Checklist e.g. `1`
- `respondable_item_count`: integer - Number of Respondable Checklist Items within the Checklist. e.g. `1`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `asset_ids`: array of string - IDs of Assets linked to this Inspection via Related Items e.g. `["01HQRT4MNBV2XJKZ8DPWE3YC5A"]`
- `template_id`: integer - Template ID e.g. `176`
- `overdue`: boolean - Checklist List overdue flag e.g. `true`
- `reinspected_by_id`: string - The ID of the Reinspection that was created from this Inspection e.g. `105`
- `reinspected_from_id`: string - The ID of the Inspection this Inspection was reinspected from (labeled "Origin" in UI) e.g. `58`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/checklist/lists/{id}/reopen

**Reopen Checklist (Inspection)**
Reopens the specified Checklist (Inspection) by transitioning its status to `open`. The endpoint is idempotent and returns the full Inspection payload.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `42`
- `name`: string - Name e.g. `Window Inspection`
- `list_template_id`: integer - Checklist Template ID from which this Checklist was created e.g. `1`
- `list_template_name`: string - Current name of the Checklist Template from which this Checklist was created e.g. `Window Inspection v2`
- `number`: integer - Number e.g. `1`
- `status`: string enum[Open, In Review, Closed] - Status e.g. `Closed`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `code`: string - Location code e.g. `code`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2017-10-31T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2018-12-11T04:58:42Z`
- `closed_at`: string(date-time) - Timestamp of when inspection was closed e.g. `2018-12-11T04:58:42Z`
- `drawing_ids`: array of integer - Array of Drawing IDs
- `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
- `default_response_phrasing`: object - Conforming/Deficient responses used for items having the default response type
  - `conforming_response`: string - Conforming response of the default response set e.g. `Safe`
  - `deficient_response`: string - Deficient/Non-conforming response of the default response set e.g. `At Risk`
  - `global`: boolean - Boolean flag indicating if the default response phrasing is Procore-provided e.g. `true`
- `description`: string - Description e.g. `Checklist for circular windows`
- `deleted`: boolean - Indicates whether this Checklist has been deleted e.g. `false`
- `due_at`: string(date-time) - Timestamp indicating when the Inspection is due e.g. `2019-08-18T23:36:30Z`
- `inspection_date`: string(date) - Date that the inspection was performed
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `private`: boolean - Indicates whether this Checklist is private e.g. `false`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `closed_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `responsible_contractor`: object - Vendor responsible for the work being inspected
  - `id`: integer - ID e.g. `1`
  - `name`: string - Name e.g. `Freddie's Excavating`
- `point_of_contact`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `inspectors`: array of object - Inspectors
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `distribution_members`: array of object - Distribution Members
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `signature_requests`: array of object - Checklist Signature Requests
  - `id`: integer - ID e.g. `21`
  - `signatory`: object
    - `id`: integer - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `signature`: object
    - `id`: integer - ID e.g. `5324`
    - `captured_by`: object
    - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
    - `attachment`: object
- `managed_equipment_id`: integer - Managed Equipment ID e.g. `1`
- `asset_ids`: array of string - IDs of Assets linked to this Inspection via Related Items e.g. `["01HQRT4MNBV2XJKZ8DPWE3YC5A"]`
- `specification_section`: object - Specification Section
  - `id`: integer - ID e.g. `1`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `section`: string - Number e.g. `08560`
  - `latest_revision_url`: string - Url to PDF view e.g. `link_to_pdf`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename (deprecated) e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
- `conforming_item_count`: integer - Number of Checklist Items with a status of `yes` e.g. `1`
- `deficient_item_count`: integer - Number of Checklist Items with a status of `no` e.g. `1`
- `not_applicable_item_count`: integer - Number of Checklist Items with a status of `n/a` e.g. `0`
- `neutral_item_count`: integer - Number of Checklist Items with a status of `neutral` e.g. `1`
- `inspected_item_count`: integer - Number of Checklist Items that have been inspected e.g. `4`
- `observations_count`: integer - Number of Observations from this Checklist e.g. `2`
- `closed_observations_count`: integer - Number of closed Observations pertaining to the Checklist e.g. `1`
- `item_count`: integer - Number of Checklist Items within the Checklist e.g. `1`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `template_id`: integer - Template ID e.g. `176`
- `overdue`: boolean - Checklist List overdue flag e.g. `true`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/recycle_bin/checklist/lists/{id}/restore

**Restore Deleted Checklist (Inspection)**
Restores a specified deleted Checklist (Inspection)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/checklist/lists  **[DEPRECATED]**

**List Checklists**
Lists Checklist (Inspections) in a specified Project grouped by a specified attribute. By default the Checklists are grouped by template.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `filters[view]` [query] string enum[recycle] - If 'recycle', return deleted Checklists.
- `filters[inspection_type_id]` [query] array of integer - Array of Inspection Type IDs. Return item(s) associated with the specified Inspection Type IDs.
- `filters[point_of_contact_id]` [query] array of integer - Array of User IDs. Return item(s) where the specified User IDs are the point of contact.
- `filters[inspector_id]` [query] array of integer - Array of User IDs. Return item(s) where the specified User IDs are inspectors.
- `filters[list_template_id]` [query] array of integer - Array of Checklist Template IDs. Return item(s) associated with the specified Checklist Template IDs.
- `filters[location_id]` [query] integer - Filters by specific location (Note: Use *either* this or location_id_with_sublocations, but not both)
- `filters[spec_section_id]` [query] array of integer - Array of Specification Section IDs. Return item(s) associated to the specified Specification Section IDs.
- `filters[responsible_contractor_id]` [query] array of integer - Array of Vendor IDs. Return item(s) where the specified Vendor IDs are the responsible contractor.
- `filters[status]` [query] array of string - Returns item(s) matching the specified status value.
- `filters[trade_id]` [query] integer - Trade ID
- `filters[search]` [query] string - Returns item(s) matching the specified search query string.
- `filters[due_at]` [query] string(date-time) - Return item(s) due within the specified date range.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `name`: string - Checklist template name e.g. `Framing Inspection`
- `template_id`: integer - Checklist template ID e.g. `1`
- `response_set`: object
  - `conforming_response`: string - Term used to represent conforming statuses on items within the current template, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Pass`
  - `deficient_response`: string - Term used to represent deficient statuses on items within the current template, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `Fail`
  - `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`
- `lists`: array of object - Array of Checklists
  - `id`: integer - ID e.g. `1445`
  - `list_template_id`: integer - Checklist Template ID e.g. `1`
  - `name`: string - Name e.g. `Framing Inspection`
  - `list_template_name`: string - Name of the Template the Inspection was created from e.g. `Framing Inspection`
  - `description`: string - Description e.g. `Standard framing inspection`
  - `distribution_members`: array of object - Users on the Inspection distribution list
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `exampleuser@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `due_at`: string(date-time) - Timestamp indicating when the Inspection is due e.g. `2019-08-18T23:36:30Z`
  - `number`: integer - Number e.g. `1`
  - `status`: string enum[Open, Closed] - Status e.g. `Closed`
  - `identifier`: string - Identifier e.g. `1AGH-089`
  - `inspection_date`: string(date) - Date that the inspection was performed e.g. `2014-11-06`
  - `created_at`: string(date-time) - Timestamp of inspection creation e.g. `2014-11-06T16:17:28Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-11-06T16:17:28Z`
  - `closed_at`: string(date-time) - Timestamp of when inspection was closed e.g. `2014-11-06T16:17:28Z`
  - `item_count`: integer - Checklist Item count e.g. `1`
  - `yes_item_count`: integer - (Deprecated) Use `conforming_item_count` e.g. `1`
  - `personal`: boolean - Checklist personal status e.g. `true`
  - `item_total`: integer - (Deprecated) Use `item_count` e.g. `1`
  - `conforming_item_count`: integer - Count of Checklist Items with a status of `yes` e.g. `1`
  - `deficient_item_count`: integer - Count of Checklist Items with a status of `no` e.g. `1`
  - `na_item_count`: integer - Count of Checklist Items with a status of `n/a` e.g. `0`
  - `neutral_item_count`: integer - Number of Checklist Items with a status of `neutral` e.g. `1`
  - `not_inspected_item_count`: integer - Count of Checklist Items that have not been inspected e.g. `0`
  - `drawing_ids`: array of integer - Array of Drawing IDs
  - `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
  - `attachments`: array of object - Checklist attachments
    - `id`: integer - ID e.g. `5324`
    - `thumbnail_url`: string - Thumbnail URL e.g. `http://www.example.com/`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
    - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `exampleuser@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `closed_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `exampleuser@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `location`: object
    - `id`: integer - Location ID e.g. `15504`
    - `name`: string - Location name e.g. `1space>1 space`
    - `node_name`: string - Location node name e.g. `1 space`
    - `parent_id`: integer - Location parent id e.g. `788866`
    - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
    - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `specification_section`: object - Specification Section
    - `id`: integer - ID
    - `description`: string - Description
    - `section`: string - Number
    - `latest_revision_url`: string - Url to PDF view e.g. `link_to_pdf`
  - `signature_requests`: array of object - Checklist signature requests
    - `id`: integer - ID e.g. `21`
    - `signatory`: object
    - `signature`: object
  - `trade`: object
    - `id`: integer - Trade ID e.g. `999`
    - `name`: string - Trade name e.g. `09 - acoustical panels`
    - `active`: boolean - Trade availability e.g. `true`
    - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
  - `inspectors`: array of object - Users that will be performing the inspection
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `exampleuser@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `responsible_contractor`: object - Vendor responsible for the work being inspected
    - `id`: integer - ID
    - `name`: string - Name
  - `responsible_party`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `exampleuser@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
  - `managed_equipment_id`: integer - Managed Equipment ID e.g. `249`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/checklist/lists  **[DEPRECATED]**

**Create Checklist**
Creates Inspection Checklist in a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project e.g. `123`
- `template_id`: integer (required) - The ID of the Template to copy from. e.g. `456`
- `list`: object (required)
  - `name`: string - The name for the Checklist. e.g. `My Checklist`
  - `description`: string - The Description of the Checklist e.g. `Example Checklist Description`
  - `due_at`: string(date-time) - Timestamp indicating when the Inspection is due. e.g. `2019-08-18T23:36:30Z`
  - `inspection_date`: string(date) - The Inspection Date of the Checklist e.g. `2021-09-21T16:43:00Z`
  - `inspection_type_id`: integer - The ID of the Checklist's Type e.g. `34`
  - `point_of_contact_id`: integer - The ID of the Checklist's Point of Contact e.g. `42`
  - `inspectee_id`: integer - The ID of the Checklist's Inspectee e.g. `123`
  - `number`: integer - The Number of the Checklist. If no number is passed in, the next available number will be used. e.g. `42`
  - `personal`: boolean - The Personal status of the Checklist e.g. `true`
  - `responsible_contractor_id`: integer - The ID of the Checklist's Responsible Contractor e.g. `456`
  - `spec_section_id`: integer - The ID of the Checklist's Specification Section e.g. `789`
  - `status`: string enum[Open, In Review, Closed] - The Status of the Checklist e.g. `Open`
  - `trade_id`: integer - The ID of the Checklist's Trade e.g. `123`
  - `inspector_ids`: array of integer - An Array of the IDs of the Inspectors e.g. `[123, 456]`
  - `distribution_member_ids`: array of integer - An Array of the IDs of the Distribution Members e.g. `[123, 456]`
  - `location_id`: integer - The ID of the Location of the Checklist. `location_id` takes precedence over `mt_location` e.g. `123`
  - `mt_location`: array of string - Use for creating a new multi-tier or single-tier Location. Will be ignored if `location_id` is provided e.g. `["Location 1", "Location 2"]`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`
- `attachments`: array of string - Checklist's Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 201 (application/json): object

- `id`: integer - ID e.g. `1445`
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `list_template_id`: integer - Checklist Template ID e.g. `1`
- `name`: string - Name e.g. `Framing List`
- `description`: string - Description e.g. `Checking the framing`
- `distribution_members`: array of object - Users on the Inspection distribution list
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `due_at`: string(date-time) - Timestamp indicating when the Inspection is due e.g. `2019-08-18T23:36:30Z`
- `identifier`: string - Identifier e.g. `176-09B`
- `number`: integer - Number e.g. `1`
- `status`: string enum[Open, Closed] - Status e.g. `Closed`
- `inspection_date`: string(date) - Date that the inspection was performed e.g. `2014-11-06`
- `created_at`: string(date-time) - Timestamp of inspection creation e.g. `2014-11-06T16:17:28Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-11-06T16:17:28Z`
- `closed_at`: string(date-time) - Timestamp of when inspection was closed e.g. `2014-11-06T16:17:28Z`
- `item_count`: integer - Checklist Item count e.g. `1`
- `yes_item_count`: integer - Deprecated. Use `conforming_item_count` e.g. `1`
- `personal`: boolean - Privacy status e.g. `true`
- `item_total`: integer - (Deprecated) Use `item_count` e.g. `1`
- `conforming_item_count`: integer - Count of Checklist Items with a status of `yes` e.g. `1`
- `deficient_item_count`: integer - Count of Checklist Items with a status of `no` e.g. `1`
- `na_item_count`: integer - Count of Checklist Items with a status of `n/a` e.g. `0`
- `neutral_item_count`: integer - Number of Checklist Items with a status of `neutral` e.g. `1`
- `not_inspected_item_count`: integer - Count of Checklist Items that have not been inspected e.g. `0`
- `drawing_ids`: array of integer - Array of Drawing IDs
- `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `specification_section`: object - Specification Section
  - `id`: integer - ID
  - `description`: string - Description
  - `section`: string - Number
  - `latest_revision_url`: string - Url to PDF view
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `closed_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `inspectors`: array of object - Checklist inspectors
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `signature_requests`: array of object - Checklist signature requests
  - `id`: integer - ID e.g. `21`
  - `signatory`: object
    - `id`: integer - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `signature`: object
    - `id`: integer - ID e.g. `5324`
    - `captured_by`: object
    - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
    - `attachment`: object
- `responsible_contractor`: object - Vendor responsible for the work being inspected
  - `id`: integer - ID
  - `name`: string - Name
- `responsible_party`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `response_set`: object
  - `conforming_response`: string - Term used to represent conforming statuses on items within the current template, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Pass`
  - `deficient_response`: string - Term used to represent deficient statuses on items within the current template, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `Fail`
  - `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-11-06T16:17:28Z`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-11-06T16:17:28Z`
- `attachments`: array of object - Checklist Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
- `sections`: array of object - Checklist Sections
  - `id`: integer - ID e.g. `21`
  - `name`: string - Name e.g. `Framing`
  - `position`: integer - Position e.g. `1`
  - `origin_id`: integer - ID of Corresponding Checklist Template Section e.g. `3`
  - `items`: array of object - Checklist Items
    - `id`: integer - ID e.g. `2`
    - `name`: string - Name e.g. `Item 1`
    - `details`: string - Details e.g. `+/- 1 degrees`
    - `status`: string enum[yes, no, n/a, none] - Status e.g. `yes`
    - `responded_with`: string - Representation of an Item's Response e.g. `Safe - Knowledge`
    - `origin_id`: integer - ID of Corresponding Checklist Template Item e.g. `1`
    - `section_id`: integer - Checklist Section ID e.g. `21`
    - `position`: integer - Position e.g. `1`
    - `observations`: array of object - Observations created from the Checklist Item
    - `attachment_histories`: array of object - Item attachment histories
    - `attachments`: array of object - Item attachments
    - `histories`: array of object - Item histories
    - `item_response`: object - Item Response
    - `comments`: array of object - Item comments
    - `response`: object
    - `response_set`: object
    - `type`: object
    - `response_set_id`: integer - Response Set ID e.g. `72`
    - `template_item_id`: integer - Template Item ID e.g. `34`
    - `response_type_id`: integer - Response Type ID e.g. `2`
  - `template_section_id`: integer - Template Section ID e.g. `234`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `managed_equipment_id`: integer - Managed Equipment ID e.g. `234`
- `template_id`: integer - Template ID e.g. `12`
- `list_template_name`: string - List Template Name e.g. `Test Checklist`
- `trade_id`: integer - Trade ID e.g. `288`
- `inspection_type_id`: integer - Inspection Type ID e.g. `76`
- `reinspected_by_id`: string - The ID of the Reinspection that was created from this Inspection e.g. `105`
- `reinspected_from_id`: string - The ID of the Inspection this Inspection was reinspected from (labeled "Origin" in UI) e.g. `58`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/checklist/lists/{id}  **[DEPRECATED]**

**Show Checklist**
Retrieves Inspection Checklist in a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `1445`
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `list_template_id`: integer - Checklist Template ID e.g. `1`
- `name`: string - Name e.g. `Framing List`
- `description`: string - Description e.g. `Checking the framing`
- `distribution_members`: array of object - Users on the Inspection distribution list
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `due_at`: string(date-time) - Timestamp indicating when the Inspection is due e.g. `2019-08-18T23:36:30Z`
- `identifier`: string - Identifier e.g. `176-09B`
- `number`: integer - Number e.g. `1`
- `status`: string enum[Open, Closed] - Status e.g. `Closed`
- `inspection_date`: string(date) - Date that the inspection was performed e.g. `2014-11-06`
- `created_at`: string(date-time) - Timestamp of inspection creation e.g. `2014-11-06T16:17:28Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-11-06T16:17:28Z`
- `closed_at`: string(date-time) - Timestamp of when inspection was closed e.g. `2014-11-06T16:17:28Z`
- `item_count`: integer - Checklist Item count e.g. `1`
- `yes_item_count`: integer - Deprecated. Use `conforming_item_count` e.g. `1`
- `personal`: boolean - Privacy status e.g. `true`
- `item_total`: integer - (Deprecated) Use `item_count` e.g. `1`
- `conforming_item_count`: integer - Count of Checklist Items with a status of `yes` e.g. `1`
- `deficient_item_count`: integer - Count of Checklist Items with a status of `no` e.g. `1`
- `na_item_count`: integer - Count of Checklist Items with a status of `n/a` e.g. `0`
- `neutral_item_count`: integer - Number of Checklist Items with a status of `neutral` e.g. `1`
- `not_inspected_item_count`: integer - Count of Checklist Items that have not been inspected e.g. `0`
- `drawing_ids`: array of integer - Array of Drawing IDs
- `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `specification_section`: object - Specification Section
  - `id`: integer - ID
  - `description`: string - Description
  - `section`: string - Number
  - `latest_revision_url`: string - Url to PDF view
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `closed_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `inspectors`: array of object - Checklist inspectors
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `signature_requests`: array of object - Checklist signature requests
  - `id`: integer - ID e.g. `21`
  - `signatory`: object
    - `id`: integer - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `signature`: object
    - `id`: integer - ID e.g. `5324`
    - `captured_by`: object
    - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
    - `attachment`: object
- `responsible_contractor`: object - Vendor responsible for the work being inspected
  - `id`: integer - ID
  - `name`: string - Name
- `responsible_party`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `response_set`: object
  - `conforming_response`: string - Term used to represent conforming statuses on items within the current template, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Pass`
  - `deficient_response`: string - Term used to represent deficient statuses on items within the current template, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `Fail`
  - `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-11-06T16:17:28Z`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-11-06T16:17:28Z`
- `attachments`: array of object - Checklist Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
- `sections`: array of object - Checklist Sections
  - `id`: integer - ID e.g. `21`
  - `name`: string - Name e.g. `Framing`
  - `position`: integer - Position e.g. `1`
  - `origin_id`: integer - ID of Corresponding Checklist Template Section e.g. `3`
  - `items`: array of object - Checklist Items
    - `id`: integer - ID e.g. `2`
    - `name`: string - Name e.g. `Item 1`
    - `details`: string - Details e.g. `+/- 1 degrees`
    - `status`: string enum[yes, no, n/a, none] - Status e.g. `yes`
    - `responded_with`: string - Representation of an Item's Response e.g. `Safe - Knowledge`
    - `origin_id`: integer - ID of Corresponding Checklist Template Item e.g. `1`
    - `section_id`: integer - Checklist Section ID e.g. `21`
    - `position`: integer - Position e.g. `1`
    - `observations`: array of object - Observations created from the Checklist Item
    - `attachment_histories`: array of object - Item attachment histories
    - `attachments`: array of object - Item attachments
    - `histories`: array of object - Item histories
    - `item_response`: object - Item Response
    - `comments`: array of object - Item comments
    - `response`: object
    - `response_set`: object
    - `type`: object
    - `response_set_id`: integer - Response Set ID e.g. `72`
    - `template_item_id`: integer - Template Item ID e.g. `34`
    - `response_type_id`: integer - Response Type ID e.g. `2`
  - `template_section_id`: integer - Template Section ID e.g. `234`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `managed_equipment_id`: integer - Managed Equipment ID e.g. `234`
- `template_id`: integer - Template ID e.g. `12`
- `list_template_name`: string - List Template Name e.g. `Test Checklist`
- `trade_id`: integer - Trade ID e.g. `288`
- `inspection_type_id`: integer - Inspection Type ID e.g. `76`
- `reinspected_by_id`: string - The ID of the Reinspection that was created from this Inspection e.g. `105`
- `reinspected_from_id`: string - The ID of the Inspection this Inspection was reinspected from (labeled "Origin" in UI) e.g. `58`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/checklist/lists/{id}  **[DEPRECATED]**

**Update Checklist**
Updates Inspection Checklist in a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist ID
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project e.g. `123`
- `list`: object (required)
  - `description`: string - The Description of the Checklist e.g. `Example Checklist Description`
  - `due_at`: string(date-time) - Timestamp indicating when the Inspection is due. e.g. `2019-08-18T23:36:30Z`
  - `inspection_date`: string(date) - The Inspection Date of the Checklist e.g. `2021-09-21T16:43:00Z`
  - `inspection_type_id`: integer - The ID of the Checklist's Type e.g. `34`
  - `point_of_contact_id`: integer - The ID of the Checklist's Point of Contact e.g. `42`
  - `inspectee_id`: integer - The ID of the Checklist's Inspectee e.g. `123`
  - `name`: string - The Name of the Checklist e.g. `Example Checklist`
  - `number`: integer - The Number of the Checklist e.g. `42`
  - `personal`: boolean - The Personal status of the Checklist e.g. `true`
  - `responsible_contractor_id`: integer - The ID of the Checklist's Responsible Contractor e.g. `456`
  - `spec_section_id`: integer - The ID of the Checklist's Specification Section e.g. `789`
  - `status`: string enum[Open, Closed] - The Status of the Checklist e.g. `Open`
  - `trade_id`: integer - The ID of the Checklist's Trade e.g. `123`
  - `sections_attributes`: array of object - An array of hashes of the Checklist's Section attributes
    - `name`: string - The Name of the Section e.g. `Example Section`
    - `position`: integer - The Position of the Section on the Checklist e.g. `1`
    - `items_attributes`: array of object - An array of hashes of the Section's Item attributes
      - `name`: string - The Name of the Item e.g. `Example Checklist Item`
      - `position`: integer - The Position of the Item in the Section e.g. `1`
      - `status`: string enum[yes, no, n/a, none] - The Status of the Item (default to n/a) e.g. `yes`
  - `inspector_ids`: array of integer - An Array of the IDs of the Inspectors e.g. `[123, 456]`
  - `distribution_member_ids`: array of integer - An Array of the IDs of the Distribution Members e.g. `[123, 456]`
  - `location_id`: integer - The ID of the Location of the Checklist. `location_id` takes precedence over `mt_location e.g. `123`
  - `mt_location`: array of string - Use for creating a new multi-tier or single-tier Location. Will be ignored if `location_id` is provided e.g. `["Location 1", "Location 2"]`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`
- `attachments`: array of string - Checklist's Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 200 (application/json): object

- `id`: integer - ID e.g. `1445`
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `list_template_id`: integer - Checklist Template ID e.g. `1`
- `name`: string - Name e.g. `Framing List`
- `description`: string - Description e.g. `Checking the framing`
- `distribution_members`: array of object - Users on the Inspection distribution list
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `due_at`: string(date-time) - Timestamp indicating when the Inspection is due e.g. `2019-08-18T23:36:30Z`
- `identifier`: string - Identifier e.g. `176-09B`
- `number`: integer - Number e.g. `1`
- `status`: string enum[Open, Closed] - Status e.g. `Closed`
- `inspection_date`: string(date) - Date that the inspection was performed e.g. `2014-11-06`
- `created_at`: string(date-time) - Timestamp of inspection creation e.g. `2014-11-06T16:17:28Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-11-06T16:17:28Z`
- `closed_at`: string(date-time) - Timestamp of when inspection was closed e.g. `2014-11-06T16:17:28Z`
- `item_count`: integer - Checklist Item count e.g. `1`
- `yes_item_count`: integer - Deprecated. Use `conforming_item_count` e.g. `1`
- `personal`: boolean - Privacy status e.g. `true`
- `item_total`: integer - (Deprecated) Use `item_count` e.g. `1`
- `conforming_item_count`: integer - Count of Checklist Items with a status of `yes` e.g. `1`
- `deficient_item_count`: integer - Count of Checklist Items with a status of `no` e.g. `1`
- `na_item_count`: integer - Count of Checklist Items with a status of `n/a` e.g. `0`
- `neutral_item_count`: integer - Number of Checklist Items with a status of `neutral` e.g. `1`
- `not_inspected_item_count`: integer - Count of Checklist Items that have not been inspected e.g. `0`
- `drawing_ids`: array of integer - Array of Drawing IDs
- `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `specification_section`: object - Specification Section
  - `id`: integer - ID
  - `description`: string - Description
  - `section`: string - Number
  - `latest_revision_url`: string - Url to PDF view
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `closed_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `inspectors`: array of object - Checklist inspectors
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `signature_requests`: array of object - Checklist signature requests
  - `id`: integer - ID e.g. `21`
  - `signatory`: object
    - `id`: integer - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `signature`: object
    - `id`: integer - ID e.g. `5324`
    - `captured_by`: object
    - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
    - `attachment`: object
- `responsible_contractor`: object - Vendor responsible for the work being inspected
  - `id`: integer - ID
  - `name`: string - Name
- `responsible_party`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `response_set`: object
  - `conforming_response`: string - Term used to represent conforming statuses on items within the current template, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Pass`
  - `deficient_response`: string - Term used to represent deficient statuses on items within the current template, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `Fail`
  - `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-11-06T16:17:28Z`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-11-06T16:17:28Z`
- `attachments`: array of object - Checklist Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
- `sections`: array of object - Checklist Sections
  - `id`: integer - ID e.g. `21`
  - `name`: string - Name e.g. `Framing`
  - `position`: integer - Position e.g. `1`
  - `origin_id`: integer - ID of Corresponding Checklist Template Section e.g. `3`
  - `items`: array of object - Checklist Items
    - `id`: integer - ID e.g. `2`
    - `name`: string - Name e.g. `Item 1`
    - `details`: string - Details e.g. `+/- 1 degrees`
    - `status`: string enum[yes, no, n/a, none] - Status e.g. `yes`
    - `responded_with`: string - Representation of an Item's Response e.g. `Safe - Knowledge`
    - `origin_id`: integer - ID of Corresponding Checklist Template Item e.g. `1`
    - `section_id`: integer - Checklist Section ID e.g. `21`
    - `position`: integer - Position e.g. `1`
    - `observations`: array of object - Observations created from the Checklist Item
    - `attachment_histories`: array of object - Item attachment histories
    - `attachments`: array of object - Item attachments
    - `histories`: array of object - Item histories
    - `item_response`: object - Item Response
    - `comments`: array of object - Item comments
    - `response`: object
    - `response_set`: object
    - `type`: object
    - `response_set_id`: integer - Response Set ID e.g. `72`
    - `template_item_id`: integer - Template Item ID e.g. `34`
    - `response_type_id`: integer - Response Type ID e.g. `2`
  - `template_section_id`: integer - Template Section ID e.g. `234`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `managed_equipment_id`: integer - Managed Equipment ID e.g. `234`
- `template_id`: integer - Template ID e.g. `12`
- `list_template_name`: string - List Template Name e.g. `Test Checklist`
- `trade_id`: integer - Trade ID e.g. `288`
- `inspection_type_id`: integer - Inspection Type ID e.g. `76`
- `reinspected_by_id`: string - The ID of the Reinspection that was created from this Inspection e.g. `105`
- `reinspected_from_id`: string - The ID of the Inspection this Inspection was reinspected from (labeled "Origin" in UI) e.g. `58`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/checklist/lists/{id}  **[DEPRECATED]**

**Delete Checklist**
Deletes Inspection Checklist in a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 204: No Content (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/lists

**List Checklists (Inspections)**
Lists Checklist (Inspections) in a specified Project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[inspection_date]` [query] string(date) - Return item(s) with inspection date within the specified ISO 8601 date range.
- `filters[inspection_type_id]` [query] array of integer - Array of Inspection Type IDs. Return item(s) associated with the specified Inspection Type IDs.
- `filters[inspector_id]` [query] array of integer - Array of User IDs. Return item(s) where the specified User IDs are inspectors.
- `filters[template_id]` [query] array of string - Array of Checklist Template IDs. Return item(s) associated to the specified Checklist Template IDs.
- `filters[location_id]` [query] array of integer - Location ID. Returns item(s) with the specified Location ID or a range of Location IDs.
- `filters[managed_equipment_id]` [query] integer - Return item(s) with the specified Managed Equipment ID.
- `filters[point_of_contact_id]` [query] array of integer - Array of User IDs. Return item(s) where the specified User IDs are the point of contact.
- `filters[spec_section_id]` [query] array of integer - Array of Specification Section IDs. Return item(s) associated to the specified Specification Section IDs.
- `filters[responsible_contractor_id]` [query] array of integer - Array of Vendor IDs. Return item(s) where the specified Vendor IDs are the responsible contractor.
- `filters[closed_by_id]` [query] array of integer - Array of User IDs. Return item(s) closed by the specified User ID.
- `filters[created_by_id]` [query] array of integer - Return item(s) created by the specified User IDs
- `filters[status]` [query] integer - Return item(s) with the specified statuses
- `filters[trade_id]` [query] integer - Trade ID
- `filters[query]` [query] string - Return item(s) containing search query
- `filters[due_at]` [query] string(date-time) - Return item(s) due within the specified date range.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[closed_at]` [query] string(date) - Returns item(s) closed within the specified ISO 8601 datetime range.
- `sort` [query] string enum[created_at, inspection_date, location, name, number, updated_at]

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `42`
- `name`: string - Name e.g. `Window Inspection`
- `list_template_id`: integer - Checklist Template ID from which this Checklist was created e.g. `1`
- `list_template_name`: string - Current name of the Checklist Template from which this Checklist was created e.g. `Window Inspection v2`
- `number`: integer - Number e.g. `1`
- `status`: string enum[Open, In Review, Closed] - Status e.g. `Closed`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `code`: string - Location code e.g. `code`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2017-10-31T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2018-12-11T04:58:42Z`
- `closed_at`: string(date-time) - Timestamp of when inspection was closed e.g. `2018-12-11T04:58:42Z`
- `drawing_ids`: array of integer - Array of Drawing IDs
- `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
- `default_response_phrasing`: object - Conforming/Deficient responses used for items having the default response type
  - `conforming_response`: string - Conforming response of the default response set e.g. `Safe`
  - `deficient_response`: string - Deficient/Non-conforming response of the default response set e.g. `At Risk`
  - `global`: boolean - Boolean flag indicating if the default response phrasing is Procore-provided e.g. `true`
- `description`: string - Description e.g. `Checklist for circular windows`
- `deleted`: boolean - Indicates whether this Checklist has been deleted e.g. `false`
- `due_at`: string(date-time) - Timestamp indicating when the Inspection is due e.g. `2019-08-18T23:36:30Z`
- `inspection_date`: string(date) - Date that the inspection was performed
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `private`: boolean - Indicates whether this Checklist is private e.g. `false`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `closed_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `responsible_contractor`: object - Vendor responsible for the work being inspected
  - `id`: integer - ID e.g. `1`
  - `name`: string - Name e.g. `Freddie's Excavating`
- `point_of_contact`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `inspectors`: array of object - Inspectors
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `distribution_members`: array of object - Distribution Members
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `signature_requests`: array of object - Checklist Signature Requests
  - `id`: integer - ID e.g. `21`
  - `signatory`: object
    - `id`: integer - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `signature`: object
    - `id`: integer - ID e.g. `5324`
    - `captured_by`: object
    - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
    - `attachment`: object
- `managed_equipment_id`: integer - Managed Equipment ID e.g. `1`
- `asset_ids`: array of string - IDs of Assets linked to this Inspection via Related Items e.g. `["01HQRT4MNBV2XJKZ8DPWE3YC5A"]`
- `specification_section`: object - Specification Section
  - `id`: integer - ID e.g. `1`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `section`: string - Number e.g. `08560`
  - `latest_revision_url`: string - Url to PDF view e.g. `link_to_pdf`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename (deprecated) e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
- `conforming_item_count`: integer - Number of Checklist Items with a status of `yes` e.g. `1`
- `deficient_item_count`: integer - Number of Checklist Items with a status of `no` e.g. `1`
- `not_applicable_item_count`: integer - Number of Checklist Items with a status of `n/a` e.g. `0`
- `neutral_item_count`: integer - Number of Checklist Items with a status of `neutral` e.g. `1`
- `inspected_item_count`: integer - Number of Checklist Items that have been inspected e.g. `4`
- `observations_count`: integer - Number of Observations from this Checklist e.g. `2`
- `closed_observations_count`: integer - Number of closed Observations pertaining to the Checklist e.g. `1`
- `item_count`: integer - Number of Checklist Items within the Checklist e.g. `1`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `template_id`: integer - Template ID e.g. `176`
- `overdue`: boolean - Checklist List overdue flag e.g. `true`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/checklist/lists

**Create Checklist (Inspection)**
Creates an instance of Inspection in a given Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `list_template_id`: integer(int64) (required) - ID of the Checklist List Template (Inspection Template) that the Checklist (Inspection) will be created from e.g. `12`
- `list`: object (required)
  - `description`: string - Description of the Inspection e.g. `Ensure proper window installation`
  - `due_at`: string(date-time) - Timestamp indicating when the Inspection is due. e.g. `2019-08-18T23:36:30Z`
  - `inspection_date`: string(date) - Date of the Inspection e.g. `2019-10-31`
  - `inspection_type_id`: integer - The ID of the Inspection's Type e.g. `34`
  - `number`: integer - The Number of the Checklist. If no number is passed in, the next available number will be used. e.g. `42`
  - `managed_equipment_id`: integer - The ID of the Inspection's Managed Equipment e.g. `123`
  - `point_of_contact_id`: integer - The ID of the Inspection's Point of Contact e.g. `12`
  - `inspector_ids`: array of integer - The IDs of the Inspectors performing the Inspection e.g. `[12, 13]`
  - `private`: boolean - Indicates whether this Inspection is private e.g. `true`
  - `responsible_contractor_id`: integer - The ID of the Inspection's Responsible Contractor e.g. `123`
  - `spec_section_id`: integer - The ID of the Inspection's Specification Section e.g. `5`
  - `status`: string enum[open, in_review, closed] - The Inspection's status e.g. `open`
  - `trade_id`: integer - The ID of the Trade involved in the Inspection e.g. `123`
  - `distribution_member_ids`: array of integer - The IDs of the Distribution Members for the Inspection e.g. `[2, 3]`
  - `location_id`: integer - The ID of the Location of the Inspection e.g. `1`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`

Response 201 (application/json): object

- `id`: integer - ID e.g. `42`
- `name`: string - Name e.g. `Window Inspection`
- `list_template_id`: integer - Checklist Template ID from which this Checklist was created e.g. `1`
- `list_template_name`: string - Current name of the Checklist Template from which this Checklist was created e.g. `Window Inspection v2`
- `number`: integer - Number e.g. `1`
- `status`: string enum[Open, In Review, Closed] - Status e.g. `Closed`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `code`: string - Location code e.g. `code`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2017-10-31T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2018-12-11T04:58:42Z`
- `closed_at`: string(date-time) - Timestamp of when inspection was closed e.g. `2018-12-11T04:58:42Z`
- `drawing_ids`: array of integer - Array of Drawing IDs
- `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
- `default_response_phrasing`: object - Conforming/Deficient responses used for items having the default response type
  - `conforming_response`: string - Conforming response of the default response set e.g. `Safe`
  - `deficient_response`: string - Deficient/Non-conforming response of the default response set e.g. `At Risk`
  - `global`: boolean - Boolean flag indicating if the default response phrasing is Procore-provided e.g. `true`
- `description`: string - Description e.g. `Checklist for circular windows`
- `deleted`: boolean - Indicates whether this Checklist has been deleted e.g. `false`
- `due_at`: string(date-time) - Timestamp indicating when the Inspection is due e.g. `2019-08-18T23:36:30Z`
- `inspection_date`: string(date) - Date that the inspection was performed
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `private`: boolean - Indicates whether this Checklist is private e.g. `false`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `closed_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `responsible_contractor`: object - Vendor responsible for the work being inspected
  - `id`: integer - ID e.g. `1`
  - `name`: string - Name e.g. `Freddie's Excavating`
- `point_of_contact`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `inspectors`: array of object - Inspectors
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `distribution_members`: array of object - Distribution Members
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `signature_requests`: array of object - Checklist Signature Requests
  - `id`: integer - ID e.g. `21`
  - `signatory`: object
    - `id`: integer - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `signature`: object
    - `id`: integer - ID e.g. `5324`
    - `captured_by`: object
    - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
    - `attachment`: object
- `managed_equipment_id`: integer - Managed Equipment ID e.g. `1`
- `asset_ids`: array of string - IDs of Assets linked to this Inspection via Related Items e.g. `["01HQRT4MNBV2XJKZ8DPWE3YC5A"]`
- `specification_section`: object - Specification Section
  - `id`: integer - ID e.g. `1`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `section`: string - Number e.g. `08560`
  - `latest_revision_url`: string - Url to PDF view e.g. `link_to_pdf`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename (deprecated) e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
- `conforming_item_count`: integer - Number of Checklist Items with a status of `yes` e.g. `1`
- `deficient_item_count`: integer - Number of Checklist Items with a status of `no` e.g. `1`
- `not_applicable_item_count`: integer - Number of Checklist Items with a status of `n/a` e.g. `0`
- `neutral_item_count`: integer - Number of Checklist Items with a status of `neutral` e.g. `1`
- `inspected_item_count`: integer - Number of Checklist Items that have been inspected e.g. `4`
- `observations_count`: integer - Number of Observations from this Checklist e.g. `2`
- `closed_observations_count`: integer - Number of closed Observations pertaining to the Checklist e.g. `1`
- `item_count`: integer - Number of Checklist Items within the Checklist e.g. `1`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `template_id`: integer - Template ID e.g. `176`
- `overdue`: boolean - Checklist List overdue flag e.g. `true`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/lists/grouped_index

**List Grouped Checklists (Inspections)**
Lists Grouped Checklist (Inspections) in a specified Project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[inspection_date]` [query] string(date) - Return item(s) with inspection date within the specified ISO 8601 date range.
- `filters[inspection_type_id]` [query] array of integer - Array of Inspection Type IDs. Return item(s) associated with the specified Inspection Type IDs.
- `filters[inspector_id]` [query] array of integer - Array of User IDs. Return item(s) where the specified User IDs are inspectors.
- `filters[list_template_id]` [query] array of integer - Array of Checklist Template IDs. Return item(s) associated with the specified Checklist Template IDs.
- `filters[location_id]` [query] array of integer - Location ID. Returns item(s) with the specified Location ID or a range of Location IDs.
- `filters[managed_equipment_id]` [query] integer - Return item(s) with the specified Managed Equipment ID.
- `filters[point_of_contact_id]` [query] array of integer - Array of User IDs. Return item(s) where the specified User IDs are the point of contact.
- `filters[spec_section_id]` [query] array of integer - Array of Specification Section IDs. Return item(s) associated to the specified Specification Section IDs.
- `filters[responsible_contractor_id]` [query] array of integer - Array of Vendor IDs. Return item(s) where the specified Vendor IDs are the responsible contractor.
- `filters[closed_by_id]` [query] array of integer - Array of User IDs. Return item(s) closed by the specified User ID.
- `filters[created_by_id]` [query] array of integer - Return item(s) created by the specified User IDs
- `filters[status]` [query] integer - Return item(s) with the specified statuses
- `filters[trade_id]` [query] integer - Trade ID
- `filters[query]` [query] string - Return item(s) containing search query
- `filters[due_at]` [query] string(date-time) - Return item(s) due within the specified date range.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[closed_at]` [query] string(date) - Returns item(s) closed within the specified ISO 8601 datetime range.
- `sort` [query] string enum[created_at, inspection_date, location, name, number, updated_at]
- `group_by` [query] string enum[created_by, location, status, template, trade, type]

Response 200 (application/json): array of object

- `header`: object - Inspection Template information for grouping
  - `id`: integer - Inspection Template ID e.g. `42`
  - `name`: string - Inspection Template Name e.g. `Window Inspection`
- `data`: array of object - Array of Inspections created from Inspection Template based on header information
  - `id`: integer - ID e.g. `42`
  - `name`: string - Name e.g. `Window Inspection`
  - `list_template_id`: integer - Checklist Template ID from which this Checklist was created e.g. `1`
  - `list_template_name`: string - Current name of the Checklist Template from which this Checklist was created e.g. `Window Inspection v2`
  - `number`: integer - Number e.g. `1`
  - `status`: string enum[Open, In Review, Closed] - Status e.g. `Closed`
  - `location`: object
    - `id`: integer - Location ID e.g. `15504`
    - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
    - `node_name`: string - Location node name e.g. `Electrical Closet`
    - `parent_id`: integer - Location parent id e.g. `788866`
    - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
    - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
    - `code`: string - The unique code for this Location e.g. `L1`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2017-10-31T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2018-12-11T04:58:42Z`
  - `closed_at`: string(date-time) - Timestamp of when inspection was closed e.g. `2018-12-11T04:58:42Z`
  - `default_response_phrasing`: object - Conforming/Deficient responses used for items having the default response type
    - `conforming_response`: string - Conforming response of the default response set e.g. `Safe`
    - `deficient_response`: string - Deficient/Non-conforming response of the default response set e.g. `At Risk`
    - `global`: boolean - Boolean flag indicating if the default response phrasing is Procore-provided e.g. `true`
  - `description`: string - Description e.g. `Checklist for circular windows`
  - `deleted`: boolean - Indicates whether this Checklist has been deleted e.g. `false`
  - `due_at`: string(date-time) - Timestamp indicating when the Inspection is due e.g. `2019-08-18T23:36:30Z`
  - `inspection_date`: string(date) - Date that the inspection was performed
  - `inspection_type`: object
    - `id`: integer - ID e.g. `142`
    - `name`: string - Name e.g. `Safety Compliance`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
    - `audit_transaction_timestamp`: string(date-time) - Timestamp of audit e.g. `2014-12-11T04:58:42Z`
    - `source_id`: integer e.g. `1`
    - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2014-12-11T04:58:42Z`
    - `company_id`: integer - Company ID e.g. `388`
    - `is_deletable`: boolean - Is deletable e.g. `true`
  - `private`: boolean - Indicates whether this Checklist is private e.g. `false`
  - `created_by`: object - Login Information
    - `id`: integer - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `closed_by`: object - Login Information
    - `id`: integer - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `responsible_contractor`: object - Vendor responsible for the work being inspected
    - `id`: integer - ID e.g. `1`
    - `name`: string - Name e.g. `Freddie's Excavating`
  - `point_of_contact`: object - Login Information
    - `id`: integer - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `trade`: object
    - `id`: integer - Trade ID e.g. `999`
    - `name`: string - Trade name e.g. `09 - acoustical panels`
    - `active`: boolean - Trade availability e.g. `true`
    - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
  - `inspectors`: array of object - Inspectors
    - `id`: integer - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `distribution_members`: array of object - Distribution Members
    - `id`: integer - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `signature_requests`: array of object - Checklist Signature Requests
    - `id`: integer - ID e.g. `21`
    - `signatory`: object
    - `signature`: object
  - `managed_equipment_id`: integer - Managed Equipment ID e.g. `1`
  - `asset_ids`: array of string - IDs of Assets linked to this Inspection via Related Items e.g. `["01HQRT4MNBV2XJKZ8DPWE3YC5A"]`
  - `specification_section`: object - Specification Section
    - `id`: integer - ID e.g. `1`
    - `description`: string - Description e.g. `Vinyl Windows`
    - `section`: string - Number e.g. `08560`
    - `latest_revision_url`: string - Url to PDF view e.g. `link_to_pdf`
  - `permissions`: object - User permissions for the specific Inspection
    - `can_edit`: boolean - Flag indicating if the user can edit the specific Inspection
  - `conforming_item_count`: integer - Number of Checklist Items with a status of `yes` e.g. `1`
  - `deficient_item_count`: integer - Number of Checklist Items with a status of `no` e.g. `1`
  - `not_applicable_item_count`: integer - Number of Checklist Items with a status of `n/a` e.g. `0`
  - `neutral_item_count`: integer - Number of Checklist Items with a status of `neutral` e.g. `1`
  - `inspected_item_count`: integer - Number of Checklist Items that have been inspected e.g. `4`
  - `observations_count`: integer - Number of Observations from this Checklist e.g. `2`
  - `closed_observations_count`: integer - Number of closed Observations pertaining to the Checklist e.g. `1`
  - `item_count`: integer - Number of Checklist Items within the Checklist e.g. `1`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
  - `template_id`: integer - Template ID e.g. `445`
  - `overdue`: boolean - Checklist List overdue flag e.g. `false`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/lists/{id}

**Show Checklist (Inspection)**
Returns the specified Checklist (Inspection)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `42`
- `name`: string - Name e.g. `Window Inspection`
- `list_template_id`: integer - Checklist Template ID from which this Checklist was created e.g. `1`
- `list_template_name`: string - Current name of the Checklist Template from which this Checklist was created e.g. `Window Inspection v2`
- `number`: integer - Number e.g. `1`
- `status`: string enum[Open, In Review, Closed] - Status e.g. `Closed`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `code`: string - Location code e.g. `code`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2017-10-31T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2018-12-11T04:58:42Z`
- `closed_at`: string(date-time) - Timestamp of when inspection was closed e.g. `2018-12-11T04:58:42Z`
- `drawing_ids`: array of integer - Array of Drawing IDs
- `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
- `default_response_phrasing`: object - Conforming/Deficient responses used for items having the default response type
  - `conforming_response`: string - Conforming response of the default response set e.g. `Safe`
  - `deficient_response`: string - Deficient/Non-conforming response of the default response set e.g. `At Risk`
  - `global`: boolean - Boolean flag indicating if the default response phrasing is Procore-provided e.g. `true`
- `description`: string - Description e.g. `Checklist for circular windows`
- `deleted`: boolean - Indicates whether this Checklist has been deleted e.g. `false`
- `due_at`: string(date-time) - Timestamp indicating when the Inspection is due e.g. `2019-08-18T23:36:30Z`
- `inspection_date`: string(date) - Date that the inspection was performed
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `private`: boolean - Indicates whether this Checklist is private e.g. `false`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `closed_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `responsible_contractor`: object - Vendor responsible for the work being inspected
  - `id`: integer - ID e.g. `1`
  - `name`: string - Name e.g. `Freddie's Excavating`
- `point_of_contact`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `inspectors`: array of object - Inspectors
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `distribution_members`: array of object - Distribution Members
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `signature_requests`: array of object - Checklist Signature Requests
  - `id`: integer - ID e.g. `21`
  - `signatory`: object
    - `id`: integer - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `signature`: object
    - `id`: integer - ID e.g. `5324`
    - `captured_by`: object
    - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
    - `attachment`: object
- `managed_equipment_id`: integer - Managed Equipment ID e.g. `1`
- `asset_ids`: array of string - IDs of Assets linked to this Inspection via Related Items e.g. `["01HQRT4MNBV2XJKZ8DPWE3YC5A"]`
- `specification_section`: object - Specification Section
  - `id`: integer - ID e.g. `1`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `section`: string - Number e.g. `08560`
  - `latest_revision_url`: string - Url to PDF view e.g. `link_to_pdf`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename (deprecated) e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
- `conforming_item_count`: integer - Number of Checklist Items with a status of `yes` e.g. `1`
- `deficient_item_count`: integer - Number of Checklist Items with a status of `no` e.g. `1`
- `not_applicable_item_count`: integer - Number of Checklist Items with a status of `n/a` e.g. `0`
- `neutral_item_count`: integer - Number of Checklist Items with a status of `neutral` e.g. `1`
- `inspected_item_count`: integer - Number of Checklist Items that have been inspected e.g. `4`
- `observations_count`: integer - Number of Observations from this Checklist e.g. `2`
- `closed_observations_count`: integer - Number of closed Observations pertaining to the Checklist e.g. `1`
- `item_count`: integer - Number of Checklist Items within the Checklist e.g. `1`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `template_id`: integer - Template ID e.g. `176`
- `overdue`: boolean - Checklist List overdue flag e.g. `true`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/checklist/lists/{id}

**Update Checklist (Inspection)**
Updates a specified Checklist (Inspection)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist ID
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `list`: object (required)
  - `name`: string - The Name of the Inspection e.g. `Window Inspection`
  - `description`: string - Description of the Inspection e.g. `Ensure proper window installation`
  - `due_at`: string(date-time) - Timestamp indicating when the Inspection is due. e.g. `2019-08-18T23:36:30Z`
  - `inspection_date`: string(date) - Date of the Inspection e.g. `2019-10-31`
  - `inspection_type_id`: integer - The ID of the Inspection's Type e.g. `34`
  - `number`: integer - The Number of the Checklist. If no number is passed in, the next available number will be used. e.g. `42`
  - `point_of_contact_id`: integer - The ID of the Inspection's Point of Contact e.g. `12`
  - `inspector_ids`: array of integer - The IDs of the Inspectors performing the Inspection e.g. `[12, 13]`
  - `private`: boolean - Indicates whether this Inspection is private e.g. `true`
  - `responsible_contractor_id`: integer - The ID of the Inspection's Responsible Contractor e.g. `123`
  - `spec_section_id`: integer - The ID of the Inspection's Specification Section e.g. `5`
  - `status`: string enum[open, in_review, closed] - The Inspection's status e.g. `open`
  - `trade_id`: integer - The ID of the Trade involved in the Inspection e.g. `123`
  - `distribution_member_ids`: array of integer - The IDs of the Distribution Members for the Inspection e.g. `[2, 3]`
  - `location_id`: integer - The ID of the Location of the Inspection e.g. `1`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `id`: integer - ID e.g. `42`
- `name`: string - Name e.g. `Window Inspection`
- `list_template_id`: integer - Checklist Template ID from which this Checklist was created e.g. `1`
- `list_template_name`: string - Current name of the Checklist Template from which this Checklist was created e.g. `Window Inspection v2`
- `number`: integer - Number e.g. `1`
- `status`: string enum[Open, In Review, Closed] - Status e.g. `Closed`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `code`: string - Location code e.g. `code`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2017-10-31T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2018-12-11T04:58:42Z`
- `closed_at`: string(date-time) - Timestamp of when inspection was closed e.g. `2018-12-11T04:58:42Z`
- `drawing_ids`: array of integer - Array of Drawing IDs
- `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
- `default_response_phrasing`: object - Conforming/Deficient responses used for items having the default response type
  - `conforming_response`: string - Conforming response of the default response set e.g. `Safe`
  - `deficient_response`: string - Deficient/Non-conforming response of the default response set e.g. `At Risk`
  - `global`: boolean - Boolean flag indicating if the default response phrasing is Procore-provided e.g. `true`
- `description`: string - Description e.g. `Checklist for circular windows`
- `deleted`: boolean - Indicates whether this Checklist has been deleted e.g. `false`
- `due_at`: string(date-time) - Timestamp indicating when the Inspection is due e.g. `2019-08-18T23:36:30Z`
- `inspection_date`: string(date) - Date that the inspection was performed
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `private`: boolean - Indicates whether this Checklist is private e.g. `false`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `closed_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `responsible_contractor`: object - Vendor responsible for the work being inspected
  - `id`: integer - ID e.g. `1`
  - `name`: string - Name e.g. `Freddie's Excavating`
- `point_of_contact`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `inspectors`: array of object - Inspectors
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `distribution_members`: array of object - Distribution Members
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `signature_requests`: array of object - Checklist Signature Requests
  - `id`: integer - ID e.g. `21`
  - `signatory`: object
    - `id`: integer - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `signature`: object
    - `id`: integer - ID e.g. `5324`
    - `captured_by`: object
    - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
    - `attachment`: object
- `managed_equipment_id`: integer - Managed Equipment ID e.g. `1`
- `asset_ids`: array of string - IDs of Assets linked to this Inspection via Related Items e.g. `["01HQRT4MNBV2XJKZ8DPWE3YC5A"]`
- `specification_section`: object - Specification Section
  - `id`: integer - ID e.g. `1`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `section`: string - Number e.g. `08560`
  - `latest_revision_url`: string - Url to PDF view e.g. `link_to_pdf`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename (deprecated) e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
- `conforming_item_count`: integer - Number of Checklist Items with a status of `yes` e.g. `1`
- `deficient_item_count`: integer - Number of Checklist Items with a status of `no` e.g. `1`
- `not_applicable_item_count`: integer - Number of Checklist Items with a status of `n/a` e.g. `0`
- `neutral_item_count`: integer - Number of Checklist Items with a status of `neutral` e.g. `1`
- `inspected_item_count`: integer - Number of Checklist Items that have been inspected e.g. `4`
- `observations_count`: integer - Number of Observations from this Checklist e.g. `2`
- `closed_observations_count`: integer - Number of closed Observations pertaining to the Checklist e.g. `1`
- `item_count`: integer - Number of Checklist Items within the Checklist e.g. `1`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `template_id`: integer - Template ID e.g. `176`
- `overdue`: boolean - Checklist List overdue flag e.g. `true`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/checklist/lists/{id}

**Delete Checklist (Inspection)**
Deletes specified Checklist (Inspection)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/checklist/lists/{id}/send_email

**Send Checklist (Inspection) Email**
Send an email for a Checklist (Inspection) in a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `subject`: string - Email Subject e.g. `Description of email`
- `body`: string - Email Body e.g. `Body of email`
- `distribution_ids`: array of integer e.g. `[134, 456]`
- `cc_distribution_ids`: array of integer e.g. `[231, 564]`
- `bcc_distribution_ids`: array of integer e.g. `[105, 106]`

Response 204: OK (no body)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/checklist/lists/{id}

**Show Recycled Checklist (Inspection)**
Returns the specified Recycled Checklist (Inspection)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `42`
- `name`: string - Name e.g. `Window Inspection`
- `list_template_id`: integer - Checklist Template ID from which this Checklist was created e.g. `1`
- `list_template_name`: string - Current name of the Checklist Template from which this Checklist was created e.g. `Window Inspection v2`
- `number`: integer - Number e.g. `1`
- `status`: string enum[Open, In Review, Closed] - Status e.g. `Closed`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `code`: string - Location code e.g. `code`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2017-10-31T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2018-12-11T04:58:42Z`
- `closed_at`: string(date-time) - Timestamp of when inspection was closed e.g. `2018-12-11T04:58:42Z`
- `drawing_ids`: array of integer - Array of Drawing IDs
- `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
- `default_response_phrasing`: object - Conforming/Deficient responses used for items having the default response type
  - `conforming_response`: string - Conforming response of the default response set e.g. `Safe`
  - `deficient_response`: string - Deficient/Non-conforming response of the default response set e.g. `At Risk`
  - `global`: boolean - Boolean flag indicating if the default response phrasing is Procore-provided e.g. `true`
- `description`: string - Description e.g. `Checklist for circular windows`
- `deleted`: boolean - Indicates whether this Checklist has been deleted e.g. `false`
- `due_at`: string(date-time) - Timestamp indicating when the Inspection is due e.g. `2019-08-18T23:36:30Z`
- `inspection_date`: string(date) - Date that the inspection was performed
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `private`: boolean - Indicates whether this Checklist is private e.g. `false`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `closed_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `responsible_contractor`: object - Vendor responsible for the work being inspected
  - `id`: integer - ID e.g. `1`
  - `name`: string - Name e.g. `Freddie's Excavating`
- `point_of_contact`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `inspectors`: array of object - Inspectors
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `distribution_members`: array of object - Distribution Members
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `signature_requests`: array of object - Checklist Signature Requests
  - `id`: integer - ID e.g. `21`
  - `signatory`: object
    - `id`: integer - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `signature`: object
    - `id`: integer - ID e.g. `5324`
    - `captured_by`: object
    - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
    - `attachment`: object
- `managed_equipment_id`: integer - Managed Equipment ID e.g. `1`
- `asset_ids`: array of string - IDs of Assets linked to this Inspection via Related Items e.g. `["01HQRT4MNBV2XJKZ8DPWE3YC5A"]`
- `specification_section`: object - Specification Section
  - `id`: integer - ID e.g. `1`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `section`: string - Number e.g. `08560`
  - `latest_revision_url`: string - Url to PDF view e.g. `link_to_pdf`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename (deprecated) e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
- `conforming_item_count`: integer - Number of Checklist Items with a status of `yes` e.g. `1`
- `deficient_item_count`: integer - Number of Checklist Items with a status of `no` e.g. `1`
- `not_applicable_item_count`: integer - Number of Checklist Items with a status of `n/a` e.g. `0`
- `neutral_item_count`: integer - Number of Checklist Items with a status of `neutral` e.g. `1`
- `inspected_item_count`: integer - Number of Checklist Items that have been inspected e.g. `4`
- `observations_count`: integer - Number of Observations from this Checklist e.g. `2`
- `closed_observations_count`: integer - Number of closed Observations pertaining to the Checklist e.g. `1`
- `item_count`: integer - Number of Checklist Items within the Checklist e.g. `1`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `template_id`: integer - Template ID e.g. `176`
- `overdue`: boolean - Checklist List overdue flag e.g. `true`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/checklist/lists/grouped_index

**List Grouped Recycled Checklists (Inspections)**
Lists Recycled Checklist (Inspections) in a specified Project grouped by a specified attribute. By default the Checklists are grouped by template.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[inspection_date]` [query] string(date) - Return item(s) with inspection date within the specified ISO 8601 date range.
- `filters[inspection_type_id]` [query] array of integer - Array of Inspection Type IDs. Return item(s) associated with the specified Inspection Type IDs.
- `filters[inspector_id]` [query] array of integer - Array of User IDs. Return item(s) where the specified User IDs are inspectors.
- `filters[list_template_id]` [query] array of integer - Array of Checklist Template IDs. Return item(s) associated with the specified Checklist Template IDs.
- `filters[location_id]` [query] array of integer - Location ID. Returns item(s) with the specified Location ID or a range of Location IDs.
- `filters[managed_equipment_id]` [query] integer - Return item(s) with the specified Managed Equipment ID.
- `filters[point_of_contact_id]` [query] array of integer - Array of User IDs. Return item(s) where the specified User IDs are the point of contact.
- `filters[spec_section_id]` [query] array of integer - Array of Specification Section IDs. Return item(s) associated to the specified Specification Section IDs.
- `filters[responsible_contractor_id]` [query] array of integer - Array of Vendor IDs. Return item(s) where the specified Vendor IDs are the responsible contractor.
- `filters[closed_by_id]` [query] array of integer - Array of User IDs. Return item(s) closed by the specified User ID.
- `filters[created_by_id]` [query] array of integer - Return item(s) created by the specified User IDs
- `filters[status]` [query] integer - Return item(s) with the specified statuses
- `filters[trade_id]` [query] integer - Trade ID
- `filters[query]` [query] string - Return item(s) containing search query
- `filters[due_at]` [query] string(date-time) - Return item(s) due within the specified date range.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[closed_at]` [query] string(date) - Returns item(s) closed within the specified ISO 8601 datetime range.
- `sort` [query] string enum[created_at, inspection_date, location, name, number, updated_at]
- `group_by` [query] string enum[created_by, location, status, template, trade, type]

Response 200 (application/json): array of object

- `header`: object - Inspection Template information for grouping
  - `id`: integer - Inspection Template ID e.g. `42`
  - `name`: string - Inspection Template Name e.g. `Window Inspection`
- `data`: array of object - Array of Inspections created from Inspection Template based on header information
  - `id`: integer - ID e.g. `42`
  - `name`: string - Name e.g. `Window Inspection`
  - `list_template_id`: integer - Checklist Template ID from which this Checklist was created e.g. `1`
  - `list_template_name`: string - Current name of the Checklist Template from which this Checklist was created e.g. `Window Inspection v2`
  - `number`: integer - Number e.g. `1`
  - `status`: string enum[Open, In Review, Closed] - Status e.g. `Closed`
  - `location`: object
    - `id`: integer - Location ID e.g. `15504`
    - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
    - `node_name`: string - Location node name e.g. `Electrical Closet`
    - `parent_id`: integer - Location parent id e.g. `788866`
    - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
    - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
    - `code`: string - The unique code for this Location e.g. `L1`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2017-10-31T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2018-12-11T04:58:42Z`
  - `closed_at`: string(date-time) - Timestamp of when inspection was closed e.g. `2018-12-11T04:58:42Z`
  - `default_response_phrasing`: object - Conforming/Deficient responses used for items having the default response type
    - `conforming_response`: string - Conforming response of the default response set e.g. `Safe`
    - `deficient_response`: string - Deficient/Non-conforming response of the default response set e.g. `At Risk`
    - `global`: boolean - Boolean flag indicating if the default response phrasing is Procore-provided e.g. `true`
  - `description`: string - Description e.g. `Checklist for circular windows`
  - `deleted`: boolean - Indicates whether this Checklist has been deleted e.g. `false`
  - `due_at`: string(date-time) - Timestamp indicating when the Inspection is due e.g. `2019-08-18T23:36:30Z`
  - `inspection_date`: string(date) - Date that the inspection was performed
  - `inspection_type`: object
    - `id`: integer - ID e.g. `142`
    - `name`: string - Name e.g. `Safety Compliance`
    - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
    - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
    - `audit_transaction_timestamp`: string(date-time) - Timestamp of audit e.g. `2014-12-11T04:58:42Z`
    - `source_id`: integer e.g. `1`
    - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2014-12-11T04:58:42Z`
    - `company_id`: integer - Company ID e.g. `388`
    - `is_deletable`: boolean - Is deletable e.g. `true`
  - `private`: boolean - Indicates whether this Checklist is private e.g. `false`
  - `created_by`: object - Login Information
    - `id`: integer - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `closed_by`: object - Login Information
    - `id`: integer - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `responsible_contractor`: object - Vendor responsible for the work being inspected
    - `id`: integer - ID e.g. `1`
    - `name`: string - Name e.g. `Freddie's Excavating`
  - `point_of_contact`: object - Login Information
    - `id`: integer - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `trade`: object
    - `id`: integer - Trade ID e.g. `999`
    - `name`: string - Trade name e.g. `09 - acoustical panels`
    - `active`: boolean - Trade availability e.g. `true`
    - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
  - `inspectors`: array of object - Inspectors
    - `id`: integer - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `distribution_members`: array of object - Distribution Members
    - `id`: integer - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `signature_requests`: array of object - Checklist Signature Requests
    - `id`: integer - ID e.g. `21`
    - `signatory`: object
    - `signature`: object
  - `managed_equipment_id`: integer - Managed Equipment ID e.g. `1`
  - `asset_ids`: array of string - IDs of Assets linked to this Inspection via Related Items e.g. `["01HQRT4MNBV2XJKZ8DPWE3YC5A"]`
  - `specification_section`: object - Specification Section
    - `id`: integer - ID e.g. `1`
    - `description`: string - Description e.g. `Vinyl Windows`
    - `section`: string - Number e.g. `08560`
    - `latest_revision_url`: string - Url to PDF view e.g. `link_to_pdf`
  - `permissions`: object - User permissions for the specific Inspection
    - `can_edit`: boolean - Flag indicating if the user can edit the specific Inspection
  - `conforming_item_count`: integer - Number of Checklist Items with a status of `yes` e.g. `1`
  - `deficient_item_count`: integer - Number of Checklist Items with a status of `no` e.g. `1`
  - `not_applicable_item_count`: integer - Number of Checklist Items with a status of `n/a` e.g. `0`
  - `neutral_item_count`: integer - Number of Checklist Items with a status of `neutral` e.g. `1`
  - `inspected_item_count`: integer - Number of Checklist Items that have been inspected e.g. `4`
  - `observations_count`: integer - Number of Observations from this Checklist e.g. `2`
  - `closed_observations_count`: integer - Number of closed Observations pertaining to the Checklist e.g. `1`
  - `item_count`: integer - Number of Checklist Items within the Checklist e.g. `1`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
  - `template_id`: integer - Template ID e.g. `445`
  - `overdue`: boolean - Checklist List overdue flag e.g. `false`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/checklist/lists

**List Recycled Checklists (Inspections)**
Lists Recycled Checklist (Inspections) in a specified Project. See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[inspection_date]` [query] string(date) - Return item(s) with inspection date within the specified ISO 8601 date range.
- `filters[inspection_type_id]` [query] array of integer - Array of Inspection Type IDs. Return item(s) associated with the specified Inspection Type IDs.
- `filters[inspector_id]` [query] array of integer - Array of User IDs. Return item(s) where the specified User IDs are inspectors.
- `filters[template_id]` [query] array of string - Array of Checklist Template IDs. Return item(s) associated to the specified Checklist Template IDs.
- `filters[location_id]` [query] array of integer - Location ID. Returns item(s) with the specified Location ID or a range of Location IDs.
- `filters[managed_equipment_id]` [query] integer - Return item(s) with the specified Managed Equipment ID.
- `filters[point_of_contact_id]` [query] array of integer - Array of User IDs. Return item(s) where the specified User IDs are the point of contact.
- `filters[spec_section_id]` [query] array of integer - Array of Specification Section IDs. Return item(s) associated to the specified Specification Section IDs.
- `filters[responsible_contractor_id]` [query] array of integer - Array of Vendor IDs. Return item(s) where the specified Vendor IDs are the responsible contractor.
- `filters[closed_by_id]` [query] array of integer - Array of User IDs. Return item(s) closed by the specified User ID.
- `filters[created_by_id]` [query] array of integer - Return item(s) created by the specified User IDs
- `filters[status]` [query] integer - Return item(s) with the specified statuses
- `filters[trade_id]` [query] integer - Trade ID
- `filters[query]` [query] string - Return item(s) containing search query
- `filters[due_at]` [query] string(date-time) - Return item(s) due within the specified date range.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[closed_at]` [query] string(date) - Returns item(s) closed within the specified ISO 8601 datetime range.
- `sort` [query] string enum[created_at, inspection_date, location, name, number, updated_at]

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `42`
- `name`: string - Name e.g. `Window Inspection`
- `list_template_id`: integer - Checklist Template ID from which this Checklist was created e.g. `1`
- `list_template_name`: string - Current name of the Checklist Template from which this Checklist was created e.g. `Window Inspection v2`
- `number`: integer - Number e.g. `1`
- `status`: string enum[Open, In Review, Closed] - Status e.g. `Closed`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `code`: string - Location code e.g. `code`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2017-10-31T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2018-12-11T04:58:42Z`
- `closed_at`: string(date-time) - Timestamp of when inspection was closed e.g. `2018-12-11T04:58:42Z`
- `drawing_ids`: array of integer - Array of Drawing IDs
- `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
- `default_response_phrasing`: object - Conforming/Deficient responses used for items having the default response type
  - `conforming_response`: string - Conforming response of the default response set e.g. `Safe`
  - `deficient_response`: string - Deficient/Non-conforming response of the default response set e.g. `At Risk`
  - `global`: boolean - Boolean flag indicating if the default response phrasing is Procore-provided e.g. `true`
- `description`: string - Description e.g. `Checklist for circular windows`
- `deleted`: boolean - Indicates whether this Checklist has been deleted e.g. `false`
- `due_at`: string(date-time) - Timestamp indicating when the Inspection is due e.g. `2019-08-18T23:36:30Z`
- `inspection_date`: string(date) - Date that the inspection was performed
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `private`: boolean - Indicates whether this Checklist is private e.g. `false`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `closed_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `responsible_contractor`: object - Vendor responsible for the work being inspected
  - `id`: integer - ID e.g. `1`
  - `name`: string - Name e.g. `Freddie's Excavating`
- `point_of_contact`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `inspectors`: array of object - Inspectors
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `distribution_members`: array of object - Distribution Members
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `signature_requests`: array of object - Checklist Signature Requests
  - `id`: integer - ID e.g. `21`
  - `signatory`: object
    - `id`: integer - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `signature`: object
    - `id`: integer - ID e.g. `5324`
    - `captured_by`: object
    - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
    - `attachment`: object
- `managed_equipment_id`: integer - Managed Equipment ID e.g. `1`
- `asset_ids`: array of string - IDs of Assets linked to this Inspection via Related Items e.g. `["01HQRT4MNBV2XJKZ8DPWE3YC5A"]`
- `specification_section`: object - Specification Section
  - `id`: integer - ID e.g. `1`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `section`: string - Number e.g. `08560`
  - `latest_revision_url`: string - Url to PDF view e.g. `link_to_pdf`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename (deprecated) e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
- `conforming_item_count`: integer - Number of Checklist Items with a status of `yes` e.g. `1`
- `deficient_item_count`: integer - Number of Checklist Items with a status of `no` e.g. `1`
- `not_applicable_item_count`: integer - Number of Checklist Items with a status of `n/a` e.g. `0`
- `neutral_item_count`: integer - Number of Checklist Items with a status of `neutral` e.g. `1`
- `inspected_item_count`: integer - Number of Checklist Items that have been inspected e.g. `4`
- `observations_count`: integer - Number of Observations from this Checklist e.g. `2`
- `closed_observations_count`: integer - Number of closed Observations pertaining to the Checklist e.g. `1`
- `item_count`: integer - Number of Checklist Items within the Checklist e.g. `1`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `template_id`: integer - Template ID e.g. `176`
- `overdue`: boolean - Checklist List overdue flag e.g. `true`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/checklist/lists/{id}/reopen  **[OLDER VERSION - a newer path version exists below/above]**

**Reopen Checklist (Inspection)**
Reopens the specified Checklist (Inspection) by transitioning its status to `open`. The endpoint is idempotent and returns the full Inspection payload.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `42`
- `name`: string - Name e.g. `Window Inspection`
- `list_template_id`: integer - Checklist Template ID from which this Checklist was created e.g. `1`
- `list_template_name`: string - Current name of the Checklist Template from which this Checklist was created e.g. `Window Inspection v2`
- `number`: integer - Number e.g. `1`
- `status`: string enum[Open, In Review, Closed] - Status e.g. `Closed`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `code`: string - Location code e.g. `code`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2017-10-31T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2018-12-11T04:58:42Z`
- `closed_at`: string(date-time) - Timestamp of when inspection was closed e.g. `2018-12-11T04:58:42Z`
- `drawing_ids`: array of integer - Array of Drawing IDs
- `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
- `default_response_phrasing`: object - Conforming/Deficient responses used for items having the default response type
  - `conforming_response`: string - Conforming response of the default response set e.g. `Safe`
  - `deficient_response`: string - Deficient/Non-conforming response of the default response set e.g. `At Risk`
  - `global`: boolean - Boolean flag indicating if the default response phrasing is Procore-provided e.g. `true`
- `description`: string - Description e.g. `Checklist for circular windows`
- `deleted`: boolean - Indicates whether this Checklist has been deleted e.g. `false`
- `due_at`: string(date-time) - Timestamp indicating when the Inspection is due e.g. `2019-08-18T23:36:30Z`
- `inspection_date`: string(date) - Date that the inspection was performed
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `private`: boolean - Indicates whether this Checklist is private e.g. `false`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `closed_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `responsible_contractor`: object - Vendor responsible for the work being inspected
  - `id`: integer - ID e.g. `1`
  - `name`: string - Name e.g. `Freddie's Excavating`
- `point_of_contact`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `inspectors`: array of object - Inspectors
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `distribution_members`: array of object - Distribution Members
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `signature_requests`: array of object - Checklist Signature Requests
  - `id`: integer - ID e.g. `21`
  - `signatory`: object
    - `id`: integer - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `signature`: object
    - `id`: integer - ID e.g. `5324`
    - `captured_by`: object
    - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
    - `attachment`: object
- `managed_equipment_id`: integer - Managed Equipment ID e.g. `1`
- `asset_ids`: array of string - IDs of Assets linked to this Inspection via Related Items e.g. `["01HQRT4MNBV2XJKZ8DPWE3YC5A"]`
- `specification_section`: object - Specification Section
  - `id`: integer - ID e.g. `1`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `section`: string - Number e.g. `08560`
  - `latest_revision_url`: string - Url to PDF view e.g. `link_to_pdf`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename (deprecated) e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
- `conforming_item_count`: integer - Number of Checklist Items with a status of `yes` e.g. `1`
- `deficient_item_count`: integer - Number of Checklist Items with a status of `no` e.g. `1`
- `not_applicable_item_count`: integer - Number of Checklist Items with a status of `n/a` e.g. `0`
- `neutral_item_count`: integer - Number of Checklist Items with a status of `neutral` e.g. `1`
- `inspected_item_count`: integer - Number of Checklist Items that have been inspected e.g. `4`
- `observations_count`: integer - Number of Observations from this Checklist e.g. `2`
- `closed_observations_count`: integer - Number of closed Observations pertaining to the Checklist e.g. `1`
- `item_count`: integer - Number of Checklist Items within the Checklist e.g. `1`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `template_id`: integer - Template ID e.g. `176`
- `overdue`: boolean - Checklist List overdue flag e.g. `true`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/checklist/lists/{id}/close  **[OLDER VERSION - a newer path version exists below/above]**

**Close Checklist (Inspection)**
Closes the specified Checklist (Inspection) by transitioning its status to `closed`. This is a dedicated endpoint that performs only the close action and does not accept any additional update parameters. Closing an already-closed Inspection is idempotent and returns the Inspection in its current state.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `42`
- `name`: string - Name e.g. `Window Inspection`
- `list_template_id`: integer - Checklist Template ID from which this Checklist was created e.g. `1`
- `list_template_name`: string - Current name of the Checklist Template from which this Checklist was created e.g. `Window Inspection v2`
- `number`: integer - Number e.g. `1`
- `status`: string enum[Open, In Review, Closed] - Status e.g. `Closed`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `code`: string - Location code e.g. `code`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2017-10-31T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2018-12-11T04:58:42Z`
- `closed_at`: string(date-time) - Timestamp of when inspection was closed e.g. `2018-12-11T04:58:42Z`
- `drawing_ids`: array of integer - Array of Drawing IDs
- `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
- `default_response_phrasing`: object - Conforming/Deficient responses used for items having the default response type
  - `conforming_response`: string - Conforming response of the default response set e.g. `Safe`
  - `deficient_response`: string - Deficient/Non-conforming response of the default response set e.g. `At Risk`
  - `global`: boolean - Boolean flag indicating if the default response phrasing is Procore-provided e.g. `true`
- `description`: string - Description e.g. `Checklist for circular windows`
- `deleted`: boolean - Indicates whether this Checklist has been deleted e.g. `false`
- `due_at`: string(date-time) - Timestamp indicating when the Inspection is due e.g. `2019-08-18T23:36:30Z`
- `inspection_date`: string(date) - Date that the inspection was performed
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `private`: boolean - Indicates whether this Checklist is private e.g. `false`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `closed_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `responsible_contractor`: object - Vendor responsible for the work being inspected
  - `id`: integer - ID e.g. `1`
  - `name`: string - Name e.g. `Freddie's Excavating`
- `point_of_contact`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `inspectors`: array of object - Inspectors
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `distribution_members`: array of object - Distribution Members
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `Company ABC`
- `signature_requests`: array of object - Checklist Signature Requests
  - `id`: integer - ID e.g. `21`
  - `signatory`: object
    - `id`: integer - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `signature`: object
    - `id`: integer - ID e.g. `5324`
    - `captured_by`: object
    - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
    - `attachment`: object
- `managed_equipment_id`: integer - Managed Equipment ID e.g. `1`
- `asset_ids`: array of string - IDs of Assets linked to this Inspection via Related Items e.g. `["01HQRT4MNBV2XJKZ8DPWE3YC5A"]`
- `specification_section`: object - Specification Section
  - `id`: integer - ID e.g. `1`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `section`: string - Number e.g. `08560`
  - `latest_revision_url`: string - Url to PDF view e.g. `link_to_pdf`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename (deprecated) e.g. `january_receipt_copy.jpg`
  - `content_type`: string e.g. `application/pdf`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
- `conforming_item_count`: integer - Number of Checklist Items with a status of `yes` e.g. `1`
- `deficient_item_count`: integer - Number of Checklist Items with a status of `no` e.g. `1`
- `not_applicable_item_count`: integer - Number of Checklist Items with a status of `n/a` e.g. `0`
- `neutral_item_count`: integer - Number of Checklist Items with a status of `neutral` e.g. `1`
- `inspected_item_count`: integer - Number of Checklist Items that have been inspected e.g. `4`
- `observations_count`: integer - Number of Observations from this Checklist e.g. `2`
- `closed_observations_count`: integer - Number of closed Observations pertaining to the Checklist e.g. `1`
- `item_count`: integer - Number of Checklist Items within the Checklist e.g. `1`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `template_id`: integer - Template ID e.g. `176`
- `overdue`: boolean - Checklist List overdue flag e.g. `true`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/recycle_bin/checklist/lists/{id}/restore  **[OLDER VERSION - a newer path version exists below/above]**

**Restore Deleted Checklist (Inspection)**
Restores a specified deleted Checklist (Inspection)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Checklist Sections

Resource id: `company-checklist-sections`. Raw spec: `../openapi-raw/company-checklist-sections.json`. Web: https://developers.procore.com/reference/rest/company-checklist-sections?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/checklist/sections

**List Company Checklist Sections**
Returns a list of Checklist Sections for a given Company List Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `list_template_id` [query] integer (required) - Checklist Template ID

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Fall Protection and Perimeter Protection`
- `position`: integer - Position e.g. `2`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/checklist/sections/{id}

**Show Company Checklist Section**
Returns the details for a specified Company Checklist Section

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Checklist Section ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Fall Protection and Perimeter Protection`
- `position`: integer - Position e.g. `2`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/checklist/sections/{id}

**Update Company Checklist Section**
Updates a Checklist Section for a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Checklist Section ID

Request body (application/json) (required):

- `section`: object (required) - Company Checklist section object
  - `name`: string - Name
  - `position`: integer - The position of Section

Response 200 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Fall Protection and Perimeter Protection`
- `position`: integer - Position e.g. `2`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/checklist/sections/{id}

**Delete Company Checklist Section**
Deletes a Checklist Section for a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Checklist Section ID

Response 200: OK (no body)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Checklist Template Sections

Resource id: `company-checklist-template-sections`. Raw spec: `../openapi-raw/company-checklist-template-sections.json`. Web: https://developers.procore.com/reference/rest/company-checklist-template-sections?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/checklist/list_templates/{list_template_id}/sections

**List Company Checklist Template Sections**
Returns a collection of Checklist Sections for a specified Checklist Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `list_template_id` [path] integer (required) - The ID of the Checklist Template

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Fall Protection and Perimeter Protection`
- `position`: integer - Position e.g. `2`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/checklist/list_templates/{list_template_id}/sections

**Create Company Checklist Template Section**
Creates a Company Checklist Section for a specified Checklist Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `list_template_id` [path] integer (required) - The ID of the Checklist Template

Request body (application/json) (required):

- `section`: object (required) - Company Checklist Section object
  - `name`: string - Name e.g. `Fall Protection and Perimeter Protection`
  - `position`: integer - The position of Section e.g. `1`

Response 201 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Fall Protection and Perimeter Protection`
- `position`: integer - Position e.g. `2`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Checklist Templates

Resource id: `company-checklist-templates`. Raw spec: `../openapi-raw/company-checklist-templates.json`. Web: https://developers.procore.com/reference/rest/company-checklist-templates?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/checklist/list_templates

**List Company Checklist Templates**
Returns a collection of Company Checklist Templates for a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[inspection_type_id]` [query] array of integer - Array of Inspection Type IDs. Return item(s) associated with the specified Inspection Type IDs.
- `filters[response_set_id]` [query] array of integer - Array of Item Response Set IDs. Return list template(s) whose items are associated with the given Response Set IDs.
- `filters[query]` [query] string - Return item(s) containing search query
- `filters[trade_id]` [query] integer - Trade ID
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[inspection_type, name, trade]
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Window Inspection`
- `description`: string - Description e.g. `Checklist for windows`
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
  - `audit_transaction_timestamp`: string(date-time) - Timestamp of audit e.g. `2014-12-11T04:58:42Z`
  - `source_id`: integer e.g. `1`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2014-12-11T04:58:42Z`
  - `company_id`: integer - Company ID e.g. `388`
  - `is_deletable`: boolean - Is deletable e.g. `true`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `deletable`: boolean - Deletable e.g. `false`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/checklist/list_templates

**Create Company Checklist Template**
Creates a Company Checklist Template for a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `list_template`: object (required) - Checklist Template object
  - `description`: string - Description
  - `inspection_type_id`: integer - The ID of an Inspection Type
  - `alternative_response_set_id`: integer - The ID of an Alternative Response Set e.g. `1`
  - `name`: string - Name
  - `trade_id`: integer - The ID of a Trade
- `attachments`: array of string(binary) - Checklist Template's Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 201 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Window Inspection`
- `description`: string - Description e.g. `Checklist for windows`
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `alternative_response_set_id`: integer - The ID of the associated Alternative Response Set (if null, the default response set is being used) e.g. `1`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `response_set`: object
  - `conforming_response`: string - Term used to represent conforming statuses on items within the current template, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Safe`
  - `deficient_response`: string - Term used to represent deficient statuses on items within the current template, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `At Risk`
  - `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`
- `sections`: array of object - Sections
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Fall Protection and Perimeter Protection`
  - `position`: integer - Position e.g. `2`
  - `items`: array of object
    - `id`: integer - ID e.g. `2`
    - `name`: string - Name e.g. `Item 1`
    - `section_id`: integer - Checklist Template Section ID e.g. `21`
    - `position`: integer - Position e.g. `1`
    - `response_set`: object

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/checklist/list_templates/{id}

**Show Company Checklist Template**
Returns the details for a specified Company Checklist Template

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Checklist Template ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Window Inspection`
- `description`: string - Description e.g. `Checklist for windows`
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `alternative_response_set_id`: integer - The ID of the associated Alternative Response Set (if null, the default response set is being used) e.g. `12`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `response_set`: object
  - `conforming_response`: string - Term used to represent conforming statuses on items within the current template, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Pass`
  - `deficient_response`: string - Term used to represent deficient statuses on items within the current template, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `Fail`
  - `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`
- `sections`: array of object - Sections
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Fall Protection and Perimeter Protection`
  - `position`: integer - Position e.g. `2`
  - `items`: array of object
    - `id`: integer - ID e.g. `2`
    - `name`: string - Name e.g. `Item 1`
    - `section_id`: integer - Checklist Template Section ID e.g. `21`
    - `position`: integer - Position e.g. `1`
    - `response_set`: object

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/checklist/list_templates/{id}

**Update Company Checklist Template**
Updates a Company Checklist Template for a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Checklist Template ID

Request body (application/json) (required):

- `list_template`: object (required) - Checklist Template object
  - `description`: string - Description
  - `inspection_type_id`: integer - The ID of an Inspection Type
  - `alternative_response_set_id`: integer - The ID of an Alternative Response Set e.g. `1`
  - `name`: string - Name
  - `trade_id`: integer - The ID of a Trade
- `attachments`: array of string(binary) - Checklist Template's Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 200 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Window Inspection`
- `description`: string - Description e.g. `Checklist for windows`
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `alternative_response_set_id`: integer - The ID of the associated Alternative Response Set (if null, the default response set is being used) e.g. `1`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `response_set`: object
  - `conforming_response`: string - Term used to represent conforming statuses on items within the current template, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Safe`
  - `deficient_response`: string - Term used to represent deficient statuses on items within the current template, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `At Risk`
  - `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`
- `sections`: array of object - Sections
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Fall Protection and Perimeter Protection`
  - `position`: integer - Position e.g. `2`
  - `items`: array of object
    - `id`: integer - ID e.g. `2`
    - `name`: string - Name e.g. `Item 1`
    - `section_id`: integer - Checklist Template Section ID e.g. `21`
    - `position`: integer - Position e.g. `1`
    - `response_set`: object

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/checklist/list_templates/{id}

**Delete Company Checklist Template**
Delete a Company Checklist Template

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Checklist Template ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/checklist/list_templates/{id}/use_alternative_response_set

**Add Company Checklist Template Alternative Response Set**
Sets a Company Checklist Template's Response Set to the specified Alternative Response Set.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Company Checklist Template ID
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `alternative_response_set_id`: integer (required) - Alternative Response Set ID e.g. `1`

Response 200 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Window Inspection`
- `description`: string - Description e.g. `Checklist for windows`
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `alternative_response_set_id`: integer - The ID of the associated Alternative Response Set (if null, the default response set is being used) e.g. `1`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `response_set`: object
  - `conforming_response`: string - Term used to represent conforming statuses on items within the current template, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Safe`
  - `deficient_response`: string - Term used to represent deficient statuses on items within the current template, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `At Risk`
  - `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`
- `sections`: array of object - Sections
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Fall Protection and Perimeter Protection`
  - `position`: integer - Position e.g. `2`
  - `items`: array of object
    - `id`: integer - ID e.g. `2`
    - `name`: string - Name e.g. `Item 1`
    - `section_id`: integer - Checklist Template Section ID e.g. `21`
    - `position`: integer - Position e.g. `1`
    - `response_set`: object

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/checklist/list_templates/{id}/remove_alternative_response_set

**Remove Company Checklist Template Alternative Response Set**
Removes a Company Checklist Template's Alternative Response Set, returning the template to the default Response Set

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Company Checklist Template ID
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Window Inspection`
- `description`: string - Description e.g. `Checklist for windows`
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `alternative_response_set_id`: integer - The ID of the associated Alternative Response Set (if null, the default response set is being used) e.g. `12`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `response_set`: object
  - `conforming_response`: string - Term used to represent conforming statuses on items within the current template, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Pass`
  - `deficient_response`: string - Term used to represent deficient statuses on items within the current template, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `Fail`
  - `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`
- `sections`: array of object - Sections
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Fall Protection and Perimeter Protection`
  - `position`: integer - Position e.g. `2`
  - `items`: array of object
    - `id`: integer - ID e.g. `2`
    - `name`: string - Name e.g. `Item 1`
    - `section_id`: integer - Checklist Template Section ID e.g. `21`
    - `position`: integer - Position e.g. `1`
    - `response_set`: object

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/recycle_bin/checklist/list_templates/{id}

**Show Recycled Company Checklist Template**
View the details of a Recycled Company Checklist Template

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Checklist Template ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Window Inspection`
- `description`: string - Description e.g. `Checklist for windows`
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `alternative_response_set_id`: integer - The ID of the associated Alternative Response Set (if null, the default response set is being used) e.g. `12`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `response_set`: object
  - `conforming_response`: string - Term used to represent conforming statuses on items within the current template, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Pass`
  - `deficient_response`: string - Term used to represent deficient statuses on items within the current template, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `Fail`
  - `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`
- `sections`: array of object - Sections
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Fall Protection and Perimeter Protection`
  - `position`: integer - Position e.g. `2`
  - `items`: array of object
    - `id`: integer - ID e.g. `2`
    - `name`: string - Name e.g. `Item 1`
    - `section_id`: integer - Checklist Template Section ID e.g. `21`
    - `position`: integer - Position e.g. `1`
    - `response_set`: object

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/recycle_bin/checklist/list_templates

**List Recycled Company Checklist Templates**
Returns a list of all Recycled Checklist Templates for a given Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Checklist Template ID e.g. `142`
- `name`: string - Checklist Template Name e.g. `Window Inspection`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `description`: string - Checklist Template Description e.g. `Checklist for circular windows`
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
  - `audit_transaction_timestamp`: string(date-time) - Timestamp of audit e.g. `2014-12-11T04:58:42Z`
  - `source_id`: integer e.g. `1`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2014-12-11T04:58:42Z`
  - `company_id`: integer - Company ID e.g. `388`
  - `is_deletable`: boolean - Is deletable e.g. `true`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/recycle_bin/checklist/list_templates/{id}/restore

**Restore a Recycled Company Checklist Template**
Restores the specified Recycled Company Checklist Template

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Checklist Template ID

Response 200: OK (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Inspection Template Item Evidence Configurations

Resource id: `company-inspection-template-item-evidence-configurations`. Raw spec: `../openapi-raw/company-inspection-template-item-evidence-configurations.json`. Web: https://developers.procore.com/reference/rest/company-inspection-template-item-evidence-configurations?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v2.0/companies/{company_id}/inspection_template_items/{template_item_id}/evidence_configuration

**Show a Company Inspection Template Item Evidence Configuration**
Show the specified Company Inspection Template Item Evidence Configuration.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `template_item_id` [path] string (required) - Unique identifier for the inspection template item.

Response 200 (application/json): object

- `data`: object
  - `item_id`: string - Item ID for the Evidence Configuration e.g. `44`
  - `photo`: object
    - `status_ids`: array of string - Array of Inspection Item Status IDs that would trigger the requirement of a Photo
    - `response_option_ids`: array of string - Array of Inspection Response Option IDs that would trigger the requirement of a Photo
  - `observation`: object
    - `status_ids`: array of string - Array of Inspection Item Status IDs that would trigger the requirement of a Observation
    - `response_option_ids`: array of string - Array of Inspection Response Option IDs that would trigger the requirement of a Observation
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Date updated e.g. `2012-10-23T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/inspection_template_items/{template_item_id}/evidence_configuration

**Updates a Company Inspection Template Item Evidence Configuration**
Updates the specified Company Inspection Template Item Evidence Configuration

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `template_item_id` [path] string (required) - Unique identifier for the inspection template item.

Request body (application/json):

- `evidence_configuration`: object (required)
  - `observation`: object
    - `status_ids`: array of string - Array of Company Inspection Template Item Status IDs that would trigger the requirement of an Observation
    - `response_option_ids`: array of string - Array of Inspection Response Option IDs that would trigger the requirement of an Observation
  - `photo`: object
    - `status_ids`: array of string - Array of Company Inspection Template Item Status IDs that would trigger the requirement of a Photo
    - `response_option_ids`: array of string - Array of Inspection Response Option IDs that would trigger the requirement of a Photo

Response 200 (application/json): object

- `data`: object
  - `item_id`: string - Item ID for the Evidence Configuration e.g. `44`
  - `photo`: object
    - `status_ids`: array of string - Array of Inspection Item Status IDs that would trigger the requirement of a Photo
    - `response_option_ids`: array of string - Array of Inspection Response Option IDs that would trigger the requirement of a Photo
  - `observation`: object
    - `status_ids`: array of string - Array of Inspection Item Status IDs that would trigger the requirement of a Observation
    - `response_option_ids`: array of string - Array of Inspection Response Option IDs that would trigger the requirement of a Observation
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Date updated e.g. `2012-10-23T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Inspection Template Item References

Resource id: `company-inspection-template-item-references`. Raw spec: `../openapi-raw/company-inspection-template-item-references.json`. Web: https://developers.procore.com/reference/rest/company-inspection-template-item-references?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/inspection_templates/{inspection_template_id}/item_references

**List Company Inspection Template Item Reference**
Returns a collection of References for a specified Checklist Company Inspection Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `inspection_template_id` [path] integer (required) - The ID of the Company Inspection Template
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return References with the specified IDs
- `filters[item_id]` [query] array of integer - Return Reference(s) with the specified Item IDs and Synced Company Template Item References
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[created_at, updated_at] - Sort item(s) by the chosen param; check below for a list of options. The direction of sorting is ascending by default; for descending sort, insert the - symbol before the param.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `12`
- `template_id`: integer - ID of the associated Company Inspection Template e.g. `54`
- `item_id`: integer - ID of the associated Company Inspection Template Item e.g. `54`
- `payload`: object - Contains specific attributes depending on the type of Reference
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
- `type`: string enum[attachment] - Company Inspection Template Item Reference Type e.g. `attachment`
- `created_at`: string - Time the Company Inspection Template Item Reference was created e.g. `2018-09-20T21:39:40Z`
- `updated_at`: string - Time the Company Inspection Template Item Reference was updated e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/inspection_templates/{inspection_template_id}/item_references

**Create Company Inspection Template Item Reference**
Creates a Company Inspection Template Item Reference for a specified Checklist Template Item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `inspection_template_id` [path] integer (required) - The ID of the Company Inspection Template

Request body (multipart/form-data) (required):

- `template_reference`: object (required)
  - `item_id`: integer (required) - ID of the associated Company Inspection Template Item e.g. `54`
  - `type`: string enum[attachment] (required) - Company Inspection Template Item Reference Type e.g. `attachment`
  - `payload`: object (required) - To upload an attachment you must upload the entire payload as `multipart/form-data` content-type
    - `attachment`: string(binary) - Reference Attachment. To upload an attachment you must upload the entire payload as `multipart/form-data` content-type with the `attachment` file.

Response 201 (application/json): object

- `id`: integer - ID e.g. `12`
- `template_id`: integer - ID of the associated Company Inspection Template e.g. `54`
- `item_id`: integer - ID of the associated Company Inspection Template Item e.g. `54`
- `payload`: object - Contains specific attributes depending on the type of Reference
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
- `type`: string enum[attachment] - Company Inspection Template Item Reference Type e.g. `attachment`
- `created_at`: string - Time the Company Inspection Template Item Reference was created e.g. `2018-09-20T21:39:40Z`
- `updated_at`: string - Time the Company Inspection Template Item Reference was updated e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/inspection_templates/{inspection_template_id}/item_references/{id}

**Show Company Inspection Template Item Reference**
Shows a Company Inspection Template Item Reference

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `inspection_template_id` [path] integer (required) - The ID of the Company Inspection Template
- `id` [path] integer (required) - The ID of the Company Inspection Template Item Reference

Response 200 (application/json): object

- `id`: integer - ID e.g. `12`
- `template_id`: integer - ID of the associated Company Inspection Template e.g. `54`
- `item_id`: integer - ID of the associated Company Inspection Template Item e.g. `54`
- `payload`: object - Contains specific attributes depending on the type of Reference
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
- `type`: string enum[attachment] - Company Inspection Template Item Reference Type e.g. `attachment`
- `created_at`: string - Time the Company Inspection Template Item Reference was created e.g. `2018-09-20T21:39:40Z`
- `updated_at`: string - Time the Company Inspection Template Item Reference was updated e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/inspection_templates/{inspection_template_id}/item_references/{id}

**Delete Company Inspection Template Item Reference**
Deletes a Company Inspection Template Item Reference

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `inspection_template_id` [path] integer (required) - The ID of the Company Inspection Template
- `id` [path] integer (required) - The ID of the Company Inspection Template Item Reference

Response 204: No Content (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Inspection Template Items

Resource id: `company-inspection-template-items`. Raw spec: `../openapi-raw/company-inspection-template-items.json`. Web: https://developers.procore.com/reference/rest/company-inspection-template-items?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/inspection_templates/{inspection_template_id}/items

**List Company Inspection Template Items**
Returns a collection of Checklist Template Items for a specified Checklist Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `inspection_template_id` [path] integer (required) - The ID of the Company Inspection Template
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Item ID e.g. `124`
- `details`: string - Company Item details e.g. `Company Item details`
- `name`: string - Item name e.g. `Item 1`
- `position`: integer - Indicates position for item e.g. `1`
- `section_id`: integer - Inspection Template Section ID e.g. `17`
- `response_set`: object
  - `id`: integer - ID e.g. `1`
  - `name`: string - The name of the Item Response Set e.g. `Safety Responses`
  - `active`: boolean - Indicates whether an Item Response Set is available for use. e.g. `true`
  - `created_at`: string(date-time) - Represents when an Item Response Set was created e.g. `2012-10-02T21:00:00Z`
  - `updated_at`: string(date-time) - Represents when a Item Response Set was last updated e.g. `2012-10-02T21:00:00Z`
  - `responses`: array of object - Responses
    - `id`: integer - ID e.g. `1`
    - `name`: string - The name of the Response e.g. `Safe - Knowledge`
    - `status`: string enum[conforming, non_conforming, not_applicable] - Checklist Item status e.g. `non_conforming`
    - `item_status_id`: integer - Checklist Item Status ID e.g. `1`
  - `deletable`: boolean - Indicates whether a Response Set is deletable. e.g. `true`
  - `procore_standard`: boolean - Indicates whether a Response Set is a Procore standard set. e.g. `false`
- `type`: object - Item Type
  - `id`: integer - Item Type ID e.g. `1`
  - `name`: string - Inspection Item Type name e.g. `default`
  - `category`: string - Inspection Item Type Category e.g. `multiple_choice`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2015-03-19T12:00:00Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/inspection_templates/{inspection_template_id}/items

**Create Company Inspection Template Item**
Creates a Company Inspection Template Item for a specified Checklist Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `inspection_template_id` [path] integer (required) - The ID of the Company Inspection Template

Request body (application/json) (required):

- `inspection_template_item`: object (required) - Inspection Template Item object
  - `name`: string - Name
  - `position`: integer - Item position
  - `section_id`: integer - Response Set ID
  - `type`: string - Item type
  - `response_set_id`: integer - Response Set ID

Response 201 (application/json): object

- `id`: integer - Item ID e.g. `124`
- `details`: string - Company Item details e.g. `Company Item details`
- `name`: string - Item name e.g. `Item 1`
- `position`: integer - Indicates position for item e.g. `1`
- `section_id`: integer - Inspection Template Section ID e.g. `17`
- `response_set`: object
  - `id`: integer - ID e.g. `1`
  - `name`: string - The name of the Item Response Set e.g. `Safety Responses`
  - `active`: boolean - Indicates whether an Item Response Set is available for use. e.g. `true`
  - `created_at`: string(date-time) - Represents when an Item Response Set was created e.g. `2012-10-02T21:00:00Z`
  - `updated_at`: string(date-time) - Represents when a Item Response Set was last updated e.g. `2012-10-02T21:00:00Z`
  - `responses`: array of object - Responses
    - `id`: integer - ID e.g. `1`
    - `name`: string - The name of the Response e.g. `Safe - Knowledge`
    - `status`: string enum[conforming, non_conforming, not_applicable] - Checklist Item status e.g. `non_conforming`
    - `item_status_id`: integer - Checklist Item Status ID e.g. `1`
  - `deletable`: boolean - Indicates whether a Response Set is deletable. e.g. `true`
  - `procore_standard`: boolean - Indicates whether a Response Set is a Procore standard set. e.g. `false`
- `type`: object - Item Type
  - `id`: integer - Item Type ID e.g. `1`
  - `name`: string - Inspection Item Type name e.g. `default`
  - `category`: string - Inspection Item Type Category e.g. `multiple_choice`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2015-03-19T12:00:00Z`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/inspection_templates/{inspection_template_id}/items/{id}

**Show Company Inspection Template Item**
Returns the details for a specified Company Inspection Template Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `inspection_template_id` [path] integer (required) - The ID of the Company Inspection Template
- `id` [path] integer (required) - Company Inspection Template Item ID

Response 200 (application/json): object

- `id`: integer - Item ID e.g. `124`
- `details`: string - Company Item details e.g. `Company Item details`
- `name`: string - Item name e.g. `Item 1`
- `position`: integer - Indicates position for item e.g. `1`
- `section_id`: integer - Inspection Template Section ID e.g. `17`
- `response_set`: object
  - `id`: integer - ID e.g. `1`
  - `name`: string - The name of the Item Response Set e.g. `Safety Responses`
  - `active`: boolean - Indicates whether an Item Response Set is available for use. e.g. `true`
  - `created_at`: string(date-time) - Represents when an Item Response Set was created e.g. `2012-10-02T21:00:00Z`
  - `updated_at`: string(date-time) - Represents when a Item Response Set was last updated e.g. `2012-10-02T21:00:00Z`
  - `responses`: array of object - Responses
    - `id`: integer - ID e.g. `1`
    - `name`: string - The name of the Response e.g. `Safe - Knowledge`
    - `status`: string enum[conforming, non_conforming, not_applicable] - Checklist Item status e.g. `non_conforming`
    - `item_status_id`: integer - Checklist Item Status ID e.g. `1`
  - `deletable`: boolean - Indicates whether a Response Set is deletable. e.g. `true`
  - `procore_standard`: boolean - Indicates whether a Response Set is a Procore standard set. e.g. `false`
- `type`: object - Item Type
  - `id`: integer - Item Type ID e.g. `1`
  - `name`: string - Inspection Item Type name e.g. `default`
  - `category`: string - Inspection Item Type Category e.g. `multiple_choice`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2015-03-19T12:00:00Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/inspection_templates/{inspection_template_id}/items/{id}

**Update Company Inspection Template Item**
Updates a Company Inspection Template Item for a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `inspection_template_id` [path] integer (required) - The ID of the Company Inspection Template
- `id` [path] integer (required) - Company Inspection Template Item ID

Request body (application/json) (required):

- `inspection_template_item`: object (required) - Inspection Template Item object
  - `name`: string - Name
  - `response_set_id`: integer - Response Set ID
  - `type`: string - Item type

Response 200 (application/json): object

- `id`: integer - Item ID e.g. `124`
- `details`: string - Company Item details e.g. `Company Item details`
- `name`: string - Item name e.g. `Item 1`
- `position`: integer - Indicates position for item e.g. `1`
- `section_id`: integer - Inspection Template Section ID e.g. `17`
- `response_set`: object
  - `id`: integer - ID e.g. `1`
  - `name`: string - The name of the Item Response Set e.g. `Safety Responses`
  - `active`: boolean - Indicates whether an Item Response Set is available for use. e.g. `true`
  - `created_at`: string(date-time) - Represents when an Item Response Set was created e.g. `2012-10-02T21:00:00Z`
  - `updated_at`: string(date-time) - Represents when a Item Response Set was last updated e.g. `2012-10-02T21:00:00Z`
  - `responses`: array of object - Responses
    - `id`: integer - ID e.g. `1`
    - `name`: string - The name of the Response e.g. `Safe - Knowledge`
    - `status`: string enum[conforming, non_conforming, not_applicable] - Checklist Item status e.g. `non_conforming`
    - `item_status_id`: integer - Checklist Item Status ID e.g. `1`
  - `deletable`: boolean - Indicates whether a Response Set is deletable. e.g. `true`
  - `procore_standard`: boolean - Indicates whether a Response Set is a Procore standard set. e.g. `false`
- `type`: object - Item Type
  - `id`: integer - Item Type ID e.g. `1`
  - `name`: string - Inspection Item Type name e.g. `default`
  - `category`: string - Inspection Item Type Category e.g. `multiple_choice`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2015-03-19T12:00:00Z`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/inspection_templates/{inspection_template_id}/items/{id}

**Delete Company Inspection Template Item**
Deletes a Company Inspection Template Item for a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `inspection_template_id` [path] integer (required) - The ID of the Company Inspection Template
- `id` [path] integer (required) - Company Inspection Template Item ID

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Inspection Item Attachments

Resource id: `inspection-item-attachments`. Raw spec: `../openapi-raw/inspection-item-attachments.json`. Web: https://developers.procore.com/reference/rest/inspection-item-attachments?version=latest
Product lines: Total Quality and Safety Management

### DELETE /rest/v1.0/projects/{project_id}/inspections/{inspection_id}/item_attachments/{id}

**Delete an Inspection Item Attachment**
Removes the Attachment for a specified Inspection Item on a given Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `inspection_id` [path] integer (required) - Unique identifier for the inspection.
- `id` [path] integer (required) - Item Attachment ID

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Inspection Item Comments

Resource id: `inspection-item-comments`. Raw spec: `../openapi-raw/inspection-item-comments.json`. Web: https://developers.procore.com/reference/rest/inspection-item-comments?version=latest
Product lines: Total Quality and Safety Management

### POST /rest/v1.0/projects/{project_id}/inspections/{inspection_id}/comments

**Creates an Inspection Item Comment**
Adds a new Comment for a specified Inspection Item on a given Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `inspection_id` [path] integer (required) - Unique identifier for the inspection.

Response 201 (application/json): object

- `id`: integer - ID e.g. `1137`
- `body`: string - Comment body e.g. `There is more paint splatter on the top of the window frame.`
- `item_id`: integer - Checklist Item ID e.g. `8637`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2021-08-20T23:36:30Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `company_name`: string - User Company name e.g. `Builders Inc.`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Inspection Item Evidence Configurations

Resource id: `inspection-item-evidence-configurations`. Raw spec: `../openapi-raw/inspection-item-evidence-configurations.json`. Web: https://developers.procore.com/reference/rest/inspection-item-evidence-configurations?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/inspection_items/{item_id}/evidence_configuration

**Get a list of Inspection Item Evidence Configurations**
Get a list of Inspection Item Evidence Configurations for a specified Inspection Item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `item_id` [path] string (required) - Unique identifier for the inspection item.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of string - Return Item Evidence Configuration(s) with the specified IDs

Response 200 (application/json): object

- `data`: array of object - Array of Inspection Item Evidence Configurations
  - `item_id`: string - Item ID for the Evidence Configuration e.g. `44`
  - `photo`: object
    - `status_ids`: array of string - Array of Inspection Item Status IDs that would trigger the requirement of a Photo
    - `response_option_ids`: array of string - Array of Inspection Response Option IDs that would trigger the requirement of a Photo
  - `observation`: object
    - `status_ids`: array of string - Array of Inspection Item Status IDs that would trigger the requirement of a Observation
    - `response_option_ids`: array of string - Array of Inspection Response Option IDs that would trigger the requirement of a Observation
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Date updated e.g. `2012-10-23T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Inspection Item References

Resource id: `inspection-item-references`. Raw spec: `../openapi-raw/inspection-item-references.json`. Web: https://developers.procore.com/reference/rest/inspection-item-references?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/inspections/{inspection_id}/item_references

**List Inspection Item References**
Returns a collection of Item References for a specified Inspection Item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `inspection_id` [path] integer (required) - Unique identifier for the inspection.
- `filters[id]` [query] array of integer - Return References with the specified IDs
- `filters[item_id]` [query] array of integer - Return Reference(s) with the specified Item IDs
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[created_at, updated_at] - Sort item(s) by the chosen param; check below for a list of options. The direction of sorting is ascending by default; for descending sort, insert the - symbol before the param.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `12`
- `template_id`: integer - ID of the associated Project Inspection Template e.g. `54`
- `item_id`: integer - ID of the associated Project Inspection Template Item e.g. `54`
- `payload`: object - Contains specific attributes depending on the type of Reference
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
- `type`: string enum[attachment] - Project Inspection Template Item Reference Type e.g. `attachment`
- `created_at`: string - Time the Project Inspection Template Item Reference was created e.g. `2018-09-20T21:39:40Z`
- `updated_at`: string - Time the Project Inspection Template Item Reference was updated e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Inspection Item Signature Requests

Resource id: `inspection-item-signature-requests`. Raw spec: `../openapi-raw/inspection-item-signature-requests.json`. Web: https://developers.procore.com/reference/rest/inspection-item-signature-requests?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/inspection_items/{item_id}/signature_requests

**Get a list of Inspection Item Signature Requests**
Get a list of Inspection Item Signature Requests for a specified Inspection.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `item_id` [path] string (required) - Unique identifier for the inspection item.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of string - Return Signature Request(s) with the specified IDs

Response 200 (application/json): object

- `data`: array of object - Array of Inspection Item Signature Requests
  - `id`: string - ID e.g. `21`
  - `requested_by_id`: string - Party ID of the user who requested the signature e.g. `44`
  - `signatory`: object
    - `id`: string - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `signature`: object
    - `id`: string - ID e.g. `5324`
    - `captured_by`: object
    - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
    - `attachment`: object

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/inspection_items/{item_id}/signature_requests

**Creates a Inspection Item Signature Request**
Creates a Inspection Item Signature Request for a specified Inspection.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `item_id` [path] string (required) - Unique identifier for the inspection item.

Request body (application/json):

- `signature_request`: object
  - `signatory_id`: string (required) - Party ID of the signatory e.g. `44`

Response 201 (application/json): object

- `data`: object
  - `id`: string - ID e.g. `21`
  - `requested_by_id`: string - Party ID of the user who requested the signature e.g. `44`
  - `signatory`: object
    - `id`: string - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `signature`: object
    - `id`: string - ID e.g. `5324`
    - `captured_by`: object
    - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
    - `attachment`: object

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/inspection_items/{item_id}/signature_requests/{id}

**Show a Inspection Item Signature Request**
Show the specified Inspection Item Signature Request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `item_id` [path] string (required) - Unique identifier for the inspection item.
- `id` [path] string (required) - Unique identifier of the Inspection Item Signature

Response 200 (application/json): object

- `data`: object
  - `id`: string - ID e.g. `21`
  - `requested_by_id`: string - Party ID of the user who requested the signature e.g. `44`
  - `signatory`: object
    - `id`: string - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `signature`: object
    - `id`: string - ID e.g. `5324`
    - `captured_by`: object
    - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
    - `attachment`: object

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/inspection_items/{item_id}/signature_requests/{id}

**Deletes an Inspection Item Signature Request**
Deletes the specified Inspection Item Signature Request

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `item_id` [path] string (required) - Unique identifier for the inspection item.
- `id` [path] string (required) - Unique identifier of the Inspection Item Signature

Response 204: No Content (no body)

Error responses: 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/inspection_items/{item_id}/signature_requests/find_or_create

**Finds or Creates a Inspection Item Signature Request**
Tries to find a Inspection Item Signature Request for a specified Inspection, creates one if it doesn't exist.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `item_id` [path] string (required) - Unique identifier for the inspection item.

Request body (application/json):

- `signature_request`: object
  - `signatory_id`: string (required) - Party ID of the signatory e.g. `44`

Response 200 (application/json): object

- `data`: object
  - `id`: string - ID e.g. `21`
  - `requested_by_id`: string - Party ID of the user who requested the signature e.g. `44`
  - `signatory`: object
    - `id`: string - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `signature`: object
    - `id`: string - ID e.g. `5324`
    - `captured_by`: object
    - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
    - `attachment`: object

Response 201 (application/json): object

- `data`: object
  - `id`: string - ID e.g. `21`
  - `requested_by_id`: string - Party ID of the user who requested the signature e.g. `44`
  - `signatory`: object
    - `id`: string - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `signature`: object
    - `id`: string - ID e.g. `5324`
    - `captured_by`: object
    - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
    - `attachment`: object

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Inspection Item Signatures

Resource id: `inspection-item-signatures`. Raw spec: `../openapi-raw/inspection-item-signatures.json`. Web: https://developers.procore.com/reference/rest/inspection-item-signatures?version=latest
Product lines: Total Quality and Safety Management

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/inspection_items/{item_id}/signature_requests/{id}/signature

**Creates a Inspection Item Signature Request**
Creates a Inspection Item Signature Request for a specified Inspection.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `item_id` [path] string (required) - Unique identifier for the inspection item.
- `id` [path] string (required) - Unique identifier for the inspection item signature request.

Request body (application/json):

- oneOf(object | object)

Response 201 (application/json): object

- `data`: object
  - `id`: string - ID e.g. `5324`
  - `captured_by`: object
    - `id`: string - The unique identifier of the user. e.g. `160586`
    - `login`: string - The email address of the user that is used to log in. e.g. `exampleuser@example.com`
    - `name`: string - The name of the user. e.g. `Carl the Contractor`
    - `company_name`: string - User's Company Name e.g. `Company ABC`
  - `captured_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
  - `attachment`: object
    - `id`: string - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
    - `name`: string - Attachment name e.g. `january_receipt_copy.jpg`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/inspection_items/{item_id}/signature_requests/{id}/signature

**Deletes an Inspection Item Signature**
Deletes an Inspection Item Signature for a specified Inspection Item Signature Request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `item_id` [path] string (required) - Unique identifier for the inspection item.
- `id` [path] string (required) - Unique identifier for the inspection item signature request.

Response 204: No Content (no body)

Error responses: 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Inspection Reinspections

Resource id: `inspection-reinspections`. Raw spec: `../openapi-raw/inspection-reinspections.json`. Web: https://developers.procore.com/reference/rest/inspection-reinspections?version=latest
Product lines: Total Quality and Safety Management

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/inspections/{inspection_id}/reinspections

**Create Reinspections**
Creates a Reinspection for an Inspection

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `inspection_id` [path] string (required) - Unique identifier for the inspection.

Request body (application/json):

- object

Response 200 (application/json): object

- `data`: object
  - `id`: string - ID of the Inspection e.g. `1`
  - `name`: string - Name of the Inspection e.g. `Safety Inspection`
  - `description`: string - Description of the Inspection e.g. `Ensure proper window installation`
  - `due_at`: string(date-time) - Timestamp indicating when the Inspection is due. e.g. `2019-08-18T23:36:30Z`
  - `identifier`: string - Identifier of the Inspection e.g. `W-123`
  - `inspection_template_id`: string - The ID of the Inspection Template e.g. `123`
  - `inspection_date`: string(date) - Date of the Inspection e.g. `2019-10-31`
  - `inspection_type_id`: string - The ID of the Inspection's Type e.g. `34`
  - `inspector_ids`: array of string - The IDs of the Inspectors performing the Inspection e.g. `["12", "13"]`
  - `private`: boolean - Indicates whether this Inspection is private e.g. `true`
  - `spec_section_id`: string - The ID of the Inspection's Specification Section e.g. `5`
  - `status`: string enum[open, in_review, closed] - The Inspection's status e.g. `open`
  - `trade_id`: string - The ID of the Trade involved in the Inspection e.g. `123`
  - `distribution_member_ids`: array of string - The IDs of the Distribution Members for the Inspection e.g. `["2", "3"]`
  - `location_id`: string - The ID of the Location of the Inspection e.g. `1`
  - `equipment_id`: string - The ID of the Equipment e.g. `1`
  - `asset_ids`: array of string - IDs of Assets linked to this Inspection via Related Items e.g. `["01HQRT4MNBV2XJKZ8DPWE3YC5A"]`
  - `reinspected_by_id`: string - The ID of the Reinspection that was created from this Inspection e.g. `105`
  - `reinspected_from_id`: string - The ID of the Inspection this Inspection was reinspected from (labeled "Origin" in UI) e.g. `58`
  - `attachments`: array of object - Array of Inspection Attachments
    - `id`: string - ID e.g. `5324`
    - `content_type`: string e.g. `application/pdf`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
    - `name`: string - Filename e.g. `january_receipt_copy.jpg`
    - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `url`: string - URL e.g. `http://www.example.com/`

Error responses: 401, 403, 404, 409, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/inspections/{inspection_id}/active_reinspection

**Get Active Reinspection**
Get the active reinspection for an inspection.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `inspection_id` [path] string (required) - Unique identifier for the inspection.

Response 200 (application/json): object

- `data`: object
  - `id`: string - ID of the Inspection e.g. `1`
  - `name`: string - Name of the Inspection e.g. `Safety Inspection`
  - `description`: string - Description of the Inspection e.g. `Ensure proper window installation`
  - `due_at`: string(date-time) - Timestamp indicating when the Inspection is due. e.g. `2019-08-18T23:36:30Z`
  - `identifier`: string - Identifier of the Inspection e.g. `W-123`
  - `inspection_template_id`: string - The ID of the Inspection Template e.g. `123`
  - `inspection_date`: string(date) - Date of the Inspection e.g. `2019-10-31`
  - `inspection_type_id`: string - The ID of the Inspection's Type e.g. `34`
  - `inspector_ids`: array of string - The IDs of the Inspectors performing the Inspection e.g. `["12", "13"]`
  - `private`: boolean - Indicates whether this Inspection is private e.g. `true`
  - `spec_section_id`: string - The ID of the Inspection's Specification Section e.g. `5`
  - `status`: string enum[open, in_review, closed] - The Inspection's status e.g. `open`
  - `trade_id`: string - The ID of the Trade involved in the Inspection e.g. `123`
  - `distribution_member_ids`: array of string - The IDs of the Distribution Members for the Inspection e.g. `["2", "3"]`
  - `location_id`: string - The ID of the Location of the Inspection e.g. `1`
  - `equipment_id`: string - The ID of the Equipment e.g. `1`
  - `asset_ids`: array of string - IDs of Assets linked to this Inspection via Related Items e.g. `["01HQRT4MNBV2XJKZ8DPWE3YC5A"]`
  - `reinspected_by_id`: string - The ID of the Reinspection that was created from this Inspection e.g. `105`
  - `reinspected_from_id`: string - The ID of the Inspection this Inspection was reinspected from (labeled "Origin" in UI) e.g. `58`
  - `attachments`: array of object - Array of Inspection Attachments
    - `id`: string - ID e.g. `5324`
    - `content_type`: string e.g. `application/pdf`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
    - `name`: string - Filename e.g. `january_receipt_copy.jpg`
    - `thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `url`: string - URL e.g. `http://www.example.com/`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Inspection Types

Resource id: `inspection-types`. Raw spec: `../openapi-raw/inspection-types.json`. Web: https://developers.procore.com/reference/rest/inspection-types?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/inspection_types

**List Inspection Types**
Return a list of all Inspection Types associated with a Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Safety Compliance`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `audit_transaction_timestamp`: string(date-time) - Timestamp of audit e.g. `2014-12-11T04:58:42Z`
- `source_id`: integer e.g. `1`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2014-12-11T04:58:42Z`
- `company_id`: integer - Company ID e.g. `388`
- `is_deletable`: boolean - Is deletable e.g. `true`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/inspection_types

**Create Inspection Type**
Create an Inspection Type for a Company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `inspection_type`: object (required) - Inspection Type object
  - `name`: string - Name

Response 201 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Safety Compliance`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `audit_transaction_timestamp`: string(date-time) - Timestamp of audit e.g. `2014-12-11T04:58:42Z`
- `source_id`: integer e.g. `1`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2014-12-11T04:58:42Z`
- `company_id`: integer - Company ID e.g. `388`
- `is_deletable`: boolean - Is deletable e.g. `true`

Error responses: 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/inspection_types/{id}

**Show Inspection Type**
Returns the details for a specified Inspection Type

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Inspection Type ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Safety Compliance`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `audit_transaction_timestamp`: string(date-time) - Timestamp of audit e.g. `2014-12-11T04:58:42Z`
- `source_id`: integer e.g. `1`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2014-12-11T04:58:42Z`
- `company_id`: integer - Company ID e.g. `388`
- `is_deletable`: boolean - Is deletable e.g. `true`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/inspection_types/{id}

**Update Inspection Type**
Updates an Inspection Type for a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Inspection Type ID

Request body (application/json) (required):

- `inspection_type`: object (required) - Inspection Type object
  - `name`: string - Name

Response 200 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Safety Compliance`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `audit_transaction_timestamp`: string(date-time) - Timestamp of audit e.g. `2014-12-11T04:58:42Z`
- `source_id`: integer e.g. `1`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2014-12-11T04:58:42Z`
- `company_id`: integer - Company ID e.g. `388`
- `is_deletable`: boolean - Is deletable e.g. `true`

Error responses: 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/inspection_types/{id}

**Delete Inspection Type**
Deletes an Inspection Type for a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Inspection Type ID

Response 204: No Content (no body)

Error responses: 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Inspection Users

Resource id: `inspection-users`. Raw spec: `../openapi-raw/inspection-users.json`. Web: https://developers.procore.com/reference/rest/inspection-users?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.1/projects/{project_id}/checklist/users

**List Inspection Users**
Returns a list of Inspection Users for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[vendor_id]` [query] integer - Return item(s) with the specified Vendor ID.
- `filters[potential_assignee]` [query] boolean - Returns item(s) with the that can be potential inspection assignees.
- `filters[potential_distribution_member]` [query] boolean - Returns item(s) that can be potential distribution members.
- `filters[potential_point_of_contact]` [query] boolean - Returns item(s) with the that can be potential inspection points of contact.
- `filters[potential_signatory]` [query] boolean - When true, returns only users eligible to sign an inspection.
- `filters[inspection_id]` [query] integer - Scopes signatory evaluation to a specific inspection. Closed inspections return no signatories. When the ID is unknown, falls back to project-wide evaluation.
- `sort` [query] string enum[name] - Sort the collection by full name. Ascending by default; prefix the value with a hyphen (`-name`) to sort descending.
- `view` [query] string enum[compact, normal] - Specifies which view of the resource to return (which attributes should be present in the response). The default view is normal.

Response 200 (application/json): array of object

- `id`: integer - User ID e.g. `21`
- `login`: string - Email e.g. `carl.contractor@example.com`
- `name`: string - User's Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `potential_assignee`: boolean - Represents whether or not a user can be an Assignee for an Inspection. e.g. `true`
- `potential_point_of_contact`: boolean - Represents whether or not a user can be a Point of Contact for an Inspection. e.g. `true`
- `potential_distribution_member`: boolean - Represents whether or not a user can be a Distribution Member for an Inspection.
- `potential_signatory`: boolean - Indicates whether the user is eligible to sign an inspection. When filters[inspection_id] is provided, evaluated in that inspection's scope (closed inspections yield false for all users). When omitted, reflects projec... e.g. `true`
- `potential_signatory_as_creator`: boolean - Indicates whether the user may sign as the inspection creator. Only present when no filters[inspection_id] is provided; clients should apply the creator check themselves. Always true when potential_signatory is true. e.g. `true`
- `potential_signatory_as_assignee`: boolean - Indicates whether the user may sign as an inspection assignee. Only present when no filters[inspection_id] is provided; clients should apply the assignee check themselves. Always true when potential_signatory is true. e.g. `true`
- `default_distribution_member`: boolean - Represents whether or not a user is a Default Distribution Member for Inspections.
- `custom_fields`: object
  - `custom_field_%{custom_field_decimal_definition_id}`: boolean - Represents whether or not the user has read access to the Custom Field e.g. `true`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Item Response Set Responses

Resource id: `item-response-set-responses`. Raw spec: `../openapi-raw/item-response-set-responses.json`. Web: https://developers.procore.com/reference/rest/item-response-set-responses?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/checklist/item/response_sets/{response_set_id}/responses

**List Responses in the Specified Item Response Set**
List Responses for an Item Response Set.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `response_set_id` [path] integer (required) - The ID of the Response Set
- `filters[corresponding_status]` [query] array of string enum[yes, no, n/a] - Array of Corresponding Statuses. Return item(s) with the specified Corresponding Statuses - 'yes', 'no', or 'n/a'.
- `sort` [query] string enum[corresponding_status, name]

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `1`
- `item_status_id`: integer - Checklist Item Status ID e.g. `1`
- `name`: string - The name of the Response e.g. `Safe - Knowledge`
- `corresponding_status`: string enum[yes, no, n/a] - Corresponding Checklist Item status e.g. `yes`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/checklist/item/response_sets/{response_set_id}/responses

**Create a Response in the Specified Item Response Set**
Creates a Response for a specified Item Response Set.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `response_set_id` [path] integer (required) - The ID of the Response Set

Request body (application/json) (required):

- `response`: object - Response object
  - `name`: string (required) - Name of the Response e.g. `Safe - Knowledge`
  - `corresponding_status`: string enum[yes, no, n/a] (required) - Item Status that the Response corresponds to e.g. `yes`

Response 201 (application/json): object

- `id`: integer - ID e.g. `1`
- `item_status_id`: integer - Checklist Item Status ID e.g. `1`
- `name`: string - The name of the Response e.g. `Safe - Knowledge`
- `corresponding_status`: string enum[yes, no, n/a] - Corresponding Checklist Item status e.g. `yes`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/checklist/item/response_sets/{response_set_id}/responses/{id}

**Show Item Response Set Response**
Returns a specified Response from the Item Response Set.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `response_set_id` [path] integer (required) - Checklist Item Response Set ID
- `id` [path] integer (required) - The ID of the Response

Response 200 (application/json): object

- `id`: integer - ID e.g. `1`
- `item_status_id`: integer - Checklist Item Status ID e.g. `1`
- `name`: string - The name of the Response e.g. `Safe - Knowledge`
- `corresponding_status`: string enum[yes, no, n/a] - Corresponding Checklist Item status e.g. `yes`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/checklist/item/response_sets/{response_set_id}/responses/{id}

**Add an existing Response to an Item Response Set**
Adds an existing Response to the specified Item Response Set.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `response_set_id` [path] integer (required) - Checklist Item Response Set ID
- `id` [path] integer (required) - The ID of the Response

Response 200 (application/json): object

- `id`: integer - ID e.g. `1`
- `item_status_id`: integer - Checklist Item Status ID e.g. `1`
- `name`: string - The name of the Response e.g. `Safe - Knowledge`
- `corresponding_status`: string enum[yes, no, n/a] - Corresponding Checklist Item status e.g. `yes`

Error responses: 400, 401, 403, 404, 409, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/checklist/item/response_sets/{response_set_id}/responses/{id}

**Remove a Response from an Item Response Set**
Remove a Response from an Item Response Set.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `response_set_id` [path] integer (required) - Checklist Item Response Set ID
- `id` [path] integer (required) - The ID of the Response

Response 200: OK (no body)

Error responses: 400, 401, 403, 404, 409, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Item Response Sets

Resource id: `item-response-sets`. Raw spec: `../openapi-raw/item-response-sets.json`. Web: https://developers.procore.com/reference/rest/item-response-sets?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/checklist/item/response_sets

**List Item Response Sets**
List Checklist Item Response Sets for a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `sort` [query] string enum[name]
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[active]` [query] boolean - If true, returns item(s) with a status of 'active'.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `1`
- `name`: string - The name of the Item Response Set e.g. `Safety Responses`
- `active`: boolean - Indicates whether an Item Response Set is available for use. e.g. `true`
- `created_at`: string(date-time) - Represents when an Item Response Set was created e.g. `2012-10-02T21:00:00Z`
- `updated_at`: string(date-time) - Represents when a Item Response Set was last updated e.g. `2012-10-02T21:00:00Z`
- `responses`: array of object - Responses
  - `id`: integer - ID e.g. `1`
  - `item_status_id`: integer - Checklist Item Status ID e.g. `1`
  - `name`: string - The name of the Response e.g. `Safe - Knowledge`
  - `corresponding_status`: string enum[yes, no, n/a] - Corresponding Checklist Item status e.g. `yes`
- `in_use`: boolean - Indicates whether a Response Set is being used by an Inspection Template Item e.g. `false`
- `deletable`: boolean - Indicates whether a Response Set is deletable. e.g. `true`
- `procore_standard`: boolean - Indicates whether a Response Set is a Procore standard set. e.g. `false`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/checklist/item/response_sets

**Create Item Response Set**
Creates a Company Checklist Item Response Set for a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `response_set`: object (required) - Item Response Set object
  - `name`: string (required) - Name of the Response Set e.g. `Safety Responses`
  - `active`: boolean - Indicates whether a Response Set is available for use e.g. `true`
  - `memberships_attributes`: array of object - Array of Response Set Memberships (Responses)
    - `response_attributes`: object - Response to be included in the Response Set
      - `name`: string (required) - Name of the Response e.g. `Safe - Knowledge`
      - `corresponding_status`: string enum[yes, no, n/a] (required) - Item Status that the Response corresponds to e.g. `yes`

Response 201 (application/json): object

- `id`: integer - ID e.g. `1`
- `name`: string - The name of the Item Response Set e.g. `Safety Responses`
- `active`: boolean - Indicates whether an Item Response Set is available for use. e.g. `true`
- `created_at`: string(date-time) - Represents when an Item Response Set was created e.g. `2012-10-02T21:00:00Z`
- `updated_at`: string(date-time) - Represents when a Item Response Set was last updated e.g. `2012-10-02T21:00:00Z`
- `responses`: array of object - Responses
  - `id`: integer - ID e.g. `1`
  - `item_status_id`: integer - Checklist Item Status ID e.g. `1`
  - `name`: string - The name of the Response e.g. `Safe - Knowledge`
  - `corresponding_status`: string enum[yes, no, n/a] - Corresponding Checklist Item status e.g. `yes`
- `in_use`: boolean - Indicates whether a Response Set is being used by an Inspection Template Item e.g. `false`
- `deletable`: boolean - Indicates whether a Response Set is deletable. e.g. `true`
- `procore_standard`: boolean - Indicates whether a Response Set is a Procore standard set. e.g. `false`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/checklist/item/response_sets/{id}

**Show Item Response Set**
Returns a specified Checklist Item Response Set.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Item Response Set ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `1`
- `name`: string - The name of the Item Response Set e.g. `Safety Responses`
- `active`: boolean - Indicates whether an Item Response Set is available for use. e.g. `true`
- `created_at`: string(date-time) - Represents when an Item Response Set was created e.g. `2012-10-02T21:00:00Z`
- `updated_at`: string(date-time) - Represents when a Item Response Set was last updated e.g. `2012-10-02T21:00:00Z`
- `responses`: array of object - Responses
  - `id`: integer - ID e.g. `1`
  - `item_status_id`: integer - Checklist Item Status ID e.g. `1`
  - `name`: string - The name of the Response e.g. `Safe - Knowledge`
  - `corresponding_status`: string enum[yes, no, n/a] - Corresponding Checklist Item status e.g. `yes`
- `in_use`: boolean - Indicates whether a Response Set is being used by an Inspection Template Item e.g. `false`
- `deletable`: boolean - Indicates whether a Response Set is deletable. e.g. `true`
- `procore_standard`: boolean - Indicates whether a Response Set is a Procore standard set. e.g. `false`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/checklist/item/response_sets/{id}

**Update Item Response Set**
Updates a Company Checklist Item Response Set for a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Item Response Set ID

Request body (application/json) (required):

- `response_set`: object (required) - Item Response Set object
  - `name`: string - Name of the Response Set e.g. `Modified Safety Responses`
  - `active`: boolean - Indicates whether a Response Set is available for use e.g. `true`

Response 200 (application/json): object

- `id`: integer - ID e.g. `1`
- `name`: string - The name of the Item Response Set e.g. `Safety Responses`
- `active`: boolean - Indicates whether an Item Response Set is available for use. e.g. `true`
- `created_at`: string(date-time) - Represents when an Item Response Set was created e.g. `2012-10-02T21:00:00Z`
- `updated_at`: string(date-time) - Represents when a Item Response Set was last updated e.g. `2012-10-02T21:00:00Z`
- `responses`: array of object - Responses
  - `id`: integer - ID e.g. `1`
  - `item_status_id`: integer - Checklist Item Status ID e.g. `1`
  - `name`: string - The name of the Response e.g. `Safe - Knowledge`
  - `corresponding_status`: string enum[yes, no, n/a] - Corresponding Checklist Item status e.g. `yes`
- `in_use`: boolean - Indicates whether a Response Set is being used by an Inspection Template Item e.g. `false`
- `deletable`: boolean - Indicates whether a Response Set is deletable. e.g. `true`
- `procore_standard`: boolean - Indicates whether a Response Set is a Procore standard set. e.g. `false`

Error responses: 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/checklist/item/response_sets/{id}

**Delete Item Response Set**
Deletes a Company Checklist Item Response Set for a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Item Response Set ID

Response 200: OK (no body)

Error responses: 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Possible Inspectors

Resource id: `possible-inspectors`. Raw spec: `../openapi-raw/possible-inspectors.json`. Web: https://developers.procore.com/reference/rest/possible-inspectors?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/checklist/possible_inspectors  **[DEPRECATED]**

**List Inspectors**
Lists Possible Inspectors in a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `people`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `example@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object - Company
    - `id`: integer - Company ID e.g. `163215`
    - `name`: string - Company name e.g. `Procore Tech`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Potential Points of Contact

Resource id: `potential-points-of-contact`. Raw spec: `../openapi-raw/potential-points-of-contact.json`. Web: https://developers.procore.com/reference/rest/potential-points-of-contact?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/checklist/potential_points_of_contact  **[DEPRECATED]**

**List Potential Points of Contact**
Lists Potential Points of Contact in a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `vendor_id` [query] integer - Vendor ID

Response 200 (application/json): array of object

- `id`: integer - User ID e.g. `160586`
- `name`: string - Name e.g. `Carl Contractor`
- `name_with_vendor`: string - Name with Vendor e.g. `Carl Contractor (Anon Ymous Contractors)`
- `job_title`: string - Job Title e.g. `Machinist`
- `vendor`: object - Vendor
  - `id`: integer - Vendor ID e.g. `1614181`
  - `name`: string - Vendor Name e.g. `Anon Ymous Contractors`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Checklist Templates

Resource id: `project-checklist-templates`. Raw spec: `../openapi-raw/project-checklist-templates.json`. Web: https://developers.procore.com/reference/rest/project-checklist-templates?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.1/projects/{project_id}/checklist/list_templates  **[BETA]**

**List Project Checklist Templates**
Returns a list of all Inspection Checklist Templates for a specified Project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.
Note: A User with read-only and above permissions to Inspections has access to this endpoint and the URL to individual templates on the web

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[inspection_type_id]` [query] array of integer - Array of Inspection Type IDs. Return item(s) associated with the specified Inspection Type IDs.
- `filters[needs_update]` [query] boolean - Boolean. Return template(s) whose configuration is in need of updates.
- `filters[response_set_id]` [query] array of integer - Array of Item Response Set IDs. Return list template(s) whose items are associated with the given Response Set IDs.
- `filters[trade_ids]` [query] array of integer - Array of Trade IDs. Returns item(s) with the specified Trade IDs.
- `filters[query]` [query] string - Return item(s) containing search query
- `sort` [query] string enum[inspection_type, name, trade] - Sorts the list of Checklist Templates on the attribute given. By default the list is in ascending order. Use '-attribute' to sort in descending order. Ex. 'sort=-trade'.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Window Inspection`
- `deletable`: boolean - Deletable e.g. `false`
- `company_description`: string - Company Description e.g. `Checklist for windows`
- `description`: string - Description e.g. `Checklist for circular windows`
- `parent_inspection_item_id`: integer - Parent Inspection Item ID e.g. `34`
- `number`: string - Number e.g. `1.1`
- `relative_position`: integer - Relative Position e.g. `2`
- `display_conditions`: array of object - Display Conditions
  - `id`: integer - ID e.g. `1`
  - `child_item_id`: integer - Child Inspection Item ID e.g. `34`
  - `status_ids`: array of integer - Status IDs
  - `response_option_ids`: array of integer - Response Option IDs
  - `created_at`: string(date-time) - Represents when the Item Display Condition was created e.g. `2024-10-02T21:00:00Z`
  - `updated_at`: string(date-time) - Represents when the Item Display Condition was last updated e.g. `2024-10-02T21:00:00Z`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `synced_to`: object
  - `company_id`: integer - Company ID e.g. `1`
  - `list_template_id`: integer - Company List Template ID that List Template is Synced to e.g. `2`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/checklist/list_templates/{id}  **[BETA]**

**Show Project Checklist Template**
Shows an Inspection Checklist Template.
Note: A User with read-only and above permissions to Inspections has access to this endpoint and the URL to the template on the web

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist Template ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Window Inspection`
- `deletable`: boolean - Deletable e.g. `false`
- `company_description`: string - Company Description e.g. `Checklist for windows`
- `description`: string - Description e.g. `Checklist for circular windows`
- `parent_inspection_item_id`: integer - Parent Inspection Item ID e.g. `34`
- `number`: string - Number e.g. `1.1`
- `relative_position`: integer - Relative Position e.g. `2`
- `display_conditions`: array of object - Display Conditions
  - `id`: integer - ID e.g. `1`
  - `child_item_id`: integer - Child Inspection Item ID e.g. `34`
  - `status_ids`: array of integer - Status IDs
  - `response_option_ids`: array of integer - Response Option IDs
  - `created_at`: string(date-time) - Represents when the Item Display Condition was created e.g. `2024-10-02T21:00:00Z`
  - `updated_at`: string(date-time) - Represents when the Item Display Condition was last updated e.g. `2024-10-02T21:00:00Z`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `synced_to`: object
  - `company_id`: integer - Company ID e.g. `1`
  - `list_template_id`: integer - Company List Template ID that List Template is Synced to e.g. `2`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `company_attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `sections`: array of object - Sections
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Fall Protection and Perimeter Protection`
  - `position`: integer - Position e.g. `2`
  - `items`: array of object
    - `id`: integer - ID e.g. `2`
    - `name`: string - Name e.g. `Item 1`
    - `section_id`: integer - Checklist Template Section ID e.g. `21`
    - `position`: integer - Position e.g. `1`
    - `response_set`: object
    - `details`: string - Additional information about item e.g. `+/- 1 degrees`
    - `company_template_item_details`: string - Details from the company template item e.g. `+/- 1 degrees`
    - `synced_to`: object
  - `synced_to`: object
    - `company_id`: integer - Company ID e.g. `1`
    - `section_id`: integer - Company Template Section ID that Template Section is Synced to e.g. `14`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/recycle_bin/checklist/list_templates/{id}/restore

**Restore Recycled Checklist Template**
Restores the specified Checklist Template from the Recycle Bin.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Checklist Template ID

Response 200: OK (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/list_templates

**List Project Checklist Templates**
Returns a list of all Inspection Checklist Templates for a specified Project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[inspection_type_id]` [query] array of integer - Array of Inspection Type IDs. Return item(s) associated with the specified Inspection Type IDs.
- `filters[response_set_id]` [query] array of integer - Array of Item Response Set IDs. Return list template(s) whose items are associated with the given Response Set IDs.
- `filters[trade_ids]` [query] array of integer - Array of Trade IDs. Returns item(s) with the specified Trade IDs.
- `filters[query]` [query] string - Return item(s) containing search query
- `sort` [query] string enum[inspection_type, name, trade] - Sorts the list of Checklist Templates on the attribute given. By default the list is in ascending order. Use '-attribute' to sort in descending order. Ex. 'sort=-trade'.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Window Inspection`
- `company_description`: string - Company Description e.g. `Checklist for windows`
- `description`: string - Description e.g. `Checklist for circular windows`
- `parent_inspection_item_id`: integer - Parent Inspection Item ID e.g. `34`
- `number`: string - Number e.g. `1.1`
- `relative_position`: integer - Relative Position e.g. `2`
- `display_conditions`: array of object - Display Conditions
  - `id`: integer - ID e.g. `1`
  - `child_item_id`: integer - Child Inspection Item ID e.g. `34`
  - `status_ids`: array of integer - Status IDs
  - `response_option_ids`: array of integer - Response Option IDs
  - `created_at`: string(date-time) - Represents when the Item Display Condition was created e.g. `2024-10-02T21:00:00Z`
  - `updated_at`: string(date-time) - Represents when the Item Display Condition was last updated e.g. `2024-10-02T21:00:00Z`
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `synced_to`: object
  - `company_id`: integer - Company ID e.g. `1`
  - `list_template_id`: integer - Company List Template ID that List Template is Synced to e.g. `2`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/checklist/list_templates

**Create Project Checklist Template**
Creates a Project Inspection Template for a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `list_template`: object (required) - Checklist Template object
  - `description`: string - Description
  - `inspection_type_id`: integer - The ID of an Inspection Type
  - `alternative_response_set_id`: integer - The ID of an Alternative Response Set e.g. `1`
  - `name`: string - Name
  - `trade_id`: integer - The ID of a Trade
- `attachments`: array of string(binary) - Checklist Template's Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 201 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Window Inspection`
- `company_description`: string - Company Description e.g. `Checklist for windows`
- `description`: string - Description e.g. `Checklist for circular windows`
- `parent_inspection_item_id`: integer - Parent Inspection Item ID e.g. `34`
- `number`: string - Number e.g. `1.1`
- `relative_position`: integer - Relative Position e.g. `2`
- `display_conditions`: array of object - Display Conditions
  - `id`: integer - ID e.g. `1`
  - `child_item_id`: integer - Child Inspection Item ID e.g. `34`
  - `status_ids`: array of integer - Status IDs
  - `response_option_ids`: array of integer - Response Option IDs
  - `created_at`: string(date-time) - Represents when the Item Display Condition was created e.g. `2024-10-02T21:00:00Z`
  - `updated_at`: string(date-time) - Represents when the Item Display Condition was last updated e.g. `2024-10-02T21:00:00Z`
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `synced_to`: object
  - `company_id`: integer - Company ID e.g. `1`
  - `list_template_id`: integer - Company List Template ID that List Template is Synced to e.g. `2`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `alternative_response_set_id`: integer - The ID of the associated Alternative Response Set (if null, the default response set is being used) e.g. `123`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `response_set`: object
  - `conforming_response`: string - Term used to represent conforming statuses on items within the current template, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Pass`
  - `deficient_response`: string - Term used to represent deficient statuses on items within the current template, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `Fail`
  - `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`
- `sections`: array of object - Sections
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Fall Protection and Perimeter Protection`
  - `position`: integer - Position e.g. `2`
  - `items`: array of object
    - `id`: integer - ID e.g. `2`
    - `name`: string - Name e.g. `Item 1`
    - `section_id`: integer - Checklist Template Section ID e.g. `21`
    - `position`: integer - Position e.g. `1`
    - `response_set`: object
    - `details`: string - Additional information about item e.g. `+/- 1 degrees`
    - `synced_to`: object
  - `synced_to`: object
    - `company_id`: integer - Company ID e.g. `1`
    - `section_id`: integer - Company Template Section ID that Template Section is Synced to e.g. `14`
- `company_attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/checklist/list_templates/{id}

**Show Project Checklist Template**
Shows an Inspection Checklist Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist Template ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Window Inspection`
- `company_description`: string - Company Description e.g. `Checklist for windows`
- `description`: string - Description e.g. `Checklist for circular windows`
- `parent_inspection_item_id`: integer - Parent Inspection Item ID e.g. `34`
- `number`: string - Number e.g. `1.1`
- `relative_position`: integer - Relative Position e.g. `2`
- `display_conditions`: array of object - Display Conditions
  - `id`: integer - ID e.g. `1`
  - `child_item_id`: integer - Child Inspection Item ID e.g. `34`
  - `status_ids`: array of integer - Status IDs
  - `response_option_ids`: array of integer - Response Option IDs
  - `created_at`: string(date-time) - Represents when the Item Display Condition was created e.g. `2024-10-02T21:00:00Z`
  - `updated_at`: string(date-time) - Represents when the Item Display Condition was last updated e.g. `2024-10-02T21:00:00Z`
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `synced_to`: object
  - `company_id`: integer - Company ID e.g. `1`
  - `list_template_id`: integer - Company List Template ID that List Template is Synced to e.g. `2`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `alternative_response_set_id`: integer - The ID of the associated Alternative Response Set (if null, the default response set is being used) e.g. `123`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `response_set`: object
  - `conforming_response`: string - Term used to represent conforming statuses on items within the current template, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Pass`
  - `deficient_response`: string - Term used to represent deficient statuses on items within the current template, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `Fail`
  - `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`
- `sections`: array of object - Sections
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Fall Protection and Perimeter Protection`
  - `position`: integer - Position e.g. `2`
  - `items`: array of object
    - `id`: integer - ID e.g. `2`
    - `name`: string - Name e.g. `Item 1`
    - `section_id`: integer - Checklist Template Section ID e.g. `21`
    - `position`: integer - Position e.g. `1`
    - `response_set`: object
    - `details`: string - Additional information about item e.g. `+/- 1 degrees`
    - `synced_to`: object
  - `synced_to`: object
    - `company_id`: integer - Company ID e.g. `1`
    - `section_id`: integer - Company Template Section ID that Template Section is Synced to e.g. `14`
- `company_attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/checklist/list_templates/{id}

**Update Project Checklist Template**
Updates an Inspection Checklist Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist Template ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `list_template`: object (required) - Checklist Template object
  - `description`: string - Description
  - `inspection_type_id`: integer - The ID of an Inspection Type
  - `alternative_response_set_id`: integer - The ID of an Alternative Response Set e.g. `1`
  - `name`: string - Name
  - `trade_id`: integer - The ID of a Trade
- `attachments`: array of string(binary) - Checklist Template's Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 200 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Window Inspection`
- `company_description`: string - Company Description e.g. `Checklist for windows`
- `description`: string - Description e.g. `Checklist for circular windows`
- `parent_inspection_item_id`: integer - Parent Inspection Item ID e.g. `34`
- `number`: string - Number e.g. `1.1`
- `relative_position`: integer - Relative Position e.g. `2`
- `display_conditions`: array of object - Display Conditions
  - `id`: integer - ID e.g. `1`
  - `child_item_id`: integer - Child Inspection Item ID e.g. `34`
  - `status_ids`: array of integer - Status IDs
  - `response_option_ids`: array of integer - Response Option IDs
  - `created_at`: string(date-time) - Represents when the Item Display Condition was created e.g. `2024-10-02T21:00:00Z`
  - `updated_at`: string(date-time) - Represents when the Item Display Condition was last updated e.g. `2024-10-02T21:00:00Z`
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `synced_to`: object
  - `company_id`: integer - Company ID e.g. `1`
  - `list_template_id`: integer - Company List Template ID that List Template is Synced to e.g. `2`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `alternative_response_set_id`: integer - The ID of the associated Alternative Response Set (if null, the default response set is being used) e.g. `123`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `response_set`: object
  - `conforming_response`: string - Term used to represent conforming statuses on items within the current template, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Pass`
  - `deficient_response`: string - Term used to represent deficient statuses on items within the current template, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `Fail`
  - `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`
- `sections`: array of object - Sections
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Fall Protection and Perimeter Protection`
  - `position`: integer - Position e.g. `2`
  - `items`: array of object
    - `id`: integer - ID e.g. `2`
    - `name`: string - Name e.g. `Item 1`
    - `section_id`: integer - Checklist Template Section ID e.g. `21`
    - `position`: integer - Position e.g. `1`
    - `response_set`: object
    - `details`: string - Additional information about item e.g. `+/- 1 degrees`
    - `synced_to`: object
  - `synced_to`: object
    - `company_id`: integer - Company ID e.g. `1`
    - `section_id`: integer - Company Template Section ID that Template Section is Synced to e.g. `14`
- `company_attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/checklist/list_templates/{id}

**Delete Project Checklist Template**
Deletes an Inspection Checklist Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist Template ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 204: No Content (no body)

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/checklist/list_templates/{id}/use_alternative_response_set

**Add Alternative Response Set to Project Checklist Template**
Sets a Project Checklist Template's Response Set to the specified Alternative Response Set.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Checklist Template ID

Request body (application/json) (required):

- `alternative_response_set_id`: integer (required) - Alternative Response Set ID e.g. `1`

Response 200 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Window Inspection`
- `company_description`: string - Company Description e.g. `Checklist for windows`
- `description`: string - Description e.g. `Checklist for circular windows`
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `synced_to`: object
  - `company_id`: integer - Company ID e.g. `1`
  - `list_template_id`: integer - Company List Template ID that List Template is Synced to e.g. `2`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `alternative_response_set_id`: integer - The ID of the associated Alternative Response Set (if null, the default response set is being used) e.g. `1`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `response_set`: object
  - `conforming_response`: string - Term used to represent conforming statuses on items within the current template, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Safe`
  - `deficient_response`: string - Term used to represent deficient statuses on items within the current template, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `At Risk`
  - `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`
- `sections`: array of object - Sections
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Fall Protection and Perimeter Protection`
  - `position`: integer - Position e.g. `2`
  - `items`: array of object
    - `id`: integer - ID e.g. `2`
    - `name`: string - Name e.g. `Item 1`
    - `section_id`: integer - Checklist Template Section ID e.g. `21`
    - `position`: integer - Position e.g. `1`
    - `response_set`: object
    - `details`: string - Additional information about item e.g. `+/- 1 degrees`
    - `synced_to`: object
  - `synced_to`: object
    - `company_id`: integer - Company ID e.g. `1`
    - `section_id`: integer - Company Template Section ID that Template Section is Synced to e.g. `14`
- `company_attachments`: array of object - Company attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/checklist/list_templates/{id}/remove_alternative_response_set

**Remove Alternative Response Set from Project Checklist Template**
Removes a Project Checklist Template's Alternative Response Set, returning the template to the default Response Set.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Checklist Template ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Window Inspection`
- `company_description`: string - Company Description e.g. `Checklist for windows`
- `description`: string - Description e.g. `Checklist for circular windows`
- `parent_inspection_item_id`: integer - Parent Inspection Item ID e.g. `34`
- `number`: string - Number e.g. `1.1`
- `relative_position`: integer - Relative Position e.g. `2`
- `display_conditions`: array of object - Display Conditions
  - `id`: integer - ID e.g. `1`
  - `child_item_id`: integer - Child Inspection Item ID e.g. `34`
  - `status_ids`: array of integer - Status IDs
  - `response_option_ids`: array of integer - Response Option IDs
  - `created_at`: string(date-time) - Represents when the Item Display Condition was created e.g. `2024-10-02T21:00:00Z`
  - `updated_at`: string(date-time) - Represents when the Item Display Condition was last updated e.g. `2024-10-02T21:00:00Z`
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `synced_to`: object
  - `company_id`: integer - Company ID e.g. `1`
  - `list_template_id`: integer - Company List Template ID that List Template is Synced to e.g. `2`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `alternative_response_set_id`: integer - The ID of the associated Alternative Response Set (if null, the default response set is being used) e.g. `123`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `exampleuser@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `response_set`: object
  - `conforming_response`: string - Term used to represent conforming statuses on items within the current template, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Pass`
  - `deficient_response`: string - Term used to represent deficient statuses on items within the current template, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `Fail`
  - `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`
- `sections`: array of object - Sections
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Fall Protection and Perimeter Protection`
  - `position`: integer - Position e.g. `2`
  - `items`: array of object
    - `id`: integer - ID e.g. `2`
    - `name`: string - Name e.g. `Item 1`
    - `section_id`: integer - Checklist Template Section ID e.g. `21`
    - `position`: integer - Position e.g. `1`
    - `response_set`: object
    - `details`: string - Additional information about item e.g. `+/- 1 degrees`
    - `synced_to`: object
  - `synced_to`: object
    - `company_id`: integer - Company ID e.g. `1`
    - `section_id`: integer - Company Template Section ID that Template Section is Synced to e.g. `14`
- `company_attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/checklist/list_templates/create_from_company_template

**Create a Project Checklist Template from a Company Checklist Template**
Creates a Project Checklist Template from a Company Checklist Template.
Sections and Items on the Company Template are copied to the Project Template and changes to these company level records, including the template itself, are synced down to the project level.
You may not create more than 1 project template per company template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `source_template_id`: integer (required) - The ID of the Checklist Template from the Company to add to the Project e.g. `1`

Response 201 (application/json): object

- `id`: integer - The ID of the new Project Checklist Template e.g. `2`

Error responses: 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/checklist/list_templates

**List Recycled Checklist Templates**
Returns a list of all Recycled Checklist Templates for a given Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Window Inspection`
- `synced_to`: object - Checklist Template's synced Company Template information
  - `company_id`: integer - Company ID e.g. `23`
  - `list_template_id`: integer - Company List Template ID e.g. `12`
- `company_description`: string - Company Checklist Template description e.g. `Checklist for windows`
- `description`: string - Description e.g. `Checklist for circular windows`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
  - `audit_transaction_timestamp`: string(date-time) - Timestamp of audit e.g. `2014-12-11T04:58:42Z`
  - `source_id`: integer e.g. `1`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2014-12-11T04:58:42Z`
  - `company_id`: integer - Company ID e.g. `388`
  - `is_deletable`: boolean - Is deletable e.g. `true`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/checklist/list_templates/{id}

**Show Recycled Checklist Template**
Shows a Recycled Checklist Template

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `id` [path] integer (required) - Checklist Template ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `142`
- `name`: string - Name e.g. `Window Inspection`
- `synced_to`: object - Checklist Template's synced Company Template information
  - `company_id`: integer - Company ID e.g. `23`
  - `list_template_id`: integer - Company List Template ID e.g. `12`
- `company_description`: string - Company level inspection template description e.g. `Checklist for windows`
- `description`: string - Description e.g. `Checklist for circular windows`
- `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
- `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
- `alternative_response_set_id`: integer - The ID of the associated Alternative Response Set (if null, the default response set is being used) e.g. `1234`
- `sections`: array of object - Checklist Sections
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Fall Protection and Perimeter Protection`
  - `position`: integer - Position e.g. `2`
  - `items`: array of object - Checklist Items
    - `id`: integer - ID e.g. `2`
    - `name`: string - Name e.g. `Item 1`
    - `position`: integer - Position e.g. `1`
    - `section_id`: integer - Checklist Template Section ID e.g. `21`
    - `details`: string - Details e.g. `+/- 1 degrees`
    - `response_set`: object
    - `response_type_id`: integer - Response Type ID e.g. `12`
    - `type`: object - Checklist Item Type
  - `synced_to`: object - Checklist Template's synced Company Template information
    - `company_id`: integer - Company ID e.g. `23`
    - `list_template_id`: integer - Company Checklist Template ID e.g. `12`
- `inspection_type`: object
  - `id`: integer - ID e.g. `142`
  - `name`: string - Name e.g. `Safety Compliance`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2014-12-10T23:36:30Z`
  - `updated_at`: string(date-time) - Timestamp of last update e.g. `2014-12-11T04:58:42Z`
  - `audit_transaction_timestamp`: string(date-time) - Timestamp of audit e.g. `2014-12-11T04:58:42Z`
  - `source_id`: integer e.g. `1`
  - `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2014-12-11T04:58:42Z`
  - `company_id`: integer - Company ID e.g. `388`
  - `is_deletable`: boolean - Is deletable e.g. `true`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `company_attachments`: array of object - Company Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `response_set`: object
  - `conforming_response`: string - Term used to represent conforming statuses on items within the current template, e.g. "Pass" or "Safe". This maps to an item status of "yes". e.g. `Pass`
  - `deficient_response`: string - Term used to represent deficient statuses on items within the current template, e.g. "Fail" or "At Risk". This maps to an item status of "no". e.g. `Fail`
  - `global`: boolean - Represents whether a response set has been provided by Procore. e.g. `true`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/recycle_bin/checklist/list_templates/{id}/restore  **[OLDER VERSION - a newer path version exists below/above]**

**Restore Recycled Checklist Template**
Restores the specified Checklist Template from the Recycle Bin.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Checklist Template ID

Response 200: OK (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Inspection Template Item Evidence Configurations

Resource id: `project-inspection-template-item-evidence-configurations`. Raw spec: `../openapi-raw/project-inspection-template-item-evidence-configurations.json`. Web: https://developers.procore.com/reference/rest/project-inspection-template-item-evidence-configurations?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/inspection_template_items/{template_item_id}/evidence_configuration

**Show a Project Inspection Template Item Evidence Configuration**
Show the specified Project Inspection Template Item Evidence Configuration.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `template_item_id` [path] string (required) - Unique identifier for the inspection template item.

Response 200 (application/json): object

- `data`: object
  - `item_id`: string - Item ID for the Evidence Configuration e.g. `44`
  - `photo`: object
    - `status_ids`: array of string - Array of Inspection Item Status IDs that would trigger the requirement of a Photo
    - `response_option_ids`: array of string - Array of Inspection Response Option IDs that would trigger the requirement of a Photo
  - `observation`: object
    - `status_ids`: array of string - Array of Inspection Item Status IDs that would trigger the requirement of a Observation
    - `response_option_ids`: array of string - Array of Inspection Response Option IDs that would trigger the requirement of a Observation
  - `is_editable`: boolean - Indicates if the Item Evidence Configuration can be edited. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Date updated e.g. `2012-10-23T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/inspection_template_items/{template_item_id}/evidence_configuration

**Updates a Project Inspection Template Item Evidence Configuration**
Updates the specified Project Inspection Template Item Evidence Configuration

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `template_item_id` [path] string (required) - Unique identifier for the inspection template item.

Request body (application/json):

- `evidence_configuration`: object (required)
  - `observation`: object
    - `status_ids`: array of string - Array of Project Inspection Template Item Status IDs that would trigger the requirement of a Photo
    - `response_option_ids`: array of string - Array of Inspection Response Option IDs that would trigger the requirement of an Observation
  - `photo`: object
    - `status_ids`: array of string - Array of Project Inspection Template Item Status IDs that would trigger the requirement of a Photo
    - `response_option_ids`: array of string - Array of Inspection Response Option IDs that would trigger the requirement of a Photo

Response 200 (application/json): object

- `data`: object
  - `item_id`: string - Item ID for the Evidence Configuration e.g. `44`
  - `photo`: object
    - `status_ids`: array of string - Array of Inspection Item Status IDs that would trigger the requirement of a Photo
    - `response_option_ids`: array of string - Array of Inspection Response Option IDs that would trigger the requirement of a Photo
  - `observation`: object
    - `status_ids`: array of string - Array of Inspection Item Status IDs that would trigger the requirement of a Observation
    - `response_option_ids`: array of string - Array of Inspection Response Option IDs that would trigger the requirement of a Observation
  - `is_editable`: boolean - Indicates if the Item Evidence Configuration can be edited. e.g. `true`
  - `created_at`: string(date-time) - Timestamp of creation e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Date updated e.g. `2012-10-23T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Inspection Template Item References

Resource id: `project-inspection-template-item-references`. Raw spec: `../openapi-raw/project-inspection-template-item-references.json`. Web: https://developers.procore.com/reference/rest/project-inspection-template-item-references?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/inspection_templates/{inspection_template_id}/item_references

**List Project Inspection Template Item Reference**
Returns a collection of References for a specified Project Inspection Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `inspection_template_id` [path] integer (required) - The ID of the Project Inspection Template
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return References with the specified IDs
- `filters[item_id]` [query] array of integer - Return Reference(s) with the specified Item IDs and Synced Company Template Item References
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[created_at, updated_at] - Sort item(s) by the chosen param; check below for a list of options. The direction of sorting is ascending by default; for descending sort, insert the - symbol before the param.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `12`
- `template_id`: integer - ID of the associated Project Inspection Template e.g. `54`
- `item_id`: integer - ID of the associated Project Inspection Template Item e.g. `54`
- `payload`: object - Contains specific attributes depending on the type of Reference
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
- `type`: string enum[attachment] - Project Inspection Template Item Reference Type e.g. `attachment`
- `created_at`: string - Time the Project Inspection Template Item Reference was created e.g. `2018-09-20T21:39:40Z`
- `updated_at`: string - Time the Project Inspection Template Item Reference was updated e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/inspection_templates/{inspection_template_id}/item_references

**Create Project Inspection Template Item Reference**
Creates a Project Inspection Template Item Reference for a specified Checklist Template Item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `inspection_template_id` [path] integer (required) - The ID of the Project Inspection Template

Request body (multipart/form-data) (required):

- `item_template_reference`: object (required)
  - `item_id`: integer (required) - ID of the associated Project Inspection Template Item e.g. `54`
  - `type`: string enum[attachment, document, document_management_document_revision, drawing, form, image] (required) - Project Inspection Template Item Reference Type e.g. `attachment`
  - `payload`: object (required) - To upload an attachment you must upload the entire payload as `multipart/form-data` content-type
    - `attachment`: string(binary) - Reference Attachment. To upload an attachment you must upload the entire payload as `multipart/form-data` content-type with the `attachment` file.
    - `image_id`: integer - The identifier for the project image
    - `form_id`: integer - The identifier for the project form
    - `folder_id`: integer - ID of the Folder File the File Version belongs to
    - `file_version_id`: integer - ID of the Folder File the File Version belongs to
    - `drawing_revision_id`: integer - ID of the latest Drawing Revision of the Drawing
    - `document_management_document_revision_id`: integer - ID of the Document Management Document Revision

Response 201 (application/json): object

- `id`: integer - ID e.g. `12`
- `template_id`: integer - ID of the associated Project Inspection Template e.g. `54`
- `item_id`: integer - ID of the associated Project Inspection Template Item e.g. `54`
- `payload`: object - Contains specific attributes depending on the type of Reference
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
- `type`: string enum[attachment] - Project Inspection Template Item Reference Type e.g. `attachment`
- `created_at`: string - Time the Project Inspection Template Item Reference was created e.g. `2018-09-20T21:39:40Z`
- `updated_at`: string - Time the Project Inspection Template Item Reference was updated e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/inspection_templates/{inspection_template_id}/item_references/{id}

**Show Project Inspection Template Item Reference**
Shows a Project Inspection Template Item Reference

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `inspection_template_id` [path] integer (required) - The ID of the Project Inspection Template
- `id` [path] integer (required) - The ID of the Project Inspection Template Item Reference

Response 200 (application/json): object

- `id`: integer - ID e.g. `12`
- `template_id`: integer - ID of the associated Project Inspection Template e.g. `54`
- `item_id`: integer - ID of the associated Project Inspection Template Item e.g. `54`
- `payload`: object - Contains specific attributes depending on the type of Reference
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
- `type`: string enum[attachment] - Project Inspection Template Item Reference Type e.g. `attachment`
- `created_at`: string - Time the Project Inspection Template Item Reference was created e.g. `2018-09-20T21:39:40Z`
- `updated_at`: string - Time the Project Inspection Template Item Reference was updated e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/inspection_templates/{inspection_template_id}/item_references/{id}

**Delete Project Inspection Template Item Reference**
Deletes a Project Inspection Template Item Reference

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `inspection_template_id` [path] integer (required) - The ID of the Project Inspection Template
- `id` [path] integer (required) - The ID of the Project Inspection Template Item Reference

Response 204: No Content (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Responses

Resource id: `responses`. Raw spec: `../openapi-raw/responses.json`. Web: https://developers.procore.com/reference/rest/responses?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/checklist/responses

**List Responses**
List Responses for a Company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `filters[corresponding_status]` [query] array of string enum[yes, no, n/a] - Array of Corresponding Statuses. Return item(s) with the specified Corresponding Statuses - 'yes', 'no', or 'n/a'.
- `sort` [query] string enum[corresponding_status, name]

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `1`
- `item_status_id`: integer - Checklist Item Status ID e.g. `1`
- `name`: string - The name of the Response e.g. `Safe - Knowledge`
- `corresponding_status`: string enum[yes, no, n/a] - Corresponding Checklist Item status e.g. `yes`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/checklist/responses

**Create a Response**
Creates a Response for a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `response`: object - Response object
  - `name`: string (required) - Name of the Response e.g. `Safe - Knowledge`
  - `corresponding_status`: string enum[yes, no, n/a, none] (required) - Item Status that the Response corresponds to e.g. `yes`

Response 201 (application/json): object

- `id`: integer - ID e.g. `1`
- `item_status_id`: integer - Checklist Item Status ID e.g. `1`
- `name`: string - The name of the Response e.g. `Safe - Knowledge`
- `corresponding_status`: string enum[yes, no, n/a] - Corresponding Checklist Item status e.g. `yes`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/checklist/responses/{id}

**Show Response**
Returns a specified Response

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - The ID of the Response

Response 200 (application/json): object

- `id`: integer - ID e.g. `1`
- `item_status_id`: integer - Checklist Item Status ID e.g. `1`
- `name`: string - The name of the Response e.g. `Safe - Knowledge`
- `corresponding_status`: string enum[yes, no, n/a] - Corresponding Checklist Item status e.g. `yes`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/checklist/responses/{id}

**Update a Response**
Update a Response

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - The ID of the Response

Request body (application/json) (required):

- `response`: object - Response object
  - `name`: string - Name of the Response e.g. `Modified Safe - Knowledge`
  - `corresponding_status`: string enum[yes, no, n/a, none] - Item Status that the Response corresponds to e.g. `yes`

Response 200 (application/json): object

- `id`: integer - ID e.g. `1`
- `item_status_id`: integer - Checklist Item Status ID e.g. `1`
- `name`: string - The name of the Response e.g. `Safe - Knowledge`
- `corresponding_status`: string enum[yes, no, n/a] - Corresponding Checklist Item status e.g. `yes`

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/checklist/responses/{id}

**Delete a Response**
Deletes a Response

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - The ID of the Response

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

