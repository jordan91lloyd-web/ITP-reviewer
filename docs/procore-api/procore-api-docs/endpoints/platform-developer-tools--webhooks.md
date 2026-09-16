# Procore API: Webhooks (Platform - Developer Tools)

Source: https://developers.procore.com/reference/rest/ (tool category: Webhooks)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Deliveries](#deliveries) - versions 2.0, 1.0
- [Hooks](#hooks) - versions 2.0, 1.0
- [Triggers](#triggers) - versions 2.0, 1.0
- [Webhook Resources](#webhook-resources) - versions 2.0, 1.0

## Deliveries

Resource id: `deliveries`. Raw spec: `../openapi-raw/deliveries.json`. Web: https://developers.procore.com/reference/rest/deliveries?version=latest
Product lines: Utilities

### GET /rest/v2.0/companies/{company_id}/webhooks/hooks/{hook_id}/deliveries

**List Company Webhooks Deliveries**
Returns an array of webhooks deliveries for the company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `hook_id` [path] string (required) - Webhooks Hook ID
- `filter[status]` [query] string enum[succeeded, failed, discarded, enqueued, retrying] - Filter deliveries by current status. Use one of the allowed enum values.
- `filter[resource_name]` [query] string - Filter deliveries by the name of the resource that triggered the event (e.g., Work Orders).
- `filter[event_type]` [query] string - Filter on event_type (create, update, delete)
- `filter[start]` [query] string(date) - Filter deliveries from this date format yyyy-mm-dd
- `filter[end]` [query] string(date) - Filter deliveries until this date format yyyy-mm-dd
- `sort` [query] string - Sort order for the returned deliveries. Consult the webhooks service for supported sort fields and directions.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Array of Webhooks Deliveries
  - `id`: string - Unique string identifier for this webhook delivery. Use to reference a specific delivery when investigating status or retry history. e.g. `123456789`
  - `status`: string enum[delivered, failed, discarded, enqueued, retrying] - Lifecycle state of this delivery. Filter the collection using filter[status]=<value>. e.g. `discarded`
  - `payload`: object - The event payload that was delivered
    - `id`: integer - ID of the event e.g. `123456789`
    - `ulid`: string - Universally unique lexicographically sortable identifier (ULID) for the originating event, encoded as a 26-character string. Sortable by creation time. e.g. `01H123456789ABCDEFGHIJKLMN`
    - `timestamp`: string(date-time) - Time the event occurred e.g. `2023-01-01T12:00:00Z`
    - `metadata`: object - Additional information about the event
    - `user_id`: integer - ID of the user who made the change e.g. `12345`
    - `company_id`: integer - ID of the company the resource belongs to e.g. `100`
    - `project_id`: integer - ID of the project the resource belongs to e.g. `200`
    - `api_version`: string - Version of the originating api resource e.g. `v2`
    - `event_type`: string enum[create, update, delete] - Type of event that occurred e.g. `update`
    - `resource_name`: string - Name of the changed resource e.g. `Work Orders`
    - `resource_id`: integer - ID of the changed resource e.g. `300`
  - `delivery_attempts`: array of object - Array of delivery attempts for this webhook
    - `id`: string - Unique string identifier for this individual delivery attempt. e.g. `987654321`
    - `success`: boolean - Whether the delivery attempt was successful e.g. `false`
    - `response_status`: integer - HTTP status code returned from the webhook endpoint
    - `response_body`: string - Response body returned from the webhook endpoint
    - `response_headers`: object - Response headers returned from the webhook endpoint
    - `started_at`: string(date-time) - Start time of the delivery attempt e.g. `2023-01-01T12:05:00Z`
    - `completed_at`: string(date-time) - Completion time of the delivery attempt e.g. `2023-01-01T12:05:10Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/webhooks/hooks/{hook_id}/deliveries

**List Project Webhooks Deliveries**
Returns an array of webhooks deliveries for the project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `hook_id` [path] string (required) - Webhooks Hook ID
- `filter[status]` [query] string enum[succeeded, failed, discarded, enqueued, retrying] - Filter deliveries by current status. Use one of the allowed enum values.
- `filter[resource_name]` [query] string - Filter deliveries by the name of the resource that triggered the event (e.g., Work Orders).
- `filter[event_type]` [query] string - Filter on event_type (create, update, delete)
- `filter[start]` [query] string(date) - Filter deliveries from this date format yyyy-mm-dd
- `filter[end]` [query] string(date) - Filter deliveries until this date format yyyy-mm-dd
- `sort` [query] string - Sort order for the returned deliveries. Consult the webhooks service for supported sort fields and directions.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Array of Webhooks Deliveries
  - `id`: string - Unique string identifier for this webhook delivery. Use to reference a specific delivery when investigating status or retry history. e.g. `123456789`
  - `status`: string enum[delivered, failed, discarded, enqueued, retrying] - Lifecycle state of this delivery. Filter the collection using filter[status]=<value>. e.g. `discarded`
  - `payload`: object - The event payload that was delivered
    - `id`: integer - ID of the event e.g. `123456789`
    - `ulid`: string - Universally unique lexicographically sortable identifier (ULID) for the originating event, encoded as a 26-character string. Sortable by creation time. e.g. `01H123456789ABCDEFGHIJKLMN`
    - `timestamp`: string(date-time) - Time the event occurred e.g. `2023-01-01T12:00:00Z`
    - `metadata`: object - Additional information about the event
    - `user_id`: integer - ID of the user who made the change e.g. `12345`
    - `company_id`: integer - ID of the company the resource belongs to e.g. `100`
    - `project_id`: integer - ID of the project the resource belongs to e.g. `200`
    - `api_version`: string - Version of the originating api resource e.g. `v2`
    - `event_type`: string enum[create, update, delete] - Type of event that occurred e.g. `update`
    - `resource_name`: string - Name of the changed resource e.g. `Work Orders`
    - `resource_id`: integer - ID of the changed resource e.g. `300`
  - `delivery_attempts`: array of object - Array of delivery attempts for this webhook
    - `id`: string - Unique string identifier for this individual delivery attempt. e.g. `987654321`
    - `success`: boolean - Whether the delivery attempt was successful e.g. `false`
    - `response_status`: integer - HTTP status code returned from the webhook endpoint
    - `response_body`: string - Response body returned from the webhook endpoint
    - `response_headers`: object - Response headers returned from the webhook endpoint
    - `started_at`: string(date-time) - Start time of the delivery attempt e.g. `2023-01-01T12:05:00Z`
    - `completed_at`: string(date-time) - Completion time of the delivery attempt e.g. `2023-01-01T12:05:10Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/webhooks/hooks/{hook_id}/deliveries  **[DEPRECATED]**

**List Webhooks Deliveries**
Deliveries must be listed within a company and/or project scope.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `hook_id` [path] integer (required) - Webhooks Hook ID
- `company_id` [query] integer (required) - Unique identifier for the company. You must supply either a company_id or project_id.
- `project_id` [query] integer (required) - Unique identifier for the project. You must supply either a company_id or project_id.
- `page_size` [query] integer - Number of items to return for a page (default: 100)
- `page_start` [query] integer - The last id of the previous page.
- `filters[status]` [query] string - Filter on status for "any", "successful", "failing" or "discarded"

Response 200 (application/json): array of object

- `event`: object - The event payload sent
  - `user_id`: integer - ID of the user who made the change e.g. `12345`
  - `timestamp`: string(date-time) - Time the change was made e.g. `2017-10-18T21:16:47Z`
  - `resource_name`: string - Name of the changed resource e.g. `Work Order Contracts`
  - `resource_id`: integer - ID of the changed resource e.g. `12345`
  - `project_id`: integer - ID of the project the resource belongs to e.g. `789`
  - `id`: integer - ID of the event e.g. `231346546`
  - `ulid`: string - Unique identifier encoded as a 26 character string. e.g. `01EDPD2J6SBY1163N77H95GW09`
  - `event_type`: string - Type of event: [create | update | delete] e.g. `update`
  - `company_id`: integer - ID of the company the resource belongs to e.g. `890`
  - `api_version`: string - Version of the originating api resource e.g. `v2`
  - `metadata`: object - Contextual information about the event
    - `source_user_id`: integer - ID of the user who made the change e.g. `12345`
    - `source_company_id`: integer - ID of the company that the changing user was in when the change was made e.g. `891`
    - `source_project_id`: integer - ID of the project that the changing user was in when the change was made e.g. `123`
    - `source_application_id`: string - ID of the application used to make the change e.g. `242635f69bfc6fb9adax513875a0254a2a908f7bb176x1698d6x169a08f5646d`
    - `source_operation_id`: string - Identifying token provided by the client on the api request that was responsible for the change e.g. `0181c891-8be7-4f99-8c4e-9f75387d6ecd`
- `event_id`: integer - ID of the audited API event e.g. `231346546`
- `outcome`: string enum[ok, retried, failed, discarded] - Outcome of the delivery e.g. `retried`
- `response_body`: string - Reponse body returned from the request, if any. e.g. `null`
- `response_error`: string - Error response message, if any. e.g. `null`
- `started_at`: string(date-time) - Start time of the request e.g. `2012-10-23T21:39:40Z`
- `completed_at`: string(date-time) - Completion time of the request e.g. `2015-10-23T21:39:40Z`
- `response_status`: integer - Status code returned from the request. e.g. `200`
- `response_headers`: object - Headers returned from the request.

Error responses: default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Hooks

Resource id: `hooks`. Raw spec: `../openapi-raw/hooks.json`. Web: https://developers.procore.com/reference/rest/hooks?version=latest
Product lines: Utilities

### GET /rest/v2.0/companies/{company_id}/webhooks/hooks

**List Company Webhooks Hooks**
Returns an array of webhooks for the company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `namespace` [query] string (required) - Filter returned hooks to those registered under this namespace.
- `payload_version` [query] string - Filter returned hooks by their configured payload format version (e.g., v2).
- `include_trigger_count` [query] boolean - When true, each hook in the response includes a trigger_count field with the number of triggers attached. Omit or set to false to skip this count.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Array of Webhooks Hooks
  - `id`: string - Unique string identifier for this webhook hook. Use as the {id} path parameter in show, update, and delete requests. e.g. `43593499`
  - `status`: string enum[active, disabled] - Lifecycle state of the hook. active means event delivery is enabled; disabled means delivery is paused. e.g. `active`
  - `payload_version`: string - Payload version of the hook e.g. `v2`
  - `namespace`: string - Namespace that identifies the integration or application that registered this hook. e.g. `your-company-name`
  - `destination_headers`: object
    - `Authorization`: string - Authorization header value sent with each webhook request, partially redacted for security. e.g. `*****token`
  - `destination_url`: string - Notification endpoint URL e.g. `http://webhooks.mydomain.com`
  - `trigger_count`: integer - Number of triggers associated with this hook e.g. `25`
  - `company_id`: string - Unique string identifier of the company that owns this hook. Null for project-level hooks. e.g. `5358233`
  - `project_id`: string - Unique string identifier of the project this hook is scoped to. Null for company-level hooks. e.g. `23498237`
  - `created_at`: string(date-time) - Timestamp when the webhook was created e.g. `2024-11-21T21:32:32Z`
  - `updated_at`: string(date-time) - Timestamp when the webhook was last updated e.g. `2024-11-21T21:32:32Z`
  - `hook_type`: string - Type of hook. "classic" for standard webhook hooks. e.g. `classic`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/webhooks/hooks

**Create Company Webhooks Hook**
Create a webhook for the company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json):

- `payload_version`: string (required) - Payload format version for this hook (e.g., v2). e.g. `v2`
- `namespace`: string (required) - Namespace that identifies the integration or application registering this hook. Use a value unique to your application (e.g., your company domain or app name). e.g. `your-company-name`
- `destination_headers`: object
  - `Authorization`: string - Authorization header e.g. `example-token`
- `destination_url`: string (required) - HTTPS URL of the endpoint that will receive webhook notifications. Must be publicly reachable. e.g. `https://webhooks.mydomain.com`

Response 201 (application/json): object

- `data`: object
  - `id`: string - Unique string identifier for this webhook hook. Use as the {id} path parameter in show, update, and delete requests. e.g. `43593499`
  - `status`: string enum[active, disabled] - Lifecycle state of the hook. active means event delivery is enabled; disabled means delivery is paused. e.g. `active`
  - `payload_version`: string - Payload version of the hook e.g. `v2`
  - `namespace`: string - Namespace that identifies the integration or application that registered this hook. e.g. `your-company-name`
  - `destination_headers`: object
    - `Authorization`: string - Authorization header value sent with each webhook request, partially redacted for security. e.g. `*****token`
  - `destination_url`: string - Notification endpoint URL e.g. `http://webhooks.mydomain.com`
  - `trigger_count`: integer - Number of triggers associated with this hook e.g. `25`
  - `company_id`: string - Unique string identifier of the company that owns this hook. Null for project-level hooks. e.g. `5358233`
  - `project_id`: string - Unique string identifier of the project this hook is scoped to. Null for company-level hooks. e.g. `23498237`
  - `created_at`: string(date-time) - Timestamp when the webhook was created e.g. `2024-11-21T21:32:32Z`
  - `updated_at`: string(date-time) - Timestamp when the webhook was last updated e.g. `2024-11-21T21:32:32Z`
  - `hook_type`: string - Type of hook. "classic" for standard webhook hooks. e.g. `classic`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/webhooks/hooks

**List Project Webhooks Hooks**
Returns an array of webhooks for the project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `namespace` [query] string - Filter returned hooks to those registered under this namespace.
- `payload_version` [query] string - Filter returned hooks by their configured payload format version (e.g., v2).
- `include_trigger_count` [query] boolean - When true, each hook in the response includes a trigger_count field with the number of triggers attached. Omit or set to false to skip this count.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Array of Webhooks Hooks
  - `id`: string - Unique string identifier for this webhook hook. Use as the {id} path parameter in show, update, and delete requests. e.g. `43593499`
  - `status`: string enum[active, disabled] - Lifecycle state of the hook. active means event delivery is enabled; disabled means delivery is paused. e.g. `active`
  - `payload_version`: string - Payload version of the hook e.g. `v2`
  - `namespace`: string - Namespace that identifies the integration or application that registered this hook. e.g. `your-company-name`
  - `destination_headers`: object
    - `Authorization`: string - Authorization header value sent with each webhook request, partially redacted for security. e.g. `*****token`
  - `destination_url`: string - Notification endpoint URL e.g. `http://webhooks.mydomain.com`
  - `trigger_count`: integer - Number of triggers associated with this hook e.g. `25`
  - `company_id`: string - Unique string identifier of the company that owns this hook. Null for project-level hooks. e.g. `5358233`
  - `project_id`: string - Unique string identifier of the project this hook is scoped to. Null for company-level hooks. e.g. `23498237`
  - `created_at`: string(date-time) - Timestamp when the webhook was created e.g. `2024-11-21T21:32:32Z`
  - `updated_at`: string(date-time) - Timestamp when the webhook was last updated e.g. `2024-11-21T21:32:32Z`
  - `hook_type`: string - Type of hook. "classic" for standard webhook hooks. e.g. `classic`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/webhooks/hooks

**Create Project Webhooks Hook**
Create a webhook for the project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json):

- `payload_version`: string (required) - Payload format version for this hook (e.g., v2). e.g. `v2`
- `namespace`: string (required) - Namespace that identifies the integration or application registering this hook. Use a value unique to your application (e.g., your company domain or app name). e.g. `your-company-name`
- `destination_headers`: object
  - `Authorization`: string - Authorization header e.g. `example-token`
- `destination_url`: string (required) - HTTPS URL of the endpoint that will receive webhook notifications. Must be publicly reachable. e.g. `https://webhooks.mydomain.com`

Response 201 (application/json): object

- `data`: object
  - `id`: string - Unique string identifier for this webhook hook. Use as the {id} path parameter in show, update, and delete requests. e.g. `43593499`
  - `status`: string enum[active, disabled] - Lifecycle state of the hook. active means event delivery is enabled; disabled means delivery is paused. e.g. `active`
  - `payload_version`: string - Payload version of the hook e.g. `v2`
  - `namespace`: string - Namespace that identifies the integration or application that registered this hook. e.g. `your-company-name`
  - `destination_headers`: object
    - `Authorization`: string - Authorization header value sent with each webhook request, partially redacted for security. e.g. `*****token`
  - `destination_url`: string - Notification endpoint URL e.g. `http://webhooks.mydomain.com`
  - `trigger_count`: integer - Number of triggers associated with this hook e.g. `25`
  - `company_id`: string - Unique string identifier of the company that owns this hook. Null for project-level hooks. e.g. `5358233`
  - `project_id`: string - Unique string identifier of the project this hook is scoped to. Null for company-level hooks. e.g. `23498237`
  - `created_at`: string(date-time) - Timestamp when the webhook was created e.g. `2024-11-21T21:32:32Z`
  - `updated_at`: string(date-time) - Timestamp when the webhook was last updated e.g. `2024-11-21T21:32:32Z`
  - `hook_type`: string - Type of hook. "classic" for standard webhook hooks. e.g. `classic`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/webhooks/hooks/{id}

**Retrieve a single webhook for company**
Fetch a specific webhook by its ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Webhooks Hook ID

Response 200 (application/json): object

- `data`: object
  - `id`: string - Unique string identifier for this webhook hook. Use as the {id} path parameter in show, update, and delete requests. e.g. `43593499`
  - `status`: string enum[active, disabled] - Lifecycle state of the hook. active means event delivery is enabled; disabled means delivery is paused. e.g. `active`
  - `payload_version`: string - Payload version of the hook e.g. `v2`
  - `namespace`: string - Namespace that identifies the integration or application that registered this hook. e.g. `your-company-name`
  - `destination_headers`: object
    - `Authorization`: string - Authorization header value sent with each webhook request, partially redacted for security. e.g. `*****token`
  - `destination_url`: string - Notification endpoint URL e.g. `http://webhooks.mydomain.com`
  - `trigger_count`: integer - Number of triggers associated with this hook e.g. `25`
  - `company_id`: string - Unique string identifier of the company that owns this hook. Null for project-level hooks. e.g. `5358233`
  - `project_id`: string - Unique string identifier of the project this hook is scoped to. Null for company-level hooks. e.g. `23498237`
  - `created_at`: string(date-time) - Timestamp when the webhook was created e.g. `2024-11-21T21:32:32Z`
  - `updated_at`: string(date-time) - Timestamp when the webhook was last updated e.g. `2024-11-21T21:32:32Z`
  - `hook_type`: string - Type of hook. "classic" for standard webhook hooks. e.g. `classic`

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/webhooks/hooks/{id}

**Update Company Webhooks Hook**
Update a hook for the company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Webhooks Hook ID

Request body (application/json):

- `payload_version`: string - Payload format version for this hook (e.g., v2). e.g. `v2`
- `namespace`: string - Namespace that identifies the integration or application registering this hook. Use a value unique to your application (e.g., your company domain or app name). e.g. `your-company-name`
- `destination_headers`: object
  - `Authorization`: string - Authorization header e.g. `example-token`
- `destination_url`: string - HTTPS URL of the endpoint that will receive webhook notifications. Must be publicly reachable. e.g. `https://webhooks.mydomain.com`
- `status`: string enum[active, disabled] - Lifecycle state of the hook. Set to disabled to stop event delivery without deleting the hook; set back to active to resume delivery. e.g. `active`

Response 200 (application/json): object

- `data`: object
  - `id`: string - Unique string identifier for this webhook hook. Use as the {id} path parameter in show, update, and delete requests. e.g. `43593499`
  - `status`: string enum[active, disabled] - Lifecycle state of the hook. active means event delivery is enabled; disabled means delivery is paused. e.g. `active`
  - `payload_version`: string - Payload version of the hook e.g. `v2`
  - `namespace`: string - Namespace that identifies the integration or application that registered this hook. e.g. `your-company-name`
  - `destination_headers`: object
    - `Authorization`: string - Authorization header value sent with each webhook request, partially redacted for security. e.g. `*****token`
  - `destination_url`: string - Notification endpoint URL e.g. `http://webhooks.mydomain.com`
  - `trigger_count`: integer - Number of triggers associated with this hook e.g. `25`
  - `company_id`: string - Unique string identifier of the company that owns this hook. Null for project-level hooks. e.g. `5358233`
  - `project_id`: string - Unique string identifier of the project this hook is scoped to. Null for company-level hooks. e.g. `23498237`
  - `created_at`: string(date-time) - Timestamp when the webhook was created e.g. `2024-11-21T21:32:32Z`
  - `updated_at`: string(date-time) - Timestamp when the webhook was last updated e.g. `2024-11-21T21:32:32Z`
  - `hook_type`: string - Type of hook. "classic" for standard webhook hooks. e.g. `classic`

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/webhooks/hooks/{id}

**Delete Company Webhooks Hook**
Delete Company Webhooks and Triggers associated with hook.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Webhooks Hook ID

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/webhooks/hooks/{id}

**Retrieve a single webhook for project**
Fetch a specific webhook by its ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Webhooks Hook ID

Response 200 (application/json): object

- `data`: object
  - `id`: string - Unique string identifier for this webhook hook. Use as the {id} path parameter in show, update, and delete requests. e.g. `43593499`
  - `status`: string enum[active, disabled] - Lifecycle state of the hook. active means event delivery is enabled; disabled means delivery is paused. e.g. `active`
  - `payload_version`: string - Payload version of the hook e.g. `v2`
  - `namespace`: string - Namespace that identifies the integration or application that registered this hook. e.g. `your-company-name`
  - `destination_headers`: object
    - `Authorization`: string - Authorization header value sent with each webhook request, partially redacted for security. e.g. `*****token`
  - `destination_url`: string - Notification endpoint URL e.g. `http://webhooks.mydomain.com`
  - `trigger_count`: integer - Number of triggers associated with this hook e.g. `25`
  - `company_id`: string - Unique string identifier of the company that owns this hook. Null for project-level hooks. e.g. `5358233`
  - `project_id`: string - Unique string identifier of the project this hook is scoped to. Null for company-level hooks. e.g. `23498237`
  - `created_at`: string(date-time) - Timestamp when the webhook was created e.g. `2024-11-21T21:32:32Z`
  - `updated_at`: string(date-time) - Timestamp when the webhook was last updated e.g. `2024-11-21T21:32:32Z`
  - `hook_type`: string - Type of hook. "classic" for standard webhook hooks. e.g. `classic`

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/webhooks/hooks/{id}

**Update Project Webhooks Hook**
Update a hook for the project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Webhooks Hook ID

Request body (application/json):

- `payload_version`: string - Payload format version for this hook (e.g., v2). e.g. `v2`
- `namespace`: string - Namespace that identifies the integration or application registering this hook. Use a value unique to your application (e.g., your company domain or app name). e.g. `your-company-name`
- `destination_headers`: object
  - `Authorization`: string - Authorization header e.g. `example-token`
- `destination_url`: string - HTTPS URL of the endpoint that will receive webhook notifications. Must be publicly reachable. e.g. `https://webhooks.mydomain.com`
- `status`: string enum[active, disabled] - Lifecycle state of the hook. Set to disabled to stop event delivery without deleting the hook; set back to active to resume delivery. e.g. `active`

Response 200 (application/json): object

- `data`: object
  - `id`: string - Unique string identifier for this webhook hook. Use as the {id} path parameter in show, update, and delete requests. e.g. `43593499`
  - `status`: string enum[active, disabled] - Lifecycle state of the hook. active means event delivery is enabled; disabled means delivery is paused. e.g. `active`
  - `payload_version`: string - Payload version of the hook e.g. `v2`
  - `namespace`: string - Namespace that identifies the integration or application that registered this hook. e.g. `your-company-name`
  - `destination_headers`: object
    - `Authorization`: string - Authorization header value sent with each webhook request, partially redacted for security. e.g. `*****token`
  - `destination_url`: string - Notification endpoint URL e.g. `http://webhooks.mydomain.com`
  - `trigger_count`: integer - Number of triggers associated with this hook e.g. `25`
  - `company_id`: string - Unique string identifier of the company that owns this hook. Null for project-level hooks. e.g. `5358233`
  - `project_id`: string - Unique string identifier of the project this hook is scoped to. Null for company-level hooks. e.g. `23498237`
  - `created_at`: string(date-time) - Timestamp when the webhook was created e.g. `2024-11-21T21:32:32Z`
  - `updated_at`: string(date-time) - Timestamp when the webhook was last updated e.g. `2024-11-21T21:32:32Z`
  - `hook_type`: string - Type of hook. "classic" for standard webhook hooks. e.g. `classic`

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/webhooks/hooks/{id}

**Delete Project Webhooks Hook**
Delete Project Webhooks and Triggers associated with hook.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Webhooks Hook ID

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/webhooks/hooks  **[DEPRECATED]**

**List Webhooks Hooks**
Hooks must be listed within a company and/or project scope.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company. You must supply either a company_id or project_id.
- `project_id` [query] integer (required) - Unique identifier for the project. You must supply either a company_id or project_id.
- `namespace` [query] string - Hook namespace to query.
- `api_version` [query] string - API Version

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `43593499`
- `api_version`: string - API Version e.g. `v2`
- `destination_headers`: object
  - `Authorization`: string - Authorization header that is masked to only show the last 5 characters e.g. `*****xMiJ9`
- `destination_url`: string - Notification endpoint URL e.g. `http://webhooks.mydomain.com`
- `owned_by_company_id`: integer - Hook Owned by Company ID e.g. `5358233`
- `owned_by_project_id`: integer - Hook Owned by unique identifier for the Project e.g. `23498237`
- `owned_by_user_id`: integer - Hook Owned by User ID e.g. `532323`
- `namespace`: string - Hook namespace e.g. `your-company-name`

Error responses: default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/webhooks/hooks  **[DEPRECATED]**

**Create Webhooks Hook**
Hooks must be created within a company and/or project scope.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- oneOf(object | object)

Response 201 (application/json): object

- `id`: integer - ID e.g. `43593499`
- `api_version`: string - API Version e.g. `v2`
- `destination_headers`: object
  - `Authorization`: string - Authorization header that is masked to only show the last 5 characters e.g. `*****xMiJ9`
- `destination_url`: string - Notification endpoint URL e.g. `http://webhooks.mydomain.com`
- `owned_by_company_id`: integer - Hook Owned by Company ID e.g. `5358233`
- `owned_by_project_id`: integer - Hook Owned by unique identifier for the Project e.g. `23498237`
- `owned_by_user_id`: integer - Hook Owned by User ID e.g. `532323`
- `namespace`: string - Hook namespace e.g. `your-company-name`

Error responses: 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/webhooks/hooks/{id}  **[DEPRECATED]**

**Update Webhooks Hook**
Hooks must be updated within a company and/or project scope.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Webhooks Hook ID

Request body (application/json) (required):

- oneOf(object | object)

Response 200 (application/json): object

- `id`: integer - ID e.g. `43593499`
- `api_version`: string - API Version e.g. `v2`
- `destination_headers`: object
  - `Authorization`: string - Authorization header that is masked to only show the last 5 characters e.g. `*****xMiJ9`
- `destination_url`: string - Notification endpoint URL e.g. `http://webhooks.mydomain.com`
- `owned_by_company_id`: integer - Hook Owned by Company ID e.g. `5358233`
- `owned_by_project_id`: integer - Hook Owned by unique identifier for the Project e.g. `23498237`
- `owned_by_user_id`: integer - Hook Owned by User ID e.g. `532323`
- `namespace`: string - Hook namespace e.g. `your-company-name`

Error responses: 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/webhooks/hooks/{id}  **[DEPRECATED]**

**Delete Webhooks Hook**
Triggers must be deleted within a company and/or project scope.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Webhooks Hook ID
- `company_id` [query] integer (required) - Unique identifier for the company. You must supply either a company_id or project_id.
- `project_id` [query] integer (required) - Unique identifier for the project. You must supply either a company_id or project_id.

Response 200: OK (no body)

Error responses: default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Triggers

Resource id: `triggers`. Raw spec: `../openapi-raw/triggers.json`. Web: https://developers.procore.com/reference/rest/triggers?version=latest
Product lines: Utilities

### GET /rest/v2.0/companies/{company_id}/webhooks/hooks/{hook_id}/triggers

**List Company Webhooks Triggers**
Returns an array of Triggers for the company webhook.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `hook_id` [path] string (required) - Webhook Hook ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Array of Webhooks Triggers
  - `id`: string - Trigger ID e.g. `231346546`
  - `webhook_hook_id`: string - Unique string identifier of the webhook hook this trigger belongs to. Use as the {hook_id} path parameter when managing triggers on that hook. e.g. `43593499`
  - `resource_name`: string - Name of the Procore resource this trigger listens to (e.g., Work Orders, Project Users). e.g. `Project Users`
  - `event_type`: string - Event action that fires this trigger (e.g., create, update, delete). e.g. `CREATED`
  - `company_id`: string - Unique string identifier of the company this trigger is scoped to. Null for project-level triggers. e.g. `5358233`
  - `project_id`: string - Unique string identifier of the project this trigger is scoped to. Null for company-level triggers. e.g. `23498237`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/webhooks/hooks/{hook_id}/triggers

**Create Company Webhooks Triggers**
Create Triggers for the Company Webhook.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `hook_id` [path] string (required) - Webhook Hook ID

Request body (application/json):

- `resource_name`: string (required) - Name of the Procore resource to subscribe to (e.g., Work Orders, Company Users). Use the List Webhook Resources endpoint to discover valid values for your payload version. e.g. `Company Users`
- `event_type`: string (required) - Event action to subscribe to on the specified resource. Common values are create, update, delete. Use the List Webhook Resources endpoint to confirm supported event types per resource. e.g. `delete`

Response 201 (application/json): object

- `data`: object
  - `id`: string - Trigger ID e.g. `231346546`
  - `webhook_hook_id`: string - Unique string identifier of the webhook hook this trigger belongs to. Use as the {hook_id} path parameter when managing triggers on that hook. e.g. `43593499`
  - `resource_name`: string - Name of the Procore resource this trigger listens to (e.g., Work Orders, Project Users). e.g. `Project Users`
  - `event_type`: string - Event action that fires this trigger (e.g., create, update, delete). e.g. `CREATED`
  - `company_id`: string - Unique string identifier of the company this trigger is scoped to. Null for project-level triggers. e.g. `5358233`
  - `project_id`: string - Unique string identifier of the project this trigger is scoped to. Null for company-level triggers. e.g. `23498237`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/webhooks/hooks/{hook_id}/triggers

**List Project Webhooks Triggers**
Returns an array of Triggers for the project webhook.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `hook_id` [path] string (required) - Webhook Hook ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Array of Webhooks Triggers
  - `id`: string - Trigger ID e.g. `231346546`
  - `webhook_hook_id`: string - Unique string identifier of the webhook hook this trigger belongs to. Use as the {hook_id} path parameter when managing triggers on that hook. e.g. `43593499`
  - `resource_name`: string - Name of the Procore resource this trigger listens to (e.g., Work Orders, Project Users). e.g. `Project Users`
  - `event_type`: string - Event action that fires this trigger (e.g., create, update, delete). e.g. `CREATED`
  - `company_id`: string - Unique string identifier of the company this trigger is scoped to. Null for project-level triggers. e.g. `5358233`
  - `project_id`: string - Unique string identifier of the project this trigger is scoped to. Null for company-level triggers. e.g. `23498237`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/webhooks/hooks/{hook_id}/triggers

**Create Project Webhooks Triggers**
Create Triggers for the Project Webhook.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `hook_id` [path] string (required) - Webhook Hook ID

Request body (application/json):

- `resource_name`: string (required) - Name of the Procore resource to subscribe to (e.g., Work Orders, Company Users). Use the List Webhook Resources endpoint to discover valid values for your payload version. e.g. `Project Users`
- `event_type`: string (required) - Event action to subscribe to on the specified resource. Common values are create, update, delete. Use the List Webhook Resources endpoint to confirm supported event types per resource. e.g. `delete`

Response 201 (application/json): object

- `data`: object
  - `id`: string - Trigger ID e.g. `231346546`
  - `webhook_hook_id`: string - Unique string identifier of the webhook hook this trigger belongs to. Use as the {hook_id} path parameter when managing triggers on that hook. e.g. `43593499`
  - `resource_name`: string - Name of the Procore resource this trigger listens to (e.g., Work Orders, Project Users). e.g. `Project Users`
  - `event_type`: string - Event action that fires this trigger (e.g., create, update, delete). e.g. `CREATED`
  - `company_id`: string - Unique string identifier of the company this trigger is scoped to. Null for project-level triggers. e.g. `5358233`
  - `project_id`: string - Unique string identifier of the project this trigger is scoped to. Null for company-level triggers. e.g. `23498237`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/webhooks/hooks/{hook_id}/triggers/{id}

**Delete Company Webhooks Trigger**
Delete Company Webhook Trigger.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `hook_id` [path] string (required) - Webhook Hook ID
- `id` [path] string (required) - Webhook Trigger ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/webhooks/hooks/{hook_id}/triggers/{id}

**Delete Project Webhooks Trigger**
Delete Project Webhook Trigger

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `hook_id` [path] string (required) - Webhook Hook ID
- `id` [path] string (required) - Webhook Trigger ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/webhooks/hooks/{hook_id}/triggers/bulk

**Bulk Create Company Webhooks Triggers**
Create multiple Triggers for the Company Webhook in a single request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `hook_id` [path] string (required) - Webhook Hook ID

Request body (application/json):

- `resource_name`: string (required) - Name of the Procore resource to subscribe to (e.g., Work Orders, Company Users). Use the List Webhook Resources endpoint to discover valid values for your payload version. e.g. `Project Users`
- `event_type`: string (required) - Event action to subscribe to on the specified resource. Common values are create, update, delete. Use the List Webhook Resources endpoint to confirm supported event types per resource. e.g. `delete`

Response 201 (application/json): object

- `data`: array of object
  - `id`: string - Trigger ID e.g. `231346546`
  - `webhook_hook_id`: string - Unique string identifier of the webhook hook this trigger belongs to. Use as the {hook_id} path parameter when managing triggers on that hook. e.g. `43593499`
  - `resource_name`: string - Name of the Procore resource this trigger listens to (e.g., Work Orders, Project Users). e.g. `Project Users`
  - `event_type`: string - Event action that fires this trigger (e.g., create, update, delete). e.g. `CREATED`
  - `company_id`: string - Unique string identifier of the company this trigger is scoped to. Null for project-level triggers. e.g. `5358233`
  - `project_id`: string - Unique string identifier of the project this trigger is scoped to. Null for company-level triggers. e.g. `23498237`

Response 207 (application/json): object

- `data`: array of oneOf(object | object)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/webhooks/hooks/{hook_id}/triggers/bulk

**Bulk Delete Company Webhooks Triggers**
Deletes multiple Triggers for the Company Webhook in a single request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `hook_id` [path] string (required) - Webhook Hook ID

Request body (application/json):

- array of string

Response 200 (application/json): object

- `data`: object
  - `succeeded`: array of string e.g. `["1234", "12345", "12222"]`

Response 207 (application/json): object

- `data`: object
  - `succeeded`: array of string e.g. `["1234", "12345", "12222"]`
  - `failed`: array of string e.g. `["67890", "67891", "67892"]`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/webhooks/hooks/{hook_id}/triggers/bulk

**Bulk Create Project Webhooks Triggers**
Create multiple Triggers for the Project Webhook in a single request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `hook_id` [path] string (required) - Webhook Hook ID

Request body (application/json):

- `resource_name`: string (required) - Name of the Procore resource to subscribe to (e.g., Work Orders, Company Users). Use the List Webhook Resources endpoint to discover valid values for your payload version. e.g. `Project Users`
- `event_type`: string (required) - Event action to subscribe to on the specified resource. Common values are create, update, delete. Use the List Webhook Resources endpoint to confirm supported event types per resource. e.g. `delete`

Response 201 (application/json): object

- `data`: array of object
  - `id`: string - Trigger ID e.g. `231346546`
  - `webhook_hook_id`: string - Unique string identifier of the webhook hook this trigger belongs to. Use as the {hook_id} path parameter when managing triggers on that hook. e.g. `43593499`
  - `resource_name`: string - Name of the Procore resource this trigger listens to (e.g., Work Orders, Project Users). e.g. `Project Users`
  - `event_type`: string - Event action that fires this trigger (e.g., create, update, delete). e.g. `CREATED`
  - `company_id`: string - Unique string identifier of the company this trigger is scoped to. Null for project-level triggers. e.g. `5358233`
  - `project_id`: string - Unique string identifier of the project this trigger is scoped to. Null for company-level triggers. e.g. `23498237`

Response 207 (application/json): object

- `data`: array of oneOf(object | object)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/webhooks/hooks/{hook_id}/triggers/bulk

**Bulk Delete Project Webhooks Triggers**
Deletes multiple Triggers for the Project Webhook in a single request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `hook_id` [path] string (required) - Webhook Hook ID

Request body (application/json):

- array of string

Response 200 (application/json): object

- `data`: object
  - `succeeded`: array of string e.g. `["12345", "123456", "1234567"]`

Response 207 (application/json): object

- `data`: object
  - `succeeded`: array of string e.g. `["12345", "123456", "1234567"]`
  - `failed`: array of string e.g. `["67890", "67891", "67892"]`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/webhooks/hooks/{hook_id}/triggers  **[DEPRECATED]**

**List Webhooks Triggers**
Triggers must be listed within a company and/or project scope.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `hook_id` [path] integer (required) - Webhooks Hook ID
- `company_id` [query] integer (required) - Unique identifier for the company. You must supply either a company_id or project_id.
- `project_id` [query] integer (required) - Unique identifier for the project. You must supply either a company_id or project_id.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `231346546`
- `webhook_hook_id`: integer - Hook ID e.g. `43593499`
- `resource_name`: string - Resource Name e.g. `Project Users`
- `resource_id`: integer - Resource ID e.g. `43597433`
- `event_type`: string enum[CREATE, UPDATE, DELETE] - Event Type e.g. `DELETE`
- `company_id`: integer - Company ID (for Company scope) e.g. `5358233`
- `project_id`: integer - Project ID (for Project scope) e.g. `23498237`
- `user_id`: integer - User ID e.g. `532323`

Error responses: default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/webhooks/hooks/{hook_id}/triggers  **[DEPRECATED]**

**Create Webhooks Trigger**
Triggers must be created within a company and/or project scope.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `hook_id` [path] integer (required) - Webhooks Hook ID

Request body (application/json) (required):

- oneOf(object | object)

Response 201 (application/json): object

- `id`: integer - ID e.g. `231346546`
- `webhook_hook_id`: integer - Hook ID e.g. `43593499`
- `resource_name`: string - Resource Name e.g. `Project Users`
- `resource_id`: integer - Resource ID e.g. `43597433`
- `event_type`: string enum[CREATE, UPDATE, DELETE] - Event Type e.g. `DELETE`
- `company_id`: integer - Company ID (for Company scope) e.g. `5358233`
- `project_id`: integer - Project ID (for Project scope) e.g. `23498237`
- `user_id`: integer - User ID e.g. `532323`

Error responses: default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/webhooks/hooks/{hook_id}/triggers/{id}  **[DEPRECATED]**

**Delete Webhooks Trigger**
Triggers must be deleted within a company and/or project scope.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `hook_id` [path] integer (required) - Webhooks Hook ID
- `id` [path] integer (required) - Webhooks Trigger ID
- `company_id` [query] integer (required) - Unique identifier for the company. You must supply either a company_id or project_id.
- `project_id` [query] integer (required) - Unique identifier for the project. You must supply either a company_id or project_id.

Response 200: OK (no body)

Error responses: default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/webhooks/hooks/{hook_id}/triggers/bulk  **[DEPRECATED]**

**Bulk Create Triggers**
Create multiple webhook triggers in a single request. All triggers must be within the same hook, and provide company and/or project scope. Max 500 triggers.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `hook_id` [path] integer (required) - Webhooks Hook ID

Request body (application/json) (required):

- oneOf(object | object)

Response 200 (application/json): object

- `success`: array of object
  - `id`: integer - ID e.g. `231346546`
  - `webhook_hook_id`: integer - Hook ID e.g. `43593499`
  - `resource_name`: string - Resource Name e.g. `Project Users`
  - `resource_id`: integer - Resource ID e.g. `43597433`
  - `event_type`: string enum[CREATE, UPDATE, DELETE] - Event Type e.g. `DELETE`
  - `company_id`: integer - Company ID (for Company scope) e.g. `5358233`
  - `project_id`: integer - Project ID (for Project scope) e.g. `23498237`
  - `user_id`: integer - User ID e.g. `532323`

Response 207 (application/json): object

- `success`: array of object
  - `id`: integer - ID e.g. `231346546`
  - `webhook_hook_id`: integer - Hook ID e.g. `43593499`
  - `resource_name`: string - Resource Name e.g. `Project Users`
  - `resource_id`: integer - Resource ID e.g. `43597433`
  - `event_type`: string enum[CREATE, UPDATE, DELETE] - Event Type e.g. `DELETE`
  - `company_id`: integer - Company ID (for Company scope) e.g. `5358233`
  - `project_id`: integer - Project ID (for Project scope) e.g. `23498237`
  - `user_id`: integer - User ID e.g. `532323`
- `failed`: array of object
  - `code`: string e.g. `400`
  - `message`: string e.g. `Bad Request`
  - `trigger`: object
    - `resource_name`: string e.g. `Project Users`
  - `errors`: object
    - `event_type`: string e.g. `Can't be blank`

Error responses: 403, 413, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/webhooks/hooks/{hook_id}/triggers/bulk  **[DEPRECATED]**

**Bulk Delete Triggers**
Delete multiple webhook triggers in a single request. All triggers must be within the same hook, and provide company and/or project scope. Max 500 triggers.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `hook_id` [path] integer (required) - Webhooks Hook ID

Request body (application/json) (required):

- oneOf(object | object)

Response 200 (application/json): object

- `success`: array of integer e.g. `[42, 43]`

Response 207 (application/json): object

- `success`: array of integer e.g. `[42]`
- `failed`: array of object
  - `code`: string e.g. `403`
  - `trigger`: integer e.g. `43`

Error responses: 403, 413, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Webhook Resources

Resource id: `webhook-resources`. Raw spec: `../openapi-raw/webhook-resources.json`. Web: https://developers.procore.com/reference/rest/webhook-resources?version=latest
Product lines: Utilities

### GET /rest/v2.0/companies/{company_id}/webhooks/resources

**List Company Webhooks Resources**
Returns a List of webhooks resources for the company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `payload_version` [query] string (required) - Payload format version to filter resources by (e.g., v4.0). Returns only the resources available for that version.
- `payload_format` [query] string - Payload format identifier. Use in combination with payload_version to narrow resource results.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Array of Webhooks Resources
  - `category`: string - The category of the resource e.g. `Project Management`
  - `tool`: string - The tool or module the resource belongs to e.g. `Bidding`
  - `name`: string - The name of the resource e.g. `Bids`
  - `payload_version`: string enum[v4.0, v3.0, v2.0] - The version of the payload format e.g. `v4.0`
  - `actions`: array of string - List of event actions available for this resource (e.g., create, update, delete). Use these values as event_type when creating triggers. e.g. `["update"]`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/webhooks/resources

**List Project Webhooks Resources**
Returns a List of webhooks resources for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `payload_version` [query] string (required) - Payload format version to filter resources by (e.g., v4.0). Returns only the resources available for that version.
- `payload_format` [query] string - Payload format identifier. Use in combination with payload_version to narrow resource results.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Array of Webhooks Resources
  - `category`: string - The category of the resource e.g. `Project Management`
  - `tool`: string - The tool or module the resource belongs to e.g. `Bidding`
  - `name`: string - The name of the resource e.g. `Bids`
  - `payload_version`: string enum[v4.0, v3.0, v2.0] - The version of the payload format e.g. `v4.0`
  - `actions`: array of string - List of event actions available for this resource (e.g., create, update, delete). Use these values as event_type when creating triggers. e.g. `["update"]`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/webhooks/resources  **[DEPRECATED]**

**List Webhooks Resources**
Returns the list of Webhook Resources for the given scope.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project. You must supply either a company_id or project_id.

Response 200 (application/json): array of object

- `api_version`: string - API Version e.g. `v2`
- `product_category`: string - Product Category e.g. `Construction Financials`
- `tools`: string - Tools e.g. `Budget Line Items`
- `except`: array of string - Event types that cannot be subscribed to
- `create`: string - Create Event e.g. `nil`
- `update`: string - Update Event e.g. `nil`
- `delete`: string - Delete Event e.g. `nil`

Error responses: default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/webhooks/resources/api_versions  **[DEPRECATED]**

**List Webhooks Resources API Versions**
Returns the list of Webhook Resources API Versions for the given scope.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project. You must supply either a company_id or project_id.

Response 200 (application/json): array of string


Error responses: default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

