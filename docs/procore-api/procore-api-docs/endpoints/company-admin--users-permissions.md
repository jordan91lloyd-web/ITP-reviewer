# Procore API: Users & Permissions (Company Admin)

Source: https://developers.procore.com/reference/rest/ (tool category: Users & Permissions)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Permissions](#permissions) - versions 1.0

## Permissions

Resource id: `permissions`. Raw spec: `../openapi-raw/permissions.json`. Web: https://developers.procore.com/reference/rest/permissions?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/settings/permissions

**Show permission manifest**
Company or project permission manifest for the current user

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer - This parameter is required for project level permissions and should be omitted for company level permissions.
- `company_id` [query] integer - This parameter is required for company level permissions and should be omitted for project level permissions.
- `filter_correspondence_types` [query] boolean - Filter out Correspondence Types from permissions.

Response 200 (application/json): object

- `tools`: array of object
  - `id`: integer e.g. `1`
  - `name`: string e.g. `documents`
  - `friendly_name`: string e.g. `Documents`
  - `domain_id`: integer e.g. `14`
  - `tab_group`: string e.g. `core`
  - `available_for_user`: boolean e.g. `true`
  - `url`: string e.g. `/10/project/documents`
  - `user_access_level`: object
    - `id`: integer e.g. `4`
    - `name`: string e.g. `Admin`
  - `permitted_actions`: array of object
    - `id`: integer e.g. `12`
    - `action_name`: string e.g. `destroy_files_and_folders`
    - `label`: string e.g. `Delete folders and files`
    - `tool_name`: string e.g. `documents`
  - `create_url`: string e.g. `www.example.com`
  - `can_create`: boolean e.g. `true`
  - `trial`: boolean e.g. `false`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

