# Procore API: Project (Core)

Source: https://developers.procore.com/reference/rest/ (tool category: Project)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Admin Equipment](#admin-equipment) - versions 1.0
- [Company Project Tools](#company-project-tools) - versions 2.0
- [Links](#links) - versions 2.0, 1.0
- [Locations](#locations) - versions 1.1, 1.0
- [Open Items](#open-items) - versions 1.0
- [Project Assignments](#project-assignments) - versions 1.0
- [Project Dates](#project-dates) - versions 2.0, 1.0
- [Project Delivery Methods](#project-delivery-methods) - versions 2.0
- [Project Demos](#project-demos) - versions 1.0
- [Project Filters](#project-filters) - versions 1.0
- [Project Roles](#project-roles) - versions 1.0
- [Project Templates](#project-templates) - versions 1.0
- [Project Tools](#project-tools) - versions 1.0
- [Project Work Scopes](#project-work-scopes) - versions 2.0
- [User Project Roles](#user-project-roles) - versions 1.0
- [Vendor Project Roles](#vendor-project-roles) - versions 1.0

## Admin Equipment

Resource id: `admin-equipment`. Raw spec: `../openapi-raw/admin-equipment.json`. Web: https://developers.procore.com/reference/rest/admin-equipment?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/equipment  **[DEPRECATED]**

**List equipment**
Return a list of all Project Equipment.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Equipment ID e.g. `15504`
- `name`: string - Equipment name e.g. `Jackhammer`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Project Tools

Resource id: `company-project-tools`. Raw spec: `../openapi-raw/company-project-tools.json`. Web: https://developers.procore.com/reference/rest/company-project-tools?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v2.0/companies/{company_id}/project_tools/{engine_name}/ids  **[BETA]**

**List project IDs by tool**
Returns IDs of projects under a company that have a project-scoped Tool
record for the given `engine_name`.
By default (no parameters) returns only projects that are active and
for which the tool has both `is_active` and `is_available` true —
matching the same criteria as `Project#has_active_tool?`.
**`tool_status`**: `true` (default) — tool has both `is_active` and
`is_available` true. `false` — either field is false.
**`project_status`**: `true` (default) — active projects only.
`false` — inactive projects only.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `engine_name` [path] string (required) - Tool engine name (e.g. `assets`, `rfi`). Matches `Tool.engine_name` for `provider_type` Project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `tool_status` [query] boolean - Tool activation status. `true` (default) — both `is_active` and `is_available` are true, matching `Project#has_active_tool?`. `false` — either field is false.
- `project_status` [query] boolean - Project active state. `true` (default) — active projects only. `false` — inactive projects only.

Response 200 (application/json): object

- `data`: array of string - Project IDs with a matching project-scoped tool.

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Links

Resource id: `links`. Raw spec: `../openapi-raw/links.json`. Web: https://developers.procore.com/reference/rest/links?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/links

**List project links**
Returns a list of Home Links on a given project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - Link unique identifier e.g. `999`
  - `title`: string - Title shown to the user e.g. `Site cam`
  - `url`: string - Link address e.g. `https://developers.procore.com/reference/authentication`
  - `position`: integer - Position of the link in the list e.g. `1`
  - `project_id`: string - Unique identifier for the project. e.g. `99`
  - `created_at`: string(date-time) - Creation date e.g. `2016-10-25T17:53:35Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/links/bulk_update

**Bulk update links**
Create and update multiple Home Links on a given project based on present and missing ID.
The order of the links in the request will be the order stored in the position field.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `id`: string - Link unique identifier e.g. `999`
- `title`: string (required) - Title shown to the user e.g. `Site cam`
- `url`: string (required) - Link address e.g. `https://developers.procore.com/reference/authentication`

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - Link unique identifier e.g. `999`
  - `title`: string - Title shown to the user e.g. `Site cam`
  - `url`: string - Link address e.g. `https://developers.procore.com/reference/authentication`
  - `position`: integer - Position of the link in the list e.g. `1`
  - `project_id`: string - Unique identifier for the project. e.g. `99`
  - `created_at`: string(date-time) - Creation date e.g. `2016-10-25T17:53:35Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/links/{id}

**Delete a link**
Send a specific Project Home Link to the recycle bin.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Link unique identifier

Response 204: No Content (no body)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/links  **[DEPRECATED]**

**List links**
Returns a list of Project Home Links on a given project.
 This endpoint will be deprecated; please use the [V2](https://developers.procore.com/reference/rest/links?version=2.0#list-project-links) endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `999`
- `title`: string - Title e.g. `Site cam`
- `url`: string - URL e.g. `https://developers.procore.com/reference/authentication`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/links  **[DEPRECATED]**

**Create link**
Creates a Project Home Link on a given project. Note: Requires either Company Admin or Project Home Admin permission. This endpoint will be deprecated; please use the [V2](https://developers.procore.com/reference/rest/links?version=2.0#bulk-update-links) endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `link`: object (required)
  - `title`: string (required) - The user-facing title of the link e.g. `Project cam`
  - `url`: string (required) - The full URL for the link e.g. `https://developers.procore.com/reference/authentication`

Response 201 (application/json): object

- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `created_at`: string(date-time) - Time created e.g. `2016-10-25T17:53:35Z`
- `project_id`: integer - Unique identifier for the project. e.g. `99`
- `id`: integer - ID e.g. `999`
- `title`: string - Title e.g. `Site cam`
- `url`: string - URL e.g. `https://developers.procore.com/reference/authentication`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/links/{id}

**Show link**
Show detailed information for a specific Project Home Link

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Link ID

Response 200 (application/json): object

- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `created_at`: string(date-time) - Time created e.g. `2016-10-25T17:53:35Z`
- `project_id`: integer - Unique identifier for the project. e.g. `99`
- `id`: integer - ID e.g. `999`
- `title`: string - Title e.g. `Site cam`
- `url`: string - URL e.g. `https://developers.procore.com/reference/authentication`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/links/{id}  **[DEPRECATED]**

**Update link**
Update one or more attributes of a specific Project Home Link. Note: Requires either Company Admin or Project Home Admin permission. This endpoint will be deprecated; please use the [V2](https://developers.procore.com/reference/rest/links?version=2.0#bulk-update-links) endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Link ID

Request body (application/json) (required):

- `link`: object (required)
  - `title`: string (required) - The user-facing title of the link e.g. `Project cam`
  - `url`: string (required) - The full URL for the link e.g. `https://developers.procore.com/reference/authentication`

Response 200 (application/json): object

- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `created_at`: string(date-time) - Time created e.g. `2016-10-25T17:53:35Z`
- `project_id`: integer - Unique identifier for the project. e.g. `99`
- `id`: integer - ID e.g. `999`
- `title`: string - Title e.g. `Site cam`
- `url`: string - URL e.g. `https://developers.procore.com/reference/authentication`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/links/{id}  **[DEPRECATED]**

**Delete link**
Send a specific Project Home Link to the recycle bin. Note: Requires either Company Admin or Project Home Admin permission. This endpoint will be deprecated; please use the [V2](https://developers.procore.com/reference/rest/links?version=2.0#delete-a-link) endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Link ID

Response 204: No Content (no body)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/links/recycle_bin

**List recycled links**
Returns a list of all Project Home Links in the recycle bin for a specific project. Note: Requires either Company Admin or Project Home Admin permission.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `deleted_at`: string(date-time) - Time deleted e.g. `2016-10-25T17:53:35Z`
- `id`: integer - ID e.g. `999`
- `title`: string - Title e.g. `Site cam`
- `url`: string - URL e.g. `https://developers.procore.com/reference/authentication`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/links/{id}/restore

**Retrieve recycled link**
Retrieves and restores a specific Project Home Link from the recycle bin. Note: Requires either Company Admin or Project Home Admin permission.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Link ID

Response 200 (application/json): object

- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `created_at`: string(date-time) - Time created e.g. `2016-10-25T17:53:35Z`
- `project_id`: integer - Unique identifier for the project. e.g. `99`
- `id`: integer - ID e.g. `999`
- `title`: string - Title e.g. `Site cam`
- `url`: string - URL e.g. `https://developers.procore.com/reference/authentication`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Locations

Resource id: `locations`. Raw spec: `../openapi-raw/locations.json`. Web: https://developers.procore.com/reference/rest/locations?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### DELETE /rest/v1.1/projects/{project_id}/locations/{location_id}

**Delete Project Location**
Deletes a specified Location.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `location_id` [path] integer (required) - ID of the location

Response 204: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/locations  **[DEPRECATED]**

**List locations**
Return a list of Locations associated with a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Location ID e.g. `15504`
- `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
- `node_name`: string - Location node name e.g. `Electrical Closet`
- `parent_id`: integer - Location parent id e.g. `788866`
- `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
- `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `code`: string - The unique code for this Location e.g. `L1`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/locations

**Create location**
Create a new Location for the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the Location belongs to e.g. `12415`
- `location`: object (required)
  - `node_name`: string - The Node Name of the Location e.g. `Electrical Closet`
  - `parent_id`: integer - The ID of the Parent Location of the Location e.g. `788866`
  - `path`: array of string - Build a Location based on a Path of names e.g. `["North Building", "First Floor", "Electrical Closet"]`

Response 201 (application/json): object

- `id`: integer - Location ID e.g. `15504`
- `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
- `node_name`: string - Location node name e.g. `Electrical Closet`
- `parent_id`: integer - Location parent id e.g. `788866`
- `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
- `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `code`: string - The unique code for this Location e.g. `L1`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/locations/{id}  **[DEPRECATED]**

**Show location**
Show detail on the specified Location.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the location
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Location ID e.g. `15504`
- `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
- `node_name`: string - Location node name e.g. `Electrical Closet`
- `parent_id`: integer - Location parent id e.g. `788866`
- `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
- `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `code`: string - The unique code for this Location e.g. `L1`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/locations/{id}  **[DEPRECATED]**

**Update Location**
Update the specified Location.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the location

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the Location belongs to e.g. `12415`
- `location`: object (required)
  - `node_name`: string - The Node Name of the Location e.g. `Electrical Closet`
  - `parent_id`: integer - The ID of the Parent Location of the Location e.g. `788866`

Response 200 (application/json): object

- `id`: integer - Location ID e.g. `15504`
- `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
- `node_name`: string - Location node name e.g. `Electrical Closet`
- `parent_id`: integer - Location parent id e.g. `788866`
- `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
- `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `code`: string - The unique code for this Location e.g. `L1`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/locations/{id}  **[DEPRECATED]**

**Delete location**
Delete the specified Location.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the location
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/locations

**List Project Locations**
Return a list of Locations associated with a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[parent_id]` [query] integer - Return location(s) with the specified parent_ids.
- `filters[code]` [query] array of string - Return location(s) matching any of the specified codes in the search term.
- `filters[search]` [query] string - Returns item(s) matching the specified search query string.
- `filters[search_with_code]` [query] string - Return item(s) where the location code or the location name match the search term
- `filters[superlocations_for]` [query] integer - Return superlocations (ancestors) of the specified location ids.
- `filters[sublocations_for]` [query] integer - Return sublocations (descendants) of the specified location ids.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[created_at, name, node_name, parent_id, updated_at]
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[depth_range]` [query] string - Return item(s) with a tree depth within the specified range. Examples: `0...1` - Parents and children `0...2` - Parents, children, and grandchildren `1...2` - Children and grandchildren

Response 200 (application/json): array of object

- `id`: integer - Location ID e.g. `15504`
- `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
- `node_name`: string - Location node name e.g. `Electrical Closet`
- `parent_id`: integer - Location parent id e.g. `788866`
- `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
- `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `code`: string - The unique code for this Location e.g. `L1`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/locations

**Create Location (Admin)**
Create a new Location for the specified Project.
Note: This endpoint requires Project Admin permissions and does not respect the "Disable Dynamic Location Creation" project configuration.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `location`: object (required)
  - `node_name`: string - The Node Name of the Location e.g. `Electrical Closet`
  - `parent_id`: integer - The ID of the Parent Location of the Location e.g. `788866`

Response 201 (application/json): object

- `id`: integer - Location ID e.g. `15504`
- `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
- `node_name`: string - Location node name e.g. `Electrical Closet`
- `parent_id`: integer - Location parent id e.g. `788866`
- `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
- `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `code`: string - The unique code for this Location e.g. `L1`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/locations/{location_id}

**Show Project Location**
Retrieves a Location for a specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `location_id` [path] integer (required) - ID of the location

Response 200 (application/json): object

- `id`: integer - Location ID e.g. `15504`
- `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
- `node_name`: string - Location node name e.g. `Electrical Closet`
- `parent_id`: integer - Location parent id e.g. `788866`
- `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
- `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `code`: string - The unique code for this Location e.g. `L1`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/locations/{location_id}

**Update Project Location**
Update the specified Location.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `location_id` [path] integer (required) - ID of the location

Request body (application/json) (required):

- `location`: object (required)
  - `node_name`: string - The Node Name of the Location e.g. `Electrical Closet`
  - `parent_id`: integer - The ID of the Parent Location of the Location e.g. `788866`

Response 200 (application/json): object

- `id`: integer - Location ID e.g. `15504`
- `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
- `node_name`: string - Location node name e.g. `Electrical Closet`
- `parent_id`: integer - Location parent id e.g. `788866`
- `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
- `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `code`: string - The unique code for this Location e.g. `L1`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/locations/{location_id}

**Delete Project Location**
Deletes a specified Location.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `location_id` [path] integer (required) - ID of the location

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/locations/find_or_create_by_path

**Find or Create Location(s) by Path**
Retrieves a Location corresponding to the provided path, or creates Location(s) representing the path.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `location`: object (required)
  - `path`: array of string (required) - Array of Location names in descending order of depth. e.g. `["North Building", "First Floor", "Electrical Closet"]`

Response 200 (application/json): object

- `id`: integer - Location ID e.g. `15504`
- `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
- `node_name`: string - Location node name e.g. `Electrical Closet`
- `parent_id`: integer - Location parent id e.g. `788866`
- `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
- `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `code`: string - The unique code for this Location e.g. `L1`

Response 201 (application/json): object

- `id`: integer - Location ID e.g. `15504`
- `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
- `node_name`: string - Location node name e.g. `Electrical Closet`
- `parent_id`: integer - Location parent id e.g. `788866`
- `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
- `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `code`: string - The unique code for this Location e.g. `L1`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Open Items

Resource id: `open-items`. Raw spec: `../openapi-raw/open-items.json`. Web: https://developers.procore.com/reference/rest/open-items?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/open_items/all

**Get Open Items Statistics**
Return open items statistics for a project (all users)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `tool_name` [query] string enum[Punchlist Item, RFI, Submittals]

Response 200 (application/json): object

- `count`: integer
- `open_count`: integer
- `upcoming_count`: integer
- `overdue_count`: integer
- `last_activity`: string(date) e.g. `2021-06-21T13:46:51Z`

Error responses: 401, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/open_items/mine

**Get My Open Items Statistics**
Return open items statistics for a project (current user)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `tool_name` [query] string enum[Punchlist Item, RFI, Submittals]

Response 200 (application/json): object

- `count`: integer
- `open_count`: integer
- `upcoming_count`: integer
- `overdue_count`: integer
- `last_activity`: string(date) e.g. `2021-06-21T13:46:51Z`

Error responses: 401, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Assignments

Resource id: `project-assignments`. Raw spec: `../openapi-raw/project-assignments.json`. Web: https://developers.procore.com/reference/rest/project-assignments?version=latest
Product lines: PM Essentials, PM Starter Pack

### GET /rest/v1.0/companies/{company_id}/users/{user_id}/project_assignments  **[BETA]**

**List Project assignments for a Company User**
This endpoint returns the current and potential Project assignments for the specified User. This includes Project information, as well as the Permission Template and Roles assigned to a given user when they are assigned on a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `user_id` [path] integer (required) - User ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[active]` [query] boolean - If true, returns item(s) with a status of 'active'.
- `filters[name]` [query] array of string - Filter item(s) with matching name.
- `filters[by_stage]` [query] oneOf(integer | array of integer) - Return item(s) with the specified project stage ID(s).
- `filters[by_type]` [query] oneOf(integer | array of integer) - Return item(s) with the specified project type ID(s).
- `filters[by_program]` [query] oneOf(integer | array of integer) - Return item(s) with the specified project program ID(s).
- `filters[by_region]` [query] oneOf(integer | array of integer) - Return item(s) with the specified project region ID(s).
- `filters[by_status]` [query] string enum[All, Active, Inactive] - Return item(s) with the specified status value. Must be one of Active, Inactive, or All.
- `filters[project_roles]` [query] integer - Return item(s) with the Project Role ID(s).
- `filters[project_permission_templates]` [query] integer - Return item(s) with the Project Permissions Template ID(s).
- `filters[assignment_status]` [query] string enum[all, assigned, unassigned] - Filters projects to those matching the given assignment status.
- `sort` [query] string enum[active, address, name, permission_template_name, program, project_number, project_type, region, stage, assignment_status, project_role_name] - Sort the results by the specified field.
- `direction` [query] string enum[asc, desc] - Sort direction. Default is ascending, nulls first.

Response 200 (application/json): array of object

- `project_id`: integer - Unique identifier for the project. e.g. `89025`
- `name`: string - Project name e.g. `Casa de Casper`
- `project_number`: string - Project number e.g. `A-1`
- `address`: string - Project address e.g. `500 Construction Way`
- `stage`: string - Stage name e.g. `Course of Construction`
- `is_assigned`: boolean - Whether user is assigned to project or not e.g. `true`
- `active`: boolean - Whether the project is active or not e.g. `true`
- `roles`: array of string - Array of user project role names
- `permission_template_id`: integer - Project currently assigned user permission template id e.g. `27`
- `permission_template_name`: string - Project currently assigned user permission template name e.g. `default Eemer Oakland Project permissions`
- `region`: string - Region assigned to the project e.g. `West`
- `program`: string - Program assigned to the project e.g. `Program 1`
- `project_type`: string - Project type assigned to the project e.g. `Commercial`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Dates

Resource id: `project-dates`. Raw spec: `../openapi-raw/project-dates.json`. Web: https://developers.procore.com/reference/rest/project-dates?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials, Field Productivity

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/project_dates

**List project dates**
List project dates associated with a project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - Project Date Id
  - `project_membership_id`: string - Project Date Membership. The project date membership id associates a project date with an existing project.
  - `name`: string - Project Date Name
  - `date`: string(string) - Project Date Date
  - `actual_date`: string(string) - Actual completion date
  - `display_on_timeline`: boolean - Whether to show this date on the project timeline

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/project_dates

**List Project Dates**
Returns a list of Project Dates.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `schedule_dates`: object
  - `substantial_completion_date`: string(date) - Substantial completion date
  - `finish_variance`: string - Finish variance
  - `percentage_complete`: integer - Percentage complete
- `project_dates`: array of object - Array of Project Dates
  - `id`: integer - Project Date ID
  - `project_membership_id`: integer - Project Date Membership ID. The project date membership id associates a project date with an existing project.
  - `name`: string - Project Date Name
  - `date`: string(string) - Project Date Date
  - `actual_date`: string(string) - Actual completion date
  - `display_on_timeline`: boolean - Whether to show this date on the project timeline

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/project_dates  **[BETA]**

**Creates or updates project date**
Associates a project with a given project date or updates the date

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `project_dates`: array of object
  - `id`: integer - Unique identifier for the Project Date from the Company e.g. `1234`
  - `date`: string(date) - Date associated with a given Project Date from the Company e.g. `2021-12-15`

Response 204: OK (no body)

Error responses: 400 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/project_dates/{id}

**Show Project Date**
Show details of the specified Project Date

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Project Date
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Project Date Id
- `project_membership_id`: integer - Project Date Membership. The project date membership id associates a project date with an existing project.
- `name`: string - Project Date Name
- `date`: string(string) - Project Date Date
- `actual_date`: string(string) - Actual completion date
- `display_on_timeline`: boolean - Whether to show this date on the project timeline

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/project_dates  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**List Project Dates**
Returns a list of Project Dates.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `schedule_dates`: object
  - `substantial_completion_date`: string(date) - Substantial completion date
  - `finish_variance`: string - Finish variance
  - `percentage_complete`: integer - Percentage complete
- `project_dates`: array of object - Array of Project Dates
  - `id`: integer - Project Date ID
  - `project_membership_id`: integer - Project Date Membership ID. The project date membership id associates a project date with an existing project.
  - `name`: string - Project Date Name
  - `date`: string(string) - Project Date Date
  - `actual_date`: string(string) - Actual completion date
  - `display_on_timeline`: boolean - Whether to show this date on the project timeline

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/project_dates/{id}  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Show Project Date**
Show details of the specified Project Date

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Project Date
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Project Date Id
- `project_membership_id`: integer - Project Date Membership. The project date membership id associates a project date with an existing project.
- `name`: string - Project Date Name
- `date`: string(string) - Project Date Date
- `actual_date`: string(string) - Actual completion date
- `display_on_timeline`: boolean - Whether to show this date on the project timeline

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Delivery Methods

Resource id: `project-delivery-methods`. Raw spec: `../openapi-raw/project-delivery-methods.json`. Web: https://developers.procore.com/reference/rest/project-delivery-methods?version=latest
Product lines: PM Essentials, PM Starter Pack

### GET /rest/v2.0/delivery_methods

**List Delivery Methods**
Returns a predefined list of delivery methods

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `per_page` [query] integer - Elements per page
- `page` [query] integer - Page

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - The unique identifier for the delivery method e.g. `construction_management_at_risk_cmar`
  - `name`: string - The name of the delivery method e.g. `Construction Management at Risk (CMaR)`
  - `description`: string - The description of the delivery method e.g. `A single construction manager assumes financial liability for the project.`

Error responses: 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Demos

Resource id: `project-demos`. Raw spec: `../openapi-raw/project-demos.json`. Web: https://developers.procore.com/reference/rest/project-demos?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/projects/{project_id}/recent_activity

**List Recent Activity Items**
Return a list of items that have been recently updated by the users.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Filters

Resource id: `project-filters`. Raw spec: `../openapi-raw/project-filters.json`. Web: https://developers.procore.com/reference/rest/project-filters?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/filters

**List filters**
Return a list of available filters.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `filters`: array of object
  - `index`: integer - Filter index e.g. `0`
  - `key`: string - Filter key e.g. `type`
  - `endpoint`: string - Filter endpoint
  - `value`: string - Filter value e.g. `Type`
- `saved_filters`: array of object
  - `index`: integer - Filter index e.g. `0`
  - `key`: string - Filter key e.g. `type`
  - `endpoint`: string - Filter endpoint
  - `value`: string - Filter value e.g. `Type`

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/filters/{name}

**Return a filter**
Return a filter by a specific name.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `name` [path] string enum[assigned, changing_orders, commitment, direct_costs, generic_tool, status] (required) - Filter name.

Response 200 (application/json): object

- `filters`: array of object
  - `index`: integer - Filter index e.g. `0`
  - `key`: string - Filter key e.g. `type`
  - `endpoint`: string - Filter endpoint
  - `value`: string - Filter value e.g. `Type`
- `saved_filters`: array of object
  - `index`: integer - Filter index e.g. `0`
  - `key`: string - Filter key e.g. `type`
  - `endpoint`: string - Filter endpoint
  - `value`: string - Filter value e.g. `Type`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Roles

Resource id: `project-roles`. Raw spec: `../openapi-raw/project-roles.json`. Web: https://developers.procore.com/reference/rest/project-roles?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/project_roles

**List Project Roles**
Return a list of all relationships between Users and Roles in a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date-time) - Return item(s) created within the specified ISO 8601 datetime range.
- `filters[add_to_project_team]` [query] string(boolean) - Filter results based on the `add_to_project_team` column. Accepts `true` or `false` to include or exclude items accordingly.

Response 200 (application/json): array of object

- `id`: integer - Project role member id e.g. `16917`
- `name`: string - Project role member contact name e.g. `Paul Willier`
- `role`: string - Project role name e.g. `Owner`
- `user_id`: integer - User id e.g. `83583`
- `contact_id`: integer - Id of the contact e.g. `12345`
- `is_active`: boolean - Status of the project role e.g. `true`
- `created_at`: string - Date of creation in the ISO 8601 datetime e.g. `2024-12-24T19:17:52Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/project_roles

**Create Project Role**
Create a relationship between a User and a Role in a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `66005`
- `project_role`: object (required)
  - `role`: string (required) - The Name of the Role e.g. `Owner`
  - `user_id`: integer (required) - The ID of the User e.g. `13515`

Response 201 (application/json): object

- `id`: integer - Project role member id e.g. `16917`
- `name`: string - Project role member contact name e.g. `Paul Willier`
- `role`: string - Project role name e.g. `Owner`
- `user_id`: integer - User id e.g. `83583`
- `contact_id`: integer - Id of the contact e.g. `12345`
- `is_active`: boolean - Status of the project role e.g. `true`
- `created_at`: string - Date of creation in the ISO 8601 datetime e.g. `2024-12-24T19:17:52Z`

Error responses: 400, 401, 403, 404, 409, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/project_roles/{id}

**Delete Project Role**
Remove a relationship between a User and a Role in a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Project Role
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 204: No Content (no body)

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Templates

Resource id: `project-templates`. Raw spec: `../openapi-raw/project-templates.json`. Web: https://developers.procore.com/reference/rest/project-templates?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/project_templates

**List Project Templates**
Return a list of Project Templates that are available to utilize for Project creation.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Project Template ID
- `name`: string - Project Template name

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Tools

Resource id: `project-tools`. Raw spec: `../openapi-raw/project-tools.json`. Web: https://developers.procore.com/reference/rest/project-tools?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/projects/{project_id}/tools

**List project tools**
Returns all Tools available to the provided Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[is_active]` [query] boolean - Retrieve active or inactive tools.
- `for_mobile` [query] boolean - Filters tools that Procore's iOS and Android apps support.
- `include_configurable_generic_tools` [query] boolean - Includes configurable custom tools in the for_mobile view.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - The ID of the Tool e.g. `1`
- `engine_name`: string - The name of the Tool engine e.g. `checklists`
- `is_active`: boolean - Indicates whether the tool is currently active e.g. `true`
- `position`: integer - The ordering position of the Tool e.g. `3`
- `required`: boolean - Indicates whether the tool must be active e.g. `false`
- `title`: string - A display name for the tool e.g. `Inspections`

Error responses: default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/tools

**Update project tools**
Updates the order and active status of Project Tools.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `tools`: array of object (required)
  - `id`: integer - The ID of the Tool e.g. `1`
  - `is_active`: boolean - Indicates whether the tool is currently active. admin, home, and connection_hub are tools that can't be disabled. e.g. `true`
  - `position`: integer - The ordering position of the Tool e.g. `3`

Response 200 (application/json): array of object

- `id`: integer - The ID of the Tool e.g. `1`
- `engine_name`: string - The name of the Tool engine e.g. `checklists`
- `is_active`: boolean - Indicates whether the tool is currently active e.g. `true`
- `position`: integer - The ordering position of the Tool e.g. `3`
- `required`: boolean - Indicates whether the tool must be active e.g. `false`
- `title`: string - A display name for the tool e.g. `Inspections`

Error responses: 400, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/tools  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**List project tools**
Returns all Tools available to the provided Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - The ID of the Tool e.g. `1`
- `engine_name`: string - The name of the Tool engine e.g. `checklists`
- `is_active`: boolean - Indicates whether the tool is currently active e.g. `true`
- `position`: integer - The ordering position of the Tool e.g. `3`
- `required`: boolean - Indicates whether the tool must be active e.g. `false`
- `user_access_level`: string - The user access level e.g. `Admin`
- `provider_id`: integer - The Provider id e.g. `3`
- `provider_type`: string - The Provider type e.g. `Project`

Error responses: 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Work Scopes

Resource id: `project-work-scopes`. Raw spec: `../openapi-raw/project-work-scopes.json`. Web: https://developers.procore.com/reference/rest/project-work-scopes?version=latest
Product lines: PM Essentials, PM Starter Pack

### GET /rest/v2.0/work_scopes

**List work scopes**
Returns a predefined list of work scopes

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `per_page` [query] integer - Elements per page
- `page` [query] integer - Page

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - The ID of the work scope e.g. `new_construction`
  - `name`: string - The label of the work scope e.g. `New Construction`

Error responses: 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## User Project Roles

Resource id: `user-project-roles`. Raw spec: `../openapi-raw/user-project-roles.json`. Web: https://developers.procore.com/reference/rest/user-project-roles?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### PATCH /rest/v1.0/projects/{project_id}/user_project_roles/{id}

**Update User Project Roles**
Set which Users are associated with a specific Project Role. Will remove any users associated with the role if they are not included in the `user_ids` parameter.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Company Role
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `user_ids`: array of integer (required) - User IDs to associate with the Project Role

Response 200 (application/json): object

- `id`: integer - Project Role ID
- `user_ids`: array of integer - Array of User IDs associated with the Project Role

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Vendor Project Roles

Resource id: `vendor-project-roles`. Raw spec: `../openapi-raw/vendor-project-roles.json`. Web: https://developers.procore.com/reference/rest/vendor-project-roles?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### PATCH /rest/v1.0/projects/{project_id}/vendor_project_roles/{id}

**Update Vendor Project Roles**
Set which Vendors are associated with a specific Project Role. Will remove any vendors associated with the role if they are not included in the `vendor_ids` parameter.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Project Role
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `vendor_ids`: array of integer (required) - Vendor IDs to associate with the Project Role

Response 200 (application/json): object

- `id`: integer - Project Role ID
- `vendor_ids`: array of integer - Array of Vendor IDs associated with the Project Role

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

