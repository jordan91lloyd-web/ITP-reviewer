# Procore API: Authentication (Platform - Developer Tools)

Source: https://developers.procore.com/reference/rest/ (tool category: Authentication)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Authentication](#authentication) - versions 1.0

## Authentication

Resource id: `authentication`. Raw spec: `../openapi-raw/authentication.json`. Web: https://developers.procore.com/reference/rest/authentication?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /oauth/authorize

**Grant App Authorization**
Creates and returns a temporary authorization code with 10 minute expiration. Note that all parameters listed below are required. This endpoint
corresponds to the OAuth 2.0 authorization endpoint described in section 3.1 of the OAuth 2.0 RFC. See the [Authentication Guide](/documentation/oauth-introduction)
for additional information and authentication examples.

Parameters:

- `response_type` [query] string enum[code, token] (required) - Response type. Value should be `code` for server apps, `token` for client apps.
- `client_id` [query] string (required) - Client ID you were assigned when you registered your application.
- `redirect_uri` [query] string (required) - The URI that the user will be redirected to after they grant authorization to your application. For browser-based web applications, use a `https://` web address. For "headless" applications use `urn:ietf:wg:oauth:2.0:...

Error responses: 302, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /oauth/revoke

**Revoke Token**
Revoke authorization of an access token. The request must contain the body data as form-data. The authorization server responds with HTTP status code 200 if the token has been revoked successfully
or if the client submitted an invalid token. Note that the Revoke Token endpoint revokes both the Access Token and Refresh Token. The `client_secret` param is only required for confidential
applications. Public applications using the implicit OAuth flow do not need to provide this parameter to revoke access tokens.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `token`: string (required) - Token e.g. `dbaf9757982a9e738f05d249b7b5b4a266b3a139049317c4909f2f263572c781`
- `client_id`: string (required) - Client ID e.g. `76ba4c5c75c96f6087f58a4de10be6c00b29ea1ddc3b2022ee2016d1363e3a7c`
- `client_secret`: string (required) - Client Secret e.g. `83414fdb340392acbd910f6d4f2091da007cb584fd3e872df109c9e7221e2d12`

Response 200 (application/json): object


Error responses: default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /oauth/token/info

**Get Token Info**
Return access token details. See the [Authentication Guide](/documentation/oauth-introduction)
for additional information and authentication examples.
The request must contain the access token in the Authorization header: `Authorization: Bearer <YOUR_ACCESS_TOKEN>`

Response 200 (application/json): object

- `resource_owner_id`: integer - Resource owner ID e.g. `1`
- `scopes`: array of string - Scopes e.g. `["public"]`
- `expires_in_seconds`: integer - Expiration time in seconds e.g. `5378`
- `application`: object - Application information
  - `uid`: string e.g. `31c385f56a9a3262789fcecab9c1d02b4bead2a56700b79cb1134bed9c276fbea757ada91a41a...`
- `created_at`: integer - The integer value representing the time the access token was created. e.g. `1440460991`

Error responses: default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /oauth/token

**Get or Refresh an Access Token**
Used to acquire a new access token or refresh an existing access token. Certain parameter
combinations and values are used depending on which scenario you are handling. See the individual
parameter descriptions for additional information. This endpoint corresponds to the token endpoint
described in section 3.2 of the OAuth 2.0 RFC. See the [Authentication Guide](/documentation/oauth-introduction)
for additional information and authentication examples.
JavaScript applications cannot make this request to get the access token or refresh token.

Request body (application/json) (required):

- `grant_type`: string enum[authorization_code, refresh_token, client_credentials] (required) - Use the value `authorization_code` when getting a new access token. Use `refresh_token` when refreshing an existing access token. Use `client_credentials` when using a Procore Service Account for authentication. e.g. `authorization_code`
- `client_id`: string (required) - Client ID you were assigned when you registered your application. e.g. `db0d63cfa7ac3ceed7166081542216ec99e12341300e5e879105e36bd76dbf63`
- `client_secret`: string (required) - Client Secret you were assigned when you registered your application. e.g. `0b57e8d87e35370307ba5f98ad456bd155cabacea56d49994afe083e2eb04b54`
- `code`: string - Value of the `authorization_code` retrieved from the `/oauth/authorize` call. Only required when getting a new access code. e.g. `8957b84a67f6ae55ab79c9767836a0af30b7fb7e4c36b27434993123cce71ec7`
- `redirect_uri`: string - The URI that the user will be redirected to after they grant authorization to your application. For browser-based web applications, use a `https://` web address. For "headless" applications use `urn:ietf:wg:oauth:2.0:... e.g. `http://localhost`
- `refresh_token`: string - The refresh token string. Only required when refreshing an access token.

Response 200 (application/json): object

- `access_token`: string - Access token e.g. `dbaf9757982a9e738f05d249b7b5b4a266b3a139049317c4909f2f263572c781`
- `token_type`: string - Token type e.g. `bearer`
- `expires_in`: integer - Expires in (sec) e.g. `5378`
- `refresh_token`: string - Refresh token e.g. `76ba4c5c75c96f6087f58a4de10be6c00b29ea1ddc3b2022ee2016d1363e3a7c`
- `created_at`: integer - The integer value representing the time the access token was created. e.g. `1484786897`

Error responses: default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

