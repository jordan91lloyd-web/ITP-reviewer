# Procore API: Platform Services (Platform - Developer Tools)

Source: https://developers.procore.com/reference/rest/ (tool category: Platform Services)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [MPZ](#mpz) - versions 1.0
- [Me](#me) - versions 1.0

## MPZ

Resource id: `mpz`. Raw spec: `../openapi-raw/mpz.json`. Web: https://developers.procore.com/reference/rest/mpz?version=latest
Product lines: PM Essentials

### GET /rest/v1.0/company_base_url

**Check Company Zone**
Get a response indicating zone routing and web url for zone

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Response 200 (application/json): object

- `zone`: string - zone request will be routed to e.g. `us02`
- `web_base_url`: string - base_url for routed zone e.g. `https://us02.procore.com`

Error responses: 400 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Me

Resource id: `me`. Raw spec: `../openapi-raw/me.json`. Web: https://developers.procore.com/reference/rest/me?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/me

**Show User Info**
Returns information on the authenticated user. If a company_id or project_id parameter is included, directory-specific information  on the user will also be returned. Returns a globally unique user id  (across companies).
NOTE: This endpoint does not require the ['Procore-Company-Id' header] (https://developers.procore.com/documentation/tutorial-mpz) to be included on a request unless a company_id or project_id parameter  is also included.

Parameters:

- `company_id` [query] integer - Unique identifier for the company. You must supply either a company_id or project_id in order for a name to be returned.
- `project_id` [query] integer - Unique identifier for the project. You must supply either a company_id or project_id in order for a name to be returned.

Response 200 (application/json): object

- `id`: integer - ID e.g. `160586`
- `login`: string - The email address that the user uses to log into Procore. e.g. `carl.contractor@example.com`
- `name`: string - User name. e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

