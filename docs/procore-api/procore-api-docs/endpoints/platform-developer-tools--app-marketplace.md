# Procore API: App Marketplace (Platform - Developer Tools)

Source: https://developers.procore.com/reference/rest/ (tool category: App Marketplace)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [App Configurations](#app-configurations) - versions 1.0
- [App Installations](#app-installations) - versions 1.0
- [Installation Requests](#installation-requests) - versions 1.0

## App Configurations

Resource id: `app-configurations`. Raw spec: `../openapi-raw/app-configurations.json`. Web: https://developers.procore.com/reference/rest/app-configurations?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/app_configurations

**List app configurations**
Returns a list of app configurations on a given company or project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `sort` [query] string enum[created_at, created_by, title, project_count, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[app_installation_id]` [query] integer - App installation ID
- `filters[project_id]` [query] integer - Project ID

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `999`
- `title`: string - Title of app configuration e.g. `Procore Drive Project Configuration`
- `created_by`: object
  - `id`: integer - Unique identifier of the login information. e.g. `513`
  - `name`: string - The name that is associated with the login information. e.g. `Jane Doe`
  - `login`: string - The email address that is associated with the login information. e.g. `jane.doe@example.com`
- `created_at`: string(date-time) - The UTC datetime for the creation of the resource in ISO 8601 format. e.g. `2019-09-14T16:20:00Z`
- `updated_at`: string(date-time) - The UTC datetime for the last update of the resource in ISO 8601 format. e.g. `2019-09-14T16:20:00Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/app_configurations

**Create app configuration**
Create new app configuration for a specified project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `sort` [query] string enum[created_at, created_by, title, project_count, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Request body (application/json) (required):

- `applies_to_all_projects`: boolean - Apply the app configuration to all projects under a company ( if set to true, project_ids field must be blank ) e.g. `true`
- `applies_to_company`: boolean - Apply the app configuration to be available from company routes e.g. `true`
- `app_installation_id`: integer (required) - App Installation ID e.g. `3559`
- `company_id`: integer (required) - Company ID
- `instance_configuration`: object (required) - App configuration values for a set of projects. e.g. `{"resource_id": 1287}`
- `project_ids`: array of integer - A list of projects which will have the app configuration
- `title`: string (required) - Single title for app configurations e.g. `Drone Deploy Project Configurations`

Response 201 (application/json): object

- `id`: integer - ID e.g. `999`
- `title`: string - Title of app configuration e.g. `Procore Drive Project Configuration`
- `created_by`: object
  - `id`: integer - Unique identifier of the login information. e.g. `513`
  - `name`: string - The name that is associated with the login information. e.g. `Jane Doe`
  - `login`: string - The email address that is associated with the login information. e.g. `jane.doe@example.com`
- `created_at`: string(date-time) - The UTC datetime for the creation of the resource in ISO 8601 format. e.g. `2019-09-14T16:20:00Z`
- `updated_at`: string(date-time) - The UTC datetime for the last update of the resource in ISO 8601 format. e.g. `2019-09-14T16:20:00Z`

Error responses: 400, 401, 403, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/app_configurations/{id}

**Show app configuration**
Get the details of a single app configuration

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - App Configuration ID
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - ID e.g. `999`
- `title`: string - Title of app configuration e.g. `Procore Drive Project Configuration`
- `created_by`: object
  - `id`: integer - Unique identifier of the login information. e.g. `513`
  - `name`: string - The name that is associated with the login information. e.g. `Jane Doe`
  - `login`: string - The email address that is associated with the login information. e.g. `jane.doe@example.com`
- `created_at`: string(date-time) - The UTC datetime for the creation of the resource in ISO 8601 format. e.g. `2019-09-14T16:20:00Z`
- `updated_at`: string(date-time) - The UTC datetime for the last update of the resource in ISO 8601 format. e.g. `2019-09-14T16:20:00Z`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/app_configurations/{id}

**Update app configuration**
Change the configuration of an existing app configuration

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - App Configuration ID
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `applies_to_all_projects`: boolean - Apply the app configuration to all projects under a company ( if set to true, project_ids field must be blank ) e.g. `true`
- `applies_to_company`: boolean - Apply the app configuration to be available from company routes e.g. `true`
- `instance_configuration`: object - Configuration values for an configuration of an app installation. e.g. `{"resource_id": 1287}`
- `title`: string - Title for app configuration e.g. `Procore Drive Project Configuration`
- `project_ids`: array of integer - A list of projects which will have the app configuration

Response 200 (application/json): object

- `id`: integer - ID e.g. `999`
- `title`: string - Title of app configuration e.g. `Procore Drive Project Configuration`
- `created_by`: object
  - `id`: integer - Unique identifier of the login information. e.g. `513`
  - `name`: string - The name that is associated with the login information. e.g. `Jane Doe`
  - `login`: string - The email address that is associated with the login information. e.g. `jane.doe@example.com`
- `created_at`: string(date-time) - The UTC datetime for the creation of the resource in ISO 8601 format. e.g. `2019-09-14T16:20:00Z`
- `updated_at`: string(date-time) - The UTC datetime for the last update of the resource in ISO 8601 format. e.g. `2019-09-14T16:20:00Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/app_configurations/{id}

**Delete app configuration**
Deletes an app configuration

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - App Configuration ID
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 204: No Content (no body)

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## App Installations

Resource id: `app-installations`. Raw spec: `../openapi-raw/app-installations.json`. Web: https://developers.procore.com/reference/rest/app-installations?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/app_installations

**List app installations**
Returns a list of app installations on a given company or project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `company_id` [query] integer (required) - Unique identifier for the company. You must supply either a company_id or project_id.
- `project_id` [query] integer (required) - Unique identifier for the project. You must supply either a company_id or project_id.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `999`
- `app_uid`: string - App UID e.g. `dc2b6a12fc038f0d475b5e97984e5649334d0d44f1b3500f53a94643b15a0cac`
- `agentic`: boolean - True when the installed app version's manifest declares agentic components (MCP servers or agents) e.g. `false`
- `components`: array of string enum[agentic, fullscreen, iframe, oauth, sidepanel] - Component types associated with the installation
- `developer_app`: object
  - `id`: integer - ID e.g. `999`
  - `app_type`: string - App Type e.g. `external`
  - `connectable`: boolean - Connectable e.g. `true`
  - `description`: string - User provided description of developer app
  - `internal`: boolean - Is the developer app internal e.g. `false`
  - `internal_name`: string - Internal name of developer app e.g. `Test Developer App`
  - `marketplace_app`: object
    - `id`: string - ID e.g. `e3b8a1a0-5b0a-4b5a-9b0a-5b0a4b5a9b0a`
    - `about`: string - About e.g. `Test Marketplace App`
    - `approval_state`: string - Approval state e.g. `approved`
    - `built_by`: string - Built by e.g. `Test Developer`
    - `costs_money`: boolean - Costs money e.g. `false`
    - `created_at`: string(date-time) - Created at e.g. `2020-01-01T00:00:00Z`
    - `description`: string - Description e.g. `Test Marketplace App`
    - `feature_bullets`: array of string - Feature bullets
    - `helpful_links`: array of object - Helpful links
    - `how_it_works`: string - How it works e.g. `Test Marketplace App`
    - `live`: boolean - Live e.g. `true`
    - `pictures`: array of object - Pictures
    - `public_name`: string - Public name e.g. `Test Marketplace App`
    - `requirements`: array of string - Requirements
    - `small_logo_url`: string - URL to the small logo image e.g. `https://www.example.com/logo.png`
    - `state`: string - State e.g. `published`
    - `support_email`: string - Support email e.g. `support@example.com`
    - `updated_at`: string(date-time) - Updated at e.g. `2020-01-01T00:00:00Z`
    - `version`: integer - Version e.g. `1`
    - `videos`: array of object - Videos
    - `website_link`: object - Website link
  - `marketplace_app_url`: string - URL to the marketplace app e.g. `https://www.example.com`
  - `name`: string - User name of developer app e.g. `Test Developer App`
  - `published_app_version_id`: string - ID of the published app version e.g. `6b38ad19-102e-4c55-ab65-45aed263b2d0`
  - `thumbnail_url`: string - URL to the thumbnail image e.g. `https://www.example.com`
  - `uid`: string - UID e.g. `dc2b6a12fc038f0d475b5e97984e5649334d0d44f1b3500f53a94643b15a0cac`
- `installed_at`: string(date-time) - Date the app was installed or reinstalled e.g. `2020-01-01T00:00:00Z`
- `installer`: object
  - `id`: integer - The unique identifier of the user. e.g. `160586`
  - `login`: string - The email address of the user that is used to log in. e.g. `carl.contractor@example.com`
  - `name`: string - The name of the user. e.g. `Carl the Contractor`
  - `is_active`: boolean - User's contact is active in company e.g. `true`
  - `contact_id`: integer - User's contact id in company e.g. `12345`
  - `company_name`: string - Vendor name e.g. `Foo Construction`
- `semantic_version`: string - Semantic version of the app e.g. `1.0.0`
- `status`: string enum[installed, uninstalled] - Installation status e.g. `installed`
- `uninstalled_at`: string(date-time) - Date the app was uninstalled
- `uninstaller`: object
  - `id`: integer - The unique identifier of the user. e.g. `160586`
  - `login`: string - The email address of the user that is used to log in. e.g. `carl.contractor@example.com`
  - `name`: string - The name of the user. e.g. `Carl the Contractor`
  - `is_active`: boolean - User's contact is active in company e.g. `true`
  - `contact_id`: integer - User's contact id in company e.g. `12345`
  - `company_name`: string - Vendor name e.g. `Foo Construction`
- `updatable_app_version_id`: string - ID of the app version that can be updated to e.g. `6b38ad19-102e-4c55-ab65-45aed263b2d0`
- `pending_operation_id`: string - ID of the in-flight async permissions reapply operation, if one is currently running for this installation. Null when no async operation is in progress. Can be used to resume polling after a page reload. e.g. `12345`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/app_installations/{id}

**Show app installation**
Get the details of a single app installation

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - App installation ID
- `company_id` [query] integer (required) - Unique identifier for the company. You must supply either a company_id or project_id.
- `project_id` [query] integer (required) - Unique identifier for the project. You must supply either a company_id or project_id.

Response 200 (application/json): object

- `id`: integer - ID e.g. `999`
- `app_uid`: string - App UID e.g. `dc2b6a12fc038f0d475b5e97984e5649334d0d44f1b3500f53a94643b15a0cac`
- `app_version_id`: string - App Version Id e.g. `ab5c10c3-333d-44cb-93d7-24d08a227461`
- `status`: string enum[installed, uninstalled] - Installation status e.g. `installed`
- `installed_by`: string(email) - Email Address of the user who installed the app e.g. `john.doe@example.com`
- `installed_at`: string(date-time) - Date the app was installed or reinstalled
- `uninstalled_at`: string(date-time) - Date the app was uninstalled
- `uninstalled_by`: string(email) - Email Address of the user who uninstalled the app e.g. `john.doe@example.com`
- `manifest_url`: string - Presigned Temporary Url For Manifest Instance e.g. `https://www.example.com`
- `developer_app`: object - Information on associated developer app from dev-portal
- `components`: array of string - Component types associated with the installation
- `agentic`: boolean - True when the installed app version's manifest declares agentic components (MCP servers or agents) e.g. `false`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Installation Requests

Resource id: `installation-requests`. Raw spec: `../openapi-raw/installation-requests.json`. Web: https://developers.procore.com/reference/rest/installation-requests?version=latest
Product lines: PM Essentials

### GET /rest/v1.0/installation_requests

**List app installations**
Returns a list of app installation requests on a given company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `developer_app_id` [query] string (required) - Developer App ID
- `implicit` [query] boolean (required) - False if the request was made via API, true if it was made on attempting to authenticate an app

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `999`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/installation_requests

**Create installation request**
Request to install a new application

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `company_id`: integer (required) - Company ID. Note: Only one of project_id or company_id is required. e.g. `224087`
- `developer_app_id`: string (required) - ID of an application from the developer portal e.g. `396e4944-5044-4b72-bb6b-6827d3ab2e75`
- `notes`: string - Notes. Notes to be sent to company admins along with the request. e.g. `Requesting installation for use on project XYZ`
- `implicit`: boolean (required) - Implicit. Defines whether request has been made implicitly.

Response 201 (application/json): object

- `id`: integer - ID e.g. `999`

Error responses: 400, 401, 403, 409 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

