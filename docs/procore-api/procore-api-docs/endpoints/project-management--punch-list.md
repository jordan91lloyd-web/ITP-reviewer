# Procore API: Punch List (Project Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Punch List)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Available Punch Item Managers](#available-punch-item-managers) - versions 1.0
- [Project Punch Item Templates](#project-punch-item-templates) - versions 1.0
- [Punch Item Assignments](#punch-item-assignments) - versions 1.0
- [Punch Item Filter Options](#punch-item-filter-options) - versions 2.0
- [Punch Item Types](#punch-item-types) - versions 1.0
- [Punch Items](#punch-items) - versions 1.1, 1.0
- [Punch List Assignee Options](#punch-list-assignee-options) - versions 1.0
- [Punch List Available Final Approvers](#punch-list-available-final-approvers) - versions 1.0
- [Punch List Filter Options](#punch-list-filter-options) - versions 1.0
- [Punch List Read User Options](#punch-list-read-user-options) - versions 1.0

## Available Punch Item Managers

Resource id: `available-punch-item-managers`. Raw spec: `../openapi-raw/available-punch-item-managers.json`. Web: https://developers.procore.com/reference/rest/available-punch-item-managers?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/available_punch_item_managers

**List Punch List Manager options**
Returns login informations that the current User can assign to Punch Items as Punch Manager.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Return items matching the specified search query. Searches by user name and company name.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `160586`
- `login`: string - Email e.g. `carl.contractor@example.com`
- `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Punch Item Templates

Resource id: `project-punch-item-templates`. Raw spec: `../openapi-raw/project-punch-item-templates.json`. Web: https://developers.procore.com/reference/rest/project-punch-item-templates?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/punch_item_templates

**List Project Punch Item Templates**
Return a list of all Project Punch Item Templates associated with a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[active]` [query] boolean - If true, returns item(s) with a status of 'active'.
- `filters[updated_at]` [query] string - Return item(s) within a specific updated at iso8601 datetime range
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Project Punch Item Template ID e.g. `1738`
- `active`: boolean - Flag that denotes if the Punch Item Template is available for use
- `company_punch_item_template_id`: integer - Parent Punch Item Template ID e.g. `4325`
- `name`: string - Name of the Punch Item Template
- `project_id`: integer - Project ID e.g. `33`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `punch_item_manager`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
- `final_approver`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
- `template_category`: object
  - `id`: integer - Template Category ID e.g. `967`
  - `name`: string - Template Category name e.g. `03 - Concrete`
- `assignee`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Punch Item Assignments

Resource id: `punch-item-assignments`. Raw spec: `../openapi-raw/punch-item-assignments.json`. Web: https://developers.procore.com/reference/rest/punch-item-assignments?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/punch_item_assignments/{id}

**Show Punch Assignment**
Returns single Punch Item Assignment.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Punch Item Assignment
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `approved`: boolean - Resolution status e.g. `true`
- `status`: string - Status of Assignment e.g. `unresolved`
- `name`: string - Assignment's name e.g. `Extra work`
- `comment`: string - Comment e.g. `Completed`
- `login_information_id`: integer e.g. `420`
- `login_information_name`: string e.g. `Edgar Admin`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `ABC drywall`
- `attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
  - `attached_to_item_id`: integer - Attached to item ID e.g. `323`
  - `attached_to_item_type`: string - Attached to item type e.g. `Image`
  - `viewer_url`: string - Unified viewer link e.g. `/webclients/host/companies/1/projects/1/tools/document-viewer/document-viewer...`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `notified_at`: string - Date assignee was notified of Punch Item e.g. `2018-10-22T23:46:50Z`
- `responded_at`: string - Date Assignee responded to the Punch Item e.g. `2018-10-26T17:51:30Z`
- `manager_accepted_at`: string - Date Punch Item Manager resolved the Punch Item Assignment e.g. `2018-10-26T18:15:26Z`
- `user_name`: string e.g. `Edgar Admin`
- `updated_at`: string - Date Assignment was updated e.g. `2018-10-26T18:15:26Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/punch_item_assignments/{id}

**Update Punch Item Assignment**
Update single Punch Item Assignment.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Punch Item Assignment
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `send_emails`: string - Parameter to send email to assignees, distribution members and creator of the Punch Item. Parameter must be true and status or comment must have changed for an email to send. e.g. `true`
- `punch_item_assignment`: object (required) - Punch Item Assignment object
  - `approved`: boolean - Resolution status e.g. `true`
  - `comment`: string - Comment e.g. `This Punch Item task is complete`
  - `login_information_id`: integer - User ID e.g. `421`
  - `status`: string enum[unresolved, ready_for_review, work_not_accepted, resolved] - Punch Item Assignment Status e.g. `ready_for_review`
  - `document_management_document_revision_ids`: array of string - Document Management Document Revisions to attach to the response e.g. `["5c9800d3-bd12-45dd-a280-85fe887858b2", "da4b5e3b-ddaf-406f-8b2c-dceb6a60a203"]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["01JDENGN32Z9AJN1EB8R6NWYGD", "01JDENH8W5GWSF34A5TA5T39CC"]`

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `approved`: boolean - Resolution status e.g. `true`
- `status`: string - Status of Assignment e.g. `unresolved`
- `name`: string - Assignment's name e.g. `Extra work`
- `comment`: string - Comment e.g. `Completed`
- `login_information_id`: integer e.g. `420`
- `login_information_name`: string e.g. `Edgar Admin`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - Company Name e.g. `ABC drywall`
- `attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
  - `attached_to_item_id`: integer - Attached to item ID e.g. `323`
  - `attached_to_item_type`: string - Attached to item type e.g. `Image`
  - `viewer_url`: string - Unified viewer link e.g. `/webclients/host/companies/1/projects/1/tools/document-viewer/document-viewer...`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `notified_at`: string - Date assignee was notified of Punch Item e.g. `2018-10-22T23:46:50Z`
- `responded_at`: string - Date Assignee responded to the Punch Item e.g. `2018-10-26T17:51:30Z`
- `manager_accepted_at`: string - Date Punch Item Manager resolved the Punch Item Assignment e.g. `2018-10-26T18:15:26Z`
- `user_name`: string e.g. `Edgar Admin`
- `updated_at`: string - Date Assignment was updated e.g. `2018-10-26T18:15:26Z`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Punch Item Filter Options

Resource id: `punch-item-filter-options`. Raw spec: `../openapi-raw/punch-item-filter-options.json`. Web: https://developers.procore.com/reference/rest/punch-item-filter-options?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/punch_list/assignees

**List Punch Item Assignee Filter Options**
Returns users assigned to punch items with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter assignees by name or company
- `view` [query] string enum[recycle_bin] - Set to 'recycle_bin' to return filter options from deleted punch items

Response 200 (application/json): object

- `data`: array of object - List of available user filter options
  - `id`: string (required) - The unique identifier of the user e.g. `101`
  - `login`: string (required) - The email address of the user e.g. `carl.contractor@example.com`
  - `name`: string - The display name of the user e.g. `Carl Contractor`
  - `company_name`: string - The company name associated with the user e.g. `Carl's Construction`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/punch_list/assignee_companies

**List Punch Item Assignee Company Filter Options**
Returns vendor companies of punch item assignees with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter assignee companies by name
- `view` [query] string enum[recycle_bin] - Set to 'recycle_bin' to return filter options from deleted punch items

Response 200 (application/json): object

- `data`: array of object
  - `logo`: string - Logo url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160718141208_development_528...`
  - `is_active`: boolean - Active status e.g. `true`
  - `id`: string e.g. `161072`
  - `name`: string e.g. `SID Architecture`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/punch_list/ball_in_court

**List Punch Item Ball In Court Filter Options**
Returns users who currently have ball in court on punch items with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter ball in court users by name or company

Response 200 (application/json): object

- `data`: array of object - List of available user filter options
  - `id`: string (required) - The unique identifier of the user e.g. `101`
  - `login`: string (required) - The email address of the user e.g. `carl.contractor@example.com`
  - `name`: string - The display name of the user e.g. `Carl Contractor`
  - `company_name`: string - The company name associated with the user e.g. `Carl's Construction`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/punch_list/closed_by_contacts

**List Punch Item Closed By Contact Filter Options**
Returns users who have closed punch items with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter closed by contacts by name or company

Response 200 (application/json): object

- `data`: array of object - List of available user filter options
  - `id`: string (required) - The unique identifier of the user e.g. `101`
  - `login`: string (required) - The email address of the user e.g. `carl.contractor@example.com`
  - `name`: string - The display name of the user e.g. `Carl Contractor`
  - `company_name`: string - The company name associated with the user e.g. `Carl's Construction`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/punch_list/creators

**List Punch Item Creator Filter Options**
Returns users who have created punch items with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter creators by name or company

Response 200 (application/json): object

- `data`: array of object - List of available user filter options
  - `id`: string (required) - The unique identifier of the user e.g. `101`
  - `login`: string (required) - The email address of the user e.g. `carl.contractor@example.com`
  - `name`: string - The display name of the user e.g. `Carl Contractor`
  - `company_name`: string - The company name associated with the user e.g. `Carl's Construction`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/punch_list/final_approvers

**List Punch Item Final Approver Filter Options**
Returns users assigned as final approvers on punch items with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter final approvers by name or company

Response 200 (application/json): object

- `data`: array of object - List of available user filter options
  - `id`: string (required) - The unique identifier of the user e.g. `101`
  - `login`: string (required) - The email address of the user e.g. `carl.contractor@example.com`
  - `name`: string - The display name of the user e.g. `Carl Contractor`
  - `company_name`: string - The company name associated with the user e.g. `Carl's Construction`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/punch_list/punch_item_managers

**List Punch Item Manager Filter Options**
Returns users assigned as punch item managers with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter punch item managers by name or company

Response 200 (application/json): object

- `data`: array of object - List of available user filter options
  - `id`: string (required) - The unique identifier of the user e.g. `101`
  - `login`: string (required) - The email address of the user e.g. `carl.contractor@example.com`
  - `name`: string - The display name of the user e.g. `Carl Contractor`
  - `company_name`: string - The company name associated with the user e.g. `Carl's Construction`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/punch_list/trades

**List Punch Item Trade Filter Options**
Returns trades associated with punch items with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter trades by name

Response 200 (application/json): object

- `data`: array of object - List of available filter options
  - `key`: string (required) - The unique identifier of the option e.g. `54`
  - `value`: string (required) - The display label for the option e.g. `Electrical`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/punch_list/types

**List Punch Item Type Filter Options**
Returns punch item types with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter types by name

Response 200 (application/json): object

- `data`: array of object - List of available filter options
  - `key`: string (required) - The unique identifier of the option e.g. `54`
  - `value`: string (required) - The display label for the option e.g. `Electrical`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/punch_list/categories

**List Punch Item Category Filter Options**
Returns the Punch Item Categories available to filter on, ordered by name, with pagination and optional search. Both Company-level and Project-level Categories are returned, and inactive Categories are included so historical Punch Items remain filterable.
When no search query is supplied, the last page also carries an "Uncategorized" option whose key is the literal value 'none'; the Total header accounts for it. Pass a returned key as filters[category_id] on the Punch Items list endpoints.
Returns an empty list when Punch Item Categories are not enabled for the Project. Check features.categories_enabled on the Punch List client configuration endpoint to tell that case apart from a Project that simply has no Categories.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter categories by name

Response 200 (application/json): object

- `data`: array of object - List of available filter options
  - `key`: string (required) - The unique identifier of the option e.g. `54`
  - `value`: string (required) - The display label for the option e.g. `Electrical`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/punch_list/locations

**List Punch Item Location Filter Options**
Returns locations associated with punch items with pagination and optional search

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Search query to filter locations by name

Response 200 (application/json): object

- `data`: array of object - List of available filter options
  - `key`: string (required) - The unique identifier of the option e.g. `54`
  - `value`: string (required) - The display label for the option e.g. `Electrical`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Punch Item Types

Resource id: `punch-item-types`. Raw spec: `../openapi-raw/punch-item-types.json`. Web: https://developers.procore.com/reference/rest/punch-item-types?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/punch_item_types

**List punch item types**
Return a list of all Punch Item Types on a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[name] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter
- `filters[name]` [query] array of string - Filter item(s) with matching name.

Response 200 (application/json): array of object

- `id`: integer - Punch Item Type ID e.g. `44165`
- `name`: string - Punch Item Type name e.g. `Extra Work`
- `created_at`: string(date-time) - Punch Item Type created at e.g. `2012-10-24T21:39:40Z`
- `updated_at`: string(date-time) - Punch Item Type last updated at e.g. `2012-10-24T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/punch_item_types

**Create Punch Item Type**
Create a new Punch Item Type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the Punch Item Type belongs to
- `punch_item_type`: object (required)
  - `name`: string (required) - Name

Response 201 (application/json): object

- `id`: integer - Punch Item Type ID e.g. `44165`
- `name`: string - Punch Item Type name e.g. `Extra Work`
- `created_at`: string(date-time) - Punch Item Type created at e.g. `2012-10-24T21:39:40Z`
- `updated_at`: string(date-time) - Punch Item Type last updated at e.g. `2012-10-24T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/punch_item_types/{id}

**Show Punch Item Type**
Return detail on the specified Punch Item Type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Punch Item Type
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Punch Item Type ID e.g. `44165`
- `name`: string - Punch Item Type name e.g. `Extra Work`
- `created_at`: string(date-time) - Punch Item Type created at e.g. `2012-10-24T21:39:40Z`
- `updated_at`: string(date-time) - Punch Item Type last updated at e.g. `2012-10-24T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/punch_item_types/{id}

**Update Punch Item type**
Update the specified Punch Item Type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Punch Item Type

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the Punch Item Type belongs to
- `punch_item_type`: object (required)
  - `name`: string (required) - Name

Response 201 (application/json): object

- `id`: integer - Punch Item Type ID e.g. `44165`
- `name`: string - Punch Item Type name e.g. `Extra Work`
- `created_at`: string(date-time) - Punch Item Type created at e.g. `2012-10-24T21:39:40Z`
- `updated_at`: string(date-time) - Punch Item Type last updated at e.g. `2012-10-24T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/punch_item_types/{id}

**Delete Punch Item Type**
Delete the specified Punch Item Type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Punch Item Type
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Punch Items

Resource id: `punch-items`. Raw spec: `../openapi-raw/punch-items.json`. Web: https://developers.procore.com/reference/rest/punch-items?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.1/punch_items

**List Punch Items**
Return a list of all Punch Items for a specified Project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[status]` [query] string enum[open, closed, pending] - Return item(s) with the specified Punch Item Status - 'open' or 'closed'.
- `filters[priority]` [query] string enum[low, medium, high] - Return item(s) with the specified Punch Item Priority - 'low', 'medium', 'high'
- `filters[punch_item_type_id]` [query] integer - Return item(s) with the specified Punch Item Type ID.
- `filters[location_id]` [query] array of integer - Location ID. Returns item(s) with the specified Location ID or a range of Location IDs.
- `filters[include_sublocations]` [query] boolean - Use together with `filters[location_id]`
- `filters[approver_login_information_id]` [query] integer - User ID. Returns item(s) where the specified User ID is an approver.
- `filters[vendor_id]` [query] integer - Return item(s) with the specified Vendor ID.
- `filters[assignee_response]` [query] boolean - If true, returns item(s) with the specified assignee response approved status.
- `filters[trade_id]` [query] integer - Trade ID
- `filters[category_id]` [query] array of string - Return item(s) assigned to the specified Punch Item Category ID(s). Pass the literal value 'none' to return uncategorized Punch Items (those with no Category assigned); 'none' may be combined with Category IDs to retu...
- `sort` [query] string enum[id, position, name, due, created_at, closed_at, description, priority, workflow_status, location_name, punch_item_type_name, reference, ...] - Field to sort the returned Punch Items by. Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter, for example sort=name for A-Z or sort=-created_at for newest first. Sortin...
- `filters[id]` [query] array of integer - Return item(s) with the specified Punch Item ID.
- `filters[query]` [query] string - Return item(s) containing search query
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `83978`
- `ball_in_court`: array of object - Array of Users
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
- `closed_at`: string(date-time) - Date time Punch Item was closed e.g. `2012-10-23T21:39:40Z`
- `cost_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
- `cost_impact_amount`: string - Cost impact amount e.g. `100.0`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Description
- `due_date`: string(date) - Due date e.g. `2013-09-30`
- `name`: string - Name e.g. `test 1 today`
- `reference`: string - Used to create a reference point between a Punch Item within Procore and a corresponding Punch Item outside of Procore e.g. `3A`
- `schedule_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
- `schedule_impact_days`: integer - Schedule impact value in days e.g. `3`
- `schedule_risk`: string enum[ml_low, ml_medium, ml_high] - Assessed risk level of on-time completion e.g. `ml_high`
- `schedule_risk_reason`: string - Reason for assessed risk level of on-time completion
- `schedule_risk_confidence`: integer - Confidence of schedule risk assessment e.g. `90`
- `schedule_risk_probability`: integer - Probability of schedule risk assessment e.g. `90`
- `position`: integer - Position e.g. `1`
- `priority`: string - Punch item priority - 'low', 'medium', 'high'
- `private`: boolean - Privacy status e.g. `false`
- `status`: string enum[Open, Closed, Overdue, Pending] - Status e.g. `Open`
- `has_resolved_responses`: boolean - At least one Punch Item Assignment has a status of 'resolved e.g. `true`
- `has_unresolved_responses`: boolean - At least one Punch Item Assignment has a status of 'unresolved' e.g. `true`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `closed_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `punch_item_manager`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `final_approver`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `punch_item_type`: object
  - `id`: integer - ID e.g. `44165`
  - `name`: string - Name e.g. `Extra Work`
- `category`: object - Category the Punch Item is classified under. Null when the Punch Item is uncategorized. Assign or change it by sending punch_item[category_id] on create or update, and filter lists with filters[category_id].
  - `id`: integer - Category ID. Pass as filters[category_id] on List Punch Items or as punch_item[category_id] when creating or updating a Punch Item. e.g. `4211`
  - `name`: string - Display name of the Category. e.g. `Electrical`
  - `active`: boolean - False when the Category has been deactivated. Deactivated Categories stay on the Punch Items already using them but are no longer offered for new assignments. e.g. `true`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `assignments`: array of object - Array of Punch Item Assignments
  - `id`: integer - ID e.g. `333675`
  - `approved`: boolean - Resolution status e.g. `true`
  - `comment`: string - Additional comment e.g. `Completed`
  - `login_information_id`: integer e.g. `420`
  - `login_information_name`: string e.g. `Edgar Admin`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `attachments`: array of object - Array of Attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `vendor`: object
    - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
    - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
  - `notified_at`: string(date-time) - Date Assignee was notified of the Punch Item e.g. `2018-06-25T22:22:42Z`
  - `responded_at`: string(date-time) - Date Assignee responded to the Punch Item e.g. `2018-06-25T22:22:42Z`
  - `status`: string - Status of Assignment e.g. `unresolved`
  - `manager_accepted_at`: string(date-time) - Date Punch Item Manager resolved the Punch Item Assignment e.g. `2018-10-26T18:15:26Z`
  - `user_name`: string e.g. `Edgar Admin`
  - `updated_at`: string(date-time) - Date Assignment was updated e.g. `2018-10-26T18:15:26Z`
- `assignees`: array of object - Punch Item Assignees
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - Workflow status of the Punch Item e.g. `initiated`
- `custom_status_id`: integer - ID of the Punch Item's custom status, returned on the flattened representation (view=flatten_v0). Resolved, so a Punch Item that has not been assigned a custom status explicitly reports its company's default status fo... e.g. `42`
- `custom_status`: object - The Punch Item's custom status. Resolved, so a Punch Item that has not been assigned a custom status explicitly reports its company's default status for the item's workflow_status. Null when the Punch Item custom stat...
  - `id`: integer - Punch Item Custom Status ID e.g. `42`
  - `name`: string - Display name. For a company default status this is the translated label of its legacy_workflow_status; for a company-created status it is the name the company gave it. e.g. `On Hold`
  - `default`: boolean - Whether this is one of the company's default statuses, which mirror the legacy workflow statuses one-for-one and cannot be renamed or deleted. e.g. `false`
  - `is_active`: boolean - Whether the custom status is available for assignment e.g. `true`
  - `legacy_workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - The legacy workflow_status a default status corresponds to. Null for company-created statuses. e.g. `work_required`
  - `global_status`: object - The global status group the custom status rolls up to
    - `id`: integer - Global status ID e.g. `2`
    - `name`: string enum[DRAFT, OPEN, CLOSED] - Global status name e.g. `OPEN`
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

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/punch_items

**Create Punch Item**
Create a new Punch Item in a Project.
#### Uploading images
To upload images you must upload the entire payload as `multipart/form-data` content-type and
specify each parameter as form-data together with `punch_item[images][]` as files.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `project_id`: integer (required) - Project ID to which the Punch Item belongs to
- `punch_item`: object (required)
  - `description`: string - Description e.g. `Here is my updated description`
  - `due`: string(date) - Due date e.g. `2016-01-01`
  - `name`: string (required) - Name e.g. `My Updated Item`
  - `schedule_risk`: string enum[ml_low, ml_medium, ml_high] - Assessed risk level of on-time completion e.g. `ml_high`
  - `position`: integer - Position
  - `priority`: string - Punch item priority - 'low', 'medium', 'high'
  - `private`: boolean - Privacy status e.g. `false`
  - `status`: string enum[open, closed] - Status - 'open' or 'closed' e.g. `open`
  - `date_initiated`: string(date) - Date created
  - `schedule_impact`: string - Schedule impact status - yes_known, yes_unknown, no_impact, tbd, n_a e.g. `yes_known`
  - `schedule_impact_days`: integer - Schedule impact value in days e.g. `43`
  - `reference`: string - Used to create a reference point between a Punch Item within Procore and a corresponding Punch Item outside of Procore e.g. `5rt498`
  - `cost_code_id`: integer - ID of the cost code associated with the punch item. e.g. `9900`
  - `cost_impact`: string - Cost impact Status - yes_known, yes_unknown, no_impact, tbd, n_a e.g. `yes_known`
  - `cost_impact_amount`: integer - Cost impact amount e.g. `54`
  - `trade_id`: integer - Trade IDs e.g. `1234`
  - `category_id`: integer - ID of the Punch Item Category to classify this Punch Item under. Optional; omit it or send null to leave the Punch Item uncategorized. Only accepted while Punch Item Categories are enabled for the Project and the Cate... e.g. `4211`
  - `custom_status_id`: integer - ID of the Punch Item Custom Status to assign to this Punch Item. Only accepted while Punch Item Custom Statuses are enabled for the Company, and only for a status that belongs to the Company, is active, is not one of ... e.g. `4288`
  - `punch_item_type_id`: integer - Punch Item Type ID e.g. `5436`
  - `login_information_ids`: array of integer - Array of the User IDs of the Punch Item Assignments e.g. `[2343, 45343]`
  - `distribution_member_ids`: array of integer - Array of the User IDs of the Distribution Members e.g. `[4323, 86298]`
  - `punch_item_manager_id`: integer - Punch Item Manager ID e.g. `42`
  - `final_approver_id`: integer - Punch Item Final Approver ID e.g. `162`
  - `location_id`: integer - The ID of the Location of the Punch Item. `location_id` takes precedence over `mt_location` e.g. `9823`
  - `mt_location`: array of string - Use this for creating a new multi-tier or single-tier Location. This will be ignored if `location_id` is provided. e.g. `["upstairs", "meetingroom"]`
  - `workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - Workflow status of the Punch Item. These are more granular statuses in the punch item workflow. e.g. `initiated`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `prostore_file_ids`: array of integer - Prostore file IDs to attach to the punch item e.g. `[7889253049, 8981591777]`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 201 (application/json): object

- `id`: integer - ID e.g. `13151`
- `ball_in_court`: array of object - Array of Users
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe (Brickworks)`
  - `locale`: string - User dictionary e.g. `ko`
- `comments`: array of object - Punch Item Comments
  - `id`: integer - Comment ID e.g. `1`
  - `body`: string - The text of the Comment e.g. `This is a photo of a cat`
  - `creator`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_at`: string(date-time) - Image Category created at e.g. `2013-11-08T00:00:00Z`
  - `updated_at`: string(date-time) - Comment update timestamp e.g. `2013-11-08T00:00:00Z`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `closed_at`: string(date-time) - Closed at e.g. `2012-10-24T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Description e.g. `Light fixture in the bathroom is broken`
- `due_date`: string(date) - Due Date e.g. `2013-09-30`
- `name`: string - Name e.g. `Fix broken light fixture`
- `schedule_risk`: string - Assessed risk level of on-time completion e.g. `ml_low`
- `schedule_risk_reason`: string - Reason for assessed risk level of on-time completion
- `position`: integer - Position e.g. `1`
- `priority`: string - Punch item priority - 'low', 'medium', 'high'
- `private`: boolean - Privacy status e.g. `false`
- `status`: string enum[Open, Closed, Overdue, Pending] - Status e.g. `Open`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `date_initiated`: string(date) - Date created e.g. `2013-06-11T01:27:52Z`
- `schedule_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
- `schedule_impact_days`: integer - Schedule impact value in days e.g. `3`
- `reference`: string - Used to create a reference point between a Punch Item within Procore and a corresponding Punch Item outside of Procore e.g. `3A`
- `cost_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
- `cost_impact_amount`: integer - Cost impact amount e.g. `100`
- `can_email`: boolean - Punch Item has Punch Item Assignments or distribution members to email to e.g. `false`
- `drawing_ids`: array of integer - Array of Drawing IDs
- `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
- `distribution_members`: array of object - Users on the Punch Item distribution list
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - User Company Name e.g. `Brickworks`
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
- `created_by`: object - User that created the Punch Item
  - `id`: integer - User ID e.g. `47531`
  - `name`: string - User Name e.g. `Jane Doe`
  - `login`: string - User Email e.g. `jane.doe@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `closed_by`: object - User that closed the Punch Item
  - `id`: integer - User ID e.g. `47531`
  - `name`: string - User Name e.g. `Jane Doe`
  - `login`: string - User Email e.g. `jane.doe@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `punch_item_manager`: object - User that manages the Punch Item
  - `id`: integer - User ID e.g. `55491`
  - `name`: string - User Name e.g. `John Doe`
  - `login`: string - User Email e.g. `john.doe@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `final_approver`: object - User in charge of closing the Punch Item
  - `id`: integer - User ID e.g. `32395`
  - `name`: string - User Name e.g. `Carl Contractor`
  - `login`: string - User Email e.g. `carl.contractor@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `punch_item_type`: object
  - `id`: integer - ID e.g. `44165`
  - `name`: string - Name e.g. `Extra Work`
- `category`: object - Category the Punch Item is classified under. Null when the Punch Item is uncategorized. Assign or change it by sending punch_item[category_id] on create or update, and filter lists with filters[category_id].
  - `id`: integer - Category ID. Pass as filters[category_id] on List Punch Items or as punch_item[category_id] when creating or updating a Punch Item. e.g. `4211`
  - `name`: string - Display name of the Category. e.g. `Electrical`
  - `active`: boolean - False when the Category has been deactivated. Deactivated Categories stay on the Punch Items already using them but are no longer offered for new assignments. e.g. `true`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `assignments`: array of object - Array of Punch Item Assignments
  - `id`: integer - ID e.g. `18655`
  - `approved`: boolean - Resolution status e.g. `true`
  - `comment`: string - Additional comments e.g. `Replaced the light fixture. See the attached photo.`
  - `notified_at`: string(date) - Date Assignee was notified e.g. `2018-06-25T22:22:42Z`
  - `ready_for_review_at`: string(date) - Date Assignee was notified e.g. `2018-06-25T22:22:42Z`
  - `work_not_accepted_at`: string(date) - Date Assignee was notified e.g. `2018-06-25T22:22:42Z`
  - `formatted_status`: string e.g. `Work Required`
  - `updated_at`: string(date) - Date Assignee response was updated on the Punch Item e.g. `2018-06-25T22:22:42Z`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
    - `active`: boolean - Whether user is active or not e.g. `true`
  - `attachments`: array of object - Array of Attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
    - `viewable`: boolean e.g. `true`
    - `can_be_viewed`: boolean e.g. `true`
- `rich_text_description`: string - Rich Text Description e.g. `<p>Light fixture in the bathroom is broken</p>`
- `attachments`: array of object - Array of Punch Item Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
  - `attached_to_item_id`: integer - Attached to item ID e.g. `323`
  - `attached_to_item_type`: string - Attached to item type e.g. `Image`
  - `viewer_url`: string - Unified viewer link e.g. `/webclients/host/companies/1/projects/1/tools/document-viewer/document-viewer...`
- `images`: array of object - Array of Images *DEPRECATED. Please use attachments instead
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `web_images`: array of object - Array of photo Attachments uploaded from the web application
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - Workflow status of the Punch Item e.g. `initiated`
- `custom_status`: object - The Punch Item's custom status. Resolved, so a Punch Item that has not been assigned a custom status explicitly reports its company's default status for the item's workflow_status. Null when the Punch Item custom stat...
  - `id`: integer - Punch Item Custom Status ID e.g. `42`
  - `name`: string - Display name. For a company default status this is the translated label of its legacy_workflow_status; for a company-created status it is the name the company gave it. e.g. `On Hold`
  - `default`: boolean - Whether this is one of the company's default statuses, which mirror the legacy workflow statuses one-for-one and cannot be renamed or deleted. e.g. `false`
  - `is_active`: boolean - Whether the custom status is available for assignment e.g. `true`
  - `legacy_workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - The legacy workflow_status a default status corresponds to. Null for company-created statuses. e.g. `work_required`
  - `global_status`: object - The global status group the custom status rolls up to
    - `id`: integer - Global status ID e.g. `2`
    - `name`: string enum[DRAFT, OPEN, CLOSED] - Global status name e.g. `OPEN`
- `download_all_attachments_uuid`: string - UUID for downloading all attachments associated with the Punch Item. This UUID can be used to generate a download link for all attachments in a single archive. e.g. `a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8`
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

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/punch_items/add_punch_item_attachments

**Add Attachments to Punch Item**
Add Attachments to Punch Item
#### Uploading images
To upload images you must upload the entire payload as `multipart/form-data` content-type and
specify each parameter as form-data together with `attachments[]` as files.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [query] integer (required) - ID of the Punch Item
- `project_id` [query] integer (required) - ID of the project

Request body (multipart/form-data):

- `attachments`: array of string - Punch Item Assignment attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 200 (application/json): object

- `id`: integer
- `name`: string - Use :name, :filename to be deprecated
- `url`: string
- `filename`: string - :filename to be deprecated, use :name

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/punch_items/send_all_unsent

**Send All Unsent Punch Item Emails**
Send all unsent Punch Item emails in a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `punch_ids`: array of integer
- `recipient`: string enum[assignee, manager] - Recipient role e.g. `manager`

Response 200 (application/json): object


Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/punch_items/{id}

**Show Punch Item**
Return detailed information about a specific Punch Item in a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Punch Item
- `project_id` [query] integer (required) - Unique identifier for the project.
- `include_deleted` [query] boolean - Returns deleted items when set to true

Response 200 (application/json): object

- `id`: integer - ID e.g. `13151`
- `ball_in_court`: array of object - Array of Users
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe (Brickworks)`
  - `locale`: string - User dictionary e.g. `ko`
- `comments`: array of object - Punch Item Comments
  - `id`: integer - Comment ID e.g. `1`
  - `body`: string - The text of the Comment e.g. `This is a photo of a cat`
  - `creator`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_at`: string(date-time) - Image Category created at e.g. `2013-11-08T00:00:00Z`
  - `updated_at`: string(date-time) - Comment update timestamp e.g. `2013-11-08T00:00:00Z`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `closed_at`: string(date-time) - Closed at e.g. `2012-10-24T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Description e.g. `Light fixture in the bathroom is broken`
- `due_date`: string(date) - Due Date e.g. `2013-09-30`
- `name`: string - Name e.g. `Fix broken light fixture`
- `schedule_risk`: string - Assessed risk level of on-time completion e.g. `ml_low`
- `schedule_risk_reason`: string - Reason for assessed risk level of on-time completion
- `position`: integer - Position e.g. `1`
- `priority`: string - Punch item priority - 'low', 'medium', 'high'
- `private`: boolean - Privacy status e.g. `false`
- `status`: string enum[Open, Closed, Overdue, Pending] - Status e.g. `Open`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `date_initiated`: string(date) - Date created e.g. `2013-06-11T01:27:52Z`
- `schedule_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
- `schedule_impact_days`: integer - Schedule impact value in days e.g. `3`
- `reference`: string - Used to create a reference point between a Punch Item within Procore and a corresponding Punch Item outside of Procore e.g. `3A`
- `cost_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
- `cost_impact_amount`: integer - Cost impact amount e.g. `100`
- `can_email`: boolean - Punch Item has Punch Item Assignments or distribution members to email to e.g. `false`
- `drawing_ids`: array of integer - Array of Drawing IDs
- `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
- `distribution_members`: array of object - Users on the Punch Item distribution list
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - User Company Name e.g. `Brickworks`
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
- `created_by`: object - User that created the Punch Item
  - `id`: integer - User ID e.g. `47531`
  - `name`: string - User Name e.g. `Jane Doe`
  - `login`: string - User Email e.g. `jane.doe@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `closed_by`: object - User that closed the Punch Item
  - `id`: integer - User ID e.g. `47531`
  - `name`: string - User Name e.g. `Jane Doe`
  - `login`: string - User Email e.g. `jane.doe@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `punch_item_manager`: object - User that manages the Punch Item
  - `id`: integer - User ID e.g. `55491`
  - `name`: string - User Name e.g. `John Doe`
  - `login`: string - User Email e.g. `john.doe@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `final_approver`: object - User in charge of closing the Punch Item
  - `id`: integer - User ID e.g. `32395`
  - `name`: string - User Name e.g. `Carl Contractor`
  - `login`: string - User Email e.g. `carl.contractor@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `punch_item_type`: object
  - `id`: integer - ID e.g. `44165`
  - `name`: string - Name e.g. `Extra Work`
- `category`: object - Category the Punch Item is classified under. Null when the Punch Item is uncategorized. Assign or change it by sending punch_item[category_id] on create or update, and filter lists with filters[category_id].
  - `id`: integer - Category ID. Pass as filters[category_id] on List Punch Items or as punch_item[category_id] when creating or updating a Punch Item. e.g. `4211`
  - `name`: string - Display name of the Category. e.g. `Electrical`
  - `active`: boolean - False when the Category has been deactivated. Deactivated Categories stay on the Punch Items already using them but are no longer offered for new assignments. e.g. `true`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `assignments`: array of object - Array of Punch Item Assignments
  - `id`: integer - ID e.g. `18655`
  - `approved`: boolean - Resolution status e.g. `true`
  - `comment`: string - Additional comments e.g. `Replaced the light fixture. See the attached photo.`
  - `notified_at`: string(date) - Date Assignee was notified e.g. `2018-06-25T22:22:42Z`
  - `ready_for_review_at`: string(date) - Date Assignee was notified e.g. `2018-06-25T22:22:42Z`
  - `work_not_accepted_at`: string(date) - Date Assignee was notified e.g. `2018-06-25T22:22:42Z`
  - `formatted_status`: string e.g. `Work Required`
  - `updated_at`: string(date) - Date Assignee response was updated on the Punch Item e.g. `2018-06-25T22:22:42Z`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
    - `active`: boolean - Whether user is active or not e.g. `true`
  - `attachments`: array of object - Array of Attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
    - `viewable`: boolean e.g. `true`
    - `can_be_viewed`: boolean e.g. `true`
- `rich_text_description`: string - Rich Text Description e.g. `<p>Light fixture in the bathroom is broken</p>`
- `attachments`: array of object - Array of Punch Item Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
  - `attached_to_item_id`: integer - Attached to item ID e.g. `323`
  - `attached_to_item_type`: string - Attached to item type e.g. `Image`
  - `viewer_url`: string - Unified viewer link e.g. `/webclients/host/companies/1/projects/1/tools/document-viewer/document-viewer...`
- `images`: array of object - Array of Images *DEPRECATED. Please use attachments instead
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `web_images`: array of object - Array of photo Attachments uploaded from the web application
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - Workflow status of the Punch Item e.g. `initiated`
- `custom_status`: object - The Punch Item's custom status. Resolved, so a Punch Item that has not been assigned a custom status explicitly reports its company's default status for the item's workflow_status. Null when the Punch Item custom stat...
  - `id`: integer - Punch Item Custom Status ID e.g. `42`
  - `name`: string - Display name. For a company default status this is the translated label of its legacy_workflow_status; for a company-created status it is the name the company gave it. e.g. `On Hold`
  - `default`: boolean - Whether this is one of the company's default statuses, which mirror the legacy workflow statuses one-for-one and cannot be renamed or deleted. e.g. `false`
  - `is_active`: boolean - Whether the custom status is available for assignment e.g. `true`
  - `legacy_workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - The legacy workflow_status a default status corresponds to. Null for company-created statuses. e.g. `work_required`
  - `global_status`: object - The global status group the custom status rolls up to
    - `id`: integer - Global status ID e.g. `2`
    - `name`: string enum[DRAFT, OPEN, CLOSED] - Global status name e.g. `OPEN`
- `download_all_attachments_uuid`: string - UUID for downloading all attachments associated with the Punch Item. This UUID can be used to generate a download link for all attachments in a single archive. e.g. `a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8`
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

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/punch_items/{id}

**Update Punch Item**
Update a specific Punch Item in a Project.
#### Uploading images
To upload images, upload the entire payload as `multipart/form-data` and include the images using `punch_item[images][]` as files, or alternatively provide Upload IDs using `punch_item[upload_ids][]`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Punch Item
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `project_id`: integer (required) - Project ID to which the Punch Item belongs to
- `punch_item`: object (required)
  - `description`: string - Description e.g. `Here is my updated description`
  - `due`: string(date) - Due date e.g. `2016-01-01`
  - `name`: string (required) - Name e.g. `My Updated Item`
  - `schedule_risk`: string enum[ml_low, ml_medium, ml_high] - Assessed risk level of on-time completion e.g. `ml_high`
  - `position`: integer - Position
  - `priority`: string - Punch item priority - 'low', 'medium', 'high'
  - `private`: boolean - Privacy status e.g. `false`
  - `status`: string enum[open, closed] - Status - 'open' or 'closed' e.g. `open`
  - `date_initiated`: string(date) - Date created
  - `schedule_impact`: string - Schedule impact status - yes_known, yes_unknown, no_impact, tbd, n_a e.g. `yes_known`
  - `schedule_impact_days`: integer - Schedule impact value in days e.g. `43`
  - `reference`: string - Used to create a reference point between a punch item within Procore and a corresponding punch item outside of Procore e.g. `4543b34`
  - `cost_impact`: string - Cost impact status - yes_known, yes_unknown, no_impact, tbd, n_a e.g. `yes_known`
  - `cost_impact_amount`: integer - Cost impact amount e.g. `54`
  - `trade_id`: integer - Trade ID e.g. `1234`
  - `category_id`: integer - ID of the Punch Item Category to classify this Punch Item under. Optional; omit it or send null to leave the Punch Item uncategorized. Only accepted while Punch Item Categories are enabled for the Project and the Cate... e.g. `4211`
  - `custom_status_id`: integer - ID of the Punch Item Custom Status to assign to this Punch Item. Only accepted while Punch Item Custom Statuses are enabled for the Company, and only for a status that belongs to the Company, is active, is not one of ... e.g. `4288`
  - `punch_item_type_id`: integer - Punch Item Type ID e.g. `5436`
  - `login_information_ids`: array of integer - Array of the User IDs of the Punch Item Assignments e.g. `[2343, 45343]`
  - `distribution_member_ids`: array of integer - Array of the User IDs of the Distribution Members e.g. `[4323, 86298]`
  - `punch_item_manager_id`: integer - Punch Item Manager ID e.g. `42`
  - `final_approver_id`: integer - Punch Item Final Approver ID e.g. `162`
  - `location_id`: integer - The ID of the Location of the Punch Item. `location_id` takes precedence over `mt_location` e.g. `9823`
  - `mt_location`: array of string - Use this for creating a new multi-tier or single-tier Location. This will be ignored if `location_id` is provided. e.g. `["upstairs", "meetingroom"]`
  - `workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - Workflow status of the Punch Item. These are more granular statuses in the punch item workflow. e.g. `initiated`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `prostore_file_ids`: array of integer - Prostore file IDs to attach to the punch item e.g. `[7889253049, 8981591777]`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `id`: integer - ID e.g. `13151`
- `ball_in_court`: array of object - Array of Users
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe (Brickworks)`
  - `locale`: string - User dictionary e.g. `ko`
- `comments`: array of object - Punch Item Comments
  - `id`: integer - Comment ID e.g. `1`
  - `body`: string - The text of the Comment e.g. `This is a photo of a cat`
  - `creator`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_at`: string(date-time) - Image Category created at e.g. `2013-11-08T00:00:00Z`
  - `updated_at`: string(date-time) - Comment update timestamp e.g. `2013-11-08T00:00:00Z`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `closed_at`: string(date-time) - Closed at e.g. `2012-10-24T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Description e.g. `Light fixture in the bathroom is broken`
- `due_date`: string(date) - Due Date e.g. `2013-09-30`
- `name`: string - Name e.g. `Fix broken light fixture`
- `schedule_risk`: string - Assessed risk level of on-time completion e.g. `ml_low`
- `schedule_risk_reason`: string - Reason for assessed risk level of on-time completion
- `position`: integer - Position e.g. `1`
- `priority`: string - Punch item priority - 'low', 'medium', 'high'
- `private`: boolean - Privacy status e.g. `false`
- `status`: string enum[Open, Closed, Overdue, Pending] - Status e.g. `Open`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `date_initiated`: string(date) - Date created e.g. `2013-06-11T01:27:52Z`
- `schedule_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
- `schedule_impact_days`: integer - Schedule impact value in days e.g. `3`
- `reference`: string - Used to create a reference point between a Punch Item within Procore and a corresponding Punch Item outside of Procore e.g. `3A`
- `cost_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
- `cost_impact_amount`: integer - Cost impact amount e.g. `100`
- `can_email`: boolean - Punch Item has Punch Item Assignments or distribution members to email to e.g. `false`
- `drawing_ids`: array of integer - Array of Drawing IDs
- `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
- `distribution_members`: array of object - Users on the Punch Item distribution list
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - User Company Name e.g. `Brickworks`
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
- `created_by`: object - User that created the Punch Item
  - `id`: integer - User ID e.g. `47531`
  - `name`: string - User Name e.g. `Jane Doe`
  - `login`: string - User Email e.g. `jane.doe@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `closed_by`: object - User that closed the Punch Item
  - `id`: integer - User ID e.g. `47531`
  - `name`: string - User Name e.g. `Jane Doe`
  - `login`: string - User Email e.g. `jane.doe@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `punch_item_manager`: object - User that manages the Punch Item
  - `id`: integer - User ID e.g. `55491`
  - `name`: string - User Name e.g. `John Doe`
  - `login`: string - User Email e.g. `john.doe@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `final_approver`: object - User in charge of closing the Punch Item
  - `id`: integer - User ID e.g. `32395`
  - `name`: string - User Name e.g. `Carl Contractor`
  - `login`: string - User Email e.g. `carl.contractor@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `punch_item_type`: object
  - `id`: integer - ID e.g. `44165`
  - `name`: string - Name e.g. `Extra Work`
- `category`: object - Category the Punch Item is classified under. Null when the Punch Item is uncategorized. Assign or change it by sending punch_item[category_id] on create or update, and filter lists with filters[category_id].
  - `id`: integer - Category ID. Pass as filters[category_id] on List Punch Items or as punch_item[category_id] when creating or updating a Punch Item. e.g. `4211`
  - `name`: string - Display name of the Category. e.g. `Electrical`
  - `active`: boolean - False when the Category has been deactivated. Deactivated Categories stay on the Punch Items already using them but are no longer offered for new assignments. e.g. `true`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `assignments`: array of object - Array of Punch Item Assignments
  - `id`: integer - ID e.g. `18655`
  - `approved`: boolean - Resolution status e.g. `true`
  - `comment`: string - Additional comments e.g. `Replaced the light fixture. See the attached photo.`
  - `notified_at`: string(date) - Date Assignee was notified e.g. `2018-06-25T22:22:42Z`
  - `ready_for_review_at`: string(date) - Date Assignee was notified e.g. `2018-06-25T22:22:42Z`
  - `work_not_accepted_at`: string(date) - Date Assignee was notified e.g. `2018-06-25T22:22:42Z`
  - `formatted_status`: string e.g. `Work Required`
  - `updated_at`: string(date) - Date Assignee response was updated on the Punch Item e.g. `2018-06-25T22:22:42Z`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
    - `active`: boolean - Whether user is active or not e.g. `true`
  - `attachments`: array of object - Array of Attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
    - `viewable`: boolean e.g. `true`
    - `can_be_viewed`: boolean e.g. `true`
- `rich_text_description`: string - Rich Text Description e.g. `<p>Light fixture in the bathroom is broken</p>`
- `attachments`: array of object - Array of Punch Item Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
  - `attached_to_item_id`: integer - Attached to item ID e.g. `323`
  - `attached_to_item_type`: string - Attached to item type e.g. `Image`
  - `viewer_url`: string - Unified viewer link e.g. `/webclients/host/companies/1/projects/1/tools/document-viewer/document-viewer...`
- `images`: array of object - Array of Images *DEPRECATED. Please use attachments instead
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `web_images`: array of object - Array of photo Attachments uploaded from the web application
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - Workflow status of the Punch Item e.g. `initiated`
- `custom_status`: object - The Punch Item's custom status. Resolved, so a Punch Item that has not been assigned a custom status explicitly reports its company's default status for the item's workflow_status. Null when the Punch Item custom stat...
  - `id`: integer - Punch Item Custom Status ID e.g. `42`
  - `name`: string - Display name. For a company default status this is the translated label of its legacy_workflow_status; for a company-created status it is the name the company gave it. e.g. `On Hold`
  - `default`: boolean - Whether this is one of the company's default statuses, which mirror the legacy workflow statuses one-for-one and cannot be renamed or deleted. e.g. `false`
  - `is_active`: boolean - Whether the custom status is available for assignment e.g. `true`
  - `legacy_workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - The legacy workflow_status a default status corresponds to. Null for company-created statuses. e.g. `work_required`
  - `global_status`: object - The global status group the custom status rolls up to
    - `id`: integer - Global status ID e.g. `2`
    - `name`: string enum[DRAFT, OPEN, CLOSED] - Global status name e.g. `OPEN`
- `download_all_attachments_uuid`: string - UUID for downloading all attachments associated with the Punch Item. This UUID can be used to generate a download link for all attachments in a single archive. e.g. `a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8`
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

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.1/punch_items/{id}

**Delete Punch Item**
Delete a specific Punch Item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Punch Item
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/punch_items/{id}/send_email

**Send Punch Item Email**
Send an email for a Punch Item in a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Punch Item

Request body (application/json) (required):

- `subject`: string - Email Subject e.g. `Description of email`
- `body`: string - Email Body e.g. `Body of email`
- `distribution_ids`: array of integer
- `cc_distribution_ids`: array of integer
- `bcc_distribution_ids`: array of integer

Response 200 (application/json): object


Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/punch_items/send_unsent

**Send unsent Punch Items**
Sends email notifications for unsent Punch Items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - ID of the Project

Response 200: OK (no body)

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/punch_items/recycle_bin

**List Deleted Punch Items**
Return an array of Deleted Punch objects for a specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `filters[category_id]` [query] array of string - Return item(s) assigned to the specified Punch Item Category ID(s). Pass the literal value 'none' to return uncategorized Punch Items (those with no Category assigned); 'none' may be combined with Category IDs to retu...
- `sort` [query] string enum[id, position, name, due, created_at, closed_at, description, priority, workflow_status, location_name, punch_item_type_name, reference, ...] - Field to sort the returned Punch Items by. Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter, for example sort=name for A-Z or sort=-created_at for newest first. Sortin...

Response 200 (application/json): object

- `id`: integer - ID e.g. `83978`
- `ball_in_court`: array of object - Array of Users
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
- `closed_at`: string(date-time) - Date time Punch Item was closed e.g. `2012-10-23T21:39:40Z`
- `cost_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
- `cost_impact_amount`: string - Cost impact amount e.g. `100.0`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Description
- `due_date`: string(date) - Due date e.g. `2013-09-30`
- `name`: string - Name e.g. `test 1 today`
- `reference`: string - Used to create a reference point between a Punch Item within Procore and a corresponding Punch Item outside of Procore e.g. `3A`
- `schedule_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
- `schedule_impact_days`: integer - Schedule impact value in days e.g. `3`
- `schedule_risk`: string enum[ml_low, ml_medium, ml_high] - Assessed risk level of on-time completion e.g. `ml_high`
- `schedule_risk_reason`: string - Reason for assessed risk level of on-time completion
- `schedule_risk_confidence`: integer - Confidence of schedule risk assessment e.g. `90`
- `schedule_risk_probability`: integer - Probability of schedule risk assessment e.g. `90`
- `position`: integer - Position e.g. `1`
- `priority`: string - Punch item priority - 'low', 'medium', 'high'
- `private`: boolean - Privacy status e.g. `false`
- `status`: string enum[Open, Closed, Overdue, Pending] - Status e.g. `Open`
- `has_resolved_responses`: boolean - At least one Punch Item Assignment has a status of 'resolved e.g. `true`
- `has_unresolved_responses`: boolean - At least one Punch Item Assignment has a status of 'unresolved' e.g. `true`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `closed_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `punch_item_manager`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `final_approver`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `punch_item_type`: object
  - `id`: integer - ID e.g. `44165`
  - `name`: string - Name e.g. `Extra Work`
- `category`: object - Category the Punch Item is classified under. Null when the Punch Item is uncategorized. Assign or change it by sending punch_item[category_id] on create or update, and filter lists with filters[category_id].
  - `id`: integer - Category ID. Pass as filters[category_id] on List Punch Items or as punch_item[category_id] when creating or updating a Punch Item. e.g. `4211`
  - `name`: string - Display name of the Category. e.g. `Electrical`
  - `active`: boolean - False when the Category has been deactivated. Deactivated Categories stay on the Punch Items already using them but are no longer offered for new assignments. e.g. `true`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `assignments`: array of object - Array of Punch Item Assignments
  - `id`: integer - ID e.g. `333675`
  - `approved`: boolean - Resolution status e.g. `true`
  - `comment`: string - Additional comment e.g. `Completed`
  - `login_information_id`: integer e.g. `420`
  - `login_information_name`: string e.g. `Edgar Admin`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `attachments`: array of object - Array of Attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `vendor`: object
    - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
    - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
  - `notified_at`: string(date-time) - Date Assignee was notified of the Punch Item e.g. `2018-06-25T22:22:42Z`
  - `responded_at`: string(date-time) - Date Assignee responded to the Punch Item e.g. `2018-06-25T22:22:42Z`
  - `status`: string - Status of Assignment e.g. `unresolved`
  - `manager_accepted_at`: string(date-time) - Date Punch Item Manager resolved the Punch Item Assignment e.g. `2018-10-26T18:15:26Z`
  - `user_name`: string e.g. `Edgar Admin`
  - `updated_at`: string(date-time) - Date Assignment was updated e.g. `2018-10-26T18:15:26Z`
- `assignees`: array of object - Punch Item Assignees
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - Workflow status of the Punch Item e.g. `initiated`
- `custom_status_id`: integer - ID of the Punch Item's custom status, returned on the flattened representation (view=flatten_v0). Resolved, so a Punch Item that has not been assigned a custom status explicitly reports its company's default status fo... e.g. `42`
- `custom_status`: object - The Punch Item's custom status. Resolved, so a Punch Item that has not been assigned a custom status explicitly reports its company's default status for the item's workflow_status. Null when the Punch Item custom stat...
  - `id`: integer - Punch Item Custom Status ID e.g. `42`
  - `name`: string - Display name. For a company default status this is the translated label of its legacy_workflow_status; for a company-created status it is the name the company gave it. e.g. `On Hold`
  - `default`: boolean - Whether this is one of the company's default statuses, which mirror the legacy workflow statuses one-for-one and cannot be renamed or deleted. e.g. `false`
  - `is_active`: boolean - Whether the custom status is available for assignment e.g. `true`
  - `legacy_workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - The legacy workflow_status a default status corresponds to. Null for company-created statuses. e.g. `work_required`
  - `global_status`: object - The global status group the custom status rolls up to
    - `id`: integer - Global status ID e.g. `2`
    - `name`: string enum[DRAFT, OPEN, CLOSED] - Global status name e.g. `OPEN`
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

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/punch_items/{id}/activities

**List Punch Item Activities**
Returns a list of all Punch Item Activities for a specified Punch Item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Punch Item
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `id`: integer - Punch Item Activity ID e.g. `13151`
- `assignee`: object
  - `id`: integer - ID e.g. `333675`
  - `approved`: boolean - Resolution status e.g. `true`
  - `comment`: string - Comment e.g. `Completed`
  - `login_information_id`: integer e.g. `420`
  - `login_information_name`: string e.g. `Edgar Admin`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `vendor`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `notified_at`: string - Date assignee was notified of Punch Item e.g. `2018-10-22T23:46:50Z`
  - `responded_at`: string - Date Assignee responded to the Punch Item e.g. `2018-10-26T17:51:30Z`
  - `manager_accepted_at`: string - Date Punch Item Manager resolved the Punch Item Assignment e.g. `2018-10-26T18:15:26Z`
  - `updated_at`: string - Date Assignment was updated e.g. `2018-10-26T18:15:26Z`
- `attachments`: array of object - Punch Item Comment Attachments
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
  - `thumbnail_url`: string - thumbnail url
- `comment`: string - Comment on the Punch Item Activity e.g. `New Comment`
- `created_at`: string - Date the Punch Item Activity was created e.g. `2018-10-22T23:46:50Z`
- `created_by`: object - User that created the Punch Item Activity
  - `id`: integer - User ID e.g. `47531`
  - `name`: string - User Name e.g. `Jane Doe`
  - `login`: string - User Email e.g. `jane.doe@example.com`
  - `locale`: string - User dictionary e.g. `ko`
- `status`: string - Punch Item Status or Punch Item Assignment Status recorded in the Activity
- `type`: string - Type of Punch Item Activity e.g. `PunchItemAssigneeResponse`
- `updated_at`: string - Date the Punch Item Activity was updated e.g. `2018-10-26T18:15:26Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/punch_items/{id}/comments

**Create Punch Item Comment**
Create a new Punch Item Comment in a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Punch Item
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `comment`: object (required)
  - `body`: string (required) - Comment Body
  - `document_management_document_revision_ids`: array of string - Document Management Document Revisions to attach to the response e.g. `["5c9800d3-bd12-45dd-a280-85fe887858b2", "da4b5e3b-ddaf-406f-8b2c-dceb6a60a203"]`
  - `prostore_file_ids`: array of integer - Prostore file IDs to attach to the comment e.g. `[7889253049, 8981591777]`
- `attachments`: array of string - Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 201 (application/json): object

- `id`: integer - ID of the Punch Item Comment e.g. `42`
- `attachments`: array of object - Punch Item Comment Attachments
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
  - `thumbnail_url`: string - thumbnail url
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
  - `attached_to_item_id`: integer - Attached to item ID e.g. `323`
  - `attached_to_item_type`: string - Attached to item type e.g. `Image`
  - `viewer_url`: string - Unified viewer link e.g. `/webclients/host/companies/1/projects/1/tools/document-viewer/document-viewer...`
- `body`: string - Punch Item Comment Body e.g. `New Comment`
- `created_at`: string - Date the Punch Item Comment was created e.g. `2018-10-22T23:46:50Z`
- `created_by`: object - User that created the Punch Item Comment
  - `id`: integer - User ID e.g. `47531`
  - `name`: string - User Name e.g. `Jane Doe`
  - `login`: string - User Email e.g. `jane.doe@example.com`
  - `company_name`: string - Name of the User's Company e.g. `Brickworks`
- `type`: string e.g. `Comment`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/punch_list/default_distribution

**List Punch Item Default Distribution List**
Returns a collection of Default Distribution Members for a given Punch Item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `160586`
- `login`: string - Email e.g. `carl.contractor@example.com`
- `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/punch_items  **[OLDER VERSION - a newer path version exists below/above]**

**List Punch Items**
Return a list of all Punch Items for a specified Project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[status]` [query] string enum[open, closed, pending] - Return item(s) with the specified Punch Item Status - 'open' or 'closed'.
- `filters[priority]` [query] string enum[low, medium, high] - Return item(s) with the specified Punch Item Priority - 'low', 'medium', 'high'
- `filters[punch_item_type_id]` [query] integer - Return item(s) with the specified Punch Item Type ID.
- `filters[location_id]` [query] array of integer - Location ID. Returns item(s) with the specified Location ID or a range of Location IDs.
- `filters[include_sublocations]` [query] boolean - Use together with `filters[location_id]`
- `filters[approver_login_information_id]` [query] integer - User ID. Returns item(s) where the specified User ID is an approver.
- `filters[vendor_id]` [query] integer - Return item(s) with the specified Vendor ID.
- `filters[assignee_response]` [query] boolean - If true, returns item(s) with the specified assignee response approved status.
- `filters[trade_id]` [query] integer - Trade ID
- `filters[category_id]` [query] array of string - Return item(s) assigned to the specified Punch Item Category ID(s). Pass the literal value 'none' to return uncategorized Punch Items (those with no Category assigned); 'none' may be combined with Category IDs to retu...
- `sort` [query] string enum[id, position, name, due, created_at, closed_at, description, priority, workflow_status, location_name, punch_item_type_name, reference, ...] - Field to sort the returned Punch Items by. Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter, for example sort=name for A-Z or sort=-created_at for newest first. Sortin...
- `filters[id]` [query] array of integer - Return item(s) with the specified Punch Item ID.
- `filters[query]` [query] string - Return item(s) containing search query
- `filters[view]` [query] string enum[my_items] - Filter the view of the punch items list. When set to 'my_items', returns only punch items associated to the current user as creator, manager, final approver, or assignee.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[closed_at][]` [query] array of string(date) - Return item(s) closed within the specified range. Supply as a two-element array of ISO 8601 date or datetime strings: the range start followed by the range end (e.g. `filters[closed_at][]=2026-01-01&filters[closed_at]...
- `filters[created_at][]` [query] array of string(date) - Return item(s) created within the specified range. Supply as a two-element array of ISO 8601 date or datetime strings: the range start followed by the range end (e.g. `filters[created_at][]=2026-01-01&filters[created_...
- `filters[date_notified][]` [query] array of string(date) - Return item(s) whose assignees were notified within the specified range. Supply as a two-element array of ISO 8601 date or datetime strings: the range start followed by the range end (e.g. `filters[date_notified][]=20...
- `filters[due_date][]` [query] array of string(date) - Return item(s) with a due date within the specified range. Supply as a two-element array of ISO 8601 date strings: the range start followed by the range end (e.g. `filters[due_date][]=2026-01-01&filters[due_date][]=20...

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `83978`
- `ball_in_court`: array of object - Array of Users
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
- `closed_at`: string(date-time) - Date time Punch Item was closed e.g. `2012-10-23T21:39:40Z`
- `cost_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
- `cost_impact_amount`: string - Cost impact amount e.g. `100.0`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Description
- `due_date`: string(date) - Due date e.g. `2013-09-30`
- `name`: string - Name e.g. `test 1 today`
- `reference`: string - Used to create a reference point between a Punch Item within Procore and a corresponding Punch Item outside of Procore e.g. `3A`
- `schedule_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
- `schedule_impact_days`: integer - Schedule impact value in days e.g. `3`
- `schedule_risk`: string enum[ml_low, ml_medium, ml_high] - Assessed risk level of on-time completion e.g. `ml_high`
- `schedule_risk_reason`: string - Reason for assessed risk level of on-time completion
- `schedule_risk_confidence`: integer - Confidence of schedule risk assessment e.g. `90`
- `schedule_risk_probability`: integer - Probability of schedule risk assessment e.g. `90`
- `position`: integer - Position e.g. `1`
- `priority`: string - Punch item priority - 'low', 'medium', 'high'
- `private`: boolean - Privacy status e.g. `false`
- `status`: string enum[Open, Closed, Overdue, Pending] - Status e.g. `Open`
- `has_resolved_responses`: boolean - At least one Punch Item Assignment has a status of 'resolved e.g. `true`
- `has_unresolved_responses`: boolean - At least one Punch Item Assignment has a status of 'unresolved' e.g. `true`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `closed_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `punch_item_manager`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `final_approver`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `punch_item_type`: object
  - `id`: integer - ID e.g. `44165`
  - `name`: string - Name e.g. `Extra Work`
- `category`: object - Category the Punch Item is classified under. Null when the Punch Item is uncategorized. Assign or change it by sending punch_item[category_id] on create or update, and filter lists with filters[category_id].
  - `id`: integer - Category ID. Pass as filters[category_id] on List Punch Items or as punch_item[category_id] when creating or updating a Punch Item. e.g. `4211`
  - `name`: string - Display name of the Category. e.g. `Electrical`
  - `active`: boolean - False when the Category has been deactivated. Deactivated Categories stay on the Punch Items already using them but are no longer offered for new assignments. e.g. `true`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `assignments`: array of object - Array of Punch Item Assignments
  - `id`: integer - ID e.g. `333675`
  - `approved`: boolean - Resolution status e.g. `true`
  - `comment`: string - Additional comment e.g. `Completed`
  - `login_information_id`: integer e.g. `420`
  - `login_information_name`: string e.g. `Edgar Admin`
  - `login_information`: object - Login Information
    - `id`: integer - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `attachments`: array of object - Array of Attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `vendor`: object
    - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
    - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
  - `notified_at`: string(date-time) - Date assignee was notified of Punch Item e.g. `2018-10-22T23:46:50Z`
  - `responded_at`: string(date-time) - Date Assignee responded to the Punch Item e.g. `2018-06-25T22:22:42Z`
  - `status`: string - Status of Assignment e.g. `unresolved`
  - `manager_accepted_at`: string(date-time) - Date Punch Item Manager resolved the Punch Item Assignment e.g. `2018-10-26T18:15:26Z`
  - `user_name`: string e.g. `Edgar Admin`
  - `updated_at`: string(date-time) - Date Assignment was updated e.g. `2018-10-26T18:15:26Z`
- `assignees`: array of object - Punch Item Assignees
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
- `latitude`: string - Latitude of Punch Item (Deprecated)
- `longitude`: string - Longitude of Punch Item (Deprecated)
- `horizontal_accuracy`: string - Horizontal Accuracy of Punch Item (Deprecated)
- `vertical_accuracy`: string - Vertical Accuracy of Punch Item (Deprecated)
- `altitude`: string - Altitude of Punch Item (Deprecated)
- `workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - Workflow status of the Punch Item e.g. `initiated`
- `custom_status_id`: integer - ID of the Punch Item's custom status, returned on the flattened representation (view=flatten_v0). Resolved, so a Punch Item that has not been assigned a custom status explicitly reports its company's default status fo... e.g. `42`
- `custom_status`: object - The Punch Item's custom status. Resolved, so a Punch Item that has not been assigned a custom status explicitly reports its company's default status for the item's workflow_status. Null when the Punch Item custom stat...
  - `id`: integer - Punch Item Custom Status ID e.g. `42`
  - `name`: string - Display name. For a company default status this is the translated label of its legacy_workflow_status; for a company-created status it is the name the company gave it. e.g. `On Hold`
  - `default`: boolean - Whether this is one of the company's default statuses, which mirror the legacy workflow statuses one-for-one and cannot be renamed or deleted. e.g. `false`
  - `is_active`: boolean - Whether the custom status is available for assignment e.g. `true`
  - `legacy_workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - The legacy workflow_status a default status corresponds to. Null for company-created statuses. e.g. `work_required`
  - `global_status`: object - The global status group the custom status rolls up to
    - `id`: integer - Global status ID e.g. `2`
    - `name`: string enum[DRAFT, OPEN, CLOSED] - Global status name e.g. `OPEN`
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

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/punch_items  **[OLDER VERSION - a newer path version exists below/above]**

**Create Punch Item**
Create a new Punch Item in a Project.
#### Uploading images
To upload images you must upload the entire payload as `multipart/form-data` content-type and
specify each parameter as form-data together with `punch_item[images][]` as files.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `project_id`: integer (required) - Project ID to which the Punch Item belongs to
- `punch_item`: object (required)
  - `description`: string - Description e.g. `Here is my updated description`
  - `due`: string(date) - Due date e.g. `2016-01-01`
  - `name`: string (required) - Name e.g. `My Updated Item`
  - `schedule_risk`: string enum[ml_low, ml_medium, ml_high] - Assessed risk level of on-time completion e.g. `ml_high`
  - `position`: integer - Position
  - `priority`: string - Punch item priority - 'low', 'medium', 'high'
  - `private`: boolean - Privacy status e.g. `false`
  - `status`: string enum[Open, Closed, Overdue, Pending] - Status - 'open' or 'closed' e.g. `Open`
  - `date_initiated`: string(date) - Date created
  - `schedule_impact`: string - Schedule impact status - yes_known, yes_unknown, no_impact, tbd, n_a e.g. `yes_known`
  - `schedule_impact_days`: integer - Schedule impact value in days e.g. `43`
  - `reference`: string - Used to create a reference point between a Punch Item within Procore and a corresponding Punch Item outside of Procore e.g. `5rt498`
  - `cost_code_id`: integer - ID of the cost code associated with the punch item. e.g. `9900`
  - `cost_impact`: string - Cost impact Status - yes_known, yes_unknown, no_impact, tbd, n_a e.g. `yes_known`
  - `cost_impact_amount`: integer - Cost impact amount e.g. `54`
  - `trade_id`: integer - Trade IDs e.g. `1234`
  - `category_id`: integer - ID of the Punch Item Category to classify this Punch Item under. Optional; omit it or send null to leave the Punch Item uncategorized. Only accepted while Punch Item Categories are enabled for the Project and the Cate... e.g. `4211`
  - `custom_status_id`: integer - ID of the Punch Item Custom Status to assign to this Punch Item. Only accepted while Punch Item Custom Statuses are enabled for the Company, and only for a status that belongs to the Company, is active, is not one of ... e.g. `4288`
  - `punch_item_type_id`: integer - Punch Item Type ID e.g. `5436`
  - `login_information_ids`: array of integer - Array of the User IDs of the Punch Item Assignments e.g. `[2343, 45343]`
  - `distribution_member_ids`: array of integer - Array of the User IDs of the Distribution Members e.g. `[4323, 86298]`
  - `punch_item_manager_id`: integer - Punch Item Manager ID e.g. `42`
  - `final_approver_id`: integer - Punch Item Final Approver ID e.g. `162`
  - `location_id`: integer - The ID of the Location of the Punch Item. `location_id` takes precedence over `mt_location` e.g. `9823`
  - `mt_location`: array of string - Use this for creating a new multi-tier or single-tier Location. This will be ignored if `location_id` is provided. e.g. `["upstairs", "meetingroom"]`
  - `workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - Workflow status of the Punch Item. These are more granular statuses in the punch item workflow. e.g. `initiated`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 201 (application/json): object

- `id`: integer - ID e.g. `13151`
- `ball_in_court`: array of object - Array of Users
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe (Brickworks)`
  - `locale`: string - User dictionary e.g. `ko`
- `comments`: array of object - Punch Item Comments
  - `id`: integer - Comment ID e.g. `1`
  - `body`: string - The text of the Comment e.g. `This is a photo of a cat`
  - `creator`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_at`: string(date-time) - Image Category created at e.g. `2013-11-08T00:00:00Z`
  - `updated_at`: string(date-time) - Comment update timestamp e.g. `2013-11-08T00:00:00Z`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `closed_at`: string(date-time) - Closed at e.g. `2012-10-24T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Description e.g. `Light fixture in the bathroom is broken`
- `due_date`: string(date) - Due Date e.g. `2013-09-30`
- `name`: string - Name e.g. `Fix broken light fixture`
- `schedule_risk`: string - Assessed risk level of on-time completion e.g. `ml_low`
- `schedule_risk_reason`: string - Reason for assessed risk level of on-time completion
- `position`: integer - Position e.g. `1`
- `priority`: string - Punch item priority - 'low', 'medium', 'high'
- `private`: boolean - Privacy status e.g. `false`
- `status`: string enum[Open, Closed, Overdue, Pending] - Status e.g. `Open`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `date_initiated`: string(date) - Date created e.g. `2013-06-11T01:27:52Z`
- `schedule_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
- `schedule_impact_days`: integer - Schedule impact value in days e.g. `3`
- `reference`: string - Used to create a reference point between a Punch Item within Procore and a corresponding Punch Item outside of Procore e.g. `3A`
- `cost_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
- `cost_impact_amount`: integer - Cost impact amount e.g. `100`
- `can_email`: boolean - Punch Item has Punch Item Assignments or distribution members to email to e.g. `false`
- `drawing_ids`: array of integer - Array of Drawing IDs
- `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
- `distribution_members`: array of object - Users on the Punch Item distribution list
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - User Company Name e.g. `Brickworks`
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
- `created_by`: object - User that created the Punch Item
  - `id`: integer - User ID e.g. `47531`
  - `name`: string - User Name e.g. `Jane Doe`
  - `login`: string - User Email e.g. `jane.doe@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `closed_by`: object - User that closed the Punch Item
  - `id`: integer - User ID e.g. `47531`
  - `name`: string - User Name e.g. `Jane Doe`
  - `login`: string - User Email e.g. `jane.doe@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `punch_item_manager`: object - User that manages the Punch Item
  - `id`: integer - User ID e.g. `55491`
  - `name`: string - User Name e.g. `John Doe`
  - `login`: string - User Email e.g. `john.doe@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `final_approver`: object - User in charge of closing the Punch Item
  - `id`: integer - User ID e.g. `32395`
  - `name`: string - User Name e.g. `Carl Contractor`
  - `login`: string - User Email e.g. `carl.contractor@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `punch_item_type`: object
  - `id`: integer - ID e.g. `44165`
  - `name`: string - Name e.g. `Extra Work`
- `category`: object - Category the Punch Item is classified under. Null when the Punch Item is uncategorized. Assign or change it by sending punch_item[category_id] on create or update, and filter lists with filters[category_id].
  - `id`: integer - Category ID. Pass as filters[category_id] on List Punch Items or as punch_item[category_id] when creating or updating a Punch Item. e.g. `4211`
  - `name`: string - Display name of the Category. e.g. `Electrical`
  - `active`: boolean - False when the Category has been deactivated. Deactivated Categories stay on the Punch Items already using them but are no longer offered for new assignments. e.g. `true`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `assignments`: array of object - Array of Punch Item Assignments
  - `id`: integer - ID e.g. `18655`
  - `approved`: boolean - Resolution status e.g. `true`
  - `comment`: string - Additional comments e.g. `Replaced the light fixture. See the attached photo.`
  - `notified_at`: string(date) - Date Assignee was notified e.g. `2018-06-25T22:22:42Z`
  - `ready_for_review_at`: string(date) - Date Assignee was notified e.g. `2018-06-25T22:22:42Z`
  - `work_not_accepted_at`: string(date) - Date Assignee was notified e.g. `2018-06-25T22:22:42Z`
  - `formatted_status`: string e.g. `Work Required`
  - `updated_at`: string(date) - Date Assignee response was updated on the Punch Item e.g. `2018-06-25T22:22:42Z`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
    - `active`: boolean - Whether user is active or not e.g. `true`
  - `attachments`: array of object - Array of Attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
    - `viewable`: boolean e.g. `true`
    - `can_be_viewed`: boolean e.g. `true`
- `rich_text_description`: string - Rich Text Description e.g. `<p>Light fixture in the bathroom is broken</p>`
- `attachments`: array of object - Array of Punch Item Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
  - `attached_to_item_id`: integer - Attached to item ID e.g. `323`
  - `attached_to_item_type`: string - Attached to item type e.g. `Image`
  - `viewer_url`: string - Unified viewer link e.g. `/webclients/host/companies/1/projects/1/tools/document-viewer/document-viewer...`
- `images`: array of object - Array of Images *DEPRECATED. Please use attachments instead
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `web_images`: array of object - Array of photo Attachments uploaded from the web application
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - Workflow status of the Punch Item e.g. `initiated`
- `custom_status`: object - The Punch Item's custom status. Resolved, so a Punch Item that has not been assigned a custom status explicitly reports its company's default status for the item's workflow_status. Null when the Punch Item custom stat...
  - `id`: integer - Punch Item Custom Status ID e.g. `42`
  - `name`: string - Display name. For a company default status this is the translated label of its legacy_workflow_status; for a company-created status it is the name the company gave it. e.g. `On Hold`
  - `default`: boolean - Whether this is one of the company's default statuses, which mirror the legacy workflow statuses one-for-one and cannot be renamed or deleted. e.g. `false`
  - `is_active`: boolean - Whether the custom status is available for assignment e.g. `true`
  - `legacy_workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - The legacy workflow_status a default status corresponds to. Null for company-created statuses. e.g. `work_required`
  - `global_status`: object - The global status group the custom status rolls up to
    - `id`: integer - Global status ID e.g. `2`
    - `name`: string enum[DRAFT, OPEN, CLOSED] - Global status name e.g. `OPEN`
- `download_all_attachments_uuid`: string - UUID for downloading all attachments associated with the Punch Item. This UUID can be used to generate a download link for all attachments in a single archive. e.g. `a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8`
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

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/punch_items/add_punch_item_attachments  **[OLDER VERSION - a newer path version exists below/above]**

**Add Attachments to Punch Item**
Add Attachments to Punch Item
#### Uploading images
To upload images you must upload the entire payload as `multipart/form-data` content-type and
specify each parameter as form-data together with `attachments[]` as files.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [query] integer (required) - ID of the Punch Item
- `project_id` [query] integer (required) - ID of the project

Request body (multipart/form-data):

- `attachments`: array of string - Punch Item Assignment attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 200 (application/json): object

- `id`: integer
- `name`: string - Use :name, :filename to be deprecated
- `url`: string
- `filename`: string - :filename to be deprecated, use :name

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/punch_items/send_all_unsent  **[OLDER VERSION - a newer path version exists below/above]**

**Send All Unsent Punch Item Emails**
Send all unsent Punch Item emails in a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `punch_ids`: array of integer
- `recipient`: string enum[assignee, manager] - Recipient role e.g. `manager`

Response 200 (application/json): object


Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/punch_items/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Show Punch Item**
Return detailed information about a specific Punch Item in a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Punch Item
- `project_id` [query] integer (required) - Unique identifier for the project.
- `include_deleted` [query] boolean - Returns deleted items when set to true

Response 200 (application/json): object

- `id`: integer - ID e.g. `13151`
- `ball_in_court`: array of object - Array of Users
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe (Brickworks)`
  - `locale`: string - User dictionary e.g. `ko`
- `comments`: array of object - Punch Item Comments
  - `id`: integer - Comment ID e.g. `1`
  - `body`: string - The text of the Comment e.g. `This is a photo of a cat`
  - `creator`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_at`: string(date-time) - Image Category created at e.g. `2013-11-08T00:00:00Z`
  - `updated_at`: string(date-time) - Comment update timestamp e.g. `2013-11-08T00:00:00Z`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `closed_at`: string(date-time) - Closed at e.g. `2012-10-24T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Description e.g. `Light fixture in the bathroom is broken`
- `due_date`: string(date) - Due Date e.g. `2013-09-30`
- `name`: string - Name e.g. `Fix broken light fixture`
- `schedule_risk`: string - Assessed risk level of on-time completion e.g. `ml_low`
- `schedule_risk_reason`: string - Reason for assessed risk level of on-time completion
- `position`: integer - Position e.g. `1`
- `priority`: string - Punch item priority - 'low', 'medium', 'high'
- `private`: boolean - Privacy status e.g. `false`
- `status`: string enum[Open, Closed, Overdue, Pending] - Status e.g. `Open`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `date_initiated`: string(date) - Date created e.g. `2013-06-11T01:27:52Z`
- `schedule_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
- `schedule_impact_days`: integer - Schedule impact value in days e.g. `3`
- `reference`: string - Used to create a reference point between a Punch Item within Procore and a corresponding Punch Item outside of Procore e.g. `3A`
- `cost_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
- `cost_impact_amount`: integer - Cost impact amount e.g. `100`
- `can_email`: boolean - Punch Item has Punch Item Assignments or distribution members to email to e.g. `false`
- `drawing_ids`: array of integer - Array of Drawing IDs
- `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
- `distribution_members`: array of object - Users on the Punch Item distribution list
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - User Company Name e.g. `Brickworks`
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
- `created_by`: object - User that created the Punch Item
  - `id`: integer - User ID e.g. `47531`
  - `name`: string - User Name e.g. `Jane Doe`
  - `login`: string - User Email e.g. `jane.doe@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `closed_by`: object - User that closed the Punch Item
  - `id`: integer - User ID e.g. `47531`
  - `name`: string - User Name e.g. `Jane Doe`
  - `login`: string - User Email e.g. `jane.doe@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `punch_item_manager`: object - User that manages the Punch Item
  - `id`: integer - User ID e.g. `55491`
  - `name`: string - User Name e.g. `John Doe`
  - `login`: string - User Email e.g. `john.doe@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `final_approver`: object - User in charge of closing the Punch Item
  - `id`: integer - User ID e.g. `32395`
  - `name`: string - User Name e.g. `Carl Contractor`
  - `login`: string - User Email e.g. `carl.contractor@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `punch_item_type`: object
  - `id`: integer - ID e.g. `44165`
  - `name`: string - Name e.g. `Extra Work`
- `category`: object - Category the Punch Item is classified under. Null when the Punch Item is uncategorized. Assign or change it by sending punch_item[category_id] on create or update, and filter lists with filters[category_id].
  - `id`: integer - Category ID. Pass as filters[category_id] on List Punch Items or as punch_item[category_id] when creating or updating a Punch Item. e.g. `4211`
  - `name`: string - Display name of the Category. e.g. `Electrical`
  - `active`: boolean - False when the Category has been deactivated. Deactivated Categories stay on the Punch Items already using them but are no longer offered for new assignments. e.g. `true`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `assignments`: array of object - Array of Punch Item Assignments
  - `id`: integer - ID e.g. `18655`
  - `approved`: boolean - Resolution status e.g. `true`
  - `comment`: string - Additional comments e.g. `Replaced the light fixture. See the attached photo.`
  - `notified_at`: string(date) - Date Assignee was notified e.g. `2018-06-25T22:22:42Z`
  - `ready_for_review_at`: string(date) - Date Assignee was notified e.g. `2018-06-25T22:22:42Z`
  - `work_not_accepted_at`: string(date) - Date Assignee was notified e.g. `2018-06-25T22:22:42Z`
  - `formatted_status`: string e.g. `Work Required`
  - `updated_at`: string(date) - Date Assignee response was updated on the Punch Item e.g. `2018-06-25T22:22:42Z`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
    - `active`: boolean - Whether user is active or not e.g. `true`
  - `attachments`: array of object - Array of Attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
    - `viewable`: boolean e.g. `true`
    - `can_be_viewed`: boolean e.g. `true`
- `rich_text_description`: string - Rich Text Description e.g. `<p>Light fixture in the bathroom is broken</p>`
- `attachments`: array of object - Array of Punch Item Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
  - `attached_to_item_id`: integer - Attached to item ID e.g. `323`
  - `attached_to_item_type`: string - Attached to item type e.g. `Image`
  - `viewer_url`: string - Unified viewer link e.g. `/webclients/host/companies/1/projects/1/tools/document-viewer/document-viewer...`
- `images`: array of object - Array of Images *DEPRECATED. Please use attachments instead
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `web_images`: array of object - Array of photo Attachments uploaded from the web application
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - Workflow status of the Punch Item e.g. `initiated`
- `custom_status`: object - The Punch Item's custom status. Resolved, so a Punch Item that has not been assigned a custom status explicitly reports its company's default status for the item's workflow_status. Null when the Punch Item custom stat...
  - `id`: integer - Punch Item Custom Status ID e.g. `42`
  - `name`: string - Display name. For a company default status this is the translated label of its legacy_workflow_status; for a company-created status it is the name the company gave it. e.g. `On Hold`
  - `default`: boolean - Whether this is one of the company's default statuses, which mirror the legacy workflow statuses one-for-one and cannot be renamed or deleted. e.g. `false`
  - `is_active`: boolean - Whether the custom status is available for assignment e.g. `true`
  - `legacy_workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - The legacy workflow_status a default status corresponds to. Null for company-created statuses. e.g. `work_required`
  - `global_status`: object - The global status group the custom status rolls up to
    - `id`: integer - Global status ID e.g. `2`
    - `name`: string enum[DRAFT, OPEN, CLOSED] - Global status name e.g. `OPEN`
- `download_all_attachments_uuid`: string - UUID for downloading all attachments associated with the Punch Item. This UUID can be used to generate a download link for all attachments in a single archive. e.g. `a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8`
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

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/punch_items/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Update Punch Item**
Update a specific Punch Item in a Project.
#### Uploading images
To upload images, upload the entire payload as `multipart/form-data` and include the images using `punch_item[images][]` as files, or alternatively provide Upload IDs using `punch_item[upload_ids][]`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Punch Item
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `project_id`: integer (required) - Project ID to which the Punch Item belongs to
- `punch_item`: object (required)
  - `description`: string - Description e.g. `Here is my updated description`
  - `due`: string(date) - Due date e.g. `2016-01-01`
  - `name`: string (required) - Name e.g. `My Updated Item`
  - `schedule_risk`: string enum[ml_low, ml_medium, ml_high] - Assessed risk level of on-time completion e.g. `ml_high`
  - `position`: integer - Position
  - `priority`: string - Punch item priority - 'low', 'medium', 'high'
  - `private`: boolean - Privacy status e.g. `false`
  - `status`: string enum[Open, Closed, Overdue, Pending] - Status - 'open' or 'closed' e.g. `Open`
  - `date_initiated`: string(date) - Date created
  - `schedule_impact`: string - Schedule impact status - yes_known, yes_unknown, no_impact, tbd, n_a e.g. `yes_known`
  - `schedule_impact_days`: integer - Schedule impact value in days e.g. `43`
  - `reference`: string - Used to create a reference point between a punch item within Procore and a corresponding punch item outside of Procore e.g. `4543b34`
  - `cost_impact`: string - Cost impact status - yes_known, yes_unknown, no_impact, tbd, n_a e.g. `yes_known`
  - `cost_impact_amount`: integer - Cost impact amount e.g. `54`
  - `trade_id`: integer - Trade ID e.g. `1234`
  - `category_id`: integer - ID of the Punch Item Category to classify this Punch Item under. Optional; omit it or send null to leave the Punch Item uncategorized. Only accepted while Punch Item Categories are enabled for the Project and the Cate... e.g. `4211`
  - `custom_status_id`: integer - ID of the Punch Item Custom Status to assign to this Punch Item. Only accepted while Punch Item Custom Statuses are enabled for the Company, and only for a status that belongs to the Company, is active, is not one of ... e.g. `4288`
  - `punch_item_type_id`: integer - Punch Item Type ID e.g. `5436`
  - `login_information_ids`: array of integer - Array of the User IDs of the Punch Item Assignments e.g. `[2343, 45343]`
  - `distribution_member_ids`: array of integer - Array of the User IDs of the Distribution Members e.g. `[4323, 86298]`
  - `punch_item_manager_id`: integer - Punch Item Manager ID e.g. `42`
  - `final_approver_id`: integer - Punch Item Final Approver ID e.g. `162`
  - `location_id`: integer - The ID of the Location of the Punch Item. `location_id` takes precedence over `mt_location` e.g. `9823`
  - `mt_location`: array of string - Use this for creating a new multi-tier or single-tier Location. This will be ignored if `location_id` is provided. e.g. `["upstairs", "meetingroom"]`
  - `workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - Workflow status of the Punch Item. These are more granular statuses in the punch item workflow. e.g. `initiated`
  - `document_management_document_revision_ids`: array of string - Document Management Document Revisions to attach to the Punch Item e.g. `["5c9800d3-bd12-45dd-a280-85fe887858b2", "da4b5e3b-ddaf-406f-8b2c-dceb6a60a203"]`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the Punch Item e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the Punch Item e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the Punch Item e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the Punch Item e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the Punch Item e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `id`: integer - ID e.g. `13151`
- `ball_in_court`: array of object - Array of Users
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe (Brickworks)`
  - `locale`: string - User dictionary e.g. `ko`
- `comments`: array of object - Punch Item Comments
  - `id`: integer - Comment ID e.g. `1`
  - `body`: string - The text of the Comment e.g. `This is a photo of a cat`
  - `creator`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_at`: string(date-time) - Image Category created at e.g. `2013-11-08T00:00:00Z`
  - `updated_at`: string(date-time) - Comment update timestamp e.g. `2013-11-08T00:00:00Z`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `closed_at`: string(date-time) - Closed at e.g. `2012-10-24T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Description e.g. `Light fixture in the bathroom is broken`
- `due_date`: string(date) - Due Date e.g. `2013-09-30`
- `name`: string - Name e.g. `Fix broken light fixture`
- `schedule_risk`: string - Assessed risk level of on-time completion e.g. `ml_low`
- `schedule_risk_reason`: string - Reason for assessed risk level of on-time completion
- `position`: integer - Position e.g. `1`
- `priority`: string - Punch item priority - 'low', 'medium', 'high'
- `private`: boolean - Privacy status e.g. `false`
- `status`: string enum[Open, Closed, Overdue, Pending] - Status e.g. `Open`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `date_initiated`: string(date) - Date created e.g. `2013-06-11T01:27:52Z`
- `schedule_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
- `schedule_impact_days`: integer - Schedule impact value in days e.g. `3`
- `reference`: string - Used to create a reference point between a Punch Item within Procore and a corresponding Punch Item outside of Procore e.g. `3A`
- `cost_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
- `cost_impact_amount`: integer - Cost impact amount e.g. `100`
- `can_email`: boolean - Punch Item has Punch Item Assignments or distribution members to email to e.g. `false`
- `drawing_ids`: array of integer - Array of Drawing IDs
- `current_drawing_revision_ids`: array of integer - Array of Current Drawing Revision IDs
- `distribution_members`: array of object - Users on the Punch Item distribution list
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company_name`: string - User Company Name e.g. `Brickworks`
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
- `created_by`: object - User that created the Punch Item
  - `id`: integer - User ID e.g. `47531`
  - `name`: string - User Name e.g. `Jane Doe`
  - `login`: string - User Email e.g. `jane.doe@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `closed_by`: object - User that closed the Punch Item
  - `id`: integer - User ID e.g. `47531`
  - `name`: string - User Name e.g. `Jane Doe`
  - `login`: string - User Email e.g. `jane.doe@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `punch_item_manager`: object - User that manages the Punch Item
  - `id`: integer - User ID e.g. `55491`
  - `name`: string - User Name e.g. `John Doe`
  - `login`: string - User Email e.g. `john.doe@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `final_approver`: object - User in charge of closing the Punch Item
  - `id`: integer - User ID e.g. `32395`
  - `name`: string - User Name e.g. `Carl Contractor`
  - `login`: string - User Email e.g. `carl.contractor@example.com`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `punch_item_type`: object
  - `id`: integer - ID e.g. `44165`
  - `name`: string - Name e.g. `Extra Work`
- `category`: object - Category the Punch Item is classified under. Null when the Punch Item is uncategorized. Assign or change it by sending punch_item[category_id] on create or update, and filter lists with filters[category_id].
  - `id`: integer - Category ID. Pass as filters[category_id] on List Punch Items or as punch_item[category_id] when creating or updating a Punch Item. e.g. `4211`
  - `name`: string - Display name of the Category. e.g. `Electrical`
  - `active`: boolean - False when the Category has been deactivated. Deactivated Categories stay on the Punch Items already using them but are no longer offered for new assignments. e.g. `true`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `assignments`: array of object - Array of Punch Item Assignments
  - `id`: integer - ID e.g. `18655`
  - `approved`: boolean - Resolution status e.g. `true`
  - `comment`: string - Additional comments e.g. `Replaced the light fixture. See the attached photo.`
  - `notified_at`: string(date) - Date Assignee was notified e.g. `2018-06-25T22:22:42Z`
  - `ready_for_review_at`: string(date) - Date Assignee was notified e.g. `2018-06-25T22:22:42Z`
  - `work_not_accepted_at`: string(date) - Date Assignee was notified e.g. `2018-06-25T22:22:42Z`
  - `formatted_status`: string e.g. `Work Required`
  - `updated_at`: string(date) - Date Assignee response was updated on the Punch Item e.g. `2018-06-25T22:22:42Z`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
    - `active`: boolean - Whether user is active or not e.g. `true`
  - `attachments`: array of object - Array of Attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
    - `viewable`: boolean e.g. `true`
    - `can_be_viewed`: boolean e.g. `true`
- `rich_text_description`: string - Rich Text Description e.g. `<p>Light fixture in the bathroom is broken</p>`
- `attachments`: array of object - Array of Punch Item Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `viewable_document_id`: integer - Viewable Document ID e.g. `492`
  - `attached_to_item_id`: integer - Attached to item ID e.g. `323`
  - `attached_to_item_type`: string - Attached to item type e.g. `Image`
  - `viewer_url`: string - Unified viewer link e.g. `/webclients/host/companies/1/projects/1/tools/document-viewer/document-viewer...`
- `images`: array of object - Array of Images *DEPRECATED. Please use attachments instead
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `web_images`: array of object - Array of photo Attachments uploaded from the web application
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - Workflow status of the Punch Item e.g. `initiated`
- `custom_status`: object - The Punch Item's custom status. Resolved, so a Punch Item that has not been assigned a custom status explicitly reports its company's default status for the item's workflow_status. Null when the Punch Item custom stat...
  - `id`: integer - Punch Item Custom Status ID e.g. `42`
  - `name`: string - Display name. For a company default status this is the translated label of its legacy_workflow_status; for a company-created status it is the name the company gave it. e.g. `On Hold`
  - `default`: boolean - Whether this is one of the company's default statuses, which mirror the legacy workflow statuses one-for-one and cannot be renamed or deleted. e.g. `false`
  - `is_active`: boolean - Whether the custom status is available for assignment e.g. `true`
  - `legacy_workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - The legacy workflow_status a default status corresponds to. Null for company-created statuses. e.g. `work_required`
  - `global_status`: object - The global status group the custom status rolls up to
    - `id`: integer - Global status ID e.g. `2`
    - `name`: string enum[DRAFT, OPEN, CLOSED] - Global status name e.g. `OPEN`
- `download_all_attachments_uuid`: string - UUID for downloading all attachments associated with the Punch Item. This UUID can be used to generate a download link for all attachments in a single archive. e.g. `a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8`
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

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/punch_items/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Delete Punch Item**
Delete a specific Punch Item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Punch Item
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/punch_items/{id}/send_email  **[OLDER VERSION - a newer path version exists below/above]**

**Send Punch Item Email**
Send an email for a Punch Item in a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Punch Item

Request body (application/json) (required):

- `subject`: string - Email Subject e.g. `Description of email`
- `body`: string - Email Body e.g. `Body of email`
- `distribution_ids`: array of integer
- `cc_distribution_ids`: array of integer
- `bcc_distribution_ids`: array of integer

Response 200 (application/json): object


Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/punch_items/send_unsent  **[OLDER VERSION - a newer path version exists below/above]**

**Send unsent Punch Items**
Sends email notifications for unsent Punch Items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - ID of the Project

Response 200: OK (no body)

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/punch_items/recycle_bin  **[OLDER VERSION - a newer path version exists below/above]**

**List Deleted Punch Items**
Return an array of Deleted Punch objects for a specified Project. Supports the same filter and search parameters as the List Punch Items endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[status]` [query] string enum[open, closed, pending] - Return item(s) with the specified Punch Item Status - 'open' or 'closed'.
- `filters[priority]` [query] string enum[low, medium, high] - Return item(s) with the specified Punch Item Priority - 'low', 'medium', 'high'
- `filters[punch_item_type_id]` [query] integer - Return item(s) with the specified Punch Item Type ID.
- `filters[location_id]` [query] array of integer - Location ID. Returns item(s) with the specified Location ID or a range of Location IDs.
- `filters[include_sublocations]` [query] boolean - Use together with `filters[location_id]`
- `filters[approver_login_information_id]` [query] integer - User ID. Returns item(s) where the specified User ID is an approver.
- `filters[vendor_id]` [query] integer - Return item(s) with the specified Vendor ID.
- `filters[assignee_response]` [query] boolean - If true, returns item(s) with the specified assignee response approved status.
- `filters[trade_id]` [query] integer - Trade ID
- `filters[category_id]` [query] array of string - Return item(s) assigned to the specified Punch Item Category ID(s). Pass the literal value 'none' to return uncategorized Punch Items (those with no Category assigned); 'none' may be combined with Category IDs to retu...
- `sort` [query] string enum[id, position, name, due, created_at, closed_at, description, priority, workflow_status, location_name, punch_item_type_name, reference, ...] - Field to sort the returned Punch Items by. Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter, for example sort=name for A-Z or sort=-created_at for newest first. Sortin...
- `filters[id]` [query] array of integer - Return item(s) with the specified Punch Item ID.
- `filters[query]` [query] string - Return item(s) containing search query

Response 200 (application/json): object

- `id`: integer - ID e.g. `83978`
- `ball_in_court`: array of object - Array of Users
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
- `closed_at`: string(date-time) - Date time Punch Item was closed e.g. `2012-10-23T21:39:40Z`
- `cost_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
- `cost_impact_amount`: string - Cost impact amount e.g. `100.0`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Description
- `due_date`: string(date) - Due date e.g. `2013-09-30`
- `name`: string - Name e.g. `test 1 today`
- `reference`: string - Used to create a reference point between a Punch Item within Procore and a corresponding Punch Item outside of Procore e.g. `3A`
- `schedule_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
- `schedule_impact_days`: integer - Schedule impact value in days e.g. `3`
- `schedule_risk`: string enum[ml_low, ml_medium, ml_high] - Assessed risk level of on-time completion e.g. `ml_high`
- `schedule_risk_reason`: string - Reason for assessed risk level of on-time completion
- `schedule_risk_confidence`: integer - Confidence of schedule risk assessment e.g. `90`
- `schedule_risk_probability`: integer - Probability of schedule risk assessment e.g. `90`
- `position`: integer - Position e.g. `1`
- `priority`: string - Punch item priority - 'low', 'medium', 'high'
- `private`: boolean - Privacy status e.g. `false`
- `status`: string enum[Open, Closed, Overdue, Pending] - Status e.g. `Open`
- `has_resolved_responses`: boolean - At least one Punch Item Assignment has a status of 'resolved e.g. `true`
- `has_unresolved_responses`: boolean - At least one Punch Item Assignment has a status of 'unresolved' e.g. `true`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `closed_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `punch_item_manager`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `final_approver`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
  - `company_name`: string - User Company Name e.g. `Brickworks`
- `punch_item_type`: object
  - `id`: integer - ID e.g. `44165`
  - `name`: string - Name e.g. `Extra Work`
- `category`: object - Category the Punch Item is classified under. Null when the Punch Item is uncategorized. Assign or change it by sending punch_item[category_id] on create or update, and filter lists with filters[category_id].
  - `id`: integer - Category ID. Pass as filters[category_id] on List Punch Items or as punch_item[category_id] when creating or updating a Punch Item. e.g. `4211`
  - `name`: string - Display name of the Category. e.g. `Electrical`
  - `active`: boolean - False when the Category has been deactivated. Deactivated Categories stay on the Punch Items already using them but are no longer offered for new assignments. e.g. `true`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `assignments`: array of object - Array of Punch Item Assignments
  - `id`: integer - ID e.g. `333675`
  - `approved`: boolean - Resolution status e.g. `true`
  - `comment`: string - Additional comment e.g. `Completed`
  - `login_information_id`: integer e.g. `420`
  - `login_information_name`: string e.g. `Edgar Admin`
  - `login_information`: object - Login Information
    - `id`: integer - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `attachments`: array of object - Array of Attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `vendor`: object
    - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
    - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
  - `notified_at`: string(date-time) - Date assignee was notified of Punch Item e.g. `2018-10-22T23:46:50Z`
  - `responded_at`: string(date-time) - Date Assignee responded to the Punch Item e.g. `2018-06-25T22:22:42Z`
  - `status`: string - Status of Assignment e.g. `unresolved`
  - `manager_accepted_at`: string(date-time) - Date Punch Item Manager resolved the Punch Item Assignment e.g. `2018-10-26T18:15:26Z`
  - `user_name`: string e.g. `Edgar Admin`
  - `updated_at`: string(date-time) - Date Assignment was updated e.g. `2018-10-26T18:15:26Z`
- `assignees`: array of object - Punch Item Assignees
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
- `latitude`: string - Latitude of Punch Item (Deprecated)
- `longitude`: string - Longitude of Punch Item (Deprecated)
- `horizontal_accuracy`: string - Horizontal Accuracy of Punch Item (Deprecated)
- `vertical_accuracy`: string - Vertical Accuracy of Punch Item (Deprecated)
- `altitude`: string - Altitude of Punch Item (Deprecated)
- `workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - Workflow status of the Punch Item e.g. `initiated`
- `custom_status_id`: integer - ID of the Punch Item's custom status, returned on the flattened representation (view=flatten_v0). Resolved, so a Punch Item that has not been assigned a custom status explicitly reports its company's default status fo... e.g. `42`
- `custom_status`: object - The Punch Item's custom status. Resolved, so a Punch Item that has not been assigned a custom status explicitly reports its company's default status for the item's workflow_status. Null when the Punch Item custom stat...
  - `id`: integer - Punch Item Custom Status ID e.g. `42`
  - `name`: string - Display name. For a company default status this is the translated label of its legacy_workflow_status; for a company-created status it is the name the company gave it. e.g. `On Hold`
  - `default`: boolean - Whether this is one of the company's default statuses, which mirror the legacy workflow statuses one-for-one and cannot be renamed or deleted. e.g. `false`
  - `is_active`: boolean - Whether the custom status is available for assignment e.g. `true`
  - `legacy_workflow_status`: string enum[draft, initiated, in_dispute, work_required, ready_for_review, work_not_accepted, ready_to_close, not_accepted_by_creator, closed] - The legacy workflow_status a default status corresponds to. Null for company-created statuses. e.g. `work_required`
  - `global_status`: object - The global status group the custom status rolls up to
    - `id`: integer - Global status ID e.g. `2`
    - `name`: string enum[DRAFT, OPEN, CLOSED] - Global status name e.g. `OPEN`
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

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Punch List Assignee Options

Resource id: `punch-list-assignee-options`. Raw spec: `../openapi-raw/punch-list-assignee-options.json`. Web: https://developers.procore.com/reference/rest/punch-list-assignee-options?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/punch_list_assignee_options

**List Punch List Assignee options**
Returns login informations that the current User can assign to Punch Items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Return items matching the specified search query. Searches by user name and company name.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `160586`
- `login`: string - Email e.g. `carl.contractor@example.com`
- `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Punch List Available Final Approvers

Resource id: `punch-list-available-final-approvers`. Raw spec: `../openapi-raw/punch-list-available-final-approvers.json`. Web: https://developers.procore.com/reference/rest/punch-list-available-final-approvers?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/punch_list/available_final_approvers

**Punch List Available Final Approvers**
Returns available final approvers for Punch List

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `query` [query] string - Return items matching the specified search query. Searches by user name and company name.

Response 200 (application/json): array of object

- `id`: integer - User ID e.g. `234`
- `login`: string - Email e.g. `carl.contractor@example.com`
- `name`: string - Name e.g. `Example User`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Punch List Filter Options

Resource id: `punch-list-filter-options`. Raw spec: `../openapi-raw/punch-list-filter-options.json`. Web: https://developers.procore.com/reference/rest/punch-list-filter-options?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/punch_list/assignees

**List of Punch List Assignee Filter Options**
Returns assignees associated to the Punch List

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID of Punch List filter object e.g. `54`
- `name`: string - Name of Punch List filter object e.g. `Name`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/punch_list/vendors

**List of Punch List Vendor Filter Options**
Returns vendors associated to the Punch List

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID of Punch List filter object e.g. `54`
- `name`: string - Name of Punch List filter object e.g. `Name`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Punch List Read User Options

Resource id: `punch-list-read-user-options`. Raw spec: `../openapi-raw/punch-list-read-user-options.json`. Web: https://developers.procore.com/reference/rest/punch-list-read-user-options?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/punch_list_read_user_options

**List Punch List Read User options**
Returns login informations that have access to the Punch List tool.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[search]` [query] string - filters results by the search query

Response 200 (application/json): array of object

- `id`: integer - Unique integer identifier for this user. Use as a value in the `user_ids` array when updating the default distribution list. e.g. `160586`
- `login`: string - Email address used to log in to Procore. Uniquely identifies the account. e.g. `carl.contractor@example.com`
- `name`: string - Full display name of the user. e.g. `Carl the Contractor`
- `locale`: string - Locale preference of this user (e.g. `en`, `fr`). Null if the user has not set a locale preference. e.g. `en`
- `company_name`: string - Display name of the company this user is associated with. e.g. `Company ABC`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

